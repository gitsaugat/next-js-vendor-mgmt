"use client";
import Dashboard from "@/components/dashboard/Dashboard";
import React, { useEffect, useState } from "react";
import { fetchData, handleRequest } from "../../../utils/requestMaker/req";
import { API_URLS } from "../../../utils/apis";
import Header from "@/components/dashboard/Header";
import Grid from "@/components/dashboard/Grid";
import Tabs from "@/components/dashboard/Tabs";
import Card from "@/components/dashboard/Card";
import Modal from "@/components/dashboard/Modal";
import InputField from "@/components/forms/InputField";
import SubmitButton from "@/components/forms/SubmitButton";
import SelectField from "@/components/forms/selectField";

const page = () => {
  const [labelsByGroup, setLabelsByGroup] = useState();
  const [open, setOpen] = useState(true);

  const [name, setName] = useState();
  const [type, setType] = useState();
  const [description, setDescription] = useState();
  const [color, setColor] = useState();

  useEffect(() => {
    if (!labelsByGroup) {
      fetchData(API_URLS.labels.listAllLabelsByGroup(), setLabelsByGroup);
    }
  }, [labelsByGroup]);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    let data = {
      name,
      description,
      type,
      color,
    };

    let response = handleRequest("POST", API_URLS.labels.createLabels(), data);

    console.log(response, "Response");
  };
  return (
    <Dashboard>
      {labelsByGroup && (
        <div>
          <Modal open={open} setOpen={setOpen}>
            <form>
              <InputField
                value={name}
                setState={setName}
                label={"Name"}
                type={"text"}
              />
              <SelectField
                label={"Type"}
                type={"text"}
                value={type}
                setState={setType}
                options={labelsByGroup.map(({ label_type }) => ({
                  label: label_type,
                  value: label_type,
                }))}
              />
              <InputField
                value={description}
                setState={setDescription}
                label={"Label Description"}
                type={"text"}
              />
              <InputField
                value={color}
                setState={setColor}
                label={"Label Color"}
                type={"text"}
              />
              <SubmitButton
                text={"Create Label"}
                onClick={(e) => {
                  console.log("clicked");
                  onSubmitHandler(e);
                }}
                color={"bg-green-500"}
                type={"submit"}
              />
            </form>
          </Modal>
          {labelsByGroup.map(({ label_type, labels }) => (
            <>
              <Header key={label_type} title={label_type} split={true} />

              <Grid
                className={
                  " lg:grid lg:grid-cols-4 lg:gap-3 m-4 align-middle sm:grid sm:grid-rows-1 sm:gap-3 xs:grid xs:grid-rows-1 xs:gap-3  md:grid md:grid-cols-2 md:gap-3"
                }
              >
                {labels?.map((label) => (
                  <Card
                    key={label}
                    data={{ type: label_type, oldName: label.label_name }}
                  >
                    <div className="flex justify-between items-center">
                      <div
                        style={{
                          background: label.label_color,
                          opacity: 0.5,
                        }}
                        className="h-full w-20 rounded-sm p-9"
                      ></div>
                      <p className=" text-lg font-medium float-right mr-6 ">
                        {label.label_name}
                      </p>
                    </div>
                  </Card>
                ))}
              </Grid>
            </>
          ))}
        </div>
      )}
    </Dashboard>
  );
};

export default page;
