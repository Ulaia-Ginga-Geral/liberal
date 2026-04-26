'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { militantesMock } from '@/data/portalMock';
import { 
  IdentificationIcon, 
  MapPinIcon, 
  CalendarIcon, 
  CreditCardIcon,
  ChevronLeftIcon,
  PrinterIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function PerfilMembro() {
  // Simular busca de membro por ID (Hardcoded para demonstração)
  const membro = militantesMock[0];

  return (
    <div className="space-y-8 pb-12">
      <div className="mb-6">
        <Link 
          href="/portal/cadastro?tab=controle" 
          className="flex items-center text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-1" />
          Voltar à Listagem
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Card de Identidade */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center text-center">
             <div className="w-48 h-48 rounded-[2.5rem] bg-slate-100 border-4 border-white shadow-xl overflow-hidden mb-6 relative">
                {/* Mock Photo Placeholdwer */}
                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                   <IdentificationIcon className="w-24 h-24" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
             </div>
             
             <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">{membro.nome}</h3>
             <p className="text-xs font-black text-yellow-600 bg-yellow-100 px-4 py-1.5 rounded-full mt-2 uppercase tracking-widest">Militante Activo</p>
             
             <div className="w-full mt-8 pt-8 border-t border-slate-50 space-y-4 text-left">
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">BI / Identidade</span>
                   <span className="text-xs font-bold text-slate-900">{membro.bi}</span>
                </div>
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ID Militante</span>
                   <span className="text-xs font-black text-slate-900">PL-{membro.id.toString().padStart(4, '0')}</span>
                </div>
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Província</span>
                   <span className="text-xs font-bold text-slate-900">{membro.provincia}</span>
                </div>
             </div>

             <div className="w-full mt-8 grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center p-4 bg-slate-900 text-white rounded-2xl hover:scale-105 transition-all">
                   <PrinterIcon className="w-5 h-5" />
                </button>
                <button className="flex items-center justify-center p-4 bg-blue-600 text-white rounded-2xl hover:scale-105 transition-all">
                   <ChatBubbleLeftRightIcon className="w-5 h-5" />
                </button>
             </div>
          </div>
        </div>

        {/* Histórico e Actividade */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-900 tracking-tighter mb-8">Histórico de Quotas e Contribuições</h3>
              <div className="space-y-4">
                 {[
                   { data: '2024-04-15', valor: '5.000 Kz', status: 'Liquidado', ref: 'Abril/24' },
                   { data: '2024-03-10', valor: '5.000 Kz', status: 'Liquidado', ref: 'Março/24' },
                   { data: '2024-02-05', valor: '5.000 Kz', status: 'Liquidado', ref: 'Fevereiro/24' },
                 ].map((p, i) => (
                   <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                      <div className="flex items-center space-x-4">
                         <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-green-500 shadow-sm">
                            <CreditCardIcon className="w-6 h-6" />
                         </div>
                         <div>
                            <p className="text-sm font-black text-slate-900">Quotas: {p.ref}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.data}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-sm font-black text-slate-900">{p.valor}</p>
                         <span className="text-[10px] font-black text-green-500 underline decoration-green-500 decoration-2">CONFIRMADO</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-slate-900 p-10 rounded-[3rem] text-white">
              <h3 className="text-xl font-black tracking-tighter mb-8">Participação em Eventos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <CalendarIcon className="w-6 h-6 text-yellow-400 mb-4" />
                    <p className="text-xs font-bold text-white">Conferencia Regional</p>
                    <p className="text-[10px] text-slate-500 font-black mt-1">PRESENTE • MAR 2024</p>
                 </div>
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/10 opacity-50">
                    <CalendarIcon className="w-6 h-6 text-slate-500 mb-4" />
                    <p className="text-xs font-bold text-white">Mito de Massas Luanda</p>
                    <p className="text-[10px] text-slate-500 font-black mt-1">AUSENTE • JAN 2024</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
