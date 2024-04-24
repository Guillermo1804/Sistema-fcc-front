import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments/environment';
import { FacadeServiceService } from './facade-service.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AdminstradoresService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeServiceService: FacadeServiceService,
  ) {  }

  public esquemaAdmin(){
    return {
      'rol':'',
      'clave_admin': '',
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'confirmar_password': '',
      'telefono': '',
      'rfc': '',
      'edad': '',
      'ocupacion': ''
    }
  }

//Validación para el formulario
public validarAdmin(data: any, editar: boolean){
  console.log("Validando admin... ", data);
  let error: any = [];

  if(!this.validatorService.required(data["clave_admin"])){
    error["clave_admin"] = this.errorService.required;
  }

  if(!this.validatorService.required(data["first_name"])){
    error["first_name"] = this.errorService.required;
  }

  if(!this.validatorService.required(data["last_name"])){
    error["last_name"] = this.errorService.required;
  }

  if(!this.validatorService.required(data["email"])){
    error["email"] = this.errorService.required;
  }else if(!this.validatorService.max(data["email"], 40)){
    error["email"] = this.errorService.max(40);
  }else if (!this.validatorService.email(data['email'])) {
    error['email'] = this.errorService.email;
  }

  if(!editar){
    if(!this.validatorService.required(data["password"])){
      error["password"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["confirmar_password"])){
      error["confirmar_password"] = this.errorService.required;
    }
  }

  if(!this.validatorService.required(data["rfc"])){
    error["rfc"] = this.errorService.required;
  }else if(!this.validatorService.min(data["rfc"], 12)){
    error["rfc"] = this.errorService.min(12);
    alert("La longitud de caracteres deL RFC es menor, deben ser 12");
  }else if(!this.validatorService.max(data["rfc"], 13)){
    error["rfc"] = this.errorService.max(13);
    alert("La longitud de caracteres deL RFC es mayor, deben ser 13");
  }

  if(!this.validatorService.required(data["edad"])){
    error["edad"] = this.errorService.required;
  }else if(!this.validatorService.numeric(data["edad"])){
    alert("El formato es solo números");
  }

  if(!this.validatorService.required(data["telefono"])){
    error["telefono"] = this.errorService.required;
  }

  if(!this.validatorService.required(data["ocupacion"])){
    error["ocupacion"] = this.errorService.required;
  }

  //Return arreglo
  return error;
}

  //Aquí van los servicios HTTP
  //Servicio para registrar un nuevo usuario
  public registrarAdmin (data: any): Observable <any>{
    return this.http.post<any>(`${environment.url_api}/admin/`,data, httpOptions);
  }

  public obtenerListaAdmins (): Observable <any>{
    var token = this.facadeServiceService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-admins/`, {headers:headers});
  }

    //Obtener un solo usuario dependiendo su ID
    public getAdminByID(idUser: Number){
      return this.http.get<any>(`${environment.url_api}/admin/?id=${idUser}`,httpOptions);
    }

    //Servicio para actualizar un usuario
    public editarAdmin (data: any): Observable <any>{
      var token = this.facadeServiceService.getSessionToken();
      var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
      return this.http.put<any>(`${environment.url_api}/admins-edit/`, data, {headers:headers});
    }

    //Eliminar Admin
  public eliminarAdmin(idUser: number): Observable <any>{
    var token = this.facadeServiceService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.delete<any>(`${environment.url_api}/admins-edit/?id=${idUser}`,{headers:headers});
  }

    //Obtener el total de cada uno de los usuarios
    public getTotalUsuarios(){
      var token = this.facadeServiceService.getSessionToken();
      var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
      return this.http.get<any>(`${environment.url_api}/admins-edit/`, {headers:headers});
    }
}