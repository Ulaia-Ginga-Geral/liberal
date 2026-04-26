'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Membro } from '@/data/membros';

// Corrigir problema com ícones do Leaflet
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapaMembrosProps {
  membros: Membro[];
  coordenadasProvincias: Record<string, [number, number]>;
  getCorMarcador: (nivelEngajamento: string) => string;
}

// Coordenadas aproximadas dos polígonos das províncias de Angola (áreas maiores)
const poligonosProvincias: Record<string, [number, number][][]> = {
  '1': [[ // Luanda - área maior
    [-8.5, 12.8], [-8.5, 13.7], [-9.2, 13.7], [-9.2, 12.8]
  ]],
  '2': [[ // Huíla - área maior
    [-14.5, 13.0], [-14.5, 14.0], [-15.3, 14.0], [-15.3, 13.0]
  ]],
  '3': [[ // Benguela - área maior
    [-12.0, 13.0], [-12.0, 13.8], [-13.0, 13.8], [-13.0, 13.0]
  ]],
  '4': [[ // Huambo - área maior
    [-12.2, 15.2], [-12.2, 16.2], [-13.2, 16.2], [-13.2, 15.2]
  ]],
  '6': [[ // Cabinda - área maior
    [-5.0, 11.8], [-5.0, 12.6], [-6.0, 12.6], [-6.0, 11.8]
  ]]
};

export default function MapaMembros({ membros, coordenadasProvincias, getCorMarcador }: MapaMembrosProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersRef = useRef<L.Layer[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Criar mapa apenas se não existir
    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([-11.2027, 17.8739], 6); // Centro de Angola
      
      // Adicionar camada base (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    
    // Limpar camadas existentes
    layersRef.current.forEach(layer => {
      map.removeLayer(layer);
    });
    layersRef.current = [];

    // Agrupar membros por província
    const membrosPorProvincia: Record<string, Membro[]> = {};
    
    membros.forEach(membro => {
      const provincia = membro.endereco.provincia;
      if (!membrosPorProvincia[provincia]) {
        membrosPorProvincia[provincia] = [];
      }
      membrosPorProvincia[provincia].push(membro);
    });

    console.log('Membros por província:', membrosPorProvincia); // Debug

    // Adicionar áreas coloridas para cada província
    Object.entries(membrosPorProvincia).forEach(([provincia, membrosNaProvincia]) => {
      // Encontrar o ID da província baseado na coordenada
      let provinciaId = '';
      Object.entries(coordenadasProvincias).forEach(([id, coords]) => {
        // Verificar se algum membro desta província está associado a estas coordenadas
        const membroMatch = membrosNaProvincia.some(m => 
          m.endereco.provincia === provincia
        );
        if (membroMatch) {
          provinciaId = id;
        }
      });

      // Se não encontrou por matching, usar fallback baseado no nome
      if (!provinciaId) {
        if (provincia.includes('Luanda')) provinciaId = '1';
        else if (provincia.includes('Huíla')) provinciaId = '2';
        else if (provincia.includes('Benguela')) provinciaId = '3';
        else if (provincia.includes('Huambo')) provinciaId = '4';
        else if (provincia.includes('Cabinda')) provinciaId = '6';
      }

      console.log(`Processando ${provincia} com ID ${provinciaId}`); // Debug

      if (provinciaId && poligonosProvincias[provinciaId]) {
        const poligonoCoords = poligonosProvincias[provinciaId];
        const coords = coordenadasProvincias[provinciaId];
        
        if (poligonoCoords && coords) {
          // Determinar cor com base na quantidade de membros
          let corArea;
          let opacidade;
          
          if (membrosNaProvincia.length >= 3) {
            corArea = '#10B981'; // Verde - alta concentração
            opacidade = 0.7;
          } else if (membrosNaProvincia.length >= 2) {
            corArea = '#F59E0B'; // Amarelo - média concentração
            opacidade = 0.6;
          } else {
            corArea = '#3B82F6'; // Azul - baixa concentração
            opacidade = 0.5;
          }

          console.log(`Criando área para ${provincia} com ${membrosNaProvincia.length} membros`); // Debug

          // Criar polígono da área
          const polygon = L.polygon(poligonoCoords, {
            color: corArea,
            fillColor: corArea,
            fillOpacity: opacidade,
            weight: 2
          }).addTo(map);

          // Adicionar popup com informações
          polygon.bindPopup(`
            <div style="min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; color: #1E3A8A;">${provincia}</h3>
              <p style="margin: 4px 0;"><strong>Total de Membros:</strong> ${membrosNaProvincia.length}</p>
              <p style="margin: 4px 0;"><strong>Alto Engajamento:</strong> ${membrosNaProvincia.filter(m => m.nivelEngajamento === 'alto').length}</p>
              <p style="margin: 4px 0;"><strong>Médio Engajamento:</strong> ${membrosNaProvincia.filter(m => m.nivelEngajamento === 'medio').length}</p>
              <p style="margin: 4px 0;"><strong>Baixo Engajamento:</strong> ${membrosNaProvincia.filter(m => m.nivelEngajamento === 'baixo').length}</p>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">
                Média de atividades: ${(membrosNaProvincia.reduce((acc, m) => acc + m.atividadesParticipadas, 0) / membrosNaProvincia.length || 0).toFixed(1)}
              </p>
            </div>
          `);

          layersRef.current.push(polygon);

          // Adicionar marcador no centro com o número de membros
          const centroLat = coords[0];
          const centroLng = coords[1];
          
          const marker = L.marker([centroLat, centroLng], {
            icon: L.divIcon({
              className: 'custom-div-icon',
              html: `
                <div style="
                  background-color: ${corArea};
                  border: 2px solid white;
                  border-radius: 50%;
                  width: 40px;
                  height: 40px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-weight: bold;
                  color: white;
                  font-size: 14px;
                  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                ">
                  ${membrosNaProvincia.length}
                </div>
              `,
              iconSize: [40, 40],
              iconAnchor: [20, 20]
            })
          }).addTo(map);

          marker.bindPopup(`
            <div style="min-width: 180px; text-align: center;">
              <h3 style="margin: 0 0 8px 0; color: #1E3A8A;">${provincia}</h3>
              <div style="
                font-size: 24px;
                font-weight: bold;
                color: ${corArea};
                margin: 8px 0;
              ">${membrosNaProvincia.length} membros</div>
              <p style="margin: 4px 0; font-size: 12px;">
                Clique na área para mais detalhes
              </p>
            </div>
          `);

          layersRef.current.push(marker);
        }
      }
    });

    // Ajustar zoom para mostrar todas as áreas
    if (Object.keys(membrosPorProvincia).length > 0) {
      const bounds = L.latLngBounds(
        Object.values(coordenadasProvincias).map(coords => L.latLng(coords[0], coords[1]))
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    return () => {
      // Cleanup opcional
    };
  }, [membros, coordenadasProvincias, getCorMarcador]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg"
      style={{ minHeight: '400px' }}
    />
  );
}