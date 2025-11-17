import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard';
import { VehicleList } from './components/vehicle-list/vehicle-list';
import { VehicleForm } from './components/vehicle-form/vehicle-form';
import { DocumentList } from './components/document-list/document-list';
import { ExpenseList } from './components/expense-list/expense-list';

const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    children: [
      { 
        path: 'vehicles', 
        component: VehicleList, 
        data: { animation: 'VehiclePage' } 
      },
      { 
        path: 'vehicles/new', 
        component: VehicleForm, 
        data: { animation: 'VehicleFormPage' }
      },
      { 
        path: 'vehicles/edit/:id', 
        component: VehicleForm, 
        data: { animation: 'VehicleFormPage' } 
      }, 
      { 
        path: 'documents', 
        component: DocumentList, 
        data: { animation: 'DocumentPage' } 
      },
      { 
        path: 'expenses', 
        component: ExpenseList, 
        data: { animation: 'ExpensePage' }
      },
      { path: '', redirectTo: 'vehicles', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }