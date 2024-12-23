import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'devices', loadChildren: () => import('./modules/devices/devices.module').then(m => m.DevicesModule) },
  { path: 'error', loadChildren: () => import('./modules/error/error.module').then(m => m.ErrorModule) },
  { path: '**', redirectTo: 'error' }, // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
