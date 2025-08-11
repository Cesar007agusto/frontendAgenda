import { AuthInterceptor } from './services/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { DashComponent } from './dash/dash.component';
import { CreateComponent } from './create/create.component';

import { DeleteComponent } from './delete/delete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ModalEditarComponent } from './modal-editar/modal-editar.component';

import { MatDialogModule } from '@angular/material/dialog';
import { ModalNotificationsComponent } from './modal-notifications/modal-notifications.component';
import { ToastrModule } from 'ngx-toastr';
import { UploadXlsxComponent } from './upload-xlsx/upload-xlsx.component';


@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    CreateComponent,
    DeleteComponent,
    ModalEditarComponent,
    ModalNotificationsComponent,
    UploadXlsxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', // puedes cambiarlo a top-right, top-center, etc.
      timeOut: 1000, // duración en ms
      preventDuplicates: true,
      progressBar: true
    })
  ],

  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }],

  bootstrap: [AppComponent]
})
export class AppModule {



}
