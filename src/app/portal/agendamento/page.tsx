'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  agendamentosMock,
  notificacoesSmsMock,
  MUNICIPIOS_CUANZA_SUL,
  viaturasMock,
  militantesMock
} from '@/data/portalMock';
import {
  CalendarIcon,
  ChatBubbleBottomCenterTextIcon,
  PaperAirplaneIcon,
  MapPinIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ClockIcon,
  SignalIcon,
  UsersIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  VideoCameraIcon,
  CheckBadgeIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const PROVINCIA_SEDE = 'Cuanza-Sul';

export default function PortalAgendamento() {
  const [activeTab, setActiveTab] = useState('agenda');
  const [destinatarioTipo, setDestinatarioTipo] = useState('todos');
  const [searchMembro, setSearchMembro] = useState('');
  const [selectedMembro, setSelectedMembro] = useState<any>(null);
  const [mensagemTexto, setMensagemTexto] = useState('');

  // Mock de reuniões para o CRUD
  const [reunioes, setReunioes] = useState([
    { id: 1, titulo: 'Concelho Provincial - Sumbe', data: '2026-05-10', hora: '10:00', status: 'Agendada', tipo: 'Presencial', local: 'Sede Provincial' },
    { id: 2, titulo: 'Alinhamento Mobilização Quibala', data: '2026-04-20', hora: '14:30', status: 'Realizada', tipo: 'Concluída', local: 'Comité Municipal' },
    { id: 3, titulo: 'Workshop Capacitação Digital', data: '2026-05-15', hora: '09:00', status: 'Agendada', tipo: 'Híbrida', local: 'Centro Tecnológico' },
  ]);

  return (
    <div className="space-y-10 pb-20">
      {/* Header Estilizado */}
      <div className="bg-primary-blue p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl font-black tracking-tighter uppercase italic">Operações & Actividades</h2>
          <p className="text-blue-200 font-bold uppercase text-[10px] tracking-widest mt-2 italic">Planeamento Estratégico, Reuniões e Comunicação de Base • Cuanza Sul</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl -mr-20 -mt-20" />
      </div>

      {/* Abas Premium */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="bg-white p-2 rounded-[2rem] shadow-sm border border-slate-100 flex flex-wrap gap-2">
          {[
            { id: 'agenda', label: 'Agenda de Viagens', icon: CalendarIcon },
            { id: 'reunioes', label: 'Reuniões & Actividades', icon: VideoCameraIcon },
            { id: 'mensagens', label: 'Centro de Mensagens', icon: ChatBubbleBottomCenterTextIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center px-8 py-4 rounded-[1.5rem] text-xs font-black transition-all
                ${activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xl'
                  : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
                }
              `}
            >
              <tab.icon className="w-5 h-5 mr-3" />
              <span className="uppercase tracking-widest">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4 bg-yellow-400/10 px-6 py-3 rounded-2xl border border-yellow-400/20">
          <SignalIcon className="w-5 h-5 text-yellow-600 animate-pulse" />
          <p className="text-[10px] font-black text-yellow-700 uppercase tracking-widest">Gateway SMS Activo: 98% Crédito</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          className="space-y-10"
        >
          {activeTab === 'agenda' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Form de Agendamento */}
              <div className="lg:col-span-12 xl:col-span-5">
                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 sticky top-10">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="p-3 bg-blue-50 text-blue-900 rounded-2xl">
                      <MapPinIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Novo Itinerário</h3>
                  </div>

                  <form className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Título da Missão / Viagem</label>
                      <input type="text" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-black text-black focus:bg-white focus:border-yellow-400 transition-all outline-none" placeholder="Ex: Reunião de Núcleo em Quibala" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Data Partida</label>
                        <input type="datetime-local" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-black text-black focus:bg-white focus:border-yellow-400 transition-all outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Viatura / Meio</label>
                        <select className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-black text-black focus:bg-white focus:border-yellow-400 transition-all outline-none appearance-none">
                          <optgroup label="Frota Oficial PL">
                            {viaturasMock.map(v => (
                              <option key={v.id} value={v.id}>{v.modelo} ({v.matricula})</option>
                            ))}
                          </optgroup>
                          <optgroup label="Outros">
                            <option>Transporte Aéreo</option>
                            <option>Aluguer / Externo</option>
                          </optgroup>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Município de Destino</label>
                      <select className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-black text-black focus:bg-white focus:border-yellow-400 transition-all outline-none appearance-none font-bold">
                        {MUNICIPIOS_CUANZA_SUL.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>

                    <button className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest hover:bg-black transition-all shadow-2xl flex items-center justify-center space-x-3">
                      <CheckCircleIcon className="w-5 h-5 text-yellow-400" />
                      <span>Agendar Missão</span>
                    </button>
                  </form>
                </div>
              </div>

              {/* Listagem de Atividades */}
              <div className="lg:col-span-12 xl:col-span-7 space-y-6">
                <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase px-2 flex items-center">
                  <ClockIcon className="w-6 h-6 mr-3 text-slate-400" />
                  Cronograma de Operações
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {agendamentosMock.map((agenda, idx) => (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={agenda.id}
                      className="bg-white p-6 rounded-[2.5rem] border border-slate-100 flex items-center group hover:bg-slate-50 transition-all"
                    >
                      <div className="bg-slate-900 text-white p-5 rounded-[1.5rem] text-center min-w-[80px] shadow-lg shadow-slate-200">
                        <span className="block text-[8px] font-black uppercase text-blue-300 mb-1">{new Date(agenda.data).toLocaleDateString('pt-PT', { month: 'short' })}</span>
                        <span className="block text-2xl font-black italic">{new Date(agenda.data).getDate()}</span>
                      </div>
                      <div className="ml-8 flex-1">
                        <h4 className="text-lg font-black text-slate-900 uppercase tracking-tighter italic">{agenda.titulo}</h4>
                        <div className="flex items-center mt-2 space-x-4">
                          <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <MapPinIcon className="w-4 h-4 mr-1 text-yellow-500" />
                            {agenda.local}
                          </div>
                          <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <ClockIcon className="w-4 h-4 mr-1 text-slate-300" />
                            {new Date(agenda.data).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                      <div className="px-6 py-2 bg-yellow-400 text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest italic group-hover:scale-105 transition-all">
                        {agenda.tipo}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mensagens' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Painel de Disparo */}
              <div className="lg:col-span-12 xl:col-span-6 bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">Central de Disparo</h3>
                  <ChatBubbleBottomCenterTextIcon className="w-8 h-8 text-blue-900" />
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Raio de Influência (Alvo)</label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => setDestinatarioTipo('todos')}
                        className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${destinatarioTipo === 'todos' ? 'border-primary-blue bg-blue-50 text-primary-blue' : 'border-slate-100 text-slate-400 hover:border-blue-200'}`}
                      >
                        <GlobeAltIcon className="w-6 h-6 mb-2" />
                        <span className="text-[9px] font-black uppercase">Todos (K. Sul)</span>
                      </button>
                      <button
                        onClick={() => setDestinatarioTipo('municipio')}
                        className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${destinatarioTipo === 'municipio' ? 'border-primary-blue bg-blue-50 text-primary-blue' : 'border-slate-100 text-slate-400 hover:border-blue-200'}`}
                      >
                        <MapPinIcon className="w-6 h-6 mb-2" />
                        <span className="text-[9px] font-black uppercase">Por Município</span>
                      </button>
                      <button
                        onClick={() => setDestinatarioTipo('individual')}
                        className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${destinatarioTipo === 'individual' ? 'border-primary-blue bg-blue-50 text-primary-blue' : 'border-slate-100 text-slate-400 hover:border-blue-200'}`}
                      >
                        <UsersIcon className="w-6 h-6 mb-2" />
                        <span className="text-[9px] font-black uppercase">Individual</span>
                      </button>
                    </div>
                  </div>

                  {destinatarioTipo === 'municipio' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2 overflow-hidden">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Seleccionar Município Alvo</label>
                      <select className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-black text-black focus:bg-white focus:border-yellow-400 transition-all outline-none">
                        {MUNICIPIOS_CUANZA_SUL.map(m => <option key={m}>{m}</option>)}
                      </select>
                    </motion.div>
                  )}

                  {destinatarioTipo === 'individual' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4 overflow-hidden">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pesquisar Militante (Nome ou BI)</label>
                        <div className="relative group">
                          <input
                            type="text"
                            placeholder="Digite o nome ou número do militante..."
                            className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 pl-12 text-sm font-black text-black focus:bg-white focus:border-yellow-400 transition-all outline-none"
                            onChange={(e) => setSearchMembro(e.target.value)}
                            value={searchMembro}
                          />
                          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-yellow-500 transition-colors" />
                        </div>
                      </div>

                      {searchMembro.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="max-h-[200px] overflow-y-auto bg-white border border-slate-100 rounded-2xl shadow-xl custom-scrollbar p-2 space-y-1"
                        >
                          {militantesMock
                            .filter(m => m.nome.toLowerCase().includes(searchMembro.toLowerCase()) || m.bi.toLowerCase().includes(searchMembro.toLowerCase()))
                            .map(m => (
                              <button
                                key={m.id}
                                onClick={() => {
                                  setSelectedMembro(m);
                                  setSearchMembro(m.nome);
                                }}
                                className="w-full text-left p-4 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100 group"
                              >
                                <p className="text-xs font-black text-slate-900 uppercase">{m.nome}</p>
                                <p className="text-[10px] font-bold text-slate-400 font-mono mt-1 group-hover:text-yellow-600 uppercase">{m.bi} • {m.municipio}</p>
                              </button>
                            ))}
                          {militantesMock.filter(m => m.nome.toLowerCase().includes(searchMembro.toLowerCase()) || m.bi.toLowerCase().includes(searchMembro.toLowerCase())).length === 0 && (
                            <p className="p-4 text-[10px] font-black text-slate-400 uppercase text-center italic">Nenhum militante encontrado</p>
                          )}
                        </motion.div>
                      )}

                      {selectedMembro && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between"
                        >
                          <div>
                            <p className="text-[9px] font-black text-yellow-400 uppercase">Destinatário Seleccionado</p>
                            <p className="text-white text-xs font-black uppercase">{selectedMembro.nome}</p>
                          </div>
                          <button onClick={() => { setSelectedMembro(null); setSearchMembro(''); }} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all">
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Corpo da Mensagem (SMS / Notificação)</label>
                    <textarea
                      rows={6}
                      maxLength={100}
                      value={mensagemTexto}
                      onChange={(e) => setMensagemTexto(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-transparent rounded-[2rem] p-6 text-sm font-black text-black focus:bg-white focus:border-yellow-400 transition-all outline-none resize-none"
                      placeholder="Digite aqui o comunicado oficial do Secretariado..."
                    />
                    <div className="flex items-center justify-between px-2">
                      <span className={`text-[9px] font-bold uppercase ${mensagemTexto.length >= 100 ? 'text-red-500 animate-pulse' : 'text-slate-400'}`}>
                         Caracteres: {mensagemTexto.length} / 100
                      </span>
                      <span className="text-[9px] font-bold text-yellow-600 uppercase">Custo Est: 1 Crédito por membro</span>
                    </div>
                  </div>

                  <button className="w-full py-6 bg-yellow-400 text-slate-900 rounded-[2.5rem] font-black uppercase tracking-widest hover:bg-yellow-500 transition-all shadow-xl shadow-yellow-500/10 flex items-center justify-center space-x-4 active:scale-95">
                    <PaperAirplaneIcon className="w-6 h-6 -rotate-45" />
                    <span className="text-sm">Disparar Comunicado</span>
                  </button>
                </div>
              </div>

              {/* Histórico e Métricas */}
              <div className="lg:col-span-12 xl:col-span-6 space-y-6">
                <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
                  <h4 className="text-xs font-black text-yellow-400 uppercase tracking-[0.2em] mb-6">Métricas de Engajamento</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                      <UserGroupIcon className="w-6 h-6 text-blue-300 mb-2" />
                      <p className="text-2xl font-black">12.5k</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Alcance Total</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                      <SignalIcon className="w-6 h-6 text-green-400 mb-2" />
                      <p className="text-2xl font-black">98.2%</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Taxa de Entrega</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[3.5rem] shadow-sm border border-slate-100 flex-1">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Últimos Envios</h4>
                  <div className="space-y-4">
                    {notificacoesSmsMock.map((notificacao) => (
                      <div key={notificacao.id} className="p-4 border-b border-slate-50 last:border-0 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-black text-slate-900 uppercase tracking-tight truncate max-w-[200px]">{notificacao.destinatario}</p>
                          <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{notificacao.dataEnviada}</p>
                        </div>
                        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[8px] font-black uppercase tracking-widest">
                          {notificacao.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'reunioes' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Form de Nova Reunião */}
              <div className="lg:col-span-12 xl:col-span-4">
                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 sticky top-10">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="p-3 bg-yellow-50 text-yellow-600 rounded-2xl">
                      <PlusIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Agendar Actividade</h3>
                  </div>

                  <form className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Título da Reunião</label>
                       <input type="text" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-black text-black focus:bg-white focus:border-yellow-400 transition-all outline-none" placeholder="Ex: Assembleia Municipal Sumbe" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Data</label>
                          <input type="date" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-black text-black focus:bg-white focus:border-yellow-400 transition-all outline-none" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Hora</label>
                          <input type="time" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-black text-black focus:bg-white focus:border-yellow-400 transition-all outline-none" />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Local / Plataforma</label>
                       <input type="text" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-sm font-black text-black focus:bg-white focus:border-yellow-400 transition-all outline-none" placeholder="Ex: Sede ou Google Meet" />
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                      <SignalIcon className="w-5 h-5 text-blue-600" />
                      <p className="text-[10px] font-bold text-blue-900 uppercase">Notificar participantes via SMS automaticamente</p>
                    </div>

                    <button className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95">
                      Confirmar Agendamento
                    </button>
                  </form>
                </div>
              </div>

              {/* Lista de Actividades */}
              <div className="lg:col-span-12 xl:col-span-8 space-y-8">
                 <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-10">
                       <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Cronograma de Actividades</h4>
                       <div className="flex space-x-2">
                          <span className="px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black uppercase">Filtro: Todos</span>
                       </div>
                    </div>

                    <div className="space-y-4">
                       {reunioes.map((reuniao) => (
                         <div key={reuniao.id} className="group p-6 rounded-[2.5rem] border-2 border-slate-50 hover:border-yellow-400 transition-all bg-white flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center space-x-6">
                               <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shrink-0 ${reuniao.status === 'Realizada' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                                  <VideoCameraIcon className="w-8 h-8" />
                               </div>
                               <div>
                                  <div className="flex items-center space-x-3">
                                     <h5 className="text-lg font-black text-slate-900 tracking-tight">{reuniao.titulo}</h5>
                                     <span className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                       reuniao.status === 'Realizada' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700 animate-pulse'
                                     }`}>
                                        {reuniao.status}
                                     </span>
                                  </div>
                                  <div className="flex flex-wrap gap-4 mt-2">
                                     <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase">
                                        <CalendarIcon className="w-4 h-4 mr-1.5" />
                                        {reuniao.data} às {reuniao.hora}
                                     </div>
                                     <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase">
                                        <MapPinIcon className="w-4 h-4 mr-1.5" />
                                        {reuniao.local}
                                     </div>
                                  </div>
                               </div>
                            </div>

                            <div className="flex items-center space-x-2">
                               <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-yellow-50 hover:text-yellow-600 transition-all">
                                  <PencilSquareIcon className="w-5 h-5" />
                               </button>
                               <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all">
                                  <TrashIcon className="w-5 h-5" />
                               </button>
                               <button className="px-6 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl opacity-0 group-hover:opacity-100 transition-all active:scale-95">
                                  Ver Acta
                               </button>
                            </div>
                         </div>
                       ))}
                    </div>

                    <div className="mt-12 p-8 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
                       <h6 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Sumário de Performance</h6>
                       <div className="grid grid-cols-3 gap-6">
                          <div>
                             <p className="text-xl font-black text-slate-900">12</p>
                             <p className="text-[9px] font-bold text-slate-500 uppercase">Este Mês</p>
                          </div>
                          <div>
                             <p className="text-xl font-black text-green-600">85%</p>
                             <p className="text-[9px] font-bold text-slate-500 uppercase">Presença Média</p>
                          </div>
                          <div>
                             <p className="text-xl font-black text-blue-600">04</p>
                             <p className="text-[9px] font-bold text-slate-500 uppercase">Pendentes</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
