const createBarChartData = (series, categories) => {
  return {
    options: {
      chart: {
        width: "100%",
        id: "li",
      },
      xaxis: {
        categories: categories,
      },
    },
    series: series,
  };
};

const createDonutChartData = (series, labels) => {
  return {
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
    series: series,
  };
};

export { createBarChartData, createDonutChartData };
