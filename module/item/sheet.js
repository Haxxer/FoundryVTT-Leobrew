import {onManageActiveEffect, prepareActiveEffectCategories} from "../effects.js";

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class LeobrewItemSheet extends ItemSheet {

	/** @inheritdoc */
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["leobrew", "sheet", "item"],
			width: 630,
			height: 400,
			scrollY: [".attributes"],
			tabs: [{navSelector: ".tabs", contentSelector: ".sheet-body", initial: "description"}]
		});
	}

	/* -------------------------------------------- */

	/** @inheritdoc */
	get template() {
		const path = "systems/leobrew/templates/items";
		return `${path}/${this.item.data.type}.html`;
	}

	/* -------------------------------------------- */

	/** @inheritdoc */
	getData(options) {
		const data = super.getData(options);
		const itemData = data.data;
		data.labels = this.item.labels;
		data.config = CONFIG.LEOBREW;

		// Prepare Active Effects
		data.effects = prepareActiveEffectCategories(this.item.effects);

		// Re-define the template data references (backwards compatible)
		data.item = itemData;
		data.data = itemData.data;

		return data;
	}

	/** @inheritdoc */
	activateListeners(html) {

		// Everything below here is only needed if the sheet is editable
		if ( this.isEditable ){

			html.find(".effect-control").click(ev => {
				if ( this.item.isOwned ) return ui.notifications.warn("Managing Active Effects within an Owned Item is not currently supported and will be added in a subsequent update.")
				onManageActiveEffect(ev, this.item)
			});

		}

		super.activateListeners(html);

	}

	/* -------------------------------------------- */

	/** @override */
	_getSubmitData(updateData) {
		return super._getSubmitData(updateData);
	}
}
