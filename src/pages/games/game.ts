import { GameResult } from './game-result';
import { Tournament } from '../tournament/tournament';

export class Game{
	date: Date;
	description: string;
	buyinns: number;
	rebuys: number;
	valueTotal: number;
	doublePoints: boolean

	tournamentId: number;
	tournament: Tournament;

	constructor(public gamesResults: GameResult[]){
	}
}