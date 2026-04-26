'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { QRCodeCanvas } from 'qrcode.react';
import { Membro } from '@/data/membros';

interface DetalhesMembroModalProps {
  membro: Membro | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DetalhesMembroModal({ membro, isOpen, onClose }: DetalhesMembroModalProps) {
  const qrValue = membro ? `${membro.numeroIdentificacao}|${membro.nome}|${membro.email}` : '';

  if (!membro) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Detalhes do Membro</h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Informações pessoais */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Pessoais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Nome Completo</p>
                        <p className="font-medium">{membro.nome}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Cargo</p>
                        <p className="font-medium">{membro.cargo}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{membro.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Telefone</p>
                        <p className="font-medium">{membro.telefone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Data de Nascimento</p>
                        <p className="font-medium">{new Date(membro.dataNascimento).toLocaleDateString('pt-PT')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Data de Inscrição</p>
                        <p className="font-medium">{new Date(membro.dataInscricao).toLocaleDateString('pt-PT')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${membro.status === 'ativo' ? 'bg-green-100 text-green-800' : membro.status === 'inativo' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {membro.status.charAt(0).toUpperCase() + membro.status.slice(1)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Nível de Engajamento</p>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${membro.nivelEngajamento === 'alto' ? 'bg-blue-100 text-blue-800' : membro.nivelEngajamento === 'medio' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'}`}>
                          {membro.nivelEngajamento.charAt(0).toUpperCase() + membro.nivelEngajamento.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Endereço */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Endereço</h3>
                    <div>
                      <p className="text-sm text-gray-600">Rua</p>
                      <p className="font-medium">{membro.endereco.rua}</p>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <p className="text-sm text-gray-600">Cidade</p>
                          <p className="font-medium">{membro.endereco.cidade}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Província</p>
                          <p className="font-medium">{membro.endereco.provincia}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Código Postal</p>
                        <p className="font-medium">{membro.endereco.codigoPostal}</p>
                      </div>
                    </div>
                  </div>

                  {/* Interesses e Redes Sociais */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Interesses e Redes Sociais</h3>
                    <div>
                      <p className="text-sm text-gray-600">Interesses</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {membro.interesses.map((interesse, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {interesse}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">Redes Sociais</p>
                      <div className="flex space-x-4 mt-2">
                        {membro.redesSociais.facebook && (
                          <a href={`https://facebook.com/${membro.redesSociais.facebook}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Facebook: {membro.redesSociais.facebook}
                          </a>
                        )}
                        {membro.redesSociais.twitter && (
                          <a href={`https://twitter.com/${membro.redesSociais.twitter}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                            Twitter: {membro.redesSociais.twitter}
                          </a>
                        )}
                        {membro.redesSociais.instagram && (
                          <a href={`https://instagram.com/${membro.redesSociais.instagram}`} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">
                            Instagram: {membro.redesSociais.instagram}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cartão de membro e QR Code */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-primary-blue to-dark-blue rounded-xl p-6 text-white shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">Cartão de Membro</h3>
                    <div className="bg-white rounded-lg p-4 shadow-inner">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-blue-900 font-bold text-xl mb-3">
                          {membro.nome.charAt(0)}
                        </div>
                        <h4 className="font-bold text-gray-900 text-center">{membro.nome}</h4>
                        <p className="text-sm text-gray-600 text-center">{membro.cargo}</p>
                        <div className="mt-4 w-full">
                          <p className="text-xs text-gray-600">NÚMERO DE IDENTIFICAÇÃO</p>
                          <p className="font-bold text-gray-900 text-center">{membro.numeroIdentificacao}</p>
                        </div>
                        <div className="mt-4 text-center">
                          <p className="text-xs text-gray-600">VALIDADE</p>
                          <p className="text-sm font-medium text-gray-900">Indeterminada</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">QR Code de Autenticação</h3>
                    <div className="flex flex-col items-center">
                      <div className="bg-white p-4 rounded-lg shadow-inner">
                        <QRCodeCanvas
                          value={qrValue}
                          size={180}
                          bgColor="#ffffff"
                          fgColor="#000000"
                          level="H"
                          includeMargin={true}
                        />
                      </div>
                      <p className="mt-4 text-sm text-gray-600 text-center">
                        Escaneie este QR Code para verificar a autenticidade do cartão de membro
                      </p>
                      <div className="mt-4 text-xs text-gray-500 bg-yellow-50 p-2 rounded w-full">
                        <p>ID: {membro.numeroIdentificacao}</p>
                        <p>Verificado: {new Date().toLocaleDateString('pt-PT')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Atividades Participadas</p>
                        <p className="text-2xl font-bold text-blue-600">{membro.atividadesParticipadas}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Última Atividade</p>
                        <p className="text-sm font-medium">{new Date(membro.ultimaAtividade).toLocaleDateString('pt-PT')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Fechar
                </button>
                <button className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-secondary-blue transition-colors">
                  Editar Membro
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}