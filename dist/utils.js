"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UtilsService = void 0;

var _interface = require("./interface");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UtilsService =
/*#__PURE__*/
function () {
  function UtilsService() {
    _classCallCheck(this, UtilsService);
  }

  _createClass(UtilsService, [{
    key: "getTextContent",
    value: function getTextContent(html) {
      var div = document.createElement('div');
      div.innerHTML = html;
      return div.textContent;
    }
  }, {
    key: "getFormattedDim",
    value: function getFormattedDim(value) {
      if (!value) return null;
      value = String(value);

      var returnBysuffix = function returnBysuffix(val, suffix) {
        return {
          size: parseFloat(val.substring(0, val.indexOf(suffix))),
          suffix: suffix
        };
      };

      if (value.indexOf('%') > -1) return returnBysuffix(value, '%');
      if (value.indexOf('px') > -1) return returnBysuffix(value, 'px');
      if (value.indexOf('em') > -1) return returnBysuffix(value, 'em');
      if (value.indexOf('rem') > -1) return returnBysuffix(value, 'rem');
      if (value.indexOf('pt') > -1) return returnBysuffix(value, 'pt');
      if (value === 'auto') return returnBysuffix(value, '');
    }
  }, {
    key: "scrollToElement",
    value: function scrollToElement(element) {
      var block = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'start';

      if (!element) {
        console.warn('Walkthrough: no element was provided to scroll to');
        return;
      }

      if (element.scrollIntoView) {
        var options = {
          behavior: 'smooth',
          block: block
        };
        element.scrollIntoView(options);
      } else {
        this.scrollTo(window.scrollY, element.offsetTop, document.body.scrollHeight / 50);
      }
    }
  }, {
    key: "scrollTo",
    value: function scrollTo() {
      var _this = this;

      var currentPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.scrollY;
      var finalPos = arguments.length > 1 ? arguments[1] : undefined;
      var increment = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.body.scrollHeight / 50;
      var counter = arguments.length > 3 ? arguments[3] : undefined;
      var asec = arguments.length > 4 ? arguments[4] : undefined;

      try {
        window.scroll({
          top: finalPos,
          // left: 0,
          behavior: 'smooth'
        });
        return;
      } catch (e) {}

      counter = counter ? counter + 1 : 1;
      asec = typeof asec === 'boolean' ? asec : currentPos > finalPos;
      if (asec) currentPos -= increment;else currentPos += increment;
      window.scrollTo(0, currentPos);
      if ((asec ? currentPos > finalPos : currentPos < finalPos) && counter < 50) setTimeout(function () {
        _this.scrollTo(currentPos, finalPos, increment, counter, asec);
      }, 10);
    }
  }, {
    key: "injectStyle",
    value: function injectStyle(css) {
      var innerOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _interface.InjectStyleOptions();
      var sheet = document.createElement('style');
      sheet.appendChild(document.createTextNode(css));
      if (innerOptions.className) sheet.classList.add(innerOptions.className);
      document.body.appendChild(sheet);
      return sheet;
    }
  }]);

  return UtilsService;
}();

