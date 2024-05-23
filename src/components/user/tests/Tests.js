"use client";
import { getAllTests, getUserFinishedTests } from "@/services/tests";
import React, { useEffect, useState } from "react";
import "./Tests.css";
import Link from "next/link";

const Tests = () => {
  const [tests, setTests] = useState([]);
  const [finishedTests, setFinishedTests] = useState([]);

  //getTests
  const getTests = async () => {
    const data = await getAllTests();
    if (data.isSuccess == true) {
      setTests(data.tests);
    }
  };

  const getFinishedTests = async () => {
    const data = await getUserFinishedTests();
    if (data.isSuccess == true) {
      setFinishedTests(data.tests);
    }
  };

  useEffect(() => {
    getTests();
    getFinishedTests();
  }, []);

  return (
    <div className="tests">
      {tests.map((test) => {
        const isFinished = finishedTests.some(
          (finishedTest) => finishedTest.testId === test._id
        );
        return (
          <div className="test-box" key={test._id}>
            <span className="category">{test.categoryName || "General"}</span>

            <h2>{test.title}</h2>
            <p>{test.description}</p>
            <div className="test-button">
              {isFinished ? (
                <span className="finished-btn">COMPLETED</span>
              ) : (
                <button className="test-btn">
                  <Link href={"/userTests/" + test._id}>JOIN</Link>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Tests;
