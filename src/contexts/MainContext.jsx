import { createContext } from 'react'
import useMainProvider from "../hooks/useMainProvider";

export const MainContext = createContext({})

export function MainContextProvider({children}) {
  const values = useMainProvider();

  return (
    <MainContext.Provider value={values}>
      {children}
    </MainContext.Provider>
    )
}