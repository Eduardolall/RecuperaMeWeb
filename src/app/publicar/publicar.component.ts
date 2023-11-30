import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRestService } from '../api-rest.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.component.html',
  styleUrls: ['./publicar.component.css']
})
export class PublicarComponent {
  
  latitud: number= 0 ;
  longitud: number = 0;
  lat: string= "" ;
  lon: string= "";
   newP = {categoria: "",  nombre: "", foto: "", fecha:"", idcoleccion:"", ubicacion: ""}
  ShowError = false
  ShowLoadig = false
  fileName: string = '';
  selectedFile: File | null = null;

  constructor(private api: ApiRestService, private router: Router){}
  

  obtenerUbicacion() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitud = position.coords.latitude;
          this.longitud = position.coords.longitude;
        },
        (error) => {
          console.error("Error al obtener la ubicación:", error.message);
        }
      );
    } else {
      alert("Tu navegador no soporta la API de geolocalización.");
    }
  }


  onFileSelected(event: any): void{
    this.selectedFile = event.target.files ? event.target.files[0] : null;
  }

  uploadFile():void{
    if(!this.selectedFile){
      console.error('No se ha seleccionado ningun archivo.');
      return;
    }
    const fileName: string = this.fileName || 'nombre-archivo';///
    this.api.uploadImage(fileName, this.selectedFile).subscribe(response =>{
      console.log('Respuesta del servidor: ', response);
    })
  }

  createPublicaciones(){
  const miUUID = uuidv4();
  this.lat = this.latitud + ''
  this.lon = this.longitud + ''
  this.newP.ubicacion = this.lat + " " + this.lon
  const idcoleccion = miUUID
  this.uploadFile()
  this.newP.foto = "gs://recuperame-669ba.appspot.com/" +this.fileName
  if(this.newP.categoria == "" || this.newP.nombre == ""){
    alert("Bebes escribir la pregunta y seleccionar la categoria")
    return
  }
  this.api.createPublicaciones(this.newP.categoria, 
    this.newP.fecha, this.newP.foto, idcoleccion , this.newP.nombre, this.newP.ubicacion ).subscribe({
      next: respuesta => {
        this.router.navigate(['/encuentra'])
      },
    error: e =>{console.log(e)}
    
  })
  }

  borrarPublicacion(idcoleccion: string){
    this.api.deletePregunta(idcoleccion).subscribe({
      error: e => {console.log(e)}
    })

  }
  

  


  }



