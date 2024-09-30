"use client";
import Dashboard from "@/components/dashboard/Dashboard";
import React, { useEffect, useState } from "react";
import { handleRequest } from "../../../../../../utils/requestMaker/req";
import { API_URLS } from "../../../../../../utils/apis";
import { useParams } from "next/navigation";
import Grid from "@/components/dashboard/Grid";
import CountCard from "@/components/dashboard/CountCard";
import { BiCalendarWeek } from "react-icons/bi";
import Header from "@/components/dashboard/Header";
import CardContainer from "@/components/dashboard/CardContainer";
import LineChart from "@/components/dashboard/Charts/LineChart";
import {
  createBarChartData,
  createDonutChartData,
} from "../../../../../../utils/chart";
import PieChart from "@/components/dashboard/Charts/PieChart";
import AreaChart from "@/components/dashboard/Charts/AreaChart";
import BarChart from "@/components/dashboard/Charts/BarChart";

const page = () => {
  const [salesDetail, setSalesDetail] = useState();
  const { code } = useParams();
  const [yearlyChartData, setYearlyChartData] = useState();
  const [commonOrderDaysChartData, setCommonOrderDaysChartData] = useState();
  async function fetchSalesDetails(code) {
    let response = await handleRequest(
      "GET",
      API_URLS.orderGeneral.clientSalesAnalysis(code),
      null
    );
    setSalesDetail(response);
  }

  useEffect(() => {
    if (!salesDetail) {
      fetchSalesDetails(code);
    }
  }, []);

  useEffect(() => {
    if (
      salesDetail &&
      salesDetail.orders_per_year &&
      salesDetail.common_order_days
    ) {
      if (!yearlyChartData) {
        setYearlyChartData({
          series: [
            {
              name: "Yearly Order History",
              data: salesDetail.orders_per_year.map((o) => o.total_orders),
            },
          ],
          categories: salesDetail.orders_per_year.map((o) => o.year),
        });
      }
      if (!commonOrderDaysChartData) {
        setCommonOrderDaysChartData({
          series: salesDetail.common_order_days.map((o) => o.day_count),
          labels: salesDetail.common_order_days.map((o) => o.day_name),
        });
      }
    }
  }, [salesDetail]);
  return (
    <Dashboard>
      {salesDetail && (
        <>
          <Header title={"Client Info"} />
          <br />
          <Grid className={"grid grid-cols-1"}>
            <div className="rounded-xl bg-white p-4 shadow-lg w-fit">
              <div>
                <label className="text-gray-500 font-bold">
                  Client Code : {salesDetail.client_code}
                </label>
              </div>
              <div>
                <label className="text-gray-500 font-bold">
                  Client Name : {salesDetail.client_name}
                </label>
              </div>
              <div>
                <label className="text-gray-500 font-bold">
                  Latest Order Date : {salesDetail.latest_order_date}
                </label>
              </div>
            </div>
          </Grid>
          <br />
          <Header title={"Order Metrics"} />
          <br />
          <Grid
            className={
              "grid grid-cols-1 gap-3 sm:grid sm:grid-cols-1 sm:gap-3 lg:grid lg:grid-cols-4 lg:gap-3 md:grid md:grid-cols-2 md:gap-3"
            }
          >
            <CountCard
              title="Total Orders"
              value={salesDetail.total_orders}
              Icon={BiCalendarWeek}
              color="bg-green-200"
            />

            <CountCard
              title="Open Orders"
              value={salesDetail.open_orders}
              Icon={BiCalendarWeek}
              color="bg-yellow-500"
            />

            <CountCard
              title="Closed Orders"
              value={salesDetail.closed_orders}
              Icon={BiCalendarWeek}
              color="bg-green-500"
            />

            <CountCard
              title="Average Order Per Week"
              value={salesDetail.average_orders_per_week}
              Icon={BiCalendarWeek}
              color="bg-orange-500"
            />
          </Grid>
          <br />
          <Grid className="grid grid-cols-1 gap-3 sm:grid sm:grid-cols-1 sm:gap-3 lg:grid lg:grid-cols-2 lg:gap-3 md:grid md:grid-cols-2 md:gap-3">
            {yearlyChartData && (
              <CardContainer header="Yearly Order History">
                <PieChart
                  chart_data={createDonutChartData(
                    yearlyChartData.series[0].data,
                    yearlyChartData.categories
                  )}
                />
              </CardContainer>
            )}
            {commonOrderDaysChartData && (
              <CardContainer header="Common Order Days">
                <PieChart
                  chart_data={createDonutChartData(
                    commonOrderDaysChartData.series,
                    commonOrderDaysChartData.labels
                  )}
                />
              </CardContainer>
            )}
          </Grid>
        </>
      )}
    </Dashboard>
  );
};

export default page;
