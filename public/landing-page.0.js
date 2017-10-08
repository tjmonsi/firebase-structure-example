webpackJsonp([0],{

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _elementMixin = __webpack_require__(23);

__webpack_require__(85);

var _template2 = __webpack_require__(90);

var _template3 = _interopRequireDefault(_template2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LandingPage = function (_ElementMixin) {
  _inherits(LandingPage, _ElementMixin);

  function LandingPage() {
    _classCallCheck(this, LandingPage);

    return _possibleConstructorReturn(this, (LandingPage.__proto__ || Object.getPrototypeOf(LandingPage)).apply(this, arguments));
  }

  _createClass(LandingPage, [{
    key: 'template',
    value: function template() {
      return (0, _template3.default)(this);
    }
  }], [{
    key: 'is',
    get: function get() {
      return 'landing-page';
    }
  }]);

  return LandingPage;
}((0, _elementMixin.ElementMixin)(window.HTMLElement));

window.customElements.define(LandingPage.is, LandingPage);

/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _elementMixin = __webpack_require__(23);

var _a11yKeysMixin = __webpack_require__(86);

var _a11yKeysMixin2 = _interopRequireDefault(_a11yKeysMixin);

var _async = __webpack_require__(11);

var _template2 = __webpack_require__(87);

var _template3 = _interopRequireDefault(_template2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Utility = {
  distance: function distance(x1, y1, x2, y2) {
    var xDelta = x1 - x2;
    var yDelta = y1 - y2;

    return Math.sqrt(xDelta * xDelta + yDelta * yDelta);
  },

  now: window.performance && window.performance.now ? window.performance.now.bind(window.performance) : Date.now
};

/**
 * @param {HTMLElement} element
 * @constructor
 */
function ElementMetrics(element) {
  this.element = element;
  this.width = this.boundingRect.width;
  this.height = this.boundingRect.height;

  this.size = Math.max(this.width, this.height);
}

ElementMetrics.prototype = {
  get boundingRect() {
    return this.element.getBoundingClientRect();
  },

  furthestCornerDistanceFrom: function furthestCornerDistanceFrom(x, y) {
    var topLeft = Utility.distance(x, y, 0, 0);
    var topRight = Utility.distance(x, y, this.width, 0);
    var bottomLeft = Utility.distance(x, y, 0, this.height);
    var bottomRight = Utility.distance(x, y, this.width, this.height);

    return Math.max(topLeft, topRight, bottomLeft, bottomRight);
  }
};

/**
 * @param {HTMLElement} element
 * @constructor
 */
function Ripple(element) {
  this.element = element;
  this.color = window.getComputedStyle(element).color;

  this.wave = document.createElement('div');
  this.waveContainer = document.createElement('div');
  this.wave.style.backgroundColor = this.color;
  this.wave.classList.add('wave');
  this.waveContainer.classList.add('wave-container');
  this.waveContainer.appendChild(this.wave);

  this.resetInteractionState();
}

Ripple.MAX_RADIUS = 300;

Ripple.prototype = {
  get recenters() {
    return this.element.recenters;
  },

  get center() {
    return this.element.center;
  },

  get mouseDownElapsed() {
    var elapsed;

    if (!this.mouseDownStart) {
      return 0;
    }

    elapsed = Utility.now() - this.mouseDownStart;

    if (this.mouseUpStart) {
      elapsed -= this.mouseUpElapsed;
    }

    return elapsed;
  },

  get mouseUpElapsed() {
    return this.mouseUpStart ? Utility.now() - this.mouseUpStart : 0;
  },

  get mouseDownElapsedSeconds() {
    return this.mouseDownElapsed / 1000;
  },

  get mouseUpElapsedSeconds() {
    return this.mouseUpElapsed / 1000;
  },

  get mouseInteractionSeconds() {
    return this.mouseDownElapsedSeconds + this.mouseUpElapsedSeconds;
  },

  get initialOpacity() {
    return this.element.initialOpacity;
  },

  get opacityDecayVelocity() {
    return this.element.opacityDecayVelocity;
  },

  get radius() {
    var width2 = this.containerMetrics.width * this.containerMetrics.width;
    var height2 = this.containerMetrics.height * this.containerMetrics.height;
    var waveRadius = Math.min(Math.sqrt(width2 + height2), Ripple.MAX_RADIUS) * 1.1 + 5;

    var duration = 1.1 - 0.2 * (waveRadius / Ripple.MAX_RADIUS);
    var timeNow = this.mouseInteractionSeconds / duration;
    var size = waveRadius * (1 - Math.pow(80, -timeNow));

    return Math.abs(size);
  },

  get opacity() {
    if (!this.mouseUpStart) {
      return this.initialOpacity;
    }

    return Math.max(0, this.initialOpacity - this.mouseUpElapsedSeconds * this.opacityDecayVelocity);
  },

  get outerOpacity() {
    // Linear increase in background opacity, capped at the opacity
    // of the wavefront (waveOpacity).
    var outerOpacity = this.mouseUpElapsedSeconds * 0.3;
    var waveOpacity = this.opacity;

    return Math.max(0, Math.min(outerOpacity, waveOpacity));
  },

  get isOpacityFullyDecayed() {
    return this.opacity < 0.01 && this.radius >= Math.min(this.maxRadius, Ripple.MAX_RADIUS);
  },

  get isRestingAtMaxRadius() {
    return this.opacity >= this.initialOpacity && this.radius >= Math.min(this.maxRadius, Ripple.MAX_RADIUS);
  },

  get isAnimationComplete() {
    return this.mouseUpStart ? this.isOpacityFullyDecayed : this.isRestingAtMaxRadius;
  },

  get translationFraction() {
    return Math.min(1, this.radius / this.containerMetrics.size * 2 / Math.sqrt(2));
  },

  get xNow() {
    if (this.xEnd) {
      return this.xStart + this.translationFraction * (this.xEnd - this.xStart);
    }

    return this.xStart;
  },

  get yNow() {
    if (this.yEnd) {
      return this.yStart + this.translationFraction * (this.yEnd - this.yStart);
    }

    return this.yStart;
  },

  get isMouseDown() {
    return this.mouseDownStart && !this.mouseUpStart;
  },

  resetInteractionState: function resetInteractionState() {
    this.maxRadius = 0;
    this.mouseDownStart = 0;
    this.mouseUpStart = 0;

    this.xStart = 0;
    this.yStart = 0;
    this.xEnd = 0;
    this.yEnd = 0;
    this.slideDistance = 0;

    this.containerMetrics = new ElementMetrics(this.element);
  },

  draw: function draw() {
    var scale;
    // var translateString
    var dx;
    var dy;

    this.wave.style.opacity = this.opacity;

    scale = this.radius / (this.containerMetrics.size / 2);
    dx = this.xNow - this.containerMetrics.width / 2;
    dy = this.yNow - this.containerMetrics.height / 2;

    // 2d transform for safari because of border-radius and overflow:hidden clipping bug.
    // https://bugs.webkit.org/show_bug.cgi?id=98538
    this.waveContainer.style.webkitTransform = 'translate(' + dx + 'px, ' + dy + 'px)';
    this.waveContainer.style.transform = 'translate3d(' + dx + 'px, ' + dy + 'px, 0)';
    this.wave.style.webkitTransform = 'scale(' + scale + ',' + scale + ')';
    this.wave.style.transform = 'scale3d(' + scale + ',' + scale + ',1)';
  },

  /** @param {Event=} event */
  downAction: function downAction(event) {
    var xCenter = this.containerMetrics.width / 2;
    var yCenter = this.containerMetrics.height / 2;

    this.resetInteractionState();
    this.mouseDownStart = Utility.now();

    if (this.center) {
      this.xStart = xCenter;
      this.yStart = yCenter;
      this.slideDistance = Utility.distance(this.xStart, this.yStart, this.xEnd, this.yEnd);
    } else {
      var x = event && event.detail && event.detail.x ? event.detail.x : event.pageX;
      var y = event && event.detail && event.detail.y ? event.detail.y : event.pageY;
      this.xStart = x ? x - this.containerMetrics.boundingRect.left : this.containerMetrics.width / 2;
      this.yStart = y ? y - this.containerMetrics.boundingRect.top : this.containerMetrics.height / 2;
    }

    if (this.recenters) {
      this.xEnd = xCenter;
      this.yEnd = yCenter;
      this.slideDistance = Utility.distance(this.xStart, this.yStart, this.xEnd, this.yEnd);
    }

    this.maxRadius = this.containerMetrics.furthestCornerDistanceFrom(this.xStart, this.yStart);

    this.waveContainer.style.top = (this.containerMetrics.height - this.containerMetrics.size) / 2 + 'px';
    this.waveContainer.style.left = (this.containerMetrics.width - this.containerMetrics.size) / 2 + 'px';

    this.waveContainer.style.width = this.containerMetrics.size + 'px';
    this.waveContainer.style.height = this.containerMetrics.size + 'px';
  },

  /** @param {Event=} event */
  upAction: function upAction(event) {
    if (!this.isMouseDown) {
      return;
    }

    this.mouseUpStart = Utility.now();
  },

  remove: function remove() {
    this.waveContainer.parentNode.removeChild(this.waveContainer);
  }
};

var RippleEffect = function (_A11yKeysMixin) {
  _inherits(RippleEffect, _A11yKeysMixin);

  _createClass(RippleEffect, [{
    key: 'target',
    get: function get() {
      return this.keyEventTarget;
    }
  }], [{
    key: 'is',
    get: function get() {
      return 'ripple-effect';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        /**
         * The initial opacity set on the wave.
         *
         * @attribute initialOpacity
         * @type number
         * @default 0.25
         */
        initialOpacity: {
          type: Number,
          value: 0.25
        },

        /**
         * How fast (opacity per second) the wave fades out.
         *
         * @attribute opacityDecayVelocity
         * @type number
         * @default 0.8
         */
        opacityDecayVelocity: {
          type: Number,
          value: 0.8
        },

        /**
         * If true, ripples will exhibit a gravitational pull towards
         * the center of their container as they fade away.
         *
         * @attribute recenters
         * @type boolean
         * @default false
         */
        recenters: {
          type: Boolean,
          value: false
        },

        /**
         * If true, ripples will center inside its container
         *
         * @attribute recenters
         * @type boolean
         * @default false
         */
        center: {
          type: Boolean,
          value: false
        },

        /**
         * A list of the visual ripples.
         *
         * @attribute ripples
         * @type Array
         * @default []
         */
        ripples: {
          type: Array,
          value: function value() {
            return [];
          }
        },

        /**
         * True when there are visible ripples animating within the
         * element.
         */
        animating: {
          type: Boolean,
          readOnly: true,
          reflectToAttribute: true,
          value: false
        },

        /**
         * If true, the ripple will remain in the "down" state until `holdDown`
         * is set to false again.
         */
        holdDown: {
          type: Boolean,
          value: false,
          observer: '_holdDownChanged'
        },

        /**
         * If true, the ripple will not generate a ripple effect
         * via pointer interaction.
         * Calling ripple's imperative api like `simulatedRipple` will
         * still generate the ripple effect.
         */
        noink: {
          type: Boolean,
          value: false
        },

        _animating: {
          type: Boolean
        },

        _boundAnimate: {
          type: Function,
          value: function value() {
            return this.animate.bind(this);
          }
        }
      };
    }
  }]);

  function RippleEffect() {
    _classCallCheck(this, RippleEffect);

    var _this = _possibleConstructorReturn(this, (RippleEffect.__proto__ || Object.getPrototypeOf(RippleEffect)).call(this));

    _this.keyBindings = {
      'enter:keydown': '_onEnterKeydown',
      'space:keydown': '_onSpaceKeydown',
      'space:keyup': '_onSpaceKeyup'
    };
    _this._boundUiUpAction = _this.uiUpAction.bind(_this);
    _this._boundUiDownAction = _this.uiDownAction.bind(_this);
    return _this;
  }

  _createClass(RippleEffect, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      _get(RippleEffect.prototype.__proto__ || Object.getPrototypeOf(RippleEffect.prototype), 'connectedCallback', this).call(this);
      // Set up a11yKeysBehavior to listen to key events on the target,
      // so that space and enter activate the ripple even if the target doesn't
      // handle key events. The key handlers deal with `noink` themselves.
      if (this.parentNode.nodeType === 11) {
        // DOCUMENT_FRAGMENT_NODE
        this.keyEventTarget = this.getRootNode().host;
      } else {
        this.keyEventTarget = this.parentNode;
      }
      var keyEventTarget = /** @type {!EventTarget} */this.keyEventTarget;
      keyEventTarget.addEventListener('mouseup', this._boundUiUpAction);
      keyEventTarget.addEventListener('up', this._boundUiUpAction);
      keyEventTarget.addEventListener('down', this._boundUiDownAction);
      keyEventTarget.addEventListener('mousedown', this._boundUiDownAction);
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      this.keyEventTarget.removeEventListener('up', this._boundUiUpAction);
      this.keyEventTarget.removeEventListener('down', this._boundUiDownAction);
      this.keyEventTarget.removeEventListener('mouseup', this._boundUiUpAction);
      this.keyEventTarget.removeEventListener('mousedown', this._boundUiDownAction);
      this.keyEventTarget = null;
    }
  }, {
    key: 'template',
    value: function template() {
      return (0, _template3.default)();
    }
  }, {
    key: 'simulatedRipple',
    value: function simulatedRipple() {
      var _this2 = this;

      this.downAction(null);

      // Please see polymer/polymer#1305
      _async.timeOut.after(1).run(function () {
        _this2.upAction();
      });
      // this.async(, 1)
    }

    /**
     * Provokes a ripple down effect via a UI event,
     * respecting the `noink` property.
     * @param {Event=} event
     */

  }, {
    key: 'uiDownAction',
    value: function uiDownAction(event) {
      if (!this.noink) {
        this.downAction(event);
      }
    }

    /**
     * Provokes a ripple down effect via a UI event,
     * *not* respecting the `noink` property.
     * @param {Event=} event
     */

  }, {
    key: 'downAction',
    value: function downAction(event) {
      if (this.holdDown && this.ripples.length > 0) {
        return;
      }

      var ripple = this.addRipple();

      ripple.downAction(event);

      if (!this._animating) {
        this._animating = true;
        this.animate();
      }
    }

    /**
     * Provokes a ripple up effect via a UI event,
     * respecting the `noink` property.
     * @param {Event=} event
     */

  }, {
    key: 'uiUpAction',
    value: function uiUpAction(event) {
      if (!this.noink) {
        this.upAction(event);
      }
    }

    /**
     * Provokes a ripple up effect via a UI event,
     * *not* respecting the `noink` property.
     * @param {Event=} event
     */

  }, {
    key: 'upAction',
    value: function upAction(event) {
      if (this.holdDown) {
        return;
      }

      this.ripples.forEach(function (ripple) {
        ripple.upAction(event);
      });

      this._animating = true;
      this.animate();
    }
  }, {
    key: 'onAnimationComplete',
    value: function onAnimationComplete() {
      this._animating = false;
      this.shadowRoot.querySelector('#background').style.backgroundColor = null;
      this.dispatchEvent(new window.CustomEvent('transitionend'));
      // this.fire('transitionend')
    }
  }, {
    key: 'addRipple',
    value: function addRipple() {
      var ripple = new Ripple(this);

      this.shadowRoot.querySelector('#waves').appendChild(ripple.waveContainer);
      this.shadowRoot.querySelector('#background').style.backgroundColor = ripple.color;
      this.ripples.push(ripple);

      this._setAnimating(true);

      return ripple;
    }
  }, {
    key: 'removeRipple',
    value: function removeRipple(ripple) {
      var rippleIndex = this.ripples.indexOf(ripple);

      if (rippleIndex < 0) {
        return;
      }

      this.ripples.splice(rippleIndex, 1);

      ripple.remove();

      if (!this.ripples.length) {
        this._setAnimating(false);
      }
    }

    /**
     * This conflicts with Element#antimate().
     * https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
     * @suppress {checkTypes}
     */

  }, {
    key: 'animate',
    value: function animate() {
      if (!this._animating) {
        return;
      }
      var index;
      var ripple;

      for (index = 0; index < this.ripples.length; ++index) {
        ripple = this.ripples[index];

        ripple.draw();

        this.shadowRoot.querySelector('#background').style.opacity = ripple.outerOpacity;

        if (ripple.isOpacityFullyDecayed && !ripple.isRestingAtMaxRadius) {
          this.removeRipple(ripple);
        }
      }

      if (!this.shouldKeepAnimating && this.ripples.length === 0) {
        this.onAnimationComplete();
      } else {
        window.requestAnimationFrame(this._boundAnimate);
      }
    }
  }, {
    key: '_onEnterKeydown',
    value: function _onEnterKeydown() {
      this.uiDownAction();
      this.async(this.uiUpAction, 1);
    }
  }, {
    key: '_onSpaceKeydown',
    value: function _onSpaceKeydown() {
      this.uiDownAction();
    }
  }, {
    key: '_onSpaceKeyup',
    value: function _onSpaceKeyup() {
      this.uiUpAction();
    }

    // note: holdDown does not respect noink since it can be a focus based
    // effect.

  }, {
    key: '_holdDownChanged',
    value: function _holdDownChanged(newVal, oldVal) {
      if (oldVal === undefined) {
        return;
      }
      if (newVal) {
        this.downAction();
      } else {
        this.upAction();
      }
    }

    /**
    Fired when the animation finishes.
    This is useful if you want to wait until
    the ripple animation finishes to perform some action.
     @event transitionend
    @param {{node: Object}} detail Contains the animated node.
    */

  }, {
    key: 'shouldKeepAnimating',
    get: function get() {
      for (var index = 0; index < this.ripples.length; ++index) {
        if (!this.ripples[index].isAnimationComplete) {
          return true;
        }
      }
      return false;
    }
  }]);

  return RippleEffect;
}((0, _a11yKeysMixin2.default)((0, _elementMixin.ElementMixin)(window.HTMLElement)));

