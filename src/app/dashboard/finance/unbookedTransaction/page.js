"use client";
import Dashboard from "@/components/dashboard/Dashboard";
import React, { useEffect, useState } from "react";
import { API_URLS } from "../../../../../utils/apis";
import { fetchData } from "../../../../../utils/requestMaker/req";
import SortedTable from "@/components/dashboard/Table";

const page = () => {
  const [paymentTracking, setPaymentTracking] = useState();

  useEffect(() => {
    fetchData(API_URLS.finance.paymentTracking(), setPaymentTracking);
  }, []);
  return (
    <Dashboard>
      {paymentTracking && (
        <div className="lg:grid lg:grid-cols-2 lg:gap-3 sm:grid sm:grid-rows-1">
          <SortedTable
            headers={[
              "Account Code",
              "Account Name",
              "Bank Details Amount Dc",
              "Total Invoice Amount Dc",
            ]}
            detailKey={0}
            detailUrl={"/dashboard/finance/paymentTracking/matched"}
            keys={[
              "account_code",
              "account_name",
              "bank_details_amount_dc",
              "total_invoice_amount_dc",
            ]}
            title={"Payment Tracking (Matched)"}
            data={paymentTracking?.matched_invoices}
          />

          <SortedTable
            headers={[
              "Account Code",
              "Account Name",
              "Bank Details Amount Dc",
              "Paid Status",
              "Total Invoice Amount Dc",
            ]}
            detailKey={0}
            detailUrl={"/dashboard/finance/paymentTracking/unmatched"}
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

export default page;
