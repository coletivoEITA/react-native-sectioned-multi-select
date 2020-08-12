var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var React=_interopRequireWildcard(require("react"));var _reactNative=require("react-native");var _helpers=require("../helpers");var _=require("../../");var _this=this,_jsxFileName="/Users/renrizzolo/Documents/websites/react-native-sectioned-multi-select/lib/components/Search.js";var Search=function Search(_ref){var searchAdornmentFromProps=_ref.searchAdornment,_ref$styles=_ref.styles,stylesFromProps=_ref$styles===void 0?{}:_ref$styles;var _useSMSContext=(0,_.useSMSContext)(),hideSearch=_useSMSContext.hideSearch,components=_useSMSContext.components,searchPlaceholderText=_useSMSContext.searchPlaceholderText,searchTextFont=_useSMSContext.searchTextFont,searchAdornment=_useSMSContext.searchAdornment,autoFocus=_useSMSContext.autoFocus,searchTerm=_useSMSContext.searchTerm,setSearchTerm=_useSMSContext.setSearchTerm,_submitSelection=_useSMSContext._submitSelection,colors=_useSMSContext.colors,getStyles=_useSMSContext.getStyles,styles=_useSMSContext.styles,renderItems=_useSMSContext.renderItems;var searchStyleParams={searchTerm:searchTerm,resultsCount:renderItems.length};var searchBarStyles=React.useMemo(function(){return getStyles('searchBar',searchStyleParams,stylesFromProps);},[stylesFromProps.searchBar,styles.searchBar,searchTerm,renderItems.length]);var searchTextInputStyles=React.useMemo(function(){return getStyles('searchTextInput',searchStyleParams,stylesFromProps);},[stylesFromProps.searchTextInput,styles.searchTextInput,searchTerm,renderItems.length]);var adornment=searchAdornmentFromProps?searchAdornmentFromProps:searchAdornment;return!hideSearch?React.createElement(_reactNative.View,{style:searchBarStyles,__self:_this,__source:{fileName:_jsxFileName,lineNumber:32,columnNumber:5}},React.createElement(_reactNative.View,{style:styles.center,__self:_this,__source:{fileName:_jsxFileName,lineNumber:35,columnNumber:7}},React.createElement(components.SearchIcon,{__self:_this,__source:{fileName:_jsxFileName,lineNumber:36,columnNumber:9}})),React.createElement(_reactNative.TextInput,{clearButtonMode:"while-editing",value:searchTerm,selectionColor:colors.searchSelection,onChangeText:function onChangeText(searchTerm){return setSearchTerm(searchTerm);},placeholder:searchPlaceholderText,autoFocus:autoFocus,selectTextOnFocus:true,placeholderTextColor:colors.searchPlaceholderText,underlineColorAndroid:"transparent",style:searchTextInputStyles,__self:_this,__source:{fileName:_jsxFileName,lineNumber:38,columnNumber:7}}),adornment&&adornment(searchTerm,setSearchTerm,_submitSelection)):null;};var _default=Search;exports.default=_default;