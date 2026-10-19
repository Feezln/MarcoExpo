import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getLicencia } from '../services/licenciaService';

function InfoFila({ etiqueta, valor }) {
  return (
    <View style={styles.fila}>
      <Text style={styles.etiqueta}>{etiqueta}</Text>
      <Text style={styles.valor}>{valor}</Text>
    </View>
  );
}

export default function LicenciaScreen() {
  const [licencia, setLicencia] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [errorServidor, setErrorServidor] = useState(null); // Nuevo estado para capturar errores

  useEffect(() => {
    const cargarDatosLicencia = async () => {
      try {
        const data = await getLicencia();
        setLicencia(data);
      } catch (error) {
        console.error("Error detallado al conectar con el backend:", error);
        setErrorServidor("No se pudo conectar con el servidor .NET. Revisa si está corriendo.");
      } finally {
        setCargando(false);
      }
    };

    cargarDatosLicencia();
  }, []);

  // 1. Si está cargando, mostramos el indicador
  if (cargando) {
    return (
      <SafeAreaView style={[styles.pantalla, styles.centrado]}>
        <ActivityIndicator size="large" color="#0077b6" />
        <Text style={{ marginTop: 10, color: '#0077b6' }}>Cargando licencia desde .NET...</Text>
      </SafeAreaView>
    );
  }

  // 2. Si hubo un error de conexión, mostramos un mensaje amigable en lugar de crashear
  if (errorServidor || !licencia) {
    return (
      <SafeAreaView style={[styles.pantalla, styles.centrado]}>
        <Text style={{ color: 'red', fontSize: 16, textAlign: 'center', paddingHorizontal: 20, fontWeight: 'bold' }}>
          {errorServidor || "No hay datos disponibles de la licencia."}
        </Text>
        <Text style={{ color: '#666', fontSize: 12, marginTop: 10, textAlign: 'center', paddingHorizontal: 20 }}>
          Asegúrate de ejecutar `dotnet run` en tu API y revisa la IP en tu archivo api/client.js
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.pantalla}>
      <View style={styles.contenedor}>
        <View style={styles.card}>
          <View style={styles.encabezado}>
            <Text style={styles.tituloEncabezado}>FONDO DE BIKINI</Text>
            <Text style={styles.subtituloEncabezado}>Licencia de Conducir</Text>
          </View>

          <View style={styles.filaPrincipal}>
            <Image source={{ uri: licencia.foto }} style={styles.foto} />
            <View style={styles.datosPrincipales}>
              <Text style={styles.nombre}>{licencia.nombre}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeTexto}>{licencia.estado}</Text>
              </View>
            </View>
          </View>

          <View style={styles.linea} />

          <InfoFila etiqueta="No. de Licencia" valor={licencia.numeroLicencia} />
          <InfoFila etiqueta="Fecha de Nacimiento" valor={licencia.fechaNacimiento} />
          <InfoFila etiqueta="Fecha de Vencimiento" valor={licencia.fechaVencimiento} />
          <InfoFila etiqueta="Tipo" valor={licencia.tipoLicencia} />
          <InfoFila etiqueta="Dirección" valor={licencia.direccion} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#e6f7ff' },
  centrado: { justifyContent: 'center', alignItems: 'center' },
  contenedor: { padding: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  encabezado: { alignItems: 'center', marginBottom: 16 },
  tituloEncabezado: { fontSize: 12, letterSpacing: 2, color: '#0077b6', fontWeight: '700' },
  subtituloEncabezado: { fontSize: 18, fontWeight: 'bold', color: '#023e8a' },
  filaPrincipal: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  foto: { width: 90, height: 90, borderRadius: 12, marginRight: 16, borderWidth: 2, borderColor: '#0077b6' },
  datosPrincipales: { flex: 1 },
  nombre: { fontSize: 18, fontWeight: 'bold', color: '#03045e', marginBottom: 6 },
  badge: {
    backgroundColor: '#b7e4c7',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeTexto: { color: '#2d6a4f', fontSize: 12, fontWeight: '600' },
  linea: { height: 1, backgroundColor: '#ddd', marginVertical: 10 },
  fila: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  etiqueta: { fontSize: 13, color: '#666' },
  valor: { fontSize: 13, fontWeight: '600', color: '#333', flexShrink: 1, textAlign: 'right' },
});