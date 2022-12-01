import { onManageActiveEffect, prepareActiveEffectCategories } from "../effects.js";

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

        data.skills = Object.fromEntries(Object.entries(this.actor.data.data.skills).map(entry => [entry[0], entry[1].label]));
        data.armorBonuses = Object.entries(CONFIG.LEOBREW.bodyParts).map(entry => {
            return {
                name: entry[0],
                label: entry[1],
                value: data.data?.armorBonuses?.[entry[0]] ?? 0
            }
        })

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

			html.find(".item-add-skill-bonus").click(this._onAddSkillBonus.bind(this));
			html.find(".item-remove-skill-bonus").click(this._onRemoveSkillBonus.bind(this));
			html.find(".item-skill-bonus-name").change(this._updateSkillBonuses.bind(this));
			html.find(".item-skill-bonus-value").change(this._updateSkillBonuses.bind(this));

		}

		super.activateListeners(html);

	}

    async _onAddSkillBonus(event){
        event.preventDefault();
        await this.item.addSkillBonus();
        return this.render(true);
    }

    async _onRemoveSkillBonus(event){
        event.preventDefault();
        const tr = event.currentTarget.closest("tr");
        const bonusId = tr.dataset.bonusId;
        await this.item.removeSkillBonus(bonusId);
        return this.render(true);
    }

    async _updateSkillBonuses(event){
        event.preventDefault();
        const element = $(event.currentTarget.closest("tr"));
        const index = Number(element.attr("data-bonus-id"))
        const name = element.find(".item-skill-bonus-name").val();
        const value = Number(element.find(".item-skill-bonus-value").val()) || 0;
        await this.item.updateSkillBonus(index, name, value);
        return this.render(true);
    }

	/* -------------------------------------------- */

	/** @override */
	_getSubmitData(updateData) {
		return super._getSubmitData(updateData);
	}
}
