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
  categoria: 'Sede' | 'Viatura' | 'Membro' | 'Administrativo' | 'Outros';
  status: 'Pendente' | 'Aprovado';
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

interface PortalContextType {
  // Membros
  membros: Membro[];
  addMembro: (membro: Omit<Membro, 'id'>) => void;
  updateMembro: (id: number, membro: Partial<Membro>) => void;
  deleteMembro: (id: number) => void;
  getMembro: (id: number) => Membro | undefined;

  // Usuários
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
  logout: () => void;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

export function PortalProvider({ children }: { children: React.ReactNode }) {
  const [membros, setMembros] = useState<Membro[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [viaturas, setViaturas] = useState<Viatura[]>([]);
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [nucleos, setNucleos] = useState<Nucleo[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [saldo, setSaldo] = useState<number>(0); 

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

    setMembros(loadData('pl_membros', militantesMock));
    setUsuarios(loadData('pl_usuarios', usuariosMock));
    setViaturas(loadData('pl_viaturas', viaturasMock));
    setImoveis(loadData('pl_imoveis', imoveisMock as Imovel[]));
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

    const savedSaldo = localStorage.getItem('pl_saldo');
    if (savedSaldo) setSaldo(Number(savedSaldo));
    else {
      // Calcular saldo inicial baseado em transações se não houver saldo salvo
      const total = transacoesIniciais.reduce((acc, t) => t.tipo === 'entrada' ? acc + t.valor : acc - t.valor, 0);
      setSaldo(total);
    }
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
    localStorage.setItem('pl_saldo', saldo.toString());
  }, [membros, usuarios, viaturas, imoveis, nucleos, transacoes, saldo]);

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

  return (
    <PortalContext.Provider value={{ 
      membros, addMembro, updateMembro, deleteMembro, getMembro,
      usuarios, addUsuario,
      nucleos, addNucleo, deleteNucleo,
      viaturas, addViatura, deleteViatura,
      imoveis, addImovel, deleteImovel,
      saldo, transacoes, addTransacao, deleteTransacao, aprovarTransacao,
      manutencoes, addManutencao, deleteManutencao,
      documentos, addDocumento, deleteDocumento,
      getDividaAcumulada, logout
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
