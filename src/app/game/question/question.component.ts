import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Question from 'src/models/question';
import { AudioService } from 'src/services/audioService';
import { GameService } from 'src/services/gameService';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question | undefined = undefined
  
  clicked: boolean=false

  answer=""
  
  constructor(private gameService: GameService, private audioService: AudioService) { }
  
  ngOnInit(): void {
   console.log(this.question)
  }
  changeAnswer(answer: string){
    this.answer=answer.toLowerCase()
  }
  onClick(){
    this.audioService.stopPlayer()
    this.audioService.updateIsPlaying(false)
  }
  onSubmit(){
    this.gameService.addAnswer(this.answer)
    if (this.question){
      if (this.answer===this.question?.answer){
        this.gameService.incrementScore()
      }
    }
    this.gameService.increaseCurrentQuestionIndex()
    this.question && this.gameService.updateCurrentQuestion(this.question.id+1)
    this.audioService.stopPlayer()
  }

}
