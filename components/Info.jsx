import { useEffect, useState } from "react";

export default function Info(props) {
  const gamesElements = props.allGame.map((game, index) => {
    if (game.isHold == false) {
      return (
        <button
          key={game.id}
          onClick={() => props.showOldGame(game.id)}
        >{`${
          index + 1
        }- (${game.woner}) woner`}</button>
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
      ) : (
        <h2>the woner is {props.woner}</h2>
      )}
      {gamesElements}
      {props.view && <button onClick={props.startAgain}>start</button>}
    </div>
  );
}
