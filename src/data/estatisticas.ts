export interface Estatistica {
  titulo: string;
  valor: number | string;
  variacao: number;
  tipo: 'positivo' | 'negativo' | 'neutro';
  icone: string;
  descricao: string;
}

export interface GraficoDados {
  mes: string;
  membrosNovos: number;
  atividadesRealizadas: number;
  participacaoMedia: number;
}

export const estatisticasMock: Estatistica[] = [
  {
    titulo: 'Total de Membros',
    valor: 1247,
    variacao: 12.5,
    tipo: 'positivo',
    icone: '👥',
    descricao: 'Membros ativos na organização'
  },
  {
    titulo: 'Membros Ativos',
    valor: 892,
    variacao: 8.3,
    tipo: 'positivo',
    icone: '✅',
    descricao: 'Membros participando regularmente'
  },
  {
    titulo: 'Atividades este Mês',
    valor: 23,
    variacao: 15.0,
    tipo: 'positivo',
    icone: '📅',
    descricao: 'Eventos e reuniões realizadas'
  },
  {
    titulo: 'Taxa de Participação',
    valor: '78%',
    variacao: 5.2,
    tipo: 'positivo',
    icone: '📈',
    descricao: 'Média de presença nos eventos'
  },
  {
    titulo: 'Novos Membros',
    valor: 45,
    variacao: -2.1,
    tipo: 'negativo',
    icone: '🆕',
    descricao: 'Inscrições este mês'
  },
  {
    titulo: 'Projetos Ativos',
    valor: 12,
    variacao: 0,
    tipo: 'neutro',
    icone: '🚀',
    descricao: 'Iniciativas em desenvolvimento'
  }
];

export const dadosGraficoMock: GraficoDados[] = [
  { mes: 'Jan', membrosNovos: 32, atividadesRealizadas: 8, participacaoMedia: 72 },
  { mes: 'Fev', membrosNovos: 28, atividadesRealizadas: 12, participacaoMedia: 78 },
  { mes: 'Mar', membrosNovos: 41, atividadesRealizadas: 15, participacaoMedia: 82 },
  { mes: 'Abr', membrosNovos: 35, atividadesRealizadas: 10, participacaoMedia: 75 },
  { mes: 'Mai', membrosNovos: 47, atividadesRealizadas: 18, participacaoMedia: 85 },
  { mes: 'Jun', membrosNovos: 39, atividadesRealizadas: 14, participacaoMedia: 79 },
  { mes: 'Jul', membrosNovos: 52, atividadesRealizadas: 20, participacaoMedia: 88 },
  { mes: 'Ago', membrosNovos: 44, atividadesRealizadas: 16, participacaoMedia: 81 },
  { mes: 'Set', membrosNovos: 38, atividadesRealizadas: 13, participacaoMedia: 77 },
  { mes: 'Out', membrosNovos: 46, atividadesRealizadas: 19, participacaoMedia: 84 },
  { mes: 'Nov', membrosNovos: 51, atividadesRealizadas: 22, participacaoMedia: 89 },
  { mes: 'Dez', membrosNovos: 43, atividadesRealizadas: 17, participacaoMedia: 83 }
];

export interface DadosDemograficos {
  faixaEtaria: { [key: string]: number };
  genero: { masculino: number; feminino: number; outro: number };
  provincias: { [key: string]: number };
  nivelFormacao: { [key: string]: number };
}

export const dadosDemograficosMock: DadosDemograficos = {
  faixaEtaria: {
    '18-25': 420,
    '26-35': 512,
    '36-45': 235,
    '46+': 80
  },
  genero: {
    masculino: 687,
    feminino: 523,
    outro: 37
  },
  provincias: {
    'Maputo Cidade': 234,
    'Maputo Província': 189,
    Sofala: 156,
    Nampula: 143,
    'Cabo Delgado': 98,
    Zambezia: 124,
    Inhambane: 89,
    Manica: 76,
    Gaza: 82,
    Tete: 67,
    Niassa: 58,
    Quelimane: 30
  },
  nivelFormacao: {
    'Ensino Secundário': 345,
    'Ensino Superior': 623,
    'Pós-Graduação': 156,
    'Outro': 123
  }
};

export interface CrescimentoDados {
  periodo: string;
  crescimentoMembros: number;
  crescimentoAtividades: number;
  crescimentoEngajamento: number;
}

export const dadosCrescimentoMock: CrescimentoDados[] = [
  { periodo: '2021', crescimentoMembros: 15, crescimentoAtividades: 22, crescimentoEngajamento: 18 },
  { periodo: '2022', crescimentoMembros: 28, crescimentoAtividades: 35, crescimentoEngajamento: 31 },
  { periodo: '2023', crescimentoMembros: 42, crescimentoAtividades: 48, crescimentoEngajamento: 45 },
  { periodo: '2024', crescimentoMembros: 35, crescimentoAtividades: 41, crescimentoEngajamento: 38 }
];