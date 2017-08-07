import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Game } from './../pages/games/game';
import { Observable } from 'rxjs';
import { api_config } from './../app/globals';
import 'rxjs/add/operator/map';

  @Injectable()
  export class GameService {

    url = api_config.url + "/games";    


  	constructor(public http: Http) {
  		this.http = http;
  	}


    getAll(): Observable<Game[]> {
      return this.http
                 .get(this.url)
                 .map(res => res.json())
                 .catch(this.handleError);

    }


    insertGame(game: Game): Observable<Game[]>{

      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});


      return this.http
                  .post(this.url, game, options)
                  .map(res => console.log(res))
                  .catch(this.handleError);

    }

    private handleError(error){
      return Observable.throw(error.status + " - " + error.statusText);
    }


  }


