"use client";
import CountCard from "@/components/dashboard/CountCard";
import Dashboard from "@/components/dashboard/Dashboard";
import Grid from "@/components/dashboard/Grid";
import Header from "@/components/dashboard/Header";
import React, { useEffect, useState } from "react";
import {
  BiEuro,
  BiLogoProductHunt,
  BiSolidBank,
  BiSolidNote,
} from "react-icons/bi";
import { handleRequest } from "../../../../../utils/requestMaker/req";
import { API_URLS } from "../../../../../utils/apis";
import LineChart from "@/components/dashboard/Charts/LineChart";
import {
  createBarChartData,
  createDonutChartData,
} from "../../../../../utils/chart";
import PieChart from "@/components/dashboard/Charts/PieChart";
import BarChart from "@/components/dashboard/Charts/BarChart";
import Info from "@/components/dashboard/tags/Info";
import CardContainer from "@/components/dashboard/CardContainer";
import StackedList from "@/components/dashboard/StackedLists";
import Drawyer from "@/components/dashboard/Drawyer";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/selectField";
import { CheckButton } from "@/components/dashboard/Buttons";

const Page = () => {
  const [financialDetail, setFinancialDetail] = useState();
  const [clientDetail, setClientDetail] = useState();
  const [top10Products, setTop10Products] = useState();
  const [allProducts, setAllProducts] = useState();
  const [businessDrawyer, setBusinessDrwayer] = useState(false);
  const [financialDrawyer, setFinancialDrwayer] = useState(false);
  const [bankruptcy, setBankruptcy] = useState(false);
  const [closedDays, setClosedDays] = useState(false);
  const [labels, setLabels] = useState(false);
  const [clientLevelLabels, setClientLevelLabels] = useState();
  const [weekDays, setWeekDays] = useState([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);

  const fetchClientLevelLabels = async () => {
    const response = await handleRequest(
      "GET",
      API_URLS.labels.listAllLabelsByGroup(),
      null
    );
    let clientLevelLabelsResponse = response.filter(
      (r) => r.label_type == "Client_Level_Label"
    );
    if (clientLevelLabelsResponse.length > 0) {
      setClientLevelLabels(clientLevelLabelsResponse[0]);
    }
  };
  const fetchFinancialDetail = async () => {
    const response = await handleRequest(
      "GET",
      API_URLS.clientDetail.clientFinancialDetail(1234),
      null
    );

    setFinancialDetail(response);
  };
  const fetchClientDetail = async () => {
    const response = await handleRequest(
      "GET",
      API_URLS.clientDetail.clientDetail(1234),
      null
    );

    setClientDetail(response);
  };

  const fetchTop10Products = async () => {
    const response = await handleRequest(
      "GET",
      API_URLS.clientDetail.top10Products(1234),
      null
    );

    setTop10Products(response);
  };

  const fetchAllProducts = async () => {
    const response = await handleRequest(
      "GET",
      API_URLS.clientDetail.allProducts(1234),
      null
    );

    setAllProducts(response);
  };

  useEffect(() => {
    if (!financialDetail) {
      fetchFinancialDetail();
    }
    if (!top10Products) {
      fetchTop10Products();
    }
    if (!allProducts) {
      fetchAllProducts();
    }
    if (!clientDetail) {
      fetchClientDetail();
    }
    if (!clientLevelLabels) {
      fetchClientLevelLabels();
    }
  });

  function getStatus(closed_days, weekDays) {
    let today = new Date().getDay();
    [...closed_days].forEach((value, index, array) => {
      if (weekDays[today] == value) {
        return true;
      }
    });
    return false;
  }

  return (
    <Dashboard>
      {clientDetail?.EO_Data && (
        <>
          <div className={"flex gap-3 flex-row"}>
            <label
              className="font-semibold text-gray-500"
              onClick={() => setClosedDays(!closedDays)}
            >
              {" "}
              Status
            </label>
            <div
              className={`h-6 w-6 p-2 rounded-full ${
                getStatus(clientDetail?.EO_Data?.closed_days, weekDays)
                  ? "bg-red-300"
                  : "bg-green-300"
              } ring-2 ring-white`}
            ></div>
            <label
              onClick={() => setBankruptcy(!bankruptcy)}
              className="font-semibold text-gray-500"
            >
              {" "}
              Bankruptcy
            </label>
            <div
              className={`h-6 w-6 p-2 rounded-full ${
                clientDetail.EO_Data.is_bankrupt ? "bg-red-300" : "bg-green-500"
              } ring-2 ring-white`}
            ></div>
          </div>
        </>
      )}
      <br />

      {financialDetail && (
        <>
          <Header title={"Financial Metrics"} />
          <br />
          <Grid className={"grid grid-cols-4 gap-3"}>
            <CountCard
              title="Unique Bank Transaction"
              value={financialDetail.unique_bank_transactions_count}
              Icon={BiSolidBank}
              color="bg-green-500"
              primary={financialDetail.total_bank_transactions_value}
              onClickRedirect=""
            />
            <CountCard
              title="Unique Invoices"
              value={financialDetail.unique_invoices_count}
              Icon={BiSolidNote}
              color="bg-green-500"
              primary={financialDetail.total_invoice_value}
              onClickRedirect=""
            />
            <CountCard
              title="Latest Amount"
              value={financialDetail.latest_amount}
              Icon={BiEuro}
              color="bg-green-500"
              onClickRedirect=""
            />
            <CountCard
              title="Total Products"
              value={allProducts?.top_products?.length}
              Icon={BiLogoProductHunt}
              color="bg-yellow-500"
              onClickRedirect=""
            />
          </Grid>
          <br />
          <Header title={"Transaction Metrics"} />
          <br />
          <Grid className={"grid grid-cols-2 gap-3"}>
            <CardContainer header={"Yearly Bank Transaction Data"}>
              <LineChart
                chart_data={createBarChartData(
                  [
                    {
                      name: "Transaction Count",
                      data: financialDetail.yearly_bank_transactions_data?.map(
                        (d) => d.count
                      ),
                    },
                  ],
                  financialDetail.yearly_bank_transactions_data?.map(
                    (d) => d.year
                  )
                )}
              />
            </CardContainer>
            <CardContainer header={"Yearly Invoice Data"}>
              <BarChart
                chart_data={createBarChartData(
                  [
                    {
                      name: "Invoices",
                      data: financialDetail.yearly_invoice_data?.map(
                        (d) => d.count
                      ),
                    },
                  ],
                  financialDetail.yearly_invoice_data?.map((d) => d.year)
                )}
              />
            </CardContainer>
          </Grid>
        </>
      )}
      <br />
      <Header title={"Client Detail"} />
      <br />

      <Grid className={"grid grid-cols-2 gap-3"}>
        {clientDetail?.EO_Data && (
          <CardContainer
            onClick={() => setBusinessDrwayer(!businessDrawyer)}
            header={"Business"}
          >
            <StackedList
              data={["account_name", "customer_code", "city", "country"].map(
                (detail) => ({
                  title: detail,
                  value: clientDetail.EO_Data[detail],
                })
              )}
            />
          </CardContainer>
        )}

        {financialDetail && (
          <CardContainer
            onClick={() => setFinancialDrwayer(!financialDrawyer)}
            header={"Financial"}
          >
            <StackedList
              data={[
                "account_code",
                "total_invoice_value",
                "total_bank_transactions_value",
                "latest_amount",
              ].map((detail) => ({
                title: detail,
                value: financialDetail[detail],
              }))}
            />
          </CardContainer>
        )}
      </Grid>
      <br />
      {clientDetail && (
        <Grid className={"grid grid-cols-2 gap-3"}>
          <CardContainer onClick={() => {}} header={"Business Days"}>
            <Grid className={"grid grid-cols-5 gap-2"}>
              {weekDays.map((d) => (
                <Info
                  key={d}
                  initials={d}
                  href=""
                  name={d}
                  bgColor={
                    clientDetail.EO_Data.closed_days.includes(d)
                      ? "#db5a74"
                      : "#abf5cf"
                  }
                  members={
                    clientDetail.EO_Data.closed_days.includes(d)
                      ? "closed"
                      : "open"
                  }
                />
              ))}
            </Grid>
          </CardContainer>
          <CardContainer
            onClick={() => {
              setLabels(!labels);
            }}
            header={"Labels"}
          >
            <Grid className={"grid grid-cols-3 gap-2"}>
              {clientDetail.EO_Data.dynamic_client_level_labels.map((d) => (
                <Info
                  key={d.name}
                  initials={d.name}
                  href=""
                  name={d.name}
                  bgColor={d.color}
                  members={""}
                />
              ))}
            </Grid>
          </CardContainer>
        </Grid>
      )}

      <br />
      <Header title={"Products"} />
      {top10Products && (
        <>
          <CardContainer header={"Top 10 Products"}>
            <Grid className={"grid grid-cols-5 gap-3"}>
              {top10Products.top_products?.map((prod) => (
                <Info
                  key=""
                  initials=""
                  href=""
                  name={"Code " + prod.product_code}
                  bgColor=""
                  members={"Order Nr " + prod.order_nr}
                />
              ))}
            </Grid>
          </CardContainer>
        </>
      )}
      <br />
      {allProducts && (
        <CardContainer header={"All Products"}>
          <Grid className={"grid grid-cols-5 gap-3 max-h-80 overflow-scroll"}>
            {allProducts.top_products?.map((prod) => (
              <Info
                key=""
                initials=""
                href=""
                name={"Code " + prod.product_code}
                bgColor=""
                members={"Order Nr " + prod.order_nr}
              />
            ))}
          </Grid>
        </CardContainer>
      )}
      <br />
      {clientDetail && (
        <Drawyer
          open={businessDrawyer}
          setOpen={setBusinessDrwayer}
          title={"Business Information"}
        >
          <Header title={"EO Data"} />
          <CardContainer header={"General"}>
            <StackedList
              data={[
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
                "is_bankrupt",
              ].map((detail) => ({
                title: detail,
                value: clientDetail?.EO_Data[detail],
              }))}
            />
          </CardContainer>
          <Header title={"ROPP Data"} />
          <CardContainer header={"General"}>
            <StackedList
              data={[
                "code",
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
              ].map((detail) => ({
                title: detail,
                value: clientDetail?.ROPP_Data[0][detail],
              }))}
            />
          </CardContainer>
        </Drawyer>
      )}
      {financialDetail && (
        <Drawyer
          open={financialDrawyer}
          setOpen={setFinancialDrwayer}
          title={"Financial Information"}
        >
          <CardContainer header={"General"}>
            <StackedList
              data={[
                "account_code",
                "iban_count",
                "payment_term",
                "unique_invoices_count",
                "total_invoice_value",
                "unique_bank_transactions_count",
                "total_bank_transactions_value",
                "latest_transaction_date",
                "latest_amount",
              ].map((detail) => ({
                title: detail,
                value: financialDetail[detail],
              }))}
            />
          </CardContainer>
          <br />
          <CardContainer header={"Unique Ibans"}>
            <StackedList
              data={["iban", "last_used"].map((detail) => ({
                title: detail,
                value: financialDetail.unique_ibans[0][detail],
              }))}
            />
          </CardContainer>
          <br />
          <CardContainer header={"Latest Invoice"}>
            <StackedList
              data={["invoice_number", "date", "due_date"].map((detail) => ({
                title: detail,
                value: financialDetail.latest_invoice[detail],
              }))}
            />
          </CardContainer>
          <br />
          <CardContainer header={"Oldest Outstanding Invoice"}>
            <StackedList
              data={[
                "invoice_number",
                "invoice_date",
                "remained_amount",
                "original_invoice_amount",
              ].map((detail) => ({
                title: detail,
                value: financialDetail.oldest_outstanding_invoice[detail],
              }))}
            />
          </CardContainer>
        </Drawyer>
      )}
      <Drawyer setOpen={setBankruptcy} open={bankruptcy} title={"Bankruptcy"}>
        <div>
          <Header title={"Bankruptcy Status Form"} />
          <br />
          <CardContainer>
            <SelectField
              label="Status"
              name="bankrupty_status"
              value="bankrupt"
              setState=""
              onChange=""
              options={[
                { label: "Bankrupt", value: "true" },
                { label: "Stable", value: "false" },
              ]}
              required=""
            />
            <CheckButton onClickHandler={() => {}} title={"Update"} />
          </CardContainer>
        </div>
      </Drawyer>
      {clientDetail && (
        <>
          <Drawyer
            setOpen={setClosedDays}
            open={closedDays}
            title={"Bankruptcy"}
          >
            <div>
              <Header title={"Business Days Form"} />
              <br />
              <CardContainer header="Add  Closed Days">
                <SelectField
                  label="Status"
                  name="business_days"
                  value="bankrupt"
                  setState=""
                  onChange=""
                  options={weekDays.map((d) => ({ label: d, value: d }))}
                  required=""
                />
                <CheckButton onClickHandler={() => {}} title={"Update"} />
              </CardContainer>
              <br />
              <CardContainer header="Remove Closed Days">
                <SelectField
                  label="Status"
                  name="business_days"
                  value="bankrupt"
                  setState=""
                  onChange=""
                  options={clientDetail.EO_Data.closed_days.map((d) => ({
                    label: d,
                    value: d,
                  }))}
                  required=""
                />
                <CheckButton onClickHandler={() => {}} title={"Update"} />
              </CardContainer>
            </div>
          </Drawyer>
          <Drawyer setOpen={setLabels} open={labels} title={"Bankruptcy"}>
            <div>
              <Header title={"Add Labels"} />
              <br />
              {clientLevelLabels && (
                <CardContainer header="Add Client Labels">
                  <SelectField
                    label="Labels"
                    name="client_labels"
                    value="bankrupt"
                    setState=""
                    onChange=""
                    options={clientLevelLabels.labels.map((c) => ({
                      label: c.label_name,
                      value: c.label_name,
                    }))}
                    required=""
                  />
                  <CheckButton onClickHandler={() => {}} title={"Update"} />
                </CardContainer>
              )}
              <br />
              <CardContainer header="Remove Labels">
                <SelectField
                  label="Labels"
                  name="client"
                  value="bankrupt"
                  setState=""
                  onChange=""
                  options={clientDetail.EO_Data.dynamic_client_level_labels.map(
                    (d) => ({
                      label: d.name,
                      value: d.name,
                    })
                  )}
                  required=""
                />
                <CheckButton onClickHandler={() => {}} title={"Update"} />
              </CardContainer>
            </div>
          </Drawyer>
        </>
      )}
    </Dashboard>
  );
};

export default Page;
