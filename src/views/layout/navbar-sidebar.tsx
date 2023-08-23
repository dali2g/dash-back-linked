import { Footer } from "flowbite-react";
import type { FC, PropsWithChildren } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { MdFacebook } from "react-icons/md";
import { FaDribbble, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import React from "react";

interface NavbarSidebarLayoutProps {
  isFooter?: boolean;
}

const NavbarSidebarLayout: FC<PropsWithChildren<NavbarSidebarLayoutProps>> =
  function ({ children, isFooter = true }) {
    return (
      <>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <MainContent isFooter={isFooter}>{children}</MainContent>
        </div>
      </>
    );
  };

const MainContent: FC<PropsWithChildren<NavbarSidebarLayoutProps>> = function ({
  children,
  isFooter,
}) {
  return (
    <main className="relative h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900 ">
      {children}
      {isFooter && (
        <div className="mx-4 mt-4">
          <MainContentFooter />
        </div>
      )}
    </main>
  );
};

const MainContentFooter: FC = function () {
  return (
    <>
      <Footer container>
        <div className="flex w-full flex-col gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0">
          <Footer.LinkGroup>
            <Footer.Link href="#" className="mr-3 mb-3 lg:mb-0">
            Termes et conditions
            </Footer.Link>
            <Footer.Link href="#" className="mr-3 mb-3 lg:mb-0">
            Politique de confidentialité
            </Footer.Link>
            <Footer.Link href="#" className="mr-3">
            Licence
            </Footer.Link>
            <Footer.Link href="/dashboard">Accueil</Footer.Link>
          </Footer.LinkGroup>
          <Footer.LinkGroup>
            <div className="flex gap-x-1">
              <Footer.Link
                href="https://www.facebook.com"
                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
              >
                <MdFacebook className="text-lg" />
              </Footer.Link>
              <Footer.Link
                href="https://www.instagram.com"
                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
              >
                <FaInstagram className="text-lg" />
              </Footer.Link>
              <Footer.Link
                href="https://www.twitter.com"
                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
              >
                <FaTwitter className="text-lg" />
              </Footer.Link>
              <Footer.Link
                href="https://www.github.com"
                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
              >
                <FaGithub className="text-lg" />
              </Footer.Link>
              <Footer.Link
                href=""
                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
              >
                <FaDribbble className="text-lg" />
              </Footer.Link>
            </div>
          </Footer.LinkGroup>
        </div>
      </Footer>
      <p className="my-8 text-center text-sm text-gray-500 dark:text-gray-300">
        &copy; 2023 Autoroute-Tunisie. Tous droits réservés.
      </p>
    </>
  );
};

export default NavbarSidebarLayout;
