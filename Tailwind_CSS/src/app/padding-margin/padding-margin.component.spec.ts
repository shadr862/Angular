import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaddingMarginComponent } from './padding-margin.component';

describe('PaddingMarginComponent', () => {
  let component: PaddingMarginComponent;
  let fixture: ComponentFixture<PaddingMarginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaddingMarginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaddingMarginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
