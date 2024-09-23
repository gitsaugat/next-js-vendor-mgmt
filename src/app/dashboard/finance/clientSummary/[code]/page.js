"use client";
import Dashboard from "@/components/dashboard/Dashboard";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../../../utils/requestMaker/req";
import { API_URLS } from "../../../../../../utils/apis";
import CountCard from "@/components/dashboard/CountCard";
import { BiEuro, BiMoney, BiNote } from "react-icons/bi";
import { FaCcMastercard } from "react-icons/fa";
import { RiBankFill } from "react-icons/ri";
import { TbCashRegister } from "react-icons/tb";
import BarChart from "@/components/dashboard/Charts/BarChart";
import SortedTable from "@/components/dashboard/Table";
import {
  createBarChartData,
  createDonutChartData,
} from "../../../../../../utils/chart";
import LineChart from "@/components/dashboard/Charts/LineChart";

const Page = () => {
  const [financialTransaction, setFinancialTransaction] = useState();
  const [bankAndInvoiceDetail, setBankAndInvoiceDetail] = useState();
  const [invoiceDetails, setInvoiceDetails] = useState();
  const [bankTransaction, setBankTransaction] = useState();
  const [barChartData, setBarChartData] = useState();
  const [growthData, setGrowthData] = useState();

  useEffect(() => {
    if (financialTransaction && bankAndInvoiceDetail) {
      const overdueBuckets =
        financialTransaction.outstanding_and_due.overdue_buckets;
      const bucketDetails = [
        Math.round(overdueBuckets["0_10_days"]["amount"]),
        Math.round(overdueBuckets["11_20_days"]["amount"]),
        Math.round(overdueBuckets["21_30_days"]["amount"]),
        Math.round(overdueBuckets["31_60_days"]["amount"]),
        Math.round(overdueBuckets["61_plus_days"]["amount"]),
      ];
      const bucketCategories = [
        "0-10 Days",
        "11-20 Days",
        "21-30 Days",
        "31-60 Days",
        "60+ Days",
      ];

      const yearlyData = {
        categories: bankAndInvoiceDetail.yearly_data.map((d) => d.year),

        invoiceCount: bankAndInvoiceDetail.yearly_data.map(
          (d) => d.invoice_count
        ),
        bankTransactionCount: bankAndInvoiceDetail.yearly_data.map(
          (d) => d.bank_transaction_count
        ),
      };
      const monthlyData = {
        categories: bankAndInvoiceDetail.monthly_data.map((d) => d.month),
        invoiceCount: bankAndInvoiceDetail.monthly_data.map(
          (d) => d.invoice_count
        ),
        bankTransactionCount: bankAndInvoiceDetail.monthly_data.map(
          (d) => d.bank_transaction_count
        ),
      };
      const weeklyData = {
        categories: bankAndInvoiceDetail.weekly_data.map((d) => d.week),
        invoiceCount: bankAndInvoiceDetail.weekly_data.map(
          (d) => d.invoice_count
        ),

        bankTransactionCount: bankAndInvoiceDetail.weekly_data.map(
          (d) => d.bank_transaction_count
        ),
      };

      setBarChartData({
        bar: createBarChartData(
          [{ data: bucketDetails, name: "Bucket Data" }],
          bucketCategories
        ),
        donut: createDonutChartData(bucketDetails, "", bucketCategories),
        growth: {
          yearly: createBarChartData(
            [
              {
                name: "Invoices",
                data: yearlyData.invoiceCount,
              },
              {
                name: "Bank Transactions",
                data: yearlyData.bankTransactionCount,
              },
            ],
            yearlyData.categories
          ),
          monthly: createBarChartData(
            [
              {
                name: "Invoices",
                data: monthlyData.invoiceCount,
              },
              {
                name: "Bank Transactions",
                data: monthlyData.bankTransactionCount,
              },
            ],
            monthlyData.categories
          ),
          weekly: createBarChartData(
            [
              {
                name: "Invoices",
                data: weeklyData.invoiceCount,
              },
              {
                name: "Bank Transactions",
                data: weeklyData.bankTransactionCount,
              },
            ],
            weeklyData.categories
          ),
        },
      });
    }
  }, [financialTransaction, bankAndInvoiceDetail]);
  useEffect(() => {
    if (!financialTransaction) {
      fetchData(
        API_URLS.financialTransactionPerClient(1234),
        setFinancialTransaction
      );
    }
    if (!bankAndInvoiceDetail) {
      fetchData(
        API_URLS.bankAndInvoiceDetailsPerClient(1234),
        setBankAndInvoiceDetail
      );
    }
    if (!invoiceDetails) {
      fetchData(API_URLS.invoiceDetailPerClient(1234), setInvoiceDetails);
    }
    if (!bankTransaction) {
      fetchData(
        API_URLS.bankTransactionDetailPerClient(1234),
        setBankTransaction
      );
    }
  }, []);

  return (
    <>
      {financialTransaction && (
        <Dashboard>
          <div className="grid grid-cols-4">
            <CountCard
              title={"Unique Invoice Count"}
              value={
                financialTransaction.financial_transactions
                  .unique_invoices_count
              }
              Icon={BiNote}
              color={"bg-green-400"}
            />
            <CountCard
              title={"Latest Amount"}
              value={financialTransaction.financial_transactions.latest_amount}
              Icon={BiEuro}
              color={"bg-green-400"}
            />
            <CountCard
              title={"Total Bank Transactions Value"}
              value={
                financialTransaction.financial_transactions
                  .total_bank_transactions_value
              }
              Icon={RiBankFill}
              color={"bg-green-400"}
            />
            <CountCard
              title={"Total Invoice Value"}
              value={
                financialTransaction.financial_transactions.total_invoice_value
              }
              Icon={BiMoney}
              color={"bg-green-400"}
            />
            <CountCard
              title={"Outstanding Invoice Count"}
              value={
                financialTransaction.outstanding_and_due
                  .outstanding_invoice_count
              }
              Icon={BiNote}
              color={"bg-red-400"}
            />
            <CountCard
              title={"Total Outstanding Value"}
              value={financialTransaction.outstanding_and_due.total_outstanding}
              Icon={BiEuro}
              color={"bg-red-400"}
            />

            <CountCard
              title={"Overdue Count"}
              value={financialTransaction.outstanding_and_due.overdue_count}
              Icon={FaCcMastercard}
              color={"bg-red-400"}
            />
            <CountCard
              title={"Overdue Amount"}
              value={financialTransaction.outstanding_and_due.overdue_amount}
              Icon={BiMoney}
              color={"bg-red-400"}
            />
            <CountCard
              title={"Unbooked Count"}
              value={
                financialTransaction.outstanding_and_due.total_unbooked_count
              }
              Icon={TbCashRegister}
              color={"bg-yellow-400"}
            />
            <CountCard
              title={"Unbooked Amount"}
              value={
                financialTransaction.outstanding_and_due.total_unbooked_amount
              }
              Icon={BiEuro}
              color={"bg-yellow-400"}
            />
          </div>

          {barChartData && (
            <>
              <div className="lg:grid lg:grid-cols-2 lg:gap-2 md:grid md:grid-cols-1 md:gap-2 sm:grid sm:grid-cols-1 sm:gap-2">
                <BarChart
                  title="Overdue Bucket Data"
                  chart_data={barChartData.bar}
                />
                <LineChart
                  chart_data={barChartData.growth.yearly}
                  title="Bank Invoice Transaction Yearly"
                />
              </div>

              <div className="lg:grid lg:grid-cols-2 lg:gap-2 md:grid md:grid-cols-1 md:gap-2 sm:grid sm:grid-cols-1 sm:gap-2">
                <LineChart
                  title="Bank Invoice Transaction Monthly"
                  chart_data={barChartData.growth.monthly}
                />
                <LineChart
                  title="Bank Invoice Transaction Weekly"
                  chart_data={barChartData.growth.weekly}
                />
              </div>
            </>
          )}

          {bankTransaction && (
            <SortedTable
              title={"Bank Transactions"}
              keys={[
                "transaction_id",
                "invoice_number",
                "amount_dc",
                "date",
                "entry_number",
                "remaining_to_be_booked_amount",
                "status",
              ]}
              key={"transaction_id"}
              data={bankTransaction}
              showPagination={true}
              headers={[
                "Transaction Id",
                "Invoice Number",
                "Amount Dc",
                "Date",
                "Entry Number",
                "Remaining to be booked AMT",
                "Status",
              ]}
            />
          )}

          {invoiceDetails && (
            <SortedTable
              title={"Invoices"}
              keys={[
                "transaction_id",
                "invoice_number",
                "date",
                "due_date",
                "amount_dc",
                "due_by_days",
                "status",
                "is_due",
                "pdf_file",
              ]}
              key={"transaction_id"}
              data={invoiceDetails}
              showPagination={true}
              headers={[
                "Transaction ID",
                "Invoice Number",
                "Date",
                "Due Date",
                "Amount DC",
                "Due By Days",
                "Status",
                "Is Due",
                "PDF FILE",
              ]}
            />
          )}
        </Dashboard>
      )}
    </>
  );
};

export default Page;
