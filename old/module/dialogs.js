
export async function promptWarning({title, content}={}){
	return new Promise((resolve) => {
		new Dialog({
			title: title,
			content: `<h3 class="leobrew custom-dialog warning">${content}</h3>`,
			buttons: {
				one: {
					icon: `<i class="fas fa-check"></i>`,
					label: "Yes",
					callback: () => { resolve(true) }
				},
				two: {
					icon: `<i class="fas fa-times"></i>`,
					label: "Cancel",
					callback: () => { resolve(false) }
				}
			},
			default: "Cancel",
			close: () => { resolve(false) }
		}).render(true);
	})

}