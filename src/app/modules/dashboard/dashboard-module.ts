import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing-module';
import { Dashboard } from './dashboard';
import { VehicleList } from './components/vehicle-list/vehicle-list';
import { VehicleForm } from './components/vehicle-form/vehicle-form';
import { DocumentList } from './components/document-list/document-list';
import { ExpenseList } from './components/expense-list/expense-list';
import { SharedModule } from "../../shared-module";


@NgModule({
  declarations: [
    Dashboard,
    VehicleList,
    VehicleForm,
    DocumentList,
    ExpenseList
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule
]
})
export class DashboardModule { }
