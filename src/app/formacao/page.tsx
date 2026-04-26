'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AcademicCapIcon, CalendarIcon, ClockIcon, UserGroupIcon, BookOpenIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function FormacaoPage() {
  const [activeTab, setActiveTab] = useState('cursos');

  const cursos = [
    {
      id: 1,
      titulo: 'Liderança Política',
      descricao: 'Curso introdutório sobre liderança e gestão política',
      duracao: '40 horas',
      inscritos: 45,
      vagas: 50,
      inicio: '2024-02-15',
      status: 'ativo'
    },
    {
      id: 2,
      titulo: 'Comunicação Política',
      descricao: 'Técnicas de comunicação eficaz para ativistas políticos',
      duracao: '30 horas',
      inscritos: 32,
      vagas: 40,
      inicio: '2024-03-01',
      status: 'agendado'
    },
    {
      id: 3,
      titulo: 'Gestão de Campanhas',
      descricao: 'Planejamento e execução de campanhas políticas eficazes',
      duracao: '50 horas',
      inscritos: 28,
      vagas: 30,
      inicio: '2024-02-20',
      status: 'ativo'
    },
    {
      id: 4,
      titulo: 'Oratória e Debate',
      descricao: 'Técnicas de oratória e argumentação política',
      duracao: '25 horas',
      inscritos: 18,
      vagas: 25,
      inicio: '2024-02-25',
      status: 'ativo'
    }
  ];

  const certificados = [
    {
      id: 1,
      curso: 'Liderança Política',
      participante: 'Ana Maria Costa',
      dataConclusao: '2023-12-15',
      status: 'valido'
    },
    {
      id: 2,
      curso: 'Comunicação Política',
      participante: 'Carlos João Fernandes',
      dataConclusao: '2023-11-20',
      status: 'valido'
    },
    {
      id: 3,
      curso: 'Gestão de Campanhas',
      participante: 'Sofia Alexandra Nunes',
      dataConclusao: '2023-10-05',
      status: 'expirado'
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
        <h1 className="text-3xl font-bold text-gray-900">Programas de Formação</h1>
        <p className="text-gray-600 mt-2">Cursos e capacitações para membros da Juventude do PL</p>
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
              { id: 'cursos', name: 'Cursos Disponíveis', icon: BookOpenIcon },
              { id: 'inscricoes', name: 'Minhas Inscrições', icon: UserGroupIcon },
              { id: 'certificados', name: 'Certificados', icon: CheckCircleIcon },
              { id: 'historico', name: 'Histórico', icon: AcademicCapIcon },
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
          {activeTab === 'cursos' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cursos.map((curso, index) => (
                  <motion.div
                    key={curso.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow p-6 border border-gray-200"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{curso.titulo}</h3>
                        <p className="mt-2 text-sm text-gray-600">{curso.descricao}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        curso.status === 'ativo' ? 'bg-green-100 text-green-800' : 
                        curso.status === 'agendado' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {curso.status.charAt(0).toUpperCase() + curso.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        <span>{curso.duracao}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>Início: {new Date(curso.inicio).toLocaleDateString('pt-PT')}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <UserGroupIcon className="h-4 w-4 mr-1" />
                        <span>{curso.inscritos}/{curso.vagas} inscritos</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full" 
                          style={{ width: `${(curso.inscritos / curso.vagas) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-blue hover:bg-secondary-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                        Inscrever-se
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'inscricoes' && (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Curso
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data de Inscrição
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Progresso
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { id: 1, curso: 'Liderança Política', inscricao: '2024-01-15', progresso: 75, status: 'em andamento' },
                      { id: 2, curso: 'Comunicação Política', inscricao: '2024-01-20', progresso: 30, status: 'em andamento' },
                      { id: 3, curso: 'Oratória e Debate', inscricao: '2024-01-25', progresso: 100, status: 'concluído' },
                    ].map((inscricao) => (
                      <tr key={inscricao.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{inscricao.curso}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(inscricao.inscricao).toLocaleDateString('pt-PT')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-yellow-500 h-2 rounded-full" 
                                style={{ width: `${inscricao.progresso}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-500">{inscricao.progresso}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            inscricao.status === 'concluído' ? 'bg-green-100 text-green-800' : 
                            inscricao.status === 'em andamento' ? 'bg-blue-100 text-blue-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {inscricao.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-yellow-600 hover:text-yellow-900 mr-3">
                            Acessar
                          </button>
                          <button className="text-blue-600 hover:text-blue-900">
                            Certificado
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'certificados' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificados.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow p-6 border border-gray-200"
                  >
                    <div className="flex items-center">
                      <CheckCircleIcon className={`h-10 w-10 ${cert.status === 'valido' ? 'text-green-500' : 'text-red-500'}`} />
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900">{cert.curso}</h3>
                        <p className="text-sm text-gray-600">{cert.participante}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Data de Conclusão:</span>
                        <span className="text-sm font-medium text-gray-900">
                          {new Date(cert.dataConclusao).toLocaleDateString('pt-PT')}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Status:</span>
                        <span className={`text-sm font-medium ${
                          cert.status === 'valido' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {cert.status === 'valido' ? 'Válido' : 'Expirado'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex space-x-3">
                      <button className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                        Visualizar
                      </button>
                      <button className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-blue hover:bg-secondary-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                        Validar
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'historico' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Histórico de Formação</h3>
                <div className="space-y-4">
                  {[
                    { curso: 'Fundamentos da Democracia', data: '2023-08-15', horas: 20, status: 'completado' },
                    { curso: 'Ética Política', data: '2023-09-20', horas: 15, status: 'completado' },
                    { curso: 'Metodologia de Pesquisa', data: '2023-10-10', horas: 25, status: 'completado' },
                    { curso: 'Gestão Pública', data: '2023-11-05', horas: 30, status: 'em progresso' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{item.curso}</h4>
                        <p className="text-sm text-gray-600">{item.horas} horas • {new Date(item.data).toLocaleDateString('pt-PT')}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'completado' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {item.status === 'completado' ? 'Concluído' : 'Em Progresso'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}