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
  const [tableData, setTableData] = useState();

  function updateTableData(data) {
    if (data) {
      const arr = [];
      data?.map((d) => {
        const row = [];
        keys?.map((k) => {
          row.push(d[k]);
        });
        arr.push(row);
      });
      setTableData(arr);
    }
  }
  useEffect(() => {
    updateTableData(data);
  }, [data, keys]);

  return (
    <>
      {tableData && (
        <div className="bg-white rounded-sm shadow-lg px-4 sm:px-6 lg:px-8 mt-4 ">
          <div className="sm:flex sm:items-center ">
            <div className="sm:flex-auto ">
              <h1 className=" text-base font-semibold leading-6 text-gray-900 text-left p-4">
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
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                          >
                            {h}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {tableData &&
                      tableData.map((h) => (
                        <tr
                          onClick={() => {
                            router.push(`${detailUrl}/${h[detailKey]}`);
                          }}
                          key={Math.random()}
                          className="even:bg-gray-50"
                        >
                          {h?.map((k) => (
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {k}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
                {showPagination && (
                  <div class="float-end py-3">
                    <a class=" hover:bg-gray-300 text-gray-800 bg-white shadow-lg py-2 px-4 rounded-xs text-xs cursor-pointer ">
                      Previous
                    </a>
                    <a class=" hover:bg-gray-300 text-gray-800 bg-white shadow-lg py-2 px-4 rounded-xs text-xs cursor-pointer">
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
