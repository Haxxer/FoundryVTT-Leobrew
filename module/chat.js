import * as lib from "./lib.js";

/**
 * Highlight critical success or failure on d10 rolls
 */
export const highlightCriticalSuccessFailure = function(message, html) {
	if ( !message.isRoll || !message.isContentVisible ) return;

	let rollData = _getDiceData(message);

	if(!rollData) return;

	const { isCritical, isFumble, confirmAction} = rollData;

	if(isCritical || confirmAction === "confirmed-critical") {

		html.find(".dice-total").addClass("critical");

	} else if(isFumble || confirmAction === "confirmed-fumble") {

		html.find(".dice-total").addClass("fumble");

	}
};

/* -------------------------------------------- */

function _getDiceData(message){

	// Highlight rolls where the first part is a d10 roll
	const roll = message.roll;
	if ( !roll.dice.length ) return;
	const dice = roll.dice[0];

	// Ensure it is an un-modified d10 roll
	const isD10 = (dice.faces === 10) && ( dice.values.length === 1 );
	if ( !isD10 ) return;
	const isModifiedRoll = ("success" in dice.results[0]) || dice.options.marginSuccess || dice.options.marginFailure;
	if ( isModifiedRoll ) return;

	const flags = message.getFlag("leobrew", "roll") ?? {};
	let confirmAction = flags?.confirmAction ?? "";

	let isCritical = dice.total === 10;
	let isFumble = dice.total === 1;

	if(confirmAction === "confirm-critical"){

		isCritical = dice.total <= 3;

		if(isCritical){
			confirmAction = "confirmed-critical";
		}else if(dice.total === 10){
			isCritical = true;
			confirmAction = "confirm-critical";
		}else{
		 	confirmAction = "confirmed-natural"
		}

	}else if(confirmAction === "confirm-fumble"){

		isFumble = dice.total <= 3;
		confirmAction = isFumble ? "confirmed-fumble" : "confirmed-natural";

	}

	return { isCritical, isFumble, confirmAction, roll };
}

/* -------------------------------------------- */
/**
 * Handle automated critical successes and fumbles
 */
export const automateCriticalSuccessFailure = async function(message, html){

	if(!lib.isResponsibleGM()) return;

	const flags = message.getFlag("leobrew", "roll") ?? false;

	if ( !message.isRoll || !message.isContentVisible || !flags) return;

	let rollData = _getDiceData(message);

	if(!rollData) return;

	const { isCritical, isFumble, confirmAction } = rollData;

	if(isCritical && confirmAction === "confirmed-critical") return _confirmedCriticalFumble("LEOBREW.ChatCriticalConfirm", message);
	if(isFumble && confirmAction === "confirmed-fumble") return _confirmedCriticalFumble("LEOBREW.ChatFumbleConfirm", message);
	if(!(isCritical || isFumble) && confirmAction === "confirmed-natural") return _confirmedNatural("LEOBREW.ChatNaturalConfirm", message);
	if(!(isCritical || isFumble) && confirmAction === "") return;

	const label = isCritical ? game.i18n.format("LEOBREW.ChatCriticalConfirmText") : game.i18n.format("LEOBREW.ChatFumbleConfirmText");
	const buttonLabel = isCritical ? game.i18n.format("LEOBREW.ChatCriticalButton") : game.i18n.format("LEOBREW.ChatFumbleButton");
	const action = isCritical ? "confirm-critical" : "confirm-fumble";

	const actor = game.actors.get(flags.actorId);
	const templateData = {
		actorId: actor.id,
		rollData: flags.type !== "generic" ? flags.rollData : "generic",
		label: label,
		action: action,
		buttonLabel: buttonLabel
	};

	const chatCardHtml = await renderTemplate("systems/leobrew/templates/chat/critical-fumble-card.html", templateData);

	let originalMessageId = flags?.originalMessageId && !isCritical ? flags?.originalMessageId : message.id;
	let totalCriticalConfirms = typeof flags?.totalCriticalConfirms === "number" && isCritical ? flags.totalCriticalConfirms + 1 : 1;

	const chatData = {
		user: message.data.user,
		type: CONST.CHAT_MESSAGE_TYPES.WHISPER,
		content: chatCardHtml,
		flavor: label,
		whisper: [ message.data.user ],
		speaker: ChatMessage.getSpeaker({actor: actor}),
		flags: {
			"core.canPopout": false,
			"leobrew": {
				"roll": {
					"originalMessageId": originalMessageId,
					"totalCriticalConfirms": totalCriticalConfirms
				}
			}
		}
	};

	ChatMessage.create(chatData, {});

}

async function _confirmedNatural(localization, message){

	const flags = message.getFlag("leobrew", "roll");

	let originalMessage = flags.confirmAction === "confirm-fumble" ? message : game.messages.get(flags.originalMessageId);

	let { roll } = _getDiceData(originalMessage);

	_sendConfirmedCard(localization, message, roll)

}

async function _confirmedCriticalFumble(localization, message){

	const flags = message.getFlag("leobrew", "roll");

	let originalMessage = game.messages.get(flags.originalMessageId);

	let { roll } = _getDiceData(originalMessage);

	_sendConfirmedCard(localization, message, roll)

}

async function _sendConfirmedCard(localization, message, roll){

	const flags = message.getFlag("leobrew", "roll");

	const actor = game.actors.get(flags.actorId);

	ChatMessage.create({
		user: message.data.user,
		type: CONST.CHAT_MESSAGE_TYPES.OTHER,
		content: game.i18n.format(localization, { roll: roll.total, rounded: lib.roundDownRoll(roll.total) }),
		speaker: ChatMessage.getSpeaker({actor: actor}),
		flags: { "core.canPopout": false }
	});

}

/* -------------------------------------------- */

/**
 * Optionally hide the display of chat card action buttons which cannot be performed by the user
 */
export const displayChatActionButtons = function(message, html, data) {
	const chatCard = html.find(".leobrew.chat-card");
	if ( chatCard.length > 0 ) {

		let buttonsUsed = message.getFlag("leobrew", "buttons-used") ?? false;

		// If the user is the message author or the actor owner, proceed
		if(!buttonsUsed) {
			let actor = game.actors.get(data.message.speaker.actor);
			if (actor && actor.isOwner) return;
			else if (game.user.isGM || (data.author.id === game.user.id)) return;
		}

		// Otherwise conceal action buttons except for saving throw
		const buttons = chatCard.find("button[data-action]");
		buttons.each((i, btn) => {
			btn.style.display = "none";
			btn.disabled = true;
		});
	}
};