import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../game-list/game-list.component';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {

  
  private _game:Game= {
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
  public editForm!:FormGroup;

  public get game() {
    return this._game;
  }


  constructor(
    private gamesService: GamesDataService,
    private activatedRoute: ActivatedRoute,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {

    this.editForm = this.formBuilder.group({
        
      title: this._game.title,
      year: this._game.year,
      rate: this._game.rate,
      price: this._game.price,
      minPlayers: this._game.minPlayers,
      maxPlayers: this._game.maxPlayers,
      minAge: this._game.minAge,
      designer: this._game.designer,
    });

    const gameId: string = this.activatedRoute.snapshot.params['gameId'];

    console.log(gameId, 'gameId');
    this.gamesService
      .getOneGame(gameId)
      .then((response) => {
        console.log('respose',response);
        this._game = response;
        console.log('this game' , this._game)
        this.editForm = this.formBuilder.group({
        
          title: this._game.title,
          year: this._game.year,
          rate: this._game.rate,
          price: this._game.price,
          minPlayers: this._game.minPlayers,
          maxPlayers: this._game.maxPlayers,
          minAge: this._game.minAge,
          designer: this._game.designer,
        });
      })
      .catch((err) => {
        console.log('error getting a single game', err);
      });
  }

  public fullUpdateGame(){

    console.log('update clicked')
    const gameId: string = this.activatedRoute.snapshot.params['gameId'];
    let updatedGame:Game= {
      _id: gameId,
      title: this.editForm.controls.title.value,
      year: this.editForm.controls.year.value,
      rate: this.editForm.controls.rate.value,
      price: this.editForm.controls.price.value,
      minPlayers:this.editForm.controls.minPlayers.value,
      maxPlayers: this.editForm.controls.maxPlayers.value,
      minAge: this.editForm.controls.minAge.value,
      designer: this.editForm.controls.designer.value,
    }
 

    this.gamesService.fullUpdateGame(updatedGame,gameId).then(response=>{
      console.log('gamesaved');
    }).catch(err=>{
      console.log('error updating game',err);
    })
  
  }
}
