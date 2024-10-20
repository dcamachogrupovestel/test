import { Component, OnInit } from '@angular/core';
import { ScrewsService } from '../services/screws.service';
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
  private service: ScrewsService
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
 ngOnInit(): void {
  this.getScrewsTotal();
 }
}
