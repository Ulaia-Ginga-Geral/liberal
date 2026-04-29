'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { UserIcon, LockClosedIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular login
    setTimeout(() => {
      router.push('/portal');
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 flex items-center justify-center p-4">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/partido-bg.jpeg"
          alt="Background"
          className="w-full h-full object-cover opacity-60 transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-50/80 via-transparent to-slate-50/40" />
      </div>

      {/* Decorative Blobs */}
      <div className="absolute inset-0 z-1">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-blue/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-yellow/20 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Logo / Header da Login */}
        <div className="flex flex-col items-center text-center mb-10">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="mb-6 overflow-hidden rounded-3xl"
          >
            <div className="relative w-48 h-32">
              <img
                src="/partidoliberarbandeira.jpg"
                alt="Bandeira PL"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none drop-shadow-sm">
            Sistema de Gestão
          </h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-3">
            Partido Liberal • Cuanza sul
          </p>
        </div>

        {/* Card de Login */}
        <div className="bg-white border border-slate-200 rounded-[3rem] p-10 md:p-12 shadow-2xl shadow-slate-300/40 overflow-hidden relative group">
          {/* Brilho no hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-yellow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <form onSubmit={handleLogin} className="relative z-10 space-y-8">
            <div className="space-y-6">
              {/* Campo Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Utilizador</label>
                <div className="relative">
                  <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@liberal.ao"
                    className="w-full bg-slate-100 border border-slate-200 rounded-2xl py-5 pl-14 pr-5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-primary-yellow/30 focus:border-primary-yellow/50 transition-all font-bold text-sm"
                    required
                  />
                </div>
              </div>

              {/* Campo Senha */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Senha</label>
                <div className="relative">
                  <LockClosedIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-100 border border-slate-200 rounded-2xl py-5 pl-14 pr-5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-primary-yellow/30 focus:border-primary-yellow/50 transition-all font-bold text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Link Esqueci a Senha e Manter Conectado */}
            <div className="flex justify-between items-center px-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary-yellow focus:ring-primary-yellow" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Manter Sessão</span>
              </label>
              <button type="button" className="text-[10px] font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">
                Recuperar Acesso
              </button>
            </div>

            {/* Botão de Entrar */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-primary-yellow hover:bg-yellow-400 text-slate-900 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.25em] transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-yellow-500/20"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-3 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
              ) : (
                <>
                  <span>Autenticar no Sistema</span>
                  <ChevronRightIcon className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer do Login */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            © 2024 Partido Liberal • Plataforma de Gestão Unificada
          </p>
        </div>
      </motion.div>
    </div>
  );
}
