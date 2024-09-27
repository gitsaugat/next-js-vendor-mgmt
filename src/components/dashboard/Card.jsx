"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import InputField from "../forms/InputField";
import SubmitButton from "../forms/SubmitButton";
import { handleRequest } from "../../../utils/requestMaker/req";
import { API_URLS } from "../../../utils/apis";
import Grid from "./Grid";
import Header from "./Header";
import { HexColorPicker } from "react-colorful";

const Card = ({ extraClasses, data, children, normal = false }) => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("#00000");

  const [newName, setNewName] = useState();
  const updateLabel = (event) => {
    event.preventDefault();
    let updateData = {
      current_name: data.oldName,
      label_type: data.type,
      new_name: newName,
    };
    let response = handleRequest(
      "PUT",
      API_URLS.labels.updateLabels(),
      updateData
    );
  };
  const deleteLabel = () => {
    let deleteData = {
      label_name: data.oldName,
      label_type: data.type,
    };
    let response = handleRequest(
      "DELETE",
      API_URLS.labels.deleteLabels(),
      deleteData
    );
    console.log(response);
  };

  return (
    <div
      onClick={() => setOpen(!open)}
      className={`rounded-lg bg-white shadow-xl ${extraClasses}`}
    >
      {children}
      {normal && (
        <Modal open={open} setOpen={setOpen}>
          <Grid className={"grid grid-cols-2 gap-4  "}>
            <div>
              <Header font="text-sm" title="Label Information" />
              <div className="card bg-gray-200 p-5 mb-5 rounded-md max-h-fit">
                <HexColorPicker
                  className="w-full m-auto"
                  color={color}
                  onChange={setColor}
                />
              </div>
            </div>
            <form>
              <Header font="text-sm" title={"Label Update Form"} />
              <InputField
                label={"New Name"}
                value={newName}
                setState={setNewName}
                type={"text"}
              />
              <InputField
                label={"Color"}
                value={color}
                setState={setColor}
                type={"text"}
              />
              <SubmitButton
                text={"Update"}
                type={"submit"}
                color={"bg-blue-600"}
                onClick={updateLabel}
              />

              <br />

              <SubmitButton
                text={"Delete"}
                type={"button"}
                color={"bg-red-400"}
                onClick={deleteLabel}
              />
            </form>
          </Grid>
        </Modal>
      )}
    </div>
  );
};

export default Card;
