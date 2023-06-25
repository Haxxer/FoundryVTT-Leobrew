var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
__name(noop, "noop");
const identity = /* @__PURE__ */ __name((x) => x, "identity");
function assign(tar, src) {
  for (const k in src)
    tar[k] = src[k];
  return tar;
}
__name(assign, "assign");
function run(fn) {
  return fn();
}
__name(run, "run");
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
__name(blank_object, "blank_object");
function run_all(fns) {
  fns.forEach(run);
}
__name(run_all, "run_all");
function is_function(thing) {
  return typeof thing === "function";
}
__name(is_function, "is_function");
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
__name(safe_not_equal, "safe_not_equal");
let src_url_equal_anchor;
function src_url_equal(element_src, url) {
  if (!src_url_equal_anchor) {
    src_url_equal_anchor = document.createElement("a");
  }
  src_url_equal_anchor.href = url;
  return element_src === src_url_equal_anchor.href;
}
__name(src_url_equal, "src_url_equal");
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
__name(is_empty, "is_empty");
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
__name(subscribe, "subscribe");
function get_store_value(store) {
  let value;
  subscribe(store, (_) => value = _)();
  return value;
}
__name(get_store_value, "get_store_value");
function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}
__name(component_subscribe, "component_subscribe");
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}
__name(create_slot, "create_slot");
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
__name(get_slot_context, "get_slot_context");
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
__name(get_slot_changes, "get_slot_changes");
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
__name(update_slot_base, "update_slot_base");
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
__name(get_all_dirty_from_scope, "get_all_dirty_from_scope");
function exclude_internal_props(props) {
  const result = {};
  for (const k in props)
    if (k[0] !== "$")
      result[k] = props[k];
  return result;
}
__name(exclude_internal_props, "exclude_internal_props");
function set_store_value(store, ret, value) {
  store.set(value);
  return ret;
}
__name(set_store_value, "set_store_value");
function action_destroyer(action_result) {
  return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}
