import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general-menu',
  imports: [],
  templateUrl: './general-menu.component.html',
  styleUrl: './general-menu.component.scss'
})
export class GeneralMenuComponent {

  constructor(private router: Router){}

  goToHome(): void{
    this.router.navigate(['/'])
  }
}
