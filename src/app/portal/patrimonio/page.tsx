'use client';

import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MUNICIPIOS_CUANZA_SUL } from '@/data/portalMock';
import {
   BuildingOfficeIcon,
   TruckIcon,
   ExclamationTriangleIcon,
   MagnifyingGlassIcon,
   FunnelIcon,
   PlusIcon,
   ChevronRightIcon,
   ClipboardDocumentCheckIcon,
   WrenchScrewdriverIcon,
   CurrencyDollarIcon,
   DocumentArrowUpIcon,
   UserIcon,
   IdentificationIcon,
   CloudArrowUpIcon,
   CalendarIcon,
   ClockIcon,
   TrashIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import PortalModal from '@/components/portal/PortalModal';
import { toast } from 'react-hot-toast';

import { usePortal } from '@/context/PortalContext';
import { useSearchParams } from 'next/navigation';

function PatrimonioPageContent() {
   const { 
      imoveis, addImovel, deleteImovel,
      viaturas, addViatura, deleteViatura,
      manutencoes, addManutencao,
      transacoes,
      getDividaAcumulada,
      saldo 
   } = usePortal();

   const searchParams = useSearchParams();
   const initialTab = searchParams.get('tab') || 'imoveis';
   const [activeTab, setActiveTab] = useState(initialTab);

   // Sincronizar aba com a URL
   const [lastTab, setLastTab] = useState(initialTab);
   const currentTab = searchParams.get('tab');

   if (currentTab && currentTab !== lastTab) {
      setActiveTab(currentTab);
      setLastTab(currentTab);
   }

   const [filtroSede, setFiltroSede] = useState('');
   const [dataInicio, setDataInicio] = useState('');
   const [dataFim, setDataFim] = useState('');

   const [filtroMunicipio, setFiltroMunicipio] = useState('');

   // Estados para Modais
   const [showModalImovel, setShowModalImovel] = useState(false);
   const [showModalViatura, setShowModalViatura] = useState(false);
   const [showModalManutencao, setShowModalManutencao] = useState(false);
   const [showModalHistoricoVtr, setShowModalHistoricoVtr] = useState(false);
   const [selectedVtr, setSelectedVtr] = useState<any>(null);

   // Estados dos Formulários
   const [imovelForm, setImovelForm] = useState({
      nome: '', localizacao: 'Sumbe', mensalidade: '', dono: '', contacto: '', diaVencimento: '5'
   });
   const [viaturaForm, setViaturaForm] = useState({
      modelo: '', matricula: '', ano: new Date().getFullYear(), departamento: 'Logística Provincial'
   });
   const [manutencaoForm, setManutencaoForm] = useState({
      servico: '', custo: '', data: new Date().toISOString().split('T')[0]
   });

   const handleDeleteImovel = (id: number) => {
      if (confirm('Deseja realmente remover esta sede do património provincial?')) {
         deleteImovel(id);
         toast.success('Imóvel removido com sucesso!');
      }
   };

   const handleDeleteViatura = (id: number) => {
      if (confirm('Confirmar remoção desta viatura da frota oficial?')) {
         deleteViatura(id);
         toast.success('Viatura removida do sistema!');
      }
   };

   const handleImovelSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      addImovel({
         ...imovelForm,
         status: 'Regular',
         dataVencimento: new Date(new Date().getFullYear(), new Date().getMonth() + 1, parseInt(imovelForm.diaVencimento)).toISOString()
      });
      setShowModalImovel(false);
      toast.success('Imóvel registrado com sucesso!');
   };

   const handleViaturaSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      addViatura({
         ...viaturaForm,
         manutencaoProx: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString()
      });
      setShowModalViatura(false);
      toast.success('Viatura adicionada à frota!');
   };

   const handleManutencaoSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      addManutencao({
         vtrId: selectedVtr.id,
         vtr: selectedVtr.modelo,
         acao: manutencaoForm.servico,
         custo: manutencaoForm.custo + ' Kz',
         data: manutencaoForm.data,
         responsavel: 'Oficina Provincial (Sumbe)'
      });

      setShowModalManutencao(false);
      setManutencaoForm({ servico: '', custo: '', data: new Date().toISOString().split('T')[0] });
      toast.success('Manutenção registrada e sincronizada!');
   };

   const imoveisFiltrados = imoveis.filter(i => {
      const matchTexto = i.nome.toLowerCase().includes(filtroSede.toLowerCase()) || i.localizacao.toLowerCase().includes(filtroSede.toLowerCase());
      const matchMunicipio = filtroMunicipio === '' || i.localizacao.toLowerCase().includes(filtroMunicipio.toLowerCase());
      return matchTexto && matchMunicipio;
   });

   const viaturasFiltradas = viaturas.filter(v => {
      const matchTexto = v.modelo.toLowerCase().includes(filtroSede.toLowerCase()) || v.matricula.toLowerCase().includes(filtroSede.toLowerCase());
      const matchMunicipio = filtroMunicipio === '' || v.departamento.toLowerCase().includes(filtroMunicipio.toLowerCase());
      return matchTexto && matchMunicipio;
   });

   return (
      <div className="space-y-8">
         {/* Dashboard Financeiro Condicional */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {activeTab === 'imoveis' ? (
               <>
                  <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-500/20">
                     <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest mb-2">Saldo em Caixa (PL)</p>
                     <p className="text-3xl font-black italic">{saldo.toLocaleString()} Kz</p>
                  </div>
                  <div className="bg-yellow-400 p-8 rounded-[2.5rem] text-slate-900 shadow-xl shadow-yellow-500/20">
                     <p className="text-[10px] font-black text-yellow-800 uppercase tracking-widest mb-2">Dívidas Acumuladas</p>
                     <p className="text-3xl font-black italic">{getDividaAcumulada().toLocaleString()} Kz</p>
                  </div>
                  <div className="md:col-span-2 bg-white p-10 rounded-[2.5rem] border-2 border-slate-50 shadow-sm flex items-center justify-between group hover:border-blue-100 transition-all">
                     <div className="flex-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                           <CalendarIcon className="w-4 h-4 mr-2" />
                           Intervalo de Auditoria Estratégica
                        </p>
                        <div className="flex items-center space-x-3">
                           <div className="relative flex-1">
                              <input
                                 type="date"
                                 value={dataInicio}
                                 onChange={(e) => setDataInicio(e.target.value)}
                                 className={`w-full bg-slate-50 border-none rounded-2xl p-4 text-xs font-black outline-none transition-all ${dataInicio ? 'text-blue-600' : 'text-slate-400 focus:text-blue-600'}`}
                              />
                           </div>
                           <span className="text-slate-200 font-black text-xl">→</span>
                           <div className="relative flex-1">
                              <input
                                 type="date"
                                 value={dataFim}
                                 onChange={(e) => setDataFim(e.target.value)}
                                 className={`w-full bg-slate-50 border-none rounded-2xl p-4 text-xs font-black outline-none transition-all ${dataFim ? 'text-blue-600' : 'text-slate-400 focus:text-blue-600'}`}
                              />
                           </div>
                        </div>
                     </div>
                  </div>
               </>
            ) : (
               <>
                  <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-500/20">
                     <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest mb-2">Custos de Manutenção</p>
                     <p className="text-3xl font-black italic">
                        {transacoes.filter(t => t.categoria === 'Viatura').reduce((acc, t) => acc + t.valor, 0).toLocaleString()} Kz
                     </p>
                  </div>
                  <div className="bg-yellow-400 p-8 rounded-[2.5rem] text-slate-900 shadow-xl shadow-yellow-500/20">
                     <p className="text-[10px] font-black text-yellow-800 uppercase tracking-widest mb-2">Total Frota Ativa</p>
                     <p className="text-3xl font-black italic">{viaturas.length} Viaturas</p>
                  </div>
                  <div className="md:col-span-2 bg-white p-10 rounded-[2.5rem] border-2 border-slate-50 shadow-sm flex items-center justify-between group hover:border-blue-100 transition-all">
                     <div className="flex-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                           <CalendarIcon className="w-4 h-4 mr-2" />
                           Auditoria de Custos por Período
                        </p>
                        <div className="flex items-center space-x-3">
                           <div className="relative flex-1">
                              <input 
                                 type="date" 
                                 value={dataInicio} 
                                 onChange={(e) => setDataInicio(e.target.value)} 
                                 className={`w-full bg-slate-50 border-none rounded-2xl p-4 text-xs font-black outline-none transition-all ${dataInicio ? 'text-blue-600' : 'text-slate-400'}`} 
                              />
                           </div>
                           <span className="text-slate-200 font-black text-xl">→</span>
                           <div className="relative flex-1">
                              <input 
                                 type="date" 
                                 value={dataFim} 
                                 onChange={(e) => setDataFim(e.target.value)} 
                                 className={`w-full bg-slate-50 border-none rounded-2xl p-4 text-xs font-black outline-none transition-all ${dataFim ? 'text-blue-600' : 'text-slate-400'}`} 
                              />
                           </div>
                        </div>
                     </div>
                  </div>
               </>
            )}
         </div>

         {/* Abas Superiores */}
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="bg-white p-2 rounded-3xl shadow-sm border border-slate-100 flex space-x-2">
               {[
                  { id: 'imoveis', label: 'Imóveis & Sedes', icon: BuildingOfficeIcon },
                  { id: 'viaturas', label: 'Frota de Viaturas', icon: TruckIcon },
               ].map((tab) => (
                  <button
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id)}
                     className={`
                flex items-center px-6 py-3 rounded-2xl text-xs font-black transition-all
                ${activeTab === tab.id
                           ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                           : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
                        }
              `}
                  >
                     <tab.icon className="w-5 h-5 mr-3" />
                     <span className="uppercase tracking-widest">{tab.label}</span>
                  </button>
               ))}
            </div>

            <div className="flex space-x-3">
               <Link
                  href="/portal/patrimonio/inventario-faltas"
                  className="flex items-center px-6 py-3 bg-red-50 text-red-600 rounded-2xl text-xs font-black uppercase tracking-widest border border-red-100 hover:bg-red-100 transition-all"
               >
                  <ClipboardDocumentCheckIcon className="w-5 h-5 mr-2" />
                  Ver Faltas nas Sedes
               </Link>
               <Link
                  href="/portal/patrimonio/historico"
                  className="flex items-center px-6 py-3 bg-slate-100 text-slate-900 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
               >
                  <WrenchScrewdriverIcon className="w-5 h-5 mr-2" />
                  Histórico Manutenção
               </Link>
            </div>
         </div>

         {/* Barra de Filtros e Busca */}
         <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="relative flex-1">
               <MagnifyingGlassIcon className="absolute left-4 top-3.5 w-5 h-5 text-slate-300" />
               <input
                  type="text"
                  placeholder={`Pesquisar ${activeTab === 'imoveis' ? 'sedes ou localizações' : 'modelos ou matrículas'}...`}
                  className="w-full bg-slate-50 border-transparent rounded-2xl p-4 pl-12 text-sm font-bold focus:bg-white focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                  onChange={(e) => setFiltroSede(e.target.value)}
               />
            </div>
            <div className="flex flex-wrap gap-4">
               <select 
                  onChange={(e) => setFiltroMunicipio(e.target.value)}
                  className="bg-slate-50 text-slate-900 rounded-2xl px-6 py-4 text-[10px] font-black uppercase tracking-widest border border-slate-100 outline-none focus:ring-2 focus:ring-yellow-400 transition-all cursor-pointer"
               >
                  <option value="">Cuanza Sul (Todos)</option>
                  {MUNICIPIOS_CUANZA_SUL.map(m => (
                     <option key={m} value={m}>{m}</option>
                  ))}
               </select>

               <button 
                  onClick={() => activeTab === 'imoveis' ? setShowModalImovel(true) : setShowModalViatura(true)}
                  className="flex items-center px-8 py-4 bg-yellow-400 text-slate-950 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-yellow-500/10 hover:bg-yellow-500 transition-all"
               >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Novo Registro
               </button>
            </div>
         </div>

         <AnimatePresence mode="wait">
            <motion.div
               key={activeTab}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
               {/* Renderização de Imóveis */}
               {activeTab === 'imoveis' && imoveisFiltrados.map((imovel) => (
                  <motion.div
                     key={imovel.id}
                     whileHover={{ y: -10 }}
                     className={`p-8 rounded-[3rem] shadow-xl border flex flex-col justify-between group overflow-hidden relative transition-all duration-500 ${imovel.status === 'Crítico' ? 'bg-red-50 border-red-200' : 'bg-white border-slate-100'
                        }`}
                  >
                     <div className="space-y-6">
                        <div className="flex justify-between items-start">
                           <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center ${imovel.status === 'Crítico' ? 'bg-red-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                              <BuildingOfficeIcon className="w-8 h-8" />
                           </div>
                           <span className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${imovel.status === 'Regular' ? 'bg-green-100 text-green-700' : imovel.status === 'Aviso' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-600'
                              }`}>
                              {imovel.status}
                           </span>
                        </div>
                        <div>
                           <h4 className="text-xl font-black text-slate-900 tracking-tighter">{imovel.nome}</h4>
                           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{imovel.localizacao}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                              <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Renda Mensal</p>
                              <p className="text-sm font-black text-slate-900">{imovel.mensalidade}</p>
                           </div>
                           <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                              <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Total Pago (Ano)</p>
                              <p className="text-sm font-black text-blue-900">4.500.000 Kz</p>
                           </div>
                        </div>
                     </div>
                     <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                        <Link href={`/portal/patrimonio/historico-imovel?id=${imovel.id}`} className="text-[10px] font-black uppercase text-slate-900 hover:underline">Ver Dono & Contrato</Link>
                        <div className="flex items-center space-x-2">
                           <button onClick={() => handleDeleteImovel(imovel.id)} className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-600"><TrashIcon className="w-4 h-4" /></button>
                           <button className="p-3 bg-slate-900 text-white rounded-xl"><ChevronRightIcon className="w-4 h-4" /></button>
                        </div>
                     </div>
                  </motion.div>
               ))}

               {/* Renderização de Viaturas */}
               {activeTab === 'viaturas' && viaturasFiltradas.map((car) => (
                  <motion.div
                     key={car.id}
                     whileHover={{ y: -10 }}
                     onClick={() => { setSelectedVtr(car); setShowModalHistoricoVtr(true); }}
                     className="bg-white p-8 rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col justify-between cursor-pointer group"
                  >
                     <div className="space-y-6">
                        <div className="flex justify-between items-start">
                           <div className="w-16 h-16 rounded-[1.5rem] bg-slate-900 flex items-center justify-center text-white transition-transform group-hover:scale-110">
                              <TruckIcon className="w-8 h-8" />
                           </div>
                           <div className="text-right">
                              <span className="block text-[8px] font-black text-slate-400 uppercase">Matrícula</span>
                              <span className="text-sm font-black font-mono group-hover:text-blue-600 transition-colors">{car.matricula}</span>
                           </div>
                        </div>
                        <div>
                           <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">{car.modelo}</h4>
                           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{car.departamento}</p>
                        </div>
                     </div>
                     <div className="mt-8 pt-6 border-t border-slate-50 flex items-center space-x-2">
                        <button
                           onClick={(e) => { e.stopPropagation(); setSelectedVtr(car); setShowModalManutencao(true); }}
                           className="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-yellow-400 hover:text-slate-900"
                        >
                           Registrar Manutenção
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); handleDeleteViatura(car.id); }} className="p-4 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-red-50 group-hover:text-red-600 transition-all"><TrashIcon className="w-4 h-4" /></button>
                        <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-all"><WrenchScrewdriverIcon className="w-4 h-4" /></button>
                     </div>
                  </motion.div>
               ))}
            </motion.div>
         </AnimatePresence>

         {/* MODAL: HISTÓRICO DE MANUTENÇÃO (VIATURA) */}
         <PortalModal isOpen={showModalHistoricoVtr} onClose={() => setShowModalHistoricoVtr(false)} title={`Histórico de Manutenção: ${selectedVtr?.modelo || ''}`}>
            <div className="space-y-6">
               <div className="bg-slate-900 p-6 rounded-[2rem] text-white flex items-center justify-between">
                  <div>
                     <p className="text-[9px] font-black text-yellow-400 uppercase tracking-widest">Matrícula Oficial</p>
                     <p className="text-xl font-black font-mono italic">{selectedVtr?.matricula}</p>
                  </div>
                  <div className="text-right">
                     <p className="text-[9px] font-black text-blue-300 uppercase tracking-widest">Estado da Frota</p>
                     <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-[8px] font-black uppercase tracking-widest underline decoration-green-400/30">Em Rota</span>
                  </div>
               </div>

               <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Registo de Intervenções</h4>
                  {manutencoes.filter(h => h.vtrId === selectedVtr?.id).length > 0 ? (
                     manutencoes.filter(h => h.vtrId === selectedVtr?.id).map((h) => (
                        <div key={h.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start space-x-4">
                           <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600">
                              <WrenchScrewdriverIcon className="w-5 h-5" />
                           </div>
                           <div className="flex-1">
                              <p className="text-[11px] font-black text-slate-900 uppercase">{h.acao}</p>
                              <div className="flex items-center space-x-4 mt-2">
                                 <div className="flex items-center text-[9px] font-bold text-slate-400 uppercase">
                                    <CalendarIcon className="w-3.5 h-3.5 mr-1" />
                                    {h.data}
                                 </div>
                                 <div className="flex items-center text-[9px] font-black text-green-600 uppercase">
                                    <CurrencyDollarIcon className="w-3.5 h-3.5 mr-1" />
                                    {h.custo}
                                 </div>
                                 <div className="flex items-center text-[9px] font-bold text-slate-400 uppercase">
                                    <ClockIcon className="w-3.5 h-3.5 mr-1" />
                                    {h.responsavel}
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))
                  ) : (
                     <div className="p-10 text-center bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                        <ExclamationTriangleIcon className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sem registos de manutenção para esta viatura</p>
                     </div>
                  )}
               </div>

               <button
                  onClick={() => { setShowModalHistoricoVtr(false); setShowModalManutencao(true); }}
                  className="w-full py-5 bg-yellow-400 text-slate-900 rounded-3xl font-black uppercase tracking-widest shadow-xl hover:bg-yellow-500 transition-all active:scale-95 flex items-center justify-center space-x-3"
               >
                  <PlusIcon className="w-5 h-5" />
                  <span>Registrar Nova Intervenção</span>
               </button>
            </div>
         </PortalModal>

         {/* MODAL: NOVO IMÓVEL / SEDE */}
         <PortalModal isOpen={showModalImovel} onClose={() => setShowModalImovel(false)} title="Novo Registro de Imóvel">
            <form onSubmit={handleImovelSubmit} className="space-y-6">
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Designação da Sede</label>
                     <input 
                        required
                        value={imovelForm.nome}
                        onChange={e => setImovelForm({...imovelForm, nome: e.target.value})}
                        type="text" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-black focus:bg-white focus:border-yellow-400 transition-all outline-none" placeholder="Ex: Sede Provincial" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Município</label>
                     <select 
                        value={imovelForm.localizacao}
                        onChange={e => setImovelForm({...imovelForm, localizacao: e.target.value})}
                        className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-black text-black focus:bg-white focus:border-yellow-400 transition-all outline-none"
                     >
                        {MUNICIPIOS_CUANZA_SUL.map(m => <option key={m} className="text-black">{m}</option>)}
                     </select>
                  </div>
               </div>

               <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest">Informações do Proprietário</h4>
                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome do Dono</label>
                        <input 
                           required
                           value={imovelForm.dono}
                           onChange={e => setImovelForm({...imovelForm, dono: e.target.value})}
                           type="text" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-black text-black focus:bg-white focus:border-yellow-400 transition-all outline-none" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contacto</label>
                        <input 
                           required
                           value={imovelForm.contacto}
                           onChange={e => setImovelForm({...imovelForm, contacto: e.target.value})}
                           type="text" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-black text-black focus:bg-white focus:border-yellow-400 transition-all outline-none" placeholder="+244 ..." />
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-6 p-6 bg-slate-900 rounded-[2rem] text-white">
                  <div className="space-y-2">
                     <p className="text-[9px] font-black text-yellow-400 uppercase">Mensalidade (Kz)</p>
                     <input 
                        required
                        value={imovelForm.mensalidade}
                        onChange={e => setImovelForm({...imovelForm, mensalidade: e.target.value})}
                        type="text" className="w-full bg-white/10 border-none rounded-xl p-3 text-lg font-black text-white outline-none" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                     <p className="text-[9px] font-black text-yellow-400 uppercase">Dia de Vencimento</p>
                     <input 
                        required
                        value={imovelForm.diaVencimento}
                        onChange={e => setImovelForm({...imovelForm, diaVencimento: e.target.value})}
                        type="number" max="31" className="w-full bg-white/10 border-none rounded-xl p-3 text-lg font-black text-white outline-none" placeholder="Ex: 5" />
                  </div>
               </div>

               <button type="submit" className="w-full py-6 bg-yellow-400 text-slate-900 rounded-3xl font-black uppercase tracking-widest hover:bg-yellow-500 transition-all shadow-xl active:scale-95">Salvar Registro de Sede</button>
            </form>
         </PortalModal>

         {/* MODAL: NOVA VIATURA */}
         <PortalModal isOpen={showModalViatura} onClose={() => setShowModalViatura(false)} title="Registrar Nova Viatura">
            <form onSubmit={handleViaturaSubmit} className="space-y-6">
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Modelo / Marca</label>
                     <input 
                        required
                        value={viaturaForm.modelo}
                        onChange={e => setViaturaForm({...viaturaForm, modelo: e.target.value})}
                        type="text" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-black text-black focus:bg-white focus:border-yellow-400 transition-all outline-none" placeholder="Ex: Toyota Hilux" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Matrícula</label>
                     <input 
                        required
                        value={viaturaForm.matricula}
                        onChange={e => setViaturaForm({...viaturaForm, matricula: e.target.value})}
                        type="text" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-black text-black focus:bg-white focus:border-yellow-400 transition-all outline-none" placeholder="LD-00-00-XX" />
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Ano de Fabrico</label>
                     <input 
                        required
                        value={viaturaForm.ano}
                        onChange={e => setViaturaForm({...viaturaForm, ano: parseInt(e.target.value)})}
                        type="number" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-black focus:bg-white focus:border-yellow-400 transition-all outline-none" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Departamento</label>
                     <select 
                        value={viaturaForm.departamento}
                        onChange={e => setViaturaForm({...viaturaForm, departamento: e.target.value})}
                        className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-black focus:bg-white focus:border-yellow-400 transition-all outline-none cursor-pointer"
                     >
                        <option>Logística Provincial</option>
                        <option>Mobilização Sumbe</option>
                        <option>Secretariado Executivo</option>
                     </select>
                  </div>
               </div>
               <button type="submit" className="w-full py-6 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95">Finalizar Cadastro de Frota</button>
            </form>
         </PortalModal>

         {/* MODAL: MANUTENÇÃO */}
         <PortalModal isOpen={showModalManutencao} onClose={() => setShowModalManutencao(false)} title={`Manutenção: ${selectedVtr?.modelo || ''}`}>
            <form onSubmit={handleManutencaoSubmit} className="space-y-6">
               <div className="bg-yellow-50 p-6 rounded-[2rem] border border-yellow-100 flex items-center space-x-4">
                  <div className="p-3 bg-yellow-400 rounded-xl text-slate-900"><WrenchScrewdriverIcon className="w-6 h-6" /></div>
                  <div>
                     <p className="text-[10px] font-black text-yellow-700 uppercase tracking-widest">Matrícula Detectada</p>
                     <p className="text-xl font-black text-slate-900 font-mono">{selectedVtr?.matricula}</p>
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Descrição do Serviço</label>
                  <textarea 
                     required
                     value={manutencaoForm.servico}
                     onChange={e => setManutencaoForm({...manutencaoForm, servico: e.target.value})}
                     rows={3} className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-black text-black focus:bg-white focus:border-yellow-400 transition-all outline-none" placeholder="Ex: Substituição de pastilhas de travão e óleo de motor." />
               </div>
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Custo da Reparação (Kz)</label>
                     <input 
                        required
                        value={manutencaoForm.custo}
                        onChange={e => setManutencaoForm({...manutencaoForm, custo: e.target.value})}
                        type="text" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-black text-black focus:bg-white focus:border-yellow-400 transition-all outline-none" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Data da Intervenção</label>
                     <input 
                        required
                        value={manutencaoForm.data}
                        onChange={e => setManutencaoForm({...manutencaoForm, data: e.target.value})}
                        type="date" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-black text-black focus:bg-white focus:border-yellow-400 transition-all outline-none" />
                  </div>
               </div>
               <button type="submit" className="w-full py-6 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95">Registrar Manutenção no Histórico</button>
            </form>
         </PortalModal>
      </div>
   );
}

export default function PortalPatrimonio() {
   return (
      <Suspense fallback={
         <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
         </div>
      }>
         <PatrimonioPageContent />
      </Suspense>
   );
}
