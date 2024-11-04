import React from "react";
import PropTypes from "prop-types";
import Pagination from "./Pagination";

const Table = ({
  title = "Table",
  headers,
  rows,
  totalSubmissions,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // create a combined row for each submission
  const createCombinedRow = (submissionAnswers) => {
    return submissionAnswers.reduce((acc, { questionText, answer }) => {
      const header = headers.find((h) => h.name === questionText);
      if (header) {
        acc[header.text] =
          header.type === "control_address" && answer
            ? answer.replace(/<br\s*\/?>/gi, ", ").trim()
            : answer || "-";
      }
      return acc;
    }, {});
  };

  const renderTableHeaders = () => (
    <tr>
      {headers.map((header, index) => (
        <th
          key={index}
          className="py-3 px-2 text-left text-gray-500 font-medium uppercase tracking-wider text-center"
        >
          {header.text}
        </th>
      ))}
    </tr>
  );

  const renderTableRows = () => (
    <tbody className="divide-y divide-gray-200">
      {rows.map((submissionAnswers, rowIndex) => {
        const combinedRow = createCombinedRow(submissionAnswers);
        return (
          <tr key={rowIndex} className="hover:bg-gray-50">
            {headers.map((header, cellIndex) => (
              <td
                key={cellIndex}
                className="py-4 text-base text-[#292D32] font-medium text-center"
              >
                {combinedRow[header.text] ?? "-"}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );

  return (
    <div className="px-10 py-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="py-5">
        <h1 className="text-2xl font-semibold text-black">{title}</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-400 text-sm">
          <thead>{renderTableHeaders()}</thead>
          {renderTableRows()}
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
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      type: PropTypes.string,
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.array).isRequired,
  totalSubmissions: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Table;
