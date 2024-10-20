import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports:  [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }
  
  /**
   * @name onSubmit
   * @description comprobar si es correcto
   */
  onSubmit(): void {
    const { user, password } = this.loginForm.value;
    this.authService.login(user, password);
    this.authService.userLogin$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/screws']);
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    });
  }
}
