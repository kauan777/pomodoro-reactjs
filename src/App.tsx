import { Header } from "./components/Header";
import { useCounter } from "./hook/useCounter";
import { Toaster } from "react-hot-toast";
import { ModalContainer } from "./components/Modal";
import { ArrowCounterClockwise, Pause, Play } from "phosphor-react";
import { MouseEvent, useEffect, useState, useRef } from "react";
import { useNotification } from "./utils/useNotification";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const { notifyBreakTimeAvaliable, notifyWorkAvaliable } = useNotification();
  const isFirstRender = useRef(true);


  const {
    workMinutes,
    breakMinutes,
    workSeconds,
    breakSeconds,
    secondsAmount,
    setSecondsAmount,
    breakSecondsAmount,
    setBreakSecondsAmount,
  } = useCounter();

  const [breakTime, setBreakTime] = useState(false);
  const [permisson, setPermission] = useState(false);
  const counterTimeoutRef = useRef(0);

  const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      throw new Error("Permissão negada");
    }
    setPermission(true);
  };

  const runNotificationPermission = async () => {
    try {
      await requestNotificationPermission();
    } catch (err: any) {
      console.log(err.message);
    }
  };

  runNotificationPermission();

  useEffect(() => {

    if (isFirstRender) {
      isFirstRender.current = false;
      return;
    }

    if (secondsAmount === 0) {
      notifyBreakTimeAvaliable();

      setIsPlaying(false);
      if (!breakTime) {
        setSecondsAmount(
          parseInt(localStorage.getItem("breakSecondsAmount") || "")
        );

        setBreakSecondsAmount(
          parseInt(localStorage.getItem("breakSecondsAmount") || "")
        );

        setBreakTime(true);
        console.log("STOP WORK, START BREAK");
      }
    }
    if (breakSecondsAmount == 0) {
      notifyWorkAvaliable();

      setIsPlaying(false);
      if (breakTime) {
        setSecondsAmount(
          parseInt(localStorage.getItem("workSecondsAmount") || "")
        );
        setBreakSecondsAmount(
          parseInt(localStorage.getItem("breakSecondsAmount") || "")
        );

        setBreakTime(false);
        console.log("STOP BREAK, START WORK");
      }
    }

    if (isPlaying) {
      if (!breakTime) {
        const ref = setTimeout(() => {
          setSecondsAmount((state: number) => state - 1);
        }, 1000);
        counterTimeoutRef.current = ref;
      } else {
        const ref = setTimeout(() => {
          setBreakSecondsAmount((state: number) => state - 1);
        }, 1000);
        counterTimeoutRef.current = ref;
      }
    }
  }, [secondsAmount, breakSecondsAmount]);

  // play

  function handleClickPlay(event: MouseEvent) {
    setIsPlaying(true);
    if (!breakTime) {
      setTimeout(() => {
        if (event.detail == 1) {
          setSecondsAmount((state: number) => state - 1);
        }
      }, 1000);
    } else {
      setTimeout(() => {
        if (event.detail == 1) {
          setBreakSecondsAmount((state: number) => state - 1);
        }
      }, 1000);
    }
  }

  function handleClickPause() {
    setIsPlaying(false);
    clearTimeout(counterTimeoutRef.current);
  }

  function handleClickReset() {
    setIsPlaying(false);
    clearTimeout(counterTimeoutRef.current);
    if (!breakTime) {
      setSecondsAmount(
        parseInt(localStorage.getItem("workSecondsAmount") || "")
      );
    } else {
      setBreakSecondsAmount(
        parseInt(localStorage.getItem("breakSecondsAmount") || "")
      );
    }
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Header setIsSettingsModalOpen={setIsSettingsModalOpen} />
      <ModalContainer
        isModalOpen={isSettingsModalOpen}
        setIsModalOpen={setIsSettingsModalOpen}
        setBreakSecondsAmount={setBreakSecondsAmount}
        setSecondsAmount={setSecondsAmount}
      />
      <main className="flex h-[100vh] items-center justify-center">
        <div>
          <span className="block text-center text-gray-200">
            {breakTime ? "Time break" : "Time work"}
          </span>
          <span className="animate-[wiggle_.2s_ease-in-out] text-8xl font-semibold text-gray-500 dark:text-gray-50">
            {!breakTime
              ? `${
                  workMinutes.toString().padStart(2, "0") +
                  ":" +
                  workSeconds.toString().padStart(2, "0")
                }`
              : `${
                  breakMinutes.toString().padStart(2, "0") +
                  ":" +
                  breakSeconds.toString().padStart(2, "0")
                }`}
          </span>
          {!permisson && (
            <span className="block text-red-500 mb-4">
              Você não ativou a notificação :(
            </span>
          )}
          <div className="flex gap-2 items-center justify-center">
            <button
              onClick={
                !isPlaying
                  ? (event) => handleClickPlay(event)
                  : handleClickPause
              }
              className=" animate-[wiggle_.2s_ease-in-out] text-gray-50 border border-gray-500 flex items-center justify-center gap-1 bg-gray-500 w-32 py-2 rounded-full dark:text-gray-500 dark:bg-gray-50 hover:bg-gray-600 transition-colors dark:hover:bg-slate-100"
            >
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
              )}
            </button>

            <button
              onClick={handleClickReset}
              className="animate-[wiggle_.2s_ease-in-out] text-gray-500 border border-gray-500 flex items-center justify-center gap-1 bg-transparent w-32 py-2 rounded-full dark:border-gray-50 dark:text-gray-50"
            >
              <ArrowCounterClockwise weight="bold" />
              RESET
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
