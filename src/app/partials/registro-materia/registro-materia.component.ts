import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FacadeServiceService } from 'src/app/services/facade-service.service';
import { MateriaService } from 'src/app/services/materia.service';
import { Location } from '@angular/common';

declare var $:any;
@Component({
  selector: 'app-registro-materia',
  templateUrl: './registro-materia.component.html',
  styleUrls: ['./registro-materia.component.scss']
})
export class RegistroMateriaComponent implements OnInit{
  //Decoradores
  @Input() rol: string = "";
  @Input() datos_user: any = {};

    //Demás variables necesarias
  public materia:any = {};
  public editar:boolean = false;
  public errors:any = {};
  public idUser: Number = 0;
  public token: string = "";

  //Array para dias - checkbox
  public dias:any[]= [
    {value: '1', nombre: 'Lunes'},
    {value: '2', nombre: 'Martes'},
    {value: '3', nombre: 'Miercoles'},
    {value: '4', nombre: 'Jueves'},
    {value: '5', nombre: 'Viernes'},
    {value: '6', nombre: 'Sabado'},
  ];
  constructor(
    private router: Router,
    private location : Location,
    public activatedRoute: ActivatedRoute,
    private facadeServiceService: FacadeServiceService,
    private materiaService: MateriaService
  ){}

  ngOnInit(): void {

  }

  public regresar(){
    this.location.back();
  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.materiaService.validarMateria(this.materia, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
      //Aquí si todo es correcto vamos a registrar - aquí se manda a llamar al servicio
      this.materiaService.registrarMateria(this.materia).subscribe(
        (response)=>{
          alert("Materia registrada correctamente");
          console.log("Materia registrada: ", response);
          if(this.token != ""){
            this.router.navigate(["home"]);
           }else{
             this.router.navigate(["/"]);
           }
        }, (error)=>{
          alert("No se pudo registrar la materia");
        }
      )
  }

  public actualizar(){
    //Validación
    this.errors = [];

    this.errors = this.materiaService.validarMateria(this.materia, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    console.log("Pasó la validación");

    this.materiaService.editarMateria(this.materia).subscribe(
      (response)=>{
        alert("Maestro editado correctamente");
        console.log("Maestro editado: ", response);
        //Si se editó, entonces mandar al home
        this.router.navigate(["home-screen"]);
      }, (error)=>{
        alert("No se pudo editar la materia");
      }
    );
  }

  public checkboxChange(event:any){
    //console.log("Evento: ", event);
    if(event.checked){
      this.materia.nombre.push(event.source.value)
    }else{
      console.log(event.source.value);
      this.materia.materias_dia.forEach((dia, i) => {
        if(dia == event.source.value){
          this.materia.materias_dia.splice(i,1)
        }
      });
    }
    console.log("Array materias: ", this.materia);
  }

  public revisarSeleccion(nombre: string){
    if(this.materia.materias_dia){
      var busqueda = this.materia.materias_dia.find((element)=>element==nombre);
      if(busqueda != undefined){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
}
