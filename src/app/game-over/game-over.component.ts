import { Component, OnInit } from '@angular/core';
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
  constructor(private gameService: GameService, private leaderBoardService: LeaderboardService, private router: Router) { }

  ngOnInit(): void {
    this.gameService.score.subscribe(score=>this.score=score)
    this.checkWin()
  }
  changeName(name: string){
    this.name=name
  }
  checkWin(){
    if (this.score>=500){
      this.win=true
      this.gameService.updateWin(true)
    }
    else{
      this.win=false
    }
  }
  onSubmit(){
    console.log(this.name)
    this.leaderBoardService.addEntry({name: this.name, score: this.score})
    this.gameService.resetGame()
    this.router.navigateByUrl("/")
  }
}
