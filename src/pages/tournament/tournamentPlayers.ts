import { Player } from '../ranking/player';
import { Tournament } from './tournament';

export class TournamentPlayers {

	constructor(){}

	id: number;
	tournamentId: number;
	playerId: number;
	wins: number;
	points: number;

	player: Player;
	tournament: Tournament;

}