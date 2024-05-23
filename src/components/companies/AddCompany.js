"use client"
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import MainModal from "../global/modal/MainModal";
import { addCompanies } from "@/services/companies";
import Swal from "sweetalert2";
import BaseLoader from "../loader/baseLoader";

const AddCompany = (props) => {
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
    const { companyName } = form;
    const newErrors = {};
    if (!companyName || !companyName === "") newErrors.companyName = "Please enter company name.";
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
      const data = await addCompanies(form);
      setIsLoading(false);

      if (data.isSuccess) {
        Swal.fire({
          icon: "success",
          text: data.message,
        }).then((result) => {
          if (result.isConfirmed) {
            setForm({});
            props.onHide()
            props.getCompanies()
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
        <Form.Label>Company Name</Form.Label>
        <Form.Control
          onChange={(e) => {
            setField("companyName", e.target.value);
          }}
          type="text"
          value={form.companyName}
          isInvalid={!!errors.companyName}
          className={!!errors.companyName && "red-border"}
        />
        <Form.Control.Feedback type="invalid">
          {errors.companyName}
        </Form.Control.Feedback>

        <Col md={12} style={{ position: "relative" }}>
        <button
          className="create-btn"
          type="button"

          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Add Company
        </button>
      </Col>
      </Col>
    </MainModal>
  );
};

export default AddCompany;
