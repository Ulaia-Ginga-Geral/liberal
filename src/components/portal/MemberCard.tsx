'use client';

import { motion } from 'framer-motion';

interface MemberCardProps {
  member: {
    nome: string;
    bi: string;
    provincia: string;
    idMilitante: string;
    hierarquia?: string;
    foto?: string;
  }
}

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <div className="w-[85.6mm] h-[54mm] relative rounded-[1rem] overflow-hidden shadow-2xl border border-yellow-400 group bg-slate-900 border-2">
      {/* Background Bandeira */}
      <img 
        src="/partidoliberarbandeira.jpg" 
        className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-normal" 
        alt="Bandeira PL"
      />
      
      {/* Overlay para facilitar leitura */}
      <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-[0.5px]" />

      <div className="relative h-full flex flex-col p-4 text-white z-10">
        {/* Top Header */}
        <div className="flex justify-between items-start mb-1">
           <div className="w-10 h-6 bg-white/20 backdrop-blur-md rounded border border-white/30 flex items-center justify-center">
              <span className="text-[10px] font-black italic tracking-tighter">PL</span>
           </div>
           <div className="text-right">
              <h2 className="text-[12px] font-black uppercase leading-none tracking-tighter italic shadow-sm">Partido Liberal</h2>
              <p className="text-[7px] font-black text-yellow-400 uppercase tracking-widest">Secretariado Provincial</p>
           </div>
        </div>

        {/* Info Row com Foto e Campos */}
        <div className="flex space-x-3 mt-1 flex-1">
          {/* Foto Zone */}
          <div className="w-[24mm] h-[30mm] bg-white rounded-lg border-2 border-primary-blue overflow-hidden shadow-lg relative">
             {member.foto ? (
                <img src={member.foto} className="w-full h-full object-cover" alt={member.nome} />
             ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                   <span className="text-[10px] font-black">FOTO</span>
                </div>
             )}
          </div>

          <div className="flex-1 space-y-1.5 flex flex-col justify-center">
             <div className="space-y-0.5">
                <p className="text-[6px] font-black text-white/80 uppercase tracking-widest leading-none">Nome Completo</p>
                <div className="bg-white rounded px-2 py-0.5 border border-primary-blue/30 overflow-hidden h-4">
                   <p className="text-[9px] font-black text-primary-blue truncate uppercase leading-tight">{member.nome}</p>
                </div>
             </div>

             <div className="space-y-0.5">
                <p className="text-[6px] font-black text-white/80 uppercase tracking-widest leading-none">Bilhete de Identidade</p>
                <div className="bg-white rounded px-2 py-0.5 border border-primary-blue/30 h-4">
                   <p className="text-[9px] font-black text-primary-blue uppercase leading-tight">{member.bi}</p>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-2">
                <div className="space-y-0.5">
                   <p className="text-[6px] font-black text-white/80 uppercase tracking-widest leading-none">Secretariado</p>
                   <div className="bg-white rounded px-2 py-0.5 border border-primary-blue/30 h-4">
                      <p className="text-[8px] font-black text-primary-blue uppercase truncate leading-tight">{member.provincia}</p>
                   </div>
                </div>
                <div className="space-y-0.5 relative">
                   <p className="text-[6px] font-black text-white/80 uppercase tracking-widest leading-none">Cartão Nº</p>
                   <div className="bg-yellow-400 rounded px-2 py-0.5 border border-primary-blue/30 h-4">
                      <p className="text-[8px] font-black text-primary-blue uppercase leading-tight">{member.idMilitante}</p>
                   </div>
                </div>
             </div>
          </div>

          {/* QR Code Simulado no Canto Inferior Direito como no Modelo */}
          <div className="self-end mb-2">
             <div className="w-10 h-10 bg-white p-0.5 rounded border border-primary-blue flex items-center justify-center">
                {/* Fake QR bars */}
                <div className="w-full h-full flex flex-col space-y-px">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex-1 flex space-x-px">
                      {[...Array(6)].map((_, j) => (
                        <div key={j} className={`flex-1 ${Math.random() > 0.5 ? 'bg-primary-blue' : 'bg-transparent'}`} />
                      ))}
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>

        {/* Footer Area */}
        <div className="mt-1 flex justify-between items-center text-[6px] font-black px-1">
           <p className="text-white">DATA DE INGRESSO: <span className="text-yellow-400">___/___/2024</span></p>
           <p className="text-white uppercase tracking-widest">PL - Liberdade e Progresso</p>
        </div>
      </div>
    </div>
  );
}
