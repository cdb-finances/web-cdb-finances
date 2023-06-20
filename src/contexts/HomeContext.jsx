import { createContext } from "react";
import useHomeProvider from "../hooks/useHomeProvider";

export const HomeContext = createContext({});

export function HomeProvider({ children }) {
  const HomeProvider = useHomeProvider();

  return (
    <HomeContext.Provider value={HomeProvider}>
      {children}
    </HomeContext.Provider>
  );
}
