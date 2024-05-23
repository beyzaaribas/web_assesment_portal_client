"use client";
import React, { useEffect, useState } from "react";
import "./Results.css";
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

import ViewResult from "./ViewResult";
import { getAllResults } from "@/services/results";

const ResultList = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [results, setResults] = useState([]);
  const [resultId, setResultId] = useState();
  const [isLoading, setIsLoading] = useState(false);

  //getTests
  const getResults = async () => {
    const data = await getAllResults();
    if (data.isSuccess == true) {
      setResults(data.userResult);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  const columns = [
    {
      dataField: "user[0].username",
      text: "Username",
      searchable: true,
    },
    {
      dataField: "user[0].company",
      text: "Company",
      searchable: false,
    },
    {
      dataField: "user[0].mail",
      text: "Mail",
      searchable: false,
    },
    {
      dataField: "statu",
      text: "STATU",
      searchable: false,
      formatter: (cellContent, row) => (
        <span>{row.statu ? "Completed" : "Pending"}</span>
      ),
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cellContent, row) => (
        <div className="row-buttons">
          {row.statu ? (
            <button
              className="edit-row"
              onClick={() => {
                handleShow();
                setResultId(row._id);
              }}
            >
              <Eye />
            </button>
          ) : (
            <button
              className="edit-row"
              onClick={() => {
                handleShow();
                setResultId(row._id);
              }}
            >
              <Eye />
            </button>
          )}
        </div>
      ),
      searchable: false,
    },
  ];

  return (
    <div className="results">
      <ViewResult
        show={show}
        onHide={() => handleClose()}
        modalTitle="Result"
        resultId={resultId}
        getResults={getResults}
      />

      <MainTable sizePerPage={5} data={results} columns={columns} />
    </div>
  );
};

export default ResultList;
