import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { RegisterComponent } from './login/register/register.component';
import {loginGuard} from '../app/guards/login.guard';
import { UploadXlsxComponent } from './upload-xlsx/upload-xlsx.component';
import { userGuardGuard } from './guards/user-guard.guard';





const appRoutes:Routes=[

  {
    path: '',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginModule)
  },
  {path:'dash',component:DashComponent,canActivate:[loginGuard]},

  {path:'register',component:RegisterComponent},

  {path:'upload',component:UploadXlsxComponent,canActivate:[userGuardGuard]}
  
  
  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],exports: [RouterModule]
})
export class AppRoutingModule { }
