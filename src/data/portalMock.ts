export const MUNICIPIOS_CUANZA_SUL = [
  "Sumbe", "Calulo", "Gabela", "Cassongue", "Porto Amboim", 
  "Quibala", "Seles", "Waku Kungo", "Mussende", "Quilenda", 
  "Ebo", "Conda", "Lonhe", "Quirimbo", "Quenha", "Munenga", 
  "Quissongo", "Condé", "Sanga", "Pambangala", "Gangula", 
  "Gungo", "Amboiva", "Boa Entrada"
];

export const usuariosMock = [
  { id: 1, nome: "João da Silva", hierarquia: "Presidente", provincia: "Luanda", ativo: true },
  { id: 2, nome: "Maria Oliveira", hierarquia: "1º Vice-Presidente", provincia: "Benguela", ativo: true },
  { id: 1, nome: "Danilson Developer", hierarquia: "Presidente Nacional", provincia: "Luanda", ativo: true, municipioOrigem: "Nacional" },
  { id: 2, nome: "António Manuel", hierarquia: "Secretário Provincial", provincia: "Cuanza Sul", ativo: true, municipioOrigem: "Sumbe" },
  { id: 3, nome: "Mateus José", hierarquia: "Secretário Municipal", provincia: "Cuanza Sul", municipioOrigem: "Calulo", ativo: true, criadoPor: 2 },
  { id: 4, nome: "Isabel Carlos", hierarquia: "Secretário Municipal", provincia: "Cuanza Sul", municipioOrigem: "Gabela", ativo: true, criadoPor: 2 },
  { id: 5, nome: "Paulo Afonso", hierarquia: "Coordenador de Núcleo", provincia: "Cuanza Sul", municipioOrigem: "Sumbe", ativo: true, criadoPor: 3 },
];

export const nucleosMock = [
  { id: 1, nome: "Núcleo Central", provincia: "Luanda", membros: 10, ativo: true },
  { id: 2, nome: "Núcleo Benguela Sul", provincia: "Benguela", membros: 8, ativo: true },
  { id: 3, nome: "Núcleo Viana Leste", provincia: "Luanda", membros: 10, ativo: true },
  { id: 4, nome: "Núcleo Huambo Norte", provincia: "Huambo", membros: 5, ativo: true },
];

export const militantesMock = [
  { id: 1, nome: "Fernando Lopes", bi: "123456789CS012", dataNascimento: "1985-05-12", provincia: "Cuanza Sul", municipio: "Sumbe", nucleoId: 1, activo: true, foto: "https://xsgames.co/randomusers/assets/avatars/male/1.jpg", registradoPor: 2 },
  { id: 2, nome: "Teresa Marcos", bi: "987654321CS098", dataNascimento: "1990-11-23", provincia: "Cuanza Sul", municipio: "Waku Kungo", nucleoId: 2, activo: false, foto: "https://xsgames.co/randomusers/assets/avatars/female/2.jpg", registradoPor: 3 },
  { id: 3, nome: "Luís Fernando", bi: "456123789CS045", dataNascimento: "2000-01-10", provincia: "Cuanza Sul", municipio: "Calulo", nucleoId: 4, activo: true, foto: "https://xsgames.co/randomusers/assets/avatars/male/3.jpg", registradoPor: 3 },
  { id: 4, nome: "Maria Auxiliadora", bi: "741258963CS074", dataNascimento: "1995-06-15", provincia: "Cuanza Sul", municipio: "Gabela", nucleoId: 1, activo: true, foto: "https://xsgames.co/randomusers/assets/avatars/female/5.jpg", registradoPor: 4 },
  { id: 5, nome: "António Manuel", bi: "369258147CS036", dataNascimento: "1988-09-30", provincia: "Cuanza Sul", municipio: "Porto Amboim", nucleoId: 2, activo: true, foto: "https://xsgames.co/randomusers/assets/avatars/male/8.jpg", registradoPor: 2 },
];

