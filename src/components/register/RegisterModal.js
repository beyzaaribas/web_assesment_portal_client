"use client";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import MainModal from "../global/modal/MainModal";
import { getCountries } from "@/helpers/countries";
import { createUser } from "@/services/auth";
import Swal from "sweetalert2";

const RegisterModal = (props) => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const countries = getCountries()

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
    const {
      email,
      password,
      username,
      fullname,
      numberOfEmployees,
      companyName,
      companySector,
      phoneNumber,
      country
    } = form;
    const newErrors = {};
    if (!email || !email === "") newErrors.email = "Please enter your email.";
    if (!password || !password === "")
      newErrors.password = "Please enter your password.";
    if (!username || !username === "")
      newErrors.username = "Please enter your username.";
    if (!fullname || !fullname === "")
      newErrors.fullname = "Please enter your fullname.";
    if (!numberOfEmployees || !numberOfEmployees === "")
      newErrors.numberOfEmployees = "Please enter your number of employees.";
    if (!companyName || !companyName === "")
      newErrors.companyName = "Please enter your company name.";
    if (!phoneNumber || !phoneNumber === "")
      newErrors.phoneNumber = "Please enter your phone number.";
    if (!companySector || !companySector === "")
      newErrors.companySector = "Please select a sector";
      if (!country || !country === "")
      newErrors.country = "Please select a country";
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
      const data = await createUser(form);
      setIsLoading(false);

      if (data.isSuccess) {
        Swal.fire({
          icon: "success",
          text: data.message,
        }).then((result) => {
          if (result.isConfirmed) {
            props.onHide();
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

  return (
    <MainModal {...props}>
      <Col md={4}>
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => {
            setField("fullname", e.target.value);
          }}
          value={form.fullname}
          required
          isInvalid={!!errors.fullname}
          className={!!errors.fullname && "red-border"}
        />
        <Form.Control.Feedback type="invalid">
          {errors.fullname}
        </Form.Control.Feedback>
      </Col>

      <Col md={4}>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => {
            setField("username", e.target.value);
          }}
          value={form.username}
          required
          isInvalid={!!errors.username}
          className={!!errors.username && "red-border"}
        />
        <Form.Control.Feedback type="invalid">
          {errors.username}
        </Form.Control.Feedback>
      </Col>

      <Col md={4}>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => {
            setField("email", e.target.value);
          }}
          value={form.email}
          required
          isInvalid={!!errors.email}
          className={!!errors.email && "red-border"}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Col>



      <Col md={4}>
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => {
            setField("phoneNumber", e.target.value);
          }}
          value={form.phoneNumber}
          required
          isInvalid={!!errors.phoneNumber}
          className={!!errors.phoneNumber && "red-border"}
        />
        <Form.Control.Feedback type="invalid">
          {errors.phoneNumber}
        </Form.Control.Feedback>
      </Col>

      <Col md={4}>
        <Form.Label>Company Name</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => {
            setField("companyName", e.target.value);
          }}
          value={form.companyName}
          required
          isInvalid={!!errors.companyName}
          className={!!errors.companyName && "red-border"}
        />
        <Form.Control.Feedback type="invalid">
          {errors.companyName}
        </Form.Control.Feedback>
      </Col>

      <Col md={4}>
        <Form.Label>Company Sector</Form.Label>
        <Form.Select
          onChange={(e) => {
            setField("companySector", e.target.value);
          }}
          value={form.companySector}
          required
          isInvalid={!!errors.companySector}
          className={!!errors.companySector && "red-border"}
        >
          <option value="0">Select a Category</option>
          <option value="1">Software</option>
          <option value="2">Finance</option>
          <option value="3">Technology</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.companySector}
        </Form.Control.Feedback>
      </Col>



      <Col md={4}>
        <Form.Label>Number of Employees</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => {
            setField("numberOfEmployees", e.target.value);
          }}
          value={form.numberOfEmployees}
          required
          isInvalid={!!errors.numberOfEmployees}
          className={!!errors.numberOfEmployees && "red-border"}
        />
        <Form.Control.Feedback type="invalid">
          {errors.numberOfEmployees}
        </Form.Control.Feedback>
      </Col>

      <Col md={4}>
        <Form.Label>Country</Form.Label>
        <Form.Select
          onChange={(e) => {
            setField("country", e.target.value);
          }}
          value={form.country}
          required
          isInvalid={!!errors.country}
          className={!!errors.country && "red-border"}
        >
          <option value="0">Select a Country</option>

        {countries.map((item) => {
            return(
                <option value={item.label}>{item.label}</option>

            )
        })}
      
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.country}
        </Form.Control.Feedback>
      </Col>

      <Col md={4}>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          onChange={(e) => {
            setField("password", e.target.value);
          }}
          value={form.password}
          required
          isInvalid={!!errors.password}
          className={!!errors.password && "red-border"}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Col>

      <Col md={12} style={{ position: "relative" }}>
        <button
          className="create-btn"
          type="button"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Sign Up
        </button>
      </Col>
    </MainModal>
  );
};

export default RegisterModal;
