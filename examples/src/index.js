import React from "react";
import Calendar from "../../src";
import { render } from "react-dom";

const dates = [
  { date: "2023-01-02", count: 3 },
  { date: "2023-01-03", count: 3 },
  { date: "2023-01-22", count: 5 },
  { date: "2023-02-01", count: 10 },
  { date: "2023-02-02", count: 1 },
];

const App = () => {
  return <Calendar dataSource={dates} />;
};

render(<App />, document.getElementById("root"));
