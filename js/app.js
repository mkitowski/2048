document.addEventListener("DOMContentLoaded", function () {

    var boxes = document.querySelectorAll('.box');
    var button = document.querySelector('button');
    var b1 = ['','','','','','','','',''];
    var free = 8;


    function restart() {
        var result = 0;
        result = Math.floor(Math.random() * 9);
        boxes[result].innerHTML = 2;
        b1[result] = 2;
        boxes.forEach(function (e , i) {
            if (i !== result) {
                boxes[i].innerHTML = '';
                b1[i] = '';
            }
        });
        free = 8;
    }

    button.addEventListener('click', function () {
        restart();
        this.innerHTML = 'Restart';
    });

    function generateNew() {
        var result;

        for(i=0; i < 9; i++) {
            result = Math.floor(Math.random() * 9);
            if (b1[result] === "") {
                i = 9;
                b1[result] = 2;
                boxes[result].innerHTML = 2;
                free -= 1;
            }
        }

    }

    function movedown() {
        var moved = false;

        for (i = 3; i < 6; i++) {
            console.log(i+' '+b1[i]);
            if (b1[i + 3] === ''  && b1[i] !== '') {
                b1[i + 3] = b1[i];
                b1[i] = '';
                boxes[i + 3].innerHTML = b1[i + 3];
                boxes[i].innerHTML = '';
                moved = true;
            } else if (b1[i] === b1[i+3] && b1[i] !== '') {
                b1[i+3] = Number(b1[i+3]) * 2;
                b1[i] = '';
                boxes[i+3].innerHTML = b1[i+3];
                boxes[i].innerHTML = b1[i];
                moved =true;
            }
        }

        for (i = 0; i < 3; i++) {
            console.log(i+' '+b1[i]);

            if (b1[i + 3] === '' && b1[i + 6] === '' && b1[i] !== '') {
                b1[i + 6] = b1[i];
                b1[i] = '';
                boxes[i + 6].innerHTML = b1[i + 6];
                boxes[i].innerHTML = b1[i];
                moved = true;
            } else if (b1[i + 3] === '' && b1[i + 6] === b1[i] && b1[i] !== '') {
                b1[i+6] = Number(b1[i+6]) * 2;
                b1[i] = '';
                boxes[i+6].innerHTML = b1[i+6];
                boxes[i].innerHTML = b1[i];
                moved = true;
            } else if (b1[i+3] === '' && b1[i] !== '') {
                b1[i+3] = b1[i];
                b1[i] = '';
                boxes[i+3].innerHTML = b1[i+3];
                boxes[i].innerHTML = b1[i];
                moved = true;
            } else if (b1[i+3] === b1[i] && b1[i] !== '') {
                b1[i+3] = Number(b1[i+3]) * 2;
                b1[i] = '';
                boxes[i+3].innerHTML = b1[i+3];
                boxes[i].innerHTML = b1[i];
                moved = true;
            }
        }

        if (moved) {
            generateNew();
        }

    }

    function moveup() {
        var moved = false;

        for(i = 3; i < 6; i++) {
            console.log(i+' '+b1[i]);
            if(b1[i-3] === ''  && b1[i] !== ''){
                b1[i-3] = b1[i];
                b1[i] = '';
                boxes[i-3].innerHTML = b1[i-3];
                boxes[i].innerHTML = '';
                moved = true;
            } else if (b1[i] === b1[i-3] && b1[i] !== '') {
                b1[i-3] = Number(b1[i-3]) * 2;
                b1[i] = '';
                boxes[i-3].innerHTML = b1[i-3];
                boxes[i].innerHTML = b1[i];
                moved =true;
            }
        }

        for(i = 6; i < 9; i++) {
            console.log(i+' '+b1[i]);
            if (b1[i - 3] === '' && b1[i - 6] === ''  && b1[i] !== '') {
                b1[i - 6] = b1[i];
                b1[i] = '';
                boxes[i - 6].innerHTML = b1[i - 6];
                boxes[i].innerHTML = b1[i];
                moved = true;
            } else if (b1[i - 3] === '' && b1[i - 6] === b1[i] && b1[i] !== '') {
                b1[i-6] = Number(b1[i-6]) * 2;
                b1[i] = '';
                boxes[i-6].innerHTML = b1[i-6];
                boxes[i].innerHTML = b1[i];
                moved = true;
            } else if (b1[i-3] === '' && b1[i] !== '') {
                b1[i-3] = b1[i];
                b1[i] = '';
                boxes[i-3].innerHTML = b1[i-3];
                boxes[i].innerHTML = b1[i];
                moved = true;
            } else if (b1[i-3] === b1[i] && b1[i] !== '') {
                b1[i-3] = Number(b1[i-3]) * 2;
                b1[i] = '';
                boxes[i-3].innerHTML = b1[i-3];
                boxes[i].innerHTML = b1[i];
                moved = true;
            }
        }


        if (moved) {
            generateNew();
        }
    }

    function moveright() {
        var moved = false;

        for(i=1; i < 8; i += 3) {
            if (b1[i + 1] === '' && b1[i] !== '') {
                b1[i + 1] = b1[i];
                b1[i] = '';
                boxes[i + 1].innerHTML = b1[i + 1];
                boxes[i].innerHTML = '';
                moved = true;
            }  else if (b1[i] === b1[i+1] && b1[i] !== '') {
                b1[i+1] = Number(b1[i+1]) * 2;
                b1[i] = '';
                boxes[i+1].innerHTML = b1[i+1];
                boxes[i].innerHTML = b1[i];
                moved =true;
            }
        }

        for(i=0; i < 7; i += 3) {
            if (b1[i + 1] === '' && b1[i + 2] === ''  && b1[i] !== '') {
                b1[i + 2] = b1[i];
                b1[i] = '';
                boxes[i + 2].innerHTML = b1[i + 2];
                boxes[i].innerHTML = '';
                moved = true;
            } else if (b1[i +1] === '' && b1[i +2] === b1[i] && b1[i] !== '') {
                b1[i+2] = Number(b1[i+2]) * 2;
                b1[i] = '';
                boxes[i+2].innerHTML = b1[i+2];
                boxes[i].innerHTML = b1[i];
                moved = true;
            } else if (b1[i+1] === '' && b1[i] !== '') {
                b1[i+1] = b1[i];
                b1[i] = '';
                boxes[i+1].innerHTML = b1[i+1];
                boxes[i].innerHTML = b1[i];
                moved = true;
            } else if (b1[i+1] === b1[i] && b1[i] !== '') {
                b1[i+1] = Number(b1[i+1]) * 2;
                b1[i] = '';
                boxes[i+1].innerHTML = b1[i+1];
                boxes[i].innerHTML = b1[i];
                moved = true;
            }
        }
        if (moved) {
            generateNew();
        }

    }

    function moveleft() {

        var moved = false;

        for(i=7; i > 0; i -= 3) {
            if (b1[i - 1] === '' && b1[i] !== '') {
                b1[i - 1] = b1[i];
                b1[i] = '';
                boxes[i - 1].innerHTML = b1[i - 1];
                boxes[i].innerHTML = '';
                moved = true;
            } else if (b1[i] === b1[i-1] && b1[i] !== '') {
                b1[i-1] = Number(b1[i-1]) * 2;
                b1[i] = '';
                boxes[i-1].innerHTML = b1[i-1];
                boxes[i].innerHTML = b1[i];
                moved =true;
            }
        }

        for(i=8; i > 1; i -= 3) {
            if (b1[i - 1] === '' && b1[i - 2] === ''  && b1[i] !== '') {
                b1[i - 2] = b1[i];
                b1[i] = '';
                boxes[i - 2].innerHTML = b1[i - 2];
                boxes[i].innerHTML = '';
                moved = true;
            } else if (b1[i -1] === '' && b1[i -2] === b1[i] && b1[i] !== '') {
                b1[i-2] = Number(b1[i-2]) * 2;
                b1[i] = '';
                boxes[i-2].innerHTML = b1[i-2];
                boxes[i].innerHTML = b1[i];
                moved = true;
            } else if (b1[i-1] === '' && b1[i] !== '') {
                b1[i-1] = b1[i];
                b1[i] = '';
                boxes[i-1].innerHTML = b1[i-1];
                boxes[i].innerHTML = b1[i];
                moved = true;
            } else if (b1[i-1] === b1[i] && b1[i] !== '') {
                b1[i-1] = Number(b1[i-1]) * 2;
                b1[i] = '';
                boxes[i-1].innerHTML = b1[i-1];
                boxes[i].innerHTML = b1[i];
                moved = true;
            }
        }
        if (moved) {
            generateNew();
        }
    }



    function moveit(key) {
        if (key === 's') {  //down
            movedown();

        } else if (key === 'w') { //up
            moveup();

        } else if (key === 'd') { //right
            moveright();
            
        } else if (key === 'a') { //left
            moveleft();

        }
    }

    document.addEventListener('keypress', function (e) {
        moveit(e.key);
        console.log(e.key);
    });


});
