import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Assinatura, Card, Etiqueta, ImagemDemo, Migalhas, TituloSecao } from "@/components/ui";
import { acharNoticia, corpoDe, noticias, slug, slugTexto } from "@/dados/noticias";

type P = { params: { editoria: string; slug: string } };

export const generateStaticParams = () => noticias.map((n) => ({ editoria: slug(n.editoria), slug: slugTexto(n.titulo) }));
export function generateMetadata({ params }: P): Metadata {
  const n = acharNoticia(params.editoria, params.slug);
  return n ? { title: `${n.titulo} | Comunica +`, description: n.resumo } : { title: "Comunica +" };
}

export default function PaginaNoticia({ params }: P) {
  const n = acharNoticia(params.editoria, params.slug);
  if (!n) notFound();
  const relacionadas = [
    ...noticias.filter((x) => x.editoria === n.editoria && x.id !== n.id),
    ...noticias.filter((x) => x.editoria !== n.editoria),
  ].slice(0, 3);

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-8">
        <Migalhas itens={[{ rotulo: "Início", href: "/" }, { rotulo: n.editoria, href: `/${slug(n.editoria)}` }, { rotulo: "Matéria" }]} />
        <div className="mt-6"><Etiqueta texto={n.editoria} href={`/${slug(n.editoria)}`} ativa /></div>
        <h1 className="mt-4 font-serif text-3xl font-bold leading-[1.1] sm:text-5xl">{n.titulo}</h1>
        <p className="mt-4 font-serif text-xl leading-relaxed text-azul/80">{n.resumo}</p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
          <Assinatura minutos={n.minutos} />
          <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-cinza">02.11.2026 · {n.hora}</p>
        </div>
        <div className="my-6"><ImagemDemo /></div>
        <div className="space-y-5 font-serif text-lg leading-[1.6] sm:text-xl">
          {corpoDe(n).map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <p className="mt-8 border-l-2 border-ouro pl-4 font-sans text-sm text-cinza">
          Matéria fictícia, criada apenas para demonstração do protótipo.
        </p>
      </article>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <TituloSecao>Leia também</TituloSecao>
        <div className="grid gap-6 md:grid-cols-3">{relacionadas.map((r) => <Card key={r.id} n={r} />)}</div>
      </section>
    </>
  );
}