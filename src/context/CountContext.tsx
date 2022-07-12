import { createContext, ReactNode, useState } from "react";

interface CountContextProviderProps {
    children: ReactNode
}

interface CountContextProps {
    secondsAmount: number
    setSecondsAmount: (secondsAmount: any) => void
    COUNTDOWN_BREAK_TIME_IN_SECONDS: number
    COUNTDOWN_INITIAL_TIME_IN_SECONDS: number

    minutes: number
    seconds: number

    visible: boolean
    setVisible: (visible: boolean) => void
}

export const CounterContext = createContext({} as CountContextProps);

export function CounterContextProvider({children}: CountContextProviderProps){

    const COUNTDOWN_INITIAL_TIME_IN_SECONDS = 23 * 60;
    const COUNTDOWN_BREAK_TIME_IN_SECONDS = 5 * 60;

    const [secondsAmount, setSecondsAmount] = useState(COUNTDOWN_INITIAL_TIME_IN_SECONDS);

    const minutes = Math.floor(secondsAmount / 60);
    const seconds = secondsAmount % 60;

    const [visible, setVisible] = useState(false);

    
    return(
        <CounterContext.Provider value={{
            secondsAmount,
            setSecondsAmount,
            COUNTDOWN_BREAK_TIME_IN_SECONDS,
            COUNTDOWN_INITIAL_TIME_IN_SECONDS,
            minutes, 
            seconds,

            visible,
            setVisible
        }}>
            {children}
        </CounterContext.Provider>
    )
}