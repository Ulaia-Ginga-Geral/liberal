'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardDocumentCheckIcon, 
  ChartBarIcon, 
  ArrowTrendingUpIcon, 
  UserGroupIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function EscrutinioPage() {
  const [resultados, setResultados] = useState<any[]>([]);
  const [filtroLocalidade, setFiltroLocalidade] = useState<string>('');
  const [filtroTipoEleicao, setFiltroTipoEleicao] = useState<string>('todas');
  const [busca, setBusca] = useState<string>('');

  // Dados simulados de resultados eleitorais
  const dadosResultados = [
    {
      id: 1,
      localidade: 'Luanda',
      tipoEleicao: 'Presidencial',
      observador: 'Carlos Silva',
      mesaVoto: 'Mesa 001-A',
      horaRecebimento: '2024-09-24 17:30',
      votosPL: 125,
      votosOutros: 89,
      totalVotos: 214,
      presencaUrna: 85.5,
      status: 'verificado'
    },
    {
      id: 2,
      localidade: 'Huambo',
      tipoEleicao: 'Legislativa',
      observador: 'Maria Santos',
      mesaVoto: 'Mesa 002-B',
      horaRecebimento: '2024-09-24 18:15',
      votosPL: 98,
      votosOutros: 112,
      totalVotos: 210,
      presencaUrna: 78.3,
      status: 'pendente'
    },
    {
      id: 3,
      localidade: 'Benguela',
      tipoEleicao: 'Presidencial',
      observador: 'José Oliveira',
      mesaVoto: 'Mesa 003-C',
      horaRecebimento: '2024-09-24 16:45',
      votosPL: 142,
      votosOutros: 76,
      totalVotos: 218,
      presencaUrna: 91.2,
      status: 'verificado'
    },
    {
      id: 4,
      localidade: 'Cabinda',
      tipoEleicao: 'Autárquicas',
      observador: 'Ana Costa',
      mesaVoto: 'Mesa 004-D',
      horaRecebimento: '2024-09-24 17:50',
      votosPL: 67,
      votosOutros: 94,
      totalVotos: 161,
      presencaUrna: 68.7,
      status: 'em revisao'
    },
    {
      id: 5,
      localidade: 'Malanje',
      tipoEleicao: 'Legislativa',
      observador: 'Paulo Ferreira',
      mesaVoto: 'Mesa 005-E',
      horaRecebimento: '2024-09-24 18:30',
      votosPL: 89,
      votosOutros: 95,
      totalVotos: 184,
      presencaUrna: 74.1,
      status: 'verificado'
    }
  ];

  // Dados de comparação com resultados oficiais
  const dadosComparacao = [
    {
      localidade: 'Luanda',
      votosParalelo: 12500,
      votosOficial: 12480,
      diferenca: 20,
      discrepancia: 'Baixa'
    },
    {
      localidade: 'Huambo',
      votosParalelo: 9800,
      votosOficial: 9850,
      diferenca: -50,
      discrepancia: 'Baixa'
    },
    {
      localidade: 'Benguela',
      votosParalelo: 14200,
      votosOficial: 14150,
      diferenca: 50,
      discrepancia: 'Baixa'
    }
  ];

  return (
    <div className="space-y-6 mensagem-page-text">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Centro de Escrutínio Paralelo</h1>
        <p className="text-gray-600 mt-2">Monitoramento independente dos resultados eleitorais</p>
      </motion.div>

      {/* Estatísticas rápidas */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6"
      >
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Mesas Monitoradas</p>
          <p className="text-2xl font-bold">1,248</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Votos PL</p>
          <p className="text-2xl font-bold">42,567</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-600">Votos Totais</p>
          <p className="text-2xl font-bold">89,321</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
          <p className="text-sm text-gray-600">Observadores</p>
          <p className="text-2xl font-bold">2,450</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
          <p className="text-sm text-gray-600">Discrepâncias</p>
          <p className="text-2xl font-bold">12</p>
        </div>
      </motion.div>

      {/* Filtros */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPinIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Filtrar por localidade..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300"
              value={filtroLocalidade}
              onChange={(e) => setFiltroLocalidade(e.target.value)}
            />
          </div>

          <select
            value={filtroTipoEleicao}
            onChange={(e) => setFiltroTipoEleicao(e.target.value)}
            className="block px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            <option value="todas">Todos os Tipos</option>
            <option value="presidencial">Presidencial</option>
            <option value="legislativa">Legislativa</option>
            <option value="autarquica">Autárquica</option>
          </select>

          <input
            type="text"
            placeholder="Buscar observador..."
            className="block px-4 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resultados por Mesa */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Resultados por Mesa de Voto</h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                Exportar
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Novo Registro
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Localidade
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mesa
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Votos PL
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Votos
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Presença
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dadosResultados.map((resultado) => (
                  <tr key={resultado.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{resultado.localidade}</div>
                      <div className="text-sm text-gray-500">{resultado.tipoEleicao}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{resultado.mesaVoto}</div>
                      <div className="text-sm text-gray-500">{resultado.observador}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{resultado.votosPL}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{resultado.totalVotos}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{resultado.presencaUrna}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        resultado.status === 'verificado' ? 'bg-green-100 text-green-800' :
                        resultado.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {resultado.status === 'verificado' ? 'Verificado' : 
                         resultado.status === 'pendente' ? 'Pendente' : 'Em Revisão'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Painel de Comparação e Alertas */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Comparação com Resultados Oficiais */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ChartBarIcon className="h-5 w-5 mr-2 text-blue-600" />
              Comparação com Resultados Oficiais
            </h3>
            
            <div className="space-y-4">
              {dadosComparacao.map((dado, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">{dado.localidade}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      dado.discrepancia === 'Baixa' ? 'bg-green-100 text-green-800' :
                      dado.discrepancia === 'Moderada' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {dado.discrepancia}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="text-gray-500">Paralelo</div>
                      <div className="font-medium">{dado.votosParalelo.toLocaleString()}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500">Oficial</div>
                      <div className="font-medium">{dado.votosOficial.toLocaleString()}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500">Dif.</div>
                      <div className={`font-medium ${dado.diferenca >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {dado.diferenca > 0 ? '+' : ''}{dado.diferenca}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alertas e Discrepâncias */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ExclamationTriangleIcon className="h-5 w-5 mr-2 text-red-600" />
              Alertas & Discrepâncias
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-sm font-medium text-red-800">Mesa 002-B - Huambo</div>
                <div className="text-xs text-red-600">Diferença significativa de 45 votos</div>
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="text-sm font-medium text-yellow-800">Mesa 004-D - Cabinda</div>
                <div className="text-xs text-yellow-600">Aguardando confirmação de dados</div>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm font-medium text-blue-800">Novos dados recebidos</div>
                <div className="text-xs text-blue-600">25 mesas atualizadas nas últimas 2h</div>
              </div>
            </div>
          </div>

          {/* Informações do Centro */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BuildingOfficeIcon className="h-5 w-5 mr-2 text-gray-600" />
              Centro de Escrutínio
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <span className="text-sm font-medium text-green-600">Operacional</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Última atualização:</span>
                <span className="text-sm font-medium text-gray-900">Há 12 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Confiabilidade:</span>
                <span className="text-sm font-medium text-gray-900">98.7%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}