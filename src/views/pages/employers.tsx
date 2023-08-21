import React, { useEffect } from "react";
import {
  Breadcrumb,
  Button,
  Label,
  Select,
  TextInput
} from "flowbite-react";
import { FC } from "react";
import { useState } from "react";
import { HiArchive, HiHome, HiPlus } from "react-icons/hi";
import NavbarSidebarLayout from "../layout/navbar-sidebar";
import Pagination from "../components/pagination";
import axios from "axios";
import AllEmployersTable from "../components/allEmployersTable";
import AddEmployerModal from "../components/modals/addEmployerModal";

const EmployersPage: FC = function () {
  const [employers, setEmployers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const response = await axios.get("http://localhost:5173/employers/employee");
        setEmployers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employers:", error);
      }
    };

    fetchEmployers();
  }, []);

  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">

        <div className="mb-4">
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item href="#">
              <div className="flex items-center gap-x-3">
                <HiHome className="text-xl" />
                <span className="dark:text-white">Home</span>
              </div>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/e-commerce/employees">
              Liste des Employées
            </Breadcrumb.Item>
            <Breadcrumb.Item>Employées</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Tous les employées
          </h1>

          <div className="flex items-center">
            <div className="p-5 mt-5 flex-grow">
              <Label htmlFor="text">
                Transaction se rendre jusqu'a
              </Label>
              <TextInput
                id="text"
                name="transaction"
                placeholder="Transaction se rendre jusqu'a"
              />
            </div>
            <div className="p-5 mt-5 flex-grow">
              <Label htmlFor="text">
                Tous les départements :
              </Label>
              <Select
                id="text"
                name="departements"
                placeholder="Tous les départements"
              />
            </div>
            <div className="p-5 mt-5 flex-grow">
              <Label htmlFor="text">
                Chargé de projet :
              </Label>
              <Select
                id="text"
                name="departements"
                placeholder="Chargé de projet :"
              />
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-800">
              <Button color="dark" className="text-sm py-1 px-2">
                <div className="flex items-center gap-x-2">
                  <HiArchive className="text-lg" />
                  <p className="mx-1 md:mx-2">Générer Rapports</p>
                </div>
              </Button>
              <div className="ml-4 flex items-center space-x-2 sm:space-x-3">
                <AddEmployerModal
                  onClose={() => {
                    throw new Error("Function not implemented.");
                  }}
                />
              </div>
            </div>


          </div>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow">
                {isLoading ? (
                  <p></p>
                ) : (
                  <AllEmployersTable employers={employers} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination />
    </NavbarSidebarLayout>

  );
};


export default EmployersPage;
