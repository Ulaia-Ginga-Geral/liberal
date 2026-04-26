'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { relatoriosGraficosMock } from '@/data/portalMock';

export default function PortalRelatorios() {
  const [periodoVisualizacao, setPeriodoVisualizacao] = useState('mensal');

  // Na vida real estes dados seriam filtrados baseados no periodoVisualizacao
  const data = relatoriosGraficosMock;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 space-y-4 md:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Relatório de Produção e Estatísticas</h3>
            <p className="text-sm text-gray-500">Acompanhamento do cadastros e contribuições.</p>
          </div>
          
          <div className="flex space-x-2">
            <select 
              value={periodoVisualizacao}
              onChange={(e) => setPeriodoVisualizacao(e.target.value)}
              className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            >
              <option value="diaria">Diária</option>
              <option value="semanal">Semanal</option>
              <option value="mensal">Mensal</option>
              <option value="trimestral">Trimestral</option>
              <option value="semestral">Semestral</option>
              <option value="anual">Anual</option>
            </select>
            <button className="bg-primary-blue text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
              Exportar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gráfico de Barras - Produção */}
          <div>
             <h4 className="font-semibold text-gray-700 mb-4">Crescimento de Cadastros ({periodoVisualizacao})</h4>
             <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="periodo" />
                <YAxis />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #eee' }} />
                <Bar dataKey="producao" name="Novos Cadastros" fill="#1E3A8A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Linhas - Quotas Pagas */}
          <div>
             <h4 className="font-semibold text-gray-700 mb-4">Evolução Quotas Pagas ({periodoVisualizacao})</h4>
             <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="periodo" />
                <YAxis />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #eee' }} />
                <Line type="monotone" dataKey="quotasPagas" name="Quotas" stroke="#FFD700" strokeWidth={3} dot={{ strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
