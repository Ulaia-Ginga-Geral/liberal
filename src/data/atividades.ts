export interface Atividade {
  id: string;
  titulo: string;
  descricao: string;
  tipo: 'reuniao' | 'evento' | 'campanha' | 'formacao' | 'visita';
  data: string;
  hora: string;
  local: string;
  provincia: string;
  cidade: string;
  participantesConfirmados: number;
  participantesEsperados: number;
  status: 'planejada' | 'em-andamento' | 'concluida' | 'cancelada';
  responsavel: string;
  coordenadores: string[];
  objetivos: string[];
  recursosNecessarios: string[];
  orcamento?: number;
  fotos?: string[];
  documentos?: string[];
}

export const atividadesMock: Atividade[] = [
  {
    id: '1',
    titulo: 'Conferência Regional de Juventude',
    descricao: 'Encontro anual dos líderes juvenis para discutir estratégias e planejamento para o próximo ano.',
    tipo: 'reuniao',
    data: '2024-02-15',
    hora: '09:00',
    local: 'Centro de Convenções Maputo',
    provincia: 'Maputo Cidade',
    cidade: 'Maputo',
    participantesConfirmados: 127,
    participantesEsperados: 150,
    status: 'planejada',
    responsavel: 'Ana Maria Costa',
    coordenadores: ['Carlos João Fernandes', 'Sofia Alexandra Nunes'],
    objetivos: [
      'Definir plano de ação para 2024',
      'Eleger nova diretoria juvenil',
      'Discutir políticas públicas para juventude'
    ],
    recursosNecessarios: ['Auditório', 'Equipamentos audiovisuais', 'Material de escritório'],
    orcamento: 25000,
    fotos: ['/images/atividades/conferencia1.jpg', '/images/atividades/conferencia2.jpg']
  },
  {
    id: '2',
    titulo: 'Campanha de Sensibilização Ambiental',
    descricao: 'Ação de limpeza e sensibilização sobre preservação ambiental nas comunidades urbanas.',
    tipo: 'campanha',
    data: '2024-01-25',
    hora: '08:00',
    local: 'Parque da Marginal',
    provincia: 'Maputo Cidade',
    cidade: 'Maputo',
    participantesConfirmados: 89,
    participantesEsperados: 100,
    status: 'em-andamento',
    responsavel: 'Carlos João Fernandes',
    coordenadores: ['Maria João Silva'],
    objetivos: [
      'Limpar áreas públicas',
      'Sensibilizar população sobre reciclagem',
      'Plantar árvores nativas'
    ],
    recursosNecessarios: ['Luvas', 'Sacolas para lixo', 'Mudas de árvores', 'Água'],
    orcamento: 8500,
    fotos: ['/images/atividades/campanha1.jpg']
  },
  {
    id: '3',
    titulo: 'Workshop de Liderança Política',
    descricao: 'Formação intensiva sobre liderança política e habilidades de gestão para novos membros.',
    tipo: 'formacao',
    data: '2023-12-10',
    hora: '14:00',
    local: 'Sede Nacional do Partido',
    provincia: 'Maputo Cidade',
    cidade: 'Maputo',
    participantesConfirmados: 45,
    participantesEsperados: 50,
    status: 'concluida',
    responsavel: 'Sofia Alexandra Nunes',
    coordenadores: ['Ana Maria Costa', 'Pedro Miguel Santos'],
    objetivos: [
      'Desenvolver habilidades de liderança',
      'Compreender estrutura partidária',
      'Melhorar comunicação política'
    ],
    recursosNecessarios: ['Projetor', 'Computadores', 'Material didático', 'Coffee break'],
    orcamento: 12000,
    fotos: ['/images/atividades/workshop1.jpg', '/images/atividades/workshop2.jpg'],
    documentos: ['/docs/workshop-resultados.pdf']
  },
  {
    id: '4',
    titulo: 'Visita às Comunidades Rurais',
    descricao: 'Visita técnica às comunidades rurais para conhecer realidades locais e identificar necessidades.',
    tipo: 'visita',
    data: '2023-11-20',
    hora: '07:00',
    local: 'Distrito de Manhiça',
    provincia: 'Maputo Província',
    cidade: 'Manhiça',
    participantesConfirmados: 23,
    participantesEsperados: 25,
    status: 'concluida',
    responsavel: 'Pedro Miguel Santos',
    coordenadores: ['Maria João Silva'],
    objetivos: [
      'Diagnosticar necessidades das comunidades',
      'Fortalecer ligação com base rural',
      'Identificar líderes comunitários'
    ],
    recursosNecessarios: ['Transporte', 'Equipamentos de campo', 'Material de registro'],
    orcamento: 15000,
    fotos: ['/images/atividades/visita1.jpg'],
    documentos: ['/docs/relatorio-visita-manhica.pdf']
  },
  {
    id: '5',
    titulo: 'Debate Político Juvenil',
    descricao: 'Debate aberto sobre temas políticos atuais envolvendo jovens de diferentes organizações.',
    tipo: 'evento',
    data: '2024-03-05',
    hora: '18:00',
    local: 'Auditório Universitário',
    provincia: 'Maputo Cidade',
    cidade: 'Maputo',
    participantesConfirmados: 203,
    participantesEsperados: 250,
    status: 'planejada',
    responsavel: 'Ana Maria Costa',
    coordenadores: ['Sofia Alexandra Nunes', 'Carlos João Fernandes'],
    objetivos: [
      'Promover diálogo político construtivo',
      'Posicionar juventude nas questões nacionais',
      'Fortalecer imagem institucional'
    ],
    recursosNecessarios: ['Auditório', 'Sistema de som', 'Divulgação', 'Segurança'],
    orcamento: 18000
  }
];

export const getTipoAtividadeColor = (tipo: string) => {
  switch (tipo) {
    case 'reuniao':
      return 'bg-blue-100 text-blue-800';
    case 'evento':
      return 'bg-purple-100 text-purple-800';
    case 'campanha':
      return 'bg-green-100 text-green-800';
    case 'formacao':
      return 'bg-yellow-100 text-yellow-800';
    case 'visita':
      return 'bg-indigo-100 text-indigo-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusAtividadeColor = (status: string) => {
  switch (status) {
    case 'planejada':
      return 'bg-gray-100 text-gray-800';
    case 'em-andamento':
      return 'bg-blue-100 text-blue-800';
    case 'concluida':
      return 'bg-green-100 text-green-800';
    case 'cancelada':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};