import React, { useState, useCallback, useEffect } from "react";
import { FaWpforms, FaEllipsisV } from "react-icons/fa";
import { MdOutlineArrowCircleLeft } from "react-icons/md";
import { fetchUserForms } from "../api/dashboard/getForms";
import { Loader } from "./Loader";

const Sidebar = ({ onSelectForm }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [userforms, setUserForms] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState(null); 
  const [showMenu, setShowMenu] = useState(null); // Track which form's menu is open

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

  const handleMenuClick = (formId) => {
    setShowMenu(showMenu === formId ? null : formId);
  };

  const handleNavigateToForm = (formUrl) => {
    window.open(formUrl, "_blank"); 
    setShowMenu(null); 
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
                text-sm gap-x-4 relative`}
                onClick={() => handleSelectForm(form)}
              >
                <FaWpforms size={22} />
                <span
                  className={`origin-left transition-transform duration-200 ${!isOpen && "hidden"}`}
                >
                  {form.title}
                </span>

                {/* Three-dot menu */}
                <FaEllipsisV
                  className="ml-auto cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenuClick(form.id);
                  }}
                />

                {/* Popup Menu */}
                {showMenu === form.id && (
                  <div className="absolute top-full right-0 mt-1 w-32 bg-white shadow-lg border rounded-md">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-black"
                      onClick={() => handleNavigateToForm(form?.url)}
                    >
                      Go to Form
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
};

export default Sidebar;
