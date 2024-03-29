const style = "";
const LEOBREW = {};
LEOBREW.currencies = {
  "gp": "LEOBREW.CurrencyGP",
  "sp": "LEOBREW.CurrencySP",
  "cp": "LEOBREW.CurrencyCP"
};
LEOBREW.resources = {
  "luck": "LEOBREW.ResourceLuck",
  "mana": "LEOBREW.ResourceMana",
  "sanity": "LEOBREW.ResourceSanity",
  "experience": "LEOBREW.ResourceExperience"
};
LEOBREW.abilities = {
  "str": "LEOBREW.AbilityStr",
  "dex": "LEOBREW.AbilityDex",
  "con": "LEOBREW.AbilityCon",
  "will": "LEOBREW.AbilityWill",
  "int": "LEOBREW.AbilityInt",
  "app": "LEOBREW.AbilityApp"
};
LEOBREW.abilityAbbreviations = {
  "str": "LEOBREW.AbilityStrAbbr",
  "dex": "LEOBREW.AbilityDexAbbr",
  "con": "LEOBREW.AbilityConAbbr",
  "will": "LEOBREW.AbilityWillAbbr",
  "int": "LEOBREW.AbilityIntAbbr",
  "app": "LEOBREW.AbilityAppAbbr"
};
LEOBREW.bodyParts = {
  "head": "LEOBREW.BodyPartHead",
  "chest": "LEOBREW.BodyPartChest",
  "arms": "LEOBREW.BodyPartArms",
  "guts": "LEOBREW.BodyPartGuts",
  "legs": "LEOBREW.BodyPartLegs"
};
function noop() {
}
const identity = (x) => x;
function assign(tar, src) {
  for (const k in src)
    tar[k] = src[k];
  return (
    /** @type {T & S} */
    tar
  );
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
let src_url_equal_anchor;
function src_url_equal(element_src, url) {
  if (element_src === url)
    return true;
  if (!src_url_equal_anchor) {
    src_url_equal_anchor = document.createElement("a");
  }
  src_url_equal_anchor.href = url;
  return element_src === src_url_equal_anchor.href;
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
  let value;
  subscribe(store, (_) => value = _)();
  return value;
}
function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));
    if ($$scope.dirty === void 0) {
      return lets;
    }
    if (typeof lets === "object") {
      const merged = [];
      const len = Math.max($$scope.dirty.length, lets.length);
      for (let i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }
      return merged;
    }
    return $$scope.dirty | lets;
  }
  return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
function get_all_dirty_from_scope($$scope) {
  if ($$scope.ctx.length > 32) {
    const dirty = [];
    const length = $$scope.ctx.length / 32;
    for (let i = 0; i < length; i++) {
      dirty[i] = -1;
    }
    return dirty;
  }
  return -1;
}
function exclude_internal_props(props) {
  const result = {};
  for (const k in props)
    if (k[0] !== "$")
      result[k] = props[k];
  return result;
}
function set_store_value(store, ret, value) {
  store.set(value);
  return ret;
}
function action_destroyer(action_result) {
  return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}
const is_client = typeof window !== "undefined";
let now = is_client ? () => window.performance.now() : () => Date.now();
let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;
const tasks = /* @__PURE__ */ new Set();
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0)
    raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0)
    raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
function append(target, node) {
  target.appendChild(node);
}
function get_root_for_style(node) {
  if (!node)
    return document;
  const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
  if (root && /** @type {ShadowRoot} */
  root.host) {
    return (
      /** @type {ShadowRoot} */
      root
    );
  }
  return node.ownerDocument;
}
function append_empty_stylesheet(node) {
  const style_element = element("style");
  style_element.textContent = "/* empty */";
  append_stylesheet(get_root_for_style(node), style_element);
  return style_element.sheet;
}
function append_stylesheet(node, style2) {
  append(
    /** @type {Document} */
    node.head || node,
    style2
  );
  return style2.sheet;
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}
function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i])
      iterations[i].d(detaching);
  }
}
function element(name) {
  return document.createElement(name);
}
function svg_element(name) {
  return document.createElementNS("http://www.w3.org/2000/svg", name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function empty() {
  return text("");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
  return function(event) {
    event.preventDefault();
    return fn.call(this, event);
  };
}
function stop_propagation(fn) {
  return function(event) {
    event.stopPropagation();
    return fn.call(this, event);
  };
}
function attr(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
function to_number(value) {
  return value === "" ? null : +value;
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.data === data)
    return;
  text2.data = /** @type {string} */
  data;
}
function set_input_value(input, value) {
  input.value = value == null ? "" : value;
}
function set_style(node, key, value, important) {
  if (value == null) {
    node.style.removeProperty(key);
  } else {
    node.style.setProperty(key, value, important ? "important" : "");
  }
}
function toggle_class(element2, name, toggle) {
  element2.classList.toggle(name, !!toggle);
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  return new CustomEvent(type, { detail, bubbles, cancelable });
}
class HtmlTag {
  /**
   * @private
   * @default false
   */
  is_svg = false;
  /** parent for creating node */
  e = void 0;
  /** html tag nodes */
  n = void 0;
  /** target */
  t = void 0;
  /** anchor */
  a = void 0;
  constructor(is_svg = false) {
    this.is_svg = is_svg;
    this.e = this.n = null;
  }
  /**
   * @param {string} html
   * @returns {void}
   */
  c(html) {
    this.h(html);
  }
  /**
   * @param {string} html
   * @param {HTMLElement | SVGElement} target
   * @param {HTMLElement | SVGElement} anchor
   * @returns {void}
   */
  m(html, target, anchor = null) {
    if (!this.e) {
      if (this.is_svg)
        this.e = svg_element(
          /** @type {keyof SVGElementTagNameMap} */
          target.nodeName
        );
      else
        this.e = element(
          /** @type {keyof HTMLElementTagNameMap} */
          target.nodeType === 11 ? "TEMPLATE" : target.nodeName
        );
      this.t = target.tagName !== "TEMPLATE" ? target : (
        /** @type {HTMLTemplateElement} */
        target.content
      );
      this.c(html);
    }
    this.i(anchor);
  }
  /**
   * @param {string} html
   * @returns {void}
   */
  h(html) {
    this.e.innerHTML = html;
    this.n = Array.from(
      this.e.nodeName === "TEMPLATE" ? this.e.content.childNodes : this.e.childNodes
    );
  }
  /**
   * @returns {void} */
  i(anchor) {
    for (let i = 0; i < this.n.length; i += 1) {
      insert(this.t, this.n[i], anchor);
    }
  }
  /**
   * @param {string} html
   * @returns {void}
   */
  p(html) {
    this.d();
    this.h(html);
    this.i(this.a);
  }
  /**
   * @returns {void} */
  d() {
    this.n.forEach(detach);
  }
}
function construct_svelte_component(component, props) {
  return new component(props);
}
const managed_styles = /* @__PURE__ */ new Map();
let active = 0;
function hash(str) {
  let hash2 = 5381;
  let i = str.length;
  while (i--)
    hash2 = (hash2 << 5) - hash2 ^ str.charCodeAt(i);
  return hash2 >>> 0;
}
function create_style_information(doc, node) {
  const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
  managed_styles.set(doc, info);
  return info;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
  const step = 16.666 / duration;
  let keyframes = "{\n";
  for (let p = 0; p <= 1; p += step) {
    const t = a + (b - a) * ease(p);
    keyframes += p * 100 + `%{${fn(t, 1 - t)}}
`;
  }
  const rule = keyframes + `100% {${fn(b, 1 - b)}}
}`;
  const name = `__svelte_${hash(rule)}_${uid}`;
  const doc = get_root_for_style(node);
  const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
  if (!rules[name]) {
    rules[name] = true;
    stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
  }
  const animation = node.style.animation || "";
  node.style.animation = `${animation ? `${animation}, ` : ""}${name} ${duration}ms linear ${delay}ms 1 both`;
  active += 1;
  return name;
}
function delete_rule(node, name) {
  const previous = (node.style.animation || "").split(", ");
  const next = previous.filter(
    name ? (anim) => anim.indexOf(name) < 0 : (anim) => anim.indexOf("__svelte") === -1
    // remove all Svelte animations
  );
  const deleted = previous.length - next.length;
  if (deleted) {
    node.style.animation = next.join(", ");
    active -= deleted;
    if (!active)
      clear_rules();
  }
}
function clear_rules() {
  raf(() => {
    if (active)
      return;
    managed_styles.forEach((info) => {
      const { ownerNode } = info.stylesheet;
      if (ownerNode)
        detach(ownerNode);
    });
    managed_styles.clear();
  });
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(
        /** @type {string} */
        type,
        detail,
        { cancelable }
      );
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
  return context;
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
function bubble(component, event) {
  const callbacks = component.$$.callbacks[event.type];
  if (callbacks) {
    callbacks.slice().forEach((fn) => fn.call(this, event));
  }
}
const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
function add_flush_callback(fn) {
  flush_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
function flush_render_callbacks(fns) {
  const filtered = [];
  const targets = [];
  render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
  targets.forEach((c) => c());
  render_callbacks = filtered;
}
let promise;
function wait() {
  if (!promise) {
    promise = Promise.resolve();
    promise.then(() => {
      promise = null;
    });
  }
  return promise;
}
function dispatch(node, direction, kind) {
  node.dispatchEvent(custom_event(`${direction ? "intro" : "outro"}${kind}`));
}
const outroing = /* @__PURE__ */ new Set();
let outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
    // parent group
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block))
      return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2)
          block.d(1);
        callback();
      }
    });
    block.o(local);
  } else if (callback) {
    callback();
  }
}
const null_transition = { duration: 0 };
function create_in_transition(node, fn, params) {
  const options = { direction: "in" };
  let config = fn(node, params, options);
  let running = false;
  let animation_name;
  let task;
  let uid = 0;
  function cleanup() {
    if (animation_name)
      delete_rule(node, animation_name);
  }
  function go() {
    const {
      delay = 0,
      duration = 300,
      easing = identity,
      tick: tick2 = noop,
      css
    } = config || null_transition;
    if (css)
      animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
    tick2(0, 1);
    const start_time = now() + delay;
    const end_time = start_time + duration;
    if (task)
      task.abort();
    running = true;
    add_render_callback(() => dispatch(node, true, "start"));
    task = loop((now2) => {
      if (running) {
        if (now2 >= end_time) {
          tick2(1, 0);
          dispatch(node, true, "end");
          cleanup();
          return running = false;
        }
        if (now2 >= start_time) {
          const t = easing((now2 - start_time) / duration);
          tick2(t, 1 - t);
        }
      }
      return running;
    });
  }
  let started = false;
  return {
    start() {
      if (started)
        return;
      started = true;
      delete_rule(node);
      if (is_function(config)) {
        config = config(options);
        wait().then(go);
      } else {
        go();
      }
    },
    invalidate() {
      started = false;
    },
    end() {
      if (running) {
        cleanup();
        running = false;
      }
    }
  };
}
function create_out_transition(node, fn, params) {
  const options = { direction: "out" };
  let config = fn(node, params, options);
  let running = true;
  let animation_name;
  const group = outros;
  group.r += 1;
  let original_inert_value;
  function go() {
    const {
      delay = 0,
      duration = 300,
      easing = identity,
      tick: tick2 = noop,
      css
    } = config || null_transition;
    if (css)
      animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
    const start_time = now() + delay;
    const end_time = start_time + duration;
    add_render_callback(() => dispatch(node, false, "start"));
    if ("inert" in node) {
      original_inert_value = /** @type {HTMLElement} */
      node.inert;
      node.inert = true;
    }
    loop((now2) => {
      if (running) {
        if (now2 >= end_time) {
          tick2(0, 1);
          dispatch(node, false, "end");
          if (!--group.r) {
            run_all(group.c);
          }
          return false;
        }
        if (now2 >= start_time) {
          const t = easing((now2 - start_time) / duration);
          tick2(1 - t, t);
        }
      }
      return running;
    });
  }
  if (is_function(config)) {
    wait().then(() => {
      config = config(options);
      go();
    });
  } else {
    go();
  }
  return {
    end(reset) {
      if (reset && "inert" in node) {
        node.inert = original_inert_value;
      }
      if (reset && config.tick) {
        config.tick(1, 0);
      }
      if (running) {
        if (animation_name)
          delete_rule(node, animation_name);
        running = false;
      }
    }
  };
}
function create_bidirectional_transition(node, fn, params, intro) {
  const options = { direction: "both" };
  let config = fn(node, params, options);
  let t = intro ? 0 : 1;
  let running_program = null;
  let pending_program = null;
  let animation_name = null;
  let original_inert_value;
  function clear_animation() {
    if (animation_name)
      delete_rule(node, animation_name);
  }
  function init2(program, duration) {
    const d = (
      /** @type {Program['d']} */
      program.b - t
    );
    duration *= Math.abs(d);
    return {
      a: t,
      b: program.b,
      d,
      duration,
      start: program.start,
      end: program.start + duration,
      group: program.group
    };
  }
  function go(b) {
    const {
      delay = 0,
      duration = 300,
      easing = identity,
      tick: tick2 = noop,
      css
    } = config || null_transition;
    const program = {
      start: now() + delay,
      b
    };
    if (!b) {
      program.group = outros;
      outros.r += 1;
    }
    if ("inert" in node) {
      if (b) {
        if (original_inert_value !== void 0) {
          node.inert = original_inert_value;
        }
      } else {
        original_inert_value = /** @type {HTMLElement} */
        node.inert;
        node.inert = true;
      }
    }
    if (running_program || pending_program) {
      pending_program = program;
    } else {
      if (css) {
        clear_animation();
        animation_name = create_rule(node, t, b, duration, delay, easing, css);
      }
      if (b)
        tick2(0, 1);
      running_program = init2(program, duration);
      add_render_callback(() => dispatch(node, b, "start"));
      loop((now2) => {
        if (pending_program && now2 > pending_program.start) {
          running_program = init2(pending_program, duration);
          pending_program = null;
          dispatch(node, running_program.b, "start");
          if (css) {
            clear_animation();
            animation_name = create_rule(
              node,
              t,
              running_program.b,
              running_program.duration,
              0,
              easing,
              config.css
            );
          }
        }
        if (running_program) {
          if (now2 >= running_program.end) {
            tick2(t = running_program.b, 1 - t);
            dispatch(node, running_program.b, "end");
            if (!pending_program) {
              if (running_program.b) {
                clear_animation();
              } else {
                if (!--running_program.group.r)
                  run_all(running_program.group.c);
              }
            }
            running_program = null;
          } else if (now2 >= running_program.start) {
            const p = now2 - running_program.start;
            t = running_program.a + running_program.d * easing(p / running_program.duration);
            tick2(t, 1 - t);
          }
        }
        return !!(running_program || pending_program);
      });
    }
  }
  return {
    run(b) {
      if (is_function(config)) {
        wait().then(() => {
          const opts = { direction: b ? "in" : "out" };
          config = config(opts);
          go(b);
        });
      } else {
        go(b);
      }
    },
    end() {
      clear_animation();
      running_program = pending_program = null;
    }
  };
}
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
function destroy_block(block, lookup) {
  block.d(1);
  lookup.delete(block.key);
}
function outro_and_destroy_block(block, lookup) {
  transition_out(block, 1, 1, () => {
    lookup.delete(block.key);
  });
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block2, next, get_context) {
  let o = old_blocks.length;
  let n = list.length;
  let i = o;
  const old_indexes = {};
  while (i--)
    old_indexes[old_blocks[i].key] = i;
  const new_blocks = [];
  const new_lookup = /* @__PURE__ */ new Map();
  const deltas = /* @__PURE__ */ new Map();
  const updates = [];
  i = n;
  while (i--) {
    const child_ctx = get_context(ctx, list, i);
    const key = get_key(child_ctx);
    let block = lookup.get(key);
    if (!block) {
      block = create_each_block2(key, child_ctx);
      block.c();
    } else if (dynamic) {
      updates.push(() => block.p(child_ctx, dirty));
    }
    new_lookup.set(key, new_blocks[i] = block);
    if (key in old_indexes)
      deltas.set(key, Math.abs(i - old_indexes[key]));
  }
  const will_move = /* @__PURE__ */ new Set();
  const did_move = /* @__PURE__ */ new Set();
  function insert2(block) {
    transition_in(block, 1);
    block.m(node, next);
    lookup.set(block.key, block);
    next = block.first;
    n--;
  }
  while (o && n) {
    const new_block = new_blocks[n - 1];
    const old_block = old_blocks[o - 1];
    const new_key = new_block.key;
    const old_key = old_block.key;
    if (new_block === old_block) {
      next = new_block.first;
      o--;
      n--;
    } else if (!new_lookup.has(old_key)) {
      destroy(old_block, lookup);
      o--;
    } else if (!lookup.has(new_key) || will_move.has(new_key)) {
      insert2(new_block);
    } else if (did_move.has(old_key)) {
      o--;
    } else if (deltas.get(new_key) > deltas.get(old_key)) {
      did_move.add(new_key);
      insert2(new_block);
    } else {
      will_move.add(old_key);
      o--;
    }
  }
  while (o--) {
    const old_block = old_blocks[o];
    if (!new_lookup.has(old_block.key))
      destroy(old_block, lookup);
  }
  while (n)
    insert2(new_blocks[n - 1]);
  run_all(updates);
  return new_blocks;
}
function get_spread_update(levels, updates) {
  const update2 = {};
  const to_null_out = {};
  const accounted_for = { $$scope: 1 };
  let i = levels.length;
  while (i--) {
    const o = levels[i];
    const n = updates[i];
    if (n) {
      for (const key in o) {
        if (!(key in n))
          to_null_out[key] = 1;
      }
      for (const key in n) {
        if (!accounted_for[key]) {
          update2[key] = n[key];
          accounted_for[key] = 1;
        }
      }
      levels[i] = n;
    } else {
      for (const key in o) {
        accounted_for[key] = 1;
      }
    }
  }
  for (const key in to_null_out) {
    if (!(key in update2))
      update2[key] = void 0;
  }
  return update2;
}
function get_spread_object(spread_props) {
  return typeof spread_props === "object" && spread_props !== null ? spread_props : {};
}
function bind(component, name, callback) {
  const index = component.$$.props[name];
  if (index !== void 0) {
    component.$$.bound[index] = callback;
    callback(component.$$.ctx[index]);
  }
}
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor) {
  const { fragment, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  add_render_callback(() => {
    const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
    if (component.$$.on_destroy) {
      component.$$.on_destroy.push(...new_on_destroy);
    } else {
      run_all(new_on_destroy);
    }
    component.$$.on_mount = [];
  });
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    flush_render_callbacks($$.after_update);
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance2, create_fragment2, not_equal, props, append_styles = null, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: [],
    // state
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    // everything else
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles && append_styles($$.root);
  let ready = false;
  $$.ctx = instance2 ? instance2(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i])
        $$.bound[i](value);
      if (ready)
        make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor);
    flush();
  }
  set_current_component(parent_component);
}
class SvelteComponent {
  /**
   * ### PRIVATE API
   *
   * Do not use, may change at any time
   *
   * @type {any}
   */
  $$ = void 0;
  /**
   * ### PRIVATE API
   *
   * Do not use, may change at any time
   *
   * @type {any}
   */
  $$set = void 0;
  /** @returns {void} */
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(type, callback) {
    if (!is_function(callback)) {
      return noop;
    }
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1)
        callbacks.splice(index, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(props) {
    if (this.$$set && !is_empty(props)) {
      this.$$.skip_bound = true;
      this.$$set(props);
      this.$$.skip_bound = false;
    }
  }
}
const PUBLIC_VERSION = "4";
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set2(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set2(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set2, update2) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set: set2, update: update2, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  if (!stores_array.every(Boolean)) {
    throw new Error("derived() expects stores as input, got a falsy value");
  }
  const auto = fn.length < 2;
  return readable(initial_value, (set2, update2) => {
    let started = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set2, update2);
      if (auto) {
        set2(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map(
      (store, i) => subscribe(
        store,
        (value) => {
          values[i] = value;
          pending &= ~(1 << i);
          if (started) {
            sync();
          }
        },
        () => {
          pending |= 1 << i;
        }
      )
    );
    started = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
      started = false;
    };
  });
}
function writableDerived(origins, derive, reflect, initial) {
  var childDerivedSetter, originValues, blockNextDerive = false;
  var reflectOldValues = reflect.length >= 2;
  var wrappedDerive = (got, set2, update3) => {
    childDerivedSetter = set2;
    if (reflectOldValues) {
      originValues = got;
    }
    if (!blockNextDerive) {
      let returned = derive(got, set2, update3);
      if (derive.length < 2) {
        set2(returned);
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
  function update2(fn) {
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
      update2(() => value);
    },
    update: update2
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
const s_TAG_OBJECT = "[object Object]";
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
function hasGetter(object, accessor) {
  if (typeof object !== "object" || object === null || object === void 0) {
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
function isIterable(value) {
  if (value === null || value === void 0 || typeof value !== "object") {
    return false;
  }
  return Symbol.iterator in value;
}
function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function isPlainObject(value) {
  if (Object.prototype.toString.call(value) !== s_TAG_OBJECT) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}
function safeAccess(data, accessor, defaultValue) {
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
  for (let cntr = 0; cntr < sourceObj.length; cntr++) {
    const obj = sourceObj[cntr];
    for (const prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        if (prop.startsWith("-=")) {
          delete target[prop.slice(2)];
          continue;
        }
        target[prop] = Object.prototype.hasOwnProperty.call(target, prop) && target[prop]?.constructor === Object && obj[prop]?.constructor === Object ? _deepMerge({}, target[prop], obj[prop]) : obj[prop];
      }
    }
  }
  return target;
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
function subscribeIgnoreFirst(store, update2) {
  let firedFirst = false;
  return store.subscribe((value) => {
    if (!firedFirst) {
      firedFirst = true;
    } else {
      update2(value);
    }
  });
}
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function sineInOut(t) {
  return -0.5 * (Math.cos(Math.PI * t) - 1);
}
function lerp(start, end, amount) {
  return (1 - amount) * start + amount * end;
}
class A11yHelper {
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
    const focusOpts = isObject(options?.focusSource) ? options.focusSource : options;
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
            const element2 = document.querySelector(target);
            if (element2 instanceof HTMLElement && element2.isConnected) {
              element2.focus();
              if (debug) {
                console.debug(`A11yHelper.applyFocusSource debug - Applied focus to target: `, element2);
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
  static getFirstFocusableElement(element2 = document, options) {
    const focusableElements = this.getFocusableElements(element2, options);
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
  static getFocusableElements(element2 = document, { anchorHref = true, ignoreClasses, ignoreElements, selectors } = {}) {
    if (!(element2 instanceof HTMLElement) && !(element2 instanceof Document)) {
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
    const selectorQuery = selectors ?? this.#getFocusableSelectors(anchorHref);
    const allElements = [...element2.querySelectorAll(selectorQuery)];
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
   * Returns the default focusable selectors query.
   *
   * @param {boolean}  [anchorHref=true] - When true anchors must have an HREF.
   *
   * @returns {string} Focusable selectors for `querySelectorAll`.
   */
  static #getFocusableSelectors(anchorHref = true) {
    return `button, [contenteditable=""], [contenteditable="true"], details summary:not([tabindex="-1"]), embed, a${anchorHref ? "[href]" : ""}, iframe, object, input:not([type=hidden]), select, textarea, [tabindex]:not([tabindex="-1"])`;
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
      if (event?.button !== 2 && event.type === "contextmenu") {
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
  static getLastFocusableElement(element2 = document, options) {
    const focusableElements = this.getFocusableElements(element2, options);
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
    if (el === void 0 || el === null || !(el instanceof HTMLElement) || el?.hidden || !el?.isConnected) {
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
}
class StyleParse {
  static #regexPixels = /(\d+)\s*px/;
  /**
   * Parses a pixel string / computed styles. Ex. `100px` returns `100`.
   *
   * @param {string}   value - Value to parse.
   *
   * @returns {number|undefined} The integer component of a pixel string.
   */
  static pixels(value) {
    if (typeof value !== "string") {
      return void 0;
    }
    const isPixels = this.#regexPixels.test(value);
    const number = parseInt(value);
    return isPixels && Number.isFinite(number) ? number : void 0;
  }
}
class TJSStyleManager {
  /** @type {CSSStyleRule} */
  #cssRule;
  /** @type {string} */
  #docKey;
  /** @type {string} */
  #selector;
  /** @type {HTMLStyleElement} */
  #styleElement;
  /** @type {number} */
  #version;
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
   */
  constructor({ docKey, selector = ":root", document: document2 = globalThis.document, version } = {}) {
    if (typeof docKey !== "string") {
      throw new TypeError(`StyleManager error: 'docKey' is not a string.`);
    }
    if (typeof selector !== "string") {
      throw new TypeError(`StyleManager error: 'selector' is not a string.`);
    }
    if (version !== void 0 && !Number.isSafeInteger(version) && version < 1) {
      throw new TypeError(`StyleManager error: 'version' is defined and is not a positive integer >= 1.`);
    }
    this.#selector = selector;
    this.#docKey = docKey;
    this.#version = version;
    if (document2[this.#docKey] === void 0) {
      this.#styleElement = document2.createElement("style");
      document2.head.append(this.#styleElement);
      this.#styleElement._STYLE_MANAGER_VERSION = version;
      this.#styleElement.sheet.insertRule(`${selector} {}`, 0);
      this.#cssRule = this.#styleElement.sheet.cssRules[0];
      document2[docKey] = this.#styleElement;
    } else {
      this.#styleElement = document2[docKey];
      this.#cssRule = this.#styleElement.sheet.cssRules[0];
      if (version) {
        const existingVersion = this.#styleElement._STYLE_MANAGER_VERSION ?? 0;
        if (version > existingVersion) {
          this.#cssRule.style.cssText = "";
        }
      }
    }
  }
  /**
   * @returns {string} Provides an accessor to get the `cssText` for the style sheet.
   */
  get cssText() {
    return this.#cssRule.style.cssText;
  }
  /**
   * @returns {number} Returns the version of this instance.
   */
  get version() {
    return this.#version;
  }
  /**
   * Provides a copy constructor to duplicate an existing TJSStyleManager instance into a new document.
   *
   * Note: This is used to support the `PopOut` module.
   *
   * @param {Document} [document] Target browser document to clone into.
   *
   * @returns {TJSStyleManager} New style manager instance.
   */
  clone(document2 = globalThis.document) {
    const newStyleManager = new TJSStyleManager({
      selector: this.#selector,
      docKey: this.#docKey,
      document: document2,
      version: this.#version
    });
    newStyleManager.#cssRule.style.cssText = this.#cssRule.style.cssText;
    return newStyleManager;
  }
  get() {
    const cssText = this.#cssRule.style.cssText;
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
    return this.#cssRule.style.getPropertyValue(key);
  }
  /**
   * Set rules by property / value; useful for CSS variables.
   *
   * @param {{ [key: string]: string }}  rules - An object with property / value string pairs to load.
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
        this.#cssRule.style.setProperty(key, value);
      }
    } else {
      for (const [key, value] of Object.entries(rules)) {
        if (this.#cssRule.style.getPropertyValue(key) === "") {
          this.#cssRule.style.setProperty(key, value);
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
      this.#cssRule.style.setProperty(key, value);
    } else {
      if (this.#cssRule.style.getPropertyValue(key) === "") {
        this.#cssRule.style.setProperty(key, value);
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
        this.#cssRule.style.removeProperty(key);
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
    return this.#cssRule.style.removeProperty(key);
  }
}
const EPSILON = 1e-6;
const IDENTITY_4X4 = new Float32Array([
  1,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  1
]);
class Mat4 extends Float32Array {
  /**
   * The number of bytes in a {@link Mat4}.
   */
  static BYTE_LENGTH = 16 * Float32Array.BYTES_PER_ELEMENT;
  /**
   * Create a {@link Mat4}.
   */
  constructor(...values) {
    switch (values.length) {
      case 16:
        super(values);
        break;
      case 2:
        super(values[0], values[1], 16);
        break;
      case 1:
        const v = values[0];
        if (typeof v === "number") {
          super([
            v,
            v,
            v,
            v,
            v,
            v,
            v,
            v,
            v,
            v,
            v,
            v,
            v,
            v,
            v,
            v
          ]);
        } else {
          super(v, 0, 16);
        }
        break;
      default:
        super(IDENTITY_4X4);
        break;
    }
  }
  //============
  // Attributes
  //============
  /**
   * A string representation of `this`
   * Equivalent to `Mat4.str(this);`
   */
  get str() {
    return Mat4.str(this);
  }
  //===================
  // Instance methods
  //===================
  /**
   * Copy the values from another {@link Mat4} into `this`.
   *
   * @param a the source vector
   * @returns `this`
   */
  copy(a) {
    this.set(a);
    return this;
  }
  /**
   * Set `this` to the identity matrix
   * Equivalent to Mat4.identity(this)
   *
   * @returns `this`
   */
  identity() {
    this.set(IDENTITY_4X4);
    return this;
  }
  /**
   * Multiplies this {@link Mat4} against another one
   * Equivalent to `Mat4.multiply(this, this, b);`
   *
   * @param out - The receiving Matrix
   * @param a - The first operand
   * @param b - The second operand
   * @returns `this`
   */
  multiply(b) {
    return Mat4.multiply(this, this, b);
  }
  /**
   * Alias for {@link Mat4.multiply}
   */
  mul(b) {
    return this;
  }
  /**
   * Transpose this {@link Mat4}
   * Equivalent to `Mat4.transpose(this, this);`
   *
   * @returns `this`
   */
  transpose() {
    return Mat4.transpose(this, this);
  }
  /**
   * Inverts this {@link Mat4}
   * Equivalent to `Mat4.invert(this, this);`
   *
   * @returns `this`
   */
  invert() {
    return Mat4.invert(this, this);
  }
  /**
   * Translate this {@link Mat4} by the given vector
   * Equivalent to `Mat4.translate(this, this, v);`
   *
   * @param v - The {@link Vec3} to translate by
   * @returns `this`
   */
  translate(v) {
    return Mat4.translate(this, this, v);
  }
  /**
   * Rotates this {@link Mat4} by the given angle around the given axis
   * Equivalent to `Mat4.rotate(this, this, rad, axis);`
   *
   * @param rad - the angle to rotate the matrix by
   * @param axis - the axis to rotate around
   * @returns `out`
   */
  rotate(rad, axis) {
    return Mat4.rotate(this, this, rad, axis);
  }
  /**
   * Scales this {@link Mat4} by the dimensions in the given vec3 not using vectorization
   * Equivalent to `Mat4.scale(this, this, v);`
   *
   * @param v - The {@link Vec3} to scale the matrix by
   * @returns `this`
   */
  scale(v) {
    return Mat4.scale(this, this, v);
  }
  /**
   * Rotates this {@link Mat4} by the given angle around the X axis
   * Equivalent to `Mat4.rotateX(this, this, rad);`
   *
   * @param rad - the angle to rotate the matrix by
   * @returns `this`
   */
  rotateX(rad) {
    return Mat4.rotateX(this, this, rad);
  }
  /**
   * Rotates this {@link Mat4} by the given angle around the Y axis
   * Equivalent to `Mat4.rotateY(this, this, rad);`
   *
   * @param rad - the angle to rotate the matrix by
   * @returns `this`
   */
  rotateY(rad) {
    return Mat4.rotateY(this, this, rad);
  }
  /**
   * Rotates this {@link Mat4} by the given angle around the Z axis
   * Equivalent to `Mat4.rotateZ(this, this, rad);`
   *
   * @param rad - the angle to rotate the matrix by
   * @returns `this`
   */
  rotateZ(rad) {
    return Mat4.rotateZ(this, this, rad);
  }
  /**
   * Generates a perspective projection matrix with the given bounds.
   * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
   * which matches WebGL/OpenGL's clip volume.
   * Passing null/undefined/no value for far will generate infinite projection matrix.
   * Equivalent to `Mat4.perspectiveNO(this, fovy, aspect, near, far);`
   *
   * @param fovy - Vertical field of view in radians
   * @param aspect - Aspect ratio. typically viewport width/height
   * @param near - Near bound of the frustum
   * @param far - Far bound of the frustum, can be null or Infinity
   * @returns `this`
   */
  perspectiveNO(fovy, aspect, near, far) {
    return Mat4.perspectiveNO(this, fovy, aspect, near, far);
  }
  /**
   * Generates a perspective projection matrix suitable for WebGPU with the given bounds.
   * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
   * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
   * Passing null/undefined/no value for far will generate infinite projection matrix.
   * Equivalent to `Mat4.perspectiveZO(this, fovy, aspect, near, far);`
   *
   * @param fovy - Vertical field of view in radians
   * @param aspect - Aspect ratio. typically viewport width/height
   * @param near - Near bound of the frustum
   * @param far - Far bound of the frustum, can be null or Infinity
   * @returns `this`
   */
  perspectiveZO(fovy, aspect, near, far) {
    return Mat4.perspectiveZO(this, fovy, aspect, near, far);
  }
  /**
   * Generates a orthogonal projection matrix with the given bounds.
   * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
   * which matches WebGL/OpenGL's clip volume.
   * Equivalent to `Mat4.orthoNO(this, left, right, bottom, top, near, far);`
   *
   * @param left - Left bound of the frustum
   * @param right - Right bound of the frustum
   * @param bottom - Bottom bound of the frustum
   * @param top - Top bound of the frustum
   * @param near - Near bound of the frustum
   * @param far - Far bound of the frustum
   * @returns `this`
   */
  orthoNO(left, right, bottom, top, near, far) {
    return Mat4.orthoNO(this, left, right, bottom, top, near, far);
  }
  /**
   * Generates a orthogonal projection matrix with the given bounds.
   * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
   * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
   * Equivalent to `Mat4.orthoZO(this, left, right, bottom, top, near, far);`
   *
   * @param left - Left bound of the frustum
   * @param right - Right bound of the frustum
   * @param bottom - Bottom bound of the frustum
   * @param top - Top bound of the frustum
   * @param near - Near bound of the frustum
   * @param far - Far bound of the frustum
   * @returns `this`
   */
  orthoZO(left, right, bottom, top, near, far) {
    return Mat4.orthoZO(this, left, right, bottom, top, near, far);
  }
  //================
  // Static methods
  //================
  /**
   * Creates a new, identity {@link Mat4}
   * @category Static
   *
   * @returns A new {@link Mat4}
   */
  static create() {
    return new Mat4();
  }
  /**
   * Creates a new {@link Mat4} initialized with values from an existing matrix
   * @category Static
   *
   * @param a - Matrix to clone
   * @returns A new {@link Mat4}
   */
  static clone(a) {
    return new Mat4(a);
  }
  /**
   * Copy the values from one {@link Mat4} to another
   * @category Static
   *
   * @param out - The receiving Matrix
   * @param a - Matrix to copy
   * @returns `out`
   */
  static copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  /**
   * Create a new mat4 with the given values
   * @category Static
   *
   * @param values - Matrix components
   * @returns A new {@link Mat4}
   */
  static fromValues(...values) {
    return new Mat4(...values);
  }
  /**
   * Set the components of a mat4 to the given values
   * @category Static
   *
   * @param out - The receiving matrix
   * @param values - Matrix components
   * @returns `out`
   */
  static set(out, ...values) {
    out[0] = values[0];
    out[1] = values[1];
    out[2] = values[2];
    out[3] = values[3];
    out[4] = values[4];
    out[5] = values[5];
    out[6] = values[6];
    out[7] = values[7];
    out[8] = values[8];
    out[9] = values[9];
    out[10] = values[10];
    out[11] = values[11];
    out[12] = values[12];
    out[13] = values[13];
    out[14] = values[14];
    out[15] = values[15];
    return out;
  }
  /**
   * Set a {@link Mat4} to the identity matrix
   * @category Static
   *
   * @param out - The receiving Matrix
   * @returns `out`
   */
  static identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Transpose the values of a {@link Mat4}
   * @category Static
   *
   * @param out - the receiving matrix
   * @param a - the source matrix
   * @returns `out`
   */
  static transpose(out, a) {
    if (out === a) {
      const a01 = a[1], a02 = a[2], a03 = a[3];
      const a12 = a[6], a13 = a[7];
      const a23 = a[11];
      out[1] = a[4];
      out[2] = a[8];
      out[3] = a[12];
      out[4] = a01;
      out[6] = a[9];
      out[7] = a[13];
      out[8] = a02;
      out[9] = a12;
      out[11] = a[14];
      out[12] = a03;
      out[13] = a13;
      out[14] = a23;
    } else {
      out[0] = a[0];
      out[1] = a[4];
      out[2] = a[8];
      out[3] = a[12];
      out[4] = a[1];
      out[5] = a[5];
      out[6] = a[9];
      out[7] = a[13];
      out[8] = a[2];
      out[9] = a[6];
      out[10] = a[10];
      out[11] = a[14];
      out[12] = a[3];
      out[13] = a[7];
      out[14] = a[11];
      out[15] = a[15];
    }
    return out;
  }
  /**
   * Inverts a {@link Mat4}
   * @category Static
   *
   * @param out - the receiving matrix
   * @param a - the source matrix
   * @returns `out`
   */
  static invert(out, a) {
    const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    const b00 = a00 * a11 - a01 * a10;
    const b01 = a00 * a12 - a02 * a10;
    const b02 = a00 * a13 - a03 * a10;
    const b03 = a01 * a12 - a02 * a11;
    const b04 = a01 * a13 - a03 * a11;
    const b05 = a02 * a13 - a03 * a12;
    const b06 = a20 * a31 - a21 * a30;
    const b07 = a20 * a32 - a22 * a30;
    const b08 = a20 * a33 - a23 * a30;
    const b09 = a21 * a32 - a22 * a31;
    const b10 = a21 * a33 - a23 * a31;
    const b11 = a22 * a33 - a23 * a32;
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
      return null;
    }
    det = 1 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
  }
  /**
   * Calculates the adjugate of a {@link Mat4}
   * @category Static
   *
   * @param out - the receiving matrix
   * @param a - the source matrix
   * @returns `out`
   */
  static adjoint(out, a) {
    const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    const b00 = a00 * a11 - a01 * a10;
    const b01 = a00 * a12 - a02 * a10;
    const b02 = a00 * a13 - a03 * a10;
    const b03 = a01 * a12 - a02 * a11;
    const b04 = a01 * a13 - a03 * a11;
    const b05 = a02 * a13 - a03 * a12;
    const b06 = a20 * a31 - a21 * a30;
    const b07 = a20 * a32 - a22 * a30;
    const b08 = a20 * a33 - a23 * a30;
    const b09 = a21 * a32 - a22 * a31;
    const b10 = a21 * a33 - a23 * a31;
    const b11 = a22 * a33 - a23 * a32;
    out[0] = a11 * b11 - a12 * b10 + a13 * b09;
    out[1] = a02 * b10 - a01 * b11 - a03 * b09;
    out[2] = a31 * b05 - a32 * b04 + a33 * b03;
    out[3] = a22 * b04 - a21 * b05 - a23 * b03;
    out[4] = a12 * b08 - a10 * b11 - a13 * b07;
    out[5] = a00 * b11 - a02 * b08 + a03 * b07;
    out[6] = a32 * b02 - a30 * b05 - a33 * b01;
    out[7] = a20 * b05 - a22 * b02 + a23 * b01;
    out[8] = a10 * b10 - a11 * b08 + a13 * b06;
    out[9] = a01 * b08 - a00 * b10 - a03 * b06;
    out[10] = a30 * b04 - a31 * b02 + a33 * b00;
    out[11] = a21 * b02 - a20 * b04 - a23 * b00;
    out[12] = a11 * b07 - a10 * b09 - a12 * b06;
    out[13] = a00 * b09 - a01 * b07 + a02 * b06;
    out[14] = a31 * b01 - a30 * b03 - a32 * b00;
    out[15] = a20 * b03 - a21 * b01 + a22 * b00;
    return out;
  }
  /**
   * Calculates the determinant of a {@link Mat4}
   * @category Static
   *
   * @param a - the source matrix
   * @returns determinant of a
   */
  static determinant(a) {
    const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    const b0 = a00 * a11 - a01 * a10;
    const b1 = a00 * a12 - a02 * a10;
    const b2 = a01 * a12 - a02 * a11;
    const b3 = a20 * a31 - a21 * a30;
    const b4 = a20 * a32 - a22 * a30;
    const b5 = a21 * a32 - a22 * a31;
    const b6 = a00 * b5 - a01 * b4 + a02 * b3;
    const b7 = a10 * b5 - a11 * b4 + a12 * b3;
    const b8 = a20 * b2 - a21 * b1 + a22 * b0;
    const b9 = a30 * b2 - a31 * b1 + a32 * b0;
    return a13 * b6 - a03 * b7 + a33 * b8 - a23 * b9;
  }
  /**
   * Multiplies two {@link Mat4}s
   * @category Static
   *
   * @param out - The receiving Matrix
   * @param a - The first operand
   * @param b - The second operand
   * @returns `out`
   */
  static multiply(out, a, b) {
    const a00 = a[0];
    const a01 = a[1];
    const a02 = a[2];
    const a03 = a[3];
    const a10 = a[4];
    const a11 = a[5];
    const a12 = a[6];
    const a13 = a[7];
    const a20 = a[8];
    const a21 = a[9];
    const a22 = a[10];
    const a23 = a[11];
    const a30 = a[12];
    const a31 = a[13];
    const a32 = a[14];
    const a33 = a[15];
    let b0 = b[0];
    let b1 = b[1];
    let b2 = b[2];
    let b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }
  /**
   * Alias for {@link Mat4.multiply}
   * @category Static
   */
  static mul(out, a, b) {
    return out;
  }
  /**
   * Translate a {@link Mat4} by the given vector
   * @category Static
   *
   * @param out - the receiving matrix
   * @param a - the matrix to translate
   * @param v - vector to translate by
   * @returns `out`
   */
  static translate(out, a, v) {
    const x = v[0];
    const y = v[1];
    const z = v[2];
    if (a === out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
      const a00 = a[0];
      const a01 = a[1];
      const a02 = a[2];
      const a03 = a[3];
      const a10 = a[4];
      const a11 = a[5];
      const a12 = a[6];
      const a13 = a[7];
      const a20 = a[8];
      const a21 = a[9];
      const a22 = a[10];
      const a23 = a[11];
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a03;
      out[4] = a10;
      out[5] = a11;
      out[6] = a12;
      out[7] = a13;
      out[8] = a20;
      out[9] = a21;
      out[10] = a22;
      out[11] = a23;
      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }
    return out;
  }
  /**
   * Scales the {@link Mat4} by the dimensions in the given {@link Vec3} not using vectorization
   * @category Static
   *
   * @param out - the receiving matrix
   * @param a - the matrix to scale
   * @param v - the {@link Vec3} to scale the matrix by
   * @returns `out`
   **/
  static scale(out, a, v) {
    const x = v[0];
    const y = v[1];
    const z = v[2];
    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  /**
   * Rotates a {@link Mat4} by the given angle around the given axis
   * @category Static
   *
   * @param out - the receiving matrix
   * @param a - the matrix to rotate
   * @param rad - the angle to rotate the matrix by
   * @param axis - the axis to rotate around
   * @returns `out`
   */
  static rotate(out, a, rad, axis) {
    let x = axis[0];
    let y = axis[1];
    let z = axis[2];
    let len = Math.sqrt(x * x + y * y + z * z);
    if (len < EPSILON) {
      return null;
    }
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    const s = Math.sin(rad);
    const c = Math.cos(rad);
    const t = 1 - c;
    const a00 = a[0];
    const a01 = a[1];
    const a02 = a[2];
    const a03 = a[3];
    const a10 = a[4];
    const a11 = a[5];
    const a12 = a[6];
    const a13 = a[7];
    const a20 = a[8];
    const a21 = a[9];
    const a22 = a[10];
    const a23 = a[11];
    const b00 = x * x * t + c;
    const b01 = y * x * t + z * s;
    const b02 = z * x * t - y * s;
    const b10 = x * y * t - z * s;
    const b11 = y * y * t + c;
    const b12 = z * y * t + x * s;
    const b20 = x * z * t + y * s;
    const b21 = y * z * t - x * s;
    const b22 = z * z * t + c;
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;
    if (a !== out) {
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    return out;
  }
  /**
   * Rotates a matrix by the given angle around the X axis
   * @category Static
   *
   * @param out - the receiving matrix
   * @param a - the matrix to rotate
   * @param rad - the angle to rotate the matrix by
   * @returns `out`
   */
  static rotateX(out, a, rad) {
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    let a10 = a[4];
    let a11 = a[5];
    let a12 = a[6];
    let a13 = a[7];
    let a20 = a[8];
    let a21 = a[9];
    let a22 = a[10];
    let a23 = a[11];
    if (a !== out) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
  }
  /**
   * Rotates a matrix by the given angle around the Y axis
   * @category Static
   *
   * @param out - the receiving matrix
   * @param a - the matrix to rotate
   * @param rad - the angle to rotate the matrix by
   * @returns `out`
   */
  static rotateY(out, a, rad) {
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    let a00 = a[0];
    let a01 = a[1];
    let a02 = a[2];
    let a03 = a[3];
    let a20 = a[8];
    let a21 = a[9];
    let a22 = a[10];
    let a23 = a[11];
    if (a !== out) {
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
  }
  /**
   * Rotates a matrix by the given angle around the Z axis
   * @category Static
   *
   * @param out - the receiving matrix
   * @param a - the matrix to rotate
   * @param rad - the angle to rotate the matrix by
   * @returns `out`
   */
  static rotateZ(out, a, rad) {
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    let a00 = a[0];
    let a01 = a[1];
    let a02 = a[2];
    let a03 = a[3];
    let a10 = a[4];
    let a11 = a[5];
    let a12 = a[6];
    let a13 = a[7];
    if (a !== out) {
      out[8] = a[8];
      out[9] = a[9];
      out[10] = a[10];
      out[11] = a[11];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
  }
  /**
   * Creates a {@link Mat4} from a vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, dest, vec);
   * @category Static
   *
   * @param out - {@link Mat4} receiving operation result
   * @param v - Translation vector
   * @returns `out`
   */
  static fromTranslation(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  /**
   * Creates a {@link Mat4} from a vector scaling
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.scale(dest, dest, vec);
   * @category Static
   *
   * @param out - {@link Mat4} receiving operation result
   * @param v - Scaling vector
   * @returns `out`
   */
  static fromScaling(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = v[1];
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = v[2];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a {@link Mat4} from a given angle around a given axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotate(dest, dest, rad, axis);
   * @category Static
   *
   * @param out - {@link Mat4} receiving operation result
   * @param rad - the angle to rotate the matrix by
   * @param axis - the axis to rotate around
   * @returns `out`
   */
  static fromRotation(out, rad, axis) {
    let x = axis[0];
    let y = axis[1];
    let z = axis[2];
    let len = Math.sqrt(x * x + y * y + z * z);
    if (len < EPSILON) {
      return null;
    }
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    const s = Math.sin(rad);
    const c = Math.cos(rad);
    const t = 1 - c;
    out[0] = x * x * t + c;
    out[1] = y * x * t + z * s;
    out[2] = z * x * t - y * s;
    out[3] = 0;
    out[4] = x * y * t - z * s;
    out[5] = y * y * t + c;
    out[6] = z * y * t + x * s;
    out[7] = 0;
    out[8] = x * z * t + y * s;
    out[9] = y * z * t - x * s;
    out[10] = z * z * t + c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from the given angle around the X axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateX(dest, dest, rad);
   * @category Static
   *
   * @param out - mat4 receiving operation result
   * @param rad - the angle to rotate the matrix by
   * @returns `out`
   */
  static fromXRotation(out, rad) {
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = c;
    out[6] = s;
    out[7] = 0;
    out[8] = 0;
    out[9] = -s;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from the given angle around the Y axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateY(dest, dest, rad);
   * @category Static
   *
   * @param out - mat4 receiving operation result
   * @param rad - the angle to rotate the matrix by
   * @returns `out`
   */
  static fromYRotation(out, rad) {
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    out[0] = c;
    out[1] = 0;
    out[2] = -s;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = s;
    out[9] = 0;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from the given angle around the Z axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateZ(dest, dest, rad);
   * @category Static
   *
   * @param out - mat4 receiving operation result
   * @param rad - the angle to rotate the matrix by
   * @returns `out`
   */
  static fromZRotation(out, rad) {
    const s = Math.sin(rad);
    const c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = 0;
    out[4] = -s;
    out[5] = c;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from a quaternion rotation and vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     let quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   * @category Static
   *
   * @param out - mat4 receiving operation result
   * @param q - Rotation quaternion
   * @param v - Translation vector
   * @returns `out`
   */
  static fromRotationTranslation(out, q, v) {
    const x = q[0];
    const y = q[1];
    const z = q[2];
    const w = q[3];
    const x2 = x + x;
    const y2 = y + y;
    const z2 = z + z;
    const xx = x * x2;
    const xy = x * y2;
    const xz = x * z2;
    const yy = y * y2;
    const yz = y * z2;
    const zz = z * z2;
    const wx = w * x2;
    const wy = w * y2;
    const wz = w * z2;
    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  /**
   * Sets a {@link Mat4} from a {@link Quat2}.
   * @category Static
   *
   * @param out - Matrix
   * @param a - Dual Quaternion
   * @returns `out`
   */
  static fromQuat2(out, a) {
    let translation = [0, 0, 0];
    const bx = -a[0];
    const by = -a[1];
    const bz = -a[2];
    const bw = a[3];
    const ax = a[4];
    const ay = a[5];
    const az = a[6];
    const aw = a[7];
    let magnitude = bx * bx + by * by + bz * bz + bw * bw;
    if (magnitude > 0) {
      translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
      translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
      translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
    } else {
      translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
      translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
      translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
    }
    Mat4.fromRotationTranslation(out, a, translation);
    return out;
  }
  /**
   * Returns the translation vector component of a transformation
   * matrix. If a matrix is built with fromRotationTranslation,
   * the returned vector will be the same as the translation vector
   * originally supplied.
   * @category Static
   *
   * @param  {vec3} out Vector to receive translation component
   * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
   * @return {vec3} out
   */
  static getTranslation(out, mat) {
    out[0] = mat[12];
    out[1] = mat[13];
    out[2] = mat[14];
    return out;
  }
  /**
   * Returns the scaling factor component of a transformation
   * matrix. If a matrix is built with fromRotationTranslationScale
   * with a normalized Quaternion paramter, the returned vector will be
   * the same as the scaling vector
   * originally supplied.
   * @category Static
   *
   * @param  {vec3} out Vector to receive scaling factor component
   * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
   * @return {vec3} out
   */
  static getScaling(out, mat) {
    const m11 = mat[0];
    const m12 = mat[1];
    const m13 = mat[2];
    const m21 = mat[4];
    const m22 = mat[5];
    const m23 = mat[6];
    const m31 = mat[8];
    const m32 = mat[9];
    const m33 = mat[10];
    out[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
    out[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
    out[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);
    return out;
  }
  /**
   * Returns a quaternion representing the rotational component
   * of a transformation matrix. If a matrix is built with
   * fromRotationTranslation, the returned quaternion will be the
   * same as the quaternion originally supplied.
   * @category Static
   *
   * @param out - Quaternion to receive the rotation component
   * @param mat - Matrix to be decomposed (input)
   * @return `out`
   */
  static getRotation(out, mat) {
    Mat4.getScaling(tmpVec3$1, mat);
    const is1 = 1 / tmpVec3$1[0];
    const is2 = 1 / tmpVec3$1[1];
    const is3 = 1 / tmpVec3$1[2];
    const sm11 = mat[0] * is1;
    const sm12 = mat[1] * is2;
    const sm13 = mat[2] * is3;
    const sm21 = mat[4] * is1;
    const sm22 = mat[5] * is2;
    const sm23 = mat[6] * is3;
    const sm31 = mat[8] * is1;
    const sm32 = mat[9] * is2;
    const sm33 = mat[10] * is3;
    const trace = sm11 + sm22 + sm33;
    let S = 0;
    if (trace > 0) {
      S = Math.sqrt(trace + 1) * 2;
      out[3] = 0.25 * S;
      out[0] = (sm23 - sm32) / S;
      out[1] = (sm31 - sm13) / S;
      out[2] = (sm12 - sm21) / S;
    } else if (sm11 > sm22 && sm11 > sm33) {
      S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
      out[3] = (sm23 - sm32) / S;
      out[0] = 0.25 * S;
      out[1] = (sm12 + sm21) / S;
      out[2] = (sm31 + sm13) / S;
    } else if (sm22 > sm33) {
      S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
      out[3] = (sm31 - sm13) / S;
      out[0] = (sm12 + sm21) / S;
      out[1] = 0.25 * S;
      out[2] = (sm23 + sm32) / S;
    } else {
      S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
      out[3] = (sm12 - sm21) / S;
      out[0] = (sm31 + sm13) / S;
      out[1] = (sm23 + sm32) / S;
      out[2] = 0.25 * S;
    }
    return out;
  }
  /**
   * Decomposes a transformation matrix into its rotation, translation
   * and scale components. Returns only the rotation component
   * @category Static
   *
   * @param out_r - Quaternion to receive the rotation component
   * @param out_t - Vector to receive the translation vector
   * @param out_s - Vector to receive the scaling factor
   * @param mat - Matrix to be decomposed (input)
   * @returns `out_r`
   */
  static decompose(out_r, out_t, out_s, mat) {
    out_t[0] = mat[12];
    out_t[1] = mat[13];
    out_t[2] = mat[14];
    const m11 = mat[0];
    const m12 = mat[1];
    const m13 = mat[2];
    const m21 = mat[4];
    const m22 = mat[5];
    const m23 = mat[6];
    const m31 = mat[8];
    const m32 = mat[9];
    const m33 = mat[10];
    out_s[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
    out_s[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
    out_s[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);
    const is1 = 1 / out_s[0];
    const is2 = 1 / out_s[1];
    const is3 = 1 / out_s[2];
    const sm11 = m11 * is1;
    const sm12 = m12 * is2;
    const sm13 = m13 * is3;
    const sm21 = m21 * is1;
    const sm22 = m22 * is2;
    const sm23 = m23 * is3;
    const sm31 = m31 * is1;
    const sm32 = m32 * is2;
    const sm33 = m33 * is3;
    const trace = sm11 + sm22 + sm33;
    let S = 0;
    if (trace > 0) {
      S = Math.sqrt(trace + 1) * 2;
      out_r[3] = 0.25 * S;
      out_r[0] = (sm23 - sm32) / S;
      out_r[1] = (sm31 - sm13) / S;
      out_r[2] = (sm12 - sm21) / S;
    } else if (sm11 > sm22 && sm11 > sm33) {
      S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
      out_r[3] = (sm23 - sm32) / S;
      out_r[0] = 0.25 * S;
      out_r[1] = (sm12 + sm21) / S;
      out_r[2] = (sm31 + sm13) / S;
    } else if (sm22 > sm33) {
      S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
      out_r[3] = (sm31 - sm13) / S;
      out_r[0] = (sm12 + sm21) / S;
      out_r[1] = 0.25 * S;
      out_r[2] = (sm23 + sm32) / S;
    } else {
      S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
      out_r[3] = (sm12 - sm21) / S;
      out_r[0] = (sm31 + sm13) / S;
      out_r[1] = (sm23 + sm32) / S;
      out_r[2] = 0.25 * S;
    }
    return out_r;
  }
  /**
   * Creates a matrix from a quaternion rotation, vector translation and vector scale
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     let quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *     mat4.scale(dest, scale);
   * @category Static
   *
   * @param out - mat4 receiving operation result
   * @param q - Rotation quaternion
   * @param v - Translation vector
   * @param s - Scaling vector
   * @returns `out`
   */
  static fromRotationTranslationScale(out, q, v, s) {
    const x = q[0];
    const y = q[1];
    const z = q[2];
    const w = q[3];
    const x2 = x + x;
    const y2 = y + y;
    const z2 = z + z;
    const xx = x * x2;
    const xy = x * y2;
    const xz = x * z2;
    const yy = y * y2;
    const yz = y * z2;
    const zz = z * z2;
    const wx = w * x2;
    const wy = w * y2;
    const wz = w * z2;
    const sx = s[0];
    const sy = s[1];
    const sz = s[2];
    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     mat4.translate(dest, origin);
   *     let quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *     mat4.scale(dest, scale)
   *     mat4.translate(dest, negativeOrigin);
   * @category Static
   *
   * @param out - mat4 receiving operation result
   * @param q - Rotation quaternion
   * @param v - Translation vector
   * @param s - Scaling vector
   * @param o - The origin vector around which to scale and rotate
   * @returns `out`
   */
  static fromRotationTranslationScaleOrigin(out, q, v, s, o) {
    const x = q[0];
    const y = q[1];
    const z = q[2];
    const w = q[3];
    const x2 = x + x;
    const y2 = y + y;
    const z2 = z + z;
    const xx = x * x2;
    const xy = x * y2;
    const xz = x * z2;
    const yy = y * y2;
    const yz = y * z2;
    const zz = z * z2;
    const wx = w * x2;
    const wy = w * y2;
    const wz = w * z2;
    const sx = s[0];
    const sy = s[1];
    const sz = s[2];
    const ox = o[0];
    const oy = o[1];
    const oz = o[2];
    const out0 = (1 - (yy + zz)) * sx;
    const out1 = (xy + wz) * sx;
    const out2 = (xz - wy) * sx;
    const out4 = (xy - wz) * sy;
    const out5 = (1 - (xx + zz)) * sy;
    const out6 = (yz + wx) * sy;
    const out8 = (xz + wy) * sz;
    const out9 = (yz - wx) * sz;
    const out10 = (1 - (xx + yy)) * sz;
    out[0] = out0;
    out[1] = out1;
    out[2] = out2;
    out[3] = 0;
    out[4] = out4;
    out[5] = out5;
    out[6] = out6;
    out[7] = 0;
    out[8] = out8;
    out[9] = out9;
    out[10] = out10;
    out[11] = 0;
    out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
    out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
    out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
    out[15] = 1;
    return out;
  }
  /**
   * Calculates a 4x4 matrix from the given quaternion
   * @category Static
   *
   * @param out - mat4 receiving operation result
   * @param q - Quaternion to create matrix from
   * @returns `out`
   */
  static fromQuat(out, q) {
    const x = q[0];
    const y = q[1];
    const z = q[2];
    const w = q[3];
    const x2 = x + x;
    const y2 = y + y;
    const z2 = z + z;
    const xx = x * x2;
    const yx = y * x2;
    const yy = y * y2;
    const zx = z * x2;
    const zy = z * y2;
    const zz = z * z2;
    const wx = w * x2;
    const wy = w * y2;
    const wz = w * z2;
    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;
    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;
    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Generates a frustum matrix with the given bounds
   * @category Static
   *
   * @param out - mat4 frustum matrix will be written into
   * @param left - Left bound of the frustum
   * @param right - Right bound of the frustum
   * @param bottom - Bottom bound of the frustum
   * @param top - Top bound of the frustum
   * @param near - Near bound of the frustum
   * @param far - Far bound of the frustum
   * @returns `out`
   */
  static frustum(out, left, right, bottom, top, near, far) {
    const rl = 1 / (right - left);
    const tb = 1 / (top - bottom);
    const nf = 1 / (near - far);
    out[0] = near * 2 * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = near * 2 * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = far * near * 2 * nf;
    out[15] = 0;
    return out;
  }
  /**
   * Generates a perspective projection matrix with the given bounds.
   * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
   * which matches WebGL/OpenGL's clip volume.
   * Passing null/undefined/no value for far will generate infinite projection matrix.
   * @category Static
   *
   * @param out - mat4 frustum matrix will be written into
   * @param fovy - Vertical field of view in radians
   * @param aspect - Aspect ratio. typically viewport width/height
   * @param near - Near bound of the frustum
   * @param far - Far bound of the frustum, can be null or Infinity
   * @returns `out`
   */
  static perspectiveNO(out, fovy, aspect, near, far) {
    const f = 1 / Math.tan(fovy / 2);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;
    if (far != null && far !== Infinity) {
      const nf = 1 / (near - far);
      out[10] = (far + near) * nf;
      out[14] = 2 * far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -2 * near;
    }
    return out;
  }
  /**
   * Alias for {@link Mat4.perspectiveNO}
   * @category Static
   * @deprecated Use {@link Mat4.perspectiveNO} or {@link Mat4.perspectiveZO} explicitly
   */
  static perspective(out, fovy, aspect, near, far) {
    return out;
  }
  /**
   * Generates a perspective projection matrix suitable for WebGPU with the given bounds.
   * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
   * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
   * Passing null/undefined/no value for far will generate infinite projection matrix.
   * @category Static
   *
   * @param out - mat4 frustum matrix will be written into
   * @param fovy - Vertical field of view in radians
   * @param aspect - Aspect ratio. typically viewport width/height
   * @param near - Near bound of the frustum
   * @param far - Far bound of the frustum, can be null or Infinity
   * @returns `out`
   */
  static perspectiveZO(out, fovy, aspect, near, far) {
    const f = 1 / Math.tan(fovy / 2);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;
    if (far != null && far !== Infinity) {
      const nf = 1 / (near - far);
      out[10] = far * nf;
      out[14] = far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -near;
    }
    return out;
  }
  /**
   * Generates a perspective projection matrix with the given field of view.
   * This is primarily useful for generating projection matrices to be used
   * with the still experiemental WebVR API.
   * @category Static
   *
   * @param out - mat4 frustum matrix will be written into
   * @param fov - Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
   * @param near - Near bound of the frustum
   * @param far - Far bound of the frustum
   * @returns `out`
   * @deprecated
   */
  static perspectiveFromFieldOfView(out, fov, near, far) {
    const upTan = Math.tan(fov.upDegrees * Math.PI / 180);
    const downTan = Math.tan(fov.downDegrees * Math.PI / 180);
    const leftTan = Math.tan(fov.leftDegrees * Math.PI / 180);
    const rightTan = Math.tan(fov.rightDegrees * Math.PI / 180);
    const xScale = 2 / (leftTan + rightTan);
    const yScale = 2 / (upTan + downTan);
    out[0] = xScale;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = yScale;
    out[6] = 0;
    out[7] = 0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = (upTan - downTan) * yScale * 0.5;
    out[10] = far / (near - far);
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = far * near / (near - far);
    out[15] = 0;
    return out;
  }
  /**
   * Generates a orthogonal projection matrix with the given bounds.
   * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
   * which matches WebGL/OpenGL's clip volume.
   * @category Static
   *
   * @param out - mat4 frustum matrix will be written into
   * @param left - Left bound of the frustum
   * @param right - Right bound of the frustum
   * @param bottom - Bottom bound of the frustum
   * @param top - Top bound of the frustum
   * @param near - Near bound of the frustum
   * @param far - Far bound of the frustum
   * @returns `out`
   */
  static orthoNO(out, left, right, bottom, top, near, far) {
    const lr = 1 / (left - right);
    const bt = 1 / (bottom - top);
    const nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
  }
  /**
   * Alias for {@link Mat4.orthoNO}
   * @category Static
   * @deprecated Use {@link Mat4.orthoNO} or {@link Mat4.orthoZO} explicitly
   */
  static ortho(out, left, right, bottom, top, near, far) {
    return out;
  }
  /**
   * Generates a orthogonal projection matrix with the given bounds.
   * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
   * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
   * @category Static
   *
   * @param out - mat4 frustum matrix will be written into
   * @param left - Left bound of the frustum
   * @param right - Right bound of the frustum
   * @param bottom - Bottom bound of the frustum
   * @param top - Top bound of the frustum
   * @param near - Near bound of the frustum
   * @param far - Far bound of the frustum
   * @returns `out`
   */
  static orthoZO(out, left, right, bottom, top, near, far) {
    const lr = 1 / (left - right);
    const bt = 1 / (bottom - top);
    const nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = near * nf;
    out[15] = 1;
    return out;
  }
  /**
   * Generates a look-at matrix with the given eye position, focal point, and up axis.
   * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
   * @category Static
   *
   * @param out - mat4 frustum matrix will be written into
   * @param eye - Position of the viewer
   * @param center - Point the viewer is looking at
   * @param up - vec3 pointing up
   * @returns `out`
   */
  static lookAt(out, eye, center, up) {
    const eyex = eye[0];
    const eyey = eye[1];
    const eyez = eye[2];
    const upx = up[0];
    const upy = up[1];
    const upz = up[2];
    const centerx = center[0];
    const centery = center[1];
    const centerz = center[2];
    if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
      return Mat4.identity(out);
    }
    let z0 = eyex - centerx;
    let z1 = eyey - centery;
    let z2 = eyez - centerz;
    let len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;
    let x0 = upy * z2 - upz * z1;
    let x1 = upz * z0 - upx * z2;
    let x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
      x0 = 0;
      x1 = 0;
      x2 = 0;
    } else {
      len = 1 / len;
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }
    let y0 = z1 * x2 - z2 * x1;
    let y1 = z2 * x0 - z0 * x2;
    let y2 = z0 * x1 - z1 * x0;
    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
      y0 = 0;
      y1 = 0;
      y2 = 0;
    } else {
      len = 1 / len;
      y0 *= len;
      y1 *= len;
      y2 *= len;
    }
    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;
    return out;
  }
  /**
   * Generates a matrix that makes something look at something else.
   * @category Static
   *
   * @param out - mat4 frustum matrix will be written into
   * @param eye - Position of the viewer
   * @param target - Point the viewer is looking at
   * @param up - vec3 pointing up
   * @returns `out`
   */
  static targetTo(out, eye, target, up) {
    const eyex = eye[0];
    const eyey = eye[1];
    const eyez = eye[2];
    const upx = up[0];
    const upy = up[1];
    const upz = up[2];
    let z0 = eyex - target[0];
    let z1 = eyey - target[1];
    let z2 = eyez - target[2];
    let len = z0 * z0 + z1 * z1 + z2 * z2;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
      z0 *= len;
      z1 *= len;
      z2 *= len;
    }
    let x0 = upy * z2 - upz * z1;
    let x1 = upz * z0 - upx * z2;
    let x2 = upx * z1 - upy * z0;
    len = x0 * x0 + x1 * x1 + x2 * x2;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }
    out[0] = x0;
    out[1] = x1;
    out[2] = x2;
    out[3] = 0;
    out[4] = z1 * x2 - z2 * x1;
    out[5] = z2 * x0 - z0 * x2;
    out[6] = z0 * x1 - z1 * x0;
    out[7] = 0;
    out[8] = z0;
    out[9] = z1;
    out[10] = z2;
    out[11] = 0;
    out[12] = eyex;
    out[13] = eyey;
    out[14] = eyez;
    out[15] = 1;
    return out;
  }
  /**
   * Returns Frobenius norm of a {@link Mat4}
   * @category Static
   *
   * @param a - the matrix to calculate Frobenius norm of
   * @returns Frobenius norm
   */
  static frob(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3] + a[4] * a[4] + a[5] * a[5] + a[6] * a[6] + a[7] * a[7] + a[8] * a[8] + a[9] * a[9] + a[10] * a[10] + a[11] * a[11] + a[12] * a[12] + a[13] * a[13] + a[14] * a[14] + a[15] * a[15]);
  }
  /**
   * Adds two {@link Mat4}'s
   * @category Static
   *
   * @param out - the receiving matrix
   * @param a - the first operand
   * @param b - the second operand
   * @returns `out`
   */
  static add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    out[9] = a[9] + b[9];
    out[10] = a[10] + b[10];
    out[11] = a[11] + b[11];
    out[12] = a[12] + b[12];
    out[13] = a[13] + b[13];
    out[14] = a[14] + b[14];
    out[15] = a[15] + b[15];
    return out;
  }
  /**
   * Subtracts matrix b from matrix a
   * @category Static
   *
   * @param out - the receiving matrix
   * @param a - the first operand
   * @param b - the second operand
   * @returns `out`
   */
  static subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    out[9] = a[9] - b[9];
    out[10] = a[10] - b[10];
    out[11] = a[11] - b[11];
    out[12] = a[12] - b[12];
    out[13] = a[13] - b[13];
    out[14] = a[14] - b[14];
    out[15] = a[15] - b[15];
    return out;
  }
  /**
   * Alias for {@link Mat4.subtract}
   * @category Static
   */
  static sub(out, a, b) {
    return out;
  }
  /**
   * Multiply each element of the matrix by a scalar.
   * @category Static
   *
   * @param out - the receiving matrix
   * @param a - the matrix to scale
   * @param b - amount to scale the matrix's elements by
   * @returns `out`
   */
  static multiplyScalar(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    out[9] = a[9] * b;
    out[10] = a[10] * b;
    out[11] = a[11] * b;
    out[12] = a[12] * b;
    out[13] = a[13] * b;
    out[14] = a[14] * b;
    out[15] = a[15] * b;
    return out;
  }
  /**
   * Adds two mat4's after multiplying each element of the second operand by a scalar value.
   * @category Static
   *
   * @param out - the receiving vector
   * @param a - the first operand
   * @param b - the second operand
   * @param scale - the amount to scale b's elements by before adding
   * @returns `out`
   */
  static multiplyScalarAndAdd(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    out[4] = a[4] + b[4] * scale;
    out[5] = a[5] + b[5] * scale;
    out[6] = a[6] + b[6] * scale;
    out[7] = a[7] + b[7] * scale;
    out[8] = a[8] + b[8] * scale;
    out[9] = a[9] + b[9] * scale;
    out[10] = a[10] + b[10] * scale;
    out[11] = a[11] + b[11] * scale;
    out[12] = a[12] + b[12] * scale;
    out[13] = a[13] + b[13] * scale;
    out[14] = a[14] + b[14] * scale;
    out[15] = a[15] + b[15] * scale;
    return out;
  }
  /**
   * Returns whether or not two {@link Mat4}s have exactly the same elements in the same position (when compared with ===)
   * @category Static
   *
   * @param a - The first matrix.
   * @param b - The second matrix.
   * @returns True if the matrices are equal, false otherwise.
   */
  static exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
  }
  /**
   * Returns whether or not two {@link Mat4}s have approximately the same elements in the same position.
   * @category Static
   *
   * @param a - The first matrix.
   * @param b - The second matrix.
   * @returns True if the matrices are equal, false otherwise.
   */
  static equals(a, b) {
    const a0 = a[0];
    const a1 = a[1];
    const a2 = a[2];
    const a3 = a[3];
    const a4 = a[4];
    const a5 = a[5];
    const a6 = a[6];
    const a7 = a[7];
    const a8 = a[8];
    const a9 = a[9];
    const a10 = a[10];
    const a11 = a[11];
    const a12 = a[12];
    const a13 = a[13];
    const a14 = a[14];
    const a15 = a[15];
    const b0 = b[0];
    const b1 = b[1];
    const b2 = b[2];
    const b3 = b[3];
    const b4 = b[4];
    const b5 = b[5];
    const b6 = b[6];
    const b7 = b[7];
    const b8 = b[8];
    const b9 = b[9];
    const b10 = b[10];
    const b11 = b[11];
    const b12 = b[12];
    const b13 = b[13];
    const b14 = b[14];
    const b15 = b[15];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= EPSILON * Math.max(1, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= EPSILON * Math.max(1, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= EPSILON * Math.max(1, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= EPSILON * Math.max(1, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= EPSILON * Math.max(1, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= EPSILON * Math.max(1, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= EPSILON * Math.max(1, Math.abs(a15), Math.abs(b15));
  }
  /**
   * Returns a string representation of a {@link Mat4}
   * @category Static
   *
   * @param a - matrix to represent as a string
   * @returns string representation of the matrix
   */
  static str(a) {
    return `Mat4(${a.join(", ")})`;
  }
}
const tmpVec3$1 = [0, 0, 0];
Mat4.prototype.mul = Mat4.prototype.multiply;
Mat4.sub = Mat4.subtract;
Mat4.mul = Mat4.multiply;
Mat4.perspective = Mat4.perspectiveNO;
Mat4.ortho = Mat4.orthoNO;
class Vec3 extends Float32Array {
  /**
  * The number of bytes in a {@link Vec3}.
  */
  static BYTE_LENGTH = 3 * Float32Array.BYTES_PER_ELEMENT;
  /**
  * Create a {@link Vec3}.
  */
  constructor(...values) {
    switch (values.length) {
      case 3:
        super(values);
        break;
      case 2:
        super(values[0], values[1], 3);
        break;
      case 1: {
        const v = values[0];
        if (typeof v === "number") {
          super([v, v, v]);
        } else {
          super(v, 0, 3);
        }
        break;
      }
      default:
        super(3);
        break;
    }
  }
  //============
  // Attributes
  //============
  // Getters and setters to make component access read better.
  // These are likely to be a little bit slower than direct array access.
  /**
   * The x component of the vector. Equivalent to `this[0];`
   * @category Vector components
   */
  get x() {
    return this[0];
  }
  set x(value) {
    this[0] = value;
  }
  /**
   * The y component of the vector. Equivalent to `this[1];`
   * @category Vector components
   */
  get y() {
    return this[1];
  }
  set y(value) {
    this[1] = value;
  }
  /**
   * The z component of the vector. Equivalent to `this[2];`
   * @category Vector components
   */
  get z() {
    return this[2];
  }
  set z(value) {
    this[2] = value;
  }
  // Alternate set of getters and setters in case this is being used to define
  // a color.
  /**
   * The r component of the vector. Equivalent to `this[0];`
   * @category Color components
   */
  get r() {
    return this[0];
  }
  set r(value) {
    this[0] = value;
  }
  /**
   * The g component of the vector. Equivalent to `this[1];`
   * @category Color components
   */
  get g() {
    return this[1];
  }
  set g(value) {
    this[1] = value;
  }
  /**
   * The b component of the vector. Equivalent to `this[2];`
   * @category Color components
   */
  get b() {
    return this[2];
  }
  set b(value) {
    this[2] = value;
  }
  /**
   * The magnitude (length) of this.
   * Equivalent to `Vec3.magnitude(this);`
   *
   * Magnitude is used because the `length` attribute is already defined by
   * `Float32Array` to mean the number of elements in the array.
   */
  get magnitude() {
    const x = this[0];
    const y = this[1];
    const z = this[2];
    return Math.sqrt(x * x + y * y + z * z);
  }
  /**
   * Alias for {@link Vec3.magnitude}
   */
  get mag() {
    return this.magnitude;
  }
  /**
   * The squared magnitude (length) of `this`.
   * Equivalent to `Vec3.squaredMagnitude(this);`
   */
  get squaredMagnitude() {
    const x = this[0];
    const y = this[1];
    const z = this[2];
    return x * x + y * y + z * z;
  }
  /**
   * Alias for {@link Vec3.squaredMagnitude}
   */
  get sqrMag() {
    return this.squaredMagnitude;
  }
  /**
   * A string representation of `this`
   * Equivalent to `Vec3.str(this);`
   */
  get str() {
    return Vec3.str(this);
  }
  //===================
  // Instances methods
  //===================
  /**
   * Copy the values from another {@link Vec3} into `this`.
   *
   * @param a the source vector
   * @returns `this`
   */
  copy(a) {
    this.set(a);
    return this;
  }
  /**
   * Adds a {@link Vec3} to `this`.
   * Equivalent to `Vec3.add(this, this, b);`
   *
   * @param b - The vector to add to `this`
   * @returns `this`
   */
  add(b) {
    this[0] += b[0];
    this[1] += b[1];
    this[2] += b[2];
    return this;
  }
  /**
   * Subtracts a {@link Vec3} from `this`.
   * Equivalent to `Vec3.subtract(this, this, b);`
   *
   * @param b - The vector to subtract from `this`
   * @returns `this`
   */
  subtract(b) {
    this[0] -= b[0];
    this[1] -= b[1];
    this[2] -= b[2];
    return this;
  }
  /**
   * Alias for {@link Vec3.subtract}
   */
  sub(b) {
    return this;
  }
  /**
   * Multiplies `this` by a {@link Vec3}.
   * Equivalent to `Vec3.multiply(this, this, b);`
   *
   * @param b - The vector to multiply `this` by
   * @returns `this`
   */
  multiply(b) {
    this[0] *= b[0];
    this[1] *= b[1];
    this[2] *= b[2];
    return this;
  }
  /**
   * Alias for {@link Vec3.multiply}
   */
  mul(b) {
    return this;
  }
  /**
   * Divides `this` by a {@link Vec3}.
   * Equivalent to `Vec3.divide(this, this, b);`
   *
   * @param b - The vector to divide `this` by
   * @returns `this`
   */
  divide(b) {
    this[0] /= b[0];
    this[1] /= b[1];
    this[2] /= b[2];
    return this;
  }
  /**
   * Alias for {@link Vec3.divide}
   */
  div(b) {
    return this;
  }
  /**
   * Scales `this` by a scalar number.
   * Equivalent to `Vec3.scale(this, this, b);`
   *
   * @param b - Amount to scale `this` by
   * @returns `this`
   */
  scale(b) {
    this[0] *= b;
    this[1] *= b;
    this[2] *= b;
    return this;
  }
  /**
   * Calculates `this` scaled by a scalar value then adds the result to `this`.
   * Equivalent to `Vec3.scaleAndAdd(this, this, b, scale);`
   *
   * @param b - The vector to add to `this`
   * @param scale - The amount to scale `b` by before adding
   * @returns `this`
   */
  scaleAndAdd(b, scale) {
    this[0] += b[0] * scale;
    this[1] += b[1] * scale;
    this[2] += b[2] * scale;
    return this;
  }
  /**
   * Calculates the euclidian distance between another {@link Vec3} and `this`.
   * Equivalent to `Vec3.distance(this, b);`
   *
   * @param b - The vector to calculate the distance to
   * @returns Distance between `this` and `b`
   */
  distance(b) {
    return Vec3.distance(this, b);
  }
  /**
   * Alias for {@link Vec3.distance}
   */
  dist(b) {
    return 0;
  }
  /**
   * Calculates the squared euclidian distance between another {@link Vec3} and `this`.
   * Equivalent to `Vec3.squaredDistance(this, b);`
   *
   * @param b The vector to calculate the squared distance to
   * @returns Squared distance between `this` and `b`
   */
  squaredDistance(b) {
    return Vec3.squaredDistance(this, b);
  }
  /**
   * Alias for {@link Vec3.squaredDistance}
   */
  sqrDist(b) {
    return 0;
  }
  /**
   * Negates the components of `this`.
   * Equivalent to `Vec3.negate(this, this);`
   *
   * @returns `this`
   */
  negate() {
    this[0] *= -1;
    this[1] *= -1;
    this[2] *= -1;
    return this;
  }
  /**
   * Inverts the components of `this`.
   * Equivalent to `Vec3.inverse(this, this);`
   *
   * @returns `this`
   */
  invert() {
    this[0] = 1 / this[0];
    this[1] = 1 / this[1];
    this[2] = 1 / this[2];
    return this;
  }
  /**
   * Calculates the dot product of this and another {@link Vec3}.
   * Equivalent to `Vec3.dot(this, b);`
   *
   * @param b - The second operand
   * @returns Dot product of `this` and `b`
   */
  dot(b) {
    return this[0] * b[0] + this[1] * b[1] + this[2] * b[2];
  }
  /**
   * Normalize `this`.
   * Equivalent to `Vec3.normalize(this, this);`
   *
   * @returns `this`
   */
  normalize() {
    return Vec3.normalize(this, this);
  }
  //================
  // Static methods
  //================
  /**
   * Creates a new, empty vec3
   * @category Static
   *
   * @returns a new 3D vector
   */
  static create() {
    return new Vec3();
  }
  /**
   * Creates a new vec3 initialized with values from an existing vector
   * @category Static
   *
   * @param a - vector to clone
   * @returns a new 3D vector
   */
  static clone(a) {
    return new Vec3(a);
  }
  /**
   * Calculates the magnitude (length) of a {@link Vec3}
   * @category Static
   *
   * @param a - Vector to calculate magnitude of
   * @returns Magnitude of a
   */
  static magnitude(a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    return Math.sqrt(x * x + y * y + z * z);
  }
  /**
   * Alias for {@link Vec3.magnitude}
   * @category Static
   */
  static mag(a) {
    return 0;
  }
  /**
   * Alias for {@link Vec3.magnitude}
   * @category Static
   * @deprecated Use {@link Vec3.magnitude} to avoid conflicts with builtin `length` methods/attribs
   *
   * @param a - vector to calculate length of
   * @returns length of a
   */
  // @ts-ignore: Length conflicts with Function.length
  static length(a) {
    return 0;
  }
  /**
   * Alias for {@link Vec3.magnitude}
   * @category Static
   * @deprecated Use {@link Vec3.mag}
   */
  static len(a) {
    return 0;
  }
  /**
   * Creates a new vec3 initialized with the given values
   * @category Static
   *
   * @param x - X component
   * @param y - Y component
   * @param z - Z component
   * @returns a new 3D vector
   */
  static fromValues(x, y, z) {
    return new Vec3(x, y, z);
  }
  /**
   * Copy the values from one vec3 to another
   * @category Static
   *
   * @param out - the receiving vector
   * @param a - the source vector
   * @returns `out`
   */
  static copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }
  /**
   * Set the components of a vec3 to the given values
   * @category Static
   *
   * @param out - the receiving vector
   * @param x - X component
   * @param y - Y component
   * @param z - Z component
   * @returns `out`
   */
  static set(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  /**
   * Adds two {@link Vec3}s
   * @category Static
   *
   * @param out - The receiving vector
   * @param a - The first operand
   * @param b - The second operand
   * @returns `out`
   */
  static add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
  }
  /**
   * Subtracts vector b from vector a
   * @category Static
   *
   * @param out - the receiving vector
   * @param a - the first operand
   * @param b - the second operand
   * @returns `out`
   */
  static subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
  }
  /**
   * Alias for {@link Vec3.subtract}
   * @category Static
   */
  static sub(out, a, b) {
    return [0, 0, 0];
  }
  /**
   * Multiplies two vec3's
   * @category Static
   *
   * @param out - the receiving vector
   * @param a - the first operand
   * @param b - the second operand
   * @returns `out`
   */
  static multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
  }
  /**
   * Alias for {@link Vec3.multiply}
   * @category Static
   */
  static mul(out, a, b) {
    return [0, 0, 0];
  }
  /**
   * Divides two vec3's
   * @category Static
   *
   * @param out - the receiving vector
   * @param a - the first operand
   * @param b - the second operand
   * @returns `out`
   */
  static divide(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
  }
  /**
   * Alias for {@link Vec3.divide}
   * @category Static
   */
  static div(out, a, b) {
    return [0, 0, 0];
  }
  /**
   * Math.ceil the components of a vec3
   * @category Static
   *
   * @param out - the receiving vector
   * @param a - vector to ceil
   * @returns `out`
   */
  static ceil(out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    return out;
  }
  /**
   * Math.floor the components of a vec3
   * @category Static
   *
   * @param out - the receiving vector
   * @param a - vector to floor
   * @returns `out`
   */
  static floor(out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    return out;
  }
  /**
   * Returns the minimum of two vec3's
   * @category Static
   *
   * @param out - the receiving vector
   * @param a - the first operand
   * @param b - the second operand
   * @returns `out`
   */
  static min(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
  }
  /**
   * Returns the maximum of two vec3's
   * @category Static
   *
   * @param out - the receiving vector
   * @param a - the first operand
   * @param b - the second operand
   * @returns `out`
   */
  static max(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
  }
  /**
   * symmetric round the components of a vec3
   * @category Static
   *
   * @param out - the receiving vector
   * @param a - vector to round
   * @returns `out`
   */
  /*static round(out: Vec3Like, a: Readonly<Vec3Like>): Vec3Like {
    out[0] = glMatrix.round(a[0]);
    out[1] = glMatrix.round(a[1]);
    out[2] = glMatrix.round(a[2]);
    return out;
  }*/
  /**
   * Scales a vec3 by a scalar number
   * @category Static
   *
   * @param out - the receiving vector
   * @param a - the vector to scale
   * @param scale - amount to scale the vector by
   * @returns `out`
   */
  static scale(out, a, scale) {
    out[0] = a[0] * scale;
    out[1] = a[1] * scale;
    out[2] = a[2] * scale;
    return out;
  }
  /**
   * Adds two vec3's after scaling the second operand by a scalar value
   * @category Static
   *
   * @param out - the receiving vector
   * @param a - the first operand
   * @param b - the second operand
   * @param scale - the amount to scale b by before adding
   * @returns `out`
   */
  static scaleAndAdd(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    return out;
  }
  /**
   * Calculates the euclidian distance between two vec3's
   * @category Static
   *
   * @param a - the first operand
   * @param b - the second operand
   * @returns distance between a and b
   */
  static distance(a, b) {
    const x = b[0] - a[0];
    const y = b[1] - a[1];
    const z = b[2] - a[2];
    return Math.sqrt(x * x + y * y + z * z);
  }
  /**
   * Alias for {@link Vec3.distance}
   */
  static dist(a, b) {
    return 0;
  }
  /**
   * Calculates the squared euclidian distance between two vec3's
   * @category Static
   *
   * @param a - the first operand
   * @param b - the second operand
   * @returns squared distance between a and b
   */
  static squaredDistance(a, b) {
    const x = b[0] - a[0];
    const y = b[1] - a[1];
    const z = b[2] - a[2];
    return x * x + y * y + z * z;
  }
  /**
   * Alias for {@link Vec3.squaredDistance}
   */
  static sqrDist(a, b) {
    return 0;
  }
  /**
   * Calculates the squared length of a vec3
   * @category Static
   *
   * @param a - vector to calculate squared length of
   * @returns squared length of a
   */
  static squaredLength(a) {
    const x = a[0];
    const y = a[1];
    const z = a[2];
    return x * x + y * y + z * z;
  }
  /**
   * Alias for {@link Vec3.squaredLength}
   */
  static sqrLen(a, b) {
    return 0;
  }
  /**
   * Negates the components of a vec3
   * @category Static
   *
   * @param out - the receiving vector
   * @param a - vector to negate
   * @returns `out`
   */
  static negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
  }
  /**
   * Returns the inverse of the components of a vec3
   * @category Static
   *
   * @param out - the receiving vector
   * @param a - vector to invert
   * @returns `out`
   */
  static inverse(out, a) {
    out[0] = 1 / a[0];
    out[1] = 1 / a[1];
    out[2] = 1 / a[2];
    return out;
  }
  /**
   * Normalize a vec3
   * @category Static
   *
   * @param out - the receiving vector
   * @param a - vector to normalize
   * @returns `out`
   */
  static normalize(out, a) {
    const x = a[0];
    const y = a[1];
    const z = a[2];
    let len = x * x + y * y + z * z;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
    }
    out[0] = a[0] * len;
    out[1] = a[1] * len;
    out[2] = a[2] * len;
    return out;
  }
  /**
   * Calculates the dot product of two vec3's
   * @category Static
   *
   * @param a - the first operand
   * @param b - the second operand
   * @returns dot product of a and b
   */
  static dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  /**
   * Computes the cross product of two vec3's
   * @category Static
   *
   * @param out - the receiving vector
   * @param a - the first operand
   * @param b - the second operand
   * @returns `out`
   */
  static cross(out, a, b) {
    const ax = a[0], ay = a[1], az = a[2];
    const bx = b[0], by = b[1], bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
  }
  /**
   * Performs a linear interpolation between two vec3's
   * @category Static
   *
   * @param out - the receiving vector
   * @param a - the first operand
   * @param b - the second operand
   * @param t - interpolation amount, in the range [0-1], between the two inputs
   * @returns `out`
   */
  static lerp(out, a, b, t) {
    const ax = a[0];
    const ay = a[1];
    const az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
  }
  /**
   * Performs a spherical linear interpolation between two vec3's
   * @category Static
   *
   * @param out - the receiving vector
   * @param a - the first operand
   * @param b - the second operand
   * @param t - interpolation amount, in the range [0-1], between the two inputs
   * @returns `out`
   */
  static slerp(out, a, b, t) {
    const angle = Math.acos(Math.min(Math.max(Vec3.dot(a, b), -1), 1));
    const sinTotal = Math.sin(angle);
    const ratioA = Math.sin((1 - t) * angle) / sinTotal;
    const ratioB = Math.sin(t * angle) / sinTotal;
    out[0] = ratioA * a[0] + ratioB * b[0];
    out[1] = ratioA * a[1] + ratioB * b[1];
    out[2] = ratioA * a[2] + ratioB * b[2];
    return out;
  }
  /**
   * Performs a hermite interpolation with two control points
   * @category Static
   *
   * @param out - the receiving vector
   * @param a - the first operand
   * @param b - the second operand
   * @param c - the third operand
   * @param d - the fourth operand
   * @param t - interpolation amount, in the range [0-1], between the two inputs
   * @returns `out`
   */
  static hermite(out, a, b, c, d, t) {
    const factorTimes2 = t * t;
    const factor1 = factorTimes2 * (2 * t - 3) + 1;
    const factor2 = factorTimes2 * (t - 2) + t;
    const factor3 = factorTimes2 * (t - 1);
    const factor4 = factorTimes2 * (3 - 2 * t);
    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
    return out;
  }
  /**
   * Performs a bezier interpolation with two control points
   * @category Static
   *
   * @param out - the receiving vector
   * @param a - the first operand
   * @param b - the second operand
   * @param c - the third operand
   * @param d - the fourth operand
   * @param t - interpolation amount, in the range [0-1], between the two inputs
   * @returns `out`
   */
  static bezier(out, a, b, c, d, t) {
    const inverseFactor = 1 - t;
    const inverseFactorTimesTwo = inverseFactor * inverseFactor;
    const factorTimes2 = t * t;
    const factor1 = inverseFactorTimesTwo * inverseFactor;
    const factor2 = 3 * t * inverseFactorTimesTwo;
    const factor3 = 3 * factorTimes2 * inverseFactor;
    const factor4 = factorTimes2 * t;
    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
    return out;
  }
  /**
   * Generates a random vector with the given scale
   * @category Static
   *
   * @param out - the receiving vector
   * @param {Number} [scale] Length of the resulting vector. If omitted, a unit vector will be returned
   * @returns `out`
   */
  /*static random(out: Vec3Like, scale) {
      scale = scale === undefined ? 1.0 : scale;
  
      let r = glMatrix.RANDOM() * 2.0 * Math.PI;
      let z = glMatrix.RANDOM() * 2.0 - 1.0;
      let zScale = Math.sqrt(1.0 - z * z) * scale;
  
      out[0] = Math.cos(r) * zScale;
      out[1] = Math.sin(r) * zScale;
      out[2] = z * scale;
      return out;
    }*/
  /**
   * Transforms the vec3 with a mat4.
   * 4th vector component is implicitly '1'
   * @category Static
   *
   * @param out - the receiving vector
   * @param a - the vector to transform
   * @param m - matrix to transform with
   * @returns `out`
   */
  static transformMat4(out, a, m) {
    const x = a[0], y = a[1], z = a[2];
    const w = m[3] * x + m[7] * y + m[11] * z + m[15] || 1;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
  }
  /**
   * Transforms the vec3 with a mat3.
   * @category Static
   *
   * @param out - the receiving vector
   * @param a - the vector to transform
   * @param m - the 3x3 matrix to transform with
   * @returns `out`
   */
  static transformMat3(out, a, m) {
    let x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
  }
  /**
   * Transforms the vec3 with a quat
   * Can also be used for dual quaternions. (Multiply it with the real part)
   * @category Static
   *
   * @param out - the receiving vector
   * @param a - the vector to transform
   * @param q - quaternion to transform with
   * @returns `out`
   */
  static transformQuat(out, a, q) {
    const qx = q[0];
    const qy = q[1];
    const qz = q[2];
    const w2 = q[3] * 2;
    const x = a[0];
    const y = a[1];
    const z = a[2];
    const uvx = qy * z - qz * y;
    const uvy = qz * x - qx * z;
    const uvz = qx * y - qy * x;
    const uuvx = (qy * uvz - qz * uvy) * 2;
    const uuvy = (qz * uvx - qx * uvz) * 2;
    const uuvz = (qx * uvy - qy * uvx) * 2;
    out[0] = x + uvx * w2 + uuvx;
    out[1] = y + uvy * w2 + uuvy;
    out[2] = z + uvz * w2 + uuvz;
    return out;
  }
  /**
   * Rotate a 3D vector around the x-axis
   * @param out - The receiving vec3
   * @param a - The vec3 point to rotate
   * @param b - The origin of the rotation
   * @param rad - The angle of rotation in radians
   * @returns `out`
   */
  static rotateX(out, a, b, rad) {
    const by = b[1];
    const bz = b[2];
    const py = a[1] - by;
    const pz = a[2] - bz;
    out[0] = a[0];
    out[1] = py * Math.cos(rad) - pz * Math.sin(rad) + by;
    out[2] = py * Math.sin(rad) + pz * Math.cos(rad) + bz;
    return out;
  }
  /**
   * Rotate a 3D vector around the y-axis
   * @param out - The receiving vec3
   * @param a - The vec3 point to rotate
   * @param b - The origin of the rotation
   * @param rad - The angle of rotation in radians
   * @returns `out`
   */
  static rotateY(out, a, b, rad) {
    const bx = b[0];
    const bz = b[2];
    const px = a[0] - bx;
    const pz = a[2] - bz;
    out[0] = pz * Math.sin(rad) + px * Math.cos(rad) + bx;
    out[1] = a[1];
    out[2] = pz * Math.cos(rad) - px * Math.sin(rad) + bz;
    return out;
  }
  /**
   * Rotate a 3D vector around the z-axis
   * @param out - The receiving vec3
   * @param a - The vec3 point to rotate
   * @param b - The origin of the rotation
   * @param rad - The angle of rotation in radians
   * @returns `out`
   */
  static rotateZ(out, a, b, rad) {
    const bx = b[0];
    const by = b[1];
    const px = a[0] - bx;
    const py = a[1] - by;
    out[0] = px * Math.cos(rad) - py * Math.sin(rad) + bx;
    out[1] = px * Math.sin(rad) + py * Math.cos(rad) + by;
    out[2] = b[2];
    return out;
  }
  /**
   * Get the angle between two 3D vectors
   * @param a - The first operand
   * @param b - The second operand
   * @returns The angle in radians
   */
  static angle(a, b) {
    const ax = a[0];
    const ay = a[1];
    const az = a[2];
    const bx = b[0];
    const by = b[1];
    const bz = b[2];
    const mag = Math.sqrt((ax * ax + ay * ay + az * az) * (bx * bx + by * by + bz * bz));
    const cosine = mag && Vec3.dot(a, b) / mag;
    return Math.acos(Math.min(Math.max(cosine, -1), 1));
  }
  /**
   * Set the components of a vec3 to zero
   * @category Static
   *
   * @param out - the receiving vector
   * @returns `out`
   */
  static zero(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
  }
  /**
   * Returns a string representation of a vector
   * @category Static
   *
   * @param a - vector to represent as a string
   * @returns string representation of the vector
   */
  static str(a) {
    return `Vec3(${a.join(", ")})`;
  }
  /**
   * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
   * @category Static
   *
   * @param a - The first vector.
   * @param b - The second vector.
   * @returns True if the vectors are equal, false otherwise.
   */
  static exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  }
  /**
   * Returns whether or not the vectors have approximately the same elements in the same position.
   * @category Static
   *
   * @param a - The first vector.
   * @param b - The second vector.
   * @returns True if the vectors are equal, false otherwise.
   */
  static equals(a, b) {
    const a0 = a[0];
    const a1 = a[1];
    const a2 = a[2];
    const b0 = b[0];
    const b1 = b[1];
    const b2 = b[2];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2));
  }
}
Vec3.prototype.sub = Vec3.prototype.subtract;
Vec3.prototype.mul = Vec3.prototype.multiply;
Vec3.prototype.div = Vec3.prototype.divide;
Vec3.prototype.dist = Vec3.prototype.distance;
Vec3.prototype.sqrDist = Vec3.prototype.squaredDistance;
Vec3.sub = Vec3.subtract;
Vec3.mul = Vec3.multiply;
Vec3.div = Vec3.divide;
Vec3.dist = Vec3.distance;
Vec3.sqrDist = Vec3.squaredDistance;
Vec3.sqrLen = Vec3.squaredLength;
Vec3.mag = Vec3.magnitude;
Vec3.length = Vec3.magnitude;
Vec3.len = Vec3.magnitude;
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
function clamp(value = 0, min = 0, max = 0) {
  return Math.min(Math.max(value, min), max);
}
function degToRad(deg) {
  return deg * (Math.PI / 180);
}
class AnimationControl {
  /** @type {object} */
  #animationData;
  /** @type {Promise<void>} */
  #finishedPromise;
  #willFinish;
  /**
   * Defines a static empty / void animation control.
   *
   * @type {AnimationControl}
   */
  static #voidControl = new AnimationControl(null);
  /**
   * Provides a static void / undefined AnimationControl that is automatically resolved.
   *
   * @returns {AnimationControl} Void AnimationControl
   */
  static get voidControl() {
    return this.#voidControl;
  }
  /**
   * @param {object|null} [animationData] - Animation data from {@link AnimationAPI}.
   *
   * @param {boolean}     [willFinish] - Promise that tracks animation finished state.
   */
  constructor(animationData, willFinish = false) {
    this.#animationData = animationData;
    this.#willFinish = willFinish;
    if (isObject(animationData)) {
      animationData.control = this;
    }
  }
  /**
   * Get a promise that resolves when animation is finished.
   *
   * @returns {Promise<void>}
   */
  get finished() {
    if (!(this.#finishedPromise instanceof Promise)) {
      this.#finishedPromise = this.#willFinish ? new Promise((resolve) => this.#animationData.resolve = resolve) : Promise.resolve();
    }
    return this.#finishedPromise;
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
    return this.#animationData.active;
  }
  /**
   * Returns whether this animation is completely finished.
   *
   * @returns {boolean} Animation finished state.
   */
  get isFinished() {
    return this.#animationData.finished;
  }
  /**
   * Cancels the animation.
   */
  cancel() {
    const animationData = this.#animationData;
    if (animationData === null || animationData === void 0) {
      return;
    }
    animationData.cancelled = true;
  }
}
class AnimationManager {
  /**
   * @type {object[]}
   */
  static activeList = [];
  /**
   * @type {object[]}
   */
  static newList = [];
  /**
   * @type {number}
   */
  static current;
  /**
   * Add animation data.
   *
   * @param {object}   data -
   */
  static add(data) {
    const now2 = performance.now();
    data.start = now2 + (AnimationManager.current - now2);
    AnimationManager.newList.push(data);
  }
  /**
   * Manage all animation
   */
  static animate() {
    const current = AnimationManager.current = performance.now();
    if (AnimationManager.activeList.length === 0 && AnimationManager.newList.length === 0) {
      globalThis.requestAnimationFrame(AnimationManager.animate);
      return;
    }
    if (AnimationManager.newList.length) {
      for (let cntr = AnimationManager.newList.length; --cntr >= 0; ) {
        const data = AnimationManager.newList[cntr];
        if (data.cancelled) {
          AnimationManager.newList.splice(cntr, 1);
          data.cleanup(data);
        }
        if (data.active) {
          AnimationManager.newList.splice(cntr, 1);
          AnimationManager.activeList.push(data);
        }
      }
    }
    for (let cntr = AnimationManager.activeList.length; --cntr >= 0; ) {
      const data = AnimationManager.activeList[cntr];
      if (data.cancelled || data.el !== void 0 && !data.el.isConnected) {
        AnimationManager.activeList.splice(cntr, 1);
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
        AnimationManager.activeList.splice(cntr, 1);
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
    globalThis.requestAnimationFrame(AnimationManager.animate);
  }
  /**
   * Cancels all animations for given TJSPosition instance.
   *
   * @param {import('../').TJSPosition} position - TJSPosition instance.
   */
  static cancel(position) {
    for (let cntr = AnimationManager.activeList.length; --cntr >= 0; ) {
      const data = AnimationManager.activeList[cntr];
      if (data.position === position) {
        AnimationManager.activeList.splice(cntr, 1);
        data.cancelled = true;
        data.cleanup(data);
      }
    }
    for (let cntr = AnimationManager.newList.length; --cntr >= 0; ) {
      const data = AnimationManager.newList[cntr];
      if (data.position === position) {
        AnimationManager.newList.splice(cntr, 1);
        data.cancelled = true;
        data.cleanup(data);
      }
    }
  }
  /**
   * Cancels all active and delayed animations.
   */
  static cancelAll() {
    for (let cntr = AnimationManager.activeList.length; --cntr >= 0; ) {
      const data = AnimationManager.activeList[cntr];
      data.cancelled = true;
      data.cleanup(data);
    }
    for (let cntr = AnimationManager.newList.length; --cntr >= 0; ) {
      const data = AnimationManager.newList[cntr];
      data.cancelled = true;
      data.cleanup(data);
    }
    AnimationManager.activeList.length = 0;
    AnimationManager.newList.length = 0;
  }
  /**
   * Gets all {@link AnimationControl} instances for a given TJSPosition instance.
   *
   * @param {import('../index.js').TJSPosition} position - TJSPosition instance.
   *
   * @returns {import('#runtime/util/animate').TJSBasicAnimation[]} All scheduled AnimationControl instances for the
   *          given TJSPosition instance.
   */
  static getScheduled(position) {
    const results = [];
    for (let cntr = AnimationManager.activeList.length; --cntr >= 0; ) {
      const data = AnimationManager.activeList[cntr];
      if (data.position === position) {
        results.push(data.control);
      }
    }
    for (let cntr = AnimationManager.newList.length; --cntr >= 0; ) {
      const data = AnimationManager.newList[cntr];
      if (data.position === position) {
        results.push(data.control);
      }
    }
    return results;
  }
}
AnimationManager.animate();
const animateKeys = /* @__PURE__ */ new Set([
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
const transformKeys = ["rotateX", "rotateY", "rotateZ", "scale", "translateX", "translateY", "translateZ"];
Object.freeze(transformKeys);
const relativeRegex = /^([-+*])=(-?[\d]*\.?[\d]+)$/;
const numericDefaults = {
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
const transformKeysBitwise = {
  rotateX: 1,
  rotateY: 2,
  rotateZ: 4,
  scale: 8,
  translateX: 16,
  translateY: 32,
  translateZ: 64
};
Object.freeze(transformKeysBitwise);
const transformOriginDefault = "top left";
const transformOrigins = [
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
class AnimationAPI {
  /** @type {import('../').TJSPositionData} */
  #data;
  /** @type {import('../').TJSPosition} */
  #position;
  /**
   * Tracks the number of animation control instances that are active.
   *
   * @type {number}
   */
  #instanceCount = 0;
  /**
   * Provides a bound function to pass as data to AnimationManager to invoke `AnimationAPI.#cleanupInstance`.
   *
   * @type {Function}
   */
  #cleanup;
  /**
   * @param {import('../index.js').TJSPosition}       position -
   *
   * @param {import('../index.js').TJSPositionData}   data -
   */
  constructor(position, data) {
    this.#position = position;
    this.#data = data;
    this.#cleanup = this.#cleanupInstance.bind(this);
  }
  /**
   * Returns whether there are scheduled animations whether active or delayed for this TJSPosition.
   *
   * @returns {boolean} Are there active animation instances.
   */
  get isScheduled() {
    return this.#instanceCount > 0;
  }
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
   * @returns {import('#runtime/util/animate').TJSBasicAnimation} The associated animation control.
   */
  #addAnimation(initial, destination, duration, el, delay, ease, interpolate) {
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
      cleanup: this.#cleanup,
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
      position: this.#position,
      resolve: void 0,
      start: void 0
    };
    if (delay > 0) {
      animationData.active = false;
      setTimeout(() => {
        if (!animationData.cancelled) {
          animationData.active = true;
          const now2 = performance.now();
          animationData.start = now2 + (AnimationManager.current - now2);
        }
      }, delay * 1e3);
    }
    this.#instanceCount++;
    AnimationManager.add(animationData);
    return new AnimationControl(animationData, true);
  }
  /**
   * Cancels all animation instances for this TJSPosition instance.
   */
  cancel() {
    AnimationManager.cancel(this.#position);
  }
  /**
   * Cleans up an animation instance.
   *
   * @param {object}   data - Animation data for an animation instance.
   */
  #cleanupInstance(data) {
    this.#instanceCount--;
    data.active = false;
    data.finished = true;
    if (typeof data.resolve === "function") {
      data.resolve(data.cancelled);
    }
  }
  /**
   * Returns all currently scheduled AnimationControl instances for this TJSPosition instance.
   *
   * @returns {import('#runtime/util/animate').TJSBasicAnimation[]} All currently scheduled animation controls for
   *          this TJSPosition instance.
   */
  getScheduled() {
    return AnimationManager.getScheduled(this.#position);
  }
  /**
   * Provides a tween from given position data to the current position.
   *
   * @param {import('../index.js').TJSPositionDataExtended} fromData - The starting position.
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
   * @returns {import('#runtime/util/animate').TJSBasicAnimation}  A control object that can cancel animation and
   *          provides a `finished` Promise.
   */
  from(fromData, { delay = 0, duration = 1, ease = cubicOut, interpolate = lerp } = {}) {
    if (!isObject(fromData)) {
      throw new TypeError(`AnimationAPI.from error: 'fromData' is not an object.`);
    }
    const position = this.#position;
    const parent = position.parent;
    if (parent !== void 0 && typeof parent?.options?.positionable === "boolean" && !parent?.options?.positionable) {
      return AnimationControl.voidControl;
    }
    const targetEl = parent instanceof HTMLElement ? parent : parent?.elementTarget;
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
    const data = this.#data;
    for (const key in fromData) {
      if (data[key] !== void 0 && fromData[key] !== data[key]) {
        initial[key] = fromData[key];
        destination[key] = data[key];
      }
    }
    convertRelative(initial, data);
    return this.#addAnimation(initial, destination, duration, el, delay, ease, interpolate);
  }
  /**
   * Provides a tween from given position data to the current position.
   *
   * @param {import('../index.js').TJSPositionDataExtended} fromData - The starting position.
   *
   * @param {import('../index.js').TJSPositionDataExtended} toData - The ending position.
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
   * @returns {import('#runtime/util/animate').TJSBasicAnimation}  A control object that can cancel animation and
   *          provides a `finished` Promise.
   */
  fromTo(fromData, toData, { delay = 0, duration = 1, ease = cubicOut, interpolate = lerp } = {}) {
    if (!isObject(fromData)) {
      throw new TypeError(`AnimationAPI.fromTo error: 'fromData' is not an object.`);
    }
    if (!isObject(toData)) {
      throw new TypeError(`AnimationAPI.fromTo error: 'toData' is not an object.`);
    }
    const parent = this.#position.parent;
    if (parent !== void 0 && typeof parent?.options?.positionable === "boolean" && !parent?.options?.positionable) {
      return AnimationControl.voidControl;
    }
    const targetEl = parent instanceof HTMLElement ? parent : parent?.elementTarget;
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
    const data = this.#data;
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
    return this.#addAnimation(initial, destination, duration, el, delay, ease, interpolate);
  }
  /**
   * Provides a tween to given position data from the current position.
   *
   * @param {import('../index.js').TJSPositionDataExtended} toData - The destination position.
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
   * @returns {import('#runtime/util/animate').TJSBasicAnimation}  A control object that can cancel animation and
   *          provides a `finished` Promise.
   */
  to(toData, { delay = 0, duration = 1, ease = cubicOut, interpolate = lerp } = {}) {
    if (!isObject(toData)) {
      throw new TypeError(`AnimationAPI.to error: 'toData' is not an object.`);
    }
    const parent = this.#position.parent;
    if (parent !== void 0 && typeof parent?.options?.positionable === "boolean" && !parent?.options?.positionable) {
      return AnimationControl.voidControl;
    }
    const targetEl = parent instanceof HTMLElement ? parent : parent?.elementTarget;
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
    const data = this.#data;
    for (const key in toData) {
      if (data[key] !== void 0 && toData[key] !== data[key]) {
        destination[key] = toData[key];
        initial[key] = data[key];
      }
    }
    convertRelative(destination, data);
    return this.#addAnimation(initial, destination, duration, el, delay, ease, interpolate);
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
   * @returns {import('../index.js').quickToCallback} quick-to tween function.
   */
  quickTo(keys, { duration = 1, ease = cubicOut, interpolate = lerp } = {}) {
    if (!isIterable(keys)) {
      throw new TypeError(`AnimationAPI.quickTo error: 'keys' is not an iterable list.`);
    }
    const parent = this.#position.parent;
    if (parent !== void 0 && typeof parent?.options?.positionable === "boolean" && !parent?.options?.positionable) {
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
    const data = this.#data;
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
      cleanup: this.#cleanup,
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
      position: this.#position,
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
      const targetEl = parent instanceof HTMLElement ? parent : parent?.elementTarget;
      animationData.el = targetEl instanceof HTMLElement && targetEl.isConnected ? targetEl : void 0;
      if (animationData.finished) {
        animationData.finished = false;
        animationData.active = true;
        animationData.current = 0;
        this.#instanceCount++;
        AnimationManager.add(animationData);
      } else {
        const now2 = performance.now();
        animationData.start = now2 + (AnimationManager.current - now2);
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
}
class AnimationGroupControl {
  /** @type {import('./AnimationControl').AnimationControl[]} */
  #animationControls;
  /** @type {Promise<Awaited<unknown>[]>} */
  #finishedPromise;
  /**
   * Defines a static empty / void animation control.
   *
   * @type {AnimationGroupControl}
   */
  static #voidControl = new AnimationGroupControl(null);
  /**
   * Provides a static void / undefined AnimationGroupControl that is automatically resolved.
   *
   * @returns {AnimationGroupControl} Void AnimationGroupControl
   */
  static get voidControl() {
    return this.#voidControl;
  }
  /**
   * @param {import('./AnimationControl').AnimationControl[]} animationControls - An array of AnimationControl
   *        instances.
   */
  constructor(animationControls) {
    this.#animationControls = animationControls;
  }
  /**
   * Get a promise that resolves when all animations are finished.
   *
   * @returns {Promise<Awaited<unknown>[]>|Promise<void>} Finished Promise for all animations.
   */
  get finished() {
    const animationControls = this.#animationControls;
    if (animationControls === null || animationControls === void 0) {
      return Promise.resolve();
    }
    if (!(this.#finishedPromise instanceof Promise)) {
      const promises = [];
      for (let cntr = animationControls.length; --cntr >= 0; ) {
        promises.push(animationControls[cntr].finished);
      }
      this.#finishedPromise = Promise.all(promises);
    }
    return this.#finishedPromise;
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
    const animationControls = this.#animationControls;
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
    const animationControls = this.#animationControls;
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
    const animationControls = this.#animationControls;
    if (animationControls === null || animationControls === void 0) {
      return;
    }
    for (let cntr = this.#animationControls.length; --cntr >= 0; ) {
      this.#animationControls[cntr].cancel();
    }
  }
}
class AnimationGroupAPI {
  /**
   * Checks of the given object is a TJSPosition instance by checking for AnimationAPI.
   *
   * @param {*}  object - Any data.
   *
   * @returns {boolean} Is TJSPosition.
   */
  static #isPosition(object) {
    return isObject(object) && object.animate instanceof AnimationAPI;
  }
  /**
   * Cancels any animation for given TJSPosition data.
   *
   * @param {import('../').TJSPosition | {position: import('../').TJSPosition} | Iterable<import('../').TJSPosition> | Iterable<{position: import('../').TJSPosition}>} position -
   */
  static cancel(position) {
    if (isIterable(position)) {
      let index = -1;
      for (const entry of position) {
        index++;
        const actualPosition = this.#isPosition(entry) ? entry : entry.position;
        if (!this.#isPosition(actualPosition)) {
          console.warn(`AnimationGroupAPI.cancel warning: No Position instance found at index: ${index}.`);
          continue;
        }
        AnimationManager.cancel(actualPosition);
      }
    } else {
      const actualPosition = this.#isPosition(position) ? position : position.position;
      if (!this.#isPosition(actualPosition)) {
        console.warn(`AnimationGroupAPI.cancel warning: No Position instance found.`);
        return;
      }
      AnimationManager.cancel(actualPosition);
    }
  }
  /**
   * Cancels all TJSPosition animation.
   */
  static cancelAll() {
    AnimationManager.cancelAll();
  }
  /**
   * Gets all animation controls for the given position data.
   *
   * @param {import('../').TJSPosition | {position: import('../').TJSPosition} | Iterable<import('../').TJSPosition> | Iterable<{position: import('../').TJSPosition}>} position -
   *
   * @returns {{ position: import('../').TJSPosition, data: object | void, controls: import('./AnimationControl').AnimationControl[]}[]} Results array.
   */
  static getScheduled(position) {
    const results = [];
    if (isIterable(position)) {
      let index = -1;
      for (const entry of position) {
        index++;
        const isPosition = this.#isPosition(entry);
        const actualPosition = isPosition ? entry : entry.position;
        if (!this.#isPosition(actualPosition)) {
          console.warn(`AnimationGroupAPI.getScheduled warning: No Position instance found at index: ${index}.`);
          continue;
        }
        const controls = AnimationManager.getScheduled(actualPosition);
        results.push({ position: actualPosition, data: isPosition ? void 0 : entry, controls });
      }
    } else {
      const isPosition = this.#isPosition(position);
      const actualPosition = isPosition ? position : position.position;
      if (!this.#isPosition(actualPosition)) {
        console.warn(`AnimationGroupAPI.getScheduled warning: No Position instance found.`);
        return results;
      }
      const controls = AnimationManager.getScheduled(actualPosition);
      results.push({ position: actualPosition, data: isPosition ? void 0 : position, controls });
    }
    return results;
  }
  /**
   * Provides the `from` animation tween for one or more TJSPosition instances as a group.
   *
   * @param {import('../').TJSPosition | {position: import('../').TJSPosition} | Iterable<import('../').TJSPosition> | Iterable<{position: import('../').TJSPosition}>} position -
   *
   * @param {object|Function}   fromData -
   *
   * @param {object|Function}   options -
   *
   * @returns {import('#runtime/util/animate').TJSBasicAnimation} Basic animation control.
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
        const isPosition = this.#isPosition(entry);
        const actualPosition = isPosition ? entry : entry.position;
        if (!this.#isPosition(actualPosition)) {
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
          if (!isObject(actualFromData)) {
            throw new TypeError(`AnimationGroupAPI.from error: fromData callback function iteration(${index}) failed to return an object.`);
          }
        }
        if (hasOptionCallback) {
          actualOptions = options(callbackOptions);
          if (actualOptions === null || actualOptions === void 0) {
            continue;
          }
          if (!isObject(actualOptions)) {
            throw new TypeError(`AnimationGroupAPI.from error: options callback function iteration(${index}) failed to return an object.`);
          }
        }
        animationControls.push(actualPosition.animate.from(actualFromData, actualOptions));
      }
    } else {
      const isPosition = this.#isPosition(position);
      const actualPosition = isPosition ? position : position.position;
      if (!this.#isPosition(actualPosition)) {
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
        if (!isObject(actualFromData)) {
          throw new TypeError(
            `AnimationGroupAPI.from error: fromData callback function failed to return an object.`
          );
        }
      }
      if (hasOptionCallback) {
        actualOptions = options(callbackOptions);
        if (!isObject(actualOptions)) {
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
   * Provides the `fromTo` animation tween for one or more TJSPosition instances as a group.
   *
   * @param {import('../').TJSPosition | {position: import('../').TJSPosition} | Iterable<import('../').TJSPosition> | Iterable<{position: import('../').TJSPosition}>} position -
   *
   * @param {object|Function}   fromData -
   *
   * @param {object|Function}   toData -
   *
   * @param {object|Function}   options -
   *
   * @returns {import('#runtime/util/animate').TJSBasicAnimation} Basic animation control.
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
        const isPosition = this.#isPosition(entry);
        const actualPosition = isPosition ? entry : entry.position;
        if (!this.#isPosition(actualPosition)) {
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
          if (!isObject(actualFromData)) {
            throw new TypeError(`AnimationGroupAPI.fromTo error: fromData callback function iteration(${index}) failed to return an object.`);
          }
        }
        if (hasToCallback) {
          actualToData = toData(callbackOptions);
          if (actualToData === null || actualToData === void 0) {
            continue;
          }
          if (!isObject(actualToData)) {
            throw new TypeError(`AnimationGroupAPI.fromTo error: toData callback function iteration(${index}) failed to return an object.`);
          }
        }
        if (hasOptionCallback) {
          actualOptions = options(callbackOptions);
          if (actualOptions === null || actualOptions === void 0) {
            continue;
          }
          if (!isObject(actualOptions)) {
            throw new TypeError(`AnimationGroupAPI.fromTo error: options callback function iteration(${index}) failed to return an object.`);
          }
        }
        animationControls.push(actualPosition.animate.fromTo(actualFromData, actualToData, actualOptions));
      }
    } else {
      const isPosition = this.#isPosition(position);
      const actualPosition = isPosition ? position : position.position;
      if (!this.#isPosition(actualPosition)) {
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
        if (!isObject(actualFromData)) {
          throw new TypeError(
            `AnimationGroupAPI.fromTo error: fromData callback function failed to return an object.`
          );
        }
      }
      if (hasToCallback) {
        actualToData = toData(callbackOptions);
        if (!isObject(actualToData)) {
          throw new TypeError(
            `AnimationGroupAPI.fromTo error: toData callback function failed to return an object.`
          );
        }
      }
      if (hasOptionCallback) {
        actualOptions = options(callbackOptions);
        if (!isObject(actualOptions)) {
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
   * Provides the `to` animation tween for one or more TJSPosition instances as a group.
   *
   * @param {import('../').TJSPosition | {position: import('../').TJSPosition} | Iterable<import('../').TJSPosition> | Iterable<{position: import('../').TJSPosition}>} position -
   *
   * @param {object|Function}   toData -
   *
   * @param {object|Function}   options -
   *
   * @returns {import('#runtime/util/animate').TJSBasicAnimation} Basic animation control.
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
        const isPosition = this.#isPosition(entry);
        const actualPosition = isPosition ? entry : entry.position;
        if (!this.#isPosition(actualPosition)) {
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
          if (!isObject(actualToData)) {
            throw new TypeError(`AnimationGroupAPI.to error: toData callback function iteration(${index}) failed to return an object.`);
          }
        }
        if (hasOptionCallback) {
          actualOptions = options(callbackOptions);
          if (actualOptions === null || actualOptions === void 0) {
            continue;
          }
          if (!isObject(actualOptions)) {
            throw new TypeError(`AnimationGroupAPI.to error: options callback function iteration(${index}) failed to return an object.`);
          }
        }
        animationControls.push(actualPosition.animate.to(actualToData, actualOptions));
      }
    } else {
      const isPosition = this.#isPosition(position);
      const actualPosition = isPosition ? position : position.position;
      if (!this.#isPosition(actualPosition)) {
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
        if (!isObject(actualToData)) {
          throw new TypeError(
            `AnimationGroupAPI.to error: toData callback function failed to return an object.`
          );
        }
      }
      if (hasOptionCallback) {
        actualOptions = options(callbackOptions);
        if (!isObject(actualOptions)) {
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
   * Provides the `to` animation tween for one or more TJSPosition instances as a group.
   *
   * @param {import('../').TJSPosition | {position: import('../').TJSPosition} | Iterable<import('../').TJSPosition> | Iterable<{position: import('../').TJSPosition}>} position -
   *
   * @param {Iterable<string>}  keys -
   *
   * @param {object|Function}   options -
   *
   * @returns {import('../').quickToCallback} Basic animation control.
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
        const isPosition = this.#isPosition(entry);
        const actualPosition = isPosition ? entry : entry.position;
        if (!this.#isPosition(actualPosition)) {
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
          if (!isObject(actualOptions)) {
            throw new TypeError(`AnimationGroupAPI.quickTo error: options callback function iteration(${index}) failed to return an object.`);
          }
        }
        quickToCallbacks.push(actualPosition.animate.quickTo(keys, actualOptions));
      }
    } else {
      const isPosition = this.#isPosition(position);
      const actualPosition = isPosition ? position : position.position;
      if (!this.#isPosition(actualPosition)) {
        console.warn(`AnimationGroupAPI.quickTo warning: No Position instance found.`);
        return () => null;
      }
      callbackOptions.index = 0;
      callbackOptions.position = position;
      callbackOptions.data = isPosition ? void 0 : position;
      if (hasOptionCallback) {
        actualOptions = options(callbackOptions);
        if (!isObject(actualOptions)) {
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
            const isPosition = this.#isPosition(entry);
            const actualPosition = isPosition ? entry : entry.position;
            if (!this.#isPosition(actualPosition)) {
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
            if (!Number.isFinite(toData) && !toDataIterable && !isObject(toData)) {
              throw new TypeError(`AnimationGroupAPI.quickTo error: toData callback function iteration(${index}) failed to return a finite number, iterable list, or object.`);
            }
            if (toDataIterable) {
              quickToCallbacks[cntr++](...toData);
            } else {
              quickToCallbacks[cntr++](toData);
            }
          }
        } else {
          const isPosition = this.#isPosition(position);
          const actualPosition = isPosition ? position : position.position;
          if (!this.#isPosition(actualPosition)) {
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
          if (!Number.isFinite(toData) && !toDataIterable && !isObject(toData)) {
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
            const isPosition = this.#isPosition(entry);
            const actualPosition = isPosition ? entry : entry.position;
            if (!this.#isPosition(actualPosition)) {
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
            if (!isObject(actualOptions)) {
              throw new TypeError(
                `AnimationGroupAPI.quickTo.options error: options callback function iteration(${index}) failed to return an object.`
              );
            }
            quickToCallbacks[cntr++].options(actualOptions);
          }
        } else {
          const isPosition = this.#isPosition(position);
          const actualPosition = isPosition ? position : position.position;
          if (!this.#isPosition(actualPosition)) {
            console.warn(`AnimationGroupAPI.quickTo.options warning: No Position instance found.`);
            return quickToCB;
          }
          callbackOptions.index = 0;
          callbackOptions.position = position;
          callbackOptions.data = isPosition ? void 0 : position;
          actualOptions = options2(callbackOptions);
          if (!isObject(actualOptions)) {
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
}
class Centered {
  /**
   * @type {HTMLElement}
   */
  #element;
  /**
   * Provides a manual setting of the element height. As things go `offsetHeight` causes a browser layout and is not
   * performance oriented. If manually set this height is used instead of `offsetHeight`.
   *
   * @type {number}
   */
  #height;
  /**
   * Set from an optional value in the constructor to lock accessors preventing modification.
   */
  #lock;
  /**
   * Provides a manual setting of the element width. As things go `offsetWidth` causes a browser layout and is not
   * performance oriented. If manually set this width is used instead of `offsetWidth`.
   *
   * @type {number}
   */
  #width;
  /**
   * @param {object}      [options] - Initial options.
   *
   * @param {HTMLElement} [options.element] - Target element.
   *
   * @param {boolean}     [options.lock=false] - Lock parameters from being set.
   *
   * @param {number}      [options.width] - Manual width.
   *
   * @param {number}      [options.height] - Manual height.
   */
  constructor({ element: element2, lock = false, width, height } = {}) {
    this.element = element2;
    this.width = width;
    this.height = height;
    this.#lock = typeof lock === "boolean" ? lock : false;
  }
  /**
   * @returns {HTMLElement|undefined|null} Target element.
   */
  get element() {
    return this.#element;
  }
  /**
   * @returns {number} Get manual height.
   */
  get height() {
    return this.#height;
  }
  /**
   * @returns {number} Get manual width.
   */
  get width() {
    return this.#width;
  }
  /**
   * @param {HTMLElement|undefined|null} element - Set target element.
   */
  set element(element2) {
    if (this.#lock) {
      return;
    }
    if (element2 === void 0 || element2 === null || element2 instanceof HTMLElement) {
      this.#element = element2;
    } else {
      throw new TypeError(`'element' is not a HTMLElement, undefined, or null.`);
    }
  }
  /**
   * @param {number}   height - Set manual height.
   */
  set height(height) {
    if (this.#lock) {
      return;
    }
    if (height === void 0 || Number.isFinite(height)) {
      this.#height = height;
    } else {
      throw new TypeError(`'height' is not a finite number or undefined.`);
    }
  }
  /**
   * @param {number}   width - Set manual width.
   */
  set width(width) {
    if (this.#lock) {
      return;
    }
    if (width === void 0 || Number.isFinite(width)) {
      this.#width = width;
    } else {
      throw new TypeError(`'width' is not a finite number or undefined.`);
    }
  }
  /**
   * Set manual width & height.
   *
   * @param {number}   width - New manual width.
   *
   * @param {number}   height - New manual height.
   */
  setDimension(width, height) {
    if (this.#lock) {
      return;
    }
    if (width === void 0 || Number.isFinite(width)) {
      this.#width = width;
    } else {
      throw new TypeError(`'width' is not a finite number or undefined.`);
    }
    if (height === void 0 || Number.isFinite(height)) {
      this.#height = height;
    } else {
      throw new TypeError(`'height' is not a finite number or undefined.`);
    }
  }
  /**
   * Get the left constraint based on any manual target values or the browser inner width.
   *
   * @param {number}   width - Target width.
   *
   * @returns {number} Calculated left constraint.
   */
  getLeft(width) {
    const boundsWidth = this.#width ?? this.#element?.offsetWidth ?? globalThis.innerWidth;
    return (boundsWidth - width) / 2;
  }
  /**
   * Get the top constraint based on any manual target values or the browser inner height.
   *
   * @param {number}   height - Target height.
   *
   * @returns {number} Calculated top constraint.
   */
  getTop(height) {
    const boundsHeight = this.#height ?? this.#element?.offsetHeight ?? globalThis.innerHeight;
    return (boundsHeight - height) / 2;
  }
}
class PositionChangeSet {
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
}
class TJSPositionData {
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
   * @param {TJSPositionData}   data - Copy from this instance.
   *
   * @returns {TJSPositionData} This instance.
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
}
class PositionStateAPI {
  /** @type {import('./TJSPositionData').TJSPositionData} */
  #data;
  /**
   * @type {Map<string, import('./').TJSPositionDataExtended>}
   */
  #dataSaved = /* @__PURE__ */ new Map();
  /** @type {import('./').TJSPosition} */
  #position;
  /** @type {import('./transform').TJSTransforms} */
  #transforms;
  constructor(position, data, transforms) {
    this.#position = position;
    this.#data = data;
    this.#transforms = transforms;
  }
  /**
   * Returns any stored save state by name.
   *
   * @param {object}   options - Options
   *
   * @param {string}   options.name - Saved data set name.
   *
   * @returns {import('./').TJSPositionDataExtended} The saved data set.
   */
  get({ name }) {
    if (typeof name !== "string") {
      throw new TypeError(`Position - getSave error: 'name' is not a string.`);
    }
    return this.#dataSaved.get(name);
  }
  /**
   * Returns any associated default data.
   *
   * @returns {import('./').TJSPositionDataExtended} Associated default data.
   */
  getDefault() {
    return this.#dataSaved.get("#defaultData");
  }
  /**
   * Removes and returns any position state by name.
   *
   * @param {object}   options - Options.
   *
   * @param {string}   options.name - Name to remove and retrieve.
   *
   * @returns {import('./').TJSPositionDataExtended} Saved position data.
   */
  remove({ name }) {
    if (typeof name !== "string") {
      throw new TypeError(`Position - remove: 'name' is not a string.`);
    }
    const data = this.#dataSaved.get(name);
    this.#dataSaved.delete(name);
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
    const defaultData = this.#dataSaved.get("#defaultData");
    if (!isObject(defaultData)) {
      return false;
    }
    if (this.#position.animate.isScheduled) {
      this.#position.animate.cancel();
    }
    const zIndex = this.#position.zIndex;
    const data = Object.assign({}, defaultData);
    if (keepZIndex) {
      data.zIndex = zIndex;
    }
    this.#transforms.reset(data);
    if (this.#position.parent?.reactive?.minimized) {
      this.#position.parent?.maximize?.({ animate: false, duration: 0 });
    }
    if (invokeSet) {
      setTimeout(() => this.#position.set(data), 0);
    }
    return true;
  }
  /**
      * Restores a saved positional state returning the data. Several optional parameters are available
      * to control whether the restore action occurs silently (no store / inline styles updates), animates
  -   * to the stored data, or simply sets the stored data. Restoring via {@link AnimationAPI.to}
      * allows specification of the duration, easing, and interpolate functions along with configuring a Promise to be
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
      * @returns {import('./').TJSPositionDataExtended | Promise<import('./').TJSPositionDataExtended>} Saved position
      *          data.
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
    interpolate = lerp
  }) {
    if (typeof name !== "string") {
      throw new TypeError(`Position - restore error: 'name' is not a string.`);
    }
    const dataSaved = this.#dataSaved.get(name);
    if (dataSaved) {
      if (remove) {
        this.#dataSaved.delete(name);
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
          this.#data[property] = data[property];
        }
        return dataSaved;
      } else if (animateTo) {
        if (data.transformOrigin !== this.#position.transformOrigin) {
          this.#position.transformOrigin = data.transformOrigin;
        }
        if (async) {
          return this.#position.animate.to(data, { duration, ease, interpolate }).finished.then(() => dataSaved);
        } else {
          this.#position.animate.to(data, { duration, ease, interpolate });
        }
      } else {
        this.#position.set(data);
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
   * @returns {import('./').TJSPositionData} Current position data
   */
  save({ name, ...extra }) {
    if (typeof name !== "string") {
      throw new TypeError(`Position - save error: 'name' is not a string.`);
    }
    const data = this.#position.get(extra);
    this.#dataSaved.set(name, data);
    return data;
  }
  /**
   * Directly sets a position state.
   *
   * @param {object}   opts - Options.
   *
   * @param {string}   opts.name - name to index this saved data.
   *
   * @param {...*}     [opts.data] - TJSPosition data to set.
   */
  set({ name, ...data }) {
    if (typeof name !== "string") {
      throw new TypeError(`Position - set error: 'name' is not a string.`);
    }
    this.#dataSaved.set(name, data);
  }
}
class StyleCache {
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
    this.marginLeft = StyleParse.pixels(el.style.marginLeft) ?? StyleParse.pixels(this.computed.marginLeft);
    this.marginTop = StyleParse.pixels(el.style.marginTop) ?? StyleParse.pixels(this.computed.marginTop);
    this.maxHeight = StyleParse.pixels(el.style.maxHeight) ?? StyleParse.pixels(this.computed.maxHeight);
    this.maxWidth = StyleParse.pixels(el.style.maxWidth) ?? StyleParse.pixels(this.computed.maxWidth);
    this.minHeight = StyleParse.pixels(el.style.minHeight) ?? StyleParse.pixels(this.computed.minHeight);
    this.minWidth = StyleParse.pixels(el.style.minWidth) ?? StyleParse.pixels(this.computed.minWidth);
    const willChange = el.style.willChange !== "" ? el.style.willChange : this.computed.willChange;
    this.hasWillChange = willChange !== "" && willChange !== "auto";
    this.stores.element.set(el);
  }
}
class TJSTransformData {
  constructor() {
    Object.seal(this);
  }
  /**
   * Stores the calculated bounding rectangle.
   *
   * @type {DOMRect}
   */
  #boundingRect = new DOMRect();
  /**
   * Stores the individual transformed corner points of the window in screen space clockwise from:
   * top left -> top right -> bottom right -> bottom left.
   *
   * @type {import('#runtime/math/gl-matrix').Vec3[]}
   */
  #corners = [Vec3.create(), Vec3.create(), Vec3.create(), Vec3.create()];
  /**
   * Stores the current gl-matrix Mat4 data.
   *
   * @type {import('#runtime/math/gl-matrix').Mat4}
   */
  #mat4 = Mat4.create();
  /**
   * Stores the pre & post origin translations to apply to matrix transforms.
   *
   * @type {import('#runtime/math/gl-matrix').Mat4[]}
   */
  #originTranslations = [Mat4.create(), Mat4.create()];
  /**
   * @returns {DOMRect} The bounding rectangle.
   */
  get boundingRect() {
    return this.#boundingRect;
  }
  /**
   * @returns {import('#runtime/math/gl-matrix').Vec3[]} The transformed corner points as Vec3 in screen space.
   */
  get corners() {
    return this.#corners;
  }
  /**
   * @returns {string} Returns the CSS style string for the transform matrix.
   */
  get css() {
    return `matrix3d(${this.mat4.join(",")})`;
  }
  /**
   * @returns {import('#runtime/math/gl-matrix').Mat4} The transform matrix.
   */
  get mat4() {
    return this.#mat4;
  }
  /**
   * @returns {import('#runtime/math/gl-matrix').Mat4[]} The pre / post translation matrices for origin translation.
   */
  get originTranslations() {
    return this.#originTranslations;
  }
}
const s_SCALE_VECTOR = [1, 1, 1];
const s_TRANSLATE_VECTOR = [0, 0, 0];
const s_MAT4_RESULT = Mat4.create();
const s_MAT4_TEMP = Mat4.create();
const s_VEC3_TEMP = Vec3.create();
class TJSTransforms {
  /**
   * Stores the transform keys in the order added.
   *
   * @type {string[]}
   */
  #orderList = [];
  constructor() {
    this._data = {};
  }
  /**
   * @returns {boolean} Whether there are active transforms in local data.
   */
  get isActive() {
    return this.#orderList.length > 0;
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
        this.#orderList.push("rotateX");
      }
      this._data.rotateX = value;
    } else {
      if (this._data.rotateX !== void 0) {
        const index = this.#orderList.findIndex((entry) => entry === "rotateX");
        if (index >= 0) {
          this.#orderList.splice(index, 1);
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
        this.#orderList.push("rotateY");
      }
      this._data.rotateY = value;
    } else {
      if (this._data.rotateY !== void 0) {
        const index = this.#orderList.findIndex((entry) => entry === "rotateY");
        if (index >= 0) {
          this.#orderList.splice(index, 1);
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
        this.#orderList.push("rotateZ");
      }
      this._data.rotateZ = value;
    } else {
      if (this._data.rotateZ !== void 0) {
        const index = this.#orderList.findIndex((entry) => entry === "rotateZ");
        if (index >= 0) {
          this.#orderList.splice(index, 1);
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
        this.#orderList.push("scale");
      }
      this._data.scale = value;
    } else {
      if (this._data.scale !== void 0) {
        const index = this.#orderList.findIndex((entry) => entry === "scale");
        if (index >= 0) {
          this.#orderList.splice(index, 1);
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
        this.#orderList.push("translateX");
      }
      this._data.translateX = value;
    } else {
      if (this._data.translateX !== void 0) {
        const index = this.#orderList.findIndex((entry) => entry === "translateX");
        if (index >= 0) {
          this.#orderList.splice(index, 1);
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
        this.#orderList.push("translateY");
      }
      this._data.translateY = value;
    } else {
      if (this._data.translateY !== void 0) {
        const index = this.#orderList.findIndex((entry) => entry === "translateY");
        if (index >= 0) {
          this.#orderList.splice(index, 1);
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
        this.#orderList.push("translateZ");
      }
      this._data.translateZ = value;
    } else {
      if (this._data.translateZ !== void 0) {
        const index = this.#orderList.findIndex((entry) => entry === "translateZ");
        if (index >= 0) {
          this.#orderList.splice(index, 1);
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
   * Collects all data including a bounding rect, transform matrix, and points array of the given
   * {@link TJSPositionData} instance with the applied local transform data.
   *
   * @param {import('../').TJSPositionData} position - The position data to process.
   *
   * @param {TJSTransformData} [output] - Optional TJSTransformData output instance.
   *
   * @param {object} [validationData] - Optional validation data for adjustment parameters.
   *
   * @returns {TJSTransformData} The output TJSTransformData instance.
   */
  getData(position, output = new TJSTransformData(), validationData = {}) {
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
        Vec3.transformMat4(rect[0], rect[0], matrix);
        Vec3.transformMat4(rect[1], rect[1], matrix);
        Vec3.transformMat4(rect[2], rect[2], matrix);
        Vec3.transformMat4(rect[3], rect[3], matrix);
      } else {
        Vec3.transformMat4(rect[0], rect[0], translate[0]);
        Vec3.transformMat4(rect[0], rect[0], matrix);
        Vec3.transformMat4(rect[0], rect[0], translate[1]);
        Vec3.transformMat4(rect[1], rect[1], translate[0]);
        Vec3.transformMat4(rect[1], rect[1], matrix);
        Vec3.transformMat4(rect[1], rect[1], translate[1]);
        Vec3.transformMat4(rect[2], rect[2], translate[0]);
        Vec3.transformMat4(rect[2], rect[2], matrix);
        Vec3.transformMat4(rect[2], rect[2], translate[1]);
        Vec3.transformMat4(rect[3], rect[3], translate[0]);
        Vec3.transformMat4(rect[3], rect[3], matrix);
        Vec3.transformMat4(rect[3], rect[3], translate[1]);
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
      Mat4.identity(output.mat4);
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
   * @param {object}   [data] - TJSPositionData instance or local transform data.
   *
   * @param {import('#runtime/math/gl-matrix').Mat4}  [output] - The output mat4 instance.
   *
   * @returns {import('#runtime/math/gl-matrix').Mat4} Transform matrix.
   */
  getMat4(data = this._data, output = Mat4.create()) {
    const matrix = Mat4.identity(output);
    let seenKeys = 0;
    const orderList = this.#orderList;
    for (let cntr = 0; cntr < orderList.length; cntr++) {
      const key = orderList[cntr];
      switch (key) {
        case "rotateX":
          seenKeys |= transformKeysBitwise.rotateX;
          Mat4.multiply(matrix, matrix, Mat4.fromXRotation(s_MAT4_TEMP, degToRad(data[key])));
          break;
        case "rotateY":
          seenKeys |= transformKeysBitwise.rotateY;
          Mat4.multiply(matrix, matrix, Mat4.fromYRotation(s_MAT4_TEMP, degToRad(data[key])));
          break;
        case "rotateZ":
          seenKeys |= transformKeysBitwise.rotateZ;
          Mat4.multiply(matrix, matrix, Mat4.fromZRotation(s_MAT4_TEMP, degToRad(data[key])));
          break;
        case "scale":
          seenKeys |= transformKeysBitwise.scale;
          s_SCALE_VECTOR[0] = s_SCALE_VECTOR[1] = data[key];
          Mat4.multiply(matrix, matrix, Mat4.fromScaling(s_MAT4_TEMP, s_SCALE_VECTOR));
          break;
        case "translateX":
          seenKeys |= transformKeysBitwise.translateX;
          s_TRANSLATE_VECTOR[0] = data.translateX;
          s_TRANSLATE_VECTOR[1] = 0;
          s_TRANSLATE_VECTOR[2] = 0;
          Mat4.multiply(matrix, matrix, Mat4.fromTranslation(s_MAT4_TEMP, s_TRANSLATE_VECTOR));
          break;
        case "translateY":
          seenKeys |= transformKeysBitwise.translateY;
          s_TRANSLATE_VECTOR[0] = 0;
          s_TRANSLATE_VECTOR[1] = data.translateY;
          s_TRANSLATE_VECTOR[2] = 0;
          Mat4.multiply(matrix, matrix, Mat4.fromTranslation(s_MAT4_TEMP, s_TRANSLATE_VECTOR));
          break;
        case "translateZ":
          seenKeys |= transformKeysBitwise.translateZ;
          s_TRANSLATE_VECTOR[0] = 0;
          s_TRANSLATE_VECTOR[1] = 0;
          s_TRANSLATE_VECTOR[2] = data.translateZ;
          Mat4.multiply(matrix, matrix, Mat4.fromTranslation(s_MAT4_TEMP, s_TRANSLATE_VECTOR));
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
            Mat4.multiply(matrix, matrix, Mat4.fromXRotation(s_MAT4_TEMP, degToRad(data[key])));
            break;
          case "rotateY":
            Mat4.multiply(matrix, matrix, Mat4.fromYRotation(s_MAT4_TEMP, degToRad(data[key])));
            break;
          case "rotateZ":
            Mat4.multiply(matrix, matrix, Mat4.fromZRotation(s_MAT4_TEMP, degToRad(data[key])));
            break;
          case "scale":
            s_SCALE_VECTOR[0] = s_SCALE_VECTOR[1] = data[key];
            Mat4.multiply(matrix, matrix, Mat4.fromScaling(s_MAT4_TEMP, s_SCALE_VECTOR));
            break;
          case "translateX":
            s_TRANSLATE_VECTOR[0] = data[key];
            s_TRANSLATE_VECTOR[1] = 0;
            s_TRANSLATE_VECTOR[2] = 0;
            Mat4.multiply(matrix, matrix, Mat4.fromTranslation(s_MAT4_TEMP, s_TRANSLATE_VECTOR));
            break;
          case "translateY":
            s_TRANSLATE_VECTOR[0] = 0;
            s_TRANSLATE_VECTOR[1] = data[key];
            s_TRANSLATE_VECTOR[2] = 0;
            Mat4.multiply(matrix, matrix, Mat4.fromTranslation(s_MAT4_TEMP, s_TRANSLATE_VECTOR));
            break;
          case "translateZ":
            s_TRANSLATE_VECTOR[0] = 0;
            s_TRANSLATE_VECTOR[1] = 0;
            s_TRANSLATE_VECTOR[2] = data[key];
            Mat4.multiply(matrix, matrix, Mat4.fromTranslation(s_MAT4_TEMP, s_TRANSLATE_VECTOR));
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
   * @param {object}   [data] - TJSPositionData instance or local transform data.
   *
   * @param {import('#runtime/math/gl-matrix').Mat4}  [output] - The output mat4 instance.
   *
   * @returns {import('#runtime/math/gl-matrix').Mat4} Transform matrix.
   */
  getMat4Ortho(data = this._data, output = Mat4.create()) {
    const matrix = Mat4.identity(output);
    s_TRANSLATE_VECTOR[0] = (data.left ?? 0) + (data.translateX ?? 0);
    s_TRANSLATE_VECTOR[1] = (data.top ?? 0) + (data.translateY ?? 0);
    s_TRANSLATE_VECTOR[2] = data.translateZ ?? 0;
    Mat4.multiply(matrix, matrix, Mat4.fromTranslation(s_MAT4_TEMP, s_TRANSLATE_VECTOR));
    if (data.scale !== null) {
      s_SCALE_VECTOR[0] = s_SCALE_VECTOR[1] = data.scale;
      Mat4.multiply(matrix, matrix, Mat4.fromScaling(s_MAT4_TEMP, s_SCALE_VECTOR));
    }
    if (data.rotateX === null && data.rotateY === null && data.rotateZ === null) {
      return matrix;
    }
    let seenKeys = 0;
    const orderList = this.#orderList;
    for (let cntr = 0; cntr < orderList.length; cntr++) {
      const key = orderList[cntr];
      switch (key) {
        case "rotateX":
          seenKeys |= transformKeysBitwise.rotateX;
          Mat4.multiply(matrix, matrix, Mat4.fromXRotation(s_MAT4_TEMP, degToRad(data[key])));
          break;
        case "rotateY":
          seenKeys |= transformKeysBitwise.rotateY;
          Mat4.multiply(matrix, matrix, Mat4.fromYRotation(s_MAT4_TEMP, degToRad(data[key])));
          break;
        case "rotateZ":
          seenKeys |= transformKeysBitwise.rotateZ;
          Mat4.multiply(matrix, matrix, Mat4.fromZRotation(s_MAT4_TEMP, degToRad(data[key])));
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
            Mat4.multiply(matrix, matrix, Mat4.fromXRotation(s_MAT4_TEMP, degToRad(data[key])));
            break;
          case "rotateY":
            Mat4.multiply(matrix, matrix, Mat4.fromYRotation(s_MAT4_TEMP, degToRad(data[key])));
            break;
          case "rotateZ":
            Mat4.multiply(matrix, matrix, Mat4.fromZRotation(s_MAT4_TEMP, degToRad(data[key])));
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
   * @returns {boolean} Whether the given TJSPositionData has transforms.
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
          const index = this.#orderList.findIndex((entry) => entry === key);
          if (index >= 0) {
            this.#orderList.splice(index, 1);
          }
          delete this._data[key];
        }
      }
    }
  }
}
function s_GET_ORIGIN_TRANSLATION(transformOrigin, width, height, output) {
  const vector = s_VEC3_TEMP;
  switch (transformOrigin) {
    case "top left":
      vector[0] = vector[1] = 0;
      Mat4.fromTranslation(output[0], vector);
      Mat4.fromTranslation(output[1], vector);
      break;
    case "top center":
      vector[0] = -width * 0.5;
      vector[1] = 0;
      Mat4.fromTranslation(output[0], vector);
      vector[0] = width * 0.5;
      Mat4.fromTranslation(output[1], vector);
      break;
    case "top right":
      vector[0] = -width;
      vector[1] = 0;
      Mat4.fromTranslation(output[0], vector);
      vector[0] = width;
      Mat4.fromTranslation(output[1], vector);
      break;
    case "center left":
      vector[0] = 0;
      vector[1] = -height * 0.5;
      Mat4.fromTranslation(output[0], vector);
      vector[1] = height * 0.5;
      Mat4.fromTranslation(output[1], vector);
      break;
    case null:
    case "center":
      vector[0] = -width * 0.5;
      vector[1] = -height * 0.5;
      Mat4.fromTranslation(output[0], vector);
      vector[0] = width * 0.5;
      vector[1] = height * 0.5;
      Mat4.fromTranslation(output[1], vector);
      break;
    case "center right":
      vector[0] = -width;
      vector[1] = -height * 0.5;
      Mat4.fromTranslation(output[0], vector);
      vector[0] = width;
      vector[1] = height * 0.5;
      Mat4.fromTranslation(output[1], vector);
      break;
    case "bottom left":
      vector[0] = 0;
      vector[1] = -height;
      Mat4.fromTranslation(output[0], vector);
      vector[1] = height;
      Mat4.fromTranslation(output[1], vector);
      break;
    case "bottom center":
      vector[0] = -width * 0.5;
      vector[1] = -height;
      Mat4.fromTranslation(output[0], vector);
      vector[0] = width * 0.5;
      vector[1] = height;
      Mat4.fromTranslation(output[1], vector);
      break;
    case "bottom right":
      vector[0] = -width;
      vector[1] = -height;
      Mat4.fromTranslation(output[0], vector);
      vector[0] = width;
      vector[1] = height;
      Mat4.fromTranslation(output[1], vector);
      break;
    default:
      Mat4.identity(output[0]);
      Mat4.identity(output[1]);
      break;
  }
  return output;
}
class AdapterValidators {
  /** @type {boolean} */
  #enabled = true;
  /**
   * @type {import('../').ValidatorData[]}
   */
  #validatorData;
  #mapUnsubscribe = /* @__PURE__ */ new Map();
  /**
   * @returns {[AdapterValidators, import('../').ValidatorData[]]} Returns this and internal storage for validator
   *          adapter.
   */
  constructor() {
    this.#validatorData = [];
    Object.seal(this);
    return [this, this.#validatorData];
  }
  /**
   * @returns {boolean} Returns the enabled state.s
   */
  get enabled() {
    return this.#enabled;
  }
  /**
   * @returns {number} Returns the length of the validators array.
   */
  get length() {
    return this.#validatorData.length;
  }
  /**
   * @param {boolean}  enabled - Sets enabled state.
   */
  set enabled(enabled) {
    if (typeof enabled !== "boolean") {
      throw new TypeError(`'enabled' is not a boolean.`);
    }
    this.#enabled = enabled;
  }
  /**
   * Provides an iterator for validators.
   *
   * @yields {import('../').ValidatorData}
   */
  *[Symbol.iterator]() {
    if (this.#validatorData.length === 0) {
      return;
    }
    for (const entry of this.#validatorData) {
      yield { ...entry };
    }
  }
  /**
   * @param {...(import('../').ValidatorFn | import('../').ValidatorData)}   validators -
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
      const index = this.#validatorData.findIndex((value) => {
        return data.weight < value.weight;
      });
      if (index >= 0) {
        this.#validatorData.splice(index, 0, data);
      } else {
        this.#validatorData.push(data);
      }
      if (typeof subscribeFn === "function") {
        const unsubscribe = subscribeFn();
        if (typeof unsubscribe !== "function") {
          throw new TypeError(
            "AdapterValidator error: Filter has subscribe function, but no unsubscribe function is returned."
          );
        }
        if (this.#mapUnsubscribe.has(data.validator)) {
          throw new Error(
            "AdapterValidator error: Filter added already has an unsubscribe function registered."
          );
        }
        this.#mapUnsubscribe.set(data.validator, unsubscribe);
      }
    }
  }
  clear() {
    this.#validatorData.length = 0;
    for (const unsubscribe of this.#mapUnsubscribe.values()) {
      unsubscribe();
    }
    this.#mapUnsubscribe.clear();
  }
  /**
   * @param {...(import('../').ValidatorFn | import('../').ValidatorData)}   validators -
   */
  remove(...validators) {
    const length = this.#validatorData.length;
    if (length === 0) {
      return;
    }
    for (const data of validators) {
      const actualValidator = typeof data === "function" ? data : isObject(data) ? data.validator : void 0;
      if (!actualValidator) {
        continue;
      }
      for (let cntr = this.#validatorData.length; --cntr >= 0; ) {
        if (this.#validatorData[cntr].validator === actualValidator) {
          this.#validatorData.splice(cntr, 1);
          let unsubscribe = void 0;
          if (typeof (unsubscribe = this.#mapUnsubscribe.get(actualValidator)) === "function") {
            unsubscribe();
            this.#mapUnsubscribe.delete(actualValidator);
          }
        }
      }
    }
  }
  /**
   * Remove validators by the provided callback. The callback takes 3 parameters: `id`, `validator`, and `weight`.
   * Any truthy value returned will remove that validator.
   *
   * @param {function(*, import('../').ValidatorFn, number): boolean} callback - Callback function to evaluate each
   *        validator entry.
   */
  removeBy(callback) {
    const length = this.#validatorData.length;
    if (length === 0) {
      return;
    }
    if (typeof callback !== "function") {
      throw new TypeError(`AdapterValidator error: 'callback' is not a function.`);
    }
    this.#validatorData = this.#validatorData.filter((data) => {
      const remove = callback.call(callback, { ...data });
      if (remove) {
        let unsubscribe;
        if (typeof (unsubscribe = this.#mapUnsubscribe.get(data.validator)) === "function") {
          unsubscribe();
          this.#mapUnsubscribe.delete(data.validator);
        }
      }
      return !remove;
    });
  }
  removeById(...ids) {
    const length = this.#validatorData.length;
    if (length === 0) {
      return;
    }
    this.#validatorData = this.#validatorData.filter((data) => {
      let remove = false;
      for (const id of ids) {
        remove |= data.id === id;
      }
      if (remove) {
        let unsubscribe;
        if (typeof (unsubscribe = this.#mapUnsubscribe.get(data.validator)) === "function") {
          unsubscribe();
          this.#mapUnsubscribe.delete(data.validator);
        }
      }
      return !remove;
    });
  }
}
class BasicBounds {
  /**
   * When true constrains the min / max width or height to element.
   *
   * @type {boolean}
   */
  #constrain;
  /**
   * @type {HTMLElement}
   */
  #element;
  /**
   * When true the validator is active.
   *
   * @type {boolean}
   */
  #enabled;
  /**
   * Provides a manual setting of the element height. As things go `offsetHeight` causes a browser layout and is not
   * performance oriented. If manually set this height is used instead of `offsetHeight`.
   *
   * @type {number}
   */
  #height;
  /**
   * Set from an optional value in the constructor to lock accessors preventing modification.
   */
  #lock;
  /**
   * Provides a manual setting of the element width. As things go `offsetWidth` causes a browser layout and is not
   * performance oriented. If manually set this width is used instead of `offsetWidth`.
   *
   * @type {number}
   */
  #width;
  constructor({ constrain = true, element: element2, enabled = true, lock = false, width, height } = {}) {
    this.element = element2;
    this.constrain = constrain;
    this.enabled = enabled;
    this.width = width;
    this.height = height;
    this.#lock = typeof lock === "boolean" ? lock : false;
  }
  get constrain() {
    return this.#constrain;
  }
  get element() {
    return this.#element;
  }
  get enabled() {
    return this.#enabled;
  }
  get height() {
    return this.#height;
  }
  get width() {
    return this.#width;
  }
  set constrain(constrain) {
    if (this.#lock) {
      return;
    }
    if (typeof constrain !== "boolean") {
      throw new TypeError(`'constrain' is not a boolean.`);
    }
    this.#constrain = constrain;
  }
  set element(element2) {
    if (this.#lock) {
      return;
    }
    if (element2 === void 0 || element2 === null || element2 instanceof HTMLElement) {
      this.#element = element2;
    } else {
      throw new TypeError(`'element' is not a HTMLElement, undefined, or null.`);
    }
  }
  set enabled(enabled) {
    if (this.#lock) {
      return;
    }
    if (typeof enabled !== "boolean") {
      throw new TypeError(`'enabled' is not a boolean.`);
    }
    this.#enabled = enabled;
  }
  set height(height) {
    if (this.#lock) {
      return;
    }
    if (height === void 0 || Number.isFinite(height)) {
      this.#height = height;
    } else {
      throw new TypeError(`'height' is not a finite number or undefined.`);
    }
  }
  set width(width) {
    if (this.#lock) {
      return;
    }
    if (width === void 0 || Number.isFinite(width)) {
      this.#width = width;
    } else {
      throw new TypeError(`'width' is not a finite number or undefined.`);
    }
  }
  setDimension(width, height) {
    if (this.#lock) {
      return;
    }
    if (width === void 0 || Number.isFinite(width)) {
      this.#width = width;
    } else {
      throw new TypeError(`'width' is not a finite number or undefined.`);
    }
    if (height === void 0 || Number.isFinite(height)) {
      this.#height = height;
    } else {
      throw new TypeError(`'height' is not a finite number or undefined.`);
    }
  }
  /**
   * Provides a validator that respects transforms in positional data constraining the position to within the target
   * elements bounds.
   *
   * @param {import('../').ValidationData}   valData - The associated validation data for position updates.
   *
   * @returns {import('../').TJSPositionData} Potentially adjusted position data.
   */
  validator(valData) {
    if (!this.#enabled) {
      return valData.position;
    }
    const boundsWidth = this.#width ?? this.#element?.offsetWidth ?? globalThis.innerWidth;
    const boundsHeight = this.#height ?? this.#element?.offsetHeight ?? globalThis.innerHeight;
    if (typeof valData.position.width === "number") {
      const maxW = valData.maxWidth ?? (this.#constrain ? boundsWidth : Number.MAX_SAFE_INTEGER);
      valData.position.width = valData.width = clamp(valData.position.width, valData.minWidth, maxW);
      if (valData.width + valData.position.left + valData.marginLeft > boundsWidth) {
        valData.position.left = boundsWidth - valData.width - valData.marginLeft;
      }
    }
    if (typeof valData.position.height === "number") {
      const maxH = valData.maxHeight ?? (this.#constrain ? boundsHeight : Number.MAX_SAFE_INTEGER);
      valData.position.height = valData.height = clamp(valData.position.height, valData.minHeight, maxH);
      if (valData.height + valData.position.top + valData.marginTop > boundsHeight) {
        valData.position.top = boundsHeight - valData.height - valData.marginTop;
      }
    }
    const maxL = Math.max(boundsWidth - valData.width - valData.marginLeft, 0);
    valData.position.left = Math.round(clamp(valData.position.left, 0, maxL));
    const maxT = Math.max(boundsHeight - valData.height - valData.marginTop, 0);
    valData.position.top = Math.round(clamp(valData.position.top, 0, maxT));
    return valData.position;
  }
}
const s_TRANSFORM_DATA = new TJSTransformData();
class TransformBounds {
  /**
   * When true constrains the min / max width or height to element.
   *
   * @type {boolean}
   */
  #constrain;
  /**
   * @type {HTMLElement}
   */
  #element;
  /**
   * When true the validator is active.
   *
   * @type {boolean}
   */
  #enabled;
  /**
   * Provides a manual setting of the element height. As things go `offsetHeight` causes a browser layout and is not
   * performance oriented. If manually set this height is used instead of `offsetHeight`.
   *
   * @type {number}
   */
  #height;
  /**
   * Set from an optional value in the constructor to lock accessors preventing modification.
   */
  #lock;
  /**
   * Provides a manual setting of the element width. As things go `offsetWidth` causes a browser layout and is not
   * performance oriented. If manually set this width is used instead of `offsetWidth`.
   *
   * @type {number}
   */
  #width;
  constructor({ constrain = true, element: element2, enabled = true, lock = false, width, height } = {}) {
    this.element = element2;
    this.constrain = constrain;
    this.enabled = enabled;
    this.width = width;
    this.height = height;
    this.#lock = typeof lock === "boolean" ? lock : false;
  }
  get constrain() {
    return this.#constrain;
  }
  get element() {
    return this.#element;
  }
  get enabled() {
    return this.#enabled;
  }
  get height() {
    return this.#height;
  }
  get width() {
    return this.#width;
  }
  set constrain(constrain) {
    if (this.#lock) {
      return;
    }
    if (typeof constrain !== "boolean") {
      throw new TypeError(`'constrain' is not a boolean.`);
    }
    this.#constrain = constrain;
  }
  set element(element2) {
    if (this.#lock) {
      return;
    }
    if (element2 === void 0 || element2 === null || element2 instanceof HTMLElement) {
      this.#element = element2;
    } else {
      throw new TypeError(`'element' is not a HTMLElement, undefined, or null.`);
    }
  }
  set enabled(enabled) {
    if (this.#lock) {
      return;
    }
    if (typeof enabled !== "boolean") {
      throw new TypeError(`'enabled' is not a boolean.`);
    }
    this.#enabled = enabled;
  }
  set height(height) {
    if (this.#lock) {
      return;
    }
    if (height === void 0 || Number.isFinite(height)) {
      this.#height = height;
    } else {
      throw new TypeError(`'height' is not a finite number or undefined.`);
    }
  }
  set width(width) {
    if (this.#lock) {
      return;
    }
    if (width === void 0 || Number.isFinite(width)) {
      this.#width = width;
    } else {
      throw new TypeError(`'width' is not a finite number or undefined.`);
    }
  }
  setDimension(width, height) {
    if (this.#lock) {
      return;
    }
    if (width === void 0 || Number.isFinite(width)) {
      this.#width = width;
    } else {
      throw new TypeError(`'width' is not a finite number or undefined.`);
    }
    if (height === void 0 || Number.isFinite(height)) {
      this.#height = height;
    } else {
      throw new TypeError(`'height' is not a finite number or undefined.`);
    }
  }
  /**
   * Provides a validator that respects transforms in positional data constraining the position to within the target
   * elements bounds.
   *
   * @param {import('../').ValidationData}   valData - The associated validation data for position updates.
   *
   * @returns {import('../').TJSPositionData} Potentially adjusted position data.
   */
  validator(valData) {
    if (!this.#enabled) {
      return valData.position;
    }
    const boundsWidth = this.#width ?? this.#element?.offsetWidth ?? globalThis.innerWidth;
    const boundsHeight = this.#height ?? this.#element?.offsetHeight ?? globalThis.innerHeight;
    if (typeof valData.position.width === "number") {
      const maxW = valData.maxWidth ?? (this.#constrain ? boundsWidth : Number.MAX_SAFE_INTEGER);
      valData.position.width = clamp(valData.width, valData.minWidth, maxW);
    }
    if (typeof valData.position.height === "number") {
      const maxH = valData.maxHeight ?? (this.#constrain ? boundsHeight : Number.MAX_SAFE_INTEGER);
      valData.position.height = clamp(valData.height, valData.minHeight, maxH);
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
}
class UpdateElementData {
  constructor() {
    this.data = void 0;
    this.dataSubscribers = new TJSPositionData();
    this.dimensionData = { width: 0, height: 0 };
    this.changeSet = void 0;
    this.options = void 0;
    this.queued = false;
    this.styleCache = void 0;
    this.transforms = void 0;
    this.transformData = new TJSTransformData();
    this.subscriptions = void 0;
    this.storeDimension = writable(this.dimensionData);
    this.storeTransform = writable(this.transformData, () => {
      this.options.transformSubscribed = true;
      return () => this.options.transformSubscribed = false;
    });
    this.queued = false;
    Object.seal(this.dimensionData);
  }
}
class UpdateElementManager {
  static list = [];
  static listCntr = 0;
  static updatePromise;
  static get promise() {
    return this.updatePromise;
  }
  /**
   * Potentially adds the given element and internal updateData instance to the list.
   *
   * @param {HTMLElement}       el - An HTMLElement instance.
   *
   * @param {import('./UpdateElementData').UpdateElementData} updateData - An UpdateElementData instance.
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
   * @param {import('./UpdateElementData').UpdateElementData} updateData - An UpdateElementData instance.
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
   * @param {import('./UpdateElementData').UpdateElementData} updateData - Data change set.
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
}
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
    el.style.transformOrigin = data.transformOrigin;
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
    el.style.transformOrigin = data.transformOrigin;
  }
  if (changeSet.left || changeSet.top || changeSet.transform) {
    el.style.transform = updateData.transforms.getCSSOrtho(data);
  }
}
function s_UPDATE_TRANSFORM(el, updateData) {
  s_VALIDATION_DATA$1.height = updateData.data.height !== "auto" ? updateData.data.height : updateData.styleCache.offsetHeight;
  s_VALIDATION_DATA$1.width = updateData.data.width !== "auto" ? updateData.data.width : updateData.styleCache.offsetWidth;
  s_VALIDATION_DATA$1.marginLeft = updateData.styleCache.marginLeft;
  s_VALIDATION_DATA$1.marginTop = updateData.styleCache.marginTop;
  updateData.transforms.getData(updateData.data, updateData.transformData, s_VALIDATION_DATA$1);
  updateData.storeTransform.set(updateData.transformData);
}
const s_VALIDATION_DATA$1 = {
  height: void 0,
  width: void 0,
  marginLeft: void 0,
  marginTop: void 0
};
class TJSPosition {
  /**
   * @type {{browserCentered: Centered, Centered: Centered}}
   */
  static #positionInitial = {
    browserCentered: new Centered({ lock: true }),
    Centered
  };
  /**
   * @type {{TransformBounds: TransformBounds, BasicBounds: BasicBounds, basicWindow: BasicBounds, transformWindow: TransformBounds}}
   */
  static #positionValidators = {
    basicWindow: new BasicBounds({ lock: true }),
    BasicBounds,
    transformWindow: new TransformBounds({ lock: true }),
    TransformBounds
  };
  /**
   * @type {TJSPositionData}
   */
  #data = new TJSPositionData();
  /**
   * Provides the animation API.
   *
   * @type {AnimationAPI}
   */
  #animate = new AnimationAPI(this, this.#data);
  /**
   * Provides a way to turn on / off the position handling.
   *
   * @type {boolean}
   */
  #enabled = true;
  /**
   * Stores ongoing options that are set in the constructor or by transform store subscription.
   *
   * @type {import('./').TJSPositionOptions}
   */
  #options = {
    calculateTransform: false,
    initialHelper: void 0,
    ortho: true,
    transformSubscribed: false
  };
  /**
   * The associated parent for positional data tracking. Used in validators.
   *
   * @type {import('./').TJSPositionParent}
   */
  #parent;
  /**
   * Stores the style attributes that changed on update.
   *
   * @type {PositionChangeSet}
   */
  #positionChangeSet = new PositionChangeSet();
  /**
   * @type {import('./').TJSPositionStores}
   */
  #stores;
  /**
   * Stores an instance of the computer styles for the target element.
   *
   * @type {StyleCache}
   */
  #styleCache;
  /**
   * Stores the subscribers.
   *
   * @type {import('svelte/store').Subscriber<TJSPositionData>[]}
   */
  #subscriptions = [];
  /**
   * @type {TJSTransforms}
   */
  #transforms = new TJSTransforms();
  /**
   * @type {UpdateElementData}
   */
  #updateElementData;
  /**
   * Stores the UpdateElementManager wait promise.
   *
   * @type {Promise}
   */
  #updateElementPromise;
  /**
   * @type {AdapterValidators}
   */
  #validators;
  /**
   * @type {import('./').ValidatorData[]}
   */
  #validatorData;
  /**
   * @type {PositionStateAPI}
   */
  #state = new PositionStateAPI(this, this.#data, this.#transforms);
  /**
   * @returns {AnimationGroupAPI} Public Animation API.
   */
  static get Animate() {
    return AnimationGroupAPI;
  }
  /**
   * @returns {{browserCentered: Centered, Centered: Centered}} TJSPosition initial API.
   */
  static get Initial() {
    return this.#positionInitial;
  }
  /**
   * Returns TJSTransformData class / constructor.
   *
   * @returns {TJSTransformData} TJSTransformData class / constructor.
   */
  static get TransformData() {
    return TJSTransformData;
  }
  /**
   * Returns default validators.
   *
   * Note: `basicWindow` and `BasicBounds` will eventually be removed.
   *
   * @returns {{TransformBounds: TransformBounds, BasicBounds: BasicBounds, basicWindow: BasicBounds, transformWindow: TransformBounds}}
   * Available validators.
   */
  static get Validators() {
    return this.#positionValidators;
  }
  /**
   * Returns a duplicate of a given position instance copying any options and validators.
   *
   * // TODO: Consider more safety over options processing.
   *
   * @param {TJSPosition}          position - A position instance.
   *
   * @param {import('./').TJSPositionOptions}   options - TJSPosition options.
   *
   * @returns {TJSPosition} A duplicate position instance.
   */
  static duplicate(position, options) {
    if (!(position instanceof TJSPosition)) {
      throw new TypeError(`'position' is not an instance of Position.`);
    }
    const newPosition = new TJSPosition(options);
    newPosition.#options = Object.assign({}, position.#options, options);
    newPosition.#validators.add(...position.#validators);
    newPosition.set(position.#data);
    return newPosition;
  }
  /**
   * @param {import('./').TJSPositionParent | import('./').TJSPositionOptionsAll}   [parent] - A
   *        potential parent element or object w/ `elementTarget` getter. May also be the TJSPositionOptions object
   *        w/ 1 argument.
   *
   * @param {import('./').TJSPositionOptionsAll}   [options] - Default values.
   */
  constructor(parent, options) {
    if (isPlainObject(parent)) {
      options = parent;
    } else {
      this.#parent = parent;
    }
    const data = this.#data;
    const transforms = this.#transforms;
    this.#styleCache = new StyleCache();
    const updateData = new UpdateElementData();
    updateData.changeSet = this.#positionChangeSet;
    updateData.data = this.#data;
    updateData.options = this.#options;
    updateData.styleCache = this.#styleCache;
    updateData.subscriptions = this.#subscriptions;
    updateData.transforms = this.#transforms;
    this.#updateElementData = updateData;
    if (isObject(options)) {
      if (typeof options.calculateTransform === "boolean") {
        this.#options.calculateTransform = options.calculateTransform;
      }
      if (typeof options.ortho === "boolean") {
        this.#options.ortho = options.ortho;
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
    this.#stores = {
      // The main properties for manipulating TJSPosition.
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
      element: { subscribe: this.#styleCache.stores.element.subscribe },
      resizeContentHeight: { subscribe: this.#styleCache.stores.resizeContentHeight.subscribe },
      resizeContentWidth: { subscribe: this.#styleCache.stores.resizeContentWidth.subscribe },
      resizeOffsetHeight: { subscribe: this.#styleCache.stores.resizeOffsetHeight.subscribe },
      resizeOffsetWidth: { subscribe: this.#styleCache.stores.resizeOffsetWidth.subscribe },
      transform: { subscribe: updateData.storeTransform.subscribe },
      // Protected store that should only be set by resizeObserver action.
      resizeObserved: this.#styleCache.stores.resizeObserved
    };
    subscribeIgnoreFirst(this.#stores.resizeObserved, (resizeData) => {
      const parent2 = this.#parent;
      const el = parent2 instanceof HTMLElement ? parent2 : parent2?.elementTarget;
      if (el instanceof HTMLElement && Number.isFinite(resizeData?.offsetWidth) && Number.isFinite(resizeData?.offsetHeight)) {
        this.set(data);
      }
    });
    this.#stores.transformOrigin.values = transformOrigins;
    [this.#validators, this.#validatorData] = new AdapterValidators();
    if (options?.initial || options?.positionInitial) {
      const initialHelper = options.initial ?? options.positionInitial;
      if (typeof initialHelper?.getLeft !== "function" || typeof initialHelper?.getTop !== "function") {
        throw new Error(
          `'options.initial' position helper does not contain 'getLeft' and / or 'getTop' functions.`
        );
      }
      this.#options.initialHelper = options.initial;
    }
    if (options?.validator) {
      if (isIterable(options?.validator)) {
        this.validators.add(...options.validator);
      } else {
        this.validators.add(options.validator);
      }
    }
  }
  /**
   * Returns the animation API.
   *
   * @returns {AnimationAPI} Animation API.
   */
  get animate() {
    return this.#animate;
  }
  /**
   * Returns the dimension data for the readable store.
   *
   * @returns {{width: number | 'auto', height: number | 'auto'}} Dimension data.
   */
  get dimension() {
    return this.#updateElementData.dimensionData;
  }
  /**
   * Returns the enabled state.
   *
   * @returns {boolean} Enabled state.
   */
  get enabled() {
    return this.#enabled;
  }
  /**
   * Returns the current HTMLElement being positioned.
   *
   * @returns {HTMLElement|undefined} Current HTMLElement being positioned.
   */
  get element() {
    return this.#styleCache.el;
  }
  /**
   * Returns a promise that is resolved on the next element update with the time of the update.
   *
   * @returns {Promise<number>} Promise resolved on element update.
   */
  get elementUpdated() {
    return this.#updateElementPromise;
  }
  /**
   * Returns the associated {@link TJSPositionParent} instance.
   *
   * @returns {import('./').TJSPositionParent} The TJSPositionParent instance.
   */
  get parent() {
    return this.#parent;
  }
  /**
   * Returns the state API.
   *
   * @returns {import('./PositionStateAPI').PositionStateAPI} TJSPosition state API.
   */
  get state() {
    return this.#state;
  }
  /**
   * Returns the derived writable stores for individual data variables.
   *
   * @returns {import('./').TJSPositionStores} Derived / writable stores.
   */
  get stores() {
    return this.#stores;
  }
  /**
   * Returns the transform data for the readable store.
   *
   * @returns {TJSTransformData} Transform Data.
   */
  get transform() {
    return this.#updateElementData.transformData;
  }
  /**
   * Returns the validators.
   *
   * @returns {AdapterValidators} validators.
   */
  get validators() {
    return this.#validators;
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
    this.#enabled = enabled;
  }
  /**
   * Sets the associated {@link TJSPositionParent} instance. Resets the style cache and default data.
   *
   * @param {import('./').TJSPositionParent} parent - A TJSPositionParent instance.
   */
  set parent(parent) {
    if (parent !== void 0 && !(parent instanceof HTMLElement) && !isObject(parent)) {
      throw new TypeError(`'parent' is not an HTMLElement, object, or undefined.`);
    }
    this.#parent = parent;
    this.#state.remove({ name: "#defaultData" });
    this.#styleCache.reset();
    if (parent) {
      this.set(this.#data);
    }
  }
  // Data accessors ----------------------------------------------------------------------------------------------------
  /**
   * @returns {number|'auto'|'inherit'|null} height
   */
  get height() {
    return this.#data.height;
  }
  /**
   * @returns {number|null} left
   */
  get left() {
    return this.#data.left;
  }
  /**
   * @returns {number|null} maxHeight
   */
  get maxHeight() {
    return this.#data.maxHeight;
  }
  /**
   * @returns {number|null} maxWidth
   */
  get maxWidth() {
    return this.#data.maxWidth;
  }
  /**
   * @returns {number|null} minHeight
   */
  get minHeight() {
    return this.#data.minHeight;
  }
  /**
   * @returns {number|null} minWidth
   */
  get minWidth() {
    return this.#data.minWidth;
  }
  /**
   * @returns {number|null} rotateX
   */
  get rotateX() {
    return this.#data.rotateX;
  }
  /**
   * @returns {number|null} rotateY
   */
  get rotateY() {
    return this.#data.rotateY;
  }
  /**
   * @returns {number|null} rotateZ
   */
  get rotateZ() {
    return this.#data.rotateZ;
  }
  /**
   * @returns {number|null} alias for rotateZ
   */
  get rotation() {
    return this.#data.rotateZ;
  }
  /**
   * @returns {number|null} scale
   */
  get scale() {
    return this.#data.scale;
  }
  /**
   * @returns {number|null} top
   */
  get top() {
    return this.#data.top;
  }
  /**
   * @returns {import('./').TJSTransformOrigin} transformOrigin
   */
  get transformOrigin() {
    return this.#data.transformOrigin;
  }
  /**
   * @returns {number|null} translateX
   */
  get translateX() {
    return this.#data.translateX;
  }
  /**
   * @returns {number|null} translateY
   */
  get translateY() {
    return this.#data.translateY;
  }
  /**
   * @returns {number|null} translateZ
   */
  get translateZ() {
    return this.#data.translateZ;
  }
  /**
   * @returns {number|'auto'|'inherit'|null} width
   */
  get width() {
    return this.#data.width;
  }
  /**
   * @returns {number|null} z-index
   */
  get zIndex() {
    return this.#data.zIndex;
  }
  /**
   * @param {number|string|null} height -
   */
  set height(height) {
    this.#stores.height.set(height);
  }
  /**
   * @param {number|string|null} left -
   */
  set left(left) {
    this.#stores.left.set(left);
  }
  /**
   * @param {number|string|null} maxHeight -
   */
  set maxHeight(maxHeight) {
    this.#stores.maxHeight.set(maxHeight);
  }
  /**
   * @param {number|string|null} maxWidth -
   */
  set maxWidth(maxWidth) {
    this.#stores.maxWidth.set(maxWidth);
  }
  /**
   * @param {number|string|null} minHeight -
   */
  set minHeight(minHeight) {
    this.#stores.minHeight.set(minHeight);
  }
  /**
   * @param {number|string|null} minWidth -
   */
  set minWidth(minWidth) {
    this.#stores.minWidth.set(minWidth);
  }
  /**
   * @param {number|string|null} rotateX -
   */
  set rotateX(rotateX) {
    this.#stores.rotateX.set(rotateX);
  }
  /**
   * @param {number|string|null} rotateY -
   */
  set rotateY(rotateY) {
    this.#stores.rotateY.set(rotateY);
  }
  /**
   * @param {number|string|null} rotateZ -
   */
  set rotateZ(rotateZ) {
    this.#stores.rotateZ.set(rotateZ);
  }
  /**
   * @param {number|string|null} rotateZ - alias for rotateZ
   */
  set rotation(rotateZ) {
    this.#stores.rotateZ.set(rotateZ);
  }
  /**
   * @param {number|string|null} scale -
   */
  set scale(scale) {
    this.#stores.scale.set(scale);
  }
  /**
   * @param {number|string|null} top -
   */
  set top(top) {
    this.#stores.top.set(top);
  }
  /**
   * @param {import('./').TJSTransformOrigin} transformOrigin -
   */
  set transformOrigin(transformOrigin) {
    if (transformOrigins.includes(transformOrigin)) {
      this.#stores.transformOrigin.set(transformOrigin);
    }
  }
  /**
   * @param {number|string|null} translateX -
   */
  set translateX(translateX) {
    this.#stores.translateX.set(translateX);
  }
  /**
   * @param {number|string|null} translateY -
   */
  set translateY(translateY) {
    this.#stores.translateY.set(translateY);
  }
  /**
   * @param {number|string|null} translateZ -
   */
  set translateZ(translateZ) {
    this.#stores.translateZ.set(translateZ);
  }
  /**
   * @param {number|string|null} width -
   */
  set width(width) {
    this.#stores.width.set(width);
  }
  /**
   * @param {number|string|null} zIndex -
   */
  set zIndex(zIndex) {
    this.#stores.zIndex.set(zIndex);
  }
  /**
   * Assigns current position to object passed into method.
   *
   * @param {object|TJSPositionData}  [position] - Target to assign current position data.
   *
   * @param {import('./').TJSPositionGetOptions}   [options] - Defines options for specific keys and substituting null
   *        for numeric default values.
   *
   * @returns {TJSPositionData} Passed in object with current position data.
   */
  get(position = {}, options) {
    const keys = options?.keys;
    const excludeKeys = options?.exclude;
    const numeric = options?.numeric ?? false;
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
      const data = Object.assign(position, this.#data);
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
   * @returns {TJSPositionData} Current position data.
   */
  toJSON() {
    return Object.assign({}, this.#data);
  }
  /**
   * All calculation and updates of position are implemented in {@link TJSPosition}. This allows position to be fully
   * reactive and in control of updating inline styles for the application.
   *
   * Note: the logic for updating position is improved and changes a few aspects from the default
   * {@link globalThis.Application.setPosition}. The gate on `popOut` is removed, so to ensure no positional
   * application occurs popOut applications can set `this.options.positionable` to false ensuring no positional inline
   * styles are applied.
   *
   * The initial set call on an application with a target element will always set width / height as this is
   * necessary for correct calculations.
   *
   * When a target element is present updated styles are applied after validation. To modify the behavior of set
   * implement one or more validator functions and add them from the application via
   * `this.position.validators.add(<Function>)`.
   *
   * Updates to any target element are decoupled from the underlying TJSPosition data. This method returns this instance
   * that you can then await on the target element inline style update by using {@link TJSPosition.elementUpdated}.
   *
   * @param {import('./').TJSPositionDataExtended} [position] - TJSPosition data to set.
   *
   * @returns {TJSPosition} This TJSPosition instance.
   */
  set(position = {}) {
    if (!isObject(position)) {
      throw new TypeError(`Position - set error: 'position' is not an object.`);
    }
    const parent = this.#parent;
    if (!this.#enabled) {
      return this;
    }
    if (parent !== void 0 && typeof parent?.options?.positionable === "boolean" && !parent?.options?.positionable) {
      return this;
    }
    const immediateElementUpdate = position.immediateElementUpdate === true;
    const data = this.#data;
    const transforms = this.#transforms;
    const targetEl = parent instanceof HTMLElement ? parent : parent?.elementTarget;
    const el = targetEl instanceof HTMLElement && targetEl.isConnected ? targetEl : void 0;
    const changeSet = this.#positionChangeSet;
    const styleCache = this.#styleCache;
    if (el) {
      if (!styleCache.hasData(el)) {
        styleCache.update(el);
        if (!styleCache.hasWillChange)
          ;
        changeSet.set(true);
        this.#updateElementData.queued = false;
      }
      convertRelative(position, this);
      position = this.#updatePosition(position, parent, el, styleCache);
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
      const defaultData = this.#state.getDefault();
      if (!isObject(defaultData)) {
        this.#state.save({ name: "#defaultData", ...Object.assign({}, data) });
      }
      if (immediateElementUpdate) {
        UpdateElementManager.immediate(el, this.#updateElementData);
        this.#updateElementPromise = Promise.resolve(performance.now());
      } else if (!this.#updateElementData.queued) {
        this.#updateElementPromise = UpdateElementManager.add(el, this.#updateElementData);
      }
    } else {
      UpdateElementManager.updateSubscribers(this.#updateElementData);
    }
    return this;
  }
  /**
   * @param {import('svelte/store').Subscriber<TJSPositionData>} handler - Callback function that is invoked on
   *        update / changes. Receives a copy of the TJSPositionData.
   *
   * @returns {import('svelte/store').Unsubscriber} Unsubscribe function.
   */
  subscribe(handler) {
    this.#subscriptions.push(handler);
    handler(Object.assign({}, this.#data));
    return () => {
      const index = this.#subscriptions.findIndex((sub) => sub === handler);
      if (index >= 0) {
        this.#subscriptions.splice(index, 1);
      }
    };
  }
  /**
   * @param {import('./').TJSPositionDataExtended} opts -
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
   * @returns {null|TJSPositionData} Updated position data or null if validation fails.
   */
  #updatePosition({
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
    let currentPosition = s_DATA_UPDATE.copy(this.#data);
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
      currentPosition.left = typeof this.#options.initialHelper?.getLeft === "function" ? this.#options.initialHelper.getLeft(width) : 0;
    }
    if (Number.isFinite(top)) {
      currentPosition.top = top;
    } else if (!Number.isFinite(currentPosition.top)) {
      currentPosition.top = typeof this.#options.initialHelper?.getTop === "function" ? this.#options.initialHelper.getTop(height) : 0;
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
    const validatorData = this.#validatorData;
    if (this.#validators.enabled && validatorData.length) {
      s_VALIDATION_DATA.parent = parent;
      s_VALIDATION_DATA.el = el;
      s_VALIDATION_DATA.computed = styleCache.computed;
      s_VALIDATION_DATA.transforms = this.#transforms;
      s_VALIDATION_DATA.height = height;
      s_VALIDATION_DATA.width = width;
      s_VALIDATION_DATA.marginLeft = styleCache.marginLeft;
      s_VALIDATION_DATA.marginTop = styleCache.marginTop;
      s_VALIDATION_DATA.maxHeight = styleCache.maxHeight ?? currentPosition.maxHeight;
      s_VALIDATION_DATA.maxWidth = styleCache.maxWidth ?? currentPosition.maxWidth;
      const isMinimized = parent?.reactive?.minimized ?? false;
      s_VALIDATION_DATA.minHeight = isMinimized ? currentPosition.minHeight ?? 0 : styleCache.minHeight || (currentPosition.minHeight ?? 0);
      s_VALIDATION_DATA.minWidth = isMinimized ? currentPosition.minWidth ?? 0 : styleCache.minWidth || (currentPosition.minWidth ?? 0);
      for (let cntr = 0; cntr < validatorData.length; cntr++) {
        s_VALIDATION_DATA.position = currentPosition;
        s_VALIDATION_DATA.rest = rest;
        currentPosition = validatorData[cntr].validator(s_VALIDATION_DATA);
        if (currentPosition === null) {
          return null;
        }
      }
    }
    return currentPosition;
  }
}
const s_DATA_UPDATE = new TJSPositionData();
const s_VALIDATION_DATA = {
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
Object.seal(s_VALIDATION_DATA);
function draggable(node, {
  position,
  active: active2 = true,
  button = 0,
  storeDragging = void 0,
  ease = false,
  easeOptions = { duration: 0.1, ease: cubicOut },
  hasTargetClassList,
  ignoreTargetClassList
}) {
  if (hasTargetClassList !== void 0 && !isIterable(hasTargetClassList)) {
    throw new TypeError(`'hasTargetClassList' is not iterable.`);
  }
  if (ignoreTargetClassList !== void 0 && !isIterable(ignoreTargetClassList)) {
    throw new TypeError(`'ignoreTargetClassList' is not iterable.`);
  }
  const positionData = { left: 0, top: 0 };
  let initialPosition = null;
  let initialDragPoint = {};
  let dragging = false;
  let quickTo = position.animate.quickTo(["top", "left"], easeOptions);
  const handlers = {
    dragDown: ["pointerdown", onDragPointerDown, false],
    dragMove: ["pointermove", onDragPointerChange, false],
    dragUp: ["pointerup", onDragPointerUp, false]
  };
  function activateListeners() {
    node.addEventListener(...handlers.dragDown);
    node.classList.add("draggable");
  }
  function removeListeners() {
    if (typeof storeDragging?.set === "function") {
      storeDragging.set(false);
    }
    node.removeEventListener(...handlers.dragDown);
    node.removeEventListener(...handlers.dragMove);
    node.removeEventListener(...handlers.dragUp);
    node.classList.remove("draggable");
  }
  if (active2) {
    activateListeners();
  }
  function onDragPointerDown(event) {
    if (event.button !== button || !event.isPrimary) {
      return;
    }
    if (!position.enabled) {
      return;
    }
    if (ignoreTargetClassList !== void 0 && event.target instanceof HTMLElement) {
      for (const targetClass of ignoreTargetClassList) {
        if (event.target.classList.contains(targetClass)) {
          return;
        }
      }
    }
    if (hasTargetClassList !== void 0 && event.target instanceof HTMLElement) {
      let foundTarget = false;
      for (const targetClass of hasTargetClassList) {
        if (event.target.classList.contains(targetClass)) {
          foundTarget = true;
          break;
        }
      }
      if (!foundTarget) {
        return;
      }
    }
    event.preventDefault();
    dragging = false;
    initialPosition = position.get();
    initialDragPoint = { x: event.clientX, y: event.clientY };
    node.addEventListener(...handlers.dragMove);
    node.addEventListener(...handlers.dragUp);
    node.setPointerCapture(event.pointerId);
  }
  function onDragPointerChange(event) {
    if ((event.buttons & 1) === 0) {
      onDragPointerUp(event);
      return;
    }
    if (event.button !== -1 || !event.isPrimary) {
      return;
    }
    event.preventDefault();
    if (!dragging && typeof storeDragging?.set === "function") {
      dragging = true;
      storeDragging.set(true);
    }
    const newLeft = initialPosition.left + (event.clientX - initialDragPoint.x);
    const newTop = initialPosition.top + (event.clientY - initialDragPoint.y);
    if (ease) {
      quickTo(newTop, newLeft);
    } else {
      positionData.left = newLeft;
      positionData.top = newTop;
      position.set(positionData);
    }
  }
  function onDragPointerUp(event) {
    event.preventDefault();
    dragging = false;
    if (typeof storeDragging?.set === "function") {
      storeDragging.set(false);
    }
    node.removeEventListener(...handlers.dragMove);
    node.removeEventListener(...handlers.dragUp);
  }
  return {
    // The default of active being true won't automatically add listeners twice.
    update: (options) => {
      if (typeof options.active === "boolean") {
        active2 = options.active;
        if (active2) {
          activateListeners();
        } else {
          removeListeners();
        }
      }
      if (typeof options.button === "number") {
        button = options.button;
      }
      if (options.position !== void 0 && options.position !== position) {
        position = options.position;
        quickTo = position.animate.quickTo(["top", "left"], easeOptions);
      }
      if (typeof options.ease === "boolean") {
        ease = options.ease;
      }
      if (isObject(options.easeOptions)) {
        easeOptions = options.easeOptions;
        quickTo.options(easeOptions);
      }
      if (options.hasTargetClassList !== void 0) {
        if (!isIterable(options.hasTargetClassList)) {
          throw new TypeError(`'hasTargetClassList' is not iterable.`);
        } else {
          hasTargetClassList = options.hasTargetClassList;
        }
      }
      if (options.ignoreTargetClassList !== void 0) {
        if (!isIterable(options.ignoreTargetClassList)) {
          throw new TypeError(`'ignoreTargetClassList' is not iterable.`);
        } else {
          ignoreTargetClassList = options.ignoreTargetClassList;
        }
      }
    },
    destroy: () => removeListeners()
  };
}
class DraggableOptions {
  #ease = false;
  /**
   * @type {{ duration: number, ease: (t: number) => number | string }}
   */
  #easeOptions = { duration: 0.1, ease: cubicOut };
  /**
   * Stores the subscribers.
   *
   * @type {import('svelte/store').Subscriber<DraggableOptions>[]}
   */
  #subscriptions = [];
  /**
   *
   * @param {object} [opts] - Optional parameters.
   *
   * @param {boolean}  [opts.ease] -
   *
   * @param {object}   [opts.easeOptions] -
   */
  constructor({ ease, easeOptions } = {}) {
    Object.defineProperty(this, "ease", {
      get: () => {
        return this.#ease;
      },
      set: (newEase) => {
        if (typeof newEase !== "boolean") {
          throw new TypeError(`'ease' is not a boolean.`);
        }
        this.#ease = newEase;
        this.#updateSubscribers();
      },
      enumerable: true
    });
    Object.defineProperty(this, "easeOptions", {
      get: () => {
        return this.#easeOptions;
      },
      set: (newEaseOptions) => {
        if (!isObject(newEaseOptions)) {
          throw new TypeError(`'easeOptions' is not an object.`);
        }
        if (newEaseOptions.duration !== void 0) {
          if (!Number.isFinite(newEaseOptions.duration)) {
            throw new TypeError(`'easeOptions.duration' is not a finite number.`);
          }
          if (newEaseOptions.duration < 0) {
            throw new Error(`'easeOptions.duration' is less than 0.`);
          }
          this.#easeOptions.duration = newEaseOptions.duration;
        }
        if (newEaseOptions.ease !== void 0) {
          if (typeof newEaseOptions.ease !== "function" && typeof newEaseOptions.ease !== "string") {
            throw new TypeError(`'easeOptions.ease' is not a function or string.`);
          }
          this.#easeOptions.ease = newEaseOptions.ease;
        }
        this.#updateSubscribers();
      },
      enumerable: true
    });
    if (ease !== void 0) {
      this.ease = ease;
    }
    if (easeOptions !== void 0) {
      this.easeOptions = easeOptions;
    }
  }
  /**
   * @returns {number} Get ease duration
   */
  get easeDuration() {
    return this.#easeOptions.duration;
  }
  /**
   * @returns {string|Function} Get easing function value.
   */
  get easeValue() {
    return this.#easeOptions.ease;
  }
  /**
   * @param {number}   duration - Set ease duration.
   */
  set easeDuration(duration) {
    if (!Number.isFinite(duration)) {
      throw new TypeError(`'duration' is not a finite number.`);
    }
    if (duration < 0) {
      throw new Error(`'duration' is less than 0.`);
    }
    this.#easeOptions.duration = duration;
    this.#updateSubscribers();
  }
  /**
   * @param {string|Function} value - Get easing function value.
   */
  set easeValue(value) {
    if (typeof value !== "function" && typeof value !== "string") {
      throw new TypeError(`'value' is not a function or string.`);
    }
    this.#easeOptions.ease = value;
    this.#updateSubscribers();
  }
  /**
   * Resets all options data to default values.
   */
  reset() {
    this.#ease = false;
    this.#easeOptions = { duration: 0.1, ease: cubicOut };
    this.#updateSubscribers();
  }
  /**
   * Resets easing options to default values.
   */
  resetEase() {
    this.#easeOptions = { duration: 0.1, ease: cubicOut };
    this.#updateSubscribers();
  }
  /**
   *
   * @param {import('svelte/store').Subscriber<DraggableOptions>} handler - Callback function that is invoked on
   *        update / changes. Receives the DraggableOptions object / instance.
   *
   * @returns {import('svelte/store').Unsubscriber} Unsubscribe function.
   */
  subscribe(handler) {
    this.#subscriptions.push(handler);
    handler(this);
    return () => {
      const index = this.#subscriptions.findIndex((sub) => sub === handler);
      if (index >= 0) {
        this.#subscriptions.splice(index, 1);
      }
    };
  }
  #updateSubscribers() {
    const subscriptions = this.#subscriptions;
    if (subscriptions.length > 0) {
      for (let cntr = 0; cntr < subscriptions.length; cntr++) {
        subscriptions[cntr](this);
      }
    }
  }
}
draggable.options = (options) => new DraggableOptions(options);
function isHMRProxy(comp) {
  const instanceName = comp?.constructor?.name;
  if (typeof instanceName === "string" && (instanceName.startsWith("Proxy<") || instanceName === "ProxyComponent")) {
    return true;
  }
  const prototypeName = comp?.prototype?.constructor?.name;
  return typeof prototypeName === "string" && (prototypeName.startsWith("Proxy<") || prototypeName === "ProxyComponent");
}
function isSvelteComponent(comp) {
  if (comp === null || comp === void 0 || typeof comp !== "function") {
    return false;
  }
  const prototypeName = comp?.prototype?.constructor?.name;
  if (typeof prototypeName === "string" && (prototypeName.startsWith("Proxy<") || prototypeName === "ProxyComponent")) {
    return true;
  }
  return typeof window !== "undefined" ? typeof comp.prototype.$destroy === "function" && typeof comp.prototype.$on === "function" : (
    // client-side
    typeof comp.render === "function"
  );
}
async function outroAndDestroy(instance2) {
  return new Promise((resolve) => {
    if (instance2.$$.fragment && instance2.$$.fragment.o) {
      group_outros();
      transition_out(instance2.$$.fragment, 0, 0, () => {
        instance2.$destroy();
        resolve();
      });
      check_outros();
    } else {
      instance2.$destroy();
      resolve();
    }
  });
}
function parseTJSSvelteConfig(config, thisArg = void 0) {
  if (!isObject(config)) {
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
  if (config.context !== void 0 && typeof config.context !== "function" && !(config.context instanceof Map) && !isObject(config.context)) {
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
  if (config.options !== void 0 && !isObject(config.options)) {
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
    const children2 = [];
    for (let cntr = 0; cntr < svelteConfig.children.length; cntr++) {
      const child = svelteConfig.children[cntr];
      if (!isSvelteComponent(child.class)) {
        throw new Error(`parseSvelteConfig - 'class' is not a Svelte component for child[${cntr}] for config:
${JSON.stringify(config)}`);
      }
      child.props = s_PROCESS_PROPS(child.props, thisArg, config);
      children2.push(child);
    }
    if (children2.length > 0) {
      externalContext.children = children2;
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
class ApplicationState {
  /** @type {T} */
  #application;
  /** @type {Map<string, ApplicationStateData>} */
  #dataSaved = /* @__PURE__ */ new Map();
  /**
   * @param {T}   application - The application.
   */
  constructor(application) {
    this.#application = application;
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
    return Object.assign(extra, {
      position: this.#application?.position?.get(),
      beforeMinimized: this.#application?.position?.state.get({ name: "#beforeMinimized" }),
      options: Object.assign({}, this.#application?.options),
      ui: { minimized: this.#application?.reactive?.minimized }
    });
  }
  /**
   * Returns any stored save state by name.
   *
   * @param {object}   options - Options.
   *
   * @param {string}   options.name - Saved data set name.
   *
   * @returns {ApplicationStateData} The saved data set.
   */
  getSave({ name }) {
    if (typeof name !== "string") {
      throw new TypeError(`ApplicationState - getSave error: 'name' is not a string.`);
    }
    return this.#dataSaved.get(name);
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
    const data = this.#dataSaved.get(name);
    this.#dataSaved.delete(name);
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
    interpolate = lerp
  }) {
    if (typeof name !== "string") {
      throw new TypeError(`ApplicationState - restore error: 'name' is not a string.`);
    }
    const dataSaved = this.#dataSaved.get(name);
    if (dataSaved) {
      if (remove) {
        this.#dataSaved.delete(name);
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
    this.#dataSaved.set(name, data);
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
   * @returns {T | Promise<T>} When synchronous the application or Promise when animating resolving with application.
   */
  set(data, { async = false, animateTo = false, duration = 0.1, ease = identity, interpolate = lerp } = {}) {
    if (!isObject(data)) {
      throw new TypeError(`ApplicationState - restore error: 'data' is not an object.`);
    }
    const application = this.#application;
    if (!isObject(data?.position)) {
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
      if (isObject(data?.ui)) {
        const minimized = typeof data.ui?.minimized === "boolean" ? data.ui.minimized : false;
        if (application?.reactive?.minimized && !minimized) {
          application.maximize({ animate: false, duration: 0 });
        }
      }
      const promise2 = application.position.animate.to(
        data.position,
        { duration, ease, interpolate }
      ).finished.then((cancelled) => {
        if (cancelled) {
          return application;
        }
        if (isObject(data?.options)) {
          application?.reactive.mergeOptions(data.options);
        }
        if (isObject(data?.ui)) {
          const minimized = typeof data.ui?.minimized === "boolean" ? data.ui.minimized : false;
          if (!application?.reactive?.minimized && minimized) {
            application.minimize({ animate: false, duration: 0 });
          }
        }
        if (isObject(data?.beforeMinimized)) {
          application.position.state.set({ name: "#beforeMinimized", ...data.beforeMinimized });
        }
        return application;
      });
      if (async) {
        return promise2;
      }
    } else {
      if (rendered) {
        if (isObject(data?.options)) {
          application?.reactive.mergeOptions(data.options);
        }
        if (isObject(data?.ui)) {
          const minimized = typeof data.ui?.minimized === "boolean" ? data.ui.minimized : false;
          if (application?.reactive?.minimized && !minimized) {
            application.maximize({ animate: false, duration: 0 });
          } else if (!application?.reactive?.minimized && minimized) {
            application.minimize({ animate: false, duration });
          }
        }
        if (isObject(data?.beforeMinimized)) {
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
}
class GetSvelteData {
  /** @type {import('./types').MountedAppShell[] | null[]} */
  #applicationShellHolder;
  /** @type {import('./types').SvelteData[]} */
  #svelteData;
  /**
   * Keep a direct reference to the SvelteData array in an associated {@link SvelteApplication}.
   *
   * @param {import('./types').MountedAppShell[] | null[]}  applicationShellHolder - A reference to the
   *        MountedAppShell array.
   *
   * @param {import('./types').SvelteData[]}  svelteData - A reference to the SvelteData array of mounted components.
   */
  constructor(applicationShellHolder, svelteData) {
    this.#applicationShellHolder = applicationShellHolder;
    this.#svelteData = svelteData;
  }
  /**
   * Returns any mounted {@link MountedAppShell}.
   *
   * @returns {import('./types').MountedAppShell | null} Any mounted application shell.
   */
  get applicationShell() {
    return this.#applicationShellHolder[0];
  }
  /**
   * Returns the indexed Svelte component.
   *
   * @param {number}   index -
   *
   * @returns {object} The loaded Svelte component.
   */
  component(index) {
    const data = this.#svelteData[index];
    return data?.component ?? void 0;
  }
  /**
   * Returns the Svelte component entries iterator.
   *
   * @returns {IterableIterator<[number, import('svelte').SvelteComponent]>} Svelte component entries iterator.
   * @yields
   */
  *componentEntries() {
    for (let cntr = 0; cntr < this.#svelteData.length; cntr++) {
      yield [cntr, this.#svelteData[cntr].component];
    }
  }
  /**
   * Returns the Svelte component values iterator.
   *
   * @returns {IterableIterator<import('svelte').SvelteComponent>} Svelte component values iterator.
   * @yields
   */
  *componentValues() {
    for (let cntr = 0; cntr < this.#svelteData.length; cntr++) {
      yield this.#svelteData[cntr].component;
    }
  }
  /**
   * Returns the indexed SvelteData entry.
   *
   * @param {number}   index - The index of SvelteData instance to retrieve.
   *
   * @returns {import('./types').SvelteData} The loaded Svelte config + component.
   */
  data(index) {
    return this.#svelteData[index];
  }
  /**
   * Returns the {@link SvelteData} instance for a given component.
   *
   * @param {import('svelte').SvelteComponent} component - Svelte component.
   *
   * @returns {import('./types').SvelteData} -  The loaded Svelte config + component.
   */
  dataByComponent(component) {
    for (const data of this.#svelteData) {
      if (data.component === component) {
        return data;
      }
    }
    return void 0;
  }
  /**
   * Returns the SvelteData entries iterator.
   *
   * @returns {IterableIterator<[number, import('./types').SvelteData]>} SvelteData entries iterator.
   */
  dataEntries() {
    return this.#svelteData.entries();
  }
  /**
   * Returns the SvelteData values iterator.
   *
   * @returns {IterableIterator<import('./types').SvelteData>} SvelteData values iterator.
   */
  dataValues() {
    return this.#svelteData.values();
  }
  /**
   * Returns the length of the mounted Svelte component list.
   *
   * @returns {number} Length of mounted Svelte component list.
   */
  get length() {
    return this.#svelteData.length;
  }
}
function storeGenerator({ storage, serialize = JSON.stringify, deserialize = JSON.parse }) {
  function isSimpleDeriver(deriver) {
    return deriver.length < 2;
  }
  function storageReadable(key, value, start) {
    return {
      subscribe: storageWritable(key, value, start).subscribe
    };
  }
  function storageWritable(key, value, start) {
    function wrap_start(ogSet) {
      return start(function wrap_set(new_value) {
        if (storage) {
          storage.setItem(key, serialize(new_value));
        }
        return ogSet(new_value);
      }, function wrap_update(fn) {
        set2(fn(get_store_value(ogStore)));
      });
    }
    if (storage) {
      const storageValue = storage.getItem(key);
      try {
        if (storageValue) {
          value = deserialize(storageValue);
        }
      } catch (err) {
      }
      storage.setItem(key, serialize(value));
    }
    const ogStore = writable(value, start ? wrap_start : void 0);
    function set2(new_value) {
      if (storage) {
        storage.setItem(key, serialize(new_value));
      }
      ogStore.set(new_value);
    }
    function update2(fn) {
      set2(fn(get_store_value(ogStore)));
    }
    function subscribe2(run2, invalidate) {
      return ogStore.subscribe(run2, invalidate);
    }
    return { set: set2, update: update2, subscribe: subscribe2 };
  }
  function storageDerived(key, stores, fn, initial_value) {
    const single = !Array.isArray(stores);
    const stores_array = single ? [stores] : stores;
    if (storage && storage.getItem(key)) {
      try {
        initial_value = deserialize(storage.getItem(key));
      } catch (err) {
      }
    }
    return storageReadable(key, initial_value, (set2, update2) => {
      let inited = false;
      const values = [];
      let pending = 0;
      let cleanup;
      const sync = () => {
        if (pending) {
          return;
        }
        cleanup?.();
        const input = single ? values[0] : values;
        if (isSimpleDeriver(fn)) {
          set2(fn(input));
        } else {
          const result = fn(input, set2, update2);
          if (typeof result === "function") {
            cleanup = result;
          }
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
        unsubscribers.forEach((unsubscriber) => unsubscriber());
        cleanup?.();
      };
    });
  }
  return {
    readable: storageReadable,
    writable: storageWritable,
    derived: storageDerived,
    storage,
    serialize,
    deserialize
  };
}
const sessionStores = storeGenerator({ storage: globalThis?.sessionStorage });
class TJSWebStorage {
  /** @type {import('./').StorageStores} */
  #storageStores;
  /**
   * @type {(Map<string, {
   *    store: import('svelte/store').Writable,
   *    deserialize?: (value: string, ...rest: any[]) => any,
   *    serialize?: (value: any, ...rest: any[]) => string
   * }>)}
   */
  #stores = /* @__PURE__ */ new Map();
  /**
   * @param {import('./').StorageStores} storageStores - Provides a complete set of
   *        storage API store helper functions and the associated storage API instance and serializations strategy.
   */
  constructor(storageStores) {
    this.#storageStores = storageStores;
  }
  /**
   * @param {string}   key - Storage key.
   *
   * @returns {(value: string, ...rest: any[]) => any} Deserialize function.
   */
  #getDeserialize(key) {
    return this.#stores.get(key)?.deserialize ?? this.#storageStores.deserialize;
  }
  /**
   * @param {string}   key - Storage key.
   *
   * @returns {(value: any, ...rest: any[]) => string} Serialize function.
   */
  #getSerialize(key) {
    return this.#stores.get(key)?.serialize ?? this.#storageStores.serialize;
  }
  /**
   * Creates a new store for the given key.
   *
   * @template T
   *
   * @param {string}   key - Key to lookup in stores map.
   *
   * @param {T}        [defaultValue] - A default value to set for the store.
   *
   * @param {import('./').StorageStores} [storageStores] - Additional store creation options.
   *
   * @returns {import('svelte/store').Writable<T>} The new store.
   */
  #createStore(key, defaultValue = void 0, storageStores) {
    try {
      const value = this.#storageStores.storage.getItem(key);
      if (value !== null) {
        const deserialize = storageStores?.deserialize ?? this.#storageStores.deserialize;
        defaultValue = deserialize(value);
      }
    } catch (err) {
    }
    const writable2 = storageStores?.writable ?? this.#storageStores.writable;
    return writable2(key, defaultValue);
  }
  /**
   * Gets a store from the `stores` Map or creates a new store for the key and a given default value.
   *
   * @template T
   *
   * @param {string}   key - Key to lookup in stores map.
   *
   * @param {T}        [defaultValue] - A default value to set for the store.
   *
   * @param {import('./').StorageStores} [storageStores] - Additional store creation options.
   *
   * @returns {import('svelte/store').Writable<T>} The store for the given key.
   */
  #getStore(key, defaultValue = void 0, storageStores) {
    const storeEntry = this.#stores.get(key);
    if (storeEntry) {
      return storeEntry.store;
    }
    const store = this.#createStore(key, defaultValue, storageStores);
    this.#stores.set(key, {
      store,
      deserialize: storageStores?.deserialize,
      serialize: storageStores?.serialize
    });
    return store;
  }
  /**
   * Get value from the storage API.
   *
   * @param {string}   key - Key to lookup in storage API.
   *
   * @param {*}        [defaultValue] - A default value to return if key not present in session storage.
   *
   * @returns {*} Value from session storage or if not defined any default value provided.
   */
  getItem(key, defaultValue) {
    let value = defaultValue;
    const storageValue = this.#storageStores.storage.getItem(key);
    if (storageValue !== null) {
      try {
        value = this.#getDeserialize(key)(storageValue);
      } catch (err) {
        value = defaultValue;
      }
    } else if (defaultValue !== void 0) {
      try {
        const newValue = this.#getSerialize(key)(defaultValue);
        this.#storageStores.storage.setItem(key, newValue);
      } catch (err) {
      }
    }
    return value;
  }
  /**
   * Returns the backing Svelte store for the given key; potentially sets a default value if the key
   * is not already set.
   *
   * @template T
   *
   * @param {string}   key - Key to lookup in storage API.
   *
   * @param {T}        [defaultValue] - A default value to return if key not present in session storage.
   *
   * @param {import('./').StorageStores} [storageStores] - Additional store creation options.
   *
   * @returns {import('svelte/store').Writable<T>} The Svelte store for this key.
   */
  getStore(key, defaultValue, storageStores) {
    return this.#getStore(key, defaultValue, storageStores);
  }
  /**
   * Sets the value for the given key in storage API.
   *
   * @param {string}   key - Key to lookup in storage API.
   *
   * @param {*}        value - A value to set for this key.
   */
  setItem(key, value) {
    const store = this.#getStore(key);
    store.set(value);
  }
  /**
   * Convenience method to swap a boolean value stored in storage API.
   *
   * @param {string}   key - Key to lookup in storage API.
   *
   * @param {boolean}  [defaultValue] - A default value to return if key not present in session storage.
   *
   * @returns {boolean} The boolean swap for the given key.
   */
  swapItemBoolean(key, defaultValue) {
    const store = this.#getStore(key, defaultValue);
    let currentValue = false;
    try {
      currentValue = !!this.#getDeserialize(key)(this.#storageStores.storage.getItem(key));
    } catch (err) {
    }
    const newValue = typeof currentValue === "boolean" ? !currentValue : false;
    store.set(newValue);
    return newValue;
  }
}
class TJSSessionStorage extends TJSWebStorage {
  constructor() {
    super(sessionStores);
  }
}
class SvelteReactive {
  /**
   * @type {import('../SvelteApplication').SvelteApplication}
   */
  #application;
  /**
   * @type {boolean}
   */
  #initialized = false;
  /** @type {import('@typhonjs-fvtt/runtime/svelte/store/web-storage').TJSWebStorage} */
  #sessionStorage;
  /**
   * The Application option store which is injected into mounted Svelte component context under the `external` key.
   *
   * @type {import('./types').StoreAppOptions}
   */
  #storeAppOptions;
  /**
   * Stores the update function for `#storeAppOptions`.
   *
   * @type {(this: void, updater: import('svelte/store').Updater<object>) => void}
   */
  #storeAppOptionsUpdate;
  /**
   * Stores the UI state data to make it accessible via getters.
   *
   * @type {object}
   */
  #dataUIState;
  /**
   * The UI option store which is injected into mounted Svelte component context under the `external` key.
   *
   * @type {import('./types').StoreUIOptions}
   */
  #storeUIState;
  /**
   * Stores the update function for `#storeUIState`.
   *
   * @type {(this: void, updater: import('svelte/store').Updater<object>) => void}
   */
  #storeUIStateUpdate;
  /**
   * Stores the unsubscribe functions from local store subscriptions.
   *
   * @type {import('svelte/store').Unsubscriber[]}
   */
  #storeUnsubscribe = [];
  /**
   * @param {import('../SvelteApplication').SvelteApplication} application - The host Foundry application.
   */
  constructor(application) {
    this.#application = application;
    const optionsSessionStorage = application?.options?.sessionStorage;
    if (optionsSessionStorage !== void 0 && !(optionsSessionStorage instanceof TJSWebStorage)) {
      throw new TypeError(`'options.sessionStorage' is not an instance of TJSWebStorage.`);
    }
    this.#sessionStorage = optionsSessionStorage !== void 0 ? optionsSessionStorage : new TJSSessionStorage();
  }
  /**
   * Initializes reactive support. Package private for internal use.
   *
   * @returns {SvelteReactiveStores | undefined} Internal methods to interact with Svelte stores.
   * @package
   * @internal
   */
  initialize() {
    if (this.#initialized) {
      return;
    }
    this.#initialized = true;
    this.#storesInitialize();
    return {
      appOptionsUpdate: this.#storeAppOptionsUpdate,
      uiStateUpdate: this.#storeUIStateUpdate,
      subscribe: this.#storesSubscribe.bind(this),
      unsubscribe: this.#storesUnsubscribe.bind(this)
    };
  }
  // Store getters -----------------------------------------------------------------------------------------------------
  /**
   * @returns {import('@typhonjs-fvtt/runtime/svelte/store/web-storage').TJSWebStorage} Returns TJSWebStorage (session) instance.
   */
  get sessionStorage() {
    return this.#sessionStorage;
  }
  /**
   * Returns the store for app options.
   *
   * @returns {import('./types').StoreAppOptions} App options store.
   */
  get storeAppOptions() {
    return this.#storeAppOptions;
  }
  /**
   * Returns the store for UI options.
   *
   * @returns {import('./types').StoreUIOptions} UI options store.
   */
  get storeUIState() {
    return this.#storeUIState;
  }
  // Only reactive getters ---------------------------------------------------------------------------------------------
  /**
   * Returns the current dragging UI state.
   *
   * @returns {boolean} Dragging UI state.
   */
  get dragging() {
    return this.#dataUIState.dragging;
  }
  /**
   * Returns the current minimized UI state.
   *
   * @returns {boolean} Minimized UI state.
   */
  get minimized() {
    return this.#dataUIState.minimized;
  }
  /**
   * Returns the current resizing UI state.
   *
   * @returns {boolean} Resizing UI state.
   */
  get resizing() {
    return this.#dataUIState.resizing;
  }
  // Reactive getter / setters -----------------------------------------------------------------------------------------
  /**
   * Returns the draggable app option.
   *
   * @returns {boolean} Draggable app option.
   */
  get draggable() {
    return this.#application?.options?.draggable;
  }
  /**
   * Returns the focusAuto app option.
   *
   * @returns {boolean} When true auto-management of app focus is enabled.
   */
  get focusAuto() {
    return this.#application?.options?.focusAuto;
  }
  /**
   * Returns the focusKeep app option.
   *
   * @returns {boolean} When `focusAuto` and `focusKeep` is true; keeps internal focus.
   */
  get focusKeep() {
    return this.#application?.options?.focusKeep;
  }
  /**
   * Returns the focusTrap app option.
   *
   * @returns {boolean} When true focus trapping / wrapping is enabled keeping focus inside app.
   */
  get focusTrap() {
    return this.#application?.options?.focusTrap;
  }
  /**
   * Returns the headerButtonNoClose app option.
   *
   * @returns {boolean} Remove the close the button in header app option.
   */
  get headerButtonNoClose() {
    return this.#application?.options?.headerButtonNoClose;
  }
  /**
   * Returns the headerButtonNoLabel app option.
   *
   * @returns {boolean} Remove the labels from buttons in header app option.
   */
  get headerButtonNoLabel() {
    return this.#application?.options?.headerButtonNoLabel;
  }
  /**
   * Returns the headerIcon app option.
   *
   * @returns {string|void} URL for header app icon.
   */
  get headerIcon() {
    return this.#application?.options?.headerIcon;
  }
  /**
   * Returns the headerNoTitleMinimized app option.
   *
   * @returns {boolean} When true removes the header title when minimized.
   */
  get headerNoTitleMinimized() {
    return this.#application?.options?.headerNoTitleMinimized;
  }
  /**
   * Returns the minimizable app option.
   *
   * @returns {boolean} Minimizable app option.
   */
  get minimizable() {
    return this.#application?.options?.minimizable;
  }
  /**
   * Returns the Foundry popOut state; {@link Application.popOut}
   *
   * @returns {boolean} Positionable app option.
   */
  get popOut() {
    return this.#application.popOut;
  }
  /**
   * Returns the positionable app option; {@link SvelteApplicationOptions.positionable}
   *
   * @returns {boolean} Positionable app option.
   */
  get positionable() {
    return this.#application?.options?.positionable;
  }
  /**
   * Returns the resizable option.
   *
   * @returns {boolean} Resizable app option.
   */
  get resizable() {
    return this.#application?.options?.resizable;
  }
  /**
   * Returns the title accessor from the parent Application class; {@link Application.title}
   * TODO: Application v2; note that super.title localizes `this.options.title`; IMHO it shouldn't.
   *
   * @returns {string} Title.
   */
  get title() {
    return this.#application.title;
  }
  /**
   * Sets `this.options.draggable` which is reactive for application shells.
   *
   * @param {boolean}  draggable - Sets the draggable option.
   */
  set draggable(draggable2) {
    if (typeof draggable2 === "boolean") {
      this.setOptions("draggable", draggable2);
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
   * @param {string | undefined}  headerIcon - Sets the headerButtonNoLabel option.
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
   * Sets `this.options.positionable` enabling / disabling {@link SvelteApplication.position}.
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
   * @param {string | undefined | null}   title - Application title; will be localized, so a translation key is fine.
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
    return safeAccess(this.#application.options, accessor, defaultValue);
  }
  /**
   * Provides a way to merge `options` into this applications options and update the appOptions store.
   *
   * @param {object}   options - The options object to merge with `this.options`.
   */
  mergeOptions(options) {
    this.#storeAppOptionsUpdate((instanceOptions) => deepMerge(instanceOptions, options));
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
   * @param {any}      value - Value to set.
   */
  setOptions(accessor, value) {
    const success = safeSet(this.#application.options, accessor, value);
    if (success) {
      this.#storeAppOptionsUpdate(() => this.#application.options);
    }
  }
  /**
   * Initializes the Svelte stores and derived stores for the application options and UI state.
   *
   * While writable stores are created the update method is stored in private variables locally and derived Readable
   * stores are provided for essential options which are commonly used.
   *
   * These stores are injected into all Svelte components mounted under the `external` context: `storeAppOptions` and
   * `storeUIState`.
   */
  #storesInitialize() {
    const writableAppOptions = writable(this.#application.options);
    this.#storeAppOptionsUpdate = writableAppOptions.update;
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
    this.#storeAppOptions = storeAppOptions;
    this.#dataUIState = {
      dragging: false,
      headerButtons: [],
      minimized: this.#application._minimized,
      resizing: false
    };
    const writableUIOptions = writable(this.#dataUIState);
    this.#storeUIStateUpdate = writableUIOptions.update;
    const storeUIState = {
      subscribe: writableUIOptions.subscribe,
      dragging: propertyStore(writableUIOptions, "dragging"),
      headerButtons: derived(writableUIOptions, ($options, set2) => set2($options.headerButtons)),
      minimized: derived(writableUIOptions, ($options, set2) => set2($options.minimized)),
      resizing: propertyStore(writableUIOptions, "resizing")
    };
    Object.freeze(storeUIState);
    this.#storeUIState = storeUIState;
  }
  /**
   * Registers local store subscriptions for app options. `popOut` controls registering this app with `ui.windows`.
   *
   * @see SvelteApplication._injectHTML
   */
  #storesSubscribe() {
    this.#storeUnsubscribe.push(subscribeIgnoreFirst(this.#storeAppOptions.headerButtonNoClose, (value) => {
      this.updateHeaderButtons({ headerButtonNoClose: value });
    }));
    this.#storeUnsubscribe.push(subscribeIgnoreFirst(this.#storeAppOptions.headerButtonNoLabel, (value) => {
      this.updateHeaderButtons({ headerButtonNoLabel: value });
    }));
    this.#storeUnsubscribe.push(subscribeIgnoreFirst(this.#storeAppOptions.popOut, (value) => {
      if (value && this.#application.rendered) {
        globalThis.ui.windows[this.#application.appId] = this.#application;
      } else {
        delete globalThis.ui.windows[this.#application.appId];
      }
    }));
  }
  /**
   * Unsubscribes from any locally monitored stores.
   *
   * @see SvelteApplication.close
   */
  #storesUnsubscribe() {
    this.#storeUnsubscribe.forEach((unsubscribe) => unsubscribe());
    this.#storeUnsubscribe = [];
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
   * @param {object} [opts] - Optional parameters (for internal use)
   *
   * @param {boolean} [opts.headerButtonNoClose] - The value for `headerButtonNoClose`.
   *
   * @param {boolean} [opts.headerButtonNoLabel] - The value for `headerButtonNoLabel`.
   */
  updateHeaderButtons({
    headerButtonNoClose = this.#application.options.headerButtonNoClose,
    headerButtonNoLabel = this.#application.options.headerButtonNoLabel
  } = {}) {
    let buttons = this.#application._getHeaderButtons();
    if (typeof headerButtonNoClose === "boolean" && headerButtonNoClose) {
      buttons = buttons.filter((button) => button.class !== "close");
    }
    if (typeof headerButtonNoLabel === "boolean" && headerButtonNoLabel) {
      for (const button of buttons) {
        button.label = void 0;
      }
    }
    this.#storeUIStateUpdate((options) => {
      options.headerButtons = buttons;
      return options;
    });
  }
}
const applicationShellContract = ["elementRoot"];
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
  const svelteConfig = parseTJSSvelteConfig({ ...config, target }, app);
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
  let element2;
  if (isApplicationShell(component)) {
    element2 = component.elementRoot;
  }
  if (target instanceof DocumentFragment && target.firstElementChild) {
    if (element2 === void 0) {
      element2 = target.firstElementChild;
    }
    template.append(target);
  } else if (config.target instanceof HTMLElement && element2 === void 0) {
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
    element2 = target.querySelector(svelteOptions.selectorElement);
    if (element2 === null || element2 === void 0) {
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
  return { config: svelteConfig, component, element: element2, injectHTML };
}
class TJSAppIndex {
  /**
   * Stores all visible / rendered apps.
   *
   * @type {Map<string, import('@typhonjs-fvtt/runtime/svelte/application').SvelteApplication>}
   */
  static #visibleApps = /* @__PURE__ */ new Map();
  /**
   * Adds a SvelteApplication to all visible apps tracked.
   *
   * @param {import('@typhonjs-fvtt/runtime/svelte/application').SvelteApplication} app - A SvelteApplication
   *
   * @package
   */
  static add(app) {
    this.#visibleApps.set(app.id, app);
  }
  /**
   * Removes a SvelteApplication from all visible apps tracked.
   *
   * @param {import('@typhonjs-fvtt/runtime/svelte/application').SvelteApplication} app - A SvelteApplication
   *
   * @package
   */
  static delete(app) {
    this.#visibleApps.delete(app.id);
  }
  /**
   * Gets a particular app by ID.
   *
   * @param {string}   key - App ID.
   *
   * @returns {import('@typhonjs-fvtt/runtime/svelte/application').SvelteApplication} Associated app.
   */
  static get(key) {
    return this.#visibleApps.get(key);
  }
  /**
   * Returns whether an associated app by ID is being tracked.
   *
   * @param {string}   key - App ID.
   *
   * @returns {boolean} The given App ID is visible.
   */
  static has(key) {
    return this.#visibleApps.has(key);
  }
  /**
   * @returns {IterableIterator<string>} All visible app IDs.
   */
  static keys() {
    return this.#visibleApps.keys();
  }
  /**
   * @returns {IterableIterator<import('@typhonjs-fvtt/runtime/svelte/application').SvelteApplication>} All visible apps.
   */
  static values() {
    return this.#visibleApps.values();
  }
}
class SvelteApplication extends Application {
  /**
   * Stores the first mounted component which follows the application shell contract.
   *
   * @type {import('./internal/state-svelte/types').MountedAppShell[]|null[]} Application shell.
   */
  #applicationShellHolder = [null];
  /**
   * Stores and manages application state for saving / restoring / serializing.
   *
   * @type {ApplicationState<SvelteApplication>}
   */
  #applicationState;
  /**
   * Stores the target element which may not necessarily be the main element.
   *
   * @type {HTMLElement}
   */
  #elementTarget = null;
  /**
   * Stores the content element which is set for application shells.
   *
   * @type {HTMLElement}
   */
  #elementContent = null;
  /**
   * Stores initial z-index from `_renderOuter` to set to target element / Svelte component.
   *
   * @type {number}
   */
  #initialZIndex = 95;
  /**
   * Stores on mount state which is checked in _render to trigger onSvelteMount callback.
   *
   * @type {boolean}
   */
  #onMount = false;
  /**
   * The position store.
   *
   * @type {TJSPosition}
   */
  #position;
  /**
   * Contains the Svelte stores and reactive accessors.
   *
   * @type {SvelteReactive}
   */
  #reactive;
  /**
   * Stores SvelteData entries with instantiated Svelte components.
   *
   * @type {import('./internal/state-svelte/types').SvelteData[]}
   */
  #svelteData = [];
  /**
   * Provides a helper class that combines multiple methods for interacting with the mounted components tracked in
   * #svelteData.
   *
   * @type {GetSvelteData}
   */
  #getSvelteData = new GetSvelteData(this.#applicationShellHolder, this.#svelteData);
  /**
   * Contains methods to interact with the Svelte stores.
   *
   * @type {import('./internal/state-reactive/SvelteReactive').SvelteReactiveStores}
   */
  #stores;
  /**
   * @param {import('@typhonjs-fvtt/runtime/svelte/application').SvelteApplicationOptions} options - The options for the application.
   *
   * @inheritDoc
   */
  constructor(options = {}) {
    super(options);
    this.#applicationState = new ApplicationState(this);
    this.#position = new TJSPosition(this, {
      ...this.position,
      ...this.options,
      initial: this.options.positionInitial,
      ortho: this.options.positionOrtho,
      validator: this.options.positionValidator
    });
    delete this.position;
    Object.defineProperty(this, "position", {
      get: () => this.#position,
      set: (position) => {
        if (isObject(position)) {
          this.#position.set(position);
        }
      }
    });
    this.#reactive = new SvelteReactive(this);
    this.#stores = this.#reactive.initialize();
  }
  /**
   * Specifies the default options that SvelteApplication supports.
   *
   * @returns {import('@typhonjs-fvtt/runtime/svelte/application').SvelteApplicationOptions} options - Application options.
   * @see https://foundryvtt.com/api/interfaces/client.ApplicationOptions.html
   *
   * @internal
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
      positionInitial: TJSPosition.Initial.browserCentered,
      // A helper for initial position placement.
      positionOrtho: true,
      // When true TJSPosition is optimized for orthographic use.
      positionValidator: TJSPosition.Validators.transformWindow,
      // A function providing the default validator.
      sessionStorage: void 0,
      // An instance of TJSWebStorage (session) to share across SvelteApplications.
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
    return this.#elementContent;
  }
  /**
   * Returns the target element or main element if no target defined.
   *
   * @returns {HTMLElement} Target element.
   */
  get elementTarget() {
    return this.#elementTarget;
  }
  /**
   * Returns the reactive accessors & Svelte stores for SvelteApplication.
   *
   * @returns {import('./internal/state-reactive/types').SvelteReactive} The reactive accessors & Svelte stores.
   */
  get reactive() {
    return this.#reactive;
  }
  /**
   * Returns the application state manager.
   *
   * @returns {import('./internal/state-app/types').ApplicationState<SvelteApplication>} The application state manager.
   */
  get state() {
    return this.#applicationState;
  }
  /**
   * Returns the Svelte helper class w/ various methods to access mounted Svelte components.
   *
   * @returns {import('./internal/state-svelte/types').GetSvelteData} GetSvelteData
   */
  get svelte() {
    return this.#getSvelteData;
  }
  /**
   * In this case of when a template is defined in app options `html` references the inner HTML / template. However,
   * to activate classic v1 tabs for a Svelte component the element target is passed as an array simulating JQuery as
   * the element is retrieved immediately and the core listeners use standard DOM queries.
   *
   * @protected
   * @ignore
   * @internal
   */
  _activateCoreListeners(html) {
    super._activateCoreListeners(typeof this.options.template === "string" ? html : [this.popOut ? this.#elementTarget?.firstChild : this.#elementTarget]);
  }
  /**
   * Provide an override to set this application as the active window regardless of z-index. Changes behaviour from
   * Foundry core. This is important / used for instance in dialog key handling for left / right button selection.
   *
   * @param {object} [opts] - Optional parameters.
   *
   * @param {boolean} [opts.force=false] - Force bring to top; will increment z-index by popOut order.
   *
   * @ignore
   * @internal
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
   *
   * @ignore
   * @internal
   */
  async close(options = {}) {
    const states = Application.RENDER_STATES;
    if (!options.force && ![states.RENDERED, states.ERROR].includes(this._state)) {
      return;
    }
    this.#stores.unsubscribe();
    this._state = states.CLOSING;
    const el = this.#elementTarget;
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
      Hooks.call(`close${cls.name}`, this, $(el));
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
    for (const entry of this.#svelteData) {
      svelteDestroyPromises.push(outroAndDestroy(entry.component));
      const eventbus = entry.config.eventbus;
      if (isObject(eventbus) && typeof eventbus.off === "function") {
        eventbus.off();
        entry.config.eventbus = void 0;
      }
    }
    await Promise.all(svelteDestroyPromises);
    TJSAppIndex.delete(this);
    this.#svelteData.length = 0;
    el.remove();
    this.position.state.restore({
      name: "#beforeMinimized",
      properties: ["width", "height"],
      silent: true,
      remove: true
    });
    this.#applicationShellHolder[0] = null;
    this._element = null;
    this.#elementContent = null;
    this.#elementTarget = null;
    delete globalThis.ui.windows[this.appId];
    this._minimized = false;
    this._scrollPositions = null;
    this._state = states.CLOSED;
    this.#onMount = false;
    this.#stores.uiStateUpdate((storeOptions) => deepMerge(storeOptions, { minimized: this._minimized }));
    A11yHelper.applyFocusSource(this.options.focusSource);
    delete this.options.focusSource;
  }
  /**
   * Inject the Svelte components defined in `this.options.svelte`. The Svelte component can attach to the existing
   * pop-out of Application or provide no template and render into a document fragment which is then attached to the
   * DOM.
   *
   * @protected
   * @ignore
   * @internal
   */
  _injectHTML(html) {
    if (this.popOut && html.length === 0 && isIterable(this.options.svelte)) {
      throw new Error(
        "SvelteApplication - _injectHTML - A popout app with no template can only support one Svelte component."
      );
    }
    this.reactive.updateHeaderButtons();
    const elementRootUpdate = () => {
      let cntr = 0;
      return (elementRoot) => {
        if (elementRoot !== null && elementRoot !== void 0 && cntr++ > 0) {
          this.#updateApplicationShell();
          return true;
        }
        return false;
      };
    };
    if (isIterable(this.options.svelte)) {
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
          this.#applicationShellHolder[0] = svelteData.component;
          if (isHMRProxy(svelteData.component) && Array.isArray(svelteData.component?.$$?.on_hmr)) {
            svelteData.component.$$.on_hmr.push(() => () => this.#updateApplicationShell());
          }
        }
        this.#svelteData.push(svelteData);
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
        this.#applicationShellHolder[0] = svelteData.component;
        if (isHMRProxy(svelteData.component) && Array.isArray(svelteData.component?.$$?.on_hmr)) {
          svelteData.component.$$.on_hmr.push(() => () => this.#updateApplicationShell());
        }
      }
      this.#svelteData.push(svelteData);
    }
    const isDocumentFragment = html.length && html[0] instanceof DocumentFragment;
    let injectHTML = true;
    for (const svelteData of this.#svelteData) {
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
      this.#elementContent = hasGetter(this.svelte.applicationShell, "elementContent") ? this.svelte.applicationShell.elementContent : null;
      this.#elementTarget = hasGetter(this.svelte.applicationShell, "elementTarget") ? this.svelte.applicationShell.elementTarget : null;
    } else if (isDocumentFragment) {
      for (const svelteData of this.#svelteData) {
        if (svelteData.element instanceof HTMLElement) {
          this._element = $(svelteData.element);
          break;
        }
      }
    }
    if (this.#elementTarget === null) {
      this.#elementTarget = typeof this.options.selectorTarget === "string" ? this._element[0].querySelector(this.options.selectorTarget) : this._element[0];
    }
    if (this.#elementTarget === null || this.#elementTarget === void 0) {
      throw new Error(`SvelteApplication - _injectHTML: Target element '${this.options.selectorTarget}' not found.`);
    }
    if (typeof this.options.positionable === "boolean" && this.options.positionable) {
      this.#elementTarget.style.zIndex = typeof this.options.zIndex === "number" ? this.options.zIndex : this.#initialZIndex ?? 95;
    }
    this.#stores.subscribe();
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
    if (!this.popOut || [false, null].includes(this._minimized)) {
      return;
    }
    this._minimized = null;
    const durationMS = duration * 1e3;
    const element2 = this.elementTarget;
    const header = element2.querySelector(".window-header");
    const content = element2.querySelector(".window-content");
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
    element2.classList.remove("minimized");
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
      minHeight: positionBefore.minHeight ?? this.options?.minHeight ?? MIN_WINDOW_HEIGHT,
      minWidth: positionBefore.minWidth ?? this.options?.minWidth ?? MIN_WINDOW_WIDTH
    });
    element2.style.minWidth = null;
    element2.style.minHeight = null;
    this._minimized = false;
    setTimeout(() => {
      content.style.overflow = null;
      for (let cntr = content.children.length; --cntr >= 0; ) {
        content.children[cntr].style.overflow = null;
      }
    }, 50);
    this.#stores.uiStateUpdate((options) => deepMerge(options, { minimized: false }));
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
    this.#stores.uiStateUpdate((options) => deepMerge(options, { minimized: true }));
    this._minimized = null;
    const durationMS = duration * 1e3;
    const element2 = this.elementTarget;
    const header = element2.querySelector(".window-header");
    const content = element2.querySelector(".window-content");
    const beforeMinWidth = this.position.minWidth;
    const beforeMinHeight = this.position.minHeight;
    this.position.set({ minWidth: 100, minHeight: 30 });
    element2.style.minWidth = "100px";
    element2.style.minHeight = "30px";
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
    element2.classList.add("minimized");
    this._minimized = true;
  }
  /**
   * Provides a callback after all Svelte components are initialized.
   *
   * @param {import('./internal/state-svelte/types').MountedAppShell} [mountedAppShell] - The mounted app shell
   *        elements.
   */
  onSvelteMount(mountedAppShell) {
  }
  // eslint-disable-line no-unused-vars
  /**
   * Provides a callback after the main application shell is remounted. This may occur during HMR / hot module
   * replacement or directly invoked from the `elementRootUpdate` callback passed to the application shell component
   * context.
   *
   * @param {import('./internal/state-svelte/types').MountedAppShell} [mountedAppShell] - The mounted app shell
   *        elements.
   */
  onSvelteRemount(mountedAppShell) {
  }
  // eslint-disable-line no-unused-vars
  /**
   * Override replacing HTML as Svelte components control the rendering process. Only potentially change the outer
   * application frame / title for pop-out applications.
   *
   * @protected
   * @ignore
   * @internal
   */
  _replaceHTML(element2, html) {
    if (!element2.length) {
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
   * cycle {@link TJSPosition.set}.
   *
   * @protected
   * @ignore
   * @internal
   */
  async _render(force = false, options = {}) {
    if (isObject(options?.focusSource)) {
      this.options.focusSource = options.focusSource;
    }
    if (this._state === Application.RENDER_STATES.NONE && document.querySelector(`#${this.id}`) instanceof HTMLElement) {
      console.warn(`SvelteApplication - _render: A DOM element already exists for CSS ID '${this.id}'. Cancelling initial render for new application with appId '${this.appId}'.`);
      return;
    }
    await super._render(force, options);
    if ([Application.RENDER_STATES.CLOSING, Application.RENDER_STATES.RENDERING].includes(this._state)) {
      return;
    }
    if (!force && this._state <= Application.RENDER_STATES.NONE) {
      return;
    }
    if (!this._minimized) {
      this.#position.set(options);
    }
    if (!this.#onMount) {
      TJSAppIndex.add(this);
      this.onSvelteMount({ element: this._element[0], elementContent: this.#elementContent, elementTarget: this.#elementTarget });
      this.#onMount = true;
    }
  }
  /**
   * Render the inner application content. Only render a template if one is defined otherwise provide an empty
   * JQuery element per the core Foundry API.
   *
   * @protected
   * @ignore
   * @internal
   */
  async _renderInner(data) {
    const html = typeof this.template === "string" ? await renderTemplate(this.template, data) : document.createDocumentFragment();
    return $(html);
  }
  /**
   * Stores the initial z-index set in `_renderOuter` which is used in `_injectHTML` to set the target element
   * z-index after the Svelte component is mounted.
   *
   * @protected
   * @ignore
   * @internal
   */
  async _renderOuter() {
    const html = await super._renderOuter();
    this.#initialZIndex = html[0].style.zIndex;
    return html;
  }
  /**
   * All calculation and updates of position are implemented in {@link TJSPosition.set}. This allows position to be fully
   * reactive and in control of updating inline styles for the application.
   *
   * This method remains for backward compatibility with Foundry. If you have a custom override quite likely you need
   * to update to using the {@link TJSPosition.validators} functionality.
   *
   * @param {import('@typhonjs-fvtt/runtime/svelte/store/position').TJSPositionDataExtended}   [position] - TJSPosition data.
   *
   * @returns {TJSPosition} The updated position object for the application containing the new values.
   * @ignore
   */
  setPosition(position) {
    return this.position.set(position);
  }
  /**
   * This method is invoked by the `elementRootUpdate` callback that is added to the external context passed to
   * Svelte components. When invoked it updates the local element roots tracked by SvelteApplication.
   *
   * This method may also be invoked by HMR / hot module replacement via `svelte-hmr`.
   */
  #updateApplicationShell() {
    const applicationShell = this.svelte.applicationShell;
    if (applicationShell !== null) {
      this._element = $(applicationShell.elementRoot);
      this.#elementContent = hasGetter(applicationShell, "elementContent") ? applicationShell.elementContent : null;
      this.#elementTarget = hasGetter(applicationShell, "elementTarget") ? applicationShell.elementTarget : null;
      if (this.#elementTarget === null) {
        this.#elementTarget = typeof this.options.selectorTarget === "string" ? this._element[0].querySelector(this.options.selectorTarget) : this._element[0];
      }
      if (typeof this.options.positionable === "boolean" && this.options.positionable) {
        this.#elementTarget.style.zIndex = typeof this.options.zIndex === "number" ? this.options.zIndex : this.#initialZIndex ?? 95;
        super.bringToTop();
        this.position.set(this.position.get());
      }
      super._activateCoreListeners([this.popOut ? this.#elementTarget?.firstChild : this.#elementTarget]);
      this.onSvelteRemount({ element: this._element[0], elementContent: this.#elementContent, elementTarget: this.#elementTarget });
    }
  }
}
const cssVariables$1 = new TJSStyleManager({ docKey: "#__trl-root-styles", version: 1 });
if (typeof window !== "undefined")
  (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);
class Hashing {
  static #regexUuidv = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  /**
   * Provides a solid string hashing algorithm.
   *
   * Sourced from: https://stackoverflow.com/a/52171480
   *
   * @param {string}   str - String to hash.
   *
   * @param {number}   seed - A seed value altering the hash.
   *
   * @returns {number} Hash code.
   */
  static hashCode(str, seed = 0) {
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
  /**
   * Validates that the given string is formatted as a UUIDv4 string.
   *
   * @param {string}   uuid - UUID string to test.
   *
   * @returns {boolean} Is UUIDv4 string.
   */
  static isUuidv4(uuid) {
    return this.#regexUuidv.test(uuid);
  }
  /**
   * Generates a UUID v4 compliant ID. Please use a complete UUID generation package for guaranteed compliance.
   *
   * This code is an evolution of the following Gist.
   * https://gist.github.com/jed/982883
   *
   * There is a public domain / free copy license attached to it that is not a standard OSS license...
   * https://gist.github.com/jed/982883#file-license-txt
   *
   * @returns {string} UUIDv4
   */
  static uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ (globalThis.crypto ?? globalThis.msCrypto).getRandomValues(
      new Uint8Array(1)
    )[0] & 15 >> c / 4).toString(16));
  }
}
function resizeObserver(node, target) {
  ResizeObserverManager.add(node, target);
  return {
    /**
     * @param {ResizeObserverTarget} newTarget - An object or function to update with observed width & height changes.
     */
    update: (newTarget) => {
      ResizeObserverManager.remove(node, target);
      target = newTarget;
      ResizeObserverManager.add(node, target);
    },
    destroy: () => {
      ResizeObserverManager.remove(node, target);
    }
  };
}
resizeObserver.updateCache = function(el) {
  if (!(el instanceof HTMLElement)) {
    throw new TypeError(`resizeObserverUpdate error: 'el' is not an HTMLElement.`);
  }
  const subscribers = s_MAP.get(el);
  if (Array.isArray(subscribers)) {
    const computed = globalThis.getComputedStyle(el);
    const borderBottom = StyleParse.pixels(el.style.borderBottom) ?? StyleParse.pixels(computed.borderBottom) ?? 0;
    const borderLeft = StyleParse.pixels(el.style.borderLeft) ?? StyleParse.pixels(computed.borderLeft) ?? 0;
    const borderRight = StyleParse.pixels(el.style.borderRight) ?? StyleParse.pixels(computed.borderRight) ?? 0;
    const borderTop = StyleParse.pixels(el.style.borderTop) ?? StyleParse.pixels(computed.borderTop) ?? 0;
    const paddingBottom = StyleParse.pixels(el.style.paddingBottom) ?? StyleParse.pixels(computed.paddingBottom) ?? 0;
    const paddingLeft = StyleParse.pixels(el.style.paddingLeft) ?? StyleParse.pixels(computed.paddingLeft) ?? 0;
    const paddingRight = StyleParse.pixels(el.style.paddingRight) ?? StyleParse.pixels(computed.paddingRight) ?? 0;
    const paddingTop = StyleParse.pixels(el.style.paddingTop) ?? StyleParse.pixels(computed.paddingTop) ?? 0;
    const additionalWidth = borderLeft + borderRight + paddingLeft + paddingRight;
    const additionalHeight = borderTop + borderBottom + paddingTop + paddingBottom;
    for (const subscriber of subscribers) {
      subscriber.styles.additionalWidth = additionalWidth;
      subscriber.styles.additionalHeight = additionalHeight;
      s_UPDATE_SUBSCRIBER(subscriber, subscriber.contentWidth, subscriber.contentHeight);
    }
  }
};
const s_MAP = /* @__PURE__ */ new Map();
class ResizeObserverManager {
  /**
   * Add an HTMLElement and ResizeObserverTarget instance for monitoring. Create cached style attributes for the
   * given element include border & padding dimensions for offset width / height calculations.
   *
   * @param {HTMLElement}    el - The element to observe.
   *
   * @param {ResizeObserverTarget} target - A target that contains one of several mechanisms for updating resize data.
   */
  static add(el, target) {
    const updateType = s_GET_UPDATE_TYPE(target);
    if (updateType === 0) {
      throw new Error(`'target' does not match supported ResizeObserverManager update mechanisms.`);
    }
    const computed = globalThis.getComputedStyle(el);
    const borderBottom = StyleParse.pixels(el.style.borderBottom) ?? StyleParse.pixels(computed.borderBottom) ?? 0;
    const borderLeft = StyleParse.pixels(el.style.borderLeft) ?? StyleParse.pixels(computed.borderLeft) ?? 0;
    const borderRight = StyleParse.pixels(el.style.borderRight) ?? StyleParse.pixels(computed.borderRight) ?? 0;
    const borderTop = StyleParse.pixels(el.style.borderTop) ?? StyleParse.pixels(computed.borderTop) ?? 0;
    const paddingBottom = StyleParse.pixels(el.style.paddingBottom) ?? StyleParse.pixels(computed.paddingBottom) ?? 0;
    const paddingLeft = StyleParse.pixels(el.style.paddingLeft) ?? StyleParse.pixels(computed.paddingLeft) ?? 0;
    const paddingRight = StyleParse.pixels(el.style.paddingRight) ?? StyleParse.pixels(computed.paddingRight) ?? 0;
    const paddingTop = StyleParse.pixels(el.style.paddingTop) ?? StyleParse.pixels(computed.paddingTop) ?? 0;
    const data = {
      updateType,
      target,
      // Stores most recent contentRect.width and contentRect.height values from ResizeObserver.
      contentWidth: 0,
      contentHeight: 0,
      // Convenience data for total border & padding for offset width & height calculations.
      styles: {
        additionalWidth: borderLeft + borderRight + paddingLeft + paddingRight,
        additionalHeight: borderTop + borderBottom + paddingTop + paddingBottom
      }
    };
    if (s_MAP.has(el)) {
      const subscribers = s_MAP.get(el);
      subscribers.push(data);
    } else {
      s_MAP.set(el, [data]);
    }
    s_RESIZE_OBSERVER.observe(el);
  }
  /**
   * Removes all targets from monitoring when just an element is provided otherwise removes a specific target
   * from the monitoring map. If no more targets remain then the element is removed from monitoring.
   *
   * @param {HTMLElement}          el - Element to remove from monitoring.
   *
   * @param {ResizeObserverTarget} [target] - A specific target to remove from monitoring.
   */
  static remove(el, target = void 0) {
    const subscribers = s_MAP.get(el);
    if (Array.isArray(subscribers)) {
      const index = subscribers.findIndex((entry) => entry.target === target);
      if (index >= 0) {
        s_UPDATE_SUBSCRIBER(subscribers[index], void 0, void 0);
        subscribers.splice(index, 1);
      }
      if (subscribers.length === 0) {
        s_MAP.delete(el);
        s_RESIZE_OBSERVER.unobserve(el);
      }
    }
  }
}
const s_UPDATE_TYPES = {
  none: 0,
  attribute: 1,
  function: 2,
  resizeObserved: 3,
  setContentBounds: 4,
  setDimension: 5,
  storeObject: 6,
  storesObject: 7
};
const s_RESIZE_OBSERVER = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const subscribers = s_MAP.get(entry?.target);
    if (Array.isArray(subscribers)) {
      const contentWidth = entry.contentRect.width;
      const contentHeight = entry.contentRect.height;
      for (const subscriber of subscribers) {
        s_UPDATE_SUBSCRIBER(subscriber, contentWidth, contentHeight);
      }
    }
  }
});
function s_GET_UPDATE_TYPE(target) {
  if (target?.resizeObserved instanceof Function) {
    return s_UPDATE_TYPES.resizeObserved;
  }
  if (target?.setDimension instanceof Function) {
    return s_UPDATE_TYPES.setDimension;
  }
  if (target?.setContentBounds instanceof Function) {
    return s_UPDATE_TYPES.setContentBounds;
  }
  const targetType = typeof target;
  if (targetType !== null && (targetType === "object" || targetType === "function")) {
    if (isUpdatableStore(target.resizeObserved)) {
      return s_UPDATE_TYPES.storeObject;
    }
    const stores = target?.stores;
    if (isObject(stores) || typeof stores === "function") {
      if (isUpdatableStore(stores.resizeObserved)) {
        return s_UPDATE_TYPES.storesObject;
      }
    }
  }
  if (targetType !== null && targetType === "object") {
    return s_UPDATE_TYPES.attribute;
  }
  if (targetType === "function") {
    return s_UPDATE_TYPES.function;
  }
  return s_UPDATE_TYPES.none;
}
function s_UPDATE_SUBSCRIBER(subscriber, contentWidth, contentHeight) {
  const styles = subscriber.styles;
  subscriber.contentWidth = contentWidth;
  subscriber.contentHeight = contentHeight;
  const offsetWidth = Number.isFinite(contentWidth) ? contentWidth + styles.additionalWidth : void 0;
  const offsetHeight = Number.isFinite(contentHeight) ? contentHeight + styles.additionalHeight : void 0;
  const target = subscriber.target;
  switch (subscriber.updateType) {
    case s_UPDATE_TYPES.attribute:
      target.contentWidth = contentWidth;
      target.contentHeight = contentHeight;
      target.offsetWidth = offsetWidth;
      target.offsetHeight = offsetHeight;
      break;
    case s_UPDATE_TYPES.function:
      target?.(offsetWidth, offsetHeight, contentWidth, contentHeight);
      break;
    case s_UPDATE_TYPES.resizeObserved:
      target.resizeObserved?.(offsetWidth, offsetHeight, contentWidth, contentHeight);
      break;
    case s_UPDATE_TYPES.setContentBounds:
      target.setContentBounds?.(contentWidth, contentHeight);
      break;
    case s_UPDATE_TYPES.setDimension:
      target.setDimension?.(offsetWidth, offsetHeight);
      break;
    case s_UPDATE_TYPES.storeObject:
      target.resizeObserved.update((object) => {
        object.contentHeight = contentHeight;
        object.contentWidth = contentWidth;
        object.offsetHeight = offsetHeight;
        object.offsetWidth = offsetWidth;
        return object;
      });
      break;
    case s_UPDATE_TYPES.storesObject:
      target.stores.resizeObserved.update((object) => {
        object.contentHeight = contentHeight;
        object.contentWidth = contentWidth;
        object.offsetHeight = offsetHeight;
        object.offsetWidth = offsetWidth;
        return object;
      });
      break;
  }
}
function applyStyles(node, properties) {
  function setProperties() {
    if (!isObject(properties)) {
      return;
    }
    for (const prop of Object.keys(properties)) {
      node.style.setProperty(`${prop}`, properties[prop]);
    }
  }
  setProperties();
  return {
    /**
     * @param {Record<string, string>}  newProperties - Key / value object of properties to set.
     */
    update: (newProperties) => {
      properties = newProperties;
      setProperties();
    }
  };
}
function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}
function slide(node, { delay = 0, duration = 400, easing = cubicOut, axis = "y" } = {}) {
  const style2 = getComputedStyle(node);
  const opacity = +style2.opacity;
  const primary_property = axis === "y" ? "height" : "width";
  const primary_property_value = parseFloat(style2[primary_property]);
  const secondary_properties = axis === "y" ? ["top", "bottom"] : ["left", "right"];
  const capitalized_secondary_properties = secondary_properties.map(
    (e) => `${e[0].toUpperCase()}${e.slice(1)}`
  );
  const padding_start_value = parseFloat(style2[`padding${capitalized_secondary_properties[0]}`]);
  const padding_end_value = parseFloat(style2[`padding${capitalized_secondary_properties[1]}`]);
  const margin_start_value = parseFloat(style2[`margin${capitalized_secondary_properties[0]}`]);
  const margin_end_value = parseFloat(style2[`margin${capitalized_secondary_properties[1]}`]);
  const border_width_start_value = parseFloat(
    style2[`border${capitalized_secondary_properties[0]}Width`]
  );
  const border_width_end_value = parseFloat(
    style2[`border${capitalized_secondary_properties[1]}Width`]
  );
  return {
    delay,
    duration,
    easing,
    css: (t) => `overflow: hidden;opacity: ${Math.min(t * 20, 1) * opacity};${primary_property}: ${t * primary_property_value}px;padding-${secondary_properties[0]}: ${t * padding_start_value}px;padding-${secondary_properties[1]}: ${t * padding_end_value}px;margin-${secondary_properties[0]}: ${t * margin_start_value}px;margin-${secondary_properties[1]}: ${t * margin_end_value}px;border-${secondary_properties[0]}-width: ${t * border_width_start_value}px;border-${secondary_properties[1]}-width: ${t * border_width_end_value}px;`
  };
}
class TJSDefaultTransition {
  static #options = {};
  static #default = () => void 0;
  /**
   * @returns {() => undefined} Default empty transition.
   */
  static get default() {
    return this.#default;
  }
  /**
   * @returns {{}} Default empty options.
   */
  static get options() {
    return this.#options;
  }
}
const TJSGlassPane_svelte_svelte_type_style_lang = "";
function create_else_block$7(ctx) {
  let div;
  let applyStyles_action;
  let div_intro;
  let div_outro;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[20].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[19],
    null
  );
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      attr(div, "class", "tjs-glass-pane-background svelte-lbvtt-hqedxf");
      set_style(
        div,
        "background",
        /*background*/
        ctx[5]
      );
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      ctx[23](div);
      current = true;
      if (!mounted) {
        dispose = action_destroyer(applyStyles_action = applyStyles.call(
          null,
          div,
          /*styles*/
          ctx[7]
        ));
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        524288)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx,
            /*$$scope*/
            ctx[19],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx[19]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx[19],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (applyStyles_action && is_function(applyStyles_action.update) && dirty & /*styles*/
      128)
        applyStyles_action.update.call(
          null,
          /*styles*/
          ctx[7]
        );
      if (dirty & /*background*/
      32) {
        set_style(
          div,
          "background",
          /*background*/
          ctx[5]
        );
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      add_render_callback(() => {
        if (!current)
          return;
        if (div_outro)
          div_outro.end(1);
        div_intro = create_in_transition(
          div,
          /*inTransition*/
          ctx[1],
          /*inTransitionOptions*/
          ctx[3]
        );
        div_intro.start();
      });
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      if (div_intro)
        div_intro.invalidate();
      div_outro = create_out_transition(
        div,
        /*outTransition*/
        ctx[2],
        /*outTransitionOptions*/
        ctx[4]
      );
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (default_slot)
        default_slot.d(detaching);
      ctx[23](null);
      if (detaching && div_outro)
        div_outro.end();
      mounted = false;
      dispose();
    }
  };
}
function create_if_block$g(ctx) {
  let div0;
  let applyStyles_action;
  let div0_intro;
  let div0_outro;
  let t;
  let div1;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[20].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[19],
    null
  );
  return {
    c() {
      div0 = element("div");
      t = space();
      div1 = element("div");
      if (default_slot)
        default_slot.c();
      attr(div0, "class", "tjs-glass-pane-background svelte-lbvtt-hqedxf");
      set_style(
        div0,
        "background",
        /*background*/
        ctx[5]
      );
      attr(div1, "class", "tjs-glass-pane-container svelte-lbvtt-hqedxf");
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      ctx[21](div0);
      insert(target, t, anchor);
      insert(target, div1, anchor);
      if (default_slot) {
        default_slot.m(div1, null);
      }
      ctx[22](div1);
      current = true;
      if (!mounted) {
        dispose = action_destroyer(applyStyles_action = applyStyles.call(
          null,
          div0,
          /*styles*/
          ctx[7]
        ));
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (applyStyles_action && is_function(applyStyles_action.update) && dirty & /*styles*/
      128)
        applyStyles_action.update.call(
          null,
          /*styles*/
          ctx[7]
        );
      if (dirty & /*background*/
      32) {
        set_style(
          div0,
          "background",
          /*background*/
          ctx[5]
        );
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        524288)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx,
            /*$$scope*/
            ctx[19],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx[19]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx[19],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      add_render_callback(() => {
        if (!current)
          return;
        if (div0_outro)
          div0_outro.end(1);
        div0_intro = create_in_transition(
          div0,
          /*inTransition*/
          ctx[1],
          /*inTransitionOptions*/
          ctx[3]
        );
        div0_intro.start();
      });
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      if (div0_intro)
        div0_intro.invalidate();
      div0_outro = create_out_transition(
        div0,
        /*outTransition*/
        ctx[2],
        /*outTransitionOptions*/
        ctx[4]
      );
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div0);
        detach(t);
        detach(div1);
      }
      ctx[21](null);
      if (detaching && div0_outro)
        div0_outro.end();
      if (default_slot)
        default_slot.d(detaching);
      ctx[22](null);
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$B(ctx) {
  let div;
  let current_block_type_index;
  let if_block;
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block$g, create_else_block$7];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*slotSeparate*/
      ctx2[0]
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      div = element("div");
      if_block.c();
      attr(
        div,
        "id",
        /*id*/
        ctx[6]
      );
      attr(div, "class", "tjs-glass-pane svelte-lbvtt-hqedxf");
      set_style(
        div,
        "z-index",
        /*zIndex*/
        ctx[8]
      );
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if_blocks[current_block_type_index].m(div, null);
      ctx[24](div);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            window,
            "contextmenu",
            /*swallow*/
            ctx[12],
            true
          ),
          listen(
            window,
            "dblclick",
            /*swallow*/
            ctx[12],
            true
          ),
          listen(
            window,
            "keydown",
            /*swallow*/
            ctx[12],
            true
          ),
          listen(
            window,
            "keyup",
            /*swallow*/
            ctx[12],
            true
          ),
          listen(
            window,
            "mousedown",
            /*swallow*/
            ctx[12],
            true
          ),
          listen(
            window,
            "mousemove",
            /*swallow*/
            ctx[12],
            true
          ),
          listen(
            window,
            "mouseup",
            /*swallow*/
            ctx[12],
            true
          ),
          listen(
            window,
            "pointerdown",
            /*swallow*/
            ctx[12],
            true
          ),
          listen(
            window,
            "pointermove",
            /*swallow*/
            ctx[12],
            true
          ),
          listen(
            window,
            "pointerup",
            /*swallow*/
            ctx[12],
            true
          ),
          listen(
            window,
            "touchend",
            /*swallow*/
            ctx[12],
            true
          ),
          listen(
            window,
            "touchmove",
            /*swallow*/
            ctx[12],
            true
          ),
          listen(
            window,
            "touchstart",
            /*swallow*/
            ctx[12],
            true
          ),
          listen(
            window,
            "wheel",
            /*swallow*/
            ctx[12],
            true
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
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
        if_block.m(div, null);
      }
      if (!current || dirty & /*id*/
      64) {
        attr(
          div,
          "id",
          /*id*/
          ctx2[6]
        );
      }
      if (dirty & /*zIndex*/
      256) {
        set_style(
          div,
          "z-index",
          /*zIndex*/
          ctx2[8]
        );
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if_blocks[current_block_type_index].d();
      ctx[24](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$B($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { background = "#50505080" } = $$props;
  let { captureInput = true } = $$props;
  let { closeOnInput = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { slotSeparate = void 0 } = $$props;
  let { styles = void 0 } = $$props;
  let { zIndex = Number.MAX_SAFE_INTEGER } = $$props;
  const dispatch2 = createEventDispatcher();
  let backgroundEl, containerEl, glassPaneEl;
  let { transition = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { transitionOptions = void 0 } = $$props;
  let { inTransitionOptions = TJSDefaultTransition.options } = $$props;
  let { outTransitionOptions = TJSDefaultTransition.options } = $$props;
  let oldTransition = void 0;
  let oldTransitionOptions = void 0;
  function swallow(event) {
    const targetEl = event.target;
    if (targetEl !== glassPaneEl && targetEl !== backgroundEl && targetEl !== containerEl && glassPaneEl.contains(targetEl)) {
      return;
    }
    if (captureInput) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
    if (event?.type === "pointerdown" && closeOnInput) {
      dispatch2("close:glasspane");
    }
  }
  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      backgroundEl = $$value;
      $$invalidate(9, backgroundEl);
    });
  }
  function div1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      containerEl = $$value;
      $$invalidate(10, containerEl);
    });
  }
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      backgroundEl = $$value;
      $$invalidate(9, backgroundEl);
    });
  }
  function div_binding_1($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      glassPaneEl = $$value;
      $$invalidate(11, glassPaneEl);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("background" in $$props2)
      $$invalidate(5, background = $$props2.background);
    if ("captureInput" in $$props2)
      $$invalidate(13, captureInput = $$props2.captureInput);
    if ("closeOnInput" in $$props2)
      $$invalidate(14, closeOnInput = $$props2.closeOnInput);
    if ("id" in $$props2)
      $$invalidate(6, id = $$props2.id);
    if ("slotSeparate" in $$props2)
      $$invalidate(0, slotSeparate = $$props2.slotSeparate);
    if ("styles" in $$props2)
      $$invalidate(7, styles = $$props2.styles);
    if ("zIndex" in $$props2)
      $$invalidate(8, zIndex = $$props2.zIndex);
    if ("transition" in $$props2)
      $$invalidate(15, transition = $$props2.transition);
    if ("inTransition" in $$props2)
      $$invalidate(1, inTransition = $$props2.inTransition);
    if ("outTransition" in $$props2)
      $$invalidate(2, outTransition = $$props2.outTransition);
    if ("transitionOptions" in $$props2)
      $$invalidate(16, transitionOptions = $$props2.transitionOptions);
    if ("inTransitionOptions" in $$props2)
      $$invalidate(3, inTransitionOptions = $$props2.inTransitionOptions);
    if ("outTransitionOptions" in $$props2)
      $$invalidate(4, outTransitionOptions = $$props2.outTransitionOptions);
    if ("$$scope" in $$props2)
      $$invalidate(19, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*slotSeparate*/
    1) {
      $$invalidate(0, slotSeparate = typeof slotSeparate === "boolean" ? slotSeparate : false);
    }
    if ($$self.$$.dirty & /*oldTransition, transition*/
    163840) {
      if (oldTransition !== transition) {
        const newTransition = typeof transition === "function" ? transition : void 0;
        $$invalidate(1, inTransition = newTransition);
        $$invalidate(2, outTransition = newTransition);
        $$invalidate(17, oldTransition = newTransition);
      }
    }
    if ($$self.$$.dirty & /*oldTransitionOptions, transitionOptions*/
    327680) {
      if (oldTransitionOptions !== transitionOptions) {
        const newOptions = transitionOptions !== TJSDefaultTransition.options && isObject(transitionOptions) ? transitionOptions : TJSDefaultTransition.options;
        $$invalidate(3, inTransitionOptions = newOptions);
        $$invalidate(4, outTransitionOptions = newOptions);
        $$invalidate(18, oldTransitionOptions = newOptions);
      }
    }
    if ($$self.$$.dirty & /*inTransition*/
    2) {
      if (typeof inTransition !== "function") {
        $$invalidate(1, inTransition = void 0);
      }
    }
    if ($$self.$$.dirty & /*outTransition*/
    4) {
      if (typeof outTransition !== "function") {
        $$invalidate(2, outTransition = void 0);
      }
    }
    if ($$self.$$.dirty & /*inTransitionOptions*/
    8) {
      if (!isObject(inTransitionOptions)) {
        $$invalidate(3, inTransitionOptions = TJSDefaultTransition.options);
      }
    }
    if ($$self.$$.dirty & /*outTransitionOptions*/
    16) {
      if (!isObject(outTransitionOptions)) {
        $$invalidate(4, outTransitionOptions = TJSDefaultTransition.options);
      }
    }
  };
  return [
    slotSeparate,
    inTransition,
    outTransition,
    inTransitionOptions,
    outTransitionOptions,
    background,
    id,
    styles,
    zIndex,
    backgroundEl,
    containerEl,
    glassPaneEl,
    swallow,
    captureInput,
    closeOnInput,
    transition,
    transitionOptions,
    oldTransition,
    oldTransitionOptions,
    $$scope,
    slots,
    div0_binding,
    div1_binding,
    div_binding,
    div_binding_1
  ];
}
class TJSGlassPane extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$B, create_fragment$B, safe_not_equal, {
      background: 5,
      captureInput: 13,
      closeOnInput: 14,
      id: 6,
      slotSeparate: 0,
      styles: 7,
      zIndex: 8,
      transition: 15,
      inTransition: 1,
      outTransition: 2,
      transitionOptions: 16,
      inTransitionOptions: 3,
      outTransitionOptions: 4
    });
  }
}
const TJSGlassPane$1 = TJSGlassPane;
class AppShellContextInternal {
  /** @type {InternalAppStores} */
  #stores;
  constructor() {
    this.#stores = {
      elementContent: writable(void 0),
      elementRoot: writable(void 0)
    };
    Object.freeze(this.#stores);
    Object.seal(this);
  }
  /**
   * @returns {InternalAppStores} The internal context stores for elementContent / elementRoot
   */
  get stores() {
    return this.#stores;
  }
}
function localize(stringId, data) {
  const result = !isObject(data) ? globalThis.game.i18n.localize(stringId) : globalThis.game.i18n.format(stringId, data);
  return result !== void 0 ? result : "";
}
const TJSHeaderButton_svelte_svelte_type_style_lang = "";
function create_if_block$f(ctx) {
  let span;
  let t;
  return {
    c() {
      span = element("span");
      t = text(
        /*label*/
        ctx[3]
      );
      attr(span, "class", "svelte-lbvtt-166l8wd");
      toggle_class(
        span,
        "has-icon",
        /*icon*/
        ctx[4] !== void 0
      );
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*label*/
      8)
        set_data(
          t,
          /*label*/
          ctx2[3]
        );
      if (dirty & /*icon*/
      16) {
        toggle_class(
          span,
          "has-icon",
          /*icon*/
          ctx2[4] !== void 0
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_fragment$A(ctx) {
  let a;
  let html_tag;
  let html_anchor;
  let a_class_value;
  let applyStyles_action;
  let mounted;
  let dispose;
  let if_block = (
    /*label*/
    ctx[3] && create_if_block$f(ctx)
  );
  return {
    c() {
      a = element("a");
      html_tag = new HtmlTag(false);
      html_anchor = empty();
      if (if_block)
        if_block.c();
      html_tag.a = html_anchor;
      attr(a, "class", a_class_value = "header-button " + /*button*/
      ctx[0].class + " svelte-lbvtt-166l8wd");
      attr(
        a,
        "aria-label",
        /*label*/
        ctx[3]
      );
      attr(a, "tabindex", "0");
      attr(a, "role", "button");
      toggle_class(
        a,
        "keep-minimized",
        /*keepMinimized*/
        ctx[2]
      );
    },
    m(target, anchor) {
      insert(target, a, anchor);
      html_tag.m(
        /*icon*/
        ctx[4],
        a
      );
      append(a, html_anchor);
      if (if_block)
        if_block.m(a, null);
      if (!mounted) {
        dispose = [
          listen(a, "click", stop_propagation(prevent_default(
            /*onClick*/
            ctx[5]
          ))),
          listen(a, "contextmenu", stop_propagation(prevent_default(
            /*onContextMenu*/
            ctx[6]
          ))),
          listen(
            a,
            "keydown",
            /*onKeydown*/
            ctx[7]
          ),
          listen(
            a,
            "keyup",
            /*onKeyup*/
            ctx[8]
          ),
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            a,
            /*styles*/
            ctx[1]
          ))
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*icon*/
      16)
        html_tag.p(
          /*icon*/
          ctx2[4]
        );
      if (
        /*label*/
        ctx2[3]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$f(ctx2);
          if_block.c();
          if_block.m(a, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty & /*button*/
      1 && a_class_value !== (a_class_value = "header-button " + /*button*/
      ctx2[0].class + " svelte-lbvtt-166l8wd")) {
        attr(a, "class", a_class_value);
      }
      if (dirty & /*label*/
      8) {
        attr(
          a,
          "aria-label",
          /*label*/
          ctx2[3]
        );
      }
      if (applyStyles_action && is_function(applyStyles_action.update) && dirty & /*styles*/
      2)
        applyStyles_action.update.call(
          null,
          /*styles*/
          ctx2[1]
        );
      if (dirty & /*button, keepMinimized*/
      5) {
        toggle_class(
          a,
          "keep-minimized",
          /*keepMinimized*/
          ctx2[2]
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(a);
      }
      if (if_block)
        if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
const s_REGEX_HTML$1 = /^\s*<.*>$/;
function instance$A($$self, $$props, $$invalidate) {
  let title;
  let icon;
  let label;
  let keepMinimized;
  let keyCode;
  let styles;
  let { button = void 0 } = $$props;
  function onClick(event) {
    const invoke = button?.onPress ?? button?.onclick;
    if (typeof invoke === "function") {
      invoke.call(button, event);
      $$invalidate(0, button);
    }
  }
  function onContextMenu(event) {
    const invoke = button?.onContextMenu;
    if (typeof invoke === "function") {
      invoke.call(button, event);
      $$invalidate(0, button);
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
      const invoke = button.onPress ?? button.onclick;
      if (typeof invoke === "function") {
        invoke.call(button, event);
        $$invalidate(0, button);
      }
      event.preventDefault();
      event.stopPropagation();
    }
  }
  $$self.$$set = ($$props2) => {
    if ("button" in $$props2)
      $$invalidate(0, button = $$props2.button);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*button*/
    1) {
      $$invalidate(9, title = isObject(button) && typeof button.title === "string" ? localize(button.title) : "");
    }
    if ($$self.$$.dirty & /*button, title*/
    513) {
      $$invalidate(4, icon = isObject(button) && typeof button.icon !== "string" ? void 0 : s_REGEX_HTML$1.test(button.icon) ? button.icon : `<i class="${button.icon}" title="${title}"></i>`);
    }
    if ($$self.$$.dirty & /*button*/
    1) {
      $$invalidate(3, label = isObject(button) && typeof button.label === "string" ? localize(button.label) : void 0);
    }
    if ($$self.$$.dirty & /*button*/
    1) {
      $$invalidate(2, keepMinimized = isObject(button) && typeof button.keepMinimized === "boolean" ? button.keepMinimized : false);
    }
    if ($$self.$$.dirty & /*button*/
    1) {
      keyCode = isObject(button) && typeof button.keyCode === "string" ? button.keyCode : "Enter";
    }
    if ($$self.$$.dirty & /*button*/
    1) {
      $$invalidate(1, styles = isObject(button) && isObject(button.styles) ? button.styles : void 0);
    }
  };
  return [
    button,
    styles,
    keepMinimized,
    label,
    icon,
    onClick,
    onContextMenu,
    onKeydown,
    onKeyup,
    title
  ];
}
class TJSHeaderButton extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$A, create_fragment$A, safe_not_equal, { button: 0 });
  }
  get button() {
    return this.$$.ctx[0];
  }
  set button(button) {
    this.$$set({ button });
    flush();
  }
}
const TJSHeaderButton$1 = TJSHeaderButton;
const TJSApplicationHeader_svelte_svelte_type_style_lang = "";
function get_each_context$a(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[31] = list[i];
  return child_ctx;
}
function get_each_context_1$3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[31] = list[i];
  return child_ctx;
}
function create_if_block$e(ctx) {
  let img;
  let img_src_value;
  return {
    c() {
      img = element("img");
      attr(img, "class", "tjs-app-icon keep-minimized svelte-lbvtt-1wviwl9");
      if (!src_url_equal(img.src, img_src_value = /*$storeHeaderIcon*/
      ctx[6]))
        attr(img, "src", img_src_value);
      attr(img, "alt", "icon");
    },
    m(target, anchor) {
      insert(target, img, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*$storeHeaderIcon*/
      64 && !src_url_equal(img.src, img_src_value = /*$storeHeaderIcon*/
      ctx2[6])) {
        attr(img, "src", img_src_value);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(img);
      }
    }
  };
}
function create_each_block_1$3(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    /*button*/
    ctx[31].props
  ];
  var switch_value = (
    /*button*/
    ctx[31].class
  );
  function switch_props(ctx2, dirty) {
    let switch_instance_props = {};
    if (dirty !== void 0 && dirty[0] & /*buttonsLeft*/
    2) {
      switch_instance_props = get_spread_update(switch_instance_spread_levels, [get_spread_object(
        /*button*/
        ctx2[31].props
      )]);
    } else {
      for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
        switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
      }
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*buttonsLeft*/
      2 && switch_value !== (switch_value = /*button*/
      ctx2[31].class)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props(ctx2, dirty));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        const switch_instance_changes = dirty[0] & /*buttonsLeft*/
        2 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(
          /*button*/
          ctx2[31].props
        )]) : {};
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(switch_instance_anchor);
      }
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_each_block$a(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    /*button*/
    ctx[31].props
  ];
  var switch_value = (
    /*button*/
    ctx[31].class
  );
  function switch_props(ctx2, dirty) {
    let switch_instance_props = {};
    if (dirty !== void 0 && dirty[0] & /*buttonsRight*/
    4) {
      switch_instance_props = get_spread_update(switch_instance_spread_levels, [get_spread_object(
        /*button*/
        ctx2[31].props
      )]);
    } else {
      for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
        switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
      }
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*buttonsRight*/
      4 && switch_value !== (switch_value = /*button*/
      ctx2[31].class)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props(ctx2, dirty));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        const switch_instance_changes = dirty[0] & /*buttonsRight*/
        4 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(
          /*button*/
          ctx2[31].props
        )]) : {};
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(switch_instance_anchor);
      }
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_key_block(ctx) {
  let header;
  let t0;
  let h4;
  let t1_value = localize(
    /*$storeTitle*/
    ctx[7]
  ) + "";
  let t1;
  let t2;
  let t3;
  let span;
  let t4;
  let draggable_action;
  let minimizable_action;
  let current;
  let mounted;
  let dispose;
  let if_block = typeof /*$storeHeaderIcon*/
  ctx[6] === "string" && create_if_block$e(ctx);
  let each_value_1 = ensure_array_like(
    /*buttonsLeft*/
    ctx[1]
  );
  let each_blocks_1 = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks_1[i] = create_each_block_1$3(get_each_context_1$3(ctx, each_value_1, i));
  }
  const out = (i) => transition_out(each_blocks_1[i], 1, 1, () => {
    each_blocks_1[i] = null;
  });
  let each_value = ensure_array_like(
    /*buttonsRight*/
    ctx[2]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$a(get_each_context$a(ctx, each_value, i));
  }
  const out_1 = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      header = element("header");
      if (if_block)
        if_block.c();
      t0 = space();
      h4 = element("h4");
      t1 = text(t1_value);
      t2 = space();
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].c();
      }
      t3 = space();
      span = element("span");
      t4 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(h4, "class", "window-title svelte-lbvtt-1wviwl9");
      set_style(
        h4,
        "display",
        /*displayHeaderTitle*/
        ctx[4]
      );
      attr(span, "class", "tjs-window-header-spacer keep-minimized svelte-lbvtt-1wviwl9");
      attr(header, "class", "window-header flexrow svelte-lbvtt-1wviwl9");
    },
    m(target, anchor) {
      insert(target, header, anchor);
      if (if_block)
        if_block.m(header, null);
      append(header, t0);
      append(header, h4);
      append(h4, t1);
      append(header, t2);
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        if (each_blocks_1[i]) {
          each_blocks_1[i].m(header, null);
        }
      }
      append(header, t3);
      append(header, span);
      append(header, t4);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(header, null);
        }
      }
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(draggable_action = /*draggable*/
          ctx[0].call(
            null,
            header,
            /*dragOptions*/
            ctx[3]
          )),
          action_destroyer(minimizable_action = /*minimizable*/
          ctx[18].call(
            null,
            header,
            /*$storeMinimizable*/
            ctx[5]
          )),
          listen(
            header,
            "pointerdown",
            /*onPointerdown*/
            ctx[19]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (typeof /*$storeHeaderIcon*/
      ctx2[6] === "string") {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$e(ctx2);
          if_block.c();
          if_block.m(header, t0);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if ((!current || dirty[0] & /*$storeTitle*/
      128) && t1_value !== (t1_value = localize(
        /*$storeTitle*/
        ctx2[7]
      ) + ""))
        set_data(t1, t1_value);
      if (dirty[0] & /*displayHeaderTitle*/
      16) {
        set_style(
          h4,
          "display",
          /*displayHeaderTitle*/
          ctx2[4]
        );
      }
      if (dirty[0] & /*buttonsLeft*/
      2) {
        each_value_1 = ensure_array_like(
          /*buttonsLeft*/
          ctx2[1]
        );
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1$3(ctx2, each_value_1, i);
          if (each_blocks_1[i]) {
            each_blocks_1[i].p(child_ctx, dirty);
            transition_in(each_blocks_1[i], 1);
          } else {
            each_blocks_1[i] = create_each_block_1$3(child_ctx);
            each_blocks_1[i].c();
            transition_in(each_blocks_1[i], 1);
            each_blocks_1[i].m(header, t3);
          }
        }
        group_outros();
        for (i = each_value_1.length; i < each_blocks_1.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      if (dirty[0] & /*buttonsRight*/
      4) {
        each_value = ensure_array_like(
          /*buttonsRight*/
          ctx2[2]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$a(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$a(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(header, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out_1(i);
        }
        check_outros();
      }
      if (draggable_action && is_function(draggable_action.update) && dirty[0] & /*dragOptions*/
      8)
        draggable_action.update.call(
          null,
          /*dragOptions*/
          ctx2[3]
        );
      if (minimizable_action && is_function(minimizable_action.update) && dirty[0] & /*$storeMinimizable*/
      32)
        minimizable_action.update.call(
          null,
          /*$storeMinimizable*/
          ctx2[5]
        );
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value_1.length; i += 1) {
        transition_in(each_blocks_1[i]);
      }
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks_1 = each_blocks_1.filter(Boolean);
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        transition_out(each_blocks_1[i]);
      }
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(header);
      }
      if (if_block)
        if_block.d();
      destroy_each(each_blocks_1, detaching);
      destroy_each(each_blocks, detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment$z(ctx) {
  let previous_key = (
    /*draggable*/
    ctx[0]
  );
  let key_block_anchor;
  let current;
  let key_block = create_key_block(ctx);
  return {
    c() {
      key_block.c();
      key_block_anchor = empty();
    },
    m(target, anchor) {
      key_block.m(target, anchor);
      insert(target, key_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*draggable*/
      1 && safe_not_equal(previous_key, previous_key = /*draggable*/
      ctx2[0])) {
        group_outros();
        transition_out(key_block, 1, 1, noop);
        check_outros();
        key_block = create_key_block(ctx2);
        key_block.c();
        transition_in(key_block, 1);
        key_block.m(key_block_anchor.parentNode, key_block_anchor);
      } else {
        key_block.p(ctx2, dirty);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(key_block);
      current = true;
    },
    o(local) {
      transition_out(key_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(key_block_anchor);
      }
      key_block.d(detaching);
    }
  };
}
function instance$z($$self, $$props, $$invalidate) {
  let $focusKeep;
  let $focusAuto;
  let $elementRoot;
  let $storeHeaderButtons;
  let $storeMinimized;
  let $storeHeaderNoTitleMinimized;
  let $storeDraggable;
  let $storeMinimizable;
  let $storeHeaderIcon;
  let $storeTitle;
  let { draggable: draggable$1 = void 0 } = $$props;
  let { draggableOptions = void 0 } = $$props;
  const { application } = getContext("#external");
  const { focusAuto, focusKeep } = application.reactive.storeAppOptions;
  component_subscribe($$self, focusAuto, (value) => $$invalidate(26, $focusAuto = value));
  component_subscribe($$self, focusKeep, (value) => $$invalidate(25, $focusKeep = value));
  const { elementRoot } = getContext("#internal").stores;
  component_subscribe($$self, elementRoot, (value) => $$invalidate(27, $elementRoot = value));
  const storeTitle = application.reactive.storeAppOptions.title;
  component_subscribe($$self, storeTitle, (value) => $$invalidate(7, $storeTitle = value));
  const storeDraggable = application.reactive.storeAppOptions.draggable;
  component_subscribe($$self, storeDraggable, (value) => $$invalidate(24, $storeDraggable = value));
  const storeDragging = application.reactive.storeUIState.dragging;
  const storeHeaderButtons = application.reactive.storeUIState.headerButtons;
  component_subscribe($$self, storeHeaderButtons, (value) => $$invalidate(21, $storeHeaderButtons = value));
  const storeHeaderIcon = application.reactive.storeAppOptions.headerIcon;
  component_subscribe($$self, storeHeaderIcon, (value) => $$invalidate(6, $storeHeaderIcon = value));
  const storeHeaderNoTitleMinimized = application.reactive.storeAppOptions.headerNoTitleMinimized;
  component_subscribe($$self, storeHeaderNoTitleMinimized, (value) => $$invalidate(23, $storeHeaderNoTitleMinimized = value));
  const storeMinimizable = application.reactive.storeAppOptions.minimizable;
  component_subscribe($$self, storeMinimizable, (value) => $$invalidate(5, $storeMinimizable = value));
  const storeMinimized = application.reactive.storeUIState.minimized;
  component_subscribe($$self, storeMinimized, (value) => $$invalidate(22, $storeMinimized = value));
  const s_DRAG_TARGET_CLASSLIST = Object.freeze(["tjs-app-icon", "tjs-window-header-spacer", "window-header", "window-title"]);
  let dragOptions;
  let displayHeaderTitle;
  let buttonsLeft;
  let buttonsRight;
  function minimizable(node, booleanStore) {
    const callback = (event) => {
      if (event.target.classList.contains("window-title") || event.target.classList.contains("window-header") || event.target.classList.contains("keep-minimized")) {
        application._onToggleMinimize(event);
      }
    };
    function activateListeners() {
      node.addEventListener("dblclick", callback);
    }
    function removeListeners() {
      node.removeEventListener("dblclick", callback);
    }
    if (booleanStore) {
      activateListeners();
    }
    return {
      update: (booleanStore2) => {
        if (booleanStore2) {
          activateListeners();
        } else {
          removeListeners();
        }
      },
      destroy: () => removeListeners()
    };
  }
  function onPointerdown(event) {
    const rootEl = $elementRoot;
    if ($focusAuto && rootEl instanceof HTMLElement && rootEl?.isConnected) {
      if ($focusKeep) {
        const focusOutside = document.activeElement instanceof HTMLElement && !rootEl.contains(document.activeElement);
        if (focusOutside) {
          rootEl.focus();
        } else {
          event.preventDefault();
        }
      } else {
        rootEl.focus();
      }
    }
  }
  $$self.$$set = ($$props2) => {
    if ("draggable" in $$props2)
      $$invalidate(0, draggable$1 = $$props2.draggable);
    if ("draggableOptions" in $$props2)
      $$invalidate(20, draggableOptions = $$props2.draggableOptions);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*draggable*/
    1) {
      $$invalidate(0, draggable$1 = typeof draggable$1 === "function" ? draggable$1 : draggable);
    }
    if ($$self.$$.dirty[0] & /*draggableOptions, $storeDraggable*/
    17825792) {
      $$invalidate(3, dragOptions = Object.assign(
        {},
        {
          ease: true,
          easeOptions: { duration: 0.08, ease: cubicOut }
        },
        isObject(draggableOptions) ? draggableOptions : {},
        {
          position: application.position,
          active: $storeDraggable,
          storeDragging,
          hasTargetClassList: s_DRAG_TARGET_CLASSLIST
        }
      ));
    }
    if ($$self.$$.dirty[0] & /*$storeHeaderNoTitleMinimized, $storeMinimized*/
    12582912) {
      $$invalidate(4, displayHeaderTitle = $storeHeaderNoTitleMinimized && $storeMinimized ? "none" : null);
    }
    if ($$self.$$.dirty[0] & /*$storeHeaderButtons, buttonsLeft, buttonsRight*/
    2097158) {
      {
        $$invalidate(1, buttonsLeft = []);
        $$invalidate(2, buttonsRight = []);
        for (const button of $storeHeaderButtons) {
          const buttonsList = typeof button?.alignLeft === "boolean" && button?.alignLeft ? buttonsLeft : buttonsRight;
          buttonsList.push(isSvelteComponent(button) ? { class: button, props: {} } : {
            class: TJSHeaderButton$1,
            props: { button }
          });
        }
      }
    }
  };
  return [
    draggable$1,
    buttonsLeft,
    buttonsRight,
    dragOptions,
    displayHeaderTitle,
    $storeMinimizable,
    $storeHeaderIcon,
    $storeTitle,
    focusAuto,
    focusKeep,
    elementRoot,
    storeTitle,
    storeDraggable,
    storeHeaderButtons,
    storeHeaderIcon,
    storeHeaderNoTitleMinimized,
    storeMinimizable,
    storeMinimized,
    minimizable,
    onPointerdown,
    draggableOptions,
    $storeHeaderButtons,
    $storeMinimized,
    $storeHeaderNoTitleMinimized,
    $storeDraggable
  ];
}
class TJSApplicationHeader extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$z, create_fragment$z, safe_not_equal, { draggable: 0, draggableOptions: 20 }, null, [-1, -1]);
  }
}
const TJSApplicationHeader$1 = TJSApplicationHeader;
const TJSFocusWrap_svelte_svelte_type_style_lang = "";
function create_fragment$y(ctx) {
  let div;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      attr(div, "class", "tjs-focus-wrap svelte-lbvtt-kjcljd");
      attr(div, "tabindex", "0");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      ctx[4](div);
      if (!mounted) {
        dispose = listen(
          div,
          "focus",
          /*onFocus*/
          ctx[1]
        );
        mounted = true;
      }
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      ctx[4](null);
      mounted = false;
      dispose();
    }
  };
}
function instance$y($$self, $$props, $$invalidate) {
  let { elementRoot = void 0 } = $$props;
  let { enabled = true } = $$props;
  let ignoreElements, wrapEl;
  function onFocus() {
    if (!enabled) {
      return;
    }
    if (elementRoot instanceof HTMLElement) {
      const firstFocusEl = A11yHelper.getFirstFocusableElement(elementRoot, ignoreElements);
      if (firstFocusEl instanceof HTMLElement && firstFocusEl !== wrapEl) {
        firstFocusEl.focus();
      } else {
        elementRoot.focus();
      }
    }
  }
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      wrapEl = $$value;
      $$invalidate(0, wrapEl);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("elementRoot" in $$props2)
      $$invalidate(2, elementRoot = $$props2.elementRoot);
    if ("enabled" in $$props2)
      $$invalidate(3, enabled = $$props2.enabled);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*wrapEl*/
    1) {
      if (wrapEl) {
        ignoreElements = /* @__PURE__ */ new Set([wrapEl]);
      }
    }
  };
  return [wrapEl, onFocus, elementRoot, enabled, div_binding];
}
class TJSFocusWrap extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$y, create_fragment$y, safe_not_equal, { elementRoot: 2, enabled: 3 });
  }
}
const TJSFocusWrap$1 = TJSFocusWrap;
const ResizableHandle_svelte_svelte_type_style_lang = "";
function create_fragment$x(ctx) {
  let div;
  let resizable_action;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<i class="fas fa-arrows-alt-h svelte-lbvtt-14lnpz8"></i>`;
      attr(div, "class", "window-resizable-handle svelte-lbvtt-14lnpz8");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      ctx[10](div);
      if (!mounted) {
        dispose = action_destroyer(resizable_action = /*resizable*/
        ctx[6].call(null, div, {
          active: (
            /*$storeResizable*/
            ctx[1]
          ),
          storeResizing: (
            /*storeResizing*/
            ctx[5]
          )
        }));
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (resizable_action && is_function(resizable_action.update) && dirty & /*$storeResizable*/
      2)
        resizable_action.update.call(null, {
          active: (
            /*$storeResizable*/
            ctx2[1]
          ),
          storeResizing: (
            /*storeResizing*/
            ctx2[5]
          )
        });
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      ctx[10](null);
      mounted = false;
      dispose();
    }
  };
}
function instance$x($$self, $$props, $$invalidate) {
  let $storeElementRoot;
  let $storeMinimized;
  let $storeResizable;
  let { isResizable = false } = $$props;
  const application = getContext("#external").application;
  const storeElementRoot = getContext("#internal").stores.elementRoot;
  component_subscribe($$self, storeElementRoot, (value) => $$invalidate(8, $storeElementRoot = value));
  const storeResizable = application.reactive.storeAppOptions.resizable;
  component_subscribe($$self, storeResizable, (value) => $$invalidate(1, $storeResizable = value));
  const storeMinimized = application.reactive.storeUIState.minimized;
  component_subscribe($$self, storeMinimized, (value) => $$invalidate(9, $storeMinimized = value));
  const storeResizing = application.reactive.storeUIState.resizing;
  let elementResize;
  function resizable(node, { active: active2 = true, storeResizing: storeResizing2 = void 0 } = {}) {
    let position = null;
    let initialPosition = {};
    let resizing = false;
    const handlers = {
      resizeDown: ["pointerdown", (e) => onResizePointerDown(e), false],
      resizeMove: ["pointermove", (e) => onResizePointerMove(e), false],
      resizeUp: ["pointerup", (e) => onResizePointerUp(e), false]
    };
    function activateListeners() {
      node.addEventListener(...handlers.resizeDown);
      $$invalidate(7, isResizable = true);
      node.style.display = "block";
    }
    function removeListeners() {
      if (typeof storeResizing2?.set === "function") {
        storeResizing2.set(false);
      }
      node.removeEventListener(...handlers.resizeDown);
      node.removeEventListener(...handlers.resizeMove);
      node.removeEventListener(...handlers.resizeUp);
      node.style.display = "none";
      $$invalidate(7, isResizable = false);
    }
    if (active2) {
      activateListeners();
    } else {
      node.style.display = "none";
    }
    function onResizePointerDown(event) {
      event.preventDefault();
      resizing = false;
      position = application.position.get();
      if (position.height === "auto") {
        position.height = $storeElementRoot.clientHeight;
      }
      if (position.width === "auto") {
        position.width = $storeElementRoot.clientWidth;
      }
      initialPosition = { x: event.clientX, y: event.clientY };
      node.addEventListener(...handlers.resizeMove);
      node.addEventListener(...handlers.resizeUp);
      node.setPointerCapture(event.pointerId);
    }
    function onResizePointerMove(event) {
      event.preventDefault();
      if (!resizing && typeof storeResizing2?.set === "function") {
        resizing = true;
        storeResizing2.set(true);
      }
      application.position.set({
        width: position.width + (event.clientX - initialPosition.x),
        height: position.height + (event.clientY - initialPosition.y)
      });
    }
    function onResizePointerUp(event) {
      resizing = false;
      if (typeof storeResizing2?.set === "function") {
        storeResizing2.set(false);
      }
      event.preventDefault();
      node.removeEventListener(...handlers.resizeMove);
      node.removeEventListener(...handlers.resizeUp);
      application?._onResize?.(event);
    }
    return {
      update: ({ active: active3 }) => {
        if (active3) {
          activateListeners();
        } else {
          removeListeners();
        }
      },
      destroy: () => removeListeners()
    };
  }
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      elementResize = $$value;
      $$invalidate(0, elementResize), $$invalidate(7, isResizable), $$invalidate(9, $storeMinimized), $$invalidate(8, $storeElementRoot);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("isResizable" in $$props2)
      $$invalidate(7, isResizable = $$props2.isResizable);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*elementResize, isResizable, $storeMinimized, $storeElementRoot*/
    897) {
      if (elementResize) {
        $$invalidate(0, elementResize.style.display = isResizable && !$storeMinimized ? "block" : "none", elementResize);
        const elementRoot = $storeElementRoot;
        if (elementRoot) {
          elementRoot.classList[isResizable ? "add" : "remove"]("resizable");
        }
      }
    }
  };
  return [
    elementResize,
    $storeResizable,
    storeElementRoot,
    storeResizable,
    storeMinimized,
    storeResizing,
    resizable,
    isResizable,
    $storeElementRoot,
    $storeMinimized,
    div_binding
  ];
}
class ResizableHandle extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$x, create_fragment$x, safe_not_equal, { isResizable: 7 });
  }
}
const ResizableHandle$1 = ResizableHandle;
const ApplicationShell_svelte_svelte_type_style_lang = "";
function create_else_block$6(ctx) {
  let div;
  let tjsapplicationheader;
  let t0;
  let section;
  let applyStyles_action;
  let t1;
  let resizablehandle;
  let t2;
  let tjsfocuswrap;
  let div_id_value;
  let div_class_value;
  let div_data_appid_value;
  let applyStyles_action_1;
  let current;
  let mounted;
  let dispose;
  tjsapplicationheader = new TJSApplicationHeader$1({
    props: {
      draggable: (
        /*draggable*/
        ctx[6]
      ),
      draggableOptions: (
        /*draggableOptions*/
        ctx[7]
      )
    }
  });
  const default_slot_template = (
    /*#slots*/
    ctx[36].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[35],
    null
  );
  resizablehandle = new ResizableHandle$1({});
  tjsfocuswrap = new TJSFocusWrap$1({
    props: {
      elementRoot: (
        /*elementRoot*/
        ctx[1]
      ),
      enabled: (
        /*focusWrapEnabled*/
        ctx[11]
      )
    }
  });
  return {
    c() {
      div = element("div");
      create_component(tjsapplicationheader.$$.fragment);
      t0 = space();
      section = element("section");
      if (default_slot)
        default_slot.c();
      t1 = space();
      create_component(resizablehandle.$$.fragment);
      t2 = space();
      create_component(tjsfocuswrap.$$.fragment);
      attr(section, "class", "window-content svelte-lbvtt-oz81f7");
      attr(section, "tabindex", "-1");
      attr(div, "id", div_id_value = /*application*/
      ctx[10].id);
      attr(div, "class", div_class_value = "app window-app " + /*application*/
      ctx[10].options.classes.join(" ") + " svelte-lbvtt-oz81f7");
      attr(div, "data-appid", div_data_appid_value = /*application*/
      ctx[10].appId);
      attr(div, "role", "application");
      attr(div, "tabindex", "-1");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(tjsapplicationheader, div, null);
      append(div, t0);
      append(div, section);
      if (default_slot) {
        default_slot.m(section, null);
      }
      ctx[39](section);
      append(div, t1);
      mount_component(resizablehandle, div, null);
      append(div, t2);
      mount_component(tjsfocuswrap, div, null);
      ctx[40](div);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            section,
            "pointerdown",
            /*onPointerdownContent*/
            ctx[21]
          ),
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            section,
            /*stylesContent*/
            ctx[9]
          )),
          action_destroyer(
            /*contentResizeObserver*/
            ctx[13].call(
              null,
              section,
              /*resizeObservedContent*/
              ctx[22]
            )
          ),
          listen(div, "close:popup", stop_propagation(prevent_default(
            /*onClosePopup*/
            ctx[18]
          ))),
          listen(
            div,
            "keydown",
            /*onKeydown*/
            ctx[19],
            true
          ),
          listen(
            div,
            "pointerdown",
            /*onPointerdownApp*/
            ctx[20]
          ),
          action_destroyer(applyStyles_action_1 = applyStyles.call(
            null,
            div,
            /*stylesApp*/
            ctx[8]
          )),
          action_destroyer(
            /*appResizeObserver*/
            ctx[12].call(
              null,
              div,
              /*resizeObservedApp*/
              ctx[23]
            )
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      const tjsapplicationheader_changes = {};
      if (dirty[0] & /*draggable*/
      64)
        tjsapplicationheader_changes.draggable = /*draggable*/
        ctx2[6];
      if (dirty[0] & /*draggableOptions*/
      128)
        tjsapplicationheader_changes.draggableOptions = /*draggableOptions*/
        ctx2[7];
      tjsapplicationheader.$set(tjsapplicationheader_changes);
      if (default_slot) {
        if (default_slot.p && (!current || dirty[1] & /*$$scope*/
        16)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[35],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[35]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[35],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (applyStyles_action && is_function(applyStyles_action.update) && dirty[0] & /*stylesContent*/
      512)
        applyStyles_action.update.call(
          null,
          /*stylesContent*/
          ctx2[9]
        );
      const tjsfocuswrap_changes = {};
      if (dirty[0] & /*elementRoot*/
      2)
        tjsfocuswrap_changes.elementRoot = /*elementRoot*/
        ctx2[1];
      if (dirty[0] & /*focusWrapEnabled*/
      2048)
        tjsfocuswrap_changes.enabled = /*focusWrapEnabled*/
        ctx2[11];
      tjsfocuswrap.$set(tjsfocuswrap_changes);
      if (!current || dirty[0] & /*application*/
      1024 && div_id_value !== (div_id_value = /*application*/
      ctx2[10].id)) {
        attr(div, "id", div_id_value);
      }
      if (!current || dirty[0] & /*application*/
      1024 && div_class_value !== (div_class_value = "app window-app " + /*application*/
      ctx2[10].options.classes.join(" ") + " svelte-lbvtt-oz81f7")) {
        attr(div, "class", div_class_value);
      }
      if (!current || dirty[0] & /*application*/
      1024 && div_data_appid_value !== (div_data_appid_value = /*application*/
      ctx2[10].appId)) {
        attr(div, "data-appid", div_data_appid_value);
      }
      if (applyStyles_action_1 && is_function(applyStyles_action_1.update) && dirty[0] & /*stylesApp*/
      256)
        applyStyles_action_1.update.call(
          null,
          /*stylesApp*/
          ctx2[8]
        );
    },
    i(local) {
      if (current)
        return;
      transition_in(tjsapplicationheader.$$.fragment, local);
      transition_in(default_slot, local);
      transition_in(resizablehandle.$$.fragment, local);
      transition_in(tjsfocuswrap.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(tjsapplicationheader.$$.fragment, local);
      transition_out(default_slot, local);
      transition_out(resizablehandle.$$.fragment, local);
      transition_out(tjsfocuswrap.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(tjsapplicationheader);
      if (default_slot)
        default_slot.d(detaching);
      ctx[39](null);
      destroy_component(resizablehandle);
      destroy_component(tjsfocuswrap);
      ctx[40](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block$d(ctx) {
  let div;
  let tjsapplicationheader;
  let t0;
  let section;
  let applyStyles_action;
  let t1;
  let resizablehandle;
  let t2;
  let tjsfocuswrap;
  let div_id_value;
  let div_class_value;
  let div_data_appid_value;
  let applyStyles_action_1;
  let div_intro;
  let div_outro;
  let current;
  let mounted;
  let dispose;
  tjsapplicationheader = new TJSApplicationHeader$1({
    props: {
      draggable: (
        /*draggable*/
        ctx[6]
      ),
      draggableOptions: (
        /*draggableOptions*/
        ctx[7]
      )
    }
  });
  const default_slot_template = (
    /*#slots*/
    ctx[36].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[35],
    null
  );
  resizablehandle = new ResizableHandle$1({});
  tjsfocuswrap = new TJSFocusWrap$1({
    props: { elementRoot: (
      /*elementRoot*/
      ctx[1]
    ) }
  });
  return {
    c() {
      div = element("div");
      create_component(tjsapplicationheader.$$.fragment);
      t0 = space();
      section = element("section");
      if (default_slot)
        default_slot.c();
      t1 = space();
      create_component(resizablehandle.$$.fragment);
      t2 = space();
      create_component(tjsfocuswrap.$$.fragment);
      attr(section, "class", "window-content svelte-lbvtt-oz81f7");
      attr(section, "tabindex", "-1");
      attr(div, "id", div_id_value = /*application*/
      ctx[10].id);
      attr(div, "class", div_class_value = "app window-app " + /*application*/
      ctx[10].options.classes.join(" ") + " svelte-lbvtt-oz81f7");
      attr(div, "data-appid", div_data_appid_value = /*application*/
      ctx[10].appId);
      attr(div, "role", "application");
      attr(div, "tabindex", "-1");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(tjsapplicationheader, div, null);
      append(div, t0);
      append(div, section);
      if (default_slot) {
        default_slot.m(section, null);
      }
      ctx[37](section);
      append(div, t1);
      mount_component(resizablehandle, div, null);
      append(div, t2);
      mount_component(tjsfocuswrap, div, null);
      ctx[38](div);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            section,
            "pointerdown",
            /*onPointerdownContent*/
            ctx[21]
          ),
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            section,
            /*stylesContent*/
            ctx[9]
          )),
          action_destroyer(
            /*contentResizeObserver*/
            ctx[13].call(
              null,
              section,
              /*resizeObservedContent*/
              ctx[22]
            )
          ),
          listen(div, "close:popup", stop_propagation(prevent_default(
            /*onClosePopup*/
            ctx[18]
          ))),
          listen(
            div,
            "keydown",
            /*onKeydown*/
            ctx[19],
            true
          ),
          listen(
            div,
            "pointerdown",
            /*onPointerdownApp*/
            ctx[20]
          ),
          action_destroyer(applyStyles_action_1 = applyStyles.call(
            null,
            div,
            /*stylesApp*/
            ctx[8]
          )),
          action_destroyer(
            /*appResizeObserver*/
            ctx[12].call(
              null,
              div,
              /*resizeObservedApp*/
              ctx[23]
            )
          )
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const tjsapplicationheader_changes = {};
      if (dirty[0] & /*draggable*/
      64)
        tjsapplicationheader_changes.draggable = /*draggable*/
        ctx[6];
      if (dirty[0] & /*draggableOptions*/
      128)
        tjsapplicationheader_changes.draggableOptions = /*draggableOptions*/
        ctx[7];
      tjsapplicationheader.$set(tjsapplicationheader_changes);
      if (default_slot) {
        if (default_slot.p && (!current || dirty[1] & /*$$scope*/
        16)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx,
            /*$$scope*/
            ctx[35],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx[35]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx[35],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (applyStyles_action && is_function(applyStyles_action.update) && dirty[0] & /*stylesContent*/
      512)
        applyStyles_action.update.call(
          null,
          /*stylesContent*/
          ctx[9]
        );
      const tjsfocuswrap_changes = {};
      if (dirty[0] & /*elementRoot*/
      2)
        tjsfocuswrap_changes.elementRoot = /*elementRoot*/
        ctx[1];
      tjsfocuswrap.$set(tjsfocuswrap_changes);
      if (!current || dirty[0] & /*application*/
      1024 && div_id_value !== (div_id_value = /*application*/
      ctx[10].id)) {
        attr(div, "id", div_id_value);
      }
      if (!current || dirty[0] & /*application*/
      1024 && div_class_value !== (div_class_value = "app window-app " + /*application*/
      ctx[10].options.classes.join(" ") + " svelte-lbvtt-oz81f7")) {
        attr(div, "class", div_class_value);
      }
      if (!current || dirty[0] & /*application*/
      1024 && div_data_appid_value !== (div_data_appid_value = /*application*/
      ctx[10].appId)) {
        attr(div, "data-appid", div_data_appid_value);
      }
      if (applyStyles_action_1 && is_function(applyStyles_action_1.update) && dirty[0] & /*stylesApp*/
      256)
        applyStyles_action_1.update.call(
          null,
          /*stylesApp*/
          ctx[8]
        );
    },
    i(local) {
      if (current)
        return;
      transition_in(tjsapplicationheader.$$.fragment, local);
      transition_in(default_slot, local);
      transition_in(resizablehandle.$$.fragment, local);
      transition_in(tjsfocuswrap.$$.fragment, local);
      add_render_callback(() => {
        if (!current)
          return;
        if (div_outro)
          div_outro.end(1);
        div_intro = create_in_transition(
          div,
          /*inTransition*/
          ctx[2],
          /*inTransitionOptions*/
          ctx[4]
        );
        div_intro.start();
      });
      current = true;
    },
    o(local) {
      transition_out(tjsapplicationheader.$$.fragment, local);
      transition_out(default_slot, local);
      transition_out(resizablehandle.$$.fragment, local);
      transition_out(tjsfocuswrap.$$.fragment, local);
      if (div_intro)
        div_intro.invalidate();
      div_outro = create_out_transition(
        div,
        /*outTransition*/
        ctx[3],
        /*outTransitionOptions*/
        ctx[5]
      );
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(tjsapplicationheader);
      if (default_slot)
        default_slot.d(detaching);
      ctx[37](null);
      destroy_component(resizablehandle);
      destroy_component(tjsfocuswrap);
      ctx[38](null);
      if (detaching && div_outro)
        div_outro.end();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment$w(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block$d, create_else_block$6];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*inTransition*/
      ctx2[2] !== TJSDefaultTransition.default || /*outTransition*/
      ctx2[3] !== TJSDefaultTransition.default
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
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
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if_blocks[current_block_type_index].d(detaching);
    }
  };
}
function instance$w($$self, $$props, $$invalidate) {
  let $focusKeep;
  let $focusAuto;
  let $minimized;
  let $focusTrap;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { elementContent = void 0 } = $$props;
  let { elementRoot = void 0 } = $$props;
  let { draggable: draggable2 = void 0 } = $$props;
  let { draggableOptions = void 0 } = $$props;
  let { stylesApp = void 0 } = $$props;
  let { stylesContent = void 0 } = $$props;
  let { appOffsetHeight = false } = $$props;
  let { appOffsetWidth = false } = $$props;
  const appResizeObserver = !!appOffsetHeight || !!appOffsetWidth ? resizeObserver : () => null;
  let { contentOffsetHeight = false } = $$props;
  let { contentOffsetWidth = false } = $$props;
  const contentResizeObserver = !!contentOffsetHeight || !!contentOffsetWidth ? resizeObserver : () => null;
  const internal = new AppShellContextInternal();
  const s_IGNORE_CLASSES = { ignoreClasses: ["tjs-focus-wrap"] };
  setContext("#internal", internal);
  const { application } = getContext("#external");
  const { focusAuto, focusKeep, focusTrap } = application.reactive.storeAppOptions;
  component_subscribe($$self, focusAuto, (value) => $$invalidate(32, $focusAuto = value));
  component_subscribe($$self, focusKeep, (value) => $$invalidate(41, $focusKeep = value));
  component_subscribe($$self, focusTrap, (value) => $$invalidate(34, $focusTrap = value));
  const { minimized } = application.reactive.storeUIState;
  component_subscribe($$self, minimized, (value) => $$invalidate(33, $minimized = value));
  let focusWrapEnabled;
  let { transition = TJSDefaultTransition.default } = $$props;
  let { inTransition = TJSDefaultTransition.default } = $$props;
  let { outTransition = TJSDefaultTransition.default } = $$props;
  let { transitionOptions = void 0 } = $$props;
  let { inTransitionOptions = TJSDefaultTransition.options } = $$props;
  let { outTransitionOptions = TJSDefaultTransition.options } = $$props;
  let oldTransition = TJSDefaultTransition.default;
  let oldTransitionOptions = void 0;
  onMount(() => elementRoot.focus());
  function onClosePopup(event) {
    if (!$focusAuto) {
      return;
    }
    const targetEl = event?.detail?.target;
    if (!(targetEl instanceof HTMLElement)) {
      return;
    }
    if (A11yHelper.isFocusable(targetEl)) {
      return;
    }
    const elementRootContains = elementRoot.contains(targetEl);
    if (targetEl === elementRoot) {
      elementRoot.focus();
    } else if (targetEl === elementContent) {
      elementContent.focus();
    } else if (elementRootContains) {
      if (elementContent.contains(targetEl)) {
        elementContent.focus();
      } else {
        elementRoot.focus();
      }
    }
  }
  function onKeydown(event) {
    if ((event.target === elementRoot || event.target === elementContent) && KeyboardManager && KeyboardManager?._getMatchingActions?.(KeyboardManager?.getKeyboardEventContext?.(event))?.length) {
      event.target?.blur();
      return;
    }
    if (focusWrapEnabled && event.shiftKey && event.code === "Tab") {
      const allFocusable = A11yHelper.getFocusableElements(elementRoot, s_IGNORE_CLASSES);
      const firstFocusEl = allFocusable.length > 0 ? allFocusable[0] : void 0;
      const lastFocusEl = allFocusable.length > 0 ? allFocusable[allFocusable.length - 1] : void 0;
      if (elementRoot === document.activeElement || firstFocusEl === document.activeElement) {
        if (lastFocusEl instanceof HTMLElement && firstFocusEl !== lastFocusEl) {
          lastFocusEl.focus();
        }
        event.preventDefault();
        event.stopPropagation();
      }
    }
    if (typeof application?.options?.popOut === "boolean" && application.options.popOut && application !== globalThis.ui?.activeWindow) {
      application.bringToTop.call(application);
    }
  }
  function onPointerdownApp() {
    if (typeof application?.options?.popOut === "boolean" && application.options.popOut && application !== globalThis.ui?.activeWindow) {
      application.bringToTop.call(application);
    }
  }
  function onPointerdownContent(event) {
    const focusable = A11yHelper.isFocusable(event.target);
    if (!focusable && $focusAuto) {
      if ($focusKeep) {
        const focusOutside = document.activeElement instanceof HTMLElement && !elementRoot.contains(document.activeElement);
        if (focusOutside) {
          elementContent.focus();
        } else {
          event.preventDefault();
        }
      } else {
        elementContent.focus();
      }
    }
  }
  function resizeObservedContent(offsetWidth, offsetHeight) {
    $$invalidate(27, contentOffsetWidth = offsetWidth);
    $$invalidate(26, contentOffsetHeight = offsetHeight);
  }
  function resizeObservedApp(offsetWidth, offsetHeight, contentWidth, contentHeight) {
    application.position.stores.resizeObserved.update((object) => {
      object.contentWidth = contentWidth;
      object.contentHeight = contentHeight;
      object.offsetWidth = offsetWidth;
      object.offsetHeight = offsetHeight;
      return object;
    });
    $$invalidate(24, appOffsetHeight = offsetHeight);
    $$invalidate(25, appOffsetWidth = offsetWidth);
  }
  function section_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      elementContent = $$value;
      $$invalidate(0, elementContent);
    });
  }
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      elementRoot = $$value;
      $$invalidate(1, elementRoot);
    });
  }
  function section_binding_1($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      elementContent = $$value;
      $$invalidate(0, elementContent);
    });
  }
  function div_binding_1($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      elementRoot = $$value;
      $$invalidate(1, elementRoot);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("elementContent" in $$props2)
      $$invalidate(0, elementContent = $$props2.elementContent);
    if ("elementRoot" in $$props2)
      $$invalidate(1, elementRoot = $$props2.elementRoot);
    if ("draggable" in $$props2)
      $$invalidate(6, draggable2 = $$props2.draggable);
    if ("draggableOptions" in $$props2)
      $$invalidate(7, draggableOptions = $$props2.draggableOptions);
    if ("stylesApp" in $$props2)
      $$invalidate(8, stylesApp = $$props2.stylesApp);
    if ("stylesContent" in $$props2)
      $$invalidate(9, stylesContent = $$props2.stylesContent);
    if ("appOffsetHeight" in $$props2)
      $$invalidate(24, appOffsetHeight = $$props2.appOffsetHeight);
    if ("appOffsetWidth" in $$props2)
      $$invalidate(25, appOffsetWidth = $$props2.appOffsetWidth);
    if ("contentOffsetHeight" in $$props2)
      $$invalidate(26, contentOffsetHeight = $$props2.contentOffsetHeight);
    if ("contentOffsetWidth" in $$props2)
      $$invalidate(27, contentOffsetWidth = $$props2.contentOffsetWidth);
    if ("transition" in $$props2)
      $$invalidate(28, transition = $$props2.transition);
    if ("inTransition" in $$props2)
      $$invalidate(2, inTransition = $$props2.inTransition);
    if ("outTransition" in $$props2)
      $$invalidate(3, outTransition = $$props2.outTransition);
    if ("transitionOptions" in $$props2)
      $$invalidate(29, transitionOptions = $$props2.transitionOptions);
    if ("inTransitionOptions" in $$props2)
      $$invalidate(4, inTransitionOptions = $$props2.inTransitionOptions);
    if ("outTransitionOptions" in $$props2)
      $$invalidate(5, outTransitionOptions = $$props2.outTransitionOptions);
    if ("$$scope" in $$props2)
      $$invalidate(35, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*elementContent*/
    1) {
      if (elementContent !== void 0 && elementContent !== null) {
        getContext("#internal").stores.elementContent.set(elementContent);
      }
    }
    if ($$self.$$.dirty[0] & /*elementRoot*/
    2) {
      if (elementRoot !== void 0 && elementRoot !== null) {
        getContext("#internal").stores.elementRoot.set(elementRoot);
      }
    }
    if ($$self.$$.dirty[1] & /*$focusAuto, $focusTrap, $minimized*/
    14) {
      $$invalidate(11, focusWrapEnabled = $focusAuto && $focusTrap && !$minimized);
    }
    if ($$self.$$.dirty[0] & /*oldTransition, transition*/
    1342177280) {
      if (oldTransition !== transition) {
        const newTransition = typeof transition === "function" ? transition : TJSDefaultTransition.default;
        $$invalidate(2, inTransition = newTransition);
        $$invalidate(3, outTransition = newTransition);
        $$invalidate(30, oldTransition = newTransition);
      }
    }
    if ($$self.$$.dirty[0] & /*transitionOptions*/
    536870912 | $$self.$$.dirty[1] & /*oldTransitionOptions*/
    1) {
      if (oldTransitionOptions !== transitionOptions) {
        const newOptions = transitionOptions !== TJSDefaultTransition.options && isObject(transitionOptions) ? transitionOptions : TJSDefaultTransition.options;
        $$invalidate(4, inTransitionOptions = newOptions);
        $$invalidate(5, outTransitionOptions = newOptions);
        $$invalidate(31, oldTransitionOptions = newOptions);
      }
    }
    if ($$self.$$.dirty[0] & /*inTransition*/
    4) {
      if (typeof inTransition !== "function") {
        $$invalidate(2, inTransition = TJSDefaultTransition.default);
      }
    }
    if ($$self.$$.dirty[0] & /*outTransition, application*/
    1032) {
      {
        if (typeof outTransition !== "function") {
          $$invalidate(3, outTransition = TJSDefaultTransition.default);
        }
        const defaultCloseAnimation = application?.options?.defaultCloseAnimation;
        if (typeof defaultCloseAnimation === "boolean" && defaultCloseAnimation && outTransition !== TJSDefaultTransition.default) {
          $$invalidate(10, application.options.defaultCloseAnimation = false, application);
        }
      }
    }
    if ($$self.$$.dirty[0] & /*inTransitionOptions*/
    16) {
      if (!isObject(inTransitionOptions)) {
        $$invalidate(4, inTransitionOptions = TJSDefaultTransition.options);
      }
    }
    if ($$self.$$.dirty[0] & /*outTransitionOptions*/
    32) {
      if (!isObject(outTransitionOptions)) {
        $$invalidate(5, outTransitionOptions = TJSDefaultTransition.options);
      }
    }
  };
  return [
    elementContent,
    elementRoot,
    inTransition,
    outTransition,
    inTransitionOptions,
    outTransitionOptions,
    draggable2,
    draggableOptions,
    stylesApp,
    stylesContent,
    application,
    focusWrapEnabled,
    appResizeObserver,
    contentResizeObserver,
    focusAuto,
    focusKeep,
    focusTrap,
    minimized,
    onClosePopup,
    onKeydown,
    onPointerdownApp,
    onPointerdownContent,
    resizeObservedContent,
    resizeObservedApp,
    appOffsetHeight,
    appOffsetWidth,
    contentOffsetHeight,
    contentOffsetWidth,
    transition,
    transitionOptions,
    oldTransition,
    oldTransitionOptions,
    $focusAuto,
    $minimized,
    $focusTrap,
    $$scope,
    slots,
    section_binding,
    div_binding,
    section_binding_1,
    div_binding_1
  ];
}
class ApplicationShell extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance$w,
      create_fragment$w,
      safe_not_equal,
      {
        elementContent: 0,
        elementRoot: 1,
        draggable: 6,
        draggableOptions: 7,
        stylesApp: 8,
        stylesContent: 9,
        appOffsetHeight: 24,
        appOffsetWidth: 25,
        contentOffsetHeight: 26,
        contentOffsetWidth: 27,
        transition: 28,
        inTransition: 2,
        outTransition: 3,
        transitionOptions: 29,
        inTransitionOptions: 4,
        outTransitionOptions: 5
      },
      null,
      [-1, -1]
    );
  }
  get elementContent() {
    return this.$$.ctx[0];
  }
  set elementContent(elementContent) {
    this.$$set({ elementContent });
    flush();
  }
  get elementRoot() {
    return this.$$.ctx[1];
  }
  set elementRoot(elementRoot) {
    this.$$set({ elementRoot });
    flush();
  }
  get draggable() {
    return this.$$.ctx[6];
  }
  set draggable(draggable2) {
    this.$$set({ draggable: draggable2 });
    flush();
  }
  get draggableOptions() {
    return this.$$.ctx[7];
  }
  set draggableOptions(draggableOptions) {
    this.$$set({ draggableOptions });
    flush();
  }
  get stylesApp() {
    return this.$$.ctx[8];
  }
  set stylesApp(stylesApp) {
    this.$$set({ stylesApp });
    flush();
  }
  get stylesContent() {
    return this.$$.ctx[9];
  }
  set stylesContent(stylesContent) {
    this.$$set({ stylesContent });
    flush();
  }
  get appOffsetHeight() {
    return this.$$.ctx[24];
  }
  set appOffsetHeight(appOffsetHeight) {
    this.$$set({ appOffsetHeight });
    flush();
  }
  get appOffsetWidth() {
    return this.$$.ctx[25];
  }
  set appOffsetWidth(appOffsetWidth) {
    this.$$set({ appOffsetWidth });
    flush();
  }
  get contentOffsetHeight() {
    return this.$$.ctx[26];
  }
  set contentOffsetHeight(contentOffsetHeight) {
    this.$$set({ contentOffsetHeight });
    flush();
  }
  get contentOffsetWidth() {
    return this.$$.ctx[27];
  }
  set contentOffsetWidth(contentOffsetWidth) {
    this.$$set({ contentOffsetWidth });
    flush();
  }
  get transition() {
    return this.$$.ctx[28];
  }
  set transition(transition) {
    this.$$set({ transition });
    flush();
  }
  get inTransition() {
    return this.$$.ctx[2];
  }
  set inTransition(inTransition) {
    this.$$set({ inTransition });
    flush();
  }
  get outTransition() {
    return this.$$.ctx[3];
  }
  set outTransition(outTransition) {
    this.$$set({ outTransition });
    flush();
  }
  get transitionOptions() {
    return this.$$.ctx[29];
  }
  set transitionOptions(transitionOptions) {
    this.$$set({ transitionOptions });
    flush();
  }
  get inTransitionOptions() {
    return this.$$.ctx[4];
  }
  set inTransitionOptions(inTransitionOptions) {
    this.$$set({ inTransitionOptions });
    flush();
  }
  get outTransitionOptions() {
    return this.$$.ctx[5];
  }
  set outTransitionOptions(outTransitionOptions) {
    this.$$set({ outTransitionOptions });
    flush();
  }
}
const ApplicationShell$1 = ApplicationShell;
const DialogContent_svelte_svelte_type_style_lang = "";
function get_each_context$9(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[26] = list[i];
  return child_ctx;
}
function create_if_block_3$1(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    /*dialogProps*/
    ctx[7]
  ];
  var switch_value = (
    /*dialogClass*/
    ctx[6]
  );
  function switch_props(ctx2, dirty) {
    let switch_instance_props = {};
    if (dirty !== void 0 && dirty & /*dialogProps*/
    128) {
      switch_instance_props = get_spread_update(switch_instance_spread_levels, [get_spread_object(
        /*dialogProps*/
        ctx2[7]
      )]);
    } else {
      for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
        switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
      }
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    ctx[16](switch_instance);
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & /*dialogClass*/
      64 && switch_value !== (switch_value = /*dialogClass*/
      ctx2[6])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props(ctx2, dirty));
          ctx2[16](switch_instance);
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        const switch_instance_changes = dirty & /*dialogProps*/
        128 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(
          /*dialogProps*/
          ctx2[7]
        )]) : {};
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(switch_instance_anchor);
      }
      ctx[16](null);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_if_block_2$3(ctx) {
  let html_tag;
  let html_anchor;
  return {
    c() {
      html_tag = new HtmlTag(false);
      html_anchor = empty();
      html_tag.a = html_anchor;
    },
    m(target, anchor) {
      html_tag.m(
        /*content*/
        ctx[3],
        target,
        anchor
      );
      insert(target, html_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*content*/
      8)
        html_tag.p(
          /*content*/
          ctx2[3]
        );
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(html_anchor);
        html_tag.d();
      }
    }
  };
}
function create_if_block$c(ctx) {
  let div;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let each_value = ensure_array_like(
    /*buttons*/
    ctx[1]
  );
  const get_key = (ctx2) => (
    /*button*/
    ctx2[26].id
  );
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context$9(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block$9(key, child_ctx));
  }
  return {
    c() {
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div, "class", "dialog-buttons tjs-dialog-buttons svelte-lbvtt-1ez4adq");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div, null);
        }
      }
      ctx[20](div);
    },
    p(ctx2, dirty) {
      if (dirty & /*buttons, onClick, currentButtonId*/
      530) {
        each_value = ensure_array_like(
          /*buttons*/
          ctx2[1]
        );
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, div, destroy_block, create_each_block$9, null, get_each_context$9);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
      ctx[20](null);
    }
  };
}
function create_if_block_1$8(ctx) {
  let html_tag;
  let raw_value = (
    /*button*/
    ctx[26].icon + ""
  );
  let html_anchor;
  return {
    c() {
      html_tag = new HtmlTag(false);
      html_anchor = empty();
      html_tag.a = html_anchor;
    },
    m(target, anchor) {
      html_tag.m(raw_value, target, anchor);
      insert(target, html_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*buttons*/
      2 && raw_value !== (raw_value = /*button*/
      ctx2[26].icon + ""))
        html_tag.p(raw_value);
    },
    d(detaching) {
      if (detaching) {
        detach(html_anchor);
        html_tag.d();
      }
    }
  };
}
function create_each_block$9(key_1, ctx) {
  let button_1;
  let span;
  let t0_value = (
    /*button*/
    ctx[26].label + ""
  );
  let t0;
  let span_title_value;
  let t1;
  let button_1_class_value;
  let button_1_disabled_value;
  let applyStyles_action;
  let mounted;
  let dispose;
  let if_block = (
    /*button*/
    ctx[26].icon && create_if_block_1$8(ctx)
  );
  function click_handler() {
    return (
      /*click_handler*/
      ctx[18](
        /*button*/
        ctx[26]
      )
    );
  }
  function focus_handler() {
    return (
      /*focus_handler*/
      ctx[19](
        /*button*/
        ctx[26]
      )
    );
  }
  return {
    key: key_1,
    first: null,
    c() {
      button_1 = element("button");
      span = element("span");
      if (if_block)
        if_block.c();
      t0 = text(t0_value);
      t1 = space();
      attr(span, "title", span_title_value = /*button*/
      ctx[26].title);
      attr(button_1, "class", button_1_class_value = "dialog-button tjs-dialog-button " + /*button*/
      ctx[26].id + " svelte-lbvtt-1ez4adq");
      button_1.disabled = button_1_disabled_value = /*button*/
      ctx[26].disabled;
      this.first = button_1;
    },
    m(target, anchor) {
      insert(target, button_1, anchor);
      append(button_1, span);
      if (if_block)
        if_block.m(span, null);
      append(span, t0);
      append(button_1, t1);
      if (!mounted) {
        dispose = [
          listen(button_1, "click", stop_propagation(prevent_default(click_handler))),
          listen(button_1, "focus", focus_handler),
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            button_1,
            /*button*/
            ctx[26].styles
          ))
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (
        /*button*/
        ctx[26].icon
      ) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block_1$8(ctx);
          if_block.c();
          if_block.m(span, t0);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty & /*buttons*/
      2 && t0_value !== (t0_value = /*button*/
      ctx[26].label + ""))
        set_data(t0, t0_value);
      if (dirty & /*buttons*/
      2 && span_title_value !== (span_title_value = /*button*/
      ctx[26].title)) {
        attr(span, "title", span_title_value);
      }
      if (dirty & /*buttons*/
      2 && button_1_class_value !== (button_1_class_value = "dialog-button tjs-dialog-button " + /*button*/
      ctx[26].id + " svelte-lbvtt-1ez4adq")) {
        attr(button_1, "class", button_1_class_value);
      }
      if (dirty & /*buttons*/
      2 && button_1_disabled_value !== (button_1_disabled_value = /*button*/
      ctx[26].disabled)) {
        button_1.disabled = button_1_disabled_value;
      }
      if (applyStyles_action && is_function(applyStyles_action.update) && dirty & /*buttons*/
      2)
        applyStyles_action.update.call(
          null,
          /*button*/
          ctx[26].styles
        );
    },
    d(detaching) {
      if (detaching) {
        detach(button_1);
      }
      if (if_block)
        if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment$v(ctx) {
  let main;
  let div;
  let current_block_type_index;
  let if_block0;
  let t;
  let current;
  const if_block_creators = [create_if_block_2$3, create_if_block_3$1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (typeof /*content*/
    ctx2[3] === "string")
      return 0;
    if (
      /*dialogClass*/
      ctx2[6]
    )
      return 1;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  let if_block1 = (
    /*buttons*/
    ctx[1].length && create_if_block$c(ctx)
  );
  return {
    c() {
      main = element("main");
      div = element("div");
      if (if_block0)
        if_block0.c();
      t = space();
      if (if_block1)
        if_block1.c();
      attr(div, "class", "dialog-content");
    },
    m(target, anchor) {
      insert(target, main, anchor);
      append(main, div);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(div, null);
      }
      ctx[17](div);
      append(main, t);
      if (if_block1)
        if_block1.m(main, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
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
          if_block0.m(div, null);
        } else {
          if_block0 = null;
        }
      }
      if (
        /*buttons*/
        ctx2[1].length
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block$c(ctx2);
          if_block1.c();
          if_block1.m(main, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(main);
      }
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
      ctx[17](null);
      if (if_block1)
        if_block1.d();
    }
  };
}
const s_REGEX_HTML = /^\s*<.*>$/;
function instance$v($$self, $$props, $$invalidate) {
  let autoClose;
  let focusFirst;
  let resolveId;
  let $elementRoot;
  let { data = void 0 } = $$props;
  let { preventDefault = false } = $$props;
  let { stopPropagation = false } = $$props;
  let { dialogComponent = void 0 } = $$props;
  let buttons;
  let contentEl;
  let buttonsEl;
  let content = void 0;
  let dialogClass;
  let dialogProps = {};
  let { elementRoot } = getContext("#internal").stores;
  component_subscribe($$self, elementRoot, (value) => $$invalidate(15, $elementRoot = value));
  let { application } = getContext("#external");
  let managedPromise = getContext("#managedPromise");
  let currentButtonId = data.default;
  onDestroy(() => {
    const rootEl = $elementRoot;
    if (rootEl instanceof HTMLElement) {
      rootEl.removeEventListener("keydown", onKeydown);
      rootEl.removeEventListener("keyup", onKeyup);
    }
  });
  onMount(() => {
    if (focusFirst) {
      const focusEl = A11yHelper.getFirstFocusableElement(contentEl);
      if (focusEl instanceof HTMLElement) {
        setTimeout(() => focusEl.focus(), 0);
      }
    }
  });
  function onClick(button) {
    try {
      let result = void 0;
      const callback = button?.onPress;
      switch (typeof callback) {
        case "function":
          result = callback(application);
          break;
        case "string":
          if (dialogComponent !== void 0 && typeof dialogComponent[callback] === "function") {
            result = dialogComponent[callback](application);
          } else {
            if (dialogComponent === void 0) {
              console.warn(`[TRL] TJSDialog warning: 'onPress' defined as a string with no associated content Svelte component.`);
            } else if (typeof dialogComponent?.[callback] !== "function") {
              console.warn(`[TRL] TJSDialog warning: The content Svelte component does not contain an associated function '${callback}'. Did you remember to add '<svelte:options accessors={true} />' and export the function?`);
            }
          }
          break;
      }
      if (button.autoClose && autoClose) {
        if (resolveId && result === void 0) {
          result = button.id;
        }
        managedPromise.resolve(result);
      }
    } catch (err) {
      const notifyError = typeof data.notifyError === "boolean" ? data.notifyError : true;
      if (notifyError) {
        globalThis.ui.notifications.error(err, { console: false });
      }
      if (!managedPromise.reject(err)) {
        throw err;
      }
    } finally {
      if (button.autoClose && autoClose) {
        application.close();
      }
    }
  }
  function onKeydown(event) {
    switch (event.code) {
      case "ArrowLeft":
      case "ArrowRight":
      case "Enter":
        event.stopPropagation();
        break;
      case "Tab":
        event.stopPropagation();
        setTimeout(
          () => {
            const activeElement = document.activeElement;
            if (activeElement instanceof HTMLElement && buttonsEl instanceof HTMLElement && buttonsEl.contains(activeElement)) {
              for (let cntr = 0; cntr < activeElement.classList.length; cntr++) {
                const item = activeElement.classList.item(cntr);
                if (item !== "dialog-button" && item !== "default" && typeof data.buttons[item] !== void 0) {
                  $$invalidate(4, currentButtonId = item);
                  break;
                }
              }
            }
          },
          0
        );
        break;
      default:
        if (preventDefault) {
          event.preventDefault();
        }
        if (stopPropagation) {
          event.stopPropagation();
        }
        break;
    }
  }
  function onKeyup(event) {
    switch (event.code) {
      case "ArrowLeft": {
        event.preventDefault();
        event.stopPropagation();
        const activeEl = document.activeElement;
        if (buttonsEl instanceof HTMLElement) {
          if (activeEl instanceof HTMLElement && buttonsEl.contains(activeEl)) {
            const currentIndex = buttons.findIndex((button) => button.id === currentButtonId);
            if (buttons.length && currentIndex > 0) {
              $$invalidate(4, currentButtonId = buttons[currentIndex - 1].id);
            }
          }
          const buttonEl = buttonsEl.querySelector(`.${currentButtonId}`);
          if (buttonEl instanceof HTMLElement) {
            buttonEl.focus();
          }
        }
        break;
      }
      case "ArrowRight": {
        event.preventDefault();
        event.stopPropagation();
        const activeEl = document.activeElement;
        if (buttonsEl instanceof HTMLElement) {
          if (activeEl instanceof HTMLElement && (buttonsEl.contains(activeEl) || currentButtonId === void 0)) {
            const currentIndex = buttons.findIndex((button) => button.id === currentButtonId);
            if (buttons.length && currentIndex < buttons.length - 1) {
              $$invalidate(4, currentButtonId = buttons[currentIndex + 1].id);
            }
          }
          const buttonEl = buttonsEl.querySelector(`.${currentButtonId}`);
          if (buttonEl instanceof HTMLElement) {
            buttonEl.focus();
          }
        }
        break;
      }
      case "Enter":
        event.preventDefault();
        event.stopPropagation();
        break;
      default:
        if (preventDefault) {
          event.preventDefault();
        }
        if (stopPropagation) {
          event.stopPropagation();
        }
        break;
    }
  }
  function switch_instance_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dialogComponent = $$value;
      $$invalidate(0, dialogComponent);
    });
  }
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      contentEl = $$value;
      $$invalidate(5, contentEl);
    });
  }
  const click_handler = (button) => onClick(button);
  const focus_handler = (button) => $$invalidate(4, currentButtonId = button.id);
  function div_binding_1($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      buttonsEl = $$value;
      $$invalidate(2, buttonsEl);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("data" in $$props2)
      $$invalidate(10, data = $$props2.data);
    if ("preventDefault" in $$props2)
      $$invalidate(11, preventDefault = $$props2.preventDefault);
    if ("stopPropagation" in $$props2)
      $$invalidate(12, stopPropagation = $$props2.stopPropagation);
    if ("dialogComponent" in $$props2)
      $$invalidate(0, dialogComponent = $$props2.dialogComponent);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$elementRoot*/
    32768) {
      if ($elementRoot) {
        const rootEl = $elementRoot;
        if (rootEl instanceof HTMLElement) {
          rootEl.addEventListener("keydown", onKeydown);
          rootEl.addEventListener("keyup", onKeyup);
        }
      }
    }
    if ($$self.$$.dirty & /*data*/
    1024) {
      $$invalidate(13, autoClose = typeof data.autoClose === "boolean" ? data.autoClose : true);
    }
    if ($$self.$$.dirty & /*data*/
    1024) {
      $$invalidate(14, focusFirst = typeof data.focusFirst === "boolean" ? data.focusFirst : false);
    }
    if ($$self.$$.dirty & /*data*/
    1024) {
      {
        $$invalidate(1, buttons = !isObject(data.buttons) ? [] : Object.keys(data.buttons).reduce(
          (array, key) => {
            const b = data.buttons[key];
            const icon = typeof b.icon !== "string" ? void 0 : s_REGEX_HTML.test(b.icon) ? b.icon : `<i class="${b.icon}"></i>`;
            const autoClose2 = typeof b.autoClose === "boolean" ? b.autoClose : true;
            const disabled = typeof b.disabled === "boolean" ? b.disabled : false;
            const label = typeof b.label === "string" ? `${icon !== void 0 ? " " : ""}${localize(b.label)}` : "";
            const title = typeof b.title === "string" ? localize(b.title) : void 0;
            const condition = typeof b.condition === "function" ? b.condition.call(b) : b.condition ?? true;
            if (condition) {
              array.push({
                ...b,
                id: key,
                autoClose: autoClose2,
                icon,
                label,
                title,
                disabled
              });
            }
            return array;
          },
          []
        ));
      }
    }
    if ($$self.$$.dirty & /*buttons, currentButtonId*/
    18) {
      if (!buttons.find((button) => button.id === currentButtonId)) {
        $$invalidate(4, currentButtonId = void 0);
      }
    }
    if ($$self.$$.dirty & /*focusFirst, buttonsEl, currentButtonId*/
    16404) {
      if (!focusFirst && buttonsEl instanceof HTMLElement) {
        const buttonEl = buttonsEl.querySelector(`.${currentButtonId}`);
        if (buttonEl instanceof HTMLElement) {
          buttonEl.focus();
        }
      }
    }
    if ($$self.$$.dirty & /*data*/
    1024) {
      resolveId = typeof data.resolveId === "boolean" ? data.resolveId : false;
    }
    if ($$self.$$.dirty & /*content, data*/
    1032) {
      if (content !== data.content) {
        $$invalidate(
          3,
          content = data.content
        );
        try {
          if (isSvelteComponent(content)) {
            $$invalidate(6, dialogClass = content);
            $$invalidate(7, dialogProps = {});
          } else if (isObject(content)) {
            const svelteConfig = parseTJSSvelteConfig(content, application);
            $$invalidate(6, dialogClass = svelteConfig.class);
            $$invalidate(7, dialogProps = svelteConfig.props ?? {});
            const children2 = svelteConfig?.context?.get("external")?.children;
            if (Array.isArray(children2)) {
              $$invalidate(7, dialogProps.children = children2, dialogProps);
            }
          } else {
            $$invalidate(6, dialogClass = void 0);
            $$invalidate(7, dialogProps = {});
          }
        } catch (err) {
          $$invalidate(6, dialogClass = void 0);
          $$invalidate(7, dialogProps = {});
          $$invalidate(3, content = err.message);
          console.error(err);
        }
      }
    }
  };
  return [
    dialogComponent,
    buttons,
    buttonsEl,
    content,
    currentButtonId,
    contentEl,
    dialogClass,
    dialogProps,
    elementRoot,
    onClick,
    data,
    preventDefault,
    stopPropagation,
    autoClose,
    focusFirst,
    $elementRoot,
    switch_instance_binding,
    div_binding,
    click_handler,
    focus_handler,
    div_binding_1
  ];
}
class DialogContent extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$v, create_fragment$v, safe_not_equal, {
      data: 10,
      preventDefault: 11,
      stopPropagation: 12,
      dialogComponent: 0
    });
  }
}
const DialogContent$1 = DialogContent;
function create_else_block$5(ctx) {
  let applicationshell;
  let updating_elementRoot;
  let updating_elementContent;
  let current;
  const applicationshell_spread_levels = [
    /*appProps*/
    ctx[6],
    { appOffsetHeight: true }
  ];
  function applicationshell_elementRoot_binding_1(value) {
    ctx[15](value);
  }
  function applicationshell_elementContent_binding_1(value) {
    ctx[16](value);
  }
  let applicationshell_props = {
    $$slots: { default: [create_default_slot_2] },
    $$scope: { ctx }
  };
  for (let i = 0; i < applicationshell_spread_levels.length; i += 1) {
    applicationshell_props = assign(applicationshell_props, applicationshell_spread_levels[i]);
  }
  if (
    /*elementRoot*/
    ctx[0] !== void 0
  ) {
    applicationshell_props.elementRoot = /*elementRoot*/
    ctx[0];
  }
  if (
    /*elementContent*/
    ctx[1] !== void 0
  ) {
    applicationshell_props.elementContent = /*elementContent*/
    ctx[1];
  }
  applicationshell = new ApplicationShell$1({ props: applicationshell_props });
  binding_callbacks.push(() => bind(applicationshell, "elementRoot", applicationshell_elementRoot_binding_1));
  binding_callbacks.push(() => bind(applicationshell, "elementContent", applicationshell_elementContent_binding_1));
  return {
    c() {
      create_component(applicationshell.$$.fragment);
    },
    m(target, anchor) {
      mount_component(applicationshell, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const applicationshell_changes = dirty & /*appProps*/
      64 ? get_spread_update(applicationshell_spread_levels, [
        get_spread_object(
          /*appProps*/
          ctx2[6]
        ),
        applicationshell_spread_levels[1]
      ]) : {};
      if (dirty & /*$$scope, data, dialogComponent*/
      4194316) {
        applicationshell_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_elementRoot && dirty & /*elementRoot*/
      1) {
        updating_elementRoot = true;
        applicationshell_changes.elementRoot = /*elementRoot*/
        ctx2[0];
        add_flush_callback(() => updating_elementRoot = false);
      }
      if (!updating_elementContent && dirty & /*elementContent*/
      2) {
        updating_elementContent = true;
        applicationshell_changes.elementContent = /*elementContent*/
        ctx2[1];
        add_flush_callback(() => updating_elementContent = false);
      }
      applicationshell.$set(applicationshell_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(applicationshell.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(applicationshell.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(applicationshell, detaching);
    }
  };
}
function create_if_block$b(ctx) {
  let tjsglasspane;
  let current;
  const tjsglasspane_spread_levels = [
    {
      id: `${/*application*/
      ctx[4].id}-glasspane`
    },
    /*modalProps*/
    ctx[7],
    { zIndex: (
      /*zIndex*/
      ctx[8]
    ) }
  ];
  let tjsglasspane_props = {
    $$slots: { default: [create_default_slot$4] },
    $$scope: { ctx }
  };
  for (let i = 0; i < tjsglasspane_spread_levels.length; i += 1) {
    tjsglasspane_props = assign(tjsglasspane_props, tjsglasspane_spread_levels[i]);
  }
  tjsglasspane = new TJSGlassPane$1({ props: tjsglasspane_props });
  tjsglasspane.$on(
    "close:glasspane",
    /*close_glasspane_handler*/
    ctx[13]
  );
  return {
    c() {
      create_component(tjsglasspane.$$.fragment);
    },
    m(target, anchor) {
      mount_component(tjsglasspane, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const tjsglasspane_changes = dirty & /*application, modalProps, zIndex*/
      400 ? get_spread_update(tjsglasspane_spread_levels, [
        dirty & /*application*/
        16 && {
          id: `${/*application*/
          ctx2[4].id}-glasspane`
        },
        dirty & /*modalProps*/
        128 && get_spread_object(
          /*modalProps*/
          ctx2[7]
        ),
        dirty & /*zIndex*/
        256 && { zIndex: (
          /*zIndex*/
          ctx2[8]
        ) }
      ]) : {};
      if (dirty & /*$$scope, appProps, elementRoot, elementContent, data, dialogComponent*/
      4194383) {
        tjsglasspane_changes.$$scope = { dirty, ctx: ctx2 };
      }
      tjsglasspane.$set(tjsglasspane_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(tjsglasspane.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(tjsglasspane.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(tjsglasspane, detaching);
    }
  };
}
function create_default_slot_2(ctx) {
  let dialogcontent;
  let updating_dialogComponent;
  let current;
  function dialogcontent_dialogComponent_binding_1(value) {
    ctx[14](value);
  }
  let dialogcontent_props = { data: (
    /*data*/
    ctx[3]
  ) };
  if (
    /*dialogComponent*/
    ctx[2] !== void 0
  ) {
    dialogcontent_props.dialogComponent = /*dialogComponent*/
    ctx[2];
  }
  dialogcontent = new DialogContent$1({ props: dialogcontent_props });
  binding_callbacks.push(() => bind(dialogcontent, "dialogComponent", dialogcontent_dialogComponent_binding_1));
  return {
    c() {
      create_component(dialogcontent.$$.fragment);
    },
    m(target, anchor) {
      mount_component(dialogcontent, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const dialogcontent_changes = {};
      if (dirty & /*data*/
      8)
        dialogcontent_changes.data = /*data*/
        ctx2[3];
      if (!updating_dialogComponent && dirty & /*dialogComponent*/
      4) {
        updating_dialogComponent = true;
        dialogcontent_changes.dialogComponent = /*dialogComponent*/
        ctx2[2];
        add_flush_callback(() => updating_dialogComponent = false);
      }
      dialogcontent.$set(dialogcontent_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(dialogcontent.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(dialogcontent.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(dialogcontent, detaching);
    }
  };
}
function create_default_slot_1(ctx) {
  let dialogcontent;
  let updating_dialogComponent;
  let current;
  function dialogcontent_dialogComponent_binding(value) {
    ctx[10](value);
  }
  let dialogcontent_props = {
    data: (
      /*data*/
      ctx[3]
    ),
    stopPropagation: true
  };
  if (
    /*dialogComponent*/
    ctx[2] !== void 0
  ) {
    dialogcontent_props.dialogComponent = /*dialogComponent*/
    ctx[2];
  }
  dialogcontent = new DialogContent$1({ props: dialogcontent_props });
  binding_callbacks.push(() => bind(dialogcontent, "dialogComponent", dialogcontent_dialogComponent_binding));
  return {
    c() {
      create_component(dialogcontent.$$.fragment);
    },
    m(target, anchor) {
      mount_component(dialogcontent, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const dialogcontent_changes = {};
      if (dirty & /*data*/
      8)
        dialogcontent_changes.data = /*data*/
        ctx2[3];
      if (!updating_dialogComponent && dirty & /*dialogComponent*/
      4) {
        updating_dialogComponent = true;
        dialogcontent_changes.dialogComponent = /*dialogComponent*/
        ctx2[2];
        add_flush_callback(() => updating_dialogComponent = false);
      }
      dialogcontent.$set(dialogcontent_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(dialogcontent.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(dialogcontent.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(dialogcontent, detaching);
    }
  };
}
function create_default_slot$4(ctx) {
  let applicationshell;
  let updating_elementRoot;
  let updating_elementContent;
  let current;
  const applicationshell_spread_levels = [
    /*appProps*/
    ctx[6],
    { appOffsetHeight: true }
  ];
  function applicationshell_elementRoot_binding(value) {
    ctx[11](value);
  }
  function applicationshell_elementContent_binding(value) {
    ctx[12](value);
  }
  let applicationshell_props = {
    $$slots: { default: [create_default_slot_1] },
    $$scope: { ctx }
  };
  for (let i = 0; i < applicationshell_spread_levels.length; i += 1) {
    applicationshell_props = assign(applicationshell_props, applicationshell_spread_levels[i]);
  }
  if (
    /*elementRoot*/
    ctx[0] !== void 0
  ) {
    applicationshell_props.elementRoot = /*elementRoot*/
    ctx[0];
  }
  if (
    /*elementContent*/
    ctx[1] !== void 0
  ) {
    applicationshell_props.elementContent = /*elementContent*/
    ctx[1];
  }
  applicationshell = new ApplicationShell$1({ props: applicationshell_props });
  binding_callbacks.push(() => bind(applicationshell, "elementRoot", applicationshell_elementRoot_binding));
  binding_callbacks.push(() => bind(applicationshell, "elementContent", applicationshell_elementContent_binding));
  return {
    c() {
      create_component(applicationshell.$$.fragment);
    },
    m(target, anchor) {
      mount_component(applicationshell, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const applicationshell_changes = dirty & /*appProps*/
      64 ? get_spread_update(applicationshell_spread_levels, [
        get_spread_object(
          /*appProps*/
          ctx2[6]
        ),
        applicationshell_spread_levels[1]
      ]) : {};
      if (dirty & /*$$scope, data, dialogComponent*/
      4194316) {
        applicationshell_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_elementRoot && dirty & /*elementRoot*/
      1) {
        updating_elementRoot = true;
        applicationshell_changes.elementRoot = /*elementRoot*/
        ctx2[0];
        add_flush_callback(() => updating_elementRoot = false);
      }
      if (!updating_elementContent && dirty & /*elementContent*/
      2) {
        updating_elementContent = true;
        applicationshell_changes.elementContent = /*elementContent*/
        ctx2[1];
        add_flush_callback(() => updating_elementContent = false);
      }
      applicationshell.$set(applicationshell_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(applicationshell.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(applicationshell.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(applicationshell, detaching);
    }
  };
}
function create_fragment$u(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block$b, create_else_block$5];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*modal*/
      ctx2[5]
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
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
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if_blocks[current_block_type_index].d(detaching);
    }
  };
}
const s_MODAL_BACKGROUND = "#50505080";
function instance$u($$self, $$props, $$invalidate) {
  let { elementContent = void 0 } = $$props;
  let { elementRoot = void 0 } = $$props;
  let { data = {} } = $$props;
  let { dialogComponent = void 0 } = $$props;
  let { managedPromise = void 0 } = $$props;
  const application = getContext("#external").application;
  const dialogOptions = writable({});
  setContext("#managedPromise", managedPromise);
  setContext("#dialogOptions", dialogOptions);
  const s_MODAL_TRANSITION = fade;
  const s_MODAL_TRANSITION_OPTIONS = { duration: 200 };
  let modal = void 0;
  const appProps = {
    // Stores any transition functions.
    transition: void 0,
    inTransition: void 0,
    outTransition: void 0,
    // Stores properties to set for options for any transitions.
    transitionOptions: void 0,
    inTransitionOptions: void 0,
    outTransitionOptions: void 0,
    // Stores any style overrides for application shell.
    stylesApp: void 0,
    stylesContent: void 0
  };
  const modalProps = {
    // Background CSS style string.
    background: void 0,
    slotSeparate: void 0,
    styles: void 0,
    // Close modal on glasspane input.
    closeOnInput: void 0,
    // Stores any transition functions.
    transition: void 0,
    inTransition: void 0,
    outTransition: void 0,
    // Stores properties to set for options for any transitions.
    transitionOptions: void 0,
    inTransitionOptions: void 0,
    outTransitionOptions: void 0
  };
  let zIndex = void 0;
  if (modal === void 0) {
    modal = typeof data?.modal === "boolean" ? data.modal : false;
  }
  if (modal) {
    onDestroy(() => window.removeEventListener("keydown", onKeydownModal, { capture: true }));
    onMount(() => window.addEventListener("keydown", onKeydownModal, { capture: true }));
  } else {
    onDestroy(() => document.removeEventListener("keydown", onKeydown));
    onMount(() => document.addEventListener("keydown", onKeydown));
  }
  function onKeydown(event) {
    if (event.code === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      application.close();
    }
  }
  function onKeydownModal(event) {
    if (event.code === "Escape") {
      event.preventDefault();
      event.stopImmediatePropagation();
      application.close();
    }
  }
  function dialogcontent_dialogComponent_binding(value) {
    dialogComponent = value;
    $$invalidate(2, dialogComponent);
  }
  function applicationshell_elementRoot_binding(value) {
    elementRoot = value;
    $$invalidate(0, elementRoot);
  }
  function applicationshell_elementContent_binding(value) {
    elementContent = value;
    $$invalidate(1, elementContent);
  }
  const close_glasspane_handler = () => application.close();
  function dialogcontent_dialogComponent_binding_1(value) {
    dialogComponent = value;
    $$invalidate(2, dialogComponent);
  }
  function applicationshell_elementRoot_binding_1(value) {
    elementRoot = value;
    $$invalidate(0, elementRoot);
  }
  function applicationshell_elementContent_binding_1(value) {
    elementContent = value;
    $$invalidate(1, elementContent);
  }
  $$self.$$set = ($$props2) => {
    if ("elementContent" in $$props2)
      $$invalidate(1, elementContent = $$props2.elementContent);
    if ("elementRoot" in $$props2)
      $$invalidate(0, elementRoot = $$props2.elementRoot);
    if ("data" in $$props2)
      $$invalidate(3, data = $$props2.data);
    if ("dialogComponent" in $$props2)
      $$invalidate(2, dialogComponent = $$props2.dialogComponent);
    if ("managedPromise" in $$props2)
      $$invalidate(9, managedPromise = $$props2.managedPromise);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*elementRoot, modal*/
    33) {
      if (elementRoot instanceof HTMLElement) {
        elementRoot.setAttribute("role", "dialog");
        if (modal) {
          elementRoot.setAttribute("aria-modal", "true");
        }
      }
    }
    if ($$self.$$.dirty & /*data, modal, zIndex, application*/
    312) {
      if (isObject(data)) {
        dialogOptions.set(klona(data));
        const newZIndex = Number.isInteger(data.zIndex) || data.zIndex === null ? data.zIndex : modal ? Number.MAX_SAFE_INTEGER : Number.MAX_SAFE_INTEGER - 1;
        if (zIndex !== newZIndex) {
          $$invalidate(8, zIndex = newZIndex);
        }
        const newDraggable = typeof data.draggable === "boolean" ? data.draggable : void 0;
        if (newDraggable !== void 0 && application.reactive.draggable !== newDraggable) {
          $$invalidate(4, application.reactive.draggable = newDraggable, application);
        }
        const newFocusAuto = typeof data.focusAuto === "boolean" ? data.focusAuto : void 0;
        if (newFocusAuto !== void 0 && application.reactive.focusAuto !== newFocusAuto) {
          $$invalidate(4, application.reactive.focusAuto = newFocusAuto, application);
        }
        const newFocusKeep = typeof data.focusKeep === "boolean" ? data.focusKeep : void 0;
        if (newFocusKeep !== void 0 && application.reactive.focusKeep !== newFocusKeep) {
          $$invalidate(4, application.reactive.focusKeep = newFocusKeep, application);
        }
        const newFocusTrap = typeof data.focusTrap === "boolean" ? data.focusTrap : void 0;
        if (newFocusTrap !== void 0 && application.reactive.focusTrap !== newFocusTrap) {
          $$invalidate(4, application.reactive.focusTrap = newFocusTrap, application);
        }
        const newMinimizable = typeof data.minimizable === "boolean" ? data.minimizable : void 0;
        if (newMinimizable !== void 0 && application.reactive.minimizable !== newMinimizable) {
          $$invalidate(4, application.reactive.minimizable = newMinimizable, application);
        }
        const newResizable = typeof data.resizable === "boolean" ? data.resizable : void 0;
        if (newResizable !== void 0 && application.reactive.resizable !== newResizable) {
          $$invalidate(4, application.reactive.resizable = newResizable, application);
        }
        const newTitle = data.title ?? "Dialog";
        if (newTitle !== application?.options?.title) {
          $$invalidate(4, application.reactive.title = newTitle, application);
        }
        if (application.position.zIndex !== zIndex) {
          $$invalidate(4, application.position.zIndex = zIndex, application);
        }
      }
    }
    if ($$self.$$.dirty & /*data, appProps*/
    72) {
      if (isObject(data?.transition)) {
        const d = data.transition;
        if (d?.transition !== appProps.transition) {
          $$invalidate(6, appProps.transition = d.transition, appProps);
        }
        if (d?.inTransition !== appProps.inTransition) {
          $$invalidate(6, appProps.inTransition = d.inTransition, appProps);
        }
        if (d?.outTransition !== appProps.outTransition) {
          $$invalidate(6, appProps.outTransition = d.outTransition, appProps);
        }
        if (d?.transitionOptions !== appProps.transitionOptions) {
          $$invalidate(6, appProps.transitionOptions = d.transitionOptions, appProps);
        }
        if (d?.inTransitionOptions !== appProps.inTransitionOptions) {
          $$invalidate(6, appProps.inTransitionOptions = d.inTransitionOptions, appProps);
        }
        if (d?.outTransitionOptions !== appProps.outTransitionOptions) {
          $$invalidate(6, appProps.outTransitionOptions = d.outTransitionOptions, appProps);
        }
      }
    }
    if ($$self.$$.dirty & /*data, modalProps*/
    136) {
      {
        const newModalBackground = typeof data?.modalOptions?.background === "string" ? data.modalOptions.background : s_MODAL_BACKGROUND;
        if (newModalBackground !== modalProps.background) {
          $$invalidate(7, modalProps.background = newModalBackground, modalProps);
        }
      }
    }
    if ($$self.$$.dirty & /*data, modalProps*/
    136) {
      {
        const newModalSlotSeparate = typeof data?.modalOptions?.slotSeparate === "boolean" ? data.modalOptions.slotSeparate : void 0;
        if (newModalSlotSeparate !== modalProps.slotSeparate) {
          $$invalidate(7, modalProps.slotSeparate = newModalSlotSeparate, modalProps);
        }
      }
    }
    if ($$self.$$.dirty & /*data, modalProps*/
    136) {
      {
        const newModalStyles = isObject(data?.modalOptions?.styles) ? data.modalOptions.styles : void 0;
        if (newModalStyles !== modalProps.styles) {
          $$invalidate(7, modalProps.styles = newModalStyles, modalProps);
        }
      }
    }
    if ($$self.$$.dirty & /*data, modalProps*/
    136) {
      {
        const newModalCloseOnInput = typeof data?.modalOptions?.closeOnInput === "boolean" ? data.modalOptions.closeOnInput : void 0;
        if (newModalCloseOnInput !== modalProps.closeOnInput) {
          $$invalidate(7, modalProps.closeOnInput = newModalCloseOnInput, modalProps);
        }
      }
    }
    if ($$self.$$.dirty & /*data, modalProps*/
    136) {
      if (isObject(data?.modalOptions?.transition)) {
        const d = data.modalOptions.transition;
        if (d?.transition !== modalProps.transition) {
          $$invalidate(
            7,
            modalProps.transition = typeof d?.transition === "function" ? d.transition : s_MODAL_TRANSITION,
            modalProps
          );
        }
        if (d?.inTransition !== modalProps.inTransition) {
          $$invalidate(7, modalProps.inTransition = d.inTransition, modalProps);
        }
        if (d?.outTransition !== modalProps.outTransition) {
          $$invalidate(7, modalProps.outTransition = d.outTransition, modalProps);
        }
        if (d?.transitionOptions !== modalProps.transitionOptions) {
          $$invalidate(
            7,
            modalProps.transitionOptions = isObject(d?.transitionOptions) ? d.transitionOptions : s_MODAL_TRANSITION_OPTIONS,
            modalProps
          );
        }
        if (d?.inTransitionOptions !== modalProps.inTransitionOptions) {
          $$invalidate(7, modalProps.inTransitionOptions = d.inTransitionOptions, modalProps);
        }
        if (d?.outTransitionOptions !== modalProps.outTransitionOptions) {
          $$invalidate(7, modalProps.outTransitionOptions = d.outTransitionOptions, modalProps);
        }
      } else {
        const newModalTransition = typeof data?.modalOptions?.transition?.transition === "function" ? data.modalOptions.transition.transition : s_MODAL_TRANSITION;
        if (newModalTransition !== modalProps.transition) {
          $$invalidate(7, modalProps.transition = newModalTransition, modalProps);
        }
        const newModalTransitionOptions = isObject(data?.modalOptions?.transitionOptions) ? data.modalOptions.transitionOptions : s_MODAL_TRANSITION_OPTIONS;
        if (newModalTransitionOptions !== modalProps.transitionOptions) {
          $$invalidate(7, modalProps.transitionOptions = newModalTransitionOptions, modalProps);
        }
      }
    }
  };
  return [
    elementRoot,
    elementContent,
    dialogComponent,
    data,
    application,
    modal,
    appProps,
    modalProps,
    zIndex,
    managedPromise,
    dialogcontent_dialogComponent_binding,
    applicationshell_elementRoot_binding,
    applicationshell_elementContent_binding,
    close_glasspane_handler,
    dialogcontent_dialogComponent_binding_1,
    applicationshell_elementRoot_binding_1,
    applicationshell_elementContent_binding_1
  ];
}
class DialogShell extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$u, create_fragment$u, safe_not_equal, {
      elementContent: 1,
      elementRoot: 0,
      data: 3,
      dialogComponent: 2,
      managedPromise: 9
    });
  }
  get elementContent() {
    return this.$$.ctx[1];
  }
  set elementContent(elementContent) {
    this.$$set({ elementContent });
    flush();
  }
  get elementRoot() {
    return this.$$.ctx[0];
  }
  set elementRoot(elementRoot) {
    this.$$set({ elementRoot });
    flush();
  }
  get data() {
    return this.$$.ctx[3];
  }
  set data(data) {
    this.$$set({ data });
    flush();
  }
  get dialogComponent() {
    return this.$$.ctx[2];
  }
  set dialogComponent(dialogComponent) {
    this.$$set({ dialogComponent });
    flush();
  }
  get managedPromise() {
    return this.$$.ctx[9];
  }
  set managedPromise(managedPromise) {
    this.$$set({ managedPromise });
    flush();
  }
}
const DialogShell$1 = DialogShell;
cssVariables$1.setProperties({
  // Anchor text shadow / header buttons
  "--tjs-default-text-shadow-focus-hover": "0 0 8px var(--color-shadow-primary)",
  // TJSApplicationShell app background.
  "--tjs-app-background": `url("${globalThis.foundry.utils.getRoute("/ui/denim075.png")}")`
}, false);
class ManagedPromise {
  /** @type {boolean} */
  static #logging = false;
  /** @type {{ isProcessing?: boolean, promise?: Promise, reject: Function, resolve: Function }} */
  #current;
  /**
   * @returns {boolean} Whether global logging is enabled.
   */
  static get logging() {
    return this.#logging;
  }
  /**
   * @returns {boolean} Whether there is an active managed Promise.
   */
  get isActive() {
    return this.#current !== void 0;
  }
  /**
   * @returns {boolean} Whether there is an active managed Promise and resolution is currently being processed.
   */
  get isProcessing() {
    return this.#current !== void 0 ? this.#current.isProcessing : false;
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
    this.#logging = logging;
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
    if (reuse && this.#current !== void 0 && this.#current.promise instanceof Promise) {
      if (ManagedPromise.#logging) {
        console.warn(`[TRL] ManagedPromise.create info: Reusing / returning existing managed Promise.`);
      }
      return this.#current.promise;
    }
    if (this.#current !== void 0) {
      if (ManagedPromise.#logging) {
        console.warn(
          `[TRL] ManagedPromise.create info: Creating a new Promise and resolving existing immediately.`
        );
      }
      this.#current.resolve(void 0);
      this.#current = void 0;
    }
    const promise2 = new Promise((resolve, reject) => {
      this.#current = {
        isProcessing: false,
        reject,
        resolve
      };
    });
    this.#current.promise = promise2;
    return promise2;
  }
  /**
   * Gets the current Promise if any.
   *
   * @returns {Promise<any>} Current Promise.
   */
  get() {
    return this.#current ? this.#current.promise : void 0;
  }
  /**
   * Rejects the current Promise if applicable.
   *
   * @param {*}  [result] - Result to reject.
   *
   * @returns {boolean} Was the promise rejected.
   */
  reject(result = void 0) {
    if (this.#current !== void 0 && this.#current.isProcessing) {
      if (ManagedPromise.#logging) {
        console.warn(`[TRL] ManagedPromise.reject info: Currently processing promise.`);
      }
      return true;
    }
    if (this.#current !== void 0) {
      this.#current.isProcessing = true;
      if (result instanceof Promise) {
        result.then((value) => {
          this.#current.reject(value);
          this.#current = void 0;
        }).catch((err) => {
          this.#current.reject(err);
          this.#current = void 0;
        });
      } else {
        this.#current.reject(result);
        this.#current = void 0;
      }
      return true;
    } else {
      if (ManagedPromise.#logging) {
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
    if (this.#current !== void 0 && this.#current.isProcessing) {
      if (ManagedPromise.#logging) {
        console.warn(`[TRL] ManagedPromise.resolve info: Currently processing promise.`);
      }
      return true;
    }
    if (this.#current !== void 0) {
      if (result instanceof Promise) {
        this.#current.isProcessing = true;
        result.then((value) => {
          this.#current.resolve(value);
          this.#current = void 0;
        }).catch((err) => {
          this.#current.reject(err);
          this.#current = void 0;
        });
      } else {
        this.#current.resolve(result);
        this.#current = void 0;
      }
      return true;
    } else {
      if (ManagedPromise.#logging) {
        console.warn(`[TRL] ManagedPromise.resolve warning: No current managed Promise to resolve.`);
      }
      return false;
    }
  }
}
class TJSDialogData {
  /**
   * @type {import('../../index.js').SvelteApplication}
   */
  #application;
  /**
   * Stores the dialog options data.
   *
   * @type {import('./types').TJSDialogOptions}
   */
  #internal = {};
  /**
   * @param {import('../../index.js').SvelteApplication} application - The host Foundry application.
   */
  constructor(application) {
    this.#application = application;
  }
  /**
   * @returns {Record<string, import('./types').TJSDialogButtonData>} The dialog button configuration.
   */
  get buttons() {
    return this.#internal.buttons;
  }
  /**
   * Set the dialog button configuration.
   *
   * @param {string} buttons - New dialog button configuration.
   */
  set buttons(buttons) {
    this.#internal.buttons = buttons;
    this.#updateComponent();
  }
  /**
   * @returns {import('@typhonjs-fvtt/runtime/svelte/util').TJSSvelteConfig | string} The Svelte configuration object or HTML string
   *          content.
   */
  get content() {
    return this.#internal.content;
  }
  /**
   * Set the Svelte configuration object or HTML string content.
   *
   * @param {import('@typhonjs-fvtt/runtime/svelte/util').TJSSvelteConfig | string} content - New Svelte configuration object or
   *        HTML string content.
   */
  set content(content) {
    this.#internal.content = content;
    this.#updateComponent();
  }
  /**
   * @returns {string} The default button ID to focus initially.
   */
  get default() {
    return this.#internal.default;
  }
  /**
   * Set the default button ID to focus initially.
   *
   * @param {string} newDefault - New default button ID to focus initially.
   */
  set default(newDefault) {
    this.#internal.default = newDefault;
    this.#updateComponent();
  }
  /**
   * @returns {boolean} The dialog draggable state; draggable when true.
   */
  get draggable() {
    return this.#internal.draggable;
  }
  /**
   * Set the dialog state; draggable when true.
   *
   * @param {boolean} draggable - New dialog draggable state; draggable when true.
   */
  set draggable(draggable2) {
    this.#internal.draggable = draggable2;
    this.#updateComponent();
  }
  /**
   * @returns {boolean} When true auto-management of app focus is enabled.
   */
  get focusAuto() {
    return this.#internal.focusAuto;
  }
  /**
   * Set the dialog auto-management of app focus.
   *
   * @param {boolean} focusAuto - New dialog auto-management of app focus.
   */
  set focusAuto(focusAuto) {
    this.#internal.focusAuto = focusAuto;
    this.#updateComponent();
  }
  /**
   * @returns {boolean} When true the first focusable element that isn't a button is focused.
   */
  get focusFirst() {
    return this.#internal.focusFirst;
  }
  /**
   * Set the dialog first focusable element state.
   *
   * @param {boolean} focusFirst - New dialog first focusable element state.
   */
  set focusFirst(focusFirst) {
    this.#internal.focusFirst = focusFirst;
    this.#updateComponent();
  }
  /**
   * @returns {boolean} When `focusAuto` and `focusKeep` is true; keeps internal focus.
   */
  get focusKeep() {
    return this.#internal.focusKeep;
  }
  /**
   * Set the dialog `focusKeep` state. When `focusAuto` and `focusKeep` is true; keeps internal focus.
   *
   * @param {boolean} focusKeep - New dialog `focusKeep` state.
   */
  set focusKeep(focusKeep) {
    this.#internal.focusKeep = focusKeep;
    this.#updateComponent();
  }
  /**
   * @returns {boolean} When true the dialog is minimizable.
   */
  get minimizable() {
    return this.#internal.minimizable;
  }
  /**
   * Set the dialog `minimizable` state. When true the dialog is minimizable.
   *
   * @param {boolean} minimizable - New dialog `minimizable` state.
   */
  set minimizable(minimizable) {
    this.#internal.minimizable = minimizable;
    this.#updateComponent();
  }
  /**
   * @returns {boolean} When true a modal dialog is displayed.
   */
  get modal() {
    return this.#internal.modal;
  }
  /**
   * Set the dialog `modal` state. When true a modal dialog is displayed.
   *
   * @param {boolean} modal - New dialog `modal` state.
   */
  set modal(modal) {
    this.#internal.modal = modal;
    this.#updateComponent();
  }
  /**
   * @returns {import('./types').TJSDialogModalOptions} Additional options for modal dialog display.
   */
  get modalOptions() {
    return this.#internal.modalOptions;
  }
  /**
   * Set additional options for modal dialog display.
   *
   * @param {import('./types').TJSDialogModalOptions} modalOptions - New additional options for modal dialog display.
   */
  set modalOptions(modalOptions) {
    this.#internal.modalOptions = modalOptions;
    this.#updateComponent();
  }
  /**
   * @returns {boolean} When true and an error is raised in dialog callback functions post a UI error notification.
   */
  get notifyError() {
    return this.#internal.notifyError;
  }
  /**
   * Set the dialog `notifyError` state. When true and an error is raised in dialog callback functions post a UI error
   * notification.
   *
   * @param {boolean} notifyError - New dialog `notifyError` state.
   */
  set notifyError(notifyError) {
    this.#internal.notifyError = notifyError;
    this.#updateComponent();
  }
  /**
   * @returns {string | ((application: import('../../index.js').TJSDialog) => any)} Callback invoked when dialog is
   *          closed; no button option selected. When defined as a string any matching function by name exported from
   *          content Svelte component is invoked.
   */
  get onClose() {
    return this.#internal.onClose;
  }
  /**
   * Set callback invoked when dialog is closed; no button option selected. When defined as a string any matching
   * function by name exported from content Svelte component is invoked..
   *
   * @param {string | ((application: import('../../index.js').TJSDialog) => any)} onClose - New dialog `onClose` state.
   */
  set onClose(onClose) {
    this.#internal.onClose = onClose;
    this.#updateComponent();
  }
  /**
   * @returns {boolean} Dialog `rejectClose` state. When true and a Promise has been created by {@link TJSDialog.wait}
   *          and the Promise is not in the process of being resolved or rejected on close of the dialog any `onClose`
   *          function is invoked and any result that is undefined will cause the Promise to then be rejected..
   */
  get rejectClose() {
    return this.#internal.rejectClose;
  }
  /**
   * Set the dialog `rejectClose` state.
   *
   * @param {boolean} rejectClose - New dialog `rejectClose` state.
   */
  set rejectClose(rejectClose) {
    this.#internal.rejectClose = rejectClose;
    this.#updateComponent();
  }
  /**
   * @returns {boolean} When true the dialog is resizable.
   */
  get resizable() {
    return this.#internal.resizable;
  }
  /**
   * Set the dialog `resizable` state. When true the dialog is resizable.
   *
   * @param {boolean} resizable - New dialog `resizable` state.
   */
  set resizable(resizable) {
    this.#internal.resizable = resizable;
    this.#updateComponent();
  }
  /**
   * @returns {boolean} When true and resolving any Promises and there are undefined results from any button callbacks
   *          the button ID is resolved.
   */
  get resolveId() {
    return this.#internal.resolveId;
  }
  /**
   * Set the dialog `resolveId` state. When true and resolving any Promises and there are undefined results from any
   * button callbacks the button ID is resolved.
   *
   * @param {boolean} resolveId - New dialog `resolveId` state.
   */
  set resolveId(resolveId) {
    this.#internal.resolveId = resolveId;
    this.#updateComponent();
  }
  /**
   * @returns {string} The dialog window title.
   */
  get title() {
    return this.#internal.title;
  }
  /**
   * Set the dialog window title.
   *
   * @param {string} title - New dialog window title.
   */
  set title(title) {
    this.#internal.title = title;
    this.#updateComponent();
  }
  /**
   * @returns {import('./types').TJSDialogTransitionOptions} Transition options for the dialog.
   */
  get transition() {
    return this.#internal.transition;
  }
  /**
   * Set transition options for the dialog.
   *
   * @param {import('./types').TJSDialogTransitionOptions} transition - New transition options for the dialog.
   */
  set transition(transition) {
    this.#internal.transition = transition;
    this.#updateComponent();
  }
  /**
   * @returns {number | null} A specific z-index for the dialog. Pass null for the dialog to act like other
   *          applications in regard bringing to top when activated.
   */
  get zIndex() {
    return this.#internal.zIndex;
  }
  /**
   * Set specific z-index for the dialog.
   *
   * @param {number | null} zIndex - New z-index for the dialog.
   */
  set zIndex(zIndex) {
    this.#internal.zIndex = zIndex;
    this.#updateComponent();
  }
  /**
   * Provides a way to safely get this dialogs data given an accessor string which describes the
   * entries to walk. To access deeper entries into the object format the accessor string with `.` between entries
   * to walk.
   *
   * @param {string}   accessor - The path / key to set. You can set multiple levels.
   *
   * @param {any}      [defaultValue] - A default value returned if the accessor is not found.
   *
   * @returns {any} Value at the accessor.
   */
  get(accessor, defaultValue) {
    return safeAccess(this.#internal, accessor, defaultValue);
  }
  /**
   * @param {import('./types').TJSDialogOptions} data - Merge provided data object into Dialog data.
   */
  merge(data) {
    deepMerge(this.#internal, data);
    this.#updateComponent();
  }
  /**
   * Sets the dialog data; this is reactive.
   *
   * @param {import('./types').TJSDialogOptions}   data - Dialog data.
   */
  replace(data) {
    if (!isObject(data)) {
      throw new TypeError(`TJSDialogData replace error: 'data' is not an object'.`);
    }
    this.#internal = {};
    this.merge(data);
  }
  /**
   * Provides a way to safely set this dialogs data given an accessor string which describes the
   * entries to walk. To access deeper entries into the object format the accessor string with `.` between entries
   * to walk.
   *
   * Automatically the dialog data will be updated in the associated DialogShell Svelte component.
   *
   * @param {string}   accessor - The path / key to set. You can set multiple levels.
   *
   * @param {any}      value - Value to set.
   *
   * @returns {boolean} True if successful.
   */
  set(accessor, value) {
    const success = safeSet(this.#internal, accessor, value);
    if (success) {
      this.#updateComponent();
    }
    return success;
  }
  /**
   * Updates the data in the Svelte dialog component.
   */
  #updateComponent() {
    const component = this.#application.svelte.component(0);
    if (component?.data) {
      component.data = this.#internal;
    }
  }
}
class TJSDialog extends SvelteApplication {
  /** @type {TJSDialogData} */
  #data;
  /** @type {ManagedPromise} */
  #managedPromise;
  /**
   * @param {import('./internal/state-dialog/types').TJSDialogOptions}           data - Dialog options.
   *
   * @param {import('./').SvelteApplicationOptions}   [options] - SvelteApplication options.
   */
  constructor(data, options = {}) {
    super(options);
    this.#managedPromise = new ManagedPromise();
    this.#data = new TJSDialogData(this);
    this.#data.replace(data);
    Object.defineProperty(this.svelte, "dialogComponent", {
      get: () => this.svelte?.applicationShell?.dialogComponent
    });
  }
  /**
   * Default options for TJSDialog. Provides a default width and setting `height` to `auto` to always display dialog
   * content even if it changes. The default `DialogShell` / `svelte` options should not be changed and instead mount
   * the dialog content component by supplying a Svelte configuration object to dialog data `content` field.
   *
   * @returns {import('./').SvelteApplicationOptions} Default options
   */
  static get defaultOptions() {
    return deepMerge(super.defaultOptions, {
      classes: ["dialog", "tjs-dialog"],
      width: 400,
      height: "auto",
      svelte: {
        class: DialogShell$1,
        intro: true,
        target: document.body,
        props: function() {
          return {
            data: this.#data,
            managedPromise: this.#managedPromise
          };
        }
      }
    });
  }
  /**
   * Returns the dialog data.
   *
   * @returns {import('./internal/state-dialog/types').TJSDialogData} Dialog data.
   */
  get data() {
    return this.#data;
  }
  /**
   * @returns {import('@typhonjs-fvtt/runtime/util/async').ManagedPromise} Returns the managed promise.
   */
  get managedPromise() {
    return this.#managedPromise;
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
    try {
      if (this.#managedPromise.isActive && !this.#managedPromise.isProcessing) {
        const result = TJSDialog.#invokeFn(this.#data.onClose, this, null);
        const rejectClose = typeof this.#data.rejectClose === "boolean" ? this.#data.rejectClose : false;
        if (rejectClose && result === null) {
          this.#managedPromise.reject(new Error("TJSDialog was closed without a choice being made."));
        } else {
          this.#managedPromise.resolve(result);
        }
      }
    } catch (err) {
      const notifyError = typeof this.#data.notifyError === "boolean" ? this.#data.notifyError : true;
      if (notifyError) {
        globalThis.ui.notifications.error(err, { console: false });
      }
      if (!this.#managedPromise.reject(err)) {
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
    return this.#managedPromise.create(options);
  }
  // ---------------------------------------------------------------------------------------------------------------
  /**
   * A helper factory method to create simple confirmation dialog windows which consist of simple yes / no prompts.
   * If you require more flexibility, a custom TJSDialog instance is preferred. The default focused button is 'yes'.
   * You can change the default focused button by setting `default` to `yes` or `no`.
   *
   * @template T
   *
   * @param {import('./internal/state-dialog/types').TJSDialogOptions & {
   *    onYes?: string|((application: TJSDialog) => any),
   *    onNo?: string|((application: TJSDialog) => any)
   * }} [data] - Confirm dialog options.
   *
   * @param {string|((application: TJSDialog) => any)} [data.onYes] - Callback function upon `yes`; may be an async
   *        function. When defined as a string any matching function by name exported from content Svelte component is
   *        invoked.
   *
   * @param {string|((application: TJSDialog) => any)} [data.onNo] - Callback function upon `no`; may be an async
   *        function. When defined as a string any matching function by name exported from content Svelte component is
   *        invoked.
   *
   * @param {import('./').SvelteApplicationOptions}  [options]  SvelteApplication options passed to the TJSDialog
   *        constructor.
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
          onPress: (application) => this.#invokeFn(onYes, application, true)
        },
        no: {
          onPress: (application) => this.#invokeFn(onNo, application, false)
        }
      }),
      default: data.default ?? "yes"
    }, options);
  }
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
   *
   * @internal
   */
  static #invokeFn(callback, application, defaultResult = void 0) {
    let result = defaultResult;
    switch (typeof callback) {
      case "function":
        result = callback(application);
        break;
      case "string": {
        const dialogComponent = application?.svelte?.dialogComponent;
        if (dialogComponent !== void 0 && typeof dialogComponent?.[callback] === "function") {
          result = dialogComponent?.[callback](application);
        } else {
          if (dialogComponent === void 0) {
            console.warn(`[TRL] TJSDialog warning: 'onPress' defined as a string with no associated content Svelte component.`);
          } else if (typeof dialogComponent?.[callback] !== "function") {
            console.warn(`[TRL] TJSDialog warning: The content Svelte component does not contain an associated function '${callback}'. Did you remember to add '<svelte:options accessors={true} />' and export the function?`);
          }
        }
        break;
      }
    }
    return result;
  }
  /**
   * A helper factory method to display a basic "prompt" style TJSDialog with a single button.
   *
   * @template T
   *
   * @param {import('./internal/state-dialog/types').TJSDialogOptions & {
   *    onOk?: string|((application: TJSDialog) => any),
   *    label?: string,
   *    icon?: string
   * }} [data] - Prompt dialog options that includes any TJSDialog options along with the following optional fields:
   *
   * @param {string|((application: TJSDialog) => any)} [data.onOk] - Callback function upon `ok`; may be an async
   *        function. When defined as a string any matching function by name exported from content Svelte component is
   *        invoked.
   *
   * @param {string}   [data.label] - The OK prompt button text.
   *
   * @param {string}   [data.icon="fas fa-check"] - Set another icon besides `fas fa-check` for button.
   *
   * @param {import('./').SvelteApplicationOptions}  [options]  SvelteApplication options passed to the TJSDialog
   *        constructor.
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
          onPress: (application) => this.#invokeFn(onOk, application, true)
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
   * @param {import('./internal/state-dialog/types').TJSDialogOptions}  data - Dialog data passed to the TJSDialog constructor.
   *
   * @param {import('./').SvelteApplicationOptions}  [options]  SvelteApplication options passed to the TJSDialog
   *        constructor.
   *
   * @returns {Promise<T>} A Promise that resolves to the chosen result.
   */
  static async wait(data, options = {}) {
    if (!isObject(data)) {
      throw new TypeError(`TJSDialog.wait error: 'data' is not an object'.`);
    }
    return new this({ ...data }, options).wait();
  }
}
const ActorEquipment_svelte_svelte_type_style_lang = "";
function create_if_block$a(ctx) {
  let div;
  let div_transition;
  let current;
  function select_block_type(ctx2, dirty) {
    if (
      /*item*/
      ctx2[0].system.description.value
    )
      return create_if_block_1$7;
    return create_else_block$4;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      div = element("div");
      if_block.c();
      attr(div, "class", "item-description svelte-lbvtt-19gus65");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if_block.m(div, null);
      current = true;
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(div, null);
        }
      }
    },
    i(local) {
      if (current)
        return;
      if (local) {
        add_render_callback(() => {
          if (!current)
            return;
          if (!div_transition)
            div_transition = create_bidirectional_transition(div, slide, { duration: 150, easing: sineInOut }, true);
          div_transition.run(1);
        });
      }
      current = true;
    },
    o(local) {
      if (local) {
        if (!div_transition)
          div_transition = create_bidirectional_transition(div, slide, { duration: 150, easing: sineInOut }, false);
        div_transition.run(0);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if_block.d();
      if (detaching && div_transition)
        div_transition.end();
    }
  };
}
function create_else_block$4(ctx) {
  let t;
  return {
    c() {
      t = text("No description here...");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_if_block_1$7(ctx) {
  let html_tag;
  let raw_value = (
    /*item*/
    ctx[0].system.description.value + ""
  );
  let html_anchor;
  return {
    c() {
      html_tag = new HtmlTag(false);
      html_anchor = empty();
      html_tag.a = html_anchor;
    },
    m(target, anchor) {
      html_tag.m(raw_value, target, anchor);
      insert(target, html_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*item*/
      1 && raw_value !== (raw_value = /*item*/
      ctx2[0].system.description.value + ""))
        html_tag.p(raw_value);
    },
    d(detaching) {
      if (detaching) {
        detach(html_anchor);
        html_tag.d();
      }
    }
  };
}
function create_fragment$t(ctx) {
  let div4;
  let div3;
  let div1;
  let div0;
  let img0;
  let img0_src_value;
  let t0;
  let img1;
  let img1_src_value;
  let t1;
  let span;
  let t2_value = (
    /*item*/
    ctx[0].name + ""
  );
  let t2;
  let t3;
  let div2;
  let a0;
  let i0;
  let a0_data_tooltip_value;
  let t4;
  let a1;
  let t5;
  let a2;
  let t6;
  let mounted;
  let dispose;
  let if_block = (
    /*expanded*/
    ctx[1] && create_if_block$a(ctx)
  );
  return {
    c() {
      div4 = element("div");
      div3 = element("div");
      div1 = element("div");
      div0 = element("div");
      img0 = element("img");
      t0 = space();
      img1 = element("img");
      t1 = space();
      span = element("span");
      t2 = text(t2_value);
      t3 = space();
      div2 = element("div");
      a0 = element("a");
      i0 = element("i");
      t4 = space();
      a1 = element("a");
      a1.innerHTML = `<i class="fas fa-edit"></i>`;
      t5 = space();
      a2 = element("a");
      a2.innerHTML = `<i class="fas fa-trash"></i>`;
      t6 = space();
      if (if_block)
        if_block.c();
      attr(img0, "class", "item-image svelte-lbvtt-19gus65");
      if (!src_url_equal(img0.src, img0_src_value = /*item*/
      ctx[0].img))
        attr(img0, "src", img0_src_value);
      attr(img1, "class", "clickable clickable-red item-rollable-image svelte-lbvtt-19gus65");
      if (!src_url_equal(img1.src, img1_src_value = "icons/dice/d10black.svg"))
        attr(img1, "src", img1_src_value);
      attr(div0, "class", "item-image-container svelte-lbvtt-19gus65");
      attr(span, "class", "item-expand clickable clickable-red");
      attr(div1, "class", "item-name svelte-lbvtt-19gus65");
      attr(i0, "class", "fas");
      toggle_class(i0, "fa-shield-alt", !/*item*/
      ctx[0].system.equipped);
      toggle_class(
        i0,
        "fa-shield",
        /*item*/
        ctx[0].system.equipped
      );
      attr(a0, "class", "item-control item-not-equipped svelte-lbvtt-19gus65");
      attr(a0, "data-tooltip", a0_data_tooltip_value = localize(
        /*item*/
        ctx[0].system.equipped ? "LEOBREW.Equipped" : "LEOBREW.Unequipped"
      ));
      toggle_class(
        a0,
        "item-equipped",
        /*item*/
        ctx[0].system.equipped
      );
      attr(a1, "class", "item-control item-edit svelte-lbvtt-19gus65");
      attr(a1, "data-tooltip", localize("LEOBREW.EquipmentEdit"));
      attr(a2, "class", "item-control item-delete svelte-lbvtt-19gus65");
      attr(a2, "data-tooltip", localize("LEOBREW.EquipmentDelete"));
      attr(div2, "class", "item-controls flexrow svelte-lbvtt-19gus65");
      attr(div3, "class", "item-header svelte-lbvtt-19gus65");
      attr(div4, "class", "item even-shading svelte-lbvtt-19gus65");
    },
    m(target, anchor) {
      insert(target, div4, anchor);
      append(div4, div3);
      append(div3, div1);
      append(div1, div0);
      append(div0, img0);
      append(div0, t0);
      append(div0, img1);
      append(div1, t1);
      append(div1, span);
      append(span, t2);
      append(div3, t3);
      append(div3, div2);
      append(div2, a0);
      append(a0, i0);
      append(div2, t4);
      append(div2, a1);
      append(div2, t5);
      append(div2, a2);
      append(div4, t6);
      if (if_block)
        if_block.m(div4, null);
      if (!mounted) {
        dispose = [
          listen(
            img1,
            "click",
            /*click_handler*/
            ctx[4]
          ),
          listen(
            span,
            "click",
            /*click_handler_1*/
            ctx[5]
          ),
          listen(
            a0,
            "click",
            /*click_handler_2*/
            ctx[6]
          ),
          listen(
            a1,
            "click",
            /*click_handler_3*/
            ctx[7]
          ),
          listen(
            a2,
            "click",
            /*click_handler_4*/
            ctx[8]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*item*/
      1 && !src_url_equal(img0.src, img0_src_value = /*item*/
      ctx2[0].img)) {
        attr(img0, "src", img0_src_value);
      }
      if (dirty & /*item*/
      1 && t2_value !== (t2_value = /*item*/
      ctx2[0].name + ""))
        set_data(t2, t2_value);
      if (dirty & /*item*/
      1) {
        toggle_class(i0, "fa-shield-alt", !/*item*/
        ctx2[0].system.equipped);
      }
      if (dirty & /*item*/
      1) {
        toggle_class(
          i0,
          "fa-shield",
          /*item*/
          ctx2[0].system.equipped
        );
      }
      if (dirty & /*item*/
      1 && a0_data_tooltip_value !== (a0_data_tooltip_value = localize(
        /*item*/
        ctx2[0].system.equipped ? "LEOBREW.Equipped" : "LEOBREW.Unequipped"
      ))) {
        attr(a0, "data-tooltip", a0_data_tooltip_value);
      }
      if (dirty & /*item*/
      1) {
        toggle_class(
          a0,
          "item-equipped",
          /*item*/
          ctx2[0].system.equipped
        );
      }
      if (
        /*expanded*/
        ctx2[1]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*expanded*/
          2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$a(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div4, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      transition_in(if_block);
    },
    o(local) {
      transition_out(if_block);
    },
    d(detaching) {
      if (detaching) {
        detach(div4);
      }
      if (if_block)
        if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$t($$self, $$props, $$invalidate) {
  let expanded;
  let $appState;
  const appState = getContext("ApplicationStateStore");
  component_subscribe($$self, appState, (value) => $$invalidate(3, $appState = value));
  let { item } = $$props;
  const click_handler = () => {
    item.roll();
  };
  const click_handler_1 = () => {
    appState.update((state) => {
      if (expanded) {
        state.isExpanded.inventory.delete(item.id);
      } else {
        state.isExpanded.inventory.add(item.id);
      }
      return state;
    });
  };
  const click_handler_2 = () => {
    item.update({ "system.equipped": !item.system.equipped });
  };
  const click_handler_3 = () => {
    item.sheet.render(true);
  };
  const click_handler_4 = () => {
    TJSDialog.confirm(
      {
        title: "Delete Equipment",
        content: `<p style='text-align: center;'>Are you sure you want to delete "${item.name}"?</p>`,
        onYes: () => {
          item.delete();
        }
      },
      { width: 270, height: "auto" }
    );
  };
  $$self.$$set = ($$props2) => {
    if ("item" in $$props2)
      $$invalidate(0, item = $$props2.item);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$appState, item*/
    9) {
      $$invalidate(1, expanded = $appState.isExpanded.inventory.has(item.id));
    }
  };
  return [
    item,
    expanded,
    appState,
    $appState,
    click_handler,
    click_handler_1,
    click_handler_2,
    click_handler_3,
    click_handler_4
  ];
}
class ActorEquipment extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$t, create_fragment$t, safe_not_equal, { item: 0 });
  }
}
function capitalizeFirstLetter(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}
function isResponsibleGM() {
  if (!game.user.isGM)
    return false;
  const connectedGMs = game.users.filter((user) => user.active && user.isGM);
  return !connectedGMs.some((other) => other.id < game.userId);
}
function roundDownRoll(roll) {
  return Math.max(3, Math.floor(roll / 3) * 3);
}
function promptSituationalBonus(title) {
  return new Promise((resolve) => {
    Dialog.prompt({
      title: `Situational Bonus`,
      label: "Ok",
      content: `
              <p style="text-align: center;">Do you want to add a situational bonus to this "${title}" roll?</p>
              <p style="text-align: center;"><input type="number" value="0"></p>
          `,
      callback: (html) => {
        resolve(html.find("input").val() ?? 0);
      },
      options: { width: 200 }
    });
  });
}
const SearchableItemList_svelte_svelte_type_style_lang = "";
function get_each_context$8(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[14] = list[i];
  return child_ctx;
}
function create_if_block$9(ctx) {
  let a;
  let i;
  let mounted;
  let dispose;
  return {
    c() {
      a = element("a");
      i = element("i");
      attr(i, "class", "fas svelte-lbvtt-1tezylj");
      toggle_class(
        i,
        "inactive-filter",
        /*$filters*/
        ctx[2]["system.equipped"] === null
      );
      toggle_class(i, "fa-shield-alt", !/*$filters*/
      ctx[2]["system.equipped"]);
      toggle_class(
        i,
        "fa-shield",
        /*$filters*/
        ctx[2]["system.equipped"]
      );
      attr(a, "class", "item-control item-filter svelte-lbvtt-1tezylj");
      attr(a, "data-type", "equipment");
    },
    m(target, anchor) {
      insert(target, a, anchor);
      append(a, i);
      if (!mounted) {
        dispose = listen(
          a,
          "click",
          /*click_handler*/
          ctx[12]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*$filters*/
      4) {
        toggle_class(
          i,
          "inactive-filter",
          /*$filters*/
          ctx2[2]["system.equipped"] === null
        );
      }
      if (dirty & /*$filters*/
      4) {
        toggle_class(i, "fa-shield-alt", !/*$filters*/
        ctx2[2]["system.equipped"]);
      }
      if (dirty & /*$filters*/
      4) {
        toggle_class(
          i,
          "fa-shield",
          /*$filters*/
          ctx2[2]["system.equipped"]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(a);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_each_block$8(key_1, ctx) {
  let first;
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value = (
    /*component*/
    ctx[0]
  );
  function switch_props(ctx2, dirty) {
    return { props: { item: (
      /*item*/
      ctx2[14]
    ) } };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
  }
  return {
    key: key_1,
    first: null,
    c() {
      first = empty();
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
      this.first = first;
    },
    m(target, anchor) {
      insert(target, first, anchor);
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*component*/
      1 && switch_value !== (switch_value = /*component*/
      ctx[0])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        const switch_instance_changes = {};
        if (dirty & /*items*/
        16)
          switch_instance_changes.item = /*item*/
          ctx[14];
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(first);
        detach(switch_instance_anchor);
      }
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_fragment$s(ctx) {
  let div0;
  let input;
  let t0;
  let t1;
  let a;
  let i;
  let t2;
  let t3_value = localize("LEOBREW.Add") + "";
  let t3;
  let t4;
  let div1;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let current;
  let mounted;
  let dispose;
  let if_block = (
    /*type*/
    ctx[1] === "equipment" && create_if_block$9(ctx)
  );
  let each_value = ensure_array_like(
    /*items*/
    ctx[4]
  );
  const get_key = (ctx2) => (
    /*item*/
    ctx2[14].id
  );
  for (let i2 = 0; i2 < each_value.length; i2 += 1) {
    let child_ctx = get_each_context$8(ctx, each_value, i2);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i2] = create_each_block$8(key, child_ctx));
  }
  return {
    c() {
      div0 = element("div");
      input = element("input");
      t0 = space();
      if (if_block)
        if_block.c();
      t1 = space();
      a = element("a");
      i = element("i");
      t2 = space();
      t3 = text(t3_value);
      t4 = space();
      div1 = element("div");
      for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
        each_blocks[i2].c();
      }
      attr(input, "placeholder", localize(`LEOBREW.${/*capType*/
      ctx[7]}Search`));
      attr(input, "type", "text");
      attr(i, "class", "fas fa-plus");
      attr(a, "class", "item-control item-create svelte-lbvtt-1tezylj");
      attr(a, "data-tooltip", localize(`LEOBREW.${/*capType*/
      ctx[7]}Create`));
      attr(a, "data-type", "equipment");
      attr(div0, "class", "items-header svelte-lbvtt-1tezylj");
      attr(div1, "class", "item-list item-inventory svelte-lbvtt-1tezylj");
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      append(div0, input);
      set_input_value(
        input,
        /*$search*/
        ctx[3]
      );
      append(div0, t0);
      if (if_block)
        if_block.m(div0, null);
      append(div0, t1);
      append(div0, a);
      append(a, i);
      append(a, t2);
      append(a, t3);
      insert(target, t4, anchor);
      insert(target, div1, anchor);
      for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
        if (each_blocks[i2]) {
          each_blocks[i2].m(div1, null);
        }
      }
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            input,
            "input",
            /*input_input_handler*/
            ctx[11]
          ),
          listen(
            a,
            "click",
            /*click_handler_1*/
            ctx[13]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*$search*/
      8 && input.value !== /*$search*/
      ctx2[3]) {
        set_input_value(
          input,
          /*$search*/
          ctx2[3]
        );
      }
      if (
        /*type*/
        ctx2[1] === "equipment"
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$9(ctx2);
          if_block.c();
          if_block.m(div0, t1);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty & /*component, items*/
      17) {
        each_value = ensure_array_like(
          /*items*/
          ctx2[4]
        );
        group_outros();
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, div1, outro_and_destroy_block, create_each_block$8, null, get_each_context$8);
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i2 = 0; i2 < each_value.length; i2 += 1) {
        transition_in(each_blocks[i2]);
      }
      current = true;
    },
    o(local) {
      for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
        transition_out(each_blocks[i2]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div0);
        detach(t4);
        detach(div1);
      }
      if (if_block)
        if_block.d();
      for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
        each_blocks[i2].d();
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$s($$self, $$props, $$invalidate) {
  let items;
  let $filters;
  let $search;
  let $appState;
  const appState = getContext("ApplicationStateStore");
  component_subscribe($$self, appState, (value) => $$invalidate(5, $appState = value));
  let { itemsStore } = $$props;
  let { component } = $$props;
  let { type } = $$props;
  const capType = capitalizeFirstLetter(type);
  let search = writable("");
  component_subscribe($$self, search, (value) => $$invalidate(3, $search = value));
  let filters = writable({ "system.equipped": null });
  component_subscribe($$self, filters, (value) => $$invalidate(2, $filters = value));
  function input_input_handler() {
    $search = this.value;
    search.set($search);
  }
  const click_handler = async () => {
    filters.update((val) => {
      val["system.equipped"] = val["system.equipped"] === null ? true : val["system.equipped"] === false ? null : false;
      return val;
    });
  };
  const click_handler_1 = async () => {
    const [item] = await $appState.actor.createEmbeddedDocuments("Item", [{ name: `New ${capType}`, type }]);
    item.sheet.render(true);
  };
  $$self.$$set = ($$props2) => {
    if ("itemsStore" in $$props2)
      $$invalidate(10, itemsStore = $$props2.itemsStore);
    if ("component" in $$props2)
      $$invalidate(0, component = $$props2.component);
    if ("type" in $$props2)
      $$invalidate(1, type = $$props2.type);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*itemsStore, $search, $filters*/
    1036) {
      $$invalidate(4, items = itemsStore.filter((item) => {
        return $search.toLowerCase().split(" ").every((part) => (!part || item.name.toLowerCase().includes(part)) && Object.entries($filters).every(([key, filter]) => {
          return filter === null || foundry.utils.getProperty(item, key) === filter;
        }));
      }).sort((a, b) => {
        return b.sort !== a.sort ? b.sort - a.sort : a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
      }));
    }
  };
  return [
    component,
    type,
    $filters,
    $search,
    items,
    $appState,
    appState,
    capType,
    search,
    filters,
    itemsStore,
    input_input_handler,
    click_handler,
    click_handler_1
  ];
}
class SearchableItemList extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$s, create_fragment$s, safe_not_equal, { itemsStore: 10, component: 0, type: 1 });
  }
}
class DynReducerUtils {
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
}
class AdapterDerived {
  #hostData;
  #DerivedReducerCtor;
  #parentIndex;
  #derived = /* @__PURE__ */ new Map();
  #destroyed = false;
  /**
   * @param hostData - Hosted data structure.
   *
   * @param parentIndex - Any associated parent index API.
   *
   * @param DerivedReducerCtor - The default derived reducer constructor function.
   */
  constructor(hostData, parentIndex, DerivedReducerCtor) {
    this.#hostData = hostData;
    this.#parentIndex = parentIndex;
    this.#DerivedReducerCtor = DerivedReducerCtor;
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
    if (this.#destroyed) {
      throw Error(`AdapterDerived.create error: this instance has been destroyed.`);
    }
    let name;
    let rest = {};
    let ctor;
    const DerivedReducerCtor = this.#DerivedReducerCtor;
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
      throw new TypeError(`AdapterDerived.create error: 'ctor' is not a '${DerivedReducerCtor?.name}'.`);
    }
    name = name ?? ctor?.name;
    if (typeof name !== "string") {
      throw new TypeError(`AdapterDerived.create error: 'name' is not a string.`);
    }
    const derivedReducer = new ctor(this.#hostData, this.#parentIndex, rest);
    this.#derived.set(name, derivedReducer);
    return derivedReducer;
  }
  /**
   * Removes all derived reducers and associated subscriptions.
   */
  clear() {
    if (this.#destroyed) {
      return;
    }
    for (const reducer of this.#derived.values()) {
      reducer.destroy();
    }
    this.#derived.clear();
  }
  /**
   * Deletes and destroys a derived reducer by name.
   *
   * @param name - Name of the derived reducer.
   */
  delete(name) {
    if (this.#destroyed) {
      throw Error(`AdapterDerived.delete error: this instance has been destroyed.`);
    }
    const reducer = this.#derived.get(name);
    if (reducer) {
      reducer.destroy();
    }
    return this.#derived.delete(name);
  }
  /**
   * Removes all derived reducers, subscriptions, and cleans up all resources.
   */
  destroy() {
    if (this.#destroyed) {
      return;
    }
    this.clear();
    this.#hostData = [null];
    this.#parentIndex = null;
    this.#destroyed = true;
  }
  /**
   * Returns an existing derived reducer.
   *
   * @param name - Name of derived reducer.
   */
  get(name) {
    if (this.#destroyed) {
      throw Error(`AdapterDerived.get error: this instance has been destroyed.`);
    }
    return this.#derived.get(name);
  }
  /**
   * Updates all managed derived reducer indexes.
   *
   * @param [force] - Force an update to subscribers.
   */
  update(force = false) {
    if (this.#destroyed) {
      return;
    }
    for (const reducer of this.#derived.values()) {
      reducer.index.update(force);
    }
  }
}
class AdapterFilters {
  #filtersData;
  #indexUpdate;
  #mapUnsubscribe = /* @__PURE__ */ new Map();
  /**
   * @param indexUpdate - update function for the indexer.
   *
   * @param filtersAdapter - Stores the filter function data.
   */
  constructor(indexUpdate, filtersAdapter) {
    this.#indexUpdate = indexUpdate;
    this.#filtersData = filtersAdapter;
    Object.freeze(this);
  }
  /**
   * @returns Returns the length of the filter data.
   */
  get length() {
    return this.#filtersData.filters.length;
  }
  /**
   * Provides an iterator for filters.
   *
   * @yields {DataFilter<T>}
   */
  *[Symbol.iterator]() {
    if (this.#filtersData.filters.length === 0) {
      return;
    }
    for (const entry of this.#filtersData.filters) {
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
      const index = this.#filtersData.filters.findIndex((value) => {
        return data.weight < value.weight;
      });
      if (index >= 0) {
        this.#filtersData.filters.splice(index, 0, data);
      } else {
        this.#filtersData.filters.push(data);
      }
      if (typeof subscribeFn === "function") {
        const unsubscribe = subscribeFn(this.#indexUpdate);
        if (typeof unsubscribe !== "function") {
          throw new TypeError("AdapterFilters error: Filter has subscribe function, but no unsubscribe function is returned.");
        }
        if (this.#mapUnsubscribe.has(data.filter)) {
          throw new Error("AdapterFilters error: Filter added already has an unsubscribe function registered.");
        }
        this.#mapUnsubscribe.set(data.filter, unsubscribe);
        subscribeCount++;
      }
    }
    if (subscribeCount < filters.length) {
      this.#indexUpdate();
    }
  }
  /**
   * Clears and removes all filters.
   */
  clear() {
    this.#filtersData.filters.length = 0;
    for (const unsubscribe of this.#mapUnsubscribe.values()) {
      unsubscribe();
    }
    this.#mapUnsubscribe.clear();
    this.#indexUpdate();
  }
  /**
   * @param filters -
   */
  remove(...filters) {
    const length = this.#filtersData.filters.length;
    if (length === 0) {
      return;
    }
    for (const data of filters) {
      const actualFilter = typeof data === "function" ? data : data !== null && typeof data === "object" ? data.filter : void 0;
      if (!actualFilter) {
        continue;
      }
      for (let cntr = this.#filtersData.filters.length; --cntr >= 0; ) {
        if (this.#filtersData.filters[cntr].filter === actualFilter) {
          this.#filtersData.filters.splice(cntr, 1);
          let unsubscribe = void 0;
          if (typeof (unsubscribe = this.#mapUnsubscribe.get(actualFilter)) === "function") {
            unsubscribe();
            this.#mapUnsubscribe.delete(actualFilter);
          }
        }
      }
    }
    if (length !== this.#filtersData.filters.length) {
      this.#indexUpdate();
    }
  }
  /**
   * Remove filters by the provided callback. The callback takes 3 parameters: `id`, `filter`, and `weight`.
   * Any truthy value returned will remove that filter.
   *
   * @param callback - Callback function to evaluate each filter entry.
   */
  removeBy(callback) {
    const length = this.#filtersData.filters.length;
    if (length === 0) {
      return;
    }
    if (typeof callback !== "function") {
      throw new TypeError(`AdapterFilters error: 'callback' is not a function.`);
    }
    this.#filtersData.filters = this.#filtersData.filters.filter((data) => {
      const remove = callback.call(callback, { ...data });
      if (remove) {
        let unsubscribe;
        if (typeof (unsubscribe = this.#mapUnsubscribe.get(data.filter)) === "function") {
          unsubscribe();
          this.#mapUnsubscribe.delete(data.filter);
        }
      }
      return !remove;
    });
    if (length !== this.#filtersData.filters.length) {
      this.#indexUpdate();
    }
  }
  /**
   * @param ids - Removes filters by ID.
   */
  removeById(...ids) {
    const length = this.#filtersData.filters.length;
    if (length === 0) {
      return;
    }
    this.#filtersData.filters = this.#filtersData.filters.filter((data) => {
      let remove = 0;
      for (const id of ids) {
        remove |= data.id === id ? 1 : 0;
      }
      if (!!remove) {
        let unsubscribe;
        if (typeof (unsubscribe = this.#mapUnsubscribe.get(data.filter)) === "function") {
          unsubscribe();
          this.#mapUnsubscribe.delete(data.filter);
        }
      }
      return !remove;
    });
    if (length !== this.#filtersData.filters.length) {
      this.#indexUpdate();
    }
  }
}
class AdapterIndexer {
  derivedAdapter;
  filtersData;
  hostData;
  hostUpdate;
  indexData;
  sortData;
  sortFn;
  destroyed = false;
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
    this.hostData = hostData;
    this.hostUpdate = hostUpdate;
    this.indexData = { index: null, hash: null, reversed: false, parent: parentIndexer };
  }
  /**
   * @returns Returns whether the index is active.
   */
  get active() {
    return this.filtersData.filters.length > 0 || this.sortData.compareFn !== null || this.indexData.parent?.active === true;
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
}
class AdapterSort {
  #sortData;
  #indexUpdate;
  #unsubscribe;
  /**
   * @param indexUpdate - Function to update indexer.
   *
   * @param sortData - Storage for compare function.
   */
  constructor(indexUpdate, sortData) {
    this.#indexUpdate = indexUpdate;
    this.#sortData = sortData;
    Object.freeze(this);
  }
  /**
   * Clears & removes any assigned sort function and triggers an index update.
   */
  clear() {
    const oldCompareFn = this.#sortData.compareFn;
    this.#sortData.compareFn = null;
    if (typeof this.#unsubscribe === "function") {
      this.#unsubscribe();
      this.#unsubscribe = void 0;
    }
    if (typeof oldCompareFn === "function") {
      this.#indexUpdate();
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
    if (typeof this.#unsubscribe === "function") {
      this.#unsubscribe();
      this.#unsubscribe = void 0;
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
      this.#sortData.compareFn = compareFn;
    } else {
      const oldCompareFn = this.#sortData.compareFn;
      this.#sortData.compareFn = null;
      if (typeof oldCompareFn === "function") {
        this.#indexUpdate();
      }
      return;
    }
    if (typeof subscribeFn === "function") {
      this.#unsubscribe = subscribeFn(this.#indexUpdate);
      if (typeof this.#unsubscribe !== "function") {
        throw new Error(`AdapterSort error: sort has 'subscribe' function, but no 'unsubscribe' function is returned.`);
      }
    } else {
      this.#indexUpdate();
    }
  }
}
class IndexerAPI {
  #indexData;
  /**
   * Provides a getter to determine if the index is active.
   */
  active;
  /**
   * Provides length of reduced / indexed elements.
   */
  length;
  /**
   * Manually invoke an update of the index.
   *
   * @param force - Force update to any subscribers.
   */
  update;
  constructor(adapterIndexer) {
    this.#indexData = adapterIndexer.indexData;
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
    return this.#indexData.hash;
  }
  /**
   * Provides an iterator over the index array.
   *
   * @yields {K}
   */
  *[Symbol.iterator]() {
    const indexData = this.#indexData;
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
}
class DerivedAPI {
  /**
   * Removes all derived reducers and associated subscriptions.
   */
  clear;
  /**
   * @param options - Options for creating a reducer.
   *
   * @returns Newly created derived reducer.
   */
  create;
  /**
   * Deletes and destroys a derived reducer.
   *
   * @param name - Name of the derived reducer
   */
  delete;
  /**
   * Removes all derived reducers, associated subscriptions, and cleans up all resources.
   */
  destroy;
  /**
   * Returns an existing derived reducer.
   *
   * @param name - Name of derived reducer.
   */
  get;
  constructor(adapterDerived) {
    this.clear = adapterDerived.clear.bind(adapterDerived);
    this.create = adapterDerived.create.bind(adapterDerived);
    this.delete = adapterDerived.delete.bind(adapterDerived);
    this.destroy = adapterDerived.destroy.bind(adapterDerived);
    this.get = adapterDerived.get.bind(adapterDerived);
    Object.freeze(this);
  }
}
class Indexer extends AdapterIndexer {
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
    if (this.destroyed) {
      return;
    }
    const oldIndex = this.indexData.index;
    const oldHash = this.indexData.hash;
    const map = this.hostData[0];
    const parentIndex = this.indexData.parent;
    if (this.filtersData.filters.length === 0 && !this.sortData.compareFn || this.indexData.index && map?.size !== this.indexData.index.length) {
      this.indexData.index = null;
    }
    if (this.filtersData.filters.length > 0) {
      this.indexData.index = this.reduceImpl();
    }
    if (!this.indexData.index && parentIndex?.active) {
      this.indexData.index = [...parentIndex];
    }
    if (this.sortData.compareFn && map instanceof Map) {
      if (!this.indexData.index) {
        this.indexData.index = this.indexData.index = [...map.keys()];
      }
      this.indexData.index.sort(this.sortFn);
    }
    this.calcHashUpdate(oldIndex, oldHash, force);
    this.derivedAdapter?.update(force);
  }
}
class DynMapReducerDerived {
  #map;
  #derived;
  #derivedPublicAPI;
  #filters;
  #filtersData = { filters: [] };
  #index;
  #indexPublicAPI;
  #reversed = false;
  #sort;
  #sortData = { compareFn: null };
  #subscriptions = [];
  #destroyed = false;
  /**
   * @param map - Data host Map.
   *
   * @param parentIndex - Parent indexer.
   *
   * @param options - Any filters and sort functions to apply.
   */
  constructor(map, parentIndex, options) {
    this.#map = map;
    this.#index = new Indexer(this.#map, this.#updateSubscribers.bind(this), parentIndex);
    this.#indexPublicAPI = new IndexerAPI(this.#index);
    this.#filters = new AdapterFilters(this.#indexPublicAPI.update, this.#filtersData);
    this.#sort = new AdapterSort(this.#indexPublicAPI.update, this.#sortData);
    this.#derived = new AdapterDerived(this.#map, this.#indexPublicAPI, DynMapReducerDerived);
    this.#derivedPublicAPI = new DerivedAPI(this.#derived);
    this.#index.initAdapters(this.#filtersData, this.#sortData, this.#derived);
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
    return this.#map[0];
  }
  /**
   * @returns Derived public API.
   */
  get derived() {
    return this.#derivedPublicAPI;
  }
  /**
   * @returns The filters adapter.
   */
  get filters() {
    return this.#filters;
  }
  /**
   * Returns the Indexer public API.
   *
   * @returns Indexer API - is also iterable.
   */
  get index() {
    return this.#indexPublicAPI;
  }
  /**
   * Returns whether this derived reducer is destroyed.
   */
  get destroyed() {
    return this.#destroyed;
  }
  /**
   * @returns Main data / items length or indexed length.
   */
  get length() {
    const map = this.#map[0];
    return this.#index.active ? this.index.length : map ? map.size : 0;
  }
  /**
   * @returns Gets current reversed state.
   */
  get reversed() {
    return this.#reversed;
  }
  /**
   * @returns The sort adapter.
   */
  get sort() {
    return this.#sort;
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
    this.#reversed = reversed;
    this.#index.reversed = reversed;
    this.index.update(true);
  }
  /**
   * Removes all derived reducers, subscriptions, and cleans up all resources.
   */
  destroy() {
    this.#destroyed = true;
    this.#map = [null];
    this.#index.update(true);
    this.#subscriptions.length = 0;
    this.#derived.destroy();
    this.#index.destroy();
    this.#filters.clear();
    this.#sort.clear();
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
   * @yields {T}
   */
  *[Symbol.iterator]() {
    const map = this.#map[0];
    if (this.#destroyed || map === null || map?.size === 0) {
      return;
    }
    if (this.#index.active) {
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
    this.#subscriptions.push(handler);
    handler(this);
    return () => {
      const index = this.#subscriptions.findIndex((sub) => sub === handler);
      if (index >= 0) {
        this.#subscriptions.splice(index, 1);
      }
    };
  }
  /**
   * Updates subscribers on changes.
   */
  #updateSubscribers() {
    for (let cntr = 0; cntr < this.#subscriptions.length; cntr++) {
      this.#subscriptions[cntr](this);
    }
  }
}
class DynMapReducer {
  #map = [null];
  #derived;
  #derivedPublicAPI;
  #filters;
  #filtersData = { filters: [] };
  #index;
  #indexPublicAPI;
  #reversed = false;
  #sort;
  #sortData = { compareFn: null };
  #subscriptions = [];
  #destroyed = false;
  /**
   * Initializes DynMapReducer. Any iterable is supported for initial data. Take note that if `data` is an array it
   * will be used as the host array and not copied. All non-array iterables otherwise create a new array / copy.
   *
   * @param [data] - Data iterable to store if array or copy otherwise.
   */
  constructor(data) {
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
      this.#map[0] = dataMap;
    }
    this.#index = new Indexer(this.#map, this.#updateSubscribers.bind(this));
    this.#indexPublicAPI = new IndexerAPI(this.#index);
    this.#filters = new AdapterFilters(this.#indexPublicAPI.update, this.#filtersData);
    this.#sort = new AdapterSort(this.#indexPublicAPI.update, this.#sortData);
    this.#derived = new AdapterDerived(this.#map, this.#indexPublicAPI, DynMapReducerDerived);
    this.#derivedPublicAPI = new DerivedAPI(this.#derived);
    this.#index.initAdapters(this.#filtersData, this.#sortData, this.#derived);
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
    return this.#map[0];
  }
  /**
   * @returns Derived public API.
   */
  get derived() {
    return this.#derivedPublicAPI;
  }
  /**
   * @returns The filters adapter.
   */
  get filters() {
    return this.#filters;
  }
  /**
   * @returns Returns the Indexer public API.
   */
  get index() {
    return this.#indexPublicAPI;
  }
  /**
   * Returns whether this instance is destroyed.
   */
  get destroyed() {
    return this.#destroyed;
  }
  /**
   * Gets the main data / items length.
   *
   * @returns {number} Main data / items length.
   */
  get length() {
    const map = this.#map[0];
    return this.#index.active ? this.#indexPublicAPI.length : map ? map.size : 0;
  }
  /**
   * Gets current reversed state.
   *
   * @returns {boolean} Reversed state.
   */
  get reversed() {
    return this.#reversed;
  }
  /**
   * @returns The sort adapter.
   */
  get sort() {
    return this.#sort;
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
    this.#reversed = reversed;
    this.#index.reversed = reversed;
    this.index.update(true);
  }
  /**
   * Removes all derived reducers, subscriptions, and cleans up all resources.
   */
  destroy() {
    if (this.#destroyed) {
      return;
    }
    this.#destroyed = true;
    this.#derived.destroy();
    this.#map = [null];
    this.index.update(true);
    this.#subscriptions.length = 0;
    this.#index.destroy();
    this.#filters.clear();
    this.#sort.clear();
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
    const map = this.#map[0];
    if (!(map instanceof Map) || replace) {
      this.#map[0] = data instanceof Map ? data : null;
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
      this.#map[0] = null;
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
    this.#subscriptions.push(handler);
    handler(this);
    return () => {
      const index = this.#subscriptions.findIndex((sub) => sub === handler);
      if (index >= 0) {
        this.#subscriptions.splice(index, 1);
      }
    };
  }
  /**
   * Updates subscribers on changes.
   */
  #updateSubscribers() {
    for (let cntr = 0; cntr < this.#subscriptions.length; cntr++) {
      this.#subscriptions[cntr](this);
    }
  }
  /**
   * Provides an iterator for data stored in DynMapReducer.
   *
   * @yields {T}
   */
  *[Symbol.iterator]() {
    const map = this.#map[0];
    if (this.#destroyed || map === null || map?.size === 0) {
      return;
    }
    if (this.#index.active) {
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
}
class EmbeddedStoreManager {
  /**
   * RegExp for detecting CRUD updates for renderContext.
   *
   * @type {RegExp}
   */
  static #renderContextRegex = /(?<action>create|delete|update)(?<sep>\.?)(?<name>\w+)/;
  /**
   * @type {Map<string, EmbeddedCollectionData<any>>}
   */
  #name = /* @__PURE__ */ new Map();
  /**
   * @type {foundry.abstract.Document[]}
   */
  #document;
  /**
   * @type {Map<string, string>}
   */
  #collectionToDocName = /* @__PURE__ */ new Map();
  /**
   * @type {Set<string>}
   */
  #embeddedNames = /* @__PURE__ */ new Set();
  /**
   * @param {foundry.abstract.Document[]} document - The associated document holder.
   */
  constructor(document2) {
    this.#document = document2;
    this.handleDocChange();
    Object.seal(this);
  }
  /**
   * @template [T=import('./types').NamedDocumentConstructor]
   *
   * @param {T} FoundryDoc - A Foundry document class / constructor.
   *
   * @param {import('#runtime/svelte/store/reducer').DynOptionsMapCreate<string, T>} options - DynMapReducer
   *        creation options.
   *
   * @returns {import('#runtime/svelte/store/reducer').DynMapReducer<string, T>} DynMapReducer instance.
   */
  create(FoundryDoc, options) {
    const docName = FoundryDoc?.documentName;
    if (typeof docName !== "string") {
      throw new TypeError(
        `EmbeddedStoreManager.create error: 'FoundryDoc' does not have a valid 'documentName' property.`
      );
    }
    const doc = this.#document[0];
    let collection = null;
    if (doc) {
      try {
        collection = doc.getEmbeddedCollection(docName);
      } catch (err) {
        console.warn(`EmbeddedStoreManager.create error: No valid embedded collection for: ${docName}`);
      }
    }
    let embeddedData;
    if (!this.#name.has(docName)) {
      embeddedData = {
        collection,
        stores: /* @__PURE__ */ new Map()
      };
      this.#name.set(docName, embeddedData);
    } else {
      embeddedData = this.#name.get(docName);
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
    name = name ?? ctor?.name;
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
   * @template [T=import('./types').NamedDocumentConstructor]
   *
   * Destroys and removes embedded collection stores. Invoking this method with no parameters destroys all stores.
   * Invoking with an embedded name destroys all stores for that particular collection. If you provide an embedded and
   * store name just that particular store is destroyed and removed.
   *
   * @param {T}   [FoundryDoc] - A Foundry document class / constructor.
   *
   * @param {string}   [storeName] - Specific store name.
   *
   * @returns {boolean} One or more stores destroyed?
   */
  destroy(FoundryDoc, storeName) {
    let count = 0;
    if (FoundryDoc === void 0) {
      for (const embeddedData of this.#name.values()) {
        embeddedData.collection = null;
        for (const store of embeddedData.stores.values()) {
          store.destroy();
          count++;
        }
      }
      this.#name.clear();
    } else {
      const docName = FoundryDoc?.documentName;
      if (typeof docName !== "string") {
        throw new TypeError(
          `EmbeddedStoreManager.delete error: 'FoundryDoc' does not have a valid 'documentName' property.`
        );
      }
      if (storeName === void 0) {
        const embeddedData = this.#name.get(docName);
        if (embeddedData) {
          embeddedData.collection = null;
          for (const store of embeddedData.stores.values()) {
            store.destroy();
            count++;
          }
        }
        this.#name.delete(docName);
      } else if (storeName === "string") {
        const embeddedData = this.#name.get(docName);
        if (embeddedData) {
          const store = embeddedData.stores.get(storeName);
          if (store) {
            store.destroy();
            count++;
          }
        }
      }
    }
    return count > 0;
  }
  /**
   * @template [T=import('./types').NamedDocumentConstructor]
   *
   * @param {T} FoundryDoc - A Foundry document class / constructor.
   *
   * @param {string} storeName - Name of the embedded collection to retrieve.
   *
   * @returns {import('#runtime/svelte/store/reducer').DynMapReducer<string, InstanceType<T>>} DynMapReducer
   *          instance.
   */
  get(FoundryDoc, storeName) {
    const docName = FoundryDoc?.documentName;
    if (typeof docName !== "string") {
      throw new TypeError(
        `EmbeddedStoreManager.get error: 'FoundryDoc' does not have a valid 'documentName' property.`
      );
    }
    if (!this.#name.has(docName)) {
      return void 0;
    }
    return this.#name.get(docName).stores.get(storeName);
  }
  /**
   * Updates all existing embedded collection stores with the associated embedded collection
   */
  handleDocChange() {
    const doc = this.#document[0];
    if (doc instanceof globalThis.foundry.abstract.Document) {
      const existingEmbeddedNames = new Set(this.#name.keys());
      const embeddedNames = Object.entries(doc.constructor?.metadata?.embedded ?? []);
      this.#collectionToDocName.clear();
      this.#embeddedNames.clear();
      for (const [docName, collectionName] of embeddedNames) {
        existingEmbeddedNames.delete(docName);
        this.#embeddedNames.add(`create${docName}`);
        this.#embeddedNames.add(`delete${docName}`);
        this.#embeddedNames.add(`update${docName}`);
        this.#embeddedNames.add(`create.${collectionName}`);
        this.#embeddedNames.add(`delete.${collectionName}`);
        this.#embeddedNames.add(`update.${collectionName}`);
        this.#collectionToDocName.set(docName, docName);
        this.#collectionToDocName.set(collectionName, docName);
        let collection = null;
        try {
          collection = doc.getEmbeddedCollection(docName);
        } catch (err) {
          console.warn(`EmbeddedStoreManager.handleDocUpdate error: No valid embedded collection for: ${docName}`);
        }
        const embeddedData = this.#name.get(docName);
        if (embeddedData) {
          embeddedData.collection = collection;
          for (const store of embeddedData.stores.values()) {
            store.setData(collection, true);
          }
        }
      }
      for (const embeddedName of existingEmbeddedNames) {
        const embeddedData = this.#name.get(embeddedName);
        if (embeddedData) {
          embeddedData.collection = null;
          for (const store of embeddedData.stores.values()) {
            store.setData(null, true);
          }
        }
      }
    } else {
      this.#collectionToDocName.clear();
      this.#embeddedNames.clear();
      for (const embeddedData of this.#name.values()) {
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
    if (!this.#embeddedNames.has(renderContext)) {
      return;
    }
    const match = EmbeddedStoreManager.#renderContextRegex.exec(renderContext);
    if (match) {
      const docOrCollectionName = match.groups.name;
      const embeddedName = this.#collectionToDocName.get(docOrCollectionName);
      if (!this.#name.has(embeddedName)) {
        return;
      }
      for (const store of this.#name.get(embeddedName).stores.values()) {
        store.index.update(true);
      }
    }
  }
}
class TJSDocument {
  /**
   * @type {T[]}
   */
  #document = [void 0];
  /**
   * @type {EmbeddedStoreManager}
   */
  #embeddedStoreManager;
  /**
   * @type {import('./types').EmbeddedAPI}
   */
  #embeddedAPI;
  /**
   * @type {string}
   */
  #uuidv4;
  /**
   * @type {TJSDocumentOptions}
   */
  #options = { delete: void 0, preDelete: void 0 };
  /**
   * @type {((value: T, updateOptions?: TJSDocumentUpdateOptions) => void)[]}
   */
  #subscriptions = [];
  /**
   * @type {TJSDocumentUpdateOptions}
   */
  #updateOptions;
  /**
   * @param {T | TJSDocumentOptions}  [document] - Document to wrap or TJSDocumentOptions.
   *
   * @param {TJSDocumentOptions}      [options] - TJSDocument options.
   */
  constructor(document2, options = {}) {
    this.#uuidv4 = `tjs-document-${Hashing.uuidv4()}`;
    if (isPlainObject(document2)) {
      this.setOptions(document2);
    } else {
      this.setOptions(options);
      this.set(document2);
    }
  }
  /**
   * @returns {import('./types').EmbeddedAPI} Embedded store manager.
   */
  get embedded() {
    if (!this.#embeddedAPI) {
      this.#embeddedStoreManager = new EmbeddedStoreManager(this.#document);
      this.#embeddedAPI = {
        create: (doc, options) => this.#embeddedStoreManager.create(doc, options),
        destroy: (doc, storeName) => this.#embeddedStoreManager.destroy(doc, storeName),
        get: (doc, storeName) => this.#embeddedStoreManager.get(doc, storeName)
      };
    }
    return this.#embeddedAPI;
  }
  /**
   * Returns the options passed on last update.
   *
   * @returns {TJSDocumentUpdateOptions} Last update options.
   */
  get updateOptions() {
    return this.#updateOptions ?? {};
  }
  /**
   * Returns the UUID assigned to this store.
   *
   * @returns {string} UUID
   */
  get uuidv4() {
    return this.#uuidv4;
  }
  /**
   * Handles cleanup when the document is deleted. Invoking any optional delete function set in the constructor.
   *
   * @returns {Promise<void>}
   */
  async #deleted() {
    const doc = this.#document[0];
    if (doc instanceof globalThis.foundry.abstract.Document && !doc?.collection?.has(doc.id)) {
      delete doc?.apps[this.#uuidv4];
      this.#setDocument(void 0);
      if (typeof this.#options.preDelete === "function") {
        await this.#options.preDelete(doc);
      }
      this.#updateSubscribers(false, { action: "delete", data: void 0 });
      if (typeof this.#options.delete === "function") {
        await this.#options.delete(doc);
      }
      this.#updateOptions = void 0;
    }
  }
  /**
   * Completely removes all internal subscribers, any optional delete callback, and unregisters from the
   * ClientDocumentMixin `apps` tracking object.
   */
  destroy() {
    const doc = this.#document[0];
    if (this.#embeddedStoreManager) {
      this.#embeddedStoreManager.destroy();
      this.#embeddedStoreManager = void 0;
      this.#embeddedAPI = void 0;
    }
    if (doc instanceof globalThis.foundry.abstract.Document) {
      delete doc?.apps[this.#uuidv4];
      this.#setDocument(void 0);
    }
    this.#options.delete = void 0;
    this.#subscriptions.length = 0;
  }
  /**
   * @param {boolean}  [force] - unused - signature from Foundry render function.
   *
   * @param {object}   [options] - Options from render call; will have document update context.
   */
  #updateSubscribers(force = false, options = {}) {
    this.#updateOptions = options;
    const doc = this.#document[0];
    for (let cntr = 0; cntr < this.#subscriptions.length; cntr++) {
      this.#subscriptions[cntr](doc, options);
    }
    if (this.#embeddedStoreManager) {
      this.#embeddedStoreManager.handleUpdate(options.renderContext);
    }
  }
  /**
   * @returns {T} Current document
   */
  get() {
    return this.#document[0];
  }
  /**
   * Attempts to create a Foundry UUID from standard drop data. This may not work for all systems.
   *
   * @param {object}   data - Drop transfer data.
   *
   * @param {object}   [opts] - Optional parameters.
   *
   * @param {boolean}  [opts.actor=true] - Accept actor owned documents.
   *
   * @param {boolean}  [opts.compendium=true] - Accept compendium documents.
   *
   * @param {boolean}  [opts.world=true] - Accept world documents.
   *
   * @param {string[]|undefined}   [opts.types] - Require the `data.type` to match entry in `types`.
   *
   * @returns {string|undefined} Foundry UUID for drop data.
   */
  static getUUIDFromDataTransfer(data, { actor = true, compendium = true, world = true, types = void 0 } = {}) {
    if (!isObject(data)) {
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
  /**
   * @param {T | undefined}  document - New document to set.
   *
   * @param {TJSDocumentUpdateOptions}   [options] - New document update options to set.
   */
  set(document2, options = {}) {
    if (this.#document[0]) {
      delete this.#document[0].apps[this.#uuidv4];
    }
    if (document2 !== void 0 && !(document2 instanceof globalThis.foundry.abstract.Document)) {
      throw new TypeError(`TJSDocument set error: 'document' is not a valid Document or undefined.`);
    }
    if (!isObject(options)) {
      throw new TypeError(`TJSDocument set error: 'options' is not an object.`);
    }
    if (document2 instanceof globalThis.foundry.abstract.Document) {
      document2.apps[this.#uuidv4] = {
        close: this.#deleted.bind(this),
        render: this.#updateSubscribers.bind(this)
      };
    }
    this.#setDocument(document2);
    this.#updateOptions = options;
    this.#updateSubscribers();
  }
  /**
   *
   * @param {T | undefined} doc -
   */
  #setDocument(doc) {
    this.#document[0] = doc;
    if (this.#embeddedStoreManager) {
      this.#embeddedStoreManager.handleDocChange();
    }
  }
  /**
   * Potentially sets new document from data transfer object.
   *
   * @param {object}   data - Document transfer data.
   *
   * @param {{ actor?: boolean, compendium?: boolean, world?: boolean, types?: string[] } & TJSDocumentOptions}   [options] - Optional
   *        parameters.
   *
   * @returns {Promise<boolean>} Returns true if new document set from data transfer blob.
   */
  async setFromDataTransfer(data, options) {
    return this.setFromUUID(TJSDocument.getUUIDFromDataTransfer(data, options), options);
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
      this.#options.delete = options.delete;
    }
    if (options.preDelete === void 0 || typeof options.preDelete === "function") {
      this.#options.preDelete = options.preDelete;
    }
  }
  /**
   * @param {(value: T, updateOptions?: TJSDocumentUpdateOptions) => void} handler - Callback function that is
   * invoked on update / changes.
   *
   * @returns {import('svelte/store').Unsubscriber} Unsubscribe function.
   */
  subscribe(handler) {
    this.#subscriptions.push(handler);
    const updateOptions = { action: "subscribe", data: void 0 };
    handler(this.#document[0], updateOptions);
    return () => {
      const index = this.#subscriptions.findIndex((sub) => sub === handler);
      if (index >= 0) {
        this.#subscriptions.splice(index, 1);
      }
    };
  }
}
function updateDoc(node, { doc, accessor } = {}) {
  if (!(node instanceof HTMLInputElement) && !(node instanceof HTMLSelectElement) && !(node instanceof HTMLTextAreaElement)) {
    throw new TypeError(
      `updateDoc error: 'node' must be an instance of HTMLInputElement, HTMLSelectElement, or HTMLTextAreaElement.`
    );
  }
  if (!(doc instanceof TJSDocument)) {
    throw new TypeError(`updateDoc error: 'doc' must be an instance of TJSDocument.`);
  }
  if (typeof accessor !== "string") {
    throw new TypeError(`updateDoc error: 'accessor' must be a string.`);
  }
  let valueKey = "value";
  switch (node.type) {
    case "text":
      valueKey = "value";
      break;
    case "number":
      valueKey = "value";
      break;
    case "checkbox":
      valueKey = "checked";
      break;
  }
  let currentDocValue;
  const unsubscribe = doc.subscribe(onDocChange);
  function onChange(ev) {
    const document2 = doc.get();
    if (!document2) {
      console.warn("updateDoc.onChange warning: no associated document on change.");
      return;
    }
    let value = ev.target[valueKey];
    if (node.type === "number") {
      value = Number(value);
    }
    document2.update({ [accessor]: value });
  }
  function onDocChange(docRef) {
    if (!docRef) {
      console.warn("updateDoc.onDocChange warning: no associated document on change.");
      return;
    }
    const newValue = safeAccess(docRef, accessor);
    if (currentDocValue !== newValue && newValue !== "") {
      currentDocValue = newValue;
      node[valueKey] = currentDocValue;
    }
  }
  function activateListeners() {
    node.addEventListener("change", onChange);
  }
  function removeListeners() {
    node.removeEventListener("change", onChange);
  }
  activateListeners();
  return {
    // Currently not implemented, but this is where you'd update the options for this action.
    // IE changing the TJSDocument or accessor field.
    update: () => {
    },
    destroy: () => {
      removeListeners();
      unsubscribe();
    }
  };
}
class SvelteDialog extends SvelteApplication {
  constructor(options, dialogData) {
    options = foundry.utils.mergeObject({
      svelte: {
        target: document.body
      },
      close: () => this.options.reject()
    }, options);
    super(options, dialogData);
  }
  static getActiveApp(actor) {
    return Object.values(ui.windows).find((app) => app instanceof this && app?.actor === actor);
  }
  static async show(options = {}, dialogData = {}) {
    const app = this.getActiveApp(options.actor);
    if (app) {
      app.render(false, { focus: true });
      return new Promise((resolve, reject) => {
        app.options.resolve = resolve;
        app.options.reject = reject;
      });
    }
    return new Promise((resolve, reject) => {
      options.resolve = resolve;
      options.reject = reject;
      const newApp = new this(options, dialogData).render(true, { focus: true });
      newApp.actor = options.actor;
    });
  }
}
const CurrencyTransfer_svelte_svelte_type_style_lang = "";
function create_default_slot$3(ctx) {
  let div6;
  let div5;
  let div3;
  let t5;
  let div4;
  let input0;
  let t6;
  let input1;
  let t7;
  let input2;
  let t8;
  let footer;
  let button0;
  let t10;
  let button1;
  let t12;
  let button2;
  let mounted;
  let dispose;
  return {
    c() {
      div6 = element("div");
      div5 = element("div");
      div3 = element("div");
      div3.innerHTML = `<div>GP</div> <div>SP</div> <div>CP</div>`;
      t5 = space();
      div4 = element("div");
      input0 = element("input");
      t6 = space();
      input1 = element("input");
      t7 = space();
      input2 = element("input");
      t8 = space();
      footer = element("footer");
      button0 = element("button");
      button0.innerHTML = `<i class="fas fa-money-bill-transfer"></i> Withdraw`;
      t10 = space();
      button1 = element("button");
      button1.innerHTML = `<i class="fas fa-plus-minus"></i> Add/Remove`;
      t12 = space();
      button2 = element("button");
      button2.innerHTML = `<i class="fas fa-bank"></i> Deposit`;
      attr(div3, "class", "actor-currencies-list svelte-lbvtt-yfs5rh");
      attr(input0, "type", "number");
      attr(input0, "class", "svelte-lbvtt-yfs5rh");
      attr(input1, "type", "number");
      attr(input1, "class", "svelte-lbvtt-yfs5rh");
      attr(input2, "type", "number");
      attr(input2, "class", "svelte-lbvtt-yfs5rh");
      attr(div4, "class", "actor-currencies-list svelte-lbvtt-yfs5rh");
      attr(div5, "class", "actor-currencies-container svelte-lbvtt-yfs5rh");
      attr(button0, "type", "button");
      attr(button1, "type", "button");
      attr(button2, "type", "button");
      attr(footer, "class", "svelte-lbvtt-yfs5rh");
    },
    m(target, anchor) {
      insert(target, div6, anchor);
      append(div6, div5);
      append(div5, div3);
      append(div5, t5);
      append(div5, div4);
      append(div4, input0);
      set_input_value(
        input0,
        /*currencies*/
        ctx[2].gp
      );
      append(div4, t6);
      append(div4, input1);
      set_input_value(
        input1,
        /*currencies*/
        ctx[2].sp
      );
      append(div4, t7);
      append(div4, input2);
      set_input_value(
        input2,
        /*currencies*/
        ctx[2].cp
      );
      append(div6, t8);
      append(div6, footer);
      append(footer, button0);
      append(footer, t10);
      append(footer, button1);
      append(footer, t12);
      append(footer, button2);
      if (!mounted) {
        dispose = [
          listen(
            input0,
            "input",
            /*input0_input_handler*/
            ctx[7]
          ),
          listen(
            input1,
            "input",
            /*input1_input_handler*/
            ctx[8]
          ),
          listen(
            input2,
            "input",
            /*input2_input_handler*/
            ctx[9]
          ),
          listen(
            button0,
            "click",
            /*click_handler*/
            ctx[10]
          ),
          listen(
            button1,
            "click",
            /*click_handler_1*/
            ctx[11]
          ),
          listen(
            button2,
            "click",
            /*click_handler_2*/
            ctx[12]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*currencies*/
      4 && to_number(input0.value) !== /*currencies*/
      ctx2[2].gp) {
        set_input_value(
          input0,
          /*currencies*/
          ctx2[2].gp
        );
      }
      if (dirty & /*currencies*/
      4 && to_number(input1.value) !== /*currencies*/
      ctx2[2].sp) {
        set_input_value(
          input1,
          /*currencies*/
          ctx2[2].sp
        );
      }
      if (dirty & /*currencies*/
      4 && to_number(input2.value) !== /*currencies*/
      ctx2[2].cp) {
        set_input_value(
          input2,
          /*currencies*/
          ctx2[2].cp
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div6);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment$r(ctx) {
  let applicationshell;
  let updating_elementRoot;
  let current;
  function applicationshell_elementRoot_binding(value) {
    ctx[13](value);
  }
  let applicationshell_props = {
    $$slots: { default: [create_default_slot$3] },
    $$scope: { ctx }
  };
  if (
    /*elementRoot*/
    ctx[0] !== void 0
  ) {
    applicationshell_props.elementRoot = /*elementRoot*/
    ctx[0];
  }
  applicationshell = new ApplicationShell$1({ props: applicationshell_props });
  binding_callbacks.push(() => bind(applicationshell, "elementRoot", applicationshell_elementRoot_binding));
  return {
    c() {
      create_component(applicationshell.$$.fragment);
    },
    m(target, anchor) {
      mount_component(applicationshell, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const applicationshell_changes = {};
      if (dirty & /*$$scope, currencies*/
      65540) {
        applicationshell_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_elementRoot && dirty & /*elementRoot*/
      1) {
        updating_elementRoot = true;
        applicationshell_changes.elementRoot = /*elementRoot*/
        ctx2[0];
        add_flush_callback(() => updating_elementRoot = false);
      }
      applicationshell.$set(applicationshell_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(applicationshell.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(applicationshell.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(applicationshell, detaching);
    }
  };
}
function instance$r($$self, $$props, $$invalidate) {
  let $doc, $$unsubscribe_doc = noop, $$subscribe_doc = () => ($$unsubscribe_doc(), $$unsubscribe_doc = subscribe(doc, ($$value) => $$invalidate(6, $doc = $$value)), doc);
  $$self.$$.on_destroy.push(() => $$unsubscribe_doc());
  let { elementRoot } = $$props;
  let { doc } = $$props;
  $$subscribe_doc();
  let currencies = { gp: 0, sp: 0, cp: 0 };
  let bankCurrencies = {};
  let actorCurrencies = {};
  function withdraw() {
    const totalBankMoney = bankCurrencies.gp * 1e4 + bankCurrencies.sp * 100 + bankCurrencies.cp;
    const totalMoneyInput = currencies.gp * 1e4 + currencies.sp * 100 + currencies.cp;
    if (totalMoneyInput > totalBankMoney || currencies.gp > bankCurrencies.gp || currencies.sp > bankCurrencies.sp || currencies.cp > bankCurrencies.cp) {
      return;
    }
    $doc.update({
      "system.currencies.gp": {
        "value": actorCurrencies.gp + currencies.gp,
        "bank": bankCurrencies.gp - currencies.gp
      },
      "system.currencies.sp": {
        "value": actorCurrencies.sp + currencies.sp,
        "bank": bankCurrencies.sp - currencies.sp
      },
      "system.currencies.cp": {
        "value": actorCurrencies.cp + currencies.cp,
        "bank": bankCurrencies.cp - currencies.cp
      }
    });
    $$invalidate(2, currencies = { gp: 0, sp: 0, cp: 0 });
  }
  function deposit() {
    const totalActorMoney = actorCurrencies.gp * 1e4 + actorCurrencies.sp * 100 + actorCurrencies.cp;
    const totalMoneyInput = currencies.gp * 1e4 + currencies.sp * 100 + currencies.cp;
    if (totalMoneyInput > totalActorMoney || currencies.gp > actorCurrencies.gp || currencies.sp > actorCurrencies.sp || currencies.cp > actorCurrencies.cp) {
      return;
    }
    $doc.update({
      "system.currencies.gp": {
        "value": actorCurrencies.gp - currencies.gp,
        "bank": bankCurrencies.gp + currencies.gp
      },
      "system.currencies.sp": {
        "value": actorCurrencies.sp - currencies.sp,
        "bank": bankCurrencies.sp + currencies.sp
      },
      "system.currencies.cp": {
        "value": actorCurrencies.cp - currencies.cp,
        "bank": bankCurrencies.cp + currencies.cp
      }
    });
    $$invalidate(2, currencies = { gp: 0, sp: 0, cp: 0 });
  }
  function addRemove() {
    const totalActorMoney = actorCurrencies.gp * 1e4 + actorCurrencies.sp * 100 + actorCurrencies.cp;
    const totalMoneyInput = currencies.gp * 1e4 + currencies.sp * 100 + currencies.cp;
    if (totalActorMoney + totalMoneyInput < 0 || actorCurrencies.gp + currencies.gp < 0 || actorCurrencies.sp + currencies.sp < 0 || actorCurrencies.cp + currencies.cp < 0) {
      return;
    }
    $doc.update({
      "system.currencies.gp.value": actorCurrencies.gp + currencies.gp,
      "system.currencies.sp.value": actorCurrencies.sp + currencies.sp,
      "system.currencies.cp.value": actorCurrencies.cp + currencies.cp
    });
    $$invalidate(2, currencies = { gp: 0, sp: 0, cp: 0 });
  }
  function input0_input_handler() {
    currencies.gp = to_number(this.value);
    $$invalidate(2, currencies);
  }
  function input1_input_handler() {
    currencies.sp = to_number(this.value);
    $$invalidate(2, currencies);
  }
  function input2_input_handler() {
    currencies.cp = to_number(this.value);
    $$invalidate(2, currencies);
  }
  const click_handler = () => {
    withdraw();
  };
  const click_handler_1 = () => {
    addRemove();
  };
  const click_handler_2 = () => {
    deposit();
  };
  function applicationshell_elementRoot_binding(value) {
    elementRoot = value;
    $$invalidate(0, elementRoot);
  }
  $$self.$$set = ($$props2) => {
    if ("elementRoot" in $$props2)
      $$invalidate(0, elementRoot = $$props2.elementRoot);
    if ("doc" in $$props2)
      $$subscribe_doc($$invalidate(1, doc = $$props2.doc));
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$doc*/
    64) {
      bankCurrencies = {
        gp: $doc.system.currencies.gp.bank,
        sp: $doc.system.currencies.sp.bank,
        cp: $doc.system.currencies.cp.bank
      };
    }
    if ($$self.$$.dirty & /*$doc*/
    64) {
      actorCurrencies = {
        gp: $doc.system.currencies.gp.value,
        sp: $doc.system.currencies.sp.value,
        cp: $doc.system.currencies.cp.value
      };
    }
  };
  return [
    elementRoot,
    doc,
    currencies,
    withdraw,
    deposit,
    addRemove,
    $doc,
    input0_input_handler,
    input1_input_handler,
    input2_input_handler,
    click_handler,
    click_handler_1,
    click_handler_2,
    applicationshell_elementRoot_binding
  ];
}
class CurrencyTransfer extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$r, create_fragment$r, safe_not_equal, { elementRoot: 0, doc: 1 });
  }
  get elementRoot() {
    return this.$$.ctx[0];
  }
  set elementRoot(elementRoot) {
    this.$$set({ elementRoot });
    flush();
  }
  get doc() {
    return this.$$.ctx[1];
  }
  set doc(doc) {
    this.$$set({ doc });
    flush();
  }
}
const CurrencyList_svelte_svelte_type_style_lang = "";
function create_fragment$q(ctx) {
  let div15;
  let div3;
  let t5;
  let div4;
  let t6;
  let div8;
  let t12;
  let div9;
  let input0;
  let t13;
  let input1;
  let t14;
  let input2;
  let t15;
  let div10;
  let i;
  let t16;
  let div11;
  let input3;
  let t17;
  let input4;
  let t18;
  let input5;
  let t19;
  let div12;
  let t21;
  let div13;
  let t22;
  let div14;
  let mounted;
  let dispose;
  return {
    c() {
      div15 = element("div");
      div3 = element("div");
      div3.innerHTML = `<div>GP</div> <div>SP</div> <div>CP</div>`;
      t5 = space();
      div4 = element("div");
      t6 = space();
      div8 = element("div");
      div8.innerHTML = `<div>GP</div> <div>SP</div> <div>CP</div>`;
      t12 = space();
      div9 = element("div");
      input0 = element("input");
      t13 = space();
      input1 = element("input");
      t14 = space();
      input2 = element("input");
      t15 = space();
      div10 = element("div");
      i = element("i");
      t16 = space();
      div11 = element("div");
      input3 = element("input");
      t17 = space();
      input4 = element("input");
      t18 = space();
      input5 = element("input");
      t19 = space();
      div12 = element("div");
      div12.textContent = "On Person";
      t21 = space();
      div13 = element("div");
      t22 = space();
      div14 = element("div");
      div14.textContent = "In Bank";
      attr(div3, "class", "actor-currencies-list svelte-lbvtt-wz86a4");
      attr(div8, "class", "actor-currencies-list svelte-lbvtt-wz86a4");
      attr(input0, "type", "number");
      attr(input0, "class", "svelte-lbvtt-wz86a4");
      attr(input1, "type", "number");
      attr(input1, "class", "svelte-lbvtt-wz86a4");
      attr(input2, "type", "number");
      attr(input2, "class", "svelte-lbvtt-wz86a4");
      attr(div9, "class", "actor-currencies-list svelte-lbvtt-wz86a4");
      attr(i, "class", "fas fa-right-left clickable clickable-red");
      attr(input3, "type", "number");
      attr(input3, "class", "svelte-lbvtt-wz86a4");
      attr(input4, "type", "number");
      attr(input4, "class", "svelte-lbvtt-wz86a4");
      attr(input5, "type", "number");
      attr(input5, "class", "svelte-lbvtt-wz86a4");
      attr(div11, "class", "actor-currencies-list svelte-lbvtt-wz86a4");
      attr(div15, "class", "actor-currencies-container svelte-lbvtt-wz86a4");
    },
    m(target, anchor) {
      insert(target, div15, anchor);
      append(div15, div3);
      append(div15, t5);
      append(div15, div4);
      append(div15, t6);
      append(div15, div8);
      append(div15, t12);
      append(div15, div9);
      append(div9, input0);
      append(div9, t13);
      append(div9, input1);
      append(div9, t14);
      append(div9, input2);
      append(div15, t15);
      append(div15, div10);
      append(div10, i);
      append(div15, t16);
      append(div15, div11);
      append(div11, input3);
      append(div11, t17);
      append(div11, input4);
      append(div11, t18);
      append(div11, input5);
      append(div15, t19);
      append(div15, div12);
      append(div15, t21);
      append(div15, div13);
      append(div15, t22);
      append(div15, div14);
      if (!mounted) {
        dispose = [
          action_destroyer(updateDoc.call(null, input0, {
            doc: (
              /*doc*/
              ctx[0]
            ),
            accessor: "system.currencies.gp.value"
          })),
          action_destroyer(updateDoc.call(null, input1, {
            doc: (
              /*doc*/
              ctx[0]
            ),
            accessor: "system.currencies.sp.value"
          })),
          action_destroyer(updateDoc.call(null, input2, {
            doc: (
              /*doc*/
              ctx[0]
            ),
            accessor: "system.currencies.cp.value"
          })),
          listen(
            i,
            "click",
            /*click_handler*/
            ctx[2]
          ),
          action_destroyer(updateDoc.call(null, input3, {
            doc: (
              /*doc*/
              ctx[0]
            ),
            accessor: "system.currencies.gp.bank"
          })),
          action_destroyer(updateDoc.call(null, input4, {
            doc: (
              /*doc*/
              ctx[0]
            ),
            accessor: "system.currencies.sp.bank"
          })),
          action_destroyer(updateDoc.call(null, input5, {
            doc: (
              /*doc*/
              ctx[0]
            ),
            accessor: "system.currencies.cp.bank"
          }))
        ];
        mounted = true;
      }
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div15);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$q($$self) {
  const doc = getContext("DocumentStore");
  function showCurrencyTransferDialog() {
    SvelteDialog.show({
      title: "TEST",
      svelte: { class: CurrencyTransfer, props: { doc } },
      width: 400,
      height: "auto"
    });
  }
  const click_handler = () => showCurrencyTransferDialog();
  return [doc, showCurrencyTransferDialog, click_handler];
}
class CurrencyList extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$q, create_fragment$q, safe_not_equal, {});
  }
}
const ActorInventory_svelte_svelte_type_style_lang = "";
function create_fragment$p(ctx) {
  let div;
  let currencylist;
  let t;
  let searchableitemlist;
  let current;
  currencylist = new CurrencyList({});
  searchableitemlist = new SearchableItemList({
    props: {
      itemsStore: (
        /*itemsStore*/
        ctx[0]
      ),
      component: ActorEquipment,
      type: "equipment"
    }
  });
  return {
    c() {
      div = element("div");
      create_component(currencylist.$$.fragment);
      t = space();
      create_component(searchableitemlist.$$.fragment);
      attr(div, "class", "inventory svelte-lbvtt-lqaryj");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(currencylist, div, null);
      append(div, t);
      mount_component(searchableitemlist, div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const searchableitemlist_changes = {};
      if (dirty & /*itemsStore*/
      1)
        searchableitemlist_changes.itemsStore = /*itemsStore*/
        ctx2[0];
      searchableitemlist.$set(searchableitemlist_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(currencylist.$$.fragment, local);
      transition_in(searchableitemlist.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(currencylist.$$.fragment, local);
      transition_out(searchableitemlist.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(currencylist);
      destroy_component(searchableitemlist);
    }
  };
}
function instance$p($$self, $$props, $$invalidate) {
  let itemsStore;
  let $doc;
  const doc = getContext("DocumentStore");
  component_subscribe($$self, doc, (value) => $$invalidate(2, $doc = value));
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$doc*/
    4) {
      $$invalidate(0, itemsStore = $doc.items.filter((item) => item.type === "equipment"));
    }
  };
  return [itemsStore, doc, $doc];
}
class ActorInventory extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$p, create_fragment$p, safe_not_equal, {});
  }
}
const ActorTrait_svelte_svelte_type_style_lang = "";
function create_if_block$8(ctx) {
  let div;
  let div_transition;
  let current;
  function select_block_type(ctx2, dirty) {
    if (
      /*item*/
      ctx2[0].system.description.value
    )
      return create_if_block_1$6;
    return create_else_block$3;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      div = element("div");
      if_block.c();
      attr(div, "class", "item-description svelte-lbvtt-19gus65");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if_block.m(div, null);
      current = true;
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(div, null);
        }
      }
    },
    i(local) {
      if (current)
        return;
      if (local) {
        add_render_callback(() => {
          if (!current)
            return;
          if (!div_transition)
            div_transition = create_bidirectional_transition(div, slide, { duration: 150, easing: sineInOut }, true);
          div_transition.run(1);
        });
      }
      current = true;
    },
    o(local) {
      if (local) {
        if (!div_transition)
          div_transition = create_bidirectional_transition(div, slide, { duration: 150, easing: sineInOut }, false);
        div_transition.run(0);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if_block.d();
      if (detaching && div_transition)
        div_transition.end();
    }
  };
}
function create_else_block$3(ctx) {
  let t;
  return {
    c() {
      t = text("No description here...");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_if_block_1$6(ctx) {
  let html_tag;
  let raw_value = (
    /*item*/
    ctx[0].system.description.value + ""
  );
  let html_anchor;
  return {
    c() {
      html_tag = new HtmlTag(false);
      html_anchor = empty();
      html_tag.a = html_anchor;
    },
    m(target, anchor) {
      html_tag.m(raw_value, target, anchor);
      insert(target, html_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*item*/
      1 && raw_value !== (raw_value = /*item*/
      ctx2[0].system.description.value + ""))
        html_tag.p(raw_value);
    },
    d(detaching) {
      if (detaching) {
        detach(html_anchor);
        html_tag.d();
      }
    }
  };
}
function create_fragment$o(ctx) {
  let div4;
  let div3;
  let div1;
  let div0;
  let img0;
  let img0_src_value;
  let t0;
  let img1;
  let img1_src_value;
  let t1;
  let span;
  let t2_value = (
    /*item*/
    ctx[0].name + ""
  );
  let t2;
  let t3;
  let div2;
  let a0;
  let t4;
  let a1;
  let t5;
  let mounted;
  let dispose;
  let if_block = (
    /*expanded*/
    ctx[1] && create_if_block$8(ctx)
  );
  return {
    c() {
      div4 = element("div");
      div3 = element("div");
      div1 = element("div");
      div0 = element("div");
      img0 = element("img");
      t0 = space();
      img1 = element("img");
      t1 = space();
      span = element("span");
      t2 = text(t2_value);
      t3 = space();
      div2 = element("div");
      a0 = element("a");
      a0.innerHTML = `<i class="fas fa-edit"></i>`;
      t4 = space();
      a1 = element("a");
      a1.innerHTML = `<i class="fas fa-trash"></i>`;
      t5 = space();
      if (if_block)
        if_block.c();
      if (!src_url_equal(img0.src, img0_src_value = /*item*/
      ctx[0].img))
        attr(img0, "src", img0_src_value);
      attr(img0, "class", "svelte-lbvtt-19gus65");
      attr(img1, "class", "clickable clickable-red item-rollable-image svelte-lbvtt-19gus65");
      if (!src_url_equal(img1.src, img1_src_value = "icons/dice/d10black.svg"))
        attr(img1, "src", img1_src_value);
      attr(div0, "class", "item-image-container svelte-lbvtt-19gus65");
      attr(span, "class", "item-expand clickable clickable-red");
      attr(div1, "class", "item-name svelte-lbvtt-19gus65");
      attr(a0, "class", "item-control item-edit svelte-lbvtt-19gus65");
      attr(a0, "data-tooltip", localize("LEOBREW.TraitEdit"));
      attr(a1, "class", "item-control item-delete svelte-lbvtt-19gus65");
      attr(a1, "data-tooltip", localize("LEOBREW.TraitDelete"));
      attr(div2, "class", "item-controls flexrow svelte-lbvtt-19gus65");
      attr(div3, "class", "item-header svelte-lbvtt-19gus65");
      attr(div4, "class", "item even-shading svelte-lbvtt-19gus65");
    },
    m(target, anchor) {
      insert(target, div4, anchor);
      append(div4, div3);
      append(div3, div1);
      append(div1, div0);
      append(div0, img0);
      append(div0, t0);
      append(div0, img1);
      append(div1, t1);
      append(div1, span);
      append(span, t2);
      append(div3, t3);
      append(div3, div2);
      append(div2, a0);
      append(div2, t4);
      append(div2, a1);
      append(div4, t5);
      if (if_block)
        if_block.m(div4, null);
      if (!mounted) {
        dispose = [
          listen(
            img1,
            "click",
            /*click_handler*/
            ctx[4]
          ),
          listen(
            span,
            "click",
            /*click_handler_1*/
            ctx[5]
          ),
          listen(
            a0,
            "click",
            /*click_handler_2*/
            ctx[6]
          ),
          listen(
            a1,
            "click",
            /*click_handler_3*/
            ctx[7]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*item*/
      1 && !src_url_equal(img0.src, img0_src_value = /*item*/
      ctx2[0].img)) {
        attr(img0, "src", img0_src_value);
      }
      if (dirty & /*item*/
      1 && t2_value !== (t2_value = /*item*/
      ctx2[0].name + ""))
        set_data(t2, t2_value);
      if (
        /*expanded*/
        ctx2[1]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*expanded*/
          2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$8(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div4, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      transition_in(if_block);
    },
    o(local) {
      transition_out(if_block);
    },
    d(detaching) {
      if (detaching) {
        detach(div4);
      }
      if (if_block)
        if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$o($$self, $$props, $$invalidate) {
  let expanded;
  let $appState;
  const appState = getContext("ApplicationStateStore");
  component_subscribe($$self, appState, (value) => $$invalidate(3, $appState = value));
  let { item } = $$props;
  const click_handler = () => {
    item.roll();
  };
  const click_handler_1 = () => {
    appState.update((state) => {
      if (expanded) {
        state.isExpanded.traits.delete(item.id);
      } else {
        state.isExpanded.traits.add(item.id);
      }
      return state;
    });
  };
  const click_handler_2 = () => {
    item.sheet.render(true);
  };
  const click_handler_3 = () => {
    TJSDialog.confirm(
      {
        title: "Delete Trait",
        content: `<p style='text-align: center;'>Are you sure you want to delete "${item.name}"?</p>`,
        onYes: () => {
          item.delete();
        }
      },
      { width: 270, height: "auto" }
    );
  };
  $$self.$$set = ($$props2) => {
    if ("item" in $$props2)
      $$invalidate(0, item = $$props2.item);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$appState, item*/
    9) {
      $$invalidate(1, expanded = $appState.isExpanded.inventory.has(item.id));
    }
  };
  return [
    item,
    expanded,
    appState,
    $appState,
    click_handler,
    click_handler_1,
    click_handler_2,
    click_handler_3
  ];
}
class ActorTrait extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$o, create_fragment$o, safe_not_equal, { item: 0 });
  }
}
const ActorTraits_svelte_svelte_type_style_lang = "";
function create_if_block$7(ctx) {
  let div;
  let t1;
  let input;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      div.textContent = "Sanity";
      t1 = space();
      input = element("input");
      attr(div, "class", "svelte-lbvtt-120cle");
      attr(input, "type", "number");
      attr(input, "class", "svelte-lbvtt-120cle");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      insert(target, t1, anchor);
      insert(target, input, anchor);
      if (!mounted) {
        dispose = action_destroyer(updateDoc.call(null, input, {
          doc: (
            /*doc*/
            ctx[2]
          ),
          accessor: "system.resources.sanity.bonus"
        }));
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
        detach(t1);
        detach(input);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$n(ctx) {
  let div4;
  let div3;
  let div2;
  let div0;
  let t1;
  let input0;
  let t2;
  let div1;
  let t4;
  let input1;
  let t5;
  let t6;
  let searchableitemlist;
  let current;
  let mounted;
  let dispose;
  let if_block = (
    /*$doc*/
    ctx[0].system.resources.sanity.enabled && create_if_block$7(ctx)
  );
  searchableitemlist = new SearchableItemList({
    props: {
      itemsStore: (
        /*itemsStore*/
        ctx[1]
      ),
      component: ActorTrait,
      type: "trait"
    }
  });
  return {
    c() {
      div4 = element("div");
      div3 = element("div");
      div2 = element("div");
      div0 = element("div");
      div0.textContent = "Mana";
      t1 = space();
      input0 = element("input");
      t2 = space();
      div1 = element("div");
      div1.textContent = "Luck";
      t4 = space();
      input1 = element("input");
      t5 = space();
      if (if_block)
        if_block.c();
      t6 = space();
      create_component(searchableitemlist.$$.fragment);
      attr(div0, "class", "svelte-lbvtt-120cle");
      attr(input0, "type", "number");
      attr(input0, "class", "svelte-lbvtt-120cle");
      attr(div1, "class", "svelte-lbvtt-120cle");
      attr(input1, "type", "number");
      attr(input1, "class", "svelte-lbvtt-120cle");
      attr(div2, "class", "actor-modifiers-list svelte-lbvtt-120cle");
      attr(div3, "class", "actor-modifiers-container svelte-lbvtt-120cle");
      attr(div4, "class", "inventory");
    },
    m(target, anchor) {
      insert(target, div4, anchor);
      append(div4, div3);
      append(div3, div2);
      append(div2, div0);
      append(div2, t1);
      append(div2, input0);
      append(div2, t2);
      append(div2, div1);
      append(div2, t4);
      append(div2, input1);
      append(div2, t5);
      if (if_block)
        if_block.m(div2, null);
      append(div4, t6);
      mount_component(searchableitemlist, div4, null);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(updateDoc.call(null, input0, {
            doc: (
              /*doc*/
              ctx[2]
            ),
            accessor: "system.resources.mana.bonus"
          })),
          action_destroyer(updateDoc.call(null, input1, {
            doc: (
              /*doc*/
              ctx[2]
            ),
            accessor: "system.resources.luck.bonus"
          }))
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (
        /*$doc*/
        ctx2[0].system.resources.sanity.enabled
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$7(ctx2);
          if_block.c();
          if_block.m(div2, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      const searchableitemlist_changes = {};
      if (dirty & /*itemsStore*/
      2)
        searchableitemlist_changes.itemsStore = /*itemsStore*/
        ctx2[1];
      searchableitemlist.$set(searchableitemlist_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(searchableitemlist.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(searchableitemlist.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div4);
      }
      if (if_block)
        if_block.d();
      destroy_component(searchableitemlist);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$n($$self, $$props, $$invalidate) {
  let itemsStore;
  let $doc;
  const doc = getContext("DocumentStore");
  component_subscribe($$self, doc, (value) => $$invalidate(0, $doc = value));
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$doc*/
    1) {
      $$invalidate(1, itemsStore = $doc.items.filter((item) => item.type === "trait"));
    }
  };
  return [$doc, itemsStore, doc];
}
class ActorTraits extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$n, create_fragment$n, safe_not_equal, {});
  }
}
class FoundryStyles {
  static #sheet = void 0;
  /** @type {Map<string, {[key: string]: string}>} */
  static #sheetMap = /* @__PURE__ */ new Map();
  static #initialized = false;
  /**
   * Called once on initialization / first usage. Parses the core foundry style sheet.
   */
  static #initialize() {
    this.#initialized = true;
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
        this.#sheet = sheet = styleSheet;
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
      this.#sheetMap.set(rule.selectorText, obj);
    }
  }
  /**
   * Gets the properties object associated with the selector. Try and use a direct match otherwise all keys
   * are iterated to find a selector string that includes the `selector`.
   *
   * @param {string}   selector - Selector to find.
   *
   * @returns { {[key: string]: string} } Properties object.
   */
  static getProperties(selector) {
    if (!this.#initialized) {
      this.#initialize();
    }
    if (this.#sheetMap.has(selector)) {
      return this.#sheetMap.get(selector);
    }
    for (const key of this.#sheetMap.keys()) {
      if (key.includes(selector)) {
        return this.#sheetMap.get(key);
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
    if (!this.#initialized) {
      this.#initialize();
    }
    if (this.#sheetMap.has(selector)) {
      const data = this.#sheetMap.get(selector);
      return isObject(data) && property in data ? data[property] : void 0;
    }
    for (const key of this.#sheetMap.keys()) {
      if (key.includes(selector)) {
        const data = this.#sheetMap.get(key);
        if (isObject(data) && property in data) {
          return data[property];
        }
      }
    }
    return void 0;
  }
}
const cssVariables = new TJSStyleManager({ docKey: "#__tjs-root-styles", version: 1 });
const TJSIconButton_svelte_svelte_type_style_lang = "";
const TJSToggleIconButton_svelte_svelte_type_style_lang = "";
const TJSColordButton_svelte_svelte_type_style_lang = "";
const FocusWrap_svelte_svelte_type_style_lang = "";
const PickerIndicator_svelte_svelte_type_style_lang = "";
const PickerWrapper_svelte_svelte_type_style_lang$1 = "";
const SliderIndicator_svelte_svelte_type_style_lang = "";
const SliderWrapper_svelte_svelte_type_style_lang = "";
const TJSSvgFolder_svelte_svelte_type_style_lang = "";
const AddOnPanel_svelte_svelte_type_style_lang = "";
const ButtonBar_svelte_svelte_type_style_lang = "";
const Input_svelte_svelte_type_style_lang = "";
const MainLayout_svelte_svelte_type_style_lang = "";
const Picker_svelte_svelte_type_style_lang = "";
const SliderAlpha_svelte_svelte_type_style_lang = "";
const SliderHue_svelte_svelte_type_style_lang = "";
const TJSInputNumber_svelte_svelte_type_style_lang = "";
const TJSInputText_svelte_svelte_type_style_lang = "";
const TextInput_svelte_svelte_type_style_lang = "";
const Wrapper_svelte_svelte_type_style_lang$1 = "";
const PickerWrapper_svelte_svelte_type_style_lang = "";
const Wrapper_svelte_svelte_type_style_lang = "";
const TJSColordPicker_svelte_svelte_type_style_lang = "";
const SavedColors_svelte_svelte_type_style_lang = "";
const SavedColorsSummaryEnd_svelte_svelte_type_style_lang = "";
const TJSScrollContainer_svelte_svelte_type_style_lang = "";
const TJSContentEdit_svelte_svelte_type_style_lang = "";
class PMImpl {
  /**
   * Handles `options.initialSelection`: Sets the initial cursor / selection range to the start, end, or selects
   * all text.
   *
   * @param {globalThis.EditorView}  view - PM editor view.
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
        const resolvedFrom = clamp(0, minPos, maxPos);
        const resolvedEnd = clamp(doc.content.size, minPos, maxPos);
        transaction = tr.setSelection(globalThis.ProseMirror.TextSelection.create(doc, resolvedFrom, resolvedEnd));
        break;
      }
      case "end": {
        const resolvedFrom = clamp(doc.content.size, minPos, maxPos);
        const resolvedEnd = clamp(doc.content.size, minPos, maxPos);
        transaction = tr.setSelection(globalThis.ProseMirror.TextSelection.create(doc, resolvedFrom, resolvedEnd));
        break;
      }
      case "start": {
        const resolvedFrom = clamp(0, minPos, maxPos);
        const resolvedEnd = clamp(0, minPos, maxPos);
        transaction = tr.setSelection(globalThis.ProseMirror.TextSelection.create(doc, resolvedFrom, resolvedEnd));
        break;
      }
    }
    if (transaction) {
      transaction.scrollIntoView();
      view.dispatch(transaction);
    }
  }
}
const ProseMirrorKeyMaps = globalThis.ProseMirror ? globalThis.ProseMirror.ProseMirrorKeyMaps : class {
};
class TJSKeyMaps extends ProseMirrorKeyMaps {
  /** @type {Function} */
  #onQuit;
  /**
   * @param {globalThis.Schema}   schema - The ProseMirror schema to build keymaps for.
   *
   * @param {object}   [options] - Additional options to configure the plugin's behaviour.
   *
   * @param {Function} [options.onSave] - A function to call when Ctrl+S is pressed.
   *
   * @param {Function} [options.onQuit] - A function to call when Ctrl+Q is pressed.
   */
  constructor(schema, options) {
    super(schema, options);
    if (typeof options.onQuit === "function") {
      this.#onQuit = options.onQuit;
    }
  }
  // eslint-disable-next jsdoc/check-types
  /**
   * Swaps the Foundry default `Escape` / selectParentNode to `Mod-p` and enables `onQuit` function for `Escape`.
   *
   * @returns { {[key: string]: globalThis.ProseMirrorCommand} } ProseMirror keymap data.
   */
  buildMapping() {
    const mapping = super.buildMapping();
    if (this.#onQuit) {
      if (mapping["Escape"]) {
        mapping["Mod-p"] = mapping["Escape"];
      }
      mapping["Escape"] = () => this.#onQuit();
    }
    return mapping;
  }
}
const Plugin = globalThis.ProseMirror ? globalThis.ProseMirror.Plugin : class {
};
class TJSPasteUUID {
  /**
   * Defines a regex to check for the shape of a raw Foundry document UUID.
   *
   * @type {RegExp}
   */
  static #s_UUID_REGEX = /(\.).*([a-zA-Z0-9]{16})/;
  /**
   * @returns {Plugin<any>} PM Plugin.
   */
  static build() {
    const instance2 = new this();
    return new Plugin({
      // key: new PluginKey('tjsPasteRawUUID'), // TODO: Add back when exported by Foundry / ProseMirror bundle.
      props: {
        transformPastedText: (text2) => instance2.#transformUUID(text2)
      }
    });
  }
  /**
   * Transforms pasted text. Check if pasted test matches the shape of a raw UUID. If so do a lookup and if a
   * document is retrieved transform it to a document link.
   *
   * @param {string}   text - pasted text to transform.
   *
   * @returns {string} Potentially transformed pasted text.
   */
  #transformUUID(text2) {
    if (typeof text2 === "string") {
      if (TJSPasteUUID.#s_UUID_REGEX.test(text2)) {
        const uuidDoc = globalThis.fromUuidSync(text2);
        if (uuidDoc) {
          text2 = `@UUID[${text2}]{${typeof uuidDoc.name === "string" ? uuidDoc.name : "Unknown"}}`;
        }
      }
    }
    return text2;
  }
}
const TJSProseMirror_svelte_svelte_type_style_lang = "";
function create_if_block_1$5(ctx) {
  let a;
  let mounted;
  let dispose;
  return {
    c() {
      a = element("a");
      a.innerHTML = `<i class="fas fa-edit"></i>`;
      attr(a, "class", "editor-edit svelte-lbvtt-10m2cp0");
      attr(a, "role", "button");
      attr(a, "tabindex", "-1");
    },
    m(target, anchor) {
      insert(target, a, anchor);
      if (!mounted) {
        dispose = listen(
          a,
          "click",
          /*click_handler*/
          ctx[15]
        );
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(a);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_else_block$2(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      attr(div, "class", "editor-enriched svelte-lbvtt-10m2cp0");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      div.innerHTML = /*enrichedContent*/
      ctx[1];
    },
    p(ctx2, dirty) {
      if (dirty & /*enrichedContent*/
      2)
        div.innerHTML = /*enrichedContent*/
        ctx2[1];
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_if_block$6(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      attr(div, "class", "editor-content svelte-lbvtt-10m2cp0");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      ctx[16](div);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      ctx[16](null);
    }
  };
}
function create_fragment$m(ctx) {
  let div;
  let t;
  let div_class_value;
  let applyStyles_action;
  let mounted;
  let dispose;
  let if_block0 = (
    /*editorButton*/
    ctx[5] && create_if_block_1$5(ctx)
  );
  function select_block_type(ctx2, dirty) {
    if (
      /*editorActive*/
      ctx2[3]
    )
      return create_if_block$6;
    return create_else_block$2;
  }
  let current_block_type = select_block_type(ctx);
  let if_block1 = current_block_type(ctx);
  return {
    c() {
      div = element("div");
      if (if_block0)
        if_block0.c();
      t = space();
      if_block1.c();
      attr(div, "class", div_class_value = "editor prosemirror tjs-editor " + (Array.isArray(
        /*options*/
        ctx[0].classes
      ) ? (
        /*options*/
        ctx[0].classes.join(" ")
      ) : "") + " svelte-lbvtt-10m2cp0");
      attr(div, "role", "textbox");
      attr(div, "tabindex", "0");
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
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block0)
        if_block0.m(div, null);
      append(div, t);
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
          listen(
            div,
            "click",
            /*onClick*/
            ctx[9]
          ),
          listen(
            div,
            "keydown",
            /*onKeydown*/
            ctx[10]
          ),
          listen(
            div,
            "keyup",
            /*onKeyup*/
            ctx[11]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (
        /*editorButton*/
        ctx2[5]
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_1$5(ctx2);
          if_block0.c();
          if_block0.m(div, t);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block1) {
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
      ) : "") + " svelte-lbvtt-10m2cp0")) {
        attr(div, "class", div_class_value);
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
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block0)
        if_block0.d();
      if_block1.d();
      ctx[17](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$m($$self, $$props, $$invalidate) {
  let $doc;
  let { content = "" } = $$props;
  let { enrichedContent = "" } = $$props;
  let { options = {} } = $$props;
  const dispatch2 = createEventDispatcher();
  const doc = new TJSDocument({ delete: onDocumentDeleted });
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
            if (editorEl instanceof HTMLElement && editorEl?.isConnected) {
              editorEl.focus();
            }
          },
          100
        );
      }
      if (fireCancel) {
        dispatch2("editor:cancel");
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
        keyMaps: TJSKeyMaps.build(ProseMirror.defaultSchema, {
          onSave: () => saveEditor({ remove }),
          onQuit: () => destroyEditor()
        }),
        tjsPasteRawUUID: TJSPasteUUID.build(),
        ...isObject(options.plugins) ? options.plugins : {}
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
    dispatch2("editor:start");
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
    dispatch2("editor:enrichedContent", { enrichedContent });
  }
  function onDocumentDeleted(document2) {
    $$invalidate(0, options.document = void 0, options);
    destroyEditor();
    dispatch2("editor:document:deleted", { document: document2 });
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
    if (editor) {
      if (editor.isDirty()) {
        let data = ProseMirror.dom.serializeString(editor.view.state.doc);
        if (options?.DOMPurify && typeof options?.DOMPurify?.sanitizeWithVideo === "function") {
          data = options.DOMPurify.sanitizeWithVideo(data);
        }
        if ($doc && options.fieldName) {
          $doc.update({ [options.fieldName]: data });
        } else {
          $$invalidate(12, content = data);
        }
        dispatch2("editor:save", { content: data });
      }
      if (remove) {
        destroyEditor(false);
      }
    }
  }
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
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*options, editable*/
    8193) {
      {
        $$invalidate(13, editable = typeof options.editable === "boolean" ? options.editable : true);
        if (!editable) {
          destroyEditor();
        }
      }
    }
    if ($$self.$$.dirty & /*editorActive, editable, options*/
    8201) {
      $$invalidate(2, clickToEdit = !editorActive && editable && (typeof options.clickToEdit === "boolean" ? options.clickToEdit : false));
    }
    if ($$self.$$.dirty & /*editorActive, editable, options, clickToEdit*/
    8205) {
      $$invalidate(5, editorButton = !editorActive && editable && (typeof options.button === "boolean" ? options.button : true) && !clickToEdit);
    }
    if ($$self.$$.dirty & /*options*/
    1) {
      keyCode = typeof options.keyCode === "string" ? options.keyCode : "Enter";
    }
    if ($$self.$$.dirty & /*options, $doc*/
    16385) {
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
      {
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
class TJSProseMirror extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$m, create_fragment$m, safe_not_equal, {
      content: 12,
      enrichedContent: 1,
      options: 0
    });
  }
}
const TJSTinyMCE_svelte_svelte_type_style_lang = "";
const TJSIconFolder_svelte_svelte_type_style_lang = "";
const TJSSelect_svelte_svelte_type_style_lang = "";
const TJSToggleLabel_svelte_svelte_type_style_lang = "";
const ResizeHitBox_svelte_svelte_type_style_lang = "";
const SelectedBorder_svelte_svelte_type_style_lang = "";
const PositionControl_svelte_svelte_type_style_lang = "";
const TJSPositionControlLayer_svelte_svelte_type_style_lang = "";
const TJSMenu_svelte_svelte_type_style_lang = "";
const TJSContextMenuImpl_svelte_svelte_type_style_lang = "";
const SettingEntry_svelte_svelte_type_style_lang = "";
const TJSSettingsEdit_svelte_svelte_type_style_lang = "";
const SectionColor_svelte_svelte_type_style_lang = "";
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
  if (isObject(props)) {
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
const ActorBiography_svelte_svelte_type_style_lang = "";
function create_fragment$l(ctx) {
  let div;
  let tjsprosemirror;
  let updating_content;
  let current;
  function tjsprosemirror_content_binding(value) {
    ctx[3](value);
  }
  let tjsprosemirror_props = {
    options: {
      editable: true,
      secrets: (
        /*$doc*/
        ctx[1].isOwner
      )
    }
  };
  if (
    /*content*/
    ctx[0] !== void 0
  ) {
    tjsprosemirror_props.content = /*content*/
    ctx[0];
  }
  tjsprosemirror = new TJSProseMirror({ props: tjsprosemirror_props });
  binding_callbacks.push(() => bind(tjsprosemirror, "content", tjsprosemirror_content_binding));
  return {
    c() {
      div = element("div");
      create_component(tjsprosemirror.$$.fragment);
      attr(div, "class", "biography-container svelte-lbvtt-1sirzut");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(tjsprosemirror, div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const tjsprosemirror_changes = {};
      if (dirty & /*$doc*/
      2)
        tjsprosemirror_changes.options = {
          editable: true,
          secrets: (
            /*$doc*/
            ctx2[1].isOwner
          )
        };
      if (!updating_content && dirty & /*content*/
      1) {
        updating_content = true;
        tjsprosemirror_changes.content = /*content*/
        ctx2[0];
        add_flush_callback(() => updating_content = false);
      }
      tjsprosemirror.$set(tjsprosemirror_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(tjsprosemirror.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(tjsprosemirror.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(tjsprosemirror);
    }
  };
}
function instance$l($$self, $$props, $$invalidate) {
  let $doc;
  getContext("ApplicationStateStore");
  const doc = getContext("DocumentStore");
  component_subscribe($$self, doc, (value) => $$invalidate(1, $doc = value));
  let content = $doc.system.biography.value;
  function tjsprosemirror_content_binding(value) {
    content = value;
    $$invalidate(0, content);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$doc, content*/
    3) {
      {
        $doc.update({ "system.biography.value": content });
      }
    }
  };
  return [content, $doc, doc, tjsprosemirror_content_binding];
}
class ActorBiography extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$l, create_fragment$l, safe_not_equal, {});
  }
}
class ContextMenu extends FormApplication {
  constructor({ menuItems = [], selectedItem = "", dialogData = {}, options = {} } = {}) {
    super(dialogData, options);
    this.menuItems = menuItems;
    this.selectedItem = selectedItem;
    this.header = "";
    this.showHeader = false;
    this.callback = void 0;
  }
  /* -------------------------------------------- */
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      template: `systems/leobrew/templates/parts/context-menu.html`,
      classes: ["leobrew", "context-menu"],
      width: 80
    });
  }
  setHeader(inStr) {
    this.header = inStr;
    this.showHeader = true;
    return this;
  }
  setCallback(callback) {
    this.callback = callback;
    return this;
  }
  addMenuItem(label, options = {}) {
    this.menuItems.push(foundry.utils.mergeObject(
      { label, data: false, fa: "", "class": "", "callback": false },
      options
    ));
    return this;
  }
  async show({ position = { x: 0, y: 0 } } = {}) {
    let self = this;
    ["click", "contextmenu"].forEach((evt) => document.addEventListener(evt, () => {
      self.close();
    }));
    await sleep(10);
    this.render(true);
    await sleep(0);
    this.setPosition({ left: position.x, top: position.y });
    return this;
  }
  /* -------------------------------------------- */
  /** @override */
  getData() {
    let data = super.getData();
    data.menuItems = this.menuItems;
    if (this.selectedItem !== false) {
      data.menuItems.forEach((item) => {
        if (item.id === this.selectedItem) {
          item.class = "selected";
        }
      });
    }
    data.header = this.header;
    data.showHeader = this.showHeader;
    return data;
  }
  async _updateObject(event, formData) {
    let text2 = event.submitter.dataset.label;
    let item = this.menuItems.find((i) => i.label === text2);
    if (item.callback) {
      item.callback(item.data);
    } else if (this.callback) {
      this.callback(item.data);
    }
  }
}
async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
const ActorInjuries_svelte_svelte_type_style_lang = "";
function get_each_context$7(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[28] = list[i];
  return child_ctx;
}
function get_each_context_1$2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[31] = list[i];
  return child_ctx;
}
function create_each_block_1$2(ctx) {
  let tr;
  let td0;
  let t0_value = (
    /*bodyPart*/
    ctx[31].label + ""
  );
  let t0;
  let t1;
  let td1;
  let t2_value = (
    /*bodyPart*/
    ctx[31].value + ""
  );
  let t2;
  let t3;
  return {
    c() {
      tr = element("tr");
      td0 = element("td");
      t0 = text(t0_value);
      t1 = space();
      td1 = element("td");
      t2 = text(t2_value);
      t3 = space();
      attr(td0, "class", "svelte-lbvtt-qrlski");
      attr(td1, "class", "svelte-lbvtt-qrlski");
    },
    m(target, anchor) {
      insert(target, tr, anchor);
      append(tr, td0);
      append(td0, t0);
      append(tr, t1);
      append(tr, td1);
      append(td1, t2);
      append(tr, t3);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*armorBonuses*/
      8 && t0_value !== (t0_value = /*bodyPart*/
      ctx2[31].label + ""))
        set_data(t0, t0_value);
      if (dirty[0] & /*armorBonuses*/
      8 && t2_value !== (t2_value = /*bodyPart*/
      ctx2[31].value + ""))
        set_data(t2, t2_value);
    },
    d(detaching) {
      if (detaching) {
        detach(tr);
      }
    }
  };
}
function create_each_block$7(ctx) {
  let img;
  let img_src_value;
  return {
    c() {
      img = element("img");
      if (!src_url_equal(img.src, img_src_value = /*injury*/
      ctx[28].path))
        attr(img, "src", img_src_value);
      attr(img, "class", "svelte-lbvtt-qrlski");
      toggle_class(
        img,
        "active",
        /*hoveredBodyPart*/
        ctx[1] === /*injury*/
        ctx[28].name
      );
    },
    m(target, anchor) {
      insert(target, img, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*injuries*/
      4 && !src_url_equal(img.src, img_src_value = /*injury*/
      ctx2[28].path)) {
        attr(img, "src", img_src_value);
      }
      if (dirty[0] & /*hoveredBodyPart, injuries*/
      6) {
        toggle_class(
          img,
          "active",
          /*hoveredBodyPart*/
          ctx2[1] === /*injury*/
          ctx2[28].name
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(img);
      }
    }
  };
}
function create_fragment$k(ctx) {
  let div2;
  let div0;
  let table;
  let thead;
  let t3;
  let tbody;
  let t4;
  let div1;
  let t5;
  let svg0;
  let path0;
  let path0_data_tooltip_value;
  let t6;
  let svg1;
  let path1;
  let path1_data_tooltip_value;
  let t7;
  let svg2;
  let path2;
  let path2_data_tooltip_value;
  let t8;
  let svg3;
  let path3;
  let path3_data_tooltip_value;
  let t9;
  let svg4;
  let path4;
  let path4_data_tooltip_value;
  let t10;
  let svg5;
  let path5;
  let path5_data_tooltip_value;
  let t11;
  let svg6;
  let path6;
  let path6_data_tooltip_value;
  let mounted;
  let dispose;
  let each_value_1 = ensure_array_like(
    /*armorBonuses*/
    ctx[3]
  );
  let each_blocks_1 = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks_1[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
  }
  let each_value = ensure_array_like(
    /*injuries*/
    ctx[2]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$7(get_each_context$7(ctx, each_value, i));
  }
  return {
    c() {
      div2 = element("div");
      div0 = element("div");
      table = element("table");
      thead = element("thead");
      thead.innerHTML = `<tr><th class="svelte-lbvtt-qrlski">Part</th> <th class="svelte-lbvtt-qrlski">Def</th></tr>`;
      t3 = space();
      tbody = element("tbody");
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].c();
      }
      t4 = space();
      div1 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t5 = space();
      svg0 = svg_element("svg");
      path0 = svg_element("path");
      t6 = space();
      svg1 = svg_element("svg");
      path1 = svg_element("path");
      t7 = space();
      svg2 = svg_element("svg");
      path2 = svg_element("path");
      t8 = space();
      svg3 = svg_element("svg");
      path3 = svg_element("path");
      t9 = space();
      svg4 = svg_element("svg");
      path4 = svg_element("path");
      t10 = space();
      svg5 = svg_element("svg");
      path5 = svg_element("path");
      t11 = space();
      svg6 = svg_element("svg");
      path6 = svg_element("path");
      attr(div0, "class", "armor-table svelte-lbvtt-qrlski");
      attr(path0, "d", "M30,15 L65,15 L60,45 L47.5,35 L35,45 Z");
      attr(path0, "data-bodypart", "chest");
      attr(path0, "fill", "transparent");
      attr(path0, "data-tooltip", path0_data_tooltip_value = /*injuryLocalization*/
      ctx[5][
        /*$doc*/
        ctx[0].system.injuries["chest"].value
      ]);
      attr(path0, "pointer-events", "fill");
      set_style(svg0, "z-index", "5000");
      attr(svg0, "viewBox", "0 0 100 200");
      attr(svg0, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg0, "class", "svelte-lbvtt-qrlski");
      attr(path1, "d", "M30,15 L0,45 L0,65 L35,45 Z");
      attr(path1, "data-bodypart", "arms");
      attr(path1, "fill", "transparent");
      attr(path1, "data-tooltip", path1_data_tooltip_value = /*injuryLocalization*/
      ctx[5][
        /*$doc*/
        ctx[0].system.injuries["arms"].value
      ]);
      attr(path1, "pointer-events", "fill");
      set_style(svg1, "z-index", "5000");
      attr(svg1, "viewBox", "0 0 100 200");
      attr(svg1, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg1, "class", "svelte-lbvtt-qrlski");
      attr(path2, "d", "M65,15 L97,45 L97,65 L60,45 Z");
      attr(path2, "data-bodypart", "arms");
      attr(path2, "fill", "transparent");
      attr(path2, "data-tooltip", path2_data_tooltip_value = /*injuryLocalization*/
      ctx[5][
        /*$doc*/
        ctx[0].system.injuries["arms"].value
      ]);
      attr(path2, "pointer-events", "fill");
      set_style(svg2, "z-index", "5000");
      attr(svg2, "viewBox", "0 0 100 200");
      attr(svg2, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg2, "class", "svelte-lbvtt-qrlski");
      attr(path3, "d", "M35,15 L35,0 L60,0 L60,15 Z");
      attr(path3, "data-bodypart", "head");
      attr(path3, "fill", "transparent");
      attr(path3, "data-tooltip", path3_data_tooltip_value = /*injuryLocalization*/
      ctx[5][
        /*$doc*/
        ctx[0].system.injuries["head"].value
      ]);
      attr(path3, "pointer-events", "fill");
      set_style(svg3, "z-index", "5000");
      attr(svg3, "viewBox", "0 0 100 200");
      attr(svg3, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg3, "class", "svelte-lbvtt-qrlski");
      attr(path4, "d", "M60,45 L65,60 L47.5,70 L30,60 L35,45 L47.5,35 Z");
      attr(path4, "data-bodypart", "guts");
      attr(path4, "fill", "transparent");
      attr(path4, "data-tooltip", path4_data_tooltip_value = /*injuryLocalization*/
      ctx[5][
        /*$doc*/
        ctx[0].system.injuries["guts"].value
      ]);
      attr(path4, "pointer-events", "fill");
      set_style(svg4, "z-index", "5000");
      attr(svg4, "viewBox", "0 0 100 200");
      attr(svg4, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg4, "class", "svelte-lbvtt-qrlski");
      attr(path5, "d", "M65,60 L67,127 L55,127 L47.5,70 Z");
      attr(path5, "data-bodypart", "legs");
      attr(path5, "fill", "transparent");
      attr(path5, "data-tooltip", path5_data_tooltip_value = /*injuryLocalization*/
      ctx[5][
        /*$doc*/
        ctx[0].system.injuries["legs"].value
      ]);
      attr(path5, "pointer-events", "fill");
      set_style(svg5, "z-index", "5000");
      attr(svg5, "viewBox", "0 0 100 200");
      attr(svg5, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg5, "class", "svelte-lbvtt-qrlski");
      attr(path6, "d", "M30,60 L27,127 L42,127  L47.5,70 Z");
      attr(path6, "data-bodypart", "legs");
      attr(path6, "fill", "transparent");
      attr(path6, "data-tooltip", path6_data_tooltip_value = /*injuryLocalization*/
      ctx[5][
        /*$doc*/
        ctx[0].system.injuries["legs"].value
      ]);
      attr(path6, "pointer-events", "fill");
      set_style(svg6, "z-index", "5000");
      attr(svg6, "viewBox", "0 0 100 200");
      attr(svg6, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg6, "class", "svelte-lbvtt-qrlski");
      attr(div1, "class", "hitboxes svelte-lbvtt-qrlski");
      attr(div2, "class", "injuries svelte-lbvtt-qrlski");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, div0);
      append(div0, table);
      append(table, thead);
      append(table, t3);
      append(table, tbody);
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        if (each_blocks_1[i]) {
          each_blocks_1[i].m(tbody, null);
        }
      }
      append(div2, t4);
      append(div2, div1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div1, null);
        }
      }
      append(div1, t5);
      append(div1, svg0);
      append(svg0, path0);
      append(div1, t6);
      append(div1, svg1);
      append(svg1, path1);
      append(div1, t7);
      append(div1, svg2);
      append(svg2, path2);
      append(div1, t8);
      append(div1, svg3);
      append(svg3, path3);
      append(div1, t9);
      append(div1, svg4);
      append(svg4, path4);
      append(div1, t10);
      append(div1, svg5);
      append(svg5, path5);
      append(div1, t11);
      append(div1, svg6);
      append(svg6, path6);
      if (!mounted) {
        dispose = [
          listen(
            path0,
            "contextmenu",
            /*contextmenu_handler*/
            ctx[7]
          ),
          listen(
            path0,
            "mouseover",
            /*mouseover_handler*/
            ctx[8]
          ),
          listen(
            path0,
            "mouseleave",
            /*mouseleave_handler*/
            ctx[9]
          ),
          listen(
            path1,
            "contextmenu",
            /*contextmenu_handler_1*/
            ctx[10]
          ),
          listen(
            path1,
            "mouseover",
            /*mouseover_handler_1*/
            ctx[11]
          ),
          listen(
            path1,
            "mouseleave",
            /*mouseleave_handler_1*/
            ctx[12]
          ),
          listen(
            path2,
            "contextmenu",
            /*contextmenu_handler_2*/
            ctx[13]
          ),
          listen(
            path2,
            "mouseover",
            /*mouseover_handler_2*/
            ctx[14]
          ),
          listen(
            path2,
            "mouseleave",
            /*mouseleave_handler_2*/
            ctx[15]
          ),
          listen(
            path3,
            "contextmenu",
            /*contextmenu_handler_3*/
            ctx[16]
          ),
          listen(
            path3,
            "mouseover",
            /*mouseover_handler_3*/
            ctx[17]
          ),
          listen(
            path3,
            "mouseleave",
            /*mouseleave_handler_3*/
            ctx[18]
          ),
          listen(
            path4,
            "contextmenu",
            /*contextmenu_handler_4*/
            ctx[19]
          ),
          listen(
            path4,
            "mouseover",
            /*mouseover_handler_4*/
            ctx[20]
          ),
          listen(
            path4,
            "mouseleave",
            /*mouseleave_handler_4*/
            ctx[21]
          ),
          listen(
            path5,
            "contextmenu",
            /*contextmenu_handler_5*/
            ctx[22]
          ),
          listen(
            path5,
            "mouseover",
            /*mouseover_handler_5*/
            ctx[23]
          ),
          listen(
            path5,
            "mouseleave",
            /*mouseleave_handler_5*/
            ctx[24]
          ),
          listen(
            path6,
            "contextmenu",
            /*contextmenu_handler_6*/
            ctx[25]
          ),
          listen(
            path6,
            "mouseover",
            /*mouseover_handler_6*/
            ctx[26]
          ),
          listen(
            path6,
            "mouseleave",
            /*mouseleave_handler_6*/
            ctx[27]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*armorBonuses*/
      8) {
        each_value_1 = ensure_array_like(
          /*armorBonuses*/
          ctx2[3]
        );
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1$2(ctx2, each_value_1, i);
          if (each_blocks_1[i]) {
            each_blocks_1[i].p(child_ctx, dirty);
          } else {
            each_blocks_1[i] = create_each_block_1$2(child_ctx);
            each_blocks_1[i].c();
            each_blocks_1[i].m(tbody, null);
          }
        }
        for (; i < each_blocks_1.length; i += 1) {
          each_blocks_1[i].d(1);
        }
        each_blocks_1.length = each_value_1.length;
      }
      if (dirty[0] & /*injuries, hoveredBodyPart*/
      6) {
        each_value = ensure_array_like(
          /*injuries*/
          ctx2[2]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$7(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$7(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div1, t5);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
      if (dirty[0] & /*$doc*/
      1 && path0_data_tooltip_value !== (path0_data_tooltip_value = /*injuryLocalization*/
      ctx2[5][
        /*$doc*/
        ctx2[0].system.injuries["chest"].value
      ])) {
        attr(path0, "data-tooltip", path0_data_tooltip_value);
      }
      if (dirty[0] & /*$doc*/
      1 && path1_data_tooltip_value !== (path1_data_tooltip_value = /*injuryLocalization*/
      ctx2[5][
        /*$doc*/
        ctx2[0].system.injuries["arms"].value
      ])) {
        attr(path1, "data-tooltip", path1_data_tooltip_value);
      }
      if (dirty[0] & /*$doc*/
      1 && path2_data_tooltip_value !== (path2_data_tooltip_value = /*injuryLocalization*/
      ctx2[5][
        /*$doc*/
        ctx2[0].system.injuries["arms"].value
      ])) {
        attr(path2, "data-tooltip", path2_data_tooltip_value);
      }
      if (dirty[0] & /*$doc*/
      1 && path3_data_tooltip_value !== (path3_data_tooltip_value = /*injuryLocalization*/
      ctx2[5][
        /*$doc*/
        ctx2[0].system.injuries["head"].value
      ])) {
        attr(path3, "data-tooltip", path3_data_tooltip_value);
      }
      if (dirty[0] & /*$doc*/
      1 && path4_data_tooltip_value !== (path4_data_tooltip_value = /*injuryLocalization*/
      ctx2[5][
        /*$doc*/
        ctx2[0].system.injuries["guts"].value
      ])) {
        attr(path4, "data-tooltip", path4_data_tooltip_value);
      }
      if (dirty[0] & /*$doc*/
      1 && path5_data_tooltip_value !== (path5_data_tooltip_value = /*injuryLocalization*/
      ctx2[5][
        /*$doc*/
        ctx2[0].system.injuries["legs"].value
      ])) {
        attr(path5, "data-tooltip", path5_data_tooltip_value);
      }
      if (dirty[0] & /*$doc*/
      1 && path6_data_tooltip_value !== (path6_data_tooltip_value = /*injuryLocalization*/
      ctx2[5][
        /*$doc*/
        ctx2[0].system.injuries["legs"].value
      ])) {
        attr(path6, "data-tooltip", path6_data_tooltip_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div2);
      }
      destroy_each(each_blocks_1, detaching);
      destroy_each(each_blocks, detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$k($$self, $$props, $$invalidate) {
  let armorBonuses;
  let injuries;
  let $doc;
  const doc = getContext("DocumentStore");
  component_subscribe($$self, doc, (value) => $$invalidate(0, $doc = value));
  const injuryLocalization = {
    "": localize("LEOBREW.InjuriesNone"),
    "bruise": localize("LEOBREW.InjuriesBruise"),
    "one-light": localize("LEOBREW.InjuriesOneLight"),
    "two-light": localize("LEOBREW.InjuriesTwoLight"),
    "one-severe": localize("LEOBREW.InjuriesOneSevere"),
    "two-severe": localize("LEOBREW.InjuriesTwoSevere"),
    "critical": localize("LEOBREW.InjuriesCritical")
  };
  let hoveredBodyPart = "";
  function contextMenu(event, selectedBodyPart) {
    const selectedInjury = $doc.system.injuries[selectedBodyPart].value;
    new ContextMenu({ selectedItem: selectedInjury }).setCallback(([bodyPart, injury]) => {
      return $doc.update({
        [`data.injuries.${bodyPart}.value`]: injury
      });
    }).setHeader(`Select injury (${selectedBodyPart}):`).addMenuItem("No Injury", { id: "", data: [selectedBodyPart, ""] }).addMenuItem("Bruise", {
      id: "bruise",
      data: [selectedBodyPart, "bruise"]
    }).addMenuItem("One Light Injury", {
      id: "one-light",
      data: [selectedBodyPart, "one-light"]
    }).addMenuItem("Two Light Injury", {
      id: "two-light",
      data: [selectedBodyPart, "two-light"]
    }).addMenuItem("One Severe Injury", {
      id: "one-severe",
      data: [selectedBodyPart, "one-severe"]
    }).addMenuItem("Two Severe Injury", {
      id: "two-severe",
      data: [selectedBodyPart, "two-severe"]
    }).addMenuItem("Critical", {
      id: "critical",
      data: [selectedBodyPart, "critical"]
    }).show({
      position: { x: event.pageX, y: event.pageY }
    });
  }
  const contextmenu_handler = (evt) => {
    contextMenu(evt, "chest");
  };
  const mouseover_handler = () => {
    $$invalidate(1, hoveredBodyPart = "chest");
  };
  const mouseleave_handler = () => {
    $$invalidate(1, hoveredBodyPart = "");
  };
  const contextmenu_handler_1 = (evt) => {
    contextMenu(evt, "arms");
  };
  const mouseover_handler_1 = () => {
    $$invalidate(1, hoveredBodyPart = "arms");
  };
  const mouseleave_handler_1 = () => {
    $$invalidate(1, hoveredBodyPart = "");
  };
  const contextmenu_handler_2 = (evt) => {
    contextMenu(evt, "arms");
  };
  const mouseover_handler_2 = () => {
    $$invalidate(1, hoveredBodyPart = "arms");
  };
  const mouseleave_handler_2 = () => {
    $$invalidate(1, hoveredBodyPart = "");
  };
  const contextmenu_handler_3 = (evt) => {
    contextMenu(evt, "head");
  };
  const mouseover_handler_3 = () => {
    $$invalidate(1, hoveredBodyPart = "head");
  };
  const mouseleave_handler_3 = () => {
    $$invalidate(1, hoveredBodyPart = "");
  };
  const contextmenu_handler_4 = (evt) => {
    contextMenu(evt, "guts");
  };
  const mouseover_handler_4 = () => {
    $$invalidate(1, hoveredBodyPart = "guts");
  };
  const mouseleave_handler_4 = () => {
    $$invalidate(1, hoveredBodyPart = "");
  };
  const contextmenu_handler_5 = (evt) => {
    contextMenu(evt, "legs");
  };
  const mouseover_handler_5 = () => {
    $$invalidate(1, hoveredBodyPart = "legs");
  };
  const mouseleave_handler_5 = () => {
    $$invalidate(1, hoveredBodyPart = "");
  };
  const contextmenu_handler_6 = (evt) => {
    contextMenu(evt, "legs");
  };
  const mouseover_handler_6 = () => {
    $$invalidate(1, hoveredBodyPart = "legs");
  };
  const mouseleave_handler_6 = () => {
    $$invalidate(1, hoveredBodyPart = "");
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*$doc*/
    1) {
      $$invalidate(3, armorBonuses = $doc.armorBonuses);
    }
    if ($$self.$$.dirty[0] & /*$doc*/
    1) {
      $$invalidate(2, injuries = Object.entries($doc.system.injuries).map(([part, injury]) => {
        return {
          name: part,
          path: `systems/leobrew/images/${part}${injury.value !== "" ? "_" + injury.value : ""}.webp`
        };
      }));
    }
  };
  return [
    $doc,
    hoveredBodyPart,
    injuries,
    armorBonuses,
    doc,
    injuryLocalization,
    contextMenu,
    contextmenu_handler,
    mouseover_handler,
    mouseleave_handler,
    contextmenu_handler_1,
    mouseover_handler_1,
    mouseleave_handler_1,
    contextmenu_handler_2,
    mouseover_handler_2,
    mouseleave_handler_2,
    contextmenu_handler_3,
    mouseover_handler_3,
    mouseleave_handler_3,
    contextmenu_handler_4,
    mouseover_handler_4,
    mouseleave_handler_4,
    contextmenu_handler_5,
    mouseover_handler_5,
    mouseleave_handler_5,
    contextmenu_handler_6,
    mouseover_handler_6,
    mouseleave_handler_6
  ];
}
class ActorInjuries extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$k, create_fragment$k, safe_not_equal, {}, null, [-1, -1]);
  }
}
function createActorSheetState(actor) {
  const tabs = [
    { value: "inventory", label: "Inventory", component: ActorInventory },
    { value: "traits", label: "Traits", component: ActorTraits },
    { value: "injuries", label: "Injuries", component: ActorInjuries },
    { value: "biography", label: "Biography", component: ActorBiography }
  ];
  const { set: set2, update: update2, subscribe: subscribe2 } = writable({
    activeTab: tabs[0],
    tabs,
    isExpanded: {
      inventory: /* @__PURE__ */ new Set(),
      traits: /* @__PURE__ */ new Set()
    },
    initialized: actor.system.experience.initialized,
    levelingUp: !actor.system.experience.initialized,
    leveledUpSkills: {},
    leveledUpAbilities: {},
    levelUpExperience: 0,
    actor
  });
  function assignSkillPoint(skillId, skillLevel, amount = 1, isAbility = false) {
    update2((state) => {
      let pointsSpent = state.leveledUpSkills?.[skillId]?.pointsSpent ?? 0;
      let previousLevel = skillLevel + pointsSpent;
      let newLevel = previousLevel + amount;
      if (!newLevel) {
        if (amount < 0) {
          newLevel--;
          amount--;
        } else if (amount > 0) {
          newLevel++;
          amount++;
        }
      }
      const baseCost = isAbility ? 2 : 1;
      const cost = amount > 0 ? newLevel >= 5 ? newLevel : baseCost : previousLevel >= 5 ? -previousLevel : -baseCost;
      if (!state.leveledUpSkills[skillId]) {
        state.leveledUpSkills[skillId] = {
          pointsSpent: 0,
          level: 0,
          cost: 0
        };
      }
      state.leveledUpSkills[skillId].level = newLevel;
      state.leveledUpSkills[skillId].pointsSpent = pointsSpent + amount;
      state.leveledUpSkills[skillId].cost += cost;
      state.levelUpExperience += cost;
      return state;
    });
  }
  function canAssignSkillPoint(skillId, skillLevel, isAbility = false) {
    const state = get_store_value(this);
    const pointsSpent = (state.leveledUpSkills?.[skillId]?.pointsSpent ?? 0) + 1;
    const level = skillLevel + pointsSpent;
    if (!state.initialized && level >= 5)
      return false;
    const baseCost = isAbility ? 2 : 1;
    const cost = level >= 5 ? level : baseCost;
    return state.levelUpExperience + cost <= actor.system.experience.value;
  }
  function canSubtractSkillPoint(skillId, skillLevel, isAbility = false) {
    const state = get_store_value(this);
    const currentState = state.leveledUpSkills?.[skillId]?.pointsSpent ?? 0;
    const level = skillLevel + currentState;
    if (isAbility) {
      return level > -3;
    }
    return currentState > 0;
  }
  async function addSkill(skillName) {
    await actor.createEmbeddedDocuments("Item", [{
      name: skillName,
      type: "skill",
      "system.category": "Generic",
      "system.level": 1
    }]);
    const cost = get_store_value(this).initialized ? 5 : 1;
    await actor.update({
      "system.experience.value": actor.system.experience.value - cost,
      "system.experience.spent": actor.system.experience.spent + cost
    });
  }
  async function confirmLevelUp() {
    const data = get_store_value(this);
    if (!data.initialized) {
      const decision = await TJSDialog.confirm({
        title: "Confirm Levels",
        content: `<p style='text-align: center;'>Are you sure you want to continue? Once you confirm your initial character, you cannot go back.</p>`
      }, { width: 270, height: "auto" });
      if (!decision)
        return;
    }
    const updates = Object.entries(data.leveledUpSkills).map(([_id, skill]) => ({
      _id,
      "system.level": skill.level
    }));
    const actorUpdates = updates.filter((item) => !actor.items.get(item._id)).reduce((acc, attribute) => {
      acc[`system.abilities.${attribute._id}.value`] = attribute["system.level"];
      return acc;
    }, {});
    const itemUpdates = updates.filter((item) => !!actor.items.get(item._id));
    await actor.update({
      "system.experience.value": actor.system.experience.value - data.levelUpExperience,
      "system.experience.spent": actor.system.experience.spent + data.levelUpExperience,
      "system.experience.initialized": true,
      ...actorUpdates
    });
    await actor.updateEmbeddedDocuments("Item", itemUpdates);
    update2((state) => {
      state.initialized = true;
      return state;
    });
    abortLevelUp();
  }
  async function addExperience(exp) {
    await actor.update({
      "system.experience.value": actor.system.experience.value + exp
    });
  }
  function abortLevelUp() {
    update2((state) => {
      state.levelingUp = false;
      state.leveledUpSkills = {};
      state.levelUpExperience = 0;
      return state;
    });
  }
  function deleteItem(id) {
    update2((state) => {
      if (state.isExpanded.traits[id]) {
        delete state.isExpanded.traits[id];
      }
      if (state.isExpanded.inventory[id]) {
        delete state.isExpanded.inventory[id];
      }
      return state;
    });
  }
  return {
    set: set2,
    update: update2,
    subscribe: subscribe2,
    deleteItem,
    addSkill,
    addExperience,
    assignSkillPoint,
    canAssignSkillPoint,
    canSubtractSkillPoint,
    confirmLevelUp,
    abortLevelUp
  };
}
function create_fragment$j(ctx) {
  let applicationshell;
  let updating_elementRoot;
  let current;
  function applicationshell_elementRoot_binding(value) {
    ctx[1](value);
  }
  let applicationshell_props = {};
  if (
    /*elementRoot*/
    ctx[0] !== void 0
  ) {
    applicationshell_props.elementRoot = /*elementRoot*/
    ctx[0];
  }
  applicationshell = new ApplicationShell$1({ props: applicationshell_props });
  binding_callbacks.push(() => bind(applicationshell, "elementRoot", applicationshell_elementRoot_binding));
  return {
    c() {
      create_component(applicationshell.$$.fragment);
    },
    m(target, anchor) {
      mount_component(applicationshell, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const applicationshell_changes = {};
      if (!updating_elementRoot && dirty & /*elementRoot*/
      1) {
        updating_elementRoot = true;
        applicationshell_changes.elementRoot = /*elementRoot*/
        ctx2[0];
        add_flush_callback(() => updating_elementRoot = false);
      }
      applicationshell.$set(applicationshell_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(applicationshell.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(applicationshell.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(applicationshell, detaching);
    }
  };
}
function instance$j($$self, $$props, $$invalidate) {
  let { elementRoot } = $$props;
  function applicationshell_elementRoot_binding(value) {
    elementRoot = value;
    $$invalidate(0, elementRoot);
  }
  $$self.$$set = ($$props2) => {
    if ("elementRoot" in $$props2)
      $$invalidate(0, elementRoot = $$props2.elementRoot);
  };
  return [elementRoot, applicationshell_elementRoot_binding];
}
class Document_shell extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$j, create_fragment$j, safe_not_equal, { elementRoot: 0 });
  }
  get elementRoot() {
    return this.$$.ctx[0];
  }
  set elementRoot(elementRoot) {
    this.$$set({ elementRoot });
    flush();
  }
}
class SvelteDocumentSheet extends SvelteApplication {
  // Document store that monitors updates to any assigned document.
  #documentStore = new TJSDocument(void 0, { delete: this.close.bind(this) });
  // Application store that monitors updates to any assigned document.
  #applicationStateStore = new writable({});
  // Holds the document unsubscription function.
  #storeUnsubscribe;
  constructor(doc, options = {}) {
    super({
      id: `document-sheet-${doc.id}`,
      title: doc.name,
      classes: game.settings.get("leobrew", "darkModeSheets") === true ? ["leobrew-base-style", "leobrew-dark-mode"] : ["leobrew-base-style"],
      ...options
    });
    Object.defineProperty(this.reactive, "doc", {
      get: () => this.#documentStore.get(),
      set: (doc2) => {
        this.#documentStore.set(doc2);
      }
    });
    this.reactive.doc = doc;
    Object.defineProperty(this.reactive, "state", {
      get: () => this.#applicationStateStore,
      set: (state) => {
        this.#applicationStateStore = state;
      }
    });
  }
  // Default Application options
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 800,
      height: 600,
      resizable: true,
      minimizable: true,
      dragDrop: [{ dragSelector: ".directory-list .item", dropSelector: null }],
      svelte: {
        class: Document_shell,
        target: document.body,
        props: function() {
          return {
            documentStore: this.#documentStore,
            applicationStateStore: this.#applicationStateStore
          };
        }
      }
    });
  }
  // Drag Drop Handling
  _canDragStart(selector) {
    return true;
  }
  _canDragDrop(selector) {
    return this.reactive.doc.isOwner || game.user.isGM;
  }
  _onDragOver(event) {
  }
  _onDragStart(event) {
    {
      const li = event.currentTarget;
      if (event.target.classList.contains("content-link")) {
        return;
      }
      let dragData;
      if (li.dataset.itemId) {
        const item = this.actor.items.get(li.dataset.itemId);
        dragData = item.toDragData();
      }
      if (li.dataset.effectId) {
        const effect = this.actor.effects.get(li.dataset.effectId);
        dragData = effect.toDragData();
      }
      if (!dragData) {
        return;
      }
      event.dataTransfer.setData("text/plain", JSON.stringify(dragData));
    }
  }
  async _onDrop(event) {
    if (this.reactive.doc.documentName !== "Actor") {
      return;
    }
    const data = TextEditor.getDragEventData(event);
    const actor = this.reactive.doc;
    const allowed = Hooks.call("dropActorSheetData", actor, this, data);
    if (allowed === false) {
      return;
    }
    switch (data.type) {
      case "ActiveEffect": {
        return this._onDropActiveEffect(event, data, actor);
      }
      case "Actor": {
        return this._onDropActor(event, data, actor);
      }
      case "Item": {
        return this._onDropItem(event, data, actor);
      }
      case "Folder": {
        return this._onDropFolder(event, data, actor);
      }
      default: {
        console.error("Leobrew | Impossible type in _onDrop.");
        console.trace();
        return false;
      }
    }
  }
  async _onDropActiveEffect(event, data, actor) {
    const effect = await ActiveEffect.implementation.fromDropData(data);
    if (!actor.isOwner || !effect) {
      return false;
    }
    if (actor.uuid === effect.parent.uuid) {
      return false;
    }
    return ActiveEffect.create(effect.toObject(), { parent: actor });
  }
  async _onDropActor(event, data, actor) {
    if (!actor.isOwner) {
      return false;
    }
  }
  async _onDropItem(event, data, actor) {
    if (!actor.isOwner) {
      return false;
    }
    const item = await Item.implementation.fromDropData(data);
    const itemData = item.toObject();
    if (actor.uuid === item.parent?.uuid) {
      return this._onSortItem(event, itemData, actor);
    }
    return this._onDropItemCreate(itemData, actor);
  }
  async _onDropFolder(event, data, actor) {
    if (!actor.isOwner) {
      return [];
    }
    if (data.documentName !== "Item") {
      return [];
    }
    const folder = await Folder.implementation.fromDropData(data);
    if (!folder) {
      return [];
    }
    return this._onDropItemCreate(
      folder.contents.map((item) => {
        return game.items.fromCompendium(item);
      })
    );
  }
  async _onDropItemCreate(itemData, actor) {
    itemData = itemData instanceof Array ? itemData : [itemData];
    return actor.createEmbeddedDocuments("Item", itemData);
  }
  _onSortItem(event, itemData, actor) {
    const items = actor.items;
    const source = items.get(itemData._id);
    const dropTarget = event.target.closest("[data-item-id]");
    if (!dropTarget) {
      return;
    }
    const target = items.get(dropTarget.dataset.itemId);
    if (source.id === target.id) {
      return;
    }
    const siblings = [];
    for (let el of dropTarget.parentElement.children) {
      const siblingId = el.dataset.itemId;
      if (siblingId && siblingId !== source.id) {
        siblings.push(items.get(el.dataset.itemId));
      }
    }
    const sortUpdates = SortingHelpers.performIntegerSort(source, { target, siblings });
    const updateData = sortUpdates.map((u) => {
      const update2 = u.update;
      update2._id = u.target._id;
      return update2;
    });
    return actor.updateEmbeddedDocuments("Item", updateData);
  }
  _onConfigureSheet(event) {
    if (event) {
      event.preventDefault();
    }
    new DocumentSheetConfig(this.reactive.document, {
      top: this.position.top + 40,
      left: this.position.left + (this.position.width - SvelteDocumentSheet.defaultOptions.width) / 2
    }).render(true);
  }
  _onConfigureToken(event) {
    if (event) {
      event.preventDefault();
    }
    const actor = this.reactive.doc;
    const token = actor.isToken ? actor.token : actor.prototypeToken;
    new CONFIG.Token.prototypeSheetClass(token).render(true);
  }
  async close(options = {}) {
    await super.close(options);
    if (this.#storeUnsubscribe) {
      this.#storeUnsubscribe();
      this.#storeUnsubscribe = void 0;
    }
  }
  /**
   * Handles any changes to document.
   *
   * @param {foundry.abstract.Document}  doc -
   *
   * @param {object}                     options -
   */
  async #handleDocUpdate(doc, options) {
    const { action, data, documentType } = options;
    if ((action === void 0 || action === "update" || action === "subscribe") && doc) {
      this.reactive.title = doc?.isToken ? `[Token] ${doc?.name}` : doc?.name ?? "No Document Assigned";
    }
  }
  render(force = false, options = {}) {
    if (!this.#storeUnsubscribe) {
      this.#storeUnsubscribe = this.#documentStore.subscribe(this.#handleDocUpdate.bind(this));
    }
    super.render(force, options);
    return this;
  }
}
const ActorAbility_svelte_svelte_type_style_lang = "";
function create_if_block_1$4(ctx) {
  let i;
  let mounted;
  let dispose;
  return {
    c() {
      i = element("i");
      attr(i, "class", "fas fa-minus");
      toggle_class(
        i,
        "clickable",
        /*canSubtractSkillPoint*/
        ctx[4]
      );
      toggle_class(
        i,
        "clickable-red",
        /*canSubtractSkillPoint*/
        ctx[4]
      );
      toggle_class(i, "clickable-disabled", !/*canSubtractSkillPoint*/
      ctx[4]);
    },
    m(target, anchor) {
      insert(target, i, anchor);
      if (!mounted) {
        dispose = listen(
          i,
          "click",
          /*click_handler_1*/
          ctx[12]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*canSubtractSkillPoint*/
      16) {
        toggle_class(
          i,
          "clickable",
          /*canSubtractSkillPoint*/
          ctx2[4]
        );
      }
      if (dirty & /*canSubtractSkillPoint*/
      16) {
        toggle_class(
          i,
          "clickable-red",
          /*canSubtractSkillPoint*/
          ctx2[4]
        );
      }
      if (dirty & /*canSubtractSkillPoint*/
      16) {
        toggle_class(i, "clickable-disabled", !/*canSubtractSkillPoint*/
        ctx2[4]);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(i);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block$5(ctx) {
  let i;
  let mounted;
  let dispose;
  return {
    c() {
      i = element("i");
      attr(i, "class", "fas fa-plus");
      toggle_class(
        i,
        "clickable",
        /*canAssignSkillPoint*/
        ctx[3]
      );
      toggle_class(
        i,
        "clickable-green",
        /*canAssignSkillPoint*/
        ctx[3]
      );
      toggle_class(i, "clickable-disabled", !/*canAssignSkillPoint*/
      ctx[3]);
    },
    m(target, anchor) {
      insert(target, i, anchor);
      if (!mounted) {
        dispose = listen(
          i,
          "click",
          /*click_handler_2*/
          ctx[13]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*canAssignSkillPoint*/
      8) {
        toggle_class(
          i,
          "clickable",
          /*canAssignSkillPoint*/
          ctx2[3]
        );
      }
      if (dirty & /*canAssignSkillPoint*/
      8) {
        toggle_class(
          i,
          "clickable-green",
          /*canAssignSkillPoint*/
          ctx2[3]
        );
      }
      if (dirty & /*canAssignSkillPoint*/
      8) {
        toggle_class(i, "clickable-disabled", !/*canAssignSkillPoint*/
        ctx2[3]);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(i);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$i(ctx) {
  let div1;
  let span;
  let t0_value = (
    /*$widthStore*/
    (ctx[6] > 550 ? CONFIG.LEOBREW.abilities[
      /*key*/
      ctx[0]
    ] : CONFIG.LEOBREW.abilityAbbreviations[
      /*key*/
      ctx[0]
    ]) + ""
  );
  let t0;
  let t1;
  let div0;
  let t2;
  let input;
  let input_value_value;
  let t3;
  let mounted;
  let dispose;
  let if_block0 = (
    /*$appState*/
    ctx[2].levelingUp && create_if_block_1$4(ctx)
  );
  let if_block1 = (
    /*$appState*/
    ctx[2].levelingUp && create_if_block$5(ctx)
  );
  return {
    c() {
      div1 = element("div");
      span = element("span");
      t0 = text(t0_value);
      t1 = space();
      div0 = element("div");
      if (if_block0)
        if_block0.c();
      t2 = space();
      input = element("input");
      t3 = space();
      if (if_block1)
        if_block1.c();
      attr(span, "class", "clickable clickable-red svelte-lbvtt-lzijsh");
      input.disabled = true;
      attr(input, "placeholder", "1");
      attr(input, "type", "number");
      input.value = input_value_value = /*ability*/
      ctx[1].value + /*pointsSpent*/
      ctx[5];
      attr(input, "class", "svelte-lbvtt-lzijsh");
      attr(div0, "class", "actor-ability-input-container svelte-lbvtt-lzijsh");
      attr(div1, "class", "actor-ability-container border-groove svelte-lbvtt-lzijsh");
      toggle_class(
        div1,
        "actor-ability-container-small",
        /*$widthStore*/
        ctx[6] <= 550
      );
      toggle_class(
        div1,
        "actor-ability-container-small-leveling",
        /*$appState*/
        ctx[2].levelingUp
      );
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, span);
      append(span, t0);
      append(div1, t1);
      append(div1, div0);
      if (if_block0)
        if_block0.m(div0, null);
      append(div0, t2);
      append(div0, input);
      append(div0, t3);
      if (if_block1)
        if_block1.m(div0, null);
      if (!mounted) {
        dispose = listen(
          span,
          "click",
          /*click_handler*/
          ctx[11]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*$widthStore, key*/
      65 && t0_value !== (t0_value = /*$widthStore*/
      (ctx2[6] > 550 ? CONFIG.LEOBREW.abilities[
        /*key*/
        ctx2[0]
      ] : CONFIG.LEOBREW.abilityAbbreviations[
        /*key*/
        ctx2[0]
      ]) + ""))
        set_data(t0, t0_value);
      if (
        /*$appState*/
        ctx2[2].levelingUp
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_1$4(ctx2);
          if_block0.c();
          if_block0.m(div0, t2);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (dirty & /*ability, pointsSpent*/
      34 && input_value_value !== (input_value_value = /*ability*/
      ctx2[1].value + /*pointsSpent*/
      ctx2[5]) && input.value !== input_value_value) {
        input.value = input_value_value;
      }
      if (
        /*$appState*/
        ctx2[2].levelingUp
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block$5(ctx2);
          if_block1.c();
          if_block1.m(div0, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (dirty & /*$widthStore*/
      64) {
        toggle_class(
          div1,
          "actor-ability-container-small",
          /*$widthStore*/
          ctx2[6] <= 550
        );
      }
      if (dirty & /*$appState*/
      4) {
        toggle_class(
          div1,
          "actor-ability-container-small-leveling",
          /*$appState*/
          ctx2[2].levelingUp
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      mounted = false;
      dispose();
    }
  };
}
function instance$i($$self, $$props, $$invalidate) {
  let pointsSpent;
  let $appState;
  let $widthStore;
  let $doc;
  const { application } = getContext("#external");
  const doc = getContext("DocumentStore");
  component_subscribe($$self, doc, (value) => $$invalidate(7, $doc = value));
  const widthStore = application.position.stores.width;
  component_subscribe($$self, widthStore, (value) => $$invalidate(6, $widthStore = value));
  const appState = getContext("ApplicationStateStore");
  component_subscribe($$self, appState, (value) => $$invalidate(2, $appState = value));
  let { key } = $$props;
  let { ability } = $$props;
  let canAssignSkillPoint = false;
  let canSubtractSkillPoint = false;
  const click_handler = (event) => {
    $doc.rollAbility(key, { event });
  };
  const click_handler_1 = () => {
    if (canSubtractSkillPoint)
      appState.assignSkillPoint(key, ability.value, -1, true);
  };
  const click_handler_2 = () => {
    if (canAssignSkillPoint)
      appState.assignSkillPoint(key, ability.value, 1, true);
  };
  $$self.$$set = ($$props2) => {
    if ("key" in $$props2)
      $$invalidate(0, key = $$props2.key);
    if ("ability" in $$props2)
      $$invalidate(1, ability = $$props2.ability);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$appState, key, ability*/
    7) {
      {
        $$invalidate(3, canAssignSkillPoint = appState.canAssignSkillPoint(key, ability.value, true));
        $$invalidate(4, canSubtractSkillPoint = appState.canSubtractSkillPoint(key, ability.value, true));
      }
    }
    if ($$self.$$.dirty & /*$appState, key*/
    5) {
      $$invalidate(5, pointsSpent = $appState.leveledUpSkills?.[key]?.pointsSpent ?? 0);
    }
    if ($$self.$$.dirty & /*$appState, key*/
    5) {
      $appState.leveledUpSkills?.[key]?.cost ?? 0;
    }
  };
  return [
    key,
    ability,
    $appState,
    canAssignSkillPoint,
    canSubtractSkillPoint,
    pointsSpent,
    $widthStore,
    $doc,
    doc,
    widthStore,
    appState,
    click_handler,
    click_handler_1,
    click_handler_2
  ];
}
class ActorAbility extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$i, create_fragment$i, safe_not_equal, { key: 0, ability: 1 });
  }
}
function create_fragment$h(ctx) {
  let div;
  let img;
  let img_src_value;
  let div_class_value;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      img = element("img");
      attr(img, "class", "clickable");
      if (!src_url_equal(img.src, img_src_value = /*src*/
      ctx[1]))
        attr(img, "src", img_src_value);
      attr(div, "class", div_class_value = /*$$props*/
      ctx[3].class);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, img);
      if (!mounted) {
        dispose = listen(
          div,
          "click",
          /*handleClick*/
          ctx[2]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*src*/
      2 && !src_url_equal(img.src, img_src_value = /*src*/
      ctx2[1])) {
        attr(img, "src", img_src_value);
      }
      if (dirty & /*$$props*/
      8 && div_class_value !== (div_class_value = /*$$props*/
      ctx2[3].class)) {
        attr(div, "class", div_class_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      mounted = false;
      dispose();
    }
  };
}
function instance$h($$self, $$props, $$invalidate) {
  let src;
  let $doc, $$unsubscribe_doc = noop, $$subscribe_doc = () => ($$unsubscribe_doc(), $$unsubscribe_doc = subscribe(doc, ($$value) => $$invalidate(4, $doc = $$value)), doc);
  $$self.$$.on_destroy.push(() => $$unsubscribe_doc());
  let { doc } = $$props;
  $$subscribe_doc();
  let filePicker = false;
  function handleClick() {
    if (!filePicker) {
      filePicker = new FilePicker({
        type: "imagevideo",
        current: src,
        callback: (path) => {
          $doc.update({ "img": path });
          filePicker = false;
        }
      });
    }
    filePicker.render(true, { focus: true });
  }
  $$self.$$set = ($$new_props) => {
    $$invalidate(3, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("doc" in $$new_props)
      $$subscribe_doc($$invalidate(0, doc = $$new_props.doc));
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$doc*/
    16) {
      $$invalidate(1, src = $doc.img);
    }
  };
  $$props = exclude_internal_props($$props);
  return [doc, src, handleClick, $$props, $doc];
}
class DocumentImage extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$h, create_fragment$h, safe_not_equal, { doc: 0 });
  }
}
const ActorTopBar_svelte_svelte_type_style_lang = "";
function get_each_context$6(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[11] = list[i][0];
  child_ctx[12] = list[i][1];
  return child_ctx;
}
function get_each_context_1$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[11] = list[i][0];
  child_ctx[15] = list[i][1];
  child_ctx[16] = list;
  child_ctx[17] = i;
  return child_ctx;
}
function create_if_block_4(ctx) {
  let i;
  let mounted;
  let dispose;
  return {
    c() {
      i = element("i");
      attr(i, "class", "fas fa-times clickable clickable-faint clickable-red svelte-lbvtt-91q4dl");
    },
    m(target, anchor) {
      insert(target, i, anchor);
      if (!mounted) {
        dispose = listen(
          i,
          "click",
          /*click_handler*/
          ctx[5]
        );
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(i);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_else_block$1(ctx) {
  let i;
  let mounted;
  let dispose;
  return {
    c() {
      i = element("i");
      attr(i, "class", "fas fa-edit clickable clickable-faint clickable-red svelte-lbvtt-91q4dl");
    },
    m(target, anchor) {
      insert(target, i, anchor);
      if (!mounted) {
        dispose = listen(
          i,
          "click",
          /*click_handler_2*/
          ctx[7]
        );
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(i);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_3(ctx) {
  let i;
  let mounted;
  let dispose;
  return {
    c() {
      i = element("i");
      attr(i, "class", "fas fa-check clickable clickable-faint clickable-green svelte-lbvtt-91q4dl");
    },
    m(target, anchor) {
      insert(target, i, anchor);
      if (!mounted) {
        dispose = listen(
          i,
          "click",
          /*click_handler_1*/
          ctx[6]
        );
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(i);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_2$2(ctx) {
  let i;
  let mounted;
  let dispose;
  return {
    c() {
      i = element("i");
      attr(i, "class", "fas fa-minus clickable clickable-faint clickable-red svelte-lbvtt-91q4dl");
    },
    m(target, anchor) {
      insert(target, i, anchor);
      if (!mounted) {
        dispose = listen(
          i,
          "click",
          /*click_handler_3*/
          ctx[8]
        );
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(i);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_1$3(ctx) {
  let i;
  let mounted;
  let dispose;
  return {
    c() {
      i = element("i");
      attr(i, "class", "fas fa-plus clickable clickable-faint clickable-red svelte-lbvtt-91q4dl");
    },
    m(target, anchor) {
      insert(target, i, anchor);
      if (!mounted) {
        dispose = listen(
          i,
          "click",
          /*click_handler_4*/
          ctx[9]
        );
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(i);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block$4(ctx) {
  let div1;
  let span0;
  let t0_value = CONFIG.LEOBREW.resources[
    /*key*/
    ctx[11]
  ] + "";
  let t0;
  let t1;
  let div0;
  let input0;
  let t2;
  let span1;
  let t4;
  let input1;
  let input1_value_value;
  let t5;
  let mounted;
  let dispose;
  function input0_input_handler_1() {
    ctx[10].call(
      input0,
      /*each_value_1*/
      ctx[16],
      /*index*/
      ctx[17]
    );
  }
  return {
    c() {
      div1 = element("div");
      span0 = element("span");
      t0 = text(t0_value);
      t1 = space();
      div0 = element("div");
      input0 = element("input");
      t2 = space();
      span1 = element("span");
      span1.textContent = "/";
      t4 = space();
      input1 = element("input");
      t5 = space();
      attr(span0, "class", "svelte-lbvtt-91q4dl");
      attr(input0, "type", "number");
      attr(input0, "min", "0");
      attr(input0, "class", "svelte-lbvtt-91q4dl");
      attr(span1, "class", "svelte-lbvtt-91q4dl");
      attr(input1, "type", "number");
      input1.disabled = true;
      input1.value = input1_value_value = /*resource*/
      ctx[15].max;
      attr(input1, "class", "svelte-lbvtt-91q4dl");
      attr(div0, "class", "actor-resource-values svelte-lbvtt-91q4dl");
      attr(div1, "class", "actor-resource svelte-lbvtt-91q4dl");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, span0);
      append(span0, t0);
      append(div1, t1);
      append(div1, div0);
      append(div0, input0);
      set_input_value(
        input0,
        /*resource*/
        ctx[15].value
      );
      append(div0, t2);
      append(div0, span1);
      append(div0, t4);
      append(div0, input1);
      append(div1, t5);
      if (!mounted) {
        dispose = listen(input0, "input", input0_input_handler_1);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*$doc*/
      1 && t0_value !== (t0_value = CONFIG.LEOBREW.resources[
        /*key*/
        ctx[11]
      ] + ""))
        set_data(t0, t0_value);
      if (dirty & /*Object, $doc*/
      1 && to_number(input0.value) !== /*resource*/
      ctx[15].value) {
        set_input_value(
          input0,
          /*resource*/
          ctx[15].value
        );
      }
      if (dirty & /*$doc*/
      1 && input1_value_value !== (input1_value_value = /*resource*/
      ctx[15].max) && input1.value !== input1_value_value) {
        input1.value = input1_value_value;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_each_block_1$1(key_2, ctx) {
  let first;
  let if_block_anchor;
  let if_block = (
    /*resource*/
    ctx[15].enabled && create_if_block$4(ctx)
  );
  return {
    key: key_2,
    first: null,
    c() {
      first = empty();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
      this.first = first;
    },
    m(target, anchor) {
      insert(target, first, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (
        /*resource*/
        ctx[15].enabled
      ) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$4(ctx);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(first);
        detach(if_block_anchor);
      }
      if (if_block)
        if_block.d(detaching);
    }
  };
}
function create_each_block$6(ctx) {
  let actorability;
  let current;
  actorability = new ActorAbility({
    props: {
      key: (
        /*key*/
        ctx[11]
      ),
      ability: (
        /*ability*/
        ctx[12]
      )
    }
  });
  return {
    c() {
      create_component(actorability.$$.fragment);
    },
    m(target, anchor) {
      mount_component(actorability, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const actorability_changes = {};
      if (dirty & /*$doc*/
      1)
        actorability_changes.key = /*key*/
        ctx2[11];
      if (dirty & /*$doc*/
      1)
        actorability_changes.ability = /*ability*/
        ctx2[12];
      actorability.$set(actorability_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(actorability.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(actorability.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(actorability, detaching);
    }
  };
}
function create_fragment$g(ctx) {
  let div4;
  let documentimage;
  let t0;
  let div3;
  let input0;
  let t1;
  let div2;
  let div1;
  let span1;
  let t2;
  let span0;
  let t4;
  let t5;
  let div0;
  let t6;
  let input1;
  let input1_value_value;
  let t7;
  let t8;
  let each_blocks_1 = [];
  let each0_lookup = /* @__PURE__ */ new Map();
  let t9;
  let div5;
  let current;
  let mounted;
  let dispose;
  documentimage = new DocumentImage({
    props: {
      class: "actor-image",
      doc: (
        /*doc*/
        ctx[2]
      )
    }
  });
  let if_block0 = (
    /*$appState*/
    ctx[1].levelingUp && create_if_block_4(ctx)
  );
  function select_block_type(ctx2, dirty) {
    if (
      /*$appState*/
      ctx2[1].levelingUp
    )
      return create_if_block_3;
    return create_else_block$1;
  }
  let current_block_type = select_block_type(ctx);
  let if_block1 = current_block_type(ctx);
  let if_block2 = (
    /*$appState*/
    ctx[1].levelingUp && create_if_block_2$2(ctx)
  );
  let if_block3 = (
    /*$appState*/
    ctx[1].levelingUp && create_if_block_1$3(ctx)
  );
  let each_value_1 = ensure_array_like(Object.entries(
    /*$doc*/
    ctx[0].system.resources
  ));
  const get_key = (ctx2) => (
    /*resource*/
    ctx2[15]
  );
  for (let i = 0; i < each_value_1.length; i += 1) {
    let child_ctx = get_each_context_1$1(ctx, each_value_1, i);
    let key = get_key(child_ctx);
    each0_lookup.set(key, each_blocks_1[i] = create_each_block_1$1(key, child_ctx));
  }
  let each_value = ensure_array_like(Object.entries(
    /*$doc*/
    ctx[0].system.abilities
  ));
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      div4 = element("div");
      create_component(documentimage.$$.fragment);
      t0 = space();
      div3 = element("div");
      input0 = element("input");
      t1 = space();
      div2 = element("div");
      div1 = element("div");
      span1 = element("span");
      if (if_block0)
        if_block0.c();
      t2 = space();
      span0 = element("span");
      span0.textContent = `${CONFIG.LEOBREW.resources.experience}`;
      t4 = space();
      if_block1.c();
      t5 = space();
      div0 = element("div");
      if (if_block2)
        if_block2.c();
      t6 = space();
      input1 = element("input");
      t7 = space();
      if (if_block3)
        if_block3.c();
      t8 = space();
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].c();
      }
      t9 = space();
      div5 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(input0, "class", "actor-name-input form-control svelte-lbvtt-91q4dl");
      attr(input0, "placeholder", "Name");
      attr(input0, "type", "text");
      attr(span0, "class", "svelte-lbvtt-91q4dl");
      attr(span1, "class", "svelte-lbvtt-91q4dl");
      input1.disabled = true;
      attr(input1, "min", "0");
      attr(input1, "type", "number");
      input1.value = input1_value_value = /*$doc*/
      ctx[0].system.experience.value - /*$appState*/
      ctx[1].levelUpExperience;
      attr(input1, "class", "svelte-lbvtt-91q4dl");
      attr(div0, "class", "actor-experience-container svelte-lbvtt-91q4dl");
      attr(div1, "class", "actor-resource svelte-lbvtt-91q4dl");
      attr(div2, "class", "actor-resource-bar svelte-lbvtt-91q4dl");
      attr(div3, "class", "actor-resource-bar-container svelte-lbvtt-91q4dl");
      attr(div4, "class", "actor-top-bar modesto svelte-lbvtt-91q4dl");
      attr(div5, "class", "actor-ability-bar modesto svelte-lbvtt-91q4dl");
    },
    m(target, anchor) {
      insert(target, div4, anchor);
      mount_component(documentimage, div4, null);
      append(div4, t0);
      append(div4, div3);
      append(div3, input0);
      set_input_value(
        input0,
        /*$doc*/
        ctx[0].name
      );
      append(div3, t1);
      append(div3, div2);
      append(div2, div1);
      append(div1, span1);
      if (if_block0)
        if_block0.m(span1, null);
      append(span1, t2);
      append(span1, span0);
      append(span1, t4);
      if_block1.m(span1, null);
      append(div1, t5);
      append(div1, div0);
      if (if_block2)
        if_block2.m(div0, null);
      append(div0, t6);
      append(div0, input1);
      append(div0, t7);
      if (if_block3)
        if_block3.m(div0, null);
      append(div2, t8);
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        if (each_blocks_1[i]) {
          each_blocks_1[i].m(div2, null);
        }
      }
      insert(target, t9, anchor);
      insert(target, div5, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div5, null);
        }
      }
      current = true;
      if (!mounted) {
        dispose = listen(
          input0,
          "input",
          /*input0_input_handler*/
          ctx[4]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*$doc*/
      1 && input0.value !== /*$doc*/
      ctx2[0].name) {
        set_input_value(
          input0,
          /*$doc*/
          ctx2[0].name
        );
      }
      if (
        /*$appState*/
        ctx2[1].levelingUp
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_4(ctx2);
          if_block0.c();
          if_block0.m(span1, t2);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block1) {
        if_block1.p(ctx2, dirty);
      } else {
        if_block1.d(1);
        if_block1 = current_block_type(ctx2);
        if (if_block1) {
          if_block1.c();
          if_block1.m(span1, null);
        }
      }
      if (
        /*$appState*/
        ctx2[1].levelingUp
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
        } else {
          if_block2 = create_if_block_2$2(ctx2);
          if_block2.c();
          if_block2.m(div0, t6);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
      if (!current || dirty & /*$doc, $appState*/
      3 && input1_value_value !== (input1_value_value = /*$doc*/
      ctx2[0].system.experience.value - /*$appState*/
      ctx2[1].levelUpExperience) && input1.value !== input1_value_value) {
        input1.value = input1_value_value;
      }
      if (
        /*$appState*/
        ctx2[1].levelingUp
      ) {
        if (if_block3) {
          if_block3.p(ctx2, dirty);
        } else {
          if_block3 = create_if_block_1$3(ctx2);
          if_block3.c();
          if_block3.m(div0, null);
        }
      } else if (if_block3) {
        if_block3.d(1);
        if_block3 = null;
      }
      if (dirty & /*Object, $doc, CONFIG*/
      1) {
        each_value_1 = ensure_array_like(Object.entries(
          /*$doc*/
          ctx2[0].system.resources
        ));
        each_blocks_1 = update_keyed_each(each_blocks_1, dirty, get_key, 1, ctx2, each_value_1, each0_lookup, div2, destroy_block, create_each_block_1$1, null, get_each_context_1$1);
      }
      if (dirty & /*Object, $doc*/
      1) {
        each_value = ensure_array_like(Object.entries(
          /*$doc*/
          ctx2[0].system.abilities
        ));
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$6(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$6(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div5, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(documentimage.$$.fragment, local);
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      transition_out(documentimage.$$.fragment, local);
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div4);
        detach(t9);
        detach(div5);
      }
      destroy_component(documentimage);
      if (if_block0)
        if_block0.d();
      if_block1.d();
      if (if_block2)
        if_block2.d();
      if (if_block3)
        if_block3.d();
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].d();
      }
      destroy_each(each_blocks, detaching);
      mounted = false;
      dispose();
    }
  };
}
function instance$g($$self, $$props, $$invalidate) {
  let $doc;
  let $appState;
  const doc = getContext("DocumentStore");
  component_subscribe($$self, doc, (value) => $$invalidate(0, $doc = value));
  const appState = getContext("ApplicationStateStore");
  component_subscribe($$self, appState, (value) => $$invalidate(1, $appState = value));
  function input0_input_handler() {
    $doc.name = this.value;
    doc.set($doc);
  }
  const click_handler = () => {
    appState.abortLevelUp();
  };
  const click_handler_1 = () => {
    appState.confirmLevelUp();
  };
  const click_handler_2 = () => {
    set_store_value(appState, $appState.levelingUp = true, $appState);
  };
  const click_handler_3 = () => {
    appState.addExperience(-1);
  };
  const click_handler_4 = () => {
    appState.addExperience(1);
  };
  function input0_input_handler_1(each_value_1, index) {
    each_value_1[index][1].value = to_number(this.value);
  }
  return [
    $doc,
    $appState,
    doc,
    appState,
    input0_input_handler,
    click_handler,
    click_handler_1,
    click_handler_2,
    click_handler_3,
    click_handler_4,
    input0_input_handler_1
  ];
}
class ActorTopBar extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$g, create_fragment$g, safe_not_equal, {});
  }
}
const ActorSkill_svelte_svelte_type_style_lang = "";
function get_each_context$5(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[22] = list[i];
  return child_ctx;
}
function create_if_block_2$1(ctx) {
  let i;
  let mounted;
  let dispose;
  return {
    c() {
      i = element("i");
      attr(i, "class", "fas fa-minus svelte-lbvtt-1532lrn");
      toggle_class(
        i,
        "clickable",
        /*canSubtractSkillPoint*/
        ctx[3]
      );
      toggle_class(
        i,
        "clickable-red",
        /*canSubtractSkillPoint*/
        ctx[3]
      );
      toggle_class(i, "clickable-disabled", !/*canSubtractSkillPoint*/
      ctx[3]);
    },
    m(target, anchor) {
      insert(target, i, anchor);
      if (!mounted) {
        dispose = listen(
          i,
          "click",
          /*click_handler*/
          ctx[14]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*canSubtractSkillPoint*/
      8) {
        toggle_class(
          i,
          "clickable",
          /*canSubtractSkillPoint*/
          ctx2[3]
        );
      }
      if (dirty & /*canSubtractSkillPoint*/
      8) {
        toggle_class(
          i,
          "clickable-red",
          /*canSubtractSkillPoint*/
          ctx2[3]
        );
      }
      if (dirty & /*canSubtractSkillPoint*/
      8) {
        toggle_class(i, "clickable-disabled", !/*canSubtractSkillPoint*/
        ctx2[3]);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(i);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_1$2(ctx) {
  let i;
  let mounted;
  let dispose;
  return {
    c() {
      i = element("i");
      attr(i, "class", "fas fa-plus svelte-lbvtt-1532lrn");
      toggle_class(
        i,
        "clickable",
        /*canAssignSkillPoint*/
        ctx[2]
      );
      toggle_class(
        i,
        "clickable-green",
        /*canAssignSkillPoint*/
        ctx[2]
      );
      toggle_class(i, "clickable-disabled", !/*canAssignSkillPoint*/
      ctx[2]);
    },
    m(target, anchor) {
      insert(target, i, anchor);
      if (!mounted) {
        dispose = listen(
          i,
          "click",
          /*click_handler_1*/
          ctx[15]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*canAssignSkillPoint*/
      4) {
        toggle_class(
          i,
          "clickable",
          /*canAssignSkillPoint*/
          ctx2[2]
        );
      }
      if (dirty & /*canAssignSkillPoint*/
      4) {
        toggle_class(
          i,
          "clickable-green",
          /*canAssignSkillPoint*/
          ctx2[2]
        );
      }
      if (dirty & /*canAssignSkillPoint*/
      4) {
        toggle_class(i, "clickable-disabled", !/*canAssignSkillPoint*/
        ctx2[2]);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(i);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block$3(ctx) {
  let each_1_anchor;
  let each_value = ensure_array_like(
    /*$subSkills*/
    ctx[7]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
  }
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert(target, each_1_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*skill, $subSkills, $skillBonus, pointsSpent*/
      225) {
        each_value = ensure_array_like(
          /*$subSkills*/
          ctx2[7]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$5(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$5(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(each_1_anchor);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_each_block$5(ctx) {
  let div1;
  let input;
  let input_value_value;
  let t0;
  let div0;
  let label;
  let t1_value = (
    /*subSkill*/
    ctx[22].name + ""
  );
  let t1;
  let t2;
  let i;
  let t3;
  let mounted;
  let dispose;
  function click_handler_6(...args) {
    return (
      /*click_handler_6*/
      ctx[20](
        /*subSkill*/
        ctx[22],
        ...args
      )
    );
  }
  function click_handler_7(...args) {
    return (
      /*click_handler_7*/
      ctx[21](
        /*subSkill*/
        ctx[22],
        ...args
      )
    );
  }
  return {
    c() {
      div1 = element("div");
      input = element("input");
      t0 = space();
      div0 = element("div");
      label = element("label");
      t1 = text(t1_value);
      t2 = space();
      i = element("i");
      t3 = space();
      input.disabled = true;
      attr(input, "max", "10");
      attr(input, "min", "1");
      attr(input, "type", "number");
      input.value = input_value_value = /*subSkill*/
      ctx[22].bonus + /*$skillBonus*/
      ctx[6] + /*pointsSpent*/
      ctx[5];
      attr(input, "class", "svelte-lbvtt-1532lrn");
      attr(label, "class", "skill-name clickable clickable-red svelte-lbvtt-1532lrn");
      attr(i, "class", "fas fa-sword skill-edit-button clickable clickable-red svelte-lbvtt-1532lrn");
      attr(div0, "class", "skill-label svelte-lbvtt-1532lrn");
      attr(div1, "class", "actor-skill actor-subskill svelte-lbvtt-1532lrn");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, input);
      append(div1, t0);
      append(div1, div0);
      append(div0, label);
      append(label, t1);
      append(div0, t2);
      append(div0, i);
      append(div1, t3);
      if (!mounted) {
        dispose = [
          listen(label, "click", click_handler_6),
          listen(i, "click", click_handler_7)
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*$subSkills, $skillBonus, pointsSpent*/
      224 && input_value_value !== (input_value_value = /*subSkill*/
      ctx[22].bonus + /*$skillBonus*/
      ctx[6] + /*pointsSpent*/
      ctx[5]) && input.value !== input_value_value) {
        input.value = input_value_value;
      }
      if (dirty & /*$subSkills*/
      128 && t1_value !== (t1_value = /*subSkill*/
      ctx[22].name + ""))
        set_data(t1, t1_value);
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment$f(ctx) {
  let div1;
  let t0;
  let input;
  let input_data_tooltip_value;
  let input_value_value;
  let t1;
  let t2;
  let div0;
  let label;
  let t3_value = (
    /*skill*/
    ctx[0].name + ""
  );
  let t3;
  let t4_value = (
    /*pointsSpent*/
    ctx[5] ? ` (+${/*realPointsSpent*/
    ctx[4]})` : ""
  );
  let t4;
  let t5;
  let i0;
  let t6;
  let i1;
  let t7;
  let i2;
  let t8;
  let if_block2_anchor;
  let mounted;
  let dispose;
  let if_block0 = (
    /*$appState*/
    ctx[1].levelingUp && create_if_block_2$1(ctx)
  );
  let if_block1 = (
    /*$appState*/
    ctx[1].levelingUp && create_if_block_1$2(ctx)
  );
  let if_block2 = (
    /*$subSkills*/
    ctx[7].length && create_if_block$3(ctx)
  );
  return {
    c() {
      div1 = element("div");
      if (if_block0)
        if_block0.c();
      t0 = space();
      input = element("input");
      t1 = space();
      if (if_block1)
        if_block1.c();
      t2 = space();
      div0 = element("div");
      label = element("label");
      t3 = text(t3_value);
      t4 = text(t4_value);
      t5 = space();
      i0 = element("i");
      t6 = space();
      i1 = element("i");
      t7 = space();
      i2 = element("i");
      t8 = space();
      if (if_block2)
        if_block2.c();
      if_block2_anchor = empty();
      attr(input, "data-tooltip", input_data_tooltip_value = /*$skillBonus*/
      ctx[6] ? `Base ${/*skill*/
      ctx[0].system.level} (${/*$skillBonus*/
      ctx[6]} bonus)` : "");
      input.disabled = true;
      attr(input, "max", "10");
      attr(input, "min", "1");
      attr(input, "type", "number");
      input.value = input_value_value = /*$appState*/
      ctx[1].levelingUp ? (
        /*skill*/
        ctx[0].system.level + /*pointsSpent*/
        ctx[5]
      ) : (
        /*skill*/
        ctx[0].system.level + /*$skillBonus*/
        ctx[6]
      );
      attr(input, "class", "svelte-lbvtt-1532lrn");
      attr(label, "class", "skill-name clickable clickable-red svelte-lbvtt-1532lrn");
      attr(i0, "class", "fas fa-sword skill-edit-button clickable clickable-red svelte-lbvtt-1532lrn");
      attr(div0, "class", "skill-label svelte-lbvtt-1532lrn");
      attr(i1, "class", "fas fa-edit skill-edit-button clickable clickable-red svelte-lbvtt-1532lrn");
      attr(i2, "class", "fas fa-trash skill-edit-button clickable clickable-red svelte-lbvtt-1532lrn");
      attr(div1, "class", "actor-skill svelte-lbvtt-1532lrn");
      attr(div1, "draggable", "true");
      toggle_class(
        div1,
        "magic-skill",
        /*skill*/
        ctx[0].system.isMagic
      );
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      if (if_block0)
        if_block0.m(div1, null);
      append(div1, t0);
      append(div1, input);
      append(div1, t1);
      if (if_block1)
        if_block1.m(div1, null);
      append(div1, t2);
      append(div1, div0);
      append(div0, label);
      append(label, t3);
      append(label, t4);
      append(div0, t5);
      append(div0, i0);
      append(div1, t6);
      append(div1, i1);
      append(div1, t7);
      append(div1, i2);
      insert(target, t8, anchor);
      if (if_block2)
        if_block2.m(target, anchor);
      insert(target, if_block2_anchor, anchor);
      if (!mounted) {
        dispose = [
          listen(
            label,
            "click",
            /*click_handler_2*/
            ctx[16]
          ),
          listen(
            i0,
            "click",
            /*click_handler_3*/
            ctx[17]
          ),
          listen(
            i1,
            "click",
            /*click_handler_4*/
            ctx[18]
          ),
          listen(
            i2,
            "click",
            /*click_handler_5*/
            ctx[19]
          ),
          listen(
            div1,
            "dragstart",
            /*dragStart*/
            ctx[12]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (
        /*$appState*/
        ctx2[1].levelingUp
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_2$1(ctx2);
          if_block0.c();
          if_block0.m(div1, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (dirty & /*$skillBonus, skill*/
      65 && input_data_tooltip_value !== (input_data_tooltip_value = /*$skillBonus*/
      ctx2[6] ? `Base ${/*skill*/
      ctx2[0].system.level} (${/*$skillBonus*/
      ctx2[6]} bonus)` : "")) {
        attr(input, "data-tooltip", input_data_tooltip_value);
      }
      if (dirty & /*$appState, skill, pointsSpent, $skillBonus*/
      99 && input_value_value !== (input_value_value = /*$appState*/
      ctx2[1].levelingUp ? (
        /*skill*/
        ctx2[0].system.level + /*pointsSpent*/
        ctx2[5]
      ) : (
        /*skill*/
        ctx2[0].system.level + /*$skillBonus*/
        ctx2[6]
      )) && input.value !== input_value_value) {
        input.value = input_value_value;
      }
      if (
        /*$appState*/
        ctx2[1].levelingUp
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block_1$2(ctx2);
          if_block1.c();
          if_block1.m(div1, t2);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (dirty & /*skill*/
      1 && t3_value !== (t3_value = /*skill*/
      ctx2[0].name + ""))
        set_data(t3, t3_value);
      if (dirty & /*pointsSpent, realPointsSpent*/
      48 && t4_value !== (t4_value = /*pointsSpent*/
      ctx2[5] ? ` (+${/*realPointsSpent*/
      ctx2[4]})` : ""))
        set_data(t4, t4_value);
      if (dirty & /*skill*/
      1) {
        toggle_class(
          div1,
          "magic-skill",
          /*skill*/
          ctx2[0].system.isMagic
        );
      }
      if (
        /*$subSkills*/
        ctx2[7].length
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
        } else {
          if_block2 = create_if_block$3(ctx2);
          if_block2.c();
          if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div1);
        detach(t8);
        detach(if_block2_anchor);
      }
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      if (if_block2)
        if_block2.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$f($$self, $$props, $$invalidate) {
  let pointsSpent;
  let realPointsSpent;
  let $appState;
  let $skillDoc;
  let $skillBonus;
  let $subSkills;
  const appState = getContext("ApplicationStateStore");
  component_subscribe($$self, appState, (value) => $$invalidate(1, $appState = value));
  let { skill } = $$props;
  const skillDoc = new TJSDocument(skill);
  component_subscribe($$self, skillDoc, (value) => $$invalidate(13, $skillDoc = value));
  let canAssignSkillPoint = false;
  let canSubtractSkillPoint = false;
  let subSkills = $skillDoc.stores.subSkills;
  component_subscribe($$self, subSkills, (value) => $$invalidate(7, $subSkills = value));
  let skillBonus = $skillDoc.stores.bonus;
  component_subscribe($$self, skillBonus, (value) => $$invalidate(6, $skillBonus = value));
  function dragStart(event) {
    event.dataTransfer.setData("text/plain", JSON.stringify({ type: "Item", uuid: skill.uuid }));
  }
  const click_handler = () => {
    if (canSubtractSkillPoint)
      appState.assignSkillPoint(skill.id, skill.system.level, -1);
  };
  const click_handler_1 = () => {
    if (canAssignSkillPoint)
      appState.assignSkillPoint(skill.id, skill.system.level, 1);
  };
  const click_handler_2 = (event) => {
    skill.roll({ event });
  };
  const click_handler_3 = (event) => {
    skill.roll({ event, isAttack: true });
  };
  const click_handler_4 = () => {
    skill.sheet.render(true);
  };
  const click_handler_5 = () => {
    TJSDialog.confirm(
      {
        title: "Delete Skill",
        content: `<p style='text-align: center;'>Are you sure you want to delete "${skill.name}"?</p>`,
        onYes: () => {
          skill.delete();
        }
      },
      { width: 270, height: "auto" }
    );
  };
  const click_handler_6 = (subSkill, event) => {
    skill.roll({
      event,
      extraTitle: subSkill.name,
      subSkill
    });
  };
  const click_handler_7 = (subSkill, event) => {
    skill.roll({
      event,
      extraTitle: subSkill.name,
      subSkill,
      isAttack: true
    });
  };
  $$self.$$set = ($$props2) => {
    if ("skill" in $$props2)
      $$invalidate(0, skill = $$props2.skill);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$appState, $skillDoc, skill*/
    8195) {
      {
        $$invalidate(2, canAssignSkillPoint = appState.canAssignSkillPoint(skill.id, skill.system.level));
        $$invalidate(3, canSubtractSkillPoint = appState.canSubtractSkillPoint(skill.id, skill.system.level));
      }
    }
    if ($$self.$$.dirty & /*$appState, skill*/
    3) {
      $$invalidate(5, pointsSpent = $appState.leveledUpSkills?.[skill.id]?.pointsSpent ?? 0);
    }
    if ($$self.$$.dirty & /*$appState, skill*/
    3) {
      $$invalidate(4, realPointsSpent = $appState.leveledUpSkills?.[skill.id]?.cost ?? 0);
    }
  };
  return [
    skill,
    $appState,
    canAssignSkillPoint,
    canSubtractSkillPoint,
    realPointsSpent,
    pointsSpent,
    $skillBonus,
    $subSkills,
    appState,
    skillDoc,
    subSkills,
    skillBonus,
    dragStart,
    $skillDoc,
    click_handler,
    click_handler_1,
    click_handler_2,
    click_handler_3,
    click_handler_4,
    click_handler_5,
    click_handler_6,
    click_handler_7
  ];
}
class ActorSkill extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$f, create_fragment$f, safe_not_equal, { skill: 0 });
  }
}
const ActorEquipmentSkill_svelte_svelte_type_style_lang = "";
function create_fragment$e(ctx) {
  let div1;
  let input;
  let t0;
  let div0;
  let span;
  let t1_value = (
    /*$skillDoc*/
    ctx[1].name + ""
  );
  let t1;
  let t2;
  let t3_value = (
    /*$skillDoc*/
    ctx[1].system.skillLabel ? `(${/*$skillDoc*/
    ctx[1].system.skillLabel})` : ""
  );
  let t3;
  let t4;
  let i;
  let mounted;
  let dispose;
  return {
    c() {
      div1 = element("div");
      input = element("input");
      t0 = space();
      div0 = element("div");
      span = element("span");
      t1 = text(t1_value);
      t2 = space();
      t3 = text(t3_value);
      t4 = space();
      i = element("i");
      input.disabled = true;
      attr(input, "max", "10");
      attr(input, "min", "1");
      attr(input, "type", "number");
      input.value = /*bonus*/
      ctx[2];
      attr(input, "class", "svelte-lbvtt-1532lrn");
      attr(span, "class", "skill-name clickable clickable-red svelte-lbvtt-1532lrn");
      attr(div0, "class", "svelte-lbvtt-1532lrn");
      attr(i, "class", "fas fa-edit skill-edit-button clickable clickable-red svelte-lbvtt-1532lrn");
      attr(div1, "class", "actor-skill svelte-lbvtt-1532lrn");
      attr(div1, "draggable", "true");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, input);
      append(div1, t0);
      append(div1, div0);
      append(div0, span);
      append(span, t1);
      append(span, t2);
      append(span, t3);
      append(div1, t4);
      append(div1, i);
      if (!mounted) {
        dispose = [
          listen(
            span,
            "click",
            /*click_handler*/
            ctx[4]
          ),
          listen(
            i,
            "click",
            /*click_handler_1*/
            ctx[5]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*bonus*/
      4 && input.value !== /*bonus*/
      ctx2[2]) {
        input.value = /*bonus*/
        ctx2[2];
      }
      if (dirty & /*$skillDoc*/
      2 && t1_value !== (t1_value = /*$skillDoc*/
      ctx2[1].name + ""))
        set_data(t1, t1_value);
      if (dirty & /*$skillDoc*/
      2 && t3_value !== (t3_value = /*$skillDoc*/
      ctx2[1].system.skillLabel ? `(${/*$skillDoc*/
      ctx2[1].system.skillLabel})` : ""))
        set_data(t3, t3_value);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$e($$self, $$props, $$invalidate) {
  let bonus;
  let $skillDoc;
  let { skill } = $$props;
  const skillDoc = new TJSDocument(skill);
  component_subscribe($$self, skillDoc, (value) => $$invalidate(1, $skillDoc = value));
  const click_handler = (event) => {
    $skillDoc.roll({ event, asSkill: true });
  };
  const click_handler_1 = () => {
    skill.sheet.render(true, { tab: "skills" });
  };
  $$self.$$set = ($$props2) => {
    if ("skill" in $$props2)
      $$invalidate(0, skill = $$props2.skill);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$skillDoc*/
    2) {
      $$invalidate(2, bonus = $skillDoc.system.skillBonus || 0);
    }
  };
  return [skill, $skillDoc, bonus, skillDoc, click_handler, click_handler_1];
}
class ActorEquipmentSkill extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$e, create_fragment$e, safe_not_equal, { skill: 0 });
  }
}
const ActorSkills_svelte_svelte_type_style_lang = "";
function get_each_context$4(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[11] = list[i][0];
  child_ctx[12] = list[i][1];
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[15] = list[i];
  return child_ctx;
}
function create_if_block_1$1(ctx) {
  let div1;
  let span;
  let t1;
  let div0;
  let input;
  let t2;
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      div1 = element("div");
      span = element("span");
      span.textContent = `${localize("LEOBREW.SkillAddTitle")}`;
      t1 = space();
      div0 = element("div");
      input = element("input");
      t2 = space();
      button = element("button");
      button.innerHTML = `<i class="fas fa-plus"></i>`;
      attr(span, "class", "skill-category-title modesto svelte-lbvtt-114zu1e");
      attr(input, "type", "text");
      attr(input, "class", "actor-skill-name-input svelte-lbvtt-114zu1e");
      attr(input, "placeholder", "Skill name");
      attr(button, "type", "button");
      attr(button, "class", "skill-add svelte-lbvtt-114zu1e");
      attr(div0, "class", "actor-skills-list-add-container svelte-lbvtt-114zu1e");
      attr(div1, "class", "actor-skills-list-add");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, span);
      append(div1, t1);
      append(div1, div0);
      append(div0, input);
      set_input_value(
        input,
        /*newSkillName*/
        ctx[1]
      );
      append(div0, t2);
      append(div0, button);
      if (!mounted) {
        dispose = [
          listen(
            input,
            "input",
            /*input_input_handler*/
            ctx[7]
          ),
          listen(
            input,
            "keydown",
            /*keydown_handler*/
            ctx[8]
          ),
          listen(
            button,
            "click",
            /*click_handler*/
            ctx[9]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*newSkillName*/
      2 && input.value !== /*newSkillName*/
      ctx2[1]) {
        set_input_value(
          input,
          /*newSkillName*/
          ctx2[1]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_else_block(ctx) {
  let actorequipmentskill;
  let current;
  actorequipmentskill = new ActorEquipmentSkill({ props: { skill: (
    /*skill*/
    ctx[15]
  ) } });
  return {
    c() {
      create_component(actorequipmentskill.$$.fragment);
    },
    m(target, anchor) {
      mount_component(actorequipmentskill, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const actorequipmentskill_changes = {};
      if (dirty & /*categorizedSkills*/
      4)
        actorequipmentskill_changes.skill = /*skill*/
        ctx2[15];
      actorequipmentskill.$set(actorequipmentskill_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(actorequipmentskill.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(actorequipmentskill.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(actorequipmentskill, detaching);
    }
  };
}
function create_if_block$2(ctx) {
  let actorskill;
  let current;
  actorskill = new ActorSkill({ props: { skill: (
    /*skill*/
    ctx[15]
  ) } });
  return {
    c() {
      create_component(actorskill.$$.fragment);
    },
    m(target, anchor) {
      mount_component(actorskill, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const actorskill_changes = {};
      if (dirty & /*categorizedSkills*/
      4)
        actorskill_changes.skill = /*skill*/
        ctx2[15];
      actorskill.$set(actorskill_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(actorskill.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(actorskill.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(actorskill, detaching);
    }
  };
}
function create_each_block_1(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block$2, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*skill*/
      ctx2[15].type === "skill"
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
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
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if_blocks[current_block_type_index].d(detaching);
    }
  };
}
function create_each_block$4(ctx) {
  let span;
  let t0_value = (
    /*category*/
    ctx[11] + ""
  );
  let t0;
  let t1;
  let each_1_anchor;
  let current;
  let each_value_1 = ensure_array_like(
    /*skills*/
    ctx[12]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      span = element("span");
      t0 = text(t0_value);
      t1 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
      attr(span, "class", "skill-category-title modesto svelte-lbvtt-114zu1e");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t0);
      insert(target, t1, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if ((!current || dirty & /*categorizedSkills*/
      4) && t0_value !== (t0_value = /*category*/
      ctx2[11] + ""))
        set_data(t0, t0_value);
      if (dirty & /*categorizedSkills*/
      4) {
        each_value_1 = ensure_array_like(
          /*skills*/
          ctx2[12]
        );
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block_1(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i = each_value_1.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value_1.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(span);
        detach(t1);
        detach(each_1_anchor);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_fragment$d(ctx) {
  let div2;
  let t0;
  let div1;
  let span;
  let t2;
  let div0;
  let label;
  let t4;
  let current;
  let mounted;
  let dispose;
  let if_block = (
    /*$appState*/
    ctx[3].levelingUp && create_if_block_1$1(ctx)
  );
  let each_value = ensure_array_like(
    /*categorizedSkills*/
    ctx[2]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      div2 = element("div");
      if (if_block)
        if_block.c();
      t0 = space();
      div1 = element("div");
      span = element("span");
      span.textContent = "Generic";
      t2 = space();
      div0 = element("div");
      label = element("label");
      label.textContent = "Naked D10 Roll";
      t4 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(span, "class", "skill-category-title modesto svelte-lbvtt-114zu1e");
      attr(label, "class", "skill-name clickable clickable-red");
      attr(div0, "class", "actor-skill");
      attr(div1, "class", "actor-skills-list svelte-lbvtt-114zu1e");
      attr(div2, "class", "actor-skills-list-container svelte-lbvtt-114zu1e");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      if (if_block)
        if_block.m(div2, null);
      append(div2, t0);
      append(div2, div1);
      append(div1, span);
      append(div1, t2);
      append(div1, div0);
      append(div0, label);
      append(div1, t4);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div1, null);
        }
      }
      current = true;
      if (!mounted) {
        dispose = listen(
          label,
          "click",
          /*click_handler_1*/
          ctx[10]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (
        /*$appState*/
        ctx2[3].levelingUp
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_1$1(ctx2);
          if_block.c();
          if_block.m(div2, t0);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty & /*categorizedSkills*/
      4) {
        each_value = ensure_array_like(
          /*categorizedSkills*/
          ctx2[2]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$4(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$4(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div1, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div2);
      }
      if (if_block)
        if_block.d();
      destroy_each(each_blocks, detaching);
      mounted = false;
      dispose();
    }
  };
}
function instance$d($$self, $$props, $$invalidate) {
  let categorizedSkills;
  let $doc;
  let $appState;
  const appState = getContext("ApplicationStateStore");
  component_subscribe($$self, appState, (value) => $$invalidate(3, $appState = value));
  const doc = getContext("DocumentStore");
  component_subscribe($$self, doc, (value) => $$invalidate(0, $doc = value));
  let newSkillName = "";
  function createNewSkill() {
    appState.addSkill(newSkillName);
    $$invalidate(1, newSkillName = "");
  }
  function input_input_handler() {
    newSkillName = this.value;
    $$invalidate(1, newSkillName);
  }
  const keydown_handler = (event) => {
    if (event.code !== "Enter")
      return;
    createNewSkill();
  };
  const click_handler = async () => createNewSkill();
  const click_handler_1 = (event) => {
    $doc.rollGeneric({ event });
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$doc*/
    1) {
      $$invalidate(2, categorizedSkills = Object.entries($doc.items.reduce(
        (acc, item) => {
          if (item.type === "skill") {
            if (!acc[item.system.category])
              acc[item.system.category] = [];
            acc[item.system.category].push(item);
            acc[item.system.category].sort((a, b) => {
              return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
            });
          } else if (item.type === "equipment" && item.system.addsSkill && item.system.equipped) {
            if (!acc["Equipment"])
              acc["Equipment"] = [];
            acc["Equipment"].push(item);
            acc["Equipment"].sort((a, b) => {
              return b.name > a.name ? -1 : 1;
            });
          }
          return acc;
        },
        {}
      )).sort((a, b) => {
        return b[0] > a[0] ? -1 : 1;
      }));
    }
  };
  return [
    $doc,
    newSkillName,
    categorizedSkills,
    $appState,
    appState,
    doc,
    createNewSkill,
    input_input_handler,
    keydown_handler,
    click_handler,
    click_handler_1
  ];
}
class ActorSkills extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$d, create_fragment$d, safe_not_equal, {});
  }
}
const Tabs_svelte_svelte_type_style_lang = "";
function get_each_context$3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[6] = list[i];
  child_ctx[8] = i;
  return child_ctx;
}
function create_if_block_2(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      set_style(div, "border-right", "1px solid rgba(0,0,0,0.5)");
      set_style(div, "margin", "0 10px");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_if_block_1(ctx) {
  let i;
  let i_class_value;
  return {
    c() {
      i = element("i");
      attr(i, "class", i_class_value = "icon " + /*tab*/
      ctx[6].icon + " svelte-lbvtt-1p9zve8");
    },
    m(target, anchor) {
      insert(target, i, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*tabs*/
      2 && i_class_value !== (i_class_value = "icon " + /*tab*/
      ctx2[6].icon + " svelte-lbvtt-1p9zve8")) {
        attr(i, "class", i_class_value);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(i);
      }
    }
  };
}
function create_if_block$1(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<i class="fas fa-exclamation"></i>`;
      attr(div, "class", "blob");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_each_block$3(key_1, ctx) {
  let first;
  let t0;
  let div;
  let t1;
  let t2_value = localize(
    /*tab*/
    ctx[6].label
  ) + "";
  let t2;
  let t3;
  let t4;
  let mounted;
  let dispose;
  let if_block0 = (
    /*separateElements*/
    ctx[3] && /*index*/
    ctx[8] > 0 && create_if_block_2()
  );
  let if_block1 = (
    /*tab*/
    ctx[6].icon && create_if_block_1(ctx)
  );
  let if_block2 = (
    /*tab*/
    ctx[6].highlight && create_if_block$1()
  );
  function click_handler() {
    return (
      /*click_handler*/
      ctx[5](
        /*tab*/
        ctx[6]
      )
    );
  }
  return {
    key: key_1,
    first: null,
    c() {
      first = empty();
      if (if_block0)
        if_block0.c();
      t0 = space();
      div = element("div");
      if (if_block1)
        if_block1.c();
      t1 = space();
      t2 = text(t2_value);
      t3 = space();
      if (if_block2)
        if_block2.c();
      t4 = space();
      attr(div, "class", "item clickable clickable-red svelte-lbvtt-1p9zve8");
      toggle_class(
        div,
        "underscore",
        /*underscore*/
        ctx[2]
      );
      toggle_class(
        div,
        "active",
        /*activeTab*/
        ctx[0] === /*tab*/
        ctx[6]
      );
      this.first = first;
    },
    m(target, anchor) {
      insert(target, first, anchor);
      if (if_block0)
        if_block0.m(target, anchor);
      insert(target, t0, anchor);
      insert(target, div, anchor);
      if (if_block1)
        if_block1.m(div, null);
      append(div, t1);
      append(div, t2);
      append(div, t3);
      if (if_block2)
        if_block2.m(div, null);
      append(div, t4);
      if (!mounted) {
        dispose = listen(div, "click", click_handler);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (
        /*separateElements*/
        ctx[3] && /*index*/
        ctx[8] > 0
      ) {
        if (if_block0)
          ;
        else {
          if_block0 = create_if_block_2();
          if_block0.c();
          if_block0.m(t0.parentNode, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (
        /*tab*/
        ctx[6].icon
      ) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_1(ctx);
          if_block1.c();
          if_block1.m(div, t1);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (dirty & /*tabs*/
      2 && t2_value !== (t2_value = localize(
        /*tab*/
        ctx[6].label
      ) + ""))
        set_data(t2, t2_value);
      if (
        /*tab*/
        ctx[6].highlight
      ) {
        if (if_block2)
          ;
        else {
          if_block2 = create_if_block$1();
          if_block2.c();
          if_block2.m(div, t4);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
      if (dirty & /*underscore*/
      4) {
        toggle_class(
          div,
          "underscore",
          /*underscore*/
          ctx[2]
        );
      }
      if (dirty & /*activeTab, tabs*/
      3) {
        toggle_class(
          div,
          "active",
          /*activeTab*/
          ctx[0] === /*tab*/
          ctx[6]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(first);
        detach(t0);
        detach(div);
      }
      if (if_block0)
        if_block0.d(detaching);
      if (if_block1)
        if_block1.d();
      if (if_block2)
        if_block2.d();
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$c(ctx) {
  let nav;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let nav_style_value;
  let each_value = ensure_array_like(
    /*tabs*/
    ctx[1].filter(func)
  );
  const get_key = (ctx2) => (
    /*tab*/
    ctx2[6].value
  );
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context$3(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block$3(key, child_ctx));
  }
  return {
    c() {
      nav = element("nav");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(nav, "class", "tabs modesto svelte-lbvtt-1p9zve8");
      attr(nav, "data-group", "primary");
      attr(nav, "style", nav_style_value = /*$$props*/
      ctx[4].style);
    },
    m(target, anchor) {
      insert(target, nav, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(nav, null);
        }
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*underscore, activeTab, tabs, separateElements*/
      15) {
        each_value = ensure_array_like(
          /*tabs*/
          ctx2[1].filter(func)
        );
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, nav, destroy_block, create_each_block$3, null, get_each_context$3);
      }
      if (dirty & /*$$props*/
      16 && nav_style_value !== (nav_style_value = /*$$props*/
      ctx2[4].style)) {
        attr(nav, "style", nav_style_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(nav);
      }
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
    }
  };
}
const func = (tab) => !tab.hidden;
function instance$c($$self, $$props, $$invalidate) {
  let { activeTab } = $$props;
  let { tabs } = $$props;
  let { underscore = false } = $$props;
  let { separateElements = false } = $$props;
  const click_handler = (tab) => {
    $$invalidate(0, activeTab = tab);
  };
  $$self.$$set = ($$new_props) => {
    $$invalidate(4, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("activeTab" in $$new_props)
      $$invalidate(0, activeTab = $$new_props.activeTab);
    if ("tabs" in $$new_props)
      $$invalidate(1, tabs = $$new_props.tabs);
    if ("underscore" in $$new_props)
      $$invalidate(2, underscore = $$new_props.underscore);
    if ("separateElements" in $$new_props)
      $$invalidate(3, separateElements = $$new_props.separateElements);
  };
  $$props = exclude_internal_props($$props);
  return [activeTab, tabs, underscore, separateElements, $$props, click_handler];
}
class Tabs extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$c, create_fragment$c, safe_not_equal, {
      activeTab: 0,
      tabs: 1,
      underscore: 2,
      separateElements: 3
    });
  }
}
const ActorMainBody_svelte_svelte_type_style_lang = "";
function create_fragment$b(ctx) {
  let div1;
  let actorskills;
  let t0;
  let div0;
  let tabs;
  let updating_activeTab;
  let t1;
  let switch_instance;
  let current;
  actorskills = new ActorSkills({});
  function tabs_activeTab_binding(value) {
    ctx[2](value);
  }
  let tabs_props = {
    tabs: (
      /*$appState*/
      ctx[0].tabs
    ),
    underscore: true
  };
  if (
    /*$appState*/
    ctx[0].activeTab !== void 0
  ) {
    tabs_props.activeTab = /*$appState*/
    ctx[0].activeTab;
  }
  tabs = new Tabs({ props: tabs_props });
  binding_callbacks.push(() => bind(tabs, "activeTab", tabs_activeTab_binding));
  var switch_value = (
    /*$appState*/
    ctx[0].activeTab.component
  );
  function switch_props(ctx2, dirty) {
    return {};
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props());
  }
  return {
    c() {
      div1 = element("div");
      create_component(actorskills.$$.fragment);
      t0 = space();
      div0 = element("div");
      create_component(tabs.$$.fragment);
      t1 = space();
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      attr(div0, "class", "actor-center-section svelte-lbvtt-yj2n7u");
      attr(div1, "class", "actor-main-body svelte-lbvtt-yj2n7u");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      mount_component(actorskills, div1, null);
      append(div1, t0);
      append(div1, div0);
      mount_component(tabs, div0, null);
      append(div0, t1);
      if (switch_instance)
        mount_component(switch_instance, div0, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const tabs_changes = {};
      if (dirty & /*$appState*/
      1)
        tabs_changes.tabs = /*$appState*/
        ctx2[0].tabs;
      if (!updating_activeTab && dirty & /*$appState*/
      1) {
        updating_activeTab = true;
        tabs_changes.activeTab = /*$appState*/
        ctx2[0].activeTab;
        add_flush_callback(() => updating_activeTab = false);
      }
      tabs.$set(tabs_changes);
      if (dirty & /*$appState*/
      1 && switch_value !== (switch_value = /*$appState*/
      ctx2[0].activeTab.component)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props());
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, div0, null);
        } else {
          switch_instance = null;
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(actorskills.$$.fragment, local);
      transition_in(tabs.$$.fragment, local);
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(actorskills.$$.fragment, local);
      transition_out(tabs.$$.fragment, local);
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      destroy_component(actorskills);
      destroy_component(tabs);
      if (switch_instance)
        destroy_component(switch_instance);
    }
  };
}
function instance$b($$self, $$props, $$invalidate) {
  let $appState;
  const appState = getContext("ApplicationStateStore");
  component_subscribe($$self, appState, (value) => $$invalidate(0, $appState = value));
  function tabs_activeTab_binding(value) {
    if ($$self.$$.not_equal($appState.activeTab, value)) {
      $appState.activeTab = value;
      appState.set($appState);
    }
  }
  return [$appState, appState, tabs_activeTab_binding];
}
class ActorMainBody extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$b, create_fragment$b, safe_not_equal, {});
  }
}
const actorShell_svelte_svelte_type_style_lang = "";
function create_default_slot$2(ctx) {
  let div;
  let actortopbar;
  let t;
  let actormainbody;
  let current;
  actortopbar = new ActorTopBar({});
  actormainbody = new ActorMainBody({});
  return {
    c() {
      div = element("div");
      create_component(actortopbar.$$.fragment);
      t = space();
      create_component(actormainbody.$$.fragment);
      attr(div, "class", "actor-sheet svelte-lbvtt-mlq4tq");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(actortopbar, div, null);
      append(div, t);
      mount_component(actormainbody, div, null);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(actortopbar.$$.fragment, local);
      transition_in(actormainbody.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(actortopbar.$$.fragment, local);
      transition_out(actormainbody.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(actortopbar);
      destroy_component(actormainbody);
    }
  };
}
function create_fragment$a(ctx) {
  let applicationshell;
  let updating_elementRoot;
  let current;
  function applicationshell_elementRoot_binding(value) {
    ctx[3](value);
  }
  let applicationshell_props = {
    $$slots: { default: [create_default_slot$2] },
    $$scope: { ctx }
  };
  if (
    /*elementRoot*/
    ctx[0] !== void 0
  ) {
    applicationshell_props.elementRoot = /*elementRoot*/
    ctx[0];
  }
  applicationshell = new ApplicationShell$1({ props: applicationshell_props });
  binding_callbacks.push(() => bind(applicationshell, "elementRoot", applicationshell_elementRoot_binding));
  return {
    c() {
      create_component(applicationshell.$$.fragment);
    },
    m(target, anchor) {
      mount_component(applicationshell, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const applicationshell_changes = {};
      if (dirty & /*$$scope*/
      16) {
        applicationshell_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_elementRoot && dirty & /*elementRoot*/
      1) {
        updating_elementRoot = true;
        applicationshell_changes.elementRoot = /*elementRoot*/
        ctx2[0];
        add_flush_callback(() => updating_elementRoot = false);
      }
      applicationshell.$set(applicationshell_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(applicationshell.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(applicationshell.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(applicationshell, detaching);
    }
  };
}
function instance$a($$self, $$props, $$invalidate) {
  let { elementRoot } = $$props;
  let { documentStore } = $$props;
  let { applicationStateStore } = $$props;
  setContext("DocumentStore", documentStore);
  setContext("ApplicationStateStore", applicationStateStore);
  function applicationshell_elementRoot_binding(value) {
    elementRoot = value;
    $$invalidate(0, elementRoot);
  }
  $$self.$$set = ($$props2) => {
    if ("elementRoot" in $$props2)
      $$invalidate(0, elementRoot = $$props2.elementRoot);
    if ("documentStore" in $$props2)
      $$invalidate(1, documentStore = $$props2.documentStore);
    if ("applicationStateStore" in $$props2)
      $$invalidate(2, applicationStateStore = $$props2.applicationStateStore);
  };
  return [
    elementRoot,
    documentStore,
    applicationStateStore,
    applicationshell_elementRoot_binding
  ];
}
class Actor_shell extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$a, create_fragment$a, safe_not_equal, {
      elementRoot: 0,
      documentStore: 1,
      applicationStateStore: 2
    });
  }
  get elementRoot() {
    return this.$$.ctx[0];
  }
  set elementRoot(elementRoot) {
    this.$$set({ elementRoot });
    flush();
  }
  get documentStore() {
    return this.$$.ctx[1];
  }
  set documentStore(documentStore) {
    this.$$set({ documentStore });
    flush();
  }
  get applicationStateStore() {
    return this.$$.ctx[2];
  }
  set applicationStateStore(applicationStateStore) {
    this.$$set({ applicationStateStore });
    flush();
  }
}
class LeobrewActorSheet extends SvelteDocumentSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 600,
      height: 640,
      svelte: {
        class: Actor_shell,
        target: document.body
      }
    });
  }
  constructor(object, options = {}) {
    super(object, options);
    this.reactive.state = createActorSheetState(object);
  }
  _getHeaderButtons() {
    const buttons = super._getHeaderButtons();
    if (game.user.isGM || this.reactive.doc.isOwner && game.user.can("TOKEN_CONFIGURE")) {
      buttons.unshift({
        label: this.token ? "Token" : "TOKEN.TitlePrototype",
        class: "configure-token",
        icon: "fas fa-user-circle",
        onclick: (ev) => this._onConfigureToken(ev)
      });
    }
    return buttons;
  }
}
class DocumentSheetHelper {
  static async createDialog(data = {}, options = {}) {
    const documentName = this.metadata.name;
    const folders = game.folders.filter((f) => f.data.type === documentName && f.displayed);
    const label = game.i18n.localize(this.metadata.label);
    const title = game.i18n.format("DOCUMENT.Create", { type: label });
    const collection = game.collections.get(this.documentName);
    const templates = collection.filter((a) => a.getFlag("leobrew", "isTemplate"));
    const types = {};
    for (const type of this.metadata.types) {
      types[type] = type;
    }
    for (let a of templates) {
      types[a.id] = a.name;
    }
    const html = await renderTemplate(`templates/sidebar/document-create.html`, {
      name: data.name || game.i18n.format("DOCUMENT.New", { type: label }),
      folder: data.folder,
      folders,
      hasFolders: folders.length > 1,
      type: this.metadata.types[0],
      types,
      hasTypes: true
    });
    return Dialog.prompt({
      title,
      content: html,
      label: title,
      callback: (html2) => {
        const form = html2[0].querySelector("form");
        const fd = new FormDataExtended(form);
        let createData = fd.toObject();
        const template = collection.get(form.type.value);
        if (template) {
          createData = foundry.utils.mergeObject(template.toObject(), createData);
          createData.type = template.data.type;
          delete createData.flags.leobrew.isTemplate;
        }
        createData = foundry.utils.mergeObject(createData, data);
        return this.create(createData, { renderSheet: true });
      },
      rejectClose: false,
      options
    });
  }
}
async function d10Roll({
  parts = [],
  data = {},
  // Roll creation
  title = "",
  flavor,
  messageData = {},
  situationalBonus = false
} = {}) {
  if (situationalBonus) {
    parts.push(situationalBonus);
  }
  const formula = ["1d10"].concat(parts).join(" + ");
  const roll = new Roll(formula, data);
  await roll.evaluate({ async: true });
  const dice = roll.dice[0];
  const fumbleCritical = dice.total === 1 || dice.total === 10;
  messageData = foundry.utils.mergeObject({
    user: game.user.id,
    type: CONST.CHAT_MESSAGE_TYPES.ROLL,
    flavor: flavor || title,
    sound: CONFIG.sounds.dice,
    confirmedCritical: false,
    confirmedFumble: false,
    confirmedNatural: false,
    weaponSkill: false,
    hitLocation: false,
    natural: !fumbleCritical,
    totalCriticalConfirms: 0,
    roll
  }, messageData);
  let rollToRound = roll;
  const previousRollData = messageData?.flags?.leobrew?.roll;
  if (previousRollData?.confirmAction) {
    messageData.natural = false;
    messageData.confirmedCritical = previousRollData?.confirmAction === "confirm-critical" && dice.total <= 3;
    messageData.confirmedFumble = previousRollData?.confirmAction === "confirm-fumble" && dice.total <= 3;
    messageData.confirmedNatural = !(messageData.confirmedCritical || messageData.confirmedFumble) && dice.total > 3 && dice.total !== 10;
    const originalMessage = game.messages.get(previousRollData.originalMessageId);
    if (previousRollData?.confirmAction !== "confirm-fumble") {
      const [originalRoll] = originalMessage.rolls;
      rollToRound = originalRoll;
    }
    messageData.totalCriticalConfirms = originalMessage.getFlag("leobrew", "roll").totalCriticalConfirms ?? 0;
  }
  if (previousRollData?.isAttack && !fumbleCritical) {
    messageData.weaponSkill = true;
    if (rollToRound.total >= 15) {
      messageData.hitLocation = "Instant Kill";
    } else if (rollToRound.total === 11) {
      messageData.hitLocation = "Roll d10 to see if hit is to chest or leg<br>Below 5 leg - 5 reroll - Above 5 chest";
    } else {
      messageData.hitLocation = {
        "9": "Hits Arm",
        "10": "Hits Leg",
        "12": "Hits Chest",
        "13": "Hits Guts",
        "14": "Hits Head"
      }[rollToRound.total] ?? "No hit";
    }
  }
  messageData.roundedRoll = roundDownRoll(rollToRound.total);
  messageData.content = await renderTemplate("systems/leobrew/templates/chat/roll-card.html", messageData);
  await ChatMessage.create(messageData);
  return roll;
}
class LeobrewActor extends Actor {
  get skills() {
    return this.items.filter((item) => item.type === "skill");
  }
  get magicSkills() {
    return this.skills.filter((skill) => skill.system.isMagic);
  }
  get regularItems() {
    return this.items.filter((item) => item.type === "equipment");
  }
  get equippedItems() {
    return this.regularItems.filter((item) => item.system.equipped);
  }
  get armorBonuses() {
    const items = this.equippedItems;
    return Object.entries(CONFIG.LEOBREW.bodyParts).map((entry) => {
      return {
        label: entry[1],
        value: items.map((item) => item.getArmorBonus(entry[0])).reduce((acc, bonus) => {
          return acc + bonus;
        }, 0)
      };
    });
  }
  get equipmentSkills() {
    return this.equippedItems.filter((item) => item.system.addsSkill);
  }
  // Prepare Player type specific data
  prepareDerivedData() {
    super.prepareDerivedData();
    this._prepareDerivedResources();
    this.items.forEach((item) => item.prepareDerivedBonuses());
  }
  _prepareDerivedResources() {
    for (let [r, res] of Object.entries(this.system.resources)) {
      res.enabled = true;
      res.max += res.bonus;
    }
    this.system.resources.mana.enabled = game.settings.get("leobrew", "manaEnabled");
    this.system.resources.sanity.enabled = game.settings.get("leobrew", "sanityEnabled");
    const mana = this.system.resources.mana;
    mana.max = 5;
    mana.max += this.system.abilities.will.value;
    mana.max += mana.bonus;
    mana.max += this.magicSkills.reduce((max, skill) => {
      return skill.system.level >= 5 && skill.system.level * 3 > max ? skill.system.level * 3 : max;
    }, 0);
  }
  /* -------------------------------------------- */
  /** @override */
  static async createDialog(data = {}, options = {}) {
    return DocumentSheetHelper.createDialog.call(this, data, options);
  }
  /* -------------------------------------------- */
  async addInjury(bodypart, injury) {
    let key = `data.injuries.${bodypart}.value`;
    return await this.update({ [key]: injury });
  }
  /* -------------------------------------------- */
  async rollGeneric(options = {}) {
    let title = game.i18n.format("LEOBREW.GenericSkillRollTitle");
    if (options?.event?.ctrlKey) {
      options.situationalBonus = await promptSituationalBonus(title);
    }
    if (options?.extraFlavor) {
      title = `${title} (${options?.extraFlavor})`;
    }
    const rollData = foundry.utils.mergeObject(options, {
      title,
      data: options.data,
      messageData: {
        speaker: options.speaker || ChatMessage.getSpeaker({ actor: this }),
        "flags.leobrew.roll": {
          type: "generic",
          actorUuid: this.uuid,
          extraFlavor: options?.extraFlavor ?? ""
        }
      }
    });
    return d10Roll(rollData);
  }
  /**
   * Roll an Ability Test
   * Prompt the user for input regarding Advantage/Disadvantage and any Situational Bonus
   * @param {String} abilityId    The ability ID (e.g. "str")
   * @param {Object} options      Options which configure how ability tests are rolled
   * @return {Promise<d10Roll>}      A Promise which resolves to the created Roll instance
   */
  async rollAbility(abilityId, options = {}) {
    let label = CONFIG.LEOBREW.abilities[abilityId];
    const abl = this.system.abilities[abilityId];
    const parts = ["@value"];
    const data = { value: abl.value, bonus: options?.bonus ?? 0 };
    if (data.bonus) {
      parts.push("@bonus");
    }
    if (options.parts?.length > 0) {
      parts.push(...options.parts);
    }
    if (options?.extraTitle) {
      label += ` (${options?.extraTitle})`;
    }
    if (options?.event?.ctrlKey) {
      options.situationalBonus = await promptSituationalBonus(label);
    }
    let title = game.i18n.format("LEOBREW.AbilityRollTitle", { name: label });
    if (options?.extraFlavor) {
      title = `${title} (${options?.extraFlavor})`;
    }
    const rollData = foundry.utils.mergeObject(options, {
      parts,
      data,
      title,
      messageData: {
        speaker: options.speaker || ChatMessage.getSpeaker({ actor: this }),
        "flags.leobrew.roll": {
          abilityId,
          type: "ability",
          rollData: `data.abilities.${abilityId}`,
          actorUuid: this.uuid,
          extraFlavor: options?.extraFlavor ?? ""
        }
      }
    });
    return d10Roll(rollData);
  }
}
class LeobrewItem extends Item {
  derived = {
    bonus: 0,
    subSkills: []
  };
  /** @type {ActorStores} */
  stores;
  constructor(...args) {
    super(...args);
    this.setupStores();
  }
  setupStores() {
    if (this.stores)
      return;
    const derivedWritable = writable(this.derived);
    this.stores = {
      bonus: propertyStore(derivedWritable, "bonus"),
      subSkills: propertyStore(derivedWritable, "subSkills")
    };
  }
  get bonus() {
    this.setupStores();
    return this.derived.bonus;
  }
  set bonus(newValue) {
    this.setupStores();
    this.stores.bonus.set(newValue);
  }
  get subSkills() {
    this.setupStores();
    return this.derived.subSkills;
  }
  set subSkills(newValue) {
    this.setupStores();
    this.stores.subSkills.set(newValue);
  }
  prepareDerivedBonuses() {
    this.setupStores();
    if (!this.parent)
      return;
    if (this.type === "skill") {
      this.bonus = this.getBonus();
      this.subSkills = this.getSubSkills();
    } else if (this.type === "equipment") {
      this.getTiedSkills().forEach((skill) => {
        skill.prepareDerivedData();
      });
    }
  }
  getTiedSkills() {
    return Object.keys(this.system.tiedSkills ?? {}).map((id) => this.parent.items.get(id)).filter(Boolean);
  }
  getBonus(subSkillName) {
    return this.parent.equipmentSkills.filter((item) => item.system.tiedSkills[this.id]).reduce((totalBonus, item) => {
      const tiedSkillConfig = item.system.tiedSkills[this.id];
      tiedSkillConfig.filter((tiedSkill) => {
        if (subSkillName) {
          return subSkillName === tiedSkill.name || !tiedSkill.isSubSkill;
        }
        return !tiedSkill.isSubSkill;
      }).forEach((tiedSkill) => {
        if (tiedSkill.bonus) {
          totalBonus += tiedSkill.bonus || 0;
        }
      });
      return totalBonus;
    }, 0);
  }
  getSubSkills() {
    return this.parent.equipmentSkills.filter((item) => item.system.tiedSkills[this.id] && item.system.tiedSkills[this.id].some((tiedSkill) => {
      return tiedSkill.isSubSkill;
    })).map((item) => {
      return item.system.tiedSkills[this.id].filter((tiedSkill) => tiedSkill.isSubSkill);
    }).deepFlatten().map((subSkill) => foundry.utils.deepClone(subSkill)).map((subSkill) => {
      subSkill.bonus += this.system.level + (this.bonus || 0);
      return subSkill;
    }).sort((a, b) => a.name > b.name);
  }
  getArmorBonus(bodyPart) {
    const bonus = this.system.armorBonuses?.[bodyPart];
    return this.system.equipped && bonus ? bonus : 0;
  }
  /**
   * @param {Object} options            Options which configure how ability tests are rolled
   * @return {Promise<d10Roll>|Boolean} A Promise which resolves to the created Roll instance
   */
  roll(options = {}) {
    if (!this.parent) {
      throw new Error("Cannot roll unowned items!");
    }
    if (this.type === "skill") {
      return this.#rollSkill(options);
    } else if (this.type === "trait") {
      return this.#useTrait(options);
    } else if (this.type === "equipment") {
      if (this.type === "equipment" && options.asSkill) {
        return this.#rollEquipment(options);
      }
      return this.#useEquipment(options);
    }
    return false;
  }
  async #rollSkill(options = {}) {
    const parts = ["@value"];
    const data = {
      value: this.system.level,
      bonus: this.getBonus(options?.subSkill?.name)
    };
    if (data.bonus) {
      parts.push("@bonus");
    }
    if (options.parts?.length > 0) {
      parts.push(...options.parts);
    }
    let name = this.name;
    if (options?.event?.ctrlKey) {
      options.situationalBonus = await promptSituationalBonus(name);
    }
    if (options?.extraTitle) {
      name += ` (${options?.extraTitle})`;
    }
    let title = game.i18n.format("LEOBREW.SkillRollTitle", { category: this.system.category, name });
    if (options?.extraFlavor) {
      title += ` (${options?.extraFlavor})`;
    }
    const rollData = foundry.utils.mergeObject(options, {
      parts,
      data,
      title,
      messageData: {
        speaker: options.speaker || ChatMessage.getSpeaker({ actor: this.parent }),
        "flags.leobrew.roll": {
          type: "skill",
          source: this.uuid,
          extraTitle: options?.extraTitle ?? "",
          isAttack: options?.isAttack ?? null
        }
      }
    });
    return d10Roll(rollData);
  }
  async #useTrait(options = {}) {
    const uses = this.system.uses;
    if (uses.max > 0) {
      if (uses.value <= 0) {
        ui.notifications.error(`You can't use the "${this.name}" trait - it has no uses left!`);
        return false;
      }
      await this.update({
        "system.uses.value": uses.value - 1
      });
    }
    return this.#showDescription(options);
  }
  async #rollEquipment(options = {}) {
    const parts = ["@value"];
    const data = {
      value: this.system.skillBonus
    };
    if (data.bonus) {
      parts.push("@bonus");
    }
    if (options.parts?.length > 0) {
      parts.push(...options.parts);
    }
    let name = this.name;
    if (options?.event?.ctrlKey) {
      options.situationalBonus = await promptSituationalBonus(name);
    }
    if (this.system.skillLabel) {
      name += ` (${this.system.skillLabel})`;
    }
    let title = game.i18n.format("LEOBREW.SkillRollTitle", { category: "Equipment", name });
    if (options?.extraFlavor) {
      title += ` (${options?.extraFlavor})`;
    }
    const rollData = foundry.utils.mergeObject(options, {
      parts,
      data,
      title,
      messageData: {
        speaker: options.speaker || ChatMessage.getSpeaker({ actor: this.parent }),
        "flags.leobrew.roll": {
          type: "skill",
          source: this.uuid,
          extraTitle: options?.extraTitle ?? "",
          asSkill: true
        }
      }
    });
    return d10Roll(rollData);
  }
  async #useEquipment(options = {}) {
    if (this.system.usesQuantity) {
      if (this.system.quantity <= 0) {
        ui.notifications.error(`You can't use the "${this.name}" item - it has no quantity left!`);
        return false;
      }
      await this.update({
        "system.quantity": this.system.quantity - 1
      });
    }
    return this.#showDescription(options);
  }
  async #showDescription({ rollMode, createMessage = true } = {}) {
    const templateData = {
      actor: this.parent,
      item: this
    };
    const html = await renderTemplate("systems/leobrew/templates/chat/item-card.html", templateData);
    const chatData = {
      user: game.userId,
      type: CONST.CHAT_MESSAGE_TYPES.OTHER,
      content: html,
      speaker: ChatMessage.getSpeaker({ actor: this.parent })
    };
    ChatMessage.applyRollMode(chatData, rollMode || game.settings.get("core", "rollMode"));
    return createMessage ? ChatMessage.create(chatData) : chatData;
  }
}
const ItemHeader_svelte_svelte_type_style_lang = "";
function create_fragment$9(ctx) {
  let header;
  let documentimage;
  let t;
  let input;
  let current;
  let mounted;
  let dispose;
  documentimage = new DocumentImage({
    props: { class: "item-image", doc: (
      /*doc*/
      ctx[0]
    ) }
  });
  return {
    c() {
      header = element("header");
      create_component(documentimage.$$.fragment);
      t = space();
      input = element("input");
      attr(input, "type", "text");
      attr(input, "placeholder", localize(`LEOBREW.${/*capType*/
      ctx[1]}Name`));
      attr(input, "class", "svelte-lbvtt-2k0lwb");
      attr(header, "class", "sheet-header svelte-lbvtt-2k0lwb");
    },
    m(target, anchor) {
      insert(target, header, anchor);
      mount_component(documentimage, header, null);
      append(header, t);
      append(header, input);
      current = true;
      if (!mounted) {
        dispose = action_destroyer(updateDoc.call(null, input, { doc: (
          /*doc*/
          ctx[0]
        ), accessor: "name" }));
        mounted = true;
      }
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(documentimage.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(documentimage.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(header);
      }
      destroy_component(documentimage);
      mounted = false;
      dispose();
    }
  };
}
function instance$9($$self, $$props, $$invalidate) {
  let $doc;
  const doc = getContext("DocumentStore");
  component_subscribe($$self, doc, (value) => $$invalidate(2, $doc = value));
  const capType = capitalizeFirstLetter($doc.type);
  return [doc, capType];
}
class ItemHeader extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$9, create_fragment$9, safe_not_equal, {});
  }
}
const Description_svelte_svelte_type_style_lang = "";
function create_fragment$8(ctx) {
  let div;
  let tjsprosemirror;
  let updating_content;
  let current;
  function tjsprosemirror_content_binding(value) {
    ctx[3](value);
  }
  let tjsprosemirror_props = {
    options: { editable: true, secrets: game.user.isGM }
  };
  if (
    /*content*/
    ctx[0] !== void 0
  ) {
    tjsprosemirror_props.content = /*content*/
    ctx[0];
  }
  tjsprosemirror = new TJSProseMirror({ props: tjsprosemirror_props });
  binding_callbacks.push(() => bind(tjsprosemirror, "content", tjsprosemirror_content_binding));
  return {
    c() {
      div = element("div");
      create_component(tjsprosemirror.$$.fragment);
      attr(div, "class", "description-container svelte-lbvtt-i87dh7");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(tjsprosemirror, div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const tjsprosemirror_changes = {};
      if (!updating_content && dirty & /*content*/
      1) {
        updating_content = true;
        tjsprosemirror_changes.content = /*content*/
        ctx2[0];
        add_flush_callback(() => updating_content = false);
      }
      tjsprosemirror.$set(tjsprosemirror_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(tjsprosemirror.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(tjsprosemirror.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(tjsprosemirror);
    }
  };
}
function instance$8($$self, $$props, $$invalidate) {
  let $doc;
  const doc = getContext("DocumentStore");
  component_subscribe($$self, doc, (value) => $$invalidate(2, $doc = value));
  let content = $doc.system.description.value;
  function tjsprosemirror_content_binding(value) {
    content = value;
    $$invalidate(0, content);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$doc, content*/
    5) {
      {
        $doc.update({ "system.description.value": content });
      }
    }
  };
  return [content, doc, $doc, tjsprosemirror_content_binding];
}
class Description extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$8, create_fragment$8, safe_not_equal, {});
  }
}
function get_each_context$2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[2] = list[i];
  return child_ctx;
}
function create_each_block$2(ctx) {
  let tr;
  let td0;
  let span;
  let t0_value = (
    /*bodyPart*/
    ctx[2].label + ""
  );
  let t0;
  let t1;
  let td1;
  let input;
  let updateDoc_action;
  let t2;
  let mounted;
  let dispose;
  return {
    c() {
      tr = element("tr");
      td0 = element("td");
      span = element("span");
      t0 = text(t0_value);
      t1 = space();
      td1 = element("td");
      input = element("input");
      t2 = space();
      attr(td0, "class", "flexcol");
      attr(input, "type", "number");
    },
    m(target, anchor) {
      insert(target, tr, anchor);
      append(tr, td0);
      append(td0, span);
      append(span, t0);
      append(tr, t1);
      append(tr, td1);
      append(td1, input);
      append(tr, t2);
      if (!mounted) {
        dispose = action_destroyer(updateDoc_action = updateDoc.call(null, input, {
          doc: (
            /*doc*/
            ctx[1]
          ),
          accessor: `system.armorBonuses.${/*bodyPart*/
          ctx[2].key}`
        }));
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*armorBonuses*/
      1 && t0_value !== (t0_value = /*bodyPart*/
      ctx[2].label + ""))
        set_data(t0, t0_value);
      if (updateDoc_action && is_function(updateDoc_action.update) && dirty & /*armorBonuses*/
      1)
        updateDoc_action.update.call(null, {
          doc: (
            /*doc*/
            ctx[1]
          ),
          accessor: `system.armorBonuses.${/*bodyPart*/
          ctx[2].key}`
        });
    },
    d(detaching) {
      if (detaching) {
        detach(tr);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$7(ctx) {
  let div;
  let h2;
  let t1;
  let table;
  let thead;
  let t5;
  let tbody;
  let each_value = ensure_array_like(
    /*armorBonuses*/
    ctx[0]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
  }
  return {
    c() {
      div = element("div");
      h2 = element("h2");
      h2.textContent = "Armor Bonuses:";
      t1 = space();
      table = element("table");
      thead = element("thead");
      thead.innerHTML = `<tr><th>Body Part</th> <th>Armor Bonus</th></tr>`;
      t5 = space();
      tbody = element("tbody");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      set_style(div, "flex", "1");
      set_style(div, "margin-right", "5px");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, h2);
      append(div, t1);
      append(div, table);
      append(table, thead);
      append(table, t5);
      append(table, tbody);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(tbody, null);
        }
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*doc, armorBonuses*/
      3) {
        each_value = ensure_array_like(
          /*armorBonuses*/
          ctx2[0]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$2(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$2(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(tbody, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function instance$7($$self, $$props, $$invalidate) {
  let armorBonuses;
  const doc = getContext("DocumentStore");
  $$invalidate(0, armorBonuses = Object.entries(CONFIG.LEOBREW.bodyParts).map(([bodyPart]) => {
    return {
      label: CONFIG.LEOBREW.bodyParts[bodyPart],
      key: bodyPart
    };
  }));
  return [armorBonuses, doc];
}
class ArmorBonuses extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$7, create_fragment$7, safe_not_equal, {});
  }
}
const SkillBonus_svelte_svelte_type_style_lang = "";
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[13] = list[i];
  child_ctx[14] = list;
  child_ctx[15] = i;
  return child_ctx;
}
function create_each_block$1(ctx) {
  let input0;
  let t0;
  let input1;
  let t1;
  let input2;
  let t2;
  let i;
  let mounted;
  let dispose;
  function input0_change_handler() {
    ctx[8].call(
      input0,
      /*each_value*/
      ctx[14],
      /*index*/
      ctx[15]
    );
  }
  function input1_input_handler() {
    ctx[9].call(
      input1,
      /*each_value*/
      ctx[14],
      /*index*/
      ctx[15]
    );
  }
  function input2_input_handler() {
    ctx[10].call(
      input2,
      /*each_value*/
      ctx[14],
      /*index*/
      ctx[15]
    );
  }
  function click_handler() {
    return (
      /*click_handler*/
      ctx[11](
        /*index*/
        ctx[15]
      )
    );
  }
  return {
    c() {
      input0 = element("input");
      t0 = space();
      input1 = element("input");
      t1 = space();
      input2 = element("input");
      t2 = space();
      i = element("i");
      attr(input0, "type", "checkbox");
      attr(input0, "class", "svelte-lbvtt-1oqy63m");
      attr(input1, "type", "text");
      attr(input1, "class", "name svelte-lbvtt-1oqy63m");
      attr(input2, "type", "number");
      attr(input2, "class", "svelte-lbvtt-1oqy63m");
      attr(i, "class", "fas fa-times clickable clickable-red svelte-lbvtt-1oqy63m");
    },
    m(target, anchor) {
      insert(target, input0, anchor);
      input0.checked = /*tiedSkill*/
      ctx[13].isSubSkill;
      insert(target, t0, anchor);
      insert(target, input1, anchor);
      set_input_value(
        input1,
        /*tiedSkill*/
        ctx[13].name
      );
      insert(target, t1, anchor);
      insert(target, input2, anchor);
      set_input_value(
        input2,
        /*tiedSkill*/
        ctx[13].bonus
      );
      insert(target, t2, anchor);
      insert(target, i, anchor);
      if (!mounted) {
        dispose = [
          listen(input0, "change", input0_change_handler),
          listen(
            input0,
            "change",
            /*updateTiedSkills*/
            ctx[4]
          ),
          listen(input1, "input", input1_input_handler),
          listen(
            input1,
            "change",
            /*updateTiedSkills*/
            ctx[4]
          ),
          listen(input2, "input", input2_input_handler),
          listen(
            input2,
            "change",
            /*updateTiedSkills*/
            ctx[4]
          ),
          listen(i, "click", click_handler)
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*tiedSkills*/
      1) {
        input0.checked = /*tiedSkill*/
        ctx[13].isSubSkill;
      }
      if (dirty & /*tiedSkills*/
      1 && input1.value !== /*tiedSkill*/
      ctx[13].name) {
        set_input_value(
          input1,
          /*tiedSkill*/
          ctx[13].name
        );
      }
      if (dirty & /*tiedSkills*/
      1 && to_number(input2.value) !== /*tiedSkill*/
      ctx[13].bonus) {
        set_input_value(
          input2,
          /*tiedSkill*/
          ctx[13].bonus
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(input0);
        detach(t0);
        detach(input1);
        detach(t1);
        detach(input2);
        detach(t2);
        detach(i);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment$6(ctx) {
  let h3;
  let i0;
  let t0;
  let span0;
  let t1_value = (
    /*$skill*/
    ctx[2].name + ""
  );
  let t1;
  let t2;
  let i1;
  let t3;
  let div;
  let span1;
  let t5;
  let span2;
  let t7;
  let span3;
  let t9;
  let span4;
  let t10;
  let mounted;
  let dispose;
  let each_value = ensure_array_like(
    /*tiedSkills*/
    ctx[0]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }
  return {
    c() {
      h3 = element("h3");
      i0 = element("i");
      t0 = space();
      span0 = element("span");
      t1 = text(t1_value);
      t2 = space();
      i1 = element("i");
      t3 = space();
      div = element("div");
      span1 = element("span");
      span1.textContent = "Subskill";
      t5 = space();
      span2 = element("span");
      span2.textContent = "Name";
      t7 = space();
      span3 = element("span");
      span3.textContent = "Bonus";
      t9 = space();
      span4 = element("span");
      t10 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(i0, "class", "fas fa-times clickable clickable-red svelte-lbvtt-1oqy63m");
      attr(span0, "class", "svelte-lbvtt-1oqy63m");
      attr(i1, "class", "fas fa-plus clickable clickable-green svelte-lbvtt-1oqy63m");
      attr(h3, "class", "svelte-lbvtt-1oqy63m");
      attr(span1, "class", "svelte-lbvtt-1oqy63m");
      attr(span2, "class", "name svelte-lbvtt-1oqy63m");
      attr(span3, "class", "svelte-lbvtt-1oqy63m");
      attr(span4, "class", "svelte-lbvtt-1oqy63m");
      attr(div, "class", "tied-skills svelte-lbvtt-1oqy63m");
    },
    m(target, anchor) {
      insert(target, h3, anchor);
      append(h3, i0);
      append(h3, t0);
      append(h3, span0);
      append(span0, t1);
      append(h3, t2);
      append(h3, i1);
      insert(target, t3, anchor);
      insert(target, div, anchor);
      append(div, span1);
      append(div, t5);
      append(div, span2);
      append(div, t7);
      append(div, span3);
      append(div, t9);
      append(div, span4);
      append(div, t10);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div, null);
        }
      }
      if (!mounted) {
        dispose = [
          listen(
            i0,
            "click",
            /*deleteTiedSkill*/
            ctx[5]
          ),
          listen(
            i1,
            "click",
            /*addTiedSkill*/
            ctx[6]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*$skill*/
      4 && t1_value !== (t1_value = /*$skill*/
      ctx2[2].name + ""))
        set_data(t1, t1_value);
      if (dirty & /*removeTiedSkill, tiedSkills, updateTiedSkills*/
      145) {
        each_value = ensure_array_like(
          /*tiedSkills*/
          ctx2[0]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$1(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$1(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(h3);
        detach(t3);
        detach(div);
      }
      destroy_each(each_blocks, detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$6($$self, $$props, $$invalidate) {
  let $skill, $$unsubscribe_skill = noop, $$subscribe_skill = () => ($$unsubscribe_skill(), $$unsubscribe_skill = subscribe(skill, ($$value) => $$invalidate(2, $skill = $$value)), skill);
  let $doc;
  $$self.$$.on_destroy.push(() => $$unsubscribe_skill());
  const doc = getContext("DocumentStore");
  component_subscribe($$self, doc, (value) => $$invalidate(12, $doc = value));
  let { skill } = $$props;
  $$subscribe_skill();
  let { tiedSkills } = $$props;
  function updateTiedSkills() {
    $doc.update({
      [`system.tiedSkills.${$skill.id}`]: tiedSkills
    });
  }
  function deleteTiedSkill() {
    $doc.update({
      [`system.tiedSkills.-=${$skill.id}`]: null
    });
  }
  function addTiedSkill() {
    tiedSkills.push({
      name: "New Skill",
      bonus: 0,
      isSubSkill: false
    });
    updateTiedSkills();
  }
  function removeTiedSkill(index) {
    tiedSkills.splice(index, 1);
    updateTiedSkills();
  }
  function input0_change_handler(each_value, index) {
    each_value[index].isSubSkill = this.checked;
    $$invalidate(0, tiedSkills);
  }
  function input1_input_handler(each_value, index) {
    each_value[index].name = this.value;
    $$invalidate(0, tiedSkills);
  }
  function input2_input_handler(each_value, index) {
    each_value[index].bonus = to_number(this.value);
    $$invalidate(0, tiedSkills);
  }
  const click_handler = (index) => {
    removeTiedSkill(index);
  };
  $$self.$$set = ($$props2) => {
    if ("skill" in $$props2)
      $$subscribe_skill($$invalidate(1, skill = $$props2.skill));
    if ("tiedSkills" in $$props2)
      $$invalidate(0, tiedSkills = $$props2.tiedSkills);
  };
  return [
    tiedSkills,
    skill,
    $skill,
    doc,
    updateTiedSkills,
    deleteTiedSkill,
    addTiedSkill,
    removeTiedSkill,
    input0_change_handler,
    input1_input_handler,
    input2_input_handler,
    click_handler
  ];
}
class SkillBonus extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$6, safe_not_equal, { skill: 1, tiedSkills: 0 });
  }
}
function create_fragment$5(ctx) {
  let div;
  let div_style_value;
  let current;
  let mounted;
  let dispose;
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
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      attr(div, "style", div_style_value = /*$$props*/
      ctx[4].style);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            div,
            "dragenter",
            /*enter*/
            ctx[2]
          ),
          listen(
            div,
            "dragleave",
            /*leave*/
            ctx[3]
          ),
          listen(div, "dragover", function() {
            if (is_function(
              /*overCallback*/
              ctx[0]
            ))
              ctx[0].apply(this, arguments);
          }),
          listen(div, "dragstart", prevent_default(
            /*dragstart_handler*/
            ctx[13]
          )),
          listen(div, "drop", prevent_default(
            /*dropData*/
            ctx[1]
          ))
        ];
        mounted = true;
      }
    },
    p(new_ctx, [dirty]) {
      ctx = new_ctx;
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        2048)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx,
            /*$$scope*/
            ctx[11],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx[11]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx[11],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (!current || dirty & /*$$props*/
      16 && div_style_value !== (div_style_value = /*$$props*/
      ctx[4].style)) {
        attr(div, "style", div_style_value);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { callback } = $$props;
  let { isHovering } = $$props;
  let { active: active2 = true } = $$props;
  let { enterCallback = () => {
  } } = $$props;
  let { overCallback = () => {
  } } = $$props;
  let { leaveCallback = () => {
  } } = $$props;
  function dropData(event, ...args) {
    if (!active2)
      return;
    $$invalidate(10, counter = 0);
    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData("text/plain"));
    } catch (err) {
      return false;
    }
    callback(data, event, ...args);
  }
  let counter = 0;
  function enter(event) {
    if (!active2)
      return;
    $$invalidate(10, counter++, counter);
    if (counter === 1) {
      enterCallback(event);
    }
  }
  function leave(event) {
    if (!active2)
      return;
    $$invalidate(10, counter--, counter);
    if (counter === 0) {
      leaveCallback(event);
    }
  }
  function dragstart_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$new_props) => {
    $$invalidate(4, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("callback" in $$new_props)
      $$invalidate(6, callback = $$new_props.callback);
    if ("isHovering" in $$new_props)
      $$invalidate(5, isHovering = $$new_props.isHovering);
    if ("active" in $$new_props)
      $$invalidate(7, active2 = $$new_props.active);
    if ("enterCallback" in $$new_props)
      $$invalidate(8, enterCallback = $$new_props.enterCallback);
    if ("overCallback" in $$new_props)
      $$invalidate(0, overCallback = $$new_props.overCallback);
    if ("leaveCallback" in $$new_props)
      $$invalidate(9, leaveCallback = $$new_props.leaveCallback);
    if ("$$scope" in $$new_props)
      $$invalidate(11, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*counter*/
    1024) {
      $$invalidate(5, isHovering = counter > 0);
    }
  };
  $$props = exclude_internal_props($$props);
  return [
    overCallback,
    dropData,
    enter,
    leave,
    $$props,
    isHovering,
    callback,
    active2,
    enterCallback,
    leaveCallback,
    counter,
    $$scope,
    slots,
    dragstart_handler
  ];
}
class DropZone extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$5, safe_not_equal, {
      callback: 6,
      isHovering: 5,
      active: 7,
      enterCallback: 8,
      overCallback: 0,
      leaveCallback: 9
    });
  }
}
const SkillBonuses_svelte_svelte_type_style_lang = "";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[5] = list[i][0];
  child_ctx[6] = list[i][1];
  return child_ctx;
}
function create_each_block(ctx) {
  let skillbonus;
  let current;
  skillbonus = new SkillBonus({
    props: {
      skill: (
        /*skills*/
        ctx[1][
          /*skillUuid*/
          ctx[5]
        ]
      ),
      tiedSkills: (
        /*tiedSkills*/
        ctx[6]
      )
    }
  });
  return {
    c() {
      create_component(skillbonus.$$.fragment);
    },
    m(target, anchor) {
      mount_component(skillbonus, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const skillbonus_changes = {};
      if (dirty & /*skills, validTiedSkills*/
      3)
        skillbonus_changes.skill = /*skills*/
        ctx2[1][
          /*skillUuid*/
          ctx2[5]
        ];
      if (dirty & /*validTiedSkills*/
      1)
        skillbonus_changes.tiedSkills = /*tiedSkills*/
        ctx2[6];
      skillbonus.$set(skillbonus_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(skillbonus.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(skillbonus.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(skillbonus, detaching);
    }
  };
}
function create_if_block(ctx) {
  let dropzone;
  let current;
  dropzone = new DropZone({
    props: {
      callback: (
        /*test*/
        ctx[3]
      ),
      $$slots: { default: [create_default_slot$1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(dropzone.$$.fragment);
    },
    m(target, anchor) {
      mount_component(dropzone, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const dropzone_changes = {};
      if (dirty & /*$$scope*/
      512) {
        dropzone_changes.$$scope = { dirty, ctx: ctx2 };
      }
      dropzone.$set(dropzone_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(dropzone.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(dropzone.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(dropzone, detaching);
    }
  };
}
function create_default_slot$1(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.textContent = "Drag and drop skills to add a bonus to that skill";
      set_style(div, "text-align", "center");
      set_style(div, "font-style", "italic");
      set_style(div, "padding", "10px");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_fragment$4(ctx) {
  let div3;
  let div0;
  let t1;
  let div1;
  let t3;
  let div2;
  let t5;
  let input0;
  let t6;
  let input1;
  let t7;
  let input2;
  let t8;
  let hr;
  let t9;
  let t10;
  let if_block_anchor;
  let current;
  let mounted;
  let dispose;
  let each_value = ensure_array_like(
    /*validTiedSkills*/
    ctx[0]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  let if_block = !/*validTiedSkills*/
  ctx[0].length && create_if_block(ctx);
  return {
    c() {
      div3 = element("div");
      div0 = element("div");
      div0.innerHTML = `<span>Is Skill</span>`;
      t1 = space();
      div1 = element("div");
      div1.innerHTML = `<span>Label</span>`;
      t3 = space();
      div2 = element("div");
      div2.innerHTML = `<span>Bonus</span>`;
      t5 = space();
      input0 = element("input");
      t6 = space();
      input1 = element("input");
      t7 = space();
      input2 = element("input");
      t8 = space();
      hr = element("hr");
      t9 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t10 = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
      attr(input0, "type", "checkbox");
      attr(input1, "type", "text");
      attr(input2, "type", "number");
      attr(div3, "class", "add-as-skill svelte-lbvtt-65n6nj");
    },
    m(target, anchor) {
      insert(target, div3, anchor);
      append(div3, div0);
      append(div3, t1);
      append(div3, div1);
      append(div3, t3);
      append(div3, div2);
      append(div3, t5);
      append(div3, input0);
      append(div3, t6);
      append(div3, input1);
      append(div3, t7);
      append(div3, input2);
      insert(target, t8, anchor);
      insert(target, hr, anchor);
      insert(target, t9, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert(target, t10, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(updateDoc.call(null, input0, {
            doc: (
              /*doc*/
              ctx[2]
            ),
            accessor: "system.addsSkill"
          })),
          action_destroyer(updateDoc.call(null, input1, {
            doc: (
              /*doc*/
              ctx[2]
            ),
            accessor: "system.skillLabel"
          })),
          action_destroyer(updateDoc.call(null, input2, {
            doc: (
              /*doc*/
              ctx[2]
            ),
            accessor: "system.skillBonus"
          }))
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*skills, validTiedSkills*/
      3) {
        each_value = ensure_array_like(
          /*validTiedSkills*/
          ctx2[0]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(t10.parentNode, t10);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      if (!/*validTiedSkills*/
      ctx2[0].length) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*validTiedSkills*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block(ctx2);
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
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      transition_in(if_block);
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div3);
        detach(t8);
        detach(hr);
        detach(t9);
        detach(t10);
        detach(if_block_anchor);
      }
      destroy_each(each_blocks, detaching);
      if (if_block)
        if_block.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  let validTiedSkills;
  let skills;
  let $doc;
  const doc = getContext("DocumentStore");
  component_subscribe($$self, doc, (value) => $$invalidate(4, $doc = value));
  async function test(data) {
    if (!data.uuid)
      return;
    const droppedDocument = fromUuidSync(data.uuid);
    if (droppedDocument.type !== "skill")
      return;
    const currentTiedSkills = $doc.system.tiedSkills;
    if (!currentTiedSkills[droppedDocument.id]?.length) {
      currentTiedSkills[droppedDocument.id] = [];
    }
    currentTiedSkills[droppedDocument.id].push({
      name: "New Skill",
      bonus: 0,
      isSubSkill: false,
      isWeaponSkill: false
    });
    await $doc.update({ "system.tiedSkills": currentTiedSkills });
    await droppedDocument.update({ "system.tiedEquipment": $doc.id });
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$doc*/
    16) {
      $$invalidate(0, validTiedSkills = Object.entries($doc.system.tiedSkills).filter(([skillId]) => $doc.parent.items.get(skillId)));
    }
    if ($$self.$$.dirty & /*validTiedSkills, $doc*/
    17) {
      $$invalidate(1, skills = Object.fromEntries(validTiedSkills.map(([skillId]) => [skillId, new TJSDocument($doc.parent.items.get(skillId))])));
    }
  };
  return [validTiedSkills, skills, doc, test, $doc];
}
class SkillBonuses extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, {});
  }
}
const equipmentShell_svelte_svelte_type_style_lang = "";
function create_fragment$3(ctx) {
  let div9;
  let div7;
  let div0;
  let label0;
  let t1;
  let input0;
  let t2;
  let div1;
  let label1;
  let t4;
  let input1;
  let t5;
  let div2;
  let label2;
  let t7;
  let input2;
  let t8;
  let div3;
  let label3;
  let t10;
  let input3;
  let t11;
  let div4;
  let label4;
  let t13;
  let input4;
  let t14;
  let div5;
  let t16;
  let div6;
  let label6;
  let t18;
  let label7;
  let t20;
  let label8;
  let t22;
  let input5;
  let t23;
  let input6;
  let t24;
  let input7;
  let t25;
  let div8;
  let tabs_1;
  let updating_activeTab;
  let t26;
  let switch_instance;
  let current;
  let mounted;
  let dispose;
  function tabs_1_activeTab_binding(value) {
    ctx[3](value);
  }
  let tabs_1_props = { tabs: (
    /*tabs*/
    ctx[2]
  ), underscore: true };
  if (
    /*activeTab*/
    ctx[0] !== void 0
  ) {
    tabs_1_props.activeTab = /*activeTab*/
    ctx[0];
  }
  tabs_1 = new Tabs({ props: tabs_1_props });
  binding_callbacks.push(() => bind(tabs_1, "activeTab", tabs_1_activeTab_binding));
  var switch_value = (
    /*activeTab*/
    ctx[0].component
  );
  function switch_props(ctx2, dirty) {
    return {};
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props());
  }
  return {
    c() {
      div9 = element("div");
      div7 = element("div");
      div0 = element("div");
      label0 = element("label");
      label0.textContent = "Equipped";
      t1 = space();
      input0 = element("input");
      t2 = space();
      div1 = element("div");
      label1 = element("label");
      label1.textContent = "Quantity";
      t4 = space();
      input1 = element("input");
      t5 = space();
      div2 = element("div");
      label2 = element("label");
      label2.textContent = "Uses Up Quantity";
      t7 = space();
      input2 = element("input");
      t8 = space();
      div3 = element("div");
      label3 = element("label");
      label3.textContent = "Category";
      t10 = space();
      input3 = element("input");
      t11 = space();
      div4 = element("div");
      label4 = element("label");
      label4.textContent = "Weight";
      t13 = space();
      input4 = element("input");
      t14 = space();
      div5 = element("div");
      div5.innerHTML = `<label>Price</label>`;
      t16 = space();
      div6 = element("div");
      label6 = element("label");
      label6.textContent = "Gold";
      t18 = space();
      label7 = element("label");
      label7.textContent = "Silver";
      t20 = space();
      label8 = element("label");
      label8.textContent = "Copper";
      t22 = space();
      input5 = element("input");
      t23 = space();
      input6 = element("input");
      t24 = space();
      input7 = element("input");
      t25 = space();
      div8 = element("div");
      create_component(tabs_1.$$.fragment);
      t26 = space();
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      attr(input0, "type", "checkbox");
      attr(div0, "class", "form-control");
      attr(input1, "type", "number");
      attr(div1, "class", "form-control");
      attr(input2, "type", "checkbox");
      attr(div2, "class", "form-control");
      attr(input3, "type", "text");
      attr(div3, "class", "form-control");
      attr(input4, "type", "text");
      attr(div4, "class", "form-control");
      attr(div5, "class", "form-control");
      attr(input5, "type", "number");
      attr(input6, "type", "number");
      attr(input7, "type", "number");
      set_style(div6, "display", "grid");
      set_style(div6, "grid-template-columns", "1fr 1fr 1fr");
      attr(div7, "class", "item-properties-sidebar");
      attr(div8, "class", "item-tab-container svelte-lbvtt-1fygq9m");
      attr(div9, "class", "item-container");
    },
    m(target, anchor) {
      insert(target, div9, anchor);
      append(div9, div7);
      append(div7, div0);
      append(div0, label0);
      append(div0, t1);
      append(div0, input0);
      append(div7, t2);
      append(div7, div1);
      append(div1, label1);
      append(div1, t4);
      append(div1, input1);
      append(div7, t5);
      append(div7, div2);
      append(div2, label2);
      append(div2, t7);
      append(div2, input2);
      append(div7, t8);
      append(div7, div3);
      append(div3, label3);
      append(div3, t10);
      append(div3, input3);
      append(div7, t11);
      append(div7, div4);
      append(div4, label4);
      append(div4, t13);
      append(div4, input4);
      append(div7, t14);
      append(div7, div5);
      append(div7, t16);
      append(div7, div6);
      append(div6, label6);
      append(div6, t18);
      append(div6, label7);
      append(div6, t20);
      append(div6, label8);
      append(div6, t22);
      append(div6, input5);
      append(div6, t23);
      append(div6, input6);
      append(div6, t24);
      append(div6, input7);
      append(div9, t25);
      append(div9, div8);
      mount_component(tabs_1, div8, null);
      append(div8, t26);
      if (switch_instance)
        mount_component(switch_instance, div8, null);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(updateDoc.call(null, input0, {
            doc: (
              /*doc*/
              ctx[1]
            ),
            accessor: "system.equipped"
          })),
          action_destroyer(updateDoc.call(null, input1, {
            doc: (
              /*doc*/
              ctx[1]
            ),
            accessor: "system.quantity"
          })),
          action_destroyer(updateDoc.call(null, input2, {
            doc: (
              /*doc*/
              ctx[1]
            ),
            accessor: "system.usesQuantity"
          })),
          action_destroyer(updateDoc.call(null, input3, {
            doc: (
              /*doc*/
              ctx[1]
            ),
            accessor: "system.category"
          })),
          action_destroyer(updateDoc.call(null, input4, {
            doc: (
              /*doc*/
              ctx[1]
            ),
            accessor: "system.weight"
          })),
          action_destroyer(updateDoc.call(null, input5, {
            doc: (
              /*doc*/
              ctx[1]
            ),
            accessor: "system.price.gp"
          })),
          action_destroyer(updateDoc.call(null, input6, {
            doc: (
              /*doc*/
              ctx[1]
            ),
            accessor: "system.price.sp"
          })),
          action_destroyer(updateDoc.call(null, input7, {
            doc: (
              /*doc*/
              ctx[1]
            ),
            accessor: "system.price.cp"
          }))
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      const tabs_1_changes = {};
      if (!updating_activeTab && dirty & /*activeTab*/
      1) {
        updating_activeTab = true;
        tabs_1_changes.activeTab = /*activeTab*/
        ctx2[0];
        add_flush_callback(() => updating_activeTab = false);
      }
      tabs_1.$set(tabs_1_changes);
      if (dirty & /*activeTab*/
      1 && switch_value !== (switch_value = /*activeTab*/
      ctx2[0].component)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props());
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, div8, null);
        } else {
          switch_instance = null;
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(tabs_1.$$.fragment, local);
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(tabs_1.$$.fragment, local);
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div9);
      }
      destroy_component(tabs_1);
      if (switch_instance)
        destroy_component(switch_instance);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  getContext("#external");
  const doc = getContext("DocumentStore");
  const tabs = [
    {
      value: "description",
      label: "Description",
      component: Description
    },
    {
      value: "armorBonuses",
      label: "Armor Bonuses",
      component: ArmorBonuses
    },
    {
      value: "skillBonuses",
      label: "Skill Bonuses",
      component: SkillBonuses
    }
  ];
  let activeTab = tabs[0];
  function tabs_1_activeTab_binding(value) {
    activeTab = value;
    $$invalidate(0, activeTab);
  }
  return [activeTab, doc, tabs, tabs_1_activeTab_binding];
}
class Equipment_shell extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, {});
  }
}
function create_fragment$2(ctx) {
  let div2;
  let div0;
  let span0;
  let t1;
  let input0;
  let t2;
  let div1;
  let span1;
  let t4;
  let input1;
  let mounted;
  let dispose;
  return {
    c() {
      div2 = element("div");
      div0 = element("div");
      span0 = element("span");
      span0.textContent = "Category";
      t1 = space();
      input0 = element("input");
      t2 = space();
      div1 = element("div");
      span1 = element("span");
      span1.textContent = "Magic Skill";
      t4 = space();
      input1 = element("input");
      attr(input0, "type", "text");
      attr(div0, "class", "form-control");
      attr(input1, "type", "checkbox");
      attr(div1, "class", "form-control");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, div0);
      append(div0, span0);
      append(div0, t1);
      append(div0, input0);
      append(div2, t2);
      append(div2, div1);
      append(div1, span1);
      append(div1, t4);
      append(div1, input1);
      if (!mounted) {
        dispose = [
          action_destroyer(updateDoc.call(null, input0, {
            doc: (
              /*doc*/
              ctx[0]
            ),
            accessor: "system.category"
          })),
          action_destroyer(updateDoc.call(null, input1, {
            doc: (
              /*doc*/
              ctx[0]
            ),
            accessor: "system.isMagic"
          }))
        ];
        mounted = true;
      }
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div2);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$2($$self) {
  const doc = getContext("DocumentStore");
  return [doc];
}
class Skill_shell extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, {});
  }
}
const traitShell_svelte_svelte_type_style_lang = "";
function create_fragment$1(ctx) {
  let div1;
  let div0;
  let tjsprosemirror;
  let updating_content;
  let current;
  function tjsprosemirror_content_binding(value) {
    ctx[3](value);
  }
  let tjsprosemirror_props = {
    options: { editable: true, secrets: game.user.isGM }
  };
  if (
    /*content*/
    ctx[0] !== void 0
  ) {
    tjsprosemirror_props.content = /*content*/
    ctx[0];
  }
  tjsprosemirror = new TJSProseMirror({ props: tjsprosemirror_props });
  binding_callbacks.push(() => bind(tjsprosemirror, "content", tjsprosemirror_content_binding));
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      create_component(tjsprosemirror.$$.fragment);
      attr(div0, "class", "description-container svelte-lbvtt-oa78o4");
      attr(div1, "class", "item-container");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      mount_component(tjsprosemirror, div0, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const tjsprosemirror_changes = {};
      if (!updating_content && dirty & /*content*/
      1) {
        updating_content = true;
        tjsprosemirror_changes.content = /*content*/
        ctx2[0];
        add_flush_callback(() => updating_content = false);
      }
      tjsprosemirror.$set(tjsprosemirror_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(tjsprosemirror.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(tjsprosemirror.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      destroy_component(tjsprosemirror);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let $doc;
  const doc = getContext("DocumentStore");
  component_subscribe($$self, doc, (value) => $$invalidate(2, $doc = value));
  let content = $doc.system.description.value;
  function tjsprosemirror_content_binding(value) {
    content = value;
    $$invalidate(0, content);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$doc, content*/
    5) {
      {
        $doc.update({ "system.description.value": content });
      }
    }
  };
  return [content, doc, $doc, tjsprosemirror_content_binding];
}
class Trait_shell extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {});
  }
}
const itemShell_svelte_svelte_type_style_lang = "";
function create_default_slot(ctx) {
  let div;
  let itemheader;
  let t;
  let switch_instance;
  let current;
  itemheader = new ItemHeader({});
  var switch_value = (
    /*component*/
    ctx[2]
  );
  function switch_props(ctx2, dirty) {
    return {};
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props());
  }
  return {
    c() {
      div = element("div");
      create_component(itemheader.$$.fragment);
      t = space();
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      attr(div, "class", "item-sheet svelte-lbvtt-ewc64o");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(itemheader, div, null);
      append(div, t);
      if (switch_instance)
        mount_component(switch_instance, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & /*component*/
      4 && switch_value !== (switch_value = /*component*/
      ctx2[2])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props());
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, div, null);
        } else {
          switch_instance = null;
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(itemheader.$$.fragment, local);
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(itemheader.$$.fragment, local);
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(itemheader);
      if (switch_instance)
        destroy_component(switch_instance);
    }
  };
}
function create_fragment(ctx) {
  let applicationshell;
  let updating_elementRoot;
  let current;
  function applicationshell_elementRoot_binding(value) {
    ctx[5](value);
  }
  let applicationshell_props = {
    $$slots: { default: [create_default_slot] },
    $$scope: { ctx }
  };
  if (
    /*elementRoot*/
    ctx[0] !== void 0
  ) {
    applicationshell_props.elementRoot = /*elementRoot*/
    ctx[0];
  }
  applicationshell = new ApplicationShell$1({ props: applicationshell_props });
  binding_callbacks.push(() => bind(applicationshell, "elementRoot", applicationshell_elementRoot_binding));
  return {
    c() {
      create_component(applicationshell.$$.fragment);
    },
    m(target, anchor) {
      mount_component(applicationshell, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const applicationshell_changes = {};
      if (dirty & /*$$scope, component*/
      68) {
        applicationshell_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_elementRoot && dirty & /*elementRoot*/
      1) {
        updating_elementRoot = true;
        applicationshell_changes.elementRoot = /*elementRoot*/
        ctx2[0];
        add_flush_callback(() => updating_elementRoot = false);
      }
      applicationshell.$set(applicationshell_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(applicationshell.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(applicationshell.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(applicationshell, detaching);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let $documentStore, $$unsubscribe_documentStore = noop, $$subscribe_documentStore = () => ($$unsubscribe_documentStore(), $$unsubscribe_documentStore = subscribe(documentStore, ($$value) => $$invalidate(4, $documentStore = $$value)), documentStore);
  $$self.$$.on_destroy.push(() => $$unsubscribe_documentStore());
  let { elementRoot } = $$props;
  let { documentStore } = $$props;
  $$subscribe_documentStore();
  let { applicationStateStore } = $$props;
  setContext("DocumentStore", documentStore);
  setContext("ApplicationStateStore", applicationStateStore);
  let component;
  function applicationshell_elementRoot_binding(value) {
    elementRoot = value;
    $$invalidate(0, elementRoot);
  }
  $$self.$$set = ($$props2) => {
    if ("elementRoot" in $$props2)
      $$invalidate(0, elementRoot = $$props2.elementRoot);
    if ("documentStore" in $$props2)
      $$subscribe_documentStore($$invalidate(1, documentStore = $$props2.documentStore));
    if ("applicationStateStore" in $$props2)
      $$invalidate(3, applicationStateStore = $$props2.applicationStateStore);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$documentStore*/
    16) {
      {
        switch ($documentStore.type) {
          case "equipment":
            $$invalidate(2, component = Equipment_shell);
            break;
          case "skill":
            $$invalidate(2, component = Skill_shell);
            break;
          case "trait":
            $$invalidate(2, component = Trait_shell);
            break;
        }
      }
    }
  };
  return [
    elementRoot,
    documentStore,
    component,
    applicationStateStore,
    $documentStore,
    applicationshell_elementRoot_binding
  ];
}
class Item_shell extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      elementRoot: 0,
      documentStore: 1,
      applicationStateStore: 3
    });
  }
  get elementRoot() {
    return this.$$.ctx[0];
  }
  set elementRoot(elementRoot) {
    this.$$set({ elementRoot });
    flush();
  }
  get documentStore() {
    return this.$$.ctx[1];
  }
  set documentStore(documentStore) {
    this.$$set({ documentStore });
    flush();
  }
  get applicationStateStore() {
    return this.$$.ctx[3];
  }
  set applicationStateStore(applicationStateStore) {
    this.$$set({ applicationStateStore });
    flush();
  }
}
function createItemSheetState(item) {
  const { set: set2, update: update2, subscribe: subscribe2 } = writable({
    item
  });
  const addSkill = async (skill) => {
    update2((val) => {
      val.activeTab = val.tabs[2];
      return val;
    });
  };
  return {
    set: set2,
    update: update2,
    subscribe: subscribe2,
    addSkill
  };
}
class LeobrewItemSheet extends SvelteDocumentSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 500,
      height: 400,
      svelte: {
        class: Item_shell,
        target: document.body
      }
    });
  }
  async _onDrop(event) {
    const doc = this.reactive.doc;
    if (!doc.isOwner || !doc.type !== "equipment") {
      return false;
    }
    const data = TextEditor.getDragEventData(event);
    const skill = await Item.implementation.fromDropData(data);
    const skillData = skill.toObject();
    return this.#addSkill(skillData);
  }
  async #addSkill(skill) {
    const tiedSkills = foundry.utils.deepClone(this.system.tiedSkills[skill._id]) ?? [];
    tiedSkills.push({
      name: "New Skill",
      bonus: 0,
      isSubSkill: false,
      isWeaponSkill: false
    });
    return this.update({
      [`system.tiedSkills.${skill._id}`]: tiedSkills
    });
  }
  constructor(doc, options) {
    super(doc, options);
    this.reactive.state = createItemSheetState(doc);
  }
}
class ActorDataModel extends foundry.abstract.DataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      biography: new fields.SchemaField({
        value: new fields.HTMLField()
      }),
      description: new fields.ObjectField({
        nullable: true,
        value: new fields.HTMLField({
          nullable: true
        })
      }),
      skills: new fields.ObjectField({ nullable: true }),
      abilities: new fields.SchemaField({
        str: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            initial: 1,
            integer: true
          })
        }),
        dex: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            initial: 1,
            integer: true
          })
        }),
        con: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            initial: 1,
            integer: true
          })
        }),
        will: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            initial: 1,
            integer: true
          })
        }),
        int: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            initial: 1,
            integer: true
          })
        }),
        app: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            initial: 1,
            integer: true
          })
        })
      }),
      resources: new fields.SchemaField({
        luck: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true
          }),
          max: new fields.NumberField({
            required: true,
            initial: 3,
            integer: true
          }),
          bonus: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true
          })
        }),
        mana: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true
          }),
          max: new fields.NumberField({
            required: true,
            initial: 4,
            integer: true
          }),
          bonus: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true
          })
        }),
        sanity: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true
          }),
          max: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true
          }),
          bonus: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true
          })
        })
      }),
      experience: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          initial: 0,
          integer: true
        }),
        spent: new fields.NumberField({
          required: true,
          initial: 0,
          integer: true
        }),
        initialized: new fields.BooleanField({
          required: true,
          initial: false
        })
      }),
      injuries: new fields.SchemaField({
        chest: new fields.SchemaField({
          value: new fields.StringField({
            required: true,
            initial: ""
          })
        }),
        legs: new fields.SchemaField({
          value: new fields.StringField({
            required: true,
            initial: ""
          })
        }),
        guts: new fields.SchemaField({
          value: new fields.StringField({
            required: true,
            initial: ""
          })
        }),
        arms: new fields.SchemaField({
          value: new fields.StringField({
            required: true,
            initial: ""
          })
        }),
        head: new fields.SchemaField({
          value: new fields.StringField({
            required: true,
            initial: ""
          })
        })
      }),
      currencies: new fields.SchemaField({
        gp: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true
          }),
          bank: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true
          })
        }),
        sp: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true
          }),
          bank: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true
          })
        }),
        cp: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true
          }),
          bank: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true
          })
        })
      }),
      currency: new fields.ObjectField({
        nullable: true,
        gp: new fields.NumberField({
          nullable: true,
          initial: 0,
          integer: true
        }),
        sp: new fields.NumberField({
          nullable: true,
          initial: 0,
          integer: true
        }),
        cp: new fields.NumberField({
          nullable: true,
          initial: 0,
          integer: true
        })
      })
    };
  }
}
class EquipmentDataModel extends foundry.abstract.DataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      description: new fields.SchemaField({
        value: new fields.HTMLField()
      }),
      equipped: new fields.BooleanField({
        required: true,
        initial: true
      }),
      usesQuantity: new fields.BooleanField({
        required: true,
        initial: false
      }),
      quantity: new fields.NumberField({
        required: true,
        initial: 1,
        integer: true
      }),
      addsSkill: new fields.BooleanField({
        required: true,
        initial: false
      }),
      skillLabel: new fields.StringField({
        required: true,
        initial: "Generic"
      }),
      skillBonus: new fields.NumberField({
        required: true,
        initial: 0,
        integer: true
      }),
      tiedSkills: new fields.ObjectField(),
      weight: new fields.StringField({
        required: true,
        initial: ""
      }),
      price: new fields.SchemaField({
        gp: new fields.NumberField({
          required: true,
          initial: 0,
          integer: true
        }),
        sp: new fields.NumberField({
          required: true,
          initial: 0,
          integer: true
        }),
        cp: new fields.NumberField({
          required: true,
          initial: 0,
          integer: true
        })
      })
    };
  }
}
class SkillDataModel extends foundry.abstract.DataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      level: new fields.NumberField({
        required: true,
        initial: 1,
        integer: true
      }),
      startingLevel: new fields.NumberField({
        required: true,
        initial: 1,
        integer: true
      }),
      isMagic: new fields.BooleanField({
        required: true,
        initial: false
      }),
      category: new fields.StringField({
        required: true,
        initial: "Generic"
      })
    };
  }
}
class TraitDataModel extends foundry.abstract.DataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      description: new fields.SchemaField({
        value: new fields.HTMLField()
      }),
      uses: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          initial: 1,
          integer: true
        }),
        max: new fields.NumberField({
          required: true,
          initial: 1,
          integer: true
        }),
        per: new fields.StringField({
          initial: "Day"
        })
      })
    };
  }
}
function setupSystem() {
  registerConstants();
  registerSheets();
  registerSettings();
}
function registerConstants() {
  CONFIG.Combat.initiative = {
    formula: "1d10",
    decimals: 2
  };
  CONFIG.LEOBREW = LEOBREW;
}
function registerSheets() {
  game.leobrew = {
    LeobrewActor,
    LeobrewItem
  };
  CONFIG.Actor.documentClass = LeobrewActor;
  CONFIG.Actor.dataModels.character = ActorDataModel;
  CONFIG.Item.documentClass = LeobrewItem;
  CONFIG.Item.dataModels.equipment = EquipmentDataModel;
  CONFIG.Item.dataModels.skill = SkillDataModel;
  CONFIG.Item.dataModels.trait = TraitDataModel;
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("leobrew", LeobrewActorSheet, { makeDefault: true, types: ["character"] });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("leobrew", LeobrewItemSheet, { makeDefault: true, types: ["equipment", "trait", "skill"] });
}
function setupLocalization() {
  const toLocalize = ["currencies", "abilities", "abilityAbbreviations", "resources", "bodyParts"];
  const noSort = ["abilities", "currencies"];
  for (let o of toLocalize) {
    const localized = Object.entries(CONFIG.LEOBREW[o]).map((e) => {
      return [e[0], game.i18n.localize(e[1])];
    });
    if (!noSort.includes(o))
      localized.sort((a, b) => a[1].localeCompare(b[1]));
    CONFIG.LEOBREW[o] = localized.reduce((obj, e) => {
      obj[e[0]] = e[1];
      return obj;
    }, {});
  }
}
function registerSettings() {
  game.settings.register("leobrew", "darkModeSheets", {
    name: "Use dark mode sheets",
    hint: "Enabling this will make the sheets a beautiful dark tone.",
    scope: "client",
    config: true,
    default: false,
    type: Boolean
  });
  game.settings.register("leobrew", "skillList", {
    scope: "world",
    type: Array,
    default: [],
    config: false
  });
  game.settings.register("leobrew", "sanityEnabled", {
    name: "Use Resource: Sanity",
    hint: "Enabling this will enable sanity as a resource for characters.",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });
  game.settings.register("leobrew", "manaEnabled", {
    name: "Use Resource: Mana",
    hint: "Enabling this will enable mana as a resource for characters.",
    scope: "world",
    config: true,
    default: true,
    type: Boolean
  });
  game.settings.register("leobrew", "startingSkillPoints", {
    name: "Starting Skill Points",
    hint: "This controls how many skill points new characters start with.",
    scope: "world",
    config: true,
    default: 40,
    type: Number
  });
  game.settings.register("leobrew", "migration-version", {
    scope: "world",
    config: false,
    default: "",
    type: String
  });
}
async function runMigrations() {
  for (const [version, migration] of Object.entries(migrations)) {
    await migration(version);
    await game.settings.set("leobrew", "migration-version", version);
  }
}
const migrations = {
  "1.0.0": async (version) => {
    let hitError = false;
    try {
      const globalItemsToUpdate = [];
      const invalidItems = Array.from(game.items.invalidDocumentIds);
      if (invalidItems.length) {
        const reg = new RegExp("(\\d+) *(\\w+)*", "g");
        const globalItemSources = game.items._source;
        for (const invalidId of invalidItems) {
          const invalidSource = globalItemSources.find((source) => source._id === invalidId);
          if (invalidSource.type !== "item")
            continue;
          const update2 = {
            _id: invalidId,
            type: "equipment"
          };
          if (invalidSource.price && invalidSource.price.search(reg) > -1) {
            const match = [...invalidSource.price.matchAll(reg)];
            update2["price"] = {
              [match?.[2] ?? "cp"]: Number(match[0])
            };
          }
          globalItemsToUpdate.push(update2);
        }
        await Item.updateDocuments(globalItemsToUpdate);
      }
    } catch (err) {
      console.error(err);
      hitError = true;
    }
    for (const actor of Array.from(game.actors)) {
      try {
        let actorUpdates = {};
        if (actor.system.description) {
          actorUpdates["system.biography"] = { value: actor.system.description.value };
          actorUpdates["system.-=description"] = null;
          actorUpdates["system.description.-=value"] = null;
        }
        if (foundry.utils.hasProperty(actor.system, "currency.gp") || foundry.utils.hasProperty(actor.system, "currency.sp") || foundry.utils.hasProperty(actor.system, "currency.cp")) {
          const gp = typeof foundry.utils.getProperty(actor.system, "currency.gp") === "number" ? foundry.utils.getProperty(actor.system, "currency.gp") ?? 0 : foundry.utils.getProperty(actor.system, "currency.gp.value") ?? 0;
          const sp = typeof foundry.utils.getProperty(actor.system, "currency.sp") === "number" ? foundry.utils.getProperty(actor.system, "currency.sp") ?? 0 : foundry.utils.getProperty(actor.system, "currency.sp.value") ?? 0;
          const cp = typeof foundry.utils.getProperty(actor.system, "currency.cp") === "number" ? foundry.utils.getProperty(actor.system, "currency.cp") ?? 0 : foundry.utils.getProperty(actor.system, "currency.cp.value") ?? 0;
          actorUpdates["system.currencies"] = {
            gp: {
              value: gp,
              bank: 0
            },
            sp: {
              value: sp,
              bank: 0
            },
            cp: {
              value: cp,
              bank: 0
            }
          };
          actorUpdates["system.currency.-=gp"] = null;
          actorUpdates["system.currency.-=sp"] = null;
          actorUpdates["system.currency.-=cp"] = null;
          actorUpdates["system.currency"] = null;
        }
        await actor.update(actorUpdates);
      } catch (err) {
        console.error(err);
        hitError = true;
      }
      try {
        const actorInvalidItems = Array.from(actor.items.invalidDocumentIds);
        if (actorInvalidItems.length) {
          const itemsToUpdate = [];
          const reg = new RegExp("(\\d+) *(\\w+)*", "g");
          const actorSources = actor.items._source;
          for (const invalidId of actorInvalidItems) {
            const invalidSource = actorSources.find((source) => source._id === invalidId);
            if (invalidSource.type !== "item")
              continue;
            const update2 = {
              _id: invalidId,
              type: "equipment"
            };
            if (invalidSource.price && invalidSource.price.search(reg) > -1) {
              const match = [...invalidSource.price.matchAll(reg)];
              update2["price"] = {
                [match?.[2] ?? "cp"]: Number(match[0])
              };
            }
            itemsToUpdate.push(update2);
          }
          await actor.updateEmbeddedDocuments("Item", itemsToUpdate);
        }
      } catch (err) {
        console.error(err);
        hitError = true;
      }
      try {
        const skillItems = [];
        if (actor.system?.skills) {
          const actorUpdates = {};
          for (const [key, skill] of Object.entries(actor.system.skills)) {
            let category = "";
            let skillName = skill.label;
            if (skillName.includes(" - ")) {
              const split = skillName.split(" - ");
              category = split[0];
              skillName = split.slice(1).join(": ");
            } else if (skillName.includes(": ")) {
              const split = skillName.split(": ");
              category = split[0];
              skillName = split.slice(1).join(": ");
            }
            skillItems.push({
              name: skillName,
              type: "skill",
              system: {
                category,
                level: skill.value,
                isMagic: skill.isMagic
              }
            });
            actorUpdates[`system.skills.-=${key}`] = null;
          }
          actorUpdates[`system.-=skills`] = null;
          await actor.update(actorUpdates);
          await actor.createEmbeddedDocuments("Item", skillItems);
        }
      } catch (err) {
        console.error(err);
        hitError = true;
      }
    }
    if (hitError)
      ui.notifications.error(`Something went wrong when migrating to version ${version}. Please check the console for the error!`);
  }
};
function highlightCriticalSuccessFailure(message, html) {
  if (!message.isRoll || !message.isContentVisible)
    return;
  let rollData = _getDiceData(message);
  if (!rollData)
    return;
  const { isCritical, isFumble, confirmAction } = rollData;
  if (isCritical || confirmAction === "confirmed-critical") {
    html.find(".dice-total").first().addClass("critical");
  } else if (isFumble || confirmAction === "confirmed-fumble") {
    html.find(".dice-total").first().addClass("fumble");
  }
}
function _getDiceData(message) {
  const [roll] = message.rolls;
  if (!roll.dice.length)
    return;
  const dice = roll.dice[0];
  const isD10 = dice.faces === 10 && dice.values.length === 1;
  if (!isD10)
    return;
  const isModifiedRoll = "success" in dice.results[0] || dice.options.marginSuccess || dice.options.marginFailure;
  if (isModifiedRoll)
    return;
  const flags = message.getFlag("leobrew", "roll") ?? {};
  let confirmAction = flags?.confirmAction ?? "";
  let isCritical = dice.total === 10;
  let isFumble = dice.total === 1;
  if (confirmAction === "confirm-critical") {
    isCritical = dice.total <= 3;
    if (isCritical) {
      confirmAction = "confirmed-critical";
    } else if (dice.total === 10) {
      isCritical = true;
      confirmAction = "confirm-critical";
    } else {
      confirmAction = "confirmed-natural";
    }
  } else if (confirmAction === "confirm-fumble") {
    isFumble = dice.total <= 3;
    confirmAction = isFumble ? "confirmed-fumble" : "confirmed-natural";
  }
  return { isCritical, isFumble, confirmAction, roll };
}
const automateCriticalSuccessFailure = async function(message) {
  if (!isResponsibleGM())
    return;
  const flags = message.getFlag("leobrew", "roll") ?? false;
  if (!message.isRoll || !message.isContentVisible || !flags)
    return;
  let rollData = _getDiceData(message);
  if (!rollData)
    return;
  const { isCritical, isFumble, confirmAction } = rollData;
  if (isCritical && confirmAction === "confirmed-critical")
    return;
  if (isFumble && confirmAction === "confirmed-fumble")
    return;
  if (!(isCritical || isFumble) && confirmAction === "confirmed-natural")
    return;
  if (!(isCritical || isFumble) && confirmAction === "")
    return;
  const label = isCritical ? game.i18n.format("LEOBREW.ChatCriticalConfirmText") : game.i18n.format("LEOBREW.ChatFumbleConfirmText");
  const buttonLabel = isCritical ? game.i18n.format("LEOBREW.ChatCriticalButton") : game.i18n.format("LEOBREW.ChatFumbleButton");
  const action = isCritical ? "confirm-critical" : "confirm-fumble";
  let item;
  let actor;
  if (flags.actorUuid) {
    actor = fromUuidSync(flags.actorUuid);
  } else {
    item = fromUuidSync(flags.source);
    actor = item.parent;
  }
  const templateData = {
    action,
    buttonLabel
  };
  const chatCardHtml = await renderTemplate("systems/leobrew/templates/chat/critical-fumble-card.html", templateData);
  let originalMessageId = flags?.originalMessageId && !isCritical ? flags?.originalMessageId : message.id;
  let totalCriticalConfirms = typeof flags?.totalCriticalConfirms === "number" && isCritical ? flags.totalCriticalConfirms + 1 : 1;
  const chatData = {
    user: message.user,
    type: CONST.CHAT_MESSAGE_TYPES.WHISPER,
    content: chatCardHtml,
    flavor: label,
    whisper: [message.user],
    speaker: ChatMessage.getSpeaker({ actor }),
    flags: {
      leobrew: {
        roll: foundry.utils.mergeObject(flags, {
          "originalMessageId": originalMessageId,
          "totalCriticalConfirms": totalCriticalConfirms
        })
      }
    }
  };
  ChatMessage.create(chatData);
};
function displayChatActionButtons(message, html, data) {
  const chatCard = html.find(".leobrew.chat-card");
  if (chatCard.length > 0) {
    let buttonsUsed = message.getFlag("leobrew", "buttons-used") ?? false;
    if (!buttonsUsed) {
      let actor = game.actors.get(data.message.speaker.actor);
      if (actor && actor.isOwner)
        return;
      else if (game.user.isGM || data.author.id === game.user.id)
        return;
    }
    const buttons = chatCard.find("button[data-action]");
    buttons.each((i, btn) => {
      btn.style.display = "none";
      btn.disabled = true;
    });
  }
}
function registerChatListeners() {
  $(".chat-control-icon").children().eq(0).removeClass("fa-dice-d20").addClass("clickable clickable-red fa-dice-d10").on("click", function() {
    new Roll("1d10").toMessage();
  });
  $(document).on("click", ".confirm-button", async (event) => {
    event.preventDefault();
    const button = event.currentTarget;
    const card = button.closest(".chat-card");
    const messageId = card.closest(".message").dataset.messageId;
    const message = game.messages.get(messageId);
    if (!(game.user.isGM || message.isAuthor))
      return;
    button.disabled = true;
    let actor;
    let item;
    const flags = message.getFlag("leobrew", "roll") ?? false;
    if (!flags)
      return;
    if (flags.actorUuid) {
      actor = fromUuidSync(flags.actorUuid);
    } else {
      item = fromUuidSync(flags.source);
      actor = item?.parent;
    }
    if (!actor)
      return;
    const dataset = button.dataset;
    const action = dataset.action;
    const flavor = action === "confirm-critical" ? game.i18n.localize("LEOBREW.ChatCriticalConfirmFlavor") : game.i18n.localize("LEOBREW.ChatFumbleConfirmFlavor");
    const options = {
      extraTitle: flags?.extraTitle ?? "",
      subSkill: flags?.subSkill ?? null,
      asSkill: flags?.asSkill ?? null,
      extraFlavor: flavor,
      messageData: {
        "flags.leobrew.roll": {
          confirmAction: action,
          actorUuid: flags?.actorUuid ?? false,
          source: flags?.source ?? false,
          originalMessageId: flags.originalMessageId,
          totalCriticalConfirms: flags.totalCriticalConfirms
        }
      }
    };
    await message.delete();
    if (item) {
      return item.roll(options);
    } else if (flags.type === "ability") {
      return actor.rollAbility(flags.abilityId, options);
    }
    return actor.rollGeneric(options);
  });
}
Hooks.once("init", () => {
  setupSystem();
});
Hooks.once("setup", () => {
  setupLocalization();
});
Hooks.once("ready", async () => {
  registerChatListeners();
  if (!game.user.isGM)
    return;
  await runMigrations();
});
Hooks.on("preCreateActor", (doc) => {
  doc.updateSource({
    "system.experience.value": Math.abs(Number(game.settings.get("leobrew", "startingSkillPoints"))) || 40
  });
});
Hooks.on("updateItem", (item) => {
  if (!item.parent)
    return;
  item.parent.prepareDerivedData();
});
Hooks.on("createActor", (doc) => {
  doc.createEmbeddedDocuments("Item", [{
    name: "Native Language",
    type: "skill",
    system: {
      "category": "Language",
      "level": 5
    }
  }]);
});
Hooks.on("deleteItem", (doc) => {
  if (doc.type !== "skill" || !doc.parent || !doc.parent.system.experience.initalized)
    return;
  doc.parent.update({
    "system.experience.value": doc.parent.system.experience.value + doc.system.level
  });
});
Hooks.on("renderChatMessage", (...args) => {
  displayChatActionButtons(...args);
  highlightCriticalSuccessFailure(...args);
});
Hooks.on("createChatMessage", (...args) => {
  automateCriticalSuccessFailure(...args);
});
Hooks.on("getActorDirectoryEntryContext", (html, options) => {
  options.push({
    name: game.i18n.localize("LEOBREW.DefineTemplate"),
    icon: '<i class="fas fa-stamp"></i>',
    condition: (li) => {
      const actor = game.actors.get(li.data("documentId"));
      return !actor.getFlag("leobrew", "isTemplate");
    },
    callback: (li) => {
      const actor = game.actors.get(li.data("documentId"));
      actor.setFlag("leobrew", "isTemplate", true);
    }
  });
  options.push({
    name: game.i18n.localize("LEOBREW.UnsetTemplate"),
    icon: '<i class="fas fa-times"></i>',
    condition: (li) => {
      const actor = game.actors.get(li.data("documentId"));
      return actor.getFlag("leobrew", "isTemplate");
    },
    callback: (li) => {
      const actor = game.actors.get(li.data("documentId"));
      actor.setFlag("leobrew", "isTemplate", false);
    }
  });
});
Hooks.on("getItemDirectoryEntryContext", (html, options) => {
  options.push({
    name: game.i18n.localize("LEOBREW.DefineTemplate"),
    icon: '<i class="fas fa-stamp"></i>',
    condition: (li) => {
      const item = game.items.get(li.data("documentId"));
      return !item.getFlag("leobrew", "isTemplate");
    },
    callback: (li) => {
      const item = game.items.get(li.data("documentId"));
      item.setFlag("leobrew", "isTemplate", true);
    }
  });
  options.push({
    name: game.i18n.localize("LEOBREW.UnsetTemplate"),
    icon: '<i class="fas fa-times"></i>',
    condition: (li) => {
      const item = game.items.get(li.data("documentId"));
      return item.getFlag("leobrew", "isTemplate");
    },
    callback: (li) => {
      const item = game.items.get(li.data("documentId"));
      item.setFlag("leobrew", "isTemplate", false);
    }
  });
});
//# sourceMappingURL=system.js.map
