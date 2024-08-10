let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer = 'X';
let gameStatus = 'inProgress';
let xWin = 0;
let oWin = 0;
let draw = 0;
let theme = document.querySelector('.change');
let banner = document.querySelector('.banner');


document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.game-board');
    const gameStatusElement = document.getElementById('game-status');
    const resetButton = document.getElementById('reset-button');
    const xWinElement = document.getElementById('x-win');
    const oWinElement = document.getElementById('o-win');
    const drawElement = document.getElementById('draw');

    gameBoard.addEventListener('click', (e) => {
        const cell = e.target;
        const row = cell.dataset.row;
        const col = cell.dataset.col;

        if (gameStatus !== 'inProgress') {
            return;
        }

        if (board[row][col] !== '') {
            return;
        }

        board[row][col] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            gameStatus = 'Win';
            gameStatusElement.textContent = `${currentPlayer} wins!`;
            if (currentPlayer === 'X') {
                xWin++;
                xWinElement.textContent = xWin;
            }
            if (currentPlayer === 'O') {
                oWin++;
                oWinElement.textContent = xWin;
            }
        } else if (checkForDraw()) {
            gameStatus = 'Draw';
            gameStatusElement.textContent = 'Draw!';
            draw++;
            drawElement.textContent = draw;
        } else {
            currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
        }
    });

    resetButton.addEventListener('click', () => {
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        currentPlayer = 'X';
        gameStatus = 'inProgress';
        gameStatusElement.textContent = 'Game in progress...';
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
        });
    });
});

function checkWin() {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
            return true;
        }
    }
    for (let i = 0; i < 3; i++) {
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '') {
            return true;
        }
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
        return true;
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '') {
        return true;
    }

    return false;
}

function checkForDraw() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}

theme.addEventListener('click', () => {
    setTimeout(() => {
        banner.classList.toggle('theme');
    }, 150);
})