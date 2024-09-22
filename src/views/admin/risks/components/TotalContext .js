import React, { createContext, useContext, useState } from 'react';

const TotalContext = createContext();

export const TotalProvider = ({ children }) => {
  const [totalValue, setTotalValue] = useState(0);

  return (
    <TotalContext.Provider value={{ totalValue, setTotalValue }}>
      {children}
    </TotalContext.Provider>
  );
};

export const useTotal = () => useContext(TotalContext);
