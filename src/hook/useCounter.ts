import { useContext } from "react";
import { CounterContext } from "../contexts/CountContext";

export const useCounter = () => useContext(CounterContext);
