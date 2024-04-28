var item = null;
var level = 1;
var maxlevel = 11;
function addDisks(level) {

    var pos = document.getElementById('tower1');
    for (var i = level; i > 0; i--) {
        var mynewdiv = document.createElement('div');
        mynewdiv.className = 'disk';
        mynewdiv.innerHTML = i;
        mynewdiv.id = 'disk' + (i);
        mynewdiv.style.setProperty('width', 50 + (i * 10) + 'px');
        pos.appendChild(mynewdiv);
    }

    mynewdiv.className = 'disk diskmove';
    mynewdiv.draggable = true;
}

document.addEventListener('DOMContentLoaded', function () {
    var mylevel = document.getElementById('selectlevel');
    mylevel.options[0] = new Option("--select--");
    for (i = 3; i <= maxlevel; i++) {
        mylevel.options[i - 2] = new Option(i);
    }
});


function runLevel() {
    var mylevel = document.getElementById('selectlevel');
    level = mylevel.options[mylevel.selectedIndex].value;

    if (level > 2) {
        var mylevel = document.getElementById('level_select');
        mylevel.style.display = 'none';
        addDisks(level);
    }
}

function askLevel() {
    var towerdivs = document.getElementById('tower3');
    while (towerdivs.hasChildNodes()) {
        towerdivs.removeChild(towerdivs.lastChild);
    }
    var score = document.getElementById('score');
    score.innerHTML = 0;
    while (towerdivs.hasChildNodes()) {
        towerdivs.removeChild(towerdivs.lastChild);
    }
    var mylevel = document.getElementById('level_select');
    mylevel.style.display = 'block';

    var mylevel = document.getElementById('winner');
    mylevel.style.display = 'none';

}
document.addEventListener('dragstart', function (e) {
    item = e.target;
}, false);


document.addEventListener('dragover', function (e) {
    if (item) {
        e.preventDefault();
    }

}, false);


document.addEventListener('drop', function (e) {
    if (e.target.getAttribute('data-draggable') == 'target') {
        parent = item.parentElement;
        var score = document.getElementById('score');
        if (e.target != parent) {
            score.innerHTML = parseInt(score.innerHTML) + 1;
        }
        if (e.target.lastChild) {
            lst_child_width = parseInt(e.target.lastChild.style.width, 10);
            my_width = parseInt(item.style.width, 10);

            if (my_width < lst_child_width) {
                e.target.lastChild.draggable = false;
                e.target.lastChild.className = 'disk';
                e.target.appendChild(item);
                e.preventDefault();
            }
        }
        else {
            e.target.appendChild(item);
            e.preventDefault();
        }

        if (parent.lastChild) {
            parent.lastChild.draggable = true;
            parent.lastChild.className = 'disk diskmove';
        }
    }
}, false);


document.addEventListener('dragend', function (e) {
    if (item.parentElement.id == 'tower3') {
        if (item.parentElement.childElementCount == level) {
            var pos = document.getElementById('winner');
            pos.style.display = 'block';
        }
    }
    item = null;
}, false);

function reset() {
    // reset the whole game
    // remove all disks from tower 1
    var tower1 = document.getElementById('tower1');
    while (tower1.hasChildNodes()) {
        tower1.removeChild(tower1.lastChild);
    }
    // remove all disks from tower 2
    var tower2 = document.getElementById('tower2');
    while (tower2.hasChildNodes()) {
        tower2.removeChild(tower2.lastChild);
    }
    // remove all disks from tower 3
    var tower3 = document.getElementById('tower3');
    while (tower3.hasChildNodes()) {
        tower3.removeChild(tower3.lastChild);
    }
    // hide the 'winner' div
    var pos = document.getElementById('winner');
    // pos.style.visibility = 'hidden';
    pos.style.display = 'none';
    // show the 'select level' div
    var mylevel = document.getElementById('level_select');
    mylevel.style.display = 'block';
    // empty the score
    var score = document.getElementById('score');
    score.innerHTML = 0;
}
