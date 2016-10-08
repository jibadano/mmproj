const DEFAULT_SIZE:number = 5;

export class Pagination {
		page:number = 0;
		size:number = DEFAULT_SIZE;
		next(){++this.page};
		previous(){if(this.page!=0) --this.page};
		rewind(){this.page=0};
}
