import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

// components
import { UsersPageComponent } from './components/users-page/users-page.component';
import { UserDetailsPageComponent } from './components/user-details-page/user-details-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from '@shared/material.module';
import { DashboardContainerComponent } from './container/dashboard-container.component';


@NgModule({
  declarations: [
    UsersPageComponent,
    UserDetailsPageComponent,
    NavbarComponent,
    DashboardContainerComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ]
})
export class DashboardModule { }
