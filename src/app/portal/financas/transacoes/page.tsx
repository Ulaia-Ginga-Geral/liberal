'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortal } from '@/context/PortalContext';
import Link from 'next/link';
import {
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
  CalendarIcon,
  BanknotesIcon,
  BuildingOffice2Icon,
  TruckIcon,
  UserGroupIcon,
  CogIcon,
  EllipsisHorizontalCircleIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

const categoriaIcon: Record<string, React.ElementType> = {
  Sede: BuildingOffice2Icon,
  Viatura: TruckIcon,
  Membro: UserGroupIcon,
  Administrativo: CogIcon,
  Outros: EllipsisHorizontalCircleIcon,
};

const categoriaCor: Record<string, string> = {
  Sede: 'bg-blue-100 text-blue-700',
  Viatura: 'bg-yellow-100 text-yellow-700',
  Membro: 'bg-green-100 text-green-700',
  Administrativo: 'bg-slate-100 text-slate-700',
  Outros: 'bg-purple-100 text-purple-700',
};

export default function HistoricoTransacoes() {
  const { transacoes, saldo, deleteTransacao } = usePortal();

  const handleDelete = (id: number) => {
    if (confirm('Deseja realmente excluir este registro financeiro? O saldo atual não será afetado retroativamente.')) {
      deleteTransacao(id);
      toast.success('Registro removido do histórico.');
    }
  };

  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'entrada' | 'saida'>('todos');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [pesquisa, setPesquisa] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const transacoesFiltradas = transacoes.filter(t => {
    const matchTipo = filtroTipo === 'todos' || t.tipo === filtroTipo;
    const matchCat = filtroCategoria === '' || t.categoria === filtroCategoria;
    const matchPesq = t.descricao.toLowerCase().includes(pesquisa.toLowerCase());
    const matchData = (!dataInicio || t.data >= dataInicio) && (!dataFim || t.data <= dataFim);
    return matchTipo && matchCat && matchPesq && matchData;
  });

  const totalFiltrado = transacoesFiltradas.reduce((acc, t) =>
    t.tipo === 'entrada' ? acc + t.valor : acc - t.valor, 0
  );

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center space-x-5">
          <Link href="/portal/financas" className="p-3 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:scale-105 transition-all">
            <ArrowLeftIcon className="w-5 h-5 text-slate-400" />
          </Link>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Extrato Completo</h1>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">Histórico de Todas as Movimentações • PL Cuanza Sul</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl shadow-black/20">
          <BanknotesIcon className="w-6 h-6 text-yellow-400" />
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Saldo Actual</p>
            <p className="text-lg font-black italic">{saldo.toLocaleString()} <span className="text-xs text-yellow-400">Kz</span></p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
        {/* Filtro de Tipo - Visual Selector */}
        <div className="flex flex-wrap gap-3">
          {[
            { value: 'todos', label: 'Todas as Operações' },
            { value: 'entrada', label: 'Receitas' },
            { value: 'saida', label: 'Despesas' },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setFiltroTipo(opt.value as any)}
              className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                filtroTipo === opt.value
                  ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                  : 'bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Linha de Pesquisa e Filtros */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-4 top-4 w-5 h-5 text-slate-300" />
            <input
              type="text"
              placeholder="Pesquisar por descrição..."
              value={pesquisa}
              onChange={e => setPesquisa(e.target.value)}
              className="w-full bg-slate-50 rounded-2xl p-4 pl-12 text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
            />
          </div>

          <select
            value={filtroCategoria}
            onChange={e => setFiltroCategoria(e.target.value)}
            className="bg-slate-50 text-slate-900 rounded-2xl px-6 py-4 text-[10px] font-black uppercase tracking-widest border border-slate-100 outline-none focus:ring-2 focus:ring-blue-600 transition-all cursor-pointer"
          >
            <option value="">Todas as Categorias</option>
            <option>Sede</option>
            <option>Viatura</option>
            <option>Membro</option>
            <option>Administrativo</option>
            <option>Outros</option>
          </select>

          <div className="flex items-center space-x-2 bg-slate-50 rounded-2xl px-4">
            <CalendarIcon className="w-4 h-4 text-slate-300" />
            <input type="date" value={dataInicio} onChange={e => setDataInicio(e.target.value)}
              className="bg-transparent p-3 text-xs font-black text-slate-700 outline-none w-32"
            />
            <span className="text-slate-300 font-black">→</span>
            <input type="date" value={dataFim} onChange={e => setDataFim(e.target.value)}
              className="bg-transparent p-3 text-xs font-black text-slate-700 outline-none w-32"
            />
          </div>
        </div>

        {/* Totais filtrados */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {transacoesFiltradas.length} operação(ões) encontrada(s)
          </p>
          <div className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest border ${
            totalFiltrado >= 0
              ? 'bg-green-100 text-green-700 border-green-200'
              : 'bg-red-100 text-red-700 border-red-200'
          }`}>
            Saldo Filtrado: {totalFiltrado >= 0 ? '+' : ''}{totalFiltrado.toLocaleString()} Kz
          </div>
        </div>
      </div>

      {/* Lista de Transações */}
      <div className="space-y-4">
        {transacoesFiltradas.length > 0 ? transacoesFiltradas.map((t, index) => {
          const CatIcon = categoriaIcon[t.categoria] || EllipsisHorizontalCircleIcon;
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-lg hover:border-slate-200 transition-all group"
            >
              <div className="flex items-center space-x-6">
                {/* Ícone de tipo */}
                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ${
                  t.tipo === 'entrada' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {t.tipo === 'entrada'
                    ? <ArrowUpCircleIcon className="w-8 h-8" />
                    : <ArrowDownCircleIcon className="w-8 h-8" />
                  }
                </div>

                <div className="space-y-1">
                  <p className="text-base font-black text-slate-900 uppercase tracking-tight">{t.descricao}</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                      <CalendarIcon className="w-3 h-3 mr-1" />{t.data}
                    </span>
                    <span className={`text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest flex items-center space-x-1 ${categoriaCor[t.categoria] || 'bg-slate-100 text-slate-700'}`}>
                      <CatIcon className="w-3 h-3 mr-1" />
                      {t.categoria}
                    </span>
                    <span className={`text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${
                      t.status === 'Aprovado' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-yellow-50 text-yellow-600 border border-yellow-100'
                    }`}>
                      {t.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6 ml-auto flex-shrink-0">
                <div className="text-right">
                  <p className={`text-3xl font-black italic tracking-tighter ${
                    t.tipo === 'entrada' ? 'text-green-600' : 'text-slate-900'
                  }`}>
                    {t.tipo === 'entrada' ? '+' : '−'} {t.valor.toLocaleString()}
                  </p>
                  <p className="text-[10px] font-black text-slate-400">Kz</p>
                </div>
                <button 
                  onClick={() => handleDelete(t.id)}
                  className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          );
        }) : (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
            <FunnelIcon className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">
              Nenhuma movimentação encontrada com os filtros actuais
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
