import {
  Position,
  SvelteApplication
} from "./chunk-VDQ7QTS5.js";
import {
  TJSFocusWrap_default,
  applyPosition,
  applyScrolltop,
  applyStyles,
  slideFade
} from "./chunk-2NWJHYI2.js";
import {
  localize
} from "./chunk-O4YYAJH7.js";
import {
  TJSDocument,
  isReadableStore,
  isWritableStore,
  propertyStore,
  subscribeFirstRest,
  subscribeIgnoreFirst
} from "./chunk-DTH3B6LV.js";
import {
  A11yHelper,
  StyleManager,
  getStackingContext,
  isIterable,
  isObject,
  isSvelteComponent,
  outroAndDestroy,
  striptags
} from "./chunk-IDJAAY4H.js";
import {
  writable
} from "./chunk-4JE7W25I.js";
import "./chunk-PP4QODU7.js";
import {
  quintOut
} from "./chunk-AFTQYMJX.js";
import "./chunk-6A2TAOKG.js";
import {
  HtmlTag,
  SvelteComponentDev,
  action_destroyer,
  add_location,
  add_render_callback,
  append_dev,
  append_styles,
  assign,
  attr_dev,
  binding_callbacks,
  bubble,
  check_outros,
  component_subscribe,
  compute_slots,
  construct_svelte_component_dev,
  createEventDispatcher,
  create_bidirectional_transition,
  create_component,
  create_slot,
  current_component,
  destroy_component,
  destroy_each,
  detach_dev,
  dispatch_dev,
  element,
  empty,
  getContext,
  get_all_dirty_from_scope,
  get_slot_changes,
  get_spread_object,
  get_spread_update,
  globals,
  group_outros,
  init,
  insert_dev,
  is_function,
  listen_dev,
  mount_component,
  noop,
  null_to_empty,
  onDestroy,
  onMount,
  outro_and_destroy_block,
  prevent_default,
  prop_dev,
  run_all,
  safe_not_equal,
  select_option,
  select_value,
  setContext,
  set_attributes,
  set_data_dev,
  set_input_value,
  set_store_value,
  set_style,
  space,
  src_url_equal,
  stop_propagation,
  subscribe,
  svg_element,
  text,
  tick,
  to_number,
  toggle_class,
  transition_in,
  transition_out,
  update_keyed_each,
  update_slot_base,
  validate_each_argument,
  validate_each_keys,
  validate_slots,
  validate_store
} from "./chunk-U7IU7IO7.js";
import {
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet,
  __privateWrapper
} from "./chunk-7HFSXBDU.js";

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/fvtt/index.js
var _regexMajorVersion;
var FVTTVersion = class {
  /**
   * Returns true when Foundry is at least the specific major version number provided.
   *
   * @param {number}   version - Major version to check against.
   *
   * @returns {boolean} Foundry version is at least the major version specified.
   */
  static isAtLeast(version) {
    var _a, _b;
    if (!Number.isInteger(version) && version < 9) {
      throw new TypeError(`'version' is not a positive integer greater than '9'.`);
    }
    return !globalThis.foundry.utils.isNewerVersion(version, globalThis.game.version ?? ((_b = (_a = globalThis.game) == null ? void 0 : _a.data) == null ? void 0 : _b.version));
  }
  /**
   * Returns true when Foundry is between the min / max major version numbers provided.
   *
   * @param {number}   min - Major minimum version to check against.
   *
   * @param {number}   max - Major maximum version to check against.
   *
   * @returns {boolean} Foundry version is at least the major version specified.
   */
  static isBetween(min, max) {
    var _a, _b;
    if (!Number.isInteger(min) && min < 9) {
      throw new TypeError(`FVTTVersion.isBetween error: 'min' is not a positive integer greater than '9'.`);
    }
    if (!Number.isInteger(max) && max < 9) {
      throw new TypeError(`FVTTVersion.isBetween error: 'max' is not a positive integer greater than '9'.`);
    }
    if (min > max) {
      throw new TypeError(`FVTTVersion.isBetween error: 'min' is greater than 'max'.`);
    }
    const match = __privateGet(this, _regexMajorVersion).exec(globalThis.game.version ?? ((_b = (_a = globalThis.game) == null ? void 0 : _a.data) == null ? void 0 : _b.version));
    if (!match) {
      throw new Error(`FVTTVersion.isBetween error: Could not parse 'globalThis.game.version'.`);
    }
    const version = parseInt(match[1], 10);
    return version >= min && version <= max;
  }
};
_regexMajorVersion = new WeakMap();
__privateAdd(FVTTVersion, _regexMajorVersion, /(\d+)\./);
var _loadFont, loadFont_fn;
var _FontManager = class {
  /**
   * Collect all the font definitions and combine them.
   *
   * @returns {Object<FontFamilyDefinition>[]} Core font definitions.
   */
  static getCoreDefinitions() {
    var _a, _b, _c, _d;
    const fonts = [];
    if (FVTTVersion.isAtLeast(10)) {
      let legacyFamilies;
      if (Array.isArray((_a = globalThis.CONFIG) == null ? void 0 : _a._fontFamilies)) {
        legacyFamilies = globalThis.CONFIG._fontFamilies.reduce((obj, f) => {
          obj[f] = { editor: true, fonts: [] };
          return obj;
        }, {});
      }
      if (Array.isArray((_b = globalThis.CONFIG) == null ? void 0 : _b.fontDefinitions)) {
        fonts.push(globalThis.foundry.utils.duplicate(globalThis.CONFIG.fontDefinitions));
      }
      const coreFonts = (_c = globalThis.game) == null ? void 0 : _c.settings.get("core", "fonts");
      if (Array.isArray(coreFonts)) {
        fonts.push(globalThis.foundry.utils.duplicate(coreFonts));
      }
      if (legacyFamilies) {
        fonts.push(legacyFamilies);
      }
    } else {
      if (Array.isArray((_d = globalThis.CONFIG) == null ? void 0 : _d.fontFamilies)) {
        const legacyFamilies = globalThis.CONFIG.fontFamilies.reduce((obj, f) => {
          obj[f] = { editor: true, fonts: [] };
          return obj;
        }, {});
        fonts.push(legacyFamilies);
      }
    }
    _FontManager.removeDuplicateDefinitions(fonts);
    return fonts;
  }
  /**
   * Ensure that fonts have loaded and are ready for use.
   * Enforce a maximum timeout in milliseconds.
   * Proceed after that point even if fonts are not yet available.
   *
   * @param {object} [opts] - Optional parameters.
   *
   * @param {number} [opts.ms=4500] - The maximum time to spend loading fonts before proceeding.
   *
   * @param {Document} [opts.document] - The target document to load the fonts into.
   *
   * @param {boolean} [opts.editor=true] - When true verifies the `editor` field of {@link FontFamilyDefinition}.
   *
   * @param {Object<FontFamilyDefinition>[]|Object<FontFamilyDefinition>} [opts.fonts] - A custom set of font family
   *        definitions to load. If not defined the core font family definitions are loaded.
   *
   * @returns {Promise<void>}
   */
  static async loadFonts({ ms = 4500, document: document2 = globalThis.document, editor = true, fonts } = {}) {
    const allFonts = fonts ? Array.isArray(fonts) ? fonts : [fonts] : this.getCoreDefinitions();
    const promises = [];
    for (const definitions of allFonts) {
      if (typeof definitions === "object") {
        for (const [family, definition] of Object.entries(definitions)) {
          if (editor && (typeof definition.editor !== "boolean" || !definition.editor)) {
            continue;
          }
          const fontSpecification = `1rem "${family}"`;
          if (document2.fonts.check(fontSpecification)) {
            continue;
          }
          promises.push(__privateMethod(this, _loadFont, loadFont_fn).call(this, fontSpecification, family, definition, document2));
        }
      }
    }
    const timeout = new Promise((resolve) => setTimeout(resolve, ms));
    const ready = Promise.all(promises).then(() => document2.fonts.ready);
    return Promise.race([ready, timeout]);
  }
  /**
   * Removes duplicate font definitions.
   *
   * @param {Object<FontFamilyDefinition>[]}   fonts - An array of FontFamilyDefinition objects to process.
   *
   * @returns {Object<FontFamilyDefinition>[]} Filtered font definitions.
   */
  static removeDuplicateDefinitions(fonts) {
    if (!Array.isArray(fonts)) {
      throw new TypeError(`FontManager.removeDuplicateDefinitions error: 'fonts' is not an array.`);
    }
    const familySet = /* @__PURE__ */ new Set();
    for (const definitions of fonts) {
      if (typeof definitions !== "object" || definitions === null) {
        throw new TypeError(`FontManager.removeDuplicateDefinitions error: 'definitions' is not an object.`);
      }
      for (const family of Object.keys(definitions)) {
        if (familySet.has(family)) {
          delete definitions[family];
        } else {
          familySet.add(family);
        }
      }
    }
    return fonts;
  }
};
var FontManager = _FontManager;
_loadFont = new WeakSet();
loadFont_fn = async function(fontSpecification, family, definition, document2) {
  try {
    for (const fontEntry of definition.fonts) {
      const urls = fontEntry.urls.map((url) => `url("${url}")`).join(", ");
      const fontFace = new FontFace(family, urls, fontEntry);
      await fontFace.load();
      document2.fonts.add(fontFace);
    }
    await document2.fonts.load(fontSpecification);
  } catch (err) {
    console.warn(`Font family "${family}" failed to load: `, err);
    return false;
  }
  if (!document2.fonts.check(fontSpecification)) {
    console.warn(`Font family "${family}" failed to load.`);
    return false;
  }
  return true;
};
/**
 * Load a font definition.
 *
 * @param {string}               fontSpecification - The font specification.
 *
 * @param {string}               family - The font family name (case-sensitive).
 *
 * @param {FontFamilyDefinition} definition - The font family definition.
 *
 * @param {Document}             document - Target Document to load font into.
 *
 * @returns {Promise<boolean>} Returns true if the font was successfully loaded.
 */
__privateAdd(FontManager, _loadFont);
var _sheet, _sheetMap, _initialized, _initialize, initialize_fn;
var FoundryStyles = class {
  /**
   * Gets the properties object associated with the selector. Try and use a direct match otherwise all keys
   * are iterated to find a selector string that includes the `selector`.
   *
   * @param {string}   selector - Selector to find.
   *
   * @returns {Object<string, string>} Properties object.
   */
  static getProperties(selector) {
    if (!__privateGet(this, _initialized)) {
      __privateMethod(this, _initialize, initialize_fn).call(this);
    }
    if (__privateGet(this, _sheetMap).has(selector)) {
      return __privateGet(this, _sheetMap).get(selector);
    }
    for (const key of __privateGet(this, _sheetMap).keys()) {
      if (key.includes(selector)) {
        return __privateGet(this, _sheetMap).get(key);
      }
    }
    return void 0;
  }
  /**
   * Gets a specific property value from the given `selector` and `property` key. Try and use a direct selector
   * match otherwise all keys are iterated to find a selector string that includes `selector`.
   *
   * @param {string}   selector - Selector to find.
   *
   * @param {string}   property - Specific property to locate.
   *
   * @returns {string|undefined} Property value.
   */
  static getProperty(selector, property) {
    if (!__privateGet(this, _initialized)) {
      __privateMethod(this, _initialize, initialize_fn).call(this);
    }
    if (__privateGet(this, _sheetMap).has(selector)) {
      const data = __privateGet(this, _sheetMap).get(selector);
      return typeof data === "object" && property in data ? data[property] : void 0;
    }
    for (const key of __privateGet(this, _sheetMap).keys()) {
      if (key.includes(selector)) {
        const data = __privateGet(this, _sheetMap).get(key);
        if (typeof data === "object" && property in data) {
          return data[property];
        }
      }
    }
    return void 0;
  }
};
_sheet = new WeakMap();
_sheetMap = new WeakMap();
_initialized = new WeakMap();
_initialize = new WeakSet();
initialize_fn = function() {
  __privateSet(this, _initialized, true);
  const styleSheets = Array.from(document.styleSheets).filter((entry) => entry.href !== null);
  let sheet;
  const foundryStyleSheet = globalThis.foundry.utils.getRoute("/css/style.css");
  for (const styleSheet of styleSheets) {
    let url;
    try {
      url = new URL(styleSheet.href);
    } catch (err) {
      continue;
    }
    if (typeof url.pathname === "string" && url.pathname === foundryStyleSheet) {
      __privateSet(this, _sheet, sheet = styleSheet);
      break;
    }
  }
  if (!sheet) {
    return;
  }
  for (const rule of sheet.cssRules) {
    if (!(rule instanceof CSSStyleRule)) {
      continue;
    }
    const obj = {};
    for (const entry of rule.style.cssText.split(";")) {
      const parts = entry.split(":");
      if (parts.length < 2) {
        continue;
      }
      obj[parts[0].trim()] = parts[1].trim();
    }
    __privateGet(this, _sheetMap).set(rule.selectorText, obj);
  }
};
/**
 * Called once on initialization / first usage. Parses the core foundry style sheet.
 */
__privateAdd(FoundryStyles, _initialize);
__privateAdd(FoundryStyles, _sheet, void 0);
__privateAdd(FoundryStyles, _sheetMap, /* @__PURE__ */ new Map());
__privateAdd(FoundryStyles, _initialized, false);

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/internal/cssVariables.js
var s_STYLE_KEY = "#__tjs-root-styles";
var cssVariables = new StyleManager({ docKey: s_STYLE_KEY, version: 1 });

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/button/TJSIconButton.svelte
var file = "node_modules\\@typhonjs-fvtt\\svelte-standard\\_dist\\component\\standard\\button\\TJSIconButton.svelte";
function add_css(target) {
  append_styles(target, "svelte-m1hypr", "div.svelte-m1hypr{pointer-events:none;display:block;flex:0 0 var(--tjs-icon-button-diameter, var(--tjs-button-diameter, 2em));height:var(--tjs-icon-button-diameter, var(--tjs-button-diameter, 2em));width:var(--tjs-icon-button-diameter, var(--tjs-button-diameter, 2em));align-self:center;text-align:center}a.svelte-m1hypr{pointer-events:initial;display:inline-block;background:var(--tjs-icon-button-background, var(--tjs-button-background));border:var(--tjs-icon-button-border, var(--tjs-button-border));border-radius:var(--tjs-icon-button-border-radius, var(--tjs-button-border-radius, 50%));border-width:var(--tjs-icon-button-border-width, var(--tjs-button-border-width));cursor:var(--tjs-icon-button-cursor, var(--tjs-button-cursor, pointer));position:relative;overflow:hidden;clip-path:var(--tjs-icon-button-clip-path, var(--tjs-button-clip-path, none));transform-style:preserve-3d;width:100%;height:100%;transition:var(--tjs-icon-button-transition, var(--tjs-button-transition, background 0.2s ease-in-out, clip-path 0.2s ease-in-out));text-decoration:none}a.svelte-m1hypr:focus{background:var(--tjs-icon-button-background-focus, var(--tjs-button-background-focus));text-shadow:var(--tjs-icon-button-text-shadow-focus, var(--tjs-button-text-shadow-focus, var(--tjs-default-text-shadow-focus-hover)));clip-path:var(--tjs-icon-button-clip-path-focus, var(--tjs-icon-button-clip-path, var(--tjs-button-clip-path-focus, var(--tjs-button-clip-path, none))))}a.svelte-m1hypr:focus-visible{background:var(--tjs-icon-button-background-focus-visible, var(--tjs-button-background-focus-visible));box-shadow:var(--tjs-icon-button-box-shadow-focus-visible, var(--tjs-button-box-shadow-focus-visible, var(--tjs-default-box-shadow-focus-visible)));outline:var(--tjs-icon-button-outline-focus-visible, var(--tjs-button-outline-focus-visible, var(--tjs-default-outline-focus-visible, revert)));transition:var(--tjs-icon-button-transition-focus-visible, var(--tjs-button-transition-focus-visible, var(--tjs-default-transition-focus-visible)))}a.svelte-m1hypr:hover{background:var(--tjs-icon-button-background-hover, var(--tjs-button-background-hover));clip-path:var(--tjs-icon-button-clip-path-hover, var(--tjs-icon-button-clip-path, var(--tjs-button-clip-path-hover, var(--tjs-button-clip-path, none))));text-shadow:var(--tjs-icon-button-text-shadow-hover, var(--tjs-button-text-shadow-hover, var(--tjs-default-text-shadow-focus-hover)))}i.svelte-m1hypr{display:inline-flex;justify-content:center;align-items:center;width:100%;height:100%;border-radius:var(--tjs-icon-button-border-radius, var(--tjs-button-border-radius, 50%));transform:translateZ(1px)}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVEpTSWNvbkJ1dHRvbi5zdmVsdGUiLCJtYXBwaW5ncyI6IkFBcUtJLGlCQUFBLENBQ0ksY0FBQSxDQUFBLElBQW9CLENBQ3BCLE9BQUEsQ0FBQSxLQUFjLENBQ2QsSUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSwwQkFBQSxDQUFBLGdDQUFBLENBQTBFLENBQzFFLE1BQUEsQ0FBQSxJQUFBLDBCQUFBLENBQUEsZ0NBQUEsQ0FBd0UsQ0FDeEUsS0FBQSxDQUFBLElBQUEsMEJBQUEsQ0FBQSxnQ0FBQSxDQUF1RSxDQUN2RSxVQUFBLENBQUEsTUFBa0IsQ0FDbEIsVUFBQSxDQUFBLE1BQ0osQ0FFQSxlQUFBLENBQ0ksY0FBQSxDQUFBLE9BQXVCLENBQ3ZCLE9BQUEsQ0FBQSxZQUFxQixDQUNyQixVQUFBLENBQUEsSUFBQSw0QkFBQSxDQUFBLDZCQUFBLENBQTJFLENBQzNFLE1BQUEsQ0FBQSxJQUFBLHdCQUFBLENBQUEseUJBQUEsQ0FBK0QsQ0FDL0QsYUFBQSxDQUFBLElBQUEsK0JBQUEsQ0FBQSxxQ0FBQSxDQUF5RixDQUN6RixZQUFBLENBQUEsSUFBQSw4QkFBQSxDQUFBLCtCQUFBLENBQWlGLENBQ2pGLE1BQUEsQ0FBQSxJQUFBLHdCQUFBLENBQUEsa0NBQUEsQ0FBd0UsQ0FDeEUsUUFBQSxDQUFBLFFBQWtCLENBQ2xCLFFBQUEsQ0FBQSxNQUFnQixDQUNoQixTQUFBLENBQUEsSUFBQSwyQkFBQSxDQUFBLGtDQUFBLENBQThFLENBQzlFLGVBQUEsQ0FBQSxXQUE0QixDQUM1QixLQUFBLENBQUEsSUFBVyxDQUNYLE1BQUEsQ0FBQSxJQUFZLENBQ1osVUFBQSxDQUFBLElBQUEsNEJBQUEsQ0FBQSxzRkFBQSxDQUFvSSxDQUNwSSxlQUFBLENBQUEsSUFDSixDQUVBLGVBQUEsTUFBQSxDQUNJLFVBQUEsQ0FBQSxJQUFBLGtDQUFBLENBQUEsbUNBQUEsQ0FBdUYsQ0FDdkYsV0FBQSxDQUFBLElBQUEsbUNBQUEsQ0FBQSxnRkFBQSxDQUFzSSxDQUN0SSxTQUFBLENBQUEsSUFBQSxpQ0FBQSxDQUFBLHVHQUFBLENBQ0osQ0FFQSxlQUFBLGNBQUEsQ0FDSSxVQUFBLENBQUEsSUFBQSwwQ0FBQSxDQUFBLDJDQUFBLENBQXVHLENBQ3ZHLFVBQUEsQ0FBQSxJQUFBLDBDQUFBLENBQUEsd0ZBQUEsQ0FBb0osQ0FDcEosT0FBQSxDQUFBLElBQUEsdUNBQUEsQ0FBQSwwRkFBQSxDQUFnSixDQUNoSixVQUFBLENBQUEsSUFBQSwwQ0FBQSxDQUFBLHdGQUFBLENBQ0osQ0FFQSxlQUFBLE1BQUEsQ0FDSSxVQUFBLENBQUEsSUFBQSxrQ0FBQSxDQUFBLG1DQUFBLENBQXVGLENBQ3ZGLFNBQUEsQ0FBQSxJQUFBLGlDQUFBLENBQUEsdUdBQUEsQ0FBeUosQ0FDekosV0FBQSxDQUFBLElBQUEsbUNBQUEsQ0FBQSxnRkFBQSxDQUNKLENBRUEsZUFBQSxDQUNJLE9BQUEsQ0FBQSxXQUFvQixDQUNwQixlQUFBLENBQUEsTUFBdUIsQ0FDdkIsV0FBQSxDQUFBLE1BQW1CLENBQ25CLEtBQUEsQ0FBQSxJQUFXLENBQ1gsTUFBQSxDQUFBLElBQVksQ0FDWixhQUFBLENBQUEsSUFBQSwrQkFBQSxDQUFBLHFDQUFBLENBQXlGLENBQ3pGLFNBQUEsQ0FBQSxXQUFBLEdBQUEsQ0FDSiIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJUSlNJY29uQnV0dG9uLnN2ZWx0ZSJdfQ== */");
}
function create_fragment(ctx) {
  let div;
  let a;
  let i;
  let i_class_value;
  let a_title_value;
  let efx_action;
  let applyStyles_action;
  let mounted;
  let dispose;
  const block = {
    c: function create() {
      div = element("div");
      a = element("a");
      i = element("i");
      attr_dev(i, "class", i_class_value = null_to_empty(
        /*icon*/
        ctx[0]
      ) + " svelte-m1hypr");
      add_location(i, file, 160, 8, 5117);
      attr_dev(a, "role", "button");
      attr_dev(a, "tabindex", "0");
      attr_dev(a, "title", a_title_value = localize(
        /*title*/
        ctx[1]
      ));
      attr_dev(a, "class", "svelte-m1hypr");
      add_location(a, file, 150, 4, 4866);
      attr_dev(div, "class", "tjs-icon-button svelte-m1hypr");
      add_location(div, file, 148, 0, 4759);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, a);
      append_dev(a, i);
      if (!mounted) {
        dispose = [
          listen_dev(
            a,
            "click",
            /*onClick*/
            ctx[4],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            a,
            "contextmenu",
            /*onContextMenuPress*/
            ctx[5],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            a,
            "keydown",
            /*onKeydown*/
            ctx[6],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            a,
            "keyup",
            /*onKeyup*/
            ctx[7],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            a,
            "click",
            /*click_handler*/
            ctx[13],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            a,
            "contextmenu",
            /*contextmenu_handler*/
            ctx[14],
            false,
            false,
            false,
            false
          ),
          action_destroyer(efx_action = /*efx*/
          ctx[3].call(null, a)),
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            div,
            /*styles*/
            ctx[2]
          ))
        ];
        mounted = true;
      }
    },
    p: function update(ctx2, [dirty]) {
      if (dirty & /*icon*/
      1 && i_class_value !== (i_class_value = null_to_empty(
        /*icon*/
        ctx2[0]
      ) + " svelte-m1hypr")) {
        attr_dev(i, "class", i_class_value);
      }
      if (dirty & /*title*/
      2 && a_title_value !== (a_title_value = localize(
        /*title*/
        ctx2[1]
      ))) {
        attr_dev(a, "title", a_title_value);
      }
      if (applyStyles_action && is_function(applyStyles_action.update) && dirty & /*styles*/
      4)
        applyStyles_action.update.call(
          null,
          /*styles*/
          ctx2[2]
        );
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TJSIconButton", slots, []);
  let { button = void 0 } = $$props;
  let { icon = void 0 } = $$props;
  let { title = void 0 } = $$props;
  let { styles = void 0 } = $$props;
  let { efx = void 0 } = $$props;
  let { keyCode = void 0 } = $$props;
  let { onPress = void 0 } = $$props;
  let { onContextMenu = void 0 } = $$props;
  let { onClickPropagate = void 0 } = $$props;
  const dispatch = createEventDispatcher();
  function onClick(event) {
    if (typeof onPress === "function") {
      onPress();
    }
    dispatch("press");
    if (!onClickPropagate) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  function onContextMenuPress(event) {
    if (typeof onContextMenu === "function") {
      onContextMenu();
    }
    if (!onClickPropagate) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  function onKeydown(event) {
    if (event.code === keyCode) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  function onKeyup(event) {
    if (event.code === keyCode) {
      if (typeof onPress === "function") {
        onPress();
      }
      dispatch("press");
      event.preventDefault();
      event.stopPropagation();
    }
  }
  const writable_props = [
    "button",
    "icon",
    "title",
    "styles",
    "efx",
    "keyCode",
    "onPress",
    "onContextMenu",
    "onClickPropagate"
  ];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<TJSIconButton> was created with unknown prop '${key}'`);
  });
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function contextmenu_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$props2) => {
    if ("button" in $$props2)
      $$invalidate(12, button = $$props2.button);
    if ("icon" in $$props2)
      $$invalidate(0, icon = $$props2.icon);
    if ("title" in $$props2)
      $$invalidate(1, title = $$props2.title);
    if ("styles" in $$props2)
      $$invalidate(2, styles = $$props2.styles);
    if ("efx" in $$props2)
      $$invalidate(3, efx = $$props2.efx);
    if ("keyCode" in $$props2)
      $$invalidate(8, keyCode = $$props2.keyCode);
    if ("onPress" in $$props2)
      $$invalidate(9, onPress = $$props2.onPress);
    if ("onContextMenu" in $$props2)
      $$invalidate(10, onContextMenu = $$props2.onContextMenu);
    if ("onClickPropagate" in $$props2)
      $$invalidate(11, onClickPropagate = $$props2.onClickPropagate);
  };
  $$self.$capture_state = () => ({
    createEventDispatcher,
    applyStyles,
    localize,
    isObject,
    button,
    icon,
    title,
    styles,
    efx,
    keyCode,
    onPress,
    onContextMenu,
    onClickPropagate,
    dispatch,
    onClick,
    onContextMenuPress,
    onKeydown,
    onKeyup
  });
  $$self.$inject_state = ($$props2) => {
    if ("button" in $$props2)
      $$invalidate(12, button = $$props2.button);
    if ("icon" in $$props2)
      $$invalidate(0, icon = $$props2.icon);
    if ("title" in $$props2)
      $$invalidate(1, title = $$props2.title);
    if ("styles" in $$props2)
      $$invalidate(2, styles = $$props2.styles);
    if ("efx" in $$props2)
      $$invalidate(3, efx = $$props2.efx);
    if ("keyCode" in $$props2)
      $$invalidate(8, keyCode = $$props2.keyCode);
    if ("onPress" in $$props2)
      $$invalidate(9, onPress = $$props2.onPress);
    if ("onContextMenu" in $$props2)
      $$invalidate(10, onContextMenu = $$props2.onContextMenu);
    if ("onClickPropagate" in $$props2)
      $$invalidate(11, onClickPropagate = $$props2.onClickPropagate);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*button, icon*/
    4097) {
      $:
        $$invalidate(0, icon = isObject(button) && typeof button.icon === "string" ? button.icon : typeof icon === "string" ? icon : "");
    }
    if ($$self.$$.dirty & /*button, title*/
    4098) {
      $:
        $$invalidate(1, title = isObject(button) && typeof button.title === "string" ? button.title : typeof title === "string" ? title : "");
    }
    if ($$self.$$.dirty & /*button, styles*/
    4100) {
      $:
        $$invalidate(2, styles = isObject(button) && typeof button.styles === "object" ? button.styles : typeof styles === "object" ? styles : void 0);
    }
    if ($$self.$$.dirty & /*button, efx*/
    4104) {
      $:
        $$invalidate(3, efx = isObject(button) && typeof button.efx === "function" ? button.efx : typeof efx === "function" ? efx : () => {
        });
    }
    if ($$self.$$.dirty & /*button, keyCode*/
    4352) {
      $:
        $$invalidate(8, keyCode = isObject(button) && typeof button.keyCode === "string" ? button.keyCode : typeof keyCode === "string" ? keyCode : "Enter");
    }
    if ($$self.$$.dirty & /*button, onPress*/
    4608) {
      $:
        $$invalidate(9, onPress = isObject(button) && typeof button.onPress === "function" ? button.onPress : typeof onPress === "function" ? onPress : void 0);
    }
    if ($$self.$$.dirty & /*button, onContextMenu*/
    5120) {
      $:
        $$invalidate(10, onContextMenu = isObject(button) && typeof button.onContextMenu === "function" ? button.onContextMenu : typeof onContextMenu === "function" ? onContextMenu : void 0);
    }
    if ($$self.$$.dirty & /*button, onClickPropagate*/
    6144) {
      $:
        $$invalidate(11, onClickPropagate = isObject(button) && typeof button.onClickPropagate === "boolean" ? button.onClickPropagate : typeof onClickPropagate === "boolean" ? onClickPropagate : false);
    }
  };
  return [
    icon,
    title,
    styles,
    efx,
    onClick,
    onContextMenuPress,
    onKeydown,
    onKeyup,
    keyCode,
    onPress,
    onContextMenu,
    onClickPropagate,
    button,
    click_handler,
    contextmenu_handler
  ];
}
var TJSIconButton = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(
      this,
      options,
      instance,
      create_fragment,
      safe_not_equal,
      {
        button: 12,
        icon: 0,
        title: 1,
        styles: 2,
        efx: 3,
        keyCode: 8,
        onPress: 9,
        onContextMenu: 10,
        onClickPropagate: 11
      },
      add_css
    );
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TJSIconButton",
      options,
      id: create_fragment.name
    });
  }
  get button() {
    throw new Error("<TJSIconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set button(value) {
    throw new Error("<TJSIconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get icon() {
    throw new Error("<TJSIconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set icon(value) {
    throw new Error("<TJSIconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get title() {
    throw new Error("<TJSIconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set title(value) {
    throw new Error("<TJSIconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get styles() {
    throw new Error("<TJSIconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set styles(value) {
    throw new Error("<TJSIconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get efx() {
    throw new Error("<TJSIconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set efx(value) {
    throw new Error("<TJSIconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get keyCode() {
    throw new Error("<TJSIconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set keyCode(value) {
    throw new Error("<TJSIconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get onPress() {
    throw new Error("<TJSIconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set onPress(value) {
    throw new Error("<TJSIconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get onContextMenu() {
    throw new Error("<TJSIconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set onContextMenu(value) {
    throw new Error("<TJSIconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get onClickPropagate() {
    throw new Error("<TJSIconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set onClickPropagate(value) {
    throw new Error("<TJSIconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var TJSIconButton_default = TJSIconButton;

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/button/TJSToggleIconButton.svelte
var file2 = "node_modules\\@typhonjs-fvtt\\svelte-standard\\_dist\\component\\standard\\button\\TJSToggleIconButton.svelte";
function add_css2(target) {
  append_styles(target, "svelte-zm81a2", "div.svelte-zm81a2{display:block;position:relative;flex:0 0 var(--tjs-icon-button-diameter, var(--tjs-button-diameter, 2em));height:var(--tjs-icon-button-diameter, var(--tjs-button-diameter, 2em));width:var(--tjs-icon-button-diameter, var(--tjs-button-diameter, 2em));align-self:center;text-align:center}a.svelte-zm81a2{pointer-events:initial;display:inline-block;background:var(--tjs-icon-button-background, var(--tjs-button-background));border:var(--tjs-icon-button-border, var(--tjs-button-border));border-radius:var(--tjs-icon-button-border-radius, var(--tjs-button-border-radius, 50%));border-width:var(--tjs-icon-button-border-width, var(--tjs-button-border-width));cursor:var(--tjs-icon-button-cursor, var(--tjs-button-cursor, pointer));position:relative;overflow:hidden;clip-path:var(--tjs-icon-button-clip-path, var(--tjs-button-clip-path, none));transform-style:preserve-3d;width:100%;height:100%;transition:var(--tjs-icon-button-transition, var(--tjs-button-transition, background 0.2s ease-in-out, clip-path 0.2s ease-in-out));text-decoration:none}a.svelte-zm81a2:focus{background:var(--tjs-icon-button-background-focus, var(--tjs-button-background-focus));text-shadow:var(--tjs-icon-button-text-shadow-focus, var(--tjs-button-text-shadow-focus, var(--tjs-default-text-shadow-focus-hover)));clip-path:var(--tjs-icon-button-clip-path-focus, var(--tjs-icon-button-clip-path, var(--tjs-button-clip-path-focus, var(--tjs-button-clip-path, none))))}a.svelte-zm81a2:focus-visible{background:var(--tjs-icon-button-background-focus-visible, var(--tjs-button-background-focus-visible));box-shadow:var(--tjs-icon-button-box-shadow-focus-visible, var(--tjs-button-box-shadow-focus-visible, var(--tjs-default-box-shadow-focus-visible)));outline:var(--tjs-icon-button-outline-focus-visible, var(--tjs-button-outline-focus-visible, var(--tjs-default-outline-focus-visible, revert)));transition:var(--tjs-icon-button-transition-focus-visible, var(--tjs-button-transition-focus-visible, var(--tjs-default-transition-focus-visible)))}a.svelte-zm81a2:hover{background:var(--tjs-icon-button-background-hover, var(--tjs-button-background-hover));clip-path:var(--tjs-icon-button-clip-path-hover, var(--tjs-icon-button-clip-path, var(--tjs-button-clip-path-hover, var(--tjs-button-clip-path, none))));text-shadow:var(--tjs-icon-button-text-shadow-hover, var(--tjs-button-text-shadow-hover, var(--tjs-default-text-shadow-focus-hover)))}a.selected.svelte-zm81a2{background:var(--tjs-icon-button-background-selected, var(--tjs-button-background-selected));clip-path:var(--tjs-icon-button-clip-path-selected, var(--tjs-icon-button-clip-path, var(--tjs-button-clip-path-selected, none)))}i.svelte-zm81a2{display:inline-flex;justify-content:center;align-items:center;width:100%;height:100%;border-radius:var(--tjs-icon-button-border-radius, var(--tjs-button-border-radius, 50%));transform:translateZ(1px)}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVEpTVG9nZ2xlSWNvbkJ1dHRvbi5zdmVsdGUiLCJtYXBwaW5ncyI6IkFBd09HLGlCQUFBLENBQ0csT0FBQSxDQUFBLEtBQWMsQ0FDZCxRQUFBLENBQUEsUUFBa0IsQ0FDbEIsSUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSwwQkFBQSxDQUFBLGdDQUFBLENBQTBFLENBQzFFLE1BQUEsQ0FBQSxJQUFBLDBCQUFBLENBQUEsZ0NBQUEsQ0FBd0UsQ0FDeEUsS0FBQSxDQUFBLElBQUEsMEJBQUEsQ0FBQSxnQ0FBQSxDQUF1RSxDQUN2RSxVQUFBLENBQUEsTUFBa0IsQ0FDbEIsVUFBQSxDQUFBLE1BQ0gsQ0FFQSxlQUFBLENBQ0csY0FBQSxDQUFBLE9BQXVCLENBQ3ZCLE9BQUEsQ0FBQSxZQUFxQixDQUNyQixVQUFBLENBQUEsSUFBQSw0QkFBQSxDQUFBLDZCQUFBLENBQTJFLENBQzNFLE1BQUEsQ0FBQSxJQUFBLHdCQUFBLENBQUEseUJBQUEsQ0FBK0QsQ0FDL0QsYUFBQSxDQUFBLElBQUEsK0JBQUEsQ0FBQSxxQ0FBQSxDQUF5RixDQUN6RixZQUFBLENBQUEsSUFBQSw4QkFBQSxDQUFBLCtCQUFBLENBQWlGLENBQ2pGLE1BQUEsQ0FBQSxJQUFBLHdCQUFBLENBQUEsa0NBQUEsQ0FBd0UsQ0FDeEUsUUFBQSxDQUFBLFFBQWtCLENBQ2xCLFFBQUEsQ0FBQSxNQUFnQixDQUNoQixTQUFBLENBQUEsSUFBQSwyQkFBQSxDQUFBLGtDQUFBLENBQThFLENBQzlFLGVBQUEsQ0FBQSxXQUE0QixDQUM1QixLQUFBLENBQUEsSUFBVyxDQUNYLE1BQUEsQ0FBQSxJQUFZLENBQ1osVUFBQSxDQUFBLElBQUEsNEJBQUEsQ0FBQSxzRkFBQSxDQUFvSSxDQUNwSSxlQUFBLENBQUEsSUFDSCxDQUVBLGVBQUEsTUFBQSxDQUNHLFVBQUEsQ0FBQSxJQUFBLGtDQUFBLENBQUEsbUNBQUEsQ0FBdUYsQ0FDdkYsV0FBQSxDQUFBLElBQUEsbUNBQUEsQ0FBQSxnRkFBQSxDQUFzSSxDQUN0SSxTQUFBLENBQUEsSUFBQSxpQ0FBQSxDQUFBLHVHQUFBLENBQ0gsQ0FFQSxlQUFBLGNBQUEsQ0FDRyxVQUFBLENBQUEsSUFBQSwwQ0FBQSxDQUFBLDJDQUFBLENBQXVHLENBQ3ZHLFVBQUEsQ0FBQSxJQUFBLDBDQUFBLENBQUEsd0ZBQUEsQ0FBb0osQ0FDcEosT0FBQSxDQUFBLElBQUEsdUNBQUEsQ0FBQSwwRkFBQSxDQUFnSixDQUNoSixVQUFBLENBQUEsSUFBQSwwQ0FBQSxDQUFBLHdGQUFBLENBQ0gsQ0FFQSxlQUFBLE1BQUEsQ0FDRyxVQUFBLENBQUEsSUFBQSxrQ0FBQSxDQUFBLG1DQUFBLENBQXVGLENBQ3ZGLFNBQUEsQ0FBQSxJQUFBLGlDQUFBLENBQUEsdUdBQUEsQ0FBeUosQ0FDekosV0FBQSxDQUFBLElBQUEsbUNBQUEsQ0FBQSxnRkFBQSxDQUNILENBRUEsQ0FBQSx1QkFBQSxDQUNHLFVBQUEsQ0FBQSxJQUFBLHFDQUFBLENBQUEsc0NBQUEsQ0FBNkYsQ0FDN0YsU0FBQSxDQUFBLElBQUEsb0NBQUEsQ0FBQSw2RUFBQSxDQUNILENBRUEsZUFBQSxDQUNHLE9BQUEsQ0FBQSxXQUFvQixDQUNwQixlQUFBLENBQUEsTUFBdUIsQ0FDdkIsV0FBQSxDQUFBLE1BQW1CLENBQ25CLEtBQUEsQ0FBQSxJQUFXLENBQ1gsTUFBQSxDQUFBLElBQVksQ0FDWixhQUFBLENBQUEsSUFBQSwrQkFBQSxDQUFBLHFDQUFBLENBQXlGLENBQ3pGLFNBQUEsQ0FBQSxXQUFBLEdBQUEsQ0FDSCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJUSlNUb2dnbGVJY29uQnV0dG9uLnN2ZWx0ZSJdfQ== */");
}
function create_if_block(ctx) {
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[23].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[22],
    null
  );
  const block = {
    c: function create() {
      if (default_slot)
        default_slot.c();
    },
    m: function mount(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p: function update(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        4194304)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[22],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[22]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[22],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block.name,
    type: "if",
    source: "(227:3) {#if selected}",
    ctx
  });
  return block;
}
function create_fragment2(ctx) {
  let div;
  let a;
  let i;
  let i_class_value;
  let a_title_value;
  let efx_action;
  let t;
  let applyStyles_action;
  let current;
  let mounted;
  let dispose;
  let if_block = (
    /*selected*/
    ctx[4] && create_if_block(ctx)
  );
  const block = {
    c: function create() {
      div = element("div");
      a = element("a");
      i = element("i");
      t = space();
      if (if_block)
        if_block.c();
      attr_dev(i, "class", i_class_value = null_to_empty(
        /*icon*/
        ctx[0]
      ) + " svelte-zm81a2");
      toggle_class(
        i,
        "selected",
        /*selected*/
        ctx[4]
      );
      add_location(i, file2, 224, 6, 7269);
      attr_dev(a, "role", "button");
      attr_dev(a, "tabindex", "0");
      attr_dev(a, "title", a_title_value = localize(
        /*titleCurrent*/
        ctx[6]
      ));
      attr_dev(a, "class", "svelte-zm81a2");
      toggle_class(
        a,
        "selected",
        /*selected*/
        ctx[4]
      );
      add_location(a, file2, 212, 3, 6974);
      attr_dev(div, "class", "tjs-toggle-icon-button svelte-zm81a2");
      add_location(div, file2, 207, 0, 6795);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, a);
      append_dev(a, i);
      ctx[26](a);
      append_dev(div, t);
      if (if_block)
        if_block.m(div, null);
      current = true;
      if (!mounted) {
        dispose = [
          listen_dev(
            a,
            "click",
            /*onClick*/
            ctx[7],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            a,
            "contextmenu",
            /*onContextMenuPress*/
            ctx[8],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            a,
            "keydown",
            /*onKeydown*/
            ctx[11],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            a,
            "keyup",
            /*onKeyup*/
            ctx[12],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            a,
            "click",
            /*click_handler*/
            ctx[24],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            a,
            "contextmenu",
            /*contextmenu_handler*/
            ctx[25],
            false,
            false,
            false,
            false
          ),
          action_destroyer(efx_action = /*efx*/
          ctx[3].call(null, a)),
          listen_dev(
            div,
            "click",
            /*onClickDiv*/
            ctx[9],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            div,
            "close:popup",
            /*onClosePopup*/
            ctx[10],
            false,
            false,
            false,
            false
          ),
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            div,
            /*styles*/
            ctx[2]
          ))
        ];
        mounted = true;
      }
    },
    p: function update(ctx2, [dirty]) {
      if (!current || dirty & /*icon*/
      1 && i_class_value !== (i_class_value = null_to_empty(
        /*icon*/
        ctx2[0]
      ) + " svelte-zm81a2")) {
        attr_dev(i, "class", i_class_value);
      }
      if (!current || dirty & /*icon, selected*/
      17) {
        toggle_class(
          i,
          "selected",
          /*selected*/
          ctx2[4]
        );
      }
      if (!current || dirty & /*titleCurrent*/
      64 && a_title_value !== (a_title_value = localize(
        /*titleCurrent*/
        ctx2[6]
      ))) {
        attr_dev(a, "title", a_title_value);
      }
      if (!current || dirty & /*selected*/
      16) {
        toggle_class(
          a,
          "selected",
          /*selected*/
          ctx2[4]
        );
      }
      if (
        /*selected*/
        ctx2[4]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*selected*/
          16) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (applyStyles_action && is_function(applyStyles_action.update) && dirty & /*styles*/
      4)
        applyStyles_action.update.call(
          null,
          /*styles*/
          ctx2[2]
        );
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div);
      ctx[26](null);
      if (if_block)
        if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment2.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance2($$self, $$props, $$invalidate) {
  let titleCurrent;
  let $store, $$unsubscribe_store = noop, $$subscribe_store = () => ($$unsubscribe_store(), $$unsubscribe_store = subscribe(store, ($$value) => $$invalidate(21, $store = $$value)), store);
  $$self.$$.on_destroy.push(() => $$unsubscribe_store());
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TJSToggleIconButton", slots, ["default"]);
  let { button = void 0 } = $$props;
  let { icon = void 0 } = $$props;
  let { title = void 0 } = $$props;
  let { titleSelected = void 0 } = $$props;
  let { store = void 0 } = $$props;
  validate_store(store, "store");
  $$subscribe_store();
  let { styles = void 0 } = $$props;
  let { efx = void 0 } = $$props;
  let { keyCode = void 0 } = $$props;
  let { onPress = void 0 } = $$props;
  let { onClose = void 0 } = $$props;
  let { onContextMenu = void 0 } = $$props;
  let { onClickPropagate = void 0 } = $$props;
  const dispatch = createEventDispatcher();
  let anchorEl;
  let selected = false;
  function onClick(event) {
    $$invalidate(4, selected = !selected);
    if (store) {
      store.set(selected);
    }
    if (typeof onPress === "function") {
      onPress(selected);
    }
    dispatch("press", { selected });
    if (!onClickPropagate) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  function onContextMenuPress(event) {
    if (typeof onContextMenu === "function") {
      onContextMenu();
    }
    if (!onClickPropagate) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  function onClickDiv(event) {
    if (!onClickPropagate) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  function onClosePopup(event) {
    var _a;
    $$invalidate(4, selected = false);
    if (store) {
      store.set(false);
    }
    if (typeof onClose === "function") {
      onClose(selected);
    }
    if (typeof ((_a = event == null ? void 0 : event.detail) == null ? void 0 : _a.keyboardFocus) === "boolean" && event.detail.keyboardFocus && (anchorEl == null ? void 0 : anchorEl.isConnected)) {
      anchorEl.focus();
      event.stopPropagation();
      event.preventDefault();
    }
  }
  function onKeydown(event) {
    if (event.code === keyCode) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  function onKeyup(event) {
    if (event.code === keyCode) {
      $$invalidate(4, selected = !selected);
      if (store) {
        store.set(selected);
      }
      if (typeof onPress === "function") {
        onPress(selected);
      }
      dispatch("press", { selected });
      event.preventDefault();
      event.stopPropagation();
    }
  }
  const writable_props = [
    "button",
    "icon",
    "title",
    "titleSelected",
    "store",
    "styles",
    "efx",
    "keyCode",
    "onPress",
    "onClose",
    "onContextMenu",
    "onClickPropagate"
  ];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<TJSToggleIconButton> was created with unknown prop '${key}'`);
  });
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function contextmenu_handler(event) {
    bubble.call(this, $$self, event);
  }
  function a_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      anchorEl = $$value;
      $$invalidate(5, anchorEl);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("button" in $$props2)
      $$invalidate(20, button = $$props2.button);
    if ("icon" in $$props2)
      $$invalidate(0, icon = $$props2.icon);
    if ("title" in $$props2)
      $$invalidate(13, title = $$props2.title);
    if ("titleSelected" in $$props2)
      $$invalidate(14, titleSelected = $$props2.titleSelected);
    if ("store" in $$props2)
      $$subscribe_store($$invalidate(1, store = $$props2.store));
    if ("styles" in $$props2)
      $$invalidate(2, styles = $$props2.styles);
    if ("efx" in $$props2)
      $$invalidate(3, efx = $$props2.efx);
    if ("keyCode" in $$props2)
      $$invalidate(15, keyCode = $$props2.keyCode);
    if ("onPress" in $$props2)
      $$invalidate(16, onPress = $$props2.onPress);
    if ("onClose" in $$props2)
      $$invalidate(17, onClose = $$props2.onClose);
    if ("onContextMenu" in $$props2)
      $$invalidate(18, onContextMenu = $$props2.onContextMenu);
    if ("onClickPropagate" in $$props2)
      $$invalidate(19, onClickPropagate = $$props2.onClickPropagate);
    if ("$$scope" in $$props2)
      $$invalidate(22, $$scope = $$props2.$$scope);
  };
  $$self.$capture_state = () => ({
    createEventDispatcher,
    applyStyles,
    isWritableStore,
    localize,
    isObject,
    button,
    icon,
    title,
    titleSelected,
    store,
    styles,
    efx,
    keyCode,
    onPress,
    onClose,
    onContextMenu,
    onClickPropagate,
    dispatch,
    anchorEl,
    selected,
    onClick,
    onContextMenuPress,
    onClickDiv,
    onClosePopup,
    onKeydown,
    onKeyup,
    titleCurrent,
    $store
  });
  $$self.$inject_state = ($$props2) => {
    if ("button" in $$props2)
      $$invalidate(20, button = $$props2.button);
    if ("icon" in $$props2)
      $$invalidate(0, icon = $$props2.icon);
    if ("title" in $$props2)
      $$invalidate(13, title = $$props2.title);
    if ("titleSelected" in $$props2)
      $$invalidate(14, titleSelected = $$props2.titleSelected);
    if ("store" in $$props2)
      $$subscribe_store($$invalidate(1, store = $$props2.store));
    if ("styles" in $$props2)
      $$invalidate(2, styles = $$props2.styles);
    if ("efx" in $$props2)
      $$invalidate(3, efx = $$props2.efx);
    if ("keyCode" in $$props2)
      $$invalidate(15, keyCode = $$props2.keyCode);
    if ("onPress" in $$props2)
      $$invalidate(16, onPress = $$props2.onPress);
    if ("onClose" in $$props2)
      $$invalidate(17, onClose = $$props2.onClose);
    if ("onContextMenu" in $$props2)
      $$invalidate(18, onContextMenu = $$props2.onContextMenu);
    if ("onClickPropagate" in $$props2)
      $$invalidate(19, onClickPropagate = $$props2.onClickPropagate);
    if ("anchorEl" in $$props2)
      $$invalidate(5, anchorEl = $$props2.anchorEl);
    if ("selected" in $$props2)
      $$invalidate(4, selected = $$props2.selected);
    if ("titleCurrent" in $$props2)
      $$invalidate(6, titleCurrent = $$props2.titleCurrent);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*button, icon*/
    1048577) {
      $:
        $$invalidate(0, icon = isObject(button) && typeof button.icon === "string" ? button.icon : typeof icon === "string" ? icon : "");
    }
    if ($$self.$$.dirty & /*button, title*/
    1056768) {
      $:
        $$invalidate(13, title = isObject(button) && typeof button.title === "string" ? button.title : typeof title === "string" ? title : "");
    }
    if ($$self.$$.dirty & /*button, titleSelected*/
    1064960) {
      $:
        $$invalidate(14, titleSelected = isObject(button) && typeof button.titleSelected === "string" ? button.titleSelected : typeof titleSelected === "string" ? titleSelected : "");
    }
    if ($$self.$$.dirty & /*button, store*/
    1048578) {
      $:
        $$subscribe_store($$invalidate(1, store = isObject(button) && isWritableStore(button.store) ? button.store : isWritableStore(store) ? store : void 0));
    }
    if ($$self.$$.dirty & /*button, styles*/
    1048580) {
      $:
        $$invalidate(2, styles = isObject(button) && typeof button.styles === "object" ? button.styles : typeof styles === "object" ? styles : void 0);
    }
    if ($$self.$$.dirty & /*button, efx*/
    1048584) {
      $:
        $$invalidate(3, efx = isObject(button) && typeof button.efx === "function" ? button.efx : typeof efx === "function" ? efx : () => {
        });
    }
    if ($$self.$$.dirty & /*button, keyCode*/
    1081344) {
      $:
        $$invalidate(15, keyCode = isObject(button) && typeof button.keyCode === "string" ? button.keyCode : typeof keyCode === "string" ? keyCode : "Enter");
    }
    if ($$self.$$.dirty & /*button, onPress*/
    1114112) {
      $:
        $$invalidate(16, onPress = isObject(button) && typeof button.onPress === "function" ? button.onPress : typeof onPress === "function" ? onPress : void 0);
    }
    if ($$self.$$.dirty & /*button, onClose*/
    1179648) {
      $:
        $$invalidate(17, onClose = isObject(button) && typeof button.onClose === "function" ? button.onClose : typeof onClose === "function" ? onClose : void 0);
    }
    if ($$self.$$.dirty & /*button, onContextMenu*/
    1310720) {
      $:
        $$invalidate(18, onContextMenu = isObject(button) && typeof button.onContextMenu === "function" ? button.onContextMenu : typeof onContextMenu === "function" ? onContextMenu : void 0);
    }
    if ($$self.$$.dirty & /*button, onClickPropagate*/
    1572864) {
      $:
        $$invalidate(19, onClickPropagate = isObject(button) && typeof button.onClickPropagate === "boolean" ? button.onClickPropagate : typeof onClickPropagate === "boolean" ? onClickPropagate : false);
    }
    if ($$self.$$.dirty & /*store, $store*/
    2097154) {
      $:
        if (store) {
          $$invalidate(4, selected = $store);
        }
    }
    if ($$self.$$.dirty & /*selected, titleSelected, title*/
    24592) {
      $:
        $$invalidate(6, titleCurrent = selected && titleSelected !== "" ? titleSelected : title);
    }
  };
  return [
    icon,
    store,
    styles,
    efx,
    selected,
    anchorEl,
    titleCurrent,
    onClick,
    onContextMenuPress,
    onClickDiv,
    onClosePopup,
    onKeydown,
    onKeyup,
    title,
    titleSelected,
    keyCode,
    onPress,
    onClose,
    onContextMenu,
    onClickPropagate,
    button,
    $store,
    $$scope,
    slots,
    click_handler,
    contextmenu_handler,
    a_binding
  ];
}
var TJSToggleIconButton = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(
      this,
      options,
      instance2,
      create_fragment2,
      safe_not_equal,
      {
        button: 20,
        icon: 0,
        title: 13,
        titleSelected: 14,
        store: 1,
        styles: 2,
        efx: 3,
        keyCode: 15,
        onPress: 16,
        onClose: 17,
        onContextMenu: 18,
        onClickPropagate: 19
      },
      add_css2
    );
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TJSToggleIconButton",
      options,
      id: create_fragment2.name
    });
  }
  get button() {
    throw new Error("<TJSToggleIconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set button(value) {
    throw new Error("<TJSToggleIconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get icon() {
    throw new Error("<TJSToggleIconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set icon(value) {
    throw new Error("<TJSToggleIconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get title() {
    throw new Error("<TJSToggleIconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set title(value) {
    throw new Error("<TJSToggleIconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get titleSelected() {
    throw new Error("<TJSToggleIconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set titleSelected(value) {
    throw new Error("<TJSToggleIconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get store() {
    throw new Error("<TJSToggleIconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set store(value) {
    throw new Error("<TJSToggleIconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get styles() {
    throw new Error("<TJSToggleIconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set styles(value) {
    throw new Error("<TJSToggleIconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get efx() {
    throw new Error("<TJSToggleIconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set efx(value) {
    throw new Error("<TJSToggleIconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get keyCode() {
    throw new Error("<TJSToggleIconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set keyCode(value) {
    throw new Error("<TJSToggleIconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get onPress() {
    throw new Error("<TJSToggleIconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set onPress(value) {
    throw new Error("<TJSToggleIconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get onClose() {
    throw new Error("<TJSToggleIconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set onClose(value) {
    throw new Error("<TJSToggleIconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get onContextMenu() {
    throw new Error("<TJSToggleIconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set onContextMenu(value) {
    throw new Error("<TJSToggleIconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get onClickPropagate() {
    throw new Error("<TJSToggleIconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set onClickPropagate(value) {
    throw new Error("<TJSToggleIconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var TJSToggleIconButton_default = TJSToggleIconButton;

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/container/TJSScrollContainer.svelte
var file3 = "node_modules\\@typhonjs-fvtt\\svelte-standard\\_dist\\component\\standard\\container\\TJSScrollContainer.svelte";
function add_css3(target) {
  append_styles(target, "svelte-1oetj05", ".tjs-scroll-container.svelte-1oetj05{overflow:var(--tjs-scroll-container-overflow, auto);scrollbar-width:var(--tjs-scroll-container-scrollbar-width, thin);scrollbar-color:var(--tjs-scroll-container-scrollbar-color, inherit)}.tjs-scroll-container.svelte-1oetj05:focus-visible{outline:var(--tjs-scroll-container-outline-focus-visible, var(--tjs-default-a11y-outline-focus-visible, 2px solid transparent))}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVEpTU2Nyb2xsQ29udGFpbmVyLnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUEwSEcsb0NBQUEsQ0FDRyxRQUFBLENBQUEsSUFBQSwrQkFBQSxDQUFBLEtBQUEsQ0FBb0QsQ0FHcEQsZUFBQSxDQUFBLElBQUEsc0NBQUEsQ0FBQSxLQUFBLENBQWtFLENBQ2xFLGVBQUEsQ0FBQSxJQUFBLHNDQUFBLENBQUEsUUFBQSxDQUNILENBRUEsb0NBQUEsY0FBQSxDQUNHLE9BQUEsQ0FBQSxJQUFBLDRDQUFBLENBQUEscUVBQUEsQ0FDSCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJUSlNTY3JvbGxDb250YWluZXIuc3ZlbHRlIl19 */");
}
function create_if_block2(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    /*props*/
    ctx[3]
  ];
  var switch_value = (
    /*child*/
    ctx[4]
  );
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return {
      props: switch_instance_props,
      $$inline: true
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
  }
  const block = {
    c: function create() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const switch_instance_changes = dirty & /*props*/
      8 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(
        /*props*/
        ctx2[3]
      )]) : {};
      if (dirty & /*child*/
      16 && switch_value !== (switch_value = /*child*/
      ctx2[4])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block2.name,
    type: "if",
    source: "(116:6) {#if child}",
    ctx
  });
  return block;
}
function fallback_block(ctx) {
  let if_block_anchor;
  let current;
  let if_block = (
    /*child*/
    ctx[4] && create_if_block2(ctx)
  );
  const block = {
    c: function create() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      if (
        /*child*/
        ctx2[4]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*child*/
          16) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block2(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: fallback_block.name,
    type: "fallback",
    source: "(115:9)        ",
    ctx
  });
  return block;
}
function create_fragment3(ctx) {
  let div;
  let applyScrolltop_action;
  let applyStyles_action;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[10].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[9],
    null
  );
  const default_slot_or_fallback = default_slot || fallback_block(ctx);
  const block = {
    c: function create() {
      div = element("div");
      if (default_slot_or_fallback)
        default_slot_or_fallback.c();
      attr_dev(div, "class", "tjs-scroll-container svelte-1oetj05");
      attr_dev(div, "tabindex", "-1");
      add_location(div, file3, 105, 0, 3193);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      if (default_slot_or_fallback) {
        default_slot_or_fallback.m(div, null);
      }
      ctx[11](div);
      current = true;
      if (!mounted) {
        dispose = [
          listen_dev(
            div,
            "keydown",
            /*onKeydown*/
            ctx[5],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            div,
            "keyup",
            /*onKeyup*/
            ctx[6],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            div,
            "wheel",
            /*onWheel*/
            ctx[7],
            false,
            false,
            false,
            false
          ),
          action_destroyer(applyScrolltop_action = applyScrolltop.call(
            null,
            div,
            /*scrollTop*/
            ctx[0]
          )),
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            div,
            /*styles*/
            ctx[1]
          ))
        ];
        mounted = true;
      }
    },
    p: function update(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        512)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[9],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[9]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[9],
              dirty,
              null
            ),
            null
          );
        }
      } else {
        if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*child, props*/
        24)) {
          default_slot_or_fallback.p(ctx2, !current ? -1 : dirty);
        }
      }
      if (applyScrolltop_action && is_function(applyScrolltop_action.update) && dirty & /*scrollTop*/
      1)
        applyScrolltop_action.update.call(
          null,
          /*scrollTop*/
          ctx2[0]
        );
      if (applyStyles_action && is_function(applyStyles_action.update) && dirty & /*styles*/
      2)
        applyStyles_action.update.call(
          null,
          /*styles*/
          ctx2[1]
        );
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(default_slot_or_fallback, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot_or_fallback, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div);
      if (default_slot_or_fallback)
        default_slot_or_fallback.d(detaching);
      ctx[11](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment3.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance3($$self, $$props, $$invalidate) {
  let child;
  let props;
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TJSScrollContainer", slots, ["default"]);
  let { container = void 0 } = $$props;
  let { scrollTop = void 0 } = $$props;
  let { styles = void 0 } = $$props;
  let containerEl;
  function onKeydown(event) {
    switch (event.code) {
      case "PageDown":
      case "PageUp": {
        const activeEl = document.activeElement;
        if (activeEl === containerEl || containerEl.contains(activeEl)) {
          event.stopPropagation();
        }
        break;
      }
    }
  }
  function onKeyup(event) {
    switch (event.code) {
      case "PageDown":
      case "PageUp": {
        const activeEl = document.activeElement;
        if (activeEl === containerEl || containerEl.contains(activeEl)) {
          event.stopPropagation();
        }
        break;
      }
    }
  }
  function onWheel(event) {
    event.stopPropagation();
    const activeEl = document.activeElement;
    if (activeEl !== containerEl && !containerEl.contains(activeEl)) {
      containerEl.focus();
    }
  }
  const writable_props = ["container", "scrollTop", "styles"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<TJSScrollContainer> was created with unknown prop '${key}'`);
  });
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      containerEl = $$value;
      $$invalidate(2, containerEl);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("container" in $$props2)
      $$invalidate(8, container = $$props2.container);
    if ("scrollTop" in $$props2)
      $$invalidate(0, scrollTop = $$props2.scrollTop);
    if ("styles" in $$props2)
      $$invalidate(1, styles = $$props2.styles);
    if ("$$scope" in $$props2)
      $$invalidate(9, $$scope = $$props2.$$scope);
  };
  $$self.$capture_state = () => ({
    writable,
    applyScrolltop,
    applyStyles,
    isObject,
    isSvelteComponent,
    container,
    scrollTop,
    styles,
    containerEl,
    onKeydown,
    onKeyup,
    onWheel,
    props,
    child
  });
  $$self.$inject_state = ($$props2) => {
    if ("container" in $$props2)
      $$invalidate(8, container = $$props2.container);
    if ("scrollTop" in $$props2)
      $$invalidate(0, scrollTop = $$props2.scrollTop);
    if ("styles" in $$props2)
      $$invalidate(1, styles = $$props2.styles);
    if ("containerEl" in $$props2)
      $$invalidate(2, containerEl = $$props2.containerEl);
    if ("props" in $$props2)
      $$invalidate(3, props = $$props2.props);
    if ("child" in $$props2)
      $$invalidate(4, child = $$props2.child);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*container, scrollTop*/
    257) {
      $:
        $$invalidate(0, scrollTop = isObject(container) && isObject(container.scrollTop) ? container.scrollTop : isObject(scrollTop) ? scrollTop : writable(0));
    }
    if ($$self.$$.dirty & /*container, styles*/
    258) {
      $:
        $$invalidate(1, styles = isObject(container) && isObject(container.styles) ? container.styles : isObject(styles) ? styles : void 0);
    }
    if ($$self.$$.dirty & /*container*/
    256) {
      $:
        $$invalidate(4, child = isObject(container) && isSvelteComponent(container.class) ? container.class : void 0);
    }
    if ($$self.$$.dirty & /*container*/
    256) {
      $:
        $$invalidate(3, props = isObject(container) && isObject(container.props) ? container.props : {});
    }
  };
  return [
    scrollTop,
    styles,
    containerEl,
    props,
    child,
    onKeydown,
    onKeyup,
    onWheel,
    container,
    $$scope,
    slots,
    div_binding
  ];
}
var TJSScrollContainer = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance3, create_fragment3, safe_not_equal, { container: 8, scrollTop: 0, styles: 1 }, add_css3);
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TJSScrollContainer",
      options,
      id: create_fragment3.name
    });
  }
  get container() {
    throw new Error("<TJSScrollContainer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set container(value) {
    throw new Error("<TJSScrollContainer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get scrollTop() {
    throw new Error("<TJSScrollContainer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set scrollTop(value) {
    throw new Error("<TJSScrollContainer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get styles() {
    throw new Error("<TJSScrollContainer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set styles(value) {
    throw new Error("<TJSScrollContainer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var TJSScrollContainer_default = TJSScrollContainer;

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/editor/content-editable/CEImpl.js
var _MAX_KEY_ALLOWED, _UUID_REGEX;
var CEImpl = class {
  static hasEnterKeyHandler(options) {
    return typeof options.preventEnterKey === "boolean" && options.preventEnterKey || typeof options.saveOnEnterKey === "boolean" && options.saveOnEnterKey;
  }
  static insertTextAtCursor(text2) {
    if (typeof globalThis.getSelection !== "function") {
      console.warn(`[TRL] Browser does not support 'getSelection'.`);
      return;
    }
    const selection2 = globalThis.getSelection();
    const range = selection2.getRangeAt(0);
    range.deleteContents();
    const node = document.createTextNode(text2);
    range.insertNode(node);
    for (let position = 0; position !== text2.length; position++) {
      selection2.modify("move", "right", "character");
    }
  }
  /**
   * Determines if the given key event is valid when preventing default action and max character length is reached.
   *
   * @param {KeyboardEvent}  event - A KeyboardEvent.
   *
   * @returns {boolean} Prevent default or not.
   */
  static isValidKeyForMaxCharacterLength(event) {
    const selectionLength = typeof globalThis.getSelection === "function" ? globalThis.getSelection().getRangeAt(0).toString().length : 0;
    if (selectionLength > 0) {
      return false;
    }
    if ((event.ctrlKey || event.metaKey) && (event.code === "KeyA" || event.code === "KeyC" || event.code === "KeyV" || event.code === "KeyZ")) {
      return false;
    }
    return !__privateGet(this, _MAX_KEY_ALLOWED).has(event.key);
  }
  /**
   * Handles paste preprocessing. Prevents pasting when `options.maxContentLength` is set and only partially pastes
   * text to fit within the max length.
   *
   * For Foundry v10 and above when `options.maxContentLength` is not defined pasted text is examined for the shape
   * of a raw UUID and if detected attempts to retrieve the document and if found will generate a proper document link
   * from it. You can get the raw UUID by context-clicking the icon in the app header bar for various documents.
   *
   * @param {HTMLDivElement} editorEl -
   *
   * @param {string}         text -
   *
   * @param {object}         options -
   *
   * @param {number}         maxCharacterLength -
   *
   * @returns {string}  Processed paste text.
   */
  static pastePreprocess(editorEl, text2, options, maxCharacterLength) {
    if (maxCharacterLength >= 0) {
      if (typeof globalThis.getSelection !== "function") {
        console.warn(`[TRL] Browser does not support 'getSelection'.`);
        return "";
      }
      let content = striptags(text2);
      if (this.hasEnterKeyHandler(options)) {
        content = content.replace(/[\n\r]+/g, "");
      }
      const bodyLength = editorEl.innerText.length;
      const selectionLength = globalThis.getSelection().getRangeAt(0).toString().length;
      if (selectionLength > 0) {
        if (content.length > selectionLength) {
          const adjustedTotalLength = content.length + bodyLength - selectionLength;
          if (adjustedTotalLength > maxCharacterLength) {
            content = content.substring(0, content.length - (adjustedTotalLength - maxCharacterLength));
          }
        }
      } else {
        if (content.length + bodyLength > maxCharacterLength) {
          const remainingLength = maxCharacterLength - bodyLength;
          content = content.substring(0, remainingLength);
        }
      }
      text2 = content;
    } else {
      if (FVTTVersion.isAtLeast(10) && __privateGet(this, _UUID_REGEX).test(text2)) {
        const uuidDoc = globalThis.fromUuidSync(text2);
        if (uuidDoc) {
          text2 = `@UUID[${text2}]{${uuidDoc.name}}`;
        }
      }
    }
    return text2;
  }
  /**
   * Sets the initial selection based on `options.initialSelection`.
   *
   * @param {HTMLDivElement} editorEl - `.editor` element.
   *
   * @param {string}   initialSelection - Initial selection option.
   *
   * @param {string}   defaultValue - Default value if initialSelection is invalid.
   */
  static setInitialSelection(editorEl, initialSelection, defaultValue) {
    const type = initialSelection === "all" || initialSelection === "end" || initialSelection === "start" ? initialSelection : defaultValue;
    if (!editorEl || typeof globalThis.getSelection !== "function") {
      console.warn(`[TRL] Browser does not support 'getSelection'.`);
      return;
    }
    const selection2 = document.getSelection();
    const range = document.createRange();
    switch (type) {
      case "all":
        range.selectNodeContents(editorEl);
        selection2.removeAllRanges();
        selection2.addRange(range);
        break;
      case "end": {
        const lastElementChild = editorEl.lastElementChild;
        if (lastElementChild) {
          range.setStartAfter(lastElementChild);
          range.setEndAfter(lastElementChild);
          selection2.removeAllRanges();
          selection2.addRange(range);
        }
        break;
      }
      case "start": {
        const firstElementChild = editorEl.firstElementChild;
        if (firstElementChild) {
          range.setStart(firstElementChild, 0);
          range.setEnd(firstElementChild, 0);
          selection2.removeAllRanges();
          selection2.addRange(range);
        }
        break;
      }
    }
  }
};
_MAX_KEY_ALLOWED = new WeakMap();
_UUID_REGEX = new WeakMap();
/**
 * Provides a set of `KeyboardEvent.key` values that are allowed when handling `options.maxCharacterLength`.
 *
 * @type {Set<string>}
 */
__privateAdd(CEImpl, _MAX_KEY_ALLOWED, /* @__PURE__ */ new Set([
  "Backspace",
  "Shift",
  "Control",
  "Alt",
  "CapsLock",
  "PageUp",
  "PageDown",
  "End",
  "Home",
  "ArrowLeft",
  "ArrowUp",
  "ArrowRight",
  "ArrowDown",
  "Insert",
  "Delete",
  "Meta"
]));
/**
 * Defines a regex to check for the shape of a raw Foundry document UUID.
 *
 * @type {RegExp}
 */
__privateAdd(CEImpl, _UUID_REGEX, /(\.).*([a-zA-Z0-9]{16})/);

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/editor/content-editable/TJSContentEdit.svelte
var file4 = "node_modules\\@typhonjs-fvtt\\svelte-standard\\_dist\\component\\standard\\editor\\content-editable\\TJSContentEdit.svelte";
function add_css4(target) {
  append_styles(target, "svelte-2ife3l", '.tjs-editor.svelte-2ife3l{background:var(--tjs-editor-background, none);border:var(--tjs-editor-border, none);border-radius:var(--tjs-editor-border-radius, 0);height:var(--tjs-editor-height, 100%);margin:var(--tjs-editor-margin, 0);outline-offset:var(--tjs-editor-outline-offset, 0.25em);overflow:var(--tjs-editor-content-overflow, var(--tjs-editor-overflow, auto));transition:var(--tjs-editor-transition);width:var(--tjs-editor-width, 100%);color:var(--tjs-editor-content-color, #000);font-family:var(--tjs-editor-content-font-family, "Signika");font-size:var(--tjs-editor-content-font-size, 10.5pt);line-height:var(--tjs-editor-content-line-height, 1.2);padding:var(--tjs-editor-content-padding, 3px 0 0 0);scrollbar-width:thin}.editor-active.svelte-2ife3l{box-shadow:var(--tjs-editor-active-box-shadow);outline:var(--tjs-editor-active-outline);overflow:var(--tjs-editor-active-overflow, auto)}.tjs-editor.svelte-2ife3l:not(.editor-active):focus-visible{box-shadow:var(--tjs-editor-inactive-box-shadow-focus-visible, var(--tjs-default-box-shadow-focus-visible));outline:var(--tjs-editor-inactive-outline-focus-visible, var(--tjs-default-outline-focus-visible, revert));transition:var(--tjs-editor-inactive-transition-focus-visible, var(--tjs-default-transition-focus-visible))}.tjs-editor.svelte-2ife3l:not(.editor-active):not(:focus-visible):hover{box-shadow:var(--tjs-editor-inactive-box-shadow-hover);outline:var(--tjs-editor-inactive-outline-hover)}.tjs-editor.svelte-2ife3l:not(.editor-active):hover{user-select:var(--tjs-editor-inactive-user-select-hover, text)}.tjs-editor.click-to-edit.svelte-2ife3l:not(.editor-active):hover{cursor:var(--tjs-editor-inactive-cursor-hover, text)}.editor-edit.svelte-2ife3l{right:var(--tjs-editor-edit-button-right, 5px);top:var(--tjs-editor-edit-button-top, 0)}.tjs-editor.svelte-2ife3l p:first-of-type{margin-top:0}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVEpTQ29udGVudEVkaXQuc3ZlbHRlIiwibWFwcGluZ3MiOiJBQW1tQkkseUJBQUEsQ0FDSSxVQUFBLENBQUEsSUFBQSx1QkFBQSxDQUFBLEtBQUEsQ0FBOEMsQ0FDOUMsTUFBQSxDQUFBLElBQUEsbUJBQUEsQ0FBQSxLQUFBLENBQXNDLENBQ3RDLGFBQUEsQ0FBQSxJQUFBLDBCQUFBLENBQUEsRUFBQSxDQUFpRCxDQUNqRCxNQUFBLENBQUEsSUFBQSxtQkFBQSxDQUFBLEtBQUEsQ0FBc0MsQ0FDdEMsTUFBQSxDQUFBLElBQUEsbUJBQUEsQ0FBQSxFQUFBLENBQW1DLENBQ25DLGNBQUEsQ0FBQSxJQUFBLDJCQUFBLENBQUEsT0FBQSxDQUF3RCxDQUN4RCxRQUFBLENBQUEsSUFBQSw2QkFBQSxDQUFBLGlDQUFBLENBQThFLENBQzlFLFVBQUEsQ0FBQSxJQUFBLHVCQUFBLENBQXdDLENBQ3hDLEtBQUEsQ0FBQSxJQUFBLGtCQUFBLENBQUEsS0FBQSxDQUFvQyxDQUVwQyxLQUFBLENBQUEsSUFBQSwwQkFBQSxDQUFBLEtBQUEsQ0FBNEMsQ0FDNUMsV0FBQSxDQUFBLElBQUEsZ0NBQUEsQ0FBQSxVQUFBLENBQTZELENBQzdELFNBQUEsQ0FBQSxJQUFBLDhCQUFBLENBQUEsT0FBQSxDQUFzRCxDQUN0RCxXQUFBLENBQUEsSUFBQSxnQ0FBQSxDQUFBLElBQUEsQ0FBdUQsQ0FDdkQsT0FBQSxDQUFBLElBQUEsNEJBQUEsQ0FBQSxVQUFBLENBQXFELENBR3JELGVBQUEsQ0FBQSxJQUNKLENBTUEsNEJBQUEsQ0FDSSxVQUFBLENBQUEsSUFBQSw4QkFBQSxDQUErQyxDQUMvQyxPQUFBLENBQUEsSUFBQSwyQkFBQSxDQUF5QyxDQUN6QyxRQUFBLENBQUEsSUFBQSw0QkFBQSxDQUFBLEtBQUEsQ0FDSixDQUtBLHlCQUFBLEtBQUEsY0FBQSxDQUFBLGNBQUEsQ0FDSSxVQUFBLENBQUEsSUFBQSw4Q0FBQSxDQUFBLDRDQUFBLENBQTRHLENBQzVHLE9BQUEsQ0FBQSxJQUFBLDJDQUFBLENBQUEsaURBQUEsQ0FBMkcsQ0FDM0csVUFBQSxDQUFBLElBQUEsOENBQUEsQ0FBQSw0Q0FBQSxDQUNKLENBS0EseUJBQUEsS0FBQSxjQUFBLENBQUEsS0FBQSxjQUFBLENBQUEsTUFBQSxDQUNJLFVBQUEsQ0FBQSxJQUFBLHNDQUFBLENBQXVELENBQ3ZELE9BQUEsQ0FBQSxJQUFBLG1DQUFBLENBQ0osQ0FLQSx5QkFBQSxLQUFBLGNBQUEsQ0FBQSxNQUFBLENBQ0ksV0FBQSxDQUFBLElBQUEsdUNBQUEsQ0FBQSxLQUFBLENBQ0osQ0FNQSxXQUFBLDRCQUFBLEtBQUEsY0FBQSxDQUFBLE1BQUEsQ0FDSSxNQUFBLENBQUEsSUFBQSxrQ0FBQSxDQUFBLEtBQUEsQ0FDSixDQUVBLDBCQUFBLENBQ0ksS0FBQSxDQUFBLElBQUEsOEJBQUEsQ0FBQSxJQUFBLENBQStDLENBQy9DLEdBQUEsQ0FBQSxJQUFBLDRCQUFBLENBQUEsRUFBQSxDQUNKLENBR0EseUJBQUEsQ0FBQSxlQUFBLENBQ0ksVUFBQSxDQUFBLENBQ0oiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiVEpTQ29udGVudEVkaXQuc3ZlbHRlIl19 */');
}
function create_else_block(ctx) {
  let div;
  let html_tag;
  let t;
  let div_class_value;
  let applyStyles_action;
  let mounted;
  let dispose;
  let if_block = (
    /*editorButton*/
    ctx[5] && create_if_block_1(ctx)
  );
  const block = {
    c: function create() {
      div = element("div");
      html_tag = new HtmlTag(false);
      t = space();
      if (if_block)
        if_block.c();
      html_tag.a = t;
      attr_dev(div, "class", div_class_value = "editor tjs-editor " + (Array.isArray(
        /*options*/
        ctx[1].classes
      ) ? (
        /*options*/
        ctx[1].classes.join(" ")
      ) : "") + " svelte-2ife3l");
      attr_dev(div, "role", "textbox");
      attr_dev(div, "tabindex", "0");
      toggle_class(
        div,
        "click-to-edit",
        /*clickToEdit*/
        ctx[3]
      );
      add_location(div, file4, 593, 4, 19921);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      html_tag.m(
        /*enrichedContent*/
        ctx[2],
        div
      );
      append_dev(div, t);
      if (if_block)
        if_block.m(div, null);
      ctx[20](div);
      if (!mounted) {
        dispose = [
          listen_dev(
            div,
            "click",
            /*onClick*/
            ctx[10],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            div,
            "keydown",
            /*onKeydownInactive*/
            ctx[13],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            div,
            "keyup",
            /*onKeyupInactive*/
            ctx[14],
            false,
            false,
            false,
            false
          ),
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            div,
            /*options*/
            ctx[1].styles
          ))
        ];
        mounted = true;
      }
    },
    p: function update(ctx2, dirty) {
      if (dirty & /*enrichedContent*/
      4)
        html_tag.p(
          /*enrichedContent*/
          ctx2[2]
        );
      if (
        /*editorButton*/
        ctx2[5]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_1(ctx2);
          if_block.c();
          if_block.m(div, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty & /*options*/
      2 && div_class_value !== (div_class_value = "editor tjs-editor " + (Array.isArray(
        /*options*/
        ctx2[1].classes
      ) ? (
        /*options*/
        ctx2[1].classes.join(" ")
      ) : "") + " svelte-2ife3l")) {
        attr_dev(div, "class", div_class_value);
      }
      if (applyStyles_action && is_function(applyStyles_action.update) && dirty & /*options*/
      2)
        applyStyles_action.update.call(
          null,
          /*options*/
          ctx2[1].styles
        );
      if (dirty & /*options, clickToEdit*/
      10) {
        toggle_class(
          div,
          "click-to-edit",
          /*clickToEdit*/
          ctx2[3]
        );
      }
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div);
      if (if_block)
        if_block.d();
      ctx[20](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_else_block.name,
    type: "else",
    source: "(593:0) {:else}",
    ctx
  });
  return block;
}
function create_if_block3(ctx) {
  let div;
  let div_class_value;
  let applyStyles_action;
  let mounted;
  let dispose;
  const block = {
    c: function create() {
      div = element("div");
      attr_dev(div, "class", div_class_value = "editor tjs-editor editor-active " + (Array.isArray(
        /*options*/
        ctx[1].classes
      ) ? (
        /*options*/
        ctx[1].classes.join(" ")
      ) : "") + " svelte-2ife3l");
      attr_dev(div, "contenteditable", "true");
      attr_dev(div, "role", "textbox");
      add_location(div, file4, 581, 4, 19474);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      div.innerHTML = /*content*/
      ctx[0];
      ctx[18](div);
      if (!mounted) {
        dispose = [
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            div,
            /*options*/
            ctx[1].styles
          )),
          listen_dev(
            div,
            "blur",
            /*onBlur*/
            ctx[9],
            false,
            false,
            false,
            false
          ),
          listen_dev(div, "drop", stop_propagation(prevent_default(
            /*onDrop*/
            ctx[11]
          )), false, true, true, false),
          listen_dev(
            div,
            "keydown",
            /*onKeydownActive*/
            ctx[12],
            false,
            false,
            false,
            false
          ),
          listen_dev(div, "paste", prevent_default(
            /*onPaste*/
            ctx[15]
          ), false, true, false, false)
        ];
        mounted = true;
      }
    },
    p: function update(ctx2, dirty) {
      if (dirty & /*content*/
      1)
        div.innerHTML = /*content*/
        ctx2[0];
      ;
      if (dirty & /*options*/
      2 && div_class_value !== (div_class_value = "editor tjs-editor editor-active " + (Array.isArray(
        /*options*/
        ctx2[1].classes
      ) ? (
        /*options*/
        ctx2[1].classes.join(" ")
      ) : "") + " svelte-2ife3l")) {
        attr_dev(div, "class", div_class_value);
      }
      if (applyStyles_action && is_function(applyStyles_action.update) && dirty & /*options*/
      2)
        applyStyles_action.update.call(
          null,
          /*options*/
          ctx2[1].styles
        );
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div);
      ctx[18](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block3.name,
    type: "if",
    source: "(581:0) {#if editorActive}",
    ctx
  });
  return block;
}
function create_if_block_1(ctx) {
  let a;
  let i;
  let mounted;
  let dispose;
  const block = {
    c: function create() {
      a = element("a");
      i = element("i");
      attr_dev(i, "class", "fas fa-edit");
      add_location(i, file4, 605, 75, 20506);
      attr_dev(a, "class", "editor-edit svelte-2ife3l");
      attr_dev(a, "role", "button");
      add_location(a, file4, 605, 12, 20443);
    },
    m: function mount(target, anchor) {
      insert_dev(target, a, anchor);
      append_dev(a, i);
      if (!mounted) {
        dispose = listen_dev(
          a,
          "click",
          /*click_handler*/
          ctx[19],
          false,
          false,
          false,
          false
        );
        mounted = true;
      }
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(a);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_1.name,
    type: "if",
    source: "(604:8) {#if editorButton}",
    ctx
  });
  return block;
}
function create_fragment4(ctx) {
  let if_block_anchor;
  function select_block_type(ctx2, dirty) {
    if (
      /*editorActive*/
      ctx2[4]
    )
      return create_if_block3;
    return create_else_block;
  }
  let current_block_type = select_block_type(ctx, -1);
  let if_block = current_block_type(ctx);
  const block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
    },
    p: function update(ctx2, [dirty]) {
      if (current_block_type === (current_block_type = select_block_type(ctx2, dirty)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if_block.d(detaching);
      if (detaching)
        detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment4.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance4($$self, $$props, $$invalidate) {
  let $doc;
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TJSContentEdit", slots, []);
  let { content = "" } = $$props;
  let { enrichedContent = "" } = $$props;
  let { options = {} } = $$props;
  const dispatch = createEventDispatcher();
  const doc = new TJSDocument({ delete: onDocumentDeleted });
  validate_store(doc, "doc");
  component_subscribe($$self, doc, (value) => $$invalidate(17, $doc = value));
  let clickToEdit;
  let editable;
  let editorActive = false;
  let editorButton;
  let editorEl;
  let keyCode;
  let keyFocused = false;
  let maxCharacterLength;
  onDestroy(() => {
    if (editorActive) {
      saveEditor();
    } else {
      destroyEditor();
    }
  });
  function destroyEditor(fireCancel = true) {
    if (editorActive) {
      setTimeout(() => $$invalidate(4, editorActive = false), 0);
      if (keyFocused) {
        keyFocused = false;
        setTimeout(
          () => {
            if (editorEl instanceof HTMLElement && (editorEl == null ? void 0 : editorEl.isConnected)) {
              editorEl.focus();
            }
          },
          100
        );
      }
      if (fireCancel) {
        dispatch("editor:cancel");
      }
    }
  }
  async function initEditor() {
    $$invalidate(4, editorActive = true);
    await tick();
    CEImpl.setInitialSelection(editorEl, options.initialSelection, "start");
    editorEl.focus();
    dispatch("editor:start");
  }
  function onBlur(event) {
    if (typeof options.saveOnBlur === "boolean" && !options.saveOnBlur) {
      if (editorActive) {
        destroyEditor(true);
      }
      return;
    }
    if (editorActive) {
      saveEditor();
    }
  }
  function onClick(event) {
    if (!editorActive && clickToEdit) {
      initEditor();
    }
  }
  async function onContentChanged(content2, enrichContent) {
    if (typeof content2 === "string") {
      if (enrichContent) {
        $$invalidate(2, enrichedContent = await TextEditor.enrichHTML(content2, {
          async: true,
          secrets: globalThis.game.user.isGM
        }));
      } else {
        $$invalidate(2, enrichedContent = content2);
      }
    } else {
      $$invalidate(2, enrichedContent = "");
    }
    dispatch("editor:enrichedContent", { enrichedContent });
  }
  function onDocumentDeleted(document2) {
    $$invalidate(1, options.document = void 0, options);
    destroyEditor();
    dispatch("editor:document:deleted", { document: document2 });
    $$invalidate(0, content = "");
    $$invalidate(2, enrichedContent = "");
  }
  async function onDrop(event) {
    try {
      const linkOptions = options.document instanceof globalThis.foundry.abstract.Document ? { relative: options.document } : {};
      const link = await TextEditor.getContentLink(JSON.parse(event.dataTransfer.getData("text/plain")), linkOptions);
      if (typeof link === "string") {
        CEImpl.insertTextAtCursor(link);
      }
    } catch (err) {
    }
  }
  function onKeydownActive(event) {
    if (editorActive) {
      let preventDefault = false;
      switch (event.code) {
        case "Enter":
          if (typeof (options == null ? void 0 : options.saveOnEnterKey) === "boolean" && options.saveOnEnterKey) {
            saveEditor();
            preventDefault = true;
          } else if (typeof (options == null ? void 0 : options.preventEnterKey) === "boolean" && options.preventEnterKey) {
            preventDefault = true;
          }
          break;
        case "Escape":
          destroyEditor();
          preventDefault = true;
          break;
        case "KeyS":
          if (event.ctrlKey || event.metaKey) {
            saveEditor();
            preventDefault = true;
          }
          break;
      }
      if (maxCharacterLength !== void 0 && editorEl.innerText.length >= maxCharacterLength) {
        preventDefault |= CEImpl.isValidKeyForMaxCharacterLength(event);
      }
      if (preventDefault) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }
  function onKeydownInactive(event) {
    if (event.code === keyCode) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  function onKeyupInactive(event) {
    if (event.code === keyCode) {
      if (!editorActive) {
        keyFocused = true;
        initEditor();
      }
      event.preventDefault();
      event.stopPropagation();
    }
  }
  function onPaste(event) {
    if (typeof (options == null ? void 0 : options.preventPaste) === "boolean" && options.preventPaste) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    let text2 = event.clipboardData.getData("text/plain");
    if (typeof text2 === "string") {
      text2 = CEImpl.pastePreprocess(editorEl, text2, options, maxCharacterLength);
      CEImpl.insertTextAtCursor(text2);
    }
    event.preventDefault();
  }
  function saveEditor() {
    var _a;
    if (editorActive) {
      let data = editorEl.innerHTML;
      const saving = content !== data;
      if (saving) {
        if ((options == null ? void 0 : options.DOMPurify) && typeof ((_a = options == null ? void 0 : options.DOMPurify) == null ? void 0 : _a.sanitizeWithVideo) === "function") {
          data = options.DOMPurify.sanitizeWithVideo(data);
        }
        if ($doc && options.fieldName) {
          $doc.update({ [options.fieldName]: data });
        } else {
          $$invalidate(0, content = data);
        }
        dispatch("editor:save", { content: data });
      }
      destroyEditor(!saving);
    }
  }
  const writable_props = ["content", "enrichedContent", "options"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<TJSContentEdit> was created with unknown prop '${key}'`);
  });
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      editorEl = $$value;
      $$invalidate(6, editorEl);
    });
  }
  const click_handler = () => initEditor();
  function div_binding_1($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      editorEl = $$value;
      $$invalidate(6, editorEl);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("content" in $$props2)
      $$invalidate(0, content = $$props2.content);
    if ("enrichedContent" in $$props2)
      $$invalidate(2, enrichedContent = $$props2.enrichedContent);
    if ("options" in $$props2)
      $$invalidate(1, options = $$props2.options);
  };
  $$self.$capture_state = () => ({
    createEventDispatcher,
    onDestroy,
    tick,
    applyStyles,
    TJSDocument,
    CEImpl,
    content,
    enrichedContent,
    options,
    dispatch,
    doc,
    clickToEdit,
    editable,
    editorActive,
    editorButton,
    editorEl,
    keyCode,
    keyFocused,
    maxCharacterLength,
    destroyEditor,
    initEditor,
    onBlur,
    onClick,
    onContentChanged,
    onDocumentDeleted,
    onDrop,
    onKeydownActive,
    onKeydownInactive,
    onKeyupInactive,
    onPaste,
    saveEditor,
    $doc
  });
  $$self.$inject_state = ($$props2) => {
    if ("content" in $$props2)
      $$invalidate(0, content = $$props2.content);
    if ("enrichedContent" in $$props2)
      $$invalidate(2, enrichedContent = $$props2.enrichedContent);
    if ("options" in $$props2)
      $$invalidate(1, options = $$props2.options);
    if ("clickToEdit" in $$props2)
      $$invalidate(3, clickToEdit = $$props2.clickToEdit);
    if ("editable" in $$props2)
      $$invalidate(16, editable = $$props2.editable);
    if ("editorActive" in $$props2)
      $$invalidate(4, editorActive = $$props2.editorActive);
    if ("editorButton" in $$props2)
      $$invalidate(5, editorButton = $$props2.editorButton);
    if ("editorEl" in $$props2)
      $$invalidate(6, editorEl = $$props2.editorEl);
    if ("keyCode" in $$props2)
      keyCode = $$props2.keyCode;
    if ("keyFocused" in $$props2)
      keyFocused = $$props2.keyFocused;
    if ("maxCharacterLength" in $$props2)
      maxCharacterLength = $$props2.maxCharacterLength;
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*options, editable*/
    65538) {
      $: {
        $$invalidate(16, editable = typeof options.editable === "boolean" ? options.editable : true);
        if (!editable) {
          destroyEditor();
        }
      }
    }
    if ($$self.$$.dirty & /*editorActive, editable, options*/
    65554) {
      $:
        $$invalidate(3, clickToEdit = !editorActive && editable && (typeof options.clickToEdit === "boolean" ? options.clickToEdit : false));
    }
    if ($$self.$$.dirty & /*editorActive, editable, options, clickToEdit*/
    65562) {
      $:
        $$invalidate(5, editorButton = !editorActive && editable && (typeof options.button === "boolean" ? options.button : true) && !clickToEdit);
    }
    if ($$self.$$.dirty & /*options*/
    2) {
      $:
        keyCode = typeof options.keyCode === "string" ? options.keyCode : "Enter";
    }
    if ($$self.$$.dirty & /*options*/
    2) {
      $:
        maxCharacterLength = Number.isInteger(options.maxCharacterLength) && options.maxCharacterLength >= 0 ? options.maxCharacterLength : void 0;
    }
    if ($$self.$$.dirty & /*options, $doc*/
    131074) {
      $:
        if (options.document !== void 0) {
          if (!(options.document instanceof globalThis.foundry.abstract.Document)) {
            throw new TypeError(`TJSContentEdit error: 'options.document' is not a Foundry document.`);
          }
          if (typeof options.fieldName !== "string") {
            throw new TypeError(`TJSContentEdit error: 'options.document' is defined, but 'options.fieldName' is not a string.`);
          }
          if (options.document !== $doc) {
            $$invalidate(2, enrichedContent = "");
            $$invalidate(0, content = "");
            destroyEditor();
          }
          doc.set(options.document);
        } else {
          if ($doc) {
            $$invalidate(2, enrichedContent = "");
            $$invalidate(0, content = "");
            destroyEditor();
            doc.set(void 0);
          }
        }
    }
    if ($$self.$$.dirty & /*$doc, options, content*/
    131075) {
      $: {
        $$invalidate(0, content = $doc !== void 0 ? globalThis.foundry.utils.getProperty($doc, options.fieldName) : typeof content === "string" ? content : "");
        onContentChanged(content, typeof options.enrichContent === "boolean" ? options.enrichContent : true);
      }
    }
  };
  return [
    content,
    options,
    enrichedContent,
    clickToEdit,
    editorActive,
    editorButton,
    editorEl,
    doc,
    initEditor,
    onBlur,
    onClick,
    onDrop,
    onKeydownActive,
    onKeydownInactive,
    onKeyupInactive,
    onPaste,
    editable,
    $doc,
    div_binding,
    click_handler,
    div_binding_1
  ];
}
var TJSContentEdit = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(
      this,
      options,
      instance4,
      create_fragment4,
      safe_not_equal,
      {
        content: 0,
        enrichedContent: 2,
        options: 1
      },
      add_css4
    );
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TJSContentEdit",
      options,
      id: create_fragment4.name
    });
  }
  get content() {
    throw new Error("<TJSContentEdit>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set content(value) {
    throw new Error("<TJSContentEdit>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get enrichedContent() {
    throw new Error("<TJSContentEdit>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set enrichedContent(value) {
    throw new Error("<TJSContentEdit>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get options() {
    throw new Error("<TJSContentEdit>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set options(value) {
    throw new Error("<TJSContentEdit>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var TJSContentEdit_default = TJSContentEdit;

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/prosemirror/index.js
var _clamp, clamp_fn;
var PMImpl = class {
  /**
   * Handles `options.initialSelection`: Sets the initial cursor / selection range to the start, end, or selects
   * all text.
   *
   * @param {EditorView}  view - PM editor view.
   *
   * @param {object}  options - TJSProseMirror options.
   */
  static setInitialSelection(view, options) {
    const tr = view.state.tr;
    const doc = tr.doc;
    const initialSelection = options.initialSelection;
    const type = initialSelection === "all" || initialSelection === "end" || initialSelection === "start" ? initialSelection : "start";
    const minPos = globalThis.ProseMirror.TextSelection.atStart(doc).from;
    const maxPos = globalThis.ProseMirror.TextSelection.atEnd(doc).to;
    let transaction;
    switch (type) {
      case "all": {
        const resolvedFrom = __privateMethod(this, _clamp, clamp_fn).call(this, 0, minPos, maxPos);
        const resolvedEnd = __privateMethod(this, _clamp, clamp_fn).call(this, doc.content.size, minPos, maxPos);
        transaction = tr.setSelection(globalThis.ProseMirror.TextSelection.create(doc, resolvedFrom, resolvedEnd));
        break;
      }
      case "end": {
        const resolvedFrom = __privateMethod(this, _clamp, clamp_fn).call(this, doc.content.size, minPos, maxPos);
        const resolvedEnd = __privateMethod(this, _clamp, clamp_fn).call(this, doc.content.size, minPos, maxPos);
        transaction = tr.setSelection(globalThis.ProseMirror.TextSelection.create(doc, resolvedFrom, resolvedEnd));
        break;
      }
      case "start": {
        const resolvedFrom = __privateMethod(this, _clamp, clamp_fn).call(this, 0, minPos, maxPos);
        const resolvedEnd = __privateMethod(this, _clamp, clamp_fn).call(this, 0, minPos, maxPos);
        transaction = tr.setSelection(globalThis.ProseMirror.TextSelection.create(doc, resolvedFrom, resolvedEnd));
        break;
      }
    }
    if (transaction) {
      transaction.scrollIntoView();
      view.dispatch(transaction);
    }
  }
};
_clamp = new WeakSet();
clamp_fn = function(value = 0, min = 0, max = 0) {
  return Math.min(Math.max(value, min), max);
};
/**
 * Clamps a value between min / max values.
 *
 * @param {number}   value - Value to clamp.
 *
 * @param {number}   min - Minimum value.
 *
 * @param {number}   max - Maximum value.
 *
 * @returns {number} Clamped value.
 * TODO: Move Math utility function to @typhonjs-svelte/lib
 */
__privateAdd(PMImpl, _clamp);
var ProseMirrorKeyMaps = globalThis.ProseMirror ? globalThis.ProseMirror.ProseMirrorKeyMaps : class {
};
var _onQuit;
var TJSKeyMaps = class extends ProseMirrorKeyMaps {
  /**
   * @param {Schema}   schema - The ProseMirror schema to build keymaps for.
   *
   * @param {object}   [options] - Additional options to configure the plugin's behaviour.
   *
   * @param {Function} [options.onSave] - A function to call when Ctrl+S is pressed.
   *
   * @param {Function} [options.onQuit] - A function to call when Ctrl+Q is pressed.
   */
  constructor(schema, options) {
    super(schema, options);
    __privateAdd(this, _onQuit, void 0);
    if (typeof options.onQuit === "function") {
      __privateSet(this, _onQuit, options.onQuit);
    }
  }
  /**
   * Swaps the Foundry default `Escape` / selectParentNode to `Mod-p` and enables `onQuit` function for `Escape`.
   *
   * @returns {Object<ProseMirrorCommand>} ProseMirror keymap data.
   */
  buildMapping() {
    const mapping = super.buildMapping();
    if (__privateGet(this, _onQuit)) {
      if (mapping["Escape"]) {
        mapping["Mod-p"] = mapping["Escape"];
      }
      mapping["Escape"] = () => __privateGet(this, _onQuit).call(this);
    }
    return mapping;
  }
};
_onQuit = new WeakMap();
var Plugin = globalThis.ProseMirror ? globalThis.ProseMirror.Plugin : class {
};
var _s_UUID_REGEX, _transformUUID, transformUUID_fn;
var _TJSPasteUUID = class {
  constructor() {
    /**
     * Transforms pasted text. Check if pasted test matches the shape of a raw UUID. If so do a lookup and if a
     * document is retrieved transform it to a document link.
     *
     * @param {string}   text - pasted text to transform.
     *
     * @returns {string} Potentially transformed pasted text.
     */
    __privateAdd(this, _transformUUID);
  }
  /**
   * @returns {Plugin<any>} PM Plugin.
   */
  static build() {
    const instance24 = new this();
    return new Plugin({
      // key: new PluginKey('tjsPasteRawUUID'), // TODO: Add back when exported by Foundry / ProseMirror bundle.
      props: {
        transformPastedText: (text2) => {
          var _a;
          return __privateMethod(_a = instance24, _transformUUID, transformUUID_fn).call(_a, text2);
        }
      }
    });
  }
};
var TJSPasteUUID = _TJSPasteUUID;
_s_UUID_REGEX = new WeakMap();
_transformUUID = new WeakSet();
transformUUID_fn = function(text2) {
  if (typeof text2 === "string") {
    if (__privateGet(_TJSPasteUUID, _s_UUID_REGEX).test(text2)) {
      const uuidDoc = globalThis.fromUuidSync(text2);
      if (uuidDoc) {
        text2 = `@UUID[${text2}]{${typeof uuidDoc.name === "string" ? uuidDoc.name : "Unknown"}}`;
      }
    }
  }
  return text2;
};
/**
 * Defines a regex to check for the shape of a raw Foundry document UUID.
 *
 * @type {RegExp}
 */
__privateAdd(TJSPasteUUID, _s_UUID_REGEX, /(\.).*([a-zA-Z0-9]{16})/);
var index = Object.freeze({
  __proto__: null,
  TJSKeyMaps,
  TJSPasteUUID
});

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/editor/prosemirror/TJSProseMirror.svelte
var file5 = "node_modules\\@typhonjs-fvtt\\svelte-standard\\_dist\\component\\standard\\editor\\prosemirror\\TJSProseMirror.svelte";
function add_css5(target) {
  append_styles(target, "svelte-lt7wqw", ".editor.svelte-lt7wqw.svelte-lt7wqw{background:var(--tjs-editor-background, none);border:var(--tjs-editor-border, none);border-radius:var(--tjs-editor-border-radius, 0);height:var(--tjs-editor-height, 100%);margin:var(--tjs-editor-margin, 0);outline-offset:var(--tjs-editor-outline-offset, 0.25em);overflow:var(--tjs-editor-overflow, auto);transition:var(--tjs-editor-transition);width:var(--tjs-editor-width, 100%);scrollbar-width:thin}.editor-active.svelte-lt7wqw.svelte-lt7wqw{box-shadow:var(--tjs-editor-active-box-shadow);outline:var(--tjs-editor-active-outline);overflow:var(--tjs-editor-active-overflow, unset)}.tjs-editor.svelte-lt7wqw.svelte-lt7wqw:not(.editor-active):focus-visible{box-shadow:var(--tjs-editor-inactive-box-shadow-focus-visible, var(--tjs-default-box-shadow-focus-visible));outline:var(--tjs-editor-inactive-outline-focus-visible, var(--tjs-default-outline-focus-visible, revert));transition:var(--tjs-editor-inactive-transition-focus-visible, var(--tjs-default-transition-focus-visible))}.tjs-editor.svelte-lt7wqw.svelte-lt7wqw:not(.editor-active):not(:focus-visible):hover{box-shadow:var(--tjs-editor-inactive-box-shadow-hover);outline:var(--tjs-editor-inactive-outline-hover)}.tjs-editor.svelte-lt7wqw.svelte-lt7wqw:not(.editor-active):hover{user-select:var(--tjs-editor-inactive-user-select-hover, text)}.tjs-editor.click-to-edit.svelte-lt7wqw.svelte-lt7wqw:not(.editor-active):hover{cursor:var(--tjs-editor-inactive-cursor-hover, text)}.editor-content.svelte-lt7wqw.svelte-lt7wqw{overflow:var(--tjs-editor-content-overflow, auto);padding:var(--tjs-editor-content-padding, 0 0 0 0.25em);scrollbar-width:thin}.editor-edit.svelte-lt7wqw.svelte-lt7wqw{right:var(--tjs-editor-edit-button-right, 5px);top:var(--tjs-editor-edit-button-top, 0)}.editor-enriched.svelte-lt7wqw.svelte-lt7wqw{padding:var(--tjs-editor-content-padding, 0 0 0 0.25em)}.tjs-editor.svelte-lt7wqw:not(.editor-active) .editor-enriched.svelte-lt7wqw{user-select:var(--tjs-editor-inactive-user-select-hover, text)}.tjs-editor.svelte-lt7wqw .editor-container .editor-content.svelte-lt7wqw p:first-of-type{margin-top:0}.tjs-editor.svelte-lt7wqw .editor-enriched.svelte-lt7wqw p:first-of-type{margin-top:0}.tjs-editor.svelte-lt7wqw .editor-menu{background:var(--tjs-editor-toolbar-background, rgba(0, 0, 0, 0.1));border-radius:var(--tjs-editor-toolbar-border-radius, 6px);box-shadow:var(--tjs-editor-toolbar-box-shadow, 0 2px 2px -2px rgb(34 47 62 / 10%), 0 8px 8px -4px rgb(34 47 62 / 7%));margin-bottom:0.25em;padding:var(--tjs-editor-toolbar-padding, 2px 0);width:var(--tjs-editor-toolbar-width, 100%);transition:box-shadow 500ms ease-in-out}.tjs-editor.prosemirror.editing-source.svelte-lt7wqw textarea{padding:0}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVEpTUHJvc2VNaXJyb3Iuc3ZlbHRlIiwibWFwcGluZ3MiOiJBQXdqQkksbUNBQUEsQ0FDSSxVQUFBLENBQUEsSUFBQSx1QkFBQSxDQUFBLEtBQUEsQ0FBOEMsQ0FDOUMsTUFBQSxDQUFBLElBQUEsbUJBQUEsQ0FBQSxLQUFBLENBQXNDLENBQ3RDLGFBQUEsQ0FBQSxJQUFBLDBCQUFBLENBQUEsRUFBQSxDQUFpRCxDQUNqRCxNQUFBLENBQUEsSUFBQSxtQkFBQSxDQUFBLEtBQUEsQ0FBc0MsQ0FDdEMsTUFBQSxDQUFBLElBQUEsbUJBQUEsQ0FBQSxFQUFBLENBQW1DLENBQ25DLGNBQUEsQ0FBQSxJQUFBLDJCQUFBLENBQUEsT0FBQSxDQUF3RCxDQUN4RCxRQUFBLENBQUEsSUFBQSxxQkFBQSxDQUFBLEtBQUEsQ0FBMEMsQ0FDMUMsVUFBQSxDQUFBLElBQUEsdUJBQUEsQ0FBd0MsQ0FDeEMsS0FBQSxDQUFBLElBQUEsa0JBQUEsQ0FBQSxLQUFBLENBQW9DLENBR3BDLGVBQUEsQ0FBQSxJQUNKLENBTUEsMENBQUEsQ0FDSSxVQUFBLENBQUEsSUFBQSw4QkFBQSxDQUErQyxDQUMvQyxPQUFBLENBQUEsSUFBQSwyQkFBQSxDQUF5QyxDQUN6QyxRQUFBLENBQUEsSUFBQSw0QkFBQSxDQUFBLE1BQUEsQ0FDSixDQUtBLHVDQUFBLEtBQUEsY0FBQSxDQUFBLGNBQUEsQ0FDSSxVQUFBLENBQUEsSUFBQSw4Q0FBQSxDQUFBLDRDQUFBLENBQTRHLENBQzVHLE9BQUEsQ0FBQSxJQUFBLDJDQUFBLENBQUEsaURBQUEsQ0FBMkcsQ0FDM0csVUFBQSxDQUFBLElBQUEsOENBQUEsQ0FBQSw0Q0FBQSxDQUNKLENBS0EsdUNBQUEsS0FBQSxjQUFBLENBQUEsS0FBQSxjQUFBLENBQUEsTUFBQSxDQUNJLFVBQUEsQ0FBQSxJQUFBLHNDQUFBLENBQXVELENBQ3ZELE9BQUEsQ0FBQSxJQUFBLG1DQUFBLENBQ0osQ0FLQSx1Q0FBQSxLQUFBLGNBQUEsQ0FBQSxNQUFBLENBQ0ksV0FBQSxDQUFBLElBQUEsdUNBQUEsQ0FBQSxLQUFBLENBQ0osQ0FNQSxXQUFBLDBDQUFBLEtBQUEsY0FBQSxDQUFBLE1BQUEsQ0FDSSxNQUFBLENBQUEsSUFBQSxrQ0FBQSxDQUFBLEtBQUEsQ0FDSixDQUVBLDJDQUFBLENBQ0ksUUFBQSxDQUFBLElBQUEsNkJBQUEsQ0FBQSxLQUFBLENBQWtELENBQ2xELE9BQUEsQ0FBQSxJQUFBLDRCQUFBLENBQUEsYUFBQSxDQUF3RCxDQUd4RCxlQUFBLENBQUEsSUFDSixDQUVBLHdDQUFBLENBQ0ksS0FBQSxDQUFBLElBQUEsOEJBQUEsQ0FBQSxJQUFBLENBQStDLENBQy9DLEdBQUEsQ0FBQSxJQUFBLDRCQUFBLENBQUEsRUFBQSxDQUNKLENBRUEsNENBQUEsQ0FDSSxPQUFBLENBQUEsSUFBQSw0QkFBQSxDQUFBLGFBQUEsQ0FDSixDQUdBLHlCQUFBLEtBQUEsY0FBQSxDQUFBLENBQUEsOEJBQUEsQ0FDSSxXQUFBLENBQUEsSUFBQSx1Q0FBQSxDQUFBLEtBQUEsQ0FDSixDQUdBLHlCQUFBLENBQUEsaUJBQUEsQ0FBQSw2QkFBQSxDQUFBLGVBQUEsQ0FDSSxVQUFBLENBQUEsQ0FDSixDQUVBLHlCQUFBLENBQUEsOEJBQUEsQ0FBQSxlQUFBLENBQ0ksVUFBQSxDQUFBLENBQ0osQ0FHQSx5QkFBQSxDQUFBLFlBQUEsQ0FDSSxVQUFBLENBQUEsSUFBQSwrQkFBQSxDQUFBLG1CQUFBLENBQW9FLENBQ3BFLGFBQUEsQ0FBQSxJQUFBLGtDQUFBLENBQUEsSUFBQSxDQUEyRCxDQUMzRCxVQUFBLENBQUEsSUFBQSwrQkFBQSxDQUFBLHNFQUFBLENBQXVILENBQ3ZILGFBQUEsQ0FBQSxNQUFxQixDQUNyQixPQUFBLENBQUEsSUFBQSw0QkFBQSxDQUFBLE1BQUEsQ0FBaUQsQ0FDakQsS0FBQSxDQUFBLElBQUEsMEJBQUEsQ0FBQSxLQUFBLENBQTRDLENBRTVDLFVBQUEsQ0FBQSxVQUFBLENBQUEsS0FBQSxDQUFBLFdBQ0osQ0FHQSxXQUFBLFlBQUEsNkJBQUEsQ0FBQSxRQUFBLENBQ0ksT0FBQSxDQUFBLENBQ0oiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiVEpTUHJvc2VNaXJyb3Iuc3ZlbHRlIl19 */");
}
function create_if_block_12(ctx) {
  let a;
  let i;
  let mounted;
  let dispose;
  const block = {
    c: function create() {
      a = element("a");
      i = element("i");
      attr_dev(i, "class", "fas fa-edit");
      add_location(i, file5, 556, 71, 19703);
      attr_dev(a, "class", "editor-edit svelte-lt7wqw");
      attr_dev(a, "role", "button");
      add_location(a, file5, 556, 8, 19640);
    },
    m: function mount(target, anchor) {
      insert_dev(target, a, anchor);
      append_dev(a, i);
      if (!mounted) {
        dispose = listen_dev(
          a,
          "click",
          /*click_handler*/
          ctx[15],
          false,
          false,
          false,
          false
        );
        mounted = true;
      }
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(a);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_12.name,
    type: "if",
    source: "(555:4) {#if editorButton}",
    ctx
  });
  return block;
}
function create_else_block2(ctx) {
  let div;
  const block = {
    c: function create() {
      div = element("div");
      attr_dev(div, "class", "editor-enriched svelte-lt7wqw");
      add_location(div, file5, 561, 8, 19853);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      div.innerHTML = /*enrichedContent*/
      ctx[1];
    },
    p: function update(ctx2, dirty) {
      if (dirty & /*enrichedContent*/
      2)
        div.innerHTML = /*enrichedContent*/
        ctx2[1];
      ;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_else_block2.name,
    type: "else",
    source: "(561:4) {:else}",
    ctx
  });
  return block;
}
function create_if_block4(ctx) {
  let div;
  const block = {
    c: function create() {
      div = element("div");
      attr_dev(div, "class", "editor-content svelte-lt7wqw");
      add_location(div, file5, 559, 8, 19776);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      ctx[16](div);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div);
      ctx[16](null);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block4.name,
    type: "if",
    source: "(559:4) {#if editorActive}",
    ctx
  });
  return block;
}
function create_fragment5(ctx) {
  let div;
  let t;
  let div_class_value;
  let applyStyles_action;
  let mounted;
  let dispose;
  let if_block0 = (
    /*editorButton*/
    ctx[5] && create_if_block_12(ctx)
  );
  function select_block_type(ctx2, dirty) {
    if (
      /*editorActive*/
      ctx2[3]
    )
      return create_if_block4;
    return create_else_block2;
  }
  let current_block_type = select_block_type(ctx, -1);
  let if_block1 = current_block_type(ctx);
  const block = {
    c: function create() {
      div = element("div");
      if (if_block0)
        if_block0.c();
      t = space();
      if_block1.c();
      attr_dev(div, "class", div_class_value = "editor prosemirror tjs-editor " + (Array.isArray(
        /*options*/
        ctx[0].classes
      ) ? (
        /*options*/
        ctx[0].classes.join(" ")
      ) : "") + " svelte-lt7wqw");
      attr_dev(div, "role", "textbox");
      attr_dev(div, "tabindex", "0");
      toggle_class(
        div,
        "click-to-edit",
        /*clickToEdit*/
        ctx[2]
      );
      toggle_class(
        div,
        "editor-active",
        /*editorActive*/
        ctx[3]
      );
      add_location(div, file5, 544, 0, 19158);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      if (if_block0)
        if_block0.m(div, null);
      append_dev(div, t);
      if_block1.m(div, null);
      ctx[17](div);
      if (!mounted) {
        dispose = [
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            div,
            /*options*/
            ctx[0].styles
          )),
          listen_dev(
            div,
            "click",
            /*onClick*/
            ctx[9],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            div,
            "keydown",
            /*onKeydown*/
            ctx[10],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            div,
            "keyup",
            /*onKeyup*/
            ctx[11],
            false,
            false,
            false,
            false
          )
        ];
        mounted = true;
      }
    },
    p: function update(ctx2, [dirty]) {
      if (
        /*editorButton*/
        ctx2[5]
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_12(ctx2);
          if_block0.c();
          if_block0.m(div, t);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (current_block_type === (current_block_type = select_block_type(ctx2, dirty)) && if_block1) {
        if_block1.p(ctx2, dirty);
      } else {
        if_block1.d(1);
        if_block1 = current_block_type(ctx2);
        if (if_block1) {
          if_block1.c();
          if_block1.m(div, null);
        }
      }
      if (dirty & /*options*/
      1 && div_class_value !== (div_class_value = "editor prosemirror tjs-editor " + (Array.isArray(
        /*options*/
        ctx2[0].classes
      ) ? (
        /*options*/
        ctx2[0].classes.join(" ")
      ) : "") + " svelte-lt7wqw")) {
        attr_dev(div, "class", div_class_value);
      }
      if (applyStyles_action && is_function(applyStyles_action.update) && dirty & /*options*/
      1)
        applyStyles_action.update.call(
          null,
          /*options*/
          ctx2[0].styles
        );
      if (dirty & /*options, clickToEdit*/
      5) {
        toggle_class(
          div,
          "click-to-edit",
          /*clickToEdit*/
          ctx2[2]
        );
      }
      if (dirty & /*options, editorActive*/
      9) {
        toggle_class(
          div,
          "editor-active",
          /*editorActive*/
          ctx2[3]
        );
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div);
      if (if_block0)
        if_block0.d();
      if_block1.d();
      ctx[17](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment5.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance5($$self, $$props, $$invalidate) {
  let $doc;
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TJSProseMirror", slots, []);
  let { content = "" } = $$props;
  let { enrichedContent = "" } = $$props;
  let { options = {} } = $$props;
  const dispatch = createEventDispatcher();
  const doc = new TJSDocument({ delete: onDocumentDeleted });
  validate_store(doc, "doc");
  component_subscribe($$self, doc, (value) => $$invalidate(14, $doc = value));
  let clickToEdit;
  let editable = true;
  let editorContentEl;
  let editor;
  let editorActive = false;
  let editorButton;
  let editorEl;
  let keyCode;
  let keyFocused = false;
  onDestroy(() => {
    if (editorActive) {
      saveEditor({
        remove: typeof options.button === "boolean" ? options.button : true
      });
    } else {
      destroyEditor();
    }
  });
  onMount(() => {
    if (editable && !editorButton && !clickToEdit) {
      initEditor();
    }
  });
  function destroyEditor(fireCancel = true) {
    if (editor) {
      editor.destroy();
      editor = void 0;
      setTimeout(
        () => {
          $$invalidate(3, editorActive = false);
        },
        0
      );
      if (keyFocused) {
        keyFocused = false;
        setTimeout(
          () => {
            if (editorEl instanceof HTMLElement && (editorEl == null ? void 0 : editorEl.isConnected)) {
              editorEl.focus();
            }
          },
          100
        );
      }
      if (fireCancel) {
        dispatch("editor:cancel");
      }
    }
  }
  async function initEditor() {
    const remove = typeof options.button === "boolean" ? options.button : true;
    const editorOptions = {
      ...options,
      plugins: {
        ...ProseMirror.defaultPlugins,
        menu: ProseMirror.ProseMirrorMenu.build(ProseMirror.defaultSchema, {
          destroyOnSave: remove,
          onSave: () => saveEditor({ remove })
        }),
        keyMaps: index.TJSKeyMaps.build(ProseMirror.defaultSchema, {
          onSave: () => saveEditor({ remove }),
          onQuit: () => destroyEditor()
        }),
        tjsPasteRawUUID: index.TJSPasteUUID.build(),
        ...typeof options.plugins === "object" ? options.plugins : {}
      }
    };
    $$invalidate(3, editorActive = true);
    await tick();
    editor = await ProseMirrorEditor.create(editorContentEl, content, editorOptions);
    const containerEl = editorEl.querySelector(".editor-container");
    if (containerEl) {
      containerEl.style = "margin: var(--tjs-editor-container-margin, 0)";
    }
    editor.view.focus();
    PMImpl.setInitialSelection(editor.view, options);
    dispatch("editor:start");
  }
  function onClick(event) {
    if (!editorActive && clickToEdit) {
      initEditor();
    }
  }
  async function onContentChanged(content2, enrichContent) {
    if (typeof content2 === "string") {
      if (enrichContent) {
        $$invalidate(1, enrichedContent = await TextEditor.enrichHTML(content2, {
          async: true,
          secrets: globalThis.game.user.isGM
        }));
      } else {
        $$invalidate(1, enrichedContent = content2);
      }
    } else {
      $$invalidate(1, enrichedContent = "");
    }
    dispatch("editor:enrichedContent", { enrichedContent });
  }
  function onDocumentDeleted(document2) {
    $$invalidate(0, options.document = void 0, options);
    destroyEditor();
    dispatch("editor:document:deleted", { document: document2 });
    $$invalidate(12, content = "");
    $$invalidate(1, enrichedContent = "");
  }
  function onKeydown(event) {
    if (editorActive) {
      if (event.code === "Escape" || event.code === "KeyS" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        event.stopPropagation();
      }
    } else {
      if (event.code === keyCode) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }
  function onKeyup(event) {
    if (event.code === keyCode) {
      if (!editorActive) {
        keyFocused = true;
        initEditor();
      }
      event.preventDefault();
      event.stopPropagation();
    }
  }
  function saveEditor({ remove = true } = {}) {
    var _a;
    if (editor) {
      if (editor.isDirty()) {
        let data = ProseMirror.dom.serializeString(editor.view.state.doc);
        if ((options == null ? void 0 : options.DOMPurify) && typeof ((_a = options == null ? void 0 : options.DOMPurify) == null ? void 0 : _a.sanitizeWithVideo) === "function") {
          data = options.DOMPurify.sanitizeWithVideo(data);
        }
        if ($doc && options.fieldName) {
          $doc.update({ [options.fieldName]: data });
        } else {
          $$invalidate(12, content = data);
        }
        dispatch("editor:save", { content: data });
      }
      if (remove) {
        destroyEditor(false);
      }
    }
  }
  const writable_props = ["content", "enrichedContent", "options"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<TJSProseMirror> was created with unknown prop '${key}'`);
  });
  const click_handler = () => initEditor();
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      editorContentEl = $$value;
      $$invalidate(4, editorContentEl);
    });
  }
  function div_binding_1($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      editorEl = $$value;
      $$invalidate(6, editorEl);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("content" in $$props2)
      $$invalidate(12, content = $$props2.content);
    if ("enrichedContent" in $$props2)
      $$invalidate(1, enrichedContent = $$props2.enrichedContent);
    if ("options" in $$props2)
      $$invalidate(0, options = $$props2.options);
  };
  $$self.$capture_state = () => ({
    createEventDispatcher,
    onDestroy,
    onMount,
    tick,
    applyStyles,
    TJSDocument,
    Plugins: index,
    PMImpl,
    content,
    enrichedContent,
    options,
    dispatch,
    doc,
    clickToEdit,
    editable,
    editorContentEl,
    editor,
    editorActive,
    editorButton,
    editorEl,
    keyCode,
    keyFocused,
    destroyEditor,
    initEditor,
    onClick,
    onContentChanged,
    onDocumentDeleted,
    onKeydown,
    onKeyup,
    saveEditor,
    $doc
  });
  $$self.$inject_state = ($$props2) => {
    if ("content" in $$props2)
      $$invalidate(12, content = $$props2.content);
    if ("enrichedContent" in $$props2)
      $$invalidate(1, enrichedContent = $$props2.enrichedContent);
    if ("options" in $$props2)
      $$invalidate(0, options = $$props2.options);
    if ("clickToEdit" in $$props2)
      $$invalidate(2, clickToEdit = $$props2.clickToEdit);
    if ("editable" in $$props2)
      $$invalidate(13, editable = $$props2.editable);
    if ("editorContentEl" in $$props2)
      $$invalidate(4, editorContentEl = $$props2.editorContentEl);
    if ("editor" in $$props2)
      editor = $$props2.editor;
    if ("editorActive" in $$props2)
      $$invalidate(3, editorActive = $$props2.editorActive);
    if ("editorButton" in $$props2)
      $$invalidate(5, editorButton = $$props2.editorButton);
    if ("editorEl" in $$props2)
      $$invalidate(6, editorEl = $$props2.editorEl);
    if ("keyCode" in $$props2)
      keyCode = $$props2.keyCode;
    if ("keyFocused" in $$props2)
      keyFocused = $$props2.keyFocused;
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*options, editable*/
    8193) {
      $: {
        $$invalidate(13, editable = typeof options.editable === "boolean" ? options.editable : true);
        if (!editable) {
          destroyEditor();
        }
      }
    }
    if ($$self.$$.dirty & /*editorActive, editable, options*/
    8201) {
      $:
        $$invalidate(2, clickToEdit = !editorActive && editable && (typeof options.clickToEdit === "boolean" ? options.clickToEdit : false));
    }
    if ($$self.$$.dirty & /*editorActive, editable, options, clickToEdit*/
    8205) {
      $:
        $$invalidate(5, editorButton = !editorActive && editable && (typeof options.button === "boolean" ? options.button : true) && !clickToEdit);
    }
    if ($$self.$$.dirty & /*options*/
    1) {
      $:
        keyCode = typeof options.keyCode === "string" ? options.keyCode : "Enter";
    }
    if ($$self.$$.dirty & /*options, $doc*/
    16385) {
      $:
        if (options.document !== void 0) {
          if (!(options.document instanceof globalThis.foundry.abstract.Document)) {
            throw new TypeError(`TJSProseMirror error: 'options.document' is not a Foundry document.`);
          }
          if (typeof options.fieldName !== "string") {
            throw new TypeError(`TJSProseMirror error: 'options.document' is defined, but 'options.fieldName' is not a string.`);
          }
          if (options.document !== $doc) {
            $$invalidate(1, enrichedContent = "");
            $$invalidate(12, content = "");
            destroyEditor();
          }
          doc.set(options.document);
        } else {
          if ($doc) {
            $$invalidate(1, enrichedContent = "");
            $$invalidate(12, content = "");
            destroyEditor();
            doc.set(void 0);
          }
        }
    }
    if ($$self.$$.dirty & /*$doc, options, content*/
    20481) {
      $: {
        $$invalidate(12, content = $doc !== void 0 ? globalThis.foundry.utils.getProperty($doc, options.fieldName) : typeof content === "string" ? content : "");
        onContentChanged(content, typeof options.enrichContent === "boolean" ? options.enrichContent : true);
      }
    }
  };
  return [
    options,
    enrichedContent,
    clickToEdit,
    editorActive,
    editorContentEl,
    editorButton,
    editorEl,
    doc,
    initEditor,
    onClick,
    onKeydown,
    onKeyup,
    content,
    editable,
    $doc,
    click_handler,
    div_binding,
    div_binding_1
  ];
}
var TJSProseMirror = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(
      this,
      options,
      instance5,
      create_fragment5,
      safe_not_equal,
      {
        content: 12,
        enrichedContent: 1,
        options: 0
      },
      add_css5
    );
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TJSProseMirror",
      options,
      id: create_fragment5.name
    });
  }
  get content() {
    throw new Error("<TJSProseMirror>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set content(value) {
    throw new Error("<TJSProseMirror>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get enrichedContent() {
    throw new Error("<TJSProseMirror>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set enrichedContent(value) {
    throw new Error("<TJSProseMirror>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get options() {
    throw new Error("<TJSProseMirror>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set options(value) {
    throw new Error("<TJSProseMirror>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var TJSProseMirror_default = TJSProseMirror;

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/editor/tinymce/MCEImpl.js
var _s_CSS_VARS_EDITOR, _s_UUID_REGEX2;
var _MCEImpl = class {
  static beforeInputHandler(editor, event, options, maxCharacterLength) {
    if (maxCharacterLength === void 0 || editor.plugins.wordcount === void 0) {
      return;
    }
    if (!(event == null ? void 0 : event.isTrusted)) {
      return;
    }
    const inputType = event.inputType;
    if (inputType === "deleteContentBackward" || inputType === "deleteContentForward") {
      return;
    }
    const hasSelection = editor.plugins.wordcount.selection.getCharacterCount() > 0;
    if (hasSelection && inputType === "insertText") {
      return;
    }
    const bodyLength = editor.plugins.wordcount.body.getCharacterCount();
    if (bodyLength >= maxCharacterLength) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }
  static hasEnterKeyHandler(options) {
    return typeof options.preventEnterKey === "boolean" && options.preventEnterKey || typeof options.saveOnEnterKey === "boolean" && options.saveOnEnterKey;
  }
  static get isV5() {
    var _a;
    return ((_a = globalThis.tinymce) == null ? void 0 : _a.majorVersion) === "5";
  }
  static get isV6() {
    var _a;
    return ((_a = globalThis.tinymce) == null ? void 0 : _a.majorVersion) === "6";
  }
  static keydownHandler(editor, event, options, saveEditor, content) {
    switch (event.code) {
      case "Enter":
        if (_MCEImpl.hasEnterKeyHandler(options)) {
          event.preventDefault();
          event.stopPropagation();
          if (typeof options.saveOnEnterKey === "boolean" && options.saveOnEnterKey) {
            saveEditor();
          }
          return false;
        }
        break;
      case "Escape":
        editor.resetContent(content);
        setTimeout(() => saveEditor(), 0);
        break;
    }
  }
  /**
   * Provides a mechanism to load core Foundry fonts and any additional font family definitions. The returned data
   * includes the parsed font family definitions and the configuration data TinyMCE needs for loading the font formats.
   *
   * @param {Object<FontFamilyDefinition>}  [extraFonts] - Extra user defined fonts to load.
   *
   * @returns {{ fonts: Object<FontFamilyDefinition>[], fontFormats: string}} Font formats for MCE & all fonts to load.
   */
  static getFontData(extraFonts = {}) {
    if (typeof extraFonts !== "object") {
      throw new TypeError(`'extraFonts' is not an object.`);
    }
    const fonts = [
      ...FontManager.getCoreDefinitions(),
      extraFonts
    ];
    const fontFormatSet = /* @__PURE__ */ new Set();
    for (const definitions of fonts) {
      if (typeof definitions === "object") {
        for (const family of Object.keys(definitions)) {
          fontFormatSet.add(`${family}=${family};`);
        }
      }
    }
    return { fonts, fontFormats: [...fontFormatSet].sort().join("") };
  }
  /**
   * Handles paste preprocessing. Prevents pasting when `options.preventPaste` is true. Prevents pasting when
   * `options.maxContentLength` is set and only partially pastes text to fit within the max length.
   *
   *
   * For Foundry v10 and above when `options.maxContentLength` is not defined pasted text is examined for the shape
   * of a raw UUID and if detected attempts to retrieve the document and if found will generate a proper document link
   * from it. You can get the raw UUID by context-clicking the icon in the app header bar for various documents.
   *
   * @param {TinyMCE.Editor} editor -
   *
   * @param {object}         args -
   *
   * @param {object}         options -
   *
   * @param {number}         maxCharacterLength -
   */
  static pastePreprocess(editor, args, options, maxCharacterLength) {
    if (typeof args.content !== "string" || typeof options.preventPaste === "boolean" && options.preventPaste) {
      args.stopImmediatePropagation();
      args.stopPropagation();
      args.preventDefault();
    }
    if (maxCharacterLength >= 0) {
      let content = striptags(args.content);
      if (this.hasEnterKeyHandler(options)) {
        content = content.replace(/[\n\r]+/g, "");
      }
      const bodyLength = editor.plugins.wordcount.body.getCharacterCount();
      const selectionLength = editor.plugins.wordcount.selection.getCharacterCount();
      if (selectionLength > 0) {
        if (content.length > selectionLength) {
          const adjustedTotalLength = content.length + bodyLength - selectionLength;
          if (adjustedTotalLength > maxCharacterLength) {
            content = content.substring(0, content.length - (adjustedTotalLength - maxCharacterLength));
          }
        }
      } else {
        if (content.length + bodyLength > maxCharacterLength) {
          const remainingLength = maxCharacterLength - bodyLength;
          content = content.substring(0, remainingLength);
        }
      }
      args.content = content;
    } else {
      let text2 = args.content;
      if (FVTTVersion.isAtLeast(10) && __privateGet(this, _s_UUID_REGEX2).test(text2)) {
        const uuidDoc = globalThis.fromUuidSync(text2);
        if (uuidDoc) {
          text2 = `@UUID[${text2}]{${uuidDoc.name}}`;
        }
      }
      args.content = text2;
    }
  }
  /**
   * Sets the initial selection based on `options.initialSelection`.
   *
   * @param {TinyMCE.Editor} editor - MCE editor.
   *
   * @param {string}   initialSelection - Initial selection option.
   *
   * @param {string}   defaultValue - Default value if initialSelection is invalid.
   */
  static setInitialSelection(editor, initialSelection, defaultValue) {
    const type = initialSelection === "all" || initialSelection === "end" || initialSelection === "start" ? initialSelection : defaultValue;
    const selection2 = editor.selection;
    const bodyEl = editor.getBody();
    if (!bodyEl) {
      return;
    }
    switch (type) {
      case "all":
        selection2.select(bodyEl, true);
        break;
      case "end":
        selection2.select(bodyEl, true);
        selection2.collapse(false);
        break;
      case "start":
        selection2.select(bodyEl, true);
        selection2.collapse(true);
        break;
    }
    editor.focus();
  }
  /**
   * Copies over the CSS variable data that is inspected on the `.editor-content` div before the editor is active if
   * set or the default values to the body element of the TinyMCE IFrame.
   *
   * @param {HTMLElement} editorContentEl - Editor content element.
   *
   * @returns {string} TinyMCE config `content_style` parameter for .
   */
  static setMCEConfigContentStyle(editorContentEl) {
    const cssBodyInlineStyles = {};
    const styles = globalThis.getComputedStyle(editorContentEl);
    for (const entry of __privateGet(this, _s_CSS_VARS_EDITOR)) {
      const currentPropertyValue = styles.getPropertyValue(entry.variable);
      cssBodyInlineStyles[entry.property] = currentPropertyValue !== "" ? currentPropertyValue : entry.default;
    }
    return `body { ${Object.entries(cssBodyInlineStyles).map(
      (array) => `${array[0]}: ${array[1]};`
    ).join(";")} } p:first-of-type { margin-top: 0; }`;
  }
};
var MCEImpl = _MCEImpl;
_s_CSS_VARS_EDITOR = new WeakMap();
_s_UUID_REGEX2 = new WeakMap();
/**
 * Stores the CSS variable data that is inspected on the `.editor-content` div before the editor is active and
 * copies these values if set or the default values to the body element of the TinyMCE IFrame.
 *
 * @type {object[]}
 */
__privateAdd(MCEImpl, _s_CSS_VARS_EDITOR, [
  { variable: "--tjs-editor-content-color", property: "color", default: "#000" },
  { variable: "--tjs-editor-content-font-family", property: "font-family", default: "Signika" },
  { variable: "--tjs-editor-content-font-size", property: "font-size", default: "10.5pt" },
  { variable: "--tjs-editor-content-line-height", property: "line-height", default: "1.2" },
  { variable: "--tjs-editor-content-padding", property: "padding", default: "3px 0 0 0" }
]);
/**
 * Defines a regex to check for the shape of a raw Foundry document UUID.
 *
 * @type {RegExp}
 */
__privateAdd(MCEImpl, _s_UUID_REGEX2, /(\.).*([a-zA-Z0-9]{16})/);

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/editor/tinymce/TinyMCEHelper.js
var _getStyleFormats, getStyleFormats_fn, _s_ALL_STYLE_FORMATS, _s_BASIC_FORMATS, _s_BASIC_STYLE_FORMATS, _s_CUSTOM_SECRET_FORMAT_ITEM, _s_DEFAULT_FONT_SIZE, _s_DEFAULT_LINE_HEIGHT, _s_DEFAULT_TABLE_CLASS_LIST, _s_TJS_STYLE_FORMATS;
var TinyMCEHelper = class {
  /**
   * Provides a very basic / limited TinyMCE config that limits the ability to apply many styles from the toolbar
   * or with key commands.
   *
   * @param {object}   [opts] - Optional parameters.
   *
   * @param {boolean}  [opts.basicFormats=true] - When true, only basic style formats are allowed.
   *
   * @param {string[]} [opts.contentCSS] - An array of CSS paths to load. `getRoute` will be applied to them.
   *
   * @param {string}   [opts.contentStyle=''] - The same content style string for TinyMCE options.
   *
   * @param {boolean}  [opts.fontFormat=true] - Includes font select box.
   *
   * @param {boolean}  [opts.fontSize=false] - Includes font size select box.
   *
   * @param {boolean}  [opts.help=false] - When true include help plugin / toolbar button.
   *
   * @param {boolean}  [opts.stripStyleFormat=true] - Strips any additional style formats added by other modules.
   *
   * @param {boolean}  [opts.styleFormat=true] - Includes style format select box.
   *
   * @param {boolean}  [opts.tjsStyles=false] - Includes extensive "TJS" styling options.
   *
   * @param {boolean}  [opts.toolbar=true] - Includes the editor toolbar.
   *
   * @returns {object} TinyMCE options
   */
  static configBasic({
    basicFormats = true,
    contentCSS,
    contentStyle = "",
    fontFormat = true,
    fontSize = false,
    help = false,
    stripStyleFormat = true,
    styleFormat = true,
    tjsStyles = false,
    toolbar = true
  } = {}) {
    const style_formats = __privateMethod(this, _getStyleFormats, getStyleFormats_fn).call(this, basicFormats, stripStyleFormat, tjsStyles ? __privateGet(this, _s_TJS_STYLE_FORMATS) : []);
    const toolbarData = `${styleFormat ? `${MCEImpl.isV6 ? "styles |" : "styleselect |"}` : ""} ${fontFormat ? `${MCEImpl.isV6 ? "fontfamily |" : "fontselect |"}` : ""} ${fontSize ? `${MCEImpl.isV6 ? "fontsize |" : "fontsizeselect |"}` : ""} removeformat | save${help ? " | help" : ""}`;
    const config = {
      content_css: Array.isArray(contentCSS) ? globalThis.CONFIG.TinyMCE.content_css.concat(contentCSS) : globalThis.CONFIG.TinyMCE.content_css,
      content_style: contentStyle,
      [`${MCEImpl.isV6 ? "font_size_formats" : "fontsize_formats"}`]: __privateGet(this, _s_DEFAULT_FONT_SIZE),
      plugins: `${MCEImpl.isV6 ? "" : "hr paste"} save ${help ? "help" : ""} wordcount`,
      style_formats,
      style_formats_merge: false,
      // This allows the manual addition of a style tag in the code editor.
      valid_children: "+body[style]",
      // Note we can include all internal tags as we prefilter the URL to make sure it is for YouTube then use the
      // oembed API to get the embed URL. Additionally, DOMPurify is configured to only accept iframes from YouTube.
      extended_valid_elements: "iframe[allow|allowfullscreen|frameborder|scrolling|class|style|src|width|height]"
    };
    if (basicFormats) {
      config.formats = __privateGet(this, _s_BASIC_FORMATS);
    }
    config.toolbar = toolbar ? toolbarData : false;
    return config;
  }
  /**
   * Provides the standard TinyMCE configuration options. This is similar to standard core configuration and the
   * ProseMirror editor.
   *
   * @param {object}   [opts] - Optional parameters.
   *
   * @param {boolean}  [opts.basicFormats=false] - When true, only basic style formats are allowed.
   *
   * @param {boolean}  [opts.code=true] - When true include source code editing option.
   *
   * @param {string[]} [opts.contentCSS] - An array of CSS paths to load. `getRoute` will be applied to them.
   *
   * @param {string}   [opts.contentStyle=''] - The same content style string for TinyMCE options.
   *
   * @param {boolean}  [opts.fontFormat=true] - Includes font select box.
   *
   * @param {boolean}  [opts.fontSize=false] - Includes font size select box.
   *
   * @param {boolean}  [opts.help=false] - When true include help plugin / toolbar button.
   *
   * @param {boolean}  [opts.stripStyleFormat=true] - Strips any additional style formats added by other modules.
   *
   * @param {boolean}  [opts.styleFormat=true] - Includes style format select box.
   *
   * @param {boolean}  [opts.tjsOembed=false] - Includes custom oEmbed plugin to include video from YouTube / Vimeo.
   *
   * @param {boolean}  [opts.tjsStyles=false] - Includes extensive "TJS" styling options.
   *
   * @param {boolean}  [opts.toolbar=true] - Includes the editor toolbar.
   *
   * @returns {object} TinyMCE options
   */
  static configStandard({
    basicFormats = false,
    code = true,
    contentCSS,
    contentStyle = "",
    fontFormat = true,
    fontSize = false,
    help = false,
    stripStyleFormat = true,
    styleFormat = true,
    tjsOembed = false,
    tjsStyles = false,
    toolbar = true
  } = {}) {
    const style_formats = __privateMethod(this, _getStyleFormats, getStyleFormats_fn).call(this, basicFormats, stripStyleFormat, tjsStyles ? __privateGet(this, _s_TJS_STYLE_FORMATS) : []);
    const toolbarData = `${styleFormat ? `${MCEImpl.isV6 ? "styles |" : "styleselect |"}` : ""} ${fontFormat ? `${MCEImpl.isV6 ? "fontfamily |" : "fontselect |"}` : ""} ${fontSize ? `${MCEImpl.isV6 ? "fontsize |" : "fontsizeselect |"}` : ""} table | bullist | numlist | image ${tjsOembed ? "| typhonjs-oembed" : ""} | hr | link | removeformat | save${code ? " | code" : ""}${help ? " | help" : ""}`;
    const config = {
      content_css: Array.isArray(contentCSS) ? globalThis.CONFIG.TinyMCE.content_css.concat(contentCSS) : globalThis.CONFIG.TinyMCE.content_css,
      content_style: contentStyle,
      [`${MCEImpl.isV6 ? "font_size_formats" : "fontsize_formats"}`]: __privateGet(this, _s_DEFAULT_FONT_SIZE),
      plugins: `${MCEImpl.isV6 ? "" : "hr paste"} emoticons image link lists charmap table ${tjsOembed ? "typhonjs-oembed" : ""} ${code ? "code" : ""} save ${help ? "help" : ""} wordcount`,
      style_formats,
      style_formats_merge: false,
      // For typhonjs-oembed plugin when loaded.
      oembed_live_embeds: false,
      oembed_default_width: 424,
      oembed_default_height: 238,
      oembed_disable_file_source: true,
      // This allows the manual addition of a style tag in the code editor.
      valid_children: "+body[style]",
      // Note we can include all internal tags as we prefilter the URL to make sure it is for YouTube then use the
      // oembed API to get the embed URL. Additionally, DOMPurify is configured to only accept iframes from YouTube.
      extended_valid_elements: "iframe[allow|allowfullscreen|frameborder|scrolling|class|style|src|width|height]"
    };
    config.toolbar = toolbar ? toolbarData : false;
    return config;
  }
  /**
   * Provides the TJS super cool TinyMCE configuration options. These options are selected for increased media
   * embedding and styling flexibility.
   *
   * @param {object}   [opts] - Optional parameters.
   *
   * @param {boolean}  [opts.basicFormats=false] - When true, only basic style formats are allowed.
   *
   * @param {boolean}  [opts.code=true] - When true include source code editing option.
   *
   * @param {string[]} [opts.contentCSS] - An array of CSS paths to load. `getRoute` will be applied to them.
   *
   * @param {string}   [opts.contentStyle=''] - The same content style string for TinyMCE options.
   *
   * @param {boolean}  [opts.fontFormat=true] - Includes font formats, size, line spacing and color options.
   *
   * @param {boolean}  [opts.fontSize=true] - Includes font size options.
   *
   * @param {boolean}  [opts.help=false] - When true include help plugin / toolbar button.
   *
   * @param {boolean}  [opts.stripStyleFormat=true] - Strips any additional style formats added by other modules.
   *
   * @param {boolean}  [opts.styleFormat=true] - Includes style format select box.
   *
   * @param {boolean}  [opts.tjsOembed=true] - Includes custom oEmbed plugin to include video from YouTube / Vimeo.
   *
   * @param {boolean}  [opts.tjsStyles=true] - Includes extensive "TJS" styling options.
   *
   * @param {boolean}  [opts.toolbar=true] - Includes the editor toolbar.
   *
   * @returns {object} TinyMCE options
   */
  static configTJS({
    basicFormats = false,
    code = true,
    contentCSS,
    contentStyle = "",
    fontFormat = true,
    fontSize = true,
    help = false,
    stripStyleFormat = true,
    styleFormat = true,
    tjsOembed = true,
    tjsStyles = true,
    toolbar = true
  } = {}) {
    const style_formats = __privateMethod(this, _getStyleFormats, getStyleFormats_fn).call(this, basicFormats, stripStyleFormat, tjsStyles ? __privateGet(this, _s_TJS_STYLE_FORMATS) : []);
    const toolbarData = `${styleFormat ? `${MCEImpl.isV6 ? "styles |" : "styleselect |"}` : ""} table | ${fontFormat ? "formatgroup |" : ""} removeformat | insertgroup | bulletgroup | save${code ? " | code" : ""}${help ? " | help" : ""}`;
    const config = {
      plugins: `${MCEImpl.isV6 ? "" : "hr paste"} emoticons image link lists ${tjsOembed ? "typhonjs-oembed" : ""} charmap table ${code ? "code" : ""} save ${help ? "help" : ""} wordcount`,
      toolbar_groups: {
        bulletgroup: {
          icon: "unordered-list",
          tooltip: "Lists",
          items: "bullist | numlist"
        },
        formatgroup: {
          icon: "format",
          tooltip: "Fonts",
          items: `${MCEImpl.isV6 ? "fontfamily |" : "fontselect |"} ${fontSize ? `${MCEImpl.isV6 ? "fontsize |" : "fontsizeselect |"}` : ""} lineheight | forecolor backcolor`
        },
        insertgroup: {
          icon: "plus",
          tooltip: "Insert",
          items: `link image ${tjsOembed ? "typhonjs-oembed" : ""} emoticons charmap hr`
        }
      },
      content_css: Array.isArray(contentCSS) ? globalThis.CONFIG.TinyMCE.content_css.concat(contentCSS) : globalThis.CONFIG.TinyMCE.content_css,
      content_style: contentStyle,
      contextmenu: false,
      // Prefer default browser context menu
      [`${MCEImpl.isV6 ? "font_size_formats" : "fontsize_formats"}`]: __privateGet(this, _s_DEFAULT_FONT_SIZE),
      file_picker_types: "image media",
      image_advtab: true,
      [`${MCEImpl.isV6 ? "line_height_formats" : "lineheight_formats"}`]: __privateGet(this, _s_DEFAULT_LINE_HEIGHT),
      // For typhonjs-oembed plugin when loaded.
      oembed_live_embeds: false,
      oembed_default_width: 424,
      oembed_default_height: 238,
      oembed_disable_file_source: true,
      style_formats,
      style_formats_merge: false,
      table_class_list: __privateGet(this, _s_DEFAULT_TABLE_CLASS_LIST),
      // This allows the manual addition of a style tag in the code editor.
      valid_children: "+body[style]",
      // Note we can include all internal tags as we prefilter the URL to make sure it is for YouTube then use the
      // oembed API to get the embed URL. Additionally, DOMPurify is configured to only accept iframes from YouTube.
      extended_valid_elements: "iframe[allow|allowfullscreen|frameborder|scrolling|class|style|src|width|height]"
    };
    config.toolbar = toolbar ? toolbarData : false;
    return config;
  }
  /**
   * Provides a combined `mceConfig` and other default options to create a single line editor that prevents pasting,
   * prevents enter key / new lines, saves on editor blur, and doesn't show the toolbar. This is useful as a shortcut
   * to enable TJSTinyMCE to act as a content editable text entry for a single line text field.
   *
   * Note: Since this function returns an object w/ mceConfig and other options you must use it like in TJSTinyMCE
   * options; where `font-size` in contentStyleBody and any other styles match the editor CSS variables:
   *
   * ...TinyMCEHelper.configSingleLine({ contentStyleBody: { 'font-size': '22pt' }})
   *
   * @param {object}   [opts] - Optional parameters.
   *
   * @param {string[]} [opts.contentCSS] - An array of CSS paths to load. `getRoute` will be applied to them.
   *
   * @param {string}   [opts.contentStyle=''] - The same content style string for TinyMCE options.
   *
   * @returns {object} TinyMCE options
   */
  static optionsSingleLine({ contentCSS, contentStyle = "" } = {}) {
    const mceConfig = {
      ...this.configBasic({ contentCSS, contentStyle, toolbar: false }),
      save_enablewhendirty: false
    };
    return {
      mceConfig,
      preventEnterKey: true,
      saveOnEnterKey: true,
      saveOnBlur: true
    };
  }
};
_getStyleFormats = new WeakSet();
getStyleFormats_fn = function(basicFormats = false, stripStyleFormat = true, additionalStyleFormats = []) {
  const style_formats = JSON.parse(JSON.stringify(basicFormats ? __privateGet(this, _s_BASIC_STYLE_FORMATS) : __privateGet(this, _s_ALL_STYLE_FORMATS)));
  const customIndex = basicFormats ? 0 : 1;
  if (stripStyleFormat) {
    if (globalThis.game.user.isGM) {
      style_formats[customIndex].items.push(__privateGet(this, _s_CUSTOM_SECRET_FORMAT_ITEM));
    }
  } else {
    const notCoreFormats = globalThis.CONFIG.TinyMCE.style_formats.filter((e) => e.title !== "Custom");
    style_formats.push(...notCoreFormats);
    if (globalThis.game.user.isGM) {
      style_formats[customIndex].items.push(__privateGet(this, _s_CUSTOM_SECRET_FORMAT_ITEM));
    }
  }
  return style_formats.concat(additionalStyleFormats);
};
_s_ALL_STYLE_FORMATS = new WeakMap();
_s_BASIC_FORMATS = new WeakMap();
_s_BASIC_STYLE_FORMATS = new WeakMap();
_s_CUSTOM_SECRET_FORMAT_ITEM = new WeakMap();
_s_DEFAULT_FONT_SIZE = new WeakMap();
_s_DEFAULT_LINE_HEIGHT = new WeakMap();
_s_DEFAULT_TABLE_CLASS_LIST = new WeakMap();
_s_TJS_STYLE_FORMATS = new WeakMap();
// Internal methods -----------------------------------------------------------------------------------------------
/**
 * @param {boolean}  [basicFormats=false] - When true limits core formats to basic style formats.
 *
 * @param {boolean}  [stripStyleFormat=true] - Strips any non-core items added to the style format select group.
 *
 * @param {object[]} [additionalStyleFormats=[]] - Add additional style formats.
 *
 * @returns {{title: string, items: [{classes: string, block: string, wrapper: boolean, title: string}]}[]} MCE
 *          style formats configuration data.
 */
__privateAdd(TinyMCEHelper, _getStyleFormats);
// Static data -----------------------------------------------------------------------------------------------------
/**
 * Defines the standard all style formats menu for style formats.
 *
 * @type {object[]}
 */
__privateAdd(TinyMCEHelper, _s_ALL_STYLE_FORMATS, [
  {
    title: "Headings",
    items: [
      { title: "Heading 1", format: "h1" },
      { title: "Heading 2", format: "h2" },
      { title: "Heading 3", format: "h3" },
      { title: "Heading 4", format: "h4" },
      { title: "Heading 5", format: "h5" },
      { title: "Heading 6", format: "h6" }
    ]
  },
  {
    title: "Blocks",
    items: [
      { title: "Paragraph", format: "p" },
      { title: "Blockquote", format: "blockquote" },
      { title: "Pre", format: "pre" }
    ]
  },
  {
    title: "Inline",
    items: [
      { title: "Bold", format: "bold" },
      { title: "Italic", format: "italic" },
      { title: "Code", format: "code" },
      { title: "Underline", format: "underline" },
      { title: "Strikethrough", format: "strikethrough" },
      { title: "Superscript", format: "superscript" },
      { title: "Subscript", format: "subscript" }
    ]
  },
  {
    title: "Align",
    items: [
      { title: "Left", format: "alignleft" },
      { title: "Center", format: "aligncenter" },
      { title: "Right", format: "alignright" },
      { title: "Justify", format: "alignjustify" }
    ]
  }
]);
/**
 * Removes the TMCE core format options that are not considered basic / essential formats when `basicFormats`
 * is true.
 *
 * @type {object}
 */
__privateAdd(TinyMCEHelper, _s_BASIC_FORMATS, {
  blockquote: {},
  div: {},
  h1: {},
  h2: {},
  h3: {},
  h4: {},
  h5: {},
  h6: {},
  pre: {}
});
/**
 * Defines the limited style formats options when `basicFormats` is true.
 *
 * @type {object[]}
 */
__privateAdd(TinyMCEHelper, _s_BASIC_STYLE_FORMATS, [
  {
    title: "Blocks",
    items: [
      { title: "Paragraph", format: "p" }
    ]
  },
  {
    title: "Inline",
    items: [
      { title: "Bold", format: "bold" },
      { title: "Italic", format: "italic" },
      { title: "Underline", format: "underline" },
      { title: "Strikethrough", format: "strikethrough" },
      { title: "Superscript", format: "superscript" },
      { title: "Subscript", format: "subscript" },
      { title: "Code", format: "code" }
    ]
  },
  {
    title: "Align",
    items: [
      { title: "Left", format: "alignleft" },
      { title: "Center", format: "aligncenter" },
      { title: "Right", format: "alignright" },
      { title: "Justify", format: "alignjustify" }
    ]
  }
]);
/**
 * Defines the secret FVTT core format item.
 *
 * @type {object}
 */
__privateAdd(TinyMCEHelper, _s_CUSTOM_SECRET_FORMAT_ITEM, {
  title: "Secret",
  block: "section",
  classes: "secret",
  wrapper: true
});
/**
 * Defines the font sizes available in the toolbar options.
 *
 * @type {string}
 */
__privateAdd(TinyMCEHelper, _s_DEFAULT_FONT_SIZE, "10.5pt 12pt 13pt 14pt 15pt 16pt 18pt 22pt 28pt 32pt 36pt 42pt 48pt 64pt");
/**
 * Defines the line-height styles available in the toolbar options.
 *
 * @type {string}
 */
__privateAdd(TinyMCEHelper, _s_DEFAULT_LINE_HEIGHT, "0.8 0.9 1 1.1 1.2 1.3 1.4 1.5 1.75 2");
/**
 * Provides a class list for the table dialog.
 *
 * @type {object}
 */
__privateAdd(TinyMCEHelper, _s_DEFAULT_TABLE_CLASS_LIST, [
  { title: "None", value: "" },
  { title: "No Colors / Border", value: "tmce-nocolors" }
]);
/**
 * Provides extra CSS styles to configure text and various elements in TinyMCE.
 *
 * @type {object[]}
 */
__privateAdd(TinyMCEHelper, _s_TJS_STYLE_FORMATS, [{
  title: "Styles",
  items: [
    {
      title: "Blend Mode",
      items: [
        {
          title: "BM Unset",
          selector: "*",
          styles: {
            "mix-blend-mode": "unset"
          }
        },
        {
          title: "BM Normal",
          selector: "*",
          styles: {
            "mix-blend-mode": "normal"
          }
        },
        {
          title: "BM Multiply",
          selector: "*",
          styles: {
            "mix-blend-mode": "multiply"
          }
        },
        {
          title: "BM Screen",
          selector: "*",
          styles: {
            "mix-blend-mode": "screen"
          }
        },
        {
          title: "BM Overlay",
          selector: "*",
          styles: {
            "mix-blend-mode": "overlay"
          }
        },
        {
          title: "BM Darken",
          selector: "*",
          styles: {
            "mix-blend-mode": "darken"
          }
        },
        {
          title: "BM Lighten",
          selector: "*",
          styles: {
            "mix-blend-mode": "lighten"
          }
        },
        {
          title: "BM Color Dodge",
          selector: "*",
          styles: {
            "mix-blend-mode": "color-dodge"
          }
        },
        {
          title: "BM Color Burn",
          selector: "*",
          styles: {
            "mix-blend-mode": "color-burn"
          }
        },
        {
          title: "BM Hard Light",
          selector: "*",
          styles: {
            "mix-blend-mode": "hard-light"
          }
        },
        {
          title: "BM Soft Light",
          selector: "*",
          styles: {
            "mix-blend-mode": "soft-light"
          }
        },
        {
          title: "BM Difference",
          selector: "*",
          styles: {
            "mix-blend-mode": "difference"
          }
        },
        {
          title: "BM Exclusion",
          selector: "*",
          styles: {
            "mix-blend-mode": "exclusion"
          }
        },
        {
          title: "BM Hue",
          selector: "*",
          styles: {
            "mix-blend-mode": "hue"
          }
        },
        {
          title: "BM Saturation",
          selector: "*",
          styles: {
            "mix-blend-mode": "saturation"
          }
        },
        {
          title: "BM Color",
          selector: "*",
          styles: {
            "mix-blend-mode": "color"
          }
        },
        {
          title: "BM Luminosity",
          selector: "*",
          styles: {
            "mix-blend-mode": "luminosity"
          }
        }
      ]
    },
    {
      title: "Border",
      items: [
        {
          title: "No Border",
          selector: "*",
          styles: {
            border: "none"
          }
        },
        {
          title: "Border Radius",
          items: [
            {
              title: "BR None",
              selector: "*",
              styles: {
                "border-radius": "unset"
              }
            },
            {
              title: "BR 4px",
              selector: "*",
              styles: {
                "border-radius": "4px"
              }
            },
            {
              title: "BR 8px",
              selector: "*",
              styles: {
                "border-radius": "8px"
              }
            },
            {
              title: "BR 16px",
              selector: "*",
              styles: {
                "border-radius": "16px"
              }
            }
          ]
        }
      ]
    },
    {
      title: "Filters",
      items: [
        {
          title: "No Filter",
          selector: "*",
          styles: {
            filter: "none"
          }
        },
        {
          title: "Blur",
          items: [
            {
              title: "Blur 1px",
              selector: "*",
              styles: {
                filter: "blur(1px)"
              }
            },
            {
              title: "Blur 2px",
              selector: "*",
              styles: {
                filter: "blur(2px)"
              }
            },
            {
              title: "Blur 3px",
              selector: "*",
              styles: {
                filter: "blur(3px)"
              }
            },
            {
              title: "Blur 4px",
              selector: "*",
              styles: {
                filter: "blur(4px)"
              }
            }
          ]
        },
        {
          title: "Drop Shadow",
          items: [
            {
              title: "DS 2px",
              selector: "*",
              styles: {
                filter: "drop-shadow(2px 2px 2px black)"
              }
            },
            {
              title: "DS 4px",
              selector: "*",
              styles: {
                filter: "drop-shadow(4px 4px 3px black)"
              }
            },
            {
              title: "DS 8px",
              selector: "*",
              styles: {
                filter: "drop-shadow(8px 8px 6px black)"
              }
            }
          ]
        },
        {
          title: "Grayscale",
          items: [
            {
              title: "GS 25%",
              selector: "*",
              styles: {
                filter: "grayscale(25%)"
              }
            },
            {
              title: "GS 50%",
              selector: "*",
              styles: {
                filter: "grayscale(50%)"
              }
            },
            {
              title: "GS 75%",
              selector: "*",
              styles: {
                filter: "grayscale(75%)"
              }
            },
            {
              title: "GS 100%",
              selector: "*",
              styles: {
                filter: "grayscale(100%)"
              }
            }
          ]
        }
      ]
    },
    {
      title: "Float",
      items: [
        {
          title: "Float Left",
          selector: "*",
          styles: {
            float: "left",
            margin: "0 10px 0 0"
          }
        },
        {
          title: "Float Right",
          selector: "*",
          styles: {
            float: "right",
            margin: "0 0 0 10px"
          }
        }
      ]
    },
    {
      title: "Fonts",
      items: [
        {
          title: "Neon",
          items: [
            {
              title: "Neon Blue",
              selector: "*",
              styles: {
                color: "#fff",
                "text-shadow": "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6, 0 0 25px #0073e6"
              }
            },
            {
              title: "Neon Green",
              selector: "*",
              styles: {
                color: "#fff",
                "text-shadow": "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #00e704, 0 0 20px #00e704, 0 0 25px #00e704"
              }
            },
            {
              title: "Neon Red",
              selector: "*",
              styles: {
                color: "#fff",
                "text-shadow": "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #e70000, 0 0 20px #e70000, 0 0 25px #e70000"
              }
            },
            {
              title: "Neon Purple",
              selector: "*",
              styles: {
                color: "#fff",
                "text-shadow": "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #7900ea, 0 0 20px #7900ea, 0 0 25px #7900ea"
              }
            }
          ]
        }
      ]
    },
    {
      title: "Margin",
      items: [
        {
          title: "No Margin",
          selector: "*",
          styles: {
            margin: "unset"
          }
        },
        {
          title: "Top",
          items: [
            {
              title: "MT 5px",
              selector: "*",
              styles: {
                inline: "span",
                "margin-top": "5px"
              }
            },
            {
              title: "MT 10px",
              selector: "*",
              styles: {
                inline: "span",
                "margin-top": "10px"
              }
            },
            {
              title: "MT 15px",
              selector: "*",
              styles: {
                inline: "span",
                "margin-top": "15px"
              }
            },
            {
              title: "MT 25px",
              selector: "*",
              styles: {
                inline: "span",
                "margin-top": "25px"
              }
            }
          ]
        },
        {
          title: "Left",
          items: [
            {
              title: "ML 5px",
              selector: "*",
              styles: {
                inline: "span",
                "margin-left": "5px"
              }
            },
            {
              title: "ML 10px",
              selector: "*",
              styles: {
                inline: "span",
                "margin-left": "10px"
              }
            },
            {
              title: "ML 15px",
              selector: "*",
              styles: {
                inline: "span",
                "margin-left": "15px"
              }
            },
            {
              title: "ML 25px",
              selector: "*",
              styles: {
                inline: "span",
                "margin-left": "25px"
              }
            },
            {
              title: "ML 50px",
              selector: "*",
              styles: {
                inline: "span",
                "margin-left": "50px"
              }
            },
            {
              title: "ML 75px",
              selector: "*",
              styles: {
                inline: "span",
                "margin-left": "75px"
              }
            },
            {
              title: "ML 100px",
              selector: "*",
              styles: {
                inline: "span",
                "margin-left": "100px"
              }
            }
          ]
        },
        {
          title: "Bottom",
          items: [
            {
              title: "MB 5px",
              selector: "*",
              styles: {
                inline: "span",
                "margin-bottom": "5px"
              }
            },
            {
              title: "MB 10px",
              selector: "*",
              styles: {
                inline: "span",
                "margin-bottom": "10px"
              }
            },
            {
              title: "MB 15px",
              selector: "*",
              styles: {
                inline: "span",
                "margin-bottom": "15px"
              }
            },
            {
              title: "MB 25px",
              selector: "*",
              styles: {
                inline: "span",
                "margin-bottom": "25px"
              }
            }
          ]
        },
        {
          title: "Right",
          items: [
            {
              title: "MR 5px",
              selector: "*",
              styles: {
                inline: "span",
                "margin-right": "5px"
              }
            },
            {
              title: "MR 10px",
              selector: "*",
              styles: {
                inline: "span",
                "margin-right": "10px"
              }
            },
            {
              title: "MR 15px",
              selector: "*",
              styles: {
                inline: "span",
                "margin-right": "15px"
              }
            },
            {
              title: "MR 25px",
              selector: "*",
              styles: {
                inline: "span",
                "margin-right": "25px"
              }
            },
            {
              title: "MR 50px",
              selector: "*",
              styles: {
                inline: "span",
                "margin-right": "50px"
              }
            },
            {
              title: "MR 75px",
              selector: "*",
              styles: {
                inline: "span",
                "margin-right": "75px"
              }
            },
            {
              title: "MR 100px",
              selector: "*",
              styles: {
                inline: "span",
                "margin-right": "100px"
              }
            }
          ]
        }
      ]
    },
    {
      title: "Opacity",
      items: [
        {
          title: "OP 100%",
          selector: "*",
          styles: {
            opacity: "1"
          }
        },
        {
          title: "OP 90%",
          selector: "*",
          styles: {
            opacity: "0.9"
          }
        },
        {
          title: "OP 80%",
          selector: "*",
          styles: {
            opacity: "0.8"
          }
        },
        {
          title: "OP 70%",
          selector: "*",
          styles: {
            opacity: "0.7"
          }
        },
        {
          title: "OP 60%",
          selector: "*",
          styles: {
            opacity: "0.6"
          }
        },
        {
          title: "OP 50%",
          selector: "*",
          styles: {
            opacity: "0.5"
          }
        },
        {
          title: "OP 40%",
          selector: "*",
          styles: {
            opacity: "0.4"
          }
        },
        {
          title: "OP 30%",
          selector: "*",
          styles: {
            opacity: "0.3"
          }
        },
        {
          title: "OP 20%",
          selector: "*",
          styles: {
            opacity: "0.2"
          }
        },
        {
          title: "OP 10%",
          selector: "*",
          styles: {
            opacity: "0.1"
          }
        }
      ]
    }
  ]
}]);

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/editor/tinymce/TJSTinyMCE.svelte
var file6 = "node_modules\\@typhonjs-fvtt\\svelte-standard\\_dist\\component\\standard\\editor\\tinymce\\TJSTinyMCE.svelte";
function add_css6(target) {
  append_styles(target, "svelte-rkh51k", '.tjs-editor.svelte-rkh51k.svelte-rkh51k{background:var(--tjs-editor-background, none);border:var(--tjs-editor-border, none);border-radius:var(--tjs-editor-border-radius, 0);height:var(--tjs-editor-height, 100%);outline-offset:var(--tjs-editor-outline-offset, 0.25em);margin:var(--tjs-editor-margin, 0);transition:var(--tjs-editor-transition);width:var(--tjs-editor-width, 100%);scrollbar-width:thin}.editor-content.svelte-rkh51k.svelte-rkh51k{color:var(--tjs-editor-content-color, #000);font-family:var(--tjs-editor-content-font-family, "Signika");font-size:var(--tjs-editor-content-font-size, 10.5pt);line-height:var(--tjs-editor-content-line-height, 1.2);padding:var(--tjs-editor-content-padding, 3px 0 0 0)}.editor-active.svelte-rkh51k.svelte-rkh51k{box-shadow:var(--tjs-editor-active-box-shadow);outline:var(--tjs-editor-active-outline);overflow:var(--tjs-editor-active-overflow, hidden)}.tjs-editor.svelte-rkh51k.svelte-rkh51k:not(.editor-active):focus-visible{box-shadow:var(--tjs-editor-inactive-box-shadow-focus-visible, var(--tjs-default-box-shadow-focus-visible));outline:var(--tjs-editor-inactive-outline-focus-visible, var(--tjs-default-outline-focus-visible, revert));transition:var(--tjs-editor-inactive-transition-focus-visible, var(--tjs-default-transition-focus-visible))}.tjs-editor.svelte-rkh51k.svelte-rkh51k:not(.editor-active):not(:focus-visible):hover{box-shadow:var(--tjs-editor-inactive-box-shadow-hover);outline:var(--tjs-editor-inactive-outline-hover)}.tjs-editor.svelte-rkh51k.svelte-rkh51k:not(.editor-active):hover{user-select:var(--tjs-editor-inactive-user-select-hover, text)}.tjs-editor.click-to-edit.svelte-rkh51k.svelte-rkh51k:not(.editor-active):hover{cursor:var(--tjs-editor-inactive-cursor-hover, text)}.editor-edit.svelte-rkh51k.svelte-rkh51k{right:var(--tjs-editor-edit-button-right, 5px);top:var(--tjs-editor-edit-button-top, 0)}.tjs-editor.svelte-rkh51k:not(.editor-active) .editor-content.svelte-rkh51k{user-select:var(--tjs-editor-inactive-user-select-hover, text)}.tjs-editor.svelte-rkh51k .editor-content.svelte-rkh51k p:first-of-type{margin-top:0}.tjs-editor.svelte-rkh51k div.tox-tinymce{border-radius:0;font-size:10.5pt;padding:var(--tjs-editor-content-padding, 0)}.tjs-editor.svelte-rkh51k .tox:not(.tox-tinymce-inline) .tox-editor-header{background:none;box-shadow:unset;transition:unset;padding:0;width:var(--tjs-editor-toolbar-width, 100%)}.tjs-editor.svelte-rkh51k .tox.tox-tinymce .tox-toolbar-overlord{background:none;box-shadow:var(--tjs-editor-toolbar-box-shadow, 0 2px 2px -2px rgb(34 47 62 / 10%), 0 8px 8px -4px rgb(34 47 62 / 7%));margin-bottom:0.25em;transition:box-shadow 500ms ease-in-out}.tjs-editor.svelte-rkh51k .tox.tox-tinymce .tox-toolbar__primary{background:var(--tjs-editor-toolbar-background, rgba(0, 0, 0, 0.1));border-radius:var(--tjs-editor-toolbar-border-radius, 6px)}.tjs-editor.svelte-rkh51k .tox.tox-tinymce .tox-toolbar__group{width:auto;padding:var(--tjs-editor-toolbar-padding, 0 2px)}.tjs-editor.svelte-rkh51k .tox.tox-tinymce:not([dir=rtl]) .tox-toolbar__group:not(:last-of-type){border-right:var(--tjs-editor-toolbar-separator-border, 1px solid var(--color-text-light-3, #ccc))}.tjs-editor.svelte-rkh51k .tox.tox-tinymce .tox-tbtn{background:var(--tjs-editor-toolbar-button-background, none);color:var(--tjs-editor-toolbar-button-color, var(--color-text-dark-primary, #191813));padding:0;margin:2px 0;min-width:34px;width:fit-content}.tjs-editor.svelte-rkh51k .tox.tox-tinymce .tox-tbtn svg{fill:var(--tjs-editor-toolbar-button-color, var(--color-text-dark-primary, #191813));margin-right:auto}.tjs-editor.svelte-rkh51k .tox.tox-tinymce .tox-tbtn.tox-tbtn--disabled{color:var(--tjs-editor-toolbar-button-disabled-color, rgba(34, 47, 62, .5))}.tjs-editor.svelte-rkh51k .tox.tox-tinymce .tox-tbtn.tox-tbtn--disabled svg{fill:var(--tjs-editor-toolbar-button-disabled-color, rgba(34, 47, 62, .5))}.tjs-editor.svelte-rkh51k .tox.tox-tinymce .tox-tbtn:hover:not(.tox-tbtn--disabled){background:var(--tjs-editor-toolbar-button-background-hover, var(--color-hover-bg, #f0f0e0))}.tjs-editor.svelte-rkh51k .tox.tox-tinymce .tox-tbtn.tox-tbtn--enabled:not(.tox-tbtn--disabled){background:var(--tjs-editor-toolbar-button-background-hover, var(--color-hover-bg, #f0f0e0))}.tjs-editor.svelte-rkh51k .tox.tox-tinymce .tox-tbtn--select{max-width:7em}.tjs-editor.svelte-rkh51k .tox.tox-tinymce .tox-tbtn--select[title="Fonts"]{width:7em}.tjs-editor.svelte-rkh51k .tox.tox-tinymce .tox-tbtn--select[title="Font sizes"]{width:4.5em}.tjs-editor.svelte-rkh51k .tox.tox-tinymce .tox-tbtn--select{background:var(--tjs-editor-toolbar-select-background, var(--color-control-bg, #d9d8c8))}.tjs-editor.svelte-rkh51k .tox.tox-tinymce .tox-tbtn--select:hover:not(.tox-tbtn--disabled){background:var(--tjs-editor-toolbar-select-background-hover, var(--color-hover-bg, #f0f0e0))}.tjs-editor.svelte-rkh51k .tox.tox-tinymce .tox-tbtn--select.tox-tbtn--active:not(.tox-tbtn--disabled){background:var(--tjs-editor-toolbar-select-background-hover, var(--color-hover-bg, #f0f0e0))}.tjs-editor.svelte-rkh51k .tox.tox-tinymce .tox-tbtn .tox-tbtn__select-chevron{max-width:13px;margin-right:2px;width:fit-content}.tjs-editor.svelte-rkh51k .tox.tox-tinymce .tox-tbtn .tox-tbtn__select-chevron svg{fill:var(--tjs-editor-toolbar-chevron-inactive-color, var(--color-text-light-7, #888))}.tjs-editor.svelte-rkh51k .tox.tox-tinymce .tox-tbtn:not(.tox-tbtn--disabled):hover .tox-tbtn__select-chevron svg{fill:var(--tjs-editor-toolbar-chevron-active-color, var(--color-text-dark-primary, #191813))}.tjs-editor.svelte-rkh51k .tox.tox-tinymce .tox-tbtn--active:not(.tox-tbtn--disabled) .tox-tbtn__select-chevron svg{fill:var(--tjs-editor-toolbar-chevron-active-color, var(--color-text-dark-primary, #191813))}.tjs-editor.svelte-rkh51k .tox.tox-tinymce .tox-tbtn--bespoke .tox-tbtn__select-label{margin-right:auto;max-width:7em;width:7em}.tox.tox-tinymce-aux .tox-tbtn--bespoke .tox-tbtn__select-label{max-width:7em;width:fit-content}.tox.tox-tinymce-aux .tox-collection--list .tox-collection__item--active{background:var(--tjs-editor-menu-item-active-background, #dee0e2)}.tox.tox-tinymce-aux .tox-tbtn:focus{background:var(--tjs-editor-menu-item-active-background, #dee0e2)}.tox.tox-tinymce-aux .tox-tbtn:hover:not(.tox-tbtn--disabled){background:var(--tjs-editor-menu-item-active-background, #dee0e2)}.tox.tox-tinymce-aux .tox-tbtn.tox-tbtn--enabled:not(.tox-tbtn--disabled){background:var(--tjs-editor-menu-item-active-background, #dee0e2)}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVEpTVGlueU1DRS5zdmVsdGUiLCJtYXBwaW5ncyI6IkFBNnBCSSx1Q0FBQSxDQUNJLFVBQUEsQ0FBQSxJQUFBLHVCQUFBLENBQUEsS0FBQSxDQUE4QyxDQUM5QyxNQUFBLENBQUEsSUFBQSxtQkFBQSxDQUFBLEtBQUEsQ0FBc0MsQ0FDdEMsYUFBQSxDQUFBLElBQUEsMEJBQUEsQ0FBQSxFQUFBLENBQWlELENBQ2pELE1BQUEsQ0FBQSxJQUFBLG1CQUFBLENBQUEsS0FBQSxDQUFzQyxDQUN0QyxjQUFBLENBQUEsSUFBQSwyQkFBQSxDQUFBLE9BQUEsQ0FBd0QsQ0FDeEQsTUFBQSxDQUFBLElBQUEsbUJBQUEsQ0FBQSxFQUFBLENBQW1DLENBQ25DLFVBQUEsQ0FBQSxJQUFBLHVCQUFBLENBQXdDLENBQ3hDLEtBQUEsQ0FBQSxJQUFBLGtCQUFBLENBQUEsS0FBQSxDQUFvQyxDQUdwQyxlQUFBLENBQUEsSUFDSixDQUVBLDJDQUFBLENBQ0ksS0FBQSxDQUFBLElBQUEsMEJBQUEsQ0FBQSxLQUFBLENBQTRDLENBQzVDLFdBQUEsQ0FBQSxJQUFBLGdDQUFBLENBQUEsVUFBQSxDQUE2RCxDQUM3RCxTQUFBLENBQUEsSUFBQSw4QkFBQSxDQUFBLE9BQUEsQ0FBc0QsQ0FDdEQsV0FBQSxDQUFBLElBQUEsZ0NBQUEsQ0FBQSxJQUFBLENBQXVELENBQ3ZELE9BQUEsQ0FBQSxJQUFBLDRCQUFBLENBQUEsVUFBQSxDQUNKLENBTUEsMENBQUEsQ0FDSSxVQUFBLENBQUEsSUFBQSw4QkFBQSxDQUErQyxDQUMvQyxPQUFBLENBQUEsSUFBQSwyQkFBQSxDQUF5QyxDQUN6QyxRQUFBLENBQUEsSUFBQSw0QkFBQSxDQUFBLE9BQUEsQ0FDSixDQUtBLHVDQUFBLEtBQUEsY0FBQSxDQUFBLGNBQUEsQ0FDSSxVQUFBLENBQUEsSUFBQSw4Q0FBQSxDQUFBLDRDQUFBLENBQTRHLENBQzVHLE9BQUEsQ0FBQSxJQUFBLDJDQUFBLENBQUEsaURBQUEsQ0FBMkcsQ0FDM0csVUFBQSxDQUFBLElBQUEsOENBQUEsQ0FBQSw0Q0FBQSxDQUNKLENBS0EsdUNBQUEsS0FBQSxjQUFBLENBQUEsS0FBQSxjQUFBLENBQUEsTUFBQSxDQUNJLFVBQUEsQ0FBQSxJQUFBLHNDQUFBLENBQXVELENBQ3ZELE9BQUEsQ0FBQSxJQUFBLG1DQUFBLENBQ0osQ0FLQSx1Q0FBQSxLQUFBLGNBQUEsQ0FBQSxNQUFBLENBQ0ksV0FBQSxDQUFBLElBQUEsdUNBQUEsQ0FBQSxLQUFBLENBQ0osQ0FNQSxXQUFBLDBDQUFBLEtBQUEsY0FBQSxDQUFBLE1BQUEsQ0FDSSxNQUFBLENBQUEsSUFBQSxrQ0FBQSxDQUFBLEtBQUEsQ0FDSixDQUVBLHdDQUFBLENBQ0ksS0FBQSxDQUFBLElBQUEsOEJBQUEsQ0FBQSxJQUFBLENBQStDLENBQy9DLEdBQUEsQ0FBQSxJQUFBLDRCQUFBLENBQUEsRUFBQSxDQUNKLENBR0EseUJBQUEsS0FBQSxjQUFBLENBQUEsQ0FBQSw2QkFBQSxDQUNJLFdBQUEsQ0FBQSxJQUFBLHVDQUFBLENBQUEsS0FBQSxDQUNKLENBR0EseUJBQUEsQ0FBQSw2QkFBQSxDQUFBLGVBQUEsQ0FDSSxVQUFBLENBQUEsQ0FDSixDQUVBLHlCQUFBLENBQUEsZUFBQSxDQUNJLGFBQUEsQ0FBQSxDQUFnQixDQUNoQixTQUFBLENBQUEsTUFBaUIsQ0FDakIsT0FBQSxDQUFBLElBQUEsNEJBQUEsQ0FBQSxFQUFBLENBQ0osQ0FFQSx5QkFBQSxDQUFBLGdEQUFBLENBQ0ksVUFBQSxDQUFBLElBQWdCLENBQ2hCLFVBQUEsQ0FBQSxLQUFpQixDQUNqQixVQUFBLENBQUEsS0FBaUIsQ0FDakIsT0FBQSxDQUFBLENBQVUsQ0FDVixLQUFBLENBQUEsSUFBQSwwQkFBQSxDQUFBLEtBQUEsQ0FDSixDQUVBLHlCQUFBLENBQUEsc0NBQUEsQ0FDSSxVQUFBLENBQUEsSUFBZ0IsQ0FDaEIsVUFBQSxDQUFBLElBQUEsK0JBQUEsQ0FBQSxzRUFBQSxDQUF1SCxDQUN2SCxhQUFBLENBQUEsTUFBcUIsQ0FFckIsVUFBQSxDQUFBLFVBQUEsQ0FBQSxLQUFBLENBQUEsV0FDSixDQUVBLHlCQUFBLENBQUEsc0NBQUEsQ0FDSSxVQUFBLENBQUEsSUFBQSwrQkFBQSxDQUFBLG1CQUFBLENBQW9FLENBQ3BFLGFBQUEsQ0FBQSxJQUFBLGtDQUFBLENBQUEsSUFBQSxDQUNKLENBRUEseUJBQUEsQ0FBQSxvQ0FBQSxDQUNJLEtBQUEsQ0FBQSxJQUFXLENBQ1gsT0FBQSxDQUFBLElBQUEsNEJBQUEsQ0FBQSxNQUFBLENBQ0osQ0FFQSx5QkFBQSxDQUFBLHNFQUFBLENBQ0ksWUFBQSxDQUFBLElBQUEscUNBQUEsQ0FBQSwwQ0FBQSxDQUNKLENBRUEseUJBQUEsQ0FBQSwwQkFBQSxDQUNJLFVBQUEsQ0FBQSxJQUFBLHNDQUFBLENBQUEsS0FBQSxDQUE2RCxDQUM3RCxLQUFBLENBQUEsSUFBQSxpQ0FBQSxDQUFBLHdDQUFBLENBQXNGLENBQ3RGLE9BQUEsQ0FBQSxDQUFVLENBQ1YsTUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFhLENBQ2IsU0FBQSxDQUFBLElBQWUsQ0FDZixLQUFBLENBQUEsV0FDSixDQUVBLHlCQUFBLENBQUEsOEJBQUEsQ0FDSSxJQUFBLENBQUEsSUFBQSxpQ0FBQSxDQUFBLHdDQUFBLENBQXFGLENBQ3JGLFlBQUEsQ0FBQSxJQUNKLENBRUEseUJBQUEsQ0FBQSw2Q0FBQSxDQUNJLEtBQUEsQ0FBQSxJQUFBLDBDQUFBLENBQUEscUJBQUEsQ0FDSixDQUVBLHlCQUFBLENBQUEsaURBQUEsQ0FDSSxJQUFBLENBQUEsSUFBQSwwQ0FBQSxDQUFBLHFCQUFBLENBQ0osQ0FFQSx5QkFBQSxDQUFBLHlEQUFBLENBQ0ksVUFBQSxDQUFBLElBQUEsNENBQUEsQ0FBQSwrQkFBQSxDQUNKLENBRUEseUJBQUEsQ0FBQSxxRUFBQSxDQUNJLFVBQUEsQ0FBQSxJQUFBLDRDQUFBLENBQUEsK0JBQUEsQ0FDSixDQUdBLHlCQUFBLENBQUEsa0NBQUEsQ0FDSSxTQUFBLENBQUEsR0FDSixDQUdBLHlCQUFBLENBQUEsaURBQUEsQ0FDSSxLQUFBLENBQUEsR0FDSixDQUdBLHlCQUFBLENBQUEsc0RBQUEsQ0FDSSxLQUFBLENBQUEsS0FDSixDQUdBLHlCQUFBLENBQUEsa0NBQUEsQ0FDSSxVQUFBLENBQUEsSUFBQSxzQ0FBQSxDQUFBLGlDQUFBLENBQ0osQ0FHQSx5QkFBQSxDQUFBLGlFQUFBLENBQ0ksVUFBQSxDQUFBLElBQUEsNENBQUEsQ0FBQSwrQkFBQSxDQUNKLENBR0EseUJBQUEsQ0FBQSw0RUFBQSxDQUNJLFVBQUEsQ0FBQSxJQUFBLDRDQUFBLENBQUEsK0JBQUEsQ0FDSixDQUdBLHlCQUFBLENBQUEsb0RBQUEsQ0FDSSxTQUFBLENBQUEsSUFBZSxDQUNmLFlBQUEsQ0FBQSxHQUFpQixDQUNqQixLQUFBLENBQUEsV0FDSixDQUdBLHlCQUFBLENBQUEsd0RBQUEsQ0FDSSxJQUFBLENBQUEsSUFBQSwyQ0FBQSxDQUFBLGdDQUFBLENBQ0osQ0FHQSx5QkFBQSxDQUFBLHVGQUFBLENBQ0ksSUFBQSxDQUFBLElBQUEseUNBQUEsQ0FBQSx3Q0FBQSxDQUNKLENBR0EseUJBQUEsQ0FBQSx5RkFBQSxDQUNJLElBQUEsQ0FBQSxJQUFBLHlDQUFBLENBQUEsd0NBQUEsQ0FDSixDQUdBLHlCQUFBLENBQUEsMkRBQUEsQ0FDSSxZQUFBLENBQUEsSUFBa0IsQ0FDbEIsU0FBQSxDQUFBLEdBQWMsQ0FDZCxLQUFBLENBQUEsR0FDSixDQVFBLCtEQUFBLENBQ0ksU0FBQSxDQUFBLEdBQWMsQ0FDZCxLQUFBLENBQUEsV0FDSixDQUVBLHdFQUFBLENBQ0ksVUFBQSxDQUFBLElBQUEsd0NBQUEsQ0FBQSxRQUFBLENBQ0osQ0FHQSxvQ0FBQSxDQUNJLFVBQUEsQ0FBQSxJQUFBLHdDQUFBLENBQUEsUUFBQSxDQUNKLENBRUEsNkRBQUEsQ0FDSSxVQUFBLENBQUEsSUFBQSx3Q0FBQSxDQUFBLFFBQUEsQ0FDSixDQUVBLHlFQUFBLENBQ0ksVUFBQSxDQUFBLElBQUEsd0NBQUEsQ0FBQSxRQUFBLENBQ0oiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiVEpTVGlueU1DRS5zdmVsdGUiXX0= */');
}
function create_if_block_13(ctx) {
  let a;
  let i;
  let mounted;
  let dispose;
  const block = {
    c: function create() {
      a = element("a");
      i = element("i");
      attr_dev(i, "class", "fas fa-edit");
      add_location(i, file6, 658, 71, 24689);
      attr_dev(a, "class", "editor-edit svelte-rkh51k");
      attr_dev(a, "role", "button");
      add_location(a, file6, 658, 8, 24626);
    },
    m: function mount(target, anchor) {
      insert_dev(target, a, anchor);
      append_dev(a, i);
      if (!mounted) {
        dispose = listen_dev(
          a,
          "click",
          /*click_handler*/
          ctx[17],
          false,
          false,
          false,
          false
        );
        mounted = true;
      }
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(a);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_13.name,
    type: "if",
    source: "(657:4) {#if editorButton}",
    ctx
  });
  return block;
}
function create_if_block5(ctx) {
  let html_tag;
  let html_anchor;
  const block = {
    c: function create() {
      html_tag = new HtmlTag(false);
      html_anchor = empty();
      html_tag.a = html_anchor;
    },
    m: function mount(target, anchor) {
      html_tag.m(
        /*enrichedContent*/
        ctx[1],
        target,
        anchor
      );
      insert_dev(target, html_anchor, anchor);
    },
    p: function update(ctx2, dirty) {
      if (dirty & /*enrichedContent*/
      2)
        html_tag.p(
          /*enrichedContent*/
          ctx2[1]
        );
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(html_anchor);
      if (detaching)
        html_tag.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block5.name,
    type: "if",
    source: "(663:8) {#if !editorActive}",
    ctx
  });
  return block;
}
function create_fragment6(ctx) {
  let div1;
  let t;
  let div0;
  let div1_class_value;
  let applyStyles_action;
  let mounted;
  let dispose;
  let if_block0 = (
    /*editorButton*/
    ctx[5] && create_if_block_13(ctx)
  );
  let if_block1 = !/*editorActive*/
  ctx[3] && create_if_block5(ctx);
  const block = {
    c: function create() {
      div1 = element("div");
      if (if_block0)
        if_block0.c();
      t = space();
      div0 = element("div");
      if (if_block1)
        if_block1.c();
      attr_dev(div0, "class", "editor-content tjs-editor-content svelte-rkh51k");
      add_location(div0, file6, 660, 4, 24735);
      attr_dev(div1, "class", div1_class_value = "editor tinymce tjs-editor " + (Array.isArray(
        /*options*/
        ctx[0].classes
      ) ? (
        /*options*/
        ctx[0].classes.join(" ")
      ) : "") + " svelte-rkh51k");
      attr_dev(div1, "role", "textbox");
      attr_dev(div1, "tabindex", "0");
      toggle_class(
        div1,
        "click-to-edit",
        /*clickToEdit*/
        ctx[2]
      );
      toggle_class(
        div1,
        "editor-active",
        /*editorActive*/
        ctx[3]
      );
      add_location(div1, file6, 646, 0, 24148);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, div1, anchor);
      if (if_block0)
        if_block0.m(div1, null);
      append_dev(div1, t);
      append_dev(div1, div0);
      if (if_block1)
        if_block1.m(div0, null);
      ctx[18](div0);
      ctx[19](div1);
      if (!mounted) {
        dispose = [
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            div1,
            /*options*/
            ctx[0].styles
          )),
          listen_dev(
            div1,
            "click",
            /*onClick*/
            ctx[10],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            div1,
            "keydown",
            /*onKeydown*/
            ctx[11],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            div1,
            "keyup",
            /*onKeyup*/
            ctx[12],
            false,
            false,
            false,
            false
          )
        ];
        mounted = true;
      }
    },
    p: function update(ctx2, [dirty]) {
      if (
        /*editorButton*/
        ctx2[5]
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_13(ctx2);
          if_block0.c();
          if_block0.m(div1, t);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (!/*editorActive*/
      ctx2[3]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block5(ctx2);
          if_block1.c();
          if_block1.m(div0, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (dirty & /*options*/
      1 && div1_class_value !== (div1_class_value = "editor tinymce tjs-editor " + (Array.isArray(
        /*options*/
        ctx2[0].classes
      ) ? (
        /*options*/
        ctx2[0].classes.join(" ")
      ) : "") + " svelte-rkh51k")) {
        attr_dev(div1, "class", div1_class_value);
      }
      if (applyStyles_action && is_function(applyStyles_action.update) && dirty & /*options*/
      1)
        applyStyles_action.update.call(
          null,
          /*options*/
          ctx2[0].styles
        );
      if (dirty & /*options, clickToEdit*/
      5) {
        toggle_class(
          div1,
          "click-to-edit",
          /*clickToEdit*/
          ctx2[2]
        );
      }
      if (dirty & /*options, editorActive*/
      9) {
        toggle_class(
          div1,
          "editor-active",
          /*editorActive*/
          ctx2[3]
        );
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div1);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      ctx[18](null);
      ctx[19](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment6.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance6($$self, $$props, $$invalidate) {
  let $doc;
  let $positionStore;
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TJSTinyMCE", slots, []);
  let { content = "" } = $$props;
  let { enrichedContent = "" } = $$props;
  let { options = {} } = $$props;
  const positionStore = getContext("#external").application.position;
  validate_store(positionStore, "positionStore");
  component_subscribe($$self, positionStore, (value) => $$invalidate(16, $positionStore = value));
  const dispatch = createEventDispatcher();
  const doc = new TJSDocument({ delete: onDocumentDeleted });
  validate_store(doc, "doc");
  component_subscribe($$self, doc, (value) => $$invalidate(15, $doc = value));
  let clickToEdit;
  let editable = true;
  let editor;
  let editorActive = false;
  let editorButton;
  let editorContentEl;
  let editorEl;
  let keyCode;
  let keyFocused = false;
  let maxCharacterLength;
  onDestroy(() => {
    if (editorActive) {
      saveEditor({
        remove: typeof options.button === "boolean" ? options.button : true
      });
    } else {
      destroyEditor();
    }
  });
  onMount(() => {
    if (editable && !editorButton && !clickToEdit) {
      initEditor();
    }
  });
  function destroyEditor(fireCancel = true) {
    if (editor) {
      setTimeout(
        () => {
          editor == null ? void 0 : editor.destroy();
          if (editorContentEl) {
            $$invalidate(6, editorContentEl.innerText = "", editorContentEl);
          }
          editor = void 0;
          setTimeout(() => $$invalidate(3, editorActive = false), 0);
          if (keyFocused) {
            keyFocused = false;
            setTimeout(
              () => {
                if (editorEl instanceof HTMLElement && (editorEl == null ? void 0 : editorEl.isConnected)) {
                  editorEl.focus();
                }
              },
              100
            );
          }
        },
        0
      );
      if (fireCancel) {
        dispatch("editor:cancel");
      }
    }
  }
  async function initEditor() {
    var _a;
    const existingSetupFn = (_a = options == null ? void 0 : options.mceConfig) == null ? void 0 : _a.setup;
    const { fonts, fontFormats } = MCEImpl.getFontData(options.fonts);
    const mceConfig = {
      ...options.mceConfig ?? TinyMCEHelper.configStandard(),
      engine: "tinymce",
      [`${MCEImpl.isV6 ? "font_family_formats" : "font_formats"}`]: fontFormats,
      target: editorContentEl,
      save_onsavecallback: () => saveEditor(),
      height: "100%",
      paste_as_text: maxCharacterLength >= 0
      // Pasted content must be text when limiting to a max length;
    };
    if (MCEImpl.isV5) {
      mceConfig.paste_filter_drop = false;
    }
    mceConfig.setup = (editor2) => {
      editor2.on("beforeinput", (event) => MCEImpl.beforeInputHandler(editor2, event, options, maxCharacterLength));
      editor2.on("keydown", (event) => MCEImpl.keydownHandler(editor2, event, options, saveEditor, content));
      if (typeof existingSetupFn === "function") {
        existingSetupFn(editor2);
      }
    };
    mceConfig.paste_preprocess = (unused, args) => MCEImpl.pastePreprocess(editor, args, options, maxCharacterLength);
    mceConfig.content_style = `${MCEImpl.setMCEConfigContentStyle(editorContentEl)} ${mceConfig.content_style}`;
    $$invalidate(3, editorActive = true);
    await tick();
    editor = await TextEditor.create(mceConfig, content);
    MCEImpl.setInitialSelection(editor, options.initialSelection, "start");
    const editorIFrameEl = editorEl.querySelector(".tox-edit-area__iframe");
    if (editorIFrameEl) {
      await FontManager.loadFonts({
        document: editorIFrameEl.contentDocument,
        fonts
      });
    }
    editor.on("blur", (e) => onBlur(e));
    dispatch("editor:start");
  }
  function onBlur(event) {
    if (editorActive && typeof options.saveOnBlur === "boolean" && options.saveOnBlur) {
      saveEditor();
    }
  }
  function onClick(event) {
    if (!editorActive && clickToEdit) {
      initEditor();
    }
  }
  async function onContentChanged(content2, enrichContent) {
    if (typeof content2 === "string") {
      if (enrichContent) {
        $$invalidate(1, enrichedContent = await TextEditor.enrichHTML(content2, {
          async: true,
          secrets: globalThis.game.user.isGM
        }));
      } else {
        $$invalidate(1, enrichedContent = content2);
      }
    } else {
      $$invalidate(1, enrichedContent = "");
    }
    dispatch("editor:enrichedContent", { enrichedContent });
  }
  function onDocumentDeleted(document2) {
    $$invalidate(0, options.document = void 0, options);
    destroyEditor();
    dispatch("editor:document:deleted", { document: document2 });
    $$invalidate(13, content = "");
    $$invalidate(1, enrichedContent = "");
  }
  function onKeydown(event) {
    if (editorActive) {
      if (event.code === "Escape" || event.code === "KeyS" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        event.stopPropagation();
      }
    } else {
      if (event.code === keyCode) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }
  function onKeyup(event) {
    if (event.code === keyCode) {
      if (!editorActive) {
        keyFocused = true;
        initEditor();
      }
      event.preventDefault();
      event.stopPropagation();
    }
  }
  function saveEditor({ remove = typeof options.button === "boolean" ? options.button : true } = {}) {
    var _a;
    if (editor) {
      let data = editor.getContent();
      const saving = data !== content;
      if (saving) {
        if ((options == null ? void 0 : options.DOMPurify) && typeof ((_a = options == null ? void 0 : options.DOMPurify) == null ? void 0 : _a.sanitizeWithVideo) === "function") {
          data = options.DOMPurify.sanitizeWithVideo(data);
        }
        if ($doc && options.fieldName) {
          $doc.update({ [options.fieldName]: data });
        } else {
          $$invalidate(13, content = data);
        }
        dispatch("editor:save", { content: data });
      }
      if (remove) {
        destroyEditor(!saving);
      }
    }
  }
  const writable_props = ["content", "enrichedContent", "options"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<TJSTinyMCE> was created with unknown prop '${key}'`);
  });
  const click_handler = () => initEditor();
  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      editorContentEl = $$value;
      $$invalidate(6, editorContentEl);
    });
  }
  function div1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      editorEl = $$value;
      $$invalidate(4, editorEl);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("content" in $$props2)
      $$invalidate(13, content = $$props2.content);
    if ("enrichedContent" in $$props2)
      $$invalidate(1, enrichedContent = $$props2.enrichedContent);
    if ("options" in $$props2)
      $$invalidate(0, options = $$props2.options);
  };
  $$self.$capture_state = () => ({
    createEventDispatcher,
    getContext,
    onDestroy,
    onMount,
    tick,
    applyStyles,
    TJSDocument,
    FontManager,
    TinyMCEHelper,
    MCEImpl,
    content,
    enrichedContent,
    options,
    positionStore,
    dispatch,
    doc,
    clickToEdit,
    editable,
    editor,
    editorActive,
    editorButton,
    editorContentEl,
    editorEl,
    keyCode,
    keyFocused,
    maxCharacterLength,
    destroyEditor,
    initEditor,
    onBlur,
    onClick,
    onContentChanged,
    onDocumentDeleted,
    onKeydown,
    onKeyup,
    saveEditor,
    $doc,
    $positionStore
  });
  $$self.$inject_state = ($$props2) => {
    if ("content" in $$props2)
      $$invalidate(13, content = $$props2.content);
    if ("enrichedContent" in $$props2)
      $$invalidate(1, enrichedContent = $$props2.enrichedContent);
    if ("options" in $$props2)
      $$invalidate(0, options = $$props2.options);
    if ("clickToEdit" in $$props2)
      $$invalidate(2, clickToEdit = $$props2.clickToEdit);
    if ("editable" in $$props2)
      $$invalidate(14, editable = $$props2.editable);
    if ("editor" in $$props2)
      editor = $$props2.editor;
    if ("editorActive" in $$props2)
      $$invalidate(3, editorActive = $$props2.editorActive);
    if ("editorButton" in $$props2)
      $$invalidate(5, editorButton = $$props2.editorButton);
    if ("editorContentEl" in $$props2)
      $$invalidate(6, editorContentEl = $$props2.editorContentEl);
    if ("editorEl" in $$props2)
      $$invalidate(4, editorEl = $$props2.editorEl);
    if ("keyCode" in $$props2)
      keyCode = $$props2.keyCode;
    if ("keyFocused" in $$props2)
      keyFocused = $$props2.keyFocused;
    if ("maxCharacterLength" in $$props2)
      maxCharacterLength = $$props2.maxCharacterLength;
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*editorActive, editorEl, $positionStore*/
    65560) {
      $:
        if (editorActive && editorEl && $positionStore) {
          const ariaSelector = MCEImpl.isV6 ? `.tox-tbtn[aria-controls^='aria-controls_']` : `.tox-tbtn[aria-owns^='aria-owns_']`;
          const mceActiveAuxButtonEl = editorEl.querySelector(ariaSelector);
          if (mceActiveAuxButtonEl) {
            mceActiveAuxButtonEl.click();
          }
          const auxEl = document.querySelector(".tox.tox-tinymce-aux");
          if (auxEl) {
            let child = auxEl.lastElementChild;
            while (child) {
              auxEl.removeChild(child);
              child = auxEl.lastElementChild;
            }
          }
        }
    }
    if ($$self.$$.dirty & /*options, editable*/
    16385) {
      $: {
        $$invalidate(14, editable = typeof options.editable === "boolean" ? options.editable : true);
        if (!editable) {
          destroyEditor();
        }
      }
    }
    if ($$self.$$.dirty & /*editorActive, editable, options*/
    16393) {
      $:
        $$invalidate(2, clickToEdit = !editorActive && editable && (typeof options.clickToEdit === "boolean" ? options.clickToEdit : false));
    }
    if ($$self.$$.dirty & /*editorActive, editable, options, clickToEdit*/
    16397) {
      $:
        $$invalidate(5, editorButton = !editorActive && editable && (typeof options.button === "boolean" ? options.button : true) && !clickToEdit);
    }
    if ($$self.$$.dirty & /*options*/
    1) {
      $:
        keyCode = typeof options.keyCode === "string" ? options.keyCode : "Enter";
    }
    if ($$self.$$.dirty & /*options*/
    1) {
      $:
        maxCharacterLength = Number.isInteger(options.maxCharacterLength) && options.maxCharacterLength >= 0 ? options.maxCharacterLength : void 0;
    }
    if ($$self.$$.dirty & /*options*/
    1) {
      $:
        if (options.fonts) {
          FontManager.loadFonts({ fonts: options.fonts });
        }
    }
    if ($$self.$$.dirty & /*options, $doc*/
    32769) {
      $:
        if (options.document !== void 0) {
          if (!(options.document instanceof globalThis.foundry.abstract.Document)) {
            throw new TypeError(`TJSTinyMCE error: 'options.document' is not a Foundry document.`);
          }
          if (typeof options.fieldName !== "string") {
            throw new TypeError(`TJSTinyMCE error: 'options.document' is defined, but 'options.fieldName' is not a string.`);
          }
          if (options.document !== $doc) {
            $$invalidate(1, enrichedContent = "");
            $$invalidate(13, content = "");
            destroyEditor();
          }
          doc.set(options.document);
        } else {
          if ($doc) {
            $$invalidate(1, enrichedContent = "");
            $$invalidate(13, content = "");
            destroyEditor();
            doc.set(void 0);
          }
        }
    }
    if ($$self.$$.dirty & /*$doc, options, content*/
    40961) {
      $: {
        $$invalidate(13, content = $doc !== void 0 ? globalThis.foundry.utils.getProperty($doc, options.fieldName) : typeof content === "string" ? content : "");
        onContentChanged(content, typeof options.enrichContent === "boolean" ? options.enrichContent : true);
      }
    }
  };
  return [
    options,
    enrichedContent,
    clickToEdit,
    editorActive,
    editorEl,
    editorButton,
    editorContentEl,
    positionStore,
    doc,
    initEditor,
    onClick,
    onKeydown,
    onKeyup,
    content,
    editable,
    $doc,
    $positionStore,
    click_handler,
    div0_binding,
    div1_binding
  ];
}
var TJSTinyMCE = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(
      this,
      options,
      instance6,
      create_fragment6,
      safe_not_equal,
      {
        content: 13,
        enrichedContent: 1,
        options: 0
      },
      add_css6
    );
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TJSTinyMCE",
      options,
      id: create_fragment6.name
    });
  }
  get content() {
    throw new Error("<TJSTinyMCE>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set content(value) {
    throw new Error("<TJSTinyMCE>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get enrichedContent() {
    throw new Error("<TJSTinyMCE>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set enrichedContent(value) {
    throw new Error("<TJSTinyMCE>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get options() {
    throw new Error("<TJSTinyMCE>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set options(value) {
    throw new Error("<TJSTinyMCE>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var TJSTinyMCE_default = TJSTinyMCE;

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/action/index.js
function toggleDetails(details, { store, clickActive = true } = {}) {
  const summary = details.querySelector("summary");
  let animation;
  let open = details.open;
  const unsubscribe = subscribeFirstRest(store, (value) => {
    open = value;
    details.open = open;
  }, async (value) => {
    open = value;
    await tick();
    handleAnimation();
  });
  function animate(a, b, value) {
    details.style.overflow = "hidden";
    const duration = Math.max(0, 30 * Math.log(Math.abs(b - a) + Number.EPSILON));
    animation = details.animate(
      {
        height: [`${a}px`, `${b}px`]
      },
      {
        duration,
        easing: "ease-out"
      }
    );
    animation.onfinish = () => {
      details.open = value;
      details.dataset.closing = "false";
      details.style.overflow = "";
    };
  }
  function handleAnimation() {
    if (open) {
      const a = details.offsetHeight;
      if (animation) {
        animation.cancel();
      }
      details.open = true;
      const b = details.offsetHeight;
      animate(a, b, true);
    } else {
      const a = details.offsetHeight;
      const b = summary.offsetHeight;
      details.dataset.closing = "true";
      animate(a, b, false);
    }
  }
  function handleClick(e) {
    if (clickActive) {
      e.preventDefault();
      store.set(!open);
    }
  }
  summary.addEventListener("click", handleClick);
  return {
    destroy() {
      unsubscribe();
      summary.removeEventListener("click", handleClick);
    }
  };
}

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/folder/TJSSvgFolder.svelte
var file7 = "node_modules\\@typhonjs-fvtt\\svelte-standard\\_dist\\component\\standard\\folder\\TJSSvgFolder.svelte";
function add_css7(target) {
  append_styles(target, "svelte-146jjta", "details.svelte-146jjta.svelte-146jjta{margin-left:var(--tjs-folder-details-margin-left, -0.4em);padding-left:var(--tjs-folder-details-padding-left, 0.4em)}summary.svelte-146jjta.svelte-146jjta{display:flex;position:relative;align-items:center;background-blend-mode:var(--tjs-folder-summary-background-blend-mode, initial);background:var(--tjs-folder-summary-background, none);border:var(--tjs-folder-summary-border, none);border-radius:var(--tjs-folder-summary-border-radius, 0);border-width:var(--tjs-folder-summary-border-width, initial);cursor:var(--tjs-folder-summary-cursor, pointer);font-size:var(--tjs-folder-summary-font-size, inherit);font-weight:var(--tjs-folder-summary-font-weight, bold);font-family:var(--tjs-folder-summary-font-family, inherit);gap:var(--tjs-folder-summary-gap, 0.125em);list-style:none;margin:var(--tjs-folder-summary-margin, 0 0 0 -0.4em);padding:var(--tjs-folder-summary-padding, 0.25em) 0;transition:var(--tjs-folder-summary-transition, background 0.1s);user-select:none;width:var(--tjs-folder-summary-width, fit-content)}.default-cursor.svelte-146jjta.svelte-146jjta{cursor:default}summary.svelte-146jjta svg.svelte-146jjta{width:var(--tjs-folder-summary-chevron-size, var(--tjs-folder-summary-font-size, 1.25em));height:var(--tjs-folder-summary-chevron-size, var(--tjs-folder-summary-font-size, 1.25em));color:var(--tjs-folder-summary-chevron-color, currentColor);cursor:var(--tjs-folder-summary-cursor, pointer);opacity:var(--tjs-folder-summary-chevron-opacity, 0.2);margin:var(--tjs-folder-summary-chevron-margin, 0);transition:var(--tjs-folder-summary-chevron-transition, opacity 0.2s, transform 0.1s);transform:var(--tjs-folder-summary-chevron-rotate-closed, rotate(-90deg))}summary.svelte-146jjta.svelte-146jjta:focus-visible{box-shadow:var(--tjs-folder-summary-box-shadow-focus-visible, var(--tjs-default-box-shadow-focus-visible));outline:var(--tjs-folder-summary-outline-focus-visible, var(--tjs-default-outline-focus-visible, revert));transition:var(--tjs-folder-summary-transition-focus-visible, var(--tjs-default-transition-focus-visible))}summary.svelte-146jjta:focus-visible .label.svelte-146jjta{text-shadow:var(--tjs-folder-summary-label-text-shadow-focus-visible, var(--tjs-default-text-shadow-focus-hover, revert))}summary.svelte-146jjta:focus-visible .tjs-folder-focus-indicator.svelte-146jjta{background:var(--tjs-folder-summary-focus-indicator-background, var(--tjs-default-focus-indicator-background, white))}summary.svelte-146jjta:hover svg.svelte-146jjta{opacity:var(--tjs-folder-summary-chevron-opacity-hover, 1)}.tjs-folder-focus-indicator.svelte-146jjta.svelte-146jjta{align-self:var(--tjs-folder-summary-focus-indicator-align-self, var(--tjs-default-focus-indicator-align-self, stretch));border:var(--tjs-folder-summary-focus-indicator-border, var(--tjs-default-focus-indicator-border));border-radius:var(--tjs-folder-summary-focus-indicator-border-radius, var(--tjs-default-focus-indicator-border-radius, 0.1em));flex:0 0 var(--tjs-folder-summary-focus-indicator-width, var(--tjs-default-focus-indicator-width, 0.25em));height:var(--tjs-folder-summary-focus-indicator-height, var(--tjs-default-focus-indicator-height));transition:var(--tjs-folder-summary-focus-indicator-transition, var(--tjs-default-focus-indicator-transition))}details[open].svelte-146jjta>summary.svelte-146jjta{background:var(--tjs-folder-summary-background-open, var(--tjs-folder-summary-background, inherit))}[open].svelte-146jjta:not(details[data-closing='true'])>summary svg.svelte-146jjta{transform:rotate(var(--tjs-folder-summary-chevron-rotate-open, 0))}.contents.svelte-146jjta.svelte-146jjta{position:relative;background-blend-mode:var(--tjs-folder-contents-background-blend-mode, initial);background:var(--tjs-folder-contents-background, none);border:var(--tjs-folder-contents-border, none);margin:var(--tjs-folder-contents-margin, 0 0 0 -0.4em);padding:var(--tjs-folder-contents-padding, 0 0 0 calc(var(--tjs-folder-summary-font-size, 1em) * 0.8))}.contents.svelte-146jjta.svelte-146jjta::before{content:'';position:absolute;width:0;height:calc(100% + 0.65em);left:0;top:-0.65em}.label.svelte-146jjta.svelte-146jjta{overflow:var(--tjs-folder-summary-label-overflow, hidden);text-overflow:var(--tjs-folder-summary-label-text-overflow, ellipsis);white-space:var(--tjs-folder-summary-label-white-space, nowrap);width:var(--tjs-folder-summary-label-width, fit-content)}summary.svelte-146jjta:focus-visible+.contents.svelte-146jjta::before{height:100%;top:0}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVEpTU3ZnRm9sZGVyLnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUFtY0kscUNBQUEsQ0FDSSxXQUFBLENBQUEsSUFBQSxnQ0FBQSxDQUFBLE9BQUEsQ0FBMEQsQ0FDMUQsWUFBQSxDQUFBLElBQUEsaUNBQUEsQ0FBQSxNQUFBLENBQ0osQ0FFQSxxQ0FBQSxDQUNJLE9BQUEsQ0FBQSxJQUFhLENBQ2IsUUFBQSxDQUFBLFFBQWtCLENBQ2xCLFdBQUEsQ0FBQSxNQUFtQixDQUNuQixxQkFBQSxDQUFBLElBQUEsMENBQUEsQ0FBQSxRQUFBLENBQStFLENBQy9FLFVBQUEsQ0FBQSxJQUFBLCtCQUFBLENBQUEsS0FBQSxDQUFzRCxDQUN0RCxNQUFBLENBQUEsSUFBQSwyQkFBQSxDQUFBLEtBQUEsQ0FBOEMsQ0FDOUMsYUFBQSxDQUFBLElBQUEsa0NBQUEsQ0FBQSxFQUFBLENBQXlELENBQ3pELFlBQUEsQ0FBQSxJQUFBLGlDQUFBLENBQUEsUUFBQSxDQUE2RCxDQUM3RCxNQUFBLENBQUEsSUFBQSwyQkFBQSxDQUFBLFFBQUEsQ0FBaUQsQ0FDakQsU0FBQSxDQUFBLElBQUEsOEJBQUEsQ0FBQSxRQUFBLENBQXVELENBQ3ZELFdBQUEsQ0FBQSxJQUFBLGdDQUFBLENBQUEsS0FBQSxDQUF3RCxDQUN4RCxXQUFBLENBQUEsSUFBQSxnQ0FBQSxDQUFBLFFBQUEsQ0FBMkQsQ0FDM0QsR0FBQSxDQUFBLElBQUEsd0JBQUEsQ0FBQSxRQUFBLENBQTJDLENBQzNDLFVBQUEsQ0FBQSxJQUFnQixDQUNoQixNQUFBLENBQUEsSUFBQSwyQkFBQSxDQUFBLGFBQUEsQ0FBc0QsQ0FDdEQsT0FBQSxDQUFBLElBQUEsNEJBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxDQUFvRCxDQUNwRCxVQUFBLENBQUEsSUFBQSwrQkFBQSxDQUFBLGdCQUFBLENBQWlFLENBQ2pFLFdBQUEsQ0FBQSxJQUFpQixDQUNqQixLQUFBLENBQUEsSUFBQSwwQkFBQSxDQUFBLFlBQUEsQ0FDSixDQUVBLDZDQUFBLENBQ0ksTUFBQSxDQUFBLE9BQ0osQ0FFQSxzQkFBQSxDQUFBLGtCQUFBLENBQ0ksS0FBQSxDQUFBLElBQUEsaUNBQUEsQ0FBQSw0Q0FBQSxDQUEwRixDQUMxRixNQUFBLENBQUEsSUFBQSxpQ0FBQSxDQUFBLDRDQUFBLENBQTJGLENBQzNGLEtBQUEsQ0FBQSxJQUFBLGtDQUFBLENBQUEsYUFBQSxDQUE0RCxDQUM1RCxNQUFBLENBQUEsSUFBQSwyQkFBQSxDQUFBLFFBQUEsQ0FBaUQsQ0FDakQsT0FBQSxDQUFBLElBQUEsb0NBQUEsQ0FBQSxJQUFBLENBQXVELENBQ3ZELE1BQUEsQ0FBQSxJQUFBLG1DQUFBLENBQUEsRUFBQSxDQUFtRCxDQUNuRCxVQUFBLENBQUEsSUFBQSx1Q0FBQSxDQUFBLDZCQUFBLENBQXNGLENBQ3RGLFNBQUEsQ0FBQSxJQUFBLDBDQUFBLENBQUEsZUFBQSxDQUNKLENBRUEscUNBQUEsY0FBQSxDQUNJLFVBQUEsQ0FBQSxJQUFBLDZDQUFBLENBQUEsNENBQUEsQ0FBMkcsQ0FDM0csT0FBQSxDQUFBLElBQUEsMENBQUEsQ0FBQSxpREFBQSxDQUEwRyxDQUMxRyxVQUFBLENBQUEsSUFBQSw2Q0FBQSxDQUFBLDRDQUFBLENBQ0osQ0FFQSxzQkFBQSxjQUFBLENBQUEscUJBQUEsQ0FDSSxXQUFBLENBQUEsSUFBQSxvREFBQSxDQUFBLG1EQUFBLENBQ0osQ0FFQSxzQkFBQSxjQUFBLENBQUEsMENBQUEsQ0FDSSxVQUFBLENBQUEsSUFBQSwrQ0FBQSxDQUFBLHFEQUFBLENBQ0osQ0FFQSxzQkFBQSxNQUFBLENBQUEsa0JBQUEsQ0FDSSxPQUFBLENBQUEsSUFBQSwwQ0FBQSxDQUFBLEVBQUEsQ0FDSixDQUVBLHlEQUFBLENBQ0ksVUFBQSxDQUFBLElBQUEsK0NBQUEsQ0FBQSx1REFBQSxDQUF3SCxDQUN4SCxNQUFBLENBQUEsSUFBQSwyQ0FBQSxDQUFBLDBDQUFBLENBQW1HLENBQ25HLGFBQUEsQ0FBQSxJQUFBLGtEQUFBLENBQUEsd0RBQUEsQ0FBK0gsQ0FDL0gsSUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSwwQ0FBQSxDQUFBLGlEQUFBLENBQTJHLENBQzNHLE1BQUEsQ0FBQSxJQUFBLDJDQUFBLENBQUEsMENBQUEsQ0FBbUcsQ0FDbkcsVUFBQSxDQUFBLElBQUEsK0NBQUEsQ0FBQSw4Q0FBQSxDQUNKLENBRUEsT0FBQSxDQUFBLElBQUEsZ0JBQUEsQ0FBQSxzQkFBQSxDQUNJLFVBQUEsQ0FBQSxJQUFBLG9DQUFBLENBQUEsOENBQUEsQ0FDSixDQUVBLENBQUEsSUFBQSxnQkFBQSxLQUFBLE9BQUEsQ0FBQSxZQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsa0JBQUEsQ0FDSSxTQUFBLENBQUEsT0FBQSxJQUFBLHdDQUFBLENBQUEsRUFBQSxDQUFBLENBQ0osQ0FFQSx1Q0FBQSxDQUNJLFFBQUEsQ0FBQSxRQUFrQixDQUNsQixxQkFBQSxDQUFBLElBQUEsMkNBQUEsQ0FBQSxRQUFBLENBQWdGLENBQ2hGLFVBQUEsQ0FBQSxJQUFBLGdDQUFBLENBQUEsS0FBQSxDQUF1RCxDQUN2RCxNQUFBLENBQUEsSUFBQSw0QkFBQSxDQUFBLEtBQUEsQ0FBK0MsQ0FDL0MsTUFBQSxDQUFBLElBQUEsNEJBQUEsQ0FBQSxhQUFBLENBQXVELENBQ3ZELE9BQUEsQ0FBQSxJQUFBLDZCQUFBLENBQUEsMkRBQUEsQ0FDSixDQUVBLHVDQUFBLFFBQUEsQ0FDSSxPQUFBLENBQUEsRUFBVyxDQUNYLFFBQUEsQ0FBQSxRQUFrQixDQUNsQixLQUFBLENBQUEsQ0FBUSxDQUNSLE1BQUEsQ0FBQSxLQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsTUFBQSxDQUEyQixDQUMzQixJQUFBLENBQUEsQ0FBTyxDQUNQLEdBQUEsQ0FBQSxPQUNKLENBRUEsb0NBQUEsQ0FDSSxRQUFBLENBQUEsSUFBQSxtQ0FBQSxDQUFBLE9BQUEsQ0FBMEQsQ0FDMUQsYUFBQSxDQUFBLElBQUEsd0NBQUEsQ0FBQSxTQUFBLENBQXNFLENBQ3RFLFdBQUEsQ0FBQSxJQUFBLHNDQUFBLENBQUEsT0FBQSxDQUFnRSxDQUNoRSxLQUFBLENBQUEsSUFBQSxnQ0FBQSxDQUFBLFlBQUEsQ0FDSixDQUVBLHNCQUFBLGNBQUEsQ0FBQSx3QkFBQSxRQUFBLENBQ0ksTUFBQSxDQUFBLElBQVksQ0FDWixHQUFBLENBQUEsQ0FDSiIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJUSlNTdmdGb2xkZXIuc3ZlbHRlIl19 */");
}
var get_summary_end_slot_changes = (dirty) => ({});
var get_summary_end_slot_context = (ctx) => ({});
var get_label_slot_changes = (dirty) => ({});
var get_label_slot_context = (ctx) => ({});
function create_if_block_4(ctx) {
  let div;
  const block = {
    c: function create() {
      div = element("div");
      attr_dev(div, "class", "tjs-folder-focus-indicator svelte-146jjta");
      add_location(div, file7, 421, 11, 16463);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_4.name,
    type: "if",
    source: "(421:8) {#if localOptions.focusIndicator}",
    ctx
  });
  return block;
}
function create_else_block3(ctx) {
  let div;
  let t_value = localize(
    /*label*/
    ctx[1]
  ) + "";
  let t;
  const block = {
    c: function create() {
      div = element("div");
      t = text(t_value);
      attr_dev(div, "class", "label svelte-146jjta");
      add_location(div, file7, 428, 16, 16782);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, t);
      ctx[34](div);
    },
    p: function update(ctx2, dirty) {
      if (dirty[0] & /*label*/
      2 && t_value !== (t_value = localize(
        /*label*/
        ctx2[1]
      ) + ""))
        set_data_dev(t, t_value);
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div);
      ctx[34](null);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_else_block3.name,
    type: "else",
    source: "(428:12) {:else}",
    ctx
  });
  return block;
}
function create_if_block_3(ctx) {
  var _a, _b;
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    isObject(
      /*folder*/
      (_b = (_a = ctx[5]) == null ? void 0 : _a.slotLabel) == null ? void 0 : _b.props
    ) ? (
      /*folder*/
      ctx[5].slotLabel.props
    ) : {}
  ];
  var switch_value = (
    /*folder*/
    ctx[5].slotLabel.class
  );
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return {
      props: switch_instance_props,
      $$inline: true
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
  }
  const block = {
    c: function create() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      var _a2, _b2;
      const switch_instance_changes = dirty[0] & /*folder*/
      32 ? get_spread_update(switch_instance_spread_levels, [
        get_spread_object(isObject(
          /*folder*/
          (_b2 = (_a2 = ctx2[5]) == null ? void 0 : _a2.slotLabel) == null ? void 0 : _b2.props
        ) ? (
          /*folder*/
          ctx2[5].slotLabel.props
        ) : {})
      ]) : {};
      if (dirty[0] & /*folder*/
      32 && switch_value !== (switch_value = /*folder*/
      ctx2[5].slotLabel.class)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_3.name,
    type: "if",
    source: "(426:12) {#if isSvelteComponent(folder?.slotLabel?.class)}",
    ctx
  });
  return block;
}
function fallback_block_2(ctx) {
  let show_if;
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block_3, create_else_block3];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    var _a, _b;
    if (dirty[0] & /*folder*/
    32)
      show_if = null;
    if (show_if == null)
      show_if = !!isSvelteComponent(
        /*folder*/
        (_b = (_a = ctx2[5]) == null ? void 0 : _a.slotLabel) == null ? void 0 : _b.class
      );
    if (show_if)
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx, [-1, -1]);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  const block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2, dirty);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: fallback_block_2.name,
    type: "fallback",
    source: "(425:25)              ",
    ctx
  });
  return block;
}
function create_if_block_2(ctx) {
  var _a, _b;
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    isObject(
      /*folder*/
      (_b = (_a = ctx[5]) == null ? void 0 : _a.slotSummaryEnd) == null ? void 0 : _b.props
    ) ? (
      /*folder*/
      ctx[5].slotSummaryEnd.props
    ) : {}
  ];
  var switch_value = (
    /*folder*/
    ctx[5].slotSummaryEnd.class
  );
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return {
      props: switch_instance_props,
      $$inline: true
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
  }
  const block = {
    c: function create() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      var _a2, _b2;
      const switch_instance_changes = dirty[0] & /*folder*/
      32 ? get_spread_update(switch_instance_spread_levels, [
        get_spread_object(isObject(
          /*folder*/
          (_b2 = (_a2 = ctx2[5]) == null ? void 0 : _a2.slotSummaryEnd) == null ? void 0 : _b2.props
        ) ? (
          /*folder*/
          ctx2[5].slotSummaryEnd.props
        ) : {})
      ]) : {};
      if (dirty[0] & /*folder*/
      32 && switch_value !== (switch_value = /*folder*/
      ctx2[5].slotSummaryEnd.class)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_2.name,
    type: "if",
    source: "(434:12) {#if isSvelteComponent(folder?.slotSummaryEnd?.class)}",
    ctx
  });
  return block;
}
function fallback_block_1(ctx) {
  var _a, _b;
  let show_if = isSvelteComponent(
    /*folder*/
    (_b = (_a = ctx[5]) == null ? void 0 : _a.slotSummaryEnd) == null ? void 0 : _b.class
  );
  let if_block_anchor;
  let current;
  let if_block = show_if && create_if_block_2(ctx);
  const block = {
    c: function create() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      var _a2, _b2;
      if (dirty[0] & /*folder*/
      32)
        show_if = isSvelteComponent(
          /*folder*/
          (_b2 = (_a2 = ctx2[5]) == null ? void 0 : _a2.slotSummaryEnd) == null ? void 0 : _b2.class
        );
      if (show_if) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & /*folder*/
          32) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_2(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: fallback_block_1.name,
    type: "fallback",
    source: "(433:33)              ",
    ctx
  });
  return block;
}
function create_if_block6(ctx) {
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[25].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[24],
    null
  );
  const default_slot_or_fallback = default_slot || fallback_block2(ctx);
  const block = {
    c: function create() {
      if (default_slot_or_fallback)
        default_slot_or_fallback.c();
    },
    m: function mount(target, anchor) {
      if (default_slot_or_fallback) {
        default_slot_or_fallback.m(target, anchor);
      }
      current = true;
    },
    p: function update(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty[0] & /*$$scope*/
        16777216)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[24],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[24]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[24],
              dirty,
              null
            ),
            null
          );
        }
      } else {
        if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty[0] & /*folder*/
        32)) {
          default_slot_or_fallback.p(ctx2, !current ? [-1, -1] : dirty);
        }
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(default_slot_or_fallback, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot_or_fallback, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (default_slot_or_fallback)
        default_slot_or_fallback.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block6.name,
    type: "if",
    source: "(441:8) {#if visible}",
    ctx
  });
  return block;
}
function create_if_block_14(ctx) {
  var _a, _b;
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    isObject(
      /*folder*/
      (_b = (_a = ctx[5]) == null ? void 0 : _a.slotDefault) == null ? void 0 : _b.props
    ) ? (
      /*folder*/
      ctx[5].slotDefault.props
    ) : {}
  ];
  var switch_value = (
    /*folder*/
    ctx[5].slotDefault.class
  );
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return {
      props: switch_instance_props,
      $$inline: true
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
  }
  const block = {
    c: function create() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      var _a2, _b2;
      const switch_instance_changes = dirty[0] & /*folder*/
      32 ? get_spread_update(switch_instance_spread_levels, [
        get_spread_object(isObject(
          /*folder*/
          (_b2 = (_a2 = ctx2[5]) == null ? void 0 : _a2.slotDefault) == null ? void 0 : _b2.props
        ) ? (
          /*folder*/
          ctx2[5].slotDefault.props
        ) : {})
      ]) : {};
      if (dirty[0] & /*folder*/
      32 && switch_value !== (switch_value = /*folder*/
      ctx2[5].slotDefault.class)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_14.name,
    type: "if",
    source: "(443:16) {#if isSvelteComponent(folder?.slotDefault?.class)}",
    ctx
  });
  return block;
}
function fallback_block2(ctx) {
  var _a, _b;
  let show_if = isSvelteComponent(
    /*folder*/
    (_b = (_a = ctx[5]) == null ? void 0 : _a.slotDefault) == null ? void 0 : _b.class
  );
  let if_block_anchor;
  let current;
  let if_block = show_if && create_if_block_14(ctx);
  const block = {
    c: function create() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      var _a2, _b2;
      if (dirty[0] & /*folder*/
      32)
        show_if = isSvelteComponent(
          /*folder*/
          (_b2 = (_a2 = ctx2[5]) == null ? void 0 : _a2.slotDefault) == null ? void 0 : _b2.class
        );
      if (show_if) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & /*folder*/
          32) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_14(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: fallback_block2.name,
    type: "fallback",
    source: "(442:18)                  ",
    ctx
  });
  return block;
}
function create_fragment7(ctx) {
  let details;
  let summary;
  let svg;
  let path;
  let t0;
  let t1;
  let t2;
  let t3;
  let div;
  let toggleDetails_action;
  let applyStyles_action;
  let current;
  let mounted;
  let dispose;
  let if_block0 = (
    /*localOptions*/
    ctx[7].focusIndicator && create_if_block_4(ctx)
  );
  const label_slot_template = (
    /*#slots*/
    ctx[25].label
  );
  const label_slot = create_slot(
    label_slot_template,
    ctx,
    /*$$scope*/
    ctx[24],
    get_label_slot_context
  );
  const label_slot_or_fallback = label_slot || fallback_block_2(ctx);
  const summary_end_slot_template = (
    /*#slots*/
    ctx[25]["summary-end"]
  );
  const summary_end_slot = create_slot(
    summary_end_slot_template,
    ctx,
    /*$$scope*/
    ctx[24],
    get_summary_end_slot_context
  );
  const summary_end_slot_or_fallback = summary_end_slot || fallback_block_1(ctx);
  let if_block1 = (
    /*visible*/
    ctx[11] && create_if_block6(ctx)
  );
  const block = {
    c: function create() {
      details = element("details");
      summary = element("summary");
      svg = svg_element("svg");
      path = svg_element("path");
      t0 = space();
      if (if_block0)
        if_block0.c();
      t1 = space();
      if (label_slot_or_fallback)
        label_slot_or_fallback.c();
      t2 = space();
      if (summary_end_slot_or_fallback)
        summary_end_slot_or_fallback.c();
      t3 = space();
      div = element("div");
      if (if_block1)
        if_block1.c();
      attr_dev(path, "fill", "currentColor");
      attr_dev(path, "stroke", "currentColor");
      set_style(path, "stroke-linejoin", "round");
      set_style(path, "stroke-width", "3");
      attr_dev(path, "d", "M5,8L19,8L12,15Z");
      add_location(path, file7, 412, 12, 16201);
      attr_dev(svg, "viewBox", "0 0 24 24");
      attr_dev(svg, "class", "svelte-146jjta");
      add_location(svg, file7, 411, 8, 16145);
      attr_dev(summary, "class", "svelte-146jjta");
      toggle_class(
        summary,
        "default-cursor",
        /*localOptions*/
        ctx[7].chevronOnly
      );
      add_location(summary, file7, 405, 4, 15869);
      attr_dev(div, "class", "contents svelte-146jjta");
      add_location(div, file7, 439, 4, 17187);
      attr_dev(details, "class", "tjs-svg-folder svelte-146jjta");
      attr_dev(
        details,
        "data-id",
        /*id*/
        ctx[0]
      );
      attr_dev(
        details,
        "data-label",
        /*label*/
        ctx[1]
      );
      attr_dev(details, "data-closing", "false");
      add_location(details, file7, 384, 0, 15361);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, details, anchor);
      append_dev(details, summary);
      append_dev(summary, svg);
      append_dev(svg, path);
      ctx[33](svg);
      append_dev(summary, t0);
      if (if_block0)
        if_block0.m(summary, null);
      append_dev(summary, t1);
      if (label_slot_or_fallback) {
        label_slot_or_fallback.m(summary, null);
      }
      append_dev(summary, t2);
      if (summary_end_slot_or_fallback) {
        summary_end_slot_or_fallback.m(summary, null);
      }
      ctx[35](summary);
      append_dev(details, t3);
      append_dev(details, div);
      if (if_block1)
        if_block1.m(div, null);
      ctx[36](details);
      current = true;
      if (!mounted) {
        dispose = [
          listen_dev(
            summary,
            "click",
            /*onClickSummary*/
            ctx[12],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            summary,
            "contextmenu",
            function() {
              if (is_function(
                /*onContextMenu*/
                ctx[4]
              ))
                ctx[4].apply(this, arguments);
            },
            false,
            false,
            false,
            false
          ),
          listen_dev(
            summary,
            "keydown",
            /*onKeyDown*/
            ctx[13],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            summary,
            "keyup",
            /*onKeyUp*/
            ctx[14],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            details,
            "close",
            /*onLocalClose*/
            ctx[15],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            details,
            "closeAny",
            /*onLocalClose*/
            ctx[15],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            details,
            "open",
            /*onLocalOpen*/
            ctx[16],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            details,
            "openAny",
            /*onLocalOpen*/
            ctx[16],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            details,
            "click",
            /*click_handler*/
            ctx[26],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            details,
            "keydown",
            /*keydown_handler*/
            ctx[27],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            details,
            "keyup",
            /*keyup_handler*/
            ctx[28],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            details,
            "open",
            /*open_handler*/
            ctx[29],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            details,
            "close",
            /*close_handler*/
            ctx[30],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            details,
            "openAny",
            /*openAny_handler*/
            ctx[31],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            details,
            "closeAny",
            /*closeAny_handler*/
            ctx[32],
            false,
            false,
            false,
            false
          ),
          action_destroyer(toggleDetails_action = toggleDetails.call(null, details, {
            store: (
              /*store*/
              ctx[2]
            ),
            clickActive: false
          })),
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            details,
            /*styles*/
            ctx[3]
          ))
        ];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      if (
        /*localOptions*/
        ctx[7].focusIndicator
      ) {
        if (if_block0) {
        } else {
          if_block0 = create_if_block_4(ctx);
          if_block0.c();
          if_block0.m(summary, t1);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (label_slot) {
        if (label_slot.p && (!current || dirty[0] & /*$$scope*/
        16777216)) {
          update_slot_base(
            label_slot,
            label_slot_template,
            ctx,
            /*$$scope*/
            ctx[24],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx[24]
            ) : get_slot_changes(
              label_slot_template,
              /*$$scope*/
              ctx[24],
              dirty,
              get_label_slot_changes
            ),
            get_label_slot_context
          );
        }
      } else {
        if (label_slot_or_fallback && label_slot_or_fallback.p && (!current || dirty[0] & /*folder, labelEl, label*/
        290)) {
          label_slot_or_fallback.p(ctx, !current ? [-1, -1] : dirty);
        }
      }
      if (summary_end_slot) {
        if (summary_end_slot.p && (!current || dirty[0] & /*$$scope*/
        16777216)) {
          update_slot_base(
            summary_end_slot,
            summary_end_slot_template,
            ctx,
            /*$$scope*/
            ctx[24],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx[24]
            ) : get_slot_changes(
              summary_end_slot_template,
              /*$$scope*/
              ctx[24],
              dirty,
              get_summary_end_slot_changes
            ),
            get_summary_end_slot_context
          );
        }
      } else {
        if (summary_end_slot_or_fallback && summary_end_slot_or_fallback.p && (!current || dirty[0] & /*folder*/
        32)) {
          summary_end_slot_or_fallback.p(ctx, !current ? [-1, -1] : dirty);
        }
      }
      if (!current || dirty[0] & /*localOptions*/
      128) {
        toggle_class(
          summary,
          "default-cursor",
          /*localOptions*/
          ctx[7].chevronOnly
        );
      }
      if (
        /*visible*/
        ctx[11]
      ) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
          if (dirty[0] & /*visible*/
          2048) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block6(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (!current || dirty[0] & /*id*/
      1) {
        attr_dev(
          details,
          "data-id",
          /*id*/
          ctx[0]
        );
      }
      if (!current || dirty[0] & /*label*/
      2) {
        attr_dev(
          details,
          "data-label",
          /*label*/
          ctx[1]
        );
      }
      if (toggleDetails_action && is_function(toggleDetails_action.update) && dirty[0] & /*store*/
      4)
        toggleDetails_action.update.call(null, {
          store: (
            /*store*/
            ctx[2]
          ),
          clickActive: false
        });
      if (applyStyles_action && is_function(applyStyles_action.update) && dirty[0] & /*styles*/
      8)
        applyStyles_action.update.call(
          null,
          /*styles*/
          ctx[3]
        );
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(label_slot_or_fallback, local);
      transition_in(summary_end_slot_or_fallback, local);
      transition_in(if_block1);
      current = true;
    },
    o: function outro(local) {
      transition_out(label_slot_or_fallback, local);
      transition_out(summary_end_slot_or_fallback, local);
      transition_out(if_block1);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(details);
      ctx[33](null);
      if (if_block0)
        if_block0.d();
      if (label_slot_or_fallback)
        label_slot_or_fallback.d(detaching);
      if (summary_end_slot_or_fallback)
        summary_end_slot_or_fallback.d(detaching);
      ctx[35](null);
      if (if_block1)
        if_block1.d();
      ctx[36](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment7.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance7($$self, $$props, $$invalidate) {
  let $store, $$unsubscribe_store = noop, $$subscribe_store = () => ($$unsubscribe_store(), $$unsubscribe_store = subscribe(store, ($$value) => $$invalidate(23, $store = $$value)), store);
  $$self.$$.on_destroy.push(() => $$unsubscribe_store());
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TJSSvgFolder", slots, ["label", "summary-end", "default"]);
  let { folder = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { label = void 0 } = $$props;
  let { keyCode = void 0 } = $$props;
  let { options = void 0 } = $$props;
  let { store = void 0 } = $$props;
  validate_store(store, "store");
  $$subscribe_store();
  let { styles = void 0 } = $$props;
  let { onClose = void 0 } = $$props;
  let { onOpen = void 0 } = $$props;
  let { onContextMenu = void 0 } = $$props;
  const localOptions = {
    chevronOnly: false,
    focusIndicator: false
  };
  let detailsEl, labelEl, summaryEl, svgEl;
  let storeUnsubscribe;
  let visible = $store;
  let timeoutId;
  onDestroy(() => storeUnsubscribe());
  function createEvent(type, bubbles = false) {
    return new CustomEvent(
      type,
      {
        detail: {
          element: detailsEl,
          folder,
          id,
          label,
          store
        },
        bubbles
      }
    );
  }
  function handleOpenClose(event, fromKeyboard = false) {
    const target = event.target;
    const chevronTarget = target === svgEl || svgEl.contains(target);
    if (target === summaryEl || target === labelEl || chevronTarget || target.querySelector(".summary-click") !== null) {
      if (!fromKeyboard && localOptions.chevronOnly && !chevronTarget) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      set_store_value(store, $store = !$store, $store);
      if ($store && typeof onOpen === "function") {
        onOpen();
      } else if (typeof onClose === "function") {
        onClose();
      }
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (target.classList.contains("no-summary-click") || target.querySelector(".no-summary-click") !== null || target.parentElement && target.parentElement.classList.contains("no-summary-click")) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }
  function onClickSummary(event) {
    if (document.activeElement === summaryEl && ((event == null ? void 0 : event.pointerId) === -1 || (event == null ? void 0 : event.mozInputSource) === 6)) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    handleOpenClose(event);
  }
  function onKeyDown(event) {
    if (document.activeElement === summaryEl && event.code === keyCode) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  function onKeyUp(event) {
    if (document.activeElement === summaryEl && event.code === keyCode) {
      handleOpenClose(event, true);
      event.preventDefault();
      event.stopPropagation();
    }
  }
  function onLocalClose(event) {
    event.preventDefault();
    event.stopPropagation();
    store.set(false);
  }
  function onLocalOpen(event) {
    event.preventDefault();
    event.stopPropagation();
    store.set(true);
  }
  const writable_props = [
    "folder",
    "id",
    "label",
    "keyCode",
    "options",
    "store",
    "styles",
    "onClose",
    "onOpen",
    "onContextMenu"
  ];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<TJSSvgFolder> was created with unknown prop '${key}'`);
  });
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function open_handler(event) {
    bubble.call(this, $$self, event);
  }
  function close_handler(event) {
    bubble.call(this, $$self, event);
  }
  function openAny_handler(event) {
    bubble.call(this, $$self, event);
  }
  function closeAny_handler(event) {
    bubble.call(this, $$self, event);
  }
  function svg_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      svgEl = $$value;
      $$invalidate(10, svgEl);
    });
  }
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      labelEl = $$value;
      $$invalidate(8, labelEl);
    });
  }
  function summary_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      summaryEl = $$value;
      $$invalidate(9, summaryEl);
    });
  }
  function details_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      detailsEl = $$value;
      $$invalidate(6, detailsEl);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("folder" in $$props2)
      $$invalidate(5, folder = $$props2.folder);
    if ("id" in $$props2)
      $$invalidate(0, id = $$props2.id);
    if ("label" in $$props2)
      $$invalidate(1, label = $$props2.label);
    if ("keyCode" in $$props2)
      $$invalidate(17, keyCode = $$props2.keyCode);
    if ("options" in $$props2)
      $$invalidate(18, options = $$props2.options);
    if ("store" in $$props2)
      $$subscribe_store($$invalidate(2, store = $$props2.store));
    if ("styles" in $$props2)
      $$invalidate(3, styles = $$props2.styles);
    if ("onClose" in $$props2)
      $$invalidate(19, onClose = $$props2.onClose);
    if ("onOpen" in $$props2)
      $$invalidate(20, onOpen = $$props2.onOpen);
    if ("onContextMenu" in $$props2)
      $$invalidate(4, onContextMenu = $$props2.onContextMenu);
    if ("$$scope" in $$props2)
      $$invalidate(24, $$scope = $$props2.$$scope);
  };
  $$self.$capture_state = () => ({
    onDestroy,
    writable,
    applyStyles,
    isWritableStore,
    subscribeIgnoreFirst,
    isObject,
    isSvelteComponent,
    localize,
    toggleDetails,
    folder,
    id,
    label,
    keyCode,
    options,
    store,
    styles,
    onClose,
    onOpen,
    onContextMenu,
    localOptions,
    detailsEl,
    labelEl,
    summaryEl,
    svgEl,
    storeUnsubscribe,
    visible,
    timeoutId,
    createEvent,
    handleOpenClose,
    onClickSummary,
    onKeyDown,
    onKeyUp,
    onLocalClose,
    onLocalOpen,
    $store
  });
  $$self.$inject_state = ($$props2) => {
    if ("folder" in $$props2)
      $$invalidate(5, folder = $$props2.folder);
    if ("id" in $$props2)
      $$invalidate(0, id = $$props2.id);
    if ("label" in $$props2)
      $$invalidate(1, label = $$props2.label);
    if ("keyCode" in $$props2)
      $$invalidate(17, keyCode = $$props2.keyCode);
    if ("options" in $$props2)
      $$invalidate(18, options = $$props2.options);
    if ("store" in $$props2)
      $$subscribe_store($$invalidate(2, store = $$props2.store));
    if ("styles" in $$props2)
      $$invalidate(3, styles = $$props2.styles);
    if ("onClose" in $$props2)
      $$invalidate(19, onClose = $$props2.onClose);
    if ("onOpen" in $$props2)
      $$invalidate(20, onOpen = $$props2.onOpen);
    if ("onContextMenu" in $$props2)
      $$invalidate(4, onContextMenu = $$props2.onContextMenu);
    if ("detailsEl" in $$props2)
      $$invalidate(6, detailsEl = $$props2.detailsEl);
    if ("labelEl" in $$props2)
      $$invalidate(8, labelEl = $$props2.labelEl);
    if ("summaryEl" in $$props2)
      $$invalidate(9, summaryEl = $$props2.summaryEl);
    if ("svgEl" in $$props2)
      $$invalidate(10, svgEl = $$props2.svgEl);
    if ("storeUnsubscribe" in $$props2)
      $$invalidate(21, storeUnsubscribe = $$props2.storeUnsubscribe);
    if ("visible" in $$props2)
      $$invalidate(11, visible = $$props2.visible);
    if ("timeoutId" in $$props2)
      $$invalidate(22, timeoutId = $$props2.timeoutId);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*folder, id*/
    33) {
      $:
        $$invalidate(0, id = isObject(folder) && typeof folder.id === "string" ? folder.id : typeof id === "string" ? id : void 0);
    }
    if ($$self.$$.dirty[0] & /*folder, label*/
    34) {
      $:
        $$invalidate(1, label = isObject(folder) && typeof folder.label === "string" ? folder.label : typeof label === "string" ? label : "");
    }
    if ($$self.$$.dirty[0] & /*folder, keyCode*/
    131104) {
      $:
        $$invalidate(17, keyCode = isObject(folder) && typeof folder.keyCode === "string" ? folder.keyCode : typeof keyCode === "string" ? keyCode : "Enter");
    }
    if ($$self.$$.dirty[0] & /*folder, options*/
    262176) {
      $: {
        $$invalidate(18, options = isObject(folder) && isObject(folder.options) ? folder.options : isObject(options) ? options : {});
        if (typeof (options == null ? void 0 : options.chevronOnly) === "boolean") {
          $$invalidate(7, localOptions.chevronOnly = options.chevronOnly, localOptions);
        }
        if (typeof (options == null ? void 0 : options.focusIndicator) === "boolean") {
          $$invalidate(7, localOptions.focusIndicator = options.focusIndicator, localOptions);
        }
      }
    }
    if ($$self.$$.dirty[0] & /*folder, store, storeUnsubscribe, detailsEl*/
    2097252) {
      $: {
        $$subscribe_store($$invalidate(2, store = isObject(folder) && isWritableStore(folder.store) ? folder.store : isWritableStore(store) ? store : writable(false)));
        if (typeof storeUnsubscribe === "function") {
          storeUnsubscribe();
        }
        $$invalidate(21, storeUnsubscribe = subscribeIgnoreFirst(store, (value) => {
          if (detailsEl) {
            detailsEl.dispatchEvent(createEvent(value ? "open" : "close"));
            detailsEl.dispatchEvent(createEvent(value ? "openAny" : "closeAny", true));
          }
        }));
      }
    }
    if ($$self.$$.dirty[0] & /*folder, styles*/
    40) {
      $:
        $$invalidate(3, styles = isObject(folder) && isObject(folder.styles) ? folder.styles : isObject(styles) ? styles : void 0);
    }
    if ($$self.$$.dirty[0] & /*folder, onClose*/
    524320) {
      $:
        $$invalidate(19, onClose = isObject(folder) && typeof folder.onClose === "function" ? folder.onClose : typeof onClose === "function" ? onClose : void 0);
    }
    if ($$self.$$.dirty[0] & /*folder, onOpen*/
    1048608) {
      $:
        $$invalidate(20, onOpen = isObject(folder) && typeof folder.onOpen === "function" ? folder.onOpen : typeof onOpen === "function" ? onOpen : void 0);
    }
    if ($$self.$$.dirty[0] & /*folder, onContextMenu*/
    48) {
      $:
        $$invalidate(4, onContextMenu = isObject(folder) && typeof folder.onContextMenu === "function" ? folder.onContextMenu : typeof onContextMenu === "function" ? onContextMenu : () => null);
    }
    if ($$self.$$.dirty[0] & /*$store, timeoutId*/
    12582912) {
      $:
        if (!$store) {
          $$invalidate(22, timeoutId = setTimeout(() => $$invalidate(11, visible = false), 500));
        } else {
          clearTimeout(timeoutId);
          $$invalidate(11, visible = true);
        }
    }
  };
  return [
    id,
    label,
    store,
    styles,
    onContextMenu,
    folder,
    detailsEl,
    localOptions,
    labelEl,
    summaryEl,
    svgEl,
    visible,
    onClickSummary,
    onKeyDown,
    onKeyUp,
    onLocalClose,
    onLocalOpen,
    keyCode,
    options,
    onClose,
    onOpen,
    storeUnsubscribe,
    timeoutId,
    $store,
    $$scope,
    slots,
    click_handler,
    keydown_handler,
    keyup_handler,
    open_handler,
    close_handler,
    openAny_handler,
    closeAny_handler,
    svg_binding,
    div_binding,
    summary_binding,
    details_binding
  ];
}
var TJSSvgFolder = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(
      this,
      options,
      instance7,
      create_fragment7,
      safe_not_equal,
      {
        folder: 5,
        id: 0,
        label: 1,
        keyCode: 17,
        options: 18,
        store: 2,
        styles: 3,
        onClose: 19,
        onOpen: 20,
        onContextMenu: 4
      },
      add_css7,
      [-1, -1]
    );
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TJSSvgFolder",
      options,
      id: create_fragment7.name
    });
  }
  get folder() {
    throw new Error("<TJSSvgFolder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set folder(value) {
    throw new Error("<TJSSvgFolder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get id() {
    throw new Error("<TJSSvgFolder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set id(value) {
    throw new Error("<TJSSvgFolder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get label() {
    throw new Error("<TJSSvgFolder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set label(value) {
    throw new Error("<TJSSvgFolder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get keyCode() {
    throw new Error("<TJSSvgFolder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set keyCode(value) {
    throw new Error("<TJSSvgFolder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get options() {
    throw new Error("<TJSSvgFolder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set options(value) {
    throw new Error("<TJSSvgFolder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get store() {
    throw new Error("<TJSSvgFolder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set store(value) {
    throw new Error("<TJSSvgFolder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get styles() {
    throw new Error("<TJSSvgFolder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set styles(value) {
    throw new Error("<TJSSvgFolder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get onClose() {
    throw new Error("<TJSSvgFolder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set onClose(value) {
    throw new Error("<TJSSvgFolder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get onOpen() {
    throw new Error("<TJSSvgFolder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set onOpen(value) {
    throw new Error("<TJSSvgFolder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get onContextMenu() {
    throw new Error("<TJSSvgFolder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set onContextMenu(value) {
    throw new Error("<TJSSvgFolder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var TJSSvgFolder_default = TJSSvgFolder;

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/folder/TJSIconFolder.svelte
var file8 = "node_modules\\@typhonjs-fvtt\\svelte-standard\\_dist\\component\\standard\\folder\\TJSIconFolder.svelte";
function add_css8(target) {
  append_styles(target, "svelte-3pguxo", "details.svelte-3pguxo.svelte-3pguxo{margin-left:var(--tjs-folder-details-margin-left, -0.4em);padding-left:var(--tjs-folder-details-padding-left, 0.4em)}summary.svelte-3pguxo.svelte-3pguxo{display:flex;position:relative;align-items:center;background-blend-mode:var(--tjs-folder-summary-background-blend-mode, initial);background:var(--tjs-folder-summary-background, none);border:var(--tjs-folder-summary-border, none);border-radius:var(--tjs-folder-summary-border-radius, 0);border-width:var(--tjs-folder-summary-border-width, initial);cursor:var(--tjs-folder-summary-cursor, pointer);font-size:var(--tjs-folder-summary-font-size, inherit);font-weight:var(--tjs-folder-summary-font-weight, bold);font-family:var(--tjs-folder-summary-font-family, inherit);gap:var(--tjs-folder-summary-gap, 0.125em);list-style:none;margin:var(--tjs-folder-summary-margin, 0);padding:var(--tjs-folder-summary-padding, 0.25em) 0;transition:var(--tjs-folder-summary-transition, background 0.1s);user-select:none;width:var(--tjs-folder-summary-width, fit-content)}summary.svelte-3pguxo i.svelte-3pguxo{color:var(--tjs-folder-summary-chevron-color, currentColor);cursor:var(--tjs-folder-summary-cursor, pointer);opacity:var(--tjs-folder-summary-chevron-opacity, 1);margin:var(--tjs-folder-summary-chevron-margin, 0 0 0 0.25em);width:var(--tjs-folder-summary-chevron-width, 1.25em);transition:var(--tjs-folder-summary-chevron-transition, opacity 0.2s, transform 0.1s)}summary.svelte-3pguxo.svelte-3pguxo:focus-visible{box-shadow:var(--tjs-folder-summary-box-shadow-focus-visible, var(--tjs-default-box-shadow-focus-visible));outline:var(--tjs-folder-summary-outline-focus-visible, var(--tjs-default-outline-focus-visible, revert));transition:var(--tjs-folder-summary-transition-focus-visible, var(--tjs-default-transition-focus-visible))}summary.svelte-3pguxo:focus-visible .label.svelte-3pguxo{text-shadow:var(--tjs-folder-summary-label-text-shadow-focus-visible, var(--tjs-default-text-shadow-focus-hover, revert))}summary.svelte-3pguxo:focus-visible .tjs-folder-focus-indicator.svelte-3pguxo{background:var(--tjs-folder-summary-focus-indicator-background, var(--tjs-default-focus-indicator-background, white))}summary.svelte-3pguxo:hover i.svelte-3pguxo{opacity:var(--tjs-folder-summary-chevron-opacity-hover, 1)}.tjs-folder-focus-indicator.svelte-3pguxo.svelte-3pguxo{align-self:var(--tjs-folder-summary-focus-indicator-align-self, var(--tjs-default-focus-indicator-align-self, stretch));border:var(--tjs-folder-summary-focus-indicator-border, var(--tjs-default-focus-indicator-border));border-radius:var(--tjs-folder-summary-focus-indicator-border-radius, var(--tjs-default-focus-indicator-border-radius, 0.1em));flex:0 0 var(--tjs-folder-summary-focus-indicator-width, var(--tjs-default-focus-indicator-width, 0.25em));height:var(--tjs-folder-summary-focus-indicator-height, var(--tjs-default-focus-indicator-height));transition:var(--tjs-folder-summary-focus-indicator-transition, var(--tjs-default-focus-indicator-transition))}.default-cursor.svelte-3pguxo.svelte-3pguxo{cursor:default}details[open].svelte-3pguxo>summary.svelte-3pguxo{background:var(--tjs-folder-summary-background-open, var(--tjs-folder-summary-background, inherit))}.contents.svelte-3pguxo.svelte-3pguxo{position:relative;background-blend-mode:var(--tjs-folder-contents-background-blend-mode, initial);background:var(--tjs-folder-contents-background, none);border:var(--tjs-folder-contents-border, none);margin:var(--tjs-folder-contents-margin, 0 0 0 -0.4em);padding:var(--tjs-folder-contents-padding, 0 0 0 calc(var(--tjs-folder-summary-font-size, 1em) * 0.8))}.contents.svelte-3pguxo.svelte-3pguxo::before{content:'';position:absolute;width:0;height:calc(100% + 0.65em);left:0;top:-0.65em}.label.svelte-3pguxo.svelte-3pguxo{overflow:var(--tjs-folder-summary-label-overflow, hidden);text-overflow:var(--tjs-folder-summary-label-text-overflow, ellipsis);white-space:var(--tjs-folder-summary-label-white-space, nowrap);width:var(--tjs-folder-summary-label-width, fit-content)}summary.svelte-3pguxo:focus-visible+.contents.svelte-3pguxo::before{height:100%;top:0}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVEpTSWNvbkZvbGRlci5zdmVsdGUiLCJtYXBwaW5ncyI6IkFBdWNJLG1DQUFBLENBQ0ksV0FBQSxDQUFBLElBQUEsZ0NBQUEsQ0FBQSxPQUFBLENBQTBELENBQzFELFlBQUEsQ0FBQSxJQUFBLGlDQUFBLENBQUEsTUFBQSxDQUNKLENBRUEsbUNBQUEsQ0FDSSxPQUFBLENBQUEsSUFBYSxDQUNiLFFBQUEsQ0FBQSxRQUFrQixDQUNsQixXQUFBLENBQUEsTUFBbUIsQ0FDbkIscUJBQUEsQ0FBQSxJQUFBLDBDQUFBLENBQUEsUUFBQSxDQUErRSxDQUMvRSxVQUFBLENBQUEsSUFBQSwrQkFBQSxDQUFBLEtBQUEsQ0FBc0QsQ0FDdEQsTUFBQSxDQUFBLElBQUEsMkJBQUEsQ0FBQSxLQUFBLENBQThDLENBQzlDLGFBQUEsQ0FBQSxJQUFBLGtDQUFBLENBQUEsRUFBQSxDQUF5RCxDQUN6RCxZQUFBLENBQUEsSUFBQSxpQ0FBQSxDQUFBLFFBQUEsQ0FBNkQsQ0FDN0QsTUFBQSxDQUFBLElBQUEsMkJBQUEsQ0FBQSxRQUFBLENBQWlELENBQ2pELFNBQUEsQ0FBQSxJQUFBLDhCQUFBLENBQUEsUUFBQSxDQUF1RCxDQUN2RCxXQUFBLENBQUEsSUFBQSxnQ0FBQSxDQUFBLEtBQUEsQ0FBd0QsQ0FDeEQsV0FBQSxDQUFBLElBQUEsZ0NBQUEsQ0FBQSxRQUFBLENBQTJELENBQzNELEdBQUEsQ0FBQSxJQUFBLHdCQUFBLENBQUEsUUFBQSxDQUEyQyxDQUMzQyxVQUFBLENBQUEsSUFBZ0IsQ0FDaEIsTUFBQSxDQUFBLElBQUEsMkJBQUEsQ0FBQSxFQUFBLENBQTJDLENBQzNDLE9BQUEsQ0FBQSxJQUFBLDRCQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsQ0FBb0QsQ0FDcEQsVUFBQSxDQUFBLElBQUEsK0JBQUEsQ0FBQSxnQkFBQSxDQUFpRSxDQUNqRSxXQUFBLENBQUEsSUFBaUIsQ0FDakIsS0FBQSxDQUFBLElBQUEsMEJBQUEsQ0FBQSxZQUFBLENBQ0osQ0FFQSxxQkFBQSxDQUFBLGVBQUEsQ0FDSSxLQUFBLENBQUEsSUFBQSxrQ0FBQSxDQUFBLGFBQUEsQ0FBNEQsQ0FDNUQsTUFBQSxDQUFBLElBQUEsMkJBQUEsQ0FBQSxRQUFBLENBQWlELENBQ2pELE9BQUEsQ0FBQSxJQUFBLG9DQUFBLENBQUEsRUFBQSxDQUFxRCxDQUNyRCxNQUFBLENBQUEsSUFBQSxtQ0FBQSxDQUFBLGFBQUEsQ0FBOEQsQ0FDOUQsS0FBQSxDQUFBLElBQUEsa0NBQUEsQ0FBQSxPQUFBLENBQXNELENBQ3RELFVBQUEsQ0FBQSxJQUFBLHVDQUFBLENBQUEsNkJBQUEsQ0FDSixDQUVBLG1DQUFBLGNBQUEsQ0FDSSxVQUFBLENBQUEsSUFBQSw2Q0FBQSxDQUFBLDRDQUFBLENBQTJHLENBQzNHLE9BQUEsQ0FBQSxJQUFBLDBDQUFBLENBQUEsaURBQUEsQ0FBMEcsQ0FDMUcsVUFBQSxDQUFBLElBQUEsNkNBQUEsQ0FBQSw0Q0FBQSxDQUNKLENBRUEscUJBQUEsY0FBQSxDQUFBLG9CQUFBLENBQ0ksV0FBQSxDQUFBLElBQUEsb0RBQUEsQ0FBQSxtREFBQSxDQUNKLENBRUEscUJBQUEsY0FBQSxDQUFBLHlDQUFBLENBQ0ksVUFBQSxDQUFBLElBQUEsK0NBQUEsQ0FBQSxxREFBQSxDQUNKLENBRUEscUJBQUEsTUFBQSxDQUFBLGVBQUEsQ0FDSSxPQUFBLENBQUEsSUFBQSwwQ0FBQSxDQUFBLEVBQUEsQ0FDSixDQUVBLHVEQUFBLENBQ0ksVUFBQSxDQUFBLElBQUEsK0NBQUEsQ0FBQSx1REFBQSxDQUF3SCxDQUN4SCxNQUFBLENBQUEsSUFBQSwyQ0FBQSxDQUFBLDBDQUFBLENBQW1HLENBQ25HLGFBQUEsQ0FBQSxJQUFBLGtEQUFBLENBQUEsd0RBQUEsQ0FBK0gsQ0FDL0gsSUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSwwQ0FBQSxDQUFBLGlEQUFBLENBQTJHLENBQzNHLE1BQUEsQ0FBQSxJQUFBLDJDQUFBLENBQUEsMENBQUEsQ0FBbUcsQ0FDbkcsVUFBQSxDQUFBLElBQUEsK0NBQUEsQ0FBQSw4Q0FBQSxDQUNKLENBRUEsMkNBQUEsQ0FDSSxNQUFBLENBQUEsT0FDSixDQUVBLE9BQUEsQ0FBQSxJQUFBLGVBQUEsQ0FBQSxxQkFBQSxDQUNJLFVBQUEsQ0FBQSxJQUFBLG9DQUFBLENBQUEsOENBQUEsQ0FDSixDQUVBLHFDQUFBLENBQ0ksUUFBQSxDQUFBLFFBQWtCLENBQ2xCLHFCQUFBLENBQUEsSUFBQSwyQ0FBQSxDQUFBLFFBQUEsQ0FBZ0YsQ0FDaEYsVUFBQSxDQUFBLElBQUEsZ0NBQUEsQ0FBQSxLQUFBLENBQXVELENBQ3ZELE1BQUEsQ0FBQSxJQUFBLDRCQUFBLENBQUEsS0FBQSxDQUErQyxDQUMvQyxNQUFBLENBQUEsSUFBQSw0QkFBQSxDQUFBLGFBQUEsQ0FBdUQsQ0FDdkQsT0FBQSxDQUFBLElBQUEsNkJBQUEsQ0FBQSwyREFBQSxDQUNKLENBRUEscUNBQUEsUUFBQSxDQUNJLE9BQUEsQ0FBQSxFQUFXLENBQ1gsUUFBQSxDQUFBLFFBQWtCLENBQ2xCLEtBQUEsQ0FBQSxDQUFRLENBQ1IsTUFBQSxDQUFBLEtBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxNQUFBLENBQTJCLENBQzNCLElBQUEsQ0FBQSxDQUFPLENBQ1AsR0FBQSxDQUFBLE9BQ0osQ0FFQSxrQ0FBQSxDQUNJLFFBQUEsQ0FBQSxJQUFBLG1DQUFBLENBQUEsT0FBQSxDQUEwRCxDQUMxRCxhQUFBLENBQUEsSUFBQSx3Q0FBQSxDQUFBLFNBQUEsQ0FBc0UsQ0FDdEUsV0FBQSxDQUFBLElBQUEsc0NBQUEsQ0FBQSxPQUFBLENBQWdFLENBQ2hFLEtBQUEsQ0FBQSxJQUFBLGdDQUFBLENBQUEsWUFBQSxDQUNKLENBRUEscUJBQUEsY0FBQSxDQUFBLHVCQUFBLFFBQUEsQ0FDSSxNQUFBLENBQUEsSUFBWSxDQUNaLEdBQUEsQ0FBQSxDQUNKIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIlRKU0ljb25Gb2xkZXIuc3ZlbHRlIl19 */");
}
var get_summary_end_slot_changes2 = (dirty) => ({});
var get_summary_end_slot_context2 = (ctx) => ({});
var get_label_slot_changes2 = (dirty) => ({});
var get_label_slot_context2 = (ctx) => ({});
function create_if_block_5(ctx) {
  let i;
  let i_class_value;
  const block = {
    c: function create() {
      i = element("i");
      attr_dev(i, "class", i_class_value = null_to_empty(
        /*currentIcon*/
        ctx[11]
      ) + " svelte-3pguxo");
      add_location(i, file8, 422, 25, 16311);
    },
    m: function mount(target, anchor) {
      insert_dev(target, i, anchor);
      ctx[36](i);
    },
    p: function update(ctx2, dirty) {
      if (dirty[0] & /*currentIcon*/
      2048 && i_class_value !== (i_class_value = null_to_empty(
        /*currentIcon*/
        ctx2[11]
      ) + " svelte-3pguxo")) {
        attr_dev(i, "class", i_class_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(i);
      ctx[36](null);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_5.name,
    type: "if",
    source: "(423:8) {#if currentIcon}",
    ctx
  });
  return block;
}
function create_if_block_42(ctx) {
  let div;
  const block = {
    c: function create() {
      div = element("div");
      attr_dev(div, "class", "tjs-folder-focus-indicator svelte-3pguxo");
      add_location(div, file8, 425, 12, 16418);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_42.name,
    type: "if",
    source: "(425:8) {#if localOptions.focusIndicator}",
    ctx
  });
  return block;
}
function create_else_block4(ctx) {
  let div;
  let t_value = localize(
    /*label*/
    ctx[1]
  ) + "";
  let t;
  const block = {
    c: function create() {
      div = element("div");
      t = text(t_value);
      attr_dev(div, "class", "label svelte-3pguxo");
      add_location(div, file8, 432, 16, 16737);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, t);
      ctx[37](div);
    },
    p: function update(ctx2, dirty) {
      if (dirty[0] & /*label*/
      2 && t_value !== (t_value = localize(
        /*label*/
        ctx2[1]
      ) + ""))
        set_data_dev(t, t_value);
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div);
      ctx[37](null);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_else_block4.name,
    type: "else",
    source: "(432:12) {:else}",
    ctx
  });
  return block;
}
function create_if_block_32(ctx) {
  var _a, _b;
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    isObject(
      /*folder*/
      (_b = (_a = ctx[5]) == null ? void 0 : _a.slotLabel) == null ? void 0 : _b.props
    ) ? (
      /*folder*/
      ctx[5].slotLabel.props
    ) : {}
  ];
  var switch_value = (
    /*folder*/
    ctx[5].slotLabel.class
  );
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return {
      props: switch_instance_props,
      $$inline: true
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
  }
  const block = {
    c: function create() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      var _a2, _b2;
      const switch_instance_changes = dirty[0] & /*folder*/
      32 ? get_spread_update(switch_instance_spread_levels, [
        get_spread_object(isObject(
          /*folder*/
          (_b2 = (_a2 = ctx2[5]) == null ? void 0 : _a2.slotLabel) == null ? void 0 : _b2.props
        ) ? (
          /*folder*/
          ctx2[5].slotLabel.props
        ) : {})
      ]) : {};
      if (dirty[0] & /*folder*/
      32 && switch_value !== (switch_value = /*folder*/
      ctx2[5].slotLabel.class)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_32.name,
    type: "if",
    source: "(430:12) {#if isSvelteComponent(folder?.slotLabel?.class)}",
    ctx
  });
  return block;
}
function fallback_block_22(ctx) {
  let show_if;
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block_32, create_else_block4];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    var _a, _b;
    if (dirty[0] & /*folder*/
    32)
      show_if = null;
    if (show_if == null)
      show_if = !!isSvelteComponent(
        /*folder*/
        (_b = (_a = ctx2[5]) == null ? void 0 : _a.slotLabel) == null ? void 0 : _b.class
      );
    if (show_if)
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx, [-1, -1]);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  const block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2, dirty);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: fallback_block_22.name,
    type: "fallback",
    source: "(429:25)              ",
    ctx
  });
  return block;
}
function create_if_block_22(ctx) {
  var _a, _b;
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    isObject(
      /*folder*/
      (_b = (_a = ctx[5]) == null ? void 0 : _a.slotSummaryEnd) == null ? void 0 : _b.props
    ) ? (
      /*folder*/
      ctx[5].slotSummaryEnd.props
    ) : {}
  ];
  var switch_value = (
    /*folder*/
    ctx[5].slotSummaryEnd.class
  );
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return {
      props: switch_instance_props,
      $$inline: true
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
  }
  const block = {
    c: function create() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      var _a2, _b2;
      const switch_instance_changes = dirty[0] & /*folder*/
      32 ? get_spread_update(switch_instance_spread_levels, [
        get_spread_object(isObject(
          /*folder*/
          (_b2 = (_a2 = ctx2[5]) == null ? void 0 : _a2.slotSummaryEnd) == null ? void 0 : _b2.props
        ) ? (
          /*folder*/
          ctx2[5].slotSummaryEnd.props
        ) : {})
      ]) : {};
      if (dirty[0] & /*folder*/
      32 && switch_value !== (switch_value = /*folder*/
      ctx2[5].slotSummaryEnd.class)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_22.name,
    type: "if",
    source: "(438:12) {#if isSvelteComponent(folder?.slotSummaryEnd?.class)}",
    ctx
  });
  return block;
}
function fallback_block_12(ctx) {
  var _a, _b;
  let show_if = isSvelteComponent(
    /*folder*/
    (_b = (_a = ctx[5]) == null ? void 0 : _a.slotSummaryEnd) == null ? void 0 : _b.class
  );
  let if_block_anchor;
  let current;
  let if_block = show_if && create_if_block_22(ctx);
  const block = {
    c: function create() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      var _a2, _b2;
      if (dirty[0] & /*folder*/
      32)
        show_if = isSvelteComponent(
          /*folder*/
          (_b2 = (_a2 = ctx2[5]) == null ? void 0 : _a2.slotSummaryEnd) == null ? void 0 : _b2.class
        );
      if (show_if) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & /*folder*/
          32) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_22(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: fallback_block_12.name,
    type: "fallback",
    source: "(437:33)              ",
    ctx
  });
  return block;
}
function create_if_block7(ctx) {
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[28].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[27],
    null
  );
  const default_slot_or_fallback = default_slot || fallback_block3(ctx);
  const block = {
    c: function create() {
      if (default_slot_or_fallback)
        default_slot_or_fallback.c();
    },
    m: function mount(target, anchor) {
      if (default_slot_or_fallback) {
        default_slot_or_fallback.m(target, anchor);
      }
      current = true;
    },
    p: function update(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty[0] & /*$$scope*/
        134217728)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[27],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[27]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[27],
              dirty,
              null
            ),
            null
          );
        }
      } else {
        if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty[0] & /*folder*/
        32)) {
          default_slot_or_fallback.p(ctx2, !current ? [-1, -1] : dirty);
        }
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(default_slot_or_fallback, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot_or_fallback, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (default_slot_or_fallback)
        default_slot_or_fallback.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block7.name,
    type: "if",
    source: "(445:8) {#if visible}",
    ctx
  });
  return block;
}
function create_if_block_15(ctx) {
  var _a, _b;
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    isObject(
      /*folder*/
      (_b = (_a = ctx[5]) == null ? void 0 : _a.slotDefault) == null ? void 0 : _b.props
    ) ? (
      /*folder*/
      ctx[5].slotDefault.props
    ) : {}
  ];
  var switch_value = (
    /*folder*/
    ctx[5].slotDefault.class
  );
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return {
      props: switch_instance_props,
      $$inline: true
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
  }
  const block = {
    c: function create() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      var _a2, _b2;
      const switch_instance_changes = dirty[0] & /*folder*/
      32 ? get_spread_update(switch_instance_spread_levels, [
        get_spread_object(isObject(
          /*folder*/
          (_b2 = (_a2 = ctx2[5]) == null ? void 0 : _a2.slotDefault) == null ? void 0 : _b2.props
        ) ? (
          /*folder*/
          ctx2[5].slotDefault.props
        ) : {})
      ]) : {};
      if (dirty[0] & /*folder*/
      32 && switch_value !== (switch_value = /*folder*/
      ctx2[5].slotDefault.class)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_15.name,
    type: "if",
    source: "(447:16) {#if isSvelteComponent(folder?.slotDefault?.class)}",
    ctx
  });
  return block;
}
function fallback_block3(ctx) {
  var _a, _b;
  let show_if = isSvelteComponent(
    /*folder*/
    (_b = (_a = ctx[5]) == null ? void 0 : _a.slotDefault) == null ? void 0 : _b.class
  );
  let if_block_anchor;
  let current;
  let if_block = show_if && create_if_block_15(ctx);
  const block = {
    c: function create() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      var _a2, _b2;
      if (dirty[0] & /*folder*/
      32)
        show_if = isSvelteComponent(
          /*folder*/
          (_b2 = (_a2 = ctx2[5]) == null ? void 0 : _a2.slotDefault) == null ? void 0 : _b2.class
        );
      if (show_if) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & /*folder*/
          32) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_15(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: fallback_block3.name,
    type: "fallback",
    source: "(446:18)                  ",
    ctx
  });
  return block;
}
function create_fragment8(ctx) {
  let details;
  let summary;
  let t0;
  let t1;
  let t2;
  let t3;
  let div;
  let toggleDetails_action;
  let applyStyles_action;
  let current;
  let mounted;
  let dispose;
  let if_block0 = (
    /*currentIcon*/
    ctx[11] && create_if_block_5(ctx)
  );
  let if_block1 = (
    /*localOptions*/
    ctx[7].focusIndicator && create_if_block_42(ctx)
  );
  const label_slot_template = (
    /*#slots*/
    ctx[28].label
  );
  const label_slot = create_slot(
    label_slot_template,
    ctx,
    /*$$scope*/
    ctx[27],
    get_label_slot_context2
  );
  const label_slot_or_fallback = label_slot || fallback_block_22(ctx);
  const summary_end_slot_template = (
    /*#slots*/
    ctx[28]["summary-end"]
  );
  const summary_end_slot = create_slot(
    summary_end_slot_template,
    ctx,
    /*$$scope*/
    ctx[27],
    get_summary_end_slot_context2
  );
  const summary_end_slot_or_fallback = summary_end_slot || fallback_block_12(ctx);
  let if_block2 = (
    /*visible*/
    ctx[12] && create_if_block7(ctx)
  );
  const block = {
    c: function create() {
      details = element("details");
      summary = element("summary");
      if (if_block0)
        if_block0.c();
      t0 = space();
      if (if_block1)
        if_block1.c();
      t1 = space();
      if (label_slot_or_fallback)
        label_slot_or_fallback.c();
      t2 = space();
      if (summary_end_slot_or_fallback)
        summary_end_slot_or_fallback.c();
      t3 = space();
      div = element("div");
      if (if_block2)
        if_block2.c();
      attr_dev(summary, "class", "svelte-3pguxo");
      toggle_class(
        summary,
        "default-cursor",
        /*localOptions*/
        ctx[7].chevronOnly
      );
      add_location(summary, file8, 416, 4, 16018);
      attr_dev(div, "class", "contents svelte-3pguxo");
      add_location(div, file8, 443, 4, 17142);
      attr_dev(details, "class", "tjs-icon-folder svelte-3pguxo");
      attr_dev(
        details,
        "data-id",
        /*id*/
        ctx[0]
      );
      attr_dev(
        details,
        "data-label",
        /*label*/
        ctx[1]
      );
      attr_dev(details, "data-closing", "false");
      add_location(details, file8, 395, 0, 15509);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, details, anchor);
      append_dev(details, summary);
      if (if_block0)
        if_block0.m(summary, null);
      append_dev(summary, t0);
      if (if_block1)
        if_block1.m(summary, null);
      append_dev(summary, t1);
      if (label_slot_or_fallback) {
        label_slot_or_fallback.m(summary, null);
      }
      append_dev(summary, t2);
      if (summary_end_slot_or_fallback) {
        summary_end_slot_or_fallback.m(summary, null);
      }
      ctx[38](summary);
      append_dev(details, t3);
      append_dev(details, div);
      if (if_block2)
        if_block2.m(div, null);
      ctx[39](details);
      current = true;
      if (!mounted) {
        dispose = [
          listen_dev(
            summary,
            "click",
            /*onClickSummary*/
            ctx[13],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            summary,
            "contextmenu",
            function() {
              if (is_function(
                /*onContextMenu*/
                ctx[4]
              ))
                ctx[4].apply(this, arguments);
            },
            false,
            false,
            false,
            false
          ),
          listen_dev(
            summary,
            "keydown",
            /*onKeyDown*/
            ctx[14],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            summary,
            "keyup",
            /*onKeyUp*/
            ctx[15],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            details,
            "close",
            /*onLocalClose*/
            ctx[16],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            details,
            "closeAny",
            /*onLocalClose*/
            ctx[16],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            details,
            "open",
            /*onLocalOpen*/
            ctx[17],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            details,
            "openAny",
            /*onLocalOpen*/
            ctx[17],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            details,
            "click",
            /*click_handler*/
            ctx[29],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            details,
            "keydown",
            /*keydown_handler*/
            ctx[30],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            details,
            "keyup",
            /*keyup_handler*/
            ctx[31],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            details,
            "open",
            /*open_handler*/
            ctx[32],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            details,
            "close",
            /*close_handler*/
            ctx[33],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            details,
            "openAny",
            /*openAny_handler*/
            ctx[34],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            details,
            "closeAny",
            /*closeAny_handler*/
            ctx[35],
            false,
            false,
            false,
            false
          ),
          action_destroyer(toggleDetails_action = toggleDetails.call(null, details, {
            store: (
              /*store*/
              ctx[2]
            ),
            clickActive: false
          })),
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            details,
            /*styles*/
            ctx[3]
          ))
        ];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      if (
        /*currentIcon*/
        ctx[11]
      ) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_5(ctx);
          if_block0.c();
          if_block0.m(summary, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (
        /*localOptions*/
        ctx[7].focusIndicator
      ) {
        if (if_block1) {
        } else {
          if_block1 = create_if_block_42(ctx);
          if_block1.c();
          if_block1.m(summary, t1);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (label_slot) {
        if (label_slot.p && (!current || dirty[0] & /*$$scope*/
        134217728)) {
          update_slot_base(
            label_slot,
            label_slot_template,
            ctx,
            /*$$scope*/
            ctx[27],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx[27]
            ) : get_slot_changes(
              label_slot_template,
              /*$$scope*/
              ctx[27],
              dirty,
              get_label_slot_changes2
            ),
            get_label_slot_context2
          );
        }
      } else {
        if (label_slot_or_fallback && label_slot_or_fallback.p && (!current || dirty[0] & /*folder, labelEl, label*/
        546)) {
          label_slot_or_fallback.p(ctx, !current ? [-1, -1] : dirty);
        }
      }
      if (summary_end_slot) {
        if (summary_end_slot.p && (!current || dirty[0] & /*$$scope*/
        134217728)) {
          update_slot_base(
            summary_end_slot,
            summary_end_slot_template,
            ctx,
            /*$$scope*/
            ctx[27],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx[27]
            ) : get_slot_changes(
              summary_end_slot_template,
              /*$$scope*/
              ctx[27],
              dirty,
              get_summary_end_slot_changes2
            ),
            get_summary_end_slot_context2
          );
        }
      } else {
        if (summary_end_slot_or_fallback && summary_end_slot_or_fallback.p && (!current || dirty[0] & /*folder*/
        32)) {
          summary_end_slot_or_fallback.p(ctx, !current ? [-1, -1] : dirty);
        }
      }
      if (!current || dirty[0] & /*localOptions*/
      128) {
        toggle_class(
          summary,
          "default-cursor",
          /*localOptions*/
          ctx[7].chevronOnly
        );
      }
      if (
        /*visible*/
        ctx[12]
      ) {
        if (if_block2) {
          if_block2.p(ctx, dirty);
          if (dirty[0] & /*visible*/
          4096) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block7(ctx);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(div, null);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }
      if (!current || dirty[0] & /*id*/
      1) {
        attr_dev(
          details,
          "data-id",
          /*id*/
          ctx[0]
        );
      }
      if (!current || dirty[0] & /*label*/
      2) {
        attr_dev(
          details,
          "data-label",
          /*label*/
          ctx[1]
        );
      }
      if (toggleDetails_action && is_function(toggleDetails_action.update) && dirty[0] & /*store*/
      4)
        toggleDetails_action.update.call(null, {
          store: (
            /*store*/
            ctx[2]
          ),
          clickActive: false
        });
      if (applyStyles_action && is_function(applyStyles_action.update) && dirty[0] & /*styles*/
      8)
        applyStyles_action.update.call(
          null,
          /*styles*/
          ctx[3]
        );
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(label_slot_or_fallback, local);
      transition_in(summary_end_slot_or_fallback, local);
      transition_in(if_block2);
      current = true;
    },
    o: function outro(local) {
      transition_out(label_slot_or_fallback, local);
      transition_out(summary_end_slot_or_fallback, local);
      transition_out(if_block2);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(details);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      if (label_slot_or_fallback)
        label_slot_or_fallback.d(detaching);
      if (summary_end_slot_or_fallback)
        summary_end_slot_or_fallback.d(detaching);
      ctx[38](null);
      if (if_block2)
        if_block2.d();
      ctx[39](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment8.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance8($$self, $$props, $$invalidate) {
  let $store, $$unsubscribe_store = noop, $$subscribe_store = () => ($$unsubscribe_store(), $$unsubscribe_store = subscribe(store, ($$value) => $$invalidate(26, $store = $$value)), store);
  $$self.$$.on_destroy.push(() => $$unsubscribe_store());
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TJSIconFolder", slots, ["label", "summary-end", "default"]);
  let { folder = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { iconOpen = void 0 } = $$props;
  let { iconClosed = void 0 } = $$props;
  let { label = void 0 } = $$props;
  let { keyCode = void 0 } = $$props;
  let { options = void 0 } = $$props;
  let { store = void 0 } = $$props;
  validate_store(store, "store");
  $$subscribe_store();
  let { styles = void 0 } = $$props;
  let { onClose = void 0 } = $$props;
  let { onOpen = void 0 } = $$props;
  let { onContextMenu = void 0 } = $$props;
  const localOptions = {
    chevronOnly: false,
    focusIndicator: false
  };
  let detailsEl, iconEl, labelEl, summaryEl;
  let storeUnsubscribe;
  let currentIcon;
  let visible = $store;
  let timeoutId;
  onDestroy(() => storeUnsubscribe());
  function createEvent(type, bubbles = false) {
    return new CustomEvent(
      type,
      {
        detail: {
          element: detailsEl,
          folder,
          id,
          label,
          store
        },
        bubbles
      }
    );
  }
  function handleOpenClose(event, fromKeyboard = false) {
    const target = event.target;
    if (target === summaryEl || target === labelEl || target === iconEl || target.querySelector(".summary-click") !== null) {
      if (!fromKeyboard && localOptions.chevronOnly && target !== iconEl) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      set_store_value(store, $store = !$store, $store);
      if ($store && typeof onOpen === "function") {
        onOpen();
      } else if (typeof onClose === "function") {
        onClose();
      }
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (target.classList.contains("no-summary-click") || target.querySelector(".no-summary-click") !== null || target.parentElement && target.parentElement.classList.contains("no-summary-click")) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }
  function onClickSummary(event) {
    if (document.activeElement === summaryEl && ((event == null ? void 0 : event.pointerId) === -1 || (event == null ? void 0 : event.mozInputSource) === 6)) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    handleOpenClose(event);
  }
  function onKeyDown(event) {
    if (document.activeElement === summaryEl && event.code === keyCode) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  function onKeyUp(event) {
    if (document.activeElement === summaryEl && event.code === keyCode) {
      handleOpenClose(event, true);
      event.preventDefault();
      event.stopPropagation();
    }
  }
  function onLocalClose(event) {
    event.preventDefault();
    event.stopPropagation();
    store.set(false);
  }
  function onLocalOpen(event) {
    event.preventDefault();
    event.stopPropagation();
    store.set(true);
  }
  const writable_props = [
    "folder",
    "id",
    "iconOpen",
    "iconClosed",
    "label",
    "keyCode",
    "options",
    "store",
    "styles",
    "onClose",
    "onOpen",
    "onContextMenu"
  ];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<TJSIconFolder> was created with unknown prop '${key}'`);
  });
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function open_handler(event) {
    bubble.call(this, $$self, event);
  }
  function close_handler(event) {
    bubble.call(this, $$self, event);
  }
  function openAny_handler(event) {
    bubble.call(this, $$self, event);
  }
  function closeAny_handler(event) {
    bubble.call(this, $$self, event);
  }
  function i_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      iconEl = $$value;
      $$invalidate(8, iconEl);
    });
  }
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      labelEl = $$value;
      $$invalidate(9, labelEl);
    });
  }
  function summary_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      summaryEl = $$value;
      $$invalidate(10, summaryEl);
    });
  }
  function details_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      detailsEl = $$value;
      $$invalidate(6, detailsEl);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("folder" in $$props2)
      $$invalidate(5, folder = $$props2.folder);
    if ("id" in $$props2)
      $$invalidate(0, id = $$props2.id);
    if ("iconOpen" in $$props2)
      $$invalidate(18, iconOpen = $$props2.iconOpen);
    if ("iconClosed" in $$props2)
      $$invalidate(19, iconClosed = $$props2.iconClosed);
    if ("label" in $$props2)
      $$invalidate(1, label = $$props2.label);
    if ("keyCode" in $$props2)
      $$invalidate(20, keyCode = $$props2.keyCode);
    if ("options" in $$props2)
      $$invalidate(21, options = $$props2.options);
    if ("store" in $$props2)
      $$subscribe_store($$invalidate(2, store = $$props2.store));
    if ("styles" in $$props2)
      $$invalidate(3, styles = $$props2.styles);
    if ("onClose" in $$props2)
      $$invalidate(22, onClose = $$props2.onClose);
    if ("onOpen" in $$props2)
      $$invalidate(23, onOpen = $$props2.onOpen);
    if ("onContextMenu" in $$props2)
      $$invalidate(4, onContextMenu = $$props2.onContextMenu);
    if ("$$scope" in $$props2)
      $$invalidate(27, $$scope = $$props2.$$scope);
  };
  $$self.$capture_state = () => ({
    onDestroy,
    writable,
    applyStyles,
    isWritableStore,
    subscribeIgnoreFirst,
    isObject,
    isSvelteComponent,
    localize,
    toggleDetails,
    folder,
    id,
    iconOpen,
    iconClosed,
    label,
    keyCode,
    options,
    store,
    styles,
    onClose,
    onOpen,
    onContextMenu,
    localOptions,
    detailsEl,
    iconEl,
    labelEl,
    summaryEl,
    storeUnsubscribe,
    currentIcon,
    visible,
    timeoutId,
    createEvent,
    handleOpenClose,
    onClickSummary,
    onKeyDown,
    onKeyUp,
    onLocalClose,
    onLocalOpen,
    $store
  });
  $$self.$inject_state = ($$props2) => {
    if ("folder" in $$props2)
      $$invalidate(5, folder = $$props2.folder);
    if ("id" in $$props2)
      $$invalidate(0, id = $$props2.id);
    if ("iconOpen" in $$props2)
      $$invalidate(18, iconOpen = $$props2.iconOpen);
    if ("iconClosed" in $$props2)
      $$invalidate(19, iconClosed = $$props2.iconClosed);
    if ("label" in $$props2)
      $$invalidate(1, label = $$props2.label);
    if ("keyCode" in $$props2)
      $$invalidate(20, keyCode = $$props2.keyCode);
    if ("options" in $$props2)
      $$invalidate(21, options = $$props2.options);
    if ("store" in $$props2)
      $$subscribe_store($$invalidate(2, store = $$props2.store));
    if ("styles" in $$props2)
      $$invalidate(3, styles = $$props2.styles);
    if ("onClose" in $$props2)
      $$invalidate(22, onClose = $$props2.onClose);
    if ("onOpen" in $$props2)
      $$invalidate(23, onOpen = $$props2.onOpen);
    if ("onContextMenu" in $$props2)
      $$invalidate(4, onContextMenu = $$props2.onContextMenu);
    if ("detailsEl" in $$props2)
      $$invalidate(6, detailsEl = $$props2.detailsEl);
    if ("iconEl" in $$props2)
      $$invalidate(8, iconEl = $$props2.iconEl);
    if ("labelEl" in $$props2)
      $$invalidate(9, labelEl = $$props2.labelEl);
    if ("summaryEl" in $$props2)
      $$invalidate(10, summaryEl = $$props2.summaryEl);
    if ("storeUnsubscribe" in $$props2)
      $$invalidate(24, storeUnsubscribe = $$props2.storeUnsubscribe);
    if ("currentIcon" in $$props2)
      $$invalidate(11, currentIcon = $$props2.currentIcon);
    if ("visible" in $$props2)
      $$invalidate(12, visible = $$props2.visible);
    if ("timeoutId" in $$props2)
      $$invalidate(25, timeoutId = $$props2.timeoutId);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*folder, id*/
    33) {
      $:
        $$invalidate(0, id = isObject(folder) && typeof folder.id === "string" ? folder.id : typeof id === "string" ? id : void 0);
    }
    if ($$self.$$.dirty[0] & /*folder, iconOpen*/
    262176) {
      $:
        $$invalidate(18, iconOpen = isObject(folder) && typeof folder.iconOpen === "string" ? folder.iconOpen : typeof iconOpen === "string" ? iconOpen : void 0);
    }
    if ($$self.$$.dirty[0] & /*folder, iconClosed*/
    524320) {
      $:
        $$invalidate(19, iconClosed = isObject(folder) && typeof folder.iconClosed === "string" ? folder.iconClosed : typeof iconClosed === "string" ? iconClosed : void 0);
    }
    if ($$self.$$.dirty[0] & /*folder, label*/
    34) {
      $:
        $$invalidate(1, label = isObject(folder) && typeof folder.label === "string" ? folder.label : typeof label === "string" ? label : "");
    }
    if ($$self.$$.dirty[0] & /*folder, keyCode*/
    1048608) {
      $:
        $$invalidate(20, keyCode = isObject(folder) && typeof folder.keyCode === "string" ? folder.keyCode : typeof keyCode === "string" ? keyCode : "Enter");
    }
    if ($$self.$$.dirty[0] & /*folder, options*/
    2097184) {
      $: {
        $$invalidate(21, options = isObject(folder) && isObject(folder.options) ? folder.options : isObject(options) ? options : {});
        if (typeof (options == null ? void 0 : options.chevronOnly) === "boolean") {
          $$invalidate(7, localOptions.chevronOnly = options.chevronOnly, localOptions);
        }
        if (typeof (options == null ? void 0 : options.focusIndicator) === "boolean") {
          $$invalidate(7, localOptions.focusIndicator = options.focusIndicator, localOptions);
        }
      }
    }
    if ($$self.$$.dirty[0] & /*folder, store, storeUnsubscribe, detailsEl*/
    16777316) {
      $: {
        $$subscribe_store($$invalidate(2, store = isObject(folder) && isWritableStore(folder.store) ? folder.store : isWritableStore(store) ? store : writable(false)));
        if (typeof storeUnsubscribe === "function") {
          storeUnsubscribe();
        }
        $$invalidate(24, storeUnsubscribe = subscribeIgnoreFirst(store, (value) => {
          if (detailsEl) {
            detailsEl.dispatchEvent(createEvent(value ? "open" : "close"));
            detailsEl.dispatchEvent(createEvent(value ? "openAny" : "closeAny", true));
          }
        }));
      }
    }
    if ($$self.$$.dirty[0] & /*folder, styles*/
    40) {
      $:
        $$invalidate(3, styles = isObject(folder) && isObject(folder.styles) ? folder.styles : isObject(styles) ? styles : void 0);
    }
    if ($$self.$$.dirty[0] & /*folder, onClose*/
    4194336) {
      $:
        $$invalidate(22, onClose = isObject(folder) && typeof folder.onClose === "function" ? folder.onClose : typeof onClose === "function" ? onClose : void 0);
    }
    if ($$self.$$.dirty[0] & /*folder, onOpen*/
    8388640) {
      $:
        $$invalidate(23, onOpen = isObject(folder) && typeof folder.onOpen === "function" ? folder.onOpen : typeof onOpen === "function" ? onOpen : void 0);
    }
    if ($$self.$$.dirty[0] & /*folder, onContextMenu*/
    48) {
      $:
        $$invalidate(4, onContextMenu = isObject(folder) && typeof folder.onContextMenu === "function" ? folder.onContextMenu : typeof onContextMenu === "function" ? onContextMenu : () => null);
    }
    if ($$self.$$.dirty[0] & /*$store, iconOpen, iconClosed*/
    67895296) {
      $: {
        const iconData = $store ? iconOpen : iconClosed;
        $$invalidate(11, currentIcon = typeof iconData !== "string" ? void 0 : iconData);
      }
    }
    if ($$self.$$.dirty[0] & /*$store, timeoutId*/
    100663296) {
      $:
        if (!$store) {
          $$invalidate(25, timeoutId = setTimeout(() => $$invalidate(12, visible = false), 500));
        } else {
          clearTimeout(timeoutId);
          $$invalidate(12, visible = true);
        }
    }
  };
  return [
    id,
    label,
    store,
    styles,
    onContextMenu,
    folder,
    detailsEl,
    localOptions,
    iconEl,
    labelEl,
    summaryEl,
    currentIcon,
    visible,
    onClickSummary,
    onKeyDown,
    onKeyUp,
    onLocalClose,
    onLocalOpen,
    iconOpen,
    iconClosed,
    keyCode,
    options,
    onClose,
    onOpen,
    storeUnsubscribe,
    timeoutId,
    $store,
    $$scope,
    slots,
    click_handler,
    keydown_handler,
    keyup_handler,
    open_handler,
    close_handler,
    openAny_handler,
    closeAny_handler,
    i_binding,
    div_binding,
    summary_binding,
    details_binding
  ];
}
var TJSIconFolder = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(
      this,
      options,
      instance8,
      create_fragment8,
      safe_not_equal,
      {
        folder: 5,
        id: 0,
        iconOpen: 18,
        iconClosed: 19,
        label: 1,
        keyCode: 20,
        options: 21,
        store: 2,
        styles: 3,
        onClose: 22,
        onOpen: 23,
        onContextMenu: 4
      },
      add_css8,
      [-1, -1]
    );
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TJSIconFolder",
      options,
      id: create_fragment8.name
    });
  }
  get folder() {
    throw new Error("<TJSIconFolder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set folder(value) {
    throw new Error("<TJSIconFolder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get id() {
    throw new Error("<TJSIconFolder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set id(value) {
    throw new Error("<TJSIconFolder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get iconOpen() {
    throw new Error("<TJSIconFolder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set iconOpen(value) {
    throw new Error("<TJSIconFolder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get iconClosed() {
    throw new Error("<TJSIconFolder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set iconClosed(value) {
    throw new Error("<TJSIconFolder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get label() {
    throw new Error("<TJSIconFolder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set label(value) {
    throw new Error("<TJSIconFolder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get keyCode() {
    throw new Error("<TJSIconFolder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set keyCode(value) {
    throw new Error("<TJSIconFolder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get options() {
    throw new Error("<TJSIconFolder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set options(value) {
    throw new Error("<TJSIconFolder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get store() {
    throw new Error("<TJSIconFolder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set store(value) {
    throw new Error("<TJSIconFolder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get styles() {
    throw new Error("<TJSIconFolder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set styles(value) {
    throw new Error("<TJSIconFolder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get onClose() {
    throw new Error("<TJSIconFolder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set onClose(value) {
    throw new Error("<TJSIconFolder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get onOpen() {
    throw new Error("<TJSIconFolder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set onOpen(value) {
    throw new Error("<TJSIconFolder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get onContextMenu() {
    throw new Error("<TJSIconFolder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set onContextMenu(value) {
    throw new Error("<TJSIconFolder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var TJSIconFolder_default = TJSIconFolder;

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/form/input/TJSInputNumber.svelte
var file9 = "node_modules\\@typhonjs-fvtt\\svelte-standard\\_dist\\component\\standard\\form\\input\\TJSInputNumber.svelte";
function add_css9(target) {
  append_styles(target, "svelte-e47mk3", ".tjs-input-container.svelte-e47mk3{display:block;pointer-events:none;overflow:var(--tjs-input-number-overflow, var(--tjs-input-overflow, hidden));transform-style:preserve-3d;background:var(--tjs-input-number-background, var(--tjs-input-background));border-radius:var(--tjs-input-number-border-radius, var(--tjs-input-border-radius));flex:var(--tjs-input-number-flex, var(--tjs-input-flex));margin:var(--tjs-input-number-margin, var(--tjs-input-margin));height:var(--tjs-input-number-height, var(--tjs-input-height));width:var(--tjs-input-number-width, var(--tjs-input-width))}.is-value-invalid.svelte-e47mk3{color:var(--tjs-input-number-value-invalid-color, var(--tjs-input-value-invalid-color, red))}input.svelte-e47mk3{pointer-events:initial;display:inline-block;position:relative;appearance:var(--tjs-input-number-appearance, var(--tjs-input-appearance, inherit));background:transparent;border:var(--tjs-input-number-border, var(--tjs-input-border));border-radius:var(--tjs-input-number-border-radius, var(--tjs-input-border-radius));width:100%;height:100%;padding:var(--tjs-input-number-padding, var(--tjs-input-padding, initial));color:inherit;caret-color:var(--tjs-input-number-caret-color, var(--tjs-input-caret-color));font-family:inherit;font-size:inherit;line-height:inherit;outline-offset:var(--tjs-input-number-outline-offset, var(--tjs-input-outline-offset));text-align:var(--tjs-input-number-text-align, var(--tjs-input-text-align));cursor:var(--tjs-input-number-cursor, var(--tjs-input-cursor, text));transform:translateZ(1px)}input.svelte-e47mk3:focus{box-shadow:var(--tjs-input-number-box-shadow-focus, var(--tjs-input-box-shadow-focus, unset))}input.svelte-e47mk3:focus-visible{box-shadow:var(--tjs-input-number-box-shadow-focus-visible, var(--tjs-input-box-shadow-focus-visible, unset));outline:var(--tjs-input-number-outline-focus-visible, var(--tjs-input-outline-focus-visible));transition:var(--tjs-input-number-transition-focus-visible, var(--tjs-input-transition-focus-visible))}input.svelte-e47mk3::placeholder{color:var(--tjs-input-number-placeholder-color, var(--tjs-input-placeholder-color, inherit))}input.svelte-e47mk3::-webkit-inner-spin-button{opacity:var(--tjs-input-number-webkit-inner-spin-button-opacity, inherit)}input.svelte-e47mk3::-webkit-outer-spin-button{opacity:var(--tjs-input-number-webkit-outer-spin-button-opacity, inherit)}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVEpTSW5wdXROdW1iZXIuc3ZlbHRlIiwibWFwcGluZ3MiOiJBQW9MSSxrQ0FBQSxDQUNJLE9BQUEsQ0FBQSxLQUFjLENBQ2QsY0FBQSxDQUFBLElBQW9CLENBQ3BCLFFBQUEsQ0FBQSxJQUFBLDJCQUFBLENBQUEsa0NBQUEsQ0FBNkUsQ0FDN0UsZUFBQSxDQUFBLFdBQTRCLENBRTVCLFVBQUEsQ0FBQSxJQUFBLDZCQUFBLENBQUEsNEJBQUEsQ0FBMkUsQ0FDM0UsYUFBQSxDQUFBLElBQUEsZ0NBQUEsQ0FBQSwrQkFBQSxDQUFvRixDQUNwRixJQUFBLENBQUEsSUFBQSx1QkFBQSxDQUFBLHNCQUFBLENBQXlELENBQ3pELE1BQUEsQ0FBQSxJQUFBLHlCQUFBLENBQUEsd0JBQUEsQ0FBK0QsQ0FDL0QsTUFBQSxDQUFBLElBQUEseUJBQUEsQ0FBQSx3QkFBQSxDQUErRCxDQUMvRCxLQUFBLENBQUEsSUFBQSx3QkFBQSxDQUFBLHVCQUFBLENBQ0osQ0FFQSwrQkFBQSxDQUNJLEtBQUEsQ0FBQSxJQUFBLHNDQUFBLENBQUEsMENBQUEsQ0FDSixDQUVBLG1CQUFBLENBQ0ksY0FBQSxDQUFBLE9BQXVCLENBQ3ZCLE9BQUEsQ0FBQSxZQUFxQixDQUNyQixRQUFBLENBQUEsUUFBa0IsQ0FFbEIsVUFBQSxDQUFBLElBQUEsNkJBQUEsQ0FBQSxxQ0FBQSxDQUFvRixDQUVwRixVQUFBLENBQUEsV0FBdUIsQ0FFdkIsTUFBQSxDQUFBLElBQUEseUJBQUEsQ0FBQSx3QkFBQSxDQUErRCxDQUMvRCxhQUFBLENBQUEsSUFBQSxnQ0FBQSxDQUFBLCtCQUFBLENBQW9GLENBRXBGLEtBQUEsQ0FBQSxJQUFXLENBQ1gsTUFBQSxDQUFBLElBQVksQ0FFWixPQUFBLENBQUEsSUFBQSwwQkFBQSxDQUFBLGtDQUFBLENBQTJFLENBRTNFLEtBQUEsQ0FBQSxPQUFjLENBQ2QsV0FBQSxDQUFBLElBQUEsOEJBQUEsQ0FBQSw2QkFBQSxDQUE4RSxDQUM5RSxXQUFBLENBQUEsT0FBb0IsQ0FDcEIsU0FBQSxDQUFBLE9BQWtCLENBQ2xCLFdBQUEsQ0FBQSxPQUFvQixDQUNwQixjQUFBLENBQUEsSUFBQSxpQ0FBQSxDQUFBLGdDQUFBLENBQXVGLENBQ3ZGLFVBQUEsQ0FBQSxJQUFBLDZCQUFBLENBQUEsNEJBQUEsQ0FBMkUsQ0FFM0UsTUFBQSxDQUFBLElBQUEseUJBQUEsQ0FBQSw4QkFBQSxDQUFxRSxDQUVyRSxTQUFBLENBQUEsV0FBQSxHQUFBLENBQ0osQ0FFQSxtQkFBQSxNQUFBLENBQ0ksVUFBQSxDQUFBLElBQUEsbUNBQUEsQ0FBQSx5Q0FBQSxDQUNKLENBRUEsbUJBQUEsY0FBQSxDQUNJLFVBQUEsQ0FBQSxJQUFBLDJDQUFBLENBQUEsaURBQUEsQ0FBOEcsQ0FDOUcsT0FBQSxDQUFBLElBQUEsd0NBQUEsQ0FBQSx1Q0FBQSxDQUE4RixDQUM5RixVQUFBLENBQUEsSUFBQSwyQ0FBQSxDQUFBLDBDQUFBLENBQ0osQ0FFQSxtQkFBQSxhQUFBLENBQ0ksS0FBQSxDQUFBLElBQUEsb0NBQUEsQ0FBQSw0Q0FBQSxDQUNKLENBR0EsbUJBQUEsMkJBQUEsQ0FDSSxPQUFBLENBQUEsSUFBQSxtREFBQSxDQUFBLFFBQUEsQ0FDSixDQUVBLG1CQUFBLDJCQUFBLENBQ0ksT0FBQSxDQUFBLElBQUEsbURBQUEsQ0FBQSxRQUFBLENBQ0oiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiVEpTSW5wdXROdW1iZXIuc3ZlbHRlIl19 */");
}
function create_fragment9(ctx) {
  let div;
  let input_1;
  let efx_action;
  let applyStyles_action;
  let mounted;
  let dispose;
  const block = {
    c: function create() {
      div = element("div");
      input_1 = element("input");
      attr_dev(input_1, "class", "tjs-input svelte-e47mk3");
      attr_dev(input_1, "type", "number");
      attr_dev(
        input_1,
        "max",
        /*max*/
        ctx[1]
      );
      attr_dev(
        input_1,
        "min",
        /*min*/
        ctx[2]
      );
      attr_dev(
        input_1,
        "step",
        /*step*/
        ctx[4]
      );
      attr_dev(
        input_1,
        "placeholder",
        /*placeholder*/
        ctx[3]
      );
      input_1.disabled = /*disabled*/
      ctx[0];
      toggle_class(input_1, "is-value-invalid", !/*$storeIsValid*/
      ctx[10]);
      add_location(input_1, file9, 164, 4, 5246);
      attr_dev(div, "class", "tjs-input-container svelte-e47mk3");
      add_location(div, file9, 163, 0, 5177);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, input_1);
      ctx[16](input_1);
      set_input_value(
        input_1,
        /*$store*/
        ctx[11]
      );
      if (!mounted) {
        dispose = [
          listen_dev(
            input_1,
            "input",
            /*input_1_input_handler*/
            ctx[17]
          ),
          listen_dev(
            input_1,
            "focusin",
            /*onFocusIn*/
            ctx[12],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            input_1,
            "keydown",
            /*onKeyDown*/
            ctx[13],
            false,
            false,
            false,
            false
          ),
          action_destroyer(efx_action = /*efx*/
          ctx[8].call(null, div)),
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            div,
            /*styles*/
            ctx[7]
          ))
        ];
        mounted = true;
      }
    },
    p: function update(ctx2, [dirty]) {
      if (dirty & /*max*/
      2) {
        attr_dev(
          input_1,
          "max",
          /*max*/
          ctx2[1]
        );
      }
      if (dirty & /*min*/
      4) {
        attr_dev(
          input_1,
          "min",
          /*min*/
          ctx2[2]
        );
      }
      if (dirty & /*step*/
      16) {
        attr_dev(
          input_1,
          "step",
          /*step*/
          ctx2[4]
        );
      }
      if (dirty & /*placeholder*/
      8) {
        attr_dev(
          input_1,
          "placeholder",
          /*placeholder*/
          ctx2[3]
        );
      }
      if (dirty & /*disabled*/
      1) {
        prop_dev(
          input_1,
          "disabled",
          /*disabled*/
          ctx2[0]
        );
      }
      if (dirty & /*$store*/
      2048 && to_number(input_1.value) !== /*$store*/
      ctx2[11]) {
        set_input_value(
          input_1,
          /*$store*/
          ctx2[11]
        );
      }
      if (dirty & /*$storeIsValid*/
      1024) {
        toggle_class(input_1, "is-value-invalid", !/*$storeIsValid*/
        ctx2[10]);
      }
      if (applyStyles_action && is_function(applyStyles_action.update) && dirty & /*styles*/
      128)
        applyStyles_action.update.call(
          null,
          /*styles*/
          ctx2[7]
        );
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div);
      ctx[16](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment9.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance9($$self, $$props, $$invalidate) {
  let $storeIsValid, $$unsubscribe_storeIsValid = noop, $$subscribe_storeIsValid = () => ($$unsubscribe_storeIsValid(), $$unsubscribe_storeIsValid = subscribe(storeIsValid, ($$value) => $$invalidate(10, $storeIsValid = $$value)), storeIsValid);
  let $store, $$unsubscribe_store = noop, $$subscribe_store = () => ($$unsubscribe_store(), $$unsubscribe_store = subscribe(store, ($$value) => $$invalidate(11, $store = $$value)), store);
  $$self.$$.on_destroy.push(() => $$unsubscribe_storeIsValid());
  $$self.$$.on_destroy.push(() => $$unsubscribe_store());
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TJSInputNumber", slots, []);
  let { input = void 0 } = $$props;
  let { disabled = void 0 } = $$props;
  let { options = void 0 } = $$props;
  let { max = void 0 } = $$props;
  let { min = void 0 } = $$props;
  let { placeholder = void 0 } = $$props;
  let { step = void 0 } = $$props;
  let { store = void 0 } = $$props;
  validate_store(store, "store");
  $$subscribe_store();
  let { storeIsValid = void 0 } = $$props;
  validate_store(storeIsValid, "storeIsValid");
  $$subscribe_storeIsValid();
  let { styles = void 0 } = $$props;
  let { efx = void 0 } = $$props;
  const localOptions = {
    blurOnEnterKey: true,
    cancelOnEscKey: false
  };
  let inputEl;
  let initialValue;
  function onFocusIn() {
    if (localOptions.cancelOnEscKey) {
      initialValue = inputEl.value === "" ? null : globalThis.parseFloat(inputEl.value);
    }
  }
  function onKeyDown(event) {
    if (localOptions.blurOnEnterKey && event.code === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      inputEl.blur();
      return;
    }
    if (event.code === "Escape") {
      if (localOptions.cancelOnEscKey && (initialValue === null || typeof initialValue === "number")) {
        event.preventDefault();
        event.stopPropagation();
        store.set(initialValue);
        initialValue = void 0;
        inputEl.blur();
      }
    }
  }
  const writable_props = [
    "input",
    "disabled",
    "options",
    "max",
    "min",
    "placeholder",
    "step",
    "store",
    "storeIsValid",
    "styles",
    "efx"
  ];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<TJSInputNumber> was created with unknown prop '${key}'`);
  });
  function input_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inputEl = $$value;
      $$invalidate(9, inputEl);
    });
  }
  function input_1_input_handler() {
    $store = to_number(this.value);
    store.set($store);
  }
  $$self.$$set = ($$props2) => {
    if ("input" in $$props2)
      $$invalidate(15, input = $$props2.input);
    if ("disabled" in $$props2)
      $$invalidate(0, disabled = $$props2.disabled);
    if ("options" in $$props2)
      $$invalidate(14, options = $$props2.options);
    if ("max" in $$props2)
      $$invalidate(1, max = $$props2.max);
    if ("min" in $$props2)
      $$invalidate(2, min = $$props2.min);
    if ("placeholder" in $$props2)
      $$invalidate(3, placeholder = $$props2.placeholder);
    if ("step" in $$props2)
      $$invalidate(4, step = $$props2.step);
    if ("store" in $$props2)
      $$subscribe_store($$invalidate(5, store = $$props2.store));
    if ("storeIsValid" in $$props2)
      $$subscribe_storeIsValid($$invalidate(6, storeIsValid = $$props2.storeIsValid));
    if ("styles" in $$props2)
      $$invalidate(7, styles = $$props2.styles);
    if ("efx" in $$props2)
      $$invalidate(8, efx = $$props2.efx);
  };
  $$self.$capture_state = () => ({
    writable,
    applyStyles,
    localize,
    isReadableStore,
    isWritableStore,
    isObject,
    input,
    disabled,
    options,
    max,
    min,
    placeholder,
    step,
    store,
    storeIsValid,
    styles,
    efx,
    localOptions,
    inputEl,
    initialValue,
    onFocusIn,
    onKeyDown,
    $storeIsValid,
    $store
  });
  $$self.$inject_state = ($$props2) => {
    if ("input" in $$props2)
      $$invalidate(15, input = $$props2.input);
    if ("disabled" in $$props2)
      $$invalidate(0, disabled = $$props2.disabled);
    if ("options" in $$props2)
      $$invalidate(14, options = $$props2.options);
    if ("max" in $$props2)
      $$invalidate(1, max = $$props2.max);
    if ("min" in $$props2)
      $$invalidate(2, min = $$props2.min);
    if ("placeholder" in $$props2)
      $$invalidate(3, placeholder = $$props2.placeholder);
    if ("step" in $$props2)
      $$invalidate(4, step = $$props2.step);
    if ("store" in $$props2)
      $$subscribe_store($$invalidate(5, store = $$props2.store));
    if ("storeIsValid" in $$props2)
      $$subscribe_storeIsValid($$invalidate(6, storeIsValid = $$props2.storeIsValid));
    if ("styles" in $$props2)
      $$invalidate(7, styles = $$props2.styles);
    if ("efx" in $$props2)
      $$invalidate(8, efx = $$props2.efx);
    if ("inputEl" in $$props2)
      $$invalidate(9, inputEl = $$props2.inputEl);
    if ("initialValue" in $$props2)
      initialValue = $$props2.initialValue;
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*input, disabled*/
    32769) {
      $:
        $$invalidate(0, disabled = isObject(input) && typeof input.disabled === "boolean" ? input.disabled : typeof disabled === "boolean" ? disabled : false);
    }
    if ($$self.$$.dirty & /*input, options*/
    49152) {
      $: {
        $$invalidate(14, options = isObject(input) && isObject(input.options) ? input.options : isObject(options) ? options : {});
        if (typeof (options == null ? void 0 : options.blurOnEnterKey) === "boolean") {
          localOptions.blurOnEnterKey = options.blurOnEnterKey;
        }
        if (typeof (options == null ? void 0 : options.cancelOnEscKey) === "boolean") {
          localOptions.cancelOnEscKey = options.cancelOnEscKey;
        }
      }
    }
    if ($$self.$$.dirty & /*input, max*/
    32770) {
      $:
        $$invalidate(1, max = isObject(input) && typeof input.max === "number" ? input.max : typeof max === "number" ? max : void 0);
    }
    if ($$self.$$.dirty & /*input, min*/
    32772) {
      $:
        $$invalidate(2, min = isObject(input) && typeof input.min === "number" ? input.min : typeof min === "number" ? min : void 0);
    }
    if ($$self.$$.dirty & /*input, placeholder*/
    32776) {
      $:
        $$invalidate(3, placeholder = isObject(input) && typeof input.placeholder === "string" ? localize(input.placeholder) : typeof placeholder === "string" ? localize(placeholder) : void 0);
    }
    if ($$self.$$.dirty & /*input, step*/
    32784) {
      $:
        $$invalidate(4, step = isObject(input) && typeof input.step === "number" ? input.step : typeof step === "number" ? step : void 0);
    }
    if ($$self.$$.dirty & /*input, store*/
    32800) {
      $:
        $$subscribe_store($$invalidate(5, store = isObject(input) && isWritableStore(input.store) ? input.store : isWritableStore(store) ? store : writable(void 0)));
    }
    if ($$self.$$.dirty & /*input, storeIsValid*/
    32832) {
      $:
        $$subscribe_storeIsValid($$invalidate(6, storeIsValid = isObject(input) && isReadableStore(input.storeIsValid) ? input.storeIsValid : isReadableStore(storeIsValid) ? storeIsValid : writable(true)));
    }
    if ($$self.$$.dirty & /*input, storeIsValid*/
    32832) {
      $:
        $$subscribe_storeIsValid($$invalidate(6, storeIsValid = isObject(input) && isReadableStore(input.storeIsValid) ? input.storeIsValid : isReadableStore(storeIsValid) ? storeIsValid : writable(true)));
    }
    if ($$self.$$.dirty & /*input, styles*/
    32896) {
      $:
        $$invalidate(7, styles = isObject(input) && isObject(input.styles) ? input.styles : typeof styles === "object" ? styles : void 0);
    }
    if ($$self.$$.dirty & /*input, efx*/
    33024) {
      $:
        $$invalidate(8, efx = isObject(input) && typeof input.efx === "function" ? input.efx : typeof efx === "function" ? efx : () => {
        });
    }
  };
  return [
    disabled,
    max,
    min,
    placeholder,
    step,
    store,
    storeIsValid,
    styles,
    efx,
    inputEl,
    $storeIsValid,
    $store,
    onFocusIn,
    onKeyDown,
    options,
    input,
    input_1_binding,
    input_1_input_handler
  ];
}
var TJSInputNumber = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(
      this,
      options,
      instance9,
      create_fragment9,
      safe_not_equal,
      {
        input: 15,
        disabled: 0,
        options: 14,
        max: 1,
        min: 2,
        placeholder: 3,
        step: 4,
        store: 5,
        storeIsValid: 6,
        styles: 7,
        efx: 8
      },
      add_css9
    );
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TJSInputNumber",
      options,
      id: create_fragment9.name
    });
  }
  get input() {
    throw new Error("<TJSInputNumber>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set input(value) {
    throw new Error("<TJSInputNumber>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get disabled() {
    throw new Error("<TJSInputNumber>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set disabled(value) {
    throw new Error("<TJSInputNumber>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get options() {
    throw new Error("<TJSInputNumber>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set options(value) {
    throw new Error("<TJSInputNumber>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get max() {
    throw new Error("<TJSInputNumber>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set max(value) {
    throw new Error("<TJSInputNumber>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get min() {
    throw new Error("<TJSInputNumber>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set min(value) {
    throw new Error("<TJSInputNumber>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get placeholder() {
    throw new Error("<TJSInputNumber>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set placeholder(value) {
    throw new Error("<TJSInputNumber>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get step() {
    throw new Error("<TJSInputNumber>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set step(value) {
    throw new Error("<TJSInputNumber>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get store() {
    throw new Error("<TJSInputNumber>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set store(value) {
    throw new Error("<TJSInputNumber>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get storeIsValid() {
    throw new Error("<TJSInputNumber>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set storeIsValid(value) {
    throw new Error("<TJSInputNumber>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get styles() {
    throw new Error("<TJSInputNumber>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set styles(value) {
    throw new Error("<TJSInputNumber>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get efx() {
    throw new Error("<TJSInputNumber>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set efx(value) {
    throw new Error("<TJSInputNumber>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var TJSInputNumber_default = TJSInputNumber;

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/form/input/TJSInputText.svelte
var { Error: Error_1 } = globals;
var file10 = "node_modules\\@typhonjs-fvtt\\svelte-standard\\_dist\\component\\standard\\form\\input\\TJSInputText.svelte";
function add_css10(target) {
  append_styles(target, "svelte-5gbujq", ".tjs-input-container.svelte-5gbujq{display:block;overflow:var(--tjs-input-text-overflow, var(--tjs-input-overflow, hidden));pointer-events:none;transform-style:preserve-3d;background:var(--tjs-input-text-background, var(--tjs-input-background));border-radius:var(--tjs-input-text-border-radius, var(--tjs-input-border-radius));flex:var(--tjs-input-text-flex, var(--tjs-input-flex));margin:var(--tjs-input-text-margin, var(--tjs-input-margin));height:var(--tjs-input-text-height, var(--tjs-input-height));width:var(--tjs-input-text-width, var(--tjs-input-width))}.is-value-invalid.svelte-5gbujq{color:var(--tjs-input-text-value-invalid-color, var(--tjs-input-value-invalid-color, red))}input.svelte-5gbujq{pointer-events:initial;display:inline-block;position:relative;appearance:var(--tjs-input-text-appearance, var(--tjs-input-appearance, inherit));background:transparent;border:var(--tjs-input-text-border, var(--tjs-input-border));border-radius:var(--tjs-input-text-border-radius, var(--tjs-input-border-radius));width:100%;height:100%;padding:var(--tjs-input-text-padding, var(--tjs-input-padding, initial));color:inherit;caret-color:var(--tjs-input-text-caret-color, var(--tjs-input-caret-color));font-family:inherit;font-size:inherit;line-height:inherit;outline-offset:var(--tjs-input-text-outline-offset, var(--tjs-input-outline-offset));text-align:var(--tjs-input-text-text-align, var(--tjs-input-text-align));cursor:var(--tjs-input-text-cursor, var(--tjs-input-cursor, text));transform:translateZ(1px)}input.svelte-5gbujq:focus{box-shadow:var(--tjs-input-text-box-shadow-focus, var(--tjs-input-box-shadow-focus, unset))}input.svelte-5gbujq:focus-visible{box-shadow:var(--tjs-input-text-box-shadow-focus-visible, var(--tjs-input-box-shadow-focus-visible, unset));outline:var(--tjs-input-text-outline-focus-visible, var(--tjs-input-outline-focus-visible));transition:var(--tjs-input-text-transition-focus-visible, var(--tjs-input-transition-focus-visible))}input.svelte-5gbujq::placeholder{color:var(--tjs-input-text-placeholder-color, var(--tjs-input-placeholder-color, inherit))}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVEpTSW5wdXRUZXh0LnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUEwTEksa0NBQUEsQ0FDSSxPQUFBLENBQUEsS0FBYyxDQUNkLFFBQUEsQ0FBQSxJQUFBLHlCQUFBLENBQUEsa0NBQUEsQ0FBMkUsQ0FDM0UsY0FBQSxDQUFBLElBQW9CLENBQ3BCLGVBQUEsQ0FBQSxXQUE0QixDQUU1QixVQUFBLENBQUEsSUFBQSwyQkFBQSxDQUFBLDRCQUFBLENBQXlFLENBQ3pFLGFBQUEsQ0FBQSxJQUFBLDhCQUFBLENBQUEsK0JBQUEsQ0FBa0YsQ0FDbEYsSUFBQSxDQUFBLElBQUEscUJBQUEsQ0FBQSxzQkFBQSxDQUF1RCxDQUN2RCxNQUFBLENBQUEsSUFBQSx1QkFBQSxDQUFBLHdCQUFBLENBQTZELENBQzdELE1BQUEsQ0FBQSxJQUFBLHVCQUFBLENBQUEsd0JBQUEsQ0FBNkQsQ0FDN0QsS0FBQSxDQUFBLElBQUEsc0JBQUEsQ0FBQSx1QkFBQSxDQUNKLENBRUEsK0JBQUEsQ0FDSSxLQUFBLENBQUEsSUFBQSxvQ0FBQSxDQUFBLDBDQUFBLENBQ0osQ0FFQSxtQkFBQSxDQUNJLGNBQUEsQ0FBQSxPQUF1QixDQUN2QixPQUFBLENBQUEsWUFBcUIsQ0FDckIsUUFBQSxDQUFBLFFBQWtCLENBRWxCLFVBQUEsQ0FBQSxJQUFBLDJCQUFBLENBQUEscUNBQUEsQ0FBa0YsQ0FFbEYsVUFBQSxDQUFBLFdBQXVCLENBRXZCLE1BQUEsQ0FBQSxJQUFBLHVCQUFBLENBQUEsd0JBQUEsQ0FBNkQsQ0FDN0QsYUFBQSxDQUFBLElBQUEsOEJBQUEsQ0FBQSwrQkFBQSxDQUFrRixDQUVsRixLQUFBLENBQUEsSUFBVyxDQUNYLE1BQUEsQ0FBQSxJQUFZLENBRVosT0FBQSxDQUFBLElBQUEsd0JBQUEsQ0FBQSxrQ0FBQSxDQUF5RSxDQUV6RSxLQUFBLENBQUEsT0FBYyxDQUNkLFdBQUEsQ0FBQSxJQUFBLDRCQUFBLENBQUEsNkJBQUEsQ0FBNEUsQ0FDNUUsV0FBQSxDQUFBLE9BQW9CLENBQ3BCLFNBQUEsQ0FBQSxPQUFrQixDQUNsQixXQUFBLENBQUEsT0FBb0IsQ0FDcEIsY0FBQSxDQUFBLElBQUEsK0JBQUEsQ0FBQSxnQ0FBQSxDQUFxRixDQUNyRixVQUFBLENBQUEsSUFBQSwyQkFBQSxDQUFBLDRCQUFBLENBQXlFLENBRXpFLE1BQUEsQ0FBQSxJQUFBLHVCQUFBLENBQUEsOEJBQUEsQ0FBbUUsQ0FFbkUsU0FBQSxDQUFBLFdBQUEsR0FBQSxDQUNKLENBRUEsbUJBQUEsTUFBQSxDQUNJLFVBQUEsQ0FBQSxJQUFBLGlDQUFBLENBQUEseUNBQUEsQ0FDSixDQUVBLG1CQUFBLGNBQUEsQ0FDSSxVQUFBLENBQUEsSUFBQSx5Q0FBQSxDQUFBLGlEQUFBLENBQTRHLENBQzVHLE9BQUEsQ0FBQSxJQUFBLHNDQUFBLENBQUEsdUNBQUEsQ0FBNEYsQ0FDNUYsVUFBQSxDQUFBLElBQUEseUNBQUEsQ0FBQSwwQ0FBQSxDQUNKLENBRUEsbUJBQUEsYUFBQSxDQUNJLEtBQUEsQ0FBQSxJQUFBLGtDQUFBLENBQUEsNENBQUEsQ0FDSiIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJUSlNJbnB1dFRleHQuc3ZlbHRlIl19 */");
}
function create_fragment10(ctx) {
  let div;
  let input_1;
  let efx_action;
  let applyStyles_action;
  let mounted;
  let dispose;
  let input_1_levels = [
    { class: "tjs-input" },
    { type: (
      /*type*/
      ctx[0]
    ) },
    { placeholder: (
      /*placeholder*/
      ctx[2]
    ) },
    { disabled: (
      /*disabled*/
      ctx[1]
    ) }
  ];
  let input_data = {};
  for (let i = 0; i < input_1_levels.length; i += 1) {
    input_data = assign(input_data, input_1_levels[i]);
  }
  const block = {
    c: function create() {
      div = element("div");
      input_1 = element("input");
      set_attributes(input_1, input_data);
      toggle_class(input_1, "is-value-invalid", !/*$storeIsValid*/
      ctx[8]);
      toggle_class(input_1, "svelte-5gbujq", true);
      add_location(input_1, file10, 173, 4, 5300);
      attr_dev(div, "class", "tjs-input-container svelte-5gbujq");
      add_location(div, file10, 172, 0, 5231);
    },
    l: function claim(nodes) {
      throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, input_1);
      if (input_1.autofocus)
        input_1.focus();
      ctx[14](input_1);
      set_input_value(
        input_1,
        /*$store*/
        ctx[9]
      );
      if (!mounted) {
        dispose = [
          listen_dev(
            input_1,
            "input",
            /*input_1_input_handler*/
            ctx[15]
          ),
          listen_dev(
            input_1,
            "focusin",
            /*onFocusIn*/
            ctx[10],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            input_1,
            "keydown",
            /*onKeyDown*/
            ctx[11],
            false,
            false,
            false,
            false
          ),
          action_destroyer(efx_action = /*efx*/
          ctx[6].call(null, div)),
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            div,
            /*styles*/
            ctx[5]
          ))
        ];
        mounted = true;
      }
    },
    p: function update(ctx2, [dirty]) {
      set_attributes(input_1, input_data = get_spread_update(input_1_levels, [
        { class: "tjs-input" },
        dirty & /*type*/
        1 && { type: (
          /*type*/
          ctx2[0]
        ) },
        dirty & /*placeholder*/
        4 && { placeholder: (
          /*placeholder*/
          ctx2[2]
        ) },
        dirty & /*disabled*/
        2 && { disabled: (
          /*disabled*/
          ctx2[1]
        ) }
      ]));
      if (dirty & /*$store*/
      512 && input_1.value !== /*$store*/
      ctx2[9]) {
        set_input_value(
          input_1,
          /*$store*/
          ctx2[9]
        );
      }
      toggle_class(input_1, "is-value-invalid", !/*$storeIsValid*/
      ctx2[8]);
      toggle_class(input_1, "svelte-5gbujq", true);
      if (applyStyles_action && is_function(applyStyles_action.update) && dirty & /*styles*/
      32)
        applyStyles_action.update.call(
          null,
          /*styles*/
          ctx2[5]
        );
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div);
      ctx[14](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment10.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance10($$self, $$props, $$invalidate) {
  let $storeIsValid, $$unsubscribe_storeIsValid = noop, $$subscribe_storeIsValid = () => ($$unsubscribe_storeIsValid(), $$unsubscribe_storeIsValid = subscribe(storeIsValid, ($$value) => $$invalidate(8, $storeIsValid = $$value)), storeIsValid);
  let $store, $$unsubscribe_store = noop, $$subscribe_store = () => ($$unsubscribe_store(), $$unsubscribe_store = subscribe(store, ($$value) => $$invalidate(9, $store = $$value)), store);
  $$self.$$.on_destroy.push(() => $$unsubscribe_storeIsValid());
  $$self.$$.on_destroy.push(() => $$unsubscribe_store());
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TJSInputText", slots, []);
  let { input = void 0 } = $$props;
  let { type = void 0 } = $$props;
  let { disabled = void 0 } = $$props;
  let { options = void 0 } = $$props;
  let { placeholder = void 0 } = $$props;
  let { store = void 0 } = $$props;
  validate_store(store, "store");
  $$subscribe_store();
  let { storeIsValid = void 0 } = $$props;
  validate_store(storeIsValid, "storeIsValid");
  $$subscribe_storeIsValid();
  let { styles = void 0 } = $$props;
  let { efx = void 0 } = $$props;
  const localOptions = {
    blurOnEnterKey: true,
    cancelOnEscKey: false,
    clearOnEscKey: false
  };
  let inputEl;
  let initialValue;
  function onFocusIn(event) {
    initialValue = localOptions.cancelOnEscKey ? inputEl.value : void 0;
  }
  function onKeyDown(event) {
    if (localOptions.blurOnEnterKey && event.code === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      inputEl.blur();
      return;
    }
    if (event.code === "Escape") {
      if (localOptions.cancelOnEscKey && typeof initialValue === "string") {
        event.preventDefault();
        event.stopPropagation();
        store.set(initialValue);
        initialValue = void 0;
        inputEl.blur();
      } else if (localOptions.clearOnEscKey) {
        event.preventDefault();
        event.stopPropagation();
        store.set("");
        inputEl.blur();
      }
    }
  }
  const writable_props = [
    "input",
    "type",
    "disabled",
    "options",
    "placeholder",
    "store",
    "storeIsValid",
    "styles",
    "efx"
  ];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<TJSInputText> was created with unknown prop '${key}'`);
  });
  function input_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inputEl = $$value;
      $$invalidate(7, inputEl);
    });
  }
  function input_1_input_handler() {
    $store = this.value;
    store.set($store);
  }
  $$self.$$set = ($$props2) => {
    if ("input" in $$props2)
      $$invalidate(13, input = $$props2.input);
    if ("type" in $$props2)
      $$invalidate(0, type = $$props2.type);
    if ("disabled" in $$props2)
      $$invalidate(1, disabled = $$props2.disabled);
    if ("options" in $$props2)
      $$invalidate(12, options = $$props2.options);
    if ("placeholder" in $$props2)
      $$invalidate(2, placeholder = $$props2.placeholder);
    if ("store" in $$props2)
      $$subscribe_store($$invalidate(3, store = $$props2.store));
    if ("storeIsValid" in $$props2)
      $$subscribe_storeIsValid($$invalidate(4, storeIsValid = $$props2.storeIsValid));
    if ("styles" in $$props2)
      $$invalidate(5, styles = $$props2.styles);
    if ("efx" in $$props2)
      $$invalidate(6, efx = $$props2.efx);
  };
  $$self.$capture_state = () => ({
    writable,
    applyStyles,
    localize,
    isReadableStore,
    isWritableStore,
    isObject,
    input,
    type,
    disabled,
    options,
    placeholder,
    store,
    storeIsValid,
    styles,
    efx,
    localOptions,
    inputEl,
    initialValue,
    onFocusIn,
    onKeyDown,
    $storeIsValid,
    $store
  });
  $$self.$inject_state = ($$props2) => {
    if ("input" in $$props2)
      $$invalidate(13, input = $$props2.input);
    if ("type" in $$props2)
      $$invalidate(0, type = $$props2.type);
    if ("disabled" in $$props2)
      $$invalidate(1, disabled = $$props2.disabled);
    if ("options" in $$props2)
      $$invalidate(12, options = $$props2.options);
    if ("placeholder" in $$props2)
      $$invalidate(2, placeholder = $$props2.placeholder);
    if ("store" in $$props2)
      $$subscribe_store($$invalidate(3, store = $$props2.store));
    if ("storeIsValid" in $$props2)
      $$subscribe_storeIsValid($$invalidate(4, storeIsValid = $$props2.storeIsValid));
    if ("styles" in $$props2)
      $$invalidate(5, styles = $$props2.styles);
    if ("efx" in $$props2)
      $$invalidate(6, efx = $$props2.efx);
    if ("inputEl" in $$props2)
      $$invalidate(7, inputEl = $$props2.inputEl);
    if ("initialValue" in $$props2)
      initialValue = $$props2.initialValue;
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*input, type*/
    8193) {
      $: {
        $$invalidate(0, type = isObject(input) && typeof input.type === "string" ? input.type : typeof type === "string" ? type : "text");
        switch (type) {
          case "email":
          case "password":
          case "search":
          case "text":
          case "url":
            break;
          default:
            throw new Error(`'TJSInputText only supports text input types: 'email', 'password', 'search', 'text', 'url'.`);
        }
      }
    }
    if ($$self.$$.dirty & /*input, disabled*/
    8194) {
      $:
        $$invalidate(1, disabled = isObject(input) && typeof input.disabled === "boolean" ? input.disabled : typeof disabled === "boolean" ? disabled : false);
    }
    if ($$self.$$.dirty & /*input, options*/
    12288) {
      $: {
        $$invalidate(12, options = isObject(input) && isObject(input.options) ? input.options : isObject(options) ? options : {});
        if (typeof (options == null ? void 0 : options.blurOnEnterKey) === "boolean") {
          localOptions.blurOnEnterKey = options.blurOnEnterKey;
        }
        if (typeof (options == null ? void 0 : options.cancelOnEscKey) === "boolean") {
          localOptions.cancelOnEscKey = options.cancelOnEscKey;
        }
        if (typeof (options == null ? void 0 : options.clearOnEscKey) === "boolean") {
          localOptions.clearOnEscKey = options.clearOnEscKey;
        }
      }
    }
    if ($$self.$$.dirty & /*input, placeholder*/
    8196) {
      $:
        $$invalidate(2, placeholder = isObject(input) && typeof input.placeholder === "string" ? localize(input.placeholder) : typeof placeholder === "string" ? localize(placeholder) : void 0);
    }
    if ($$self.$$.dirty & /*input, store*/
    8200) {
      $:
        $$subscribe_store($$invalidate(3, store = isObject(input) && isWritableStore(input.store) ? input.store : isWritableStore(store) ? store : writable(void 0)));
    }
    if ($$self.$$.dirty & /*input, storeIsValid*/
    8208) {
      $:
        $$subscribe_storeIsValid($$invalidate(4, storeIsValid = isObject(input) && isReadableStore(input.storeIsValid) ? input.storeIsValid : isReadableStore(storeIsValid) ? storeIsValid : writable(true)));
    }
    if ($$self.$$.dirty & /*input, styles*/
    8224) {
      $:
        $$invalidate(5, styles = isObject(input) && isObject(input.styles) ? input.styles : typeof styles === "object" ? styles : void 0);
    }
    if ($$self.$$.dirty & /*input, efx*/
    8256) {
      $:
        $$invalidate(6, efx = isObject(input) && typeof input.efx === "function" ? input.efx : typeof efx === "function" ? efx : () => {
        });
    }
  };
  return [
    type,
    disabled,
    placeholder,
    store,
    storeIsValid,
    styles,
    efx,
    inputEl,
    $storeIsValid,
    $store,
    onFocusIn,
    onKeyDown,
    options,
    input,
    input_1_binding,
    input_1_input_handler
  ];
}
var TJSInputText = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(
      this,
      options,
      instance10,
      create_fragment10,
      safe_not_equal,
      {
        input: 13,
        type: 0,
        disabled: 1,
        options: 12,
        placeholder: 2,
        store: 3,
        storeIsValid: 4,
        styles: 5,
        efx: 6
      },
      add_css10
    );
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TJSInputText",
      options,
      id: create_fragment10.name
    });
  }
  get input() {
    throw new Error_1("<TJSInputText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set input(value) {
    throw new Error_1("<TJSInputText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get type() {
    throw new Error_1("<TJSInputText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set type(value) {
    throw new Error_1("<TJSInputText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get disabled() {
    throw new Error_1("<TJSInputText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set disabled(value) {
    throw new Error_1("<TJSInputText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get options() {
    throw new Error_1("<TJSInputText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set options(value) {
    throw new Error_1("<TJSInputText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get placeholder() {
    throw new Error_1("<TJSInputText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set placeholder(value) {
    throw new Error_1("<TJSInputText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get store() {
    throw new Error_1("<TJSInputText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set store(value) {
    throw new Error_1("<TJSInputText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get storeIsValid() {
    throw new Error_1("<TJSInputText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set storeIsValid(value) {
    throw new Error_1("<TJSInputText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get styles() {
    throw new Error_1("<TJSInputText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set styles(value) {
    throw new Error_1("<TJSInputText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get efx() {
    throw new Error_1("<TJSInputText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set efx(value) {
    throw new Error_1("<TJSInputText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var TJSInputText_default = TJSInputText;

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/form/input/TJSInput.svelte
var { Error: Error_12 } = globals;
function create_fragment11(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value = (
    /*component*/
    ctx[1]
  );
  function switch_props(ctx2) {
    return {
      props: { input: (
        /*input*/
        ctx2[0]
      ) },
      $$inline: true
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
  }
  const block = {
    c: function create() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l: function claim(nodes) {
      throw new Error_12("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, [dirty]) {
      const switch_instance_changes = {};
      if (dirty & /*input*/
      1)
        switch_instance_changes.input = /*input*/
        ctx2[0];
      if (dirty & /*component*/
      2 && switch_value !== (switch_value = /*component*/
      ctx2[1])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment11.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance11($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TJSInput", slots, []);
  let { input = void 0 } = $$props;
  let component;
  const writable_props = ["input"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<TJSInput> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("input" in $$props2)
      $$invalidate(0, input = $$props2.input);
  };
  $$self.$capture_state = () => ({
    isObject,
    TJSInputNumber: TJSInputNumber_default,
    TJSInputText: TJSInputText_default,
    input,
    component
  });
  $$self.$inject_state = ($$props2) => {
    if ("input" in $$props2)
      $$invalidate(0, input = $$props2.input);
    if ("component" in $$props2)
      $$invalidate(1, component = $$props2.component);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*input*/
    1) {
      $: {
        const type = isObject(input) && typeof input.type === "string" ? input.type : "text";
        switch (type) {
          case "email":
          case "password":
          case "search":
          case "text":
          case "url":
            $$invalidate(1, component = TJSInputText_default);
            break;
          case "number":
            $$invalidate(1, component = TJSInputNumber_default);
            break;
          default:
            throw new Error(`'TJSInput' currently only supports text input types: 'email', 'number', 'password', 'search', 'text', 'url'.`);
        }
      }
    }
  };
  return [input, component];
}
var TJSInput = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance11, create_fragment11, safe_not_equal, { input: 0 });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TJSInput",
      options,
      id: create_fragment11.name
    });
  }
  get input() {
    throw new Error_12("<TJSInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set input(value) {
    throw new Error_12("<TJSInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var TJSInput_default = TJSInput;

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/form/select/TJSSelect.svelte
var file11 = "node_modules\\@typhonjs-fvtt\\svelte-standard\\_dist\\component\\standard\\form\\select\\TJSSelect.svelte";
function add_css11(target) {
  append_styles(target, "svelte-w1wv6s", ".tjs-select-container.svelte-w1wv6s.svelte-w1wv6s{pointer-events:none;display:block;overflow:var(--tjs-select-overflow, var(--tjs-input-overflow, hidden));transform-style:preserve-3d;background:var(--tjs-select-background, var(--tjs-input-background));border-radius:var(--tjs-select-border-radius, var(--tjs-input-border-radius));flex:var(--tjs-select-flex, var(--tjs-input-flex));margin:var(--tjs-select-margin, var(--tjs-input-margin));height:var(--tjs-select-height, var(--tjs-input-height));width:var(--tjs-select-width, var(--tjs-input-width))}select.svelte-w1wv6s.svelte-w1wv6s{pointer-events:initial;display:inline-block;position:relative;appearance:var(--tjs-select-appearance, var(--tjs-input-appearance, inherit));background:transparent;border:var(--tjs-select-border, var(--tjs-input-border));border-radius:var(--tjs-select-border-radius, var(--tjs-input-border-radius));width:100%;height:100%;padding:var(--tjs-select-padding, var(--tjs-input-padding, initial));color:inherit;font-family:inherit;font-size:inherit;line-height:inherit;outline-offset:var(--tjs-select-outline-offset, var(--tjs-input-outline-offset));text-align:var(--tjs-select-text-align, var(--tjs-input-text-align));text-overflow:var(--tjs-select-text-overflow, var(--tjs-input-text-overflow, ellipsis));cursor:var(--tjs-select-cursor, var(--tjs-input-cursor));transform:translateZ(1px)}select.svelte-w1wv6s option.svelte-w1wv6s{background:var(--tjs-select-option-background, var(--tjs-default-popup-background, #23221d));color:var(--tjs-select-option-color, var(--tjs-default-popup-primary-color, #b5b3a4))}select.svelte-w1wv6s.svelte-w1wv6s:focus{box-shadow:var(--tjs-select-box-shadow-focus, var(--tjs-input-box-shadow-focus, unset))}select.svelte-w1wv6s.svelte-w1wv6s:focus-visible{box-shadow:var(--tjs-select-box-shadow-focus-visible, var(--tjs-input-box-shadow-focus-visible, unset));outline:var(--tjs-select-outline-focus-visible, var(--tjs-input-outline-focus-visible));transition:var(--tjs-select-transition-focus-visible, var(--tjs-input-transition-focus-visible))}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVEpTU2VsZWN0LnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUE4RkcsaURBQUEsQ0FDRyxjQUFBLENBQUEsSUFBb0IsQ0FDcEIsT0FBQSxDQUFBLEtBQWMsQ0FDZCxRQUFBLENBQUEsSUFBQSxxQkFBQSxDQUFBLGtDQUFBLENBQXVFLENBQ3ZFLGVBQUEsQ0FBQSxXQUE0QixDQUU1QixVQUFBLENBQUEsSUFBQSx1QkFBQSxDQUFBLDRCQUFBLENBQXFFLENBQ3JFLGFBQUEsQ0FBQSxJQUFBLDBCQUFBLENBQUEsK0JBQUEsQ0FBOEUsQ0FDOUUsSUFBQSxDQUFBLElBQUEsaUJBQUEsQ0FBQSxzQkFBQSxDQUFtRCxDQUNuRCxNQUFBLENBQUEsSUFBQSxtQkFBQSxDQUFBLHdCQUFBLENBQXlELENBQ3pELE1BQUEsQ0FBQSxJQUFBLG1CQUFBLENBQUEsd0JBQUEsQ0FBeUQsQ0FDekQsS0FBQSxDQUFBLElBQUEsa0JBQUEsQ0FBQSx1QkFBQSxDQUNILENBRUEsa0NBQUEsQ0FDRyxjQUFBLENBQUEsT0FBdUIsQ0FDdkIsT0FBQSxDQUFBLFlBQXFCLENBQ3JCLFFBQUEsQ0FBQSxRQUFrQixDQUVsQixVQUFBLENBQUEsSUFBQSx1QkFBQSxDQUFBLHFDQUFBLENBQThFLENBRTlFLFVBQUEsQ0FBQSxXQUF1QixDQUV2QixNQUFBLENBQUEsSUFBQSxtQkFBQSxDQUFBLHdCQUFBLENBQXlELENBQ3pELGFBQUEsQ0FBQSxJQUFBLDBCQUFBLENBQUEsK0JBQUEsQ0FBOEUsQ0FFOUUsS0FBQSxDQUFBLElBQVcsQ0FDWCxNQUFBLENBQUEsSUFBWSxDQUVaLE9BQUEsQ0FBQSxJQUFBLG9CQUFBLENBQUEsa0NBQUEsQ0FBcUUsQ0FFckUsS0FBQSxDQUFBLE9BQWMsQ0FDZCxXQUFBLENBQUEsT0FBb0IsQ0FDcEIsU0FBQSxDQUFBLE9BQWtCLENBQ2xCLFdBQUEsQ0FBQSxPQUFvQixDQUNwQixjQUFBLENBQUEsSUFBQSwyQkFBQSxDQUFBLGdDQUFBLENBQWlGLENBQ2pGLFVBQUEsQ0FBQSxJQUFBLHVCQUFBLENBQUEsNEJBQUEsQ0FBcUUsQ0FDckUsYUFBQSxDQUFBLElBQUEsMEJBQUEsQ0FBQSx5Q0FBQSxDQUF3RixDQUV4RixNQUFBLENBQUEsSUFBQSxtQkFBQSxDQUFBLHdCQUFBLENBQXlELENBRXpELFNBQUEsQ0FBQSxXQUFBLEdBQUEsQ0FDSCxDQUVBLG9CQUFBLENBQUEsb0JBQUEsQ0FDRyxVQUFBLENBQUEsSUFBQSw4QkFBQSxDQUFBLDZDQUFBLENBQTZGLENBQzdGLEtBQUEsQ0FBQSxJQUFBLHlCQUFBLENBQUEsZ0RBQUEsQ0FDSCxDQUVBLGtDQUFBLE1BQUEsQ0FDRyxVQUFBLENBQUEsSUFBQSw2QkFBQSxDQUFBLHlDQUFBLENBQ0gsQ0FFQSxrQ0FBQSxjQUFBLENBQ0csVUFBQSxDQUFBLElBQUEscUNBQUEsQ0FBQSxpREFBQSxDQUF3RyxDQUN4RyxPQUFBLENBQUEsSUFBQSxrQ0FBQSxDQUFBLHVDQUFBLENBQXdGLENBQ3hGLFVBQUEsQ0FBQSxJQUFBLHFDQUFBLENBQUEsMENBQUEsQ0FDSCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJUSlNTZWxlY3Quc3ZlbHRlIl19 */");
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[10] = list[i];
  return child_ctx;
}
function create_each_block(ctx) {
  let option;
  let t0_value = (
    /*option*/
    ctx[10].label + ""
  );
  let t0;
  let t1;
  let option_value_value;
  const block = {
    c: function create() {
      option = element("option");
      t0 = text(t0_value);
      t1 = space();
      attr_dev(option, "class", "tjs-select-option svelte-w1wv6s");
      option.__value = option_value_value = /*option*/
      ctx[10].value;
      option.value = option.__value;
      add_location(option, file11, 86, 9, 3843);
    },
    m: function mount(target, anchor) {
      insert_dev(target, option, anchor);
      append_dev(option, t0);
      append_dev(option, t1);
    },
    p: function update(ctx2, dirty) {
      if (dirty & /*options*/
      1 && t0_value !== (t0_value = /*option*/
      ctx2[10].label + ""))
        set_data_dev(t0, t0_value);
      if (dirty & /*options*/
      1 && option_value_value !== (option_value_value = /*option*/
      ctx2[10].value)) {
        prop_dev(option, "__value", option_value_value);
        option.value = option.__value;
      }
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(option);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_each_block.name,
    type: "each",
    source: "(86:6) {#each options as option}",
    ctx
  });
  return block;
}
function create_fragment12(ctx) {
  let div;
  let select_1;
  let efx_action;
  let applyStyles_action;
  let mounted;
  let dispose;
  let each_value = (
    /*options*/
    ctx[0]
  );
  validate_each_argument(each_value);
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  const block = {
    c: function create() {
      div = element("div");
      select_1 = element("select");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr_dev(select_1, "class", "tjs-select svelte-w1wv6s");
      if (
        /*$store*/
        ctx[4] === void 0
      )
        add_render_callback(() => (
          /*select_1_change_handler*/
          ctx[9].call(select_1)
        ));
      add_location(select_1, file11, 84, 3, 3746);
      attr_dev(div, "class", "tjs-select-container svelte-w1wv6s");
      add_location(div, file11, 82, 0, 3571);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, select_1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(select_1, null);
        }
      }
      select_option(
        select_1,
        /*$store*/
        ctx[4],
        true
      );
      if (!mounted) {
        dispose = [
          listen_dev(
            select_1,
            "change",
            /*change_handler_1*/
            ctx[8],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            select_1,
            "change",
            /*select_1_change_handler*/
            ctx[9]
          ),
          listen_dev(
            div,
            "change",
            /*change_handler*/
            ctx[7],
            false,
            false,
            false,
            false
          ),
          action_destroyer(efx_action = /*efx*/
          ctx[3].call(null, div)),
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            div,
            /*styles*/
            ctx[2]
          ))
        ];
        mounted = true;
      }
    },
    p: function update(ctx2, [dirty]) {
      if (dirty & /*options*/
      1) {
        each_value = /*options*/
        ctx2[0];
        validate_each_argument(each_value);
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(select_1, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
      if (dirty & /*$store, options*/
      17) {
        select_option(
          select_1,
          /*$store*/
          ctx2[4]
        );
      }
      if (applyStyles_action && is_function(applyStyles_action.update) && dirty & /*styles*/
      4)
        applyStyles_action.update.call(
          null,
          /*styles*/
          ctx2[2]
        );
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div);
      destroy_each(each_blocks, detaching);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment12.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance12($$self, $$props, $$invalidate) {
  let $store, $$unsubscribe_store = noop, $$subscribe_store = () => ($$unsubscribe_store(), $$unsubscribe_store = subscribe(store, ($$value) => $$invalidate(4, $store = $$value)), store);
  $$self.$$.on_destroy.push(() => $$unsubscribe_store());
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TJSSelect", slots, []);
  let { select = void 0 } = $$props;
  let { selected = void 0 } = $$props;
  let { options = void 0 } = $$props;
  let { store = void 0 } = $$props;
  validate_store(store, "store");
  $$subscribe_store();
  let { styles = void 0 } = $$props;
  let { efx = void 0 } = $$props;
  onMount(() => {
    if (selected && store && !options.includes($store) && options.includes(selected)) {
      store.set(selected);
    }
  });
  const writable_props = ["select", "selected", "options", "store", "styles", "efx"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<TJSSelect> was created with unknown prop '${key}'`);
  });
  function change_handler(event) {
    bubble.call(this, $$self, event);
  }
  function change_handler_1(event) {
    bubble.call(this, $$self, event);
  }
  function select_1_change_handler() {
    $store = select_value(this);
    store.set($store);
    $$invalidate(0, options), $$invalidate(6, select);
  }
  $$self.$$set = ($$props2) => {
    if ("select" in $$props2)
      $$invalidate(6, select = $$props2.select);
    if ("selected" in $$props2)
      $$invalidate(5, selected = $$props2.selected);
    if ("options" in $$props2)
      $$invalidate(0, options = $$props2.options);
    if ("store" in $$props2)
      $$subscribe_store($$invalidate(1, store = $$props2.store));
    if ("styles" in $$props2)
      $$invalidate(2, styles = $$props2.styles);
    if ("efx" in $$props2)
      $$invalidate(3, efx = $$props2.efx);
  };
  $$self.$capture_state = () => ({
    onMount,
    writable,
    applyStyles,
    isWritableStore,
    select,
    selected,
    options,
    store,
    styles,
    efx,
    $store
  });
  $$self.$inject_state = ($$props2) => {
    if ("select" in $$props2)
      $$invalidate(6, select = $$props2.select);
    if ("selected" in $$props2)
      $$invalidate(5, selected = $$props2.selected);
    if ("options" in $$props2)
      $$invalidate(0, options = $$props2.options);
    if ("store" in $$props2)
      $$subscribe_store($$invalidate(1, store = $$props2.store));
    if ("styles" in $$props2)
      $$invalidate(2, styles = $$props2.styles);
    if ("efx" in $$props2)
      $$invalidate(3, efx = $$props2.efx);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*select, selected*/
    96) {
      $:
        $$invalidate(5, selected = typeof select === "object" && typeof select.selected === "string" ? select.selected : typeof selected === "string" ? selected : void 0);
    }
    if ($$self.$$.dirty & /*select, options*/
    65) {
      $:
        $$invalidate(0, options = typeof select === "object" && Array.isArray(select.options) ? select.options : Array.isArray(options) ? options : []);
    }
    if ($$self.$$.dirty & /*select, store*/
    66) {
      $:
        $$subscribe_store($$invalidate(1, store = typeof select === "object" && isWritableStore(select.store) ? select.store : isWritableStore(store) ? store : writable(void 0)));
    }
    if ($$self.$$.dirty & /*select, styles*/
    68) {
      $:
        $$invalidate(2, styles = typeof select === "object" && typeof select.styles === "object" ? select.styles : typeof styles === "object" ? styles : void 0);
    }
    if ($$self.$$.dirty & /*select, efx*/
    72) {
      $:
        $$invalidate(3, efx = typeof select === "object" && typeof select.efx === "function" ? select.efx : typeof efx === "function" ? efx : () => {
        });
    }
  };
  return [
    options,
    store,
    styles,
    efx,
    $store,
    selected,
    select,
    change_handler,
    change_handler_1,
    select_1_change_handler
  ];
}
var TJSSelect = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(
      this,
      options,
      instance12,
      create_fragment12,
      safe_not_equal,
      {
        select: 6,
        selected: 5,
        options: 0,
        store: 1,
        styles: 2,
        efx: 3
      },
      add_css11
    );
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TJSSelect",
      options,
      id: create_fragment12.name
    });
  }
  get select() {
    throw new Error("<TJSSelect>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set select(value) {
    throw new Error("<TJSSelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get selected() {
    throw new Error("<TJSSelect>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set selected(value) {
    throw new Error("<TJSSelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get options() {
    throw new Error("<TJSSelect>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set options(value) {
    throw new Error("<TJSSelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get store() {
    throw new Error("<TJSSelect>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set store(value) {
    throw new Error("<TJSSelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get styles() {
    throw new Error("<TJSSelect>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set styles(value) {
    throw new Error("<TJSSelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get efx() {
    throw new Error("<TJSSelect>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set efx(value) {
    throw new Error("<TJSSelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var TJSSelect_default = TJSSelect;

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/label/TJSToggleLabel.svelte
var file12 = "node_modules\\@typhonjs-fvtt\\svelte-standard\\_dist\\component\\standard\\label\\TJSToggleLabel.svelte";
function add_css12(target) {
  append_styles(target, "svelte-1xcvv8", "div.svelte-1xcvv8{display:block;position:relative}span.svelte-1xcvv8{position:relative;display:flex;justify-content:var(--tjs-toggle-label-justify-content, center);align-items:var(--tjs-toggle-label-align-items, center);pointer-events:initial;width:100%;height:100%;background:var(--tjs-toggle-label-background);border:var(--tjs-toggle-label-border, none);border-radius:var(--tjs-toggle-label-border-radius);font-size:var(--tjs-toggle-label-font-size, inherit);font-weight:var(--tjs-toggle-label-font-weight, inherit);font-family:var(--tjs-toggle-label-font-family, inherit);overflow:var(--tjs-toggle-label-overflow, hidden);padding:var(--tjs-toggle-label-padding, 0 0.25em);transform-style:preserve-3d;transition:var(--tjs-toggle-label-transition, background 0.2s ease-in-out)}span.svelte-1xcvv8:focus{background:var(--tjs-toggle-label-background-focus);text-shadow:var(--tjs-toggle-label-text-shadow-focus, var(--tjs-default-text-shadow-focus-hover))}span.svelte-1xcvv8:focus-visible{background:var(--tjs-toggle-label-background-focus-visible);box-shadow:var(--tjs-toggle-label-box-shadow-focus-visible, var(--tjs-default-box-shadow-focus-visible));outline:var(--tjs-toggle-label-outline-focus-visible, var(--tjs-default-outline-focus-visible, revert));transition:var(--tjs-toggle-label-transition-focus-visible, var(--tjs-default-transition-focus-visible))}span.svelte-1xcvv8:hover{background:var(--tjs-toggle-label-background-hover);text-shadow:var(--tjs-toggle-label-text-shadow-hover, var(--tjs-default-text-shadow-focus-hover))}span.selected.svelte-1xcvv8{background:var(--tjs-toggle-label-background-selected);text-shadow:var(--tjs-toggle-label-text-shadow-selected, var(--tjs-default-text-shadow-focus-hover))}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVEpTVG9nZ2xlTGFiZWwuc3ZlbHRlIiwibWFwcGluZ3MiOiJBQTJORyxpQkFBQSxDQUNHLE9BQUEsQ0FBQSxLQUFjLENBQ2QsUUFBQSxDQUFBLFFBQ0gsQ0FFQSxrQkFBQSxDQUNHLFFBQUEsQ0FBQSxRQUFrQixDQUVsQixPQUFBLENBQUEsSUFBYSxDQUNiLGVBQUEsQ0FBQSxJQUFBLGtDQUFBLENBQUEsT0FBQSxDQUFnRSxDQUNoRSxXQUFBLENBQUEsSUFBQSw4QkFBQSxDQUFBLE9BQUEsQ0FBd0QsQ0FFeEQsY0FBQSxDQUFBLE9BQXVCLENBRXZCLEtBQUEsQ0FBQSxJQUFXLENBQ1gsTUFBQSxDQUFBLElBQVksQ0FFWixVQUFBLENBQUEsSUFBQSw2QkFBQSxDQUE4QyxDQUM5QyxNQUFBLENBQUEsSUFBQSx5QkFBQSxDQUFBLEtBQUEsQ0FBNEMsQ0FDNUMsYUFBQSxDQUFBLElBQUEsZ0NBQUEsQ0FBb0QsQ0FDcEQsU0FBQSxDQUFBLElBQUEsNEJBQUEsQ0FBQSxRQUFBLENBQXFELENBQ3JELFdBQUEsQ0FBQSxJQUFBLDhCQUFBLENBQUEsUUFBQSxDQUF5RCxDQUN6RCxXQUFBLENBQUEsSUFBQSw4QkFBQSxDQUFBLFFBQUEsQ0FBeUQsQ0FDekQsUUFBQSxDQUFBLElBQUEsMkJBQUEsQ0FBQSxPQUFBLENBQWtELENBQ2xELE9BQUEsQ0FBQSxJQUFBLDBCQUFBLENBQUEsU0FBQSxDQUFrRCxDQUNsRCxlQUFBLENBQUEsV0FBNEIsQ0FDNUIsVUFBQSxDQUFBLElBQUEsNkJBQUEsQ0FBQSw0QkFBQSxDQUNILENBRUEsa0JBQUEsTUFBQSxDQUNHLFVBQUEsQ0FBQSxJQUFBLG1DQUFBLENBQW9ELENBQ3BELFdBQUEsQ0FBQSxJQUFBLG9DQUFBLENBQUEsMkNBQUEsQ0FDSCxDQUVBLGtCQUFBLGNBQUEsQ0FDRyxVQUFBLENBQUEsSUFBQSwyQ0FBQSxDQUE0RCxDQUM1RCxVQUFBLENBQUEsSUFBQSwyQ0FBQSxDQUFBLDRDQUFBLENBQXlHLENBQ3pHLE9BQUEsQ0FBQSxJQUFBLHdDQUFBLENBQUEsaURBQUEsQ0FBd0csQ0FDeEcsVUFBQSxDQUFBLElBQUEsMkNBQUEsQ0FBQSw0Q0FBQSxDQUNILENBRUEsa0JBQUEsTUFBQSxDQUNHLFVBQUEsQ0FBQSxJQUFBLG1DQUFBLENBQW9ELENBQ3BELFdBQUEsQ0FBQSxJQUFBLG9DQUFBLENBQUEsMkNBQUEsQ0FDSCxDQUVBLElBQUEsdUJBQUEsQ0FDRyxVQUFBLENBQUEsSUFBQSxzQ0FBQSxDQUF1RCxDQUN2RCxXQUFBLENBQUEsSUFBQSx1Q0FBQSxDQUFBLDJDQUFBLENBQ0giLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiVEpTVG9nZ2xlTGFiZWwuc3ZlbHRlIl19 */");
}
var get_right_slot_changes = (dirty) => ({});
var get_right_slot_context = (ctx) => ({});
var get_left_slot_changes = (dirty) => ({});
var get_left_slot_context = (ctx) => ({});
var get_outer_slot_changes = (dirty) => ({});
var get_outer_slot_context = (ctx) => ({});
function create_if_block_23(ctx) {
  let a;
  let t_value = localize(
    /*text*/
    ctx[0]
  ) + "";
  let t;
  const block = {
    c: function create() {
      a = element("a");
      t = text(t_value);
      attr_dev(a, "role", "presentation");
      add_location(a, file12, 209, 9, 6995);
    },
    m: function mount(target, anchor) {
      insert_dev(target, a, anchor);
      append_dev(a, t);
    },
    p: function update(ctx2, dirty) {
      if (dirty & /*text*/
      1 && t_value !== (t_value = localize(
        /*text*/
        ctx2[0]
      ) + ""))
        set_data_dev(t, t_value);
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(a);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_23.name,
    type: "if",
    source: "(208:41) ",
    ctx
  });
  return block;
}
function create_if_block_16(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value = (
    /*comp*/
    ctx[1]
  );
  function switch_props(ctx2) {
    return { $$inline: true };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
  }
  const block = {
    c: function create() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      if (dirty & /*comp*/
      2 && switch_value !== (switch_value = /*comp*/
      ctx2[1])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
      }
    },
    i: function intro(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_16.name,
    type: "if",
    source: "(206:6) {#if comp}",
    ctx
  });
  return block;
}
function create_if_block8(ctx) {
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[24].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[23],
    null
  );
  const block = {
    c: function create() {
      if (default_slot)
        default_slot.c();
    },
    m: function mount(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p: function update(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        8388608)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[23],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[23]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[23],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block8.name,
    type: "if",
    source: "(214:3) {#if selected}",
    ctx
  });
  return block;
}
function create_fragment13(ctx) {
  let div;
  let t0;
  let span;
  let t1;
  let current_block_type_index;
  let if_block0;
  let t2;
  let efx_action;
  let t3;
  let div_title_value;
  let applyStyles_action;
  let current;
  let mounted;
  let dispose;
  const outer_slot_template = (
    /*#slots*/
    ctx[24].outer
  );
  const outer_slot = create_slot(
    outer_slot_template,
    ctx,
    /*$$scope*/
    ctx[23],
    get_outer_slot_context
  );
  const left_slot_template = (
    /*#slots*/
    ctx[24].left
  );
  const left_slot = create_slot(
    left_slot_template,
    ctx,
    /*$$scope*/
    ctx[23],
    get_left_slot_context
  );
  const if_block_creators = [create_if_block_16, create_if_block_23];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*comp*/
      ctx2[1]
    )
      return 0;
    if (typeof /*text*/
    ctx2[0] === "string")
      return 1;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx, -1))) {
    if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  const right_slot_template = (
    /*#slots*/
    ctx[24].right
  );
  const right_slot = create_slot(
    right_slot_template,
    ctx,
    /*$$scope*/
    ctx[23],
    get_right_slot_context
  );
  let if_block1 = (
    /*selected*/
    ctx[5] && create_if_block8(ctx)
  );
  const block = {
    c: function create() {
      div = element("div");
      if (outer_slot)
        outer_slot.c();
      t0 = space();
      span = element("span");
      if (left_slot)
        left_slot.c();
      t1 = space();
      if (if_block0)
        if_block0.c();
      t2 = space();
      if (right_slot)
        right_slot.c();
      t3 = space();
      if (if_block1)
        if_block1.c();
      attr_dev(span, "role", "button");
      attr_dev(span, "tabindex", "0");
      attr_dev(span, "class", "svelte-1xcvv8");
      toggle_class(
        span,
        "selected",
        /*selected*/
        ctx[5]
      );
      add_location(span, file12, 193, 3, 6523);
      attr_dev(div, "class", "tjs-toggle-label svelte-1xcvv8");
      attr_dev(div, "title", div_title_value = localize(
        /*titleCurrent*/
        ctx[7]
      ));
      add_location(div, file12, 187, 0, 6340);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      if (outer_slot) {
        outer_slot.m(div, null);
      }
      append_dev(div, t0);
      append_dev(div, span);
      if (left_slot) {
        left_slot.m(span, null);
      }
      append_dev(span, t1);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(span, null);
      }
      append_dev(span, t2);
      if (right_slot) {
        right_slot.m(span, null);
      }
      ctx[27](span);
      append_dev(div, t3);
      if (if_block1)
        if_block1.m(div, null);
      current = true;
      if (!mounted) {
        dispose = [
          listen_dev(
            span,
            "click",
            /*onClick*/
            ctx[8],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            span,
            "contextmenu",
            /*onContextMenuPress*/
            ctx[11],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            span,
            "keydown",
            /*onKeydown*/
            ctx[12],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            span,
            "keyup",
            /*onKeyup*/
            ctx[13],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            span,
            "click",
            /*click_handler*/
            ctx[25],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            span,
            "contextmenu",
            /*contextmenu_handler*/
            ctx[26],
            false,
            false,
            false,
            false
          ),
          action_destroyer(efx_action = /*efx*/
          ctx[4].call(null, span)),
          listen_dev(
            div,
            "click",
            /*onClickDiv*/
            ctx[9],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            div,
            "close:popup",
            /*onClosePopup*/
            ctx[10],
            false,
            false,
            false,
            false
          ),
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            div,
            /*styles*/
            ctx[3]
          ))
        ];
        mounted = true;
      }
    },
    p: function update(ctx2, [dirty]) {
      if (outer_slot) {
        if (outer_slot.p && (!current || dirty & /*$$scope*/
        8388608)) {
          update_slot_base(
            outer_slot,
            outer_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[23],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[23]
            ) : get_slot_changes(
              outer_slot_template,
              /*$$scope*/
              ctx2[23],
              dirty,
              get_outer_slot_changes
            ),
            get_outer_slot_context
          );
        }
      }
      if (left_slot) {
        if (left_slot.p && (!current || dirty & /*$$scope*/
        8388608)) {
          update_slot_base(
            left_slot,
            left_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[23],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[23]
            ) : get_slot_changes(
              left_slot_template,
              /*$$scope*/
              ctx2[23],
              dirty,
              get_left_slot_changes
            ),
            get_left_slot_context
          );
        }
      }
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2, dirty);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        }
      } else {
        if (if_block0) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block0 = if_blocks[current_block_type_index];
          if (!if_block0) {
            if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block0.c();
          } else {
            if_block0.p(ctx2, dirty);
          }
          transition_in(if_block0, 1);
          if_block0.m(span, t2);
        } else {
          if_block0 = null;
        }
      }
      if (right_slot) {
        if (right_slot.p && (!current || dirty & /*$$scope*/
        8388608)) {
          update_slot_base(
            right_slot,
            right_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[23],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[23]
            ) : get_slot_changes(
              right_slot_template,
              /*$$scope*/
              ctx2[23],
              dirty,
              get_right_slot_changes
            ),
            get_right_slot_context
          );
        }
      }
      if (!current || dirty & /*selected*/
      32) {
        toggle_class(
          span,
          "selected",
          /*selected*/
          ctx2[5]
        );
      }
      if (
        /*selected*/
        ctx2[5]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & /*selected*/
          32) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block8(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (!current || dirty & /*titleCurrent*/
      128 && div_title_value !== (div_title_value = localize(
        /*titleCurrent*/
        ctx2[7]
      ))) {
        attr_dev(div, "title", div_title_value);
      }
      if (applyStyles_action && is_function(applyStyles_action.update) && dirty & /*styles*/
      8)
        applyStyles_action.update.call(
          null,
          /*styles*/
          ctx2[3]
        );
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(outer_slot, local);
      transition_in(left_slot, local);
      transition_in(if_block0);
      transition_in(right_slot, local);
      transition_in(if_block1);
      current = true;
    },
    o: function outro(local) {
      transition_out(outer_slot, local);
      transition_out(left_slot, local);
      transition_out(if_block0);
      transition_out(right_slot, local);
      transition_out(if_block1);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div);
      if (outer_slot)
        outer_slot.d(detaching);
      if (left_slot)
        left_slot.d(detaching);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
      if (right_slot)
        right_slot.d(detaching);
      ctx[27](null);
      if (if_block1)
        if_block1.d();
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment13.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance13($$self, $$props, $$invalidate) {
  let titleCurrent;
  let $store, $$unsubscribe_store = noop, $$subscribe_store = () => ($$unsubscribe_store(), $$unsubscribe_store = subscribe(store, ($$value) => $$invalidate(22, $store = $$value)), store);
  $$self.$$.on_destroy.push(() => $$unsubscribe_store());
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TJSToggleLabel", slots, ["outer", "left", "right", "default"]);
  let { label = void 0 } = $$props;
  let { text: text2 = void 0 } = $$props;
  let { comp = void 0 } = $$props;
  let { title = void 0 } = $$props;
  let { titleSelected = void 0 } = $$props;
  let { store = void 0 } = $$props;
  validate_store(store, "store");
  $$subscribe_store();
  let { styles = void 0 } = $$props;
  let { efx = void 0 } = $$props;
  let { keyCode = void 0 } = $$props;
  let { onPress = void 0 } = $$props;
  let { onClose = void 0 } = $$props;
  let { onContextMenu = void 0 } = $$props;
  let { onClickPropagate = void 0 } = $$props;
  const dispatch = createEventDispatcher();
  let spanEl;
  let selected = false;
  function onClick(event) {
    $$invalidate(5, selected = !selected);
    if (store) {
      store.set(selected);
    }
    if (typeof onPress === "function") {
      onPress(selected);
    }
    dispatch("press", { selected });
    if (!onClickPropagate) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  function onClickDiv(event) {
    if (!onClickPropagate) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  function onClosePopup(event) {
    var _a;
    $$invalidate(5, selected = false);
    if (store) {
      store.set(false);
    }
    if (typeof onClose === "function") {
      onClose(selected);
    }
    if (typeof ((_a = event == null ? void 0 : event.detail) == null ? void 0 : _a.keyboardFocus) === "boolean" && event.detail.keyboardFocus && (spanEl == null ? void 0 : spanEl.isConnected)) {
      spanEl.focus();
      event.stopPropagation();
      event.preventDefault();
    }
  }
  function onContextMenuPress(event) {
    if (typeof onContextMenu === "function") {
      onContextMenu();
    }
    if (!onClickPropagate) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  function onKeydown(event) {
    if (event.code === keyCode) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  function onKeyup(event) {
    if (event.code === keyCode) {
      $$invalidate(5, selected = !selected);
      if (store) {
        store.set(selected);
      }
      if (typeof onPress === "function") {
        onPress(selected);
      }
      dispatch("press", { selected });
      event.preventDefault();
      event.stopPropagation();
    }
  }
  const writable_props = [
    "label",
    "text",
    "comp",
    "title",
    "titleSelected",
    "store",
    "styles",
    "efx",
    "keyCode",
    "onPress",
    "onClose",
    "onContextMenu",
    "onClickPropagate"
  ];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<TJSToggleLabel> was created with unknown prop '${key}'`);
  });
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function contextmenu_handler(event) {
    bubble.call(this, $$self, event);
  }
  function span_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      spanEl = $$value;
      $$invalidate(6, spanEl);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("label" in $$props2)
      $$invalidate(21, label = $$props2.label);
    if ("text" in $$props2)
      $$invalidate(0, text2 = $$props2.text);
    if ("comp" in $$props2)
      $$invalidate(1, comp = $$props2.comp);
    if ("title" in $$props2)
      $$invalidate(14, title = $$props2.title);
    if ("titleSelected" in $$props2)
      $$invalidate(15, titleSelected = $$props2.titleSelected);
    if ("store" in $$props2)
      $$subscribe_store($$invalidate(2, store = $$props2.store));
    if ("styles" in $$props2)
      $$invalidate(3, styles = $$props2.styles);
    if ("efx" in $$props2)
      $$invalidate(4, efx = $$props2.efx);
    if ("keyCode" in $$props2)
      $$invalidate(16, keyCode = $$props2.keyCode);
    if ("onPress" in $$props2)
      $$invalidate(17, onPress = $$props2.onPress);
    if ("onClose" in $$props2)
      $$invalidate(18, onClose = $$props2.onClose);
    if ("onContextMenu" in $$props2)
      $$invalidate(19, onContextMenu = $$props2.onContextMenu);
    if ("onClickPropagate" in $$props2)
      $$invalidate(20, onClickPropagate = $$props2.onClickPropagate);
    if ("$$scope" in $$props2)
      $$invalidate(23, $$scope = $$props2.$$scope);
  };
  $$self.$capture_state = () => ({
    createEventDispatcher,
    applyStyles,
    localize,
    isWritableStore,
    isObject,
    isSvelteComponent,
    label,
    text: text2,
    comp,
    title,
    titleSelected,
    store,
    styles,
    efx,
    keyCode,
    onPress,
    onClose,
    onContextMenu,
    onClickPropagate,
    dispatch,
    spanEl,
    selected,
    onClick,
    onClickDiv,
    onClosePopup,
    onContextMenuPress,
    onKeydown,
    onKeyup,
    titleCurrent,
    $store
  });
  $$self.$inject_state = ($$props2) => {
    if ("label" in $$props2)
      $$invalidate(21, label = $$props2.label);
    if ("text" in $$props2)
      $$invalidate(0, text2 = $$props2.text);
    if ("comp" in $$props2)
      $$invalidate(1, comp = $$props2.comp);
    if ("title" in $$props2)
      $$invalidate(14, title = $$props2.title);
    if ("titleSelected" in $$props2)
      $$invalidate(15, titleSelected = $$props2.titleSelected);
    if ("store" in $$props2)
      $$subscribe_store($$invalidate(2, store = $$props2.store));
    if ("styles" in $$props2)
      $$invalidate(3, styles = $$props2.styles);
    if ("efx" in $$props2)
      $$invalidate(4, efx = $$props2.efx);
    if ("keyCode" in $$props2)
      $$invalidate(16, keyCode = $$props2.keyCode);
    if ("onPress" in $$props2)
      $$invalidate(17, onPress = $$props2.onPress);
    if ("onClose" in $$props2)
      $$invalidate(18, onClose = $$props2.onClose);
    if ("onContextMenu" in $$props2)
      $$invalidate(19, onContextMenu = $$props2.onContextMenu);
    if ("onClickPropagate" in $$props2)
      $$invalidate(20, onClickPropagate = $$props2.onClickPropagate);
    if ("spanEl" in $$props2)
      $$invalidate(6, spanEl = $$props2.spanEl);
    if ("selected" in $$props2)
      $$invalidate(5, selected = $$props2.selected);
    if ("titleCurrent" in $$props2)
      $$invalidate(7, titleCurrent = $$props2.titleCurrent);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*label, text*/
    2097153) {
      $:
        $$invalidate(0, text2 = isObject(label) && typeof label.text === "string" ? label.text : typeof text2 === "string" ? text2 : void 0);
    }
    if ($$self.$$.dirty & /*label, comp*/
    2097154) {
      $:
        $$invalidate(1, comp = isObject(label) && isSvelteComponent(label.comp) ? label.comp : isSvelteComponent(comp) ? comp : void 0);
    }
    if ($$self.$$.dirty & /*label, title*/
    2113536) {
      $:
        $$invalidate(14, title = isObject(label) && typeof label.title === "string" ? label.title : typeof title === "string" ? title : "");
    }
    if ($$self.$$.dirty & /*label, titleSelected*/
    2129920) {
      $:
        $$invalidate(15, titleSelected = isObject(label) && typeof label.titleSelected === "string" ? label.titleSelected : typeof titleSelected === "string" ? titleSelected : "");
    }
    if ($$self.$$.dirty & /*label, store*/
    2097156) {
      $:
        $$subscribe_store($$invalidate(2, store = isObject(label) && isWritableStore(label.store) ? label.store : isWritableStore(store) ? store : void 0));
    }
    if ($$self.$$.dirty & /*label, styles*/
    2097160) {
      $:
        $$invalidate(3, styles = isObject(label) && typeof label.styles === "object" ? label.styles : typeof styles === "object" ? styles : void 0);
    }
    if ($$self.$$.dirty & /*label, efx*/
    2097168) {
      $:
        $$invalidate(4, efx = isObject(label) && typeof label.efx === "function" ? label.efx : typeof efx === "function" ? efx : () => {
        });
    }
    if ($$self.$$.dirty & /*label, keyCode*/
    2162688) {
      $:
        $$invalidate(16, keyCode = isObject(label) && typeof label.keyCode === "string" ? label.keyCode : typeof keyCode === "string" ? keyCode : "Enter");
    }
    if ($$self.$$.dirty & /*label, onPress*/
    2228224) {
      $:
        $$invalidate(17, onPress = isObject(label) && typeof label.onPress === "function" ? label.onPress : typeof onPress === "function" ? onPress : void 0);
    }
    if ($$self.$$.dirty & /*label, onClose*/
    2359296) {
      $:
        $$invalidate(18, onClose = isObject(label) && typeof label.onClose === "function" ? label.onClose : typeof onClose === "function" ? onClose : void 0);
    }
    if ($$self.$$.dirty & /*label, onContextMenu*/
    2621440) {
      $:
        $$invalidate(19, onContextMenu = isObject(label) && typeof label.onContextMenu === "function" ? label.onContextMenu : typeof onContextMenu === "function" ? onContextMenu : void 0);
    }
    if ($$self.$$.dirty & /*label, onClickPropagate*/
    3145728) {
      $:
        $$invalidate(20, onClickPropagate = isObject(label) && typeof label.onClickPropagate === "boolean" ? label.onClickPropagate : typeof onClickPropagate === "boolean" ? onClickPropagate : false);
    }
    if ($$self.$$.dirty & /*store, $store*/
    4194308) {
      $:
        if (store) {
          $$invalidate(5, selected = $store);
        }
    }
    if ($$self.$$.dirty & /*selected, titleSelected, title*/
    49184) {
      $:
        $$invalidate(7, titleCurrent = selected && titleSelected !== "" ? titleSelected : title);
    }
  };
  return [
    text2,
    comp,
    store,
    styles,
    efx,
    selected,
    spanEl,
    titleCurrent,
    onClick,
    onClickDiv,
    onClosePopup,
    onContextMenuPress,
    onKeydown,
    onKeyup,
    title,
    titleSelected,
    keyCode,
    onPress,
    onClose,
    onContextMenu,
    onClickPropagate,
    label,
    $store,
    $$scope,
    slots,
    click_handler,
    contextmenu_handler,
    span_binding
  ];
}
var TJSToggleLabel = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(
      this,
      options,
      instance13,
      create_fragment13,
      safe_not_equal,
      {
        label: 21,
        text: 0,
        comp: 1,
        title: 14,
        titleSelected: 15,
        store: 2,
        styles: 3,
        efx: 4,
        keyCode: 16,
        onPress: 17,
        onClose: 18,
        onContextMenu: 19,
        onClickPropagate: 20
      },
      add_css12
    );
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TJSToggleLabel",
      options,
      id: create_fragment13.name
    });
  }
  get label() {
    throw new Error("<TJSToggleLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set label(value) {
    throw new Error("<TJSToggleLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get text() {
    throw new Error("<TJSToggleLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set text(value) {
    throw new Error("<TJSToggleLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get comp() {
    throw new Error("<TJSToggleLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set comp(value) {
    throw new Error("<TJSToggleLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get title() {
    throw new Error("<TJSToggleLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set title(value) {
    throw new Error("<TJSToggleLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get titleSelected() {
    throw new Error("<TJSToggleLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set titleSelected(value) {
    throw new Error("<TJSToggleLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get store() {
    throw new Error("<TJSToggleLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set store(value) {
    throw new Error("<TJSToggleLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get styles() {
    throw new Error("<TJSToggleLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set styles(value) {
    throw new Error("<TJSToggleLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get efx() {
    throw new Error("<TJSToggleLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set efx(value) {
    throw new Error("<TJSToggleLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get keyCode() {
    throw new Error("<TJSToggleLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set keyCode(value) {
    throw new Error("<TJSToggleLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get onPress() {
    throw new Error("<TJSToggleLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set onPress(value) {
    throw new Error("<TJSToggleLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get onClose() {
    throw new Error("<TJSToggleLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set onClose(value) {
    throw new Error("<TJSToggleLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get onContextMenu() {
    throw new Error("<TJSToggleLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set onContextMenu(value) {
    throw new Error("<TJSToggleLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get onClickPropagate() {
    throw new Error("<TJSToggleLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set onClickPropagate(value) {
    throw new Error("<TJSToggleLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var TJSToggleLabel_default = TJSToggleLabel;

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/layers/position-control/control/draggable.js
function draggable(node, { active = true }) {
  const initialDragPoint = { x: 0, y: 0 };
  const handlers = {
    dragDown: ["pointerdown", (e) => onDragPointerDown(e), false],
    dragChange: ["pointermove", (e) => onDragPointerChange(e), false],
    dragUp: ["pointerup", (e) => onDragPointerUp(e), false]
  };
  function activateListeners() {
    node.addEventListener(...handlers.dragDown);
  }
  function removeListeners() {
    node.removeEventListener(...handlers.dragDown);
    node.removeEventListener(...handlers.dragChange);
    node.removeEventListener(...handlers.dragUp);
    node.style.cursor = null;
  }
  if (active) {
    activateListeners();
  }
  function onDragPointerDown(event) {
    if (event.button !== 0 || !event.isPrimary) {
      return;
    }
    event.preventDefault();
    initialDragPoint.x = event.clientX;
    initialDragPoint.y = event.clientY;
    node.addEventListener(...handlers.dragChange);
    node.addEventListener(...handlers.dragUp);
    node.setPointerCapture(event.pointerId);
    node.style.cursor = "grabbing";
    node.dispatchEvent(new CustomEvent("draggable:start", { bubbles: false }));
  }
  function onDragPointerChange(event) {
    if ((event.buttons & 1) === 0) {
      onDragPointerUp(event);
      return;
    }
    event.preventDefault();
    const tX = event.clientX - initialDragPoint.x;
    const tY = event.clientY - initialDragPoint.y;
    node.dispatchEvent(new CustomEvent("draggable:move", { detail: { tX, tY }, bubbles: false }));
  }
  function onDragPointerUp(event) {
    event.preventDefault();
    node.removeEventListener(...handlers.dragChange);
    node.removeEventListener(...handlers.dragUp);
    node.style.cursor = null;
    node.dispatchEvent(new CustomEvent("draggable:end", { bubbles: false }));
  }
  return {
    // The default of active being true won't automatically add listeners twice.
    update: (options) => {
      if (typeof options.active === "boolean") {
        active = options.active;
        if (active) {
          activateListeners();
        } else {
          removeListeners();
        }
      }
    },
    destroy: () => removeListeners()
  };
}

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/layers/position-control/control/resize/resize.js
function resize(node, { id, resizeCallback, active = true }) {
  const lastDragPoint = { x: 0, y: 0 };
  const handlers = {
    dragDown: ["pointerdown", (e) => onDragPointerDown(e), false],
    dragMove: ["pointermove", (e) => onDragPointerChange(e), false],
    dragUp: ["pointerup", (e) => onDragPointerUp(e), false]
  };
  function activateListeners() {
    node.addEventListener(...handlers.dragDown);
  }
  function removeListeners() {
    node.removeEventListener(...handlers.dragDown);
    node.removeEventListener(...handlers.dragMove);
    node.removeEventListener(...handlers.dragUp);
  }
  if (active) {
    activateListeners();
  }
  function onDragPointerDown(event) {
    if (event.button !== 0 || !event.isPrimary) {
      return;
    }
    event.preventDefault();
    lastDragPoint.x = event.clientX;
    lastDragPoint.y = event.clientY;
    node.addEventListener(...handlers.dragMove);
    node.addEventListener(...handlers.dragUp);
    node.setPointerCapture(event.pointerId);
  }
  function onDragPointerChange(event) {
    if ((event.buttons & 1) === 0) {
      onDragPointerUp(event);
      return;
    }
    event.preventDefault();
    const dX = event.clientX - lastDragPoint.x;
    const dY = event.clientY - lastDragPoint.y;
    lastDragPoint.x = event.clientX;
    lastDragPoint.y = event.clientY;
    resizeCallback(id, dX, dY, event);
  }
  function onDragPointerUp(event) {
    event.preventDefault();
    node.removeEventListener(...handlers.dragMove);
    node.removeEventListener(...handlers.dragUp);
  }
  return {
    // The default of active being true won't automatically add listeners twice.
    update: (options) => {
      if (typeof options.active === "boolean") {
        active = options.active;
        if (active) {
          activateListeners();
        } else {
          removeListeners();
        }
      }
    },
    destroy: () => removeListeners()
  };
}

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/layers/position-control/control/resize/constants.js
var boxLength = 5;
var size = `${boxLength}px`;
var minusSize = `-${boxLength}px`;
var hitboxData = [
  // corners (top, right, bottom right, bottom left)
  { id: 0, styles: { top: minusSize, left: minusSize, width: size, height: size, cursor: "nwse-resize" } },
  { id: 1, styles: { top: minusSize, left: "100%", width: size, height: size, cursor: "nesw-resize" } },
  { id: 2, styles: { top: "100%", left: "100%", width: size, height: size, cursor: "nwse-resize" } },
  { id: 3, styles: { top: "100%", left: minusSize, width: size, height: size, cursor: "nesw-resize" } },
  // sides (top, right, bottom, left)
  { id: 4, styles: { top: minusSize, left: 0, width: "100%", height: size, cursor: "ns-resize" } },
  { id: 5, styles: { top: 0, left: "100%", width: size, height: "100%", cursor: "ew-resize" } },
  { id: 6, styles: { top: "100%", left: 0, width: "100%", height: size, cursor: "ns-resize" } },
  { id: 7, styles: { top: 0, left: minusSize, width: size, height: "100%", cursor: "ew-resize" } }
];
var hitboxCallback = [{}, {}, {}, {}, {}, {}, {}, {}];

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/layers/position-control/control/resize/applyResizeData.js
function applyResizeData(id, dX, dY, control) {
  const data = hitboxCallback[id];
  switch (id) {
    case 0: {
      const heightAdjust = control.position.height - dY;
      if (heightAdjust < 0) {
        dY += heightAdjust;
      }
      data.top = `+=${dY}`;
      data.height = `+=${-dY}`;
      const widthAdjust = control.position.width - dX;
      if (widthAdjust < 0) {
        dX += widthAdjust;
      }
      data.left = `+=${dX}`;
      data.width = `+=${-dX}`;
      break;
    }
    case 1: {
      const heightAdjust = control.position.height - dY;
      if (heightAdjust < 0) {
        dY += heightAdjust;
      }
      data.top = `+=${dY}`;
      data.height = `+=${-dY}`;
      data.width = `+=${dX}`;
      break;
    }
    case 2: {
      data.width = `+=${dX}`;
      data.height = `+=${dY}`;
      break;
    }
    case 3: {
      const widthAdjust = control.position.width - dX;
      if (widthAdjust < 0) {
        dX += widthAdjust;
      }
      data.left = `+=${dX}`;
      data.width = `+=${-dX}`;
      data.height = `+=${dY}`;
      break;
    }
    case 4: {
      const heightAdjust = control.position.height - dY;
      if (heightAdjust < 0) {
        dY += heightAdjust;
      }
      data.top = `+=${dY}`;
      data.height = `+=${-dY}`;
      break;
    }
    case 5: {
      data.width = `+=${dX}`;
      break;
    }
    case 6: {
      data.height = `+=${dY}`;
      break;
    }
    case 7: {
      const widthAdjust = control.position.width - dX;
      if (widthAdjust < 0) {
        dX += widthAdjust;
      }
      data.left = `+=${dX}`;
      data.width = `+=${-dX}`;
      break;
    }
  }
  return data;
}

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/layers/position-control/control/resize/ResizeHitBox.svelte
var file13 = "node_modules\\@typhonjs-fvtt\\svelte-standard\\_dist\\component\\standard\\layers\\position-control\\control\\resize\\ResizeHitBox.svelte";
function add_css13(target) {
  append_styles(target, "svelte-iaj775", "div.svelte-iaj775{position:absolute}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzaXplSGl0Qm94LnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUE4Q0csaUJBQUEsQ0FDRyxRQUFBLENBQUEsUUFDSCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJSZXNpemVIaXRCb3guc3ZlbHRlIl19 */");
}
function create_fragment14(ctx) {
  let div;
  let applyStyles_action;
  let resize_action;
  let mounted;
  let dispose;
  const block = {
    c: function create() {
      div = element("div");
      attr_dev(div, "class", "svelte-iaj775");
      add_location(div, file13, 37, 0, 863);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      if (!mounted) {
        dispose = [
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            div,
            /*data*/
            ctx[0].styles
          )),
          action_destroyer(resize_action = resize.call(null, div, {
            id: (
              /*data*/
              ctx[0].id
            ),
            resizeCallback: (
              /*resizeCallback*/
              ctx[4]
            )
          })),
          listen_dev(div, "pointerdown", stop_propagation(prevent_default(
            /*onPointerDown*/
            ctx[3]
          )), false, true, true, false),
          listen_dev(div, "pointermove", stop_propagation(prevent_default(
            /*capture*/
            ctx[2]
          )), false, true, true, false),
          listen_dev(div, "pointerover", stop_propagation(prevent_default(
            /*capture*/
            ctx[2]
          )), false, true, true, false),
          listen_dev(div, "pointerup", stop_propagation(prevent_default(
            /*pointerup_handler*/
            ctx[5]
          )), false, true, true, false)
        ];
        mounted = true;
      }
    },
    p: function update(ctx2, [dirty]) {
      if (applyStyles_action && is_function(applyStyles_action.update) && dirty & /*data*/
      1)
        applyStyles_action.update.call(
          null,
          /*data*/
          ctx2[0].styles
        );
      if (resize_action && is_function(resize_action.update) && dirty & /*data*/
      1)
        resize_action.update.call(null, {
          id: (
            /*data*/
            ctx2[0].id
          ),
          resizeCallback: (
            /*resizeCallback*/
            ctx2[4]
          )
        });
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment14.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance14($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("ResizeHitBox", slots, []);
  let { data = void 0 } = $$props;
  const control = getContext("#pcControl");
  const controls = getContext("#pclControls");
  const capture = () => null;
  function onPointerDown() {
    $$invalidate(1, control.resizing = true, control);
    controls.selected.setPrimary(control);
  }
  function resizeCallback(id, dX, dY, event) {
    if (event.shiftKey) {
      for (const control2 of controls.selected.values()) {
        control2.position.set(applyResizeData(id, dX, dY, control2));
      }
    } else {
      control.position.set(applyResizeData(id, dX, dY, control));
    }
  }
  const writable_props = ["data"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<ResizeHitBox> was created with unknown prop '${key}'`);
  });
  const pointerup_handler2 = () => $$invalidate(1, control.resizing = false, control);
  $$self.$$set = ($$props2) => {
    if ("data" in $$props2)
      $$invalidate(0, data = $$props2.data);
  };
  $$self.$capture_state = () => ({
    getContext,
    applyStyles,
    resize,
    applyResizeData,
    data,
    control,
    controls,
    capture,
    onPointerDown,
    resizeCallback
  });
  $$self.$inject_state = ($$props2) => {
    if ("data" in $$props2)
      $$invalidate(0, data = $$props2.data);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [data, control, capture, onPointerDown, resizeCallback, pointerup_handler2];
}
var ResizeHitBox = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance14, create_fragment14, safe_not_equal, { data: 0 }, add_css13);
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "ResizeHitBox",
      options,
      id: create_fragment14.name
    });
  }
  get data() {
    throw new Error("<ResizeHitBox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set data(value) {
    throw new Error("<ResizeHitBox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var ResizeHitBox_default = ResizeHitBox;

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/layers/position-control/control/resize/ResizeControl.svelte
function get_each_context2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[0] = list[i];
  return child_ctx;
}
function create_each_block2(key_1, ctx) {
  let first;
  let resizehitbox;
  let current;
  resizehitbox = new ResizeHitBox_default({
    props: { data: (
      /*data*/
      ctx[0]
    ) },
    $$inline: true
  });
  const block = {
    key: key_1,
    first: null,
    c: function create() {
      first = empty();
      create_component(resizehitbox.$$.fragment);
      this.first = first;
    },
    m: function mount(target, anchor) {
      insert_dev(target, first, anchor);
      mount_component(resizehitbox, target, anchor);
      current = true;
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(resizehitbox.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(resizehitbox.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(first);
      destroy_component(resizehitbox, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_each_block2.name,
    type: "each",
    source: "(7:0) {#each hitboxData as data (data.id)}",
    ctx
  });
  return block;
}
function create_fragment15(ctx) {
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let each_1_anchor;
  let current;
  let each_value = hitboxData;
  validate_each_argument(each_value);
  const get_key = (ctx2) => (
    /*data*/
    ctx2[0].id
  );
  validate_each_keys(ctx, each_value, get_each_context2, get_key);
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context2(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block2(key, child_ctx));
  }
  const block = {
    c: function create() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert_dev(target, each_1_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, [dirty]) {
      if (dirty & /*hitboxData*/
      0) {
        each_value = hitboxData;
        validate_each_argument(each_value);
        group_outros();
        validate_each_keys(ctx2, each_value, get_each_context2, get_key);
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block2, each_1_anchor, get_each_context2);
        check_outros();
      }
    },
    i: function intro(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o: function outro(local) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d: function destroy(detaching) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d(detaching);
      }
      if (detaching)
        detach_dev(each_1_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment15.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance15($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("ResizeControl", slots, []);
  const writable_props = [];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<ResizeControl> was created with unknown prop '${key}'`);
  });
  $$self.$capture_state = () => ({ ResizeHitBox: ResizeHitBox_default, hitboxData });
  return [];
}
var ResizeControl = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance15, create_fragment15, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "ResizeControl",
      options,
      id: create_fragment15.name
    });
  }
};
var ResizeControl_default = ResizeControl;

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/layers/position-control/control/SelectedBorder.svelte
var file14 = "node_modules\\@typhonjs-fvtt\\svelte-standard\\_dist\\component\\standard\\layers\\position-control\\control\\SelectedBorder.svelte";
function add_css14(target) {
  append_styles(target, "svelte-1bip51v", "div.border.svelte-1bip51v{position:absolute;pointer-events:none;top:-2px;left:-2px;width:calc(100% + 4px);height:calc(100% + 4px);clip-path:polygon(0% 0%, 0% 100%, 2px 100%, 2px 2px, calc(100% - 2px) 2px, calc(100% - 2px) calc(100% - 2px), 2px calc(100% - 2px), 2px 100%, 100% 100%, 100% 0%);background-size:200% auto;animation:svelte-1bip51v-shine 1.5s linear infinite}.selected.svelte-1bip51v{background:linear-gradient(45deg, rgba(255, 255, 255, 0.3) 20%, rgba(255, 255, 255, 0.3) 35%, rgba(21, 204, 247, 0.95) 45%, rgba(64, 208, 245, 0.95) 55%, rgba(255, 255, 255, 0.3) 70%, rgba(255, 255, 255, 0.3) 100%);border:dotted 2px lightblue}.primary.svelte-1bip51v{background:linear-gradient(45deg, rgba(255, 255, 255, 0.3) 20%, rgba(255, 255, 255, 0.3) 35%, rgba(250, 197, 99, 0.95) 45%, rgba(255, 215 , 0, 0.95) 55%, rgba(255, 255, 255, 0.3) 70%, rgba(255, 255, 255, 0.3) 100%);border:dotted 2px yellow}@keyframes svelte-1bip51v-shine{to{background-position:200% center}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0ZWRCb3JkZXIuc3ZlbHRlIiwibWFwcGluZ3MiOiJBQWNHLEdBQUEsc0JBQUEsQ0FDRyxRQUFBLENBQUEsUUFBa0IsQ0FDbEIsY0FBQSxDQUFBLElBQW9CLENBQ3BCLEdBQUEsQ0FBQSxJQUFTLENBQ1QsSUFBQSxDQUFBLElBQVUsQ0FDVixLQUFBLENBQUEsS0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBdUIsQ0FDdkIsTUFBQSxDQUFBLEtBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLENBQXdCLENBQ3hCLFNBQUEsQ0FBQSxRQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxLQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsS0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEtBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxFQUFBLENBQWtLLENBQ2xLLGVBQUEsQ0FBQSxJQUFBLENBQUEsSUFBMEIsQ0FDMUIsU0FBQSxDQUFBLG9CQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxRQUNILENBRUEsd0JBQUEsQ0FDRyxVQUFBLENBQUEsZ0JBQUEsS0FBQSxDQUFBLENBQUEsS0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxLQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEtBQUEsRUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsS0FBQSxFQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxLQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEtBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxDQUF1TixDQUN2TixNQUFBLENBQUEsTUFBQSxDQUFBLEdBQUEsQ0FBQSxTQUNILENBRUEsdUJBQUEsQ0FDRyxVQUFBLENBQUEsZ0JBQUEsS0FBQSxDQUFBLENBQUEsS0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxLQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEtBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsS0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEtBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsS0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxJQUFBLENBQXVOLENBQ3ZOLE1BQUEsQ0FBQSxNQUFBLENBQUEsR0FBQSxDQUFBLE1BQ0gsQ0FFQSxXQUFBLG9CQUFBLENBQ0csRUFBQSxDQUNHLG1CQUFBLENBQUEsSUFBQSxDQUFBLE1BQ0gsQ0FDSCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJTZWxlY3RlZEJvcmRlci5zdmVsdGUiXX0= */");
}
function create_fragment16(ctx) {
  let div;
  const block = {
    c: function create() {
      div = element("div");
      attr_dev(div, "class", "border svelte-1bip51v");
      toggle_class(
        div,
        "selected",
        /*$selected*/
        ctx[0] && !/*$isPrimary*/
        ctx[1]
      );
      toggle_class(
        div,
        "primary",
        /*$selected*/
        ctx[0] && /*$isPrimary*/
        ctx[1]
      );
      add_location(div, file14, 8, 0, 158);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
    },
    p: function update(ctx2, [dirty]) {
      if (dirty & /*$selected, $isPrimary*/
      3) {
        toggle_class(
          div,
          "selected",
          /*$selected*/
          ctx2[0] && !/*$isPrimary*/
          ctx2[1]
        );
      }
      if (dirty & /*$selected, $isPrimary*/
      3) {
        toggle_class(
          div,
          "primary",
          /*$selected*/
          ctx2[0] && /*$isPrimary*/
          ctx2[1]
        );
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment16.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance16($$self, $$props, $$invalidate) {
  let $selected;
  let $isPrimary;
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("SelectedBorder", slots, []);
  const control = getContext("#pcControl");
  const { isPrimary, selected } = control.stores;
  validate_store(isPrimary, "isPrimary");
  component_subscribe($$self, isPrimary, (value) => $$invalidate(1, $isPrimary = value));
  validate_store(selected, "selected");
  component_subscribe($$self, selected, (value) => $$invalidate(0, $selected = value));
  const writable_props = [];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<SelectedBorder> was created with unknown prop '${key}'`);
  });
  $$self.$capture_state = () => ({
    getContext,
    control,
    isPrimary,
    selected,
    $selected,
    $isPrimary
  });
  return [$selected, $isPrimary, isPrimary, selected];
}
var SelectedBorder = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance16, create_fragment16, safe_not_equal, {}, add_css14);
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "SelectedBorder",
      options,
      id: create_fragment16.name
    });
  }
};
var SelectedBorder_default = SelectedBorder;

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/layers/position-control/control/PositionControl.svelte
var file15 = "node_modules\\@typhonjs-fvtt\\svelte-standard\\_dist\\component\\standard\\layers\\position-control\\control\\PositionControl.svelte";
function add_css15(target) {
  append_styles(target, "svelte-mptgwv", "div.svelte-mptgwv{position:absolute;z-index:999999;pointer-events:none}.cursor-default.svelte-mptgwv{cursor:default}.cursor-grab.svelte-mptgwv{cursor:grab}.enabled.svelte-mptgwv{pointer-events:auto}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9zaXRpb25Db250cm9sLnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUFvRUcsaUJBQUEsQ0FDRyxRQUFBLENBQUEsUUFBa0IsQ0FDbEIsT0FBQSxDQUFBLE1BQWUsQ0FDZixjQUFBLENBQUEsSUFDSCxDQUVBLDZCQUFBLENBQ0csTUFBQSxDQUFBLE9BQ0gsQ0FFQSwwQkFBQSxDQUNHLE1BQUEsQ0FBQSxJQUNILENBRUEsc0JBQUEsQ0FDRyxjQUFBLENBQUEsSUFDSCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJQb3NpdGlvbkNvbnRyb2wuc3ZlbHRlIl19 */");
}
function create_if_block9(ctx) {
  let resizecontrol;
  let t;
  let selectedborder;
  let current;
  resizecontrol = new ResizeControl_default({ $$inline: true });
  selectedborder = new SelectedBorder_default({ $$inline: true });
  const block = {
    c: function create() {
      create_component(resizecontrol.$$.fragment);
      t = space();
      create_component(selectedborder.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(resizecontrol, target, anchor);
      insert_dev(target, t, anchor);
      mount_component(selectedborder, target, anchor);
      current = true;
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(resizecontrol.$$.fragment, local);
      transition_in(selectedborder.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(resizecontrol.$$.fragment, local);
      transition_out(selectedborder.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(resizecontrol, detaching);
      if (detaching)
        detach_dev(t);
      destroy_component(selectedborder, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block9.name,
    type: "if",
    source: "(62:4) {#if $selected}",
    ctx
  });
  return block;
}
function create_fragment17(ctx) {
  let div;
  let applyPosition_action;
  let draggable_action;
  let current;
  let mounted;
  let dispose;
  let if_block = (
    /*$selected*/
    ctx[0] && create_if_block9(ctx)
  );
  const block = {
    c: function create() {
      div = element("div");
      if (if_block)
        if_block.c();
      attr_dev(div, "role", "presentation");
      attr_dev(div, "class", "svelte-mptgwv");
      toggle_class(
        div,
        "enabled",
        /*$enabled*/
        ctx[1] || /*$selected*/
        ctx[0]
      );
      toggle_class(
        div,
        "cursor-default",
        /*$enabled*/
        ctx[1] && !/*$resizing*/
        ctx[2]
      );
      toggle_class(
        div,
        "cursor-grab",
        /*$selected*/
        ctx[0] && !/*$enabled*/
        ctx[1]
      );
      add_location(div, file15, 50, 0, 1423);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(applyPosition_action = applyPosition.call(
            null,
            div,
            /*position*/
            ctx[7]
          )),
          action_destroyer(draggable_action = draggable.call(null, div, {
            active: (
              /*$selected*/
              ctx[0] && !/*$enabled*/
              ctx[1]
            )
          })),
          listen_dev(
            div,
            "click",
            /*onClick*/
            ctx[8],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            div,
            "pointerdown",
            /*onPointerDown*/
            ctx[9],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            div,
            "draggable:start",
            /*selectedDragAPI*/
            ctx[3].onStart,
            false,
            false,
            false,
            false
          ),
          listen_dev(
            div,
            "draggable:move",
            /*selectedDragAPI*/
            ctx[3].onMove,
            false,
            false,
            false,
            false
          )
        ];
        mounted = true;
      }
    },
    p: function update(ctx2, [dirty]) {
      if (
        /*$selected*/
        ctx2[0]
      ) {
        if (if_block) {
          if (dirty & /*$selected*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block9(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (draggable_action && is_function(draggable_action.update) && dirty & /*$selected, $enabled*/
      3)
        draggable_action.update.call(null, {
          active: (
            /*$selected*/
            ctx2[0] && !/*$enabled*/
            ctx2[1]
          )
        });
      if (!current || dirty & /*$enabled, $selected*/
      3) {
        toggle_class(
          div,
          "enabled",
          /*$enabled*/
          ctx2[1] || /*$selected*/
          ctx2[0]
        );
      }
      if (!current || dirty & /*$enabled, $resizing*/
      6) {
        toggle_class(
          div,
          "cursor-default",
          /*$enabled*/
          ctx2[1] && !/*$resizing*/
          ctx2[2]
        );
      }
      if (!current || dirty & /*$selected, $enabled*/
      3) {
        toggle_class(
          div,
          "cursor-grab",
          /*$selected*/
          ctx2[0] && !/*$enabled*/
          ctx2[1]
        );
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div);
      if (if_block)
        if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment17.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance17($$self, $$props, $$invalidate) {
  let $selected;
  let $enabled;
  let $resizing;
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("PositionControl", slots, []);
  let { control = void 0 } = $$props;
  setContext("#pcControl", control);
  const controls = getContext("#pclControls");
  const selectedDragAPI = getContext("#pclSelectedDragAPI");
  const { enabled } = controls.stores;
  validate_store(enabled, "enabled");
  component_subscribe($$self, enabled, (value) => $$invalidate(1, $enabled = value));
  const { resizing, selected } = control.stores;
  validate_store(resizing, "resizing");
  component_subscribe($$self, resizing, (value) => $$invalidate(2, $resizing = value));
  validate_store(selected, "selected");
  component_subscribe($$self, selected, (value) => $$invalidate(0, $selected = value));
  const onDrag = controls.selected.onDrag;
  const position = control.position;
  function onClick(event) {
    if (!event.ctrlKey) {
      return;
    }
    if ($selected) {
      controls.selected.remove(control);
    } else {
      controls.selected.add(control);
    }
  }
  function onPointerDown(event) {
    if ($selected && !event.ctrlKey) {
      controls.selected.setPrimary(control);
    }
  }
  const writable_props = ["control"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<PositionControl> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("control" in $$props2)
      $$invalidate(10, control = $$props2.control);
  };
  $$self.$capture_state = () => ({
    getContext,
    setContext,
    applyPosition,
    draggable,
    ResizeControl: ResizeControl_default,
    SelectedBorder: SelectedBorder_default,
    control,
    controls,
    selectedDragAPI,
    enabled,
    resizing,
    selected,
    onDrag,
    position,
    onClick,
    onPointerDown,
    $selected,
    $enabled,
    $resizing
  });
  $$self.$inject_state = ($$props2) => {
    if ("control" in $$props2)
      $$invalidate(10, control = $$props2.control);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [
    $selected,
    $enabled,
    $resizing,
    selectedDragAPI,
    enabled,
    resizing,
    selected,
    position,
    onClick,
    onPointerDown,
    control
  ];
}
var PositionControl = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance17, create_fragment17, safe_not_equal, { control: 10 }, add_css15);
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "PositionControl",
      options,
      id: create_fragment17.name
    });
  }
  get control() {
    throw new Error("<PositionControl>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set control(value) {
    throw new Error("<PositionControl>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var PositionControl_default = PositionControl;

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/layers/position-control/control/ControlStore.js
var _component, _data, _position, _stores, _unsubscribe;
var ControlStore = class {
  constructor(component) {
    __privateAdd(this, _component, void 0);
    __privateAdd(this, _data, {
      isPrimary: false,
      resizing: false,
      selected: false
    });
    __privateAdd(this, _position, void 0);
    __privateAdd(this, _stores, void 0);
    /**
     * @type {Function[]}
     */
    __privateAdd(this, _unsubscribe, []);
    __privateSet(this, _component, component);
    let ignoreRoundRobin = false;
    __privateSet(this, _position, Position.duplicate(component.position, { calculateTransform: true }));
    __privateGet(this, _unsubscribe).push(__privateGet(this, _position).subscribe((data) => {
      if (!ignoreRoundRobin) {
        component.position.set({ ...data, immediateElementUpdate: true });
      }
    }));
    __privateGet(this, _unsubscribe).push(component.position.subscribe((data) => {
      ignoreRoundRobin = true;
      __privateGet(this, _position).set({ ...data, immediateElementUpdate: true });
      ignoreRoundRobin = false;
    }));
    const dataStore = writable(__privateGet(this, _data));
    __privateSet(this, _stores, {
      isPrimary: propertyStore(dataStore, "isPrimary"),
      resizing: propertyStore(dataStore, "resizing"),
      selected: propertyStore(dataStore, "selected")
    });
    Object.freeze(__privateGet(this, _stores));
  }
  get component() {
    return __privateGet(this, _component);
  }
  get id() {
    return __privateGet(this, _component).id;
  }
  get isPrimary() {
    return __privateGet(this, _data).isPrimary;
  }
  /**
   * @returns {Position} Control position.
   */
  get position() {
    return __privateGet(this, _position);
  }
  get resizing() {
    return __privateGet(this, _data).resizing;
  }
  get selected() {
    return __privateGet(this, _data).selected;
  }
  get stores() {
    return __privateGet(this, _stores);
  }
  set isPrimary(isPrimary) {
    __privateGet(this, _stores).isPrimary.set(isPrimary);
  }
  set resizing(resizing) {
    __privateGet(this, _stores).resizing.set(resizing);
  }
  set selected(selected) {
    __privateGet(this, _stores).selected.set(selected);
  }
  /**
   * Cleans up all subscriptions and removes references to tracked component data.
   */
  destroy() {
    for (const unsubscribe of __privateGet(this, _unsubscribe)) {
      unsubscribe();
    }
    __privateSet(this, _unsubscribe, void 0);
    __privateSet(this, _component, void 0);
    __privateSet(this, _position, void 0);
  }
};
_component = new WeakMap();
_data = new WeakMap();
_position = new WeakMap();
_stores = new WeakMap();
_unsubscribe = new WeakMap();

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/layers/position-control/ControlsStore.js
var _controls, _controlMap, _data2, _selectedAPI, _selectedDragAPI, _stores2, _subscriptions, _updateSubscribers, updateSubscribers_fn;
var ControlsStore = class {
  constructor() {
    // -------------------------------------------------------------------------------------------------------------------
    __privateAdd(this, _updateSubscribers);
    __privateAdd(this, _controls, []);
    /**
     * @type {Map<*, ControlStore>}
     */
    __privateAdd(this, _controlMap, /* @__PURE__ */ new Map());
    /**
     * @type {ControlsData}
     */
    __privateAdd(this, _data2, {
      boundingRect: void 0,
      enabled: false,
      validate: true
    });
    __privateAdd(this, _selectedAPI, void 0);
    __privateAdd(this, _selectedDragAPI, void 0);
    __privateAdd(this, _stores2, void 0);
    /**
     * Stores the subscribers.
     *
     * @type {(function(ControlStore[]): void)[]}
     */
    __privateAdd(this, _subscriptions, []);
    const dataStore = writable(__privateGet(this, _data2));
    [__privateWrapper(this, _selectedAPI)._, __privateWrapper(this, _selectedDragAPI)._] = new SelectedAPI(__privateGet(this, _data2));
    __privateSet(this, _stores2, {
      boundingRect: propertyStore(dataStore, "boundingRect"),
      enabled: propertyStore(dataStore, "enabled"),
      validate: propertyStore(dataStore, "validate")
    });
    Object.freeze(__privateGet(this, _stores2));
    return [this, __privateGet(this, _selectedDragAPI)];
  }
  /**
   * @returns {DOMRect} Returns any validation bounding rect.
   */
  get boundingRect() {
    return __privateGet(this, _data2).boundingRect;
  }
  /**
   * @returns {boolean} Returns enabled state.
   */
  get enabled() {
    return __privateGet(this, _data2).enabled;
  }
  /**
   * @returns {SelectedAPI} Selected API
   */
  get selected() {
    return __privateGet(this, _selectedAPI);
  }
  /**
   * @returns {*} Stores.
   */
  get stores() {
    return __privateGet(this, _stores2);
  }
  /**
   * @returns {boolean} Returns if on-drag validation is enabled.
   */
  get validate() {
    return __privateGet(this, _data2).validate;
  }
  /**
   * @param {DOMRect|void}  boundingRect - Assigns the validation bounding rect.
   */
  set boundingRect(boundingRect) {
    __privateGet(this, _stores2).boundingRect.set(boundingRect);
  }
  /**
   * @param {boolean}  enabled - New enabled state.
   */
  set enabled(enabled) {
    __privateGet(this, _stores2).enabled.set(enabled);
  }
  /**
   * @param {boolean}  validate - New on-drag validation state.
   */
  set validate(validate) {
    __privateGet(this, _stores2).validate.set(validate);
  }
  /**
   * Exports all or selected component data w/ Position converted to JSON object. An option to compact the position
   * data will transform the minimum top / left of all components as the origin.
   *
   * @param {object}   [opts] - Optional parameters.
   *
   * @param {boolean}  [opts.compact=false] - Transform / compact position data.
   *
   * @param {boolean}  [opts.selected=false] - When true export selected components.
   *
   * @returns {{width: number|void, height: number|void, components: object[]}} Width / height max extents & serialized
   *                                                                  component data.
   */
  export({ compact = false, selected = false } = {}) {
    const components = [];
    let maxWidth = Number.MIN_SAFE_INTEGER;
    let maxHeight = Number.MIN_SAFE_INTEGER;
    if (!compact) {
      for (const control of selected ? this.selected.values() : this.values()) {
        const position = control.component.position.toJSON();
        const boundingRect = control.position.transform.boundingRect;
        if (boundingRect.right > maxWidth) {
          maxWidth = boundingRect.right;
        }
        if (boundingRect.bottom > maxHeight) {
          maxHeight = boundingRect.bottom;
        }
        components.push(Object.assign({}, control.component, { position }));
      }
    } else {
      let minTop = Number.MAX_SAFE_INTEGER;
      let minLeft = Number.MAX_SAFE_INTEGER;
      for (const control of selected ? this.selected.values() : this.values()) {
        const boundingRect = control.position.transform.boundingRect;
        if (boundingRect.left < minLeft) {
          minLeft = boundingRect.left;
        }
        if (boundingRect.top < minTop) {
          minTop = boundingRect.top;
        }
      }
      for (const control of selected ? this.selected.values() : this.values()) {
        const position = control.position.toJSON();
        position.left -= minLeft;
        position.top -= minTop;
        const boundingRect = control.position.transform.boundingRect;
        const right = boundingRect.right - minLeft;
        const bottom = boundingRect.bottom - minTop;
        if (right > maxWidth) {
          maxWidth = right;
        }
        if (bottom > maxHeight) {
          maxHeight = bottom;
        }
        components.push(Object.assign({}, control.component, { position }));
      }
    }
    return {
      width: maxWidth === Number.MIN_SAFE_INTEGER ? 0 : maxWidth,
      height: maxHeight === Number.MIN_SAFE_INTEGER ? 0 : maxHeight,
      components
    };
  }
  /**
   * @returns {IterableIterator<any>} Keys for all controls.
   */
  keys() {
    return __privateGet(this, _controlMap).keys();
  }
  /**
   * Updates the tracked component data. Each entry must be an object containing a unique `id` property and an
   * instance of Position as the `position` property.
   *
   * @param {Iterable<object>} components - Iterable list of component data objects.
   */
  updateComponents(components) {
    const controlMap = __privateGet(this, _controlMap);
    const selected = __privateGet(this, _selectedAPI);
    const removeIDs = new Set(controlMap.keys());
    for (const component of components) {
      const componentId = component.id;
      if (componentId === void 0 || componentId === null) {
        throw new Error(`updateComponents error: component data does not have a defined 'id' property.`);
      }
      if (!(component.position instanceof Position)) {
        throw new Error(`updateComponents error: component data does not have a valid 'position' property.`);
      }
      if (controlMap.has(componentId)) {
        const control = controlMap.get(componentId);
        if (control.component.position !== component.position) {
          selected.removeById(componentId);
          controlMap.delete(componentId);
          control.destroy();
          controlMap.set(component.id, new ControlStore(component));
        } else {
          removeIDs.delete(componentId);
        }
      } else {
        controlMap.set(component.id, new ControlStore(component));
      }
    }
    for (const id of removeIDs) {
      const control = controlMap.get(id);
      selected.removeById(id);
      controlMap.delete(id);
      if (control) {
        control.destroy();
      }
    }
    __privateSet(this, _controls, [...controlMap.values()]);
    __privateMethod(this, _updateSubscribers, updateSubscribers_fn).call(this);
  }
  /**
   * @returns {IterableIterator<ControlStore>} All controls.
   */
  values() {
    return __privateGet(this, _controlMap).values();
  }
  /**
   * @param {function(ControlStore[]): void} handler - Callback function that is invoked on update / changes.
   *
   * @returns {(function(): void)} Unsubscribe function.
   */
  subscribe(handler) {
    __privateGet(this, _subscriptions).push(handler);
    handler(__privateGet(this, _controls));
    return () => {
      const index2 = __privateGet(this, _subscriptions).findIndex((sub) => sub === handler);
      if (index2 >= 0) {
        __privateGet(this, _subscriptions).splice(index2, 1);
      }
    };
  }
};
_controls = new WeakMap();
_controlMap = new WeakMap();
_data2 = new WeakMap();
_selectedAPI = new WeakMap();
_selectedDragAPI = new WeakMap();
_stores2 = new WeakMap();
_subscriptions = new WeakMap();
_updateSubscribers = new WeakSet();
updateSubscribers_fn = function() {
  const subscriptions = __privateGet(this, _subscriptions);
  if (subscriptions.length > 0) {
    for (let cntr = 0; cntr < subscriptions.length; cntr++) {
      subscriptions[cntr](__privateGet(this, _controls));
    }
  }
};
var _data3, _dragBoundingRect, _dragUpdate, _primaryControl, _selectedMap, _transformDataMap, _unsubscribeMap, _quickToMap, _onDragMove, onDragMove_fn, _onDragStart, onDragStart_fn;
var SelectedAPI = class {
  /**
   * @param {ControlsData} data - The main ControlStore data object.
   */
  constructor(data) {
    __privateAdd(this, _onDragMove);
    __privateAdd(this, _onDragStart);
    /**
     * Stores the main ControlStore data object.
     *
     * @type {ControlsData}
     */
    __privateAdd(this, _data3, void 0);
    /**
     * Initial bounding rect when drag starts.
     *
     * @type {DOMRect}
     */
    __privateAdd(this, _dragBoundingRect, new DOMRect());
    /**
     * Data to send selected control position instances.
     *
     * @type {{top: number, left: number}}
     */
    __privateAdd(this, _dragUpdate, { top: 0, left: 0 });
    /**
     * @type {ControlStore}
     */
    __privateAdd(this, _primaryControl, void 0);
    /**
     * @type {Map<*, ControlStore>}
     */
    __privateAdd(this, _selectedMap, /* @__PURE__ */ new Map());
    /**
     * @type {Map<*, TransformData>}
     */
    __privateAdd(this, _transformDataMap, /* @__PURE__ */ new Map());
    /**
     * @type {Map<*, Function>}
     */
    __privateAdd(this, _unsubscribeMap, /* @__PURE__ */ new Map());
    /**
     * @type {Map<*, Function>}
     */
    __privateAdd(this, _quickToMap, /* @__PURE__ */ new Map());
    __privateSet(this, _data3, data);
    const selectedDragAPI = {
      onStart: __privateMethod(this, _onDragStart, onDragStart_fn).bind(this),
      onMove: __privateMethod(this, _onDragMove, onDragMove_fn).bind(this)
    };
    return [this, selectedDragAPI];
  }
  /**
   * @param {ControlStore}   control - A control store.
   *
   * @param {boolean}        setPrimary - Make added control the primary control.
   */
  add(control, setPrimary = true) {
    const controlId = control.id;
    if (__privateGet(this, _selectedMap).has(controlId)) {
      return;
    }
    __privateGet(this, _selectedMap).set(controlId, control);
    __privateGet(this, _quickToMap).set(controlId, control.position.animate.quickTo(["top", "left"], { duration: 0.1 }));
    if (setPrimary && __privateGet(this, _primaryControl)) {
      __privateGet(this, _primaryControl).isPrimary = false;
      __privateSet(this, _primaryControl, void 0);
    }
    if (setPrimary) {
      control.isPrimary = true;
      __privateSet(this, _primaryControl, control);
    }
    control.selected = true;
    const unsubscribe = control.position.stores.transform.subscribe(
      (data) => __privateGet(this, _transformDataMap).set(controlId, data)
    );
    __privateGet(this, _unsubscribeMap).set(controlId, unsubscribe);
  }
  clear() {
    if (__privateGet(this, _primaryControl)) {
      __privateGet(this, _primaryControl).isPrimary = false;
      __privateSet(this, _primaryControl, void 0);
    }
    for (const control of __privateGet(this, _selectedMap).values()) {
      const unsubscribe = __privateGet(this, _unsubscribeMap).get(control.id);
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
      control.selected = false;
    }
    __privateGet(this, _transformDataMap).clear();
    __privateGet(this, _unsubscribeMap).clear();
    __privateGet(this, _quickToMap).clear();
    __privateGet(this, _selectedMap).clear();
  }
  /**
   * @returns {IterableIterator<[*, ControlStore]>} Selected control entries iterator.
   */
  entries() {
    return __privateGet(this, _selectedMap).entries();
  }
  /**
   * @returns {ControlStore} The primary control store.
   */
  getPrimary() {
    return __privateGet(this, _primaryControl);
  }
  /**
   * @returns {IterableIterator<*>} Selected control keys iterator.
   */
  keys() {
    return __privateGet(this, _selectedMap).keys();
  }
  /**
   * @param {ControlStore}   control - A control store.
   */
  remove(control) {
    if (__privateGet(this, _primaryControl) === control) {
      __privateGet(this, _primaryControl).isPrimary = false;
      __privateSet(this, _primaryControl, void 0);
    }
    const controlId = control.id;
    if (__privateGet(this, _selectedMap).delete(controlId)) {
      const unsubscribe = __privateGet(this, _unsubscribeMap).get(controlId);
      __privateGet(this, _unsubscribeMap).delete(controlId);
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
      __privateGet(this, _transformDataMap).delete(controlId);
      __privateGet(this, _quickToMap).delete(controlId);
      control.selected = false;
    }
  }
  /**
   * @param {*}   controlId - An ID for a control store to remove.
   */
  removeById(controlId) {
    var _a;
    if (((_a = __privateGet(this, _primaryControl)) == null ? void 0 : _a.id) === controlId) {
      __privateGet(this, _primaryControl).isPrimary = false;
      __privateSet(this, _primaryControl, void 0);
    }
    const control = __privateGet(this, _selectedMap).get(controlId);
    if (control) {
      const unsubscribe = __privateGet(this, _unsubscribeMap).get(controlId);
      __privateGet(this, _unsubscribeMap).delete(controlId);
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
      __privateGet(this, _transformDataMap).delete(controlId);
      __privateGet(this, _quickToMap).delete(controlId);
      __privateGet(this, _selectedMap).delete(controlId);
      control.selected = false;
    }
  }
  setPrimary(control) {
    if (__privateGet(this, _primaryControl) && __privateGet(this, _primaryControl) !== control) {
      __privateGet(this, _primaryControl).isPrimary = false;
      __privateSet(this, _primaryControl, void 0);
    }
    __privateSet(this, _primaryControl, control);
    control.isPrimary = true;
  }
  /**
   * Processes all selected controls transformed bounds to create a single combined bounding rect.
   *
   * @param {DOMRect} [boundingRect] - A DOMRect to store calculations or one will be created.
   *
   * @returns {DOMRect} Bounding rect.
   */
  getBoundingRect(boundingRect = new DOMRect()) {
    let maxX = Number.MIN_SAFE_INTEGER;
    let maxY = Number.MIN_SAFE_INTEGER;
    let minX = Number.MAX_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;
    for (const transformData of __privateGet(this, _transformDataMap).values()) {
      const controlRect = transformData.boundingRect;
      if (controlRect.right > maxX) {
        maxX = controlRect.right;
      }
      if (controlRect.left < minX) {
        minX = controlRect.left;
      }
      if (controlRect.bottom > maxY) {
        maxY = controlRect.bottom;
      }
      if (controlRect.top < minY) {
        minY = controlRect.top;
      }
    }
    boundingRect.x = minX;
    boundingRect.y = minY;
    boundingRect.width = maxX - minX;
    boundingRect.height = maxY - minY;
    return boundingRect;
  }
  /**
   * @returns {IterableIterator<object>} Selected controls iterator.
   */
  values() {
    return __privateGet(this, _selectedMap).values();
  }
};
_data3 = new WeakMap();
_dragBoundingRect = new WeakMap();
_dragUpdate = new WeakMap();
_primaryControl = new WeakMap();
_selectedMap = new WeakMap();
_transformDataMap = new WeakMap();
_unsubscribeMap = new WeakMap();
_quickToMap = new WeakMap();
_onDragMove = new WeakSet();
onDragMove_fn = function(event) {
  let { tX, tY } = event.detail;
  const dragUpdate = __privateGet(this, _dragUpdate);
  const validationRect = __privateGet(this, _data3).boundingRect;
  const validate = __privateGet(this, _data3).validate;
  if (validate && validationRect) {
    const boundingRect = __privateGet(this, _dragBoundingRect);
    let x = boundingRect.x + tX;
    let y = boundingRect.y + tY;
    const left = boundingRect.left + tX;
    const right = boundingRect.right + tX;
    const bottom = boundingRect.bottom + tY;
    const top = boundingRect.top + tY;
    const initialX = x;
    const initialY = y;
    if (bottom > validationRect.bottom) {
      y += validationRect.bottom - bottom;
    }
    if (right > validationRect.right) {
      x += validationRect.right - right;
    }
    if (top < 0) {
      y += Math.abs(top);
    }
    if (left < 0) {
      x += Math.abs(left);
    }
    tX -= initialX - x;
    tY -= initialY - y;
  }
  for (const quickTo of __privateGet(this, _quickToMap).values()) {
    dragUpdate.left = quickTo.initialPosition.left + tX;
    dragUpdate.top = quickTo.initialPosition.top + tY;
    quickTo(dragUpdate);
  }
};
_onDragStart = new WeakSet();
onDragStart_fn = function() {
  for (const controlId of this.keys()) {
    const control = __privateGet(this, _selectedMap).get(controlId);
    const quickTo = __privateGet(this, _quickToMap).get(controlId);
    quickTo.initialPosition = control.position.get();
  }
  this.getBoundingRect(__privateGet(this, _dragBoundingRect));
};

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/layers/position-control/selection.js
function selection(node, {
  active = true,
  constrain = true,
  capture = false,
  background = "rgba(255, 255, 255, 0.5)",
  width = 2
} = {}) {
  const initialDragPoint = { x: 0, y: 0 };
  const selectionRect = new DOMRect();
  let dragging = false;
  let spanEl;
  const handlers = {
    dragDown: ["pointerdown", (e) => onDragPointerDown(e), false],
    dragChange: ["pointermove", (e) => onDragPointerChange(e), false],
    dragUp: ["pointerup", (e) => onDragPointerUp(e), false]
  };
  function activateListeners() {
    node.addEventListener(...handlers.dragDown);
  }
  function removeListeners() {
    node.removeEventListener(...handlers.dragDown);
    node.removeEventListener(...handlers.dragChange);
    node.removeEventListener(...handlers.dragUp);
  }
  if (active) {
    activateListeners();
  }
  function onDragPointerDown(event) {
    if (event.target !== node) {
      return;
    }
    if (event.button !== 0 || !event.isPrimary) {
      return;
    }
    if (capture) {
      event.preventDefault();
      event.stopPropagation();
    }
    const nodeRect = node.getBoundingClientRect();
    selectionRect.x = initialDragPoint.x = event.clientX - nodeRect.left;
    selectionRect.y = initialDragPoint.y = event.clientY - nodeRect.top;
    selectionRect.width = 0;
    selectionRect.height = 0;
    if (constrain) {
      if (selectionRect.x < 0) {
        selectionRect.x = 0;
      }
      if (selectionRect.y < 0) {
        selectionRect.x = 0;
      }
    }
    dragging = false;
    node.addEventListener(...handlers.dragChange);
    node.addEventListener(...handlers.dragUp);
    node.setPointerCapture(event.pointerId);
    node.dispatchEvent(new CustomEvent("selection:start", { bubbles: false }));
  }
  function onDragPointerChange(event) {
    if ((event.buttons & 1) === 0) {
      onDragPointerUp(event);
      return;
    }
    if (capture) {
      event.preventDefault();
      event.stopPropagation();
    }
    const nodeRect = node.getBoundingClientRect();
    selectionRect.width = event.clientX - initialDragPoint.x - nodeRect.left;
    selectionRect.height = event.clientY - initialDragPoint.y - nodeRect.top;
    if (constrain) {
      const bottom = nodeRect.bottom - nodeRect.top;
      const right = nodeRect.right - nodeRect.left;
      if (selectionRect.left < 0) {
        selectionRect.width += selectionRect.width >= 0 ? selectionRect.left : -selectionRect.left;
      }
      if (selectionRect.top < 0) {
        selectionRect.height += selectionRect.height >= 0 ? selectionRect.top : -selectionRect.top;
      }
      if (selectionRect.right > right) {
        selectionRect.width += selectionRect.width >= 0 ? right - selectionRect.right : -(right - selectionRect.right);
      }
      if (selectionRect.bottom > bottom) {
        selectionRect.height += selectionRect.height >= 0 ? bottom - selectionRect.bottom : -(bottom - selectionRect.bottom);
      }
    }
    if (!dragging && (selectionRect.width !== 0 || selectionRect.height !== 0)) {
      spanEl = document.createElement("span");
      spanEl.style.position = "absolute";
      spanEl.style.background = `var(--tjs-action-selection-background, ${background})`;
      spanEl.style.pointerEvents = "none";
      spanEl.style.clipPath = `polygon(0% 0%, 0% 100%, ${width}px 100%, ${width}px ${width}px, calc(100% - ${width}px) ${width}px, calc(100% - ${width}px) calc(100% - ${width}px), ${width}px calc(100% - ${width}px), ${width}px 100%, 100% 100%, 100% 0%)`;
      spanEl.style.zIndex = `${Number.MAX_SAFE_INTEGER}`;
      dragging = true;
      node.append(spanEl);
    }
    if (spanEl) {
      spanEl.style.width = `${selectionRect.right - selectionRect.left}px`;
      spanEl.style.height = `${selectionRect.bottom - selectionRect.top}px`;
      spanEl.style.left = `${selectionRect.left}px`;
      spanEl.style.top = `${selectionRect.top}px`;
    }
    node.dispatchEvent(new CustomEvent("selection:change", {
      detail: { rect: DOMRectReadOnly.fromRect(selectionRect) },
      bubbles: false
    }));
  }
  function onDragPointerUp(event) {
    if (capture) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (spanEl) {
      spanEl.remove();
      spanEl = void 0;
    }
    node.removeEventListener(...handlers.dragChange);
    node.removeEventListener(...handlers.dragUp);
    if (dragging) {
      node.dispatchEvent(new CustomEvent("selection:end", {
        detail: {
          ctrlKey: event.ctrlKey,
          shiftKey: event.shiftKey,
          metaKey: event.metaKey,
          rect: DOMRectReadOnly.fromRect(selectionRect)
        },
        bubbles: false
      }));
    }
    dragging = false;
  }
  return {
    // The default of active being true won't automatically add listeners twice.
    update: (options) => {
      if (typeof options.active === "boolean") {
        active = options.active;
        if (active) {
          activateListeners();
        } else {
          dragging = false;
          if (spanEl) {
            spanEl.remove();
            spanEl = void 0;
          }
          removeListeners();
        }
      }
    },
    destroy: () => removeListeners()
  };
}

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/layers/position-control/TJSPositionControlLayer.svelte
var file16 = "node_modules\\@typhonjs-fvtt\\svelte-standard\\_dist\\component\\standard\\layers\\position-control\\TJSPositionControlLayer.svelte";
function add_css16(target) {
  append_styles(target, "svelte-12ooy71", "div.svelte-12ooy71{width:100%;height:100%}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVEpTUG9zaXRpb25Db250cm9sTGF5ZXIuc3ZlbHRlIiwibWFwcGluZ3MiOiJBQXVGRyxrQkFBQSxDQUNHLEtBQUEsQ0FBQSxJQUFXLENBQ1gsTUFBQSxDQUFBLElBQ0giLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiVEpTUG9zaXRpb25Db250cm9sTGF5ZXIuc3ZlbHRlIl19 */");
}
function get_each_context3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[15] = list[i];
  return child_ctx;
}
function create_else_block5(ctx) {
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[12].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[11],
    null
  );
  const block = {
    c: function create() {
      if (default_slot)
        default_slot.c();
    },
    m: function mount(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p: function update(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        2048)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[11],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[11]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[11],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_else_block5.name,
    type: "else",
    source: "(83:0) {:else}",
    ctx
  });
  return block;
}
function create_if_block10(ctx) {
  let div;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let t;
  let selection_action;
  let current;
  let mounted;
  let dispose;
  let each_value = (
    /*$controls*/
    ctx[3]
  );
  validate_each_argument(each_value);
  const get_key = (ctx2) => (
    /*control*/
    ctx2[15].id
  );
  validate_each_keys(ctx, each_value, get_each_context3, get_key);
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context3(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block3(key, child_ctx));
  }
  const default_slot_template = (
    /*#slots*/
    ctx[12].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[11],
    null
  );
  const block = {
    c: function create() {
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t = space();
      if (default_slot)
        default_slot.c();
      attr_dev(div, "class", "svelte-12ooy71");
      add_location(div, file16, 74, 0, 2009);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div, null);
        }
      }
      append_dev(div, t);
      if (default_slot) {
        default_slot.m(div, null);
      }
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(selection_action = selection.call(null, div, { active: (
            /*ctrlKey*/
            ctx[2]
          ), width: 4 })),
          listen_dev(
            div,
            "mousedown",
            /*onMouseDown*/
            ctx[6],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            div,
            "selection:end",
            /*onSelectionEnd*/
            ctx[7],
            false,
            false,
            false,
            false
          )
        ];
        mounted = true;
      }
    },
    p: function update(ctx2, dirty) {
      if (dirty & /*$controls*/
      8) {
        each_value = /*$controls*/
        ctx2[3];
        validate_each_argument(each_value);
        group_outros();
        validate_each_keys(ctx2, each_value, get_each_context3, get_key);
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, div, outro_and_destroy_block, create_each_block3, t, get_each_context3);
        check_outros();
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        2048)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[11],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[11]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[11],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (selection_action && is_function(selection_action.update) && dirty & /*ctrlKey*/
      4)
        selection_action.update.call(null, { active: (
          /*ctrlKey*/
          ctx2[2]
        ), width: 4 });
    },
    i: function intro(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block10.name,
    type: "if",
    source: "(74:0) {#if active}",
    ctx
  });
  return block;
}
function create_each_block3(key_1, ctx) {
  let first;
  let positioncontrol;
  let current;
  positioncontrol = new PositionControl_default({
    props: { control: (
      /*control*/
      ctx[15]
    ) },
    $$inline: true
  });
  const block = {
    key: key_1,
    first: null,
    c: function create() {
      first = empty();
      create_component(positioncontrol.$$.fragment);
      this.first = first;
    },
    m: function mount(target, anchor) {
      insert_dev(target, first, anchor);
      mount_component(positioncontrol, target, anchor);
      current = true;
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      const positioncontrol_changes = {};
      if (dirty & /*$controls*/
      8)
        positioncontrol_changes.control = /*control*/
        ctx[15];
      positioncontrol.$set(positioncontrol_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(positioncontrol.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(positioncontrol.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(first);
      destroy_component(positioncontrol, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_each_block3.name,
    type: "each",
    source: "(78:3) {#each $controls as control (control.id)}",
    ctx
  });
  return block;
}
function create_fragment18(ctx) {
  let t;
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block10, create_else_block5];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*active*/
      ctx2[1]
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx, -1);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  const block = {
    c: function create() {
      t = space();
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
      if (!mounted) {
        dispose = [
          listen_dev(
            document.body,
            "keydown",
            /*onKeyDown*/
            ctx[4],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            document.body,
            "keyup",
            /*onKeyUp*/
            ctx[5],
            true,
            false,
            false,
            false
          )
        ];
        mounted = true;
      }
    },
    p: function update(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2, dirty);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(t);
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach_dev(if_block_anchor);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment18.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance18($$self, $$props, $$invalidate) {
  let $controls, $$unsubscribe_controls = noop, $$subscribe_controls = () => ($$unsubscribe_controls(), $$unsubscribe_controls = subscribe(controls, ($$value) => $$invalidate(3, $controls = $$value)), controls);
  $$self.$$.on_destroy.push(() => $$unsubscribe_controls());
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TJSPositionControlLayer", slots, ["default"]);
  const [controlsStore, selectedDragAPI] = new ControlsStore();
  let { controls = controlsStore } = $$props;
  validate_store(controls, "controls");
  $$subscribe_controls();
  let { components = void 0 } = $$props;
  let { active = true } = $$props;
  let { boundingRect = void 0 } = $$props;
  let { validate = true } = $$props;
  setContext("#pclControls", controls);
  setContext("#pclSelectedDragAPI", selectedDragAPI);
  let ctrlKey = false;
  function onKeyDown(event) {
    if (event.key === "Control" && !event.repeat) {
      $$invalidate(2, ctrlKey = true);
      $$invalidate(0, controls.enabled = true, controls);
    }
  }
  function onKeyUp(event) {
    if (event.key === "Control" && !event.repeat) {
      $$invalidate(2, ctrlKey = false);
      $$invalidate(0, controls.enabled = false, controls);
    }
  }
  function onMouseDown(event) {
    if (!event.ctrlKey) {
      controls.selected.clear();
    }
  }
  function onSelectionEnd(event) {
    const rect = event.detail.rect;
    for (const control of $controls) {
      const position = control.position;
      const top = position.top;
      const left = position.left;
      const bottom = top + position.height;
      const right = left + position.width;
      const xOverlap = Math.max(0, Math.min(right, rect.right) - Math.max(left, rect.left));
      const yOverlap = Math.max(0, Math.min(bottom, rect.bottom) - Math.max(top, rect.top));
      if (xOverlap > 0 && yOverlap > 0) {
        controls.selected.add(control, false);
      } else {
        if (!event.detail.shiftKey) {
          controls.selected.remove(control);
        }
      }
    }
  }
  const writable_props = ["controls", "components", "active", "boundingRect", "validate"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<TJSPositionControlLayer> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("controls" in $$props2)
      $$subscribe_controls($$invalidate(0, controls = $$props2.controls));
    if ("components" in $$props2)
      $$invalidate(8, components = $$props2.components);
    if ("active" in $$props2)
      $$invalidate(1, active = $$props2.active);
    if ("boundingRect" in $$props2)
      $$invalidate(9, boundingRect = $$props2.boundingRect);
    if ("validate" in $$props2)
      $$invalidate(10, validate = $$props2.validate);
    if ("$$scope" in $$props2)
      $$invalidate(11, $$scope = $$props2.$$scope);
  };
  $$self.$capture_state = () => ({
    setContext,
    PositionControl: PositionControl_default,
    ControlsStore,
    selection,
    controlsStore,
    selectedDragAPI,
    controls,
    components,
    active,
    boundingRect,
    validate,
    ctrlKey,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onSelectionEnd,
    $controls
  });
  $$self.$inject_state = ($$props2) => {
    if ("controls" in $$props2)
      $$subscribe_controls($$invalidate(0, controls = $$props2.controls));
    if ("components" in $$props2)
      $$invalidate(8, components = $$props2.components);
    if ("active" in $$props2)
      $$invalidate(1, active = $$props2.active);
    if ("boundingRect" in $$props2)
      $$invalidate(9, boundingRect = $$props2.boundingRect);
    if ("validate" in $$props2)
      $$invalidate(10, validate = $$props2.validate);
    if ("ctrlKey" in $$props2)
      $$invalidate(2, ctrlKey = $$props2.ctrlKey);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*boundingRect*/
    512) {
      $:
        $$invalidate(0, controls.boundingRect = boundingRect, controls);
    }
    if ($$self.$$.dirty & /*validate*/
    1024) {
      $:
        $$invalidate(0, controls.validate = validate, controls);
    }
    if ($$self.$$.dirty & /*controls, components*/
    257) {
      $:
        controls.updateComponents(components);
    }
  };
  return [
    controls,
    active,
    ctrlKey,
    $controls,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onSelectionEnd,
    components,
    boundingRect,
    validate,
    $$scope,
    slots
  ];
}
var TJSPositionControlLayer = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(
      this,
      options,
      instance18,
      create_fragment18,
      safe_not_equal,
      {
        controls: 0,
        components: 8,
        active: 1,
        boundingRect: 9,
        validate: 10
      },
      add_css16
    );
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TJSPositionControlLayer",
      options,
      id: create_fragment18.name
    });
  }
  get controls() {
    throw new Error("<TJSPositionControlLayer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set controls(value) {
    throw new Error("<TJSPositionControlLayer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get components() {
    throw new Error("<TJSPositionControlLayer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set components(value) {
    throw new Error("<TJSPositionControlLayer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get active() {
    throw new Error("<TJSPositionControlLayer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set active(value) {
    throw new Error("<TJSPositionControlLayer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get boundingRect() {
    throw new Error("<TJSPositionControlLayer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set boundingRect(value) {
    throw new Error("<TJSPositionControlLayer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get validate() {
    throw new Error("<TJSPositionControlLayer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set validate(value) {
    throw new Error("<TJSPositionControlLayer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var TJSPositionControlLayer_default = TJSPositionControlLayer;

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/menu/TJSMenu.svelte
var { Error: Error_13, console: console_1, document: document_1 } = globals;
var file17 = "node_modules\\@typhonjs-fvtt\\svelte-standard\\_dist\\component\\standard\\menu\\TJSMenu.svelte";
function add_css17(target) {
  append_styles(target, "svelte-4nnklk", ".tjs-menu.svelte-4nnklk.svelte-4nnklk{position:absolute;width:max-content;height:max-content;overflow:hidden;background:var(--tjs-menu-background, var(--tjs-default-menu-background, var(--tjs-default-popup-background, #23221d)));border:var(--tjs-menu-border, var(--tjs-default-popup-border, 1px solid #000));border-radius:var(--tjs-menu-border-radius, var(--tjs-default-popup-border-radius, 5px));box-shadow:var(--tjs-menu-box-shadow, var(--tjs-default-popup-box-shadow, 0 0 2px #000));color:var(--tjs-menu-primary-color, var(--tjs-default-menu-primary-color, var(--tjs-default-popup-primary-color, #b5b3a4)));max-width:var(--tjs-menu-max-width, var(--tjs-default-menu-max-width, 360px));min-width:var(--tjs-menu-min-width, var(--tjs-default-menu-min-width, 20px));text-align:start;z-index:var(--tjs-menu-z-index, var(--tjs-default-popup-z-index, 100))}.tjs-menu.svelte-4nnklk.svelte-4nnklk:focus-visible{outline:var(--tjs-default-a11y-outline-focus-visible, 2px solid transparent)}.tjs-menu-items.svelte-4nnklk.svelte-4nnklk{margin:0;padding:0}.tjs-menu-items.svelte-4nnklk hr.svelte-4nnklk{margin-block-start:0;margin-block-end:0;margin:var(--tjs-menu-hr-margin, var(--tjs-default-hr-margin, 0 0.25em));border-top:var(--tjs-menu-hr-border-top, var(--tjs-default-hr-border-top, 1px solid #555));border-bottom:var(--tjs-menu-hr-border-bottom, var(--tjs-default-hr-border-bottom, 1px solid #444))}.tjs-menu-item.svelte-4nnklk.svelte-4nnklk{display:flex;align-items:center;line-height:var(--tjs-menu-item-line-height, var(--tjs-default-menu-item-line-height, 2em));padding:var(--tjs-menu-item-padding, var(--tjs-default-menu-item-padding, 0 0.5em 0 0))}.tjs-menu-item.svelte-4nnklk.svelte-4nnklk:focus-within,.tjs-menu-item.svelte-4nnklk.svelte-4nnklk:focus-visible{outline:none}.tjs-menu-item.svelte-4nnklk i.svelte-4nnklk{text-align:center;width:var(--tjs-menu-item-icon-width, var(--tjs-default-menu-item-icon-width, 1.25em))}.tjs-menu-item.svelte-4nnklk img.svelte-4nnklk{width:var(--tjs-menu-item-image-width, var(--tjs-default-menu-item-image-width, 1.25em));height:var(--tjs-menu-item-image-height, var(--tjs-default-menu-item-image-height, 1.25em))}.tjs-menu-item-button.svelte-4nnklk.svelte-4nnklk{gap:var(--tjs-menu-item-button-gap, var(--tjs-default-menu-item-button-gap, 0.25em))}.tjs-menu-item-button.svelte-4nnklk.svelte-4nnklk:hover{color:var(--tjs-menu-item-highlight-color, var(--tjs-default-menu-highlight-color, var(--tjs-default-popup-highlight-color, #f0f0e0)));text-shadow:var(--tjs-menu-item-text-shadow-focus-hover, var(--tjs-default-text-shadow-focus-hover, 0 0 8px red))}.tjs-menu-item-button.svelte-4nnklk.svelte-4nnklk:focus-visible{color:var(--tjs-menu-item-highlight-color, var(--tjs-default-menu-highlight-color, var(--tjs-default-popup-highlight-color, #f0f0e0)));text-shadow:var(--tjs-menu-item-text-shadow-focus-hover, var(--tjs-default-text-shadow-focus-hover, 0 0 8px red))}.tjs-menu-focus-indicator.svelte-4nnklk.svelte-4nnklk{align-self:var(--tjs-menu-focus-indicator-align-self, var(--tjs-default-focus-indicator-align-self, stretch));border:var(--tjs-menu-focus-indicator-border, var(--tjs-default-focus-indicator-border));border-radius:var(--tjs-menu-focus-indicator-border-radius, var(--tjs-default-focus-indicator-border-radius, 0.1em));height:var(--tjs-menu-focus-indicator-height, var(--tjs-default-focus-indicator-height));width:var(--tjs-menu-focus-indicator-width, var(--tjs-default-focus-indicator-width, 0.25em));transition:var(--tjs-menu-focus-indicator-transition, var(--tjs-default-focus-indicator-transition))}.tjs-menu-item.svelte-4nnklk:focus-within:has(:focus-visible) .tjs-menu-focus-indicator.svelte-4nnklk{background:var(--tjs-menu-focus-indicator-background, var(--tjs-default-focus-indicator-background, white))}@supports not (selector(:has(*))){.tjs-menu-item.svelte-4nnklk:focus-within .tjs-menu-focus-indicator.svelte-4nnklk{background:var(--tjs-menu-focus-indicator-background, var(--tjs-default-focus-indicator-background, white))}}.tjs-menu-item.svelte-4nnklk:focus-visible .tjs-menu-focus-indicator.svelte-4nnklk{background:var(--tjs-menu-focus-indicator-background, var(--tjs-default-focus-indicator-background, white))}.tjs-menu-item-label.svelte-4nnklk.svelte-4nnklk{overflow:var(--tjs-menu-item-label-overflow, var(--tjs-default-menu-item-label-overflow, hidden));text-overflow:var(--tjs-menu-item-label-text-overflow, var(--tjs-default-menu-item-label-text-overflow, ellipsis));white-space:var(--tjs-menu-item-label-white-space, var(--tjs-default-menu-item-label-white-space))}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVEpTTWVudS5zdmVsdGUiLCJtYXBwaW5ncyI6IkFBK2lCRyxxQ0FBQSxDQUNHLFFBQUEsQ0FBQSxRQUFrQixDQUNsQixLQUFBLENBQUEsV0FBa0IsQ0FDbEIsTUFBQSxDQUFBLFdBQW1CLENBQ25CLFFBQUEsQ0FBQSxNQUFnQixDQUVoQixVQUFBLENBQUEsSUFBQSxxQkFBQSxDQUFBLGlGQUFBLENBQXdILENBQ3hILE1BQUEsQ0FBQSxJQUFBLGlCQUFBLENBQUEsZ0RBQUEsQ0FBK0UsQ0FDL0UsYUFBQSxDQUFBLElBQUEsd0JBQUEsQ0FBQSw0Q0FBQSxDQUF5RixDQUN6RixVQUFBLENBQUEsSUFBQSxxQkFBQSxDQUFBLGtEQUFBLENBQXlGLENBQ3pGLEtBQUEsQ0FBQSxJQUFBLHdCQUFBLENBQUEsdUZBQUEsQ0FBNEgsQ0FDNUgsU0FBQSxDQUFBLElBQUEsb0JBQUEsQ0FBQSx5Q0FBQSxDQUE4RSxDQUM5RSxTQUFBLENBQUEsSUFBQSxvQkFBQSxDQUFBLHdDQUFBLENBQTZFLENBRTdFLFVBQUEsQ0FBQSxLQUFpQixDQUdqQixPQUFBLENBQUEsSUFBQSxrQkFBQSxDQUFBLHNDQUFBLENBQ0gsQ0FFQSxxQ0FBQSxjQUFBLENBQ0csT0FBQSxDQUFBLElBQUEsd0NBQUEsQ0FBQSxzQkFBQSxDQUNILENBRUEsMkNBQUEsQ0FDRyxNQUFBLENBQUEsQ0FBUyxDQUNULE9BQUEsQ0FBQSxDQUNILENBRUEsNkJBQUEsQ0FBQSxnQkFBQSxDQUNHLGtCQUFBLENBQUEsQ0FBcUIsQ0FDckIsZ0JBQUEsQ0FBQSxDQUFtQixDQUNuQixNQUFBLENBQUEsSUFBQSxvQkFBQSxDQUFBLHVDQUFBLENBQXlFLENBQ3pFLFVBQUEsQ0FBQSxJQUFBLHdCQUFBLENBQUEsaURBQUEsQ0FBMkYsQ0FDM0YsYUFBQSxDQUFBLElBQUEsMkJBQUEsQ0FBQSxvREFBQSxDQUNILENBRUEsMENBQUEsQ0FDRyxPQUFBLENBQUEsSUFBYSxDQUNiLFdBQUEsQ0FBQSxNQUFtQixDQUNuQixXQUFBLENBQUEsSUFBQSwyQkFBQSxDQUFBLDhDQUFBLENBQTRGLENBQzVGLE9BQUEsQ0FBQSxJQUFBLHVCQUFBLENBQUEsa0RBQUEsQ0FDSCxDQUdBLDBDQUFBLGFBQUEsQ0FBQSwwQ0FBQSxjQUFBLENBQ0csT0FBQSxDQUFBLElBQ0gsQ0FFQSw0QkFBQSxDQUFBLGVBQUEsQ0FDRyxVQUFBLENBQUEsTUFBa0IsQ0FDbEIsS0FBQSxDQUFBLElBQUEsMEJBQUEsQ0FBQSxnREFBQSxDQUNILENBRUEsNEJBQUEsQ0FBQSxpQkFBQSxDQUNHLEtBQUEsQ0FBQSxJQUFBLDJCQUFBLENBQUEsaURBQUEsQ0FBeUYsQ0FDekYsTUFBQSxDQUFBLElBQUEsNEJBQUEsQ0FBQSxrREFBQSxDQUNILENBRUEsaURBQUEsQ0FDRyxHQUFBLENBQUEsSUFBQSwwQkFBQSxDQUFBLGdEQUFBLENBQ0gsQ0FFQSxpREFBQSxNQUFBLENBQ0csS0FBQSxDQUFBLElBQUEsK0JBQUEsQ0FBQSwyRkFBQSxDQUF1SSxDQUN2SSxXQUFBLENBQUEsSUFBQSx1Q0FBQSxDQUFBLHdEQUFBLENBQ0gsQ0FFQSxpREFBQSxjQUFBLENBQ0csS0FBQSxDQUFBLElBQUEsK0JBQUEsQ0FBQSwyRkFBQSxDQUF1SSxDQUN2SSxXQUFBLENBQUEsSUFBQSx1Q0FBQSxDQUFBLHdEQUFBLENBQ0gsQ0FFQSxxREFBQSxDQUNHLFVBQUEsQ0FBQSxJQUFBLHFDQUFBLENBQUEsdURBQUEsQ0FBOEcsQ0FDOUcsTUFBQSxDQUFBLElBQUEsaUNBQUEsQ0FBQSwwQ0FBQSxDQUF5RixDQUN6RixhQUFBLENBQUEsSUFBQSx3Q0FBQSxDQUFBLHdEQUFBLENBQXFILENBQ3JILE1BQUEsQ0FBQSxJQUFBLGlDQUFBLENBQUEsMENBQUEsQ0FBeUYsQ0FDekYsS0FBQSxDQUFBLElBQUEsZ0NBQUEsQ0FBQSxpREFBQSxDQUE4RixDQUM5RixVQUFBLENBQUEsSUFBQSxxQ0FBQSxDQUFBLDhDQUFBLENBQ0gsQ0FJQSw0QkFBQSxhQUFBLEtBQUEsY0FBQSxDQUFBLENBQUEsdUNBQUEsQ0FDRyxVQUFBLENBQUEsSUFBQSxxQ0FBQSxDQUFBLHFEQUFBLENBQ0gsQ0FHQSxVQUFBLEdBQUEsQ0FBQSxDQUFBLFNBQUEsT0FBQSxDQUFBLENBQUEsQ0FDRyw0QkFBQSxhQUFBLENBQUEsdUNBQUEsQ0FDRyxVQUFBLENBQUEsSUFBQSxxQ0FBQSxDQUFBLHFEQUFBLENBQ0gsQ0FDSCxDQUdBLDRCQUFBLGNBQUEsQ0FBQSx1Q0FBQSxDQUNHLFVBQUEsQ0FBQSxJQUFBLHFDQUFBLENBQUEscURBQUEsQ0FDSCxDQUVBLGdEQUFBLENBQ0csUUFBQSxDQUFBLElBQUEsOEJBQUEsQ0FBQSxvREFBQSxDQUFrRyxDQUNsRyxhQUFBLENBQUEsSUFBQSxtQ0FBQSxDQUFBLDJEQUFBLENBQW1ILENBQ25ILFdBQUEsQ0FBQSxJQUFBLGlDQUFBLENBQUEsK0NBQUEsQ0FDSCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJUSlNNZW51LnN2ZWx0ZSJdfQ== */");
}
var get_after_slot_changes = (dirty) => ({});
var get_after_slot_context = (ctx) => ({});
function get_each_context4(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[36] = list[i];
  return child_ctx;
}
var get_before_slot_changes = (dirty) => ({});
var get_before_slot_context = (ctx) => ({});
function create_if_block_6(ctx) {
  var _a, _b;
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    isObject(
      /*menu*/
      (_b = (_a = ctx[2]) == null ? void 0 : _a.slotDefault) == null ? void 0 : _b.props
    ) ? (
      /*menu*/
      ctx[2].slotDefault.props
    ) : {}
  ];
  var switch_value = (
    /*menu*/
    ctx[2].slotDefault.class
  );
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return {
      props: switch_instance_props,
      $$inline: true
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
  }
  const block = {
    c: function create() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      var _a2, _b2;
      const switch_instance_changes = dirty[0] & /*menu*/
      4 ? get_spread_update(switch_instance_spread_levels, [
        get_spread_object(isObject(
          /*menu*/
          (_b2 = (_a2 = ctx2[2]) == null ? void 0 : _a2.slotDefault) == null ? void 0 : _b2.props
        ) ? (
          /*menu*/
          ctx2[2].slotDefault.props
        ) : {})
      ]) : {};
      if (dirty[0] & /*menu*/
      4 && switch_value !== (switch_value = /*menu*/
      ctx2[2].slotDefault.class)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_6.name,
    type: "if",
    source: "(491:9) {#if isSvelteComponent(menu?.slotDefault?.class)}",
    ctx
  });
  return block;
}
function fallback_block4(ctx) {
  var _a, _b;
  let show_if = isSvelteComponent(
    /*menu*/
    (_b = (_a = ctx[2]) == null ? void 0 : _a.slotDefault) == null ? void 0 : _b.class
  );
  let if_block_anchor;
  let current;
  let if_block = show_if && create_if_block_6(ctx);
  const block = {
    c: function create() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      var _a2, _b2;
      if (dirty[0] & /*menu*/
      4)
        show_if = isSvelteComponent(
          /*menu*/
          (_b2 = (_a2 = ctx2[2]) == null ? void 0 : _a2.slotDefault) == null ? void 0 : _b2.class
        );
      if (show_if) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & /*menu*/
          4) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_6(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: fallback_block4.name,
    type: "fallback",
    source: "(490:12)           ",
    ctx
  });
  return block;
}
function create_if_block_52(ctx) {
  let li;
  let span;
  let t;
  let current;
  let mounted;
  let dispose;
  const before_slot_template = (
    /*#slots*/
    ctx[19].before
  );
  const before_slot = create_slot(
    before_slot_template,
    ctx,
    /*$$scope*/
    ctx[18],
    get_before_slot_context
  );
  const block = {
    c: function create() {
      li = element("li");
      span = element("span");
      t = space();
      if (before_slot)
        before_slot.c();
      attr_dev(span, "class", "tjs-menu-focus-indicator svelte-4nnklk");
      add_location(span, file17, 502, 12, 20278);
      attr_dev(li, "class", "tjs-menu-item svelte-4nnklk");
      attr_dev(li, "role", "menuitem");
      attr_dev(li, "tabindex", "0");
      add_location(li, file17, 497, 9, 20096);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      append_dev(li, span);
      append_dev(li, t);
      if (before_slot) {
        before_slot.m(li, null);
      }
      current = true;
      if (!mounted) {
        dispose = [
          listen_dev(
            li,
            "click",
            /*click_handler*/
            ctx[20],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            li,
            "keyup",
            /*keyup_handler*/
            ctx[21],
            false,
            false,
            false,
            false
          )
        ];
        mounted = true;
      }
    },
    p: function update(ctx2, dirty) {
      if (before_slot) {
        if (before_slot.p && (!current || dirty[0] & /*$$scope*/
        262144)) {
          update_slot_base(
            before_slot,
            before_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[18],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[18]
            ) : get_slot_changes(
              before_slot_template,
              /*$$scope*/
              ctx2[18],
              dirty,
              get_before_slot_changes
            ),
            get_before_slot_context
          );
        }
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(before_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(before_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(li);
      if (before_slot)
        before_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_52.name,
    type: "if",
    source: "(496:6) {#if $$slots.before}",
    ctx
  });
  return block;
}
function create_if_block_43(ctx) {
  let hr;
  const block = {
    c: function create() {
      hr = element("hr");
      attr_dev(hr, "class", "svelte-4nnklk");
      add_location(hr, file17, 540, 12, 22102);
    },
    m: function mount(target, anchor) {
      insert_dev(target, hr, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(hr);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_43.name,
    type: "if",
    source: "(540:52) ",
    ctx
  });
  return block;
}
function create_if_block_33(ctx) {
  let li;
  let span0;
  let t0;
  let img;
  let img_src_value;
  let img_alt_value;
  let t1;
  let span1;
  let t2_value = localize(
    /*item*/
    ctx[36].label
  ) + "";
  let t2;
  let mounted;
  let dispose;
  function click_handler_32() {
    return (
      /*click_handler_3*/
      ctx[26](
        /*item*/
        ctx[36]
      )
    );
  }
  function keyup_handler_3(...args) {
    return (
      /*keyup_handler_3*/
      ctx[27](
        /*item*/
        ctx[36],
        ...args
      )
    );
  }
  const block = {
    c: function create() {
      li = element("li");
      span0 = element("span");
      t0 = space();
      img = element("img");
      t1 = space();
      span1 = element("span");
      t2 = text(t2_value);
      attr_dev(span0, "class", "tjs-menu-focus-indicator svelte-4nnklk");
      add_location(span0, file17, 535, 15, 21844);
      if (!src_url_equal(img.src, img_src_value = /*item*/
      ctx[36].image))
        attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", img_alt_value = /*item*/
      ctx[36].imageAlt);
      attr_dev(img, "class", "svelte-4nnklk");
      add_location(img, file17, 536, 15, 21899);
      attr_dev(span1, "class", "tjs-menu-item-label svelte-4nnklk");
      add_location(span1, file17, 537, 15, 21957);
      attr_dev(li, "class", "tjs-menu-item tjs-menu-item-button svelte-4nnklk");
      attr_dev(li, "role", "menuitem");
      attr_dev(li, "tabindex", "0");
      add_location(li, file17, 530, 12, 21610);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      append_dev(li, span0);
      append_dev(li, t0);
      append_dev(li, img);
      append_dev(li, t1);
      append_dev(li, span1);
      append_dev(span1, t2);
      if (!mounted) {
        dispose = [
          listen_dev(li, "click", click_handler_32, false, false, false, false),
          listen_dev(li, "keyup", keyup_handler_3, false, false, false, false)
        ];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty[0] & /*allItems*/
      8 && !src_url_equal(img.src, img_src_value = /*item*/
      ctx[36].image)) {
        attr_dev(img, "src", img_src_value);
      }
      if (dirty[0] & /*allItems*/
      8 && img_alt_value !== (img_alt_value = /*item*/
      ctx[36].imageAlt)) {
        attr_dev(img, "alt", img_alt_value);
      }
      if (dirty[0] & /*allItems*/
      8 && t2_value !== (t2_value = localize(
        /*item*/
        ctx[36].label
      ) + ""))
        set_data_dev(t2, t2_value);
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(li);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_33.name,
    type: "if",
    source: "(529:45) ",
    ctx
  });
  return block;
}
function create_if_block_24(ctx) {
  let li;
  let span0;
  let t0;
  let i;
  let i_class_value;
  let t1;
  let span1;
  let t2_value = localize(
    /*item*/
    ctx[36].label
  ) + "";
  let t2;
  let mounted;
  let dispose;
  function click_handler_2() {
    return (
      /*click_handler_2*/
      ctx[24](
        /*item*/
        ctx[36]
      )
    );
  }
  function keyup_handler_2(...args) {
    return (
      /*keyup_handler_2*/
      ctx[25](
        /*item*/
        ctx[36],
        ...args
      )
    );
  }
  const block = {
    c: function create() {
      li = element("li");
      span0 = element("span");
      t0 = space();
      i = element("i");
      t1 = space();
      span1 = element("span");
      t2 = text(t2_value);
      attr_dev(span0, "class", "tjs-menu-focus-indicator svelte-4nnklk");
      add_location(span0, file17, 524, 15, 21290);
      attr_dev(i, "class", i_class_value = null_to_empty(
        /*item*/
        ctx[36].icon
      ) + " svelte-4nnklk");
      add_location(i, file17, 525, 15, 21345);
      attr_dev(span1, "class", "tjs-menu-item-label svelte-4nnklk");
      add_location(span1, file17, 526, 15, 21386);
      attr_dev(li, "class", "tjs-menu-item tjs-menu-item-button svelte-4nnklk");
      attr_dev(li, "role", "menuitem");
      attr_dev(li, "tabindex", "0");
      add_location(li, file17, 519, 12, 21056);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      append_dev(li, span0);
      append_dev(li, t0);
      append_dev(li, i);
      append_dev(li, t1);
      append_dev(li, span1);
      append_dev(span1, t2);
      if (!mounted) {
        dispose = [
          listen_dev(li, "click", click_handler_2, false, false, false, false),
          listen_dev(li, "keyup", keyup_handler_2, false, false, false, false)
        ];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty[0] & /*allItems*/
      8 && i_class_value !== (i_class_value = null_to_empty(
        /*item*/
        ctx[36].icon
      ) + " svelte-4nnklk")) {
        attr_dev(i, "class", i_class_value);
      }
      if (dirty[0] & /*allItems*/
      8 && t2_value !== (t2_value = localize(
        /*item*/
        ctx[36].label
      ) + ""))
        set_data_dev(t2, t2_value);
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(li);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_24.name,
    type: "if",
    source: "(518:44) ",
    ctx
  });
  return block;
}
function create_if_block_17(ctx) {
  let li;
  let span;
  let t;
  let switch_instance;
  let current;
  let mounted;
  let dispose;
  const switch_instance_spread_levels = [
    isObject(
      /*item*/
      ctx[36].props
    ) ? (
      /*item*/
      ctx[36].props
    ) : {}
  ];
  var switch_value = (
    /*item*/
    ctx[36].class
  );
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return {
      props: switch_instance_props,
      $$inline: true
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
  }
  function click_handler_1() {
    return (
      /*click_handler_1*/
      ctx[22](
        /*item*/
        ctx[36]
      )
    );
  }
  function keyup_handler_1(...args) {
    return (
      /*keyup_handler_1*/
      ctx[23](
        /*item*/
        ctx[36],
        ...args
      )
    );
  }
  const block = {
    c: function create() {
      li = element("li");
      span = element("span");
      t = space();
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      attr_dev(span, "class", "tjs-menu-focus-indicator svelte-4nnklk");
      add_location(span, file17, 514, 15, 20755);
      attr_dev(li, "class", "tjs-menu-item svelte-4nnklk");
      attr_dev(li, "role", "menuitem");
      attr_dev(li, "tabindex", "0");
      add_location(li, file17, 509, 12, 20548);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      append_dev(li, span);
      append_dev(li, t);
      if (switch_instance)
        mount_component(switch_instance, li, null);
      current = true;
      if (!mounted) {
        dispose = [
          listen_dev(li, "click", click_handler_1, false, false, false, false),
          listen_dev(li, "keyup", keyup_handler_1, false, false, false, false)
        ];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      const switch_instance_changes = dirty[0] & /*allItems*/
      8 ? get_spread_update(switch_instance_spread_levels, [
        get_spread_object(isObject(
          /*item*/
          ctx[36].props
        ) ? (
          /*item*/
          ctx[36].props
        ) : {})
      ]) : {};
      if (dirty[0] & /*allItems*/
      8 && switch_value !== (switch_value = /*item*/
      ctx[36].class)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, li, null);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(li);
      if (switch_instance)
        destroy_component(switch_instance);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_17.name,
    type: "if",
    source: "(508:9) {#if item['#type'] === 'class'}",
    ctx
  });
  return block;
}
function create_each_block4(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block_17, create_if_block_24, create_if_block_33, create_if_block_43];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*item*/
      ctx2[36]["#type"] === "class"
    )
      return 0;
    if (
      /*item*/
      ctx2[36]["#type"] === "icon"
    )
      return 1;
    if (
      /*item*/
      ctx2[36]["#type"] === "image"
    )
      return 2;
    if (
      /*item*/
      ctx2[36]["#type"] === "separator-hr"
    )
      return 3;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx, [-1, -1]))) {
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  const block = {
    c: function create() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(target, anchor);
      }
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2, dirty);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        }
      } else {
        if (if_block) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        } else {
          if_block = null;
        }
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d(detaching);
      }
      if (detaching)
        detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_each_block4.name,
    type: "each",
    source: "(507:6) {#each allItems as item}",
    ctx
  });
  return block;
}
function create_if_block11(ctx) {
  let li;
  let span;
  let t;
  let current;
  let mounted;
  let dispose;
  const after_slot_template = (
    /*#slots*/
    ctx[19].after
  );
  const after_slot = create_slot(
    after_slot_template,
    ctx,
    /*$$scope*/
    ctx[18],
    get_after_slot_context
  );
  const block = {
    c: function create() {
      li = element("li");
      span = element("span");
      t = space();
      if (after_slot)
        after_slot.c();
      attr_dev(span, "class", "tjs-menu-focus-indicator svelte-4nnklk");
      add_location(span, file17, 550, 12, 22436);
      attr_dev(li, "class", "tjs-menu-item svelte-4nnklk");
      attr_dev(li, "role", "menuitem");
      attr_dev(li, "tabindex", "0");
      add_location(li, file17, 545, 9, 22254);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      append_dev(li, span);
      append_dev(li, t);
      if (after_slot) {
        after_slot.m(li, null);
      }
      current = true;
      if (!mounted) {
        dispose = [
          listen_dev(
            li,
            "click",
            /*click_handler_4*/
            ctx[28],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            li,
            "keyup",
            /*keyup_handler_4*/
            ctx[29],
            false,
            false,
            false,
            false
          )
        ];
        mounted = true;
      }
    },
    p: function update(ctx2, dirty) {
      if (after_slot) {
        if (after_slot.p && (!current || dirty[0] & /*$$scope*/
        262144)) {
          update_slot_base(
            after_slot,
            after_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[18],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[18]
            ) : get_slot_changes(
              after_slot_template,
              /*$$scope*/
              ctx2[18],
              dirty,
              get_after_slot_changes
            ),
            get_after_slot_context
          );
        }
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(after_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(after_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(li);
      if (after_slot)
        after_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block11.name,
    type: "if",
    source: "(544:6) {#if $$slots.after}",
    ctx
  });
  return block;
}
function create_fragment19(ctx) {
  let t0;
  let nav;
  let ol;
  let t1;
  let t2;
  let t3;
  let t4;
  let tjsfocuswrap;
  let applyStyles_action;
  let efx_action;
  let nav_transition;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[19].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[18],
    null
  );
  const default_slot_or_fallback = default_slot || fallback_block4(ctx);
  let if_block0 = (
    /*$$slots*/
    ctx[12].before && create_if_block_52(ctx)
  );
  let each_value = (
    /*allItems*/
    ctx[3]
  );
  validate_each_argument(each_value);
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block4(get_each_context4(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  let if_block1 = (
    /*$$slots*/
    ctx[12].after && create_if_block11(ctx)
  );
  tjsfocuswrap = new TJSFocusWrap_default({
    props: { elementRoot: (
      /*menuEl*/
      ctx[4]
    ) },
    $$inline: true
  });
  const block = {
    c: function create() {
      t0 = space();
      nav = element("nav");
      ol = element("ol");
      if (default_slot_or_fallback)
        default_slot_or_fallback.c();
      t1 = space();
      if (if_block0)
        if_block0.c();
      t2 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t3 = space();
      if (if_block1)
        if_block1.c();
      t4 = space();
      create_component(tjsfocuswrap.$$.fragment);
      attr_dev(ol, "class", "tjs-menu-items svelte-4nnklk");
      attr_dev(ol, "role", "menu");
      add_location(ol, file17, 487, 3, 19640);
      attr_dev(nav, "class", "tjs-menu svelte-4nnklk");
      attr_dev(nav, "tabindex", "-1");
      add_location(nav, file17, 473, 0, 19165);
    },
    l: function claim(nodes) {
      throw new Error_13("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, nav, anchor);
      append_dev(nav, ol);
      if (default_slot_or_fallback) {
        default_slot_or_fallback.m(ol, null);
      }
      append_dev(ol, t1);
      if (if_block0)
        if_block0.m(ol, null);
      append_dev(ol, t2);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(ol, null);
        }
      }
      append_dev(ol, t3);
      if (if_block1)
        if_block1.m(ol, null);
      append_dev(nav, t4);
      mount_component(tjsfocuswrap, nav, null);
      ctx[30](nav);
      current = true;
      if (!mounted) {
        dispose = [
          listen_dev(
            window,
            "blur",
            /*onWindowBlur*/
            ctx[11],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            document_1.body,
            "pointerdown",
            /*onClose*/
            ctx[7],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            document_1.body,
            "wheel",
            /*onClose*/
            ctx[7],
            false,
            false,
            false,
            false
          ),
          listen_dev(nav, "click", stop_propagation(prevent_default(click_handler_5)), false, true, true, false),
          listen_dev(nav, "keydown", stop_propagation(
            /*onKeydownMenu*/
            ctx[8]
          ), false, false, true, false),
          listen_dev(nav, "keyup", stop_propagation(prevent_default(
            /*onKeyupMenu*/
            ctx[9]
          )), false, true, true, false),
          listen_dev(nav, "pointerdown", stop_propagation(pointerdown_handler), false, false, true, false),
          listen_dev(nav, "pointerup", stop_propagation(pointerup_handler), false, false, true, false),
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            nav,
            /*styles*/
            ctx[0]
          )),
          action_destroyer(efx_action = /*efx*/
          ctx[1].call(null, nav))
        ];
        mounted = true;
      }
    },
    p: function update(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty[0] & /*$$scope*/
        262144)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[18],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[18]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[18],
              dirty,
              null
            ),
            null
          );
        }
      } else {
        if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty[0] & /*menu*/
        4)) {
          default_slot_or_fallback.p(ctx2, !current ? [-1, -1] : dirty);
        }
      }
      if (
        /*$$slots*/
        ctx2[12].before
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty[0] & /*$$slots*/
          4096) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_52(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(ol, t2);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (dirty[0] & /*onClick, allItems, onKeyupItem*/
      1096) {
        each_value = /*allItems*/
        ctx2[3];
        validate_each_argument(each_value);
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context4(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block4(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(ol, t3);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      if (
        /*$$slots*/
        ctx2[12].after
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[0] & /*$$slots*/
          4096) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block11(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(ol, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      const tjsfocuswrap_changes = {};
      if (dirty[0] & /*menuEl*/
      16)
        tjsfocuswrap_changes.elementRoot = /*menuEl*/
        ctx2[4];
      tjsfocuswrap.$set(tjsfocuswrap_changes);
      if (applyStyles_action && is_function(applyStyles_action.update) && dirty[0] & /*styles*/
      1)
        applyStyles_action.update.call(
          null,
          /*styles*/
          ctx2[0]
        );
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(default_slot_or_fallback, local);
      transition_in(if_block0);
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      transition_in(if_block1);
      transition_in(tjsfocuswrap.$$.fragment, local);
      add_render_callback(() => {
        if (!current)
          return;
        if (!nav_transition)
          nav_transition = create_bidirectional_transition(
            nav,
            /*animate*/
            ctx[5],
            {},
            true
          );
        nav_transition.run(1);
      });
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot_or_fallback, local);
      transition_out(if_block0);
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      transition_out(if_block1);
      transition_out(tjsfocuswrap.$$.fragment, local);
      if (!nav_transition)
        nav_transition = create_bidirectional_transition(
          nav,
          /*animate*/
          ctx[5],
          {},
          false
        );
      nav_transition.run(0);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(t0);
      if (detaching)
        detach_dev(nav);
      if (default_slot_or_fallback)
        default_slot_or_fallback.d(detaching);
      if (if_block0)
        if_block0.d();
      destroy_each(each_blocks, detaching);
      if (if_block1)
        if_block1.d();
      destroy_component(tjsfocuswrap);
      ctx[30](null);
      if (detaching && nav_transition)
        nav_transition.end();
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment19.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
var click_handler_5 = () => null;
var pointerdown_handler = () => null;
var pointerup_handler = () => null;
function instance19($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TJSMenu", slots, ["default", "before", "after"]);
  const $$slots = compute_slots(slots);
  let { menu = void 0 } = $$props;
  let { items = void 0 } = $$props;
  let { focusEl = void 0 } = $$props;
  let { offset = void 0 } = $$props;
  let { styles = void 0 } = $$props;
  let { efx = void 0 } = $$props;
  let { keyCode = void 0 } = $$props;
  let { transitionOptions = void 0 } = $$props;
  const s_DEFAULT_OFFSET = { x: 0, y: 0 };
  const s_IGNORE_CLASSES = { ignoreClasses: ["tjs-focus-wrap"] };
  let allItems;
  let menuEl;
  let closed = false;
  let focusOptions = void 0;
  let hasKeyboardFocus = false;
  onMount(() => {
    const activeEl = document.activeElement;
    const parentEl = menuEl.parentElement;
    if (parentEl instanceof HTMLElement && activeEl instanceof HTMLElement && parentEl.contains(activeEl) && activeEl.matches(":focus-visible")) {
      const firstFocusEl = A11yHelper.getFirstFocusableElement(menuEl);
      if (firstFocusEl instanceof HTMLElement && !firstFocusEl.classList.contains("tjs-focus-wrap")) {
        firstFocusEl.focus();
        hasKeyboardFocus = true;
      } else {
        menuEl.focus();
      }
      focusOptions = { focusSource: { focusEl: [activeEl] } };
      if (focusEl) {
        focusOptions.focusSource.focusEl.push(focusEl);
      }
    } else {
      menuEl.focus();
      if (focusEl) {
        focusOptions = { focusSource: { focusEl: [focusEl] } };
      }
    }
  });
  function animate(node) {
    const result = getStackingContext(node.parentElement);
    if (!((result == null ? void 0 : result.node) instanceof HTMLElement)) {
      console.warn(`'TJSMenu.animate warning: Could not locate parent stacking context element.`);
      return;
    }
    const stackingContextRect = result == null ? void 0 : result.node.getBoundingClientRect();
    const stackingContextRight = stackingContextRect.x + stackingContextRect.width;
    const nodeRect = node.getBoundingClientRect();
    const parentRect = node.parentElement.getBoundingClientRect();
    const adjustedOffset = { ...s_DEFAULT_OFFSET, ...offset };
    node.style.top = `${adjustedOffset.y + parentRect.height}px`;
    if (parentRect.x + nodeRect.width < stackingContextRight) {
      node.style.left = `${adjustedOffset.x}px`;
      node.style.removeProperty("right");
    } else {
      node.style.right = `${adjustedOffset.x}px`;
      node.style.removeProperty("left");
    }
    return slideFade(node, transitionOptions);
  }
  function onClick(item) {
    const callback = item == null ? void 0 : item.onPress;
    if (typeof callback === "function") {
      callback(item, focusOptions);
    }
    if (!closed) {
      closed = true;
      menuEl.dispatchEvent(new CustomEvent("close:popup", { bubbles: true, cancelable: true }));
    }
  }
  async function onClose(event) {
    if (event.target === menuEl || menuEl.contains(event.target)) {
      return;
    }
    if (event.target === menuEl.parentElement || menuEl.parentElement.contains(event.target)) {
      return;
    }
    if (!closed) {
      closed = true;
      menuEl.dispatchEvent(new CustomEvent(
        "close:popup",
        {
          bubbles: true,
          cancelable: true,
          detail: { target: event.target }
        }
      ));
    }
  }
  function onKeydownMenu(event) {
    if (event.code === keyCode) {
      event.stopPropagation();
      return;
    }
    switch (event.code) {
      case "Tab":
        event.stopPropagation();
        if (event.shiftKey) {
          const allFocusable = A11yHelper.getFocusableElements(menuEl, s_IGNORE_CLASSES);
          const firstFocusEl = allFocusable.length > 0 ? allFocusable[0] : void 0;
          const lastFocusEl = allFocusable.length > 0 ? allFocusable[allFocusable.length - 1] : void 0;
          if (menuEl === document.activeElement || firstFocusEl === document.activeElement) {
            if (lastFocusEl instanceof HTMLElement && firstFocusEl !== lastFocusEl) {
              lastFocusEl.focus();
            }
            event.preventDefault();
          }
        }
        break;
      default:
        event.stopPropagation();
        break;
    }
  }
  function onKeyupMenu(event) {
    switch (event.code) {
      case "Escape":
        if (!closed) {
          closed = true;
          menuEl.dispatchEvent(new CustomEvent(
            "close:popup",
            {
              bubbles: true,
              cancelable: true,
              detail: { keyboardFocus: hasKeyboardFocus }
            }
          ));
        }
        event.preventDefault();
        event.stopPropagation();
        break;
    }
  }
  function onKeyupItem(event, item) {
    if (event.code === keyCode) {
      const callback = item == null ? void 0 : item.onPress;
      if (typeof callback === "function") {
        callback(item, focusOptions);
      }
      if (!closed) {
        closed = true;
        event.preventDefault();
        event.stopPropagation();
        menuEl.dispatchEvent(new CustomEvent(
          "close:popup",
          {
            bubbles: true,
            cancelable: true,
            detail: { keyboardFocus: hasKeyboardFocus }
          }
        ));
      }
    }
  }
  function onWindowBlur() {
    if (!closed) {
      closed = true;
      menuEl.dispatchEvent(new CustomEvent("close:popup", { bubbles: true, cancelable: true }));
    }
  }
  const writable_props = [
    "menu",
    "items",
    "focusEl",
    "offset",
    "styles",
    "efx",
    "keyCode",
    "transitionOptions"
  ];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console_1.warn(`<TJSMenu> was created with unknown prop '${key}'`);
  });
  const click_handler = () => onClick();
  const keyup_handler = (event) => onKeyupItem(event);
  const click_handler_1 = (item) => onClick(item);
  const keyup_handler_1 = (item, event) => onKeyupItem(event, item);
  const click_handler_2 = (item) => onClick(item);
  const keyup_handler_2 = (item, event) => onKeyupItem(event, item);
  const click_handler_32 = (item) => onClick(item);
  const keyup_handler_3 = (item, event) => onKeyupItem(event, item);
  const click_handler_4 = () => onClick();
  const keyup_handler_4 = (event) => onKeyupItem(event);
  function nav_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      menuEl = $$value;
      $$invalidate(4, menuEl);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("menu" in $$props2)
      $$invalidate(2, menu = $$props2.menu);
    if ("items" in $$props2)
      $$invalidate(17, items = $$props2.items);
    if ("focusEl" in $$props2)
      $$invalidate(13, focusEl = $$props2.focusEl);
    if ("offset" in $$props2)
      $$invalidate(14, offset = $$props2.offset);
    if ("styles" in $$props2)
      $$invalidate(0, styles = $$props2.styles);
    if ("efx" in $$props2)
      $$invalidate(1, efx = $$props2.efx);
    if ("keyCode" in $$props2)
      $$invalidate(15, keyCode = $$props2.keyCode);
    if ("transitionOptions" in $$props2)
      $$invalidate(16, transitionOptions = $$props2.transitionOptions);
    if ("$$scope" in $$props2)
      $$invalidate(18, $$scope = $$props2.$$scope);
  };
  $$self.$capture_state = () => ({
    onMount,
    quintOut,
    applyStyles,
    localize,
    slideFade,
    A11yHelper,
    getStackingContext,
    isIterable,
    isObject,
    isSvelteComponent,
    TJSFocusWrap: TJSFocusWrap_default,
    menu,
    items,
    focusEl,
    offset,
    styles,
    efx,
    keyCode,
    transitionOptions,
    s_DEFAULT_OFFSET,
    s_IGNORE_CLASSES,
    allItems,
    menuEl,
    closed,
    focusOptions,
    hasKeyboardFocus,
    animate,
    onClick,
    onClose,
    onKeydownMenu,
    onKeyupMenu,
    onKeyupItem,
    onWindowBlur
  });
  $$self.$inject_state = ($$props2) => {
    if ("menu" in $$props2)
      $$invalidate(2, menu = $$props2.menu);
    if ("items" in $$props2)
      $$invalidate(17, items = $$props2.items);
    if ("focusEl" in $$props2)
      $$invalidate(13, focusEl = $$props2.focusEl);
    if ("offset" in $$props2)
      $$invalidate(14, offset = $$props2.offset);
    if ("styles" in $$props2)
      $$invalidate(0, styles = $$props2.styles);
    if ("efx" in $$props2)
      $$invalidate(1, efx = $$props2.efx);
    if ("keyCode" in $$props2)
      $$invalidate(15, keyCode = $$props2.keyCode);
    if ("transitionOptions" in $$props2)
      $$invalidate(16, transitionOptions = $$props2.transitionOptions);
    if ("allItems" in $$props2)
      $$invalidate(3, allItems = $$props2.allItems);
    if ("menuEl" in $$props2)
      $$invalidate(4, menuEl = $$props2.menuEl);
    if ("closed" in $$props2)
      closed = $$props2.closed;
    if ("focusOptions" in $$props2)
      focusOptions = $$props2.focusOptions;
    if ("hasKeyboardFocus" in $$props2)
      hasKeyboardFocus = $$props2.hasKeyboardFocus;
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*menu, items*/
    131076) {
      $: {
        const tempList = isObject(menu) && isIterable(menu.items) ? menu.items : isIterable(items) ? items : [];
        const tempItems = [];
        let cntr = -1;
        for (const item of tempList) {
          cntr++;
          if (!isObject(item)) {
            throw new TypeError(`TJSMenu error: 'item[${cntr}]' is not an object.`);
          }
          if (typeof item.condition === "function" && !item.condition()) {
            continue;
          }
          if (typeof item.condition === "boolean" && !item.condition) {
            continue;
          }
          let type;
          if (isSvelteComponent(item.class)) {
            type = "class";
          } else if (typeof item.icon === "string") {
            type = "icon";
          } else if (typeof item.image === "string") {
            type = "image";
          } else if (typeof item.separator === "string") {
            if (item.separator !== "hr") {
              throw new Error(`TJSMenu error: 'item[${cntr}]' has unknown separator type; only 'hr' is currently supported.`);
            }
            type = "separator-hr";
          }
          if (type === void 0) {
            throw new TypeError(`TJSMenu error: Unknown type for 'item[${cntr}]'.`);
          }
          tempItems.push({ ...item, "#type": type });
        }
        $$invalidate(3, allItems = tempItems);
      }
    }
    if ($$self.$$.dirty[0] & /*menu, focusEl*/
    8196) {
      $:
        $$invalidate(13, focusEl = isObject(menu) && A11yHelper.isFocusSource(menu.focusEl) ? menu.focusEl : A11yHelper.isFocusSource(focusEl) ? focusEl : void 0);
    }
    if ($$self.$$.dirty[0] & /*menu, offset*/
    16388) {
      $:
        $$invalidate(14, offset = isObject(menu) && isObject(menu.offset) ? menu.offset : isObject(offset) ? offset : s_DEFAULT_OFFSET);
    }
    if ($$self.$$.dirty[0] & /*menu, styles*/
    5) {
      $:
        $$invalidate(0, styles = isObject(menu) && isObject(menu.styles) ? menu.styles : isObject(styles) ? styles : void 0);
    }
    if ($$self.$$.dirty[0] & /*menu, efx*/
    6) {
      $:
        $$invalidate(1, efx = isObject(menu) && typeof menu.efx === "function" ? menu.efx : typeof efx === "function" ? efx : () => {
        });
    }
    if ($$self.$$.dirty[0] & /*menu, keyCode*/
    32772) {
      $:
        $$invalidate(15, keyCode = isObject(menu) && typeof menu.keyCode === "string" ? menu.keyCode : typeof keyCode === "string" ? keyCode : "Enter");
    }
    if ($$self.$$.dirty[0] & /*menu, transitionOptions*/
    65540) {
      $:
        $$invalidate(16, transitionOptions = isObject(menu) && isObject(menu.transitionOptions) ? menu.transitionOptions : isObject(transitionOptions) ? transitionOptions : { duration: 200, easing: quintOut });
    }
  };
  return [
    styles,
    efx,
    menu,
    allItems,
    menuEl,
    animate,
    onClick,
    onClose,
    onKeydownMenu,
    onKeyupMenu,
    onKeyupItem,
    onWindowBlur,
    $$slots,
    focusEl,
    offset,
    keyCode,
    transitionOptions,
    items,
    $$scope,
    slots,
    click_handler,
    keyup_handler,
    click_handler_1,
    keyup_handler_1,
    click_handler_2,
    keyup_handler_2,
    click_handler_32,
    keyup_handler_3,
    click_handler_4,
    keyup_handler_4,
    nav_binding
  ];
}
var TJSMenu = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(
      this,
      options,
      instance19,
      create_fragment19,
      safe_not_equal,
      {
        menu: 2,
        items: 17,
        focusEl: 13,
        offset: 14,
        styles: 0,
        efx: 1,
        keyCode: 15,
        transitionOptions: 16
      },
      add_css17,
      [-1, -1]
    );
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TJSMenu",
      options,
      id: create_fragment19.name
    });
  }
  get menu() {
    throw new Error_13("<TJSMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set menu(value) {
    throw new Error_13("<TJSMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get items() {
    throw new Error_13("<TJSMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set items(value) {
    throw new Error_13("<TJSMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get focusEl() {
    throw new Error_13("<TJSMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set focusEl(value) {
    throw new Error_13("<TJSMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get offset() {
    throw new Error_13("<TJSMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set offset(value) {
    throw new Error_13("<TJSMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get styles() {
    throw new Error_13("<TJSMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set styles(value) {
    throw new Error_13("<TJSMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get efx() {
    throw new Error_13("<TJSMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set efx(value) {
    throw new Error_13("<TJSMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get keyCode() {
    throw new Error_13("<TJSMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set keyCode(value) {
    throw new Error_13("<TJSMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get transitionOptions() {
    throw new Error_13("<TJSMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set transitionOptions(value) {
    throw new Error_13("<TJSMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var TJSMenu_default = TJSMenu;

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/menu/context/TJSContextMenuImpl.svelte
var { document: document_12 } = globals;
var file18 = "node_modules\\@typhonjs-fvtt\\svelte-standard\\_dist\\component\\standard\\menu\\context\\TJSContextMenuImpl.svelte";
function add_css18(target) {
  append_styles(target, "svelte-1ldi9ui", ".tjs-context-menu.svelte-1ldi9ui.svelte-1ldi9ui{position:fixed;width:fit-content;height:max-content;overflow:hidden;background:var(--tjs-context-menu-background, var(--tjs-default-menu-background, var(--tjs-default-popup-background, #23221d)));border:var(--tjs-context-menu-border, var(--tjs-default-popover-border, 1px solid #000));border-radius:var(--tjs-context-menu-border-radius, var(--tjs-default-popover-border-radius, 5px));box-shadow:var(--tjs-context-menu-box-shadow, var(--tjs-default-popover-box-shadow, 0 0 10px #000));color:var(--tjs-context-menu-primary-color, var(--tjs-default-menu-primary-color, var(--tjs-default-popup-primary-color, #b5b3a4)));max-width:var(--tjs-context-menu-max-width, var(--tjs-default-menu-max-width, 360px));min-width:var(--tjs-context-menu-min-width, var(--tjs-default-menu-min-width, 20px));text-align:start}.tjs-context-menu.svelte-1ldi9ui.svelte-1ldi9ui:focus-visible{outline:var(--tjs-default-a11y-outline-focus-visible, 2px solid transparent)}.tjs-context-menu-items.svelte-1ldi9ui.svelte-1ldi9ui{list-style:none;margin:0;padding:0}.tjs-context-menu-items.svelte-1ldi9ui hr.svelte-1ldi9ui{margin-block-start:0;margin-block-end:0;margin:var(--tjs-context-menu-hr-margin, var(--tjs-default-hr-margin, 0 0.25em));border-top:var(--tjs-context-menu-hr-border-top, var(--tjs-default-hr-border-top, 1px solid #555));border-bottom:var(--tjs-context-menu-hr-border-bottom, var(--tjs-default-hr-border-bottom, 1px solid #444))}.tjs-context-menu-item.svelte-1ldi9ui.svelte-1ldi9ui{display:flex;align-items:center;line-height:var(--tjs-context-menu-item-line-height, var(--tjs-default-menu-item-line-height, 2em));padding:var(--tjs-context-menu-item-padding, var(--tjs-default-menu-item-padding, 0 0.5em 0 0))}.tjs-context-menu-item.svelte-1ldi9ui.svelte-1ldi9ui:focus-within,.tjs-context-menu-item.svelte-1ldi9ui.svelte-1ldi9ui:focus-visible{outline:var(--tjs-default-a11y-outline-focus-visible, 2px solid transparent)}.tjs-context-menu-item.svelte-1ldi9ui i.svelte-1ldi9ui{text-align:center;width:var(--tjs-context-menu-item-icon-width, var(--tjs-default-menu-item-icon-width, 1.25em))}.tjs-context-menu-item.svelte-1ldi9ui img.svelte-1ldi9ui{width:var(--tjs-context-menu-item-image-width, var(--tjs-default-menu-item-image-width, 1.25em));height:var(--tjs-context-menu-item-image-height, var(--tjs-default-menu-item-image-height, 1.25em))}.tjs-context-menu-item-button.svelte-1ldi9ui.svelte-1ldi9ui{gap:var(--tjs-context-menu-item-button-gap, var(--tjs-default-menu-item-button-gap, 0.25em))}.tjs-context-menu-item-button.svelte-1ldi9ui.svelte-1ldi9ui:hover{color:var(--tjs-context-menu-item-highlight-color, var(--tjs-default-menu-highlight-color, var(--tjs-default-popup-highlight-color, #f0f0e0)));text-shadow:var(--tjs-context-menu-item-text-shadow-focus-hover, var(--tjs-default-text-shadow-focus-hover, 0 0 8px red))}.tjs-context-menu-item-button.svelte-1ldi9ui.svelte-1ldi9ui:focus-visible{color:var(--tjs-context-menu-item-highlight-color, var(--tjs-default-menu-highlight-color, var(--tjs-default-popup-highlight-color, #f0f0e0)));text-shadow:var(--tjs-context-menu-item-text-shadow-focus-hover, var(--tjs-default-text-shadow-focus-hover, 0 0 8px red))}.tjs-context-menu-focus-indicator.svelte-1ldi9ui.svelte-1ldi9ui{align-self:var(--tjs-context-menu-focus-indicator-align-self, var(--tjs-default-focus-indicator-align-self, stretch));border:var(--tjs-context-menu-focus-indicator-border, var(--tjs-default-focus-indicator-border));border-radius:var(--tjs-context-menu-focus-indicator-border-radius, var(--tjs-default-focus-indicator-border-radius, 0.1em));height:var(--tjs-context-menu-focus-indicator-height, var(--tjs-default-focus-indicator-height));width:var(--tjs-context-menu-focus-indicator-width, var(--tjs-default-focus-indicator-width, 0.25em));transition:var(--tjs-context-menu-focus-indicator-transition, var(--tjs-default-focus-indicator-transition))}.tjs-context-menu-item.svelte-1ldi9ui:focus-visible .tjs-context-menu-focus-indicator.svelte-1ldi9ui{background:var(--tjs-context-menu-focus-indicator-background, var(--tjs-default-focus-indicator-background, white))}.tjs-context-menu-item.svelte-1ldi9ui:focus-within:has(:focus-visible) .tjs-context-menu-focus-indicator.svelte-1ldi9ui{background:var(--tjs-context-menu-focus-indicator-background, var(--tjs-default-focus-indicator-background, white))}@supports not (selector(:has(*))){.tjs-context-menu-item.svelte-1ldi9ui:focus-within .tjs-context-menu-focus-indicator.svelte-1ldi9ui{background:var(--tjs-context-menu-focus-indicator-background, var(--tjs-default-focus-indicator-background, white))}}.tjs-context-menu-item-label.svelte-1ldi9ui.svelte-1ldi9ui{overflow:var(--tjs-context-menu-item-label-overflow, var(--tjs-default-menu-item-label-overflow, hidden));text-overflow:var(--tjs-context-menu-item-label-text-overflow, var(--tjs-default-menu-item-label-text-overflow, ellipsis));white-space:var(--tjs-context-menu-item-label-white-space, var(--tjs-default-menu-item-label-white-space))}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVEpTQ29udGV4dE1lbnVJbXBsLnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUEwYkksK0NBQUEsQ0FDSSxRQUFBLENBQUEsS0FBZSxDQUNmLEtBQUEsQ0FBQSxXQUFrQixDQUNsQixNQUFBLENBQUEsV0FBbUIsQ0FDbkIsUUFBQSxDQUFBLE1BQWdCLENBRWhCLFVBQUEsQ0FBQSxJQUFBLDZCQUFBLENBQUEsaUZBQUEsQ0FBZ0ksQ0FDaEksTUFBQSxDQUFBLElBQUEseUJBQUEsQ0FBQSxrREFBQSxDQUF5RixDQUN6RixhQUFBLENBQUEsSUFBQSxnQ0FBQSxDQUFBLDhDQUFBLENBQW1HLENBQ25HLFVBQUEsQ0FBQSxJQUFBLDZCQUFBLENBQUEscURBQUEsQ0FBb0csQ0FDcEcsS0FBQSxDQUFBLElBQUEsZ0NBQUEsQ0FBQSx1RkFBQSxDQUFvSSxDQUNwSSxTQUFBLENBQUEsSUFBQSw0QkFBQSxDQUFBLHlDQUFBLENBQXNGLENBQ3RGLFNBQUEsQ0FBQSxJQUFBLDRCQUFBLENBQUEsd0NBQUEsQ0FBcUYsQ0FFckYsVUFBQSxDQUFBLEtBQ0osQ0FFQSwrQ0FBQSxjQUFBLENBQ0ksT0FBQSxDQUFBLElBQUEsd0NBQUEsQ0FBQSxzQkFBQSxDQUNKLENBRUEscURBQUEsQ0FDSSxVQUFBLENBQUEsSUFBZ0IsQ0FDaEIsTUFBQSxDQUFBLENBQVMsQ0FDVCxPQUFBLENBQUEsQ0FDSixDQUVBLHNDQUFBLENBQUEsaUJBQUEsQ0FDSSxrQkFBQSxDQUFBLENBQXFCLENBQ3JCLGdCQUFBLENBQUEsQ0FBbUIsQ0FDbkIsTUFBQSxDQUFBLElBQUEsNEJBQUEsQ0FBQSx1Q0FBQSxDQUFpRixDQUNqRixVQUFBLENBQUEsSUFBQSxnQ0FBQSxDQUFBLGlEQUFBLENBQW1HLENBQ25HLGFBQUEsQ0FBQSxJQUFBLG1DQUFBLENBQUEsb0RBQUEsQ0FDSixDQUVBLG9EQUFBLENBQ0ksT0FBQSxDQUFBLElBQWEsQ0FDYixXQUFBLENBQUEsTUFBbUIsQ0FDbkIsV0FBQSxDQUFBLElBQUEsbUNBQUEsQ0FBQSw4Q0FBQSxDQUFvRyxDQUNwRyxPQUFBLENBQUEsSUFBQSwrQkFBQSxDQUFBLGtEQUFBLENBQ0osQ0FHQSxvREFBQSxhQUFBLENBQUEsb0RBQUEsY0FBQSxDQUNJLE9BQUEsQ0FBQSxJQUFBLHdDQUFBLENBQUEsc0JBQUEsQ0FDSixDQUVBLHFDQUFBLENBQUEsZ0JBQUEsQ0FDSSxVQUFBLENBQUEsTUFBa0IsQ0FDbEIsS0FBQSxDQUFBLElBQUEsa0NBQUEsQ0FBQSxnREFBQSxDQUNKLENBRUEscUNBQUEsQ0FBQSxrQkFBQSxDQUNJLEtBQUEsQ0FBQSxJQUFBLG1DQUFBLENBQUEsaURBQUEsQ0FBaUcsQ0FDakcsTUFBQSxDQUFBLElBQUEsb0NBQUEsQ0FBQSxrREFBQSxDQUNKLENBRUEsMkRBQUEsQ0FDSSxHQUFBLENBQUEsSUFBQSxrQ0FBQSxDQUFBLGdEQUFBLENBQ0osQ0FFQSwyREFBQSxNQUFBLENBQ0ksS0FBQSxDQUFBLElBQUEsdUNBQUEsQ0FBQSwyRkFBQSxDQUErSSxDQUMvSSxXQUFBLENBQUEsSUFBQSwrQ0FBQSxDQUFBLHdEQUFBLENBQ0osQ0FFQSwyREFBQSxjQUFBLENBQ0ksS0FBQSxDQUFBLElBQUEsdUNBQUEsQ0FBQSwyRkFBQSxDQUErSSxDQUMvSSxXQUFBLENBQUEsSUFBQSwrQ0FBQSxDQUFBLHdEQUFBLENBQ0osQ0FFQSwrREFBQSxDQUNJLFVBQUEsQ0FBQSxJQUFBLDZDQUFBLENBQUEsdURBQUEsQ0FBc0gsQ0FDdEgsTUFBQSxDQUFBLElBQUEseUNBQUEsQ0FBQSwwQ0FBQSxDQUFpRyxDQUNqRyxhQUFBLENBQUEsSUFBQSxnREFBQSxDQUFBLHdEQUFBLENBQTZILENBQzdILE1BQUEsQ0FBQSxJQUFBLHlDQUFBLENBQUEsMENBQUEsQ0FBaUcsQ0FDakcsS0FBQSxDQUFBLElBQUEsd0NBQUEsQ0FBQSxpREFBQSxDQUFzRyxDQUN0RyxVQUFBLENBQUEsSUFBQSw2Q0FBQSxDQUFBLDhDQUFBLENBQ0osQ0FFQSxxQ0FBQSxjQUFBLENBQUEsZ0RBQUEsQ0FDSSxVQUFBLENBQUEsSUFBQSw2Q0FBQSxDQUFBLHFEQUFBLENBQ0osQ0FJQSxxQ0FBQSxhQUFBLEtBQUEsY0FBQSxDQUFBLENBQUEsZ0RBQUEsQ0FDSSxVQUFBLENBQUEsSUFBQSw2Q0FBQSxDQUFBLHFEQUFBLENBQ0osQ0FHQSxVQUFBLEdBQUEsQ0FBQSxDQUFBLFNBQUEsT0FBQSxDQUFBLENBQUEsQ0FDSSxxQ0FBQSxhQUFBLENBQUEsZ0RBQUEsQ0FDSSxVQUFBLENBQUEsSUFBQSw2Q0FBQSxDQUFBLHFEQUFBLENBQ0osQ0FDSixDQUVBLDBEQUFBLENBQ0ksUUFBQSxDQUFBLElBQUEsc0NBQUEsQ0FBQSxvREFBQSxDQUEwRyxDQUMxRyxhQUFBLENBQUEsSUFBQSwyQ0FBQSxDQUFBLDJEQUFBLENBQTJILENBQzNILFdBQUEsQ0FBQSxJQUFBLHlDQUFBLENBQUEsK0NBQUEsQ0FDSiIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJUSlNDb250ZXh0TWVudUltcGwuc3ZlbHRlIl19 */");
}
function get_each_context5(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[30] = list[i];
  return child_ctx;
}
function create_if_block_34(ctx) {
  let hr;
  const block = {
    c: function create() {
      hr = element("hr");
      attr_dev(hr, "class", "svelte-1ldi9ui");
      add_location(hr, file18, 434, 16, 18155);
    },
    m: function mount(target, anchor) {
      insert_dev(target, hr, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(hr);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_34.name,
    type: "if",
    source: "(434:55) ",
    ctx
  });
  return block;
}
function create_if_block_25(ctx) {
  let li;
  let span0;
  let t0;
  let img;
  let img_src_value;
  let img_alt_value;
  let t1;
  let span1;
  let t2_value = localize(
    /*item*/
    ctx[30].label
  ) + "";
  let t2;
  let t3;
  let mounted;
  let dispose;
  function click_handler_2() {
    return (
      /*click_handler_2*/
      ctx[23](
        /*item*/
        ctx[30]
      )
    );
  }
  function keyup_handler_2(...args) {
    return (
      /*keyup_handler_2*/
      ctx[24](
        /*item*/
        ctx[30],
        ...args
      )
    );
  }
  const block = {
    c: function create() {
      li = element("li");
      span0 = element("span");
      t0 = space();
      img = element("img");
      t1 = space();
      span1 = element("span");
      t2 = text(t2_value);
      t3 = space();
      attr_dev(span0, "class", "tjs-context-menu-focus-indicator svelte-1ldi9ui");
      add_location(span0, file18, 429, 20, 17860);
      if (!src_url_equal(img.src, img_src_value = /*item*/
      ctx[30].image))
        attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", img_alt_value = /*item*/
      ctx[30].imageAlt);
      attr_dev(img, "class", "svelte-1ldi9ui");
      add_location(img, file18, 430, 20, 17928);
      attr_dev(span1, "class", "tjs-context-menu-item-label svelte-1ldi9ui");
      add_location(span1, file18, 431, 20, 17991);
      attr_dev(li, "class", "tjs-context-menu-item tjs-context-menu-item-button svelte-1ldi9ui");
      attr_dev(li, "role", "menuitem");
      attr_dev(li, "tabindex", "0");
      add_location(li, file18, 424, 16, 17593);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      append_dev(li, span0);
      append_dev(li, t0);
      append_dev(li, img);
      append_dev(li, t1);
      append_dev(li, span1);
      append_dev(span1, t2);
      append_dev(li, t3);
      if (!mounted) {
        dispose = [
          listen_dev(li, "click", click_handler_2, false, false, false, false),
          listen_dev(li, "keyup", keyup_handler_2, false, false, false, false)
        ];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty[0] & /*items*/
      4 && !src_url_equal(img.src, img_src_value = /*item*/
      ctx[30].image)) {
        attr_dev(img, "src", img_src_value);
      }
      if (dirty[0] & /*items*/
      4 && img_alt_value !== (img_alt_value = /*item*/
      ctx[30].imageAlt)) {
        attr_dev(img, "alt", img_alt_value);
      }
      if (dirty[0] & /*items*/
      4 && t2_value !== (t2_value = localize(
        /*item*/
        ctx[30].label
      ) + ""))
        set_data_dev(t2, t2_value);
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(li);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_25.name,
    type: "if",
    source: "(423:48) ",
    ctx
  });
  return block;
}
function create_if_block_18(ctx) {
  let li;
  let span0;
  let t0;
  let i;
  let i_class_value;
  let t1;
  let span1;
  let t2_value = localize(
    /*item*/
    ctx[30].label
  ) + "";
  let t2;
  let t3;
  let mounted;
  let dispose;
  function click_handler_1() {
    return (
      /*click_handler_1*/
      ctx[21](
        /*item*/
        ctx[30]
      )
    );
  }
  function keyup_handler_1(...args) {
    return (
      /*keyup_handler_1*/
      ctx[22](
        /*item*/
        ctx[30],
        ...args
      )
    );
  }
  const block = {
    c: function create() {
      li = element("li");
      span0 = element("span");
      t0 = space();
      i = element("i");
      t1 = space();
      span1 = element("span");
      t2 = text(t2_value);
      t3 = space();
      attr_dev(span0, "class", "tjs-context-menu-focus-indicator svelte-1ldi9ui");
      add_location(span0, file18, 418, 20, 17232);
      attr_dev(i, "class", i_class_value = null_to_empty(
        /*item*/
        ctx[30].icon
      ) + " svelte-1ldi9ui");
      add_location(i, file18, 419, 20, 17300);
      attr_dev(span1, "class", "tjs-context-menu-item-label svelte-1ldi9ui");
      add_location(span1, file18, 420, 20, 17346);
      attr_dev(li, "class", "tjs-context-menu-item tjs-context-menu-item-button svelte-1ldi9ui");
      attr_dev(li, "role", "menuitem");
      attr_dev(li, "tabindex", "0");
      add_location(li, file18, 413, 16, 16965);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      append_dev(li, span0);
      append_dev(li, t0);
      append_dev(li, i);
      append_dev(li, t1);
      append_dev(li, span1);
      append_dev(span1, t2);
      append_dev(li, t3);
      if (!mounted) {
        dispose = [
          listen_dev(li, "click", click_handler_1, false, false, false, false),
          listen_dev(li, "keyup", keyup_handler_1, false, false, false, false)
        ];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty[0] & /*items*/
      4 && i_class_value !== (i_class_value = null_to_empty(
        /*item*/
        ctx[30].icon
      ) + " svelte-1ldi9ui")) {
        attr_dev(i, "class", i_class_value);
      }
      if (dirty[0] & /*items*/
      4 && t2_value !== (t2_value = localize(
        /*item*/
        ctx[30].label
      ) + ""))
        set_data_dev(t2, t2_value);
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(li);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_18.name,
    type: "if",
    source: "(412:47) ",
    ctx
  });
  return block;
}
function create_if_block12(ctx) {
  let li;
  let span;
  let t0;
  let switch_instance;
  let t1;
  let current;
  let mounted;
  let dispose;
  const switch_instance_spread_levels = [
    isObject(
      /*item*/
      ctx[30].props
    ) ? (
      /*item*/
      ctx[30].props
    ) : {}
  ];
  var switch_value = (
    /*item*/
    ctx[30].class
  );
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return {
      props: switch_instance_props,
      $$inline: true
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
  }
  function click_handler() {
    return (
      /*click_handler*/
      ctx[19](
        /*item*/
        ctx[30]
      )
    );
  }
  function keyup_handler(...args) {
    return (
      /*keyup_handler*/
      ctx[20](
        /*item*/
        ctx[30],
        ...args
      )
    );
  }
  const block = {
    c: function create() {
      li = element("li");
      span = element("span");
      t0 = space();
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      t1 = space();
      attr_dev(span, "class", "tjs-context-menu-focus-indicator svelte-1ldi9ui");
      add_location(span, file18, 408, 20, 16636);
      attr_dev(li, "class", "tjs-context-menu-item svelte-1ldi9ui");
      attr_dev(li, "role", "menuitem");
      attr_dev(li, "tabindex", "0");
      add_location(li, file18, 403, 16, 16400);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      append_dev(li, span);
      append_dev(li, t0);
      if (switch_instance)
        mount_component(switch_instance, li, null);
      append_dev(li, t1);
      current = true;
      if (!mounted) {
        dispose = [
          listen_dev(li, "click", click_handler, false, false, false, false),
          listen_dev(li, "keyup", keyup_handler, false, false, false, false)
        ];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      const switch_instance_changes = dirty[0] & /*items*/
      4 ? get_spread_update(switch_instance_spread_levels, [
        get_spread_object(isObject(
          /*item*/
          ctx[30].props
        ) ? (
          /*item*/
          ctx[30].props
        ) : {})
      ]) : {};
      if (dirty[0] & /*items*/
      4 && switch_value !== (switch_value = /*item*/
      ctx[30].class)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, li, t1);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(li);
      if (switch_instance)
        destroy_component(switch_instance);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block12.name,
    type: "if",
    source: "(402:12) {#if item['#type'] === 'class'}",
    ctx
  });
  return block;
}
function create_each_block5(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block12, create_if_block_18, create_if_block_25, create_if_block_34];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*item*/
      ctx2[30]["#type"] === "class"
    )
      return 0;
    if (
      /*item*/
      ctx2[30]["#type"] === "icon"
    )
      return 1;
    if (
      /*item*/
      ctx2[30]["#type"] === "image"
    )
      return 2;
    if (
      /*item*/
      ctx2[30]["#type"] === "separator-hr"
    )
      return 3;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx, [-1, -1]))) {
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  const block = {
    c: function create() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(target, anchor);
      }
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2, dirty);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        }
      } else {
        if (if_block) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        } else {
          if_block = null;
        }
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d(detaching);
      }
      if (detaching)
        detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_each_block5.name,
    type: "each",
    source: "(401:8) {#each items as item}",
    ctx
  });
  return block;
}
function create_fragment20(ctx) {
  let t0;
  let nav;
  let ol;
  let t1;
  let tjsfocuswrap;
  let applyStyles_action;
  let nav_transition;
  let current;
  let mounted;
  let dispose;
  let each_value = (
    /*items*/
    ctx[2]
  );
  validate_each_argument(each_value);
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block5(get_each_context5(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  tjsfocuswrap = new TJSFocusWrap_default({
    props: { elementRoot: (
      /*menuEl*/
      ctx[4]
    ) },
    $$inline: true
  });
  const block = {
    c: function create() {
      t0 = space();
      nav = element("nav");
      ol = element("ol");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t1 = space();
      create_component(tjsfocuswrap.$$.fragment);
      attr_dev(ol, "class", "tjs-context-menu-items svelte-1ldi9ui");
      attr_dev(ol, "role", "menu");
      add_location(ol, file18, 399, 4, 16176);
      attr_dev(
        nav,
        "id",
        /*id*/
        ctx[1]
      );
      attr_dev(nav, "class", "tjs-context-menu svelte-1ldi9ui");
      attr_dev(nav, "tabindex", "-1");
      set_style(
        nav,
        "z-index",
        /*zIndex*/
        ctx[3]
      );
      add_location(nav, file18, 387, 0, 15763);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, nav, anchor);
      append_dev(nav, ol);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(ol, null);
        }
      }
      append_dev(nav, t1);
      mount_component(tjsfocuswrap, nav, null);
      ctx[25](nav);
      current = true;
      if (!mounted) {
        dispose = [
          listen_dev(
            window,
            "blur",
            /*onWindowBlur*/
            ctx[11],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            document_12.body,
            "pointerdown",
            /*onClose*/
            ctx[7],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            document_12.body,
            "wheel",
            /*wheel_handler*/
            ctx[18],
            false,
            false,
            false,
            false
          ),
          listen_dev(nav, "click", stop_propagation(prevent_default(click_handler_3)), false, true, true, false),
          listen_dev(nav, "keydown", stop_propagation(
            /*onKeydownMenu*/
            ctx[8]
          ), false, false, true, false),
          listen_dev(nav, "keyup", stop_propagation(prevent_default(
            /*onKeyupMenu*/
            ctx[9]
          )), false, true, true, false),
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            nav,
            /*styles*/
            ctx[0]
          ))
        ];
        mounted = true;
      }
    },
    p: function update(ctx2, dirty) {
      if (dirty[0] & /*onClick, items, onKeyupItem*/
      1092) {
        each_value = /*items*/
        ctx2[2];
        validate_each_argument(each_value);
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context5(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block5(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(ol, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      const tjsfocuswrap_changes = {};
      if (dirty[0] & /*menuEl*/
      16)
        tjsfocuswrap_changes.elementRoot = /*menuEl*/
        ctx2[4];
      tjsfocuswrap.$set(tjsfocuswrap_changes);
      if (!current || dirty[0] & /*id*/
      2) {
        attr_dev(
          nav,
          "id",
          /*id*/
          ctx2[1]
        );
      }
      if (applyStyles_action && is_function(applyStyles_action.update) && dirty[0] & /*styles*/
      1)
        applyStyles_action.update.call(
          null,
          /*styles*/
          ctx2[0]
        );
      if (dirty[0] & /*zIndex*/
      8) {
        set_style(
          nav,
          "z-index",
          /*zIndex*/
          ctx2[3]
        );
      }
    },
    i: function intro(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      transition_in(tjsfocuswrap.$$.fragment, local);
      add_render_callback(() => {
        if (!current)
          return;
        if (!nav_transition)
          nav_transition = create_bidirectional_transition(
            nav,
            /*animate*/
            ctx[5],
            {},
            true
          );
        nav_transition.run(1);
      });
      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      transition_out(tjsfocuswrap.$$.fragment, local);
      if (!nav_transition)
        nav_transition = create_bidirectional_transition(
          nav,
          /*animate*/
          ctx[5],
          {},
          false
        );
      nav_transition.run(0);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(t0);
      if (detaching)
        detach_dev(nav);
      destroy_each(each_blocks, detaching);
      destroy_component(tjsfocuswrap);
      ctx[25](null);
      if (detaching && nav_transition)
        nav_transition.end();
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment20.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
var click_handler_3 = () => null;
function instance20($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TJSContextMenuImpl", slots, []);
  let { menu = void 0 } = $$props;
  let { id = "" } = $$props;
  let { x = 0 } = $$props;
  let { y = 0 } = $$props;
  let { items = [] } = $$props;
  let { zIndex = Number.MAX_SAFE_INTEGER - 100 } = $$props;
  let { styles = void 0 } = $$props;
  let { keyCode = void 0 } = $$props;
  let { focusSource = void 0 } = $$props;
  let { transitionOptions = void 0 } = $$props;
  const s_IGNORE_CLASSES = { ignoreClasses: ["tjs-focus-wrap"] };
  const local = current_component;
  const dispatch = createEventDispatcher();
  let menuEl;
  let closed = false;
  onMount(() => {
    const keyboardFocus = (focusSource == null ? void 0 : focusSource.source) === "keyboard";
    if (keyboardFocus) {
      const firstFocusEl = A11yHelper.getFirstFocusableElement(menuEl);
      if (firstFocusEl instanceof HTMLElement && !firstFocusEl.classList.contains("tjs-focus-wrap")) {
        firstFocusEl.focus();
      } else {
        menuEl.focus();
      }
    } else {
      menuEl.focus();
    }
  });
  function animate(node) {
    const expandUp = y + node.clientHeight > document.body.clientHeight;
    const expandLeft = x + node.clientWidth > document.body.clientWidth;
    node.style.top = expandUp ? null : `${y}px`;
    node.style.bottom = expandUp ? `${document.body.clientHeight - y}px` : null;
    node.style.left = expandLeft ? null : `${x}px`;
    node.style.right = expandLeft ? `${document.body.clientWidth - x}px` : null;
    return slideFade(node, transitionOptions);
  }
  function onClick(item) {
    const callback = item == null ? void 0 : item.onPress;
    if (typeof callback === "function") {
      callback(item, { focusSource });
    } else {
      A11yHelper.applyFocusSource(focusSource);
      $$invalidate(13, focusSource = void 0);
    }
    if (!closed) {
      dispatch("close");
      closed = true;
      outroAndDestroy(local);
    }
  }
  function onClose(event, isWheel = false) {
    if (event.target === menuEl || menuEl.contains(event.target)) {
      return;
    }
    if (!isWheel && Math.floor(event.pageX) === x && Math.floor(event.pageY) === y) {
      return;
    }
    if (!closed) {
      dispatch("close");
      closed = true;
      outroAndDestroy(local);
    }
  }
  function onKeydownMenu(event) {
    if (event.code === keyCode) {
      event.stopPropagation();
      return;
    }
    switch (event.code) {
      case "Tab":
        event.stopPropagation();
        if (event.shiftKey) {
          const allFocusable = A11yHelper.getFocusableElements(menuEl, s_IGNORE_CLASSES);
          const firstFocusEl = allFocusable.length > 0 ? allFocusable[0] : void 0;
          const lastFocusEl = allFocusable.length > 0 ? allFocusable[allFocusable.length - 1] : void 0;
          if (menuEl === document.activeElement || firstFocusEl === document.activeElement) {
            if (lastFocusEl instanceof HTMLElement && firstFocusEl !== lastFocusEl) {
              lastFocusEl.focus();
            }
            event.preventDefault();
          }
        }
        break;
      default:
        event.stopPropagation();
        break;
    }
  }
  function onKeyupMenu(event) {
    switch (event.code) {
      case "ContextMenu":
      case "Escape":
        event.preventDefault();
        event.stopPropagation();
        if (!closed) {
          closed = true;
          dispatch("close");
          outroAndDestroy(local);
          A11yHelper.applyFocusSource(focusSource);
          $$invalidate(13, focusSource = void 0);
        }
        break;
    }
  }
  function onKeyupItem(event, item) {
    if (event.code === keyCode) {
      if (!closed) {
        closed = true;
        dispatch("close");
        outroAndDestroy(local);
        event.preventDefault();
        event.stopPropagation();
      }
      const callback = item == null ? void 0 : item.onPress;
      if (typeof callback === "function") {
        callback(item, { focusSource });
      } else {
        A11yHelper.applyFocusSource(focusSource);
        $$invalidate(13, focusSource = void 0);
      }
    }
  }
  function onWindowBlur() {
    if (!closed) {
      dispatch("close");
      closed = true;
      outroAndDestroy(local);
      A11yHelper.applyFocusSource(focusSource);
      $$invalidate(13, focusSource = void 0);
    }
  }
  const writable_props = [
    "menu",
    "id",
    "x",
    "y",
    "items",
    "zIndex",
    "styles",
    "keyCode",
    "focusSource",
    "transitionOptions"
  ];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<TJSContextMenuImpl> was created with unknown prop '${key}'`);
  });
  const wheel_handler = (event) => onClose(event, true);
  const click_handler = (item) => onClick(item);
  const keyup_handler = (item, event) => onKeyupItem(event, item);
  const click_handler_1 = (item) => onClick(item);
  const keyup_handler_1 = (item, event) => onKeyupItem(event, item);
  const click_handler_2 = (item) => onClick(item);
  const keyup_handler_2 = (item, event) => onKeyupItem(event, item);
  function nav_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      menuEl = $$value;
      $$invalidate(4, menuEl);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("menu" in $$props2)
      $$invalidate(14, menu = $$props2.menu);
    if ("id" in $$props2)
      $$invalidate(1, id = $$props2.id);
    if ("x" in $$props2)
      $$invalidate(15, x = $$props2.x);
    if ("y" in $$props2)
      $$invalidate(16, y = $$props2.y);
    if ("items" in $$props2)
      $$invalidate(2, items = $$props2.items);
    if ("zIndex" in $$props2)
      $$invalidate(3, zIndex = $$props2.zIndex);
    if ("styles" in $$props2)
      $$invalidate(0, styles = $$props2.styles);
    if ("keyCode" in $$props2)
      $$invalidate(12, keyCode = $$props2.keyCode);
    if ("focusSource" in $$props2)
      $$invalidate(13, focusSource = $$props2.focusSource);
    if ("transitionOptions" in $$props2)
      $$invalidate(17, transitionOptions = $$props2.transitionOptions);
  };
  $$self.$capture_state = () => ({
    createEventDispatcher,
    onMount,
    current_component,
    applyStyles,
    localize,
    slideFade,
    A11yHelper,
    isObject,
    outroAndDestroy,
    TJSFocusWrap: TJSFocusWrap_default,
    menu,
    id,
    x,
    y,
    items,
    zIndex,
    styles,
    keyCode,
    focusSource,
    transitionOptions,
    s_IGNORE_CLASSES,
    local,
    dispatch,
    menuEl,
    closed,
    animate,
    onClick,
    onClose,
    onKeydownMenu,
    onKeyupMenu,
    onKeyupItem,
    onWindowBlur
  });
  $$self.$inject_state = ($$props2) => {
    if ("menu" in $$props2)
      $$invalidate(14, menu = $$props2.menu);
    if ("id" in $$props2)
      $$invalidate(1, id = $$props2.id);
    if ("x" in $$props2)
      $$invalidate(15, x = $$props2.x);
    if ("y" in $$props2)
      $$invalidate(16, y = $$props2.y);
    if ("items" in $$props2)
      $$invalidate(2, items = $$props2.items);
    if ("zIndex" in $$props2)
      $$invalidate(3, zIndex = $$props2.zIndex);
    if ("styles" in $$props2)
      $$invalidate(0, styles = $$props2.styles);
    if ("keyCode" in $$props2)
      $$invalidate(12, keyCode = $$props2.keyCode);
    if ("focusSource" in $$props2)
      $$invalidate(13, focusSource = $$props2.focusSource);
    if ("transitionOptions" in $$props2)
      $$invalidate(17, transitionOptions = $$props2.transitionOptions);
    if ("menuEl" in $$props2)
      $$invalidate(4, menuEl = $$props2.menuEl);
    if ("closed" in $$props2)
      closed = $$props2.closed;
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*menu, styles*/
    16385) {
      $:
        $$invalidate(0, styles = isObject(menu) && isObject(menu.styles) ? menu.styles : isObject(styles) ? styles : void 0);
    }
    if ($$self.$$.dirty[0] & /*menu, keyCode*/
    20480) {
      $:
        $$invalidate(12, keyCode = isObject(menu) && typeof menu.keyCode === "string" ? menu.keyCode : typeof keyCode === "string" ? keyCode : "Enter");
    }
  };
  return [
    styles,
    id,
    items,
    zIndex,
    menuEl,
    animate,
    onClick,
    onClose,
    onKeydownMenu,
    onKeyupMenu,
    onKeyupItem,
    onWindowBlur,
    keyCode,
    focusSource,
    menu,
    x,
    y,
    transitionOptions,
    wheel_handler,
    click_handler,
    keyup_handler,
    click_handler_1,
    keyup_handler_1,
    click_handler_2,
    keyup_handler_2,
    nav_binding
  ];
}
var TJSContextMenuImpl = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(
      this,
      options,
      instance20,
      create_fragment20,
      safe_not_equal,
      {
        menu: 14,
        id: 1,
        x: 15,
        y: 16,
        items: 2,
        zIndex: 3,
        styles: 0,
        keyCode: 12,
        focusSource: 13,
        transitionOptions: 17
      },
      add_css18,
      [-1, -1]
    );
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TJSContextMenuImpl",
      options,
      id: create_fragment20.name
    });
  }
  get menu() {
    throw new Error("<TJSContextMenuImpl>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set menu(value) {
    throw new Error("<TJSContextMenuImpl>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get id() {
    throw new Error("<TJSContextMenuImpl>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set id(value) {
    throw new Error("<TJSContextMenuImpl>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get x() {
    throw new Error("<TJSContextMenuImpl>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set x(value) {
    throw new Error("<TJSContextMenuImpl>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get y() {
    throw new Error("<TJSContextMenuImpl>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set y(value) {
    throw new Error("<TJSContextMenuImpl>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get items() {
    throw new Error("<TJSContextMenuImpl>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set items(value) {
    throw new Error("<TJSContextMenuImpl>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get zIndex() {
    throw new Error("<TJSContextMenuImpl>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set zIndex(value) {
    throw new Error("<TJSContextMenuImpl>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get styles() {
    throw new Error("<TJSContextMenuImpl>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set styles(value) {
    throw new Error("<TJSContextMenuImpl>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get keyCode() {
    throw new Error("<TJSContextMenuImpl>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set keyCode(value) {
    throw new Error("<TJSContextMenuImpl>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get focusSource() {
    throw new Error("<TJSContextMenuImpl>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set focusSource(value) {
    throw new Error("<TJSContextMenuImpl>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get transitionOptions() {
    throw new Error("<TJSContextMenuImpl>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set transitionOptions(value) {
    throw new Error("<TJSContextMenuImpl>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var TJSContextMenuImpl_default = TJSContextMenuImpl;

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/settings/SettingEntry.svelte
var file19 = "node_modules\\@typhonjs-fvtt\\svelte-standard\\_dist\\component\\standard\\settings\\SettingEntry.svelte";
function add_css19(target) {
  append_styles(target, "svelte-68nah2", "div.svelte-68nah2{display:flex;flex-direction:row;flex-wrap:nowrap;flex:3;justify-content:flex-end;align-items:center}div.checkbox.svelte-68nah2{flex:0\n    }label.svelte-68nah2{color:var(--tjs-settings-entry-label-color, inherit);font-size:var(--tjs-settings-entry-label-font-size, inherit);line-height:var(--tjs-settings-entry-label-line-height, var(--form-field-height));flex:2}input[type=range].svelte-68nah2{margin-left:0.25em}span.range-value.svelte-68nah2{display:block;flex:0 1 fit-content;text-align:center;border:var(--tjs-input-border, 1px solid var(--color-border-light-primary));border-radius:var(--tjs-input-border-radius);padding:0.25em;margin-left:0.5em}p.svelte-68nah2{flex:0 0 100%;color:var(--tjs-settings-entry-hint-color, var(--color-text-dark-secondary));font-size:var(--tjs-settings-entry-hint-font-size, var(--font-size-12));line-height:var(--tjs-settings-entry-hint-line-height, var(--line-height-16));margin:var(--tjs-settings-entry-hint-margin, 0.5em 0);min-height:1rem}section.svelte-68nah2{clear:both;display:flex;flex-direction:row;flex-wrap:wrap;align-items:center}section.svelte-68nah2:not(:last-child){margin:var(--tjs-settings-entry-margin, 0 0 1rem 0)}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0dGluZ0VudHJ5LnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUFpRkksaUJBQUEsQ0FDSSxPQUFBLENBQUEsSUFBYSxDQUNiLGNBQUEsQ0FBQSxHQUFtQixDQUNuQixTQUFBLENBQUEsTUFBaUIsQ0FDakIsSUFBQSxDQUFBLENBQU8sQ0FDUCxlQUFBLENBQUEsUUFBeUIsQ0FDekIsV0FBQSxDQUFBLE1BQ0osQ0FFQSxHQUFBLHVCQUFBLENBQ0ksSUFBQSxDQUFBLENBQUE7SUFDSixDQUVBLG1CQUFBLENBQ0ksS0FBQSxDQUFBLElBQUEsZ0NBQUEsQ0FBQSxRQUFBLENBQXFELENBQ3JELFNBQUEsQ0FBQSxJQUFBLG9DQUFBLENBQUEsUUFBQSxDQUE2RCxDQUM3RCxXQUFBLENBQUEsSUFBQSxzQ0FBQSxDQUFBLHlCQUFBLENBQWtGLENBQ2xGLElBQUEsQ0FBQSxDQUNKLENBRUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxLQUFBLGVBQUEsQ0FDSSxXQUFBLENBQUEsTUFDSixDQUVBLElBQUEsMEJBQUEsQ0FDSSxPQUFBLENBQUEsS0FBYyxDQUNkLElBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLFdBQXFCLENBQ3JCLFVBQUEsQ0FBQSxNQUFrQixDQUNsQixNQUFBLENBQUEsSUFBQSxrQkFBQSxDQUFBLDRDQUFBLENBQTRFLENBQzVFLGFBQUEsQ0FBQSxJQUFBLHlCQUFBLENBQTZDLENBQzdDLE9BQUEsQ0FBQSxNQUFlLENBQ2YsV0FBQSxDQUFBLEtBQ0osQ0FFQSxlQUFBLENBQ0ksSUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsSUFBYyxDQUNkLEtBQUEsQ0FBQSxJQUFBLCtCQUFBLENBQUEsaUNBQUEsQ0FBNkUsQ0FDN0UsU0FBQSxDQUFBLElBQUEsbUNBQUEsQ0FBQSxvQkFBQSxDQUF3RSxDQUN4RSxXQUFBLENBQUEsSUFBQSxxQ0FBQSxDQUFBLHNCQUFBLENBQThFLENBQzlFLE1BQUEsQ0FBQSxJQUFBLGdDQUFBLENBQUEsUUFBQSxDQUFzRCxDQUN0RCxVQUFBLENBQUEsSUFDSixDQUVBLHFCQUFBLENBQ0ksS0FBQSxDQUFBLElBQVcsQ0FDWCxPQUFBLENBQUEsSUFBYSxDQUNiLGNBQUEsQ0FBQSxHQUFtQixDQUNuQixTQUFBLENBQUEsSUFBZSxDQUNmLFdBQUEsQ0FBQSxNQUNKLENBRUEscUJBQUEsS0FBQSxXQUFBLENBQUEsQ0FDSSxNQUFBLENBQUEsSUFBQSwyQkFBQSxDQUFBLFdBQUEsQ0FDSiIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJTZXR0aW5nRW50cnkuc3ZlbHRlIl19 */");
}
function create_if_block_62(ctx) {
  let tjsinput;
  let current;
  tjsinput = new TJSInput_default({
    props: { input: (
      /*setting*/
      ctx[0].inputData
    ) },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(tjsinput.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(tjsinput, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const tjsinput_changes = {};
      if (dirty & /*setting*/
      1)
        tjsinput_changes.input = /*setting*/
        ctx2[0].inputData;
      tjsinput.$set(tjsinput_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(tjsinput.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tjsinput.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(tjsinput, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_62.name,
    type: "if",
    source: "(69:51) ",
    ctx
  });
  return block;
}
function create_if_block_53(ctx) {
  let tjsselect;
  let current;
  tjsselect = new TJSSelect_default({
    props: { select: (
      /*setting*/
      ctx[0].selectData
    ) },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(tjsselect.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(tjsselect, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const tjsselect_changes = {};
      if (dirty & /*setting*/
      1)
        tjsselect_changes.select = /*setting*/
        ctx2[0].selectData;
      tjsselect.$set(tjsselect_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(tjsselect.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tjsselect.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(tjsselect, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_53.name,
    type: "if",
    source: "(67:53) ",
    ctx
  });
  return block;
}
function create_if_block_44(ctx) {
  let input;
  let input_id_value;
  let input_min_value;
  let input_max_value;
  let input_step_value;
  let t0;
  let span;
  let t1;
  let mounted;
  let dispose;
  const block = {
    c: function create() {
      input = element("input");
      t0 = space();
      span = element("span");
      t1 = text(
        /*$store*/
        ctx[1]
      );
      attr_dev(input, "type", "range");
      attr_dev(input, "id", input_id_value = /*setting*/
      ctx[0].id);
      attr_dev(input, "min", input_min_value = /*setting*/
      ctx[0].range.min);
      attr_dev(input, "max", input_max_value = /*setting*/
      ctx[0].range.max);
      attr_dev(input, "step", input_step_value = /*setting*/
      ctx[0].range.step);
      attr_dev(input, "class", "svelte-68nah2");
      add_location(input, file19, 64, 12, 2085);
      attr_dev(span, "class", "range-value svelte-68nah2");
      add_location(span, file19, 65, 12, 2228);
    },
    m: function mount(target, anchor) {
      insert_dev(target, input, anchor);
      set_input_value(
        input,
        /*$store*/
        ctx[1]
      );
      insert_dev(target, t0, anchor);
      insert_dev(target, span, anchor);
      append_dev(span, t1);
      if (!mounted) {
        dispose = [
          listen_dev(
            input,
            "change",
            /*input_change_input_handler*/
            ctx[5]
          ),
          listen_dev(
            input,
            "input",
            /*input_change_input_handler*/
            ctx[5]
          )
        ];
        mounted = true;
      }
    },
    p: function update(ctx2, dirty) {
      if (dirty & /*setting*/
      1 && input_id_value !== (input_id_value = /*setting*/
      ctx2[0].id)) {
        attr_dev(input, "id", input_id_value);
      }
      if (dirty & /*setting*/
      1 && input_min_value !== (input_min_value = /*setting*/
      ctx2[0].range.min)) {
        attr_dev(input, "min", input_min_value);
      }
      if (dirty & /*setting*/
      1 && input_max_value !== (input_max_value = /*setting*/
      ctx2[0].range.max)) {
        attr_dev(input, "max", input_max_value);
      }
      if (dirty & /*setting*/
      1 && input_step_value !== (input_step_value = /*setting*/
      ctx2[0].range.step)) {
        attr_dev(input, "step", input_step_value);
      }
      if (dirty & /*$store*/
      2) {
        set_input_value(
          input,
          /*$store*/
          ctx2[1]
        );
      }
      if (dirty & /*$store*/
      2)
        set_data_dev(
          t1,
          /*$store*/
          ctx2[1]
        );
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(input);
      if (detaching)
        detach_dev(t0);
      if (detaching)
        detach_dev(span);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_44.name,
    type: "if",
    source: "(64:52) ",
    ctx
  });
  return block;
}
function create_if_block_35(ctx) {
  let tjsinput;
  let current;
  tjsinput = new TJSInput_default({
    props: { input: (
      /*setting*/
      ctx[0].inputData
    ) },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(tjsinput.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(tjsinput, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const tjsinput_changes = {};
      if (dirty & /*setting*/
      1)
        tjsinput_changes.input = /*setting*/
        ctx2[0].inputData;
      tjsinput.$set(tjsinput_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(tjsinput.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tjsinput.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(tjsinput, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_35.name,
    type: "if",
    source: "(62:53) ",
    ctx
  });
  return block;
}
function create_if_block_26(ctx) {
  let input;
  let input_id_value;
  let mounted;
  let dispose;
  const block = {
    c: function create() {
      input = element("input");
      attr_dev(input, "type", "checkbox");
      attr_dev(input, "id", input_id_value = /*setting*/
      ctx[0].id);
      add_location(input, file19, 60, 12, 1853);
    },
    m: function mount(target, anchor) {
      insert_dev(target, input, anchor);
      input.checked = /*$store*/
      ctx[1];
      if (!mounted) {
        dispose = listen_dev(
          input,
          "change",
          /*input_change_handler*/
          ctx[4]
        );
        mounted = true;
      }
    },
    p: function update(ctx2, dirty) {
      if (dirty & /*setting*/
      1 && input_id_value !== (input_id_value = /*setting*/
      ctx2[0].id)) {
        attr_dev(input, "id", input_id_value);
      }
      if (dirty & /*$store*/
      2) {
        input.checked = /*$store*/
        ctx2[1];
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(input);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_26.name,
    type: "if",
    source: "(60:8) {#if setting.componentType === 'checkbox'}",
    ctx
  });
  return block;
}
function create_if_block_19(ctx) {
  let tjsiconbutton;
  let current;
  tjsiconbutton = new TJSIconButton_default({
    props: { button: (
      /*setting*/
      ctx[0].buttonData
    ) },
    $$inline: true
  });
  tjsiconbutton.$on(
    "click",
    /*onFilePicker*/
    ctx[3]
  );
  const block = {
    c: function create() {
      create_component(tjsiconbutton.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(tjsiconbutton, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const tjsiconbutton_changes = {};
      if (dirty & /*setting*/
      1)
        tjsiconbutton_changes.button = /*setting*/
        ctx2[0].buttonData;
      tjsiconbutton.$set(tjsiconbutton_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(tjsiconbutton.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tjsiconbutton.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(tjsiconbutton, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_19.name,
    type: "if",
    source: "(72:8) {#if setting.filePicker}",
    ctx
  });
  return block;
}
function create_if_block13(ctx) {
  let p;
  let t_value = (
    /*setting*/
    ctx[0].hint + ""
  );
  let t;
  const block = {
    c: function create() {
      p = element("p");
      t = text(t_value);
      attr_dev(p, "class", "hint svelte-68nah2");
      add_location(p, file19, 76, 8, 2664);
    },
    m: function mount(target, anchor) {
      insert_dev(target, p, anchor);
      append_dev(p, t);
    },
    p: function update(ctx2, dirty) {
      if (dirty & /*setting*/
      1 && t_value !== (t_value = /*setting*/
      ctx2[0].hint + ""))
        set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(p);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block13.name,
    type: "if",
    source: "(76:4) {#if setting.hint}",
    ctx
  });
  return block;
}
function create_fragment21(ctx) {
  let section;
  let label;
  let t0_value = (
    /*setting*/
    ctx[0].name + ""
  );
  let t0;
  let label_for_value;
  let t1;
  let div;
  let current_block_type_index;
  let if_block0;
  let t2;
  let t3;
  let current;
  const if_block_creators = [
    create_if_block_26,
    create_if_block_35,
    create_if_block_44,
    create_if_block_53,
    create_if_block_62
  ];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*setting*/
      ctx2[0].componentType === "checkbox"
    )
      return 0;
    if (
      /*setting*/
      ctx2[0].componentType === "number"
    )
      return 1;
    if (
      /*setting*/
      ctx2[0].componentType === "range"
    )
      return 2;
    if (
      /*setting*/
      ctx2[0].componentType === "select"
    )
      return 3;
    if (
      /*setting*/
      ctx2[0].componentType === "text"
    )
      return 4;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx, -1))) {
    if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  let if_block1 = (
    /*setting*/
    ctx[0].filePicker && create_if_block_19(ctx)
  );
  let if_block2 = (
    /*setting*/
    ctx[0].hint && create_if_block13(ctx)
  );
  const block = {
    c: function create() {
      section = element("section");
      label = element("label");
      t0 = text(t0_value);
      t1 = space();
      div = element("div");
      if (if_block0)
        if_block0.c();
      t2 = space();
      if (if_block1)
        if_block1.c();
      t3 = space();
      if (if_block2)
        if_block2.c();
      attr_dev(label, "for", label_for_value = /*setting*/
      ctx[0].id);
      attr_dev(label, "class", "svelte-68nah2");
      add_location(label, file19, 57, 4, 1679);
      attr_dev(div, "class", "svelte-68nah2");
      toggle_class(
        div,
        "checkbox",
        /*setting*/
        ctx[0].componentType === "checkbox"
      );
      add_location(div, file19, 58, 4, 1730);
      attr_dev(section, "class", "tjs-settings-entry svelte-68nah2");
      add_location(section, file19, 56, 0, 1640);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, section, anchor);
      append_dev(section, label);
      append_dev(label, t0);
      append_dev(section, t1);
      append_dev(section, div);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(div, null);
      }
      append_dev(div, t2);
      if (if_block1)
        if_block1.m(div, null);
      append_dev(section, t3);
      if (if_block2)
        if_block2.m(section, null);
      current = true;
    },
    p: function update(ctx2, [dirty]) {
      if ((!current || dirty & /*setting*/
      1) && t0_value !== (t0_value = /*setting*/
      ctx2[0].name + ""))
        set_data_dev(t0, t0_value);
      if (!current || dirty & /*setting*/
      1 && label_for_value !== (label_for_value = /*setting*/
      ctx2[0].id)) {
        attr_dev(label, "for", label_for_value);
      }
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2, dirty);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        }
      } else {
        if (if_block0) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block0 = if_blocks[current_block_type_index];
          if (!if_block0) {
            if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block0.c();
          } else {
            if_block0.p(ctx2, dirty);
          }
          transition_in(if_block0, 1);
          if_block0.m(div, t2);
        } else {
          if_block0 = null;
        }
      }
      if (
        /*setting*/
        ctx2[0].filePicker
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & /*setting*/
          1) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_19(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (!current || dirty & /*setting*/
      1) {
        toggle_class(
          div,
          "checkbox",
          /*setting*/
          ctx2[0].componentType === "checkbox"
        );
      }
      if (
        /*setting*/
        ctx2[0].hint
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
        } else {
          if_block2 = create_if_block13(ctx2);
          if_block2.c();
          if_block2.m(section, null);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(section);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
      if (if_block1)
        if_block1.d();
      if (if_block2)
        if_block2.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment21.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance21($$self, $$props, $$invalidate) {
  let $store;
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("SettingEntry", slots, []);
  let { setting = void 0 } = $$props;
  const store = setting.store;
  validate_store(store, "store");
  component_subscribe($$self, store, (value) => $$invalidate(1, $store = value));
  let filePickerApp;
  function onFilePicker() {
    if (filePickerApp) {
      filePickerApp.bringToTop();
      return;
    }
    filePickerApp = new FilePicker({
      type: setting.filePicker,
      current: setting.value,
      callback: (result) => set_store_value(store, $store = result, $store)
    });
    const originalClose = filePickerApp.close;
    filePickerApp.close = async function(options) {
      await originalClose.call(filePickerApp, options);
      filePickerApp = void 0;
    };
    filePickerApp.render(true, { focus: true });
  }
  const writable_props = ["setting"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<SettingEntry> was created with unknown prop '${key}'`);
  });
  function input_change_handler() {
    $store = this.checked;
    store.set($store);
  }
  function input_change_input_handler() {
    $store = to_number(this.value);
    store.set($store);
  }
  $$self.$$set = ($$props2) => {
    if ("setting" in $$props2)
      $$invalidate(0, setting = $$props2.setting);
  };
  $$self.$capture_state = () => ({
    TJSIconButton: TJSIconButton_default,
    TJSInput: TJSInput_default,
    TJSSelect: TJSSelect_default,
    setting,
    store,
    filePickerApp,
    onFilePicker,
    $store
  });
  $$self.$inject_state = ($$props2) => {
    if ("setting" in $$props2)
      $$invalidate(0, setting = $$props2.setting);
    if ("filePickerApp" in $$props2)
      filePickerApp = $$props2.filePickerApp;
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [
    setting,
    $store,
    store,
    onFilePicker,
    input_change_handler,
    input_change_input_handler
  ];
}
var SettingEntry = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance21, create_fragment21, safe_not_equal, { setting: 0 }, add_css19);
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "SettingEntry",
      options,
      id: create_fragment21.name
    });
  }
  get setting() {
    throw new Error("<SettingEntry>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set setting(value) {
    throw new Error("<SettingEntry>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var SettingEntry_default = SettingEntry;

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/settings/TJSSettingsEdit.svelte
var file20 = "node_modules\\@typhonjs-fvtt\\svelte-standard\\_dist\\component\\standard\\settings\\TJSSettingsEdit.svelte";
function add_css20(target) {
  append_styles(target, "svelte-1for2vx", "main.svelte-1for2vx{display:flex;flex-direction:column;height:100%;background:var(--tjs-settings-background, none)}.scrollable.svelte-1for2vx{display:flex;flex:1;flex-direction:column;flex-wrap:nowrap;min-height:0;overflow:hidden auto;padding:var(--tjs-settings-padding, 0);scrollbar-width:thin}section.svelte-1for2vx{background:var(--tjs-settings-section-background, none);border:var(--tjs-settings-section-border, none);border-radius:var(--tjs-settings-section-border-radius, 0);padding:var(--tjs-settings-section-padding, 0.5em)}section.svelte-1for2vx:not(:last-child){margin-bottom:var(--tjs-settings-section-margin-bottom, 0.75em)}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVEpTU2V0dGluZ3NFZGl0LnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUFrSEcsbUJBQUEsQ0FDRyxPQUFBLENBQUEsSUFBYSxDQUNiLGNBQUEsQ0FBQSxNQUFzQixDQUN0QixNQUFBLENBQUEsSUFBWSxDQUNaLFVBQUEsQ0FBQSxJQUFBLHlCQUFBLENBQUEsS0FBQSxDQUNILENBRUEsMEJBQUEsQ0FDRyxPQUFBLENBQUEsSUFBYSxDQUNiLElBQUEsQ0FBQSxDQUFPLENBQ1AsY0FBQSxDQUFBLE1BQXNCLENBQ3RCLFNBQUEsQ0FBQSxNQUFpQixDQUNqQixVQUFBLENBQUEsQ0FBYSxDQUNiLFFBQUEsQ0FBQSxNQUFBLENBQUEsSUFBcUIsQ0FDckIsT0FBQSxDQUFBLElBQUEsc0JBQUEsQ0FBQSxFQUFBLENBQXVDLENBRXZDLGVBQUEsQ0FBQSxJQUNILENBRUEsc0JBQUEsQ0FDRyxVQUFBLENBQUEsSUFBQSxpQ0FBQSxDQUFBLEtBQUEsQ0FBd0QsQ0FDeEQsTUFBQSxDQUFBLElBQUEsNkJBQUEsQ0FBQSxLQUFBLENBQWdELENBQ2hELGFBQUEsQ0FBQSxJQUFBLG9DQUFBLENBQUEsRUFBQSxDQUEyRCxDQUMzRCxPQUFBLENBQUEsSUFBQSw4QkFBQSxDQUFBLE1BQUEsQ0FDSCxDQUVBLHNCQUFBLEtBQUEsV0FBQSxDQUFBLENBQ0csYUFBQSxDQUFBLElBQUEsb0NBQUEsQ0FBQSxPQUFBLENBQ0giLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiVEpTU2V0dGluZ3NFZGl0LnN2ZWx0ZSJdfQ== */");
}
var get_settings_footer_slot_changes = (dirty) => ({
  settings: dirty & /*settings*/
  1,
  options: dirty & /*options*/
  2
});
var get_settings_footer_slot_context = (ctx) => ({
  settings: (
    /*settings*/
    ctx[0]
  ),
  options: (
    /*options*/
    ctx[1]
  ),
  uiSettings: (
    /*uiSettings*/
    ctx[3]
  )
});
function get_each_context6(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[6] = list[i];
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[9] = list[i];
  return child_ctx;
}
function get_each_context_2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[12] = list[i];
  return child_ctx;
}
function get_each_context_3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[12] = list[i];
  return child_ctx;
}
var get_settings_header_slot_changes = (dirty) => ({
  settings: dirty & /*settings*/
  1,
  options: dirty & /*options*/
  2
});
var get_settings_header_slot_context = (ctx) => ({
  settings: (
    /*settings*/
    ctx[0]
  ),
  options: (
    /*options*/
    ctx[1]
  ),
  uiSettings: (
    /*uiSettings*/
    ctx[3]
  )
});
function create_if_block_27(ctx) {
  let section;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let current;
  let each_value_3 = (
    /*uiSettings*/
    ctx[3].topLevel
  );
  validate_each_argument(each_value_3);
  const get_key = (ctx2) => (
    /*setting*/
    ctx2[12].key
  );
  validate_each_keys(ctx, each_value_3, get_each_context_3, get_key);
  for (let i = 0; i < each_value_3.length; i += 1) {
    let child_ctx = get_each_context_3(ctx, each_value_3, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block_3(key, child_ctx));
  }
  const block = {
    c: function create() {
      section = element("section");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr_dev(section, "class", "tjs-settings-section svelte-1for2vx");
      add_location(section, file20, 77, 9, 3452);
    },
    m: function mount(target, anchor) {
      insert_dev(target, section, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(section, null);
        }
      }
      current = true;
    },
    p: function update(ctx2, dirty) {
      if (dirty & /*uiSettings*/
      8) {
        each_value_3 = /*uiSettings*/
        ctx2[3].topLevel;
        validate_each_argument(each_value_3);
        group_outros();
        validate_each_keys(ctx2, each_value_3, get_each_context_3, get_key);
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value_3, each_1_lookup, section, outro_and_destroy_block, create_each_block_3, null, get_each_context_3);
        check_outros();
      }
    },
    i: function intro(local) {
      if (current)
        return;
      for (let i = 0; i < each_value_3.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o: function outro(local) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(section);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_27.name,
    type: "if",
    source: "(77:6) {#if uiSettings.topLevel.length}",
    ctx
  });
  return block;
}
function create_each_block_3(key_1, ctx) {
  let first;
  let settingentry;
  let current;
  settingentry = new SettingEntry_default({
    props: { setting: (
      /*setting*/
      ctx[12]
    ) },
    $$inline: true
  });
  const block = {
    key: key_1,
    first: null,
    c: function create() {
      first = empty();
      create_component(settingentry.$$.fragment);
      this.first = first;
    },
    m: function mount(target, anchor) {
      insert_dev(target, first, anchor);
      mount_component(settingentry, target, anchor);
      current = true;
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(settingentry.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(settingentry.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(first);
      destroy_component(settingentry, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_each_block_3.name,
    type: "each",
    source: "(79:12) {#each uiSettings.topLevel as setting (setting.key)}",
    ctx
  });
  return block;
}
function create_each_block_2(key_1, ctx) {
  let first;
  let settingentry;
  let current;
  settingentry = new SettingEntry_default({
    props: { setting: (
      /*setting*/
      ctx[12]
    ) },
    $$inline: true
  });
  const block = {
    key: key_1,
    first: null,
    c: function create() {
      first = empty();
      create_component(settingentry.$$.fragment);
      this.first = first;
    },
    m: function mount(target, anchor) {
      insert_dev(target, first, anchor);
      mount_component(settingentry, target, anchor);
      current = true;
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(settingentry.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(settingentry.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(first);
      destroy_component(settingentry, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_each_block_2.name,
    type: "each",
    source: "(87:12) {#each folder.settings as setting (setting.key)}",
    ctx
  });
  return block;
}
function create_default_slot_1(ctx) {
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let each_1_anchor;
  let current;
  let each_value_2 = (
    /*folder*/
    ctx[9].settings
  );
  validate_each_argument(each_value_2);
  const get_key = (ctx2) => (
    /*setting*/
    ctx2[12].key
  );
  validate_each_keys(ctx, each_value_2, get_each_context_2, get_key);
  for (let i = 0; i < each_value_2.length; i += 1) {
    let child_ctx = get_each_context_2(ctx, each_value_2, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block_2(key, child_ctx));
  }
  const block = {
    c: function create() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    m: function mount(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert_dev(target, each_1_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      if (dirty & /*uiSettings*/
      8) {
        each_value_2 = /*folder*/
        ctx2[9].settings;
        validate_each_argument(each_value_2);
        group_outros();
        validate_each_keys(ctx2, each_value_2, get_each_context_2, get_key);
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value_2, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block_2, each_1_anchor, get_each_context_2);
        check_outros();
      }
    },
    i: function intro(local) {
      if (current)
        return;
      for (let i = 0; i < each_value_2.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o: function outro(local) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d: function destroy(detaching) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d(detaching);
      }
      if (detaching)
        detach_dev(each_1_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_1.name,
    type: "slot",
    source: "(86:9) <TJSSvgFolder label={folder.label} store={folder.store}>",
    ctx
  });
  return block;
}
function create_each_block_1(ctx) {
  let section;
  let tjssvgfolder;
  let current;
  tjssvgfolder = new TJSSvgFolder_default({
    props: {
      label: (
        /*folder*/
        ctx[9].label
      ),
      store: (
        /*folder*/
        ctx[9].store
      ),
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      section = element("section");
      create_component(tjssvgfolder.$$.fragment);
      attr_dev(section, "class", "tjs-settings-section svelte-1for2vx");
      add_location(section, file20, 84, 6, 3697);
    },
    m: function mount(target, anchor) {
      insert_dev(target, section, anchor);
      mount_component(tjssvgfolder, section, null);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const tjssvgfolder_changes = {};
      if (dirty & /*$$scope*/
      32) {
        tjssvgfolder_changes.$$scope = { dirty, ctx: ctx2 };
      }
      tjssvgfolder.$set(tjssvgfolder_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(tjssvgfolder.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tjssvgfolder.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(section);
      destroy_component(tjssvgfolder);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_each_block_1.name,
    type: "each",
    source: "(84:6) {#each uiSettings.folders as folder}",
    ctx
  });
  return block;
}
function create_else_block6(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    typeof /*section*/
    ctx[6].props === "object" ? (
      /*section*/
      ctx[6].props
    ) : {}
  ];
  var switch_value = (
    /*section*/
    ctx[6].class
  );
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return {
      props: switch_instance_props,
      $$inline: true
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
  }
  const block = {
    c: function create() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const switch_instance_changes = dirty & /*uiSettings*/
      8 ? get_spread_update(switch_instance_spread_levels, [
        get_spread_object(typeof /*section*/
        ctx2[6].props === "object" ? (
          /*section*/
          ctx2[6].props
        ) : {})
      ]) : {};
      if (switch_value !== (switch_value = /*section*/
      ctx2[6].class)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_else_block6.name,
    type: "else",
    source: "(105:12) {:else}",
    ctx
  });
  return block;
}
function create_if_block14(ctx) {
  let tjssvgfolder;
  let current;
  tjssvgfolder = new TJSSvgFolder_default({
    props: {
      folder: (
        /*section*/
        ctx[6].folder
      ),
      $$slots: {
        "summary-end": [create_summary_end_slot],
        default: [create_default_slot]
      },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(tjssvgfolder.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(tjssvgfolder, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const tjssvgfolder_changes = {};
      if (dirty & /*$$scope*/
      32) {
        tjssvgfolder_changes.$$scope = { dirty, ctx: ctx2 };
      }
      tjssvgfolder.$set(tjssvgfolder_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(tjssvgfolder.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tjssvgfolder.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(tjssvgfolder, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block14.name,
    type: "if",
    source: "(95:12) {#if section.folder}",
    ctx
  });
  return block;
}
function create_default_slot(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    typeof /*section*/
    ctx[6].props === "object" ? (
      /*section*/
      ctx[6].props
    ) : {}
  ];
  var switch_value = (
    /*section*/
    ctx[6].class
  );
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return {
      props: switch_instance_props,
      $$inline: true
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
  }
  const block = {
    c: function create() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const switch_instance_changes = dirty & /*uiSettings*/
      8 ? get_spread_update(switch_instance_spread_levels, [
        get_spread_object(typeof /*section*/
        ctx2[6].props === "object" ? (
          /*section*/
          ctx2[6].props
        ) : {})
      ]) : {};
      if (switch_value !== (switch_value = /*section*/
      ctx2[6].class)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot.name,
    type: "slot",
    source: "(96:15) <TJSSvgFolder folder={section.folder}>",
    ctx
  });
  return block;
}
function create_if_block_110(ctx) {
  var _a, _b, _c;
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    typeof /*section*/
    ((_c = (_b = (_a = ctx[6]) == null ? void 0 : _a.folder) == null ? void 0 : _b.summaryEnd) == null ? void 0 : _c.props) === "object" ? (
      /*section*/
      ctx[6].folder.summaryEnd.props
    ) : {}
  ];
  var switch_value = (
    /*section*/
    ctx[6].folder.summaryEnd.class
  );
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return {
      props: switch_instance_props,
      $$inline: true
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
  }
  const block = {
    c: function create() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      var _a2, _b2, _c2;
      const switch_instance_changes = dirty & /*uiSettings*/
      8 ? get_spread_update(switch_instance_spread_levels, [
        get_spread_object(typeof /*section*/
        ((_c2 = (_b2 = (_a2 = ctx2[6]) == null ? void 0 : _a2.folder) == null ? void 0 : _b2.summaryEnd) == null ? void 0 : _c2.props) === "object" ? (
          /*section*/
          ctx2[6].folder.summaryEnd.props
        ) : {})
      ]) : {};
      if (switch_value !== (switch_value = /*section*/
      ctx2[6].folder.summaryEnd.class)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_110.name,
    type: "if",
    source: "(100:21) {#if isSvelteComponent(section?.folder?.summaryEnd?.class)}",
    ctx
  });
  return block;
}
function create_summary_end_slot(ctx) {
  var _a, _b, _c;
  let show_if = isSvelteComponent(
    /*section*/
    (_c = (_b = (_a = ctx[6]) == null ? void 0 : _a.folder) == null ? void 0 : _b.summaryEnd) == null ? void 0 : _c.class
  );
  let if_block_anchor;
  let current;
  let if_block = show_if && create_if_block_110(ctx);
  const block = {
    c: function create() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      if (show_if)
        if_block.p(ctx2, dirty);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_summary_end_slot.name,
    type: "slot",
    source: "(99:18) <svelte:fragment slot=summary-end>",
    ctx
  });
  return block;
}
function create_each_block6(ctx) {
  let section;
  let current_block_type_index;
  let if_block;
  let t;
  let applyStyles_action;
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block14, create_else_block6];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*section*/
      ctx2[6].folder
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx, -1);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  const block = {
    c: function create() {
      section = element("section");
      if_block.c();
      t = space();
      attr_dev(section, "class", "tjs-settings-section svelte-1for2vx");
      add_location(section, file20, 93, 9, 4033);
    },
    m: function mount(target, anchor) {
      insert_dev(target, section, anchor);
      if_blocks[current_block_type_index].m(section, null);
      append_dev(section, t);
      current = true;
      if (!mounted) {
        dispose = action_destroyer(applyStyles_action = applyStyles.call(
          null,
          section,
          /*section*/
          ctx[6].styles
        ));
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      if_block.p(ctx, dirty);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(section);
      if_blocks[current_block_type_index].d();
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_each_block6.name,
    type: "each",
    source: "(93:6) {#each uiSettings.sections as section}",
    ctx
  });
  return block;
}
function create_fragment22(ctx) {
  let main;
  let t0;
  let div;
  let t1;
  let t2;
  let applyScrolltop_action;
  let t3;
  let applyStyles_action;
  let current;
  let mounted;
  let dispose;
  const settings_header_slot_template = (
    /*#slots*/
    ctx[4]["settings-header"]
  );
  const settings_header_slot = create_slot(
    settings_header_slot_template,
    ctx,
    /*$$scope*/
    ctx[5],
    get_settings_header_slot_context
  );
  let if_block = (
    /*uiSettings*/
    ctx[3].topLevel.length && create_if_block_27(ctx)
  );
  let each_value_1 = (
    /*uiSettings*/
    ctx[3].folders
  );
  validate_each_argument(each_value_1);
  let each_blocks_1 = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  const out = (i) => transition_out(each_blocks_1[i], 1, 1, () => {
    each_blocks_1[i] = null;
  });
  let each_value = (
    /*uiSettings*/
    ctx[3].sections
  );
  validate_each_argument(each_value);
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block6(get_each_context6(ctx, each_value, i));
  }
  const out_1 = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  const settings_footer_slot_template = (
    /*#slots*/
    ctx[4]["settings-footer"]
  );
  const settings_footer_slot = create_slot(
    settings_footer_slot_template,
    ctx,
    /*$$scope*/
    ctx[5],
    get_settings_footer_slot_context
  );
  const block = {
    c: function create() {
      main = element("main");
      if (settings_header_slot)
        settings_header_slot.c();
      t0 = space();
      div = element("div");
      if (if_block)
        if_block.c();
      t1 = space();
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].c();
      }
      t2 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t3 = space();
      if (settings_footer_slot)
        settings_footer_slot.c();
      attr_dev(div, "class", "scrollable svelte-1for2vx");
      add_location(div, file20, 75, 3, 3334);
      attr_dev(main, "class", "tjs-settings svelte-1for2vx");
      add_location(main, file20, 73, 0, 3213);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, main, anchor);
      if (settings_header_slot) {
        settings_header_slot.m(main, null);
      }
      append_dev(main, t0);
      append_dev(main, div);
      if (if_block)
        if_block.m(div, null);
      append_dev(div, t1);
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        if (each_blocks_1[i]) {
          each_blocks_1[i].m(div, null);
        }
      }
      append_dev(div, t2);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div, null);
        }
      }
      append_dev(main, t3);
      if (settings_footer_slot) {
        settings_footer_slot.m(main, null);
      }
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(applyScrolltop_action = applyScrolltop.call(
            null,
            div,
            /*uiSettings*/
            ctx[3].storeScrollbar
          )),
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            main,
            /*styles*/
            ctx[2]
          ))
        ];
        mounted = true;
      }
    },
    p: function update(ctx2, [dirty]) {
      if (settings_header_slot) {
        if (settings_header_slot.p && (!current || dirty & /*$$scope, settings, options*/
        35)) {
          update_slot_base(
            settings_header_slot,
            settings_header_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[5],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[5]
            ) : get_slot_changes(
              settings_header_slot_template,
              /*$$scope*/
              ctx2[5],
              dirty,
              get_settings_header_slot_changes
            ),
            get_settings_header_slot_context
          );
        }
      }
      if (
        /*uiSettings*/
        ctx2[3].topLevel.length
      )
        if_block.p(ctx2, dirty);
      if (dirty & /*uiSettings*/
      8) {
        each_value_1 = /*uiSettings*/
        ctx2[3].folders;
        validate_each_argument(each_value_1);
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx2, each_value_1, i);
          if (each_blocks_1[i]) {
            each_blocks_1[i].p(child_ctx, dirty);
            transition_in(each_blocks_1[i], 1);
          } else {
            each_blocks_1[i] = create_each_block_1(child_ctx);
            each_blocks_1[i].c();
            transition_in(each_blocks_1[i], 1);
            each_blocks_1[i].m(div, t2);
          }
        }
        group_outros();
        for (i = each_value_1.length; i < each_blocks_1.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      if (dirty & /*uiSettings, isSvelteComponent*/
      8) {
        each_value = /*uiSettings*/
        ctx2[3].sections;
        validate_each_argument(each_value);
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context6(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block6(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out_1(i);
        }
        check_outros();
      }
      if (settings_footer_slot) {
        if (settings_footer_slot.p && (!current || dirty & /*$$scope, settings, options*/
        35)) {
          update_slot_base(
            settings_footer_slot,
            settings_footer_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[5],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[5]
            ) : get_slot_changes(
              settings_footer_slot_template,
              /*$$scope*/
              ctx2[5],
              dirty,
              get_settings_footer_slot_changes
            ),
            get_settings_footer_slot_context
          );
        }
      }
      if (applyStyles_action && is_function(applyStyles_action.update) && dirty & /*styles*/
      4)
        applyStyles_action.update.call(
          null,
          /*styles*/
          ctx2[2]
        );
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(settings_header_slot, local);
      transition_in(if_block);
      for (let i = 0; i < each_value_1.length; i += 1) {
        transition_in(each_blocks_1[i]);
      }
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      transition_in(settings_footer_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(settings_header_slot, local);
      transition_out(if_block);
      each_blocks_1 = each_blocks_1.filter(Boolean);
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        transition_out(each_blocks_1[i]);
      }
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      transition_out(settings_footer_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(main);
      if (settings_header_slot)
        settings_header_slot.d(detaching);
      if (if_block)
        if_block.d();
      destroy_each(each_blocks_1, detaching);
      destroy_each(each_blocks, detaching);
      if (settings_footer_slot)
        settings_footer_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment22.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance22($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TJSSettingsEdit", slots, ["settings-header", "settings-footer"]);
  let { settings = void 0 } = $$props;
  let { options = void 0 } = $$props;
  let { styles = void 0 } = $$props;
  const uiSettings = settings.uiControl.create(options);
  onDestroy(() => uiSettings.destroy());
  const writable_props = ["settings", "options", "styles"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<TJSSettingsEdit> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("settings" in $$props2)
      $$invalidate(0, settings = $$props2.settings);
    if ("options" in $$props2)
      $$invalidate(1, options = $$props2.options);
    if ("styles" in $$props2)
      $$invalidate(2, styles = $$props2.styles);
    if ("$$scope" in $$props2)
      $$invalidate(5, $$scope = $$props2.$$scope);
  };
  $$self.$capture_state = () => ({
    onDestroy,
    applyScrolltop,
    applyStyles,
    isSvelteComponent,
    TJSSvgFolder: TJSSvgFolder_default,
    SettingEntry: SettingEntry_default,
    settings,
    options,
    styles,
    uiSettings
  });
  $$self.$inject_state = ($$props2) => {
    if ("settings" in $$props2)
      $$invalidate(0, settings = $$props2.settings);
    if ("options" in $$props2)
      $$invalidate(1, options = $$props2.options);
    if ("styles" in $$props2)
      $$invalidate(2, styles = $$props2.styles);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [settings, options, styles, uiSettings, slots, $$scope];
}
var TJSSettingsEdit = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance22, create_fragment22, safe_not_equal, { settings: 0, options: 1, styles: 2 }, add_css20);
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TJSSettingsEdit",
      options,
      id: create_fragment22.name
    });
  }
  get settings() {
    throw new Error("<TJSSettingsEdit>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set settings(value) {
    throw new Error("<TJSSettingsEdit>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get options() {
    throw new Error("<TJSSettingsEdit>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set options(value) {
    throw new Error("<TJSSettingsEdit>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get styles() {
    throw new Error("<TJSSettingsEdit>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set styles(value) {
    throw new Error("<TJSSettingsEdit>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var TJSSettingsEdit_default = TJSSettingsEdit;

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/settings/TJSSettingsSwap.svelte
var get_settings_header_slot_changes2 = (dirty) => ({
  settings: dirty & /*settings*/
  1,
  options: dirty & /*options*/
  2,
  uiSettings: dirty & /*uiSettings*/
  64
});
var get_settings_header_slot_context2 = (ctx) => ({
  slot: "settings-header",
  settings: (
    /*settings*/
    ctx[0]
  ),
  options: (
    /*options*/
    ctx[1]
  ),
  uiSettings: (
    /*uiSettings*/
    ctx[6]
  )
});
var get_settings_footer_slot_changes2 = (dirty) => ({
  settings: dirty & /*settings*/
  1,
  options: dirty & /*options*/
  2,
  uiSettings: dirty & /*uiSettings*/
  64
});
var get_settings_footer_slot_context2 = (ctx) => ({
  slot: "settings-footer",
  settings: (
    /*settings*/
    ctx[0]
  ),
  options: (
    /*options*/
    ctx[1]
  ),
  uiSettings: (
    /*uiSettings*/
    ctx[6]
  )
});
function create_else_block7(ctx) {
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[4].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[5],
    null
  );
  const block = {
    c: function create() {
      if (default_slot)
        default_slot.c();
    },
    m: function mount(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p: function update(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        32)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[5],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[5]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[5],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_else_block7.name,
    type: "else",
    source: "(30:0) {:else}",
    ctx
  });
  return block;
}
function create_if_block15(ctx) {
  let tjssettingsedit;
  let current;
  tjssettingsedit = new TJSSettingsEdit_default({
    props: {
      settings: (
        /*settings*/
        ctx[0]
      ),
      options: (
        /*options*/
        ctx[1]
      ),
      $$slots: {
        "settings-footer": [
          create_settings_footer_slot,
          ({ uiSettings }) => ({ 6: uiSettings }),
          ({ uiSettings }) => uiSettings ? 64 : 0
        ],
        "settings-header": [
          create_settings_header_slot,
          ({ uiSettings }) => ({ 6: uiSettings }),
          ({ uiSettings }) => uiSettings ? 64 : 0
        ]
      },
      $$scope: { ctx }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(tjssettingsedit.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(tjssettingsedit, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const tjssettingsedit_changes = {};
      if (dirty & /*settings*/
      1)
        tjssettingsedit_changes.settings = /*settings*/
        ctx2[0];
      if (dirty & /*options*/
      2)
        tjssettingsedit_changes.options = /*options*/
        ctx2[1];
      if (dirty & /*$$scope, settings, options, uiSettings*/
      99) {
        tjssettingsedit_changes.$$scope = { dirty, ctx: ctx2 };
      }
      tjssettingsedit.$set(tjssettingsedit_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(tjssettingsedit.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tjssettingsedit.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(tjssettingsedit, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block15.name,
    type: "if",
    source: "(25:0) {#if $showSettings}",
    ctx
  });
  return block;
}
function create_settings_header_slot(ctx) {
  let current;
  const settings_header_slot_template = (
    /*#slots*/
    ctx[4]["settings-header"]
  );
  const settings_header_slot = create_slot(
    settings_header_slot_template,
    ctx,
    /*$$scope*/
    ctx[5],
    get_settings_header_slot_context2
  );
  const block = {
    c: function create() {
      if (settings_header_slot)
        settings_header_slot.c();
    },
    m: function mount(target, anchor) {
      if (settings_header_slot) {
        settings_header_slot.m(target, anchor);
      }
      current = true;
    },
    p: function update(ctx2, dirty) {
      if (settings_header_slot) {
        if (settings_header_slot.p && (!current || dirty & /*$$scope, settings, options, uiSettings*/
        99)) {
          update_slot_base(
            settings_header_slot,
            settings_header_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[5],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[5]
            ) : get_slot_changes(
              settings_header_slot_template,
              /*$$scope*/
              ctx2[5],
              dirty,
              get_settings_header_slot_changes2
            ),
            get_settings_header_slot_context2
          );
        }
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(settings_header_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(settings_header_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (settings_header_slot)
        settings_header_slot.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_settings_header_slot.name,
    type: "slot",
    source: "(27:8) ",
    ctx
  });
  return block;
}
function create_settings_footer_slot(ctx) {
  let current;
  const settings_footer_slot_template = (
    /*#slots*/
    ctx[4]["settings-footer"]
  );
  const settings_footer_slot = create_slot(
    settings_footer_slot_template,
    ctx,
    /*$$scope*/
    ctx[5],
    get_settings_footer_slot_context2
  );
  const block = {
    c: function create() {
      if (settings_footer_slot)
        settings_footer_slot.c();
    },
    m: function mount(target, anchor) {
      if (settings_footer_slot) {
        settings_footer_slot.m(target, anchor);
      }
      current = true;
    },
    p: function update(ctx2, dirty) {
      if (settings_footer_slot) {
        if (settings_footer_slot.p && (!current || dirty & /*$$scope, settings, options, uiSettings*/
        99)) {
          update_slot_base(
            settings_footer_slot,
            settings_footer_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[5],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[5]
            ) : get_slot_changes(
              settings_footer_slot_template,
              /*$$scope*/
              ctx2[5],
              dirty,
              get_settings_footer_slot_changes2
            ),
            get_settings_footer_slot_context2
          );
        }
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(settings_footer_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(settings_footer_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (settings_footer_slot)
        settings_footer_slot.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_settings_footer_slot.name,
    type: "slot",
    source: "(28:8) ",
    ctx
  });
  return block;
}
function create_fragment23(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block15, create_else_block7];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*$showSettings*/
      ctx2[2]
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx, -1);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  const block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2, dirty);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment23.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance23($$self, $$props, $$invalidate) {
  let $showSettings;
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TJSSettingsSwap", slots, ["settings-footer", "settings-header", "default"]);
  let { settings = void 0 } = $$props;
  let { options = void 0 } = $$props;
  const showSettings = settings.uiControl.stores.showSettings;
  validate_store(showSettings, "showSettings");
  component_subscribe($$self, showSettings, (value) => $$invalidate(2, $showSettings = value));
  const writable_props = ["settings", "options"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<TJSSettingsSwap> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("settings" in $$props2)
      $$invalidate(0, settings = $$props2.settings);
    if ("options" in $$props2)
      $$invalidate(1, options = $$props2.options);
    if ("$$scope" in $$props2)
      $$invalidate(5, $$scope = $$props2.$$scope);
  };
  $$self.$capture_state = () => ({
    TJSSettingsEdit: TJSSettingsEdit_default,
    settings,
    options,
    showSettings,
    $showSettings
  });
  $$self.$inject_state = ($$props2) => {
    if ("settings" in $$props2)
      $$invalidate(0, settings = $$props2.settings);
    if ("options" in $$props2)
      $$invalidate(1, options = $$props2.options);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [settings, options, $showSettings, showSettings, slots, $$scope];
}
var TJSSettingsSwap = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance23, create_fragment23, safe_not_equal, { settings: 0, options: 1 });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TJSSettingsSwap",
      options,
      id: create_fragment23.name
    });
  }
  get settings() {
    throw new Error("<TJSSettingsSwap>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set settings(value) {
    throw new Error("<TJSSettingsSwap>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get options() {
    throw new Error("<TJSSettingsSwap>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set options(value) {
    throw new Error("<TJSSettingsSwap>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var TJSSettingsSwap_default = TJSSettingsSwap;

// node_modules/@typhonjs-fvtt/svelte-standard/_dist/component/standard/index.js
cssVariables.setProperties({
  // For components w/ transparent background checkered pattern.
  "--tjs-checkerboard-background-dark": "rgb(205, 205, 205)",
  "--tjs-checkerboard-background-10": `url('data:image/svg+xml;utf8,<svg preserveAspectRatio="none"  viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="5" height="5" fill="transparent" /><rect x="5" y="5" width="5" height="5" fill="transparent" /><rect x="5" y="0" width="5" height="5" fill="white" /><rect x="0" y="5" width="5" height="5" fill="white" /></svg>') 0 0 / 10px 10px, var(--tjs-checkerboard-background-dark, rgb(205, 205, 205))`
}, false);
cssVariables.setProperties({
  "--tjs-action-ripple-background": "rgba(0, 0, 0, 0.35)"
}, false);
cssVariables.setProperties({
  "--tjs-icon-button-background-hover": "rgba(0, 0, 0, 0.10)",
  "--tjs-icon-button-background-selected": "rgba(0, 0, 0, 0.20)"
}, false);
{
  const props = FoundryStyles.getProperties('input[type="text"], input[type="number"]');
  if (typeof props === "object") {
    cssVariables.setProperties({
      "--tjs-input-background": "background" in props ? props.background : "rgba(0, 0, 0, 0.05)",
      "--tjs-input-border": "border" in props ? props.border : "1px solid var(--color-border-light-tertiary)",
      "--tjs-input-border-radius": "border-radius" in props ? props["border-radius"] : "3px",
      "--tjs-input-height": "height" in props ? props.height : "var(--form-field-height)",
      "--tjs-input-min-width": "min-width" in props ? props["min-width"] : "20px",
      "--tjs-input-padding": "padding" in props ? props["padding"] : "1px 3px",
      "--tjs-input-width": "width" in props ? props.width : "calc(100% - 2px)",
      // Set default values that are only to be referenced and not set.
      "--_tjs-default-input-height": "height" in props ? props.height : "var(--form-field-height)",
      // Set directly / no lookup:
      "--tjs-input-border-color": "var(--color-border-light-tertiary)"
    }, false);
  }
}
cssVariables.setProperties({
  // `popup` is for components that are slightly elevated, but connected to an application;
  // see: TJSMenu / TJSContextMenu / TJSColordPicker
  "--tjs-default-popup-background": "var(--color-text-dark-header, #23221d)",
  "--tjs-default-popup-border": "1px solid var(--color-border-dark, #000)",
  "--tjs-default-popup-box-shadow": "0 0 2px var(--color-shadow-dark, #000)",
  "--tjs-default-popup-primary-color": "var(--color-text-light-primary, #b5b3a4)",
  "--tjs-default-popup-highlight-color": "var(--color-text-light-highlight, #f0f0e0)",
  // `popover` is for components that are elevated and independent; see: TJSContextMenu
  "--tjs-default-popover-border": "1px solid var(--color-border-dark, #000)",
  "--tjs-default-popover-box-shadow": "0 0 10px var(--color-shadow-dark, #000)"
}, false);
Hooks.on("PopOut:loading", (app, popout) => {
  if (app instanceof SvelteApplication) {
    popout.document.addEventListener("DOMContentLoaded", () => cssVariables.clone(popout.document));
  }
});
export {
  TJSContentEdit_default as TJSContentEdit,
  TJSContextMenuImpl_default as TJSContextMenuImpl,
  TJSIconButton_default as TJSIconButton,
  TJSIconFolder_default as TJSIconFolder,
  TJSInput_default as TJSInput,
  TJSInputNumber_default as TJSInputNumber,
  TJSInputText_default as TJSInputText,
  TJSMenu_default as TJSMenu,
  TJSPositionControlLayer_default as TJSPositionControlLayer,
  TJSProseMirror_default as TJSProseMirror,
  TJSScrollContainer_default as TJSScrollContainer,
  TJSSelect_default as TJSSelect,
  TJSSettingsEdit_default as TJSSettingsEdit,
  TJSSettingsSwap_default as TJSSettingsSwap,
  TJSSvgFolder_default as TJSSvgFolder,
  TJSTinyMCE_default as TJSTinyMCE,
  TJSToggleIconButton_default as TJSToggleIconButton,
  TJSToggleLabel_default as TJSToggleLabel,
  TinyMCEHelper
};
//# sourceMappingURL=@typhonjs-fvtt_svelte-standard_component.js.map
