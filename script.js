let x_0_evidence; // keep the evidence of which turn it is and if it ends in a tie.
let endGameCheck; // stops any action on the x and 0 buttons after a winner is declared (= 0 the game is still going / = 3 the game ended)
                  // does not allow to rerwrite a button that was already clicked

let usedButtons = new Array(3);
for (var i = 1; i <= 3; ++i) {
    usedButtons[i] = new Array(3);
}

function startGame() {
    endGameCheck = 0;
    x_0_evidence = 0;
    for (let i = 1; i <= 3; ++i) {
        document.getElementById(i).innerHTML='';
        for (let j = 1; j <= 3; ++j) {
            usedButtons[i][j] = 0;
        }
    }
    document.getElementById("winnerAnouncement").innerHTML='';
    document.getElementById("startGame").innerHTML = "Restart";

    for (let i = 1; i <= 3; ++i) {
        for (let j = 1; j <= 3; ++j) {
            const playingButtons = document.createElement("Button");
            Object.assign (playingButtons, {
                id : i * 10 + j,
                innerHTML : '<img src = "blank.png">',
                onclick : () => clickAction(i * 10 + j)
            })
            document.getElementById(i).appendChild(playingButtons);
        }
    }
}

function clickAction(id) {
    let winnerCheck = 0;
    const button_id_row = Math.floor(id / 10);
    const button_id_column = id % 10;
    if (x_0_evidence % 2 == 0 && usedButtons[button_id_row][button_id_column] == endGameCheck) {
        document.getElementById(id).innerHTML = '<img src="x.png">';
        usedButtons[button_id_row][button_id_column] = 1;
        ++x_0_evidence;
    } else if (x_0_evidence % 2 != 0 && usedButtons[button_id_row][button_id_column] == endGameCheck){
        document.getElementById(id).innerHTML = '<img src="0.png">';
        usedButtons[button_id_row][button_id_column] = 2;
        ++x_0_evidence;
    }

    for (let i = 1; i <= 3; ++i) {
        if((usedButtons[i][1] == usedButtons[i][2]) && (usedButtons[i][2] == usedButtons[i][3]) && (usedButtons[i][1] != 0)) {
            winnerCheck = usedButtons[i][1];
        } 
    }

    for (let i = 1; i <= 3; ++i) {
        if((usedButtons[1][i] == usedButtons[2][i]) && (usedButtons[2][i] == usedButtons[3][i]) && (usedButtons[1][i] != 0)) {
            winnerCheck = usedButtons[1][i];
        }
    }

    if((usedButtons[1][1] == usedButtons[2][2]) && (usedButtons[2][2] == usedButtons[3][3]) && (usedButtons[1][1] != 0)) {
        winnerCheck = usedButtons[1][1];
    }

    if((usedButtons[1][3] == usedButtons[2][2]) && (usedButtons[2][2] == usedButtons[3][1]) && (usedButtons[1][3] != 0)) {
        winnerCheck = usedButtons[1][3];
    }

    
    if (winnerCheck == 1) {
        document.getElementById('winnerAnouncement').innerHTML="The Winner is X";
        endGameCheck = 3;
    } else if (winnerCheck == 2) {
        document.getElementById('winnerAnouncement').innerHTML="The Winner is 0";
        endGameCheck = 3;
    }
    
    if (x_0_evidence == 9) {
        document.getElementById('winnerAnouncement').innerHTML="Tie";
    }

}
