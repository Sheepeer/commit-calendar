import * as React from "react";
import { useState } from "react";
import "./style.css";

interface TipProps {
  message: string;
  children: React.ReactNode;
}

const Tip = ({ message, children }: TipProps) => {
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
