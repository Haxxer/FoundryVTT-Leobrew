import {
  DialogShell_default,
  degToRad,
  lerp$5,
  mat4,
  vec3
} from "./chunk-2NWJHYI2.js";
import {
  TJSSessionStorage,
  propertyStore,
  subscribeIgnoreFirst
} from "./chunk-DTH3B6LV.js";
import {
  A11yHelper,
  ManagedPromise,
  deepMerge,
  hasGetter,
  isApplicationShell,
  isHMRProxy,
  isIterable,
  isObject,
  isPlainObject,
  outroAndDestroy,
  parseSvelteConfig,
  safeAccess,
  safeSet,
  styleParsePixels
} from "./chunk-IDJAAY4H.js";
import {
  derived,
  writable
} from "./chunk-4JE7W25I.js";
import {
  cubicOut
} from "./chunk-AFTQYMJX.js";
import {
  identity
} from "./chunk-U7IU7IO7.js";
import {
  __export,
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet,
  __privateWrapper,
  __publicField,
  __superGet
} from "./chunk-7HFSXBDU.js";

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/position/animation/AnimationControl.js
var _animationData, _finishedPromise, _willFinish, _voidControl;
var _AnimationControl = class {
  /**
   * @param {object|null} [animationData] - Animation data from {@link AnimationAPI}.
   *
   * @param {boolean}     [willFinish] - Promise that tracks animation finished state.
   */
  constructor(animationData, willFinish = false) {
    /** @type {object} */
    __privateAdd(this, _animationData, void 0);
    /** @type {Promise<void>} */
    __privateAdd(this, _finishedPromise, void 0);
    __privateAdd(this, _willFinish, void 0);
    __privateSet(this, _animationData, animationData);
    __privateSet(this, _willFinish, willFinish);
    if (isObject(animationData)) {
      animationData.control = this;
    }
  }
  /**
   * Provides a static void / undefined AnimationControl that is automatically resolved.
   *
   * @returns {AnimationControl} Void AnimationControl
   */
  static get voidControl() {
    return __privateGet(this, _voidControl);
  }
  /**
   * Get a promise that resolves when animation is finished.
   *
   * @returns {Promise<void>}
   */
  get finished() {
    if (!(__privateGet(this, _finishedPromise) instanceof Promise)) {
      __privateSet(this, _finishedPromise, __privateGet(this, _willFinish) ? new Promise((resolve) => __privateGet(this, _animationData).resolve = resolve) : Promise.resolve());
    }
    return __privateGet(this, _finishedPromise);
  }
  /**
   * Returns whether this animation is currently active / animating.
   *
   * Note: a delayed animation may not be started / active yet. Use {@link AnimationControl.isFinished} to determine
   * if an animation is actually finished.
   *
   * @returns {boolean} Animation active state.
   */
  get isActive() {
    return __privateGet(this, _animationData).active;
  }
  /**
   * Returns whether this animation is completely finished.
   *
   * @returns {boolean} Animation finished state.
   */
  get isFinished() {
    return __privateGet(this, _animationData).finished;
  }
  /**
   * Cancels the animation.
   */
  cancel() {
    const animationData = __privateGet(this, _animationData);
    if (animationData === null || animationData === void 0) {
      return;
    }
    animationData.cancelled = true;
  }
};
var AnimationControl = _AnimationControl;
_animationData = new WeakMap();
_finishedPromise = new WeakMap();
_willFinish = new WeakMap();
_voidControl = new WeakMap();
/**
 * Defines a static empty / void animation control.
 *
 * @type {AnimationControl}
 */
__privateAdd(AnimationControl, _voidControl, new _AnimationControl(null));

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/position/animation/AnimationManager.js
var _AnimationManager = class {
  /**
   * Add animation data.
   *
   * @param {object}   data -
   */
  static add(data) {
    const now = performance.now();
    data.start = now + (_AnimationManager.current - now);
    _AnimationManager.newList.push(data);
  }
  /**
   * Manage all animation
   */
  static animate() {
    const current = _AnimationManager.current = performance.now();
    if (_AnimationManager.activeList.length === 0 && _AnimationManager.newList.length === 0) {
      globalThis.requestAnimationFrame(_AnimationManager.animate);
      return;
    }
    if (_AnimationManager.newList.length) {
      for (let cntr = _AnimationManager.newList.length; --cntr >= 0; ) {
        const data = _AnimationManager.newList[cntr];
        if (data.cancelled) {
          _AnimationManager.newList.splice(cntr, 1);
          data.cleanup(data);
        }
        if (data.active) {
          _AnimationManager.newList.splice(cntr, 1);
          _AnimationManager.activeList.push(data);
        }
      }
    }
    for (let cntr = _AnimationManager.activeList.length; --cntr >= 0; ) {
      const data = _AnimationManager.activeList[cntr];
      if (data.cancelled || data.el !== void 0 && !data.el.isConnected) {
        _AnimationManager.activeList.splice(cntr, 1);
        data.cleanup(data);
        continue;
      }
      data.current = current - data.start;
      if (data.current >= data.duration) {
        for (let dataCntr = data.keys.length; --dataCntr >= 0; ) {
          const key = data.keys[dataCntr];
          data.newData[key] = data.destination[key];
        }
        data.position.set(data.newData);
        _AnimationManager.activeList.splice(cntr, 1);
        data.cleanup(data);
        continue;
      }
      const easedTime = data.ease(data.current / data.duration);
      for (let dataCntr = data.keys.length; --dataCntr >= 0; ) {
        const key = data.keys[dataCntr];
        data.newData[key] = data.interpolate(data.initial[key], data.destination[key], easedTime);
      }
      data.position.set(data.newData);
    }
    globalThis.requestAnimationFrame(_AnimationManager.animate);
  }
  /**
   * Cancels all animations for given Position instance.
   *
   * @param {Position} position - Position instance.
   */
  static cancel(position) {
    for (let cntr = _AnimationManager.activeList.length; --cntr >= 0; ) {
      const data = _AnimationManager.activeList[cntr];
      if (data.position === position) {
        _AnimationManager.activeList.splice(cntr, 1);
        data.cancelled = true;
        data.cleanup(data);
      }
    }
    for (let cntr = _AnimationManager.newList.length; --cntr >= 0; ) {
      const data = _AnimationManager.newList[cntr];
      if (data.position === position) {
        _AnimationManager.newList.splice(cntr, 1);
        data.cancelled = true;
        data.cleanup(data);
      }
    }
  }
  /**
   * Cancels all active and delayed animations.
   */
  static cancelAll() {
    for (let cntr = _AnimationManager.activeList.length; --cntr >= 0; ) {
      const data = _AnimationManager.activeList[cntr];
      data.cancelled = true;
      data.cleanup(data);
    }
    for (let cntr = _AnimationManager.newList.length; --cntr >= 0; ) {
      const data = _AnimationManager.newList[cntr];
      data.cancelled = true;
      data.cleanup(data);
    }
    _AnimationManager.activeList.length = 0;
    _AnimationManager.newList.length = 0;
  }
  /**
   * Gets all {@link AnimationControl} instances for a given Position instance.
   *
   * @param {Position} position - Position instance.
   *
   * @returns {AnimationControl[]} All scheduled AnimationControl instances for the given Position instance.
   */
  static getScheduled(position) {
    const results = [];
    for (let cntr = _AnimationManager.activeList.length; --cntr >= 0; ) {
      const data = _AnimationManager.activeList[cntr];
      if (data.position === position) {
        results.push(data.control);
      }
    }
    for (let cntr = _AnimationManager.newList.length; --cntr >= 0; ) {
      const data = _AnimationManager.newList[cntr];
      if (data.position === position) {
        results.push(data.control);
      }
    }
    return results;
  }
};
var AnimationManager = _AnimationManager;
/**
 * @type {object[]}
 */
__publicField(AnimationManager, "activeList", []);
/**
 * @type {object[]}
 */
__publicField(AnimationManager, "newList", []);
/**
 * @type {number}
 */
__publicField(AnimationManager, "current");
AnimationManager.animate();

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/position/constants.js
var animateKeys = /* @__PURE__ */ new Set([
  // Main keys
  "left",
  "top",
  "maxWidth",
  "maxHeight",
  "minWidth",
  "minHeight",
  "width",
  "height",
  "rotateX",
  "rotateY",
  "rotateZ",
  "scale",
  "translateX",
  "translateY",
  "translateZ",
  "zIndex",
  // Aliases
  "rotation"
]);
var transformKeys = ["rotateX", "rotateY", "rotateZ", "scale", "translateX", "translateY", "translateZ"];
Object.freeze(transformKeys);
var relativeRegex = /^([-+*])=(-?[\d]*\.?[\d]+)$/;
var numericDefaults = {
  // Other keys
  height: 0,
  left: 0,
  maxHeight: null,
  maxWidth: null,
  minHeight: null,
  minWidth: null,
  top: 0,
  transformOrigin: null,
  width: 0,
  zIndex: null,
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  scale: 1,
  translateX: 0,
  translateY: 0,
  translateZ: 0,
  rotation: 0
};
Object.freeze(numericDefaults);
function setNumericDefaults(data) {
  if (data.rotateX === null) {
    data.rotateX = 0;
  }
  if (data.rotateY === null) {
    data.rotateY = 0;
  }
  if (data.rotateZ === null) {
    data.rotateZ = 0;
  }
  if (data.translateX === null) {
    data.translateX = 0;
  }
  if (data.translateY === null) {
    data.translateY = 0;
  }
  if (data.translateZ === null) {
    data.translateZ = 0;
  }
  if (data.scale === null) {
    data.scale = 1;
  }
  if (data.rotation === null) {
    data.rotation = 0;
  }
}
var transformKeysBitwise = {
  rotateX: 1,
  rotateY: 2,
  rotateZ: 4,
  scale: 8,
  translateX: 16,
  translateY: 32,
  translateZ: 64
};
Object.freeze(transformKeysBitwise);
var transformOriginDefault = "top left";
var transformOrigins = [
  "top left",
  "top center",
  "top right",
  "center left",
  "center",
  "center right",
  "bottom left",
  "bottom center",
  "bottom right"
];
Object.freeze(transformOrigins);

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/position/convertRelative.js
function convertRelative(positionData, position) {
  for (const key in positionData) {
    if (animateKeys.has(key)) {
      const value = positionData[key];
      if (typeof value !== "string") {
        continue;
      }
      if (value === "auto" || value === "inherit") {
        continue;
      }
      const regexResults = relativeRegex.exec(value);
      if (!regexResults) {
        throw new Error(
          `convertRelative error: malformed relative key (${key}) with value (${value})`
        );
      }
      const current = position[key];
      switch (regexResults[1]) {
        case "-":
          positionData[key] = current - parseFloat(regexResults[2]);
          break;
        case "+":
          positionData[key] = current + parseFloat(regexResults[2]);
          break;
        case "*":
          positionData[key] = current * parseFloat(regexResults[2]);
          break;
      }
    }
  }
}

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/position/animation/AnimationAPI.js
var _data, _position, _instanceCount, _cleanup, _addAnimation, addAnimation_fn, _cleanupInstance, cleanupInstance_fn;
var AnimationAPI = class {
  constructor(position, data) {
    /**
     * Adds / schedules an animation w/ the AnimationManager. This contains the final steps common to all tweens.
     *
     * @param {object}      initial -
     *
     * @param {object}      destination -
     *
     * @param {number}      duration -
     *
     * @param {HTMLElement} el -
     *
     * @param {number}      delay -
     *
     * @param {Function}    ease -
     *
     * @param {Function}    interpolate -
     *
     * @returns {AnimationControl} The associated animation control.
     */
    __privateAdd(this, _addAnimation);
    /**
     * Cleans up an animation instance.
     *
     * @param {object}   data - Animation data for an animation instance.
     */
    __privateAdd(this, _cleanupInstance);
    /** @type {PositionData} */
    __privateAdd(this, _data, void 0);
    /** @type {Position} */
    __privateAdd(this, _position, void 0);
    /**
     * Tracks the number of animation control instances that are active.
     *
     * @type {number}
     */
    __privateAdd(this, _instanceCount, 0);
    /**
     * Provides a bound function to pass as data to AnimationManager to invoke
     *
     * @type {Function}
     * @see {AnimationAPI.#cleanupInstance}
     */
    __privateAdd(this, _cleanup, void 0);
    __privateSet(this, _position, position);
    __privateSet(this, _data, data);
    __privateSet(this, _cleanup, __privateMethod(this, _cleanupInstance, cleanupInstance_fn).bind(this));
  }
  /**
   * Returns whether there are scheduled animations whether active or delayed for this Position.
   *
   * @returns {boolean} Are there active animation instances.
   */
  get isScheduled() {
    return __privateGet(this, _instanceCount) > 0;
  }
  /**
   * Cancels all animation instances for this Position instance.
   */
  cancel() {
    AnimationManager.cancel(__privateGet(this, _position));
  }
  /**
   * Returns all currently scheduled AnimationControl instances for this Position instance.
   *
   * @returns {AnimationControl[]} All currently scheduled animation controls for this Position instance.
   */
  getScheduled() {
    return AnimationManager.getScheduled(__privateGet(this, _position));
  }
  /**
   * Provides a tween from given position data to the current position.
   *
   * @param {PositionDataExtended} fromData - The starting position.
   *
   * @param {object}         [opts] - Optional parameters.
   *
   * @param {number}         [opts.delay=0] - Delay in seconds before animation starts.
   *
   * @param {number}         [opts.duration=1] - Duration in seconds.
   *
   * @param {Function}       [opts.ease=cubicOut] - Easing function.
   *
   * @param {Function}       [opts.interpolate=lerp] - Interpolation function.
   *
   * @returns {AnimationControl}  A control object that can cancel animation and provides a `finished` Promise.
   */
  from(fromData, { delay = 0, duration = 1, ease = cubicOut, interpolate = lerp$5 } = {}) {
    var _a, _b;
    if (!isObject(fromData)) {
      throw new TypeError(`AnimationAPI.from error: 'fromData' is not an object.`);
    }
    const position = __privateGet(this, _position);
    const parent = position.parent;
    if (parent !== void 0 && typeof ((_a = parent == null ? void 0 : parent.options) == null ? void 0 : _a.positionable) === "boolean" && !((_b = parent == null ? void 0 : parent.options) == null ? void 0 : _b.positionable)) {
      return AnimationControl.voidControl;
    }
    const targetEl = parent instanceof HTMLElement ? parent : parent == null ? void 0 : parent.elementTarget;
    const el = targetEl instanceof HTMLElement && targetEl.isConnected ? targetEl : void 0;
    if (!Number.isFinite(delay) || delay < 0) {
      throw new TypeError(`AnimationAPI.from error: 'delay' is not a positive number.`);
    }
    if (!Number.isFinite(duration) || duration < 0) {
      throw new TypeError(`AnimationAPI.from error: 'duration' is not a positive number.`);
    }
    if (typeof ease !== "function") {
      throw new TypeError(`AnimationAPI.from error: 'ease' is not a function.`);
    }
    if (typeof interpolate !== "function") {
      throw new TypeError(`AnimationAPI.from error: 'interpolate' is not a function.`);
    }
    const initial = {};
    const destination = {};
    const data = __privateGet(this, _data);
    for (const key in fromData) {
      if (data[key] !== void 0 && fromData[key] !== data[key]) {
        initial[key] = fromData[key];
        destination[key] = data[key];
      }
    }
    convertRelative(initial, data);
    return __privateMethod(this, _addAnimation, addAnimation_fn).call(this, initial, destination, duration, el, delay, ease, interpolate);
  }
  /**
   * Provides a tween from given position data to the current position.
   *
   * @param {PositionDataExtended} fromData - The starting position.
   *
   * @param {PositionDataExtended} toData - The ending position.
   *
   * @param {object}         [opts] - Optional parameters.
   *
   * @param {number}         [opts.delay=0] - Delay in seconds before animation starts.
   *
   * @param {number}         [opts.duration=1] - Duration in seconds.
   *
   * @param {Function}       [opts.ease=cubicOut] - Easing function.
   *
   * @param {Function}       [opts.interpolate=lerp] - Interpolation function.
   *
   * @returns {AnimationControl}  A control object that can cancel animation and provides a `finished` Promise.
   */
  fromTo(fromData, toData, { delay = 0, duration = 1, ease = cubicOut, interpolate = lerp$5 } = {}) {
    var _a, _b;
    if (!isObject(fromData)) {
      throw new TypeError(`AnimationAPI.fromTo error: 'fromData' is not an object.`);
    }
    if (!isObject(toData)) {
      throw new TypeError(`AnimationAPI.fromTo error: 'toData' is not an object.`);
    }
    const parent = __privateGet(this, _position).parent;
    if (parent !== void 0 && typeof ((_a = parent == null ? void 0 : parent.options) == null ? void 0 : _a.positionable) === "boolean" && !((_b = parent == null ? void 0 : parent.options) == null ? void 0 : _b.positionable)) {
      return AnimationControl.voidControl;
    }
    const targetEl = parent instanceof HTMLElement ? parent : parent == null ? void 0 : parent.elementTarget;
    const el = targetEl instanceof HTMLElement && targetEl.isConnected ? targetEl : void 0;
    if (!Number.isFinite(delay) || delay < 0) {
      throw new TypeError(`AnimationAPI.fromTo error: 'delay' is not a positive number.`);
    }
    if (!Number.isFinite(duration) || duration < 0) {
      throw new TypeError(`AnimationAPI.fromTo error: 'duration' is not a positive number.`);
    }
    if (typeof ease !== "function") {
      throw new TypeError(`AnimationAPI.fromTo error: 'ease' is not a function.`);
    }
    if (typeof interpolate !== "function") {
      throw new TypeError(`AnimationAPI.fromTo error: 'interpolate' is not a function.`);
    }
    const initial = {};
    const destination = {};
    const data = __privateGet(this, _data);
    for (const key in fromData) {
      if (toData[key] === void 0) {
        console.warn(
          `AnimationAPI.fromTo warning: key ('${key}') from 'fromData' missing in 'toData'; skipping this key.`
        );
        continue;
      }
      if (data[key] !== void 0) {
        initial[key] = fromData[key];
        destination[key] = toData[key];
      }
    }
    convertRelative(initial, data);
    convertRelative(destination, data);
    return __privateMethod(this, _addAnimation, addAnimation_fn).call(this, initial, destination, duration, el, delay, ease, interpolate);
  }
  /**
   * Provides a tween to given position data from the current position.
   *
   * @param {PositionDataExtended} toData - The destination position.
   *
   * @param {object}         [opts] - Optional parameters.
   *
   * @param {number}         [opts.delay=0] - Delay in seconds before animation starts.
   *
   * @param {number}         [opts.duration=1] - Duration in seconds.
   *
   * @param {Function}       [opts.ease=cubicOut] - Easing function.
   *
   * @param {Function}       [opts.interpolate=lerp] - Interpolation function.
   *
   * @returns {AnimationControl}  A control object that can cancel animation and provides a `finished` Promise.
   */
  to(toData, { delay = 0, duration = 1, ease = cubicOut, interpolate = lerp$5 } = {}) {
    var _a, _b;
    if (!isObject(toData)) {
      throw new TypeError(`AnimationAPI.to error: 'toData' is not an object.`);
    }
    const parent = __privateGet(this, _position).parent;
    if (parent !== void 0 && typeof ((_a = parent == null ? void 0 : parent.options) == null ? void 0 : _a.positionable) === "boolean" && !((_b = parent == null ? void 0 : parent.options) == null ? void 0 : _b.positionable)) {
      return AnimationControl.voidControl;
    }
    const targetEl = parent instanceof HTMLElement ? parent : parent == null ? void 0 : parent.elementTarget;
    const el = targetEl instanceof HTMLElement && targetEl.isConnected ? targetEl : void 0;
    if (!Number.isFinite(delay) || delay < 0) {
      throw new TypeError(`AnimationAPI.to error: 'delay' is not a positive number.`);
    }
    if (!Number.isFinite(duration) || duration < 0) {
      throw new TypeError(`AnimationAPI.to error: 'duration' is not a positive number.`);
    }
    if (typeof ease !== "function") {
      throw new TypeError(`AnimationAPI.to error: 'ease' is not a function.`);
    }
    if (typeof interpolate !== "function") {
      throw new TypeError(`AnimationAPI.to error: 'interpolate' is not a function.`);
    }
    const initial = {};
    const destination = {};
    const data = __privateGet(this, _data);
    for (const key in toData) {
      if (data[key] !== void 0 && toData[key] !== data[key]) {
        destination[key] = toData[key];
        initial[key] = data[key];
      }
    }
    convertRelative(destination, data);
    return __privateMethod(this, _addAnimation, addAnimation_fn).call(this, initial, destination, duration, el, delay, ease, interpolate);
  }
  /**
   * Returns a function that provides an optimized way to constantly update a to-tween.
   *
   * @param {Iterable<string>}  keys - The keys for quickTo.
   *
   * @param {object}            [opts] - Optional parameters.
   *
   * @param {number}            [opts.duration=1] - Duration in seconds.
   *
   * @param {Function}          [opts.ease=cubicOut] - Easing function.
   *
   * @param {Function}          [opts.interpolate=lerp] - Interpolation function.
   *
   * @returns {quickToCallback} quick-to tween function.
   */
  quickTo(keys, { duration = 1, ease = cubicOut, interpolate = lerp$5 } = {}) {
    var _a, _b;
    if (!isIterable(keys)) {
      throw new TypeError(`AnimationAPI.quickTo error: 'keys' is not an iterable list.`);
    }
    const parent = __privateGet(this, _position).parent;
    if (parent !== void 0 && typeof ((_a = parent == null ? void 0 : parent.options) == null ? void 0 : _a.positionable) === "boolean" && !((_b = parent == null ? void 0 : parent.options) == null ? void 0 : _b.positionable)) {
      throw new Error(`AnimationAPI.quickTo error: 'parent' is not positionable.`);
    }
    if (!Number.isFinite(duration) || duration < 0) {
      throw new TypeError(`AnimationAPI.quickTo error: 'duration' is not a positive number.`);
    }
    if (typeof ease !== "function") {
      throw new TypeError(`AnimationAPI.quickTo error: 'ease' is not a function.`);
    }
    if (typeof interpolate !== "function") {
      throw new TypeError(`AnimationAPI.quickTo error: 'interpolate' is not a function.`);
    }
    const initial = {};
    const destination = {};
    const data = __privateGet(this, _data);
    for (const key of keys) {
      if (typeof key !== "string") {
        throw new TypeError(`AnimationAPI.quickTo error: key is not a string.`);
      }
      if (!animateKeys.has(key)) {
        throw new Error(`AnimationAPI.quickTo error: key ('${key}') is not animatable.`);
      }
      if (data[key] !== void 0) {
        destination[key] = data[key];
        initial[key] = data[key];
      }
    }
    const keysArray = [...keys];
    Object.freeze(keysArray);
    const newData = Object.assign({ immediateElementUpdate: true }, initial);
    const animationData = {
      active: true,
      cleanup: __privateGet(this, _cleanup),
      cancelled: false,
      control: void 0,
      current: 0,
      destination,
      duration: duration * 1e3,
      // Internally the AnimationManager works in ms.
      ease,
      el: void 0,
      finished: true,
      // Note: start in finished state to add to AnimationManager on first callback.
      initial,
      interpolate,
      keys,
      newData,
      position: __privateGet(this, _position),
      resolve: void 0,
      start: void 0
    };
    const quickToCB = (...args) => {
      const argsLength = args.length;
      if (argsLength === 0) {
        return;
      }
      for (let cntr = keysArray.length; --cntr >= 0; ) {
        const key = keysArray[cntr];
        if (data[key] !== void 0) {
          initial[key] = data[key];
        }
      }
      if (isObject(args[0])) {
        const objData = args[0];
        for (const key in objData) {
          if (destination[key] !== void 0) {
            destination[key] = objData[key];
          }
        }
      } else {
        for (let cntr = 0; cntr < argsLength && cntr < keysArray.length; cntr++) {
          const key = keysArray[cntr];
          if (destination[key] !== void 0) {
            destination[key] = args[cntr];
          }
        }
      }
      convertRelative(destination, data);
      setNumericDefaults(initial);
      setNumericDefaults(destination);
      const targetEl = parent instanceof HTMLElement ? parent : parent == null ? void 0 : parent.elementTarget;
      animationData.el = targetEl instanceof HTMLElement && targetEl.isConnected ? targetEl : void 0;
      if (animationData.finished) {
        animationData.finished = false;
        animationData.active = true;
        animationData.current = 0;
        __privateWrapper(this, _instanceCount)._++;
        AnimationManager.add(animationData);
      } else {
        const now = performance.now();
        animationData.start = now + (AnimationManager.current - now);
        animationData.current = 0;
      }
    };
    quickToCB.keys = keysArray;
    quickToCB.options = ({ duration: duration2, ease: ease2, interpolate: interpolate2 } = {}) => {
      if (duration2 !== void 0 && (!Number.isFinite(duration2) || duration2 < 0)) {
        throw new TypeError(`AnimationAPI.quickTo.options error: 'duration' is not a positive number.`);
      }
      if (ease2 !== void 0 && typeof ease2 !== "function") {
        throw new TypeError(`AnimationAPI.quickTo.options error: 'ease' is not a function.`);
      }
      if (interpolate2 !== void 0 && typeof interpolate2 !== "function") {
        throw new TypeError(`AnimationAPI.quickTo.options error: 'interpolate' is not a function.`);
      }
      if (duration2 >= 0) {
        animationData.duration = duration2 * 1e3;
      }
      if (ease2) {
        animationData.ease = ease2;
      }
      if (interpolate2) {
        animationData.interpolate = interpolate2;
      }
      return quickToCB;
    };
    return quickToCB;
  }
};
_data = new WeakMap();
_position = new WeakMap();
_instanceCount = new WeakMap();
_cleanup = new WeakMap();
_addAnimation = new WeakSet();
addAnimation_fn = function(initial, destination, duration, el, delay, ease, interpolate) {
  setNumericDefaults(initial);
  setNumericDefaults(destination);
  for (const key in initial) {
    if (!Number.isFinite(initial[key])) {
      delete initial[key];
    }
  }
  const keys = Object.keys(initial);
  const newData = Object.assign({ immediateElementUpdate: true }, initial);
  if (keys.length === 0) {
    return AnimationControl.voidControl;
  }
  const animationData = {
    active: true,
    cleanup: __privateGet(this, _cleanup),
    cancelled: false,
    control: void 0,
    current: 0,
    destination,
    duration: duration * 1e3,
    // Internally the AnimationManager works in ms.
    ease,
    el,
    finished: false,
    initial,
    interpolate,
    keys,
    newData,
    position: __privateGet(this, _position),
    resolve: void 0,
    start: void 0
  };
  if (delay > 0) {
    animationData.active = false;
    setTimeout(() => {
      if (!animationData.cancelled) {
        animationData.active = true;
        const now = performance.now();
        animationData.start = now + (AnimationManager.current - now);
      }
    }, delay * 1e3);
  }
  __privateWrapper(this, _instanceCount)._++;
  AnimationManager.add(animationData);
  return new AnimationControl(animationData, true);
};
_cleanupInstance = new WeakSet();
cleanupInstance_fn = function(data) {
  __privateWrapper(this, _instanceCount)._--;
  data.active = false;
  data.finished = true;
  if (typeof data.resolve === "function") {
    data.resolve(data.cancelled);
  }
};

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/position/animation/AnimationGroupControl.js
var _animationControls, _finishedPromise2, _voidControl2;
var _AnimationGroupControl = class {
  /**
   * @param {AnimationControl[]} animationControls - An array of AnimationControl instances.
   */
  constructor(animationControls) {
    /** @type {AnimationControl[]} */
    __privateAdd(this, _animationControls, void 0);
    /** @type {Promise<Awaited<unknown>[]>} */
    __privateAdd(this, _finishedPromise2, void 0);
    __privateSet(this, _animationControls, animationControls);
  }
  /**
   * Provides a static void / undefined AnimationGroupControl that is automatically resolved.
   *
   * @returns {AnimationGroupControl} Void AnimationGroupControl
   */
  static get voidControl() {
    return __privateGet(this, _voidControl2);
  }
  /**
   * Get a promise that resolves when all animations are finished.
   *
   * @returns {Promise<Awaited<unknown>[]>|Promise<void>} Finished Promise for all animations.
   */
  get finished() {
    const animationControls = __privateGet(this, _animationControls);
    if (animationControls === null || animationControls === void 0) {
      return Promise.resolve();
    }
    if (!(__privateGet(this, _finishedPromise2) instanceof Promise)) {
      const promises = [];
      for (let cntr = animationControls.length; --cntr >= 0; ) {
        promises.push(animationControls[cntr].finished);
      }
      __privateSet(this, _finishedPromise2, Promise.all(promises));
    }
    return __privateGet(this, _finishedPromise2);
  }
  /**
   * Returns whether there are active animation instances for this group.
   *
   * Note: a delayed animation may not be started / active yet. Use {@link AnimationGroupControl.isFinished} to
   * determine if all animations in the group are finished.
   *
   * @returns {boolean} Are there active animation instances.
   */
  get isActive() {
    const animationControls = __privateGet(this, _animationControls);
    if (animationControls === null || animationControls === void 0) {
      return false;
    }
    for (let cntr = animationControls.length; --cntr >= 0; ) {
      if (animationControls[cntr].isActive) {
        return true;
      }
    }
    return false;
  }
  /**
   * Returns whether all animations in the group are finished.
   *
   * @returns {boolean} Are all animation instances finished.
   */
  get isFinished() {
    const animationControls = __privateGet(this, _animationControls);
    if (animationControls === null || animationControls === void 0) {
      return true;
    }
    for (let cntr = animationControls.length; --cntr >= 0; ) {
      if (!animationControls[cntr].isFinished) {
        return false;
      }
    }
    return false;
  }
  /**
   * Cancels the all animations.
   */
  cancel() {
    const animationControls = __privateGet(this, _animationControls);
    if (animationControls === null || animationControls === void 0) {
      return;
    }
    for (let cntr = __privateGet(this, _animationControls).length; --cntr >= 0; ) {
      __privateGet(this, _animationControls)[cntr].cancel();
    }
  }
};
var AnimationGroupControl = _AnimationGroupControl;
_animationControls = new WeakMap();
_finishedPromise2 = new WeakMap();
_voidControl2 = new WeakMap();
/**
 * Defines a static empty / void animation control.
 *
 * @type {AnimationGroupControl}
 */
