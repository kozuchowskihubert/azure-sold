// User Types
export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  phone: string
  role: 'client' | 'admin'
  created_at: string
}

// Project Types
export interface Project {
  id: number
  user_id: number
  name: string
  power: number
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  installation_date?: string
  address: string
  city: string
  postal_code: string
  system_cost: number
  annual_production: number
  annual_savings: number
  roi_years: number
  created_at: string
  updated_at: string
}

// Contact Form Types
export interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export interface ContactResponse {
  success: boolean
  message: string
  contact_id?: number
}

// Calculator Types
export interface CalculatorInput {
  monthlyBill: number
  roofArea: number
  roofType: 'pitched' | 'flat' | 'hip'
  location: string
}

export interface CalculatorResult {
  systemPower: number
  annualProduction: number
  annualSavings: number
  systemCost: number
  roi: number
  co2Reduction: number
}

// Quote Types
export interface Quote {
  id: number
  project_id: number
  status: 'draft' | 'sent' | 'accepted' | 'rejected'
  total_price: number
  panels_cost: number
  inverter_cost: number
  installation_cost: number
  additional_costs: number
  discount_amount: number
  valid_until: string
  created_at: string
}

// Document Types
export interface Document {
  id: number
  project_id: number
  document_type: 'contract' | 'invoice' | 'permit' | 'warranty' | 'other'
  file_name: string
  file_path: string
  file_size: number
  uploaded_at: string
}

// Production Data Types
export interface ProductionData {
  id: number
  project_id: number
  date: string
  energy_produced: number
  energy_consumed: number
  energy_exported: number
  revenue: number
}

export interface ProductionStats {
  today: number
  thisWeek: number
  thisMonth: number
  thisYear: number
  allTime: number
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Auth Types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  first_name: string
  last_name: string
  phone: string
}

export interface AuthResponse {
  access_token: string
  refresh_token: string
  user: User
}

// Dashboard Types
export interface ClientDashboard {
  user: User
  activeProjects: Project[]
  productionStats: ProductionStats
  recentInvoices: Document[]
  alerts: Alert[]
}

export interface AdminDashboard {
  totalClients: number
  activeProjects: number
  pendingLeads: number
  monthlyRevenue: number
  recentProjects: Project[]
  recentContacts: ContactForm[]
}

// Alert Types
export interface Alert {
  id: number
  type: 'info' | 'warning' | 'error' | 'success'
  title: string
  message: string
  created_at: string
  read: boolean
}

// Portfolio Types
export interface PortfolioProject {
  id: number
  title: string
  category: 'residential' | 'commercial' | 'industrial'
  location: string
  power: string
  savings: string
  image: string
  description: string
  completedAt: string
}

// Service Types
export interface Service {
  id: number
  name: string
  description: string
  category: 'residential' | 'commercial' | 'maintenance'
  price_from: number
  features: string[]
}
