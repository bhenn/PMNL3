import { Component } from '@angular/core';
import { ViewController, reorderArray, ItemSliding, ToastController , LoadingController, AlertController, Loading, ModalController, NavParams, ActionSheetController} from 'ionic-angular';
import { Game } from './game';
import { GameResult } from './game-result';
import { Tournament } from '../tournament/tournament';
import { GameService } from '../../providers/game-service';
import { GamePreview } from './game-preview';


@Component({
    templateUrl: 'game-insert.html',
    providers: [GameService]
})

export class GameInsert{

    tournament: Tournament;
    game: Game;
    buyInnValue:number ;
    rebuyValue:number ;

    loading: Loading;

    players = [];
    playerRankingOriginal;

    pontuacao = [
    /*5*/ [11,7,4,2,1], 
    /*6*/ [14,9,6,4,2,1],
    /*7*/ [17,11,8,5,3,2,1],
    /*8*/ [19,13,9,6,4,3,2,1],
    /*9*/ [21,15,10,7,5,4,3,2,1],
    /*10*/[23,16,11,8,6,5,4,3,2,1],
    /*11*/[24,17,12,9,7,6,5,4,3,2,1],
    /*12*/[25,18,13,10,8,7,6,5,4,3,2,1]
    ]

    constructor(public viewCtrl: ViewController,
        public toastCtrl: ToastController, 
        public loadingCtrl: LoadingController, 
        public gameService: GameService,
        private alertCtrl: AlertController,
        private modalCtrl: ModalController,
        private actionSheetCtrl: ActionSheetController,
        params: NavParams) {

        this.game = new Game(new Array<GameResult>());
        this.tournament = params.get('tournament')


        // this.game.date = new Date();
        this.game.valueTotal = 0;
        this.game.rebuys = 0;
        this.buyInnValue = 30;
        this.rebuyValue = 15;

        this.game.tournamentId = this.tournament.id;
        this.players = this.tournament.tournamentPlayers;

        this.generatePreview();

    }  

    dismiss(){
        let alert = this.alertCtrl.create({
            title: 'Cancelar',
            message: 'Deseja realmente cancelar ?',
            buttons: [
            {
                text: 'Sim',
                role: 'cancel',
                handler: () =>{
                    this.viewCtrl.dismiss();      
                }
            },
            {
                text: 'Não'
            }
            ]
        });

        alert.present();
    }

    generatePreview(){
        this.game.buyinns = this.players.length;
        this.game.valueTotal = (this.game.buyinns * this.buyInnValue) + (this.game.rebuys * this.rebuyValue);


        let prizeTotal: number = this.game.valueTotal;
        let prizeFirst: number = 0;
        let prizeSecond: number = 0;
        let prizeThird: number = 0;
        let prizeTrophy: number = 0;

        prizeTrophy = this.buyInnValue;

        if (this.players.length > 8){

        }else{
            prizeThird = 0;
            prizeSecond = this.buyInnValue;
            prizeFirst = prizeTotal - (prizeThird + prizeSecond + prizeTrophy);
        }


        for (var i = 0; i < this.players.length; i++) {
            this.players[i].pointsPreview = this.getPoints(this.players.length, i);
            this.players[i].pointsFinal = this.players[i].pointsPreview + this.players[i].points;

            if (i+1 == 1){
                this.players[i].prize = prizeFirst;
            }else if(i+1 == 2){
                this.players[i].prize = prizeSecond;
            }else if(i+1 == 3){
                this.players[i].prize = prizeThird;
            }else{
                this.players[i].prize = 0;
            }

        };

        //_.sortBy(this.players, ['pointsFinal']);


    }

    getPoints(players, position){
        return this.pontuacao[players - 5][position];
    }

    reorderItem(indexes){
        this.players = reorderArray(this.players,indexes);
        this.generatePreview();
    }

    validateInsertGame(){
        let alertPassword = this.alertCtrl.create({
            title: "Senha",
            inputs: [{
                name: "Senha",
                placeholder: "senha",
                type: 'password'
            }],
            buttons: [{
                text: 'Cancelar',
                role: 'cancel',
                handler: data => {

                }
            },{
                text: 'Ok',
                handler: data => {
                    console.log(data.Senha == 'pmnl001');
                    if (data.Senha == 'pmnl001'){
                        this.insertGame(); 
                    }else{
                        this.showError('Senha incorreta'); 
                    }
                }
            }]
        })


        alertPassword.present();

    }


    insertGame(){
        if (this.validate()) {

            this.showLoading(true);

            for (var i = 0; i < this.players.length; i++) {

                let gameResult:GameResult = new GameResult();
                gameResult.tournamentPlayerId = this.players[i].id;
                gameResult.order = i+1;
                gameResult.rebuys = this.players[i].rebuys;

                this.game.gamesResults.push(gameResult);

            }

            // console.log(this.game);

            this.gameService.insertGame(this.game)
            .subscribe(
                data => {this.showLoading(false);this.viewCtrl.dismiss()},
                error => this.showError(error)
                );

        }
    }


    removeItem(index,slidingItem){
        if (this.players.length == 5){
            this.toast("O mínimo de jogadores é 5");
        }else{
            if (!isNaN(this.players[index].rebuys)){
                this.game.rebuys -= this.players[index].rebuys;  
            }

            this.players.splice(index, 1)  
        }
        this.generatePreview();
    }

    eliminate(player,fromIndex,slidingItem: ItemSliding){
        let lastEliminated = null;
        let indexTo = 0;

        if (player.eliminado)
        {
            indexTo = 0;
        }else{
            for (var i = this.players.length - 1; i >= 0; i--) {
                if (this.players[i].eliminado == true){
                    lastEliminated = i;
                }
            }

            if (lastEliminated != null){
                indexTo = lastEliminated - 1;
            }else{
                indexTo = this.players.length - 1;
            }  
        }

        var indexes = {
            from: fromIndex,
            to: indexTo
        }


        this.reorderItem(indexes);
        player.eliminado = !player.eliminado;

        slidingItem.close();

    }

    toast(message: string){
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }

    showError(error){
        let alert = this.alertCtrl.create({
            title: "Erro",
            subTitle: error,
            buttons: ['Dismiss']
        })

        alert.present();
    }

    showLoading(onOff: boolean){
        if (onOff) {
            this.loading = this.loadingCtrl.create({
                content: "Carregando"
            })
            this.loading.present();
        }else{
            this.loading.dismiss();
        }
    }

    validate(): boolean{
        if (this.game.description == "" || this.game.description == undefined){
            this.toast("Preencha a descrição")
            return false;
        }

        return true;
    }

    preview(){
        let previewModal = this.modalCtrl.create(GamePreview, {playersPreview: this.players});
        previewModal.present();
    }

    moreOptions(playerAlter, slidingItem: ItemSliding){

        let action = this.actionSheetCtrl.create({
            buttons:[
            {
                text: 'Rebuy',
                handler: () => {

                    if (isNaN(playerAlter.rebuys)){
                        playerAlter.rebuys = 0;  
                    }
                    playerAlter.rebuys ++ ;
                    this.game.rebuys ++;
                    this.generatePreview();
                }
            },
            {
                text: 'Cancela',
                role: 'cancel'
            }
            ]
        });

        action.present();
        slidingItem.close();
    }

}






