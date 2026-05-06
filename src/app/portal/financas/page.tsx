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
   ChartPieIcon,
   ArrowPathIcon,
   BuildingOfficeIcon,
   TruckIcon,
   CloudArrowUpIcon,
   UserGroupIcon,
   IdentificationIcon,
   BanknotesIcon as BanknotesSolid
} from '@heroicons/react/24/outline';
import PortalModal from '@/components/portal/PortalModal';
import { toast } from 'react-hot-toast';
import { exportToPDF } from '@/utils/exportUtils';

const MUNICIPIOS_CUANZA_SUL = ['Sumbe', 'Amboim', 'Cela', 'Cassongue', 'Conda', 'Ebo', 'Libolo', 'Mussende', 'Porto Amboim', 'Quibala', 'Quilenda', 'Seles'];

export default function FinancasDashboard() {
   const {
      saldo, reservaLivre, transacoes, addTransacao,
      transferirParaReserva, transferirParaSaldo,
      imoveis, viaturas, membros, updateImovel
   } = usePortal();
   const [showAddModal, setShowAddModal] = useState(false);
   const [showTransferModal, setShowTransferModal] = useState(false);
   const [showRendaModal, setShowRendaModal] = useState(false);
   const [showManutencaoModal, setShowManutencaoModal] = useState(false);
   const [showQuotaModal, setShowQuotaModal] = useState(false);

   const [transferDirection, setTransferDirection] = useState<'paraReserva' | 'paraSaldo'>('paraReserva');
   const [transferAmount, setTransferAmount] = useState('');
   const [modalType, setModalType] = useState<'entrada' | 'saida'>('entrada');
   const [filtroCategoria, setFiltroCategoria] = useState<string>('Todos');
   const [searchTerm, setSearchTerm] = useState('');
   const [showReceiptViewer, setShowReceiptViewer] = useState(false);
   const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);

   // Form states for new payments
   const [rendaForm, setRendaForm] = useState({
      imovelId: '',
      valor: '',
      comprovativo: null as File | null,
      proximoVencimento: ''
   });

   const [vtrPayForm, setVtrPayForm] = useState({
      vtrId: '',
      descricao: '',
      valor: '',
      comprovativo: null as File | null
   });

   const [quotaForm, setQuotaForm] = useState({
      membroId: '',
      valor: '',
      data: new Date().toISOString().split('T')[0],
      funcao: '',
      municipio: 'Sumbe'
   });

   const [formData, setFormData] = useState({
      descricao: '',
      valor: '',
      categoria: 'Administrativo' as any,
      data: new Date().toISOString().split('T')[0],
      comprovativo: null as File | null
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
         status: 'Aprovado',
         comprovativo: formData.comprovativo ? URL.createObjectURL(formData.comprovativo) : undefined
      });

      setShowAddModal(false);
      setFormData({ descricao: '', valor: '', categoria: 'Administrativo', data: new Date().toISOString().split('T')[0], comprovativo: null });
      toast.success('Operação financeira registrada com sucesso!');
   };

   const handleTransfer = (e: React.FormEvent) => {
      e.preventDefault();
      const valorNum = parseFloat(transferAmount.replace(/[^0-9.]/g, ''));
      if (isNaN(valorNum) || valorNum <= 0) return;

      if (transferDirection === 'paraReserva') {
         if (valorNum > saldo) {
            toast.error('Saldo insuficiente no caixa principal!');
            return;
         }
         transferirParaReserva(valorNum);
         toast.success('Valor transferido para Reserva Livre!');
      } else {
         if (valorNum > reservaLivre) {
            toast.error('Saldo insuficiente na reserva!');
            return;
         }
         transferirParaSaldo(valorNum);
         toast.success('Valor resgatado da Reserva Livre!');
      }

      setShowTransferModal(false);
      setTransferAmount('');
   };

   const handleRendaSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const valorNum = parseFloat(rendaForm.valor.replace(/[^0-9.]/g, ''));
      const imovel = imoveis.find(i => i.id === parseInt(rendaForm.imovelId));

      if (imovel) {
         addTransacao({
            data: new Date().toISOString().split('T')[0],
            descricao: `Pagamento Renda: ${imovel.nome}`,
            valor: valorNum,
            tipo: 'saida',
            categoria: 'Sede',
            status: 'Aprovado',
            entidadeId: imovel.id,
            comprovativo: rendaForm.comprovativo ? URL.createObjectURL(rendaForm.comprovativo) : undefined
         });

         // Atualizar a data de vencimento do imóvel
         updateImovel(imovel.id, { dataVencimento: rendaForm.proximoVencimento });

         setShowRendaModal(false);
         setRendaForm({ imovelId: '', valor: '', comprovativo: null, proximoVencimento: '' });
         toast.success('Renda paga e vencimento atualizado!');
      }
   };

   const handleVtrPaySubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const selectedVtr = viaturas.find(v => v.id === parseInt(vtrPayForm.vtrId));
      if (!selectedVtr) return;

      const valorNum = parseFloat(vtrPayForm.valor.replace(/[^0-9.]/g, ''));
      if (isNaN(valorNum)) return;

      addTransacao({
         descricao: `Manutenção: ${selectedVtr.modelo} - ${vtrPayForm.descricao}`,
         valor: valorNum,
         tipo: 'saida',
         categoria: 'Viatura',
         data: new Date().toISOString().split('T')[0],
         status: 'Aprovado',
         entidadeId: selectedVtr.id
      });

      setShowManutencaoModal(false);
      setVtrPayForm({ vtrId: '', descricao: '', valor: '', comprovativo: null });
      toast.success('Pagamento de manutenção registrado!');
   };

   const handleQuotaSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const selectedMembro = membros.find(m => m.id === parseInt(quotaForm.membroId));
      if (!selectedMembro) return;

      const valorNum = parseFloat(quotaForm.valor.replace(/[^0-9.]/g, ''));
      if (isNaN(valorNum)) return;

      addTransacao({
         descricao: `Quota: ${selectedMembro.nome} (${quotaForm.funcao}) - ${quotaForm.municipio}`,
         valor: valorNum,
         tipo: 'entrada',
         categoria: 'Quotas',
         data: quotaForm.data,
         status: 'Aprovado',
         entidadeId: selectedMembro.id
      });

      setShowQuotaModal(false);
      setQuotaForm({ membroId: '', valor: '', data: new Date().toISOString().split('T')[0], funcao: '', municipio: 'Sumbe' });
      toast.success('Pagamento de quota registrado com sucesso!');
   };

   const surplusMes = transacoes
      .filter(t => {
         const d = new Date(t.data);
         const agora = new Date();
         return t.status === 'Aprovado' && d.getMonth() === agora.getMonth() && d.getFullYear() === agora.getFullYear();
      })
      .reduce((acc, t) => t.tipo === 'entrada' ? acc + t.valor : acc - t.valor, 0);

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
            <div className="flex flex-wrap gap-2">
               <button
                  onClick={() => { setModalType('entrada'); setShowAddModal(true); }}
                  className="flex items-center px-6 py-4 bg-green-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-green-500/20 hover:scale-105 transition-all active:scale-95"
               >
                  <ArrowUpCircleIcon className="w-5 h-5 mr-3" />
                  Entrada
               </button>
               <button
                  onClick={() => { setModalType('saida'); setShowAddModal(true); }}
                  className="flex items-center px-6 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-black/20 hover:scale-105 transition-all active:scale-95"
               >
                  <ArrowDownCircleIcon className="w-5 h-5 mr-3" />
                  Gasto
               </button>
               <button
                  onClick={() => setShowTransferModal(true)}
                  className="flex items-center px-6 py-4 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-105 transition-all active:scale-95"
               >
                  <ArrowPathIcon className="w-5 h-5 mr-3" />
                  Reserva Livre
               </button>
               <button
                  onClick={() => setShowRendaModal(true)}
                  className="flex items-center px-6 py-4 bg-yellow-500 text-slate-900 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-yellow-500/20 hover:scale-105 transition-all active:scale-95"
               >
                  <BuildingOfficeIcon className="w-5 h-5 mr-3" />
                  Renda
               </button>
               <button
                  onClick={() => setShowManutencaoModal(true)}
                  className="flex items-center px-6 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all active:scale-95"
               >
                  <TruckIcon className="w-5 h-5 mr-3" />
                  Manutenção
               </button>
               <button
                  onClick={() => setShowQuotaModal(true)}
                  className="flex items-center px-6 py-4 bg-orange-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-orange-500/20 hover:scale-105 transition-all active:scale-95"
               >
                  <UserGroupIcon className="w-5 h-5 mr-3" />
                  Quota
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

         {/* Grid de Saldos Secundários */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden group">
               <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                     <div className="p-3 bg-yellow-100 rounded-2xl">
                        <BanknotesSolid className="w-6 h-6 text-yellow-600" />
                     </div>
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reserva de Segurança</span>
                  </div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Reserva Livre</h4>
                  <p className="text-4xl font-black text-slate-900 italic tracking-tighter">
                     {reservaLivre.toLocaleString()} <span className="text-xl non-italic">Kz</span>
                  </p>
               </div>
            </div>

            <div className="bg-slate-900 rounded-[3rem] p-10 shadow-xl relative overflow-hidden group">
               <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                     <div className="p-3 bg-white/10 rounded-2xl">
                        <ArrowTrendingUpIcon className="w-6 h-6 text-green-400" />
                     </div>
                     <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Performance Mensal</span>
                  </div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Excedente do Mês (Surplus)</h4>
                  <p className={`text-4xl font-black italic tracking-tighter ${surplusMes >= 0 ? 'text-white' : 'text-red-400'}`}>
                     {surplusMes.toLocaleString()} <span className="text-xl non-italic">Kz</span>
                  </p>
               </div>
            </div>
         </div>

         {/* Transações Recentes */}
         <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">Movimentações Recentes</h3>
               <div className="flex flex-col gap-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filtro por Categoria</p>
                  <div className="flex flex-wrap gap-2">
                     {['Todos', 'Sede', 'Viatura', 'Membro', 'Quotas', 'Reserva', 'Administrativo'].map(cat => (
                        <button
                           key={cat}
                           onClick={() => setFiltroCategoria(cat)}
                           className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filtroCategoria === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                        >
                           {cat}
                        </button>
                     ))}
                  </div>
               </div>
            </div>

            <div className="space-y-4">
               {transacoes
                  .filter(t => filtroCategoria === 'Todos' || t.categoria === filtroCategoria)
                  .map((t) => (
                     <div key={t.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2.5rem] border border-transparent hover:border-slate-200 transition-all group">
                        <div className="flex items-center space-x-6">
                           <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black ${t.tipo === 'entrada' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                              } group-hover:scale-110 transition-transform`}>
                              {t.tipo === 'entrada' ? <ArrowUpCircleIcon className="w-8 h-8" /> : <ArrowDownCircleIcon className="w-8 h-8" />}
                           </div>
                           <div>
                              <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{t.descricao}</p>
                              <div className="flex items-center space-x-4 mt-1">
                                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.data}</span>
                                 <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${t.status === 'Aprovado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {t.status}
                                 </span>
                                 <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest italic">{t.categoria}</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex items-center space-x-4">
                           {t.comprovativo && (
                              <button
                                 onClick={() => { setSelectedReceipt(t.comprovativo || null); setShowReceiptViewer(true); }}
                                 className="p-3 bg-slate-100 text-slate-400 rounded-xl hover:bg-yellow-400 hover:text-slate-900 transition-all group/btn"
                                 title="Ver Comprovativo"
                              >
                                 <CloudArrowUpIcon className="w-5 h-5" />
                              </button>
                           )}
                           <div className="text-right">
                              <p className={`text-xl font-black italic tracking-tighter ${t.tipo === 'entrada' ? 'text-green-600' : 'text-slate-900'
                                 }`}>
                                 {t.tipo === 'entrada' ? '+' : '-'} {t.valor.toLocaleString()} <span className="text-xs non-italic font-bold">Kz</span>
                              </p>
                           </div>
                        </div>
                     </div>
                  ))}
            </div>
         </div>

         {/* MODAL: NOVA TRANSAÇÃO */}
         <PortalModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title={modalType === 'entrada' ? 'Aporte de Capital / Receita' : 'Registro de Despesa'}>
            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Descrição Detalhada</label>
                  <input required value={formData.descricao} onChange={e => setFormData({ ...formData, descricao: e.target.value })} type="text" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-sm font-black text-slate-900 focus:bg-white focus:border-blue-600 transition-all outline-none" />
               </div>
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Valor da Operação (Kz)</label>
                     <input required value={formData.valor} onChange={e => setFormData({ ...formData, valor: e.target.value })} type="text" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-lg font-black text-blue-900 focus:bg-white focus:border-blue-600 transition-all outline-none" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Categoria</label>
                     <select value={formData.categoria} onChange={e => setFormData({ ...formData, categoria: e.target.value as any })} className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-sm font-black text-slate-900 focus:bg-white focus:border-blue-600 transition-all outline-none">
                        <option value="Administrativo">Administrativo</option>
                        <option value="Sede">Sede</option>
                        <option value="Viatura">Viatura</option>
                        <option value="Membro">Membro</option>
                        <option value="Reserva">Reserva</option>
                        <option value="Outros">Outros</option>
                     </select>
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Comprovativo / Recibo</label>
                  <div className="relative group cursor-pointer">
                     <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        onChange={e => setFormData({ ...formData, comprovativo: e.target.files?.[0] || null })}
                     />
                     <div className="w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-5 flex items-center justify-center space-x-3 group-hover:bg-white group-hover:border-blue-600 transition-all">
                        <CloudArrowUpIcon className="w-6 h-6 text-slate-300 group-hover:text-blue-600" />
                        <span className="text-sm font-black text-slate-400 group-hover:text-blue-600">
                           {formData.comprovativo ? formData.comprovativo.name : 'Selecionar Documento Digitalizado'}
                        </span>
                     </div>
                  </div>
               </div>
               <button type="submit" className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 ${modalType === 'entrada' ? 'bg-green-600 text-white' : 'bg-slate-950 text-white'}`}>Confirmar Movimentação</button>
            </form>
         </PortalModal>

         {/* MODAL: TRANSFERÊNCIA INTERNA */}
         <PortalModal isOpen={showTransferModal} onClose={() => setShowTransferModal(false)} title="Movimentação Interna de Capital">
            <form onSubmit={handleTransfer} className="space-y-8">
               <div className="grid grid-cols-2 gap-4 bg-slate-50 p-2 rounded-[2rem]">
                  <button
                     type="button"
                     onClick={() => setTransferDirection('paraReserva')}
                     className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${transferDirection === 'paraReserva' ? 'bg-white shadow-sm text-blue-900' : 'text-slate-400'
                        }`}
                  >
                     Saldo → Reserva
                  </button>
                  <button
                     type="button"
                     onClick={() => setTransferDirection('paraSaldo')}
                     className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${transferDirection === 'paraSaldo' ? 'bg-white shadow-sm text-blue-900' : 'text-slate-400'
                        }`}
                  >
                     Reserva → Saldo
                  </button>
               </div>

               <div className="space-y-4 text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor da Transferência (Kz)</p>
                  <input
                     required
                     value={transferAmount}
                     onChange={e => setTransferAmount(e.target.value)}
                     type="text"
                     className="w-full bg-slate-50 border-2 border-transparent rounded-[2.5rem] p-10 text-5xl font-black text-center text-blue-900 focus:bg-white focus:border-blue-600 transition-all outline-none"
                     placeholder="0"
                  />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                     Disponível: <span className="text-slate-900">{transferDirection === 'paraReserva' ? saldo.toLocaleString() : reservaLivre.toLocaleString()} Kz</span>
                  </p>
               </div>

               <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-start space-x-4">
                  <ArrowPathIcon className="w-6 h-6 text-blue-600 mt-1 shrink-0" />
                  <p className="text-xs font-medium text-blue-800 leading-relaxed italic">
                     Esta operação não altera o patrimônio líquido total, apenas redistribui os recursos entre o caixa operacional e a reserva de segurança.
                  </p>
               </div>

               <button type="submit" className="w-full py-6 bg-slate-950 text-white rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 hover:bg-blue-900">
                  Confirmar Movimentação Interna
               </button>
            </form>
         </PortalModal>

         {/* MODAL: PAGAR RENDA */}
         <PortalModal isOpen={showRendaModal} onClose={() => setShowRendaModal(false)} title="Pagamento de Aluguer / Renda">
            <form onSubmit={handleRendaSubmit} className="space-y-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Selecionar Imóvel / Sede</label>
                  <select
                     required
                     value={rendaForm.imovelId}
                     onChange={e => {
                        const id = e.target.value;
                        const imovel = imoveis.find(i => i.id === parseInt(id));
                        let valorCalc = '';
                        if (imovel) {
                           const mens = parseFloat(imovel.mensalidade.replace(/[^0-9.]/g, ''));
                           const meses = imovel.formaPagamento === '6 Meses' ? 6 : imovel.formaPagamento === '1 Ano' ? 12 : 60;
                           valorCalc = (mens * meses).toString();
                        }
                        setRendaForm({ ...rendaForm, imovelId: id, valor: valorCalc });
                     }}
                     className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-sm font-black text-slate-900 focus:bg-white focus:border-blue-600 transition-all outline-none cursor-pointer"
                  >
                     <option value="">Selecione o imóvel...</option>
                     {imoveis.map(i => (
                        <option key={i.id} value={i.id}>{i.nome} - {i.localizacao}</option>
                     ))}
                  </select>
               </div>

               {rendaForm.imovelId && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                     <div className="grid grid-cols-2 gap-6 p-6 bg-blue-50 rounded-[2rem] border border-blue-100">
                        <div>
                           <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Proprietário</p>
                           <p className="text-sm font-black text-slate-900 uppercase italic">{imoveis.find(i => i.id === parseInt(rendaForm.imovelId))?.dono || 'N/A'}</p>
                        </div>
                        <div>
                           <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Contacto Directo</p>
                           <p className="text-sm font-black text-slate-900">{imoveis.find(i => i.id === parseInt(rendaForm.imovelId))?.contacto || 'N/A'}</p>
                        </div>
                     </div>

                     <div className="p-6 bg-yellow-50 rounded-[2rem] border border-yellow-100 flex items-center justify-between">
                        <div>
                           <p className="text-[9px] font-black text-yellow-600 uppercase tracking-widest mb-1">Cálculo Automático</p>
                           <p className="text-xs font-black text-slate-900">
                              {(() => {
                                 const imovel = imoveis.find(i => i.id === parseInt(rendaForm.imovelId));
                                 if (!imovel) return '';
                                 const mens = parseFloat(imovel.mensalidade.replace(/[^0-9.]/g, '')).toLocaleString();
                                 const meses = imovel.formaPagamento === '6 Meses' ? 6 : imovel.formaPagamento === '1 Ano' ? 12 : 60;
                                 return `${mens} Kz × ${meses} Meses (${imovel.formaPagamento})`;
                              })()}
                           </p>
                        </div>
                        <div className="text-right">
                           <p className="text-[9px] font-black text-yellow-600 uppercase tracking-widest mb-1">Total a Liquidar</p>
                           <p className="text-sm font-black text-slate-900">{rendaForm.valor ? parseFloat(rendaForm.valor).toLocaleString() : '0'} Kz</p>
                        </div>
                     </div>
                  </motion.div>
               )}

               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Valor do Pagamento (Kz)</label>
                     <input
                        required
                        type="text"
                        value={rendaForm.valor}
                        onChange={e => setRendaForm({ ...rendaForm, valor: e.target.value })}
                        className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-lg font-black text-blue-900 focus:bg-white focus:border-blue-600 transition-all outline-none"
                        placeholder="0.00"
                     />
                  </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Próximo Vencimento</label>
                      <input
                         required
                         type="date"
                         value={rendaForm.proximoVencimento}
                         onChange={e => setRendaForm({ ...rendaForm, proximoVencimento: e.target.value })}
                         className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-sm font-black text-slate-900 focus:bg-white focus:border-blue-600 transition-all outline-none"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Carregar Factura / Recibo</label>
                   <div className="relative group cursor-pointer">
                      <input
                         type="file"
                         className="absolute inset-0 opacity-0 cursor-pointer z-10"
                         onChange={e => setRendaForm({ ...rendaForm, comprovativo: e.target.files?.[0] || null })}
                      />
                      <div className="w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-5 flex items-center justify-center space-x-3 group-hover:bg-white group-hover:border-blue-600 transition-all">
                         <CloudArrowUpIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                         <span className="text-[10px] font-black text-slate-400 uppercase group-hover:text-blue-600 truncate max-w-[100px]">
                            {rendaForm.comprovativo ? rendaForm.comprovativo.name : 'Selecionar'}
                         </span>
                      </div>
                   </div>
                </div>
                <button type="submit" className="w-full py-6 bg-slate-950 text-white rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 hover:bg-blue-900">
                   Confirmar Pagamento & Atualizar Vencimento
                </button>
            </form>
         </PortalModal>

         {/* MODAL: PAGAR MANUTENÇÃO */}
         <PortalModal isOpen={showManutencaoModal} onClose={() => setShowManutencaoModal(false)} title="Pagamento de Manutenção Veicular">
            <form onSubmit={handleVtrPaySubmit} className="space-y-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Selecionar Viatura da Frota</label>
                  <select
                     required
                     value={vtrPayForm.vtrId}
                     onChange={e => setVtrPayForm({ ...vtrPayForm, vtrId: e.target.value })}
                     className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-sm font-black text-slate-900 focus:bg-white focus:border-blue-600 transition-all outline-none cursor-pointer"
                  >
                     <option value="">Selecione a viatura...</option>
                     {viaturas.map(v => (
                        <option key={v.id} value={v.id}>{v.modelo} ({v.matricula})</option>
                     ))}
                  </select>
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Descrição do Serviço</label>
                  <input
                     required
                     type="text"
                     value={vtrPayForm.descricao}
                     onChange={e => setVtrPayForm({ ...vtrPayForm, descricao: e.target.value })}
                     className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-sm font-black text-slate-900 focus:bg-white focus:border-blue-600 transition-all outline-none"
                     placeholder="Ex: Troca de óleo, reparação de pneus..."
                  />
               </div>

               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Custo Total (Kz)</label>
                     <input
                        required
                        type="text"
                        value={vtrPayForm.valor}
                        onChange={e => setVtrPayForm({ ...vtrPayForm, valor: e.target.value })}
                        className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-lg font-black text-blue-900 focus:bg-white focus:border-blue-600 transition-all outline-none"
                        placeholder="0.00"
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Factura da Oficina</label>
                     <div className="relative group cursor-pointer">
                        <input
                           type="file"
                           className="absolute inset-0 opacity-0 cursor-pointer z-10"
                           onChange={e => setVtrPayForm({ ...vtrPayForm, comprovativo: e.target.files?.[0] || null })}
                        />
                        <div className="w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-5 flex items-center justify-center space-x-3 group-hover:bg-white group-hover:border-blue-600 transition-all">
                           <CloudArrowUpIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                           <span className="text-[10px] font-black text-slate-400 uppercase group-hover:text-blue-600 truncate max-w-[100px]">
                              {vtrPayForm.comprovativo ? vtrPayForm.comprovativo.name : 'Carregar Imagem'}
                           </span>
                        </div>
                     </div>
                  </div>
               </div>

               <button type="submit" className="w-full py-6 bg-slate-950 text-white rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 hover:bg-blue-900">
                  Registrar Pagamento de Viatura
               </button>
            </form>
         </PortalModal>

         {/* MODAL: PAGAR QUOTA */}
         <PortalModal isOpen={showQuotaModal} onClose={() => setShowQuotaModal(false)} title="Pagamento de Quotas de Militantes">
            <form onSubmit={handleQuotaSubmit} className="space-y-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Selecionar Militante</label>
                  <select required value={quotaForm.membroId} onChange={e => setQuotaForm({ ...quotaForm, membroId: e.target.value })} className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-sm font-black text-slate-900 focus:bg-white focus:border-blue-600 transition-all outline-none">
                     <option value="">Selecione o membro...</option>
                     {membros.map(m => (<option key={m.id} value={m.id}>{m.nome} - {m.bi}</option>))}
                  </select>
               </div>
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Valor da Quota (Kz)</label>
                     <input required type="text" value={quotaForm.valor} onChange={e => setQuotaForm({ ...quotaForm, valor: e.target.value })} className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-lg font-black text-blue-900 focus:bg-white focus:border-blue-600 transition-all outline-none" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Data do Pagamento</label>
                     <input required type="date" value={quotaForm.data} onChange={e => setQuotaForm({ ...quotaForm, data: e.target.value })} className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-sm font-black text-slate-900 focus:bg-white focus:border-blue-600 transition-all outline-none" />
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Função / Cargo</label>
                     <input required type="text" value={quotaForm.funcao} onChange={e => setQuotaForm({ ...quotaForm, funcao: e.target.value })} className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-sm font-black text-slate-900 focus:bg-white focus:border-blue-600 transition-all outline-none" placeholder="Ex: Coordenador..." />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Município</label>
                     <select required value={quotaForm.municipio} onChange={e => setQuotaForm({ ...quotaForm, municipio: e.target.value })} className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-sm font-black text-slate-900 focus:bg-white focus:border-blue-600 transition-all outline-none">
                        {MUNICIPIOS_CUANZA_SUL.map(m => (<option key={m} value={m}>{m}</option>))}
                     </select>
                  </div>
               </div>
               <button type="submit" className="w-full py-6 bg-orange-600 text-white rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 hover:bg-orange-700">Confirmar Recebimento</button>
            </form>
         </PortalModal>
         {/* MODAL: VISUALIZADOR DE COMPROVATIVO */}
         <PortalModal isOpen={showReceiptViewer} onClose={() => setShowReceiptViewer(false)} title="Documento Digitalizado">
            <div className="space-y-6">
               <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden min-h-[400px] flex items-center justify-center border-4 border-slate-800 shadow-2xl">
                  {selectedReceipt ? (
                     <img src={selectedReceipt} alt="Comprovativo" className="max-w-full max-h-[600px] object-contain" />
                  ) : (
                     <div className="text-center p-20">
                        <CloudArrowUpIcon className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                        <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Nenhum documento disponível</p>
                     </div>
                  )}
               </div>
               <div className="flex space-x-4">
                  <a
                     href={selectedReceipt || '#'}
                     target="_blank"
                     className="flex-1 py-5 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest text-center shadow-xl shadow-blue-500/20"
                  >
                     Abrir em Nova Aba
                  </a>
                  <button
                     onClick={() => setShowReceiptViewer(false)}
                     className="flex-1 py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest"
                  >
                     Fechar Visualizador
                  </button>
               </div>
            </div>
         </PortalModal>
      </div>
   );
}
