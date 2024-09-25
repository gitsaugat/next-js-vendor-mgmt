"use client";
import Dashboard from "@/components/dashboard/Dashboard";
import React, { useEffect, useState } from "react";
import { BsPeople } from "react-icons/bs";
import { BiEuro, BiSolidBank } from "react-icons/bi";
import { BiNote } from "react-icons/bi";
import CountCard from "@/components/dashboard/CountCard";
import BarChart from "@/components/dashboard/Charts/BarChart";
import SortableTable from "@/components/dashboard/Table";
import { fetchData, makeRequest } from "../../../../utils/requestMaker/req";
import PieChart from "@/components/dashboard/Charts/PieChart";
import {
  createBarChartData,
  createDonutChartData,
} from "../../../../utils/chart";
import { API_URLS } from "../../../../utils/apis";
import AreaChart from "@/components/dashboard/Charts/AreaChart";

const headers = [
  "Account Code",
  "Account Name",
  "Amount",
  "Date",
  "Entry Number",
];

const Page = () => {
  const [unbookedTransactions, setUnbookedTransactions] = useState();
  const [clientList, setClientList] = useState();
  const [paymentTracking, setPaymentTracking] = useState();
  const [generalDetails, setGeneralDetails] = useState();
  const [chartData, setChartData] = useState();
  const [paymentTrackingWeekly, setPaymentTrackingWeekly] = useState();
  const [paymentTrackingChart, setPaymentTrackingChart] = useState();
  const createOverdueBucketChart = (data) => {
    const categories = [
      "0-10 Days",
      "11-20 Days",
      "21-30 Days",
      "31-60 Days",
      "60+ Days",
    ];
    const barSeries = [
      {
        name: "Overdue Bucket Details",
        data: [
          Math.round(data.overdue_invoice_buckets_amount.overdue_0_10_amount),
          Math.round(data.overdue_invoice_buckets_amount.overdue_11_20_amount),
          Math.round(data.overdue_invoice_buckets_amount.overdue_21_30_amount),
          Math.round(data.overdue_invoice_buckets_amount.overdue_31_60_amount),
          Math.round(
            data.overdue_invoice_buckets_amount.overdue_61_plus_amount
          ),
        ],
      },
    ];

    const donutData = [
      Math.round(data.overdue_invoice_buckets_count.overdue_0_10),
      Math.round(data.overdue_invoice_buckets_count.overdue_11_20),
      Math.round(data.overdue_invoice_buckets_count.overdue_21_30),
      Math.round(data.overdue_invoice_buckets_count.overdue_31_60),
      Math.round(data.overdue_invoice_buckets_count.overdue_61_plus),
    ];

    return {
      bar: createBarChartData(barSeries, categories),
      donut: createDonutChartData(donutData, "Overdue Bucket", categories),
    };
  };
  useEffect(() => {
    if (generalDetails) {
      setChartData(createOverdueBucketChart(generalDetails));
    }
  }, [generalDetails]);

  useEffect(() => {
    if (paymentTrackingWeekly) {
      let lessPaidBucket =
        paymentTrackingWeekly.total_less_paid_buckets_counts_last_week;
      setPaymentTrackingChart(
        createBarChartData(
          [
            {
              name: "Less Paid Bucket",
              data: [
                lessPaidBucket["<10%"],
                lessPaidBucket["10-30%"],
                lessPaidBucket["30-50%"],
                lessPaidBucket["50-70%"],
                lessPaidBucket["70%+"],
              ],
            },
          ],
          ["<10%", "10-30%", "30-50%", "50-70%", "70%+"]
        )
      );
    }
  }, [paymentTrackingWeekly]);
  useEffect(() => {
    fetchData(API_URLS.finance.unbookedTransactions(), setUnbookedTransactions);
    fetchData(API_URLS.finance.clientSummary(), setClientList);
    fetchData(API_URLS.finance.paymentTracking(), setPaymentTracking);
    fetchData(API_URLS.finance.generalDetails(), setGeneralDetails);
    fetchData(
      API_URLS.finance.paymentTrackerWeekly(),
      setPaymentTrackingWeekly
    );
  }, []);

  return (
    <Dashboard>
      {generalDetails && (
        <>
          <p className="text-gray-500 text-xl font-bold m-2">Invoices</p>
          <div className="lg:grid lg:grid-cols-3 lg:gap-4 md:grid md:grid-cols-2 md:gap-4 sm:grid sm:grid-cols-1 sm:gap-4  ">
            <CountCard
              value={generalDetails.total_outstanding_invoices_count}
              title={"Out Standing Invoices "}
              onClickRedirect={"/dashboard/finance/outstandingInvoices"}
              Icon={BiEuro}
              primary={generalDetails.total_outstanding_amount}
              color="bg-blue-400"
            />
            <CountCard
              value={generalDetails.total_overdue_clients_count}
              title={"Overdue Clients"}
              onClickRedirect={"/dashboard/finance/overdueInvoices/clients"}
              Icon={BsPeople}
              color={"bg-red-400"}
            />

            <CountCard
              value={generalDetails.total_overdue_invoices_count}
              title={"Overdue Invoices"}
              onClickRedirect={"/dashboard/finance/overdueInvoices"}
              Icon={BiEuro}
              primary={generalDetails.total_overdue_amount}
              color={"bg-red-400"}
            />
          </div>
          <p className="text-gray-500 text-xl font-bold m-2">Banking</p>
          <div className="lg:grid lg:grid-cols-3 lg:gap-4 md:grid md:grid-cols-2 md:gap-4 sm:grid sm:grid-cols-1 sm:gap-4  ">
            <CountCard
              value={generalDetails.total_unique_clients_from_invoices}
              title={"Unique Clients"}
              Icon={BsPeople}
              color="bg-green-400"
            />

            <CountCard
              value={
                generalDetails.total_unique_clients_with_unbooked_transactions
              }
              title={"Unbooked Transactions Clients"}
              onClickRedirect={"/dashboard/finance/unbookedTransaction/clients"}
              Icon={BsPeople}
              color={"bg-yellow-400"}
            />
            <CountCard
              value={generalDetails.total_unbooked_transactions_count}
              title={"Unbooked Transactions"}
              onClickRedirect={"/dashboard/finance/unbookedTransaction"}
              Icon={BiSolidBank}
              primary={generalDetails.total_unbooked_transactions_amount}
              color={"bg-yellow-400"}
            />
          </div>
        </>
      )}
      {chartData && (
        <div className="lg:grid lg:grid-cols-2 lg:gap-3 sm:grid sm:grid-rows-1">
          <BarChart
            title={"Overdue Invoices Buckets"}
            chart_data={chartData?.bar}
          />
          <AreaChart
            title={"Payment Tracking Buckets"}
            chart_data={paymentTrackingChart}
          />
        </div>
      )}
      <SortableTable
        headers={[
          "Account Code",
          "Account Name",
          "Total Outstanding",
          "Payment Term",
          "Total Overdue Payment",
          "Latest Transaction Date",
          "Latest Amount",
        ]}
        detailKey={0}
        detailUrl={"/dashboard/finance/clientSummary"}
        keys={[
          "account_code",
          "account_name",
          "total_outstanding",
          "payment_term",
          "total_overdue_amount",
          "latest_transaction_date",
          "latest_amount",
        ]}
        showPagination={true}
        title={"Client Summary"}
        data={clientList}
      />
      <div className="lg:grid lg:grid-cols-2 lg:gap-3 sm:grid sm:grid-rows-1">
        <SortableTable
          headers={headers}
          keys={[
            "account_code",
            "account_name",
            "amount",
            "entry_number",
            "date",
          ]}
          detailKey={0}
          detailUrl={"/dashboard/finance/overdueInvoices"}
          title={"Overdue Invoices"}
          data={unbookedTransactions}
        />
        {unbookedTransactions && (
          <SortableTable
            headers={headers}
            keys={[
              "account_code",
              "account_name",
              "amount",
              "entry_number",
              "date",
            ]}
            detailKey={0}
            detailUrl={"/dashboard/finance/unbookedTransaction"}
            title={"Unbooked Transactions"}
            data={unbookedTransactions}
          />
        )}
      </div>
    </Dashboard>
  );
};

export default Page;
