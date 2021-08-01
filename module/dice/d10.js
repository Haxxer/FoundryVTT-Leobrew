export async function d10Roll({
		parts=[], data={}, // Roll creation
		title="", flavor, messageData={}
	}={}) {

	const formula = ["1d10"].concat(parts).join(" + ");

	const roll = new Roll(formula, data);

	await roll.evaluate({async: true});

	messageData = foundry.utils.mergeObject({
		flavor: flavor || title
	}, messageData)

	if(roll) await roll.toMessage(messageData);
	return roll;

}