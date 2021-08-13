import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersDataService } from '../users-data.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  private _userToLogIn!:UserToLogIn;
  private _userLoggedIn:boolean=false;
  private _userName!:string;

  public get userToLogIn():UserToLogIn{
    return this._userToLogIn;
  }
  public set userLoggedIn(status:boolean){
    this._userLoggedIn = status;
  }
  public get userLoggedIn():boolean{
    return this._userLoggedIn;
  }
  public get userName():string{
    return this._userName;
  }
  public logInForm!:FormGroup
  constructor(private _usersService:UsersDataService,private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.logInForm = this.formBuilder.group({
      userName: '',
      password: '',
    });
  }

  public login() {

    console.log('user to be logged in',this.logInForm);
    this._userToLogIn= {
      userName:this.logInForm.controls.userName.value,
      password:this.logInForm.controls.password.value,
    }
    console.log('user about to be send to the database',this._userToLogIn);
    this._usersService.userLogIn(this._userToLogIn).then(response=>{
      this._userLoggedIn = true;
      this.logInForm = this.formBuilder.group({
        userName: '',
        password: '',
      });
      console.log(response)
    }).catch(err=>{
      console.log('error logging in ', err);
    });
  }

  public logOut(){
    console.log('status: before: ',this._userLoggedIn);

    this._userLoggedIn=false;
    console.log('status: ',this._userLoggedIn);
  }
}

export class UserToLogIn{
  userName!:string;
  password!:string;
}