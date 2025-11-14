This repository contains the official frontend application for the KeepUp platform. It is a client-side web application (built with [React/Angular]) that provides the complete user interface (UI) for managing resources. It communicates with the keepup-api to fetch and persist data, allowing users to register, track, and manage their vehicles and other assets.

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
