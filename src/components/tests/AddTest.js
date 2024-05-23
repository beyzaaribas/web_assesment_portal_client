"use client";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import MainModal from "../global/modal/MainModal";
import { createTest } from "@/services/tests";
import Swal from "sweetalert2";
import BaseLoader from "../loader/baseLoader";
import { getAllCategories } from "@/services/categories";

const AddTest = (props) => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([])

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
    const { title, description, categoryId } = form;
    const newErrors = {};
    if (!title || !title === "") newErrors.title = "Please enter test title.";
    if (!description || !description === "")
      newErrors.description = "Please enter test description.";
    if (!categoryId || !categoryId === "")
      newErrors.categoryId = "Please select test category.";

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
      const data = await createTest(form);
      setIsLoading(false);

      if (data.isSuccess) {
        Swal.fire({
          icon: "success",
          text: data.message,
        }).then((result) => {
          if (result.isConfirmed) {
            props.onHide();
            props.getTests();
            setForm({});
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

  //getCategories
  const getCategories = async () => {
    const data = await getAllCategories();
    if (data.isSuccess == true) {
      setCategories(data.categories);
    } else {
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

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
          <option value="0">Select A Category</option>
            {
              categories.map((item) => {
                return(
                  <option value={item._id}>{item.categoryName}</option>
                )
              })
            }
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
          Create Test
        </button>
      </Col>
    </MainModal>
  );
};

export default AddTest;
