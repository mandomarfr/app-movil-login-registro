import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import CryptoJS from 'crypto-js';

//Conexión a la base de datos en supabase
const supabase = createClient(
  'https://TU-PROYECTO.supabase.co',
  'TU_CLAVE_PUBLISHABLE_DE_SUPABASE'
);

//Definición de variables
export default function Login({ navigation }) {

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [esRegistro, setEsRegistro] = useState(false);

  //Error de campos vacios 
  function camposVacios() {
    if (correo === '' || password === '' || (esRegistro && nombre === '')) {
      Alert.alert("Error", "Completa todos los campos");
      return true;
    }
    return false;
  }

  //Login principal (Iniciar sesión)
  async function login() {

    if (camposVacios()) return;

    const { data } = await supabase
      .from('usuario')
      .select('*')
      .eq('correo', correo)
      .single();

    if (!data) {
      Alert.alert("Error", "Usuario no encontrado");
      return;
    }

    // Función para desencriptar contraseña
    const bytes = CryptoJS.AES.decrypt(data.password, "mi-clave");
    const pass = bytes.toString(CryptoJS.enc.Utf8);

    if (password !== pass) {
      Alert.alert("Error", "Contraseña incorrecta");
      return;
    }

    //Enviamos los parametros nombre y correo para el Drawer 
    navigation.navigate('Bienvenida', { nombre: data.nombre, email: data.correo });
  }

  //Registro de usuario
  async function registrar() {

    if (camposVacios()) return;
    
    //Encriptación de contraseña
    const passEncriptada = CryptoJS.AES.encrypt(password, "mi-clave").toString();

    await supabase.from('usuario').insert([
      { nombre, correo, password: passEncriptada }
    ]);

    Alert.alert("Listo", "Usuario registrado");

    setNombre('');
    setCorreo('');
    setPassword('');
    setEsRegistro(false);
  }

  //Botones
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        {esRegistro ? "Registro" : "Login"}
      </Text>

      {esRegistro && (
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={esRegistro ? registrar : login}
      >
        <Text style={styles.buttonText}>
          {esRegistro ? "Registrar" : "Entrar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button2}
        onPress={() => setEsRegistro(!esRegistro)}
      >
        <Text style={styles.buttonText}>
          {esRegistro ? "Ir a pantalla principal" : "Ir a Registro"}
        </Text>
      </TouchableOpacity>

    </View>
  );
}

//Estilos de la pagina
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    marginBottom: 20
  },
  input: {
    width: 250,
    height: 50,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10
  },
  button: {
    backgroundColor: '#050782',
    padding: 10,
    marginBottom: 10
  },
  button2: {
    backgroundColor: '#0C0F66',
    padding: 10
  },
  buttonText: {
    color: '#fff'
  }
});