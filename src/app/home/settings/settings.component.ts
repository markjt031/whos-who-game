import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SettingsService } from "src/services/settings.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit {
  @Output() toggleSettingsEvent = new EventEmitter<void>();

  genres: string[] = ["Rock", "Rap", "Pop", "Country", "Alternative"];
  currentGenre: string = "";
  showingErrors: boolean = false;

  settingsForm: FormGroup = new FormGroup({
    selectedGenre: new FormControl<string>("", [Validators.required]),
  });

  constructor(private settingsData: SettingsService) {}

  ngOnInit(): void {
    this.settingsData.genre.subscribe((genre) => (this.currentGenre = genre));
    this.settingsForm.setValue({ selectedGenre: this.currentGenre });
  }

  onSubmit() {
    if (this.settingsForm.valid) {
      this.showingErrors = false;
      this.settingsData.updateGenre(
        this.settingsForm.controls["selectedGenre"].value
      );
      this.passToggleSettings();
    }
  }

  passToggleSettings() {
    this.toggleSettingsEvent.emit();
  }

  showErrors() {
    this.showingErrors = true;
  }
}
