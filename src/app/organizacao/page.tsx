'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BuildingOfficeIcon, UserGroupIcon, ChartBarIcon, ShieldCheckIcon, AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

export default function OrganizacaoPage() {
  const [activeTab, setActiveTab] = useState('estrutura');

  const estrutura = [
    {
      id: 1,
      nome: 'Coordenação Nacional',
      lider: 'Ana Silva',
      membros: 5,
      descricao: 'Coordenação geral da Juventude do PL'
    },
    {
      id: 2,
      nome: 'Departamento de Atividades',
      lider: 'Carlos Oliveira',
      membros: 8,
      descricao: 'Planejamento e execução de atividades políticas'
    },
    {
      id: 3,
      nome: 'Departamento de Membros',
      lider: 'Maria Santos',
      membros: 6,
      descricao: 'Recrutamento e manutenção de membros'
    },
    {
      id: 4,
      nome: 'Departamento de Comunicação',
      lider: 'Paulo Costa',
      membros: 4,
      descricao: 'Comunicação interna e externa'
    },
    {
      id: 5,
      nome: 'Comissão Disciplinar',
      lider: 'Roberto Ferreira',
      membros: 3,
      descricao: 'Supervisão e aplicação de normas internas'
    }
  ];

  const niveis = [
    { nome: 'Nacional', membros: 1247, representantes: 5 },
    { nome: 'Provincial', membros: 892, representantes: 12 },
    { nome: 'Municipal', membros: 634, representantes: 45 },
    { nome: 'Local', membros: 421, representantes: 128 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Estrutura Organizacional</h1>
        <p className="text-gray-600 mt-2">Hierarquia e departamentos da Juventude do Partido Liberal</p>
      </motion.div>

      {/* Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            {[
              { id: 'estrutura', name: 'Estrutura', icon: BuildingOfficeIcon },
              { id: 'niveis', name: 'Níveis Organizacionais', icon: ChartBarIcon },
              { id: 'departamentos', name: 'Departamentos', icon: BriefcaseIcon },
              { id: 'representacao', name: 'Representação', icon: UserGroupIcon },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } group inline-flex items-center py-4 px-6 border-b-2 font-medium text-sm`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'estrutura' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {estrutura.map((dept, index) => (
                  <motion.div
                    key={dept.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">{dept.nome}</h3>
                      <ShieldCheckIcon className="h-6 w-6 text-yellow-500" />
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{dept.descricao}</p>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Líder:</span>
                        <span className="text-sm font-medium text-gray-900">{dept.lider}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Membros:</span>
                        <span className="text-sm font-medium text-gray-900">{dept.membros}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <button className="text-sm font-medium text-yellow-600 hover:text-yellow-800">
                        Ver membros
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'niveis' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {niveis.map((nivel, index) => (
                  <motion.div
                    key={nivel.nome}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-primary-blue to-dark-blue rounded-lg p-6 text-white"
                  >
                    <h3 className="text-lg font-semibold">{nivel.nome}</h3>
                    <div className="mt-4 space-y-3">
                      <div>
                        <p className="text-sm text-blue-200">Membros</p>
                        <p className="text-2xl font-bold">{nivel.membros.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-200">Representantes</p>
                        <p className="text-2xl font-bold">{nivel.representantes}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'departamentos' && (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Departamento
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Líder
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Membros
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {estrutura.map((dept) => (
                      <tr key={dept.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{dept.nome}</div>
                          <div className="text-sm text-gray-500">{dept.descricao}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {dept.lider}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {dept.membros}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-yellow-600 hover:text-yellow-900 mr-4">
                            Gerenciar
                          </button>
                          <button className="text-blue-600 hover:text-blue-900">
                            Relatórios
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'representacao' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Mapa de Representação</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Representantes por Província</h4>
                    <ul className="space-y-2">
                      {[
                        { nome: 'Maputo Cidade', representantes: 5 },
                        { nome: 'Maputo Província', representantes: 7 },
                        { nome: 'Sofala', representantes: 4 },
                        { nome: 'Nampula', representantes: 6 },
                        { nome: 'Cabo Delgado', representantes: 3 },
                      ].map((prov) => (
                        <li key={prov.nome} className="flex justify-between">
                          <span>{prov.nome}</span>
                          <span className="font-medium">{prov.representantes}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Representantes por Gênero</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Masculino</span>
                        <span className="font-medium">68%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Feminino</span>
                        <span className="font-medium">32%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}