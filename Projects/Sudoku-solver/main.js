function solve(bo) {
    const find = findEmpty(bo);
    let row, col;
    if (!find) {
        return true;
    }
    else {
        row = find[0];
        col = find[1];
    }
    for (let i = 0; i < 10; i++) {
        if (valid(bo, i, [row, col])) {
            bo[row][col] = i;
            
            if (solve(bo)) {
                return true;
            }

            bo[row][col] = 0;
        }
    }
    return false;
}

function valid(bo, num, pos) {
    //Check row
    for (let i = 0; i < bo[0].length; i++) {
        if (bo[pos[0]][i] === num && pos[1] !== i) {
            return false;
        }
    }
    //Check col
    for (let i = 0; i < bo.length; i++) {
        if(bo[i][pos[1]] === num && pos[0] !== i) {
            return false;
        }
    }
    //Check subgrid
    for(let i = Math.floor(pos[0]/3) * 3; i < Math.floor(pos[0]/3) * 3 + 3; i++) {
        for (let j = Math.floor(pos[1]/3) * 3; j < Math.floor(pos[1]/3) * 3 + 3; j++) {
            if(bo[i][j] === num && [i,j] !== pos) {
                return false;
            }
        }
    }
    return true;
}

function findEmpty(bo) {
    for (let i = 0; i < bo.length; i++) {
        for (let j = 0; j < bo[0].length; j++) {
            if (bo[i][j] === 0) {
                return [i, j];
            }
        }
    }
    return false;
}

const exampleBoard = [
[0, 0, 4, 0, 5, 0, 0, 0, 0],
[9, 0, 0, 7, 3, 4, 6, 0, 0],
[0, 0, 3, 0, 2, 1, 0, 4, 9],
[0, 3, 5, 0, 9, 0, 4, 8, 0],
[0, 9, 0, 0, 0, 0, 0, 3, 0],
[0, 7, 6, 0, 1, 0, 9, 2, 0],
[3, 1, 0, 9, 7, 0, 2, 0, 0],
[0, 0, 9, 1, 8, 2, 0, 0, 3],
[0, 0, 0, 0, 6, 0, 1, 0, 0]
];

/*solve(board);
console.table(board);*/

function readBoard() {
    let bo = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
    for (let i = 0; i < bo[0].length; i++) {
        for (let j = 0; j < bo.length; j++) {
            if (!document.getElementById(i + "" + j)) {
                bo[i][j] = 0;
            }
            else {
                bo[i][j] = Number(document.getElementById(i + "" + j).value);
            }
        }
    }
    return bo;
}

function updateBoardDisplay(board) {
    for(let i = 0; i < board[0].length; i++) {
        for(let j = 0; j < board.length; j++) {
            switch(board[i][j]) {
                case 0:
                    document.getElementById(i + "" + j).value = "";
                    break;
                default:
                    document.getElementById(i + "" + j).value = board[i][j];
                    break;
            }
        }
    }
}

function solveButton() {
    let board = readBoard();
    solve(board);
    updateBoardDisplay(board);
}

function clearButton() {
    for(let i = 0; i < exampleBoard[0].length; i++) {
        for(let j = 0; j < exampleBoard.length; j++) {
            document.getElementById(i + "" + j).value = "";
        }
    }
}
