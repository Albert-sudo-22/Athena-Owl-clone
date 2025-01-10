import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user/user.service';


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

  
  logOut(): void {
    this.router.navigate(['/login']);
  }
}
