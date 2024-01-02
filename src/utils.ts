import { DataSource, IDate, RangeItem } from ".";
import * as dayjs from "dayjs";

export const getItemStyle = (
  defaultBg: string,
  defaultBorder: string,
  range: RangeItem,
  count?: number
) => {
  const { bgColor, borderColor, minCount } = range;
  const length = minCount.length;

  if (!count) {
    return {
      backgroundColor: defaultBg,
      borderColor: defaultBorder,
    };
  }
  if (count < minCount[0]) {
    return {
      backgroundColor: bgColor[0],
      borderColor: borderColor[0],
    };
  }
  if (count > minCount[length - 1]) {
    return {
      backgroundColor: bgColor[length - 1],
      borderColor: borderColor[length - 1],
    };
  }
  for (let i = 0; i <= length - 1; ) {
    if (count > minCount[i] && count <= minCount[i + 1]) {
      return {
        backgroundColor: bgColor[i],
        borderColor: borderColor[i],
      };
    } else {
      i++;
    }
  }
};

export const getLegent = (range: RangeItem) => {
  const { bgColor, borderColor } = range;
  return bgColor.map((item, index) => ({
    backgroundColor: item,
    borderColor: borderColor[index],
  }));
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
