import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { UserDetailsPageComponent } from './components/user-details-page/user-details-page.component';


@NgModule({
  declarations: [
    UsersPageComponent,
    UserDetailsPageComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
