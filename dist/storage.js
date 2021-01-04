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
      try {
        return self.localStorage.hasOwnProperty(key);
      } catch (e) {
        return false;
      }
    }
  }, {
    key: "set",
    value: function set(key, value) {
      self.localStorage.setItem(key, JSON.stringify(value));
    }
  }, {
    key: "get",
    value: function get(key) {
      try {
        var item = window.localStorage.getItem(key);

        try {
          return JSON.parse(item);
        } catch (e) {
          return item;
        }
      } catch (e) {}
    }
  }, {
    key: "clear",
    value: function clear() {
      try {
        self.localStorage.clear();
      } catch (e) {}
    }
  }, {
    key: "remove",
    value: function remove(key) {
      try {
        self.localStorage.removeItem(key);
      } catch (e) {}
    }
  }, {
    key: "isSupported",
    value: function isSupported() {
      var test = '_test';

      try {
        self.localStorage.setItem(test, test);
        self.localStorage.removeItem(test);
        return true;
      } catch (e) {
        return false;
      }
    }
  }]);

  return StorageService;
}();

exports.StorageService = StorageService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zdG9yYWdlLnRzIl0sIm5hbWVzIjpbIlN0b3JhZ2VTZXJ2aWNlIiwia2V5Iiwic2VsZiIsImxvY2FsU3RvcmFnZSIsImhhc093blByb3BlcnR5IiwiZSIsInZhbHVlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJpdGVtIiwid2luZG93IiwiZ2V0SXRlbSIsInBhcnNlIiwiY2xlYXIiLCJyZW1vdmVJdGVtIiwidGVzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUFhQSxjOzs7Ozs7Ozs7d0JBQ0xDLEcsRUFBc0I7QUFDdEIsVUFBSTtBQUNBLGVBQU9DLElBQUksQ0FBQ0MsWUFBTCxDQUFrQkMsY0FBbEIsQ0FBaUNILEdBQWpDLENBQVA7QUFDSCxPQUZELENBR0EsT0FBT0ksQ0FBUCxFQUFVO0FBQ04sZUFBTyxLQUFQO0FBQ0g7QUFDSjs7O3dCQUNHSixHLEVBQWFLLEssRUFBa0I7QUFDL0JKLE1BQUFBLElBQUksQ0FBQ0MsWUFBTCxDQUFrQkksT0FBbEIsQ0FBMEJOLEdBQTFCLEVBQStCTyxJQUFJLENBQUNDLFNBQUwsQ0FBZUgsS0FBZixDQUEvQjtBQUNIOzs7d0JBQ0dMLEcsRUFBa0I7QUFDbEIsVUFBSTtBQUNBLFlBQUlTLElBQUksR0FBR0MsTUFBTSxDQUFDUixZQUFQLENBQW9CUyxPQUFwQixDQUE0QlgsR0FBNUIsQ0FBWDs7QUFDQSxZQUFJO0FBQ0EsaUJBQU9PLElBQUksQ0FBQ0ssS0FBTCxDQUFXSCxJQUFYLENBQVA7QUFDSCxTQUZELENBR0EsT0FBT0wsQ0FBUCxFQUFVO0FBQ04saUJBQU9LLElBQVA7QUFDSDtBQUNKLE9BUkQsQ0FTQSxPQUFPTCxDQUFQLEVBQVUsQ0FBRztBQUNoQjs7OzRCQUNhO0FBQ1YsVUFBSTtBQUNBSCxRQUFBQSxJQUFJLENBQUNDLFlBQUwsQ0FBa0JXLEtBQWxCO0FBQ0gsT0FGRCxDQUdBLE9BQU9ULENBQVAsRUFBVSxDQUFHO0FBQ2hCOzs7MkJBQ01KLEcsRUFBbUI7QUFDdEIsVUFBSTtBQUNBQyxRQUFBQSxJQUFJLENBQUNDLFlBQUwsQ0FBa0JZLFVBQWxCLENBQTZCZCxHQUE3QjtBQUNILE9BRkQsQ0FHQSxPQUFPSSxDQUFQLEVBQVUsQ0FBRztBQUNoQjs7O2tDQUNhO0FBQ1YsVUFBSVcsSUFBSSxHQUFHLE9BQVg7O0FBQ0EsVUFBSTtBQUNBZCxRQUFBQSxJQUFJLENBQUNDLFlBQUwsQ0FBa0JJLE9BQWxCLENBQTBCUyxJQUExQixFQUFnQ0EsSUFBaEM7QUFDQWQsUUFBQUEsSUFBSSxDQUFDQyxZQUFMLENBQWtCWSxVQUFsQixDQUE2QkMsSUFBN0I7QUFDQSxlQUFPLElBQVA7QUFDSCxPQUpELENBSUUsT0FBT1gsQ0FBUCxFQUFVO0FBQ1IsZUFBTyxLQUFQO0FBQ0g7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBTdG9yYWdlU2VydmljZSB7XHJcbiAgICBoYXMoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2VsZi5sb2NhbFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoa2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHNlbGYubG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xyXG4gICAgfVxyXG4gICAgZ2V0KGtleTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7IH1cclxuICAgIH1cclxuICAgIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHNlbGYubG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7IH1cclxuICAgIH1cclxuICAgIHJlbW92ZShrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHNlbGYubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHsgfVxyXG4gICAgfVxyXG4gICAgaXNTdXBwb3J0ZWQoKSB7XHJcbiAgICAgICAgbGV0IHRlc3QgPSAnX3Rlc3QnO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHNlbGYubG9jYWxTdG9yYWdlLnNldEl0ZW0odGVzdCwgdGVzdCk7XHJcbiAgICAgICAgICAgIHNlbGYubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGVzdCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==