window.customElements.define(RippleEffect.is, RippleEffect);

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Chrome uses an older version of DOM Level 3 Keyboard Events
 *
 * Most keys are labeled as text, but some are Unicode codepoints.
 * Values taken from: http://www.w3.org/TR/2007/WD-DOM-Level-3-Events-20071221/keyset.html#KeySet-Set
 */
var KEY_IDENTIFIER = {
  'U+0008': 'backspace',
  'U+0009': 'tab',
  'U+001B': 'esc',
  'U+0020': 'space',
  'U+007F': 'del'
};
/**
 * Special table for KeyboardEvent.keyCode.
 * KeyboardEvent.keyIdentifier is better, and KeyBoardEvent.key is even better
 * than that.
 *
 * Values from: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent.keyCode#Value_of_keyCode
 */
var KEY_CODE = {
  8: 'backspace',
  9: 'tab',
  13: 'enter',
  27: 'esc',
  33: 'pageup',
  34: 'pagedown',
  35: 'end',
  36: 'home',
  32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  46: 'del',
  106: '*'
};
/**
 * MODIFIER_KEYS maps the short name for modifier keys used in a key
 * combo string to the property name that references those same keys
 * in a KeyboardEvent instance.
 */
var MODIFIER_KEYS = {
  'shift': 'shiftKey',
  'ctrl': 'ctrlKey',
  'alt': 'altKey',
  'meta': 'metaKey'
};
/**
 * KeyboardEvent.key is mostly represented by printable character made by
 * the keyboard, with unprintable keys labeled nicely.
 *
 * However, on OS X, Alt+char can make a Unicode character that follows an
 * Apple-specific mapping. In this case, we fall back to .keyCode.
 */
var KEY_CHAR = /[a-z0-9*]/;
/**
 * Matches a keyIdentifier string.
 */
var IDENT_CHAR = /U\+/;
/**
 * Matches arrow keys in Gecko 27.0+
 */
var ARROW_KEY = /^arrow/;
/**
 * Matches space keys everywhere (notably including IE10's exceptional name
 * `spacebar`).
 */
var SPACE_KEY = /^space(bar)?/;
/**
 * Matches ESC key.
 *
 * Value from: http://w3c.github.io/uievents-key/#key-Escape
 */
var ESC_KEY = /^escape$/;
/**
 * Transforms the key.
 * @param {string} key The KeyBoardEvent.key
 * @param {Boolean} [noSpecialChars] Limits the transformation to
 * alpha-numeric characters.
 */
function transformKey(key, noSpecialChars) {
  var validKey = '';
  if (key) {
    var lKey = key.toLowerCase();
    if (lKey === ' ' || SPACE_KEY.test(lKey)) {
      validKey = 'space';
    } else if (ESC_KEY.test(lKey)) {
      validKey = 'esc';
    } else if (lKey.length === 1) {
      if (!noSpecialChars || KEY_CHAR.test(lKey)) {
        validKey = lKey;
      }
    } else if (ARROW_KEY.test(lKey)) {
      validKey = lKey.replace('arrow', '');
    } else if (lKey === 'multiply') {
      // numpad '*' can map to Multiply on IE/Windows
      validKey = '*';
    } else {
      validKey = lKey;
    }
  }
  return validKey;
}

