import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradiantColorAndHoverEffectComponent } from './gradiant-color-and-hover-effect.component';

describe('GradiantColorAndHoverEffectComponent', () => {
  let component: GradiantColorAndHoverEffectComponent;
  let fixture: ComponentFixture<GradiantColorAndHoverEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradiantColorAndHoverEffectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradiantColorAndHoverEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
