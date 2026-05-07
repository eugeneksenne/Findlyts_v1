import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.trim();

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

const createNoopSupabase = () => {
  const channelApi = {
    on: () => channelApi,
    subscribe: (_cb?: any) => channelApi,
    send: async () => ({ data: null, error: null }),
  };

  return {
    channel: () => channelApi,
    removeChannel: () => undefined,
  } as any;
};

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : createNoopSupabase();

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase env vars are not configured. Running in offline-safe mode with realtime disabled.',
  );
}
