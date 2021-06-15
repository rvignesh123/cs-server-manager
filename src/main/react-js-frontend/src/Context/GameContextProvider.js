import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { ROOT_URL } from "./actions";
export const GameContext = createContext();
const GameContextProvider = (props) => {
  const [status, setStatus] = useState(false);
  const [log, setLog] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  const getServerStatus = (lineCount) => {
    console.log("Status Server Call");
    return axios
      .post(ROOT_URL + "/server/serverStatus", {
        lineCount: lineCount,
      })
      .then((response) => response.data)
      .then((data) => {
        const { isRunning, output, lineCount } = data;
        setLog(output);
        setStatus(isRunning);
        setTotalCount(lineCount);
        return data;
      });
  };

  const runCommand = (command) => {
    return axios
      .post(ROOT_URL + "/server/writeCommand", { command: command })
      .then((response) => response.data);
  };

  return (
    <GameContext.Provider
      value={{
        status: status,
        setStatus: setStatus,
        log: log,
        getServerStatus: getServerStatus,
        runCommand: runCommand,
        totalCount: totalCount,
        setLog: setLog,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
