import { StyleSheet } from 'react-native';

export const ROJO_RECETARIO = '#C0392B';
export const FONDO_RECETARIO = '#F5F0EB';

// Colores pastel que se van turnando en las tarjetas
const pasteles = ['#F2D7CF', '#F5E3C3', '#F2D7E3', '#F5EDC8', '#D6E4F0', '#DDEBD5'];
export function colorPastel(indice) {
  return pasteles[indice % pasteles.length];
}

// Estilos que comparten varias pantallas del recetario
export const estilosComunes = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: FONDO_RECETARIO },
  tarjeta: { flex: 1, maxWidth: '48.5%', backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden' },
  imagen: { width: '100%', aspectRatio: 1.2 },
  nombreCaja: { padding: 12 },
  nombre: { fontWeight: 'bold', fontSize: 15, lineHeight: 20, color: '#2b1d16' },
});
