'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortal } from '@/context/PortalContext';
import {
  ClipboardDocumentListIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarIcon,
  MapPinIcon,
  TrashIcon,
  PencilSquareIcon,
  TagIcon,
  CheckBadgeIcon,
  PhotoIcon,
  XMarkIcon,
  ArrowPathIcon,
  EyeIcon,
  CameraIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

export default function InventarioPage() {
  const { inventario, addItemInventario, updateItemInventario, deleteItemInventario, alterarEstadoInventario } = usePortal();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  
  const [editingItem, setEditingItem] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [formData, setFormData] = useState({
    nome: '',
    categoria: 'TI & Informática',
    estado: 'Bom',
    localizacao: '',
    dataAquisicao: new Date().toISOString().split('T')[0],
    origem: '',
    foto: '',
    observacoes: ''
  });

  const [statusData, setStatusData] = useState({
    novoEstado: 'Danificado',
    foto: '',
    causa: ''
  });

  const categories = ["TI & Informática", "Mobiliário", "Eletrodomésticos", "Material de Escritório", "Equipamento de Som/Luz", "Outros"];
  const statuses = ["Novo", "Bom", "Regular", "Danificado"];

  const filteredItems = inventario.filter(item => {
    const matchSearch = item.nome.toLowerCase().includes(search.toLowerCase()) || 
                        item.localizacao.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filterCategory === '' || item.categoria === filterCategory;
    const matchStatus = filterStatus === '' || item.estado === filterStatus;
    const matchDate = (!startDate || item.dataAquisicao >= startDate) && 
                      (!endDate || item.dataAquisicao <= endDate);
    return matchSearch && matchCategory && matchStatus && matchDate;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateItemInventario(editingItem.id, formData as any);
      toast.success('Item atualizado com sucesso!');
    } else {
      addItemInventario(formData as any);
      toast.success('Item adicionado ao inventário!');
    }
    closeModal();
  };

  const handleStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      alterarEstadoInventario(selectedItem.id, statusData.novoEstado as any, statusData.foto, statusData.causa);
      toast.success('Estado do material atualizado!');
      setIsStatusModalOpen(false);
      setSelectedItem(null);
    }
  };

  const openModal = (item: any = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        nome: item.nome,
        categoria: item.categoria,
        estado: item.estado,
        localizacao: item.localizacao,
        dataAquisicao: item.dataAquisicao,
        origem: item.origem,
        foto: item.foto || '',
        observacoes: item.observacoes || ''
      });
    } else {
      setEditingItem(null);
      setFormData({
        nome: '',
        categoria: categories[0],
        estado: 'Bom',
        localizacao: '',
        dataAquisicao: new Date().toISOString().split('T')[0],
        origem: '',
        foto: '',
        observacoes: ''
      });
    }
    setIsModalOpen(true);
  };

  const openStatusModal = (item: any) => {
    setSelectedItem(item);
    setStatusData({
      novoEstado: 'Danificado',
      foto: '',
      causa: ''
    });
    setIsStatusModalOpen(true);
  };

  const openGallery = (item: any) => {
    setSelectedItem(item);
    setIsGalleryModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'main' | 'status') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (target === 'main') {
          setFormData({ ...formData, foto: base64String });
        } else {
          setStatusData({ ...statusData, foto: base64String });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Deseja realmente excluir este item do inventário?')) {
      deleteItemInventario(id);
      toast.success('Item removido.');
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header Section */}
      <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-2">
            <div className="p-3 bg-yellow-400 rounded-2xl shadow-lg shadow-yellow-400/20">
              <ClipboardDocumentListIcon className="w-8 h-8 text-slate-900" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">Inventário de Ativos</h1>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2 italic">Gestão de Materiais e Património • Partido Liberal</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => openModal()}
          className="relative z-10 bg-yellow-400 text-slate-900 px-8 py-4 rounded-[2rem] text-xs font-black uppercase tracking-widest flex items-center shadow-xl shadow-yellow-400/10 hover:scale-105 active:scale-95 transition-all"
        >
          <PlusIcon className="w-5 h-5 mr-3" />
          Registrar Novo Material
        </button>

        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -mr-40 -mt-40" />
      </div>

      {/* Filters Section */}
      <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-4 w-5 h-5 text-slate-300" />
            <input
              type="text"
              placeholder="Pesquisar material ou local..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 rounded-2xl p-4 pl-12 text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-50 text-slate-900 rounded-2xl px-6 py-4 text-[10px] font-black uppercase tracking-widest border border-slate-100 outline-none focus:ring-2 focus:ring-blue-600 transition-all cursor-pointer appearance-none"
          >
            <option value="">Todas as Categorias</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-50 text-slate-900 rounded-2xl px-6 py-4 text-[10px] font-black uppercase tracking-widest border border-slate-100 outline-none focus:ring-2 focus:ring-blue-600 transition-all cursor-pointer appearance-none"
          >
            <option value="">Todos os Estados</option>
            {statuses.map(st => <option key={st} value={st}>{st}</option>)}
          </select>

          <div className="flex items-center space-x-2 bg-slate-50 rounded-2xl px-4 border border-slate-100">
            <CalendarIcon className="w-4 h-4 text-slate-300" />
            <input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent py-3 text-[10px] font-black text-slate-700 outline-none w-full"
            />
            <span className="text-slate-300 font-black">→</span>
            <input 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent py-3 text-[10px] font-black text-slate-700 outline-none w-full"
            />
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all group overflow-hidden flex flex-col"
            >
              {/* Photo Header */}
              <div className="relative h-48 bg-slate-100 overflow-hidden group/photo">
                {item.foto ? (
                  <img src={item.foto} alt={item.nome} className="w-full h-full object-cover transition-transform duration-500 group-hover/photo:scale-110" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                    <PhotoIcon className="w-12 h-12 mb-2" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Sem Foto</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-end p-6">
                  <button 
                    onClick={() => openGallery(item)}
                    className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/30 transition-all flex items-center"
                  >
                    <EyeIcon className="w-4 h-4 mr-2" /> Ver Galeria
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1">
                <div className="flex justify-between items-start">
                  <div className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                    item.estado === 'Novo' ? 'bg-green-100 text-green-600' :
                    item.estado === 'Bom' ? 'bg-blue-100 text-blue-600' :
                    item.estado === 'Regular' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {item.estado}
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => openStatusModal(item)}
                      title="Alterar Estado"
                      className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-yellow-50 hover:text-yellow-600 transition-all"
                    >
                      <ArrowPathIcon className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => openModal(item)}
                      className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">{item.nome}</h3>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">{item.categoria}</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-50">
                  <div className="flex items-center text-xs font-bold text-slate-500">
                    <MapPinIcon className="w-4 h-4 mr-2 text-slate-300" />
                    {item.localizacao}
                  </div>
                  <div className="flex items-center text-xs font-bold text-slate-500">
                    <CalendarIcon className="w-4 h-4 mr-2 text-slate-300" />
                    Adquirido: {new Date(item.dataAquisicao).toLocaleDateString('pt-PT')}
                  </div>
                </div>

                {item.historicoEstado && item.historicoEstado.length > 0 && (
                  <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-100">
                    <div className="flex items-center space-x-2 mb-1">
                      <ExclamationTriangleIcon className="w-3 h-3 text-yellow-600" />
                      <span className="text-[9px] font-black text-yellow-600 uppercase tracking-widest">Última Alteração</span>
                    </div>
                    <p className="text-[10px] text-yellow-800 font-bold italic line-clamp-1">"{item.historicoEstado[0].causa}"</p>
                  </div>
                )}
              </div>
              
              <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Origem: {item.origem}</span>
                <div className="flex -space-x-2">
                  {item.historicoEstado?.slice(0, 3).map((h: any, i: number) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                      <img src={h.foto} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {item.historicoEstado && item.historicoEstado.length > 3 && (
                    <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-[8px] font-black text-white">
                      +{item.historicoEstado.length - 3}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          {filteredItems.length === 0 && (
            <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
              <ClipboardDocumentListIcon className="w-12 h-12 text-slate-100 mx-auto mb-4" />
              <p className="text-slate-300 font-black uppercase text-sm tracking-widest">Nenhum item encontrado no inventário.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Registration/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-900 text-white">
                <div>
                  <h2 className="text-2xl font-black tracking-tighter uppercase italic">{editingItem ? 'Editar Material' : 'Novo Registro'}</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Preencha os dados do ativo</p>
                </div>
                <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-xl transition-colors"><XMarkIcon className="w-6 h-6" /></button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Photo Input */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Foto do Material</label>
                    <div className="flex items-center space-x-6 bg-slate-50 p-6 rounded-[2rem] border-2 border-dashed border-slate-200 hover:border-yellow-400 transition-all cursor-pointer relative overflow-hidden group">
                      <div className="w-24 h-24 rounded-2xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden shrink-0 shadow-sm relative z-10">
                        {formData.foto ? (
                          <img src={formData.foto} className="w-full h-full object-cover" />
                        ) : (
                          <CameraIcon className="w-8 h-8 text-slate-200" />
                        )}
                      </div>
                      <div className="flex-1 relative z-10">
                        <p className="text-sm font-black text-slate-900 uppercase italic leading-none">Carregar do Dispositivo</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Clique para selecionar uma foto</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoUpload(e, 'main')}
                        className="absolute inset-0 opacity-0 cursor-pointer z-20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Nome do Material</label>
                    <input required type="text" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} placeholder="Ex: Computador Dell XPS" className="w-full bg-slate-50 rounded-2xl p-4 text-sm font-bold text-black border border-transparent focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Categoria</label>
                    <select value={formData.categoria} onChange={(e) => setFormData({...formData, categoria: e.target.value})} className="w-full bg-slate-50 rounded-2xl p-4 text-sm font-bold text-black border border-transparent focus:bg-white focus:ring-2 focus:ring-yellow-400 outline-none transition-all appearance-none">
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Estado Inicial</label>
                    <select value={formData.estado} onChange={(e) => setFormData({...formData, estado: e.target.value as any})} className="w-full bg-slate-50 rounded-2xl p-4 text-sm font-bold text-black border border-transparent focus:bg-white focus:ring-2 focus:ring-yellow-400 outline-none transition-all appearance-none">
                      {statuses.map(st => <option key={st} value={st}>{st}</option>)}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Data de Aquisição</label>
                    <input required type="date" value={formData.dataAquisicao} onChange={(e) => setFormData({...formData, dataAquisicao: e.target.value})} className="w-full bg-slate-50 rounded-2xl p-4 text-sm font-bold text-black border border-transparent focus:bg-white focus:ring-2 focus:ring-yellow-400 outline-none transition-all" />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Localização</label>
                    <input required type="text" value={formData.localizacao} onChange={(e) => setFormData({...formData, localizacao: e.target.value})} placeholder="Ex: Sede Provincial - Sala de TI" className="w-full bg-slate-50 rounded-2xl p-4 text-sm font-bold text-black border border-transparent focus:bg-white focus:ring-2 focus:ring-yellow-400 outline-none transition-all" />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Origem / Fornecedor</label>
                    <input required type="text" value={formData.origem} onChange={(e) => setFormData({...formData, origem: e.target.value})} placeholder="Ex: Doação Direção Nacional" className="w-full bg-slate-50 rounded-2xl p-4 text-sm font-bold text-black border border-transparent focus:bg-white focus:ring-2 focus:ring-yellow-400 outline-none transition-all" />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Observações Adicionais</label>
                    <textarea value={formData.observacoes} onChange={(e) => setFormData({...formData, observacoes: e.target.value})} placeholder="Detalhes técnicos..." rows={3} className="w-full bg-slate-50 rounded-2xl p-4 text-sm font-bold text-black border border-transparent focus:bg-white focus:ring-2 focus:ring-yellow-400 outline-none transition-all resize-none" />
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50 flex space-x-4">
                  <button type="button" onClick={closeModal} className="flex-1 py-4 bg-slate-100 text-slate-400 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Cancelar</button>
                  <button type="submit" className="flex-[2] py-4 bg-slate-900 text-yellow-400 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-200 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    {editingItem ? 'Salvar Alterações' : 'Concluir Registro'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Change Status Modal */}
      <AnimatePresence>
        {isStatusModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsStatusModalOpen(false)} className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-yellow-400 text-slate-900">
                <div>
                  <h2 className="text-2xl font-black tracking-tighter uppercase italic">Atualizar Estado</h2>
                  <p className="text-[10px] font-bold text-slate-900/60 uppercase tracking-widest">Registrar mudança de condição</p>
                </div>
                <button onClick={() => setIsStatusModalOpen(false)} className="p-2 hover:bg-black/5 rounded-xl transition-colors"><XMarkIcon className="w-6 h-6" /></button>
              </div>

              <form onSubmit={handleStatusSubmit} className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Novo Estado</label>
                    <select value={statusData.novoEstado} onChange={(e) => setStatusData({...statusData, novoEstado: e.target.value})} className="w-full bg-slate-50 rounded-2xl p-4 text-sm font-bold text-black border border-transparent focus:bg-white focus:ring-2 focus:ring-yellow-400 outline-none transition-all appearance-none">
                      {statuses.map(st => <option key={st} value={st}>{st}</option>)}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Foto da Nova Condição</label>
                    <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-yellow-400 transition-all cursor-pointer relative overflow-hidden">
                      <div className="w-16 h-16 rounded-xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                        {statusData.foto ? (
                          <img src={statusData.foto} className="w-full h-full object-cover" />
                        ) : (
                          <CameraIcon className="w-6 h-6 text-slate-200" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-black text-slate-900 uppercase italic">Escolher Foto</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Do dispositivo</p>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*"
                        required={!statusData.foto}
                        onChange={(e) => handlePhotoUpload(e, 'status')}
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Causa / Motivo da Mudança</label>
                    <textarea required value={statusData.causa} onChange={(e) => setStatusData({...statusData, causa: e.target.value})} placeholder="Descreva o que aconteceu..." rows={3} className="w-full bg-slate-50 rounded-2xl p-4 text-sm font-bold text-black border border-transparent focus:bg-white focus:ring-2 focus:ring-yellow-400 outline-none transition-all resize-none" />
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50 flex space-x-4">
                  <button type="button" onClick={() => setIsStatusModalOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-400 rounded-2xl text-xs font-black uppercase tracking-widest">Cancelar</button>
                  <button type="submit" className="flex-[2] py-4 bg-slate-900 text-yellow-400 rounded-2xl text-xs font-black uppercase tracking-widest">Atualizar Estado</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Photo Gallery Modal */}
      <AnimatePresence>
        {isGalleryModalOpen && selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsGalleryModalOpen(false)} className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-900 text-white shrink-0">
                <div>
                  <h2 className="text-2xl font-black tracking-tighter uppercase italic">Galeria de Condição</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedItem.nome} • Histórico Visual</p>
                </div>
                <button onClick={() => setIsGalleryModalOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors"><XMarkIcon className="w-6 h-6" /></button>
              </div>

              <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Original Photo */}
                  <div className="space-y-3">
                    <div className="aspect-square rounded-3xl bg-slate-100 overflow-hidden border-4 border-slate-50 shadow-lg">
                      <img src={selectedItem.foto} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Foto Atual / Registro</p>
                      <p className="text-[9px] text-slate-400 font-bold">{new Date(selectedItem.dataAquisicao).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* History Photos */}
                  {selectedItem.historicoEstado?.map((h: any, i: number) => (
                    <div key={i} className="space-y-3">
                      <div className="aspect-square rounded-3xl bg-slate-100 overflow-hidden border-4 border-slate-50 shadow-lg relative group">
                        <img src={h.foto} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center">
                           <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest mb-2">Causa da Mudança</span>
                           <p className="text-[10px] text-white font-bold italic">"{h.causa}"</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">{h.novoEstado}</p>
                        <p className="text-[9px] text-slate-400 font-bold">{new Date(h.data).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
