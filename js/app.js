
document.addEventListener("DOMContentLoaded", function () {

    let boxes = document.querySelector('.b1_1');
    let button = document.querySelector('#start');
    let button_undo = document.querySelector('#undo');

    let scoretext = document.querySelector('.score');
    let bx = [['', '', ''], ['', '', ''], ['', '', '']];
    let score = 0;
    let time = 200;

    class Tail {
        constructor(num, row, col) {

            this.number = num,
                this.row = row,
                this.col = col,
                this.div
        }

        create() {
            this.div = document.createElement('div');
            this.div.id = `r${this.row}-c${this.col}`
            this.div.classList.add(`t-${this.row}-${this.col}`);
            this.div.classList.add('tail');
            this.div.classList.add('num2');
            this.div.classList.add('new');
            this.div.innerText = this.number;
            boxes.appendChild(this.div);
        }

        relocate(nrow, ncol) {

            // this.div = document.querySelector(`#r${this.row}-c${this.col}`);
            // console.log(this.div);
            this.div.classList.remove(`t-${this.row}-${this.col}`);
            bx[nrow][ncol] = bx[this.row][this.col];
            bx[this.row][this.col] = '';
            this.row = nrow;
            this.col = ncol;
            this.div.classList.add(`t-${this.row}-${this.col}`);
            this.div.classList.remove(`joint`);
            this.div.classList.remove('new');
            this.div.id = `r${this.row}-c${this.col}`;
            return true;
        }

        join(nrow, ncol) {
            // console.log(this.row);
            // console.log(this.col);
            // this.div = document.querySelector(`#r${this.row}-c${this.col}`);
            // console.log(this.div);
            let el2 = document.querySelector(`#r${nrow}-c${ncol}`);
            this.div.classList.remove(`t-${this.row}-${this.col}`);

            bx[nrow][ncol] = bx[this.row][this.col];
            bx[this.row][this.col] = '';
            this.number *= 2;
            this.row = nrow;
            this.col = ncol;
            this.div.classList.add(`t-${this.row}-${this.col}`);
            this.div.classList.remove('joint');
            this.div.classList.remove('new');
            this.div.id = `r${this.row}-c${this.col}`;
            boxes.removeChild(el2);
            setTimeout(() => {
                this.div.classList.add('joint');
                this.div.classList.add(`num${this.number}`);
                this.div.classList.remove(`num${this.number/2}`);
                // this.div.innerText = bx[this.row][this.col].number;
                this.div.innerText = this.number;
                game.addscore(this.number);

            }, time);

            return true;
        }

    }


    // class Backup {
    //     constructor() {
    //         this.html,
    //         this.base = [['', '', ''], ['', '', ''], ['', '', '']],
    //         this.score
    //     }
    //
    //     store () {
    //         this.html = document.querySelector('.b1_1').innerHTML;
    //         bx.forEach((e1,i) => {
    //             e1.forEach( (e2,j) =>{
    //                 this.base[i][j] = e2;
    //             })
    //         })
    //
    //     }
    //
    //     undo() {
    //         let bo = document.querySelector('.b1_1');
    //         bo.innerHTML = this.html;
    //         this.base.forEach((e1,i) => {
    //             e1.forEach( (e2,j) =>{
    //                 bx[i][j] = e2;
    //             })
    //         })
    //     }
    // }

    class Game {
        constructor (base) {
            this.base = bx;
            this.score = document.querySelector('.score');
            this.end = true;
        }

        nextmove() {
            var higher = {};
            higher.number = 0;
            let next;
            this.end = true;
            for(let r=0; r < 2; r++){
                for(let c=0; c < 2; c++) {
                    if(this.base[r][c].number === this.base[r+1][c].number){
                        if(higher.number < this.base[r][c].number) {
                            higher = this.base[r][c];
                            next = this.base[r+1][c];
                            this.end = false;
                        }
                    }
                    if(this.base[r][c].number === this.base[r][c+1].number){
                        if(higher.number < this.base[r][c].number) {
                            higher = this.base[r][c];
                            next = this.base[r][c+1];
                            this.end = false;
                        }
                    }
                }
            }

            return {
                first: higher,
                second: next
            }
        }

        endgame(bs) {
            let newbase = [];
            this.base = bs;
            this.base.forEach(e => e.forEach( e => newbase.push(e)));
            if(newbase.indexOf('') === -1) {
                this.nextmove();
                if(this.end){
                    console.log('koniec gry panocku');
                }
            }

        }

        addscore(num) {
            this.score.innerText = parseInt(this.score.innerText) + num;
        }
    }

    let game = new Game(bx);

    const start = () => {
        let col, row;
        boxes.innerHTML = '';
        bx = [['', '', ''], ['', '', ''], ['', '', '']];
        col = Math.floor(Math.random() * 3);
        row = Math.floor(Math.random() * 3);
        score = 0;
        bx[row][col] = new Tail(2, row, col);
        bx[row][col].create();
        window.addEventListener('keydown',keypress);
        // bck1.store();
    }

    button.onclick = start;

    const newtail = () => {

        let col, row;
        col = Math.floor(Math.random() * 3);
        row = Math.floor(Math.random() * 3);
        if (bx[row][col] === '') {
            bx[row][col] = new Tail(2, row, col);
            bx[row][col].create();
            window.addEventListener('keydown',keypress);
            game.endgame(bx);
        } else {
            newtail();
        }
    }


    const down = () => {
        let moved = false;
        for (let i = 0; i<3;i++ ){
            let el1 = bx[1][i];
            let el2 = bx[2][i];
            let el0 = bx[0][i];

            if(el1 && el1.number===el2.number){
                moved = el1.join(2,i);
                if(el1.number === el0.number){
                    el0.relocate(1,i);
                }
            }
            else if(el1 && el2===''){
                moved = el1.relocate(2,i);

            }
        }
        for (let i=0; i<3; i++){
            let el0 = bx[0][i];
            let el1 = bx[1][i];
            let el2 = bx[2][i];

            if(el0 && el1==='' && el2===''){
                moved = el0.relocate(2,i)
            }
            else if(el0 && el0.number === el2.number && el1===''){


                moved = el0.join(2,i);}
            else if(el0 && el0.number === el1.number) {
                moved = el0.join(1,i)}
            else if(el0 && el1==='') {
                moved = el0.relocate(1,i)}
        }

        if (moved) {
            window.removeEventListener('keydown',keypress);

            setTimeout(newtail, time);
        }
    }

    const up = () => {
        let moved = false;

        for (let i = 0; i < 3; i++) {
            let el1 = bx[1][i];
            let el0 = bx[0][i];
            let el2 = bx[2][i];
            if (el1 && el1.number === el0.number) {

                moved = el1.join(0, i);
                if(el1.number === el0.number){
                    el2.relocate(1,i)}
            }
            else if (el1 && el0 === '') {
                moved = el1.relocate(0, i) }
        }
        for (let i = 0; i < 3; i++) {
            let el0 = bx[0][i];
            let el1 = bx[1][i];
            let el2 = bx[2][i];
            if (el2 && el1 === '' && el0 === '') {
                moved = el2.relocate(0, i) }
            else if (el2 && el2.number === el0.number && el1 === '') {
                moved = el2.join(0, i) }
            else if (el2 && el2.number === el1.number) {
                moved = el2.join(1, i) }
            else if (el2 && el1 === '') {
                moved = el2.relocate(1, i) }
        }



        if (moved) {
            window.removeEventListener('keydown',keypress);

            setTimeout(newtail, time);
        }
    }

    const right = () => {
        let moved = false;
        for (let i = 0; i<3;i++ ){
            let el0 = bx[i][0];
            let el1 = bx[i][1];
            let el2 = bx[i][2];

            if(el1 && el1.number===el2.number){

                moved = el1.join(i,2);
                if(el1.number === el0.number){
                    el0.relocate(i,1)}

            }
            else if(el1 && el2===''){
                moved = el1.relocate(i,2)}
        }
        for (let i=0; i<3; i++){
            let el0 = bx[i][0];
            let el1 = bx[i][1];
            let el2 = bx[i][2];
            if(el0 && el1==='' && el2===''){
                moved = el0.relocate(i,2)}
            else if(el0 && el0.number === el2.number && el1===''){
                moved = el0.join(i,2)}
            else if(el0 && el0.number === el1.number) {
                moved = el0.join(i,1)}
            else if(el0 && el1==='') {
                moved = el0.relocate(i,1)}
        }

        if (moved) {
            window.removeEventListener('keydown',keypress);

            setTimeout(newtail, time);
        }
    }

    const left = () => {
        let moved = false;

        for (let i = 0; i < 3; i++) {
            let el1 = bx[i][1];
            let el0 = bx[i][0];
            let el2 = bx[i][2];
            if (el1 && el1.number === el0.number) {

                moved = el1.join(i, 0);
                if(el1.number === el0.number){
                    el2.relocate(i,1)}
            }
            else if (el1 && el0 === '') {
                moved = el1.relocate(i, 0) }
        }
        for (let i = 0; i < 3; i++) {
            let el0 = bx[i][0];
            let el1 = bx[i][1];
            let el2 = bx[i][2];

            if (el2 && el1 === '' && el0 === '') {
                moved = el2.relocate(i, 0) }
            else if (el2 && el2.number === el0.number && el1 === '') {
                moved = el2.join(i, 0) }
            else if (el2 && el2.number === el1.number) {
                moved = el2.join(i, 1) }
            else if (el2 && el1 === '') {
                moved = el2.relocate(i, 1) }
        }



        if (moved) {
            window.removeEventListener('keydown',keypress);
            setTimeout(newtail, time);
        }
    }

    // const restart = () => {
    //     let result = 0;
    //     result = Math.floor(Math.random() * 9);
    //     boxes[result].innerHTML = 2;
    //     b1[result] = 2;
    //     boxes.forEach((e , i) => {
    //         if (i !== result) {
    //             boxes[i].innerHTML = '';
    //             b1[i] = '';
    //             changeBkgColor(i);
    //         }
    //     });
    //     score = 0;
    //     changeBkgColor(result);
    //     addScore();
    // }
    //
    // button.addEventListener('click', () => {
    //     restart();
    //     this.innerHTML = 'Restart';
    // });
    //
    // const addScore = () => { scoretext.innerHTML = score; }
    //
    // const generateNew = () => {
    //     let result;
    //
    //     for(let i=0; i < 18; i++) {
    //         result = Math.floor(Math.random() * 9);
    //         if (b1[result] === "") {
    //             i = 18;
    //             b1[result] = 2;
    //             boxes[result].innerHTML = 2;
    //             changeBkgColor(result);
    //         }
    //     }
    //
    //     addScore();
    //
    // }
    //
    // const changeBkgColor = i => {
    //     if (b1[i] < 10) {
    //         boxes[i].style.backgroundColor = '#' + b1[i] + '0'+b1[i]+'F00';
    //         boxes[i].style.color = 'aqua';
    //     } else if (b1[i] < 99 && b1[i] > 10) {
    //         boxes[i].style.backgroundColor = '#' + b1[i] + 'FF' + b1[i];
    //         boxes[i].style.color = '#3C3F41';
    //     } else if (b1[i] < 999 && b1[i] > 100) {
    //         boxes[i].style.backgroundColor = '#' + b1[i]  + b1[i];
    //         boxes[i].style.color = 'aqua';
    //     } else if (b1[i] === '') {
    //         boxes[i].style.backgroundColor = '#00FFFF';
    //     }
    // }
    //
    // const movedown = () => {
    //     let moved = false;
    //
    //     for (let i = 3; i < 6; i++) {
    //
    //         if (b1[i + 3] === ''  && b1[i] !== '') {
    //             b1[i + 3] = b1[i];
    //             b1[i] = '';
    //             boxes[i + 3].innerHTML = b1[i + 3];
    //             boxes[i].innerHTML = '';
    //             moved = true;
    //             changeBkgColor(i+3);
    //             changeBkgColor(i);
    //         } else if (b1[i] === b1[i+3] && b1[i] !== '') {
    //             b1[i+3] = Number(b1[i+3]) * 2;
    //             b1[i] = '';
    //             boxes[i+3].innerHTML = b1[i+3];
    //             boxes[i].innerHTML = b1[i];
    //             moved =true;
    //             score += b1[i+3];
    //             changeBkgColor(i+3);
    //             changeBkgColor(i);
    //         }
    //     }
    //
    //     for (let i = 0; i < 3; i++) {
    //
    //
    //         if (b1[i + 3] === '' && b1[i + 6] === '' && b1[i] !== '') {
    //             b1[i + 6] = b1[i];
    //             b1[i] = '';
    //             boxes[i + 6].innerHTML = b1[i + 6];
    //             boxes[i].innerHTML = b1[i];
    //             moved = true;
    //             changeBkgColor(i+6);
    //             changeBkgColor(i);
    //         } else if (b1[i + 3] === '' && b1[i + 6] === b1[i] && b1[i] !== '') {
    //             b1[i+6] = Number(b1[i+6]) * 2;
    //             b1[i] = '';
    //             boxes[i+6].innerHTML = b1[i+6];
    //             boxes[i].innerHTML = b1[i];
    //             score += b1[i+6];
    //             moved = true;
    //             changeBkgColor(i+6);
    //             changeBkgColor(i);
    //         } else if (b1[i+3] === '' && b1[i] !== '') {
    //             b1[i+3] = b1[i];
    //             b1[i] = '';
    //             boxes[i+3].innerHTML = b1[i+3];
    //             boxes[i].innerHTML = b1[i];
    //             moved = true;
    //             changeBkgColor(i+3);
    //             changeBkgColor(i);
    //         } else if (b1[i+3] === b1[i] && b1[i] !== '') {
    //             b1[i+3] = Number(b1[i+3]) * 2;
    //             b1[i] = '';
    //             boxes[i+3].innerHTML = b1[i+3];
    //             boxes[i].innerHTML = b1[i];
    //             moved = true;
    //             score += b1[i+3];
    //             changeBkgColor(i+3);
    //             changeBkgColor(i);
    //         }
    //     }
    //
    //     if (moved) {
    //         generateNew();
    //     }
    //
    // }
    //
    // const moveup = () => {
    //     let moved = false;
    //
    //     for(let i = 3; i < 6; i++) {
    //
    //         if(b1[i-3] === ''  && b1[i] !== ''){
    //             b1[i-3] = b1[i];
    //             b1[i] = '';
    //             boxes[i-3].innerHTML = b1[i-3];
    //             boxes[i].innerHTML = '';
    //             moved = true;
    //             changeBkgColor(i-3);
    //             changeBkgColor(i);
    //         } else if (b1[i] === b1[i-3] && b1[i] !== '') {
    //             b1[i-3] = Number(b1[i-3]) * 2;
    //             b1[i] = '';
    //             boxes[i-3].innerHTML = b1[i-3];
    //             boxes[i].innerHTML = b1[i];
    //             moved =true;
    //             score += b1[i-3];
    //             changeBkgColor(i-3);
    //             changeBkgColor(i);
    //         }
    //     }
    //
    //     for(let i = 6; i < 9; i++) {
    //
    //         if (b1[i - 3] === '' && b1[i - 6] === ''  && b1[i] !== '') {
    //             b1[i - 6] = b1[i];
    //             b1[i] = '';
    //             boxes[i - 6].innerHTML = b1[i - 6];
    //             boxes[i].innerHTML = b1[i];
    //             moved = true;
    //             changeBkgColor(i-6);
    //             changeBkgColor(i);
    //         } else if (b1[i - 3] === '' && b1[i - 6] === b1[i] && b1[i] !== '') {
    //             b1[i-6] = Number(b1[i-6]) * 2;
    //             b1[i] = '';
    //             boxes[i-6].innerHTML = b1[i-6];
    //             boxes[i].innerHTML = b1[i];
    //             score += b1[i-6];
    //             moved = true;
    //             changeBkgColor(i-6);
    //             changeBkgColor(i);
    //         } else if (b1[i-3] === '' && b1[i] !== '') {
    //             b1[i-3] = b1[i];
    //             b1[i] = '';
    //             boxes[i-3].innerHTML = b1[i-3];
    //             boxes[i].innerHTML = b1[i];
    //             moved = true;
    //             changeBkgColor(i-3);
    //             changeBkgColor(i);
    //         } else if (b1[i-3] === b1[i] && b1[i] !== '') {
    //             b1[i-3] = Number(b1[i-3]) * 2;
    //             b1[i] = '';
    //             boxes[i-3].innerHTML = b1[i-3];
    //             boxes[i].innerHTML = b1[i];
    //             moved = true;
    //             score += b1[i-3];
    //             changeBkgColor(i-3);
    //             changeBkgColor(i);
    //         }
    //     }
    //
    //
    //     if (moved) {
    //         generateNew();
    //     }
    // }
    //
    // const moveright = () => {
    //     let moved = false;
    //
    //     for(let i=1; i < 8; i += 3) {
    //         if (b1[i + 1] === '' && b1[i] !== '') {
    //             b1[i + 1] = b1[i];
    //             b1[i] = '';
    //             boxes[i + 1].innerHTML = b1[i + 1];
    //             boxes[i].innerHTML = '';
    //             moved = true;
    //             changeBkgColor(i+1);
    //             changeBkgColor(i);
    //
    //         }  else if (b1[i] === b1[i+1] && b1[i] !== '') {
    //             b1[i+1] = Number(b1[i+1]) * 2;
    //             b1[i] = '';
    //             boxes[i+1].innerHTML = b1[i+1];
    //             boxes[i].innerHTML = b1[i];
    //             moved =true;
    //             score += b1[i+1];
    //             changeBkgColor(i+1);
    //             changeBkgColor(i);
    //         }
    //     }
    //
    //     for(let i=0; i < 7; i += 3) {
    //         if (b1[i + 1] === '' && b1[i + 2] === ''  && b1[i] !== '') {
    //             b1[i + 2] = b1[i];
    //             b1[i] = '';
    //             boxes[i + 2].innerHTML = b1[i + 2];
    //             boxes[i].innerHTML = '';
    //             moved = true;
    //             changeBkgColor(i+2);
    //             changeBkgColor(i);
    //         } else if (b1[i +1] === '' && b1[i +2] === b1[i] && b1[i] !== '') {
    //             b1[i+2] = Number(b1[i+2]) * 2;
    //             b1[i] = '';
    //             boxes[i+2].innerHTML = b1[i+2];
    //             boxes[i].innerHTML = b1[i];
    //             moved = true;
    //             score += b1[i+2];
    //             changeBkgColor(i+2);
    //             changeBkgColor(i);
    //         } else if (b1[i+1] === '' && b1[i] !== '') {
    //             b1[i+1] = b1[i];
    //             b1[i] = '';
    //             boxes[i+1].innerHTML = b1[i+1];
    //             boxes[i].innerHTML = b1[i];
    //             moved = true;
    //             changeBkgColor(i+1);
    //             changeBkgColor(i);
    //         } else if (b1[i+1] === b1[i] && b1[i] !== '') {
    //             b1[i+1] = Number(b1[i+1]) * 2;
    //             b1[i] = '';
    //             boxes[i+1].innerHTML = b1[i+1];
    //             boxes[i].innerHTML = b1[i];
    //             moved = true;
    //             score += b1[i+1];
    //             changeBkgColor(i+1);
    //             changeBkgColor(i);
    //         }
    //     }
    //     if (moved) {
    //         generateNew();
    //     }
    //
    // }
    //
    // const moveleft = () => {
    //
    //     let moved = false;
    //
    //     for(let i=7; i > 0; i -= 3) {
    //         if (b1[i - 1] === '' && b1[i] !== '') {
    //             b1[i - 1] = b1[i];
    //             b1[i] = '';
    //             boxes[i - 1].innerHTML = b1[i - 1];
    //             boxes[i].innerHTML = '';
    //             moved = true;
    //             changeBkgColor(i-1);
    //             changeBkgColor(i);
    //         } else if (b1[i] === b1[i-1] && b1[i] !== '') {
    //             b1[i-1] = Number(b1[i-1]) * 2;
    //             b1[i] = '';
    //             boxes[i-1].innerHTML = b1[i-1];
    //             boxes[i].innerHTML = b1[i];
    //             moved =true;
    //             score += b1[i-1];
    //             changeBkgColor(i-1);
    //             changeBkgColor(i);
    //         }
    //     }
    //
    //     for(let i=8; i > 1; i -= 3) {
    //         if (b1[i - 1] === '' && b1[i - 2] === ''  && b1[i] !== '') {
    //             b1[i - 2] = b1[i];
    //             b1[i] = '';
    //             boxes[i - 2].innerHTML = b1[i - 2];
    //             boxes[i].innerHTML = '';
    //             moved = true;
    //             changeBkgColor(i-2);
    //             changeBkgColor(i);
    //         } else if (b1[i -1] === '' && b1[i -2] === b1[i] && b1[i] !== '') {
    //             b1[i-2] = Number(b1[i-2]) * 2;
    //             b1[i] = '';
    //             boxes[i-2].innerHTML = b1[i-2];
    //             boxes[i].innerHTML = b1[i];
    //             moved = true;
    //             score += b1[i-2];
    //             changeBkgColor(i-2);
    //             changeBkgColor(i);
    //         } else if (b1[i-1] === '' && b1[i] !== '') {
    //             b1[i-1] = b1[i];
    //             b1[i] = '';
    //             boxes[i-1].innerHTML = b1[i-1];
    //             boxes[i].innerHTML = b1[i];
    //             moved = true;
    //             changeBkgColor(i-1);
    //             changeBkgColor(i);
    //         } else if (b1[i-1] === b1[i] && b1[i] !== '') {
    //             b1[i-1] = Number(b1[i-1]) * 2;
    //             b1[i] = '';
    //             boxes[i-1].innerHTML = b1[i-1];
    //             boxes[i].innerHTML = b1[i];
    //             moved = true;
    //             score += b1[i-1];
    //             changeBkgColor(i-1);
    //             changeBkgColor(i);
    //         }
    //     }
    //     if (moved) {
    //         generateNew();
    //     }
    // }
    //
    //
    //
    //
    const moveit = key => {
        if (key === 83 || key === 40) {  //down
            down();

        } else if (key === 87 || key === 38) { //up
            up();

        } else if (key === 68 || key === 39) { //right
            right();

        } else if (key === 65 || key === 37) { //left
            left();

        }
    }

    let keypress = e => {

        moveit(e.keyCode);

    }



    // var pointx, pointy, pointsx, pointsy;

    // window.addEventListener('touchstart', e => {

    //     var touchobj = e.changedTouches[0];

    //     pointx = touchobj.pageX;
    //     pointy = touchobj.pageY;


    // }, false);

    window.addEventListener('touchmove', ev => {
        if (window) {
            ev.preventDefault();
            ev.stopImmediatePropagation();
        }

    }, { passive: false });


    // window.addEventListener('touchend', e => {
    //     var touchobj = e.changedTouches[0];

    //     pointsx = touchobj.pageX;
    //     pointsy = touchobj.pageY;
    //     var axlex = pointsx - pointx;
    //     var axley = pointsy - pointy;

    //     if (Math.abs(axlex) + Math.abs(axley) > 50) {

    //         if (((axlex >= 0) && (axley > 0) && (axley > axlex)) || ((axlex <= 0) && (axley > 0) && (axley > -axlex))) {
    //             movedown();
    //         } else if (((axlex >= 0) && (axley < 0) && (-axley > axlex)) || ((axlex <= 0) && (axley < 0) && (axley < axlex))) {
    //             moveup();
    //         } else if (((axlex > 0) && (axley >= 0) && (axlex > axley)) || ((axlex > 0) && (axley <= 0) && (-axley < axlex))) {
    //             moveright();
    //         } else { moveleft(); }
    //     }

    // }, false)

});
