"use client";
import React, { useEffect, useState } from "react";
import "./Tests.css";
import MainTable from "../global/table/MainTable";
import {
  Coin,
  Eye,
  PencilSquare,
  PersonFillSlash,
  PlusCircleFill,
  QuestionCircle,
  XCircle,
} from "react-bootstrap-icons";
import UsersData from "../../dummy/users.json";
import AddTest from "./AddTest";
import Questions from "./Questions/Questions";
import SetTest from "./SetTest";
import { deleteTest, getAllTests } from "@/services/tests";
import BaseLoader from "../loader/baseLoader";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const TestList = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editShow, setEditShow] = useState(false);
  const handleEditClose = () => setEditShow(false);
  const handleEditShow = () => setEditShow(true);

  const [questionShow, setQuestionShow] = useState(false);
  const handleQuestionClose = () => setQuestionShow(false);
  const handleQuestionShow = () => setQuestionShow(true);
  const [isLoading, setIsLoading] = useState(false);

  const [tests, setTests] = useState([]);
  const [testId, setTestId] = useState();

  //getTests
  const getTests = async () => {
    const data = await getAllTests();
    if (data.isSuccess == true) {
      setTests(data.tests);
    }
  };

  useEffect(() => {
    getTests();
  }, []);

  const handleDeleteTest = async (id) => {
    try {
      const result = await deleteTest(id);
      setIsLoading(true);
      if (result.isSuccess) {
        toast.success(result.message);
        getTests();
        setIsLoading(false);
        Swal.close();
      } else {
        toast.error(result.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the team.");
      setIsLoading(false);
    }
  };

  const deleteTestSwal = (id) => {
    Swal.fire({
      title: "Are You Sure?",
      text: "You are deleting the test",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await handleDeleteTest(id);
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while deactivating the user.");
        }
      }
    });
  };

  const columns = [
    {
      dataField: "title",
      text: "Title",
      searchable: true,
    },
    {
      dataField: "description",
      text: "Description",
      searchable: false,
    },
    {
      dataField: "categoryName",
      text: "Category",
      searchable: false,
    },

    {
      dataField: "actions",
      text: "Actions",
      formatter: (cellContent, row) => (
        <div className="row-buttons">
          <button
            className="edit-row"
            onClick={() => {
              handleEditShow();
              setTestId(row._id);
            }}
          >
            <PencilSquare />
          </button>
          <button
            className="edit-row"
            onClick={() => {
              handleQuestionShow();
              setTestId(row._id);
            }}
          >
            <QuestionCircle />
          </button>
          <button
            className="delete-row"
            onClick={() => {
              deleteTestSwal(row._id);
            }}
          >
            <XCircle />
          </button>
        </div>
      ),
      searchable: false,
    },
  ];

  return (
    <div className="tests">
      {isLoading ? <BaseLoader /> : ""}

      <button className="create-btn" onClick={handleShow}>
        <span className="create-btn-icon">
          <PlusCircleFill />
        </span>
        Add New Test
      </button>
      <AddTest
        show={show}
        onHide={() => handleClose()}
        modalTitle="Add New Test"
        getTests={getTests}
      />
      <SetTest
        show={editShow}
        onHide={() => handleEditClose()}
        modalTitle="Set User"
        testId={testId}
        getTests={getTests}
      />
      <Questions
        show={questionShow}
        onHide={() => handleQuestionClose()}
        modalTitle="Questions"
        testId={testId}
      />

      <MainTable sizePerPage={5} data={tests} columns={columns} />
    </div>
  );
};

export default TestList;
