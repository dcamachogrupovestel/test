import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports:  [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder,
    private cookieService: CookieService,
    private router: Router
  ){
    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  
  /**
   * @name onSubmit
   * @description comprobar si es correcto
   */
  onSubmit(): void {
    const { user, password } = this.loginForm.value;
    if (user === 'test' && password === 'test') {
      this.cookieService.set('user', user);
      this.cookieService.set('password', password);
      // Enrutar a la lista de tornillos
      this.router.navigate(['/screws-list']);
    }else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
  }

  ngOnInit(): void {
    // Obtener las cookies al inicializar el componente
    const user = this.cookieService.get('user');
    const password = this.cookieService.get('password');
    if (user && password) {
      this.loginForm.setValue({ user, password });
      this.onSubmit;
    }
  }
}
