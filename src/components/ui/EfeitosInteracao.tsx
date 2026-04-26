'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesIcon, CursorArrowRaysIcon, EyeIcon, HandThumbUpIcon, HeartIcon, ArrowPathIcon, GiftIcon } from '@heroicons/react/24/outline';

// Componente que implementa os 7 efeitos inteligentes de interação
export const EfeitosInteracao = () => {
  const [efeitoAtivo, setEfeitoAtivo] = useState<string | null>(null);
  const [contador, setContador] = useState(0);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [posicaoMouse, setPosicaoMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Efeito 1: Feedback visual ao passar mouse sobre elementos
  const handleMouseEnter = (efeito: string) => {
    setEfeitoAtivo(efeito);
  };

  const handleMouseLeave = () => {
    setEfeitoAtivo(null);
  };

  // Efeito 2: Rastreamento de mouse com partículas
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPosicaoMouse({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // Efeito 3: Animação de micro-interação ao clicar
  const handleClick = () => {
    setContador(prev => prev + 1);
    setMostrarFeedback(true);
    setTimeout(() => setMostrarFeedback(false), 2000);
  };

  // Efeito 4: Animações de entrada/saída suaves
  // Já implementado com AnimatePresence e motion

  // Efeito 5: Feedback tátil simulado (vibração)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(50); // Vibração curta ao ativar algum efeito
    }
  }, [contador]);

  // Efeito 6: Indicadores de progresso e carregamento
  // Implementado em outros componentes

  // Efeito 7: Animações contextuais baseadas em ações do usuário
  const contextoAcao = () => {
    if (contador > 5) {
      return 'superUsuario';
    } else if (contador > 2) {
      return 'engajado';
    }
    return 'novo';
  };

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="relative">
      {/* Efeito 2: Partículas que seguem o mouse */}
      <div 
        className="absolute w-4 h-4 rounded-full bg-yellow-400 pointer-events-none z-50 transition-all duration-100"
        style={{
          left: posicaoMouse.x - 8,
          top: posicaoMouse.y - 8,
          opacity: efeitoAtivo ? 0.7 : 0
        }}
      />
      
      {/* Área de demonstração dos efeitos */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Efeito 1: Hover feedback */}
          <motion.div
            onMouseEnter={() => handleMouseEnter('hover')}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-4 rounded-lg shadow cursor-pointer border-2 border-transparent hover:border-yellow-400 transition-all"
            onClick={handleClick}
          >
            <CursorArrowRaysIcon className="h-8 w-8 text-yellow-500 mx-auto" />
            <p className="mt-2 text-sm font-medium text-center">Hover Effect</p>
          </motion.div>
          
          {/* Efeito 3: Micro-interação ao clicar */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95, rotate: 5 }}
            className="bg-white p-4 rounded-lg shadow cursor-pointer border-2 border-transparent hover:border-blue-400 transition-all"
            onClick={handleClick}
          >
            <HandThumbUpIcon className="h-8 w-8 text-blue-500 mx-auto" />
            <p className="mt-2 text-sm font-medium text-center">Click Effect</p>
          </motion.button>
          
          {/* Efeito 4: Animação de entrada/saída */}
          <div 
            className="bg-white p-4 rounded-lg shadow cursor-pointer border-2 border-transparent hover:border-green-400 transition-all"
            onClick={handleClick}
          >
            <SparklesIcon className="h-8 w-8 text-green-500 mx-auto" />
            <p className="mt-2 text-sm font-medium text-center">Animate Presence</p>
            <AnimatePresence>
              {mostrarFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-2 text-xs text-green-600 text-center"
                >
                  Feedback!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Efeito 7: Contextual Animation */}
          <motion.div
            animate={{ 
              backgroundColor: contextoAcao() === 'superUsuario' ? '#FEF3C7' : 
                             contextoAcao() === 'engajado' ? '#DBEAFE' : '#F3E8FF',
              borderColor: contextoAcao() === 'superUsuario' ? '#F59E0B' : 
                           contextoAcao() === 'engajado' ? '#3B82F6' : '#8B5CF6',
            }}
            className="bg-white p-4 rounded-lg shadow cursor-pointer border-2 border-transparent transition-all"
            onClick={handleClick}
          >
            <GiftIcon className="h-8 w-8 text-purple-500 mx-auto" />
            <p className="mt-2 text-sm font-medium text-center">Contextual</p>
            <p className="text-xs text-center mt-1">{contextoAcao()}</p>
          </motion.div>
        </div>
        
        {/* Contador de interações */}
        <div className="bg-gradient-to-r from-yellow-400 to-blue-500 rounded-lg p-4 text-white text-center">
          <p className="text-sm">Interações: {contador}</p>
          <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-2">
            <motion.div 
              className="bg-white h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(contador * 10, 100)}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        
        {/* Efeito 5: Vibração simulada (feedback visual) */}
        {contador > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            className="bg-red-100 border border-red-300 rounded-lg p-3 text-center"
          >
            <HeartIcon className="h-6 w-6 text-red-500 mx-auto" />
            <p className="text-sm text-red-700">Vibração detectada!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Componente de carregamento animado (Efeito 6)
export const LoadingSpinner = ({ texto = "Carregando..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full"
      />
      <motion.p 
        className="mt-4 text-gray-600"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {texto}
      </motion.p>
    </div>
  );
};

// Componente de tooltip animado
export const TooltipAnimado = ({ children, texto }: { children: React.ReactNode; texto: string }) => {
  const [visivel, setVisivel] = useState(false);
  
  return (
    <div className="relative inline-block">
      <div 
        onMouseEnter={() => setVisivel(true)}
        onMouseLeave={() => setVisivel(false)}
        className="cursor-pointer"
      >
        {children}
      </div>
      <AnimatePresence>
        {visivel && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-gray-800 text-white text-xs rounded py-1 px-2 mb-2 whitespace-nowrap"
          >
            {texto}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Componente de progresso animado
export const ProgressoAnimado = ({ valor, maximo, cor = "yellow" }: { valor: number; maximo: number; cor?: string }) => {
  const porcentagem = Math.min(100, (valor / maximo) * 100);
  const cores = {
    yellow: "bg-yellow-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    red: "bg-red-500",
    purple: "bg-purple-500"
  };
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <motion.div 
        className={`h-2.5 rounded-full ${cores[cor as keyof typeof cores]}`}
        initial={{ width: 0 }}
        animate={{ width: `${porcentagem}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
};