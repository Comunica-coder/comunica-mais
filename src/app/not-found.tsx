import Link from "next/link";

export default function NaoEncontrada() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-cinza">Erro 404</p>
      <h1 className="mt-3 font-serif text-4xl font-bold">Página não encontrada</h1>
      <p className="mt-3 font-serif text-lg">O endereço não existe ou a matéria foi removida.</p>
      <Link href="/" className="mt-6 inline-block border-b-[1.5px] border-ouro font-serif text-[15px] font-bold">
        Voltar ao início <span className="text-ouro">+</span>
      </Link>
    </div>
  );
}