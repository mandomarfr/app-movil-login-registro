import { View, Text, StyleSheet } from 'react-native';

export default function Ventana1({ route }) {

//Consultamos los datos ingresados, no hacemos conexión directa a supabase
//Se dejó de utilizar y ahora los datos los muestra el archivo Ventanaizq
  const nombre = route?.params?.nombre || 'Usuario';

  return (
    <View style={styles.container}>
      <Text style={styles.bienvenido}>Bienvenido</Text>
      <Text style={styles.nombre}>{nombre}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bienvenido: {
    fontSize: 22,
    color: '#333'
  },
  nombre: {
    fontSize: 26,
    marginTop: 8
  }
});