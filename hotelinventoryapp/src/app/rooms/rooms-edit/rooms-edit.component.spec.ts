import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsEditComponent } from './rooms-edit.component';

describe('RoomsEditComponent', () => {
  let component: RoomsEditComponent;
  let fixture: ComponentFixture<RoomsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
