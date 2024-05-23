"use client";
import React, { useEffect, useState } from "react";
import "./Customers.css";
import MainTable from "../global/table/MainTable";
import { Coin, Eye, PencilSquare, PersonFillSlash, PlusCircleFill } from "react-bootstrap-icons";

import Swal from 'sweetalert2';
import UsersData from "../../dummy/users.json"
import SetCustomer from "./SetCustomer";
import AddCustomer from "./AddCustomer";
import { getAllCustomers } from "@/services/customers";



const CustomerList = () => {

  const [customers, setCustomers] = useState([])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editShow, setEditShow] = useState(false);
  const handleEditClose = () => setEditShow(false);
  const handleEditShow = () => setEditShow(true);

  const [userShow, setUserShow] = useState(false)
  const handleUserClose = () => setUserShow(false)
  const handleUserShow = () =>  setUserShow(true)

  const [pointShow, setPointShow] = useState(false)
  const handlePointClose = () => setPointShow(false)
  const handlePointShow = () =>  setPointShow(true)

  
  const  passiveUser = () => {
    Swal.fire({
        title: 'Are You Sure?',
        text: "You are deactivating the user",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText:"Cancel",
        confirmButtonText: 'Yes'
      }).then((result) => {
  
        if (result.isConfirmed) {
          Swal.close();
    
        }
      })
    }    


  const getCustomerList = async () => {
    const data = await getAllCustomers()
    if(data.isSuccess){
      setCustomers(data.user)
    }
  }

  useEffect(() => {
    getCustomerList()
  }, [])


   
  const columns = [

    {
      dataField: "fullname",
      text: "Fullname",
      searchable: true,
    },
    {
      dataField: "username",
      text: "Username",
      searchable: false,
    },
    {
      dataField: "phoneNumber",
      text: "Phone Number",
      searchable: false,
    },
    {
      dataField: "email",
      text: "E Mail",
      searchable: false,
    },
    {
      dataField: "companyName",
      text: "Company Name",
      searchable: false,
    },
    {
      dataField: "country",
      text: "Country",
      searchable: false,
    },


  ];

  return (
    <div className="customers">
      {/* <button className="create-btn"  onClick={handleShow}><span className="create-btn-icon"><PlusCircleFill/></span>Add New User</button> */}
      {/* <AddCustomer show={show} onHide={() => handleClose()} modalTitle="Add New User"/>
      <SetCustomer show={editShow} onHide={() => handleEditClose()}  modalTitle="Set User"/> */}
      <MainTable sizePerPage={5} data={customers} columns={columns} />
    </div>
  );
};

export default CustomerList;