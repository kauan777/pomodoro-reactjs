import { ArrowCounterClockwise, Pause, Play } from "phosphor-react"
import { useEffect, useState } from "react"
import { Header } from "./components/Header"


function App() {

  const [isPlaying, setIsPlaying] = useState(false);

  const COUNTDOWN_INITIAL_TIME_IN_SECONDS = 25 * 60;
  const [secondsAmount, setSecondsAmount] = useState(COUNTDOWN_INITIAL_TIME_IN_SECONDS);

  const minutes = Math.floor(secondsAmount / 60);
  const seconds = secondsAmount % 60

  useEffect(() => {

    if (secondsAmount === 0) {
      alert("Acabou")
      return;
    }
    if (secondsAmount > 0 && isPlaying == true) {
      setTimeout(() => {
        setSecondsAmount(state => state - 1)
      }, 1000)
    }
  }, [secondsAmount])


  async function handleClickPlay() {
      setIsPlaying(!isPlaying);
      setSecondsAmount(state => state - 1);
  }


  return (
    <>
      <Header />
      <main className="flex h-[100vh] items-center justify-center">
        <div>
          <span className="animate-[wiggle_.2s_ease-in-out] text-8xl font-semibold text-gray-500 dark:text-gray-50">{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}</span>
          <div className="flex gap-2 items-center justify-center">

            <button
              onClick={handleClickPlay}
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

            <button className="animate-[wiggle_.2s_ease-in-out] text-gray-500 border border-gray-500 flex items-center justify-center gap-1 bg-transparent w-32 py-2 rounded-full dark:border-gray-50 dark:text-gray-50">
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
