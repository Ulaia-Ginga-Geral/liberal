'use client';

import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MemberCard from '@/components/portal/MemberCard';
import { useSearchParams, useRouter } from 'next/navigation';
import { usePortal } from '@/context/PortalContext';
import { 
  IdentificationIcon, 
  CreditCardIcon,
  ChevronLeftIcon,
  PrinterIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  MapPinIcon,
  DocumentArrowDownIcon,
  TrashIcon,
  PencilSquareIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import PrintPreview from '@/components/portal/PrintPreview';
import GlobalSearch from '@/components/portal/GlobalSearch';

function PerfilMembroContent() {
  const { deleteMembro, updateMembro, getMembro } = usePortal();
  const router = useRouter();
  const searchParams = useSearchParams();
  const idMembro = searchParams.get('id');
  
  const membro = getMembro(Number(idMembro));

  const [showPreview, setShowPreview] = useState(false);
  const [previewType, setPreviewType] = useState<'perfil' | 'cartao' | 'ficha'>('perfil');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [toast, setToast] = useState<{msg: string, type: 'success' | 'error'} | null>(null);

  if (!membro) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3.5rem] shadow-sm border border-slate-100">
        <GlobalSearch />
        <div className="text-center mt-12">
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Membro não encontrado</h2>
          <Link href="/portal/membros/lista" className="text-blue-900 font-bold mt-4 block hover:underline">Voltar à lista geral</Link>
        </div>
      </div>
    );
  }

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
     setToast({ msg, type });
     setTimeout(() => setToast(null), 3000);
  };

  const handlePrint = (type: 'perfil' | 'cartao' | 'ficha') => {
    setPreviewType(type);
    setShowPreview(true);
    showToast(`Preparando ${type === 'ficha' ? 'Ficha de Inscrição' : 'Documento'}...`);
  };

  const confirmDelete = () => {
    deleteMembro(membro.id);
    showToast("Membro eliminado com sucesso!", 'success');
    setTimeout(() => router.push('/portal/membros/lista'), 1000);
  };

  return (
    <div className="space-y-8 pb-20 relative">
      {/* Toast Animado */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className={`fixed bottom-10 left-1/2 z-[100] px-8 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 border-2 ${toast.type === 'success' ? 'bg-slate-900 border-green-500 text-white' : 'bg-red-900 border-red-500 text-white'}`}
          >
             <CheckCircleIcon className={`w-5 h-5 ${toast.type === 'success' ? 'text-green-500' : 'text-red-500'}`} />
             <span className="text-xs font-black uppercase tracking-widest">{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <Link 
          href="/portal/membros/lista"
          className="inline-flex items-center space-x-2 text-slate-400 hover:text-slate-900 font-bold transition-colors group"
        >
          <div className="p-2 rounded-xl bg-white border border-slate-100 group-hover:border-slate-900 transition-all shadow-sm">
             <ChevronLeftIcon className="w-5 h-5" />
          </div>
          <span className="uppercase text-[10px] tracking-widest">Voltar à Listagem</span>
        </Link>
        
        <GlobalSearch />
      </div>

      <div className="flex flex-wrap justify-end items-center gap-3 print:hidden">
           <button 
             onClick={() => handlePrint('ficha')}
             className="flex items-center bg-blue-100/50 text-blue-900 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-200 transition-all border border-blue-200"
           >
              <DocumentArrowDownIcon className="w-4 h-4 mr-2" />
              Visualizar Ficha
           </button>
           <button 
            onClick={() => setShowEditModal(true)}
            className="flex items-center bg-white border border-slate-200 text-slate-900 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
           >
              <PencilSquareIcon className="w-4 h-4 mr-2" />
              Editar Dados
           </button>
           <button 
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center bg-red-50 text-red-600 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-100 transition-all"
           >
              <TrashIcon className="w-4 h-4 mr-2" />
              Eliminar
           </button>
           <button 
            onClick={() => handlePrint('perfil')}
            className="flex items-center bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
           >
              <PrinterIcon className="w-4 h-4 mr-2 text-yellow-400" />
              Imprimir Relatório
           </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center">
             <div className="w-48 h-48 rounded-[2.5rem] bg-slate-100 border-4 border-white shadow-xl overflow-hidden mb-6 relative group">
                {membro.foto ? (
                   <img src={membro.foto} alt={membro.nome} className="w-full h-full object-cover" />
                ) : (
                   <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                      <IdentificationIcon className="w-24 h-24" />
                   </div>
                )}
             </div>
             
             <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">{membro.nome}</h3>
             <div className="flex flex-col items-center mt-2 space-y-2">
                <p className="text-[10px] font-black text-yellow-600 bg-yellow-100 px-4 py-1.5 rounded-full uppercase tracking-widest">Militância Efectivada</p>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Nº Registro: C-SUL/2026-{membro.id.toString().padStart(5, '0')}</p>
             </div>
             
             <div className="w-full mt-8 space-y-4">
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Informação Institucional</p>
                   <div className="space-y-3">
                      <div className="flex justify-between text-xs font-bold border-b border-slate-100 pb-2">
                         <span className="text-slate-500">BILHETE IDENTIDADE</span>
                         <span className="text-slate-900">{membro.bi}</span>
                      </div>
                      <div className="flex justify-between text-xs font-bold border-b border-slate-100 pb-2">
                         <span className="text-slate-500">MUNICÍPIO / SEDE</span>
                         <span className="text-slate-900">{membro.municipio || membro.provincia}</span>
                      </div>
                      <div className="flex justify-between text-xs font-bold">
                         <span className="text-slate-500">DATA ADMISSÃO</span>
                         <span className="text-slate-900">10 JAN 2026</span>
                      </div>
                   </div>
                </div>
             </div>

             <div className="w-full mt-4 bg-slate-950 p-6 rounded-[2.5rem] text-white">
                <div className="flex items-center space-x-3 mb-6">
                   <CreditCardIcon className="w-6 h-6 text-yellow-400" />
                   <h4 className="text-xs font-black uppercase tracking-widest">Cartão PVC</h4>
                </div>
                <div className="scale-75 origin-top -mt-2">
                   <MemberCard member={{
                     nome: membro.nome,
                     bi: membro.bi,
                     provincia: membro.provincia,
                     idMilitante: `C-SUL/2026-${membro.id.toString().padStart(5, '0')}`,
                     foto: membro.foto
                   }} />
                </div>
                <button 
                  onClick={() => handlePrint('cartao')}
                  className="w-full mt-4 py-3 bg-yellow-400 text-slate-950 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-yellow-500 transition-all print:hidden"
                >
                   Imprimir Cartão
                </button>
             </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Histórico Administrativo</h3>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cuanza Sul • Operacional</span>
              </div>
              <div className="space-y-4">
                 {[
                   { ref: 'Quota Abril 2026', val: '5.000 Kz', data: '15 Abr 2026', status: 'LIQUIDADO' },
                   { ref: 'Quota Março 2026', val: '5.000 Kz', data: '10 Mar 2026', status: 'LIQUIDADO' },
                   { ref: 'Taxa de Inscrição', val: '10.000 Kz', data: '10 Jan 2026', status: 'LIQUIDADO' },
                 ].map((q, i) => (
                   <motion.div 
                    whileHover={{ scale: 1.01 }}
                    key={i} 
                    className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-yellow-400 transition-all"
                   >
                      <div className="flex items-center space-x-4">
                         <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-blue-900 shadow-sm border border-slate-100">
                            <CreditCardIcon className="w-7 h-7" />
                         </div>
                         <div>
                            <p className="text-sm font-black text-slate-900 italic uppercase">{q.ref}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{q.data}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-sm font-black text-slate-900 italic">{q.val}</p>
                         <span className="text-[9px] font-black text-green-500 bg-green-50 px-3 py-1 rounded-full uppercase tracking-widest">CONCLUÍDO</span>
                      </div>
                   </motion.div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* MODAL DE ELIMINAÇÃO */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteModal(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-md p-10 rounded-[3rem] shadow-2xl border-4 border-red-100"
            >
               <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-red-100 text-red-600 rounded-[2rem] flex items-center justify-center mb-6">
                    <ExclamationTriangleIcon className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Atenção Crítica</h3>
                  <p className="text-slate-500 font-bold text-sm mt-4">Pretende mesmo eliminar <span className="text-slate-900 underline">{membro.nome}</span>? Esta acção é irreversível nos registos da província.</p>
                  
                  <div className="grid grid-cols-2 gap-4 w-full mt-10">
                    <button 
                      onClick={() => setShowDeleteModal(false)}
                      className="py-4 bg-slate-100 text-slate-900 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-200"
                    >
                       Cancelar
                    </button>
                    <button 
                      onClick={confirmDelete}
                      className="py-4 bg-red-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-700 shadow-xl shadow-red-200"
                    >
                       Sim, Eliminar
                    </button>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL DE EDIÇÃO (SIMPLIFICADO) */}
      <AnimatePresence>
        {showEditModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEditModal(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-2xl p-12 rounded-[4rem] shadow-2xl"
            >
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Actualizar Militante</h3>
                  <button onClick={() => setShowEditModal(false)} className="p-3 hover:bg-slate-50 rounded-2xl transition-all">
                    <XMarkIcon className="w-6 h-6 text-slate-400" />
                  </button>
               </div>
               
               <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome Completo</label>
                        <input defaultValue={membro.nome} type="text" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-black text-black focus:bg-white focus:border-yellow-400 outline-none" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nº do Bilhete</label>
                        <input defaultValue={membro.bi} type="text" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-black text-black focus:bg-white focus:border-yellow-400 outline-none" />
                     </div>
                  </div>
                  
                  <button 
                    type="button"
                    onClick={() => {
                        showToast("Dados actualizados com sucesso!");
                        setShowEditModal(false);
                    }}
                    className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest hover:bg-black mt-4 shadow-2xl"
                  >
                     Guardar Alterações
                  </button>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {showPreview && (
         <PrintPreview 
          type={previewType} 
          data={membro} 
          onClose={() => setShowPreview(false)} 
         />
      )}
    </div>
  );
}

export default function PerfilMembro() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <PerfilMembroContent />
    </Suspense>
  );
}
