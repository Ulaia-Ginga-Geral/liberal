'use client';

import { useState, useRef, useEffect } from 'react';
import { usePortal } from '@/context/PortalContext';
import { MagnifyingGlassIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlobalSearch() {
  const { membros } = usePortal();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const results = query.length > 1 
    ? membros.filter(m => 
        m.nome.toLowerCase().includes(query.toLowerCase()) || 
        m.bi.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative group">
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-yellow-400 transition-colors" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Pesquisar por Nome ou BI..."
          className="w-full bg-white border-2 border-slate-100 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold focus:border-yellow-400 outline-none transition-all shadow-sm"
        />
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-900"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50"
          >
            <div className="p-2 border-b border-slate-50">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 py-1">Resultados da Pesquisa</p>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {results.map((m) => (
                <Link
                  key={m.id}
                  href={`/portal/membros/perfil?id=${m.id}`}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery('');
                  }}
                  className="flex items-center space-x-4 p-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 group"
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    {m.foto ? (
                      <img src={m.foto} className="w-full h-full object-cover" />
                    ) : (
                      <UserCircleIcon className="w-full h-full text-slate-300" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-slate-900 truncate group-hover:text-blue-700">{m.nome}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">BI: {m.bi} • {m.municipio}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link 
              href={`/portal/membros/lista?busca=${query}`}
              onClick={() => setIsOpen(false)}
              className="block p-3 text-center bg-slate-50 hover:bg-yellow-400 transition-colors text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900"
            >
              Ver todos os resultados
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
