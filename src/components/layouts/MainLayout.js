"use client";
import React, { useEffect } from "react";
import Sidebar from "../global/sidebar/Sidebar";
import MainContent from "../global/mainContent/MainContent";
import { useUserContext } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { getTokenFromCookie } from "@/helpers/getCookie";

const MainLayout = ({ children }) => {
  const { user, setUser } = useUserContext();
  const router = useRouter();

  const token = getTokenFromCookie();

  return (
    <div className="main-layout">
      {token != undefined || token != null ? (
        <>
          {" "}
          <Sidebar></Sidebar>
          <MainContent>{children}</MainContent>
        </>
      ) : (
        router.push("/login")
      )}
    </div>
  );
};

export default MainLayout;
