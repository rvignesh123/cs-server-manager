import React, { useState, createContext } from "react";
export const GameContext = createContext();
const GameContextProvider = (props) => {
  const [status, setStatus] = useState(false);
  return (
    <GameContext.Provider
      value={{
        status: status,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
