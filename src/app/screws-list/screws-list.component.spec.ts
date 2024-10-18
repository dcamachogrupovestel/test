import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrewsListComponent } from './screws-list.component';

describe('ScrewsListComponent', () => {
  let component: ScrewsListComponent;
  let fixture: ComponentFixture<ScrewsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrewsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScrewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
