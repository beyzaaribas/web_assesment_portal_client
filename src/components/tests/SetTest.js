"use client";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import MainModal from "../global/modal/MainModal";
import { createTest, getTestDetail, updateTest } from "@/services/tests";
import Swal from "sweetalert2";
import BaseLoader from "../loader/baseLoader";

const SetTest = (props) => {
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

  const getTest = async (id) => {
    const data = await getTestDetail(id);
    if (data.isSuccess == true) {
      setForm(data.tests);
    }
  };

  useEffect(() => {
    if (props.show && props.testId) {
      getTest(props.testId);
    }
  }, [props.show, props.testId]);

  const validateForm = () => {
    const { title, description, categoryId } = form;
    const newErrors = {};
    if (!title || !title === "") newErrors.title = "Please enter test title.";
    if (!description || !description === "")
      newErrors.description = "Please enter test description.";
    if (!categoryId || !categoryId === "")
      newErrors.categoryId = "Please select test category.";

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
      const data = await updateTest(form._id, form);
      setIsLoading(false);

      if (data.isSuccess) {
        Swal.fire({
          icon: "success",
          text: data.message,
        }).then((result) => {
          if (result.isConfirmed) {
            props.getTests();
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
    <MainModal {...props}>
      {isLoading ? <BaseLoader /> : ""}

      <Col md={4}>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => {
            setField("title", e.target.value);
          }}
          value={form.title}
          required
          isInvalid={!!errors.title}
          className={!!errors.title && "red-border"}
        />
      </Col>

      <Col md={4}>
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => {
            setField("description", e.target.value);
          }}
          value={form.description}
          required
          isInvalid={!!errors.description}
          className={!!errors.description && "red-border"}
        />
      </Col>

      <Col md={4}>
        <Form.Label>Category</Form.Label>
        <Form.Select
          onChange={(e) => {
            setField("categoryId", e.target.value);
          }}
          value={form.categoryId}
          required
          isInvalid={!!errors.categoryId}
          className={!!errors.categoryId && "red-border"}
        >
          <option value="1">Software</option>
          <option value="2">Technology</option>
          <option value="3">Finance</option>
        </Form.Select>
      </Col>

      <Col md={12} style={{ position: "relative" }} className="mt-2">
        <button
          className="create-btn"
          type="button"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Update Test
        </button>
      </Col>
    </MainModal>
  );
};

export default SetTest;
