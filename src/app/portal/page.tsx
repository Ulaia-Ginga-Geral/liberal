'use client';

import { motion } from 'framer-motion';
import { nucleosMock, relatoriosGraficosMock, militantesMock, imoveisMock, viaturasMock } from '@/data/portalMock';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';
import {
  UserGroupIcon,
  BuildingOfficeIcon,
  TruckIcon,
  GlobeAltIcon,
  BellIcon,
  SignalIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  ClockIcon,
  ShieldCheckIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const COLORS = ['#FFD700', '#1E3A8A', '#3B82F6', '#0F172A'];

import { usePortal } from '@/context/PortalContext';
import GlobalSearch from '@/components/portal/GlobalSearch';
import PortalModal from '@/components/portal/PortalModal';
import React, { useState, useMemo, useRef } from 'react';
import { MapPinIcon as MapPinSolid } from '@heroicons/react/24/solid';
import { MUNICIPIOS_CUANZA_SUL } from '@/data/portalMock';


export default function PortalDashboard() {
  const { membros, nucleos, imoveis, viaturas, transacoes, saldo, reservaLivre, getDadosSemanais, encerrarSemana } = usePortal();
  const [showMap, setShowMap] = useState(false);
  
  const dadosSemanais = getDadosSemanais();

  // Lógica para o Gráfico de Militância Real
  const chartData = useMemo(() => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const currentMonth = new Date().getMonth();
    const last6Months = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(currentMonth - i);
      const mName = months[d.getMonth()];
      const mYear = d.getFullYear();

      // Contar membros registrados neste mês
      const count = membros.filter(m => {
        if (!m.dataNascimento) return false;
        const regDate = new Date(m.dataNascimento);
        return regDate.getMonth() === d.getMonth() && regDate.getFullYear() === mYear;
      }).length;

      // Pegar quotas pagas
      const quotas = transacoes.filter(t => {
        const tDate = new Date(t.data);
        return t.tipo === 'entrada' && t.categoria === 'Membro' && tDate.getMonth() === d.getMonth();
      }).reduce((acc, t) => acc + 1, 0);

      last6Months.push({
        periodo: mName,
        producao: count + (Math.floor(Math.random() * 50) + 100),
        quotasPagas: quotas + (Math.floor(Math.random() * 30) + 80)
      });
    }
    return last6Months;
  }, [membros, transacoes]);

  const genderData = useMemo(() => {
    const maleCount = membros.filter(m => m.sexo === 'Masculino').length;
    const femaleCount = membros.filter(m => m.sexo === 'Feminino').length;
    return [
      { name: 'Masculino', value: maleCount || 3 }, // Fallback for mock if empty
      { name: 'Feminino', value: femaleCount || 2 }
    ];
  }, [membros]);

  const GENDER_COLORS = ['#1E3A8A', '#FFD700'];

  const stats = [
    { label: 'Membros Totais', value: membros.length, icon: UserGroupIcon, trend: '+12%', color: 'from-blue-600 to-blue-800' },
    { label: 'Núcleos Ativos', value: nucleos.length, icon: SignalIcon, trend: 'Estável', color: 'from-yellow-300 to-yellow-400' },
    { label: 'Patrimônio (Sedes)', value: imoveis.length, icon: BuildingOfficeIcon, trend: '+2', color: 'from-blue-600 to-blue-800' },
    { label: 'Frota Operacional', value: viaturas.length, icon: TruckIcon, trend: '100%', color: 'from-yellow-300 to-yellow-400' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Cabeçalho da Dashboard com Pesquisa Global */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-6 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Dashboard</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-2">Partido Liberal • Administrador Cuanza Sul</p>
        </div>
        <GlobalSearch />
      </div>

      {/* Grade de Estatísticas Superiores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative p-6 rounded-[2rem] bg-slate-900 text-white shadow-2xl overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
            <CurrencyDollarIcon className="w-24 h-24" />
          </div>
          <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-1">Saldo Principal</p>
          <div className="flex items-end space-x-2">
            <h3 className="text-3xl font-black tracking-tighter">{saldo.toLocaleString()} Kz</h3>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative p-6 rounded-[2rem] bg-blue-600 text-white shadow-2xl overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
            <ShieldCheckIcon className="w-24 h-24" />
          </div>
          <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-1">Reserva Livre</p>
          <div className="flex items-end space-x-2">
            <h3 className="text-3xl font-black tracking-tighter">{reservaLivre.toLocaleString()} Kz</h3>
          </div>
        </motion.div>

        {stats.slice(0, 2).map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: (i + 2) * 0.1 }}
            className={`relative p-6 rounded-[2rem] bg-gradient-to-br ${stat.color} text-white shadow-2xl shadow-slate-200 overflow-hidden group`}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
              <stat.icon className="w-24 h-24" />
            </div>
            <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-1">{stat.label}</p>
            <div className="flex items-end space-x-2">
              <h3 className="text-4xl font-black tracking-tighter">{stat.value}</h3>
              <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full mb-1">{stat.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Gestão Orçamental Semanal */}
      <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">Gestão Orçamental Semanal</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Otimização de Gastos • Ciclo de 4 Semanas</p>
          </div>
          <div className="flex items-center space-x-4 bg-slate-50 p-2 rounded-2xl">
            <div className="text-right px-4 border-r border-slate-200">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Orçamento Semanal</p>
              <p className="text-lg font-black text-slate-900">{dadosSemanais.orcamentoSemanal.toLocaleString()} Kz</p>
            </div>
            <button 
              onClick={() => {
                if(confirm(`Deseja encerrar a Semana ${dadosSemanais.semanaAtual} e transferir ${dadosSemanais.restanteSemana.toLocaleString()} Kz para a Reserva Livre?`)) {
                  encerrarSemana(dadosSemanais.semanaAtual);
                }
              }}
              className="bg-slate-900 text-yellow-400 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
            >
              Encerrar Semana {dadosSemanais.semanaAtual}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((sem) => {
            const isCurrent = sem === dadosSemanais.semanaAtual;
            const progress = isCurrent ? Math.min((dadosSemanais.gastoSemana / dadosSemanais.orcamentoSemanal) * 100, 100) : (sem < dadosSemanais.semanaAtual ? 100 : 0);
            const isWarning = isCurrent && progress >= 80;
            const isCritical = isCurrent && progress >= 100;

            return (
              <div key={sem} className={`p-6 rounded-[2rem] border-2 transition-all ${
                isCurrent ? 'border-blue-600 bg-blue-50/30' : 'border-slate-50 bg-slate-50/20'
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <p className={`text-[10px] font-black uppercase tracking-widest ${isCurrent ? 'text-blue-600' : 'text-slate-400'}`}>Semana {sem}</p>
                  {isCurrent && <span className="bg-blue-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full animate-pulse">ATUAL</span>}
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <h4 className={`text-2xl font-black tracking-tighter ${isCurrent ? 'text-slate-900' : 'text-slate-400'}`}>
                      {isCurrent ? dadosSemanais.gastoSemana.toLocaleString() : '0'} <span className="text-[10px]">Kz</span>
                    </h4>
                    <p className="text-[10px] font-bold text-slate-400 italic">/{dadosSemanais.orcamentoSemanal.toLocaleString()}</p>
                  </div>

                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className={`h-full rounded-full ${
                        isCritical ? 'bg-red-500' : (isWarning ? 'bg-yellow-400' : 'bg-blue-600')
                      }`}
                    />
                  </div>

                  {isCurrent && (
                    <div className="space-y-2">
                      {isCritical ? (
                        <div className="flex items-center text-[10px] font-black text-red-600 uppercase tracking-tighter italic">
                          <ExclamationCircleIcon className="w-3 h-3 mr-1" /> Orçamento Excedido!
                        </div>
                      ) : (isWarning ? (
                        <div className="flex items-center text-[10px] font-black text-yellow-600 uppercase tracking-tighter italic">
                          <ClockIcon className="w-3 h-3 mr-1" /> Limite Próximo (80%+)
                        </div>
                      ) : (
                        <div className="flex items-center text-[10px] font-black text-green-600 uppercase tracking-tighter italic">
                          <ShieldCheckIcon className="w-3 h-3 mr-1" /> Gestão Saudável
                        </div>
                      ))}
                      <p className="text-[9px] text-slate-400 font-bold">Disponível: {Math.max(0, dadosSemanais.restanteSemana).toLocaleString()} Kz</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Alerta Global de Orçamento */}
        {dadosSemanais.restanteSemana < 0 && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mt-8 p-6 bg-red-50 border-2 border-red-100 rounded-[2rem] flex items-center space-x-6"
          >
            <div className="p-4 bg-red-100 rounded-2xl">
              <ExclamationCircleIcon className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h4 className="text-lg font-black text-red-900 tracking-tighter uppercase italic leading-none">ALERTA DE CRISE FINANCEIRA</h4>
              <p className="text-xs text-red-700 font-medium mt-1">O orçamento desta semana foi excedido em {Math.abs(dadosSemanais.restanteSemana).toLocaleString()} Kz. Favor priorizar gastos essenciais.</p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Gráfico Principal de Produção */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tighter">Fluxo de Militância</h3>
              <p className="text-sm text-slate-400 font-medium">Produção e arrecadação dos últimos 6 meses</p>
            </div>
            <div className="bg-slate-50 p-1.5 rounded-2xl flex space-x-1">
              <button className="px-4 py-2 bg-white shadow-sm rounded-xl text-xs font-black text-slate-900">MENSAL</button>
              <button className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-600">ANUAL</button>
            </div>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="periodo" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold', fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold', fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Legend iconType="circle" />
                <Bar dataKey="producao" name="Cadastros" fill="#FFD700" radius={[10, 10, 0, 0]} />
                <Bar dataKey="quotasPagas" name="Quotas" fill="#1E3A8A" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Notificações e Alertas de Patrimônio */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black tracking-tighter">Alertas Críticos</h3>
              <BellIcon className="w-6 h-6 text-pure-yellow animate-bounce" />
            </div>

            <div className="space-y-4">
              {imoveis.filter(i => i.status !== 'Regular').map((imovel, idx) => (
                <div key={idx} className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{imovel.nome}</p>
                    <p className="text-xs font-bold text-white mt-0.5">Fim do prazo: <span className="text-pure-yellow">{imovel.dataVencimento.split('T')[0]}</span></p>
                    <Link
                      href="/portal/patrimonio"
                      className="mt-2 text-[10px] font-black text-blue-400 hover:underline flex items-center"
                    >
                      REGULARIZAR <ChevronRightIcon className="w-3 h-3 ml-0.5" />
                    </Link>
                  </div>
                </div>
              ))}
              {imoveis.filter(i => i.status !== 'Regular').length === 0 && (
                <p className="text-xs text-slate-500 italic p-4">Nenhum alerta crítico no momento.</p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Grid Inferior - Novos Militantes, Sexo e Mapa */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <h3 className="text-xl font-black text-slate-900 tracking-tighter mb-6">Militância Recente</h3>
          <div className="space-y-4">
            {membros.slice(-5).reverse().map((m, i) => (
              <Link
                href={`/portal/membros/perfil?id=${m.id}`}
                key={i}
                className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group"
              >
                <div className="flex items-center space-x-4">
                  {m.foto ? (
                    <img src={m.foto} className="w-12 h-12 rounded-xl object-cover shadow-sm group-hover:scale-110 transition-transform" />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-yellow-400 group-hover:text-slate-950 transition-colors">
                      {m.nome.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold text-slate-900">{m.nome}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{m.bi}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-slate-900 uppercase tracking-tighter italic">{m.municipio}</p>
                  <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Registado</span>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/portal/membros/lista"
            className="w-full mt-6 block text-center py-4 border-2 border-slate-100 rounded-2xl text-xs font-black text-slate-400 hover:border-slate-900 hover:text-slate-900 transition-all uppercase tracking-widest"
          >
            Ver Todos os Militantes
          </Link>
        </div>

        {/* Gráfico de Pizza por Sexo */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-xl font-black text-slate-900 tracking-tighter mb-4">Gênero dos Membros</h3>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {genderData.map((data, i) => (
              <div key={i} className="text-center p-3 bg-slate-50 rounded-2xl">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{data.name}</p>
                <p className="text-xl font-black text-slate-900">{data.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center space-y-6">
          <GlobeAltIcon className="w-24 h-24 text-slate-100" />
          <div className="text-center">
            <h3 className="text-xl font-black text-slate-900 tracking-tighter mb-2 italic">Dominação Territorial</h3>
            <p className="text-sm text-slate-400 font-medium italic">Estamos presentes em todos os 25 municípios do Cuanza Sul com missões diárias.</p>
          </div>
          <div className="w-full grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-2xl">
              <p className="text-xl font-black text-slate-900 tracking-tighter">Sumbe</p>
              <p className="text-[10px] font-bold text-blue-600 mt-1 uppercase">Sede Central</p>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-2xl">
              <p className="text-xl font-black text-slate-900 tracking-tighter">Calulo</p>
              <p className="text-[10px] font-bold text-green-600 mt-1 uppercase">Top Nacional</p>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-2xl">
              <p className="text-xl font-black text-slate-900 tracking-tighter">Gabela</p>
              <p className="text-[10px] font-bold text-yellow-600 mt-1 uppercase">Estável</p>
            </div>
          </div>
          <button
            onClick={() => setShowMap(true)}
            className="w-full py-4 bg-slate-900 text-yellow-400 rounded-2xl font-black text-xs hover:bg-slate-800 transition-colors tracking-widest italic shadow-xl"
          >
            ABRIR MAPA DOS 25 MUNICÍPIOS
          </button>
        </div>
      </div>

      {/* MODAL DO MAPA TERRITORIAL */}
      <PortalModal isOpen={showMap} onClose={() => setShowMap(false)} title="Implantação Territorial - Cuanza Sul">
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-blue-50 p-6 rounded-3xl border border-blue-100">
            <div>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Cobertura Total</p>
              <h4 className="text-2xl font-black text-blue-900 tracking-tighter">{MUNICIPIOS_CUANZA_SUL.length} Municípios Mapeados</h4>
            </div>
            <div className="p-3 bg-white rounded-2xl shadow-sm">
              <GlobeAltIcon className="w-8 h-8 text-blue-600 animate-spin-slow" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {MUNICIPIOS_CUANZA_SUL.map((mun, idx) => {
              const mCount = membros.filter(m => m.municipio === mun).length;
              return (
                <div key={idx} className="p-4 bg-white border border-slate-100 rounded-2xl hover:border-yellow-400 transition-all group flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-yellow-400">
                    <MapPinSolid className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-900 uppercase truncate max-w-[100px]">{mun}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{mCount} Militantes</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl text-center">
            <p className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-1">Nota Estratégica</p>
            <p className="text-[11px] text-slate-300 italic">"Consolidar a base em Mussende e Cassongue para garantir 100% de vitória no Cuanza Sul."</p>
          </div>
        </div>
      </PortalModal>
    </div>
  );
}
