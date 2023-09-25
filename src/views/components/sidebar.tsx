import { Sidebar } from "flowbite-react";
import type { FC } from "react";
import React, { useEffect, useState } from "react";
import {
  HiCollection,
  HiLogout,
  HiShoppingBag,
  HiUser,
  HiUsers,
} from "react-icons/hi";


const ExampleSidebar: FC = function () {
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
  }, [setCurrentPage]);

  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <div className="flex h-full flex-col justify-between py-2">

        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="/dashboard"
              icon={HiCollection}
            >
              Acceuil
            </Sidebar.Item>
          
            <Sidebar.Item
              href="/responsables"
              icon={HiUsers}
            >
              Liste des responsables
            </Sidebar.Item>
            <Sidebar.Item
              href="/employers"
              icon={HiShoppingBag}

            >
              Liste des employées
            </Sidebar.Item>
            <Sidebar.Item
              href="/profils"
              icon={HiUser}

            >
             Profils
            </Sidebar.Item>
            <Sidebar.Item
              href="/"
              icon={HiLogout}>
              Déconnexion
            </Sidebar.Item>

          </Sidebar.ItemGroup>

        </Sidebar.Items>

      </div>
    </Sidebar>
  );
};

export default ExampleSidebar;
