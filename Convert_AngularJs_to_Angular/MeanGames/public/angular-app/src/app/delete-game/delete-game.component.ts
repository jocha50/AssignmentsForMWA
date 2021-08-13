import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../game-list/game-list.component';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-delete-game',
  templateUrl: './delete-game.component.html',
  styleUrls: ['./delete-game.component.css']
})
export class DeleteGameComponent implements OnInit {

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
  public confirm(){
    const gameId: string = this.activatedRoute.snapshot.params['gameId'];
    
    this.gamesService.deleteOneGame(gameId).then(response=>{
      console.log('game deleted');
    }).catch(err=>{
      console.log('error',err);
    })
  }

}
