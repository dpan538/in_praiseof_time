/* Browser compatibility layer for Safari/WebKit, Edge, and crawlers. */
(function () {
  "use strict";

  var root = document.documentElement;
  var ua = navigator.userAgent || "";
  var isSafari = /^((?!chrome|android|crios|fxios|edg).)*safari/i.test(ua);
  var isEdge = /Edg\//.test(ua);

  root.classList.toggle("is-safari", isSafari);
  root.classList.toggle("is-edge", isEdge);

  if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function replaceAll(search, replacement) {
      var source = String(this);
      if (search instanceof RegExp) {
        if (!search.global) throw new TypeError("replaceAll called with a non-global RegExp");
        return source.replace(search, replacement);
      }
      return source.split(String(search)).join(String(replacement));
    };
  }

  if (!Element.prototype.closest) {
    Element.prototype.closest = function closest(selector) {
      var node = this;
      while (node && node.nodeType === 1) {
        if (node.matches && node.matches(selector)) return node;
        node = node.parentElement;
      }
      return null;
    };
  }

  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector;
  }

  if (!window.ResizeObserver) {
    window.ResizeObserver = function ResizeObserver(callback) {
      this.callback = callback;
      this.observe = function observe(target) {
        var observer = this;
        setTimeout(function () {
          observer.callback([{ target: target, contentRect: target.getBoundingClientRect() }]);
        }, 0);
      };
      this.unobserve = function unobserve() {};
      this.disconnect = function disconnect() {};
    };
  }

  if (!window.IntersectionObserver) {
    window.IntersectionObserver = function IntersectionObserver(callback) {
      this.observe = function observe(target) {
        callback([{ target: target, isIntersecting: true, intersectionRatio: 1 }]);
      };
      this.unobserve = function unobserve() {};
      this.disconnect = function disconnect() {};
    };
  }

  if (!window.PointerEvent) {
    var map = {
      pointerdown: "mousedown",
      pointermove: "mousemove",
      pointerup: "mouseup",
      pointercancel: "mouseup"
    };
    var add = EventTarget.prototype.addEventListener;

    function normalizePointerEvent(event) {
      var touch = event.touches && event.touches[0] || event.changedTouches && event.changedTouches[0];
      if (touch) {
        if (typeof event.clientX === "undefined") {
          Object.defineProperty(event, "clientX", { configurable: true, value: touch.clientX });
          Object.defineProperty(event, "clientY", { configurable: true, value: touch.clientY });
        }
        if (typeof event.pointerId === "undefined") {
          Object.defineProperty(event, "pointerId", { configurable: true, value: touch.identifier || 1 });
        }
      } else if (typeof event.pointerId === "undefined") {
        Object.defineProperty(event, "pointerId", { configurable: true, value: 1 });
      }
      return event;
    }

    function wrap(listener) {
      if (typeof listener !== "function") return listener;
      return function pointerFallbackListener(event) {
        return listener.call(this, normalizePointerEvent(event));
      };
    }

    EventTarget.prototype.addEventListener = function addEventListener(type, listener, options) {
      var wrapped = wrap(listener);
      add.call(this, map[type] || type, wrapped, options);
      if (type === "pointerup" || type === "pointercancel") {
        add.call(this, "touchend", wrapped, options);
      } else if (type === "pointerdown") {
        add.call(this, "touchstart", wrapped, options);
      } else if (type === "pointermove") {
        add.call(this, "touchmove", wrapped, options);
      }
    };
  }

  if (!Element.prototype.setPointerCapture) {
    Element.prototype.setPointerCapture = function setPointerCapture() {};
    Element.prototype.releasePointerCapture = function releasePointerCapture() {};
  }

  window.IN_PRAISE_BROWSER_COMPAT = {
    isSafari: isSafari,
    isEdge: isEdge,
    supportsMov: !!document.createElement("video").canPlayType("video/quicktime")
  };
})();
