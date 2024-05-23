import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import "./MainModal.css"

const MainModal = (props) => {
  return (
       <Modal {...props}  size={props.modalSize != null ? props.modalSize : "lg"} centered aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Row>

      {props.children}



      </Row>
      </Modal.Body>
    </Modal>
  )
}

export default MainModal
