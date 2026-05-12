'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { militantesMock, MUNICIPIOS_CUANZA_SUL } from '@/data/portalMock';
import { 
  UsersIcon, 
  MagnifyingGlassIcon, 
  FunnelIcon,
  ChevronRightIcon,
  ArrowDownTrayIcon,
  UserPlusIcon,
  IdentificationIcon,
  MapPinIcon,
  XMarkIcon,
  DocumentArrowDownIcon,
  PrinterIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePortal } from '@/context/PortalContext';
import { toast } from 'react-hot-toast';

export default function ListaMembros() {
  const { membros } = usePortal();
  const [busca, setBusca] = useState('');
  const [filtroMunicipio, setFiltroMunicipio] = useState('Todas');
  const [idadeMin, setIdadeMin] = useState('');
  const [idadeMax, setIdadeMax] = useState('');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const calcularIdade = (data: string) => {
    if (!data) return 0;
    const birth = new Date(data);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const municipios = ['Todas', ...MUNICIPIOS_CUANZA_SUL];

  const membrosFiltrados = membros.filter(m => {
    const matchBusca = 
      m.nome.toLowerCase().includes(busca.toLowerCase()) || 
      m.bi.toLowerCase().includes(busca.toLowerCase()) ||
      (m.profissao && m.profissao.toLowerCase().includes(busca.toLowerCase()));
    
    const matchMun = filtroMunicipio === 'Todas' || m.municipio === filtroMunicipio || (filtroMunicipio === 'Sumbe' && !m.municipio);
    
    // Filtro de Idade
    const idade = m.dataNascimento ? calcularIdade(m.dataNascimento) : 0;
    const matchIdade = (!idadeMin || idade >= parseInt(idadeMin)) && 
                       (!idadeMax || idade <= parseInt(idadeMax));

    return matchBusca && matchMun && matchIdade;
  });

  return (
    <div className="space-y-8 pb-20">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Membros do Cuanza Sul</h3>
           <p className="text-sm text-slate-400 font-bold uppercase tracking-[0.2em] mt-1 italic">Escritório Provincial • Gestão de Base</p>
        </div>
        <div className="flex space-x-3 w-full md:w-auto">
            <button 
              onClick={() => setIsExportModalOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-center px-8 py-4 bg-white border-2 border-slate-100 text-slate-900 rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:border-yellow-400 transition-all shadow-sm"
            >
              <ArrowDownTrayIcon className="w-5 h-5 mr-3 text-slate-400" />
              Exportar Base
            </button>
           <Link 
            href="/portal/cadastro?tab=militantes"
            className="flex-1 md:flex-none flex items-center justify-center px-8 py-4 bg-yellow-400 text-slate-950 rounded-[2rem] text-[10px] font-black uppercase tracking-widest shadow-xl shadow-yellow-500/20 hover:bg-yellow-500 transition-all active:scale-95"
           >
              <UserPlusIcon className="w-5 h-5 mr-3" />
              Novo Registro
           </Link>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[3.5rem] shadow-sm border border-slate-100 transition-all hover:shadow-xl hover:shadow-slate-200/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            {/* Busca Principal */}
            <div className="lg:col-span-6 space-y-3">
               <div className="flex items-center space-x-2 ml-4">
                  <MagnifyingGlassIcon className="w-4 h-4 text-slate-400" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pesquisa Inteligente</span>
               </div>
               <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="Nome, B.I ou Cargo/Profissão..." 
                    className="w-full bg-slate-50 border-2 border-transparent rounded-[2rem] p-5 pl-8 text-sm font-black text-slate-900 focus:bg-white focus:border-yellow-400 transition-all outline-none placeholder:text-slate-300 placeholder:italic"
                    onChange={(e) => setBusca(e.target.value)}
                  />
               </div>
            </div>

            {/* Filtro Município */}
            <div className="lg:col-span-3 space-y-3">
               <div className="flex items-center space-x-2 ml-4">
                  <MapPinIcon className="w-4 h-4 text-yellow-500" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Município</span>
               </div>
               <select 
                  value={filtroMunicipio}
                  onChange={(e) => setFiltroMunicipio(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-transparent rounded-[2rem] p-5 px-8 text-sm font-black text-slate-900 focus:bg-white focus:border-yellow-400 transition-all outline-none cursor-pointer appearance-none"
               >
                  {municipios.map(m => (
                     <option key={m} value={m}>{m === 'Todas' ? 'Todos os Municípios' : m}</option>
                  ))}
               </select>
            </div>

            <div className="lg:col-span-3 space-y-3">
               <div className="flex items-center space-x-2 ml-4">
                  <IdentificationIcon className="w-4 h-4 text-blue-500" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Intervalo de Idade</span>
               </div>
               <div className="flex items-center space-x-2 bg-slate-50 border-2 border-transparent rounded-[2rem] p-2 px-4 focus-within:bg-white focus-within:border-blue-500 transition-all">
                  <input 
                    type="number" 
                    placeholder="Min" 
                    value={idadeMin}
                    onChange={(e) => setIdadeMin(e.target.value)}
                    className="w-full bg-transparent p-3 text-sm font-black text-slate-900 outline-none placeholder:text-slate-300"
                  />
                  <span className="text-slate-300 font-black">→</span>
                  <input 
                    type="number" 
                    placeholder="Max" 
                    value={idadeMax}
                    onChange={(e) => setIdadeMax(e.target.value)}
                    className="w-full bg-transparent p-3 text-sm font-black text-slate-900 outline-none placeholder:text-slate-300"
                  />
               </div>
            </div>

          </div>
      </div>

      {/* Grid de Militantes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         <AnimatePresence>
            {membrosFiltrados.map((membro, i) => (
              <motion.div
                key={membro.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white group p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200 transition-all relative overflow-hidden"
              >
                 <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-50 flex items-center justify-center font-black text-slate-300 text-xl overflow-hidden relative group-hover:bg-slate-900 transition-colors">
                       {membro.foto ? (
                          <img src={membro.foto} alt={membro.nome} className="w-full h-full object-cover" />
                       ) : (
                          <IdentificationIcon className="w-8 h-8" />
                       )}
                    </div>
                    <div>
                       <h4 className="text-lg font-black text-slate-900 tracking-tighter truncate max-w-[150px] uppercase">{membro.nome}</h4>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{membro.provincia}</p>
                    </div>
                 </div>

                 <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                       <span className="text-slate-400 uppercase tracking-widest">ID Militante</span>
                       <span className="text-slate-900 font-mono">PL-{membro.id.toString().padStart(4, '0')}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold">
                       <span className="text-slate-400 uppercase tracking-widest">Número BI</span>
                       <span className="text-slate-900 font-mono">{membro.bi}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold">
                       <span className="text-slate-400 uppercase tracking-widest">Status</span>
                       <span className={`px-2 py-0.5 rounded-full ${membro.activo ? 'text-green-500 bg-green-50' : 'text-red-500 bg-red-50'}`}>
                          {membro.activo ? 'ACTIVO' : 'PENDENTE'}
                       </span>
                    </div>
                 </div>

                 <Link 
                  href={`/portal/membros/perfil?id=${membro.id}`}
                  className="w-full flex items-center justify-center py-4 bg-slate-50 group-hover:bg-slate-950 group-hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                 >
                    Ver Perfil Completo
                    <ChevronRightIcon className="w-4 h-4 ml-2" />
                 </Link>
              </motion.div>
            ))}
         </AnimatePresence>
      </div>

      {membrosFiltrados.length === 0 && (
         <div className="py-20 text-center">
            <UsersIcon className="w-16 h-16 text-slate-100 mx-auto mb-4" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Nenhum militante encontrado para esta busca.</p>
         </div>
      )}

      {/* Export Modal */}
      <AnimatePresence>
        {isExportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsExportModalOpen(false)} 
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }} 
              className="relative bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-900 text-white shrink-0">
                <div>
                  <h2 className="text-2xl font-black tracking-tighter uppercase italic">Exportar Base de Dados</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {membrosFiltrados.length} Membros Encontrados • {filtroMunicipio === 'Todas' ? 'Toda a Província' : filtroMunicipio}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => {
                      // Simular Download PDF
                      toast.success('Gerando PDF da lista...');
                      window.print();
                    }}
                    className="flex items-center px-6 py-3 bg-yellow-400 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-yellow-500 transition-all shadow-xl shadow-yellow-500/10"
                  >
                    <PrinterIcon className="w-4 h-4 mr-2" /> Baixar PDF
                  </button>
                  <button onClick={() => setIsExportModalOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-8 overflow-y-auto custom-scrollbar flex-1 bg-slate-50">
                <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-white">
                        <th className="p-5 text-[10px] font-black uppercase tracking-widest border-b border-slate-800">ID</th>
                        <th className="p-5 text-[10px] font-black uppercase tracking-widest border-b border-slate-800">Nome Completo</th>
                        <th className="p-5 text-[10px] font-black uppercase tracking-widest border-b border-slate-800">B.I</th>
                        <th className="p-5 text-[10px] font-black uppercase tracking-widest border-b border-slate-800">Município</th>
                        <th className="p-5 text-[10px] font-black uppercase tracking-widest border-b border-slate-800">Idade</th>
                        <th className="p-5 text-[10px] font-black uppercase tracking-widest border-b border-slate-800">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {membrosFiltrados.map((m) => (
                        <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-5 text-[10px] font-black text-slate-400 font-mono">PL-{m.id.toString().padStart(4, '0')}</td>
                          <td className="p-5 text-xs font-bold text-slate-900 uppercase">{m.nome}</td>
                          <td className="p-5 text-xs font-bold text-slate-500 font-mono">{m.bi}</td>
                          <td className="p-5 text-xs font-bold text-slate-500">{m.municipio || 'Sumbe'}</td>
                          <td className="p-5 text-xs font-bold text-slate-500">{m.dataNascimento ? calcularIdade(m.dataNascimento) : 'N/A'}</td>
                          <td className="p-5">
                            <span className={`text-[9px] font-black uppercase tracking-tighter px-2 py-1 rounded-lg ${m.activo ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                              {m.activo ? 'Ativo' : 'Pendente'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="p-6 bg-white border-t border-slate-100 flex justify-center">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Documento Oficial • Partido Liberal • {new Date().toLocaleDateString()}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
