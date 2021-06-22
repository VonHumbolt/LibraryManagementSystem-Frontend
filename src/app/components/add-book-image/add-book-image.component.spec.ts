import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookImageComponent } from './add-book-image.component';

describe('AddBookImageComponent', () => {
  let component: AddBookImageComponent;
  let fixture: ComponentFixture<AddBookImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