function transformKeyIdentifier(keyIdent) {
  var validKey = '';
  if (keyIdent) {
    if (keyIdent in KEY_IDENTIFIER) {
      validKey = KEY_IDENTIFIER[keyIdent];
    } else if (IDENT_CHAR.test(keyIdent)) {
      keyIdent = parseInt(keyIdent.replace('U+', '0x'), 16);
      validKey = String.fromCharCode(keyIdent).toLowerCase();
    } else {
      validKey = keyIdent.toLowerCase();
    }
  }
  return validKey;
}

function transformKeyCode(keyCode) {
  var validKey = '';
  if (Number(keyCode)) {
    if (keyCode >= 65 && keyCode <= 90) {
      // ascii a-z
      // lowercase is 32 offset from uppercase
      validKey = String.fromCharCode(32 + keyCode);
    } else if (keyCode >= 112 && keyCode <= 123) {
      // function keys f1-f12
      validKey = 'f' + (keyCode - 112 + 1);
    } else if (keyCode >= 48 && keyCode <= 57) {
      // top 0-9 keys
      validKey = String(keyCode - 48);
    } else if (keyCode >= 96 && keyCode <= 105) {
      // num pad 0-9
      validKey = String(keyCode - 96);
    } else {
      validKey = KEY_CODE[keyCode];
    }
  }
  return validKey;
}
/**
  * Calculates the normalized key for a KeyboardEvent.
  * @param {KeyboardEvent} keyEvent
  * @param {Boolean} [noSpecialChars] Set to true to limit keyEvent.key
  * transformation to alpha-numeric chars. This is useful with key
  * combinations like shift + 2, which on FF for MacOS produces
  * keyEvent.key = @
  * To get 2 returned, set noSpecialChars = true
  * To get @ returned, set noSpecialChars = false
  */
