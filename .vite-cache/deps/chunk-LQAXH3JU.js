import {
  derived,
  writable
} from "./chunk-4JE7W25I.js";
import {
  check_outros,
  get_store_value,
  group_outros,
  is_function,
  noop,
  run_all,
  transition_out
} from "./chunk-U7IU7IO7.js";
import {
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet,
  __publicField
} from "./chunk-7HFSXBDU.js";

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/util/index.js
var s_TAG_OBJECT = "[object Object]";
function deepMerge(target = {}, ...sourceObj) {
  if (Object.prototype.toString.call(target) !== s_TAG_OBJECT) {
    throw new TypeError(`deepMerge error: 'target' is not an 'object'.`);
  }
  for (let cntr = 0; cntr < sourceObj.length; cntr++) {
    if (Object.prototype.toString.call(sourceObj[cntr]) !== s_TAG_OBJECT) {
      throw new TypeError(`deepMerge error: 'sourceObj[${cntr}]' is not an 'object'.`);
    }
  }
  return _deepMerge(target, ...sourceObj);
}
function isIterable(value) {
  if (value === null || value === void 0 || typeof value !== "object") {
    return false;
  }
  return typeof value[Symbol.iterator] === "function";
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
function isPlainObject(value) {
  if (Object.prototype.toString.call(value) !== s_TAG_OBJECT) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}
function safeAccess(data, accessor, defaultValue = void 0) {
  if (typeof data !== "object") {
    return defaultValue;
  }
  if (typeof accessor !== "string") {
    return defaultValue;
  }
  const access = accessor.split(".");
  for (let cntr = 0; cntr < access.length; cntr++) {
    if (typeof data[access[cntr]] === "undefined" || data[access[cntr]] === null) {
      return defaultValue;
    }
    data = data[access[cntr]];
  }
  return data;
}
function safeSet(data, accessor, value, operation = "set", createMissing = true) {
  if (typeof data !== "object") {
    throw new TypeError(`safeSet Error: 'data' is not an 'object'.`);
  }
  if (typeof accessor !== "string") {
    throw new TypeError(`safeSet Error: 'accessor' is not a 'string'.`);
  }
  const access = accessor.split(".");
  for (let cntr = 0; cntr < access.length; cntr++) {
    if (Array.isArray(data)) {
      const number = +access[cntr];
      if (!Number.isInteger(number) || number < 0) {
        return false;
      }
    }
    if (cntr === access.length - 1) {
      switch (operation) {
        case "add":
          data[access[cntr]] += value;
          break;
        case "div":
          data[access[cntr]] /= value;
          break;
        case "mult":
          data[access[cntr]] *= value;
          break;
        case "set":
          data[access[cntr]] = value;
          break;
        case "set-undefined":
          if (typeof data[access[cntr]] === "undefined") {
            data[access[cntr]] = value;
          }
          break;
        case "sub":
          data[access[cntr]] -= value;
          break;
      }
    } else {
      if (createMissing && typeof data[access[cntr]] === "undefined") {
        data[access[cntr]] = {};
      }
      if (data[access[cntr]] === null || typeof data[access[cntr]] !== "object") {
        return false;
      }
      data = data[access[cntr]];
    }
  }
  return true;
}
function _deepMerge(target = {}, ...sourceObj) {
  var _a, _b;
  for (let cntr = 0; cntr < sourceObj.length; cntr++) {
    const obj = sourceObj[cntr];
    for (const prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        if (prop.startsWith("-=")) {
          delete target[prop.slice(2)];
          continue;
        }
        target[prop] = Object.prototype.hasOwnProperty.call(target, prop) && ((_a = target[prop]) == null ? void 0 : _a.constructor) === Object && ((_b = obj[prop]) == null ? void 0 : _b.constructor) === Object ? _deepMerge({}, target[prop], obj[prop]) : obj[prop];
      }
    }
  }
  return target;
}
var _getFocusableSelectors, getFocusableSelectors_fn;
var A11yHelper = class {
  /**
   * Apply focus to the HTMLElement targets in a given A11yFocusSource data object. An iterable list `options.focusEl`
   * can contain HTMLElements or selector strings. If multiple focus targets are provided in a list then the first
   * valid target found will be focused. If focus target is a string then a lookup via `document.querySelector` is
   * performed. In this case you should provide a unique selector for the desired focus target.
   *
   * Note: The body of this method is postponed to the next clock tick to allow any changes in the DOM to occur that
   * might alter focus targets before applying.
   *
   * @param {A11yFocusSource|{ focusSource: A11yFocusSource }}   options - The focus options instance to apply.
   */
  static applyFocusSource(options) {
    if (!isObject(options)) {
      return;
    }
    const focusOpts = isObject(options == null ? void 0 : options.focusSource) ? options.focusSource : options;
    setTimeout(() => {
      const debug = typeof focusOpts.debug === "boolean" ? focusOpts.debug : false;
      if (isIterable(focusOpts.focusEl)) {
        if (debug) {
          console.debug(`A11yHelper.applyFocusSource debug - Attempting to apply focus target: `, focusOpts.focusEl);
        }
        for (const target of focusOpts.focusEl) {
          if (target instanceof HTMLElement && target.isConnected) {
            target.focus();
            if (debug) {
              console.debug(`A11yHelper.applyFocusSource debug - Applied focus to target: `, target);
            }
            break;
          } else if (typeof target === "string") {
            const element = document.querySelector(target);
            if (element instanceof HTMLElement && element.isConnected) {
              element.focus();
              if (debug) {
                console.debug(`A11yHelper.applyFocusSource debug - Applied focus to target: `, element);
              }
              break;
            } else if (debug) {
              console.debug(`A11yHelper.applyFocusSource debug - Could not query selector: `, target);
            }
          }
        }
      } else if (debug) {
        console.debug(`A11yHelper.applyFocusSource debug - No focus targets defined.`);
      }
    }, 0);
  }
  /**
   * Returns first focusable element within a specified element.
   *
   * @param {HTMLElement|Document} [element=document] - Optional element to start query.
   *
   * @param {object} [options] - Optional parameters.
   *
   * @param {Iterable<string>} [options.ignoreClasses] - Iterable list of classes to ignore elements.
   *
   * @param {Set<HTMLElement>} [options.ignoreElements] - Set of elements to ignore.
   *
   * @returns {HTMLElement} First focusable child element
   */
  static getFirstFocusableElement(element = document, options) {
    const focusableElements = this.getFocusableElements(element, options);
    return focusableElements.length > 0 ? focusableElements[0] : void 0;
  }
  /**
   * Returns all focusable elements within a specified element.
   *
   * @param {HTMLElement|Document} [element=document] Optional element to start query.
   *
   * @param {object}            [options] - Optional parameters.
   *
   * @param {boolean}           [options.anchorHref=true] - When true anchors must have an HREF.
   *
   * @param {Iterable<string>}  [options.ignoreClasses] - Iterable list of classes to ignore elements.
   *
   * @param {Set<HTMLElement>}  [options.ignoreElements] - Set of elements to ignore.
   *
   * @param {string}            [options.selectors] - Custom list of focusable selectors for `querySelectorAll`.
   *
   * @returns {Array<HTMLElement>} Child keyboard focusable
   */
  static getFocusableElements(element = document, { anchorHref = true, ignoreClasses, ignoreElements, selectors } = {}) {
    if (!(element instanceof HTMLElement) && !(element instanceof Document)) {
      throw new TypeError(`'element' is not a HTMLElement or Document instance.`);
    }
    if (typeof anchorHref !== "boolean") {
      throw new TypeError(`'anchorHref' is not a boolean.`);
    }
    if (ignoreClasses !== void 0 && !isIterable(ignoreClasses)) {
      throw new TypeError(`'ignoreClasses' is not an iterable list.`);
    }
    if (ignoreElements !== void 0 && !(ignoreElements instanceof Set)) {
      throw new TypeError(`'ignoreElements' is not a Set.`);
    }
    if (selectors !== void 0 && typeof selectors !== "string") {
      throw new TypeError(`'selectors' is not a string.`);
    }
    const selectorQuery = selectors ?? __privateMethod(this, _getFocusableSelectors, getFocusableSelectors_fn).call(this, anchorHref);
    const allElements = [...element.querySelectorAll(selectorQuery)];
    if (ignoreElements && ignoreClasses) {
      return allElements.filter((el) => {
        let hasIgnoreClass = false;
        for (const ignoreClass of ignoreClasses) {
          if (el.classList.contains(ignoreClass)) {
            hasIgnoreClass = true;
            break;
          }
        }
        return !hasIgnoreClass && !ignoreElements.has(el) && el.style.display !== "none" && el.style.visibility !== "hidden" && !el.hasAttribute("disabled") && !el.hasAttribute("inert") && el.getAttribute("aria-hidden") !== "true";
      });
    } else if (ignoreClasses) {
      return allElements.filter((el) => {
        let hasIgnoreClass = false;
        for (const ignoreClass of ignoreClasses) {
          if (el.classList.contains(ignoreClass)) {
            hasIgnoreClass = true;
            break;
          }
        }
        return !hasIgnoreClass && el.style.display !== "none" && el.style.visibility !== "hidden" && !el.hasAttribute("disabled") && !el.hasAttribute("inert") && el.getAttribute("aria-hidden") !== "true";
      });
    } else if (ignoreElements) {
      return allElements.filter((el) => {
        return !ignoreElements.has(el) && el.style.display !== "none" && el.style.visibility !== "hidden" && !el.hasAttribute("disabled") && !el.hasAttribute("inert") && el.getAttribute("aria-hidden") !== "true";
      });
    } else {
      return allElements.filter((el) => {
        return el.style.display !== "none" && el.style.visibility !== "hidden" && !el.hasAttribute("disabled") && !el.hasAttribute("inert") && el.getAttribute("aria-hidden") !== "true";
      });
    }
  }
  /**
   * Gets a A11yFocusSource object from the given DOM event allowing for optional X / Y screen space overrides.
   * Browsers (Firefox / Chrome) forwards a mouse event for the context menu keyboard button. Provides detection of
   * when the context menu event is from the keyboard. Firefox as of (1/23) does not provide the correct screen space
   * coordinates, so for keyboard context menu presses coordinates are generated from the centroid point of the
   * element.
   *
   * A default fallback element or selector string may be provided to provide the focus target. If the event comes from
   * the keyboard however the source focused element is inserted as the target with the fallback value appended to the
   * list of focus targets. When A11yFocusSource is applied by {@link A11yHelper.applyFocusSource} the target focus
   * list is iterated through until a connected target is found and focus applied.
   *
   * @param {object} options - Options
   *
   * @param {KeyboardEvent|MouseEvent}   [options.event] - The source DOM event.
   *
   * @param {boolean} [options.debug] - When true {@link A11yHelper.applyFocusSource} logs focus target data.
   *
   * @param {HTMLElement|string} [options.focusEl] - A specific HTMLElement or selector string as the focus target.
   *
   * @param {number}   [options.x] - Used when an event isn't provided; integer of event source in screen space.
   *
   * @param {number}   [options.y] - Used when an event isn't provided; integer of event source in screen space.
   *
   * @returns {A11yFocusSource} A A11yFocusSource object.
   *
   * @see https://bugzilla.mozilla.org/show_bug.cgi?id=1426671
   * @see https://bugzilla.mozilla.org/show_bug.cgi?id=314314
   *
   * TODO: Evaluate / test against touch input devices.
   */
  static getFocusSource({ event, x, y, focusEl, debug = false }) {
    if (focusEl !== void 0 && !(focusEl instanceof HTMLElement) && typeof focusEl !== "string") {
      throw new TypeError(
        `A11yHelper.getFocusSource error: 'focusEl' is not a HTMLElement or string.`
      );
    }
    if (debug !== void 0 && typeof debug !== "boolean") {
      throw new TypeError(`A11yHelper.getFocusSource error: 'debug' is not a boolean.`);
    }
    if (event === void 0) {
      if (typeof x !== "number") {
        throw new TypeError(`A11yHelper.getFocusSource error: 'event' not defined and 'x' is not a number.`);
      }
      if (typeof y !== "number") {
        throw new TypeError(`A11yHelper.getFocusSource error: 'event' not defined and 'y' is not a number.`);
      }
      return {
        debug,
        focusEl: focusEl !== void 0 ? [focusEl] : void 0,
        x,
        y
      };
    }
    if (!(event instanceof KeyboardEvent) && !(event instanceof MouseEvent)) {
      throw new TypeError(`A11yHelper.getFocusSource error: 'event' is not a KeyboardEvent or MouseEvent.`);
    }
    if (x !== void 0 && !Number.isInteger(x)) {
      throw new TypeError(`A11yHelper.getFocusSource error: 'x' is not a number.`);
    }
    if (y !== void 0 && !Number.isInteger(y)) {
      throw new TypeError(`A11yHelper.getFocusSource error: 'y' is not a number.`);
    }
    const targetEl = event.target;
    if (!(targetEl instanceof HTMLElement)) {
      throw new TypeError(`A11yHelper.getFocusSource error: 'event.target' is not an HTMLElement.`);
    }
    const result = { debug };
    if (event instanceof MouseEvent) {
      if ((event == null ? void 0 : event.button) !== 2 && event.type === "contextmenu") {
        const rect = targetEl.getBoundingClientRect();
        result.x = x ?? rect.left + rect.width / 2;
        result.y = y ?? rect.top + rect.height / 2;
        result.focusEl = focusEl !== void 0 ? [targetEl, focusEl] : [targetEl];
        result.source = "keyboard";
      } else {
        result.x = x ?? event.pageX;
        result.y = y ?? event.pageY;
        result.focusEl = focusEl !== void 0 ? [focusEl] : void 0;
      }
    } else {
      const rect = targetEl.getBoundingClientRect();
      result.x = x ?? rect.left + rect.width / 2;
      result.y = y ?? rect.top + rect.height / 2;
      result.focusEl = focusEl !== void 0 ? [targetEl, focusEl] : [targetEl];
      result.source = "keyboard";
    }
    return result;
  }
  /**
   * Returns first focusable element within a specified element.
   *
   * @param {HTMLElement|Document} [element=document] - Optional element to start query.
   *
   * @param {object} [options] - Optional parameters.
   *
   * @param {Iterable<string>} [options.ignoreClasses] - Iterable list of classes to ignore elements.
   *
   * @param {Set<HTMLElement>} [options.ignoreElements] - Set of elements to ignore.
   *
   * @returns {HTMLElement} First focusable child element
   */
  static getLastFocusableElement(element = document, options) {
    const focusableElements = this.getFocusableElements(element, options);
    return focusableElements.length > 0 ? focusableElements[focusableElements.length - 1] : void 0;
  }
  /**
   * Tests if the given element is focusable.
   *
   * @param {HTMLElement} [el] - Element to test.
   *
   * @param {object} [options] - Optional parameters.
   *
   * @param {boolean} [options.anchorHref=true] - When true anchors must have an HREF.
   *
   * @param {Iterable<string>} [options.ignoreClasses] - Iterable list of classes to ignore elements.
   *
   * @returns {boolean} Element is focusable.
   */
  static isFocusable(el, { anchorHref = true, ignoreClasses } = {}) {
    if (el === void 0 || el === null || !(el instanceof HTMLElement) || (el == null ? void 0 : el.hidden) || !(el == null ? void 0 : el.isConnected)) {
      return false;
    }
    if (typeof anchorHref !== "boolean") {
      throw new TypeError(`'anchorHref' is not a boolean.`);
    }
    if (ignoreClasses !== void 0 && !isIterable(ignoreClasses)) {
      throw new TypeError(`'ignoreClasses' is not an iterable list.`);
    }
    const contenteditableAttr = el.getAttribute("contenteditable");
    const contenteditableFocusable = typeof contenteditableAttr === "string" && (contenteditableAttr === "" || contenteditableAttr === "true");
    const tabindexAttr = el.getAttribute("tabindex");
    const tabindexFocusable = typeof tabindexAttr === "string" && tabindexAttr !== "-1";
    const isAnchor = el instanceof HTMLAnchorElement;
    if (contenteditableFocusable || tabindexFocusable || isAnchor || el instanceof HTMLButtonElement || el instanceof HTMLDetailsElement || el instanceof HTMLEmbedElement || el instanceof HTMLIFrameElement || el instanceof HTMLInputElement || el instanceof HTMLObjectElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) {
      if (isAnchor && anchorHref && typeof el.getAttribute("href") !== "string") {
        return false;
      }
      return el.style.display !== "none" && el.style.visibility !== "hidden" && !el.hasAttribute("disabled") && !el.hasAttribute("inert") && el.getAttribute("aria-hidden") !== "true";
    }
    return false;
  }
  /**
   * Convenience method to check if the given data is a valid focus source.
   *
   * @param {HTMLElement|string}   data - Either an HTMLElement or selector string.
   *
   * @returns {boolean} Is valid focus source.
   */
  static isFocusSource(data) {
    return data instanceof HTMLElement || typeof data === "string";
  }
};
_getFocusableSelectors = new WeakSet();
getFocusableSelectors_fn = function(anchorHref = true) {
  return `button, [contenteditable=""], [contenteditable="true"], details summary:not([tabindex="-1"]), embed, a${anchorHref ? "[href]" : ""}, iframe, object, input:not([type=hidden]), select, textarea, [tabindex]:not([tabindex="-1"])`;
};
/**
 * Returns the default focusable selectors query.
 *
 * @param {boolean}  [anchorHref=true] - When true anchors must have an HREF.
 *
 * @returns {string} Focusable selectors for `querySelectorAll`.
 */
