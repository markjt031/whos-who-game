import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { SettingsComponent } from './home/settings/settings.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { AudioPlayerButtonsComponent } from './audio-player/audio-player-buttons/audio-player-buttons.component';
import { GameComponent } from './game/game.component';
import { QuestionComponent } from './game/question/question.component';
import { GameService } from "src/services/gameService";
import { AudioService } from "src/services/audioService";
import { ProgressBarComponent } from './game/progress-bar/progress-bar.component';
import { GameOverComponent } from './game-over/game-over.component';
import { GamePageComponent } from './game/game-page/game-page.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "game", component: GamePageComponent},
  { path: "gameover", component: GameOverComponent}
];

@NgModule({
  declarations: [AppComponent, HomeComponent, SettingsComponent, AudioPlayerComponent, AudioPlayerButtonsComponent, GameComponent, QuestionComponent, ProgressBarComponent, GameOverComponent, GamePageComponent, LeaderboardComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(routes)],
  providers: [GameService, AudioService],
  bootstrap: [AppComponent]
})
export class AppModule {}
