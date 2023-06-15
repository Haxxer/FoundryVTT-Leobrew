import DocumentSheetHelper from "../../lib/helper.js";
import { d10Roll } from "../../utils/d10.js";

export default class LeobrewActor extends Actor {

  get skills(){
    return this.items.filter(item => item.type === "skill");
  }

  get magicSkills(){
    return this.skills.filter(item => item.system.isMagic);
  }

  get regularItems(){
    return this.items.filter(item => item.type === "item");
  }

  get armorBonuses() {
    const items = this.items.filter(item => item.type === "item");
    return Object.entries(CONFIG.LEOBREW.bodyParts)
      .map(entry => {
        return {
          label: entry[1], value: items.map(item => item.getArmorBonus(entry[0])).reduce((acc, bonus) => {
            return acc + bonus;
          }, 0)
        }
      })
  }

  // Prepare Player type specific data
  prepareDerivedData() {
    super.prepareDerivedData();
    this._prepareDerivedResources();
  }

  _prepareDerivedResources(){

    for (let [r, res] of Object.entries(this.system.resources)) {
      res.enabled = true;
      res.max += res.bonus;
    }

    this.system.resources.mana.enabled = game.settings.get('leobrew', 'manaEnabled');
    this.system.resources.sanity.enabled = game.settings.get('leobrew', 'sanityEnabled');

    const mana = this.system.resources.mana;
    mana.max = 5;
    mana.max += this.system.abilities.will.value;
    mana.max += mana.bonus;
    mana.max += this.magicSkills.reduce((max, skill) => {
      return skill.value >= 5 && (skill.value * 3) > max
        ? skill.value * 3
        : max;
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

  rollGeneric(options = {}) {

    let title = game.i18n.format("LEOBREW.GenericSkillRollTitle");

    if (options?.extraFlavor) {
      title = `${title} (${options?.extraFlavor})`
    }

    // Roll and return
    const rollData = foundry.utils.mergeObject(options, {
      title: title,
      data: options.data,
      messageData: {
        speaker: options.speaker || ChatMessage.getSpeaker({ actor: this }),
        "flags.leobrew.roll": {
          type: "generic",
          actorUuid: this.uuid
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
  rollAbility(abilityId, options = {}) {

    const label = CONFIG.LEOBREW.abilities[abilityId];
    const abl = this.data.data.abilities[abilityId];

    // Construct parts
    const parts = ["@value+@bonus"];
    const data = { value: abl.value };

    // Add provided extra roll parts now because they will get clobbered by mergeObject below
    if (options.parts?.length > 0) {
      parts.push(...options.parts);
    }

    let title = game.i18n.format("LEOBREW.AbilityRollTitle", { ability: label });

    if (options?.extraFlavor) {
      title = `${title} (${options?.extraFlavor})`
    }

    // Roll and return
    const rollData = foundry.utils.mergeObject(options, {
      parts: parts,
      data: data,
      title: title,
      messageData: {
        speaker: options.speaker || ChatMessage.getSpeaker({ actor: this }), "flags.leobrew.roll": {
          type: "ability", abilityId, rollData: `data.abilities.${abilityId}`, actorId: this.id
        }
      }
    });

    return d10Roll(rollData);

  }
}
