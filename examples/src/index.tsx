import * as React from "react";
import Calendar from "../../src";
import { createRoot } from "react-dom/client";
import "./style.css";
import DemoWrapper from "./demo-wrapper";
import { dates } from "./enums";

const App = () => {
  return (
    <div className="eg-root">
      <h1>Example for commit calendar</h1>

      <DemoWrapper
        title="Basic usage"
        bg="light"
        code={`
        <Calendar
          dataSource={dates}
          options={{
            range: {
              bgColor: ["#ffe9ec", "#ffb7c0", "#ff7b8a", "#ff223b"],
              borderColor: ["#ffdce1", "#ffa1ac", "#ff6274", "#ff0e2a"],
              minCount: [0, 3, 6, 10],
            },
          }}
        />
      `}
      >
        <Calendar
          dataSource={dates}
          options={{
            range: {
              bgColor: ["#ffe9ec", "#ffb7c0", "#ff7b8a", "#ff223b"],
              borderColor: ["#ffdce1", "#ffa1ac", "#ff6274", "#ff0e2a"],
              minCount: [0, 3, 6, 10],
            },
          }}
        />
      </DemoWrapper>

      <DemoWrapper
        title="Basic usage with footer"
        bg="light"
        code={`
        <Calendar
          dataSource={dates}
          options={{
            range: {
              bgColor: ["#ffe9ec", "#ffb7c0", "#ff7b8a", "#ff223b"],
              borderColor: ["#ffdce1", "#ffa1ac", "#ff6274", "#ff0e2a"],
              minCount: [0, 3, 6, 10],
            },
            footer: {
              bottomTip: <a>Show something</a>,
              lessText: "less",
              moreText: "more",
              lessTextColor: "#9b9b9b",
              moreTextColor: "#9b9b9b",
            },
          }}
        />
      `}
      >
        <Calendar
          dataSource={dates}
          options={{
            range: {
              bgColor: ["#ffe9ec", "#ffb7c0", "#ff7b8a", "#ff223b"],
              borderColor: ["#ffdce1", "#ffa1ac", "#ff6274", "#ff0e2a"],
              minCount: [0, 3, 6, 10],
            },
            footer: {
              bottomTip: <a>Show something</a>,
              lessText: "less",
              moreText: "more",
              lessTextColor: "#9b9b9b",
              moreTextColor: "#9b9b9b",
            },
          }}
        />
      </DemoWrapper>

      <DemoWrapper
        title="Use calendar with dark theme"
        bg="dark"
        code={`
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
            range: {
              bgColor: ["#4c4546", "#745a5e", "#a25c67", "#b11e34"],
              borderColor: ["#6c6062", "#9b7a7f", "#c5707c", "#d23950"],
              minCount: [0, 3, 6, 10],
            },
            footer: {
              bottomTip: (
                <a style={{ color: "#8c8c8c" }}>
                  This is a calendar with dark type
                </a>
              ),
              lessText: "less",
              moreText: "more",
              lessTextColor: "#8c8c8c",
              moreTextColor: "#8c8c8c",
            },
          }}
        />
      `}
      >
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
            range: {
              bgColor: ["#4c4546", "#745a5e", "#a25c67", "#b11e34"],
              borderColor: ["#6c6062", "#9b7a7f", "#c5707c", "#d23950"],
              minCount: [0, 3, 6, 10],
            },
            footer: {
              bottomTip: (
                <a style={{ color: "#8c8c8c" }}>
                  This is a calendar with dark type
                </a>
              ),
              lessText: "less",
              moreText: "more",
              lessTextColor: "#8c8c8c",
              moreTextColor: "#8c8c8c",
            },
          }}
        />
      </DemoWrapper>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
