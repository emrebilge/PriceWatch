// use client component
"use client"



// import React from 'react';
import ToggleButton from './ToggleButton'; // Adjust the path if it's in a different directory

function Navbar() {
  return (
    <header>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 text-gray-900 dark:text-gray-200"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>

        <div className="flex justify-between w-full lg:w-auto">
          <ToggleButton />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
