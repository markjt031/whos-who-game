import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-audio-player-buttons',
  templateUrl: './audio-player-buttons.component.html',
  styleUrls: ['./audio-player-buttons.component.css']
})
export class AudioPlayerButtonsComponent implements OnInit {
  @Input() player: Howl | undefined= undefined

  isPlaying: boolean=false
  timer: NodeJS.Timer | undefined=undefined 

  constructor() { }

  ngOnInit(): void {
   
  }
  //using timers is the only way I could figure out how to get
  //the clip to be 10 seconds and also pausable with howler.js
  play(){
    if(this.player){
      this.isPlaying=true
      this.player.play()
      this.timer=setTimeout(()=>{
        this.player?.stop()
        this.isPlaying=false
        
      },10000-this.player?.seek()
        
        )
    }
  }
  pause(){
    this.player?.pause()
    this.isPlaying=false
  }
  stop(){
    this.player?.stop()
  }
  clearTimer(){
    this.timer && clearTimeout(this.timer)
  }
}
