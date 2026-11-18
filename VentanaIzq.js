import React from 'react';
import { View, Text, Image } from 'react-native';

export default function VentanaIzq({ route }) {

  //Consultamos los datos ingresados, no hacemos conexión directa a supabase
  const nombre = route?.params?.nombre || 'Usuario';

  return (
    <View
  style={{
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',     
  }}
>
  <Text
    style={{
      fontSize: 30,
      color: 'blue',
      marginBottom: 20, 
    }}
  >
    Hola {nombre}
  </Text>

  <Image
    style={{
      width: 90,
      height: 90,
      borderRadius: 45, 
    }}
    source={require('./Imagenes/pocoyo.png')}
  />
</View>
  );
}