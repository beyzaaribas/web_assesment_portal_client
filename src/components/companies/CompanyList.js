"use client";
import React, { useEffect, useState } from "react";
import "./Companies.css";
import MainTable from "../global/table/MainTable";
import { Coin, Eye, PencilSquare, PersonFillSlash, PlusCircleFill, QuestionCircle, XCircle } from "react-bootstrap-icons";
import UsersData from "../../dummy/users.json"
import AddCompany from "./AddCompany";
import SetCompany from "./SetCompany";
import { getAllCompanies } from "@/services/companies";
import { formatDate } from "@/helpers/formatDate";
import BaseLoader from "../loader/baseLoader";




const CompanyList = () => {

  const [companyList, setCompanyList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [companyId, setCompanyId] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editShow, setEditShow] = useState(false);
  const handleEditClose = () => setEditShow(false);
  const handleEditShow = () => setEditShow(true);
 
  //getCompanies
  const getCompanies = async () => {
    setIsLoading(true);
    const data = await getAllCompanies();
    if (data.isSuccess == true) {
      setCompanyList(data.companies);
      console.log(data.companies)
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);
  
  const columns = [
    {
      dataField: "companyName",
      text: "Company",
      searchable: true,
    },
    {
      dataField: "createdAt",
      text: "Create Date",
      searchable: false,
      formatter: (cellContent, row) => formatDate(cellContent),

    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cellContent, row) => (
        <div className="row-buttons">
          <button className="edit-row" onClick={handleEditShow}>
            <PencilSquare />
          </button>
          <button className="delete-row" >
            <XCircle />
          </button>
  
        </div>
      ),
      searchable: false,
    },
  ];


  return (
    <div className="companies">
            {isLoading ? <BaseLoader /> : ""}

      <button className="create-btn"  onClick={handleShow}><span className="create-btn-icon"><PlusCircleFill/></span>Add New Company</button>
      <AddCompany show={show} onHide={() => handleClose()} modalTitle="Add Company" getCompanies={getCompanies}/>
      <SetCompany show={editShow} onHide={() => handleEditClose()}  modalTitle="Set Company"/>


      <MainTable sizePerPage={5} data={companyList} columns={columns} />
    </div>
  );
};

export default CompanyList;