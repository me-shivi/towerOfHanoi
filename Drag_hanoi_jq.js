$(document).ready(function () {
    // Alert box for Help
    $(".help_icon").click(function () {
        alert("HELP:- \n 1. The goal of the puzzle is to move all the disks from the leftmost position to the rightmost position. \n 2. You can move only that disk which is on the top of a tower. \n 3. You can move this disk either to an empty position or on top of a disk which is bigger. \n 4. On click of Small tower button, 4 disks will be there in the game. \n On click of Medium tower button, 5 disks will be there in the game. \n On click of Big tower button, 6 disks will be there in the game.");
    })

    // Event of Small button
    $(".small_button").on('click', function () {
        initGame($tower.eq(0), 4);
        $('.moves').html('0/15');
        setMaxMoves(4);
    })

    // Event on Medium button
    $(".medium_button").on('click', function () {
        initGame($tower.eq(0), 5);
        $('.moves').html('0/31');
        setMaxMoves(5);
    })

    // Event of Big button
    $(".big_button").on('click', function () {
        initGame($tower.eq(0), 6);
        $('.moves').html('0/63');
        setMaxMoves(6);
    })

    // Variables
    let moves,
    maxMoves,
    $canves = $('.canves'),
    $tower = $canves.find('.tower'),
    $panel = $canves.find('.moves'),
    $movesCount = $panel.find('.moves');

    // Create Disks
    function initGame(tower, num) {
        let gameover = false;
        disksNum = num;
        $tower.html('');
        moves = 0;
        holding = [];
        let dis;

        for (dis = 1; dis <= disksNum; dis += 1) {
            tower.prepend($('<div class="disk disk-' + dis + '" data-value="' + dis + '"></div>'));
        }
        let $blocks = $('.disk');
        //since only last child of every block
        let $movableBlocks = $('.disk:last-child');
        $movableBlocks.addClass("movable");
        
        $blocks.draggable({
            revert: true
        });

        $tower.droppable({
            accept: ".movable",
            drop: function (event, ui) {
                if (!gameover) {
                    if (goodToDrop($(this), ui.draggable)) {
                        ui.draggable.draggable('option', 'revert', false);
                        $(this).append(ui.draggable.detach());
                        ui.draggable.css({
                            'top': 0,
                            'left': 0,
                        });
                        $movableBlocks = $('.disk:last-child');
                        $('.disk').removeClass("movable");
                        $movableBlocks.addClass("movable");
                        $blocks.draggable({
                            revert: true
                        });
                        //ForWin
                        checkForWin();
                    }
                } else {
                    initGame($tower.eq(0), disksNum);
                }
            }
        });

        function goodToDrop($stack, $block) {
            let $last_block = $stack.children().last();
            if ($block.width() < $last_block.width() || $stack.children().length === 0) {
                moves = moves + 1;
                $('.moves').html(moves + "/" + maxMoves);
                gameLose();
                return true;
            } else {
                return false;
            }
        }
    }

    // Function to set Maximum Moves
    function setMaxMoves(chance) {
        ch = chance;
        if (ch === 4) {
            maxMoves = 15;
        } else if (ch === 5) {
            maxMoves = 31;
        } else if (ch === 6) {
            maxMoves = 63;
        }
    }

    initGame($tower.eq(2));

    // Function for Lose game
    function gameLose() {
        if (moves > maxMoves && $('#tower_third').children.length !== disksNum) {
            let loose = setTimeout(loseAlert, 100);
        }
    }

    // Function for Win Game
    function checkForWin() {
        if (moves === maxMoves && $('#tower_third').children().length === disksNum) {
            let win = setTimeout(winAlert, 100);
        }
    }
});

function loseAlert () {
    alert("You Lose!");
    document.location.reload();
    gameover = true;
}

function winAlert() {
    alert("You Won!");
    document.location.reload();
    gameover = true;
}