import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const chave = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Cliente do painel: guarda o login no navegador. Usa só a chave pública;
// quem decide o que pode ser alterado são as regras de segurança do banco.
export const sb = url && chave ? createClient(url, chave) : null;