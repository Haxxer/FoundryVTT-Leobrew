export default class EquipmentDataModel extends foundry.abstract.DataModel {
	static defineSchema() {
		const fields = foundry.data.fields;
		return {
			description: new fields.SchemaField({
				value: new fields.HTMLField(),
			}),
			equipped: new fields.BooleanField({
				required: true,
				initial: true
			}),
			usesQuantity: new fields.BooleanField({
				required: true,
				initial: false
			}),
			quantity: new fields.NumberField({
				required: true,
				initial: 1,
				integer: true
			}),
			addsSkill: new fields.BooleanField({
				required: true,
				initial: false
			}),
			skillLabel: new fields.StringField({
				required: true,
				initial: "Generic",
			}),
			skillBonus: new fields.NumberField({
				required: true,
				initial: 0,
				integer: true
			}),
			tiedSkills: new fields.ObjectField(),
			weight: new fields.StringField({
				required: true,
				initial: "",
			}),
			price: new fields.SchemaField({
				gp: new fields.NumberField({
					required: true,
					initial: 0,
					integer: true
				}),
				sp: new fields.NumberField({
					required: true,
					initial: 0,
					integer: true
				}),
				cp: new fields.NumberField({
					required: true,
					initial: 0,
					integer: true
				}),
			}),
		};
	}
}
