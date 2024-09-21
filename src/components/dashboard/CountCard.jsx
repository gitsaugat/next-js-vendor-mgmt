import React from "react";
import CountUp from "react-countup";

const CountCard = ({ title, value, Icon, color }) => {
  return (
    <div
      key={Math.random()}
      class="flex items-center justify-between bg-white shadow-lg rounded-lg p-4 max-w-sm"
    >
      <div class={`bg-${color}-500 text-white p-3 rounded-full `}>
        {<Icon />}
      </div>

      <div class="text-right">
        <h2 class="text-xl font-bold text-gray-700">
          <CountUp end={value} />
        </h2>
        <p class="text-gray-500">{title}</p>
      </div>
    </div>
  );
};

export default CountCard;
