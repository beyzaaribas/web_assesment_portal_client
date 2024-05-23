"useClient";
import React, { useEffect, useState } from "react";
import { ClipboardCheck, PencilSquare, XCircle } from "react-bootstrap-icons";
import MainTable from "@/components/global/table/MainTable";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import SetQuestion from "./SetQuestion";
import Answers from "./Answers";
import { formatDate } from "@/helpers/formatDate";
import { deleteQuestion } from "@/services/questions";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const QuestionList = (props) => {
  const [questionId, setQuestionId] = useState()



  const columns = [
    {
      dataField: "question",
      text: "Question",
      searchable: true,
    },

    {
      dataField: "createdAt",
      text: "Created Date",
      formatter: (cellContent, row) => formatDate(cellContent),

    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cellContent, row) => (
        <div className="row-buttons">
          <button className="edit-row" onClick={() => {
            handleEditQuestionShow()
            setQuestionId(row._id);

          }}>
            <PencilSquare />
          </button>

          <button className="edit-row" onClick={() => {
            handleAnswerShow()
            setQuestionId(row._id);

          }}>
            <ClipboardCheck />
          </button>

          <button
            className="delete-row"
            onClick={() => {
              deleteQuestionSwal(row._id);
            }}
          >
            <XCircle />
          </button>
        </div>
      ),
      searchable: false,
    },
  ];

  const [editQuestionShow, setEditQuestionShow] = useState(false);
  const handleEditQuestionClose = () => setEditQuestionShow(false);
  const handleEditQuestionShow = () => setEditQuestionShow(true);

  const [answerShow, setAnswerShow] = useState(false);
  const handleAnswerClose = () => setAnswerShow(false);
  const handleAnswerShow = () => setAnswerShow(true);

  
  const handleDeleteQuestion = async (id) => {
    try {
      const result = await deleteQuestion(id);
      if (result.isSuccess) {
        toast.success(result.message);
        props.getQuestions(props.testId);
        Swal.close();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the question.");
    }
  };

  const deleteQuestionSwal = (id) => {
    Swal.fire({
      title: "Are You Sure?",
      text: "You are deleting the question",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await handleDeleteQuestion(id);
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while deactivating the user.");
        }
      }
    });
  };

  return (
    <Row>
      <Col md={12}>
        {props.questions != null ? (
          <MainTable
            sizePerPage={4}
            class="point-history-table"
            data={props.questions}
            columns={columns}
          />
        ) : (
          ""
        )}

        <SetQuestion
          show={editQuestionShow}
          onHide={() => handleEditQuestionClose()}
          modalTitle="Set Question"
          questionId={questionId}
          getQuestions={props.getQuestions}
        />
        <Answers
          show={answerShow}
          onHide={() => handleAnswerClose()}
          modalTitle="Answers"
          questionId={questionId}
        />
      </Col>
    </Row>
  );
};

export default QuestionList;
