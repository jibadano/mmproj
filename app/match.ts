import { Field }        from './field';
import { User }        from './user';

export var MatchStatus = {PRIVATE:'private',PUBLIC:'public', DRAFT:'draft'};

export class Match {
	name: string;
	desc: string;
	status: string = MatchStatus.PRIVATE;
	players: {_user: User, alter: boolean, admin:boolean, confirm:boolean }[] = [];
	_field: Field = new Field();
	date: Date = new Date();
	log: [{type: string, event: string}];
	admins: User[] = [];
}
