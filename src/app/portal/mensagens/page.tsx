'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PaperAirplaneIcon,
  UserCircleIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  ChatBubbleBottomCenterTextIcon,
  UsersIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import { usePortal } from '@/context/PortalContext';
import { toast } from 'react-hot-toast';
import { MUNICIPIOS_CUANZA_SUL } from '@/data/geoData';

export default function MensagensPortalPage() {
  const { membros } = usePortal();
  const [destinatarioTipo, setDestinatarioTipo] = useState<'individual' | 'municipio' | 'provincia' | 'pais'>('municipio');
  const [destinatario, setDestinatario] = useState<string>('');
  const [assunto, setAssunto] = useState<string>('');
  const [mensagem, setMensagem] = useState<string>('');
  const [enviando, setEnviando] = useState<boolean>(false);

  const handleEnviarMensagem = () => {
    if (!destinatario || !assunto || !mensagem) {
      toast.error('Por favor preencha todos os campos obrigatórios.');
      return;
    }

    setEnviando(true);

    // Simulação de protocolo de rede seguro do PL
    setTimeout(() => {
      setEnviando(false);
      toast.success(`Mensagem disparada com sucesso para os destinatários selecionados!`, {
        icon: '🚀',
        style: { borderRadius: '15px', background: '#0f172a', color: '#fff' }
      });
      setAssunto('');
      setMensagem('');
      setDestinatario('');
    }, 2000);
  };

  const getFilteredMembros = () => {
    if (destinatarioTipo === 'municipio') {
      return membros.filter(m => m.municipio === destinatario);
    } else if (destinatarioTipo === 'provincia') {
      return membros; // Todos no Cuanza Sul nesta versão
    } else if (destinatarioTipo === 'individual') {
      return membros.filter(m => m.id.toString() === destinatario);
    }
    return membros;
  };

  const alvoResults = getFilteredMembros();
  const count = destinatarioTipo === 'individual' ? 1 : alvoResults.length;

  return (
    <div className="space-y-10 pb-20">
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex justify-between items-center bg-gradient-to-r from-white to-slate-50">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Centro de Comunicação</h1>
          <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">Disparo Digital de Mensagens em Massa • PL</p>
        </div>
        <div className="flex -space-x-3">
          {membros.slice(0, 5).map((m, i) => (
            <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
              <img src={m.foto || `https://ui-avatars.com/api/?name=${m.nome}`} className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="w-12 h-12 rounded-full border-4 border-white bg-slate-900 flex items-center justify-center text-[10px] font-black text-white shadow-lg">+{membros.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="relative z-10 space-y-8">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block">1. Definir Alcance da Mensagem</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: 'municipio', label: 'Por Município', icon: MapPinIcon },
                  { id: 'provincia', label: 'Provincial', icon: BuildingOfficeIcon },

                  { id: 'individual', label: 'Membro Único', icon: UserCircleIcon },
                ].map((tipo) => (
                  <button
                    key={tipo.id}
                    onClick={() => { setDestinatarioTipo(tipo.id as any); setDestinatario(''); }}
                    className={`flex flex-col items-center justify-center p-6 rounded-[2rem] border-2 transition-all group ${destinatarioTipo === tipo.id ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-inner' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200 hover:bg-white'
                      }`}
                  >
                    <tipo.icon className={`h-8 w-8 mb-3 transition-transform ${destinatarioTipo === tipo.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{tipo.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">2. Selecionar Destino Específico</label>
                {destinatarioTipo === 'individual' ? (
                  <select value={destinatario} onChange={(e) => setDestinatario(e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl p-5 text-sm font-black text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all shadow-inner">
                    <option value="">Pesquisar Militante...</option>
                    {membros.map(m => <option key={m.id} value={m.id}>{m.nome} ({m.bi})</option>)}
                  </select>
                ) : destinatarioTipo === 'municipio' ? (
                  <select value={destinatario} onChange={(e) => setDestinatario(e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl p-5 text-sm font-black text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all shadow-inner">
                    <option value="">Escolher Município...</option>
                    {MUNICIPIOS_CUANZA_SUL.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                ) : (
                  <div className="p-5 bg-blue-900 rounded-2xl text-white font-black text-sm uppercase tracking-widest flex items-center justify-center">
                    {destinatarioTipo === 'provincia' ? 'Cuanza Sul (Todos)' : 'Angola (Sede Nacional)'}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">3. Assunto da Notificação</label>
                <input value={assunto} onChange={e => setAssunto(e.target.value)} type="text" placeholder="Ex: Convocação Assembleia..." className="w-full bg-slate-50 border-none rounded-2xl p-5 text-sm font-black text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all shadow-inner" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">4. Conteúdo da Mensagem</label>
                <div className="flex flex-col items-end">
                   <span className={`text-[10px] font-black uppercase ${mensagem.length >= 100 ? 'text-red-500' : 'text-slate-400'}`}>
                      {mensagem.length} / 100
                   </span>
                </div>
              </div>
              <textarea 
                rows={6} 
                maxLength={100}
                value={mensagem} 
                onChange={e => setMensagem(e.target.value)} 
                placeholder="Escreva aqui a mensagem que será enviada para os telemóveis e painéis dos militantes..." 
                className="w-full bg-slate-50 border-none rounded-3xl p-6 text-sm font-black text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all shadow-inner resize-none" 
              />
              {mensagem.length >= 100 && <p className="text-[9px] font-black text-red-500 uppercase tracking-widest text-right mt-1 animate-pulse">Limite de caracteres atingido</p>}
            </div>

            <button
              onClick={handleEnviarMensagem}
              disabled={enviando}
              className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.3em] shadow-2xl transition-all flex items-center justify-center space-x-4 ${enviando ? 'bg-slate-100 text-slate-400' : 'bg-slate-900 text-yellow-400 hover:scale-[1.01] hover:bg-slate-800'}`}
            >
              {enviando ? (
                <>
                  <div className="w-5 h-5 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin"></div>
                  <span>Processando Linhas de Transmissão...</span>
                </>
              ) : (
                <>
                  <PaperAirplaneIcon className="w-6 h-6 -rotate-45" />
                  <span>Confirmar Disparo Tecnológico</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 text-center">
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-4">Métricas de Alvo</p>
              <div className="text-7xl font-black italic tracking-tighter mb-2 group-hover:scale-110 transition-transform">{count}</div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pessoas serão notificadas</p>
              <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10 text-left">
                <p className="text-[9px] font-black text-yellow-400 uppercase tracking-widest mb-2 flex items-center">
                  <BoltIcon className="w-3 h-3 mr-1" /> Status da Rede
                </p>
                <p className="text-[10px] font-bold text-blue-100">Fibra Óptica: Latência 12ms</p>
                <p className="text-[10px] font-bold text-blue-100">Cobertura: 98.4% Provincial</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tighter mb-6 border-b border-slate-50 pb-4 italic">Histórico de Transmissões</h3>
            <div className="space-y-4">
              {[
                { label: "Quotas Abril", data: "Hoje, 09:45", status: "100%", color: "text-green-500" },
                { label: "Mobilização Sumbe", data: "Ontem, 14:20", status: "92%", color: "text-blue-500" },
                { label: "Circular Provincial", data: "24 Abr", status: "88%", color: "text-yellow-500" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer group">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <EnvelopeIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">{item.label}</p>
                      <p className="text-[8px] font-bold text-slate-400">{item.data}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-black ${item.color}`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
