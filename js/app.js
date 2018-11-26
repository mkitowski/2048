document.addEventListener("DOMContentLoaded", function () {

    var boxes = document.querySelectorAll('.box');
    var button = document.querySelector('button');
    var b1 = ['','','','','','','','',''];


    function generate() {
        var result = 0;
        result = Math.floor(Math.random() * 9);
        boxes[result].innerHTML = 2;
        b1[result] = 2;
        boxes.forEach(function (e , i) {
            if (i !== result) {
                boxes[i].innerHTML = '';
                button[i] = '';
            }
        });
        console.log(result);
    }

    button.addEventListener('click', function () {
        generate();
        this.innerHTML = 'Restart';
    });


});
