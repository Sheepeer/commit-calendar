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

## Props List

name | meaning | type
dataSource | | Array<{ date: any, count:number }>

## Todo
[] enable choosing year
[] enable customizing color

## Change Log
v1.0.0 2023-12-25
- Finish basic commit-calendar component and publish to npmjs.com