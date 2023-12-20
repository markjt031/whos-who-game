import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  
  answerForm: FormGroup = new FormGroup({
    answer: new FormControl<string>("", [Validators.required]),
  });
  
  clicked: boolean=false
  submitted: boolean=false
  answer=""
  
  constructor(private gameService: GameService, private audioService: AudioService, private router: Router) { }
  
  ngOnInit(): void {
   console.log(this.question)
  }
  onClick(){
    this.audioService.stopPlayer()
    this.audioService.updateIsPlaying(false)
  }
  onSubmit(){
    this.submitted=true
    if (!this.answerForm.valid){
      return
    }
    if (this.answerForm.valid){
      this.answer=this.answerForm.controls['answer'].value.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()']/g,"")
      this.gameService.addAnswer(this.answer)
      if (this.question){
        if (this.answer===this.question?.answer){
          this.gameService.incrementScore()
        }
      }
      this.gameService.increaseCurrentQuestionIndex()
      this.question && this.gameService.updateCurrentQuestion(this.question.id+1)
      this.audioService.stopPlayer()
      this.audioService.updateIsPlaying(false)
      this.submitted=false
    }
  }
  finishGame(){
    this.gameService.addAnswer(this.answer)
    if (this.question){
      if (this.answer===this.question?.answer){
        this.gameService.incrementScore()
      }
    }
    this.audioService.stopPlayer()
    this.audioService.updateIsPlaying(false)
    this.router.navigateByUrl('/gameover')
  }

}
