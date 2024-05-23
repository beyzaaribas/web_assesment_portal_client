"use client"
import MainModal from "@/components/global/modal/MainModal";
import { getAnswerDetail, updateAnswer } from "@/services/answers";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";

const SetAnswer = (props) => {

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

  const getAnswer = async (id) => {
    const data = await getAnswerDetail(id);
    if (data.isSuccess == true) {
      setForm(data.answer);
    }
  };

  useEffect(() => {
    if (props.show && props.answerId) {
      getAnswer(props.answerId);
    }
  }, [props.show, props.answerId]);

  const validateForm = () => {
    const { answer } = form;
    const newErrors = {};
    if (!answer || !answer === "")
      newErrors.answer = "Please enter answer.";

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
      const data = await updateAnswer(form._id, form);
      setIsLoading(false);

      if (data.isSuccess) {
        Swal.fire({
          icon: "success",
          text: data.message,
        }).then((result) => {
          if (result.isConfirmed) {
            props.getAnswers(form.questionId);
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
    <MainModal {...props}  modalSize={"md"}>

      <Col md={12}>
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

      <Col md={12} style={{ position: "relative" }} className="mt-2">
        <button
          className="create-btn"
          type="button"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Update Answer
        </button>
      </Col>

    </MainModal>
  );
};

export default SetAnswer;