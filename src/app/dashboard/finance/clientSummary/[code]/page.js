"use client";
import Dashboard from "@/components/dashboard/Dashboard";
import React, { useEffect, useState } from "react";
import { makeRequest } from "../../../../../../utils/requestMaker/req";
import { API_URLS } from "../../../../../../utils/apis";
import CountCard from "@/components/dashboard/CountCard";
import { BiEuro, BiMoney, BiNote } from "react-icons/bi";
import { FaCcMastercard } from "react-icons/fa";
import { RiBankFill } from "react-icons/ri";
import { TbCashRegister } from "react-icons/tb";
import BarChart from "@/components/dashboard/Charts/BarChart";
import PieChart from "@/components/dashboard/Charts/PieChart";

const Page = () => {
  const [financialTransaction, setFinancialTransaction] = useState();
  const [bankAndInvoiceDetail, setBankAndInvoiceDetail] = useState();
  const [invoiceDetails, setInvoiceDetails] = useState();
  const [bankTransaction, setBankTransaction] = useState();
  const [barChartData, setBarChartData] = useState();

  const fetchData = async (url, setState) => {
    try {
      const res = await makeRequest(url, "GET", {});
      setState(res);
    } catch (error) {
      console.error("Error fetching unbooked transactions:", error);
    }
  };

  useEffect(() => {
    if (financialTransaction) {
      setBarChartData({
        bar: {
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
                Math.round(
                  financialTransaction.outstanding_and_due.overdue_buckets[
                    "0_10_days"
                  ]["amount"]
                ),
                Math.round(
                  financialTransaction.outstanding_and_due.overdue_buckets[
                    "11_20_days"
                  ]["amount"]
                ),
                Math.round(
                  financialTransaction.outstanding_and_due.overdue_buckets[
                    "21_30_days"
                  ]["amount"]
                ),
                Math.round(
                  financialTransaction.outstanding_and_due.overdue_buckets[
                    "31_60_days"
                  ]["amount"]
                ),
                Math.round(
                  financialTransaction.outstanding_and_due.overdue_buckets[
                    "61_plus_days"
                  ]["amount"]
                ),
              ],
            },
          ],
        },
        donut: {
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
            Math.round(
              financialTransaction.outstanding_and_due.overdue_buckets[
                "0_10_days"
              ]["amount"]
            ),
            Math.round(
              financialTransaction.outstanding_and_due.overdue_buckets[
                "11_20_days"
              ]["amount"]
            ),
            Math.round(
              financialTransaction.outstanding_and_due.overdue_buckets[
                "21_30_days"
              ]["amount"]
            ),
            Math.round(
              financialTransaction.outstanding_and_due.overdue_buckets[
                "31_60_days"
              ]["amount"]
            ),
            Math.round(
              financialTransaction.outstanding_and_due.overdue_buckets[
                "61_plus_days"
              ]["amount"]
            ),
          ],
        },
      });
    }
  }, [financialTransaction]);
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
            <div className="grid grid-cols-2 gap-2">
              <BarChart chart_data={barChartData.bar} />
              <PieChart chart_data={barChartData.donut} />
            </div>
          )}
        </Dashboard>
      )}
    </>
  );
};

export default Page;
