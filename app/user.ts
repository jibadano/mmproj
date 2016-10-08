export class User {
	_id: number;
	email: string;
	password: string;
	firstname: string;
	lastname: string;
	groups:[{name: string, friends: User[]}];
	age: number;
	position: string;
	about: string;
}
