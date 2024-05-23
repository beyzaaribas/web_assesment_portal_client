"use client";
import TestDetail from "@/components/user/testDetail/TestDetail";
import React, { useEffect, useState } from "react";
import MainContentTitle from "@/components/global/mainContent/MainContentTitle";

const page = () => {
  return (
    <>
      <MainContentTitle title="Tests"></MainContentTitle>

      <TestDetail />
    </>
  );
};

export default page;
