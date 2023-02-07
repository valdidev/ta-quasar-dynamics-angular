import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlreadyLoggedGuard } from '@core/guards/already-logged.guard';
import { ValidateSessionGuard } from '@core/guards/validate-session.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [ValidateSessionGuard],
  },
  {
    // public
    path: 'auth',
    loadChildren: () =>
      import('@modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [AlreadyLoggedGuard],
  },
  {
    // private
    path: 'dashboard',
    loadChildren: () =>
      import('@modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [ValidateSessionGuard],
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
