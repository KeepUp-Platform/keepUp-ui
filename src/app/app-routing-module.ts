import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // 1. Regla para la ruta vacía (Raíz)
  {
    path: '',
    redirectTo: 'auth/login', // O 'auth' si prefieres que el AuthModule decida
    pathMatch: 'full' // ¡Vital! Explico abajo por qué
  },
  
  { 
    path: 'auth', 
    loadChildren: () => import('./modules/auth/auth-module').then(m => m.AuthModule) 
  },
  { 
    path: 'dashboard', 
    loadChildren: () => import('./modules/dashboard/dashboard-module').then(m => m.DashboardModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }