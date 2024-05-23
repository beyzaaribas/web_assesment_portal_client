import React from "react";
import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import MainModal from "../global/modal/MainModal";

const SetCompany = (props) => {
  return (
    <MainModal {...props} buttonText={"Set Company"} modalSize={"md"}>

      <Col md={12}>
        <Form.Label>Company Name</Form.Label>
        <Form.Control value="EchoPerks" type="text" />
      </Col>



    </MainModal>
  );
};

export default SetCompany;