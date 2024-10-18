import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrewsModalComponent } from './screws-modal.component';

describe('ScrewsModalComponent', () => {
  let component: ScrewsModalComponent;
  let fixture: ComponentFixture<ScrewsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrewsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScrewsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
