import {
  check_outros,
  group_outros,
  transition_out
} from "./chunk-U7IU7IO7.js";
import {
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet
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
function isIterableAsync(value) {
  if (value === null || value === void 0 || typeof value !== "object") {
    return false;
  }
  return typeof value[Symbol.asyncIterator] === "function";
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
var ClipboardAccess = class {
  /**
   * Uses `navigator.clipboard` if available to read text from the clipboard.
   *
   * Note: Always returns `undefined` when `navigator.clipboard` is not available or the clipboard contains the
   * empty string.
   *
   * @returns {Promise<string|undefined>} The current clipboard text or undefined.
   */
  static async readText() {
    var _a;
    let result;
    if ((_a = globalThis == null ? void 0 : globalThis.navigator) == null ? void 0 : _a.clipboard) {
      try {
        result = await globalThis.navigator.clipboard.readText();
      } catch (err) {
      }
    }
    return result === "" ? void 0 : result;
  }
  /**
   * Uses `navigator.clipboard` if available then falls back to `document.execCommand('copy')` if available to copy
   * the given text to the clipboard.
   *
   * @param {string}   text - Text to copy to the browser clipboard.
   *
   * @returns {Promise<boolean>} Copy successful.
   */
  static async writeText(text) {
    var _a, _b;
    if (typeof text !== "string") {
      throw new TypeError(`ClipboardAccess.writeText error: 'text' is not a string.`);
    }
    let success = false;
    if ((_a = globalThis == null ? void 0 : globalThis.navigator) == null ? void 0 : _a.clipboard) {
      try {
        await globalThis.navigator.clipboard.writeText(text);
        success = true;
      } catch (err) {
      }
    } else if (((_b = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : _b.execCommand) instanceof Function) {
      const textArea = globalThis.document.createElement("textarea");
      textArea.style.position = "fixed";
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.width = "2em";
      textArea.style.height = "2em";
      textArea.style.padding = "0";
      textArea.style.border = "none";
      textArea.style.outline = "none";
      textArea.style.boxShadow = "none";
      textArea.style.background = "transparent";
      textArea.value = text;
      globalThis.document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        success = document.execCommand("copy");
      } catch (err) {
      }
      document.body.removeChild(textArea);
    }
    return success;
  }
};
function hashCode(str, seed = 0) {
  if (typeof str !== "string") {
    return 0;
  }
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
var s_UUIDV4_REGEX = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ (globalThis.crypto || globalThis.msCrypto).getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}
uuidv4.isValid = (uuid) => s_UUIDV4_REGEX.test(uuid);
function normalizeString(query) {
  return query.trim().normalize("NFD").replace(/[\x00-\x1F]/gm, "");
}
function getStackingContext(node) {
  if (!node || node.nodeName === "HTML") {
    return { node: document.documentElement, reason: "root" };
  }
  if (node.nodeName === "#document-fragment") {
    return getStackingContext(node.host);
  }
  const computedStyle = globalThis.getComputedStyle(node);
  if (computedStyle.position === "fixed" || computedStyle.position === "sticky") {
    return { node, reason: `position: ${computedStyle.position}` };
  }
  if (computedStyle.zIndex !== "auto" && computedStyle.position !== "static") {
    return { node, reason: `position: ${computedStyle.position}; z-index: ${computedStyle.zIndex}` };
  }
  if (computedStyle.opacity !== "1") {
    return { node, reason: `opacity: ${computedStyle.opacity}` };
  }
  if (computedStyle.transform !== "none") {
    return { node, reason: `transform: ${computedStyle.transform}` };
  }
  if (computedStyle.mixBlendMode !== "normal") {
    return { node, reason: `mixBlendMode: ${computedStyle.mixBlendMode}` };
  }
  if (computedStyle.filter !== "none") {
    return { node, reason: `filter: ${computedStyle.filter}` };
  }
  if (computedStyle.perspective !== "none") {
    return { node, reason: `perspective: ${computedStyle.perspective}` };
  }
  if (computedStyle.clipPath !== "none") {
    return { node, reason: `clip-path: ${computedStyle.clipPath} ` };
  }
  const mask = computedStyle.mask || computedStyle.webkitMask;
  if (mask !== "none" && mask !== void 0) {
    return { node, reason: `mask:  ${mask}` };
  }
  const maskImage = computedStyle.maskImage || computedStyle.webkitMaskImage;
  if (maskImage !== "none" && maskImage !== void 0) {
    return { node, reason: `mask-image: ${maskImage}` };
  }
  const maskBorder = computedStyle.maskBorder || computedStyle.webkitMaskBorder;
  if (maskBorder !== "none" && maskBorder !== void 0) {
    return { node, reason: `mask-border: ${maskBorder}` };
  }
  if (computedStyle.isolation === "isolate") {
    return { node, reason: `isolation: ${computedStyle.isolation}` };
  }
  if (computedStyle.willChange === "transform" || computedStyle.willChange === "opacity") {
    return { node, reason: `willChange: ${computedStyle.willChange}` };
  }
  if (computedStyle.webkitOverflowScrolling === "touch") {
    return { node, reason: "-webkit-overflow-scrolling: touch" };
  }
  if (computedStyle.zIndex !== "auto") {
    const parentStyle = globalThis.getComputedStyle(node.parentNode);
    if (parentStyle.display === "flex" || parentStyle.display === "inline-flex") {
      return { node, reason: `flex-item; z-index: ${computedStyle.zIndex}` };
    } else if (parentStyle.grid !== "none / none / none / row / auto / auto") {
      return { node, reason: `child of grid container; z-index: ${computedStyle.zIndex}` };
    }
  }
  const contain = computedStyle.contain;
  if (["layout", "paint", "strict", "content"].indexOf(contain) > -1 || contain.indexOf("paint") > -1 || contain.indexOf("layout") > -1) {
    return { node, reason: `contain: ${contain}` };
  }
  return getStackingContext(node.parentNode);
}
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
function debounce(callback, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
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
function hasAccessor(object, accessor) {
  if (object === null || object === void 0) {
    return false;
  }
  const iDescriptor = Object.getOwnPropertyDescriptor(object, accessor);
  if (iDescriptor !== void 0 && iDescriptor.get !== void 0 && iDescriptor.set !== void 0) {
    return true;
  }
  for (let o = Object.getPrototypeOf(object); o; o = Object.getPrototypeOf(o)) {
    const descriptor = Object.getOwnPropertyDescriptor(o, accessor);
    if (descriptor !== void 0 && descriptor.get !== void 0 && descriptor.set !== void 0) {
      return true;
    }
  }
  return false;
}
function hasSetter(object, accessor) {
  if (object === null || object === void 0) {
    return false;
  }
  const iDescriptor = Object.getOwnPropertyDescriptor(object, accessor);
  if (iDescriptor !== void 0 && iDescriptor.set !== void 0) {
    return true;
  }
  for (let o = Object.getPrototypeOf(object); o; o = Object.getPrototypeOf(o)) {
    const descriptor = Object.getOwnPropertyDescriptor(o, accessor);
    if (descriptor !== void 0 && descriptor.set !== void 0) {
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
function set(obj, key, val) {
  if (typeof val.value === "object")
    val.value = klona(val.value);
  if (!val.enumerable || val.get || val.set || !val.configurable || !val.writable || key === "__proto__") {
    Object.defineProperty(obj, key, val);
  } else
    obj[key] = val.value;
}
function klona(x) {
  if (typeof x !== "object")
    return x;
  var i = 0, k, list, tmp, str = Object.prototype.toString.call(x);
  if (str === "[object Object]") {
    tmp = Object.create(x.__proto__ || null);
  } else if (str === "[object Array]") {
    tmp = Array(x.length);
  } else if (str === "[object Set]") {
    tmp = /* @__PURE__ */ new Set();
    x.forEach(function(val) {
      tmp.add(klona(val));
    });
  } else if (str === "[object Map]") {
    tmp = /* @__PURE__ */ new Map();
    x.forEach(function(val, key) {
      tmp.set(klona(key), klona(val));
    });
  } else if (str === "[object Date]") {
    tmp = /* @__PURE__ */ new Date(+x);
  } else if (str === "[object RegExp]") {
    tmp = new RegExp(x.source, x.flags);
  } else if (str === "[object DataView]") {
    tmp = new x.constructor(klona(x.buffer));
  } else if (str === "[object ArrayBuffer]") {
    tmp = x.slice(0);
  } else if (str.slice(-6) === "Array]") {
    tmp = new x.constructor(x);
  }
  if (tmp) {
    for (list = Object.getOwnPropertySymbols(x); i < list.length; i++) {
      set(tmp, list[i], Object.getOwnPropertyDescriptor(x, list[i]));
    }
    for (i = 0, list = Object.getOwnPropertyNames(x); i < list.length; i++) {
      if (Object.hasOwnProperty.call(tmp, k = list[i]) && tmp[k] === x[k])
        continue;
      set(tmp, k, Object.getOwnPropertyDescriptor(x, k));
    }
  }
  return tmp || x;
}
function isSpace(character) {
  return character == " " || character == "\n" || character == "\r" || character == "	";
}
function isQuote(character) {
  return character == '"' || character == "'";
}
var TAG_START = "<";
var TAG_END = ">";
var ENCODED_TAG_START = "&lt;";
var ENCODED_TAG_END = "&gt;";
var InPlaintextState = class {
  constructor(options) {
    this.options = options;
  }
  consume(character, transition) {
    if (character == TAG_START) {
      transition(new InTagNameState(this.options));
      return "";
    } else if (character == TAG_END && this.options.encodePlaintextTagDelimiters) {
      return ENCODED_TAG_END;
    }
    return character;
  }
};
var InTagNameState = class {
  constructor(options) {
    this.options = options;
    this.nameBuffer = "";
    this.isClosingTag = false;
  }
  consume(character, transition) {
    if (this.nameBuffer.length == 0) {
      if (isSpace(character)) {
        transition(new InPlaintextState(this.options));
        return (this.options.encodePlaintextTagDelimiters ? ENCODED_TAG_START : "<") + character;
      }
      if (character == "/") {
        this.isClosingTag = true;
        return "";
      }
    }
    if (isSpace(character)) {
      if (this.isNameBufferAnAllowedTag()) {
        transition(new InTagState(0, this.options));
        return TAG_START + (this.isClosingTag ? "/" : "") + this.nameBuffer + character;
      } else {
        transition(new InTagState(1, this.options));
        return this.options.tagReplacementText;
      }
    }
    if (character == TAG_START) {
      this.nameBuffer += ENCODED_TAG_START;
      return "";
    }
    if (character == TAG_END) {
      transition(new InPlaintextState(this.options));
      if (this.isNameBufferAnAllowedTag()) {
        return TAG_START + (this.isClosingTag ? "/" : "") + this.nameBuffer + character;
      } else {
        return this.options.tagReplacementText;
      }
    }
    if (character == "-" && this.nameBuffer == "!-") {
      transition(new InCommentState(this.options));
      return "";
    }
    this.nameBuffer += character;
    return "";
  }
  isNameBufferAnAllowedTag() {
    const tagName = this.nameBuffer.toLowerCase();
    if (this.options.allowedTags) {
      return this.options.allowedTags.has(tagName);
    } else if (this.options.disallowedTags) {
      return !this.options.disallowedTags.has(tagName);
    } else {
      return false;
    }
  }
};
var InTagState = class {
  constructor(mode, options) {
    this.mode = mode;
    this.options = options;
  }
  consume(character, transition) {
    if (character == TAG_END) {
      transition(new InPlaintextState(this.options));
    } else if (isQuote(character)) {
      transition(new InQuotedStringInTagState(this.mode, character, this.options));
    }
    if (this.mode == 1) {
      return "";
    }
    if (character == TAG_START) {
      return ENCODED_TAG_START;
    } else {
      return character;
    }
  }
};
var InQuotedStringInTagState = class {
  constructor(mode, quoteCharacter, options) {
    this.mode = mode;
    this.quoteCharacter = quoteCharacter;
    this.options = options;
  }
  consume(character, transition) {
    if (character == this.quoteCharacter) {
      transition(new InTagState(this.mode, this.options));
    }
    if (this.mode == 1) {
      return "";
    }
    if (character == TAG_START) {
      return ENCODED_TAG_START;
    } else if (character == TAG_END) {
      return ENCODED_TAG_END;
    } else {
      return character;
    }
  }
};
var InCommentState = class {
  constructor(options) {
    this.options = options;
    this.consecutiveHyphens = 0;
  }
  consume(character, transition) {
    if (character == ">" && this.consecutiveHyphens >= 2) {
      transition(new InPlaintextState(this.options));
    } else if (character == "-") {
      this.consecutiveHyphens++;
    } else {
      this.consecutiveHyphens = 0;
    }
    return "";
  }
};
var DefaultStateMachineOptions = {
  tagReplacementText: "",
  encodePlaintextTagDelimiters: true
};
var StateMachine = class {
  constructor(partialOptions = {}) {
    this.state = new InPlaintextState(Object.assign(Object.assign({}, DefaultStateMachineOptions), partialOptions));
    this.transitionFunction = ((next) => {
      this.state = next;
    }).bind(this);
  }
  consume(text) {
    let outputBuffer = "";
    for (const character of text) {
      outputBuffer += this.state.consume(character, this.transitionFunction);
    }
    return outputBuffer;
  }
};
function striptags(text, options = {}) {
  return new StateMachine(options).consume(text);
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

export {
  deepMerge,
  isIterable,
  isIterableAsync,
  isObject,
  isPlainObject,
  safeAccess,
  safeSet,
  A11yHelper,
  ManagedPromise,
  ClipboardAccess,
  hashCode,
  uuidv4,
  normalizeString,
  getStackingContext,
  StyleManager,
  styleParsePixels,
  isApplicationShell,
  isHMRProxy,
  isSvelteComponent,
  outroAndDestroy,
  parseSvelteConfig,
  debounce,
  hasGetter,
  hasAccessor,
  hasSetter,
  hasPrototype,
  klona,
  striptags,
  getUUIDFromDataTransfer
};
//# sourceMappingURL=chunk-IDJAAY4H.js.map
