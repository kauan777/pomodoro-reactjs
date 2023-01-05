import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface CountContextProviderProps {
  children: ReactNode;
}

interface CountContextProps {
  secondsAmount: number;
  isBreakTime: boolean;
  isPlaying: boolean;
  minutes: number;
  seconds: number;
  play(): void;
  pause(): void;
  reset(): void;
  setSecondsAmount: Dispatch<SetStateAction<number>>;
  saveSecondsAmountInLocalStorage(value: number): void;
  setIsBreakTime: Dispatch<SetStateAction<boolean>>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

export const CounterContext = createContext({} as CountContextProps);

export function CounterContextProvider({
  children,
}: CountContextProviderProps) {
  const [secondsAmount, setSecondsAmount] = useState<number>(25 * 60);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isBreakTime, setIsBreakTime] = useState<boolean>(false);

  const counterTimeoutRef = useRef(0);
  const minutes = Math.floor(secondsAmount / 60);
  const seconds = secondsAmount % 60;

  const SECONDS_AMOUNT_LOCALSTORAGE = localStorage.getItem("secondsAmount");

  console.log("render");

  useEffect(() => {
    if (SECONDS_AMOUNT_LOCALSTORAGE) {
      setSecondsAmount(Number(SECONDS_AMOUNT_LOCALSTORAGE));
      return;
    }
    saveSecondsAmountInLocalStorage(secondsAmount);
  }, []);

  useEffect(() => {
    clearTimeout(counterTimeoutRef.current);
    if (isPlaying) {
      if (secondsAmount == 0) {
        setIsBreakTime(!isBreakTime);
        setIsPlaying(false);
      }

      const ref = setTimeout(() => {
        setSecondsAmount((state) => state - 1);
      }, 1000);
      counterTimeoutRef.current = ref;
    }
  }, [secondsAmount, isPlaying]);

  useEffect(() => {
    if (isBreakTime) {
      setIsPlaying(false);
      const SECONDS_AMOUNT_BREAKTIME =
        (Number(SECONDS_AMOUNT_LOCALSTORAGE) / 60 / 5) * 60;
      setSecondsAmount(SECONDS_AMOUNT_BREAKTIME);
      return;
    }
    setSecondsAmount(Number(SECONDS_AMOUNT_LOCALSTORAGE));
  }, [isBreakTime]);

  function play() {
    setIsPlaying(!isPlaying);
  }

  function pause() {
    setIsPlaying(false);
    clearTimeout(counterTimeoutRef.current);
  }

  function reset() {
    setIsPlaying(false);
    clearTimeout(counterTimeoutRef.current);
    setSecondsAmount(Number(localStorage.getItem("secondsAmount")));
  }

  function saveSecondsAmountInLocalStorage(value: number) {
    localStorage.setItem("secondsAmount", value.toString());
  }

  return (
    <CounterContext.Provider
      value={{
        secondsAmount,
        setSecondsAmount,
        isBreakTime,
        setIsBreakTime,
        isPlaying,
        setIsPlaying,
        minutes,
        seconds,
        play,
        pause,
        reset,
        saveSecondsAmountInLocalStorage,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
}
