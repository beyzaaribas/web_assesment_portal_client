"use client";
import React, { useEffect, useState } from "react";
import "./Categories.css";
import MainTable from "../global/table/MainTable";
import { Coin, Eye, PencilSquare, PersonFillSlash, PlusCircleFill, QuestionCircle, XCircle } from "react-bootstrap-icons";
import { getAllCompanies } from "@/services/companies";
import { formatDate } from "@/helpers/formatDate";
import BaseLoader from "../loader/baseLoader";
import AddCategory from "./AddCategory";
import SetCategory from "./SetCategory";
import { deleteCategory, getAllCategories } from "@/services/categories";
import { toast } from "react-toastify";
import Swal from "sweetalert2";




const CategoryList = () => {

  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryId, setCategoryId] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editShow, setEditShow] = useState(false);
  const handleEditClose = () => setEditShow(false);
  const handleEditShow = () => setEditShow(true);
 
  //getCategories
  const getCategories = async () => {
    setIsLoading(true);
    const data = await getAllCategories();
    if (data.isSuccess == true) {
      setCategoryList(data.categories);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  

  const handleDeleteCategory = async (id) => {
    try {
      const result = await deleteCategory(id);
      setIsLoading(true);
      if (result.isSuccess) {
        toast.success(result.message);
        getCategories();
        setIsLoading(false);
        Swal.close();
      } else {
        toast.error(result.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the team.");
      setIsLoading(false);
    }
  };

  const deleteCategorySwal = (id) => {
    Swal.fire({
      title: "Are You Sure?",
      text: "You are deleting the category",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await handleDeleteCategory(id);
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while deactivating the user.");
        }
      }
    });
  };


  const columns = [
    {
      dataField: "categoryName",
      text: "Category",
      searchable: true,
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cellContent, row) => (
        <div className="row-buttons">
          <button className="edit-row" onClick={() => {
            handleEditShow()
            setCategoryId(row._id)
          }}>
            <PencilSquare />
          </button>
          <button className="delete-row" onClick={() => {
            deleteCategorySwal(row._id)
          }} >
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

      <button className="create-btn"  onClick={handleShow}><span className="create-btn-icon"><PlusCircleFill/></span>Add New Category</button>
      <AddCategory show={show} onHide={() => handleClose()} modalTitle="Add Category" getCategories={getCategories}/>
      <SetCategory show={editShow} onHide={() => handleEditClose()} categoryId={categoryId} getCategories={getCategories}  modalTitle="Set Category"/>


      <MainTable sizePerPage={5} data={categoryList} columns={columns} />
    </div>
  );
};

export default CategoryList;