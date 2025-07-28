import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FelxBoxComponent } from './felx-box.component';

describe('FelxBoxComponent', () => {
  let component: FelxBoxComponent;
  let fixture: ComponentFixture<FelxBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FelxBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FelxBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
