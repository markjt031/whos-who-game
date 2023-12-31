import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from 'src/services/gameService';
import { LeaderboardService } from 'src/services/leaderboardService';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.css']
})
export class GameOverComponent implements OnInit {
  score: number = 0
  win: boolean = false
  name: string= ""
  submitted: boolean= false
  isComplete: boolean = false
  renderScoreBreakdown: boolean= true

  nameForm: FormGroup = new FormGroup({
    name: new FormControl<string>("", [Validators.required, Validators.maxLength(12)]),
  });

  constructor(private gameService: GameService, private leaderBoardService: LeaderboardService, private router: Router) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.renderScoreBreakdown=false
    }, 5000)
    this.gameService.score.subscribe(score=>this.score=score)
    this.gameService.isComplete.subscribe(isComplete=>this.isComplete=isComplete)
    if (!this.isComplete){
      this.router.navigateByUrl("/")
    }
    this.checkWin()
  }

  checkWin(){
    if (this.score>=500){
      this.win=true
      this.gameService.updateWin(true)
    }
    else{
      this.win=false
      this.gameService.updateWin(false)
    }
  }
  onSubmit(){
    this.submitted=true
    if (!this.nameForm.valid){
      return
    }
    console.log('here')
    this.leaderBoardService.addEntry({name: this.nameForm.controls['name'].value, score: this.score})
    this.gameService.resetGame()
    this.submitted=false
    this.router.navigateByUrl("/leaderboard")
  }
}
