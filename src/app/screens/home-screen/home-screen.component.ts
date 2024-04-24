import { Component } from '@angular/core';
import { FacadeServiceService } from '../../services/facade-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent {
  public rol:string = "";
  public token: string ="";

  constructor(
    private facadeServiceService: FacadeServiceService,
    private router: Router
  ){}

  ngOnInit(): void {
    //Validar si se ha iniciado sesion
    this.token = this.facadeServiceService.getSessionToken();
    console.log("Token :", this.token);

    if(this.token==""){
      //this.router.navigate('/');
    }


    this.rol = this.facadeServiceService.getUserGroup();
    console.log("Rol: ", this.rol);

  }
}
