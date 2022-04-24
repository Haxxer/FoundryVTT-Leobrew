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

    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            closeOnSubmit: false,
            width: 550,
            height: "auto",
        })
    }

}