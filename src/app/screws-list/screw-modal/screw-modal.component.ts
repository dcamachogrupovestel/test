// src/app/screw-form/screw-form.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScrewsService } from '../../services/screws.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-screw-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './screw-modal.component.html',
  styleUrls: ['./screw-modal.component.css']
})
export class ScrewModalComponent {
  screwForm: FormGroup;
  errorMessage: string = '';
  

  constructor(private fb: FormBuilder, private screwsService: ScrewsService,
    private activeModal: NgbActiveModal
  ) {
    this.screwForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      format: ['', Validators.required],
      providerName: ['', Validators.required]
    });
  }

  /**
   * @name onSubmit
   * @description Agrega un tornillo
   */
  onSubmit(): void {
    if (this.screwForm.valid) {
      this.screwsService.addScrew(this.screwForm.value).subscribe(
        () => {
          // Handle success
          this.activeModal.close(this.screwForm.value);
        },
        (error) => {
          // Handle error
          this.errorMessage = 'Error al guardar el tornillo. Inténtalo de nuevo.';
        })
    }else{
      this.errorMessage = 'Faltan parametros por rellenar'
    }

  }

  public closeModal(): void{
    this.activeModal.close();
  }
}