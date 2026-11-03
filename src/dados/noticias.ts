// CONTEÚDO FICTÍCIO, apenas para demonstração.
// Depois, esta lista será substituída por dados do Supabase.
export const EDITORIAS = ["Política", "Economia", "Brasil", "Mundo", "Tecnologia", "Cultura", "Esportes"] as const;
export type Editoria = (typeof EDITORIAS)[number];

export type Noticia = { id: number; editoria: Editoria; titulo: string; resumo: string; minutos: number; hora: string };

// "Política" -> "politica" (usado nos links internos)
export const slug = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export const noticias: Noticia[] = [
  { id: 1, editoria: "Política", minutos: 5, hora: "08h10", titulo: "Congresso fictício aprova plano de transparência para contratos públicos", resumo: "A proposta imaginária cria um painel aberto para acompanhar cada contrato, do edital ao pagamento final." },
  { id: 2, editoria: "Política", minutos: 4, hora: "09h25", titulo: "Comissão simulada debate regras para propaganda eleitoral na internet", resumo: "Parlamentares fictícios divergem sobre prazos e limites de impulsionamento de conteúdo." },
  { id: 15, editoria: "Política", minutos: 3, hora: "10h40", titulo: "Prefeituras simuladas testam orçamento participativo online", resumo: "A iniciativa de exemplo permite votar as prioridades do bairro pelo celular." },
  { id: 3, editoria: "Economia", minutos: 4, hora: "07h50", titulo: "Inflação de exemplo desacelera e alivia o orçamento das famílias", resumo: "Dados inventados para o protótipo mostram queda nos preços de alimentos e transporte." },
  { id: 4, editoria: "Economia", minutos: 3, hora: "08h30", titulo: "Pequenas empresas fictícias ampliam contratações no segundo semestre", resumo: "Levantamento imaginário aponta alta de vagas no comércio e nos serviços." },
  { id: 5, editoria: "Brasil", minutos: 4, hora: "09h05", titulo: "Cidade de exemplo inaugura rede de ciclovias integrada ao transporte", resumo: "O projeto ilustrativo liga os bairros ao centro por 40 quilômetros de rotas." },
  { id: 6, editoria: "Brasil", minutos: 5, hora: "09h45", titulo: "Escolas fictícias adotam período integral em teste de dois anos", resumo: "O programa de demonstração prevê reforço de leitura e atividades culturais." },
  { id: 7, editoria: "Mundo", minutos: 6, hora: "06h55", titulo: "Cúpula imaginária reúne países por metas de energia limpa", resumo: "Delegações de nações fictícias discutem prazos para reduzir emissões." },
  { id: 8, editoria: "Mundo", minutos: 3, hora: "07h20", titulo: "Porto de país fictício reabre rota de cargas após reforma", resumo: "A obra simulada dobrou a capacidade e reduziu o tempo de espera dos navios." },
  { id: 9, editoria: "Tecnologia", minutos: 4, hora: "10h15", titulo: "Aplicativo de exemplo ajuda leitores a checar notícias em segundos", resumo: "A ferramenta fictícia compara fontes e sinaliza informações sem confirmação." },
  { id: 10, editoria: "Tecnologia", minutos: 5, hora: "10h50", titulo: "Pesquisadores simulados criam bateria que dura uma semana", resumo: "O protótipo imaginário usa materiais recicláveis e carrega em 20 minutos." },
  { id: 11, editoria: "Cultura", minutos: 4, hora: "08h00", titulo: "Festival fictício de literatura celebra autores de cinco regiões", resumo: "A programação de demonstração reúne debates, oficinas e leituras ao ar livre." },
  { id: 12, editoria: "Cultura", minutos: 6, hora: "08h45", titulo: "Exposição de exemplo reúne fotografia e jornalismo documental", resumo: "A mostra ilustrativa percorre três décadas de registros do cotidiano." },
  { id: 13, editoria: "Esportes", minutos: 3, hora: "09h30", titulo: "Time fictício vence clássico e assume a liderança do campeonato", resumo: "A partida simulada terminou em 2 a 1, com gol nos acréscimos." },
  { id: 14, editoria: "Esportes", minutos: 4, hora: "10h20", titulo: "Maratona imaginária bate recorde de participantes na capital", resumo: "A corrida de demonstração reuniu 20 mil atletas amadores e profissionais." },
];

export const porId = (id: number) => noticias.find((n) => n.id === id)!;
export const IDS_ULTIMAS = [14, 10, 15, 9, 6];
export const IDS_DESTAQUES = [4, 9, 12];
export const IDS_MAIS_LIDAS = [3, 9, 13, 1, 7];

// ---- Ajudantes usados pelas páginas internas ----
export const slugTexto = (t: string) =>
  t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const link = (n: Noticia) => `/${slug(n.editoria)}/${slugTexto(n.titulo)}`;
export const acharEditoria = (s: string) => EDITORIAS.find((e) => slug(e) === s);
export const daEditoria = (e: Editoria) => noticias.filter((n) => n.editoria === e);
export const acharNoticia = (e: string, s: string) =>
  noticias.find((n) => slug(n.editoria) === e && slugTexto(n.titulo) === s);

export const buscar = (q: string) => {
  const termos = slug(q).split(/\s+/).filter(Boolean);
  if (!termos.length) return [];
  return noticias.filter((n) => {
    const texto = slug(`${n.titulo} ${n.resumo} ${n.editoria}`);
    return termos.every((t) => texto.includes(t));
  });
};

// Corpo da matéria: a notícia 1 tem texto próprio; as demais usam o texto padrão de demonstração.
const corposEspeciais: Record<number, string[]> = {
  1: [
    "Este texto é uma demonstração. A medida imaginária aprovada pelo Congresso fictício obriga órgãos públicos a publicar, em um único painel, todos os contratos acima de um valor mínimo.",
    "Pelo plano de exemplo, cada contrato terá página própria, com edital, empresa vencedora, prazos e pagamentos. A consulta seria aberta a qualquer cidadão, sem cadastro.",
    "Nenhuma pessoa, instituição ou número citado é real. O objetivo é mostrar como uma matéria longa aparece no modelo de página do Comunica +.",
  ],
};
export const corpoDe = (n: Noticia) =>
  corposEspeciais[n.id] ?? [
    "Este é um texto de demonstração do protótipo do Comunica +. Nenhum fato, pessoa ou instituição citados aqui é real.",
    "O conteúdo serve apenas para mostrar como uma matéria completa aparece na página, com título, linha fina, assinatura, imagem e corpo do texto.",
    "Em uma versão futura, título, resumo e corpo virão do banco de dados. Cada notícia usará este mesmo modelo.",
  ];