import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dnqjxrstzghtvcxzjdti.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRucWp4cnN0emdodHZjeHpqZHRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxOTk0MDEsImV4cCI6MjA2NTc3NTQwMX0.Jfk2T4JLJklWM4m-yjFcBB9VsuKVBKyMydG7xf1QHf4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Chat {
  id: string
  user_id: string
  title: string
  thread_id: string | null
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  chat_id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
} 