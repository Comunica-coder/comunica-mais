import { supabase } from "@/lib/supabase";
import { IDS_DESTAQUES, IDS_MAIS_LIDAS, IDS_ULTIMAS, noticias as demo, porId, slug, type Editoria, type Noticia as Base } from "./noticias";

export type Noticia = Base & {
  dataTexto?: string;
  imagem?: string;
  autor?: string;
  corpo?: string[];
  destaque?: boolean;
  visualizacoes?: number;
};

type Linha = {
  id: number; titulo: string; subtitulo: string | null; conteudo: string; imagem_url: string | null;
  publicado_em: string; destaque: boolean; visualizacoes: number;
  categorias: { nome: string } | null; autores: { nome: string } | null;
};

const fuso = "America/Sao_Paulo";

function paraNoticia(l: Linha): Noticia {
  const d = new Date(l.publicado_em);
  return {
    id: l.id,
    editoria: (l.categorias?.nome ?? "Brasil") as Editoria,
    titulo: l.titulo,
    resumo: l.subtitulo ?? "",
    minutos: Math.max(1, Math.round(l.conteudo.split(/\s+/).length / 200)),
    hora: d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: fuso }).replace(":", "h"),
    dataTexto: d.toLocaleDateString("pt-BR", { timeZone: fuso }).replace(/\//g, "."),
    corpo: l.conteudo.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
    imagem: l.imagem_url ?? undefined,
    autor: l.autores?.nome,
    destaque: l.destaque,
    visualizacoes: l.visualizacoes,
  };
}

// Lê as notícias publicadas no Supabase. Se não houver banco, der erro ou estiver vazio, usa a demonstração.
export async function obterNoticias(): Promise<Noticia[]> {
  if (!supabase) return demo;
  const { data, error } = await supabase
    .from("noticias")
    .select("id,titulo,subtitulo,conteudo,imagem_url,publicado_em,destaque,visualizacoes,categorias(nome),autores(nome)")
    .eq("status", "publicada")
    .lte("publicado_em", new Date().toISOString())
    .order("publicado_em", { ascending: false });
  if (error || !data || data.length === 0) return demo;
  return (data as unknown as Linha[]).map(paraNoticia);
}

export async function obterDados() {
  const todas = await obterNoticias();
  if (todas === demo) {
    return { todas, manchete: porId(1), ultimas: IDS_ULTIMAS.map(porId), destaques: IDS_DESTAQUES.map(porId), maisLidas: IDS_MAIS_LIDAS.map(porId) };
  }
  const [manchete, ...resto] = todas;
  const destaques = [...resto.filter((n) => n.destaque), ...resto.filter((n) => !n.destaque)].slice(0, 3);
  const maisLidas = [...todas].sort((a, b) => (b.visualizacoes ?? 0) - (a.visualizacoes ?? 0)).slice(0, 5);
  return { todas, manchete, ultimas: resto.slice(0, 5), destaques, maisLidas };
}

export const buscarEm = (lista: Noticia[], q: string) => {
  const termos = slug(q).split(/\s+/).filter(Boolean);
  if (!termos.length) return [];
  return lista.filter((n) => {
    const texto = slug(`${n.titulo} ${n.resumo} ${n.editoria}`);
    return termos.every((t) => texto.includes(t));
  });
};