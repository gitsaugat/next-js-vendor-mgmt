"use client";
import Dashboard from "@/components/dashboard/Dashboard";
import React, { useEffect, useRef, useState } from "react";
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
import { SketchPicker } from "react-color";
import { HexColorPicker } from "react-colorful";
import Label from "@/components/dashboard/Label";
import CardContainer from "@/components/dashboard/CardContainer";

const page = () => {
  const [labelsByGroup, setLabelsByGroup] = useState();
  const [open, setOpen] = useState(false);

  const [name, setName] = useState();
  const [type, setType] = useState();
  const [description, setDescription] = useState();
  const [color, setColor] = useState("#37d67a");

  const [showPicker, setShowPicker] = useState(true);

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

    handleRequest("POST", API_URLS.labels.createLabels(), data);
    fetchData(API_URLS.labels.listAllLabelsByGroup(), setLabelsByGroup);
  };
  const pickerRef = useRef(null);
  return (
    <Dashboard>
      <div className="flex justify-end">
        <button
          onClick={() => {
            setOpen(!open);
          }}
          className="p-3 w-fit bg-blue-500 rounded-md text-white font-bold float-right m-2 hover:bg-blue-700 hover:transition"
        >
          Add Label
        </button>
      </div>
      {labelsByGroup && (
        <>
          <Modal open={open} setOpen={setOpen}>
            <Grid className={"flex flex-row items-center justify-around"}>
              <div className="h-full">
                <div
                  style={{ backgroundColor: color }}
                  className="card  p-5 mb-5 rounded-md max-h-fit"
                >
                  {showPicker && (
                    <HexColorPicker
                      className="w-full m-auto"
                      color={color}
                      onChange={setColor}
                    />
                  )}
                </div>
              </div>
              <form className="border-solid">
                <Header title={"Label Create Form"} font={"text-sm"} />
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
                <div className="flex flex-col">
                  <InputField
                    value={color}
                    setState={setColor}
                    label={"Label Color"}
                    type={"text"}
                  />
                </div>
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
            </Grid>
          </Modal>
          {labelsByGroup.map(({ label_type, labels }) => (
            <>
              <br />
              <Header key={label_type} title={label_type} split={true} />
              <br />
              <Grid
                className={
                  "mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
                }
              >
                {labels?.map((label) => (
                  <Card
                    normal={true}
                    key={label}
                    data={{
                      type: label_type,
                      oldName: label.label_name,
                      color: label.label_color,
                      description: label.label_description,
                    }}
                  >
                    <Label
                      key={label.label_name}
                      bgColor={label.label_color}
                      name={label.label_name}
                      description={label.label_description}
                    />
                  </Card>
                ))}
              </Grid>
            </>
          ))}
        </>
      )}
    </Dashboard>
  );
};

export default page;