__privateAdd(A11yHelper, _getFocusableSelectors);
var _logging, _current;
var _ManagedPromise = class {
  constructor() {
    /** @type {{ isProcessing?: boolean, promise?: Promise, reject: Function, resolve: Function }} */
    __privateAdd(this, _current, void 0);
  }
  /**
   * @returns {boolean} Whether global logging is enabled.
   */
  static get logging() {
    return __privateGet(this, _logging);
  }
  /**
   * @returns {boolean} Whether there is an active managed Promise.
   */
  get isActive() {
    return __privateGet(this, _current) !== void 0;
  }
  /**
   * @returns {boolean} Whether there is an active managed Promise and resolution is currently being processed.
   */
  get isProcessing() {
    return __privateGet(this, _current) !== void 0 ? __privateGet(this, _current).isProcessing : false;
  }
  /**
   * Sets global logging enabled state.
   *
   * @param {boolean}  logging - New logging enabled state.
   */
  static set logging(logging) {
    if (typeof logging !== "boolean") {
      throw new TypeError(`[TRL] ManagedPromise.logging error: 'logging' is not a boolean.`);
    }
    __privateSet(this, _logging, logging);
  }
  // ----------------------------------------------------------------------------------------------------------------
  /**
   * Resolves any current Promise with undefined and creates a new current Promise.
   *
   * @template T
   *
   * @param {object} opts - Options.
   *
   * @param {boolean}  [opts.reuse=false] - When true if there is an existing live Promise it is returned immediately.
   *
   * @returns {Promise<T>} The new current managed Promise.
   */
  create({ reuse = false } = {}) {
    if (typeof reuse !== "boolean") {
      throw new TypeError(`[TRL] ManagedPromise.create error: 'reuse' is not a boolean.`);
    }
    if (reuse && __privateGet(this, _current) !== void 0 && __privateGet(this, _current).promise instanceof Promise) {
      if (__privateGet(_ManagedPromise, _logging)) {
        console.warn(`[TRL] ManagedPromise.create info: Reusing / returning existing managed Promise.`);
      }
      return __privateGet(this, _current).promise;
    }
    if (__privateGet(this, _current) !== void 0) {
      if (__privateGet(_ManagedPromise, _logging)) {
        console.warn(
          `[TRL] ManagedPromise.create info: Creating a new Promise and resolving existing immediately.`
        );
      }
      __privateGet(this, _current).resolve(void 0);
      __privateSet(this, _current, void 0);
    }
    const promise = new Promise((resolve, reject) => {
      __privateSet(this, _current, {
        isProcessing: false,
        reject,
        resolve
      });
    });
    __privateGet(this, _current).promise = promise;
    return promise;
  }
  /**
   * Gets the current Promise if any.
   *
   * @returns {Promise<any>} Current Promise.
   */
  get() {
    return __privateGet(this, _current) ? __privateGet(this, _current).promise : void 0;
  }
  /**
   * Rejects the current Promise if applicable.
   *
   * @param {*}  [result] - Result to reject.
   *
   * @returns {boolean} Was the promise rejected.
   */
  reject(result = void 0) {
    if (__privateGet(this, _current) !== void 0 && __privateGet(this, _current).isProcessing) {
      if (__privateGet(_ManagedPromise, _logging)) {
        console.warn(`[TRL] ManagedPromise.reject info: Currently processing promise.`);
      }
      return true;
    }
    if (__privateGet(this, _current) !== void 0) {
      __privateGet(this, _current).isProcessing = true;
      if (result instanceof Promise) {
        result.then((value) => {
          __privateGet(this, _current).reject(value);
          __privateSet(this, _current, void 0);
        }).catch((err) => {
          __privateGet(this, _current).reject(err);
          __privateSet(this, _current, void 0);
        });
      } else {
        __privateGet(this, _current).reject(result);
        __privateSet(this, _current, void 0);
      }
      return true;
    } else {
      if (__privateGet(_ManagedPromise, _logging)) {
        console.warn(`[TRL] ManagedPromise.reject warning: No current managed Promise to reject.`);
      }
      return false;
    }
  }
  /**
   * Resolves the current Promise if applicable.
   *
   * @param {*}  [result] - Result to resolve.
   *
   * @returns {boolean} Was the promise resolved.
   */
  resolve(result = void 0) {
    if (__privateGet(this, _current) !== void 0 && __privateGet(this, _current).isProcessing) {
      if (__privateGet(_ManagedPromise, _logging)) {
        console.warn(`[TRL] ManagedPromise.resolve info: Currently processing promise.`);
      }
      return true;
    }
    if (__privateGet(this, _current) !== void 0) {
      if (result instanceof Promise) {
        __privateGet(this, _current).isProcessing = true;
        result.then((value) => {
          __privateGet(this, _current).resolve(value);
          __privateSet(this, _current, void 0);
        }).catch((err) => {
          __privateGet(this, _current).reject(err);
          __privateSet(this, _current, void 0);
        });
      } else {
        __privateGet(this, _current).resolve(result);
        __privateSet(this, _current, void 0);
      }
      return true;
    } else {
      if (__privateGet(_ManagedPromise, _logging)) {
        console.warn(`[TRL] ManagedPromise.resolve warning: No current managed Promise to resolve.`);
      }
      return false;
    }
  }
};
var ManagedPromise = _ManagedPromise;
_logging = new WeakMap();
_current = new WeakMap();
/** @type {boolean} */
__privateAdd(ManagedPromise, _logging, false);
var s_UUIDV4_REGEX = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ (globalThis.crypto || globalThis.msCrypto).getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}
uuidv4.isValid = (uuid) => s_UUIDV4_REGEX.test(uuid);
var _cssRule, _docKey, _selector, _styleElement, _version;
var _StyleManager = class {
  /**
   *
   * @param {object}   opts - Options.
   *
   * @param {string}   opts.docKey - Required key providing a link to a specific style sheet element.
   *
   * @param {string}   [opts.selector=:root] - Selector element.
   *
   * @param {Document} [opts.document] - Target document to load styles into.
   *
   * @param {number}   [opts.version] - An integer representing the version / level of styles being managed.
   *
   */
  constructor({ docKey, selector = ":root", document: document2 = globalThis.document, version } = {}) {
    /** @type {CSSStyleRule} */
    __privateAdd(this, _cssRule, void 0);
    /** @type {string} */
    __privateAdd(this, _docKey, void 0);
    /** @type {string} */
    __privateAdd(this, _selector, void 0);
    /** @type {HTMLStyleElement} */
    __privateAdd(this, _styleElement, void 0);
    /** @type {number} */
    __privateAdd(this, _version, void 0);
    if (typeof docKey !== "string") {
      throw new TypeError(`StyleManager error: 'docKey' is not a string.`);
    }
    if (typeof selector !== "string") {
      throw new TypeError(`StyleManager error: 'selector' is not a string.`);
    }
    if (version !== void 0 && !Number.isSafeInteger(version) && version < 1) {
      throw new TypeError(`StyleManager error: 'version' is defined and is not a positive integer >= 1.`);
    }
    __privateSet(this, _selector, selector);
    __privateSet(this, _docKey, docKey);
    __privateSet(this, _version, version);
    if (document2[__privateGet(this, _docKey)] === void 0) {
      __privateSet(this, _styleElement, document2.createElement("style"));
      document2.head.append(__privateGet(this, _styleElement));
      __privateGet(this, _styleElement)._STYLE_MANAGER_VERSION = version;
      __privateGet(this, _styleElement).sheet.insertRule(`${selector} {}`, 0);
      __privateSet(this, _cssRule, __privateGet(this, _styleElement).sheet.cssRules[0]);
      document2[docKey] = __privateGet(this, _styleElement);
    } else {
      __privateSet(this, _styleElement, document2[docKey]);
      __privateSet(this, _cssRule, __privateGet(this, _styleElement).sheet.cssRules[0]);
      if (version) {
        const existingVersion = __privateGet(this, _styleElement)._STYLE_MANAGER_VERSION ?? 0;
        if (version > existingVersion) {
          __privateGet(this, _cssRule).style.cssText = "";
        }
      }
    }
  }
  /**
   * @returns {string} Provides an accessor to get the `cssText` for the style sheet.
   */
  get cssText() {
    return __privateGet(this, _cssRule).style.cssText;
  }
  /**
   * @returns {number} Returns the version of this instance.
   */
  get version() {
    return __privateGet(this, _version);
  }
  /**
   * Provides a copy constructor to duplicate an existing StyleManager instance into a new document.
   *
   * Note: This is used to support the `PopOut` module.
   *
   * @param {Document} [document] Target browser document to clone into.
   *
   * @returns {StyleManager} New style manager instance.
   */
  clone(document2 = globalThis.document) {
    const newStyleManager = new _StyleManager({
      selector: __privateGet(this, _selector),
      docKey: __privateGet(this, _docKey),
      document: document2,
      version: __privateGet(this, _version)
    });
    __privateGet(newStyleManager, _cssRule).style.cssText = __privateGet(this, _cssRule).style.cssText;
    return newStyleManager;
  }
  get() {
    const cssText = __privateGet(this, _cssRule).style.cssText;
    const result = {};
    if (cssText !== "") {
      for (const entry of cssText.split(";")) {
        if (entry !== "") {
          const values = entry.split(":");
          result[values[0].trim()] = values[1];
        }
      }
    }
    return result;
  }
  /**
   * Gets a particular CSS variable.
   *
   * @param {string}   key - CSS variable property key.
   *
   * @returns {string} Returns CSS variable value.
   */
  getProperty(key) {
    if (typeof key !== "string") {
      throw new TypeError(`StyleManager error: 'key' is not a string.`);
    }
    return __privateGet(this, _cssRule).style.getPropertyValue(key);
  }
  /**
   * Set rules by property / value; useful for CSS variables.
   *
   * @param {Object<string, string>}  rules - An object with property / value string pairs to load.
   *
   * @param {boolean}                 [overwrite=true] - When true overwrites any existing values.
   */
  setProperties(rules, overwrite = true) {
    if (!isObject(rules)) {
      throw new TypeError(`StyleManager error: 'rules' is not an object.`);
    }
    if (typeof overwrite !== "boolean") {
      throw new TypeError(`StyleManager error: 'overwrite' is not a boolean.`);
    }
    if (overwrite) {
      for (const [key, value] of Object.entries(rules)) {
        __privateGet(this, _cssRule).style.setProperty(key, value);
      }
    } else {
      for (const [key, value] of Object.entries(rules)) {
        if (__privateGet(this, _cssRule).style.getPropertyValue(key) === "") {
          __privateGet(this, _cssRule).style.setProperty(key, value);
        }
      }
    }
  }
  /**
   * Sets a particular property.
   *
   * @param {string}   key - CSS variable property key.
   *
   * @param {string}   value - CSS variable value.
   *
   * @param {boolean}  [overwrite=true] - Overwrite any existing value.
   */
  setProperty(key, value, overwrite = true) {
    if (typeof key !== "string") {
      throw new TypeError(`StyleManager error: 'key' is not a string.`);
    }
    if (typeof value !== "string") {
      throw new TypeError(`StyleManager error: 'value' is not a string.`);
    }
    if (typeof overwrite !== "boolean") {
      throw new TypeError(`StyleManager error: 'overwrite' is not a boolean.`);
    }
    if (overwrite) {
      __privateGet(this, _cssRule).style.setProperty(key, value);
    } else {
      if (__privateGet(this, _cssRule).style.getPropertyValue(key) === "") {
        __privateGet(this, _cssRule).style.setProperty(key, value);
      }
    }
  }
  /**
   * Removes the property keys specified. If `keys` is an iterable list then all property keys in the list are removed.
   *
   * @param {Iterable<string>} keys - The property keys to remove.
   */
  removeProperties(keys) {
    if (!isIterable(keys)) {
      throw new TypeError(`StyleManager error: 'keys' is not an iterable list.`);
    }
    for (const key of keys) {
      if (typeof key === "string") {
        __privateGet(this, _cssRule).style.removeProperty(key);
      }
    }
  }
  /**
   * Removes a particular CSS variable.
   *
   * @param {string}   key - CSS variable property key.
   *
   * @returns {string} CSS variable value when removed.
   */
  removeProperty(key) {
    if (typeof key !== "string") {
      throw new TypeError(`StyleManager error: 'key' is not a string.`);
    }
    return __privateGet(this, _cssRule).style.removeProperty(key);
  }
};
var StyleManager = _StyleManager;
_cssRule = new WeakMap();
_docKey = new WeakMap();
_selector = new WeakMap();
_styleElement = new WeakMap();
_version = new WeakMap();
var s_REGEX = /(\d+)\s*px/;
function styleParsePixels(value) {
  if (typeof value !== "string") {
    return void 0;
  }
  const isPixels = s_REGEX.test(value);
  const number = parseInt(value);
  return isPixels && Number.isFinite(number) ? number : void 0;
}
var applicationShellContract = ["elementRoot"];
Object.freeze(applicationShellContract);
function isApplicationShell(component) {
  if (component === null || component === void 0) {
    return false;
  }
  let compHasContract = true;
  let protoHasContract = true;
  for (const accessor of applicationShellContract) {
    const descriptor = Object.getOwnPropertyDescriptor(component, accessor);
    if (descriptor === void 0 || descriptor.get === void 0 || descriptor.set === void 0) {
      compHasContract = false;
    }
  }
  const prototype = Object.getPrototypeOf(component);
  for (const accessor of applicationShellContract) {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, accessor);
    if (descriptor === void 0 || descriptor.get === void 0 || descriptor.set === void 0) {
      protoHasContract = false;
    }
  }
  return compHasContract || protoHasContract;
}
function isHMRProxy(comp) {
  var _a, _b, _c;
  const instanceName = (_a = comp == null ? void 0 : comp.constructor) == null ? void 0 : _a.name;
  if (typeof instanceName === "string" && (instanceName.startsWith("Proxy<") || instanceName === "ProxyComponent")) {
    return true;
  }
  const prototypeName = (_c = (_b = comp == null ? void 0 : comp.prototype) == null ? void 0 : _b.constructor) == null ? void 0 : _c.name;
  return typeof prototypeName === "string" && (prototypeName.startsWith("Proxy<") || prototypeName === "ProxyComponent");
}
function isSvelteComponent(comp) {
  var _a, _b;
  if (comp === null || comp === void 0 || typeof comp !== "function") {
    return false;
  }
  const prototypeName = (_b = (_a = comp == null ? void 0 : comp.prototype) == null ? void 0 : _a.constructor) == null ? void 0 : _b.name;
  if (typeof prototypeName === "string" && (prototypeName.startsWith("Proxy<") || prototypeName === "ProxyComponent")) {
    return true;
  }
  return typeof window !== void 0 ? typeof comp.prototype.$destroy === "function" && typeof comp.prototype.$on === "function" : (
    // client-side
    typeof comp.render === "function"
  );
}
async function outroAndDestroy(instance) {
  return new Promise((resolve) => {
    if (instance.$$.fragment && instance.$$.fragment.o) {
      group_outros();
      transition_out(instance.$$.fragment, 0, 0, () => {
        instance.$destroy();
        resolve();
      });
      check_outros();
    } else {
      instance.$destroy();
      resolve();
    }
  });
}
function parseSvelteConfig(config, thisArg = void 0) {
  if (typeof config !== "object") {
    throw new TypeError(`parseSvelteConfig - 'config' is not an object:
${JSON.stringify(config)}.`);
  }
  if (!isSvelteComponent(config.class)) {
    throw new TypeError(
      `parseSvelteConfig - 'class' is not a Svelte component constructor for config:
${JSON.stringify(config)}.`
    );
  }
  if (config.hydrate !== void 0 && typeof config.hydrate !== "boolean") {
    throw new TypeError(
      `parseSvelteConfig - 'hydrate' is not a boolean for config:
${JSON.stringify(config)}.`
    );
  }
  if (config.intro !== void 0 && typeof config.intro !== "boolean") {
    throw new TypeError(
      `parseSvelteConfig - 'intro' is not a boolean for config:
${JSON.stringify(config)}.`
    );
  }
  if (config.target !== void 0 && typeof config.target !== "string" && !(config.target instanceof HTMLElement) && !(config.target instanceof ShadowRoot) && !(config.target instanceof DocumentFragment)) {
    throw new TypeError(
      `parseSvelteConfig - 'target' is not a string, HTMLElement, ShadowRoot, or DocumentFragment for config:
${JSON.stringify(config)}.`
    );
  }
  if (config.anchor !== void 0 && typeof config.anchor !== "string" && !(config.anchor instanceof HTMLElement) && !(config.anchor instanceof ShadowRoot) && !(config.anchor instanceof DocumentFragment)) {
    throw new TypeError(
      `parseSvelteConfig - 'anchor' is not a string, HTMLElement, ShadowRoot, or DocumentFragment for config:
${JSON.stringify(config)}.`
    );
  }
  if (config.context !== void 0 && typeof config.context !== "function" && !(config.context instanceof Map) && typeof config.context !== "object") {
    throw new TypeError(
      `parseSvelteConfig - 'context' is not a Map, function or object for config:
${JSON.stringify(config)}.`
    );
  }
  if (config.selectorTarget !== void 0 && typeof config.selectorTarget !== "string") {
    throw new TypeError(
      `parseSvelteConfig - 'selectorTarget' is not a string for config:
${JSON.stringify(config)}.`
    );
  }
  if (config.options !== void 0 && typeof config.options !== "object") {
    throw new TypeError(
      `parseSvelteConfig - 'options' is not an object for config:
${JSON.stringify(config)}.`
    );
  }
  if (config.options !== void 0) {
    if (config.options.injectApp !== void 0 && typeof config.options.injectApp !== "boolean") {
      throw new TypeError(
        `parseSvelteConfig - 'options.injectApp' is not a boolean for config:
${JSON.stringify(config)}.`
      );
    }
    if (config.options.injectEventbus !== void 0 && typeof config.options.injectEventbus !== "boolean") {
      throw new TypeError(
        `parseSvelteConfig - 'options.injectEventbus' is not a boolean for config:
${JSON.stringify(config)}.`
      );
    }
    if (config.options.selectorElement !== void 0 && typeof config.options.selectorElement !== "string") {
      throw new TypeError(
        `parseSvelteConfig - 'selectorElement' is not a string for config:
${JSON.stringify(config)}.`
      );
    }
  }
  const svelteConfig = { ...config };
  delete svelteConfig.options;
  let externalContext = {};
  if (typeof svelteConfig.context === "function") {
    const contextFunc = svelteConfig.context;
    delete svelteConfig.context;
    const result = contextFunc.call(thisArg);
    if (isObject(result)) {
      externalContext = { ...result };
    } else {
      throw new Error(`parseSvelteConfig - 'context' is a function that did not return an object for config:
${JSON.stringify(config)}`);
    }
  } else if (svelteConfig.context instanceof Map) {
    externalContext = Object.fromEntries(svelteConfig.context);
    delete svelteConfig.context;
  } else if (isObject(svelteConfig.context)) {
    externalContext = svelteConfig.context;
    delete svelteConfig.context;
  }
  svelteConfig.props = s_PROCESS_PROPS(svelteConfig.props, thisArg, config);
  if (Array.isArray(svelteConfig.children)) {
    const children = [];
    for (let cntr = 0; cntr < svelteConfig.children.length; cntr++) {
      const child = svelteConfig.children[cntr];
      if (!isSvelteComponent(child.class)) {
        throw new Error(`parseSvelteConfig - 'class' is not a Svelte component for child[${cntr}] for config:
${JSON.stringify(config)}`);
      }
      child.props = s_PROCESS_PROPS(child.props, thisArg, config);
      children.push(child);
    }
    if (children.length > 0) {
      externalContext.children = children;
    }
    delete svelteConfig.children;
  } else if (isObject(svelteConfig.children)) {
    if (!isSvelteComponent(svelteConfig.children.class)) {
      throw new Error(`parseSvelteConfig - 'class' is not a Svelte component for children object for config:
${JSON.stringify(config)}`);
    }
    svelteConfig.children.props = s_PROCESS_PROPS(svelteConfig.children.props, thisArg, config);
    externalContext.children = [svelteConfig.children];
    delete svelteConfig.children;
  }
  if (!(svelteConfig.context instanceof Map)) {
    svelteConfig.context = /* @__PURE__ */ new Map();
  }
  svelteConfig.context.set("#external", externalContext);
  return svelteConfig;
}
function s_PROCESS_PROPS(props, thisArg, config) {
  if (typeof props === "function") {
    const result = props.call(thisArg);
    if (isObject(result)) {
      return result;
    } else {
      throw new Error(`parseSvelteConfig - 'props' is a function that did not return an object for config:
${JSON.stringify(config)}`);
    }
  } else if (isObject(props)) {
    return props;
  } else if (props !== void 0) {
    throw new Error(
      `parseSvelteConfig - 'props' is not a function or an object for config:
${JSON.stringify(config)}`
    );
  }
  return {};
}
function hasGetter(object, accessor) {
  if (object === null || object === void 0) {
    return false;
  }
  const iDescriptor = Object.getOwnPropertyDescriptor(object, accessor);
  if (iDescriptor !== void 0 && iDescriptor.get !== void 0) {
    return true;
  }
  for (let o = Object.getPrototypeOf(object); o; o = Object.getPrototypeOf(o)) {
    const descriptor = Object.getOwnPropertyDescriptor(o, accessor);
    if (descriptor !== void 0 && descriptor.get !== void 0) {
      return true;
    }
  }
  return false;
}
function hasPrototype(target, Prototype) {
  if (typeof target !== "function") {
    return false;
  }
  if (target === Prototype) {
    return true;
  }
  for (let proto = Object.getPrototypeOf(target); proto; proto = Object.getPrototypeOf(proto)) {
    if (proto === Prototype) {
      return true;
    }
  }
  return false;
}
function getUUIDFromDataTransfer(data, { actor = true, compendium = true, world = true, types = void 0 } = {}) {
  if (typeof data !== "object") {
    return void 0;
  }
  if (Array.isArray(types) && !types.includes(data.type)) {
    return void 0;
  }
  let uuid = void 0;
  if (typeof data.uuid === "string") {
    const isCompendium = data.uuid.startsWith("Compendium");
    if (isCompendium && compendium) {
      uuid = data.uuid;
    } else if (world) {
      uuid = data.uuid;
    }
  } else {
    if (actor && world && data.actorId && data.type) {
      uuid = `Actor.${data.actorId}.${data.type}.${data.data._id}`;
    } else if (typeof data.id === "string") {
      if (compendium && typeof data.pack === "string") {
        uuid = `Compendium.${data.pack}.${data.id}`;
      } else if (world) {
        uuid = `${data.type}.${data.id}`;
      }
    }
  }
  return uuid;
}

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/store/index.js
var DynReducerUtils = class {
  /**
   * Checks for array equality between two arrays of numbers.
   *
   * @param a - Array A
   *
   * @param b - Array B
   *
   * @returns Arrays are equal.
   */
  static arrayEquals(a, b) {
    if (a === b) {
      return true;
    }
    if (a === null || b === null) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }
    for (let cntr = a.length; --cntr >= 0; ) {
      if (a[cntr] !== b[cntr]) {
        return false;
      }
    }
    return true;
  }
  /**
   * Provides a solid string hashing algorithm.
   *
   * Sourced from: https://stackoverflow.com/a/52171480
   *
   * @param str - String to hash.
   *
   * @param seed - A seed value altering the hash.
   *
   * @returns Hash code.
   */
  static hashString(str, seed = 0) {
    let h1 = 3735928559 ^ seed, h2 = 1103547991 ^ seed;
    for (let ch, i = 0; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
    h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  }
  /**
   * Converts an unknown value for hashing purposes in {@link AdapterIndexer.calcHashUpdate}.
   *
   * Currently objects / Map w/ object keys is not supported. Potentially can include `object-hash` to handle this
   * case, but it is not common to use objects as keys in Maps.
   *
   * @param value - An unknown value to convert to a number.
   */
  static hashUnknown(value) {
    if (value === null || value === void 0) {
      return 0;
    }
    let result = 0;
    switch (typeof value) {
      case "boolean":
        result = value ? 1 : 0;
        break;
      case "bigint":
        result = Number(BigInt.asIntN(64, value));
        break;
      case "function":
        result = this.hashString(value.name);
        break;
      case "number":
        result = Number.isFinite(value) ? value : 0;
        break;
      case "object":
        break;
      case "string":
        result = this.hashString(value);
        break;
      case "symbol":
        result = this.hashString(Symbol.keyFor(value));
        break;
    }
    return result;
  }
  /**
   * @param target -
   *
   * @param Prototype -
   *
   * @returns target constructor function has Prototype.
   */
  static hasPrototype(target, Prototype) {
    if (typeof target !== "function") {
      return false;
    }
    if (target === Prototype) {
      return true;
    }
    for (let proto = Object.getPrototypeOf(target); proto; proto = Object.getPrototypeOf(proto)) {
      if (proto === Prototype) {
        return true;
      }
    }
    return false;
  }
  /**
   * Provides a utility method to determine if the given data is iterable / implements iterator protocol.
   *
   * @param data - Data to verify as iterable.
   *
   * @returns Is data iterable.
   */
  static isIterable(data) {
    return data !== null && data !== void 0 && typeof data === "object" && typeof data[Symbol.iterator] === "function";
  }
};
var _hostData, _DerivedReducerCtor, _parentIndex, _derived, _destroyed;
var AdapterDerived = class {
  /**
   * @param hostData - Hosted data structure.
   *
   * @param parentIndex - Any associated parent index API.
   *
   * @param DerivedReducerCtor - The default derived reducer constructor function.
   */
  constructor(hostData, parentIndex, DerivedReducerCtor) {
    __privateAdd(this, _hostData, void 0);
    __privateAdd(this, _DerivedReducerCtor, void 0);
    __privateAdd(this, _parentIndex, void 0);
    __privateAdd(this, _derived, /* @__PURE__ */ new Map());
    __privateAdd(this, _destroyed, false);
    __privateSet(this, _hostData, hostData);
    __privateSet(this, _parentIndex, parentIndex);
    __privateSet(this, _DerivedReducerCtor, DerivedReducerCtor);
    Object.freeze(this);
  }
  /**
   * Creates a new derived reducer.
   *
   * @param options - Options defining the new derived reducer.
   *
   * @returns Newly created derived reducer.
   */
  create(options) {
    if (__privateGet(this, _destroyed)) {
      throw Error(`AdapterDerived.create error: this instance has been destroyed.`);
    }
    let name;
    let rest = {};
    let ctor;
    const DerivedReducerCtor = __privateGet(this, _DerivedReducerCtor);
    if (typeof options === "string") {
      name = options;
      ctor = DerivedReducerCtor;
    } else if (typeof options === "function" && DynReducerUtils.hasPrototype(options, DerivedReducerCtor)) {
      ctor = options;
    } else if (typeof options === "object" && options !== null) {
      ({ name, ctor = DerivedReducerCtor, ...rest } = options);
    } else {
      throw new TypeError(`AdapterDerived.create error: 'options' does not conform to allowed parameters.`);
    }
    if (!DynReducerUtils.hasPrototype(ctor, DerivedReducerCtor)) {
      throw new TypeError(`AdapterDerived.create error: 'ctor' is not a '${DerivedReducerCtor == null ? void 0 : DerivedReducerCtor.name}'.`);
    }
    name = name ?? (ctor == null ? void 0 : ctor.name);
    if (typeof name !== "string") {
      throw new TypeError(`AdapterDerived.create error: 'name' is not a string.`);
    }
    const derivedReducer = new ctor(__privateGet(this, _hostData), __privateGet(this, _parentIndex), rest);
    __privateGet(this, _derived).set(name, derivedReducer);
    return derivedReducer;
  }
  /**
   * Removes all derived reducers and associated subscriptions.
   */
  clear() {
    if (__privateGet(this, _destroyed)) {
      return;
    }
    for (const reducer of __privateGet(this, _derived).values()) {
      reducer.destroy();
    }
    __privateGet(this, _derived).clear();
  }
  /**
   * Deletes and destroys a derived reducer by name.
   *
   * @param name - Name of the derived reducer.
   */
  delete(name) {
    if (__privateGet(this, _destroyed)) {
      throw Error(`AdapterDerived.delete error: this instance has been destroyed.`);
    }
    const reducer = __privateGet(this, _derived).get(name);
    if (reducer) {
      reducer.destroy();
    }
    return __privateGet(this, _derived).delete(name);
  }
  /**
   * Removes all derived reducers, subscriptions, and cleans up all resources.
   */
  destroy() {
    if (__privateGet(this, _destroyed)) {
      return;
    }
    this.clear();
    __privateSet(this, _hostData, [null]);
    __privateSet(this, _parentIndex, null);
    __privateSet(this, _destroyed, true);
  }
  /**
   * Returns an existing derived reducer.
   *
   * @param name - Name of derived reducer.
   */
  get(name) {
    if (__privateGet(this, _destroyed)) {
      throw Error(`AdapterDerived.get error: this instance has been destroyed.`);
    }
    return __privateGet(this, _derived).get(name);
  }
  /**
   * Updates all managed derived reducer indexes.
   *
   * @param [force] - Force an update to subscribers.
   */
  update(force = false) {
    if (__privateGet(this, _destroyed)) {
      return;
    }
    for (const reducer of __privateGet(this, _derived).values()) {
      reducer.index.update(force);
    }
  }
};
_hostData = new WeakMap();
_DerivedReducerCtor = new WeakMap();
_parentIndex = new WeakMap();
_derived = new WeakMap();
_destroyed = new WeakMap();
var _filtersData, _indexUpdate, _mapUnsubscribe;
var AdapterFilters = class {
  /**
   * @param indexUpdate - update function for the indexer.
   *
   * @param filtersAdapter - Stores the filter function data.
   */
  constructor(indexUpdate, filtersAdapter) {
    __privateAdd(this, _filtersData, void 0);
    __privateAdd(this, _indexUpdate, void 0);
    __privateAdd(this, _mapUnsubscribe, /* @__PURE__ */ new Map());
    __privateSet(this, _indexUpdate, indexUpdate);
    __privateSet(this, _filtersData, filtersAdapter);
    Object.freeze(this);
  }
  /**
   * @returns Returns the length of the filter data.
   */
  get length() {
    return __privateGet(this, _filtersData).filters.length;
  }
  /**
   * Provides an iterator for filters.
   *
   * @returns Generator / iterator of filters.
   * @yields {DataFilter<T>}
   */
  *[Symbol.iterator]() {
    if (__privateGet(this, _filtersData).filters.length === 0) {
      return;
    }
    for (const entry of __privateGet(this, _filtersData).filters) {
      yield { ...entry };
    }
  }
  /**
   * @param filters -
   */
  add(...filters) {
    let subscribeCount = 0;
    for (const filter of filters) {
      const filterType = typeof filter;
      if (filterType !== "function" && (filterType !== "object" || filter === null)) {
        throw new TypeError(`AdapterFilters error: 'filter' is not a function or object.`);
      }
      let data = void 0;
      let subscribeFn = void 0;
      if (filterType === "function") {
        data = {
          id: void 0,
          filter,
          weight: 1
        };
        subscribeFn = filter.subscribe;
      } else if (filterType === "object") {
        if ("filter" in filter) {
          if (typeof filter.filter !== "function") {
            throw new TypeError(`AdapterFilters error: 'filter' attribute is not a function.`);
          }
          if (filter.weight !== void 0 && typeof filter.weight !== "number" || (filter.weight < 0 || filter.weight > 1)) {
            throw new TypeError(`AdapterFilters error: 'weight' attribute is not a number between '0 - 1' inclusive.`);
          }
          data = {
            id: filter.id !== void 0 ? filter.id : void 0,
            filter: filter.filter,
            weight: filter.weight || 1
          };
          subscribeFn = filter.filter.subscribe ?? filter.subscribe;
        } else {
          throw new TypeError(`AdapterFilters error: 'filter' attribute is not a function.`);
        }
      }
      const index = __privateGet(this, _filtersData).filters.findIndex((value) => {
        return data.weight < value.weight;
      });
      if (index >= 0) {
        __privateGet(this, _filtersData).filters.splice(index, 0, data);
      } else {
        __privateGet(this, _filtersData).filters.push(data);
      }
      if (typeof subscribeFn === "function") {
        const unsubscribe = subscribeFn(__privateGet(this, _indexUpdate));
        if (typeof unsubscribe !== "function") {
          throw new TypeError("AdapterFilters error: Filter has subscribe function, but no unsubscribe function is returned.");
        }
        if (__privateGet(this, _mapUnsubscribe).has(data.filter)) {
          throw new Error("AdapterFilters error: Filter added already has an unsubscribe function registered.");
        }
        __privateGet(this, _mapUnsubscribe).set(data.filter, unsubscribe);
        subscribeCount++;
      }
    }
    if (subscribeCount < filters.length) {
      __privateGet(this, _indexUpdate).call(this);
    }
  }
  /**
   * Clears and removes all filters.
   */
  clear() {
    __privateGet(this, _filtersData).filters.length = 0;
    for (const unsubscribe of __privateGet(this, _mapUnsubscribe).values()) {
      unsubscribe();
    }
    __privateGet(this, _mapUnsubscribe).clear();
    __privateGet(this, _indexUpdate).call(this);
  }
  /**
   * @param filters -
   */
  remove(...filters) {
    const length = __privateGet(this, _filtersData).filters.length;
    if (length === 0) {
      return;
    }
    for (const data of filters) {
      const actualFilter = typeof data === "function" ? data : data !== null && typeof data === "object" ? data.filter : void 0;
      if (!actualFilter) {
        continue;
      }
      for (let cntr = __privateGet(this, _filtersData).filters.length; --cntr >= 0; ) {
        if (__privateGet(this, _filtersData).filters[cntr].filter === actualFilter) {
          __privateGet(this, _filtersData).filters.splice(cntr, 1);
          let unsubscribe = void 0;
          if (typeof (unsubscribe = __privateGet(this, _mapUnsubscribe).get(actualFilter)) === "function") {
            unsubscribe();
            __privateGet(this, _mapUnsubscribe).delete(actualFilter);
          }
        }
      }
    }
    if (length !== __privateGet(this, _filtersData).filters.length) {
      __privateGet(this, _indexUpdate).call(this);
    }
  }
  /**
   * Remove filters by the provided callback. The callback takes 3 parameters: `id`, `filter`, and `weight`.
   * Any truthy value returned will remove that filter.
   *
   * @param callback - Callback function to evaluate each filter entry.
   */
  removeBy(callback) {
    const length = __privateGet(this, _filtersData).filters.length;
    if (length === 0) {
      return;
    }
    if (typeof callback !== "function") {
      throw new TypeError(`AdapterFilters error: 'callback' is not a function.`);
    }
    __privateGet(this, _filtersData).filters = __privateGet(this, _filtersData).filters.filter((data) => {
      const remove = callback.call(callback, { ...data });
      if (remove) {
        let unsubscribe;
        if (typeof (unsubscribe = __privateGet(this, _mapUnsubscribe).get(data.filter)) === "function") {
          unsubscribe();
          __privateGet(this, _mapUnsubscribe).delete(data.filter);
        }
      }
      return !remove;
    });
    if (length !== __privateGet(this, _filtersData).filters.length) {
      __privateGet(this, _indexUpdate).call(this);
    }
  }
  /**
   * @param ids - Removes filters by ID.
   */
  removeById(...ids) {
    const length = __privateGet(this, _filtersData).filters.length;
    if (length === 0) {
      return;
    }
    __privateGet(this, _filtersData).filters = __privateGet(this, _filtersData).filters.filter((data) => {
      let remove = 0;
      for (const id of ids) {
        remove |= data.id === id ? 1 : 0;
      }
      if (!!remove) {
        let unsubscribe;
        if (typeof (unsubscribe = __privateGet(this, _mapUnsubscribe).get(data.filter)) === "function") {
          unsubscribe();
          __privateGet(this, _mapUnsubscribe).delete(data.filter);
        }
      }
      return !remove;
    });
    if (length !== __privateGet(this, _filtersData).filters.length) {
      __privateGet(this, _indexUpdate).call(this);
    }
  }
};
_filtersData = new WeakMap();
_indexUpdate = new WeakMap();
_mapUnsubscribe = new WeakMap();
var AdapterIndexer = class {
  /**
   * @param hostData - Hosted data structure.
   *
   * @param hostUpdate - Host update function invoked on index updates.
   *
   * @param [parentIndexer] - Any associated parent index API.
   *
   * @returns Indexer adapter instance.
   */
  constructor(hostData, hostUpdate, parentIndexer) {
    __publicField(this, "derivedAdapter");
    __publicField(this, "filtersData");
    __publicField(this, "hostData");
    __publicField(this, "hostUpdate");
    __publicField(this, "indexData");
    __publicField(this, "sortData");
    __publicField(this, "sortFn");
    __publicField(this, "destroyed", false);
    this.hostData = hostData;
    this.hostUpdate = hostUpdate;
    this.indexData = { index: null, hash: null, reversed: false, parent: parentIndexer };
  }
  /**
   * @returns Returns whether the index is active.
   */
  get active() {
    var _a;
    return this.filtersData.filters.length > 0 || this.sortData.compareFn !== null || ((_a = this.indexData.parent) == null ? void 0 : _a.active) === true;
  }
  /**
   * @returns Returns length of reduced index.
   */
  get length() {
    return this.indexData.index ? this.indexData.index.length : 0;
  }
  /* c8 ignore start */
  /**
   * @returns Returns reversed state.
   */
  get reversed() {
    return this.indexData.reversed;
  }
  /* c8 ignore end */
  /**
   * @param reversed - New reversed state.
   */
  set reversed(reversed) {
    this.indexData.reversed = reversed;
  }
  // -------------------------------------------------------------------------------------------------------------------
  /**
   * Calculates a new hash value for the new index array if any. If the new index array is null then the hash value
   * is set to null. Set calculated new hash value to the index adapter hash value.
   *
   * After hash generation compare old and new hash values and perform an update if they are different. If they are
   * equal check for array equality between the old and new index array and perform an update if they are not equal.
   *
   * @param oldIndex - Old index array.
   *
   * @param oldHash - Old index hash value.
   *
   * @param [force=false] - When true forces an update to subscribers.
   */
  calcHashUpdate(oldIndex, oldHash, force = false) {
    const actualForce = typeof force === "boolean" ? force : (
      /* c8 ignore next */
      false
    );
    let newHash = null;
    const newIndex = this.indexData.index;
    if (newIndex) {
      for (let cntr = newIndex.length; --cntr >= 0; ) {
        newHash ^= DynReducerUtils.hashUnknown(newIndex[cntr]) + 2654435769 + (newHash << 6) + (newHash >> 2);
      }
    }
    this.indexData.hash = newHash;
    if (actualForce || (oldHash === newHash ? !DynReducerUtils.arrayEquals(oldIndex, newIndex) : true)) {
      this.hostUpdate();
    }
  }
  /**
   * Destroys all resources.
   */
  destroy() {
    if (this.destroyed) {
      return;
    }
    this.indexData.index = null;
    this.indexData.hash = null;
    this.indexData.reversed = null;
    this.indexData.parent = null;
    this.destroyed = true;
  }
  /**
   * Store associated filter and sort data that are constructed after the indexer.
   *
   * @param filtersData - Associated AdapterFilters instance.
   *
   * @param sortData - Associated AdapterSort instance.
   *
   * @param derivedAdapter - Associated AdapterDerived instance.
   */
  initAdapters(filtersData, sortData, derivedAdapter) {
    this.filtersData = filtersData;
    this.sortData = sortData;
    this.derivedAdapter = derivedAdapter;
    this.sortFn = this.createSortFn();
  }
};
var _sortData, _indexUpdate2, _unsubscribe;
var AdapterSort = class {
  /**
   * @param indexUpdate - Function to update indexer.
   *
   * @param sortData - Storage for compare function.
   */
  constructor(indexUpdate, sortData) {
    __privateAdd(this, _sortData, void 0);
    __privateAdd(this, _indexUpdate2, void 0);
    __privateAdd(this, _unsubscribe, void 0);
    __privateSet(this, _indexUpdate2, indexUpdate);
    __privateSet(this, _sortData, sortData);
    Object.freeze(this);
  }
  /**
   * Clears & removes any assigned sort function and triggers an index update.
   */
  clear() {
    const oldCompareFn = __privateGet(this, _sortData).compareFn;
    __privateGet(this, _sortData).compareFn = null;
    if (typeof __privateGet(this, _unsubscribe) === "function") {
      __privateGet(this, _unsubscribe).call(this);
      __privateSet(this, _unsubscribe, void 0);
    }
    if (typeof oldCompareFn === "function") {
      __privateGet(this, _indexUpdate2).call(this);
    }
  }
  /**
   * @param data - A callback function that compares two values. Return > 0 to sort b before a;
   * < 0 to sort a before b; or 0 to keep original order of a & b.
   *
   * Note: You can set a compare function that also has a subscribe function attached as the `subscribe` attribute.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#parameters
   */
  set(data) {
    if (typeof __privateGet(this, _unsubscribe) === "function") {
      __privateGet(this, _unsubscribe).call(this);
      __privateSet(this, _unsubscribe, void 0);
    }
    let compareFn = void 0;
    let subscribeFn = void 0;
    switch (typeof data) {
      case "function":
        compareFn = data;
        subscribeFn = data.subscribe;
        break;
      case "object":
        if (data === null) {
          break;
        }
        if (typeof data.compare !== "function") {
          throw new TypeError(`AdapterSort error: 'compare' attribute is not a function.`);
        }
        compareFn = data.compare;
        subscribeFn = data.compare.subscribe ?? data.subscribe;
        break;
    }
    if (typeof compareFn === "function") {
      __privateGet(this, _sortData).compareFn = compareFn;
    } else {
      const oldCompareFn = __privateGet(this, _sortData).compareFn;
      __privateGet(this, _sortData).compareFn = null;
      if (typeof oldCompareFn === "function") {
        __privateGet(this, _indexUpdate2).call(this);
      }
      return;
    }
    if (typeof subscribeFn === "function") {
      __privateSet(this, _unsubscribe, subscribeFn(__privateGet(this, _indexUpdate2)));
      if (typeof __privateGet(this, _unsubscribe) !== "function") {
        throw new Error(`AdapterSort error: sort has 'subscribe' function, but no 'unsubscribe' function is returned.`);
      }
    } else {
      __privateGet(this, _indexUpdate2).call(this);
    }
  }
};
_sortData = new WeakMap();
_indexUpdate2 = new WeakMap();
_unsubscribe = new WeakMap();
var _indexData;
var IndexerAPI = class {
  constructor(adapterIndexer) {
    __privateAdd(this, _indexData, void 0);
    /**
     * Provides a getter to determine if the index is active.
     */
    __publicField(this, "active");
    /**
     * Provides length of reduced / indexed elements.
     */
    __publicField(this, "length");
    /**
     * Manually invoke an update of the index.
     *
     * @param force - Force update to any subscribers.
     */
    __publicField(this, "update");
    __privateSet(this, _indexData, adapterIndexer.indexData);
    this.update = adapterIndexer.update.bind(adapterIndexer);
    Object.defineProperties(this, {
      active: { get: () => adapterIndexer.active },
      length: { get: () => adapterIndexer.length }
    });
    Object.freeze(this);
  }
  /**
   * - Current hash value of the index.
   */
  get hash() {
    return __privateGet(this, _indexData).hash;
  }
  /**
   * Provides an iterator over the index array.
   *
   * @returns Iterator / generator
   * @yields {K}
   */
  *[Symbol.iterator]() {
    const indexData = __privateGet(this, _indexData);
    if (!indexData.index) {
      return;
    }
    const reversed = indexData.reversed;
    const length = indexData.index.length;
    if (reversed) {
      for (let cntr = length; --cntr >= 0; ) {
        yield indexData.index[cntr];
      }
    } else {
      for (let cntr = 0; cntr < length; cntr++) {
        yield indexData.index[cntr];
      }
    }
  }
};
_indexData = new WeakMap();
var DerivedAPI = class {
  constructor(adapterDerived) {
    /**
     * Removes all derived reducers and associated subscriptions.
     */
    __publicField(this, "clear");
    /**
     * @param options - Options for creating a reducer.
     *
     * @returns Newly created derived reducer.
     */
    __publicField(this, "create");
    /**
     * Deletes and destroys a derived reducer.
     *
     * @param name - Name of the derived reducer
     */
    __publicField(this, "delete");
    /**
     * Removes all derived reducers, associated subscriptions, and cleans up all resources.
     */
    __publicField(this, "destroy");
    /**
     * Returns an existing derived reducer.
     *
     * @param name - Name of derived reducer.
     */
    __publicField(this, "get");
    this.clear = adapterDerived.clear.bind(adapterDerived);
    this.create = adapterDerived.create.bind(adapterDerived);
    this.delete = adapterDerived.delete.bind(adapterDerived);
    this.destroy = adapterDerived.destroy.bind(adapterDerived);
    this.get = adapterDerived.get.bind(adapterDerived);
    Object.freeze(this);
  }
};
var Indexer$1 = class extends AdapterIndexer {
  /**
   * @inheritDoc
   */
  createSortFn() {
    return (a, b) => this.sortData.compareFn(this.hostData[0][a], this.hostData[0][b]);
  }
  /**
   * Provides the custom filter / reduce step that is ~25-40% faster than implementing with `Array.reduce`.
   *
   * Note: Other loop unrolling techniques like Duff's Device gave a slight faster lower bound on large data sets,
   * but the maintenance factor is not worth the extra complication.
   *
   * @returns New filtered index array.
   */
  reduceImpl() {
    const data = [];
    const array = this.hostData[0];
    if (!array) {
      return data;
    }
    const filters = this.filtersData.filters;
    let include = true;
    const parentIndex = this.indexData.parent;
    if (DynReducerUtils.isIterable(parentIndex) && parentIndex.active) {
      for (const adjustedIndex of parentIndex) {
        const value = array[adjustedIndex];
        include = true;
        for (let filCntr = 0, filLength = filters.length; filCntr < filLength; filCntr++) {
          if (!filters[filCntr].filter(value)) {
            include = false;
            break;
          }
        }
        if (include) {
          data.push(adjustedIndex);
        }
      }
    } else {
      for (let cntr = 0, length = array.length; cntr < length; cntr++) {
        include = true;
        for (let filCntr = 0, filLength = filters.length; filCntr < filLength; filCntr++) {
          if (!filters[filCntr].filter(array[cntr])) {
            include = false;
            break;
          }
        }
        if (include) {
          data.push(cntr);
        }
      }
    }
    return data;
  }
  /**
   * Update the reducer indexes. If there are changes subscribers are notified. If data order is changed externally
   * pass in true to force an update to subscribers.
   *
   * @param [force=false] - When true forces an update to subscribers.
   */
  update(force = false) {
    var _a;
    if (this.destroyed) {
      return;
    }
    const oldIndex = this.indexData.index;
    const oldHash = this.indexData.hash;
    const array = this.hostData[0];
    const parentIndex = this.indexData.parent;
    if (this.filtersData.filters.length === 0 && !this.sortData.compareFn || this.indexData.index && (array == null ? void 0 : array.length) !== this.indexData.index.length) {
      this.indexData.index = null;
    }
    if (this.filtersData.filters.length > 0) {
      this.indexData.index = this.reduceImpl();
    }
    if (!this.indexData.index && (parentIndex == null ? void 0 : parentIndex.active)) {
      this.indexData.index = [...parentIndex];
    }
    if (this.sortData.compareFn && Array.isArray(array)) {
      if (!this.indexData.index) {
        this.indexData.index = [...Array(array.length).keys()];
      }
      this.indexData.index.sort(this.sortFn);
    }
    this.calcHashUpdate(oldIndex, oldHash, force);
    (_a = this.derivedAdapter) == null ? void 0 : _a.update(force);
  }
};
var _array, _derived2, _derivedPublicAPI, _filters, _filtersData2, _index, _indexPublicAPI, _reversed, _sort, _sortData2, _subscriptions, _destroyed2, _updateSubscribers, updateSubscribers_fn;
var _DerivedArrayReducer = class {
  /**
   * @param array - Data host array.
   *
   * @param parentIndex - Parent indexer.
   *
   * @param options - Any filters and sort functions to apply.
   */
  constructor(array, parentIndex, options) {
    /**
     * Updates subscribers on changes.
     */
    __privateAdd(this, _updateSubscribers);
    __privateAdd(this, _array, void 0);
    __privateAdd(this, _derived2, void 0);
    __privateAdd(this, _derivedPublicAPI, void 0);
    __privateAdd(this, _filters, void 0);
    __privateAdd(this, _filtersData2, { filters: [] });
    __privateAdd(this, _index, void 0);
    __privateAdd(this, _indexPublicAPI, void 0);
    __privateAdd(this, _reversed, false);
    __privateAdd(this, _sort, void 0);
    __privateAdd(this, _sortData2, { compareFn: null });
    __privateAdd(this, _subscriptions, []);
    __privateAdd(this, _destroyed2, false);
    __privateSet(this, _array, array);
    __privateSet(this, _index, new Indexer$1(__privateGet(this, _array), __privateMethod(this, _updateSubscribers, updateSubscribers_fn).bind(this), parentIndex));
    __privateSet(this, _indexPublicAPI, new IndexerAPI(__privateGet(this, _index)));
    __privateSet(this, _filters, new AdapterFilters(__privateGet(this, _indexPublicAPI).update, __privateGet(this, _filtersData2)));
    __privateSet(this, _sort, new AdapterSort(__privateGet(this, _indexPublicAPI).update, __privateGet(this, _sortData2)));
    __privateSet(this, _derived2, new AdapterDerived(__privateGet(this, _array), __privateGet(this, _indexPublicAPI), _DerivedArrayReducer));
    __privateSet(this, _derivedPublicAPI, new DerivedAPI(__privateGet(this, _derived2)));
    __privateGet(this, _index).initAdapters(__privateGet(this, _filtersData2), __privateGet(this, _sortData2), __privateGet(this, _derived2));
    let filters = void 0;
    let sort = void 0;
    if (options !== void 0 && ("filters" in options || "sort" in options)) {
      if (options.filters !== void 0) {
        if (DynReducerUtils.isIterable(options.filters)) {
          filters = options.filters;
        } else {
          throw new TypeError(`DerivedArrayReducer error (DataDerivedOptions): 'filters' attribute is not iterable.`);
        }
      }
      if (options.sort !== void 0) {
        if (typeof options.sort === "function") {
          sort = options.sort;
        } else if (typeof options.sort === "object" && options.sort !== null) {
          sort = options.sort;
        } else {
          throw new TypeError(`DerivedArrayReducer error (DataDerivedOptions): 'sort' attribute is not a function or object.`);
        }
      }
    }
    if (filters) {
      this.filters.add(...filters);
    }
    if (sort) {
      this.sort.set(sort);
    }
    this.initialize();
  }
  /**
   * Returns the internal data of this instance. Be careful!
   *
   * Note: if an array is set as initial data then that array is used as the internal data. If any changes are
   * performed to the data externally do invoke {@link IndexerAPI.update} with `true` to recalculate the index and
   * notify all subscribers.
   *
   * @returns The internal data.
   */
  get data() {
    return __privateGet(this, _array)[0];
  }
  /**
   * @returns Derived public API.
   */
  get derived() {
    return __privateGet(this, _derivedPublicAPI);
  }
  /**
   * @returns The filters adapter.
   */
  get filters() {
    return __privateGet(this, _filters);
  }
  /**
   * Returns the Indexer public API.
   *
   * @returns Indexer API - is also iterable.
   */
  get index() {
    return __privateGet(this, _indexPublicAPI);
  }
  /**
   * Returns whether this derived reducer is destroyed.
   */
  get destroyed() {
    return __privateGet(this, _destroyed2);
  }
  /**
   * @returns Main data / items length or indexed length.
   */
  get length() {
    const array = __privateGet(this, _array)[0];
    return __privateGet(this, _index).active ? this.index.length : array ? array.length : 0;
  }
  /**
   * @returns Gets current reversed state.
   */
  get reversed() {
    return __privateGet(this, _reversed);
  }
  /**
   * @returns The sort adapter.
   */
  get sort() {
    return __privateGet(this, _sort);
  }
  /**
   * Sets reversed state and notifies subscribers.
   *
   * @param reversed - New reversed state.
   */
  set reversed(reversed) {
    if (typeof reversed !== "boolean") {
      throw new TypeError(`DerivedArrayReducer.reversed error: 'reversed' is not a boolean.`);
    }
    __privateSet(this, _reversed, reversed);
    __privateGet(this, _index).reversed = reversed;
    this.index.update(true);
  }
  /**
   * Removes all derived reducers, subscriptions, and cleans up all resources.
   */
  destroy() {
    __privateSet(this, _destroyed2, true);
    __privateSet(this, _array, [null]);
    __privateGet(this, _index).update(true);
    __privateGet(this, _subscriptions).length = 0;
    __privateGet(this, _derived2).destroy();
    __privateGet(this, _index).destroy();
    __privateGet(this, _filters).clear();
    __privateGet(this, _sort).clear();
  }
  /**
   * Provides a callback for custom derived reducers to initialize any data / custom configuration. This allows
   * child classes to avoid implementing the constructor.
   *
   * @protected
   */
  initialize() {
  }
  /**
   * Provides an iterator for data stored in DerivedArrayReducer.
   *
   * @returns Generator / iterator of all data.
   */
  *[Symbol.iterator]() {
    const array = __privateGet(this, _array)[0];
    if (__privateGet(this, _destroyed2) || array === null || (array == null ? void 0 : array.length) === 0) {
      return;
    }
    if (__privateGet(this, _index).active) {
      for (const entry of this.index) {
        yield array[entry];
      }
    } else {
      if (this.reversed) {
        for (let cntr = array.length; --cntr >= 0; ) {
          yield array[cntr];
        }
      } else {
        for (let cntr = 0; cntr < array.length; cntr++) {
          yield array[cntr];
        }
      }
    }
  }
  // -------------------------------------------------------------------------------------------------------------------
  /**
   * Subscribe to this DerivedArrayReducer.
   *
   * @param handler - Callback function that is invoked on update / changes. Receives `this` reference.
   *
   * @returns Unsubscribe function.
   */
  subscribe(handler) {
    __privateGet(this, _subscriptions).push(handler);
    handler(this);
    return () => {
      const index = __privateGet(this, _subscriptions).findIndex((sub) => sub === handler);
      if (index >= 0) {
        __privateGet(this, _subscriptions).splice(index, 1);
      }
    };
  }
};
var DerivedArrayReducer = _DerivedArrayReducer;
_array = new WeakMap();
_derived2 = new WeakMap();
_derivedPublicAPI = new WeakMap();
_filters = new WeakMap();
_filtersData2 = new WeakMap();
_index = new WeakMap();
_indexPublicAPI = new WeakMap();
_reversed = new WeakMap();
_sort = new WeakMap();
_sortData2 = new WeakMap();
_subscriptions = new WeakMap();
_destroyed2 = new WeakMap();
_updateSubscribers = new WeakSet();
updateSubscribers_fn = function() {
  for (let cntr = 0; cntr < __privateGet(this, _subscriptions).length; cntr++) {
    __privateGet(this, _subscriptions)[cntr](this);
  }
};
var _array2, _derived3, _derivedPublicAPI2, _filters2, _filtersData3, _index2, _indexPublicAPI2, _reversed2, _sort2, _sortData3, _subscriptions2, _destroyed3, _updateSubscribers2, updateSubscribers_fn2;
var DynArrayReducer = class {
  /**
   * Initializes DynArrayReducer. Any iterable is supported for initial data. Take note that if `data` is an array it
   * will be used as the host array and not copied. All non-array iterables otherwise create a new array / copy.
   *
   * @param [data] - Data iterable to store if array or copy otherwise.
   */
  constructor(data) {
    /**
     * Updates subscribers on changes.
     */
    __privateAdd(this, _updateSubscribers2);
    __privateAdd(this, _array2, [null]);
    __privateAdd(this, _derived3, void 0);
    __privateAdd(this, _derivedPublicAPI2, void 0);
    __privateAdd(this, _filters2, void 0);
    __privateAdd(this, _filtersData3, { filters: [] });
    __privateAdd(this, _index2, void 0);
    __privateAdd(this, _indexPublicAPI2, void 0);
    __privateAdd(this, _reversed2, false);
    __privateAdd(this, _sort2, void 0);
    __privateAdd(this, _sortData3, { compareFn: null });
    __privateAdd(this, _subscriptions2, []);
    __privateAdd(this, _destroyed3, false);
    let dataIterable = void 0;
    let filters = void 0;
    let sort = void 0;
    if (data === null) {
      throw new TypeError(`DynArrayReducer error: 'data' is not iterable.`);
    }
    if (data !== void 0 && typeof data !== "object" && !DynReducerUtils.isIterable(data)) {
      throw new TypeError(`DynArrayReducer error: 'data' is not iterable.`);
    }
    if (data !== void 0 && Symbol.iterator in data) {
      dataIterable = data;
    } else if (data !== void 0 && ("data" in data || "filters" in data || "sort" in data)) {
      if (data.data !== void 0 && !DynReducerUtils.isIterable(data.data)) {
        throw new TypeError(`DynArrayReducer error (DataDynArray): 'data' attribute is not iterable.`);
      }
      dataIterable = data.data;
      if (data.filters !== void 0) {
        if (DynReducerUtils.isIterable(data.filters)) {
          filters = data.filters;
        } else {
          throw new TypeError(`DynArrayReducer error (DataDynArray): 'filters' attribute is not iterable.`);
        }
      }
      if (data.sort !== void 0) {
        if (typeof data.sort === "function") {
          sort = data.sort;
        } else if (typeof data.sort === "object" && data.sort !== null) {
          sort = data.sort;
        } else {
          throw new TypeError(`DynArrayReducer error (DataDynArray): 'sort' attribute is not a function or object.`);
        }
      }
    }
    if (dataIterable) {
      __privateGet(this, _array2)[0] = Array.isArray(dataIterable) ? dataIterable : [...dataIterable];
    }
    __privateSet(this, _index2, new Indexer$1(__privateGet(this, _array2), __privateMethod(this, _updateSubscribers2, updateSubscribers_fn2).bind(this)));
    __privateSet(this, _indexPublicAPI2, new IndexerAPI(__privateGet(this, _index2)));
    __privateSet(this, _filters2, new AdapterFilters(__privateGet(this, _indexPublicAPI2).update, __privateGet(this, _filtersData3)));
    __privateSet(this, _sort2, new AdapterSort(__privateGet(this, _indexPublicAPI2).update, __privateGet(this, _sortData3)));
    __privateSet(this, _derived3, new AdapterDerived(__privateGet(this, _array2), __privateGet(this, _indexPublicAPI2), DerivedArrayReducer));
    __privateSet(this, _derivedPublicAPI2, new DerivedAPI(__privateGet(this, _derived3)));
    __privateGet(this, _index2).initAdapters(__privateGet(this, _filtersData3), __privateGet(this, _sortData3), __privateGet(this, _derived3));
    if (filters) {
      this.filters.add(...filters);
    }
    if (sort) {
      this.sort.set(sort);
    }
    this.initialize();
  }
  /**
   * Returns the internal data of this instance. Be careful!
   *
   * Note: if an array is set as initial data then that array is used as the internal data. If any changes are
   * performed to the data externally do invoke {@link AdapterIndexer.index.update} with `true` to recalculate the
   * index and notify all subscribers.
   *
   * @returns The internal data.
   */
  get data() {
    return __privateGet(this, _array2)[0];
  }
  /**
   * @returns Derived public API.
   */
  get derived() {
    return __privateGet(this, _derivedPublicAPI2);
  }
  /**
   * @returns The filters adapter.
   */
  get filters() {
    return __privateGet(this, _filters2);
  }
  /**
   * @returns Returns the Indexer public API.
   */
  get index() {
    return __privateGet(this, _indexPublicAPI2);
  }
  /**
   * Returns whether this instance is destroyed.
   */
  get destroyed() {
    return __privateGet(this, _destroyed3);
  }
  /**
   * Gets the main data / items length.
   *
   * @returns {number} Main data / items length.
   */
  get length() {
    const array = __privateGet(this, _array2)[0];
    return __privateGet(this, _index2).active ? __privateGet(this, _indexPublicAPI2).length : array ? array.length : 0;
  }
  /**
   * Gets current reversed state.
   *
   * @returns {boolean} Reversed state.
   */
  get reversed() {
    return __privateGet(this, _reversed2);
  }
  /**
   * @returns The sort adapter.
   */
  get sort() {
    return __privateGet(this, _sort2);
  }
  /**
   * Sets reversed state and notifies subscribers.
   *
   * @param reversed - New reversed state.
   */
  set reversed(reversed) {
    if (typeof reversed !== "boolean") {
      throw new TypeError(`DynArrayReducer.reversed error: 'reversed' is not a boolean.`);
    }
    __privateSet(this, _reversed2, reversed);
    __privateGet(this, _index2).reversed = reversed;
    this.index.update(true);
  }
  /**
   * Removes all derived reducers, subscriptions, and cleans up all resources.
   */
  destroy() {
    if (__privateGet(this, _destroyed3)) {
      return;
    }
    __privateSet(this, _destroyed3, true);
    __privateGet(this, _derived3).destroy();
    __privateSet(this, _array2, [null]);
    this.index.update(true);
    __privateGet(this, _subscriptions2).length = 0;
    __privateGet(this, _index2).destroy();
    __privateGet(this, _filters2).clear();
    __privateGet(this, _sort2).clear();
  }
  /**
   * Provides a callback for custom reducers to initialize any data / custom configuration. This allows
   * child classes to avoid implementing the constructor.
   *
   * @protected
   */
  initialize() {
  }
  /**
   * Removes internal data and pushes new data. This does not destroy any initial array set to internal data unless
   * `replace` is set to true.
   *
   * @param data - New data to set to internal data.
   *
   * @param replace=false - New data to set to internal data.
   */
  setData(data, replace = false) {
    if (data !== null && !DynReducerUtils.isIterable(data)) {
      throw new TypeError(`DynArrayReducer.setData error: 'data' is not iterable.`);
    }
    if (typeof replace !== "boolean") {
      throw new TypeError(`DynArrayReducer.setData error: 'replace' is not a boolean.`);
    }
    const array = __privateGet(this, _array2)[0];
    if (!Array.isArray(array) || replace) {
      if (data) {
        __privateGet(this, _array2)[0] = Array.isArray(data) ? data : [...data];
      }
    } else {
      if (data) {
        array.length = 0;
        array.push(...data);
      } else {
        __privateGet(this, _array2)[0] = null;
      }
    }
    this.index.update(true);
  }
  /**
   * Add a subscriber to this DynArrayReducer instance.
   *
   * @param handler - Callback function that is invoked on update / changes. Receives `this` reference.
   *
   * @returns Unsubscribe function.
   */
  subscribe(handler) {
    __privateGet(this, _subscriptions2).push(handler);
    handler(this);
    return () => {
      const index = __privateGet(this, _subscriptions2).findIndex((sub) => sub === handler);
      if (index >= 0) {
        __privateGet(this, _subscriptions2).splice(index, 1);
      }
    };
  }
  /**
   * Provides an iterator for data stored in DynArrayReducer.
   *
   * @returns Generator / iterator of all data.
   * @yields {T}
   */
  *[Symbol.iterator]() {
    const array = __privateGet(this, _array2)[0];
    if (__privateGet(this, _destroyed3) || array === null || (array == null ? void 0 : array.length) === 0) {
      return;
    }
    if (__privateGet(this, _index2).active) {
      for (const entry of this.index) {
        yield array[entry];
      }
    } else {
      if (this.reversed) {
        for (let cntr = array.length; --cntr >= 0; ) {
          yield array[cntr];
        }
      } else {
        for (let cntr = 0; cntr < array.length; cntr++) {
          yield array[cntr];
        }
      }
    }
  }
};
_array2 = new WeakMap();
_derived3 = new WeakMap();
_derivedPublicAPI2 = new WeakMap();
_filters2 = new WeakMap();
_filtersData3 = new WeakMap();
_index2 = new WeakMap();
_indexPublicAPI2 = new WeakMap();
_reversed2 = new WeakMap();
_sort2 = new WeakMap();
_sortData3 = new WeakMap();
_subscriptions2 = new WeakMap();
_destroyed3 = new WeakMap();
_updateSubscribers2 = new WeakSet();
updateSubscribers_fn2 = function() {
  for (let cntr = 0; cntr < __privateGet(this, _subscriptions2).length; cntr++) {
    __privateGet(this, _subscriptions2)[cntr](this);
  }
};
var Indexer = class extends AdapterIndexer {
  /**
   * @inheritDoc
   */
  createSortFn() {
    return (a, b) => this.sortData.compareFn(this.hostData[0].get(a), this.hostData[0].get(b));
  }
  /**
   * Provides the custom filter / reduce step that is ~25-40% faster than implementing with `Array.reduce`.
   *
   * Note: Other loop unrolling techniques like Duff's Device gave a slight faster lower bound on large data sets,
   * but the maintenance factor is not worth the extra complication.
   *
   * @returns New filtered index array.
   */
  reduceImpl() {
    const data = [];
    const map = this.hostData[0];
    if (!map) {
      return data;
    }
    const filters = this.filtersData.filters;
    let include = true;
    const parentIndex = this.indexData.parent;
    if (DynReducerUtils.isIterable(parentIndex) && parentIndex.active) {
      for (const key of parentIndex) {
        const value = map.get(key);
        include = true;
        for (let filCntr = 0, filLength = filters.length; filCntr < filLength; filCntr++) {
          if (!filters[filCntr].filter(value)) {
            include = false;
            break;
          }
        }
        if (include) {
          data.push(key);
        }
      }
    } else {
      for (const key of map.keys()) {
        include = true;
        const value = map.get(key);
        for (let filCntr = 0, filLength = filters.length; filCntr < filLength; filCntr++) {
          if (!filters[filCntr].filter(value)) {
            include = false;
            break;
          }
        }
        if (include) {
          data.push(key);
        }
      }
    }
    return data;
  }
  /**
   * Update the reducer indexes. If there are changes subscribers are notified. If data order is changed externally
   * pass in true to force an update to subscribers.
   *
   * @param [force=false] - When true forces an update to subscribers.
   */
  update(force = false) {
    var _a;
    if (this.destroyed) {
      return;
    }
    const oldIndex = this.indexData.index;
    const oldHash = this.indexData.hash;
    const map = this.hostData[0];
    const parentIndex = this.indexData.parent;
    if (this.filtersData.filters.length === 0 && !this.sortData.compareFn || this.indexData.index && (map == null ? void 0 : map.size) !== this.indexData.index.length) {
      this.indexData.index = null;
    }
    if (this.filtersData.filters.length > 0) {
      this.indexData.index = this.reduceImpl();
    }
    if (!this.indexData.index && (parentIndex == null ? void 0 : parentIndex.active)) {
      this.indexData.index = [...parentIndex];
    }
    if (this.sortData.compareFn && map instanceof Map) {
      if (!this.indexData.index) {
        this.indexData.index = this.indexData.index = [...map.keys()];
      }
      this.indexData.index.sort(this.sortFn);
    }
    this.calcHashUpdate(oldIndex, oldHash, force);
    (_a = this.derivedAdapter) == null ? void 0 : _a.update(force);
  }
};
var _map, _derived4, _derivedPublicAPI3, _filters3, _filtersData4, _index3, _indexPublicAPI3, _reversed3, _sort3, _sortData4, _subscriptions3, _destroyed4, _updateSubscribers3, updateSubscribers_fn3;
var _DerivedMapReducer = class {
  /**
   * @param map - Data host Map.
   *
   * @param parentIndex - Parent indexer.
   *
   * @param options - Any filters and sort functions to apply.
   */
  constructor(map, parentIndex, options) {
    /**
     * Updates subscribers on changes.
     */
    __privateAdd(this, _updateSubscribers3);
    __privateAdd(this, _map, void 0);
    __privateAdd(this, _derived4, void 0);
    __privateAdd(this, _derivedPublicAPI3, void 0);
    __privateAdd(this, _filters3, void 0);
    __privateAdd(this, _filtersData4, { filters: [] });
    __privateAdd(this, _index3, void 0);
    __privateAdd(this, _indexPublicAPI3, void 0);
    __privateAdd(this, _reversed3, false);
    __privateAdd(this, _sort3, void 0);
    __privateAdd(this, _sortData4, { compareFn: null });
    __privateAdd(this, _subscriptions3, []);
    __privateAdd(this, _destroyed4, false);
    __privateSet(this, _map, map);
    __privateSet(this, _index3, new Indexer(__privateGet(this, _map), __privateMethod(this, _updateSubscribers3, updateSubscribers_fn3).bind(this), parentIndex));
    __privateSet(this, _indexPublicAPI3, new IndexerAPI(__privateGet(this, _index3)));
    __privateSet(this, _filters3, new AdapterFilters(__privateGet(this, _indexPublicAPI3).update, __privateGet(this, _filtersData4)));
    __privateSet(this, _sort3, new AdapterSort(__privateGet(this, _indexPublicAPI3).update, __privateGet(this, _sortData4)));
    __privateSet(this, _derived4, new AdapterDerived(__privateGet(this, _map), __privateGet(this, _indexPublicAPI3), _DerivedMapReducer));
    __privateSet(this, _derivedPublicAPI3, new DerivedAPI(__privateGet(this, _derived4)));
    __privateGet(this, _index3).initAdapters(__privateGet(this, _filtersData4), __privateGet(this, _sortData4), __privateGet(this, _derived4));
    let filters = void 0;
    let sort = void 0;
    if (options !== void 0 && ("filters" in options || "sort" in options)) {
      if (options.filters !== void 0) {
        if (DynReducerUtils.isIterable(options.filters)) {
          filters = options.filters;
        } else {
          throw new TypeError(`DerivedMapReducer error (DataDerivedOptions): 'filters' attribute is not iterable.`);
        }
      }
      if (options.sort !== void 0) {
        if (typeof options.sort === "function") {
          sort = options.sort;
        } else if (typeof options.sort === "object" && options.sort !== null) {
          sort = options.sort;
        } else {
          throw new TypeError(`DerivedMapReducer error (DataDerivedOptions): 'sort' attribute is not a function or object.`);
        }
      }
    }
    if (filters) {
      this.filters.add(...filters);
    }
    if (sort) {
      this.sort.set(sort);
    }
    this.initialize();
  }
  /**
   * Returns the internal data of this instance. Be careful!
   *
   * Note: The returned map is the same map set by the main reducer. If any changes are performed to the data
   * externally do invoke {@link IndexerAPI.update} with `true` to recalculate the index and notify all subscribers.
   *
   * @returns The internal data.
   */
  get data() {
    return __privateGet(this, _map)[0];
  }
  /**
   * @returns Derived public API.
   */
  get derived() {
    return __privateGet(this, _derivedPublicAPI3);
  }
  /**
   * @returns The filters adapter.
   */
  get filters() {
    return __privateGet(this, _filters3);
  }
  /**
   * Returns the Indexer public API.
   *
   * @returns Indexer API - is also iterable.
   */
  get index() {
    return __privateGet(this, _indexPublicAPI3);
  }
  /**
   * Returns whether this derived reducer is destroyed.
   */
  get destroyed() {
    return __privateGet(this, _destroyed4);
  }
  /**
   * @returns Main data / items length or indexed length.
   */
  get length() {
    const map = __privateGet(this, _map)[0];
    return __privateGet(this, _index3).active ? this.index.length : map ? map.size : 0;
  }
  /**
   * @returns Gets current reversed state.
   */
  get reversed() {
    return __privateGet(this, _reversed3);
  }
  /**
   * @returns The sort adapter.
   */
  get sort() {
    return __privateGet(this, _sort3);
  }
  /**
   * Sets reversed state and notifies subscribers.
   *
   * @param reversed - New reversed state.
   */
  set reversed(reversed) {
    if (typeof reversed !== "boolean") {
      throw new TypeError(`DerivedMapReducer.reversed error: 'reversed' is not a boolean.`);
    }
    __privateSet(this, _reversed3, reversed);
    __privateGet(this, _index3).reversed = reversed;
    this.index.update(true);
  }
  /**
   * Removes all derived reducers, subscriptions, and cleans up all resources.
   */
  destroy() {
    __privateSet(this, _destroyed4, true);
    __privateSet(this, _map, [null]);
    __privateGet(this, _index3).update(true);
    __privateGet(this, _subscriptions3).length = 0;
    __privateGet(this, _derived4).destroy();
    __privateGet(this, _index3).destroy();
    __privateGet(this, _filters3).clear();
    __privateGet(this, _sort3).clear();
  }
  /**
   * Provides a callback for custom derived reducers to initialize any data / custom configuration. This allows
   * child classes to avoid implementing the constructor.
   *
   * @protected
   */
  initialize() {
  }
  /**
   * Provides an iterator for data stored in DerivedMapReducer.
   *
   * @returns Generator / iterator of all data.
   */
  *[Symbol.iterator]() {
    const map = __privateGet(this, _map)[0];
    if (__privateGet(this, _destroyed4) || map === null || (map == null ? void 0 : map.size) === 0) {
      return;
    }
    if (__privateGet(this, _index3).active) {
      for (const key of this.index) {
        yield map.get(key);
      }
    } else {
      if (this.reversed) {
        const values = [...map.values()];
        for (let cntr = values.length; --cntr >= 0; ) {
          yield values[cntr];
        }
      } else {
        for (const value of map.values()) {
          yield value;
        }
      }
    }
  }
  // -------------------------------------------------------------------------------------------------------------------
  /**
   * Subscribe to this DerivedMapReducer.
   *
   * @param handler - Callback function that is invoked on update / changes. Receives `this` reference.
   *
   * @returns Unsubscribe function.
   */
  subscribe(handler) {
    __privateGet(this, _subscriptions3).push(handler);
    handler(this);
    return () => {
      const index = __privateGet(this, _subscriptions3).findIndex((sub) => sub === handler);
      if (index >= 0) {
        __privateGet(this, _subscriptions3).splice(index, 1);
      }
    };
  }
};
var DerivedMapReducer = _DerivedMapReducer;
_map = new WeakMap();
_derived4 = new WeakMap();
_derivedPublicAPI3 = new WeakMap();
_filters3 = new WeakMap();
_filtersData4 = new WeakMap();
_index3 = new WeakMap();
_indexPublicAPI3 = new WeakMap();
_reversed3 = new WeakMap();
_sort3 = new WeakMap();
_sortData4 = new WeakMap();
_subscriptions3 = new WeakMap();
_destroyed4 = new WeakMap();
_updateSubscribers3 = new WeakSet();
updateSubscribers_fn3 = function() {
  for (let cntr = 0; cntr < __privateGet(this, _subscriptions3).length; cntr++) {
    __privateGet(this, _subscriptions3)[cntr](this);
  }
};
var _map2, _derived5, _derivedPublicAPI4, _filters4, _filtersData5, _index4, _indexPublicAPI4, _reversed4, _sort4, _sortData5, _subscriptions4, _destroyed5, _updateSubscribers4, updateSubscribers_fn4;
var DynMapReducer = class {
  /**
   * Initializes DynMapReducer. Any iterable is supported for initial data. Take note that if `data` is an array it
   * will be used as the host array and not copied. All non-array iterables otherwise create a new array / copy.
   *
   * @param [data] - Data iterable to store if array or copy otherwise.
   */
  constructor(data) {
    /**
     * Updates subscribers on changes.
     */
    __privateAdd(this, _updateSubscribers4);
    __privateAdd(this, _map2, [null]);
    __privateAdd(this, _derived5, void 0);
    __privateAdd(this, _derivedPublicAPI4, void 0);
    __privateAdd(this, _filters4, void 0);
    __privateAdd(this, _filtersData5, { filters: [] });
    __privateAdd(this, _index4, void 0);
    __privateAdd(this, _indexPublicAPI4, void 0);
    __privateAdd(this, _reversed4, false);
    __privateAdd(this, _sort4, void 0);
    __privateAdd(this, _sortData5, { compareFn: null });
    __privateAdd(this, _subscriptions4, []);
    __privateAdd(this, _destroyed5, false);
    let dataMap = void 0;
    let filters = void 0;
    let sort = void 0;
    if (data === null) {
      throw new TypeError(`DynMapReducer error: 'data' is not an object or Map.`);
    }
    if (data !== void 0 && typeof data !== "object" && !(data instanceof Map)) {
      throw new TypeError(`DynMapReducer error: 'data' is not an object or Map.`);
    }
    if (data !== void 0 && data instanceof Map) {
      dataMap = data;
    } else if (data !== void 0 && ("data" in data || "filters" in data || "sort" in data)) {
      if (data.data !== void 0 && !(data.data instanceof Map)) {
        throw new TypeError(`DynMapReducer error (DataDynMap): 'data' attribute is not a Map.`);
      }
      dataMap = data.data;
      if (data.filters !== void 0) {
        if (DynReducerUtils.isIterable(data.filters)) {
          filters = data.filters;
        } else {
          throw new TypeError(`DynMapReducer error (DataDynMap): 'filters' attribute is not iterable.`);
        }
      }
      if (data.sort !== void 0) {
        if (typeof data.sort === "function") {
          sort = data.sort;
        } else if (typeof data.sort === "object" && data.sort !== null) {
          sort = data.sort;
        } else {
          throw new TypeError(`DynMapReducer error (DataDynMap): 'sort' attribute is not a function or object.`);
        }
      }
    }
    if (dataMap) {
      __privateGet(this, _map2)[0] = dataMap;
    }
    __privateSet(this, _index4, new Indexer(__privateGet(this, _map2), __privateMethod(this, _updateSubscribers4, updateSubscribers_fn4).bind(this)));
    __privateSet(this, _indexPublicAPI4, new IndexerAPI(__privateGet(this, _index4)));
    __privateSet(this, _filters4, new AdapterFilters(__privateGet(this, _indexPublicAPI4).update, __privateGet(this, _filtersData5)));
    __privateSet(this, _sort4, new AdapterSort(__privateGet(this, _indexPublicAPI4).update, __privateGet(this, _sortData5)));
    __privateSet(this, _derived5, new AdapterDerived(__privateGet(this, _map2), __privateGet(this, _indexPublicAPI4), DerivedMapReducer));
    __privateSet(this, _derivedPublicAPI4, new DerivedAPI(__privateGet(this, _derived5)));
    __privateGet(this, _index4).initAdapters(__privateGet(this, _filtersData5), __privateGet(this, _sortData5), __privateGet(this, _derived5));
    if (filters) {
      this.filters.add(...filters);
    }
    if (sort) {
      this.sort.set(sort);
    }
    this.initialize();
  }
  /**
   * Returns the internal data of this instance. Be careful!
   *
   * Note: When a map is set as data then that map is used as the internal data. If any changes are
   * performed to the data externally do invoke {@link AdapterIndexer.index.update} with `true` to recalculate the
   * index and notify all subscribers.
   *
   * @returns The internal data.
   */
  get data() {
    return __privateGet(this, _map2)[0];
  }
  /**
   * @returns Derived public API.
   */
  get derived() {
    return __privateGet(this, _derivedPublicAPI4);
  }
  /**
   * @returns The filters adapter.
   */
  get filters() {
    return __privateGet(this, _filters4);
  }
  /**
   * @returns Returns the Indexer public API.
   */
  get index() {
    return __privateGet(this, _indexPublicAPI4);
  }
  /**
   * Returns whether this instance is destroyed.
   */
  get destroyed() {
    return __privateGet(this, _destroyed5);
  }
  /**
   * Gets the main data / items length.
   *
   * @returns {number} Main data / items length.
   */
  get length() {
    const map = __privateGet(this, _map2)[0];
    return __privateGet(this, _index4).active ? __privateGet(this, _indexPublicAPI4).length : map ? map.size : 0;
  }
  /**
   * Gets current reversed state.
   *
   * @returns {boolean} Reversed state.
   */
  get reversed() {
    return __privateGet(this, _reversed4);
  }
  /**
   * @returns The sort adapter.
   */
  get sort() {
    return __privateGet(this, _sort4);
  }
  /**
   * Sets reversed state and notifies subscribers.
   *
   * @param reversed - New reversed state.
   */
  set reversed(reversed) {
    if (typeof reversed !== "boolean") {
      throw new TypeError(`DynMapReducer.reversed error: 'reversed' is not a boolean.`);
    }
    __privateSet(this, _reversed4, reversed);
    __privateGet(this, _index4).reversed = reversed;
    this.index.update(true);
  }
  /**
   * Removes all derived reducers, subscriptions, and cleans up all resources.
   */
  destroy() {
    if (__privateGet(this, _destroyed5)) {
      return;
    }
    __privateSet(this, _destroyed5, true);
    __privateGet(this, _derived5).destroy();
    __privateSet(this, _map2, [null]);
    this.index.update(true);
    __privateGet(this, _subscriptions4).length = 0;
    __privateGet(this, _index4).destroy();
    __privateGet(this, _filters4).clear();
    __privateGet(this, _sort4).clear();
  }
  /**
   * Provides a callback for custom reducers to initialize any data / custom configuration. This allows
   * child classes to avoid implementing the constructor.
   *
   * @protected
   */
  initialize() {
  }
  /**
   * Removes internal data and pushes new data. This does not destroy any initial array set to internal data unless
   * `replace` is set to true.
   *
   * @param data - New data to set to internal data.
   *
   * @param replace=false - New data to set to internal data.
   */
  setData(data, replace = false) {
    if (data !== null && !(data instanceof Map)) {
      throw new TypeError(`DynMapReducer.setData error: 'data' is not iterable.`);
    }
    if (typeof replace !== "boolean") {
      throw new TypeError(`DynMapReducer.setData error: 'replace' is not a boolean.`);
    }
    const map = __privateGet(this, _map2)[0];
    if (!(map instanceof Map) || replace) {
      __privateGet(this, _map2)[0] = data instanceof Map ? data : null;
    } else if (data instanceof Map && map instanceof Map) {
      const removeKeySet = new Set(map.keys());
      for (const key of data.keys()) {
        map.set(key, data.get(key));
        if (removeKeySet.has(key)) {
          removeKeySet.delete(key);
        }
      }
      for (const key of removeKeySet) {
        map.delete(key);
      }
    } else if (data === null) {
      __privateGet(this, _map2)[0] = null;
    }
    this.index.update(true);
  }
  /**
   * Add a subscriber to this DynMapReducer instance.
   *
   * @param handler - Callback function that is invoked on update / changes. Receives `this` reference.
   *
   * @returns Unsubscribe function.
   */
  subscribe(handler) {
    __privateGet(this, _subscriptions4).push(handler);
    handler(this);
    return () => {
      const index = __privateGet(this, _subscriptions4).findIndex((sub) => sub === handler);
      if (index >= 0) {
        __privateGet(this, _subscriptions4).splice(index, 1);
      }
    };
  }
  /**
   * Provides an iterator for data stored in DynMapReducer.
   *
   * @returns Generator / iterator of all data.
   * @yields {T}
   */
  *[Symbol.iterator]() {
    const map = __privateGet(this, _map2)[0];
    if (__privateGet(this, _destroyed5) || map === null || (map == null ? void 0 : map.size) === 0) {
      return;
    }
    if (__privateGet(this, _index4).active) {
      for (const key of this.index) {
        yield map.get(key);
      }
    } else {
      if (this.reversed) {
        const values = [...map.values()];
        for (let cntr = values.length; --cntr >= 0; ) {
          yield values[cntr];
        }
      } else {
        for (const value of map.values()) {
          yield value;
        }
      }
    }
  }
};
_map2 = new WeakMap();
_derived5 = new WeakMap();
_derivedPublicAPI4 = new WeakMap();
_filters4 = new WeakMap();
_filtersData5 = new WeakMap();
_index4 = new WeakMap();
_indexPublicAPI4 = new WeakMap();
_reversed4 = new WeakMap();
_sort4 = new WeakMap();
_sortData5 = new WeakMap();
_subscriptions4 = new WeakMap();
_destroyed5 = new WeakMap();
_updateSubscribers4 = new WeakSet();
updateSubscribers_fn4 = function() {
  for (let cntr = 0; cntr < __privateGet(this, _subscriptions4).length; cntr++) {
    __privateGet(this, _subscriptions4)[cntr](this);
  }
};
var _keySet, _keyMap, _options, _subscriptions5;
var KeyStore = class {
  /**
   * @param {Iterable<string>}  [keyNames] -
   *
   * @param {KeyStoreOptions}   [options] - Optional parameters
   */
  constructor(keyNames, options) {
    __privateAdd(this, _keySet, void 0);
    /**
     * @type {Map<string, number>}
     */
    __privateAdd(this, _keyMap, /* @__PURE__ */ new Map());
    /**
     * @type {KeyStoreOptions}
     */
    __privateAdd(this, _options, { preventDefault: true, useCode: true, stopPropagation: true });
    /**
     * Stores the subscribers.
     *
     * @type {(function(KeyStore): void)[]}
     */
    __privateAdd(this, _subscriptions5, []);
    if (!isIterable(keyNames)) {
      throw new TypeError(`'keyNames' is not an iterable list.`);
    }
    this.setOptions(options);
    __privateSet(this, _keySet, new Set(keyNames));
  }
  /**
   * Add given key to the tracking key set.
   *
   * @param {string}   key - Key to add.
   */
  addKey(key) {
    if (typeof key !== "string") {
      throw new TypeError(`'key' is not a string.`);
    }
    __privateGet(this, _keySet).add(key);
  }
  /**
   * @returns {boolean} True if any keys in the key set are pressed.
   */
  /**
   * Returns true if any of given keys are pressed. If `keys` is undefined then the result is true if any keys being
   * tracked are pressed.
   *
   * @param {string|Iterable<string>|undefined} keys - Zero or more key strings or list to verify if any pressed.
   *
   * @returns {boolean} True if any keys set are pressed.
   */
  anyPressed(keys) {
    if (keys === void 0) {
      return __privateGet(this, _keyMap).size > 0;
    }
    const isList = isIterable(keys);
    if (typeof keys !== "string" && !isList) {
      throw new TypeError(`'keys' is not a string or iterable list of strings.`);
    }
    let result = false;
    if (isList) {
      for (const key of keys) {
        if (__privateGet(this, _keyMap).has(key)) {
          result = true;
          break;
        }
      }
    } else {
      if (__privateGet(this, _keyMap).has(keys)) {
        result = true;
      }
    }
    return result;
  }
  /**
   * Is the given key in the tracking key set.
   *
   * @param {string}   key - Key to check.
   */
  hasKey(key) {
    if (typeof key !== "string") {
      throw new TypeError(`'key' is not a string.`);
    }
    __privateGet(this, _keySet).has(key);
  }
  /**
   * Returns true if all given keys are pressed.
   *
   * @param {string|Iterable<string>} keys - One or more key strings to verify if pressed.
   *
   * @returns {boolean} Are all keys pressed.
   */
  isPressed(keys) {
    const isList = isIterable(keys);
    if (typeof keys !== "string" && !isList) {
      throw new TypeError(`'keys' is not a string or iterable list of strings.`);
    }
    let result = true;
    if (isList) {
      for (const key of keys) {
        if (!__privateGet(this, _keyMap).has(key)) {
          result = false;
          break;
        }
      }
    } else {
      if (!__privateGet(this, _keyMap).has(keys)) {
        result = false;
      }
    }
    return result;
  }
  /**
   * Handle keydown event adding any key from the tracked key set.
   *
   * @param {KeyboardEvent}  event - KeyboardEvent.
   */
  keydown(event) {
    const key = __privateGet(this, _options).useCode ? event.code : event.key;
    if (__privateGet(this, _keySet).has(key)) {
      if (!__privateGet(this, _keyMap).has(key)) {
        __privateGet(this, _keyMap).set(key, 1);
        this._updateSubscribers();
      }
      if (__privateGet(this, _options).preventDefault) {
        event.preventDefault();
      }
      if (__privateGet(this, _options).stopPropagation) {
        event.stopPropagation();
      }
    }
  }
  /**
   * @returns {IterableIterator<string>} Returns current pressed keys iterator.
   */
  keysPressed() {
    return __privateGet(this, _keyMap).keys();
  }
  /**
   * @returns {IterableIterator<string>} Returns currently tracked keys iterator.
   */
  keysTracked() {
    return __privateGet(this, _keySet).keys();
  }
  /**
   * Handle keyup event removing any key from the tracked key set.
   *
   * @param {KeyboardEvent}  event - KeyboardEvent.
   */
  keyup(event) {
    const key = __privateGet(this, _options).useCode ? event.code : event.key;
    if (__privateGet(this, _keySet).has(key)) {
      if (__privateGet(this, _keyMap).has(key)) {
        __privateGet(this, _keyMap).delete(key);
        this._updateSubscribers();
      }
      if (__privateGet(this, _options).preventDefault) {
        event.preventDefault();
      }
      if (__privateGet(this, _options).stopPropagation) {
        event.stopPropagation();
      }
    }
  }
  /**
   * Remove the given key from the tracking key set.
   *
   * @param {string}   key - Key to remove.
   */
  removeKey(key) {
    if (typeof key !== "string") {
      throw new TypeError(`'key' is not a string.`);
    }
    if (__privateGet(this, _keySet).has(key)) {
      __privateGet(this, _keySet).delete(key);
      if (__privateGet(this, _keyMap).has(key)) {
        __privateGet(this, _keyMap).delete(key);
        this._updateSubscribers();
      }
    }
  }
  /**
   * Update options.
   *
   * @param {KeyStoreOptions}   options - Options to set.
   */
  setOptions(options) {
    if (typeof (options == null ? void 0 : options.preventDefault) === "boolean") {
      __privateGet(this, _options).preventDefault = options.preventDefault;
    }
    if (typeof (options == null ? void 0 : options.useCode) === "boolean") {
      __privateGet(this, _options).useCode = options.useCode;
    }
    if (typeof (options == null ? void 0 : options.stopPropagation) === "boolean") {
      __privateGet(this, _options).stopPropagation = options.stopPropagation;
    }
  }
  /**
   * @param {string}   key - key or key code to lookup.
   *
   * @returns {number} 1 if currently pressed and 0 if not pressed.
   */
  value(key) {
    return __privateGet(this, _keyMap).has(key) ? 1 : 0;
  }
  // Store subscriber implementation --------------------------------------------------------------------------------
  /**
   * @param {function(KeyStore): void} handler - Callback function that is invoked on update / changes.
   *
   * @returns {(function(): void)} Unsubscribe function.
   */
  subscribe(handler) {
    __privateGet(this, _subscriptions5).push(handler);
    handler(this);
    return () => {
      const index = __privateGet(this, _subscriptions5).findIndex((sub) => sub === handler);
      if (index >= 0) {
        __privateGet(this, _subscriptions5).splice(index, 1);
      }
    };
  }
  /**
   * Updates subscribers.
   *
   * @protected
   */
  _updateSubscribers() {
    for (let cntr = 0; cntr < __privateGet(this, _subscriptions5).length; cntr++) {
      __privateGet(this, _subscriptions5)[cntr](this);
    }
  }
};
_keySet = new WeakMap();
_keyMap = new WeakMap();
_options = new WeakMap();
_subscriptions5 = new WeakMap();
function isSimpleDeriver(deriver) {
  return deriver.length < 2;
}
function generator(storage2) {
  function readable(key, value, start) {
    return {
      subscribe: writable3(key, value, start).subscribe
    };
  }
  function writable3(key, value, start = noop) {
    function wrap_start(ogSet) {
      return start(function wrap_set(new_value) {
        if (storage2) {
          storage2.setItem(key, JSON.stringify(new_value));
        }
        return ogSet(new_value);
      });
    }
    if (storage2) {
      const storageValue = storage2.getItem(key);
      try {
        if (storageValue) {
          value = JSON.parse(storageValue);
        }
      } catch (err) {
      }
      storage2.setItem(key, JSON.stringify(value));
    }
    const ogStore = writable(value, start ? wrap_start : void 0);
    function set(new_value) {
      if (storage2) {
        storage2.setItem(key, JSON.stringify(new_value));
      }
      ogStore.set(new_value);
    }
    function update(fn) {
      set(fn(get_store_value(ogStore)));
    }
    function subscribe(run, invalidate = noop) {
      return ogStore.subscribe(run, invalidate);
    }
    return { set, update, subscribe };
  }
  function derived2(key, stores, fn, initial_value) {
    const single = !Array.isArray(stores);
    const stores_array = single ? [stores] : stores;
    if (storage2 && storage2.getItem(key)) {
      try {
        initial_value = JSON.parse(storage2.getItem(key));
      } catch (err) {
      }
    }
    return readable(key, initial_value, (set) => {
      let inited = false;
      const values = [];
      let pending = 0;
      let cleanup = noop;
      const sync = () => {
        if (pending) {
          return;
        }
        cleanup();
        const input = single ? values[0] : values;
        if (isSimpleDeriver(fn)) {
          set(fn(input));
        } else {
          const result = fn(input, set);
          cleanup = is_function(result) ? result : noop;
        }
      };
      const unsubscribers = stores_array.map((store, i) => store.subscribe((value) => {
        values[i] = value;
        pending &= ~(1 << i);
        if (inited) {
          sync();
        }
      }, () => {
        pending |= 1 << i;
      }));
      inited = true;
      sync();
      return function stop() {
        run_all(unsubscribers);
        cleanup();
      };
    });
  }
  return {
    readable,
    writable: writable3,
    derived: derived2,
    get: get_store_value
  };
}
var storage$1 = typeof window !== "undefined" ? window.localStorage : void 0;
var g$1 = generator(storage$1);
var writable$1 = g$1.writable;
var _stores, _createStore, createStore_fn, _getStore, getStore_fn;
var _TJSLocalStorage = class {
  constructor() {
    /**
     * Gets a store from the stores Map or creates a new store for the key and a given default value.
     *
     * @param {string}               key - Key to lookup in stores map.
     *
     * @param {boolean}              [defaultValue] - A default value to set for the store.
     *
     * @returns {import('svelte/store').Writable} The store for the given key.
     */
    __privateAdd(this, _getStore);
    /**
     * @type {Map<string, import('svelte/store').Writable>}
     */
    __privateAdd(this, _stores, /* @__PURE__ */ new Map());
  }
  /**
   * Get value from the localStorage.
   *
   * @param {string}   key - Key to lookup in localStorage.
   *
   * @param {*}        [defaultValue] - A default value to return if key not present in session storage.
   *
   * @returns {*} Value from session storage or if not defined any default value provided.
   */
  getItem(key, defaultValue) {
    let value = defaultValue;
    const storageValue = localStorage.getItem(key);
    if (storageValue !== null) {
      try {
        value = storageValue === "undefined" ? void 0 : JSON.parse(storageValue);
      } catch (err) {
        value = defaultValue;
      }
    } else if (defaultValue !== void 0) {
      try {
        const newValue = JSON.stringify(defaultValue);
        localStorage.setItem(key, newValue === "undefined" ? void 0 : newValue);
      } catch (err) {
      }
    }
    return value;
  }
  /**
   * Returns the backing Svelte store for the given key; potentially sets a default value if the key
   * is not already set.
   *
   * @param {string}   key - Key to lookup in localStorage.
   *
   * @param {*}        [defaultValue] - A default value to return if key not present in session storage.
   *
   * @returns {import('svelte/store').Writable} The Svelte store for this key.
   */
  getStore(key, defaultValue) {
    return __privateMethod(this, _getStore, getStore_fn).call(this, key, defaultValue);
  }
  /**
   * Sets the value for the given key in localStorage.
   *
   * @param {string}   key - Key to lookup in localStorage.
   *
   * @param {*}        value - A value to set for this key.
   */
  setItem(key, value) {
    const store = __privateMethod(this, _getStore, getStore_fn).call(this, key);
    store.set(value);
  }
  /**
   * Convenience method to swap a boolean value stored in session storage.
   *
   * @param {string}   key - Key to lookup in localStorage.
   *
   * @param {boolean}  [defaultValue] - A default value to return if key not present in session storage.
   *
   * @returns {boolean} The boolean swap for the given key.
   */
  swapItemBoolean(key, defaultValue) {
    const store = __privateMethod(this, _getStore, getStore_fn).call(this, key, defaultValue);
    let currentValue = false;
    try {
      currentValue = !!JSON.parse(localStorage.getItem(key));
    } catch (err) {
    }
    const newValue = typeof currentValue === "boolean" ? !currentValue : false;
    store.set(newValue);
    return newValue;
  }
};
var TJSLocalStorage = _TJSLocalStorage;
_stores = new WeakMap();
_createStore = new WeakSet();
createStore_fn = function(key, defaultValue = void 0) {
  try {
    const value = localStorage.getItem(key);
    if (value !== null) {
      defaultValue = value === "undefined" ? void 0 : JSON.parse(value);
    }
  } catch (err) {
  }
  return writable$1(key, defaultValue);
};
_getStore = new WeakSet();
getStore_fn = function(key, defaultValue = void 0) {
  var _a;
  let store = __privateGet(this, _stores).get(key);
  if (store === void 0) {
    store = __privateMethod(_a = _TJSLocalStorage, _createStore, createStore_fn).call(_a, key, defaultValue);
    __privateGet(this, _stores).set(key, store);
  }
  return store;
};
/**
 * Creates a new writable store for the given key.
 *
 * @param {string}   key - Key to lookup in stores map.
 *
 * @param {boolean}  [defaultValue] - A default value to set for the store.
 *
 * @returns {import('svelte/store').Writable} The new store.
 */
