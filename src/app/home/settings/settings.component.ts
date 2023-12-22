import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SettingsService } from "src/services/settings.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit {

  genres: string[] = ["Rock", "Rap", "Pop", "Country", "Alternative"];
  currentGenre: string = "";

  modes: string[] = ["Title", "Artist"]
  currentMode: string = "";

  showingErrors: boolean = false;

  settingsForm: FormGroup = new FormGroup({
    selectedGenre: new FormControl<string>("", [Validators.required]),
    selectedMode: new FormControl<string>("", [Validators.required]),
  });

  constructor(private settingsData: SettingsService, private router: Router) {}

  ngOnInit(): void {
    this.settingsData.genre.subscribe((genre) => {
      this.currentGenre = genre
      this.settingsForm.patchValue({ selectedGenre: this.currentGenre })
    })

    this.settingsData.mode.subscribe((mode) => {
      this.currentMode = mode
      this.settingsForm.patchValue({ selectedMode: this.currentMode });
    })
  }

  onSubmit() {
    if (this.settingsForm.valid) {
      this.showingErrors = false;
      this.settingsData.updateGenre(
        this.settingsForm.controls["selectedGenre"].value
      );
      this.settingsData.updateMode(
        this.settingsForm.controls["selectedMode"].value
      );
      this.router.navigateByUrl("/game")
    } else {
      this.showingErrors = true;
    }
  }
}
