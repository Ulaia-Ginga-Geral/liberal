'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HomeIcon, 
  UsersIcon, 
  CalendarIcon, 
  ChartBarIcon, 
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  NewspaperIcon,
  BellIcon,
  UserGroupIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  MapIcon,
  ClipboardDocumentCheckIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Membros', href: '/membros', icon: UsersIcon },
  { name: 'Atividades', href: '/atividades', icon: CalendarIcon },
  { name: 'Estatísticas', href: '/estatisticas', icon: ChartBarIcon },
  { name: 'Mensagens', href: '/mensagens', icon: ChatBubbleLeftRightIcon },
  { name: 'Documentos', href: '/documentos', icon: DocumentTextIcon },
  { name: 'Organização', href: '/organizacao', icon: BuildingOfficeIcon },
  { name: 'Formação', href: '/formacao', icon: AcademicCapIcon },
  { name: 'Notícias', href: '/noticias', icon: NewspaperIcon },
  { name: 'Mapa de Membros', href: '/mapa', icon: MapIcon }, // Nova opção de mapa
  { name: 'Portal Gestão', href: '/portal', icon: ShieldCheckIcon }, // Novo portal de membros e património
  { name: 'Escritínio Paralelo', href: '/escrutinio', icon: ClipboardDocumentCheckIcon }, // Centro de escrutínio paralelo
];

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg bg-primary-blue text-white shadow-lg hover:bg-secondary-blue transition-all duration-300"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-primary-blue to-dark-blue
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-blue-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center animate-pulse-gold">
                <span className="text-blue-900 font-bold text-xl">PL</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Partido Liberal</h1>
                <p className="text-yellow-300 text-xs">República de Angola</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="ml-auto lg:hidden text-white hover:text-yellow-300"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium text-menu-white rounded-lg transition-all duration-300 group
                    ${isActive 
                      ? 'bg-yellow-400 text-blue-900 shadow-lg transform scale-105' 
                      : 'text-blue-100 hover:bg-blue-700 hover:text-white hover:translate-x-2'
                    }
                  `}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-900' : 'text-blue-200'}`} />
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-0 top-0 bottom-0 w-1 bg-yellow-400 rounded-l-lg"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User profile */}
          <div className="p-4 border-t border-blue-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center">
                <span className="text-blue-900 font-bold">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">João da Silva</p>
                <p className="text-xs text-blue-200 truncate">Administrador</p>
              </div>
              <button className="text-blue-200 hover:text-yellow-300 transition-colors">
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}