import { useContext } from "react";
import { CounterContext } from "../context/CountContext";


export const useCounter = () => useContext(CounterContext)