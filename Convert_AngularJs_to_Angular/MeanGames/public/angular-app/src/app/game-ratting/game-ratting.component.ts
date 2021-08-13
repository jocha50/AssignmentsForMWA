import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-game-ratting',
  templateUrl: './game-ratting.component.html',
  styleUrls: ['./game-ratting.component.css']
})
export class GameRattingComponent implements OnInit {

  // @Input() ratting!:number;
  private _ratting!:number;

  @Input() set ratting (ratting:number){
    this._ratting = ratting;
    this.convert();

  }
  rattingArray!:number[];
  constructor() { }
  // ngOnChanges(changes: SimpleChanges): void {
    
  //   this.convert();
  // }

  ngOnInit(): void {
  }




  public convert(){
    this.rattingArray = new Array(this._ratting);
  }

}
