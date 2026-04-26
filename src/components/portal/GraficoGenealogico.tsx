'use client';

import { motion } from 'framer-motion';
import { UserIcon, UsersIcon, UserGroupIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline';

interface NodeProps {
  name: string;
  role: string;
  isParent?: boolean;
  childrenCount?: number;
  image?: string;
  delay?: number;
}

function MemberNode({ name, role, isParent, childrenCount, image, delay = 0 }: NodeProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="flex flex-col items-center group relative"
    >
      {/* Linha vertical superior se não for pai */}
      {!isParent && <div className="w-0.5 h-8 bg-blue-200 mb-2" />}

      <div className={`
        relative p-4 rounded-3xl border-2 transition-all duration-500 min-w-[200px] text-center
        ${isParent 
          ? 'bg-primary-blue text-white border-yellow-400 shadow-xl shadow-blue-900/20' 
          : 'bg-white text-slate-900 border-slate-100 hover:border-yellow-400 hover:shadow-xl'}
      `}>
          {image ? (
            <img src={image} className="w-12 h-12 rounded-2xl mx-auto mb-3 object-cover border-2 border-white" />
          ) : (
            <div className={`w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center ${isParent ? 'bg-yellow-400 text-blue-900' : 'bg-slate-50 text-slate-400'}`}>
              {isParent ? <UserGroupIcon className="w-6 h-6" /> : <UserIcon className="w-6 h-6" />}
            </div>
          )}
          
          <p className="text-xs font-black uppercase tracking-tighter truncate">{name}</p>
          <p className={`text-[9px] font-bold uppercase mt-1 ${isParent ? 'text-yellow-400' : 'text-slate-400'}`}>{role}</p>
          
          {childrenCount !== undefined && childrenCount > 0 && (
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-blue-950 text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg">
              {childrenCount} LIGAÇÕES
            </div>
          )}
      </div>

      {childrenCount !== undefined && childrenCount > 0 && (
        <>
          <div className="w-0.5 h-8 bg-blue-200 mt-2" />
          <div className="h-0.5 bg-blue-200 relative w-full px-12">
             <div className="absolute left-0 top-0 w-0.5 h-2 bg-blue-200" />
             <div className="absolute right-0 top-0 w-0.5 h-2 bg-blue-200" />
          </div>
        </>
      )}
    </motion.div>
  );
}

export default function GraficoGenealogico({ principal, dependentes }: { principal: any, dependentes: any[] }) {
  return (
    <div className="w-full overflow-x-auto py-12 px-4 scrollbar-hide">
      <div className="flex flex-col items-center min-w-[800px]">
        {/* Nó Principal (O Secretário/Pai) */}
        <MemberNode 
          name={principal.nome} 
          role={principal.hierarquia || "Secretário de Comarca"} 
          isParent 
          childrenCount={dependentes.length}
        />

        {/* Linha Horizontal e Nós Dependentes */}
        <div className="flex justify-center space-x-8 mt-2">
          {dependentes.map((dep, idx) => (
            <MemberNode 
              key={dep.id} 
              name={dep.nome} 
              role={dep.profissao || "Militante Efectivo"} 
              delay={0.1 * idx}
              image={dep.foto}
            />
          ))}
          {dependentes.length === 0 && (
            <div className="mt-8 text-center bg-slate-50 p-6 rounded-3xl border-2 border-dashed border-slate-200 w-[300px]">
               <MagnifyingGlassPlusIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">Nenhuma ramificação registada para este comando</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
