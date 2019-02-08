(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("phaser"));
	else if(typeof define === 'function' && define.amd)
		define(["phaser"], factory);
	else if(typeof exports === 'object')
		exports["NineSlice"] = factory(require("phaser"));
	else
		root["NineSlice"] = factory(root["Phaser"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_phaser__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/NineSlice.js":
/*!**************************!*\
  !*** ./src/NineSlice.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.EVENTS = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if (\"value\" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };\n\nvar _phaser = __webpack_require__(/*! phaser */ \"phaser\");\n\nvar _phaser2 = _interopRequireDefault(_phaser);\n\nvar _murmur = __webpack_require__(/*! ./murmur */ \"./src/murmur.js\");\n\nvar _murmur2 = _interopRequireDefault(_murmur);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar defaultSliceConfig = function defaultSliceConfig(sc) {\n  var defaulted = sc;\n  if (typeof defaulted.sourceLayout.width === 'number') {\n    // this means sourceLayout is a cornerconfig and should be used for all\n    // four corners\n    var _defaulted$sourceLayo = defaulted.sourceLayout,\n        width = _defaulted$sourceLayo.width,\n        height = _defaulted$sourceLayo.height;\n    // we only need to assign one fallback will handle the rest\n\n    defaulted.sourceLayout = { topLeft: { width: width, height: height } };\n  }\n  var sl = defaulted.sourceLayout;\n\n  sl.topRight = sl.topRight || sl.topLeft;\n  sl.bottomRight = sl.bottomRight || sl.topLeft;\n  sl.bottomLeft = sl.bottomLeft || sl.topLeft;\n\n  var maxTopHeight = Math.max(sl.topLeft.height, sl.topRight.height);\n  var maxRightWidth = Math.max(sl.topRight.width, sl.bottomRight.width);\n  var maxBottomHeight = Math.max(sl.bottomLeft.height, sl.bottomRight.height);\n  var maxLeftWidth = Math.max(sl.topLeft.width, sl.bottomLeft.width);\n\n  if (!defaulted.safeOffsets) {\n    defaulted.safeOffsets = {\n      top: maxTopHeight,\n      right: maxRightWidth,\n      bottom: maxBottomHeight,\n      left: maxLeftWidth\n    };\n  }\n\n  if (typeof defaulted.minSizing === 'undefined' || defaulted.minSizing !== false) {\n    var offsets = defaulted.safeOffsets;\n    defaulted.minSizing = {\n      width: offsets ? Math.max(offsets.left + offsets.right, maxLeftWidth + maxRightWidth) : maxLeftWidth + maxRightWidth,\n      height: offsets ? Math.max(offsets.top + offsets.bottom, maxTopHeight + maxBottomHeight) : maxTopHeight + maxBottomHeight\n    };\n  } else {\n    defaulted.minSizing = false;\n  }\n\n  return defaulted;\n};\n\nvar shortSliceLayout = function shortSliceLayout(sc) {\n  return {\n    tl: { x: sc.topLeft.width, y: sc.topLeft.height },\n    tr: { x: sc.topRight.width, y: sc.topRight.height },\n    bl: { x: sc.bottomLeft.width, y: sc.bottomLeft.height },\n    br: { x: sc.bottomRight.width, y: sc.bottomRight.height }\n  };\n};\n\nvar BASE = '__BASE';\nvar MISSING = '__MISSING';\n\nvar EVENTS = exports.EVENTS = {\n  UPDATE_SAFE_BOUNDS: 'updatesafebounds'\n};\n\nvar NineSlice = function (_Phaser$GameObjects$R) {\n  _inherits(NineSlice, _Phaser$GameObjects$R);\n\n  /**\r\n   * @param {Phaser.Scene} scene the parent scene for this NineSlice\r\n   * @param {SliceConfig} _sliceConfig specifies details of where we source\r\n   *    texture data and how the slice is laied out based on that texture.\r\n   * @param {PositionConfig} positionConfig describes positioning of the slice\r\n   *    in the scene. If unspecified x and y position will be 0 and the width\r\n   *    and height will be computed from the source texture.\r\n   */\n  function NineSlice(scene, _sliceConfig) {\n    var positionConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;\n\n    _classCallCheck(this, NineSlice);\n\n    var _this = _possibleConstructorReturn(this, (NineSlice.__proto__ || Object.getPrototypeOf(NineSlice)).call(this, scene, 0, 0, 32, 32));\n\n    _this.initFrames = _this.initFrames.bind(_this);\n    _this.getUsableBounds = _this.getUsableBounds.bind(_this);\n    _this.drawFrames = _this.drawFrames.bind(_this);\n    _this.resize = _this.resize.bind(_this);\n    _this.updateSafeBounds = _this.updateSafeBounds.bind(_this);\n    _this.enableDebugDraw = _this.enableDebugDraw.bind(_this);\n\n    _this.events = new _phaser2.default.Events.EventEmitter();\n    _this.sliceConfig = defaultSliceConfig(_sliceConfig);\n    _this._safeBounds = new _phaser2.default.Geom.Rectangle();\n\n    var _this$sliceConfig = _this.sliceConfig,\n        sourceKey = _this$sliceConfig.sourceKey,\n        sourceFrame = _this$sliceConfig.sourceFrame;\n\n    _this.sourceTex = scene.sys.textures.get(_this.sliceConfig.sourceKey);\n    if (!sourceKey) {\n      throw new Error('NineSlice requires a texture sourceKey to be specified.');\n    }\n    if (!_this.sourceTex || _this.sourceTex.key === MISSING) {\n      throw new Error('Expected source image ' + sourceKey + ' not found.');\n    }\n\n    // use this to reduce chance we'll overwrite an existing frame\n    _this._framePrefix = '' + (0, _murmur2.default)(JSON.stringify({ sourceKey: sourceKey, sourceFrame: sourceFrame }, 404));\n    // this constructs a namespaced frame name\n    _this.mkFrameName = function (n) {\n      return _this._framePrefix + '-' + n;\n    };\n    // store constructed frames so we have direct access to the frame for the\n    // specific corners\n    _this._frameCache = {};\n\n    var frameName = typeof sourceFrame === 'string' || typeof sourceFrame === 'number' ? sourceFrame : BASE;\n    _this.sourceFrame = _this.sourceTex.get(frameName);\n\n    // construct 9 frames for mortal men, doomed to die\n    _this.initFrames();\n\n    // We've gotten everything setup that is necessary for normal operation so\n    // we can unblock a bunch of the NineSlice specific stuff.\n    _this._initalized = true;\n\n    var x = positionConfig.x,\n        y = positionConfig.y,\n        width = positionConfig.width,\n        height = positionConfig.height;\n\n    _this.setPosition(x || 0, y || 0);\n    _this.resize(width || _this.sourceFrame.width, height || _this.sourceFrame.height);\n    _this.updateSafeBounds();\n    return _this;\n  }\n\n  _createClass(NineSlice, [{\n    key: 'updateSafeBounds',\n    value: function updateSafeBounds() {\n      if (!this._initalized) {\n        return;\n      }\n\n      var _sliceConfig$safeOffs = this.sliceConfig.safeOffsets,\n          top = _sliceConfig$safeOffs.top,\n          right = _sliceConfig$safeOffs.right,\n          bottom = _sliceConfig$safeOffs.bottom,\n          left = _sliceConfig$safeOffs.left;\n\n      var newX = this.x + left;\n      var newY = this.y + top;\n      var newW = this.width - (left + right);\n      var newH = this.height - (top + bottom);\n\n      var _safeBounds = this._safeBounds,\n          x = _safeBounds.x,\n          y = _safeBounds.y,\n          width = _safeBounds.width,\n          height = _safeBounds.height;\n\n      if (newX !== x || newY !== y || newW !== width || newH !== height) {\n        this._safeBounds.setTo(this.x + left, this.y + top, this.width - (left + right), this.height - (top + bottom));\n        this.events.emit(EVENTS.UPDATE_SAFE_BOUNDS, this, this._safeBounds);\n      }\n      if (this._g) {\n        this._g.lineStyle(1, 0x00ff00);\n        this._g.strokeRectShape(this._safeBounds);\n      }\n    }\n  }, {\n    key: 'resize',\n    value: function resize(_w, _h) {\n      var _ref = this.sliceConfig || {},\n          minSizing = _ref.minSizing;\n\n      var h = minSizing ? Math.max(minSizing.height, _h) : _h;\n      var w = minSizing ? Math.max(minSizing.width, _w) : _w;\n\n      if (h > _h || w > _w) {\n        var err = 'Attempted to set NineSlice size less than minimum (' + _w + 'x' + _h + ').';\n        // eslint-disable-next-line no-console\n        console.error(err);\n      }\n\n      _get(NineSlice.prototype.__proto__ || Object.getPrototypeOf(NineSlice.prototype), 'resize', this).call(this, w, h);\n      if (!this._initalized) {\n        return;\n      }\n\n      if (this._g) {\n        this._g.clear();\n      }\n      this.drawFrames();\n      this.updateSafeBounds();\n    }\n  }, {\n    key: 'initFrames',\n    value: function initFrames() {\n      var _this2 = this;\n\n      var tex = this.sourceTex;\n      var texW = this.sourceFrame.width;\n      var texH = this.sourceFrame.height;\n      var texX = this.sourceFrame.cutX;\n      var texY = this.sourceFrame.cutY;\n\n      var addFrame = function addFrame(_name, x, y, w, h) {\n        var name = _this2.mkFrameName(_name);\n        if (!tex.has(name)) {\n          _this2._frameCache[_name] = tex.add(name, 0, texX + x, texY + y, w, h);\n        } else {\n          _this2._frameCache[_name] = tex.frames[name];\n        }\n      };\n\n      var sl = shortSliceLayout(this.sliceConfig.sourceLayout);\n\n      addFrame('topLeft', 0, 0, sl.tl.x, sl.tl.y);\n      addFrame('topRight', texW - sl.tr.x, 0, sl.tr.x, sl.tr.y);\n      addFrame('bottomRight', texW - sl.br.x, texH - sl.br.y, sl.br.x, sl.br.y);\n      addFrame('bottomLeft', 0, texH - sl.bl.y, sl.bl.x, sl.bl.y);\n\n      addFrame('topMiddle', sl.tl.x, 0, texW - (sl.tl.x + sl.tr.x), Math.max(sl.tl.y, sl.tr.y));\n\n      addFrame('bottomMiddle', sl.bl.x, texH - Math.max(sl.bl.y, sl.br.y), texW - (sl.bl.x + sl.br.x), Math.max(sl.bl.y, sl.br.y));\n\n      addFrame('leftMiddle', 0, sl.tl.y, Math.max(sl.tl.x, sl.bl.x), texH - (sl.tl.y + sl.bl.y));\n\n      addFrame('rightMiddle', texW - Math.max(sl.tr.x, sl.br.x), sl.tr.y, Math.max(sl.tr.x, sl.br.x), texH - sl.tr.y - sl.br.y);\n\n      var cLeftX = Math.min(sl.tl.x, sl.bl.x);\n      var cTopY = Math.min(sl.tl.y, sl.tr.y);\n      addFrame('center', cLeftX, cTopY, texW - cLeftX - Math.min(sl.tr.x, sl.br.x), texH - cTopY - Math.min(sl.br.y, sl.bl.y));\n    }\n  }, {\n    key: 'getUsableBounds',\n    value: function getUsableBounds() {\n      if (!this._initalized) {\n        return null;\n      }\n\n      return this._safeBounds;\n    }\n  }, {\n    key: 'drawFrames',\n    value: function drawFrames() {\n      var _this3 = this;\n\n      if (!this._initalized) {\n        return;\n      }\n\n      if (this._g) {\n        this._g.lineStyle(1, 0xff0000);\n      }\n\n      var sl = shortSliceLayout(this.sliceConfig.sourceLayout);\n      var frame = this._frameCache;\n\n      var draw = function draw(curFrame, x, y, wantWidth, wantHeight) {\n        if (wantWidth > 0 && wantHeight > 0) {\n          if (_this3._g) {\n            _this3._g.strokeRect(_this3.x + x, _this3.y + y, wantWidth, wantHeight);\n          }\n\n          var frameImage = _this3.scene.make.image({\n            key: _this3.sourceTex.key,\n            frame: curFrame.name,\n            x: 0,\n            y: 0\n          });\n\n          var scaleX = wantWidth / curFrame.width;\n          var scaleY = wantHeight / curFrame.height;\n\n          frameImage.setOrigin(0).setScale(scaleX, scaleY);\n\n          _this3.draw(frameImage, x, y);\n          frameImage.destroy();\n        }\n      };\n\n      var minLeftX = Math.min(sl.tl.x, sl.bl.x);\n      var minRightX = Math.min(sl.tr.x, sl.br.x);\n\n      var minTopY = Math.min(sl.tl.y, sl.tr.y);\n      var minBottomY = Math.min(sl.bl.y, sl.br.y);\n\n      this.clear();\n\n      // first draw everything that needs to be scaled; this is more complicated\n      // than necessary because some fool (me) thought it was a good idea to\n      // support unique offsets per corner. 🤦\n      draw(frame.center, minLeftX, minTopY, this.width - minLeftX - minRightX, this.height - minTopY - minBottomY);\n      draw(frame.topMiddle, sl.tl.x, 0, this.width - sl.tl.x - sl.tr.x, frame.topMiddle.height);\n      draw(frame.bottomMiddle, sl.bl.x, this.height - frame.bottomMiddle.height, this.width - sl.bl.x - sl.br.x, frame.bottomMiddle.height);\n      draw(frame.leftMiddle, 0, sl.tl.y, frame.leftMiddle.width, this.height - sl.tl.y - sl.bl.y);\n      draw(frame.rightMiddle, this.width - sl.tr.x, sl.tr.y, frame.rightMiddle.width, this.height - sl.tr.y - sl.br.y);\n\n      // everything else since it's important that they draw atop other edges\n      draw(frame.topLeft, 0, 0, sl.tl.x, sl.tl.y);\n      draw(frame.topRight, this.width - sl.tr.x, 0, sl.tr.x, sl.tr.y);\n      draw(frame.bottomRight, this.width - sl.br.x, this.height - sl.br.y, sl.br.x, sl.br.y);\n      draw(frame.bottomLeft, 0, this.height - sl.bl.y, sl.bl.x, sl.bl.y);\n    }\n  }, {\n    key: 'enableDebugDraw',\n    value: function enableDebugDraw() {\n      var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;\n\n      if (this._g) {\n        this._g.clear();\n      }\n\n      if (enabled) {\n        this._g = this.scene.add.graphics(this.x, this.y);\n      } else {\n        this._g = null;\n      }\n      this.drawFrames();\n      this.updateSafeBounds();\n    }\n  }, {\n    key: 'y',\n    get: function get() {\n      return this._y;\n    },\n    set: function set(y) {\n      if (this._y !== y) {\n        if (this._g) {\n          this._g.clear();\n          this.drawFrames();\n        }\n        this._y = y;\n        this.updateSafeBounds();\n      }\n    }\n  }, {\n    key: 'x',\n    get: function get() {\n      return this._x;\n    },\n    set: function set(x) {\n      if (this._x !== x) {\n        if (this._g) {\n          this._g.clear();\n          this.drawFrames();\n        }\n        this._x = x;\n        this.updateSafeBounds();\n      }\n    }\n  }]);\n\n  return NineSlice;\n}(_phaser2.default.GameObjects.RenderTexture);\n\nexports.default = NineSlice;\n\n//# sourceURL=webpack://NineSlice/./src/NineSlice.js?");

/***/ }),

