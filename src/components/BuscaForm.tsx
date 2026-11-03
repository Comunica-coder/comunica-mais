// Formulário simples: envia a palavra para /busca?q=palavra (sem JavaScript).
export default function BuscaForm({ className = "", valor = "" }: { className?: string; valor?: string }) {
  return (
    <form action="/busca" role="search" className={`flex ${className}`}>
      <input name="q" type="search" required defaultValue={valor} placeholder="Buscar notícias" aria-label="Buscar notícias"
        className="min-w-0 flex-1 border border-azul bg-papel px-3 py-2 font-sans text-sm text-azul placeholder:text-cinza" />
      <button className="border border-gelo/40 bg-azul px-4 font-sans text-xs font-bold uppercase tracking-[0.15em] text-gelo hover:text-dourado">
        Buscar
      </button>
    </form>
  );
}