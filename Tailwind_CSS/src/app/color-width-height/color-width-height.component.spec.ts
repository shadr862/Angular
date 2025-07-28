import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorWidthHeightComponent } from './color-width-height.component';

describe('ColorWidthHeightComponent', () => {
  let component: ColorWidthHeightComponent;
  let fixture: ComponentFixture<ColorWidthHeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorWidthHeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorWidthHeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
