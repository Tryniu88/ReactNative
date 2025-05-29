import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto"; // Good to have this at the top

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.error(
    "Supabase URL is not defined. Please check your environment variables."
  );
}

if (!supabaseAnonKey) {
  console.error(
    "Supabase Anon Key is not defined. Please check your environment variables."
  );
}

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "", {
  localStorage: AsyncStorage as any,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});
