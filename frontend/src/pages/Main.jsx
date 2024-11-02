import React, { useState, useEffect, useCallback } from "react";
import { Header, Statistics, Table } from "../components";
import { fetchFormInfo } from "../api/dashboard/getFormsInfo";
import { fetchFormQuestions } from "../api/dashboard/getFormQuestions";

const formSubmissionsData = {
  "New Customer Registration Form": [
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
  ],
};

const Main = ({ selectedForm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userforminfo, setUserFormsInfo] = useState(null);
  const [formQuestions, setFormQuestions] = useState([]); 
  const limit = 8;

  const getFormsInfoData = useCallback(async () => {
    try {
      const data = await fetchFormInfo(selectedForm?.id);
      setUserFormsInfo(data);
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    }
  }, [selectedForm]);

  const getFormQuestionsData = useCallback(async () => {
    try {
      const questions = await fetchFormQuestions(selectedForm?.id);
      setFormQuestions(questions);
    } catch (err) {
      console.error("Failed to fetch form questions:", err);
    }
  }, [selectedForm]);

  useEffect(() => {
    if (selectedForm) {
      getFormsInfoData();
      getFormQuestionsData();
    }
  }, [getFormsInfoData, getFormQuestionsData, selectedForm]);

  const totalSubmissions = selectedForm
    ? formSubmissionsData[selectedForm.title]?.length || 0
    : 0;

    console.log(formQuestions)

  const totalPages = Math.ceil(totalSubmissions / limit);

  const displayedRows = selectedForm
    ? formSubmissionsData[selectedForm.title]?.slice(
        (currentPage - 1) * limit,
        currentPage * limit
      )
    : [];

  return (
    <div className="flex flex-col gap-10 p-5 xl:px-20 xl:py-10 h-full">
      <Header />
      {selectedForm && (
        <>
          <Statistics
            submissions={userforminfo?.content?.count}
            lastSubmission={userforminfo?.content?.last_submission || "None Yet"}
            created={userforminfo?.content?.created_at}
          />
          {/* <Table
            headers={[
              "Customer Name",
              "Company",
              "Phone Number",
              "Email",
              "Country",
              "Status",
            ]}
            rows={displayedRows}
            totalSubmissions={totalSubmissions}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              if (page > 0 && page <= totalPages) {
                setCurrentPage(page);
              }
            }}
          /> */}
        </>
      )}
    </div>
  );
};

export default Main;
