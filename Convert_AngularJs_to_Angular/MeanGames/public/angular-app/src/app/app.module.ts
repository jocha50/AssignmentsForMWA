import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { GameListComponent } from './game-list/game-list.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import { DeleteGameComponent } from './delete-game/delete-game.component';
import { GameRattingComponent } from './game-ratting/game-ratting.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegisterUserComponent } from './register-user/register-user.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    GameListComponent,
    FooterComponent,
    ErrorPageComponent,
    GameDetailsComponent,
    EditGameComponent,
    DeleteGameComponent,
    GameRattingComponent,
    NavigationComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path:'',
        component:WelcomeComponent,
      },
      {
        path:'games',
        component:GameListComponent,
      },
      {
        path:'details/:gameId',
        component:GameDetailsComponent,
      },
      {
        path:'editGame/:gameId',
        component:EditGameComponent,
      },
      {
        path:'deleteGame/:gameId',
        component:DeleteGameComponent,
      },
      {
        path:'register',
        component:RegisterUserComponent,
      },
      {
        path:'**',
        component:ErrorPageComponent,
      }

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
