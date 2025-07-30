import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationAndTransitionComponent } from './animation-and-transition.component';

describe('AnimationAndTransitionComponent', () => {
  let component: AnimationAndTransitionComponent;
  let fixture: ComponentFixture<AnimationAndTransitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimationAndTransitionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimationAndTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
