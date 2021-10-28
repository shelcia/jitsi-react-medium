import React, { useState, createContext } from "react";

export const MeetContext = createContext();

export const MeetProvider = ({ children }) => {
  const [name, setName] = useState("");

  return (
    <MeetContext.Provider value={[name, setName]}>
      {children}
    </MeetContext.Provider>
  );
};
