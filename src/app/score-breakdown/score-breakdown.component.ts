import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/services/gameService';

@Component({
  selector: 'app-score-breakdown',
  templateUrl: './score-breakdown.component.html',
  styleUrls: ['./score-breakdown.component.css']
})
export class ScoreBreakdownComponent implements OnInit {
  numberCorrect: number = 0
  score: number = 0
  timeBonus: number = 0
  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit() {
    // Simulate updates after a quiz or game using setTimeout
      this.gameService.numberCorrect.subscribe(numberCorrect=>this.numberCorrect=numberCorrect)
      console.log(this.numberCorrect)
      this.gameService.score.subscribe(score => this.score=score)
      this.timeBonus= this.score-(100*this.numberCorrect)
  }
}
