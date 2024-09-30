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
import Header from "@/components/dashboard/Header";
import CountCard from "@/components/dashboard/CountCard";
import { BiCalendarWeek } from "react-icons/bi";
import SortedTable from "@/components/dashboard/Table";
import Drawyer from "@/components/dashboard/Drawyer";
import StackedList from "@/components/dashboard/StackedLists";

const Page = () => {
  const [orderCounts, setOrderCounts] = useState();
  const [reTourOrderCounts, setReTourOrderCounts] = useState();
  const [orderCountChartData, setOrderCountChartData] = useState();
  const [salesOrderDetailTableData, setSalesOrderDetailTableData] = useState();
  const [reTourOrderSalesCountChartData, setReTourOrderSalesCountChartData] =
    useState();

  const [salesDrawyerOpen, setSalesDrawyerOpen] = useState(false);
  const [salesOrderDetail, setSalesOrderDetail] = useState();

  async function fetchOrderDetail(code) {
    let response = await handleRequest(
      "GET",
      API_URLS.orderGeneral.salesOrderDetail(code),
      null
    );
    setSalesOrderDetail(response);
  }

  function toggleSalesDetailDrawyer(detailKey) {
    fetchOrderDetail(detailKey);
    setSalesDrawyerOpen(!salesDrawyerOpen);
  }

  function createOrderCountChartData(value = "Yearly") {
    if (value == "Yearly") {
      setOrderCountChartData(
        createBarChartData(
          [
            {
              name: "Yearly Order Count",
              data: orderCounts.yearly_orders.map((o) => o.total_orders),
            },
          ],
          orderCounts.yearly_orders.map((o) => o.year)
        )
      );
    }
    if (value == "Monthly") {
      setOrderCountChartData(
        createBarChartData(
          [
            {
              name: "Monthly Order Count",
              data: orderCounts.monthly_orders.map((o) => o.total_orders),
            },
          ],
          orderCounts.monthly_orders.map((o) => o.month)
        )
      );
    }
    if (value == "Weekly") {
      setOrderCountChartData(
        createBarChartData(
          [
            {
              name: "Weekly Order Count",
              data: orderCounts.weekly_orders.map((o) => o.total_orders),
            },
          ],
          orderCounts.weekly_orders.map((o) => o.week)
        )
      );
    }
    if (value == "Daily") {
      setOrderCountChartData(
        createBarChartData(
          [
            {
              name: "Daily Order Count",
              data: orderCounts.daily_orders.map((o) => o.total_orders),
            },
          ],
          orderCounts.daily_orders.map((o) => o.day)
        )
      );
    }
  }
  function createReTourOrderSalesCountChartData(value = "Yearly") {
    if (value == "Yearly") {
      setReTourOrderSalesCountChartData(
        createBarChartData(
          [
            {
              name: "Yearly Order Count",
              data: reTourOrderCounts.yearly_orders.map((o) => o.total_orders),
            },
          ],
          reTourOrderCounts.yearly_orders.map((o) => o.year)
        )
      );
    }
    if (value == "Monthly") {
      setReTourOrderSalesCountChartData(
        createBarChartData(
          [
            {
              name: "Monthly Order Count",
              data: reTourOrderCounts.monthly_orders.map((o) => o.total_orders),
            },
          ],
          reTourOrderCounts.monthly_orders.map((o) => o.month)
        )
      );
    }
    if (value == "Weekly") {
      setReTourOrderSalesCountChartData(
        createBarChartData(
          [
            {
              name: "Weekly Order Count",
              data: reTourOrderCounts.weekly_orders.map((o) => o.total_orders),
            },
          ],
          reTourOrderCounts.weekly_orders.map((o) => o.week)
        )
      );
    }
    if (value == "Daily") {
      setReTourOrderSalesCountChartData(
        createBarChartData(
          [
            {
              name: "Daily Order Count",
              data: reTourOrderCounts.daily_orders.map((o) => o.total_orders),
            },
          ],
          reTourOrderCounts.daily_orders.map((o) => o.day)
        )
      );
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
      name: "Weekly",
      value: "Weekly",
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
      name: "Weekly",
      value: "Weekly",
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

  async function fetchSalesOrderDetailTable() {
    let response = await handleRequest(
      "GET",
      API_URLS.orderGeneral.salesOrderDetailTable(),
      null
    );
    setSalesOrderDetailTableData(response);
  }
  useEffect(() => {
    if (!orderCounts) {
      fetchOrderCounts();
    }
    if (!reTourOrderCounts) {
      fetchReTourOrderCounts();
    }

    if (!salesOrderDetailTableData) {
      fetchSalesOrderDetailTable();
    }
  }, []);

  useEffect(() => {
    console.log(
      orderCountChartData,
      reTourOrderSalesCountChartData,
      orderCounts,
      reTourOrderCounts
    );
  }, [orderCountChartData, reTourOrderCountTabs]);

  return (
    <Dashboard>
      <Header title={"Order Metrics"} />
      {reTourOrderCounts && orderCounts && (
        <Grid
          className={
            "grid grid-cols-1 gap-3 sm:grid sm:grid-cols-1 sm:gap-3 lg:grid lg:grid-cols-4 lg:gap-3"
          }
        >
          <CountCard
            title="Order Counts"
            value={orderCounts.total_orders}
            Icon={BiCalendarWeek}
            color="bg-green-500"
          />
          <CountCard
            title="Re-Tour Sales Order Counts"
            value={reTourOrderCounts.total_orders}
            Icon={BiCalendarWeek}
            color="bg-yellow-500"
          />
        </Grid>
      )}
      <br />

      <Grid
        className={
          "grid grid-cols-1 gap-3 sm:grid sm:grid-cols-1 sm:gap-3 lg:grid lg:grid-cols-2 lg:gap-3"
        }
      >
        {orderCounts && (
          <CardContainer header="Order Count List">
            <NavTabs tabs={orderCountTabs}>
              {orderCountChartData && (
                <LineChart chart_data={orderCountChartData} />
              )}
            </NavTabs>
          </CardContainer>
        )}

        {reTourOrderCounts && (
          <CardContainer header="Re-tour Sales Order Counts list">
            <NavTabs tabs={reTourOrderCountTabs}>
              {reTourOrderSalesCountChartData && (
                <LineChart chart_data={reTourOrderSalesCountChartData} />
              )}
            </NavTabs>
          </CardContainer>
        )}
      </Grid>
      <br />
      {salesOrderDetailTableData && (
        <SortedTable
          detailKey={"code"}
          detailUrl={undefined}
          data={salesOrderDetailTableData}
          keys={[
            "code",
            "external_code",
            "relation_code",
            "delivery_date",
            "order_total_amount_exl_vat",
          ]}
          title={"Order Detail List"}
          showPagination={false}
          onClickFunc={toggleSalesDetailDrawyer}
        />
      )}

      <Drawyer setOpen={setSalesDrawyerOpen} open={salesDrawyerOpen}>
        <Header title={"Sales Order Detail"} />

        <CardContainer>
          {salesOrderDetail && (
            <StackedList
              data={[
                "code",
                "external_code",
                "relation_code",
                "payment_term_code",
                "delivery_date",
                "status",
                "type",
                "sub_type",
                "is_concept_order",
                "reference",
                "source_identifier",
                "is_deleted",
                "delivery_address__addressLine1",
                "delivery_address__postalCode",
                "delivery_address__city",
                "delivery_address__country__isoCode2",
                "delivery_address__name",
                "currency_code",
                "order_total_amount_exl_vat",
              ].map((detail) => ({
                title: detail,
                value: salesOrderDetail[detail],
              }))}
            />
          )}
        </CardContainer>
      </Drawyer>
    </Dashboard>
  );
};

export default Page;
