/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function() {
	return loadTemplates([

		// Shared Partials
		"systems/leobrew/templates/parts/active-effects.html",
		"systems/leobrew/templates/actors/parts/actor-inventory.html",
		"systems/leobrew/templates/actors/parts/actor-traits.html",

	]);
};
