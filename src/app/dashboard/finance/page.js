"use client";
import Dashboard from "@/components/dashboard/Dashboard";
import React from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { AiFillBank } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { BiMoney } from "react-icons/bi";
import { BiNote } from "react-icons/bi";
import CountCard from "@/components/dashboard/CountCard";

const data = [
  {
    name: "Total Clients",
    count: 100,
    icon: BsFillPeopleFill,
    color: "blue",
  },
  {
    name: "Overdue Invoices",
    count: 1500,
    icon: BiNote,
    color: "red",
  },
  {
    name: "Overdue Invoices Amount",
    count: "$20",
    icon: AiFillDollarCircle,
    color: "red",
  },
  {
    name: "Clients (Overdue Invoice)",
    count: 210,
    icon: BsFillPeopleFill,
    color: "red",
  },
  {
    name: "Total Unbooked Transactions",
    count: 250,
    icon: AiFillBank,
    color: "yellow",
  },
  {
    name: "Unbooked Transactions Amount",
    count: "$1000",
    icon: AiFillDollarCircle,
    color: "yellow",
  },
  {
    name: "Clients (Unbooked Transactions)",
    count: 100,
    icon: BsFillPeopleFill,
    color: "yellow",
  },
];

const page = () => {
  return (
    <Dashboard>
      <div className="grid grid-cols-4 gap-4">
        {data.map((d) => (
          <CountCard
            title={d.name}
            value={d.count}
            Icon={d.icon}
            color={d.color}
          />
        ))}
      </div>
      <div class="rounded overflow-hidden shadow-lg bg-white mt-4">
        <div class="bg-blue-500 text-white font-bold text-lg px-6 py-4">
          Overdue Invoices Buckets
        </div>
        <div className="rounded overflow-scroll bg-white shadow-lg">
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th class="py-3 px-4 text-left bg-gray-100 font-semibold text-gray-800 border-b">
                    0-10 Days Invoice
                  </th>
                  <th class="py-3 px-4 text-left bg-gray-100 font-semibold text-gray-800 border-b">
                    11-20 Days Invoice
                  </th>
                  <th class="py-3 px-4 text-left bg-gray-100 font-semibold text-gray-800 border-b">
                    21-30 Days Invoice
                  </th>
                  <th class="py-3 px-4 text-left bg-gray-100 font-semibold text-gray-800 border-b">
                    31-60 Days Invoice
                  </th>
                  <th class="py-3 px-4 text-left bg-gray-100 font-semibold text-gray-800 border-b">
                    60+ Days Invoice
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-3 px-4 border-b">{"4($12000)"}</td>
                  <td class="py-3 px-4 border-b">{"2($1000)"}</td>
                  <td class="py-3 px-4 border-b">{"4($6000)"}</td>
                  <td class="py-3 px-4 border-b">{"1($4000)"}</td>
                  <td class="py-3 px-4 border-b">{"4($4500)"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <div class=" rounded overflow-hidden shadow-lg bg-white">
          <div class="bg-red-500 text-white font-bold text-lg px-6 py-4">
            Overdue Details
          </div>
          <div className="rounded overflow-scroll bg-white shadow-lg">
            <div class="overflow-x-auto">
              <table class="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th class="py-3 px-4 text-left bg-gray-100 font-semibold text-gray-800 border-b">
                      Name
                    </th>
                    <th class="py-3 px-4 text-left bg-gray-100 font-semibold text-gray-800 border-b">
                      Code
                    </th>
                    <th class="py-3 px-4 text-left bg-gray-100 font-semibold text-gray-800 border-b">
                      Transactions
                    </th>
                    <th class="py-3 px-4 text-left bg-gray-100 font-semibold text-gray-800 border-b">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="py-3 px-4 border-b">{"4($12000)"}</td>
                    <td class="py-3 px-4 border-b">{"2($1000)"}</td>
                    <td class="py-3 px-4 border-b">{"4($6000)"}</td>
                    <td class="py-3 px-4 border-b">{"1($4000)"}</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 border-b">{"4($12000)"}</td>
                    <td class="py-3 px-4 border-b">{"2($1000)"}</td>
                    <td class="py-3 px-4 border-b">{"4($6000)"}</td>
                    <td class="py-3 px-4 border-b">{"1($4000)"}</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 border-b">{"4($12000)"}</td>
                    <td class="py-3 px-4 border-b">{"2($1000)"}</td>
                    <td class="py-3 px-4 border-b">{"4($6000)"}</td>
                    <td class="py-3 px-4 border-b">{"1($4000)"}</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 border-b">{"4($12000)"}</td>
                    <td class="py-3 px-4 border-b">{"2($1000)"}</td>
                    <td class="py-3 px-4 border-b">{"4($6000)"}</td>
                    <td class="py-3 px-4 border-b">{"1($4000)"}</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 border-b">{"4($12000)"}</td>
                    <td class="py-3 px-4 border-b">{"2($1000)"}</td>
                    <td class="py-3 px-4 border-b">{"4($6000)"}</td>
                    <td class="py-3 px-4 border-b">{"1($4000)"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class=" rounded overflow-hidden shadow-lg bg-white">
          <div class="bg-yellow-500 text-white font-bold text-lg px-6 py-4">
            Unbooked Transactions Details
          </div>
          <div className="rounded overflow-scroll bg-white shadow-lg">
            <div class="overflow-x-auto">
              <table class="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th class="py-3 px-4 text-left bg-gray-100 font-semibold text-gray-800 border-b">
                      Name
                    </th>
                    <th class="py-3 px-4 text-left bg-gray-100 font-semibold text-gray-800 border-b">
                      Code
                    </th>
                    <th class="py-3 px-4 text-left bg-gray-100 font-semibold text-gray-800 border-b">
                      Transactions
                    </th>
                    <th class="py-3 px-4 text-left bg-gray-100 font-semibold text-gray-800 border-b">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="py-3 px-4 border-b">{"4($12000)"}</td>
                    <td class="py-3 px-4 border-b">{"2($1000)"}</td>
                    <td class="py-3 px-4 border-b">{"4($6000)"}</td>
                    <td class="py-3 px-4 border-b">{"1($4000)"}</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 border-b">{"4($12000)"}</td>
                    <td class="py-3 px-4 border-b">{"2($1000)"}</td>
                    <td class="py-3 px-4 border-b">{"4($6000)"}</td>
                    <td class="py-3 px-4 border-b">{"1($4000)"}</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 border-b">{"4($12000)"}</td>
                    <td class="py-3 px-4 border-b">{"2($1000)"}</td>
                    <td class="py-3 px-4 border-b">{"4($6000)"}</td>
                    <td class="py-3 px-4 border-b">{"1($4000)"}</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 border-b">{"4($12000)"}</td>
                    <td class="py-3 px-4 border-b">{"2($1000)"}</td>
                    <td class="py-3 px-4 border-b">{"4($6000)"}</td>
                    <td class="py-3 px-4 border-b">{"1($4000)"}</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 border-b">{"4($12000)"}</td>
                    <td class="py-3 px-4 border-b">{"2($1000)"}</td>
                    <td class="py-3 px-4 border-b">{"4($6000)"}</td>
                    <td class="py-3 px-4 border-b">{"1($4000)"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default page;
