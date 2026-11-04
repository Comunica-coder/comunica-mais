import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Assinatura, Card, Etiqueta, ImagemDemo, Migalhas, TituloSecao } from "@/components/ui";
import { corpoDe, slug, slugTexto } from "@/dados/noticias";
import { obterNoticias } from "@/dados/fonte";

type P = { params: { editoria: string; slug: string } };

export const revalidate = 60;

const achar = async (p: P["params"]) =>
  (await obterNoticias()).find((n) => slug(n.editoria) === p.editoria && slugTexto(n.titulo) === p.slug);

export async function generateStaticParams() {
  return (await obterNoticias()).map((n) => ({ editoria: slug(n.editoria), slug: slugTexto(n.titulo) }));
}
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const n = await achar(params);
  return n ? { title: `${n.titulo} | Comunica +`, description: n.resumo } : { title: "Comunica +" };
}

export default async function PaginaNoticia({ params }: P) {
  const n = await achar(params);
  if (!n) notFound();
  const todas = await obterNoticias();
  const relacionadas = [
    ...todas.filter((x) => x.editoria === n.editoria && x.id !== n.id),
    ...todas.filter((x) => x.editoria !== n.editoria),
  ].slice(0, 3);

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-8">
        <Migalhas itens={[{ rotulo: "Início", href: "/" }, { rotulo: n.editoria, href: `/${slug(n.editoria)}` }, { rotulo: "Matéria" }]} />
        <div className="mt-6"><Etiqueta texto={n.editoria} href={`/${slug(n.editoria)}`} ativa /></div>
        <h1 className="mt-4 font-serif text-3xl font-bold leading-[1.1] sm:text-5xl">{n.titulo}</h1>
        {n.resumo && <p className="mt-4 font-serif text-xl leading-relaxed text-azul/80">{n.resumo}</p>}
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
          <Assinatura minutos={n.minutos} autor={n.autor} />
          <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-cinza">{n.dataTexto ?? "02.11.2026"} · {n.hora}</p>
        </div>
        <div className="my-6"><ImagemDemo src={n.imagem} alt={n.titulo} /></div>
        <div className="space-y-5 font-serif text-lg leading-[1.6] sm:text-xl">
          {(n.corpo ?? corpoDe(n)).map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </article>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <TituloSecao>Leia também</TituloSecao>
        <div className="grid gap-6 md:grid-cols-3">{relacionadas.map((r) => <Card key={r.id} n={r} />)}</div>
      </section>
    </>
  );
}