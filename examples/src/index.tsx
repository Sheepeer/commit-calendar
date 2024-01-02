import * as React from "react";
import Calendar from "../../src";
import { createRoot } from "react-dom/client";
import "./style.css";
import DemoWrapper from "./demo-wrapper";

const dates = [
  { date: "2023-01-01", count: 2 },
  { date: "2023-01-02", count: 2 },
  { date: "2023-02-03", count: 1 },
  { date: "2023-05-11", count: 5 },
  { date: "2023-07-20", count: 10 },
  { date: "2023-09-10", count: 4 },
  { date: "2023-11-27", count: 3 },
];

const options = {
  range: {
    bgColor: ["lightpink", "pink", "brown"],
    borderColor: ["lightpink", "pink", "brown"],
    minCount: [0, 5, 10],
  },
  footer: {
    bottomTip: <a>Show something</a>,
    lessText: "less",
    moreText: "more",
  },
};

const App = () => {
  return (
    <div className="eg-root">
      <h1>Example for commit calendar</h1>

      <DemoWrapper title="Basic usage" bg="light">
        <Calendar dataSource={dates} />
      </DemoWrapper>

      <DemoWrapper title="Basic usage with footer" bg="light">
        <Calendar dataSource={dates} options={options} />
      </DemoWrapper>

      <DemoWrapper title="Use calendar with dark theme" bg="dark">
        <Calendar
          dataSource={dates}
          options={{
            weekLabelStyles: {
              color: "#808080",
            },
            monthLabelStyles: {
              color: "#b5b5b5",
            },
            itemStyles: {
              bgColor: "rgb(36, 36, 36)",
              borderColor: "rgb(83, 83, 83)",
            },
          }}
        />
      </DemoWrapper>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
