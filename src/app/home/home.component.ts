import { Component, OnInit } from "@angular/core";
import fetchFromSpotify, { request } from "../../services/api";
import Song from "src/models/song";
import { AudioService } from "src/services/audioService";


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private audioService: AudioService) {}

  settingsShown: boolean = true
  leaderboardShown: boolean = false

  ngOnInit(): void {}

  toggleSettings() {
    this.settingsShown = !this.settingsShown
    if (this.leaderboardShown && this.settingsShown) { 
      this.toggleLeaderboard()
    }
  }

  toggleLeaderboard() {
    this.leaderboardShown = !this.leaderboardShown
    if (this.leaderboardShown && this.settingsShown) {
      this.toggleSettings()
    }
  }
}
