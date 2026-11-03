import type { Metadata } from "next";
import BuscaForm from "@/components/BuscaForm";
import { Card, Etiqueta, Migalhas } from "@/components/ui";
import { EDITORIAS, buscar, slug } from "@/dados/noticias";

export const metadata: Metadata = { title: "Busca | Comunica +" };

export default function Busca({ searchParams }: { searchParams: { q?: string | string[] } }) {
  const bruto = searchParams.q;
  const q = (Array.isArray(bruto) ? bruto[0] : bruto ?? "").trim();
  const resultados = buscar(q);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Migalhas itens={[{ rotulo: "Início", href: "/" }, { rotulo: "Busca" }]} />
      <h1 className="mt-4 font-serif text-4xl font-bold uppercase tracking-[0.06em] sm:text-5xl">Busca</h1>
      <BuscaForm className="mt-5 max-w-xl" valor={q} />
      <p className="mt-6 font-sans text-sm text-cinza">
        {q ? `${resultados.length} ${resultados.length === 1 ? "resultado" : "resultados"} para “${q}”` : "Digite uma palavra para buscar nas notícias de demonstração."}
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{resultados.map((n) => <Card key={n.id} n={n} />)}</div>
      {q && resultados.length === 0 && (
        <div className="mt-2">
          <p className="font-serif text-lg">Nenhuma notícia encontrada. Tente “inflação”, “escolas” ou “bateria”, ou veja uma editoria:</p>
          <div className="mt-4 flex flex-wrap gap-2">{EDITORIAS.map((e) => <Etiqueta key={e} texto={e} href={`/${slug(e)}`} />)}</div>
        </div>
      )}
    </div>
  );
}