import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashComponent } from './dash/dash.component';
import { CreateComponent } from './create/create.component';

import { DeleteComponent } from './delete/delete.component';
import { RegisterComponent } from './login/register/register.component';
import {loginGuard} from '../app/guards/login.guard';

const appRoutes:Routes=[

  {
    path: '',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginModule)
  },
  {path:'dash',component:DashComponent,canActivate:[loginGuard]},
  //{path:'add',component:CreateComponent},
  //{path:'delete/:nombre',component:DeleteComponent},
  {path:'register',component:RegisterComponent}

  
  
  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],exports: [RouterModule]
})
export class AppRoutingModule { }
