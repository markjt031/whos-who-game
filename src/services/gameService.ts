import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import Question from 'src/models/question'

@Injectable({
    providedIn: 'root'
})
//Game service tracks questions, scores, answers, and current question
export class GameService {
    private questionSource= new BehaviorSubject<Question[]>([])
    questions=this.questionSource.asObservable()
    
    private currentQuestionSource=new BehaviorSubject<Question | undefined>(undefined)
    currentQuestion=this.currentQuestionSource.asObservable()

    private currentQuestionIndexSource=new BehaviorSubject<number>(0)
    currentQuestionIndex=this.currentQuestionIndexSource.asObservable()

    private scoreSource= new BehaviorSubject<number>(0)
    score=this.scoreSource.asObservable()

    private answerSource=new BehaviorSubject<string[]>([])
    answers=this.answerSource.asObservable()

    private isWinSource= new BehaviorSubject<boolean>(false)
    isWin=this.isWinSource.asObservable()

    private gameCompleteSource = new BehaviorSubject<boolean>(false)
    isComplete=this.gameCompleteSource.asObservable()

    updateQuestions(questions: Question[]){
        this.questionSource.next(questions)
    }

    increaseCurrentQuestionIndex(){
        let current=this.currentQuestionIndexSource.value
        if (current<=9){
            current++
        }
        this.currentQuestionIndexSource.next(current)
    }
    updateCurrentQuestion(index: number){
        let currentIndex=this.currentQuestionIndexSource.value
        this.currentQuestionSource.next(this.questionSource.value[currentIndex])
    }

    addAnswer(answer: string){
        const currentAnswers=this.answerSource.value
        const updatedAnswers=[...currentAnswers, answer]
        this.answerSource.next(updatedAnswers)
    }
    incrementScore(score: number){
        const currentScore=this.scoreSource.value
        const updatedScore=currentScore+score
        this.scoreSource.next(updatedScore)
    }
    updateWin(win: boolean){
        this.isWinSource.next(win)
    }
   resetGame(){
        this.scoreSource.next(0)
        this.questionSource.next([])
        this.currentQuestionIndexSource.next(0)
        this.answerSource.next([])
        this.currentQuestionSource.next(undefined)
   }
   setComplete(isComplete: boolean){
    this.gameCompleteSource.next(isComplete)
   }


}