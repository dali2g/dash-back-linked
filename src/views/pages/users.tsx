import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  TextInput,
} from "flowbite-react";

import React, { FC ,useEffect, useState } from "react";
import axios from 'axios'
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
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from MongoDB database
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5173/users/responsables");
        setUsers(response.data);
        console.log(users[0])
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

 


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
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <AllUsersTable users={users} />
            </div>
          </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

const AddUserModal: FC = function () {
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
          <AddUserForm />
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </>
  );
};

const AddUserForm: FC = function () {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    matricule: '',
    password:'',
    confirmPassword:'',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      await axios.post("/users/responsables", formData);
      console.log("Data submitted!");
    } catch (error) {
      console.error("error submitting:", error);
    }
  };
  
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div>
        <Label htmlFor="firstName">Prénom</Label>
        <div className="mt-1">
          <TextInput
            id="firstName"
            name="firstName"
            placeholder="Votre Prénom"
            value={formData.firstName}
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
            placeholder="Votre Nom"
            value={formData.lastName}
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
            placeholder="Votre Email"
            type="email"
            value={formData.email}
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
            placeholder="+(216)"
            type="tel"
            value={formData.phone}
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
            placeholder="Genre"
            value={formData.gender}
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
            value={formData.matricule}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="password">Mot de Passe</Label>
        <div className="mt-1">
          <TextInput
            id="password"
            name="password"
            placeholder="••••••••"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="confirmPassword">Mot de Passe</Label>
        <div className="mt-1">
          <TextInput
            id="confirmPassword"
            name="confirmPassword"
            placeholder="••••••••"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <Button color="primary" onClick={handleSubmit}>
        Sauvegarder
      </Button>
    </div>
  );
}

const AllUsersTable: FC<{ users: any[] }> = function ({ users }) {
  if (users === undefined || users.length === 0 ) {
    return <p>Loading...</p>; 
  }

  if (!Array.isArray(users) || users.length === 0) {
    return <p>No users found.</p>; 
  }
  
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
        {users.map((user) => {
          return (
            <Table.Row key={user._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
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
                <div className="flex items-center">
                  {user.matricule}
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-x-3 whitespace-nowrap">
                  <EditUserModal userId={user._id} />
                  <DeleteUserModal userId={user._id} />
                </div>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

const EditUserForm: FC<{ userId: string }> = function ({ userId }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [matricule, setMatricule] = useState("");
  const handleSubmit = async () => {
    try {
      const response = await fetch(`/users/responsables/${userId}`, {
        method: "PUT",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          gender,
          matricule,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      console.log("Response status:", response.status);
      console.log("Response data:", await response.json());

    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div>
        <Label htmlFor="firstName">Prénom</Label>
        <div className="mt-1">
          <TextInput
            id="firstName"
            name="firstName"
            placeholder="Votre Prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="lastName">Nom de famille</Label>
        <div className="mt-1">
          <TextInput
            id="lastName"
            name="lastName"
            placeholder="Votre Nom"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="email">E-mail</Label>
        <div className="mt-1">
          <TextInput
            id="email"
            name="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="phone">Numéro de mobile</Label>
        <div className="mt-1">
          <TextInput
            id="phone"
            name="phone"
            placeholder="+(216)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
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
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            type="text"
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
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            type="text"
          />
        </div>
      </div>
      <Button color="primary" onClick={handleSubmit}>
        Sauvegarder
      </Button>
    </div>
  );
};

const EditUserModal = ({ userId }) => {
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
        <Modal.Body>
          <EditUserForm userId={userId} />
          
        </Modal.Body>
      </Modal>
    </>
  );
};

const DeleteUserModal: FC<{ userId: string }> = function ({ userId }) {
  const [isOpen, setOpen] = useState(false);

  const deleteUser = () => {
    axios.delete(`/users/responsables/${userId}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
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
          <span className="sr-only">Supprimer ce responsable</span>
        </Modal.Header>
        <Modal.Body className="px-6 pt-0 pb-6">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="text-7xl text-red-500" />
            <p className="text-xl text-gray-500">
              Voulez-vous vraiment supprimer ce responsable?
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
