import DocumentSheetHelper from "../../lib/helper.js";
import { d10Roll } from "../../utils/d10.js";
import { promptSituationalBonus } from "../../lib/lib.js";

export default class LeobrewActor extends Actor {

  get skills(){
    return this.items.filter(item => item.type === "skill");
  }

  get magicSkills(){
    return this.skills.filter(skill => skill.system.isMagic);
  }

  get regularItems(){
    return this.items.filter(item => item.type === "equipment");
  }

  get equippedItems(){
    return this.regularItems.filter(item => item.system.equipped);
  }

  get armorBonuses() {
    const items = this.equippedItems;
    return Object.entries(CONFIG.LEOBREW.bodyParts)
      .map(entry => {
        return {
          label: entry[1], value: items.map(item => item.getArmorBonus(entry[0])).reduce((acc, bonus) => {
            return acc + bonus;
          }, 0)
        }
      })
  }

  getBonusForSkill(skill, subSkill = false){
    return this.equippedItems
      .filter(item => item.system.tiedSkills[skill.id])
      .reduce((totalBonus, item) => {
        const tiedSkillConfig = item.system.tiedSkills[skill.id];
        tiedSkillConfig
          .filter(tiedSkill => {
            if(subSkill){
              return  subSkill === tiedSkill.name || !tiedSkill.isSubSkill
            }
            return !tiedSkill.isSubSkill;
          })
          .forEach(tiedSkill => {
          if(tiedSkill.bonus) {
            totalBonus += tiedSkill.bonus;
          }
        });
        return totalBonus;
      }, 0);
  }

  getSubSkills(skill){
    return this.equippedItems
      .filter(item => item.system.tiedSkills[skill.id] && item.system.tiedSkills[skill.id].some(tiedSkill => {
        return tiedSkill.isSubSkill;
      }))
      .map(item => {
        return item.system.tiedSkills[skill.id]
          .filter(tiedSkill => tiedSkill.isSubSkill);
      })
      .deepFlatten()
      .map(subSkill => foundry.utils.deepClone(subSkill))
      .map(subSkill => {
        subSkill.bonus += skill.system.level;
        return subSkill;
      })
      .sort((a, b) => a.name > b.name);
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
      return skill.system.level >= 5 && (skill.system.level * 3) > max
        ? skill.system.level * 3
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

  async rollGeneric(options = {}) {

    let title = game.i18n.format("LEOBREW.GenericSkillRollTitle");

    if (options?.event?.ctrlKey) {
      options.situationalBonus = await promptSituationalBonus(title);
    }

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

    // Construct parts
    const parts = ["@value"];
    const data = { value: abl.value, bonus: options?.bonus ?? 0 };

    if(data.bonus){
      parts.push("@bonus")
    }

    // Add provided extra roll parts now because they will get clobbered by mergeObject below
    if (options.parts?.length > 0) {
      parts.push(...options.parts);
    }

    if (options?.extraTitle) {
      label += ` (${options?.extraTitle})`
    }

    if (options?.event?.ctrlKey) {
      options.situationalBonus = await promptSituationalBonus(label);
    }

    let title = game.i18n.format("LEOBREW.AbilityRollTitle", { name: label });

    if (options?.extraFlavor) {
      title = `${title} (${options?.extraFlavor})`
    }

    // Roll and return
    const rollData = foundry.utils.mergeObject(options, {
      parts: parts,
      data: data,
      title: title,
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
