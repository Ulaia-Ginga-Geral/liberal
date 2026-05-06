'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CalendarIcon, 
  MapPinIcon, 
  ClockIcon, 
  UserGroupIcon, 
  PlusIcon,
  XMarkIcon,
  CheckBadgeIcon,
  TrashIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { usePortal } from '@/context/PortalContext';

export default function AgendamentoPage() {
  const { missoes, addMissao, deleteMissao, updateMissao } = usePortal();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    titulo: '',
    data: '',
    hora: '',
    local: '',
    responsavel: 'Secretariado Provincial'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titulo || !formData.data || !formData.hora) {
      toast.error('Preencha os campos essenciais!');
      return;
    }

    if (editingId) {
      updateMissao(editingId, formData);
      toast.success('Agendamento atualizado!');
      setEditingId(null);
    } else {
      addMissao(formData);
      toast.success('Evento agendado com sucesso!', {
        icon: '📅',
        style: { borderRadius: '15px', background: '#0f172a', color: '#fff' }
      });
    }

    setShowModal(false);
    setFormData({ titulo: '', data: '', hora: '', local: '', responsavel: 'Secretariado Provincial' });
  };

  const handleEdit = (event: any) => {
    setFormData({
      titulo: event.titulo,
      data: event.data,
      hora: event.hora,
      local: event.local,
      responsavel: event.responsavel
    });
    setEditingId(event.id);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Deseja realmente remover este agendamento?')) {
      deleteMissao(id);
      toast.success('Evento removido.');
    }
  };

  const [viewDate, setViewDate] = useState(new Date());

  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
  
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const missionDays = missoes
    .filter(m => {
      const [year, month] = m.data.split('-').map(Number);
      return month === (viewDate.getMonth() + 1) && year === viewDate.getFullYear();
    })
    .map(m => parseInt(m.data.split('-')[2]));

  const nextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1));
  const prevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1));

  return (
    <div className="space-y-10 pb-20">
      <div className="flex justify-between items-center bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
        <div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Agenda de Missões</h1>
           <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">Calendário Estratégico • PL Cuanza Sul</p>
        </div>
        <button 
          onClick={() => {
            setEditingId(null);
            setFormData({ titulo: '', data: '', hora: '', local: '', responsavel: 'Secretariado Provincial' });
            setShowModal(true);
          }}
          className="p-5 bg-slate-900 text-yellow-400 rounded-2xl shadow-xl hover:scale-110 transition-all active:scale-95"
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
               <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                     <h3 className="text-xl font-black italic uppercase tracking-tighter">{monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}</h3>
                     <div className="flex space-x-2">
                        <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                           <CalendarIcon className="w-4 h-4 rotate-90" />
                        </button>
                        <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                           <CalendarIcon className="w-4 h-4 -rotate-90" />
                        </button>
                     </div>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center">
                     {['D','S','T','Q','Q','S','S'].map(d => <span key={d} className="text-[10px] font-black text-slate-500">{d}</span>)}
                     
                     {/* Espaços vazios para o primeiro dia da semana */}
                     {Array.from({length: firstDayOfMonth}).map((_, i) => (
                        <div key={`empty-${i}`} className="h-10" />
                     ))}

                     {Array.from({length: daysInMonth}).map((_, i) => {
                        const day = i + 1;
                        const hasMission = missionDays.includes(day);
                        const isToday = new Date().toDateString() === new Date(viewDate.getFullYear(), viewDate.getMonth(), day).toDateString();
                        
                        return (
                          <div 
                            key={i} 
                            className={`h-10 w-full flex flex-col items-center justify-center rounded-xl text-xs font-black transition-all cursor-pointer relative ${
                              hasMission 
                                ? 'bg-yellow-400 text-slate-900 shadow-lg shadow-yellow-400/20 scale-110 z-10' 
                                : isToday 
                                   ? 'bg-white/20 text-white border border-white/30'
                                   : 'hover:bg-white/10'
                            }`}
                          >
                             {day}
                             {isToday && !hasMission && <div className="absolute -bottom-1 w-1 h-1 bg-yellow-400 rounded-full" />}
                          </div>
                        );
                     })}
                  </div>
               </div>
            </div>
            
            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Status do Cronograma</h4>
               <div className="space-y-3">
                  <div className="flex items-center justify-between">
                     <span className="text-xs font-bold text-slate-500">Missions Ativas</span>
                     <span className="text-xs font-black text-slate-900">{missoes.length}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                     <div className="bg-blue-600 h-full w-[65%] rounded-full shadow-sm"></div>
                  </div>
               </div>
            </div>
         </div>

         <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-8 uppercase italic border-b border-slate-50 pb-4">Próximos Eventos</h3>
            <div className="space-y-6">
               {missoes.length === 0 ? (
                  <div className="py-20 text-center space-y-4">
                     <CalendarIcon className="w-12 h-12 text-slate-200 mx-auto" />
                     <p className="text-slate-400 font-black uppercase text-xs tracking-widest">Nenhuma missão agendada</p>
                  </div>
               ) : (
                  missoes.map((event) => (
                     <motion.div 
                       key={event.id}
                       layout
                       transition={{ duration: 0.3 }}
                       className="flex items-center justify-between p-6 bg-slate-50 rounded-[2.5rem] group hover:bg-slate-950 transition-all duration-300"
                     >
                        <div className="flex items-center space-x-6">
                           <div className="w-16 h-16 bg-white rounded-2xl flex flex-col items-center justify-center shadow-sm group-hover:bg-slate-800 transition-colors">
                              <span className="text-[10px] font-black text-slate-400 group-hover:text-blue-400 uppercase tracking-tighter">
                                 {event.data?.split('-')[1] || '05'}
                              </span>
                              <span className="text-2xl font-black text-slate-900 group-hover:text-white leading-none">
                                 {event.data?.split('-')[2] || '??'}
                              </span>
                           </div>
                           <div>
                              <h4 className="text-lg font-black text-slate-900 group-hover:text-white uppercase tracking-tighter italic">{event.titulo}</h4>
                              <div className="flex flex-wrap items-center gap-4 mt-2">
                                 <span className="flex items-center text-[10px] font-bold text-slate-400 group-hover:text-slate-500 uppercase">
                                    <ClockIcon className="w-3.5 h-3.5 mr-1" /> {event.hora}
                                 </span>
                                 <span className="flex items-center text-[10px] font-bold text-slate-400 group-hover:text-slate-500 uppercase">
                                    <MapPinIcon className="w-3.5 h-3.5 mr-1" /> {event.local}
                                 </span>
                                 <span className="flex items-center text-[10px] font-black text-blue-600 group-hover:text-yellow-400 uppercase">
                                    <UserGroupIcon className="w-3.5 h-3.5 mr-1" /> {event.responsavel}
                                 </span>
                              </div>
                           </div>
                        </div>
                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button 
                             onClick={() => handleEdit(event)}
                             className="p-3 bg-white/10 text-white rounded-xl hover:bg-blue-600 transition-all"
                           >
                              <PencilSquareIcon className="w-5 h-5" />
                           </button>
                           <button 
                             onClick={() => handleDelete(event.id)}
                             className="p-3 bg-white/10 text-white rounded-xl hover:bg-red-600 transition-all"
                           >
                              <TrashIcon className="w-5 h-5" />
                           </button>
                        </div>
                     </motion.div>
                  ))
               )}
            </div>
         </div>
      </div>

      {/* Modal de Agendamento */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-8 right-8 p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <XMarkIcon className="w-6 h-6 text-slate-400" />
              </button>

              <div className="p-12 space-y-8">
                <div>
                   <h3 className="text-2xl font-black text-slate-900 italic uppercase tracking-tighter">
                      {editingId ? 'Editar Agendamento' : 'Novo Agendamento Oficial'}
                   </h3>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Sincronização com Secretariado Provincial</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Título do Evento/Missão</label>
                    <input 
                      required
                      type="text" 
                      value={formData.titulo}
                      onChange={e => setFormData({...formData, titulo: e.target.value})}
                      className="w-full bg-slate-50 border-none rounded-2xl p-5 text-sm font-black text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-slate-900 transition-all shadow-inner" 
                      placeholder="Ex: Cerimónia de Inauguração..." 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Data</label>
                      <input 
                        required
                        type="date" 
                        value={formData.data}
                        onChange={e => setFormData({...formData, data: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-2xl p-5 text-sm font-black text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-slate-900 transition-all shadow-inner" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Hora</label>
                      <input 
                        required
                        type="time" 
                        value={formData.hora}
                        onChange={e => setFormData({...formData, hora: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-2xl p-5 text-sm font-black text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-slate-900 transition-all shadow-inner" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Localização</label>
                    <input 
                      required
                      type="text" 
                      value={formData.local}
                      onChange={e => setFormData({...formData, local: e.target.value})}
                      className="w-full bg-slate-50 border-none rounded-2xl p-5 text-sm font-black text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-slate-900 transition-all shadow-inner" 
                      placeholder="Cidade, Bairro ou Instituição"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-6 bg-slate-900 text-yellow-400 rounded-3xl font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center space-x-3"
                  >
                    <CheckBadgeIcon className="w-6 h-6" />
                    <span>{editingId ? 'Salvar Alterações' : 'Confirmar Agendamento'}</span>
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

