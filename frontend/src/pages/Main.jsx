import React, { useState, useEffect, useCallback } from "react";
import { Header, Statistics, Table } from "../components";
import { fetchFormInfo } from "../api/dashboard/getFormsInfo";
import { fetchFormQuestions } from "../api/dashboard/getFormQuestions";
import { fetchFormAnswers } from "../api/dashboard/getFormAnswers";
import { createFormTable } from "../api/database/createFormTable";
import { importAnswers } from "../api/database/importAnswers";

const allowedQuestionTypes = [
  "control_textbox",
  "control_textarea",
  "control_dropdown",
  "control_radio",
  "control_checkbox",
  "control_fileupload",
  "control_fullname",
  "control_email",
  "control_datetime",
  "control_phone",
  "control_address",
];

const Main = ({ selectedForm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userFormInfo, setUserFormInfo] = useState(null);
  const [formQuestions, setFormQuestions] = useState([]);
  const [formAnswers, setFormAnswers] = useState([]);
  const matchedAnswers = [];
  const limit = 8;

  // Fetch form information data
  const fetchFormInfoData = useCallback(async () => {
    try {
      const data = await fetchFormInfo(selectedForm?.id);
      setUserFormInfo(data);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  }, [selectedForm]);

  // Fetch form questions data
  const fetchFormQuestionsData = useCallback(async () => {
    try {
      const questionsData = await fetchFormQuestions(selectedForm?.id);
      const questionsArray = Object.values(questionsData.content || {});
      const filteredQuestions = questionsArray
        .filter((question) => allowedQuestionTypes.includes(question.type))
        .map((question) => ({
          name: question.name,
          text: question.text || question.label || question.name,
          type: question.type,
        }));

      setFormQuestions(filteredQuestions);
      if (filteredQuestions.length > 0 && userFormInfo) {
        const formTitle = "form_" + userFormInfo?.content?.id;
        await createFormTable(formTitle, filteredQuestions);
      }
    } catch (error) {
      console.error("Failed to fetch form questions:", error);
    }
  }, [selectedForm]);

  // Fetch form answers data
  const fetchFormAnswersData = useCallback(async () => {
    try {
      const answersData = await fetchFormAnswers(selectedForm?.id);
      setFormAnswers(answersData?.content || []);
    } catch (error) {
      console.error("Failed to fetch form answers:", error);
    }
  }, [selectedForm]);

  // Effect to fetch data when selectedForm changes
  useEffect(() => {
    if (selectedForm) {
      fetchFormInfoData();
      fetchFormQuestionsData();
      fetchFormAnswersData();
    }
  }, [
    fetchFormInfoData,
    fetchFormQuestionsData,
    fetchFormAnswersData,
    selectedForm,
  ]);

  formAnswers.forEach(async (submission) => {
    const answerEntries = Object.values(submission.answers || {});

    const answersForSubmission = answerEntries
      .map((entry) => {
        const answerType = entry?.type;
        if (!answerType) {
          return null;
        }

        const question = formQuestions.find(
          (question) => question.name === entry.name
        );
        if (!question) {
          return null;
        }

        const answerText =
          entry.prettyFormat ||
          (typeof entry.answer === "object"
            ? JSON.stringify(entry.answer)
            : entry.answer || "No answer provided");

        return {
          questionText: question?.name,
          answer: answerText !== "No answer provided" ? answerText : undefined,
        };
      })
      .filter(Boolean);

    matchedAnswers.push(answersForSubmission);

    // Prepare submissionData to send to the corresponding table and fields
    const submissionData = {};
    answersForSubmission.forEach(({ questionText, answer }) => {
      // Assuming questionText corresponds to field names in the table
      if (answer) {
        // Only include answers that are not undefined
        submissionData[questionText] = answer;
      }
    });

    // Send the data to the corresponding table and fields
    try {
      await importAnswers(selectedForm?.id, submissionData); // Ensure that selectedForm is defined
      console.log("Submission recorded successfully!", submissionData);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  });

  const totalSubmissions = formAnswers.length;
  const totalPages = Math.ceil(totalSubmissions / limit);

  return (
    <div className="flex flex-col gap-10 p-5 xl:px-20 xl:py-10 h-full">
      <Header />
      {selectedForm && (
        <>
          <Statistics
            submissions={userFormInfo?.content?.count}
            lastSubmission={
              userFormInfo?.content?.last_submission || "None Yet"
            }
            created={userFormInfo?.content?.created_at}
          />
          <Table
            title={userFormInfo?.content?.title}
            headers={formQuestions}
            rows={matchedAnswers}
            totalSubmissions={totalSubmissions}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              if (page > 0 && page <= totalPages) {
                setCurrentPage(page);
              }
            }}
          />
        </>
      )}
    </div>
  );
};

export default Main;
