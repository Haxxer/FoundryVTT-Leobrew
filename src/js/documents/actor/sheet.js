import { SvelteApplication } from '@typhonjs-fvtt/runtime/svelte/application';
import SheetShell from './sheet-shell.svelte';

export default class LeobrewActorSheet extends SvelteApplication {

    constructor(actor, options = {}, dialogData = {}) {

        super({
            title: actor.name,
            zIndex: 102,
            svelte: {
                class: SheetShell,
                target: document.body,
                props: {
                    actor
                }
            },
            ...options
        }, dialogData);

        this.actor = actor;

    }

    get title(){
        return this.actor.name;
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            closeOnSubmit: false,
            width: 550,
            height: "auto",
        })
    }

    /** @inheritdoc */
    _getHeaderButtons() {
        let buttons = super._getHeaderButtons();
        const canConfigure = game.user.isGM || (this.actor.isOwner && game.user.can("TOKEN_CONFIGURE"));
        if (this.options.editable && canConfigure) {
            buttons.splice(0, 0, {
                label: this.token ? "Token" : "TOKEN.TitlePrototype",
                class: "configure-token",
                icon: "fas fa-user-circle",
                onclick: ev => this._onConfigureToken(ev)
            });
        }
        return buttons
    }

    _onConfigureToken() {
        new CONFIG.Token.prototypeSheetClass(this.token ?? this.actor, {
            left: Math.max(this.position.left - 560 - 10, 10),
            top: this.position.top
        }).render(true);
    }
}