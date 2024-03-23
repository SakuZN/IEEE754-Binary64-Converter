import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="w-full py-3 md:py-6 border-t bg-gray-100 dark:bg-gray-950 mt-5 bottom-0">
        <div className="flex flex-col items-center gap-4 px-4 md:px-6">
          <div className="space-y-2 text-center">
            <h3 className="text-lg font-bold">
              Simulation Project: IEEE 754 Double Precision Converter
            </h3>
            <ul className="flex flex-col gap-2 items-center list-none p-0 md:flex-row md:gap-4">
              <li className="text-center">
                <span className="block mt-1 text-sm font-medium leading-none dark:text-gray-400">
                  Alejo, Gene Cedric
                </span>
                <span className="block text-xs leading-none text-gray-500 dark:text-gray-500">
                  Member #1
                </span>
              </li>
              <li className="text-center">
                <span className="block mt-1 text-sm font-medium leading-none dark:text-gray-400">
                  Arizala, Johndayll Lewis
                </span>
                <span className="block text-xs leading-none text-gray-500 dark:text-gray-500">
                  Member #2
                </span>
              </li>
              <li className="text-center">
                <span className="block mt-1 text-sm font-medium leading-none dark:text-gray-400">
                  Dayrit, Jason Rafael
                </span>
                <span className="block text-xs leading-none text-gray-500 dark:text-gray-500">
                  Member #3
                </span>
              </li>
              <li className="text-center">
                <span className="block mt-1 text-sm font-medium leading-none dark:text-gray-400">
                  Noche, Zach Matthew
                </span>
                <span className="block text-xs leading-none text-gray-500 dark:text-gray-500">
                  Member #4
                </span>
              </li>
              <li className="text-center">
                <span className="block mt-1 text-sm font-medium leading-none dark:text-gray-400">
                  Samson, Wesly Franco
                </span>
                <span className="block text-xs leading-none text-gray-500 dark:text-gray-500">
                  Member #5
                </span>
              </li>
            </ul>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-sm text-center md:text-base dark:text-gray-400 font-semibold">
              CSARCH S14 G7
            </p>
            <a
              target="_blank"
              className="text-sm underline"
              href="https://github.com/SakuZN/IEEE754-Binary64-Converter"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
