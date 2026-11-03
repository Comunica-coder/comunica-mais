import Image from "next/image";
import Link from "next/link";
import { EDITORIAS, slug } from "@/dados/noticias";
import BuscaForm from "./BuscaForm";

const itens = [
  ...EDITORIAS.map((e) => ({ rotulo: e, href: `/${slug(e)}` })),
  { rotulo: "Mais lidas", href: "/#mais-lidas" },
];
const linkNav = "font-sans text-xs font-bold uppercase tracking-[0.15em] text-gelo hover:text-dourado";

export default function Header() {
  return (
    <header>
      <div className="bg-azul px-4 py-1 text-center font-sans text-[11px] uppercase tracking-[0.15em] text-gelo">
        Protótipo · todo o conteúdo é fictício, apenas para demonstração
      </div>
      <div className="bg-gelo">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" aria-label="Comunica + — página inicial">
            <Image src="/marca/logo-clara.png" alt="Comunica +" width={1719} height={366} className="h-10 w-auto sm:h-12" priority />
          </Link>
          <BuscaForm className="hidden w-64 sm:flex" />
        </div>
      </div>
      <nav aria-label="Principal" className="sticky top-0 z-30 border-b-2 border-ouro bg-azul">
        <ul className="mx-auto hidden max-w-6xl justify-between px-4 py-3 lg:flex">
          {itens.map((i) => (
            <li key={i.href}><Link href={i.href} className={linkNav}>{i.rotulo}</Link></li>
          ))}
        </ul>
        <details className="lg:hidden">
          <summary className={`cursor-pointer list-none px-4 py-3 [&::-webkit-details-marker]:hidden ${linkNav}`}>Menu ≡</summary>
          <div className="border-t border-gelo/20 px-4 pt-4 sm:hidden"><BuscaForm /></div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3 px-4 py-4">
            {itens.map((i) => (
              <li key={i.href}><Link href={i.href} className={linkNav}>{i.rotulo}</Link></li>
            ))}
          </ul>
        </details>
      </nav>
    </header>
  );
}