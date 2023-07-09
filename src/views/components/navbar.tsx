import type { FC } from "react";
import { DarkThemeToggle, Navbar } from "flowbite-react";
import React from "react";

const ExampleNavbar: FC = function () {
  return (
    <Navbar fluid>
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Navbar.Brand href="/dashboard">
              <img alt="" src="/images/TA_logo.png" className="mr-3 h-6 sm:h-8" />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                Tunisie Autoroutes: Tableau de Bord
              </span>
            </Navbar.Brand>
          </div>
          <div className="flex items-center gap-3">

            <DarkThemeToggle />
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default ExampleNavbar;