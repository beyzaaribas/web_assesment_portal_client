"use client"
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import MainModal from "../global/modal/MainModal";
import { addCompanies } from "@/services/companies";
import Swal from "sweetalert2";
import BaseLoader from "../loader/baseLoader";
import { createCategory } from "@/services/categories";

const AddCategory = (props) => {
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

  const validateForm = () => {
    const { categoryName } = form;
    const newErrors = {};
    if (!categoryName || !categoryName === "") newErrors.categoryName = "Please enter category name.";
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
      const data = await createCategory(form);
      setIsLoading(false);

      if (data.isSuccess) {
        Swal.fire({
          icon: "success",
          text: data.message,
        }).then((result) => {
          if (result.isConfirmed) {
            setForm({});
            props.onHide()
            props.getCategories()
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
            {isLoading ? <BaseLoader /> : ""}

      <Col md={12}>
        <Form.Label>Category Name</Form.Label>
        <Form.Control
          onChange={(e) => {
            setField("categoryName", e.target.value);
          }}
          type="text"
          value={form.categoryName}
          isInvalid={!!errors.categoryName}
          className={!!errors.categoryName && "red-border"}
        />
        <Form.Control.Feedback type="invalid">
          {errors.categoryName}
        </Form.Control.Feedback>

        <Col md={12} style={{ position: "relative" }}>
        <button
          className="create-btn"
          type="button"

          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Add Category
        </button>
      </Col>
      </Col>
    </MainModal>
  );
};

export default AddCategory;
