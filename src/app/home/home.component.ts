import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { User } from '../user/user.model';


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
  userObject!: User
  constructor(private router: Router) {}

  test(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.userObject = JSON.parse(userString);

      console.log(this.userObject.firstName + " " +this.userObject.lastName); 
      console.log(this.userObject.role)
      
    } else {
      console.log('No user found in localStorage');
    }
  }
  
  
  logOut(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/sign-in']);
  }
}
