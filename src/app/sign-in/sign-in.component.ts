import { Component, signal, inject } from '@angular/core';
import { FormControl, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-sign-in',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, 
    ReactiveFormsModule, MatButtonModule, MatIconModule, CommonModule ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  hide = signal(true);
  private snackBar = inject(MatSnackBar)
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email, 
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
  passwordFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  // ngOnInit(): void {
  //   this.fetchUsers();
  // }

  // fetchUsers(): void {
  //   this.userService.fetchUsers().subscribe({
  //     next: (data) => {
  //       this.users = data.users; 
  //     },
  //     error: (err) => {
  //       console.error('Error fetching users:', err);
  //     },
  //   });
  // }

  login(): void {
    const email = this.emailFormControl.value?.trim().toLowerCase();
    const password = this.passwordFormControl.value?.trim();
  
    if (this.emailFormControl.invalid || this.passwordFormControl.invalid) {
      this.snackBar.open('Please fill in all required fields with valid information!', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      return;
    }
  
    this.userService.fetchUsers().subscribe({
      next: (data) => {
        this.users = data.users;
  
        const user = this.users.find(
          (u) => u.email.toLowerCase() === email && u.password === password
        );
  
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/page']);
        } else {
          this.snackBar.open('Wrong email or password!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.snackBar.open('An error occurred while fetching user data', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    });
  }
  
  
  
}
