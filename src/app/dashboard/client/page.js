"use client";
import CountCard from "@/components/dashboard/CountCard";
import Dashboard from "@/components/dashboard/Dashboard";
import Grid from "@/components/dashboard/Grid";
import Header from "@/components/dashboard/Header";
import SortedTable from "@/components/dashboard/Table";
import React from "react";
import { BiMailSend } from "react-icons/bi";
import { BsMailbox, BsPeople } from "react-icons/bs";
import { random_EO_DATA, RANDOM_ROPP_DATA } from "../../../../utils/data";
import BarChart from "@/components/dashboard/Charts/BarChart";
import LineChart from "@/components/dashboard/Charts/LineChart";
import {
  createBarChartData,
  createDonutChartData,
} from "../../../../utils/chart";
import PieChart from "@/components/dashboard/Charts/PieChart";
import ReactMap from "@/components/dashboard/ReactMap";
const page = () => {
  return (
    <Dashboard>
      <Header title={"Web Shop Summary"} />
      <br />
      <Grid className={"grid grid-cols-4"}>
        <CountCard
          title={"Total Clients with Internet Orders"}
          value={100}
          Icon={BsPeople}
          color={"bg-green-400"}
          onClickRedirect={"/dashboard/client/internetOrder"}
        />
        <CountCard
          title={"Client Types"}
          value={100}
          Icon={BsPeople}
          color={"bg-yellow-400"}
          onClickRedirect={"/dashboard/client/types"}
        />
      </Grid>
      <br />
      <Header title={"Client Customer Count"} />
      <br />
      <Grid className={"grid grid-cols-4"}>
        <CountCard
          title={"EO-Total Customers"}
          value={200}
          Icon={BsPeople}
          color={"bg-blue-400"}
        />
        <CountCard
          title={"EO-Customers Missing Email"}
          value={200}
          Icon={BiMailSend}
          color={"bg-red-400"}
        />
        <CountCard
          title={"ROPP-Total Customers"}
          value={200}
          Icon={BsPeople}
          color={"bg-blue-400"}
        />
        <CountCard
          title={"ROPP-Customers Missing Email"}
          value={200}
          Icon={BiMailSend}
          color={"bg-red-400"}
        />
      </Grid>

      <Grid className={"grid grid-cols-2 gap-3 mt-2"}>
        <PieChart
          title={"Client Types"}
          chart_data={createDonutChartData(
            [10, 2, 3, 20, 58, 60, 7, 8],
            [
              "SUSHI",
              "CAR WASH",
              "INDIAN",
              "THAI",
              "AMERICAN",
              "EURO",
              "G",
              "H",
            ]
          )}
        />
        <ReactMap />
      </Grid>

      <SortedTable
        title={"EO Client Data"}
        headers={""}
        data={random_EO_DATA}
        keys={[
          "account_id",
          "account_name",
          "customer_code",
          "status",
          "created_date",
          "modified_date",
          "vat_number",
          "account_type",
          "start_date",
          "address_line1",
          "address_line2",
          "city",
          "country",
          "email",
          "phone_number",
          "website",
          "is_supplier",
          "is_customer",
          "payment_term",
          "latest_invoice_date",
          "latest_due_date",
          "latest_invoice_number",
          "total_outstanding",
          "oldest_invoice_date",
          "oldest_invoice_number",
          "total_nr_of_outstanding_invoices",
          "last_payment_date",
          "blocked",
          "credit_line_purchase",
          "credit_line_sales",
          "discount_purchase",
          "discount_sales",
          "customer_since",
        ]}
        detailKey={""}
        detailUrl={""}
        showPagination={""}
      />
      <SortedTable
        title={"ROPP Client Data"}
        headers={""}
        data={[]}
        keys={[
          "code",
          "representative",
          "name",
          "remarks",
          "external_id",
          "website",
          "chamber_of_commerce_number",
          "vat_number",
          "row_version",
          "id",
          "main_address-city",
          "main_address-country-name",
          "main_address-country-isoCode2",
          "main_address-country-operations",
          "main_address-operations",
          "main_address-postalCode",
          "main_address-phoneNumber",
          "main_address-addressLine1",
          "email-1-id",
          "email-1-description",
          "email-1-mailAddress",
          "email-2-id",
          "email-2-description",
          "email-2-mailAddress",
          "email-3-id",
          "email-3-description",
          "email-3-mailAddress",
          "email-4-id",
          "email-4-description",
          "email-4-mailAddress",
          "email-5-id",
          "email-5-description",
          "email-5-mailAddress",
          "email-6-id",
          "email-6-description",
          "email-6-mailAddress",
        ]}
        detailKey={""}
        detailUrl={""}
        showPagination={""}
      />
    </Dashboard>
  );
};

export default page;
