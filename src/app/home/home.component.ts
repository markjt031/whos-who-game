import { Component, OnInit } from "@angular/core";
import fetchFromSpotify, { request } from "../../services/api";
import Song from "src/models/song";
import { AudioService } from "src/services/audioService";
import { LeaderboardService } from "src/services/leaderboardService";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(
    private audioService: AudioService,
    private leaderboardService: LeaderboardService
  ) {}

  leaderboardShown: boolean = false;

  ngOnInit(): void {
    this.leaderboardService.setDummyData()
  }

  toggleLeaderboard() {
    this.leaderboardShown = !this.leaderboardShown;
  }
}
