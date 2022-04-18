const cellElements = document.querySelectorAll(".game-board .cell");
const player1 =document.querySelector(".players .player1");
const player2 =document.querySelector(".players .player2");
const result =document.querySelector(".result");
const result_text = document.querySelector(".result h1");
const restart_btn =document.querySelector(".result button");
const drawGames =document.getElementById("drawGames");
const playerOneScore =document.getElementById("playerOneScore");
const playerTwoScore =document.getElementById("playerTwoScore");




const WINNING_CONDITIONS =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]      

const player0 ="0";
const playerX ="X";
let toggleTurn =true;
let games = [];
cellElements.forEach(cell =>{
    cell.onclick=()=>{

        
        //console.log(cell.innerText);
        let currentPlayer = toggleTurn ? player0 : playerX;
        cell.classList.add("disabled");
        //cell.innerHTML = currentPlayer;

        addInCell(cell , currentPlayer);


        if(winnerCheck(currentPlayer)){
            games.push(currentPlayer);
            if(currentPlayer == '0') {
                playerOneScore.innerText=  parseInt(playerOneScore.innerText) +1 ;
            }


            if(currentPlayer == 'X') {
                playerTwoScore.innerText=  parseInt(playerTwoScore.innerText) +1 ;
            }            //result.classList.remove("inactive");
            addInactive();
            result_text.innerText =currentPlayer + "Win the Game";    
        }else if(isDraw()){
            games.push('D');
            drawGames.innerText=  parseInt(drawGames.innerText) +1 ;
            addInactive();
            result_text.innerText = "Draw the Game";
              
        }else{
            
        swapPlayer();
        }
    
    }
})

function resetGame() {
    cellElements.forEach(cell =>{
        cell.classList.remove("X");
        cell.classList.remove("disabled");
        cell.classList.remove("0");
        cell.innerHTML = '';
    
    })
    
}


function winnerCheck(currentPlayer){
    return WINNING_CONDITIONS.some(condition=>{
        //console.log(condition);
        return condition.every(index=>{
            return cellElements[index].classList.contains(currentPlayer);

        });
    })
}

function isDraw(){
   return [...cellElements].every(cell=>{
        return cell.classList.contains(playerX) || cell.classList.contains(player0);
    })
}


function swapPlayer(){
    toggleTurn = !toggleTurn;
    if(toggleTurn){
        player1.classList.add("active");
        player2.classList.remove("active");
    }else{
        player2.classList.add("active");
        player1.classList.remove("active");

    }

}

function addInCell(cell , currentPlayer){
    cell.innerHTML = currentPlayer;
    cell.classList.add(currentPlayer);
    
} 

function addInactive(){
    result.classList.remove("inactive");

}
restart_btn.onclick= () => {
    resetGame()
    console.log(games);
    //location.reload();
  result.classList.add("inactive"); 

}





