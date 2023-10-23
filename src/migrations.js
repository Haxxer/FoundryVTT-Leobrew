export default async function runMigrations() {

	let migrationSuccessful = false;

	for (const [version, migration] of Object.entries(migrations)) {
		try {
			await migration(version);
			//await game.settings.set("leobrew", "migration-version", version);
		} catch (err) {
			console.error(err);
			ui.notifications.error(`Something went wrong when migrating to version ${version}. Please check the console for the error!`)
		}
	}

	if(migrationSuccessful) ui.notifications.info("Leobrew migrated to latest version!")
}

const migrations = {

	"1.0.0": async (version) => {

		for(const actor of Array.from(game.actors)){

			const actorUpdates = {};

			const skillItems = [];
			if(actor.system?.skills) {
				for (const skill of Object.values(actor.system.skills)) {
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
				}

				actorUpdates["system.-=skills"] = null;
				await actor.createEmbeddedDocuments("Item", skillItems);
			}

			const itemsToUpdate = [];
			const reg = new RegExp("(\\d+) *(\\w+)*", "g")
			const actorSources = actor.items._source;
			for(const invalidId of Array.from(actor.items.invalidDocumentIds)){
				const invalidSource = actorSources.find(source => source._id === invalidId);
				if(invalidSource.type !== "item") continue;
				const update = {
					_id: invalidId,
					type: "equipment",
				}
				if(invalidSource.price && invalidSource.price.search(reg) > -1) {
					const match = [...invalidSource.price.matchAll(reg)];
					update["price"] = {
						[match?.[2] ?? "cp"]: Number(match[0])
					}
				}
				itemsToUpdate.push(update);
			}

			await actor.updateEmbeddedDocuments("Item", itemsToUpdate);

			if(
				(hasProperty(actor, "system.currency.gp") && !hasProperty(actor, "system.currency.gp.value"))
				||
				(hasProperty(actor, "system.currency.sp") && !hasProperty(actor, "system.currency.sp.value"))
				||
				(hasProperty(actor, "system.currency.cp") && !hasProperty(actor, "system.currency.cp.value"))
			){
				actorUpdates["system.currency"] = {
					gp: {
						value: getProperty(actor, "system.currency.gp") ?? 0,
						bank: 0
					},
					sp: {
						value: getProperty(actor, "system.currency.sp") ?? 0,
						bank: 0
					},
					cp: {
						value: getProperty(actor, "system.currency.cp") ?? 0,
						bank: 0
					}
				}
			}

			await actor.update({
				"system.experience.initialized": true,
				...actorUpdates
			});

		}

	}

}
