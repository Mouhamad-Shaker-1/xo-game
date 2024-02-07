import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useState, useEffect } from "react";
import Game from "../components/Game";
import Info from "../components/Info";

import { nanoid } from "nanoid";
import "./App.css";

function App() {

  const [view, setView] = useState(false)
  const [squarsRow, setSquarsRow] = useState(CreateSquars());
  const [turn, setTrun] = useState(false);
  const [woner, setWoner] = useState("");
  const [allGame, setAllGame] = useState([]);
  const [idHold, setIdHold] = useState('')


  function startAgain() {
    setView(false)
    setAllGame((oldGames) => oldGames.map(game => {
      return {...game, isHold: false}
    }));
  }

  function showOldGame(id) {
    setView(true)


    setAllGame((oldGames) => oldGames.map((game, index) => {
      if (game.id == id) {
        setIdHold(index)
        return {...game, isHold: true}
      } else {
        return {...game, isHold: false}
      }
      // setIdHold(index)
      // return game.id == id ? {...game, isHold: true} : {...game, isHold: false}
    }));
  }

  useEffect(() => {
    setTimeout(() => {
      setSquarsRow(CreateSquars());
      if (woner != "") {
        setAllGame((oldGame) => [
          ...oldGame,
          { id: nanoid(), woner: woner, isHold: false, gameSquars: squarsRow },
        ]);
      }
      setTrun(false);
      setWoner("");
    }, 1000);
  }, [woner]);

  useEffect(() => {
    knowWon();
  }, [turn]);

  function knowWon() {
    const allSquares = [...squarsRow[0], ...squarsRow[1], ...squarsRow[2]];

    if (
      allSquares[0].value == allSquares[1].value &&
      allSquares[0].value == allSquares[2].value &&
      allSquares[0].value != ""
    ) {
      setWoner(allSquares[0].value);
    } else if (
      allSquares[3].value == allSquares[4].value &&
      allSquares[3].value == allSquares[5].value &&
      allSquares[3].value != ""
    ) {
      setWoner(allSquares[3].value);
    } else if (
      allSquares[6].value == allSquares[7].value &&
      allSquares[6].value == allSquares[8].value &&
      allSquares[6].value != ""
    ) {
      setWoner(allSquares[6].value);
    } else if (
      allSquares[0].value == allSquares[3].value &&
      allSquares[0].value == allSquares[6].value &&
      allSquares[0].value != ""
    ) {
      setWoner(allSquares[0].value);
    } else if (
      allSquares[1].value == allSquares[4].value &&
      allSquares[1].value == allSquares[7].value &&
      allSquares[1].value != ""
    ) {
      setWoner(allSquares[1].value);
    } else if (
      allSquares[2].value == allSquares[5].value &&
      allSquares[2].value == allSquares[8].value &&
      allSquares[2].value != ""
    ) {
      setWoner(allSquares[2].value);
    } else if (
      allSquares[0].value == allSquares[4].value &&
      allSquares[0].value == allSquares[8].value &&
      allSquares[0].value != ""
    ) {
      setWoner(allSquares[0].value);
    } else if (
      allSquares[2].value == allSquares[4].value &&
      allSquares[2].value == allSquares[6].value &&
      allSquares[2].value != ""
    ) {
      setWoner(allSquares[2].value);
    }
  }

  function takeTrun(e, id) {
    if (!view) {
      if (e.target.value == "") {
        setTrun((old) => !old);
        setSquarsRow((oldSquare) =>
          oldSquare.map((row) =>
            row.map((square) => {
              return square.id == id
                ? { ...square, value: turn ? "O" : "X" }
                : square;
            })
          )
        );
      }
    }
  }

  return (
    <main>
      <Game squarsRow={view ? allGame[idHold].gameSquars :squarsRow}  takeTrun={takeTrun} />
      <Info
        turn={turn}
        woner={view ? allGame[idHold].woner : woner}
        allGame={allGame}
        idHold={idHold}
        showOldGame={showOldGame}
        view={view}
        startAgain={startAgain}
      />
    </main>
  );
}

function CreateSquars() {
  let squars = [];
  for (let i = 0; i < 3; i++) {
    let row = [];
    for (let i = 0; i < 3; i++) {
      row.push({ id: nanoid(), value: "" });
    }
    squars.push(row);
  }
  return squars;
}

export default App;
