"use client"
import React, { useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import MainModal from "../../global/modal/MainModal";

import AnswerList from "./AnswerList";
import { createAnswer, getAllAnswers } from "@/services/answers";
import Swal from "sweetalert2";

const Answers = (props) => {

  const [form, setForm] = useState([]);
  const [errors, setErrors] = useState({});
const [isLoading, setIsLoading] = useState(false);
const [answers, setAnswers] = useState([]);
const [answerId, setAnswerId] = useState();

const setField = (field, value) => {
setForm({
  ...form,
  [field]: value,
});

if (!!errors[field])
  setErrors({
    ...errors,
    [field]: null,
  });
};

const validateForm = () => {
const { answer } = form;
const newErrors = {};
if (!answer || !answer === "")
  newErrors.answer = "Please enter answer.";

return newErrors;
};

const handleSubmit = async (e) => {
e.preventDefault();
const formErrors = validateForm();
if (Object.keys(formErrors).length > 0) {
  setErrors(formErrors);
  return;
}

setIsLoading(true);
try {
  const data = await createAnswer(form);
  setIsLoading(false);
  if (data.isSuccess) {
    Swal.fire({
      icon: "success",
      text: data.message,
    }).then((result) => {
      getAnswers(props.questionId);
      setField("answer", "");
    });
  } else {
    Swal.fire({
      icon: "error",
      text: data.message,
    });
  }
} catch (error) {
  console.error("Error:", error);
  Swal.fire({
    icon: "error",
    text: "An error occurred. Please try again later.",
  });
}
};


  //getAnswers
  const getAnswers = async (id) => {
    const data = await getAllAnswers(id);
    if (data.isSuccess == true) {
      setAnswers(data.answers);
    }
  };

  useEffect(() => {
    getAnswers(props.questionId);
    setField("questionId", props.questionId)
  }, [props.questionId]);

  return (
    <MainModal {...props}  modalSize={"xl"}>
      <Row>
        <Col md={11}>
 
          <Form.Label>Answer</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => {
              setField("answer", e.target.value);
            }}
            value={form.answer}
            required
            isInvalid={!!errors.answer}
            className={!!errors.answer && "red-border"}
          />
        </Col>
        <Col md={1}>

        <button
            className="question-btn"
            type="button"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Add
          </button>
        </Col>
      </Row>

     <AnswerList answers={answers} getAnswers={getAnswers} questionId={props.questionId}/>


    </MainModal>
  );
};

export default Answers;
