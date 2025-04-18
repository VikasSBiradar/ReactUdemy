import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";

const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];


function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';
      if (gameTurns.length > 0 && gameTurns[0].player == 'X') {
        currentPlayer = 'O';
       }
  return currentPlayer;
}

function App() {

  const [players, setPlayers] = useState({
    X : 'Player 1',
    O : 'Player 2'
  })
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameboard.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  let winner = null;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol == secondSquareSymbol && firstSquareSymbol == thirdSquareSymbol){
      winner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.Length && !winner;

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol] : newName
      }
    })
  }

  function handleSelectSquare(rowIndex, colIndex){
    // setActivePlayer((currentActivePlayer)=>{ return currentActivePlayer == 'X' ? 'O' : 'X';
    // })
    setGameTurns((prevTurns) => {
     const currentPlayer =  deriveActivePlayer(prevTurns)
      
      const updatedTurns = [
        {square : {row : rowIndex, col : colIndex},player : currentPlayer}, ...prevTurns,
      ]
      return updatedTurns;
    })

  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
            <Player onChangeName = {handlePlayerNameChange} initialName="Player 1" symbol="X" isActive={activePlayer == 'X'}/>    
            <Player onChangeName = {handlePlayerNameChange} initialName="Player 2" symbol="O" isActive={activePlayer == 'O'}/>         
        </ol>
       
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare = {handleSelectSquare}  board = {gameBoard}/>
      </div>
      <Log turns={gameTurns}></Log> 
    </main>

  )
}

export default App
