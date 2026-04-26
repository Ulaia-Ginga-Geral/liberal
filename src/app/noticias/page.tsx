'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { NewspaperIcon, UserCircleIcon, CalendarIcon, ChatBubbleLeftRightIcon, ShareIcon, HeartIcon } from '@heroicons/react/24/outline';

export default function NoticiasPage() {
  const [activeTab, setActiveTab] = useState('todas');
  const [favoritas, setFavoritas] = useState<number[]>([]);

  const noticias = [
    {
      id: 1,
      titulo: 'Juventude do PL lança campanha de participação política',
      resumo: 'Nova iniciativa visa aumentar a participação jovem na vida política do país',
      conteudo: 'A Juventude do Partido Liberal lançou oficialmente a campanha "Jovens em Ação", com objetivo de incentivar a participação política dos jovens moçambicanos. A iniciativa prevê a realização de debates, workshops e fóruns em todas as províncias do país.',
      autor: 'Maria Conceição',
      dataPublicacao: '2024-01-15',
      categoria: 'política',
      comentarios: 24,
      likes: 142,
      imagem: '/images/noticias/campanha-politica.jpg',
      tags: ['juventude', 'política', 'participação']
    },
    {
      id: 2,
      titulo: 'Congresso Nacional da Juventude do PL tem data marcada',
      resumo: 'Evento será realizado em março e contará com delegados de todas as províncias',
      conteudo: 'O Congresso Nacional da Juventude do Partido Liberal está marcado para os dias 15 a 18 de março de 2024. O evento contará com a participação de delegados de todas as províncias do país e terá como principal agenda a eleição da nova direção nacional da juventude.',
      autor: 'Carlos Mendes',
      dataPublicacao: '2024-01-10',
      categoria: 'organização',
      comentarios: 18,
      likes: 98,
      imagem: '/images/noticias/congresso-nacional.jpg',
      tags: ['congresso', 'organização', 'eleições']
    },
    {
      id: 3,
      titulo: 'Formação de quadros fortalece Juventude do PL',
      resumo: 'Mais de 200 jovens completaram curso de liderança política',
      conteudo: 'A Juventude do Partido Liberal concluiu com sucesso o curso de Liderança Política, com a participação de 245 jovens membros de diferentes províncias. O curso teve duração de 40 horas e abordou temas como ética política, comunicação e gestão de projetos.',
      autor: 'Ana Rita',
      dataPublicacao: '2024-01-05',
      categoria: 'formação',
      comentarios: 31,
      likes: 176,
      imagem: '/images/noticias/formacao-quadros.jpg',
      tags: ['formação', 'liderança', 'educação']
    },
    {
      id: 4,
      titulo: 'Nova sede da Juventude do PL inaugurada em Maputo',
      resumo: 'Instalações modernas irão apoiar as atividades da juventude partidária',
      conteudo: 'Foi inaugurada oficialmente a nova sede da Juventude do Partido Liberal em Maputo. As modernas instalações contam com salas de reunião, auditório e biblioteca, oferecendo melhores condições para o desenvolvimento das atividades da juventude partidária.',
      autor: 'Pedro António',
      dataPublicacao: '2023-12-20',
      categoria: 'infraestrutura',
      comentarios: 12,
      likes: 85,
      imagem: '/images/noticias/nova-sede.jpg',
      tags: ['infraestrutura', 'instalações', 'desenvolvimento']
    }
  ];

  const toggleFavorito = (id: number) => {
    if (favoritas.includes(id)) {
      setFavoritas(favoritas.filter(favId => favId !== id));
    } else {
      setFavoritas([...favoritas, id]);
    }
  };

  const noticiasFiltradas = activeTab === 'favoritas' 
    ? noticias.filter(noticia => favoritas.includes(noticia.id))
    : noticias;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Notícias e Comunicações</h1>
        <p className="text-gray-600 mt-2">Últimas notícias e comunicados da Juventude do Partido Liberal</p>
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
              { id: 'todas', name: 'Todas as Notícias', icon: NewspaperIcon },
              { id: 'favoritas', name: 'Favoritas', icon: HeartIcon },
              { id: 'politica', name: 'Política', icon: UserCircleIcon },
              { id: 'formacao', name: 'Formação', icon: ChatBubbleLeftRightIcon },
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de notícias */}
            <div className="lg:col-span-2 space-y-6">
              {noticiasFiltradas.map((noticia, index) => (
                <motion.article
                  key={noticia.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {noticia.categoria}
                        </span>
                        <h2 className="mt-3 text-xl font-bold text-gray-900">{noticia.titulo}</h2>
                      </div>
                      <button 
                        onClick={() => toggleFavorito(noticia.id)}
                        className={`p-2 rounded-full ${favoritas.includes(noticia.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                      >
                        <HeartIcon className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <UserCircleIcon className="h-4 w-4 mr-1" />
                      <span className="mr-4">{noticia.autor}</span>
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      <span>{new Date(noticia.dataPublicacao).toLocaleDateString('pt-PT')}</span>
                    </div>
                    
                    <p className="mt-4 text-gray-600">{noticia.resumo}</p>
                    
                    <div className="mt-6 flex flex-wrap gap-2">
                      {noticia.tags.map((tag, idx) => (
                        <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex space-x-4">
                        <button className="flex items-center text-sm text-gray-500 hover:text-yellow-600">
                          <HeartIcon className="h-4 w-4 mr-1" />
                          {noticia.likes}
                        </button>
                        <button className="flex items-center text-sm text-gray-500 hover:text-blue-600">
                          <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" />
                          {noticia.comentarios}
                        </button>
                      </div>
                      <button className="flex items-center text-sm text-gray-500 hover:text-green-600">
                        <ShareIcon className="h-4 w-4 mr-1" />
                        Compartilhar
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Últimas notícias */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Últimas Notícias</h3>
                <div className="space-y-4">
                  {noticias.slice(0, 3).map((noticia) => (
                    <div key={noticia.id} className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <NewspaperIcon className="h-6 w-6 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{noticia.titulo}</h4>
                        <p className="text-xs text-gray-500 mt-1">{new Date(noticia.dataPublicacao).toLocaleDateString('pt-PT')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categorias populares */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorias</h3>
                <div className="space-y-2">
                  {[
                    { nome: 'Política', quantidade: 24 },
                    { nome: 'Formação', quantidade: 18 },
                    { nome: 'Organização', quantidade: 15 },
                    { nome: 'Atividades', quantidade: 32 },
                    { nome: 'Infraestrutura', quantidade: 8 },
                  ].map((categoria, idx) => (
                    <div key={`categoria-${idx}`} className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">{categoria.nome}</span>
                      <span className="text-sm text-gray-500">{categoria.quantidade}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-primary-blue to-dark-blue rounded-xl shadow-lg p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
                <p className="text-sm text-blue-100 mb-4">
                  Receba as últimas notícias da Juventude do PL diretamente no seu email
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Seu email"
                    className="w-full px-3 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <button className="w-full py-2 bg-yellow-500 text-primary-blue rounded-lg font-medium hover:bg-yellow-400 transition-colors">
                    Inscrever-se
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}