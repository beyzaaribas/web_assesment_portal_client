import React from "react";
import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import MainModal from "../global/modal/MainModal";

const AddCustomer = (props) => {
  return (
    <MainModal {...props} buttonText={"Add User"}>

      <Col md={4}>
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" />
      </Col>

      <Col md={4}>
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" />
      </Col>

      <Col md={4}>
        <Form.Label>Position</Form.Label>
        <Form.Select>
          <option value="1">Developer</option>
          <option value="2">Designer</option>
          <option value="3">Manager</option>
        </Form.Select>
      </Col>

      <Col md={4}>
        <Form.Label>Team</Form.Label>
        <Form.Select>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </Col>

      <Col md={4}>
        <Form.Label>Birtday</Form.Label>
        <Form.Control type="date" />
      </Col>

      <Col md={4}>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" />
      </Col>

      <Col md={4}>
        <Form.Label>Password Again</Form.Label>
        <Form.Control type="password" />
      </Col>

      <Col md={4}>
        <Form.Label>Gender</Form.Label>
        <Form.Control type="text" />
      </Col>
    </MainModal>
  );
};

export default AddCustomer;