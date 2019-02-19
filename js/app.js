
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
            tl.classList.add(`t-${ this.col }-${this.row}`);
            tl.classList.add('tail');
            tl.innerText = this.number;
            boxes.appendChild(tl);
        }

    }


    const start = () => {
        let col, row;
        col = Math.floor(Math.random() * 3) + 1;
        row = Math.floor(Math.random() * 3) + 1;
        score = 0;
        bx[row-1][col-1] = new Tail(2,row,col);
        bx[row - 1][col - 1].create();
        console.log(bx[row - 1][col - 1]);
    }

    button.onclick = start;

    const newtail = () => {
        let col, row;
        col = Math.floor(Math.random() * 3) + 1;
        row = Math.floor(Math.random() * 3) + 1;
        if (bx[row-1][col-1] === '') {
            bx[row - 1][col - 1] = new Tail(2, row, col);
            bx[row - 1][col - 1].create();
        } else {
            newtail();
        }
    }
    const killtail = (col,row) => {
        let die = document.querySelector(`.t-${col}-${row}`);
        boxes.removeChild(die);

    }

    const down = () => {
       for (let i = 1; i >= 0; i--) {
           for(let j = 0; j < 2; j++){
               if(bx[i][j] !== '' && bx[i+1][j]===''){

                   let current = document.querySelector(`.t-${i}-${j}`);
                    console.log(`${current} + ${i} + ${j} + ${bx[i][j]}`);
                //    current.classList.add(`.t-${i+1}-${j}`);
                //    current.classList.remove(`.t-${i}-${j}`);
               }
           }
       }
        newtail();
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
            // moveup();

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