__privateAdd(AnimationGroupControl, _voidControl2, new _AnimationGroupControl(null));

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/position/animation/AnimationGroupAPI.js
var _isPosition, isPosition_fn;
var AnimationGroupAPI = class {
  /**
   * Cancels any animation for given Position data.
   *
   * @param {Position|{position: Position}|Iterable<Position>|Iterable<{position: Position}>} position -
   */
  static cancel(position) {
    if (isIterable(position)) {
      let index = -1;
      for (const entry of position) {
        index++;
        const actualPosition = __privateMethod(this, _isPosition, isPosition_fn).call(this, entry) ? entry : entry.position;
        if (!__privateMethod(this, _isPosition, isPosition_fn).call(this, actualPosition)) {
          console.warn(`AnimationGroupAPI.cancel warning: No Position instance found at index: ${index}.`);
          continue;
        }
        AnimationManager.cancel(actualPosition);
      }
    } else {
      const actualPosition = __privateMethod(this, _isPosition, isPosition_fn).call(this, position) ? position : position.position;
      if (!__privateMethod(this, _isPosition, isPosition_fn).call(this, actualPosition)) {
        console.warn(`AnimationGroupAPI.cancel warning: No Position instance found.`);
        return;
      }
      AnimationManager.cancel(actualPosition);
    }
  }
  /**
   * Cancels all Position animation.
   */
  static cancelAll() {
    AnimationManager.cancelAll();
  }
  /**
   * Gets all animation controls for the given position data.
   *
   * @param {Position|{position: Position}|Iterable<Position>|Iterable<{position: Position}>} position -
   *
   * @returns {{position: Position, data: object|void, controls: AnimationControl[]}[]} Results array.
   */
  static getScheduled(position) {
    const results = [];
    if (isIterable(position)) {
      let index = -1;
      for (const entry of position) {
        index++;
        const isPosition = __privateMethod(this, _isPosition, isPosition_fn).call(this, entry);
        const actualPosition = isPosition ? entry : entry.position;
        if (!__privateMethod(this, _isPosition, isPosition_fn).call(this, actualPosition)) {
          console.warn(`AnimationGroupAPI.getScheduled warning: No Position instance found at index: ${index}.`);
          continue;
        }
        const controls = AnimationManager.getScheduled(actualPosition);
        results.push({ position: actualPosition, data: isPosition ? void 0 : entry, controls });
      }
    } else {
      const isPosition = __privateMethod(this, _isPosition, isPosition_fn).call(this, position);
      const actualPosition = isPosition ? position : position.position;
      if (!__privateMethod(this, _isPosition, isPosition_fn).call(this, actualPosition)) {
        console.warn(`AnimationGroupAPI.getScheduled warning: No Position instance found.`);
        return results;
      }
      const controls = AnimationManager.getScheduled(actualPosition);
      results.push({ position: actualPosition, data: isPosition ? void 0 : position, controls });
    }
    return results;
  }
  /**
   * Provides the `from` animation tween for one or more Position instances as a group.
   *
   * @param {Position|{position: Position}|Iterable<Position>|Iterable<{position: Position}>} position -
   *
   * @param {object|Function}   fromData -
   *
   * @param {object|Function}   options -
   *
   * @returns {TJSBasicAnimation} Basic animation control.
   */
  static from(position, fromData, options) {
    if (!isObject(fromData) && typeof fromData !== "function") {
      throw new TypeError(`AnimationGroupAPI.from error: 'fromData' is not an object or function.`);
    }
    if (options !== void 0 && !isObject(options) && typeof options !== "function") {
      throw new TypeError(`AnimationGroupAPI.from error: 'options' is not an object or function.`);
    }
    const animationControls = [];
    let index = -1;
    let callbackOptions;
    const hasDataCallback = typeof fromData === "function";
    const hasOptionCallback = typeof options === "function";
    const hasCallback = hasDataCallback || hasOptionCallback;
    if (hasCallback) {
      callbackOptions = { index, position: void 0, data: void 0 };
    }
    let actualFromData = fromData;
    let actualOptions = options;
    if (isIterable(position)) {
      for (const entry of position) {
        index++;
        const isPosition = __privateMethod(this, _isPosition, isPosition_fn).call(this, entry);
        const actualPosition = isPosition ? entry : entry.position;
        if (!__privateMethod(this, _isPosition, isPosition_fn).call(this, actualPosition)) {
          console.warn(`AnimationGroupAPI.from warning: No Position instance found at index: ${index}.`);
          continue;
        }
        if (hasCallback) {
          callbackOptions.index = index;
          callbackOptions.position = position;
          callbackOptions.data = isPosition ? void 0 : entry;
        }
        if (hasDataCallback) {
          actualFromData = fromData(callbackOptions);
          if (actualFromData === null || actualFromData === void 0) {
            continue;
          }
          if (typeof actualFromData !== "object") {
            throw new TypeError(`AnimationGroupAPI.from error: fromData callback function iteration(${index}) failed to return an object.`);
          }
        }
        if (hasOptionCallback) {
          actualOptions = options(callbackOptions);
          if (actualOptions === null || actualOptions === void 0) {
            continue;
          }
          if (typeof actualOptions !== "object") {
            throw new TypeError(`AnimationGroupAPI.from error: options callback function iteration(${index}) failed to return an object.`);
          }
        }
        animationControls.push(actualPosition.animate.from(actualFromData, actualOptions));
      }
    } else {
      const isPosition = __privateMethod(this, _isPosition, isPosition_fn).call(this, position);
      const actualPosition = isPosition ? position : position.position;
      if (!__privateMethod(this, _isPosition, isPosition_fn).call(this, actualPosition)) {
        console.warn(`AnimationGroupAPI.from warning: No Position instance found.`);
        return AnimationGroupControl.voidControl;
      }
      if (hasCallback) {
        callbackOptions.index = 0;
        callbackOptions.position = position;
        callbackOptions.data = isPosition ? void 0 : position;
      }
      if (hasDataCallback) {
        actualFromData = fromData(callbackOptions);
        if (typeof actualFromData !== "object") {
          throw new TypeError(
            `AnimationGroupAPI.from error: fromData callback function failed to return an object.`
          );
        }
      }
      if (hasOptionCallback) {
        actualOptions = options(callbackOptions);
        if (typeof actualOptions !== "object") {
          throw new TypeError(
            `AnimationGroupAPI.from error: options callback function failed to return an object.`
          );
        }
      }
      animationControls.push(actualPosition.animate.from(actualFromData, actualOptions));
    }
    return new AnimationGroupControl(animationControls);
  }
  /**
   * Provides the `fromTo` animation tween for one or more Position instances as a group.
   *
   * @param {Position|{position: Position}|Iterable<Position>|Iterable<{position: Position}>} position -
   *
   * @param {object|Function}   fromData -
   *
   * @param {object|Function}   toData -
   *
   * @param {object|Function}   options -
   *
   * @returns {TJSBasicAnimation} Basic animation control.
   */
  static fromTo(position, fromData, toData, options) {
    if (!isObject(fromData) && typeof fromData !== "function") {
      throw new TypeError(`AnimationGroupAPI.fromTo error: 'fromData' is not an object or function.`);
    }
    if (!isObject(toData) && typeof toData !== "function") {
      throw new TypeError(`AnimationGroupAPI.fromTo error: 'toData' is not an object or function.`);
    }
    if (options !== void 0 && !isObject(options) && typeof options !== "function") {
      throw new TypeError(`AnimationGroupAPI.fromTo error: 'options' is not an object or function.`);
    }
    const animationControls = [];
    let index = -1;
    let callbackOptions;
    const hasFromCallback = typeof fromData === "function";
    const hasToCallback = typeof toData === "function";
    const hasOptionCallback = typeof options === "function";
    const hasCallback = hasFromCallback || hasToCallback || hasOptionCallback;
    if (hasCallback) {
      callbackOptions = { index, position: void 0, data: void 0 };
    }
    let actualFromData = fromData;
    let actualToData = toData;
    let actualOptions = options;
    if (isIterable(position)) {
      for (const entry of position) {
        index++;
        const isPosition = __privateMethod(this, _isPosition, isPosition_fn).call(this, entry);
        const actualPosition = isPosition ? entry : entry.position;
        if (!__privateMethod(this, _isPosition, isPosition_fn).call(this, actualPosition)) {
          console.warn(`AnimationGroupAPI.fromTo warning: No Position instance found at index: ${index}.`);
          continue;
        }
        if (hasCallback) {
          callbackOptions.index = index;
          callbackOptions.position = position;
          callbackOptions.data = isPosition ? void 0 : entry;
        }
        if (hasFromCallback) {
          actualFromData = fromData(callbackOptions);
          if (actualFromData === null || actualFromData === void 0) {
            continue;
          }
          if (typeof actualFromData !== "object") {
            throw new TypeError(`AnimationGroupAPI.fromTo error: fromData callback function iteration(${index}) failed to return an object.`);
          }
        }
        if (hasToCallback) {
          actualToData = toData(callbackOptions);
          if (actualToData === null || actualToData === void 0) {
            continue;
          }
          if (typeof actualToData !== "object") {
            throw new TypeError(`AnimationGroupAPI.fromTo error: toData callback function iteration(${index}) failed to return an object.`);
          }
        }
        if (hasOptionCallback) {
          actualOptions = options(callbackOptions);
          if (actualOptions === null || actualOptions === void 0) {
            continue;
          }
          if (typeof actualOptions !== "object") {
            throw new TypeError(`AnimationGroupAPI.fromTo error: options callback function iteration(${index}) failed to return an object.`);
          }
        }
        animationControls.push(actualPosition.animate.fromTo(actualFromData, actualToData, actualOptions));
      }
    } else {
      const isPosition = __privateMethod(this, _isPosition, isPosition_fn).call(this, position);
      const actualPosition = isPosition ? position : position.position;
      if (!__privateMethod(this, _isPosition, isPosition_fn).call(this, actualPosition)) {
        console.warn(`AnimationGroupAPI.fromTo warning: No Position instance found.`);
        return AnimationGroupControl.voidControl;
      }
      if (hasCallback) {
        callbackOptions.index = 0;
        callbackOptions.position = position;
        callbackOptions.data = isPosition ? void 0 : position;
      }
      if (hasFromCallback) {
        actualFromData = fromData(callbackOptions);
        if (typeof actualFromData !== "object") {
          throw new TypeError(
            `AnimationGroupAPI.fromTo error: fromData callback function failed to return an object.`
          );
        }
      }
      if (hasToCallback) {
        actualToData = toData(callbackOptions);
        if (typeof actualToData !== "object") {
          throw new TypeError(
            `AnimationGroupAPI.fromTo error: toData callback function failed to return an object.`
          );
        }
      }
      if (hasOptionCallback) {
        actualOptions = options(callbackOptions);
        if (typeof actualOptions !== "object") {
          throw new TypeError(
            `AnimationGroupAPI.fromTo error: options callback function failed to return an object.`
          );
        }
      }
      animationControls.push(actualPosition.animate.fromTo(actualFromData, actualToData, actualOptions));
    }
    return new AnimationGroupControl(animationControls);
  }
  /**
   * Provides the `to` animation tween for one or more Position instances as a group.
   *
   * @param {Position|{position: Position}|Iterable<Position>|Iterable<{position: Position}>} position -
   *
   * @param {object|Function}   toData -
   *
   * @param {object|Function}   options -
   *
   * @returns {TJSBasicAnimation} Basic animation control.
   */
  static to(position, toData, options) {
    if (!isObject(toData) && typeof toData !== "function") {
      throw new TypeError(`AnimationGroupAPI.to error: 'toData' is not an object or function.`);
    }
    if (options !== void 0 && !isObject(options) && typeof options !== "function") {
      throw new TypeError(`AnimationGroupAPI.to error: 'options' is not an object or function.`);
    }
    const animationControls = [];
    let index = -1;
    let callbackOptions;
    const hasDataCallback = typeof toData === "function";
    const hasOptionCallback = typeof options === "function";
    const hasCallback = hasDataCallback || hasOptionCallback;
    if (hasCallback) {
      callbackOptions = { index, position: void 0, data: void 0 };
    }
    let actualToData = toData;
    let actualOptions = options;
    if (isIterable(position)) {
      for (const entry of position) {
        index++;
        const isPosition = __privateMethod(this, _isPosition, isPosition_fn).call(this, entry);
        const actualPosition = isPosition ? entry : entry.position;
        if (!__privateMethod(this, _isPosition, isPosition_fn).call(this, actualPosition)) {
          console.warn(`AnimationGroupAPI.to warning: No Position instance found at index: ${index}.`);
          continue;
        }
        if (hasCallback) {
          callbackOptions.index = index;
          callbackOptions.position = position;
          callbackOptions.data = isPosition ? void 0 : entry;
        }
        if (hasDataCallback) {
          actualToData = toData(callbackOptions);
          if (actualToData === null || actualToData === void 0) {
            continue;
          }
          if (typeof actualToData !== "object") {
            throw new TypeError(`AnimationGroupAPI.to error: toData callback function iteration(${index}) failed to return an object.`);
          }
        }
        if (hasOptionCallback) {
          actualOptions = options(callbackOptions);
          if (actualOptions === null || actualOptions === void 0) {
            continue;
          }
          if (typeof actualOptions !== "object") {
            throw new TypeError(`AnimationGroupAPI.to error: options callback function iteration(${index}) failed to return an object.`);
          }
        }
        animationControls.push(actualPosition.animate.to(actualToData, actualOptions));
      }
    } else {
      const isPosition = __privateMethod(this, _isPosition, isPosition_fn).call(this, position);
      const actualPosition = isPosition ? position : position.position;
      if (!__privateMethod(this, _isPosition, isPosition_fn).call(this, actualPosition)) {
        console.warn(`AnimationGroupAPI.to warning: No Position instance found.`);
        return AnimationGroupControl.voidControl;
      }
      if (hasCallback) {
        callbackOptions.index = 0;
        callbackOptions.position = position;
        callbackOptions.data = isPosition ? void 0 : position;
      }
      if (hasDataCallback) {
        actualToData = toData(callbackOptions);
        if (typeof actualToData !== "object") {
          throw new TypeError(
            `AnimationGroupAPI.to error: toData callback function failed to return an object.`
          );
        }
      }
      if (hasOptionCallback) {
        actualOptions = options(callbackOptions);
        if (typeof actualOptions !== "object") {
          throw new TypeError(
            `AnimationGroupAPI.to error: options callback function failed to return an object.`
          );
        }
      }
      animationControls.push(actualPosition.animate.to(actualToData, actualOptions));
    }
    return new AnimationGroupControl(animationControls);
  }
  /**
   * Provides the `to` animation tween for one or more Position instances as a group.
   *
   * @param {Position|{position: Position}|Iterable<Position>|Iterable<{position: Position}>} position -
   *
   * @param {Iterable<string>}  keys -
   *
   * @param {object|Function}   options -
   *
   * @returns {quickToCallback} Basic animation control.
   */
  static quickTo(position, keys, options) {
    if (!isIterable(keys)) {
      throw new TypeError(`AnimationGroupAPI.quickTo error: 'keys' is not an iterable list.`);
    }
    if (options !== void 0 && !isObject(options) && typeof options !== "function") {
      throw new TypeError(`AnimationGroupAPI.quickTo error: 'options' is not an object or function.`);
    }
    const quickToCallbacks = [];
    let index = -1;
    const hasOptionCallback = typeof options === "function";
    const callbackOptions = { index, position: void 0, data: void 0 };
    let actualOptions = options;
    if (isIterable(position)) {
      for (const entry of position) {
        index++;
        const isPosition = __privateMethod(this, _isPosition, isPosition_fn).call(this, entry);
        const actualPosition = isPosition ? entry : entry.position;
        if (!__privateMethod(this, _isPosition, isPosition_fn).call(this, actualPosition)) {
          console.warn(`AnimationGroupAPI.quickTo warning: No Position instance found at index: ${index}.`);
          continue;
        }
        callbackOptions.index = index;
        callbackOptions.position = position;
        callbackOptions.data = isPosition ? void 0 : entry;
        if (hasOptionCallback) {
          actualOptions = options(callbackOptions);
          if (actualOptions === null || actualOptions === void 0) {
            continue;
          }
          if (typeof actualOptions !== "object") {
            throw new TypeError(`AnimationGroupAPI.quickTo error: options callback function iteration(${index}) failed to return an object.`);
          }
        }
        quickToCallbacks.push(actualPosition.animate.quickTo(keys, actualOptions));
      }
    } else {
      const isPosition = __privateMethod(this, _isPosition, isPosition_fn).call(this, position);
      const actualPosition = isPosition ? position : position.position;
      if (!__privateMethod(this, _isPosition, isPosition_fn).call(this, actualPosition)) {
        console.warn(`AnimationGroupAPI.quickTo warning: No Position instance found.`);
        return () => null;
      }
      callbackOptions.index = 0;
      callbackOptions.position = position;
      callbackOptions.data = isPosition ? void 0 : position;
      if (hasOptionCallback) {
        actualOptions = options(callbackOptions);
        if (typeof actualOptions !== "object") {
          throw new TypeError(
            `AnimationGroupAPI.quickTo error: options callback function failed to return an object.`
          );
        }
      }
      quickToCallbacks.push(actualPosition.animate.quickTo(keys, actualOptions));
    }
    const keysArray = [...keys];
    Object.freeze(keysArray);
    const quickToCB = (...args) => {
      const argsLength = args.length;
      if (argsLength === 0) {
        return;
      }
      if (typeof args[0] === "function") {
        const dataCallback = args[0];
        index = -1;
        let cntr = 0;
        if (isIterable(position)) {
          for (const entry of position) {
            index++;
            const isPosition = __privateMethod(this, _isPosition, isPosition_fn).call(this, entry);
            const actualPosition = isPosition ? entry : entry.position;
            if (!__privateMethod(this, _isPosition, isPosition_fn).call(this, actualPosition)) {
              continue;
            }
            callbackOptions.index = index;
            callbackOptions.position = position;
            callbackOptions.data = isPosition ? void 0 : entry;
            const toData = dataCallback(callbackOptions);
            if (toData === null || toData === void 0) {
              continue;
            }
            const toDataIterable = isIterable(toData);
            if (!Number.isFinite(toData) && !toDataIterable && typeof toData !== "object") {
              throw new TypeError(`AnimationGroupAPI.quickTo error: toData callback function iteration(${index}) failed to return a finite number, iterable list, or object.`);
            }
            if (toDataIterable) {
              quickToCallbacks[cntr++](...toData);
            } else {
              quickToCallbacks[cntr++](toData);
            }
          }
        } else {
          const isPosition = __privateMethod(this, _isPosition, isPosition_fn).call(this, position);
          const actualPosition = isPosition ? position : position.position;
          if (!__privateMethod(this, _isPosition, isPosition_fn).call(this, actualPosition)) {
            return;
          }
          callbackOptions.index = 0;
          callbackOptions.position = position;
          callbackOptions.data = isPosition ? void 0 : position;
          const toData = dataCallback(callbackOptions);
          if (toData === null || toData === void 0) {
            return;
          }
          const toDataIterable = isIterable(toData);
          if (!Number.isFinite(toData) && !toDataIterable && typeof toData !== "object") {
            throw new TypeError(`AnimationGroupAPI.quickTo error: toData callback function iteration(${index}) failed to return a finite number, iterable list, or object.`);
          }
          if (toDataIterable) {
            quickToCallbacks[cntr++](...toData);
          } else {
            quickToCallbacks[cntr++](toData);
          }
        }
      } else {
        for (let cntr = quickToCallbacks.length; --cntr >= 0; ) {
          quickToCallbacks[cntr](...args);
        }
      }
    };
    quickToCB.keys = keysArray;
    quickToCB.options = (options2) => {
      if (options2 !== void 0 && !isObject(options2) && typeof options2 !== "function") {
        throw new TypeError(`AnimationGroupAPI.quickTo error: 'options' is not an object or function.`);
      }
      if (isObject(options2)) {
        for (let cntr = quickToCallbacks.length; --cntr >= 0; ) {
          quickToCallbacks[cntr].options(options2);
        }
      } else if (typeof options2 === "function") {
        if (isIterable(position)) {
          index = -1;
          let cntr = 0;
          for (const entry of position) {
            index++;
            const isPosition = __privateMethod(this, _isPosition, isPosition_fn).call(this, entry);
            const actualPosition = isPosition ? entry : entry.position;
            if (!__privateMethod(this, _isPosition, isPosition_fn).call(this, actualPosition)) {
              console.warn(
                `AnimationGroupAPI.quickTo.options warning: No Position instance found at index: ${index}.`
              );
              continue;
            }
            callbackOptions.index = index;
            callbackOptions.position = position;
            callbackOptions.data = isPosition ? void 0 : entry;
            actualOptions = options2(callbackOptions);
            if (actualOptions === null || actualOptions === void 0) {
              continue;
            }
            if (typeof actualOptions !== "object") {
              throw new TypeError(
                `AnimationGroupAPI.quickTo.options error: options callback function iteration(${index}) failed to return an object.`
              );
            }
            quickToCallbacks[cntr++].options(actualOptions);
          }
        } else {
          const isPosition = __privateMethod(this, _isPosition, isPosition_fn).call(this, position);
          const actualPosition = isPosition ? position : position.position;
          if (!__privateMethod(this, _isPosition, isPosition_fn).call(this, actualPosition)) {
            console.warn(`AnimationGroupAPI.quickTo.options warning: No Position instance found.`);
            return quickToCB;
          }
          callbackOptions.index = 0;
          callbackOptions.position = position;
          callbackOptions.data = isPosition ? void 0 : position;
          actualOptions = options2(callbackOptions);
          if (typeof actualOptions !== "object") {
            throw new TypeError(
              `AnimationGroupAPI.quickTo error: options callback function failed to return an object.`
            );
          }
          quickToCallbacks[0].options(actualOptions);
        }
      }
      return quickToCB;
    };
    return quickToCB;
  }
};
_isPosition = new WeakSet();
isPosition_fn = function(object) {
  return isObject(object) && object.animate instanceof AnimationAPI;
};
/**
 * Checks of the given object is a Position instance by checking for AnimationAPI.
 *
 * @param {*}  object - Any data.
 *
 * @returns {boolean} Is Position.
 */
