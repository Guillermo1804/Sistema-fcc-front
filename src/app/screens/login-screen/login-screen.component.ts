import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeServiceService } from 'src/app/services/facade-service.service';

declare var $:any;


@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit{
  public username: string = "";
  public password:string = "";
  public type: String = "password";
  public errors: any={};


  constructor(
  private router: Router,
  private facadeServiceService: FacadeServiceService
  ){}

  ngOnInit(): void {

  }

  public login(){
    //Validar
    this.errors = [];

    this.errors = this.facadeServiceService.validarLogin(this.username, this.password);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    //Si pasa la validación ir a la página de home
    this.facadeServiceService.login(this.username, this.password).subscribe(
      (response)=>{
        this.facadeServiceService.saveUserData(response);
        this.router.navigate(["home-screen"]);
      }, (error)=>{
        alert("No se pudo iniciar sesión");
      }
    );

  }

  public registrar(){
    this.router.navigate(["registro-usuarios"]);
  }

  public showPassword(){
    if(this.type == "password"){
      //Muestra la contraseña
      $("#show-password").addClass("show-password");
      $("#show-password").attr("data-password", true);
      this.type = "text";
    }else if(this.type == "text"){
      //Oculta la contraseña
      $("#show-password").removeClass("show-password");
      $("#show-password").attr("data-password", false);
      this.type = "password";
    }

  }
}
