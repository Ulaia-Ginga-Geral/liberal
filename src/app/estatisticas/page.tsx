'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  BuildingOfficeIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';
import { estatisticasMock, dadosGraficoMock, dadosDemograficosMock, dadosCrescimentoMock } from '@/data/estatisticas';
import { membrosMock } from '@/data/membros';

export default function EstatisticasPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [filtroPeriodo, setFiltroPeriodo] = useState('mes');

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  // Calcular estatísticas dinâmicas com base nos dados reais
  const estatisticasDinamicas = [
    {
      titulo: 'Membros Activos',
      valor: membrosMock.filter(m => m.status === 'ativo').length.toString(),
      descricao: 'Total de membros activos',
      icone: '👥',
      tipo: 'positivo',
      variacao: 12.5
    },
    {
      titulo: 'Províncias Representadas',
      valor: new Set(membrosMock.map(m => m.endereco.provincia)).size.toString(),
      descricao: 'Número de províncias com membros',
      icone: '🏛️',
      tipo: 'positivo',
      variacao: 8.3
    },
    {
      titulo: 'Média de Actividades',
      valor: Math.round(membrosMock.reduce((acc, m) => acc + m.atividadesParticipadas, 0) / membrosMock.length).toString(),
      descricao: 'Média de actividades por membro',
      icone: '📅',
      tipo: 'positivo',
      variacao: 5.2
    },
    {
      titulo: 'Alto Engajamento',
      valor: membrosMock.filter(m => m.nivelEngajamento === 'alto').length.toString(),
      descricao: 'Membros com alto engajamento',
      icone: '⭐',
      tipo: 'positivo',
      variacao: 18.7
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Estatísticas do Partido</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Análise completa dos dados do Partido Liberal em Angola
        </p>
      </motion.div>

      {/* Controles de filtro */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filtros</h2>
          <div className="flex gap-2">
            {['dia', 'semana', 'mes', 'ano'].map((periodo) => (
              <button
                key={periodo}
                onClick={() => setFiltroPeriodo(periodo)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filtroPeriodo === periodo
                    ? 'bg-primary-blue text-white'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                {periodo.charAt(0).toUpperCase() + periodo.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Estatísticas Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {estatisticasDinamicas.map((stat, index) => (
          <motion.div
            key={stat.titulo}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.titulo}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.valor}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.descricao}</p>
              </div>
              <div className="text-4xl">{stat.icone}</div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                stat.tipo === 'positivo' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                stat.tipo === 'negativo' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}>
                {stat.tipo === 'positivo' ? (
                  <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                ) : stat.tipo === 'negativo' ? (
                  <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
                ) : (
                  <ChartBarIcon className="h-4 w-4 mr-1" />
                )}
                {Math.abs(stat.variacao)}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs período anterior</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Distribuição por Províncias */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Distribuição por Províncias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from(new Set(membrosMock.map(m => m.endereco.provincia))).map((provincia) => {
            const membrosNaProvincia = membrosMock.filter(m => m.endereco.provincia === provincia);
            const altoEngajamento = membrosNaProvincia.filter(m => m.nivelEngajamento === 'alto').length;
            
            return (
              <div key={provincia} className="p-4 border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">{provincia}</h3>
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
                    {membrosNaProvincia.length} membros
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Alto engajamento:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">{altoEngajamento}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Média atividades:</span>
                    <span className="font-medium">
                      {Math.round(membrosNaProvincia.reduce((acc, m) => acc + m.atividadesParticipadas, 0) / membrosNaProvincia.length) || 0}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Estatísticas Demográficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribuição por Gênero */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Distribuição por Gênero</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Masculino</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 dark:bg-slate-700 rounded-full h-2 mr-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">62%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Feminino</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 dark:bg-slate-700 rounded-full h-2 mr-2">
                  <div className="bg-pink-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">35%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Outro</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 dark:bg-slate-700 rounded-full h-2 mr-2">
                  <div className="bg-gray-500 h-2 rounded-full" style={{ width: '3%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">3%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Distribuição por Faixa Etária */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Distribuição por Idade</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">18-25 anos</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 dark:bg-slate-700 rounded-full h-2 mr-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">28%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">26-35 anos</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 dark:bg-slate-700 rounded-full h-2 mr-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">35%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">36-50 anos</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 dark:bg-slate-700 rounded-full h-2 mr-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">30%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">51+ anos</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 dark:bg-slate-700 rounded-full h-2 mr-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '7%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">7%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Atividade Recente */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Atividade Recente</h3>
        <div className="space-y-4">
          {membrosMock.slice(0, 3).map((membro, index) => (
            <div key={membro.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  membro.nivelEngajamento === 'alto' ? 'bg-green-500' :
                  membro.nivelEngajamento === 'medio' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{membro.nome}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {membro.cargo} • {membro.endereco.provincia}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {membro.atividadesParticipadas} atividades
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Última: {new Date(membro.ultimaAtividade).toLocaleDateString('pt-AO')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}