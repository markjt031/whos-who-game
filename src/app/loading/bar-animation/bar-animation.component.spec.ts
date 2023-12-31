import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarAnimationComponent } from './bar-animation.component';

describe('BarAnimationComponent', () => {
  let component: BarAnimationComponent;
  let fixture: ComponentFixture<BarAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarAnimationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
