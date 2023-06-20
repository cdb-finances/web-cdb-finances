import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";

function useMain() {
  return useContext(MainContext);
}

export default useMain;