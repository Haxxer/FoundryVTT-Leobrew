/**
 * Extend the base Item document to support attributes and groups with a custom template creation dialog.
 * @extends {Item}
 */
export class LeobrewItem extends Item {


	setEquipped(isEquipped){

		this.actor.effects.forEach(e => {
			if(e.data.origin.endsWith(this.id)){
				e.update({"disabled": !isEquipped});
			}
		})

		return this.update({"data.equipped": isEquipped});

	}

	/* -------------------------------------------- */

	/**
	 * Display the chat card for an Item as a Chat Message
	 * @param {object} options          Options which configure the display of the item chat card
	 * @param {string} rollMode         The message visibility mode to apply to the created card
	 * @param {boolean} createMessage   Whether to automatically create a ChatMessage entity (if true), or only return
	 *                                  the prepared message data (if false)
	 */
	async displayCard({rollMode, createMessage=true}={}) {

		// Render the chat card template
		const templateData = {
			actor: this.actor,
			item: this.data
		};

		const html = await renderTemplate("systems/leobrew/templates/chat/item-card.html", templateData);

		// Create the ChatMessage data object
		const chatData = {
			user: game.user._id,
			type: CONST.CHAT_MESSAGE_TYPES.OTHER,
			content: html,
			speaker: ChatMessage.getSpeaker({actor: this.actor}),
			flags: { "core.canPopout": true }
		};

		// Apply the roll mode to adjust message visibility
		ChatMessage.applyRollMode(chatData, rollMode || game.settings.get("core", "rollMode"));

		// Create the Chat Message or return its data
		return createMessage ? ChatMessage.create(chatData) : chatData;
	}

}
