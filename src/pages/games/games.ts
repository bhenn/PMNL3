import { Component } from '@angular/core';
import { TournamentService } from '../../providers/tournament-service';
import { GameService } from '../../providers/game-service';
import { ViewController, NavController, ModalController, NavParams, LoadingController , AlertController} from 'ionic-angular';
import { GameInsert } from './game-insert';
import { Game } from './game';
import { Tournament } from '../tournament/tournament';
import { GamesDetail } from './games-detail';

@Component({
  selector: 'page-games',
  templateUrl: 'games.html',
  providers: [GameService, TournamentService]
})
export class GamesPage {

  tournaments: Tournament[];
  
  constructor(public gameService: GameService, 
              public tournamentService: TournamentService,
              public modalCtrl:ModalController,
              public loadingCtrl: LoadingController,
              public navCtrl: NavController,
              private alertCtrl: AlertController) {
  
    this.loadGames();
  }  

  loadGames(){

    let loading = this.loadingCtrl.create({
      content: "Carregando"
    })

    loading.present();

    this.tournamentService.getAll()
      .subscribe(
          data => {this.tournaments = data; loading.dismiss()},
          error => {this.showError(error); loading.dismiss()}
      );

    loading.dismiss();

  }

  reload(refresher){
    this.loadGames();
    refresher.complete();
  }

  openDetails(item){
  	this.navCtrl.push(GamesDetail,{item: item});

  }

  clickAlert(){
    this.showError('teste');
  }

  openInsert(tournament: Tournament){
    let modal = this.modalCtrl.create(GameInsert,{tournament: tournament });
    modal.present();
  }

  showError(error){
    let alert = this.alertCtrl.create({
      title: "Erro",
      subTitle: error,
      buttons: ['Dismiss']
    })

    alert.present();

  }

}


