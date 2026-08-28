
const gameBoard = (() => {
    const board = [
        "empty", "empty", "empty",
        "empty", "empty", "empty", 
        "empty", "empty", "empty"
    ];

    const getBoard = () => board; 

    function placeMarker (position, marker) {
        board [position] = marker; 
    }

    return {
        getBoard, /** same as getBoard: "getBoard" */
        placeMarker
    };
})();