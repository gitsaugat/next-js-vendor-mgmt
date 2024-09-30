import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PieChart = ({ chart_data, title }) => {
  const [chart, setChart] = useState();

  useEffect(() => {
    setChart(chart_data);
  }, []);

  return (
    chart && (
      <div className="rounded overflow-hidden justify-center mt-4 ">
        <div className="">
          <div className="p-3">
            <p className="text-lg text-center">{title}</p>
          </div>
          {typeof window !== "undefined" && chart && (
            <Chart
              options={chart.options}
              series={chart.series}
              type="pie"
              height={"140%"}
            />
          )}
        </div>
      </div>
    )
  );
};

export default PieChart;
