import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Assinatura, Card, Etiqueta, ImagemDemo, LeiaMais, Migalhas, TituloSecao } from "@/components/ui";
import { EDITORIAS, acharEditoria, daEditoria, link, slug } from "@/dados/noticias";

type P = { params: { editoria: string } };

export const generateStaticParams = () => EDITORIAS.map((e) => ({ editoria: slug(e) }));
export function generateMetadata({ params }: P): Metadata {
  const e = acharEditoria(params.editoria);
  return { title: e ? `${e} | Comunica +` : "Comunica +" };
}

export default function PaginaEditoria({ params }: P) {
  const editoria = acharEditoria(params.editoria);
  if (!editoria) notFound();
  const [principal, ...demais] = daEditoria(editoria);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Migalhas itens={[{ rotulo: "Início", href: "/" }, { rotulo: editoria }]} />
      <h1 className="mt-4 font-serif text-4xl font-bold uppercase tracking-[0.06em] sm:text-5xl">{editoria}</h1>
      <div className="mt-3 h-[3px] bg-azul" />
      <div className="mt-[3px] h-px bg-ouro" />
      <div className="mt-5 flex flex-wrap gap-2">
        {EDITORIAS.map((e) => <Etiqueta key={e} texto={e} href={`/${slug(e)}`} ativa={e === editoria} />)}
      </div>

      {principal && (
        <article className="mt-8 grid gap-6 md:grid-cols-2">
          <Link href={link(principal)} aria-hidden tabIndex={-1}><ImagemDemo /></Link>
          <div className="flex flex-col items-start gap-3">
            <h2 className="font-serif text-3xl font-bold leading-tight">
              <Link href={link(principal)} className="hover:underline">{principal.titulo}</Link>
            </h2>
            <p className="font-serif text-lg leading-relaxed text-azul/80">{principal.resumo}</p>
            <Assinatura minutos={principal.minutos} />
            <LeiaMais href={link(principal)} />
          </div>
        </article>
      )}

      {demais.length > 0 && (
        <div className="mt-10">
          <TituloSecao>Mais em {editoria}</TituloSecao>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{demais.map((n) => <Card key={n.id} n={n} />)}</div>
        </div>
      )}
    </div>
  );
}