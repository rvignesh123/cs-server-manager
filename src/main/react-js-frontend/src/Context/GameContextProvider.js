import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
export const GameContext = createContext();
const GameContextProvider = (props) => {
  const [status, setStatus] = useState(false);
  const [log, setLog] = useState("");



/*useEffect(()=>{
  getServerStatus();
},[]);*/



  /*var serverInfo = setInterval(() => {
    getServerStatus();
  }, 18000); */

  /*setTimeout(()=>{
    clearInterval(serverInfo);
  },18000);*/


  const getServerStatus=()=>{
    console.log("Status Server Call")
    axios
    .post("http://localhost:8080/server/serverStatus")
    .then((response) => response.data)
    .then((data) => {
      console.log(data);
      const {isRunning, output} = data;
      setLog(output);
      setStatus(isRunning);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const runCommand=(command)=>{
    axios
    .post("http://localhost:8080/server/writeCommand",{"command":command})
    .then((response) => response.data)
    .then((data) => {
      
    })
    .catch((error) => {
      console.log(error);
      
    });
  };


  return (
    <GameContext.Provider
      value={{
        status: status,
        setStatus : setStatus,
        log : log,
        getServerStatus : getServerStatus,
        runCommand: runCommand
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
