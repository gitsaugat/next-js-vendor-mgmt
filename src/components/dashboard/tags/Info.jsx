"use client";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Info({ key, initials, href, name, bgColor, members }) {
  return (
    <div key={key} className="col-span-1 flex rounded-md shadow-sm">
      <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-l    border-b border-r border-t border-gray-200 bg-white">
        <div className="flex-1 truncate px-4 py-2 text-sm">
          <a
            href={href}
            className="font-medium text-gray-900 hover:text-gray-600"
          >
            {name}
          </a>
          <p className="text-gray-500">{members}</p>
        </div>
      </div>
    </div>
  );
}