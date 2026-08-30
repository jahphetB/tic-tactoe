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

    const resetBoard = () => {
        board.fill("empty");
    };

    return {
        getBoard,
        placeMarker,
        resetBoard
    };

})();


const createPlayer = (name, marker) => {

    return {
        name,
        marker
    };

};


const gameController = (() => {

    let playerOne;
    let playerTwo;
    let activePlayer;

    let gameOver = true;
    let resultMessage = "";


    const startGame = (playerOneName, playerTwoName) => {

        playerOne = createPlayer(
            playerOneName || "Player One",
            "X"
        );

        playerTwo = createPlayer(
            playerTwoName || "Player Two",
            "O"
        );

        activePlayer = playerOne;

        gameOver = false;
        resultMessage = "";

        gameBoard.resetBoard();
    };


    const switchPlayerTurn = () => {

        activePlayer =
            activePlayer === playerOne
                ? playerTwo
                : playerOne;
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

        return board.every(
            square => square !== "empty"
        );
    };


    const playRound = (position) => {

        if (gameOver) {
            return false;
        }

        const moveSuccessful =
            gameBoard.placeMarker(
                position,
                activePlayer.marker
            );


        if (!moveSuccessful) {
            return false;
        }


        if (checkWinner()) {

            resultMessage =
                `${activePlayer.name} wins!`;

            console.log(resultMessage);

            gameOver = true;

            return true;
        }


        if (checkTie()) {

            resultMessage = "It's a tie!";

            console.log(resultMessage);

            gameOver = true;

            return true;
        }


        switchPlayerTurn();

        return true;
    };


    const isGameOver = () => gameOver;


    const getResult = () => resultMessage;


    return {
        startGame,
        playRound,
        getActivePlayer,
        isGameOver,
        getResult
    };

})();


const displayController = (() => {

    const cells =
        document.querySelectorAll(".cell");

    const startButton =
        document.querySelector("#start-button");

    const playerOneInput =
        document.querySelector("#player-one-name");

    const playerTwoInput =
        document.querySelector("#player-two-name");

    const status =
        document.querySelector("#status");

    const result =
        document.querySelector("#result");


    const renderBoard = () => {

        const board = gameBoard.getBoard();

        cells.forEach((cell, index) => {

            if (board[index] === "empty") {
                cell.textContent = "";
            } else {
                cell.textContent = board[index];
            }

        });
    };


    const updateDisplay = () => {

        renderBoard();

        if (gameController.isGameOver()) {

            const gameResult =
                gameController.getResult();

            if (gameResult) {
                status.textContent = "";
                result.textContent = gameResult;
            }

            return;
        }


        const activePlayer =
            gameController.getActivePlayer();

        status.textContent =
            `${activePlayer.name}'s turn (${activePlayer.marker})`;

        result.textContent = "";
    };


    cells.forEach(cell => {

        cell.addEventListener("click", () => {

            const position =
                Number(cell.dataset.index);

            const moveSuccessful =
                gameController.playRound(position);

            if (moveSuccessful) {
                updateDisplay();
            }

        });

    });


    startButton.addEventListener("click", () => {

        const playerOneName =
            playerOneInput.value.trim();

        const playerTwoName =
            playerTwoInput.value.trim();


        gameController.startGame(
            playerOneName,
            playerTwoName
        );


        startButton.textContent =
            "Restart Game";

        updateDisplay();

    });


    renderBoard();

})();