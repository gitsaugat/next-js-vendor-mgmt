"use client";
import React, { useEffect, useState } from "react";

const Grid = ({ className, children }) => {
  return className && <div className={className}>{children}</div>;
};

export default Grid;
