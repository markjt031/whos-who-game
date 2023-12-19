import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Howler } from 'howler'


@Injectable({
    providedIn: 'root'
})
///The entire purpose of this service is so that the audio clip
// can be stopped by a button press from a sibling component
export class AudioService{
    private playerSource=new BehaviorSubject<Howl | undefined>(undefined)
    player=this.playerSource.asObservable()
    private isPlayingSource=new BehaviorSubject<boolean>(false)
    isPlaying=this.isPlayingSource.asObservable()
    setPlayer(player: Howl){
        this.playerSource.next(player)
    }
    updateIsPlaying(isPlaying: boolean){
        this.isPlayingSource.next(isPlaying)
    }
    stopPlayer(){
        if (this.playerSource.value){
            this.playerSource.value.stop()
        }
        
    }
    


}