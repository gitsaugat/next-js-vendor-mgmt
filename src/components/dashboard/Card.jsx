"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import InputField from "../forms/InputField";
import SubmitButton from "../forms/SubmitButton";
import { handleRequest } from "../../../utils/requestMaker/req";
import { API_URLS } from "../../../utils/apis";

const Card = ({ extraClasses, data, children }) => {
  const [open, setOpen] = useState(false);

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
      <Modal open={open} setOpen={setOpen}>
        <form>
          <InputField
            label={"New Name"}
            value={newName}
            setState={setNewName}
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
      </Modal>
    </div>
  );
};

export default Card;
