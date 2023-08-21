import { Button, Modal } from "flowbite-react";

import type { FC } from "react";
import React, { useState } from "react";
import { HiPlus } from "react-icons/hi";
import AddEmployerForm from "../forms/addEmployerForm";

const AddEmployerModal: FC<{ onClose: () => void }> = function () {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center border-b border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-800">

        <Button color="primary" className="text-sm py-1 px-2" onClick={() => setOpen(true)}>
          <div className="flex items-center gap-x-2">
            <HiPlus className="text-lg" />
            Ajouter un employé
          </div>
        </Button>
      </div>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Ajouter un nouveau employé</strong>
        </Modal.Header>
        <Modal.Body>
          <AddEmployerForm onClose={() => setOpen(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddEmployerModal;
