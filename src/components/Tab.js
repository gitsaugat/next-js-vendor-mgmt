import { useEffect, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavTabs({ tabs, children }) {
  const [cardTabs, setCardTabs] = useState();
  const [activeTab, setActiveTab] = useState();
  useEffect(() => {
    setCardTabs(tabs);
    if (cardTabs) {
      setActiveTab(cardTabs.find((tab) => tab.current) || tabs[0]);
    }
  }, []);

  return (
    cardTabs &&
    activeTab && (
      <div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav aria-label="Tabs" className="-mb-px flex space-x-8">
              {cardTabs.map((tab) => (
                <a
                  key={tab.name}
                  onClick={() => {
                    setActiveTab(tab);
                    tab.func(tab.value);
                  }}
                  aria-current={activeTab.name == tab.name}
                  className={classNames(
                    activeTab.name == tab.name
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium"
                  )}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
        <br />
        {children}
      </div>
    )
  );
}