exports.UtilsService = UtilsService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy50cyJdLCJuYW1lcyI6WyJVdGlsc1NlcnZpY2UiLCJodG1sIiwiZGl2IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwidGV4dENvbnRlbnQiLCJ2YWx1ZSIsIlN0cmluZyIsInJldHVybkJ5c3VmZml4IiwidmFsIiwic3VmZml4Iiwic2l6ZSIsInBhcnNlRmxvYXQiLCJzdWJzdHJpbmciLCJpbmRleE9mIiwiZWxlbWVudCIsImJsb2NrIiwiY29uc29sZSIsIndhcm4iLCJzY3JvbGxJbnRvVmlldyIsIm9wdGlvbnMiLCJiZWhhdmlvciIsInNjcm9sbFRvIiwid2luZG93Iiwic2Nyb2xsWSIsIm9mZnNldFRvcCIsImJvZHkiLCJzY3JvbGxIZWlnaHQiLCJjdXJyZW50UG9zIiwiZmluYWxQb3MiLCJpbmNyZW1lbnQiLCJjb3VudGVyIiwiYXNlYyIsInNjcm9sbCIsInRvcCIsImUiLCJzZXRUaW1lb3V0IiwiY3NzIiwiaW5uZXJPcHRpb25zIiwiSW5qZWN0U3R5bGVPcHRpb25zIiwic2hlZXQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVRleHROb2RlIiwiY2xhc3NOYW1lIiwiY2xhc3NMaXN0IiwiYWRkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7O0lBRWFBLFk7Ozs7Ozs7OzttQ0FDYUMsSSxFQUFzQjtBQUN4QyxVQUFJQyxHQUFHLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUF2QixDQUFWO0FBQ0FGLE1BQUFBLEdBQUcsQ0FBQ0csU0FBSixHQUFnQkosSUFBaEI7QUFDQSxhQUFPQyxHQUFHLENBQUNJLFdBQVg7QUFDSDs7O29DQUVzQkMsSyxFQUE2QjtBQUNoRCxVQUFJLENBQUNBLEtBQUwsRUFBWSxPQUFPLElBQVA7QUFFWkEsTUFBQUEsS0FBSyxHQUFHQyxNQUFNLENBQUNELEtBQUQsQ0FBZDs7QUFFQSxVQUFJRSxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLENBQUNDLEdBQUQsRUFBY0Ms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QVUsR0FBR0MsUUFBN0MsS0FBMERFLE9BQU8sR0FBRyxFQUF4RSxFQUNJSyxVQUFVLENBQUMsWUFBTTtBQUNiLFFBQUEsS0FBSSxDQUFDZCxRQUFMLENBQWNNLFVBQWQsRUFBMEJDLFFBQTFCLEVBQW9DQyxTQUFwQyxFQUErQ0MsT0FBL0MsRUFBd0RDLElBQXhEO0FBQ0gsT0FGUyxFQUVQLEVBRk8sQ0FBVjtBQUdQOzs7Z0NBRWtCSyxHLEVBQXdFO0FBQUEsVUFBM0RDLFlBQTJELHVFQUE1QyxJQUFJQyw2QkFBSixFQUE0QztBQUN2RixVQUFJQyxLQUFLLEdBQUd0QyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBWjtBQUNBcUMsTUFBQUEsS0FBSyxDQUFDQyxXQUFOLENBQWtCdkMsUUFBUSxDQUFDd0MsY0FBVCxDQUF3QkwsR0FBeEIsQ0FBbEI7QUFDQSxVQUFJQyxZQUFZLENBQUNLLFNBQWpCLEVBQ0lILEtBQUssQ0FBQ0ksU0FBTixDQUFnQkMsR0FBaEIsQ0FBb0JQLFlBQVksQ0FBQ0ssU0FBakM7QUFDSnpDLE1BQUFBLFFBQVEsQ0FBQ3dCLElBQVQsQ0FBY2UsV0FBZCxDQUEwQkQsS0FBMUI7QUFDQSxhQUFPQSxLQUFQO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtYXR0ZWREaW0sIEluamVjdFN0eWxlT3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBVdGlsc1NlcnZpY2Uge1xyXG4gICAgcHVibGljIGdldFRleHRDb250ZW50KGh0bWw6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGRpdi5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgICAgIHJldHVybiBkaXYudGV4dENvbnRlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEZvcm1hdHRlZERpbSh2YWx1ZTogc3RyaW5nKTogRm9ybWF0dGVkRGltIHtcclxuICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpO1xyXG5cclxuICAgICAgICB2YXIgcmV0dXJuQnlzdWZmaXggPSAodmFsOiBzdHJpbmcsIHN1ZmZpeDogc3RyaW5nKTogRm9ybWF0dGVkRGltID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHNpemU6IHBhcnNlRmxvYXQodmFsLnN1YnN0cmluZygwLCB2YWwuaW5kZXhPZihzdWZmaXgpKSksXHJcbiAgICAgICAgICAgICAgICBzdWZmaXg6IHN1ZmZpeFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZS5pbmRleE9mKCclJykgPiAtMSlcclxuICAgICAgICAgICAgcmV0dXJuIHJldHVybkJ5c3VmZml4KHZhbHVlLCAnJScpO1xyXG4gICAgICAgIGlmICh2YWx1ZS5pbmRleE9mKCdweCcpID4gLTEpXHJcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5CeXN1ZmZpeCh2YWx1ZSwgJ3B4Jyk7XHJcbiAgICAgICAgaWYgKHZhbHVlLmluZGV4T2YoJ2VtJykgPiAtMSlcclxuICAgICAgICAgICAgcmV0dXJuIHJldHVybkJ5c3VmZml4KHZhbHVlLCAnZW0nKTtcclxuICAgICAgICBpZiAodmFsdWUuaW5kZXhPZigncmVtJykgPiAtMSlcclxuICAgICAgICAgICAgcmV0dXJuIHJldHVybkJ5c3VmZml4KHZhbHVlLCAncmVtJyk7XHJcbiAgICAgICAgaWYgKHZhbHVlLmluZGV4T2YoJ3B0JykgPiAtMSlcclxuICAgICAgICAgICAgcmV0dXJuIHJldHVybkJ5c3VmZml4KHZhbHVlLCAncHQnKTtcclxuICAgICAgICBpZiAodmFsdWUgPT09ICdhdXRvJylcclxuICAgICAgICAgICAgcmV0dXJuIHJldHVybkJ5c3VmZml4KHZhbHVlLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNjcm9sbFRvRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCwgYmxvY2sgPSAnc3RhcnQnKSB7XHJcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignV2Fsa3Rocm91Z2g6IG5vIGVsZW1lbnQgd2FzIHByb3ZpZGVkIHRvIHNjcm9sbCB0bycpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlbGVtZW50LnNjcm9sbEludG9WaWV3KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IGJlaGF2aW9yOiAnc21vb3RoJywgYmxvY2s6IGJsb2NrIH0gYXMgU2Nyb2xsSW50b1ZpZXdPcHRpb25zO1xyXG4gICAgICAgICAgICBlbGVtZW50LnNjcm9sbEludG9WaWV3KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxUbyh3aW5kb3cuc2Nyb2xsWSwgZWxlbWVudC5vZmZzZXRUb3AsIGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0IC8gNTApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2Nyb2xsVG8oY3VycmVudFBvczogbnVtYmVyID0gd2luZG93LnNjcm9sbFksIGZpbmFsUG9zOiBudW1iZXIsIGluY3JlbWVudCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0IC8gNTAsIGNvdW50ZXI/OiBudW1iZXIsIGFzZWM/OiBib29sZWFuKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgd2luZG93LnNjcm9sbCh7XHJcbiAgICAgICAgICAgICAgICB0b3A6IGZpbmFsUG9zLFxyXG4gICAgICAgICAgICAgICAgLy8gbGVmdDogMCxcclxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgfVxyXG4gICAgICAgIGNvdW50ZXIgPSBjb3VudGVyID8gKGNvdW50ZXIgKyAxKSA6IDE7XHJcbiAgICAgICAgYXNlYyA9IHR5cGVvZiBhc2VjID09PSAnYm9vbGVhbicgPyBhc2VjIDogY3VycmVudFBvcyA+IGZpbmFsUG9zO1xyXG4gICAgICAgIGlmIChhc2VjKVxyXG4gICAgICAgICAgICBjdXJyZW50UG9zIC09IGluY3JlbWVudDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGN1cnJlbnRQb3MgKz0gaW5jcmVtZW50O1xyXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBjdXJyZW50UG9zKTtcclxuICAgICAgICBpZiAoKGFzZWMgPyBjdXJyZW50UG9zID4gZmluYWxQb3MgOiBjdXJyZW50UG9zIDwgZmluYWxQb3MpICYmIGNvdW50ZXIgPCA1MClcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvKGN1cnJlbnRQb3MsIGZpbmFsUG9zLCBpbmNyZW1lbnQsIGNvdW50ZXIsIGFzZWMpO1xyXG4gICAgICAgICAgICB9LCAxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluamVjdFN0eWxlKGNzczogc3RyaW5nLCBpbm5lck9wdGlvbnMgPSBuZXcgSW5qZWN0U3R5bGVPcHRpb25zKCkpOiBIVE1MU3R5bGVFbGVtZW50IHtcclxuICAgICAgICBsZXQgc2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG4gICAgICAgIHNoZWV0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xyXG4gICAgICAgIGlmIChpbm5lck9wdGlvbnMuY2xhc3NOYW1lKVxyXG4gICAgICAgICAgICBzaGVldC5jbGFzc0xpc3QuYWRkKGlubmVyT3B0aW9ucy5jbGFzc05hbWUpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2hlZXQpO1xyXG4gICAgICAgIHJldHVybiBzaGVldDtcclxuICAgIH1cclxufVxyXG4iXX0=