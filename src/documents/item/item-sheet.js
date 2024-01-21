import SvelteDocumentSheet from "../base/document-sheet.js";
import ItemShell from "./item-shell.svelte";
import createItemSheetState from "./item-sheet-store.js";

export default class LeobrewItemSheet extends SvelteDocumentSheet {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 500,
      height: 400,
      svelte: {
        class: ItemShell,
        target: document.body
      }
    });
  }

  async _onDrop(event) {
    const doc = this.reactive.doc;
    if (!doc.isOwner || doc.type !== "skill") {
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
      isWeaponSkill: false,
    })
    return this.update({
      [`system.tiedSkills.${skill._id}`]: tiedSkills
    });
  }

  constructor(doc, options) {
    super(doc, options);
    this.reactive.state = createItemSheetState(doc);
  }
}
