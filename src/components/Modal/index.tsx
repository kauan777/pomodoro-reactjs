import { Modal, Button, Text, Input, Row } from "@nextui-org/react";
import { useCounter } from "../../hook/useCounter";

export function ModalContainer() {


  const { visible, setVisible, minutes, seconds } = useCounter();

  const handler = () => setVisible(true);


  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  return (
    <div>
      <Button auto shadow onClick={handler}>
        Open modal
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header className="cursor-default">
        <Row justify="space-between">

          <Text id="modal-title" className="text-gray-500" size={18}>
            Settings
          </Text>
 
            </Row>
        </Modal.Header>
        <Modal.Body>
        <div>
          <Text  className="text-gray-300 mb-0 cursor-default" size={14}>
            Time work
          </Text>
        </div>
          <Row justify="space-between" className="flex gap-2">
              <Input type="number" placeholder="" value={`${minutes.toString().padStart(2, "0")}`}/>
              <Input type="number" placeholder="" value={`${seconds.toString().padStart(2, "0")}`}/>
          </Row>
          <div>
          <Text  className="text-gray-300 mb-0 cursor-default" size={14}>
            Time break
          </Text>
        </div>
          <Row justify="space-between" className="flex gap-2">
              <Input type="number" placeholder="" value={`${minutes.toString().padStart(2, "0")}`}/>
              <Input type="number" placeholder="" value={`${seconds.toString().padStart(2, "0")}`}/>
          </Row>
          <Row>
            <button className="w-full bg-green-400 py-3 rounded-md text-white">
              Salvar mudanças
            </button>
          </Row>
        </Modal.Body>
        <Modal.Footer>


        </Modal.Footer>
      </Modal>
    </div>
  );
}
