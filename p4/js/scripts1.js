
/*
 * A complete tic-tac-toe widget, using JQuery.  Just include this 
 * script in a browser page and play.  A tic-tac-toe game will be 
 * included as a child element of the element with id "tictactoe".  
 * If the page has no such element, it will just be added at the end 
 * of the body.
 */
$(function () {

    var squares = [], 
        SIZE = 3,
        EMPTY = "&nbsp;",
        score,
        moves,
        turn = "X",
        //Edit: add variables
        numX = 0,
        numO = 0,
        numDraws = 0,
        numGames = 0,
        defualtMsg = "<i>No games played!</i>",
        autoRestart_var = 0,
        gameDone = false,
        numRestarts = 0,
        btn_defualtMsg = "<b>off</b>",
        btn_XdefualtMsg = "<b>on</b>";
        //Edit: Take user input for buttons
        processButton =  document.getElementById("process"),    //button for re-start
        process2Button =  document.getElementById("process2"),  //button for auto-restart
        //Edit: link variables to ID's for later display
        Xwins =  document.getElementById("XW"),
        Owins =  document.getElementById("OW"),
        Draws =  document.getElementById("draws");
        Games = document.getElementById("games");
        Re_starts = document.getElementById("re_starts");
        Button2_Status = document.getElementById("btn2_status");
        Victory = document.getElementById("victory");
        //Edit: display defualt messege for stats when no games completed
        Xwins.innerHTML = defualtMsg;
        Owins.innerHTML = defualtMsg;
        Draws.innerHTML = defualtMsg;
        Games.textContent = numGames;
        Re_starts.innerHTML = defualtMsg;
        Button2_Status.innerHTML = btn_defualtMsg;
        //Edit: make rest of code work
    var  

    /*
     * To determine a win condition, each square is "tagged" from left
     * to right, top to bottom, with successive powers of 2.  Each cell
     * thus represents an individual bit in a 9-bit string, and a
     * player's squares at any given time can be represented as a
     * unique 9-bit value. A winner can thus be easily determined by
     * checking whether the player's current 9 bits have covered any
     * of the eight "three-in-a-row" combinations.
     *
     *     273                 84
     *        \               /
     *          1 |   2 |   4  = 7
     *       -----+-----+-----
     *          8 |  16 |  32  = 56
     *       -----+-----+-----
     *         64 | 128 | 256  = 448
     *       =================
     *         73   146   292
     *
     */
    wins = [7, 56, 448, 73, 146, 292, 273, 84],

    /*
     * Clears the score and move count, erases the board, and makes it
     * X's turn.
     */
    startNewGame = function () {
        turn = "X";
        score = {"X": 0, "O": 0};
        moves = 0;
        squares.forEach(function (square) {square.html(EMPTY);});
        //Edit: game is not done anymore
        gameDone = false;
    };
    //Edit: function for displaying score
    display = function() {
        Xwins.textContent = numX;
        Owins.textContent = numO;
        Draws.textContent = numDraws;
        Games.textContent = numGames;
        Re_starts.textContent = numRestarts;
    };    
    //Edit: add auto-re-start toggler
    autoRestart_toggle = function () {
        autoRestart_var = autoRestart_var ^ 1; //XOR
        console.log(autoRestart_var);
        if (autoRestart_var === 1) {
            Button2_Status.innerHTML = btn_XdefualtMsg;
        }
        else {
            Button2_Status.innerHTML = btn_defualtMsg;
        }
        if (gameDone === true){
            startNewGame();     //if game is done, start new game
        }
    };
    //Edit: re-start function to record & display # of incomplete games
    restart = function () {
        if (gameDone == false) {
            numRestarts += 1;   //update # of incomplete games
            Victory.innerHTML = "The last match did not finish; what a pity.";
        }
        display();      //update display
        startNewGame(); //start new game
    };
    //Edit: add buttons functionality 
    processButton.addEventListener("click",restart);           //if clicked, call function
    process2Button.addEventListener("click",autoRestart_toggle);    //^
    //Edit: make the rest of the code below work
    var 


    /*
     * Returns whether the given score is a winning score.
     */
    win = function (score) {
        for (var i = 0; i < wins.length; i += 1) {
            if ((wins[i] & score) === wins[i]) {
                return true;
            }
        }
        return false;
    },

    /*
     * Sets the clicked-on square to the current player's mark,
     * then checks for a win or cats game.  Also changes the
     * current player.
     */
    set = function () {
        
        if ($(this).html() !== EMPTY) {
            return;
        }
        $(this).html(turn);
        console.log($(this));
        moves += 1;
        score[turn] += $(this)[0].indicator;
        console.log(score[turn]);
        if (win(score[turn])) {
            //Edit: record # of completed games
            numGames += 1;
            //Edit: Record # of wins
            if (turn === "X") {
                numX += 1;
            }
            else if (turn === "O"){
                numO += 1;
            }
            // alert(turn + " wins!");
            //Edit: game is done
            gameDone = true;
            //update score display
            display();
            //Edit: if auto-restart is on, re-start automatically at end of game
            if (autoRestart_var === 1) 
            {
                Victory.innerHTML = "Just so you know, " + turn + " won the last match.";
                startNewGame();
            }
            else {
                //Edit: display the victor
                Victory.innerHTML = turn + " wins!";
            }   
        } else if (moves === SIZE * SIZE) {
            //Edit: record # of completed games
            numGames += 1;
            // alert("Cat\u2019s game!");
            //Edit: record number of wins
            numDraws += 1;
            //Edit: game is done
            gameDone = true;
            //update score display
            display();
            //Edit: if auto-restart is on, re-start automatically at end of game, & adjust victory
            if (autoRestart_var === 1) 
            {
                Victory.innerHTML = "<i>Reminder: The last match was a draw.</i>";
                startNewGame();
            } 
            else {
                //otherwise, display tie
                Victory.innerHTML = "<b>WHAT?! A TIE?!!! IMPOSSIBLE!</b>";

            }
        } else {
            turn = turn === "X" ? "O" : "X";
        }
    },

    /*
     * Creates and attaches the DOM elements for the board as an
     * HTML table, assigns the indicators for each cell, and starts
     * a new game.
     */
    play = function () {
        var board = $("<table border=1 cellspacing=0>"), indicator = 1;
        for (var i = 0; i < SIZE; i += 1) {
            var row = $("<tr>");
            board.append(row);
            for (var j = 0; j < SIZE; j += 1) {
                var cell = $("<td height=50 width=50 align=center valign=center></td>");
                cell[0].indicator = indicator;
                cell.click(set);
                row.append(cell);
                squares.push(cell);
                indicator += indicator;
            }
        }

        // Attach under tictactoe if present, otherwise to body.
        $(document.getElementById("tictactoe") || document.body).append(board);
        startNewGame();
    };

    play();
});


