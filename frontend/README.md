
# Proyecto - CRUD de Productos con Autenticación JWT

Este proyecto fullstack implementa un sistema CRUD de productos protegido mediante autenticación JWT. Solo los usuarios autenticados pueden crear, actualizar o eliminar productos. Los usuarios no autenticados pueden ver la lista de productos. Además, el sistema permite registrarse y hacer login mediante un sistema de usuarios.

## Tecnologías usadas

### Frontend
- **React** 19.1.0
- **React Router DOM**: Navegación entre rutas
- **Axios**: Solicitudes HTTP
- **React Testing Library**: Testing

### Backend
- **NestJS** 11
- **MongoDB** + **Mongoose**
- **JWT**: Autenticación
- **Bcrypt**: Encriptación de contraseñas
- **TypeScript**
- **Jest**: Testing
- **ESLint + Prettier**: Linter y formateador

## Instalación y ejecución

```bash
# 1. Clonar el repositorio
https://github.com/Dairymateo/DeberLogin.git

# 2. Instalar dependencias del backend
cd login
npm install

# 3. Levantar el backend en modo desarrollo
npm run start:dev

# 4. Instalar dependencias del frontend
cd ../frontend
npm install

# 5. Levantar el frontend
npm start
```

Asegúrate de tener una instancia de MongoDB activa (local o Atlas). Este proyecto se conecta a una base llamada `Login`, usando las colecciones `Users` y `Products`.

## Funcionalidad protegida

- Crear producto (solo autenticado)
- Actualizar producto (solo autenticado)
- Eliminar producto (solo autenticado)
- Ver productos (acceso público)
- Registrar usuario
- Iniciar sesión (con JWT)

## Estructura del proyecto

### Backend
```
backend/
├── src/
│   ├── auth/             # Módulo de autenticación (signup/login)
│   │   ├── dto/
│   │   ├── schemas/
│   │   ├── auth.controller.ts
│   │   ├── auth.guard.ts
│   │   ├── auth.module.ts
│   │   └── auth.service.ts
│   ├── config/
│   ├── products/         # Módulo de productos
│   │   ├── dto/
│   │   ├── schemas/
│   │   ├── products.controller.ts
│   │   ├── products.module.ts
│   │   └── products.service.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test/
├── node_modules/
├── .env
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── nest-cli.json
├── package-lock.json
└── package.json
```

### Frontend
```
frontend/
├── src/
│   ├── Componentes/      # Componentes de UI reutilizables
│   │   ├── Assets/
│   │   ├── CRUDOperations.css
│   │   ├── CRUDOperations.jsx
│   │   ├── Login.css
│   │   ├── Login.jsx
│   │   ├── Products.css
│   │   ├── Products.jsx
│   │   └── Signup.jsx
│   ├── Context/          # Contexto para la gestión de estado (ej., Autenticación)
│   │   └── AuthContext.js
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── public/
├── node_modules/
├── .gitignore
├── package-lock.json
└── package.json
```

## Dependencias del frontend (React)

```json
"dependencies": {
  "@testing-library/dom": "^10.4.0",
  "@testing-library/jest-dom": "^6.6.3",
  "@testing-library/react": "^16.3.0",
  "@testing-library/user-event": "^13.5.0",
  "axios": "^1.8.4",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^7.5.0",
  "react-scripts": "5.0.1",
  "web-vitals": "^2.1.4"
}
```

## Dependencias del backend (NestJS)

```json
"dependencies": {
  "@nestjs/common": "^11.0.13",
  "@nestjs/config": "^4.0.2",
  "@nestjs/core": "^11.0.13",
  "@nestjs/jwt": "^11.0.0",
  "@nestjs/mapped-types": "*",
  "@nestjs/mongoose": "^11.0.3",
  "@nestjs/platform-express": "^11.0.1",
  "bcrypt": "^5.1.1",
  "class-transformer": "^0.5.1",
  "class-validator": "^0.14.1",
  "mongoose": "^8.13.2",
  "reflect-metadata": "^0.2.2",
  "rxjs": "^7.8.1"
}
```

## Endpoints disponibles

### Users (Autenticación)
| Método | Ruta        | Descripción         |
|--------|-------------|---------------------|
| POST   | /auth/signup| Registro de usuario |
| POST   | /auth/login | Login y JWT         |

### Products
| Método | Ruta         | Descripción               |
|--------|--------------|---------------------------|
| GET    | /products    | Obtener todos los productos |
| POST   | /products    | Crear producto (protegido)  |
| PUT    | /products/:id| Actualizar producto (protegido) |
| DELETE | /products/:id| Eliminar producto (protegido)   |
```
