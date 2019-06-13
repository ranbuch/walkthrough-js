"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextToSpeechService = void 0;

var _rxjs = require("rxjs");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TextToSpeechService =
/*#__PURE__*/
function () {
  function TextToSpeechService(utils) {
    _classCallCheck(this, TextToSpeechService);

    this.utils = utils;

    _defineProperty(this, "isSupported", void 0);

    _defineProperty(this, "voice", void 0);

    _defineProperty(this, "voiceURI", void 0);

    this.isSupported = 'SpeechSynthesisUtterance' in window;
  }

  _createClass(TextToSpeechService, [{
    key: "say",
    value: function say(text) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var sub = new _rxjs.Subject();
      if (options.isHTML) text = this.utils.getTextContent(text);
      if (!this.isSupported) sub.next(null);
      var msg = new SpeechSynthesisUtterance();

      if (this.voice) {
        msg.voice = this.voice;

        if (this.voiceURI) {
          msg['voiceURI'] = this.voiceURI;
        }
      }

      msg.volume = 1; // 0 to 1

      msg.rate = 1; // 0.1 to 10

      msg.pitch = 2; // 0 to 2

      msg.text = text;
      msg.lang = 'en-US';

      msg.onend = function () {
        sub.next(options.id);
      };

      speechSynthesis.speak(msg);
      return sub;
    }
  }, {
    key: "cancel",
    value: function cancel() {
      if (this.isSupported) speechSynthesis.cancel();
    }
  }]);

  return TextToSpeechService;
}();

