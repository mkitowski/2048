class tail {
	constructor (number, pos) {

		this.position = pos,
		this.number = number
	}
}

let basetails = [];

for (let i = 1; i < 9; i++) {
	basetails.push(new tail('', i));
}
console.log(basetails);

