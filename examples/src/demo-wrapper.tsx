import * as React from "react";
import { ReactNode } from "react";

interface Props {
  title: string;
  bg: "dark" | "light";
  children: ReactNode;
  code: string;
}

const DemoWrapper = ({ title, bg, children, code }: Props) => {
  return (
    <div>
      <h2>{title}</h2>
      <div
        style={{
          padding: "24px",
          border: "1px solid #e5e5e5",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            marginBottom: "24px",
            borderRadius: "2px",
            backgroundColor: bg === "dark" ? "#222222" : "#ffffff",
          }}
        >
          {children}
        </div>
        <div
          style={{
            paddingTop: "24px",
            borderTop: "1px solid #e5e5e5",
          }}
        >
          {/* <div>{code}</div> */}
          <div style={{ padding: "12px", backgroundColor: "#f3f8ff",borderRadius:'4px' }}>
            <code style={{}}>{code}</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoWrapper;
