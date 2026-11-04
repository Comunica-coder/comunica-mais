import { createClient } from "@supabase/supabase-js";

// As chaves vêm das variáveis de ambiente da Vercel, nunca do código.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const chavePublica = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  url && chavePublica ? createClient(url, chavePublica, { auth: { persistSession: false } }) : null;