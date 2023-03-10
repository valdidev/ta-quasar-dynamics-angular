import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

// components
import { UsersPageComponent } from './components/users-page/users-page.component';
import { UserDetailsPageComponent } from './components/user-details-page/user-details-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardContainerComponent } from './container/dashboard-container.component';
import { CreateUserPageComponent } from './components/create-user-page/create-user-page.component';

// others
import { MaterialModule } from '@shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsersPageComponent,
    UserDetailsPageComponent,
    NavbarComponent,
    DashboardContainerComponent,
    CreateUserPageComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
