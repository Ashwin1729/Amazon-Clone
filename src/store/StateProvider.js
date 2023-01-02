import React, { createContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({ children, reducer, initState }) => {
  const [appData] = useReducer(reducer, initState);

  return (
    <StateContext.Provider value={appData}>{children}</StateContext.Provider>
  );
};