__privateAdd(TJSLocalStorage, _createStore);
var storage = typeof window !== "undefined" ? window.sessionStorage : void 0;
var g = generator(storage);
var writable2 = g.writable;
var _stores2, _createStore2, createStore_fn2, _getStore2, getStore_fn2;
var _TJSSessionStorage = class {
  constructor() {
    /**
     * Gets a store from the `stores` Map or creates a new store for the key and a given default value.
     *
     * @param {string}               key - Key to lookup in stores map.
     *
     * @param {boolean}              [defaultValue] - A default value to set for the store.
     *
     * @returns {import('svelte/store').Writable} The store for the given key.
     */
    __privateAdd(this, _getStore2);
    /**
     * @type {Map<string, import('svelte/store').Writable>}
     */
    __privateAdd(this, _stores2, /* @__PURE__ */ new Map());
  }
  /**
   * Get value from the sessionStorage.
   *
   * @param {string}   key - Key to lookup in sessionStorage.
   *
   * @param {*}        [defaultValue] - A default value to return if key not present in session storage.
   *
   * @returns {*} Value from session storage or if not defined any default value provided.
   */
  getItem(key, defaultValue) {
    let value = defaultValue;
    const storageValue = sessionStorage.getItem(key);
    if (storageValue !== null) {
      try {
        value = storageValue === "undefined" ? void 0 : JSON.parse(storageValue);
      } catch (err) {
        value = defaultValue;
      }
    } else if (defaultValue !== void 0) {
      try {
        const newValue = JSON.stringify(defaultValue);
        sessionStorage.setItem(key, newValue === "undefined" ? void 0 : newValue);
      } catch (err) {
      }
    }
    return value;
  }
  /**
   * Returns the backing Svelte store for the given key; potentially sets a default value if the key
   * is not already set.
   *
   * @param {string}   key - Key to lookup in sessionStorage.
   *
   * @param {*}        [defaultValue] - A default value to return if key not present in session storage.
   *
   * @returns {import('svelte/store').Writable} The Svelte store for this key.
   */
  getStore(key, defaultValue) {
    return __privateMethod(this, _getStore2, getStore_fn2).call(this, key, defaultValue);
  }
  /**
   * Sets the value for the given key in sessionStorage.
   *
   * @param {string}   key - Key to lookup in sessionStorage.
   *
   * @param {*}        value - A value to set for this key.
   */
  setItem(key, value) {
    const store = __privateMethod(this, _getStore2, getStore_fn2).call(this, key);
    store.set(value);
  }
  /**
   * Convenience method to swap a boolean value stored in session storage.
   *
   * @param {string}   key - Key to lookup in sessionStorage.
   *
   * @param {boolean}  [defaultValue] - A default value to return if key not present in session storage.
   *
   * @returns {boolean} The boolean swap for the given key.
   */
  swapItemBoolean(key, defaultValue) {
    const store = __privateMethod(this, _getStore2, getStore_fn2).call(this, key, defaultValue);
    let currentValue = false;
    try {
      currentValue = !!JSON.parse(sessionStorage.getItem(key));
    } catch (err) {
    }
    const newValue = typeof currentValue === "boolean" ? !currentValue : false;
    store.set(newValue);
    return newValue;
  }
};
var TJSSessionStorage = _TJSSessionStorage;
_stores2 = new WeakMap();
_createStore2 = new WeakSet();
createStore_fn2 = function(key, defaultValue = void 0) {
  try {
    const value = sessionStorage.getItem(key);
    if (value !== null) {
      defaultValue = value === "undefined" ? void 0 : JSON.parse(value);
    }
  } catch (err) {
  }
  return writable2(key, defaultValue);
};
_getStore2 = new WeakSet();
getStore_fn2 = function(key, defaultValue = void 0) {
  var _a;
  let store = __privateGet(this, _stores2).get(key);
  if (store === void 0) {
    store = __privateMethod(_a = _TJSSessionStorage, _createStore2, createStore_fn2).call(_a, key, defaultValue);
    __privateGet(this, _stores2).set(key, store);
  }
  return store;
};
/**
 * Creates a new store for the given key.
 *
 * @param {string}   key - Key to lookup in stores map.
 *
 * @param {boolean}  [defaultValue] - A default value to set for the store.
 *
 * @returns {import('svelte/store').Writable} The new store.
 */
