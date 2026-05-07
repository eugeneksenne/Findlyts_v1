import { createClient } from '@supabase/supabase-js';

const apiUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseUrl = apiUrl.startsWith('http') ? apiUrl : 'https://xyzcompany.supabase.co';

const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'public-anon-key';
const supabaseAnonKey = anonKey.trim() !== '' ? anonKey : 'public-anon-key';

console.log("Supabase Init:", { supabaseUrl, supabaseAnonKey });

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: supabaseAnonKey !== 'public-anon-key',
    autoRefreshToken: supabaseAnonKey !== 'public-anon-key',
    detectSessionInUrl: supabaseAnonKey !== 'public-anon-key',
  },
});
