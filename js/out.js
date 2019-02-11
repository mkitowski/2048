/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    var _this = this;\n\n    var boxes = document.querySelectorAll('.box');\n    var button = document.querySelector('#start');\n    var scoretext = document.querySelector('.score');\n    var b1 = ['', '', '', '', '', '', '', '', ''];\n    var score = 0;\n\n    var restart = function restart() {\n        var result = 0;\n        result = Math.floor(Math.random() * 9);\n        boxes[result].innerHTML = 2;\n        b1[result] = 2;\n        boxes.forEach(function (e, i) {\n            if (i !== result) {\n                boxes[i].innerHTML = '';\n                b1[i] = '';\n                changeBkgColor(i);\n            }\n        });\n        score = 0;\n        changeBkgColor(result);\n        addScore();\n    };\n\n    button.addEventListener('click', function () {\n        restart();\n        _this.innerHTML = 'Restart';\n    });\n\n    var addScore = function addScore() {\n        scoretext.innerHTML = score;\n    };\n\n    var generateNew = function generateNew() {\n        var result = void 0;\n\n        for (var i = 0; i < 18; i++) {\n            result = Math.floor(Math.random() * 9);\n            if (b1[result] === \"\") {\n                i = 18;\n                b1[result] = 2;\n                boxes[result].innerHTML = 2;\n                changeBkgColor(result);\n            }\n        }\n\n        addScore();\n    };\n\n    var changeBkgColor = function changeBkgColor(i) {\n        if (b1[i] < 10) {\n            boxes[i].style.backgroundColor = '#' + b1[i] + '0' + b1[i] + 'F00';\n            boxes[i].style.color = 'aqua';\n        } else if (b1[i] < 99 && b1[i] > 10) {\n            boxes[i].style.backgroundColor = '#' + b1[i] + 'FF' + b1[i];\n            boxes[i].style.color = '#3C3F41';\n        } else if (b1[i] < 999 && b1[i] > 100) {\n            boxes[i].style.backgroundColor = '#' + b1[i] + b1[i];\n            boxes[i].style.color = 'aqua';\n        } else if (b1[i] === '') {\n            boxes[i].style.backgroundColor = '#00FFFF';\n        }\n    };\n\n    var movedown = function movedown() {\n        var moved = false;\n\n        for (var i = 3; i < 6; i++) {\n\n            if (b1[i + 3] === '' && b1[i] !== '') {\n                b1[i + 3] = b1[i];\n                b1[i] = '';\n                boxes[i + 3].innerHTML = b1[i + 3];\n                boxes[i].innerHTML = '';\n                moved = true;\n                changeBkgColor(i + 3);\n                changeBkgColor(i);\n            } else if (b1[i] === b1[i + 3] && b1[i] !== '') {\n                b1[i + 3] = Number(b1[i + 3]) * 2;\n                b1[i] = '';\n                boxes[i + 3].innerHTML = b1[i + 3];\n                boxes[i].innerHTML = b1[i];\n                moved = true;\n                score += b1[i + 3];\n                changeBkgColor(i + 3);\n                changeBkgColor(i);\n            }\n        }\n\n        for (var _i = 0; _i < 3; _i++) {\n\n            if (b1[_i + 3] === '' && b1[_i + 6] === '' && b1[_i] !== '') {\n                b1[_i + 6] = b1[_i];\n                b1[_i] = '';\n                boxes[_i + 6].innerHTML = b1[_i + 6];\n                boxes[_i].innerHTML = b1[_i];\n                moved = true;\n                changeBkgColor(_i + 6);\n                changeBkgColor(_i);\n            } else if (b1[_i + 3] === '' && b1[_i + 6] === b1[_i] && b1[_i] !== '') {\n                b1[_i + 6] = Number(b1[_i + 6]) * 2;\n                b1[_i] = '';\n                boxes[_i + 6].innerHTML = b1[_i + 6];\n                boxes[_i].innerHTML = b1[_i];\n                score += b1[_i + 6];\n                moved = true;\n                changeBkgColor(_i + 6);\n                changeBkgColor(_i);\n            } else if (b1[_i + 3] === '' && b1[_i] !== '') {\n                b1[_i + 3] = b1[_i];\n                b1[_i] = '';\n                boxes[_i + 3].innerHTML = b1[_i + 3];\n                boxes[_i].innerHTML = b1[_i];\n                moved = true;\n                changeBkgColor(_i + 3);\n                changeBkgColor(_i);\n            } else if (b1[_i + 3] === b1[_i] && b1[_i] !== '') {\n                b1[_i + 3] = Number(b1[_i + 3]) * 2;\n                b1[_i] = '';\n                boxes[_i + 3].innerHTML = b1[_i + 3];\n                boxes[_i].innerHTML = b1[_i];\n                moved = true;\n                score += b1[_i + 3];\n                changeBkgColor(_i + 3);\n                changeBkgColor(_i);\n            }\n        }\n\n        if (moved) {\n            generateNew();\n        }\n    };\n\n    var moveup = function moveup() {\n        var moved = false;\n\n        for (var i = 3; i < 6; i++) {\n\n            if (b1[i - 3] === '' && b1[i] !== '') {\n                b1[i - 3] = b1[i];\n                b1[i] = '';\n                boxes[i - 3].innerHTML = b1[i - 3];\n                boxes[i].innerHTML = '';\n                moved = true;\n                changeBkgColor(i - 3);\n                changeBkgColor(i);\n            } else if (b1[i] === b1[i - 3] && b1[i] !== '') {\n                b1[i - 3] = Number(b1[i - 3]) * 2;\n                b1[i] = '';\n                boxes[i - 3].innerHTML = b1[i - 3];\n                boxes[i].innerHTML = b1[i];\n                moved = true;\n                score += b1[i - 3];\n                changeBkgColor(i - 3);\n                changeBkgColor(i);\n            }\n        }\n\n        for (var _i2 = 6; _i2 < 9; _i2++) {\n\n            if (b1[_i2 - 3] === '' && b1[_i2 - 6] === '' && b1[_i2] !== '') {\n                b1[_i2 - 6] = b1[_i2];\n                b1[_i2] = '';\n                boxes[_i2 - 6].innerHTML = b1[_i2 - 6];\n                boxes[_i2].innerHTML = b1[_i2];\n                moved = true;\n                changeBkgColor(_i2 - 6);\n                changeBkgColor(_i2);\n            } else if (b1[_i2 - 3] === '' && b1[_i2 - 6] === b1[_i2] && b1[_i2] !== '') {\n                b1[_i2 - 6] = Number(b1[_i2 - 6]) * 2;\n                b1[_i2] = '';\n                boxes[_i2 - 6].innerHTML = b1[_i2 - 6];\n                boxes[_i2].innerHTML = b1[_i2];\n                score += b1[_i2 - 6];\n                moved = true;\n                changeBkgColor(_i2 - 6);\n                changeBkgColor(_i2);\n            } else if (b1[_i2 - 3] === '' && b1[_i2] !== '') {\n                b1[_i2 - 3] = b1[_i2];\n                b1[_i2] = '';\n                boxes[_i2 - 3].innerHTML = b1[_i2 - 3];\n                boxes[_i2].innerHTML = b1[_i2];\n                moved = true;\n                changeBkgColor(_i2 - 3);\n                changeBkgColor(_i2);\n            } else if (b1[_i2 - 3] === b1[_i2] && b1[_i2] !== '') {\n                b1[_i2 - 3] = Number(b1[_i2 - 3]) * 2;\n                b1[_i2] = '';\n                boxes[_i2 - 3].innerHTML = b1[_i2 - 3];\n                boxes[_i2].innerHTML = b1[_i2];\n                moved = true;\n                score += b1[_i2 - 3];\n                changeBkgColor(_i2 - 3);\n                changeBkgColor(_i2);\n            }\n        }\n\n        if (moved) {\n            generateNew();\n        }\n    };\n\n    var moveright = function moveright() {\n        var moved = false;\n\n        for (var i = 1; i < 8; i += 3) {\n            if (b1[i + 1] === '' && b1[i] !== '') {\n                b1[i + 1] = b1[i];\n                b1[i] = '';\n                boxes[i + 1].innerHTML = b1[i + 1];\n                boxes[i].innerHTML = '';\n                moved = true;\n                changeBkgColor(i + 1);\n                changeBkgColor(i);\n            } else if (b1[i] === b1[i + 1] && b1[i] !== '') {\n                b1[i + 1] = Number(b1[i + 1]) * 2;\n                b1[i] = '';\n                boxes[i + 1].innerHTML = b1[i + 1];\n                boxes[i].innerHTML = b1[i];\n                moved = true;\n                score += b1[i + 1];\n                changeBkgColor(i + 1);\n                changeBkgColor(i);\n            }\n        }\n\n        for (var _i3 = 0; _i3 < 7; _i3 += 3) {\n            if (b1[_i3 + 1] === '' && b1[_i3 + 2] === '' && b1[_i3] !== '') {\n                b1[_i3 + 2] = b1[_i3];\n                b1[_i3] = '';\n                boxes[_i3 + 2].innerHTML = b1[_i3 + 2];\n                boxes[_i3].innerHTML = '';\n                moved = true;\n                changeBkgColor(_i3 + 2);\n                changeBkgColor(_i3);\n            } else if (b1[_i3 + 1] === '' && b1[_i3 + 2] === b1[_i3] && b1[_i3] !== '') {\n                b1[_i3 + 2] = Number(b1[_i3 + 2]) * 2;\n                b1[_i3] = '';\n                boxes[_i3 + 2].innerHTML = b1[_i3 + 2];\n                boxes[_i3].innerHTML = b1[_i3];\n                moved = true;\n                score += b1[_i3 + 2];\n                changeBkgColor(_i3 + 2);\n                changeBkgColor(_i3);\n            } else if (b1[_i3 + 1] === '' && b1[_i3] !== '') {\n                b1[_i3 + 1] = b1[_i3];\n                b1[_i3] = '';\n                boxes[_i3 + 1].innerHTML = b1[_i3 + 1];\n                boxes[_i3].innerHTML = b1[_i3];\n                moved = true;\n                changeBkgColor(_i3 + 1);\n                changeBkgColor(_i3);\n            } else if (b1[_i3 + 1] === b1[_i3] && b1[_i3] !== '') {\n                b1[_i3 + 1] = Number(b1[_i3 + 1]) * 2;\n                b1[_i3] = '';\n                boxes[_i3 + 1].innerHTML = b1[_i3 + 1];\n                boxes[_i3].innerHTML = b1[_i3];\n                moved = true;\n                score += b1[_i3 + 1];\n                changeBkgColor(_i3 + 1);\n                changeBkgColor(_i3);\n            }\n        }\n        if (moved) {\n            generateNew();\n        }\n    };\n\n    var moveleft = function moveleft() {\n\n        var moved = false;\n\n        for (var i = 7; i > 0; i -= 3) {\n            if (b1[i - 1] === '' && b1[i] !== '') {\n                b1[i - 1] = b1[i];\n                b1[i] = '';\n                boxes[i - 1].innerHTML = b1[i - 1];\n                boxes[i].innerHTML = '';\n                moved = true;\n                changeBkgColor(i - 1);\n                changeBkgColor(i);\n            } else if (b1[i] === b1[i - 1] && b1[i] !== '') {\n                b1[i - 1] = Number(b1[i - 1]) * 2;\n                b1[i] = '';\n                boxes[i - 1].innerHTML = b1[i - 1];\n                boxes[i].innerHTML = b1[i];\n                moved = true;\n                score += b1[i - 1];\n                changeBkgColor(i - 1);\n                changeBkgColor(i);\n            }\n        }\n\n        for (var _i4 = 8; _i4 > 1; _i4 -= 3) {\n            if (b1[_i4 - 1] === '' && b1[_i4 - 2] === '' && b1[_i4] !== '') {\n                b1[_i4 - 2] = b1[_i4];\n                b1[_i4] = '';\n                boxes[_i4 - 2].innerHTML = b1[_i4 - 2];\n                boxes[_i4].innerHTML = '';\n                moved = true;\n                changeBkgColor(_i4 - 2);\n                changeBkgColor(_i4);\n            } else if (b1[_i4 - 1] === '' && b1[_i4 - 2] === b1[_i4] && b1[_i4] !== '') {\n                b1[_i4 - 2] = Number(b1[_i4 - 2]) * 2;\n                b1[_i4] = '';\n                boxes[_i4 - 2].innerHTML = b1[_i4 - 2];\n                boxes[_i4].innerHTML = b1[_i4];\n                moved = true;\n                score += b1[_i4 - 2];\n                changeBkgColor(_i4 - 2);\n                changeBkgColor(_i4);\n            } else if (b1[_i4 - 1] === '' && b1[_i4] !== '') {\n                b1[_i4 - 1] = b1[_i4];\n                b1[_i4] = '';\n                boxes[_i4 - 1].innerHTML = b1[_i4 - 1];\n                boxes[_i4].innerHTML = b1[_i4];\n                moved = true;\n                changeBkgColor(_i4 - 1);\n                changeBkgColor(_i4);\n            } else if (b1[_i4 - 1] === b1[_i4] && b1[_i4] !== '') {\n                b1[_i4 - 1] = Number(b1[_i4 - 1]) * 2;\n                b1[_i4] = '';\n                boxes[_i4 - 1].innerHTML = b1[_i4 - 1];\n                boxes[_i4].innerHTML = b1[_i4];\n                moved = true;\n                score += b1[_i4 - 1];\n                changeBkgColor(_i4 - 1);\n                changeBkgColor(_i4);\n            }\n        }\n        if (moved) {\n            generateNew();\n        }\n    };\n\n    var moveit = function moveit(key) {\n        if (key === 83 || key === 40) {\n            //down\n            movedown();\n        } else if (key === 87 || key === 38) {\n            //up\n            moveup();\n        } else if (key === 68 || key === 39) {\n            //right\n            moveright();\n        } else if (key === 65 || key === 37) {\n            //left\n            moveleft();\n        }\n    };\n\n    window.addEventListener('keydown', function (e) {\n        return moveit(e.keyCode);\n    });\n\n    var pointx, pointy, pointsx, pointsy;\n\n    window.addEventListener('touchstart', function (e) {\n\n        var touchobj = e.changedTouches[0];\n\n        pointx = touchobj.pageX;\n        pointy = touchobj.pageY;\n    }, false);\n\n    window.addEventListener('touchmove', function (ev) {\n        if (window) {\n            ev.preventDefault();\n            ev.stopImmediatePropagation();\n        }\n    }, { passive: false });\n\n    window.addEventListener('touchend', function (e) {\n        var touchobj = e.changedTouches[0];\n\n        pointsx = touchobj.pageX;\n        pointsy = touchobj.pageY;\n        var axlex = pointsx - pointx;\n        var axley = pointsy - pointy;\n\n        if (Math.abs(axlex) + Math.abs(axley) > 50) {\n\n            if (axlex >= 0 && axley > 0 && axley > axlex || axlex <= 0 && axley > 0 && axley > -axlex) {\n                movedown();\n            } else if (axlex >= 0 && axley < 0 && -axley > axlex || axlex <= 0 && axley < 0 && axley < axlex) {\n                moveup();\n            } else if (axlex > 0 && axley >= 0 && axlex > axley || axlex > 0 && axley <= 0 && -axley < axlex) {\n                moveright();\n            } else {\n                moveleft();\n            }\n        }\n    }, false);\n});\n\n//# sourceURL=webpack:///./js/app.js?");

/***/ })

/******/ });