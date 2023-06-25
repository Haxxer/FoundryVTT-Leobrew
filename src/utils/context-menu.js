export default class ContextMenu extends FormApplication{

	constructor({menuItems=[], selectedItem="", dialogData={}, options={}}={}) {
		super(dialogData, options);
		this.menuItems = menuItems;
    this.selectedItem = selectedItem;
    this.header = "";
    this.showHeader = false;
		this.callback = undefined;
	}

	/* -------------------------------------------- */

	/** @override */
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			template: `systems/leobrew/templates/parts/context-menu.html`,
			classes: ["leobrew", "context-menu"],
			width: 80
		});
	}

	setHeader(inStr){
		this.header = inStr;
		this.showHeader = true;
		return this;
	}

	setCallback(callback){
		this.callback = callback;
		return this;
	}

	addMenuItem(label, options={}){
		this.menuItems.push(foundry.utils.mergeObject(
      { label, data: false, fa: "", "class": "", "callback": false },
      options
    ));
		return this;
	}

	async show({position={x: 0, y: 0}}={}){
		let self = this;
		['click', 'contextmenu'].forEach( evt => document.addEventListener(evt, () => { self.close(); }));
		await sleep(10);
		this.render(true);
		await sleep(0);
		this.setPosition({ left: position.x, top: position.y });
		return this;
	}

	/* -------------------------------------------- */

	/** @override */
	getData() {
		let data = super.getData();
		data.menuItems = this.menuItems;
    if(this.selectedItem !== false) {
      data.menuItems.forEach(item => {
        console.log(this.selectedItem)
        if (item.id === this.selectedItem) {
          item.class = "selected";
          console.log(item);
        }
      })
    }
		data.header = this.header;
		data.showHeader = this.showHeader;
		return data;
	}

	async _updateObject(event, formData) {
		let text = event.submitter.dataset.label;
		let item = this.menuItems.find(i => i.label === text);
		if(item.callback){
			item.callback(item.data)
		}else if(this.callback){
			this.callback(item.data);
		}
	}

}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
