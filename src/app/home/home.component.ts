import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScrewsService } from '../services/screws.service';
import { AuthService } from '../auth.service';
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
  private authService: AuthService
 ){
 }

 /**
  *  @name getScrewsTotal
  *  @description Obtener el numero total de tornillos
  */
 private getScrewsTotal(){
  this.service.getScrewsTotal().subscribe(
    (data: any) => {
      this.screws = data.screws.length;
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
    let user = this.authService.canActivate();
    if(user){
      this.router.navigate(['/screws']);
    }else{
      this.router.navigate(['/login'])
    }
    
  }

  /**
  * @name ngOnInit
  */
  ngOnInit(): void {
    this.getScrewsTotal();
  }
}
