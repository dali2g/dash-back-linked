import { Button,  Modal } from "flowbite-react";

import type { FC } from "react";
import React, { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import EditEmployerForm from "../forms/editEmployerForm";

interface Employer {
    id: number;
    image: string;
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    phone: string;
    matricule: string;
    password: string;
    site: string;
    echelon: string;
    souscategories: string;
    typecontrat: string;
    etatscivils: string;
    grade: string;
}

interface EditEmployerModalProps {
    employer: Employer;
}

const EditEmployerModal: FC<EditEmployerModalProps> = function ({
    employer,
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
                        Modifier les informations de {employer.firstName}{" "}
                        {employer.lastName}
                    </strong>
                </Modal.Header>
                <Modal.Body>
                    <EditEmployerForm
                        employer={employer}
                        onClose={() => setOpen(false)}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default EditEmployerModal;
