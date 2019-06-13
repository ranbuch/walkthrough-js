"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StorageService = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var StorageService =
/*#__PURE__*/
function () {
  function StorageService() {
    _classCallCheck(this, StorageService);
  }

  _createClass(StorageService, [{
    key: "has",
    value: function has(key) {
      return window.localStorage.hasOwnProperty(key);
    }
  }, {
    key: "set",
    value: function set(key, value) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, {
    key: "get",
    value: function get(key) {
      var item = window.localStorage.getItem(key);

      try {
        return JSON.parse(item);
      } catch (e) {
        return item;
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      window.localStorage.clear();
    }
  }, {
    key: "remove",
    value: function remove(key) {
      window.localStorage.removeItem(key);
    }
  }, {
    key: "isSupported",
    value: function isSupported() {
      var test = '_test';

      try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch (e) {
        return false;
      }
    }
  }]);

  return StorageService;
}();

exports.StorageService = StorageService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zdG9yYWdlLnRzIl0sIm5hbWVzIjpbIlN0b3JhZ2VTZXJ2aWNlIiwia2V5Iiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwiaGFzT3duUHJvcGVydHkiLCJ2YWx1ZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwiaXRlbSIsImdldEl0ZW0iLCJwYXJzZSIsImUiLCJjbGVhciIsInJlbW92ZUl0ZW0iLCJ0ZXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBQWFBLGM7Ozs7Ozs7Ozt3QkFDTEMsRyxFQUFzQjtBQUN0QixhQUFPQyxNQUFNLENBQUNDLFlBQVAsQ0FBb0JDLGNBQXBCLENBQW1DSCxHQUFuQyxDQUFQO0FBQ0g7Ozt3QkFDR0EsRyxFQUFhSSxLLEVBQWtCO0FBQy9CSCxNQUFBQSxNQUFNLENBQUNDLFlBQVAsQ0FBb0JHLE9BQXBCLENBQTRCTCxHQUE1QixFQUFpQ00sSUFBSSxDQUFDQyxTQUFMLENBQWVILEtBQWYsQ0FBakM7QUFDSDs7O3dCQUNHSixHLEVBQWtCO0FBQ2xCLFVBQUlRLElBQUksR0FBR1AsTUFBTSxDQUFDQyxZQUFQLENBQW9CTyxPQUFwQixDQUE0QlQsR0FBNUIsQ0FBWDs7QUFDQSxVQUFJO0FBQ0EsZUFBT00sSUFBSSxDQUFDSSxLQUFMLENBQVdGLElBQVgsQ0FBUDtBQUNILE9BRkQsQ0FHQSxPQUFPRyxDQUFQLEVBQVU7QUFDTixlQUFPSCxJQUFQO0FBQ0g7QUFDSjs7OzRCQUNhO0FBQ1ZQLE1BQUFBLE1BQU0sQ0FBQ0MsWUFBUCxDQUFvQlUsS0FBcEI7QUFDSDs7OzJCQUNNWixHLEVBQW1CO0FBQ3RCQyxNQUFBQSxNQUFNLENBQUNDLFlBQVAsQ0FBb0JXLFVBQXBCLENBQStCYixHQUEvQjtBQUNIOzs7a0NBQ2E7QUFDVixVQUFJYyxJQUFJLEdBQUcsT0FBWDs7QUFDQSxVQUFJO0FBQ0FaLFFBQUFBLFlBQVksQ0FBQ0csT0FBYixDQUFxQlMsSUFBckIsRUFBMkJBLElBQTNCO0FBQ0FaLFFBQUFBLFlBQVksQ0FBQ1csVUFBYixDQUF3QkMsSUFBeEI7QUFDQSxlQUFPLElBQVA7QUFDSCxPQUpELENBSUUsT0FBT0gsQ0FBUCxFQUFVO0FBQ1IsZUFBTyxLQUFQO0FBQ0g7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBTdG9yYWdlU2VydmljZSB7XHJcbiAgICBoYXMoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eShrZXkpO1xyXG4gICAgfVxyXG4gICAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcclxuICAgIH1cclxuICAgIGdldChrZXk6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlKGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XHJcbiAgICB9XHJcbiAgICBpc1N1cHBvcnRlZCgpIHtcclxuICAgICAgICBsZXQgdGVzdCA9ICdfdGVzdCc7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGVzdCwgdGVzdCk7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRlc3QpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=