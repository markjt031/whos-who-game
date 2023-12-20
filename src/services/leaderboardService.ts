import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import ScoreEntry from 'src/models/scoreEntry'


@Injectable({
    providedIn: 'root'
})

export class LeaderboardService{
    private leaderBoardSource=new BehaviorSubject<ScoreEntry[]>([])
    leaderBoard=this.leaderBoardSource.asObservable()

    addEntry(entry: ScoreEntry){
        let currentBoard=this.leaderBoardSource.value
        let newBoard=[...currentBoard, entry].sort((a, b)=>b.score-a.score)
        this.leaderBoardSource.next(newBoard)
    }
}