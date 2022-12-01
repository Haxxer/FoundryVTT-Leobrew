import { roundDownRoll } from "../lib.js";

export async function d10Roll({
		parts=[], data={}, // Roll creation
		title="", flavor, messageData={},
        situationalBonus = false
	}={}) {

    if(situationalBonus){
        parts.push(situationalBonus)
    }

	const formula = ["1d10"].concat(parts).join(" + ");
	const roll = new Roll(formula, data);
	await roll.evaluate({async: true});
    const dice = roll.dice[0];
    const fumbleCritical = (dice.total === 1 || dice.total === 10);

	messageData = foundry.utils.mergeObject({
        user: game.user.id,
        type: CONST.CHAT_MESSAGE_TYPES.ROLL,
		flavor: flavor || title,
        sound: CONFIG.sounds.dice,
        confirmedCritical: false,
        confirmedFumble: false,
        confirmedNatural: false,
        natural: !fumbleCritical,
        roll
	}, messageData);

    let rollToRound = roll;

	const previousRollData = messageData?.flags?.leobrew?.roll;
	if(previousRollData?.confirmAction && previousRollData?.confirmAction !== "generic"){

        messageData.natural = false;
        messageData.confirmedCritical = previousRollData?.confirmAction === "confirm-critical" && dice.total <= 3;
        messageData.confirmedFumble = previousRollData?.confirmAction === "confirm-fumble" && dice.total <= 3;
        messageData.confirmedNatural = !(messageData.confirmedCritical || messageData.confirmedFumble) && dice.total > 3 && dice.total !== 10;

        rollToRound = previousRollData?.confirmAction !== "confirm-fumble"
            ? game.messages.get(previousRollData.originalMessageId).roll
            : roll;

    }

	messageData.roundedRoll = roundDownRoll(rollToRound.total);

	if(rollToRound.total === 2){
        messageData.roundedRoll = [
            "Nope",
            "2?!",
            "No can do",
            "Nix",
            "Nada",
            "wtf?"
        ][Math.floor(Math.random() * 6)];
    }

    messageData.content = await renderTemplate("systems/leobrew/templates/chat/roll-card.html", messageData);

    await ChatMessage.create(messageData);

	return roll;

}