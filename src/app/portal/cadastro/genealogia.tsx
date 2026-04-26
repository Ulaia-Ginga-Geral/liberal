'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MUNICIPIOS_CUANZA_SUL } from '@/data/geoData';
import { usuariosMock, militantesMock } from '@/data/portalMock';
import {
  UsersIcon,
  ChevronRightIcon,
  MapPinIcon,
  IdentificationIcon,
  UserCircleIcon,
  ChevronDownIcon,
  PlusIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import GraficoGenealogico from '@/components/portal/GraficoGenealogico';

export default function EstruturaGenealogica() {
  const [municipioAberto, setMunicipioAberto] = useState<string | null>(null);
  const [visualizarGrafico, setVisualizarGrafico] = useState<number | null>(null);

  // Calcula estatísticas por município
  const statsPorMunicipio = MUNICIPIOS_CUANZA_SUL.map(munc => {
    const usuarios = usuariosMock.filter(u => u.municipioOrigem === munc);
    const membros = militantesMock.filter(m => m.municipio === munc);
    return {
      nome: munc,
      totalUsuarios: usuarios.length,
      totalMembros: membros.length,
      usuarios,
      membros
    };
  });

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-primary-blue p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-black tracking-tighter uppercase">Árvore Genealógica dos Militantes</h2>
          <p className="text-blue-200 font-medium max-w-xl mt-2 text-sm">
            Visualização hierárquica do Cuanza Sul. Cada militante está vinculado ao usuário (Secretário) que realizou o seu registo.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 opacity-5 rounded-full -mr-20 -mt-20 blur-3xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsPorMunicipio.map((item) => (
          <div
            key={item.nome}
            className={`
              bg-white rounded-[2.5rem] border transition-all duration-500 overflow-hidden
              ${municipioAberto === item.nome ? 'lg:col-span-3 border-yellow-400 shadow-2xl shadow-yellow-100' : 'border-slate-100 hover:border-blue-400'}
            `}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-blue-900">
                  <MapPinIcon className="w-6 h-6" />
                </div>
                <div className="flex space-x-2">
                  <div className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                    {item.totalUsuarios} Secretários
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase">{item.nome}</h3>
                <p className="text-xs font-bold text-slate-400">CUANZA SUL • ANGOLA</p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div className="flex -space-x-3">
                  {[...Array(Math.min(item.totalMembros, 4))].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                  ))}
                  {item.totalMembros > 4 && (
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-yellow-400 flex items-center justify-center text-[10px] font-black">
                      +{item.totalMembros - 4}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setMunicipioAberto(municipioAberto === item.nome ? null : item.nome)}
                  className={`
                      p-3 rounded-xl transition-all
                      ${municipioAberto === item.nome ? 'bg-slate-900 text-white rotate-180' : 'bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white'}
                    `}
                >
                  <ChevronDownIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {municipioAberto === item.nome && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-slate-50 bg-slate-50/50"
                >
                  <div className="p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      {/* Lado dos Secretários (Hierarchy) */}
                      <div className="space-y-6">
                        <div className="flex items-center space-x-2 text-[10px] font-black text-blue-900 uppercase tracking-widest">
                          <UsersIcon className="w-4 h-4" />
                          <span>Ramificações de Comando (Usuários)</span>
                        </div>

                        <div className="space-y-4">
                          {item.usuarios.length > 0 ? item.usuarios.map(u => (
                            <div key={u.id} className="relative pl-8">
                              <div className="absolute left-0 top-1/2 w-6 h-0.5 bg-slate-200" />
                              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm group hover:border-yellow-400 transition-all">
                                  <div className="flex items-center justify-between">
                                     <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-900 flex items-center justify-center text-white font-black text-xs">
                                           {u.nome.charAt(0)}
                                        </div>
                                        <div>
                                           <p className="text-sm font-black text-slate-900">{u.nome}</p>
                                           <p className="text-[10px] font-bold text-yellow-600 uppercase tracking-widest">{u.hierarquia}</p>
                                        </div>
                                     </div>
                                     <div className="flex items-center space-x-4">
                                        <div className="text-right">
                                           <p className="text-[8px] font-black text-slate-400 uppercase tracking-tight">Registos Directos</p>
                                           <p className="text-xs font-black text-blue-900">
                                             {militantesMock.filter(m => m.registradoPor === u.id).length} Membros
                                           </p>
                                        </div>
                                        <button 
                                          onClick={() => setVisualizarGrafico(visualizarGrafico === u.id ? null : u.id)}
                                          className={`p-2 rounded-lg transition-all ${visualizarGrafico === u.id ? 'bg-yellow-400 text-blue-900 shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-900'}`}
                                          title="Visualizar Gráfico de Ramificação"
                                        >
                                           <ShareIcon className="w-5 h-5" />
                                        </button>
                                     </div>
                                  </div>

                                  {visualizarGrafico === u.id && (
                                    <motion.div 
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      className="mt-6 pt-6 border-t border-slate-100 overflow-hidden"
                                    >
                                       <div className="flex items-center justify-between mb-4">
                                          <p className="text-[10px] font-black text-blue-900 uppercase tracking-[0.2em]">Fluxograma de Filiados - Garfo de Perfis</p>
                                          <button onClick={() => setVisualizarGrafico(null)} className="text-[9px] font-black text-red-500 uppercase">Fechar Gráfico</button>
                                       </div>
                                       <div className="bg-slate-50 rounded-[2rem] border border-slate-200">
                                          <GraficoGenealogico 
                                            principal={u} 
                                            dependentes={militantesMock.filter(m => m.registradoPor === u.id)} 
                                          />
                                       </div>
                                    </motion.div>
                                  )}
                              </div>
                            </div>
                          )) : (
                            <p className="text-xs text-slate-400 italic">Nenhum secretário municipal registado neste município.</p>
                          )}
                          <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black text-slate-300 hover:border-blue-400 hover:text-blue-400 transition-all flex items-center justify-center space-x-2">
                            <PlusIcon className="w-4 h-4" />
                            <span>ADICIONAR NOVO COMANDO</span>
                          </button>
                        </div>
                      </div>

                      {/* Lado dos Membros (End nodes) */}
                      <div className="space-y-6">
                        <div className="flex items-center space-x-2 text-[10px] font-black text-green-600 uppercase tracking-widest">
                          <IdentificationIcon className="w-4 h-4" />
                          <span>Membros Filiados (Genealogia Base)</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {item.membros.length > 0 ? item.membros.map(m => (
                            <Link
                              key={m.id}
                              href={`/portal/membros/perfil?id=${m.id}`}
                              className="bg-white p-4 rounded-2xl border border-slate-100 hover:bg-slate-900 hover:text-white transition-all transition-colors group shadow-sm"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100">
                                  {m.foto ? <img src={m.foto} className="w-full h-full object-cover" /> : <UserCircleIcon className="w-full h-full text-slate-300" />}
                                </div>
                                <div className="min-w-0">
                                  <p className="text-[11px] font-black truncate">{m.nome}</p>
                                  <p className="text-[9px] font-bold text-slate-400 group-hover:text-blue-200 tracking-tighter">ID: PL-{m.id.toString().padStart(4, '0')}</p>
                                </div>
                              </div>
                            </Link>
                          )) : (
                            <div className="col-span-2 text-center py-10 bg-white/50 rounded-2xl border-2 border-dashed border-slate-100">
                              <p className="text-xs text-slate-400 font-bold uppercase">Sem militantes registados</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
