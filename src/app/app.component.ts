import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/enums/auth-status.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myClinic';

  private authService = inject(AuthService);
  private router = inject(Router);

  // Propiedad computada
  public finishedAuthCheck = computed<boolean>(()=> {
    if(this.authService.authStatus() === AuthStatus.checking){
      return false;
    }
    return true;
  });

   // Disparamos un efecto, cada vez que una senial en el efecto cambie
  // en este caso this.authService.authStatus()
  public authStatusChangedEffect = effect(() => {

    const url = localStorage.getItem("url") || "/dashboard";

    switch(this.authService.authStatus()){
      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:
        this.router.navigateByUrl(url);
        return;
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return
    }
  });

}
