"use client";
import { getAdminStatistics, getUserStatistics } from "@/services/statistics";
import React, { useEffect, useState } from "react";
import { CardList, Check2All, Check2Square, Clock } from "react-bootstrap-icons";
import Skeleton from "react-loading-skeleton";
import "./Statistics.css"

const StatisticsAdmin = () => {
  const [userStatistics, setUserStatistics] = useState([]);

  const [completedList, setCompletedList] = useState();
  const [pendingList, setPendingList] = useState();
  const [completedTests, setCompletedTests] = useState();
  const [totalTest, setTotalTest] = useState()

  const getStatistics = async () => {
    const data = await getAdminStatistics();
    if (data.isSuccess) {
    console.log(data)
    setCompletedList(data.statisticsData.completedList.length);
    setPendingList(data.statisticsData.pendingList.length);
    setCompletedTests(data.statisticsData.finishedTestList.length);
    setTotalTest(data.statisticsData.totalTests.length);

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

      <div className="statistic-box total">
      <div className="statistic-box-text">
          <h2>Total Tests</h2>
          {totalTest !== undefined ? (
            <span>{totalTest}</span>
          ) : (
            <Skeleton width={30} height={20} />
          )}
        </div>
        <div className="statistic-icon"><CardList/></div>
      </div>

    </div>
  );
};

export default StatisticsAdmin;
