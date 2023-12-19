import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from 'src/app/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
  
  @Output() toggleSettingsEvent = new EventEmitter<void>()

  genres: string[] = []
  showingErrors: boolean = false
  
  settingsForm: FormGroup = new FormGroup({
    selectedGenre: new FormControl<string>('', [Validators.required])
  })

  constructor(private settingsData: SettingsService) { }

  ngOnInit(): void {
    this.genres = [
      "rock",
      "rap",
      "pop",
      "country",
      "alternative"
    ]
  }

  onSubmit() {
    if(this.settingsForm.valid) {
      this.settingsData.updateGenre(
        this.settingsForm.controls['selectedGenre'].value
      )
      this.passToggleSettings()
  
      console.log(this.settingsData.genre) // log observable
      console.log(this.settingsForm.controls['selectedGenre'].errors)
    }
  }

  passToggleSettings() {
    this.toggleSettingsEvent.emit()
  }

  showErrors() {
    this.showingErrors = true
  }

}
