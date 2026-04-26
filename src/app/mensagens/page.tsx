'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon, UserCircleIcon, MapPinIcon, BuildingOfficeIcon, GlobeAltIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { membrosMock } from '@/data/membros';

export default function MensagensPage() {
  const [destinatarioTipo, setDestinatarioTipo] = useState<'individual' | 'municipio' | 'provincia' | 'pais'>('municipio');
  const [pais, setPais] = useState<string>('Angola'); // País padrão
  const [destinatario, setDestinatario] = useState<string>('');
  const [assunto, setAssunto] = useState<string>('');
  const [mensagem, setMensagem] = useState<string>('');
  const [enviando, setEnviando] = useState<boolean>(false);
  const [enviado, setEnviado] = useState<boolean>(false);

  // Definindo dados por país
  const dadosPorPais: Record<string, { municipios: string[], provincias: string[] }> = {
    'Angola': {
      municipios: ['Luanda', 'Huambo', 'Benguela', 'Lobito', 'Cabinda', 'Malanje', 'Lubango', 'Namibe', 'Uige', 'Soio'],
      provincias: ['Luanda', 'Huambo', 'Benguela', 'Cabinda', 'Cuando Cubango', 'Cuanza Norte', 'Cuanza Sul', 'Cunene', 'Huila', 'Malanje', 'Moxico', 'Namibe', 'Uíge', 'Zaire']
    },
    'Moçambique': {
      municipios: ['Maputo', 'Matola', 'Beira', 'Nampula', 'Chimoio', 'Quelimane', 'Tete', 'Xai-Xai', 'Inhambane', 'Pemba'],
      provincias: ['Maputo Cidade', 'Maputo Província', 'Sofala', 'Nampula', 'Cabo Delgado', 'Zambezia', 'Tete', 'Manica', 'Gaza', 'Inhambane', 'Niassa']
    },
    'Cabo Verde': {
      municipios: ['Praia', 'Mindelo', 'Espargos', 'Sal Rei', 'Santa Maria', 'Tarrafal', 'Porto Novo', 'Ribeira Grande', 'Cova Figueira', 'Mosteiros'],
      provincias: ['Santiago', 'São Vicente', 'Sal', 'Boa Vista', 'Maio', 'Ribeira Grande', 'Fogo', 'Brava']
    }
  };

  const paises = ['Angola', 'Moçambique', 'Cabo Verde'];

  const handleEnviarMensagem = () => {
    setEnviando(true);
    
    // Simulação de envio de mensagem
    setTimeout(() => {
      setEnviando(false);
      setEnviado(true);
      
      // Resetar após 3 segundos
      setTimeout(() => {
        setEnviado(false);
        setAssunto('');
        setMensagem('');
        setDestinatario('');
      }, 3000);
    }, 2000);
  };

  const getMembrosPorDestinatario = () => {
    if (destinatarioTipo === 'municipio') {
      return membrosMock.filter(membro => membro.endereco.cidade === destinatario);
    } else if (destinatarioTipo === 'provincia') {
      return membrosMock.filter(membro => membro.endereco.provincia === destinatario);
    } else if (destinatarioTipo === 'pais') {
      // Para simplificação, assumindo que todos os membros são do mesmo país
      return membrosMock; 
    }
    return [];
  };

  const membrosParaEnviar = getMembrosPorDestinatario();
  const numeroDestinatarios = destinatarioTipo === 'individual' ? 1 : membrosParaEnviar.length;

  // Obter municípios e províncias com base no país selecionado
  const municipios = dadosPorPais[pais as keyof typeof dadosPorPais]?.municipios || [];
  const provincias = dadosPorPais[pais as keyof typeof dadosPorPais]?.provincias || [];

  return (
    <div className="space-y-6 mensagem-page-text">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Sistema de Mensagens</h1>
        <p className="text-gray-600 mt-2">Envie mensagens em massa para membros da Juventude do PL</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Painel de envio */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Nova Mensagem</h2>
          
          <div className="space-y-6">
            {/* Tipo de destinatário */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Destinatário</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'municipio', label: 'Município', icon: MapPinIcon },
                  { id: 'provincia', label: 'Província', icon: BuildingOfficeIcon },
                  { id: 'pais', label: 'País', icon: GlobeAltIcon },
                  { id: 'individual', label: 'Individual', icon: UserCircleIcon },
                ].map((tipo) => (
                  <button
                    key={tipo.id}
                    type="button"
                    onClick={() => setDestinatarioTipo(tipo.id as 'individual' | 'municipio' | 'provincia' | 'pais')}
                    className={`flex items-center justify-center p-3 rounded-lg border ${
                      destinatarioTipo === tipo.id
                        ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <tipo.icon className="h-5 w-5 mr-2" />
                    {tipo.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Seleção de país quando o tipo é país, província ou município */}
            {(destinatarioTipo === 'municipio' || destinatarioTipo === 'provincia' || destinatarioTipo === 'pais') && (
              <div>
                <label htmlFor="pais" className="block text-sm font-medium text-gray-700 mb-2">
                  Selecione o País
                </label>
                <select
                  id="pais"
                  value={pais}
                  onChange={(e) => {
                    setPais(e.target.value);
                    setDestinatario(''); // Limpar seleção anterior quando país muda
                  }}
                  className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                >
                  <option value="">Selecione um país</option>
                  {paises.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Seleção de destinatário */}
            <div>
              <label htmlFor="destinatario" className="block text-sm font-medium text-gray-700 mb-2">
                {destinatarioTipo === 'individual' 
                  ? 'Selecione o Membro' 
                  : destinatarioTipo === 'municipio' 
                    ? 'Selecione o Município' 
                    : destinatarioTipo === 'provincia' 
                      ? 'Selecione a Província' 
                      : 'País'}
              </label>
              
              {destinatarioTipo === 'individual' ? (
                <select
                  id="destinatario"
                  value={destinatario}
                  onChange={(e) => setDestinatario(e.target.value)}
                  className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                >
                  <option value="">Selecione um membro</option>
                  {membrosMock.map(membro => (
                    <option key={membro.id} value={membro.id}>
                      {membro.nome} - {membro.endereco.cidade}, {membro.endereco.provincia}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  id="destinatario"
                  value={destinatario}
                  onChange={(e) => setDestinatario(e.target.value)}
                  className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                >
                  <option value="">Selecione {destinatarioTipo === 'municipio' ? 'um município' : 'uma província'}</option>
                  {(destinatarioTipo === 'municipio' ? municipios : provincias).map((item: string) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              )}
            </div>

            {/* Assunto */}
            <div>
              <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-2">
                Assunto
              </label>
              <input
                type="text"
                id="assunto"
                value={assunto}
                onChange={(e) => setAssunto(e.target.value)}
                className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Digite o assunto da mensagem"
              />
            </div>

            {/* Mensagem */}
            <div>
              <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
                Mensagem
              </label>
              <textarea
                id="mensagem"
                rows={6}
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Digite sua mensagem aqui..."
              />
            </div>

            {/* Botão de envio */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleEnviarMensagem}
                disabled={enviando || !destinatario || !assunto || !mensagem}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white ${
                  enviando || !destinatario || !assunto || !mensagem
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-yellow-600 hover:bg-yellow-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500`}
              >
                {enviando ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : enviado ? (
                  'Mensagem Enviada!'
                ) : (
                  <>
                    <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                    Enviar Mensagem
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Painel de informações */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Destinatários */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Destinatários</h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <GlobeAltIcon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">País</p>
                  <p className="text-sm text-gray-500">
                    {pais || 'Nenhum selecionado'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <MapPinIcon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {destinatarioTipo === 'individual' ? 'Membro Individual' : destinatarioTipo}
                  </p>
                  <p className="text-sm text-gray-500">
                    {destinatario || 'Nenhum selecionado'}
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <UserCircleIcon className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Número de Destinatários</p>
                    <p className="text-2xl font-bold text-gray-900">{numeroDestinatarios}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Histórico de mensagens */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Histórico Recente</h3>
            
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={`historico-${item}`} className="flex items-start">
                  <div className="flex-shrink-0 pt-1">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                      <EnvelopeIcon className="h-4 w-4 text-yellow-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Convite para reunião</p>
                    <p className="text-sm text-gray-500">Para: Membros de {pais}</p>
                    <p className="text-xs text-gray-400">Há 2 dias</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estatísticas */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Mensagens Enviadas</span>
                <span className="text-sm font-medium text-gray-900">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Taxa de Abertura</span>
                <span className="text-sm font-medium text-gray-900">87%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Respostas</span>
                <span className="text-sm font-medium text-gray-900">18</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}