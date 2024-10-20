import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'test';
  userLogin: boolean = false;
  user: string = '';

  constructor(private authService:AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.authService.userLogin$.subscribe(isLoggedIn => {
      this.userLogin = isLoggedIn;
      if (isLoggedIn) {
        this.user = this.authService.getUser();
      } else {
        this.user = '';
      }
    });
  }

  /**
   * @name clearCookie
   * @description Eliminar las cookies y cerrar sesión
   */
  public clearCookie(): void {
    this.authService.logout();
    this.router.navigate(['/']); 
  }

}
