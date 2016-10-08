import { User }        from './user';

export class Field {
	name: string;
	desc: string;
	address: string;
	size: number;
	rating: number;
	phoneNumber: string;
	location:{lat: number, lng: number};
	_owner: User;
	reviews: [{_user: User, comment: string}];
}