/***/ "./src/Plugin.js":
/*!***********************!*\
  !*** ./src/Plugin.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _phaser = __webpack_require__(/*! phaser */ \"phaser\");\n\nvar _phaser2 = _interopRequireDefault(_phaser);\n\nvar _NineSlice = __webpack_require__(/*! ./NineSlice */ \"./src/NineSlice.js\");\n\nvar _NineSlice2 = _interopRequireDefault(_NineSlice);\n\nvar _processOffsetsArray5 = __webpack_require__(/*! ./processOffsetsArray */ \"./src/processOffsetsArray.js\");\n\nvar _processOffsetsArray6 = _interopRequireDefault(_processOffsetsArray5);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Plugin = function (_Phaser$Plugins$BaseP) {\n  _inherits(Plugin, _Phaser$Plugins$BaseP);\n\n  function Plugin(mgr) {\n    _classCallCheck(this, Plugin);\n\n    var _this = _possibleConstructorReturn(this, (Plugin.__proto__ || Object.getPrototypeOf(Plugin)).call(this, mgr));\n\n    mgr.registerGameObject('nineslice', _this.addNineSlice, _this.makeNineSlice);\n    return _this;\n  }\n\n  _createClass(Plugin, [{\n    key: 'addNineSlice',\n    value: function addNineSlice() {\n      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n\n      var slice = mkNineSlice(this.scene, args);\n      this.displayList.add(slice);\n      return slice;\n    }\n  }, {\n    key: 'makeNineSlice',\n    value: function makeNineSlice() {\n      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n        args[_key2] = arguments[_key2];\n      }\n\n      return mkNineSlice(this.scene, args);\n    }\n  }]);\n\n  return Plugin;\n}(_phaser2.default.Plugins.BasePlugin);\n\nexports.default = Plugin;\n\n\nvar mkNineSlice = function mkNineSlice(scene, args) {\n  if (args.length === 2) {\n    return new _NineSlice2.default(scene, args[0], args[1]);\n  }\n\n  if (args.length < 6) {\n    throw new Error('Expected at least 6 arguments to NineSlice creator, received ' + args.length + '.');\n  }\n  if (args.length > 7) {\n    // eslint-disable-next-line no-console\n    console.error('Expected less than 7 arguments for NineSlice creation, received ' + args.length + '.');\n  }\n\n  var _args = _slicedToArray(args, 6),\n      x = _args[0],\n      y = _args[1],\n      width = _args[2],\n      height = _args[3],\n      keyCfg = _args[4],\n      offsetCfg = _args[5];\n\n  var sliceConfig = {};\n  var placement = { x: x, y: y, width: width, height: height\n\n    // extract the key and (optional) frame for the texture source\n  };if (typeof keyCfg === 'string') {\n    sliceConfig.sourceKey = keyCfg;\n  } else {\n    var key = keyCfg.key,\n        frame = keyCfg.frame;\n\n    sliceConfig.sourceKey = key;\n    if (typeof frame === 'string' || typeof frame === 'number') {\n      sliceConfig.sourceFrame = keyCfg.frame;\n    }\n  }\n\n  // extract the layout config\n  if (typeof offsetCfg === 'number') {\n    // it's a uniform offset for all corners\n    sliceConfig.sourceLayout = { width: offsetCfg, height: offsetCfg };\n  } else if (Array.isArray(offsetCfg)) {\n    var _processOffsetsArray = (0, _processOffsetsArray6.default)(offsetCfg),\n        _processOffsetsArray2 = _slicedToArray(_processOffsetsArray, 4),\n        top = _processOffsetsArray2[0],\n        right = _processOffsetsArray2[1],\n        bottom = _processOffsetsArray2[2],\n        left = _processOffsetsArray2[3];\n\n    sliceConfig.sourceLayout = {\n      topLeft: { width: left, height: top },\n      topRight: { width: right, height: top },\n      bottomRight: { width: right, height: bottom },\n      bottomLeft: { width: left, height: bottom }\n    };\n  } else {\n    // assume that we're dealing with { width, height }\n    sliceConfig.sourceLayout = offsetCfg;\n  }\n\n  if (args.length > 6) {\n    if (typeof args[6] === 'number') {\n      var n = args[6];\n      sliceConfig.safeOffsets = { top: n, right: n, bottom: n, left: n };\n    } else if (Array.isArray(args[6])) {\n      var _processOffsetsArray3 = (0, _processOffsetsArray6.default)(args[6]),\n          _processOffsetsArray4 = _slicedToArray(_processOffsetsArray3, 4),\n          _top = _processOffsetsArray4[0],\n          _right = _processOffsetsArray4[1],\n          _bottom = _processOffsetsArray4[2],\n          _left = _processOffsetsArray4[3];\n\n      sliceConfig.safeOffsets = { top: _top, right: _right, bottom: _bottom, left: _left };\n    } else {\n      throw new Error('Expected argument number or array for argument 7, got ' + _typeof(args[6]) + '.');\n    }\n  }\n\n  return new _NineSlice2.default(scene, sliceConfig, placement);\n};\n\nvar DefaultCfg = {\n  key: 'NineSlice',\n  plugin: Plugin,\n  start: true\n};\n\nPlugin.DefaultCfg = DefaultCfg;\n\n//# sourceURL=webpack://NineSlice/./src/Plugin.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _NineSlice = __webpack_require__(/*! ./NineSlice */ \"./src/NineSlice.js\");\n\nObject.defineProperty(exports, 'NineSlice', {\n  enumerable: true,\n  get: function get() {\n    return _interopRequireDefault(_NineSlice).default;\n  }\n});\nObject.defineProperty(exports, 'EVENTS', {\n  enumerable: true,\n  get: function get() {\n    return _NineSlice.EVENTS;\n  }\n});\n\nvar _Plugin = __webpack_require__(/*! ./Plugin */ \"./src/Plugin.js\");\n\nObject.defineProperty(exports, 'Plugin', {\n  enumerable: true,\n  get: function get() {\n    return _interopRequireDefault(_Plugin).default;\n  }\n});\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n//# sourceURL=webpack://NineSlice/./src/index.js?");

