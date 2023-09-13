import { Table } from "flowbite-react";
import type { FC } from "react";
import React from "react";
import DeleteEmployerModal from "./modals/deleteEmployerModal";
import EditEmployerModal from "./modals/editEmployerModal";

interface Employer {
  id: number;
  matricule: number;
  firstName: string;
  lastName: string;
  site:string;
  echelon:string;
  college:string;
  souscategories:string;
  gender: string;
  typecontrat:string;
  etatscivils:string;
  grade:string
  email: string;
  phone: string;

}

const AllEmployersTable: FC<{employers:any[]}> = function ({employers}) {
  if (employers === undefined || employers.length === 0 ) {
    return <p></p>; 
  }

  if (!Array.isArray(employers) || employers.length === 0) {
    return <p>Aucuns Employées.</p>; 
  }
  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>Matriucle</Table.HeadCell>
        <Table.HeadCell>Nom et Prénom</Table.HeadCell>
        <Table.HeadCell>Mobile</Table.HeadCell>
        <Table.HeadCell>Site</Table.HeadCell>
        <Table.HeadCell>Echelon</Table.HeadCell>
        <Table.HeadCell>College</Table.HeadCell>
        <Table.HeadCell>Type Contrat</Table.HeadCell>
        <Table.HeadCell>Etats Civils</Table.HeadCell>
        <Table.HeadCell>Grade</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {employers.map((employer) => {
          return (
            <Table.Row key={employer._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                <div className="flex items-center">
                  {employer.matricule}
                </div>
              </Table.Cell>
              <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    {employer.firstName} {employer.lastName}
                  </div>
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {employer.email}
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {employer.phone}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {employer.site}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {employer.echelon}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {employer.souscategories}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {employer.typecontrat}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {employer.etatscivils}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {employer.grade}
              </Table.Cell>
              
              <Table.Cell>
                <div className="flex items-center gap-x-3 whitespace-nowrap">
                  <EditEmployerModal employer={employer._id} />
                  <DeleteEmployerModal employer={employer._id} /> 
                </div>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};


export default AllEmployersTable;
