import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import CardContainer from "../CardContainer";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineChart = ({ chart_data, title }) => {
  const [chart, setChart] = useState();

  useEffect(() => {
    setChart(chart_data);
    console.log(chart);
  }, [chart_data]);

  return (
    chart && (
      <div className="rounded overflow-hidden bg-white mt-4 p-5 h-full w-full">
        <div className="">
          <div className="p-3">
            <p className="text-lg text-center">{title}</p>
          </div>
          {typeof window !== "undefined" && chart && (
            <Chart
              options={chart?.options}
              series={chart?.series}
              type="area"
            />
          )}
        </div>
      </div>
    )
  );
};

export default LineChart;
