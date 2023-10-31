export default class TraitDataModel extends foundry.abstract.DataModel {
	static defineSchema() {
		const fields = foundry.data.fields;
		return {
			description: new fields.SchemaField({
				value: new fields.HTMLField(),
			}),
			uses: new fields.SchemaField({
				value: new fields.NumberField({
					required: true,
					initial: 1,
					integer: true
				}),
				max: new fields.NumberField({
					required: true,
					initial: 1,
					integer: true
				}),
				per: new fields.StringField({
					initial: "Day",
				}),
			}),
		};
	}
}
