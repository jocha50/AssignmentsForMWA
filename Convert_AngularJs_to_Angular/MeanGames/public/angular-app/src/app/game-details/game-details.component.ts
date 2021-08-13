import { Component, OnInit } from '@angular/core';
import { GamesDataService } from '../games-data.service';
import { Game } from '../game-list/game-list.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css'],
})
export class GameDetailsComponent implements OnInit {
  private _game: Game = {
    _id: '',
    title: '',
    year: 0,
    rate: 0,
    price: 0,
    minPlayers: 0,
    maxPlayers: 0,
    minAge: 0,
    designer: '',
  };
  constructor(
    private gamesService: GamesDataService,
    private activatedRoute: ActivatedRoute
  ) {}
  public get game() {
    return this._game;
  }
  ngOnInit(): void {
    const gameId: string = this.activatedRoute.snapshot.params['gameId'];

    console.log(gameId, 'gameId');
    this.gamesService
      .getOneGame(gameId)
      .then((response) => {
        this._game = response;
      })
      .catch((err) => {
        console.log('error getting a single game', err);
      });
  }

  // private receivedGame(game: Game) {
  //   this._game = game;
  // }
}
// export class Game{
//   title!:string;
//   year!:number;
//   rate!:number;
//   price!:number;
//   minPlayers!:number;
//   maxPlayers!:number;

// }
