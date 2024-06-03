import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styles: `
  .gradient-custom {
/* fallback for old browsers */
background: #6a11cb;

/* Chrome 10-25, Safari 5.1-6 */
background: -webkit-linear-gradient(to right, rgba(0,181,254, 1), rgba(0,228,254, 1));

/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
background: linear-gradient(to right, rgba(63,81,181, 1), rgba(63,81,181, 1))
}
  `
})
export class LoginPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public myForm: FormGroup = this.fb.group({
    email: ['pc@pc.com', [Validators.required, Validators.email]],
    password: ['Qwert123+', [Validators.required, Validators.minLength(6)]]
  });

  login() {
    
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.myForm.value;

    this.authService.login(email, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: error,
          })
        }
      });
  }

}
