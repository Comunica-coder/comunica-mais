import Image from "next/image";

// Banner do site conforme o guia: conjunto alinhado à esquerda e filete dourado de 10 px na base.
export default function Banner() {
  return (
    <section aria-label="Comunica +" className="border-b-[10px] border-dourado bg-azul">
      <div className="mx-auto flex max-w-6xl items-center gap-5 px-4 py-10 sm:gap-8 sm:py-14">
        <Image src="/marca/microfone.png" alt="" width={520} height={800} className="h-16 w-auto sm:h-28" priority />
        <span aria-hidden className="h-16 w-px bg-dourado sm:h-28" />
        <div>
          <p className="font-serif text-3xl font-bold uppercase tracking-[0.12em] text-gelo sm:text-6xl">
            Comunica <span className="text-dourado">+</span>
          </p>
          <p className="mt-2 font-serif text-[10px] uppercase tracking-[0.35em] text-gelo sm:text-base">
            Informação com clareza
          </p>
        </div>
      </div>
    </section>
  );
}