__name(action_destroyer, "action_destroyer");
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
__name(run_tasks, "run_tasks");
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
__name(loop, "loop");
function append(target, node) {
  target.appendChild(node);
}
__name(append, "append");
function get_root_for_style(node) {
  if (!node)
    return document;
  const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
  if (root && root.host) {
    return root;
  }
  return node.ownerDocument;
}
__name(get_root_for_style, "get_root_for_style");
function append_empty_stylesheet(node) {
  const style_element = element("style");
  append_stylesheet(get_root_for_style(node), style_element);
  return style_element.sheet;
}
__name(append_empty_stylesheet, "append_empty_stylesheet");
function append_stylesheet(node, style2) {
  append(node.head || node, style2);
  return style2.sheet;
}
__name(append_stylesheet, "append_stylesheet");
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
__name(insert, "insert");
function detach(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}
__name(detach, "detach");
function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i])
      iterations[i].d(detaching);
  }
}
__name(destroy_each, "destroy_each");
function element(name) {
  return document.createElement(name);
}
__name(element, "element");
function svg_element(name) {
  return document.createElementNS("http://www.w3.org/2000/svg", name);
}
__name(svg_element, "svg_element");
function text(data) {
  return document.createTextNode(data);
}
__name(text, "text");
function space() {
  return text(" ");
}
__name(space, "space");
function empty() {
  return text("");
}
__name(empty, "empty");
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
__name(listen, "listen");
function prevent_default(fn) {
  return function(event) {
    event.preventDefault();
    return fn.call(this, event);
  };
}
__name(prevent_default, "prevent_default");
function stop_propagation(fn) {
  return function(event) {
    event.stopPropagation();
    return fn.call(this, event);
  };
}
__name(stop_propagation, "stop_propagation");
function attr(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
__name(attr, "attr");
function to_number(value) {
  return value === "" ? null : +value;
}
__name(to_number, "to_number");
function children(element2) {
  return Array.from(element2.childNodes);
}
__name(children, "children");
function set_data(text2, data) {
  data = "" + data;
  if (text2.data === data)
    return;
  text2.data = data;
}
__name(set_data, "set_data");
function set_input_value(input, value) {
  input.value = value == null ? "" : value;
}
__name(set_input_value, "set_input_value");
function set_style(node, key, value, important) {
  if (value === null) {
    node.style.removeProperty(key);
  } else {
    node.style.setProperty(key, value, important ? "important" : "");
  }
}
__name(set_style, "set_style");
function toggle_class(element2, name, toggle) {
  element2.classList[toggle ? "add" : "remove"](name);
}
__name(toggle_class, "toggle_class");
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, cancelable, detail);
  return e;
}
__name(custom_event, "custom_event");
class HtmlTag {
  constructor(is_svg = false) {
    this.is_svg = false;
    this.is_svg = is_svg;
    this.e = this.n = null;
  }
  c(html) {
    this.h(html);
  }
  m(html, target, anchor = null) {
    if (!this.e) {
      if (this.is_svg)
        this.e = svg_element(target.nodeName);
      else
        this.e = element(target.nodeType === 11 ? "TEMPLATE" : target.nodeName);
      this.t = target.tagName !== "TEMPLATE" ? target : target.content;
      this.c(html);
    }
    this.i(anchor);
  }
  h(html) {
    this.e.innerHTML = html;
    this.n = Array.from(this.e.nodeName === "TEMPLATE" ? this.e.content.childNodes : this.e.childNodes);
  }
  i(anchor) {
    for (let i = 0; i < this.n.length; i += 1) {
      insert(this.t, this.n[i], anchor);
    }
  }
  p(html) {
    this.d();
    this.h(html);
    this.i(this.a);
  }
  d() {
    this.n.forEach(detach);
  }
}
__name(HtmlTag, "HtmlTag");
function construct_svelte_component(component, props) {
  return new component(props);
}
__name(construct_svelte_component, "construct_svelte_component");
const managed_styles = /* @__PURE__ */ new Map();
let active = 0;
function hash(str) {
  let hash2 = 5381;
  let i = str.length;
  while (i--)
    hash2 = (hash2 << 5) - hash2 ^ str.charCodeAt(i);
  return hash2 >>> 0;
}
__name(hash, "hash");
function create_style_information(doc, node) {
  const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
  managed_styles.set(doc, info);
  return info;
}
__name(create_style_information, "create_style_information");
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
__name(create_rule, "create_rule");
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
__name(delete_rule, "delete_rule");
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
__name(clear_rules, "clear_rules");
let current_component;
function set_current_component(component) {
  current_component = component;
}
__name(set_current_component, "set_current_component");
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
__name(get_current_component, "get_current_component");
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
__name(onMount, "onMount");
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
__name(onDestroy, "onDestroy");
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail, { cancelable });
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
__name(createEventDispatcher, "createEventDispatcher");
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
  return context;
}
__name(setContext, "setContext");
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
__name(getContext, "getContext");
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
__name(schedule_update, "schedule_update");
function tick() {
  schedule_update();
  return resolved_promise;
}
__name(tick, "tick");
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
__name(add_render_callback, "add_render_callback");
function add_flush_callback(fn) {
  flush_callbacks.push(fn);
}
__name(add_flush_callback, "add_flush_callback");
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
__name(flush, "flush");
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
__name(update, "update");
function flush_render_callbacks(fns) {
  const filtered = [];
  const targets = [];
  render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
  targets.forEach((c) => c());
  render_callbacks = filtered;
}
__name(flush_render_callbacks, "flush_render_callbacks");
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
__name(wait, "wait");
function dispatch(node, direction, kind) {
  node.dispatchEvent(custom_event(`${direction ? "intro" : "outro"}${kind}`));
}
__name(dispatch, "dispatch");
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
__name(group_outros, "group_outros");
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
__name(check_outros, "check_outros");
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
__name(transition_in, "transition_in");
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
__name(transition_out, "transition_out");
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
  __name(cleanup, "cleanup");
  function go() {
    const { delay = 0, duration = 300, easing = identity, tick: tick2 = noop, css } = config || null_transition;
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
  __name(go, "go");
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
__name(create_in_transition, "create_in_transition");
function create_out_transition(node, fn, params) {
  const options = { direction: "out" };
  let config = fn(node, params, options);
  let running = true;
  let animation_name;
  const group = outros;
  group.r += 1;
  function go() {
    const { delay = 0, duration = 300, easing = identity, tick: tick2 = noop, css } = config || null_transition;
    if (css)
      animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
    const start_time = now() + delay;
    const end_time = start_time + duration;
    add_render_callback(() => dispatch(node, false, "start"));
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
  __name(go, "go");
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
__name(create_out_transition, "create_out_transition");
function create_bidirectional_transition(node, fn, params, intro) {
  const options = { direction: "both" };
  let config = fn(node, params, options);
  let t = intro ? 0 : 1;
  let running_program = null;
  let pending_program = null;
  let animation_name = null;
  function clear_animation() {
    if (animation_name)
      delete_rule(node, animation_name);
  }
  __name(clear_animation, "clear_animation");
  function init2(program, duration) {
    const d = program.b - t;
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
  __name(init2, "init");
  function go(b) {
    const { delay = 0, duration = 300, easing = identity, tick: tick2 = noop, css } = config || null_transition;
    const program = {
      start: now() + delay,
      b
    };
    if (!b) {
      program.group = outros;
      outros.r += 1;
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
            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
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
  __name(go, "go");
  return {
    run(b) {
      if (is_function(config)) {
        wait().then(() => {
          config = config(options);
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
__name(create_bidirectional_transition, "create_bidirectional_transition");
function destroy_block(block, lookup) {
  block.d(1);
  lookup.delete(block.key);
}
__name(destroy_block, "destroy_block");
function outro_and_destroy_block(block, lookup) {
  transition_out(block, 1, 1, () => {
    lookup.delete(block.key);
  });
}
__name(outro_and_destroy_block, "outro_and_destroy_block");
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
  __name(insert2, "insert");
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
__name(update_keyed_each, "update_keyed_each");
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
__name(get_spread_update, "get_spread_update");
function get_spread_object(spread_props) {
  return typeof spread_props === "object" && spread_props !== null ? spread_props : {};
}
__name(get_spread_object, "get_spread_object");
function bind(component, name, callback) {
  const index2 = component.$$.props[name];
  if (index2 !== void 0) {
    component.$$.bound[index2] = callback;
    callback(component.$$.ctx[index2]);
  }
}
__name(bind, "bind");
function create_component(block) {
  block && block.c();
}
__name(create_component, "create_component");
function mount_component(component, target, anchor, customElement) {
  const { fragment, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  if (!customElement) {
    add_render_callback(() => {
      const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
      if (component.$$.on_destroy) {
        component.$$.on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
  }
  after_update.forEach(add_render_callback);
}
__name(mount_component, "mount_component");
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
__name(destroy_component, "destroy_component");
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
__name(make_dirty, "make_dirty");
function init(component, options, instance2, create_fragment2, not_equal, props, append_styles, dirty = [-1]) {
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
    mount_component(component, options.target, options.anchor, options.customElement);
    flush();
  }
  set_current_component(parent_component);
}
__name(init, "init");
class SvelteComponent {
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  $on(type, callback) {
    if (!is_function(callback)) {
      return noop;
    }
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index2 = callbacks.indexOf(callback);
      if (index2 !== -1)
        callbacks.splice(index2, 1);
    };
  }
  $set($$props) {
    if (this.$$set && !is_empty($$props)) {
      this.$$.skip_bound = true;
      this.$$set($$props);
      this.$$.skip_bound = false;
    }
  }
}
__name(SvelteComponent, "SvelteComponent");
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable$1(value, start).subscribe
  };
}
__name(readable, "readable");
function writable$1(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
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
  __name(set, "set");
  function update2(fn) {
    set(fn(value));
  }
  __name(update2, "update");
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
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
  __name(subscribe2, "subscribe");
  return { set, update: update2, subscribe: subscribe2 };
}
__name(writable$1, "writable$1");
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto = fn.length < 2;
  return readable(initial_value, (set) => {
    let started = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = /* @__PURE__ */ __name(() => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    }, "sync");
    const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
      values[i] = value;
      pending &= ~(1 << i);
      if (started) {
        sync();
      }
    }, () => {
      pending |= 1 << i;
    }));
    started = true;
    sync();
    return /* @__PURE__ */ __name(function stop() {
      run_all(unsubscribers);
      cleanup();
      started = false;
    }, "stop");
  });
}
__name(derived, "derived");
function localize(stringId, data) {
  const result = typeof data !== "object" ? globalThis.game.i18n.localize(stringId) : globalThis.game.i18n.format(stringId, data);
  return result !== void 0 ? result : "";
}
__name(localize, "localize");
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
__name(deepMerge, "deepMerge");
function isIterable(value) {
  if (value === null || value === void 0 || typeof value !== "object") {
    return false;
  }
  return typeof value[Symbol.iterator] === "function";
}
__name(isIterable, "isIterable");
function isObject(value) {
  return value !== null && typeof value === "object";
}
__name(isObject, "isObject");
function isPlainObject(value) {
  if (Object.prototype.toString.call(value) !== s_TAG_OBJECT) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}
__name(isPlainObject, "isPlainObject");
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
__name(safeAccess, "safeAccess");
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
__name(safeSet, "safeSet");
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
__name(_deepMerge, "_deepMerge");
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
__name(A11yHelper, "A11yHelper");
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
__name(ManagedPromise, "ManagedPromise");
const s_UUIDV4_REGEX = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ (globalThis.crypto || globalThis.msCrypto).getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}
__name(uuidv4, "uuidv4");
uuidv4.isValid = (uuid) => s_UUIDV4_REGEX.test(uuid);
class StyleManager {
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
   *
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
   * Provides a copy constructor to duplicate an existing StyleManager instance into a new document.
   *
   * Note: This is used to support the `PopOut` module.
   *
   * @param {Document} [document] Target browser document to clone into.
   *
   * @returns {StyleManager} New style manager instance.
   */
  clone(document2 = globalThis.document) {
    const newStyleManager = new StyleManager({
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
__name(StyleManager, "StyleManager");
const s_REGEX = /(\d+)\s*px/;
function styleParsePixels(value) {
  if (typeof value !== "string") {
    return void 0;
  }
  const isPixels = s_REGEX.test(value);
  const number = parseInt(value);
  return isPixels && Number.isFinite(number) ? number : void 0;
}
__name(styleParsePixels, "styleParsePixels");
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
__name(isApplicationShell, "isApplicationShell");
function isHMRProxy(comp) {
  const instanceName = comp?.constructor?.name;
  if (typeof instanceName === "string" && (instanceName.startsWith("Proxy<") || instanceName === "ProxyComponent")) {
    return true;
  }
  const prototypeName = comp?.prototype?.constructor?.name;
  return typeof prototypeName === "string" && (prototypeName.startsWith("Proxy<") || prototypeName === "ProxyComponent");
}
__name(isHMRProxy, "isHMRProxy");
function isSvelteComponent(comp) {
  if (comp === null || comp === void 0 || typeof comp !== "function") {
    return false;
  }
  const prototypeName = comp?.prototype?.constructor?.name;
  if (typeof prototypeName === "string" && (prototypeName.startsWith("Proxy<") || prototypeName === "ProxyComponent")) {
    return true;
  }
  return typeof window !== void 0 ? typeof comp.prototype.$destroy === "function" && typeof comp.prototype.$on === "function" : (
    // client-side
    typeof comp.render === "function"
  );
}
__name(isSvelteComponent, "isSvelteComponent");
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
__name(outroAndDestroy, "outroAndDestroy");
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
__name(parseSvelteConfig, "parseSvelteConfig");
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
__name(s_PROCESS_PROPS, "s_PROCESS_PROPS");
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
__name(hasGetter, "hasGetter");
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
__name(hasPrototype, "hasPrototype");
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
__name(getUUIDFromDataTransfer, "getUUIDFromDataTransfer");
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
__name(DynReducerUtils, "DynReducerUtils");
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
__name(AdapterDerived, "AdapterDerived");
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
   * @returns Generator / iterator of filters.
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
      const index2 = this.#filtersData.filters.findIndex((value) => {
        return data.weight < value.weight;
      });
      if (index2 >= 0) {
        this.#filtersData.filters.splice(index2, 0, data);
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
__name(AdapterFilters, "AdapterFilters");
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
__name(AdapterIndexer, "AdapterIndexer");
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
__name(AdapterSort, "AdapterSort");
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
   * @returns Iterator / generator
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
__name(IndexerAPI, "IndexerAPI");
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
__name(DerivedAPI, "DerivedAPI");
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
__name(Indexer, "Indexer");
class DerivedMapReducer {
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
    this.#derived = new AdapterDerived(this.#map, this.#indexPublicAPI, DerivedMapReducer);
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
   * @returns Generator / iterator of all data.
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
      const index2 = this.#subscriptions.findIndex((sub) => sub === handler);
      if (index2 >= 0) {
        this.#subscriptions.splice(index2, 1);
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
__name(DerivedMapReducer, "DerivedMapReducer");
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
    this.#derived = new AdapterDerived(this.#map, this.#indexPublicAPI, DerivedMapReducer);
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
      const index2 = this.#subscriptions.findIndex((sub) => sub === handler);
      if (index2 >= 0) {
        this.#subscriptions.splice(index2, 1);
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
   * @returns Generator / iterator of all data.
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
__name(DynMapReducer, "DynMapReducer");
function isSimpleDeriver(deriver) {
  return deriver.length < 2;
}
__name(isSimpleDeriver, "isSimpleDeriver");
function generator(storage2) {
  function readable2(key, value, start) {
    return {
      subscribe: writable2(key, value, start).subscribe
    };
  }
  __name(readable2, "readable");
  function writable2(key, value, start = noop) {
    function wrap_start(ogSet) {
      return start(/* @__PURE__ */ __name(function wrap_set(new_value) {
        if (storage2) {
          storage2.setItem(key, JSON.stringify(new_value));
        }
        return ogSet(new_value);
      }, "wrap_set"));
    }
    __name(wrap_start, "wrap_start");
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
    const ogStore = writable$1(value, start ? wrap_start : void 0);
    function set(new_value) {
      if (storage2) {
        storage2.setItem(key, JSON.stringify(new_value));
      }
      ogStore.set(new_value);
    }
    __name(set, "set");
    function update2(fn) {
      set(fn(get_store_value(ogStore)));
    }
    __name(update2, "update");
    function subscribe2(run2, invalidate = noop) {
      return ogStore.subscribe(run2, invalidate);
    }
    __name(subscribe2, "subscribe");
    return { set, update: update2, subscribe: subscribe2 };
  }
  __name(writable2, "writable");
  function derived2(key, stores, fn, initial_value) {
    const single = !Array.isArray(stores);
    const stores_array = single ? [stores] : stores;
    if (storage2 && storage2.getItem(key)) {
      try {
        initial_value = JSON.parse(storage2.getItem(key));
      } catch (err) {
      }
    }
    return readable2(key, initial_value, (set) => {
      let inited = false;
      const values = [];
      let pending = 0;
      let cleanup = noop;
      const sync = /* @__PURE__ */ __name(() => {
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
      }, "sync");
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
      return /* @__PURE__ */ __name(function stop() {
        run_all(unsubscribers);
        cleanup();
      }, "stop");
    });
  }
  __name(derived2, "derived");
  return {
    readable: readable2,
    writable: writable2,
    derived: derived2,
    get: get_store_value
  };
}
__name(generator, "generator");
var storage = typeof window !== "undefined" ? window.sessionStorage : void 0;
var g = generator(storage);
var writable = g.writable;
class TJSSessionStorage {
  /**
   * @type {Map<string, import('svelte/store').Writable>}
   */
  #stores = /* @__PURE__ */ new Map();
  /**
   * Creates a new store for the given key.
   *
   * @param {string}   key - Key to lookup in stores map.
   *
   * @param {boolean}  [defaultValue] - A default value to set for the store.
   *
   * @returns {import('svelte/store').Writable} The new store.
   */
  static #createStore(key, defaultValue = void 0) {
    try {
      const value = sessionStorage.getItem(key);
      if (value !== null) {
        defaultValue = value === "undefined" ? void 0 : JSON.parse(value);
      }
    } catch (err) {
    }
    return writable(key, defaultValue);
  }
  /**
   * Gets a store from the `stores` Map or creates a new store for the key and a given default value.
   *
   * @param {string}               key - Key to lookup in stores map.
   *
   * @param {boolean}              [defaultValue] - A default value to set for the store.
   *
   * @returns {import('svelte/store').Writable} The store for the given key.
   */
  #getStore(key, defaultValue = void 0) {
    let store = this.#stores.get(key);
    if (store === void 0) {
      store = TJSSessionStorage.#createStore(key, defaultValue);
      this.#stores.set(key, store);
    }
    return store;
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
    return this.#getStore(key, defaultValue);
  }
  /**
   * Sets the value for the given key in sessionStorage.
   *
   * @param {string}   key - Key to lookup in sessionStorage.
   *
   * @param {*}        value - A value to set for this key.
   */
  setItem(key, value) {
    const store = this.#getStore(key);
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
    const store = this.#getStore(key, defaultValue);
    let currentValue = false;
    try {
      currentValue = !!JSON.parse(sessionStorage.getItem(key));
    } catch (err) {
    }
    const newValue = typeof currentValue === "boolean" ? !currentValue : false;
    store.set(newValue);
    return newValue;
  }
}
__name(TJSSessionStorage, "TJSSessionStorage");
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
__name(isUpdatableStore, "isUpdatableStore");
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
__name(subscribeIgnoreFirst, "subscribeIgnoreFirst");
function writableDerived(origins, derive, reflect, initial) {
  var childDerivedSetter, originValues, blockNextDerive = false;
  var reflectOldValues = reflect.length >= 2;
  var wrappedDerive = /* @__PURE__ */ __name((got, set) => {
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
  }, "wrappedDerive");
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
  __name(doReflect, "doReflect");
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
  __name(update2, "update");
  return {
    subscribe: childDerived.subscribe,
    set(value) {
      update2(() => value);
    },
    update: update2
  };
}
__name(writableDerived, "writableDerived");
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
__name(propertyStore, "propertyStore");
class EmbeddedStoreManager {
  /**
   * RegExp for detecting CRUD updates for renderContext.
   *
   * @type {RegExp}
   */
  static #renderContextRegex = /(create|delete|update)(\w+)/;
  /**
   * @type {Map<string, EmbeddedCollectionData>}
   */
  #name = /* @__PURE__ */ new Map();
  /**
   * @type {foundry.abstract.Document[]}
   */
  #document;
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
   * @template T
   *
   * @param {string} embeddedName -
   *
   * @param {import('@typhonjs-fvtt/svelte/store').OptionsDynMapCreate<string, T>} options -
   *
   * @returns {import('@typhonjs-fvtt/svelte/store').DynMapReducer<string, T>} DynMapReducer instance
   */
  create(embeddedName, options) {
    const doc = this.#document[0];
    let collection = null;
    if (doc) {
      try {
        collection = doc.getEmbeddedCollection(embeddedName);
      } catch (err) {
        console.warn(`EmbeddedStoreManager.create error: No valid embedded collection for: ${embeddedName}`);
      }
    }
    let embeddedData;
    if (!this.#name.has(embeddedName)) {
      embeddedData = {
        collection,
        stores: /* @__PURE__ */ new Map()
      };
      this.#name.set(embeddedName, embeddedData);
    } else {
      embeddedData = this.#name.get(embeddedName);
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
      for (const embeddedData of this.#name.values()) {
        embeddedData.collection = null;
        for (const store of embeddedData.stores.values()) {
          store.destroy();
          count++;
        }
      }
      this.#name.clear();
    } else if (typeof embeddedName === "string" && storeName === void 0) {
      const embeddedData = this.#name.get(embeddedName);
      if (embeddedData) {
        embeddedData.collection = null;
        for (const store of embeddedData.stores.values()) {
          store.destroy();
          count++;
        }
      }
      this.#name.delete(embeddedName);
    } else if (typeof embeddedName === "string" && storeName === "string") {
      const embeddedData = this.#name.get(embeddedName);
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
    if (!this.#name.has(embeddedName)) {
      return void 0;
    }
    return this.#name.get(embeddedName).stores.get(storeName);
  }
  /**
   * Updates all existing embedded collection stores with the associated embedded collection
   */
  handleDocChange() {
    const doc = this.#document[0];
    if (doc instanceof globalThis.foundry.abstract.Document) {
      const existingEmbeddedNames = new Set(this.#name.keys());
      const embeddedNames = Object.keys(doc.constructor?.metadata?.embedded ?? []);
      this.#embeddedNames.clear();
      for (const embeddedName of embeddedNames) {
        existingEmbeddedNames.delete(embeddedName);
        this.#embeddedNames.add(`create${embeddedName}`);
        this.#embeddedNames.add(`delete${embeddedName}`);
        this.#embeddedNames.add(`update${embeddedName}`);
        let collection = null;
        try {
          collection = doc.getEmbeddedCollection(embeddedName);
        } catch (err) {
          console.warn(`EmbeddedStoreManager.handleDocUpdate error: No valid embedded collection for: ${embeddedName}`);
        }
        const embeddedData = this.#name.get(embeddedName);
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
      const embeddedName = match[2];
      if (!this.#name.has(embeddedName)) {
        return;
      }
      for (const store of this.#name.get(embeddedName).stores.values()) {
        store.index.update(true);
      }
    }
  }
}
__name(EmbeddedStoreManager, "EmbeddedStoreManager");
class TJSDocument {
  /**
   * @type {foundry.abstract.Document[]}
   */
  #document = [void 0];
  /**
   * @type {EmbeddedStoreManager}
   */
  #embeddedStoreManager;
  #embeddedAPI;
  /**
   * @type {string}
   */
  #uuidv4;
  /**
   * @type {TJSDocumentOptions}
   */
  #options = { delete: void 0, preDelete: void 0 };
  #subscriptions = [];
  #updateOptions;
  /**
   * @param {foundry.abstract.Document | TJSDocumentOptions}  [document] - Document to wrap or TJSDocumentOptions.
   *
   * @param {TJSDocumentOptions}      [options] - TJSDocument options.
   */
  constructor(document2, options = {}) {
    this.#uuidv4 = `tjs-document-${uuidv4()}`;
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
    if (!this.#embeddedAPI) {
      this.#embeddedStoreManager = new EmbeddedStoreManager(this.#document);
      this.#embeddedAPI = {
        create: (embeddedName, options) => this.#embeddedStoreManager.create(embeddedName, options),
        destroy: (embeddedName, storeName) => this.#embeddedStoreManager.destroy(embeddedName, storeName),
        get: (embeddedName, storeName) => this.#embeddedStoreManager.get(embeddedName, storeName)
      };
    }
    return this.#embeddedAPI;
  }
  /**
   * Returns the options passed on last update.
   *
   * @returns {object} Last update options.
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
   * @returns {foundry.abstract.Document | undefined} Current document
   */
  get() {
    return this.#document[0];
  }
  /**
   * @param {foundry.abstract.Document | undefined}  document - New document to set.
   *
   * @param {object}         [options] - New document update options to set.
   */
  set(document2, options = {}) {
    if (this.#document[0]) {
      delete this.#document[0].apps[this.#uuidv4];
    }
    if (document2 !== void 0 && !(document2 instanceof globalThis.foundry.abstract.Document)) {
      throw new TypeError(`TJSDocument set error: 'document' is not a valid Document or undefined.`);
    }
    if (options === null || typeof options !== "object") {
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
   * @param {foundry.abstract.Document | undefined} doc -
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
      this.#options.delete = options.delete;
    }
    if (options.preDelete === void 0 || typeof options.preDelete === "function") {
      this.#options.preDelete = options.preDelete;
    }
  }
  /**
   * @param {function(foundry.abstract.Document, object): void} handler - Callback function that is invoked on update / changes.
   *
   * @returns {(function(): void)} Unsubscribe function.
   */
  subscribe(handler) {
    this.#subscriptions.push(handler);
    const updateOptions = { action: "subscribe", data: void 0 };
    handler(this.#document[0], updateOptions);
    return () => {
      const index2 = this.#subscriptions.findIndex((sub) => sub === handler);
      if (index2 >= 0) {
        this.#subscriptions.splice(index2, 1);
      }
    };
  }
}
__name(TJSDocument, "TJSDocument");
const storeState = writable$1(void 0);
({
  subscribe: storeState.subscribe,
  get: () => game
});
Hooks.once("ready", () => storeState.set(game));
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
__name(cubicOut, "cubicOut");
function sineInOut(t) {
  return -0.5 * (Math.cos(Math.PI * t) - 1);
}
__name(sineInOut, "sineInOut");
function lerp$5(start, end, amount) {
  return (1 - amount) * start + amount * end;
}
__name(lerp$5, "lerp$5");
function degToRad(deg) {
  return deg * (Math.PI / 180);
}
__name(degToRad, "degToRad");
var EPSILON = 1e-6;
var ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
var RANDOM = Math.random;
if (!Math.hypot)
  Math.hypot = function() {
    var y = 0, i = arguments.length;
    while (i--) {
      y += arguments[i] * arguments[i];
    }
    return Math.sqrt(y);
  };
function create$6() {
  var out = new ARRAY_TYPE(9);
  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
  }
  out[0] = 1;
  out[4] = 1;
  out[8] = 1;
  return out;
}
__name(create$6, "create$6");
function create$5() {
  var out = new ARRAY_TYPE(16);
  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }
  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}
__name(create$5, "create$5");
function clone$5(a) {
  var out = new ARRAY_TYPE(16);
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
__name(clone$5, "clone$5");
function copy$5(out, a) {
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
__name(copy$5, "copy$5");
function fromValues$5(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  var out = new ARRAY_TYPE(16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
__name(fromValues$5, "fromValues$5");
function set$5(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
__name(set$5, "set$5");
function identity$2(out) {
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
__name(identity$2, "identity$2");
function transpose(out, a) {
  if (out === a) {
    var a01 = a[1], a02 = a[2], a03 = a[3];
    var a12 = a[6], a13 = a[7];
    var a23 = a[11];
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
__name(transpose, "transpose");
function invert$2(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;
  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
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
__name(invert$2, "invert$2");
function adjoint(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
  out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
  out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
  out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
  out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
  out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
  out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
  out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
  out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
  out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
  out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
  out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
  out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
  out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
  out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
  out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
  return out;
}
__name(adjoint, "adjoint");
function determinant(a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;
  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
__name(determinant, "determinant");
function multiply$5(out, a, b) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
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
__name(multiply$5, "multiply$5");
function translate$1(out, a, v) {
  var x = v[0], y = v[1], z = v[2];
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
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
__name(translate$1, "translate$1");
function scale$5(out, a, v) {
  var x = v[0], y = v[1], z = v[2];
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
__name(scale$5, "scale$5");
function rotate$1(out, a, rad, axis) {
  var x = axis[0], y = axis[1], z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  var b00, b01, b02;
  var b10, b11, b12;
  var b20, b21, b22;
  if (len < EPSILON) {
    return null;
  }
  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11];
  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c;
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
__name(rotate$1, "rotate$1");
function rotateX$3(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];
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
__name(rotateX$3, "rotateX$3");
function rotateY$3(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];
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
__name(rotateY$3, "rotateY$3");
function rotateZ$3(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
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
__name(rotateZ$3, "rotateZ$3");
function fromTranslation$1(out, v) {
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
__name(fromTranslation$1, "fromTranslation$1");
function fromScaling(out, v) {
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
__name(fromScaling, "fromScaling");
function fromRotation$1(out, rad, axis) {
  var x = axis[0], y = axis[1], z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;
  if (len < EPSILON) {
    return null;
  }
  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
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
__name(fromRotation$1, "fromRotation$1");
function fromXRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
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
__name(fromXRotation, "fromXRotation");
function fromYRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
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
__name(fromYRotation, "fromYRotation");
function fromZRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
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
__name(fromZRotation, "fromZRotation");
function fromRotationTranslation$1(out, q, v) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
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
__name(fromRotationTranslation$1, "fromRotationTranslation$1");
function fromQuat2(out, a) {
  var translation = new ARRAY_TYPE(3);
  var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7];
  var magnitude = bx * bx + by * by + bz * bz + bw * bw;
  if (magnitude > 0) {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
  } else {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  }
  fromRotationTranslation$1(out, a, translation);
  return out;
}
__name(fromQuat2, "fromQuat2");
function getTranslation$1(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
__name(getTranslation$1, "getTranslation$1");
function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out[0] = Math.hypot(m11, m12, m13);
  out[1] = Math.hypot(m21, m22, m23);
  out[2] = Math.hypot(m31, m32, m33);
  return out;
}
__name(getScaling, "getScaling");
function getRotation(out, mat) {
  var scaling = new ARRAY_TYPE(3);
  getScaling(scaling, mat);
  var is1 = 1 / scaling[0];
  var is2 = 1 / scaling[1];
  var is3 = 1 / scaling[2];
  var sm11 = mat[0] * is1;
  var sm12 = mat[1] * is2;
  var sm13 = mat[2] * is3;
  var sm21 = mat[4] * is1;
  var sm22 = mat[5] * is2;
  var sm23 = mat[6] * is3;
  var sm31 = mat[8] * is1;
  var sm32 = mat[9] * is2;
  var sm33 = mat[10] * is3;
  var trace = sm11 + sm22 + sm33;
  var S = 0;
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
__name(getRotation, "getRotation");
function fromRotationTranslationScale(out, q, v, s) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
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
__name(fromRotationTranslationScale, "fromRotationTranslationScale");
function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  var ox = o[0];
  var oy = o[1];
  var oz = o[2];
  var out0 = (1 - (yy + zz)) * sx;
  var out1 = (xy + wz) * sx;
  var out2 = (xz - wy) * sx;
  var out4 = (xy - wz) * sy;
  var out5 = (1 - (xx + zz)) * sy;
  var out6 = (yz + wx) * sy;
  var out8 = (xz + wy) * sz;
  var out9 = (yz - wx) * sz;
  var out10 = (1 - (xx + yy)) * sz;
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
__name(fromRotationTranslationScaleOrigin, "fromRotationTranslationScaleOrigin");
function fromQuat(out, q) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
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
__name(fromQuat, "fromQuat");
function frustum(out, left, right, bottom, top, near, far) {
  var rl = 1 / (right - left);
  var tb = 1 / (top - bottom);
  var nf = 1 / (near - far);
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
__name(frustum, "frustum");
function perspectiveNO(out, fovy, aspect, near, far) {
  var f = 1 / Math.tan(fovy / 2), nf;
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
    nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = 2 * far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }
  return out;
}
__name(perspectiveNO, "perspectiveNO");
var perspective = perspectiveNO;
function perspectiveZO(out, fovy, aspect, near, far) {
  var f = 1 / Math.tan(fovy / 2), nf;
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
    nf = 1 / (near - far);
    out[10] = far * nf;
    out[14] = far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -near;
  }
  return out;
}
__name(perspectiveZO, "perspectiveZO");
function perspectiveFromFieldOfView(out, fov, near, far) {
  var upTan = Math.tan(fov.upDegrees * Math.PI / 180);
  var downTan = Math.tan(fov.downDegrees * Math.PI / 180);
  var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180);
  var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180);
  var xScale = 2 / (leftTan + rightTan);
  var yScale = 2 / (upTan + downTan);
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
__name(perspectiveFromFieldOfView, "perspectiveFromFieldOfView");
function orthoNO(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
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
__name(orthoNO, "orthoNO");
var ortho = orthoNO;
function orthoZO(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
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
__name(orthoZO, "orthoZO");
function lookAt(out, eye, center, up) {
  var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
  var eyex = eye[0];
  var eyey = eye[1];
  var eyez = eye[2];
  var upx = up[0];
  var upy = up[1];
  var upz = up[2];
  var centerx = center[0];
  var centery = center[1];
  var centerz = center[2];
  if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
    return identity$2(out);
  }
  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len = 1 / Math.hypot(z0, z1, z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.hypot(x0, x1, x2);
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
  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len = Math.hypot(y0, y1, y2);
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
__name(lookAt, "lookAt");
function targetTo(out, eye, target, up) {
  var eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2];
  var z0 = eyex - target[0], z1 = eyey - target[1], z2 = eyez - target[2];
  var len = z0 * z0 + z1 * z1 + z2 * z2;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }
  var x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
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
__name(targetTo, "targetTo");
function str$5(a) {
  return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
}
__name(str$5, "str$5");
function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
}
__name(frob, "frob");
function add$5(out, a, b) {
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
__name(add$5, "add$5");
function subtract$3(out, a, b) {
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
__name(subtract$3, "subtract$3");
function multiplyScalar(out, a, b) {
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
__name(multiplyScalar, "multiplyScalar");
function multiplyScalarAndAdd(out, a, b, scale) {
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
__name(multiplyScalarAndAdd, "multiplyScalarAndAdd");
function exactEquals$5(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}
__name(exactEquals$5, "exactEquals$5");
function equals$5(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
  var a8 = a[8], a9 = a[9], a10 = a[10], a11 = a[11];
  var a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  var b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
  var b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11];
  var b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= EPSILON * Math.max(1, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= EPSILON * Math.max(1, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= EPSILON * Math.max(1, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= EPSILON * Math.max(1, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= EPSILON * Math.max(1, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= EPSILON * Math.max(1, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= EPSILON * Math.max(1, Math.abs(a15), Math.abs(b15));
}
__name(equals$5, "equals$5");
var mul$5 = multiply$5;
var sub$3 = subtract$3;
const mat4 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  add: add$5,
  adjoint,
  clone: clone$5,
  copy: copy$5,
  create: create$5,
  determinant,
  equals: equals$5,
  exactEquals: exactEquals$5,
  frob,
  fromQuat,
  fromQuat2,
  fromRotation: fromRotation$1,
  fromRotationTranslation: fromRotationTranslation$1,
  fromRotationTranslationScale,
  fromRotationTranslationScaleOrigin,
  fromScaling,
  fromTranslation: fromTranslation$1,
  fromValues: fromValues$5,
  fromXRotation,
  fromYRotation,
  fromZRotation,
  frustum,
  getRotation,
  getScaling,
  getTranslation: getTranslation$1,
  identity: identity$2,
  invert: invert$2,
  lookAt,
  mul: mul$5,
  multiply: multiply$5,
  multiplyScalar,
  multiplyScalarAndAdd,
  ortho,
  orthoNO,
  orthoZO,
  perspective,
  perspectiveFromFieldOfView,
  perspectiveNO,
  perspectiveZO,
  rotate: rotate$1,
  rotateX: rotateX$3,
  rotateY: rotateY$3,
  rotateZ: rotateZ$3,
  scale: scale$5,
  set: set$5,
  str: str$5,
  sub: sub$3,
  subtract: subtract$3,
  targetTo,
  translate: translate$1,
  transpose
});
function create$4() {
  var out = new ARRAY_TYPE(3);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }
  return out;
}
__name(create$4, "create$4");
function clone$4(a) {
  var out = new ARRAY_TYPE(3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
__name(clone$4, "clone$4");
function length$4(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.hypot(x, y, z);
}
__name(length$4, "length$4");
function fromValues$4(x, y, z) {
  var out = new ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
__name(fromValues$4, "fromValues$4");
function copy$4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
__name(copy$4, "copy$4");
function set$4(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
__name(set$4, "set$4");
function add$4(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
__name(add$4, "add$4");
function subtract$2(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
__name(subtract$2, "subtract$2");
function multiply$4(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}
__name(multiply$4, "multiply$4");
function divide$2(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}
__name(divide$2, "divide$2");
function ceil$2(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}
__name(ceil$2, "ceil$2");
function floor$2(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}
__name(floor$2, "floor$2");
function min$2(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}
__name(min$2, "min$2");
function max$2(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}
__name(max$2, "max$2");
function round$2(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  return out;
}
__name(round$2, "round$2");
function scale$4(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
__name(scale$4, "scale$4");
function scaleAndAdd$2(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  return out;
}
__name(scaleAndAdd$2, "scaleAndAdd$2");
function distance$2(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.hypot(x, y, z);
}
__name(distance$2, "distance$2");
function squaredDistance$2(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}
__name(squaredDistance$2, "squaredDistance$2");
function squaredLength$4(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}
__name(squaredLength$4, "squaredLength$4");
function negate$2(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
__name(negate$2, "negate$2");
function inverse$2(out, a) {
  out[0] = 1 / a[0];
  out[1] = 1 / a[1];
  out[2] = 1 / a[2];
  return out;
}
__name(inverse$2, "inverse$2");
function normalize$4(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }
  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;
  return out;
}
__name(normalize$4, "normalize$4");
function dot$4(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
__name(dot$4, "dot$4");
function cross$2(out, a, b) {
  var ax = a[0], ay = a[1], az = a[2];
  var bx = b[0], by = b[1], bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
__name(cross$2, "cross$2");
function lerp$4(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}
__name(lerp$4, "lerp$4");
function hermite(out, a, b, c, d, t) {
  var factorTimes2 = t * t;
  var factor1 = factorTimes2 * (2 * t - 3) + 1;
  var factor2 = factorTimes2 * (t - 2) + t;
  var factor3 = factorTimes2 * (t - 1);
  var factor4 = factorTimes2 * (3 - 2 * t);
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
__name(hermite, "hermite");
function bezier(out, a, b, c, d, t) {
  var inverseFactor = 1 - t;
  var inverseFactorTimesTwo = inverseFactor * inverseFactor;
  var factorTimes2 = t * t;
  var factor1 = inverseFactorTimesTwo * inverseFactor;
  var factor2 = 3 * t * inverseFactorTimesTwo;
  var factor3 = 3 * factorTimes2 * inverseFactor;
  var factor4 = factorTimes2 * t;
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
__name(bezier, "bezier");
function random$3(out, scale) {
  scale = scale || 1;
  var r = RANDOM() * 2 * Math.PI;
  var z = RANDOM() * 2 - 1;
  var zScale = Math.sqrt(1 - z * z) * scale;
  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale;
  return out;
}
__name(random$3, "random$3");
function transformMat4$2(out, a, m) {
  var x = a[0], y = a[1], z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
__name(transformMat4$2, "transformMat4$2");
function transformMat3$1(out, a, m) {
  var x = a[0], y = a[1], z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}
__name(transformMat3$1, "transformMat3$1");
function transformQuat$1(out, a, q) {
  var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
  var x = a[0], y = a[1], z = a[2];
  var uvx = qy * z - qz * y, uvy = qz * x - qx * z, uvz = qx * y - qy * x;
  var uuvx = qy * uvz - qz * uvy, uuvy = qz * uvx - qx * uvz, uuvz = qx * uvy - qy * uvx;
  var w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2;
  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2;
  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}
__name(transformQuat$1, "transformQuat$1");
function rotateX$2(out, a, b, rad) {
  var p = [], r = [];
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  r[0] = p[0];
  r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
  r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad);
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
__name(rotateX$2, "rotateX$2");
function rotateY$2(out, a, b, rad) {
  var p = [], r = [];
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad);
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
__name(rotateY$2, "rotateY$2");
function rotateZ$2(out, a, b, rad) {
  var p = [], r = [];
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
  r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
  r[2] = p[2];
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
__name(rotateZ$2, "rotateZ$2");
function angle$1(a, b) {
  var ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2], mag1 = Math.sqrt(ax * ax + ay * ay + az * az), mag2 = Math.sqrt(bx * bx + by * by + bz * bz), mag = mag1 * mag2, cosine = mag && dot$4(a, b) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
__name(angle$1, "angle$1");
function zero$2(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  return out;
}
__name(zero$2, "zero$2");
function str$4(a) {
  return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
}
__name(str$4, "str$4");
function exactEquals$4(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
__name(exactEquals$4, "exactEquals$4");
function equals$4(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2];
  var b0 = b[0], b1 = b[1], b2 = b[2];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2));
}
__name(equals$4, "equals$4");
var sub$2 = subtract$2;
var mul$4 = multiply$4;
var div$2 = divide$2;
var dist$2 = distance$2;
var sqrDist$2 = squaredDistance$2;
var len$4 = length$4;
var sqrLen$4 = squaredLength$4;
var forEach$2 = function() {
  var vec = create$4();
  return function(a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) {
      stride = 3;
    }
    if (!offset) {
      offset = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }
    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
    }
    return a;
  };
}();
const vec3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  add: add$4,
  angle: angle$1,
  bezier,
  ceil: ceil$2,
  clone: clone$4,
  copy: copy$4,
  create: create$4,
  cross: cross$2,
  dist: dist$2,
  distance: distance$2,
  div: div$2,
  divide: divide$2,
  dot: dot$4,
  equals: equals$4,
  exactEquals: exactEquals$4,
  floor: floor$2,
  forEach: forEach$2,
  fromValues: fromValues$4,
  hermite,
  inverse: inverse$2,
  len: len$4,
  length: length$4,
  lerp: lerp$4,
  max: max$2,
  min: min$2,
  mul: mul$4,
  multiply: multiply$4,
  negate: negate$2,
  normalize: normalize$4,
  random: random$3,
  rotateX: rotateX$2,
  rotateY: rotateY$2,
  rotateZ: rotateZ$2,
  round: round$2,
  scale: scale$4,
  scaleAndAdd: scaleAndAdd$2,
  set: set$4,
  sqrDist: sqrDist$2,
  sqrLen: sqrLen$4,
  squaredDistance: squaredDistance$2,
  squaredLength: squaredLength$4,
  str: str$4,
  sub: sub$2,
  subtract: subtract$2,
  transformMat3: transformMat3$1,
  transformMat4: transformMat4$2,
  transformQuat: transformQuat$1,
  zero: zero$2
});
function create$3() {
  var out = new ARRAY_TYPE(4);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
  }
  return out;
}
__name(create$3, "create$3");
function normalize$3(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len = x * x + y * y + z * z + w * w;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }
  out[0] = x * len;
  out[1] = y * len;
  out[2] = z * len;
  out[3] = w * len;
  return out;
}
__name(normalize$3, "normalize$3");
(function() {
  var vec = create$3();
  return function(a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) {
      stride = 4;
    }
    if (!offset) {
      offset = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }
    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
      a[i + 3] = vec[3];
    }
    return a;
  };
})();
function create$2() {
  var out = new ARRAY_TYPE(4);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }
  out[3] = 1;
  return out;
}
__name(create$2, "create$2");
function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}
__name(setAxisAngle, "setAxisAngle");
function slerp(out, a, b, t) {
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var bx = b[0], by = b[1], bz = b[2], bw = b[3];
  var omega, cosom, sinom, scale0, scale1;
  cosom = ax * bx + ay * by + az * bz + aw * bw;
  if (cosom < 0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  }
  if (1 - cosom > EPSILON) {
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    scale0 = 1 - t;
    scale1 = t;
  }
  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;
  return out;
}
__name(slerp, "slerp");
function fromMat3(out, m) {
  var fTrace = m[0] + m[4] + m[8];
  var fRoot;
  if (fTrace > 0) {
    fRoot = Math.sqrt(fTrace + 1);
    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    var i = 0;
    if (m[4] > m[0])
      i = 1;
    if (m[8] > m[i * 3 + i])
      i = 2;
    var j = (i + 1) % 3;
    var k = (i + 2) % 3;
    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }
  return out;
}
__name(fromMat3, "fromMat3");
var normalize$2 = normalize$3;
(function() {
  var tmpvec3 = create$4();
  var xUnitVec3 = fromValues$4(1, 0, 0);
  var yUnitVec3 = fromValues$4(0, 1, 0);
  return function(out, a, b) {
    var dot = dot$4(a, b);
    if (dot < -0.999999) {
      cross$2(tmpvec3, xUnitVec3, a);
      if (len$4(tmpvec3) < 1e-6)
        cross$2(tmpvec3, yUnitVec3, a);
      normalize$4(tmpvec3, tmpvec3);
      setAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot > 0.999999) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    } else {
      cross$2(tmpvec3, a, b);
      out[0] = tmpvec3[0];
      out[1] = tmpvec3[1];
      out[2] = tmpvec3[2];
      out[3] = 1 + dot;
      return normalize$2(out, out);
    }
  };
})();
(function() {
  var temp1 = create$2();
  var temp2 = create$2();
  return function(out, a, b, c, d, t) {
    slerp(temp1, a, d, t);
    slerp(temp2, b, c, t);
    slerp(out, temp1, temp2, 2 * t * (1 - t));
    return out;
  };
})();
(function() {
  var matr = create$6();
  return function(out, view, right, up) {
    matr[0] = right[0];
    matr[3] = right[1];
    matr[6] = right[2];
    matr[1] = up[0];
    matr[4] = up[1];
    matr[7] = up[2];
    matr[2] = -view[0];
    matr[5] = -view[1];
    matr[8] = -view[2];
    return normalize$2(out, fromMat3(out, matr));
  };
})();
function create() {
  var out = new ARRAY_TYPE(2);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }
  return out;
}
__name(create, "create");
(function() {
  var vec = create();
  return function(a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) {
      stride = 2;
    }
    if (!offset) {
      offset = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }
    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
    }
    return a;
  };
})();
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
__name(AnimationControl, "AnimationControl");
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
   * Cancels all animations for given Position instance.
   *
   * @param {Position} position - Position instance.
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
   * Gets all {@link AnimationControl} instances for a given Position instance.
   *
   * @param {Position} position - Position instance.
   *
   * @returns {AnimationControl[]} All scheduled AnimationControl instances for the given Position instance.
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
__name(AnimationManager, "AnimationManager");
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
__name(setNumericDefaults, "setNumericDefaults");
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
__name(convertRelative, "convertRelative");
class AnimationAPI {
  /** @type {PositionData} */
  #data;
  /** @type {Position} */
  #position;
  /**
   * Tracks the number of animation control instances that are active.
   *
   * @type {number}
   */
  #instanceCount = 0;
  /**
   * Provides a bound function to pass as data to AnimationManager to invoke
   *
   * @type {Function}
   * @see {AnimationAPI.#cleanupInstance}
   */
  #cleanup;
  constructor(position, data) {
    this.#position = position;
    this.#data = data;
    this.#cleanup = this.#cleanupInstance.bind(this);
  }
  /**
   * Returns whether there are scheduled animations whether active or delayed for this Position.
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
   * @returns {AnimationControl} The associated animation control.
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
   * Cancels all animation instances for this Position instance.
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
   * Returns all currently scheduled AnimationControl instances for this Position instance.
   *
   * @returns {AnimationControl[]} All currently scheduled animation controls for this Position instance.
   */
  getScheduled() {
    return AnimationManager.getScheduled(this.#position);
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
   * @returns {quickToCallback} quick-to tween function.
   */
  quickTo(keys, { duration = 1, ease = cubicOut, interpolate = lerp$5 } = {}) {
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
    const quickToCB = /* @__PURE__ */ __name((...args) => {
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
    }, "quickToCB");
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
__name(AnimationAPI, "AnimationAPI");
class AnimationGroupControl {
  /** @type {AnimationControl[]} */
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
   * @param {AnimationControl[]} animationControls - An array of AnimationControl instances.
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
__name(AnimationGroupControl, "AnimationGroupControl");
class AnimationGroupAPI {
  /**
   * Checks of the given object is a Position instance by checking for AnimationAPI.
   *
   * @param {*}  object - Any data.
   *
   * @returns {boolean} Is Position.
   */
  static #isPosition(object) {
    return isObject(object) && object.animate instanceof AnimationAPI;
  }
  /**
   * Cancels any animation for given Position data.
   *
   * @param {Position|{position: Position}|Iterable<Position>|Iterable<{position: Position}>} position -
   */
  static cancel(position) {
    if (isIterable(position)) {
      let index2 = -1;
      for (const entry of position) {
        index2++;
        const actualPosition = this.#isPosition(entry) ? entry : entry.position;
        if (!this.#isPosition(actualPosition)) {
          console.warn(`AnimationGroupAPI.cancel warning: No Position instance found at index: ${index2}.`);
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
      let index2 = -1;
      for (const entry of position) {
        index2++;
        const isPosition = this.#isPosition(entry);
        const actualPosition = isPosition ? entry : entry.position;
        if (!this.#isPosition(actualPosition)) {
          console.warn(`AnimationGroupAPI.getScheduled warning: No Position instance found at index: ${index2}.`);
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
    let index2 = -1;
    let callbackOptions;
    const hasDataCallback = typeof fromData === "function";
    const hasOptionCallback = typeof options === "function";
    const hasCallback = hasDataCallback || hasOptionCallback;
    if (hasCallback) {
      callbackOptions = { index: index2, position: void 0, data: void 0 };
    }
    let actualFromData = fromData;
    let actualOptions = options;
    if (isIterable(position)) {
      for (const entry of position) {
        index2++;
        const isPosition = this.#isPosition(entry);
        const actualPosition = isPosition ? entry : entry.position;
        if (!this.#isPosition(actualPosition)) {
          console.warn(`AnimationGroupAPI.from warning: No Position instance found at index: ${index2}.`);
          continue;
        }
        if (hasCallback) {
          callbackOptions.index = index2;
          callbackOptions.position = position;
          callbackOptions.data = isPosition ? void 0 : entry;
        }
        if (hasDataCallback) {
          actualFromData = fromData(callbackOptions);
          if (actualFromData === null || actualFromData === void 0) {
            continue;
          }
          if (typeof actualFromData !== "object") {
            throw new TypeError(`AnimationGroupAPI.from error: fromData callback function iteration(${index2}) failed to return an object.`);
          }
        }
        if (hasOptionCallback) {
          actualOptions = options(callbackOptions);
          if (actualOptions === null || actualOptions === void 0) {
            continue;
          }
          if (typeof actualOptions !== "object") {
            throw new TypeError(`AnimationGroupAPI.from error: options callback function iteration(${index2}) failed to return an object.`);
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
    let index2 = -1;
    let callbackOptions;
    const hasFromCallback = typeof fromData === "function";
    const hasToCallback = typeof toData === "function";
    const hasOptionCallback = typeof options === "function";
    const hasCallback = hasFromCallback || hasToCallback || hasOptionCallback;
    if (hasCallback) {
      callbackOptions = { index: index2, position: void 0, data: void 0 };
    }
    let actualFromData = fromData;
    let actualToData = toData;
    let actualOptions = options;
    if (isIterable(position)) {
      for (const entry of position) {
        index2++;
        const isPosition = this.#isPosition(entry);
        const actualPosition = isPosition ? entry : entry.position;
        if (!this.#isPosition(actualPosition)) {
          console.warn(`AnimationGroupAPI.fromTo warning: No Position instance found at index: ${index2}.`);
          continue;
        }
        if (hasCallback) {
          callbackOptions.index = index2;
          callbackOptions.position = position;
          callbackOptions.data = isPosition ? void 0 : entry;
        }
        if (hasFromCallback) {
          actualFromData = fromData(callbackOptions);
          if (actualFromData === null || actualFromData === void 0) {
            continue;
          }
          if (typeof actualFromData !== "object") {
            throw new TypeError(`AnimationGroupAPI.fromTo error: fromData callback function iteration(${index2}) failed to return an object.`);
          }
        }
        if (hasToCallback) {
          actualToData = toData(callbackOptions);
          if (actualToData === null || actualToData === void 0) {
            continue;
          }
          if (typeof actualToData !== "object") {
            throw new TypeError(`AnimationGroupAPI.fromTo error: toData callback function iteration(${index2}) failed to return an object.`);
          }
        }
        if (hasOptionCallback) {
          actualOptions = options(callbackOptions);
          if (actualOptions === null || actualOptions === void 0) {
            continue;
          }
          if (typeof actualOptions !== "object") {
            throw new TypeError(`AnimationGroupAPI.fromTo error: options callback function iteration(${index2}) failed to return an object.`);
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
    let index2 = -1;
    let callbackOptions;
    const hasDataCallback = typeof toData === "function";
    const hasOptionCallback = typeof options === "function";
    const hasCallback = hasDataCallback || hasOptionCallback;
    if (hasCallback) {
      callbackOptions = { index: index2, position: void 0, data: void 0 };
    }
    let actualToData = toData;
    let actualOptions = options;
    if (isIterable(position)) {
      for (const entry of position) {
        index2++;
        const isPosition = this.#isPosition(entry);
        const actualPosition = isPosition ? entry : entry.position;
        if (!this.#isPosition(actualPosition)) {
          console.warn(`AnimationGroupAPI.to warning: No Position instance found at index: ${index2}.`);
          continue;
        }
        if (hasCallback) {
          callbackOptions.index = index2;
          callbackOptions.position = position;
          callbackOptions.data = isPosition ? void 0 : entry;
        }
        if (hasDataCallback) {
          actualToData = toData(callbackOptions);
          if (actualToData === null || actualToData === void 0) {
            continue;
          }
          if (typeof actualToData !== "object") {
            throw new TypeError(`AnimationGroupAPI.to error: toData callback function iteration(${index2}) failed to return an object.`);
          }
        }
        if (hasOptionCallback) {
          actualOptions = options(callbackOptions);
          if (actualOptions === null || actualOptions === void 0) {
            continue;
          }
          if (typeof actualOptions !== "object") {
            throw new TypeError(`AnimationGroupAPI.to error: options callback function iteration(${index2}) failed to return an object.`);
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
    let index2 = -1;
    const hasOptionCallback = typeof options === "function";
    const callbackOptions = { index: index2, position: void 0, data: void 0 };
    let actualOptions = options;
    if (isIterable(position)) {
      for (const entry of position) {
        index2++;
        const isPosition = this.#isPosition(entry);
        const actualPosition = isPosition ? entry : entry.position;
        if (!this.#isPosition(actualPosition)) {
          console.warn(`AnimationGroupAPI.quickTo warning: No Position instance found at index: ${index2}.`);
          continue;
        }
        callbackOptions.index = index2;
        callbackOptions.position = position;
        callbackOptions.data = isPosition ? void 0 : entry;
        if (hasOptionCallback) {
          actualOptions = options(callbackOptions);
          if (actualOptions === null || actualOptions === void 0) {
            continue;
          }
          if (typeof actualOptions !== "object") {
            throw new TypeError(`AnimationGroupAPI.quickTo error: options callback function iteration(${index2}) failed to return an object.`);
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
    const quickToCB = /* @__PURE__ */ __name((...args) => {
      const argsLength = args.length;
      if (argsLength === 0) {
        return;
      }
      if (typeof args[0] === "function") {
        const dataCallback = args[0];
        index2 = -1;
        let cntr = 0;
        if (isIterable(position)) {
          for (const entry of position) {
            index2++;
            const isPosition = this.#isPosition(entry);
            const actualPosition = isPosition ? entry : entry.position;
            if (!this.#isPosition(actualPosition)) {
              continue;
            }
            callbackOptions.index = index2;
            callbackOptions.position = position;
            callbackOptions.data = isPosition ? void 0 : entry;
            const toData = dataCallback(callbackOptions);
            if (toData === null || toData === void 0) {
              continue;
            }
            const toDataIterable = isIterable(toData);
            if (!Number.isFinite(toData) && !toDataIterable && typeof toData !== "object") {
              throw new TypeError(`AnimationGroupAPI.quickTo error: toData callback function iteration(${index2}) failed to return a finite number, iterable list, or object.`);
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
          if (!Number.isFinite(toData) && !toDataIterable && typeof toData !== "object") {
            throw new TypeError(`AnimationGroupAPI.quickTo error: toData callback function iteration(${index2}) failed to return a finite number, iterable list, or object.`);
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
    }, "quickToCB");
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
          index2 = -1;
          let cntr = 0;
          for (const entry of position) {
            index2++;
            const isPosition = this.#isPosition(entry);
            const actualPosition = isPosition ? entry : entry.position;
            if (!this.#isPosition(actualPosition)) {
              console.warn(
                `AnimationGroupAPI.quickTo.options warning: No Position instance found at index: ${index2}.`
              );
              continue;
            }
            callbackOptions.index = index2;
            callbackOptions.position = position;
            callbackOptions.data = isPosition ? void 0 : entry;
            actualOptions = options2(callbackOptions);
            if (actualOptions === null || actualOptions === void 0) {
              continue;
            }
            if (typeof actualOptions !== "object") {
              throw new TypeError(
                `AnimationGroupAPI.quickTo.options error: options callback function iteration(${index2}) failed to return an object.`
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
}
__name(AnimationGroupAPI, "AnimationGroupAPI");
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
  constructor({ element: element2, lock = false, width, height } = {}) {
    this.element = element2;
    this.width = width;
    this.height = height;
    this.#lock = typeof lock === "boolean" ? lock : false;
  }
  get element() {
    return this.#element;
  }
  get height() {
    return this.#height;
  }
  get width() {
    return this.#width;
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
  getLeft(width) {
    const boundsWidth = this.#width ?? this.#element?.offsetWidth ?? globalThis.innerWidth;
    return (boundsWidth - width) / 2;
  }
  getTop(height) {
    const boundsHeight = this.#height ?? this.#element?.offsetHeight ?? globalThis.innerHeight;
    return (boundsHeight - height) / 2;
  }
}
__name(Centered, "Centered");
const browserCentered = new Centered();
const positionInitial = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Centered,
  browserCentered
}, Symbol.toStringTag, { value: "Module" }));
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
__name(PositionChangeSet, "PositionChangeSet");
class PositionData {
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
}
__name(PositionData, "PositionData");
class PositionStateAPI {
  /** @type {PositionData} */
  #data;
  /**
   * @type {Map<string, PositionDataExtended>}
   */
  #dataSaved = /* @__PURE__ */ new Map();
  /** @type {Position} */
  #position;
  /** @type {Transforms} */
  #transforms;
  constructor(position, data, transforms) {
    this.#position = position;
    this.#data = data;
    this.#transforms = transforms;
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
    return this.#dataSaved.get(name);
  }
  /**
   * Returns any associated default data.
   *
   * @returns {PositionDataExtended} Associated default data.
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
   * @returns {PositionDataExtended} Saved position data.
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
    if (typeof defaultData !== "object") {
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
   * @returns {PositionData} Current position data
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
   * @param {...*}     [opts.data] - Position data to set.
   */
  set({ name, ...data }) {
    if (typeof name !== "string") {
      throw new TypeError(`Position - set error: 'name' is not a string.`);
    }
    this.#dataSaved.set(name, data);
  }
}
__name(PositionStateAPI, "PositionStateAPI");
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
    const storeResizeObserved = writable$1(this.resizeObserved);
    this.stores = {
      element: writable$1(this.el),
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
}
__name(StyleCache, "StyleCache");
class TransformData {
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
   * Stores the individual transformed corner points of the window in screenspace clockwise from:
   * top left -> top right -> bottom right -> bottom left.
   *
   * @type {Vector3[]}
   */
  #corners = [vec3.create(), vec3.create(), vec3.create(), vec3.create()];
  /**
   * Stores the current gl-matrix mat4 data.
   *
   * @type {Matrix4}
   */
  #mat4 = mat4.create();
  /**
   * Stores the pre & post origin translations to apply to matrix transforms.
   *
   * @type {Matrix4[]}
   */
  #originTranslations = [mat4.create(), mat4.create()];
  /**
   * @returns {DOMRect} The bounding rectangle.
   */
  get boundingRect() {
    return this.#boundingRect;
  }
  /**
   * @returns {Vector3[]} The transformed corner points as vec3 in screen space.
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
   * @returns {Matrix4} The transform matrix.
   */
  get mat4() {
    return this.#mat4;
  }
  /**
   * @returns {Matrix4[]} The pre / post translation matrices for origin translation.
   */
  get originTranslations() {
    return this.#originTranslations;
  }
}
__name(TransformData, "TransformData");
class AdapterValidators {
  /** @type {boolean} */
  #enabled = true;
  /**
   * @type {ValidatorData[]}
   */
  #validatorData;
  #mapUnsubscribe = /* @__PURE__ */ new Map();
  /**
   * @returns {[AdapterValidators, ValidatorData[]]} Returns this and internal storage for validator adapter.
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
   * @returns {Generator<ValidatorData|undefined>} Generator / iterator of validators.
   * @yields {ValidatorData}
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
      const index2 = this.#validatorData.findIndex((value) => {
        return data.weight < value.weight;
      });
      if (index2 >= 0) {
        this.#validatorData.splice(index2, 0, data);
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
   * @param {...(ValidatorFn|ValidatorData)}   validators -
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
   * @param {function(*, ValidatorFn, number): boolean} callback - Callback function to evaluate each validator
   *                                                                  entry.
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
__name(AdapterValidators, "AdapterValidators");
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
   * @param {ValidationData}   valData - The associated validation data for position updates.
   *
   * @returns {PositionData} Potentially adjusted position data.
   */
  validator(valData) {
    if (!this.#enabled) {
      return valData.position;
    }
    const boundsWidth = this.#width ?? this.#element?.offsetWidth ?? globalThis.innerWidth;
    const boundsHeight = this.#height ?? this.#element?.offsetHeight ?? globalThis.innerHeight;
    if (typeof valData.position.width === "number") {
      const maxW = valData.maxWidth ?? (this.#constrain ? boundsWidth : Number.MAX_SAFE_INTEGER);
      valData.position.width = valData.width = Math.clamped(valData.position.width, valData.minWidth, maxW);
      if (valData.width + valData.position.left + valData.marginLeft > boundsWidth) {
        valData.position.left = boundsWidth - valData.width - valData.marginLeft;
      }
    }
    if (typeof valData.position.height === "number") {
      const maxH = valData.maxHeight ?? (this.#constrain ? boundsHeight : Number.MAX_SAFE_INTEGER);
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
}
__name(BasicBounds, "BasicBounds");
const s_TRANSFORM_DATA = new TransformData();
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
   * @param {ValidationData}   valData - The associated validation data for position updates.
   *
   * @returns {PositionData} Potentially adjusted position data.
   */
  validator(valData) {
    if (!this.#enabled) {
      return valData.position;
    }
    const boundsWidth = this.#width ?? this.#element?.offsetWidth ?? globalThis.innerWidth;
    const boundsHeight = this.#height ?? this.#element?.offsetHeight ?? globalThis.innerHeight;
    if (typeof valData.position.width === "number") {
      const maxW = valData.maxWidth ?? (this.#constrain ? boundsWidth : Number.MAX_SAFE_INTEGER);
      valData.position.width = Math.clamped(valData.width, valData.minWidth, maxW);
    }
    if (typeof valData.position.height === "number") {
      const maxH = valData.maxHeight ?? (this.#constrain ? boundsHeight : Number.MAX_SAFE_INTEGER);
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
}
__name(TransformBounds, "TransformBounds");
const basicWindow = new BasicBounds({ lock: true });
const transformWindow = new TransformBounds({ lock: true });
const positionValidators = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BasicBounds,
  TransformBounds,
  basicWindow,
  transformWindow
}, Symbol.toStringTag, { value: "Module" }));
const s_SCALE_VECTOR = [1, 1, 1];
const s_TRANSLATE_VECTOR = [0, 0, 0];
const s_MAT4_RESULT = mat4.create();
const s_MAT4_TEMP = mat4.create();
const s_VEC3_TEMP = vec3.create();
class Transforms {
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
        const index2 = this.#orderList.findIndex((entry) => entry === "rotateX");
        if (index2 >= 0) {
          this.#orderList.splice(index2, 1);
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
        const index2 = this.#orderList.findIndex((entry) => entry === "rotateY");
        if (index2 >= 0) {
          this.#orderList.splice(index2, 1);
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
        const index2 = this.#orderList.findIndex((entry) => entry === "rotateZ");
        if (index2 >= 0) {
          this.#orderList.splice(index2, 1);
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
        const index2 = this.#orderList.findIndex((entry) => entry === "scale");
        if (index2 >= 0) {
          this.#orderList.splice(index2, 1);
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
        const index2 = this.#orderList.findIndex((entry) => entry === "translateX");
        if (index2 >= 0) {
          this.#orderList.splice(index2, 1);
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
        const index2 = this.#orderList.findIndex((entry) => entry === "translateY");
        if (index2 >= 0) {
          this.#orderList.splice(index2, 1);
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
        const index2 = this.#orderList.findIndex((entry) => entry === "translateZ");
        if (index2 >= 0) {
          this.#orderList.splice(index2, 1);
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
    const orderList = this.#orderList;
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
    const orderList = this.#orderList;
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
          const index2 = this.#orderList.findIndex((entry) => entry === key);
          if (index2 >= 0) {
            this.#orderList.splice(index2, 1);
          }
          delete this._data[key];
        }
      }
    }
  }
}
__name(Transforms, "Transforms");
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
__name(s_GET_ORIGIN_TRANSLATION, "s_GET_ORIGIN_TRANSLATION");
class UpdateElementData {
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
    this.storeDimension = writable$1(this.dimensionData);
    this.storeTransform = writable$1(this.transformData, () => {
      this.options.transformSubscribed = true;
      return () => this.options.transformSubscribed = false;
    });
    this.queued = false;
    Object.seal(this.dimensionData);
  }
}
__name(UpdateElementData, "UpdateElementData");
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
__name(nextAnimationFrame, "nextAnimationFrame");
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
}
__name(UpdateElementManager, "UpdateElementManager");
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
__name(s_UPDATE_ELEMENT, "s_UPDATE_ELEMENT");
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
__name(s_UPDATE_ELEMENT_ORTHO, "s_UPDATE_ELEMENT_ORTHO");
function s_UPDATE_TRANSFORM(el, updateData) {
  s_VALIDATION_DATA$1.height = updateData.data.height !== "auto" ? updateData.data.height : updateData.styleCache.offsetHeight;
  s_VALIDATION_DATA$1.width = updateData.data.width !== "auto" ? updateData.data.width : updateData.styleCache.offsetWidth;
  s_VALIDATION_DATA$1.marginLeft = updateData.styleCache.marginLeft;
  s_VALIDATION_DATA$1.marginTop = updateData.styleCache.marginTop;
  updateData.transforms.getData(updateData.data, updateData.transformData, s_VALIDATION_DATA$1);
  updateData.storeTransform.set(updateData.transformData);
}
__name(s_UPDATE_TRANSFORM, "s_UPDATE_TRANSFORM");
const s_VALIDATION_DATA$1 = {
  height: void 0,
  width: void 0,
  marginLeft: void 0,
  marginTop: void 0
};
class Position {
  /**
   * @type {PositionData}
   */
  #data = new PositionData();
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
   * Stores the style attributes that changed on update.
   *
   * @type {PositionChangeSet}
   */
  #positionChangeSet = new PositionChangeSet();
  /**
   * Stores ongoing options that are set in the constructor or by transform store subscription.
   *
   * @type {PositionOptions}
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
   * @type {PositionParent}
   */
  #parent;
  /**
   * @type {StorePosition}
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
   * @type {(function(PositionData): void)[]}
   */
  #subscriptions = [];
  /**
   * @type {Transforms}
   */
  #transforms = new Transforms();
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
   * @type {ValidatorData[]}
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
   * @returns {{browserCentered?: Centered, Centered?: *}} Initial position helpers.
   */
  static get Initial() {
    return positionInitial;
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
    return positionValidators;
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
    if (!(position instanceof Position)) {
      throw new TypeError(`'position' is not an instance of Position.`);
    }
    const newPosition = new Position(options);
    newPosition.#options = Object.assign({}, position.#options, options);
    newPosition.#validators.add(...position.#validators);
    newPosition.set(position.#data);
    return newPosition;
  }
  /**
   * @param {PositionParent|PositionOptionsAll}   [parent] - A potential parent element or object w/ `elementTarget`
   *                                                      getter. May also be the PositionOptions object w/ 1 argument.
   *
   * @param {PositionOptionsAll}   [options] - Default values.
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
   * Returns the associated {@link PositionParent} instance.
   *
   * @returns {PositionParent} The PositionParent instance.
   */
  get parent() {
    return this.#parent;
  }
  /**
   * Returns the state API.
   *
   * @returns {PositionStateAPI} Position state API.
   */
  get state() {
    return this.#state;
  }
  /**
   * Returns the derived writable stores for individual data variables.
   *
   * @returns {StorePosition} Derived / writable stores.
   */
  get stores() {
    return this.#stores;
  }
  /**
   * Returns the transform data for the readable store.
   *
   * @returns {TransformData} Transform Data.
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
   * Sets the associated {@link PositionParent} instance. Resets the style cache and default data.
   *
   * @param {PositionParent|void} parent - A PositionParent instance.
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
   * @returns {string} transformOrigin
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
   * @param {string} transformOrigin -
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
   * @param {object|PositionData}  [position] - Target to assign current position data.
   *
   * @param {PositionGetOptions}   [options] - Defines options for specific keys and substituting null for numeric
   *                                           default values.
   *
   * @returns {PositionData} Passed in object with current position data.
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
   * @returns {PositionData} Current position data.
   */
  toJSON() {
    return Object.assign({}, this.#data);
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
    if (typeof position !== "object") {
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
      if (typeof defaultData !== "object") {
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
   *
   * @param {function(PositionData): void} handler - Callback function that is invoked on update / changes. Receives
   *                                                 a copy of the PositionData.
   *
   * @returns {(function(): void)} Unsubscribe function.
   */
  subscribe(handler) {
    this.#subscriptions.push(handler);
    handler(Object.assign({}, this.#data));
    return () => {
      const index2 = this.#subscriptions.findIndex((sub) => sub === handler);
      if (index2 >= 0) {
        this.#subscriptions.splice(index2, 1);
      }
    };
  }
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
__name(Position, "Position");
const s_DATA_UPDATE = new PositionData();
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
class ApplicationState {
  /** @type {ApplicationShellExt} */
  #application;
  /** @type {Map<string, ApplicationStateData>} */
  #dataSaved = /* @__PURE__ */ new Map();
  /**
   * @param {ApplicationShellExt}   application - The application.
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
   * @param {string}   name - Saved data set name.
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
    interpolate = lerp$5
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
   * @returns {ApplicationShellExt|Promise<ApplicationShellExt>} When synchronous the application or Promise when
   *                                                             animating resolving with application.
   */
  set(data, { async = false, animateTo = false, duration = 0.1, ease = identity, interpolate = lerp$5 } = {}) {
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
__name(ApplicationState, "ApplicationState");
class GetSvelteData {
  /**
   * @type {MountedAppShell[]|null[]}
   */
  #applicationShellHolder;
  /**
   * @type {SvelteData[]}
   */
  #svelteData;
  /**
   * Keep a direct reference to the SvelteData array in an associated {@link SvelteApplication}.
   *
   * @param {MountedAppShell[]|null[]}  applicationShellHolder - A reference to the MountedAppShell array.
   *
   * @param {SvelteData[]}  svelteData - A reference to the SvelteData array of mounted components.
   */
  constructor(applicationShellHolder, svelteData) {
    this.#applicationShellHolder = applicationShellHolder;
    this.#svelteData = svelteData;
  }
  /**
   * Returns any mounted {@link MountedAppShell}.
   *
   * @returns {MountedAppShell|null} Any mounted application shell.
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
  component(index2) {
    const data = this.#svelteData[index2];
    return isObject(data) ? data?.component : void 0;
  }
  /**
   * Returns the Svelte component entries iterator.
   *
   * @returns {Generator<Array<number|SvelteComponent>>} Svelte component entries iterator.
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
   * @returns {Generator<SvelteComponent>} Svelte component values iterator.
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
   * @param {number}   index -
   *
   * @returns {SvelteData} The loaded Svelte config + component.
   */
  data(index2) {
    return this.#svelteData[index2];
  }
  /**
   * Returns the {@link SvelteData} instance for a given component.
   *
   * @param {object} component - Svelte component.
   *
   * @returns {SvelteData} -  The loaded Svelte config + component.
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
   * @returns {IterableIterator<[number, SvelteData]>} SvelteData entries iterator.
   */
  dataEntries() {
    return this.#svelteData.entries();
  }
  /**
   * Returns the SvelteData values iterator.
   *
   * @returns {IterableIterator<SvelteData>} SvelteData values iterator.
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
__name(GetSvelteData, "GetSvelteData");
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
__name(loadSvelteConfig, "loadSvelteConfig");
class SvelteReactive {
  /**
   * @type {SvelteApplication}
   */
  #application;
  /**
   * @type {boolean}
   */
  #initialized = false;
  /** @type {TJSSessionStorage} */
  #sessionStorage;
  /**
   * The Application option store which is injected into mounted Svelte component context under the `external` key.
   *
   * @type {StoreAppOptions}
   */
  #storeAppOptions;
  /**
   * Stores the update function for `#storeAppOptions`.
   *
   * @type {import('svelte/store').Writable.update}
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
   * @type {StoreUIOptions}
   */
  #storeUIState;
  /**
   * Stores the update function for `#storeUIState`.
   *
   * @type {import('svelte/store').Writable.update}
   */
  #storeUIStateUpdate;
  /**
   * Stores the unsubscribe functions from local store subscriptions.
   *
   * @type {import('svelte/store').Unsubscriber[]}
   */
  #storeUnsubscribe = [];
  /**
   * @param {SvelteApplication} application - The host Foundry application.
   */
  constructor(application) {
    this.#application = application;
    const optionsSessionStorage = application?.options?.sessionStorage;
    if (optionsSessionStorage !== void 0 && !(optionsSessionStorage instanceof TJSSessionStorage)) {
      throw new TypeError(`'options.sessionStorage' is not an instance of TJSSessionStorage.`);
    }
    this.#sessionStorage = optionsSessionStorage !== void 0 ? optionsSessionStorage : new TJSSessionStorage();
  }
  /**
   * Initializes reactive support. Package private for internal use.
   *
   * @returns {SvelteStores|void} Internal methods to interact with Svelte stores.
   * @package
   */
  initialize() {
    if (this.#initialized) {
      return;
    }
    this.#initialized = true;
    this.#storesInitialize();
    return {
      appOptionsUpdate: this.#storeAppOptionsUpdate,
      uiOptionsUpdate: this.#storeUIStateUpdate,
      subscribe: this.#storesSubscribe.bind(this),
      unsubscribe: this.#storesUnsubscribe.bind(this)
    };
  }
  // Store getters -----------------------------------------------------------------------------------------------------
  /**
   * @returns {TJSSessionStorage} Returns TJSSessionStorage instance.
   */
  get sessionStorage() {
    return this.#sessionStorage;
  }
  /**
   * Returns the store for app options.
   *
   * @returns {StoreAppOptions} App options store.
   */
  get storeAppOptions() {
    return this.#storeAppOptions;
  }
  /**
   * Returns the store for UI options.
   *
   * @returns {StoreUIOptions} UI options store.
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
   * @param {*}        value - Value to set.
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
   * ` storeUIState`.
   */
  #storesInitialize() {
    const writableAppOptions = writable$1(this.#application.options);
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
    const writableUIOptions = writable$1(this.#dataUIState);
    this.#storeUIStateUpdate = writableUIOptions.update;
    const storeUIState = {
      subscribe: writableUIOptions.subscribe,
      dragging: propertyStore(writableUIOptions, "dragging"),
      headerButtons: derived(writableUIOptions, ($options, set) => set($options.headerButtons)),
      minimized: derived(writableUIOptions, ($options, set) => set($options.minimized)),
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
   * @param {object} opts - Optional parameters (for internal use)
   *
   * @param {boolean} opts.headerButtonNoClose - The value for `headerButtonNoClose`.
   *
   * @param {boolean} opts.headerButtonNoLabel - The value for `headerButtonNoLabel`.
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
__name(SvelteReactive, "SvelteReactive");
class SvelteApplication extends Application {
  /**
   * Stores the first mounted component which follows the application shell contract.
   *
   * @type {MountedAppShell[]|null[]} Application shell.
   */
  #applicationShellHolder = [null];
  /**
   * Stores and manages application state for saving / restoring / serializing.
   *
   * @type {ApplicationState}
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
   * @type {Position}
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
   * @type {SvelteData[]}
   */
  #svelteData = [];
  /**
   * Provides a helper class that combines multiple methods for interacting with the mounted components tracked in
   * {@link SvelteData}.
   *
   * @type {GetSvelteData}
   */
  #getSvelteData = new GetSvelteData(this.#applicationShellHolder, this.#svelteData);
  /**
   * Contains methods to interact with the Svelte stores.
   *
   * @type {SvelteStores}
   */
  #stores;
  /**
   * @param {SvelteApplicationOptions} options - The options for the application.
   *
   * @inheritDoc
   */
  constructor(options = {}) {
    super(options);
    this.#applicationState = new ApplicationState(this);
    this.#position = new Position(this, {
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
   * @returns {SvelteReactive} The reactive accessors & Svelte stores.
   */
  get reactive() {
    return this.#reactive;
  }
  /**
   * Returns the application state manager.
   *
   * @returns {ApplicationState} The application state manager.
   */
  get state() {
    return this.#applicationState;
  }
  /**
   * Returns the Svelte helper class w/ various methods to access mounted Svelte components.
   *
   * @returns {GetSvelteData} GetSvelteData
   */
  get svelte() {
    return this.#getSvelteData;
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
    super._activateCoreListeners(typeof this.options.template === "string" ? html : [this.#elementTarget]);
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
    for (const entry of this.#svelteData) {
      svelteDestroyPromises.push(outroAndDestroy(entry.component));
      const eventbus = entry.config.eventbus;
      if (isObject(eventbus) && typeof eventbus.off === "function") {
        eventbus.off();
        entry.config.eventbus = void 0;
      }
    }
    await Promise.all(svelteDestroyPromises);
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
    this.#stores.uiOptionsUpdate((storeOptions) => deepMerge(storeOptions, { minimized: this._minimized }));
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
    if (this.popOut && html.length === 0 && Array.isArray(this.options.svelte)) {
      throw new Error(
        "SvelteApplication - _injectHTML - A popout app with no template can only support one Svelte component."
      );
    }
    this.reactive.updateHeaderButtons();
    const elementRootUpdate = /* @__PURE__ */ __name(() => {
      let cntr = 0;
      return (elementRoot) => {
        if (elementRoot !== null && elementRoot !== void 0 && cntr++ > 0) {
          this.#updateApplicationShell();
          return true;
        }
        return false;
      };
    }, "elementRootUpdate");
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
    this.#stores.uiOptionsUpdate((options) => deepMerge(options, { minimized: false }));
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
    this.#stores.uiOptionsUpdate((options) => deepMerge(options, { minimized: true }));
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
   * @param {object}      [opts] - Optional parameters.
   *
   * @param {HTMLElement} [opts.element] - HTMLElement container for main application element.
   *
   * @param {HTMLElement} [opts.elementContent] - HTMLElement container for content area of application shells.
   *
   * @param {HTMLElement} [opts.elementTarget] - HTMLElement container for main application target element.
   */
  onSvelteMount({ element: element2, elementContent, elementTarget } = {}) {
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
  onSvelteRemount({ element: element2, elementContent, elementTarget } = {}) {
  }
  // eslint-disable-line no-unused-vars
  /**
   * Override replacing HTML as Svelte components control the rendering process. Only potentially change the outer
   * application frame / title for pop-out applications.
   *
   * @inheritDoc
   * @ignore
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
   * cycle {@link Position.set}.
   *
   * @inheritDoc
   * @protected
   * @ignore
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
    if (!this.#onMount) {
      this.onSvelteMount({ element: this._element[0], elementContent: this.#elementContent, elementTarget: this.#elementTarget });
      this.#onMount = true;
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
    this.#initialZIndex = html[0].style.zIndex;
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
      super._activateCoreListeners([this.#elementTarget]);
      this.onSvelteRemount({ element: this._element[0], elementContent: this.#elementContent, elementTarget: this.#elementTarget });
    }
  }
}
__name(SvelteApplication, "SvelteApplication");
const s_STYLE_KEY$1 = "#__trl-root-styles";
const cssVariables$1 = new StyleManager({ docKey: s_STYLE_KEY$1, version: 1 });
const TJSContainer_svelte_svelte_type_style_lang = "";
function resizeObserver(node, target) {
  ResizeObserverManager.add(node, target);
  return {
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
__name(resizeObserver, "resizeObserver");
resizeObserver.updateCache = function(el) {
  if (!(el instanceof HTMLElement)) {
    throw new TypeError(`resizeObserverUpdate error: 'el' is not an HTMLElement.`);
  }
  const subscribers = s_MAP.get(el);
  if (Array.isArray(subscribers)) {
    const computed = globalThis.getComputedStyle(el);
    const borderBottom = styleParsePixels(el.style.borderBottom) ?? styleParsePixels(computed.borderBottom) ?? 0;
    const borderLeft = styleParsePixels(el.style.borderLeft) ?? styleParsePixels(computed.borderLeft) ?? 0;
    const borderRight = styleParsePixels(el.style.borderRight) ?? styleParsePixels(computed.borderRight) ?? 0;
    const borderTop = styleParsePixels(el.style.borderTop) ?? styleParsePixels(computed.borderTop) ?? 0;
    const paddingBottom = styleParsePixels(el.style.paddingBottom) ?? styleParsePixels(computed.paddingBottom) ?? 0;
    const paddingLeft = styleParsePixels(el.style.paddingLeft) ?? styleParsePixels(computed.paddingLeft) ?? 0;
    const paddingRight = styleParsePixels(el.style.paddingRight) ?? styleParsePixels(computed.paddingRight) ?? 0;
    const paddingTop = styleParsePixels(el.style.paddingTop) ?? styleParsePixels(computed.paddingTop) ?? 0;
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
    const borderBottom = styleParsePixels(el.style.borderBottom) ?? styleParsePixels(computed.borderBottom) ?? 0;
    const borderLeft = styleParsePixels(el.style.borderLeft) ?? styleParsePixels(computed.borderLeft) ?? 0;
    const borderRight = styleParsePixels(el.style.borderRight) ?? styleParsePixels(computed.borderRight) ?? 0;
    const borderTop = styleParsePixels(el.style.borderTop) ?? styleParsePixels(computed.borderTop) ?? 0;
    const paddingBottom = styleParsePixels(el.style.paddingBottom) ?? styleParsePixels(computed.paddingBottom) ?? 0;
    const paddingLeft = styleParsePixels(el.style.paddingLeft) ?? styleParsePixels(computed.paddingLeft) ?? 0;
    const paddingRight = styleParsePixels(el.style.paddingRight) ?? styleParsePixels(computed.paddingRight) ?? 0;
    const paddingTop = styleParsePixels(el.style.paddingTop) ?? styleParsePixels(computed.paddingTop) ?? 0;
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
      const index2 = subscribers.findIndex((entry) => entry.target === target);
      if (index2 >= 0) {
        s_UPDATE_SUBSCRIBER(subscribers[index2], void 0, void 0);
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        s_MAP.delete(el);
        s_RESIZE_OBSERVER.unobserve(el);
      }
    }
  }
}
__name(ResizeObserverManager, "ResizeObserverManager");
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
__name(s_GET_UPDATE_TYPE, "s_GET_UPDATE_TYPE");
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
__name(s_UPDATE_SUBSCRIBER, "s_UPDATE_SUBSCRIBER");
function applyStyles(node, properties) {
  function setProperties() {
    if (typeof properties !== "object") {
      return;
    }
    for (const prop of Object.keys(properties)) {
      node.style.setProperty(`${prop}`, properties[prop]);
    }
  }
  __name(setProperties, "setProperties");
  setProperties();
  return {
    update(newProperties) {
      properties = newProperties;
      setProperties();
    }
  };
}
__name(applyStyles, "applyStyles");
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
  let initialPosition = null;
  let initialDragPoint = {};
  let dragging = false;
  let quickTo = position.animate.quickTo(["top", "left"], easeOptions);
  const handlers = {
    dragDown: ["pointerdown", (e) => onDragPointerDown(e), false],
    dragMove: ["pointermove", (e) => onDragPointerChange(e), false],
    dragUp: ["pointerup", (e) => onDragPointerUp(e), false]
  };
  function activateListeners() {
    node.addEventListener(...handlers.dragDown);
    node.classList.add("draggable");
  }
  __name(activateListeners, "activateListeners");
  function removeListeners() {
    if (typeof storeDragging?.set === "function") {
      storeDragging.set(false);
    }
    node.removeEventListener(...handlers.dragDown);
    node.removeEventListener(...handlers.dragMove);
    node.removeEventListener(...handlers.dragUp);
    node.classList.remove("draggable");
  }
  __name(removeListeners, "removeListeners");
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
  __name(onDragPointerDown, "onDragPointerDown");
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
      s_POSITION_DATA.left = newLeft;
      s_POSITION_DATA.top = newTop;
      position.set(s_POSITION_DATA);
    }
  }
  __name(onDragPointerChange, "onDragPointerChange");
  function onDragPointerUp(event) {
    event.preventDefault();
    dragging = false;
    if (typeof storeDragging?.set === "function") {
      storeDragging.set(false);
    }
    node.removeEventListener(...handlers.dragMove);
    node.removeEventListener(...handlers.dragUp);
  }
  __name(onDragPointerUp, "onDragPointerUp");
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
__name(draggable, "draggable");
class DraggableOptions {
  #ease = false;
  #easeOptions = { duration: 0.1, ease: cubicOut };
  /**
   * Stores the subscribers.
   *
   * @type {(function(DraggableOptions): void)[]}
   */
  #subscriptions = [];
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
        if (newEaseOptions === null || typeof newEaseOptions !== "object") {
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
   * @param {function(DraggableOptions): void} handler - Callback function that is invoked on update / changes.
   *                                                 Receives the DraggableOptions object / instance.
   *
   * @returns {(function(): void)} Unsubscribe function.
   */
  subscribe(handler) {
    this.#subscriptions.push(handler);
    handler(this);
    return () => {
      const index2 = this.#subscriptions.findIndex((sub) => sub === handler);
      if (index2 >= 0) {
        this.#subscriptions.splice(index2, 1);
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
__name(DraggableOptions, "DraggableOptions");
draggable.options = (options) => new DraggableOptions(options);
const s_POSITION_DATA = { left: 0, top: 0 };
function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}
__name(fade, "fade");
function slide(node, { delay = 0, duration = 400, easing = cubicOut, axis = "y" } = {}) {
  const style2 = getComputedStyle(node);
  const opacity = +style2.opacity;
  const primary_property = axis === "y" ? "height" : "width";
  const primary_property_value = parseFloat(style2[primary_property]);
  const secondary_properties = axis === "y" ? ["top", "bottom"] : ["left", "right"];
  const capitalized_secondary_properties = secondary_properties.map((e) => `${e[0].toUpperCase()}${e.slice(1)}`);
  const padding_start_value = parseFloat(style2[`padding${capitalized_secondary_properties[0]}`]);
  const padding_end_value = parseFloat(style2[`padding${capitalized_secondary_properties[1]}`]);
  const margin_start_value = parseFloat(style2[`margin${capitalized_secondary_properties[0]}`]);
  const margin_end_value = parseFloat(style2[`margin${capitalized_secondary_properties[1]}`]);
  const border_width_start_value = parseFloat(style2[`border${capitalized_secondary_properties[0]}Width`]);
  const border_width_end_value = parseFloat(style2[`border${capitalized_secondary_properties[1]}Width`]);
  return {
    delay,
    duration,
    easing,
    css: (t) => `overflow: hidden;opacity: ${Math.min(t * 20, 1) * opacity};${primary_property}: ${t * primary_property_value}px;padding-${secondary_properties[0]}: ${t * padding_start_value}px;padding-${secondary_properties[1]}: ${t * padding_end_value}px;margin-${secondary_properties[0]}: ${t * margin_start_value}px;margin-${secondary_properties[1]}: ${t * margin_end_value}px;border-${secondary_properties[0]}-width: ${t * border_width_start_value}px;border-${secondary_properties[1]}-width: ${t * border_width_end_value}px;`
  };
}
__name(slide, "slide");
const s_DEFAULT_TRANSITION = /* @__PURE__ */ __name(() => void 0, "s_DEFAULT_TRANSITION");
const s_DEFAULT_TRANSITION_OPTIONS = {};
const TJSGlassPane_svelte_svelte_type_style_lang = "";
function create_else_block$6(ctx) {
  let div;
  let applyStyles_action;
  let div_intro;
  let div_outro;
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
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      attr(div, "class", "tjs-glass-pane-background svelte-hqedxf");
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
      ctx[22](div);
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
        262144)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx,
            /*$$scope*/
            ctx[18],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx[18]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx[18],
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
      if (detaching)
        detach(div);
      if (default_slot)
        default_slot.d(detaching);
      ctx[22](null);
      if (detaching && div_outro)
        div_outro.end();
      mounted = false;
      dispose();
    }
  };
}
__name(create_else_block$6, "create_else_block$6");
function create_if_block$d(ctx) {
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
    ctx[19].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[18],
    null
  );
  return {
    c() {
      div0 = element("div");
      t = space();
      div1 = element("div");
      if (default_slot)
        default_slot.c();
      attr(div0, "class", "tjs-glass-pane-background svelte-hqedxf");
      set_style(
        div0,
        "background",
        /*background*/
        ctx[5]
      );
      attr(div1, "class", "tjs-glass-pane-container svelte-hqedxf");
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      ctx[20](div0);
      insert(target, t, anchor);
      insert(target, div1, anchor);
      if (default_slot) {
        default_slot.m(div1, null);
      }
      ctx[21](div1);
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
        262144)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx,
            /*$$scope*/
            ctx[18],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx[18]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx[18],
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
      if (detaching)
        detach(div0);
      ctx[20](null);
      if (detaching && div0_outro)
        div0_outro.end();
      if (detaching)
        detach(t);
      if (detaching)
        detach(div1);
      if (default_slot)
        default_slot.d(detaching);
      ctx[21](null);
      mounted = false;
      dispose();
    }
  };
}
__name(create_if_block$d, "create_if_block$d");
function create_fragment$w(ctx) {
  let div;
  let current_block_type_index;
  let if_block;
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block$d, create_else_block$6];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*slotSeparate*/
      ctx2[0]
    )
      return 0;
    return 1;
  }
  __name(select_block_type, "select_block_type");
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
      attr(div, "class", "tjs-glass-pane svelte-hqedxf");
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
      ctx[23](div);
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
      if (detaching)
        detach(div);
      if_blocks[current_block_type_index].d();
      ctx[23](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
__name(create_fragment$w, "create_fragment$w");
function instance$v($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { background = "#50505080" } = $$props;
  let { captureInput = true } = $$props;
  let { id = void 0 } = $$props;
  let { slotSeparate = void 0 } = $$props;
  let { styles = void 0 } = $$props;
  let { zIndex = Number.MAX_SAFE_INTEGER } = $$props;
  let backgroundEl, containerEl, glassPaneEl;
  let { transition = void 0 } = $$props;
  let { inTransition = s_DEFAULT_TRANSITION } = $$props;
  let { outTransition = s_DEFAULT_TRANSITION } = $$props;
  let { transitionOptions = void 0 } = $$props;
  let { inTransitionOptions = s_DEFAULT_TRANSITION_OPTIONS } = $$props;
  let { outTransitionOptions = s_DEFAULT_TRANSITION_OPTIONS } = $$props;
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
  }
  __name(swallow, "swallow");
  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      backgroundEl = $$value;
      $$invalidate(9, backgroundEl);
    });
  }
  __name(div0_binding, "div0_binding");
  function div1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      containerEl = $$value;
      $$invalidate(10, containerEl);
    });
  }
  __name(div1_binding, "div1_binding");
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      backgroundEl = $$value;
      $$invalidate(9, backgroundEl);
    });
  }
  __name(div_binding, "div_binding");
  function div_binding_1($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      glassPaneEl = $$value;
      $$invalidate(11, glassPaneEl);
    });
  }
  __name(div_binding_1, "div_binding_1");
  $$self.$$set = ($$props2) => {
    if ("background" in $$props2)
      $$invalidate(5, background = $$props2.background);
    if ("captureInput" in $$props2)
      $$invalidate(13, captureInput = $$props2.captureInput);
    if ("id" in $$props2)
      $$invalidate(6, id = $$props2.id);
    if ("slotSeparate" in $$props2)
      $$invalidate(0, slotSeparate = $$props2.slotSeparate);
    if ("styles" in $$props2)
      $$invalidate(7, styles = $$props2.styles);
    if ("zIndex" in $$props2)
      $$invalidate(8, zIndex = $$props2.zIndex);
    if ("transition" in $$props2)
      $$invalidate(14, transition = $$props2.transition);
    if ("inTransition" in $$props2)
      $$invalidate(1, inTransition = $$props2.inTransition);
    if ("outTransition" in $$props2)
      $$invalidate(2, outTransition = $$props2.outTransition);
    if ("transitionOptions" in $$props2)
      $$invalidate(15, transitionOptions = $$props2.transitionOptions);
    if ("inTransitionOptions" in $$props2)
      $$invalidate(3, inTransitionOptions = $$props2.inTransitionOptions);
    if ("outTransitionOptions" in $$props2)
      $$invalidate(4, outTransitionOptions = $$props2.outTransitionOptions);
    if ("$$scope" in $$props2)
      $$invalidate(18, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*slotSeparate*/
    1) {
      $$invalidate(0, slotSeparate = typeof slotSeparate === "boolean" ? slotSeparate : false);
    }
    if ($$self.$$.dirty & /*oldTransition, transition*/
    81920) {
      if (oldTransition !== transition) {
        const newTransition = s_DEFAULT_TRANSITION !== transition && typeof transition === "function" ? transition : s_DEFAULT_TRANSITION;
        $$invalidate(1, inTransition = newTransition);
        $$invalidate(2, outTransition = newTransition);
        $$invalidate(16, oldTransition = newTransition);
      }
    }
    if ($$self.$$.dirty & /*oldTransitionOptions, transitionOptions*/
    163840) {
      if (oldTransitionOptions !== transitionOptions) {
        const newOptions = transitionOptions !== s_DEFAULT_TRANSITION_OPTIONS && isObject(transitionOptions) ? transitionOptions : s_DEFAULT_TRANSITION_OPTIONS;
        $$invalidate(3, inTransitionOptions = newOptions);
        $$invalidate(4, outTransitionOptions = newOptions);
        $$invalidate(17, oldTransitionOptions = newOptions);
      }
    }
    if ($$self.$$.dirty & /*inTransition*/
    2) {
      if (typeof inTransition !== "function") {
        $$invalidate(1, inTransition = s_DEFAULT_TRANSITION);
      }
    }
    if ($$self.$$.dirty & /*outTransition*/
    4) {
      if (typeof outTransition !== "function") {
        $$invalidate(2, outTransition = s_DEFAULT_TRANSITION);
      }
    }
    if ($$self.$$.dirty & /*inTransitionOptions*/
    8) {
      if (typeof inTransitionOptions !== "object") {
        $$invalidate(3, inTransitionOptions = s_DEFAULT_TRANSITION_OPTIONS);
      }
    }
    if ($$self.$$.dirty & /*outTransitionOptions*/
    16) {
      if (typeof outTransitionOptions !== "object") {
        $$invalidate(4, outTransitionOptions = s_DEFAULT_TRANSITION_OPTIONS);
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
__name(instance$v, "instance$v");
class TJSGlassPane extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$v, create_fragment$w, safe_not_equal, {
      background: 5,
      captureInput: 13,
      id: 6,
      slotSeparate: 0,
      styles: 7,
      zIndex: 8,
      transition: 14,
      inTransition: 1,
      outTransition: 2,
      transitionOptions: 15,
      inTransitionOptions: 3,
      outTransitionOptions: 4
    });
  }
}
__name(TJSGlassPane, "TJSGlassPane");
class AppShellContextInternal {
  /** @type {InternalAppStores} */
  #stores;
  constructor() {
    this.#stores = {
      elementContent: writable$1(void 0),
      elementRoot: writable$1(void 0)
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
__name(AppShellContextInternal, "AppShellContextInternal");
const TJSHeaderButton_svelte_svelte_type_style_lang = "";
function create_if_block$c(ctx) {
  let span;
  let t;
  return {
    c() {
      span = element("span");
      t = text(
        /*label*/
        ctx[3]
      );
      attr(span, "class", "svelte-166l8wd");
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
      if (detaching)
        detach(span);
    }
  };
}
__name(create_if_block$c, "create_if_block$c");
function create_fragment$v(ctx) {
  let a;
  let html_tag;
  let html_anchor;
  let a_class_value;
  let applyStyles_action;
  let mounted;
  let dispose;
  let if_block = (
    /*label*/
    ctx[3] && create_if_block$c(ctx)
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
      ctx[0].class + " svelte-166l8wd");
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
          if_block = create_if_block$c(ctx2);
          if_block.c();
          if_block.m(a, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty & /*button*/
      1 && a_class_value !== (a_class_value = "header-button " + /*button*/
      ctx2[0].class + " svelte-166l8wd")) {
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
      if (detaching)
        detach(a);
      if (if_block)
        if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
__name(create_fragment$v, "create_fragment$v");
const s_REGEX_HTML$1 = /^\s*<.*>$/;
function instance$u($$self, $$props, $$invalidate) {
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
  __name(onClick, "onClick");
  function onContextMenu(event) {
    const invoke = button?.onContextMenu;
    if (typeof invoke === "function") {
      invoke.call(button, event);
      $$invalidate(0, button);
    }
  }
  __name(onContextMenu, "onContextMenu");
  function onKeydown(event) {
    if (event.code === keyCode) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  __name(onKeydown, "onKeydown");
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
  __name(onKeyup, "onKeyup");
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
__name(instance$u, "instance$u");
class TJSHeaderButton extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$u, create_fragment$v, safe_not_equal, { button: 0 });
  }
  get button() {
    return this.$$.ctx[0];
  }
  set button(button) {
    this.$$set({ button });
    flush();
  }
}
__name(TJSHeaderButton, "TJSHeaderButton");
const TJSApplicationHeader_svelte_svelte_type_style_lang = "";
function get_each_context$9(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[31] = list[i];
  return child_ctx;
}
__name(get_each_context$9, "get_each_context$9");
function get_each_context_1$3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[31] = list[i];
  return child_ctx;
}
__name(get_each_context_1$3, "get_each_context_1$3");
function create_if_block$b(ctx) {
  let img;
  let img_src_value;
  return {
    c() {
      img = element("img");
      attr(img, "class", "tjs-app-icon keep-minimized svelte-1wviwl9");
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
      if (detaching)
        detach(img);
    }
  };
}
__name(create_if_block$b, "create_if_block$b");
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
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return { props: switch_instance_props };
  }
  __name(switch_props, "switch_props");
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props());
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
      const switch_instance_changes = dirty[0] & /*buttonsLeft*/
      2 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(
        /*button*/
        ctx2[31].props
      )]) : {};
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
          switch_instance = construct_svelte_component(switch_value, switch_props());
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
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
__name(create_each_block_1$3, "create_each_block_1$3");
function create_each_block$9(ctx) {
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
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return { props: switch_instance_props };
  }
  __name(switch_props, "switch_props");
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props());
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
      const switch_instance_changes = dirty[0] & /*buttonsRight*/
      4 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(
        /*button*/
        ctx2[31].props
      )]) : {};
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
          switch_instance = construct_svelte_component(switch_value, switch_props());
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
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
__name(create_each_block$9, "create_each_block$9");
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
  ctx[6] === "string" && create_if_block$b(ctx);
  let each_value_1 = (
    /*buttonsLeft*/
    ctx[1]
  );
  let each_blocks_1 = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks_1[i] = create_each_block_1$3(get_each_context_1$3(ctx, each_value_1, i));
  }
  const out = /* @__PURE__ */ __name((i) => transition_out(each_blocks_1[i], 1, 1, () => {
    each_blocks_1[i] = null;
  }), "out");
  let each_value = (
    /*buttonsRight*/
    ctx[2]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$9(get_each_context$9(ctx, each_value, i));
  }
  const out_1 = /* @__PURE__ */ __name((i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  }), "out_1");
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
      attr(h4, "class", "window-title svelte-1wviwl9");
      set_style(
        h4,
        "display",
        /*displayHeaderTitle*/
        ctx[4]
      );
      attr(span, "class", "tjs-window-header-spacer keep-minimized svelte-1wviwl9");
      attr(header, "class", "window-header flexrow svelte-1wviwl9");
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
          if_block = create_if_block$b(ctx2);
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
        each_value_1 = /*buttonsLeft*/
        ctx2[1];
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
        each_value = /*buttonsRight*/
        ctx2[2];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$9(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$9(child_ctx);
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
      if (detaching)
        detach(header);
      if (if_block)
        if_block.d();
      destroy_each(each_blocks_1, detaching);
      destroy_each(each_blocks, detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
__name(create_key_block, "create_key_block");
function create_fragment$u(ctx) {
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
      if (detaching)
        detach(key_block_anchor);
      key_block.d(detaching);
    }
  };
}
__name(create_fragment$u, "create_fragment$u");
function instance$t($$self, $$props, $$invalidate) {
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
    const callback = /* @__PURE__ */ __name((event) => {
      if (event.target.classList.contains("window-title") || event.target.classList.contains("window-header") || event.target.classList.contains("keep-minimized")) {
        application._onToggleMinimize(event);
      }
    }, "callback");
    function activateListeners() {
      node.addEventListener("dblclick", callback);
    }
    __name(activateListeners, "activateListeners");
    function removeListeners() {
      node.removeEventListener("dblclick", callback);
    }
    __name(removeListeners, "removeListeners");
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
  __name(minimizable, "minimizable");
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
  __name(onPointerdown, "onPointerdown");
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
            class: TJSHeaderButton,
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
__name(instance$t, "instance$t");
class TJSApplicationHeader extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$t, create_fragment$u, safe_not_equal, { draggable: 0, draggableOptions: 20 }, null, [-1, -1]);
  }
}
__name(TJSApplicationHeader, "TJSApplicationHeader");
const TJSFocusWrap_svelte_svelte_type_style_lang = "";
function create_fragment$t(ctx) {
  let div;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      attr(div, "class", "tjs-focus-wrap svelte-kjcljd");
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
      if (detaching)
        detach(div);
      ctx[4](null);
      mounted = false;
      dispose();
    }
  };
}
__name(create_fragment$t, "create_fragment$t");
function instance$s($$self, $$props, $$invalidate) {
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
  __name(onFocus, "onFocus");
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      wrapEl = $$value;
      $$invalidate(0, wrapEl);
    });
  }
  __name(div_binding, "div_binding");
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
__name(instance$s, "instance$s");
class TJSFocusWrap extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$s, create_fragment$t, safe_not_equal, { elementRoot: 2, enabled: 3 });
  }
}
__name(TJSFocusWrap, "TJSFocusWrap");
function create_fragment$s(ctx) {
  let div;
  let resizable_action;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<i class="fas fa-arrows-alt-h"></i>`;
      attr(div, "class", "window-resizable-handle");
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
      if (detaching)
        detach(div);
      ctx[10](null);
      mounted = false;
      dispose();
    }
  };
}
__name(create_fragment$s, "create_fragment$s");
function instance$r($$self, $$props, $$invalidate) {
  let $storeElementRoot;
  let $storeMinimized;
  let $storeResizable;
  let { isResizable = false } = $$props;
  const application = getContext("#external").application;
  const storeElementRoot = getContext("storeElementRoot");
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
    __name(activateListeners, "activateListeners");
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
    __name(removeListeners, "removeListeners");
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
    __name(onResizePointerDown, "onResizePointerDown");
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
    __name(onResizePointerMove, "onResizePointerMove");
    function onResizePointerUp(event) {
      resizing = false;
      if (typeof storeResizing2?.set === "function") {
        storeResizing2.set(false);
      }
      event.preventDefault();
      node.removeEventListener(...handlers.resizeMove);
      node.removeEventListener(...handlers.resizeUp);
      application._onResize(event);
    }
    __name(onResizePointerUp, "onResizePointerUp");
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
  __name(resizable, "resizable");
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      elementResize = $$value;
      $$invalidate(0, elementResize), $$invalidate(7, isResizable), $$invalidate(9, $storeMinimized), $$invalidate(8, $storeElementRoot);
    });
  }
  __name(div_binding, "div_binding");
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
__name(instance$r, "instance$r");
class ResizableHandle extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$r, create_fragment$s, safe_not_equal, { isResizable: 7 });
  }
}
__name(ResizableHandle, "ResizableHandle");
const ApplicationShell_svelte_svelte_type_style_lang = "";
function create_else_block$5(ctx) {
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
  tjsapplicationheader = new TJSApplicationHeader({
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
  resizablehandle = new ResizableHandle({});
  tjsfocuswrap = new TJSFocusWrap({
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
      attr(section, "class", "window-content svelte-oz81f7");
      attr(section, "tabindex", "-1");
      attr(div, "id", div_id_value = /*application*/
      ctx[10].id);
      attr(div, "class", div_class_value = "app window-app " + /*application*/
      ctx[10].options.classes.join(" ") + " svelte-oz81f7");
      attr(div, "data-appid", div_data_appid_value = /*application*/
      ctx[10].appId);
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
      ctx2[10].options.classes.join(" ") + " svelte-oz81f7")) {
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
      if (detaching)
        detach(div);
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
__name(create_else_block$5, "create_else_block$5");
function create_if_block$a(ctx) {
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
  tjsapplicationheader = new TJSApplicationHeader({
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
  resizablehandle = new ResizableHandle({});
  tjsfocuswrap = new TJSFocusWrap({
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
      attr(section, "class", "window-content svelte-oz81f7");
      attr(section, "tabindex", "-1");
      attr(div, "id", div_id_value = /*application*/
      ctx[10].id);
      attr(div, "class", div_class_value = "app window-app " + /*application*/
      ctx[10].options.classes.join(" ") + " svelte-oz81f7");
      attr(div, "data-appid", div_data_appid_value = /*application*/
      ctx[10].appId);
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
      ctx[10].options.classes.join(" ") + " svelte-oz81f7")) {
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
      if (detaching)
        detach(div);
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
__name(create_if_block$a, "create_if_block$a");
function create_fragment$r(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block$a, create_else_block$5];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*inTransition*/
      ctx2[2] || /*outTransition*/
      ctx2[3]
    )
      return 0;
    return 1;
  }
  __name(select_block_type, "select_block_type");
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
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
__name(create_fragment$r, "create_fragment$r");
function instance$q($$self, $$props, $$invalidate) {
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
  let { transition = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { transitionOptions = void 0 } = $$props;
  let { inTransitionOptions = s_DEFAULT_TRANSITION_OPTIONS } = $$props;
  let { outTransitionOptions = s_DEFAULT_TRANSITION_OPTIONS } = $$props;
  let oldTransition = void 0;
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
  __name(onClosePopup, "onClosePopup");
  function onKeydown(event) {
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
  __name(onKeydown, "onKeydown");
  function onPointerdownApp() {
    if (typeof application?.options?.popOut === "boolean" && application.options.popOut && application !== globalThis.ui?.activeWindow) {
      application.bringToTop.call(application);
    }
  }
  __name(onPointerdownApp, "onPointerdownApp");
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
  __name(onPointerdownContent, "onPointerdownContent");
  function resizeObservedContent(offsetWidth, offsetHeight) {
    $$invalidate(27, contentOffsetWidth = offsetWidth);
    $$invalidate(26, contentOffsetHeight = offsetHeight);
  }
  __name(resizeObservedContent, "resizeObservedContent");
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
  __name(resizeObservedApp, "resizeObservedApp");
  function section_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      elementContent = $$value;
      $$invalidate(0, elementContent);
    });
  }
  __name(section_binding, "section_binding");
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      elementRoot = $$value;
      $$invalidate(1, elementRoot);
    });
  }
  __name(div_binding, "div_binding");
  function section_binding_1($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      elementContent = $$value;
      $$invalidate(0, elementContent);
    });
  }
  __name(section_binding_1, "section_binding_1");
  function div_binding_1($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      elementRoot = $$value;
      $$invalidate(1, elementRoot);
    });
  }
  __name(div_binding_1, "div_binding_1");
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
        const newTransition = typeof transition === "function" ? transition : void 0;
        $$invalidate(2, inTransition = newTransition);
        $$invalidate(3, outTransition = newTransition);
        $$invalidate(30, oldTransition = newTransition);
      }
    }
    if ($$self.$$.dirty[0] & /*transitionOptions*/
    536870912 | $$self.$$.dirty[1] & /*oldTransitionOptions*/
    1) {
      if (oldTransitionOptions !== transitionOptions) {
        const newOptions = transitionOptions !== s_DEFAULT_TRANSITION_OPTIONS && isObject(transitionOptions) ? transitionOptions : s_DEFAULT_TRANSITION_OPTIONS;
        $$invalidate(4, inTransitionOptions = newOptions);
        $$invalidate(5, outTransitionOptions = newOptions);
        $$invalidate(31, oldTransitionOptions = newOptions);
      }
    }
    if ($$self.$$.dirty[0] & /*inTransition*/
    4) {
      if (typeof inTransition !== "function") {
        $$invalidate(2, inTransition = void 0);
      }
    }
    if ($$self.$$.dirty[0] & /*outTransition, application*/
    1032) {
      {
        if (typeof outTransition !== "function") {
          $$invalidate(3, outTransition = void 0);
        }
        if (application && typeof application?.options?.defaultCloseAnimation === "boolean") {
          $$invalidate(10, application.options.defaultCloseAnimation = outTransition === void 0, application);
        }
      }
    }
    if ($$self.$$.dirty[0] & /*inTransitionOptions*/
    16) {
      if (typeof inTransitionOptions !== "object") {
        $$invalidate(4, inTransitionOptions = s_DEFAULT_TRANSITION_OPTIONS);
      }
    }
    if ($$self.$$.dirty[0] & /*outTransitionOptions*/
    32) {
      if (typeof outTransitionOptions !== "object") {
        $$invalidate(5, outTransitionOptions = s_DEFAULT_TRANSITION_OPTIONS);
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
__name(instance$q, "instance$q");
class ApplicationShell extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance$q,
      create_fragment$r,
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
__name(ApplicationShell, "ApplicationShell");
const EmptyApplicationShell_svelte_svelte_type_style_lang = "";
const TJSApplicationShell_svelte_svelte_type_style_lang = "";
const DialogContent_svelte_svelte_type_style_lang = "";
function get_each_context$8(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[26] = list[i];
  return child_ctx;
}
__name(get_each_context$8, "get_each_context$8");
function create_if_block_3(ctx) {
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
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return { props: switch_instance_props };
  }
  __name(switch_props, "switch_props");
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props());
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
      const switch_instance_changes = dirty & /*dialogProps*/
      128 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(
        /*dialogProps*/
        ctx2[7]
      )]) : {};
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
          switch_instance = construct_svelte_component(switch_value, switch_props());
          ctx2[16](switch_instance);
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
      ctx[16](null);
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
__name(create_if_block_3, "create_if_block_3");
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
      if (detaching)
        detach(html_anchor);
      if (detaching)
        html_tag.d();
    }
  };
}
__name(create_if_block_2$3, "create_if_block_2$3");
function create_if_block$9(ctx) {
  let div;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let each_value = (
    /*buttons*/
    ctx[1]
  );
  const get_key = /* @__PURE__ */ __name((ctx2) => (
    /*button*/
    ctx2[26].id
  ), "get_key");
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context$8(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block$8(key, child_ctx));
  }
  return {
    c() {
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div, "class", "dialog-buttons svelte-1r3281l");
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
        each_value = /*buttons*/
        ctx2[1];
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, div, destroy_block, create_each_block$8, null, get_each_context$8);
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
      ctx[20](null);
    }
  };
}
__name(create_if_block$9, "create_if_block$9");
function create_if_block_1$7(ctx) {
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
      if (detaching)
        detach(html_anchor);
      if (detaching)
        html_tag.d();
    }
  };
}
__name(create_if_block_1$7, "create_if_block_1$7");
function create_each_block$8(key_1, ctx) {
  let button;
  let span;
  let t0_value = (
    /*button*/
    ctx[26].label + ""
  );
  let t0;
  let span_title_value;
  let t1;
  let button_class_value;
  let button_disabled_value;
  let applyStyles_action;
  let mounted;
  let dispose;
  let if_block = (
    /*button*/
    ctx[26].icon && create_if_block_1$7(ctx)
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
  __name(click_handler, "click_handler");
  function focus_handler() {
    return (
      /*focus_handler*/
      ctx[19](
        /*button*/
        ctx[26]
      )
    );
  }
  __name(focus_handler, "focus_handler");
  return {
    key: key_1,
    first: null,
    c() {
      button = element("button");
      span = element("span");
      if (if_block)
        if_block.c();
      t0 = text(t0_value);
      t1 = space();
      attr(span, "title", span_title_value = /*button*/
      ctx[26].title);
      attr(button, "class", button_class_value = "dialog-button " + /*button*/
      ctx[26].id + " svelte-1r3281l");
      button.disabled = button_disabled_value = /*button*/
      ctx[26].disabled;
      this.first = button;
    },
    m(target, anchor) {
      insert(target, button, anchor);
      append(button, span);
      if (if_block)
        if_block.m(span, null);
      append(span, t0);
      append(button, t1);
      if (!mounted) {
        dispose = [
          listen(button, "click", stop_propagation(prevent_default(click_handler))),
          listen(button, "focus", focus_handler),
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            button,
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
          if_block = create_if_block_1$7(ctx);
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
      2 && button_class_value !== (button_class_value = "dialog-button " + /*button*/
      ctx[26].id + " svelte-1r3281l")) {
        attr(button, "class", button_class_value);
      }
      if (dirty & /*buttons*/
      2 && button_disabled_value !== (button_disabled_value = /*button*/
      ctx[26].disabled)) {
        button.disabled = button_disabled_value;
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
      if (detaching)
        detach(button);
      if (if_block)
        if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
__name(create_each_block$8, "create_each_block$8");
function create_fragment$q(ctx) {
  let main;
  let div;
  let current_block_type_index;
  let if_block0;
  let t;
  let current;
  const if_block_creators = [create_if_block_2$3, create_if_block_3];
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
  __name(select_block_type, "select_block_type");
  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  let if_block1 = (
    /*buttons*/
    ctx[1].length && create_if_block$9(ctx)
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
          if_block1 = create_if_block$9(ctx2);
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
      if (detaching)
        detach(main);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
      ctx[17](null);
      if (if_block1)
        if_block1.d();
    }
  };
}
__name(create_fragment$q, "create_fragment$q");
const s_REGEX_HTML = /^\s*<.*>$/;
function instance$p($$self, $$props, $$invalidate) {
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
  __name(onClick, "onClick");
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
  __name(onKeydown, "onKeydown");
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
  __name(onKeyup, "onKeyup");
  function switch_instance_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dialogComponent = $$value;
      $$invalidate(0, dialogComponent);
    });
  }
  __name(switch_instance_binding, "switch_instance_binding");
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      contentEl = $$value;
      $$invalidate(5, contentEl);
    });
  }
  __name(div_binding, "div_binding");
  const click_handler = /* @__PURE__ */ __name((button) => onClick(button), "click_handler");
  const focus_handler = /* @__PURE__ */ __name((button) => $$invalidate(4, currentButtonId = button.id), "focus_handler");
  function div_binding_1($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      buttonsEl = $$value;
      $$invalidate(2, buttonsEl);
    });
  }
  __name(div_binding_1, "div_binding_1");
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
        $$invalidate(3, content = data.content);
        try {
          if (isSvelteComponent(content)) {
            $$invalidate(6, dialogClass = content);
            $$invalidate(7, dialogProps = {});
          } else if (isObject(content)) {
            const svelteConfig = parseSvelteConfig(content, application);
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
__name(instance$p, "instance$p");
class DialogContent extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$p, create_fragment$q, safe_not_equal, {
      data: 10,
      preventDefault: 11,
      stopPropagation: 12,
      dialogComponent: 0
    });
  }
}
__name(DialogContent, "DialogContent");
function create_else_block$4(ctx) {
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
    ctx[14](value);
  }
  __name(applicationshell_elementRoot_binding_1, "applicationshell_elementRoot_binding_1");
  function applicationshell_elementContent_binding_1(value) {
    ctx[15](value);
  }
  __name(applicationshell_elementContent_binding_1, "applicationshell_elementContent_binding_1");
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
  applicationshell = new ApplicationShell({ props: applicationshell_props });
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
      1048588) {
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
__name(create_else_block$4, "create_else_block$4");
function create_if_block$8(ctx) {
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
    $$slots: { default: [create_default_slot$2] },
    $$scope: { ctx }
  };
  for (let i = 0; i < tjsglasspane_spread_levels.length; i += 1) {
    tjsglasspane_props = assign(tjsglasspane_props, tjsglasspane_spread_levels[i]);
  }
  tjsglasspane = new TJSGlassPane({ props: tjsglasspane_props });
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
      1048655) {
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
__name(create_if_block$8, "create_if_block$8");
function create_default_slot_2(ctx) {
  let dialogcontent;
  let updating_dialogComponent;
  let current;
  function dialogcontent_dialogComponent_binding_1(value) {
    ctx[13](value);
  }
  __name(dialogcontent_dialogComponent_binding_1, "dialogcontent_dialogComponent_binding_1");
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
  dialogcontent = new DialogContent({ props: dialogcontent_props });
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
__name(create_default_slot_2, "create_default_slot_2");
function create_default_slot_1(ctx) {
  let dialogcontent;
  let updating_dialogComponent;
  let current;
  function dialogcontent_dialogComponent_binding(value) {
    ctx[10](value);
  }
  __name(dialogcontent_dialogComponent_binding, "dialogcontent_dialogComponent_binding");
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
  dialogcontent = new DialogContent({ props: dialogcontent_props });
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
__name(create_default_slot_1, "create_default_slot_1");
function create_default_slot$2(ctx) {
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
  __name(applicationshell_elementRoot_binding, "applicationshell_elementRoot_binding");
  function applicationshell_elementContent_binding(value) {
    ctx[12](value);
  }
  __name(applicationshell_elementContent_binding, "applicationshell_elementContent_binding");
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
  applicationshell = new ApplicationShell({ props: applicationshell_props });
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
      1048588) {
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
__name(create_default_slot$2, "create_default_slot$2");
function create_fragment$p(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block$8, create_else_block$4];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*modal*/
      ctx2[5]
    )
      return 0;
    return 1;
  }
  __name(select_block_type, "select_block_type");
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
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
__name(create_fragment$p, "create_fragment$p");
const s_MODAL_BACKGROUND = "#50505080";
function instance$o($$self, $$props, $$invalidate) {
  let { elementContent = void 0 } = $$props;
  let { elementRoot = void 0 } = $$props;
  let { data = {} } = $$props;
  let { dialogComponent = void 0 } = $$props;
  let { managedPromise = void 0 } = $$props;
  const application = getContext("#external").application;
  setContext("#managedPromise", managedPromise);
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
  __name(onKeydown, "onKeydown");
  function onKeydownModal(event) {
    if (event.code === "Escape") {
      event.preventDefault();
      event.stopImmediatePropagation();
      application.close();
    }
  }
  __name(onKeydownModal, "onKeydownModal");
  function dialogcontent_dialogComponent_binding(value) {
    dialogComponent = value;
    $$invalidate(2, dialogComponent);
  }
  __name(dialogcontent_dialogComponent_binding, "dialogcontent_dialogComponent_binding");
  function applicationshell_elementRoot_binding(value) {
    elementRoot = value;
    $$invalidate(0, elementRoot);
  }
  __name(applicationshell_elementRoot_binding, "applicationshell_elementRoot_binding");
  function applicationshell_elementContent_binding(value) {
    elementContent = value;
    $$invalidate(1, elementContent);
  }
  __name(applicationshell_elementContent_binding, "applicationshell_elementContent_binding");
  function dialogcontent_dialogComponent_binding_1(value) {
    dialogComponent = value;
    $$invalidate(2, dialogComponent);
  }
  __name(dialogcontent_dialogComponent_binding_1, "dialogcontent_dialogComponent_binding_1");
  function applicationshell_elementRoot_binding_1(value) {
    elementRoot = value;
    $$invalidate(0, elementRoot);
  }
  __name(applicationshell_elementRoot_binding_1, "applicationshell_elementRoot_binding_1");
  function applicationshell_elementContent_binding_1(value) {
    elementContent = value;
    $$invalidate(1, elementContent);
  }
  __name(applicationshell_elementContent_binding_1, "applicationshell_elementContent_binding_1");
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
    dialogcontent_dialogComponent_binding_1,
    applicationshell_elementRoot_binding_1,
    applicationshell_elementContent_binding_1
  ];
}
__name(instance$o, "instance$o");
class DialogShell extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$o, create_fragment$p, safe_not_equal, {
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
__name(DialogShell, "DialogShell");
cssVariables$1.setProperties({
  // Anchor text shadow / header buttons
  "--tjs-default-text-shadow-focus-hover": "0 0 8px var(--color-shadow-primary)",
  // TJSApplicationShell app background.
  "--tjs-app-background": `url("${globalThis.foundry.utils.getRoute("/ui/denim075.png")}")`
}, false);
class TJSDialogData {
  /**
   * @type {SvelteApplication}
   */
  #application;
  /**
   * Provides configuration of the dialog button bar.
   *
   * @type {Record<string, TJSDialogButtonData>}
   */
  buttons;
  /**
   * A Svelte configuration object or HTML string content.
   *
   * @type {object|string}
   */
  content;
  /**
   * The default button ID to focus initially.
   *
   * @type {string}
   */
  default;
  /**
   * The dialog is draggable when true.
   *
   * @type {boolean}
   */
  draggable;
  /**
   * When true auto-management of app focus is enabled.
   *
   * @type {boolean}
   */
  focusAuto;
  /**
   * When true the first focusable element that isn't a button is focused.
   *
   * @type {boolean}
   */
  focusFirst;
  /**
   * When `focusAuto` and `focusKeep` is true; keeps internal focus.
   *
   * @type {boolean}
   */
  focusKeep;
  /**
   * When true the dialog is minimizable.
   *
   * @type {boolean}
   */
  minimizable;
  /**
   * When true a modal dialog is displayed.
   *
   * @type {boolean}
   */
  modal;
  /**
   * Additional options for modal dialog display.
   *
   * @type {object}
   * TODO: Better specify type / options.
   */
  modalOptions;
  /**
   * When true and an error is raised in dialog callback functions post a UI error notification.
   *
   * @type {boolean}
   */
  notifyError;
  /**
   * Callback invoked when dialog is closed; no button option selected. When defined as a string any matching function
   * by name exported from content Svelte component is invoked.
   *
   * @type {string|((application: TJSDialog) => any)}
   */
  onClose;
  /**
   * When true and a Promise has been created by {@link TJSDialog.wait} and the Promise is not in the process of being
   * resolved or rejected on close of the dialog any `onClose` function is invoked and any result that is undefined
   * will cause the Promise to then be rejected.
   *
   * @type {boolean}
   */
  rejectClose;
  /**
   * When true the dialog is resizable.
   *
   * @type {boolean}
   */
  resizable;
  /**
   * When true and resolving any Promises and there are undefined results from any button callbacks the button ID is
   * resolved.
   *
   * @type {boolean}
   */
  resolveId;
  /**
   * The dialog window title.
   *
   * @type {string}
   */
  title;
  /**
   * Transition options for the dialog.
   *
   * @type {object}
   * TODO: Better specify type / options.
   */
  transition;
  /**
   * A specific z-index for the dialog. Pass null for the dialog to act like other applications in regard bringing to
   * top when activated.
   *
   * @type {number|null}
   */
  zIndex;
  /**
   * @param {SvelteApplication} application - The host Foundry application.
   */
  constructor(application) {
    this.#application = application;
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
    const component = this.#application.svelte.component(0);
    if (component?.data) {
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
      const component = this.#application.svelte.component(0);
      if (component?.data) {
        component.data = this;
      }
    }
    return success;
  }
}
__name(TJSDialogData, "TJSDialogData");
class TJSDialog extends SvelteApplication {
  /** @type {TJSDialogData} */
  #data;
  /** @type {ManagedPromise} */
  #managedPromise;
  /**
   * @param {TJSDialogOptions}           data - Dialog options.
   *
   * @param {SvelteApplicationOptions}   [options] - SvelteApplication options.
   */
  constructor(data, options = {}) {
    super(options);
    this.#managedPromise = new ManagedPromise();
    this.#data = new TJSDialogData(this);
    this.data = data;
    Object.defineProperty(this.svelte, "dialogComponent", {
      get: () => this.svelte?.applicationShell?.dialogComponent
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
        class: DialogShell,
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
   * @returns {TJSDialogData} Dialog data.
   */
  get data() {
    return this.#data;
  }
  /**
   * @returns {ManagedPromise} Returns the managed promise.
   */
  get managedPromise() {
    return this.#managedPromise;
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
    const descriptors = Object.getOwnPropertyDescriptors(this.#data);
    for (const descriptor in descriptors) {
      if (descriptors[descriptor].configurable) {
        delete this.#data[descriptor];
      }
    }
    this.#data.merge(data);
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
}
__name(TJSDialog, "TJSDialog");
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
const ActorEquipment_svelte_svelte_type_style_lang = "";
function create_if_block$7(ctx) {
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
  __name(select_block_type, "select_block_type");
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      div = element("div");
      if_block.c();
      attr(div, "class", "item-description svelte-19gus65");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if_block.m(div, null);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
        if_block.p(ctx, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx);
        if (if_block) {
          if_block.c();
          if_block.m(div, null);
        }
      }
    },
    i(local) {
      if (current)
        return;
      add_render_callback(() => {
        if (!current)
          return;
        if (!div_transition)
          div_transition = create_bidirectional_transition(div, slide, { duration: 150, easing: sineInOut }, true);
        div_transition.run(1);
      });
      current = true;
    },
    o(local) {
      if (!div_transition)
        div_transition = create_bidirectional_transition(div, slide, { duration: 150, easing: sineInOut }, false);
      div_transition.run(0);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if_block.d();
      if (detaching && div_transition)
        div_transition.end();
    }
  };
}
__name(create_if_block$7, "create_if_block$7");
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
      if (detaching)
        detach(t);
    }
  };
}
__name(create_else_block$3, "create_else_block$3");
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
      if (detaching)
        detach(html_anchor);
      if (detaching)
        html_tag.d();
    }
  };
}
__name(create_if_block_1$6, "create_if_block_1$6");
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
  let i0;
  let a0_data_tooltip_value;
  let t4;
  let a1;
  let i1;
  let t5;
  let a2;
  let i2;
  let t6;
  let current;
  let mounted;
  let dispose;
  let if_block = (
    /*expanded*/
    ctx[1] && create_if_block$7(ctx)
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
      i1 = element("i");
      t5 = space();
      a2 = element("a");
      i2 = element("i");
      t6 = space();
      if (if_block)
        if_block.c();
      attr(img0, "class", "item-image svelte-19gus65");
      if (!src_url_equal(img0.src, img0_src_value = /*item*/
      ctx[0].img))
        attr(img0, "src", img0_src_value);
      attr(img1, "class", "clickable clickable-red item-rollable-image svelte-19gus65");
      if (!src_url_equal(img1.src, img1_src_value = "icons/dice/d10black.svg"))
        attr(img1, "src", img1_src_value);
      attr(div0, "class", "item-image-container svelte-19gus65");
      attr(span, "class", "item-expand clickable clickable-red");
      attr(div1, "class", "item-name svelte-19gus65");
      attr(i0, "class", "fas fa-shield-alt");
      attr(a0, "class", "item-control item-not-equipped svelte-19gus65");
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
      attr(i1, "class", "fas fa-edit");
      attr(a1, "class", "item-control item-edit svelte-19gus65");
      attr(a1, "data-tooltip", localize("LEOBREW.EquipmentEdit"));
      attr(i2, "class", "fas fa-trash");
      attr(a2, "class", "item-control item-delete svelte-19gus65");
      attr(a2, "data-tooltip", localize("LEOBREW.EquipmentDelete"));
      attr(div2, "class", "item-controls flexrow svelte-19gus65");
      attr(div3, "class", "item-header svelte-19gus65");
      attr(div4, "class", "item even-shading svelte-19gus65");
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
      append(a1, i1);
      append(div2, t5);
      append(div2, a2);
      append(a2, i2);
      append(div4, t6);
      if (if_block)
        if_block.m(div4, null);
      current = true;
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
      if (!current || dirty & /*item*/
      1 && !src_url_equal(img0.src, img0_src_value = /*item*/
      ctx2[0].img)) {
        attr(img0, "src", img0_src_value);
      }
      if ((!current || dirty & /*item*/
      1) && t2_value !== (t2_value = /*item*/
      ctx2[0].name + ""))
        set_data(t2, t2_value);
      if (!current || dirty & /*item*/
      1 && a0_data_tooltip_value !== (a0_data_tooltip_value = localize(
        /*item*/
        ctx2[0].system.equipped ? "LEOBREW.Equipped" : "LEOBREW.Unequipped"
      ))) {
        attr(a0, "data-tooltip", a0_data_tooltip_value);
      }
      if (!current || dirty & /*item*/
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
          if_block = create_if_block$7(ctx2);
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
      if (detaching)
        detach(div4);
      if (if_block)
        if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
__name(create_fragment$o, "create_fragment$o");
function instance$n($$self, $$props, $$invalidate) {
  let expanded;
  let $appState;
  const appState = getContext("ApplicationStateStore");
  component_subscribe($$self, appState, (value) => $$invalidate(3, $appState = value));
  let { item } = $$props;
  const click_handler = /* @__PURE__ */ __name(() => {
    item.roll();
  }, "click_handler");
  const click_handler_1 = /* @__PURE__ */ __name(() => {
    appState.update((state) => {
      if (expanded) {
        state.isExpanded.inventory.delete(item.id);
      } else {
        state.isExpanded.inventory.add(item.id);
      }
      return state;
    });
  }, "click_handler_1");
  const click_handler_2 = /* @__PURE__ */ __name(() => {
    item.update({ "system.equipped": !item.system.equipped });
  }, "click_handler_2");
  const click_handler_3 = /* @__PURE__ */ __name(() => {
    item.sheet.render(true);
  }, "click_handler_3");
  const click_handler_4 = /* @__PURE__ */ __name(() => {
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
  }, "click_handler_4");
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
__name(instance$n, "instance$n");
class ActorEquipment extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$n, create_fragment$o, safe_not_equal, { item: 0 });
  }
}
__name(ActorEquipment, "ActorEquipment");
function capitalizeFirstLetter(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}
__name(capitalizeFirstLetter, "capitalizeFirstLetter");
function isResponsibleGM() {
  if (!game.user.isGM)
    return false;
  const connectedGMs = game.users.filter((user) => user.active && user.isGM);
  return !connectedGMs.some((other) => other.id < game.userId);
}
__name(isResponsibleGM, "isResponsibleGM");
function roundDownRoll(roll) {
  return Math.max(3, Math.floor(roll / 3) * 3);
}
__name(roundDownRoll, "roundDownRoll");
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
__name(promptSituationalBonus, "promptSituationalBonus");
const SearchableItemList_svelte_svelte_type_style_lang = "";
function get_each_context$7(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[13] = list[i];
  return child_ctx;
}
__name(get_each_context$7, "get_each_context$7");
function create_each_block$7(key_1, ctx) {
  let first;
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value = (
    /*component*/
    ctx[1]
  );
  function switch_props(ctx2) {
    return { props: { item: (
      /*item*/
      ctx2[13]
    ) } };
  }
  __name(switch_props, "switch_props");
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
      const switch_instance_changes = {};
      if (dirty & /*items*/
      16)
        switch_instance_changes.item = /*item*/
        ctx[13];
      if (dirty & /*component*/
      2 && switch_value !== (switch_value = /*component*/
      ctx[1])) {
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
      if (detaching)
        detach(first);
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
__name(create_each_block$7, "create_each_block$7");
function create_fragment$n(ctx) {
  let div3;
  let div2;
  let div0;
  let input;
  let t0;
  let a;
  let i;
  let t1;
  let t2_value = localize("LEOBREW.Add") + "";
  let t2;
  let t3;
  let div1;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let current;
  let mounted;
  let dispose;
  let each_value = (
    /*items*/
    ctx[4]
  );
  const get_key = /* @__PURE__ */ __name((ctx2) => (
    /*item*/
    ctx2[13].id
  ), "get_key");
  for (let i2 = 0; i2 < each_value.length; i2 += 1) {
    let child_ctx = get_each_context$7(ctx, each_value, i2);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i2] = create_each_block$7(key, child_ctx));
  }
  return {
    c() {
      div3 = element("div");
      div2 = element("div");
      div0 = element("div");
      input = element("input");
      t0 = space();
      a = element("a");
      i = element("i");
      t1 = space();
      t2 = text(t2_value);
      t3 = space();
      div1 = element("div");
      for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
        each_blocks[i2].c();
      }
      attr(input, "type", "text");
      attr(input, "placeholder", localize(`LEOBREW.${/*capType*/
      ctx[7]}Search`));
      attr(i, "class", "fas fa-plus");
      attr(a, "class", "item-control item-create svelte-vgdldf");
      attr(a, "data-type", "equipment");
      attr(a, "data-tooltip", localize(`LEOBREW.${/*capType*/
      ctx[7]}Create`));
      attr(div0, "class", "items-header svelte-vgdldf");
      attr(div1, "class", "item-list item-inventory");
      attr(div2, "class", "items-list inventory-list svelte-vgdldf");
      attr(div3, "class", "inventory");
    },
    m(target, anchor) {
      insert(target, div3, anchor);
      append(div3, div2);
      append(div2, div0);
      append(div0, input);
      set_input_value(
        input,
        /*$search*/
        ctx[3]
      );
      append(div0, t0);
      append(div0, a);
      append(a, i);
      append(a, t1);
      append(a, t2);
      append(div2, t3);
      append(div2, div1);
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
            ctx[10]
          ),
          listen(
            a,
            "click",
            /*click_handler*/
            ctx[11]
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
      if (dirty & /*component, items*/
      18) {
        each_value = /*items*/
        ctx2[4];
        group_outros();
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, div1, outro_and_destroy_block, create_each_block$7, null, get_each_context$7);
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
      if (detaching)
        detach(div3);
      for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
        each_blocks[i2].d();
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
__name(create_fragment$n, "create_fragment$n");
function instance$m($$self, $$props, $$invalidate) {
  let items;
  let $search;
  let $itemsStore, $$unsubscribe_itemsStore = noop, $$subscribe_itemsStore = /* @__PURE__ */ __name(() => ($$unsubscribe_itemsStore(), $$unsubscribe_itemsStore = subscribe(itemsStore, ($$value) => $$invalidate(9, $itemsStore = $$value)), itemsStore), "$$subscribe_itemsStore");
  let $appState;
  $$self.$$.on_destroy.push(() => $$unsubscribe_itemsStore());
  const appState = getContext("ApplicationStateStore");
  component_subscribe($$self, appState, (value) => $$invalidate(5, $appState = value));
  getContext("DocumentStore");
  let { itemsStore } = $$props;
  $$subscribe_itemsStore();
  let { component } = $$props;
  let { type } = $$props;
  const capType = capitalizeFirstLetter(type);
  let search = writable$1("");
  component_subscribe($$self, search, (value) => $$invalidate(3, $search = value));
  function input_input_handler() {
    $search = this.value;
    search.set($search);
  }
  __name(input_input_handler, "input_input_handler");
  const click_handler = /* @__PURE__ */ __name(async () => {
    const [item] = await $appState.actor.createEmbeddedDocuments("Item", [{ name: `New ${capType}`, type }]);
    item.sheet.render(true);
  }, "click_handler");
  $$self.$$set = ($$props2) => {
    if ("itemsStore" in $$props2)
      $$subscribe_itemsStore($$invalidate(0, itemsStore = $$props2.itemsStore));
    if ("component" in $$props2)
      $$invalidate(1, component = $$props2.component);
    if ("type" in $$props2)
      $$invalidate(2, type = $$props2.type);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$itemsStore, $search*/
    520) {
      $$invalidate(4, items = [...$itemsStore].filter((item) => {
        return !$search || $search.toLowerCase().split(" ").every((part) => item.name.toLowerCase().includes(part));
      }));
    }
  };
  return [
    itemsStore,
    component,
    type,
    $search,
    items,
    $appState,
    appState,
    capType,
    search,
    $itemsStore,
    input_input_handler,
    click_handler
  ];
}
__name(instance$m, "instance$m");
class SearchableItemList extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$m, create_fragment$n, safe_not_equal, { itemsStore: 0, component: 1, type: 2 });
  }
}
__name(SearchableItemList, "SearchableItemList");
function create_fragment$m(ctx) {
  let div;
  let searchableitemlist;
  let current;
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
      create_component(searchableitemlist.$$.fragment);
      attr(div, "class", "inventory");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(searchableitemlist, div, null);
      current = true;
    },
    p: noop,
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
      if (detaching)
        detach(div);
      destroy_component(searchableitemlist);
    }
  };
}
__name(create_fragment$m, "create_fragment$m");
function instance$l($$self) {
  getContext("ApplicationStateStore");
  const document2 = getContext("DocumentStore");
  const itemsStore = document2.embedded.create("Item", {
    name: "actorItems",
    filters: [
      (item) => {
        return item.type === "equipment";
      }
    ]
  });
  return [itemsStore];
}
__name(instance$l, "instance$l");
class ActorInventory extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$l, create_fragment$m, safe_not_equal, {});
  }
}
__name(ActorInventory, "ActorInventory");
const ActorTrait_svelte_svelte_type_style_lang = "";
function create_if_block$6(ctx) {
  let div;
  let div_transition;
  let current;
  function select_block_type(ctx2, dirty) {
    if (
      /*item*/
      ctx2[0].system.description.value
    )
      return create_if_block_1$5;
    return create_else_block$2;
  }
  __name(select_block_type, "select_block_type");
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      div = element("div");
      if_block.c();
      attr(div, "class", "item-description svelte-19gus65");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if_block.m(div, null);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
        if_block.p(ctx, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx);
        if (if_block) {
          if_block.c();
          if_block.m(div, null);
        }
      }
    },
    i(local) {
      if (current)
        return;
      add_render_callback(() => {
        if (!current)
          return;
        if (!div_transition)
          div_transition = create_bidirectional_transition(div, slide, { duration: 150, easing: sineInOut }, true);
        div_transition.run(1);
      });
      current = true;
    },
    o(local) {
      if (!div_transition)
        div_transition = create_bidirectional_transition(div, slide, { duration: 150, easing: sineInOut }, false);
      div_transition.run(0);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if_block.d();
      if (detaching && div_transition)
        div_transition.end();
    }
  };
}
__name(create_if_block$6, "create_if_block$6");
function create_else_block$2(ctx) {
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
      if (detaching)
        detach(t);
    }
  };
}
__name(create_else_block$2, "create_else_block$2");
function create_if_block_1$5(ctx) {
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
      if (detaching)
        detach(html_anchor);
      if (detaching)
        html_tag.d();
    }
  };
}
__name(create_if_block_1$5, "create_if_block_1$5");
function create_fragment$l(ctx) {
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
  let t4;
  let a1;
  let i1;
  let t5;
  let current;
  let mounted;
  let dispose;
  let if_block = (
    /*expanded*/
    ctx[1] && create_if_block$6(ctx)
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
      i1 = element("i");
      t5 = space();
      if (if_block)
        if_block.c();
      attr(img0, "class", "item-image svelte-19gus65");
      if (!src_url_equal(img0.src, img0_src_value = /*item*/
      ctx[0].img))
        attr(img0, "src", img0_src_value);
      attr(img1, "class", "clickable clickable-red item-rollable-image svelte-19gus65");
      if (!src_url_equal(img1.src, img1_src_value = "icons/dice/d10black.svg"))
        attr(img1, "src", img1_src_value);
      attr(div0, "class", "item-image-container svelte-19gus65");
      attr(span, "class", "item-expand clickable clickable-red");
      attr(div1, "class", "item-name svelte-19gus65");
      attr(i0, "class", "fas fa-edit");
      attr(a0, "class", "item-control item-edit svelte-19gus65");
      attr(a0, "data-tooltip", localize("LEOBREW.TraitEdit"));
      attr(i1, "class", "fas fa-trash");
      attr(a1, "class", "item-control item-delete svelte-19gus65");
      attr(a1, "data-tooltip", localize("LEOBREW.TraitDelete"));
      attr(div2, "class", "item-controls flexrow svelte-19gus65");
      attr(div3, "class", "item-header svelte-19gus65");
      attr(div4, "class", "item even-shading svelte-19gus65");
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
      append(a1, i1);
      append(div4, t5);
      if (if_block)
        if_block.m(div4, null);
      current = true;
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
      if (!current || dirty & /*item*/
      1 && !src_url_equal(img0.src, img0_src_value = /*item*/
      ctx2[0].img)) {
        attr(img0, "src", img0_src_value);
      }
      if ((!current || dirty & /*item*/
      1) && t2_value !== (t2_value = /*item*/
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
          if_block = create_if_block$6(ctx2);
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
      if (detaching)
        detach(div4);
      if (if_block)
        if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
__name(create_fragment$l, "create_fragment$l");
function instance$k($$self, $$props, $$invalidate) {
  let expanded;
  let $appState;
  const appState = getContext("ApplicationStateStore");
  component_subscribe($$self, appState, (value) => $$invalidate(3, $appState = value));
  let { item } = $$props;
  const click_handler = /* @__PURE__ */ __name(() => {
    item.roll();
  }, "click_handler");
  const click_handler_1 = /* @__PURE__ */ __name(() => {
    appState.update((state) => {
      if (expanded) {
        state.isExpanded.traits.delete(item.id);
      } else {
        state.isExpanded.traits.add(item.id);
      }
      return state;
    });
  }, "click_handler_1");
  const click_handler_2 = /* @__PURE__ */ __name(() => {
    item.sheet.render(true);
  }, "click_handler_2");
  const click_handler_3 = /* @__PURE__ */ __name(() => {
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
  }, "click_handler_3");
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
__name(instance$k, "instance$k");
class ActorTrait extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$k, create_fragment$l, safe_not_equal, { item: 0 });
  }
}
__name(ActorTrait, "ActorTrait");
function create_fragment$k(ctx) {
  let div;
  let searchableitemlist;
  let current;
  searchableitemlist = new SearchableItemList({
    props: {
      itemsStore: (
        /*itemsStore*/
        ctx[0]
      ),
      component: ActorTrait,
      type: "trait"
    }
  });
  return {
    c() {
      div = element("div");
      create_component(searchableitemlist.$$.fragment);
      attr(div, "class", "inventory");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(searchableitemlist, div, null);
      current = true;
    },
    p: noop,
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
      if (detaching)
        detach(div);
      destroy_component(searchableitemlist);
    }
  };
}
__name(create_fragment$k, "create_fragment$k");
function instance$j($$self) {
  getContext("ApplicationStateStore");
  const document2 = getContext("DocumentStore");
  const itemsStore = document2.embedded.create("Item", {
    name: "actorTraits",
    filters: [
      (item) => {
        return item.type === "trait";
      }
    ]
  });
  return [itemsStore];
}
__name(instance$j, "instance$j");
class ActorTraits extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$j, create_fragment$k, safe_not_equal, {});
  }
}
__name(ActorTraits, "ActorTraits");
class FoundryStyles {
  static #sheet = void 0;
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
   * @returns {Object<string, string>} Properties object.
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
      return typeof data === "object" && property in data ? data[property] : void 0;
    }
    for (const key of this.#sheetMap.keys()) {
      if (key.includes(selector)) {
        const data = this.#sheetMap.get(key);
        if (typeof data === "object" && property in data) {
          return data[property];
        }
      }
    }
    return void 0;
  }
}
__name(FoundryStyles, "FoundryStyles");
const s_STYLE_KEY = "#__tjs-root-styles";
const cssVariables = new StyleManager({ docKey: s_STYLE_KEY, version: 1 });
const TJSIconButton_svelte_svelte_type_style_lang = "";
const TJSToggleIconButton_svelte_svelte_type_style_lang = "";
const TJSScrollContainer_svelte_svelte_type_style_lang = "";
const TJSContentEdit_svelte_svelte_type_style_lang = "";
class PMImpl {
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
  static #clamp(value = 0, min = 0, max = 0) {
    return Math.min(Math.max(value, min), max);
  }
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
        const resolvedFrom = this.#clamp(0, minPos, maxPos);
        const resolvedEnd = this.#clamp(doc.content.size, minPos, maxPos);
        transaction = tr.setSelection(globalThis.ProseMirror.TextSelection.create(doc, resolvedFrom, resolvedEnd));
        break;
      }
      case "end": {
        const resolvedFrom = this.#clamp(doc.content.size, minPos, maxPos);
        const resolvedEnd = this.#clamp(doc.content.size, minPos, maxPos);
        transaction = tr.setSelection(globalThis.ProseMirror.TextSelection.create(doc, resolvedFrom, resolvedEnd));
        break;
      }
      case "start": {
        const resolvedFrom = this.#clamp(0, minPos, maxPos);
        const resolvedEnd = this.#clamp(0, minPos, maxPos);
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
__name(PMImpl, "PMImpl");
const ProseMirrorKeyMaps = globalThis.ProseMirror ? globalThis.ProseMirror.ProseMirrorKeyMaps : class {
};
class TJSKeyMaps extends ProseMirrorKeyMaps {
  #onQuit;
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
    if (typeof options.onQuit === "function") {
      this.#onQuit = options.onQuit;
    }
  }
  /**
   * Swaps the Foundry default `Escape` / selectParentNode to `Mod-p` and enables `onQuit` function for `Escape`.
   *
   * @returns {Object<ProseMirrorCommand>} ProseMirror keymap data.
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
__name(TJSKeyMaps, "TJSKeyMaps");
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
__name(TJSPasteUUID, "TJSPasteUUID");
const index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  TJSKeyMaps,
  TJSPasteUUID
});
const TJSProseMirror_svelte_svelte_type_style_lang = "";
function create_if_block_1$4(ctx) {
  let a;
  let mounted;
  let dispose;
  return {
    c() {
      a = element("a");
      a.innerHTML = `<i class="fas fa-edit"></i>`;
      attr(a, "class", "editor-edit svelte-10m2cp0");
      attr(a, "role", "button");
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
      if (detaching)
        detach(a);
      mounted = false;
      dispose();
    }
  };
}
__name(create_if_block_1$4, "create_if_block_1$4");
function create_else_block$1(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      attr(div, "class", "editor-enriched svelte-10m2cp0");
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
      if (detaching)
        detach(div);
    }
  };
}
__name(create_else_block$1, "create_else_block$1");
function create_if_block$5(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      attr(div, "class", "editor-content svelte-10m2cp0");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      ctx[16](div);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
      ctx[16](null);
    }
  };
}
__name(create_if_block$5, "create_if_block$5");
function create_fragment$j(ctx) {
  let div;
  let t;
  let div_class_value;
  let applyStyles_action;
  let mounted;
  let dispose;
  let if_block0 = (
    /*editorButton*/
    ctx[5] && create_if_block_1$4(ctx)
  );
  function select_block_type(ctx2, dirty) {
    if (
      /*editorActive*/
      ctx2[3]
    )
      return create_if_block$5;
    return create_else_block$1;
  }
  __name(select_block_type, "select_block_type");
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
      ) : "") + " svelte-10m2cp0");
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
          if_block0 = create_if_block_1$4(ctx2);
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
      ) : "") + " svelte-10m2cp0")) {
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
      if (detaching)
        detach(div);
      if (if_block0)
        if_block0.d();
      if_block1.d();
      ctx[17](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
__name(create_fragment$j, "create_fragment$j");
function instance$i($$self, $$props, $$invalidate) {
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
  __name(destroyEditor, "destroyEditor");
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
    dispatch2("editor:start");
  }
  __name(initEditor, "initEditor");
  function onClick(event) {
    if (!editorActive && clickToEdit) {
      initEditor();
    }
  }
  __name(onClick, "onClick");
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
  __name(onContentChanged, "onContentChanged");
  function onDocumentDeleted(document2) {
    $$invalidate(0, options.document = void 0, options);
    destroyEditor();
    dispatch2("editor:document:deleted", { document: document2 });
    $$invalidate(12, content = "");
    $$invalidate(1, enrichedContent = "");
  }
  __name(onDocumentDeleted, "onDocumentDeleted");
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
  __name(onKeydown, "onKeydown");
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
  __name(onKeyup, "onKeyup");
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
  __name(saveEditor, "saveEditor");
  const click_handler = /* @__PURE__ */ __name(() => initEditor(), "click_handler");
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      editorContentEl = $$value;
      $$invalidate(4, editorContentEl);
    });
  }
  __name(div_binding, "div_binding");
  function div_binding_1($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      editorEl = $$value;
      $$invalidate(6, editorEl);
    });
  }
  __name(div_binding_1, "div_binding_1");
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
__name(instance$i, "instance$i");
class TJSProseMirror extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$i, create_fragment$j, safe_not_equal, {
      content: 12,
      enrichedContent: 1,
      options: 0
    });
  }
}
__name(TJSProseMirror, "TJSProseMirror");
const TJSTinyMCE_svelte_svelte_type_style_lang = "";
const TJSSvgFolder_svelte_svelte_type_style_lang = "";
const TJSIconFolder_svelte_svelte_type_style_lang = "";
const TJSInputNumber_svelte_svelte_type_style_lang = "";
const TJSInputText_svelte_svelte_type_style_lang = "";
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
const ActorBiography_svelte_svelte_type_style_lang = "";
function create_fragment$i(ctx) {
  let div;
  let tjsprosemirror;
  let updating_content;
  let current;
  function tjsprosemirror_content_binding(value) {
    ctx[3](value);
  }
  __name(tjsprosemirror_content_binding, "tjsprosemirror_content_binding");
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
      attr(div, "class", "biography-container svelte-1sirzut");
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
      if (detaching)
        detach(div);
      destroy_component(tjsprosemirror);
    }
  };
}
__name(create_fragment$i, "create_fragment$i");
function instance$h($$self, $$props, $$invalidate) {
  let $doc;
  getContext("ApplicationStateStore");
  const doc = getContext("DocumentStore");
  component_subscribe($$self, doc, (value) => $$invalidate(1, $doc = value));
  let content = $doc.system.biography.value;
  function tjsprosemirror_content_binding(value) {
    content = value;
    $$invalidate(0, content);
  }
  __name(tjsprosemirror_content_binding, "tjsprosemirror_content_binding");
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
__name(instance$h, "instance$h");
class ActorBiography extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$h, create_fragment$i, safe_not_equal, {});
  }
}
__name(ActorBiography, "ActorBiography");
const ActorInjuries_svelte_svelte_type_style_lang = "";
function get_each_context$6(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[5] = list[i];
  return child_ctx;
}
__name(get_each_context$6, "get_each_context$6");
function get_each_context_1$2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[8] = list[i];
  return child_ctx;
}
__name(get_each_context_1$2, "get_each_context_1$2");
function create_each_block_1$2(ctx) {
  let tr;
  let td0;
  let t0_value = (
    /*bodyPart*/
    ctx[8].label + ""
  );
  let t0;
  let t1;
  let td1;
  let t2_value = (
    /*bodyPart*/
    ctx[8].value + ""
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
      attr(td0, "class", "svelte-122hd2g");
      attr(td1, "class", "svelte-122hd2g");
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
      if (dirty & /*armorBonuses*/
      2 && t0_value !== (t0_value = /*bodyPart*/
      ctx2[8].label + ""))
        set_data(t0, t0_value);
      if (dirty & /*armorBonuses*/
      2 && t2_value !== (t2_value = /*bodyPart*/
      ctx2[8].value + ""))
        set_data(t2, t2_value);
    },
    d(detaching) {
      if (detaching)
        detach(tr);
    }
  };
}
__name(create_each_block_1$2, "create_each_block_1$2");
function create_each_block$6(ctx) {
  let img;
  let img_src_value;
  return {
    c() {
      img = element("img");
      if (!src_url_equal(img.src, img_src_value = /*injury*/
      ctx[5].path))
        attr(img, "src", img_src_value);
      attr(img, "class", "svelte-122hd2g");
    },
    m(target, anchor) {
      insert(target, img, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*injuries*/
      1 && !src_url_equal(img.src, img_src_value = /*injury*/
      ctx2[5].path)) {
        attr(img, "src", img_src_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(img);
    }
  };
}
__name(create_each_block$6, "create_each_block$6");
function create_fragment$h(ctx) {
  let div2;
  let div0;
  let table;
  let thead;
  let t3;
  let tbody;
  let t4;
  let div1;
  let t5;
  let svg;
  let path;
  let each_value_1 = (
    /*armorBonuses*/
    ctx[1]
  );
  let each_blocks_1 = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks_1[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
  }
  let each_value = (
    /*injuries*/
    ctx[0]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
  }
  return {
    c() {
      div2 = element("div");
      div0 = element("div");
      table = element("table");
      thead = element("thead");
      thead.innerHTML = `<tr><th class="svelte-122hd2g">Part</th> 
				<th class="svelte-122hd2g">Def</th></tr>`;
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
      svg = svg_element("svg");
      path = svg_element("path");
      attr(div0, "class", "armor-table svelte-122hd2g");
      attr(path, "d", "\r\nM30,15\r\nL65,15\r\nL60,45\r\nL35,45\r\nZ\r\n");
      attr(path, "fill", "\r\n#0070f3\r\n\r\n");
      attr(svg, "viewBox", "0 0 100 100");
      set_style(svg, "z-index", "5000");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(div1, "class", "hitboxes svelte-122hd2g");
      attr(div2, "class", "injuries svelte-122hd2g");
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
      append(div1, svg);
      append(svg, path);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*armorBonuses*/
      2) {
        each_value_1 = /*armorBonuses*/
        ctx2[1];
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
      if (dirty & /*injuries*/
      1) {
        each_value = /*injuries*/
        ctx2[0];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$6(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$6(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div1, t5);
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
      if (detaching)
        detach(div2);
      destroy_each(each_blocks_1, detaching);
      destroy_each(each_blocks, detaching);
    }
  };
}
__name(create_fragment$h, "create_fragment$h");
function instance$g($$self, $$props, $$invalidate) {
  let armorBonuses;
  let injuries;
  let $doc;
  getContext("ApplicationStateStore");
  const doc = getContext("DocumentStore");
  component_subscribe($$self, doc, (value) => $$invalidate(3, $doc = value));
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$doc*/
    8) {
      $$invalidate(1, armorBonuses = $doc.armorBonuses);
    }
    if ($$self.$$.dirty & /*$doc*/
    8) {
      $$invalidate(0, injuries = Object.entries($doc.system.injuries).map(([part, injury]) => {
        return {
          path: `systems/leobrew/images/${part}${injury.value !== "" ? "_" + injury.value : ""}.webp`
        };
      }));
    }
  };
  return [injuries, armorBonuses, doc, $doc];
}
__name(instance$g, "instance$g");
class ActorInjuries extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$g, create_fragment$h, safe_not_equal, {});
  }
}
__name(ActorInjuries, "ActorInjuries");
function createActorSheetState(actor) {
  const tabs = [
    { value: "inventory", label: "Inventory", component: ActorInventory },
    { value: "traits", label: "Traits", component: ActorTraits },
    { value: "injuries", label: "Injuries", component: ActorInjuries },
    { value: "biography", label: "Biography", component: ActorBiography }
  ];
  const { set, update: update2, subscribe: subscribe2 } = writable$1({
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
      const pointsSpent = state.leveledUpSkills?.[skillId]?.pointsSpent ?? 0;
      const previousLevel = skillLevel + pointsSpent;
      const newLevel = previousLevel + amount;
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
  __name(assignSkillPoint, "assignSkillPoint");
  function canAssignSkillPoint(skillId, skillLevel, isAbility = false) {
    const state = get_store_value(this);
    const baseCost = isAbility ? 2 : 1;
    const pointsSpent = (state.leveledUpSkills?.[skillId]?.pointsSpent ?? 0) + baseCost;
    const level = skillLevel + pointsSpent;
    const cost = level >= 5 ? level : 1;
    return state.levelUpExperience + cost <= actor.system.experience.value;
  }
  __name(canAssignSkillPoint, "canAssignSkillPoint");
  function canSubtractSkillPoint(skillId) {
    const state = get_store_value(this);
    return (state.leveledUpSkills?.[skillId]?.pointsSpent ?? 0) > 0;
  }
  __name(canSubtractSkillPoint, "canSubtractSkillPoint");
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
  __name(addSkill, "addSkill");
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
    await actor.update({
      "system.experience.value": actor.system.experience.value - data.levelUpExperience,
      "system.experience.spent": actor.system.experience.spent + data.levelUpExperience,
      "system.experience.initialized": true
    });
    await actor.updateEmbeddedDocuments("Item", Object.entries(data.leveledUpSkills).map(([_id, skill]) => ({
      _id,
      "system.level": skill.level
    })));
    update2((state) => {
      state.initialized = true;
      return state;
    });
    abortLevelUp();
  }
  __name(confirmLevelUp, "confirmLevelUp");
  function abortLevelUp() {
    update2((state) => {
      state.levelingUp = false;
      state.leveledUpSkills = {};
      state.levelUpExperience = 0;
      return state;
    });
  }
  __name(abortLevelUp, "abortLevelUp");
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
  __name(deleteItem, "deleteItem");
  return {
    set,
    update: update2,
    subscribe: subscribe2,
    deleteItem,
    addSkill,
    assignSkillPoint,
    canAssignSkillPoint,
    canSubtractSkillPoint,
    confirmLevelUp,
    abortLevelUp
  };
}
__name(createActorSheetState, "createActorSheetState");
function create_fragment$g(ctx) {
  let applicationshell;
  let updating_elementRoot;
  let current;
  function applicationshell_elementRoot_binding(value) {
    ctx[1](value);
  }
  __name(applicationshell_elementRoot_binding, "applicationshell_elementRoot_binding");
  let applicationshell_props = {};
  if (
    /*elementRoot*/
    ctx[0] !== void 0
  ) {
    applicationshell_props.elementRoot = /*elementRoot*/
    ctx[0];
  }
  applicationshell = new ApplicationShell({ props: applicationshell_props });
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
__name(create_fragment$g, "create_fragment$g");
function instance$f($$self, $$props, $$invalidate) {
  let { elementRoot } = $$props;
  function applicationshell_elementRoot_binding(value) {
    elementRoot = value;
    $$invalidate(0, elementRoot);
  }
  __name(applicationshell_elementRoot_binding, "applicationshell_elementRoot_binding");
  $$self.$$set = ($$props2) => {
    if ("elementRoot" in $$props2)
      $$invalidate(0, elementRoot = $$props2.elementRoot);
  };
  return [elementRoot, applicationshell_elementRoot_binding];
}
__name(instance$f, "instance$f");
class Document_shell extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$f, create_fragment$g, safe_not_equal, { elementRoot: 0 });
  }
  get elementRoot() {
    return this.$$.ctx[0];
  }
  set elementRoot(elementRoot) {
    this.$$set({ elementRoot });
    flush();
  }
}
__name(Document_shell, "Document_shell");
class SvelteDocumentSheet extends SvelteApplication {
  // Document store that monitors updates to any assigned document.
  #documentStore = new TJSDocument(void 0, { delete: this.close.bind(this) });
  // Application store that monitors updates to any assigned document.
  #applicationStateStore = new writable$1({});
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
__name(SvelteDocumentSheet, "SvelteDocumentSheet");
const Tabs_svelte_svelte_type_style_lang = "";
function get_each_context$5(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[6] = list[i];
  child_ctx[8] = i;
  return child_ctx;
}
__name(get_each_context$5, "get_each_context$5");
function create_if_block_2$2(ctx) {
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
      if (detaching)
        detach(div);
    }
  };
}
__name(create_if_block_2$2, "create_if_block_2$2");
function create_if_block_1$3(ctx) {
  let i;
  let i_class_value;
  return {
    c() {
      i = element("i");
      attr(i, "class", i_class_value = "icon " + /*tab*/
      ctx[6].icon + " svelte-1p9zve8");
    },
    m(target, anchor) {
      insert(target, i, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*tabs*/
      2 && i_class_value !== (i_class_value = "icon " + /*tab*/
      ctx2[6].icon + " svelte-1p9zve8")) {
        attr(i, "class", i_class_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(i);
    }
  };
}
__name(create_if_block_1$3, "create_if_block_1$3");
function create_if_block$4(ctx) {
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
      if (detaching)
        detach(div);
    }
  };
}
__name(create_if_block$4, "create_if_block$4");
function create_each_block$5(key_1, ctx) {
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
    ctx[8] > 0 && create_if_block_2$2()
  );
  let if_block1 = (
    /*tab*/
    ctx[6].icon && create_if_block_1$3(ctx)
  );
  let if_block2 = (
    /*tab*/
    ctx[6].highlight && create_if_block$4()
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
  __name(click_handler, "click_handler");
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
      attr(div, "class", "item clickable clickable-red svelte-1p9zve8");
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
          if_block0 = create_if_block_2$2();
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
          if_block1 = create_if_block_1$3(ctx);
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
          if_block2 = create_if_block$4();
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
      if (detaching)
        detach(first);
      if (if_block0)
        if_block0.d(detaching);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(div);
      if (if_block1)
        if_block1.d();
      if (if_block2)
        if_block2.d();
      mounted = false;
      dispose();
    }
  };
}
__name(create_each_block$5, "create_each_block$5");
function create_fragment$f(ctx) {
  let nav;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let nav_style_value;
  let each_value = (
    /*tabs*/
    ctx[1].filter(func)
  );
  const get_key = /* @__PURE__ */ __name((ctx2) => (
    /*tab*/
    ctx2[6].value
  ), "get_key");
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context$5(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block$5(key, child_ctx));
  }
  return {
    c() {
      nav = element("nav");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(nav, "class", "tabs modesto svelte-1p9zve8");
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
      if (dirty & /*underscore, activeTab, tabs, localize, separateElements*/
      15) {
        each_value = /*tabs*/
        ctx2[1].filter(func);
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, nav, destroy_block, create_each_block$5, null, get_each_context$5);
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
      if (detaching)
        detach(nav);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
    }
  };
}
__name(create_fragment$f, "create_fragment$f");
const func = /* @__PURE__ */ __name((tab) => !tab.hidden, "func");
function instance$e($$self, $$props, $$invalidate) {
  let { activeTab } = $$props;
  let { tabs } = $$props;
  let { underscore = false } = $$props;
  let { separateElements = false } = $$props;
  const click_handler = /* @__PURE__ */ __name((tab) => {
    $$invalidate(0, activeTab = tab);
  }, "click_handler");
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
__name(instance$e, "instance$e");
class Tabs extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$e, create_fragment$f, safe_not_equal, {
      activeTab: 0,
      tabs: 1,
      underscore: 2,
      separateElements: 3
    });
  }
}
__name(Tabs, "Tabs");
const ActorAbility_svelte_svelte_type_style_lang = "";
function create_if_block_1$2(ctx) {
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
      if (detaching)
        detach(i);
      mounted = false;
      dispose();
    }
  };
}
__name(create_if_block_1$2, "create_if_block_1$2");
function create_if_block$3(ctx) {
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
      if (detaching)
        detach(i);
      mounted = false;
      dispose();
    }
  };
}
__name(create_if_block$3, "create_if_block$3");
function create_fragment$e(ctx) {
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
    ctx[2].levelingUp && create_if_block_1$2(ctx)
  );
  let if_block1 = (
    /*$appState*/
    ctx[2].levelingUp && create_if_block$3(ctx)
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
      attr(span, "class", "clickable clickable-red svelte-lzijsh");
      input.disabled = true;
      attr(input, "placeholder", "1");
      attr(input, "type", "number");
      input.value = input_value_value = /*ability*/
      ctx[1].value + /*pointsSpent*/
      ctx[5];
      attr(input, "class", "svelte-lzijsh");
      attr(div0, "class", "actor-ability-input-container svelte-lzijsh");
      attr(div1, "class", "actor-ability-container border-groove svelte-lzijsh");
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
          if_block0 = create_if_block_1$2(ctx2);
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
          if_block1 = create_if_block$3(ctx2);
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
      if (detaching)
        detach(div1);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      mounted = false;
      dispose();
    }
  };
}
__name(create_fragment$e, "create_fragment$e");
function instance$d($$self, $$props, $$invalidate) {
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
  const click_handler = /* @__PURE__ */ __name((event) => {
    $doc.rollAbility(key, { event });
  }, "click_handler");
  const click_handler_1 = /* @__PURE__ */ __name(() => {
    if (canSubtractSkillPoint)
      appState.assignSkillPoint(key, ability.value, -1, true);
  }, "click_handler_1");
  const click_handler_2 = /* @__PURE__ */ __name(() => {
    if (canAssignSkillPoint)
      appState.assignSkillPoint(key, ability.value, 1, true);
  }, "click_handler_2");
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
        $$invalidate(4, canSubtractSkillPoint = appState.canSubtractSkillPoint(key, ability.value));
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
__name(instance$d, "instance$d");
class ActorAbility extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$d, create_fragment$e, safe_not_equal, { key: 0, ability: 1 });
  }
}
__name(ActorAbility, "ActorAbility");
const ActorTopBar_svelte_svelte_type_style_lang = "";
function get_each_context$4(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[9] = list[i][0];
  child_ctx[10] = list[i][1];
  return child_ctx;
}
__name(get_each_context$4, "get_each_context$4");
function get_each_context_1$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[9] = list[i][0];
  child_ctx[13] = list[i][1];
  child_ctx[14] = list;
  child_ctx[15] = i;
  return child_ctx;
}
__name(get_each_context_1$1, "get_each_context_1$1");
function create_if_block_2$1(ctx) {
  let i;
  let mounted;
  let dispose;
  return {
    c() {
      i = element("i");
      attr(i, "class", "fas fa-times clickable clickable-faint clickable-red svelte-18q40cg");
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
      if (detaching)
        detach(i);
      mounted = false;
      dispose();
    }
  };
}
__name(create_if_block_2$1, "create_if_block_2$1");
function create_else_block(ctx) {
  let i;
  let mounted;
  let dispose;
  return {
    c() {
      i = element("i");
      attr(i, "class", "fas fa-edit clickable clickable-faint clickable-red svelte-18q40cg");
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
      if (detaching)
        detach(i);
      mounted = false;
      dispose();
    }
  };
}
__name(create_else_block, "create_else_block");
function create_if_block_1$1(ctx) {
  let i;
  let mounted;
  let dispose;
  return {
    c() {
      i = element("i");
      attr(i, "class", "fas fa-check clickable clickable-faint clickable-green svelte-18q40cg");
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
      if (detaching)
        detach(i);
      mounted = false;
      dispose();
    }
  };
}
__name(create_if_block_1$1, "create_if_block_1$1");
function create_if_block$2(ctx) {
  let div1;
  let label;
  let t0_value = CONFIG.LEOBREW.resources[
    /*key*/
    ctx[9]
  ] + "";
  let t0;
  let t1;
  let div0;
  let input0;
  let t2;
  let span;
  let t4;
  let input1;
  let input1_value_value;
  let t5;
  let mounted;
  let dispose;
  function input0_input_handler_1() {
    ctx[8].call(
      input0,
      /*each_value_1*/
      ctx[14],
      /*index*/
      ctx[15]
    );
  }
  __name(input0_input_handler_1, "input0_input_handler_1");
  return {
    c() {
      div1 = element("div");
      label = element("label");
      t0 = text(t0_value);
      t1 = space();
      div0 = element("div");
      input0 = element("input");
      t2 = space();
      span = element("span");
      span.textContent = "/";
      t4 = space();
      input1 = element("input");
      t5 = space();
      attr(label, "class", "svelte-18q40cg");
      attr(input0, "type", "number");
      attr(input0, "min", "0");
      attr(input0, "class", "svelte-18q40cg");
      attr(span, "class", "svelte-18q40cg");
      attr(input1, "type", "number");
      input1.disabled = true;
      input1.value = input1_value_value = /*resource*/
      ctx[13].max;
      attr(input1, "class", "svelte-18q40cg");
      attr(div0, "class", "actor-resource-values svelte-18q40cg");
      attr(div1, "class", "actor-resource svelte-18q40cg");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, label);
      append(label, t0);
      append(div1, t1);
      append(div1, div0);
      append(div0, input0);
      set_input_value(
        input0,
        /*resource*/
        ctx[13].value
      );
      append(div0, t2);
      append(div0, span);
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
        ctx[9]
      ] + ""))
        set_data(t0, t0_value);
      if (dirty & /*Object, $doc*/
      1 && to_number(input0.value) !== /*resource*/
      ctx[13].value) {
        set_input_value(
          input0,
          /*resource*/
          ctx[13].value
        );
      }
      if (dirty & /*$doc*/
      1 && input1_value_value !== (input1_value_value = /*resource*/
      ctx[13].max) && input1.value !== input1_value_value) {
        input1.value = input1_value_value;
      }
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      mounted = false;
      dispose();
    }
  };
}
__name(create_if_block$2, "create_if_block$2");
function create_each_block_1$1(key_1, ctx) {
  let first;
  let if_block_anchor;
  let if_block = (
    /*resource*/
    ctx[13].enabled && create_if_block$2(ctx)
  );
  return {
    key: key_1,
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
        ctx[13].enabled
      ) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$2(ctx);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d(detaching) {
      if (detaching)
        detach(first);
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
__name(create_each_block_1$1, "create_each_block_1$1");
function create_each_block$4(ctx) {
  let actorability;
  let current;
  actorability = new ActorAbility({
    props: {
      key: (
        /*key*/
        ctx[9]
      ),
      ability: (
        /*ability*/
        ctx[10]
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
        ctx2[9];
      if (dirty & /*$doc*/
      1)
        actorability_changes.ability = /*ability*/
        ctx2[10];
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
__name(create_each_block$4, "create_each_block$4");
function create_fragment$d(ctx) {
  let div4;
  let img;
  let img_src_value;
  let img_title_value;
  let t0;
  let div3;
  let input0;
  let t1;
  let div2;
  let div1;
  let label;
  let t3;
  let div0;
  let t4;
  let input1;
  let input1_value_value;
  let t5;
  let t6;
  let each_blocks_1 = [];
  let each0_lookup = /* @__PURE__ */ new Map();
  let t7;
  let div5;
  let current;
  let mounted;
  let dispose;
  let if_block0 = (
    /*$appState*/
    ctx[1].levelingUp && create_if_block_2$1(ctx)
  );
  function select_block_type(ctx2, dirty) {
    if (
      /*$appState*/
      ctx2[1].levelingUp
    )
      return create_if_block_1$1;
    return create_else_block;
  }
  __name(select_block_type, "select_block_type");
  let current_block_type = select_block_type(ctx);
  let if_block1 = current_block_type(ctx);
  let each_value_1 = Object.entries(
    /*$doc*/
    ctx[0].system.resources
  );
  const get_key = /* @__PURE__ */ __name((ctx2) => (
    /*resource*/
    ctx2[13]
  ), "get_key");
  for (let i = 0; i < each_value_1.length; i += 1) {
    let child_ctx = get_each_context_1$1(ctx, each_value_1, i);
    let key = get_key(child_ctx);
    each0_lookup.set(key, each_blocks_1[i] = create_each_block_1$1(key, child_ctx));
  }
  let each_value = Object.entries(
    /*$doc*/
    ctx[0].system.abilities
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
  }
  const out = /* @__PURE__ */ __name((i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  }), "out");
  return {
    c() {
      div4 = element("div");
      img = element("img");
      t0 = space();
      div3 = element("div");
      input0 = element("input");
      t1 = space();
      div2 = element("div");
      div1 = element("div");
      label = element("label");
      label.textContent = `${CONFIG.LEOBREW.resources.experience}`;
      t3 = space();
      div0 = element("div");
      if (if_block0)
        if_block0.c();
      t4 = space();
      input1 = element("input");
      t5 = space();
      if_block1.c();
      t6 = space();
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].c();
      }
      t7 = space();
      div5 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(img, "class", "actor-image svelte-18q40cg");
      if (!src_url_equal(img.src, img_src_value = /*$doc*/
      ctx[0].img))
        attr(img, "src", img_src_value);
      attr(img, "title", img_title_value = /*$doc*/
      ctx[0].name);
      attr(input0, "class", "actor-name-input form-control svelte-18q40cg");
      attr(input0, "placeholder", "Name");
      attr(input0, "type", "text");
      attr(label, "class", "svelte-18q40cg");
      input1.disabled = true;
      attr(input1, "min", "0");
      attr(input1, "type", "number");
      input1.value = input1_value_value = /*$doc*/
      ctx[0].system.experience.value - /*$appState*/
      ctx[1].levelUpExperience;
      attr(input1, "class", "svelte-18q40cg");
      attr(div0, "class", "actor-experience-container svelte-18q40cg");
      attr(div1, "class", "actor-resource svelte-18q40cg");
      attr(div2, "class", "actor-resource-bar svelte-18q40cg");
      attr(div3, "class", "actor-resource-bar-container svelte-18q40cg");
      attr(div4, "class", "actor-top-bar modesto svelte-18q40cg");
      attr(div5, "class", "actor-ability-bar modesto svelte-18q40cg");
    },
    m(target, anchor) {
      insert(target, div4, anchor);
      append(div4, img);
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
      append(div1, label);
      append(div1, t3);
      append(div1, div0);
      if (if_block0)
        if_block0.m(div0, null);
      append(div0, t4);
      append(div0, input1);
      append(div0, t5);
      if_block1.m(div0, null);
      append(div2, t6);
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        if (each_blocks_1[i]) {
          each_blocks_1[i].m(div2, null);
        }
      }
      insert(target, t7, anchor);
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
      if (!current || dirty & /*$doc*/
      1 && !src_url_equal(img.src, img_src_value = /*$doc*/
      ctx2[0].img)) {
        attr(img, "src", img_src_value);
      }
      if (!current || dirty & /*$doc*/
      1 && img_title_value !== (img_title_value = /*$doc*/
      ctx2[0].name)) {
        attr(img, "title", img_title_value);
      }
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
          if_block0 = create_if_block_2$1(ctx2);
          if_block0.c();
          if_block0.m(div0, t4);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (!current || dirty & /*$doc, $appState*/
      3 && input1_value_value !== (input1_value_value = /*$doc*/
      ctx2[0].system.experience.value - /*$appState*/
      ctx2[1].levelUpExperience) && input1.value !== input1_value_value) {
        input1.value = input1_value_value;
      }
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block1) {
        if_block1.p(ctx2, dirty);
      } else {
        if_block1.d(1);
        if_block1 = current_block_type(ctx2);
        if (if_block1) {
          if_block1.c();
          if_block1.m(div0, null);
        }
      }
      if (dirty & /*Object, $doc, CONFIG*/
      1) {
        each_value_1 = Object.entries(
          /*$doc*/
          ctx2[0].system.resources
        );
        each_blocks_1 = update_keyed_each(each_blocks_1, dirty, get_key, 1, ctx2, each_value_1, each0_lookup, div2, destroy_block, create_each_block_1$1, null, get_each_context_1$1);
      }
      if (dirty & /*Object, $doc*/
      1) {
        each_value = Object.entries(
          /*$doc*/
          ctx2[0].system.abilities
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
      if (detaching)
        detach(div4);
      if (if_block0)
        if_block0.d();
      if_block1.d();
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].d();
      }
      if (detaching)
        detach(t7);
      if (detaching)
        detach(div5);
      destroy_each(each_blocks, detaching);
      mounted = false;
      dispose();
    }
  };
}
__name(create_fragment$d, "create_fragment$d");
function instance$c($$self, $$props, $$invalidate) {
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
  __name(input0_input_handler, "input0_input_handler");
  const click_handler = /* @__PURE__ */ __name(() => {
    appState.abortLevelUp();
  }, "click_handler");
  const click_handler_1 = /* @__PURE__ */ __name(() => {
    appState.confirmLevelUp();
  }, "click_handler_1");
  const click_handler_2 = /* @__PURE__ */ __name(() => {
    set_store_value(appState, $appState.levelingUp = true, $appState);
  }, "click_handler_2");
  function input0_input_handler_1(each_value_1, index2) {
    each_value_1[index2][1].value = to_number(this.value);
  }
  __name(input0_input_handler_1, "input0_input_handler_1");
  return [
    $doc,
    $appState,
    doc,
    appState,
    input0_input_handler,
    click_handler,
    click_handler_1,
    click_handler_2,
    input0_input_handler_1
  ];
}
__name(instance$c, "instance$c");
class ActorTopBar extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$c, create_fragment$d, safe_not_equal, {});
  }
}
__name(ActorTopBar, "ActorTopBar");
const ActorSkill_svelte_svelte_type_style_lang = "";
function get_each_context$3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[17] = list[i];
  return child_ctx;
}
__name(get_each_context$3, "get_each_context$3");
function create_if_block_2(ctx) {
  let i;
  let mounted;
  let dispose;
  return {
    c() {
      i = element("i");
      attr(i, "class", "fas fa-minus svelte-q0luqg");
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
          ctx[10]
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
      if (detaching)
        detach(i);
      mounted = false;
      dispose();
    }
  };
}
__name(create_if_block_2, "create_if_block_2");
function create_if_block_1(ctx) {
  let i;
  let mounted;
  let dispose;
  return {
    c() {
      i = element("i");
      attr(i, "class", "fas fa-plus svelte-q0luqg");
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
          ctx[11]
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
      if (detaching)
        detach(i);
      mounted = false;
      dispose();
    }
  };
}
__name(create_if_block_1, "create_if_block_1");
function create_if_block$1(ctx) {
  let each_1_anchor;
  let each_value = (
    /*subSkills*/
    ctx[4]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
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
      if (dirty & /*skill, subSkills, skillBonus, pointsSpent*/
      177) {
        each_value = /*subSkills*/
        ctx2[4];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$3(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$3(child_ctx);
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
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(each_1_anchor);
    }
  };
}
__name(create_if_block$1, "create_if_block$1");
function create_each_block$3(ctx) {
  let div1;
  let input;
  let input_value_value;
  let t0;
  let div0;
  let label;
  let t1_value = (
    /*subSkill*/
    ctx[17].name + ""
  );
  let t1;
  let t2;
  let mounted;
  let dispose;
  function click_handler_5(...args) {
    return (
      /*click_handler_5*/
      ctx[15](
        /*subSkill*/
        ctx[17],
        ...args
      )
    );
  }
  __name(click_handler_5, "click_handler_5");
  return {
    c() {
      div1 = element("div");
      input = element("input");
      t0 = space();
      div0 = element("div");
      label = element("label");
      t1 = text(t1_value);
      t2 = space();
      input.disabled = true;
      attr(input, "max", "10");
      attr(input, "min", "1");
      attr(input, "type", "number");
      input.value = input_value_value = /*subSkill*/
      ctx[17].bonus + /*skillBonus*/
      ctx[5] + /*pointsSpent*/
      ctx[7];
      attr(input, "class", "svelte-q0luqg");
      attr(label, "class", "skill-name clickable clickable-red");
      attr(div0, "class", "svelte-q0luqg");
      attr(div1, "class", "actor-skill actor-subskill svelte-q0luqg");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, input);
      append(div1, t0);
      append(div1, div0);
      append(div0, label);
      append(label, t1);
      append(div1, t2);
      if (!mounted) {
        dispose = listen(label, "click", click_handler_5);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*subSkills, skillBonus, pointsSpent*/
      176 && input_value_value !== (input_value_value = /*subSkill*/
      ctx[17].bonus + /*skillBonus*/
      ctx[5] + /*pointsSpent*/
      ctx[7]) && input.value !== input_value_value) {
        input.value = input_value_value;
      }
      if (dirty & /*subSkills*/
      16 && t1_value !== (t1_value = /*subSkill*/
      ctx[17].name + ""))
        set_data(t1, t1_value);
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      mounted = false;
      dispose();
    }
  };
}
__name(create_each_block$3, "create_each_block$3");
function create_fragment$c(ctx) {
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
    ctx[7] ? ` (+${/*realPointsSpent*/
    ctx[6]})` : ""
  );
  let t4;
  let t5;
  let i0;
  let t6;
  let i1;
  let t7;
  let if_block2_anchor;
  let mounted;
  let dispose;
  let if_block0 = (
    /*$appState*/
    ctx[1].levelingUp && create_if_block_2(ctx)
  );
  let if_block1 = (
    /*$appState*/
    ctx[1].levelingUp && create_if_block_1(ctx)
  );
  let if_block2 = (
    /*subSkills*/
    ctx[4].length && create_if_block$1(ctx)
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
      if (if_block2)
        if_block2.c();
      if_block2_anchor = empty();
      input.disabled = true;
      attr(input, "max", "10");
      attr(input, "min", "1");
      attr(input, "type", "number");
      attr(input, "data-tooltip", input_data_tooltip_value = /*skillBonus*/
      ctx[5] ? `Base ${/*skill*/
      ctx[0].system.level} (${/*skillBonus*/
      ctx[5]} bonus)` : "");
      input.value = input_value_value = /*$appState*/
      ctx[1].levelingUp ? (
        /*skill*/
        ctx[0].system.level + /*pointsSpent*/
        ctx[7]
      ) : (
        /*skill*/
        ctx[0].system.level + /*skillBonus*/
        ctx[5]
      );
      attr(input, "class", "svelte-q0luqg");
      attr(label, "class", "skill-name clickable clickable-red");
      attr(div0, "class", "svelte-q0luqg");
      attr(i0, "class", "fas fa-edit skill-edit-button clickable clickable-red svelte-q0luqg");
      attr(i1, "class", "fas fa-trash skill-edit-button clickable clickable-red svelte-q0luqg");
      attr(div1, "class", "actor-skill svelte-q0luqg");
      attr(div1, "draggable", "true");
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
      append(div1, t5);
      append(div1, i0);
      append(div1, t6);
      append(div1, i1);
      insert(target, t7, anchor);
      if (if_block2)
        if_block2.m(target, anchor);
      insert(target, if_block2_anchor, anchor);
      if (!mounted) {
        dispose = [
          listen(
            label,
            "click",
            /*click_handler_2*/
            ctx[12]
          ),
          listen(
            i0,
            "click",
            /*click_handler_3*/
            ctx[13]
          ),
          listen(
            i1,
            "click",
            /*click_handler_4*/
            ctx[14]
          ),
          listen(
            div1,
            "dragstart",
            /*dragStart*/
            ctx[9]
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
          if_block0 = create_if_block_2(ctx2);
          if_block0.c();
          if_block0.m(div1, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (dirty & /*skillBonus, skill*/
      33 && input_data_tooltip_value !== (input_data_tooltip_value = /*skillBonus*/
      ctx2[5] ? `Base ${/*skill*/
      ctx2[0].system.level} (${/*skillBonus*/
      ctx2[5]} bonus)` : "")) {
        attr(input, "data-tooltip", input_data_tooltip_value);
      }
      if (dirty & /*$appState, skill, pointsSpent, skillBonus*/
      163 && input_value_value !== (input_value_value = /*$appState*/
      ctx2[1].levelingUp ? (
        /*skill*/
        ctx2[0].system.level + /*pointsSpent*/
        ctx2[7]
      ) : (
        /*skill*/
        ctx2[0].system.level + /*skillBonus*/
        ctx2[5]
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
          if_block1 = create_if_block_1(ctx2);
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
      192 && t4_value !== (t4_value = /*pointsSpent*/
      ctx2[7] ? ` (+${/*realPointsSpent*/
      ctx2[6]})` : ""))
        set_data(t4, t4_value);
      if (
        /*subSkills*/
        ctx2[4].length
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
        } else {
          if_block2 = create_if_block$1(ctx2);
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
      if (detaching)
        detach(div1);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      if (detaching)
        detach(t7);
      if (if_block2)
        if_block2.d(detaching);
      if (detaching)
        detach(if_block2_anchor);
      mounted = false;
      run_all(dispose);
    }
  };
}
__name(create_fragment$c, "create_fragment$c");
function instance$b($$self, $$props, $$invalidate) {
  let pointsSpent;
  let realPointsSpent;
  let $appState;
  const appState = getContext("ApplicationStateStore");
  component_subscribe($$self, appState, (value) => $$invalidate(1, $appState = value));
  getContext("DocumentStore");
  let { skill } = $$props;
  let canAssignSkillPoint = false;
  let canSubtractSkillPoint = false;
  let subSkills = [];
  let skillBonus = 0;
  function dragStart(event) {
    event.dataTransfer.setData("text/plain", JSON.stringify({ type: "Item", uuid: skill.uuid }));
  }
  __name(dragStart, "dragStart");
  const click_handler = /* @__PURE__ */ __name(() => {
    if (canSubtractSkillPoint)
      appState.assignSkillPoint(skill.id, skill.system.level, -1);
  }, "click_handler");
  const click_handler_1 = /* @__PURE__ */ __name(() => {
    if (canAssignSkillPoint)
      appState.assignSkillPoint(skill.id, skill.system.level, 1);
  }, "click_handler_1");
  const click_handler_2 = /* @__PURE__ */ __name((event) => {
    skill.roll({ event });
  }, "click_handler_2");
  const click_handler_3 = /* @__PURE__ */ __name(() => {
    skill.sheet.render(true, { width: 200, height: 200, left: 0, top: 0 });
  }, "click_handler_3");
  const click_handler_4 = /* @__PURE__ */ __name(() => {
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
  }, "click_handler_4");
  const click_handler_5 = /* @__PURE__ */ __name((subSkill, event) => {
    skill.roll({
      event,
      extraTitle: subSkill.name,
      subSkill
    });
  }, "click_handler_5");
  $$self.$$set = ($$props2) => {
    if ("skill" in $$props2)
      $$invalidate(0, skill = $$props2.skill);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$appState, skill*/
    3) {
      {
        $$invalidate(2, canAssignSkillPoint = appState.canAssignSkillPoint(skill.id, skill.system.level));
        $$invalidate(3, canSubtractSkillPoint = appState.canSubtractSkillPoint(skill.id, skill.system.level));
        $$invalidate(4, subSkills = skill.parent.getSubSkills(skill));
        $$invalidate(5, skillBonus = skill.parent.getBonusForSkill(skill));
      }
    }
    if ($$self.$$.dirty & /*$appState, skill*/
    3) {
      $$invalidate(7, pointsSpent = $appState.leveledUpSkills?.[skill.id]?.pointsSpent ?? 0);
    }
    if ($$self.$$.dirty & /*$appState, skill*/
    3) {
      $$invalidate(6, realPointsSpent = $appState.leveledUpSkills?.[skill.id]?.cost ?? 0);
    }
  };
  return [
    skill,
    $appState,
    canAssignSkillPoint,
    canSubtractSkillPoint,
    subSkills,
    skillBonus,
    realPointsSpent,
    pointsSpent,
    appState,
    dragStart,
    click_handler,
    click_handler_1,
    click_handler_2,
    click_handler_3,
    click_handler_4,
    click_handler_5
  ];
}
__name(instance$b, "instance$b");
class ActorSkill extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$b, create_fragment$c, safe_not_equal, { skill: 0 });
  }
}
__name(ActorSkill, "ActorSkill");
const ActorSkills_svelte_svelte_type_style_lang = "";
function get_each_context$2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[12] = list[i][0];
  child_ctx[13] = list[i][1];
  return child_ctx;
}
__name(get_each_context$2, "get_each_context$2");
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[16] = list[i];
  return child_ctx;
}
__name(get_each_context_1, "get_each_context_1");
function create_each_block_1(ctx) {
  let actorskill;
  let current;
  actorskill = new ActorSkill({ props: { skill: (
    /*skill*/
    ctx[16]
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
      2)
        actorskill_changes.skill = /*skill*/
        ctx2[16];
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
__name(create_each_block_1, "create_each_block_1");
function create_each_block$2(ctx) {
  let span;
  let t0_value = (
    /*category*/
    ctx[12] + ""
  );
  let t0;
  let t1;
  let each_1_anchor;
  let current;
  let each_value_1 = (
    /*skills*/
    ctx[13]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  const out = /* @__PURE__ */ __name((i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  }), "out");
  return {
    c() {
      span = element("span");
      t0 = text(t0_value);
      t1 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
      attr(span, "class", "skill-category-title modesto svelte-1jwko46");
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
      2) && t0_value !== (t0_value = /*category*/
      ctx2[12] + ""))
        set_data(t0, t0_value);
      if (dirty & /*categorizedSkills*/
      2) {
        each_value_1 = /*skills*/
        ctx2[13];
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
      if (detaching)
        detach(span);
      if (detaching)
        detach(t1);
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(each_1_anchor);
    }
  };
}
__name(create_each_block$2, "create_each_block$2");
function create_fragment$b(ctx) {
  let div4;
  let div1;
  let span0;
  let t1;
  let div0;
  let input;
  let t2;
  let button;
  let t3;
  let div3;
  let span1;
  let t5;
  let div2;
  let label;
  let t7;
  let current;
  let mounted;
  let dispose;
  let each_value = (
    /*categorizedSkills*/
    ctx[1]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
  }
  const out = /* @__PURE__ */ __name((i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  }), "out");
  return {
    c() {
      div4 = element("div");
      div1 = element("div");
      span0 = element("span");
      span0.textContent = `${localize("LEOBREW.SkillAddTitle")}`;
      t1 = space();
      div0 = element("div");
      input = element("input");
      t2 = space();
      button = element("button");
      button.innerHTML = `<i class="fas fa-plus"></i>`;
      t3 = space();
      div3 = element("div");
      span1 = element("span");
      span1.textContent = "Generic";
      t5 = space();
      div2 = element("div");
      label = element("label");
      label.textContent = "Naked D10 Roll";
      t7 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(span0, "class", "skill-category-title modesto svelte-1jwko46");
      attr(input, "type", "text");
      attr(input, "class", "actor-skill-name-input svelte-1jwko46");
      attr(input, "placeholder", "Skill name");
      attr(button, "type", "button");
      attr(button, "class", "skill-add svelte-1jwko46");
      attr(div0, "class", "actor-skills-list-add-container svelte-1jwko46");
      attr(div1, "class", "actor-skills-list-add");
      attr(span1, "class", "skill-category-title modesto svelte-1jwko46");
      attr(label, "class", "skill-name clickable clickable-red");
      attr(div2, "class", "actor-skill");
      attr(div3, "class", "actor-skills-list svelte-1jwko46");
      attr(div4, "class", "actor-skills-list-container svelte-1jwko46");
    },
    m(target, anchor) {
      insert(target, div4, anchor);
      append(div4, div1);
      append(div1, span0);
      append(div1, t1);
      append(div1, div0);
      append(div0, input);
      set_input_value(
        input,
        /*newSkillName*/
        ctx[0]
      );
      append(div0, t2);
      append(div0, button);
      append(div4, t3);
      append(div4, div3);
      append(div3, span1);
      append(div3, t5);
      append(div3, div2);
      append(div2, label);
      append(div3, t7);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div3, null);
        }
      }
      current = true;
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
          ),
          listen(
            label,
            "click",
            /*click_handler_1*/
            ctx[10]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*newSkillName*/
      1 && input.value !== /*newSkillName*/
      ctx2[0]) {
        set_input_value(
          input,
          /*newSkillName*/
          ctx2[0]
        );
      }
      if (dirty & /*categorizedSkills*/
      2) {
        each_value = /*categorizedSkills*/
        ctx2[1];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$2(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$2(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div3, null);
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
      if (detaching)
        detach(div4);
      destroy_each(each_blocks, detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
__name(create_fragment$b, "create_fragment$b");
function instance$a($$self, $$props, $$invalidate) {
  let categorizedSkills;
  let $allSkills;
  let $doc;
  const appState = getContext("ApplicationStateStore");
  const doc = getContext("DocumentStore");
  component_subscribe($$self, doc, (value) => $$invalidate(2, $doc = value));
  const allSkills = doc.embedded.create("Item", {
    name: "skills",
    filters: [
      (item) => {
        return item.type === "skill";
      }
    ]
  });
  component_subscribe($$self, allSkills, (value) => $$invalidate(6, $allSkills = value));
  let newSkillName = "";
  function createNewSkill() {
    appState.addSkill(newSkillName);
    $$invalidate(0, newSkillName = "");
  }
  __name(createNewSkill, "createNewSkill");
  function input_input_handler() {
    newSkillName = this.value;
    $$invalidate(0, newSkillName);
  }
  __name(input_input_handler, "input_input_handler");
  const keydown_handler = /* @__PURE__ */ __name((event) => {
    if (event.code !== "Enter")
      return;
    createNewSkill();
  }, "keydown_handler");
  const click_handler = /* @__PURE__ */ __name(async () => createNewSkill(), "click_handler");
  const click_handler_1 = /* @__PURE__ */ __name((event) => {
    $doc.rollGeneric({ event });
  }, "click_handler_1");
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$allSkills*/
    64) {
      $$invalidate(1, categorizedSkills = Object.entries([...$allSkills].reduce(
        (acc, skill) => {
          if (!acc[skill.system.category])
            acc[skill.system.category] = [];
          acc[skill.system.category].push(skill);
          acc[skill.system.category].sort((a, b) => {
            return b.name > a.name ? -1 : 1;
          });
          return acc;
        },
        {}
      )).sort((a, b) => {
        return b[0] > a[0] ? -1 : 1;
      }));
    }
  };
  return [
    newSkillName,
    categorizedSkills,
    $doc,
    doc,
    allSkills,
    createNewSkill,
    $allSkills,
    input_input_handler,
    keydown_handler,
    click_handler,
    click_handler_1
  ];
}
__name(instance$a, "instance$a");
class ActorSkills extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$a, create_fragment$b, safe_not_equal, {});
  }
}
__name(ActorSkills, "ActorSkills");
const ActorMainBody_svelte_svelte_type_style_lang = "";
function create_fragment$a(ctx) {
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
  __name(tabs_activeTab_binding, "tabs_activeTab_binding");
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
  function switch_props(ctx2) {
    return {};
  }
  __name(switch_props, "switch_props");
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
      attr(div0, "class", "actor-center-section svelte-yj2n7u");
      attr(div1, "class", "actor-main-body svelte-yj2n7u");
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
      if (detaching)
        detach(div1);
      destroy_component(actorskills);
      destroy_component(tabs);
      if (switch_instance)
        destroy_component(switch_instance);
    }
  };
}
__name(create_fragment$a, "create_fragment$a");
function instance$9($$self, $$props, $$invalidate) {
  let $appState;
  const appState = getContext("ApplicationStateStore");
  component_subscribe($$self, appState, (value) => $$invalidate(0, $appState = value));
  function tabs_activeTab_binding(value) {
    if ($$self.$$.not_equal($appState.activeTab, value)) {
      $appState.activeTab = value;
      appState.set($appState);
    }
  }
  __name(tabs_activeTab_binding, "tabs_activeTab_binding");
  return [$appState, appState, tabs_activeTab_binding];
}
__name(instance$9, "instance$9");
class ActorMainBody extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$9, create_fragment$a, safe_not_equal, {});
  }
}
__name(ActorMainBody, "ActorMainBody");
const actorShell_svelte_svelte_type_style_lang = "";
function create_default_slot$1(ctx) {
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
      attr(div, "class", "actor-sheet svelte-mlq4tq");
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
      if (detaching)
        detach(div);
      destroy_component(actortopbar);
      destroy_component(actormainbody);
    }
  };
}
__name(create_default_slot$1, "create_default_slot$1");
function create_fragment$9(ctx) {
  let applicationshell;
  let updating_elementRoot;
  let current;
  function applicationshell_elementRoot_binding(value) {
    ctx[3](value);
  }
  __name(applicationshell_elementRoot_binding, "applicationshell_elementRoot_binding");
  let applicationshell_props = {
    $$slots: { default: [create_default_slot$1] },
    $$scope: { ctx }
  };
  if (
    /*elementRoot*/
    ctx[0] !== void 0
  ) {
    applicationshell_props.elementRoot = /*elementRoot*/
    ctx[0];
  }
  applicationshell = new ApplicationShell({ props: applicationshell_props });
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
      32) {
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
__name(create_fragment$9, "create_fragment$9");
function instance$8($$self, $$props, $$invalidate) {
  let { elementRoot } = $$props;
  let { documentStore } = $$props;
  let { applicationStateStore } = $$props;
  setContext("DocumentStore", documentStore);
  setContext("ApplicationStateStore", applicationStateStore);
  getContext("ApplicationStateStore");
  function applicationshell_elementRoot_binding(value) {
    elementRoot = value;
    $$invalidate(0, elementRoot);
  }
  __name(applicationshell_elementRoot_binding, "applicationshell_elementRoot_binding");
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
__name(instance$8, "instance$8");
class Actor_shell extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$8, create_fragment$9, safe_not_equal, {
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
__name(Actor_shell, "Actor_shell");
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
__name(LeobrewActorSheet, "LeobrewActorSheet");
class DocumentSheetHelper {
  static async createDialog(data = {}, options = {}) {
    const documentName = this.metadata.name;
    const folders = game.folders.filter((f) => f.data.type === documentName && f.displayed);
    const label = game.i18n.localize(this.metadata.label);
    const title = game.i18n.format("DOCUMENT.Create", { type: label });
    const collection = game.collections.get(this.documentName);
    const templates = collection.filter((a) => a.getFlag("leobrew", "isTemplate"));
    const defaultType = this.metadata.types[0];
    const types = {
      [defaultType]: game.i18n.localize("LEOBREW.NoTemplate")
    };
    for (let a of templates) {
      types[a.id] = a.name;
    }
    const html = await renderTemplate(`templates/sidebar/document-create.html`, {
      name: data.name || game.i18n.format("DOCUMENT.New", { type: label }),
      folder: data.folder,
      folders,
      hasFolders: folders.length > 1,
      type: defaultType,
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
__name(DocumentSheetHelper, "DocumentSheetHelper");
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
  if (previousRollData?.subSkill?.isWeaponSkill && !fumbleCritical) {
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
  if (rollToRound.total === 2 && messageData.natural) {
    messageData.roundedRoll = [
      "Nope",
      "2?!",
      "No can do",
      "Nix",
      "Nada",
      "wtf?"
    ][Math.floor(Math.random() * 6)];
  }
  messageData.content = await renderTemplate("systems/leobrew/templates/chat/roll-card.html", messageData);
  await ChatMessage.create(messageData);
  return roll;
}
__name(d10Roll, "d10Roll");
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
  getBonusForSkill(skill, subSkill = false) {
    return this.equippedItems.filter((item) => item.system.tiedSkills[skill.id]).reduce((totalBonus, item) => {
      const tiedSkillConfig = item.system.tiedSkills[skill.id];
      tiedSkillConfig.filter((tiedSkill) => {
        if (subSkill) {
          return subSkill === tiedSkill.name || !tiedSkill.isSubSkill;
        }
        return !tiedSkill.isSubSkill;
      }).forEach((tiedSkill) => {
        if (tiedSkill.bonus) {
          totalBonus += tiedSkill.bonus;
        }
      });
      return totalBonus;
    }, 0);
  }
  getSubSkills(skill) {
    return this.equippedItems.filter((item) => item.system.tiedSkills[skill.id] && item.system.tiedSkills[skill.id].some((tiedSkill) => {
      return tiedSkill.isSubSkill;
    })).map((item) => {
      return item.system.tiedSkills[skill.id].filter((tiedSkill) => tiedSkill.isSubSkill);
    }).deepFlatten().map((subSkill) => foundry.utils.deepClone(subSkill)).map((subSkill) => {
      subSkill.bonus += skill.system.level;
      return subSkill;
    }).sort((a, b) => a.name > b.name);
  }
  // Prepare Player type specific data
  prepareDerivedData() {
    super.prepareDerivedData();
    this._prepareDerivedResources();
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
__name(LeobrewActor, "LeobrewActor");
class LeobrewItem extends Item {
  /**
   * @param {Object} options            Options which configure how ability tests are rolled
   * @return {Promise<d10Roll>|Boolean} A Promise which resolves to the created Roll instance
   */
  roll(options = {}) {
    if (!this.parent) {
      throw new Error("Cannot roll unowned items!");
    }
    switch (this.type) {
      case "skill":
        return this.#rollSkill(options);
      case "trait":
        return this.#useTrait(options);
      case "equipment":
        return this.#useEquipment(options);
    }
    return false;
  }
  async #rollSkill(options = {}) {
    const parts = ["@value"];
    const data = {
      value: this.system.level,
      bonus: this.parent.getBonusForSkill(this, options?.subSkill?.name)
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
          subSkill: options?.subSkill ?? null
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
__name(LeobrewItem, "LeobrewItem");
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
    document2.update({ [accessor]: ev.target[valueKey] });
  }
  __name(onChange, "onChange");
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
  __name(onDocChange, "onDocChange");
  function activateListeners() {
    node.addEventListener("change", onChange);
  }
  __name(activateListeners, "activateListeners");
  function removeListeners() {
    node.removeEventListener("change", onChange);
  }
  __name(removeListeners, "removeListeners");
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
__name(updateDoc, "updateDoc");
const ItemHeader_svelte_svelte_type_style_lang = "";
function create_fragment$8(ctx) {
  let header;
  let img;
  let img_src_value;
  let img_title_value;
  let t;
  let input;
  let mounted;
  let dispose;
  return {
    c() {
      header = element("header");
      img = element("img");
      t = space();
      input = element("input");
      if (!src_url_equal(img.src, img_src_value = /*$doc*/
      ctx[0].img))
        attr(img, "src", img_src_value);
      attr(img, "title", img_title_value = /*$doc*/
      ctx[0].name);
      attr(img, "class", "svelte-sc0e04");
      attr(input, "type", "text");
      attr(input, "placeholder", localize(`LEOBREW.${/*capType*/
      ctx[2]}Name`));
      attr(input, "class", "svelte-sc0e04");
      attr(header, "class", "sheet-header svelte-sc0e04");
    },
    m(target, anchor) {
      insert(target, header, anchor);
      append(header, img);
      append(header, t);
      append(header, input);
      if (!mounted) {
        dispose = action_destroyer(updateDoc.call(null, input, { doc: (
          /*doc*/
          ctx[1]
        ), accessor: "name" }));
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*$doc*/
      1 && !src_url_equal(img.src, img_src_value = /*$doc*/
      ctx2[0].img)) {
        attr(img, "src", img_src_value);
      }
      if (dirty & /*$doc*/
      1 && img_title_value !== (img_title_value = /*$doc*/
      ctx2[0].name)) {
        attr(img, "title", img_title_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(header);
      mounted = false;
      dispose();
    }
  };
}
__name(create_fragment$8, "create_fragment$8");
function instance$7($$self, $$props, $$invalidate) {
  let $doc;
  getContext("ApplicationStateStore");
  const doc = getContext("DocumentStore");
  component_subscribe($$self, doc, (value) => $$invalidate(0, $doc = value));
  const capType = capitalizeFirstLetter($doc.type);
  return [$doc, doc, capType];
}
__name(instance$7, "instance$7");
class ItemHeader extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$7, create_fragment$8, safe_not_equal, {});
  }
}
__name(ItemHeader, "ItemHeader");
const Description_svelte_svelte_type_style_lang = "";
function create_fragment$7(ctx) {
  let div;
  let tjsprosemirror;
  let updating_content;
  let current;
  function tjsprosemirror_content_binding(value) {
    ctx[3](value);
  }
  __name(tjsprosemirror_content_binding, "tjsprosemirror_content_binding");
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
      attr(div, "class", "description-container svelte-i87dh7");
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
      if (detaching)
        detach(div);
      destroy_component(tjsprosemirror);
    }
  };
}
__name(create_fragment$7, "create_fragment$7");
function instance$6($$self, $$props, $$invalidate) {
  let $doc;
  getContext("ApplicationStateStore");
  const doc = getContext("DocumentStore");
  component_subscribe($$self, doc, (value) => $$invalidate(2, $doc = value));
  let content = $doc.system.description.value;
  function tjsprosemirror_content_binding(value) {
    content = value;
    $$invalidate(0, content);
  }
  __name(tjsprosemirror_content_binding, "tjsprosemirror_content_binding");
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
__name(instance$6, "instance$6");
class Description extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$7, safe_not_equal, {});
  }
}
__name(Description, "Description");
function create_fragment$6(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.textContent = "hello";
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
__name(create_fragment$6, "create_fragment$6");
class ArmorBonuses extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$6, safe_not_equal, {});
  }
}
__name(ArmorBonuses, "ArmorBonuses");
const SkillBonus_svelte_svelte_type_style_lang = "";
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[14] = list[i];
  child_ctx[15] = list;
  child_ctx[16] = i;
  return child_ctx;
}
__name(get_each_context$1, "get_each_context$1");
function create_each_block$1(ctx) {
  let input0;
  let t0;
  let input1;
  let t1;
  let input2;
  let t2;
  let input3;
  let t3;
  let i;
  let mounted;
  let dispose;
  function input0_input_handler() {
    ctx[8].call(
      input0,
      /*each_value*/
      ctx[15],
      /*index*/
      ctx[16]
    );
  }
  __name(input0_input_handler, "input0_input_handler");
  function input1_input_handler() {
    ctx[9].call(
      input1,
      /*each_value*/
      ctx[15],
      /*index*/
      ctx[16]
    );
  }
  __name(input1_input_handler, "input1_input_handler");
  function input2_change_handler() {
    ctx[10].call(
      input2,
      /*each_value*/
      ctx[15],
      /*index*/
      ctx[16]
    );
  }
  __name(input2_change_handler, "input2_change_handler");
  function input3_change_handler() {
    ctx[11].call(
      input3,
      /*each_value*/
      ctx[15],
      /*index*/
      ctx[16]
    );
  }
  __name(input3_change_handler, "input3_change_handler");
  function click_handler() {
    return (
      /*click_handler*/
      ctx[12](
        /*index*/
        ctx[16]
      )
    );
  }
  __name(click_handler, "click_handler");
  return {
    c() {
      input0 = element("input");
      t0 = space();
      input1 = element("input");
      t1 = space();
      input2 = element("input");
      t2 = space();
      input3 = element("input");
      t3 = space();
      i = element("i");
      attr(input0, "type", "text");
      attr(input0, "class", "name svelte-1imd6gl");
      attr(input1, "type", "number");
      attr(input1, "class", "svelte-1imd6gl");
      attr(input2, "type", "checkbox");
      attr(input2, "class", "svelte-1imd6gl");
      attr(input3, "type", "checkbox");
      attr(input3, "class", "svelte-1imd6gl");
      attr(i, "class", "fas fa-times clickable clickable-red svelte-1imd6gl");
    },
    m(target, anchor) {
      insert(target, input0, anchor);
      set_input_value(
        input0,
        /*tiedSkill*/
        ctx[14].name
      );
      insert(target, t0, anchor);
      insert(target, input1, anchor);
      set_input_value(
        input1,
        /*tiedSkill*/
        ctx[14].bonus
      );
      insert(target, t1, anchor);
      insert(target, input2, anchor);
      input2.checked = /*tiedSkill*/
      ctx[14].isSubSkill;
      insert(target, t2, anchor);
      insert(target, input3, anchor);
      input3.checked = /*tiedSkill*/
      ctx[14].isWeaponSkill;
      insert(target, t3, anchor);
      insert(target, i, anchor);
      if (!mounted) {
        dispose = [
          listen(input0, "input", input0_input_handler),
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
          listen(input2, "change", input2_change_handler),
          listen(
            input2,
            "change",
            /*updateTiedSkills*/
            ctx[4]
          ),
          listen(input3, "change", input3_change_handler),
          listen(
            input3,
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
      1 && input0.value !== /*tiedSkill*/
      ctx[14].name) {
        set_input_value(
          input0,
          /*tiedSkill*/
          ctx[14].name
        );
      }
      if (dirty & /*tiedSkills*/
      1 && to_number(input1.value) !== /*tiedSkill*/
      ctx[14].bonus) {
        set_input_value(
          input1,
          /*tiedSkill*/
          ctx[14].bonus
        );
      }
      if (dirty & /*tiedSkills*/
      1) {
        input2.checked = /*tiedSkill*/
        ctx[14].isSubSkill;
      }
      if (dirty & /*tiedSkills*/
      1) {
        input3.checked = /*tiedSkill*/
        ctx[14].isWeaponSkill;
      }
    },
    d(detaching) {
      if (detaching)
        detach(input0);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(input1);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(input2);
      if (detaching)
        detach(t2);
      if (detaching)
        detach(input3);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(i);
      mounted = false;
      run_all(dispose);
    }
  };
}
__name(create_each_block$1, "create_each_block$1");
function create_fragment$5(ctx) {
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
  let t11;
  let span5;
  let t12;
  let mounted;
  let dispose;
  let each_value = (
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
      span1.textContent = "Name";
      t5 = space();
      span2 = element("span");
      span2.textContent = "Bonus";
      t7 = space();
      span3 = element("span");
      span3.textContent = "Subskill";
      t9 = space();
      span4 = element("span");
      span4.textContent = "Weapon Skill";
      t11 = space();
      span5 = element("span");
      t12 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(i0, "class", "fas fa-times clickable clickable-red svelte-1imd6gl");
      attr(span0, "class", "svelte-1imd6gl");
      attr(i1, "class", "fas fa-plus clickable clickable-green svelte-1imd6gl");
      attr(h3, "class", "svelte-1imd6gl");
      attr(span1, "class", "name svelte-1imd6gl");
      attr(span2, "class", "svelte-1imd6gl");
      attr(span3, "class", "svelte-1imd6gl");
      attr(span4, "class", "svelte-1imd6gl");
      attr(span5, "class", "svelte-1imd6gl");
      attr(div, "class", "tied-skills svelte-1imd6gl");
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
      append(div, t11);
      append(div, span5);
      append(div, t12);
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
        each_value = /*tiedSkills*/
        ctx2[0];
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
      if (detaching)
        detach(h3);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(div);
      destroy_each(each_blocks, detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
__name(create_fragment$5, "create_fragment$5");
function instance$5($$self, $$props, $$invalidate) {
  let $skill, $$unsubscribe_skill = noop, $$subscribe_skill = /* @__PURE__ */ __name(() => ($$unsubscribe_skill(), $$unsubscribe_skill = subscribe(skill, ($$value) => $$invalidate(2, $skill = $$value)), skill), "$$subscribe_skill");
  let $doc;
  $$self.$$.on_destroy.push(() => $$unsubscribe_skill());
  const doc = getContext("DocumentStore");
  component_subscribe($$self, doc, (value) => $$invalidate(13, $doc = value));
  let { skill } = $$props;
  $$subscribe_skill();
  let { tiedSkills } = $$props;
  function updateTiedSkills() {
    $doc.update({
      [`system.tiedSkills.${$skill.id}`]: tiedSkills
    });
  }
  __name(updateTiedSkills, "updateTiedSkills");
  function deleteTiedSkill() {
    $doc.update({
      [`system.tiedSkills.-=${$skill.id}`]: null
    });
  }
  __name(deleteTiedSkill, "deleteTiedSkill");
  function addTiedSkill() {
    tiedSkills.push({
      name: "New Skill",
      bonus: 0,
      isSubSkill: false,
      isWeaponSkill: false
    });
    updateTiedSkills();
  }
  __name(addTiedSkill, "addTiedSkill");
  function removeTiedSkill(index2) {
    tiedSkills.splice(index2, 1);
    updateTiedSkills();
  }
  __name(removeTiedSkill, "removeTiedSkill");
  function input0_input_handler(each_value, index2) {
    each_value[index2].name = this.value;
    $$invalidate(0, tiedSkills);
  }
  __name(input0_input_handler, "input0_input_handler");
  function input1_input_handler(each_value, index2) {
    each_value[index2].bonus = to_number(this.value);
    $$invalidate(0, tiedSkills);
  }
  __name(input1_input_handler, "input1_input_handler");
  function input2_change_handler(each_value, index2) {
    each_value[index2].isSubSkill = this.checked;
    $$invalidate(0, tiedSkills);
  }
  __name(input2_change_handler, "input2_change_handler");
  function input3_change_handler(each_value, index2) {
    each_value[index2].isWeaponSkill = this.checked;
    $$invalidate(0, tiedSkills);
  }
  __name(input3_change_handler, "input3_change_handler");
  const click_handler = /* @__PURE__ */ __name((index2) => {
    removeTiedSkill(index2);
  }, "click_handler");
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
    input0_input_handler,
    input1_input_handler,
    input2_change_handler,
    input3_change_handler,
    click_handler
  ];
}
__name(instance$5, "instance$5");
class SkillBonus extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$5, safe_not_equal, { skill: 1, tiedSkills: 0 });
  }
}
__name(SkillBonus, "SkillBonus");
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[7] = list[i][0];
  child_ctx[8] = list[i][1];
  return child_ctx;
}
__name(get_each_context, "get_each_context");
function create_each_block(ctx) {
  let skillbonus;
  let current;
  skillbonus = new SkillBonus({
    props: {
      skill: (
        /*skills*/
        ctx[1][
          /*skillId*/
          ctx[7]
        ]
      ),
      tiedSkills: (
        /*tiedSkills*/
        ctx[8]
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
          /*skillId*/
          ctx2[7]
        ];
      if (dirty & /*validTiedSkills*/
      1)
        skillbonus_changes.tiedSkills = /*tiedSkills*/
        ctx2[8];
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
__name(create_each_block, "create_each_block");
function create_if_block(ctx) {
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
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
__name(create_if_block, "create_if_block");
function create_fragment$4(ctx) {
  let t;
  let if_block_anchor;
  let current;
  let each_value = (
    /*validTiedSkills*/
    ctx[0]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  const out = /* @__PURE__ */ __name((i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  }), "out");
  let if_block = !/*validTiedSkills*/
  ctx[0].length && create_if_block();
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert(target, t, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (dirty & /*skills, validTiedSkills*/
      3) {
        each_value = /*validTiedSkills*/
        ctx2[0];
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
            each_blocks[i].m(t.parentNode, t);
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
        if (if_block)
          ;
        else {
          if_block = create_if_block();
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
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
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(t);
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
__name(create_fragment$4, "create_fragment$4");
function instance$4($$self, $$props, $$invalidate) {
  let actor;
  let validTiedSkills;
  let skills;
  let $actor, $$unsubscribe_actor = noop, $$subscribe_actor = /* @__PURE__ */ __name(() => ($$unsubscribe_actor(), $$unsubscribe_actor = subscribe(actor, ($$value) => $$invalidate(4, $actor = $$value)), actor), "$$subscribe_actor");
  let $doc;
  $$self.$$.on_destroy.push(() => $$unsubscribe_actor());
  getContext("ApplicationStateStore");
  const doc = getContext("DocumentStore");
  component_subscribe($$self, doc, (value) => $$invalidate(5, $doc = value));
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$doc*/
    32) {
      $$subscribe_actor($$invalidate(2, actor = new TJSDocument($doc.parent)));
    }
    if ($$self.$$.dirty & /*$doc, $actor*/
    48) {
      $$invalidate(0, validTiedSkills = Object.entries($doc.system.tiedSkills).filter(([skillId]) => $actor.items.get(skillId)));
    }
    if ($$self.$$.dirty & /*validTiedSkills, $actor*/
    17) {
      $$invalidate(1, skills = Object.fromEntries(validTiedSkills.map(([skillId]) => [skillId, new TJSDocument($actor.items.get(skillId))])));
    }
  };
  return [validTiedSkills, skills, actor, doc, $actor, $doc];
}
__name(instance$4, "instance$4");
class SkillBonuses extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, {});
  }
}
__name(SkillBonuses, "SkillBonuses");
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
  __name(tabs_1_activeTab_binding, "tabs_1_activeTab_binding");
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
  function switch_props(ctx2) {
    return {};
  }
  __name(switch_props, "switch_props");
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
      attr(div8, "class", "item-tab-container svelte-1fygq9m");
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
      if (detaching)
        detach(div9);
      destroy_component(tabs_1);
      if (switch_instance)
        destroy_component(switch_instance);
      mounted = false;
      run_all(dispose);
    }
  };
}
__name(create_fragment$3, "create_fragment$3");
function instance$3($$self, $$props, $$invalidate) {
  getContext("ApplicationStateStore");
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
  __name(tabs_1_activeTab_binding, "tabs_1_activeTab_binding");
  return [activeTab, doc, tabs, tabs_1_activeTab_binding];
}
__name(instance$3, "instance$3");
class Equipment_shell extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, {});
  }
}
__name(Equipment_shell, "Equipment_shell");
function create_fragment$2(ctx) {
  let div2;
  let div0;
  let label0;
  let t1;
  let input0;
  let t2;
  let div1;
  let label1;
  let t4;
  let input1;
  let mounted;
  let dispose;
  return {
    c() {
      div2 = element("div");
      div0 = element("div");
      label0 = element("label");
      label0.textContent = "Category";
      t1 = space();
      input0 = element("input");
      t2 = space();
      div1 = element("div");
      label1 = element("label");
      label1.textContent = "Magic Skill";
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
      append(div0, label0);
      append(div0, t1);
      append(div0, input0);
      append(div2, t2);
      append(div2, div1);
      append(div1, label1);
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
      if (detaching)
        detach(div2);
      mounted = false;
      run_all(dispose);
    }
  };
}
__name(create_fragment$2, "create_fragment$2");
function instance$2($$self) {
  getContext("ApplicationStateStore");
  const doc = getContext("DocumentStore");
  return [doc];
}
__name(instance$2, "instance$2");
class Skill_shell extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, {});
  }
}
__name(Skill_shell, "Skill_shell");
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
  __name(tjsprosemirror_content_binding, "tjsprosemirror_content_binding");
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
      attr(div0, "class", "description-container svelte-oa78o4");
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
      if (detaching)
        detach(div1);
      destroy_component(tjsprosemirror);
    }
  };
}
__name(create_fragment$1, "create_fragment$1");
function instance$1($$self, $$props, $$invalidate) {
  let $doc;
  getContext("ApplicationStateStore");
  const doc = getContext("DocumentStore");
  component_subscribe($$self, doc, (value) => $$invalidate(2, $doc = value));
  let content = $doc.system.description.value;
  function tjsprosemirror_content_binding(value) {
    content = value;
    $$invalidate(0, content);
  }
  __name(tjsprosemirror_content_binding, "tjsprosemirror_content_binding");
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
__name(instance$1, "instance$1");
class Trait_shell extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {});
  }
}
__name(Trait_shell, "Trait_shell");
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
  function switch_props(ctx2) {
    return {};
  }
  __name(switch_props, "switch_props");
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
      attr(div, "class", "item-sheet svelte-ewc64o");
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
      if (detaching)
        detach(div);
      destroy_component(itemheader);
      if (switch_instance)
        destroy_component(switch_instance);
    }
  };
}
__name(create_default_slot, "create_default_slot");
function create_fragment(ctx) {
  let applicationshell;
  let updating_elementRoot;
  let current;
  function applicationshell_elementRoot_binding(value) {
    ctx[5](value);
  }
  __name(applicationshell_elementRoot_binding, "applicationshell_elementRoot_binding");
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
  applicationshell = new ApplicationShell({ props: applicationshell_props });
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
      132) {
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
__name(create_fragment, "create_fragment");
function instance($$self, $$props, $$invalidate) {
  let $documentStore, $$unsubscribe_documentStore = noop, $$subscribe_documentStore = /* @__PURE__ */ __name(() => ($$unsubscribe_documentStore(), $$unsubscribe_documentStore = subscribe(documentStore, ($$value) => $$invalidate(4, $documentStore = $$value)), documentStore), "$$subscribe_documentStore");
  $$self.$$.on_destroy.push(() => $$unsubscribe_documentStore());
  let { elementRoot } = $$props;
  let { documentStore } = $$props;
  $$subscribe_documentStore();
  let { applicationStateStore } = $$props;
  setContext("DocumentStore", documentStore);
  setContext("ApplicationStateStore", applicationStateStore);
  getContext("ApplicationStateStore");
  let component;
  function applicationshell_elementRoot_binding(value) {
    elementRoot = value;
    $$invalidate(0, elementRoot);
  }
  __name(applicationshell_elementRoot_binding, "applicationshell_elementRoot_binding");
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
__name(instance, "instance");
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
__name(Item_shell, "Item_shell");
function createItemSheetState(item) {
  const { set, update: update2, subscribe: subscribe2 } = writable$1({
    item
  });
  const addSkill = /* @__PURE__ */ __name(async (skill) => {
    update2((val) => {
      val.activeTab = val.tabs[2];
      return val;
    });
  }, "addSkill");
  return {
    set,
    update: update2,
    subscribe: subscribe2,
    addSkill
  };
}
__name(createItemSheetState, "createItemSheetState");
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
__name(LeobrewItemSheet, "LeobrewItemSheet");
function setupSystem() {
  registerConstants();
  registerSheets();
  registerSettings();
}
__name(setupSystem, "setupSystem");
function registerConstants() {
  CONFIG.Combat.initiative = {
    formula: "1d10",
    decimals: 2
  };
  CONFIG.LEOBREW = LEOBREW;
}
__name(registerConstants, "registerConstants");
function registerSheets() {
  game.leobrew = {
    LeobrewActor,
    LeobrewItem
  };
  CONFIG.Actor.documentClass = LeobrewActor;
  CONFIG.Item.documentClass = LeobrewItem;
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("leobrew", LeobrewActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("leobrew", LeobrewItemSheet, { makeDefault: true });
}
__name(registerSheets, "registerSheets");
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
__name(setupLocalization, "setupLocalization");
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
__name(registerSettings, "registerSettings");
async function runMigrations() {
  let migrationRan = false;
  if (isNewerVersion("0.6.0", game.settings.get("leobrew", "migration-version"))) {
    for (const actor of Array.from(game.actors)) {
      await actor.update({
        "data.currency.-=pp": null
      });
    }
    await game.settings.set("leobrew", "migration-version", "0.6.0");
    migrationRan = true;
  }
  if (migrationRan)
    ui.notifications.info("Leobrew migrated to latest version!");
}
__name(runMigrations, "runMigrations");
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
__name(highlightCriticalSuccessFailure, "highlightCriticalSuccessFailure");
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
__name(_getDiceData, "_getDiceData");
const automateCriticalSuccessFailure = /* @__PURE__ */ __name(async function(message) {
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
}, "automateCriticalSuccessFailure");
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
__name(displayChatActionButtons, "displayChatActionButtons");
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
__name(registerChatListeners, "registerChatListeners");
Hooks.once("init", () => {
  setupSystem();
});
Hooks.once("setup", () => {
  setupLocalization();
});
Hooks.once("ready", () => {
  registerChatListeners();
  if (!game.user.isGM)
    return;
  runMigrations();
  setTimeout(() => {
    game.actors.getName("Test").sheet.render(true);
  }, 250);
});
Hooks.on("preCreateActor", (doc) => {
  doc.updateSource({
    "system.experience.value": Math.abs(Number(game.settings.get("leobrew", "startingSkillPoints"))) || 40
  });
});
Hooks.on("createActor", (doc) => {
  doc.createEmbeddedDocuments("Item", [{
    name: "Native Language",
    type: "skill",
    "system.category": "Language",
    "system.level": 5
  }]);
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
