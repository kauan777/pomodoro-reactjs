import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Modal, Text, Input, Row } from "@nextui-org/react";
import { useCounter } from '../../hook/useCounter';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setBreakSecondsAmount: Dispatch<SetStateAction<number>>
  setSecondsAmount: Dispatch<SetStateAction<number>>
}

export function ModalContainer({ isModalOpen, setIsModalOpen}: Props) {
 
  const {setWorkMinutesModal, setWorkSecondsModal, setBreakSecondsModal, setBreakMinutesModal, secondsAmount, breakSecondsAmount} = useCounter()

  const closeHandler = () => {
    setIsModalOpen(false);
  };

  const [workSecondsAmountModal, setWorkSecondsAmountModal ] = useState(0);
  const [breakSecondsAmountModal, setBreakSecondsAmountModal ] = useState(0);

  useEffect(() => {
    setWorkSecondsAmountModal(parseInt(localStorage.getItem("workSecondsAmount") || ""))
    setBreakSecondsAmountModal(parseInt(localStorage.getItem("breakSecondsAmount") || ""))
  }, [secondsAmount, breakSecondsAmount])

  const INITIAL_WORK_MINUTES = Math.floor(workSecondsAmountModal / 60);
  const INITIAL_WORK_SECONDS = workSecondsAmountModal % 60
  
  const INITIAL_BREAK_MINUTES = Math.floor(breakSecondsAmountModal / 60);
  const INITIAL_BREAK_SECONDS = breakSecondsAmountModal % 60

  return (
    <div>
      <Modal
        className='bg-white dark:bg-gray-600'
        closeButton
        aria-labelledby="modal-title"
        open={isModalOpen}
        onClose={closeHandler}
      >
        <Modal.Header className="cursor-default">
        <Row justify="space-between">

          <Text id="modal-title" className="text-gray-500 dark:text-white" size={18}>
            Settings
          </Text>
 
            </Row>
        </Modal.Header>
        <Modal.Body>
        <div>
          <Text  className="text-gray-300 mb-0 dark:text-gray-100 cursor-default" size={14}>
            Time work
          </Text>
        </div>
          <Row justify="space-between" className="flex gap-2">
              <Input
                type="number"
                onChange={(e) => {
                  parseInt(e.target.value) < 10 && (e.target.value = "0" + e.target.value.toString())
                  setWorkMinutesModal(parseInt(e.target.value));
                }
                }
                initialValue={`${INITIAL_WORK_MINUTES.toString().padStart(2, "0")}`}
                min={0} 
              />
              <Input 
                type="number"
                onChange={
                  (e) => {parseInt(e.target.value) < 10 && (e.target.value = "0" + e.target.value.toString())
                  setWorkSecondsModal(parseInt(e.target.value));
              }
                }
                initialValue={`${INITIAL_WORK_SECONDS.toString().padStart(2, "0")}`} 
                min={0}
                 />
          </Row>
          <div>
          <Text  className="text-gray-300 mb-0 cursor-default dark:text-gray-100  " size={14}>
            Time break
          </Text>
        </div>
          <Row justify="space-between" className="flex gap-2">
          <Input 
                type="number"
                onChange={(e) => {
                  parseInt(e.target.value) < 10 && (e.target.value = "0" + e.target.value.toString())
                  setBreakMinutesModal(parseInt(e.target.value));
                }
                }
                initialValue={`${INITIAL_BREAK_MINUTES.toString().padStart(2, "0")}`}
                min={0} 
              />
              <Input 
                type="number"
                onChange={
                  (e) => {parseInt(e.target.value) < 10 && (e.target.value = "0" + e.target.value.toString())
                  setBreakSecondsModal(parseInt(e.target.value));
              }
                }
                initialValue={`${INITIAL_BREAK_SECONDS.toString().padStart(2, "0")}`} 
                min={0}
                 /> 
          </Row>
          <Row>
            <button className="w-[50%] bg-gray-600 dark:bg-gray-50 dark:text-gray-500 py-2 rounded-md text-white" onClick={() => {
              setIsModalOpen(false)
            }}>
              Ok
            </button>
          </Row>
        </Modal.Body>
        <Modal.Footer>


        </Modal.Footer>
      </Modal>
    </div>
  );
}
