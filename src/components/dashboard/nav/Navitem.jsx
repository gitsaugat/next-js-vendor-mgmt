import React from "react";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navitem = ({ item }) => {
  return (
    <li key={item.name}>
      <Link
        href={item.href}
        className={classNames(
          item.current
            ? "bg-gray-50 text-indigo-600"
            : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
        )}
      >
        <item.icon
          aria-hidden="true"
          className={classNames(
            item.current
              ? "text-indigo-600"
              : "text-gray-400 group-hover:text-indigo-600",
            "h-6 w-6 shrink-0"
          )}
        />
        {item.name}
      </Link>
    </li>
  );
};

export default Navitem;
