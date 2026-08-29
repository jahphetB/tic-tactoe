
const gameBoard = (() => {
    const board = [
        "empty", "empty", "empty",
        "empty", "empty", "empty", 
        "empty", "empty", "empty"
    ];

    const getBoard = () => board; 

    function placeMarker(position, marker) {
        if (board[position] === "empty") {
            board[position] = marker;
            return true;
        } 
        
        return false;
    }


    return {
        getBoard, /** same as getBoard: "getBoard" */
        placeMarker
    };
})();

const createPlayer = (name, marker) => {
    return {
        name,
        marker
    };
};

const gameController = (() => {
    const playerOne = createPlayer("Player One", "X");
    const playerTwo = createPlayer("Player Two", "O");

    let activePlayer = playerOne;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    };

    const getActivePlayer = () => activePlayer;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWinner = () => {
        const board = gameBoard.getBoard();

        for (const [a, b, c] of winningCombinations) {
            if (
                board[a] !== "empty" &&
                board[a] === board[b] &&
                board[a] === board[c]
            ) {
                return true;
            }
        }

        return false;
    };

    const checkTie = () => {
        const board = gameBoard.getBoard();

        return board.every(square => square !== "empty");
    };

    const playRound = (position) => {
        const moveSuccessful = gameBoard.placeMarker(
            position,
            activePlayer.marker
        );

        if (!moveSuccessful) {
            return false;
        }

        if (checkWinner()) {
            console.log(`${activePlayer.name} wins!`);
            return true;
        }

        if (checkTie()) {
            console.log("It's a tie!");
            return true;
        }

        switchPlayerTurn();

        return true;
    };

    return {
        playRound,
        getActivePlayer
    };
})();

