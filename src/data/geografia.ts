// Definições geográficas para Angola
export interface Municipio {
  id: string;
  nome: string;
  provinciaId: string;
}

export interface Provincia {
  id: string;
  nome: string;
  sigla: string;
}

export const provinciasAngola: Provincia[] = [
  { id: '1', nome: 'Luanda', sigla: 'LUA' },
  { id: '2', nome: 'Huíla', sigla: 'HUI' },
  { id: '3', nome: 'Benguela', sigla: 'BGU' },
  { id: '4', nome: 'Huambo', sigla: 'HUA' },
  { id: '5', nome: 'Bié', sigla: 'BIE' },
  { id: '6', nome: 'Cabinda', sigla: 'CAB' },
  { id: '7', nome: 'Cuando Cubango', sigla: 'CCU' },
  { id: '8', nome: 'Cuanza Norte', sigla: 'CCN' },
  { id: '9', nome: 'Cuanza Sul', sigla: 'CCS' },
  { id: '10', nome: 'Cunene', sigla: 'CNN' },
  { id: '11', nome: 'Lunda Norte', sigla: 'LNO' },
  { id: '12', nome: 'Lunda Sul', sigla: 'LSU' },
  { id: '13', nome: 'Malanje', sigla: 'MAL' },
  { id: '14', nome: 'Moxico', sigla: 'MOX' },
  { id: '15', nome: 'Namibe', sigla: 'NAM' },
  { id: '16', nome: 'Uíge', sigla: 'UIG' },
  { id: '17', nome: 'Zaire', sigla: 'ZAI' }
];

export const municipiosAngola: Municipio[] = [
  // Luanda
  { id: '101', nome: 'Luanda', provinciaId: '1' },
  { id: '102', nome: 'Belas', provinciaId: '1' },
  { id: '103', nome: 'Cacuaco', provinciaId: '1' },
  { id: '104', nome: 'Cazenga', provinciaId: '1' },
  { id: '105', nome: 'Ícolo e Bengo', provinciaId: '1' },
  { id: '106', nome: 'Quiçama', provinciaId: '1' },
  { id: '107', nome: 'Viana', provinciaId: '1' },

  // Huíla
  { id: '201', nome: 'Lubango', provinciaId: '2' },
  { id: '202', nome: 'Chibia', provinciaId: '2' },
  { id: '203', nome: 'Chicomba', provinciaId: '2' },
  { id: '204', nome: 'Cuvango', provinciaId: '2' },
  { id: '205', nome: 'Humpata', provinciaId: '2' },

  // Benguela
  { id: '301', nome: 'Benguela', provinciaId: '3' },
  { id: '302', nome: 'Balombo', provinciaId: '3' },
  { id: '303', nome: 'Baía Farta', provinciaId: '3' },
  { id: '304', nome: 'Catumbela', provinciaId: '3' },
  { id: '305', nome: 'Chongorói', provinciaId: '3' },

  // Huambo
  { id: '401', nome: 'Huambo', provinciaId: '4' },
  { id: '402', nome: 'Caála', provinciaId: '4' },
  { id: '403', nome: 'Catchiungo', provinciaId: '4' },
  { id: '404', nome: 'Longonjo', provinciaId: '4' },
  { id: '405', nome: 'Mungo', provinciaId: '4' },

  // Cabinda
  { id: '601', nome: 'Cabinda', provinciaId: '6' },
  { id: '602', nome: 'Buco-Zau', provinciaId: '6' },
  { id: '603', nome: 'Cacongo', provinciaId: '6' },
  { id: '604', nome: 'Landana', provinciaId: '6' }
];

// Função auxiliar para obter municípios de uma província específica
export const getMunicipiosPorProvincia = (provinciaId: string): Municipio[] => {
  return municipiosAngola.filter(municipio => municipio.provinciaId === provinciaId);
};

// Função auxiliar para obter nome da província pelo ID
export const getNomeProvincia = (provinciaId: string): string => {
  const provincia = provinciasAngola.find(p => p.id === provinciaId);
  return provincia ? provincia.nome : '';
};