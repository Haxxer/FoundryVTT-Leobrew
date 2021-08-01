/**
 * A simple and flexible system for world-building using an arbitrary collection of character and item attributes
 * Author: Atropos
 */

// Import Modules
import { LeobrewActor } from "./module/actor/entity.js";
import { LeobrewItem } from "./module/item/entity.js";
import { LeobrewItemSheet } from "./module/item/sheet.js";
import { LeobrewActorSheet } from "./module/actor/sheet.js";
import { LEOBREW } from "./module/config.js";
import * as chat from "./module/chat.js";
import { preloadHandlebarsTemplates } from "./module/templates.js";

/**
 * Init hook.
 */
Hooks.once("init", async function() {

	console.log(`Initializing D10 Homebrew System`);

	/**
	 * Set an initiative formula for the system. This will be updated later.
	 * @type {String}
	 */
	CONFIG.Combat.initiative = {
		formula: "1d10",
		decimals: 2
	};

	game.leobrew = {
		LeobrewActor: LeobrewActor,
		LeobrewItem: LeobrewItem
	};

	CONFIG.LEOBREW = LEOBREW;

	// Define custom Entity classes
	CONFIG.Actor.documentClass = LeobrewActor;
	CONFIG.Item.documentClass = LeobrewItem;

	// Register sheet application classes
	Actors.unregisterSheet("core", ActorSheet);
	Actors.registerSheet("leobrew", LeobrewActorSheet, { makeDefault: true })

	Items.unregisterSheet("core", ItemSheet);
	Items.registerSheet("leobrew", LeobrewItemSheet, { makeDefault: true });

	// Register initiative setting.
	game.settings.register("leobrew", "initFormula", {
		name: "SETTINGS.SimpleInitFormulaN",
		hint: "SETTINGS.SimpleInitFormulaL",
		scope: "world",
		type: String,
		default: "1d10",
		config: true,
		onChange: formula => _simpleUpdateInit(formula, true)
	});

	// Retrieve and assign the initiative formula setting.
	const initFormula = game.settings.get("leobrew", "initFormula");
	_simpleUpdateInit(initFormula);

	/**
	 * Update the initiative formula.
	 * @param {string} formula - Dice formula to evaluate.
	 * @param {boolean} notify - Whether or not to post nofications.
	 */
	function _simpleUpdateInit(formula, notify = false) {
		const isValid = Roll.validate(formula);
		if ( !isValid ) {
			if ( notify ) ui.notifications.error(`${game.i18n.localize("LEOBREW.NotifyInitFormulaInvalid")}: ${formula}`);
			return;
		}
		CONFIG.Combat.initiative.formula = formula;
	}

	/**
	 * Slugify a string.
	 */
	Handlebars.registerHelper('slugify', function(value) {
		return value.slugify({strict: true});
	});

	// Preload template partials
	await preloadHandlebarsTemplates();
});

/**
 * This function runs after game data has been requested and loaded from the servers, so entities exist
 */
Hooks.once("setup", function() {

	// Localize CONFIG objects once up-front
	const toLocalize = [
		"currencies", "abilities", "abilityAbbreviations", "weapons", "magic", "languages", "skills", "skillList", "resources"
	];

	// Exclude some from sorting where the default order matters
	const noSort = [
		"abilities", "weapons", "currencies"
	];

	// Localize and sort CONFIG objects
	for ( let o of toLocalize ) {
		const localized = Object.entries(CONFIG.LEOBREW[o]).map(e => {
			return [e[0], game.i18n.localize(e[1])];
		});
		if ( !noSort.includes(o) ) localized.sort((a, b) => a[1].localeCompare(b[1]));
		CONFIG.LEOBREW[o] = localized.reduce((obj, e) => {
			obj[e[0]] = e[1];
			return obj;
		}, {});
	}
})


Hooks.on("renderChatMessage", (app, html, data) => {
	chat.displayChatActionButtons(app, html, data);
	chat.highlightCriticalSuccessFailure(app, html);
});

Hooks.on("createChatMessage", (app, html, data) => {
	chat.automateCriticalSuccessFailure(app, html);
});

Hooks.on("renderChatLog", (app, html, data) => LeobrewActor.chatListeners(html));

/**
 * Adds the actor template context menu.
 */
Hooks.on("getActorDirectoryEntryContext", (html, options) => {
	// Define an actor as a template.
	options.push({
		name: game.i18n.localize("LEOBREW.DefineTemplate"),
		icon: '<i class="fas fa-stamp"></i>',
		condition: li => {
			const actor = game.actors.get(li.data("entityId"));
			return !actor.getFlag("leobrew", "isTemplate");
		},
		callback: li => {
			const actor = game.actors.get(li.data("entityId"));
			actor.setFlag("leobrew", "isTemplate", true);
		}
	});

	// Undefine an actor as a template.
	options.push({
		name: game.i18n.localize("LEOBREW.UnsetTemplate"),
		icon: '<i class="fas fa-times"></i>',
		condition: li => {
			const actor = game.actors.get(li.data("entityId"));
			return actor.getFlag("leobrew", "isTemplate");
		},
		callback: li => {
			const actor = game.actors.get(li.data("entityId"));
			actor.setFlag("leobrew", "isTemplate", false);
		}
	});
});

/**
 * Adds the item template context menu.
 */
Hooks.on("getItemDirectoryEntryContext", (html, options) => {
	// Define an item as a template.
	options.push({
		name: game.i18n.localize("LEOBREW.DefineTemplate"),
		icon: '<i class="fas fa-stamp"></i>',
		condition: li => {
			const item = game.items.get(li.data("entityId"));
			return !item.getFlag("leobrew", "isTemplate");
		},
		callback: li => {
			const item = game.items.get(li.data("entityId"));
			item.setFlag("leobrew", "isTemplate", true);
		}
	});

	// Undefine an item as a template.
	options.push({
		name: game.i18n.localize("LEOBREW.UnsetTemplate"),
		icon: '<i class="fas fa-times"></i>',
		condition: li => {
			const item = game.items.get(li.data("entityId"));
			return item.getFlag("leobrew", "isTemplate");
		},
		callback: li => {
			const item = game.items.get(li.data("entityId"));
			item.setFlag("leobrew", "isTemplate", false);
		}
	});
});
