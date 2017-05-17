'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RunKit = function (_React$Component) {
  _inherits(RunKit, _React$Component);

  function RunKit() {
    _classCallCheck(this, RunKit);

    var _this = _possibleConstructorReturn(this, (RunKit.__proto__ || Object.getPrototypeOf(RunKit)).call(this));

    _this.state = {};
    return _this;
  }

  _createClass(RunKit, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var script = document.createElement('script');
      script.src = 'https://embed.runkit.com';
      document.head.appendChild(script);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var runComponentDidMount2 = true;
      if (this.myNB !== undefined) {
        if (this.state.readOnly !== this.props.readOnly || this.state.nodeVersion !== this.props.nodeVersion || this.state.env !== this.props.env || this.state.title !== this.props.title || this.state.minHeight !== (this.props.minHeight || '130') || this.state.packageResolutionTimestamp !== this.props.packageResolutionTimestamp || this.state.onLoad !== this.props.onLoad || this.state.onURLChanged !== this.props.onURLChanged || this.state.onEvaluate !== this.props.onEvaluate || this.state.autoEval !== this.props.autoEval === 'true') this.myDiv.innerHTML = '';else runComponentDidMount2 = false;
      }
      this.state.source = this.props.children;
      this.state.readOnly = this.props.readOnly;
      this.state.nodeVersion = this.props.nodeVersion;
      this.state.env = this.props.env;
      this.state.title = this.props.title;
      this.state.minHeight = this.props.minHeight || '130';
      this.state.packageResolutionTimestamp = this.props.packageResolutionTimestamp;
      this.state.preamble = this.props.preamble || '';
      this.state.onLoad = this.props.onLoad;
      this.state.onURLChanged = this.props.onURLChanged;
      this.state.onEvaluate = this.props.onEvaluate;
      this.state.autoEval = this.props.autoEval === 'true';
      if (runComponentDidMount2) this.componentDidMount2();else {
        this.myNB.setSource(this.state.source);
        this.myNB.setPreamble(this.state.preamble);
        if (this.state.autoEval) this.myNB.evaluate();
      }
      return _react2.default.createElement('div', { ref: function ref(div) {
          return _this2.myDiv = div;
        } });
    }
  }, {
    key: 'componentDidMount2',
    value: function componentDidMount2(param) {
      // This hack exists because, for some reason, window.RunKit doesn't exist
      // when componentDidMount gets called. I don't know why.
      // FIXME
      if (param === undefined) param = this;
      if (param === undefined) {
        setTimeout(this.componentDidMount2, 100, this);
      } else if (window.RunKit === undefined) {
        setTimeout(param.componentDidMount2, 100, param);
      } else {
        param.myNB = window.RunKit.createNotebook({
          element: param.myDiv,
          source: param.state.source,
          readOnly: param.state.readOnly,
          nodeVersion: param.state.nodeVersion,
          env: param.state.env,
          title: param.state.title,
          minHeight: param.state.minHeight,
          packageResolutionTimestamp: param.state.packageResolutionTimestamp,
          preamble: param.state.preamble,
          onLoad: param.state.autoEval ? function (nb) {
            nb.evaluate();
            param.state.onLoad(nb);
          } : function (nb) {
            return param.state.onLoad(nb);
          },
          onURLChanged: function onURLChanged(nb) {
            return param.state.onURLChanged(nb);
          },
          onEvaluate: function onEvaluate(nb) {
            return param.state.onEvaluate(nb);
          }
        });
      }
    }
  }]);

  return RunKit;
}(_react2.default.Component);

exports.default = RunKit;
