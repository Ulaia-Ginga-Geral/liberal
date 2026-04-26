'use client';

import { motion } from 'framer-motion';
import {
   XMarkIcon,
   PrinterIcon,
   ArrowDownTrayIcon,
   ShareIcon,
   UsersIcon,
   CreditCardIcon,
   ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';
import MemberCard from './MemberCard';

interface PrintPreviewProps {
   type: 'cartao' | 'guia' | 'lista' | 'perfil' | 'ficha';
   data: any;
   onClose: () => void;
}

export default function PrintPreview({ type, data, onClose }: PrintPreviewProps) {
   const handlePrint = () => {
      // Adiciona uma classe ao body para forçar a visibilidade apenas do preview na impressão
      document.body.classList.add('printing-preview');
      window.print();
      // Remove após a impressão (ou cancelamento)
      window.onafterprint = () => {
         document.body.classList.remove('printing-preview');
      };
   };

   return (
      <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[100] flex flex-col items-center p-4 md:p-10 overflow-y-auto">
         {/* Header Preview Controls - Hide on Print */}
         <div className="w-full max-w-4xl flex items-center justify-between mb-8 print:hidden">
            <div>
               <h2 className="text-white text-2xl font-black tracking-tighter uppercase">Pré-visualização de Documento</h2>
               <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Configurações de Impressão de Alta Qualidade</p>
            </div>
            <div className="flex space-x-4">
               <button
                  onClick={handlePrint}
                  className="bg-yellow-400 text-slate-950 px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center hover:bg-yellow-500 transition-all shadow-xl shadow-yellow-500/10"
               >
                  <PrinterIcon className="w-5 h-5 mr-2" />
                  Imprimir Agora (PDF)
               </button>
               <button
                  onClick={onClose}
                  className="p-3 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all"
               >
                  <XMarkIcon className="w-6 h-6" />
               </button>
            </div>
         </div>

         {/* Actual Document to Print */}
         <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-2xl p-[20mm] relative"
            id="printable-area"
         >
            {/* Timbre do Partido */}
            <div className="flex justify-between items-start mb-16 pb-8 border-b-4 border-slate-950">
               <div className="flex items-center space-x-4">
                  <div className="w-20 h-14 flex items-center justify-center overflow-hidden">
                     <img src="/partidoliberarbandeira.jpg" alt="Bandeira do Partido Liberal" className="w-full h-full object-contain" />
                  </div>
                  <div>
                     <h1 className="text-2xl font-black tracking-tighter leading-tight">PARTIDO LIBERAL</h1>
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Secretáriado Provincial do Cuanza Sul</p>
                  </div>
               </div>
               <div className="text-right">
                  <p className="text-[10px] font-black uppercase text-slate-400">Data de Emissão</p>
                  <p className="font-bold text-sm">{new Date().toLocaleDateString('pt-AO')}</p>
                  <p className="text-[10px] font-mono text-slate-400 mt-1">REF: {type.toUpperCase()}-{Math.floor(Math.random() * 10000)}</p>
               </div>
            </div>

            {/* Dynamic Content based on Type */}
            {type === 'cartao' && (
               <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-12">
                  <div className="text-center mb-6 print:hidden">
                     <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Modelo de Impressão PVC Oficial</p>
                     <p className="text-[10px] text-yellow-600 font-bold">Baseado no modelo institucional do Partido Liberal</p>
                  </div>

                  {/* Utilizando o componente real MemberCard com os novos assets */}
                  <div className="print:m-0 print:shadow-none scale-150 transform">
                     <MemberCard member={{
                        nome: data?.nome || 'Nome do Membro',
                        bi: data?.bi || '000000000',
                        provincia: data?.provincia || 'Cuanza Sul',
                        idMilitante: `PL-${data?.id?.toString().padStart(4, '0')}`,
                        foto: data?.foto
                     }} />
                  </div>

                  <div className="text-center space-y-4 mt-20 print:hidden">
                     <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 max-w-sm mx-auto">
                        <p className="text-[10px] text-blue-900 font-bold uppercase tracking-tight">O cartão impresso conterá a marca d&apos;água da bandeira oficial e o QR Code de validação.</p>
                     </div>
                  </div>
               </div>
            )}
            {type === 'guia' && (
               <div className="space-y-12">
                  <h2 className="text-4xl font-black text-center underline decoration-8 decoration-yellow-400 underline-offset-[12px] mb-20 uppercase">Guia de Marcha Oficial</h2>
                  <div className="space-y-8 text-lg leading-relaxed text-justify px-8">
                     <p>Por determinação da direcção política do <strong>PARTIDO LIBERAL (PL)</strong>, atesta-se para os devidos efeitos que o cidadão(ã) infra-mencionado encontra-se em missão oficial de serviço partidário.</p>
                     <div className="py-8 border-y-2 border-slate-100 space-y-4">
                        <p><strong>NOME:</strong> {data?.nome || 'Militante'}</p>
                        <p><strong>IDENTIFICAÇÃO (BI):</strong> {data?.bi || '000000000LA000'}</p>
                        <p><strong>CARGO/FUNÇÃO:</strong> {data?.hierarquia || 'Militante do Quadro'}</p>
                        <p><strong>DESTINO:</strong> Províncias de Angola / Exterior</p>
                     </div>
                     <p>Solicita-se a todas as autoridades, civis e militares, a máxima cooperação para com o portador desta guia no desempenho cabal das suas funções em prol do desenvolvimento da nação.</p>
                  </div>
                  <div className="pt-32 flex justify-between px-12">
                     <div className="text-center">
                        <div className="w-48 border-b-2 border-slate-900 mb-2"></div>
                        <p className="text-xs font-black uppercase">Assinatura do Portador</p>
                     </div>
                     <div className="text-center">
                        <div className="w-48 h-24 border-2 border-slate-200 border-dashed rounded-full flex items-center justify-center mb-2">
                           <span className="text-[10px] text-slate-300 font-black uppercase">RESERVE: SELO BRANCO</span>
                        </div>
                        <p className="text-xs font-black uppercase tracking-widest">O Secretário Geral</p>
                     </div>
                  </div>
               </div>
            )}

            {type === 'perfil' && (
               <div className="space-y-20">
                  {/* PÁGINA 1: IDENTIFICAÇÃO E ÁRVORE GENEALÓGICA */}
                  <div className="min-h-[250mm] flex flex-col">
                     <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter text-center mb-16 italic underline decoration-yellow-400 decoration-8 underline-offset-8">Relatório Técnico de Militância</h2>

                     <div className="grid grid-cols-12 gap-12 mb-16">
                        <div className="col-span-4">
                           <div className="w-full aspect-[3/4] bg-slate-100 rounded-[2rem] border-4 border-slate-900 shadow-2xl overflow-hidden">
                              {data?.foto ? <img src={data.foto} alt={data.nome} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-200"></div>}
                           </div>
                        </div>
                        <div className="col-span-8 space-y-8">
                           <div>
                              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Nome Completo do Militante</p>
                              <p className="text-3xl font-black italic">{data?.nome}</p>
                           </div>
                           <div className="grid grid-cols-2 gap-8">
                              <div>
                                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Registro Provincial</p>
                                 <p className="text-lg font-black font-mono">C-SUL/{new Date().getFullYear()}-{data?.id?.toString().padStart(5, '0')}</p>
                              </div>
                              <div>
                                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Status de Base</p>
                                 <p className="text-lg font-black text-green-600 italic">ACTIVO / EFECTIVO</p>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-900 text-slate-900 shadow-sm">
                        <h3 className="text-xs font-black text-yellow-400 uppercase tracking-[0.3em] mb-8 flex items-center">
                           <UsersIcon className="w-6 h-6 mr-3" />
                           Árvore de Influência & Genealogia Política
                        </h3>
                        <div className="relative pl-8 border-l-4 border-dashed border-white/20 space-y-10">
                           <div className="relative">
                              <div className="absolute -left-[42px] top-0 w-5 h-5 rounded-full bg-white border-4 border-slate-950" />
                              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Membro Recomendador (Pai Político)</p>
                              <p className="text-sm font-black italic">Dr. Antunes Calulo • Secretário Executivo</p>
                           </div>
                           <div className="relative">
                              <div className="absolute -left-[42px] top-0 w-5 h-5 rounded-full bg-white border-4 border-slate-400" />
                              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Célula de Enquadramento</p>
                              <p className="text-sm font-black italic">Comité Municipal do {data?.municipio || 'Sumbe'} • Núcleo {data?.id % 2 === 0 ? 'A-21' : 'B-04'}</p>
                           </div>
                           <div className="relative">
                              <div className="absolute -left-[42px] top-0 w-5 h-5 rounded-full bg-white border-4 border-slate-200" />
                              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Data de Juramento</p>
                              <p className="text-sm font-black italic">10 de Janeiro de 2026</p>
                           </div>
                        </div>
                     </div>

                     <div className="mt-auto pt-10 text-center">
                        <p className="text-[10px] font-black text-slate-300 uppercase italic tracking-widest">Página 1 de 3 • Relatório de Identificação</p>
                     </div>
                  </div>

                  {/* PÁGINA 2: HISTÓRICO ADMINISTRATIVO DETALHADO */}
                  <div className="min-h-[297mm] flex flex-col pt-20 break-before-page">
                     <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-12 flex items-center">
                        <CreditCardIcon className="w-8 h-8 mr-4 text-blue-900" />
                        Dossiê Financeiro e Patrimonial
                     </h3>

                     <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                           <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Total de Quotas Pagas</p>
                              <p className="text-4xl font-black text-slate-900 italic tracking-tighter">75.000 Kz</p>
                           </div>
                           <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Património Sob Gestão</p>
                              <p className="text-4xl font-black text-slate-900 italic tracking-tighter">03 Itens</p>
                           </div>
                        </div>

                        <table className="w-full text-left mt-8 border-collapse">
                           <thead>
                              <tr className="bg-slate-900 text-white">
                                 <th className="p-6 text-xs font-black uppercase first:rounded-l-3xl">Referência Pagamento</th>
                                 <th className="p-6 text-xs font-black uppercase">Valor (Kz)</th>
                                 <th className="p-6 text-xs font-black uppercase">Data Transação</th>
                                 <th className="p-6 text-xs font-black uppercase last:rounded-r-3xl">Recibo Interno</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y-2 divide-slate-50">
                              {[
                                 { r: 'Cotas Abr/26', v: '5.000', d: '15/04/2026', id: 'RC-9923' },
                                 { r: 'Cotas Mar/26', v: '5.000', d: '10/03/2026', id: 'RC-8211' },
                                 { r: 'Cotas Fev/26', v: '5.000', d: '05/02/2026', id: 'RC-7712' },
                                 { r: 'Cotas Jan/26', v: '5.000', d: '10/01/2026', id: 'RC-6601' },
                                 { r: 'Taxa Emissão Cartão', v: '10.000', d: '10/01/2026', id: 'TX-0051' },
                                 { r: 'Joia de Inscrição', v: '45.000', d: '10/01/2026', id: 'JI-0001' },
                              ].map((row, i) => (
                                 <tr key={i} className="hover:bg-slate-50">
                                    <td className="p-6 text-sm font-black italic">{row.r}</td>
                                    <td className="p-6 text-sm font-black">{row.v} Kz</td>
                                    <td className="p-6 text-xs font-mono font-bold text-slate-500 uppercase">{row.d}</td>
                                    <td className="p-6 text-xs font-black text-blue-900 underline">{row.id}</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>

                     <div className="mt-10 p-12 bg-white rounded-[3rem] border-4 border-slate-900">
                        <div className="flex items-start space-x-6">
                           <div className="p-4 bg-slate-900 rounded-2xl">
                              <ChatBubbleBottomCenterTextIcon className="w-8 h-8 text-white" />
                           </div>
                           <div>
                              <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Nota da Secretaria Provincial</h4>
                              <p className="text-sm text-slate-900 font-bold leading-relaxed mt-2 uppercase italic text-justify">
                                 &quot;Militante exemplar com participação activa nas marchas provinciais de 2026. Cumpridor escrupuloso dos deveres estatutários e financeiros. Enquadrado na ala de mobilização do Cuanza Sul.&quot;
                              </p>
                           </div>
                        </div>
                     </div>

                     <div className="mt-auto pt-10 text-center">
                        <p className="text-[10px] font-black text-slate-300 uppercase italic tracking-widest">Página 2 de 3 • Dossiê Financeiro</p>
                     </div>
                  </div>

                  {/* PÁGINA 3: FICHA DE INSCRIÇÃO ORIGINAL */}
                  <div className="min-h-[297mm] flex flex-col pt-20 break-before-page">
                     <div className="mb-10 text-center">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Anexo A</h4>
                        <h3 className="text-2xl font-black text-slate-900 uppercase italic underline decoration-blue-900 decoration-4">Cópia de Ficha de Registro de Base</h3>
                     </div>

                     <div className="border-4 border-slate-900 p-12 rounded-[2.5rem] bg-white flex-1 relative overflow-hidden">
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-200/20 font-black text-9xl -rotate-45 pointer-events-none">
                           PARTIDO LIBERAL
                        </div>

                        <div className="relative z-10 space-y-10">
                           {/* Reuso simplificado da Ficha de Inscrição */}
                           <div className="flex flex-col items-center mb-10 relative">
                              <div className="absolute top-0 left-0">
                                 <p className="text-[10px] font-black text-slate-950 uppercase tracking-tighter">
                                    Nº da Ficha: C-SUL/2026-{data?.id?.toString().padStart(5, '0')}
                                 </p>
                              </div>
                              <div className="w-16 h-12 flex items-center justify-center">
                                 <img src="/partidoliberarbandeira.jpg" alt="Bandeira do Partido" className="w-full h-full object-contain" />
                              </div>
                              <h2 className="text-xl font-black uppercase tracking-tighter">Ficha de Inscrição Oficial</h2>
                           </div>

                           <div className="grid grid-cols-2 gap-10">
                              {[
                                 { l: 'NOME COMPLETO', v: data?.nome },
                                 { l: 'FILIAÇÃO (PAI)', v: data?.pai || 'António Calulo' },
                                 { l: 'FILIAÇÃO (MÃE)', v: data?.mae || 'Maria Sumbe' },
                                 { l: 'BI Nº', v: data?.bi },
                                 { l: 'DATA NASC.', v: '10 / 05 / 1992' },
                                 { l: 'NATURALIDADE', v: data?.municipio || 'Sumbe' },
                                 { l: 'PROVÍNCIA', v: 'CUANZA SUL' },
                                 { l: 'PROFISSÃO', v: 'Técnico de Logística' },
                              ].map((f, i) => (
                                 <div key={i} className="flex flex-col border-b-2 border-slate-900 pb-2">
                                    <span className="text-[8px] font-black text-slate-400 mb-1">{f.l}</span>
                                    <span className="text-sm font-black italic">{f.v}</span>
                                 </div>
                              ))}
                           </div>

                           <div className="grid grid-cols-3 gap-8 mt-20">
                              <div className="w-40 h-48 border-2 border-slate-200 bg-white flex flex-col items-center justify-center relative">
                                 {data?.foto ? <img src={data.foto} alt="Foto do Militante" className="w-full h-full object-cover" /> : <p className="text-[8px] font-black uppercase text-slate-300">Foto</p>}
                              </div>
                              <div className="col-span-2 flex flex-col justify-end space-y-12">
                                 <div className="border-b-2 border-slate-900 pt-10 text-center font-black italic text-sm">
                                    10 de Janeiro de 2026
                                 </div>
                                 <div className="border-b-2 border-slate-900 pt-10 text-center font-black italic text-blue-900">
                                    Assinatura Validada Digitalmente
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="mt-auto pt-10 text-center">
                        <p className="text-[10px] font-black text-slate-300 uppercase italic tracking-widest">Página 3 de 3 • Registro Histórico</p>
                     </div>
                  </div>
               </div>
            )}
            {type === 'ficha' && (
               <div className="space-y-10 text-slate-800">
                  {/* Cabeçalho Institucional Réplica */}
                  <div className="flex flex-col items-center mb-12 space-y-4 relative">
                     {/* Número da Ficha Dinâmico */}
                     <div className="absolute top-0 left-0">
                        <p className="text-[12px] font-black text-slate-900 uppercase tracking-tighter">
                           Nº da Ficha: C-SUL/2026-{data?.id?.toString().padStart(5, '0') || '00000'}
                        </p>
                     </div>

                     <div className="w-24 h-16 bg-blue-900 flex items-center justify-center relative overflow-hidden rounded-sm border border-yellow-400">
                        <img src="/partidoliberarbandeira.jpg" alt="Bandeira do Partido" className="absolute inset-0 w-full h-full object-cover" />
                     </div>
                     <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">PARTIDO LIBERAL – PL</h1>

                     <div className="w-full bg-blue-600 py-3 text-center border-2 border-slate-900 mt-4">
                        <h2 className="text-white font-black text-lg uppercase tracking-tighter shadow-sm">FICHA DE INSCRIÇÃO</h2>
                     </div>
                  </div>

                  {/* Foto Área */}
                  <div className="absolute top-[80mm] right-[25mm] w-[35mm] h-[45mm] border-2 border-slate-300 bg-white flex flex-col items-center justify-center overflow-hidden">
                     {data?.foto ? <img src={data.foto} alt="Fotografia do Militante" className="w-full h-full object-cover" /> : <p className="text-[8px] font-black uppercase text-slate-300">Fotografia</p>}
                  </div>

                  {/* DADOS PESSOAIS */}
                  <div className="space-y-6 pt-10">
                     <h3 className="font-black text-sm uppercase tracking-widest border-b-2 border-slate-900 inline-block pb-1">DADOS PESSOAIS:</h3>
                     <div className="space-y-4">
                        <div className="flex items-end space-x-2">
                           <span className="font-bold text-xs uppercase text-slate-500">Nome Completo:</span>
                           <div className="flex-1 border-b border-slate-400 pb-1 font-black text-sm">{data?.nome}</div>
                        </div>
                        <div className="flex items-end space-x-8">
                           <div className="flex items-end space-x-2 flex-1">
                              <span className="font-bold text-xs uppercase text-slate-500">Filiação (Pai):</span>
                              <div className="flex-1 border-b border-slate-400 pb-1 font-black text-sm">{data?.pai || 'António Calulo'}</div>
                           </div>
                           <div className="flex items-end space-x-2 flex-1">
                              <span className="font-bold text-xs uppercase text-slate-500">Filiação (Mãe):</span>
                              <div className="flex-1 border-b border-slate-400 pb-1 font-black text-sm">{data?.mae || 'Maria Sumbe'}</div>
                           </div>
                        </div>
                        <div className="flex items-end space-x-8">
                           <div className="flex items-end space-x-2 flex-[2]">
                              <span className="font-bold text-xs uppercase text-slate-500">Bilhete de Identidade:</span>
                              <div className="flex-1 border-b border-slate-400 pb-1 font-black text-sm">{data?.bi}</div>
                           </div>
                           <div className="flex items-end space-x-2 flex-1">
                              <span className="font-bold text-xs uppercase text-slate-500">Sexo:</span>
                              <div className="flex-1 border-b border-slate-400 pb-1 font-black text-sm">{data?.genero || 'Masculino'}</div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* ENDEREÇO RESIDENCIAL */}
                  <div className="space-y-6">
                     <h3 className="font-black text-sm uppercase tracking-widest border-b-2 border-slate-900 inline-block pb-1">ENDEREÇO RESIDENCIAL:</h3>
                     <div className="space-y-4">
                        <div className="flex items-end space-x-8">
                           <div className="flex items-end space-x-1">
                              <span className="font-bold text-xs uppercase text-slate-500">Província:</span>
                              <div className="w-40 border-b border-slate-400 pb-1 font-black text-sm">Cuanza Sul</div>
                           </div>
                           <div className="flex items-end space-x-1 flex-1">
                              <span className="font-bold text-xs uppercase text-slate-500">Município:</span>
                              <div className="flex-1 border-b border-slate-400 pb-1 font-black text-sm">{data?.municipio || 'Sumbe'}</div>
                           </div>
                        </div>
                        <div className="flex items-end space-x-2">
                           <span className="font-bold text-xs uppercase text-slate-500">Rua/Bairro:</span>
                           <div className="flex-1 border-b border-slate-400 pb-1 font-black text-sm">.........................................................................................</div>
                        </div>
                     </div>
                  </div>

                  {/* INFORMAÇÕES POLÍTICAS */}
                  <div className="space-y-6">
                     <h3 className="font-black text-sm uppercase tracking-widest border-b-2 border-slate-900 inline-block pb-1">INFORMAÇÕES POLÍTICAS:</h3>
                     <div className="grid grid-cols-2 gap-10">
                        <div className="flex flex-col space-y-4">
                           <div className="flex items-center space-x-4">
                              <div className="w-5 h-5 border-2 border-slate-900 flex items-center justify-center font-black text-[10px]">X</div>
                              <span className="text-xs font-black uppercase">Militante Activo</span>
                           </div>
                           <div className="flex items-center space-x-4">
                              <div className="w-5 h-5 border-2 border-slate-900" />
                              <span className="text-xs font-black uppercase text-slate-400">Militante em Espera</span>
                           </div>
                        </div>
                        <div className="flex flex-col justify-end text-center">
                           <div className="border-b-2 border-slate-950 mb-2 font-black italic">
                              {new Date().toLocaleDateString('pt-AO')}
                           </div>
                           <p className="text-[10px] font-black uppercase">Data de Registro</p>
                        </div>
                     </div>
                  </div>

                  {/* Assinaturas */}
                  <div className="pt-20 grid grid-cols-2 gap-20">
                     <div className="text-center">
                        <div className="border-b-2 border-slate-900 mb-2" />
                        <p className="text-[10px] font-black uppercase">O Militante</p>
                     </div>
                     <div className="text-center">
                        <div className="border-b-2 border-slate-900 mb-2 py-1 font-black text-[10px] uppercase italic text-blue-900">Validado Digitalmente</div>
                        <p className="text-[10px] font-black uppercase">A Secretaria Provincial</p>
                     </div>
                  </div>
               </div>
            )}

            {/* Rodapé Padrão do Documento */}
            <div className="absolute bottom-[20mm] left-[20mm] right-[20mm] border-t border-slate-100 pt-6">
               <div className="flex justify-between items-end">
                  <div className="text-[9px] text-slate-400 space-y-1 font-medium">
                     <p>Sede Nacional: Luanda, Angola - Maianga, Rua Direita</p>
                     <p>Contacto: +244 9XX XXX XXX | Site: www.partidoliberal.ao</p>
                  </div>
                  <div className="text-right">
                     <div className="w-10 h-10 bg-slate-100 flex items-center justify-center p-1 rounded-sm ml-auto opacity-50">QR</div>
                     <p className="text-[8px] font-bold text-slate-300 mt-1">DOCUMENTO VERIFICADO DIGITALMENTE</p>
                  </div>
               </div>
            </div>
         </motion.div>
      </div>
   );
}
