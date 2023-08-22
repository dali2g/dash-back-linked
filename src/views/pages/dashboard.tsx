/* eslint-disable jsx-a11y/anchor-is-valid */
import { Badge, Dropdown, Table, useTheme } from "flowbite-react";
import type { FC } from "react";
import Chart from "react-apexcharts";
import NavbarSidebarLayout from "../layout/navbar-sidebar";
import React ,{ useState,useEffect } from "react"
import Papa from 'papaparse'
// Add this interface at the top of your file
interface EmployeeData {
  Matricule: string;
  Site: string;
  Echelon: string;
  Collège: string;
  Sexe: string;
  Catégorie: string;
  'Type Contrat': string; // Note: Use quotes for column names with spaces
  Fonction: string;
  Grade: string;
}


const DashboardPage: FC = function () {
  return (
    <NavbarSidebarLayout>
      <div className="px-4 pt-6">
        <SalesThisWeek />
        <div className="my-6">
          <LatestTransactions />
        </div>
        <div className="my-6">
        <AcquisitionOverview/>;
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};
const SalesThisWeek: FC = function () {
  const [employeeData, setEmployeeData] = useState<EmployeeData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Update the URL to fetch CSV data from your Express.js server
        const response = await fetch('/data/data.csv');

        if (!response || !response.body) {
          console.error('CSV data not available.');
          return;
        }

        const reader = response.body.getReader();
        const result = await reader.read();
        const text = new TextDecoder('utf-8').decode(result.value);

        const { data, errors } = Papa.parse(text, { header: true });

        if (errors.length === 0) {
          setEmployeeData(data);
        } else {
          console.error('CSV parsing error:', errors);
        }
      } catch (error) {
        console.error('Error fetching CSV:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <div className="mb-4 flex items-center justify-between">
        <div className="shrink-0">
          <span className="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
            {employeeData.length > 0 ? employeeData[0].Matricule : 'Loading...'}
          </span>
          <h3 className="text-base font-normal text-gray-600 dark:text-gray-400">
            Matricule of the first employee
          </h3>
        </div>
        <div className="flex flex-1 items-center justify-end text-base font-bold text-green-600 dark:text-green-400">
          12.5%
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <SalesChart />
      <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700 sm:pt-6">
        <Datepicker />
        <div className="shrink-0">
          <a
            href="#"
            className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 sm:text-sm"
          >
            Sales Report
            <svg
              className="ml-1 h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};


const SalesChart: FC = function () {
  const [csvData, setCsvData] = useState<EmployeeData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Update the URL to fetch CSV data from your Express.js server
        const response = await fetch('/data/data.csv');

        if (!response || !response.body) {
          console.error('CSV data not available.');
          return;
        }

        const reader = response.body.getReader();
        const result = await reader.read();
        const text = new TextDecoder('utf-8').decode(result.value);

        const { data, errors } = Papa.parse(text, { header: true });

        if (errors.length === 0) {
          // Limit the data to 10% of the total records
          const slicedData = data.slice(0, Math.ceil(data.length * 0.5  ));
          setCsvData(slicedData);
        } else {
          console.error('CSV parsing error:', errors);
        }
      } catch (error) {
        console.error('Error fetching CSV:', error);
      }
    };

    fetchData();
  }, []);

    // Group the data by 'Type Contrat' and count occurrences
    const contratCounts: Record<string, number> = {};
    csvData.forEach((row) => {
      const contrat = row['Type Contrat'];
      contratCounts[contrat] = (contratCounts[contrat] || 0) + 1;
    });
  
    // Prepare data for the chart
    const contratTypes = Object.keys(contratCounts);
    const contratCountsArray = contratTypes.map((contrat) => contratCounts[contrat]);
  
    const options: ApexCharts.ApexOptions = {
      chart: {
        type: "bar",
        fontFamily: "Inter, sans-serif",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: contratTypes,
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 500,
          },
        },
      },
      yaxis: {
        title: {
          text: "Nombre Des Employées",
          style: {
            fontSize: "14px",
            fontWeight: 500,
          },
        },
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 500,
          },
        },
      },
      legend: {
        fontSize: "14px",
        fontWeight: 500,
        labels: {
          colors: ["#6B7280"], // Customize label colors
        },
      },
    };
  
    const series = [{
      name: "Employees",
      data: contratCountsArray,
      color: "#1A56DB", // Customize the color as needed
    }];
  
    return <Chart height={420} options={options} series={series} />;
  };


const Datepicker: FC = function () {
  return (
    <span className="text-sm text-gray-600">
      <Dropdown inline label="Last 7 days">
        <Dropdown.Item>
          <strong>Sep 16, 2021 - Sep 22, 2021</strong>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Yesterday</Dropdown.Item>
        <Dropdown.Item>Today</Dropdown.Item>
        <Dropdown.Item>Last 7 days</Dropdown.Item>
        <Dropdown.Item>Last 30 days</Dropdown.Item>
        <Dropdown.Item>Last 90 days</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Custom...</Dropdown.Item>
      </Dropdown>
    </span>
  );
};



