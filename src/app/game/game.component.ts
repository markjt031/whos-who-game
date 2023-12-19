import { Component, Input, OnInit } from '@angular/core';
import Question from 'src/models/question';
import Song from 'src/models/song';
import { GameService } from 'src/services/gameService';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
 @Input() songs: Song[]=[]

 //Pull this from config when config is set up
 @Input() mode: string=""
 currentQuestion: Question | undefined=undefined
 currentQuestionIndex: number=0
 questions: Question[]=[]
 score: number=0
 receivedAnswer: string = ""

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.generateQuestions(this.mode)
    this.gameService.updateQuestions(this.questions)
    this.gameService.currentQuestionIndex.subscribe(currentQuestionIndex=>this.currentQuestionIndex=currentQuestionIndex)
    this.gameService.updateCurrentQuestion(this.currentQuestionIndex)
    this.gameService.currentQuestion.subscribe(currentQuestion=>this.currentQuestion=currentQuestion) 
    this.gameService.score.subscribe(score=>this.score=score)
  }
  //this will take the mode from the config when the config is set up
  //all it does is turn the songs into questions with an answer and numbered id
  generateQuestions(mode: string){
    if (mode === 'title'){
      console.log(this.songs.length)
      for (let i=0; i<this.songs.length; i++){
        this.questions.push({
          id: i,
          answer: this.songs[i].name.toLowerCase(),
          preview_url: this.songs[i].preview_url
        })
      }
      this.currentQuestion=this.questions[0]
    }
    if (mode === 'artist'){
      for (let i =0; i<this.songs.length; i++){
        this.questions.push({
          id: i,
          answer: this.songs[i].artist.toLowerCase(),
          preview_url: this.songs[i].preview_url
        })
      }
    }
    this.currentQuestion=this.questions[0]
  }
  
}
