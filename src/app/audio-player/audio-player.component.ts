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

  currentVolume = 0.5;

  updateVolume() {
    this.player?.volume(this.currentVolume)
    this.audioService.updateVolume(this.currentVolume)
  }

  constructor(private audioService: AudioService) { }

  ngOnInit(): void {
    this.audioService.volume.subscribe(volume=>this.currentVolume=volume)
    this.player= new Howl({
      src: [this.trackUrl],
      format: ['mp3'],
      autoplay: false,
      volume: this.currentVolume
    })
    this.audioService.setPlayer(this.player)
  }

}
