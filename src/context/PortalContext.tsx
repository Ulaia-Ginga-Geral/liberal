'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { militantesMock } from '@/data/portalMock';

interface Membro {
  id: number;
  nome: string;
  bi: string;
  provincia: string;
  municipio: string;
  foto?: string;
  activo: boolean;
  dataNascimento?: string;
  nucleoId?: number;
  registradoPor?: number;
}

interface PortalContextType {
  membros: Membro[];
  addMembro: (membro: Omit<Membro, 'id'>) => void;
  updateMembro: (id: number, membro: Partial<Membro>) => void;
  deleteMembro: (id: number) => void;
  getMembro: (id: number) => Membro | undefined;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

export function PortalProvider({ children }: { children: React.ReactNode }) {
  const [membros, setMembros] = useState<Membro[]>([]);

  // Carregar dados iniciais e LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('pl_membros');
    if (saved) {
      setMembros(JSON.parse(saved));
    } else {
      setMembros(militantesMock);
    }
  }, []);

  // Salvar no LocalStorage sempre que mudar
  useEffect(() => {
    if (membros.length > 0) {
      localStorage.setItem('pl_membros', JSON.stringify(membros));
    }
  }, [membros]);

  const addMembro = (membro: Omit<Membro, 'id'>) => {
    const newId = membros.length > 0 ? Math.max(...membros.map(m => m.id)) + 1 : 1;
    setMembros([...membros, { ...membro, id: newId }]);
  };

  const updateMembro = (id: number, data: Partial<Membro>) => {
    setMembros(membros.map(m => m.id === id ? { ...m, ...data } : m));
  };

  const deleteMembro = (id: number) => {
    setMembros(membros.filter(m => m.id !== id));
  };

  const getMembro = (id: number) => {
    return membros.find(m => m.id === id);
  };

  return (
    <PortalContext.Provider value={{ membros, addMembro, updateMembro, deleteMembro, getMembro }}>
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
