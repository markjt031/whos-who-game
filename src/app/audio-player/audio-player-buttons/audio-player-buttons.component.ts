import { Component, Input, OnInit } from '@angular/core';
import { AudioService } from 'src/services/audioService';



@Component({
  selector: 'app-audio-player-buttons',
  templateUrl: './audio-player-buttons.component.html',
  styleUrls: ['./audio-player-buttons.component.css']
})
export class AudioPlayerButtonsComponent implements OnInit {
  @Input() player: Howl | undefined= undefined

  isPlaying: boolean=false
  timer: NodeJS.Timer | undefined=undefined 

  constructor(private audioService: AudioService) { }

  ngOnInit(): void {
   this.audioService.isPlaying.subscribe(isPlaying=>this.isPlaying=isPlaying)
  }
  //using timers is the only way I could figure out how to get
  //the clip to be 10 seconds and also pausable with howler.js
  play(){
    if(this.player){
      this.audioService.updateIsPlaying(true)
      this.player.play()
      console.log(this.player?.seek()*1000)
      console.log(10000-(this.player?.seek()*1000))
      this.timer=setTimeout(()=>{
        this.player?.stop()
        this.isPlaying=false
        
      },10000-(this.player?.seek()*1000)
        
        )
    }
  }
  pause(){
    this.player?.pause()
    this.audioService.updateIsPlaying(false)
    this.player && console.log(this.player?.seek()*1000)
    this.timer && this.clearTimer(this.timer)
  }
  stop(){
    this.player?.stop()
    this.audioService.updateIsPlaying(false)
    this.timer && this.clearTimer(this.timer)
  }
  clearTimer(timer: NodeJS.Timer){
    this.timer && clearTimeout(this.timer)
  }
}