const AcquisitionOverview: FC = function () {
  const [employeeData, setEmployeeData] = useState<EmployeeData[]>([]);
  const [gradeAcquisitions, setGradeAcquisitions] = useState<{ [grade: string]: number }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Update the URL to fetch CSV data from your Express.js server
        const response = await fetch('/data/data.csv');

        if (!response || !response.body) {
          console.error('CSV data not available.');
          return;
        }

        const reader = response.body.getReader();
        const result = await reader.read();
        const text = new TextDecoder('utf-8').decode(result.value);

        const { data, errors } = Papa.parse(text, { header: true });

        if (errors.length === 0) {
          setEmployeeData(data);
        } else {
          console.error('CSV parsing error:', errors);
        }
      } catch (error) {
        console.error('Error fetching CSV:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Calculate the grade acquisitions
    const gradeCounts: { [grade: string]: number } = {};

    employeeData.forEach((row) => {
      const grade = row.Grade;
      if (gradeCounts[grade]) {
        gradeCounts[grade]++;
      } else {
        gradeCounts[grade] = 1;
      }
    });

    setGradeAcquisitions(gradeCounts);
  }, [employeeData]);

  const totalAcquisitions = Object.values(gradeAcquisitions).reduce((acc, count) => acc + count, 0);

  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <h3 className="mb-6 text-xl font-bold leading-none text-gray-900 dark:text-white">
      Aperçu du domaine de travail
      </h3>
      <div className="flex flex-col">
        <div className="overflow-x-auto rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow sm:rounded-lg">
              <Table className="min-w-full table-fixed">
                <Table.Head>
                  <Table.HeadCell className="whitespace-nowrap rounded-l border-x-0 bg-gray-50 py-3 px-4 text-left align-middle text-xs font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-white">
                    Role
                  </Table.HeadCell>
                  <Table.HeadCell className="whitespace-nowrap border-x-0 bg-gray-50 py-3 px-4 text-left align-middle text-xs font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-white">
                    Nombre des Employées
                  </Table.HeadCell>
                  <Table.HeadCell className="whitespace-nowrap rounded-r border-x-0 bg-gray-50 py-3 px-4 text-left align-middle text-xs font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-white">
                    Percentage
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y divide-gray-100 dark:divide-gray-700">
                  {Object.keys(gradeAcquisitions).map((grade) => (
                    <Table.Row key={grade} className="text-gray-500 dark:text-gray-400">
                      <Table.Cell className="whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">
                        {grade}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">
                        {gradeAcquisitions[grade]}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs">
                        <div className="flex items-center">
                          <span className="mr-2 text-xs font-medium">
                            {(gradeAcquisitions[grade] / totalAcquisitions * 100).toFixed(2)}%
                          </span>
                          <div className="relative w-full">
                            <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
                              <div
                                className="h-2 rounded-sm bg-primary-700"
                                style={{
                                  width: `${(gradeAcquisitions[grade] / totalAcquisitions * 100).toFixed(2)}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const LatestTransactions: FC = function () {
  const [employeeData, setEmployeeData] = useState<EmployeeData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch CSV data containing Sexe, Grade, Echelon, and Fonction
        const response = await fetch('/data/data.csv'); // Update the URL

        if (!response || !response.body) {
          console.error('CSV data not available.');
          return;
        }

        const reader = response.body.getReader();
        const result = await reader.read();
        const text = new TextDecoder('utf-8').decode(result.value);

        const { data, errors } = Papa.parse(text, { header: true });

        if (errors.length === 0) {
          // Randomly select 20 employees from the fetched data
          const randomEmployees = getRandomEmployees(data, 20);
          setEmployeeData(randomEmployees);
        } else {
          console.error('CSV parsing error:', errors);
        }
      } catch (error) {
        console.error('Error fetching CSV:', error);
      }
    };

    fetchData();
  }, []);

  // Function to generate random badge colors
  const getRandomBadgeColor = (): string => {
    const colors = ["success", "failure", "warning", "info", "primary"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Function to randomly select 'count' employees from data
  const getRandomEmployees = (data: EmployeeData[], count: number): EmployeeData[] => {
    if (count >= data.length) {
      return data;
    }

    const randomIndexes: number[] = [];
    while (randomIndexes.length < count) {
      const randomIndex = Math.floor(Math.random() * data.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }

    return randomIndexes.map((index) => data[index]);
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            Dernières transactions
          </h3>
          <span className="text-base font-normal text-gray-600 dark:text-gray-400">
            Ceci est une liste des dernières transactions
          </span>
        </div>
        <div className="shrink-0">
          <a
            href="#"
            className="rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
          >
            Voir
          </a>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="overflow-x-auto rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow sm:rounded-lg">
              <Table
                striped
                className="min-w-full divide-y divide-gray-200 dark:divide-gray-600"
              >
                <Table.Head className="bg-gray-50 dark:bg-gray-700">
                  <Table.HeadCell>Matricule</Table.HeadCell>
                  <Table.HeadCell>Sexe</Table.HeadCell>
                  <Table.HeadCell>Grade</Table.HeadCell>
                  <Table.HeadCell>Echelon</Table.HeadCell>
                  <Table.HeadCell>Fonction</Table.HeadCell>
                </Table.Head>
                <Table.Body className="bg-white dark:bg-gray-800">
                  {employeeData.map((employee) => (
                    <Table.Row key={employee.Matricule}>
                      <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                        {employee.Matricule}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                        {employee.Sexe}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                        {employee.Grade}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                        {employee.Echelon}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                        {employee.Fonction}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 sm:pt-6">
        <Datepicker />
        <div className="shrink-0">
          <a
            href="#"
            className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover-bg-gray-700 sm:text-sm"
          >
            Transactions Report
            <svg
              className="ml-1 h-3 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};



export default DashboardPage;
