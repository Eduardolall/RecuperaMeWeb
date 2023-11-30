import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRestService } from '../api-rest.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  constructor(
    private router: Router,
     private api: ApiRestService,
     private msg: ToastrService,
     ) { }
  login(){
        this.msg.success("Bienvenido al foro")
        this.router.navigate(['/login'])
      }

}


