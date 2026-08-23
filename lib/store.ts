import fs from "fs"
import path from "path"
import { gitSync } from "@/lib/git-sync"

// This is the real persistence layer. Every read pulls the current file
// from disk (no caching), so a save from the Admin Panel is reflected the
// very next time any page reads this data — no rebuild, no redeploy.
//
// IMPORTANT: this only works correctly on a host with a persistent,
// writable filesystem (a real Node.js server — Railway, Render, a VPS).
// It will NOT work reliably on Vercel or other serverless hosts, where
// the filesystem is rebuilt fresh for every request and writes vanish.
// See README.md for the full explanation and hosting instructions.

const DATA_DIR = path.join(process.cwd(), "data")

function readJson<T>(filename: string): T {
  const filePath = path.join(DATA_DIR, filename)
  const raw = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(raw) as T
}

function writeJson<T>(filename: string, data: T): void {
  const filePath = path.join(DATA_DIR, filename)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8")
  // Auto-commit the change back to Git so it survives Render restarts
  gitSync([`data/${filename}`], `Update ${filename}`)
}

// ---------- Types ----------

export interface AdminUser {
  username: string
  passwordHash: string
}

export interface Service {
  id: string
  title: string
  description: string
  price: string
  unit: string
  icon: string
}

export interface Achievement {
  id: string
  name: string
  year: string
  issuer: string
  detail: string
  why: string
}

export interface PortfolioProject {
  id: string
  name: string
  subtitle: string
  image: string
  live: string
  github: string
}

export interface Settings {
  contactEmail: string
  whatsappNote: string
  linkedin: string
  github: string
  activeTheme: string
  profilePhoto: string
}

// ---------- Admin user ----------

export const getAdmin = (): AdminUser => readJson<AdminUser>("admin.json")
export const saveAdmin = (data: AdminUser): void => writeJson("admin.json", data)

// ---------- Site content (text) ----------

export const getSiteContent = () => readJson<any>("site-content.json")
export const saveSiteContent = (data: any): void => writeJson("site-content.json", data)

// ---------- Services ----------

export const getServices = (): Service[] => readJson<Service[]>("services.json")
export const saveServices = (data: Service[]): void => writeJson("services.json", data)

// ---------- Achievements ----------

export const getAchievements = (): Achievement[] => readJson<Achievement[]>("achievements.json")
export const saveAchievements = (data: Achievement[]): void =>
  writeJson("achievements.json", data)

// ---------- Portfolio projects ----------

export const getPortfolio = (): PortfolioProject[] => readJson<PortfolioProject[]>("portfolio.json")
export const savePortfolio = (data: PortfolioProject[]): void =>
  writeJson("portfolio.json", data)

// ---------- Settings ----------

export const getSettings = (): Settings => readJson<Settings>("settings.json")
export const saveSettings = (data: Settings): void => writeJson("settings.json", data)

// ---------- ID generator for new items ----------

export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`
}
