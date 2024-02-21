import React from "react";
import MaxWidthContainer from "./MaxWidthContainer";
import Logo from "./Logo";
import { Button } from "./ui/button.tsx";
import NavMenu from "./NavMenu.tsx";
export const NavBar = ({}) => {
  return (
    <MaxWidthContainer>
      <nav className="bg-white sticky h-20 border-b border-gray-200 inset-x-0 ">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between pt-5">
            <Logo />
            <div className="mx-auto flex space-x-10">
              <NavMenu />
            </div>
            <div className="text-sm">
              <a className="pr-4" href="#">
                Log In
              </a>
              <Button
                variant="default"
                className="bg-blue-700 h-10 w-28 hover:bg-blue-800 text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </MaxWidthContainer>
  );
};

export default NavBar;
