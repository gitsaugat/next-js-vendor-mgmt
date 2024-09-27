const createBarChartData = (series, categories) => {
  return {
    options: {
      chart: {
        width: "1000px",
        id: "basic-bar",
      },
      xaxis: {
        categories: categories,
      },
    },
    series: series,
  };
};

const createDonutChartData = (data, seriesName, categories) => {
  return {
    options: {
      chart: {
        width: "1000px",
        type: "donut",
      },
    },
    chartOptions: {
      labels: categories,
    },
    series: data,
  };
};

export { createBarChartData, createDonutChartData };
