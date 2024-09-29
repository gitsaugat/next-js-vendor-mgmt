"use client";
import CountCard from "@/components/dashboard/CountCard";
import Dashboard from "@/components/dashboard/Dashboard";
import Grid from "@/components/dashboard/Grid";
import Header from "@/components/dashboard/Header";
import SortedTable from "@/components/dashboard/Table";
import React, { useEffect, useState } from "react";
import { BiMailSend } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { random_EO_DATA } from "../../../../utils/data";
import { createDonutChartData } from "../../../../utils/chart";
import PieChart from "@/components/dashboard/Charts/PieChart";
import dynamic from "next/dynamic";
import Info from "@/components/dashboard/tags/Info";
import { fetchData, handleRequest } from "../../../../utils/requestMaker/req";
import { API_URLS } from "../../../../utils/apis";
import CardContainer from "@/components/dashboard/CardContainer";
const ReactMap = dynamic(() => import("@/components/dashboard/ReactMap"), {
  ssr: false,
});

const page = () => {
  const [citiesWithClients, setCitiesWithClients] = useState();
  const [clientGeoData, setClientGeoData] = useState();
  const [top10Clients, setTop10Clients] = useState();

  const fetchCities = async () => {
    let response = await handleRequest(
      "GET",
      API_URLS.clientGeneral.listCitiesWithClientCounts(),
      null
    );
    if (response) {
      setCitiesWithClients(response);
    }
  };

  const fetchGeoData = async () => {
    let response = await handleRequest(
      "GET",
      API_URLS.clientGeneral.clientGeoData(),
      null
    );
    if (response) {
      setClientGeoData(response);
    }
  };

  const fetchTop10Clients = async (interval) => {
    let response = await handleRequest(
      "GET",
      API_URLS.clientGeneral.top10Clients(interval),
      null
    );
    if (response) {
      setTop10Clients(response);
    }
  };

  useEffect(() => {
    if (!citiesWithClients) {
      fetchCities();
    }
    if (!clientGeoData) {
      fetchGeoData();
    }
    if (!top10Clients) {
      fetchTop10Clients("last_month");
    }
  }, []);
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
      <br />
      <Header title={"Client Metrics"} />
      <br />
      <CardContainer header={"Type charts"}>
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
        </Grid>
      </CardContainer>
      <br />
      <CardContainer header={"Client Geo Analytics"}>
        {citiesWithClients && (
          <Grid className={"grid grid-cols-2 gap-2 "}>
            <Grid
              className={"grid grid-cols-1  max-h-96 gap-2 overflow-scroll"}
            >
              {[...Object.keys(citiesWithClients)].map((obj) => (
                <Info
                  key={""}
                  initials={obj}
                  href={""}
                  name={obj}
                  bgColor={"bg-pink-600"}
                  members={citiesWithClients[obj]}
                />
              ))}
            </Grid>
            <ReactMap data={clientGeoData} />
          </Grid>
        )}
      </CardContainer>
      <br />
      {top10Clients && (
        <CardContainer header={"Top 10 Clients"}>
          <Grid className={"grid grid-cols-5 gap-3"}>
            {top10Clients.map((client) => (
              <Info
                key={client.account_code}
                initials={""}
                href={"/dashboard/clients/" + client.account_code}
                name={client.account_code}
                bgColor={""}
                members={client.total_amount}
              />
            ))}
          </Grid>
        </CardContainer>
      )}
      <SortedTable
        title={"EO Client Data"}
        headers={""}
        detailKey="account_id"
        detailUrl="/dashboard/clients/"
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
