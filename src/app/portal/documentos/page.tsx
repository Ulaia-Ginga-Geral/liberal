'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DocumentIcon, 
  FolderIcon, 
  ArrowDownTrayIcon, 
  MagnifyingGlassIcon, 
  CloudArrowUpIcon, 
  DocumentDuplicateIcon,
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { usePortal } from '@/context/PortalContext';
import PortalModal from '@/components/portal/PortalModal';

export default function DocumentosPage() {
  const { documentos, addDocumento, deleteDocumento } = usePortal();
  const [busca, setBusca] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [form, setForm] = useState({ nome: '', tipo: 'PDF', categoria: 'Estatutos e Leis' });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Auto-preencher o nome se estiver vazio
      if (!form.nome) {
        setForm({ 
          ...form, 
          nome: file.name.split('.')[0],
          tipo: file.name.split('.').pop()?.toUpperCase() || 'PDF'
        });
      }
    }
  };

  const handleDownload = (name: string) => {
    toast(`A descarregar: ${name}...`, {
      icon: '📥',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDocumento({
      ...form,
      data: new Date().toLocaleDateString('pt-AO'),
      size: selectedFile ? (selectedFile.size / (1024 * 1024)).toFixed(2) + " MB" : "0.1 MB"
    });
    setShowModal(false);
    setSelectedFile(null);
    setForm({ nome: '', tipo: 'PDF', categoria: 'Estatutos e Leis' });
    toast.success('Documento carregado no repositório!');
  };

  const documentosFiltrados = documentos.filter(doc => 
    doc.nome.toLowerCase().includes(busca.toLowerCase()) || 
    doc.tipo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
        <div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Repositório Digital</h1>
           <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">Documentação Oficial & Circulares Normativas</p>
        </div>
        <div className="flex space-x-3">
           <button 
            onClick={() => setShowModal(true)}
            className="flex items-center px-6 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-slate-900/10"
           >
              <CloudArrowUpIcon className="w-5 h-5 mr-3 text-yellow-400" />
              Upload Documento
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Pastas de Trabalho</h3>
            {[
              { label: 'Estatutos e Leis', color: 'bg-blue-600' },
              { label: 'Circulares Internas', color: 'bg-yellow-400 text-slate-900' },
              { label: 'Relatórios Financeiros', color: 'bg-green-600' },
              { label: 'Fotos de Comícios', color: 'bg-purple-600' },
            ].map(folder => (
               <div key={folder.label} className="p-6 bg-white rounded-[2rem] border border-slate-50 shadow-sm hover:scale-[1.02] transition-transform cursor-pointer flex items-center justify-between group">
                  <div className="flex items-center space-x-4">
                     <FolderIcon className="w-8 h-8 text-slate-300 group-hover:text-yellow-400" />
                     <div>
                        <p className="text-xs font-black text-slate-900 uppercase tracking-tighter">{folder.label}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase underline decoration-slate-100 italic">
                          {documentos.filter(d => d.categoria === folder.label).length} Ficheiros
                        </p>
                     </div>
                  </div>
                  <div className={`w-8 h-8 rounded-full ${folder.color} flex items-center justify-center text-[10px] font-black group-hover:scale-110 transition-transform`}>→</div>
               </div>
            ))}
         </div>

         <div className="lg:col-span-3 bg-white rounded-[3.5rem] border border-slate-100 shadow-sm p-10 min-h-[500px]">
            <div className="flex items-center justify-between mb-8">
               <div className="relative flex-1 max-w-md">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  <input 
                    type="text" 
                    placeholder="Pesquisar documentos..." 
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 pl-12 text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-slate-900 outline-none transition-all" 
                    onChange={(e) => setBusca(e.target.value)}
                  />
               </div>
               <DocumentDuplicateIcon className="w-8 h-8 text-slate-100 hidden md:block" />
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="border-b border-slate-50">
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic px-4">Documento</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Data</th>
                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Tamanho</th>
                        <th className="pb-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic pr-4">Ação</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     <AnimatePresence>
                        {documentosFiltrados.map((doc) => (
                           <motion.tr 
                            key={doc.id} 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="group hover:bg-slate-50/50 transition-colors"
                           >
                              <td className="py-6 px-4">
                                 <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                                       <DocumentIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                       <p className="text-sm font-black text-slate-900 tracking-tighter uppercase">{doc.nome}</p>
                                       <span className="text-[9px] font-black text-slate-400 px-2 py-0.5 bg-slate-200 rounded-full">{doc.tipo}</span>
                                    </div>
                                 </div>
                              </td>
                              <td className="py-6 text-[11px] font-bold text-slate-400 uppercase">{doc.data}</td>
                              <td className="py-6 text-[11px] font-bold text-slate-400 uppercase">{doc.size}</td>
                              <td className="py-6 text-right pr-4">
                                 <div className="flex items-center justify-end space-x-2">
                                    <button 
                                      onClick={() => handleDownload(doc.nome)}
                                      className="p-3 bg-slate-50 text-slate-900 rounded-xl hover:bg-slate-950 hover:text-white transition-all shadow-sm"
                                    >
                                       <ArrowDownTrayIcon className="w-5 h-5" />
                                    </button>
                                    <button 
                                      onClick={() => { if(confirm('Remover documento?')) deleteDocumento(doc.id); }}
                                      className="p-3 bg-slate-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                    >
                                       <TrashIcon className="w-5 h-5" />
                                    </button>
                                 </div>
                              </td>
                           </motion.tr>
                        ))}
                     </AnimatePresence>
                  </tbody>
               </table>
               {documentosFiltrados.length === 0 && (
                 <div className="py-20 text-center">
                    <DocumentIcon className="w-12 h-12 text-slate-100 mx-auto mb-4" />
                    <p className="text-slate-300 font-black uppercase text-[10px] tracking-widest">Nenhum documento encontrado no repositório.</p>
                 </div>
               )}
            </div>
         </div>
      </div>

      <PortalModal isOpen={showModal} onClose={() => setShowModal(false)} title="Upload de Documento Oficial">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
             <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] p-8 text-center group hover:border-yellow-400 transition-all relative overflow-hidden">
                <input 
                   type="file" 
                   onChange={handleFileChange}
                   className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <CloudArrowUpIcon className="w-12 h-12 text-slate-300 mx-auto mb-4 group-hover:text-yellow-500 group-hover:scale-110 transition-all" />
                <p className="text-xs font-black text-slate-900 uppercase tracking-widest">
                   {selectedFile ? selectedFile.name : 'Clique para selecionar do computador/telefone'}
                </p>
                <p className="text-[9px] font-bold text-slate-400 uppercase mt-2">Formatos aceites: PDF, DOCX, XLSX, JPG</p>
             </div>

             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome de Exibição no Portal</label>
                <input 
                  required
                  value={form.nome}
                  onChange={e => setForm({...form, nome: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-black text-slate-900 focus:bg-white focus:border-slate-900 transition-all outline-none" 
                  placeholder="Ex: Estatutos do Partido..."
                />
             </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tipo de Arquivo</label>
                <select 
                  value={form.tipo}
                  onChange={e => setForm({...form, tipo: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-black text-slate-900 outline-none"
                >
                  <option>PDF</option>
                  <option>DOCX</option>
                  <option>XLSX</option>
                  <option>JPG/PNG</option>
                </select>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pasta Destino</label>
                <select 
                  value={form.categoria}
                  onChange={e => setForm({...form, categoria: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-black text-slate-900 outline-none"
                >
                  <option>Estatutos e Leis</option>
                  <option>Circulares Internas</option>
                  <option>Relatórios Financeiros</option>
                  <option>Fotos de Comícios</option>
                </select>
             </div>
          </div>
          <button type="submit" className="w-full py-5 bg-slate-900 text-yellow-400 rounded-3xl font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">Registar no Sistema</button>
        </form>
      </PortalModal>
    </div>
  );
}

