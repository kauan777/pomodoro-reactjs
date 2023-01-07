import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal, Text, Input, Row } from "@nextui-org/react";
import { useCounter } from "../../hook/useCounter";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export function ModalContainer({ isModalOpen, setIsModalOpen }: Props) {
  if (!isModalOpen) {
    return null;
  }

  const { setSecondsAmount, saveSecondsAmountInLocalStorage } = useCounter();

  const [secondsAmountModal, setSecondsAmountModal] = useState<number>(
    Number(localStorage.getItem("secondsAmount"))
  );

  const MINUTES_MODAL = Math.floor(secondsAmountModal / 60);

  const closeHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal
        className="bg-white dark:bg-gray-600"
        closeButton
        aria-labelledby="modal-title"
        open={isModalOpen}
        onClose={closeHandler}
      >
        <Modal.Header className="cursor-default">
          <Row justify="space-between">
            <Text
              id="modal-title"
              className="text-gray-500 dark:text-white"
              size={18}
            >
              Settings
            </Text>
          </Row>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Text
              className="text-gray-300 mb-0 dark:text-gray-100 cursor-default"
              size={14}
            >
              Time in minutes
            </Text>
          </div>
          <Row justify="space-between" className="flex gap-2">
            <Input
              onChange={(e) =>
                setSecondsAmountModal(Number(e.target.value) * 60)
              }
              type="number"
              initialValue={`${MINUTES_MODAL.toString().padStart(2, "0")}`}
              min={0}
            />
            <button
              className="w-[50%] bg-gray-600 dark:bg-gray-50 dark:text-gray-500 py-2 rounded-md text-white"
              onClick={() => {
                setSecondsAmount(secondsAmountModal);
                saveSecondsAmountInLocalStorage(secondsAmountModal);
                setIsModalOpen(false);
              }}
            >
              Confirmar
            </button>
          </Row>

          <Row></Row>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
