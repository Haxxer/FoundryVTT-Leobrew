import { roundDownRoll } from "../lib/lib.js";

export async function d10Roll({
  parts = [], data = {}, // Roll creation
  title = "", flavor, messageData = {},
  situationalBonus = false
} = {}) {

  if (situationalBonus) {
    parts.push(situationalBonus)
  }

  const formula = ["1d10"].concat(parts).join(" + ");
  const roll = new Roll(formula, data);
  await roll.evaluate({ async: true });
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
    weaponSkill: false,
    hitLocation: false,
    natural: !fumbleCritical,
    totalCriticalConfirms: 0,
    roll
  }, messageData);

  let rollToRound = roll;

  const previousRollData = messageData?.flags?.leobrew?.roll;

  if (previousRollData?.confirmAction) {

    messageData.natural = false;
    messageData.confirmedCritical = previousRollData?.confirmAction === "confirm-critical" && dice.total <= 3;
    messageData.confirmedFumble = previousRollData?.confirmAction === "confirm-fumble" && dice.total <= 3;
    messageData.confirmedNatural = !(messageData.confirmedCritical || messageData.confirmedFumble) && dice.total > 3 && dice.total !== 10;

    const originalMessage = game.messages.get(previousRollData.originalMessageId);

    if(previousRollData?.confirmAction !== "confirm-fumble"){
      const [ originalRoll ] = originalMessage.rolls;
      rollToRound = originalRoll;
    }

    messageData.totalCriticalConfirms = originalMessage.getFlag("leobrew", "roll").totalCriticalConfirms ?? 0;

  }

  if(previousRollData?.isAttack && !fumbleCritical){
    messageData.weaponSkill = true;
    if(rollToRound.total >= 15) {
      messageData.hitLocation = "Instant Kill"
    }else if(rollToRound.total === 11) {
      messageData.hitLocation = "Roll d10 to see if hit is to chest or leg<br>Below 5 leg - 5 reroll - Above 5 chest";
    }else{
      messageData.hitLocation = {
        "9": "Hits Arm",
        "10": "Hits Leg",
        "12": "Hits Chest",
        "13": "Hits Guts",
        "14": "Hits Head",
      }[rollToRound.total] ?? "No hit";
    }
  }

  messageData.roundedRoll = roundDownRoll(rollToRound.total);

  if (rollToRound.total === 2 && messageData.natural) {
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
