import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScrewsService } from '../services/screws.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
 public screws: any = 0;

 constructor(
  private service: ScrewsService,
  private router: Router,
  private cookieService: CookieService
 ){
 }

 /**
  *  @name getScrewsTotal
  *  @description Obtener el numero total de tornillos
  */
 private getScrewsTotal(){
  this.service.getScrewsTotal().subscribe(
    (data: any) => {
      this.screws = data.total;
    },
    (error) => {
      console.error('Error fetching screws total:', error);
    }
  );
 }

  /**
   *  @name goToScrewsList
   *  @description Navegar a la lista de tornillos
   */
  public goToScrewsList(): void {
    let user = this.getUser()
    if(user){
      this.router.navigate(['/screws']);
    }else{
      this.router.navigate(['/login'])
    }
    
  }

  /**
   * @name getUser
   * @description Comprobar si se ha iniciado sesión
   */
  private getUser(): boolean {
    const user = this.cookieService.get('user');
    const password = this.cookieService.get('password');
    return user === 'test' && password === 'test';
  }

  /**
  * @name ngOnInit
  */
  ngOnInit(): void {
    this.getScrewsTotal();
  }
}
