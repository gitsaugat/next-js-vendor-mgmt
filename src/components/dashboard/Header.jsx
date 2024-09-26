import React from "react";

function convertUnderscoreToSpace(label) {
  return label.replace(/_/g, " ");
}

const Header = ({ title, split = false }) => {
  return (
    <p className="text-gray-500 text-xl font-bold m-2">
      {split ? convertUnderscoreToSpace(title) : title}
    </p>
  );
};

export default Header;
