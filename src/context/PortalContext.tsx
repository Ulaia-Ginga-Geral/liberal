'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  militantesMock, 
  usuariosMock, 
  viaturasMock, 
  imoveisMock, 
  nucleosMock,
  historicoMock
} from '@/data/portalMock';

// --- Interfaces ---

export interface Membro {
  id: number;
  nome: string;
  pseudonimo?: string;
  nomePai?: string;
  nomeMae?: string;
  naturalidade?: string;
  bi: string;
  localEmissao?: string;
  validoAte?: string;
  provincia: string;
  municipio: string;
  comuna?: string;
  bairro?: string;
  rua?: string;
  sexo?: 'Masculino' | 'Feminino';
  profissao?: string;
  observacoes?: string;
  assinaturaData?: string;
  foto?: string;
  activo: boolean;
  dataNascimento?: string;
  nucleoId?: number;
  registradoPor?: number;
}

export interface Usuario {
  id: number;
  nome: string;
  hierarquia: string;
  provincia: string;
  municipioOrigem?: string;
  ativo: boolean;
  criadoPor?: number;
}

export interface Viatura {
  id: number;
  modelo: string;
  matricula: string;
  ano: number;
  departamento: string;
  manutencaoProx: string;
}

export interface Imovel {
  id: number;
  nome: string;
  localizacao: string;
  mensalidade: string;
  status: 'Regular' | 'Aviso' | 'Crítico';
  dataVencimento: string;
  dono?: string;
  contacto?: string;
  formaPagamento?: '6 Meses' | '1 Ano' | '5 Anos';
  diaVencimento?: string;
}

export interface Nucleo {
  id: number;
  nome: string;
  provincia: string;
  membros: number;
  ativo: boolean;
}

export interface Transacao {
  id: number;
  data: string;
  descricao: string;
  valor: number;
  tipo: 'entrada' | 'saida';
  categoria: 'Sede' | 'Viatura' | 'Membro' | 'Administrativo' | 'Outros' | 'Reserva' | 'Quotas';
  status: 'Pendente' | 'Aprovado';
  comprovativo?: string;
  entidadeId?: number; // ID do Imóvel ou Viatura associada
}

export interface Manutencao {
  id: number;
  vtrId: number;
  vtr: string;
  data: string;
  acao: string;
  custo: string;
  responsavel: string;
}

export interface Documento {
  id: number;
  nome: string;
  tipo: string;
  data: string;
  size: string;
  categoria?: string;
}

export interface HistoricoEstado {
  id: number;
  data: string;
  estadoAnterior: string;
  novoEstado: string;
  foto: string;
  causa: string;
}

export interface ItemInventario {
  id: number;
  nome: string;
  categoria: string;
  estado: 'Novo' | 'Bom' | 'Regular' | 'Danificado';
  localizacao: string;
  dataAquisicao: string;
  origem: string;
  foto?: string;
  observacoes?: string;
  historicoEstado?: HistoricoEstado[];
}

export interface Missao {
  id: number;
  titulo: string;
  data: string;
  hora: string;
  local: string;
  responsavel: string;
}

interface PortalContextType {
  // Membros
  membros: Membro[];
  addMembro: (membro: Omit<Membro, 'id'>) => void;
  updateMembro: (id: number, membro: Partial<Membro>) => void;
  deleteMembro: (id: number) => void;
  getMembro: (id: number) => Membro | undefined;

  militantes: Membro[];
  usuarios: Usuario[];
  addUsuario: (usuario: Omit<Usuario, 'id'>) => void;

  // Viaturas
  viaturas: Viatura[];
  addViatura: (viatura: Omit<Viatura, 'id'>) => void;
  deleteViatura: (id: number) => void;

  // Imóveis (Sedes)
  imoveis: Imovel[];
  addImovel: (imovel: Omit<Imovel, 'id'>) => void;
  deleteImovel: (id: number) => void;
  updateImovel: (id: number, updated: Partial<Imovel>) => void;

  // Núcleos
  nucleos: Nucleo[];
  addNucleo: (nucleo: Omit<Nucleo, 'id'>) => void;
  deleteNucleo: (id: number) => void;

  // Finanças
  saldo: number;
  transacoes: Transacao[];
  addTransacao: (transacao: Omit<Transacao, 'id'>) => void;
  deleteTransacao: (id: number) => void;
  aprovarTransacao: (id: number) => void;
  reservaLivre: number;
  transferirParaReserva: (valor: number) => void;
  transferirParaSaldo: (valor: number) => void;

  // Manutenções
  manutencoes: Manutencao[];
  addManutencao: (manutencao: Omit<Manutencao, 'id'>) => void;
  deleteManutencao: (id: number) => void;

  // Documentos
  documentos: Documento[];
  addDocumento: (doc: Omit<Documento, 'id'>) => void;
  deleteDocumento: (id: number) => void;

