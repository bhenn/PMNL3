import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { GamesPage  } from '../pages/games/games';
import { GamesDetail } from '../pages/games/games-detail';
import { GameInsert } from '../pages/games/game-insert';
import { GamePreview } from '../pages/games/game-preview';
import { RulesPage } from '../pages/rules/rules';
import { RankingPage } from '../pages/ranking/ranking';
import { TabsPage } from '../pages/tabs/tabs';
import { MomentModule } from 'angular2-moment';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { OrderByPipe } from '../pages/games/game-preview';

@NgModule({
  declarations: [
    MyApp,
    GamesPage,
    GamesDetail,
    GameInsert,
    GamePreview,
    RulesPage,
    RankingPage,
    TabsPage,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    MomentModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GamesPage,
    GamesDetail,
    GamePreview,
    RulesPage,
    RankingPage,
    GameInsert,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
