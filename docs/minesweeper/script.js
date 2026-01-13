class Minesweeper {
    constructor() {
        this.difficulties = {
            easy: { rows: 9, cols: 9, mines: 10 },
            medium: { rows: 16, cols: 16, mines: 40 },
            hard: { rows: 16, cols: 30, mines: 99 }
        };

        this.currentDifficulty = 'easy';
        this.board = [];
        this.revealed = [];
        this.flagged = [];
        this.gameOver = false;
        this.gameWon = false;
        this.firstClick = true;
        this.timer = 0;
        this.timerInterval = null;

        this.initElements();
        this.initGame();
        this.setupEventListeners();
    }

    initElements() {
        this.boardElement = document.getElementById('game-board');
        this.mineCountElement = document.getElementById('mine-count');
        this.flagCountElement = document.getElementById('flag-count');
        this.timerElement = document.getElementById('timer');
        this.statusElement = document.getElementById('game-status');
        this.difficultySelect = document.getElementById('difficulty');
        this.newGameButton = document.getElementById('new-game');
    }

    setupEventListeners() {
        this.newGameButton.addEventListener('click', () => this.initGame());
        this.difficultySelect.addEventListener('change', (e) => {
            this.currentDifficulty = e.target.value;
            this.initGame();
        });
    }

    initGame() {
        this.currentDifficulty = this.difficultySelect.value;
        const config = this.difficulties[this.currentDifficulty];

        this.rows = config.rows;
        this.cols = config.cols;
        this.totalMines = config.mines;
        this.flagsPlaced = 0;
        this.cellsRevealed = 0;
        this.gameOver = false;
        this.gameWon = false;
        this.firstClick = true;
        this.timer = 0;

        this.board = Array(this.rows).fill(null).map(() => Array(this.cols).fill(0));
        this.revealed = Array(this.rows).fill(null).map(() => Array(this.cols).fill(false));
        this.flagged = Array(this.rows).fill(null).map(() => Array(this.cols).fill(false));

        this.updateDisplay();
        this.renderBoard();
        this.stopTimer();
    }

    placeMines(excludeRow, excludeCol) {
        let minesPlaced = 0;
        while (minesPlaced < this.totalMines) {
            const row = Math.floor(Math.random() * this.rows);
            const col = Math.floor(Math.random() * this.cols);

            if (row === excludeRow && col === excludeCol) continue;
            if (this.board[row][col] === -1) continue;

            this.board[row][col] = -1;
            minesPlaced++;

            this.updateAdjacentCells(row, col);
        }
    }

    updateAdjacentCells(row, col) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;

                if (this.isValidCell(newRow, newCol) && this.board[newRow][newCol] !== -1) {
                    this.board[newRow][newCol]++;
                }
            }
        }
    }

    isValidCell(row, col) {
        return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
    }

    renderBoard() {
        this.boardElement.innerHTML = '';
        this.boardElement.style.gridTemplateColumns = `repeat(${this.cols}, 30px)`;
        this.boardElement.style.gridTemplateRows = `repeat(${this.rows}, 30px)`;

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;

                cell.addEventListener('click', () => this.handleLeftClick(row, col));
                cell.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    this.handleRightClick(row, col);
                });

                this.updateCell(cell, row, col);
                this.boardElement.appendChild(cell);
            }
        }
    }

    updateCell(cell, row, col) {
        cell.className = 'cell';

        if (this.flagged[row][col]) {
            cell.classList.add('flagged');
            cell.textContent = '🚩';
        } else if (this.revealed[row][col]) {
            cell.classList.add('revealed');

            if (this.board[row][col] === -1) {
                cell.classList.add('mine');
                cell.textContent = '💣';
            } else if (this.board[row][col] > 0) {
                cell.textContent = this.board[row][col];
                cell.classList.add(`number-${this.board[row][col]}`);
            }
        } else {
            cell.textContent = '';
        }
    }

    handleLeftClick(row, col) {
        if (this.gameOver || this.gameWon) return;
        if (this.flagged[row][col]) return;
        if (this.revealed[row][col]) return;

        if (this.firstClick) {
            this.placeMines(row, col);
            this.firstClick = false;
            this.startTimer();
        }

        if (this.board[row][col] === -1) {
            this.revealCell(row, col);
            this.endGame(false);
        } else {
            this.revealCell(row, col);
            if (this.board[row][col] === 0) {
                this.revealAdjacentCells(row, col);
            }
            this.checkWin();
        }

        this.renderBoard();
    }

    handleRightClick(row, col) {
        if (this.gameOver || this.gameWon) return;
        if (this.revealed[row][col]) return;

        this.flagged[row][col] = !this.flagged[row][col];

        if (this.flagged[row][col]) {
            this.flagsPlaced++;
        } else {
            this.flagsPlaced--;
        }

        this.updateDisplay();
        this.renderBoard();
    }

    revealCell(row, col) {
        if (!this.isValidCell(row, col)) return;
        if (this.revealed[row][col]) return;

        this.revealed[row][col] = true;
        this.cellsRevealed++;
    }

    revealAdjacentCells(row, col) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;

                if (this.isValidCell(newRow, newCol) && !this.revealed[newRow][newCol] && !this.flagged[newRow][newCol]) {
                    this.revealCell(newRow, newCol);
                    if (this.board[newRow][newCol] === 0) {
                        this.revealAdjacentCells(newRow, newCol);
                    }
                }
            }
        }
    }

    checkWin() {
        const totalCells = this.rows * this.cols;
        const nonMineCells = totalCells - this.totalMines;

        if (this.cellsRevealed === nonMineCells) {
            this.endGame(true);
        }
    }

    endGame(won) {
        this.gameOver = !won;
        this.gameWon = won;
        this.stopTimer();

        if (won) {
            this.statusElement.textContent = '🎉 クリア！おめでとうございます！';
            this.statusElement.className = 'game-status win';
        } else {
            this.statusElement.textContent = '💥 ゲームオーバー';
            this.statusElement.className = 'game-status lose';
            this.revealAllMines();
        }
    }

    revealAllMines() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.board[row][col] === -1) {
                    this.revealed[row][col] = true;
                }
            }
        }
        this.renderBoard();
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timer++;
            this.timerElement.textContent = this.timer;
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.timerElement.textContent = this.timer;
    }

    updateDisplay() {
        this.mineCountElement.textContent = this.totalMines;
        this.flagCountElement.textContent = this.totalMines - this.flagsPlaced;
        this.statusElement.textContent = '';
        this.statusElement.className = 'game-status';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Minesweeper();
});