/***/ }),

/***/ "./src/murmur.js":
/*!***********************!*\
  !*** ./src/murmur.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n/**\r\n * JS Implementation of MurmurHash3 (r136) (as of May 20, 2011)\r\n *\r\n * @author <a href=\"mailto:gary.court@gmail.com\">Gary Court</a>\r\n * @see http://github.com/garycourt/murmurhash-js\r\n * @author <a href=\"mailto:aappleby@gmail.com\">Austin Appleby</a>\r\n * @see http://sites.google.com/site/murmurhash/\r\n *\r\n * @param {string} key ASCII only\r\n * @param {number} seed Positive integer only\r\n * @return {number} 32-bit positive integer hash\r\n */\n\nvar murmurhash3_32_gc = function murmurhash3_32_gc(key, seed) {\n  var remainder, bytes, h1, h1b, c1, c2, k1, i;\n\n  remainder = key.length & 3; // key.length % 4\n  bytes = key.length - remainder;\n  h1 = seed;\n  c1 = 0xcc9e2d51;\n  c2 = 0x1b873593;\n  i = 0;\n\n  while (i < bytes) {\n    k1 = key.charCodeAt(i) & 0xff | (key.charCodeAt(++i) & 0xff) << 8 | (key.charCodeAt(++i) & 0xff) << 16 | (key.charCodeAt(++i) & 0xff) << 24;\n    ++i;\n\n    k1 = (k1 & 0xffff) * c1 + (((k1 >>> 16) * c1 & 0xffff) << 16) & 0xffffffff;\n    k1 = k1 << 15 | k1 >>> 17;\n    k1 = (k1 & 0xffff) * c2 + (((k1 >>> 16) * c2 & 0xffff) << 16) & 0xffffffff;\n\n    h1 ^= k1;\n    h1 = h1 << 13 | h1 >>> 19;\n    h1b = (h1 & 0xffff) * 5 + (((h1 >>> 16) * 5 & 0xffff) << 16) & 0xffffffff;\n    h1 = (h1b & 0xffff) + 0x6b64 + (((h1b >>> 16) + 0xe654 & 0xffff) << 16);\n  }\n\n  k1 = 0;\n\n  /* eslint-disable no-fallthrough */\n  switch (remainder) {\n    case 3:\n      k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;\n    case 2:\n      k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;\n    case 1:\n      k1 ^= key.charCodeAt(i) & 0xff;\n      k1 = (k1 & 0xffff) * c1 + (((k1 >>> 16) * c1 & 0xffff) << 16) & 0xffffffff;\n      k1 = k1 << 15 | k1 >>> 17;\n      k1 = (k1 & 0xffff) * c2 + (((k1 >>> 16) * c2 & 0xffff) << 16) & 0xffffffff;\n      h1 ^= k1;\n  }\n  /* eslint-enable no-fallthrough */\n\n  h1 ^= key.length;\n\n  h1 ^= h1 >>> 16;\n  h1 = (h1 & 0xffff) * 0x85ebca6b + (((h1 >>> 16) * 0x85ebca6b & 0xffff) << 16) & 0xffffffff;\n  h1 ^= h1 >>> 13;\n  h1 = (h1 & 0xffff) * 0xc2b2ae35 + (((h1 >>> 16) * 0xc2b2ae35 & 0xffff) << 16) & 0xffffffff;\n  h1 ^= h1 >>> 16;\n\n  return h1 >>> 0;\n};\n\nexports.default = murmurhash3_32_gc;\n\n//# sourceURL=webpack://NineSlice/./src/murmur.js?");

/***/ }),

