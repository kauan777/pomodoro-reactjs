import { ModalContainer } from "./components/Modal";
import { ArrowCounterClockwise, Pause, Play } from "phosphor-react"
import { MouseEvent, useEffect, useState, useRef } from "react"
import { Header } from "./components/Header"
import { useCounter } from "./hook/useCounter";


function App() {

  const [isPlaying, setIsPlaying] = useState(false);
  
  const {
    secondsAmount,
    setSecondsAmount,
    COUNTDOWN_BREAK_TIME_IN_SECONDS,
    COUNTDOWN_INITIAL_TIME_IN_SECONDS,
    minutes,
    seconds
  } = useCounter();


  
  const [breakTime, setBreakTime] = useState(false);
  const counterTimeoutRef = useRef(0);

  useEffect(() => {
    if (secondsAmount === 0) {
      alert("Acabou");
      if(!breakTime){
        setSecondsAmount(COUNTDOWN_BREAK_TIME_IN_SECONDS);
        setBreakTime(true)
        setIsPlaying(false);  
        return;
      }else{
      setIsPlaying(false);
        setSecondsAmount(COUNTDOWN_INITIAL_TIME_IN_SECONDS);
        setBreakTime(false)
      }
    }
  
    if (isPlaying) {  
      const ref = setTimeout(() => {
        setSecondsAmount((state: number) => state - 1);
      }, 1000);
      counterTimeoutRef.current = ref;
    }
  }, [secondsAmount]) 

  // play

  function handleClickPlay(event: MouseEvent) {
    setIsPlaying(true);
    setTimeout(() => {
     if (event.detail == 1){
        setSecondsAmount((state: number) => state - 1);
    }
    },1000)
  }

  function handleClickPause() {
    setIsPlaying(false);
    clearTimeout(counterTimeoutRef.current);
  }

  function handleClickReset() {
    setIsPlaying(false);
    clearTimeout(counterTimeoutRef.current);
    if(!breakTime){
      setSecondsAmount(COUNTDOWN_INITIAL_TIME_IN_SECONDS);
    }else{
      setSecondsAmount(COUNTDOWN_BREAK_TIME_IN_SECONDS);

    }
  }

  return (
    <>
      <Header />
      <ModalContainer/>
      <main className="flex h-[100vh] items-center justify-center">
        <div>
          <span className="block text-center text-gray-200">{breakTime ? "Time break" : "Time work"}</span>
          <span className="animate-[wiggle_.2s_ease-in-out] text-8xl font-semibold text-gray-500 dark:text-gray-50">{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}</span>
          <div className="flex gap-2 items-center justify-center">

            <button
              onClick={!isPlaying ? event => handleClickPlay(event) : handleClickPause}
              className=" animate-[wiggle_.2s_ease-in-out] text-gray-50 border border-gray-500 flex items-center justify-center gap-1 bg-gray-500 w-32 py-2 rounded-full dark:text-gray-500 dark:bg-gray-50 hover:bg-gray-600 transition-colors dark:hover:bg-slate-100">
              {!isPlaying ? (
                <>
                  <Play weight="bold" />
                  PLAY
                </>
              ) : (
                <>
                  <Pause weight="bold" />
                  PAUSE
                </>
              )
              }
            </button>

            <button 
              onClick={handleClickReset}
              className="animate-[wiggle_.2s_ease-in-out] text-gray-500 border border-gray-500 flex items-center justify-center gap-1 bg-transparent w-32 py-2 rounded-full dark:border-gray-50 dark:text-gray-50">
              <ArrowCounterClockwise weight="bold" />
              RESET
            </button>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
