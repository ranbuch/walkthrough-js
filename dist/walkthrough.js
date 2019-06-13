"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Walkthrough = void 0;

var _interface = require("./interface");

var _utils = require("./utils");

var _storage = require("./storage");

var _textToSpeech = require("./textToSpeech");

var _rxjs = require("rxjs");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Walkthrough =
/*#__PURE__*/
function () {
  // private cssInjected: boolean;
  function Walkthrough() {
    _classCallCheck(this, Walkthrough);

    _defineProperty(this, "currentStep", void 0);

    _defineProperty(this, "steps", void 0);

    _defineProperty(this, "parent", void 0);

    _defineProperty(this, "prompt", void 0);

    _defineProperty(this, "curtain", void 0);

    _defineProperty(this, "element", void 0);

    _defineProperty(this, "storageContainer", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "onEnd", void 0);

    _defineProperty(this, "tts", void 0);

    _defineProperty(this, "utils", void 0);

    _defineProperty(this, "storage", void 0);

    _defineProperty(this, "style", void 0);

    window.addEventListener('resize', this.fixElementAndPrompt.bind(this), {
      passive: true
    });
    this.utils = new _utils.UtilsService();
    this.tts = new _textToSpeech.TextToSpeechService(this.utils);
    this.storage = new _storage.StorageService();
  }

  _createClass(Walkthrough, [{
    key: "setTutorial",
    value: function setTutorial(steps) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _interface.TutorialOptions();
      this.onEnd = new _rxjs.Subject();
      this.options = options;
      this.initStorageContainer(false);
      this.injectCss();

      if (this.options.identifier) {
        if (this.storageContainer.identifiers[options.identifier].counter >= options.maxIdentifier) {
          setTimeout(function () {
            _this.onEnd.next(false);
          });
          return this.onEnd;
        }
      }

      this.steps = steps;
      this.currentStep = 0;
      this.deployStep(steps[this.currentStep]);
      return this.onEnd;
    }
  }, {
    key: "initStorageContainer",
    value: function initStorageContainer(force) {
      if (!this.storageContainer || force) {
        this.storageContainer = this.storage.get(Walkthrough.storageContainerID);
        if (_typeof(this.storageContainer) !== 'object' || this.storageContainer === null) this.storageContainer = {
          identifiers: {}
        };
      }

      if (this.options.identifier) {
        if (!this.storageContainer.identifiers[this.options.identifier]) this.storageContainer.identifiers[this.options.identifier] = {
          counter: 0
        };
      }
    }
  }, {
    key: "setStorageContainer",
    value: function setStorageContainer() {
      if (_typeof(this.storageContainer) === 'object') this.storage.set(Walkthrough.storageContainerID, this.storageContainer);
    }
  }, {
    key: "deployStep",
    value: function deployStep(step) {
      var _this2 = this;

      this.element = this.getElementByStage(step);

      if (!this.element || !this.element || !this.element.parentElement) {
        console.warn('Walkthrough: no element was provided');
        this.destroy(false);
        return;
      }

      this.parent = this.element.parentElement;
      this.parent.style.position = 'relative';
      this.element.classList.add('tutorial-element');

      if (!this.curtain) {
        this.curtain = this.getCurtain();
        this.parent.appendChild(this.curtain);
      }

      this.parent.appendChild(this.getPrompt(step));
      this.fixElementAndPrompt();
      requestAnimationFrame(function () {
        _this2.utils.scrollToElement(_this2.element, 'center');
      });
      if (step.autoread && this.tts.isSupported) this.toggleRead();
      if (typeof step.onEnter === 'function') step.onEnter();
    }
  }, {
    key: "getElementByStage",
    value: function getElementByStage(stage) {
      var element = stage.element;
      if (!element) element = document.querySelectorAll(stage.selector)[stage.selectorIndex || 0];
      return element;
    }
  }, {
    key: "getCurtain",
    value: function getCurtain() {
      var curtain = document.createElement('div');
      curtain.className = 'tutorial-curtain';
      return curtain;
    }
  }, {
    key: "fixElementAndPrompt",
    value: function fixElementAndPrompt() {
      if (this.element) {
        var elmStyle = this.prompt.style;
        var top = -15,
            left = -20;

        if (this.parent && this.steps[this.currentStep].fixMargin) {
          var pcs = getComputedStyle(this.parent);
          var mb = this.utils.getFormattedDim(pcs.marginBottom);
          if (mb.suffix === 'px') top += mb.size;
          var ml = this.utils.getFormattedDim(pcs.marginLeft);
          if (ml.suffix === 'px') left += ml.size;
        }

        if (this.steps[this.currentStep].top) elmStyle.top = this.steps[this.currentStep].top;else elmStyle.top = top + 'px';
        if (this.steps[this.currentStep].left) elmStyle.left = this.steps[this.currentStep].left;else elmStyle.left = left + 'px';
        elmStyle.zIndex = '2005';
        elmStyle.paddingTop = this.element.getBoundingClientRect().height + 15 + 'px';
        var w = this.element.getBoundingClientRect().width;

        if (this.steps[this.currentStep].fixPadding) {
          var elmCStyle = getComputedStyle(this.prompt);
          var paddingLeft = this.utils.getFormattedDim(elmCStyle.paddingLeft);
          if (paddingLeft && paddingLeft.size) w += paddingLeft.size;
          var paddingRight = this.utils.getFormattedDim(elmCStyle.paddingRight);
          if (paddingRight && paddingRight.size) w += paddingRight.size;
        }

        elmStyle.width = w + 'px';
      }
    }
  }, {
    key: "getPrompt",
    value: function getPrompt(step) {
      this.prompt = document.createElement('div');
      this.prompt.className = 'tutorial-prompt';
      var inner = document.createElement('div');
      inner.className = 'tutorial-inner';
      this.prompt.appendChild(inner);

      if (step.title) {
        var title = document.createElement('span');
        title.className = 'tutorial-title';
        title.textContent = step.title;
        inner.appendChild(title);
      }

      var desc = document.createElement('p');
      desc.className = 'tutorial-desc';
      desc.innerHTML = step.desc;
      inner.appendChild(desc);

      if (this.currentStep > 0) {
        var prev = document.createElement('button');
        prev.className = 'tutorial-prev tutorial-btn';
        prev.addEventListener('click', this.prev.bind(this), false);
        prev.textContent = 'previous';
        inner.appendChild(prev);
      }

      var next = document.createElement('button');
      next.className = 'tutorial-next tutorial-btn';
      next.addEventListener('click', this.next.bind(this), false);
      next.textContent = this.currentStep < this.steps.length - 1 ? 'next' : 'done';
      inner.appendChild(next);
      requestAnimationFrame(function () {
        next.focus();
      });
      var footer = document.createElement('div');
      footer.className = 'tutorial-footer';
      inner.appendChild(footer);
      var steps = document.createElement('span');
      steps.className = 'tutorial-steps';
      steps.textContent = "step ".concat(this.currentStep + 1, " of ").concat(this.steps.length);
      footer.appendChild(steps);
      var skip = document.createElement('span');
      skip.className = 'tutorial-skip';
      skip.textContent = "skip";
      skip.addEventListener('click', this.destroy.bind(this, [false]), false);
      footer.appendChild(skip);

      if (this.tts.isSupported) {
        var read = document.createElement('button');
        read.className = 'tutorial-read';
        read.textContent = Walkthrough.readText;
        read.addEventListener('click', this.toggleRead.bind(this), false);
        footer.appendChild(read);
      }

      return this.prompt;
    }
  }, {
    key: "removeCurrentPrompt",
    value: function removeCurrentPrompt() {
      if (this.prompt) this.parent.removeChild(this.prompt);
      delete this.prompt;
    }
  }, {
    key: "removeCurrentCurtain",
    value: function removeCurrentCurtain() {
      var _this3 = this;

      if (this.curtain) {
        this.curtain.classList.add('end');
        setTimeout(function () {
          _this3.curtain.parentElement.removeChild(_this3.curtain);

          delete _this3.curtain;
        }, 500);
      }
    }
  }, {
    key: "clearCurrentElement",
    value: function clearCurrentElement() {
      if (this.element && this.element) this.element.classList.remove('tutorial-element');
      delete this.element;
    }
  }, {
    key: "clearCSS",
    value: function clearCSS() {
      if (this.style && this.style.parentElement) {
        this.style.parentElement.removeChild(this.style);
      }

      delete this.style;
    }
  }, {
    key: "injectCss",
    value: function injectCss() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this.style || force) {
        this.clearCSS();
        var css = ".tutorial-curtain {\n                position: fixed;\n                top: 0;\n                left: 0;\n                width: 100vw;\n                height: 100vh;\n                background: transparent;\n                z-index: 2000;\n                animation: curtain-animation ".concat(Walkthrough.animationDuration, "ms ease-out forwards;\n            }\n            .tutorial-curtain.end {\n                animation-name: curtain-end-animation;\n            }\n            @keyframes curtain-animation {\n                from {\n                    background: transparent;\n                }\n                to {\n                    background: rgba(0,0,0,0.7);\n                }\n            }\n            @keyframes curtain-end-animation {\n                from {\n                    background: rgba(0,0,0,0.7);\n                }\n                to {\n                    background: transparent;\n                }\n            }\n            .tutorial-element {\n                position: relative;\n                background: #fff;\n                z-index: 2010;\n            }\n            .tutorial-prompt {\n                position: absolute;\n                background: #fff;\n                z-index: 2010;\n                padding: 15px 20px;\n                border-radius: 4px;\n            }\n            .tutorial-inner {\n                padding: 10px 15px;\n                background: rgba(0, 0, 0, 0.7);\n                border-radius: 4px;\n                margin-top: 10px;\n                color: #fff;\n                text-align: left;\n            }\n            .tutorial-title {\n                text-transform: uppercase;\n                margin: 0;\n                font-size: 17px;\n            }\n            .tutorial-btn {\n                border: solid 1px #000000;\n                cursor: pointer;\n                color: #000000;\n                background: #fff;\n                padding: 5px 10px;\n                border-radius: 15px;\n                font-size: 13px;\n                text-transform: capitalize;\n                display: inline-block;\n            }\n            .tutorial-prev {\n                margin-right: 15px;\n            }\n            .tutorial-desc {\n                font-size: 13px;\n                text-transform: none;\n            }\n            .tutorial-footer {\n                margin-top: 8px;\n                padding-top: 8px;\n                border-top: solid 1px rgba(255, 255, 255, 0.5);\n                font-size: 11px;\n            }\n            .tutorial-skip {\n                text-decoration: underline;\n                float: right;\n                cursor: pointer;\n            }\n            .tutorial-read {\n                float: right;\n                background: transparent;\n                border: none;\n                color: #fff;\n                cursor: pointer;\n                width: 22px;\n                height: 16px;\n                line-height: 22px;\n                top: -1px;\n                position: relative;\n            }");
        this.style = this.utils.injectStyle(css);
      }
    }
  }, {
    key: "onExit",
    value: function onExit() {
      if (this.steps && this.steps[this.currentStep] && typeof this.steps[this.currentStep].onExit === 'function') this.steps[this.currentStep].onExit();
    }
  }, {
    key: "next",
    value: function next() {
      this.removeCurrentPrompt();
      this.clearCurrentElement();
      this.onExit();

      if (++this.currentStep < this.steps.length) {
        this.tts.cancel();
        this.deployStep(this.steps[this.currentStep]);
      } else {
        // this.removeCurrentParent();
        this.destroy(true);
      }
    }
  }, {
    key: "prev",
    value: function prev() {
      if (this.currentStep > 0) {
        this.removeCurrentPrompt();
        this.clearCurrentElement();
        this.onExit();
        this.tts.cancel();
        this.deployStep(this.steps[--this.currentStep]);
      }
    }
  }, {
    key: "toggleRead",
    value: function toggleRead() {
      if (!this.tts.isSupported) return;
      var step = this.steps[this.currentStep];

      if (step && this.parent && this.parent) {
        var elem = this.parent.querySelector('.tutorial-inner .tutorial-read');

        if (elem.classList.contains('active')) {
          this.tts.cancel();
          elem.textContent = Walkthrough.readText;
          elem.classList.remove('active');
        } else {
          var say = step.title ? step.title + ' ' : '';
          say += this.utils.getTextContent(step.desc);
          this.tts.say(say).subscribe(function () {
            return elem.textContent = Walkthrough.readText;
          });
          elem.textContent = Walkthrough.stopReadText;
          elem.classList.add('active');
        }
      }
    }
  }, {
    key: "destroy",
    value: function destroy(incrementCounter) {
      this.removeCurrentPrompt();
      this.removeCurrentCurtain();
      this.clearCurrentElement();
      this.onExit();
      this.tts.cancel();
      if (this.options && this.options.identifier && incrementCounter) this.storageContainer.identifiers[this.options.identifier].counter++;
      this.setStorageContainer();
      setTimeout(this.clearCSS.bind(this), Walkthrough.animationDuration);
      if (this.onEnd) this.onEnd.next(true);
      window.removeEventListener('resize', this.fixElementAndPrompt.bind(this));
    }
  }]);

  return Walkthrough;
}();

