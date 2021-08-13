import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersDataService } from '../users-data.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit {
  private _user!: User;

  public userForm!: FormGroup;
  public set user(user: User) {
    this._user = user;
  }
  public get user(): User {
    return this._user;
  }
  constructor(
    private _usersService: UsersDataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      userName: '',
      name: '',
      password: '',
    });
  }

  public registerUser() {
    console.log('user to be registered', this.userForm);

    this._user = {
      userName: this.userForm.controls.userName.value,
      name: this.userForm.controls.name.value,
      password: this.userForm.controls.password.value,
    };
    console.log('user to be send to database', this._user);
    this._usersService
      .registerUser(this._user)
      .then((response) => {
        console.log('saved user',response);
      })
      .catch((err) => {
        console.log('error', err);
      });
  }
}

export class User {
  userName!: string;
  name!: string;
  password!: string;
}
