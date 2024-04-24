import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacadeServiceService } from './facade-service.service';
import { ErrorsService } from './tools/errors.service';
import { ValidatorService } from './tools/validator.service';
import { environment } from 'src/environments/environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeServiceService: FacadeServiceService,
  ) { }

  public esquemaMaestro(){
    return {
      'rol':'',
      'nrc': '',
      'name': '',
      'seccion': '',
      'materias_dia': [],
      'horario_inicio': '',
      'horario_final': '',
      'salon': '',
      'programa': '',
    }
  }

      //Validación para el formulario
      public validarMateria (data: any, editar: boolean){
        console.log("Validando materia... ", data);
        let error: any = [];

        if(!this.validatorService.required(data["nrc"])){
          error["nrc"] = this.errorService.required;
        }

        if(!this.validatorService.required(data["name"])){
          error["name"] = this.errorService.required;
        }

        if(!this.validatorService.required(data["seccion"])){
          error["seccion"] = this.errorService.required;
        }

        if(!this.validatorService.required(data["materias_dia"])){
          error["materias_dia"] = "Al menos debes de elegir un dia de la semana";
        }

        if(!this.validatorService.required(data["horario_inicio"])){
          error["horario_inicio"] = this.errorService.required;
        }

        if(!this.validatorService.required(data["horario_final"])){
          error["horario_final"] = this.errorService.required;
        }

        if(!this.validatorService.required(data["salon"])){
          error["salon"] = this.errorService.required;
        }

        if(!this.validatorService.required(data["programa"])){
          error["programa"] = this.errorService.required;
        }
        //Return arreglo
        return error;
      }

//Aquí van los servicios HTTP
  //Servicio para registrar una nueva materia
  public registrarMateria (data: any): Observable <any>{
    return this.http.post<any>(`${environment.url_api}/materia/`,data, httpOptions);
  }

  public obtenerListaMaterias (): Observable <any>{
    var token = this.facadeServiceService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-materias/`, {headers:headers});
  }

    //Obtener un solo maestro dependiendo su ID
    public getMateriaByID(idUser: Number){
      return this.http.get<any>(`${environment.url_api}/materias/?id=${idUser}`,httpOptions);
    }


    //Servicio para actualizar un usuario
    public editarMateria (data: any): Observable <any>{
      var token = this.facadeServiceService.getSessionToken();
      var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
      return this.http.put<any>(`${environment.url_api}/materias-edit/`, data, {headers:headers});
    }

        //Eliminar Maestro
    public eliminarMateria(idUser: number): Observable <any>{
      var token = this.facadeServiceService.getSessionToken();
      var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
      return this.http.delete<any>(`${environment.url_api}/materias-edit/?id=${idUser}`,{headers:headers});
    }

}
