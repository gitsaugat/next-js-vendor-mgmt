import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PieChart = ({ chart_data }) => {
  const [chart, setChart] = useState();

  useEffect(() => {
    setChart(chart_data);
  }, []);

  return (
    <div className="rounded overflow-hidden shadow-lg bg-white flex justify-center mt-4 ">
      <div className="">
        <div className="p-3">
          <p className="text-lg text-center">Overdue Bucket Invoices</p>
        </div>
        {typeof window !== "undefined" && chart && (
          <Chart
            options={chart.options}
            series={chart.series}
            type="donut"
            width="500"
          />
        )}
      </div>
    </div>
  );
};

export default PieChart;
