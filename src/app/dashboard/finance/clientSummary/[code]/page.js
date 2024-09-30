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
import { useParams } from "next/navigation";
import Tabs from "@/components/dashboard/Tabs";
import CardContainer from "@/components/dashboard/CardContainer";

const Page = () => {
  const [globalData, setGlobalData] = useState();
  const [financialTransaction, setFinancialTransaction] = useState();
  const [bankAndInvoiceDetail, setBankAndInvoiceDetail] = useState();
  const [invoiceDetails, setInvoiceDetails] = useState();
  const [bankTransaction, setBankTransaction] = useState();
  const [barChartData, setBarChartData] = useState();
  const [type, setType] = useState();
  const params = useParams();
  const { code } = params;

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

        invoiceValue: bankAndInvoiceDetail.yearly_data.map(
          (d) => d.invoice_count
        ),
        bankTransactionValue: bankAndInvoiceDetail.yearly_data.map(
          (d) => d.bank_transaction_count
        ),
      };
      const monthlyData = {
        categories: bankAndInvoiceDetail.monthly_data.map((d) => d.month),
        invoiceValue: bankAndInvoiceDetail.monthly_data.map(
          (d) => d.invoice_count
        ),
        bankTransactionValue: bankAndInvoiceDetail.monthly_data.map(
          (d) => d.bank_transaction_count
        ),
      };
      const weeklyData = {
        categories: bankAndInvoiceDetail.weekly_data.map((d) => d.week),
        invoiceValue: bankAndInvoiceDetail.weekly_data.map(
          (d) => d.invoice_count
        ),

        bankTransactionValue: bankAndInvoiceDetail.weekly_data.map(
          (d) => d.bank_transaction_count
        ),
      };

      setBarChartData({
        bar: createBarChartData(
          [{ data: bucketDetails, name: "Bucket Data" }],
          bucketCategories
        ),
        donut: createDonutChartData(bucketDetails, bucketCategories),
        growth: {
          yearly: createBarChartData(
            [
              {
                name: "Invoices",
                data: yearlyData.invoiceValue,
              },
              {
                name: "Bank Transactions",
                data: yearlyData.bankTransactionValue,
              },
            ],
            yearlyData.categories
          ),
          monthly: createBarChartData(
            [
              {
                name: "Invoices",
                data: monthlyData.invoiceValue,
              },
              {
                name: "Bank Transactions",
                data: monthlyData.bankTransactionValue,
              },
            ],
            monthlyData.categories
          ),
          weekly: createBarChartData(
            [
              {
                name: "Invoices",
                data: weeklyData.invoiceValue,
              },
              {
                name: "Bank Transactions",
                data: weeklyData.bankTransactionValue,
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
        API_URLS.finance.financialTransactionPerClient(code),
        setFinancialTransaction
      );
    }
    if (!bankAndInvoiceDetail) {
      fetchData(
        API_URLS.finance.bankAndInvoiceDetailsPerClient(code),
        setBankAndInvoiceDetail
      );
    }
    if (!invoiceDetails) {
      fetchData(
        API_URLS.finance.invoiceDetailPerClient(code),
        setInvoiceDetails
      );
    }
    if (!bankTransaction) {
      fetchData(
        API_URLS.finance.bankTransactionDetailPerClient(code),
        setBankTransaction
      );
    }
  }, []);

  useEffect(() => {
    if (type) {
      if (!globalData) {
        setGlobalData({
          bankTransaction: bankTransaction,
          invoiceDetails: invoiceDetails,
        });
      }
      if (type == "booked") {
        let bookedTransactions = bankTransaction.map((trans) => {
          if (trans.status == "booked") {
            return trans;
          } else {
            return "none";
          }
        });
        let paidInvoices = invoiceDetails.map((trans) => {
          if (trans.status == "paid") {
            return trans;
          } else {
            return "none";
          }
        });
        setBankTransaction(bookedTransactions);
        setInvoiceDetails(paidInvoices);
      } else {
        let unbookedBankTransactions = bankTransaction.map((trans) => {
          if (trans.status == "unbooked") {
            return trans;
          } else {
            return "none";
          }
        });
        let pendingInvoices = invoiceDetails.map((trans) => {
          if (trans.status == "pending") {
            return trans;
          } else {
            return "none";
          }
        });
        setBankTransaction(unbookedBankTransactions);
        setInvoiceDetails(pendingInvoices);
      }
    }
  }, [type]);

  const resetGlobalData = () => {
    if (globalData) {
      setBankTransaction(globalData.bankTransaction);
      setInvoiceDetails(globalData.invoiceDetails);
    }
  };

  return (
    <>
      {financialTransaction && (
        <Dashboard>
          <p className="text-gray-500 text-xl font-bold m-2">Invoices</p>
          <div className="lg:grid lg:grid-cols-4 lg:gap-4 md:grid md:grid-cols-2 md:gap-4 sm:grid sm:grid-cols-2 sm:gap-4">
            <CountCard
              title={"Total Invoices"}
              value={
                financialTransaction.financial_transactions
                  .unique_invoices_count
              }
              primary={
                financialTransaction.financial_transactions.total_invoice_value
              }
              Icon={BiNote}
              color={"bg-green-400"}
            />

            <CountCard
              title={"Outstanding Invoices"}
              value={
                financialTransaction.outstanding_and_due
                  .outstanding_invoice_count
              }
              primary={
                financialTransaction.outstanding_and_due.total_outstanding
              }
              Icon={BiNote}
              color={"bg-red-400"}
            />

            <CountCard
              title={"Overdue"}
              value={financialTransaction.outstanding_and_due.overdue_count}
              Icon={FaCcMastercard}
              primary={financialTransaction.outstanding_and_due.overdue_amount}
              color={"bg-red-400"}
            />
          </div>
          <p className="text-gray-500 text-xl font-bold m-2">Banking</p>
          <div className="lg:grid lg:grid-cols-4 lg:gap-4 md:grid md:grid-cols-2 md:gap-4 sm:grid sm:grid-cols-2 sm:gap-4 ">
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
            <div className="mt-3">
              <div className="lg:grid lg:grid-cols-2 lg:gap-4 md:grid md:grid-cols-1 md:gap-4 sm:grid sm:grid-cols-1 sm:gap-4">
                <CardContainer header="Overdue Bucket Data">
                  <BarChart chart_data={barChartData.bar} />
                </CardContainer>
                <CardContainer header={"Transactions & Invoices"}>
                  <Tabs
                    tabs={[
                      {
                        name: "Yearly",
                        href: "#",
                        current: false,
                        component: LineChart,
                        props: barChartData.growth.yearly,
                      },
                      {
                        name: "Monthly",
                        href: "#",
                        current: false,
                        component: LineChart,
                        props: barChartData.growth.monthly,
                      },
                      {
                        name: "Weekly",
                        href: "#",
                        current: false,
                        component: LineChart,
                        props: barChartData.growth.weekly,
                      },
                    ]}
                  />
                </CardContainer>
              </div>
            </div>
          )}
          <div className="bg-white shadow-lg rounded-lg mt-3">
            <div className="flex justify-between p-4 bg-gray-50">
              <div className="text-md font-bold">Cash Flow Table</div>
              <div className="flex">
                <div className="">
                  <label className="p-3 ">Unbooked</label>
                  <input
                    type="checkbox"
                    checked={type == "unbooked"}
                    onClick={() => {
                      if (type == "unbooked") {
                        resetGlobalData();
                        setType(undefined);
                      } else {
                        resetGlobalData();
                        setType("unbooked");
                      }
                    }}
                  />
                </div>
                <div>
                  <label className="p-3">Booked</label>
                  <input
                    type="checkbox"
                    checked={type == "booked"}
                    onClick={() => {
                      if (type == "booked") {
                        resetGlobalData();
                        setType(undefined);
                      } else {
                        resetGlobalData();
                        setType("booked");
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="lg:grid lg:grid-cols-2 lg:gap-3 sm:grid sm:grid-cols-1 sm:gap-3">
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
            </div>
          </div>
        </Dashboard>
      )}
    </>
  );
};

export default Page;
