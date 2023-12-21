import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Howler } from 'howler'
import Song from 'src/models/song'


@Injectable({
    providedIn: 'root'
})
export class AudioService{
    private playerSource=new BehaviorSubject<Howl | undefined>(undefined)
    player=this.playerSource.asObservable()

    private isPlayingSource=new BehaviorSubject<boolean>(false)
    isPlaying=this.isPlayingSource.asObservable()

    private songsListSource=new BehaviorSubject<Song[]>([])
    songsList=this.songsListSource.asObservable()

    private volumeSource=new BehaviorSubject<number>(0.5)
    volume=this.volumeSource.asObservable()

    setPlayer(player: Howl){
        this.playerSource.next(player)
    }
    updateIsPlaying(isPlaying: boolean){
        this.isPlayingSource.next(isPlaying)
    }
    updateSongsList(songs: Song[]){
        this.songsListSource.next(songs)
    }
    stopPlayer(){
        if (this.playerSource.value){
            this.playerSource.value.stop()
        }
    }
    updateVolume(volume: number){
        this.volumeSource.next(volume)
    }
    


}