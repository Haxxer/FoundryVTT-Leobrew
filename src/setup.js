import LEOBREW from "./constants/config.js";
import LeobrewActorSheet from "./documents/actor/actor-sheet.js";
import LeobrewActor from "./documents/actor/actor.js";
import LeobrewItem from "./documents/item/item.js";
import LeobrewItemSheet from "./documents/item/item-sheet.js";
import ActorDataModel from "~/documents/actor/actor-data-model.js";
import EquipmentDataModel from "~/documents/item/Equipment/equipment-data-model.js";
import SkillDataModel from "~/documents/item/Skill/skill-data-model.js";
import TraitDataModel from "~/documents/item/Trait/trait-data-model.js";

export function setupSystem(){
  registerConstants();
  registerSheets();
  registerSettings();
}

function registerConstants(){

  CONFIG.Combat.initiative = {
    formula: "1d10",
    decimals: 2
  };

  CONFIG.LEOBREW = LEOBREW;

}

function registerSheets(){

  game.leobrew = {
    LeobrewActor,
    LeobrewItem,
  };

  CONFIG.Actor.documentClass = LeobrewActor;
	CONFIG.Actor.systemDataModels.character = ActorDataModel;

  CONFIG.Item.documentClass = LeobrewItem;
	CONFIG.Item.systemDataModels.equipment = EquipmentDataModel;
	CONFIG.Item.systemDataModels.skill = SkillDataModel;
	CONFIG.Item.systemDataModels.trait = TraitDataModel;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("leobrew", LeobrewActorSheet, { makeDefault: true, types: ["character"] })

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("leobrew", LeobrewItemSheet, { makeDefault: true, types: ['equipment', 'trait', 'skill'] });

}

export function setupLocalization() {

  // Localize CONFIG objects once up-front
  const toLocalize = ["currencies", "abilities", "abilityAbbreviations", "resources", "bodyParts"];

  // Exclude some from sorting where the default order matters
  const noSort = ["abilities", "currencies"];

  // Localize and sort CONFIG objects
  for (let o of toLocalize) {
    const localized = Object.entries(CONFIG.LEOBREW[o]).map(e => {
      return [e[0], game.i18n.localize(e[1])];
    });
    if (!noSort.includes(o)) localized.sort((a, b) => a[1].localeCompare(b[1]));
    CONFIG.LEOBREW[o] = localized.reduce((obj, e) => {
      obj[e[0]] = e[1];
      return obj;
    }, {});
  }

}

function registerSettings(){

  game.settings.register("leobrew", "darkModeSheets", {
    name: "Use dark mode sheets",
    hint: "Enabling this will make the sheets a beautiful dark tone.",
    scope: "client",
    config: true,
    default: false,
    type: Boolean
  });

  // Register initiative setting.
  game.settings.register("leobrew", "skillList", {
    scope: "world",
    type: Array,
    default: [],
    config: false
  });

  // // Define a settings submenu which handles advanced configuration needs
  // game.settings.registerMenu("leobrew", "skillListMenu", {
  //   name: "Custom Leobrew skill list",
  //   hint: "This defines a list of skills available by default to players",
  //   label: "Configure skill list",
  //   icon: "fas fa-bars",
  //   type: SkillConfigurerFormApplication,
  //   restricted: true
  // });

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
