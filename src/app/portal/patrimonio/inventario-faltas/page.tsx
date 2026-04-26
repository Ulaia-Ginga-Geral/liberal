'use client';

import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardDocumentListIcon, 
  ExclamationCircleIcon, 
  PlusIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import { MUNICIPIOS_CUANZA_SUL } from '@/data/portalMock';
import { useSearchParams } from 'next/navigation';

const faltasMock = [
  { id: 1, sede: "Sede Provincial Sumbe", item: "Cadeiras de Auditório", qtd: 50, prioridade: "Alta", status: "Pendente" },
  { id: 2, sede: "Comarcal Calulo", item: "Sistema de Som", qtd: 1, prioridade: "Média", status: "Em Aquisição" },
  { id: 3, sede: "Comité Porto Amboim", item: "Kit de Primeiros Socorros", qtd: 5, prioridade: "Urgente", status: "Crítico" },
  { id: 4, sede: "Secretaria Quibala", item: "Impressora Multifuncional", qtd: 1, prioridade: "Alta", status: "Pendente" },
  { id: 5, sede: "Núcleo Waku Kungo", item: "Bandeiras Oficiais", qtd: 20, prioridade: "Média", status: "Entregue" },
];

function InventarioFaltasContent() {
  const searchParams = useSearchParams();
  const sedeParam = searchParams.get('sede');
  const [busca, setBusca] = useState(sedeParam || '');
  const [filtroMunicipio, setFiltroMunicipio] = useState('');

  const faltasFiltradas = faltasMock.filter(f => 
    (f.sede.toLowerCase().includes(busca.toLowerCase()) || f.item.toLowerCase().includes(busca.toLowerCase())) &&
    (filtroMunicipio === '' || f.sede.includes(filtroMunicipio))
  );

  return (
    <div className="space-y-10 pb-20 font-sans">
      <div className="bg-primary-blue p-10 rounded-[3rem] text-white shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
        <div className="relative z-10">
           <h3 className="text-4xl font-black tracking-tighter uppercase italic">Inventário de Faltas</h3>
           <p className="text-blue-200 font-bold uppercase text-[10px] tracking-[0.2em] mt-2 italic">Mapa de Necessidades Logísticas • Cuanza Sul</p>
        </div>
        <button className="relative z-10 bg-yellow-400 text-blue-900 px-10 py-4 rounded-[2rem] text-xs font-black uppercase tracking-widest flex items-center shadow-lg shadow-yellow-500/20 active:scale-95 transition-all">
           <PlusIcon className="w-5 h-5 mr-3" />
           Novo Levantamento
        </button>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Filtros de Municípios */}
         <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm sticky top-10">
               <div className="flex items-center space-x-3 mb-8">
                  <AdjustmentsHorizontalIcon className="w-5 h-5 text-slate-400" />
                  <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest block">Seleção Territorial</label>
               </div>
               
               <div className="relative mb-8">
                  <MagnifyingGlassIcon className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Pesquisar item..." 
                    className="w-full bg-slate-50 border-transparent rounded-2xl p-4 pl-12 text-sm font-black text-black outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                    onChange={(e) => setBusca(e.target.value)}
                  />
               </div>

               <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  <button 
                    onClick={() => setFiltroMunicipio('')}
                    className={`w-full text-left p-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${filtroMunicipio === '' ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                  >
                     Todos Municípios
                  </button>
                  {MUNICIPIOS_CUANZA_SUL.map(mun => (
                    <button 
                      key={mun}
                      onClick={() => setFiltroMunicipio(mun)}
                      className={`w-full text-left p-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${filtroMunicipio === mun ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                    >
                      {mun}
                    </button>
                  ))}
               </div>
            </div>
         </div>

         {/* Listagem Estilizada */}
         <div className="lg:col-span-9 space-y-6">
            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter px-4">Pedidos em Aberto (C. Sul)</h4>
            <div className="grid grid-cols-1 gap-4">
               {faltasFiltradas.map((falta, idx) => (
                 <motion.div 
                   key={falta.id}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: idx * 0.1 }}
                   className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between group transition-all hover:border-yellow-400/50"
                 >
                   <div className="flex items-center space-x-8">
                      <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                        falta.prioridade === 'Urgente' ? 'bg-red-900 text-white' : 'bg-slate-100 text-slate-400'
                      }`}>
                         <ClipboardDocumentListIcon className="w-8 h-8" />
                      </div>
                      <div>
                         <div className="flex items-center space-x-3">
                            <h4 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">{falta.item}</h4>
                            <span className="bg-yellow-400 text-slate-900 px-3 py-1 rounded-lg text-xs font-black italic shadow-sm">x{falta.qtd}</span>
                         </div>
                         <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                               <MapPinIcon className="w-4 h-4 mr-2 text-yellow-500" />
                               {falta.sede}
                            </div>
                            <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm ${
                              falta.prioridade === 'Urgente' ? 'bg-red-500 text-white animate-pulse' : 
                              falta.prioridade === 'Alta' ? 'bg-orange-100 text-orange-700' : 
                              'bg-blue-100 text-blue-700'
                            }`}>
                              Nível {falta.prioridade}
                            </span>
                         </div>
                      </div>
                   </div>
                   
                   <div className="flex items-center space-x-8 mt-6 md:mt-0 pt-6 md:pt-0 border-t md:border-t-0 border-slate-50 w-full md:w-auto">
                      <div className="text-right">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Operacionalização</p>
                         <p className={`text-sm font-black italic uppercase ${falta.status === 'Crítico' ? 'text-red-600' : 'text-slate-900'}`}>{falta.status}</p>
                      </div>
                      <button className="p-4 bg-slate-900 text-white rounded-2xl group-hover:bg-yellow-400 group-hover:text-slate-900 transition-all shadow-xl shadow-slate-100">
                         <ExclamationCircleIcon className="w-6 h-6" />
                      </button>
                   </div>
                 </motion.div>
               ))}
               {faltasFiltradas.length === 0 && (
                 <div className="p-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                    <p className="text-slate-300 font-black uppercase text-sm tracking-widest">Sem faltas registadas para este município.</p>
                 </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}

export default function InventarioFaltas() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-black italic text-slate-400 animate-pulse uppercase tracking-[0.3em]">Carregando Necessidades...</div>}>
      <InventarioFaltasContent />
    </Suspense>
  );
}
