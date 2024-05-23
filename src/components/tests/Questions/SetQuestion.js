"use client";
import MainModal from "@/components/global/modal/MainModal";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";
import { getQuestionDetail, updateQuestion } from "@/services/questions";

const SetQuestion = (props) => {

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const getQuestion = async (id) => {
    const data = await getQuestionDetail(id);
    if (data.isSuccess == true) {
      setForm(data.question);
    }
  };

  useEffect(() => {
    if (props.show && props.questionId) {
      getQuestion(props.questionId);
    }
  }, [props.show, props.questionId]);

  const validateForm = () => {
    const { question } = form;
    const newErrors = {};
    if (!question || !question === "")
      newErrors.question = "Please enter question.";

    return newErrors;
  };

  //submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    try {
      const data = await updateQuestion(form._id, form);
      setIsLoading(false);

      if (data.isSuccess) {
        Swal.fire({
          icon: "success",
          text: data.message,
        }).then((result) => {
          if (result.isConfirmed) {
            props.getQuestions(form.testId);
            props.onHide();
          }
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
  return (
    <MainModal {...props} buttonText={"Set Question"} modalSize={"md"}>

      <Col md={12}>
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


      <Col md={12} style={{ position: "relative" }} className="mt-2">
        <button
          className="create-btn"
          type="button"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Update Question
        </button>
      </Col>

    </MainModal>
  );
};

export default SetQuestion;