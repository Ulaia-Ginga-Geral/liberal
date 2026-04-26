'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DocumentTextIcon, ChartBarIcon, ArrowDownTrayIcon, CalendarIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function RelatoriosPage() {
  const [periodo, setPeriodo] = useState('ultimo-mes');
  const [tipoRelatorio, setTipoRelatorio] = useState('membros');

  const dadosMembros = [
    { mes: 'Jan', novos: 45, inativos: 12, total: 1247 },
    { mes: 'Fev', novos: 38, inativos: 8, total: 1277 },
    { mes: 'Mar', novos: 52, inativos: 5, total: 1324 },
    { mes: 'Abr', novos: 41, inativos: 10, total: 1355 },
    { mes: 'Mai', novos: 56, inativos: 7, total: 1404 },
    { mes: 'Jun', novos: 48, inativos: 15, total: 1437 },
  ];

  const dadosAtividades = [
    { mes: 'Jan', planejadas: 23, realizadas: 20, participantes: 845 },
    { mes: 'Fev', planejadas: 28, realizadas: 25, participantes: 920 },
    { mes: 'Mar', planejadas: 32, realizadas: 29, participantes: 1012 },
    { mes: 'Abr', planejadas: 25, realizadas: 22, participantes: 890 },
    { mes: 'Mai', planejadas: 30, realizadas: 27, participantes: 980 },
    { mes: 'Jun', planejadas: 35, realizadas: 31, participantes: 1105 },
  ];

  const dadosEngajamento = [
    { nome: 'Alto', valor: 320 },
    { nome: 'Médio', valor: 580 },
    { nome: 'Baixo', valor: 247 },
  ];

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B'];

  const relatoriosDisponiveis = [
    {
      id: 1,
      titulo: 'Relatório de Crescimento Mensal',
      descricao: 'Análise do crescimento de membros por mês',
      tipo: 'crescimento',
      dataGeracao: '2024-01-15',
      tamanho: '2.4 MB'
    },
    {
      id: 2,
      titulo: 'Relatório de Participação em Atividades',
      descricao: 'Taxa de participação em atividades políticas',
      tipo: 'atividades',
      dataGeracao: '2024-01-10',
      tamanho: '1.8 MB'
    },
    {
      id: 3,
      titulo: 'Relatório de Engajamento',
      descricao: 'Níveis de engajamento dos membros',
      tipo: 'engajamento',
      dataGeracao: '2024-01-05',
      tamanho: '1.2 MB'
    },
    {
      id: 4,
      titulo: 'Relatório Financeiro',
      descricao: 'Receitas e despesas da Juventude do PL',
      tipo: 'financeiro',
      dataGeracao: '2023-12-20',
      tamanho: '3.1 MB'
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
        <h1 className="text-3xl font-bold text-gray-900">Sistema de Relatórios</h1>
        <p className="text-gray-600 mt-2">Relatórios analíticos e estatísticos da Juventude do PL</p>
      </motion.div>

      {/* Filtros */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="ultimo-mes">Último Mês</option>
                <option value="ultimo-trimestre">Último Trimestre</option>
                <option value="ultimo-semestre">Último Semestre</option>
                <option value="ultimo-ano">Último Ano</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Relatório</label>
              <select
                value={tipoRelatorio}
                onChange={(e) => setTipoRelatorio(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="membros">Membros</option>
                <option value="atividades">Atividades</option>
                <option value="engajamento">Engajamento</option>
                <option value="financeiro">Financeiro</option>
              </select>
            </div>
          </div>
          
          <button className="flex items-center px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-secondary-blue transition-colors self-end">
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Gerar Relatório
          </button>
        </div>
      </motion.div>

      {/* Dashboard de relatórios */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Estatísticas rápidas */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas Rápidas</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Total de Membros</p>
                  <p className="text-2xl font-bold text-gray-900">1,437</p>
                </div>
                <div className="text-green-600">
                  <ArrowDownTrayIcon className="h-6 w-6" />
                </div>
              </div>
              
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Atividades Realizadas</p>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                </div>
                <div className="text-blue-600">
                  <ChartBarIcon className="h-6 w-6" />
                </div>
              </div>
              
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Taxa de Participação</p>
                  <p className="text-2xl font-bold text-gray-900">78%</p>
                </div>
                <div className="text-yellow-600">
                  <UserGroupIcon className="h-6 w-6" />
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Membros Ativos</p>
                  <p className="text-2xl font-bold text-gray-900">924</p>
                </div>
                <div className="text-purple-600">
                  <ClockIcon className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Gráfico de engajamento */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nível de Engajamento</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={dadosEngajamento}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  
                  paddingAngle={2}
                  dataKey="valor"
                  label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : '0'}%`}
                >
                  {dadosEngajamento.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} membros`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráficos principais */}
        <div className="lg:col-span-2 space-y-6">
          {/* Gráfico de crescimento de membros */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Crescimento de Membros</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosMembros}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #eee' }}
                />
                <Legend />
                <Bar dataKey="novos" name="Novos Membros" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="inativos" name="Membros Inativos" fill="#EF4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="total" name="Total de Membros" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Gráfico de atividades */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividades Realizadas</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosAtividades}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #eee' }}
                />
                <Legend />
                <Bar dataKey="planejadas" name="Planejadas" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="realizadas" name="Realizadas" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="participantes" name="Participantes" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Relatórios disponíveis */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Relatórios Disponíveis</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            Ver todos
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatoriosDisponiveis.map((relatorio) => (
            <motion.div
              key={relatorio.id}
              whileHover={{ y: -5 }}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-yellow-500 transition-colors"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                    <DocumentTextIcon className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">{relatorio.titulo}</h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{relatorio.descricao}</p>
                  
                  <div className="mt-3 flex items-center text-xs text-gray-500">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    <span>{new Date(relatorio.dataGeracao).toLocaleDateString('pt-PT')}</span>
                  </div>
                  
                  <div className="mt-2 flex justify-between">
                    <span className="text-xs text-gray-500">{relatorio.tamanho}</span>
                    <button className="text-xs text-blue-600 hover:text-blue-800">
                      Baixar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}