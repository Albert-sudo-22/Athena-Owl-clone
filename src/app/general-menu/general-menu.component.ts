import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-general-menu',
  imports: [MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterOutlet,
  ],
  templateUrl: './general-menu.component.html',
  styleUrl: './general-menu.component.scss'
})
export class GeneralMenuComponent {

  constructor(private router: Router){}

  goToUserList(): void{
    this.router.navigate(['page/general/user-list'])
  }
}
