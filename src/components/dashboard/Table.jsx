"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

  function updateTableData(data, sortConfig) {
    if (data) {
      let arr = data.map((d) => {
        const row = [];
        keys.forEach((k) => {
          row.push(d[k]);
        });
        return row;
      });

      if (sortConfig.key !== null) {
        arr = arr.sort((a, b) => {
          const keyIndex = keys.indexOf(sortConfig.key);
          if (a[keyIndex] < b[keyIndex]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[keyIndex] > b[keyIndex]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        });
      }

      setTableData(arr);
    }
  }

  const handleSort = (header) => {
    const key = keys[headers.indexOf(header)];
    let direction = "ascending";

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  };

  useEffect(() => {
    updateTableData(data, sortConfig);
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
          </div>
          <div className="mt-2 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      {headers &&
                        headers.map((h) => (
                          <th
                            scope="col"
                            key={h}
                            onClick={() => handleSort(h)}
                            className="cursor-pointer py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                          >
                            {h}
                            {sortConfig.key === keys[headers.indexOf(h)] ? (
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
                    {tableData &&
                      tableData.map((row, rowIndex) => (
                        <tr
                          onClick={() => {
                            router.push(`${detailUrl}/${row[detailKey]}`);
                          }}
                          key={rowIndex}
                          className="even:bg-gray-50"
                        >
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                            >
                              {cell}
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
        </div>
      )}
    </>
  );
}
