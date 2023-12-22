import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import ScoreEntry from 'src/models/scoreEntry'

@Injectable({
    providedIn: 'root'
})

export class LeaderboardService{
    private leaderBoardSource=new BehaviorSubject<ScoreEntry[]>([])
    leaderBoard=this.leaderBoardSource.asObservable()
    
    private latestScoreSource = new BehaviorSubject<ScoreEntry | undefined>(undefined)
    latestScore = this.latestScoreSource.asObservable()

    private hasDummyData: boolean = false;

    addEntry(entry: ScoreEntry){
        console.log('addentry')
        let currentBoard=this.leaderBoardSource.value
        let newBoard=[...currentBoard, entry].sort((a, b)=>b.score-a.score)
        this.leaderBoardSource.next(newBoard)
        this.latestScoreSource.next(entry)
    }

    setDummyData() {
        if (!this.hasDummyData) {
            console.log('dummy data added')
            let dummyBoard = [
                { name: "Helena", score: 99999 },
                { name: "Kenneth", score: 99999 },
                { name: "Jessica", score: 1200 },
                { name: "Drew", score: 400 },
                { name: "Biff", score: 0 }
            ]
            this.leaderBoardSource.next(dummyBoard)
            this.hasDummyData = true;
        }
    }
}