import React from "react";
import CountUp from "react-countup";

const CountCard = ({ title, value, Icon, color }) => {
  return (
    color && (
      <div
        key={Math.random()}
        className="flex items-center justify-between bg-red shadow-lg rounded-lg p-4 max-w-sm"
      >
        <div className={`${color} text-2xl text-white-300  p-3 rounded-full`}>
          <Icon />
        </div>

        <div className="text-right">
          <h2 className="text-xl font-bold text-gray-700">
            <CountUp end={value} />
          </h2>
          <p className="text-gray-500">{title}</p>
        </div>
      </div>
    )
  );
};

export default CountCard;
