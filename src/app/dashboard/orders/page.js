"use client";
import CardContainer from "@/components/dashboard/CardContainer";
import LineChart from "@/components/dashboard/Charts/LineChart";
import Dashboard from "@/components/dashboard/Dashboard";
import Grid from "@/components/dashboard/Grid";
import React, { useEffect, useState } from "react";
import { handleRequest } from "../../../../utils/requestMaker/req";
import { API_URLS } from "../../../../utils/apis";
import NavTabs from "@/components/Tab";
import { current } from "@reduxjs/toolkit";
import { createBarChartData } from "../../../../utils/chart";

const Page = () => {
  const [orderCounts, setOrderCounts] = useState();
  const [reTourOrderCounts, setReTourOrderCounts] = useState();
  const [orderCountChartData, setOrderCountChartData] = useState();
  const [reTourOrderSalesCountChartData, setReTourOrderSalesCountChartData] =
    useState();

  function createOrderCountChartData(value) {
    if (value == "Yearly") {
      setOrderCountChartData(createBarChartData([], []));
    }
    if (value == "Monthly") {
      setOrderCountChartData(createBarChartData([], []));
    }
    if (value == "Daily") {
      setOrderCountChartData(createBarChartData([], []));
    }
  }
  function createReTourOrderSalesCountChartData(value) {
    if (value == "Yearly") {
      setReTourOrderSalesCountChartData(createBarChartData([], []));
    }
    if (value == "Monthly") {
      setReTourOrderSalesCountChartData(createBarChartData([], []));
    }
    if (value == "Daily") {
      setReTourOrderSalesCountChartData(createBarChartData([], []));
    }
  }

  const orderCountTabs = [
    {
      name: "Yearly",
      value: "Yearly",
      func: createOrderCountChartData,
      current: false,
    },
    {
      name: "Monthly",
      value: "Monthly",
      func: createOrderCountChartData,
      current: false,
    },
    {
      name: "Daily",
      value: "Daily",
      func: createOrderCountChartData,
      current: false,
    },
  ];

  const reTourOrderCountTabs = [
    {
      name: "Yearly",
      value: "Yearly",
      func: createReTourOrderSalesCountChartData,
      current: false,
    },
    {
      name: "Monthly",
      value: "Monthly",
      func: createReTourOrderSalesCountChartData,
      current: false,
    },
    {
      name: "Daily",
      value: "Daily",
      func: createReTourOrderSalesCountChartData,
      current: false,
    },
  ];

  async function fetchOrderCounts() {
    let response = await handleRequest(
      "GET",
      API_URLS.orderGeneral.orderCount(),
      null
    );
    setOrderCounts(response);
  }
  async function fetchReTourOrderCounts() {
    let response = await handleRequest(
      "GET",
      API_URLS.orderGeneral.reTourOrderSalesCount(),
      null
    );
    setReTourOrderCounts(response);
  }

  useEffect(() => {
    if (!orderCounts) {
      fetchOrderCounts();
    }
    if (!reTourOrderCounts) {
      fetchReTourOrderCounts();
    }
  }, []);
  return (
    <Dashboard>
      <Grid
        className={
          "grid grid-cols-1 gap-3 sm:grid sm:grid-cols-1 sm:gap-3 lg:grid lg:grid-cols-2 lg:gap-3"
        }
      >
        {orderCounts && (
          <CardContainer header="Order Count List">
            <NavTabs tabs={orderCountTabs}></NavTabs>
          </CardContainer>
        )}

        {reTourOrderCounts && (
          <CardContainer header="Re-tour Sales Order Counts list">
            <NavTabs tabs={reTourOrderCountTabs}></NavTabs>
          </CardContainer>
        )}
      </Grid>
    </Dashboard>
  );
};

export default Page;
