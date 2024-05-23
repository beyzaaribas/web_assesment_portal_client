"use client";
import Header from "@/components/user/global/header/Header";
import React from "react";


const UserLayout = ({ children }) => {
  return (
    <div className="user-layout">
    <Header/>
     { children }
    </div>
  );
};

export default UserLayout;
