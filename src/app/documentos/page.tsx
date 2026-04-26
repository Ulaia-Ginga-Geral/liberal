'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DocumentTextIcon, FolderIcon, ArrowDownTrayIcon, UserIcon, ClockIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function DocumentosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const documentos = [
    {
      id: '1',
      titulo: 'Estatutos da Juventude do PL',
      tipo: 'Documento',
      tamanho: '2.4 MB',
      dataUpload: '2023-11-15',
      autor: 'Administração Central',
      descricao: 'Estatutos atualizados da Juventude do Partido Liberal'
    },
    {
      id: '2',
      titulo: 'Relatório de Atividades 2023',
      tipo: 'PDF',
      tamanho: '5.1 MB',
      dataUpload: '2024-01-10',
      autor: 'Departamento de Atividades',
      descricao: 'Relatório anual das atividades da juventude'
    },
    {
      id: '3',
      titulo: 'Plano Estratégico 2024-2027',
      tipo: 'Documento',
      tamanho: '3.7 MB',
      dataUpload: '2024-01-05',
      autor: 'Coordenação Nacional',
      descricao: 'Plano estratégico para os próximos 3 anos'
    },
    {
      id: '4',
      titulo: 'Regulamento Interno',
      tipo: 'PDF',
      tamanho: '1.8 MB',
      dataUpload: '2023-12-20',
      autor: 'Comissão Disciplinar',
      descricao: 'Regulamento interno da Juventude do PL'
    },
    {
      id: '5',
      titulo: 'Modelo de Inscrição',
      tipo: 'Documento',
      tamanho: '0.5 MB',
      dataUpload: '2023-10-15',
      autor: 'Departamento de Membros',
      descricao: 'Modelo padrão para inscrição de novos membros'
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
        <h1 className="text-3xl font-bold text-gray-900">Documentos e Arquivos</h1>
        <p className="text-gray-600 mt-2">Central de documentos da Juventude do Partido Liberal</p>
      </motion.div>

      {/* Busca e ações */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
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
              placeholder="Buscar documentos..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button className="flex items-center px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-secondary-blue transition-colors">
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Novo Documento
          </button>
        </div>
      </motion.div>

      {/* Lista de documentos */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {documentos.map((doc, index) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                  <DocumentTextIcon className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{doc.titulo}</h3>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">{doc.descricao}</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <FolderIcon className="h-4 w-4 mr-1" />
                    <span>{doc.tipo}</span>
                    <span className="mx-2">•</span>
                    <span>{doc.tamanho}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <UserIcon className="h-4 w-4 mr-1" />
                    <span>{doc.autor}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    <span>{new Date(doc.dataUpload).toLocaleDateString('pt-PT')}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-3">
                  <button className="text-sm font-medium text-yellow-600 hover:text-yellow-800">
                    Visualizar
                  </button>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                    Baixar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}