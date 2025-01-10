import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { User } from '../user/user.model';
import {MatMenuModule} from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
    MatCardModule,
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  userObject!: User
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.userObject = JSON.parse(userString);
    } else {
      console.log('No user found in localStorage');
    }
  }
  
  logOut(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/sign-in']);
  }

  goToHome():void{
    this.router.navigate(['/home']);
  }

  goToGeneral(): void{
    this.router.navigate(['/general']);
  }
}
