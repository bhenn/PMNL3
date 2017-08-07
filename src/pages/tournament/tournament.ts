import { Game } from '../games/game';
import { TournamentPlayers } from './tournamentPlayers';

export class Tournament {
	constructor(){

	}

	id: number;
	description:string;

	games: Array<Game>;
	tournamentPlayers: Array<TournamentPlayers>;

}