export const historicoMock = [
  { id: 1, vtrId: 1, vtr: "Toyota Hilux (LD-23-45)", data: "2024-04-10", acao: "Troca de Óleo e Filtros", custo: "125.000 Kz", responsavel: "Oficina Central" },
  { id: 2, vtrId: 2, vtr: "Ford Ranger (BG-12-34)", data: "2024-03-25", acao: "Substituição de Pneus", custo: "450.000 Kz", responsavel: "AutoBenguela" },
  { id: 3, vtrId: 1, vtr: "Toyota Hilux (LD-23-45)", data: "2024-02-15", acao: "Revisão Geral 50k", custo: "210.000 Kz", responsavel: "Oficina Central" },
];

export const historicoImoveisMock = [
  { id: 1, imovelId: 1, data: "15/04/2024", acao: "Pagamento de Renda Mensal", custo: "450.000", responsavel: "Secretariado Provincial" },
  { id: 2, imovelId: 1, data: "10/03/2024", acao: "Manutenção de Ar-Condicionado", custo: "25.000", responsavel: "Gestão Sumbe" },
  { id: 3, imovelId: 3, data: "05/04/2024", acao: "Reparação de Fachada", custo: "85.000", responsavel: "Comarca Porto Amboim" },
  { id: 4, imovelId: 2, data: "20/03/2024", acao: "Pagamento Parcial de Renda", custo: "180.000", responsavel: "Secretaria Calulo" },
];

export const relatoriosGraficosMock = [
  { periodo: 'Jan', producao: 120, quotasPagas: 85 },
  { periodo: 'Fev', producao: 150, quotasPagas: 110 },
  { periodo: 'Mar', producao: 180, quotasPagas: 140 },
  { periodo: 'Abr', producao: 200, quotasPagas: 175 },
  { periodo: 'Mai', producao: 250, quotasPagas: 210 },
  { periodo: 'Jun', producao: 300, quotasPagas: 260 },
];

export const agendamentosMock = [
  { id: 1, titulo: "Reunião do Comité Central", data: "2024-05-10T10:00:00", local: "Sede Nacional", tipo: "Reunião" },
  { id: 2, titulo: "Viagem Presidencial", data: "2024-05-15T08:00:00", local: "Benguela", tipo: "Viagem" },
];

export const notificacoesSmsMock = [
  { id: 1, destinatario: "Fernando Lopes", mensagem: "Bem-vindo ao Partido Liberal. Sua militância foi efectivada.", dataEnviada: "2024-04-20 10:30", status: "Enviado" },
  { id: 2, destinatario: "Teresa Marcos", mensagem: "Lembrete: Mantenha as suas quotas em dia para continuar ativo.", dataEnviada: "2024-04-21 09:15", status: "Pendente" },
];

export const imoveisMock = [
  { id: 1, nome: "Sede Provincial PL", localizacao: "Bairro Kitala, Sumbe", mensalidade: "Kz 450.000", status: "Regular", dataVencimento: "15/05/2024" },
  { id: 2, nome: "Comité Comarca Calulo", localizacao: "Zona Comercial, Calulo", mensalidade: "Kz 180.000", status: "Aviso", dataVencimento: "02/05/2024" },
  { id: 3, nome: "Secretariado Porto Amboim", localizacao: "Avenida Marginal, Porto Amboim", mensalidade: "Kz 220.000", status: "Crítico", dataVencimento: "28/04/2024" },
  { id: 4, nome: "Núcleo Waku Kungo", localizacao: "Bairro Novo, Waku Kungo", mensalidade: "Kz 95.000", status: "Regular", dataVencimento: "20/05/2024" },
  { id: 5, nome: "Sede Municipal Gabela", localizacao: "Largo da Independência, Gabela", mensalidade: "Kz 150.000", status: "Regular", dataVencimento: "12/05/2024" },
];

export const viaturasMock = [
  { id: 1, modelo: "Toyota Hilux", matricula: "LD-23-45-AO", ano: 2020, departamento: "Nacional", manutencaoProx: "2024-08-10" },
  { id: 2, modelo: "Ford Ranger", matricula: "BG-12-34-AO", ano: 2022, departamento: "Benguela", manutencaoProx: "2024-05-05" },
];