exports.Walkthrough = Walkthrough;

_defineProperty(Walkthrough, "storageContainerID", '_walkthrough');

_defineProperty(Walkthrough, "readText", '►');

_defineProperty(Walkthrough, "stopReadText", '◼');

_defineProperty(Walkthrough, "animationDuration", 500);

global = global || self;
if (global) global['Walkthrough'] = Walkthrough;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93YWxrdGhyb3VnaC50cyJdLCJuYW1lcyI6WyJXYWxrdGhyb3VnaCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJmaXhFbGVtZW50QW5kUHJvbXB0IiwiYmluZCIsInBhc3NpdmUiLCJ1dGlscyIsIlV0aWxzU2VydmljZSIsInR0cyIsIlRleHRUb1NwZWVjaFNlcnZpY2UiLCJzdG9yYWdlIiwiU3RvcmFnZVNlcnZpY2UiLCJzdGVwcyIsIm9wdGlvbnMiLCJUdXRvcmlhbE9wdGlvbnMiLCJvbkVuZCIsIlN1YmplY3QiLCJpbml0U3RvcmFnZUNvbnRhaW5lciIsImluamVjdENzcyIsImlkZW50aWZpZXIiLCJzdG9yYWdlQ29udGFpbmVyIiwiaWRlbnRpZmllcnMiLCJjb3VudGVyIiwibWF4SWRlbnRpZmllciIsInNldFRpbWVvdXQiLCJuZXh0IiwiY3VycmVudFN0ZXAiLCJkZXBsb3lTdGVwIiwiZm9yY2UiLCJnZXQiLCJzdG9yYWdlQ29udGFpbmVySUQiLCJzZXQiLCJzdGVwIiwiZWxlbWVudCIsImdldEVsZW1lbnRCeVN0YWdlIiwicGFyZW50RWxlbWVudCIsImNvbnNvbGUiLCJ3YXJuIiwiZGVzdHJveSIsInBhcmVudCIsInN0eWxlIiwicG9zaXRpb24iLCJjbGFzc0xpc3QiLCJhZGQiLCJjdXJ0YWluIiwiZ2V0Q3VydGFpbiIsImFwcGVuZENoaWxkIiwiZ2V0UHJvbXB0IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2Nyb2xsVG9FbGVtZW50IiwiYXV0b3JlYWQiLCJpc1N1cHBvcnRlZCIsInRvZ2dsZVJlYWQiLCJvbkVudGVyIiwic3RhZ2UiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzZWxlY3RvciIsInNlbGVjdG9ySW5kZXgiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiZWxtU3R5bGUiLCJwcm9tcHQiLCJ0b3AiLCJsZWZ0IiwiZml4TWFyZ2luIiwicGNzIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsIm1iIiwiZ2V0Rm9ybWF0dGVkRGltIiwibWFyZ2luQm90dG9tIiwic3VmZml4Iiwic2l6ZSIsIm1sIiwibWFyZ2luTGVmdCIsInpJbmRleCIsInBhZGRpbmdUb3AiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJoZWlnaHQiLCJ3Iiwid2lkdGgiLCJmaXhQYWRkaW5nIiwiZWxtQ1N0eWxlIiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nUmlnaHQiLCJpbm5lciIsInRpdGxlIiwidGV4dENvbnRlbnQiLCJkZXNjIiwiaW5uZXJIVE1MIiwicHJldiIsImxlbmd0aCIsImZvY3VzIiwiZm9vdGVyIiwic2tpcCIsInJlYWQiLCJyZWFkVGV4dCIsInJlbW92ZUNoaWxkIiwicmVtb3ZlIiwiY2xlYXJDU1MiLCJjc3MiLCJhbmltYXRpb25EdXJhdGlvbiIsImluamVjdFN0eWxlIiwib25FeGl0IiwicmVtb3ZlQ3VycmVudFByb21wdCIsImNsZWFyQ3VycmVudEVsZW1lbnQiLCJjYW5jZWwiLCJlbGVtIiwicXVlcnlTZWxlY3RvciIsImNvbnRhaW5zIiwic2F5IiwiZ2V0VGV4dENvbnRlbnQiLCJzdWJzY3JpYmUiLCJzdG9wUmVhZFRleHQiLCJpbmNyZW1lbnRDb3VudGVyIiwicmVtb3ZlQ3VycmVudEN1cnRhaW4iLCJzZXRTdG9yYWdlQ29udGFpbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImdsb2JhbCIsInNlbGYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRWFBLFc7OztBQWlCVDtBQUVBLHlCQUFjO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQ1ZDLElBQUFBLE1BQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsS0FBS0MsbUJBQUwsQ0FBeUJDLElBQXpCLENBQThCLElBQTlCLENBQWxDLEVBQXVFO0FBQUVDLE1BQUFBLE9BQU8s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LENBQUNqRSxTQUFMLENBQWVDLEdBQWYsQ0FBbUIsUUFBbkI7QUFDSDtBQUNKO0FBQ0o7Ozs0QkFFT3VFLGdCLEVBQTJCO0FBQy9CLFdBQUtWLG1CQUFMO0FBQ0EsV0FBS1csb0JBQUw7QUFDQSxXQUFLVixtQkFBTDtBQUNBLFdBQUtGLE1BQUw7QUFDQSxXQUFLL0YsR0FBTCxDQUFTa0csTUFBVDtBQUNBLFVBQUksS0FBSzdGLE9BQUwsSUFBZ0IsS0FBS0EsT0FBTCxDQUFhTSxVQUE3QixJQUEyQytGLGdCQUEvQyxFQUNJLEtBQUs5RixnQkFBTCxDQUFzQkMsV0FBdEIsQ0FBa0MsS0FBS1IsT0FBTCxDQUFhTSxVQUEvQyxFQUEyREcsT0FBM0Q7QUFDSixXQUFLOEYsbUJBQUw7QUFDQTVGLE1BQUFBLFVBQVUsQ0FBQyxLQUFLMkUsUUFBTCxDQUFjL0YsSUFBZCxDQUFtQixJQUFuQixDQUFELEVBQTJCSixXQUFXLENBQUNxRyxpQkFBdkMsQ0FBVjtBQUNBLFVBQUksS0FBS3RGLEtBQVQsRUFDSSxLQUFLQSxLQUFMLENBQVdVLElBQVgsQ0FBZ0IsSUFBaEI7QUFDSnhCLE1BQUFBLE1BQU0sQ0FBQ29ILG1CQUFQLENBQTJCLFFBQTNCLEVBQXFDLEtBQUtsSCxtQkFBTCxDQUF5QkMsSUFBekIsQ0FBOEIsSUFBOUIsQ0FBckM7QUFDSDs7Ozs7Ozs7Z0JBaFpRSixXLHdCQUNtQixjOztnQkFEbkJBLFcsY0FFUyxHOztnQkFGVEEsVyxrQkFHYSxHOztnQkFIYkEsVyx1QkFJa0IsRzs7QUFpWi9Cc0gsTUFBTSxHQUFHQSxNQUFNLElBQUlDLElBQW5CO0FBQ0EsSUFBSUQsTUFBSixFQUNJQSxNQUFNLENBQUMsYUFBRCxDQUFOLEdBQXdCdEgsV0FBeEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUdXRvcmlhbFN0YWdlLCBTdG9yYWdlQ29udGFpbmVyLCBUdXRvcmlhbE9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZSc7XHJcbmltcG9ydCB7IFV0aWxzU2VydmljZSB9IGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vc3RvcmFnZSc7XHJcbmltcG9ydCB7IFRleHRUb1NwZWVjaFNlcnZpY2UgfSBmcm9tICcuL3RleHRUb1NwZWVjaCc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBXYWxrdGhyb3VnaCB7XHJcbiAgICBzdGF0aWMgc3RvcmFnZUNvbnRhaW5lcklEID0gJ193YWxrdGhyb3VnaCc7XHJcbiAgICBzdGF0aWMgcmVhZFRleHQgPSAn4pa6JztcclxuICAgIHN0YXRpYyBzdG9wUmVhZFRleHQgPSAn4pe8JztcclxuICAgIHN0YXRpYyBhbmltYXRpb25EdXJhdGlvbiA9IDUwMDtcclxuICAgIHByaXZhdGUgY3VycmVudFN0ZXA6IG51bWJlcjtcclxuICAgIHByaXZhdGUgc3RlcHM6IEFycmF5PFR1dG9yaWFsU3RhZ2U+O1xyXG4gICAgcHJpdmF0ZSBwYXJlbnQ6IEhUTUxFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBwcm9tcHQ6IEhUTUxFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBjdXJ0YWluOiBIVE1MRWxlbWVudDtcclxuICAgIHByaXZhdGUgZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIHN0b3JhZ2VDb250YWluZXI6IFN0b3JhZ2VDb250YWluZXI7XHJcbiAgICBwcml2YXRlIG9wdGlvbnM6IFR1dG9yaWFsT3B0aW9ucztcclxuICAgIHByaXZhdGUgb25FbmQ6IFN1YmplY3Q8Ym9vbGVhbj47XHJcbiAgICBwcml2YXRlIHR0czogVGV4dFRvU3BlZWNoU2VydmljZTtcclxuICAgIHByaXZhdGUgdXRpbHM6IFV0aWxzU2VydmljZTtcclxuICAgIHByaXZhdGUgc3RvcmFnZTogU3RvcmFnZVNlcnZpY2U7XHJcbiAgICAvLyBwcml2YXRlIGNzc0luamVjdGVkOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBzdHlsZTogSFRNTFN0eWxlRWxlbWVudDtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmZpeEVsZW1lbnRBbmRQcm9tcHQuYmluZCh0aGlzKSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnV0aWxzID0gbmV3IFV0aWxzU2VydmljZSgpO1xyXG4gICAgICAgIHRoaXMudHRzID0gbmV3IFRleHRUb1NwZWVjaFNlcnZpY2UodGhpcy51dGlscyk7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gbmV3IFN0b3JhZ2VTZXJ2aWNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VHV0b3JpYWwoc3RlcHM6IEFycmF5PFR1dG9yaWFsU3RhZ2U+LCBvcHRpb25zID0gbmV3IFR1dG9yaWFsT3B0aW9ucygpKTogU3ViamVjdDxib29sZWFuPiB7XHJcbiAgICAgICAgdGhpcy5vbkVuZCA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgICAgICB0aGlzLmluaXRTdG9yYWdlQ29udGFpbmVyKGZhbHNlKTtcclxuICAgICAgICB0aGlzLmluamVjdENzcygpO1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaWRlbnRpZmllcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdG9yYWdlQ29udGFpbmVyLmlkZW50aWZpZXJzW29wdGlvbnMuaWRlbnRpZmllcl0uY291bnRlciA+PSBvcHRpb25zLm1heElkZW50aWZpZXIpIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25FbmQubmV4dChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9uRW5kO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RlcHMgPSBzdGVwcztcclxuICAgICAgICB0aGlzLmN1cnJlbnRTdGVwID0gMDtcclxuICAgICAgICB0aGlzLmRlcGxveVN0ZXAoc3RlcHNbdGhpcy5jdXJyZW50U3RlcF0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9uRW5kO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFN0b3JhZ2VDb250YWluZXIoZm9yY2U6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoIXRoaXMuc3RvcmFnZUNvbnRhaW5lciB8fCBmb3JjZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2VDb250YWluZXIgPSB0aGlzLnN0b3JhZ2UuZ2V0KFdhbGt0aHJvdWdoLnN0b3JhZ2VDb250YWluZXJJRCkgYXMgU3RvcmFnZUNvbnRhaW5lcjtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnN0b3JhZ2VDb250YWluZXIgIT09ICdvYmplY3QnIHx8IHRoaXMuc3RvcmFnZUNvbnRhaW5lciA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZUNvbnRhaW5lciA9IHtcclxuICAgICAgICAgICAgICAgICAgICBpZGVudGlmaWVyczoge31cclxuICAgICAgICAgICAgICAgIH0gYXMgU3RvcmFnZUNvbnRhaW5lcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pZGVudGlmaWVyKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zdG9yYWdlQ29udGFpbmVyLmlkZW50aWZpZXJzW3RoaXMub3B0aW9ucy5pZGVudGlmaWVyXSlcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZUNvbnRhaW5lci5pZGVudGlmaWVyc1t0aGlzLm9wdGlvbnMuaWRlbnRpZmllcl0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcjogMFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRTdG9yYWdlQ29udGFpbmVyKCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5zdG9yYWdlQ29udGFpbmVyID09PSAnb2JqZWN0JylcclxuICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNldChXYWxrdGhyb3VnaC5zdG9yYWdlQ29udGFpbmVySUQsIHRoaXMuc3RvcmFnZUNvbnRhaW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgZGVwbG95U3RlcChzdGVwOiBUdXRvcmlhbFN0YWdlKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5nZXRFbGVtZW50QnlTdGFnZShzdGVwKTtcclxuICAgICAgICBpZiAoIXRoaXMuZWxlbWVudCB8fCAhdGhpcy5lbGVtZW50IHx8ICF0aGlzLmVsZW1lbnQucGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1dhbGt0aHJvdWdoOiBubyBlbGVtZW50IHdhcyBwcm92aWRlZCcpO1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3koZmFsc2UpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFyZW50ID0gdGhpcy5lbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5wYXJlbnQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0dXRvcmlhbC1lbGVtZW50Jyk7XHJcbiAgICAgICAgaWYgKCF0aGlzLmN1cnRhaW4pIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJ0YWluID0gdGhpcy5nZXRDdXJ0YWluKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKHRoaXMuY3VydGFpbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKHRoaXMuZ2V0UHJvbXB0KHN0ZXApKTtcclxuICAgICAgICB0aGlzLmZpeEVsZW1lbnRBbmRQcm9tcHQoKTtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnV0aWxzLnNjcm9sbFRvRWxlbWVudCh0aGlzLmVsZW1lbnQsICdjZW50ZXInKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoc3RlcC5hdXRvcmVhZCAmJiB0aGlzLnR0cy5pc1N1cHBvcnRlZClcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVSZWFkKCk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdGVwLm9uRW50ZXIgPT09ICdmdW5jdGlvbicpXHJcbiAgICAgICAgICAgIHN0ZXAub25FbnRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RWxlbWVudEJ5U3RhZ2Uoc3RhZ2U6IFR1dG9yaWFsU3RhZ2UpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBzdGFnZS5lbGVtZW50O1xyXG4gICAgICAgIGlmICghZWxlbWVudClcclxuICAgICAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc3RhZ2Uuc2VsZWN0b3IpW3N0YWdlLnNlbGVjdG9ySW5kZXggfHwgMF0gYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRDdXJ0YWluKCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICBsZXQgY3VydGFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGN1cnRhaW4uY2xhc3NOYW1lID0gJ3R1dG9yaWFsLWN1cnRhaW4nO1xyXG4gICAgICAgIHJldHVybiBjdXJ0YWluO1xyXG4gICAgfVxyXG5cclxuICAgIGZpeEVsZW1lbnRBbmRQcm9tcHQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudCkge1xyXG4gICAgICAgICAgICBsZXQgZWxtU3R5bGUgPSB0aGlzLnByb21wdC5zdHlsZTtcclxuICAgICAgICAgICAgbGV0IHRvcCA9IC0xNSwgbGVmdCA9IC0yMDtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50ICYmIHRoaXMuc3RlcHNbdGhpcy5jdXJyZW50U3RlcF0uZml4TWFyZ2luKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwY3MgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMucGFyZW50KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1iID0gdGhpcy51dGlscy5nZXRGb3JtYXR0ZWREaW0ocGNzLm1hcmdpbkJvdHRvbSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWIuc3VmZml4ID09PSAncHgnKVxyXG4gICAgICAgICAgICAgICAgICAgIHRvcCArPSBtYi5zaXplO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWwgPSB0aGlzLnV0aWxzLmdldEZvcm1hdHRlZERpbShwY3MubWFyZ2luTGVmdCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWwuc3VmZml4ID09PSAncHgnKVxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQgKz0gbWwuc2l6ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zdGVwc1t0aGlzLmN1cnJlbnRTdGVwXS50b3ApXHJcbiAgICAgICAgICAgICAgICBlbG1TdHlsZS50b3AgPSB0aGlzLnN0ZXBzW3RoaXMuY3VycmVudFN0ZXBdLnRvcDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgZWxtU3R5bGUudG9wID0gdG9wICsgJ3B4JztcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RlcHNbdGhpcy5jdXJyZW50U3RlcF0ubGVmdClcclxuICAgICAgICAgICAgICAgIGVsbVN0eWxlLmxlZnQgPSB0aGlzLnN0ZXBzW3RoaXMuY3VycmVudFN0ZXBdLmxlZnQ7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGVsbVN0eWxlLmxlZnQgPSBsZWZ0ICsgJ3B4JztcclxuICAgICAgICAgICAgZWxtU3R5bGUuekluZGV4ID0gJzIwMDUnO1xyXG4gICAgICAgICAgICBlbG1TdHlsZS5wYWRkaW5nVG9wID0gKHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgKyAxNSkgKyAncHgnO1xyXG4gICAgICAgICAgICBsZXQgdyA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RlcHNbdGhpcy5jdXJyZW50U3RlcF0uZml4UGFkZGluZykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxtQ1N0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLnByb21wdCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYWRkaW5nTGVmdCA9IHRoaXMudXRpbHMuZ2V0Rm9ybWF0dGVkRGltKGVsbUNTdHlsZS5wYWRkaW5nTGVmdCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFkZGluZ0xlZnQgJiYgcGFkZGluZ0xlZnQuc2l6ZSlcclxuICAgICAgICAgICAgICAgICAgICB3ICs9IHBhZGRpbmdMZWZ0LnNpemU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYWRkaW5nUmlnaHQgPSB0aGlzLnV0aWxzLmdldEZvcm1hdHRlZERpbShlbG1DU3R5bGUucGFkZGluZ1JpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGlmIChwYWRkaW5nUmlnaHQgJiYgcGFkZGluZ1JpZ2h0LnNpemUpXHJcbiAgICAgICAgICAgICAgICAgICAgdyArPSBwYWRkaW5nUmlnaHQuc2l6ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZWxtU3R5bGUud2lkdGggPSB3ICsgJ3B4JztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRQcm9tcHQoc3RlcDogVHV0b3JpYWxTdGFnZSk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICB0aGlzLnByb21wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRoaXMucHJvbXB0LmNsYXNzTmFtZSA9ICd0dXRvcmlhbC1wcm9tcHQnO1xyXG5cclxuICAgICAgICBsZXQgaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBpbm5lci5jbGFzc05hbWUgPSAndHV0b3JpYWwtaW5uZXInO1xyXG4gICAgICAgIHRoaXMucHJvbXB0LmFwcGVuZENoaWxkKGlubmVyKTtcclxuXHJcblxyXG4gICAgICAgIGlmIChzdGVwLnRpdGxlKSB7XHJcbiAgICAgICAgICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgdGl0bGUuY2xhc3NOYW1lID0gJ3R1dG9yaWFsLXRpdGxlJztcclxuICAgICAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBzdGVwLnRpdGxlO1xyXG4gICAgICAgICAgICBpbm5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGVzYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBkZXNjLmNsYXNzTmFtZSA9ICd0dXRvcmlhbC1kZXNjJztcclxuICAgICAgICBkZXNjLmlubmVySFRNTCA9IHN0ZXAuZGVzYztcclxuICAgICAgICBpbm5lci5hcHBlbmRDaGlsZChkZXNjKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFN0ZXAgPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBwcmV2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgICAgIHByZXYuY2xhc3NOYW1lID0gJ3R1dG9yaWFsLXByZXYgdHV0b3JpYWwtYnRuJztcclxuICAgICAgICAgICAgcHJldi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucHJldi5iaW5kKHRoaXMpLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHByZXYudGV4dENvbnRlbnQgPSAncHJldmlvdXMnO1xyXG4gICAgICAgICAgICBpbm5lci5hcHBlbmRDaGlsZChwcmV2KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgbmV4dC5jbGFzc05hbWUgPSAndHV0b3JpYWwtbmV4dCB0dXRvcmlhbC1idG4nO1xyXG4gICAgICAgIG5leHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm5leHQuYmluZCh0aGlzKSwgZmFsc2UpO1xyXG4gICAgICAgIG5leHQudGV4dENvbnRlbnQgPSB0aGlzLmN1cnJlbnRTdGVwIDwgdGhpcy5zdGVwcy5sZW5ndGggLSAxID8gJ25leHQnIDogJ2RvbmUnO1xyXG4gICAgICAgIGlubmVyLmFwcGVuZENoaWxkKG5leHQpO1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIG5leHQuZm9jdXMoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGZvb3Rlci5jbGFzc05hbWUgPSAndHV0b3JpYWwtZm9vdGVyJztcclxuICAgICAgICBpbm5lci5hcHBlbmRDaGlsZChmb290ZXIpO1xyXG5cclxuICAgICAgICBsZXQgc3RlcHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgc3RlcHMuY2xhc3NOYW1lID0gJ3R1dG9yaWFsLXN0ZXBzJztcclxuICAgICAgICBzdGVwcy50ZXh0Q29udGVudCA9IGBzdGVwICR7dGhpcy5jdXJyZW50U3RlcCArIDF9IG9mICR7dGhpcy5zdGVwcy5sZW5ndGh9YDtcclxuICAgICAgICBmb290ZXIuYXBwZW5kQ2hpbGQoc3RlcHMpO1xyXG5cclxuICAgICAgICBsZXQgc2tpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBza2lwLmNsYXNzTmFtZSA9ICd0dXRvcmlhbC1za2lwJztcclxuICAgICAgICBza2lwLnRleHRDb250ZW50ID0gYHNraXBgO1xyXG4gICAgICAgIHNraXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmRlc3Ryb3kuYmluZCh0aGlzLCBbZmFsc2VdKSwgZmFsc2UpO1xyXG4gICAgICAgIGZvb3Rlci5hcHBlbmRDaGlsZChza2lwKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudHRzLmlzU3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgIGxldCByZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgICAgIHJlYWQuY2xhc3NOYW1lID0gJ3R1dG9yaWFsLXJlYWQnO1xyXG4gICAgICAgICAgICByZWFkLnRleHRDb250ZW50ID0gV2Fsa3Rocm91Z2gucmVhZFRleHQ7XHJcbiAgICAgICAgICAgIHJlYWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZVJlYWQuYmluZCh0aGlzKSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBmb290ZXIuYXBwZW5kQ2hpbGQocmVhZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnByb21wdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZUN1cnJlbnRQcm9tcHQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvbXB0KVxyXG4gICAgICAgICAgICB0aGlzLnBhcmVudC5yZW1vdmVDaGlsZCh0aGlzLnByb21wdCk7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMucHJvbXB0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlQ3VycmVudEN1cnRhaW4oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VydGFpbikge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnRhaW4uY2xhc3NMaXN0LmFkZCgnZW5kJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJ0YWluLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5jdXJ0YWluKTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmN1cnRhaW47XHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xlYXJDdXJyZW50RWxlbWVudCgpIHtcclxuICAgICAgICBpZiAodGhpcy5lbGVtZW50ICYmIHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3R1dG9yaWFsLWVsZW1lbnQnKTtcclxuICAgICAgICBkZWxldGUgdGhpcy5lbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xlYXJDU1MoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3R5bGUgJiYgdGhpcy5zdHlsZS5wYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3R5bGUucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLnN0eWxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuc3R5bGU7XHJcbiAgICB9XHJcblxyXG4gICAgaW5qZWN0Q3NzKGZvcmNlID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc3R5bGUgfHwgZm9yY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhckNTUygpO1xyXG4gICAgICAgICAgICBsZXQgY3NzID1cclxuICAgICAgICAgICAgICAgIGAudHV0b3JpYWwtY3VydGFpbiB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICAgICAgICAgICAgICB0b3A6IDA7XHJcbiAgICAgICAgICAgICAgICBsZWZ0OiAwO1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMHZ3O1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDB2aDtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gICAgICAgICAgICAgICAgei1pbmRleDogMjAwMDtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogY3VydGFpbi1hbmltYXRpb24gJHtXYWxrdGhyb3VnaC5hbmltYXRpb25EdXJhdGlvbn1tcyBlYXNlLW91dCBmb3J3YXJkcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAudHV0b3JpYWwtY3VydGFpbi5lbmQge1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGN1cnRhaW4tZW5kLWFuaW1hdGlvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBAa2V5ZnJhbWVzIGN1cnRhaW4tYW5pbWF0aW9uIHtcclxuICAgICAgICAgICAgICAgIGZyb20ge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdG8ge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMCwwLDAsMC43KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBAa2V5ZnJhbWVzIGN1cnRhaW4tZW5kLWFuaW1hdGlvbiB7XHJcbiAgICAgICAgICAgICAgICBmcm9tIHtcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuNyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0byB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLnR1dG9yaWFsLWVsZW1lbnQge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogI2ZmZjtcclxuICAgICAgICAgICAgICAgIHotaW5kZXg6IDIwMTA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLnR1dG9yaWFsLXByb21wdCB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICAgICAgICAgICAgICAgei1pbmRleDogMjAxMDtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDE1cHggMjBweDtcclxuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAudHV0b3JpYWwtaW5uZXIge1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZzogMTBweCAxNXB4O1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjcpO1xyXG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICAgICAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAudHV0b3JpYWwtdGl0bGUge1xyXG4gICAgICAgICAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICAgICAgICAgICAgICAgIG1hcmdpbjogMDtcclxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTdweDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAudHV0b3JpYWwtYnRuIHtcclxuICAgICAgICAgICAgICAgIGJvcmRlcjogc29saWQgMXB4ICMwMDAwMDA7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogIzAwMDAwMDtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiA1cHggMTBweDtcclxuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XHJcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICAgICAgICAgICAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAudHV0b3JpYWwtcHJldiB7XHJcbiAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDE1cHg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLnR1dG9yaWFsLWRlc2Mge1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgICAgICAgICAgICAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLnR1dG9yaWFsLWZvb3RlciB7XHJcbiAgICAgICAgICAgICAgICBtYXJnaW4tdG9wOiA4cHg7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nLXRvcDogOHB4O1xyXG4gICAgICAgICAgICAgICAgYm9yZGVyLXRvcDogc29saWQgMXB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KTtcclxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTFweDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAudHV0b3JpYWwtc2tpcCB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxuICAgICAgICAgICAgICAgIGZsb2F0OiByaWdodDtcclxuICAgICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAudHV0b3JpYWwtcmVhZCB7XHJcbiAgICAgICAgICAgICAgICBmbG9hdDogcmlnaHQ7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxuICAgICAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIycHg7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDE2cHg7XHJcbiAgICAgICAgICAgICAgICBsaW5lLWhlaWdodDogMjJweDtcclxuICAgICAgICAgICAgICAgIHRvcDogLTFweDtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICAgICAgfWA7XHJcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB0aGlzLnV0aWxzLmluamVjdFN0eWxlKGNzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRXhpdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGVwcyAmJiB0aGlzLnN0ZXBzW3RoaXMuY3VycmVudFN0ZXBdICYmIHR5cGVvZiB0aGlzLnN0ZXBzW3RoaXMuY3VycmVudFN0ZXBdLm9uRXhpdCA9PT0gJ2Z1bmN0aW9uJylcclxuICAgICAgICAgICAgdGhpcy5zdGVwc1t0aGlzLmN1cnJlbnRTdGVwXS5vbkV4aXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZXh0KCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQ3VycmVudFByb21wdCgpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJDdXJyZW50RWxlbWVudCgpO1xyXG4gICAgICAgIHRoaXMub25FeGl0KCk7XHJcbiAgICAgICAgaWYgKCsrdGhpcy5jdXJyZW50U3RlcCA8IHRoaXMuc3RlcHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHRzLmNhbmNlbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmRlcGxveVN0ZXAodGhpcy5zdGVwc1t0aGlzLmN1cnJlbnRTdGVwXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyB0aGlzLnJlbW92ZUN1cnJlbnRQYXJlbnQoKTtcclxuICAgICAgICAgICAgdGhpcy5kZXN0cm95KHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcmV2KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTdGVwID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUN1cnJlbnRQcm9tcHQoKTtcclxuICAgICAgICAgICAgdGhpcy5jbGVhckN1cnJlbnRFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIHRoaXMub25FeGl0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudHRzLmNhbmNlbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmRlcGxveVN0ZXAodGhpcy5zdGVwc1stLXRoaXMuY3VycmVudFN0ZXBdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlUmVhZCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMudHRzLmlzU3VwcG9ydGVkKSByZXR1cm47XHJcbiAgICAgICAgY29uc3Qgc3RlcCA9IHRoaXMuc3RlcHNbdGhpcy5jdXJyZW50U3RlcF07XHJcbiAgICAgICAgaWYgKHN0ZXAgJiYgdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgZWxlbSA9IHRoaXMucGFyZW50LnF1ZXJ5U2VsZWN0b3IoJy50dXRvcmlhbC1pbm5lciAudHV0b3JpYWwtcmVhZCcpO1xyXG4gICAgICAgICAgICBpZiAoZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR0cy5jYW5jZWwoKTtcclxuICAgICAgICAgICAgICAgIGVsZW0udGV4dENvbnRlbnQgPSBXYWxrdGhyb3VnaC5yZWFkVGV4dDtcclxuICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2F5ID0gc3RlcC50aXRsZSA/IHN0ZXAudGl0bGUgKyAnICcgOiAnJztcclxuICAgICAgICAgICAgICAgIHNheSArPSB0aGlzLnV0aWxzLmdldFRleHRDb250ZW50KHN0ZXAuZGVzYyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR0cy5zYXkoc2F5KS5zdWJzY3JpYmUoKCkgPT4gZWxlbS50ZXh0Q29udGVudCA9IFdhbGt0aHJvdWdoLnJlYWRUZXh0KTtcclxuICAgICAgICAgICAgICAgIGVsZW0udGV4dENvbnRlbnQgPSBXYWxrdGhyb3VnaC5zdG9wUmVhZFRleHQ7XHJcbiAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3koaW5jcmVtZW50Q291bnRlcjogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQ3VycmVudFByb21wdCgpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQ3VycmVudEN1cnRhaW4oKTtcclxuICAgICAgICB0aGlzLmNsZWFyQ3VycmVudEVsZW1lbnQoKTtcclxuICAgICAgICB0aGlzLm9uRXhpdCgpO1xyXG4gICAgICAgIHRoaXMudHRzLmNhbmNlbCgpO1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmlkZW50aWZpZXIgJiYgaW5jcmVtZW50Q291bnRlcilcclxuICAgICAgICAgICAgdGhpcy5zdG9yYWdlQ29udGFpbmVyLmlkZW50aWZpZXJzW3RoaXMub3B0aW9ucy5pZGVudGlmaWVyXS5jb3VudGVyKys7XHJcbiAgICAgICAgdGhpcy5zZXRTdG9yYWdlQ29udGFpbmVyKCk7XHJcbiAgICAgICAgc2V0VGltZW91dCh0aGlzLmNsZWFyQ1NTLmJpbmQodGhpcyksIFdhbGt0aHJvdWdoLmFuaW1hdGlvbkR1cmF0aW9uKTtcclxuICAgICAgICBpZiAodGhpcy5vbkVuZClcclxuICAgICAgICAgICAgdGhpcy5vbkVuZC5uZXh0KHRydWUpO1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmZpeEVsZW1lbnRBbmRQcm9tcHQuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmRlY2xhcmUgdmFyIHNlbGY6IGFueTtcclxuZGVjbGFyZSB2YXIgZ2xvYmFsOiBhbnk7XHJcbmdsb2JhbCA9IGdsb2JhbCB8fCBzZWxmO1xyXG5pZiAoZ2xvYmFsKVxyXG4gICAgZ2xvYmFsWydXYWxrdGhyb3VnaCddID0gV2Fsa3Rocm91Z2g7Il19