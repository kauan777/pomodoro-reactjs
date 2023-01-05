import { Header } from "./components/Header";
import { useCounter } from "./hook/useCounter";
import { Toaster } from "react-hot-toast";
import { ModalContainer } from "./components/Modal";
import { ArrowCounterClockwise, Pause, Play } from "phosphor-react";
import { MouseEvent, useEffect, useState, useRef } from "react";
import Button from "./components/Button";

function App() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const { isBreakTime, isPlaying, minutes, seconds, play, pause, reset } =
    useCounter();

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Header setIsSettingsModalOpen={setIsSettingsModalOpen} />
      <ModalContainer
        isModalOpen={isSettingsModalOpen}
        setIsModalOpen={setIsSettingsModalOpen}
      />
      <main className="flex h-[100vh] items-center justify-center">
        <div>
          <span className="block text-center text-gray-200">
            {isBreakTime ? "Time break" : "Time work"}
          </span>
          <span className="animate-[wiggle_.2s_ease-in-out] text-8xl font-semibold text-gray-500 dark:text-gray-50">
            {minutes.toString().padStart(2, "0") +
              ":" +
              seconds.toString().padStart(2, "0")}
          </span>
          {/* {!true && (
            <span className="block text-red-500 mb-4">
              Você não ativou a notificação :(
            </span>
          )} */}
          <div className="flex gap-2 items-center justify-center">
            {!isPlaying ? (
              <Button icon={<Play />} description="PLAY" onClick={play} />
            ) : (
              <Button icon={<Pause />} description="PAUSE" onClick={pause} />
            )}

            <button
              onClick={reset}
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
