"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { sb } from "@/lib/supabaseNavegador";
import { botao, botaoSec, campo, rotuloCampo, Selo } from "@/components/admin/ui";

type F = { titulo: string; subtitulo: string; conteudo: string; categoria: string; autor: string; imagem: string; status: string; data: string; destaque: boolean };
type Op = { id: number; nome: string };

const paraLocal = (iso: string) => {
  const d = new Date(iso);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};
const vazio = (): F => ({ titulo: "", subtitulo: "", conteudo: "", categoria: "", autor: "", imagem: "", status: "rascunho", data: paraLocal(new Date().toISOString()), destaque: false });

export default function Editor() {
  const { id } = useParams<{ id: string }>();
  const nova = id === "nova";
  const router = useRouter();
  const [f, setF] = useState<F>(vazio);
  const [cats, setCats] = useState<Op[]>([]);
  const [autores, setAutores] = useState<Op[]>([]);
  const [msg, setMsg] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [pronto, setPronto] = useState(nova);

  useEffect(() => {
    if (!sb) return;
    sb.from("categorias").select("id,nome").order("nome").then(({ data }) => setCats((data ?? []) as Op[]));
    sb.from("autores").select("id,nome").order("nome").then(({ data }) => setAutores((data ?? []) as Op[]));
    if (!nova)
      sb.from("noticias").select("*").eq("id", Number(id)).maybeSingle().then(({ data }) => {
        if (data) setF({ titulo: data.titulo, subtitulo: data.subtitulo ?? "", conteudo: data.conteudo, categoria: String(data.categoria_id), autor: data.autor_id ? String(data.autor_id) : "", imagem: data.imagem_url ?? "", status: data.status, data: paraLocal(data.publicado_em), destaque: data.destaque });
        else setMsg("Notícia não encontrada.");
        setPronto(true);
      });
  }, [id, nova]);

  const set = (k: keyof F) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF({ ...f, [k]: e.target.value });

  async function salvar(status: string) {
    if (!sb) return;
    if (!f.titulo.trim() || !f.conteudo.trim() || !f.categoria) return setMsg("Preencha título, editoria e conteúdo.");
    setOcupado(true);
    setMsg("");
    const dados = {
      titulo: f.titulo.trim(), subtitulo: f.subtitulo.trim() || null, conteudo: f.conteudo.trim(),
      imagem_url: f.imagem || null, categoria_id: Number(f.categoria), autor_id: f.autor ? Number(f.autor) : null,
      status, publicado_em: new Date(f.data || Date.now()).toISOString(), destaque: f.destaque,
    };
    if (nova) {
      const { data, error } = await sb.from("noticias").insert(dados).select("id").single();
      setOcupado(false);
      if (error || !data) return setMsg("Erro ao salvar: " + (error?.message ?? ""));
      router.replace(`/admin/noticias/${data.id}`);
    } else {
      const { error } = await sb.from("noticias").update(dados).eq("id", Number(id));
      setOcupado(false);
      if (error) return setMsg("Erro ao salvar: " + error.message);
      setF({ ...f, status });
      setMsg(status === "publicada" ? "Publicada. Aparece no portal em até 1 minuto." : "Rascunho salvo.");
    }
  }

  async function excluir() {
    if (!sb || !confirm("Excluir esta notícia? Não dá para desfazer.")) return;
    await sb.from("noticias").delete().eq("id", Number(id));
    router.push("/admin/noticias");
  }

  async function enviar(e: React.ChangeEvent<HTMLInputElement>) {
    const arq = e.target.files?.[0];
    if (!arq || !sb) return;
    if (arq.size > 5 * 1024 * 1024) return setMsg("A imagem deve ter até 5 MB.");
    const nome = `capas/${Date.now()}-${arq.name.replace(/[^a-zA-Z0-9.]+/g, "-")}`;
    const { error } = await sb.storage.from("imagens").upload(nome, arq, { contentType: arq.type });
    if (error) return setMsg("Erro ao enviar a imagem: " + error.message);
    setF({ ...f, imagem: sb.storage.from("imagens").getPublicUrl(nome).data.publicUrl });
    setMsg("Imagem enviada. Lembre-se de salvar a matéria.");
  }

  if (!pronto) return <p>Carregando…</p>;
  const publicada = f.status === "publicada";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-serif text-3xl font-bold">{nova ? "Nova notícia" : "Editar notícia"}</h1>
        {!nova && <Selo status={f.status} data={f.data ? new Date(f.data).toISOString() : undefined} />}
      </div>

      <div className="space-y-4 bg-white p-4 shadow-sm">
        <div><label className={rotuloCampo}>Título</label><input className={campo} value={f.titulo} onChange={set("titulo")} /></div>
        <div><label className={rotuloCampo}>Subtítulo</label><input className={campo} value={f.subtitulo} onChange={set("subtitulo")} /></div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={rotuloCampo}>Editoria</label>
            <select className={campo} value={f.categoria} onChange={set("categoria")}>
              <option value="">Escolha…</option>
              {cats.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
            </select>
          </div>
          <div>
            <label className={rotuloCampo}>Autor</label>
            <select className={campo} value={f.autor} onChange={set("autor")}>
              <option value="">Sem autor</option>
              {autores.map((a) => <option key={a.id} value={a.id}>{a.nome}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className={rotuloCampo}>Conteúdo (separe os parágrafos com uma linha em branco)</label>
          <textarea className={`${campo} font-serif text-base`} rows={14} value={f.conteudo} onChange={set("conteudo")} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className={rotuloCampo}>Data e hora de publicação</label><input className={campo} type="datetime-local" value={f.data} onChange={set("data")} /></div>
          <label className="flex items-center gap-2 self-end pb-2 font-sans text-sm">
            <input type="checkbox" checked={f.destaque} onChange={(e) => setF({ ...f, destaque: e.target.checked })} /> Matéria em destaque
          </label>
        </div>
        <div>
          <label className={rotuloCampo}>Imagem de capa (JPG, PNG ou WebP, até 5 MB)</label>
          {f.imagem && <img src={f.imagem} alt="Capa" className="mb-2 aspect-[16/9] w-full max-w-sm border-b-2 border-ouro object-cover" />}
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={enviar} className="block font-sans text-sm" />
          {f.imagem && <button type="button" onClick={() => setF({ ...f, imagem: "" })} className="mt-2 font-sans text-xs underline">Remover imagem</button>}
        </div>
      </div>

      {msg && <p className="border-l-2 border-ouro bg-white p-3 font-sans text-sm">{msg}</p>}

      <div className="flex flex-wrap gap-2">
        <button disabled={ocupado} onClick={() => salvar("publicada")} className={botao}>{publicada ? "Atualizar publicação" : "Publicar"}</button>
        <button disabled={ocupado} onClick={() => salvar("rascunho")} className={botaoSec}>Salvar como rascunho</button>
        {!nova && <button disabled={ocupado} onClick={excluir} className={botaoSec}>Excluir</button>}
        <Link href="/admin/noticias" className={botaoSec}>Voltar</Link>
      </div>
    </div>
  );
}