__privateAdd(AnimationGroupAPI, _isPosition);

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/position/initial/index.js
var initial_exports = {};
__export(initial_exports, {
  Centered: () => Centered,
  browserCentered: () => browserCentered
});

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/position/initial/Centered.js
var _element, _height, _lock, _width;
var Centered = class {
  constructor({ element, lock = false, width, height } = {}) {
    /**
     * @type {HTMLElement}
     */
    __privateAdd(this, _element, void 0);
    /**
     * Provides a manual setting of the element height. As things go `offsetHeight` causes a browser layout and is not
     * performance oriented. If manually set this height is used instead of `offsetHeight`.
     *
     * @type {number}
     */
    __privateAdd(this, _height, void 0);
    /**
     * Set from an optional value in the constructor to lock accessors preventing modification.
     */
    __privateAdd(this, _lock, void 0);
    /**
     * Provides a manual setting of the element width. As things go `offsetWidth` causes a browser layout and is not
     * performance oriented. If manually set this width is used instead of `offsetWidth`.
     *
     * @type {number}
     */
    __privateAdd(this, _width, void 0);
    this.element = element;
    this.width = width;
    this.height = height;
    __privateSet(this, _lock, typeof lock === "boolean" ? lock : false);
  }
  get element() {
    return __privateGet(this, _element);
  }
  get height() {
    return __privateGet(this, _height);
  }
  get width() {
    return __privateGet(this, _width);
  }
  set element(element) {
    if (__privateGet(this, _lock)) {
      return;
    }
    if (element === void 0 || element === null || element instanceof HTMLElement) {
      __privateSet(this, _element, element);
    } else {
      throw new TypeError(`'element' is not a HTMLElement, undefined, or null.`);
    }
  }
  set height(height) {
    if (__privateGet(this, _lock)) {
      return;
    }
    if (height === void 0 || Number.isFinite(height)) {
      __privateSet(this, _height, height);
    } else {
      throw new TypeError(`'height' is not a finite number or undefined.`);
    }
  }
  set width(width) {
    if (__privateGet(this, _lock)) {
      return;
    }
    if (width === void 0 || Number.isFinite(width)) {
      __privateSet(this, _width, width);
    } else {
      throw new TypeError(`'width' is not a finite number or undefined.`);
    }
  }
  setDimension(width, height) {
    if (__privateGet(this, _lock)) {
      return;
    }
    if (width === void 0 || Number.isFinite(width)) {
      __privateSet(this, _width, width);
    } else {
      throw new TypeError(`'width' is not a finite number or undefined.`);
    }
    if (height === void 0 || Number.isFinite(height)) {
      __privateSet(this, _height, height);
    } else {
      throw new TypeError(`'height' is not a finite number or undefined.`);
    }
  }
  getLeft(width) {
    var _a;
    const boundsWidth = __privateGet(this, _width) ?? ((_a = __privateGet(this, _element)) == null ? void 0 : _a.offsetWidth) ?? globalThis.innerWidth;
    return (boundsWidth - width) / 2;
  }
  getTop(height) {
    var _a;
    const boundsHeight = __privateGet(this, _height) ?? ((_a = __privateGet(this, _element)) == null ? void 0 : _a.offsetHeight) ?? globalThis.innerHeight;
    return (boundsHeight - height) / 2;
  }
};
_element = new WeakMap();
_height = new WeakMap();
_lock = new WeakMap();
_width = new WeakMap();

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/position/initial/index.js
var browserCentered = new Centered();

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/position/PositionChangeSet.js
var PositionChangeSet = class {
  constructor() {
    this.left = false;
    this.top = false;
    this.width = false;
    this.height = false;
    this.maxHeight = false;
    this.maxWidth = false;
    this.minHeight = false;
    this.minWidth = false;
    this.zIndex = false;
    this.transform = false;
    this.transformOrigin = false;
  }
  hasChange() {
    return this.left || this.top || this.width || this.height || this.maxHeight || this.maxWidth || this.minHeight || this.minWidth || this.zIndex || this.transform || this.transformOrigin;
  }
  set(value) {
    this.left = value;
    this.top = value;
    this.width = value;
    this.height = value;
    this.maxHeight = value;
    this.maxWidth = value;
    this.minHeight = value;
    this.minWidth = value;
    this.zIndex = value;
    this.transform = value;
    this.transformOrigin = value;
  }
};

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/position/PositionData.js
var PositionData = class {
  constructor({
    height = null,
    left = null,
    maxHeight = null,
    maxWidth = null,
    minHeight = null,
    minWidth = null,
    rotateX = null,
    rotateY = null,
    rotateZ = null,
    scale = null,
    translateX = null,
    translateY = null,
    translateZ = null,
    top = null,
    transformOrigin = null,
    width = null,
    zIndex = null
  } = {}) {
    this.height = height;
    this.left = left;
    this.maxHeight = maxHeight;
    this.maxWidth = maxWidth;
    this.minHeight = minHeight;
    this.minWidth = minWidth;
    this.rotateX = rotateX;
    this.rotateY = rotateY;
    this.rotateZ = rotateZ;
    this.scale = scale;
    this.top = top;
    this.transformOrigin = transformOrigin;
    this.translateX = translateX;
    this.translateY = translateY;
    this.translateZ = translateZ;
    this.width = width;
    this.zIndex = zIndex;
    Object.seal(this);
  }
  /**
   * Copies given data to this instance.
   *
   * @param {PositionData}   data - Copy from this instance.
   *
   * @returns {PositionData} This instance.
   */
  copy(data) {
    this.height = data.height;
    this.left = data.left;
    this.maxHeight = data.maxHeight;
    this.maxWidth = data.maxWidth;
    this.minHeight = data.minHeight;
    this.minWidth = data.minWidth;
    this.rotateX = data.rotateX;
    this.rotateY = data.rotateY;
    this.rotateZ = data.rotateZ;
    this.scale = data.scale;
    this.top = data.top;
    this.transformOrigin = data.transformOrigin;
    this.translateX = data.translateX;
    this.translateY = data.translateY;
    this.translateZ = data.translateZ;
    this.width = data.width;
    this.zIndex = data.zIndex;
    return this;
  }
};

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/position/PositionStateAPI.js
var _data2, _dataSaved, _position2, _transforms;
var PositionStateAPI = class {
  constructor(position, data, transforms) {
    /** @type {PositionData} */
    __privateAdd(this, _data2, void 0);
    /**
     * @type {Map<string, PositionDataExtended>}
     */
    __privateAdd(this, _dataSaved, /* @__PURE__ */ new Map());
    /** @type {Position} */
    __privateAdd(this, _position2, void 0);
    /** @type {Transforms} */
    __privateAdd(this, _transforms, void 0);
    __privateSet(this, _position2, position);
    __privateSet(this, _data2, data);
    __privateSet(this, _transforms, transforms);
  }
  /**
   * Returns any stored save state by name.
   *
   * @param {string}   name - Saved data set name.
   *
   * @returns {PositionDataExtended} The saved data set.
   */
  get({ name }) {
    if (typeof name !== "string") {
      throw new TypeError(`Position - getSave error: 'name' is not a string.`);
    }
    return __privateGet(this, _dataSaved).get(name);
  }
  /**
   * Returns any associated default data.
   *
   * @returns {PositionDataExtended} Associated default data.
   */
  getDefault() {
    return __privateGet(this, _dataSaved).get("#defaultData");
  }
  /**
   * Removes and returns any position state by name.
   *
   * @param {object}   options - Options.
   *
   * @param {string}   options.name - Name to remove and retrieve.
   *
   * @returns {PositionDataExtended} Saved position data.
   */
  remove({ name }) {
    if (typeof name !== "string") {
      throw new TypeError(`Position - remove: 'name' is not a string.`);
    }
    const data = __privateGet(this, _dataSaved).get(name);
    __privateGet(this, _dataSaved).delete(name);
    return data;
  }
  /**
   * Resets data to default values and invokes set.
   *
   * @param {object}   [opts] - Optional parameters.
   *
   * @param {boolean}  [opts.keepZIndex=false] - When true keeps current z-index.
   *
   * @param {boolean}  [opts.invokeSet=true] - When true invokes set method.
   *
   * @returns {boolean} Operation successful.
   */
  reset({ keepZIndex = false, invokeSet = true } = {}) {
    var _a, _b, _c, _d;
    const defaultData = __privateGet(this, _dataSaved).get("#defaultData");
    if (typeof defaultData !== "object") {
      return false;
    }
    if (__privateGet(this, _position2).animate.isScheduled) {
      __privateGet(this, _position2).animate.cancel();
    }
    const zIndex = __privateGet(this, _position2).zIndex;
    const data = Object.assign({}, defaultData);
    if (keepZIndex) {
      data.zIndex = zIndex;
    }
    __privateGet(this, _transforms).reset(data);
    if ((_b = (_a = __privateGet(this, _position2).parent) == null ? void 0 : _a.reactive) == null ? void 0 : _b.minimized) {
      (_d = (_c = __privateGet(this, _position2).parent) == null ? void 0 : _c.maximize) == null ? void 0 : _d.call(_c, { animate: false, duration: 0 });
    }
    if (invokeSet) {
      setTimeout(() => __privateGet(this, _position2).set(data), 0);
    }
    return true;
  }
  /**
   * Restores a saved positional state returning the data. Several optional parameters are available
   * to control whether the restore action occurs silently (no store / inline styles updates), animates
   * to the stored data, or simply sets the stored data. Restoring via {@link AnimationAPI.to} allows
   * specification of the duration, easing, and interpolate functions along with configuring a Promise to be
   * returned if awaiting the end of the animation.
   *
   * @param {object}            params - Parameters
   *
   * @param {string}            params.name - Saved data set name.
   *
   * @param {boolean}           [params.remove=false] - Remove data set.
   *
   * @param {Iterable<string>}  [params.properties] - Specific properties to set / animate.
   *
   * @param {boolean}           [params.silent] - Set position data directly; no store or style updates.
   *
   * @param {boolean}           [params.async=false] - If animating return a Promise that resolves with any saved data.
   *
   * @param {boolean}           [params.animateTo=false] - Animate to restore data.
   *
   * @param {number}            [params.duration=0.1] - Duration in seconds.
   *
   * @param {Function}          [params.ease=linear] - Easing function.
   *
   * @param {Function}          [params.interpolate=lerp] - Interpolation function.
   *
   * @returns {PositionDataExtended|Promise<PositionDataExtended>} Saved position data.
   */
  restore({
    name,
    remove = false,
    properties,
    silent = false,
    async = false,
    animateTo = false,
    duration = 0.1,
    ease = identity,
    interpolate = lerp$5
  }) {
    if (typeof name !== "string") {
      throw new TypeError(`Position - restore error: 'name' is not a string.`);
    }
    const dataSaved = __privateGet(this, _dataSaved).get(name);
    if (dataSaved) {
      if (remove) {
        __privateGet(this, _dataSaved).delete(name);
      }
      let data = dataSaved;
      if (isIterable(properties)) {
        data = {};
        for (const property of properties) {
          data[property] = dataSaved[property];
        }
      }
      if (silent) {
        for (const property in data) {
          __privateGet(this, _data2)[property] = data[property];
        }
        return dataSaved;
      } else if (animateTo) {
        if (data.transformOrigin !== __privateGet(this, _position2).transformOrigin) {
          __privateGet(this, _position2).transformOrigin = data.transformOrigin;
        }
        if (async) {
          return __privateGet(this, _position2).animate.to(data, { duration, ease, interpolate }).finished.then(() => dataSaved);
        } else {
          __privateGet(this, _position2).animate.to(data, { duration, ease, interpolate });
        }
      } else {
        __privateGet(this, _position2).set(data);
      }
    }
    return dataSaved;
  }
  /**
   * Saves current position state with the opportunity to add extra data to the saved state.
   *
   * @param {object}   opts - Options.
   *
   * @param {string}   opts.name - name to index this saved data.
   *
   * @param {...*}     [opts.extra] - Extra data to add to saved data.
   *
   * @returns {PositionData} Current position data
   */
  save({ name, ...extra }) {
    if (typeof name !== "string") {
      throw new TypeError(`Position - save error: 'name' is not a string.`);
    }
    const data = __privateGet(this, _position2).get(extra);
    __privateGet(this, _dataSaved).set(name, data);
    return data;
  }
  /**
   * Directly sets a position state.
   *
   * @param {object}   opts - Options.
   *
   * @param {string}   opts.name - name to index this saved data.
   *
   * @param {...*}     [opts.data] - Position data to set.
   */
  set({ name, ...data }) {
    if (typeof name !== "string") {
      throw new TypeError(`Position - set error: 'name' is not a string.`);
    }
    __privateGet(this, _dataSaved).set(name, data);
  }
};
_data2 = new WeakMap();
_dataSaved = new WeakMap();
_position2 = new WeakMap();
_transforms = new WeakMap();

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/position/StyleCache.js
var StyleCache = class {
  constructor() {
    this.el = void 0;
    this.computed = void 0;
    this.marginLeft = void 0;
    this.marginTop = void 0;
    this.maxHeight = void 0;
    this.maxWidth = void 0;
    this.minHeight = void 0;
    this.minWidth = void 0;
    this.hasWillChange = false;
    this.resizeObserved = {
      contentHeight: void 0,
      contentWidth: void 0,
      offsetHeight: void 0,
      offsetWidth: void 0
    };
    const storeResizeObserved = writable(this.resizeObserved);
    this.stores = {
      element: writable(this.el),
      resizeContentHeight: propertyStore(storeResizeObserved, "contentHeight"),
      resizeContentWidth: propertyStore(storeResizeObserved, "contentWidth"),
      resizeObserved: storeResizeObserved,
      resizeOffsetHeight: propertyStore(storeResizeObserved, "offsetHeight"),
      resizeOffsetWidth: propertyStore(storeResizeObserved, "offsetWidth")
    };
  }
  /**
   * Returns the cached offsetHeight from any attached `resizeObserver` action otherwise gets the offsetHeight from
   * the element directly. The more optimized path is using `resizeObserver` as getting it from the element
   * directly is more expensive and alters the execution order of an animation frame.
   *
   * @returns {number} The element offsetHeight.
   */
  get offsetHeight() {
    if (this.el instanceof HTMLElement) {
      return this.resizeObserved.offsetHeight !== void 0 ? this.resizeObserved.offsetHeight : this.el.offsetHeight;
    }
    throw new Error(`StyleCache - get offsetHeight error: no element assigned.`);
  }
  /**
   * Returns the cached offsetWidth from any attached `resizeObserver` action otherwise gets the offsetWidth from
   * the element directly. The more optimized path is using `resizeObserver` as getting it from the element
   * directly is more expensive and alters the execution order of an animation frame.
   *
   * @returns {number} The element offsetHeight.
   */
  get offsetWidth() {
    if (this.el instanceof HTMLElement) {
      return this.resizeObserved.offsetWidth !== void 0 ? this.resizeObserved.offsetWidth : this.el.offsetWidth;
    }
    throw new Error(`StyleCache - get offsetWidth error: no element assigned.`);
  }
  /**
   * @param {HTMLElement} el -
   *
   * @returns {boolean} Does element match cached element.
   */
  hasData(el) {
    return this.el === el;
  }
  /**
   * Resets the style cache.
   */
  reset() {
    if (this.el instanceof HTMLElement && this.el.isConnected && !this.hasWillChange) {
      this.el.style.willChange = null;
    }
    this.el = void 0;
    this.computed = void 0;
    this.marginLeft = void 0;
    this.marginTop = void 0;
    this.maxHeight = void 0;
    this.maxWidth = void 0;
    this.minHeight = void 0;
    this.minWidth = void 0;
    this.hasWillChange = false;
    this.resizeObserved.contentHeight = void 0;
    this.resizeObserved.contentWidth = void 0;
    this.resizeObserved.offsetHeight = void 0;
    this.resizeObserved.offsetWidth = void 0;
    this.stores.element.set(void 0);
  }
  /**
   * Updates the style cache with new data from the given element.
   *
   * @param {HTMLElement} el - An HTML element.
   */
  update(el) {
    this.el = el;
    this.computed = globalThis.getComputedStyle(el);
    this.marginLeft = styleParsePixels(el.style.marginLeft) ?? styleParsePixels(this.computed.marginLeft);
    this.marginTop = styleParsePixels(el.style.marginTop) ?? styleParsePixels(this.computed.marginTop);
    this.maxHeight = styleParsePixels(el.style.maxHeight) ?? styleParsePixels(this.computed.maxHeight);
    this.maxWidth = styleParsePixels(el.style.maxWidth) ?? styleParsePixels(this.computed.maxWidth);
    this.minHeight = styleParsePixels(el.style.minHeight) ?? styleParsePixels(this.computed.minHeight);
    this.minWidth = styleParsePixels(el.style.minWidth) ?? styleParsePixels(this.computed.minWidth);
    const willChange = el.style.willChange !== "" ? el.style.willChange : this.computed.willChange;
    this.hasWillChange = willChange !== "" && willChange !== "auto";
    this.stores.element.set(el);
  }
};

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/position/transform/TransformData.js
var _boundingRect, _corners, _mat4, _originTranslations;
var TransformData = class {
  constructor() {
    /**
     * Stores the calculated bounding rectangle.
     *
     * @type {DOMRect}
     */
    __privateAdd(this, _boundingRect, new DOMRect());
    /**
     * Stores the individual transformed corner points of the window in screenspace clockwise from:
     * top left -> top right -> bottom right -> bottom left.
     *
     * @type {Vector3[]}
     */
    __privateAdd(this, _corners, [vec3.create(), vec3.create(), vec3.create(), vec3.create()]);
    /**
     * Stores the current gl-matrix mat4 data.
     *
     * @type {Matrix4}
     */
    __privateAdd(this, _mat4, mat4.create());
    /**
     * Stores the pre & post origin translations to apply to matrix transforms.
     *
     * @type {Matrix4[]}
     */
    __privateAdd(this, _originTranslations, [mat4.create(), mat4.create()]);
    Object.seal(this);
  }
  /**
   * @returns {DOMRect} The bounding rectangle.
   */
  get boundingRect() {
    return __privateGet(this, _boundingRect);
  }
  /**
   * @returns {Vector3[]} The transformed corner points as vec3 in screen space.
   */
  get corners() {
    return __privateGet(this, _corners);
  }
  /**
   * @returns {string} Returns the CSS style string for the transform matrix.
   */
  get css() {
    return `matrix3d(${this.mat4.join(",")})`;
  }
  /**
   * @returns {Matrix4} The transform matrix.
   */
  get mat4() {
    return __privateGet(this, _mat4);
  }
  /**
   * @returns {Matrix4[]} The pre / post translation matrices for origin translation.
   */
  get originTranslations() {
    return __privateGet(this, _originTranslations);
  }
};
_boundingRect = new WeakMap();
_corners = new WeakMap();
_mat4 = new WeakMap();
_originTranslations = new WeakMap();

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/position/validators/AdapterValidators.js
var _enabled, _validatorData, _mapUnsubscribe;
var AdapterValidators = class {
  /**
   * @returns {[AdapterValidators, ValidatorData[]]} Returns this and internal storage for validator adapter.
   */
  constructor() {
    /** @type {boolean} */
    __privateAdd(this, _enabled, true);
    /**
     * @type {ValidatorData[]}
     */
    __privateAdd(this, _validatorData, void 0);
    __privateAdd(this, _mapUnsubscribe, /* @__PURE__ */ new Map());
    __privateSet(this, _validatorData, []);
    Object.seal(this);
    return [this, __privateGet(this, _validatorData)];
  }
  /**
   * @returns {boolean} Returns the enabled state.s
   */
  get enabled() {
    return __privateGet(this, _enabled);
  }
  /**
   * @returns {number} Returns the length of the validators array.
   */
  get length() {
    return __privateGet(this, _validatorData).length;
  }
  /**
   * @param {boolean}  enabled - Sets enabled state.
   */
  set enabled(enabled) {
    if (typeof enabled !== "boolean") {
      throw new TypeError(`'enabled' is not a boolean.`);
    }
    __privateSet(this, _enabled, enabled);
  }
  /**
   * Provides an iterator for validators.
   *
   * @returns {Generator<ValidatorData|undefined>} Generator / iterator of validators.
   * @yields {ValidatorData}
   */
  *[Symbol.iterator]() {
    if (__privateGet(this, _validatorData).length === 0) {
      return;
    }
    for (const entry of __privateGet(this, _validatorData)) {
      yield { ...entry };
    }
  }
  /**
   * @param {...(ValidatorFn|ValidatorData)}   validators -
   */
  add(...validators) {
    for (const validator of validators) {
      const validatorType = typeof validator;
      if (validatorType !== "function" && validatorType !== "object" || validator === null) {
        throw new TypeError(`AdapterValidator error: 'validator' is not a function or object.`);
      }
      let data = void 0;
      let subscribeFn = void 0;
      switch (validatorType) {
        case "function":
          data = {
            id: void 0,
            validator,
            weight: 1
          };
          subscribeFn = validator.subscribe;
          break;
        case "object":
          if (typeof validator.validator !== "function") {
            throw new TypeError(`AdapterValidator error: 'validator' attribute is not a function.`);
          }
          if (validator.weight !== void 0 && typeof validator.weight !== "number" || (validator.weight < 0 || validator.weight > 1)) {
            throw new TypeError(
              `AdapterValidator error: 'weight' attribute is not a number between '0 - 1' inclusive.`
            );
          }
          data = {
            id: validator.id !== void 0 ? validator.id : void 0,
            validator: validator.validator.bind(validator),
            weight: validator.weight || 1,
            instance: validator
          };
          subscribeFn = validator.validator.subscribe ?? validator.subscribe;
          break;
      }
      const index = __privateGet(this, _validatorData).findIndex((value) => {
        return data.weight < value.weight;
      });
      if (index >= 0) {
        __privateGet(this, _validatorData).splice(index, 0, data);
      } else {
        __privateGet(this, _validatorData).push(data);
      }
      if (typeof subscribeFn === "function") {
        const unsubscribe = subscribeFn();
        if (typeof unsubscribe !== "function") {
          throw new TypeError(
            "AdapterValidator error: Filter has subscribe function, but no unsubscribe function is returned."
          );
        }
        if (__privateGet(this, _mapUnsubscribe).has(data.validator)) {
          throw new Error(
            "AdapterValidator error: Filter added already has an unsubscribe function registered."
          );
        }
        __privateGet(this, _mapUnsubscribe).set(data.validator, unsubscribe);
      }
    }
  }
  clear() {
    __privateGet(this, _validatorData).length = 0;
    for (const unsubscribe of __privateGet(this, _mapUnsubscribe).values()) {
      unsubscribe();
    }
    __privateGet(this, _mapUnsubscribe).clear();
  }
  /**
   * @param {...(ValidatorFn|ValidatorData)}   validators -
   */
  remove(...validators) {
    const length = __privateGet(this, _validatorData).length;
    if (length === 0) {
      return;
    }
    for (const data of validators) {
      const actualValidator = typeof data === "function" ? data : isObject(data) ? data.validator : void 0;
      if (!actualValidator) {
        continue;
      }
      for (let cntr = __privateGet(this, _validatorData).length; --cntr >= 0; ) {
        if (__privateGet(this, _validatorData)[cntr].validator === actualValidator) {
          __privateGet(this, _validatorData).splice(cntr, 1);
          let unsubscribe = void 0;
          if (typeof (unsubscribe = __privateGet(this, _mapUnsubscribe).get(actualValidator)) === "function") {
            unsubscribe();
            __privateGet(this, _mapUnsubscribe).delete(actualValidator);
          }
        }
      }
    }
  }
  /**
   * Remove validators by the provided callback. The callback takes 3 parameters: `id`, `validator`, and `weight`.
   * Any truthy value returned will remove that validator.
   *
   * @param {function(*, ValidatorFn, number): boolean} callback - Callback function to evaluate each validator
   *                                                                  entry.
   */
  removeBy(callback) {
    const length = __privateGet(this, _validatorData).length;
    if (length === 0) {
      return;
    }
    if (typeof callback !== "function") {
      throw new TypeError(`AdapterValidator error: 'callback' is not a function.`);
    }
    __privateSet(this, _validatorData, __privateGet(this, _validatorData).filter((data) => {
      const remove = callback.call(callback, { ...data });
      if (remove) {
        let unsubscribe;
        if (typeof (unsubscribe = __privateGet(this, _mapUnsubscribe).get(data.validator)) === "function") {
          unsubscribe();
          __privateGet(this, _mapUnsubscribe).delete(data.validator);
        }
      }
      return !remove;
    }));
  }
  removeById(...ids) {
    const length = __privateGet(this, _validatorData).length;
    if (length === 0) {
      return;
    }
    __privateSet(this, _validatorData, __privateGet(this, _validatorData).filter((data) => {
      let remove = false;
      for (const id of ids) {
        remove |= data.id === id;
      }
      if (remove) {
        let unsubscribe;
        if (typeof (unsubscribe = __privateGet(this, _mapUnsubscribe).get(data.validator)) === "function") {
          unsubscribe();
          __privateGet(this, _mapUnsubscribe).delete(data.validator);
        }
      }
      return !remove;
    }));
  }
};
_enabled = new WeakMap();
_validatorData = new WeakMap();
_mapUnsubscribe = new WeakMap();

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/position/validators/index.js
var validators_exports = {};
__export(validators_exports, {
  BasicBounds: () => BasicBounds,
  TransformBounds: () => TransformBounds,
  basicWindow: () => basicWindow,
  transformWindow: () => transformWindow
});

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/position/validators/BasicBounds.js
var _constrain, _element2, _enabled2, _height2, _lock2, _width2;
var BasicBounds = class {
  constructor({ constrain = true, element, enabled = true, lock = false, width, height } = {}) {
    /**
     * When true constrains the min / max width or height to element.
     *
     * @type {boolean}
     */
    __privateAdd(this, _constrain, void 0);
    /**
     * @type {HTMLElement}
     */
    __privateAdd(this, _element2, void 0);
    /**
     * When true the validator is active.
     *
     * @type {boolean}
     */
    __privateAdd(this, _enabled2, void 0);
    /**
     * Provides a manual setting of the element height. As things go `offsetHeight` causes a browser layout and is not
     * performance oriented. If manually set this height is used instead of `offsetHeight`.
     *
     * @type {number}
     */
    __privateAdd(this, _height2, void 0);
    /**
     * Set from an optional value in the constructor to lock accessors preventing modification.
     */
    __privateAdd(this, _lock2, void 0);
    /**
     * Provides a manual setting of the element width. As things go `offsetWidth` causes a browser layout and is not
     * performance oriented. If manually set this width is used instead of `offsetWidth`.
     *
     * @type {number}
     */
    __privateAdd(this, _width2, void 0);
    this.element = element;
    this.constrain = constrain;
    this.enabled = enabled;
    this.width = width;
    this.height = height;
    __privateSet(this, _lock2, typeof lock === "boolean" ? lock : false);
  }
  get constrain() {
    return __privateGet(this, _constrain);
  }
  get element() {
    return __privateGet(this, _element2);
  }
  get enabled() {
    return __privateGet(this, _enabled2);
  }
  get height() {
    return __privateGet(this, _height2);
  }
  get width() {
    return __privateGet(this, _width2);
  }
  set constrain(constrain) {
    if (__privateGet(this, _lock2)) {
      return;
    }
    if (typeof constrain !== "boolean") {
      throw new TypeError(`'constrain' is not a boolean.`);
    }
    __privateSet(this, _constrain, constrain);
  }
  set element(element) {
    if (__privateGet(this, _lock2)) {
      return;
    }
    if (element === void 0 || element === null || element instanceof HTMLElement) {
      __privateSet(this, _element2, element);
    } else {
      throw new TypeError(`'element' is not a HTMLElement, undefined, or null.`);
    }
  }
  set enabled(enabled) {
    if (__privateGet(this, _lock2)) {
      return;
    }
    if (typeof enabled !== "boolean") {
      throw new TypeError(`'enabled' is not a boolean.`);
    }
    __privateSet(this, _enabled2, enabled);
  }
  set height(height) {
    if (__privateGet(this, _lock2)) {
      return;
    }
    if (height === void 0 || Number.isFinite(height)) {
      __privateSet(this, _height2, height);
    } else {
      throw new TypeError(`'height' is not a finite number or undefined.`);
    }
  }
  set width(width) {
    if (__privateGet(this, _lock2)) {
      return;
    }
    if (width === void 0 || Number.isFinite(width)) {
      __privateSet(this, _width2, width);
    } else {
      throw new TypeError(`'width' is not a finite number or undefined.`);
    }
  }
  setDimension(width, height) {
    if (__privateGet(this, _lock2)) {
      return;
    }
    if (width === void 0 || Number.isFinite(width)) {
      __privateSet(this, _width2, width);
    } else {
      throw new TypeError(`'width' is not a finite number or undefined.`);
    }
    if (height === void 0 || Number.isFinite(height)) {
      __privateSet(this, _height2, height);
    } else {
      throw new TypeError(`'height' is not a finite number or undefined.`);
    }
  }
  /**
   * Provides a validator that respects transforms in positional data constraining the position to within the target
   * elements bounds.
   *
   * @param {ValidationData}   valData - The associated validation data for position updates.
   *
   * @returns {PositionData} Potentially adjusted position data.
   */
  validator(valData) {
    var _a, _b;
    if (!__privateGet(this, _enabled2)) {
      return valData.position;
    }
    const boundsWidth = __privateGet(this, _width2) ?? ((_a = __privateGet(this, _element2)) == null ? void 0 : _a.offsetWidth) ?? globalThis.innerWidth;
    const boundsHeight = __privateGet(this, _height2) ?? ((_b = __privateGet(this, _element2)) == null ? void 0 : _b.offsetHeight) ?? globalThis.innerHeight;
    if (typeof valData.position.width === "number") {
      const maxW = valData.maxWidth ?? (__privateGet(this, _constrain) ? boundsWidth : Number.MAX_SAFE_INTEGER);
      valData.position.width = valData.width = Math.clamped(valData.position.width, valData.minWidth, maxW);
      if (valData.width + valData.position.left + valData.marginLeft > boundsWidth) {
        valData.position.left = boundsWidth - valData.width - valData.marginLeft;
      }
    }
    if (typeof valData.position.height === "number") {
      const maxH = valData.maxHeight ?? (__privateGet(this, _constrain) ? boundsHeight : Number.MAX_SAFE_INTEGER);
      valData.position.height = valData.height = Math.clamped(valData.position.height, valData.minHeight, maxH);
      if (valData.height + valData.position.top + valData.marginTop > boundsHeight) {
        valData.position.top = boundsHeight - valData.height - valData.marginTop;
      }
    }
    const maxL = Math.max(boundsWidth - valData.width - valData.marginLeft, 0);
    valData.position.left = Math.round(Math.clamped(valData.position.left, 0, maxL));
    const maxT = Math.max(boundsHeight - valData.height - valData.marginTop, 0);
    valData.position.top = Math.round(Math.clamped(valData.position.top, 0, maxT));
    return valData.position;
  }
};
_constrain = new WeakMap();
_element2 = new WeakMap();
_enabled2 = new WeakMap();
_height2 = new WeakMap();
_lock2 = new WeakMap();
_width2 = new WeakMap();

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/position/validators/TransformBounds.js
var s_TRANSFORM_DATA = new TransformData();
var _constrain2, _element3, _enabled3, _height3, _lock3, _width3;
var TransformBounds = class {
  constructor({ constrain = true, element, enabled = true, lock = false, width, height } = {}) {
    /**
     * When true constrains the min / max width or height to element.
     *
     * @type {boolean}
     */
    __privateAdd(this, _constrain2, void 0);
    /**
     * @type {HTMLElement}
     */
    __privateAdd(this, _element3, void 0);
    /**
     * When true the validator is active.
     *
     * @type {boolean}
     */
    __privateAdd(this, _enabled3, void 0);
    /**
     * Provides a manual setting of the element height. As things go `offsetHeight` causes a browser layout and is not
     * performance oriented. If manually set this height is used instead of `offsetHeight`.
     *
     * @type {number}
     */
    __privateAdd(this, _height3, void 0);
    /**
     * Set from an optional value in the constructor to lock accessors preventing modification.
     */
    __privateAdd(this, _lock3, void 0);
    /**
     * Provides a manual setting of the element width. As things go `offsetWidth` causes a browser layout and is not
     * performance oriented. If manually set this width is used instead of `offsetWidth`.
     *
     * @type {number}
     */
    __privateAdd(this, _width3, void 0);
    this.element = element;
    this.constrain = constrain;
    this.enabled = enabled;
    this.width = width;
    this.height = height;
    __privateSet(this, _lock3, typeof lock === "boolean" ? lock : false);
  }
  get constrain() {
    return __privateGet(this, _constrain2);
  }
  get element() {
    return __privateGet(this, _element3);
  }
  get enabled() {
    return __privateGet(this, _enabled3);
  }
  get height() {
    return __privateGet(this, _height3);
  }
  get width() {
    return __privateGet(this, _width3);
  }
  set constrain(constrain) {
    if (__privateGet(this, _lock3)) {
      return;
    }
    if (typeof constrain !== "boolean") {
      throw new TypeError(`'constrain' is not a boolean.`);
    }
    __privateSet(this, _constrain2, constrain);
  }
  set element(element) {
    if (__privateGet(this, _lock3)) {
      return;
    }
    if (element === void 0 || element === null || element instanceof HTMLElement) {
      __privateSet(this, _element3, element);
    } else {
      throw new TypeError(`'element' is not a HTMLElement, undefined, or null.`);
    }
  }
  set enabled(enabled) {
    if (__privateGet(this, _lock3)) {
      return;
    }
    if (typeof enabled !== "boolean") {
      throw new TypeError(`'enabled' is not a boolean.`);
    }
    __privateSet(this, _enabled3, enabled);
  }
  set height(height) {
    if (__privateGet(this, _lock3)) {
      return;
    }
    if (height === void 0 || Number.isFinite(height)) {
      __privateSet(this, _height3, height);
    } else {
      throw new TypeError(`'height' is not a finite number or undefined.`);
    }
  }
  set width(width) {
    if (__privateGet(this, _lock3)) {
      return;
    }
    if (width === void 0 || Number.isFinite(width)) {
      __privateSet(this, _width3, width);
    } else {
      throw new TypeError(`'width' is not a finite number or undefined.`);
    }
  }
  setDimension(width, height) {
    if (__privateGet(this, _lock3)) {
      return;
    }
    if (width === void 0 || Number.isFinite(width)) {
      __privateSet(this, _width3, width);
    } else {
      throw new TypeError(`'width' is not a finite number or undefined.`);
    }
    if (height === void 0 || Number.isFinite(height)) {
      __privateSet(this, _height3, height);
    } else {
      throw new TypeError(`'height' is not a finite number or undefined.`);
    }
  }
  /**
   * Provides a validator that respects transforms in positional data constraining the position to within the target
   * elements bounds.
   *
   * @param {ValidationData}   valData - The associated validation data for position updates.
   *
   * @returns {PositionData} Potentially adjusted position data.
   */
  validator(valData) {
    var _a, _b;
    if (!__privateGet(this, _enabled3)) {
      return valData.position;
    }
    const boundsWidth = __privateGet(this, _width3) ?? ((_a = __privateGet(this, _element3)) == null ? void 0 : _a.offsetWidth) ?? globalThis.innerWidth;
    const boundsHeight = __privateGet(this, _height3) ?? ((_b = __privateGet(this, _element3)) == null ? void 0 : _b.offsetHeight) ?? globalThis.innerHeight;
    if (typeof valData.position.width === "number") {
      const maxW = valData.maxWidth ?? (__privateGet(this, _constrain2) ? boundsWidth : Number.MAX_SAFE_INTEGER);
      valData.position.width = Math.clamped(valData.width, valData.minWidth, maxW);
    }
    if (typeof valData.position.height === "number") {
      const maxH = valData.maxHeight ?? (__privateGet(this, _constrain2) ? boundsHeight : Number.MAX_SAFE_INTEGER);
      valData.position.height = Math.clamped(valData.height, valData.minHeight, maxH);
    }
    const data = valData.transforms.getData(valData.position, s_TRANSFORM_DATA, valData);
    const initialX = data.boundingRect.x;
    const initialY = data.boundingRect.y;
    if (data.boundingRect.bottom + valData.marginTop > boundsHeight) {
      data.boundingRect.y += boundsHeight - data.boundingRect.bottom - valData.marginTop;
    }
    if (data.boundingRect.right + valData.marginLeft > boundsWidth) {
      data.boundingRect.x += boundsWidth - data.boundingRect.right - valData.marginLeft;
    }
    if (data.boundingRect.top - valData.marginTop < 0) {
      data.boundingRect.y += Math.abs(data.boundingRect.top - valData.marginTop);
    }
    if (data.boundingRect.left - valData.marginLeft < 0) {
      data.boundingRect.x += Math.abs(data.boundingRect.left - valData.marginLeft);
    }
    valData.position.left -= initialX - data.boundingRect.x;
    valData.position.top -= initialY - data.boundingRect.y;
    return valData.position;
  }
};
_constrain2 = new WeakMap();
_element3 = new WeakMap();
_enabled3 = new WeakMap();
_height3 = new WeakMap();
_lock3 = new WeakMap();
_width3 = new WeakMap();

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/position/validators/index.js
var basicWindow = new BasicBounds({ lock: true });
var transformWindow = new TransformBounds({ lock: true });

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/position/transform/Transforms.js
var s_SCALE_VECTOR = [1, 1, 1];
var s_TRANSLATE_VECTOR = [0, 0, 0];
var s_MAT4_RESULT = mat4.create();
var s_MAT4_TEMP = mat4.create();
var s_VEC3_TEMP = vec3.create();
var _orderList;
var Transforms = class {
  constructor() {
    /**
     * Stores the transform keys in the order added.
     *
     * @type {string[]}
     */
    __privateAdd(this, _orderList, []);
    this._data = {};
  }
  /**
   * @returns {boolean} Whether there are active transforms in local data.
   */
  get isActive() {
    return __privateGet(this, _orderList).length > 0;
  }
  /**
   * @returns {number|undefined} Any local rotateX data.
   */
  get rotateX() {
    return this._data.rotateX;
  }
  /**
   * @returns {number|undefined} Any local rotateY data.
   */
  get rotateY() {
    return this._data.rotateY;
  }
  /**
   * @returns {number|undefined} Any local rotateZ data.
   */
  get rotateZ() {
    return this._data.rotateZ;
  }
  /**
   * @returns {number|undefined} Any local rotateZ scale.
   */
  get scale() {
    return this._data.scale;
  }
  /**
   * @returns {number|undefined} Any local translateZ data.
   */
  get translateX() {
    return this._data.translateX;
  }
  /**
   * @returns {number|undefined} Any local translateZ data.
   */
  get translateY() {
    return this._data.translateY;
  }
  /**
   * @returns {number|undefined} Any local translateZ data.
   */
  get translateZ() {
    return this._data.translateZ;
  }
  /**
   * Sets the local rotateX data if the value is a finite number otherwise removes the local data.
   *
   * @param {number|null|undefined}   value - A value to set.
   */
  set rotateX(value) {
    if (Number.isFinite(value)) {
      if (this._data.rotateX === void 0) {
        __privateGet(this, _orderList).push("rotateX");
      }
      this._data.rotateX = value;
    } else {
      if (this._data.rotateX !== void 0) {
        const index = __privateGet(this, _orderList).findIndex((entry) => entry === "rotateX");
        if (index >= 0) {
          __privateGet(this, _orderList).splice(index, 1);
        }
      }
      delete this._data.rotateX;
    }
  }
  /**
   * Sets the local rotateY data if the value is a finite number otherwise removes the local data.
   *
   * @param {number|null|undefined}   value - A value to set.
   */
  set rotateY(value) {
    if (Number.isFinite(value)) {
      if (this._data.rotateY === void 0) {
        __privateGet(this, _orderList).push("rotateY");
      }
      this._data.rotateY = value;
    } else {
      if (this._data.rotateY !== void 0) {
        const index = __privateGet(this, _orderList).findIndex((entry) => entry === "rotateY");
        if (index >= 0) {
          __privateGet(this, _orderList).splice(index, 1);
        }
      }
      delete this._data.rotateY;
    }
  }
  /**
   * Sets the local rotateZ data if the value is a finite number otherwise removes the local data.
   *
   * @param {number|null|undefined}   value - A value to set.
   */
  set rotateZ(value) {
    if (Number.isFinite(value)) {
      if (this._data.rotateZ === void 0) {
        __privateGet(this, _orderList).push("rotateZ");
      }
      this._data.rotateZ = value;
    } else {
      if (this._data.rotateZ !== void 0) {
        const index = __privateGet(this, _orderList).findIndex((entry) => entry === "rotateZ");
        if (index >= 0) {
          __privateGet(this, _orderList).splice(index, 1);
        }
      }
      delete this._data.rotateZ;
    }
  }
  /**
   * Sets the local scale data if the value is a finite number otherwise removes the local data.
   *
   * @param {number|null|undefined}   value - A value to set.
   */
  set scale(value) {
    if (Number.isFinite(value)) {
      if (this._data.scale === void 0) {
        __privateGet(this, _orderList).push("scale");
      }
      this._data.scale = value;
    } else {
      if (this._data.scale !== void 0) {
        const index = __privateGet(this, _orderList).findIndex((entry) => entry === "scale");
        if (index >= 0) {
          __privateGet(this, _orderList).splice(index, 1);
        }
      }
      delete this._data.scale;
    }
  }
  /**
   * Sets the local translateX data if the value is a finite number otherwise removes the local data.
   *
   * @param {number|null|undefined}   value - A value to set.
   */
  set translateX(value) {
    if (Number.isFinite(value)) {
      if (this._data.translateX === void 0) {
        __privateGet(this, _orderList).push("translateX");
      }
      this._data.translateX = value;
    } else {
      if (this._data.translateX !== void 0) {
        const index = __privateGet(this, _orderList).findIndex((entry) => entry === "translateX");
        if (index >= 0) {
          __privateGet(this, _orderList).splice(index, 1);
        }
      }
      delete this._data.translateX;
    }
  }
  /**
   * Sets the local translateY data if the value is a finite number otherwise removes the local data.
   *
   * @param {number|null|undefined}   value - A value to set.
   */
  set translateY(value) {
    if (Number.isFinite(value)) {
      if (this._data.translateY === void 0) {
        __privateGet(this, _orderList).push("translateY");
      }
      this._data.translateY = value;
    } else {
      if (this._data.translateY !== void 0) {
        const index = __privateGet(this, _orderList).findIndex((entry) => entry === "translateY");
        if (index >= 0) {
          __privateGet(this, _orderList).splice(index, 1);
        }
      }
      delete this._data.translateY;
    }
  }
  /**
   * Sets the local translateZ data if the value is a finite number otherwise removes the local data.
   *
   * @param {number|null|undefined}   value - A value to set.
   */
  set translateZ(value) {
    if (Number.isFinite(value)) {
      if (this._data.translateZ === void 0) {
        __privateGet(this, _orderList).push("translateZ");
      }
      this._data.translateZ = value;
    } else {
      if (this._data.translateZ !== void 0) {
        const index = __privateGet(this, _orderList).findIndex((entry) => entry === "translateZ");
        if (index >= 0) {
          __privateGet(this, _orderList).splice(index, 1);
        }
      }
      delete this._data.translateZ;
    }
  }
  /**
   * Returns the matrix3d CSS transform for the given position / transform data.
   *
   * @param {object} [data] - Optional position data otherwise use local stored transform data.
   *
   * @returns {string} The CSS matrix3d string.
   */
  getCSS(data = this._data) {
    return `matrix3d(${this.getMat4(data, s_MAT4_RESULT).join(",")})`;
  }
  /**
   * Returns the matrix3d CSS transform for the given position / transform data.
   *
   * @param {object} [data] - Optional position data otherwise use local stored transform data.
   *
   * @returns {string} The CSS matrix3d string.
   */
  getCSSOrtho(data = this._data) {
    return `matrix3d(${this.getMat4Ortho(data, s_MAT4_RESULT).join(",")})`;
  }
  /**
   * Collects all data including a bounding rect, transform matrix, and points array of the given {@link PositionData}
   * instance with the applied local transform data.
   *
   * @param {PositionData} position - The position data to process.
   *
   * @param {TransformData} [output] - Optional TransformData output instance.
   *
   * @param {object} [validationData] - Optional validation data for adjustment parameters.
   *
   * @returns {TransformData} The output TransformData instance.
   */
  getData(position, output = new TransformData(), validationData = {}) {
    const valWidth = validationData.width ?? 0;
    const valHeight = validationData.height ?? 0;
    const valOffsetTop = validationData.offsetTop ?? validationData.marginTop ?? 0;
    const valOffsetLeft = validationData.offsetLeft ?? validationData.offsetLeft ?? 0;
    position.top += valOffsetTop;
    position.left += valOffsetLeft;
    const width = Number.isFinite(position.width) ? position.width : valWidth;
    const height = Number.isFinite(position.height) ? position.height : valHeight;
    const rect = output.corners;
    if (this.hasTransform(position)) {
      rect[0][0] = rect[0][1] = rect[0][2] = 0;
      rect[1][0] = width;
      rect[1][1] = rect[1][2] = 0;
      rect[2][0] = width;
      rect[2][1] = height;
      rect[2][2] = 0;
      rect[3][0] = 0;
      rect[3][1] = height;
      rect[3][2] = 0;
      const matrix = this.getMat4(position, output.mat4);
      const translate = s_GET_ORIGIN_TRANSLATION(position.transformOrigin, width, height, output.originTranslations);
      if (transformOriginDefault === position.transformOrigin) {
        vec3.transformMat4(rect[0], rect[0], matrix);
        vec3.transformMat4(rect[1], rect[1], matrix);
        vec3.transformMat4(rect[2], rect[2], matrix);
        vec3.transformMat4(rect[3], rect[3], matrix);
      } else {
        vec3.transformMat4(rect[0], rect[0], translate[0]);
        vec3.transformMat4(rect[0], rect[0], matrix);
        vec3.transformMat4(rect[0], rect[0], translate[1]);
        vec3.transformMat4(rect[1], rect[1], translate[0]);
        vec3.transformMat4(rect[1], rect[1], matrix);
        vec3.transformMat4(rect[1], rect[1], translate[1]);
        vec3.transformMat4(rect[2], rect[2], translate[0]);
        vec3.transformMat4(rect[2], rect[2], matrix);
        vec3.transformMat4(rect[2], rect[2], translate[1]);
        vec3.transformMat4(rect[3], rect[3], translate[0]);
        vec3.transformMat4(rect[3], rect[3], matrix);
        vec3.transformMat4(rect[3], rect[3], translate[1]);
      }
      rect[0][0] = position.left + rect[0][0];
      rect[0][1] = position.top + rect[0][1];
      rect[1][0] = position.left + rect[1][0];
      rect[1][1] = position.top + rect[1][1];
      rect[2][0] = position.left + rect[2][0];
      rect[2][1] = position.top + rect[2][1];
      rect[3][0] = position.left + rect[3][0];
      rect[3][1] = position.top + rect[3][1];
    } else {
      rect[0][0] = position.left;
      rect[0][1] = position.top;
      rect[1][0] = position.left + width;
      rect[1][1] = position.top;
      rect[2][0] = position.left + width;
      rect[2][1] = position.top + height;
      rect[3][0] = position.left;
      rect[3][1] = position.top + height;
      mat4.identity(output.mat4);
    }
    let maxX = Number.MIN_SAFE_INTEGER;
    let maxY = Number.MIN_SAFE_INTEGER;
    let minX = Number.MAX_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;
    for (let cntr = 4; --cntr >= 0; ) {
      if (rect[cntr][0] > maxX) {
        maxX = rect[cntr][0];
      }
      if (rect[cntr][0] < minX) {
        minX = rect[cntr][0];
      }
      if (rect[cntr][1] > maxY) {
        maxY = rect[cntr][1];
      }
      if (rect[cntr][1] < minY) {
        minY = rect[cntr][1];
      }
    }
    const boundingRect = output.boundingRect;
    boundingRect.x = minX;
    boundingRect.y = minY;
    boundingRect.width = maxX - minX;
    boundingRect.height = maxY - minY;
    position.top -= valOffsetTop;
    position.left -= valOffsetLeft;
    return output;
  }
  /**
   * Creates a transform matrix based on local data applied in order it was added.
   *
   * If no data object is provided then the source is the local transform data. If another data object is supplied
   * then the stored local transform order is applied then all remaining transform keys are applied. This allows the
   * construction of a transform matrix in advance of setting local data and is useful in collision detection.
   *
   * @param {object}   [data] - PositionData instance or local transform data.
   *
   * @param {Matrix4}  [output] - The output mat4 instance.
   *
   * @returns {Matrix4} Transform matrix.
   */
  getMat4(data = this._data, output = mat4.create()) {
    const matrix = mat4.identity(output);
    let seenKeys = 0;
    const orderList = __privateGet(this, _orderList);
    for (let cntr = 0; cntr < orderList.length; cntr++) {
      const key = orderList[cntr];
      switch (key) {
        case "rotateX":
          seenKeys |= transformKeysBitwise.rotateX;
          mat4.multiply(matrix, matrix, mat4.fromXRotation(s_MAT4_TEMP, degToRad(data[key])));
          break;
        case "rotateY":
          seenKeys |= transformKeysBitwise.rotateY;
          mat4.multiply(matrix, matrix, mat4.fromYRotation(s_MAT4_TEMP, degToRad(data[key])));
          break;
        case "rotateZ":
          seenKeys |= transformKeysBitwise.rotateZ;
          mat4.multiply(matrix, matrix, mat4.fromZRotation(s_MAT4_TEMP, degToRad(data[key])));
          break;
        case "scale":
          seenKeys |= transformKeysBitwise.scale;
          s_SCALE_VECTOR[0] = s_SCALE_VECTOR[1] = data[key];
          mat4.multiply(matrix, matrix, mat4.fromScaling(s_MAT4_TEMP, s_SCALE_VECTOR));
          break;
        case "translateX":
          seenKeys |= transformKeysBitwise.translateX;
          s_TRANSLATE_VECTOR[0] = data.translateX;
          s_TRANSLATE_VECTOR[1] = 0;
          s_TRANSLATE_VECTOR[2] = 0;
          mat4.multiply(matrix, matrix, mat4.fromTranslation(s_MAT4_TEMP, s_TRANSLATE_VECTOR));
          break;
        case "translateY":
          seenKeys |= transformKeysBitwise.translateY;
          s_TRANSLATE_VECTOR[0] = 0;
          s_TRANSLATE_VECTOR[1] = data.translateY;
          s_TRANSLATE_VECTOR[2] = 0;
          mat4.multiply(matrix, matrix, mat4.fromTranslation(s_MAT4_TEMP, s_TRANSLATE_VECTOR));
          break;
        case "translateZ":
          seenKeys |= transformKeysBitwise.translateZ;
          s_TRANSLATE_VECTOR[0] = 0;
          s_TRANSLATE_VECTOR[1] = 0;
          s_TRANSLATE_VECTOR[2] = data.translateZ;
          mat4.multiply(matrix, matrix, mat4.fromTranslation(s_MAT4_TEMP, s_TRANSLATE_VECTOR));
          break;
      }
    }
    if (data !== this._data) {
      for (let cntr = 0; cntr < transformKeys.length; cntr++) {
        const key = transformKeys[cntr];
        if (data[key] === null || (seenKeys & transformKeysBitwise[key]) > 0) {
          continue;
        }
        switch (key) {
          case "rotateX":
            mat4.multiply(matrix, matrix, mat4.fromXRotation(s_MAT4_TEMP, degToRad(data[key])));
            break;
          case "rotateY":
            mat4.multiply(matrix, matrix, mat4.fromYRotation(s_MAT4_TEMP, degToRad(data[key])));
            break;
          case "rotateZ":
            mat4.multiply(matrix, matrix, mat4.fromZRotation(s_MAT4_TEMP, degToRad(data[key])));
            break;
          case "scale":
            s_SCALE_VECTOR[0] = s_SCALE_VECTOR[1] = data[key];
            mat4.multiply(matrix, matrix, mat4.fromScaling(s_MAT4_TEMP, s_SCALE_VECTOR));
            break;
          case "translateX":
            s_TRANSLATE_VECTOR[0] = data[key];
            s_TRANSLATE_VECTOR[1] = 0;
            s_TRANSLATE_VECTOR[2] = 0;
            mat4.multiply(matrix, matrix, mat4.fromTranslation(s_MAT4_TEMP, s_TRANSLATE_VECTOR));
            break;
          case "translateY":
            s_TRANSLATE_VECTOR[0] = 0;
            s_TRANSLATE_VECTOR[1] = data[key];
            s_TRANSLATE_VECTOR[2] = 0;
            mat4.multiply(matrix, matrix, mat4.fromTranslation(s_MAT4_TEMP, s_TRANSLATE_VECTOR));
            break;
          case "translateZ":
            s_TRANSLATE_VECTOR[0] = 0;
            s_TRANSLATE_VECTOR[1] = 0;
            s_TRANSLATE_VECTOR[2] = data[key];
            mat4.multiply(matrix, matrix, mat4.fromTranslation(s_MAT4_TEMP, s_TRANSLATE_VECTOR));
            break;
        }
      }
    }
    return matrix;
  }
  /**
   * Provides an orthographic enhancement to convert left / top positional data to a translate operation.
   *
   * This transform matrix takes into account that the remaining operations are , but adds any left / top attributes from passed in data to
   * translate X / Y.
   *
   * If no data object is provided then the source is the local transform data. If another data object is supplied
   * then the stored local transform order is applied then all remaining transform keys are applied. This allows the
   * construction of a transform matrix in advance of setting local data and is useful in collision detection.
   *
   * @param {object}   [data] - PositionData instance or local transform data.
   *
   * @param {Matrix4}  [output] - The output mat4 instance.
   *
   * @returns {Matrix4} Transform matrix.
   */
  getMat4Ortho(data = this._data, output = mat4.create()) {
    const matrix = mat4.identity(output);
    s_TRANSLATE_VECTOR[0] = (data.left ?? 0) + (data.translateX ?? 0);
    s_TRANSLATE_VECTOR[1] = (data.top ?? 0) + (data.translateY ?? 0);
    s_TRANSLATE_VECTOR[2] = data.translateZ ?? 0;
    mat4.multiply(matrix, matrix, mat4.fromTranslation(s_MAT4_TEMP, s_TRANSLATE_VECTOR));
    if (data.scale !== null) {
      s_SCALE_VECTOR[0] = s_SCALE_VECTOR[1] = data.scale;
      mat4.multiply(matrix, matrix, mat4.fromScaling(s_MAT4_TEMP, s_SCALE_VECTOR));
    }
    if (data.rotateX === null && data.rotateY === null && data.rotateZ === null) {
      return matrix;
    }
    let seenKeys = 0;
    const orderList = __privateGet(this, _orderList);
    for (let cntr = 0; cntr < orderList.length; cntr++) {
      const key = orderList[cntr];
      switch (key) {
        case "rotateX":
          seenKeys |= transformKeysBitwise.rotateX;
          mat4.multiply(matrix, matrix, mat4.fromXRotation(s_MAT4_TEMP, degToRad(data[key])));
          break;
        case "rotateY":
          seenKeys |= transformKeysBitwise.rotateY;
          mat4.multiply(matrix, matrix, mat4.fromYRotation(s_MAT4_TEMP, degToRad(data[key])));
          break;
        case "rotateZ":
          seenKeys |= transformKeysBitwise.rotateZ;
          mat4.multiply(matrix, matrix, mat4.fromZRotation(s_MAT4_TEMP, degToRad(data[key])));
          break;
      }
    }
    if (data !== this._data) {
      for (let cntr = 0; cntr < transformKeys.length; cntr++) {
        const key = transformKeys[cntr];
        if (data[key] === null || (seenKeys & transformKeysBitwise[key]) > 0) {
          continue;
        }
        switch (key) {
          case "rotateX":
            mat4.multiply(matrix, matrix, mat4.fromXRotation(s_MAT4_TEMP, degToRad(data[key])));
            break;
          case "rotateY":
            mat4.multiply(matrix, matrix, mat4.fromYRotation(s_MAT4_TEMP, degToRad(data[key])));
            break;
          case "rotateZ":
            mat4.multiply(matrix, matrix, mat4.fromZRotation(s_MAT4_TEMP, degToRad(data[key])));
            break;
        }
      }
    }
    return matrix;
  }
  /**
   * Tests an object if it contains transform keys and the values are finite numbers.
   *
   * @param {object} data - An object to test for transform data.
   *
   * @returns {boolean} Whether the given PositionData has transforms.
   */
  hasTransform(data) {
    for (const key of transformKeys) {
      if (Number.isFinite(data[key])) {
        return true;
      }
    }
    return false;
  }
  /**
   * Resets internal data from the given object containing valid transform keys.
   *
   * @param {object}   data - An object with transform data.
   */
  reset(data) {
    for (const key in data) {
      if (transformKeys.includes(key)) {
        if (Number.isFinite(data[key])) {
          this._data[key] = data[key];
        } else {
          const index = __privateGet(this, _orderList).findIndex((entry) => entry === key);
          if (index >= 0) {
            __privateGet(this, _orderList).splice(index, 1);
          }
          delete this._data[key];
        }
      }
    }
  }
};
_orderList = new WeakMap();
function s_GET_ORIGIN_TRANSLATION(transformOrigin, width, height, output) {
  const vector = s_VEC3_TEMP;
  switch (transformOrigin) {
    case "top left":
      vector[0] = vector[1] = 0;
      mat4.fromTranslation(output[0], vector);
      mat4.fromTranslation(output[1], vector);
      break;
    case "top center":
      vector[0] = -width * 0.5;
      vector[1] = 0;
      mat4.fromTranslation(output[0], vector);
      vector[0] = width * 0.5;
      mat4.fromTranslation(output[1], vector);
      break;
    case "top right":
      vector[0] = -width;
      vector[1] = 0;
      mat4.fromTranslation(output[0], vector);
      vector[0] = width;
      mat4.fromTranslation(output[1], vector);
      break;
    case "center left":
      vector[0] = 0;
      vector[1] = -height * 0.5;
      mat4.fromTranslation(output[0], vector);
      vector[1] = height * 0.5;
      mat4.fromTranslation(output[1], vector);
      break;
    case null:
    case "center":
      vector[0] = -width * 0.5;
      vector[1] = -height * 0.5;
      mat4.fromTranslation(output[0], vector);
      vector[0] = width * 0.5;
      vector[1] = height * 0.5;
      mat4.fromTranslation(output[1], vector);
      break;
    case "center right":
      vector[0] = -width;
      vector[1] = -height * 0.5;
      mat4.fromTranslation(output[0], vector);
      vector[0] = width;
      vector[1] = height * 0.5;
      mat4.fromTranslation(output[1], vector);
      break;
    case "bottom left":
      vector[0] = 0;
      vector[1] = -height;
      mat4.fromTranslation(output[0], vector);
      vector[1] = height;
      mat4.fromTranslation(output[1], vector);
      break;
    case "bottom center":
      vector[0] = -width * 0.5;
      vector[1] = -height;
      mat4.fromTranslation(output[0], vector);
      vector[0] = width * 0.5;
      vector[1] = height;
      mat4.fromTranslation(output[1], vector);
      break;
    case "bottom right":
      vector[0] = -width;
      vector[1] = -height;
      mat4.fromTranslation(output[0], vector);
      vector[0] = width;
      vector[1] = height;
      mat4.fromTranslation(output[1], vector);
      break;
    default:
      mat4.identity(output[0]);
      mat4.identity(output[1]);
      break;
  }
  return output;
}

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/position/update/UpdateElementData.js
var UpdateElementData = class {
  constructor() {
    this.data = void 0;
    this.dataSubscribers = new PositionData();
    this.dimensionData = { width: 0, height: 0 };
    this.changeSet = void 0;
    this.options = void 0;
    this.queued = false;
    this.styleCache = void 0;
    this.transforms = void 0;
    this.transformData = new TransformData();
    this.subscriptions = void 0;
    this.storeDimension = writable(this.dimensionData);
    this.storeTransform = writable(this.transformData, () => {
      this.options.transformSubscribed = true;
      return () => this.options.transformSubscribed = false;
    });
    this.queued = false;
    Object.seal(this.dimensionData);
  }
};

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/animate/index.js
async function nextAnimationFrame(cntr = 1) {
  if (!Number.isInteger(cntr) || cntr < 1) {
    throw new TypeError(`nextAnimationFrame error: 'cntr' must be a positive integer greater than 0.`);
  }
  let currentTime = performance.now();
  for (; --cntr >= 0; ) {
    currentTime = await new Promise((resolve) => requestAnimationFrame(resolve));
  }
  return currentTime;
}

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/position/update/UpdateElementManager.js
var UpdateElementManager = class {
  static get promise() {
    return this.updatePromise;
  }
  /**
   * Potentially adds the given element and internal updateData instance to the list.
   *
   * @param {HTMLElement}       el - An HTMLElement instance.
   *
   * @param {UpdateElementData} updateData - An UpdateElementData instance.
   *
   * @returns {Promise<number>} The unified next frame update promise. Returns `currentTime`.
   */
  static add(el, updateData) {
    if (this.listCntr < this.list.length) {
      const entry = this.list[this.listCntr];
      entry[0] = el;
      entry[1] = updateData;
    } else {
      this.list.push([el, updateData]);
    }
    this.listCntr++;
    updateData.queued = true;
    if (!this.updatePromise) {
      this.updatePromise = this.wait();
    }
    return this.updatePromise;
  }
  /**
   * Await on `nextAnimationFrame` and iterate over list map invoking callback functions.
   *
   * @returns {Promise<number>} The next frame Promise / currentTime from nextAnimationFrame.
   */
  static async wait() {
    const currentTime = await nextAnimationFrame();
    this.updatePromise = void 0;
    for (let cntr = this.listCntr; --cntr >= 0; ) {
      const entry = this.list[cntr];
      const el = entry[0];
      const updateData = entry[1];
      entry[0] = void 0;
      entry[1] = void 0;
      updateData.queued = false;
      if (!el.isConnected) {
        continue;
      }
      if (updateData.options.ortho) {
        s_UPDATE_ELEMENT_ORTHO(el, updateData);
      } else {
        s_UPDATE_ELEMENT(el, updateData);
      }
      if (updateData.options.calculateTransform || updateData.options.transformSubscribed) {
        s_UPDATE_TRANSFORM(el, updateData);
      }
      this.updateSubscribers(updateData);
    }
    this.listCntr = 0;
    return currentTime;
  }
  /**
   * Potentially immediately updates the given element.
   *
   * @param {HTMLElement}       el - An HTMLElement instance.
   *
   * @param {UpdateElementData} updateData - An UpdateElementData instance.
   */
  static immediate(el, updateData) {
    if (!el.isConnected) {
      return;
    }
    if (updateData.options.ortho) {
      s_UPDATE_ELEMENT_ORTHO(el, updateData);
    } else {
      s_UPDATE_ELEMENT(el, updateData);
    }
    if (updateData.options.calculateTransform || updateData.options.transformSubscribed) {
      s_UPDATE_TRANSFORM(el, updateData);
    }
    this.updateSubscribers(updateData);
  }
  /**
   * @param {UpdateElementData} updateData - Data change set.
   */
  static updateSubscribers(updateData) {
    const data = updateData.data;
    const changeSet = updateData.changeSet;
    if (!changeSet.hasChange()) {
      return;
    }
    const output = updateData.dataSubscribers.copy(data);
    const subscriptions = updateData.subscriptions;
    if (subscriptions.length > 0) {
      for (let cntr = 0; cntr < subscriptions.length; cntr++) {
        subscriptions[cntr](output);
      }
    }
    if (changeSet.width || changeSet.height) {
      updateData.dimensionData.width = data.width;
      updateData.dimensionData.height = data.height;
      updateData.storeDimension.set(updateData.dimensionData);
    }
    changeSet.set(false);
  }
};
__publicField(UpdateElementManager, "list", []);
__publicField(UpdateElementManager, "listCntr", 0);
__publicField(UpdateElementManager, "updatePromise");
function s_UPDATE_ELEMENT(el, updateData) {
  const changeSet = updateData.changeSet;
  const data = updateData.data;
  if (changeSet.left) {
    el.style.left = `${data.left}px`;
  }
  if (changeSet.top) {
    el.style.top = `${data.top}px`;
  }
  if (changeSet.zIndex) {
    el.style.zIndex = typeof data.zIndex === "number" ? `${data.zIndex}` : null;
  }
  if (changeSet.width) {
    el.style.width = typeof data.width === "number" ? `${data.width}px` : data.width;
  }
  if (changeSet.height) {
    el.style.height = typeof data.height === "number" ? `${data.height}px` : data.height;
  }
  if (changeSet.transformOrigin) {
    el.style.transformOrigin = data.transformOrigin === "center" ? null : data.transformOrigin;
  }
  if (changeSet.transform) {
    el.style.transform = updateData.transforms.isActive ? updateData.transforms.getCSS() : null;
  }
}
function s_UPDATE_ELEMENT_ORTHO(el, updateData) {
  const changeSet = updateData.changeSet;
  const data = updateData.data;
  if (changeSet.zIndex) {
    el.style.zIndex = typeof data.zIndex === "number" ? `${data.zIndex}` : null;
  }
  if (changeSet.width) {
    el.style.width = typeof data.width === "number" ? `${data.width}px` : data.width;
  }
  if (changeSet.height) {
    el.style.height = typeof data.height === "number" ? `${data.height}px` : data.height;
  }
  if (changeSet.transformOrigin) {
    el.style.transformOrigin = data.transformOrigin === "center" ? null : data.transformOrigin;
  }
  if (changeSet.left || changeSet.top || changeSet.transform) {
    el.style.transform = updateData.transforms.getCSSOrtho(data);
  }
}
function s_UPDATE_TRANSFORM(el, updateData) {
  s_VALIDATION_DATA.height = updateData.data.height !== "auto" ? updateData.data.height : updateData.styleCache.offsetHeight;
  s_VALIDATION_DATA.width = updateData.data.width !== "auto" ? updateData.data.width : updateData.styleCache.offsetWidth;
  s_VALIDATION_DATA.marginLeft = updateData.styleCache.marginLeft;
  s_VALIDATION_DATA.marginTop = updateData.styleCache.marginTop;
  updateData.transforms.getData(updateData.data, updateData.transformData, s_VALIDATION_DATA);
  updateData.storeTransform.set(updateData.transformData);
}
var s_VALIDATION_DATA = {
  height: void 0,
  width: void 0,
  marginLeft: void 0,
  marginTop: void 0
};

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/position/Position.js
var _data3, _animate, _enabled4, _positionChangeSet, _options, _parent, _stores, _styleCache, _subscriptions, _transforms2, _updateElementData, _updateElementPromise, _validators, _validatorData2, _state, _updatePosition, updatePosition_fn;
var _Position = class {
  /**
   * @param {PositionParent|PositionOptionsAll}   [parent] - A potential parent element or object w/ `elementTarget`
   *                                                      getter. May also be the PositionOptions object w/ 1 argument.
   *
   * @param {PositionOptionsAll}   [options] - Default values.
   */
  constructor(parent, options) {
    /**
     * @param {PositionDataExtended} opts -
     *
     * @param {number|null} opts.left -
     *
     * @param {number|null} opts.top -
     *
     * @param {number|null} opts.maxHeight -
     *
     * @param {number|null} opts.maxWidth -
     *
     * @param {number|null} opts.minHeight -
     *
     * @param {number|null} opts.minWidth -
     *
     * @param {number|'auto'|null} opts.width -
     *
     * @param {number|'auto'|null} opts.height -
     *
     * @param {number|null} opts.rotateX -
     *
     * @param {number|null} opts.rotateY -
     *
     * @param {number|null} opts.rotateZ -
     *
     * @param {number|null} opts.scale -
     *
     * @param {string} opts.transformOrigin -
     *
     * @param {number|null} opts.translateX -
     *
     * @param {number|null} opts.translateY -
     *
     * @param {number|null} opts.translateZ -
     *
     * @param {number|null} opts.zIndex -
     *
     * @param {number|null} opts.rotation - alias for rotateZ
     *
     * @param {*} opts.rest -
     *
     * @param {object} parent -
     *
     * @param {HTMLElement} el -
     *
     * @param {StyleCache} styleCache -
     *
     * @returns {null|PositionData} Updated position data or null if validation fails.
     */
    __privateAdd(this, _updatePosition);
    /**
     * @type {PositionData}
     */
    __privateAdd(this, _data3, new PositionData());
    /**
     * Provides the animation API.
     *
     * @type {AnimationAPI}
     */
    __privateAdd(this, _animate, new AnimationAPI(this, __privateGet(this, _data3)));
    /**
     * Provides a way to turn on / off the position handling.
     *
     * @type {boolean}
     */
    __privateAdd(this, _enabled4, true);
    /**
     * Stores the style attributes that changed on update.
     *
     * @type {PositionChangeSet}
     */
    __privateAdd(this, _positionChangeSet, new PositionChangeSet());
    /**
     * Stores ongoing options that are set in the constructor or by transform store subscription.
     *
     * @type {PositionOptions}
     */
    __privateAdd(this, _options, {
      calculateTransform: false,
      initialHelper: void 0,
      ortho: true,
      transformSubscribed: false
    });
    /**
     * The associated parent for positional data tracking. Used in validators.
     *
     * @type {PositionParent}
     */
    __privateAdd(this, _parent, void 0);
    /**
     * @type {StorePosition}
     */
    __privateAdd(this, _stores, void 0);
    /**
     * Stores an instance of the computer styles for the target element.
     *
     * @type {StyleCache}
     */
    __privateAdd(this, _styleCache, void 0);
    /**
     * Stores the subscribers.
     *
     * @type {(function(PositionData): void)[]}
     */
    __privateAdd(this, _subscriptions, []);
    /**
     * @type {Transforms}
     */
    __privateAdd(this, _transforms2, new Transforms());
    /**
     * @type {UpdateElementData}
     */
    __privateAdd(this, _updateElementData, void 0);
    /**
     * Stores the UpdateElementManager wait promise.
     *
     * @type {Promise}
     */
    __privateAdd(this, _updateElementPromise, void 0);
    /**
     * @type {AdapterValidators}
     */
    __privateAdd(this, _validators, void 0);
    /**
     * @type {ValidatorData[]}
     */
    __privateAdd(this, _validatorData2, void 0);
    /**
     * @type {PositionStateAPI}
     */
    __privateAdd(this, _state, new PositionStateAPI(this, __privateGet(this, _data3), __privateGet(this, _transforms2)));
    if (isPlainObject(parent)) {
      options = parent;
    } else {
      __privateSet(this, _parent, parent);
    }
    const data = __privateGet(this, _data3);
    const transforms = __privateGet(this, _transforms2);
    __privateSet(this, _styleCache, new StyleCache());
    const updateData = new UpdateElementData();
    updateData.changeSet = __privateGet(this, _positionChangeSet);
    updateData.data = __privateGet(this, _data3);
    updateData.options = __privateGet(this, _options);
    updateData.styleCache = __privateGet(this, _styleCache);
    updateData.subscriptions = __privateGet(this, _subscriptions);
    updateData.transforms = __privateGet(this, _transforms2);
    __privateSet(this, _updateElementData, updateData);
    if (isObject(options)) {
      if (typeof options.calculateTransform === "boolean") {
        __privateGet(this, _options).calculateTransform = options.calculateTransform;
      }
      if (typeof options.ortho === "boolean") {
        __privateGet(this, _options).ortho = options.ortho;
      }
      if (Number.isFinite(options.height) || options.height === "auto" || options.height === "inherit" || options.height === null) {
        data.height = updateData.dimensionData.height = typeof options.height === "number" ? Math.round(options.height) : options.height;
      }
      if (Number.isFinite(options.left) || options.left === null) {
        data.left = typeof options.left === "number" ? Math.round(options.left) : options.left;
      }
      if (Number.isFinite(options.maxHeight) || options.maxHeight === null) {
        data.maxHeight = typeof options.maxHeight === "number" ? Math.round(options.maxHeight) : options.maxHeight;
      }
      if (Number.isFinite(options.maxWidth) || options.maxWidth === null) {
        data.maxWidth = typeof options.maxWidth === "number" ? Math.round(options.maxWidth) : options.maxWidth;
      }
      if (Number.isFinite(options.minHeight) || options.minHeight === null) {
        data.minHeight = typeof options.minHeight === "number" ? Math.round(options.minHeight) : options.minHeight;
      }
      if (Number.isFinite(options.minWidth) || options.minWidth === null) {
        data.minWidth = typeof options.minWidth === "number" ? Math.round(options.minWidth) : options.minWidth;
      }
      if (Number.isFinite(options.rotateX) || options.rotateX === null) {
        transforms.rotateX = data.rotateX = options.rotateX;
      }
      if (Number.isFinite(options.rotateY) || options.rotateY === null) {
        transforms.rotateY = data.rotateY = options.rotateY;
      }
      if (Number.isFinite(options.rotateZ) || options.rotateZ === null) {
        transforms.rotateZ = data.rotateZ = options.rotateZ;
      }
      if (Number.isFinite(options.scale) || options.scale === null) {
        transforms.scale = data.scale = options.scale;
      }
      if (Number.isFinite(options.top) || options.top === null) {
        data.top = typeof options.top === "number" ? Math.round(options.top) : options.top;
      }
      if (typeof options.transformOrigin === "string" || options.transformOrigin === null) {
        data.transformOrigin = transformOrigins.includes(options.transformOrigin) ? options.transformOrigin : null;
      }
      if (Number.isFinite(options.translateX) || options.translateX === null) {
        transforms.translateX = data.translateX = options.translateX;
      }
      if (Number.isFinite(options.translateY) || options.translateY === null) {
        transforms.translateY = data.translateY = options.translateY;
      }
      if (Number.isFinite(options.translateZ) || options.translateZ === null) {
        transforms.translateZ = data.translateZ = options.translateZ;
      }
      if (Number.isFinite(options.width) || options.width === "auto" || options.width === "inherit" || options.width === null) {
        data.width = updateData.dimensionData.width = typeof options.width === "number" ? Math.round(options.width) : options.width;
      }
      if (Number.isFinite(options.zIndex) || options.zIndex === null) {
        data.zIndex = typeof options.zIndex === "number" ? Math.round(options.zIndex) : options.zIndex;
      }
    }
    __privateSet(this, _stores, {
      // The main properties for manipulating Position.
      height: propertyStore(this, "height"),
      left: propertyStore(this, "left"),
      rotateX: propertyStore(this, "rotateX"),
      rotateY: propertyStore(this, "rotateY"),
      rotateZ: propertyStore(this, "rotateZ"),
      scale: propertyStore(this, "scale"),
      top: propertyStore(this, "top"),
      transformOrigin: propertyStore(this, "transformOrigin"),
      translateX: propertyStore(this, "translateX"),
      translateY: propertyStore(this, "translateY"),
      translateZ: propertyStore(this, "translateZ"),
      width: propertyStore(this, "width"),
      zIndex: propertyStore(this, "zIndex"),
      // Stores that control validation when width / height is not `auto`.
      maxHeight: propertyStore(this, "maxHeight"),
      maxWidth: propertyStore(this, "maxWidth"),
      minHeight: propertyStore(this, "minHeight"),
      minWidth: propertyStore(this, "minWidth"),
      // Readable stores based on updates or from resize observer changes.
      dimension: { subscribe: updateData.storeDimension.subscribe },
      element: { subscribe: __privateGet(this, _styleCache).stores.element.subscribe },
      resizeContentHeight: { subscribe: __privateGet(this, _styleCache).stores.resizeContentHeight.subscribe },
      resizeContentWidth: { subscribe: __privateGet(this, _styleCache).stores.resizeContentWidth.subscribe },
      resizeOffsetHeight: { subscribe: __privateGet(this, _styleCache).stores.resizeOffsetHeight.subscribe },
      resizeOffsetWidth: { subscribe: __privateGet(this, _styleCache).stores.resizeOffsetWidth.subscribe },
      transform: { subscribe: updateData.storeTransform.subscribe },
      // Protected store that should only be set by resizeObserver action.
      resizeObserved: __privateGet(this, _styleCache).stores.resizeObserved
    });
    subscribeIgnoreFirst(__privateGet(this, _stores).resizeObserved, (resizeData) => {
      const parent2 = __privateGet(this, _parent);
      const el = parent2 instanceof HTMLElement ? parent2 : parent2 == null ? void 0 : parent2.elementTarget;
      if (el instanceof HTMLElement && Number.isFinite(resizeData == null ? void 0 : resizeData.offsetWidth) && Number.isFinite(resizeData == null ? void 0 : resizeData.offsetHeight)) {
        this.set(data);
      }
    });
    __privateGet(this, _stores).transformOrigin.values = transformOrigins;
    [__privateWrapper(this, _validators)._, __privateWrapper(this, _validatorData2)._] = new AdapterValidators();
    if ((options == null ? void 0 : options.initial) || (options == null ? void 0 : options.positionInitial)) {
      const initialHelper = options.initial ?? options.positionInitial;
      if (typeof (initialHelper == null ? void 0 : initialHelper.getLeft) !== "function" || typeof (initialHelper == null ? void 0 : initialHelper.getTop) !== "function") {
        throw new Error(
          `'options.initial' position helper does not contain 'getLeft' and / or 'getTop' functions.`
        );
      }
      __privateGet(this, _options).initialHelper = options.initial;
    }
    if (options == null ? void 0 : options.validator) {
      if (isIterable(options == null ? void 0 : options.validator)) {
        this.validators.add(...options.validator);
      } else {
        this.validators.add(options.validator);
      }
    }
  }
  /**
   * @returns {AnimationGroupAPI} Public Animation API.
   */
  static get Animate() {
    return AnimationGroupAPI;
  }
  /**
   * @returns {{browserCentered?: Centered, Centered?: *}} Initial position helpers.
   */
  static get Initial() {
    return initial_exports;
  }
  /**
   * Returns TransformData class / constructor.
   *
   * @returns {TransformData} TransformData class / constructor.
   */
  static get TransformData() {
    return TransformData;
  }
  /**
   * Returns default validators.
   *
   * Note: `basicWindow` and `BasicBounds` will eventually be removed.
   *
   * @returns {{basicWindow?: BasicBounds, transformWindow?: TransformBounds, TransformBounds?: *, BasicBounds?: *}}
   *  Available validators.
   */
  static get Validators() {
    return validators_exports;
  }
  /**
   * Returns a duplicate of a given position instance copying any options and validators.
   *
   * // TODO: Consider more safety over options processing.
   *
   * @param {Position}          position - A position instance.
   *
   * @param {PositionOptions}   options - Position options.
   *
   * @returns {Position} A duplicate position instance.
   */
  static duplicate(position, options) {
    if (!(position instanceof _Position)) {
      throw new TypeError(`'position' is not an instance of Position.`);
    }
    const newPosition = new _Position(options);
    __privateSet(newPosition, _options, Object.assign({}, __privateGet(position, _options), options));
    __privateGet(newPosition, _validators).add(...__privateGet(position, _validators));
    newPosition.set(__privateGet(position, _data3));
    return newPosition;
  }
  /**
   * Returns the animation API.
   *
   * @returns {AnimationAPI} Animation API.
   */
  get animate() {
    return __privateGet(this, _animate);
  }
  /**
   * Returns the dimension data for the readable store.
   *
   * @returns {{width: number | 'auto', height: number | 'auto'}} Dimension data.
   */
  get dimension() {
    return __privateGet(this, _updateElementData).dimensionData;
  }
  /**
   * Returns the enabled state.
   *
   * @returns {boolean} Enabled state.
   */
  get enabled() {
    return __privateGet(this, _enabled4);
  }
  /**
   * Returns the current HTMLElement being positioned.
   *
   * @returns {HTMLElement|undefined} Current HTMLElement being positioned.
   */
  get element() {
    return __privateGet(this, _styleCache).el;
  }
  /**
   * Returns a promise that is resolved on the next element update with the time of the update.
   *
   * @returns {Promise<number>} Promise resolved on element update.
   */
  get elementUpdated() {
    return __privateGet(this, _updateElementPromise);
  }
  /**
   * Returns the associated {@link PositionParent} instance.
   *
   * @returns {PositionParent} The PositionParent instance.
   */
  get parent() {
    return __privateGet(this, _parent);
  }
  /**
   * Returns the state API.
   *
   * @returns {PositionStateAPI} Position state API.
   */
  get state() {
    return __privateGet(this, _state);
  }
  /**
   * Returns the derived writable stores for individual data variables.
   *
   * @returns {StorePosition} Derived / writable stores.
   */
  get stores() {
    return __privateGet(this, _stores);
  }
  /**
   * Returns the transform data for the readable store.
   *
   * @returns {TransformData} Transform Data.
   */
  get transform() {
    return __privateGet(this, _updateElementData).transformData;
  }
  /**
   * Returns the validators.
   *
   * @returns {AdapterValidators} validators.
   */
  get validators() {
    return __privateGet(this, _validators);
  }
  /**
   * Sets the enabled state.
   *
   * @param {boolean}  enabled - New enabled state.
   */
  set enabled(enabled) {
    if (typeof enabled !== "boolean") {
      throw new TypeError(`'enabled' is not a boolean.`);
    }
    __privateSet(this, _enabled4, enabled);
  }
  /**
   * Sets the associated {@link PositionParent} instance. Resets the style cache and default data.
   *
   * @param {PositionParent|void} parent - A PositionParent instance.
   */
  set parent(parent) {
    if (parent !== void 0 && !(parent instanceof HTMLElement) && !isObject(parent)) {
      throw new TypeError(`'parent' is not an HTMLElement, object, or undefined.`);
    }
    __privateSet(this, _parent, parent);
    __privateGet(this, _state).remove({ name: "#defaultData" });
    __privateGet(this, _styleCache).reset();
    if (parent) {
      this.set(__privateGet(this, _data3));
    }
  }
  // Data accessors ----------------------------------------------------------------------------------------------------
  /**
   * @returns {number|'auto'|'inherit'|null} height
   */
  get height() {
    return __privateGet(this, _data3).height;
  }
  /**
   * @returns {number|null} left
   */
  get left() {
    return __privateGet(this, _data3).left;
  }
  /**
   * @returns {number|null} maxHeight
   */
  get maxHeight() {
    return __privateGet(this, _data3).maxHeight;
  }
  /**
   * @returns {number|null} maxWidth
   */
  get maxWidth() {
    return __privateGet(this, _data3).maxWidth;
  }
  /**
   * @returns {number|null} minHeight
   */
  get minHeight() {
    return __privateGet(this, _data3).minHeight;
  }
  /**
   * @returns {number|null} minWidth
   */
  get minWidth() {
    return __privateGet(this, _data3).minWidth;
  }
  /**
   * @returns {number|null} rotateX
   */
  get rotateX() {
    return __privateGet(this, _data3).rotateX;
  }
  /**
   * @returns {number|null} rotateY
   */
  get rotateY() {
    return __privateGet(this, _data3).rotateY;
  }
  /**
   * @returns {number|null} rotateZ
   */
  get rotateZ() {
    return __privateGet(this, _data3).rotateZ;
  }
  /**
   * @returns {number|null} alias for rotateZ
   */
  get rotation() {
    return __privateGet(this, _data3).rotateZ;
  }
  /**
   * @returns {number|null} scale
   */
  get scale() {
    return __privateGet(this, _data3).scale;
  }
  /**
   * @returns {number|null} top
   */
  get top() {
    return __privateGet(this, _data3).top;
  }
  /**
   * @returns {string} transformOrigin
   */
  get transformOrigin() {
    return __privateGet(this, _data3).transformOrigin;
  }
  /**
   * @returns {number|null} translateX
   */
  get translateX() {
    return __privateGet(this, _data3).translateX;
  }
  /**
   * @returns {number|null} translateY
   */
  get translateY() {
    return __privateGet(this, _data3).translateY;
  }
  /**
   * @returns {number|null} translateZ
   */
  get translateZ() {
    return __privateGet(this, _data3).translateZ;
  }
  /**
   * @returns {number|'auto'|'inherit'|null} width
   */
  get width() {
    return __privateGet(this, _data3).width;
  }
  /**
   * @returns {number|null} z-index
   */
  get zIndex() {
    return __privateGet(this, _data3).zIndex;
  }
  /**
   * @param {number|string|null} height -
   */
  set height(height) {
    __privateGet(this, _stores).height.set(height);
  }
  /**
   * @param {number|string|null} left -
   */
  set left(left) {
    __privateGet(this, _stores).left.set(left);
  }
  /**
   * @param {number|string|null} maxHeight -
   */
  set maxHeight(maxHeight) {
    __privateGet(this, _stores).maxHeight.set(maxHeight);
  }
  /**
   * @param {number|string|null} maxWidth -
   */
  set maxWidth(maxWidth) {
    __privateGet(this, _stores).maxWidth.set(maxWidth);
  }
  /**
   * @param {number|string|null} minHeight -
   */
  set minHeight(minHeight) {
    __privateGet(this, _stores).minHeight.set(minHeight);
  }
  /**
   * @param {number|string|null} minWidth -
   */
  set minWidth(minWidth) {
    __privateGet(this, _stores).minWidth.set(minWidth);
  }
  /**
   * @param {number|string|null} rotateX -
   */
  set rotateX(rotateX) {
    __privateGet(this, _stores).rotateX.set(rotateX);
  }
  /**
   * @param {number|string|null} rotateY -
   */
  set rotateY(rotateY) {
    __privateGet(this, _stores).rotateY.set(rotateY);
  }
  /**
   * @param {number|string|null} rotateZ -
   */
  set rotateZ(rotateZ) {
    __privateGet(this, _stores).rotateZ.set(rotateZ);
  }
  /**
   * @param {number|string|null} rotateZ - alias for rotateZ
   */
  set rotation(rotateZ) {
    __privateGet(this, _stores).rotateZ.set(rotateZ);
  }
  /**
   * @param {number|string|null} scale -
   */
  set scale(scale) {
    __privateGet(this, _stores).scale.set(scale);
  }
  /**
   * @param {number|string|null} top -
   */
  set top(top) {
    __privateGet(this, _stores).top.set(top);
  }
  /**
   * @param {string} transformOrigin -
   */
  set transformOrigin(transformOrigin) {
    if (transformOrigins.includes(transformOrigin)) {
      __privateGet(this, _stores).transformOrigin.set(transformOrigin);
    }
  }
  /**
   * @param {number|string|null} translateX -
   */
  set translateX(translateX) {
    __privateGet(this, _stores).translateX.set(translateX);
  }
  /**
   * @param {number|string|null} translateY -
   */
  set translateY(translateY) {
    __privateGet(this, _stores).translateY.set(translateY);
  }
  /**
   * @param {number|string|null} translateZ -
   */
  set translateZ(translateZ) {
    __privateGet(this, _stores).translateZ.set(translateZ);
  }
  /**
   * @param {number|string|null} width -
   */
  set width(width) {
    __privateGet(this, _stores).width.set(width);
  }
  /**
   * @param {number|string|null} zIndex -
   */
  set zIndex(zIndex) {
    __privateGet(this, _stores).zIndex.set(zIndex);
  }
  /**
   * Assigns current position to object passed into method.
   *
   * @param {object|PositionData}  [position] - Target to assign current position data.
   *
   * @param {PositionGetOptions}   [options] - Defines options for specific keys and substituting null for numeric
   *                                           default values.
   *
   * @returns {PositionData} Passed in object with current position data.
   */
  get(position = {}, options) {
    const keys = options == null ? void 0 : options.keys;
    const excludeKeys = options == null ? void 0 : options.exclude;
    const numeric = (options == null ? void 0 : options.numeric) ?? false;
    if (isIterable(keys)) {
      if (numeric) {
        for (const key of keys) {
          position[key] = this[key] ?? numericDefaults[key];
        }
      } else {
        for (const key of keys) {
          position[key] = this[key];
        }
      }
      if (isIterable(excludeKeys)) {
        for (const key of excludeKeys) {
          delete position[key];
        }
      }
      return position;
    } else {
      const data = Object.assign(position, __privateGet(this, _data3));
      if (isIterable(excludeKeys)) {
        for (const key of excludeKeys) {
          delete data[key];
        }
      }
      if (numeric) {
        setNumericDefaults(data);
      }
      return data;
    }
  }
  /**
   * @returns {PositionData} Current position data.
   */
  toJSON() {
    return Object.assign({}, __privateGet(this, _data3));
  }
  /**
   * All calculation and updates of position are implemented in {@link Position}. This allows position to be fully
   * reactive and in control of updating inline styles for the application.
   *
   * Note: the logic for updating position is improved and changes a few aspects from the default
   * {@link Application.setPosition}. The gate on `popOut` is removed, so to ensure no positional application occurs
   * popOut applications can set `this.options.positionable` to false ensuring no positional inline styles are
   * applied.
   *
   * The initial set call on an application with a target element will always set width / height as this is
   * necessary for correct calculations.
   *
   * When a target element is present updated styles are applied after validation. To modify the behavior of set
   * implement one or more validator functions and add them from the application via
   * `this.position.validators.add(<Function>)`.
   *
   * Updates to any target element are decoupled from the underlying Position data. This method returns this instance
   * that you can then await on the target element inline style update by using {@link Position.elementUpdated}.
   *
   * @param {PositionDataExtended} [position] - Position data to set.
   *
   * @returns {Position} This Position instance.
   */
  set(position = {}) {
    var _a, _b;
    if (typeof position !== "object") {
      throw new TypeError(`Position - set error: 'position' is not an object.`);
    }
    const parent = __privateGet(this, _parent);
    if (!__privateGet(this, _enabled4)) {
      return this;
    }
    if (parent !== void 0 && typeof ((_a = parent == null ? void 0 : parent.options) == null ? void 0 : _a.positionable) === "boolean" && !((_b = parent == null ? void 0 : parent.options) == null ? void 0 : _b.positionable)) {
      return this;
    }
    const immediateElementUpdate = position.immediateElementUpdate === true;
    const data = __privateGet(this, _data3);
    const transforms = __privateGet(this, _transforms2);
    const targetEl = parent instanceof HTMLElement ? parent : parent == null ? void 0 : parent.elementTarget;
    const el = targetEl instanceof HTMLElement && targetEl.isConnected ? targetEl : void 0;
    const changeSet = __privateGet(this, _positionChangeSet);
    const styleCache = __privateGet(this, _styleCache);
    if (el) {
      if (!styleCache.hasData(el)) {
        styleCache.update(el);
        if (!styleCache.hasWillChange) {
        }
        changeSet.set(true);
        __privateGet(this, _updateElementData).queued = false;
      }
      convertRelative(position, this);
      position = __privateMethod(this, _updatePosition, updatePosition_fn).call(this, position, parent, el, styleCache);
      if (position === null) {
        return this;
      }
    }
    if (Number.isFinite(position.left)) {
      position.left = Math.round(position.left);
      if (data.left !== position.left) {
        data.left = position.left;
        changeSet.left = true;
      }
    }
    if (Number.isFinite(position.top)) {
      position.top = Math.round(position.top);
      if (data.top !== position.top) {
        data.top = position.top;
        changeSet.top = true;
      }
    }
    if (Number.isFinite(position.maxHeight) || position.maxHeight === null) {
      position.maxHeight = typeof position.maxHeight === "number" ? Math.round(position.maxHeight) : null;
      if (data.maxHeight !== position.maxHeight) {
        data.maxHeight = position.maxHeight;
        changeSet.maxHeight = true;
      }
    }
    if (Number.isFinite(position.maxWidth) || position.maxWidth === null) {
      position.maxWidth = typeof position.maxWidth === "number" ? Math.round(position.maxWidth) : null;
      if (data.maxWidth !== position.maxWidth) {
        data.maxWidth = position.maxWidth;
        changeSet.maxWidth = true;
      }
    }
    if (Number.isFinite(position.minHeight) || position.minHeight === null) {
      position.minHeight = typeof position.minHeight === "number" ? Math.round(position.minHeight) : null;
      if (data.minHeight !== position.minHeight) {
        data.minHeight = position.minHeight;
        changeSet.minHeight = true;
      }
    }
    if (Number.isFinite(position.minWidth) || position.minWidth === null) {
      position.minWidth = typeof position.minWidth === "number" ? Math.round(position.minWidth) : null;
      if (data.minWidth !== position.minWidth) {
        data.minWidth = position.minWidth;
        changeSet.minWidth = true;
      }
    }
    if (Number.isFinite(position.rotateX) || position.rotateX === null) {
      if (data.rotateX !== position.rotateX) {
        data.rotateX = transforms.rotateX = position.rotateX;
        changeSet.transform = true;
      }
    }
    if (Number.isFinite(position.rotateY) || position.rotateY === null) {
      if (data.rotateY !== position.rotateY) {
        data.rotateY = transforms.rotateY = position.rotateY;
        changeSet.transform = true;
      }
    }
    if (Number.isFinite(position.rotateZ) || position.rotateZ === null) {
      if (data.rotateZ !== position.rotateZ) {
        data.rotateZ = transforms.rotateZ = position.rotateZ;
        changeSet.transform = true;
      }
    }
    if (Number.isFinite(position.scale) || position.scale === null) {
      position.scale = typeof position.scale === "number" ? Math.max(0, Math.min(position.scale, 1e3)) : null;
      if (data.scale !== position.scale) {
        data.scale = transforms.scale = position.scale;
        changeSet.transform = true;
      }
    }
    if (typeof position.transformOrigin === "string" && transformOrigins.includes(
      position.transformOrigin
    ) || position.transformOrigin === null) {
      if (data.transformOrigin !== position.transformOrigin) {
        data.transformOrigin = position.transformOrigin;
        changeSet.transformOrigin = true;
      }
    }
    if (Number.isFinite(position.translateX) || position.translateX === null) {
      if (data.translateX !== position.translateX) {
        data.translateX = transforms.translateX = position.translateX;
        changeSet.transform = true;
      }
    }
    if (Number.isFinite(position.translateY) || position.translateY === null) {
      if (data.translateY !== position.translateY) {
        data.translateY = transforms.translateY = position.translateY;
        changeSet.transform = true;
      }
    }
    if (Number.isFinite(position.translateZ) || position.translateZ === null) {
      if (data.translateZ !== position.translateZ) {
        data.translateZ = transforms.translateZ = position.translateZ;
        changeSet.transform = true;
      }
    }
    if (Number.isFinite(position.zIndex)) {
      position.zIndex = Math.round(position.zIndex);
      if (data.zIndex !== position.zIndex) {
        data.zIndex = position.zIndex;
        changeSet.zIndex = true;
      }
    }
    if (Number.isFinite(position.width) || position.width === "auto" || position.width === "inherit" || position.width === null) {
      position.width = typeof position.width === "number" ? Math.round(position.width) : position.width;
      if (data.width !== position.width) {
        data.width = position.width;
        changeSet.width = true;
      }
    }
    if (Number.isFinite(position.height) || position.height === "auto" || position.height === "inherit" || position.height === null) {
      position.height = typeof position.height === "number" ? Math.round(position.height) : position.height;
      if (data.height !== position.height) {
        data.height = position.height;
        changeSet.height = true;
      }
    }
    if (el) {
      const defaultData = __privateGet(this, _state).getDefault();
      if (typeof defaultData !== "object") {
        __privateGet(this, _state).save({ name: "#defaultData", ...Object.assign({}, data) });
      }
      if (immediateElementUpdate) {
        UpdateElementManager.immediate(el, __privateGet(this, _updateElementData));
        __privateSet(this, _updateElementPromise, Promise.resolve(performance.now()));
      } else if (!__privateGet(this, _updateElementData).queued) {
        __privateSet(this, _updateElementPromise, UpdateElementManager.add(el, __privateGet(this, _updateElementData)));
      }
    } else {
      UpdateElementManager.updateSubscribers(__privateGet(this, _updateElementData));
    }
    return this;
  }
  /**
   *
   * @param {function(PositionData): void} handler - Callback function that is invoked on update / changes. Receives
   *                                                 a copy of the PositionData.
   *
   * @returns {(function(): void)} Unsubscribe function.
   */
  subscribe(handler) {
    __privateGet(this, _subscriptions).push(handler);
    handler(Object.assign({}, __privateGet(this, _data3)));
    return () => {
      const index = __privateGet(this, _subscriptions).findIndex((sub) => sub === handler);
      if (index >= 0) {
        __privateGet(this, _subscriptions).splice(index, 1);
      }
    };
  }
};
var Position = _Position;
_data3 = new WeakMap();
_animate = new WeakMap();
_enabled4 = new WeakMap();
_positionChangeSet = new WeakMap();
_options = new WeakMap();
_parent = new WeakMap();
_stores = new WeakMap();
_styleCache = new WeakMap();
_subscriptions = new WeakMap();
_transforms2 = new WeakMap();
_updateElementData = new WeakMap();
_updateElementPromise = new WeakMap();
_validators = new WeakMap();
_validatorData2 = new WeakMap();
_state = new WeakMap();
_updatePosition = new WeakSet();
updatePosition_fn = function({
  // Directly supported parameters
  left,
  top,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
  width,
  height,
  rotateX,
  rotateY,
  rotateZ,
  scale,
  transformOrigin,
  translateX,
  translateY,
  translateZ,
  zIndex,
  // Aliased parameters
  rotation,
  ...rest
} = {}, parent, el, styleCache) {
  var _a, _b, _c;
  let currentPosition = s_DATA_UPDATE.copy(__privateGet(this, _data3));
  if (el.style.width === "" || width !== void 0) {
    if (width === "auto" || currentPosition.width === "auto" && width !== null) {
      currentPosition.width = "auto";
      width = styleCache.offsetWidth;
    } else if (width === "inherit" || currentPosition.width === "inherit" && width !== null) {
      currentPosition.width = "inherit";
      width = styleCache.offsetWidth;
    } else {
      const newWidth = Number.isFinite(width) ? width : currentPosition.width;
      currentPosition.width = width = Number.isFinite(newWidth) ? Math.round(newWidth) : styleCache.offsetWidth;
    }
  } else {
    width = Number.isFinite(currentPosition.width) ? currentPosition.width : styleCache.offsetWidth;
  }
  if (el.style.height === "" || height !== void 0) {
    if (height === "auto" || currentPosition.height === "auto" && height !== null) {
      currentPosition.height = "auto";
      height = styleCache.offsetHeight;
    } else if (height === "inherit" || currentPosition.height === "inherit" && height !== null) {
      currentPosition.height = "inherit";
      height = styleCache.offsetHeight;
    } else {
      const newHeight = Number.isFinite(height) ? height : currentPosition.height;
      currentPosition.height = height = Number.isFinite(newHeight) ? Math.round(newHeight) : styleCache.offsetHeight;
    }
  } else {
    height = Number.isFinite(currentPosition.height) ? currentPosition.height : styleCache.offsetHeight;
  }
  if (Number.isFinite(left)) {
    currentPosition.left = left;
  } else if (!Number.isFinite(currentPosition.left)) {
    currentPosition.left = typeof ((_a = __privateGet(this, _options).initialHelper) == null ? void 0 : _a.getLeft) === "function" ? __privateGet(this, _options).initialHelper.getLeft(width) : 0;
  }
  if (Number.isFinite(top)) {
    currentPosition.top = top;
  } else if (!Number.isFinite(currentPosition.top)) {
    currentPosition.top = typeof ((_b = __privateGet(this, _options).initialHelper) == null ? void 0 : _b.getTop) === "function" ? __privateGet(this, _options).initialHelper.getTop(height) : 0;
  }
  if (Number.isFinite(maxHeight) || maxHeight === null) {
    currentPosition.maxHeight = Number.isFinite(maxHeight) ? Math.round(maxHeight) : null;
  }
  if (Number.isFinite(maxWidth) || maxWidth === null) {
    currentPosition.maxWidth = Number.isFinite(maxWidth) ? Math.round(maxWidth) : null;
  }
  if (Number.isFinite(minHeight) || minHeight === null) {
    currentPosition.minHeight = Number.isFinite(minHeight) ? Math.round(minHeight) : null;
  }
  if (Number.isFinite(minWidth) || minWidth === null) {
    currentPosition.minWidth = Number.isFinite(minWidth) ? Math.round(minWidth) : null;
  }
  if (Number.isFinite(rotateX) || rotateX === null) {
    currentPosition.rotateX = rotateX;
  }
  if (Number.isFinite(rotateY) || rotateY === null) {
    currentPosition.rotateY = rotateY;
  }
  if (rotateZ !== currentPosition.rotateZ && (Number.isFinite(rotateZ) || rotateZ === null)) {
    currentPosition.rotateZ = rotateZ;
  } else if (rotation !== currentPosition.rotateZ && (Number.isFinite(rotation) || rotation === null)) {
    currentPosition.rotateZ = rotation;
  }
  if (Number.isFinite(translateX) || translateX === null) {
    currentPosition.translateX = translateX;
  }
  if (Number.isFinite(translateY) || translateY === null) {
    currentPosition.translateY = translateY;
  }
  if (Number.isFinite(translateZ) || translateZ === null) {
    currentPosition.translateZ = translateZ;
  }
  if (Number.isFinite(scale) || scale === null) {
    currentPosition.scale = typeof scale === "number" ? Math.max(0, Math.min(scale, 1e3)) : null;
  }
  if (typeof transformOrigin === "string" || transformOrigin === null) {
    currentPosition.transformOrigin = transformOrigins.includes(transformOrigin) ? transformOrigin : null;
  }
  if (Number.isFinite(zIndex) || zIndex === null) {
    currentPosition.zIndex = typeof zIndex === "number" ? Math.round(zIndex) : zIndex;
  }
  const validatorData = __privateGet(this, _validatorData2);
  if (__privateGet(this, _validators).enabled && validatorData.length) {
    s_VALIDATION_DATA2.parent = parent;
    s_VALIDATION_DATA2.el = el;
    s_VALIDATION_DATA2.computed = styleCache.computed;
    s_VALIDATION_DATA2.transforms = __privateGet(this, _transforms2);
    s_VALIDATION_DATA2.height = height;
    s_VALIDATION_DATA2.width = width;
    s_VALIDATION_DATA2.marginLeft = styleCache.marginLeft;
    s_VALIDATION_DATA2.marginTop = styleCache.marginTop;
    s_VALIDATION_DATA2.maxHeight = styleCache.maxHeight ?? currentPosition.maxHeight;
    s_VALIDATION_DATA2.maxWidth = styleCache.maxWidth ?? currentPosition.maxWidth;
    const isMinimized = ((_c = parent == null ? void 0 : parent.reactive) == null ? void 0 : _c.minimized) ?? false;
    s_VALIDATION_DATA2.minHeight = isMinimized ? currentPosition.minHeight ?? 0 : styleCache.minHeight || (currentPosition.minHeight ?? 0);
    s_VALIDATION_DATA2.minWidth = isMinimized ? currentPosition.minWidth ?? 0 : styleCache.minWidth || (currentPosition.minWidth ?? 0);
    for (let cntr = 0; cntr < validatorData.length; cntr++) {
      s_VALIDATION_DATA2.position = currentPosition;
      s_VALIDATION_DATA2.rest = rest;
      currentPosition = validatorData[cntr].validator(s_VALIDATION_DATA2);
      if (currentPosition === null) {
        return null;
      }
    }
  }
  return currentPosition;
};
var s_DATA_UPDATE = new PositionData();
var s_VALIDATION_DATA2 = {
  position: void 0,
  parent: void 0,
  el: void 0,
  computed: void 0,
  transforms: void 0,
  height: void 0,
  width: void 0,
  marginLeft: void 0,
  marginTop: void 0,
  maxHeight: void 0,
  maxWidth: void 0,
  minHeight: void 0,
  minWidth: void 0,
  rest: void 0
};
Object.seal(s_VALIDATION_DATA2);

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/internal/ApplicationState.js
var _application, _dataSaved2;
var ApplicationState = class {
  /**
   * @param {ApplicationShellExt}   application - The application.
   */
  constructor(application) {
    /** @type {ApplicationShellExt} */
    __privateAdd(this, _application, void 0);
    /** @type {Map<string, ApplicationStateData>} */
    __privateAdd(this, _dataSaved2, /* @__PURE__ */ new Map());
    __privateSet(this, _application, application);
    Object.seal(this);
  }
  /**
   * Returns current application state along with any extra data passed into method.
   *
   * @param {object} [extra] - Extra data to add to application state.
   *
   * @returns {ApplicationStateData} Passed in object with current application state.
   */
  get(extra = {}) {
    var _a, _b, _c, _d, _e, _f, _g;
    return Object.assign(extra, {
      position: (_b = (_a = __privateGet(this, _application)) == null ? void 0 : _a.position) == null ? void 0 : _b.get(),
      beforeMinimized: (_d = (_c = __privateGet(this, _application)) == null ? void 0 : _c.position) == null ? void 0 : _d.state.get({ name: "#beforeMinimized" }),
      options: Object.assign({}, (_e = __privateGet(this, _application)) == null ? void 0 : _e.options),
      ui: { minimized: (_g = (_f = __privateGet(this, _application)) == null ? void 0 : _f.reactive) == null ? void 0 : _g.minimized }
    });
  }
  /**
   * Returns any stored save state by name.
   *
   * @param {string}   name - Saved data set name.
   *
   * @returns {ApplicationStateData} The saved data set.
   */
  getSave({ name }) {
    if (typeof name !== "string") {
      throw new TypeError(`ApplicationState - getSave error: 'name' is not a string.`);
    }
    return __privateGet(this, _dataSaved2).get(name);
  }
  /**
   * Removes and returns any application state by name.
   *
   * @param {object}   options - Options.
   *
   * @param {string}   options.name - Name to remove and retrieve.
   *
   * @returns {ApplicationStateData} Saved application data.
   */
  remove({ name }) {
    if (typeof name !== "string") {
      throw new TypeError(`ApplicationState - remove: 'name' is not a string.`);
    }
    const data = __privateGet(this, _dataSaved2).get(name);
    __privateGet(this, _dataSaved2).delete(name);
    return data;
  }
  /**
   * Restores a saved application state returning the data. Several optional parameters are available
   * to control whether the restore action occurs silently (no store / inline styles updates), animates
   * to the stored data, or simply sets the stored data. Restoring via {@link AnimationAPI.to} allows
   * specification of the duration, easing, and interpolate functions along with configuring a Promise to be
   * returned if awaiting the end of the animation.
   *
   * @param {object}            params - Parameters
   *
   * @param {string}            params.name - Saved data set name.
   *
   * @param {boolean}           [params.remove=false] - Remove data set.
   *
   * @param {boolean}           [params.async=false] - If animating return a Promise that resolves with any saved data.
   *
   * @param {boolean}           [params.animateTo=false] - Animate to restore data.
   *
   * @param {number}            [params.duration=0.1] - Duration in seconds.
   *
   * @param {Function}          [params.ease=linear] - Easing function.
   *
   * @param {Function}          [params.interpolate=lerp] - Interpolation function.
   *
   * @returns {ApplicationStateData|Promise<ApplicationStateData>} Saved application data.
   */
  restore({
    name,
    remove = false,
    async = false,
    animateTo = false,
    duration = 0.1,
    ease = identity,
    interpolate = lerp$5
  }) {
    if (typeof name !== "string") {
      throw new TypeError(`ApplicationState - restore error: 'name' is not a string.`);
    }
    const dataSaved = __privateGet(this, _dataSaved2).get(name);
    if (dataSaved) {
      if (remove) {
        __privateGet(this, _dataSaved2).delete(name);
      }
      if (async) {
        return this.set(dataSaved, { async, animateTo, duration, ease, interpolate }).then(() => dataSaved);
      } else {
        this.set(dataSaved, { async, animateTo, duration, ease, interpolate });
      }
    }
    return dataSaved;
  }
  /**
   * Saves current application state with the opportunity to add extra data to the saved state.
   *
   * @param {object}   options - Options.
   *
   * @param {string}   options.name - name to index this saved data.
   *
   * @param {...*}     [options.extra] - Extra data to add to saved data.
   *
   * @returns {ApplicationStateData} Current application data
   */
  save({ name, ...extra }) {
    if (typeof name !== "string") {
      throw new TypeError(`ApplicationState - save error: 'name' is not a string.`);
    }
    const data = this.get(extra);
    __privateGet(this, _dataSaved2).set(name, data);
    return data;
  }
  /**
   * Restores a saved application state returning the data. Several optional parameters are available
   * to control whether the restore action occurs silently (no store / inline styles updates), animates
   * to the stored data, or simply sets the stored data. Restoring via {@link AnimationAPI.to} allows
   * specification of the duration, easing, and interpolate functions along with configuring a Promise to be
   * returned if awaiting the end of the animation.
   *
   * Note: If serializing application state any minimized apps will use the before minimized state on initial render
   * of the app as it is currently not possible to render apps with Foundry VTT core API in the minimized state.
   *
   * TODO: THIS METHOD NEEDS TO BE REFACTORED WHEN TRL IS MADE INTO A STANDALONE FRAMEWORK.
   *
   * @param {ApplicationStateData}   data - Saved data set name.
   *
   * @param {object}            [opts] - Optional parameters
   *
   * @param {boolean}           [opts.async=false] - If animating return a Promise that resolves with any saved data.
   *
   * @param {boolean}           [opts.animateTo=false] - Animate to restore data.
   *
   * @param {number}            [opts.duration=0.1] - Duration in seconds.
   *
   * @param {Function}          [opts.ease=linear] - Easing function.
   *
   * @param {Function}          [opts.interpolate=lerp] - Interpolation function.
   *
   * @returns {ApplicationShellExt|Promise<ApplicationShellExt>} When synchronous the application or Promise when
   *                                                             animating resolving with application.
   */
  set(data, { async = false, animateTo = false, duration = 0.1, ease = identity, interpolate = lerp$5 } = {}) {
    var _a, _b, _c, _d, _e;
    if (!isObject(data)) {
      throw new TypeError(`ApplicationState - restore error: 'data' is not an object.`);
    }
    const application = __privateGet(this, _application);
    if (!isObject(data == null ? void 0 : data.position)) {
      console.warn(`ApplicationState.set warning: 'data.position' is not an object.`);
      return application;
    }
    const rendered = application.rendered;
    if (animateTo && !rendered) {
      console.warn(`ApplicationState.set warning: Application is not rendered and 'animateTo' is true.`);
      return application;
    }
    if (animateTo) {
      if (data.position.transformOrigin !== application.position.transformOrigin) {
        application.position.transformOrigin = data.position.transformOrigin;
      }
      if (isObject(data == null ? void 0 : data.ui)) {
        const minimized = typeof ((_a = data.ui) == null ? void 0 : _a.minimized) === "boolean" ? data.ui.minimized : false;
        if (((_b = application == null ? void 0 : application.reactive) == null ? void 0 : _b.minimized) && !minimized) {
          application.maximize({ animate: false, duration: 0 });
        }
      }
      const promise = application.position.animate.to(
        data.position,
        { duration, ease, interpolate }
      ).finished.then((cancelled) => {
        var _a2, _b2;
        if (cancelled) {
          return application;
        }
        if (isObject(data == null ? void 0 : data.options)) {
          application == null ? void 0 : application.reactive.mergeOptions(data.options);
        }
        if (isObject(data == null ? void 0 : data.ui)) {
          const minimized = typeof ((_a2 = data.ui) == null ? void 0 : _a2.minimized) === "boolean" ? data.ui.minimized : false;
          if (!((_b2 = application == null ? void 0 : application.reactive) == null ? void 0 : _b2.minimized) && minimized) {
            application.minimize({ animate: false, duration: 0 });
          }
        }
        if (isObject(data == null ? void 0 : data.beforeMinimized)) {
          application.position.state.set({ name: "#beforeMinimized", ...data.beforeMinimized });
        }
        return application;
      });
      if (async) {
        return promise;
      }
    } else {
      if (rendered) {
        if (isObject(data == null ? void 0 : data.options)) {
          application == null ? void 0 : application.reactive.mergeOptions(data.options);
        }
        if (isObject(data == null ? void 0 : data.ui)) {
          const minimized = typeof ((_c = data.ui) == null ? void 0 : _c.minimized) === "boolean" ? data.ui.minimized : false;
          if (((_d = application == null ? void 0 : application.reactive) == null ? void 0 : _d.minimized) && !minimized) {
            application.maximize({ animate: false, duration: 0 });
          } else if (!((_e = application == null ? void 0 : application.reactive) == null ? void 0 : _e.minimized) && minimized) {
            application.minimize({ animate: false, duration });
          }
        }
        if (isObject(data == null ? void 0 : data.beforeMinimized)) {
          application.position.state.set({ name: "#beforeMinimized", ...data.beforeMinimized });
        }
        application.position.set(data.position);
      } else {
        let positionData = data.position;
        if (isObject(data.beforeMinimized)) {
          positionData = data.beforeMinimized;
          positionData.left = data.position.left;
          positionData.top = data.position.top;
        }
        application.position.set(positionData);
      }
    }
    return application;
  }
};
_application = new WeakMap();
_dataSaved2 = new WeakMap();

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/internal/GetSvelteData.js
var _applicationShellHolder, _svelteData;
var GetSvelteData = class {
  /**
   * Keep a direct reference to the SvelteData array in an associated {@link SvelteApplication}.
   *
   * @param {MountedAppShell[]|null[]}  applicationShellHolder - A reference to the MountedAppShell array.
   *
   * @param {SvelteData[]}  svelteData - A reference to the SvelteData array of mounted components.
   */
  constructor(applicationShellHolder, svelteData) {
    /**
     * @type {MountedAppShell[]|null[]}
     */
    __privateAdd(this, _applicationShellHolder, void 0);
    /**
     * @type {SvelteData[]}
     */
    __privateAdd(this, _svelteData, void 0);
    __privateSet(this, _applicationShellHolder, applicationShellHolder);
    __privateSet(this, _svelteData, svelteData);
  }
  /**
   * Returns any mounted {@link MountedAppShell}.
   *
   * @returns {MountedAppShell|null} Any mounted application shell.
   */
  get applicationShell() {
    return __privateGet(this, _applicationShellHolder)[0];
  }
  /**
   * Returns the indexed Svelte component.
   *
   * @param {number}   index -
   *
   * @returns {object} The loaded Svelte component.
   */
  component(index) {
    const data = __privateGet(this, _svelteData)[index];
    return isObject(data) ? data == null ? void 0 : data.component : void 0;
  }
  /**
   * Returns the Svelte component entries iterator.
   *
   * @returns {Generator<Array<number|SvelteComponent>>} Svelte component entries iterator.
   * @yields
   */
  *componentEntries() {
    for (let cntr = 0; cntr < __privateGet(this, _svelteData).length; cntr++) {
      yield [cntr, __privateGet(this, _svelteData)[cntr].component];
    }
  }
  /**
   * Returns the Svelte component values iterator.
   *
   * @returns {Generator<SvelteComponent>} Svelte component values iterator.
   * @yields
   */
  *componentValues() {
    for (let cntr = 0; cntr < __privateGet(this, _svelteData).length; cntr++) {
      yield __privateGet(this, _svelteData)[cntr].component;
    }
  }
  /**
   * Returns the indexed SvelteData entry.
   *
   * @param {number}   index -
   *
   * @returns {SvelteData} The loaded Svelte config + component.
   */
  data(index) {
    return __privateGet(this, _svelteData)[index];
  }
  /**
   * Returns the {@link SvelteData} instance for a given component.
   *
   * @param {object} component - Svelte component.
   *
   * @returns {SvelteData} -  The loaded Svelte config + component.
   */
  dataByComponent(component) {
    for (const data of __privateGet(this, _svelteData)) {
      if (data.component === component) {
        return data;
      }
    }
    return void 0;
  }
  /**
   * Returns the SvelteData entries iterator.
   *
   * @returns {IterableIterator<[number, SvelteData]>} SvelteData entries iterator.
   */
  dataEntries() {
    return __privateGet(this, _svelteData).entries();
  }
  /**
   * Returns the SvelteData values iterator.
   *
   * @returns {IterableIterator<SvelteData>} SvelteData values iterator.
   */
  dataValues() {
    return __privateGet(this, _svelteData).values();
  }
  /**
   * Returns the length of the mounted Svelte component list.
   *
   * @returns {number} Length of mounted Svelte component list.
   */
  get length() {
    return __privateGet(this, _svelteData).length;
  }
};
_applicationShellHolder = new WeakMap();
_svelteData = new WeakMap();

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/internal/loadSvelteConfig.js
function loadSvelteConfig({ app, template, config, elementRootUpdate } = {}) {
  const svelteOptions = isObject(config.options) ? config.options : {};
  let target;
  if (config.target instanceof HTMLElement) {
    target = config.target;
  } else if (template instanceof HTMLElement && typeof config.target === "string") {
    target = template.querySelector(config.target);
  } else {
    target = document.createDocumentFragment();
  }
  if (target === void 0) {
    console.log(
      `%c[TRL] loadSvelteConfig error - could not find target selector, '${config.target}', for config:
`,
      "background: rgb(57,34,34)",
      config
    );
    throw new Error();
  }
  const NewSvelteComponent = config.class;
  const svelteConfig = parseSvelteConfig({ ...config, target }, app);
  const externalContext = svelteConfig.context.get("#external");
  externalContext.application = app;
  externalContext.elementRootUpdate = elementRootUpdate;
  externalContext.sessionStorage = app.reactive.sessionStorage;
  let eventbus;
  if (isObject(app._eventbus) && typeof app._eventbus.createProxy === "function") {
    eventbus = app._eventbus.createProxy();
    externalContext.eventbus = eventbus;
  }
  Object.seal(externalContext);
  svelteConfig.context.set("external", new Proxy({}, {
    get(targetUnused, prop) {
      console.warn(`[TRL] Deprecation warning: Please change getContext('external') to getContext('#external').`);
      return externalContext[prop];
    }
  }));
  const component = new NewSvelteComponent(svelteConfig);
  svelteConfig.eventbus = eventbus;
  let element;
  if (isApplicationShell(component)) {
    element = component.elementRoot;
  }
  if (target instanceof DocumentFragment && target.firstElementChild) {
    if (element === void 0) {
      element = target.firstElementChild;
    }
    template.append(target);
  } else if (config.target instanceof HTMLElement && element === void 0) {
    if (config.target instanceof HTMLElement && typeof svelteOptions.selectorElement !== "string") {
      console.log(
        `%c[TRL] loadSvelteConfig error - HTMLElement target with no 'selectorElement' defined.

Note: If configuring an application shell and directly targeting a HTMLElement did you bind an'elementRoot' and include '<svelte:options accessors={true}/>'?

Offending config:
`,
        "background: rgb(57,34,34)",
        config
      );
      throw new Error();
    }
    element = target.querySelector(svelteOptions.selectorElement);
    if (element === null || element === void 0) {
      console.log(
        `%c[TRL] loadSvelteConfig error - HTMLElement target with 'selectorElement', '${svelteOptions.selectorElement}', not found for config:
`,
        "background: rgb(57,34,34)",
        config
      );
      throw new Error();
    }
  }
  const injectHTML = !(config.target instanceof HTMLElement);
  return { config: svelteConfig, component, element, injectHTML };
}

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/internal/SvelteReactive.js
var _application2, _initialized, _sessionStorage, _storeAppOptions, _storeAppOptionsUpdate, _dataUIState, _storeUIState, _storeUIStateUpdate, _storeUnsubscribe, _storesInitialize, storesInitialize_fn, _storesSubscribe, storesSubscribe_fn, _storesUnsubscribe, storesUnsubscribe_fn;
var SvelteReactive = class {
  /**
   * @param {SvelteApplication} application - The host Foundry application.
   */
  constructor(application) {
    /**
     * Initializes the Svelte stores and derived stores for the application options and UI state.
     *
     * While writable stores are created the update method is stored in private variables locally and derived Readable
     * stores are provided for essential options which are commonly used.
     *
     * These stores are injected into all Svelte components mounted under the `external` context: `storeAppOptions` and
     * ` storeUIState`.
     */
    __privateAdd(this, _storesInitialize);
    /**
     * Registers local store subscriptions for app options. `popOut` controls registering this app with `ui.windows`.
     *
     * @see SvelteApplication._injectHTML
     */
    __privateAdd(this, _storesSubscribe);
    /**
     * Unsubscribes from any locally monitored stores.
     *
     * @see SvelteApplication.close
     */
    __privateAdd(this, _storesUnsubscribe);
    /**
     * @type {SvelteApplication}
     */
    __privateAdd(this, _application2, void 0);
    /**
     * @type {boolean}
     */
    __privateAdd(this, _initialized, false);
    /** @type {TJSSessionStorage} */
    __privateAdd(this, _sessionStorage, void 0);
    /**
     * The Application option store which is injected into mounted Svelte component context under the `external` key.
     *
     * @type {StoreAppOptions}
     */
    __privateAdd(this, _storeAppOptions, void 0);
    /**
     * Stores the update function for `#storeAppOptions`.
     *
     * @type {import('svelte/store').Writable.update}
     */
    __privateAdd(this, _storeAppOptionsUpdate, void 0);
    /**
     * Stores the UI state data to make it accessible via getters.
     *
     * @type {object}
     */
    __privateAdd(this, _dataUIState, void 0);
    /**
     * The UI option store which is injected into mounted Svelte component context under the `external` key.
     *
     * @type {StoreUIOptions}
     */
    __privateAdd(this, _storeUIState, void 0);
    /**
     * Stores the update function for `#storeUIState`.
     *
     * @type {import('svelte/store').Writable.update}
     */
    __privateAdd(this, _storeUIStateUpdate, void 0);
    /**
     * Stores the unsubscribe functions from local store subscriptions.
     *
     * @type {import('svelte/store').Unsubscriber[]}
     */
    __privateAdd(this, _storeUnsubscribe, []);
    var _a;
    __privateSet(this, _application2, application);
    const optionsSessionStorage = (_a = application == null ? void 0 : application.options) == null ? void 0 : _a.sessionStorage;
    if (optionsSessionStorage !== void 0 && !(optionsSessionStorage instanceof TJSSessionStorage)) {
      throw new TypeError(`'options.sessionStorage' is not an instance of TJSSessionStorage.`);
    }
    __privateSet(this, _sessionStorage, optionsSessionStorage !== void 0 ? optionsSessionStorage : new TJSSessionStorage());
  }
  /**
   * Initializes reactive support. Package private for internal use.
   *
   * @returns {SvelteStores|void} Internal methods to interact with Svelte stores.
   * @package
   */
  initialize() {
    if (__privateGet(this, _initialized)) {
      return;
    }
    __privateSet(this, _initialized, true);
    __privateMethod(this, _storesInitialize, storesInitialize_fn).call(this);
    return {
      appOptionsUpdate: __privateGet(this, _storeAppOptionsUpdate),
      uiOptionsUpdate: __privateGet(this, _storeUIStateUpdate),
      subscribe: __privateMethod(this, _storesSubscribe, storesSubscribe_fn).bind(this),
      unsubscribe: __privateMethod(this, _storesUnsubscribe, storesUnsubscribe_fn).bind(this)
    };
  }
  // Store getters -----------------------------------------------------------------------------------------------------
  /**
   * @returns {TJSSessionStorage} Returns TJSSessionStorage instance.
   */
  get sessionStorage() {
    return __privateGet(this, _sessionStorage);
  }
  /**
   * Returns the store for app options.
   *
   * @returns {StoreAppOptions} App options store.
   */
  get storeAppOptions() {
    return __privateGet(this, _storeAppOptions);
  }
  /**
   * Returns the store for UI options.
   *
   * @returns {StoreUIOptions} UI options store.
   */
  get storeUIState() {
    return __privateGet(this, _storeUIState);
  }
  // Only reactive getters ---------------------------------------------------------------------------------------------
  /**
   * Returns the current dragging UI state.
   *
   * @returns {boolean} Dragging UI state.
   */
  get dragging() {
    return __privateGet(this, _dataUIState).dragging;
  }
  /**
   * Returns the current minimized UI state.
   *
   * @returns {boolean} Minimized UI state.
   */
  get minimized() {
    return __privateGet(this, _dataUIState).minimized;
  }
  /**
   * Returns the current resizing UI state.
   *
   * @returns {boolean} Resizing UI state.
   */
  get resizing() {
    return __privateGet(this, _dataUIState).resizing;
  }
  // Reactive getter / setters -----------------------------------------------------------------------------------------
  /**
   * Returns the draggable app option.
   *
   * @returns {boolean} Draggable app option.
   */
  get draggable() {
    var _a, _b;
    return (_b = (_a = __privateGet(this, _application2)) == null ? void 0 : _a.options) == null ? void 0 : _b.draggable;
  }
  /**
   * Returns the focusAuto app option.
   *
   * @returns {boolean} When true auto-management of app focus is enabled.
   */
  get focusAuto() {
    var _a, _b;
    return (_b = (_a = __privateGet(this, _application2)) == null ? void 0 : _a.options) == null ? void 0 : _b.focusAuto;
  }
  /**
   * Returns the focusKeep app option.
   *
   * @returns {boolean} When `focusAuto` and `focusKeep` is true; keeps internal focus.
   */
  get focusKeep() {
    var _a, _b;
    return (_b = (_a = __privateGet(this, _application2)) == null ? void 0 : _a.options) == null ? void 0 : _b.focusKeep;
  }
  /**
   * Returns the focusTrap app option.
   *
   * @returns {boolean} When true focus trapping / wrapping is enabled keeping focus inside app.
   */
  get focusTrap() {
    var _a, _b;
    return (_b = (_a = __privateGet(this, _application2)) == null ? void 0 : _a.options) == null ? void 0 : _b.focusTrap;
  }
  /**
   * Returns the headerButtonNoClose app option.
   *
   * @returns {boolean} Remove the close the button in header app option.
   */
  get headerButtonNoClose() {
    var _a, _b;
    return (_b = (_a = __privateGet(this, _application2)) == null ? void 0 : _a.options) == null ? void 0 : _b.headerButtonNoClose;
  }
  /**
   * Returns the headerButtonNoLabel app option.
   *
   * @returns {boolean} Remove the labels from buttons in header app option.
   */
  get headerButtonNoLabel() {
    var _a, _b;
    return (_b = (_a = __privateGet(this, _application2)) == null ? void 0 : _a.options) == null ? void 0 : _b.headerButtonNoLabel;
  }
  /**
   * Returns the headerIcon app option.
   *
   * @returns {string|void} URL for header app icon.
   */
  get headerIcon() {
    var _a, _b;
    return (_b = (_a = __privateGet(this, _application2)) == null ? void 0 : _a.options) == null ? void 0 : _b.headerIcon;
  }
  /**
   * Returns the headerNoTitleMinimized app option.
   *
   * @returns {boolean} When true removes the header title when minimized.
   */
  get headerNoTitleMinimized() {
    var _a, _b;
    return (_b = (_a = __privateGet(this, _application2)) == null ? void 0 : _a.options) == null ? void 0 : _b.headerNoTitleMinimized;
  }
  /**
   * Returns the minimizable app option.
   *
   * @returns {boolean} Minimizable app option.
   */
  get minimizable() {
    var _a, _b;
    return (_b = (_a = __privateGet(this, _application2)) == null ? void 0 : _a.options) == null ? void 0 : _b.minimizable;
  }
  /**
   * Returns the Foundry popOut state; {@link Application.popOut}
   *
   * @returns {boolean} Positionable app option.
   */
  get popOut() {
    return __privateGet(this, _application2).popOut;
  }
  /**
   * Returns the positionable app option; {@link SvelteApplicationOptions.positionable}
   *
   * @returns {boolean} Positionable app option.
   */
  get positionable() {
    var _a, _b;
    return (_b = (_a = __privateGet(this, _application2)) == null ? void 0 : _a.options) == null ? void 0 : _b.positionable;
  }
  /**
   * Returns the resizable option.
   *
   * @returns {boolean} Resizable app option.
   */
  get resizable() {
    var _a, _b;
    return (_b = (_a = __privateGet(this, _application2)) == null ? void 0 : _a.options) == null ? void 0 : _b.resizable;
  }
  /**
   * Returns the title accessor from the parent Application class; {@link Application.title}
   * TODO: Application v2; note that super.title localizes `this.options.title`; IMHO it shouldn't.
   *
   * @returns {string} Title.
   */
  get title() {
    return __privateGet(this, _application2).title;
  }
  /**
   * Sets `this.options.draggable` which is reactive for application shells.
   *
   * @param {boolean}  draggable - Sets the draggable option.
   */
  set draggable(draggable) {
    if (typeof draggable === "boolean") {
      this.setOptions("draggable", draggable);
    }
  }
  /**
   * Sets `this.options.focusAuto` which is reactive for application shells.
   *
   * @param {boolean}  focusAuto - Sets the focusAuto option.
   */
  set focusAuto(focusAuto) {
    if (typeof focusAuto === "boolean") {
      this.setOptions("focusAuto", focusAuto);
    }
  }
  /**
   * Sets `this.options.focusKeep` which is reactive for application shells.
   *
   * @param {boolean}  focusKeep - Sets the focusKeep option.
   */
  set focusKeep(focusKeep) {
    if (typeof focusKeep === "boolean") {
      this.setOptions("focusKeep", focusKeep);
    }
  }
  /**
   * Sets `this.options.focusTrap` which is reactive for application shells.
   *
   * @param {boolean}  focusTrap - Sets the focusTrap option.
   */
  set focusTrap(focusTrap) {
    if (typeof focusTrap === "boolean") {
      this.setOptions("focusTrap", focusTrap);
    }
  }
  /**
   * Sets `this.options.headerButtonNoClose` which is reactive for application shells.
   *
   * @param {boolean}  headerButtonNoClose - Sets the headerButtonNoClose option.
   */
  set headerButtonNoClose(headerButtonNoClose) {
    if (typeof headerButtonNoClose === "boolean") {
      this.setOptions("headerButtonNoClose", headerButtonNoClose);
    }
  }
  /**
   * Sets `this.options.headerButtonNoLabel` which is reactive for application shells.
   *
   * @param {boolean}  headerButtonNoLabel - Sets the headerButtonNoLabel option.
   */
  set headerButtonNoLabel(headerButtonNoLabel) {
    if (typeof headerButtonNoLabel === "boolean") {
      this.setOptions("headerButtonNoLabel", headerButtonNoLabel);
    }
  }
  /**
   * Sets `this.options.headerIcon` which is reactive for application shells.
   *
   * @param {string|void}  headerIcon - Sets the headerButtonNoLabel option.
   */
  set headerIcon(headerIcon) {
    if (headerIcon === void 0 || typeof headerIcon === "string") {
      this.setOptions("headerIcon", headerIcon);
    }
  }
  /**
   * Sets `this.options.headerNoTitleMinimized` which is reactive for application shells.
   *
   * @param {boolean}  headerNoTitleMinimized - Sets the headerNoTitleMinimized option.
   */
  set headerNoTitleMinimized(headerNoTitleMinimized) {
    if (typeof headerNoTitleMinimized === "boolean") {
      this.setOptions("headerNoTitleMinimized", headerNoTitleMinimized);
    }
  }
  /**
   * Sets `this.options.minimizable` which is reactive for application shells that are also pop out.
   *
   * @param {boolean}  minimizable - Sets the minimizable option.
   */
  set minimizable(minimizable) {
    if (typeof minimizable === "boolean") {
      this.setOptions("minimizable", minimizable);
    }
  }
  /**
   * Sets `this.options.popOut` which is reactive for application shells. This will add / remove this application
   * from `ui.windows`.
   *
   * @param {boolean}  popOut - Sets the popOut option.
   */
  set popOut(popOut) {
    if (typeof popOut === "boolean") {
      this.setOptions("popOut", popOut);
    }
  }
  /**
   * Sets `this.options.positionable` enabling / disabling {@link SvelteApplication.position.set}.
   *
   * @param {boolean}  positionable - Sets the positionable option.
   */
  set positionable(positionable) {
    if (typeof positionable === "boolean") {
      this.setOptions("positionable", positionable);
    }
  }
  /**
   * Sets `this.options.resizable` which is reactive for application shells.
   *
   * @param {boolean}  resizable - Sets the resizable option.
   */
  set resizable(resizable) {
    if (typeof resizable === "boolean") {
      this.setOptions("resizable", resizable);
    }
  }
  /**
   * Sets `this.options.title` which is reactive for application shells.
   *
   * Note: Will set empty string if title is undefined or null.
   *
   * @param {string|undefined|null}   title - Application title; will be localized, so a translation key is fine.
   */
  set title(title) {
    if (typeof title === "string") {
      this.setOptions("title", title);
    } else if (title === void 0 || title === null) {
      this.setOptions("title", "");
    }
  }
  // Reactive Options API -------------------------------------------------------------------------------------------
  /**
   * Provides a way to safely get this applications options given an accessor string which describes the
   * entries to walk. To access deeper entries into the object format the accessor string with `.` between entries
   * to walk.
   *
   * // TODO DOCUMENT the accessor in more detail.
   *
   * @param {string}   accessor - The path / key to set. You can set multiple levels.
   *
   * @param {*}        [defaultValue] - A default value returned if the accessor is not found.
   *
   * @returns {*} Value at the accessor.
   */
  getOptions(accessor, defaultValue) {
    return safeAccess(__privateGet(this, _application2).options, accessor, defaultValue);
  }
  /**
   * Provides a way to merge `options` into this applications options and update the appOptions store.
   *
   * @param {object}   options - The options object to merge with `this.options`.
   */
  mergeOptions(options) {
    __privateGet(this, _storeAppOptionsUpdate).call(this, (instanceOptions) => deepMerge(instanceOptions, options));
  }
  /**
   * Provides a way to safely set this applications options given an accessor string which describes the
   * entries to walk. To access deeper entries into the object format the accessor string with `.` between entries
   * to walk.
   *
   * Additionally if an application shell Svelte component is mounted and exports the `appOptions` property then
   * the application options is set to `appOptions` potentially updating the application shell / Svelte component.
   *
   * // TODO DOCUMENT the accessor in more detail.
   *
   * @param {string}   accessor - The path / key to set. You can set multiple levels.
   *
   * @param {*}        value - Value to set.
   */
  setOptions(accessor, value) {
    const success = safeSet(__privateGet(this, _application2).options, accessor, value);
    if (success) {
      __privateGet(this, _storeAppOptionsUpdate).call(this, () => __privateGet(this, _application2).options);
    }
  }
  /**
   * Updates the UI Options store with the current header buttons. You may dynamically add / remove header buttons
   * if using an application shell Svelte component. In either overriding `_getHeaderButtons` or responding to the
   * Hooks fired return a new button array and the uiOptions store is updated and the application shell will render
   * the new buttons.
   *
   * Optionally you can set in the SvelteApplication app options {@link SvelteApplicationOptions.headerButtonNoClose}
   * to remove the close button and {@link SvelteApplicationOptions.headerButtonNoLabel} to true and labels will be
   * removed from the header buttons.
   *
   * @param {object} opts - Optional parameters (for internal use)
   *
   * @param {boolean} opts.headerButtonNoClose - The value for `headerButtonNoClose`.
   *
   * @param {boolean} opts.headerButtonNoLabel - The value for `headerButtonNoLabel`.
   */
  updateHeaderButtons({
    headerButtonNoClose = __privateGet(this, _application2).options.headerButtonNoClose,
    headerButtonNoLabel = __privateGet(this, _application2).options.headerButtonNoLabel
  } = {}) {
    let buttons = __privateGet(this, _application2)._getHeaderButtons();
    if (typeof headerButtonNoClose === "boolean" && headerButtonNoClose) {
      buttons = buttons.filter((button) => button.class !== "close");
    }
    if (typeof headerButtonNoLabel === "boolean" && headerButtonNoLabel) {
      for (const button of buttons) {
        button.label = void 0;
      }
    }
    __privateGet(this, _storeUIStateUpdate).call(this, (options) => {
      options.headerButtons = buttons;
      return options;
    });
  }
};
_application2 = new WeakMap();
_initialized = new WeakMap();
_sessionStorage = new WeakMap();
_storeAppOptions = new WeakMap();
_storeAppOptionsUpdate = new WeakMap();
_dataUIState = new WeakMap();
_storeUIState = new WeakMap();
_storeUIStateUpdate = new WeakMap();
_storeUnsubscribe = new WeakMap();
_storesInitialize = new WeakSet();
storesInitialize_fn = function() {
  const writableAppOptions = writable(__privateGet(this, _application2).options);
  __privateSet(this, _storeAppOptionsUpdate, writableAppOptions.update);
  const storeAppOptions = {
    subscribe: writableAppOptions.subscribe,
    draggable: propertyStore(writableAppOptions, "draggable"),
    focusAuto: propertyStore(writableAppOptions, "focusAuto"),
    focusKeep: propertyStore(writableAppOptions, "focusKeep"),
    focusTrap: propertyStore(writableAppOptions, "focusTrap"),
    headerButtonNoClose: propertyStore(writableAppOptions, "headerButtonNoClose"),
    headerButtonNoLabel: propertyStore(writableAppOptions, "headerButtonNoLabel"),
    headerIcon: propertyStore(writableAppOptions, "headerIcon"),
    headerNoTitleMinimized: propertyStore(writableAppOptions, "headerNoTitleMinimized"),
    minimizable: propertyStore(writableAppOptions, "minimizable"),
    popOut: propertyStore(writableAppOptions, "popOut"),
    positionable: propertyStore(writableAppOptions, "positionable"),
    resizable: propertyStore(writableAppOptions, "resizable"),
    title: propertyStore(writableAppOptions, "title")
  };
  Object.freeze(storeAppOptions);
  __privateSet(this, _storeAppOptions, storeAppOptions);
  __privateSet(this, _dataUIState, {
    dragging: false,
    headerButtons: [],
    minimized: __privateGet(this, _application2)._minimized,
    resizing: false
  });
  const writableUIOptions = writable(__privateGet(this, _dataUIState));
  __privateSet(this, _storeUIStateUpdate, writableUIOptions.update);
  const storeUIState = {
    subscribe: writableUIOptions.subscribe,
    dragging: propertyStore(writableUIOptions, "dragging"),
    headerButtons: derived(writableUIOptions, ($options, set) => set($options.headerButtons)),
    minimized: derived(writableUIOptions, ($options, set) => set($options.minimized)),
    resizing: propertyStore(writableUIOptions, "resizing")
  };
  Object.freeze(storeUIState);
  __privateSet(this, _storeUIState, storeUIState);
};
_storesSubscribe = new WeakSet();
storesSubscribe_fn = function() {
  __privateGet(this, _storeUnsubscribe).push(subscribeIgnoreFirst(__privateGet(this, _storeAppOptions).headerButtonNoClose, (value) => {
    this.updateHeaderButtons({ headerButtonNoClose: value });
  }));
  __privateGet(this, _storeUnsubscribe).push(subscribeIgnoreFirst(__privateGet(this, _storeAppOptions).headerButtonNoLabel, (value) => {
    this.updateHeaderButtons({ headerButtonNoLabel: value });
  }));
  __privateGet(this, _storeUnsubscribe).push(subscribeIgnoreFirst(__privateGet(this, _storeAppOptions).popOut, (value) => {
    if (value && __privateGet(this, _application2).rendered) {
      globalThis.ui.windows[__privateGet(this, _application2).appId] = __privateGet(this, _application2);
    } else {
      delete globalThis.ui.windows[__privateGet(this, _application2).appId];
    }
  }));
};
_storesUnsubscribe = new WeakSet();
storesUnsubscribe_fn = function() {
  __privateGet(this, _storeUnsubscribe).forEach((unsubscribe) => unsubscribe());
  __privateSet(this, _storeUnsubscribe, []);
};

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/SvelteApplication.js
var _applicationShellHolder2, _applicationState, _elementTarget, _elementContent, _initialZIndex, _onMount, _position3, _reactive, _svelteData2, _getSvelteData, _stores2, _updateApplicationShell, updateApplicationShell_fn;
var _SvelteApplication = class extends Application {
  /**
   * @param {SvelteApplicationOptions} options - The options for the application.
   *
   * @inheritDoc
   */
  constructor(options = {}) {
    super(options);
    /**
     * This method is invoked by the `elementRootUpdate` callback that is added to the external context passed to
     * Svelte components. When invoked it updates the local element roots tracked by SvelteApplication.
     *
     * This method may also be invoked by HMR / hot module replacement via `svelte-hmr`.
     */
    __privateAdd(this, _updateApplicationShell);
    /**
     * Stores the first mounted component which follows the application shell contract.
     *
     * @type {MountedAppShell[]|null[]} Application shell.
     */
    __privateAdd(this, _applicationShellHolder2, [null]);
    /**
     * Stores and manages application state for saving / restoring / serializing.
     *
     * @type {ApplicationState}
     */
    __privateAdd(this, _applicationState, void 0);
    /**
     * Stores the target element which may not necessarily be the main element.
     *
     * @type {HTMLElement}
     */
    __privateAdd(this, _elementTarget, null);
    /**
     * Stores the content element which is set for application shells.
     *
     * @type {HTMLElement}
     */
    __privateAdd(this, _elementContent, null);
    /**
     * Stores initial z-index from `_renderOuter` to set to target element / Svelte component.
     *
     * @type {number}
     */
    __privateAdd(this, _initialZIndex, 95);
    /**
     * Stores on mount state which is checked in _render to trigger onSvelteMount callback.
     *
     * @type {boolean}
     */
    __privateAdd(this, _onMount, false);
    /**
     * The position store.
     *
     * @type {Position}
     */
    __privateAdd(this, _position3, void 0);
    /**
     * Contains the Svelte stores and reactive accessors.
     *
     * @type {SvelteReactive}
     */
    __privateAdd(this, _reactive, void 0);
    /**
     * Stores SvelteData entries with instantiated Svelte components.
     *
     * @type {SvelteData[]}
     */
    __privateAdd(this, _svelteData2, []);
    /**
     * Provides a helper class that combines multiple methods for interacting with the mounted components tracked in
     * {@link SvelteData}.
     *
     * @type {GetSvelteData}
     */
    __privateAdd(this, _getSvelteData, new GetSvelteData(__privateGet(this, _applicationShellHolder2), __privateGet(this, _svelteData2)));
    /**
     * Contains methods to interact with the Svelte stores.
     *
     * @type {SvelteStores}
     */
    __privateAdd(this, _stores2, void 0);
    __privateSet(this, _applicationState, new ApplicationState(this));
    __privateSet(this, _position3, new Position(this, {
      ...this.position,
      ...this.options,
      initial: this.options.positionInitial,
      ortho: this.options.positionOrtho,
      validator: this.options.positionValidator
    }));
    delete this.position;
    Object.defineProperty(this, "position", {
      get: () => __privateGet(this, _position3),
      set: (position) => {
        if (isObject(position)) {
          __privateGet(this, _position3).set(position);
        }
      }
    });
    __privateSet(this, _reactive, new SvelteReactive(this));
    __privateSet(this, _stores2, __privateGet(this, _reactive).initialize());
  }
  /**
   * Specifies the default options that SvelteApplication supports.
   *
   * @returns {SvelteApplicationOptions} options - Application options.
   * @see https://foundryvtt.com/api/interfaces/client.ApplicationOptions.html
   */
  static get defaultOptions() {
    return deepMerge(super.defaultOptions, {
      defaultCloseAnimation: true,
      // If false the default slide close animation is not run.
      draggable: true,
      // If true then application shells are draggable.
      focusAuto: true,
      // When true auto-management of app focus is enabled.
      focusKeep: false,
      // When `focusAuto` and `focusKeep` is true; keeps internal focus.
      focusSource: void 0,
      // Stores any A11yFocusSource data that is applied when app is closed.
      focusTrap: true,
      // When true focus trapping / wrapping is enabled keeping focus inside app.
      headerButtonNoClose: false,
      // If true then the close header button is removed.
      headerButtonNoLabel: false,
      // If true then header button labels are removed for application shells.
      headerIcon: void 0,
      // Sets a header icon given an image URL.
      headerNoTitleMinimized: false,
      // If true then header title is hidden when application is minimized.
      minHeight: MIN_WINDOW_HEIGHT,
      // Assigned to position. Number specifying minimum window height.
      minWidth: MIN_WINDOW_WIDTH,
      // Assigned to position. Number specifying minimum window width.
      positionable: true,
      // If false then `position.set` does not take effect.
      positionInitial: Position.Initial.browserCentered,
      // A helper for initial position placement.
      positionOrtho: true,
      // When true Position is optimized for orthographic use.
      positionValidator: Position.Validators.transformWindow,
      // A function providing the default validator.
      sessionStorage: void 0,
      // An instance of SessionStorage to share across SvelteApplications.
      svelte: void 0,
      // A Svelte configuration object.
      transformOrigin: "top left"
      // By default, 'top / left' respects rotation when minimizing.
    });
  }
  /**
   * Returns the content element if an application shell is mounted.
   *
   * @returns {HTMLElement} Content element.
   */
  get elementContent() {
    return __privateGet(this, _elementContent);
  }
  /**
   * Returns the target element or main element if no target defined.
   *
   * @returns {HTMLElement} Target element.
   */
  get elementTarget() {
    return __privateGet(this, _elementTarget);
  }
  /**
   * Returns the reactive accessors & Svelte stores for SvelteApplication.
   *
   * @returns {SvelteReactive} The reactive accessors & Svelte stores.
   */
  get reactive() {
    return __privateGet(this, _reactive);
  }
  /**
   * Returns the application state manager.
   *
   * @returns {ApplicationState} The application state manager.
   */
  get state() {
    return __privateGet(this, _applicationState);
  }
  /**
   * Returns the Svelte helper class w/ various methods to access mounted Svelte components.
   *
   * @returns {GetSvelteData} GetSvelteData
   */
  get svelte() {
    return __privateGet(this, _getSvelteData);
  }
  /**
   * In this case of when a template is defined in app options `html` references the inner HTML / template. However,
   * to activate classic v1 tabs for a Svelte component the element target is passed as an array simulating JQuery as
   * the element is retrieved immediately and the core listeners use standard DOM queries.
   *
   * @inheritDoc
   * @protected
   * @ignore
   */
  _activateCoreListeners(html) {
    super._activateCoreListeners(typeof this.options.template === "string" ? html : [__privateGet(this, _elementTarget)]);
  }
  /**
   * Provide an override to set this application as the active window regardless of z-index. Changes behaviour from
   * Foundry core. This is important / used for instance in dialog key handling for left / right button selection.
   *
   * @param {object} [opts] - Optional parameters.
   *
   * @param {boolean} [opts.force=false] - Force bring to top; will increment z-index by popOut order.
   *
   */
  bringToTop({ force = false } = {}) {
    if (force || this.popOut) {
      super.bringToTop();
    }
    if (document.activeElement !== document.body && !this.elementTarget.contains(document.activeElement)) {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      document.body.focus();
    }
    globalThis.ui.activeWindow = this;
  }
  /**
   * Note: This method is fully overridden and duplicated as Svelte components need to be destroyed manually and the
   * best visual result is to destroy them after the default slide up animation occurs, but before the element
   * is removed from the DOM.
   *
   * If you destroy the Svelte components before the slide up animation the Svelte elements are removed immediately
   * from the DOM. The purpose of overriding ensures the slide up animation is always completed before
   * the Svelte components are destroyed and then the element is removed from the DOM.
   *
   * Close the application and un-register references to it within UI mappings.
   * This function returns a Promise which resolves once the window closing animation concludes
   *
   * @param {object}   [options] - Optional parameters.
   *
   * @param {boolean}  [options.force] - Force close regardless of render state.
   *
   * @returns {Promise<void>}    A Promise which resolves once the application is closed.
   * @ignore
   */
  async close(options = {}) {
    const states = Application.RENDER_STATES;
    if (!options.force && ![states.RENDERED, states.ERROR].includes(this._state)) {
      return;
    }
    __privateGet(this, _stores2).unsubscribe();
    this._state = states.CLOSING;
    const el = __privateGet(this, _elementTarget);
    if (!el) {
      return this._state = states.CLOSED;
    }
    const content = el.querySelector(".window-content");
    if (content) {
      content.style.overflow = "hidden";
      for (let cntr = content.children.length; --cntr >= 0; ) {
        content.children[cntr].style.overflow = "hidden";
      }
    }
    for (const cls of this.constructor._getInheritanceChain()) {
      Hooks.call(`close${cls.name}`, this, el);
    }
    const animate = typeof this.options.defaultCloseAnimation === "boolean" ? this.options.defaultCloseAnimation : true;
    if (animate) {
      el.style.minHeight = "0";
      const { paddingBottom, paddingTop } = globalThis.getComputedStyle(el);
      await el.animate([
        { maxHeight: `${el.clientHeight}px`, paddingTop, paddingBottom },
        { maxHeight: 0, paddingTop: 0, paddingBottom: 0 }
      ], { duration: 250, easing: "ease-in", fill: "forwards" }).finished;
    }
    const svelteDestroyPromises = [];
    for (const entry of __privateGet(this, _svelteData2)) {
      svelteDestroyPromises.push(outroAndDestroy(entry.component));
      const eventbus = entry.config.eventbus;
      if (isObject(eventbus) && typeof eventbus.off === "function") {
        eventbus.off();
        entry.config.eventbus = void 0;
      }
    }
    await Promise.all(svelteDestroyPromises);
    __privateGet(this, _svelteData2).length = 0;
    el.remove();
    this.position.state.restore({
      name: "#beforeMinimized",
      properties: ["width", "height"],
      silent: true,
      remove: true
    });
    __privateGet(this, _applicationShellHolder2)[0] = null;
    this._element = null;
    __privateSet(this, _elementContent, null);
    __privateSet(this, _elementTarget, null);
    delete globalThis.ui.windows[this.appId];
    this._minimized = false;
    this._scrollPositions = null;
    this._state = states.CLOSED;
    __privateSet(this, _onMount, false);
    __privateGet(this, _stores2).uiOptionsUpdate((storeOptions) => deepMerge(storeOptions, { minimized: this._minimized }));
    A11yHelper.applyFocusSource(this.options.focusSource);
    delete this.options.focusSource;
  }
  /**
   * Inject the Svelte components defined in `this.options.svelte`. The Svelte component can attach to the existing
   * pop-out of Application or provide no template and render into a document fragment which is then attached to the
   * DOM.
   *
   * @param {JQuery} html -
   *
   * @inheritDoc
   * @ignore
   */
  _injectHTML(html) {
    var _a, _b, _c, _d;
    if (this.popOut && html.length === 0 && Array.isArray(this.options.svelte)) {
      throw new Error(
        "SvelteApplication - _injectHTML - A popout app with no template can only support one Svelte component."
      );
    }
    this.reactive.updateHeaderButtons();
    const elementRootUpdate = () => {
      let cntr = 0;
      return (elementRoot) => {
        if (elementRoot !== null && elementRoot !== void 0 && cntr++ > 0) {
          __privateMethod(this, _updateApplicationShell, updateApplicationShell_fn).call(this);
          return true;
        }
        return false;
      };
    };
    if (Array.isArray(this.options.svelte)) {
      for (const svelteConfig of this.options.svelte) {
        const svelteData = loadSvelteConfig({
          app: this,
          template: html[0],
          config: svelteConfig,
          elementRootUpdate
        });
        if (isApplicationShell(svelteData.component)) {
          if (this.svelte.applicationShell !== null) {
            throw new Error(
              `SvelteApplication - _injectHTML - An application shell is already mounted; offending config:
                    ${JSON.stringify(svelteConfig)}`
            );
          }
          __privateGet(this, _applicationShellHolder2)[0] = svelteData.component;
          if (isHMRProxy(svelteData.component) && Array.isArray((_b = (_a = svelteData.component) == null ? void 0 : _a.$$) == null ? void 0 : _b.on_hmr)) {
            svelteData.component.$$.on_hmr.push(() => () => __privateMethod(this, _updateApplicationShell, updateApplicationShell_fn).call(this));
          }
        }
        __privateGet(this, _svelteData2).push(svelteData);
      }
    } else if (isObject(this.options.svelte)) {
      const svelteData = loadSvelteConfig({
        app: this,
        template: html[0],
        config: this.options.svelte,
        elementRootUpdate
      });
      if (isApplicationShell(svelteData.component)) {
        if (this.svelte.applicationShell !== null) {
          throw new Error(
            `SvelteApplication - _injectHTML - An application shell is already mounted; offending config:
                 ${JSON.stringify(this.options.svelte)}`
          );
        }
        __privateGet(this, _applicationShellHolder2)[0] = svelteData.component;
        if (isHMRProxy(svelteData.component) && Array.isArray((_d = (_c = svelteData.component) == null ? void 0 : _c.$$) == null ? void 0 : _d.on_hmr)) {
          svelteData.component.$$.on_hmr.push(() => () => __privateMethod(this, _updateApplicationShell, updateApplicationShell_fn).call(this));
        }
      }
      __privateGet(this, _svelteData2).push(svelteData);
    }
    const isDocumentFragment = html.length && html[0] instanceof DocumentFragment;
    let injectHTML = true;
    for (const svelteData of __privateGet(this, _svelteData2)) {
      if (!svelteData.injectHTML) {
        injectHTML = false;
        break;
      }
    }
    if (injectHTML) {
      super._injectHTML(html);
    }
    if (this.svelte.applicationShell !== null) {
      this._element = $(this.svelte.applicationShell.elementRoot);
      __privateSet(this, _elementContent, hasGetter(this.svelte.applicationShell, "elementContent") ? this.svelte.applicationShell.elementContent : null);
      __privateSet(this, _elementTarget, hasGetter(this.svelte.applicationShell, "elementTarget") ? this.svelte.applicationShell.elementTarget : null);
    } else if (isDocumentFragment) {
      for (const svelteData of __privateGet(this, _svelteData2)) {
        if (svelteData.element instanceof HTMLElement) {
          this._element = $(svelteData.element);
          break;
        }
      }
    }
    if (__privateGet(this, _elementTarget) === null) {
      __privateSet(this, _elementTarget, typeof this.options.selectorTarget === "string" ? this._element[0].querySelector(this.options.selectorTarget) : this._element[0]);
    }
    if (__privateGet(this, _elementTarget) === null || __privateGet(this, _elementTarget) === void 0) {
      throw new Error(`SvelteApplication - _injectHTML: Target element '${this.options.selectorTarget}' not found.`);
    }
    if (typeof this.options.positionable === "boolean" && this.options.positionable) {
      __privateGet(this, _elementTarget).style.zIndex = typeof this.options.zIndex === "number" ? this.options.zIndex : __privateGet(this, _initialZIndex) ?? 95;
    }
    __privateGet(this, _stores2).subscribe();
  }
  /**
   * Provides a mechanism to update the UI options store for maximized.
   *
   * Note: the sanity check is duplicated from {@link Application.maximize} the store is updated _before_
   * performing the rest of animations. This allows application shells to remove / show any resize handlers
   * correctly. Extra constraint data is stored in a saved position state in {@link SvelteApplication.minimize}
   * to animate the content area.
   *
   * @param {object}   [opts] - Optional parameters.
   *
   * @param {boolean}  [opts.animate=true] - When true perform default maximizing animation.
   *
   * @param {number}   [opts.duration=0.1] - Controls content area animation duration in seconds.
   */
  async maximize({ animate = true, duration = 0.1 } = {}) {
    var _a, _b;
    if (!this.popOut || [false, null].includes(this._minimized)) {
      return;
    }
    this._minimized = null;
    const durationMS = duration * 1e3;
    const element = this.elementTarget;
    const header = element.querySelector(".window-header");
    const content = element.querySelector(".window-content");
    const positionBefore = this.position.state.get({ name: "#beforeMinimized" });
    if (animate) {
      await this.position.state.restore({
        name: "#beforeMinimized",
        async: true,
        animateTo: true,
        properties: ["width"],
        duration: 0.1
      });
    }
    element.classList.remove("minimized");
    for (let cntr = header.children.length; --cntr >= 0; ) {
      header.children[cntr].style.display = null;
    }
    content.style.display = null;
    let constraints;
    if (animate) {
      ({ constraints } = this.position.state.restore({
        name: "#beforeMinimized",
        animateTo: true,
        properties: ["height"],
        remove: true,
        duration
      }));
    } else {
      ({ constraints } = this.position.state.remove({ name: "#beforeMinimized" }));
    }
    await content.animate([
      { maxHeight: 0, paddingTop: 0, paddingBottom: 0, offset: 0 },
      { ...constraints, offset: 1 },
      { maxHeight: "100%", offset: 1 }
    ], { duration: durationMS, fill: "forwards" }).finished;
    this.position.set({
      minHeight: positionBefore.minHeight ?? ((_a = this.options) == null ? void 0 : _a.minHeight) ?? MIN_WINDOW_HEIGHT,
      minWidth: positionBefore.minWidth ?? ((_b = this.options) == null ? void 0 : _b.minWidth) ?? MIN_WINDOW_WIDTH
    });
    element.style.minWidth = null;
    element.style.minHeight = null;
    this._minimized = false;
    setTimeout(() => {
      content.style.overflow = null;
      for (let cntr = content.children.length; --cntr >= 0; ) {
        content.children[cntr].style.overflow = null;
      }
    }, 50);
    __privateGet(this, _stores2).uiOptionsUpdate((options) => deepMerge(options, { minimized: false }));
  }
  /**
   * Provides a mechanism to update the UI options store for minimized.
   *
   * Note: the sanity check is duplicated from {@link Application.minimize} the store is updated _before_
   * performing the rest of animations. This allows application shells to remove / show any resize handlers
   * correctly. Extra constraint data is stored in a saved position state in {@link SvelteApplication.minimize}
   * to animate the content area.
   *
   * @param {object}   [opts] - Optional parameters
   *
   * @param {boolean}  [opts.animate=true] - When true perform default minimizing animation.
   *
   * @param {number}   [opts.duration=0.1] - Controls content area animation duration in seconds.
   */
  async minimize({ animate = true, duration = 0.1 } = {}) {
    if (!this.rendered || !this.popOut || [true, null].includes(this._minimized)) {
      return;
    }
    __privateGet(this, _stores2).uiOptionsUpdate((options) => deepMerge(options, { minimized: true }));
    this._minimized = null;
    const durationMS = duration * 1e3;
    const element = this.elementTarget;
    const header = element.querySelector(".window-header");
    const content = element.querySelector(".window-content");
    const beforeMinWidth = this.position.minWidth;
    const beforeMinHeight = this.position.minHeight;
    this.position.set({ minWidth: 100, minHeight: 30 });
    element.style.minWidth = "100px";
    element.style.minHeight = "30px";
    if (content) {
      content.style.overflow = "hidden";
      for (let cntr = content.children.length; --cntr >= 0; ) {
        content.children[cntr].style.overflow = "hidden";
      }
    }
    const { paddingBottom, paddingTop } = globalThis.getComputedStyle(content);
    const constraints = {
      maxHeight: `${content.clientHeight}px`,
      paddingTop,
      paddingBottom
    };
    if (animate) {
      const animation = content.animate([
        constraints,
        { maxHeight: 0, paddingTop: 0, paddingBottom: 0 }
      ], { duration: durationMS, fill: "forwards" });
      animation.finished.then(() => content.style.display = "none");
    } else {
      setTimeout(() => content.style.display = "none", durationMS);
    }
    const saved = this.position.state.save({ name: "#beforeMinimized", constraints });
    saved.minWidth = beforeMinWidth;
    saved.minHeight = beforeMinHeight;
    const headerOffsetHeight = header.offsetHeight;
    this.position.minHeight = headerOffsetHeight;
    if (animate) {
      await this.position.animate.to({ height: headerOffsetHeight }, { duration }).finished;
    }
    for (let cntr = header.children.length; --cntr >= 0; ) {
      const className = header.children[cntr].className;
      if (className.includes("window-title") || className.includes("close")) {
        continue;
      }
      if (className.includes("keep-minimized")) {
        header.children[cntr].style.display = "block";
        continue;
      }
      header.children[cntr].style.display = "none";
    }
    if (animate) {
      await this.position.animate.to({ width: MIN_WINDOW_WIDTH }, { duration: 0.1 }).finished;
    }
    element.classList.add("minimized");
    this._minimized = true;
  }
  /**
   * Provides a callback after all Svelte components are initialized.
   *
   * @param {object}      [opts] - Optional parameters.
   *
   * @param {HTMLElement} [opts.element] - HTMLElement container for main application element.
   *
   * @param {HTMLElement} [opts.elementContent] - HTMLElement container for content area of application shells.
   *
   * @param {HTMLElement} [opts.elementTarget] - HTMLElement container for main application target element.
   */
  onSvelteMount({ element, elementContent, elementTarget } = {}) {
  }
  // eslint-disable-line no-unused-vars
  /**
   * Provides a callback after the main application shell is remounted. This may occur during HMR / hot module
   * replacement or directly invoked from the `elementRootUpdate` callback passed to the application shell component
   * context.
   *
   * @param {object}      [opts] - Optional parameters.
   *
   * @param {HTMLElement} [opts.element] - HTMLElement container for main application element.
   *
   * @param {HTMLElement} [opts.elementContent] - HTMLElement container for content area of application shells.
   *
   * @param {HTMLElement} [opts.elementTarget] - HTMLElement container for main application target element.
   */
  onSvelteRemount({ element, elementContent, elementTarget } = {}) {
  }
  // eslint-disable-line no-unused-vars
  /**
   * Override replacing HTML as Svelte components control the rendering process. Only potentially change the outer
   * application frame / title for pop-out applications.
   *
   * @inheritDoc
   * @ignore
   */
  _replaceHTML(element, html) {
    if (!element.length) {
      return;
    }
    this.reactive.updateHeaderButtons();
  }
  /**
   * Provides an override verifying that a new Application being rendered for the first time doesn't have a
   * corresponding DOM element already loaded. This is a check that only occurs when `this._state` is
   * `Application.RENDER_STATES.NONE`. It is useful in particular when SvelteApplication has a static ID
   * explicitly set in `this.options.id` and long intro / outro transitions are assigned. If a new application
   * sharing this static ID attempts to open / render for the first time while an existing DOM element sharing
   * this static ID exists then the initial render is cancelled below rather than crashing later in the render
   * cycle {@link Position.set}.
   *
   * @inheritDoc
   * @protected
   * @ignore
   */
  async _render(force = false, options = {}) {
    if (isObject(options == null ? void 0 : options.focusSource)) {
      this.options.focusSource = options.focusSource;
    }
    if (this._state === Application.RENDER_STATES.NONE && document.querySelector(`#${this.id}`) instanceof HTMLElement) {
      console.warn(`SvelteApplication - _render: A DOM element already exists for CSS ID '${this.id}'. Cancelling initial render for new application with appId '${this.appId}'.`);
      return;
    }
    await super._render(force, options);
    if (!__privateGet(this, _onMount)) {
      this.onSvelteMount({ element: this._element[0], elementContent: __privateGet(this, _elementContent), elementTarget: __privateGet(this, _elementTarget) });
      __privateSet(this, _onMount, true);
    }
  }
  /**
   * Render the inner application content. Only render a template if one is defined otherwise provide an empty
   * JQuery element per the core Foundry API.
   *
   * @param {object} data         The data used to render the inner template
   *
   * @returns {Promise.<JQuery>}   A promise resolving to the constructed jQuery object
   *
   * @protected
   * @ignore
   */
  async _renderInner(data) {
    const html = typeof this.template === "string" ? await renderTemplate(this.template, data) : document.createDocumentFragment();
    return $(html);
  }
  /**
   * Stores the initial z-index set in `_renderOuter` which is used in `_injectHTML` to set the target element
   * z-index after the Svelte component is mounted.
   *
   * @returns {Promise<JQuery>} Outer frame / unused.
   * @protected
   * @ignore
   */
  async _renderOuter() {
    const html = await super._renderOuter();
    __privateSet(this, _initialZIndex, html[0].style.zIndex);
    return html;
  }
  /**
   * All calculation and updates of position are implemented in {@link Position.set}. This allows position to be fully
   * reactive and in control of updating inline styles for the application.
   *
   * This method remains for backward compatibility with Foundry. If you have a custom override quite likely you need
   * to update to using the {@link Position.validators} functionality.
   *
   * @param {PositionDataExtended}   [position] - Position data.
   *
   * @returns {Position} The updated position object for the application containing the new values
   */
  setPosition(position) {
    return this.position.set(position);
  }
};
var SvelteApplication = _SvelteApplication;
_applicationShellHolder2 = new WeakMap();
_applicationState = new WeakMap();
_elementTarget = new WeakMap();
_elementContent = new WeakMap();
_initialZIndex = new WeakMap();
_onMount = new WeakMap();
_position3 = new WeakMap();
_reactive = new WeakMap();
_svelteData2 = new WeakMap();
_getSvelteData = new WeakMap();
_stores2 = new WeakMap();
_updateApplicationShell = new WeakSet();
updateApplicationShell_fn = function() {
  const applicationShell = this.svelte.applicationShell;
  if (applicationShell !== null) {
    this._element = $(applicationShell.elementRoot);
    __privateSet(this, _elementContent, hasGetter(applicationShell, "elementContent") ? applicationShell.elementContent : null);
    __privateSet(this, _elementTarget, hasGetter(applicationShell, "elementTarget") ? applicationShell.elementTarget : null);
    if (__privateGet(this, _elementTarget) === null) {
      __privateSet(this, _elementTarget, typeof this.options.selectorTarget === "string" ? this._element[0].querySelector(this.options.selectorTarget) : this._element[0]);
    }
    if (typeof this.options.positionable === "boolean" && this.options.positionable) {
      __privateGet(this, _elementTarget).style.zIndex = typeof this.options.zIndex === "number" ? this.options.zIndex : __privateGet(this, _initialZIndex) ?? 95;
      __superGet(_SvelteApplication.prototype, this, "bringToTop").call(this);
      this.position.set(this.position.get());
    }
    __superGet(_SvelteApplication.prototype, this, "_activateCoreListeners").call(this, [__privateGet(this, _elementTarget)]);
    this.onSvelteRemount({ element: this._element[0], elementContent: __privateGet(this, _elementContent), elementTarget: __privateGet(this, _elementTarget) });
  }
};

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/internal/TJSDialogData.js
var _application3;
var TJSDialogData = class {
  /**
   * @param {SvelteApplication} application - The host Foundry application.
   */
  constructor(application) {
    /**
     * @type {SvelteApplication}
     */
    __privateAdd(this, _application3, void 0);
    /**
     * Provides configuration of the dialog button bar.
     *
     * @type {Record<string, TJSDialogButtonData>}
     */
    __publicField(this, "buttons");
    /**
     * A Svelte configuration object or HTML string content.
     *
     * @type {object|string}
     */
    __publicField(this, "content");
    /**
     * The default button ID to focus initially.
     *
     * @type {string}
     */
    __publicField(this, "default");
    /**
     * The dialog is draggable when true.
     *
     * @type {boolean}
     */
    __publicField(this, "draggable");
    /**
     * When true auto-management of app focus is enabled.
     *
     * @type {boolean}
     */
    __publicField(this, "focusAuto");
    /**
     * When true the first focusable element that isn't a button is focused.
     *
     * @type {boolean}
     */
    __publicField(this, "focusFirst");
    /**
     * When `focusAuto` and `focusKeep` is true; keeps internal focus.
     *
     * @type {boolean}
     */
    __publicField(this, "focusKeep");
    /**
     * When true the dialog is minimizable.
     *
     * @type {boolean}
     */
    __publicField(this, "minimizable");
    /**
     * When true a modal dialog is displayed.
     *
     * @type {boolean}
     */
    __publicField(this, "modal");
    /**
     * Additional options for modal dialog display.
     *
     * @type {object}
     * TODO: Better specify type / options.
     */
    __publicField(this, "modalOptions");
    /**
     * When true and an error is raised in dialog callback functions post a UI error notification.
     *
     * @type {boolean}
     */
    __publicField(this, "notifyError");
    /**
     * Callback invoked when dialog is closed; no button option selected. When defined as a string any matching function
     * by name exported from content Svelte component is invoked.
     *
     * @type {string|((application: TJSDialog) => any)}
     */
    __publicField(this, "onClose");
    /**
     * When true and a Promise has been created by {@link TJSDialog.wait} and the Promise is not in the process of being
     * resolved or rejected on close of the dialog any `onClose` function is invoked and any result that is undefined
     * will cause the Promise to then be rejected.
     *
     * @type {boolean}
     */
    __publicField(this, "rejectClose");
    /**
     * When true the dialog is resizable.
     *
     * @type {boolean}
     */
    __publicField(this, "resizable");
    /**
     * When true and resolving any Promises and there are undefined results from any button callbacks the button ID is
     * resolved.
     *
     * @type {boolean}
     */
    __publicField(this, "resolveId");
    /**
     * The dialog window title.
     *
     * @type {string}
     */
    __publicField(this, "title");
    /**
     * Transition options for the dialog.
     *
     * @type {object}
     * TODO: Better specify type / options.
     */
    __publicField(this, "transition");
    /**
     * A specific z-index for the dialog. Pass null for the dialog to act like other applications in regard bringing to
     * top when activated.
     *
     * @type {number|null}
     */
    __publicField(this, "zIndex");
    __privateSet(this, _application3, application);
  }
  /**
   * Provides a way to safely get this dialogs data given an accessor string which describes the
   * entries to walk. To access deeper entries into the object format the accessor string with `.` between entries
   * to walk.
   *
   * // TODO DOCUMENT the accessor in more detail.
   *
   * @param {string}   accessor - The path / key to set. You can set multiple levels.
   *
   * @param {*}        [defaultValue] - A default value returned if the accessor is not found.
   *
   * @returns {*} Value at the accessor.
   */
  get(accessor, defaultValue) {
    return safeAccess(this, accessor, defaultValue);
  }
  /**
   * @param {object} data - Merge provided data object into Dialog data.
   */
  merge(data) {
    deepMerge(this, data);
    const component = __privateGet(this, _application3).svelte.component(0);
    if (component == null ? void 0 : component.data) {
      component.data = this;
    }
  }
  /**
   * Provides a way to safely set this dialogs data given an accessor string which describes the
   * entries to walk. To access deeper entries into the object format the accessor string with `.` between entries
   * to walk.
   *
   * Automatically the dialog data will be updated in the associated DialogShell Svelte component.
   *
   * // TODO DOCUMENT the accessor in more detail.
   *
   * @param {string}   accessor - The path / key to set. You can set multiple levels.
   *
   * @param {*}        value - Value to set.
   *
   * @returns {boolean} True if successful.
   */
  set(accessor, value) {
    const success = safeSet(this, accessor, value);
    if (success) {
      const component = __privateGet(this, _application3).svelte.component(0);
      if (component == null ? void 0 : component.data) {
        component.data = this;
      }
    }
    return success;
  }
};
_application3 = new WeakMap();

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/TJSDialog.js
var _data4, _managedPromise, _invokeFn, invokeFn_fn;
var _TJSDialog = class extends SvelteApplication {
  /**
   * @param {TJSDialogOptions}           data - Dialog options.
   *
   * @param {SvelteApplicationOptions}   [options] - SvelteApplication options.
   */
  constructor(data, options = {}) {
    super(options);
    /** @type {TJSDialogData} */
    __privateAdd(this, _data4, void 0);
    /** @type {ManagedPromise} */
    __privateAdd(this, _managedPromise, void 0);
    __privateSet(this, _managedPromise, new ManagedPromise());
    __privateSet(this, _data4, new TJSDialogData(this));
    this.data = data;
    Object.defineProperty(this.svelte, "dialogComponent", {
      get: () => {
        var _a, _b;
        return (_b = (_a = this.svelte) == null ? void 0 : _a.applicationShell) == null ? void 0 : _b.dialogComponent;
      }
    });
  }
  /**
   * Default options for TJSDialog. Provides a default width and setting `height` to `auto` to always display dialog
   * content even if it changes. The default `DialogShell` / `svelte` options should not be changed and instead mount
   * the dialog content component by supplying a Svelte configuration object to dialog data `content` field.
   *
   * @returns {SvelteApplicationOptions} Default options
   */
  static get defaultOptions() {
    return deepMerge(super.defaultOptions, {
      classes: ["dialog"],
      width: 400,
      height: "auto",
      svelte: {
        class: DialogShell_default,
        intro: true,
        target: document.body,
        props: function() {
          return {
            data: __privateGet(this, _data4),
            managedPromise: __privateGet(this, _managedPromise)
          };
        }
      }
    });
  }
  /**
   * Returns the dialog data.
   *
   * @returns {TJSDialogData} Dialog data.
   */
  get data() {
    return __privateGet(this, _data4);
  }
  /**
   * @returns {ManagedPromise} Returns the managed promise.
   */
  get managedPromise() {
    return __privateGet(this, _managedPromise);
  }
  /**
   * Sets the dialog data; this is reactive.
   *
   * @param {object}   data - Dialog data.
   */
  set data(data) {
    if (!isObject(data)) {
      throw new TypeError(`TJSDialog set data error: 'data' is not an object'.`);
    }
    const descriptors = Object.getOwnPropertyDescriptors(__privateGet(this, _data4));
    for (const descriptor in descriptors) {
      if (descriptors[descriptor].configurable) {
        delete __privateGet(this, _data4)[descriptor];
      }
    }
    __privateGet(this, _data4).merge(data);
  }
  /**
   * Close the dialog and un-register references to it within UI mappings.
   * This function returns a Promise which resolves once the window closing animation concludes.
   *
   * @param {object}   [options] - Optional parameters.
   *
   * @param {boolean}  [options.force] - Force close regardless of render state.
   *
   * @returns {Promise<void>} A Promise which resolves once the application is closed with the callback value or
   *                          `true`.
   */
  async close(options) {
    var _a;
    try {
      if (__privateGet(this, _managedPromise).isActive && !__privateGet(this, _managedPromise).isProcessing) {
        const result = __privateMethod(_a = _TJSDialog, _invokeFn, invokeFn_fn).call(_a, __privateGet(this, _data4).onClose, this, null);
        const rejectClose = typeof __privateGet(this, _data4).rejectClose === "boolean" ? __privateGet(this, _data4).rejectClose : false;
        if (rejectClose && result === null) {
          __privateGet(this, _managedPromise).reject(new Error("TJSDialog was closed without a choice being made."));
        } else {
          __privateGet(this, _managedPromise).resolve(result);
        }
      }
    } catch (err) {
      const notifyError = typeof __privateGet(this, _data4).notifyError === "boolean" ? __privateGet(this, _data4).notifyError : true;
      if (notifyError) {
        globalThis.ui.notifications.error(err, { console: false });
      }
      if (!__privateGet(this, _managedPromise).reject(err)) {
        throw err;
      }
    } finally {
      await super.close(options);
    }
  }
  /**
   * Brings to top or renders this dialog returning a Promise that is resolved any button pressed or when the dialog
   * is closed.
   *
   * Creates an anonymous data defined TJSDialog returning a Promise that can be awaited upon for the user to make a
   * choice.
   *
   * Note: `null` is returned if the dialog is closed without a user making a choice.
   *
   * @template T
   *
   * @param {object}   [options] - Options.
   *
   * @param {boolean}  [options.reuse=false] - When true if there is an existing managed Promise this allows multiple
   *        sources to await on the same result.
   *
   * @returns {Promise<T>} A promise for dialog resolution.
   */
  async wait(options) {
    if (this.rendered) {
      this.bringToTop();
    } else {
      this.render(true, { focus: true });
    }
    return __privateGet(this, _managedPromise).create(options);
  }
  // ---------------------------------------------------------------------------------------------------------------
  /**
   * A helper factory method to create simple confirmation dialog windows which consist of simple yes / no prompts.
   * If you require more flexibility, a custom TJSDialog instance is preferred. The default focused button is 'yes'.
   * You can change the default focused button by setting `default` to `yes` or `no`.
   *
   * @template T
   *
   * @param {TJSDialogOptions} data - Confirm dialog options.
   *
   * @param {string|((application: TJSDialog) => any)} [data.onYes] - Callback function upon `yes`; may be an async
   *        function. When defined as a string any matching function by name exported from content Svelte component is
   *        invoked.
   *
   * @param {string|((application: TJSDialog) => any)} [data.onNo] - Callback function upon `no`; may be an async
   *        function. When defined as a string any matching function by name exported from content Svelte component is
   *        invoked.
   *
   * @param {SvelteApplicationOptions}  [options]  SvelteApplication options passed to the TJSDialog constructor.
   *
   * @returns {Promise<T>} A promise which resolves with result of yes / no callbacks or true / false.
   *
   * @example
   * const result = await TJSDialog.confirm({
   *  title: 'A Yes or No Question',
   *  content: '<p>Choose wisely.</p>',
   *  onYes: () => 'YES Result'
   *  onNo: () => 'NO Result'
   * });
   *
   * // Logs 'YES result', 'NO Result', or null if the user closed the dialog without making a selection.
   * console.log(result);
   */
  static async confirm({ onYes, onNo, ...data } = {}, options = {}) {
    const mergedButtons = deepMerge({
      yes: {
        icon: "fas fa-check",
        label: "Yes"
      },
      no: {
        icon: "fas fa-times",
        label: "No"
      }
    }, data.buttons ?? {});
    return this.wait({
      ...data,
      buttons: deepMerge(mergedButtons, {
        yes: {
          onPress: (application) => __privateMethod(this, _invokeFn, invokeFn_fn).call(this, onYes, application, true)
        },
        no: {
          onPress: (application) => __privateMethod(this, _invokeFn, invokeFn_fn).call(this, onNo, application, false)
        }
      }),
      default: data.default ?? "yes"
    }, options);
  }
  /**
   * A helper factory method to display a basic "prompt" style TJSDialog with a single button.
   *
   * @template T
   *
   * @param {TJSDialogOptions} [data] - Prompt dialog options.
   *
   * @param {string|((application: TJSDialog) => any)} [data.onOk] - Callback function upon `ok`; may be an async
   *        function. When defined as a string any matching function by name exported from content Svelte component is
   *        invoked.
   *
   * @param {string}   [data.label] - The OK prompt button text.
   *
   * @param {string}   [data.icon="fas fa-check"] - Set another icon besides `fas fa-check` for button.
   *
   * @param {SvelteApplicationOptions}  [options]  SvelteApplication options passed to the TJSDialog constructor.
   *
   * @returns {Promise<T>} The returned value from the provided callback function or `true` if the button
   *          is pressed.
   *
   * @example
   * const result = await TJSDialog.prompt({
   *  title: 'Are you OK?',
   *  content: '<p>Are you OK?.</p>',
   *  label: 'Feeling Fine!'
   *  onOk: () => 'OK'
   * });
   *
   * // Logs 'OK' or null if the user closed the dialog without making a selection.
   * console.log(result);
   */
  static async prompt({ onOk, label, icon = "fas fa-check", ...data } = {}, options = {}) {
    return this.wait({
      ...data,
      buttons: {
        ok: {
          icon,
          label,
          onPress: (application) => __privateMethod(this, _invokeFn, invokeFn_fn).call(this, onOk, application, true)
        }
      },
      default: "ok"
    }, options);
  }
  /**
   * Creates an anonymous data defined TJSDialog returning a Promise that can be awaited upon for the user to make a
   * choice.
   *
   * Note: By default `null` is returned if the dialog is closed without a user making a choice.
   *
   * @template T
   *
   * @param {TJSDialogOptions}  data - Dialog data passed to the TJSDialog constructor.
   *
   * @param {SvelteApplicationOptions}  [options]  SvelteApplication options passed to the TJSDialog constructor.
   *
   * @returns {Promise<T>} A Promise that resolves to the chosen result.
   */
  static async wait(data, options = {}) {
    if (!isObject(data)) {
      throw new TypeError(`TJSDialog.wait error: 'data' is not an object'.`);
    }
    return new this({ ...data }, options).wait();
  }
};
var TJSDialog = _TJSDialog;
_data4 = new WeakMap();
_managedPromise = new WeakMap();
_invokeFn = new WeakSet();
invokeFn_fn = function(callback, application, defaultResult = void 0) {
  var _a;
  let result = defaultResult;
  switch (typeof callback) {
    case "function":
      result = callback(application);
      break;
    case "string": {
      const dialogComponent = (_a = application == null ? void 0 : application.svelte) == null ? void 0 : _a.dialogComponent;
      if (dialogComponent !== void 0 && typeof (dialogComponent == null ? void 0 : dialogComponent[callback]) === "function") {
        result = dialogComponent == null ? void 0 : dialogComponent[callback](application);
      } else {
        if (dialogComponent === void 0) {
          console.warn(`[TRL] TJSDialog warning: 'onPress' defined as a string with no associated content Svelte component.`);
        } else if (typeof (dialogComponent == null ? void 0 : dialogComponent[callback]) !== "function") {
          console.warn(`[TRL] TJSDialog warning: The content Svelte component does not contain an associated function '${callback}'. Did you remember to add '<svelte:options accessors={true} />' and export the function?`);
        }
      }
      break;
    }
  }
  return result;
};
/**
 * A helper method to invoke a callback function directly or lookup an exported function with the same name from any
 * content Svelte component to invoke. This is used internally to apply default values for `confirm` and `prompt`.
 *
 * @param {string|((application: TJSDialog) => any)} callback - Callback function to invoke; may be an async
 *        function. When defined as a string any matching function by name exported from content Svelte component is
 *        invoked.
 *
 * @param {TJSDialog} application - TJSDialog instance passed to callback.
 *
 * @param {*} [defaultResult] - An optional default result to return; undefined if not specified.
 *
 * @returns {*} Result.
 */
__privateAdd(TJSDialog, _invokeFn);

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/application/index.js
Hooks.on("PopOut:loading", (app) => {
  if (app instanceof SvelteApplication) {
    app.position.enabled = false;
  }
});
Hooks.on("PopOut:popin", (app) => {
  if (app instanceof SvelteApplication) {
    app.position.enabled = true;
  }
});
Hooks.on("PopOut:close", (app) => {
  if (app instanceof SvelteApplication) {
    app.position.enabled = true;
  }
});

export {
  Position,
  SvelteApplication,
  TJSDialog
};
//# sourceMappingURL=chunk-VDQ7QTS5.js.map
