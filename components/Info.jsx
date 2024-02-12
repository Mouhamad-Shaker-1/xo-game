import { useEffect, useState } from "react";

export default function Info(props) {

  function a() {
    console.log('done')
  }
  const gamesElements = props.allGame.map((game, index) => {
    if (game.isHold == false) {
      return (
        <button key={game.id}
          onClick={(e) => props.showOldGame(e, game.id)}
        >
          {`${index + 1}- ${
            game.woner == "no one" ? (
              'Draw'
            ) : (
              `(${game.woner}) woner`
            )
          }`}
        </button>
      );
    } else {
      return (
        <button className="hold">{`${index + 1}- (${
          game.woner
        }) woner`}</button>
      );
    }
  });

  return (
    <div className="info">
      {props.woner == "" ? (
        <h2>The role is for {props.turn ? "O" : "X"}</h2>
      ) : props.woner == "no one" ? (
        <h2>Draw</h2>
      ) : (
        <h2>the woner is {props.woner}</h2>
      )}
      {gamesElements}
      {props.view && <button onClick={props.startAgain}>start</button>}
    </div>
  );
}
