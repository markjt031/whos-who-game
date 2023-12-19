import { Component, OnInit } from "@angular/core";
import fetchFromSpotify, { request } from "../../services/api";
import Song from "src/models/song";
import { AudioService } from "src/services/audioService";

const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor() {}

  genres: String[] = ["House", "Alternative", "J-Rock", "R&B"];
  selectedGenre: String = "";
  authLoading: boolean = false;
  configLoading: boolean = false;
  token: String = "";
  song: Song | undefined=undefined
  songs: Song[] =[]

  //Hard coded playlist ids for certain genres
  playlists={
    'alternative': "37i9dQZF1DX9GRpeH4CL0S",
    'christmas': "37i9dQZF1DX6R7QUWePReA",
    'classic rock': "37i9dQZF1DXdOEFt9ZX0dh",
    'emo': "37i9dQZF1DX9wa6XirBPv8",
  }

  ngOnInit(): void {
    this.authLoading = true;
    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage");
        this.authLoading = false;
        this.token = storedToken.value;
        this.loadGenres(storedToken.value);
        this.getPlaylist(this.playlists['classic rock'])
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
      this.loadGenres(newToken.value);
      this.getPlaylist(this.playlists.alternative)
    });
    
  }

  loadGenres = async (t: any) => {
    this.configLoading = true;

    // #################################################################################
    // DEPRECATED!!! Use only for example purposes
    // DO NOT USE the recommendations endpoint in your application
    // Has been known to cause 429 errors
    // const response = await fetchFromSpotify({
    //   token: t,
    //   endpoint: "recommendations/available-genre-seeds",
    // });
    // console.log(response);
    // #################################################################################
    
    this.genres = [
      "rock",
      "rap",
      "pop",
      "country",
      "hip-hop",
      "jazz",
      "alternative",
      "j-pop",
      "k-pop",
      "emo"
    ]
    this.configLoading = false;
  };
  
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
      console.log(playlist)
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
    })
  }

  setGenre(selectedGenre: any) {
    this.selectedGenre = selectedGenre;
    console.log(this.selectedGenre);
    console.log(TOKEN_KEY);
  }
}
