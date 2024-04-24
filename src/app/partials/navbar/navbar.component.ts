import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeServiceService } from 'src/app/services/facade-service.service';
declare var $:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  @Input() tipo:string = "";
  @Input() rol:string ="";

  public token : string = "";
  public editar:boolean = false;

  constructor(
    private router: Router,
    private facadeServiceService: FacadeServiceService,
    public activatedRoute: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.rol = this.facadeServiceService.getUserGroup();
    console.log("Rol user: ", this.rol);
    //Validar que haya inicio de sesión
    //Obtengo el token del login
    this.token = this.facadeServiceService.getSessionToken();
    //El primer if valida si existe un parámetro en la URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
  }
}

  public logout(){
    this.facadeServiceService.logout().subscribe(
      (response)=>{
        console.log("Entró");
        this.facadeServiceService.destroyUser();
        //Navega al login
        this.router.navigate(["/"]);
      }, (error)=>{
        console.error(error);
      }
    );
  }

  public goRegistro(){
    this.router.navigate(["registro-usuarios"]);
  }

  public goRegistroMateria(){
    this.router.navigate(["registro-materia"])
  }


  public clickNavLink(link: string){
    this.router.navigate([link]);
    setTimeout(() => {
      this.activarLink(link);
    }, 100);
  }
  public activarLink(link: string){
    if(link == "alumnos"){
      $("#principal").removeClass("active");
      $("#maestro").removeClass("active");
      $("#alumno").addClass("active");
    }else if(link == "maestros"){
      $("#principal").removeClass("active");
      $("#alumno").removeClass("active");
      $("#maestro").addClass("active");
    }else if(link == "home"){
      $("#alumno").removeClass("active");
      $("#maestro").removeClass("active");
      $("#principal").addClass("active");
    }else if(link == "graficas"){
      $("#alumno").removeClass("active");
      $("#maestro").removeClass("active");
      $("#principal").removeClass("active");
      $("#graficas").addClass("active");
    }
  }

}


