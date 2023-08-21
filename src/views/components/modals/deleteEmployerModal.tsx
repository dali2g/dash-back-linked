import axios from "axios";
import { Button, Modal } from "flowbite-react";

import type { FC } from "react";
import React, { useState } from "react";
import { HiOutlineExclamationCircle, HiTrash } from "react-icons/hi";

interface DeleteEmployerModalProps {
  employer: number;
}

const DeleteEmployerModal: FC<DeleteEmployerModalProps> = function ({
    employer,
}) {
  const [isOpen, setOpen] = useState(false);

  const deleteUser = () => {
    axios
      .delete(`/employers/employee/${employer}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });

    setOpen(false); // Close the modal after deletion
  };

  return (
    <>
      <Button color="failure" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-2">
          <HiTrash className="text-lg" />
          Supprimer
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
        <Modal.Header className="px-6 pt-6 pb-0">
          <span className="sr-only">Supprimer ce employée</span>
        </Modal.Header>
        <Modal.Body className="px-6 pt-0 pb-6">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="text-7xl text-red-500" />
            <p className="text-xl text-gray-500">
              Voulez-vous vraiment supprimer ce employée?
            </p>
            <div className="flex items-center gap-x-3">
              <Button color="failure" onClick={deleteUser}>
                Confirmer
              </Button>
              <Button color="gray" onClick={() => setOpen(false)}>
                Annuler
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteEmployerModal;
