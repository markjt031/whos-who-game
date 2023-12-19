import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioPlayerButtonsComponent } from './audio-player-buttons.component';

describe('AudioPlayerButtonsComponent', () => {
  let component: AudioPlayerButtonsComponent;
  let fixture: ComponentFixture<AudioPlayerButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioPlayerButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioPlayerButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
