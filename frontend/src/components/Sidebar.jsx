import React, { useState } from "react";
import { FaWpforms } from "react-icons/fa";
import { MdOutlineArrowCircleLeft } from "react-icons/md";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { title: "Transactions", icon: "Transactions" },
    { title: "Loyalty Cards", icon: "Card", hasGap: true },
    { title: "Subscriptions", icon: "Calendar" },
    { title: "Debts", icon: "Debt" },
    { title: "Legal Information", icon: "Legal" },
    { title: "Notifications", icon: "Notifications", hasGap: true },
    { title: "Settings", icon: "Settings" },
  ];

  return (
    <div className="flex">
      <aside
        className={`${
          isOpen ? "w-72" : "w-20"
        } bg-white h-full p-5 pt-8 duration-300 shadow-lg relative`}
      >
        {/* Toggle Button */}
        <MdOutlineArrowCircleLeft
          className={`absolute cursor-pointer -right-5 top-9 ${
            !isOpen && "rotate-180"
          }`}
          color="#5932EA"
          onClick={() => setIsOpen(!isOpen)}
          size={37}
        />

        {/* Sidebar Header */}
        <div className="flex gap-x-4 items-center mb-6">
          <h1
            className={`text-black font-medium text-xl transition-transform duration-200 ${
              !isOpen && "scale-0"
            }`}
          >
            Dashboard
          </h1>
        </div>

        {/* Table List */}
        <ul className="space-y-2">
          {menuItems.map((menuItem, index) => (
            <li
              key={index}
              className={`flex items-center p-2 text-light-gray rounded-md cursor-pointer hover:bg-main-purple hover:text-white text-sm gap-x-4 ${
                menuItem.hasGap ? "mt-6" : ""
              }`}
            >
              <FaWpforms size={22} />
              <span
                className={`origin-left transition-transform duration-200 ${
                  !isOpen && "hidden"
                }`}
              >
                {menuItem.title}
              </span>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
