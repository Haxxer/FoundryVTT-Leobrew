export default class ActorDataModel extends foundry.abstract.DataModel {
	static defineSchema() {
		const fields = foundry.data.fields;
		return {
			biography: new fields.SchemaField({
				value: new fields.HTMLField(),
			}),
			skills: new fields.ObjectField({ nullable: true }),
			abilities: new fields.SchemaField({
				str: new fields.SchemaField({
					value: new fields.NumberField({
						required: true,
						initial: 1,
						integer: true
					}),
				}),
				dex: new fields.SchemaField({
					value: new fields.NumberField({
						required: true,
						initial: 1,
						integer: true
					}),
				}),
				con: new fields.SchemaField({
					value: new fields.NumberField({
						required: true,
						initial: 1,
						integer: true
					}),
				}),
				will: new fields.SchemaField({
					value: new fields.NumberField({
						required: true,
						initial: 1,
						integer: true
					}),
				}),
				int: new fields.SchemaField({
					value: new fields.NumberField({
						required: true,
						initial: 1,
						integer: true
					}),
				}),
				app: new fields.SchemaField({
					value: new fields.NumberField({
						required: true,
						initial: 1,
						integer: true
					}),
				}),
			}),
			resources: new fields.SchemaField({
				luck: new fields.SchemaField({
					value: new fields.NumberField({
						required: true,
						initial: 0,
						integer: true
					}),
					max: new fields.NumberField({
						required: true,
						initial: 3,
						integer: true
					}),
					bonus: new fields.NumberField({
						required: true,
						initial: 0,
						integer: true
					}),
				}),
				mana: new fields.SchemaField({
					value: new fields.NumberField({
						required: true,
						initial: 0,
						integer: true
					}),
					max: new fields.NumberField({
						required: true,
						initial: 4,
						integer: true
					}),
					bonus: new fields.NumberField({
						required: true,
						initial: 0,
						integer: true
					}),
				}),
				sanity: new fields.SchemaField({
					value: new fields.NumberField({
						required: true,
						initial: 0,
						integer: true
					}),
					max: new fields.NumberField({
						required: true,
						initial: 0,
						integer: true
					}),
					bonus: new fields.NumberField({
						required: true,
						initial: 0,
						integer: true
					}),
				}),
			}),
			experience: new fields.SchemaField({
				value: new fields.NumberField({
					required: true,
					initial: 0,
					integer: true
				}),
				spent: new fields.NumberField({
					required: true,
					initial: 0,
					integer: true
				}),
				initialized: new fields.BooleanField({
					required: true,
					initial: false
				}),
			}),
			injuries: new fields.SchemaField({
				chest: new fields.SchemaField({
					value: new fields.StringField({
						required: true,
						initial: ""
					}),
				}),
				legs: new fields.SchemaField({
					value: new fields.StringField({
						required: true,
						initial: ""
					}),
				}),
				guts: new fields.SchemaField({
					value: new fields.StringField({
						required: true,
						initial: ""
					}),
				}),
				arms: new fields.SchemaField({
					value: new fields.StringField({
						required: true,
						initial: ""
					}),
				}),
				head: new fields.SchemaField({
					value: new fields.StringField({
						required: true,
						initial: ""
					}),
				}),
			}),
			currency: new fields.SchemaField({
				gp: new fields.SchemaField({
					value: new fields.NumberField({
						required: true,
						initial: 0,
						integer: true
					}),
					bank: new fields.NumberField({
						required: true,
						initial: 0,
						integer: true
					}),
				}),
				sp: new fields.SchemaField({
					value: new fields.NumberField({
						required: true,
						initial: 0,
						integer: true
					}),
					bank: new fields.NumberField({
						required: true,
						initial: 0,
						integer: true
					}),
				}),
				cp: new fields.SchemaField({
					value: new fields.NumberField({
						required: true,
						initial: 0,
						integer: true
					}),
					bank: new fields.NumberField({
						required: true,
						initial: 0,
						integer: true
					}),
				}),
			}),
		};
	}

	static migrateData(source) {

		if(source.description){
			source.biography.value = source.description.value;
			delete source.description;
		}

		if(
			(hasProperty(source, "currency.gp") && !hasProperty(source, "currency.gp.value"))
			||
			(hasProperty(source, "currency.sp") && !hasProperty(source, "currency.sp.value"))
			||
			(hasProperty(source, "currency.cp") && !hasProperty(source, "currency.cp.value"))
		){
			const gp = typeof getProperty(source, "currency.gp") === "number"
				? getProperty(source, "currency.gp") ?? 0
				: getProperty(source, "currency.gp.value") ?? 0;

			const sp = typeof getProperty(source, "currency.sp") === "number"
				? getProperty(source, "currency.sp") ?? 0
				: getProperty(source, "currency.sp.value") ?? 0;

			const cp = typeof getProperty(source, "currency.cp") === "number"
				? getProperty(source, "currency.cp") ?? 0
				: getProperty(source, "currency.cp.value") ?? 0;

			source["currency"] = {
				gp: {
					value: gp,
					bank: 0
				},
				sp: {
					value: sp,
					bank: 0
				},
				cp: {
					value: cp,
					bank: 0
				}
			}
		}

		return super.migrateData(source);
		
	}
}
