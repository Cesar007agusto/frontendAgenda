import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../model/tareas';
import { User } from '../model/user';
import { RegisterResponse } from '../model/register';




@Injectable({
  providedIn: 'root'
})
export class BringDataFromBackService {

//remoto
 // private UrlServer = 'https://backendagenda-azu1.onrender.com';
//local
  private UrlServer = 'http://localhost:3000';
  



  //API Tareas
  private apiUrlRead = this.UrlServer+'/tareas/paginate';
  private apiUrlCreate = this.UrlServer+'/tareas/create';
  private apiUrlEditTask = this.UrlServer+'/tareas/update';
  private apiUrlDeleteTask = this.UrlServer+'/tareas/delete/';

  //notificaciones
  private apiUrlNotifications = this.UrlServer+'/tareas/notificaciones';

  //API Excel
  private apiUrlXlsxDownload = this.UrlServer+'/excel/getExcel';
  private apiURLXlsxUpload = this.UrlServer+'/excel/uploadExcel';

  //API Register
  private apiUrlRegister = this.UrlServer+'/register/registro';

  //API Login
  private apiUrlLogin = this.UrlServer +'/login/validar';


  constructor(
    private http: HttpClient
  ) { }

  //Tareas
  //Obtener lista de tareas
  getTask(): Observable<any> {

    return this.http.get<any>(this.apiUrlRead);
  }

  // Método para enviar los datos del formulario
  createTask(objTarea: Tarea): Observable<any> {

    return this.http.post<any>(this.apiUrlCreate, objTarea);

  }

  //edit Task
  editTask(objTarea: Tarea) {

    return this.http.put<any>(this.apiUrlEditTask, objTarea);

  }




  //Delete Task
  deleteTask(codTarea: number) {
    return this.http.delete<any>(this.apiUrlDeleteTask + codTarea);
  }

  //notifications
  showNotifications(): Observable<any> {

    return this.http.get<any>(this.apiUrlNotifications);

  }

  //Excel
  downloadXlsx() {

    return this.http.get(this.apiUrlXlsxDownload, { responseType: 'blob' });
  }

  uploadXlsx(archivo: FormData) {

    return this.http.post(this.apiURLXlsxUpload, archivo);
  }




  //Registro
  registerUser(parametros: User): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.apiUrlRegister, parametros);
  }

  //login pendiente tipar el Observable
  login(parametros: User): Observable<any> {
    return this.http.post(this.apiUrlLogin, parametros);
  }




}
