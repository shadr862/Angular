import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmloyeeEditComponent } from './emloyee-edit.component';

describe('EmloyeeEditComponent', () => {
  let component: EmloyeeEditComponent;
  let fixture: ComponentFixture<EmloyeeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmloyeeEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmloyeeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
