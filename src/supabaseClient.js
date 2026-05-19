import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ensoqvarqtldspcwtbrc.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuc29xdmFycXRsZHNwY3d0YnJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3MTI3NTcsImV4cCI6MjA5NDI4ODc1N30.9clxnkYOyUoN6PHCLGqeZtjMbGaZFL8Q4h-HWh1gGmQ'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
