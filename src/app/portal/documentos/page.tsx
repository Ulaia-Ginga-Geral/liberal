'use client';

import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PrinterIcon, 
  CreditCardIcon, 
  DocumentTextIcon,
  UserGroupIcon,
  ChevronDownIcon,
  IdentificationIcon
} from '@heroicons/react/24/outline';
import { militantesMock } from '@/data/portalMock';
import MemberCard from '@/components/portal/MemberCard';
import PrintPreview from '@/components/portal/PrintPreview';
import { useSearchParams } from 'next/navigation';

function PortalDocumentosContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'guias';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [membroSelecionadoId, setMembroSelecionadoId] = useState('');

  const [showPreview, setShowPreview] = useState(false);
  const [previewType, setPreviewType] = useState<'cartao' | 'guia'>('guia');

  const membroSelecionado = militantesMock.find(m => m.id.toString() === membroSelecionadoId);

  const handlePrint = (type: 'cartao' | 'guia') => {
    if (!membroSelecionado) return;
    setPreviewType(type);
    setShowPreview(true);
  };

  return (
    <div className="space-y-8">
      {/* Abas Internas */}
      <div className="flex space-x-6 border-b border-slate-200">
        {[
          { id: 'guias', label: 'Documentos & Guias', icon: DocumentTextIcon },
          { id: 'cartao', label: 'Cartão de Militante', icon: CreditCardIcon },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 px-2 text-sm font-bold transition-all flex items-center space-x-2 border-b-2 ${activeTab === tab.id
                ? 'border-yellow-500 text-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Coluna de Seleção */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100">
              <div className="flex items-center space-x-3 mb-6">
                 <div className="p-2.5 bg-yellow-400 text-slate-900 rounded-xl shadow-lg shadow-yellow-500/20">
                    <UserGroupIcon className="w-5 h-5" />
                 </div>
                 <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter">Gestão de Portador</h3>
              </div>
              
              <div className="space-y-6">
                <div className="relative group">
                   <select 
                     value={membroSelecionadoId}
                     onChange={(e) => setMembroSelecionadoId(e.target.value)}
                     className="w-full bg-slate-50 border-2 border-transparent rounded-[1.5rem] p-5 pr-12 text-sm font-black text-black focus:bg-white focus:border-yellow-400 transition-all outline-none appearance-none cursor-pointer"
                   >
                     <option value="">Escolha um Militante...</option>
                     {militantesMock.map(m => (
                       <option key={m.id} value={m.id}>{m.nome} ({m.bi})</option>
                     ))}
                   </select>
                   <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-slate-900 transition-colors">
                      <ChevronDownIcon className="w-5 h-5" />
                   </div>
                </div>
                
                {membroSelecionado && (
                   <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 bg-slate-900 rounded-[2rem] border border-slate-800 shadow-2xl relative overflow-hidden"
                   >
                      <div className="relative z-10">
                         <p className="text-[9px] font-black text-yellow-400 uppercase tracking-widest mb-2">Membro Autenticado</p>
                         <h4 className="text-white font-black text-base uppercase tracking-tight italic">{membroSelecionado.nome}</h4>
                         <div className="flex items-center mt-3 space-x-4">
                            <div className="flex items-center text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                               <IdentificationIcon className="w-4 h-4 mr-1 text-slate-500" />
                               {membroSelecionado.bi}
                            </div>
                            <div className="px-2 py-1 bg-white/10 rounded-md text-[8px] font-black text-blue-300 uppercase">
                               {membroSelecionado.municipio}
                            </div>
                         </div>
                      </div>
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10" />
                   </motion.div>
                )}
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl shadow-xl shadow-slate-200">
              <h3 className="text-xs font-black text-yellow-400 uppercase mb-4">Ações Rápidas</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white text-xs font-bold transition-all">
                  <span>Imprimir Tudo</span>
                  <PrinterIcon className="w-4 h-4 text-slate-500" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white text-xs font-bold transition-all">
                  <span>Exportar Lote PDF</span>
                  <DocumentTextIcon className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Coluna de Visualização */}
          <div className="lg:col-span-8 flex items-center justify-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 p-12 min-h-[500px]">
            {activeTab === 'cartao' && (
              <div className="space-y-12 flex flex-col items-center">
                {membroSelecionado ? (
                  <>
                    <MemberCard member={{
                      nome: membroSelecionado.nome,
                      bi: membroSelecionado.bi,
                      provincia: membroSelecionado.provincia,
                      idMilitante: `PL-${membroSelecionado.id.toString().padStart(4, '0')}`,
                      hierarquia: 'Militante Activo',
                      foto: membroSelecionado.foto
                    }} />
                    <button
                      onClick={() => handlePrint('cartao')}
                      className="flex items-center space-x-2 bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-300"
                    >
                      <PrinterIcon className="w-5 h-5 text-yellow-400" />
                      <span>IMPRIMIR CARTÃO PVC</span>
                    </button>
                  </>
                ) : (
                  <div className="text-center space-y-4">
                    <CreditCardIcon className="w-16 h-16 text-slate-200 mx-auto" />
                    <p className="text-slate-400 font-bold">Seleccione um militante para gerar o cartão</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'guias' && (
              <div className="w-full max-w-2xl">
                {membroSelecionado ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-12 shadow-2xl rounded-sm border border-slate-100 relative"
                  >
                    <div className="flex flex-col items-center mb-10">
                      <div className="w-16 h-12 bg-blue-900 flex items-center justify-center rounded-sm border border-yellow-400 overflow-hidden relative mb-4">
                         <img src="/partidoliberarbandeira.jpg" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                      </div>
                      <div className="font-black text-xl text-slate-900 tracking-tighter uppercase italic">Partido Liberal</div>
                    </div>

                    <div className="flex justify-end items-start mb-8">
                      <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Documento nº</p>
                        <p className="text-xs font-mono font-bold">GM-2024-00{membroSelecionado.id}</p>
                      </div>
                    </div>

                    <h1 className="text-center text-slate-950 font-black text-3xl mb-12 underline decoration-yellow-400 decoration-4 underline-offset-8 uppercase">Guia de Marcha</h1>

                    <div className="space-y-6 text-slate-700 leading-relaxed text-justify">
                      <p>Para os devidos efeitos de direito e sob as normas do estatuto interno do <strong>PARTIDO LIBERAL</strong>, atesta-se que o cidadão(ã) infra-mencionado encontra-se em missão de serviço partidário.</p>
                      <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-3">
                        <p className="text-xs"><strong>NOME:</strong> {membroSelecionado.nome}</p>
                        <p className="text-xs"><strong>BILHETE DE IDENTIDADE:</strong> {membroSelecionado.bi}</p>
                        <p className="text-xs"><strong>ID MILITANTE:</strong> PL-{membroSelecionado.id.toString().padStart(4, '0')}</p>
                        <div className="border-t border-slate-200 mt-2 pt-2 space-y-2">
                           <p className="text-xs"><strong>DESTINO:</strong> Luanda / Benguela</p>
                           <p className="text-xs"><strong>PERÍODO DE TRABALHO:</strong> {new Date().toLocaleDateString('pt-AO')} À {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-AO')}</p>
                        </div>
                      </div>
                      <p>Solicita-se a todas as autoridades civis e militares a máxima colaboração para com o portador desta guia no desempenho das suas funções, válida a partir de hoje, <strong>{new Date().toLocaleDateString('pt-AO', { day: '2-digit', month: 'long', year: 'numeric' })}</strong>.</p>
                    </div>

                    <div className="mt-24 flex justify-center flex-col items-center">
                      <div className="w-48 border-b-2 border-slate-900 mb-2" />
                      <p className="text-[10px] font-black text-slate-900 uppercase">A Direcção Nacional</p>
                    </div>

                    <div className="absolute -bottom-16 left-0 right-0 flex justify-center">
                      <button
                        onClick={() => handlePrint('guia')}
                        className="bg-yellow-400 text-slate-900 px-6 py-2 rounded-xl font-black text-xs hover:bg-yellow-500 shadow-lg"
                      >
                        IMPRIMIR GUIA OFICIAL
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center space-y-4">
                    <DocumentTextIcon className="w-16 h-16 text-slate-200 mx-auto" />
                    <p className="text-slate-400 font-bold">Seleccione um militante para gerar a guia</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {showPreview && (
        <PrintPreview
          type={previewType}
          data={membroSelecionado}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}

export default function PortalDocumentos() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <PortalDocumentosContent />
    </Suspense>
  );
}
