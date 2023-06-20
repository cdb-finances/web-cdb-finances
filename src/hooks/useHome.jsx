import { useContext } from "react";
import { HomeContext } from "../contexts/HomeContext";

function useHome() {
  return useContext(HomeContext);
}

export default useHome;
