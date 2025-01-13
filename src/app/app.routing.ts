import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { GeneralMenuComponent } from './general-menu/general-menu.component';
import { DefaultComponent } from './default/default.component';
import { UserListComponent } from './user-list/user-list.component';

export const routes: Routes = [
    {path:"sign-in", component: SignInComponent},
    {
        path: "page",
        component: HomeComponent, 
        children: [
            { path: "", component: DefaultComponent },
          { path: "general", component: GeneralMenuComponent, 
            children:[
              {path:"user-list",component:UserListComponent},
            ]
          },
        ],
    },
    {path: '', pathMatch: 'full', redirectTo: 'sign-in'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  
  export class AppRoutingModule { }