var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _propTypes=_interopRequireDefault(require("prop-types"));var _useSMSContext2=_interopRequireDefault(require("../context/useSMSContext"));var SelectVisibilityWrapper=function SelectVisibilityWrapper(_ref){var children=_ref.children;var _useSMSContext=(0,_useSMSContext2.default)(),selectIsVisible=_useSMSContext.selectIsVisible;return selectIsVisible?children:null;};SelectVisibilityWrapper.propTypes={children:_propTypes.default.element.isRequired};var _default=SelectVisibilityWrapper;exports.default=_default;