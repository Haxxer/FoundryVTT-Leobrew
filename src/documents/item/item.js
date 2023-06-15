import { d10Roll } from "../../utils/d10.js";

export default class LeobrewItem extends Item {

  /**
   * Roll an Ability Test
   * @param {Object} options      Options which configure how ability tests are rolled
   * @return {Promise<d10Roll>}      A Promise which resolves to the created Roll instance
   */
  roll(options = {}) {

    if (!this.parent) {
      throw new Error("Cannot roll unowned items!")
    }

    const bonus = this.parent?.regularItems
      .filter(item => item.type === "item" && item.system.equipped)
      .reduce((acc, item) => {
        return acc + item.bonusForSkill(this);
      }, options.bonus ?? 0);

    // Construct parts
    const parts = ["@value"];
    const data = { value: this.system.level, bonus };

    if (bonus) {
      parts.push("@bonus")
    }

    // Add provided extra roll parts now because they will get clobbered by mergeObject below
    if (options.parts?.length > 0) {
      parts.push(...options.parts);
    }

    let title = game.i18n.format("LEOBREW.SkillRollTitle", { skill: this.name })

    if (options?.extraFlavor) {
      title += ` (${options?.extraFlavor})`;
    }

    // Roll and return
    const rollData = foundry.utils.mergeObject(options, {
      parts: parts, data: data, title: title, messageData: {
        speaker: options.speaker || ChatMessage.getSpeaker({ actor: this.parent }),
        "flags.leobrew.roll": {
          type: "skill",
          source: this.uuid
        }
      }
    });

    return d10Roll(rollData);
  }

}
