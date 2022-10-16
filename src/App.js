import "./App.css";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";
import { useState } from "react";

const actions = {
  rock: ["scissors"],
  paper: ["rock"],
  scissors: ["paper"],

};

function randomAction() {
  const keys = Object.keys(actions);
  const index = Math.floor(Math.random() * keys.length);

  return keys[index];
}

function calculateWinner(action1, action2) {
  if (action1 === action2) {
    return 0;
  } else if (actions[action1].includes(action2)) {
    return -1;
  } else if (actions[action2].includes(action1)) {
    return 1;
  }

  // This should never really happen
  return null;
}

function ActionIcon({ action, ...props }) {
  const icons = {
    rock: FaHandRock,
    paper: FaHandPaper,
    scissors: FaHandScissors,

  };
  const Icon = icons[action];
  return <Icon {...props} />;
}


function Player({ name = "Player", score = 0, action = "rock" }) {
  return (
    <div className="player">
      <p className="score">{`${name}: ${score}`}</p>
      <div className="action">
        {action && <ActionIcon action={action} size={60} />}
      </div>
    </div>
  );
}

function ActionButton({ action = "rock", onActionSelected }) {
  return (
    <button className="round-btn" onClick={() => onActionSelected(action)}>
      <ActionIcon className="action" action={action} size={20} />
    </button>
  );
}

function ShowWinner({ winner = 0 }) {
  const text = {
    "-1": "You Win!",
    0: "It's a Tie",
    1: "You Lose!",
  };

  return (
    <h2 className="winner">{text[winner]}</h2>
  )
}

function App() {
  const [playerAction, setPlayerAction] = useState("");
  const [computerAction, setComputerAction] = useState("");
  const [winTab, setWinTab] = useState("dnone");
  const [winnerName, setWinnerName] = useState("Win");
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [winner, setWinner] = useState(0);

  
  function WinnerTab() {
    let ps=0;
    let cs=0;
    if(playerScore===9){
      ps=10;
      cs=computerScore;
    }else{
      cs=10;
      ps=playerScore;
    }

    return (<div className={winTab}>
              <p className="winnerMessage">You {winnerName} the Game</p>
              
              <p className="score">Score-{ps}:{cs}</p>
            </div>)
  }
  

  const onActionSelected = (selectedAction) => {
    const newComputerAction = randomAction();

    setPlayerAction(selectedAction);
    setComputerAction(newComputerAction);

    const newWinner = calculateWinner(selectedAction, newComputerAction);
    setWinner(newWinner);
    if (newWinner === -1 && playerScore < 9) {
      setPlayerScore(playerScore + 1);
    } else if (newWinner === 1 && computerScore < 9) {
      setComputerScore(computerScore + 1);
    } else if (newWinner !== 0 && playerScore === 9) {
      
      setWinTab("WinTab");
      
      

    } else if (newWinner !== 0 && computerScore === 9) {
      
      setWinnerName("Lose");
      setWinTab("WinTab");
      
      

    }
  };
  return (
    <div className="center">
      <h1 className="title">Rock Paper Scissors</h1>
      <div>
        <div className="container">
          <Player name="Player" score={playerScore} action={playerAction} />
          <Player name="Computer" score={computerScore} action={computerAction} />

        </div>

        <ShowWinner winner={winner} />

        <div className="actions">
          <ActionButton action="rock" onActionSelected={onActionSelected} />
          <ActionButton action="paper" onActionSelected={onActionSelected} />
          <ActionButton action="scissors" onActionSelected={onActionSelected} />

        </div>
        <WinnerTab />
      </div>
    </div>
  );
}

export default App;