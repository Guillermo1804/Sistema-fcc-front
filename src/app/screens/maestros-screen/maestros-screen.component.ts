import { Component, OnInit } from '@angular/core';
import { MaestroService } from '../../services/maestro.service';
import { FacadeServiceService } from 'src/app/services/facade-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maestros-screen',
  templateUrl: './maestros-screen.component.html',
  styleUrls: ['./maestros-screen.component.scss']
})
export class MaestrosScreenComponent implements OnInit{
  public name_user:string = "";
  public lista_maestros:any[]= [];

  constructor(
    private facadeServiceService: FacadeServiceService,
    private maestrosservice: MaestroService,
    private router: Router
  ){}
  ngOnInit(): void {
    this.name_user = this.facadeServiceService.getUserCompleteName();
    //Lista de maestros
    this.obtenerMaestros();
  }

    //Obtener lista de usuarios
    public obtenerMaestros(){
      this.maestrosservice.obtenerListaMaestros().subscribe(
        (response)=>{
          this.lista_maestros = response;
          console.log("Lista users: ", this.lista_maestros);
        }, (error)=>{
          alert("No se pudo obtener la lista de admins");
        }
      );
    }

    //Funcion para editar
    public goEditar(idUser: number){
      this.router.navigate(["registro-usuarios/maestro/"+idUser]);
    }

    public delete(idUser: number){

    }

}
