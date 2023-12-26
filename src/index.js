import React, { useEffect, useState } from "react";
import "./style.css";
import dayjs from "dayjs";
import Tip from "./tip";
import { MONTHES, WEEKS } from "./enums";

const getColor = (count) => {
  if (count <= 0) {
    return "none";
  } else if (count > 0 && count <= 1) {
    return "low";
  } else if (count <= 3) {
    return "middle";
  } else if (count <= 5) {
    return "high";
  } else if (count > 5) {
    return "super";
  }
};

const Calendar = ({ dataSource }) => {
  const [dates, setDates] = useState([[], [], [], [], [], [], []]);
  const [headers, setHeaders] = useState([]);

  const handleDateSource = () => {
    if (Array.isArray(dataSource) && dataSource.length > 0) {
      return dataSource.map(({ date, count }) => {
        const w = dayjs(date).get("day");
        const m = dayjs(date).get("month");
        const d = dayjs(date).get("date");
        return { date, count, w, m, d };
      });
    }
  };

  const getDateArr = () => {
    const dateSrc = handleDateSource();

    const _dates = [[], [], [], [], [], [], []];

    const startDate = dayjs("2020-01-01").startOf("year");
    const endDate = dayjs("2020-01-01").endOf("year");
    console.log(startDate, endDate);

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
        itemArr.unshift([undefined, undefined]);
      }
    }
    setDates(_dates);
    console.log(_dates);

    const singleLine = _dates[6].map((item) => item[0]);
    const _headers = new Map();
    let j = -1;
    for (let i = 0; i < singleLine.length; i++) {
      if (singleLine[i] !== singleLine[i + 1]) {
        _headers.set(singleLine[i], i - j);
        j = i;
      }
    }

    setHeaders(_headers);
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
            {Array.from(headers).map(([week, count]) => (
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
