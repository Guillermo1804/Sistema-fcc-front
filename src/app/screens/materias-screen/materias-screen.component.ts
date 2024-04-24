import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeServiceService } from 'src/app/services/facade-service.service';
import { MateriaService } from 'src/app/services/materia.service';

@Component({
  selector: 'app-materias-screen',
  templateUrl: './materias-screen.component.html',
  styleUrls: ['./materias-screen.component.scss']
})
export class MateriasScreenComponent implements OnInit{
  public name_user:string = "";
  public lista_materias:any[]= [];

  constructor(
    private facadeServiceService: FacadeServiceService,
    private materiaService: MateriaService,
    private router: Router
  ){}
  ngOnInit(): void {
    this.name_user = this.facadeServiceService.getUserCompleteName();
    //Lista de maestros
    this.obtenerMaterias();
  }

    //Obtener lista de usuarios
    public obtenerMaterias(){
      this.materiaService.obtenerListaMaterias().subscribe(
        (response)=>{
          this.lista_materias = response;
          console.log("Lista materias: ", this.lista_materias);
        }, (error)=>{
          alert("No se pudo obtener la lista de materias");
        }
      );
    }

    //Funcion para editar
    public goEditar(idUser: number){
      this.router.navigate(["registro-usuarios/materia/"+idUser]);
    }

    public delete(idUser: number){

    }

}
