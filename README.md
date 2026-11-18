# App móvil — Login y registro de usuario

Aplicación móvil académica desarrollada con React Native y Expo, con registro, inicio de sesión y gestión de perfiles de usuario.

## Tecnologías

- React Native + Expo
- JavaScript
- Supabase (base de datos y almacenamiento de imágenes)
- React Navigation (Stack y Drawer)

## Funcionalidades

- Registro de usuario con nombre, correo y contraseña
- Inicio de sesión
- Gestión de perfiles de usuario
- Navegación con menú lateral (Drawer)
- Carga de imágenes de perfil

## Cómo correr el proyecto

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Configura Supabase en `Login.js` y en `Bienvenido.js`, reemplazando `TU-PROYECTO` y `TU_CLAVE_PUBLISHABLE_DE_SUPABASE` por los datos de tu proyecto.
3. Inicia la app:
   ```bash
   npx expo start
   ```

> Nota: la URL y la clave de Supabase se quitaron del código por seguridad. Sin esos datos la app no se conecta a la base de datos.

## Autor

Jorge Valdez — Estudiante de Ingeniería en Informática, CUCEI, octavo semestre.
