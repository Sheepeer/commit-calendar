import * as React from "react";
import { useEffect, useState } from "react";
import "./style.css";
import * as dayjs from "dayjs";
import Tip from "./tip";
import { MONTHES, WEEKS } from "./enums";
import { getItemStyle, getLegent, handleDateSource } from "./utils";

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
  options: {
    weekLabelStyles?: LabelStyles;
    monthLabelStyles?: LabelStyles;
    itemStyles?: ItemStyles;
    range: RangeItem;
    footer?: {
      bottomTip?: React.ReactNode;
      lessText?: string;
      moreText?: string;
      lessTextColor?: string;
      moreTextColor?: string;
    };
  };
  year?: string; // 2023-01-01
}

const Calendar = ({
  dataSource,
  options,
  year = "2023-01-01",
}: CalendarProps) => {
  const { weekLabelStyles, monthLabelStyles, itemStyles, range, footer } =
    options;
  const {
    bgColor = "rgb(248, 248, 248)",
    borderColor = "rgb(228, 228, 228)",
    borderRadius = "2px",
  } = itemStyles || {};

  const { bottomTip, lessText, moreText, lessTextColor, moreTextColor } =
    footer || {};

  const [dates, setDates] = useState<
    Array<
      Array<{
        month: number;
        day: number;
        count?: number;
        styles?: { backgroundColor: string; borderColor: string };
      }>
    >
  >([[], [], [], [], [], [], []]);
  const [headers, setHeaders] = useState([]);

  const getDateArr = () => {
    const dateSrc = handleDateSource(dataSource);

    const _dates: Array<
      Array<{
        month: number;
        day: number;
        styles?: { backgroundColor: string; borderColor: string };
        count?: number;
      }>
    > = [[], [], [], [], [], [], []];

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
        _dates[weekIndex].push({
          month,
          day,
          count: itemWithCount.count,
          styles: getItemStyle(
            bgColor,
            borderColor,
            range,
            itemWithCount.count
          ),
        });
      } else {
        _dates[weekIndex].push({
          month,
          day,
          styles: getItemStyle(bgColor, borderColor, range),
        });
      }

      currDate = currDate.add(1, "day");
    }

    for (let itemArr of _dates) {
      const { month, day } = itemArr[0];
      if (day > _dates[6][0].day) {
        // { month: 0, day: 0 }则不渲染
        itemArr.unshift({ month: 0, day: 0 });
      }
    }
    setDates(_dates);

    const singleLine = _dates[6].map((item) => item.month);
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

      <table
        className={`table-wrapper ${!!footer && "table-wrapper-with-footer"}`}
      >
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
              {cols.map(({ month, day, count, styles }, index) => {
                if (day) {
                  return (
                    <td
                      key={index}
                      style={{
                        backgroundColor: bgColor,
                        border: `solid 1px ${borderColor}`,
                        borderRadius: borderRadius,
                        ...styles,
                      }}
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
              <span style={{ color: lessTextColor }}>{lessText}</span>
              {getLegent(range).map((styles, index) => (
                <div
                  key={index}
                  className="footer-legent-item"
                  style={{ ...styles, borderRadius: borderRadius }}
                ></div>
              ))}
              <span style={{ color: moreTextColor }}>{moreText}</span>
            </div>
          </div>
        )}
      </table>
    </div>
  );
};

export default Calendar;
