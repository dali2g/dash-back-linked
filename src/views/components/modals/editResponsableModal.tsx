import { Button, Label, Modal, TextInput } from "flowbite-react";

import type { FC } from "react";
import React, { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import EditResponsableForm from "../forms/editResponsableForm";

interface Responsable {
  id: number;
  image: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phone: string;
  matricule: string;
  password: string;
}

interface EditResponsableModalProps {
  responsable: Responsable;
}

const EditResponsableModal: FC<EditResponsableModalProps> = function ({
  responsable,
}) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-2">
          <HiOutlinePencilAlt className="text-lg" />
          Modifier
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>
            Modifier les informations de {responsable.firstName}{" "}
            {responsable.lastName}
          </strong>
        </Modal.Header>
        <Modal.Body>
          <EditResponsableForm
            responsable={responsable}
            onClose={() => setOpen(false)}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditResponsableModal;
