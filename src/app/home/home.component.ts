import { Component, OnInit } from "@angular/core";
import fetchFromSpotify, { request } from "../../services/api";
import Song from "src/models/song";
import { AudioService } from "src/services/audioService";


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private audioService: AudioService) {}

  settingsShown: boolean = true

  

  ngOnInit(): void {
    
  }

  // loadGenres = async (t: any) => {
  //   this.configLoading = true;

  //   #################################################################################
  //   DEPRECATED!!! Use only for example purposes
  //   DO NOT USE the recommendations endpoint in your application
  //   Has been known to cause 429 errors
  //   const response = await fetchFromSpotify({
  //     token: t,
  //     endpoint: "recommendations/available-genre-seeds",
  //   });
  //   console.log(response);
  //   #################################################################################
    
  //   this.genres = [
  //     "rock",
  //     "rap",
  //     "pop",
  //     "country",
  //     "hip-hop",
  //     "jazz",
  //     "alternative",
  //     "j-pop",
  //     "k-pop",
  //     "emo"
  //   ]
  //   this.configLoading = false;
  // };

  toggleSettings() {
    this.settingsShown = !this.settingsShown
  }
}
