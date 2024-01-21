import "./style.scss";

import { setupSystem, setupLocalization } from "./setup.js";
import { runMigrations } from "./migrations.js";
import * as chat from "./utils/chat.js";
import { registerChatListeners } from "./utils/chat.js";

Hooks.once("init", () => {
  setupSystem();
});

Hooks.once("setup", () => {
  setupLocalization();
});

Hooks.once("ready",  async() => {
  registerChatListeners();
  //game.actors.getName("Ajal Fajir").items.getName("Round Shield").sheet.render(true);
  if (!game.user.isGM) return;
  await runMigrations();
	game.actors.getName("Ajal Fajir").sheet.render(true);
});

Hooks.on("preCreateActor", (doc) => {
  doc.updateSource({
    "system.experience.value": Math.abs(Number(game.settings.get("leobrew", "startingSkillPoints") )) || 40
  });
});

Hooks.on('updateItem', (item) => {
	if(!item.parent) return;
	item.parent.prepareDerivedData();
});

Hooks.on("createActor", (doc) => {
  doc.createEmbeddedDocuments("Item", [{
    name: "Native Language",
    type: "skill",
    system: {
			"category": "Language",
	    "level": 5
    }
  }]);
});

Hooks.on("deleteItem", (doc) => {
	if(doc.type !== "skill" || !doc.parent || !doc.parent.system.experience.initalized) return;
	doc.parent.update({
		"system.experience.value": doc.parent.system.experience.value + doc.system.level
	});
})

Hooks.on("renderChatMessage", (...args) => {
  chat.displayChatActionButtons(...args);
  chat.highlightCriticalSuccessFailure(...args);
});

Hooks.on("createChatMessage", (...args) => {
  chat.automateCriticalSuccessFailure(...args);
});

Hooks.on("getActorDirectoryEntryContext", (html, options) => {
  // Define an actor as a template.
  options.push({
    name: game.i18n.localize("LEOBREW.DefineTemplate"), icon: '<i class="fas fa-stamp"></i>', condition: li => {
      const actor = game.actors.get(li.data("documentId"));
      return !actor.getFlag("leobrew", "isTemplate");
    }, callback: li => {
      const actor = game.actors.get(li.data("documentId"));
      actor.setFlag("leobrew", "isTemplate", true);
    }
  });

  // Undefine an actor as a template.
  options.push({
    name: game.i18n.localize("LEOBREW.UnsetTemplate"), icon: '<i class="fas fa-times"></i>', condition: li => {
      const actor = game.actors.get(li.data("documentId"));
      return actor.getFlag("leobrew", "isTemplate");
    }, callback: li => {
      const actor = game.actors.get(li.data("documentId"));
      actor.setFlag("leobrew", "isTemplate", false);
    }
  });
});

Hooks.on("getItemDirectoryEntryContext", (html, options) => {
  // Define an item as a template.
  options.push({
    name: game.i18n.localize("LEOBREW.DefineTemplate"), icon: '<i class="fas fa-stamp"></i>', condition: li => {
      const item = game.items.get(li.data("documentId"));
      return !item.getFlag("leobrew", "isTemplate");
    }, callback: li => {
      const item = game.items.get(li.data("documentId"));
      item.setFlag("leobrew", "isTemplate", true);
    }
  });

  // Undefine an item as a template.
  options.push({
    name: game.i18n.localize("LEOBREW.UnsetTemplate"), icon: '<i class="fas fa-times"></i>', condition: li => {
      const item = game.items.get(li.data("documentId"));
      return item.getFlag("leobrew", "isTemplate");
    }, callback: li => {
      const item = game.items.get(li.data("documentId"));
      item.setFlag("leobrew", "isTemplate", false);
    }
  });
});
