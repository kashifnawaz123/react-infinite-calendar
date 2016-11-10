import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';
var style = {
	'root': 'Cal__Header__root',
	'blank': 'Cal__Header__blank',
	'wrapper': 'Cal__Header__wrapper',
	'landscape': 'Cal__Header__landscape',
	'dateWrapper': 'Cal__Header__dateWrapper',
	'day': 'Cal__Header__day',
	'active': 'Cal__Header__active',
	'year': 'Cal__Header__year',
	'date': 'Cal__Header__date'
};
var animation = {
	'enter': 'Cal__Animation__enter',
	'enterActive': 'Cal__Animation__enterActive',
	'leave': 'Cal__Animation__leave',
	'leaveActive': 'Cal__Animation__leaveActive'
};

var Header = function (_Component) {
	_inherits(Header, _Component);

	function Header() {
		_classCallCheck(this, Header);

		return _possibleConstructorReturn(this, (Header.__proto__ || _Object$getPrototypeOf(Header)).apply(this, arguments));
	}

	_createClass(Header, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps) {
			return shallowCompare(this, nextProps);
		}
	}, {
		key: 'render',
		value: function render() {
			var _classNames;

			var _props = this.props,
			    display = _props.display,
			    layout = _props.layout,
			    locale = _props.locale,
			    scrollToDate = _props.scrollToDate,
			    selectedDate = _props.selectedDate,
			    setDisplay = _props.setDisplay,
			    shouldHeaderAnimate = _props.shouldHeaderAnimate,
			    theme = _props.theme;

			var values = selectedDate && [{
				item: 'year',
				value: selectedDate.year(),
				active: display === 'years',
				title: display === 'days' ? 'Change year' : null,
				handleClick: function handleClick(e) {
					e && e.stopPropagation();
					setDisplay('years');
				}
			}, {
				item: 'day',
				key: selectedDate.format('YYYYMMDD'),
				value: selectedDate.format(locale.headerFormat),
				active: display === 'days',
				title: display === 'days' ? 'Scroll to ' + selectedDate.format(locale.headerFormat) : null,
				handleClick: function handleClick(e) {
					e && e.stopPropagation();

					if (display !== 'days') {
						setDisplay('days');
					} else if (selectedDate) {
						scrollToDate(selectedDate, -40);
					}
				}
			}];

			return React.createElement(
				'div',
				{ className: classNames(style.root, (_classNames = {}, _defineProperty(_classNames, style.blank, !selectedDate), _defineProperty(_classNames, style.landscape, layout == 'landscape'), _classNames)), style: theme && { backgroundColor: theme.headerColor, color: theme.textColor.active } },
				selectedDate ? React.createElement(
					'div',
					{ className: style.wrapper, 'aria-label': selectedDate.format(locale.headerFormat + ' YYYY') },
					values.map(function (_ref) {
						var handleClick = _ref.handleClick,
						    item = _ref.item,
						    key = _ref.key,
						    value = _ref.value,
						    active = _ref.active,
						    title = _ref.title;

						return React.createElement(
							'div',
							{ key: item, className: classNames(style.dateWrapper, style[item], _defineProperty({}, style.active, active)), title: title },
							React.createElement(
								ReactCSSTransitionGroup,
								{ transitionName: animation, transitionEnterTimeout: 250, transitionLeaveTimeout: 250, transitionEnter: shouldHeaderAnimate, transitionLeave: shouldHeaderAnimate },
								React.createElement(
									'span',
									{ key: item + '-' + (key || value), className: style.date, 'aria-hidden': true, onClick: handleClick },
									value
								)
							)
						);
					})
				) : React.createElement(
					'div',
					{ className: style.wrapper },
					locale.blank
				)
			);
		}
	}]);

	return Header;
}(Component);

Header.propTypes = {
	layout: PropTypes.string,
	locale: PropTypes.object,
	onClick: PropTypes.func,
	selectedDate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
	shouldHeaderAnimate: PropTypes.bool,
	theme: PropTypes.object,
	display: PropTypes.string
};
export default Header;