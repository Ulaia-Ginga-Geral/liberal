// Mock data for members
export interface Endereco {
  rua: string;
  cidade: string;
  provincia: string;
  codigoPostal: string;
}

export interface RedesSociais {
  facebook?: string;
  twitter?: string;
  instagram?: string;
}

export interface Membro {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  endereco: Endereco;
  status: 'ativo' | 'inativo' | 'reserva';
  cargo: string;
  dataInscricao: string;
  fotoUrl: string;
  numeroIdentificacao: string;
  atividadesParticipadas: number;
  ultimaAtividade: string;
  nivelEngajamento: 'baixo' | 'medio' | 'alto';
  interesses: string[];
  redesSociais: RedesSociais;
}

export const membrosMock: Membro[] = [
  {
    id: '1',
    nome: 'Ana Maria Costa',
    email: 'ana.costa@email.com',
    telefone: '+244 923 456 789',
    dataNascimento: '1995-03-15',
    endereco: {
      rua: 'Rua Hoji ya Henda, 123',
      cidade: 'Luanda',
      provincia: 'Luanda',
      codigoPostal: '1000'
    },
    status: 'ativo',
    cargo: 'Coordenadora Provincial',
    dataInscricao: '2020-06-15',
    fotoUrl: '/images/membros/ana.jpg',
    numeroIdentificacao: 'PL-2020-001',
    atividadesParticipadas: 42,
    ultimaAtividade: '2024-01-10',
    nivelEngajamento: 'alto',
    interesses: ['Política', 'Educação', 'Direitos Humanos'],
    redesSociais: {
      facebook: 'anacosta',
      twitter: 'anacosta_pl',
      instagram: 'anacosta.pl'
    }
  },
  {
    id: '2',
    nome: 'Carlos João Fernandes',
    email: 'carlos.fernandes@email.com',
    telefone: '+244 934 567 890',
    dataNascimento: '1992-08-22',
    endereco: {
      rua: 'Avenida 4 de Fevereiro, 45',
      cidade: 'Huambo',
      provincia: 'Huambo',
      codigoPostal: '2000'
    },
    status: 'ativo',
    cargo: 'Secretário Municipal',
    dataInscricao: '2019-05-20',
    fotoUrl: '/images/membros/carlos.jpg',
    numeroIdentificacao: 'PL-2019-015',
    atividadesParticipadas: 38,
    ultimaAtividade: '2024-01-08',
    nivelEngajamento: 'medio',
    interesses: ['Economia', 'Emprego', 'Juventude'],
    redesSociais: {
      facebook: 'carlosfernandes',
      instagram: 'carlos.pl'
    }
  },
  {
    id: '3',
    nome: 'Maria João Silva',
    email: 'maria.silva@email.com',
    telefone: '+244 915 678 901',
    dataNascimento: '1998-11-30',
    endereco: {
      rua: 'Rua Serpa Pinto, 789',
      cidade: 'Benguela',
      provincia: 'Benguela',
      codigoPostal: '3000'
    },
    status: 'reserva',
    cargo: 'Membro',
    dataInscricao: '2021-03-10',
    fotoUrl: '/images/membros/maria.jpg',
    numeroIdentificacao: 'PL-2021-023',
    atividadesParticipadas: 25,
    ultimaAtividade: '2024-01-05',
    nivelEngajamento: 'baixo',
    interesses: ['Saúde', 'Cultura', 'Desporto'],
    redesSociais: {
      facebook: 'mariasilva',
      instagram: 'maria.pl'
    }
  },
  {
    id: '4',
    nome: 'Pedro António Santos',
    email: 'pedro.santos@email.com',
    telefone: '+244 946 789 012',
    dataNascimento: '1985-07-08',
    endereco: {
      rua: 'Avenida 21 de Janeiro, 321',
      cidade: 'Cabinda',
      provincia: 'Cabinda',
      codigoPostal: '4000'
    },
    status: 'ativo',
    cargo: 'Presidente de Secção',
    dataInscricao: '2018-11-12',
    fotoUrl: '/images/membros/pedro.jpg',
    numeroIdentificacao: 'PL-2018-008',
    atividadesParticipadas: 56,
    ultimaAtividade: '2024-01-12',
    nivelEngajamento: 'alto',
    interesses: ['Segurança', 'Infraestruturas', 'Ambiente'],
    redesSociais: {
      facebook: 'pedrosantos',
      twitter: 'pedrosantos_pl'
    }
  },
  {
    id: '5',
    nome: 'Esperança Van-Dúnem',
    email: 'esperanca.van@email.com',
    telefone: '+244 927 890 123',
    dataNascimento: '1990-12-25',
    endereco: {
      rua: 'Rua Rainha Ginga, 654',
      cidade: 'Lubango',
      provincia: 'Huíla',
      codigoPostal: '5000'
    },
    status: 'ativo',
    cargo: 'Vice-Presidente',
    dataInscricao: '2017-09-03',
    fotoUrl: '/images/membros/esperanca.jpg',
    numeroIdentificacao: 'PL-2017-005',
    atividadesParticipadas: 68,
    ultimaAtividade: '2024-01-14',
    nivelEngajamento: 'alto',
    interesses: ['Política', 'Mulheres', 'Juventude', 'Educação'],
    redesSociais: {
      facebook: 'esperancavandunem',
      instagram: 'esperanca.pl',
      twitter: 'evandunem'
    }
  },
  {
    id: '6',
    nome: 'Joaquim Chissano',
    email: 'joaquim.chissano@email.com',
    telefone: '+244 938 901 234',
    dataNascimento: '1988-04-18',
    endereco: {
      rua: 'Rua Eduardo dos Santos, 987',
      cidade: 'Malanje',
      provincia: 'Malanje',
      codigoPostal: '6000'
    },
    status: 'ativo',
    cargo: 'Coordenador de Campanha',
    dataInscricao: '2020-02-20',
    fotoUrl: '/images/membros/joaquim.jpg',
    numeroIdentificacao: 'PL-2020-018',
    atividadesParticipadas: 33,
    ultimaAtividade: '2024-01-09',
    nivelEngajamento: 'medio',
    interesses: ['Campanhas Eleitorais', 'Comunicação', 'Marketing Político'],
    redesSociais: {
      facebook: 'joaquimchissano',
      instagram: 'jc.politica'
    }
  }
];

// Função para obter a cor correspondente ao status do membro
export function getStatusColor(status: string): string {
  switch (status) {
    case 'ativo':
      return 'bg-green-100 text-green-800';
    case 'inativo':
      return 'bg-red-100 text-red-800';
    case 'reserva':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

// Função para obter a cor correspondente ao nível de engajamento
export function getEngajamentoColor(nivel: string): string {
  switch (nivel) {
    case 'alto':
      return 'bg-green-100 text-green-800';
    case 'medio':
      return 'bg-yellow-100 text-yellow-800';
    case 'baixo':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}