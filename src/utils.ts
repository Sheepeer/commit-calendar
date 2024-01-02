import { DataSource, IDate, RangeItem } from ".";
import * as dayjs from "dayjs";

export const getColor = (count: number, range: RangeItem) => {
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

export const getItemStyle = (
  defaultBg: string,
  defaultBorder: string,
  range: {
    bgColor: Array<string>;
    borderColor: Array<string>;
    minCount: Array<number>;
  }
) => {
  const { bgColor, borderColor, minCount } = range;
  
};

export const handleDateSource = (
  dataSource: DataSource
): Array<{
  date: IDate;
  count: number;
  w: number;
  m: number;
  d: number;
}> => {
  if (Array.isArray(dataSource) && dataSource.length > 0) {
    return dataSource.map(({ date, count }) => {
      const w = dayjs(date).get("day");
      const m = dayjs(date).get("month");
      const d = dayjs(date).get("date");
      return { date, count, w, m, d };
    });
  }
  return [];
};
