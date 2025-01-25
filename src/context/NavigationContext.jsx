import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const [selectedTitle, setSelectedTitle] = useState("Dashboard");

  return (
    <NavigationContext.Provider value={{ selectedTitle, setSelectedTitle }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
} 