  // Helpers
  getDividaAcumulada: () => number;
  getTotalGastoImovel: (id: number) => number;
  getTotalGastoViatura: (id: number) => number;
  logout: () => void;

  // Missões (Agenda)
  missoes: Missao[];
  addMissao: (missao: Omit<Missao, 'id'>) => void;
  deleteMissao: (id: number) => void;
  updateMissao: (id: number, missao: Partial<Missao>) => void;

  // Inventário
  inventario: ItemInventario[];
  addItemInventario: (item: Omit<ItemInventario, 'id'>) => void;
  updateItemInventario: (id: number, updated: Partial<ItemInventario>) => void;
  deleteItemInventario: (id: number) => void;
  alterarEstadoInventario: (id: number, novoEstado: ItemInventario['estado'], foto: string, causa: string) => void;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

export function PortalProvider({ children }: { children: React.ReactNode }) {
  const [membros, setMembros] = useState<Membro[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [viaturas, setViaturas] = useState<Viatura[]>([]);
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [militantes, setMilitantes] = useState<Membro[]>([]);
  const [nucleos, setNucleos] = useState<Nucleo[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [saldo, setSaldo] = useState<number>(0); 
  const [reservaLivre, setReservaLivre] = useState<number>(0);
  const [missoes, setMissoes] = useState<Missao[]>([]);
  const [inventario, setInventario] = useState<ItemInventario[]>([]);
  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  // --- Carregar LocalStorage ---
  useEffect(() => {
    const loadData = <T,>(key: string, mock: T[]): T[] => {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : mock;
    };

    setMembros(loadData('pl_membros', militantesMock as Membro[]));
    setUsuarios(loadData('pl_usuarios', usuariosMock));
    setViaturas(loadData('pl_viaturas', viaturasMock));
    setImoveis(loadData('pl_imoveis', imoveisMock as Imovel[]));
    setMilitantes(loadData('pl_militantes', militantesMock as Membro[]));
    setNucleos(loadData('pl_nucleos', nucleosMock));
    
    const transacoesIniciais: Transacao[] = historicoMock.map((h, i) => ({
      id: i + 1,
      data: h.data,
      descricao: `Manutenção: ${h.acao} (${h.vtr})`,
      valor: parseInt(h.custo.replace(/\./g, '').replace(' Kz', '')),
      tipo: 'saida',
      categoria: 'Viatura',
      status: 'Aprovado'
    }));
    setTransacoes(loadData('pl_transacoes', transacoesIniciais));
    setManutencoes(loadData('pl_manutencoes', historicoMock as Manutencao[]));
    setDocumentos(loadData('pl_documentos', []));
    setMissoes(loadData('pl_missoes', [
      { id: 1, titulo: "Conferência Provincial", data: "2024-05-15", hora: "09:00", local: "Sumbe - Cine Cuanza", responsavel: "Secretariado Provincial" },
      { id: 2, titulo: "Missão Diplomática em Luanda", data: "2024-05-20", hora: "08:30", local: "Luanda - Aeroporto", responsavel: "Presidente Provincial" },
      { id: 3, titulo: "Mobilização em Calulo", data: "2024-06-02", hora: "14:00", local: "Calulo - Centro Cultural", responsavel: "Direcção de Mobilização" },
    ]));
    setInventario(loadData('pl_inventario', [
      { id: 1, nome: "Computador HP EliteBook", categoria: "TI & Informática", estado: "Bom", localizacao: "Sede Provincial Sumbe", dataAquisicao: "2023-10-15", origem: "Doação Direcção Nacional", observacoes: "Uso do Secretariado" },
      { id: 2, nome: "Cadeira Presidencial", categoria: "Mobiliário", estado: "Novo", localizacao: "Gabinete do Presidente", dataAquisicao: "2024-01-20", origem: "Compra Própria", observacoes: "Couro Preto" },
    ]));

    const savedSaldo = localStorage.getItem('pl_saldo');
    if (savedSaldo) setSaldo(Number(savedSaldo));
    else {
      // Calcular saldo inicial baseado em transações se não houver saldo salvo
      const total = transacoesIniciais.reduce((acc, t) => t.tipo === 'entrada' ? acc + t.valor : acc - t.valor, 0);
      setSaldo(total);
    }

    const savedReserva = localStorage.getItem('pl_reserva_livre');
    if (savedReserva) setReservaLivre(Number(savedReserva));
  }, []);

  // --- Persistir LocalStorage ---
  useEffect(() => {
    localStorage.setItem('pl_membros', JSON.stringify(membros));
    localStorage.setItem('pl_usuarios', JSON.stringify(usuarios));
    localStorage.setItem('pl_viaturas', JSON.stringify(viaturas));
    localStorage.setItem('pl_imoveis', JSON.stringify(imoveis));
    localStorage.setItem('pl_nucleos', JSON.stringify(nucleos));
    localStorage.setItem('pl_transacoes', JSON.stringify(transacoes));
    localStorage.setItem('pl_manutencoes', JSON.stringify(manutencoes));
    localStorage.setItem('pl_documentos', JSON.stringify(documentos));
    localStorage.setItem('pl_missoes', JSON.stringify(missoes));
    localStorage.setItem('pl_inventario', JSON.stringify(inventario));
    localStorage.setItem('pl_saldo', saldo.toString());
    localStorage.setItem('pl_reserva_livre', reservaLivre.toString());
  }, [membros, usuarios, viaturas, imoveis, nucleos, transacoes, saldo, reservaLivre]);

  // --- Funções Auxiliares de Persistência ---
  const saveData = <T,>(key: string, data: T[]): T[] => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
    }
    return data;
  };

  const getNextId = (list: { id: number }[]) => 
    list.length > 0 ? Math.max(...list.map(i => i.id)) + 1 : 1;

  // --- Implementação CRM/Admin ---

  const addMembro = (m: Omit<Membro, 'id'>) => setMembros([...membros, { ...m, id: getNextId(membros) }]);
  const updateMembro = (id: number, data: Partial<Membro>) => setMembros(membros.map(m => m.id === id ? { ...m, ...data } : m));
  const deleteMembro = (id: number) => setMembros(membros.filter(m => m.id !== id));
  const getMembro = (id: number) => membros.find(m => m.id === id);

  const addUsuario = (u: Omit<Usuario, 'id'>) => setUsuarios([...usuarios, { ...u, id: getNextId(usuarios) }]);
  
  const addNucleo = (n: Omit<Nucleo, 'id'>) => {
    const newDoc = { ...n, id: Date.now() };
    setNucleos(prev => saveData('pl_nucleos', [...prev, newDoc]));
  };

  const deleteNucleo = (id: number) => {
    setNucleos(prev => saveData('pl_nucleos', prev.filter(n => n.id !== id)));
  };

  const addViatura = (v: Omit<Viatura, 'id'>) => {
    const newDoc = { ...v, id: Date.now() };
    setViaturas(prev => saveData('pl_viaturas', [...prev, newDoc]));
  };

  const deleteViatura = (id: number) => {
    setViaturas(prev => saveData('pl_viaturas', prev.filter(v => v.id !== id)));
  };

  const addImovel = (i: Omit<Imovel, 'id'>) => {
    const newDoc = { ...i, id: Date.now() };
    setImoveis(prev => saveData('pl_imoveis', [...prev, newDoc]));
  };

  const deleteImovel = (id: number) => {
    setImoveis(prev => saveData('pl_imoveis', prev.filter(i => i.id !== id)));
  };

  // --- Finanças ---

  const addTransacao = (t: Omit<Transacao, 'id'>) => {
    const newDoc = { ...t, id: Date.now() };
    setTransacoes(prev => saveData('pl_transacoes', [...prev, newDoc]));
    
    if (newDoc.status === 'Aprovado') {
      atualizarSaldoEDeducoes(newDoc);
    }
  };

  const deleteTransacao = (id: number) => {
    setTransacoes(prev => saveData('pl_transacoes', prev.filter(t => t.id !== id)));
  };

  const atualizarSaldoEDeducoes = (t: Transacao) => {
    if (t.tipo === 'entrada') {
      setSaldo(prev => prev + t.valor);
    } else {
      setSaldo(prev => prev - t.valor);
    }
  };

  const aprovarTransacao = (id: number) => {
    setTransacoes(prev => {
      const updated = prev.map(t => {
        if (t.id === id && t.status === 'Pendente') {
          const aprovada: Transacao = { ...t, status: 'Aprovado' };
          atualizarSaldoEDeducoes(aprovada);
          return aprovada;
        }
        return t;
      });
      return saveData('pl_transacoes', updated);
    });
  };

  const transferirParaReserva = (valor: number) => {
    if (valor > saldo) return;
    
    const t: Omit<Transacao, 'id'> = {
      data: new Date().toISOString().split('T')[0],
      descricao: 'Transferência para Reserva Livre',
      valor,
      tipo: 'saida',
      categoria: 'Reserva',
      status: 'Aprovado'
    };
    
    addTransacao(t);
    setReservaLivre(prev => prev + valor);
  };

  const transferirParaSaldo = (valor: number) => {
    if (valor > reservaLivre) return;
    
    const t: Omit<Transacao, 'id'> = {
      data: new Date().toISOString().split('T')[0],
      descricao: 'Resgate de Reserva Livre',
      valor,
      tipo: 'entrada',
      categoria: 'Reserva',
      status: 'Aprovado'
    };
    
    addTransacao(t);
    setReservaLivre(prev => prev - valor);
  };

  // --- Manutenções ---
  const addManutencao = (m: Omit<Manutencao, 'id'>) => {
    const newDoc = { ...m, id: Date.now() };
    setManutencoes([...manutencoes, newDoc]);
    
    // Gerar transação automática
    addTransacao({
      descricao: `Manutenção Automóvel: ${m.vtr} - ${m.acao}`,
      valor: parseInt(m.custo.replace(/\./g, '').replace(' Kz', '')),
      tipo: 'saida',
      categoria: 'Viatura',
      data: m.data,
      status: 'Aprovado'
    });
  };

  const deleteManutencao = (id: number) => {
    setManutencoes(manutencoes.filter(m => m.id !== id));
  };

  // --- Documentos ---
  const addDocumento = (doc: Omit<Documento, 'id'>) => {
    setDocumentos([...documentos, { ...doc, id: Date.now() }]);
  };

  const deleteDocumento = (id: number) => {
    setDocumentos(documentos.filter(d => d.id !== id));
  };

  const getDividaAcumulada = () => {
    const hoje = new Date();
    return imoveis.reduce((acc, i) => {
      const vencimento = new Date(i.dataVencimento);
      if (vencimento < hoje) {
        const valor = parseInt(i.mensalidade.replace(/\./g, '').replace(' Kz', ''));
        return acc + (isNaN(valor) ? 0 : valor);
      }
      return acc;
    }, 0);
  };

  const getTotalGastoImovel = (id: number) => {
    return transacoes
      .filter(t => t.entidadeId === id && t.categoria === 'Sede' && t.tipo === 'saida' && t.status === 'Aprovado')
      .reduce((acc, t) => acc + t.valor, 0);
  };

  const getTotalGastoViatura = (id: number) => {
    return transacoes
      .filter(t => t.entidadeId === id && t.categoria === 'Viatura' && t.tipo === 'saida' && t.status === 'Aprovado')
      .reduce((acc, t) => acc + t.valor, 0);
  };

  const addMissao = (missao: Omit<Missao, 'id'>) => {
    const novo = { ...missao, id: Date.now() };
    setMissoes([novo as Missao, ...missoes]);
  };

  const deleteMissao = (id: number) => {
    setMissoes(missoes.filter(m => m.id !== id));
  };

  const updateMissao = (id: number, updated: Partial<Missao>) => {
    setMissoes(missoes.map(m => m.id === id ? { ...m, ...updated } : m));
  };

  const updateImovel = (id: number, updated: Partial<Imovel>) => {
    setImoveis(imoveis.map(i => i.id === id ? { ...i, ...updated } : i));
  };

  const addItemInventario = (i: Omit<ItemInventario, 'id'>) => {
    const newDoc = { ...i, id: Date.now() };
    setInventario([newDoc as ItemInventario, ...inventario]);
  };

  const updateItemInventario = (id: number, updated: Partial<ItemInventario>) => {
    setInventario(inventario.map(item => item.id === id ? { ...item, ...updated } : item));
  };

  const deleteItemInventario = (id: number) => {
    setInventario(inventario.filter(item => item.id !== id));
  };

  const alterarEstadoInventario = (id: number, novoEstado: ItemInventario['estado'], foto: string, causa: string) => {
    setInventario(inventario.map(item => {
      if (item.id === id) {
        const historico = item.historicoEstado || [];
        const novoRegistro: HistoricoEstado = {
          id: Date.now(),
          data: new Date().toISOString(),
          estadoAnterior: item.estado,
          novoEstado,
          foto,
          causa
        };
        return {
          ...item,
          estado: novoEstado,
          foto: foto, // Atualiza a foto principal para a mais recente
          historicoEstado: [novoRegistro, ...historico]
        };
      }
      return item;
    }));
  };

  return (
    <PortalContext.Provider value={{ 
      membros, addMembro, updateMembro, deleteMembro, getMembro,
      militantes,
      usuarios, addUsuario,
      nucleos, addNucleo, deleteNucleo,
      viaturas, addViatura, deleteViatura,
      imoveis, addImovel, deleteImovel, updateImovel,
      saldo, reservaLivre, transacoes, addTransacao, deleteTransacao, aprovarTransacao,
      transferirParaReserva, transferirParaSaldo,
      manutencoes, addManutencao, deleteManutencao,
      documentos, addDocumento, deleteDocumento,
      getDividaAcumulada, getTotalGastoImovel, getTotalGastoViatura, logout,
      missoes, addMissao, deleteMissao, updateMissao,
      inventario, addItemInventario, updateItemInventario, deleteItemInventario, alterarEstadoInventario
    }}>
      {children}
    </PortalContext.Provider>
  );
}

export function usePortal() {
  const context = useContext(PortalContext);
  if (context === undefined) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
}
