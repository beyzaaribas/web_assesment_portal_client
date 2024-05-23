"use client";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import 'react-loading-skeleton/dist/skeleton.css'

import { ToastContainer } from "react-toastify";
import MainLayout from "@/components/layouts/MainLayout";
import { usePathname } from "next/navigation";
import { MetaData } from "@/components/global/meta/MetaData";
import LoginWrapper from "@/components/login/LoginWrapper";
import { UserProvider } from "@/contexts/UserContext";

import { SkeletonTheme } from "react-loading-skeleton";
import Skeleton from 'react-loading-skeleton'

export default function RootLayout({ children, isLoginPage }) {
  const path = usePathname();

  return (
    <html lang="en">
      <head>
        <MetaData></MetaData>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body>
      <SkeletonTheme>
        <UserProvider>

          {path == "/login" ? (
            <LoginWrapper> {children} </LoginWrapper>
          ) : (
            <MainLayout>{children}</MainLayout>
          )}

    
          <ToastContainer />
        </UserProvider>
        </SkeletonTheme>

      </body>
    </html>
  );
}
