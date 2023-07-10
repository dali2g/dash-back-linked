import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  TextInput,
} from "flowbite-react";

import type { FC } from "react";
import React, { useState } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiCog,
  HiDocumentDownload,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiOutlineExclamationCircle,
  HiOutlinePencilAlt,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
import NavbarSidebarLayout from "../layout/navbar-sidebar";


const UserListPage: FC = function () {
  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="sm:flex">
            <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
              <form className="lg:pr-3">
                <Label htmlFor="users-search" className="sr-only">
                  Search
                </Label>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <TextInput
                    id="users-search"
                    name="users-search"
                    placeholder="Rechercher des responsables"
                  />
                </div>
              </form>
              <div className="mt-3 flex space-x-1 pl-0 sm:mt-0 sm:pl-2">
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Configure</span>
                  <HiCog className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Delete</span>
                  <HiTrash className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Purge</span>
                  <HiExclamationCircle className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Settings</span>
                  <HiDotsVertical className="text-2xl" />
                </a>
              </div>
            </div>
            <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
              <AddUserModal />
              <Button color="gray">
                <div className="flex items-center gap-x-3">
                  <HiDocumentDownload className="text-xl" />
                  <span>Export</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <AllUsersTable />
            </div>
          </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  matricule: string;
  currentPassword: string;
  newPassword: string;
}
const AddUserModal: FC = function () {
  const [isOpen, setOpen] = useState(false);
  const initialUserState: User = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    matricule: "",
    currentPassword: "",
    newPassword: "",
  };
  const [user, setUser] = useState<User>(initialUserState);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    console.log(user)
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
    setUser(initialUserState);
    setOpen(false);
  };

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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="firstName">Prénom</Label>
              <div className="mt-1">
                <TextInput
                  id="firstName"
                  name="firstName"
                  placeholder="Vote Prénom"
                  value={user.firstName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="lastName">Nom de famille</Label>
              <div className="mt-1">
                <TextInput
                  id="lastName"
                  name="lastName"
                  placeholder="Nom"
                  value={user.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <div className="mt-1">
                <TextInput
                  id="email"
                  name="email"
                  placeholder="Votre E-mail"
                  type="email"
                  value={user.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Numéro de mobile</Label>
              <div className="mt-1">
                <TextInput
                  id="phone"
                  name="phone"
                  placeholder="Votre Numéro de Télephone"
                  type="tel"
                  value={user.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
<div>
            <Label htmlFor="gender">Genre</Label>
            <div className="mt-1">
              <TextInput
                id="gender"
                name="gender"
                placeholder="Sexe"
                type="text"
                value={user.gender}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="matricule">Matricule</Label>
            <div className="mt-1">
              <TextInput
                id="matricule"
                name="matricule"
                placeholder="XXX XXX XXX"
                type="text"
                value={user.matricule}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="currentPassword">Mot de passe actuel</Label>
            <div className="mt-1">
              <TextInput
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={user.currentPassword}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="newPassword">Nouveau mot de passe</Label>
            <div className="mt-1">
              <TextInput
                id="newPassword"
                name="newPassword"
                type="password"
                value={user.newPassword}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="primary" onClick={() => setOpen(false)}>
          Ajouter
        </Button>
      </Modal.Footer>
    </Modal>
  </>
);
};

const AllUsersTable: FC = function () {
const users = [
{
image: "/images/users/roberta-casas.png",
firstName: "Iheb",
lastName: "Jlassi",
gender: 'Femme',
email: "iheb.jlassi@autoroutes.tn",
phone: "24 258 269",
matricule: "132 782 144"
},
{
image: "/images/users/jese-leos.png",
firstName: "Mohamed Ali",
lastName: "Mejdi",
gender: 'Homme',
email: "medali.mejdi@autoroutes.tn",
phone: "94 951 269",
matricule: "154 216 815"
},
{
image: "/images/users/neil-sims.png",
firstName: "Rami",
lastName: "Ali",
gender: 'Femme',
email: "iheb.jlassi@autoroutes.tn",
phone: "24 258 269",
matricule: "131 282 154"
},
// Add more user objects as needed
];
return (
<Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
  <Table.Head className="bg-gray-100 dark:bg-gray-700">

    <Table.HeadCell>Nom et Prénom</Table.HeadCell>
    <Table.HeadCell>Mobile</Table.HeadCell>
    <Table.HeadCell>Genre</Table.HeadCell>
    <Table.HeadCell>Matricule</Table.HeadCell>
    <Table.HeadCell>Actions</Table.HeadCell>
  </Table.Head>
  <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">

    {users.map((user, index) => (
      <Table.Row
        key={`${user.firstName}-${user.lastName}`}
        className="hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
          <img
            className="h-10 w-10 rounded-full"
            src={user.image}
            alt="Lana Byrd avatar"
          />
          <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
            <div className="text-base font-semibold text-gray-900 dark:text-white">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {user.email}
            </div>
          </div>
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
          {user.phone}
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
          {user.gender}
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
          <div className="flex items-center">{user.matricule}</div>
        </Table.Cell>
        <Table.Cell>
          <div className="flex items-center gap-x-3 whitespace-nowrap">
            <EditUserModal />
            <DeleteUserModal />
          </div>
        </Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>
);
};

const EditUserModal: FC = function () {
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
          <strong>Modifier les informations</strong>
        </Modal.Header>
    {/*     <Modal.Body>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName">Prénom</label>
              <div className="mt-1">
                <TextInput
                  id="firstNameMod"
                  name="firstNameMod"
                  placeholder="prenom"
                />
              </div>
            </div>
            <div>
              <label htmlFor="lastName">Nom de famille</label>
              <div className="mt-1">
                <TextInput id="lastNameMod" name="lastNameMod" placeholder="Nom" />
              </div>
            </div>
            <div>
              <label htmlFor="email">E-mail</label>
              <div className="mt-1">
                <TextInput
                  id="emailMod"
                  name="emailMod"
                  placeholder="email"
                  type="email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone">Numéro de mobile</label>
              <div className="mt-1">
                <TextInput
                  id="phoneMod"
                  name="phoneMod"
                  placeholder="+(216)"
                  type="tel"
                />
              </div>
            </div>
            <div>
              <label htmlFor="gender">Genre</label>
              <div className="mt-1">
                <TextInput
                  id="genderMod"
                  name="genderMod"
                  placeholder="Sexe"
                  type="text"
                />
              </div>
            </div>
            <div>
              <label htmlFor="matricule">Matricule</label>
              <div className="mt-1">
                <TextInput
                  id="matriculeMod"
                  name="matriculeMod"
                  placeholder="XXX XXX XXX"
                  type="text"
                />
              </div>
            </div>
            <div>
              <label htmlFor="passwordCurrent">Mot de passe actuel</label>
              <div className="mt-1">
                <TextInput
                  id="passwordCurrentMod"
                  name="passwordCurrentMod"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
            </div>
            <div>
              <label htmlFor="passwordNew">Nouveau mot de passe</label>
              <div className="mt-1">
                <TextInput
                  id="passwordNewMod"
                  name="passwordNewMod"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
            </div>
          </div>
        </Modal.Body> */}
        <Modal.Footer>
          <Button color="primary" onClick={() => setOpen(false)}>
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const DeleteUserModal: FC = function () {
  const [isOpen, setOpen] = useState(false);

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
          <span className="sr-only">Supprimer ce responsable</span>
        </Modal.Header>
        <Modal.Body className="px-6 pt-0 pb-6">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="text-7xl text-red-500" />
            <p className="text-xl text-gray-500">
              Voulez-vous vraiment supprimer ce responsable?
            </p>
            <div className="flex items-center gap-x-3">
              <Button color="failure" onClick={() => setOpen(false)}>
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

export const Pagination: FC = function () {
  return (
    <div className="sticky right-0 bottom-0 w-full items-center border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between">
      <div className="mb-4 flex items-center sm:mb-0">
        <a
          href="#"
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Previous page</span>
          <HiChevronLeft className="text-2xl" />
        </a>
        <a
          href="#"
          className="mr-2 inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Next page</span>
          <HiChevronRight className="text-2xl" />
        </a>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            1-20
          </span>
          &nbsp;of&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            2290
          </span>
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <a
          href="#"
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 py-2 px-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <HiChevronLeft className="mr-1 text-base" />
          Previous
        </a>
        <a
          href="#"
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 py-2 px-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Next
          <HiChevronRight className="ml-1 text-base" />
        </a>
      </div>
    </div>
  );
};



export default UserListPage;
