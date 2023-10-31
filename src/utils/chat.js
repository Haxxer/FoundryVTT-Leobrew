import * as lib from "../lib/lib.js";

/**
 * Highlight critical success or failure on d10 rolls
 */
export function highlightCriticalSuccessFailure(message, html) {
  if (!message.isRoll || !message.isContentVisible) return;

  let rollData = _getDiceData(message);

  if (!rollData) return;

  const { isCritical, isFumble, confirmAction } = rollData;

  if (isCritical || confirmAction === "confirmed-critical") {

    html.find(".dice-total").first().addClass("critical");

  } else if (isFumble || confirmAction === "confirmed-fumble") {

    html.find(".dice-total").first().addClass("fumble");

  }
}

/* -------------------------------------------- */

function _getDiceData(message) {

  // Highlight rolls where the first part is a d10 roll
  const [roll] = message.rolls;
  if (!roll.dice.length) return;
  const dice = roll.dice[0];

  // Ensure it is an un-modified d10 roll
  const isD10 = (dice.faces === 10) && (dice.values.length === 1);
  if (!isD10) return;
  const isModifiedRoll = ("success" in dice.results[0]) || dice.options.marginSuccess || dice.options.marginFailure;
  if (isModifiedRoll) return;

  const flags = message.getFlag("leobrew", "roll") ?? {};
  let confirmAction = flags?.confirmAction ?? "";

  let isCritical = dice.total === 10;
  let isFumble = dice.total === 1;

  if (confirmAction === "confirm-critical") {

    isCritical = dice.total <= 3;

    if (isCritical) {
      confirmAction = "confirmed-critical";
    } else if (dice.total === 10) {
      isCritical = true;
      confirmAction = "confirm-critical";
    } else {
      confirmAction = "confirmed-natural"
    }

  } else if (confirmAction === "confirm-fumble") {

    isFumble = dice.total <= 3;
    confirmAction = isFumble ? "confirmed-fumble" : "confirmed-natural";

  }

  return { isCritical, isFumble, confirmAction, roll };
}

/* -------------------------------------------- */
/**
 * Handle automated critical successes and fumbles
 */
export const automateCriticalSuccessFailure = async function (message) {

  if (!lib.isResponsibleGM()) return;

  const flags = message.getFlag("leobrew", "roll") ?? false;

  if (!message.isRoll || !message.isContentVisible || !flags) return;

  let rollData = _getDiceData(message);

  if (!rollData) return;

  const { isCritical, isFumble, confirmAction } = rollData;

  if (isCritical && confirmAction === "confirmed-critical") return;
  if (isFumble && confirmAction === "confirmed-fumble") return;
  if (!(isCritical || isFumble) && confirmAction === "confirmed-natural") return;
  if (!(isCritical || isFumble) && confirmAction === "") return;

  const label = isCritical ? game.i18n.format("LEOBREW.ChatCriticalConfirmText") : game.i18n.format("LEOBREW.ChatFumbleConfirmText");
  const buttonLabel = isCritical ? game.i18n.format("LEOBREW.ChatCriticalButton") : game.i18n.format("LEOBREW.ChatFumbleButton");
  const action = isCritical ? "confirm-critical" : "confirm-fumble";

  let item;
  let actor;
  if (flags.actorUuid) {
    actor = fromUuidSync(flags.actorUuid)
  } else {
    item = fromUuidSync(flags.source);
    actor = item.parent;
  }

  const templateData = {
    action: action,
    buttonLabel: buttonLabel
  };

  const chatCardHtml = await renderTemplate("systems/leobrew/templates/chat/critical-fumble-card.html", templateData);

  let originalMessageId = flags?.originalMessageId && !isCritical ? flags?.originalMessageId : message.id;
  let totalCriticalConfirms = typeof flags?.totalCriticalConfirms === "number" && isCritical ? flags.totalCriticalConfirms + 1 : 1;

  const chatData = {
    user: message.user,
    type: CONST.CHAT_MESSAGE_TYPES.WHISPER,
    content: chatCardHtml,
    flavor: label,
    whisper: [message.user],
    speaker: ChatMessage.getSpeaker({ actor }),
    flags: {
      leobrew: {
        roll: foundry.utils.mergeObject(flags, {
          "originalMessageId": originalMessageId,
          "totalCriticalConfirms": totalCriticalConfirms
        })
      }
    }
  };

  ChatMessage.create(chatData);

}

/* -------------------------------------------- */

/**
 * Optionally hide the display of chat card action buttons which cannot be performed by the user
 */
export function displayChatActionButtons(message, html, data) {
  const chatCard = html.find(".leobrew.chat-card");
  if (chatCard.length > 0) {

    let buttonsUsed = message.getFlag("leobrew", "buttons-used") ?? false;

    // If the user is the message author or the actor owner, proceed
    if (!buttonsUsed) {
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
}

export function registerChatListeners(){

  $(".chat-control-icon")
    .children()
    .eq(0)
    .removeClass("fa-dice-d20")
    .addClass("clickable clickable-red fa-dice-d10")
    .on("click", function() {
      new Roll("1d10").toMessage();
    });

  $(document).on('click', '.confirm-button', async (event) => {

    event.preventDefault();

    // Extract card data
    const button = event.currentTarget;
    const card = button.closest(".chat-card");
    const messageId = card.closest(".message").dataset.messageId;
    const message = game.messages.get(messageId);

    if (!(game.user.isGM || message.isAuthor)) return;

    button.disabled = true;

    let actor;
    let item;

    const flags = message.getFlag("leobrew", "roll") ?? false;

    if(!flags) return;

    if(flags.actorUuid){
      actor = fromUuidSync(flags.actorUuid);
    }else {
      item = fromUuidSync(flags.source);
      actor = item?.parent;
    }
    if (!actor) return;

    const dataset = button.dataset;
    const action = dataset.action;

    const flavor = action === "confirm-critical"
      ? game.i18n.localize("LEOBREW.ChatCriticalConfirmFlavor")
      : game.i18n.localize("LEOBREW.ChatFumbleConfirmFlavor");

    // Roll and return
    const options = {
      extraTitle: flags?.extraTitle ?? "",
      subSkill: flags?.subSkill ?? null,
      asSkill: flags?.asSkill ?? null,
      extraFlavor: flavor,
      messageData: {
        "flags.leobrew.roll": {
          confirmAction: action,
          actorUuid: flags?.actorUuid ?? false,
          source: flags?.source ?? false,
          originalMessageId: flags.originalMessageId,
          totalCriticalConfirms: flags.totalCriticalConfirms
        }
      }
    };

    await message.delete();

    if(item) {
      return item.roll(options);
    }else if(flags.type === "ability"){
      return actor.rollAbility(flags.abilityId, options);
    }

    return actor.rollGeneric(options);

  });

}
