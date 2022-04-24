import { LEOBREW } from "./constants.js";
import registerSettings from "./settings.js";

import LeobrewActor from "./documents/actor/document.js";
import LeobrewActorSheet from "./documents/actor/sheet.js";

Hooks.once("init", async function() {

    CONFIG.LEOBREW = LEOBREW;

    game.leobrew = {
        LeobrewActor: LeobrewActor,
        // LeobrewItem: LeobrewItem
    };

    CONFIG.Actor.documentClass = LeobrewActor;
    // CONFIG.Item.documentClass = LeobrewItem;

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("leobrew", LeobrewActorSheet, { makeDefault: true })

    /*Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("leobrew", LeobrewItemSheet, { makeDefault: true });*/

    registerSettings();

});