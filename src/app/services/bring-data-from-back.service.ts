import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../model/tareas';
import { User } from '../model/user';
import axios from 'axios';
import { RegisterResponse } from '../model/registerInterface';




@Injectable({
  providedIn: 'root'
})
export class BringDataFromBackService {
  //API Tareas
  private apiUrlRead = 'http://localhost:3000/tareas/paginate';
  private apiUrlCreate = 'http://localhost:3000/tareas/create';
  private apiUrlDeleteTask = 'http://localhost:3000/tareas/delete/';

  //API Excel
  private apiUrlXlsxDownload = 'http://localhost:3000/excel/getExcel';
  private apiURLXlsxUpload = 'http://localhost:3000/excel/uploadExcel';

  //API Register
  private apiUrlRegister = 'http://localhost:3000/register/registro';

  //API Login
  private apiUrlLogin ='http://localhost:3000/login/validar';



  constructor(private http: HttpClient) { }

  //Tareas
  //Obtener lista de tareas
  getTask(): Observable<any> {
    return this.http.get<any>(this.apiUrlRead);
  }

  // Método para enviar los datos del formulario
  createTask(objTarea: Tarea): Observable<any> {
    return this.http.post<any>(this.apiUrlCreate, objTarea);
  }

  //Delete Task
  deleteTask(codTarea: number) {
    return this.http.delete<any>(this.apiUrlDeleteTask + codTarea);
  }

  //notificaciones
  async showNotifications() {
    try {
      const notificaciones = await axios.get('http://localhost:3000/tareas/notificaciones');
      console.log("datos ", notificaciones.data);
      return notificaciones.data;

    } catch (error) {
      console.error('Error al obtener datos:', error);
      throw error;
    }
  }

  //Excel
  downloadXlsx() {
    return this.http.get(this.apiUrlXlsxDownload, { responseType: 'blob' });
  }

  uploadXlsx(archivo: FormData) {
    return this.http.post(this.apiURLXlsxUpload, archivo);
  }




  //Registro
  registerUser(parametros:User): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.apiUrlRegister,parametros);
  }

  //login pendiente tipar el Observable
  login(parametros:User):Observable<any>{
    return this.http.post(this.apiUrlLogin,parametros);
  }




}
