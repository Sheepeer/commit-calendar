"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
require("./style.css");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _tip = _interopRequireDefault(require("./tip"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var getColor = function getColor(count) {
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
var Calendar = function Calendar(_ref) {
  var dataSource = _ref.dataSource;
  var rows = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var cols = ["Mon", "Tues", "Thur", "Wen", "Fri", "Sat", "Sun"];
  var _useState = (0, _react.useState)([[], [], [], [], [], [], []]),
    _useState2 = _slicedToArray(_useState, 2),
    dates = _useState2[0],
    setDates = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    headers = _useState4[0],
    setHeaders = _useState4[1];
  var handleDateSource = function handleDateSource() {
    if (Array.isArray(dataSource) && dataSource.length > 0) {
      return dataSource.map(function (_ref2) {
        var date = _ref2.date,
          count = _ref2.count;
        var w = (0, _dayjs["default"])(date).get("day");
        var m = (0, _dayjs["default"])(date).get("month");
        var d = (0, _dayjs["default"])(date).get("date");
        return {
          date: date,
          count: count,
          w: w,
          m: m,
          d: d
        };
      });
    }
  };
  var getDateArr = function getDateArr() {
    var dateSrc = handleDateSource();
    var _dates = [[], [], [], [], [], [], []];
    var startDate = (0, _dayjs["default"])().startOf("year");
    var endDate = (0, _dayjs["default"])().endOf("year");
    var currDate = startDate;
    var _loop = function _loop() {
      var weekIndex = currDate.get("day"); // 0:Sun, 1:Mon, ..., 6:Sat
      var month = currDate.get("month");
      var day = currDate.get("date");
      var itemWithCount = dateSrc.find(function (_ref3) {
        var w = _ref3.w,
          m = _ref3.m,
          d = _ref3.d;
        return w === weekIndex && m === month && d === day;
      });
      if (itemWithCount) {
        _dates[weekIndex].push([month, day, itemWithCount.count]);
      } else {
        _dates[weekIndex].push([month, day]);
      }
      currDate = currDate.add(1, "day");
    };
    while (currDate.unix() < endDate.unix()) {
      _loop();
    }
    setDates(_dates);
    var singleLine = _dates[6].map(function (item) {
      return item[0];
    });
    var _headers = new Map();
    var j = -1;
    for (var i = 0; i < singleLine.length; i++) {
      if (singleLine[i] !== singleLine[i + 1]) {
        _headers.set(singleLine[i], i - j);
        j = i;
      }
    }
    setHeaders(_headers);
  };
  (0, _react.useEffect)(function () {
    getDateArr();
  }, []);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "wrapper"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "week-labels-wrapper"
  }, cols.map(function (item, index) {
    if (index % 3 !== 0) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "week-label"
      });
    } else {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "week-label"
      }, item);
    }
  })), /*#__PURE__*/_react["default"].createElement("table", null, /*#__PURE__*/_react["default"].createElement("thead", null, /*#__PURE__*/_react["default"].createElement("tr", {
    className: "table-thead-tr"
  }, Array.from(headers).map(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
      week = _ref5[0],
      count = _ref5[1];
    return /*#__PURE__*/_react["default"].createElement("th", {
      colSpan: count,
      className: "table-thead-th"
    }, rows[week]);
  }))), /*#__PURE__*/_react["default"].createElement("tbody", null, dates.map(function (cols) {
    return /*#__PURE__*/_react["default"].createElement("tr", null, cols.map(function (_ref6) {
      var _ref7 = _slicedToArray(_ref6, 3),
        month = _ref7[0],
        day = _ref7[1],
        count = _ref7[2];
      return /*#__PURE__*/_react["default"].createElement("td", {
        className: "table-tbody-td table-tbody-td-".concat(getColor(count))
      }, /*#__PURE__*/_react["default"].createElement(_tip["default"], {
        message: "".concat(month + 1, "\u6708").concat(day, "\u65E5").concat(count ? "\uFF0C\u6570\u91CF\uFF1A".concat(count) : "")
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "table-tbody-td-div"
      })));
    }));
  }))));
};
var _default = exports["default"] = Calendar;