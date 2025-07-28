import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorderRadiusComponent } from './border-radius.component';

describe('BorderRadiusComponent', () => {
  let component: BorderRadiusComponent;
  let fixture: ComponentFixture<BorderRadiusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorderRadiusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorderRadiusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
