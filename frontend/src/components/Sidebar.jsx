import React, { useState, useCallback, useEffect } from "react";
import { FaWpforms } from "react-icons/fa";
import { MdOutlineArrowCircleLeft } from "react-icons/md";
import { fetchUserForms } from "../api/dashboard/getForms";
import { Loader } from "./Loader";

const Sidebar = ({ onSelectForm }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [userforms, setUserForms] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState(null); 

  const getUserFormsData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchUserForms();
      setUserForms(data?.content || []);
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserFormsData();
  }, [getUserFormsData]);

  const handleSelectForm = (form) => {
    if (selectedFormId === form.id) {
      setSelectedFormId(null); 
      onSelectForm(null); 
    } else {
      setSelectedFormId(form.id); 
      onSelectForm(form); 
    }
  };

  const enabledUserForms = userforms?.filter(form => form.status === "ENABLED");

  return (
    <div className="flex">
      <aside
        className={`${
          isOpen ? "w-72" : "w-20"
        } bg-white h-full p-5 pt-8 duration-300 shadow-lg relative`}
      >
        <MdOutlineArrowCircleLeft
          className={`absolute cursor-pointer -right-5 top-9 ${!isOpen && "rotate-180"}`}
          color="#5932EA"
          onClick={() => setIsOpen(!isOpen)}
          size={37}
        />

        <div className="flex gap-x-4 items-center mb-6">
          <h1
            className={`text-black font-medium text-xl transition-transform duration-200 ${!isOpen && "scale-0"}`}
          >
            Dashboard
          </h1>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <ul className="space-y-2">
            {enabledUserForms?.map((form) => (
              <li
                key={form.id}
                className={`flex items-center p-2 text-light-gray rounded-md cursor-pointer 
                ${selectedFormId === form.id ? "bg-main-purple text-white" : "hover:bg-main-purple hover:text-white"}
                text-sm gap-x-4`}
                onClick={() => handleSelectForm(form)}
              >
                <FaWpforms size={22} />
                <span
                  className={`origin-left transition-transform duration-200 ${!isOpen && "hidden"}`}
                >
                  {form.title}
                </span>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
};

export default Sidebar;
