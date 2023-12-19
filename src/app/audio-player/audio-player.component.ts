import { Component, Input, OnInit } from '@angular/core';
import {Howl} from 'howler'
import { AudioService } from 'src/services/audioService';


@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit {
  @Input() trackUrl: string=""

  player: Howl | undefined =undefined

  
  constructor(private audioService: AudioService) { }

  ngOnInit(): void {
    this.player= new Howl({
      src: [this.trackUrl],
      format: ['mp3'],
      autoplay: false,
      volume: 0.5
    })
    this.audioService.setPlayer(this.player)
  }

}
