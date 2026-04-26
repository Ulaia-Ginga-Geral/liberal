'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, FunnelIcon, CalendarIcon, MapPinIcon, UserGroupIcon, CurrencyDollarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { atividadesMock, getTipoAtividadeColor, getStatusAtividadeColor } from '@/data/atividades';
import { Membro, membrosMock } from '@/data/membros';
import { Atividade } from '@/data/atividades';

export default function AtividadesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [tipoFilter, setTipoFilter] = useState<string>('todos');
  const [showFilters, setShowFilters] = useState(false);

  // Filtrar atividades com base na busca e filtros
  const atividadesFiltradas = useMemo(() => {
    let filtered = [...atividadesMock];

    // Filtro de busca
    if (searchTerm) {
      filtered = filtered.filter(atividade =>
        atividade.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        atividade.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        atividade.local.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro de status
    if (statusFilter !== 'todos') {
      filtered = filtered.filter(atividade => atividade.status === statusFilter);
    }

    // Filtro de tipo
    if (tipoFilter !== 'todos') {
      filtered = filtered.filter(atividade => atividade.tipo === tipoFilter);
    }

    return filtered;
  }, [searchTerm, statusFilter, tipoFilter]);

  // Contadores de status
  const contadoresStatus = {
    planejada: atividadesMock.filter(a => a.status === 'planejada').length,
    'em-andamento': atividadesMock.filter(a => a.status === 'em-andamento').length,
    concluida: atividadesMock.filter(a => a.status === 'concluida').length,
    cancelada: atividadesMock.filter(a => a.status === 'cancelada').length,
  };

  // Contadores por tipo
  const contadoresTipo = {
    reuniao: atividadesMock.filter(a => a.tipo === 'reuniao').length,
    evento: atividadesMock.filter(a => a.tipo === 'evento').length,
    campanha: atividadesMock.filter(a => a.tipo === 'campanha').length,
    formacao: atividadesMock.filter(a => a.tipo === 'formacao').length,
    visita: atividadesMock.filter(a => a.tipo === 'visita').length,
  };

  // Função para obter membros da mesma província
  const getMembrosPorProvincia = (provincia: string): Membro[] => {
    return membrosMock.filter(membro => membro.endereco.provincia === provincia);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Atividades Políticas</h1>
        <p className="text-gray-600 mt-2">Gestão e planejamento de atividades da Juventude do PL</p>
      </motion.div>

      {/* Estatísticas rápidas */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6"
      >
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-gray-500">
          <p className="text-sm text-gray-600">Planejadas</p>
          <p className="text-2xl font-bold">{contadoresStatus.planejada}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Em Andamento</p>
          <p className="text-2xl font-bold">{contadoresStatus['em-andamento']}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Concluídas</p>
          <p className="text-2xl font-bold">{contadoresStatus.concluida}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
          <p className="text-sm text-gray-600">Canceladas</p>
          <p className="text-2xl font-bold">{contadoresStatus.cancelada}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-2xl font-bold">{atividadesMock.length}</p>
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
              placeholder="Buscar atividades..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Botões de filtros */}
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                <FunnelIcon className="h-4 w-4 mr-2" />
                Filtros
              </button>

              {showFilters && (
                <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
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
                          checked={statusFilter === 'planejada'}
                          onChange={() => setStatusFilter('planejada')}
                        />
                        Planejadas
                      </label>
                      <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          className="mr-2"
                          checked={statusFilter === 'em-andamento'}
                          onChange={() => setStatusFilter('em-andamento')}
                        />
                        Em Andamento
                      </label>
                      <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          className="mr-2"
                          checked={statusFilter === 'concluida'}
                          onChange={() => setStatusFilter('concluida')}
                        />
                        Concluídas
                      </label>
                      <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          className="mr-2"
                          checked={statusFilter === 'cancelada'}
                          onChange={() => setStatusFilter('cancelada')}
                        />
                        Canceladas
                      </label>
                    </div>
                    
                    <div className="px-4 py-2 border-b mt-2">
                      <h3 className="text-sm font-medium text-gray-900">Tipo</h3>
                    </div>
                    <div className="py-1">
                      <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <input
                          type="radio"
                          name="tipo"
                          className="mr-2"
                          checked={tipoFilter === 'todos'}
                          onChange={() => setTipoFilter('todos')}
                        />
                        Todos
                      </label>
                      <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <input
                          type="radio"
                          name="tipo"
                          className="mr-2"
                          checked={tipoFilter === 'reuniao'}
                          onChange={() => setTipoFilter('reuniao')}
                        />
                        Reuniões
                      </label>
                      <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <input
                          type="radio"
                          name="tipo"
                          className="mr-2"
                          checked={tipoFilter === 'evento'}
                          onChange={() => setTipoFilter('evento')}
                        />
                        Eventos
                      </label>
                      <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <input
                          type="radio"
                          name="tipo"
                          className="mr-2"
                          checked={tipoFilter === 'campanha'}
                          onChange={() => setTipoFilter('campanha')}
                        />
                        Campanhas
                      </label>
                      <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <input
                          type="radio"
                          name="tipo"
                          className="mr-2"
                          checked={tipoFilter === 'formacao'}
                          onChange={() => setTipoFilter('formacao')}
                        />
                        Formações
                      </label>
                      <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <input
                          type="radio"
                          name="tipo"
                          className="mr-2"
                          checked={tipoFilter === 'visita'}
                          onChange={() => setTipoFilter('visita')}
                        />
                        Visitas
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lista de atividades */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {atividadesFiltradas.map((atividade, index) => {
          const membrosArea = getMembrosPorProvincia(atividade.provincia);
          
          return (
            <motion.div
              key={atividade.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTipoAtividadeColor(atividade.tipo)}`}>
                      {atividade.tipo.charAt(0).toUpperCase() + atividade.tipo.slice(1)}
                    </span>
                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusAtividadeColor(atividade.status)}`}>
                      {atividade.status === 'em-andamento' ? 'Em Andamento' : atividade.status === 'concluida' ? 'Concluída' : atividade.status === 'planejada' ? 'Planejada' : 'Cancelada'}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {new Date(atividade.data).toLocaleDateString('pt-PT')}
                  </div>
                </div>
                
                <h3 className="mt-4 text-lg font-bold text-gray-900">{atividade.titulo}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{atividade.descricao}</p>
                
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  <span>{atividade.local}, {atividade.cidade}, {atividade.provincia}</span>
                </div>
                
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  <span>{atividade.hora}</span>
                </div>
                
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <UserGroupIcon className="h-4 w-4 mr-1" />
                  <span>
                    {atividade.participantesConfirmados}/{atividade.participantesEsperados} confirmados ({membrosArea.length} membros na área)
                  </span>
                </div>
                
                {atividade.orcamento && (
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                    <span>{atividade.orcamento.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}</span>
                  </div>
                )}
                
                <div className="mt-6 flex justify-between">
                  <button className="text-sm font-medium text-yellow-600 hover:text-yellow-800">
                    Ver detalhes
                  </button>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                    Gerenciar
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      
      {atividadesFiltradas.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhuma atividade encontrada com os critérios selecionados.</p>
        </div>
      )}

      {/* Botão para adicionar nova atividade */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6"
      >
        <button className="w-14 h-14 rounded-full bg-yellow-500 text-white flex items-center justify-center shadow-lg hover:bg-yellow-600 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </motion.div>
    </div>
  );
}