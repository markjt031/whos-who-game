import { Component, OnInit } from '@angular/core';
import Song from 'src/models/song';
import fetchFromSpotify, { request } from 'src/services/api';
import { AudioService } from 'src/services/audioService';
import { SettingsService } from 'src/services/settings.service';
import { Router } from '@angular/router';

const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  authLoading: boolean = false;
  configLoading: boolean = false;
  token: String = "";
  song: Song | undefined=undefined
  songs: Song[] =[]
  isLoading: boolean=true

  //Hard coded playlist ids for certain genres. these can be changed to better ones
  playlists={
    'alternative': "37i9dQZF1DX9GRpeH4CL0S",
    'christmas': "37i9dQZF1DX6R7QUWePReA",
    'classicRock': "37i9dQZF1DXdOEFt9ZX0dh",
    'emo': "37i9dQZF1DX9wa6XirBPv8",
    'rap': "37i9dQZF1EIgbjUtLiWmHt",
    'pop': "37i9dQZF1EQncLwOalG3K7",
    'country': "37i9dQZF1EQmPV0vrce2QZ",
    'rock': "37i9dQZF1EQpj7X7UK8OOF"
  }
  
  selectedGenre: string= ""
  constructor(private audioService: AudioService, private settingsService: SettingsService, private router: Router) { }

  ngOnInit(): void {
    this.isLoading=true
    this.settingsService.genre.subscribe((genre)=>this.selectedGenre=genre)
    if (!this.selectedGenre){
      this.router.navigateByUrl("/")
    }
    this.authLoading = true;
    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage");
        this.authLoading = false;
        this.token = storedToken.value;
        this.getPlaylistOfSelectedGenre(this.selectedGenre.toLowerCase())
        return;
      }
    }
    console.log("Sending request to AWS endpoint");
    request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      };
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
      this.authLoading = false;
      this.token = newToken.value;
      this.getPlaylistOfSelectedGenre(this.selectedGenre.toLowerCase())
    });
    
  }
  getSong = async(title: string, artist: string)=>{
    const response= await fetchFromSpotify({
      token: this.token,
      endpoint: "search",
      params: {
        type: 'track',
        q: `track:${title} artist:${artist}`
      }
    }).then((tracks)=>{
      console.log(tracks.tracks)
      if (tracks.tracks.items.length!==0){
        this.song={
          artist: tracks.tracks.items[0].artists[0].name,
          name: tracks.tracks.items[0].name,
          preview_url: tracks.tracks.items[0].preview_url
        }
      }
    })
  }
  getPlaylist=async(playlistID: string)=>{
    const response = await fetchFromSpotify({
      token: this.token,
      endpoint: `playlists/${playlistID}`
    }).then((playlist)=>{
      let songs=playlist.tracks.items
        .map((item: any)=>item.track)
        .filter((song: any)=>song.preview_url)
        .filter((song: any)=>!(song.name.toLowerCase().includes('remaster') || song.name.toLowerCase().includes('remix')))
        .sort(()=>Math.random()-0.5)
      for (let i=0; i<10; i++){
        this.songs.push({
          name: songs[i].name.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()']/g,""),
          artist: songs[i].artists[0].name.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()']/g,""),
          preview_url: songs[i].preview_url
        })
      }
      console.log(this.songs)
      this.audioService.updateSongsList(this.songs)
      this.isLoading=false
    })
  }
  //Made this because typescript yelled at me for trying to pass the selected genre into the getPlaylists directly
  getPlaylistOfSelectedGenre(genre: string){
    console.log(genre)
    switch(genre){
      case 'country':
        this.getPlaylist(this.playlists['country'])
        break
      case 'rock':
        this.getPlaylist(this.playlists['rock'])
        break
      case 'alternative':
        this.getPlaylist(this.playlists['alternative'])
        break
      case 'rap':
        this.getPlaylist(this.playlists['rap'])
        break
      case 'pop':
        this.getPlaylist(this.playlists['pop'])
        break
      default:
        this.getPlaylist(this.playlists['rock'])
        break
    }
  }
}

