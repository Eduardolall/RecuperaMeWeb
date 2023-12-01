import { Component } from '@angular/core';
import { ApiRestService } from '../api-rest.service';


@Component({
  selector: 'app-encuentra-ob',
  templateUrl: './encuentra-ob.component.html',
  styleUrls: ['./encuentra-ob.component.css']
})
export class EncuentraObComponent {
  publicaciones = [
    {categoria: "", fecha:"", foto:"", idcoleccion:"", nombre:"", stability:'', ubicacion:"", id:"", correo:""},
    
  ]
  modP = {nombre: "", id: ""}

  constructor(private api: ApiRestService){}

  ngOnInit():void{
    this.consulta()
  }

  consulta(){
    this.api.getAllPublicaciones().subscribe({
      next: datos => {
        console.log(datos)
        let i =1;
        const arreglo = datos.documents.filter((p:any) => p.hasOwnProperty("fields"))
        console.log(arreglo)
        
        this.publicaciones = arreglo.map((p: {name:string, fields:any}) => ({
          categoria: p.fields.hasOwnProperty('categoria')? p.fields.categoria.stringValue: "",
          fecha:p.fields.hasOwnProperty('fecha')? p.fields.fecha.stringValue: "",
          foto: p.fields.hasOwnProperty('foto')? p.fields.foto.stringValue: "",
          idcoleccion:  p.fields.hasOwnProperty('idcoleccion')? p.fields.idcoleccion.stringValue: "",
          nombre:  p.fields.hasOwnProperty('nombre')? p.fields.nombre.stringValue: "",
          stability:  p.fields.hasOwnProperty('stability')? p.fields.stability.intValue: "",
          ubicacion:  p.fields.hasOwnProperty('ubicacion')? p.fields.ubicacion.stringValue: "",
          correo:  p.fields.hasOwnProperty('correo')? p.fields.correo.stringValue: "",
          id: p.name.split("/").pop()
        }))

        console.log(this.publicaciones)

      },
      error: e => {}
    })
  }

  borrarPublicacion(id: string){
    this.api.deletePublicaciones(id).subscribe({
      next: resp => {this.consulta()},
      error: e => {console.log(e)}
    })

  }

  modificarPublicacion(){
    this.api.updatePublicacion(this.modP.nombre, this.modP.id).subscribe({
      next: resp => {this.consulta()},
      error: e => {console.log(e)}
    })

  }
  editarPublicacion(p:any){
    this.modP= JSON.parse(JSON.stringify(p))

  }
  
}
