import { d10Roll } from "../../utils/d10.js";
import { promptSituationalBonus } from "../../lib/lib.js";

export default class LeobrewItem extends Item {


  getArmorBonus(bodyPart){
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

    // Construct parts
    const parts = ["@value"];
    const data = {
      value: this.system.level,
      bonus: this.parent.getBonusForSkill(this, options?.subSkill?.name)
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
        ui.notifications.error(`You can't use the "${this.name}" trait - it has no uses left!`)
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
