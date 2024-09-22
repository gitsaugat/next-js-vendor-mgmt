"use client";
import Dashboard from "@/components/dashboard/Dashboard";
import React, { useEffect, useState } from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { AiFillBank } from "react-icons/ai";
import { BsFillPeopleFill, BsPeople } from "react-icons/bs";
import { BiDollar, BiMoney, BiEuro } from "react-icons/bi";
import { BiNote } from "react-icons/bi";
import CountCard from "@/components/dashboard/CountCard";
import BarChart from "@/components/dashboard/Charts/BarChart";
import SortableTable from "@/components/dashboard/Table";
import { makeRequest } from "../../../../utils/requestMaker/req";
import PieChart from "@/components/dashboard/Charts/PieChart";

const createChart = (data) => {
  const chartData = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "0-10 Days",
          "11-20 Days",
          "21-30 Days",
          "31-60 Days",
          "60+ Days",
        ],
      },
    },
    series: [
      {
        name: "series-1",
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
    ],
  };

  const donutChartData = {
    options: {
      chart: {
        type: "donut",
      },
    },
    chartOptions: {
      labels: [
        "0-10 Days",
        "11-20 Days",
        "21-30 Days",
        "31-60 Days",
        "60+ Days",
      ],
    },
    series: [
      Math.round(data.overdue_invoice_buckets_count.overdue_0_10),
      Math.round(data.overdue_invoice_buckets_count.overdue_11_20),
      Math.round(data.overdue_invoice_buckets_count.overdue_21_30),
      Math.round(data.overdue_invoice_buckets_count.overdue_31_60),
      Math.round(data.overdue_invoice_buckets_count.overdue_61_plus),
    ],
  };
  return {
    bar: chartData,
    donut: donutChartData,
  };
};
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

  const fetchUnbookedTransactions = async () => {
    try {
      const res = await makeRequest(
        "http://127.0.0.1:5000/api/unbooked-transactions",
        "GET",
        {}
      );
      setUnbookedTransactions(res); // Assuming res.data contains the array of transactions
    } catch (error) {
      console.error("Error fetching unbooked transactions:", error);
    }
  };

  const fetchClientTable = async () => {
    try {
      const res = await makeRequest(
        "http://127.0.0.1:5000/api/client-table",
        "GET",
        {}
      );
      setClientList(res); // Assuming res.data contains the array of transactions
    } catch (error) {
      console.error("Error fetching client table:", error);
    }
  };
  const fetchPaymentTracking = async () => {
    try {
      const res = await makeRequest(
        "http://127.0.0.1:5000/api/payment-tracking",
        "GET",
        {}
      );
      setPaymentTracking(res); // Assuming res.data contains the array of transactions
    } catch (error) {
      console.error("Error fetching payment tracking:", error);
    }
  };

  const fetchGeneralDetails = async () => {
    try {
      const res = await makeRequest(
        "http://127.0.0.1:5000/api/general-details",
        "GET",
        {}
      );
      setGeneralDetails(res); // Assuming res.data contains the array of transactions
      setChartData(createChart(res));
    } catch (error) {
      console.error("Error fetching payment tracking:", error);
    }
  };
  useEffect(() => {
    fetchUnbookedTransactions();
    fetchPaymentTracking();
    fetchClientTable();
    fetchGeneralDetails();
  }, []);

  return (
    <Dashboard>
      {generalDetails && (
        <div className="lg:grid lg:grid-cols-3 lg:gap-4 sm:grid sm:grid-rows-1 sm:gap-4 xs:gap-3 ">
          <CountCard
            value={generalDetails.total_unique_clients_from_invoices}
            title={"Unique Clients"}
            Icon={BsPeople}
            color="bg-blue-400"
          />
          <CountCard
            value={generalDetails.total_outstanding_invoices_count}
            title={"Out Standing Invoices "}
            Icon={BiNote}
            color="bg-blue-400"
          />
          <CountCard
            value={generalDetails.total_outstanding_amount}
            title={"Outstanding Amount"}
            Icon={BiEuro}
            color="bg-blue-400"
          />
          <CountCard
            value={generalDetails.total_overdue_clients_count}
            title={"Overdue Clients"}
            Icon={BsPeople}
            color={"bg-red-400"}
          />

          <CountCard
            value={generalDetails.total_overdue_invoices_count}
            title={"Overdue Invoices"}
            Icon={BiNote}
            color={"bg-red-400"}
          />
          <CountCard
            value={generalDetails.total_overdue_amount}
            title={"Overdue Invoices Value "}
            Icon={BiEuro}
            color={"bg-red-400"}
          />
          <CountCard
            value={
              generalDetails.total_unique_clients_with_unbooked_transactions
            }
            title={"Unbooked Transactions Clients"}
            Icon={BsPeople}
            color={"bg-yellow-400"}
          />
          <CountCard
            value={generalDetails.total_unbooked_transactions_count}
            title={"Unbooked Transactions"}
            Icon={BiNote}
            color={"bg-yellow-400"}
          />
          <CountCard
            value={generalDetails.total_unbooked_transactions_amount}
            title={"Unbooked Amount"}
            Icon={BiEuro}
            color={"bg-yellow-400"}
          />
        </div>
      )}
      {chartData && (
        <div className="lg:grid lg:grid-cols-2 lg:gap-3 sm:grid sm:grid-rows-1">
          <BarChart chart_data={chartData?.bar} />
          <PieChart chart_data={chartData?.donut} />
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
          detailUrl={"/dashboard/finance/clientSummary"}
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
            detailUrl={"/dashboard/finance/clientSummary"}
            title={"Unbooked Transactions"}
            data={unbookedTransactions}
          />
        )}
      </div>

      {paymentTracking && (
        <div className="lg:grid lg:grid-cols-2 lg:gap-3 sm:grid sm:grid-rows-1">
          <SortableTable
            headers={[
              "Account Code",
              "Account Name",
              "Bank Details Amount Dc",
              "Total Invoice Amount Dc",
            ]}
            detailKey={0}
            detailUrl={"/dashboard/finance/clientSummary"}
            keys={[
              "account_code",
              "account_name",
              "bank_details_amount_dc",
              "total_invoice_amount_dc",
            ]}
            title={"Payment Tracking (Matched)"}
            data={paymentTracking?.matched_invoices}
          />

          <SortableTable
            headers={[
              "Account Code",
              "Account Name",
              "Bank Details Amount Dc",
              "Paid Status",
              "Total Invoice Amount Dc",
            ]}
            detailKey={0}
            detailUrl={"/dashboard/finance/clientSummary"}
            keys={[
              "account_code",
              "account_name",
              "bank_details_amount_dc",
              "paid_status",
              "total_invoice_amount_dc",
            ]}
            title={"Payment Tracking (Unmatched)"}
            data={paymentTracking?.matched_invoices}
          />
        </div>
      )}
    </Dashboard>
  );
};

export default Page;
