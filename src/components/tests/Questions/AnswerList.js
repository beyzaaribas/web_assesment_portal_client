"useClient"
import React, { useState } from 'react'
import { ClipboardCheck, PencilSquare, XCircle } from "react-bootstrap-icons";
import MainTable from '@/components/global/table/MainTable'
import {Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import SetAnswer from './SetAnswer';
import { deleteAnswer } from '@/services/answers';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const AnswerList = (props) => {

  const [answerId, setAnswerId] = useState()
  const [editAnswerShow, setEditAnswerShow] = useState(false);
  const handleEditAnswerClose = () => setEditAnswerShow(false);
  const handleEditAnswerShow = () => setEditAnswerShow(true);


  const columns = [
    {
      dataField: "answer",
      text: "Answer",
      searchable: true,
    },

    {
        dataField: "actions",
        text: "Actions",
        formatter: (cellContent, row) => (
          <div className="row-buttons">
            <button className="edit-row" onClick={() => {
              handleEditAnswerShow()
              setAnswerId(row._id)
            }}>
              <PencilSquare />
            </button>

            <button
            className="delete-row"
            onClick={() => {
              deleteAnswerSwal(row._id);
            }}
          >
            <XCircle />
          </button>
          </div>
        ),
        searchable: false,
      },
  ];

  const handleDeleteAnswer = async (id) => {
    try {
      const result = await deleteAnswer(id);
      if (result.isSuccess) {
        toast.success(result.message);
        props.getAnswers(props.questionId);
        Swal.close();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the answer.");
    }
  };

  const deleteAnswerSwal = (id) => {
    Swal.fire({
      title: "Are You Sure?",
      text: "You are deleting the answer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await handleDeleteAnswer(id);
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
    {props.answers != null ? (
          <MainTable
            sizePerPage={4}
            class="point-history-table"
            data={props.answers}
            columns={columns}
          />
        ) : (
          ""
        )}
    <SetAnswer
          show={editAnswerShow}
          onHide={() => handleEditAnswerClose()}
          modalTitle="Set Answer"
          answerId={answerId}
          getAnswers={props.getAnswers}
        />
    </Col>
   </Row>
  )
}

export default AnswerList
