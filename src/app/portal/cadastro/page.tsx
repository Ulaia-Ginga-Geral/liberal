'use client';

import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { usePortal } from '@/context/PortalContext';
import { toast } from 'react-hot-toast';
import { MUNICIPIOS_CUANZA_SUL, PROVINCIA_SEDE } from '@/data/geoData';
import EstruturaGenealogica from './genealogia';
import {
  UserPlusIcon,
  ListBulletIcon,
  SignalIcon,
  ShieldCheckIcon,
  PencilSquareIcon,
  TrashIcon,
  PaperAirplaneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

function PortalCadastroContent() {
  const { 
    addMembro, membros, updateMembro, deleteMembro,
    usuarios, addUsuario,
    nucleos, addNucleo,
    viaturas 
  } = usePortal();
  
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'usuarios';
  const [activeTab, setActiveTab] = useState(initialTab);

  // Sincronizar aba com a URL (necessário para navegação via Sidebar)
  const [lastTab, setLastTab] = useState(initialTab);
  const currentTab = searchParams.get('tab');

  if (currentTab && currentTab !== lastTab) {
    setActiveTab(currentTab);
    setLastTab(currentTab);
  }

  const [membroForm, setMembroForm] = useState({
    nome: '', pseudonimo: '', nomePai: '', nomeMae: '', naturalidade: '', dataNascimento: '',
    bi: '', localEmissao: '', validoAte: '', municipio: 'Sumbe', comuna: '', bairro: '', rua: '', nucleo: '',
    dataRegisto: '', tipo: 'Activo', sexo: 'Masculino' as 'Masculino' | 'Feminino', profissao: '', observacoes: '', assinaturaData: '', foto: ''
  });

  const [usuarioForm, setUsuarioForm] = useState({
    nome: '', hierarquia: 'Secretário Municipal', municipioOrigem: 'Sumbe',
  });

  const [msgForm, setMsgForm] = useState({
    destinatario: 'Todos os Militantes',
    corpo: ''
  });

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMembroForm({ ...membroForm, foto: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMembroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMembro(editingId, { ...membroForm, provincia: PROVINCIA_SEDE, activo: membroForm.tipo === 'Activo' });
      toast.success('Dados atualizados!');
      setEditingId(null);
    } else {
      addMembro({ ...membroForm, provincia: PROVINCIA_SEDE, activo: membroForm.tipo === 'Activo' });
      toast.success('Militante cadastrado!');
    }
    setMembroForm({ 
      nome: '', pseudonimo: '', nomePai: '', nomeMae: '', naturalidade: '', dataNascimento: '',
      bi: '', localEmissao: '', validoAte: '', municipio: 'Sumbe', comuna: '', bairro: '', rua: '', nucleo: '',
      dataRegisto: '', tipo: 'Activo', sexo: 'Masculino', profissao: '', observacoes: '', assinaturaData: '', foto: '' 
    });
  };

  const handleEditMembro = (m: any) => {
    setMembroForm({
      nome: m.nome, pseudonimo: m.pseudonimo || '', nomePai: m.nomePai || '', nomeMae: m.nomeMae || '', naturalidade: m.naturalidade || '',
      dataNascimento: m.dataNascimento || '', bi: m.bi, localEmissao: m.localEmissao || '', validoAte: m.validoAte || '',
      municipio: m.municipio, comuna: m.comuna || '', bairro: m.bairro || '', rua: m.rua || '', nucleo: m.nucleo || '',
      dataRegisto: m.dataRegisto || '', tipo: m.activo ? 'Activo' : 'Não Activo', sexo: m.sexo || 'Masculino',
      profissao: m.profissao || '', observacoes: m.observacoes || '', assinaturaData: m.assinaturaData || '', foto: m.foto || ''
    });
    setEditingId(m.id);
    setActiveTab('militantes');
    toast('Editando militante...', { icon: '📝' });
  };

  const handleDeleteMembro = (id: number) => {
    if (confirm('Deseja realmente remover este militante?')) {
      deleteMembro(id);
      toast.success('Militante removido!');
    }
  };

  const handleUsuarioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUsuario({ ...usuarioForm, provincia: PROVINCIA_SEDE, ativo: true });
    toast.success('Oficial nomeado!');
    setUsuarioForm({ nome: '', hierarquia: 'Secretário Municipal', municipioOrigem: 'Sumbe' });
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-white p-2 rounded-3xl shadow-sm border border-slate-100 flex overflow-x-auto space-x-2 no-scrollbar">
        {[
          { id: 'usuarios', label: 'Hierarquia Política', icon: ShieldCheckIcon },
          { id: 'militantes', label: 'Nova Ficha de Inscrição', icon: UserPlusIcon },
          { id: 'nucleos', label: 'Genealogia Política', icon: ListBulletIcon },
          { id: 'comunicacao', label: 'Mensagens & Viagens', icon: PaperAirplaneIcon },
          { id: 'controle', label: 'Controle Online (Status)', icon: SignalIcon },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-6 py-3 rounded-2xl text-xs font-black transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}
          >
            <tab.icon className="w-5 h-5 mr-3" />
            <span className="uppercase tracking-widest">{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
          {activeTab === 'usuarios' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-8 italic uppercase text-center border-b border-slate-100 pb-4">Estrutura Política</h3>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {usuarios.map((user: any) => (
                    <div key={user.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:border-yellow-400 transition-all">
                      <div className="flex items-center space-x-6">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-white flex items-center justify-center shadow-sm text-yellow-500 group-hover:bg-yellow-400 group-hover:text-blue-900 transition-colors">
                          <ShieldCheckIcon className="w-8 h-8" />
                        </div>
                        <div>
                          <h4 className="text-lg font-black text-slate-900">{user.nome}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <p className="text-[9px] font-black text-yellow-600 bg-yellow-100 px-2.5 py-1 rounded-full uppercase">{user.hierarquia}</p>
                            <p className="text-[9px] font-black text-slate-400 uppercase">{user.municipioOrigem}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 bg-blue-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-black tracking-tighter mb-8 uppercase italic">Nomear Novo Oficial</h3>
                  <form onSubmit={handleUsuarioSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-blue-300 uppercase tracking-widest ml-1">Nome Completo</label>
                      <input required value={usuarioForm.nome} onChange={e => setUsuarioForm({...usuarioForm, nome: e.target.value})} type="text" className="w-full bg-white/10 border-2 border-transparent rounded-2xl p-4 text-sm font-black text-white focus:bg-white focus:text-slate-900 transition-all outline-none" placeholder="Nome do Oficial" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-blue-300 uppercase tracking-widest ml-1">Cargo / Hierarquia</label>
                      <select value={usuarioForm.hierarquia} onChange={e => setUsuarioForm({...usuarioForm, hierarquia: e.target.value})} className="w-full bg-white/10 border-2 border-transparent rounded-2xl p-4 text-sm font-black text-white focus:bg-white focus:text-slate-900 transition-all outline-none">
                        <option className="text-blue-900">Secretário Provincial</option>
                        <option className="text-blue-900">Secretário Municipal</option>
                        <option className="text-blue-900">Coordenador de Núcleo</option>
                      </select>
                    </div>
                    <button className="w-full py-5 bg-yellow-400 text-blue-900 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition-all">Confirmar Nomeação</button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'militantes' && (
            <div className="max-w-4xl mx-auto bg-white p-12 shadow-2xl border border-slate-100 relative overflow-hidden">
              {/* Cabeçalho */}
              <div className="flex flex-col items-center mb-12 space-y-4">
                <div className="absolute top-12 left-12"><p className="text-[12px] font-black text-slate-900 uppercase">Ficha: PL-{new Date().getFullYear()}/{(membros.length + 1).toString().padStart(5, '0')}</p></div>
                <div className="w-20 h-14 bg-blue-900 flex items-center justify-center rounded-sm border border-yellow-400"><img src="/partidoliberarbandeira.jpg" className="w-full h-full object-cover" /></div>
                <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">PARTIDO LIBERAL – PL</h1>
                <div className="w-full bg-blue-600 py-2 text-center border-2 border-slate-900 text-white font-black uppercase">{editingId ? 'Editando Militante' : 'Ficha de Inscrição'}</div>
              </div>

              {/* Foto */}
              <div className="absolute top-12 right-12 w-32 h-40 border-2 border-slate-200 bg-slate-50 flex flex-col items-center justify-center overflow-hidden group">
                {membroForm.foto ? (
                  <img src={membroForm.foto} className="w-full h-full object-cover" />
                ) : (
                  <label className="cursor-pointer text-[10px] font-black uppercase text-slate-400 hover:text-blue-600">Inserir Foto<input type="file" accept="image/*" onChange={handleFotoChange} className="hidden" /></label>
                )}
              </div>

              <form onSubmit={handleMembroSubmit} className="space-y-8 mt-10">
                <div className="space-y-4">
                  <h3 className="font-black text-xs uppercase border-b-2 border-slate-900 inline-block">1. Dados Pessoais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div className="flex flex-col"><label className="text-[10px] font-bold text-slate-500 uppercase">Nome Completo</label><input required value={membroForm.nome} onChange={e => setMembroForm({...membroForm, nome: e.target.value})} type="text" className="border-b border-slate-300 py-1 font-black text-slate-900 uppercase outline-none focus:border-blue-600" /></div>
                    <div className="flex flex-col"><label className="text-[10px] font-bold text-slate-500 uppercase">Pseudônimo</label><input value={membroForm.pseudonimo} onChange={e => setMembroForm({...membroForm, pseudonimo: e.target.value})} type="text" className="border-b border-slate-300 py-1 font-black text-slate-900 outline-none focus:border-blue-600" /></div>
                    
                    <div className="flex flex-col"><label className="text-[10px] font-bold text-slate-500 uppercase">Nome do Pai</label><input value={membroForm.nomePai} onChange={e => setMembroForm({...membroForm, nomePai: e.target.value})} type="text" className="border-b border-slate-300 py-1 font-black text-slate-900 outline-none focus:border-blue-600" /></div>
                    <div className="flex flex-col"><label className="text-[10px] font-bold text-slate-500 uppercase">Nome da Mãe</label><input value={membroForm.nomeMae} onChange={e => setMembroForm({...membroForm, nomeMae: e.target.value})} type="text" className="border-b border-slate-300 py-1 font-black text-slate-900 outline-none focus:border-blue-600" /></div>

                    <div className="flex flex-col"><label className="text-[10px] font-bold text-slate-500 uppercase">Naturalidade</label><input value={membroForm.naturalidade} onChange={e => setMembroForm({...membroForm, naturalidade: e.target.value})} type="text" className="border-b border-slate-300 py-1 font-black text-slate-900 outline-none focus:border-blue-600" /></div>
                    <div className="flex flex-col"><label className="text-[10px] font-bold text-slate-500 uppercase">Data de Nascimento</label><input value={membroForm.dataNascimento} onChange={e => setMembroForm({...membroForm, dataNascimento: e.target.value})} type="date" className="border-b border-slate-300 py-1 font-black text-slate-900 outline-none focus:border-blue-600" /></div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col"><label className="text-[10px] font-bold text-slate-500 uppercase">Número do B.I</label><input required value={membroForm.bi} onChange={e => setMembroForm({...membroForm, bi: e.target.value})} type="text" className="border-b border-slate-300 py-1 font-black text-slate-900 outline-none focus:border-blue-600" /></div>
                      <div className="flex flex-col"><label className="text-[10px] font-bold text-slate-500 uppercase">Validade</label><input value={membroForm.validoAte} onChange={e => setMembroForm({...membroForm, validoAte: e.target.value})} type="text" placeholder="DD/MM/AAAA" className="border-b border-slate-300 py-1 font-black text-slate-900 outline-none focus:border-blue-600 text-center" /></div>
                    </div>
                    <div className="flex flex-col"><label className="text-[10px] font-bold text-slate-500 uppercase">Local de Emissão</label><input value={membroForm.localEmissao} onChange={e => setMembroForm({...membroForm, localEmissao: e.target.value})} type="text" className="border-b border-slate-300 py-1 font-black text-slate-900 outline-none focus:border-blue-600" /></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-black text-xs uppercase border-b-2 border-slate-900 inline-block">2. Residência & Localização</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div className="flex flex-col"><label className="text-[10px] font-bold text-slate-500 uppercase">Município</label>
                      <select value={membroForm.municipio} onChange={e => setMembroForm({...membroForm, municipio: e.target.value})} className="border-b border-slate-300 py-1 font-black text-slate-900 outline-none focus:border-blue-600 bg-transparent">
                        {MUNICIPIOS_CUANZA_SUL.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col"><label className="text-[10px] font-bold text-slate-500 uppercase">Comuna / Distrito</label><input value={membroForm.comuna} onChange={e => setMembroForm({...membroForm, comuna: e.target.value})} type="text" className="border-b border-slate-300 py-1 font-black text-slate-900 outline-none focus:border-blue-600" /></div>
                    <div className="flex flex-col"><label className="text-[10px] font-bold text-slate-500 uppercase">Bairro</label><input value={membroForm.bairro} onChange={e => setMembroForm({...membroForm, bairro: e.target.value})} type="text" className="border-b border-slate-300 py-1 font-black text-slate-900 outline-none focus:border-blue-600" /></div>
                    <div className="flex flex-col"><label className="text-[10px] font-bold text-slate-500 uppercase">Rua / Casa</label><input value={membroForm.rua} onChange={e => setMembroForm({...membroForm, rua: e.target.value})} type="text" className="border-b border-slate-300 py-1 font-black text-slate-900 outline-none focus:border-blue-600" /></div>
                    <div className="flex flex-col"><label className="text-[10px] font-bold text-slate-500 uppercase">Núcleo de Base</label><input value={membroForm.nucleo} onChange={e => setMembroForm({...membroForm, nucleo: e.target.value})} type="text" className="border-b border-slate-300 py-1 font-black text-slate-900 outline-none focus:border-blue-600" /></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-black text-xs uppercase border-b-2 border-slate-900 inline-block">3. Informação Política</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col"><label className="text-[10px] font-bold text-slate-500 uppercase">Data de Registo</label><input value={membroForm.dataRegisto} onChange={e => setMembroForm({...membroForm, dataRegisto: e.target.value})} type="date" className="border-b border-slate-300 py-1 font-black text-slate-900 outline-none focus:border-blue-600" /></div>
                    <div className="flex flex-col"><label className="text-[10px] font-bold text-slate-500 uppercase">Profissão/Ocupação</label><input value={membroForm.profissao} onChange={e => setMembroForm({...membroForm, profissao: e.target.value})} type="text" className="border-b border-slate-300 py-1 font-black text-slate-900 outline-none focus:border-blue-600" /></div>
                    
                    <div className="flex items-center space-x-12">
                      <div className="flex flex-col space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Tipo Militante</label>
                        <div className="flex space-x-4">
                          <label className="flex items-center space-x-2"><input type="radio" checked={membroForm.tipo === 'Activo'} onChange={() => setMembroForm({...membroForm, tipo: 'Activo'})} className="w-4 h-4" /><span className="text-[10px] font-black uppercase text-slate-900">Activo</span></label>
                          <label className="flex items-center space-x-2"><input type="radio" checked={membroForm.tipo === 'Não Activo'} onChange={() => setMembroForm({...membroForm, tipo: 'Não Activo'})} className="w-4 h-4" /><span className="text-[10px] font-black uppercase text-slate-900">Inactivo</span></label>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Sexo</label>
                        <div className="flex space-x-4">
                          <label className="flex items-center space-x-2"><input type="radio" checked={membroForm.sexo === 'Masculino'} onChange={() => setMembroForm({...membroForm, sexo: 'Masculino'})} className="w-4 h-4" /><span className="text-[10px] font-black uppercase text-slate-900">Masc.</span></label>
                          <label className="flex items-center space-x-2"><input type="radio" checked={membroForm.sexo === 'Feminino'} onChange={() => setMembroForm({...membroForm, sexo: 'Feminino'})} className="w-4 h-4" /><span className="text-[10px] font-black uppercase text-slate-900">Fem.</span></label>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col"><label className="text-[10px] font-bold text-slate-500 uppercase">Observações</label><input value={membroForm.observacoes} onChange={e => setMembroForm({...membroForm, observacoes: e.target.value})} type="text" className="border-b border-slate-300 py-1 font-black text-slate-900 outline-none focus:border-blue-600" /></div>
                  </div>
                </div>

                <div className="pt-8 space-y-4">
                  <button type="submit" className="w-full py-5 bg-slate-900 text-yellow-400 font-black uppercase tracking-widest rounded-2xl hover:bg-slate-800 transition-all">{editingId ? 'Salvar Alterações' : 'Autorizar Filiação'}</button>
                  {editingId && <button type="button" onClick={() => setEditingId(null)} className="w-full text-[10px] font-black text-slate-400 uppercase tracking-widest">Cancelar</button>}
                </div>
              </form>
            </div>
          )}

          {activeTab === 'nucleos' && <EstruturaGenealogica />}

          {activeTab === 'comunicacao' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-black text-slate-900 uppercase italic">Envio de Mensagem</h3>
                    <div className="flex flex-col items-end">
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${msgForm.corpo.length >= 100 ? 'text-red-500' : 'text-slate-400'}`}>
                        {msgForm.corpo.length} / 100
                      </span>
                      {msgForm.corpo.length >= 100 && <span className="text-[8px] font-black text-red-500 uppercase tracking-tighter">Limite atingido!</span>}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase px-4">Destinatários</label>
                      <select 
                        value={msgForm.destinatario}
                        onChange={(e) => setMsgForm({...msgForm, destinatario: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-black text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option>Todos os Militantes</option>
                        {MUNICIPIOS_CUANZA_SUL.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase px-4">Corpo da Mensagem</label>
                      <textarea 
                        rows={4} 
                        maxLength={100}
                        value={msgForm.corpo}
                        onChange={(e) => setMsgForm({...msgForm, corpo: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-black text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 resize-none h-40" 
                        placeholder="Escreva sua mensagem aqui..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    if (msgForm.corpo.trim()) {
                      toast.success('Notificação enviada com sucesso!');
                      setMsgForm({...msgForm, corpo: ''});
                    } else {
                      toast.error('Escreva uma mensagem primeiro!');
                    }
                  }} 
                  className="w-full py-5 bg-slate-900 text-yellow-500 rounded-2xl font-black uppercase mt-8 hover:bg-slate-800 transition-all active:scale-95"
                >
                  Disparar Notificações
                </button>
              </div>
              <div className="bg-blue-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                <h3 className="text-2xl font-black uppercase italic mb-8">Viagem / Missão</h3>
                <div className="space-y-4">
                  <input type="text" className="w-full bg-white/10 border-none rounded-2xl p-4 text-sm font-black text-white outline-none focus:bg-white focus:text-slate-900" placeholder="Destino" />
                  <input type="date" className="w-full bg-white/10 border-none rounded-2xl p-4 text-sm font-black text-white outline-none focus:bg-white focus:text-slate-900" />
                  <select className="w-full bg-white/10 border-none rounded-2xl p-4 text-sm font-black text-white outline-none focus:bg-white focus:text-slate-900">
                    {viaturas.map((v: any) => <option key={v.id} className="text-blue-900">{v.modelo} - {v.matricula}</option>)}
                  </select>
                </div>
                <button onClick={() => toast.success('Registrado!')} className="w-full py-5 bg-yellow-400 text-blue-950 rounded-2xl font-black uppercase mt-8 hover:bg-white transition-all">Agendar Missão</button>
              </div>
            </div>
          )}

          {activeTab === 'controle' && (
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
              <h3 className="text-2xl font-black text-slate-900 text-center uppercase italic mb-8">Status da Militância</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {membros.map((m: any) => (
                  <div key={m.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2.5rem] border border-transparent hover:border-slate-200 transition-all group">
                    <div className="flex items-center space-x-4">
                      {m.foto ? <img src={m.foto} className="w-14 h-14 rounded-2xl object-cover shadow-sm" /> : <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center font-black text-slate-300 shadow-sm">{m.nome.charAt(0)}</div>}
                      <div><p className="text-sm font-black text-slate-900">{m.nome}</p><p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">PL-{m.id.toString().padStart(5, '0')} • {m.municipio}</p></div>
                    </div>
                    <div className="flex flex-col items-end space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center space-x-2">
                        <button onClick={() => handleEditMembro(m)} className="p-3 bg-white text-blue-600 rounded-xl shadow-sm hover:bg-blue-600 hover:text-white transition-all"><PencilSquareIcon className="w-4 h-4" /></button>
                        <button onClick={() => handleDeleteMembro(m.id)} className="p-3 bg-white text-red-500 rounded-xl shadow-sm hover:bg-red-500 hover:text-white transition-all"><TrashIcon className="w-4 h-4" /></button>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${m.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{m.activo ? 'ONLINE' : 'INACTIVO'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function PortalCadastro() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <PortalCadastroContent />
    </Suspense>
  );
}