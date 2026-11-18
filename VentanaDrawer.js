import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';

export default class VentanaDrawer extends Component {

  render() {

    //Recibe datos desde MenuDrawer
    const nombre = this.props?.nombre || 'Usuario';
    const email = this.props?.email || 'correo@email.com';

    return (
      <DrawerContentScrollView {...this.props}>

        {/* Encabezado */}
        <View style={styles.headerContainer}>
        {/*Muestra la imagen del usuario predeterminada (Posteriormente podremos añadir foto del usuario*/}
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.profileImg}
          />
      {/*Muestra el nombre y correo del usuario actual en la sesión (no consulta la base de datos) */}
          <Text style={styles.userName}>{nombre}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>

        {/* Opciones del Drawer */}
        <DrawerItemList {...this.props} />

        {/* Esta opción devuelve al usuario al login una vez presionado el botón */}
        <DrawerItem
          label="Cerrar Sesión"
          onPress={() => this.props.navigation.replace('Login')}
          labelStyle={{ color: 'red' }}
        />

      </DrawerContentScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    alignItems: 'center'
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  userEmail: {
    fontSize: 14,
    color: 'gray'
  }
});