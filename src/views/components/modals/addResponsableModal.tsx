import { Button, Modal } from "flowbite-react";

import type { FC } from "react";
import React, { useState } from "react";
import { HiPlus } from "react-icons/hi";
import AddResponsableForm from "../forms/addResponsableForm";

const AddResponsableModal: FC<{ onClose: () => void }> = function () {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-3">
          <HiPlus className="text-xl" />
          Ajouter un responsable
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Ajouter un nouveau responsable</strong>
        </Modal.Header>
        <Modal.Body>
          <AddResponsableForm onClose={() => setOpen(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddResponsableModal;
