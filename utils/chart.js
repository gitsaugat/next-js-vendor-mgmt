const createBarChartData = (series, categories) => {
  return {
    options: {
      chart: {
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
