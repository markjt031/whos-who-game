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
      this.gameService.numberCorrect.subscribe(numberCorrect=>this.numberCorrect=numberCorrect)
      this.gameService.timeBonus.subscribe(timeBonus=>this.timeBonus=timeBonus)
      this.gameService.score.subscribe(score => this.score=score)
  }
}