__privateAdd(TJSSessionStorage, _createStore2);
function isReadableStore(store) {
  if (store === null || store === void 0) {
    return false;
  }
  switch (typeof store) {
    case "function":
    case "object":
      return typeof store.subscribe === "function";
  }
  return false;
}
function isUpdatableStore(store) {
  if (store === null || store === void 0) {
    return false;
  }
  switch (typeof store) {
    case "function":
    case "object":
      return typeof store.subscribe === "function" && typeof store.update === "function";
  }
  return false;
}
function isWritableStore(store) {
  if (store === null || store === void 0) {
    return false;
  }
  switch (typeof store) {
    case "function":
    case "object":
      return typeof store.subscribe === "function" && typeof store.set === "function";
  }
  return false;
}
function subscribeIgnoreFirst(store, update) {
  let firedFirst = false;
  return store.subscribe((value) => {
    if (!firedFirst) {
      firedFirst = true;
    } else {
      update(value);
    }
  });
}
function subscribeFirstRest(store, first, update) {
  let firedFirst = false;
  return store.subscribe((value) => {
    if (!firedFirst) {
      firedFirst = true;
      first(value);
    } else {
      update(value);
    }
  });
}
function writableDerived(origins, derive, reflect, initial) {
  var childDerivedSetter, originValues, blockNextDerive = false;
  var reflectOldValues = reflect.length >= 2;
  var wrappedDerive = (got, set) => {
    childDerivedSetter = set;
    if (reflectOldValues) {
      originValues = got;
    }
    if (!blockNextDerive) {
      let returned = derive(got, set);
      if (derive.length < 2) {
        set(returned);
      } else {
        return returned;
      }
    }
    blockNextDerive = false;
  };
  var childDerived = derived(origins, wrappedDerive, initial);
  var singleOrigin = !Array.isArray(origins);
  function doReflect(reflecting) {
    var setWith = reflect(reflecting, originValues);
    if (singleOrigin) {
      blockNextDerive = true;
      origins.set(setWith);
    } else {
      setWith.forEach((value, i) => {
        blockNextDerive = true;
        origins[i].set(value);
      });
    }
    blockNextDerive = false;
  }
  var tryingSet = false;
  function update(fn) {
    var isUpdated, mutatedBySubscriptions, oldValue, newValue;
    if (tryingSet) {
      newValue = fn(get_store_value(childDerived));
      childDerivedSetter(newValue);
      return;
    }
    var unsubscribe = childDerived.subscribe((value) => {
      if (!tryingSet) {
        oldValue = value;
      } else if (!isUpdated) {
        isUpdated = true;
      } else {
        mutatedBySubscriptions = true;
      }
    });
    newValue = fn(oldValue);
    tryingSet = true;
    childDerivedSetter(newValue);
    unsubscribe();
    tryingSet = false;
    if (mutatedBySubscriptions) {
      newValue = get_store_value(childDerived);
    }
    if (isUpdated) {
      doReflect(newValue);
    }
  }
  return {
    subscribe: childDerived.subscribe,
    set(value) {
      update(() => value);
    },
    update
  };
}
function propertyStore(origin, propName) {
  if (!Array.isArray(propName)) {
    return writableDerived(
      origin,
      (object) => object[propName],
      (reflecting, object) => {
        object[propName] = reflecting;
        return object;
      }
    );
  } else {
    let props = propName.concat();
    return writableDerived(
      origin,
      (value) => {
        for (let i = 0; i < props.length; ++i) {
          value = value[props[i]];
        }
        return value;
      },
      (reflecting, object) => {
        let target = object;
        for (let i = 0; i < props.length - 1; ++i) {
          target = target[props[i]];
        }
        target[props[props.length - 1]] = reflecting;
        return object;
      }
    );
  }
}
var _renderContextRegex, _name, _document, _embeddedNames;
var _EmbeddedStoreManager = class {
  /**
   * @param {foundry.abstract.Document[]} document - The associated document holder.
   */
  constructor(document2) {
    /**
     * @type {Map<string, EmbeddedCollectionData>}
     */
    __privateAdd(this, _name, /* @__PURE__ */ new Map());
    /**
     * @type {foundry.abstract.Document[]}
     */
    __privateAdd(this, _document, void 0);
    /**
     * @type {Set<string>}
     */
    __privateAdd(this, _embeddedNames, /* @__PURE__ */ new Set());
    __privateSet(this, _document, document2);
    this.handleDocChange();
    Object.seal(this);
  }
  /**
   * @template T
   *
   * @param {string} embeddedName -
   *
   * @param {import('@typhonjs-fvtt/svelte/store').OptionsDynMapCreate<string, T>} options -
   *
   * @returns {import('@typhonjs-fvtt/svelte/store').DynMapReducer<string, T>} DynMapReducer instance
   */
  create(embeddedName, options) {
    const doc = __privateGet(this, _document)[0];
    let collection = null;
    if (doc) {
      try {
        collection = doc.getEmbeddedCollection(embeddedName);
      } catch (err) {
        console.warn(`EmbeddedStoreManager.create error: No valid embedded collection for: ${embeddedName}`);
      }
    }
    let embeddedData;
    if (!__privateGet(this, _name).has(embeddedName)) {
      embeddedData = {
        collection,
        stores: /* @__PURE__ */ new Map()
      };
      __privateGet(this, _name).set(embeddedName, embeddedData);
    } else {
      embeddedData = __privateGet(this, _name).get(embeddedName);
    }
    let name;
    let rest = {};
    let ctor;
    if (typeof options === "string") {
      name = options;
      ctor = DynMapReducer;
    } else if (typeof options === "function" && hasPrototype(options, DynMapReducer)) {
      ctor = options;
    } else if (isObject(options)) {
      ({ name, ctor = DynMapReducer, ...rest } = options);
    } else {
      throw new TypeError(`EmbeddedStoreManager.create error: 'options' does not conform to allowed parameters.`);
    }
    if (!hasPrototype(ctor, DynMapReducer)) {
      throw new TypeError(`EmbeddedStoreManager.create error: 'ctor' is not a 'DynMapReducer'.`);
    }
    name = name ?? (ctor == null ? void 0 : ctor.name);
    if (typeof name !== "string") {
      throw new TypeError(`EmbeddedStoreManager.create error: 'name' is not a string.`);
    }
    if (embeddedData.stores.has(name)) {
      return embeddedData.stores.get(name);
    } else {
      const storeOptions = collection ? { data: collection, ...rest } : { ...rest };
      const store = new ctor(storeOptions);
      embeddedData.stores.set(name, store);
      return store;
    }
  }
  /**
   * Destroys and removes embedded collection stores. Invoking this method with no parameters destroys all stores.
   * Invoking with an embedded name destroys all stores for that particular collection. If you provide an embedded and
   * store name just that particular store is destroyed and removed.
   *
   * @param {string}   [embeddedName] - Specific embedded collection name.
   *
   * @param {string}   [storeName] - Specific store name.
   *
   * @returns {boolean} One or more stores destroyed?
   */
  destroy(embeddedName, storeName) {
    let count = 0;
    if (embeddedName === void 0) {
      for (const embeddedData of __privateGet(this, _name).values()) {
        embeddedData.collection = null;
        for (const store of embeddedData.stores.values()) {
          store.destroy();
          count++;
        }
      }
      __privateGet(this, _name).clear();
    } else if (typeof embeddedName === "string" && storeName === void 0) {
      const embeddedData = __privateGet(this, _name).get(embeddedName);
      if (embeddedData) {
        embeddedData.collection = null;
        for (const store of embeddedData.stores.values()) {
          store.destroy();
          count++;
        }
      }
      __privateGet(this, _name).delete(embeddedName);
    } else if (typeof embeddedName === "string" && storeName === "string") {
      const embeddedData = __privateGet(this, _name).get(embeddedName);
      if (embeddedData) {
        const store = embeddedData.stores.get(storeName);
        if (store) {
          store.destroy();
          count++;
        }
      }
    }
    return count > 0;
  }
  /**
   * @template T
   *
   * @param {string} embeddedName -
   *
   * @param {string} storeName -
   *
   * @returns {import('@typhonjs-fvtt/svelte/store').DynMapReducer<string, T>} DynMapReducer instance.
   */
  get(embeddedName, storeName) {
    if (!__privateGet(this, _name).has(embeddedName)) {
      return void 0;
    }
    return __privateGet(this, _name).get(embeddedName).stores.get(storeName);
  }
  /**
   * Updates all existing embedded collection stores with the associated embedded collection
   */
  handleDocChange() {
    var _a, _b;
    const doc = __privateGet(this, _document)[0];
    if (doc instanceof globalThis.foundry.abstract.Document) {
      const existingEmbeddedNames = new Set(__privateGet(this, _name).keys());
      const embeddedNames = Object.keys(((_b = (_a = doc.constructor) == null ? void 0 : _a.metadata) == null ? void 0 : _b.embedded) ?? []);
      __privateGet(this, _embeddedNames).clear();
      for (const embeddedName of embeddedNames) {
        existingEmbeddedNames.delete(embeddedName);
        __privateGet(this, _embeddedNames).add(`create${embeddedName}`);
        __privateGet(this, _embeddedNames).add(`delete${embeddedName}`);
        __privateGet(this, _embeddedNames).add(`update${embeddedName}`);
        let collection = null;
        try {
          collection = doc.getEmbeddedCollection(embeddedName);
        } catch (err) {
          console.warn(`EmbeddedStoreManager.handleDocUpdate error: No valid embedded collection for: ${embeddedName}`);
        }
        const embeddedData = __privateGet(this, _name).get(embeddedName);
        if (embeddedData) {
          embeddedData.collection = collection;
          for (const store of embeddedData.stores.values()) {
            store.setData(collection, true);
          }
        }
      }
      for (const embeddedName of existingEmbeddedNames) {
        const embeddedData = __privateGet(this, _name).get(embeddedName);
        if (embeddedData) {
          embeddedData.collection = null;
          for (const store of embeddedData.stores.values()) {
            store.setData(null, true);
          }
        }
      }
    } else {
      __privateGet(this, _embeddedNames).clear();
      for (const embeddedData of __privateGet(this, _name).values()) {
        embeddedData.collection = null;
        for (const store of embeddedData.stores.values()) {
          store.setData(null, true);
        }
      }
    }
  }
  /**
   * Handles updates to embedded stores parsing the render context for valid embedded store types.
   *
   * On create, delete, update parse the type being modified then force index updates for the embedded type.
   *
   * @param {string}   renderContext - render context update from document.
   */
  handleUpdate(renderContext) {
    if (!__privateGet(this, _embeddedNames).has(renderContext)) {
      return;
    }
    const match = __privateGet(_EmbeddedStoreManager, _renderContextRegex).exec(renderContext);
    if (match) {
      const embeddedName = match[2];
      if (!__privateGet(this, _name).has(embeddedName)) {
        return;
      }
      for (const store of __privateGet(this, _name).get(embeddedName).stores.values()) {
        store.index.update(true);
      }
    }
  }
};
var EmbeddedStoreManager = _EmbeddedStoreManager;
_renderContextRegex = new WeakMap();
_name = new WeakMap();
_document = new WeakMap();
_embeddedNames = new WeakMap();
/**
 * RegExp for detecting CRUD updates for renderContext.
 *
 * @type {RegExp}
 */
