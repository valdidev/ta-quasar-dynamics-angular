import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { DashboardContainerComponent } from './container/dashboard-container.component';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { UserDetailsPageComponent } from './components/user-details-page/user-details-page.component';
import { CreateUserPageComponent } from './components/create-user-page/create-user-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardContainerComponent,
    children: [
      {
        path: '',
        component: UsersPageComponent,
      },
      {
        path: 'create-user',
        component: CreateUserPageComponent,
      },
      {
        path: 'user/:userId',
        component: UserDetailsPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
