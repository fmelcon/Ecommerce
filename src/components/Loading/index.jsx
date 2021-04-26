import React from "react";
import { RingLoader } from "react-spinners";
import "./styles.scss";
const Loading = () => {
  return (
    <div className="loader">
      <RingLoader size={60} color="#5e19ae" />
    </div>
  );
};

export default Loading;