function normalizedKeyForEvent(keyEvent, noSpecialChars) {
  // Fall back from .key, to .detail.key for artifical keyboard events,
  // and then to deprecated .keyIdentifier and .keyCode.
  if (keyEvent.key) {
    return transformKey(keyEvent.key, noSpecialChars);
  }
  if (keyEvent.detail && keyEvent.detail.key) {
    return transformKey(keyEvent.detail.key, noSpecialChars);
  }
  return transformKeyIdentifier(keyEvent.keyIdentifier) || transformKeyCode(keyEvent.keyCode) || '';
}
function keyComboMatchesEvent(keyCombo, event) {
  // For combos with modifiers we support only alpha-numeric keys
  var keyEvent = normalizedKeyForEvent(event, keyCombo.hasModifiers);
  return keyEvent === keyCombo.key && (!keyCombo.hasModifiers || !!event.shiftKey === !!keyCombo.shiftKey && !!event.ctrlKey === !!keyCombo.ctrlKey && !!event.altKey === !!keyCombo.altKey && !!event.metaKey === !!keyCombo.metaKey);
}
function parseKeyComboString(keyComboString) {
  if (keyComboString.length === 1) {
    return {
      combo: keyComboString,
      key: keyComboString,
      event: 'keydown'
    };
  }
  return keyComboString.split('+').reduce(function (parsedKeyCombo, keyComboPart) {
    var eventParts = keyComboPart.split(':');
    var keyName = eventParts[0];
    var event = eventParts[1];
    if (keyName in MODIFIER_KEYS) {
      parsedKeyCombo[MODIFIER_KEYS[keyName]] = true;
      parsedKeyCombo.hasModifiers = true;
    } else {
      parsedKeyCombo.key = keyName;
      parsedKeyCombo.event = event || 'keydown';
    }
    return parsedKeyCombo;
  }, {
    combo: keyComboString.split(':').shift()
  });
}
function parseEventString(eventString) {
  return eventString.trim().split(' ').map(function (keyComboString) {
    return parseKeyComboString(keyComboString);
  });
}
/**
 * `Polymer.IronA11yKeysBehavior` provides a normalized interface for processing
 * keyboard commands that pertain to [WAI-ARIA best practices](http://www.w3.org/TR/wai-aria-practices/#kbd_general_binding).
 * The element takes care of browser differences with respect to Keyboard events
 * and uses an expressive syntax to filter key presses.
 *
 * Use the `keyBindings` prototype property to express what combination of keys
 * will trigger the callback. A key binding has the format
 * `"KEY+MODIFIER:EVENT": "callback"` (`"KEY": "callback"` or
 * `"KEY:EVENT": "callback"` are valid as well). Some examples:
 *
 *      keyBindings: {
 *        'space': '_onKeydown', // same as 'space:keydown'
 *        'shift+tab': '_onKeydown',
 *        'enter:keypress': '_onKeypress',
 *        'esc:keyup': '_onKeyup'
 *      }
 *
 * The callback will receive with an event containing the following information in `event.detail`:
 *
 *      _onKeydown: function(event) {
 *        console.log(event.detail.combo); // KEY+MODIFIER, e.g. "shift+tab"
 *        console.log(event.detail.key); // KEY only, e.g. "tab"
 *        console.log(event.detail.event); // EVENT, e.g. "keydown"
 *        console.log(event.detail.keyboardEvent); // the original KeyboardEvent
 *      }
 *
 * Use the `keyEventTarget` attribute to set up event handlers on a specific
 * node.
 *
 * See the [demo source code](https://github.com/PolymerElements/iron-a11y-keys-behavior/blob/master/demo/x-key-aware.html)
 * for an example.
 *
 * @demo demo/index.html
 * @polymerBehavior
 */

