'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { estatisticasMock, dadosGraficoMock, dadosDemograficosMock, dadosCrescimentoMock } from '@/data/estatisticas';

const COLORS = ['#FFD700', '#1E3A8A', '#FBBF24', '#3B82F6'];

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Visão geral da Juventude do Partido Liberal</p>
      </motion.div>

      {/* Estatísticas Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {estatisticasMock.map((stat, index) => (
          <motion.div
            key={stat.titulo}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.titulo}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.valor}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.descricao}</p>
              </div>
              <div className="text-4xl">{stat.icone}</div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                stat.tipo === 'positivo' ? 'bg-green-100 text-green-800' :
                stat.tipo === 'negativo' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {stat.tipo === 'positivo' ? '↗' : stat.tipo === 'negativo' ? '↘' : '→'} {Math.abs(stat.variacao)}%
              </span>
              <span className="text-xs text-gray-500 ml-2">vs mês anterior</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Membros Novos */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Crescimento Mensal</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosGraficoMock}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #eee' }}
              />
              <Bar dataKey="membrosNovos" fill="#FFD700" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Gráfico de Participação */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Participação Média</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dadosGraficoMock}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #eee' }}
              />
              <Line 
                type="monotone" 
                dataKey="participacaoMedia" 
                stroke="#1E3A8A" 
                strokeWidth={3}
                dot={{ fill: '#1E3A8A', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Demográficos e Crescimento */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribuição por Gênero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição por Gênero</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Masculino', value: dadosDemograficosMock.genero.masculino },
                  { name: 'Feminino', value: dadosDemograficosMock.genero.feminino },
                  { name: 'Outro', value: dadosDemograficosMock.genero.outro }
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : '0'}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {[
                  { name: 'Masculino', value: dadosDemograficosMock.genero.masculino },
                  { name: 'Feminino', value: dadosDemograficosMock.genero.feminino },
                  { name: 'Outro', value: dadosDemograficosMock.genero.outro }
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Crescimento Anual */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Crescimento Anual</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosCrescimentoMock}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="periodo" />
              <YAxis />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #eee' }}
              />
              <Bar dataKey="crescimentoMembros" fill="#FFD700" name="Membros" radius={[4, 4, 0, 0]} />
              <Bar dataKey="crescimentoAtividades" fill="#1E3A8A" name="Atividades" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Atividade Recente */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div>
                  <p className="font-medium text-gray-900">Nova inscrição confirmada</p>
                  <p className="text-sm text-gray-500">João Pedro Martins - Maputo</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">2 horas atrás</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
