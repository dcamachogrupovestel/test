import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrewModalComponent } from './screw-modal.component';

describe('ScrewModalComponent', () => {
  let component: ScrewModalComponent;
  let fixture: ComponentFixture<ScrewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrewModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScrewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
