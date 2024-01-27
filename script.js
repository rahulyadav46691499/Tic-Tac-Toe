let box = document.querySelectorAll('.box');
let new_game = document.querySelector('#new');
let winner_text = document.querySelector('h2');
let winners = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2]];
let turnO = true;
let turnX = false;
let count = 0; //if after 9 turns, game should be draw.
let game_end = false;


function check_winner(){
    for (let i of winners){
        if(box[i[0]].innerText!=='' && box[i[1]].innerText!=='' && box[i[2]].innerText!==''){
            if (box[i[0]].innerText===box[i[1]].innerText && box[i[1]].innerText===box[i[2]].innerText){
                return true;
            }
        }
    }
    return false;
}

for (let i of box){
    i.addEventListener('click',function(){
        if (game_end==false){
            if (turnO===true && turnX===false){
                i.innerText = 'O';
                if (check_winner()==true){
                    winner_text.innerText = 'Winner: Player O wins the game! \u{1F389}';
                    game_end = true;
                }
                turnO = false;
                turnX = true;
                count = count+1;
            }
            else if (turnO===false && turnX===true){
                i.innerText = 'X';
                if (check_winner()){
                    winner_text.innerText = 'Winner: Player X wins the game! \u{1F389}';
                    game_end = true;
                }
                turnO = true;
                turnX = false;
                count = count+1;
            }
            // now once you filled a square, you can't change that particular square.
            i.disabled = true;

            // Check for a draw
            if (count === 9 && check_winner()==false) {
                winner_text.innerText = 'The game ended in a draw! \u{1F91D}';
                game_end = true;
            }
        }
        if (game_end===true){
            winner_text.style.display = 'block';
            for (j of box){
                j.disabled = true;
                j.style.cursor = 'not-allowed';
            }
        }
    })
}

new_game.addEventListener('click',function(){
    winner_text.innerText = 'Winner:'
    winner_text.style.display = 'none';
    for (let k of box){
        k.innerText='';
        k.disabled = false;
        k.style.cursor = 'pointer';
    }
    turnO = true;
    turnX = false;
    count = 0;
    game_end = false;
})