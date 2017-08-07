import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Tournament } from './../pages/tournament/tournament';
import { Observable } from 'rxjs';
import { api_config } from './../app/globals';
import 'rxjs/add/operator/map';

  @Injectable()
  export class TournamentService {

    url = api_config.url + "/tournaments";

  	constructor(public http: Http) {
  		this.http = http;
  	}

    getAll(): Observable<Tournament[]> {
      return this.http
                 .get(this.url)
                 .map(res => res.json())
                 .catch(this.handleError);
    }


    private handleError(error){
      return Observable.throw(error.status + " - " + error.statusText);
    }


  }


