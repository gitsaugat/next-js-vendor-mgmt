import React from "react";

function convertUnderscoreToSpace(label) {
  return label.replace(/_/g, " ");
}

const Header = ({ title, split = false, font = "text-xl" }) => {
  return (
    <p className={`text-gray-500 ${font} font-bold m-2`}>
      {split ? convertUnderscoreToSpace(title) : title}
    </p>
  );
};

export default Header;
