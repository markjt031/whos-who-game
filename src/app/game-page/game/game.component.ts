import { Component, Input, OnInit } from '@angular/core';
import Question from 'src/models/question';
import Song from 'src/models/song';
import { AudioService } from 'src/services/audioService';
import { GameService } from 'src/services/gameService';
import { SettingsService } from 'src/services/settings.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
 @Input() songs: Song[]=[]

 currentQuestion: Question | undefined=undefined
 currentQuestionIndex: number=0
 questions: Question[]=[]
 score: number=0
 numberCorrect: number=0
 receivedAnswer: string = ""
 gameComplete: boolean = false;
 mode: string = ""

  constructor(
    private gameService: GameService, 
    private audioService: AudioService, 
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.gameService.setComplete(false)
    this.audioService.songsList.subscribe(songsList=>this.songs=songsList)
    this.settingsService.mode.subscribe(mode => this.mode = mode.toLowerCase())
    this.generateQuestions(this.mode)
    this.gameService.updateQuestions(this.questions)
    this.gameService.currentQuestionIndex.subscribe(currentQuestionIndex=>this.currentQuestionIndex=currentQuestionIndex)
    this.gameService.updateCurrentQuestion(this.currentQuestionIndex)
    this.gameService.currentQuestion.subscribe(currentQuestion=>this.currentQuestion=currentQuestion) 
    this.gameService.score.subscribe(score=>this.score=score)
    
  }
  
  generateQuestions(mode: string){
    if (!this.mode){
      this.mode='title'
      mode='title'
    }
    if (mode === 'title'){
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
