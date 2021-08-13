import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserToLogIn } from './navigation/navigation.component';
import { User } from './register-user/register-user.component';

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  private apiBaseUrl: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  public registerUser(newUser: User): Promise<User> {
    const url = this.apiBaseUrl + '/users/register';
    return this.http
      .post(url, newUser)
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  private handleResponse(response: any): Promise<any> {
    console.log('response from db',response);
    return Promise.resolve(response as User);
  }

  private handleError(error: any): Promise<any> {
    console.log('error in getting users ', error);
    return Promise.reject(error.message || error);
  }

  public userLogIn(user:UserToLogIn):Promise<UserToLogIn>{
    const url = this.apiBaseUrl + '/users/login';
    return this.http.post(url,user).toPromise().then((response)=>{
      return Promise.resolve(response as UserToLogIn);
    }).catch(this.handleError);

  }
  
}