exports.TextToSpeechService = TextToSpeechService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXh0VG9TcGVlY2gudHMiXSwibmFtZXMiOlsiVGV4dFRvU3BlZWNoU2VydmljZSIsInV0aWxzIiwiaXNTdXBwb3J0ZWQiLCJ3aW5kb3ciLCJ0ZXh0Iiwib3B0aW9ucyIsInN1YiIsIlN1YmplY3QiLCJpc0hUTUwiLCJnZXRUZXh0Q29udGVudCIsIm5leHQiLCJtc2ciLCJTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UiLCJ2b2ljZSIsInZvaWNlVVJJIiwidm9sdW1lIiwicmF0ZSIsInBpdGNoIiwibGFuZyIsIm9uZW5kIiwiaWQiLCJzcGVlY2hTeW50aGVzaXMiLCJzcGVhayIsImNhbmNlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOzs7Ozs7Ozs7O0lBRWFBLG1COzs7QUFJVCwrQkFDWUMsS0FEWixFQUVFO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQ0UsU0FBS0MsV0FBTCxHQUFtQiw4QkFBOEJDLE1BQWpEO0FBQ0g7Ozs7d0JBRVVDLEksRUFBcUU7QUFBQSxVQUF2REMsT0FBdUQsdUVBQXhCLEVBQXdCO0FBQzVFLFVBQUlDLEdBQUcsR0FBRyxJQUFJQyxhQUFKLEVBQVY7QUFDQSxVQUFJRixPQUFPLENBQUNHLE1BQVosRUFDSUosSUFBSSxHQUFHLEtBQUtILEtBQUwsQ0FBV1EsY0FBWCxDQUEwQkwsSUFBMUIsQ0FBUDtBQUNKLFVBQUksQ0FBQyxLQUFLRixXQUFWLEVBQ0lJLEdBQUcsQ0FBQ0ksSUFBSixDQUFTLElBQVQ7QUFDSixVQUFJQyxHQUFHLEdBQUcsSUFBSUMsd0JBQUosRUFBVjs7QUFDQSxVQUFJLEtBQUtDLEtBQVQsRUFBZ0I7QUFDWkYsUUFBQUEsR0FBRyxDQUFDRSxLQUFKLEdBQVksS0FBS0EsS0FBakI7O0FBQ0EsWUFBSSxLQUFLQyxRQUFULEVBQW1CO0FBQ2ZILFVBQUFBLEdBQUcsQ0FBQyxVQUFELENBQUgsR0FBa0IsS0FBS0csUUFBdkI7QUFDSDtBQUNKOztBQUNESCxNQUFBQSxHQUFHLENBQUNJLE1BQUosR0FBYSxDQUFiLENBYjRFLENBYTVEOztBQUNoQkosTUFBQUEsR0FBRyxDQUFDSyxJQUFKLEdBQVcsQ0FBWCxDQWQ0RSxDQWM5RDs7QUFDZEwsTUFBQUEsR0FBRyxDQUFDTSxLQUFKLEdBQVksQ0FBWixDQWY0RSxDQWU3RDs7QUFDZk4sTUFBQUEsR0FBRyxDQUFDUCxJQUFKLEdBQVdBLElBQVg7QUFDQU8sTUFBQUEsR0FBRyxDQUFDTyxJQUFKLEdBQVcsT0FBWDs7QUFFQVAsTUFBQUEsR0FBRyxDQUFDUSxLQUFKLEdBQVksWUFBTTtBQUNkYixRQUFBQSxHQUFHLENBQUNJLElBQUosQ0FBU0wsT0FBTyxDQUFDZSxFQUFqQjtBQUNILE9BRkQ7O0FBSUFDLE1BQUFBLGVBQWUsQ0FBQ0MsS0FBaEIsQ0FBc0JYLEdBQXRCO0FBQ0EsYUFBT0wsR0FBUDtBQUNIOzs7NkJBRVE7QUFDTCxVQUFJLEtBQUtKLFdBQVQsRUFDSW1CLGVBQWUsQ0FBQ0UsTUFBaEI7QUFDUCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFV0aWxzU2VydmljZSB9IGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgeyBUZXh0VG9TcGVlY2hPcHRpb25zIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dFRvU3BlZWNoU2VydmljZSB7XHJcbiAgICBwdWJsaWMgaXNTdXBwb3J0ZWQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIHZvaWNlOiBhbnk7XHJcbiAgICBwcml2YXRlIHZvaWNlVVJJOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHV0aWxzOiBVdGlsc1NlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuaXNTdXBwb3J0ZWQgPSAnU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlJyBpbiB3aW5kb3c7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNheSh0ZXh0OiBzdHJpbmcsIG9wdGlvbnM6IFRleHRUb1NwZWVjaE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8T2JqZWN0PiB7XHJcbiAgICAgICAgbGV0IHN1YiA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuaXNIVE1MKVxyXG4gICAgICAgICAgICB0ZXh0ID0gdGhpcy51dGlscy5nZXRUZXh0Q29udGVudCh0ZXh0KTtcclxuICAgICAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWQpXHJcbiAgICAgICAgICAgIHN1Yi5uZXh0KG51bGwpO1xyXG4gICAgICAgIGxldCBtc2cgPSBuZXcgU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlKCkgYXMgYW55O1xyXG4gICAgICAgIGlmICh0aGlzLnZvaWNlKSB7XHJcbiAgICAgICAgICAgIG1zZy52b2ljZSA9IHRoaXMudm9pY2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZvaWNlVVJJKSB7XHJcbiAgICAgICAgICAgICAgICBtc2dbJ3ZvaWNlVVJJJ10gPSB0aGlzLnZvaWNlVVJJO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1zZy52b2x1bWUgPSAxOyAvLyAwIHRvIDFcclxuICAgICAgICBtc2cucmF0ZSA9IDE7IC8vIDAuMSB0byAxMFxyXG4gICAgICAgIG1zZy5waXRjaCA9IDI7IC8vIDAgdG8gMlxyXG4gICAgICAgIG1zZy50ZXh0ID0gdGV4dDtcclxuICAgICAgICBtc2cubGFuZyA9ICdlbi1VUyc7XHJcblxyXG4gICAgICAgIG1zZy5vbmVuZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgc3ViLm5leHQob3B0aW9ucy5pZCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc3BlZWNoU3ludGhlc2lzLnNwZWFrKG1zZyk7XHJcbiAgICAgICAgcmV0dXJuIHN1YjtcclxuICAgIH1cclxuXHJcbiAgICBjYW5jZWwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNTdXBwb3J0ZWQpXHJcbiAgICAgICAgICAgIHNwZWVjaFN5bnRoZXNpcy5jYW5jZWwoKTtcclxuICAgIH1cclxufSJdfQ==