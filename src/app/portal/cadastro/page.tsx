'use client';

import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usuariosMock, militantesMock } from '@/data/portalMock';
import { useSearchParams } from 'next/navigation';
import { usePortal } from '@/context/PortalContext';
import { MUNICIPIOS_CUANZA_SUL, PROVINCIA_SEDE } from '@/data/geoData';
import EstruturaGenealogica from './genealogia';
import {
  UserPlusIcon,
  UsersIcon,
  ListBulletIcon,
  SignalIcon,
  ShieldCheckIcon,
  ChevronRightIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';

function PortalCadastroContent() {
  const { addMembro, membros } = usePortal();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'usuarios';
  const [activeTab, setActiveTab] = useState(initialTab);

  const [formData, setFormData] = useState({
    nome: '',
    bi: '',
    municipio: 'Sumbe',
    dataNascimento: '',
    foto: ''
  });

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, foto: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMembro({
      ...formData,
      provincia: PROVINCIA_SEDE,
      activo: true
    });
    alert(`Membro cadastrado com sucesso no Cuanza Sul (${formData.municipio})!`);
    setFormData({ nome: '', bi: '', municipio: 'Sumbe', dataNascimento: '', foto: '' });
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Abas Internas de Cadastro */}
      <div className="bg-white p-2 rounded-3xl shadow-sm border border-slate-100 flex overflow-x-auto space-x-2 no-scrollbar">
        {[
          { id: 'usuarios', label: 'Hierarquia Política', icon: ShieldCheckIcon },
          { id: 'militantes', label: 'Nova Ficha de Inscrição', icon: UserPlusIcon },
          { id: 'nucleos', label: 'Genealogia Política', icon: ListBulletIcon },
          { id: 'controle', label: 'Controle Online (Status)', icon: SignalIcon },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center px-6 py-3 rounded-2xl text-xs font-black transition-all whitespace-nowrap
              ${activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
              }
            `}
          >
            <tab.icon className="w-5 h-5 mr-3" />
            <span className="uppercase tracking-widest">{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'usuarios' && (
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-8">Hierarquia Cuanza Sul</h3>
              <div className="space-y-4">
                {usuariosMock.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-white flex items-center justify-center shadow-sm text-yellow-500">
                        <ShieldCheckIcon className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-slate-900 tracking-tight">{user.nome}</h4>
                        <p className="text-[10px] font-black text-yellow-600 bg-yellow-100 px-2.5 py-1 rounded-full uppercase tracking-widest inline-block mt-1">
                          {user.hierarquia}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'militantes' && (
            <div className="max-w-4xl mx-auto bg-white p-12 shadow-2xl border border-slate-100 relative overflow-hidden">
              {/* Cabeçalho Institucional Réplica */}
              <div className="flex flex-col items-center mb-12 space-y-4 relative">
                {/* Número da Ficha Dinâmico */}
                <div className="absolute top-0 left-0">
                  <p className="text-[15px] font-black text-slate-900 uppercase tracking-tighter">
                    Nº da Ficha: C-SUL/{new Date().getFullYear()}-{(militantesMock.length + 1).toString().padStart(5, '0')}
                  </p>
                </div>

                <div className="w-24 h-16 bg-blue-900 flex items-center justify-center relative overflow-hidden rounded-sm border border-yellow-400">
                  <img src="/partidoliberarbandeira.jpg" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">PARTIDO LIBERAL – PL</h1>

                <div className="w-full bg-blue-600 py-3 text-center border-2 border-slate-900 mt-4">
                  <h2 className="text-white font-black text-lg uppercase tracking-tighter shadow-sm">FICHA DE INSCRIÇÃO</h2>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10 text-slate-800">
                {/* Foto Carregada na Ficha */}
                <div className="absolute top-12 right-12 w-40 h-48 border-2 border-slate-200 bg-slate-50 flex flex-col items-center justify-center group overflow-hidden">
                  {formData.foto ? (
                    <img src={formData.foto} className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <div className="text-slate-300 font-black text-[9px] uppercase text-center p-2 mb-2">Área de Fotografia</div>
                      <label className="cursor-pointer bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[9px] font-black uppercase hover:bg-yellow-400 hover:text-slate-900 transition-colors">
                        Carregar
                        <input type="file" accept="image/*" onChange={handleFotoChange} className="hidden" />
                      </label>
                    </>
                  )}
                </div>

                {/* DADOS PESSOAIS */}
                <div className="space-y-6 pt-10">
                  <h3 className="font-black text-sm uppercase tracking-widest border-b-2 border-slate-900 inline-block pb-1">DADOS PESSOAIS:</h3>

                  <div className="space-y-4">
                    <div className="flex items-end space-x-2">
                      <span className="font-bold text-sm whitespace-nowrap text-slate-600">Nome Completo:</span>
                      <input required value={formData.nome} onChange={e => setFormData({ ...formData, nome: e.target.value })} type="text" className="flex-1 border-b border-slate-400 focus:border-blue-600 outline-none pb-1 font-black text-black bg-transparent" />
                    </div>

                    <div className="flex items-end space-x-8">
                      <div className="flex items-end space-x-2 flex-1">
                        <span className="font-bold text-sm whitespace-nowrap text-slate-600">Idade:</span>
                        <input type="text" className="w-24 border-b border-slate-400 focus:border-blue-600 outline-none pb-1 font-black text-black bg-transparent" />
                      </div>
                      <div className="flex items-end space-x-2 flex-[2]">
                        <span className="font-bold text-sm whitespace-nowrap text-slate-600">Número do B.I:</span>
                        <input required value={formData.bi} onChange={e => setFormData({ ...formData, bi: e.target.value })} type="text" className="flex-1 border-b border-slate-400 focus:border-blue-600 outline-none pb-1 font-black text-black bg-transparent" />
                      </div>
                      <div className="flex items-end space-x-2 flex-1">
                        <span className="font-bold text-sm whitespace-nowrap text-slate-600">Validade:</span>
                        <input type="text" placeholder="/  /  " className="w-24 border-b border-slate-400 focus:border-blue-600 outline-none pb-1 font-black text-black text-center bg-transparent" />
                      </div>
                    </div>

                    <div className="flex items-end space-x-2 text-slate-600">
                      <span className="font-bold text-sm whitespace-nowrap">Contacto Telefónico:</span>
                      <input type="text" className="flex-1 border-b border-slate-400 focus:border-blue-600 outline-none pb-1 font-black text-black bg-transparent" />
                    </div>
                  </div>
                </div>

                {/* ENDEREÇO RESIDENCIAL */}
                <div className="space-y-6">
                  <h3 className="font-black text-sm uppercase tracking-widest border-b-2 border-slate-900 inline-block pb-1">ENDEREÇO RESIDENCIAL:</h3>

                  <div className="space-y-4">
                    <div className="flex items-end space-x-8">
                      <div className="flex items-end space-x-2 flex-1">
                        <span className="font-bold text-sm whitespace-nowrap text-slate-600">Província:</span>
                        <input readOnly value="Cuanza-Sul" type="text" className="flex-1 border-b border-slate-400 pb-1 font-black text-blue-900 bg-transparent" />
                      </div>
                      <div className="flex items-end space-x-2 flex-1">
                        <span className="font-bold text-sm whitespace-nowrap text-slate-600">Município:</span>
                        <select value={formData.municipio} onChange={e => setFormData({ ...formData, municipio: e.target.value })} className="flex-1 border-b border-slate-400 focus:border-blue-600 outline-none pb-1 font-black text-black bg-transparent appearance-none">
                          {MUNICIPIOS_CUANZA_SUL.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="flex items-end space-x-8">
                      <div className="flex items-end space-x-2 flex-1">
                        <span className="font-bold text-sm whitespace-nowrap text-slate-600">Comuna/Distrito:</span>
                        <input type="text" className="flex-1 border-b border-slate-400 focus:border-blue-600 outline-none pb-1 font-black text-black bg-transparent" />
                      </div>
                      <div className="flex items-end space-x-2 flex-1">
                        <span className="font-bold text-sm whitespace-nowrap text-slate-600">Bairro:</span>
                        <input type="text" className="flex-1 border-b border-slate-400 focus:border-blue-600 outline-none pb-1 font-black text-black bg-transparent" />
                      </div>
                    </div>

                    <div className="flex items-end space-x-2">
                      <span className="font-bold text-sm whitespace-nowrap text-slate-600">Rua:</span>
                      <input type="text" className="flex-1 border-b border-slate-400 focus:border-blue-600 outline-none pb-1 font-black text-black bg-transparent" />
                    </div>

                    <div className="flex items-end space-x-2">
                      <span className="font-bold text-sm whitespace-nowrap text-slate-600">Núcleo de Base (se aplicável):</span>
                      <input type="text" className="flex-1 border-b border-slate-400 focus:border-blue-600 outline-none pb-1 font-black text-black bg-transparent" />
                    </div>
                  </div>
                </div>

                {/* INFORMAÇÕES POLÍTICAS */}
                <div className="space-y-6">
                  <div className="flex items-end space-x-2">
                    <span className="font-bold text-sm whitespace-nowrap text-slate-600">Data de registo no Partido:</span>
                    <input type="text" className="w-48 border-b border-slate-400 focus:border-blue-600 outline-none pb-1 font-black text-black text-center bg-transparent" placeholder="/   /  " />
                  </div>

                  <div className="flex items-center space-x-12">
                    <div className="flex items-center space-x-6">
                      <span className="font-bold text-sm text-slate-600">Tipo de Militante:</span>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="checkbox" className="w-5 h-5 border-2 border-slate-900 rounded-none bg-transparent" defaultChecked />
                          <span className="font-black text-xs text-black">Activo</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="checkbox" className="w-5 h-5 border-2 border-slate-900 rounded-none bg-transparent" />
                          <span className="font-black text-xs text-black">Não Activo</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-12">
                    <div className="flex items-center space-x-6">
                      <span className="font-bold text-sm text-slate-600">Sexo:</span>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="radio" name="sexo" className="w-5 h-5 border-2 border-slate-900" defaultChecked />
                          <span className="font-black text-xs text-black">Masculino</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="radio" name="sexo" className="w-5 h-5 border-2 border-slate-900" />
                          <span className="font-black text-xs text-black">Feminino</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-end space-x-2">
                    <span className="font-bold text-sm whitespace-nowrap text-slate-600">Profissão / Ocupação:</span>
                    <input type="text" className="flex-1 border-b border-slate-400 focus:border-blue-600 outline-none pb-1 font-black text-black bg-transparent" />
                  </div>

                  <div className="flex items-end space-x-2">
                    <span className="font-bold text-sm whitespace-nowrap text-slate-600">Observações adicionais:</span>
                    <input type="text" className="flex-1 border-b border-slate-400 focus:border-blue-600 outline-none pb-1 font-black text-black bg-transparent" />
                  </div>

                  <div className="flex items-end space-x-2 pt-10">
                    <span className="font-bold text-sm whitespace-nowrap text-slate-600">Secretariado Provincial em:</span>
                    <input readOnly value="Sumbe, Cuanza-Sul" type="text" className="w-64 border-b border-slate-400 bg-transparent text-blue-900 font-black italic pb-1" />
                    <span className="font-bold text-sm"> / </span>
                    <input type="text" className="w-16 border-b border-slate-400 bg-transparent font-black text-black text-center pb-1" placeholder="Mês" />
                    <span className="font-bold text-sm"> / </span>
                    <input type="text" className="w-16 border-b border-slate-400 bg-transparent font-black text-black text-center pb-1" placeholder="Ano" />
                  </div>
                </div>

                <div className="pt-10">
                  <button type="submit" className="w-full py-5 bg-slate-900 text-yellow-400 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-2xl active:scale-95">
                    Submeter Ficha de Acompanhamento
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'nucleos' && (
            <EstruturaGenealogica />
          )}

          {activeTab === 'controle' && (
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-8">Status de Actividade CS</h3>
              <div className="space-y-4">
                {membros.map((m) => (
                  <div key={m.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center font-black text-slate-300">
                        {m.nome.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">{m.nome}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">PL-{m.id.toString().padStart(4, '0')} • {m.municipio}</p>
                      </div>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${m.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {m.activo ? 'Online' : 'Inactivo'}
                    </span>
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
