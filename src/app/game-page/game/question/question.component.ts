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
  timer: NodeJS.Timer | undefined = undefined
  time: number = 0
  constructor(private gameService: GameService, private audioService: AudioService, private router: Router) { }
  
  ngOnInit(): void {
   console.log(this.question)
   this.timer=setInterval(()=>{
    this.time++
   }, 1000)
  }
  clearTimer(){
    clearInterval(this.timer)
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
      this.clearTimer()
      console.log(this.time)
      this.answer=this.answerForm.controls['answer'].value.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()']/g,"")
      this.gameService.addAnswer(this.answer)
      if (this.question){
        if (this.answer===this.question?.answer){
          let points=this.calculateTimeBonus(this.time)+100
          this.gameService.incrementScore(points)
          this.gameService.incrementNumberCorrect()
        }
      }
      this.gameService.increaseCurrentQuestionIndex()
      this.question && this.gameService.updateCurrentQuestion(this.question.id+1)
      this.audioService.stopPlayer()
      this.audioService.updateIsPlaying(false)
      this.time=0
      this.submitted=false
    }
  }
  calculateTimeBonus(time: number){
    if (time>17.5){
      return 0
    }
    else return 350-20*time
  }
  finishGame(){
    this.clearTimer()
    this.gameService.addAnswer(this.answer)
    if (this.question){
      if (this.answer===this.question?.answer){
        let points=this.calculateTimeBonus(this.time)+100
        this.gameService.incrementScore(points)
        this.gameService.incrementNumberCorrect()
      }
    }
    this.audioService.stopPlayer()
    this.audioService.updateIsPlaying(false)
    this.time=0
    this.gameService.setComplete(true)
    this.router.navigateByUrl('/gameover')
  }

}
