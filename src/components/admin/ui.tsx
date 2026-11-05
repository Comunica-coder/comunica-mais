export const campo = "w-full border border-azul/30 bg-white px-3 py-2 font-sans text-sm text-azul focus:border-azul focus:outline-none";
export const botao = "bg-azul px-4 py-2 font-sans text-xs font-bold uppercase tracking-[0.15em] text-gelo hover:text-dourado disabled:opacity-50";
export const botaoSec = "border border-azul px-4 py-2 font-sans text-xs font-bold uppercase tracking-[0.15em] text-azul hover:bg-azul hover:text-gelo disabled:opacity-50";
export const rotuloCampo = "mb-1 block font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-cinza";

export function Selo({ status, data }: { status: string; data?: string }) {
  const agendada = status === "publicada" && !!data && new Date(data) > new Date();
  const texto = agendada ? "Agendada" : status === "publicada" ? "Publicada" : status === "rascunho" ? "Rascunho" : "Arquivada";
  const cor = texto === "Publicada" ? "bg-azul text-gelo" : texto === "Agendada" ? "bg-dourado text-azul" : "border border-azul text-azul";
  return <span className={`inline-block px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-[0.15em] ${cor}`}>{texto}</span>;
}