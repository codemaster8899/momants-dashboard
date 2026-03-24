"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Navigation, Plus } from "lucide-react";

const pages = ["home", "dashboard", "login"];

export const JourneyDisplay = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  return (
    <div className="border border-gray-300 rounded-md p-2">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded hover:bg-gray-100 p-2"
      >
        <div className="flex items-center gap-1">
          <Navigation className="w-4" />
          <span className="momants-semibold-small-black">Customer journey</span>
        </div>

        {isOpen ? (
          <ChevronUp className="w-4 momants-semibold-small-gray" />
        ) : (
          <ChevronDown className="w-4 momants-semibold-small-gray" />
        )}
      </button>

      {isOpen && (
        <div className="flex flex-col mt-1 pl-2">
          {pages.length > 0 ? (
            pages.map((page, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-2 py-1 hover:bg-gray-100 rounded-lg"
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="page"
                    value={page}
                    checked={selectedPage === page}
                    onChange={() => setSelectedPage(page)}
                    className="appearance-none w-4 h-4 border-2 border-gray-300 rounded-full cursor-pointer checked:border-black relative flex items-center justify-center before:content-[''] before:w-2 before:h-2 before:bg-black before:rounded-full before:opacity-0 checked:before:opacity-100"
                  />
                  <span className="momants-light-small-black">{page}</span>
                </label>

                {/* Always render, just hide visually */}
                <button
                  className={`hover:cursor-pointer ml-2 ${
                    selectedPage === page
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  <ChevronDown className="w-4 text-gray-500" />
                </button>
              </div>
            ))
          ) : (
            <span className="momants-light-extrasmall-gray">Nothing found</span>
          )}
        </div>
      )}
    </div>
  );
};
