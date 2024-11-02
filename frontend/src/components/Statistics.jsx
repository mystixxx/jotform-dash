import React from "react";
import { IoCreateOutline } from "react-icons/io5";
import { RiContractLine } from "react-icons/ri";
import { BsCalendarCheck } from "react-icons/bs";
import PropTypes from "prop-types";
import Moment from 'moment';

const StatCard = ({ icon, title, value }) => {
  const formattedValue =
    typeof value === "number" ? value.toLocaleString("en-US") : Moment(value).format('LL');

  return (
    <div className="flex items-center space-x-4 p-4">
      <div className="flex justify-center items-center w-[42px] h-[42px] xl:w-[84px] xl:h-[84px] rounded-full bg-green-gradient text-lg xl:text-4xl">
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

const Statistics = ({submissions, lastSubmission, created}) => {
  
  return (
    <div className="flex lg:space-x-8 flex-col lg:flex-row justify-evenly bg-white p-4 xl:p-6 rounded-xl shadow-lg w-full">
      <StatCard
        icon={<RiContractLine className="text-green-500" />}
        title="Total Submissions"
        value={parseInt(submissions)}
      />
      <div className="border-r border-[#F0F0F0]"></div>
      <StatCard
        icon={<BsCalendarCheck className="text-green-500" />}
        title="Last Submission At"
        value={lastSubmission}
      />
      <div className="border-r border-[#F0F0F0]"></div>
      <StatCard
        icon={<IoCreateOutline className="text-green-500" />}
        title="Form Created At"
        value={created}
      />
    </div>
  );
};

export default Statistics;
