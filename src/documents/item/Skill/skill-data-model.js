export default class SkillDataModel extends foundry.abstract.DataModel {
	static defineSchema() {
		const fields = foundry.data.fields;
		return {
			level: new fields.NumberField({
				required: true,
				initial: 1,
				integer: true
			}),
			startingLevel: new fields.NumberField({
				required: true,
				initial: 1,
				integer: true
			}),
			isMagic: new fields.BooleanField({
				required: true,
				initial: false
			}),
			category: new fields.StringField({
				required: true,
				initial: "Generic",
			}),
		};
	}
}
