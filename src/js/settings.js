export default function registerSettings(){

    /*game.settings.registerMenu("leobrew", "skillListMenu", {
        name: "Custom Leobrew skill list",
        hint: "This defines a list of skills available by default to players",
        label: "Configure skill list",
        icon: "fas fa-bars",
        type: SkillConfigurerShim,
        restricted: true
    });*/

    game.settings.register("leobrew", "sanityEnabled", {
        name: "Use Resource: Sanity",
        hint: "Enabling this will enable sanity as a resource for characters.",
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });

    game.settings.register("leobrew", "manaEnabled", {
        name: "Use Resource: Mana",
        hint: "Enabling this will enable mana as a resource for characters.",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

}