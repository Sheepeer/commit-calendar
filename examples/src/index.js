import React from "react";
import Calendar from "../../src";
import { render } from "react-dom";
import './style.css'

const dates = [
  { date: "2023-01-02", count: 3 },
  { date: "2023-01-03", count: 3 },
  { date: "2023-01-22", count: 5 },
  { date: "2023-02-01", count: 10 },
  { date: "2023-02-02", count: 1 },
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
