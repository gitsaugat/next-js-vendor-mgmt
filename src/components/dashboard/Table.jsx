"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BiEdit, BiSearch } from "react-icons/bi";
import Modal from "./Modal";
import { ArrowDownOnSquareIcon } from "@heroicons/react/20/solid";

export default function SortedTable({
  title,
  headers,
  data,
  keys,
  detailKey,
  detailUrl,
  showPagination = false,
}) {
  const router = useRouter();
  const [tableData, setTableData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [open, setOpen] = useState(false);
  const [showFields, setShowFields] = useState(keys); // Initialize with all keys

  function updateTableData(data, sortConfig) {
    if (data) {
      let sortedData = [...data]; // Create a copy of the original data

      if (sortConfig.key !== null) {
        sortedData.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        });
      }

      setTableData(sortedData); // Store as array of dictionaries
    }
  }

  const handleSort = (header) => {
    const key = header;
    let direction = "ascending";

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  };

  useEffect(() => {
    updateTableData(
      data.filter((d) => d != "none"),
      sortConfig
    );
  }, [data, keys, sortConfig]);

  return (
    <>
      {tableData && (
        <div className="bg-white rounded-sm shadow-lg px-4 sm:px-6 lg:px-8 mt-4 ">
          <div className="sm:flex sm:items-center ">
            <div className="sm:flex-auto ">
              <h1 className="text-base font-semibold leading-6 text-gray-900 text-left p-4">
                {title}
              </h1>
            </div>
            <input
              type="text"
              placeholder="Search"
              className="border pl-3 pr-3 rounded-sm "
            />
            <button className="ml-1 p-1 bg-blue-500 rounded-sm text-white">
              <BiSearch />
            </button>
            <button
              className="ml-1 p-1 bg-blue-500 rounded-sm text-white"
              onClick={() => setOpen(!open)}
            >
              <BiEdit />
            </button>
          </div>
          <div className="mt-2 flow-roo max-h-92 overflow-scroll">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      {showFields.map((h) => (
                        <th
                          scope="col"
                          key={h}
                          onClick={() => handleSort(h)}
                          className="cursor-pointer py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                        >
                          {h.toUpperCase()}
                          {sortConfig.key === h ? (
                            sortConfig.direction === "ascending" ? (
                              <span> ▲</span>
                            ) : (
                              <span> ▼</span>
                            )
                          ) : null}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {tableData?.map((row) => (
                      <tr
                        key={row[detailKey]}
                        onClick={() =>
                          router.push(`${detailUrl}/${row[detailKey]}`)
                        }
                        className="even:bg-gray-50"
                      >
                        {showFields.map((field) => (
                          <td
                            key={field}
                            className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          >
                            {row[field]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {showPagination && (
                  <div className="float-end py-3">
                    <a className="hover:bg-gray-300 text-gray-800 bg-white shadow-lg py-2 px-4 rounded-xs text-xs cursor-pointer">
                      Previous
                    </a>
                    <a className="hover:bg-gray-300 text-gray-800 bg-white shadow-lg py-2 px-4 rounded-xs text-xs cursor-pointer">
                      Next
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Modal open={open} setOpen={setOpen}>
            <h3>Select Fields To Display</h3>
            {keys.map((key) => (
              <div className="grid grid-cols-2" key={key}>
                <label className="text-xl text-black text-left">
                  {key.replace(/_/g, " ")}
                </label>
                <input
                  type="checkbox"
                  checked={showFields.includes(key)}
                  onChange={() => {
                    setShowFields((prev) =>
                      prev.includes(key)
                        ? prev.filter((val) => val !== key)
                        : [...prev, key]
                    );
                  }}
                />
              </div>
            ))}
          </Modal>
        </div>
      )}
    </>
  );
}
