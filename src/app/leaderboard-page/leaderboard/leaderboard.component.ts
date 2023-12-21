import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import ScoreEntry from "src/models/scoreEntry";
import { LeaderboardService } from "src/services/leaderboardService";

@Component({
  selector: "app-leaderboard",
  templateUrl: "./leaderboard.component.html",
  styleUrls: ["./leaderboard.component.css"],
})
export class LeaderboardComponent implements OnInit {
  @Output() toggleLeaderboardEvent = new EventEmitter<void>();

  currentLeaderboard: ScoreEntry[] = [];
  

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit(): void {
    this.leaderboardService.leaderBoard.subscribe(
      (leaderBoard) => (this.currentLeaderboard = leaderBoard)
    );
    this.leaderboardService.setDummyData();
  }

  passToggleLeaderboard() {
    this.toggleLeaderboardEvent.emit();
  }
}
