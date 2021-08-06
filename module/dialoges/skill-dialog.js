export default class SkillConfigurerFormApplication extends FormApplication{

	constructor(dialogData={}, options={}) {
		super(dialogData, options);
		game.settings.sheet.close();
	}

	/* -------------------------------------------- */

	/** @override */
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			title: "Configure skills",
			template: `systems/leobrew/templates/dialog/skill-configure.html`,
			classes: ["leobrew"],
			width: 425,
			height: 900,
		});
	}

	/* -------------------------------------------- */

	/** @override */
	getData() {
		let data = super.getData();
		data.cssClass = "settings-dialog";
		data.skills = game.settings.get('leobrew', 'skillList').map(entry => `${entry}\n`).join('');
		return data;
	}

	async _updateObject(event, formData) {
		let skillList = formData.skillList.split('\n').filter(entry => entry !== "").sort();
		game.settings.set('leobrew', 'skillList', skillList);
	}

}