__privateAdd(EmbeddedStoreManager, _renderContextRegex, /(create|delete|update)(\w+)/);
var _document2, _embeddedStoreManager, _embeddedAPI, _uuidv4, _options2, _subscriptions6, _updateOptions, _deleted, deleted_fn, _updateSubscribers5, updateSubscribers_fn5, _setDocument, setDocument_fn;
var TJSDocument = class {
  /**
   * @param {foundry.abstract.Document | TJSDocumentOptions}  [document] - Document to wrap or TJSDocumentOptions.
   *
   * @param {TJSDocumentOptions}      [options] - TJSDocument options.
   */
  constructor(document2, options = {}) {
    /**
     * Handles cleanup when the document is deleted. Invoking any optional delete function set in the constructor.
     *
     * @returns {Promise<void>}
     */
    __privateAdd(this, _deleted);
    /**
     * @param {boolean}  [force] - unused - signature from Foundry render function.
     *
     * @param {object}   [options] - Options from render call; will have document update context.
     */
    __privateAdd(this, _updateSubscribers5);
    /**
     *
     * @param {foundry.abstract.Document | undefined} doc -
     */
    __privateAdd(this, _setDocument);
    /**
     * @type {foundry.abstract.Document[]}
     */
    __privateAdd(this, _document2, [void 0]);
    /**
     * @type {EmbeddedStoreManager}
     */
    __privateAdd(this, _embeddedStoreManager, void 0);
    __privateAdd(this, _embeddedAPI, void 0);
    /**
     * @type {string}
     */
    __privateAdd(this, _uuidv4, void 0);
    /**
     * @type {TJSDocumentOptions}
     */
    __privateAdd(this, _options2, { delete: void 0, preDelete: void 0 });
    __privateAdd(this, _subscriptions6, []);
    __privateAdd(this, _updateOptions, void 0);
    __privateSet(this, _uuidv4, `tjs-document-${uuidv4()}`);
    if (isPlainObject(document2)) {
      this.setOptions(document2);
    } else {
      this.setOptions(options);
      this.set(document2);
    }
  }
  /**
   * @returns {EmbeddedAPI} Embedded store manager.
   */
  get embedded() {
    if (!__privateGet(this, _embeddedAPI)) {
      __privateSet(this, _embeddedStoreManager, new EmbeddedStoreManager(__privateGet(this, _document2)));
      __privateSet(this, _embeddedAPI, {
        create: (embeddedName, options) => __privateGet(this, _embeddedStoreManager).create(embeddedName, options),
        destroy: (embeddedName, storeName) => __privateGet(this, _embeddedStoreManager).destroy(embeddedName, storeName),
        get: (embeddedName, storeName) => __privateGet(this, _embeddedStoreManager).get(embeddedName, storeName)
      });
    }
    return __privateGet(this, _embeddedAPI);
  }
  /**
   * Returns the options passed on last update.
   *
   * @returns {object} Last update options.
   */
  get updateOptions() {
    return __privateGet(this, _updateOptions) ?? {};
  }
  /**
   * Returns the UUID assigned to this store.
   *
   * @returns {string} UUID
   */
  get uuidv4() {
    return __privateGet(this, _uuidv4);
  }
  /**
   * Completely removes all internal subscribers, any optional delete callback, and unregisters from the
   * ClientDocumentMixin `apps` tracking object.
   */
  destroy() {
    const doc = __privateGet(this, _document2)[0];
    if (__privateGet(this, _embeddedStoreManager)) {
      __privateGet(this, _embeddedStoreManager).destroy();
      __privateSet(this, _embeddedStoreManager, void 0);
      __privateSet(this, _embeddedAPI, void 0);
    }
    if (doc instanceof globalThis.foundry.abstract.Document) {
      doc == null ? true : delete doc.apps[__privateGet(this, _uuidv4)];
      __privateMethod(this, _setDocument, setDocument_fn).call(this, void 0);
    }
    __privateGet(this, _options2).delete = void 0;
    __privateGet(this, _subscriptions6).length = 0;
  }
  /**
   * @returns {foundry.abstract.Document | undefined} Current document
   */
  get() {
    return __privateGet(this, _document2)[0];
  }
  /**
   * @param {foundry.abstract.Document | undefined}  document - New document to set.
   *
   * @param {object}         [options] - New document update options to set.
   */
  set(document2, options = {}) {
    if (__privateGet(this, _document2)[0]) {
      delete __privateGet(this, _document2)[0].apps[__privateGet(this, _uuidv4)];
    }
    if (document2 !== void 0 && !(document2 instanceof globalThis.foundry.abstract.Document)) {
      throw new TypeError(`TJSDocument set error: 'document' is not a valid Document or undefined.`);
    }
    if (options === null || typeof options !== "object") {
      throw new TypeError(`TJSDocument set error: 'options' is not an object.`);
    }
    if (document2 instanceof globalThis.foundry.abstract.Document) {
      document2.apps[__privateGet(this, _uuidv4)] = {
        close: __privateMethod(this, _deleted, deleted_fn).bind(this),
        render: __privateMethod(this, _updateSubscribers5, updateSubscribers_fn5).bind(this)
      };
    }
    __privateMethod(this, _setDocument, setDocument_fn).call(this, document2);
    __privateSet(this, _updateOptions, options);
    __privateMethod(this, _updateSubscribers5, updateSubscribers_fn5).call(this);
  }
  /**
   * Potentially sets new document from data transfer object.
   *
   * @param {object}   data - Document transfer data.
   *
   * @param {ParseDataTransferOptions & TJSDocumentOptions}   [options] - Optional parameters.
   *
   * @returns {Promise<boolean>} Returns true if new document set from data transfer blob.
   */
  async setFromDataTransfer(data, options) {
    return this.setFromUUID(getUUIDFromDataTransfer(data, options), options);
  }
  /**
   * Sets the document by Foundry UUID performing a lookup and setting the document if found.
   *
   * @param {string}   uuid - A Foundry UUID to lookup.
   *
   * @param {TJSDocumentOptions}   [options] - New document update options to set.
   *
   * @returns {Promise<boolean>} True if successfully set document from UUID.
   */
  async setFromUUID(uuid, options = {}) {
    if (typeof uuid !== "string" || uuid.length === 0) {
      return false;
    }
    try {
      const doc = await globalThis.fromUuid(uuid);
      if (doc) {
        this.set(doc, options);
        return true;
      }
    } catch (err) {
    }
    return false;
  }
  /**
   * Sets options for this document wrapper / store.
   *
   * @param {TJSDocumentOptions}   options - Options for TJSDocument.
   */
  setOptions(options) {
    if (!isObject(options)) {
      throw new TypeError(`TJSDocument error: 'options' is not a plain object.`);
    }
    if (options.delete !== void 0 && typeof options.delete !== "function") {
      throw new TypeError(`TJSDocument error: 'delete' attribute in options is not a function.`);
    }
    if (options.preDelete !== void 0 && typeof options.preDelete !== "function") {
      throw new TypeError(`TJSDocument error: 'preDelete' attribute in options is not a function.`);
    }
    if (options.delete === void 0 || typeof options.delete === "function") {
      __privateGet(this, _options2).delete = options.delete;
    }
    if (options.preDelete === void 0 || typeof options.preDelete === "function") {
      __privateGet(this, _options2).preDelete = options.preDelete;
    }
  }
  /**
   * @param {function(foundry.abstract.Document, object): void} handler - Callback function that is invoked on update / changes.
   *
   * @returns {(function(): void)} Unsubscribe function.
   */
  subscribe(handler) {
    __privateGet(this, _subscriptions6).push(handler);
    const updateOptions = { action: "subscribe", data: void 0 };
    handler(__privateGet(this, _document2)[0], updateOptions);
    return () => {
      const index = __privateGet(this, _subscriptions6).findIndex((sub) => sub === handler);
      if (index >= 0) {
        __privateGet(this, _subscriptions6).splice(index, 1);
      }
    };
  }
};
_document2 = new WeakMap();
_embeddedStoreManager = new WeakMap();
_embeddedAPI = new WeakMap();
_uuidv4 = new WeakMap();
_options2 = new WeakMap();
_subscriptions6 = new WeakMap();
_updateOptions = new WeakMap();
_deleted = new WeakSet();
deleted_fn = async function() {
  var _a;
  const doc = __privateGet(this, _document2)[0];
  if (doc instanceof globalThis.foundry.abstract.Document && !((_a = doc == null ? void 0 : doc.collection) == null ? void 0 : _a.has(doc.id))) {
    doc == null ? true : delete doc.apps[__privateGet(this, _uuidv4)];
    __privateMethod(this, _setDocument, setDocument_fn).call(this, void 0);
    if (typeof __privateGet(this, _options2).preDelete === "function") {
      await __privateGet(this, _options2).preDelete(doc);
    }
    __privateMethod(this, _updateSubscribers5, updateSubscribers_fn5).call(this, false, { action: "delete", data: void 0 });
    if (typeof __privateGet(this, _options2).delete === "function") {
      await __privateGet(this, _options2).delete(doc);
    }
    __privateSet(this, _updateOptions, void 0);
  }
};
_updateSubscribers5 = new WeakSet();
updateSubscribers_fn5 = function(force = false, options = {}) {
  __privateSet(this, _updateOptions, options);
  const doc = __privateGet(this, _document2)[0];
  for (let cntr = 0; cntr < __privateGet(this, _subscriptions6).length; cntr++) {
    __privateGet(this, _subscriptions6)[cntr](doc, options);
  }
  if (__privateGet(this, _embeddedStoreManager)) {
    __privateGet(this, _embeddedStoreManager).handleUpdate(options.renderContext);
  }
};
_setDocument = new WeakSet();
setDocument_fn = function(doc) {
  __privateGet(this, _document2)[0] = doc;
  if (__privateGet(this, _embeddedStoreManager)) {
    __privateGet(this, _embeddedStoreManager).handleDocChange();
  }
};
var _collection, _collectionCallback, _uuid, _options3, _subscriptions7, _updateOptions2, _deleted2, deleted_fn2, _notify, notify_fn;
var TJSDocumentCollection = class {
  /**
   * @param {T|TJSDocumentCollectionOptions}   [collection] - Collection to wrap or TJSDocumentCollectionOptions.
   *
   * @param {TJSDocumentCollectionOptions}     [options] - TJSDocumentCollection options.
   */
  constructor(collection, options = {}) {
    /**
     * Handles cleanup when the collection is deleted. Invoking any optional delete function set in the constructor.
     *
     * @returns {Promise<void>}
     */
    __privateAdd(this, _deleted2);
    /**
     * @param {boolean}  [force] - unused - signature from Foundry render function.
     *
     * @param {object}   [options] - Options from render call; will have collection update context.
     */
    __privateAdd(this, _notify);
    __privateAdd(this, _collection, void 0);
    __privateAdd(this, _collectionCallback, void 0);
    __privateAdd(this, _uuid, void 0);
    /**
     * @type {TJSDocumentCollectionOptions}
     */
    __privateAdd(this, _options3, { delete: void 0, preDelete: void 0 });
    __privateAdd(this, _subscriptions7, []);
    __privateAdd(this, _updateOptions2, void 0);
    __privateSet(this, _uuid, `tjs-collection-${uuidv4()}`);
    if (isPlainObject(collection)) {
      this.setOptions(collection);
    } else {
      this.setOptions(options);
      this.set(collection);
    }
  }
  /**
   * Returns the options passed on last update.
   *
   * @returns {object} Last update options.
   */
  get updateOptions() {
    return __privateGet(this, _updateOptions2) ?? {};
  }
  /**
   * Returns the UUID assigned to this store.
   *
   * @returns {*} UUID
   */
  get uuid() {
    return __privateGet(this, _uuid);
  }
  /**
   * Completely removes all internal subscribers, any optional delete callback, and unregisters from the
   * DocumentCollection `apps` tracking array.
   */
  destroy() {
    var _a, _b;
    const collection = __privateGet(this, _collection);
    if (collection instanceof DocumentCollection) {
      const index = (_a = collection == null ? void 0 : collection.apps) == null ? void 0 : _a.findIndex((sub) => sub === __privateGet(this, _collectionCallback));
      if (index >= 0) {
        (_b = collection == null ? void 0 : collection.apps) == null ? void 0 : _b.splice(index, 1);
      }
      __privateSet(this, _collection, void 0);
    }
    __privateGet(this, _options3).delete = void 0;
    __privateGet(this, _subscriptions7).length = 0;
  }
  /**
   * @returns {T | undefined} Current collection
   */
  get() {
    return __privateGet(this, _collection);
  }
  /**
   * @param {T | undefined}  collection - New collection to set.
   *
   * @param {object}         [options] - New collection update options to set.
   */
  set(collection, options = {}) {
    var _a;
    if (__privateGet(this, _collection)) {
      const index = __privateGet(this, _collection).apps.findIndex((sub) => sub === __privateGet(this, _collectionCallback));
      if (index >= 0) {
        __privateGet(this, _collection).apps.splice(index, 1);
      }
      __privateSet(this, _collectionCallback, void 0);
    }
    if (collection !== void 0 && !(collection instanceof DocumentCollection)) {
      throw new TypeError(
        `TJSDocumentCollection set error: 'collection' is not a valid DocumentCollection or undefined.`
      );
    }
    if (!isObject(options)) {
      throw new TypeError(`TJSDocument set error: 'options' is not an object.`);
    }
    if (collection instanceof DocumentCollection) {
      __privateSet(this, _collectionCallback, {
        close: __privateMethod(this, _deleted2, deleted_fn2).bind(this),
        render: __privateMethod(this, _notify, notify_fn).bind(this)
      });
      (_a = collection == null ? void 0 : collection.apps) == null ? void 0 : _a.push(__privateGet(this, _collectionCallback));
    }
    __privateSet(this, _collection, collection);
    __privateSet(this, _updateOptions2, options);
    __privateMethod(this, _notify, notify_fn).call(this);
  }
  /**
   * Sets options for this collection wrapper / store.
   *
   * @param {TJSDocumentCollectionOptions}   options - Options for TJSDocumentCollection.
   */
  setOptions(options) {
    if (!isObject(options)) {
      throw new TypeError(`TJSDocumentCollection error: 'options' is not an object.`);
    }
    if (options.delete !== void 0 && typeof options.delete !== "function") {
      throw new TypeError(`TJSDocumentCollection error: 'delete' attribute in options is not a function.`);
    }
    if (options.preDelete !== void 0 && typeof options.preDelete !== "function") {
      throw new TypeError(`TJSDocumentCollection error: 'preDelete' attribute in options is not a function.`);
    }
    if (options.delete === void 0 || typeof options.delete === "function") {
      __privateGet(this, _options3).delete = options.delete;
    }
    if (options.preDelete === void 0 || typeof options.preDelete === "function") {
      __privateGet(this, _options3).preDelete = options.preDelete;
    }
  }
  /**
   * @param {function(T, object): void} handler - Callback function that is invoked on update / changes.
   *
   * @returns {(function(): void)} Unsubscribe function.
   */
  subscribe(handler) {
    __privateGet(this, _subscriptions7).push(handler);
    const collection = __privateGet(this, _collection);
    const documentType = (collection == null ? void 0 : collection.documentName) ?? void 0;
    const updateOptions = { action: "subscribe", documentType, documents: [], data: [] };
    handler(collection, updateOptions);
    return () => {
      const index = __privateGet(this, _subscriptions7).findIndex((sub) => sub === handler);
      if (index >= 0) {
        __privateGet(this, _subscriptions7).splice(index, 1);
      }
    };
  }
};
_collection = new WeakMap();
_collectionCallback = new WeakMap();
_uuid = new WeakMap();
_options3 = new WeakMap();
_subscriptions7 = new WeakMap();
_updateOptions2 = new WeakMap();
_deleted2 = new WeakSet();
deleted_fn2 = async function() {
  var _a, _b;
  const collection = __privateGet(this, _collection);
  if (collection instanceof DocumentCollection) {
    const index = (_a = collection == null ? void 0 : collection.apps) == null ? void 0 : _a.findIndex((sub) => sub === __privateGet(this, _collectionCallback));
    if (index >= 0) {
      (_b = collection == null ? void 0 : collection.apps) == null ? void 0 : _b.splice(index, 1);
    }
    __privateSet(this, _collection, void 0);
  }
  if (typeof __privateGet(this, _options3).preDelete === "function") {
    await __privateGet(this, _options3).preDelete(collection);
  }
  __privateMethod(this, _notify, notify_fn).call(this, false, { action: "delete", documentType: collection.documentName, documents: [], data: [] });
  if (typeof __privateGet(this, _options3).delete === "function") {
    await __privateGet(this, _options3).delete(collection);
  }
  __privateSet(this, _updateOptions2, void 0);
};
_notify = new WeakSet();
notify_fn = function(force = false, options = {}) {
  __privateSet(this, _updateOptions2, options);
  const subscriptions = __privateGet(this, _subscriptions7);
  const collection = __privateGet(this, _collection);
  for (let cntr = 0; cntr < subscriptions.length; cntr++) {
    subscriptions[cntr](collection, options);
  }
};
var storeState = writable(void 0);
var gameState = {
  subscribe: storeState.subscribe,
  get: () => game
};
Object.freeze(gameState);
Hooks.once("ready", () => storeState.set(game));

export {
  deepMerge,
  isIterable,
  isObject,
  isPlainObject,
  safeAccess,
  safeSet,
  A11yHelper,
  ManagedPromise,
  StyleManager,
  styleParsePixels,
  isApplicationShell,
  isHMRProxy,
  isSvelteComponent,
  outroAndDestroy,
  parseSvelteConfig,
  hasGetter,
  DerivedArrayReducer,
  DynArrayReducer,
  DerivedMapReducer,
  DynMapReducer,
  KeyStore,
  TJSLocalStorage,
  TJSSessionStorage,
  isReadableStore,
  isUpdatableStore,
  isWritableStore,
  subscribeIgnoreFirst,
  subscribeFirstRest,
  writableDerived,
  propertyStore,
  TJSDocument,
  TJSDocumentCollection,
  gameState
};
//# sourceMappingURL=chunk-LQAXH3JU.js.map
