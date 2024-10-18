// src/app/screw-form/screw-form.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScrewsService } from '../../services/screws.service';

@Component({
  selector: 'app-screw-modal',
  templateUrl: './screw-modal.component.html',
  styleUrls: ['./screw-modal.component.css']
})
export class ScrewModalComponent {
  screwForm: FormGroup;

  constructor(private fb: FormBuilder, private screwsService: ScrewsService) {
    this.screwForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      format: ['', Validators.required],
      provider: ['', Validators.required]
    });
  }

  /**
   * @name onSubmit
   * @description Agrega un tornillo
   */
  onSubmit(): void {
    if (this.screwForm.valid) {
      this.screwsService.addScrew(this.screwForm.value).subscribe(() => {
        // Handle success
      });
    }
  }
}