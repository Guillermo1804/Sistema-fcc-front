import { Component, Input } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeServiceService } from 'src/app/services/facade-service.service';
import { Location } from '@angular/common';


declare var $:any;
@Component({
  selector: 'app-registro-alumno',
  templateUrl: './registro-alumno.component.html',
  styleUrls: ['./registro-alumno.component.scss']
})
export class RegistroAlumnoComponent {
  //Decoradores
  @Input() rol: string = "";
  @Input() datos_user: any = {};

  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  //Demas variables necesarias
  public editar:boolean = false;
  public alumno: any;
  public errors:any = {};
  public idUser: Number = 0;
  public token: string = "";


  constructor(
    private alumnoService : AlumnoService,
    private router: Router,
    private location : Location,
    private facadeServiceService: FacadeServiceService,
    public activatedRoute: ActivatedRoute,
  ){}

  ngOnInit(): void {
    //El primer if valida si existe un parámetro en la URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idUser);
      //Al iniciar la vista asignamos los datos del user
      this.alumno = this.datos_user;
    }else{
      this.alumno = this.alumnoService.esquemaAlumno();
      this.alumno.rol = this.rol;
      this.alumno = this.facadeServiceService.getSessionToken();
    }
    //Imprimir datos en consola
    console.log("Alumno: ", this.alumno);
  }

  //Funciona para la fecha de nacimiento
  public changeFecha(event :any){
    console.log(event);
    console.log(event.value.toISOString());

    this.alumno.fecha_nacimiento = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.alumno.fecha_nacimiento);
  }

   //Funciones para password
   showPassword()
   {
     if(this.inputType_1 == 'password'){
       this.inputType_1 = 'text';
       this.hide_1 = true;
     }
     else{
       this.inputType_1 = 'password';
       this.hide_1 = false;
     }
   }

   showPwdConfirmar()
   {
     if(this.inputType_2 == 'password'){
       this.inputType_2 = 'text';
       this.hide_2 = true;
     }
     else{
       this.inputType_2 = 'password';
       this.hide_2 = false;
     }
   }

   public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.alumnoService.validarAlumno(this.alumno, this.editar)
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    // Validamos que las contraseñas coincidan
    //Validar la contraseña
    if(this.alumno.password == this.alumno.confirmar_password){
      //Aquí si todo es correcto vamos a registrar - aquí se manda a consumir el servicio
      this.alumnoService.registrarAlumno(this.alumno).subscribe(
        (response)=>{
          alert("Alumno registrado correctamente");
          console.log("Alumno registrado: ", response);
          this.router.navigate([""]);
        }, (error)=>{
          alert("No se pudo registrar al alumno");
        }
      );
    }else{
      alert("Las contraseñas no coinciden");
      this.alumno.password="";
      this.alumno.confirmar_password="";
    }
  }

   public actualizar(){
        //Validación
        this.errors = [];

        this.errors = this.alumnoService.validarAlumno(this.alumno, this.editar);
        if(!$.isEmptyObject(this.errors)){
          return false;
        }
        console.log("Pasó la validación");

        this.alumnoService.editarAlumno(this.alumno).subscribe(
          (response)=>{
            alert("Alumno editado correctamente");
            console.log("Alumno editado: ", response);
            //Si se editó, entonces mandar al home
            this.router.navigate(["home-screen"]);
          }, (error)=>{
            alert("No se pudo editar el alumno");
          }
        );
   }

   public regresar(){
    this.location.back();

   }
}
