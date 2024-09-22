"use client";
import Dashboard from "@/components/dashboard/Dashboard";
import React, { useEffect, useState } from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { AiFillBank } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { BiMoney } from "react-icons/bi";
import { BiNote } from "react-icons/bi";
import CountCard from "@/components/dashboard/CountCard";
import BarChart from "@/components/dashboard/Charts/BarChart";
import SortableTable from "@/components/dashboard/Table";
import { makeRequest } from "../../../../utils/requestMaker/req";
import PieChart from "@/components/dashboard/Charts/PieChart";

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
      data: [12000, 10000, 6000, 4000, 4500],
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
    labels: ["0-10 Days", "11-20 Days", "21-30 Days", "31-60 Days", "60+ Days"],
  },
  series: [12000, 10000, 6000, 4000, 4500],
};

const data = [
  {
    name: "Overdue Invoices",
    count: 1500,
    icon: BiNote,
    color: "red",
  },
  {
    name: "Overdue Invoices Amount",
    count: "$20",
    icon: AiFillDollarCircle,
    color: "red",
  },
  {
    name: "Clients (Overdue Invoice)",
    count: 210,
    icon: BsFillPeopleFill,
    color: "red",
  },
  {
    name: "Total Unbooked Transactions",
    count: 250,
    icon: AiFillBank,
    color: "yellow",
  },
  {
    name: "Unbooked Transactions Amount",
    count: "$1000",
    icon: AiFillDollarCircle,
    color: "yellow",
  },
  {
    name: "Clients (Unbooked Transactions)",
    count: 100,
    icon: BsFillPeopleFill,
    color: "yellow",
  },
];

const headers = [
  "Account Code",
  "Account Name",
  "Amount",
  "Date",
  "Entry Number",
];
const tableData = [];

const Page = () => {
  const [unbookedTransactions, setUnbookedTransactions] = useState();
  const [clientList, setClientList] = useState();
  const [paymentTracking, setPaymentTracking] = useState();
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
  useEffect(() => {
    fetchUnbookedTransactions();
    fetchPaymentTracking();
    fetchClientTable();
  }, []);

  return (
    <Dashboard>
      <div className="lg:grid lg:grid-cols-4 lg:gap-4 sm:grid sm:grid-rows-1 sm:gap-4 xs:gap-3 ">
        {data.map((d) => (
          <CountCard
            title={d.name}
            value={d.count}
            Icon={d.icon}
            color={d.color}
          />
        ))}
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-3 sm:grid sm:grid-rows-1">
        <BarChart chart_data={chartData} />
        <PieChart chart_data={donutChartData} />
      </div>
      <SortableTable
        headers={[
          "account_code",
          "account_name",
          "total_outstanding",
          "payment_term",
          "total_overdue_amount",
          "latest_transaction_date",
          "latest_amount",
        ]}
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
      <div className="lg:grid lg:grid-cols-2 lg:gap-1 sm:grid sm:grid-rows-1">
        <SortableTable
          headers={headers}
          keys={[
            "account_code",
            "account_name",
            "amount",
            "entry_number",
            "date",
          ]}
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
            title={"Unbooked Transactions"}
            data={unbookedTransactions}
          />
        )}
      </div>

      {paymentTracking && (
        <div className="lg:grid lg:grid-cols-2 lg:gap-1 sm:grid sm:grid-rows-1">
          <SortableTable
            headers={[
              "Account Code",
              "Account Name",
              "Bank Details Amount Dc",
              "Total Invoice Amount Dc",
            ]}
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
