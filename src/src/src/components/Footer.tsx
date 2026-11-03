import Image from "next/image";
import { EDITORIAS, slug } from "@/dados/noticias";

const tit = "mb-3 font-serif text-sm font-bold uppercase tracking-[0.15em] text-dourado";
const lnk = "font-sans text-sm text-gelo hover:underline";

export default function Footer() {
  return (
    <footer className="mt-12 border-t-4 border-dourado bg-azul text-gelo">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <Image src="/marca/logo-principal.png" alt="Comunica + — Portal de notícias" width={1204} height={768} className="w-56" />
          <p className="mt-4 font-sans text-sm text-gelo/80">Informação com clareza.</p>
        </div>
        <div>
          <h2 className={tit}>Editorias</h2>
          <ul className="grid grid-cols-2 gap-2">
            {EDITORIAS.map((e) => (
              <li key={e}><a href={`/${slug(e)}`} className={lnk}>{e}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={tit}>Institucional</h2>
          <ul className="space-y-2">
            {["Sobre o Comunica +", "Contato", "Política de privacidade"].map((t) => (
              <li key={t}><a href="#" className={lnk}>{t}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-gelo/20 px-4 py-4 text-center font-sans text-[11px] uppercase tracking-[0.15em] text-gelo/70">
        © 2026 Comunica + · Protótipo com conteúdo fictício, sem fins informativos
      </div>
    </footer>
  );
}