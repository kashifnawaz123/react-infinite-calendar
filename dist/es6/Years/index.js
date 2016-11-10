import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component, PropTypes } from 'react';
import { VirtualScroll } from 'react-virtualized';
import classNames from 'classnames';
import { keyCodes } from '../utils';
import moment from 'moment';
var style = {
    'root': 'Cal__Years__root',
    'list': 'Cal__Years__list',
    'center': 'Cal__Years__center',
    'year': 'Cal__Years__year',
    'active': 'Cal__Years__active',
    'currentYear': 'Cal__Years__currentYear'
};

var Years = function (_Component) {
    _inherits(Years, _Component);

    function Years(props) {
        _classCallCheck(this, Years);

        var _this = _possibleConstructorReturn(this, (Years.__proto__ || _Object$getPrototypeOf(Years)).call(this, props));

        _this.state = {
            selectedYear: props.selectedDate ? props.selectedDate.year() : moment().year()
        };
        return _this;
    }

    _createClass(Years, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var vs = this.refs.VirtualScroll;
            var grid = vs && vs.refs.Grid;

            this.scrollEl = grid && grid.refs.scrollingContainer;
        }
    }, {
        key: 'handleClick',
        value: function handleClick(year, e) {
            var _props = this.props,
                hideYearsOnSelect = _props.hideYearsOnSelect,
                scrollToDate = _props.scrollToDate,
                selectedDate = _props.selectedDate,
                setDisplay = _props.setDisplay;

            var date = selectedDate || moment();
            var newDate = date.clone().year(year);

            this.selectDate(newDate, e, !hideYearsOnSelect);
            scrollToDate(newDate, -40);

            if (hideYearsOnSelect) {
                setDisplay('days');
            }
        }
    }, {
        key: 'selectDate',
        value: function selectDate(date, e) {
            var updateState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
            var shouldHeaderAnimate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
            var _props2 = this.props,
                minDate = _props2.minDate,
                maxDate = _props2.maxDate,
                onDaySelect = _props2.onDaySelect;


            if (!date.isBefore(minDate, 'day') && !date.isAfter(maxDate, 'day')) {
                if (updateState) {
                    this.setState({
                        selectedYear: date.year()
                    });
                }

                onDaySelect(date, e, shouldHeaderAnimate);
            }
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            var _props3 = this.props,
                scrollToDate = _props3.scrollToDate,
                setDisplay = _props3.setDisplay,
                selectedDate = _props3.selectedDate;
            var selectedYear = this.state.selectedYear;

            var delta = 0;

            switch (e.keyCode) {
                case keyCodes.enter:
                case keyCodes.escape:
                    setDisplay('days');
                    scrollToDate(selectedDate || moment(selectedYear, 'YYYY'), -40);
                    return;
                case keyCodes.down:
                    delta = +1;
                    break;
                case keyCodes.up:
                    delta = -1;
                    break;
            }

            if (delta) {
                if (!selectedDate) selectedDate = moment().year(selectedYear);

                var newSelectedDate = selectedDate.clone().add(delta, 'year');
                this.selectDate(newSelectedDate, e);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props4 = this.props,
                height = _props4.height,
                selectedDate = _props4.selectedDate,
                theme = _props4.theme,
                width = _props4.width;
            var selectedYear = this.state.selectedYear;

            var currentYear = moment().year();
            var years = this.props.years.slice(0, this.props.years.length);
            // Add spacer rows at the top and bottom
            years.unshift(null);
            years.push(null);

            var selectedYearIndex = years.indexOf(selectedYear);
            var rowHeight = 50;
            var containerHeight = years.length * rowHeight < height + 50 ? years.length * rowHeight : height + 50;

            if (typeof width == 'string' && width.indexOf('%') !== -1) {
                width = window.innerWidth * parseInt(width.replace('%', ''), 10) / 100; // See https://github.com/bvaughn/react-virtualized/issues/229
            }

            return React.createElement(
                'div',
                {
                    className: style.root,
                    style: { color: theme.selectionColor, height: height + 50 }
                },
                React.createElement(VirtualScroll, {
                    ref: 'VirtualScroll',
                    className: style.list,
                    width: width,
                    height: containerHeight,
                    rowCount: years.length,
                    rowHeight: rowHeight,
                    scrollToIndex: selectedYearIndex + 1,
                    scrollToAlignment: 'center',
                    rowRenderer: function rowRenderer(_ref) {
                        var index = _ref.index;

                        var year = years[index];

                        if (year !== null) {
                            var _classNames;

                            var isActive = index == selectedYearIndex;

                            return React.createElement(
                                'div',
                                {
                                    className: classNames(style.year, (_classNames = {}, _defineProperty(_classNames, style.active, isActive), _defineProperty(_classNames, style.currentYear, year == currentYear), _classNames)),
                                    onClick: function onClick() {
                                        return _this2.handleClick(year);
                                    },
                                    title: 'Set year to ' + year,
                                    'data-year': year,
                                    style: { color: typeof theme.selectionColor == 'function' ? theme.selectionColor(selectedDate.clone().year(year)) : theme.selectionColor }
                                },
                                React.createElement(
                                    'span',
                                    { style: year == currentYear ? { borderColor: theme.todayColor } : null },
                                    year
                                )
                            );
                        } else {
                            return React.createElement('div', { className: style.spacer });
                        }
                    }
                })
            );
        }
    }]);

    return Years;
}(Component);

Years.propTypes = {
    height: PropTypes.number,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    hideYearsOnSelect: PropTypes.bool,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    onDaySelect: PropTypes.func,
    scrollToDate: PropTypes.func,
    selectedDate: PropTypes.object,
    setDisplay: PropTypes.func,
    theme: PropTypes.object,
    years: PropTypes.array
};
export default Years;