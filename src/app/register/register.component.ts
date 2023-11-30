import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRestService } from '../api-rest.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nombre: string = ""
  aPaterno: string = ""
  aMaterno: string = ""
  email: string = ""
  pass = ""
  ShowError = false
  ShowLoadig = false

  constructor(private router: Router, private api: ApiRestService) { }
  register(){
    this.ShowLoadig=true
    this.api.register(this.nombre, this.aPaterno, this.aMaterno, this.email, this.pass).subscribe({
      next: respuesta => {
        this.router.navigate(['/home'])
      },
      error: problemilla => {
        this.ShowLoadig=false
        this.ShowError=true
      },
  
    } )
   
  }

}
