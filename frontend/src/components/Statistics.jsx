import React from "react";
import { IoCreateOutline } from "react-icons/io5";
import { RiContractLine } from "react-icons/ri";
import { BsCalendarCheck } from "react-icons/bs";
import PropTypes from "prop-types";

const StatCard = ({ icon, title, value }) => {
  const formattedValue =
    typeof value === "number" ? value.toLocaleString("en-US") : value;

  return (
    <div className="flex items-center space-x-4 p-4">
      <div className="flex justify-center items-center w-10 h-10 xl:w-20 xl:h-20 rounded-full bg-green-gradient text-lg xl:text-4xl">
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl xl:text-3xl font-semibold text-gray-800">{formattedValue}</p>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

const Statistics = () => {
  return (
    <div className="flex lg:space-x-8 flex-col lg:flex-row justify-evenly bg-white p-4 xl:p-6 rounded-xl shadow-lg w-full">
      <StatCard
        icon={<RiContractLine className="text-green-500" />}
        title="Total Submissions"
        value={5423}
      />
      <div className="border-r border-[#F0F0F0]"></div>
      <StatCard
        icon={<BsCalendarCheck className="text-green-500" />}
        title="Last Submission At"
        value={1893}
      />
      <div className="border-r border-[#F0F0F0]"></div>
      <StatCard
        icon={<IoCreateOutline className="text-green-500" />}
        title="Form Created At"
        value={189}
      />
    </div>
  );
};

export default Statistics;
