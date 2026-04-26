'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TruckIcon, 
  WrenchIcon, 
  CalendarDaysIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

import { useSearchParams } from 'next/navigation';
import { historicoMock, viaturasMock } from '@/data/portalMock';
import Link from 'next/link';

function HistoricoViaturasContent() {
  const searchParams = useSearchParams();
  const vtrId = searchParams.get('vtrId');
  
  const viaturaSelecionada = viaturasMock.find(v => v.id.toString() === vtrId);
  const logs = vtrId 
    ? historicoMock.filter(log => log.vtrId.toString() === vtrId)
    : historicoMock;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">
             {viaturaSelecionada ? `Histórico: ${viaturaSelecionada.modelo}` : 'Histórico de Manutenções'}
           </h3>
           <p className="text-sm text-slate-400 font-medium">
             {viaturaSelecionada 
               ? `Controlo de intervenções da viatura ${viaturaSelecionada.matricula}.` 
               : 'Registo completo de intervenções na frota nacional.'}
           </p>
        </div>
        <div className="flex space-x-2">
           <Link href="/portal/patrimonio" className="bg-white border border-slate-200 text-slate-900 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center">
              Voltar à Frota
           </Link>
           <button className="bg-yellow-400 text-slate-900 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center shadow-lg shadow-yellow-500/10">
              <WrenchIcon className="w-4 h-4 mr-2" />
              Nova Entrada
           </button>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
         <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
               <MagnifyingGlassIcon className="absolute left-4 top-3 w-5 h-5 text-slate-400" />
               <input 
                 type="text" 
                 placeholder="Pesquisar por acção..." 
                 className="w-full bg-slate-50 border-transparent rounded-2xl p-3 pl-12 text-sm font-bold focus:bg-white focus:ring-2 focus:ring-yellow-400 transition-all outline-none"
               />
            </div>
            <div className="flex space-x-4">
               <div className="text-center px-6 border-r border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gasto {viaturaSelecionada ? 'Viatura' : 'Total'}</p>
                  <p className="text-lg font-black text-slate-900">
                    {logs.reduce((acc, curr) => acc + parseInt(curr.custo.replace(/\./g, '')), 0).toLocaleString('pt-AO')} Kz
                  </p>
               </div>
               <div className="text-center px-6">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Intervenções</p>
                  <p className="text-lg font-black text-slate-900">{logs.length}</p>
               </div>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full">
               <thead>
                  <tr className="text-left bg-slate-50/50">
                     <th className="py-4 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Viatura</th>
                     <th className="py-4 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Data</th>
                     <th className="py-4 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Intervenção</th>
                     <th className="py-4 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Custo</th>
                     <th className="py-4 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {logs.map((log) => (
                    <tr key={log.id} className="group hover:bg-slate-50/80 transition-colors">
                       <td className="py-6 px-8">
                          <div className="flex items-center space-x-4">
                             <div className="w-10 h-10 rounded-xl bg-slate-900 text-yellow-400 flex items-center justify-center">
                                <TruckIcon className="w-6 h-6" />
                             </div>
                             <p className="text-sm font-black text-slate-900">{log.vtr}</p>
                          </div>
                       </td>
                       <td className="py-6 px-8">
                          <div className="flex items-center text-xs font-bold text-slate-500">
                             <CalendarDaysIcon className="w-4 h-4 mr-2 text-slate-300" />
                             {log.data}
                          </div>
                       </td>
                       <td className="py-6 px-8">
                          <p className="text-sm font-bold text-slate-900">{log.acao}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase mt-1">Local: {log.responsavel}</p>
                       </td>
                       <td className="py-6 px-8">
                          <span className="text-sm font-black text-slate-950 bg-slate-100 px-3 py-1 rounded-lg">
                             {log.custo}
                          </span>
                       </td>
                       <td className="py-6 px-8 text-right">
                          <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-300 group-hover:text-slate-900 group-hover:border-slate-300 transition-all">
                             <ChevronRightIcon className="w-4 h-4" />
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}

import { Suspense } from 'react';

export default function HistoricoViaturas() {
  return (
    <Suspense fallback={<div>Carregando Histórico...</div>}>
      <HistoricoViaturasContent />
    </Suspense>
  );
}
