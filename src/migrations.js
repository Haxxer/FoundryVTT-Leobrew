export async function runMigrations() {
	for (const [version, migration] of Object.entries(migrations)) {
		await migration(version);
		await game.settings.set("leobrew", "migration-version", version);
	}
}

const migrations = {

	"1.0.0": async (version) => {

		let hitError = false

		try {
			const globalItemsToUpdate = [];
			const invalidItems = Array.from(game.items.invalidDocumentIds);
			if (invalidItems.length) {
				const reg = new RegExp("(\\d+) *(\\w+)*", "g")
				const globalItemSources = game.items._source;
				for (const invalidId of invalidItems) {
					const invalidSource = globalItemSources.find(source => source._id === invalidId);
					if (invalidSource.type !== "item") continue;
					const update = {
						_id: invalidId,
						type: "equipment",
					}
					if (invalidSource.price && invalidSource.price.search(reg) > -1) {
						const match = [...invalidSource.price.matchAll(reg)];
						update["price"] = {
							[match?.[2] ?? "cp"]: Number(match[0])
						}
					}
					globalItemsToUpdate.push(update);
				}
				await Item.updateDocuments(globalItemsToUpdate);
			}
		} catch (err) {
			console.error(err);
			hitError = true;
		}

		for (const actor of Array.from(game.actors)) {

			try {
				let actorUpdates = {};
				if (actor.system.description) {
					actorUpdates["system.biography"] = { value: actor.system.description.value };
					actorUpdates["system.-=description"] = null;
					actorUpdates["system.description.-=value"] = null;
				}

				if (
					foundry.utils.hasProperty(actor.system, "currency.gp")
					||
					foundry.utils.hasProperty(actor.system, "currency.sp")
					||
					foundry.utils.hasProperty(actor.system, "currency.cp")
				) {
					const gp = typeof foundry.utils.getProperty(actor.system, "currency.gp") === "number"
						? foundry.utils.getProperty(actor.system, "currency.gp") ?? 0
						: foundry.utils.getProperty(actor.system, "currency.gp.value") ?? 0;

					const sp = typeof foundry.utils.getProperty(actor.system, "currency.sp") === "number"
						? foundry.utils.getProperty(actor.system, "currency.sp") ?? 0
						: foundry.utils.getProperty(actor.system, "currency.sp.value") ?? 0;

					const cp = typeof foundry.utils.getProperty(actor.system, "currency.cp") === "number"
						? foundry.utils.getProperty(actor.system, "currency.cp") ?? 0
						: foundry.utils.getProperty(actor.system, "currency.cp.value") ?? 0;

					actorUpdates["system.currencies"] = {
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
					actorUpdates["system.currency.-=gp"] = null;
					actorUpdates["system.currency.-=sp"] = null;
					actorUpdates["system.currency.-=cp"] = null;
					actorUpdates["system.currency"] = null;
				}
				await actor.update(actorUpdates);

			} catch (err) {
				console.error(err);
				hitError = true;
			}

			try {
				const actorInvalidItems = Array.from(actor.items.invalidDocumentIds);
				if (actorInvalidItems.length) {
					const itemsToUpdate = [];
					const reg = new RegExp("(\\d+) *(\\w+)*", "g")
					const actorSources = actor.items._source;
					for (const invalidId of actorInvalidItems) {
						const invalidSource = actorSources.find(source => source._id === invalidId);
						if (invalidSource.type !== "item") continue;
						const update = {
							_id: invalidId,
							type: "equipment",
						}
						if (invalidSource.price && invalidSource.price.search(reg) > -1) {
							const match = [...invalidSource.price.matchAll(reg)];
							update["price"] = {
								[match?.[2] ?? "cp"]: Number(match[0])
							}
						}
						itemsToUpdate.push(update);
					}

					await actor.updateEmbeddedDocuments("Item", itemsToUpdate);
				}
			} catch (err) {
				console.error(err);
				hitError = true;
			}

			try {
				const skillItems = [];
				if (actor.system?.skills) {
					const actorUpdates = {};
					for (const [key, skill] of Object.entries(actor.system.skills)) {
						let category = "";
						let skillName = skill.label;
						if (skillName.includes(" - ")) {
							const split = skillName.split(" - ");
							category = split[0];
							skillName = split.slice(1).join(": ");
						} else if (skillName.includes(": ")) {
							const split = skillName.split(": ");
							category = split[0];
							skillName = split.slice(1).join(": ");
						}

						skillItems.push({
							name: skillName,
							type: "skill",
							system: {
								category,
								level: skill.value,
								isMagic: skill.isMagic
							}
						})

						actorUpdates[`system.skills.-=${key}`] = null;
					}

					actorUpdates[`system.-=skills`] = null;

					await actor.update(actorUpdates);
					await actor.createEmbeddedDocuments("Item", skillItems);

				}
			} catch (err) {
				console.error(err);
				hitError = true;
			}
		}

		if (hitError) ui.notifications.error(`Something went wrong when migrating to version ${version}. Please check the console for the error!`)
	}
}
