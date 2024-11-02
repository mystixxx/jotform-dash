import React from "react";
import PropTypes from "prop-types";
import Pagination from "./Pagination";

const Table = ({
  headers,
  rows,
  totalSubmissions,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="px-10 py-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="py-5">
        <h1 className="text-2xl font-semibold text-black">Transcription</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-400 text-sm">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="py-3 px-2 text-left text-gray-500 font-medium uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {headers.map((header, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="py-4 whitespace-nowrap text-base text-[#292D32] font-medium"
                  >
                    {row[header.toLowerCase().replace(/\s+/g, "_")]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4 text-gray-500 text-xs">
        <p className="font-medium">
          Showing data {currentPage * 8 - 7} to{" "}
          {Math.min(currentPage * 8, totalSubmissions)} of {totalSubmissions}{" "}
          submissions
        </p>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalSubmissions: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Table;
