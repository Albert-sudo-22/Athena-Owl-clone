import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatIconModule
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router) {}

  test(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      const userObject = JSON.parse(userString);

      console.log(userObject.firstName); 
      console.log(userObject.age);
  
      // Access nested properties
      console.log(userObject.address.city);
      console.log(userObject.hair.color);
      console.log(userObject.company.address.city);
    } else {
      console.log('No user found in localStorage');
    }
  }
  
  
  logOut(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/sign-in']);
  }
}
