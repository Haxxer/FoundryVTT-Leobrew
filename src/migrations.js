export async function runMigrations() {

	let migrationSuccessful = false;

	for (const [version, migration] of Object.entries(migrations)) {
		try {
			await migration(version);
			await game.settings.set("leobrew", "migration-version", version);
		} catch (err) {
			console.error(err);
			ui.notifications.error(`Something went wrong when migrating to version ${version}. Please check the console for the error!`)
		}
	}

	if(migrationSuccessful) ui.notifications.info("Leobrew migrated to latest version!")
}

const migrations = {

	"1.0.0": async (version) => {

		const globalItemsToUpdate = [];
		const invalidItems = Array.from(game.items.invalidDocumentIds);
		if(invalidItems.length) {
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

		for(const actor of Array.from(game.actors)){

			const actorInvalidItems = Array.from(actor.items.invalidDocumentIds);
			if(actorInvalidItems.length) {
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

			const skillItems = [];
			if(actor.system?.skills) {
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
		}
	}
}