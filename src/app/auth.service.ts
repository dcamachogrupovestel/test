import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  private userLoginSubject = new BehaviorSubject<boolean>(false);
  userLogin$ = this.userLoginSubject.asObservable();

  constructor(private router: Router, private cookieService: CookieService) {
    this.checkUserLogin();
  }

   /**
   * @name checkUserLogin
   * @description Comprobar si el usuario está logueado
   */
   private checkUserLogin(): void {
    const user = this.cookieService.get('user');
    const password = this.cookieService.get('password');
    if (user === 'test' && password === 'test') {
      this.userLoginSubject.next(true);
    } else {
      this.userLoginSubject.next(false);
    }
  }

   /**
   * @name login
   * @description Iniciar sesión y guardar cookies
   */
   public login(user: string, password: string): void {
    if (user === 'test' && password === 'test') {
      this.cookieService.set('user', user);
      this.cookieService.set('password', password);
      this.userLoginSubject.next(true);
    } else {
      this.userLoginSubject.next(false);
    }
  }

  /**
   * @name logout
   * @description Cerrar sesión y eliminar cookies
   */
  public logout(): void {
    this.cookieService.delete('user');
    this.cookieService.delete('password');
    this.userLoginSubject.next(false);
  }

  /**
   * @name canActivate
   * @description Método para verificar si el usuario está autenticado antes de activar una ruta protegida.
   * @returns boolean - Devuelve true si el usuario está autenticado, de lo contrario redirige a la página de login y devuelve false.
   */
  canActivate(): boolean {
    const user = this.cookieService.get('user');
    const password = this.cookieService.get('password');
    if (user === 'test' && password === 'test') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  /**
   * @name getUser
   * @description Obtener el nombre del usuario de la cookie
   * @returns string
   */
  public getUser(): string {
    return this.cookieService.get('user');
  }
}