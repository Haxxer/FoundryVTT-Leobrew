export default async function runMigrations(){

    let migrationRan = false;

    if(isNewerVersion("0.6.0", game.settings.get("leobrew", "migration-version"))) {

        for(const actor of Array.from(game.actors)){
            await actor.update({
                "data.currency.-=pp": null
            })
        }

        await game.settings.set("leobrew", "migration-version", "0.6.0")

        migrationRan = true;

    }

    if(migrationRan) ui.notifications.info("Leobrew migrated to latest version!")

}



