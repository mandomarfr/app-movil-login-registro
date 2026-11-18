import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import VentanaIzq from './VentanaIzq';
import VentanaDrawer from './VentanaDrawer';
import Bievenido from './Bienvenido'

const Drawer = createDrawerNavigator();

export default function MenuDrawer({ route }) {

  const nombre = route?.params?.nombre;
  const email = route?.params?.email;

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <VentanaDrawer {...props} nombre={nombre} email={email} />
      )}
      screenOptions={{
        drawerActiveTintColor: '#6200ee',
        drawerInactiveTintColor: '#333',
      }}
    >

      <Drawer.Screen
        name="Inicio"
        component={VentanaIzq}
        initialParams={{ nombre, email }}
      />

      <Drawer.Screen
        name="Bienvenida"
        component={Bievenido}
      />

    </Drawer.Navigator>
  );
}