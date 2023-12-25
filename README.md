# commit-calendar

## Introduce

A calendar which is like github commit calendar, but the data to be displayed is decided by yourself.

## Quick Start

### install

```
npm install commit-calendar
```

### example

You can use this in your react project like this:

```
const Page = () => {
  const data = [
    { date: '2023-01-01', count: 2 },
    { date: '2023-01-02', count: 2 },
    { date: '2023-02-03', count: 1 },
    { date: '2023-05-11', count: 5 },
    { date: '2023-07-20', count: 10 },
    { date: '2023-09-10', count: 4 },
    { date: '2023-11-27', count: 3 },
  ]
  return (
    <>
      <!-- other codes -->
      <CommitCalendar dataSource={data} />
      <!-- other codes -->
    </>
  )
}
```
Then you will see the calendar:
![image](https://github.com/Sheepeer/commit-calendar/assets/78125933/bc118ab7-7b50-4c40-bb3f-76f547120da8)

## Props List

| name | meaning | type |
| ------ | -------- | -------- |
| dataSource | Array containing date and count | Array<{ date: any, count:number }>

## Todo
- [ ] enable choosing year
- [ ] enable customizing color
- [ ] supporting different locale

## Change Log
v1.0.0 2023-12-25
- :guitar: Finish basic commit-calendar component and publish to npmjs.com
