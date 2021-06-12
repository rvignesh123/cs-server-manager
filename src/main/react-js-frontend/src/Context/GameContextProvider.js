import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
export const GameContext = createContext();
const GameContextProvider = (props) => {
  const [status, setStatus] = useState(false);
  const [log, setLog] = useState("");



  useEffect(()=>{
    getServerStatus();
  },[]);


  
  /*var serverInfo = setInterval(() => {
    getServerStatus();
  }, 18000); */

  /*setTimeout(()=>{
    clearInterval(serverInfo);
  },18000);*/


  const getServerStatus=()=>{
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


  return (
    <GameContext.Provider
      value={{
        status: status,
        setStatus : setStatus,
        log : log,
        getServerStatus : getServerStatus()
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
