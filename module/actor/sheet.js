import {onManageActiveEffect, prepareActiveEffectCategories} from "../effects.js";

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class LeobrewActorSheet extends ActorSheet {

	constructor(...args) {
		super(...args);

		/**
		 * Track the set of item filters which are applied
		 * @type {Set}
		 */
		this._filters = {
			inventory: new Set(),
			spellbook: new Set(),
			features: new Set(),
			effects: new Set()
		};

		this._levelingUp = false;
	}


	/** @inheritdoc */
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["leobrew", "sheet", "actor"],
			template: "systems/leobrew/templates/actors/actor-sheet.html",
			width: 570,
			height: 640,
			resizable: false,
			tabs: [{navSelector: ".sheet-navigation", contentSelector: ".sheet-body", initial: "attributes"}],
			scrollY: [".biography", ".items", ".attributes"],
			dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
		});
	}

	/* -------------------------------------------- */

	/** @inheritdoc */
	getData() {

		const data = super.getData();

		let isOwner = this.actor.isOwner;
		foundry.utils.mergeObject(data, {
			owner: isOwner,
			limited: this.actor.limited,
			options: this.options,
			editable: this.isEditable,
			cssClass: isOwner ? "editable" : "locked",
			config: CONFIG.LEOBREW
		});

		const actorData = this.actor.data.toObject(false);

		data.actor = actorData;
		data.data = actorData.data;

		// Labels and filters
		data.labels = this.actor.labels || {};
		data.filters = this._filters;

		for ( let [a, abl] of Object.entries(actorData.data.abilities)) {
			abl.label = CONFIG.LEOBREW.abilities[a];
		}

		for ( let [r, res] of Object.entries(actorData.data.resources)) {
			res.label = CONFIG.LEOBREW.resources[r];
		}

		this._prepareSkills(actorData, data);

		this._prepareMana(actorData);

		this._prepareItemCategories(data);

		// Prepare active effects
		data.effects = prepareActiveEffectCategories(this.actor.effects);

		return data;

	}

	_prepareSkills(actorData, data){

		if ( actorData.data.skills ) {

			actorData.data.sortedSkills = {}

			let sortedSkills = Object.entries(actorData.data.skills);
			sortedSkills.sort((a,b) => {
				return a[0].localeCompare(b[0])
			})

			for (let [t, type] of sortedSkills) {

				actorData.data.sortedSkills[t] = {
					label: CONFIG.LEOBREW.skillList[t],
					subSkills: {}
				};

				let sorted = Object.entries(foundry.utils.duplicate(type.subSkills));
				sorted.sort((a,b) => {
					return a[0].localeCompare(b[0])
				})

				for (let [s, skill] of sorted) {
					actorData.data.sortedSkills[t].subSkills[s] = {
						label: CONFIG.LEOBREW[t][s],
						value: skill.value
					}
				}
			}
		}

		data.allSkillsLearned = true;
		data.globalSkills = {};

		for(let [t, type] of Object.entries(CONFIG.LEOBREW.skillList)){

			let skillList = foundry.utils.duplicate(CONFIG.LEOBREW[t]);

			for(let [s, skill] of Object.entries(skillList)){

				let hasSkill = !!actorData.data.skills[t]?.subSkills?.[s]
				data.allSkillsLearned = !data.allSkillsLearned ? false : hasSkill;
				skillList[s] = {
					label: CONFIG.LEOBREW[t][s]
				}
				if(hasSkill) delete skillList[s];

			}

			if(Object.keys(skillList).length > 0) {
				data.globalSkills[t] = {
					name: type,
					values: skillList
				};
			}
		}
	}

	_prepareMana(actorData){

		let mana = actorData.data.resources.mana;

		mana.max += actorData.data.abilities.will.value;

		for(let s of Object.keys(CONFIG.LEOBREW.magic)){

			let skill = actorData.data.skills?.["magic"]?.subSkills?.[s];

			if(skill && skill.value >= 5){
				mana.max += skill.value * 3;
			}

		}

		mana.value = Math.min(mana.value, mana.max);

	}

	_prepareItemCategories(data){

		data.traits = data.items.filter(i => i.type === "trait");
		data.items = data.items.filter(i => i.type === "item");

		data.items.forEach(item => {
			const isActive = getProperty(item.data, "equipped");
			item.toggleClass = isActive ? "active" : "";
			item.toggleTitle = game.i18n.localize(isActive ? "LEOBREW.Equipped" : "LEOBREW.Unequipped");
		});

	}

	/* -------------------------------------------- */
	/*  Event Listeners and Handlers                */
	/* -------------------------------------------- */

	/** @inheritdoc */
	activateListeners(html) {

		// Everything below here is only needed if the sheet is editable
		if ( this.isEditable ){

			// Input focus and update
			const inputs = html.find("input");
			inputs.focus(ev => ev.currentTarget.select());
			inputs.addBack().find('[data-dtype="Number"]').change(this._onChangeInputDelta.bind(this));

			html.find('.ability-name').click(this._onRollAbility.bind(this));
			html.find('.skill-name').click(this._onRollSkill.bind(this));

			html.find('.skill-add').click(this._onAddSkill.bind(this));
			html.find('.skill-remove').click(this._onRemoveSkill.bind(this));

			html.find('.item .item-image').click(event => this._onItemRoll(event));
			html.find('.item-create').click(this._onItemCreate.bind(this));
			html.find('.item-delete').click(this._onItemDelete.bind(this));
			html.find('.item-quantity').change(this._onItemQuantityChange.bind(this));
			html.find('.item-expand').click(this._onItemExpand.bind(this));
			html.find('.item-edit').click(this._onItemEdit.bind(this));
			html.find('.item-toggle').click(this._onToggleItem.bind(this));

			html.find(".effect-control").click(ev => onManageActiveEffect(ev, this.actor));

		}

		super.activateListeners(html);

	}

	/* -------------------------------------------- */

	/**
	 * Handle input changes to numeric form fields, allowing them to accept delta-typed inputs
	 * @param event
	 * @private
	 */
	_onChangeInputDelta(event) {
		const input = event.target;
		const value = input.value;
		if ( ["+", "-"].includes(value[0]) ) {
			let delta = parseFloat(value);
			input.value = getProperty(this.actor.data, input.name) + delta;
		} else if ( value[0] === "=" ) {
			input.value = value.slice(1);
		}
	}

	/* -------------------------------------------- */

	/**
	 * Handle adding a skill to the sheet
	 * @param {Event} event   The originating click event
	 * @private
	 */
	async _onAddSkill(event){
		event.preventDefault();
		const field = $(event.currentTarget).siblings('.global-skill-list').find("option:selected");
		let skillGroup = field.closest('optgroup').attr('value');
		let skill = field.attr('value');
		await this.actor.addSkill(skillGroup, skill);
		return this.render();
	}

	/* -------------------------------------------- */

	/**
	 * Handle removing a skill from the sheet
	 * @param {Event} event   The originating click event
	 * @private
	 */
	async _onRemoveSkill(event){
		event.preventDefault();
		const set = event.currentTarget.parentElement.dataset;
		let skillGroup = set.group;
		let skill = set.skill;
		await this.actor.removeSkill(skillGroup, skill, { showDialog: !event.altKey });
		return this.render();
	}

	/* -------------------------------------------- */

	/**
	 * Handle rolling of an item from the Actor sheet, obtaining the Item instance and dispatching to it's roll method
	 * @private
	 */
	_onItemRoll(event) {
		event.preventDefault();
		const itemId = event.currentTarget.closest(".item").dataset.itemId;
		const item = this.actor.items.get(itemId);
		return item.displayCard();
	}

	/* -------------------------------------------- */

	/**
	 * Handle rolling of an item from the Actor sheet, obtaining the Item instance and dispatching to it's roll method
	 * @private
	 */
	_onToggleItem(event) {
		event.preventDefault();
		const itemId = event.currentTarget.closest(".item").dataset.itemId;
		const item = this.actor.items.get(itemId);
		const equipped = !getProperty(item.data, "data.equipped");
		return item.setEquipped(equipped);
	}

	/* -------------------------------------------- */

	/**
	 * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
	 * @param {Event} event   The originating click event
	 * @private
	 */
	_onItemCreate(event) {
		event.preventDefault();
		const header = event.currentTarget;
		const type = header.dataset.type;
		const itemData = {
			name: game.i18n.format("LEOBREW.ItemNew", { type: type }),
			type: type
		};
		return this.actor.createEmbeddedDocuments("Item", [itemData]);
	}

	/* -------------------------------------------- */

	/**
	 * Handle editing an existing Owned Item for the Actor
	 * @param {Event} event   The originating click event
	 * @private
	 */
	_onItemEdit(event) {
		event.preventDefault();
		const li = event.currentTarget.closest(".item");
		const item = this.actor.items.get(li.dataset.itemId);
		return item.sheet.render(true);
	}

	/* -------------------------------------------- */

	/**
	 * Handle deleting an existing Owned Item for the Actor
	 * @param {Event} event   The originating click event
	 * @private
	 */
	_onItemDelete(event) {
		event.preventDefault();
		const li = event.currentTarget.closest(".item");
		const item = this.actor.items.get(li.dataset.itemId);
		if ( item ) return item.delete();
	}

	/* -------------------------------------------- */

	/**
	 * Change the uses amount of an Owned Item within the Actor
	 * @param {Event} event   The triggering click event
	 * @private
	 */
	async _onItemQuantityChange(event) {
		event.preventDefault();
		const itemId = event.currentTarget.closest(".item").dataset.itemId;
		const item = this.actor.items.get(itemId);
		const quantity = parseInt(event.target.value);
		return item.update({ 'data.quantity': quantity });
	}

	/* -------------------------------------------- */

	/**
	 * Change the uses amount of an Owned Item within the Actor
	 * @param {Event} event   The triggering click event
	 * @private
	 */
	async _onItemExpand(event) {
		event.preventDefault();
		const item = $(event.currentTarget.closest(".item"));
		item.toggleClass("expanded")
	}

	/* -------------------------------------------- */

	/**
	 * Handle rolling an Ability check, either a test or a saving throw
	 * @param {Event} event   The originating click event
	 * @private
	 */
	_onRollAbility(event) {
		event.preventDefault();
		let ability = event.currentTarget.parentElement.dataset.ability;
		return this.actor.rollAbility(ability, { event: event });
	}

	/**
	 * Handle rolling an Ability check, either a test or a saving throw
	 * @param {Event} event   The originating click event
	 * @private
	 */
	_onRollSkill(event) {
		event.preventDefault();
		let set = event.currentTarget.parentElement.dataset;
		let group = set.group;
		let skill = set?.skill ?? "";
		let options = { event: event };
		if(group === "generic"){
			return this.actor.rollGeneric(options);
		}
		return this.actor.rollSkill(group, skill, options);
	}
	/* -------------------------------------------- */

	/** @inheritdoc */
	_getSubmitData(updateData) {
		let formData = super._getSubmitData(updateData);
		return formData;
	}
}
