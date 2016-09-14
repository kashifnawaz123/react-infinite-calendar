'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Day = require('../Day');

var _Day2 = _interopRequireDefault(_Day);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
	'root': 'Cal__Month__root',
	'row': 'Cal__Month__row',
	'partial': 'Cal__Month__partial',
	'label': 'Cal__Month__label',
	'partialFirstRow': 'Cal__Month__partialFirstRow'
};

var Month = function (_Component) {
	(0, _inherits3.default)(Month, _Component);

	function Month() {
		(0, _classCallCheck3.default)(this, Month);
		return (0, _possibleConstructorReturn3.default)(this, (Month.__proto__ || (0, _getPrototypeOf2.default)(Month)).apply(this, arguments));
	}

	(0, _createClass3.default)(Month, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps) {
			return !nextProps.isScrolling && !this.props.isScrolling;
		}
	}, {
		key: 'renderRows',
		value: function renderRows() {
			var _props = this.props;
			var disabledDates = _props.disabledDates;
			var disabledDays = _props.disabledDays;
			var displayDate = _props.displayDate;
			var locale = _props.locale;
			var maxDate = _props.maxDate;
			var minDate = _props.minDate;
			var onDaySelect = _props.onDaySelect;
			var rowHeight = _props.rowHeight;
			var rows = _props.rows;
			var selectedDate = _props.selectedDate;
			var today = _props.today;
			var theme = _props.theme;

			var currentYear = today.date.year();
			var monthShort = displayDate.format('MMM');
			var monthRows = [];
			var day = 0;
			var isDisabled = false;
			var isSelected = false;
			var isToday = false;
			var row = void 0,
			    date = void 0,
			    days = void 0;

			// Oh the things we do in the name of performance...
			for (var i = 0, len = rows.length; i < len; i++) {
				row = rows[i];
				days = [];

				for (var k = 0, _len = row.length; k < _len; k++) {
					date = row[k];
					day++;

					isSelected = selectedDate && date.yyyymmdd == selectedDate.yyyymmdd;
					isToday = today && date.yyyymmdd == today.yyyymmdd;
					isDisabled = minDate && date.yyyymmdd < minDate.yyyymmdd || maxDate && date.yyyymmdd > maxDate.yyyymmdd || disabledDays && disabledDays.length && disabledDays.indexOf(date.date.day()) !== -1 || disabledDates && disabledDates.length && disabledDates.indexOf(date.yyyymmdd) !== -1;

					days[k] = _react2.default.createElement(_Day2.default, {
						key: 'day-' + day,
						currentYear: currentYear,
						date: date,
						day: day,
						handleDayClick: onDaySelect,
						isDisabled: isDisabled,
						isToday: isToday,
						isSelected: isSelected,
						locale: locale,
						monthShort: monthShort,
						theme: theme
					});
				}
				monthRows[i] = _react2.default.createElement(
					'ul',
					{ className: (0, _classnames2.default)(style.row, (0, _defineProperty3.default)({}, style.partial, row.length !== 7)), style: { height: rowHeight }, key: 'Row-' + i, role: 'row', 'aria-label': 'Week ' + (i + 1) },
					days
				);
			}

			return monthRows;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props;
			var displayDate = _props2.displayDate;
			var today = _props2.today;
			var rows = _props2.rows;
			var showOverlay = _props2.showOverlay;
			var theme = _props2.theme;


			return _react2.default.createElement(
				'div',
				{ className: style.root },
				_react2.default.createElement(
					'div',
					{ className: style.rows },
					this.renderRows()
				),
				showOverlay && _react2.default.createElement(
					'label',
					{ className: (0, _classnames2.default)(style.label, (0, _defineProperty3.default)({}, style.partialFirstRow, rows[0].length !== 7)), style: theme && theme.overlayColor && { backgroundColor: theme.overlayColor } },
					_react2.default.createElement(
						'span',
						null,
						'' + displayDate.format('MMMM') + (!displayDate.isSame(today.date, 'year') ? ' ' + displayDate.year() : '')
					)
				)
			);
		}
	}]);
	return Month;
}(_react.Component);

exports.default = Month;