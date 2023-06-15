// node_modules/@typhonjs-fvtt/runtime/_dist/svelte/helper/index.js
function radioBoxes(name, choices, options) {
  const checked = options["checked"] || null;
  const localize2 = options["localize"] || false;
  let html = "";
  for (let [key, label] of Object.entries(choices)) {
    if (localize2) {
      label = globalThis.game.i18n.localize(label);
    }
    const isChecked = checked === key;
    html += `<label class="checkbox"><input type="radio" name="${name}" value="${key}" ${isChecked ? "checked" : ""}> ${label}</label>`;
  }
  return new globalThis.Handlebars.SafeString(html);
}
function selectOptions(choices, options) {
  const { localize: localize2 = false, blank = null, sort = false, nameAttr, labelAttr, inverted } = options;
  let { selected = null } = options;
  selected = selected instanceof Array ? selected.map(String) : [String(selected)];
  const selectChoices = [];
  if (choices instanceof Array) {
    for (const choice of choices) {
      const name = String(choice[nameAttr]);
      let label = choice[labelAttr];
      if (localize2) {
        label = globalThis.game.i18n.localize(label);
      }
      selectChoices.push({ name, label });
    }
  } else {
    for (const choice of Object.entries(choices)) {
      const [key, value] = inverted ? choice.reverse() : choice;
      const name = String(nameAttr ? value[nameAttr] : key);
      let label = labelAttr ? value[labelAttr] : value;
      if (localize2) {
        label = globalThis.game.i18n.localize(label);
      }
      selectChoices.push({ name, label });
    }
  }
  if (sort) {
    selectChoices.sort((a, b) => a.label.localeCompare(b.label));
  }
  if (blank !== null) {
    const label = localize2 ? globalThis.game.i18n.localize(blank) : blank;
    selectChoices.unshift({ name: "", label });
  }
  let html = "";
  for (const option of selectChoices) {
    const label = globalThis.Handlebars.escapeExpression(option.label);
    const isSelected = selected.includes(option.name);
    html += `<option value="${option.name}" ${isSelected ? "selected" : ""}>${label}</option>`;
  }
  return new globalThis.Handlebars.SafeString(html);
}
function localize(stringId, data) {
  const result = typeof data !== "object" ? globalThis.game.i18n.localize(stringId) : globalThis.game.i18n.format(stringId, data);
  return result !== void 0 ? result : "";
}

export {
  radioBoxes,
  selectOptions,
  localize
};
//# sourceMappingURL=chunk-O4YYAJH7.js.map
