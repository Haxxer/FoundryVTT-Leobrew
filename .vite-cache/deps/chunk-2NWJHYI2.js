import {
  localize
} from "./chunk-O4YYAJH7.js";
import {
  isUpdatableStore,
  isWritableStore
} from "./chunk-DTH3B6LV.js";
import {
  A11yHelper,
  StyleManager,
  debounce,
  hasSetter,
  isIterable,
  isObject,
  isSvelteComponent,
  parseSvelteConfig,
  styleParsePixels
} from "./chunk-IDJAAY4H.js";
import {
  writable
} from "./chunk-4JE7W25I.js";
import {
  fade,
  slide
} from "./chunk-PP4QODU7.js";
import {
  cubicOut
} from "./chunk-AFTQYMJX.js";
import {
  HtmlTag,
  SvelteComponentDev,
  action_destroyer,
  add_flush_callback,
  add_location,
  add_render_callback,
  append_dev,
  append_styles,
  assign,
  attr_dev,
  bind,
  binding_callbacks,
  check_outros,
  component_subscribe,
  construct_svelte_component_dev,
  create_component,
  create_in_transition,
  create_out_transition,
  create_slot,
  destroy_block,
  destroy_component,
  destroy_each,
  detach_dev,
  dispatch_dev,
  element,
  empty,
  flush,
  getContext,
  get_all_dirty_from_scope,
  get_slot_changes,
  get_spread_object,
  get_spread_update,
  globals,
  group_outros,
  identity,
  init,
  insert_dev,
  is_function,
  listen_dev,
  mount_component,
  noop,
  null_to_empty,
  onDestroy,
  onMount,
  prevent_default,
  prop_dev,
  run_all,
  safe_not_equal,
  setContext,
  set_data_dev,
  set_style,
  space,
  src_url_equal,
  stop_propagation,
  text,
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
  __privateSet
} from "./chunk-7HFSXBDU.js";

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/component/core/cssVariables.js
var s_STYLE_KEY = "#__trl-root-styles";
var cssVariables = new StyleManager({ docKey: s_STYLE_KEY, version: 1 });

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/component/core/TJSContainer.svelte
var file = "node_modules\\@typhonjs-fvtt\\runtime\\_dist\\svelte\\component\\core\\TJSContainer.svelte";
function add_css(target) {
  append_styles(target, "svelte-zfrbe3", "p.svelte-zfrbe3{color:red;font-size:18px}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVEpTQ29udGFpbmVyLnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUE0QkksZUFBQSxDQUNJLEtBQUEsQ0FBQSxHQUFVLENBQ1YsU0FBQSxDQUFBLElBQ0oiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiVEpTQ29udGFpbmVyLnN2ZWx0ZSJdfQ== */");
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[4] = list[i];
  return child_ctx;
}
function create_if_block_1(ctx) {
  let p;
  const block = {
    c: function create2() {
      p = element("p");
      p.textContent = "Container warning: No children.";
      attr_dev(p, "class", "svelte-zfrbe3");
      add_location(p, file, 24, 4, 783);
    },
    m: function mount(target, anchor) {
      insert_dev(target, p, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(p);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_1.name,
    type: "if",
    source: "(24:15) ",
    ctx
  });
  return block;
}
function create_if_block(ctx) {
  let each_1_anchor;
  let current;
  let each_value = (
    /*allChildren*/
    ctx[1]
  );
  validate_each_argument(each_value);
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  const block = {
    c: function create2() {
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
      if (dirty & /*allChildren*/
      2) {
        each_value = /*allChildren*/
        ctx2[1];
        validate_each_argument(each_value);
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
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
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
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d: function destroy(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach_dev(each_1_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block.name,
    type: "if",
    source: "(20:0) {#if Array.isArray(allChildren)}",
    ctx
  });
  return block;
}
function create_each_block(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    /*child*/
    ctx[4].props
  ];
  var switch_value = (
    /*child*/
    ctx[4].class
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
    c: function create2() {
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
      const switch_instance_changes = dirty & /*allChildren*/
      2 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(
        /*child*/
        ctx2[4].props
      )]) : {};
      if (dirty & /*allChildren*/
      2 && switch_value !== (switch_value = /*child*/
      ctx2[4].class)) {
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
    id: create_each_block.name,
    type: "each",
    source: "(21:4) {#each allChildren as child}",
    ctx
  });
  return block;
}
function create_fragment(ctx) {
  let show_if;
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block, create_if_block_1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (dirty & /*allChildren*/
    2)
      show_if = null;
    if (show_if == null)
      show_if = !!Array.isArray(
        /*allChildren*/
        ctx2[1]
      );
    if (show_if)
      return 0;
    if (
      /*warn*/
      ctx2[0]
    )
      return 1;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx, -1))) {
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  const block = {
    c: function create2() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(target, anchor);
      }
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, [dirty]) {
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
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TJSContainer", slots, []);
  let { warn = false } = $$props;
  let { children = void 0 } = $$props;
  const context = getContext("#external");
  let allChildren;
  const writable_props = ["warn", "children"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<TJSContainer> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("warn" in $$props2)
      $$invalidate(0, warn = $$props2.warn);
    if ("children" in $$props2)
      $$invalidate(2, children = $$props2.children);
  };
  $$self.$capture_state = () => ({
    getContext,
    isObject,
    warn,
    children,
    context,
    allChildren
  });
  $$self.$inject_state = ($$props2) => {
    if ("warn" in $$props2)
      $$invalidate(0, warn = $$props2.warn);
    if ("children" in $$props2)
      $$invalidate(2, children = $$props2.children);
    if ("allChildren" in $$props2)
      $$invalidate(1, allChildren = $$props2.allChildren);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*children*/
    4) {
      $:
        $$invalidate(1, allChildren = Array.isArray(children) ? children : isObject(context) ? context.children : void 0);
    }
  };
  return [warn, allChildren, children];
}
var TJSContainer = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance, create_fragment, safe_not_equal, { warn: 0, children: 2 }, add_css);
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TJSContainer",
      options,
      id: create_fragment.name
    });
  }
  get warn() {
    throw new Error("<TJSContainer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set warn(value) {
    throw new Error("<TJSContainer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get children() {
    throw new Error("<TJSContainer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set children(value) {
    throw new Error("<TJSContainer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var TJSContainer_default = TJSContainer;

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/component/core/TJSComponentShell.svelte
function create_fragment2(ctx) {
  let tjscontainer;
  let current;
  tjscontainer = new TJSContainer_default({
    props: {
      children: (
        /*allChildren*/
        ctx[0]
      ),
      warn: true
    },
    $$inline: true
  });
  const block = {
    c: function create2() {
      create_component(tjscontainer.$$.fragment);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      mount_component(tjscontainer, target, anchor);
      current = true;
    },
    p: noop,
    i: function intro(local) {
      if (current)
        return;
      transition_in(tjscontainer.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tjscontainer.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(tjscontainer, detaching);
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
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TJSComponentShell", slots, []);
  let { children = void 0 } = $$props;
  const context = getContext("#external");
  const allChildren = Array.isArray(children) ? children : isObject(context) ? context.children : void 0;
  const writable_props = ["children"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<TJSComponentShell> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("children" in $$props2)
      $$invalidate(1, children = $$props2.children);
  };
  $$self.$capture_state = () => ({
    getContext,
    isObject,
    TJSContainer: TJSContainer_default,
    children,
    context,
    allChildren
  });
  $$self.$inject_state = ($$props2) => {
    if ("children" in $$props2)
      $$invalidate(1, children = $$props2.children);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [allChildren, children];
}
var TJSComponentShell = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance2, create_fragment2, safe_not_equal, { children: 1 });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TJSComponentShell",
      options,
      id: create_fragment2.name
    });
  }
  get children() {
    return this.$$.ctx[1];
  }
  set children(children) {
    this.$$set({ children });
    flush();
  }
};
var TJSComponentShell_default = TJSComponentShell;

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/action/index.js
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
var s_MAP = /* @__PURE__ */ new Map();
var ResizeObserverManager = class {
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
};
var s_UPDATE_TYPES = {
  none: 0,
  attribute: 1,
  function: 2,
  resizeObserved: 3,
  setContentBounds: 4,
  setDimension: 5,
  storeObject: 6,
  storesObject: 7
};
var s_RESIZE_OBSERVER = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const subscribers = s_MAP.get(entry == null ? void 0 : entry.target);
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
  if ((target == null ? void 0 : target.resizeObserved) instanceof Function) {
    return s_UPDATE_TYPES.resizeObserved;
  }
  if ((target == null ? void 0 : target.setDimension) instanceof Function) {
    return s_UPDATE_TYPES.setDimension;
  }
  if ((target == null ? void 0 : target.setContentBounds) instanceof Function) {
    return s_UPDATE_TYPES.setContentBounds;
  }
  const targetType = typeof target;
  if (targetType !== null && (targetType === "object" || targetType === "function")) {
    if (isUpdatableStore(target.resizeObserved)) {
      return s_UPDATE_TYPES.storeObject;
    }
    const stores = target == null ? void 0 : target.stores;
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
  var _a, _b, _c;
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
      target == null ? void 0 : target(offsetWidth, offsetHeight, contentWidth, contentHeight);
      break;
    case s_UPDATE_TYPES.resizeObserved:
      (_a = target.resizeObserved) == null ? void 0 : _a.call(target, offsetWidth, offsetHeight, contentWidth, contentHeight);
      break;
    case s_UPDATE_TYPES.setContentBounds:
      (_b = target.setContentBounds) == null ? void 0 : _b.call(target, contentWidth, contentHeight);
      break;
    case s_UPDATE_TYPES.setDimension:
      (_c = target.setDimension) == null ? void 0 : _c.call(target, offsetWidth, offsetHeight);
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
function applyScrolltop(element2, store) {
  if (!isWritableStore(store)) {
    throw new TypeError(`applyScrolltop error: 'store' must be a writable Svelte store.`);
  }
  function storeUpdate(value) {
    if (!Number.isFinite(value)) {
      return;
    }
    setTimeout(() => element2.scrollTop = value, 0);
  }
  let unsubscribe = store.subscribe(storeUpdate);
  const resizeControl = resizeObserver(element2, debounce(() => {
    if (element2.isConnected) {
      store.set(element2.scrollTop);
    }
  }, 500));
  function onScroll(event) {
    store.set(event.target.scrollTop);
  }
  const debounceFn = debounce((e) => onScroll(e), 500);
  element2.addEventListener("scroll", debounceFn);
  return {
    update: (newStore) => {
      unsubscribe();
      store = newStore;
      if (!isWritableStore(store)) {
        throw new TypeError(`applyScrolltop.update error: 'store' must be a writable Svelte store.`);
      }
      unsubscribe = store.subscribe(storeUpdate);
    },
    destroy: () => {
      element2.removeEventListener("scroll", debounceFn);
      unsubscribe();
      resizeControl.destroy();
    }
  };
}
function applyStyles(node, properties) {
  function setProperties() {
    if (typeof properties !== "object") {
      return;
    }
    for (const prop of Object.keys(properties)) {
      node.style.setProperty(`${prop}`, properties[prop]);
    }
  }
  setProperties();
  return {
    update(newProperties) {
      properties = newProperties;
      setProperties();
    }
  };
}
function applyPosition(node, position) {
  if (hasSetter(position, "parent")) {
    position.parent = node;
  }
  return {
    update: (newPosition) => {
      if (newPosition === position && newPosition.parent === position.parent) {
        return;
      }
      if (hasSetter(position)) {
        position.parent = void 0;
      }
      position = newPosition;
      if (hasSetter(position, "parent")) {
        position.parent = node;
      }
    },
    destroy: () => {
      if (hasSetter(position, "parent")) {
        position.parent = void 0;
      }
    }
  };
}
function draggable(node, {
  position,
  active = true,
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
  function removeListeners() {
    if (typeof (storeDragging == null ? void 0 : storeDragging.set) === "function") {
      storeDragging.set(false);
    }
    node.removeEventListener(...handlers.dragDown);
    node.removeEventListener(...handlers.dragMove);
    node.removeEventListener(...handlers.dragUp);
    node.classList.remove("draggable");
  }
  if (active) {
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
    if (!dragging && typeof (storeDragging == null ? void 0 : storeDragging.set) === "function") {
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
  function onDragPointerUp(event) {
    event.preventDefault();
    dragging = false;
    if (typeof (storeDragging == null ? void 0 : storeDragging.set) === "function") {
      storeDragging.set(false);
    }
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
var _ease, _easeOptions, _subscriptions, _updateSubscribers, updateSubscribers_fn;
var DraggableOptions = class {
  constructor({ ease, easeOptions } = {}) {
    __privateAdd(this, _updateSubscribers);
    __privateAdd(this, _ease, false);
    __privateAdd(this, _easeOptions, { duration: 0.1, ease: cubicOut });
    /**
     * Stores the subscribers.
     *
     * @type {(function(DraggableOptions): void)[]}
     */
    __privateAdd(this, _subscriptions, []);
    Object.defineProperty(this, "ease", {
      get: () => {
        return __privateGet(this, _ease);
      },
      set: (newEase) => {
        if (typeof newEase !== "boolean") {
          throw new TypeError(`'ease' is not a boolean.`);
        }
        __privateSet(this, _ease, newEase);
        __privateMethod(this, _updateSubscribers, updateSubscribers_fn).call(this);
      },
      enumerable: true
    });
    Object.defineProperty(this, "easeOptions", {
      get: () => {
        return __privateGet(this, _easeOptions);
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
          __privateGet(this, _easeOptions).duration = newEaseOptions.duration;
        }
        if (newEaseOptions.ease !== void 0) {
          if (typeof newEaseOptions.ease !== "function" && typeof newEaseOptions.ease !== "string") {
            throw new TypeError(`'easeOptions.ease' is not a function or string.`);
          }
          __privateGet(this, _easeOptions).ease = newEaseOptions.ease;
        }
        __privateMethod(this, _updateSubscribers, updateSubscribers_fn).call(this);
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
    return __privateGet(this, _easeOptions).duration;
  }
  /**
   * @returns {string|Function} Get easing function value.
   */
  get easeValue() {
    return __privateGet(this, _easeOptions).ease;
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
    __privateGet(this, _easeOptions).duration = duration;
    __privateMethod(this, _updateSubscribers, updateSubscribers_fn).call(this);
  }
  /**
   * @param {string|Function} value - Get easing function value.
   */
  set easeValue(value) {
    if (typeof value !== "function" && typeof value !== "string") {
      throw new TypeError(`'value' is not a function or string.`);
    }
    __privateGet(this, _easeOptions).ease = value;
    __privateMethod(this, _updateSubscribers, updateSubscribers_fn).call(this);
  }
  /**
   * Resets all options data to default values.
   */
  reset() {
    __privateSet(this, _ease, false);
    __privateSet(this, _easeOptions, { duration: 0.1, ease: cubicOut });
    __privateMethod(this, _updateSubscribers, updateSubscribers_fn).call(this);
  }
  /**
   * Resets easing options to default values.
   */
  resetEase() {
    __privateSet(this, _easeOptions, { duration: 0.1, ease: cubicOut });
    __privateMethod(this, _updateSubscribers, updateSubscribers_fn).call(this);
  }
  /**
   *
   * @param {function(DraggableOptions): void} handler - Callback function that is invoked on update / changes.
   *                                                 Receives the DraggableOptions object / instance.
   *
   * @returns {(function(): void)} Unsubscribe function.
   */
  subscribe(handler) {
    __privateGet(this, _subscriptions).push(handler);
    handler(this);
    return () => {
      const index = __privateGet(this, _subscriptions).findIndex((sub2) => sub2 === handler);
      if (index >= 0) {
        __privateGet(this, _subscriptions).splice(index, 1);
      }
    };
  }
};
_ease = new WeakMap();
_easeOptions = new WeakMap();
_subscriptions = new WeakMap();
_updateSubscribers = new WeakSet();
updateSubscribers_fn = function() {
  const subscriptions = __privateGet(this, _subscriptions);
  if (subscriptions.length > 0) {
    for (let cntr = 0; cntr < subscriptions.length; cntr++) {
      subscriptions[cntr](this);
    }
  }
};
draggable.options = (options) => new DraggableOptions(options);
var s_POSITION_DATA = { left: 0, top: 0 };

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/math/index.js
function lerp$5(start, end, amount) {
  return (1 - amount) * start + amount * end;
}
function degToRad(deg) {
  return deg * (Math.PI / 180);
}
var EPSILON = 1e-6;
var ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
var RANDOM = Math.random;
function setMatrixArrayType(type) {
  ARRAY_TYPE = type;
}
var degree = Math.PI / 180;
function toRadian(a) {
  return a * degree;
}
function equals$9(a, b) {
  return Math.abs(a - b) <= EPSILON * Math.max(1, Math.abs(a), Math.abs(b));
}
if (!Math.hypot)
  Math.hypot = function() {
    var y = 0, i = arguments.length;
    while (i--) {
      y += arguments[i] * arguments[i];
    }
    return Math.sqrt(y);
  };
var common = Object.freeze({
  __proto__: null,
  get ARRAY_TYPE() {
    return ARRAY_TYPE;
  },
  EPSILON,
  RANDOM,
  equals: equals$9,
  setMatrixArrayType,
  toRadian
});
function create$8() {
  var out = new ARRAY_TYPE(4);
  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
  }
  out[0] = 1;
  out[3] = 1;
  return out;
}
function clone$8(a) {
  var out = new ARRAY_TYPE(4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
function copy$8(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
function identity$5(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}
function fromValues$8(m00, m01, m10, m11) {
  var out = new ARRAY_TYPE(4);
  out[0] = m00;
  out[1] = m01;
  out[2] = m10;
  out[3] = m11;
  return out;
}
function set$8(out, m00, m01, m10, m11) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m10;
  out[3] = m11;
  return out;
}
function transpose$2(out, a) {
  if (out === a) {
    var a1 = a[1];
    out[1] = a[2];
    out[2] = a1;
  } else {
    out[0] = a[0];
    out[1] = a[2];
    out[2] = a[1];
    out[3] = a[3];
  }
  return out;
}
function invert$5(out, a) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var det = a0 * a3 - a2 * a1;
  if (!det) {
    return null;
  }
  det = 1 / det;
  out[0] = a3 * det;
  out[1] = -a1 * det;
  out[2] = -a2 * det;
  out[3] = a0 * det;
  return out;
}
function adjoint$2(out, a) {
  var a0 = a[0];
  out[0] = a[3];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a0;
  return out;
}
function determinant$3(a) {
  return a[0] * a[3] - a[2] * a[1];
}
function multiply$8(out, a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  out[0] = a0 * b0 + a2 * b1;
  out[1] = a1 * b0 + a3 * b1;
  out[2] = a0 * b2 + a2 * b3;
  out[3] = a1 * b2 + a3 * b3;
  return out;
}
function rotate$4(out, a, rad) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = a0 * c + a2 * s;
  out[1] = a1 * c + a3 * s;
  out[2] = a0 * -s + a2 * c;
  out[3] = a1 * -s + a3 * c;
  return out;
}
function scale$8(out, a, v) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var v0 = v[0], v1 = v[1];
  out[0] = a0 * v0;
  out[1] = a1 * v0;
  out[2] = a2 * v1;
  out[3] = a3 * v1;
  return out;
}
function fromRotation$4(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = -s;
  out[3] = c;
  return out;
}
function fromScaling$3(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = v[1];
  return out;
}
function str$8(a) {
  return "mat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
function frob$3(a) {
  return Math.hypot(a[0], a[1], a[2], a[3]);
}
function LDU(L, D, U, a) {
  L[2] = a[2] / a[0];
  U[0] = a[0];
  U[1] = a[1];
  U[3] = a[3] - L[2] * U[1];
  return [L, D, U];
}
function add$8(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
function subtract$6(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}
function exactEquals$8(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
function equals$8(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3));
}
function multiplyScalar$3(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
function multiplyScalarAndAdd$3(out, a, b, scale2) {
  out[0] = a[0] + b[0] * scale2;
  out[1] = a[1] + b[1] * scale2;
  out[2] = a[2] + b[2] * scale2;
  out[3] = a[3] + b[3] * scale2;
  return out;
}
var mul$8 = multiply$8;
var sub$6 = subtract$6;
var mat2 = Object.freeze({
  __proto__: null,
  LDU,
  add: add$8,
  adjoint: adjoint$2,
  clone: clone$8,
  copy: copy$8,
  create: create$8,
  determinant: determinant$3,
  equals: equals$8,
  exactEquals: exactEquals$8,
  frob: frob$3,
  fromRotation: fromRotation$4,
  fromScaling: fromScaling$3,
  fromValues: fromValues$8,
  identity: identity$5,
  invert: invert$5,
  mul: mul$8,
  multiply: multiply$8,
  multiplyScalar: multiplyScalar$3,
  multiplyScalarAndAdd: multiplyScalarAndAdd$3,
  rotate: rotate$4,
  scale: scale$8,
  set: set$8,
  str: str$8,
  sub: sub$6,
  subtract: subtract$6,
  transpose: transpose$2
});
function create$7() {
  var out = new ARRAY_TYPE(6);
  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[4] = 0;
    out[5] = 0;
  }
  out[0] = 1;
  out[3] = 1;
  return out;
}
function clone$7(a) {
  var out = new ARRAY_TYPE(6);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  return out;
}
function copy$7(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  return out;
}
function identity$4(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  return out;
}
function fromValues$7(a, b, c, d, tx, ty) {
  var out = new ARRAY_TYPE(6);
  out[0] = a;
  out[1] = b;
  out[2] = c;
  out[3] = d;
  out[4] = tx;
  out[5] = ty;
  return out;
}
function set$7(out, a, b, c, d, tx, ty) {
  out[0] = a;
  out[1] = b;
  out[2] = c;
  out[3] = d;
  out[4] = tx;
  out[5] = ty;
  return out;
}
function invert$4(out, a) {
  var aa = a[0], ab = a[1], ac = a[2], ad = a[3];
  var atx = a[4], aty = a[5];
  var det = aa * ad - ab * ac;
  if (!det) {
    return null;
  }
  det = 1 / det;
  out[0] = ad * det;
  out[1] = -ab * det;
  out[2] = -ac * det;
  out[3] = aa * det;
  out[4] = (ac * aty - ad * atx) * det;
  out[5] = (ab * atx - aa * aty) * det;
  return out;
}
function determinant$2(a) {
  return a[0] * a[3] - a[1] * a[2];
}
function multiply$7(out, a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
  out[0] = a0 * b0 + a2 * b1;
  out[1] = a1 * b0 + a3 * b1;
  out[2] = a0 * b2 + a2 * b3;
  out[3] = a1 * b2 + a3 * b3;
  out[4] = a0 * b4 + a2 * b5 + a4;
  out[5] = a1 * b4 + a3 * b5 + a5;
  return out;
}
function rotate$3(out, a, rad) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = a0 * c + a2 * s;
  out[1] = a1 * c + a3 * s;
  out[2] = a0 * -s + a2 * c;
  out[3] = a1 * -s + a3 * c;
  out[4] = a4;
  out[5] = a5;
  return out;
}
function scale$7(out, a, v) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
  var v0 = v[0], v1 = v[1];
  out[0] = a0 * v0;
  out[1] = a1 * v0;
  out[2] = a2 * v1;
  out[3] = a3 * v1;
  out[4] = a4;
  out[5] = a5;
  return out;
}
function translate$3(out, a, v) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
  var v0 = v[0], v1 = v[1];
  out[0] = a0;
  out[1] = a1;
  out[2] = a2;
  out[3] = a3;
  out[4] = a0 * v0 + a2 * v1 + a4;
  out[5] = a1 * v0 + a3 * v1 + a5;
  return out;
}
function fromRotation$3(out, rad) {
  var s = Math.sin(rad), c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = -s;
  out[3] = c;
  out[4] = 0;
  out[5] = 0;
  return out;
}
function fromScaling$2(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = v[1];
  out[4] = 0;
  out[5] = 0;
  return out;
}
function fromTranslation$3(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = v[0];
  out[5] = v[1];
  return out;
}
function str$7(a) {
  return "mat2d(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ")";
}
function frob$2(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], 1);
}
function add$7(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  return out;
}
function subtract$5(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  return out;
}
function multiplyScalar$2(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  return out;
}
function multiplyScalarAndAdd$2(out, a, b, scale2) {
  out[0] = a[0] + b[0] * scale2;
  out[1] = a[1] + b[1] * scale2;
  out[2] = a[2] + b[2] * scale2;
  out[3] = a[3] + b[3] * scale2;
  out[4] = a[4] + b[4] * scale2;
  out[5] = a[5] + b[5] * scale2;
  return out;
}
function exactEquals$7(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
}
function equals$7(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5));
}
var mul$7 = multiply$7;
var sub$5 = subtract$5;
var mat2d = Object.freeze({
  __proto__: null,
  add: add$7,
  clone: clone$7,
  copy: copy$7,
  create: create$7,
  determinant: determinant$2,
  equals: equals$7,
  exactEquals: exactEquals$7,
  frob: frob$2,
  fromRotation: fromRotation$3,
  fromScaling: fromScaling$2,
  fromTranslation: fromTranslation$3,
  fromValues: fromValues$7,
  identity: identity$4,
  invert: invert$4,
  mul: mul$7,
  multiply: multiply$7,
  multiplyScalar: multiplyScalar$2,
  multiplyScalarAndAdd: multiplyScalarAndAdd$2,
  rotate: rotate$3,
  scale: scale$7,
  set: set$7,
  str: str$7,
  sub: sub$5,
  subtract: subtract$5,
  translate: translate$3
});
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
function fromMat4$1(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[4];
  out[4] = a[5];
  out[5] = a[6];
  out[6] = a[8];
  out[7] = a[9];
  out[8] = a[10];
  return out;
}
function clone$6(a) {
  var out = new ARRAY_TYPE(9);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
function copy$6(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
function fromValues$6(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  var out = new ARRAY_TYPE(9);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
function set$6(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
function identity$3(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
function transpose$1(out, a) {
  if (out === a) {
    var a01 = a[1], a02 = a[2], a12 = a[5];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a01;
    out[5] = a[7];
    out[6] = a02;
    out[7] = a12;
  } else {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
  }
  return out;
}
function invert$3(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2];
  var a10 = a[3], a11 = a[4], a12 = a[5];
  var a20 = a[6], a21 = a[7], a22 = a[8];
  var b01 = a22 * a11 - a12 * a21;
  var b11 = -a22 * a10 + a12 * a20;
  var b21 = a21 * a10 - a11 * a20;
  var det = a00 * b01 + a01 * b11 + a02 * b21;
  if (!det) {
    return null;
  }
  det = 1 / det;
  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}
function adjoint$1(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2];
  var a10 = a[3], a11 = a[4], a12 = a[5];
  var a20 = a[6], a21 = a[7], a22 = a[8];
  out[0] = a11 * a22 - a12 * a21;
  out[1] = a02 * a21 - a01 * a22;
  out[2] = a01 * a12 - a02 * a11;
  out[3] = a12 * a20 - a10 * a22;
  out[4] = a00 * a22 - a02 * a20;
  out[5] = a02 * a10 - a00 * a12;
  out[6] = a10 * a21 - a11 * a20;
  out[7] = a01 * a20 - a00 * a21;
  out[8] = a00 * a11 - a01 * a10;
  return out;
}
function determinant$1(a) {
  var a00 = a[0], a01 = a[1], a02 = a[2];
  var a10 = a[3], a11 = a[4], a12 = a[5];
  var a20 = a[6], a21 = a[7], a22 = a[8];
  return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}
function multiply$6(out, a, b) {
  var a00 = a[0], a01 = a[1], a02 = a[2];
  var a10 = a[3], a11 = a[4], a12 = a[5];
  var a20 = a[6], a21 = a[7], a22 = a[8];
  var b00 = b[0], b01 = b[1], b02 = b[2];
  var b10 = b[3], b11 = b[4], b12 = b[5];
  var b20 = b[6], b21 = b[7], b22 = b[8];
  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;
  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;
  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}
function translate$2(out, a, v) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], x = v[0], y = v[1];
  out[0] = a00;
  out[1] = a01;
  out[2] = a02;
  out[3] = a10;
  out[4] = a11;
  out[5] = a12;
  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return out;
}
function rotate$2(out, a, rad) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], s = Math.sin(rad), c = Math.cos(rad);
  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;
  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;
  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return out;
}
function scale$6(out, a, v) {
  var x = v[0], y = v[1];
  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];
  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
function fromTranslation$2(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = v[0];
  out[7] = v[1];
  out[8] = 1;
  return out;
}
function fromRotation$2(out, rad) {
  var s = Math.sin(rad), c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = -s;
  out[4] = c;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
function fromScaling$1(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = v[1];
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
function fromMat2d(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = 0;
  out[3] = a[2];
  out[4] = a[3];
  out[5] = 0;
  out[6] = a[4];
  out[7] = a[5];
  out[8] = 1;
  return out;
}
function fromQuat$1(out, q) {
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
  out[3] = yx - wz;
  out[6] = zx + wy;
  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;
  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;
  return out;
}
function normalFromMat4(out, a) {
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
  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  return out;
}
function projection(out, width, height) {
  out[0] = 2 / width;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = -2 / height;
  out[5] = 0;
  out[6] = -1;
  out[7] = 1;
  out[8] = 1;
  return out;
}
function str$6(a) {
  return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")";
}
function frob$1(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
}
function add$6(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  return out;
}
function subtract$4(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  return out;
}
function multiplyScalar$1(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  return out;
}
function multiplyScalarAndAdd$1(out, a, b, scale2) {
  out[0] = a[0] + b[0] * scale2;
  out[1] = a[1] + b[1] * scale2;
  out[2] = a[2] + b[2] * scale2;
  out[3] = a[3] + b[3] * scale2;
  out[4] = a[4] + b[4] * scale2;
  out[5] = a[5] + b[5] * scale2;
  out[6] = a[6] + b[6] * scale2;
  out[7] = a[7] + b[7] * scale2;
  out[8] = a[8] + b[8] * scale2;
  return out;
}
function exactEquals$6(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
}
function equals$6(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8));
}
var mul$6 = multiply$6;
var sub$4 = subtract$4;
var mat3 = Object.freeze({
  __proto__: null,
  add: add$6,
  adjoint: adjoint$1,
  clone: clone$6,
  copy: copy$6,
  create: create$6,
  determinant: determinant$1,
  equals: equals$6,
  exactEquals: exactEquals$6,
  frob: frob$1,
  fromMat2d,
  fromMat4: fromMat4$1,
  fromQuat: fromQuat$1,
  fromRotation: fromRotation$2,
  fromScaling: fromScaling$1,
  fromTranslation: fromTranslation$2,
  fromValues: fromValues$6,
  identity: identity$3,
  invert: invert$3,
  mul: mul$6,
  multiply: multiply$6,
  multiplyScalar: multiplyScalar$1,
  multiplyScalarAndAdd: multiplyScalarAndAdd$1,
  normalFromMat4,
  projection,
  rotate: rotate$2,
  scale: scale$6,
  set: set$6,
  str: str$6,
  sub: sub$4,
  subtract: subtract$4,
  translate: translate$2,
  transpose: transpose$1
});
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
function rotate$1(out, a, rad, axis) {
  var x = axis[0], y = axis[1], z = axis[2];
  var len2 = Math.hypot(x, y, z);
  var s, c, t;
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  var b00, b01, b02;
  var b10, b11, b12;
  var b20, b21, b22;
  if (len2 < EPSILON) {
    return null;
  }
  len2 = 1 / len2;
  x *= len2;
  y *= len2;
  z *= len2;
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
function fromRotation$1(out, rad, axis) {
  var x = axis[0], y = axis[1], z = axis[2];
  var len2 = Math.hypot(x, y, z);
  var s, c, t;
  if (len2 < EPSILON) {
    return null;
  }
  len2 = 1 / len2;
  x *= len2;
  y *= len2;
  z *= len2;
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
function getTranslation$1(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
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
function lookAt(out, eye, center, up) {
  var x0, x1, x2, y0, y1, y2, z0, z1, z2, len2;
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
  len2 = 1 / Math.hypot(z0, z1, z2);
  z0 *= len2;
  z1 *= len2;
  z2 *= len2;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len2 = Math.hypot(x0, x1, x2);
  if (!len2) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len2 = 1 / len2;
    x0 *= len2;
    x1 *= len2;
    x2 *= len2;
  }
  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len2 = Math.hypot(y0, y1, y2);
  if (!len2) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len2 = 1 / len2;
    y0 *= len2;
    y1 *= len2;
    y2 *= len2;
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
function targetTo(out, eye, target, up) {
  var eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2];
  var z0 = eyex - target[0], z1 = eyey - target[1], z2 = eyez - target[2];
  var len2 = z0 * z0 + z1 * z1 + z2 * z2;
  if (len2 > 0) {
    len2 = 1 / Math.sqrt(len2);
    z0 *= len2;
    z1 *= len2;
    z2 *= len2;
  }
  var x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
  len2 = x0 * x0 + x1 * x1 + x2 * x2;
  if (len2 > 0) {
    len2 = 1 / Math.sqrt(len2);
    x0 *= len2;
    x1 *= len2;
    x2 *= len2;
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
function str$5(a) {
  return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
}
function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
}
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
function multiplyScalarAndAdd(out, a, b, scale2) {
  out[0] = a[0] + b[0] * scale2;
  out[1] = a[1] + b[1] * scale2;
  out[2] = a[2] + b[2] * scale2;
  out[3] = a[3] + b[3] * scale2;
  out[4] = a[4] + b[4] * scale2;
  out[5] = a[5] + b[5] * scale2;
  out[6] = a[6] + b[6] * scale2;
  out[7] = a[7] + b[7] * scale2;
  out[8] = a[8] + b[8] * scale2;
  out[9] = a[9] + b[9] * scale2;
  out[10] = a[10] + b[10] * scale2;
  out[11] = a[11] + b[11] * scale2;
  out[12] = a[12] + b[12] * scale2;
  out[13] = a[13] + b[13] * scale2;
  out[14] = a[14] + b[14] * scale2;
  out[15] = a[15] + b[15] * scale2;
  return out;
}
function exactEquals$5(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}
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
var mul$5 = multiply$5;
var sub$3 = subtract$3;
var mat4 = Object.freeze({
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
function clone$4(a) {
  var out = new ARRAY_TYPE(3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
function length$4(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.hypot(x, y, z);
}
function fromValues$4(x, y, z) {
  var out = new ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
function copy$4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
function set$4(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
function add$4(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
function subtract$2(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
function multiply$4(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}
function divide$2(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}
function ceil$2(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}
function floor$2(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}
function min$2(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}
function max$2(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}
function round$2(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  return out;
}
function scale$4(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
function scaleAndAdd$2(out, a, b, scale2) {
  out[0] = a[0] + b[0] * scale2;
  out[1] = a[1] + b[1] * scale2;
  out[2] = a[2] + b[2] * scale2;
  return out;
}
function distance$2(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.hypot(x, y, z);
}
function squaredDistance$2(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}
function squaredLength$4(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}
function negate$2(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
function inverse$2(out, a) {
  out[0] = 1 / a[0];
  out[1] = 1 / a[1];
  out[2] = 1 / a[2];
  return out;
}
function normalize$4(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len2 = x * x + y * y + z * z;
  if (len2 > 0) {
    len2 = 1 / Math.sqrt(len2);
  }
  out[0] = a[0] * len2;
  out[1] = a[1] * len2;
  out[2] = a[2] * len2;
  return out;
}
function dot$4(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function cross$2(out, a, b) {
  var ax = a[0], ay = a[1], az = a[2];
  var bx = b[0], by = b[1], bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
function lerp$4(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}
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
function random$3(out, scale2) {
  scale2 = scale2 || 1;
  var r = RANDOM() * 2 * Math.PI;
  var z = RANDOM() * 2 - 1;
  var zScale = Math.sqrt(1 - z * z) * scale2;
  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale2;
  return out;
}
function transformMat4$2(out, a, m) {
  var x = a[0], y = a[1], z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
function transformMat3$1(out, a, m) {
  var x = a[0], y = a[1], z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}
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
function angle$1(a, b) {
  var ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2], mag1 = Math.sqrt(ax * ax + ay * ay + az * az), mag2 = Math.sqrt(bx * bx + by * by + bz * bz), mag = mag1 * mag2, cosine = mag && dot$4(a, b) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
function zero$2(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  return out;
}
function str$4(a) {
  return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
}
function exactEquals$4(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
function equals$4(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2];
  var b0 = b[0], b1 = b[1], b2 = b[2];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2));
}
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
var vec3 = Object.freeze({
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
function clone$3(a) {
  var out = new ARRAY_TYPE(4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
function fromValues$3(x, y, z, w) {
  var out = new ARRAY_TYPE(4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
function copy$3(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
function set$3(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
function add$3(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
function subtract$1(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}
function multiply$3(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  out[3] = a[3] * b[3];
  return out;
}
function divide$1(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  out[3] = a[3] / b[3];
  return out;
}
function ceil$1(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  out[3] = Math.ceil(a[3]);
  return out;
}
function floor$1(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  out[3] = Math.floor(a[3]);
  return out;
}
function min$1(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  out[3] = Math.min(a[3], b[3]);
  return out;
}
function max$1(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  out[3] = Math.max(a[3], b[3]);
  return out;
}
function round$1(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  out[3] = Math.round(a[3]);
  return out;
}
function scale$3(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
function scaleAndAdd$1(out, a, b, scale2) {
  out[0] = a[0] + b[0] * scale2;
  out[1] = a[1] + b[1] * scale2;
  out[2] = a[2] + b[2] * scale2;
  out[3] = a[3] + b[3] * scale2;
  return out;
}
function distance$1(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return Math.hypot(x, y, z, w);
}
function squaredDistance$1(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return x * x + y * y + z * z + w * w;
}
function length$3(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return Math.hypot(x, y, z, w);
}
function squaredLength$3(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return x * x + y * y + z * z + w * w;
}
function negate$1(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = -a[3];
  return out;
}
function inverse$1(out, a) {
  out[0] = 1 / a[0];
  out[1] = 1 / a[1];
  out[2] = 1 / a[2];
  out[3] = 1 / a[3];
  return out;
}
function normalize$3(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len2 = x * x + y * y + z * z + w * w;
  if (len2 > 0) {
    len2 = 1 / Math.sqrt(len2);
  }
  out[0] = x * len2;
  out[1] = y * len2;
  out[2] = z * len2;
  out[3] = w * len2;
  return out;
}
function dot$3(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
function cross$1(out, u, v, w) {
  var A = v[0] * w[1] - v[1] * w[0], B = v[0] * w[2] - v[2] * w[0], C = v[0] * w[3] - v[3] * w[0], D = v[1] * w[2] - v[2] * w[1], E = v[1] * w[3] - v[3] * w[1], F = v[2] * w[3] - v[3] * w[2];
  var G = u[0];
  var H = u[1];
  var I = u[2];
  var J = u[3];
  out[0] = H * F - I * E + J * D;
  out[1] = -(G * F) + I * C - J * B;
  out[2] = G * E - H * C + J * A;
  out[3] = -(G * D) + H * B - I * A;
  return out;
}
function lerp$3(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  var aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}
function random$2(out, scale2) {
  scale2 = scale2 || 1;
  var v1, v2, v3, v4;
  var s1, s2;
  do {
    v1 = RANDOM() * 2 - 1;
    v2 = RANDOM() * 2 - 1;
    s1 = v1 * v1 + v2 * v2;
  } while (s1 >= 1);
  do {
    v3 = RANDOM() * 2 - 1;
    v4 = RANDOM() * 2 - 1;
    s2 = v3 * v3 + v4 * v4;
  } while (s2 >= 1);
  var d = Math.sqrt((1 - s1) / s2);
  out[0] = scale2 * v1;
  out[1] = scale2 * v2;
  out[2] = scale2 * v3 * d;
  out[3] = scale2 * v4 * d;
  return out;
}
function transformMat4$1(out, a, m) {
  var x = a[0], y = a[1], z = a[2], w = a[3];
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return out;
}
function transformQuat(out, a, q) {
  var x = a[0], y = a[1], z = a[2];
  var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
  var ix = qw * x + qy * z - qz * y;
  var iy = qw * y + qz * x - qx * z;
  var iz = qw * z + qx * y - qy * x;
  var iw = -qx * x - qy * y - qz * z;
  out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  out[3] = a[3];
  return out;
}
function zero$1(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  return out;
}
function str$3(a) {
  return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
function exactEquals$3(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
function equals$3(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3));
}
var sub$1 = subtract$1;
var mul$3 = multiply$3;
var div$1 = divide$1;
var dist$1 = distance$1;
var sqrDist$1 = squaredDistance$1;
var len$3 = length$3;
var sqrLen$3 = squaredLength$3;
var forEach$1 = function() {
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
}();
var vec4 = Object.freeze({
  __proto__: null,
  add: add$3,
  ceil: ceil$1,
  clone: clone$3,
  copy: copy$3,
  create: create$3,
  cross: cross$1,
  dist: dist$1,
  distance: distance$1,
  div: div$1,
  divide: divide$1,
  dot: dot$3,
  equals: equals$3,
  exactEquals: exactEquals$3,
  floor: floor$1,
  forEach: forEach$1,
  fromValues: fromValues$3,
  inverse: inverse$1,
  len: len$3,
  length: length$3,
  lerp: lerp$3,
  max: max$1,
  min: min$1,
  mul: mul$3,
  multiply: multiply$3,
  negate: negate$1,
  normalize: normalize$3,
  random: random$2,
  round: round$1,
  scale: scale$3,
  scaleAndAdd: scaleAndAdd$1,
  set: set$3,
  sqrDist: sqrDist$1,
  sqrLen: sqrLen$3,
  squaredDistance: squaredDistance$1,
  squaredLength: squaredLength$3,
  str: str$3,
  sub: sub$1,
  subtract: subtract$1,
  transformMat4: transformMat4$1,
  transformQuat,
  zero: zero$1
});
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
function identity$1(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}
function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}
function getAxisAngle(out_axis, q) {
  var rad = Math.acos(q[3]) * 2;
  var s = Math.sin(rad / 2);
  if (s > EPSILON) {
    out_axis[0] = q[0] / s;
    out_axis[1] = q[1] / s;
    out_axis[2] = q[2] / s;
  } else {
    out_axis[0] = 1;
    out_axis[1] = 0;
    out_axis[2] = 0;
  }
  return rad;
}
function getAngle(a, b) {
  var dotproduct = dot$2(a, b);
  return Math.acos(2 * dotproduct * dotproduct - 1);
}
function multiply$2(out, a, b) {
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var bx = b[0], by = b[1], bz = b[2], bw = b[3];
  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
function rotateX$1(out, a, rad) {
  rad *= 0.5;
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var bx = Math.sin(rad), bw = Math.cos(rad);
  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
}
function rotateY$1(out, a, rad) {
  rad *= 0.5;
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var by = Math.sin(rad), bw = Math.cos(rad);
  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
}
function rotateZ$1(out, a, rad) {
  rad *= 0.5;
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var bz = Math.sin(rad), bw = Math.cos(rad);
  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
}
function calculateW(out, a) {
  var x = a[0], y = a[1], z = a[2];
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = Math.sqrt(Math.abs(1 - x * x - y * y - z * z));
  return out;
}
function exp(out, a) {
  var x = a[0], y = a[1], z = a[2], w = a[3];
  var r = Math.sqrt(x * x + y * y + z * z);
  var et = Math.exp(w);
  var s = r > 0 ? et * Math.sin(r) / r : 0;
  out[0] = x * s;
  out[1] = y * s;
  out[2] = z * s;
  out[3] = et * Math.cos(r);
  return out;
}
function ln(out, a) {
  var x = a[0], y = a[1], z = a[2], w = a[3];
  var r = Math.sqrt(x * x + y * y + z * z);
  var t = r > 0 ? Math.atan2(r, w) / r : 0;
  out[0] = x * t;
  out[1] = y * t;
  out[2] = z * t;
  out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
  return out;
}
function pow(out, a, b) {
  ln(out, a);
  scale$2(out, out, b);
  exp(out, out);
  return out;
}
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
function random$1(out) {
  var u1 = RANDOM();
  var u2 = RANDOM();
  var u3 = RANDOM();
  var sqrt1MinusU1 = Math.sqrt(1 - u1);
  var sqrtU1 = Math.sqrt(u1);
  out[0] = sqrt1MinusU1 * Math.sin(2 * Math.PI * u2);
  out[1] = sqrt1MinusU1 * Math.cos(2 * Math.PI * u2);
  out[2] = sqrtU1 * Math.sin(2 * Math.PI * u3);
  out[3] = sqrtU1 * Math.cos(2 * Math.PI * u3);
  return out;
}
function invert$1(out, a) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var dot2 = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  var invDot = dot2 ? 1 / dot2 : 0;
  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;
  return out;
}
function conjugate$1(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out;
}
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
function fromEuler(out, x, y, z) {
  var halfToRad = 0.5 * Math.PI / 180;
  x *= halfToRad;
  y *= halfToRad;
  z *= halfToRad;
  var sx = Math.sin(x);
  var cx = Math.cos(x);
  var sy = Math.sin(y);
  var cy = Math.cos(y);
  var sz = Math.sin(z);
  var cz = Math.cos(z);
  out[0] = sx * cy * cz - cx * sy * sz;
  out[1] = cx * sy * cz + sx * cy * sz;
  out[2] = cx * cy * sz - sx * sy * cz;
  out[3] = cx * cy * cz + sx * sy * sz;
  return out;
}
function str$2(a) {
  return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
var clone$2 = clone$3;
var fromValues$2 = fromValues$3;
var copy$2 = copy$3;
var set$2 = set$3;
var add$2 = add$3;
var mul$2 = multiply$2;
var scale$2 = scale$3;
var dot$2 = dot$3;
var lerp$2 = lerp$3;
var length$2 = length$3;
var len$2 = length$2;
var squaredLength$2 = squaredLength$3;
var sqrLen$2 = squaredLength$2;
var normalize$2 = normalize$3;
var exactEquals$2 = exactEquals$3;
var equals$2 = equals$3;
var rotationTo = function() {
  var tmpvec3 = create$4();
  var xUnitVec3 = fromValues$4(1, 0, 0);
  var yUnitVec3 = fromValues$4(0, 1, 0);
  return function(out, a, b) {
    var dot2 = dot$4(a, b);
    if (dot2 < -0.999999) {
      cross$2(tmpvec3, xUnitVec3, a);
      if (len$4(tmpvec3) < 1e-6)
        cross$2(tmpvec3, yUnitVec3, a);
      normalize$4(tmpvec3, tmpvec3);
      setAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot2 > 0.999999) {
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
      out[3] = 1 + dot2;
      return normalize$2(out, out);
    }
  };
}();
var sqlerp = function() {
  var temp1 = create$2();
  var temp2 = create$2();
  return function(out, a, b, c, d, t) {
    slerp(temp1, a, d, t);
    slerp(temp2, b, c, t);
    slerp(out, temp1, temp2, 2 * t * (1 - t));
    return out;
  };
}();
var setAxes = function() {
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
}();
var quat = Object.freeze({
  __proto__: null,
  add: add$2,
  calculateW,
  clone: clone$2,
  conjugate: conjugate$1,
  copy: copy$2,
  create: create$2,
  dot: dot$2,
  equals: equals$2,
  exactEquals: exactEquals$2,
  exp,
  fromEuler,
  fromMat3,
  fromValues: fromValues$2,
  getAngle,
  getAxisAngle,
  identity: identity$1,
  invert: invert$1,
  len: len$2,
  length: length$2,
  lerp: lerp$2,
  ln,
  mul: mul$2,
  multiply: multiply$2,
  normalize: normalize$2,
  pow,
  random: random$1,
  rotateX: rotateX$1,
  rotateY: rotateY$1,
  rotateZ: rotateZ$1,
  rotationTo,
  scale: scale$2,
  set: set$2,
  setAxes,
  setAxisAngle,
  slerp,
  sqlerp,
  sqrLen: sqrLen$2,
  squaredLength: squaredLength$2,
  str: str$2
});
function create$1() {
  var dq = new ARRAY_TYPE(8);
  if (ARRAY_TYPE != Float32Array) {
    dq[0] = 0;
    dq[1] = 0;
    dq[2] = 0;
    dq[4] = 0;
    dq[5] = 0;
    dq[6] = 0;
    dq[7] = 0;
  }
  dq[3] = 1;
  return dq;
}
function clone$1(a) {
  var dq = new ARRAY_TYPE(8);
  dq[0] = a[0];
  dq[1] = a[1];
  dq[2] = a[2];
  dq[3] = a[3];
  dq[4] = a[4];
  dq[5] = a[5];
  dq[6] = a[6];
  dq[7] = a[7];
  return dq;
}
function fromValues$1(x1, y1, z1, w1, x2, y2, z2, w2) {
  var dq = new ARRAY_TYPE(8);
  dq[0] = x1;
  dq[1] = y1;
  dq[2] = z1;
  dq[3] = w1;
  dq[4] = x2;
  dq[5] = y2;
  dq[6] = z2;
  dq[7] = w2;
  return dq;
}
function fromRotationTranslationValues(x1, y1, z1, w1, x2, y2, z2) {
  var dq = new ARRAY_TYPE(8);
  dq[0] = x1;
  dq[1] = y1;
  dq[2] = z1;
  dq[3] = w1;
  var ax = x2 * 0.5, ay = y2 * 0.5, az = z2 * 0.5;
  dq[4] = ax * w1 + ay * z1 - az * y1;
  dq[5] = ay * w1 + az * x1 - ax * z1;
  dq[6] = az * w1 + ax * y1 - ay * x1;
  dq[7] = -ax * x1 - ay * y1 - az * z1;
  return dq;
}
function fromRotationTranslation(out, q, t) {
  var ax = t[0] * 0.5, ay = t[1] * 0.5, az = t[2] * 0.5, bx = q[0], by = q[1], bz = q[2], bw = q[3];
  out[0] = bx;
  out[1] = by;
  out[2] = bz;
  out[3] = bw;
  out[4] = ax * bw + ay * bz - az * by;
  out[5] = ay * bw + az * bx - ax * bz;
  out[6] = az * bw + ax * by - ay * bx;
  out[7] = -ax * bx - ay * by - az * bz;
  return out;
}
function fromTranslation(out, t) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = t[0] * 0.5;
  out[5] = t[1] * 0.5;
  out[6] = t[2] * 0.5;
  out[7] = 0;
  return out;
}
function fromRotation(out, q) {
  out[0] = q[0];
  out[1] = q[1];
  out[2] = q[2];
  out[3] = q[3];
  out[4] = 0;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  return out;
}
function fromMat4(out, a) {
  var outer = create$2();
  getRotation(outer, a);
  var t = new ARRAY_TYPE(3);
  getTranslation$1(t, a);
  fromRotationTranslation(out, outer, t);
  return out;
}
function copy$1(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  return out;
}
function identity2(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  return out;
}
function set$1(out, x1, y1, z1, w1, x2, y2, z2, w2) {
  out[0] = x1;
  out[1] = y1;
  out[2] = z1;
  out[3] = w1;
  out[4] = x2;
  out[5] = y2;
  out[6] = z2;
  out[7] = w2;
  return out;
}
var getReal = copy$2;
function getDual(out, a) {
  out[0] = a[4];
  out[1] = a[5];
  out[2] = a[6];
  out[3] = a[7];
  return out;
}
var setReal = copy$2;
function setDual(out, q) {
  out[4] = q[0];
  out[5] = q[1];
  out[6] = q[2];
  out[7] = q[3];
  return out;
}
function getTranslation(out, a) {
  var ax = a[4], ay = a[5], az = a[6], aw = a[7], bx = -a[0], by = -a[1], bz = -a[2], bw = a[3];
  out[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
  out[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
  out[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  return out;
}
function translate(out, a, v) {
  var ax1 = a[0], ay1 = a[1], az1 = a[2], aw1 = a[3], bx1 = v[0] * 0.5, by1 = v[1] * 0.5, bz1 = v[2] * 0.5, ax2 = a[4], ay2 = a[5], az2 = a[6], aw2 = a[7];
  out[0] = ax1;
  out[1] = ay1;
  out[2] = az1;
  out[3] = aw1;
  out[4] = aw1 * bx1 + ay1 * bz1 - az1 * by1 + ax2;
  out[5] = aw1 * by1 + az1 * bx1 - ax1 * bz1 + ay2;
  out[6] = aw1 * bz1 + ax1 * by1 - ay1 * bx1 + az2;
  out[7] = -ax1 * bx1 - ay1 * by1 - az1 * bz1 + aw2;
  return out;
}
function rotateX(out, a, rad) {
  var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7], ax1 = ax * bw + aw * bx + ay * bz - az * by, ay1 = ay * bw + aw * by + az * bx - ax * bz, az1 = az * bw + aw * bz + ax * by - ay * bx, aw1 = aw * bw - ax * bx - ay * by - az * bz;
  rotateX$1(out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}
function rotateY(out, a, rad) {
  var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7], ax1 = ax * bw + aw * bx + ay * bz - az * by, ay1 = ay * bw + aw * by + az * bx - ax * bz, az1 = az * bw + aw * bz + ax * by - ay * bx, aw1 = aw * bw - ax * bx - ay * by - az * bz;
  rotateY$1(out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}
function rotateZ(out, a, rad) {
  var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7], ax1 = ax * bw + aw * bx + ay * bz - az * by, ay1 = ay * bw + aw * by + az * bx - ax * bz, az1 = az * bw + aw * bz + ax * by - ay * bx, aw1 = aw * bw - ax * bx - ay * by - az * bz;
  rotateZ$1(out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}
function rotateByQuatAppend(out, a, q) {
  var qx = q[0], qy = q[1], qz = q[2], qw = q[3], ax = a[0], ay = a[1], az = a[2], aw = a[3];
  out[0] = ax * qw + aw * qx + ay * qz - az * qy;
  out[1] = ay * qw + aw * qy + az * qx - ax * qz;
  out[2] = az * qw + aw * qz + ax * qy - ay * qx;
  out[3] = aw * qw - ax * qx - ay * qy - az * qz;
  ax = a[4];
  ay = a[5];
  az = a[6];
  aw = a[7];
  out[4] = ax * qw + aw * qx + ay * qz - az * qy;
  out[5] = ay * qw + aw * qy + az * qx - ax * qz;
  out[6] = az * qw + aw * qz + ax * qy - ay * qx;
  out[7] = aw * qw - ax * qx - ay * qy - az * qz;
  return out;
}
function rotateByQuatPrepend(out, q, a) {
  var qx = q[0], qy = q[1], qz = q[2], qw = q[3], bx = a[0], by = a[1], bz = a[2], bw = a[3];
  out[0] = qx * bw + qw * bx + qy * bz - qz * by;
  out[1] = qy * bw + qw * by + qz * bx - qx * bz;
  out[2] = qz * bw + qw * bz + qx * by - qy * bx;
  out[3] = qw * bw - qx * bx - qy * by - qz * bz;
  bx = a[4];
  by = a[5];
  bz = a[6];
  bw = a[7];
  out[4] = qx * bw + qw * bx + qy * bz - qz * by;
  out[5] = qy * bw + qw * by + qz * bx - qx * bz;
  out[6] = qz * bw + qw * bz + qx * by - qy * bx;
  out[7] = qw * bw - qx * bx - qy * by - qz * bz;
  return out;
}
function rotateAroundAxis(out, a, axis, rad) {
  if (Math.abs(rad) < EPSILON) {
    return copy$1(out, a);
  }
  var axisLength = Math.hypot(axis[0], axis[1], axis[2]);
  rad = rad * 0.5;
  var s = Math.sin(rad);
  var bx = s * axis[0] / axisLength;
  var by = s * axis[1] / axisLength;
  var bz = s * axis[2] / axisLength;
  var bw = Math.cos(rad);
  var ax1 = a[0], ay1 = a[1], az1 = a[2], aw1 = a[3];
  out[0] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[1] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[2] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[3] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  var ax = a[4], ay = a[5], az = a[6], aw = a[7];
  out[4] = ax * bw + aw * bx + ay * bz - az * by;
  out[5] = ay * bw + aw * by + az * bx - ax * bz;
  out[6] = az * bw + aw * bz + ax * by - ay * bx;
  out[7] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
function add$1(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  return out;
}
function multiply$1(out, a, b) {
  var ax0 = a[0], ay0 = a[1], az0 = a[2], aw0 = a[3], bx1 = b[4], by1 = b[5], bz1 = b[6], bw1 = b[7], ax1 = a[4], ay1 = a[5], az1 = a[6], aw1 = a[7], bx0 = b[0], by0 = b[1], bz0 = b[2], bw0 = b[3];
  out[0] = ax0 * bw0 + aw0 * bx0 + ay0 * bz0 - az0 * by0;
  out[1] = ay0 * bw0 + aw0 * by0 + az0 * bx0 - ax0 * bz0;
  out[2] = az0 * bw0 + aw0 * bz0 + ax0 * by0 - ay0 * bx0;
  out[3] = aw0 * bw0 - ax0 * bx0 - ay0 * by0 - az0 * bz0;
  out[4] = ax0 * bw1 + aw0 * bx1 + ay0 * bz1 - az0 * by1 + ax1 * bw0 + aw1 * bx0 + ay1 * bz0 - az1 * by0;
  out[5] = ay0 * bw1 + aw0 * by1 + az0 * bx1 - ax0 * bz1 + ay1 * bw0 + aw1 * by0 + az1 * bx0 - ax1 * bz0;
  out[6] = az0 * bw1 + aw0 * bz1 + ax0 * by1 - ay0 * bx1 + az1 * bw0 + aw1 * bz0 + ax1 * by0 - ay1 * bx0;
  out[7] = aw0 * bw1 - ax0 * bx1 - ay0 * by1 - az0 * bz1 + aw1 * bw0 - ax1 * bx0 - ay1 * by0 - az1 * bz0;
  return out;
}
var mul$1 = multiply$1;
function scale$1(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  return out;
}
var dot$1 = dot$2;
function lerp$1(out, a, b, t) {
  var mt = 1 - t;
  if (dot$1(a, b) < 0)
    t = -t;
  out[0] = a[0] * mt + b[0] * t;
  out[1] = a[1] * mt + b[1] * t;
  out[2] = a[2] * mt + b[2] * t;
  out[3] = a[3] * mt + b[3] * t;
  out[4] = a[4] * mt + b[4] * t;
  out[5] = a[5] * mt + b[5] * t;
  out[6] = a[6] * mt + b[6] * t;
  out[7] = a[7] * mt + b[7] * t;
  return out;
}
function invert(out, a) {
  var sqlen = squaredLength$1(a);
  out[0] = -a[0] / sqlen;
  out[1] = -a[1] / sqlen;
  out[2] = -a[2] / sqlen;
  out[3] = a[3] / sqlen;
  out[4] = -a[4] / sqlen;
  out[5] = -a[5] / sqlen;
  out[6] = -a[6] / sqlen;
  out[7] = a[7] / sqlen;
  return out;
}
function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  out[4] = -a[4];
  out[5] = -a[5];
  out[6] = -a[6];
  out[7] = a[7];
  return out;
}
var length$1 = length$2;
var len$1 = length$1;
var squaredLength$1 = squaredLength$2;
var sqrLen$1 = squaredLength$1;
function normalize$1(out, a) {
  var magnitude = squaredLength$1(a);
  if (magnitude > 0) {
    magnitude = Math.sqrt(magnitude);
    var a0 = a[0] / magnitude;
    var a1 = a[1] / magnitude;
    var a2 = a[2] / magnitude;
    var a3 = a[3] / magnitude;
    var b0 = a[4];
    var b1 = a[5];
    var b2 = a[6];
    var b3 = a[7];
    var a_dot_b = a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3;
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = (b0 - a0 * a_dot_b) / magnitude;
    out[5] = (b1 - a1 * a_dot_b) / magnitude;
    out[6] = (b2 - a2 * a_dot_b) / magnitude;
    out[7] = (b3 - a3 * a_dot_b) / magnitude;
  }
  return out;
}
function str$1(a) {
  return "quat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ")";
}
function exactEquals$1(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7];
}
function equals$1(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7));
}
var quat2 = Object.freeze({
  __proto__: null,
  add: add$1,
  clone: clone$1,
  conjugate,
  copy: copy$1,
  create: create$1,
  dot: dot$1,
  equals: equals$1,
  exactEquals: exactEquals$1,
  fromMat4,
  fromRotation,
  fromRotationTranslation,
  fromRotationTranslationValues,
  fromTranslation,
  fromValues: fromValues$1,
  getDual,
  getReal,
  getTranslation,
  identity: identity2,
  invert,
  len: len$1,
  length: length$1,
  lerp: lerp$1,
  mul: mul$1,
  multiply: multiply$1,
  normalize: normalize$1,
  rotateAroundAxis,
  rotateByQuatAppend,
  rotateByQuatPrepend,
  rotateX,
  rotateY,
  rotateZ,
  scale: scale$1,
  set: set$1,
  setDual,
  setReal,
  sqrLen: sqrLen$1,
  squaredLength: squaredLength$1,
  str: str$1,
  translate
});
function create() {
  var out = new ARRAY_TYPE(2);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }
  return out;
}
function clone(a) {
  var out = new ARRAY_TYPE(2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
function fromValues(x, y) {
  var out = new ARRAY_TYPE(2);
  out[0] = x;
  out[1] = y;
  return out;
}
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
function set(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}
function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
}
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
}
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  return out;
}
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  return out;
}
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  return out;
}
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out;
}
function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  return out;
}
function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}
function scaleAndAdd(out, a, b, scale2) {
  out[0] = a[0] + b[0] * scale2;
  out[1] = a[1] + b[1] * scale2;
  return out;
}
function distance(a, b) {
  var x = b[0] - a[0], y = b[1] - a[1];
  return Math.hypot(x, y);
}
function squaredDistance(a, b) {
  var x = b[0] - a[0], y = b[1] - a[1];
  return x * x + y * y;
}
function length(a) {
  var x = a[0], y = a[1];
  return Math.hypot(x, y);
}
function squaredLength(a) {
  var x = a[0], y = a[1];
  return x * x + y * y;
}
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
}
function inverse(out, a) {
  out[0] = 1 / a[0];
  out[1] = 1 / a[1];
  return out;
}
function normalize(out, a) {
  var x = a[0], y = a[1];
  var len2 = x * x + y * y;
  if (len2 > 0) {
    len2 = 1 / Math.sqrt(len2);
  }
  out[0] = a[0] * len2;
  out[1] = a[1] * len2;
  return out;
}
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}
function cross(out, a, b) {
  var z = a[0] * b[1] - a[1] * b[0];
  out[0] = out[1] = 0;
  out[2] = z;
  return out;
}
function lerp(out, a, b, t) {
  var ax = a[0], ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
}
function random(out, scale2) {
  scale2 = scale2 || 1;
  var r = RANDOM() * 2 * Math.PI;
  out[0] = Math.cos(r) * scale2;
  out[1] = Math.sin(r) * scale2;
  return out;
}
function transformMat2(out, a, m) {
  var x = a[0], y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
}
function transformMat2d(out, a, m) {
  var x = a[0], y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
}
function transformMat3(out, a, m) {
  var x = a[0], y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
}
function transformMat4(out, a, m) {
  var x = a[0];
  var y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}
function rotate(out, a, b, rad) {
  var p0 = a[0] - b[0], p1 = a[1] - b[1], sinC = Math.sin(rad), cosC = Math.cos(rad);
  out[0] = p0 * cosC - p1 * sinC + b[0];
  out[1] = p0 * sinC + p1 * cosC + b[1];
  return out;
}
function angle(a, b) {
  var x1 = a[0], y1 = a[1], x2 = b[0], y2 = b[1], mag = Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2), cosine = mag && (x1 * x2 + y1 * y2) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
function zero(out) {
  out[0] = 0;
  out[1] = 0;
  return out;
}
function str(a) {
  return "vec2(" + a[0] + ", " + a[1] + ")";
}
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}
function equals(a, b) {
  var a0 = a[0], a1 = a[1];
  var b0 = b[0], b1 = b[1];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1));
}
var len = length;
var sub = subtract;
var mul = multiply;
var div = divide;
var dist = distance;
var sqrDist = squaredDistance;
var sqrLen = squaredLength;
var forEach = function() {
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
}();
var vec2 = Object.freeze({
  __proto__: null,
  add,
  angle,
  ceil,
  clone,
  copy,
  create,
  cross,
  dist,
  distance,
  div,
  divide,
  dot,
  equals,
  exactEquals,
  floor,
  forEach,
  fromValues,
  inverse,
  len,
  length,
  lerp,
  max,
  min,
  mul,
  multiply,
  negate,
  normalize,
  random,
  rotate,
  round,
  scale,
  scaleAndAdd,
  set,
  sqrDist,
  sqrLen,
  squaredDistance,
  squaredLength,
  str,
  sub,
  subtract,
  transformMat2,
  transformMat2d,
  transformMat3,
  transformMat4,
  zero
});
var _lastSampleTime, _lastSamplePoint, _resetDeltaTime, _scaleTime, _velInstant, _velQuick, _velSmooth, _velUsed;
var TJSVelocityTrack = class {
  /**
   * Creates a velocity tracker instance.
   *
   * @param {object}   [opts] - Optional parameters.
   *
   * @param {number}   [opts.resetDeltaTime=50] - Delta time in milliseconds that resets velocity tracking.
   *
   * @param {number}   [opts.scaleTime=1000] - Scales velocity calculation to new time frame. 1000 is velocity per
   *                                           second.
   */
  constructor({ resetDeltaTime = 50, scaleTime = 1e3 } = {}) {
    /** @type {number} */
    __privateAdd(this, _lastSampleTime, void 0);
    /**
     * Tracks the last sample point.
     *
     * @type {{x: number, y: number, z: number}}
     */
    __privateAdd(this, _lastSamplePoint, { x: 0, y: 0, z: 0 });
    /**
     * Defines the settle time in milliseconds that resets any tracked velocity state.
     *
     * @type {number}
     */
    __privateAdd(this, _resetDeltaTime, void 0);
    /**
     * Stores the scaling conversion for used velocity calculation. By default, this is 1000 which converts the velocity
     * calculation to velocity per second. Set to `1` for instance for velocity per millisecond.
     *
     * @type {number}
     */
    __privateAdd(this, _scaleTime, void 0);
    /**
     * Stores the instant velocity between current and last sample point.
     *
     * @type {{x: number, y: number, z: number}}
     */
    __privateAdd(this, _velInstant, { x: 0, y: 0, z: 0 });
    /**
     * Stores the `quick` running calculated velocity.
     *
     * @type {{x: number, y: number, z: number}}
     */
    __privateAdd(this, _velQuick, { x: 0, y: 0, z: 0 });
    /**
     * Stores the `smooth` running calculated velocity.
     *
     * @type {{x: number, y: number, z: number}}
     */
    __privateAdd(this, _velSmooth, { x: 0, y: 0, z: 0 });
    /**
     * Stores the mix between `quick` and `smooth` running velocity.
     *
     * @type {{x: number, y: number, z: number}}
     */
    __privateAdd(this, _velUsed, { x: 0, y: 0, z: 0 });
    this.resetDeltaTime = resetDeltaTime;
    this.scaleTime = scaleTime;
    Object.seal(__privateGet(this, _velUsed));
  }
  /**
   * @returns {number} Gets `resetDeltaTime`.
   */
  get resetDeltaTime() {
    return __privateGet(this, _resetDeltaTime);
  }
  /**
   * @returns {number} Gets `scaleTime`.
   */
  get scaleTime() {
    return __privateGet(this, _scaleTime);
  }
  /**
   * Sets `resetDeltaTime`.
   *
   * @param {number}   resetDeltaTime - Delta time in milliseconds that resets velocity tracking.
   */
  set resetDeltaTime(resetDeltaTime) {
    if (!Number.isFinite(resetDeltaTime) || resetDeltaTime < 0) {
      throw new TypeError(`'resetDeltaTime' is not a positive finite number.`);
    }
    __privateSet(this, _resetDeltaTime, resetDeltaTime);
  }
  /**
   * Sets `scaleTime`.
   *
   * @param {number}   scaleTime - Scales velocity calculation to new time frame. 1000 is velocity per second.
   */
  set scaleTime(scaleTime) {
    if (!Number.isFinite(scaleTime) || scaleTime < 0) {
      throw new TypeError(`'scaleTime' is not a positive finite number.`);
    }
    __privateSet(this, _scaleTime, scaleTime);
  }
  /**
   * Resets velocity tracking data.
   *
   * @param {number}   [x=0] - 'X' value to set to last sample point.
   *
   * @param {number}   [y=0] - 'Y' value to set to last sample point.
   *
   * @param {number}   [z=0] - 'Z' value to set to last sample point.
   *
   * @param {number}   [sampleTime=performance.now()] - A sample time in milliseconds resolution.
   */
  reset(x = 0, y = 0, z = 0, sampleTime = performance.now()) {
    if (!Number.isFinite(x)) {
      throw new TypeError(`'x' is not a finite number.`);
    }
    if (!Number.isFinite(y)) {
      throw new TypeError(`'y' is not a finite number.`);
    }
    if (!Number.isFinite(z)) {
      throw new TypeError(`'z' is not a finite number.`);
    }
    if (!Number.isFinite(sampleTime)) {
      throw new TypeError(`'sampleTime' is not a finite number.`);
    }
    __privateSet(this, _lastSampleTime, sampleTime);
    __privateGet(this, _lastSamplePoint).x = x;
    __privateGet(this, _lastSamplePoint).y = y;
    __privateGet(this, _lastSamplePoint).z = z;
    __privateGet(this, _velInstant).x = __privateGet(this, _velQuick).x = __privateGet(this, _velSmooth).x = __privateGet(this, _velUsed).x = 0;
    __privateGet(this, _velInstant).y = __privateGet(this, _velQuick).y = __privateGet(this, _velSmooth).y = __privateGet(this, _velUsed).y = 0;
    __privateGet(this, _velInstant).z = __privateGet(this, _velQuick).z = __privateGet(this, _velSmooth).z = __privateGet(this, _velUsed).z = 0;
  }
  /**
   * Runs ongoing velocity calculation of x / y / z given a sample time.
   *
   * @param {number|undefined}  x - New sample X
   *
   * @param {number|undefined}  y - New sample Y
   *
   * @param {number|undefined}  z - New sample Z
   *
   * @param {number}            [sampleTime=performance.now()] - An optional specific time w/ millisecond resolution.
   *
   * @returns {{x: number, y: number, z: number}} current velocity.
   */
  update(x = void 0, y = void 0, z = void 0, sampleTime = performance.now()) {
    if (!Number.isFinite(sampleTime)) {
      throw new TypeError(`'sampleTime' is not a finite number.`);
    }
    const deltaTime = sampleTime - __privateGet(this, _lastSampleTime) + Number.EPSILON;
    __privateSet(this, _lastSampleTime, sampleTime);
    if (deltaTime > __privateGet(this, _resetDeltaTime)) {
      this.reset(x, y, z, sampleTime);
      return __privateGet(this, _velUsed);
    }
    if (Number.isFinite(x)) {
      __privateGet(this, _velInstant).x = (x - __privateGet(this, _lastSamplePoint).x) / deltaTime;
      __privateGet(this, _lastSamplePoint).x = x;
      __privateGet(this, _velQuick).x = lerp$5(__privateGet(this, _velQuick).x, __privateGet(this, _velInstant).x, 0.1);
      __privateGet(this, _velSmooth).x = lerp$5(__privateGet(this, _velSmooth).x, __privateGet(this, _velInstant).x, 0.01);
      __privateGet(this, _velUsed).x = lerp$5(__privateGet(this, _velSmooth).x, __privateGet(this, _velQuick).x, 0.5) * __privateGet(this, _scaleTime);
    }
    if (Number.isFinite(y)) {
      __privateGet(this, _velInstant).y = (y - __privateGet(this, _lastSamplePoint).y) / deltaTime;
      __privateGet(this, _lastSamplePoint).y = y;
      __privateGet(this, _velQuick).y = lerp$5(__privateGet(this, _velQuick).y, __privateGet(this, _velInstant).y, 0.1);
      __privateGet(this, _velSmooth).y = lerp$5(__privateGet(this, _velSmooth).y, __privateGet(this, _velInstant).y, 0.01);
      __privateGet(this, _velUsed).y = lerp$5(__privateGet(this, _velSmooth).y, __privateGet(this, _velQuick).y, 0.5) * __privateGet(this, _scaleTime);
    }
    if (Number.isFinite(z)) {
      __privateGet(this, _velInstant).z = (z - __privateGet(this, _lastSamplePoint).z) / deltaTime;
      __privateGet(this, _lastSamplePoint).z = z;
      __privateGet(this, _velQuick).z = lerp$5(__privateGet(this, _velQuick).z, __privateGet(this, _velInstant).z, 0.1);
      __privateGet(this, _velSmooth).z = lerp$5(__privateGet(this, _velSmooth).z, __privateGet(this, _velInstant).z, 0.01);
      __privateGet(this, _velUsed).z = lerp$5(__privateGet(this, _velSmooth).z, __privateGet(this, _velQuick).z, 0.5) * __privateGet(this, _scaleTime);
    }
    return __privateGet(this, _velUsed);
  }
  /**
   * Gets the current velocity tracking data.
   *
   * @returns {{x: number, y: number, z: number}} Velocity tracking data.
   */
  get() {
    __privateGet(this, _velUsed).x = lerp$5(__privateGet(this, _velSmooth).x, __privateGet(this, _velQuick).x, 0.5) * __privateGet(this, _scaleTime);
    __privateGet(this, _velUsed).y = lerp$5(__privateGet(this, _velSmooth).y, __privateGet(this, _velQuick).y, 0.5) * __privateGet(this, _scaleTime);
    __privateGet(this, _velUsed).z = lerp$5(__privateGet(this, _velSmooth).z, __privateGet(this, _velQuick).z, 0.5) * __privateGet(this, _scaleTime);
    return __privateGet(this, _velUsed);
  }
};
_lastSampleTime = new WeakMap();
_lastSamplePoint = new WeakMap();
_resetDeltaTime = new WeakMap();
_scaleTime = new WeakMap();
_velInstant = new WeakMap();
_velQuick = new WeakMap();
_velSmooth = new WeakMap();
_velUsed = new WeakMap();

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/transition/index.js
function slideFade(node, options) {
  const fadeEasing = options.easingFade || options.easing || identity;
  const slideEasing = options.easingSlide || options.easing || identity;
  const fadeTransition = fade(node);
  const slideTransition = slide(node);
  return {
    delay: options.delay || 0,
    duration: options.duration || 500,
    easing: identity,
    css: (t) => {
      const fadeT = fadeEasing(t);
      const slideT = slideEasing(t);
      return `${slideTransition.css(slideT, 1 - slideT)}; ${fadeTransition.css(fadeT, 1 - fadeT)}`;
    }
  };
}
var s_DEFAULT_TRANSITION = () => void 0;
var s_DEFAULT_TRANSITION_OPTIONS = {};

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/component/core/TJSGlassPane.svelte
var file2 = "node_modules\\@typhonjs-fvtt\\runtime\\_dist\\svelte\\component\\core\\TJSGlassPane.svelte";
function add_css2(target) {
  append_styles(target, "svelte-1smkjg7", ".tjs-glass-pane.svelte-1smkjg7,.tjs-glass-pane-background.svelte-1smkjg7,.tjs-glass-pane-container.svelte-1smkjg7{position:absolute;overflow:hidden;height:100%;width:100%;max-height:100%;max-width:100%}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVEpTR2xhc3NQYW5lLnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUFpS0csOEJBQUEsQ0FBQSx5Q0FBQSxDQUFBLHdDQUFBLENBQ0csUUFBQSxDQUFBLFFBQWtCLENBQ2xCLFFBQUEsQ0FBQSxNQUFnQixDQUVoQixNQUFBLENBQUEsSUFBWSxDQUNaLEtBQUEsQ0FBQSxJQUFXLENBQ1gsVUFBQSxDQUFBLElBQWdCLENBQ2hCLFNBQUEsQ0FBQSxJQUNIIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIlRKU0dsYXNzUGFuZS5zdmVsdGUiXX0= */");
}
function create_else_block(ctx) {
  let div2;
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
  const block = {
    c: function create2() {
      div2 = element("div");
      if (default_slot)
        default_slot.c();
      attr_dev(div2, "class", "tjs-glass-pane-background svelte-1smkjg7");
      set_style(
        div2,
        "background",
        /*background*/
        ctx[5]
      );
      add_location(div2, file2, 149, 6, 5229);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div2, anchor);
      if (default_slot) {
        default_slot.m(div2, null);
      }
      ctx[22](div2);
      current = true;
      if (!mounted) {
        dispose = action_destroyer(applyStyles_action = applyStyles.call(
          null,
          div2,
          /*styles*/
          ctx[7]
        ));
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
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
          div2,
          "background",
          /*background*/
          ctx[5]
        );
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      add_render_callback(() => {
        if (!current)
          return;
        if (div_outro)
          div_outro.end(1);
        div_intro = create_in_transition(
          div2,
          /*inTransition*/
          ctx[1],
          /*inTransitionOptions*/
          ctx[3]
        );
        div_intro.start();
      });
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      if (div_intro)
        div_intro.invalidate();
      div_outro = create_out_transition(
        div2,
        /*outTransition*/
        ctx[2],
        /*outTransitionOptions*/
        ctx[4]
      );
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div2);
      if (default_slot)
        default_slot.d(detaching);
      ctx[22](null);
      if (detaching && div_outro)
        div_outro.end();
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_else_block.name,
    type: "else",
    source: "(149:3) {:else}",
    ctx
  });
  return block;
}
function create_if_block2(ctx) {
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
  const block = {
    c: function create2() {
      div0 = element("div");
      t = space();
      div1 = element("div");
      if (default_slot)
        default_slot.c();
      attr_dev(div0, "class", "tjs-glass-pane-background svelte-1smkjg7");
      set_style(
        div0,
        "background",
        /*background*/
        ctx[5]
      );
      add_location(div0, file2, 138, 6, 4859);
      attr_dev(div1, "class", "tjs-glass-pane-container svelte-1smkjg7");
      add_location(div1, file2, 145, 6, 5120);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div0, anchor);
      ctx[20](div0);
      insert_dev(target, t, anchor);
      insert_dev(target, div1, anchor);
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
    p: function update(new_ctx, dirty) {
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
    i: function intro(local) {
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
    o: function outro(local) {
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
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div0);
      ctx[20](null);
      if (detaching && div0_outro)
        div0_outro.end();
      if (detaching)
        detach_dev(t);
      if (detaching)
        detach_dev(div1);
      if (default_slot)
        default_slot.d(detaching);
      ctx[21](null);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block2.name,
    type: "if",
    source: "(138:3) {#if slotSeparate}",
    ctx
  });
  return block;
}
function create_fragment3(ctx) {
  let div2;
  let current_block_type_index;
  let if_block;
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block2, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*slotSeparate*/
      ctx2[0]
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx, -1);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  const block = {
    c: function create2() {
      div2 = element("div");
      if_block.c();
      attr_dev(
        div2,
        "id",
        /*id*/
        ctx[6]
      );
      attr_dev(div2, "class", "tjs-glass-pane svelte-1smkjg7");
      set_style(
        div2,
        "z-index",
        /*zIndex*/
        ctx[8]
      );
      add_location(div2, file2, 132, 0, 4733);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, div2, anchor);
      if_blocks[current_block_type_index].m(div2, null);
      ctx[23](div2);
      current = true;
      if (!mounted) {
        dispose = [
          listen_dev(
            window,
            "contextmenu",
            /*swallow*/
            ctx[12],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            window,
            "dblclick",
            /*swallow*/
            ctx[12],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            window,
            "keydown",
            /*swallow*/
            ctx[12],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            window,
            "keyup",
            /*swallow*/
            ctx[12],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            window,
            "mousedown",
            /*swallow*/
            ctx[12],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            window,
            "mousemove",
            /*swallow*/
            ctx[12],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            window,
            "mouseup",
            /*swallow*/
            ctx[12],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            window,
            "pointerdown",
            /*swallow*/
            ctx[12],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            window,
            "pointermove",
            /*swallow*/
            ctx[12],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            window,
            "pointerup",
            /*swallow*/
            ctx[12],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            window,
            "touchend",
            /*swallow*/
            ctx[12],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            window,
            "touchmove",
            /*swallow*/
            ctx[12],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            window,
            "touchstart",
            /*swallow*/
            ctx[12],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            window,
            "wheel",
            /*swallow*/
            ctx[12],
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
        if_block.m(div2, null);
      }
      if (!current || dirty & /*id*/
      64) {
        attr_dev(
          div2,
          "id",
          /*id*/
          ctx2[6]
        );
      }
      if (dirty & /*zIndex*/
      256) {
        set_style(
          div2,
          "z-index",
          /*zIndex*/
          ctx2[8]
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
        detach_dev(div2);
      if_blocks[current_block_type_index].d();
      ctx[23](null);
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
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TJSGlassPane", slots, ["default"]);
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
  const writable_props = [
    "background",
    "captureInput",
    "id",
    "slotSeparate",
    "styles",
    "zIndex",
    "transition",
    "inTransition",
    "outTransition",
    "transitionOptions",
    "inTransitionOptions",
    "outTransitionOptions"
  ];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<TJSGlassPane> was created with unknown prop '${key}'`);
  });
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
  $$self.$capture_state = () => ({
    applyStyles,
    s_DEFAULT_TRANSITION,
    s_DEFAULT_TRANSITION_OPTIONS,
    isObject,
    background,
    captureInput,
    id,
    slotSeparate,
    styles,
    zIndex,
    backgroundEl,
    containerEl,
    glassPaneEl,
    transition,
    inTransition,
    outTransition,
    transitionOptions,
    inTransitionOptions,
    outTransitionOptions,
    oldTransition,
    oldTransitionOptions,
    swallow
  });
  $$self.$inject_state = ($$props2) => {
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
    if ("backgroundEl" in $$props2)
      $$invalidate(9, backgroundEl = $$props2.backgroundEl);
    if ("containerEl" in $$props2)
      $$invalidate(10, containerEl = $$props2.containerEl);
    if ("glassPaneEl" in $$props2)
      $$invalidate(11, glassPaneEl = $$props2.glassPaneEl);
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
    if ("oldTransition" in $$props2)
      $$invalidate(16, oldTransition = $$props2.oldTransition);
    if ("oldTransitionOptions" in $$props2)
      $$invalidate(17, oldTransitionOptions = $$props2.oldTransitionOptions);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*slotSeparate*/
    1) {
      $:
        $$invalidate(0, slotSeparate = typeof slotSeparate === "boolean" ? slotSeparate : false);
    }
    if ($$self.$$.dirty & /*oldTransition, transition*/
    81920) {
      $:
        if (oldTransition !== transition) {
          const newTransition = s_DEFAULT_TRANSITION !== transition && typeof transition === "function" ? transition : s_DEFAULT_TRANSITION;
          $$invalidate(1, inTransition = newTransition);
          $$invalidate(2, outTransition = newTransition);
          $$invalidate(16, oldTransition = newTransition);
        }
    }
    if ($$self.$$.dirty & /*oldTransitionOptions, transitionOptions*/
    163840) {
      $:
        if (oldTransitionOptions !== transitionOptions) {
          const newOptions = transitionOptions !== s_DEFAULT_TRANSITION_OPTIONS && isObject(transitionOptions) ? transitionOptions : s_DEFAULT_TRANSITION_OPTIONS;
          $$invalidate(3, inTransitionOptions = newOptions);
          $$invalidate(4, outTransitionOptions = newOptions);
          $$invalidate(17, oldTransitionOptions = newOptions);
        }
    }
    if ($$self.$$.dirty & /*inTransition*/
    2) {
      $:
        if (typeof inTransition !== "function") {
          $$invalidate(1, inTransition = s_DEFAULT_TRANSITION);
        }
    }
    if ($$self.$$.dirty & /*outTransition*/
    4) {
      $:
        if (typeof outTransition !== "function") {
          $$invalidate(2, outTransition = s_DEFAULT_TRANSITION);
        }
    }
    if ($$self.$$.dirty & /*inTransitionOptions*/
    8) {
      $:
        if (typeof inTransitionOptions !== "object") {
          $$invalidate(3, inTransitionOptions = s_DEFAULT_TRANSITION_OPTIONS);
        }
    }
    if ($$self.$$.dirty & /*outTransitionOptions*/
    16) {
      $:
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
var TJSGlassPane = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(
      this,
      options,
      instance3,
      create_fragment3,
      safe_not_equal,
      {
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
      },
      add_css2
    );
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TJSGlassPane",
      options,
      id: create_fragment3.name
    });
  }
  get background() {
    throw new Error("<TJSGlassPane>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set background(value) {
    throw new Error("<TJSGlassPane>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get captureInput() {
    throw new Error("<TJSGlassPane>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set captureInput(value) {
    throw new Error("<TJSGlassPane>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get id() {
    throw new Error("<TJSGlassPane>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set id(value) {
    throw new Error("<TJSGlassPane>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get slotSeparate() {
    throw new Error("<TJSGlassPane>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set slotSeparate(value) {
    throw new Error("<TJSGlassPane>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get styles() {
    throw new Error("<TJSGlassPane>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set styles(value) {
    throw new Error("<TJSGlassPane>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get zIndex() {
    throw new Error("<TJSGlassPane>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set zIndex(value) {
    throw new Error("<TJSGlassPane>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get transition() {
    throw new Error("<TJSGlassPane>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set transition(value) {
    throw new Error("<TJSGlassPane>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get inTransition() {
    throw new Error("<TJSGlassPane>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set inTransition(value) {
    throw new Error("<TJSGlassPane>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get outTransition() {
    throw new Error("<TJSGlassPane>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set outTransition(value) {
    throw new Error("<TJSGlassPane>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get transitionOptions() {
    throw new Error("<TJSGlassPane>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set transitionOptions(value) {
    throw new Error("<TJSGlassPane>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get inTransitionOptions() {
    throw new Error("<TJSGlassPane>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set inTransitionOptions(value) {
    throw new Error("<TJSGlassPane>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get outTransitionOptions() {
    throw new Error("<TJSGlassPane>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set outTransitionOptions(value) {
    throw new Error("<TJSGlassPane>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var TJSGlassPane_default = TJSGlassPane;

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/component/core/application/AppShellContextInternal.js
var _stores;
var AppShellContextInternal = class {
  constructor() {
    /** @type {InternalAppStores} */
    __privateAdd(this, _stores, void 0);
    __privateSet(this, _stores, {
      elementContent: writable(void 0),
      elementRoot: writable(void 0)
    });
    Object.freeze(__privateGet(this, _stores));
    Object.seal(this);
  }
  /**
   * @returns {InternalAppStores} The internal context stores for elementContent / elementRoot
   */
  get stores() {
    return __privateGet(this, _stores);
  }
};
_stores = new WeakMap();

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/component/core/application/TJSHeaderButton.svelte
var file3 = "node_modules\\@typhonjs-fvtt\\runtime\\_dist\\svelte\\component\\core\\application\\TJSHeaderButton.svelte";
function add_css3(target) {
  append_styles(target, "svelte-135ok1t", "a.svelte-135ok1t{padding:var(--tjs-app-header-button-padding, 0 3px)}a.svelte-135ok1t i{padding:var(--tjs-app-header-button-icon-padding, 0)}a.svelte-135ok1t:hover{text-shadow:var(--tjs-app-header-button-text-shadow-hover, var(--tjs-default-text-shadow-focus-hover, inherit))}a.svelte-135ok1t:focus-visible{box-shadow:var(--tjs-app-header-button-box-shadow-focus-visible, var(--tjs-default-box-shadow-focus-visible));outline:var(--tjs-app-header-button-outline-focus-visible, var(--tjs-default-outline-focus-visible, revert));transition:var(--tjs-app-header-button-transition-focus-visible, var(--tjs-default-transition-focus-visible));text-shadow:var(--tjs-app-header-button-text-shadow-focus-visible, var(--tjs-default-text-shadow-focus-hover, inherit))}span.svelte-135ok1t{padding:var(--tjs-app-header-button-label-padding, 0)}span.has-icon.svelte-135ok1t{padding:var(--tjs-app-header-button-label-padding, 0 0 0 3px)}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVEpTSGVhZGVyQnV0dG9uLnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUFtSEcsZ0JBQUEsQ0FDRyxPQUFBLENBQUEsSUFBQSwrQkFBQSxDQUFBLE1BQUEsQ0FDSCxDQUVBLGdCQUFBLENBQUEsQ0FBQSxDQUNHLE9BQUEsQ0FBQSxJQUFBLG9DQUFBLENBQUEsRUFBQSxDQUNILENBRUEsZ0JBQUEsTUFBQSxDQUNHLFdBQUEsQ0FBQSxJQUFBLHlDQUFBLENBQUEsb0RBQUEsQ0FDSCxDQUVBLGdCQUFBLGNBQUEsQ0FDRyxVQUFBLENBQUEsSUFBQSxnREFBQSxDQUFBLDRDQUFBLENBQThHLENBQzlHLE9BQUEsQ0FBQSxJQUFBLDZDQUFBLENBQUEsaURBQUEsQ0FBNkcsQ0FDN0csVUFBQSxDQUFBLElBQUEsZ0RBQUEsQ0FBQSw0Q0FBQSxDQUE4RyxDQUM5RyxXQUFBLENBQUEsSUFBQSxpREFBQSxDQUFBLG9EQUFBLENBQ0gsQ0FFQSxtQkFBQSxDQUNHLE9BQUEsQ0FBQSxJQUFBLHFDQUFBLENBQUEsRUFBQSxDQUNILENBRUEsSUFBQSx3QkFBQSxDQUNHLE9BQUEsQ0FBQSxJQUFBLHFDQUFBLENBQUEsVUFBQSxDQUNIIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIlRKU0hlYWRlckJ1dHRvbi5zdmVsdGUiXX0= */");
}
function create_if_block3(ctx) {
  let span;
  let t;
  const block = {
    c: function create2() {
      span = element("span");
      t = text(
        /*label*/
        ctx[3]
      );
      attr_dev(span, "class", "svelte-135ok1t");
      toggle_class(
        span,
        "has-icon",
        /*icon*/
        ctx[4] !== void 0
      );
      add_location(span, file3, 111, 27, 4114);
    },
    m: function mount(target, anchor) {
      insert_dev(target, span, anchor);
      append_dev(span, t);
    },
    p: function update(ctx2, dirty) {
      if (dirty & /*label*/
      8)
        set_data_dev(
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
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(span);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block3.name,
    type: "if",
    source: "(112:16) {#if label}",
    ctx
  });
  return block;
}
function create_fragment4(ctx) {
  let a;
  let html_tag;
  let html_anchor;
  let a_class_value;
  let applyStyles_action;
  let mounted;
  let dispose;
  let if_block = (
    /*label*/
    ctx[3] && create_if_block3(ctx)
  );
  const block = {
    c: function create2() {
      a = element("a");
      html_tag = new HtmlTag(false);
      html_anchor = empty();
      if (if_block)
        if_block.c();
      html_tag.a = html_anchor;
      attr_dev(a, "class", a_class_value = "header-button " + /*button*/
      ctx[0].class + " svelte-135ok1t");
      attr_dev(
        a,
        "aria-label",
        /*label*/
        ctx[3]
      );
      attr_dev(a, "tabindex", "0");
      attr_dev(a, "role", "button");
      toggle_class(
        a,
        "keep-minimized",
        /*keepMinimized*/
        ctx[2]
      );
      add_location(a, file3, 101, 0, 3761);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, a, anchor);
      html_tag.m(
        /*icon*/
        ctx[4],
        a
      );
      append_dev(a, html_anchor);
      if (if_block)
        if_block.m(a, null);
      if (!mounted) {
        dispose = [
          listen_dev(a, "click", stop_propagation(prevent_default(
            /*onClick*/
            ctx[5]
          )), false, true, true, false),
          listen_dev(a, "contextmenu", stop_propagation(prevent_default(
            /*onContextMenu*/
            ctx[6]
          )), false, true, true, false),
          listen_dev(
            a,
            "keydown",
            /*onKeydown*/
            ctx[7],
            false,
            false,
            false,
            false
          ),
          listen_dev(
            a,
            "keyup",
            /*onKeyup*/
            ctx[8],
            false,
            false,
            false,
            false
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
    p: function update(ctx2, [dirty]) {
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
          if_block = create_if_block3(ctx2);
          if_block.c();
          if_block.m(a, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty & /*button*/
      1 && a_class_value !== (a_class_value = "header-button " + /*button*/
      ctx2[0].class + " svelte-135ok1t")) {
        attr_dev(a, "class", a_class_value);
      }
      if (dirty & /*label*/
      8) {
        attr_dev(
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
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(a);
      if (if_block)
        if_block.d();
      mounted = false;
      run_all(dispose);
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
var s_REGEX_HTML = /^\s*<.*>$/;
function instance4($$self, $$props, $$invalidate) {
  let title;
  let icon;
  let label;
  let keepMinimized;
  let keyCode;
  let styles;
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TJSHeaderButton", slots, []);
  let { button = void 0 } = $$props;
  function onClick(event) {
    const invoke = (button == null ? void 0 : button.onPress) ?? (button == null ? void 0 : button.onclick);
    if (typeof invoke === "function") {
      invoke.call(button, event);
      $$invalidate(0, button);
    }
  }
  function onContextMenu(event) {
    const invoke = button == null ? void 0 : button.onContextMenu;
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
  const writable_props = ["button"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<TJSHeaderButton> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("button" in $$props2)
      $$invalidate(0, button = $$props2.button);
  };
  $$self.$capture_state = () => ({
    applyStyles,
    localize,
    isObject,
    button,
    s_REGEX_HTML,
    onClick,
    onContextMenu,
    onKeydown,
    onKeyup,
    keyCode,
    styles,
    keepMinimized,
    label,
    title,
    icon
  });
  $$self.$inject_state = ($$props2) => {
    if ("button" in $$props2)
      $$invalidate(0, button = $$props2.button);
    if ("keyCode" in $$props2)
      keyCode = $$props2.keyCode;
    if ("styles" in $$props2)
      $$invalidate(1, styles = $$props2.styles);
    if ("keepMinimized" in $$props2)
      $$invalidate(2, keepMinimized = $$props2.keepMinimized);
    if ("label" in $$props2)
      $$invalidate(3, label = $$props2.label);
    if ("title" in $$props2)
      $$invalidate(9, title = $$props2.title);
    if ("icon" in $$props2)
      $$invalidate(4, icon = $$props2.icon);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*button*/
    1) {
      $:
        $$invalidate(9, title = isObject(button) && typeof button.title === "string" ? localize(button.title) : "");
    }
    if ($$self.$$.dirty & /*button, title*/
    513) {
      $:
        $$invalidate(4, icon = isObject(button) && typeof button.icon !== "string" ? void 0 : s_REGEX_HTML.test(button.icon) ? button.icon : `<i class="${button.icon}" title="${title}"></i>`);
    }
    if ($$self.$$.dirty & /*button*/
    1) {
      $:
        $$invalidate(3, label = isObject(button) && typeof button.label === "string" ? localize(button.label) : void 0);
    }
    if ($$self.$$.dirty & /*button*/
    1) {
      $:
        $$invalidate(2, keepMinimized = isObject(button) && typeof button.keepMinimized === "boolean" ? button.keepMinimized : false);
    }
    if ($$self.$$.dirty & /*button*/
    1) {
      $:
        keyCode = isObject(button) && typeof button.keyCode === "string" ? button.keyCode : "Enter";
    }
    if ($$self.$$.dirty & /*button*/
    1) {
      $:
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
var TJSHeaderButton = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance4, create_fragment4, safe_not_equal, { button: 0 }, add_css3);
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TJSHeaderButton",
      options,
      id: create_fragment4.name
    });
  }
  get button() {
    return this.$$.ctx[0];
  }
  set button(button) {
    this.$$set({ button });
    flush();
  }
};
var TJSHeaderButton_default = TJSHeaderButton;

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/component/core/application/TJSApplicationHeader.svelte
var { Object: Object_1 } = globals;
var file4 = "node_modules\\@typhonjs-fvtt\\runtime\\_dist\\svelte\\component\\core\\application\\TJSApplicationHeader.svelte";
function add_css4(target) {
  append_styles(target, "svelte-19grh1t", ".tjs-window-header-spacer.svelte-19grh1t.svelte-19grh1t{flex:0;margin-left:calc(-1 * var(--tjs-app-header-gap, 5px));margin-right:auto}.window-header.svelte-19grh1t.svelte-19grh1t{flex:var(--tjs-app-header-flex, 0 0 30px);gap:var(--tjs-app-header-gap, 5px);padding:var(--tjs-app-header-padding, 0 4px)}.window-header.svelte-19grh1t .tjs-app-icon.svelte-19grh1t{align-self:center;border-radius:var(--tjs-app-header-icon-border-radius, 4px);flex:0 0 var(--tjs-app-header-icon-width, 24px);height:var(--tjs-app-header-icon-height, 24px)}.window-title.svelte-19grh1t.svelte-19grh1t{gap:var(--tjs-app-header-gap, 5px);max-width:fit-content;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVEpTQXBwbGljYXRpb25IZWFkZXIuc3ZlbHRlIiwibWFwcGluZ3MiOiJBQW1LRyx1REFBQSxDQUNHLElBQUEsQ0FBQSxDQUFPLENBQ1AsV0FBQSxDQUFBLEtBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLG9CQUFBLENBQUEsSUFBQSxDQUFBLENBQXNELENBQ3RELFlBQUEsQ0FBQSxJQUNILENBRUEsNENBQUEsQ0FDRyxJQUFBLENBQUEsSUFBQSxxQkFBQSxDQUFBLFNBQUEsQ0FBMEMsQ0FDMUMsR0FBQSxDQUFBLElBQUEsb0JBQUEsQ0FBQSxJQUFBLENBQW1DLENBQ25DLE9BQUEsQ0FBQSxJQUFBLHdCQUFBLENBQUEsTUFBQSxDQUNILENBRUEsNkJBQUEsQ0FBQSw0QkFBQSxDQUNHLFVBQUEsQ0FBQSxNQUFrQixDQUNsQixhQUFBLENBQUEsSUFBQSxtQ0FBQSxDQUFBLElBQUEsQ0FBNEQsQ0FDNUQsSUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSwyQkFBQSxDQUFBLEtBQUEsQ0FBZ0QsQ0FDaEQsTUFBQSxDQUFBLElBQUEsNEJBQUEsQ0FBQSxLQUFBLENBQ0gsQ0FFQSwyQ0FBQSxDQUNHLEdBQUEsQ0FBQSxJQUFBLG9CQUFBLENBQUEsSUFBQSxDQUFtQyxDQUNuQyxTQUFBLENBQUEsV0FBc0IsQ0FDdEIsUUFBQSxDQUFBLE1BQWdCLENBQ2hCLGFBQUEsQ0FBQSxRQUF1QixDQUN2QixXQUFBLENBQUEsTUFDSCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJUSlNBcHBsaWNhdGlvbkhlYWRlci5zdmVsdGUiXX0= */");
}
function get_each_context2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[31] = list[i];
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[31] = list[i];
  return child_ctx;
}
function create_if_block4(ctx) {
  let img;
  let img_src_value;
  const block = {
    c: function create2() {
      img = element("img");
      attr_dev(img, "class", "tjs-app-icon keep-minimized svelte-19grh1t");
      if (!src_url_equal(img.src, img_src_value = /*$storeHeaderIcon*/
      ctx[6]))
        attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", "icon");
      add_location(img, file4, 143, 9, 5320);
    },
    m: function mount(target, anchor) {
      insert_dev(target, img, anchor);
    },
    p: function update(ctx2, dirty) {
      if (dirty[0] & /*$storeHeaderIcon*/
      64 && !src_url_equal(img.src, img_src_value = /*$storeHeaderIcon*/
      ctx2[6])) {
        attr_dev(img, "src", img_src_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(img);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block4.name,
    type: "if",
    source: "(143:6) {#if typeof $storeHeaderIcon === 'string'}",
    ctx
  });
  return block;
}
function create_each_block_1(ctx) {
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
    return {
      props: switch_instance_props,
      $$inline: true
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
  }
  const block = {
    c: function create2() {
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
    id: create_each_block_1.name,
    type: "each",
    source: "(149:6) {#each buttonsLeft as button}",
    ctx
  });
  return block;
}
function create_each_block2(ctx) {
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
    return {
      props: switch_instance_props,
      $$inline: true
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
  }
  const block = {
    c: function create2() {
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
    id: create_each_block2.name,
    type: "each",
    source: "(153:6) {#each buttonsRight as button}",
    ctx
  });
  return block;
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
  ctx[6] === "string" && create_if_block4(ctx);
  let each_value_1 = (
    /*buttonsLeft*/
    ctx[1]
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
    /*buttonsRight*/
    ctx[2]
  );
  validate_each_argument(each_value);
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block2(get_each_context2(ctx, each_value, i));
  }
  const out_1 = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  const block = {
    c: function create2() {
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
      attr_dev(h4, "class", "window-title svelte-19grh1t");
      set_style(
        h4,
        "display",
        /*displayHeaderTitle*/
        ctx[4]
      );
      add_location(h4, file4, 145, 6, 5412);
      attr_dev(span, "class", "tjs-window-header-spacer keep-minimized svelte-19grh1t");
      add_location(span, file4, 151, 6, 5640);
      attr_dev(header, "class", "window-header flexrow svelte-19grh1t");
      add_location(header, file4, 138, 3, 5095);
    },
    m: function mount(target, anchor) {
      insert_dev(target, header, anchor);
      if (if_block)
        if_block.m(header, null);
      append_dev(header, t0);
      append_dev(header, h4);
      append_dev(h4, t1);
      append_dev(header, t2);
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        if (each_blocks_1[i]) {
          each_blocks_1[i].m(header, null);
        }
      }
      append_dev(header, t3);
      append_dev(header, span);
      append_dev(header, t4);
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
          listen_dev(
            header,
            "pointerdown",
            /*onPointerdown*/
            ctx[19],
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
      if (typeof /*$storeHeaderIcon*/
      ctx2[6] === "string") {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block4(ctx2);
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
        set_data_dev(t1, t1_value);
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
        validate_each_argument(each_value);
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context2(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block2(child_ctx);
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
    i: function intro(local) {
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
    o: function outro(local) {
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
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(header);
      if (if_block)
        if_block.d();
      destroy_each(each_blocks_1, detaching);
      destroy_each(each_blocks, detaching);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_key_block.name,
    type: "key",
    source: "(138:0) {#key draggable}",
    ctx
  });
  return block;
}
function create_fragment5(ctx) {
  let previous_key = (
    /*draggable*/
    ctx[0]
  );
  let key_block_anchor;
  let current;
  let key_block = create_key_block(ctx);
  const block = {
    c: function create2() {
      key_block.c();
      key_block_anchor = empty();
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      key_block.m(target, anchor);
      insert_dev(target, key_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
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
    i: function intro(local) {
      if (current)
        return;
      transition_in(key_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(key_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(key_block_anchor);
      key_block.d(detaching);
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
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TJSApplicationHeader", slots, []);
  let { draggable: draggable2 = void 0 } = $$props;
  let { draggableOptions = void 0 } = $$props;
  const { application } = getContext("#external");
  const { focusAuto, focusKeep } = application.reactive.storeAppOptions;
  validate_store(focusAuto, "focusAuto");
  component_subscribe($$self, focusAuto, (value) => $$invalidate(26, $focusAuto = value));
  validate_store(focusKeep, "focusKeep");
  component_subscribe($$self, focusKeep, (value) => $$invalidate(25, $focusKeep = value));
  const { elementRoot } = getContext("#internal").stores;
  validate_store(elementRoot, "elementRoot");
  component_subscribe($$self, elementRoot, (value) => $$invalidate(27, $elementRoot = value));
  const storeTitle = application.reactive.storeAppOptions.title;
  validate_store(storeTitle, "storeTitle");
  component_subscribe($$self, storeTitle, (value) => $$invalidate(7, $storeTitle = value));
  const storeDraggable = application.reactive.storeAppOptions.draggable;
  validate_store(storeDraggable, "storeDraggable");
  component_subscribe($$self, storeDraggable, (value) => $$invalidate(24, $storeDraggable = value));
  const storeDragging = application.reactive.storeUIState.dragging;
  const storeHeaderButtons = application.reactive.storeUIState.headerButtons;
  validate_store(storeHeaderButtons, "storeHeaderButtons");
  component_subscribe($$self, storeHeaderButtons, (value) => $$invalidate(21, $storeHeaderButtons = value));
  const storeHeaderIcon = application.reactive.storeAppOptions.headerIcon;
  validate_store(storeHeaderIcon, "storeHeaderIcon");
  component_subscribe($$self, storeHeaderIcon, (value) => $$invalidate(6, $storeHeaderIcon = value));
  const storeHeaderNoTitleMinimized = application.reactive.storeAppOptions.headerNoTitleMinimized;
  validate_store(storeHeaderNoTitleMinimized, "storeHeaderNoTitleMinimized");
  component_subscribe($$self, storeHeaderNoTitleMinimized, (value) => $$invalidate(23, $storeHeaderNoTitleMinimized = value));
  const storeMinimizable = application.reactive.storeAppOptions.minimizable;
  validate_store(storeMinimizable, "storeMinimizable");
  component_subscribe($$self, storeMinimizable, (value) => $$invalidate(5, $storeMinimizable = value));
  const storeMinimized = application.reactive.storeUIState.minimized;
  validate_store(storeMinimized, "storeMinimized");
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
    if ($focusAuto && rootEl instanceof HTMLElement && (rootEl == null ? void 0 : rootEl.isConnected)) {
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
  const writable_props = ["draggable", "draggableOptions"];
  Object_1.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<TJSApplicationHeader> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("draggable" in $$props2)
      $$invalidate(0, draggable2 = $$props2.draggable);
    if ("draggableOptions" in $$props2)
      $$invalidate(20, draggableOptions = $$props2.draggableOptions);
  };
  $$self.$capture_state = () => ({
    getContext,
    cubicOut,
    dragDefault: draggable,
    localize,
    isObject,
    isSvelteComponent,
    TJSHeaderButton: TJSHeaderButton_default,
    draggable: draggable2,
    draggableOptions,
    application,
    focusAuto,
    focusKeep,
    elementRoot,
    storeTitle,
    storeDraggable,
    storeDragging,
    storeHeaderButtons,
    storeHeaderIcon,
    storeHeaderNoTitleMinimized,
    storeMinimizable,
    storeMinimized,
    s_DRAG_TARGET_CLASSLIST,
    dragOptions,
    displayHeaderTitle,
    buttonsLeft,
    buttonsRight,
    minimizable,
    onPointerdown,
    $focusKeep,
    $focusAuto,
    $elementRoot,
    $storeHeaderButtons,
    $storeMinimized,
    $storeHeaderNoTitleMinimized,
    $storeDraggable,
    $storeMinimizable,
    $storeHeaderIcon,
    $storeTitle
  });
  $$self.$inject_state = ($$props2) => {
    if ("draggable" in $$props2)
      $$invalidate(0, draggable2 = $$props2.draggable);
    if ("draggableOptions" in $$props2)
      $$invalidate(20, draggableOptions = $$props2.draggableOptions);
    if ("dragOptions" in $$props2)
      $$invalidate(3, dragOptions = $$props2.dragOptions);
    if ("displayHeaderTitle" in $$props2)
      $$invalidate(4, displayHeaderTitle = $$props2.displayHeaderTitle);
    if ("buttonsLeft" in $$props2)
      $$invalidate(1, buttonsLeft = $$props2.buttonsLeft);
    if ("buttonsRight" in $$props2)
      $$invalidate(2, buttonsRight = $$props2.buttonsRight);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*draggable*/
    1) {
      $:
        $$invalidate(0, draggable2 = typeof draggable2 === "function" ? draggable2 : draggable);
    }
    if ($$self.$$.dirty[0] & /*draggableOptions, $storeDraggable*/
    17825792) {
      $:
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
      $:
        $$invalidate(4, displayHeaderTitle = $storeHeaderNoTitleMinimized && $storeMinimized ? "none" : null);
    }
    if ($$self.$$.dirty[0] & /*$storeHeaderButtons, buttonsLeft, buttonsRight*/
    2097158) {
      $: {
        $$invalidate(1, buttonsLeft = []);
        $$invalidate(2, buttonsRight = []);
        for (const button of $storeHeaderButtons) {
          const buttonsList = typeof (button == null ? void 0 : button.alignLeft) === "boolean" && (button == null ? void 0 : button.alignLeft) ? buttonsLeft : buttonsRight;
          buttonsList.push(isSvelteComponent(button) ? { class: button, props: {} } : {
            class: TJSHeaderButton_default,
            props: { button }
          });
        }
      }
    }
  };
  return [
    draggable2,
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
var TJSApplicationHeader = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance5, create_fragment5, safe_not_equal, { draggable: 0, draggableOptions: 20 }, add_css4, [-1, -1]);
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TJSApplicationHeader",
      options,
      id: create_fragment5.name
    });
  }
  get draggable() {
    throw new Error("<TJSApplicationHeader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set draggable(value) {
    throw new Error("<TJSApplicationHeader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get draggableOptions() {
    throw new Error("<TJSApplicationHeader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set draggableOptions(value) {
    throw new Error("<TJSApplicationHeader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var TJSApplicationHeader_default = TJSApplicationHeader;

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/component/core/application/TJSFocusWrap.svelte
var file5 = "node_modules\\@typhonjs-fvtt\\runtime\\_dist\\svelte\\component\\core\\application\\TJSFocusWrap.svelte";
function add_css5(target) {
  append_styles(target, "svelte-udwy0t", "div.svelte-udwy0t{width:0;height:0;flex:0}div.svelte-udwy0t:focus{outline:none}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVEpTRm9jdXNXcmFwLnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUF1Q0ksaUJBQUEsQ0FDSSxLQUFBLENBQUEsQ0FBUSxDQUNSLE1BQUEsQ0FBQSxDQUFTLENBQ1QsSUFBQSxDQUFBLENBQ0osQ0FFQSxpQkFBQSxNQUFBLENBQ0ksT0FBQSxDQUFBLElBQ0oiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiVEpTRm9jdXNXcmFwLnN2ZWx0ZSJdfQ== */");
}
function create_fragment6(ctx) {
  let div2;
  let mounted;
  let dispose;
  const block = {
    c: function create2() {
      div2 = element("div");
      attr_dev(div2, "class", "tjs-focus-wrap svelte-udwy0t");
      attr_dev(div2, "tabindex", "0");
      add_location(div2, file5, 36, 0, 887);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, div2, anchor);
      ctx[4](div2);
      if (!mounted) {
        dispose = listen_dev(
          div2,
          "focus",
          /*onFocus*/
          ctx[1],
          false,
          false,
          false,
          false
        );
        mounted = true;
      }
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div2);
      ctx[4](null);
      mounted = false;
      dispose();
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
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TJSFocusWrap", slots, []);
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
  const writable_props = ["elementRoot", "enabled"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<TJSFocusWrap> was created with unknown prop '${key}'`);
  });
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
  $$self.$capture_state = () => ({
    A11yHelper,
    elementRoot,
    enabled,
    ignoreElements,
    wrapEl,
    onFocus
  });
  $$self.$inject_state = ($$props2) => {
    if ("elementRoot" in $$props2)
      $$invalidate(2, elementRoot = $$props2.elementRoot);
    if ("enabled" in $$props2)
      $$invalidate(3, enabled = $$props2.enabled);
    if ("ignoreElements" in $$props2)
      ignoreElements = $$props2.ignoreElements;
    if ("wrapEl" in $$props2)
      $$invalidate(0, wrapEl = $$props2.wrapEl);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*wrapEl*/
    1) {
      $:
        if (wrapEl) {
          ignoreElements = /* @__PURE__ */ new Set([wrapEl]);
        }
    }
  };
  return [wrapEl, onFocus, elementRoot, enabled, div_binding];
}
var TJSFocusWrap = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance6, create_fragment6, safe_not_equal, { elementRoot: 2, enabled: 3 }, add_css5);
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TJSFocusWrap",
      options,
      id: create_fragment6.name
    });
  }
  get elementRoot() {
    throw new Error("<TJSFocusWrap>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set elementRoot(value) {
    throw new Error("<TJSFocusWrap>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get enabled() {
    throw new Error("<TJSFocusWrap>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set enabled(value) {
    throw new Error("<TJSFocusWrap>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var TJSFocusWrap_default = TJSFocusWrap;

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/component/core/application/ResizableHandle.svelte
var file6 = "node_modules\\@typhonjs-fvtt\\runtime\\_dist\\svelte\\component\\core\\application\\ResizableHandle.svelte";
function create_fragment7(ctx) {
  let div2;
  let i;
  let resizable_action;
  let mounted;
  let dispose;
  const block = {
    c: function create2() {
      div2 = element("div");
      i = element("i");
      attr_dev(i, "class", "fas fa-arrows-alt-h");
      add_location(i, file6, 190, 3, 5660);
      attr_dev(div2, "class", "window-resizable-handle");
      add_location(div2, file6, 187, 0, 5526);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, div2, anchor);
      append_dev(div2, i);
      ctx[10](div2);
      if (!mounted) {
        dispose = action_destroyer(resizable_action = /*resizable*/
        ctx[6].call(null, div2, {
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
    p: function update(ctx2, [dirty]) {
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
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div2);
      ctx[10](null);
      mounted = false;
      dispose();
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
  let $storeElementRoot;
  let $storeMinimized;
  let $storeResizable;
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("ResizableHandle", slots, []);
  let { isResizable = false } = $$props;
  const application = getContext("#external").application;
  const storeElementRoot = getContext("storeElementRoot");
  validate_store(storeElementRoot, "storeElementRoot");
  component_subscribe($$self, storeElementRoot, (value) => $$invalidate(8, $storeElementRoot = value));
  const storeResizable = application.reactive.storeAppOptions.resizable;
  validate_store(storeResizable, "storeResizable");
  component_subscribe($$self, storeResizable, (value) => $$invalidate(1, $storeResizable = value));
  const storeMinimized = application.reactive.storeUIState.minimized;
  validate_store(storeMinimized, "storeMinimized");
  component_subscribe($$self, storeMinimized, (value) => $$invalidate(9, $storeMinimized = value));
  const storeResizing = application.reactive.storeUIState.resizing;
  let elementResize;
  function resizable(node, { active = true, storeResizing: storeResizing2 = void 0 } = {}) {
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
      if (typeof (storeResizing2 == null ? void 0 : storeResizing2.set) === "function") {
        storeResizing2.set(false);
      }
      node.removeEventListener(...handlers.resizeDown);
      node.removeEventListener(...handlers.resizeMove);
      node.removeEventListener(...handlers.resizeUp);
      node.style.display = "none";
      $$invalidate(7, isResizable = false);
    }
    if (active) {
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
      if (!resizing && typeof (storeResizing2 == null ? void 0 : storeResizing2.set) === "function") {
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
      if (typeof (storeResizing2 == null ? void 0 : storeResizing2.set) === "function") {
        storeResizing2.set(false);
      }
      event.preventDefault();
      node.removeEventListener(...handlers.resizeMove);
      node.removeEventListener(...handlers.resizeUp);
      application._onResize(event);
    }
    return {
      update: ({ active: active2 }) => {
        if (active2) {
          activateListeners();
        } else {
          removeListeners();
        }
      },
      destroy: () => removeListeners()
    };
  }
  const writable_props = ["isResizable"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<ResizableHandle> was created with unknown prop '${key}'`);
  });
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
  $$self.$capture_state = () => ({
    getContext,
    isResizable,
    application,
    storeElementRoot,
    storeResizable,
    storeMinimized,
    storeResizing,
    elementResize,
    resizable,
    $storeElementRoot,
    $storeMinimized,
    $storeResizable
  });
  $$self.$inject_state = ($$props2) => {
    if ("isResizable" in $$props2)
      $$invalidate(7, isResizable = $$props2.isResizable);
    if ("elementResize" in $$props2)
      $$invalidate(0, elementResize = $$props2.elementResize);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*elementResize, isResizable, $storeMinimized, $storeElementRoot*/
    897) {
      $:
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
var ResizableHandle = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance7, create_fragment7, safe_not_equal, { isResizable: 7 });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "ResizableHandle",
      options,
      id: create_fragment7.name
    });
  }
  get isResizable() {
    throw new Error("<ResizableHandle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set isResizable(value) {
    throw new Error("<ResizableHandle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var ResizableHandle_default = ResizableHandle;

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/component/core/application/ApplicationShell.svelte
var file7 = "node_modules\\@typhonjs-fvtt\\runtime\\_dist\\svelte\\component\\core\\application\\ApplicationShell.svelte";
function add_css6(target) {
  append_styles(target, "svelte-ye50p3", ".window-app.svelte-ye50p3{overflow:var(--tjs-app-overflow, hidden)}.window-app.svelte-ye50p3:focus-visible{outline:var(--tjs-app-outline-focus-visible, var(--tjs-default-a11y-outline-focus-visible, 2px solid transparent))}.window-content.svelte-ye50p3:focus-visible{outline:var(--tjs-app-content-outline-focus-visible, var(--tjs-default-a11y-outline-focus-visible, 2px solid transparent))}.window-app.svelte-ye50p3 .window-header a{flex:none;margin:0}.window-app.svelte-ye50p3 .window-header i[class^=fa]{margin:0\n   }\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwbGljYXRpb25TaGVsbC5zdmVsdGUiLCJtYXBwaW5ncyI6IkFBK1lHLHlCQUFBLENBQ0csUUFBQSxDQUFBLElBQUEsa0JBQUEsQ0FBQSxPQUFBLENBQ0gsQ0FFQSx5QkFBQSxjQUFBLENBQ0csT0FBQSxDQUFBLElBQUEsK0JBQUEsQ0FBQSxxRUFBQSxDQUNILENBRUEsNkJBQUEsY0FBQSxDQUNHLE9BQUEsQ0FBQSxJQUFBLHVDQUFBLENBQUEscUVBQUEsQ0FDSCxDQUdBLHlCQUFBLENBQUEsZ0JBQUEsQ0FDRyxJQUFBLENBQUEsSUFBVSxDQUNWLE1BQUEsQ0FBQSxDQUNILENBR0EseUJBQUEsQ0FBQSwyQkFBQSxDQUNHLE1BQUEsQ0FBQSxDQUFBO0dBQ0giLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiQXBwbGljYXRpb25TaGVsbC5zdmVsdGUiXX0= */");
}
function create_else_block2(ctx) {
  let div2;
  let tjsapplicationheader;
  let t0;
  let section;
  let applyStyles_action;
  let contentResizeObserver_action;
  let t1;
  let resizablehandle;
  let t2;
  let tjsfocuswrap;
  let div_id_value;
  let div_class_value;
  let div_data_appid_value;
  let applyStyles_action_1;
  let appResizeObserver_action;
  let current;
  let mounted;
  let dispose;
  tjsapplicationheader = new TJSApplicationHeader_default({
    props: {
      draggable: (
        /*draggable*/
        ctx[6]
      ),
      draggableOptions: (
        /*draggableOptions*/
        ctx[7]
      )
    },
    $$inline: true
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
  resizablehandle = new ResizableHandle_default({ $$inline: true });
  tjsfocuswrap = new TJSFocusWrap_default({
    props: {
      elementRoot: (
        /*elementRoot*/
        ctx[1]
      ),
      enabled: (
        /*focusWrapEnabled*/
        ctx[11]
      )
    },
    $$inline: true
  });
  const block = {
    c: function create2() {
      div2 = element("div");
      create_component(tjsapplicationheader.$$.fragment);
      t0 = space();
      section = element("section");
      if (default_slot)
        default_slot.c();
      t1 = space();
      create_component(resizablehandle.$$.fragment);
      t2 = space();
      create_component(tjsfocuswrap.$$.fragment);
      attr_dev(section, "class", "window-content svelte-ye50p3");
      attr_dev(section, "tabindex", "-1");
      add_location(section, file7, 384, 6, 15139);
      attr_dev(div2, "id", div_id_value = /*application*/
      ctx[10].id);
      attr_dev(div2, "class", div_class_value = "app window-app " + /*application*/
      ctx[10].options.classes.join(" ") + " svelte-ye50p3");
      attr_dev(div2, "data-appid", div_data_appid_value = /*application*/
      ctx[10].appId);
      attr_dev(div2, "tabindex", "-1");
      add_location(div2, file7, 373, 3, 14647);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div2, anchor);
      mount_component(tjsapplicationheader, div2, null);
      append_dev(div2, t0);
      append_dev(div2, section);
      if (default_slot) {
        default_slot.m(section, null);
      }
      ctx[39](section);
      append_dev(div2, t1);
      mount_component(resizablehandle, div2, null);
      append_dev(div2, t2);
      mount_component(tjsfocuswrap, div2, null);
      ctx[40](div2);
      current = true;
      if (!mounted) {
        dispose = [
          listen_dev(
            section,
            "pointerdown",
            /*onPointerdownContent*/
            ctx[21],
            false,
            false,
            false,
            false
          ),
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            section,
            /*stylesContent*/
            ctx[9]
          )),
          action_destroyer(contentResizeObserver_action = /*contentResizeObserver*/
          ctx[13].call(
            null,
            section,
            /*resizeObservedContent*/
            ctx[22]
          )),
          listen_dev(div2, "close:popup", stop_propagation(prevent_default(
            /*onClosePopup*/
            ctx[18]
          )), false, true, true, false),
          listen_dev(
            div2,
            "keydown",
            /*onKeydown*/
            ctx[19],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            div2,
            "pointerdown",
            /*onPointerdownApp*/
            ctx[20],
            false,
            false,
            false,
            false
          ),
          action_destroyer(applyStyles_action_1 = applyStyles.call(
            null,
            div2,
            /*stylesApp*/
            ctx[8]
          )),
          action_destroyer(appResizeObserver_action = /*appResizeObserver*/
          ctx[12].call(
            null,
            div2,
            /*resizeObservedApp*/
            ctx[23]
          ))
        ];
        mounted = true;
      }
    },
    p: function update(ctx2, dirty) {
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
        attr_dev(div2, "id", div_id_value);
      }
      if (!current || dirty[0] & /*application*/
      1024 && div_class_value !== (div_class_value = "app window-app " + /*application*/
      ctx2[10].options.classes.join(" ") + " svelte-ye50p3")) {
        attr_dev(div2, "class", div_class_value);
      }
      if (!current || dirty[0] & /*application*/
      1024 && div_data_appid_value !== (div_data_appid_value = /*application*/
      ctx2[10].appId)) {
        attr_dev(div2, "data-appid", div_data_appid_value);
      }
      if (applyStyles_action_1 && is_function(applyStyles_action_1.update) && dirty[0] & /*stylesApp*/
      256)
        applyStyles_action_1.update.call(
          null,
          /*stylesApp*/
          ctx2[8]
        );
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(tjsapplicationheader.$$.fragment, local);
      transition_in(default_slot, local);
      transition_in(resizablehandle.$$.fragment, local);
      transition_in(tjsfocuswrap.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tjsapplicationheader.$$.fragment, local);
      transition_out(default_slot, local);
      transition_out(resizablehandle.$$.fragment, local);
      transition_out(tjsfocuswrap.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div2);
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
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_else_block2.name,
    type: "else",
    source: "(373:0) {:else}",
    ctx
  });
  return block;
}
function create_if_block5(ctx) {
  let div2;
  let tjsapplicationheader;
  let t0;
  let section;
  let applyStyles_action;
  let contentResizeObserver_action;
  let t1;
  let resizablehandle;
  let t2;
  let tjsfocuswrap;
  let div_id_value;
  let div_class_value;
  let div_data_appid_value;
  let applyStyles_action_1;
  let appResizeObserver_action;
  let div_intro;
  let div_outro;
  let current;
  let mounted;
  let dispose;
  tjsapplicationheader = new TJSApplicationHeader_default({
    props: {
      draggable: (
        /*draggable*/
        ctx[6]
      ),
      draggableOptions: (
        /*draggableOptions*/
        ctx[7]
      )
    },
    $$inline: true
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
  resizablehandle = new ResizableHandle_default({ $$inline: true });
  tjsfocuswrap = new TJSFocusWrap_default({
    props: { elementRoot: (
      /*elementRoot*/
      ctx[1]
    ) },
    $$inline: true
  });
  const block = {
    c: function create2() {
      div2 = element("div");
      create_component(tjsapplicationheader.$$.fragment);
      t0 = space();
      section = element("section");
      if (default_slot)
        default_slot.c();
      t1 = space();
      create_component(resizablehandle.$$.fragment);
      t2 = space();
      create_component(tjsfocuswrap.$$.fragment);
      attr_dev(section, "class", "window-content svelte-ye50p3");
      attr_dev(section, "tabindex", "-1");
      add_location(section, file7, 361, 6, 14263);
      attr_dev(div2, "id", div_id_value = /*application*/
      ctx[10].id);
      attr_dev(div2, "class", div_class_value = "app window-app " + /*application*/
      ctx[10].options.classes.join(" ") + " svelte-ye50p3");
      attr_dev(div2, "data-appid", div_data_appid_value = /*application*/
      ctx[10].appId);
      attr_dev(div2, "tabindex", "-1");
      add_location(div2, file7, 348, 3, 13676);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div2, anchor);
      mount_component(tjsapplicationheader, div2, null);
      append_dev(div2, t0);
      append_dev(div2, section);
      if (default_slot) {
        default_slot.m(section, null);
      }
      ctx[37](section);
      append_dev(div2, t1);
      mount_component(resizablehandle, div2, null);
      append_dev(div2, t2);
      mount_component(tjsfocuswrap, div2, null);
      ctx[38](div2);
      current = true;
      if (!mounted) {
        dispose = [
          listen_dev(
            section,
            "pointerdown",
            /*onPointerdownContent*/
            ctx[21],
            false,
            false,
            false,
            false
          ),
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            section,
            /*stylesContent*/
            ctx[9]
          )),
          action_destroyer(contentResizeObserver_action = /*contentResizeObserver*/
          ctx[13].call(
            null,
            section,
            /*resizeObservedContent*/
            ctx[22]
          )),
          listen_dev(div2, "close:popup", stop_propagation(prevent_default(
            /*onClosePopup*/
            ctx[18]
          )), false, true, true, false),
          listen_dev(
            div2,
            "keydown",
            /*onKeydown*/
            ctx[19],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            div2,
            "pointerdown",
            /*onPointerdownApp*/
            ctx[20],
            false,
            false,
            false,
            false
          ),
          action_destroyer(applyStyles_action_1 = applyStyles.call(
            null,
            div2,
            /*stylesApp*/
            ctx[8]
          )),
          action_destroyer(appResizeObserver_action = /*appResizeObserver*/
          ctx[12].call(
            null,
            div2,
            /*resizeObservedApp*/
            ctx[23]
          ))
        ];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
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
        attr_dev(div2, "id", div_id_value);
      }
      if (!current || dirty[0] & /*application*/
      1024 && div_class_value !== (div_class_value = "app window-app " + /*application*/
      ctx[10].options.classes.join(" ") + " svelte-ye50p3")) {
        attr_dev(div2, "class", div_class_value);
      }
      if (!current || dirty[0] & /*application*/
      1024 && div_data_appid_value !== (div_data_appid_value = /*application*/
      ctx[10].appId)) {
        attr_dev(div2, "data-appid", div_data_appid_value);
      }
      if (applyStyles_action_1 && is_function(applyStyles_action_1.update) && dirty[0] & /*stylesApp*/
      256)
        applyStyles_action_1.update.call(
          null,
          /*stylesApp*/
          ctx[8]
        );
    },
    i: function intro(local) {
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
          div2,
          /*inTransition*/
          ctx[2],
          /*inTransitionOptions*/
          ctx[4]
        );
        div_intro.start();
      });
      current = true;
    },
    o: function outro(local) {
      transition_out(tjsapplicationheader.$$.fragment, local);
      transition_out(default_slot, local);
      transition_out(resizablehandle.$$.fragment, local);
      transition_out(tjsfocuswrap.$$.fragment, local);
      if (div_intro)
        div_intro.invalidate();
      div_outro = create_out_transition(
        div2,
        /*outTransition*/
        ctx[3],
        /*outTransitionOptions*/
        ctx[5]
      );
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div2);
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
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block5.name,
    type: "if",
    source: "(348:0) {#if inTransition || outTransition}",
    ctx
  });
  return block;
}
function create_fragment8(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block5, create_else_block2];
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
  current_block_type_index = select_block_type(ctx, [-1, -1]);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  const block = {
    c: function create2() {
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
    id: create_fragment8.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance8($$self, $$props, $$invalidate) {
  let $focusKeep;
  let $focusAuto;
  let $minimized;
  let $focusTrap;
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("ApplicationShell", slots, ["default"]);
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
  validate_store(focusAuto, "focusAuto");
  component_subscribe($$self, focusAuto, (value) => $$invalidate(32, $focusAuto = value));
  validate_store(focusKeep, "focusKeep");
  component_subscribe($$self, focusKeep, (value) => $$invalidate(41, $focusKeep = value));
  validate_store(focusTrap, "focusTrap");
  component_subscribe($$self, focusTrap, (value) => $$invalidate(34, $focusTrap = value));
  const { minimized } = application.reactive.storeUIState;
  validate_store(minimized, "minimized");
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
    var _a;
    if (!$focusAuto) {
      return;
    }
    const targetEl = (_a = event == null ? void 0 : event.detail) == null ? void 0 : _a.target;
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
    var _a, _b;
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
    if (typeof ((_a = application == null ? void 0 : application.options) == null ? void 0 : _a.popOut) === "boolean" && application.options.popOut && application !== ((_b = globalThis.ui) == null ? void 0 : _b.activeWindow)) {
      application.bringToTop.call(application);
    }
  }
  function onPointerdownApp() {
    var _a, _b;
    if (typeof ((_a = application == null ? void 0 : application.options) == null ? void 0 : _a.popOut) === "boolean" && application.options.popOut && application !== ((_b = globalThis.ui) == null ? void 0 : _b.activeWindow)) {
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
  const writable_props = [
    "elementContent",
    "elementRoot",
    "draggable",
    "draggableOptions",
    "stylesApp",
    "stylesContent",
    "appOffsetHeight",
    "appOffsetWidth",
    "contentOffsetHeight",
    "contentOffsetWidth",
    "transition",
    "inTransition",
    "outTransition",
    "transitionOptions",
    "inTransitionOptions",
    "outTransitionOptions"
  ];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<ApplicationShell> was created with unknown prop '${key}'`);
  });
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
  $$self.$capture_state = () => ({
    getContext,
    onMount,
    setContext,
    applyStyles,
    resizeObserver,
    A11yHelper,
    isObject,
    AppShellContextInternal,
    TJSApplicationHeader: TJSApplicationHeader_default,
    TJSFocusWrap: TJSFocusWrap_default,
    ResizableHandle: ResizableHandle_default,
    s_DEFAULT_TRANSITION_OPTIONS,
    elementContent,
    elementRoot,
    draggable: draggable2,
    draggableOptions,
    stylesApp,
    stylesContent,
    appOffsetHeight,
    appOffsetWidth,
    appResizeObserver,
    contentOffsetHeight,
    contentOffsetWidth,
    contentResizeObserver,
    internal,
    s_IGNORE_CLASSES,
    application,
    focusAuto,
    focusKeep,
    focusTrap,
    minimized,
    focusWrapEnabled,
    transition,
    inTransition,
    outTransition,
    transitionOptions,
    inTransitionOptions,
    outTransitionOptions,
    oldTransition,
    oldTransitionOptions,
    onClosePopup,
    onKeydown,
    onPointerdownApp,
    onPointerdownContent,
    resizeObservedContent,
    resizeObservedApp,
    $focusKeep,
    $focusAuto,
    $minimized,
    $focusTrap
  });
  $$self.$inject_state = ($$props2) => {
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
    if ("focusWrapEnabled" in $$props2)
      $$invalidate(11, focusWrapEnabled = $$props2.focusWrapEnabled);
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
    if ("oldTransition" in $$props2)
      $$invalidate(30, oldTransition = $$props2.oldTransition);
    if ("oldTransitionOptions" in $$props2)
      $$invalidate(31, oldTransitionOptions = $$props2.oldTransitionOptions);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    var _a;
    if ($$self.$$.dirty[0] & /*elementContent*/
    1) {
      $:
        if (elementContent !== void 0 && elementContent !== null) {
          getContext("#internal").stores.elementContent.set(elementContent);
        }
    }
    if ($$self.$$.dirty[0] & /*elementRoot*/
    2) {
      $:
        if (elementRoot !== void 0 && elementRoot !== null) {
          getContext("#internal").stores.elementRoot.set(elementRoot);
        }
    }
    if ($$self.$$.dirty[1] & /*$focusAuto, $focusTrap, $minimized*/
    14) {
      $:
        $$invalidate(11, focusWrapEnabled = $focusAuto && $focusTrap && !$minimized);
    }
    if ($$self.$$.dirty[0] & /*oldTransition, transition*/
    1342177280) {
      $:
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
      $:
        if (oldTransitionOptions !== transitionOptions) {
          const newOptions = transitionOptions !== s_DEFAULT_TRANSITION_OPTIONS && isObject(transitionOptions) ? transitionOptions : s_DEFAULT_TRANSITION_OPTIONS;
          $$invalidate(4, inTransitionOptions = newOptions);
          $$invalidate(5, outTransitionOptions = newOptions);
          $$invalidate(31, oldTransitionOptions = newOptions);
        }
    }
    if ($$self.$$.dirty[0] & /*inTransition*/
    4) {
      $:
        if (typeof inTransition !== "function") {
          $$invalidate(2, inTransition = void 0);
        }
    }
    if ($$self.$$.dirty[0] & /*outTransition, application*/
    1032) {
      $: {
        if (typeof outTransition !== "function") {
          $$invalidate(3, outTransition = void 0);
        }
        if (application && typeof ((_a = application == null ? void 0 : application.options) == null ? void 0 : _a.defaultCloseAnimation) === "boolean") {
          $$invalidate(10, application.options.defaultCloseAnimation = outTransition === void 0, application);
        }
      }
    }
    if ($$self.$$.dirty[0] & /*inTransitionOptions*/
    16) {
      $:
        if (typeof inTransitionOptions !== "object") {
          $$invalidate(4, inTransitionOptions = s_DEFAULT_TRANSITION_OPTIONS);
        }
    }
    if ($$self.$$.dirty[0] & /*outTransitionOptions*/
    32) {
      $:
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
var ApplicationShell = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(
      this,
      options,
      instance8,
      create_fragment8,
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
      add_css6,
      [-1, -1]
    );
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "ApplicationShell",
      options,
      id: create_fragment8.name
    });
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
};
var ApplicationShell_default = ApplicationShell;

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/component/core/application/EmptyApplicationShell.svelte
var file8 = "node_modules\\@typhonjs-fvtt\\runtime\\_dist\\svelte\\component\\core\\application\\EmptyApplicationShell.svelte";
function add_css7(target) {
  append_styles(target, "svelte-tm3okp", "div.svelte-tm3okp{background:var(--tjs-empty-app-background, none);border-radius:var(--tjs-app-border-radius, 5px);box-shadow:var(--tjs-app-box-shadow, none);color:var(--tjs-app-color, inherit);display:var(--tjs-app-display, flex);flex-direction:var(--tjs-app-flex-direction, column);flex-wrap:var(--tjs-app-flex-wrap, nowrap);justify-content:var(--tjs-app-justify-content, flex-start);margin:var(--tjs-app-margin, 0);max-height:var(--tjs-app-max-height, 100%);overflow:var(--tjs-app-overflow, hidden);padding:var(--tjs-app-padding, 0);position:var(--tjs-app-position, absolute)}div.svelte-tm3okp:focus-visible{outline:var(--tjs-app-outline-focus-visible, var(--tjs-default-a11y-outline-focus-visible, 2px solid transparent))}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1wdHlBcHBsaWNhdGlvblNoZWxsLnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUFnVkksaUJBQUEsQ0FDSSxVQUFBLENBQUEsSUFBQSwwQkFBQSxDQUFBLEtBQUEsQ0FBaUQsQ0FFakQsYUFBQSxDQUFBLElBQUEsdUJBQUEsQ0FBQSxJQUFBLENBQWdELENBQ2hELFVBQUEsQ0FBQSxJQUFBLG9CQUFBLENBQUEsS0FBQSxDQUEyQyxDQUMzQyxLQUFBLENBQUEsSUFBQSxlQUFBLENBQUEsUUFBQSxDQUFvQyxDQUNwQyxPQUFBLENBQUEsSUFBQSxpQkFBQSxDQUFBLEtBQUEsQ0FBcUMsQ0FDckMsY0FBQSxDQUFBLElBQUEsd0JBQUEsQ0FBQSxPQUFBLENBQXFELENBQ3JELFNBQUEsQ0FBQSxJQUFBLG1CQUFBLENBQUEsT0FBQSxDQUEyQyxDQUMzQyxlQUFBLENBQUEsSUFBQSx5QkFBQSxDQUFBLFdBQUEsQ0FBMkQsQ0FDM0QsTUFBQSxDQUFBLElBQUEsZ0JBQUEsQ0FBQSxFQUFBLENBQWdDLENBQ2hDLFVBQUEsQ0FBQSxJQUFBLG9CQUFBLENBQUEsS0FBQSxDQUEyQyxDQUMzQyxRQUFBLENBQUEsSUFBQSxrQkFBQSxDQUFBLE9BQUEsQ0FBeUMsQ0FDekMsT0FBQSxDQUFBLElBQUEsaUJBQUEsQ0FBQSxFQUFBLENBQWtDLENBQ2xDLFFBQUEsQ0FBQSxJQUFBLGtCQUFBLENBQUEsU0FBQSxDQUNKLENBRUEsaUJBQUEsY0FBQSxDQUNJLE9BQUEsQ0FBQSxJQUFBLCtCQUFBLENBQUEscUVBQUEsQ0FDSiIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJFbXB0eUFwcGxpY2F0aW9uU2hlbGwuc3ZlbHRlIl19 */");
}
function create_else_block3(ctx) {
  let div2;
  let t;
  let tjsfocuswrap;
  let div_id_value;
  let div_class_value;
  let div_data_appid_value;
  let applyStyles_action;
  let appResizeObserver_action;
  let current;
  let mounted;
  let dispose;
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
  tjsfocuswrap = new TJSFocusWrap_default({
    props: {
      elementRoot: (
        /*elementRoot*/
        ctx[0]
      ),
      enabled: (
        /*focusWrapEnabled*/
        ctx[7]
      )
    },
    $$inline: true
  });
  const block = {
    c: function create2() {
      div2 = element("div");
      if (default_slot)
        default_slot.c();
      t = space();
      create_component(tjsfocuswrap.$$.fragment);
      attr_dev(div2, "id", div_id_value = /*application*/
      ctx[6].id);
      attr_dev(div2, "class", div_class_value = null_to_empty(
        /*application*/
        ctx[6].options.classes.join(" ")
      ) + " svelte-tm3okp");
      attr_dev(div2, "data-appid", div_data_appid_value = /*application*/
      ctx[6].appId);
      attr_dev(div2, "tabindex", "-1");
      add_location(div2, file8, 320, 4, 12367);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div2, anchor);
      if (default_slot) {
        default_slot.m(div2, null);
      }
      append_dev(div2, t);
      mount_component(tjsfocuswrap, div2, null);
      ctx[30](div2);
      current = true;
      if (!mounted) {
        dispose = [
          listen_dev(div2, "close:popup", stop_propagation(prevent_default(
            /*onClosePopup*/
            ctx[13]
          )), false, true, true, false),
          listen_dev(
            div2,
            "keydown",
            /*onKeydown*/
            ctx[14],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            div2,
            "pointerdown",
            /*onPointerdownApp*/
            ctx[15],
            false,
            false,
            false,
            false
          ),
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            div2,
            /*stylesApp*/
            ctx[5]
          )),
          action_destroyer(appResizeObserver_action = /*appResizeObserver*/
          ctx[8].call(
            null,
            div2,
            /*resizeObservedApp*/
            ctx[16]
          ))
        ];
        mounted = true;
      }
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
      }
      const tjsfocuswrap_changes = {};
      if (dirty[0] & /*elementRoot*/
      1)
        tjsfocuswrap_changes.elementRoot = /*elementRoot*/
        ctx2[0];
      if (dirty[0] & /*focusWrapEnabled*/
      128)
        tjsfocuswrap_changes.enabled = /*focusWrapEnabled*/
        ctx2[7];
      tjsfocuswrap.$set(tjsfocuswrap_changes);
      if (!current || dirty[0] & /*application*/
      64 && div_id_value !== (div_id_value = /*application*/
      ctx2[6].id)) {
        attr_dev(div2, "id", div_id_value);
      }
      if (!current || dirty[0] & /*application*/
      64 && div_class_value !== (div_class_value = null_to_empty(
        /*application*/
        ctx2[6].options.classes.join(" ")
      ) + " svelte-tm3okp")) {
        attr_dev(div2, "class", div_class_value);
      }
      if (!current || dirty[0] & /*application*/
      64 && div_data_appid_value !== (div_data_appid_value = /*application*/
      ctx2[6].appId)) {
        attr_dev(div2, "data-appid", div_data_appid_value);
      }
      if (applyStyles_action && is_function(applyStyles_action.update) && dirty[0] & /*stylesApp*/
      32)
        applyStyles_action.update.call(
          null,
          /*stylesApp*/
          ctx2[5]
        );
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      transition_in(tjsfocuswrap.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      transition_out(tjsfocuswrap.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div2);
      if (default_slot)
        default_slot.d(detaching);
      destroy_component(tjsfocuswrap);
      ctx[30](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_else_block3.name,
    type: "else",
    source: "(320:0) {:else}",
    ctx
  });
  return block;
}
function create_if_block6(ctx) {
  let div2;
  let t;
  let tjsfocuswrap;
  let div_id_value;
  let div_class_value;
  let div_data_appid_value;
  let applyStyles_action;
  let appResizeObserver_action;
  let div_intro;
  let div_outro;
  let current;
  let mounted;
  let dispose;
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
  tjsfocuswrap = new TJSFocusWrap_default({
    props: {
      elementRoot: (
        /*elementRoot*/
        ctx[0]
      ),
      enabled: (
        /*focusWrapEnabled*/
        ctx[7]
      )
    },
    $$inline: true
  });
  const block = {
    c: function create2() {
      div2 = element("div");
      if (default_slot)
        default_slot.c();
      t = space();
      create_component(tjsfocuswrap.$$.fragment);
      attr_dev(div2, "id", div_id_value = /*application*/
      ctx[6].id);
      attr_dev(div2, "class", div_class_value = null_to_empty(
        /*application*/
        ctx[6].options.classes.join(" ")
      ) + " svelte-tm3okp");
      attr_dev(div2, "data-appid", div_data_appid_value = /*application*/
      ctx[6].appId);
      attr_dev(div2, "tabindex", "-1");
      add_location(div2, file8, 304, 4, 11748);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div2, anchor);
      if (default_slot) {
        default_slot.m(div2, null);
      }
      append_dev(div2, t);
      mount_component(tjsfocuswrap, div2, null);
      ctx[29](div2);
      current = true;
      if (!mounted) {
        dispose = [
          listen_dev(div2, "close:popup", stop_propagation(prevent_default(
            /*onClosePopup*/
            ctx[13]
          )), false, true, true, false),
          listen_dev(
            div2,
            "keydown",
            /*onKeydown*/
            ctx[14],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            div2,
            "pointerdown",
            /*onPointerdownApp*/
            ctx[15],
            false,
            false,
            false,
            false
          ),
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            div2,
            /*stylesApp*/
            ctx[5]
          )),
          action_destroyer(appResizeObserver_action = /*appResizeObserver*/
          ctx[8].call(
            null,
            div2,
            /*resizeObservedApp*/
            ctx[16]
          ))
        ];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      if (default_slot) {
        if (default_slot.p && (!current || dirty[0] & /*$$scope*/
        134217728)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx,
            /*$$scope*/
            ctx[27],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx[27]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx[27],
              dirty,
              null
            ),
            null
          );
        }
      }
      const tjsfocuswrap_changes = {};
      if (dirty[0] & /*elementRoot*/
      1)
        tjsfocuswrap_changes.elementRoot = /*elementRoot*/
        ctx[0];
      if (dirty[0] & /*focusWrapEnabled*/
      128)
        tjsfocuswrap_changes.enabled = /*focusWrapEnabled*/
        ctx[7];
      tjsfocuswrap.$set(tjsfocuswrap_changes);
      if (!current || dirty[0] & /*application*/
      64 && div_id_value !== (div_id_value = /*application*/
      ctx[6].id)) {
        attr_dev(div2, "id", div_id_value);
      }
      if (!current || dirty[0] & /*application*/
      64 && div_class_value !== (div_class_value = null_to_empty(
        /*application*/
        ctx[6].options.classes.join(" ")
      ) + " svelte-tm3okp")) {
        attr_dev(div2, "class", div_class_value);
      }
      if (!current || dirty[0] & /*application*/
      64 && div_data_appid_value !== (div_data_appid_value = /*application*/
      ctx[6].appId)) {
        attr_dev(div2, "data-appid", div_data_appid_value);
      }
      if (applyStyles_action && is_function(applyStyles_action.update) && dirty[0] & /*stylesApp*/
      32)
        applyStyles_action.update.call(
          null,
          /*stylesApp*/
          ctx[5]
        );
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      transition_in(tjsfocuswrap.$$.fragment, local);
      add_render_callback(() => {
        if (!current)
          return;
        if (div_outro)
          div_outro.end(1);
        div_intro = create_in_transition(
          div2,
          /*inTransition*/
          ctx[1],
          /*inTransitionOptions*/
          ctx[3]
        );
        div_intro.start();
      });
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      transition_out(tjsfocuswrap.$$.fragment, local);
      if (div_intro)
        div_intro.invalidate();
      div_outro = create_out_transition(
        div2,
        /*outTransition*/
        ctx[2],
        /*outTransitionOptions*/
        ctx[4]
      );
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div2);
      if (default_slot)
        default_slot.d(detaching);
      destroy_component(tjsfocuswrap);
      ctx[29](null);
      if (detaching && div_outro)
        div_outro.end();
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block6.name,
    type: "if",
    source: "(304:0) {#if inTransition || outTransition}",
    ctx
  });
  return block;
}
function create_fragment9(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block6, create_else_block3];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*inTransition*/
      ctx2[1] || /*outTransition*/
      ctx2[2]
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx, [-1, -1]);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  const block = {
    c: function create2() {
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
    id: create_fragment9.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance9($$self, $$props, $$invalidate) {
  let $focusKeep;
  let $focusAuto;
  let $minimized;
  let $focusTrap;
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("EmptyApplicationShell", slots, ["default"]);
  let { elementContent = void 0 } = $$props;
  let { elementRoot = void 0 } = $$props;
  let { stylesApp = void 0 } = $$props;
  let { appOffsetHeight = false } = $$props;
  let { appOffsetWidth = false } = $$props;
  const appResizeObserver = !!appOffsetHeight || !!appOffsetWidth ? resizeObserver : () => null;
  const s_IGNORE_CLASSES = { ignoreClasses: ["tjs-focus-wrap"] };
  const internal = new AppShellContextInternal();
  setContext("#internal", internal);
  const { application } = getContext("#external");
  const { focusAuto, focusKeep, focusTrap } = application.reactive.storeAppOptions;
  validate_store(focusAuto, "focusAuto");
  component_subscribe($$self, focusAuto, (value) => $$invalidate(24, $focusAuto = value));
  validate_store(focusKeep, "focusKeep");
  component_subscribe($$self, focusKeep, (value) => $$invalidate(31, $focusKeep = value));
  validate_store(focusTrap, "focusTrap");
  component_subscribe($$self, focusTrap, (value) => $$invalidate(26, $focusTrap = value));
  const { minimized } = application.reactive.storeUIState;
  validate_store(minimized, "minimized");
  component_subscribe($$self, minimized, (value) => $$invalidate(25, $minimized = value));
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
    var _a;
    if (!$focusAuto) {
      return;
    }
    const targetEl = (_a = event == null ? void 0 : event.detail) == null ? void 0 : _a.target;
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
    var _a, _b;
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
    if (typeof ((_a = application == null ? void 0 : application.options) == null ? void 0 : _a.popOut) === "boolean" && application.options.popOut && application !== ((_b = globalThis.ui) == null ? void 0 : _b.activeWindow)) {
      application.bringToTop.call(application);
    }
  }
  function onPointerdownApp(event) {
    var _a, _b;
    const focusable = A11yHelper.isFocusable(event.target);
    if (!focusable && elementRoot instanceof HTMLElement && $focusAuto) {
      if ($focusKeep) {
        const focusOutside = document.activeElement instanceof HTMLElement && !elementRoot.contains(document.activeElement);
        if (focusOutside) {
          elementRoot.focus();
        } else {
          event.preventDefault();
        }
      } else {
        elementRoot.focus();
      }
    }
    if (typeof ((_a = application == null ? void 0 : application.options) == null ? void 0 : _a.popOut) === "boolean" && application.options.popOut && application !== ((_b = globalThis.ui) == null ? void 0 : _b.activeWindow)) {
      application.bringToTop.call(application);
    }
  }
  function resizeObservedApp(offsetWidth, offsetHeight, contentWidth, contentHeight) {
    application.position.stores.resizeObserved.update((object) => {
      object.contentWidth = contentWidth;
      object.contentHeight = contentHeight;
      object.offsetWidth = offsetWidth;
      object.offsetHeight = offsetHeight;
      return object;
    });
    $$invalidate(18, appOffsetHeight = offsetHeight);
    $$invalidate(19, appOffsetWidth = offsetWidth);
  }
  const writable_props = [
    "elementContent",
    "elementRoot",
    "stylesApp",
    "appOffsetHeight",
    "appOffsetWidth",
    "transition",
    "inTransition",
    "outTransition",
    "transitionOptions",
    "inTransitionOptions",
    "outTransitionOptions"
  ];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<EmptyApplicationShell> was created with unknown prop '${key}'`);
  });
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      elementRoot = $$value;
      $$invalidate(0, elementRoot);
    });
  }
  function div_binding_1($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      elementRoot = $$value;
      $$invalidate(0, elementRoot);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("elementContent" in $$props2)
      $$invalidate(17, elementContent = $$props2.elementContent);
    if ("elementRoot" in $$props2)
      $$invalidate(0, elementRoot = $$props2.elementRoot);
    if ("stylesApp" in $$props2)
      $$invalidate(5, stylesApp = $$props2.stylesApp);
    if ("appOffsetHeight" in $$props2)
      $$invalidate(18, appOffsetHeight = $$props2.appOffsetHeight);
    if ("appOffsetWidth" in $$props2)
      $$invalidate(19, appOffsetWidth = $$props2.appOffsetWidth);
    if ("transition" in $$props2)
      $$invalidate(20, transition = $$props2.transition);
    if ("inTransition" in $$props2)
      $$invalidate(1, inTransition = $$props2.inTransition);
    if ("outTransition" in $$props2)
      $$invalidate(2, outTransition = $$props2.outTransition);
    if ("transitionOptions" in $$props2)
      $$invalidate(21, transitionOptions = $$props2.transitionOptions);
    if ("inTransitionOptions" in $$props2)
      $$invalidate(3, inTransitionOptions = $$props2.inTransitionOptions);
    if ("outTransitionOptions" in $$props2)
      $$invalidate(4, outTransitionOptions = $$props2.outTransitionOptions);
    if ("$$scope" in $$props2)
      $$invalidate(27, $$scope = $$props2.$$scope);
  };
  $$self.$capture_state = () => ({
    getContext,
    onMount,
    setContext,
    applyStyles,
    resizeObserver,
    A11yHelper,
    isObject,
    AppShellContextInternal,
    TJSFocusWrap: TJSFocusWrap_default,
    s_DEFAULT_TRANSITION_OPTIONS,
    elementContent,
    elementRoot,
    stylesApp,
    appOffsetHeight,
    appOffsetWidth,
    appResizeObserver,
    s_IGNORE_CLASSES,
    internal,
    application,
    focusAuto,
    focusKeep,
    focusTrap,
    minimized,
    focusWrapEnabled,
    transition,
    inTransition,
    outTransition,
    transitionOptions,
    inTransitionOptions,
    outTransitionOptions,
    oldTransition,
    oldTransitionOptions,
    onClosePopup,
    onKeydown,
    onPointerdownApp,
    resizeObservedApp,
    $focusKeep,
    $focusAuto,
    $minimized,
    $focusTrap
  });
  $$self.$inject_state = ($$props2) => {
    if ("elementContent" in $$props2)
      $$invalidate(17, elementContent = $$props2.elementContent);
    if ("elementRoot" in $$props2)
      $$invalidate(0, elementRoot = $$props2.elementRoot);
    if ("stylesApp" in $$props2)
      $$invalidate(5, stylesApp = $$props2.stylesApp);
    if ("appOffsetHeight" in $$props2)
      $$invalidate(18, appOffsetHeight = $$props2.appOffsetHeight);
    if ("appOffsetWidth" in $$props2)
      $$invalidate(19, appOffsetWidth = $$props2.appOffsetWidth);
    if ("focusWrapEnabled" in $$props2)
      $$invalidate(7, focusWrapEnabled = $$props2.focusWrapEnabled);
    if ("transition" in $$props2)
      $$invalidate(20, transition = $$props2.transition);
    if ("inTransition" in $$props2)
      $$invalidate(1, inTransition = $$props2.inTransition);
    if ("outTransition" in $$props2)
      $$invalidate(2, outTransition = $$props2.outTransition);
    if ("transitionOptions" in $$props2)
      $$invalidate(21, transitionOptions = $$props2.transitionOptions);
    if ("inTransitionOptions" in $$props2)
      $$invalidate(3, inTransitionOptions = $$props2.inTransitionOptions);
    if ("outTransitionOptions" in $$props2)
      $$invalidate(4, outTransitionOptions = $$props2.outTransitionOptions);
    if ("oldTransition" in $$props2)
      $$invalidate(22, oldTransition = $$props2.oldTransition);
    if ("oldTransitionOptions" in $$props2)
      $$invalidate(23, oldTransitionOptions = $$props2.oldTransitionOptions);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    var _a;
    if ($$self.$$.dirty[0] & /*elementRoot*/
    1) {
      $:
        if (elementRoot) {
          $$invalidate(17, elementContent = elementRoot);
        }
    }
    if ($$self.$$.dirty[0] & /*elementContent*/
    131072) {
      $:
        if (elementContent !== void 0 && elementContent !== null) {
          getContext("#internal").stores.elementContent.set(elementContent);
        }
    }
    if ($$self.$$.dirty[0] & /*elementRoot*/
    1) {
      $:
        if (elementRoot !== void 0 && elementRoot !== null) {
          getContext("#internal").stores.elementRoot.set(elementRoot);
        }
    }
    if ($$self.$$.dirty[0] & /*$focusAuto, $focusTrap, $minimized*/
    117440512) {
      $:
        $$invalidate(7, focusWrapEnabled = $focusAuto && $focusTrap && !$minimized);
    }
    if ($$self.$$.dirty[0] & /*oldTransition, transition*/
    5242880) {
      $:
        if (oldTransition !== transition) {
          const newTransition = typeof transition === "function" ? transition : void 0;
          $$invalidate(1, inTransition = newTransition);
          $$invalidate(2, outTransition = newTransition);
          $$invalidate(22, oldTransition = newTransition);
        }
    }
    if ($$self.$$.dirty[0] & /*oldTransitionOptions, transitionOptions*/
    10485760) {
      $:
        if (oldTransitionOptions !== transitionOptions) {
          const newOptions = transitionOptions !== s_DEFAULT_TRANSITION_OPTIONS && isObject(transitionOptions) ? transitionOptions : s_DEFAULT_TRANSITION_OPTIONS;
          $$invalidate(3, inTransitionOptions = newOptions);
          $$invalidate(4, outTransitionOptions = newOptions);
          $$invalidate(23, oldTransitionOptions = newOptions);
        }
    }
    if ($$self.$$.dirty[0] & /*inTransition*/
    2) {
      $:
        if (typeof inTransition !== "function") {
          $$invalidate(1, inTransition = void 0);
        }
    }
    if ($$self.$$.dirty[0] & /*outTransition, application*/
    68) {
      $: {
        if (typeof outTransition !== "function") {
          $$invalidate(2, outTransition = void 0);
        }
        if (application && typeof ((_a = application == null ? void 0 : application.options) == null ? void 0 : _a.defaultCloseAnimation) === "boolean") {
          $$invalidate(6, application.options.defaultCloseAnimation = outTransition === void 0, application);
        }
      }
    }
    if ($$self.$$.dirty[0] & /*inTransitionOptions*/
    8) {
      $:
        if (typeof inTransitionOptions !== "object") {
          $$invalidate(3, inTransitionOptions = s_DEFAULT_TRANSITION_OPTIONS);
        }
    }
    if ($$self.$$.dirty[0] & /*outTransitionOptions*/
    16) {
      $:
        if (typeof outTransitionOptions !== "object") {
          $$invalidate(4, outTransitionOptions = s_DEFAULT_TRANSITION_OPTIONS);
        }
    }
  };
  return [
    elementRoot,
    inTransition,
    outTransition,
    inTransitionOptions,
    outTransitionOptions,
    stylesApp,
    application,
    focusWrapEnabled,
    appResizeObserver,
    focusAuto,
    focusKeep,
    focusTrap,
    minimized,
    onClosePopup,
    onKeydown,
    onPointerdownApp,
    resizeObservedApp,
    elementContent,
    appOffsetHeight,
    appOffsetWidth,
    transition,
    transitionOptions,
    oldTransition,
    oldTransitionOptions,
    $focusAuto,
    $minimized,
    $focusTrap,
    $$scope,
    slots,
    div_binding,
    div_binding_1
  ];
}
var EmptyApplicationShell = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(
      this,
      options,
      instance9,
      create_fragment9,
      safe_not_equal,
      {
        elementContent: 17,
        elementRoot: 0,
        stylesApp: 5,
        appOffsetHeight: 18,
        appOffsetWidth: 19,
        transition: 20,
        inTransition: 1,
        outTransition: 2,
        transitionOptions: 21,
        inTransitionOptions: 3,
        outTransitionOptions: 4
      },
      add_css7,
      [-1, -1]
    );
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "EmptyApplicationShell",
      options,
      id: create_fragment9.name
    });
  }
  get elementContent() {
    return this.$$.ctx[17];
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
  get stylesApp() {
    return this.$$.ctx[5];
  }
  set stylesApp(stylesApp) {
    this.$$set({ stylesApp });
    flush();
  }
  get appOffsetHeight() {
    return this.$$.ctx[18];
  }
  set appOffsetHeight(appOffsetHeight) {
    this.$$set({ appOffsetHeight });
    flush();
  }
  get appOffsetWidth() {
    return this.$$.ctx[19];
  }
  set appOffsetWidth(appOffsetWidth) {
    this.$$set({ appOffsetWidth });
    flush();
  }
  get transition() {
    return this.$$.ctx[20];
  }
  set transition(transition) {
    this.$$set({ transition });
    flush();
  }
  get inTransition() {
    return this.$$.ctx[1];
  }
  set inTransition(inTransition) {
    this.$$set({ inTransition });
    flush();
  }
  get outTransition() {
    return this.$$.ctx[2];
  }
  set outTransition(outTransition) {
    this.$$set({ outTransition });
    flush();
  }
  get transitionOptions() {
    return this.$$.ctx[21];
  }
  set transitionOptions(transitionOptions) {
    this.$$set({ transitionOptions });
    flush();
  }
  get inTransitionOptions() {
    return this.$$.ctx[3];
  }
  set inTransitionOptions(inTransitionOptions) {
    this.$$set({ inTransitionOptions });
    flush();
  }
  get outTransitionOptions() {
    return this.$$.ctx[4];
  }
  set outTransitionOptions(outTransitionOptions) {
    this.$$set({ outTransitionOptions });
    flush();
  }
};
var EmptyApplicationShell_default = EmptyApplicationShell;

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/component/core/application/TJSApplicationShell.svelte
var file9 = "node_modules\\@typhonjs-fvtt\\runtime\\_dist\\svelte\\component\\core\\application\\TJSApplicationShell.svelte";
function add_css8(target) {
  append_styles(target, "svelte-13fg5z7", ".tjs-app.svelte-13fg5z7.svelte-13fg5z7{max-height:var(--tjs-app-max-height, 100%);background:var(--tjs-app-background);border-radius:var(--tjs-app-border-radius, 5px);box-shadow:var(--tjs-app-box-shadow, 0 0 20px #000);margin:var(--tjs-app-margin, 3px 0);padding:var(--tjs-app-padding, 0.5em);color:var(--tjs-app-color, #f0f0e0)}.tjs-window-app.svelte-13fg5z7.svelte-13fg5z7:focus-visible{outline:var(--tjs-app-outline-focus-visible, var(--tjs-default-a11y-outline-focus-visible, 2px solid transparent))}.tjs-window-app.svelte-13fg5z7 .window-content.svelte-13fg5z7:focus-visible{outline:var(--tjs-app-content-outline-focus-visible, var(--tjs-default-a11y-outline-focus-visible, 2px solid transparent))}.tjs-window-app.svelte-13fg5z7.svelte-13fg5z7{overflow:var(--tjs-app-overflow, hidden);display:var(--tjs-app-display, flex);flex-direction:var(--tjs-app-flex-direction, column);flex-wrap:var(--tjs-app-flex-wrap, nowrap);justify-content:var(--tjs-app-justify-content, flex-start);position:var(--tjs-app-position, absolute);box-shadow:var(--tjs-app-box-shadow, 0 0 20px #000);padding:var(--tjs-app-padding, 0)}.tjs-window-app.svelte-13fg5z7 > .flex0{display:block;flex:0}.tjs-window-app.svelte-13fg5z7 > .flex1{flex:1}.tjs-window-app.svelte-13fg5z7 > .flex2{flex:2}.tjs-window-app.svelte-13fg5z7 > .flex3{flex:3}.tjs-window-app.svelte-13fg5z7 .window-header{overflow:var(--tjs-app-header-overflow, hidden);line-height:var(--tjs-app-header-line-height, 30px);border-bottom:var(--tjs-app-header-border-bottom, 1px solid #000)}.tjs-window-app.svelte-13fg5z7 .window-header .window-title{margin:var(--tjs-app-header-title-margin, 0);word-break:var(--tjs-app-header-title-word-break, break-all)}.tjs-window-app.svelte-13fg5z7 .window-header a{flex:none}.tjs-window-app.minimized.svelte-13fg5z7 .window-header{border:var(--tjs-app-header-margin-minimized, none)}.tjs-window-app.svelte-13fg5z7 .window-content.svelte-13fg5z7{display:var(--tjs-app-content-display, flex);flex-direction:var(--tjs-app-content-flex-direction, column);flex-wrap:var(--tjs-app-content-flex-wrap, nowrap);flex:var(--tjs-app-content-flex-wrap, 1);justify-content:var(--tjs-app-content-justify-content, flex-start);background:var(--tjs-app-content-background, none);padding:var(--tjs-app-content-padding, 8px);color:var(--tjs-app-content-color, #191813);overflow:var(--tjs-app-content-color, hidden auto)}.tjs-window-app.svelte-13fg5z7 .window-resizable-handle{width:20px;height:20px;position:absolute;bottom:-1px;right:0;background:#444;padding:2px;border:1px solid #111;border-radius:4px 0 0 0}.tjs-window-app.svelte-13fg5z7 .window-resizable-handle i.fas{transform:rotate(45deg)}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVEpTQXBwbGljYXRpb25TaGVsbC5zdmVsdGUiLCJtYXBwaW5ncyI6IkFBeVpJLHNDQUFBLENBQ0ksVUFBQSxDQUFBLElBQUEsb0JBQUEsQ0FBQSxLQUFBLENBQTJDLENBQzNDLFVBQUEsQ0FBQSxJQUFBLG9CQUFBLENBQXFDLENBQ3JDLGFBQUEsQ0FBQSxJQUFBLHVCQUFBLENBQUEsSUFBQSxDQUFnRCxDQUNoRCxVQUFBLENBQUEsSUFBQSxvQkFBQSxDQUFBLGNBQUEsQ0FBb0QsQ0FDcEQsTUFBQSxDQUFBLElBQUEsZ0JBQUEsQ0FBQSxNQUFBLENBQW9DLENBQ3BDLE9BQUEsQ0FBQSxJQUFBLGlCQUFBLENBQUEsTUFBQSxDQUFzQyxDQUN0QyxLQUFBLENBQUEsSUFBQSxlQUFBLENBQUEsUUFBQSxDQUNKLENBRUEsNkNBQUEsY0FBQSxDQUNJLE9BQUEsQ0FBQSxJQUFBLCtCQUFBLENBQUEscUVBQUEsQ0FDSixDQUVBLDhCQUFBLENBQUEsOEJBQUEsY0FBQSxDQUNJLE9BQUEsQ0FBQSxJQUFBLHVDQUFBLENBQUEscUVBQUEsQ0FDSixDQUVBLDZDQUFBLENBRUksUUFBQSxDQUFBLElBQUEsa0JBQUEsQ0FBQSxPQUFBLENBQXlDLENBRXpDLE9BQUEsQ0FBQSxJQUFBLGlCQUFBLENBQUEsS0FBQSxDQUFxQyxDQUNyQyxjQUFBLENBQUEsSUFBQSx3QkFBQSxDQUFBLE9BQUEsQ0FBcUQsQ0FDckQsU0FBQSxDQUFBLElBQUEsbUJBQUEsQ0FBQSxPQUFBLENBQTJDLENBQzNDLGVBQUEsQ0FBQSxJQUFBLHlCQUFBLENBQUEsV0FBQSxDQUEyRCxDQUMzRCxRQUFBLENBQUEsSUFBQSxrQkFBQSxDQUFBLFNBQUEsQ0FBMkMsQ0FDM0MsVUFBQSxDQUFBLElBQUEsb0JBQUEsQ0FBQSxjQUFBLENBQW9ELENBQ3BELE9BQUEsQ0FBQSxJQUFBLGlCQUFBLENBQUEsRUFBQSxDQUNKLENBRUEsOEJBQUEsQ0FBQSxRQUFBLENBQ0ksT0FBQSxDQUFBLEtBQWMsQ0FDZCxJQUFBLENBQUEsQ0FDSixDQUVBLDhCQUFBLENBQUEsUUFBQSxDQUNJLElBQUEsQ0FBQSxDQUNKLENBRUEsOEJBQUEsQ0FBQSxRQUFBLENBQ0ksSUFBQSxDQUFBLENBQ0osQ0FFQSw4QkFBQSxDQUFBLFFBQUEsQ0FDSSxJQUFBLENBQUEsQ0FDSixDQUVBLDhCQUFBLENBQUEsY0FBQSxDQUNJLFFBQUEsQ0FBQSxJQUFBLHlCQUFBLENBQUEsT0FBQSxDQUFnRCxDQUNoRCxXQUFBLENBQUEsSUFBQSw0QkFBQSxDQUFBLEtBQUEsQ0FBb0QsQ0FDcEQsYUFBQSxDQUFBLElBQUEsOEJBQUEsQ0FBQSxlQUFBLENBQ0osQ0FFQSw4QkFBQSxDQUFBLDRCQUFBLENBQ0ksTUFBQSxDQUFBLElBQUEsNkJBQUEsQ0FBQSxFQUFBLENBQTZDLENBQzdDLFVBQUEsQ0FBQSxJQUFBLGlDQUFBLENBQUEsVUFBQSxDQUNKLENBRUEsOEJBQUEsQ0FBQSxnQkFBQSxDQUNJLElBQUEsQ0FBQSxJQUNKLENBRUEsZUFBQSx5QkFBQSxDQUFBLGNBQUEsQ0FDSSxNQUFBLENBQUEsSUFBQSxpQ0FBQSxDQUFBLEtBQUEsQ0FDSixDQUVBLDhCQUFBLENBQUEsOEJBQUEsQ0FDSSxPQUFBLENBQUEsSUFBQSx5QkFBQSxDQUFBLEtBQUEsQ0FBNkMsQ0FDN0MsY0FBQSxDQUFBLElBQUEsZ0NBQUEsQ0FBQSxPQUFBLENBQTZELENBQzdELFNBQUEsQ0FBQSxJQUFBLDJCQUFBLENBQUEsT0FBQSxDQUFtRCxDQUNuRCxJQUFBLENBQUEsSUFBQSwyQkFBQSxDQUFBLEVBQUEsQ0FBeUMsQ0FDekMsZUFBQSxDQUFBLElBQUEsaUNBQUEsQ0FBQSxXQUFBLENBQW1FLENBQ25FLFVBQUEsQ0FBQSxJQUFBLDRCQUFBLENBQUEsS0FBQSxDQUFtRCxDQUNuRCxPQUFBLENBQUEsSUFBQSx5QkFBQSxDQUFBLElBQUEsQ0FBNEMsQ0FDNUMsS0FBQSxDQUFBLElBQUEsdUJBQUEsQ0FBQSxRQUFBLENBQTRDLENBQzVDLFFBQUEsQ0FBQSxJQUFBLHVCQUFBLENBQUEsWUFBQSxDQUNKLENBRUEsOEJBQUEsQ0FBQSx3QkFBQSxDQUNJLEtBQUEsQ0FBQSxJQUFXLENBQ1gsTUFBQSxDQUFBLElBQVksQ0FDWixRQUFBLENBQUEsUUFBa0IsQ0FDbEIsTUFBQSxDQUFBLElBQVksQ0FDWixLQUFBLENBQUEsQ0FBUSxDQUNSLFVBQUEsQ0FBQSxJQUFnQixDQUNoQixPQUFBLENBQUEsR0FBWSxDQUNaLE1BQUEsQ0FBQSxHQUFBLENBQUEsS0FBQSxDQUFBLElBQXNCLENBQ3RCLGFBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUNKLENBRUEsOEJBQUEsQ0FBQSw4QkFBQSxDQUNJLFNBQUEsQ0FBQSxPQUFBLEtBQUEsQ0FDSiIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJUSlNBcHBsaWNhdGlvblNoZWxsLnN2ZWx0ZSJdfQ== */");
}
function create_else_block4(ctx) {
  let div2;
  let tjsapplicationheader;
  let t0;
  let section;
  let applyStyles_action;
  let contentResizeObserver_action;
  let t1;
  let resizablehandle;
  let t2;
  let tjsfocuswrap;
  let div_id_value;
  let div_class_value;
  let div_data_appid_value;
  let applyStyles_action_1;
  let appResizeObserver_action;
  let current;
  let mounted;
  let dispose;
  tjsapplicationheader = new TJSApplicationHeader_default({
    props: {
      draggable: (
        /*draggable*/
        ctx[6]
      ),
      draggableOptions: (
        /*draggableOptions*/
        ctx[7]
      )
    },
    $$inline: true
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
  resizablehandle = new ResizableHandle_default({ $$inline: true });
  tjsfocuswrap = new TJSFocusWrap_default({
    props: {
      elementRoot: (
        /*elementRoot*/
        ctx[1]
      ),
      enabled: (
        /*focusWrapEnabled*/
        ctx[11]
      )
    },
    $$inline: true
  });
  const block = {
    c: function create2() {
      div2 = element("div");
      create_component(tjsapplicationheader.$$.fragment);
      t0 = space();
      section = element("section");
      if (default_slot)
        default_slot.c();
      t1 = space();
      create_component(resizablehandle.$$.fragment);
      t2 = space();
      create_component(tjsfocuswrap.$$.fragment);
      attr_dev(section, "class", "window-content svelte-13fg5z7");
      attr_dev(section, "tabindex", "-1");
      add_location(section, file9, 388, 8, 15335);
      attr_dev(div2, "id", div_id_value = /*application*/
      ctx[10].id);
      attr_dev(div2, "class", div_class_value = "tjs-app tjs-window-app " + /*application*/
      ctx[10].options.classes.join(" ") + " svelte-13fg5z7");
      attr_dev(div2, "data-appid", div_data_appid_value = /*application*/
      ctx[10].appId);
      attr_dev(div2, "tabindex", "-1");
      add_location(div2, file9, 377, 4, 14822);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div2, anchor);
      mount_component(tjsapplicationheader, div2, null);
      append_dev(div2, t0);
      append_dev(div2, section);
      if (default_slot) {
        default_slot.m(section, null);
      }
      ctx[39](section);
      append_dev(div2, t1);
      mount_component(resizablehandle, div2, null);
      append_dev(div2, t2);
      mount_component(tjsfocuswrap, div2, null);
      ctx[40](div2);
      current = true;
      if (!mounted) {
        dispose = [
          listen_dev(
            section,
            "pointerdown",
            /*onPointerdownContent*/
            ctx[21],
            false,
            false,
            false,
            false
          ),
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            section,
            /*stylesContent*/
            ctx[9]
          )),
          action_destroyer(contentResizeObserver_action = /*contentResizeObserver*/
          ctx[13].call(
            null,
            section,
            /*resizeObservedContent*/
            ctx[22]
          )),
          listen_dev(div2, "close:popup", stop_propagation(prevent_default(
            /*onClosePopup*/
            ctx[18]
          )), false, true, true, false),
          listen_dev(
            div2,
            "keydown",
            /*onKeydown*/
            ctx[19],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            div2,
            "pointerdown",
            /*onPointerdownApp*/
            ctx[20],
            false,
            false,
            false,
            false
          ),
          action_destroyer(applyStyles_action_1 = applyStyles.call(
            null,
            div2,
            /*stylesApp*/
            ctx[8]
          )),
          action_destroyer(appResizeObserver_action = /*appResizeObserver*/
          ctx[12].call(
            null,
            div2,
            /*resizeObservedApp*/
            ctx[23]
          ))
        ];
        mounted = true;
      }
    },
    p: function update(ctx2, dirty) {
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
        attr_dev(div2, "id", div_id_value);
      }
      if (!current || dirty[0] & /*application*/
      1024 && div_class_value !== (div_class_value = "tjs-app tjs-window-app " + /*application*/
      ctx2[10].options.classes.join(" ") + " svelte-13fg5z7")) {
        attr_dev(div2, "class", div_class_value);
      }
      if (!current || dirty[0] & /*application*/
      1024 && div_data_appid_value !== (div_data_appid_value = /*application*/
      ctx2[10].appId)) {
        attr_dev(div2, "data-appid", div_data_appid_value);
      }
      if (applyStyles_action_1 && is_function(applyStyles_action_1.update) && dirty[0] & /*stylesApp*/
      256)
        applyStyles_action_1.update.call(
          null,
          /*stylesApp*/
          ctx2[8]
        );
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(tjsapplicationheader.$$.fragment, local);
      transition_in(default_slot, local);
      transition_in(resizablehandle.$$.fragment, local);
      transition_in(tjsfocuswrap.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tjsapplicationheader.$$.fragment, local);
      transition_out(default_slot, local);
      transition_out(resizablehandle.$$.fragment, local);
      transition_out(tjsfocuswrap.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div2);
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
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_else_block4.name,
    type: "else",
    source: "(377:0) {:else}",
    ctx
  });
  return block;
}
function create_if_block7(ctx) {
  let div2;
  let tjsapplicationheader;
  let t0;
  let section;
  let applyStyles_action;
  let contentResizeObserver_action;
  let t1;
  let resizablehandle;
  let t2;
  let tjsfocuswrap;
  let div_id_value;
  let div_class_value;
  let div_data_appid_value;
  let applyStyles_action_1;
  let appResizeObserver_action;
  let div_intro;
  let div_outro;
  let current;
  let mounted;
  let dispose;
  tjsapplicationheader = new TJSApplicationHeader_default({
    props: {
      draggable: (
        /*draggable*/
        ctx[6]
      ),
      draggableOptions: (
        /*draggableOptions*/
        ctx[7]
      )
    },
    $$inline: true
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
  resizablehandle = new ResizableHandle_default({ $$inline: true });
  tjsfocuswrap = new TJSFocusWrap_default({
    props: { elementRoot: (
      /*elementRoot*/
      ctx[1]
    ) },
    $$inline: true
  });
  const block = {
    c: function create2() {
      div2 = element("div");
      create_component(tjsapplicationheader.$$.fragment);
      t0 = space();
      section = element("section");
      if (default_slot)
        default_slot.c();
      t1 = space();
      create_component(resizablehandle.$$.fragment);
      t2 = space();
      create_component(tjsfocuswrap.$$.fragment);
      attr_dev(section, "class", "window-content svelte-13fg5z7");
      attr_dev(section, "tabindex", "-1");
      add_location(section, file9, 365, 8, 14417);
      attr_dev(div2, "id", div_id_value = /*application*/
      ctx[10].id);
      attr_dev(div2, "class", div_class_value = "tjs-app tjs-window-app " + /*application*/
      ctx[10].options.classes.join(" ") + " svelte-13fg5z7");
      attr_dev(div2, "data-appid", div_data_appid_value = /*application*/
      ctx[10].appId);
      attr_dev(div2, "tabindex", "-1");
      add_location(div2, file9, 352, 4, 13807);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div2, anchor);
      mount_component(tjsapplicationheader, div2, null);
      append_dev(div2, t0);
      append_dev(div2, section);
      if (default_slot) {
        default_slot.m(section, null);
      }
      ctx[37](section);
      append_dev(div2, t1);
      mount_component(resizablehandle, div2, null);
      append_dev(div2, t2);
      mount_component(tjsfocuswrap, div2, null);
      ctx[38](div2);
      current = true;
      if (!mounted) {
        dispose = [
          listen_dev(
            section,
            "pointerdown",
            /*onPointerdownContent*/
            ctx[21],
            false,
            false,
            false,
            false
          ),
          action_destroyer(applyStyles_action = applyStyles.call(
            null,
            section,
            /*stylesContent*/
            ctx[9]
          )),
          action_destroyer(contentResizeObserver_action = /*contentResizeObserver*/
          ctx[13].call(
            null,
            section,
            /*resizeObservedContent*/
            ctx[22]
          )),
          listen_dev(div2, "close:popup", stop_propagation(prevent_default(
            /*onClosePopup*/
            ctx[18]
          )), false, true, true, false),
          listen_dev(
            div2,
            "keydown",
            /*onKeydown*/
            ctx[19],
            true,
            false,
            false,
            false
          ),
          listen_dev(
            div2,
            "pointerdown",
            /*onPointerdownApp*/
            ctx[20],
            false,
            false,
            false,
            false
          ),
          action_destroyer(applyStyles_action_1 = applyStyles.call(
            null,
            div2,
            /*stylesApp*/
            ctx[8]
          )),
          action_destroyer(appResizeObserver_action = /*appResizeObserver*/
          ctx[12].call(
            null,
            div2,
            /*resizeObservedApp*/
            ctx[23]
          ))
        ];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
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
        attr_dev(div2, "id", div_id_value);
      }
      if (!current || dirty[0] & /*application*/
      1024 && div_class_value !== (div_class_value = "tjs-app tjs-window-app " + /*application*/
      ctx[10].options.classes.join(" ") + " svelte-13fg5z7")) {
        attr_dev(div2, "class", div_class_value);
      }
      if (!current || dirty[0] & /*application*/
      1024 && div_data_appid_value !== (div_data_appid_value = /*application*/
      ctx[10].appId)) {
        attr_dev(div2, "data-appid", div_data_appid_value);
      }
      if (applyStyles_action_1 && is_function(applyStyles_action_1.update) && dirty[0] & /*stylesApp*/
      256)
        applyStyles_action_1.update.call(
          null,
          /*stylesApp*/
          ctx[8]
        );
    },
    i: function intro(local) {
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
          div2,
          /*inTransition*/
          ctx[2],
          /*inTransitionOptions*/
          ctx[4]
        );
        div_intro.start();
      });
      current = true;
    },
    o: function outro(local) {
      transition_out(tjsapplicationheader.$$.fragment, local);
      transition_out(default_slot, local);
      transition_out(resizablehandle.$$.fragment, local);
      transition_out(tjsfocuswrap.$$.fragment, local);
      if (div_intro)
        div_intro.invalidate();
      div_outro = create_out_transition(
        div2,
        /*outTransition*/
        ctx[3],
        /*outTransitionOptions*/
        ctx[5]
      );
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div2);
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
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block7.name,
    type: "if",
    source: "(352:0) {#if inTransition || outTransition}",
    ctx
  });
  return block;
}
function create_fragment10(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block7, create_else_block4];
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
  current_block_type_index = select_block_type(ctx, [-1, -1]);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  const block = {
    c: function create2() {
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
    id: create_fragment10.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance10($$self, $$props, $$invalidate) {
  let $focusKeep;
  let $focusAuto;
  let $minimized;
  let $focusTrap;
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("TJSApplicationShell", slots, ["default"]);
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
  validate_store(focusAuto, "focusAuto");
  component_subscribe($$self, focusAuto, (value) => $$invalidate(32, $focusAuto = value));
  validate_store(focusKeep, "focusKeep");
  component_subscribe($$self, focusKeep, (value) => $$invalidate(41, $focusKeep = value));
  validate_store(focusTrap, "focusTrap");
  component_subscribe($$self, focusTrap, (value) => $$invalidate(34, $focusTrap = value));
  const { minimized } = application.reactive.storeUIState;
  validate_store(minimized, "minimized");
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
  onMount(() => {
    if ($focusAuto) {
      elementRoot.focus();
    }
  });
  function onClosePopup(event) {
    var _a;
    if (!$focusAuto) {
      return;
    }
    const targetEl = (_a = event == null ? void 0 : event.detail) == null ? void 0 : _a.target;
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
    var _a, _b;
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
    if (typeof ((_a = application == null ? void 0 : application.options) == null ? void 0 : _a.popOut) === "boolean" && application.options.popOut && application !== ((_b = globalThis.ui) == null ? void 0 : _b.activeWindow)) {
      application.bringToTop.call(application);
    }
  }
  function onPointerdownApp() {
    var _a, _b;
    if (typeof ((_a = application == null ? void 0 : application.options) == null ? void 0 : _a.popOut) === "boolean" && application.options.popOut && application !== ((_b = globalThis.ui) == null ? void 0 : _b.activeWindow)) {
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
  const writable_props = [
    "elementContent",
    "elementRoot",
    "draggable",
    "draggableOptions",
    "stylesApp",
    "stylesContent",
    "appOffsetHeight",
    "appOffsetWidth",
    "contentOffsetHeight",
    "contentOffsetWidth",
    "transition",
    "inTransition",
    "outTransition",
    "transitionOptions",
    "inTransitionOptions",
    "outTransitionOptions"
  ];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<TJSApplicationShell> was created with unknown prop '${key}'`);
  });
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
  $$self.$capture_state = () => ({
    getContext,
    onMount,
    setContext,
    applyStyles,
    resizeObserver,
    A11yHelper,
    isObject,
    AppShellContextInternal,
    TJSApplicationHeader: TJSApplicationHeader_default,
    TJSFocusWrap: TJSFocusWrap_default,
    ResizableHandle: ResizableHandle_default,
    s_DEFAULT_TRANSITION_OPTIONS,
    elementContent,
    elementRoot,
    draggable: draggable2,
    draggableOptions,
    stylesApp,
    stylesContent,
    appOffsetHeight,
    appOffsetWidth,
    appResizeObserver,
    contentOffsetHeight,
    contentOffsetWidth,
    contentResizeObserver,
    internal,
    s_IGNORE_CLASSES,
    application,
    focusAuto,
    focusKeep,
    focusTrap,
    minimized,
    focusWrapEnabled,
    transition,
    inTransition,
    outTransition,
    transitionOptions,
    inTransitionOptions,
    outTransitionOptions,
    oldTransition,
    oldTransitionOptions,
    onClosePopup,
    onKeydown,
    onPointerdownApp,
    onPointerdownContent,
    resizeObservedContent,
    resizeObservedApp,
    $focusKeep,
    $focusAuto,
    $minimized,
    $focusTrap
  });
  $$self.$inject_state = ($$props2) => {
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
    if ("focusWrapEnabled" in $$props2)
      $$invalidate(11, focusWrapEnabled = $$props2.focusWrapEnabled);
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
    if ("oldTransition" in $$props2)
      $$invalidate(30, oldTransition = $$props2.oldTransition);
    if ("oldTransitionOptions" in $$props2)
      $$invalidate(31, oldTransitionOptions = $$props2.oldTransitionOptions);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    var _a;
    if ($$self.$$.dirty[0] & /*elementContent*/
    1) {
      $:
        if (elementContent !== void 0 && elementContent !== null) {
          getContext("#internal").stores.elementContent.set(elementContent);
        }
    }
    if ($$self.$$.dirty[0] & /*elementRoot*/
    2) {
      $:
        if (elementRoot !== void 0 && elementRoot !== null) {
          getContext("#internal").stores.elementRoot.set(elementRoot);
        }
    }
    if ($$self.$$.dirty[1] & /*$focusAuto, $focusTrap, $minimized*/
    14) {
      $:
        $$invalidate(11, focusWrapEnabled = $focusAuto && $focusTrap && !$minimized);
    }
    if ($$self.$$.dirty[0] & /*oldTransition, transition*/
    1342177280) {
      $:
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
      $:
        if (oldTransitionOptions !== transitionOptions) {
          const newOptions = transitionOptions !== s_DEFAULT_TRANSITION_OPTIONS && isObject(transitionOptions) ? transitionOptions : s_DEFAULT_TRANSITION_OPTIONS;
          $$invalidate(4, inTransitionOptions = newOptions);
          $$invalidate(5, outTransitionOptions = newOptions);
          $$invalidate(31, oldTransitionOptions = newOptions);
        }
    }
    if ($$self.$$.dirty[0] & /*inTransition*/
    4) {
      $:
        if (typeof inTransition !== "function") {
          $$invalidate(2, inTransition = void 0);
        }
    }
    if ($$self.$$.dirty[0] & /*outTransition, application*/
    1032) {
      $: {
        if (typeof outTransition !== "function") {
          $$invalidate(3, outTransition = void 0);
        }
        if (application && typeof ((_a = application == null ? void 0 : application.options) == null ? void 0 : _a.defaultCloseAnimation) === "boolean") {
          $$invalidate(10, application.options.defaultCloseAnimation = outTransition === void 0, application);
        }
      }
    }
    if ($$self.$$.dirty[0] & /*inTransitionOptions*/
    16) {
      $:
        if (typeof inTransitionOptions !== "object") {
          $$invalidate(4, inTransitionOptions = s_DEFAULT_TRANSITION_OPTIONS);
        }
    }
    if ($$self.$$.dirty[0] & /*outTransitionOptions*/
    32) {
      $:
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
var TJSApplicationShell = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(
      this,
      options,
      instance10,
      create_fragment10,
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
      add_css8,
      [-1, -1]
    );
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "TJSApplicationShell",
      options,
      id: create_fragment10.name
    });
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
};
var TJSApplicationShell_default = TJSApplicationShell;

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/component/core/dialog/DialogContent.svelte
var { Object: Object_12, console: console_1 } = globals;
var file10 = "node_modules\\@typhonjs-fvtt\\runtime\\_dist\\svelte\\component\\core\\dialog\\DialogContent.svelte";
function add_css9(target) {
  append_styles(target, "svelte-1mtdd5h", ".dialog-buttons.svelte-1mtdd5h{padding-top:8px}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlhbG9nQ29udGVudC5zdmVsdGUiLCJtYXBwaW5ncyI6IkFBZ1lHLDhCQUFBLENBQ0csV0FBQSxDQUFBLEdBQ0giLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiRGlhbG9nQ29udGVudC5zdmVsdGUiXX0= */");
}
function get_each_context3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[26] = list[i];
  return child_ctx;
}
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
    return {
      props: switch_instance_props,
      $$inline: true
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    ctx[16](switch_instance);
  }
  const block = {
    c: function create2() {
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
          switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx2));
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
      ctx[16](null);
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
    source: "(364:28) ",
    ctx
  });
  return block;
}
function create_if_block_2(ctx) {
  let html_tag;
  let html_anchor;
  const block = {
    c: function create2() {
      html_tag = new HtmlTag(false);
      html_anchor = empty();
      html_tag.a = html_anchor;
    },
    m: function mount(target, anchor) {
      html_tag.m(
        /*content*/
        ctx[3],
        target,
        anchor
      );
      insert_dev(target, html_anchor, anchor);
    },
    p: function update(ctx2, dirty) {
      if (dirty & /*content*/
      8)
        html_tag.p(
          /*content*/
          ctx2[3]
        );
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(html_anchor);
      if (detaching)
        html_tag.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block_2.name,
    type: "if",
    source: "(362:6) {#if typeof content === 'string'}",
    ctx
  });
  return block;
}
function create_if_block8(ctx) {
  let div2;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let each_value = (
    /*buttons*/
    ctx[1]
  );
  validate_each_argument(each_value);
  const get_key = (ctx2) => (
    /*button*/
    ctx2[26].id
  );
  validate_each_keys(ctx, each_value, get_each_context3, get_key);
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context3(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block3(key, child_ctx));
  }
  const block = {
    c: function create2() {
      div2 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr_dev(div2, "class", "dialog-buttons svelte-1mtdd5h");
      add_location(div2, file10, 369, 3, 12298);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div2, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div2, null);
        }
      }
      ctx[20](div2);
    },
    p: function update(ctx2, dirty) {
      if (dirty & /*buttons, onClick, currentButtonId*/
      530) {
        each_value = /*buttons*/
        ctx2[1];
        validate_each_argument(each_value);
        validate_each_keys(ctx2, each_value, get_each_context3, get_key);
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, div2, destroy_block, create_each_block3, null, get_each_context3);
      }
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div2);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
      ctx[20](null);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block8.name,
    type: "if",
    source: "(369:3) {#if buttons.length}",
    ctx
  });
  return block;
}
function create_if_block_12(ctx) {
  let html_tag;
  let raw_value = (
    /*button*/
    ctx[26].icon + ""
  );
  let html_anchor;
  const block = {
    c: function create2() {
      html_tag = new HtmlTag(false);
      html_anchor = empty();
      html_tag.a = html_anchor;
    },
    m: function mount(target, anchor) {
      html_tag.m(raw_value, target, anchor);
      insert_dev(target, html_anchor, anchor);
    },
    p: function update(ctx2, dirty) {
      if (dirty & /*buttons*/
      2 && raw_value !== (raw_value = /*button*/
      ctx2[26].icon + ""))
        html_tag.p(raw_value);
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
    id: create_if_block_12.name,
    type: "if",
    source: "(377:36) {#if button.icon}",
    ctx
  });
  return block;
}
function create_each_block3(key_1, ctx) {
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
    ctx[26].icon && create_if_block_12(ctx)
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
  const block = {
    key: key_1,
    first: null,
    c: function create2() {
      button = element("button");
      span = element("span");
      if (if_block)
        if_block.c();
      t0 = text(t0_value);
      t1 = space();
      attr_dev(span, "title", span_title_value = /*button*/
      ctx[26].title);
      add_location(span, file10, 376, 9, 12673);
      attr_dev(button, "class", button_class_value = "dialog-button " + /*button*/
      ctx[26].id + " svelte-1mtdd5h");
      button.disabled = button_disabled_value = /*button*/
      ctx[26].disabled;
      add_location(button, file10, 371, 6, 12397);
      this.first = button;
    },
    m: function mount(target, anchor) {
      insert_dev(target, button, anchor);
      append_dev(button, span);
      if (if_block)
        if_block.m(span, null);
      append_dev(span, t0);
      append_dev(button, t1);
      if (!mounted) {
        dispose = [
          listen_dev(button, "click", stop_propagation(prevent_default(click_handler)), false, true, true, false),
          listen_dev(button, "focus", focus_handler, false, false, false, false),
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
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      if (
        /*button*/
        ctx[26].icon
      ) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block_12(ctx);
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
        set_data_dev(t0, t0_value);
      if (dirty & /*buttons*/
      2 && span_title_value !== (span_title_value = /*button*/
      ctx[26].title)) {
        attr_dev(span, "title", span_title_value);
      }
      if (dirty & /*buttons*/
      2 && button_class_value !== (button_class_value = "dialog-button " + /*button*/
      ctx[26].id + " svelte-1mtdd5h")) {
        attr_dev(button, "class", button_class_value);
      }
      if (dirty & /*buttons*/
      2 && button_disabled_value !== (button_disabled_value = /*button*/
      ctx[26].disabled)) {
        prop_dev(button, "disabled", button_disabled_value);
      }
      if (applyStyles_action && is_function(applyStyles_action.update) && dirty & /*buttons*/
      2)
        applyStyles_action.update.call(
          null,
          /*button*/
          ctx[26].styles
        );
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(button);
      if (if_block)
        if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_each_block3.name,
    type: "each",
    source: "(371:6) {#each buttons as button (button.id)}",
    ctx
  });
  return block;
}
function create_fragment11(ctx) {
  let main;
  let div2;
  let current_block_type_index;
  let if_block0;
  let t;
  let current;
  const if_block_creators = [create_if_block_2, create_if_block_3];
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
  if (~(current_block_type_index = select_block_type(ctx, -1))) {
    if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  let if_block1 = (
    /*buttons*/
    ctx[1].length && create_if_block8(ctx)
  );
  const block = {
    c: function create2() {
      main = element("main");
      div2 = element("div");
      if (if_block0)
        if_block0.c();
      t = space();
      if (if_block1)
        if_block1.c();
      attr_dev(div2, "class", "dialog-content");
      add_location(div2, file10, 360, 3, 12011);
      add_location(main, file10, 359, 0, 12001);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, main, anchor);
      append_dev(main, div2);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(div2, null);
      }
      ctx[17](div2);
      append_dev(main, t);
      if (if_block1)
        if_block1.m(main, null);
      current = true;
    },
    p: function update(ctx2, [dirty]) {
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
          if_block0.m(div2, null);
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
          if_block1 = create_if_block8(ctx2);
          if_block1.c();
          if_block1.m(main, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(if_block0);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block0);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(main);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
      ctx[17](null);
      if (if_block1)
        if_block1.d();
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
var s_REGEX_HTML2 = /^\s*<.*>$/;
function instance11($$self, $$props, $$invalidate) {
  let autoClose;
  let focusFirst;
  let resolveId;
  let $elementRoot;
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("DialogContent", slots, []);
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
  validate_store(elementRoot, "elementRoot");
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
      const callback = button == null ? void 0 : button.onPress;
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
            } else if (typeof (dialogComponent == null ? void 0 : dialogComponent[callback]) !== "function") {
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
  const writable_props = ["data", "preventDefault", "stopPropagation", "dialogComponent"];
  Object_12.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console_1.warn(`<DialogContent> was created with unknown prop '${key}'`);
  });
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
  $$self.$capture_state = () => ({
    getContext,
    onDestroy,
    onMount,
    applyStyles,
    localize,
    A11yHelper,
    isObject,
    isSvelteComponent,
    parseSvelteConfig,
    data,
    preventDefault,
    stopPropagation,
    dialogComponent,
    s_REGEX_HTML: s_REGEX_HTML2,
    buttons,
    contentEl,
    buttonsEl,
    content,
    dialogClass,
    dialogProps,
    elementRoot,
    application,
    managedPromise,
    currentButtonId,
    onClick,
    onKeydown,
    onKeyup,
    autoClose,
    resolveId,
    focusFirst,
    $elementRoot
  });
  $$self.$inject_state = ($$props2) => {
    if ("data" in $$props2)
      $$invalidate(10, data = $$props2.data);
    if ("preventDefault" in $$props2)
      $$invalidate(11, preventDefault = $$props2.preventDefault);
    if ("stopPropagation" in $$props2)
      $$invalidate(12, stopPropagation = $$props2.stopPropagation);
    if ("dialogComponent" in $$props2)
      $$invalidate(0, dialogComponent = $$props2.dialogComponent);
    if ("buttons" in $$props2)
      $$invalidate(1, buttons = $$props2.buttons);
    if ("contentEl" in $$props2)
      $$invalidate(5, contentEl = $$props2.contentEl);
    if ("buttonsEl" in $$props2)
      $$invalidate(2, buttonsEl = $$props2.buttonsEl);
    if ("content" in $$props2)
      $$invalidate(3, content = $$props2.content);
    if ("dialogClass" in $$props2)
      $$invalidate(6, dialogClass = $$props2.dialogClass);
    if ("dialogProps" in $$props2)
      $$invalidate(7, dialogProps = $$props2.dialogProps);
    if ("elementRoot" in $$props2)
      $$invalidate(8, elementRoot = $$props2.elementRoot);
    if ("application" in $$props2)
      $$invalidate(22, application = $$props2.application);
    if ("managedPromise" in $$props2)
      managedPromise = $$props2.managedPromise;
    if ("currentButtonId" in $$props2)
      $$invalidate(4, currentButtonId = $$props2.currentButtonId);
    if ("autoClose" in $$props2)
      $$invalidate(13, autoClose = $$props2.autoClose);
    if ("resolveId" in $$props2)
      resolveId = $$props2.resolveId;
    if ("focusFirst" in $$props2)
      $$invalidate(14, focusFirst = $$props2.focusFirst);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    var _a, _b;
    if ($$self.$$.dirty & /*$elementRoot*/
    32768) {
      $:
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
      $:
        $$invalidate(13, autoClose = typeof data.autoClose === "boolean" ? data.autoClose : true);
    }
    if ($$self.$$.dirty & /*data*/
    1024) {
      $:
        $$invalidate(14, focusFirst = typeof data.focusFirst === "boolean" ? data.focusFirst : false);
    }
    if ($$self.$$.dirty & /*data*/
    1024) {
      $: {
        $$invalidate(1, buttons = !isObject(data.buttons) ? [] : Object.keys(data.buttons).reduce(
          (array, key) => {
            const b = data.buttons[key];
            const icon = typeof b.icon !== "string" ? void 0 : s_REGEX_HTML2.test(b.icon) ? b.icon : `<i class="${b.icon}"></i>`;
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
      $:
        if (!buttons.find((button) => button.id === currentButtonId)) {
          $$invalidate(4, currentButtonId = void 0);
        }
    }
    if ($$self.$$.dirty & /*focusFirst, buttonsEl, currentButtonId*/
    16404) {
      $:
        if (!focusFirst && buttonsEl instanceof HTMLElement) {
          const buttonEl = buttonsEl.querySelector(`.${currentButtonId}`);
          if (buttonEl instanceof HTMLElement) {
            buttonEl.focus();
          }
        }
    }
    if ($$self.$$.dirty & /*data*/
    1024) {
      $:
        resolveId = typeof data.resolveId === "boolean" ? data.resolveId : false;
    }
    if ($$self.$$.dirty & /*content, data*/
    1032) {
      $:
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
              const children = (_b = (_a = svelteConfig == null ? void 0 : svelteConfig.context) == null ? void 0 : _a.get("external")) == null ? void 0 : _b.children;
              if (Array.isArray(children)) {
                $$invalidate(7, dialogProps.children = children, dialogProps);
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
var DialogContent = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(
      this,
      options,
      instance11,
      create_fragment11,
      safe_not_equal,
      {
        data: 10,
        preventDefault: 11,
        stopPropagation: 12,
        dialogComponent: 0
      },
      add_css9
    );
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "DialogContent",
      options,
      id: create_fragment11.name
    });
  }
  get data() {
    throw new Error("<DialogContent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set data(value) {
    throw new Error("<DialogContent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get preventDefault() {
    throw new Error("<DialogContent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set preventDefault(value) {
    throw new Error("<DialogContent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get stopPropagation() {
    throw new Error("<DialogContent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set stopPropagation(value) {
    throw new Error("<DialogContent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get dialogComponent() {
    throw new Error("<DialogContent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set dialogComponent(value) {
    throw new Error("<DialogContent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var DialogContent_default = DialogContent;

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/component/core/dialog/DialogShell.svelte
function create_else_block5(ctx) {
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
  function applicationshell_elementContent_binding_1(value) {
    ctx[15](value);
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
  applicationshell = new ApplicationShell_default({
    props: applicationshell_props,
    $$inline: true
  });
  binding_callbacks.push(() => bind(applicationshell, "elementRoot", applicationshell_elementRoot_binding_1));
  binding_callbacks.push(() => bind(applicationshell, "elementContent", applicationshell_elementContent_binding_1));
  const block = {
    c: function create2() {
      create_component(applicationshell.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(applicationshell, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const applicationshell_changes = dirty & /*appProps*/
      64 ? get_spread_update(applicationshell_spread_levels, [
        get_spread_object(
          /*appProps*/
          ctx2[6]
        ),
        applicationshell_spread_levels[1]
      ]) : {};
      if (dirty & /*$$scope, data, dialogComponent*/
      2097164) {
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
    i: function intro(local) {
      if (current)
        return;
      transition_in(applicationshell.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(applicationshell.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(applicationshell, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_else_block5.name,
    type: "else",
    source: "(293:0) {:else}",
    ctx
  });
  return block;
}
function create_if_block9(ctx) {
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
    $$slots: { default: [create_default_slot] },
    $$scope: { ctx }
  };
  for (let i = 0; i < tjsglasspane_spread_levels.length; i += 1) {
    tjsglasspane_props = assign(tjsglasspane_props, tjsglasspane_spread_levels[i]);
  }
  tjsglasspane = new TJSGlassPane_default({
    props: tjsglasspane_props,
    $$inline: true
  });
  const block = {
    c: function create2() {
      create_component(tjsglasspane.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(tjsglasspane, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
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
      2097231) {
        tjsglasspane_changes.$$scope = { dirty, ctx: ctx2 };
      }
      tjsglasspane.$set(tjsglasspane_changes);
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(tjsglasspane.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(tjsglasspane.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(tjsglasspane, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_if_block9.name,
    type: "if",
    source: "(287:0) {#if modal}",
    ctx
  });
  return block;
}
function create_default_slot_2(ctx) {
  let dialogcontent;
  let updating_dialogComponent;
  let current;
  function dialogcontent_dialogComponent_binding_1(value) {
    ctx[13](value);
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
  dialogcontent = new DialogContent_default({
    props: dialogcontent_props,
    $$inline: true
  });
  binding_callbacks.push(() => bind(dialogcontent, "dialogComponent", dialogcontent_dialogComponent_binding_1));
  const block = {
    c: function create2() {
      create_component(dialogcontent.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(dialogcontent, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
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
    i: function intro(local) {
      if (current)
        return;
      transition_in(dialogcontent.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(dialogcontent.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(dialogcontent, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_2.name,
    type: "slot",
    source: "(294:3) <ApplicationShell bind:elementRoot bind:elementContent {...appProps} appOffsetHeight={true}>",
    ctx
  });
  return block;
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
  dialogcontent = new DialogContent_default({
    props: dialogcontent_props,
    $$inline: true
  });
  binding_callbacks.push(() => bind(dialogcontent, "dialogComponent", dialogcontent_dialogComponent_binding));
  const block = {
    c: function create2() {
      create_component(dialogcontent.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(dialogcontent, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
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
    i: function intro(local) {
      if (current)
        return;
      transition_in(dialogcontent.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(dialogcontent.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(dialogcontent, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_1.name,
    type: "slot",
    source: "(289:6) <ApplicationShell bind:elementRoot bind:elementContent {...appProps} appOffsetHeight={true}>",
    ctx
  });
  return block;
}
function create_default_slot(ctx) {
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
  applicationshell = new ApplicationShell_default({
    props: applicationshell_props,
    $$inline: true
  });
  binding_callbacks.push(() => bind(applicationshell, "elementRoot", applicationshell_elementRoot_binding));
  binding_callbacks.push(() => bind(applicationshell, "elementContent", applicationshell_elementContent_binding));
  const block = {
    c: function create2() {
      create_component(applicationshell.$$.fragment);
    },
    m: function mount(target, anchor) {
      mount_component(applicationshell, target, anchor);
      current = true;
    },
    p: function update(ctx2, dirty) {
      const applicationshell_changes = dirty & /*appProps*/
      64 ? get_spread_update(applicationshell_spread_levels, [
        get_spread_object(
          /*appProps*/
          ctx2[6]
        ),
        applicationshell_spread_levels[1]
      ]) : {};
      if (dirty & /*$$scope, data, dialogComponent*/
      2097164) {
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
    i: function intro(local) {
      if (current)
        return;
      transition_in(applicationshell.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(applicationshell.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(applicationshell, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot.name,
    type: "slot",
    source: "(288:3) <TJSGlassPane id={`${application.id}-glasspane`} {...modalProps} {zIndex}>",
    ctx
  });
  return block;
}
function create_fragment12(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block9, create_else_block5];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*modal*/
      ctx2[5]
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx, -1);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  const block = {
    c: function create2() {
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
    id: create_fragment12.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
var s_MODAL_BACKGROUND = "#50505080";
function instance12($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("DialogShell", slots, []);
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
  let minimizable = true;
  if (modal === void 0) {
    modal = typeof (data == null ? void 0 : data.modal) === "boolean" ? data.modal : false;
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
  const writable_props = ["elementContent", "elementRoot", "data", "dialogComponent", "managedPromise"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<DialogShell> was created with unknown prop '${key}'`);
  });
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
  $$self.$capture_state = () => ({
    getContext,
    onDestroy,
    onMount,
    setContext,
    fade,
    isObject,
    ApplicationShell: ApplicationShell_default,
    DialogContent: DialogContent_default,
    TJSGlassPane: TJSGlassPane_default,
    elementContent,
    elementRoot,
    data,
    dialogComponent,
    managedPromise,
    application,
    s_MODAL_TRANSITION,
    s_MODAL_TRANSITION_OPTIONS,
    s_MODAL_BACKGROUND,
    modal,
    appProps,
    modalProps,
    zIndex,
    minimizable,
    onKeydown,
    onKeydownModal
  });
  $$self.$inject_state = ($$props2) => {
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
    if ("modal" in $$props2)
      $$invalidate(5, modal = $$props2.modal);
    if ("zIndex" in $$props2)
      $$invalidate(8, zIndex = $$props2.zIndex);
    if ("minimizable" in $$props2)
      minimizable = $$props2.minimizable;
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  $$self.$$.update = () => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if ($$self.$$.dirty & /*elementRoot, modal*/
    33) {
      $:
        if (elementRoot instanceof HTMLElement) {
          elementRoot.setAttribute("role", "dialog");
          if (modal) {
            elementRoot.setAttribute("aria-modal", "true");
          }
        }
    }
    if ($$self.$$.dirty & /*data, modal, zIndex, application*/
    312) {
      $:
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
          if (newTitle !== ((_a = application == null ? void 0 : application.options) == null ? void 0 : _a.title)) {
            $$invalidate(4, application.reactive.title = newTitle, application);
          }
          if (application.position.zIndex !== zIndex) {
            $$invalidate(4, application.position.zIndex = zIndex, application);
          }
        }
    }
    if ($$self.$$.dirty & /*data, appProps*/
    72) {
      $:
        if (isObject(data == null ? void 0 : data.transition)) {
          const d = data.transition;
          if ((d == null ? void 0 : d.transition) !== appProps.transition) {
            $$invalidate(6, appProps.transition = d.transition, appProps);
          }
          if ((d == null ? void 0 : d.inTransition) !== appProps.inTransition) {
            $$invalidate(6, appProps.inTransition = d.inTransition, appProps);
          }
          if ((d == null ? void 0 : d.outTransition) !== appProps.outTransition) {
            $$invalidate(6, appProps.outTransition = d.outTransition, appProps);
          }
          if ((d == null ? void 0 : d.transitionOptions) !== appProps.transitionOptions) {
            $$invalidate(6, appProps.transitionOptions = d.transitionOptions, appProps);
          }
          if ((d == null ? void 0 : d.inTransitionOptions) !== appProps.inTransitionOptions) {
            $$invalidate(6, appProps.inTransitionOptions = d.inTransitionOptions, appProps);
          }
          if ((d == null ? void 0 : d.outTransitionOptions) !== appProps.outTransitionOptions) {
            $$invalidate(6, appProps.outTransitionOptions = d.outTransitionOptions, appProps);
          }
        }
    }
    if ($$self.$$.dirty & /*data, modalProps*/
    136) {
      $: {
        const newModalBackground = typeof ((_b = data == null ? void 0 : data.modalOptions) == null ? void 0 : _b.background) === "string" ? data.modalOptions.background : s_MODAL_BACKGROUND;
        if (newModalBackground !== modalProps.background) {
          $$invalidate(7, modalProps.background = newModalBackground, modalProps);
        }
      }
    }
    if ($$self.$$.dirty & /*data, modalProps*/
    136) {
      $: {
        const newModalSlotSeparate = typeof ((_c = data == null ? void 0 : data.modalOptions) == null ? void 0 : _c.slotSeparate) === "boolean" ? data.modalOptions.slotSeparate : void 0;
        if (newModalSlotSeparate !== modalProps.slotSeparate) {
          $$invalidate(7, modalProps.slotSeparate = newModalSlotSeparate, modalProps);
        }
      }
    }
    if ($$self.$$.dirty & /*data, modalProps*/
    136) {
      $: {
        const newModalStyles = isObject((_d = data == null ? void 0 : data.modalOptions) == null ? void 0 : _d.styles) ? data.modalOptions.styles : void 0;
        if (newModalStyles !== modalProps.styles) {
          $$invalidate(7, modalProps.styles = newModalStyles, modalProps);
        }
      }
    }
    if ($$self.$$.dirty & /*data, modalProps*/
    136) {
      $:
        if (isObject((_e = data == null ? void 0 : data.modalOptions) == null ? void 0 : _e.transition)) {
          const d = data.modalOptions.transition;
          if ((d == null ? void 0 : d.transition) !== modalProps.transition) {
            $$invalidate(
              7,
              modalProps.transition = typeof (d == null ? void 0 : d.transition) === "function" ? d.transition : s_MODAL_TRANSITION,
              modalProps
            );
          }
          if ((d == null ? void 0 : d.inTransition) !== modalProps.inTransition) {
            $$invalidate(7, modalProps.inTransition = d.inTransition, modalProps);
          }
          if ((d == null ? void 0 : d.outTransition) !== modalProps.outTransition) {
            $$invalidate(7, modalProps.outTransition = d.outTransition, modalProps);
          }
          if ((d == null ? void 0 : d.transitionOptions) !== modalProps.transitionOptions) {
            $$invalidate(
              7,
              modalProps.transitionOptions = isObject(d == null ? void 0 : d.transitionOptions) ? d.transitionOptions : s_MODAL_TRANSITION_OPTIONS,
              modalProps
            );
          }
          if ((d == null ? void 0 : d.inTransitionOptions) !== modalProps.inTransitionOptions) {
            $$invalidate(7, modalProps.inTransitionOptions = d.inTransitionOptions, modalProps);
          }
          if ((d == null ? void 0 : d.outTransitionOptions) !== modalProps.outTransitionOptions) {
            $$invalidate(7, modalProps.outTransitionOptions = d.outTransitionOptions, modalProps);
          }
        } else {
          const newModalTransition = typeof ((_g = (_f = data == null ? void 0 : data.modalOptions) == null ? void 0 : _f.transition) == null ? void 0 : _g.transition) === "function" ? data.modalOptions.transition.transition : s_MODAL_TRANSITION;
          if (newModalTransition !== modalProps.transition) {
            $$invalidate(7, modalProps.transition = newModalTransition, modalProps);
          }
          const newModalTransitionOptions = isObject((_h = data == null ? void 0 : data.modalOptions) == null ? void 0 : _h.transitionOptions) ? data.modalOptions.transitionOptions : s_MODAL_TRANSITION_OPTIONS;
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
var DialogShell = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance12, create_fragment12, safe_not_equal, {
      elementContent: 1,
      elementRoot: 0,
      data: 3,
      dialogComponent: 2,
      managedPromise: 9
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "DialogShell",
      options,
      id: create_fragment12.name
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
};
var DialogShell_default = DialogShell;

// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/component/core/index.js
cssVariables.setProperties({
  // Anchor text shadow / header buttons
  "--tjs-default-text-shadow-focus-hover": "0 0 8px var(--color-shadow-primary)",
  // TJSApplicationShell app background.
  "--tjs-app-background": `url("${globalThis.foundry.utils.getRoute("/ui/denim075.png")}")`
}, false);

export {
  TJSContainer_default,
  TJSComponentShell_default,
  applyScrolltop,
  applyStyles,
  applyPosition,
  lerp$5,
  degToRad,
  mat4,
  vec3,
  slideFade,
  TJSGlassPane_default,
  AppShellContextInternal,
  TJSHeaderButton_default,
  TJSApplicationHeader_default,
  TJSFocusWrap_default,
  ApplicationShell_default,
  EmptyApplicationShell_default,
  TJSApplicationShell_default,
  DialogContent_default,
  DialogShell_default
};
//# sourceMappingURL=chunk-2NWJHYI2.js.map
