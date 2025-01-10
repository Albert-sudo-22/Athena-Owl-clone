import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path:"sign-in", component: SignInComponent},
    {path:"home", component: HomeComponent},
    {path: '', pathMatch: 'full', redirectTo: 'sign-in'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  
  export class AppRoutingModule { }