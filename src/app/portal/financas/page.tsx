'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortal, Transacao } from '@/context/PortalContext';
import {
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BanknotesIcon,
  PlusIcon,
  FunnelIcon,
  CalendarIcon,
  ChevronRightIcon,
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
  WalletIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline';
import PortalModal from '@/components/portal/PortalModal';
import { toast } from 'react-hot-toast';
import { exportToPDF } from '@/utils/exportUtils';

export default function FinancasDashboard() {
  const { saldo, transacoes, addTransacao } = usePortal();
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState<'entrada' | 'saida'>('entrada');

  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    categoria: 'Administrativo' as any,
    data: new Date().toISOString().split('T')[0]
  });

  const totalEntradas = transacoes
    .filter(t => t.tipo === 'entrada' && t.status === 'Aprovado')
    .reduce((acc, t) => acc + t.valor, 0);

  const totalSaidas = transacoes
    .filter(t => t.tipo === 'saida' && t.status === 'Aprovado')
    .reduce((acc, t) => acc + t.valor, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valorNum = parseFloat(formData.valor.replace(/[^0-9.]/g, ''));
    if (isNaN(valorNum)) return;

    addTransacao({
      ...formData,
      valor: valorNum,
      tipo: modalType,
      status: 'Aprovado'
    });

    setShowAddModal(false);
    setFormData({ descricao: '', valor: '', categoria: 'Administrativo', data: new Date().toISOString().split('T')[0] });
    toast.success('Operação financeira registrada com sucesso!');
  };

  const handleExport = () => {
    const headers = [['Data', 'Descrição', 'Tipo', 'Categoria', 'Valor (Kz)', 'Status']];
    const data = transacoes.map(t => [
      t.data,
      t.descricao,
      t.tipo === 'entrada' ? 'Entrada' : 'Saída',
      t.categoria,
      t.valor.toLocaleString(),
      t.status
    ]);
    
    exportToPDF(
      'Relatório Financeiro Consolidado - PL Cuanza Sul',
      headers,
      data,
      `Relatorio_Financeiro_${new Date().toISOString().split('T')[0]}`
    );
    toast.success('Relatório PDF gerado com sucesso!');
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Header e Ações Rápidas */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Tesouraria Provincial</h1>
          <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">Gestão Centralizada de Fluxo de Caixa • Cuanza Sul</p>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={() => { setModalType('entrada'); setShowAddModal(true); }}
            className="flex items-center px-6 py-4 bg-green-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-green-500/20 hover:scale-105 transition-all active:scale-95"
          >
            <ArrowUpCircleIcon className="w-5 h-5 mr-3" />
            Entrada de Saldo
          </button>
          <button 
            onClick={() => { setModalType('saida'); setShowAddModal(true); }}
            className="flex items-center px-6 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-black/20 hover:scale-105 transition-all active:scale-95"
          >
            <ArrowDownCircleIcon className="w-5 h-5 mr-3" />
            Registrar Gasto
          </button>
        </div>
      </div>

      {/* Cartão de Saldo Principal - Design Premium */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 relative group overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-[3.5rem] p-12 text-white shadow-2xl border border-white/10">
           <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                 <div className="flex items-center justify-between mb-8">
                    <div className="p-4 bg-white/10 backdrop-blur-xl rounded-[1.5rem] border border-white/10">
                       <WalletIcon className="w-8 h-8 text-yellow-400" />
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black text-blue-200 uppercase tracking-[0.3em] mb-1">Estado de Liquidez</p>
                       <span className="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-500/30">Positivo</span>
                    </div>
                 </div>
                 <p className="text-blue-100/60 font-black text-xs uppercase tracking-[0.4em] mb-4">Saldo Consolidado do Partido (PL)</p>
                 <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-7xl font-black italic tracking-tighter"
                 >
                    {saldo.toLocaleString('pt-AO')} <span className="text-3xl text-yellow-500 non-italic">Kz</span>
                 </motion.h2>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                 <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center">
                       <ArrowTrendingUpIcon className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-blue-200/50 uppercase tracking-widest">Total Receitas</p>
                       <p className="text-xl font-black">{totalEntradas.toLocaleString()} Kz</p>
                    </div>
                 </div>
                 <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center">
                       <ArrowTrendingDownIcon className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-blue-200/50 uppercase tracking-widest">Total Despesas</p>
                       <p className="text-xl font-black">{totalSaidas.toLocaleString()} Kz</p>
                    </div>
                 </div>
              </div>
           </div>
           
           {/* Efeitos Visuais Background */}
           <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-400 opacity-5 blur-[100px] rounded-full group-hover:opacity-10 transition-opacity" />
           <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400 opacity-10 blur-[100px] rounded-full" />
           <div className="absolute right-0 bottom-0 p-12 opacity-5 scale-150 transform rotate-12">
              <CurrencyDollarIcon className="w-64 h-64" />
           </div>
        </div>

        <div className="lg:col-span-4 bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic mb-8">Distribuição de Gastos</h3>
              <div className="space-y-6">
                {[
                  { label: 'Manutenção Frota', color: 'bg-blue-600', cat: 'Viatura' },
                  { label: 'Sedes & Alugueres', color: 'bg-yellow-400', cat: 'Sede' },
                  { label: 'Mobiliário & Admin', color: 'bg-slate-900', cat: 'Administrativo' },
                  { label: 'Apoios Municipais', color: 'bg-indigo-500', cat: 'Outros' },
                ].map((item) => {
                  const gastoCat = transacoes
                    .filter(t => t.categoria === item.cat && t.tipo === 'saida')
                    .reduce((acc, t) => acc + t.valor, 0);
                  const perc = totalSaidas > 0 ? (gastoCat / totalSaidas) * 100 : 0;
                  
                  return (
                    <div key={item.label} className="space-y-2">
                       <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                          <span className="text-slate-400">{item.label}</span>
                          <span className="text-slate-900">{perc.toFixed(0)}%</span>
                       </div>
                       <div className="h-3 bg-slate-50 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${perc}%` }}
                            className={`h-full ${item.color}`} 
                          />
                       </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div 
              onClick={handleExport}
              className="mt-10 p-6 bg-slate-50 rounded-[2rem] flex items-center justify-between group cursor-pointer hover:bg-slate-900 transition-all"
            >
               <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm group-hover:bg-slate-800 transition-colors">
                     <ChartPieIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-300">Relatórios Mensais</p>
                    <p className="text-xs font-black text-slate-900 uppercase group-hover:text-white">Gerar PDF Consolidado</p>
                  </div>
               </div>
               <ChevronRightIcon className="w-5 h-5 text-slate-300 group-hover:text-yellow-400" />
            </div>
        </div>
      </div>

      {/* Transações Recentes */}
      <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-sm">
         <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">Movimentações Recentes</h3>
            <div className="flex space-x-3">
               <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-900 transition-all border border-transparent hover:border-slate-200">
                  <FunnelIcon className="w-5 h-5" />
               </button>
               <button className="p-3 bg-slate-900 text-white rounded-2xl shadow-xl shadow-black/10 hover:scale-110 transition-all active:scale-95">
                  <CalendarIcon className="w-5 h-5" />
               </button>
            </div>
         </div>

         <div className="space-y-4">
            {transacoes.slice(0, 5).map((t) => (
               <div key={t.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2.5rem] border border-transparent hover:border-slate-200 transition-all group">
                  <div className="flex items-center space-x-6">
                     <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black ${
                        t.tipo === 'entrada' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                     } group-hover:scale-110 transition-transform`}>
                        {t.tipo === 'entrada' ? <ArrowUpCircleIcon className="w-8 h-8" /> : <ArrowDownCircleIcon className="w-8 h-8" />}
                     </div>
                     <div>
                        <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{t.descricao}</p>
                        <div className="flex items-center space-x-4 mt-1">
                           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.data}</span>
                           <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                              t.status === 'Aprovado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                           }`}>
                              {t.status}
                           </span>
                           <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest italic">{t.categoria}</span>
                        </div>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className={`text-xl font-black italic tracking-tighter ${
                        t.tipo === 'entrada' ? 'text-green-600' : 'text-slate-900'
                     }`}>
                        {t.tipo === 'entrada' ? '+' : '-'} {t.valor.toLocaleString()} <span className="text-xs non-italic font-bold">Kz</span>
                     </p>
                  </div>
               </div>
            ))}
            
            {transacoes.length === 0 && (
               <div className="text-center py-20 px-10 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-100">
                  <BanknotesIcon className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                  <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Sem movimentações no período selecionado</p>
               </div>
            )}
         </div>
         
         <div className="mt-10 text-center">
            <button className="px-10 py-4 bg-slate-50 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-900 hover:text-white transition-all shadow-sm">
               Visualizar Extrato Completo
            </button>
         </div>
      </div>

      {/* MODAL: NOVA TRANSAÇÃO */}
      <PortalModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title={modalType === 'entrada' ? 'Aporte de Capital / Receita' : 'Registro de Despesa Governamental'}>
         <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Descrição Detalhada</label>
               <input 
                  required
                  value={formData.descricao}
                  onChange={e => setFormData({...formData, descricao: e.target.value})}
                  type="text" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-sm font-black text-slate-900 focus:bg-white focus:border-blue-600 transition-all outline-none" placeholder="Ex: Doação de Militante / Pagamento Eletricidade" />
            </div>

            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Valor da Operação (Kz)</label>
                  <input 
                     required
                     value={formData.valor}
                     onChange={e => setFormData({...formData, valor: e.target.value})}
                     type="text" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-lg font-black text-blue-900 focus:bg-white focus:border-blue-600 transition-all outline-none" placeholder="0.00" />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Categoria de Custo</label>
                  <select 
                     value={formData.categoria}
                     onChange={e => setFormData({...formData, categoria: e.target.value as any})}
                     className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-sm font-black text-slate-900 focus:bg-white focus:border-blue-600 transition-all outline-none cursor-pointer"
                  >
                     <option value="Administrativo">Administrativo</option>
                     <option value="Sede">Sedes (Rendas)</option>
                     <option value="Viatura">Viaturas (Manutenção)</option>
                     <option value="Membro">Apoio a Membros</option>
                     <option value="Outros">Outras Despesas</option>
                  </select>
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Data de Execução</label>
               <input 
                  required
                  value={formData.data}
                  onChange={e => setFormData({...formData, data: e.target.value})}
                  type="date" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-sm font-black text-slate-900 focus:bg-white focus:border-blue-600 transition-all outline-none" />
            </div>

            <button type="submit" className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 ${
               modalType === 'entrada' ? 'bg-green-600 text-white' : 'bg-slate-950 text-white'
            }`}>
               Confirmar Movimentação Bancária
            </button>
         </form>
      </PortalModal>
    </div>
  );
}
