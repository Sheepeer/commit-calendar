import React, { useState } from "react";
import "./style.css";

const Tip = ({ message, children }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="tip-wrapper">
      <div
        className="tip-childen"
        onMouseOver={() => setShow(true)}
        onMouseOut={() => setShow(false)}
      >
        {children}
      </div>
      <div className="tip-content" style={{ opacity: Number(show) }}>
        {message}
      </div>
    </div>
  );
};

export default Tip;
