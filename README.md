# 🚗 KeepUp - Frontend (Documentación para Principiantes)

Bienvenido al repositorio del frontend de **KeepUp**. Este documento está diseñado para guiarte paso a paso por la estructura, la lógica y el funcionamiento de esta aplicación web construida con **Angular**.

Si nunca has tocado Angular, ¡no te preocupes! Aquí te explicamos cada pieza del rompecabezas.

---

## 📋 Requisitos Previos

Antes de empezar, necesitas tener instaladas dos herramientas fundamentales en tu computadora:

1.  **Node.js:** Es el "motor" que permite ejecutar herramientas de desarrollo web fuera del navegador.
    * [Descargar Node.js](https://nodejs.org/) (Usa la versión LTS).
2.  **Angular CLI:** Es la "caja de herramientas" de Angular para crear y correr el proyecto.
    * Una vez instalado Node.js, abre tu terminal y escribe:
        ```bash
        npm install -g @angular/cli
        ```

---

## 🚀 ¿Cómo correr el proyecto?

Sigue estos pasos para ver la aplicación en tu navegador:

1.  **Instalar dependencias:**
    Angular usa muchas librerías externas. Este comando las descarga todas en la carpeta `node_modules` (que no se sube al repositorio).
    ```bash
    npm install
    ```

2.  **Iniciar el servidor de desarrollo:**
    Este comando compila el código y abre un servidor local.
    ```bash
    ng serve
    ```

3.  **Ver la app:**
    Abre tu navegador (Chrome recomendado) y ve a: `http://localhost:4200/`

---

## 📂 Estructura del Proyecto (El Mapa)

Angular es un framework muy ordenado. Todo el código que escribimos vive dentro de la carpeta `src/app`. Hemos organizado este proyecto siguiendo una **Arquitectura Modular** profesional.

Imagina que la aplicación es una casa:

### 1. `src/app/core/` (Los Cimientos y Tuberías)
Aquí va todo lo que es **único** y esencial para que la app funcione, pero que no ves visualmente en pantalla. Se carga una sola vez.

* **`guards/auth.guard.ts` (El Portero):**
    * **¿Qué hace?** Protege las rutas. Antes de dejarte entrar a `/dashboard`, verifica si tienes un "Token" (pase de entrada) guardado. Si no, te patea al Login.
* **`interceptors/jwt.interceptor.ts` (El Mensajero):**
    * **¿Qué hace?** "Secuestra" cada petición que haces al servidor (Backend) y le pega una etiqueta con tu Token de seguridad. Así el servidor sabe quién eres sin que tengas que enviarlo manualmente cada vez.
* **`services/` (El Cerebro):**
    * Aquí está la lógica de negocio. Los componentes (la vista) no deben saber cómo hablar con el servidor; le piden el favor a los servicios.
    * **`auth.service.ts`:** Maneja Login, Registro y Logout.
    * **`alert.service.ts`:** Controla las notificaciones (las cajitas verdes o rojas que salen).

### 2. `src/app/shared/` (Los Muebles Reutilizables)
Aquí ponemos componentes que se usan en muchas habitaciones (módulos) diferentes.

* **`components/navbar/`:** La barra de navegación superior.
* **`components/toast/`:** Las alertas flotantes de éxito/error.
* **`components/modal/`:** Las ventanas emergentes de confirmación (ej. "¿Seguro que quieres borrar?").

### 3. `src/app/modules/` (Las Habitaciones)
Aquí es donde vive la funcionalidad real que ve el usuario. Usamos **Lazy Loading** (Carga Perezosa), lo que significa que el código de "Dashboard" no se descarga hasta que el usuario inicia sesión, haciendo la app más rápida.

* **`auth/` (Módulo de Autenticación):**
    * Contiene las páginas de `Login` y `Register`.
* **`dashboard/` (Módulo Principal):**
    * Es la zona privada. Contiene la gestión de Vehículos, Gastos, etc.
    * **`components/vehicle-list/`:** Muestra la tabla de carros. En celulares se transforma en tarjetas.
    * **`components/vehicle-form/`:** El formulario para crear o editar un carro.

---

## 🧠 Lógica Clave y Explicación de Código

### A. El Formulario de Vehículos (`vehicle-form.ts`)
Este es un ejemplo perfecto de cómo Angular maneja datos.

1.  **Reactive Forms:** No usamos formularios HTML simples. Usamos `FormGroup` y `FormBuilder` en TypeScript. Esto nos permite validar cosas complejas (ej. que la placa tenga solo mayúsculas y números) antes de que el usuario pueda presionar "Guardar".
2.  **Listas Dinámicas:** Para el "Tipo de Vehículo" (Carro, Moto, etc.), no escribimos el HTML 5 veces. Creamos una lista en el código (`vehicleOptions`) y usamos un bucle `*ngFor` en el HTML para dibujarlos.
3.  **Conexión al Backend:** Cuando das click en guardar:
    * El componente llama a `VehicleService`.
    * El servicio usa `HttpClient` para mandar un `POST` al servidor Java.
    * Si todo sale bien, `AlertService` muestra el mensaje verde.

### B. El Diseño (`styles.scss`)
No usamos CSS normal, usamos **SCSS**. Es como CSS con superpoderes.
* Definimos **Variables** (ej. `$primary-color: #0f172a`) en un solo lugar. Si queremos cambiar el azul de toda la app, solo cambiamos esa línea y todo se actualiza.
* El diseño está inspirado en **Grupo R5**, buscando ser limpio, corporativo y fácil de usar.

---

## 🔌 Conexión con el Backend

Esta aplicación no funciona sola; necesita un "Backend" (servidor) para guardar los datos.

* **URL del Servidor:** Está configurada en `src/environments/environment.ts`. Actualmente apunta a `http://localhost:8080/api`.
* **Manejo de Datos:**
    * El Frontend envía JSON con nombres específicos (ej. `licensePlate`).
    * El Backend (Java Spring Boot) recibe ese JSON, lo valida y lo guarda en una base de datos PostgreSQL.

---

## 🛠 Comandos Útiles

| Comando | Descripción |
| :--- | :--- |
| `ng serve` | Inicia la aplicación en modo desarrollo. |
| `ng generate component nombre` | Crea un nuevo componente automáticamente. |
| `ng generate service nombre` | Crea un nuevo servicio automáticamente. |
| `Ctrl + C` | Detiene el servidor en la terminal. |

---

### 💡 Consejos para el Desarrollador Nuevo

1.  **La Consola es tu amiga:** Si algo no funciona, presiona `F12` en el navegador y mira la pestaña "Console". Los errores rojos te dirán qué pasó.
2.  **La pestaña Network:** En `F12` -> "Network" puedes ver si las peticiones al servidor están saliendo y qué están respondiendo.
3.  **No tengas miedo de romperlo:** Tienes el control de versiones (Git). Si algo sale mal, siempre puedes volver atrás.

---

*Este proyecto fue desarrollado siguiendo mejores prácticas de arquitectura de software, patrones de diseño y principios SOLID.*











-------
This repository contains the official frontend application for the KeepUp platform. It is a client-side web application (built with [Angular]) that provides the complete user interface (UI) for managing resources. It communicates with the keepup-api to fetch and persist data, allowing users to register, track, and manage their vehicles and other assets.

```
keepup-ui/
├── .github/
│   └── pull_request_template.md
│
├── src/
│   ├── app/
│   │   ├── core/                               # Servicios globales, guards, interceptores
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   └── jwt.interceptor.ts
│   │   │   └── services/
│   │   │       └── local-storage.service.ts
│   │   │
│   │   ├── modules/                            # Feature Modules (Lazy Loaded)
│   │   │   ├── auth/                           # Módulo de Autenticación – SPRINT 1
│   │   │   │   ├── components/
│   │   │   │   │   ├── login/
│   │   │   │   │   │   └── login.component.ts
│   │   │   │   │   └── register/
│   │   │   │   │       └── register.component.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── auth.service.ts
│   │   │   │   ├── auth-routing.module.ts
│   │   │   │   └── auth.module.ts
│   │   │
│   │   │   └── dashboard/                      # Módulo principal post-login – SPRINT 1 y 2
│   │   │       ├── components/
│   │   │       │   ├── vehicle-list/
│   │   │       │   ├── vehicle-form/
│   │   │       │   ├── document-list/
│   │   │       │   └── expense-list/
│   │   │       ├── services/
│   │   │       │   ├── vehicle.service.ts
│   │   │       │   ├── document.service.ts
│   │   │       │   └── expense.service.ts
│   │   │       ├── dashboard-routing.module.ts
│   │   │       └── dashboard.module.ts
│   │   │
│   │   ├── shared/                             # Componentes y pipes reusables
│   │   │   ├── components/
│   │   │   │   ├── navbar/
│   │   │   │   │   └── navbar.component.ts
│   │   │   │   ├── alert-bell/
│   │   │   │   │   └── alert-bell.component.ts
│   │   │   │   └── modal/
│   │   │   │       └── modal.component.ts
│   │   │   ├── pipes/
│   │   │   └── shared.module.ts
│   │   │
│   │   ├── app-routing.module.ts               # Rutas principales
│   │   ├── app.component.html                  # <router-outlet></router-outlet>
│   │   ├── app.component.ts
│   │   └── app.module.ts                       # Módulo raíz
│   │
│   ├── assets/                                 # Imágenes, iconos, data .json
│   └── environments/                           # Variables de entorno (APIs)
│       ├── environment.ts
│       └── environment.prod.ts
│
├── angular.json
└── package.json
```
