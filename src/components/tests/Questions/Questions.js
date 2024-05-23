"use client";
import React, { useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import MainModal from "../../global/modal/MainModal";
import QuestionList from "./QuestionList";
import { createQuestion, getAllQuestions } from "@/services/questions";
import Swal from "sweetalert2";

const Questions = (props) => {
  const [form, setForm] = useState([]);
      const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionId, setQuestionId] = useState();

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
    const { question } = form;
    const newErrors = {};
    if (!question || !question === "")
      newErrors.question = "Please enter question.";

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
      const data = await createQuestion(form);
      setIsLoading(false);
      if (data.isSuccess) {
        Swal.fire({
          icon: "success",
          text: data.message,
        }).then((result) => {
          getQuestions(props.testId);
          setField("question", "");
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

  //getQuestions
  const getQuestions = async (id) => {
    if(id != null || id != undefined){
      const data = await getAllQuestions(id);
      if (data.isSuccess == true) {
        setQuestions(data.questions);
      }
    }

  };

  useEffect(() => {
    getQuestions(props.testId);
    setField("testId", props.testId)
  }, [props.testId]);

  return (
    <MainModal {...props} modalSize={"xl"}>
      <Row>
        <Col md={11}>
          <Form.Label>Question</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => {
              setField("question", e.target.value);
            }}
            value={form.question}
            required
            isInvalid={!!errors.question}
            className={!!errors.question && "red-border"}
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

      <QuestionList questions={questions} getQuestions={getQuestions} testId={props.testId} />
    </MainModal>
  );
};

export default Questions;
