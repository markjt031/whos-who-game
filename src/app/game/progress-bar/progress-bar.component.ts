import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  @Input() currentQuestionIndex: number=0
  totalQuestions: number = 10
  currentProgress: number =0
  constructor() { }

  ngOnInit(): void {
    this.updateProgress()
  }
  updateProgress(){
    this.currentProgress=(((this.currentQuestionIndex)/this.totalQuestions) *100)
  }

}
