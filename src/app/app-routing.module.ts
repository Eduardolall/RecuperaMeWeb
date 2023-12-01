import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { InicioComponent } from './inicio/inicio.component';
import { EncuentraObComponent } from './encuentra-ob/encuentra-ob.component';
import { PublicarComponent } from './publicar/publicar.component';



const routes: Routes = [
  {path:'', redirectTo: '/inicio', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'inicio',  component:InicioComponent },
  {path: 'encuentra',  component:EncuentraObComponent },
  {path: 'publicar',  component:PublicarComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppRoutingModule { }
