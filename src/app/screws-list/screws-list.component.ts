import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrewsService } from '../services/screws.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ScrewModalComponent } from './screw-modal/screw-modal.component';

@Component({
  selector: 'app-screws-list',
  standalone: true,
  imports: [CommonModule,
    NgxPaginationModule,
    ScrewModalComponent
  ],
  templateUrl: './screws-list.component.html',
  styleUrl: './screws-list.component.css'
})
export class ScrewsListComponent implements OnInit{
  public screwsList: any[] = [];
  public errorMessage: string = '';
  public page: number = 1; 
  public modalRef?: NgbModalRef;

  constructor(private service: ScrewsService,
    private modal: NgbModal
  ){}

  /**
   * @name getScrews
   * @description Obtener listado de tornillos
   */
  private getScrews():void{
    this.service.getScrews(1, 10).subscribe(
      (data) => {
        this.screwsList = data;
      },
      (error) => {
        this.errorMessage = error;
        console.error('Error fetching screws list:', error);
      }
    );
  }

  /**
   * @name deleteScrew
   * @description Eliminar tornillo
   * @param id Indice del tornillo
   */
  deleteScrew(id: number): void {
    this.service.deleteScrew(id).subscribe(
      () => {
        this.screwsList = this.screwsList.filter(screw => screw.id !== id);
      },
      (error) => {
        this.errorMessage = error;
        console.error('Error deleting screw:', error);
      }
    );
  }

  /**
  * @name onPageChange 
  * @description Manejar el cambio de página
  * @param page Número de la página actual
  */
  onPageChange(page: number): void {
    this.page = page;
  }

  /**
   * @name openModal
   * @description Abrir modal
   * @param template Referencia a la plantilla del modal
   */
  openModal(): void {
    this.modalRef = this.modal.open(ScrewModalComponent);
    this.modalRef.closed.subscribe(() =>{
      this.getScrews();
    })
  }

  ngOnInit(): void {
    this.getScrews();
  }
}
