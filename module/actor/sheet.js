import {onManageActiveEffect, prepareActiveEffectCategories} from "../effects.js";
import ContextMenu from "../context-menu.js";

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
		this._hitboxes = {
			"head": [[
				{ x: 90, y: 0 },
				{ x: 115, y: 38 }
			]],
			"arms": [
				[
					{ x: 135, y: 42 },
					{ x: 213, y: 137 }
				],
				[
					{ x: 1, y: 42 },
					{ x: 79, y: 137 }
				]
			],
			"legs": [[
				{ x: 71, y: 133 },
				{ x: 145, y: 280 },
			]],
			"guts": [[
				{ x: 83, y: 84 },
				{ x: 128, y: 133 },
			]],
			"chest": [[
				{ x: 79, y: 34 },
				{ x: 135, y: 84 },
			]]
		};

		this._lastHitbox = "none";

		this._levelingUp = false;
		this._addedSkill = false;
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
			res.enabled = true;
			res.maxLocked = true;
		}

		actorData.data.resources.mana.enabled = game.settings.get('leobrew', 'manaEnabled');
		actorData.data.resources.sanity.enabled = game.settings.get('leobrew', 'sanityEnabled');
		actorData.data.resources.sanity.maxLocked = false;

		this._prepareSkills(actorData, data);

		this._prepareMana(actorData);

		this._prepareItemCategories(data);

		Object.keys(actorData.data.injuries).forEach(part => {
			let injury = actorData.data.injuries[part].value;
			actorData.data.injuries[part].path = `systems/leobrew/images/${part}${injury !== "" ? "_"+injury : ''}.webp`;
		})

		// Prepare active effects
		data.effects = prepareActiveEffectCategories(this.actor.effects);

		return data;

	}

	_prepareSkills(actorData, data){

		if ( actorData.data.skills ) {

			actorData.data.sortedSkills = {};

			let sorted = Object.entries(foundry.utils.duplicate(actorData.data.skills));
			sorted.sort((a,b) => {
				return a[0].localeCompare(b[0])
			})

			for (let [s, skill] of sorted) {
				skill.magicClass = skill.isMagic ? "active" : "";
				skill.cssClass = skill.isMagic ? "magic-skill" : "";
				actorData.data.sortedSkills[s] = skill;
			}
		}
	}

	_prepareMana(actorData){

		let mana = actorData.data.resources.mana;

		mana.max = 5 + actorData.data.abilities.will.value;

		for(let skill of Object.values(actorData.data.skills)){
			if(skill?.isMagic) {
				if (skill.value >= 5) {
					mana.max += skill.value * 3;
				}
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
			html.find('.skill-name').contextmenu(this._handleSkillContextMenu.bind(this));
			html.find('.skill-add').click(this._onAddSkill.bind(this));

			let skillList = game.settings.get('leobrew', 'skillList').map(entry => `<option>${entry}</option>`);

			html.find('#skill-autocomplete').append(skillList);

			html.find('.skill-name-input').keyup(event => {
				if (event.keyCode === 13) this._onAddSkill(event);
			});

			if(this._addedSkill){
				this._addedSkill = false;
				html.find('.skill-name-input').focus();
			}

			html.find('.item .item-image').click(this._onItemRoll.bind(this));
			html.find('.item-create').click(this._onItemCreate.bind(this));
			html.find('.item-delete').click(this._onItemDelete.bind(this));
			html.find('.item-quantity').change(this._onItemQuantityChange.bind(this));
			html.find('.item-expand').click(this._onItemExpand.bind(this));
			html.find('.item-edit').click(this._onItemEdit.bind(this));
			html.find('.item-toggle').click(this._onToggleItem.bind(this));

			html.find(".effect-control").click(ev => onManageActiveEffect(ev, this.actor));

			html.find(".hitboxes").mousemove(this._highlightHitBox.bind(this));
			html.find(".hitboxes").mouseleave(this._highlightHitBox.bind(this));
			html.find(".hitboxes").contextmenu(this._handleHitboxContextMenu.bind(this));

		}

		super.activateListeners(html);

	}

	/* -------------------------------------------- */

	_getHitboxBodypart(event){

		let hitCoords = {
			x: event.offsetX,
			y: event.offsetY
		}

		let bodypart = false;
		for(let [hitbox, coordSets] of Object.entries(this._hitboxes)){
			for(let coordSet of coordSets) {
				let hitX = hitCoords.x >= coordSet[0].x && hitCoords.x < coordSet[1].x;
				let hitY = hitCoords.y >= coordSet[0].y && hitCoords.y < coordSet[1].y;
				if (hitX && hitY) {
					bodypart = hitbox;
					break;
				}
			}
		}

		return bodypart;

	}

	_highlightHitBox(event){

		let bodypart = this._getHitboxBodypart(event);

		if(bodypart === this._lastHitbox) return;

		this._lastHitbox = bodypart;

		let hitboxParent = $(event.currentTarget);

		hitboxParent.find(".active").removeClass('active');

		if(!this._lastHitbox) return;

		hitboxParent.find(`.${this._lastHitbox}`).addClass('active');

	}

	async _handleHitboxContextMenu(event){

		let bodypart = this._getHitboxBodypart(event);

		if(!bodypart) return;

		let hitCoords = {
			x: event.pageX,
			y: event.pageY
		}

		new ContextMenu()
			.setCallback(this._contextMenuCallback.bind(this))
			.addMenuItem("No Injury", { data: [bodypart, ""] })
			.addMenuItem("Bruise", { data: [bodypart, "bruise"] })
			.addMenuItem("Light Injury", { data: [bodypart, "light"] })
			.addMenuItem("One Severe", { data: [bodypart, "one-severe"] })
			.addMenuItem("Two Severe", { data: [bodypart, "two-severe"] })
			.addMenuItem("Critical", { data: [bodypart, "critical"] })
			.show({ position: { x: hitCoords.x, y: hitCoords.y } })

	}

	async _handleSkillContextMenu(event){

		const set = event.currentTarget.parentElement.dataset;
		let skillName = set.skill;

		if(skillName === 'generic') return;

		let skill = this.actor.data.data.skills[skillName];

		let self = this;
		new ContextMenu()
			.setCallback(this._contextMenuCallback.bind(this))
			.setHeader(skill.label)
			.addMenuItem("Rename", { fa: "fa-edit", callback: async function(){
				new Dialog({
					title: `Rename skill - ${skill.label}`,
					content: `<input style="margin-bottom: 10px;" type="text" value="${skill.label}" name="skill-name">`,
					buttons: {
						one: {
							label: "Done", callback: async (html) => {
								let newSkillName = html.find('input[name="skill-name"]').val();
								let oldValue = skill.value;
								let oldIsMagic = skill.isMagic;
								await self.actor.removeSkill(skillName, { showDialog: false });
								await self.actor.addSkill(newSkillName, { isMagic: oldIsMagic, value: oldValue });
								self.render();
							}
						}
					}
				}).render(true);
			}})
			.addMenuItem(`Set skill as ${skill.isMagic ? "non-" : ""}magic`, { fa: "fa-hat-wizard", callback: async function(){
				await self.actor.setSkillIsMagic(skillName, !skill?.isMagic);
				self.render();
			}})
			.addMenuItem("Remove", { fa: "fa-trash", callback: async function(){
				await self.actor.removeSkill(skillName, { showDialog: true });
				self.render();
			}})
			.show({ position: { x: event.pageX, y: event.pageY } })

	}

	_contextMenuCallback(data){
		this.actor.addInjury(...data);
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
		const field = $(event.currentTarget).parent().find('.skill-name-input');
		let skill = field.val();
		field.val("")
		await this.actor.addSkill(skill);
		this._addedSkill = true;
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
		let skill = set.skill;
		await this.actor.removeSkill(skill, { showDialog: !event.altKey });
		return this.render();
	}

	/* -------------------------------------------- */

	/**
	 * Handle removing a skill from the sheet
	 * @param {Event} event   The originating click event
	 * @private
	 */
	async _onSetSkillIsMagic(event){
		event.preventDefault();
		const set = event.currentTarget.parentElement.dataset;
		let skill = this.actor.data.data.skills[set.skill];
		return this.actor.setSkillIsMagic(set.skill, !skill?.isMagic);
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
	async _onItemCreate(event) {
		event.preventDefault();
		const header = event.currentTarget;
		const type = header.dataset.type;
		const itemData = {
			name: game.i18n.format("LEOBREW.ItemNew", { type: type }),
			type: type
		};
		const [ item ] = await this.actor.createEmbeddedDocuments("Item", [itemData]);
		item.sheet.render(true);
		return item;
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
		let skill = set?.skill ?? "";
		let options = { event: event };
		if(skill === "generic"){
			return this.actor.rollGeneric(options);
		}
		return this.actor.rollSkill(skill, options);
	}
	/* -------------------------------------------- */

	/** @inheritdoc */
	_getSubmitData(updateData) {
		return super._getSubmitData(updateData);
	}
}
