// Alles mit dem MVC Prinzip programmieren
// The target for this code is, to write it with
// the MVC - like class and so on...

// Constants
const SNAKE_MOVE_HORIZONTAL = 1;
const SNAKE_MOVE_VERTICAL = 10;
const PLACE_FIELD = 100;
const SPEED = .8;
const INTERVAL = 1000;

// Events
const gamePlace = document.querySelector('.game-place');
const scoreMessage = document.querySelector('.score');
const start = document.querySelector('.start');
const restart = document.querySelector('.restart');

// Properties
const placeArray = [];
let snake = [];
let direction = SNAKE_MOVE_HORIZONTAL;
let moveInterval;
let intervalTime = INTERVAL;
let appleIndex;
let score = 0;
let tail;

const renderGamePlace = counter => {    
    if(counter >= PLACE_FIELD) {
        return;
    }
    const place = document.createElement('div');
    place.classList.add('place');
    gamePlace.appendChild(place);
    placeArray.push(place);
    
    return renderGamePlace(counter + 1);
};

const renderSnake = () => {
    snake = [2, 1, 0];
    snake.forEach(index => placeArray[index].classList.add('snake'));
};    

const setRandomNumber = () => Math.floor(Math.random() * PLACE_FIELD);
const renderApple = () => {
    appleIndex = setRandomNumber();

    placeArray[appleIndex].classList.contains('snake') ?
        appleIndex = setRandomNumber() :
        placeArray[appleIndex].classList.add('apple');
        placeArray[appleIndex].textContent = '🍎';
};
// todo: make an object
const controlSnakeMove = e => {
    if (e.key === 'ArrowRight') {
        direction = SNAKE_MOVE_HORIZONTAL;
    } else if (e.key === 'ArrowUp') {
        direction = -SNAKE_MOVE_VERTICAL;
    } else if (e.key === 'ArrowLeft') {
        direction = -SNAKE_MOVE_HORIZONTAL;
    } else if (e.key === 'ArrowDown') {
        direction = SNAKE_MOVE_VERTICAL;
    }
};

const init = () => {
    document.addEventListener('keydown', controlSnakeMove);
    renderGamePlace(0);
    renderSnake();
    renderApple();
}
init();

const removeSnake = () => snake.forEach(index => placeArray[index].classList.remove('snake'));

const removeApple = () => {
    placeArray[appleIndex].classList.remove('apple');
    placeArray[appleIndex].textContent = '';
}

const moveSnake = () => {
    tail = snake.pop();
    placeArray[tail].classList.remove('snake');
    snake.unshift(snake[0] + direction);    
    placeArray[snake[0]].classList.add('snake');
};
// todo: not if
const snakeEatApple = () => {
    if(snake[0] === appleIndex) {
        placeArray[tail].classList.add('snake');
        snake.push(tail);

        removeApple();
        renderApple();
        
        score++;
        scoreMessage.textContent = score;

        clearInterval(moveInterval);
        intervalTime = intervalTime * SPEED;
        moveInterval = setInterval(controlGame, intervalTime);
    }
}

// todo: not if
const controlGame = () => {
    if (
        (snake[0] + SNAKE_MOVE_VERTICAL >= PLACE_FIELD && 
            direction === SNAKE_MOVE_VERTICAL) ||            
        (snake[0] % SNAKE_MOVE_VERTICAL === SNAKE_MOVE_VERTICAL - 1 && 
            direction === SNAKE_MOVE_HORIZONTAL) ||
        (snake[0] % SNAKE_MOVE_VERTICAL === 0 && 
            direction === -SNAKE_MOVE_HORIZONTAL) ||
        (snake[0] - SNAKE_MOVE_VERTICAL < 0 && 
            direction === -SNAKE_MOVE_VERTICAL) ||
        placeArray[snake[0] + direction].classList.contains('snake')
    ) {
        restart.classList.remove('hide');
        return clearInterval(moveInterval);
    } else {
        moveSnake();
        snakeEatApple();
    }

}

const renderMoveSnake = () => {
    start.classList.add('hide');
    moveInterval = setInterval(controlGame, intervalTime);
}

const restartMoveSnake = () => {
    restart.classList.add('hide');
    direction = SNAKE_MOVE_HORIZONTAL;
    score = 0;
    intervalTime = INTERVAL;
    scoreMessage.textContent = '';
    
    removeSnake();
    removeApple();
    renderSnake();
    renderApple();

    moveInterval = setInterval(controlGame, intervalTime);
}

start.addEventListener('click', renderMoveSnake);
restart.addEventListener('click', restartMoveSnake);