import { CheckCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

const CheckButton = ({ onClickHandler, title }) => {
  return (
    <button
      onClick={onClickHandler}
      type="button"
      className="inline-flex mt-4 items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {title}
      <CheckCircleIcon aria-hidden="true" className="-mr-0.5 h-5 w-5" />
    </button>
  );
};

export { CheckButton };