exports.default = function (superClass) {
  return function (_superClass) {
    _inherits(_class, _superClass);

    _createClass(_class, null, [{
      key: 'properties',
      get: function get() {
        return {
          /**
           * The EventTarget that will be firing relevant KeyboardEvents. Set it to
           * `null` to disable the listeners.
           * @type {?EventTarget}
           */
          keyEventTarget: {
            type: Object,
            value: function value() {
              return this;
            }
          },
          /**
           * If true, this property will cause the implementing element to
           * automatically stop propagation on any handled KeyboardEvents.
           */
          stopKeyboardEventPropagation: {
            type: Boolean,
            value: false
          },
          _boundKeyHandlers: {
            type: Array,
            value: function value() {
              return [];
            }
          },
          // We use this due to a limitation in IE10 where instances will have
          // own properties of everything on the "prototype".
          _imperativeKeyBindings: {
            type: Object,
            value: function value() {
              return {};
            }
          }
        };
      }
    }, {
      key: 'observers',
      get: function get() {
        return ['_resetKeyEventListeners(keyEventTarget, _boundKeyHandlers)'];
      }
    }]);

    function _class() {
      _classCallCheck(this, _class);

      /**
       * To be used to express what combination of keys  will trigger the relative
       * callback. e.g. `keyBindings: { 'esc': '_onEscPressed'}`
       * @type {!Object}
       */
      var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

      _this.keyBindings = {};
      return _this;
    }

    _createClass(_class, [{
      key: 'registered',
      value: function registered() {
        this._prepKeyBindings();
      }
    }, {
      key: 'connectedCallback',
      value: function connectedCallback() {
        _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'connectedCallback', this).call(this);
        this.registered();
        this._listenKeyEventListeners();
      }
    }, {
      key: 'disconnectedCallback',
      value: function disconnectedCallback() {
        _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'disconnectedCallback', this).call(this);
        this._unlistenKeyEventListeners();
      }

      /**
       * Can be used to imperatively add a key binding to the implementing
       * element. This is the imperative equivalent of declaring a keybinding
       * in the `keyBindings` prototype property.
       *
       * @param {string} eventString
       * @param {string} handlerName
       */

    }, {
      key: 'addOwnKeyBinding',
      value: function addOwnKeyBinding(eventString, handlerName) {
        this._imperativeKeyBindings[eventString] = handlerName;
        this._prepKeyBindings();
        this._resetKeyEventListeners();
      }

      /**
       * When called, will remove all imperatively-added key bindings.
       */

    }, {
      key: 'removeOwnKeyBindings',
      value: function removeOwnKeyBindings() {
        this._imperativeKeyBindings = {};
        this._prepKeyBindings();
        this._resetKeyEventListeners();
      }

      /**
       * Returns true if a keyboard event matches `eventString`.
       *
       * @param {KeyboardEvent} event
       * @param {string} eventString
       * @return {boolean}
       */

    }, {
      key: 'keyboardEventMatchesKeys',
      value: function keyboardEventMatchesKeys(event, eventString) {
        return _keyboardEventMatchesKeys(event, eventString);
      }
    }, {
      key: '_collectKeyBindings',
      value: function _collectKeyBindings() {
        var keyBindings = [this.keyBindings];
        // var keyBindings = this.behaviors.map(function (behavior) {
        //   return behavior.keyBindings
        // })

        if (keyBindings.indexOf(this.keyBindings) === -1) {
          keyBindings.push(this.keyBindings);
        }

        return keyBindings;
      }
    }, {
      key: '_prepKeyBindings',
      value: function _prepKeyBindings() {
        this._keyBindings = {};

        this._collectKeyBindings().forEach(function (keyBindings) {
          for (var eventString in keyBindings) {
            this._addKeyBinding(eventString, keyBindings[eventString]);
          }
        }, this);

        for (var eventString in this._imperativeKeyBindings) {
          this._addKeyBinding(eventString, this._imperativeKeyBindings[eventString]);
        }

        // Give precedence to combos with modifiers to be checked first.
        for (var eventName in this._keyBindings) {
          this._keyBindings[eventName].sort(function (kb1, kb2) {
            var b1 = kb1[0].hasModifiers;
            var b2 = kb2[0].hasModifiers;
            return b1 === b2 ? 0 : b1 ? -1 : 1;
          });
        }
      }
    }, {
      key: '_addKeyBinding',
      value: function _addKeyBinding(eventString, handlerName) {
        parseEventString(eventString).forEach(function (keyCombo) {
          this._keyBindings[keyCombo.event] = this._keyBindings[keyCombo.event] || [];

          this._keyBindings[keyCombo.event].push([keyCombo, handlerName]);
        }, this);
      }
    }, {
      key: '_resetKeyEventListeners',
      value: function _resetKeyEventListeners() {
        this._unlistenKeyEventListeners();

        if (this.isAttached) {
          this._listenKeyEventListeners();
        }
      }
    }, {
      key: '_listenKeyEventListeners',
      value: function _listenKeyEventListeners() {
        // console.log(this.keyEventTarget, this._keyBindings)
        if (!this.keyEventTarget) {
          return;
        }
        Object.keys(this._keyBindings).forEach(function (eventName) {
          var keyBindings = this._keyBindings[eventName];
          var boundKeyHandler = this._onKeyBindingEvent.bind(this, keyBindings);

          this._boundKeyHandlers.push([this.keyEventTarget, eventName, boundKeyHandler]);

          this.keyEventTarget.addEventListener(eventName, boundKeyHandler);
        }, this);
      }
    }, {
      key: '_unlistenKeyEventListeners',
      value: function _unlistenKeyEventListeners() {
        var keyHandlerTuple;
        var keyEventTarget;
        var eventName;
        var boundKeyHandler;

        while (this._boundKeyHandlers.length) {
          // My kingdom for block-scope binding and destructuring assignment..
          keyHandlerTuple = this._boundKeyHandlers.pop();
          keyEventTarget = keyHandlerTuple[0];
          eventName = keyHandlerTuple[1];
          boundKeyHandler = keyHandlerTuple[2];

          keyEventTarget.removeEventListener(eventName, boundKeyHandler);
        }
      }
    }, {
      key: '_onKeyBindingEvent',
      value: function _onKeyBindingEvent(keyBindings, event) {
        if (this.stopKeyboardEventPropagation) {
          event.stopPropagation();
        }

        // if event has been already prevented, don't do anything
        if (event.defaultPrevented) {
          return;
        }

        for (var i = 0; i < keyBindings.length; i++) {
          var keyCombo = keyBindings[i][0];
          var handlerName = keyBindings[i][1];
          if (keyComboMatchesEvent(keyCombo, event)) {
            this._triggerKeyHandler(keyCombo, handlerName, event);
            // exit the loop if eventDefault was prevented
            if (event.defaultPrevented) {
              return;
            }
          }
        }
      }
    }, {
      key: '_triggerKeyHandler',
      value: function _triggerKeyHandler(keyCombo, handlerName, keyboardEvent) {
        var detail = Object.create(keyCombo);
        detail.keyboardEvent = keyboardEvent;
        var event = new window.CustomEvent(keyCombo.event, {
          detail: detail,
          cancelable: true
        });
        this[handlerName].call(this, event); // eslint-disable-line no-useless-call
        if (event.defaultPrevented) {
          keyboardEvent.preventDefault();
        }
      }
    }]);

    return _class;
  }(superClass);
};

