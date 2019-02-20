
document.addEventListener("DOMContentLoaded", function () {

    let boxes = document.querySelector('.b1_1');
    let button = document.querySelector('#start');
    let scoretext = document.querySelector('.score');
    let bx = [['', '', ''], ['', '', ''], ['', '', '']];
    let score = 0;
    let time = 300;

    class Tail {
        constructor(num, row, col) {

            this.number = num,
                this.row = row,
                this.col = col
        }

        create() {
            const tl = document.createElement('div');
            tl.classList.add(`t-${this.row}-${this.col}`);
            tl.classList.add('tail');
            tl.innerText = this.number;
            boxes.appendChild(tl);
        }

        relocate(nrow, ncol) {
            let el = document.querySelector(`.t-${this.row}-${this.col}`);
            el.classList.remove(`t-${this.row}-${this.col}`);
            bx[nrow][ncol] = bx[this.row][this.col];
            bx[this.row][this.col] = '';
            this.row = nrow;
            this.col = ncol;
            el.classList.add(`t-${this.row}-${this.col}`);
            el.classList.remove(`joint`);
            return true;
        }

        join(nrow, ncol) {

            let el1 = document.querySelector(`.t-${this.row}-${this.col}`);
            let el2 = document.querySelector(`.t-${nrow}-${ncol}`);
            el1.classList.remove(`t-${this.row}-${this.col}`);
            bx[nrow][ncol] = bx[this.row][this.col];
            bx[this.row][this.col] = '';
            this.number *= 2;
            this.row = nrow;
            this.col = ncol;
            el1.classList.add(`t-${this.row}-${this.col}`);
            el1.classList.remove(`joint`);
            setTimeout(() => {
                el1.classList.add('joint');
                el1.innerText = bx[this.row][this.col].number;
                boxes.removeChild(el2);
            }, time);
            return true;
        }

    }


    const start = () => {
        let col, row;
        boxes.innerHTML = '';
        bx = [['', '', ''], ['', '', ''], ['', '', '']];
        col = Math.floor(Math.random() * 3);
        row = Math.floor(Math.random() * 3);
        score = 0;
        bx[row][col] = new Tail(2, row, col);
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
    const killtail = (row, col) => {
        let die = document.querySelector(`.t-${row}-${col}`);
        boxes.removeChild(die);

    }

    const down = () => {
        let moved = false;
        for (let i = 0; i<3;i++ ){
            let el1 = bx[1][i];
            let el2 = bx[2][i];

            if(el1 && el1.number===el2.number){ moved = el1.join(2,i)}
            else if(el1 && el2===''){ moved = el1.relocate(2,i)}
        }
        for (let i=0; i<3; i++){
            let el0 = bx[0][i];
            let el1 = bx[1][i];
            let el2 = bx[2][i];
            if(el0 && el1==='' && el2===''){ moved = el0.relocate(2,i)}
            else if(el0 && el0.number === el2.number && el1===''){ moved = el0.join(2,i)}
            else if(el0 && el0.number === el1.number) { moved = el0.join(1,i)}
            else if(el0 && el1==='') {moved = el0.relocate(1,i)}
        }

        if (moved) {
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
                if(el2.number === el0.number){el2.relocate(1,i)}
            }
            else if (el1 && el0 === '') { moved = el1.relocate(0, i) }
        }
        for (let i = 0; i < 3; i++) {
            let el0 = bx[0][i];
            let el1 = bx[1][i];
            let el2 = bx[2][i];
            if (el2 && el1 === '' && el0 === '') { moved = el2.relocate(0, i) }
            else if (el2 && el2.number === el0.number && el1 === '') { moved = el2.join(0, i) }
            else if (el2 && el2.number === el1.number) { moved = el2.join(1, i) }
            else if (el2 && el1 === '') { moved = el2.relocate(1, i) }
        }



        if (moved) {
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
            // moveright();

        } else if (key === 65 || key === 37) { //left
            // moveleft();

        }
    }

    window.addEventListener('keydown', e => moveit(e.keyCode));

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
