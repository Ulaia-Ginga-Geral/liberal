'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BellIcon, 
  MagnifyingGlassIcon, 
  SunIcon, 
  MoonIcon,
  ChevronDownIcon,
  SpeakerWaveIcon,
  RadioIcon
} from '@heroicons/react/24/outline';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Aqui você pode implementar a lógica de tema escuro
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Pesquisar..."
                className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300"
              />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            
            {/* Rádios Online */}
            <div className="hidden lg:flex items-center space-x-3 mr-4 border-r pr-4 border-gray-200">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-3 py-1.5 bg-yellow-50 text-yellow-700 text-xs font-semibold rounded-full border border-yellow-200 hover:bg-yellow-100 transition-colors"
                title="Ouvir a Rádio Partido Liberal"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2"></div>
                <RadioIcon className="w-4 h-4 mr-1 text-primary-blue" />
                Rádio PL
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
                title="Ouvir a Rádio Nacional"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2"></div>
                <SpeakerWaveIcon className="w-4 h-4 mr-1" />
                Rádio Nacional
              </motion.button>
            </div>

            {/* Dark mode toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 transition-all duration-300"
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </motion.button>

            {/* Notifications */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-full text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 relative transition-all duration-300"
              >
                <BellIcon className="h-5 w-5" />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </motion.button>

              {/* Notification dropdown */}
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                >
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Notificações</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-3 h-3 rounded-full bg-yellow-500 mt-2"></div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              Nova atividade programada
                            </p>
                            <p className="text-sm text-gray-500">
                              Reunião de coordenação regional - 15:00
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Há 2 horas
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-200">
                    <button className="text-sm text-yellow-600 hover:text-yellow-700 font-medium text-menu-white">
                      Ver todas as notificações
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* User profile */}
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-gray-900">João da Silva</p>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
              <div className="relative">
                <button className="flex items-center space-x-2 focus:outline-none group">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold">
                    JD
                  </div>
                  <ChevronDownIcon className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </button>
                
                {/* User dropdown */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                >
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                      Perfil
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                      Configurações
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                      Sair
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}