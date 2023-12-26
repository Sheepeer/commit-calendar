import * as React from "react";
import { useEffect, useState } from "react";
import "./style.css";
import * as dayjs from "dayjs";
import Tip from "./tip";
import { MONTHES, WEEKS } from "./enums";
import { getColor, handleDateSource } from "./utils";

export type IDate = string | number | Date | dayjs.Dayjs;

export type DataSource = Array<{
  date: IDate;
  count: number;
}>;

interface CalendarProps {
  dataSource: DataSource;
  year?: string; // 2023-01-01
}

const Calendar = ({ dataSource, year = '2023-01-01' }: CalendarProps) => {
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
    <div className="wrapper">
      <div className="week-labels-wrapper">
        {WEEKS.map((item, index) => {
          if (index % 3 !== 0) {
            return <div key={item} className="week-label"></div>;
          } else {
            return (
              <div key={item} className="week-label">
                {item}
              </div>
            );
          }
        })}
      </div>

      <table>
        <thead>
          <tr className="table-thead-tr">
            {headers.map(([week, count]: any) => (
              <th key={week} colSpan={count} className="table-thead-th">
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
                      className={`table-tbody-td table-tbody-td-${getColor(
                        count
                      )}`}
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
      </table>
    </div>
  );
};

export default Calendar;
