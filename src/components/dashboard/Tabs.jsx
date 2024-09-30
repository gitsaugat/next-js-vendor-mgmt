import { useEffect, useState } from "react";
import LineChart from "./Charts/LineChart";
import BarChart from "./Charts/BarChart";
import CardContainer from "./CardContainer";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ tabs }) {
  const [tabsData, setTabsData] = useState([]);
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    setTabsData(tabs);
    setActiveTab(tabs.find((tab) => tab.current) || tabs[0]); // Set the default active tab
  }, [tabs]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    tabsData.length > 0 && (
      <div className="min-h-full rounded-lg ">
        <div className="sm:block ">
          <nav aria-label="Tabs" className="flex space-x-4 mt-2">
            {tabsData.map((tab) => (
              <a
                key={tab.name}
                onClick={(e) => {
                  e.preventDefault();
                  handleTabClick(tab);
                }}
                href={tab.href}
                aria-current={tab === activeTab ? "page" : undefined}
                className={classNames(
                  tab === activeTab
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-500 hover:text-gray-700",
                  "rounded-md px-3 py-2 text-sm font-medium"
                )}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
        <div className="">
          <LineChart chart_data={activeTab.props} />
        </div>
      </div>
    )
  );
}
