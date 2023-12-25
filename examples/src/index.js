import React from "react";
import Calendar from "../../src";
import { render } from "react-dom";
import "./style.css";

const dates = [
  { date: "2023-01-01", count: 2 },
  { date: "2023-01-02", count: 2 },
  { date: "2023-02-03", count: 1 },
  { date: "2023-05-11", count: 5 },
  { date: "2023-07-20", count: 10 },
  { date: "2023-09-10", count: 4 },
  { date: "2023-11-27", count: 3 },
];

const App = () => {
  return (
    <div className="eg-root">
      <h1>Example for commit calendar</h1>
      <Calendar dataSource={dates} />
    </div>
  );
};

render(<App />, document.getElementById("root"));
