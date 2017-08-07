import { Component , Pipe, PipeTransform} from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import _ from 'lodash';


@Pipe({name: 'orderBy'})
export class OrderByPipe implements PipeTransform{
    transform(array){
        return _.orderBy(array,'pointsFinal','desc');
    }
}

@Component({
    templateUrl: 'game-preview.html'
})

export class GamePreview{

    players;

    constructor(public viewCtrl: ViewController, params: NavParams){
        this.players = params.get('playersPreview');
    }

    close(){
        this.viewCtrl.dismiss();
    }

}
