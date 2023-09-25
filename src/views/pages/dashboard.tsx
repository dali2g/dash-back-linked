/* eslint-disable jsx-a11y/anchor-is-valid */
import { Table } from "flowbite-react";
import type { FC } from "react";
import ReactApexChart from "react-apexcharts";
import NavbarSidebarLayout from "../layout/navbar-sidebar";
import React ,{ useState,useEffect } from "react"
import Papa from 'papaparse'
interface EmployeeData {
  Matricule: string;
  Site: string;
  Echelon: string;
  Collège: string;
  Sexe: string;
  Catégorie: string;
  'Type Contrat': string; 
  'Date Naissance':string;
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
          Répartition Homme/Femme :
          </span>
          <h3 className="text-base font-normal text-gray-600 dark:text-gray-400 mt-6 ">
            Homme: 1580 <br/> Femme: 365
          </h3>
        </div>
      </div>
      <SalesChart />
      <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700 sm:pt-6">
        <div className="shrink-0">
          <a
            href="#"
            className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 sm:text-sm"
          >
            Rapports
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
        const response = await fetch("/data/data.csv");

        if (!response || !response.body) {
          console.error("CSV data not available.");
          return;
        }

        const reader = response.body.getReader();
        const result = await reader.read();
        const text = new TextDecoder("utf-8").decode(result.value);

        const { data, errors } = Papa.parse(text, { header: true });

        if (errors.length === 0) {
          setCsvData(data);
        } else {
          console.error("CSV parsing error:", errors);
        }
      } catch (error) {
        console.error("Error fetching CSV:", error);
      }
    };

    fetchData();
  }, []);

  const sexeCounts: Record<string, number> = {};
  csvData.forEach((row) => {
    const sexe = row["Sexe"];
    sexeCounts[sexe] = (sexeCounts[sexe] || 0) + 1;
  });

  const sexeTypes = ["Masculin", "FEMININ"];
  const sexeCountsArray = sexeTypes.map((sexe) => sexeCounts[sexe] || 0);

  const calculateAge = (birthDate: string) => {
    const birthYear = parseInt(birthDate.split("/")[2], 10);
    return 2023 - birthYear;
  };

  const ageCounts: Record<string, Record<number, number>> = {};
  csvData.forEach((row) => {
    const age = calculateAge(row["Date Naissance"]);
    const sexe = row["Sexe"];

    if (!ageCounts[sexe]) {
      ageCounts[sexe] = {};
    }

    if (!ageCounts[sexe][age]) {
      ageCounts[sexe][age] = 1;
    } else {
      ageCounts[sexe][age]++;
    }
  });

  const seriesData: { name: string; data: number[] }[] = [];
  for (const sexe of Object.keys(ageCounts)) {
    const ageCountsArray: number[] = [];
    for (let age = 1; age <= 100; age++) {
      ageCountsArray.push((ageCounts[sexe] && ageCounts[sexe][age]) || 0);
    }
    seriesData.push({
      name: sexe,
      data: ageCountsArray,
    });
  }

  const ageChartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      height: '600px',
      fontFamily: "Inter, sans-serif",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "100%",
        distributed: true,
        horizontal: true,
        barHeight:"100%",
      

      },
    },
    xaxis: {
      categories: Array.from({ length: 100 }, (_, i) => i + 1), // Age categories from 1 to 100
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 200,
        },
      },
    },
    yaxis: {
      show: false, // Hide the Y-axis
    },
    legend: {
      show: false, // Show the legend to distinguish between sexes
    },
    dataLabels: {
      enabled: false, // Remove numbers inside the chart
    },
  };

  const genderChartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      height: '600px',
      fontFamily: "Inter, sans-serif",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
        horizontal: false,
        barHeight:"100%",

      },
    },
    xaxis: {
      categories: sexeTypes,
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 200,
        },
      },
    },
    yaxis: {
      title: {
        text: "Répartition Femmes/Hommes",
        style: {
          fontSize: "14px",
          fontWeight: 200,
       
        },
      },
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 200,
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false, 
    },
  };

  const series = [
    {
      data: sexeCountsArray,
      colors: ["#1A56DB", "#F78CA2"],
    },
  ];

  return (
    <div id="chart">
      <h2>Répartition par Sexe</h2>
      <ReactApexChart options={genderChartOptions} series={series} type="bar" height={420} />

      <h1 className="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">Pyramide des Âges Par Sexe</h1>
      <ReactApexChart options={ageChartOptions} series={seriesData} type="bar" height={420} />
    </div>
  );
};



const AcquisitionOverview: FC = function () {
  const [employeeData, setEmployeeData] = useState<EmployeeData[]>([]);
  const [gradeAcquisitions, setGradeAcquisitions] = useState<{ [grade: string]: number }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      Aperçu du nombre des salariés par département
      </h3>
      <div className="flex flex-col">
        <div className="overflow-x-auto rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow sm:rounded-lg">
              <Table className="min-w-full table-fixed">
                <Table.Head>
                  <Table.HeadCell className="whitespace-nowrap rounded-l border-x-0 bg-gray-50 py-3 px-4 text-left align-middle text-xs font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-white">
                    Rôle
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
              <div className="shrink-0">
          <a
            href="/employers" 
            className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover-bg-gray-700 sm:text-sm"
          >
            Voir tous les employés
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
          Le nombre de salariés
          </h3>
          <span className="text-base font-normal text-gray-600 dark:text-gray-400">
            Ceci est le nombre des employés
          </span>
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">1945</h3>
        </div>
     
      </div>
    </div>
  );
};



export default DashboardPage;
