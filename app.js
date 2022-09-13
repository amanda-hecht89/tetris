document.addEventListener('DOMContentLoaded', () => {
    const width = 10;
    const height = 200;
    let timerId = 1000; 
    let nextRandom = 0;

    const grid = document.querySelector('.grid');
    const ScoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelector('#start');
    let squares = Array.from(document.querySelectorAll('.grid div'));

    // build tetrominoes

    const lTetris = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ];

    const zTetris = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ];

    const tTetris = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ];

    const oTetris = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
    ];

    const iTetris = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
    ];

    const theTetris = [lTetris, iTetris, oTetris, tTetris, zTetris];

    let currentPosition = 4;
    let currentRotation = 0;

    // random selection of tetris

    let random = Math.floor(Math.random() * theTetris.length);
    let current = theTetris[random][currentRotation];

    // draw the tetris
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetris');
        });
    }

    // undraw the tetris
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetris');
        });
    }

    // make tetris move down
    timerId = setInterval(moveDown, 1000);

    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    // keystrokes to move tetris
    function control(e) {
        if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 38) {
            rotate();
        } else if (e.keyCode === 39) {
            moveRight();
        } else if (e.keyCode === 40) {
            moveDown();
        }
    }
    document.addEventListener('keyup', control);



    // stop moving function
    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'));
            // new tetris falling
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetris.length);
            current = theTetris[random][currentRotation];
            currentPosition = 4;
            draw();
            displayShape();
        }
    }

    // stop the sides function
    function moveLeft() {
        undraw();
        const leftEdge = current.some(index => (currentPosition + index) % width === 0);
    
        if (!leftEdge) currentPosition -= 1;
        if (current.some(index => squares[currentPosition + index].classList.containes('taken'))) {
            currentPosition += 1;
        }
        draw();
    }

    //move right

    function moveRight() {
        undraw();
        const rightEdge = current.some(index => (currentPosition + index) % width === width - 1);
    
        if (!rightEdge) currentPosition += 1;
        if (current.some(index => squares[currentPosition + index].classList.containes('taken'))) {
            currentPosition -= 1;
        }
        draw();
    }


    // rotate tetris
    function rotate() {
        undraw();
        currentRotation ++;
        if (currentRotation === current.length) {
            currentRotation = 0;
        }
        current = theTetris[random][currentRotation];
        draw();
    }

    // show next tetris
    const displayNext = document.querySelectorAll('.nextGrid div');
    const nextWidth = 4;
    let displayNextIndex = 0;

    // tetris without rotation
    const nextTetris = [
        [1, nextWidth + 1, nextWidth * 2 + 1, 2],          //ltetris
        [0, nextWidth, nextWidth + 1, nextWidth * 2 + 1],  //ztetris
        [1, nextWidth, nextWidth + 1, nextWidth + 2],     //ttetris
        [0, 1, nextWidth, nextWidth + 1],                 //otetris
        [1, nextWidth + 1, nextWidth * 2 + 1, nextWidth * 3 + 1],    //itetris
    ];

    // display next shape
    function displayShape() {
        // remove old tetris grom grid
        displayNext.forEach(square => {
            square.classList.remove('tetris');
        });
        nextTetris[nextRandom].forEach(index => {
            displayNext[displayNextIndex + index].classList.add('tetris');
        });
    }








    
});
