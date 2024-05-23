"use client";
import { getUserStatistics } from "@/services/statistics";
import React, { useEffect, useState } from "react";
import { Check2All, Check2Square, Clock } from "react-bootstrap-icons";
import Skeleton from "react-loading-skeleton";
import "./Statistics.css"

const Statistics = () => {
  const [userStatistics, setUserStatistics] = useState([]);

  const [completedList, setCompletedList] = useState();
  const [pendingList, setPendingList] = useState();
  const [completedTests, setCompletedTests] = useState();

  const getStatistics = async () => {
    const data = await getUserStatistics();
    if (data.isSuccess) {
      setUserStatistics(data);
      setCompletedList(data.statisticsData.completedList.length);
      setPendingList(data.statisticsData.pendingList.length);
      setCompletedTests(data.statisticsData.finishedTestList.length);
    }
  };

  useEffect(() => {
    getStatistics();
  }, []);

  return (
    <div className="statistics">
      <div className="statistic-box pending">
        <div className="statistic-box-text">
          <h2>Pending Results</h2>
          {pendingList !== undefined ? (
            <span>{pendingList}</span>
          ) : (
            <Skeleton width={30} height={20} />
          )}
        </div>
        <div className="statistic-icon"><Clock/> </div>
      </div>

      <div className="statistic-box completed">
      <div className="statistic-box-text">
          <h2>Completed Results</h2>
          {completedList !== undefined ? (
            <span>{completedList}</span>
          ) : (
            <Skeleton width={30} height={20} />
          )}
        </div>
        <div className="statistic-icon"><Check2Square/></div>
      </div>

      <div className="statistic-box completed-tests">
      <div className="statistic-box-text">
          <h2>Completed Tests</h2>
          {completedTests !== undefined ? (
            <span>{completedTests}</span>
          ) : (
            <Skeleton width={30} height={20} />
          )}
        </div>
        <div className="statistic-icon"><Check2All/></div>
      </div>

    </div>
  );
};

export default Statistics;
