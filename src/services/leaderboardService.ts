import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import ScoreEntry from 'src/models/scoreEntry'


@Injectable({
    providedIn: 'root'
})

export class LeaderboardService{
    private leaderBoardSource=new BehaviorSubject<ScoreEntry[]>([])
    leaderBoard=this.leaderBoardSource.asObservable()

    private hasDummyData: boolean = false;

    addEntry(entry: ScoreEntry){
        console.log('addentry')
        let currentBoard=this.leaderBoardSource.value
        let newBoard=[...currentBoard, entry].sort((a, b)=>b.score-a.score)
        this.leaderBoardSource.next(newBoard)
    }

    setDummyData() {
        if (!this.hasDummyData) {
            console.log('dummydata')
            let dummyBoard = [
                { name: "PlayerOne", score: 700 },
                { name: "PlayerTwo", score: 500 },
                { name: "PlayerThree", score: 300 },
                { name: "PlayerFour", score: -100 }
            ]
            this.leaderBoardSource.next(dummyBoard)
            this.hasDummyData = true;
        }
    }
}