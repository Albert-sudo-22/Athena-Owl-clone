import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { GeneralMenuComponent } from './general-menu/general-menu.component';

export const routes: Routes = [
    {path:"sign-in", component: SignInComponent},
    {path:"home", component: HomeComponent},
    {path:"general", component: GeneralMenuComponent},
    {path: '', pathMatch: 'full', redirectTo: 'sign-in'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  
  export class AppRoutingModule { }