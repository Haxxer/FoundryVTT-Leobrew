export function slugify(str){

	str = str.replace(/^\s+|\s+$/g, ''); // trim
	str = str.toLowerCase();

	// remove accents, swap ñ for n, etc
	var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
	var to   = "aaaaeeeeiiiioooouuuunc------";
	for (var i=0, l=from.length ; i<l ; i++) {
		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}

	str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
		.replace(/\s+/g, '-') // collapse whitespace and replace by -
		.replace(/-+/g, '-'); // collapse dashes

	return str;

}

export function isResponsibleGM() {
    if (!game.user.isGM) return false;
    const connectedGMs = game.users.filter(user => user.active && user.isGM);
    return !connectedGMs.some(other => other.data._id < game.user.data._id);
}

export function roundDownRoll(roll){
    return Math.max(3, Math.floor((roll/3))*3);
}