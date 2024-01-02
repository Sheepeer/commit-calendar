import * as React from "react";
import { useEffect, useState } from "react";
import "./style.css";
import * as dayjs from "dayjs";
import Tip from "./tip";
import { DEFAULT_OPTIONS, MONTHES, WEEKS } from "./enums";
import { getColor, handleDateSource } from "./utils";

export type IDate = string | number | Date | dayjs.Dayjs;

export type DataSource = Array<{
  date: IDate;
  count: number;
}>;

interface LabelStyles {
  color?: string;
  fontSize?: string;
}

interface ItemStyles {
  bgColor?: string;
  borderColor?: string;
  borderRadius?: string;
}

export interface RangeItem {
  bgColor: Array<string>;
  borderColor: Array<string>;
  minCount: Array<number>;
}

interface CalendarProps {
  dataSource: DataSource;
  year?: string; // 2023-01-01
  options?: {
    weekLabelStyles?: LabelStyles;
    monthLabelStyles?: LabelStyles;
    itemStyles?: ItemStyles;
    range?: RangeItem;
    footer?: {
      bottomTip?: React.ReactNode;
      lessText?: string;
      moreText?: string;
    };
  };
}

const Calendar = ({
  dataSource,
  year = "2023-01-01",
  options = {},
}: // options = DEFAULT_OPTIONS,
CalendarProps) => {
  const { weekLabelStyles, monthLabelStyles, itemStyles, range, footer } =
    options;

  const { bottomTip, lessText, moreText } = footer || {};

  const [dates, setDates] = useState([[], [], [], [], [], [], []]);
  const [headers, setHeaders] = useState([]);

  const getDateArr = () => {
    const dateSrc = handleDateSource(dataSource);

    const _dates: Array<Array<[number, number] | [number, number, number]>> = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ];

    const startDate = dayjs(year).startOf("year");
    const endDate = dayjs(year).endOf("year");

    let currDate = startDate;

    while (currDate.unix() < endDate.unix()) {
      const weekIndex = currDate.get("day"); // 0:Sun, 1:Mon, ..., 6:Sat
      const month = currDate.get("month");
      const day = currDate.get("date");

      const itemWithCount = dateSrc.find(
        ({ w, m, d }) => w === weekIndex && m === month && d === day
      );

      if (itemWithCount) {
        _dates[weekIndex].push([month, day, itemWithCount.count]);
      } else {
        _dates[weekIndex].push([month, day]);
      }

      currDate = currDate.add(1, "day");
    }

    for (let itemArr of _dates) {
      const [month, day] = itemArr[0];
      if (day > _dates[6][0][1]) {
        // [0, 0]则不渲染
        itemArr.unshift([0, 0]);
      }
    }
    setDates(_dates);

    const singleLine = _dates[6].map((item) => item[0]);
    const _headers = new Map();
    let j = -1;
    for (let i = 0; i < singleLine.length; i++) {
      if (singleLine[i] !== singleLine[i + 1]) {
        _headers.set(singleLine[i], i - j);
        j = i;
      }
    }

    setHeaders(Array.from(_headers));
  };

  useEffect(() => {
    getDateArr();
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="week-labels-wrapper">
          {WEEKS.map((item, index) => {
            if (index % 3 !== 0) {
              return <div key={item} className="week-label"></div>;
            } else {
              return (
                <div
                  key={item}
                  className="week-label"
                  style={{
                    color: weekLabelStyles?.color ?? "#212121",
                    fontSize: weekLabelStyles?.fontSize ?? "12px",
                  }}
                >
                  {item}
                </div>
              );
            }
          })}
        </div>

        <table style={{ position: "relative" }}>
          <thead>
            <tr className="table-thead-tr">
              {headers.map(([week, count]: any) => (
                <th
                  key={week}
                  colSpan={count}
                  className="table-thead-th"
                  style={{
                    color: monthLabelStyles?.color ?? "#212121",
                    fontSize: monthLabelStyles?.fontSize ?? "12px",
                  }}
                >
                  {MONTHES[week]}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {dates.map((cols, index) => (
              <tr key={index}>
                {cols.map(([month, day, count], index) => {
                  if (day) {
                    return (
                      <td
                        key={index}
                        style={{
                          backgroundColor:
                            itemStyles?.bgColor ?? "rgb(248, 248, 248)",
                          border: `solid 1px ${
                            itemStyles?.borderColor ?? "rgb(228, 228, 228)"
                          }`,
                          borderRadius: itemStyles?.borderRadius ?? "2px",
                        }}
                        // className={`table-tbody-td table-tbody-td-${getColor(
                        //   count
                        // )}`}
                      >
                        <Tip
                          message={`${month + 1}.${day}${
                            count ? `, count is ${count}` : ""
                          }`}
                        >
                          <div className="table-tbody-td-div"></div>
                        </Tip>
                      </td>
                    );
                  } else {
                    return <td key={index} />;
                  }
                })}
              </tr>
            ))}
          </tbody>

          {!!footer && (
            <div className="footer">
              <div className="footer-tip">{bottomTip}</div>

              <div className="footer-legent-wrapper">
                {lessText}
                <div className="footer-legent-item"></div>
                {moreText}
              </div>
            </div>
          )}
        </table>
      </div>

      {/* <div className="footer">
        <div className="footer-tip">{bottomTip}</div>

        <div>
          {lessText}
          <div></div>
          {moreText}
        </div>
      </div> */}
    </>
  );
};

export default Calendar;
