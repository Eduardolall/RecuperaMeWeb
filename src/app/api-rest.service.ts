import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  urlLogin = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAerCqKl34FICWvIEuIAmgHSzbxM4DbRHU";
  urlRegister = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAerCqKl34FICWvIEuIAmgHSzbxM4DbRHU";
  url = "https://firestore.googleapis.com/v1/projects/recuperame-669ba/databases/(default)/documents/";
  urlImages = "https://firebasestorage.googleapis.com/v0/b/recuperame-669ba.appspot.com/o/";

  constructor(private http: HttpClient) { }

  login(email: string, pass: string){
    return this.http.post(this.urlLogin, {email:email,password:pass,returnSecureToken:true})
  }

  register(nombre: string, aPaterno: string, aMaterno: string , email: string, pass: string){
    return this.http.post(this.urlRegister, {nombre:nombre, aPaterno: aPaterno, aMaterno: aMaterno, email:email,password:pass,returnSecureToken:true})
  }

  getAllPreguntas(){
    return this.http.get<any>(this.url + "preguntas?pageSize=100")
  }

  getAllPublicaciones(){
    return this.http.get<any>(this.url + "publicaciones")
  }

  uploadImage(filename: string, file: File){
    const form = new FormData();
    form.append("file", file)
    return this.http.post(this.urlImages + filename, form)
  }

  downloadImage(filename: string){
    return this.http.get(this.urlImages + filename + "?alt=media")
  }

  createPregunta(categoria:string, correo:string, pregunta:string, fecha:string){
    const newDoc =  {"fields": {
      "correo": {
        "stringValue": correo
      },
      "pregunta": {
        "stringValue": pregunta
      },
      "fecha": {
        "timestampValue": fecha
      },
      "categoria": {
        "stringValue": categoria
      }
    }
  }
    return this.http.post(this.url + "preguntas", newDoc)
  }

  createPublicaciones(categoria:string, fecha:string, foto:string, 
    idcoleccion:string, nombre:string, ubicacion:string, correo:string){
    const newDoc =  {
      "fields": {
      "categoria": {
        "stringValue": categoria
      },
      "fecha": {
        "stringValue": fecha
      },
      "foto": {
        "stringValue": foto
      },
      "idcoleccion": {
        "stringValue": idcoleccion
      },
      "nombre": {
        "stringValue": nombre
      },
      "ubicacion": {
        "stringValue": ubicacion
      },
      "correo": {
        "stringValue": correo
      }
    }
  }
    return this.http.post(this.url + "publicaciones", newDoc)
  }

  updatePregunta( pregunta:string,  id:string ){
    const newDoc =  {"fields": {
      "pregunta": {
        "stringValue": pregunta
      }
    }
  }
  return this.http.patch(this.url + "preguntas/" +id+"?updateMask.fieldPaths=pregunta",newDoc)
  }

  updatePublicacion( nombre:string,  id:string ){
    const newDoc =  {"fields": {
      "nombre": {
        "stringValue": nombre
      }
    }
  }
  return this.http.patch(this.url + "publicaciones/" +id+"?updateMask.fieldPaths=nombre",newDoc)
  }


  deletePregunta(id:string){
    return this.http.delete(this.url + "preguntas/"+id)

  }

  deletePublicaciones(id:string){
    return this.http.delete(this.url + "publicaciones/"+id)

  }
  
}