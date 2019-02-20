
document.addEventListener("DOMContentLoaded", function () {

	let boxes = document.querySelector('.b1_1');
	let button = document.querySelector('#start');
	let scoretext = document.querySelector('.score');
	let b1 = ['','','','','','','','',''];
	let bx = [['', '',''], ['', '',''], ['', '','']];
	let score = 0;

	class Tail {
		constructor (num, row, col) {

			this.number = num,
				this.row = row,
				this.col = col
		}

		create() {
			const tl = document.createElement('div');
			tl.classList.add(`t-${ this.row }-${this.col}`);
			tl.classList.add('tail');
			tl.innerText = this.number;
			boxes.appendChild(tl);
		}

	}


	const start = () => {
		let col, row;
		boxes.innerHTML = '';
		bx = [['', '',''], ['', '',''], ['', '','']];
		col = Math.floor(Math.random() * 3);
		row = Math.floor(Math.random() * 3);
		score = 0;
		bx[row][col] = new Tail(2,row,col);
		bx[row][col].create();
		console.log(bx[row][col]);
	}

	button.onclick = start;

	const newtail = () => {
		let col, row;
		col = Math.floor(Math.random() * 3);
		row = Math.floor(Math.random() * 3);
		if (bx[row][col] === '') {
			bx[row][col] = new Tail(2, row, col);
			bx[row][col].create();
		} else {
			newtail();
		}
	}
	const killtail = (row,col) => {
		let die = document.querySelector(`.t-${row}-${col}`);
		boxes.removeChild(die);

	}

	const down = () => {
		for (let r = 1; r >= 0; r--) {
			for(let c = 0; c < 3; c++){

				if (bx[0][c] !== '' && bx[1][c]==='' && bx[2][c]==='') {
					let cl = `.t-0-${c}`;
					let el = document.querySelector(cl);
					el.classList.add(`t-2-${c}`);
					el.classList.remove(`t-0-${c}`);
					el.classList.remove('joint');
					bx[2][c] = bx[0][c];
					bx[0][c] = '';
				} else if (bx[r][c] !== '' && bx[r+1][c]==='')  {
					let cl = `.t-${r}-${c}`;
					let el = document.querySelector(cl);
					el.classList.add(`t-${r+1}-${c}`);
					el.classList.remove(`t-${r}-${c}`);
					el.classList.remove('joint');
					bx[r+1][c] = bx[r][c];
					bx[r][c] = '';
				} else if (bx[0][c] !=='' && bx[1][c] ==='' && bx[2][c].number === bx[0][c].number) {
					let cl1 = `.t-0-${c}`;
					let cl2 = `.t-2-${c}`;
					let el1 = document.querySelector(cl1);
					let el2 = document.querySelector(cl2);
					el1.classList.add(`t-2-${c}`);
					el1.classList.remove('joint');
					el1.classList.remove(`t-0-${c}`);
					bx[2][c] = bx[0][c];
					bx[0][c] = '';
					console.log(bx[2][c].number);
					bx[2][c].number *= 2;
					setTimeout(() => {
						el1.classList.add('joint');
						el1.innerText = bx[2][c].number;
						boxes.removeChild(el2);
					},250);
				} else if (bx[r][c] !=='' && bx[r+1][c].number === bx[r][c].number) {
					let cl1 = `.t-${r}-${c}`;
					let cl2 = `.t-${r+1}-${c}`;
					let el1 = document.querySelector(cl1);
					let el2 = document.querySelector(cl2);
					el1.classList.add(`t-${r+1}-${c}`);
					el1.classList.remove('joint');
					el1.classList.remove(`t-${r}-${c}`);
					bx[r+1][c] = bx[r][c];
					bx[r][c] = '';
					console.log(bx[r+1][c].number);
					bx[r+1][c].number *= 2;
					setTimeout(() => {
						el1.classList.add('joint');
						el1.innerText = bx[r+1][c].number;
						boxes.removeChild(el2);
					},250);
				}
			}
		}
		setTimeout(newtail,300);