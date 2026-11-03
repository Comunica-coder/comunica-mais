import Link from "next/link";
import Banner from "@/components/Banner";
import { Assinatura, Card, Divisor, Etiqueta, ImagemDemo, LeiaMais, TituloSecao } from "@/components/ui";
import { EDITORIAS, IDS_DESTAQUES, IDS_MAIS_LIDAS, IDS_ULTIMAS, link, noticias, porId, slug } from "@/dados/noticias";

export default function Home() {
  const manchete = porId(1);

  return (
    <>
      <Banner />

      {/* Manchete principal + Últimas notícias */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <article className="lg:col-span-2">
            <ImagemDemo />
            <div className="mt-4 flex flex-col items-start gap-3">
              <Etiqueta texto={manchete.editoria} ativa />
              <h1 className="font-serif text-3xl font-bold leading-[1.1] sm:text-5xl"><Link href={link(manchete)} className="hover:underline">{manchete.titulo}</Link></h1>
              <p className="font-serif text-lg leading-relaxed text-azul/80 sm:text-xl">{manchete.resumo}</p>
              <Assinatura minutos={manchete.minutos} />
              <LeiaMais href={link(manchete)} />
            </div>
          </article>

          <aside id="ultimas" className="scroll-mt-16">
            <TituloSecao>Últimas notícias</TituloSecao>
            <ol className="divide-y divide-azul/15">
              {IDS_ULTIMAS.map((id) => {
                const n = porId(id);
                return (
                  <li key={id} className="py-3 first:pt-0">
                    <p className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-cinza">{n.hora} · {n.editoria}</p>
                    <Link href={link(n)} className="font-serif text-lg font-bold leading-snug hover:underline">{n.titulo}</Link>
                  </li>
                );
              })}
            </ol>
          </aside>
        </div>
      </section>

      <Divisor />

      {/* Notícias em destaque */}
      <section id="destaques" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-8">
        <TituloSecao>Em destaque</TituloSecao>
        <div className="grid gap-6 md:grid-cols-3">
          {IDS_DESTAQUES.map((id) => <Card key={id} n={porId(id)} />)}
        </div>
      </section>

      <Divisor />

      {/* Editorias + Mais lidas */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-8 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          {EDITORIAS.map((e) => (
            <section key={e} id={slug(e)} className="scroll-mt-16">
              <TituloSecao href={`/${slug(e)}`}>{e}</TituloSecao>
              <div className="grid gap-6 sm:grid-cols-2">
                {noticias.filter((n) => n.editoria === e && n.id !== manchete.id).map((n) => <Card key={n.id} n={n} />)}
              </div>
            </section>
          ))}
        </div>

        <aside id="mais-lidas" className="scroll-mt-16 lg:sticky lg:top-16 lg:self-start">
          <TituloSecao>Mais lidas</TituloSecao>
          <ol className="space-y-5">
            {IDS_MAIS_LIDAS.map((id, i) => {
              const n = porId(id);
              return (
                <li key={id} className="flex gap-4 border-l-2 border-ouro pl-4">
                  <span className="font-serif text-4xl font-bold leading-none">{i + 1}</span>
                  <div className="flex flex-col items-start gap-1">
                    <Etiqueta texto={n.editoria} />
                    <Link href={link(n)} className="font-serif text-lg font-bold leading-snug hover:underline">{n.titulo}</Link>
                  </div>
                </li>
              );
            })}
          </ol>
        </aside>
      </section>
    </>
  );
}