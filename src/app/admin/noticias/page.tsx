"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { sb } from "@/lib/supabaseNavegador";
import { botao, botaoSec, Selo } from "@/components/admin/ui";

type Item = { id: number; titulo: string; status: string; publicado_em: string; categorias: { nome: string } | null };
const filtros = [["todas", "Todas"], ["publicada", "Publicadas"], ["rascunho", "Rascunhos"], ["arquivada", "Arquivadas"]];

export default function ListaNoticias() {
  const [itens, setItens] = useState<Item[] | null>(null);
  const [filtro, setFiltro] = useState("todas");

  const carregar = useCallback(async () => {
    if (!sb) return;
    const { data } = await sb.from("noticias").select("id,titulo,status,publicado_em,categorias(nome)").order("publicado_em", { ascending: false });
    setItens((data ?? []) as unknown as Item[]);
  }, []);
  useEffect(() => { carregar(); }, [carregar]);

  async function mudar(id: number, status: string) {
    await sb!.from("noticias").update({ status }).eq("id", id);
    carregar();
  }
  async function excluir(id: number) {
    if (!confirm("Excluir esta notícia? Não dá para desfazer.")) return;
    await sb!.from("noticias").delete().eq("id", id);
    carregar();
  }

  if (!itens) return <p>Carregando…</p>;
  const lista = itens.filter((i) => filtro === "todas" || i.status === filtro);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-serif text-3xl font-bold">Notícias</h1>
        <Link href="/admin/noticias/nova" className={botao}>+ Nova</Link>
      </div>
      <div className="flex flex-wrap gap-2">
        {filtros.map(([v, r]) => (
          <button key={v} onClick={() => setFiltro(v)}
            className={`border border-azul px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.15em] ${filtro === v ? "bg-azul text-gelo" : "text-azul"}`}>{r}</button>
        ))}
      </div>
      {lista.length === 0 && <p className="text-sm text-cinza">Nenhuma notícia neste filtro.</p>}
      <ul className="space-y-3">
        {lista.map((i) => (
          <li key={i.id} className="flex flex-col gap-3 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <Link href={`/admin/noticias/${i.id}`} className="font-serif text-lg font-bold leading-snug hover:underline">{i.titulo}</Link>
              <p className="mt-1 flex flex-wrap items-center gap-2 font-sans text-xs text-cinza">
                <Selo status={i.status} data={i.publicado_em} />
                {i.categorias?.nome} · {new Date(i.publicado_em).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href={`/admin/noticias/${i.id}`} className={botaoSec}>Editar</Link>
              {i.status === "publicada"
                ? <button onClick={() => mudar(i.id, "rascunho")} className={botaoSec}>Despublicar</button>
                : <button onClick={() => mudar(i.id, "publicada")} className={botao}>Publicar</button>}
              <button onClick={() => excluir(i.id)} className={botaoSec}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}