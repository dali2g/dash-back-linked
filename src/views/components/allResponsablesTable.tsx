import { Table } from "flowbite-react";
import type { FC } from "react";
import React from "react";
import EditResponsableModal from "./modals/editResponsableModal";
import DeleteResponsableModal from "./modals/deleteResponsableModal";

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

const AllResponsablesTable: FC<{responsables:any[]}> = function ({responsables}) {
  if (responsables === undefined || responsables.length === 0 ) {
    return <p>Loading...</p>; 
  }

  if (!Array.isArray(responsables) || responsables.length === 0) {
    return <p>Aucuns Responsables.</p>; 
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
        {responsables.map((responsable) => {
          return (
            <Table.Row key={responsable._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    {responsable.firstName} {responsable.lastName}
                  </div>
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {responsable.email}
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {responsable.phone}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {responsable.gender}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                <div className="flex items-center">
                  {responsable.matricule}
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-x-3 whitespace-nowrap">
                  <EditResponsableModal responsable={responsable._id} />
                  <DeleteResponsableModal responsable={responsable._id} />
                </div>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};


export default AllResponsablesTable;
