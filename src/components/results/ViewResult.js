import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import MainModal from "../global/modal/MainModal";
import { getResultDetail, sendResultToUser } from "@/services/results";
import "./Results.css";
import Swal from "sweetalert2";
import BaseLoader from "../loader/baseLoader";

const ViewResult = (props) => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userResult, setUserResult] = useState([]);

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

  const getResult = async (id) => {
    const data = await getResultDetail(id);
    if (data.isSuccess == true) {
      setUserResult(data.userResult);
      setForm(data.userResult);

    }
  };

  useEffect(() => {
    if (props.show && props.resultId) {
      getResult(props.resultId);
 
    }
  }, [props.show, props.resultId]);

  const validateForm = () => {
    const { resultMessage } = form;
    const newErrors = {};
    if (!resultMessage || !resultMessage === "")
      newErrors.resultMessage = "Please enter message.";

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
      const data = await sendResultToUser(form._id, form);
      setIsLoading(false);

      if (data.isSuccess) {
        Swal.fire({
          icon: "success",
          text: data.message,
        }).then((result) => {
          if (result.isConfirmed) {
            props.getResults();
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

      {userResult.length != 0 ? (
        <>
          <ul className="user-result-info">
            <li>
              Company:{" "}
              <b>
                {userResult.user[0].company ? userResult.user[0].company : ""}
              </b>
            </li>
            <li>
              E-Mail:{" "}
              <b>{userResult.user[0].mail ? userResult.user[0].mail : ""}</b>
            </li>
          </ul>

          <div className="question-answers">
            {userResult.questionAndAnswers.map((qa, index) => (
              <div key={index} className="qa">
                <p className="question">
                  Question {index + 1}: <b>{qa.question}</b>
                </p>
                <p className="answer">
                  Answer: <b>{qa.answer}</b>
                </p>
              </div>
            ))}
          </div>

          <div className="message-area">
            <Col md={12}>
              <Form.Label>Your Message</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setField("resultMessage", e.target.value);
                }}
                as="textarea"
                style={{ height: "150px" }}
              />
              <button
                onClick={(e) => {
                  handleSubmit(e);
                }}
                className="create-btn"
              >
                Send Message
              </button>
            </Col>
          </div>
        </>
      ) : (
        ""
      )}
    </MainModal>
  );
};

export default ViewResult;
