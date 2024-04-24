import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminstradoresService } from 'src/app/services/adminstradores.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import { MaestroService } from 'src/app/services/maestro.service';

@Component({
  selector: 'app-eliminar-user-modal',
  templateUrl: './eliminar-user-modal.component.html',
  styleUrls: ['./eliminar-user-modal.component.scss']
})
export class EliminarUserModalComponent implements OnInit{

  public rol: string = "";


  constructor(
    private adminstradoresService: AdminstradoresService,
    private maestroService: MaestroService,
    private alumnoService: AlumnoService,
    private dialogRef: MatDialogRef<EliminarUserModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
    this.rol = this.data.rol;
    console.log("Rol modal: ", this.rol);
  }

  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }

  public eliminarUser(){
    if(this.rol == "administrador"){
      this.adminstradoresService.eliminarAdmin(this.data.id).subscribe(
        (response)=>{
          console.log(response);
          this.dialogRef.close({isDelete:true});
        }, (error)=>{
          this.dialogRef.close({isDelete:false});
        }
      );

    }else if(this.rol == "maestro"){
      this.maestroService.eliminarMaestro(this.data.id).subscribe(
        (response)=>{
          console.log(response);
          this.dialogRef.close({isDelete:true});
        }, (error)=>{
          this.dialogRef.close({isDelete:false});
        }
      );

    }else if(this.rol == "alumno"){
      this.alumnoService.eliminarAlumno(this.data.id).subscribe(
        (response)=>{
          console.log(response);
          this.dialogRef.close({isDelete:true});
        }, (error)=>{
          this.dialogRef.close({isDelete:false});
        }
      );
    }

  }


}
