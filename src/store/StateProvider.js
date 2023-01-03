import React, { createContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({ children, reducer, initState }) => {
  const [appData, dispatchAction] = useReducer(reducer, initState);

  return (
    <StateContext.Provider value={[appData, dispatchAction]}>
      {children}
    </StateContext.Provider>
  );
};
