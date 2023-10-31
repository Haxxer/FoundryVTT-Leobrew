import { d10Roll } from "~/utils/d10.js";
import { promptSituationalBonus } from "~/lib/lib.js";
import { propertyStore } from '#runtime/svelte/store/writable-derived';
import { writable } from "svelte/store";

export default class LeobrewItem extends Item {

  #derived = {
    bonus: 0,
    subSkills: []
  };

  /** @type {ActorStores} */
  #stores;

  constructor(...args) {
    super(...args);
    const derivedWritable = writable(this.#derived);
    this.#stores = {
      bonus: propertyStore(derivedWritable, "bonus"),
      subSkills: propertyStore(derivedWritable, "subSkills"),
    };
  }

  get stores() {
    return this.#stores;
  }

  get bonus() {
    return this.#derived.bonus;
  }

  set bonus(newValue) {
    this.#stores.bonus.set(newValue);
  }

  get subSkills() {
    return this.#derived.subSkills;
  }

  set subSkills(newValue) {
    this.#stores.subSkills.set(newValue);
  }

  // Prepare Player type specific data
  prepareDerivedData() {
    super.prepareDerivedData();
    this._prepareDerivedBonuses();
  }

  _prepareDerivedBonuses() {
    if (!this.parent) return;
    if (this.type === "skill") {
      this.bonus = this.getBonus();
      this.subSkills = this.getSubSkills();
    } else if (this.type === "equipment") {
      this.getTiedSkills().forEach(skill => {
        skill.prepareDerivedData();
      });
    }
  }

  getTiedSkills() {
    return Object.keys(this.system.tiedSkills ?? {})
      .map(id => this.parent.items.get(id))
      .filter(Boolean);
  }

  getBonus(subSkillName) {
    return this.parent.equipmentSkills
      .filter(item => item.system.tiedSkills[this.id])
      .reduce((totalBonus, item) => {
        const tiedSkillConfig = item.system.tiedSkills[this.id];
        tiedSkillConfig
          .filter(tiedSkill => {
            if (subSkillName) {
              return subSkillName === tiedSkill.name || !tiedSkill.isSubSkill
            }
            return !tiedSkill.isSubSkill;
          })
          .forEach(tiedSkill => {
            if (tiedSkill.bonus) {
              totalBonus += tiedSkill.bonus || 0;
            }
          });
        return totalBonus;
      }, 0);
  }

  getSubSkills() {
    return this.parent.equipmentSkills
      .filter(item => item.system.tiedSkills[this.id] && item.system.tiedSkills[this.id].some(tiedSkill => {
        return tiedSkill.isSubSkill;
      }))
      .map(item => {
        return item.system.tiedSkills[this.id]
          .filter(tiedSkill => tiedSkill.isSubSkill);
      })
      .deepFlatten()
      .map(subSkill => foundry.utils.deepClone(subSkill))
      .map(subSkill => {
        subSkill.bonus += this.system.level + (this.bonus || 0);
        return subSkill;
      })
      .sort((a, b) => a.name > b.name);
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
      throw new Error("Cannot roll unowned items!")
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

    // Construct parts
    const parts = ["@value"];
    const data = {
      value: this.system.level,
      bonus: this.getBonus(options?.subSkill?.name)
    };

    if (data.bonus) {
      parts.push("@bonus")
    }

    // Add provided extra roll parts now because they will get clobbered by mergeObject below
    if (options.parts?.length > 0) {
      parts.push(...options.parts);
    }

    let name = this.name;

    if (options?.event?.ctrlKey) {
      options.situationalBonus = await promptSituationalBonus(name);
    }

    if (options?.extraTitle) {
      name += ` (${options?.extraTitle})`
    }

    let title = game.i18n.format("LEOBREW.SkillRollTitle", { category: this.system.category, name })

    if (options?.extraFlavor) {
      title += ` (${options?.extraFlavor})`;
    }

    // Roll and return
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
        ui.notifications.error(`You can't use the "${this.name}" trait - it has no uses left!`)
        return false;
      }

      await this.update({
        "system.uses.value": uses.value - 1
      });

    }

    return this.#showDescription(options);

  }

  async #rollEquipment(options = {}) {

    // Construct parts
    const parts = ["@value"];
    const data = {
      value: this.system.skillBonus
    };

    if (data.bonus) {
      parts.push("@bonus")
    }

    // Add provided extra roll parts now because they will get clobbered by mergeObject below
    if (options.parts?.length > 0) {
      parts.push(...options.parts);
    }

    let name = this.name;

    if (options?.event?.ctrlKey) {
      options.situationalBonus = await promptSituationalBonus(name);
    }

    if (this.system.skillLabel) {
      name += ` (${this.system.skillLabel})`
    }

    let title = game.i18n.format("LEOBREW.SkillRollTitle", { category: "Equipment", name })

    if (options?.extraFlavor) {
      title += ` (${options?.extraFlavor})`;
    }

    // Roll and return
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
        ui.notifications.error(`You can't use the "${this.name}" item - it has no quantity left!`)
        return false;
      }

      await this.update({
        "system.quantity": this.system.quantity - 1
      });

    }

    return this.#showDescription(options);

  }

  async #showDescription({ rollMode, createMessage = true } = {}) {

    // Render the chat card template
    const templateData = {
      actor: this.parent,
      item: this
    };

    const html = await renderTemplate("systems/leobrew/templates/chat/item-card.html", templateData);

    // Create the ChatMessage data object
    const chatData = {
      user: game.userId,
      type: CONST.CHAT_MESSAGE_TYPES.OTHER,
      content: html,
      speaker: ChatMessage.getSpeaker({ actor: this.parent })
    };

    // Apply the roll mode to adjust message visibility
    ChatMessage.applyRollMode(chatData, rollMode || game.settings.get("core", "rollMode"));

    // Create the Chat Message or return its data
    return createMessage ? ChatMessage.create(chatData) : chatData;

  }

}

/**
 * @typedef ActorStores
 *
 * @property {import('svelte/store').Writable<number>} Value 1
 */
