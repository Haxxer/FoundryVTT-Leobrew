import createActorSheetState from './actor-sheet-store.js';
import SvelteDocumentSheet from "../base/document-sheet.js";
import ActorShell from "./actor-shell.svelte";

export default class LeobrewActorSheet extends SvelteDocumentSheet {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 600,
      height: 640,
      svelte: {
        class: ActorShell,
        target: document.body
      }
    });
  }

  constructor(object, options = {}) {
    super(object, options);
    this.reactive.state = createActorSheetState(object);
  }

  _getHeaderButtons() {
    const buttons = super._getHeaderButtons();

    if (game.user.isGM || (this.reactive.doc.isOwner && game.user.can('TOKEN_CONFIGURE'))) {
      buttons.unshift({
        label: this.token ? 'Token' : 'TOKEN.TitlePrototype',
        class: 'configure-token',
        icon: 'fas fa-user-circle',
        onclick: (ev) => this._onConfigureToken(ev),
      });
    }
    return buttons;
  }
}
