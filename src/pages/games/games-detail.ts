import { Component,  } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
	templateUrl: 'games-detail.html'
})

export class GamesDetail{
	item;

	constructor(params: NavParams){
		this.item = params.data.item;
	}

}