/***/ "./src/processOffsetsArray.js":
/*!************************************!*\
  !*** ./src/processOffsetsArray.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar processsOffsetArray = function processsOffsetArray(arr) {\n  switch (arr.length) {\n    case 1:\n      // topRightBottomLeft\n      return [arr[0], arr[0], arr[0], arr[0]];\n    case 2:\n      // topBottom rightLeft\n      return [arr[0], arr[1], arr[0], arr[1]];\n    case 3:\n      // top rightLeft bottom\n      return [arr[0], arr[1], arr[2], arr[1]];\n    case 4:\n      // top right bottom left\n      return arr;\n  }\n  throw new Error('Received ${arr.length} offset values, expected 1 to 4.');\n};\n\nexports.default = processsOffsetArray;\n\n//# sourceURL=webpack://NineSlice/./src/processOffsetsArray.js?");

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack://NineSlice/multi_./src/index.js?");

/***/ }),

/***/ "phaser":
/*!*********************************************************************************************************!*\
  !*** external {"umd":"phaser","commonjs2":"phaser","commonjs":"phaser","amd":"phaser","root":"Phaser"} ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_phaser__;\n\n//# sourceURL=webpack://NineSlice/external_%7B%22umd%22:%22phaser%22,%22commonjs2%22:%22phaser%22,%22commonjs%22:%22phaser%22,%22amd%22:%22phaser%22,%22root%22:%22Phaser%22%7D?");

/***/ })

/******/ });
});