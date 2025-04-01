import { createClient } from "@supabase/supabase-js";

const superbaseUrl =import.meta.env.VITE_SUPER_URL;
const superbaseAnonKey =import.meta.env.VITE_SUPER_ANON_KEY;

export const superbase = createClient(superbaseUrl,superbaseAnonKey );