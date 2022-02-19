export default async function runMigrations(){

    if(game.world.data._source["systemVersion"] === '0.6.0') {

        for(const actor of Array.from(game.actors)){
            await actor.update({
                "data.currency.-=pp": null
            })
        }

        ui.notifications.info("Leobrew migrated to 0.6.0")

    }


}