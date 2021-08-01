import { d10Roll } from "../dice/d10.js";
import * as Dialogs from "../dialogs.js";
import {EntitySheetHelper} from "../helper.js";

/**
 * Extend the base Actor document to support attributes and groups with a custom template creation dialog.
 * @extends {Actor}
 */
export class LeobrewActor extends Actor {

	/* -------------------------------------------- */

	/** @override */
	static async createDialog(data={}, options={}) {
		return EntitySheetHelper.createDialog.call(this, data, options);
	}

	/* -------------------------------------------- */
	/*  Chat Message Helpers                        */
	/* -------------------------------------------- */

	static chatListeners(html){
		html.on('click', '.confirm-button', this._onChatCardAction.bind(this));
	}

	/* -------------------------------------------- */
	/**
	 * Handle execution of a chat card action via a click event on one of the card buttons
	 * @param {Event} event       The originating click event
	 * @returns {Promise}         A promise which resolves once the handler workflow is complete
	 * @private
	 */
	static async _onChatCardAction(event) {

		event.preventDefault();

		// Extract card data
		const button = event.currentTarget;
		button.disabled = true;
		const card = button.closest(".chat-card");
		const messageId = card.closest(".message").dataset.messageId;
		const message = game.messages.get(messageId);

		if ( !( game.user.isGM || message.isAuthor ) ) return;

		const actor = await this._getChatCardActor(card);
		if ( !actor ) return;

		const dataset = button.dataset;
		const action = dataset.action;
		const rollData = dataset.rollData.split('.');

		const flavor = action === "confirm-critical"
			? game.i18n.format("LEOBREW.ChatCriticalConfirmFlavor")
			: game.i18n.format("LEOBREW.ChatFumbleConfirmFlavor");

		// Roll and return
		const options = {
			extraFlavor: flavor,
			messageData: {
				"flags.leobrew.roll": {
					confirmAction: action,
					originalMessageId: message.getFlag("leobrew", "roll.originalMessageId"),
					totalCriticalConfirms: message.getFlag("leobrew", "roll.totalCriticalConfirms")
				}
			}
		};

		await message.delete();

		if(rollData.length === 1){
			return actor.rollGeneric(options);
		}else if(rollData[1] === "skills"){
			return actor.rollSkill(rollData[2], rollData[4], options);
		}else{
			return actor.rollAbility(rollData[2], options);
		}

	}

	/**
	 * Get the Actor which is the author of a chat card
	 * @param {HTMLElement} card    The chat card being used
	 * @return {Actor|null}         The Actor entity or null
	 * @private
	 */
	static async _getChatCardActor(card) {

		// Case 2 - use Actor ID directory
		const actorId = card.dataset.actorId;
		return game.actors.get(actorId) || null;
	}

	/* -------------------------------------------- */

	async addSkill(group, skill){
		let key = `data.skills.${group}.subSkills.${skill}.value`;
		return await this.update({[key]: 1});
	}

	async removeSkill(group, skill, { showDialog = false }={}){
		if(showDialog){
			if(!await Dialogs.promptWarning({
				title: "Remove Skill",
				content: game.i18n.format("LEOBREW.WarningRemoveSkill", { skill: CONFIG.LEOBREW[group][skill] })
			})) return;
		}


		let key = `data.skills.${group}.subSkills.-=${skill}`;
		await this.update({[key]: null })
		if(Object.keys(this.data.data.skills[group].subSkills).length === 0) await this._clearGroup(group);
	}

	async _clearGroup(group){
		let key = `data.skills.-=${group}`;
		await this.update({[key]: null })
	}

	/* -------------------------------------------- */

	rollGeneric(options={}){

		let title = game.i18n.format("LEOBREW.GenericSkillRollTitle");

		if(options?.extraFlavor){
			title = `${title} (${options?.extraFlavor})`
		}

		// Roll and return
		const rollData = foundry.utils.mergeObject(options, {
			title: title,
			data: options.data,
			messageData: {
				speaker: options.speaker || ChatMessage.getSpeaker({actor: this}),
				"flags.leobrew.roll": {
					type: "generic",
					actorId: this.id
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
	rollAbility(abilityId, options={}) {

		const label = CONFIG.LEOBREW.abilities[abilityId];
		const abl = this.data.data.abilities[abilityId];

		// Construct parts
		const parts = ["@value"];
		const data = { value: abl.value };

		// Add provided extra roll parts now because they will get clobbered by mergeObject below
		if (options.parts?.length > 0) {
			parts.push(...options.parts);
		}

		let title = game.i18n.format("LEOBREW.AbilityRollTitle", { ability: label });

		if(options?.extraFlavor){
			title = `${title} (${options?.extraFlavor})`
		}

		// Roll and return
		const rollData = foundry.utils.mergeObject(options, {
			parts: parts,
			data: data,
			title: title,
			messageData: {
				speaker: options.speaker || ChatMessage.getSpeaker({actor: this}),
				"flags.leobrew.roll": {
					type: "ability",
					abilityId,
					rollData: `data.abilities.${abilityId}`,
					actorId: this.id
				}
			}
		});

		return d10Roll(rollData);
	}

	/**
	 * Roll an Ability Test
	 * @param {String} groupId    The group ID (e.g. "str")
	 * @param {String} skillId    The skill ID (e.g. "str")
	 * @param {Object} options      Options which configure how ability tests are rolled
	 * @return {Promise<d10Roll>}      A Promise which resolves to the created Roll instance
	 */
	rollSkill(groupId, skillId, options={}) {

		const groupLabel = CONFIG.LEOBREW.skillList[groupId];
		const skillLabel = CONFIG.LEOBREW[groupId][skillId];

		const skl = this.data.data.skills[groupId].subSkills[skillId];

		// Construct parts
		const parts = ["@value"];
		const data = { value: skl.value };

		// Add provided extra roll parts now because they will get clobbered by mergeObject below
		if (options.parts?.length > 0) {
			parts.push(...options.parts);
		}

		let title = game.i18n.format("LEOBREW.SkillRollTitle", { group: groupLabel, skill: skillLabel })

		if(options?.extraFlavor){
			title = `${title} (${options?.extraFlavor})`
		}

		// Roll and return
		const rollData = foundry.utils.mergeObject(options, {
			parts: parts,
			data: data,
			title: title,
			messageData: {
				speaker: options.speaker || ChatMessage.getSpeaker({actor: this}),
				"flags.leobrew.roll": {
					type: "skill",
					groupId,
					skillId,
					rollData: `data.skills.${groupId}.subskills.${skillId}`,
					actorId: this.id
				}
			}
		});

		return d10Roll(rollData);
	}
}
