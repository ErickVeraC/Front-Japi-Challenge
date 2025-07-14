# 🎟️ Event Management System — Full Stack App

Una plataforma para organizar eventos y realizar reservas de asistencia, desarrollada como parte de una prueba técnica.  
A platform to create and manage events and user reservations, built as part of a technical challenge.

---

## 🚀 Tecnologías / Tech Stack

**Backend**:

- NestJS (TypeScript)
- MongoDB + Mongoose
- JWT Authentication
- Class-validator

**Frontend**:

- Next.js (TypeScript)
- React + Context API
- Tailwind CSS
- ESLint + React Hook Form

---

## 📦 Instalación Local / Local Setup

### 1. Clona ambos repositorios (o carpetas separadas si es monorepo)

```bash
git clone git@github.com:ErickVeraC/Back-Japi-Challenge.git
git clone git@github.com:ErickVeraC/Front-Japi-Challenge.git
```

---

### 2. Backend

```bash
cd backend
npm install
```

#### Variables de entorno (.env)

```env
PORT=3000
```

#### Ejecutar localmente

```bash
npm run start:dev
```

Swagger UI disponible en `http://localhost:3000/api` (si habilitado).

---

### 3. Frontend

```bash
cd frontend
npm install
```

#### Variables de entorno (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

#### Ejecutar localmente

```bash
npm run dev
```

---

## ✨ Funcionalidades / Features

- 🔐 Registro e inicio de sesión con JWT
- 👤 Página de perfil con reservas activas
- 📅 Crear, editar y listar eventos
- 🎫 Reservar y cancelar asistencia
- 📉 Boletos disponibles decrecen automáticamente
- 🚫 No permite reservas duplicadas ni cuando ya no hay boletos
- 🛡️ Rutas protegidas por autenticación
- 📱 Interfaz responsiva con Tailwind

---

## 🔑 Endpoints Clave / Key Endpoints (Backend)

| Método | Ruta                   | Descripción              |
| ------ | ---------------------- | ------------------------ |
| POST   | /auth/register         | Registro de usuario      |
| POST   | /auth/login            | Inicio de sesión         |
| GET    | /events                | Listar todos los eventos |
| GET    | /events/:id            | Obtener evento por ID    |
| POST   | /events                | Crear evento (auth)      |
| PUT    | /events/:id            | Editar evento (auth)     |
| DELETE | /events/:id            | Eliminar evento (auth)   |
| POST   | /reservations/:eventId | Reservar evento (auth)   |
| DELETE | /reservations/:eventId | Cancelar reserva (auth)  |
| GET    | /reservations/me       | Ver mis reservas (auth)  |

---

## 🌐 Deploy

- **Frontend (Next.js)**: [Vercel Link](https://your-vercel-url.vercel.app)
- **Backend (NestJS)**:  
  Debido a limitaciones de recursos en Render (versión gratuita), el backend no está en producción. Sin embargo, puede ejecutarse localmente sin problemas siguiendo las instrucciones anteriores.

> The backend was not deployed due to resource limits on Render free tier. It runs smoothly locally.

---

## 🧠 Decisiones Técnicas / Technical Decisions

- Se utilizó Context API por ser suficiente para la escala del proyecto, evitando Redux u otras dependencias más complejas.
- La validación se maneja en ambos lados (React Hook Form + class-validator).
- El backend maneja errores 401 con redirección automática al frontend.
- La arquitectura sigue principios de separación de responsabilidades y uso de DTOs, guards, y servicios.
- No se usaron transacciones de Mongo por simplicidad, pero se contempla `findOneAndUpdate` atómico como mejora futura.

---

## 📌 Consideraciones Finales

- Si desea testear la app completa:
  1. Levante el backend localmente en puerto `3000`
  2. Use el frontend en Vercel con `NEXT_PUBLIC_API_URL=http://localhost:3000`
  3. O modifique la variable en `.env.local` del frontend

---

## 🤝 Autor / Author

## **Erick The Coder**

Full Stack JavaScrip Developer
