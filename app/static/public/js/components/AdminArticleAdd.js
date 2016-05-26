"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AdminArticleAdd = (function (_React$Component) {
    _inherits(AdminArticleAdd, _React$Component);

    function AdminArticleAdd(props) {
        _classCallCheck(this, AdminArticleAdd);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(AdminArticleAdd).call(this, props));
    }

    _createClass(AdminArticleAdd, [{
        key: "render",
        value: function render() {
            var _props = this.props;
            var csrfToken = _props.csrfToken;
            var article = _props.article;

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "form",
                    { action: "/admin/article/save/", method: "post" },
                    _react2.default.createElement("input", { type: "hidden", name: "_csrf", value: csrfToken }),
                    _react2.default.createElement("input", { type: "checkbox", name: "status", value: article.status, checked: article.status }),
                    "Status",
                    _react2.default.createElement("br", null),
                    "Title: ",
                    _react2.default.createElement("input", { type: "text", name: "title", value: article.title }),
                    _react2.default.createElement("br", null),
                    "Slug: ",
                    _react2.default.createElement("input", { type: "text", name: "slug", value: article.slug }),
                    _react2.default.createElement("br", null),
                    "Content: ",
                    _react2.default.createElement("input", { type: "text", name: "content", value: article.content }),
                    _react2.default.createElement("br", null),
                    "Description: ",
                    _react2.default.createElement("input", { type: "text", name: "description", value: article.description }),
                    _react2.default.createElement("br", null),
                    "Tags: ",
                    _react2.default.createElement("input", { type: "text", name: "tags", value: article.tags }),
                    _react2.default.createElement("br", null),
                    this.renderUpdate.call(this)
                ),
                this.renderRemove.call(this)
            );
        }
    }, {
        key: "renderUpdate",
        value: function renderUpdate() {
            var article = this.props.article;

            if (article._id) {
                return _react2.default.createElement(
                    "div",
                    null,
                    "Author: ",
                    article.author.username,
                    _react2.default.createElement("br", null),
                    _react2.default.createElement("input", { type: "hidden", name: "author", value: article.author._id.toString() }),
                    _react2.default.createElement("input", { type: "submit", value: "Update" })
                );
            }
            return _react2.default.createElement("input", { type: "submit", value: "Submit" });
        }
    }, {
        key: "renderRemove",
        value: function renderRemove() {
            var _props2 = this.props;
            var csrfToken = _props2.csrfToken;
            var article = _props2.article;

            if (article._id) {
                return _react2.default.createElement(
                    "form",
                    { action: "/admin/article/remove/", method: "post" },
                    _react2.default.createElement("input", { type: "hidden", name: "_csrf", value: csrfToken }),
                    _react2.default.createElement("input", { type: "hidden", name: "_id", value: article._id.toString() }),
                    _react2.default.createElement("input", { type: "submit", value: "Remove" })
                );
            }
            return null;
        }
    }]);

    return AdminArticleAdd;
})(_react2.default.Component);

module.exports = AdminArticleAdd;