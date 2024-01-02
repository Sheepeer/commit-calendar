import * as React from "react";
import { ReactNode } from "react";

interface Props {
  title: string;
  bg: "dark" | "light";
  children: ReactNode;
}

const DemoWrapper = ({ title, bg, children }: Props) => {
  return (
    <div>
      <h2>{title}</h2>
      <div
        style={{
          padding: "24px",
          borderRadius: "2px",
          backgroundColor: bg === "dark" ? "#222222" : "#ffffff",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default DemoWrapper;
