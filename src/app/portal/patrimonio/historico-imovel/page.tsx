'use client';

import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { 
  BuildingOfficeIcon, 
  CalendarDaysIcon,
  ChevronLeftIcon,
  CurrencyDollarIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';
import { imoveisMock, historicoImoveisMock } from '@/data/portalMock';
import Link from 'next/link';

function HistoricoImoveisContent() {
  const searchParams = useSearchParams();
  const imovelId = searchParams.get('id');
  
  const imovel = imoveisMock.find(i => i.id.toString() === imovelId);
  const logs = imovelId 
    ? historicoImoveisMock.filter(log => log.imovelId.toString() === imovelId)
    : historicoImoveisMock;

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <Link 
          href="/portal/patrimonio"
          className="inline-flex items-center space-x-2 text-slate-400 hover:text-slate-900 font-bold transition-all group"
        >
          <div className="p-2 rounded-xl bg-white border border-slate-100 group-hover:border-slate-900 shadow-sm transition-all">
            <ChevronLeftIcon className="w-5 h-5" />
          </div>
          <span className="uppercase text-[10px] tracking-widest">Painel de Património</span>
        </Link>
        
        <div className="bg-yellow-400 px-6 py-2 rounded-full shadow-lg shadow-yellow-500/20">
           <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Controlo de Ativos • Cuanza Sul</p>
        </div>
      </div>

      <div className="bg-primary-blue p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
         <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
               <h2 className="text-4xl font-black tracking-tighter uppercase italic">
                 {imovel ? imovel.nome : 'Histórico Geral'}
               </h2>
               <p className="text-blue-200 font-bold uppercase text-[10px] tracking-widest mt-2">
                 {imovel ? `Sede Municipal: ${imovel.localizacao}` : 'Registo Nacional de Movimentações Patrimoniais'}
               </p>
            </div>
            <div className="flex space-x-4">
               <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-center min-w-[150px]">
                  <p className="text-[10px] font-black text-blue-300 uppercase mb-1">Total Movimentado</p>
                  <p className="text-2xl font-black">
                     {logs.reduce((acc, curr) => acc + parseInt(curr.custo.replace(/\./g, '')), 0).toLocaleString('pt-AO')} Kz
                  </p>
               </div>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
      </div>

      <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
         <div className="p-8 border-b border-slate-50">
            <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Linha do Tempo de Eventos</h3>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full">
               <thead>
                  <tr className="text-left bg-slate-50/50">
                     <th className="py-4 px-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">Data</th>
                     <th className="py-4 px-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">Acção Administrativa</th>
                     <th className="py-4 px-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">Custo / Valor</th>
                     <th className="py-4 px-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">Responsável</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {logs.map((log) => (
                    <tr key={log.id} className="group hover:bg-slate-50/50 transition-colors">
                       <td className="py-8 px-10">
                          <div className="flex items-center text-sm font-black text-slate-900">
                             <CalendarDaysIcon className="w-5 h-5 mr-3 text-blue-900" />
                             {log.data}
                          </div>
                       </td>
                       <td className="py-8 px-10">
                          <div className="flex items-center space-x-4">
                             <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                                <ClipboardDocumentIcon className="w-5 h-5" />
                             </div>
                             <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{log.acao}</p>
                          </div>
                       </td>
                       <td className="py-8 px-10">
                          <span className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-xl text-xs font-black">
                             <CurrencyDollarIcon className="w-4 h-4 mr-2" />
                             {log.custo} Kz
                          </span>
                       </td>
                       <td className="py-8 px-10">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{log.responsavel}</p>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
            {logs.length === 0 && (
              <div className="p-20 text-center">
                 <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Nenhum registo de histórico para este imóvel.</p>
              </div>
            )}
         </div>
      </div>
    </div>
  );
}

export default function HistoricoImovel() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-black animate-pulse">CARREGANDO HISTÓRICO...</div>}>
      <HistoricoImoveisContent />
    </Suspense>
  );
}
