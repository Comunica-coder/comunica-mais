"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sb } from "@/lib/supabaseNavegador";
import { botao, botaoSec, campo, rotuloCampo } from "./ui";

type Estado = "carregando" | "sem-login" | "sem-permissao" | "ok";
const menu = [
  { href: "/admin", rotulo: "Dashboard" },
  { href: "/admin/noticias", rotulo: "Notícias" },
  { href: "/admin/noticias/nova", rotulo: "Nova notícia" },
  { href: "/", rotulo: "Ver portal" },
];

export default function Guarda({ children }: { children: React.ReactNode }) {
  const [estado, setEstado] = useState<Estado>("carregando");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const rota = usePathname() ?? "";

  async function verificar() {
    if (!sb) return setEstado("sem-login");
    const { data } = await sb.auth.getUser();
    if (!data.user) return setEstado("sem-login");
    const { data: adm } = await sb.from("administradores").select("user_id").eq("user_id", data.user.id).maybeSingle();
    setEstado(adm ? "ok" : "sem-permissao");
  }
  useEffect(() => { verificar(); }, []);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    if (!sb) return;
    const { error } = await sb.auth.signInWithPassword({ email, password: senha });
        if (error) return setErro("Não foi possível entrar: " + error.message);
    setEstado("carregando");
    verificar();
  }
  async function sair() {
    await sb?.auth.signOut();
    setEmail(""); setSenha("");
    setEstado("sem-login");
  }

  const caixa = (conteudo: React.ReactNode) => (
    <div className="flex min-h-screen items-center justify-center bg-gelo px-4 font-sans text-azul">
      <div className="w-full max-w-sm border-t-4 border-ouro bg-white p-6 shadow-sm">{conteudo}</div>
    </div>
  );

  if (!sb) return caixa(<p>Configuração do Supabase ausente. Confira as variáveis na Vercel.</p>);
  if (estado === "carregando") return caixa(<p>Carregando…</p>);
  if (estado === "sem-permissao")
    return caixa(<>
      <p className="mb-4">Esta conta não tem permissão de administrador.</p>
      <button onClick={sair} className={botaoSec}>Sair</button>
    </>);
  if (estado === "sem-login")
    return caixa(
      <form onSubmit={entrar} className="space-y-4">
        <h1 className="font-serif text-2xl font-bold uppercase tracking-[0.1em]">Comunica <span className="text-ouro">+</span></h1>
        <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-cinza">Painel administrativo</p>
        <div><label className={rotuloCampo}>E-mail</label><input className={campo} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
        <div><label className={rotuloCampo}>Senha</label><input className={campo} type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} /></div>
        {erro && <p className="text-sm text-red-700">{erro}</p>}
        <button className={`${botao} w-full`}>Entrar</button>
      </form>
    );

  return (
    <div className="min-h-screen bg-gelo font-sans text-azul">
      <header className="sticky top-0 z-30 border-b-2 border-ouro bg-azul text-gelo">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <p className="font-serif text-lg font-bold uppercase tracking-[0.12em]">
            Comunica <span className="text-dourado">+</span>
            <span className="ml-2 font-sans text-[11px] font-normal tracking-[0.15em] text-gelo/70">Painel</span>
          </p>
          <button onClick={sair} className="text-xs font-bold uppercase tracking-[0.15em] hover:text-dourado">Sair</button>
        </div>
        <nav className="mx-auto flex max-w-5xl gap-4 overflow-x-auto px-4 pb-2">
          {menu.map((m) => (
            <Link key={m.href} href={m.href}
              className={`whitespace-nowrap border-b-2 pb-1 text-xs font-bold uppercase tracking-[0.15em] ${rota === m.href ? "border-dourado" : "border-transparent hover:text-dourado"}`}>
              {m.rotulo}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
    </div>
  );
}