var _keyboardEventMatchesKeys = function _keyboardEventMatchesKeys(event, eventString) {
  var keyCombos = parseEventString(eventString);
  for (var i = 0; i < keyCombos.length; ++i) {
    if (keyComboMatchesEvent(keyCombos[i], event)) {
      return true;
    }
  }
  return false;
};
exports.keyboardEventMatchesKeys = _keyboardEventMatchesKeys;

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n  <style>\n    ', '\n  </style>\n\n  <div id="background"></div>\n  <div id="waves"></div>\n'], ['\n  <style>\n    ', '\n  </style>\n\n  <div id="background"></div>\n  <div id="waves"></div>\n']);

var _litHtml = __webpack_require__(10);

var _style = __webpack_require__(88);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

exports.default = function () {
  return (0, _litHtml.html)(_templateObject, _style2.default);
};

/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(89);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(24)(undefined);
// imports


// module
exports.push([module.i, ":host {\n  display: block;\n  position: absolute;\n  border-radius: inherit;\n  overflow: hidden;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  /* See PolymerElements/paper-behaviors/issues/34. On non-Chrome browsers,\n   * creating a node (with a position:absolute) in the middle of an event\n   * handler \"interrupts\" that event handler (which happens when the\n   * ripple is created on demand) */\n  pointer-events: none; }\n\n:host([animating]) {\n  /* This resolves a rendering issue in Chrome (as of 40) where the\n     ripple is not properly clipped by its parent (which may have\n     rounded corners). See: http://jsbin.com/temexa/4\n\n     Note: We only apply this style conditionally. Otherwise, the browser\n     will create a new compositing layer for every ripple element on the\n     page, and that would be bad. */\n  -webkit-transform: translate(0, 0);\n  transform: translate3d(0, 0, 0); }\n\n#background,\n#waves,\n.wave-container,\n.wave {\n  pointer-events: none;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%; }\n\n#background,\n.wave {\n  opacity: 0; }\n\n#waves,\n.wave {\n  overflow: hidden; }\n\n.wave-container,\n.wave {\n  border-radius: 50%; }\n\n:host(.circle) #background,\n:host(.circle) #waves {\n  border-radius: 50%; }\n\n:host(.circle) .wave-container {\n  overflow: hidden; }\n", ""]);

// exports


/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n  <style>\n    ', '\n  </style>\n\n  Hello world\n\n'], ['\n  <style>\n    ', '\n  </style>\n\n  Hello world\n\n']);

var _litHtml = __webpack_require__(10);

var _style = __webpack_require__(91);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

exports.default = function (ins) {
  return (0, _litHtml.html)(_templateObject, _style2.default);
};

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(92);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(24)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ })

});
//# sourceMappingURL=landing-page.0.js.map