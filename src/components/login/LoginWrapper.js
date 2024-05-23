"use client"
import React, { useState } from 'react'
import "./LoginWrapper.css"
import { Col, Form, Row } from 'react-bootstrap'
import { AwardFill } from 'react-bootstrap-icons'
import { login } from "@/services/auth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import BaseLoader from "../loader/baseLoader";
import RegisterModal from '../register/RegisterModal'
import { useUserContext } from '@/contexts/UserContext'


const LoginWrapper = () => {

  const { user, setUser } = useUserContext();

  const router = useRouter();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    const { email, password } = form;
    const newErrors = {};
    if (!email || !email === "")
      newErrors.email = "Please enter your email.";
    if (!password || !password === "")
      newErrors.password = "Please enter your password.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {

      setIsLoading(true)
      const loginControl = await login(form);
      if (loginControl.isSuccess == true) {
        setIsLoading(false)
        toast.success("Login successful.");
        setUser(loginControl.user)
        document.cookie = `token=${loginControl.token}`;
        localStorage.setItem("userId", loginControl.user._id)
        localStorage.setItem("userType", loginControl.user.userType)

        setTimeout(() => {
        if(loginControl.user.userType == 1){
          router.push("/");
        }else{
          router.push("/")
        }
        }, 1000);
      } else {
        setIsLoading(false)
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: loginControl.message,
        });
      }
    }
  };

  return (
    <div className='login-wrapper'>
    <div className='login-content'>
    <span className='login-icon'><AwardFill/> </span>

      <div className='login-form'>
   <div className='logo-box_login'>
   <img src={"/img/logoAdmin.png"}/>
   <RegisterModal show={show} onHide={() => handleClose()} modalTitle="Register"/>

   </div>
    <form>
      <Row>
      <Col md={12}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setField("email", e.target.value);
                  }}
                  type="text"
                  value={form.email}
                  isInvalid={!!errors.email}
                  className={!!errors.email && "red-border"}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Col>

              <Col md={12}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setField("password", e.target.value);
                  }}
                  value={form.password}
                  type="password"
                  required
                  isInvalid={!!errors.password}
                  className={!!errors.password && "red-border"}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Col>

              <Col md={12} className="login-form-btn">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="create-btn"
                >
                  SIGN IN
                </button>

                <button
                  type="submit"
                  onClick={handleShow}
                  className="create-btn"
                >
                  SIGN UP
                </button>
                
      </Col>
      </Row>
    </form>
    </div>
    </div>

    <div className='login-img'>
    <img src=''></img>
    </div>
    </div>
  )
}

export default LoginWrapper
