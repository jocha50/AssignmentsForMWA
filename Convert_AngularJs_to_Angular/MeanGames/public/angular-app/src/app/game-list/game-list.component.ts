import { Component, OnInit } from '@angular/core';
import { GamesDataService } from '../games-data.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
})
export class GameListComponent implements OnInit {
 private _title:string='title';
  private _games: Game[] = [];
  private _offset: number = 0;
  private _maxReached: boolean = false;


  public gameForm!:FormGroup;
  public get title():string{
    return this._title;
  }
  public set title(title:string){
    this._title = title;
  }
  public get games(): Game[] {
    return this._games;
  }
  public get offset(): number {
    return this._offset;
  }
  public get maxReached(): boolean {
    return this._maxReached;
  }
  constructor(private _gamesService: GamesDataService,private activatedRoute:ActivatedRoute , private formBuilder:FormBuilder) {} //property dependency injection

  ngOnInit(): void {
    //something goes here

    // this.gameForm= this.formBuilder.group({
    //   title:'titleFormBulder'
    // })
    this.gameForm = new FormGroup({
      title: new FormControl('onInitTitle'), //set all the attributes in the form
    })

    this._gamesService
      .getAllGames(0)
      .then((response) => {
        console.log('response', response);
        this._games = response;
      })
      .catch((err) => {
        console.log('error', err);
      });
  }

  public next(): any {
    this._offset += 5;
    this._gamesService
      .getAllGames(this._offset)
      .then((response) => {
        console.log('response', response);
        this._games = response;
        if (this._games.length < 5) {
          this._maxReached = true;
        }
      })
      .catch((err) => {
        console.log('error', err);
      });
  }

  public previous(): any {
    this._offset -= 5;
    this._maxReached = false;
    this._gamesService
      .getAllGames(this._offset)
      .then((response) => {
        console.log('response', response);
        this._games = response;
      })
      .catch((err) => {
        console.log('error', err);
      });
  }

  public gameSave(){
    console.log('saving game',this.gameForm)
  }
  public save(){
    console.log('saving game',this._title)
  }
}

export class Game {
  _id!: string;
  title!: string;
  year!: number;
  rate!: number;
  price!: number;
  minPlayers!: number;
  maxPlayers!: number;
  minAge!: number;
  designer!: string;
}
