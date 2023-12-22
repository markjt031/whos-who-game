import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
  latestScore: ScoreEntry | undefined = undefined;

  constructor(
    private leaderboardService: LeaderboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.leaderboardService.setDummyData();
    this.leaderboardService.leaderBoard.subscribe(
      (leaderBoard) => (this.currentLeaderboard = leaderBoard)
    );
    this.leaderboardService.latestScore.subscribe(
      (latestScore) => (this.latestScore = latestScore)
    );
    
  }

  passToggleLeaderboard() {
    this.toggleLeaderboardEvent.emit();
  }

  isLatestScore(scoreEntry: ScoreEntry) {
    return scoreEntry === this.latestScore;
  }

  isLeaderboardPage() {
    return this.router.url === "/leaderboard"
  }
}
