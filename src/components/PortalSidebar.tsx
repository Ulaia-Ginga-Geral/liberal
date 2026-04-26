'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import RadioPlayer from "./portal/RadioPlayer";
import {
  UsersIcon,
  CalendarIcon,
  ChartBarIcon,
  DocumentTextIcon,
  BuildingOffice2Icon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ShieldCheckIcon,
  IdentificationIcon,
  QrCodeIcon,
  ChatBubbleLeftRightIcon,
  CreditCardIcon,
  TruckIcon,
  FolderPlusIcon,
  ListBulletIcon
} from '@heroicons/react/24/outline';

const portalNavigation = [
  {
    title: "PRINCIPAL",
    items: [
      { name: 'Dashboard Geral', href: '/portal', icon: ChartBarIcon, exact: true },
      { name: 'Base de Dados Geral', href: '/portal/membros/lista', icon: QrCodeIcon },
    ]
  },
  {
    title: "GESTÃO DE MEMBROS",
    items: [
      { name: 'Hierarquia Política', href: '/portal/cadastro?tab=usuarios', icon: ShieldCheckIcon },
      { name: 'Registos de Novas Fichas', href: '/portal/cadastro?tab=militantes', icon: FolderPlusIcon },
      { name: 'Árvore de Núcleos', href: '/portal/cadastro?tab=nucleos', icon: ListBulletIcon },
      { name: 'Cartões & Identidade', href: '/portal/documentos?tab=cartao', icon: CreditCardIcon },
    ]
  },
  {
    title: "OPERAÇÕES",
    items: [
      { name: 'Relatórios de Produção', href: '/portal/relatorios', icon: ChartBarIcon },
      { name: 'Documentação Oficial', href: '/portal/documentos', icon: DocumentTextIcon },
      { name: 'Agenda de Viagens', href: '/portal/agendamento', icon: CalendarIcon },
      { name: 'Centro de Mensagens', href: '/portal/agendamento?tab=notificacoes', icon: ChatBubbleLeftRightIcon },
    ]
  },
  {
    title: "PATRIMÓNIO",
    items: [
      { name: 'Sedis & Comités', href: '/portal/patrimonio', icon: BuildingOffice2Icon },
      { name: 'Inventário de Veículos', href: '/portal/patrimonio?tab=viaturas', icon: TruckIcon },
    ]
  }
];

export default function PortalSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-white shadow-lg shadow-black/50"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-80 bg-gradient-to-b from-primary-blue to-dark-blue
        transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header com Identidade Visual Sincronizada */}
          <div className="p-8 border-b border-blue-700 bg-primary-blue/30 backdrop-blur-md">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 overflow-hidden shadow-2xl">
                <img
                  src="/presidenteluisdecastro.png"
                  alt="Presidente Luís de Castro"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h1 className="text-white font-black text-xs leading-tight uppercase tracking-tighter shadow-sm italic">Luís de Castro</h1>
                <div className="bg-yellow-400 px-1 py-1 rounded-sm">
                  <p className="text-[9px] text-blue-900 font-black tracking-widest uppercase">Presidente PL</p>
                </div>
              </div>
              <div className="pt-4 border-t border-blue-500/30 w-full mt-4">
                <h2 className="text-white font-black text-lg uppercase tracking-[0.1em] shadow-sm">Partido Liberal</h2>
                <p className="text-yellow-400 font-black text-lg uppercase tracking-[0.3em] mt-1">Cuanza Sul</p>
              </div>
            </div>
          </div>

          {/* Rádios com cores da área principal 
          <div className="px-4 py-4 space-y-2 bg-dark-blue/30 border-b border-blue-700">
            <p className="text-[9px] font-black text-blue-200 uppercase px-2 mb-1 tracking-widest">Canais Live</p>
            <RadioPlayer name="PL ONLINE" station="Rádio PL CS" color="bg-yellow-400 text-blue-900" />
            <RadioPlayer name="RNA ONLINE" station="Nacional" color="bg-white text-blue-900" />
          </div>*/}

          {/* Navegação Categorizada com tema Azul/Amarelo */}
          <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto scrollbar-hide">
            {portalNavigation.map((category) => (
              <div key={category.title} className="space-y-1">
                <h2 className="text-[10px] font-black text-blue-300/50 uppercase px-4 mb-2 tracking-[0.2em]">{category.title}</h2>
                {category.items.map((item) => {
                  const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`
                          flex items-center px-4 py-3 text-xs font-bold rounded-xl transition-all group relative
                          ${isActive
                          ? 'bg-yellow-400 text-primary-blue shadow-xl shadow-yellow-400/10 scale-[1.02]'
                          : 'text-blue-100 hover:text-white hover:bg-white/5'
                        }
                        `}
                    >
                      <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary-blue' : 'text-blue-300 group-hover:text-white'}`} />
                      {item.name}
                      {isActive && (
                        <motion.div layoutId="activeLight" className="absolute right-2 w-1.5 h-1.5 bg-primary-blue rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* User profile footer sincronizado */}
          <div className="p-4 border-t border-blue-700 bg-dark-blue/50">
            <div className="bg-primary-blue/30 p-3 rounded-2xl border border-blue-600 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center font-black text-primary-blue text-sm">
                AD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black text-white truncate">Administrator</p>
                <p className="text-[10px] text-blue-300 truncate font-bold uppercase tracking-tight">Kwanza Sul</p>
              </div>
              <button className="p-2 text-blue-300 hover:text-yellow-400 transition-colors">
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
