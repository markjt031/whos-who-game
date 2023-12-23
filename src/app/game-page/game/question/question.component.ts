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
      this.answer=this.answerForm.controls['answer'].value.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()']/g,"")
      this.gameService.addAnswer(this.answer)
      this.updateScore()
      this.gameService.increaseCurrentQuestionIndex()
      this.question && this.gameService.updateCurrentQuestion(this.question.id+1)
      this.audioService.stopPlayer()
      this.audioService.updateIsPlaying(false)
      this.time=0
      this.submitted=false
    }
  }
  updateScore(){
    if (this.question){
      if (this.question?.answer.includes(this.answer)){
        let multiplier=this.calculatePercentMatch(this.answer,this.question.answer)
        let timeBonus=this.calculateTimeBonus(this.time)*multiplier
        let points=timeBonus+100*multiplier
        this.gameService.incrementScore(points)
        this.gameService.incrementTimeBonus(timeBonus)
        this.gameService.incrementNumberCorrect()
      }
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
    this.updateScore()
    this.audioService.stopPlayer()
    this.audioService.updateIsPlaying(false)
    this.time=0
    this.gameService.setComplete(true)
    this.router.navigateByUrl('/gameover')
  }
  calculatePercentMatch(userInput: string, actualAnswer: string){
    let inputWords=userInput.split(" ")
    console.log(inputWords)
    let answerWords=actualAnswer.split(" ")
    console.log(answerWords)
    let numberOfWordsMatched=0
    for (let i=0; i<inputWords.length; i++){
      if (answerWords[i]===inputWords[i]){
        numberOfWordsMatched++
      }
    }
    console.log(numberOfWordsMatched)
    console.log(answerWords.length)
    //add .2 to multiplier for full match
    if (numberOfWordsMatched===answerWords.length){
      return Math.ceil(numberOfWordsMatched/answerWords.length)+ .2
    }
    console.log(Math.ceil(numberOfWordsMatched/answerWords.length)*100)
    return Math.ceil(numberOfWordsMatched/answerWords.length)
    
  }
}
