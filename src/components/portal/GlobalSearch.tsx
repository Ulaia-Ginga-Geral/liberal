'use client';

import { useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon, UserCircleIcon, XMarkIcon, BuildingOffice2Icon, TruckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortal } from '@/context/PortalContext';

import { useRouter } from 'next/navigation';

export default function GlobalSearch() {
  const { membros, imoveis, viaturas } = usePortal();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/portal/membros/lista?busca=${encodeURIComponent(query)}`);
    }
  };

  const cleanQuery = query.toLowerCase().trim();

  const mResults = cleanQuery.length > 1 
    ? membros.filter(m => m.nome.toLowerCase().includes(cleanQuery) || m.bi.toLowerCase().includes(cleanQuery)).slice(0, 3)
    : [];

  const iResults = cleanQuery.length > 1
    ? imoveis.filter(i => i.nome.toLowerCase().includes(cleanQuery) || i.localizacao.toLowerCase().includes(cleanQuery)).slice(0, 3)
    : [];

  const vResults = cleanQuery.length > 1
    ? viaturas.filter(v => v.modelo.toLowerCase().includes(cleanQuery) || v.matricula.toLowerCase().includes(cleanQuery)).slice(0, 3)
    : [];

  const hasResults = mResults.length > 0 || iResults.length > 0 || vResults.length > 0;

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
      <form onSubmit={handleSearchSubmit} className="relative group">
        <button 
          type="submit"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-yellow-400 transition-colors z-10"
        >
          <MagnifyingGlassIcon className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Pesquisar por Nome ou BI..."
          className="w-full bg-white border-2 border-slate-100 rounded-2xl py-3 pl-12 pr-4 text-sm font-black text-slate-900 focus:border-yellow-400 outline-none transition-all shadow-sm"
        />
        {query && (
          <button 
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-900"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}
      </form>

      <AnimatePresence>
        {isOpen && hasResults && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 overflow-y-auto max-h-[70vh] min-w-[320px]"
          >
            <div className="p-4">
              {/* MILITANTES */}
              {mResults.length > 0 && (
                <div className="mb-4">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2 mb-2">Membros / Militantes</p>
                  {mResults.map(m => (
                    <Link key={m.id} href={`/portal/membros/perfil?id=${m.id}`} onClick={() => { setIsOpen(false); setQuery(''); }} className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded-xl transition-all group">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-black text-xs uppercase">{m.nome.charAt(0)}</div>
                      <div className="min-w-0">
                        <p className="text-xs font-black text-slate-900 group-hover:text-blue-600 truncate">{m.nome}</p>
                        <p className="text-[9px] font-bold text-slate-400">BI: {m.bi}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* IMÓVEIS */}
              {iResults.length > 0 && (
                <div className="mb-4">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2 mb-2">Sedes & Património</p>
                  {iResults.map(i => (
                    <Link key={i.id} href="/portal/patrimonio" onClick={() => { setIsOpen(false); setQuery(''); }} className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded-xl transition-all group">
                      <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center text-yellow-600">
                        <BuildingOffice2Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-black text-slate-900 truncate">{i.nome}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">{i.localizacao}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* VIATURAS */}
              {vResults.length > 0 && (
                <div className="mb-2">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2 mb-2">Frota Automóvel</p>
                  {vResults.map(v => (
                    <Link key={v.id} href="/portal/patrimonio?tab=viaturas" onClick={() => { setIsOpen(false); setQuery(''); }} className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded-xl transition-all group">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                        <TruckIcon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-black text-slate-900 truncate">{v.modelo}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">{v.matricula}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link 
              href="/portal/pesquisa-completa"
              onClick={() => setIsOpen(false)}
              className="block p-3 text-center bg-slate-50 hover:bg-slate-900 transition-colors text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-white"
            >
              Pesquisa Avançada Completa
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
