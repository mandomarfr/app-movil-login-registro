import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://TU-PROYECTO.supabase.co',
  'TU_CLAVE_PUBLISHABLE_DE_SUPABASE'
);

export default function Bievenido() {

  const width1 = Dimensions.get('window').width;

  const [imagenes, setImagenes] = useState([]);

  //Cargar imágenes del bucket
  useEffect(() => {
    cargarImagenes();
  }, []);

  async function cargarImagenes() {

    const { data, error } = await supabase
      .storage
      .from('imagenes')
      .list();

    if (error) {
      console.log(error);
      return;
    }

    const urls = data.map((img) => ({
      id: img.name,
      name: img.name,
      image:
        `https://TU-PROYECTO.supabase.co/storage/v1/object/public/imagenes/${img.name}`
    }));

    setImagenes(urls);
  }

  //Seleccionar imagen
  async function seleccionarImagen() {

    const permiso =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permiso.granted) {

      Alert.alert(
        "Permiso requerido",
        "Debes permitir acceso a las imágenes"
      );

      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
    });

    if (result.canceled) return;

    subirImagen(result.assets[0].uri);
  }

  //Subir imagen
  async function subirImagen(uri) {

    try {

      const nombreArchivo = `img_${Date.now()}.jpg`;

      const response = await fetch(uri);

      const arrayBuffer = await response.arrayBuffer();

      const { error } = await supabase
        .storage
        .from('imagenes')
        .upload(nombreArchivo, arrayBuffer, {
          contentType: 'image/jpeg'
        });

      if (error) {

        console.log(error);

        Alert.alert(
          "Error",
          error.message
        );

        return;
      }

      Alert.alert(
        "Listo",
        "Imagen subida"
      );

      cargarImagenes();

    } catch (e) {

      console.log(e);

      Alert.alert(
        "Error",
        "No se pudo subir"
      );
    }
  }

  //Eliminar imagen
  async function eliminarImagen(nombre) {

    Alert.alert(
      "Eliminar",
      "¿Deseas eliminar esta imagen?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },

        {
          text: "Eliminar",

          onPress: async () => {

            const { error } = await supabase
              .storage
              .from('imagenes')
              .remove([nombre]);

            if (error) {

              Alert.alert(
                "Error",
                "No se pudo eliminar"
              );

              return;
            }

            Alert.alert(
              "Listo",
              "Imagen eliminada"
            );

            cargarImagenes();
          }
        }
      ]
    );
  }

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Personajes de JJK
      </Text>

      <TouchableOpacity
        style={styles.boton}
        onPress={seleccionarImagen}
      >

        <Text style={styles.textoBoton}>
          Subir Imagen
        </Text>

      </TouchableOpacity>

      <ScrollView
  horizontal
  pagingEnabled
  showsHorizontalScrollIndicator={false}

  contentContainerStyle={{
    alignItems: 'center'
  }}
>

        {imagenes.map((item) => (

          <View key={item.id}>

            <Image
              source={{ uri: item.image }}
              style={{
                width: width1,
                height: 300,
                resizeMode: 'contain'
              }}
            />

            <TouchableOpacity
              style={styles.botonEliminar}
              onPress={() => eliminarImagen(item.name)}
            >

              <Text style={styles.textoBoton}>
                Eliminar Imagen
              </Text>

            </TouchableOpacity>

          </View>

        ))}

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 40
  },

  titulo: {
    fontSize: 28,
    color: 'purple',
    textAlign: 'center',
    marginBottom: 15
  },

  boton: {
    backgroundColor: '#1CCC16',
    padding: 12,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center'
  },

  botonEliminar: {
    backgroundColor: '#8F1010',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center'
  },

  textoBoton: {
    color: 'white',
    fontSize: 16
  }

});