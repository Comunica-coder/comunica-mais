"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { sb } from "@/lib/supabaseNavegador";
import { botao, Selo } from "@/components/admin/ui";

type Item = { id: number; titulo: string; status: string; publicado_em: string };

export default function Dashboard() {
  const [itens, setItens] = useState<Item[] | null>(null);
  useEffect(() => {
    sb?.from("noticias").select("id,titulo,status,publicado_em").order("publicado_em", { ascending: false })
      .then(({ data }) => setItens((data ?? []) as Item[]));
  }, []);
  if (!itens) return <p>Carregando…</p>;

  const agora = new Date();
  const noAr = itens.filter((i) => i.status === "publicada" && new Date(i.publicado_em) <= agora).length;
  const agendadas = itens.filter((i) => i.status === "publicada" && new Date(i.publicado_em) > agora).length;
  const rascunhos = itens.filter((i) => i.status === "rascunho").length;
  const cards = [["Publicadas", noAr], ["Rascunhos", rascunhos], ["Agendadas", agendadas], ["Total", itens.length]];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-serif text-3xl font-bold">Dashboard</h1>
        <Link href="/admin/noticias/nova" className={botao}>+ Nova notícia</Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {cards.map(([rotulo, n]) => (
          <div key={rotulo} className="border-t-4 border-ouro bg-white p-4 shadow-sm">
            <p className="font-serif text-4xl font-bold">{n}</p>
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-cinza">{rotulo}</p>
          </div>
        ))}
      </div>
      <section className="bg-white p-4 shadow-sm">
        <h2 className="mb-3 font-serif text-lg font-bold uppercase tracking-[0.06em]">Últimas matérias</h2>
        {itens.length === 0 && <p className="text-sm text-cinza">Nenhuma matéria ainda.</p>}
        <ul className="divide-y divide-azul/10">
          {itens.slice(0, 5).map((i) => (
            <li key={i.id} className="flex items-center justify-between gap-3 py-3">
              <Link href={`/admin/noticias/${i.id}`} className="font-serif text-base font-bold hover:underline">{i.titulo}</Link>
              <Selo status={i.status} data={i.publicado_em} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}