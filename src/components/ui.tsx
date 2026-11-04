import Image from "next/image";
import Link from "next/link";
import { link } from "@/dados/noticias";
import type { Noticia } from "@/dados/fonte";

const rotulo = "font-sans text-[11px] font-bold uppercase tracking-[0.15em]";

export function Etiqueta({ texto, ativa = false, href }: { texto: string; ativa?: boolean; href?: string }) {
  const cls = `inline-block border border-azul px-2 py-1 ${rotulo} ${ativa ? "bg-azul text-gelo" : "text-azul"}`;
  return href ? <Link href={href} className={`${cls} hover:bg-azul hover:text-gelo`}>{texto}</Link> : <span className={cls}>{texto}</span>;
}

export function Assinatura({ minutos, autor = "Redação" }: { minutos: number; autor?: string }) {
  return <p className={`${rotulo} font-normal text-cinza`}>Por {autor} · {minutos} min de leitura</p>;
}

export function TituloSecao({ children, href }: { children: React.ReactNode; href?: string }) {
  return (
    <div className="mb-5 flex items-center gap-4">
      <h2 className="font-serif text-lg font-bold uppercase tracking-[0.06em] text-azul">{children}</h2>
      <span className="h-px flex-1 bg-azul" />
      {href && (
        <Link href={href} className="whitespace-nowrap border-b-[1.5px] border-ouro font-serif text-[15px] font-bold">
          Ver todas <span className="text-ouro">+</span>
        </Link>
      )}
    </div>
  );
}

export function Divisor() {
  return (
    <div aria-hidden className="mx-auto max-w-6xl px-4">
      <div className="h-[3px] bg-azul" />
      <div className="mt-[3px] h-px bg-ouro" />
    </div>
  );
}

export function LeiaMais({ href = "#" }: { href?: string }) {
  return (
    <Link href={href} className="inline-block border-b-[1.5px] border-ouro font-serif text-[15px] font-bold text-azul">
      Leia mais <span className="text-ouro">+</span>
    </Link>
  );
}

export function Migalhas({ itens }: { itens: { rotulo: string; href?: string }[] }) {
  return (
    <nav aria-label="Você está em" className={`${rotulo} font-normal text-cinza`}>
      <ol className="flex flex-wrap gap-2">
        {itens.map((i, k) => (
          <li key={i.rotulo} className="flex gap-2">
            {k > 0 && <span aria-hidden>/</span>}
            {i.href ? <Link href={i.href} className="hover:underline">{i.rotulo}</Link> : <span className="font-bold text-azul">{i.rotulo}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Mostra a imagem da matéria (quando existe) ou o espaço reservado da identidade visual.
export function ImagemDemo({ className = "aspect-[16/9]", src, alt = "" }: { className?: string; src?: string; alt?: string }) {
  if (src) {
    return (
      <div className={`relative overflow-hidden border-b-2 border-ouro bg-azul ${className}`}>
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <div className={`relative flex items-center justify-center border-b-2 border-ouro bg-azul ${className}`}>
      <Image src="/marca/microfone.png" alt="" width={520} height={800} className="h-[45%] w-auto" />
      <span className={`absolute bottom-2 left-3 text-gelo/80 ${rotulo} text-[10px] font-normal`}>
        Imagem ilustrativa · conteúdo fictício
      </span>
    </div>
  );
}

export function Card({ n }: { n: Noticia }) {
  return (
    <article className="flex flex-col">
      <Link href={link(n)} aria-hidden tabIndex={-1}><ImagemDemo src={n.imagem} alt={n.titulo} /></Link>
      <div className="mt-3 flex flex-col items-start gap-2">
        <Etiqueta texto={n.editoria} href={`/${n.editoria.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()}`} />
        <h3 className="font-serif text-xl font-bold leading-tight">
          <Link href={link(n)} className="hover:underline">{n.titulo}</Link>
        </h3>
        <p className="font-serif text-base leading-relaxed text-azul/80">{n.resumo}</p>
        <Assinatura minutos={n.minutos} autor={n.autor} />
      </div>
    </article>
  );
}
  );
}

export function Migalhas({ itens }: { itens: { rotulo: string; href?: string }[] }) {
  return (
    <nav aria-label="Você está em" className={`${rotulo} font-normal text-cinza`}>
      <ol className="flex flex-wrap gap-2">
        {itens.map((i, k) => (
          <li key={i.rotulo} className="flex gap-2">
            {k > 0 && <span aria-hidden>/</span>}
            {i.href ? <Link href={i.href} className="hover:underline">{i.rotulo}</Link> : <span className="font-bold text-azul">{i.rotulo}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Espaço reservado: depois será trocado pela imagem real da matéria.
export function ImagemDemo({ className = "aspect-[16/9]" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center border-b-2 border-ouro bg-azul ${className}`}>
      <Image src="/marca/microfone.png" alt="" width={520} height={800} className="h-[45%] w-auto" />
      <span className={`absolute bottom-2 left-3 text-gelo/80 ${rotulo} text-[10px] font-normal`}>
        Imagem ilustrativa · conteúdo fictício
      </span>
    </div>
  );
}

export function Card({ n }: { n: Noticia }) {
  return (
    <article className="flex flex-col">
      <Link href={link(n)} aria-hidden tabIndex={-1}><ImagemDemo /></Link>
      <div className="mt-3 flex flex-col items-start gap-2">
        <Etiqueta texto={n.editoria} href={`/${n.editoria.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()}`} />
        <h3 className="font-serif text-xl font-bold leading-tight">
          <Link href={link(n)} className="hover:underline">{n.titulo}</Link>
        </h3>
        <p className="font-serif text-base leading-relaxed text-azul/80">{n.resumo}</p>
        <Assinatura minutos={n.minutos} />
      </div>
    </article>
  );
}