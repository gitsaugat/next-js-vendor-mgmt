import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const BarChart = ({ chart_data, title }) => {
  const [chart, setChart] = useState();

  useEffect(() => {
    setChart(chart_data);
    console.log(chart_data, "chart data");
  }, [chart_data]);

  return (
    chart && (
      <div className="rounded overflow-hidden  bg-white  h-full w-full">
        <div className="">
          <div className="p-3">
            <p className="text-lg text-center">{title}</p>
          </div>
          {typeof window !== "undefined" && chart && (
            <Chart options={chart?.options} series={chart?.series} type="bar" />
          )}
        </div>
      </div>
    )
  );
};

export default BarChart;
