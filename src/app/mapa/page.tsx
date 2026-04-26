'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { 
  MapPinIcon, 
  UserGroupIcon, 
  BuildingOfficeIcon,
  ChartBarIcon,
  FunnelIcon,
  ArrowsPointingOutIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { provinciasAngola, getMunicipiosPorProvincia, Municipio } from '@/data/geografia';
import { membrosMock, Membro } from '@/data/membros';

// Import dinâmico para evitar problemas SSR com Leaflet
const MapWithNoSSR = dynamic(
  () => import('@/components/mapa/MapaMembros'),
  { ssr: false }
);

interface FiltrosMapa {
  provincia: string;
  municipio: string;
  nivelEngajamento: string;
  status: string;
}

export default function MapaPage() {
  const [filtros, setFiltros] = useState<FiltrosMapa>({
    provincia: '',
    municipio: '',
    nivelEngajamento: '',
    status: ''
  });
  const [membrosFiltrados, setMembrosFiltrados] = useState<Membro[]>(membrosMock);
  const [municipiosDisponiveis, setMunicipiosDisponiveis] = useState<Municipio[]>([]);
  const [mostrarLegenda, setMostrarLegenda] = useState(false);

  // Coordenadas aproximadas das capitais provinciais de Angola
  const coordenadasProvincias: Record<string, [number, number]> = {
    '1': [-8.8368, 13.2343], // Luanda
    '2': [-14.9172, 13.5419], // Huíla (Lubango)
    '3': [-12.5720, 13.4055], // Benguela
    '4': [-12.7667, 15.7353], // Huambo
    '6': [-5.5500, 12.2000], // Cabinda
  };

  useEffect(() => {
    // Filtrar membros com base nos filtros selecionados
    let resultado = [...membrosMock];
    
    if (filtros.provincia) {
      const nomeProvincia = provinciasAngola.find(p => p.id === filtros.provincia)?.nome;
      if (nomeProvincia) {
        resultado = resultado.filter(membro => membro.endereco.provincia === nomeProvincia);
      }
      
      // Atualizar municípios disponíveis
      const municipios = getMunicipiosPorProvincia(filtros.provincia);
      setMunicipiosDisponiveis(municipios);
    }
    
    if (filtros.municipio) {
      const nomeMunicipio = municipiosDisponiveis.find(m => m.id === filtros.municipio)?.nome;
      if (nomeMunicipio) {
        resultado = resultado.filter(membro => membro.endereco.cidade === nomeMunicipio);
      }
    }
    
    if (filtros.nivelEngajamento) {
      resultado = resultado.filter(membro => membro.nivelEngajamento === filtros.nivelEngajamento);
    }
    
    if (filtros.status) {
      resultado = resultado.filter(membro => membro.status === filtros.status);
    }
    
    setMembrosFiltrados(resultado);
  }, [filtros, municipiosDisponiveis]);

  const handleLimparFiltros = () => {
    setFiltros({
      provincia: '',
      municipio: '',
      nivelEngajamento: '',
      status: ''
    });
    setMunicipiosDisponiveis([]);
  };

  const getCorMarcador = (nivelEngajamento: string) => {
    switch (nivelEngajamento) {
      case 'alto': return '#10B981'; // Verde
      case 'medio': return '#F59E0B'; // Amarelo
      case 'baixo': return '#EF4444'; // Vermelho
      default: return '#6B7280'; // Cinza
    }
  };

  // Agrupar membros por província para a legenda
  const membrosPorProvincia = membrosFiltrados.reduce((acc: Record<string, Membro[]>, membro) => {
    const provincia = membro.endereco.provincia;
    if (!acc[provincia]) {
      acc[provincia] = [];
    }
    acc[provincia].push(membro);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mapa de Membros</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Visualize a distribuição geográfica dos membros do Partido Liberal em Angola
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Painel de filtros */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 h-fit"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <FunnelIcon className="h-5 w-5 mr-2" />
            Filtros
          </h2>
          
          <div className="space-y-4">
            {/* Filtro por Província */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Província
              </label>
              <select
                value={filtros.provincia}
                onChange={(e) => setFiltros({...filtros, provincia: e.target.value, municipio: ''})}
                className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="">Todas as províncias</option>
                {provinciasAngola.map(provincia => (
                  <option key={provincia.id} value={provincia.id}>
                    {provincia.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro por Município */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Município
              </label>
              <select
                value={filtros.municipio}
                onChange={(e) => setFiltros({...filtros, municipio: e.target.value})}
                disabled={!filtros.provincia}
                className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 disabled:opacity-50"
              >
                <option value="">Todos os municípios</option>
                {municipiosDisponiveis.map(municipio => (
                  <option key={municipio.id} value={municipio.id}>
                    {municipio.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro por Nível de Engajamento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nível de Engajamento
              </label>
              <select
                value={filtros.nivelEngajamento}
                onChange={(e) => setFiltros({...filtros, nivelEngajamento: e.target.value})}
                className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="">Todos os níveis</option>
                <option value="alto">Alto</option>
                <option value="medio">Médio</option>
                <option value="baixo">Baixo</option>
              </select>
            </div>

            {/* Filtro por Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={filtros.status}
                onChange={(e) => setFiltros({...filtros, status: e.target.value})}
                className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="">Todos os status</option>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
                <option value="reserva">Reserva</option>
              </select>
            </div>

            {/* Botão para limpar filtros */}
            <button
              onClick={handleLimparFiltros}
              className="w-full py-2 px-4 bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 text-gray-800 dark:text-white font-medium rounded-lg transition-colors duration-300"
            >
              Limpar Filtros
            </button>
          </div>
        </motion.div>

        {/* Área do mapa */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <MapPinIcon className="h-5 w-5 mr-2" />
              Distribuição Geográfica por Áreas
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setMostrarLegenda(!mostrarLegenda)}
                className="flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
              >
                <InformationCircleIcon className="h-4 w-4 mr-1" />
                Legenda
              </button>
            </div>
          </div>
          
          {/* Legenda explicativa */}
          {mostrarLegenda && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Legenda do Mapa</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                  <span className="text-gray-700 dark:text-gray-300">50+ membros (Alta concentração)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                  <span className="text-gray-700 dark:text-gray-300">20-49 membros (Média concentração)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                  <span className="text-gray-700 dark:text-gray-300">5-19 membros (Baixa concentração)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-400 rounded mr-2"></div>
                  <span className="text-gray-700 dark:text-gray-300">1-4 membros (Muito baixa)</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                Os números nos círculos indicam o total de membros em cada área. Clique nas áreas para ver detalhes.
              </p>
            </motion.div>
          )}
          
          <div className="h-96 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-600">
            <MapWithNoSSR 
              membros={membrosFiltrados}
              coordenadasProvincias={coordenadasProvincias}
              getCorMarcador={getCorMarcador}
            />
          </div>
        </motion.div>
      </div>

      {/* Estatísticas por província */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Distribuição por Províncias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(membrosPorProvincia)
            .sort(([,a], [,b]) => b.length - a.length)
            .map(([provincia, membrosNaProvincia]) => {
              let corBadge;
              if (membrosNaProvincia.length >= 50) corBadge = 'bg-green-100 text-green-800';
              else if (membrosNaProvincia.length >= 20) corBadge = 'bg-yellow-100 text-yellow-800';
              else if (membrosNaProvincia.length >= 5) corBadge = 'bg-blue-100 text-blue-800';
              else corBadge = 'bg-gray-100 text-gray-800';
              
              return (
                <div key={provincia} className="p-4 border border-gray-200 dark:border-slate-600 rounded-lg">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900 dark:text-white">{provincia}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${corBadge}`}>
                      {membrosNaProvincia.length} membros
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <div>Alto engajamento: {membrosNaProvincia.filter(m => m.nivelEngajamento === 'alto').length}</div>
                    <div>Médio engajamento: {membrosNaProvincia.filter(m => m.nivelEngajamento === 'medio').length}</div>
                    <div>Baixo engajamento: {membrosNaProvincia.filter(m => m.nivelEngajamento === 'baixo').length}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </motion.div>

      {/* Estatísticas gerais */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <UserGroupIcon className="h-8 w-8 text-blue-500 dark:text-blue-400 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{membrosFiltrados.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Membros encontrados</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <BuildingOfficeIcon className="h-8 w-8 text-green-500 dark:text-green-400 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {Object.keys(membrosPorProvincia).length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Províncias ativas</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <ChartBarIcon className="h-8 w-8 text-yellow-500 dark:text-yellow-400 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {(membrosFiltrados.reduce((acc, m) => acc + m.atividadesParticipadas, 0) / membrosFiltrados.length || 0).toFixed(1)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Média de atividades</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <ArrowsPointingOutIcon className="h-8 w-8 text-purple-500 dark:text-purple-400 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {membrosFiltrados.filter(m => m.nivelEngajamento === 'alto').length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Alto engajamento</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}