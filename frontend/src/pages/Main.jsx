import React, { useState } from "react";
import { Header, Statistics, Table } from "../components";

const headers = [
  "Customer Name",
  "Company",
  "Phone Number",
  "Email",
  "Country",
  "Status",
  "Email",
];

// Dummy data
const rows = [
  {
    customer_name: "Jane Cooper",
    company: "Microsoft",
    phone_number: "(225) 555-0118",
    email: "jane@microsoft.com",
    country: "United States",
    status: <span className="text-green-600 font-semibold">Active</span>,
  },
  {
    customer_name: "Floyd Miles",
    company: "Yahoo",
    phone_number: "(205) 555-0100",
    email: "floyd@yahoo.com",
    country: "Kiribati",
    status: <span className="text-red-500 font-semibold">Inactive</span>,
  },
  {
    customer_name: "John Doe",
    company: "Google",
    phone_number: "(300) 555-0199",
    email: "john@google.com",
    country: "United States",
    status: <span className="text-green-600 font-semibold">Active</span>,
  },
  {
    customer_name: "Alice Johnson",
    company: "Apple",
    phone_number: "(400) 555-0155",
    email: "alice@apple.com",
    country: "Canada",
    status: <span className="text-red-500 font-semibold">Inactive</span>,
  },
  {
    customer_name: "John Doe",
    company: "Google",
    phone_number: "(300) 555-0199",
    email: "john@google.com",
    country: "United States",
    status: <span className="text-green-600 font-semibold">Active</span>,
  },
  {
    customer_name: "Alice Johnson",
    company: "Apple",
    phone_number: "(400) 555-0155",
    email: "alice@apple.com",
    country: "Canada",
    status: <span className="text-red-500 font-semibold">Inactive</span>,
  },
  {
    customer_name: "John Doe",
    company: "Google",
    phone_number: "(300) 555-0199",
    email: "john@google.com",
    country: "United States",
    status: <span className="text-green-600 font-semibold">Active</span>,
  },
  {
    customer_name: "Alice Johnson",
    company: "Apple",
    phone_number: "(400) 555-0155",
    email: "alice@apple.com",
    country: "Canada",
    status: <span className="text-red-500 font-semibold">Inactive</span>,
  },
  {
    customer_name: "John Doe",
    company: "Google",
    phone_number: "(300) 555-0199",
    email: "john@google.com",
    country: "United States",
    status: <span className="text-green-600 font-semibold">Active</span>,
  },
  {
    customer_name: "Alice Johnson",
    company: "Apple",
    phone_number: "(400) 555-0155",
    email: "alice@apple.com",
    country: "Canada",
    status: <span className="text-red-500 font-semibold">Inactive</span>,
  },
  {
    customer_name: "John Doe",
    company: "Google",
    phone_number: "(300) 555-0199",
    email: "john@google.com",
    country: "United States",
    status: <span className="text-green-600 font-semibold">Active</span>,
  },
  {
    customer_name: "Alice Johnson",
    company: "Apple",
    phone_number: "(400) 555-0155",
    email: "alice@apple.com",
    country: "Canada",
    status: <span className="text-red-500 font-semibold">Inactive</span>,
  },
  {
    customer_name: "John Doe",
    company: "Google",
    phone_number: "(300) 555-0199",
    email: "john@google.com",
    country: "United States",
    status: <span className="text-green-600 font-semibold">Active</span>,
  },
  {
    customer_name: "Alice Johnson",
    company: "Apple",
    phone_number: "(400) 555-0155",
    email: "alice@apple.com",
    country: "Canada",
    status: <span className="text-red-500 font-semibold">Inactive</span>,
  },
];

const Main = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8; 

  const totalSubmissions = rows.length;

  const totalPages = Math.ceil(totalSubmissions / limit);

  const displayedRows = rows.slice((currentPage - 1) * limit, currentPage * limit);

  return (
    <div className="flex flex-col gap-10 p-5 xl:px-20 xl:py-10 h-full h-full">
      <Header />
      <Statistics />
      <Table
        headers={headers}
        rows={displayedRows} 
        totalSubmissions={totalSubmissions}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
          }
        }}
      />
    </div>
  );
};

export default Main;
