import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

interface CountContextProviderProps {
    children: ReactNode
}

interface CountContextProps {
    secondsAmount: number,
    setSecondsAmount: Dispatch<SetStateAction<number>>

    breakSecondsAmount: number 
    setBreakSecondsAmount: Dispatch<SetStateAction<number>>

    workMinutes: number
    workSeconds: number
    breakMinutes: number
    breakSeconds: number

    workMinutesModal: number
    setWorkMinutesModal: Dispatch<SetStateAction<number>>
    
    workSecondsModal: number
    setWorkSecondsModal: Dispatch<SetStateAction<number>>

    breakMinutesModal: number
    setBreakMinutesModal: Dispatch<SetStateAction<number>>

    breakSecondsModal: number
    setBreakSecondsModal: Dispatch<SetStateAction<number>>

}

export const CounterContext = createContext({} as CountContextProps);

export function CounterContextProvider({children}: CountContextProviderProps){

    const [secondsAmount, setSecondsAmount] = useState(parseInt(localStorage.getItem('workSecondsAmount') || "") || 1);
    const [breakSecondsAmount, setBreakSecondsAmount] = useState(parseInt(localStorage.getItem('breakSecondsAmount') || "") || 1);
    useEffect(() => {
        if(secondsAmount == 1){
            localStorage.setItem('workSecondsAmount', (25 * 60).toString()) 
            setSecondsAmount(parseInt(localStorage.getItem('workSecondsAmount') || ""));
        }
        if(breakSecondsAmount == 1){
            localStorage.setItem('breakSecondsAmount', (5 * 60).toString()) 
            setBreakSecondsAmount(parseInt(localStorage.getItem('breakSecondsAmount') || ""))
        }
    }, [])

    const [workMinutesModal, setWorkMinutesModal] = useState(0);
    const [workSecondsModal, setWorkSecondsModal] = useState(0);

    const [breakMinutesModal, setBreakMinutesModal] = useState(0);
    const [breakSecondsModal, setBreakSecondsModal] = useState(0);

    useEffect(() => {
        const workInSeconds = workMinutesModal * 60 + workSecondsModal
        console.log(workInSeconds)
        if(workInSeconds !== 0){
            console.log("atualizou")
          localStorage.setItem("workSecondsAmount", workInSeconds.toString())
          setSecondsAmount(workInSeconds)
        }
      }, [workMinutesModal, workSecondsModal])

      useEffect(() => {
        const breakInSeconds = breakMinutesModal * 60 + breakSecondsModal
        console.log(breakInSeconds)
        if(breakInSeconds !== 0){
            console.log("atualizou")
          localStorage.setItem("breakSecondsAmount", breakInSeconds.toString())
          setBreakSecondsAmount(breakInSeconds)
        }
      }, [breakMinutesModal, breakSecondsModal])

    
    const workMinutes = Math.floor(secondsAmount / 60);
    const workSeconds = secondsAmount % 60;
    
    const breakMinutes = Math.floor(breakSecondsAmount / 60);
    const breakSeconds = breakSecondsAmount % 60;


    return(
        <CounterContext.Provider value={{
            workMinutes,
            workSeconds,
            breakMinutes,
            breakSeconds,
            secondsAmount,
            setSecondsAmount,
            breakSecondsAmount,
            setBreakSecondsAmount,
            workSecondsModal,
            workMinutesModal,
            setWorkSecondsModal,
            setWorkMinutesModal,
            breakSecondsModal,
            setBreakSecondsModal,
            setBreakMinutesModal,
            breakMinutesModal
        }}>
            {children}
        </CounterContext.Provider>
    )
}