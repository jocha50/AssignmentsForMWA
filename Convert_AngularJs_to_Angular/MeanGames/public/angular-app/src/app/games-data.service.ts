import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Game } from './game-list/game-list.component';

//decorator
@Injectable({
  providedIn: 'root',
})
export class GamesDataService {
  private apiBaseUrl: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  public getAllGames(offset: number): Promise<Game[]> {
    let url: string = '';
    if (offset) {
      url = this.apiBaseUrl + '/games?offset=' + offset;
    } else {
      url = this.apiBaseUrl + '/games';
    }

    return new Promise((resolve, reject) => {
      this.http
        .get(url)
        .toPromise()
        .then((response) => {
          console.log('games', response);
          resolve(response as Game[]);
        })
        .catch(this.handleError);
    });
  }

  private handleError(error: any): Promise<any> {
    console.log('error in getting games ', error);
    return Promise.reject(error.message || error);
  }

  public getOneGame(gameId: string): Promise<Game> {
    const url: string = this.apiBaseUrl + '/games/' + gameId;
    return new Promise((resolve, reject) => {
      this.http
        .get(url)
        .toPromise()
        .then((game) => {
          resolve(game as Game);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public fullUpdateGame(updatedGame: Game, gameId: string) {
    const url: string = this.apiBaseUrl + '/games/' + gameId;
    return new Promise((resolve,reject)=>{
      this.http
      .put(url, updatedGame)
      .toPromise()
      .then((response) => {
        console.log('game updated successfully');
        resolve(response);
      })
      .catch(err=>{
        reject(err);
      });
    })
  }


  public deleteOneGame(gameId: string) {
    const url: string = this.apiBaseUrl + '/games/' + gameId;
    return new Promise((resolve,reject)=>{
      this.http
      .delete(url)
      .toPromise()
      .then((response) => {
        console.log('game updated successfully');
        resolve(response);
      })
      .catch(err=>{
        reject(err);
      });
    })
  }
}

//express app
// app.use('/api',(req,res,next)=>{
//   res.header('Access-Control-Allow-Origin','http://localhost:4200/');
//   res.
// })
