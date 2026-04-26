'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, FunnelIcon, ArrowsUpDownIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { membrosMock, getStatusColor, getEngajamentoColor } from '@/data/membros';
import { Membro } from '@/data/membros';
import DetalhesMembroModal from '@/components/membros/DetalhesMembroModal';

export default function MembrosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [ordenacao, setOrdenacao] = useState<string>('nome');
  const [showFilters, setShowFilters] = useState(false);
  const [membroSelecionado, setMembroSelecionado] = useState<Membro | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  // Filtrar membros com base na busca e filtro de status
  const membrosFiltrados = useMemo(() => {
    let filtered = [...membrosMock];

    // Filtro de busca
    if (searchTerm) {
      filtered = filtered.filter(membro =>
        membro.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        membro.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        membro.numeroIdentificacao.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro de status
    if (statusFilter !== 'todos') {
      filtered = filtered.filter(membro => membro.status === statusFilter);
    }

    // Ordenação
    filtered.sort((a, b) => {
      if (ordenacao === 'nome') {
        return a.nome.localeCompare(b.nome);
      } else if (ordenacao === 'data-inscricao') {
        return new Date(b.dataInscricao).getTime() - new Date(a.dataInscricao).getTime();
      } else if (ordenacao === 'atividades') {
        return b.atividadesParticipadas - a.atividadesParticipadas;
      }
      return 0;
    });

    return filtered;
  }, [searchTerm, statusFilter, ordenacao]);

  // Contadores de status
  const contadoresStatus = {
    ativo: membrosMock.filter(m => m.status === 'ativo').length,
    inativo: membrosMock.filter(m => m.status === 'inativo').length,
    reserva: membrosMock.filter(m => m.status === 'reserva').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Membros da Juventude</h1>
        <p className="text-gray-600 mt-2">Gerencie e visualize os membros da organização</p>
      </motion.div>

      {/* Estatísticas rápidas */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
      >
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Ativos</p>
          <p className="text-2xl font-bold">{contadoresStatus.ativo}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
          <p className="text-sm text-gray-600">Inativos</p>
          <p className="text-2xl font-bold">{contadoresStatus.inativo}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-600">Reserva</p>
          <p className="text-2xl font-bold">{contadoresStatus.reserva}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-2xl font-bold">{membrosMock.length}</p>
        </div>
      </motion.div>

      {/* Filtros e busca */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Barra de pesquisa */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar membros..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Botão de filtros */}
          <div className="flex space-x-3">
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                <FunnelIcon className="h-4 w-4 mr-2" />
                Filtros
                <ChevronDownIcon className="h-4 w-4 ml-2" />
              </button>

              {showFilters && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b">
                      <h3 className="text-sm font-medium text-gray-900">Status</h3>
                    </div>
                    <div className="py-1">
                      <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          className="mr-2"
                          checked={statusFilter === 'todos'}
                          onChange={() => setStatusFilter('todos')}
                        />
                        Todos
                      </label>
                      <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          className="mr-2"
                          checked={statusFilter === 'ativo'}
                          onChange={() => setStatusFilter('ativo')}
                        />
                        Ativos
                      </label>
                      <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          className="mr-2"
                          checked={statusFilter === 'inativo'}
                          onChange={() => setStatusFilter('inativo')}
                        />
                        Inativos
                      </label>
                      <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          className="mr-2"
                          checked={statusFilter === 'reserva'}
                          onChange={() => setStatusFilter('reserva')}
                        />
                        Reserva
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Ordenação */}
            <div className="relative">
              <select
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
                className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                <option value="nome">Ordenar por Nome</option>
                <option value="data-inscricao">Data de Inscrição</option>
                <option value="atividades">Atividades Participadas</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ArrowsUpDownIcon className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lista de membros */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Membro
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contato
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engajamento
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Atividades
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {membrosFiltrados.map((membro, index) => (
                <motion.tr 
                  key={membro.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold">
                          {membro.nome.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{membro.nome}</div>
                        <div className="text-sm text-gray-500">{membro.cargo}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{membro.email}</div>
                    <div className="text-sm text-gray-500">{membro.telefone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(membro.status)}`}>
                      {membro.status.charAt(0).toUpperCase() + membro.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getEngajamentoColor(membro.nivelEngajamento)}`}>
                      {membro.nivelEngajamento.charAt(0).toUpperCase() + membro.nivelEngajamento.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {membro.atividadesParticipadas}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-yellow-600 hover:text-yellow-900 mr-4"
                      onClick={() => {
                        setMembroSelecionado(membro);
                        setModalAberto(true);
                      }}
                    >
                      Visualizar
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      Editar
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {membrosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum membro encontrado com os critérios selecionados.</p>
          </div>
        )}
      </motion.div>
      
      {/* Modal de detalhes do membro */}
      <DetalhesMembroModal 
        membro={membroSelecionado}
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
      />
    </div>
  );
}