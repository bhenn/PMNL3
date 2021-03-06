import { Component } from '@angular/core';
import { TournamentService } from '../../providers/tournament-service';
import { NavController , LoadingController , AlertController} from 'ionic-angular';
import { Tournament } from '../tournament/tournament'


@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
  providers: [TournamentService]
})
export class RankingPage {

  tournaments: Array<Tournament>;

  constructor(public navCtrl: NavController, 
    public tournamentService: TournamentService, 
    public loadinCtrl: LoadingController,
    private alertCtrl: AlertController) {
    this.loadPlayers();
  }

  loadPlayers(){
    let loading = this.loadinCtrl.create({
      content: "Carregando"
    })

    loading.present();

    this.tournamentService.getAll()
    .subscribe(
      data => {
        this.tournaments = data;
        loading.dismiss();
      },
      error => {
        loading.dismiss();
        this.showError(error);
      });
  }

  reload(refresher){
    this.loadPlayers();
    refresher.complete();
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
