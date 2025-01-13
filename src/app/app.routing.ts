import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { GeneralMenuComponent } from './general-menu/general-menu.component';
import { DefaultComponent } from './default/default.component';
import { UserListComponent } from './user-list/user-list.component';
import { Item1Component } from './Items/item1/item1.component';

export const routes: Routes = [
  { path: "sign-in", component: SignInComponent, data: { breadcrumb: "Sign In" } },
  {
    path: "page",
    component: HomeComponent,
    children: [
      { path: "", component: DefaultComponent, data: { breadcrumb: "Default" } },
      {
        path: "general",
        component: GeneralMenuComponent,
        data: { breadcrumb: "General" },
        children: [
          { path: "", redirectTo: "Item1", pathMatch: "full" },
          { path: "Item1", component: Item1Component },
          {
            path: "user-list",
            component: UserListComponent,
            data: { breadcrumb: "User List" },
          },
        ],
      },
    ],
  },
  { path: "", pathMatch: "full", redirectTo: "sign-in" },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  
  export class AppRoutingModule { }