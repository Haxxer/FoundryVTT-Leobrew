<script>

	import { localize } from "#runtime/svelte/helper";
	import { capitalizeFirstLetter } from "~/lib/lib.js";

	import { getContext } from "svelte";
	import { writable } from "svelte/store";
	import { sortable } from "svelte-agnostic-draggable";

	const appState = getContext("ApplicationStateStore");
	const documentStore = getContext("DocumentStore");

	export let itemsStore;
	export let component;
	export let type;

	const capType = capitalizeFirstLetter(type);

	let search = writable("");
	let category = writable("");
	let filters = writable({
		"system.equipped": null
	});
	$: categories = [...new Set(itemsStore.filter(item => item.system?.category).map(item => item.system.category.trim()).sort())];
	$: items = itemsStore
		.filter(item =>
			$search.toLowerCase().split(" ").every(part => (!part || item.name.toLowerCase().includes(part)))
			&&
			(!$category || $category === item.system.category)
			&&
			Object.entries($filters).every(([key, filter]) => {
				return filter === null || foundry.utils.getProperty(item, key) === filter;
			})
		)
		.sort((a, b) => {
			return b.sort !== a.sort ? b.sort - a.sort : (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
		})

	function onSortableUpdate(event) {
		const newItemOrder = [...items];
		const [itemToUpdate] = newItemOrder.splice(event.detail.previousIndex, 1);
		newItemOrder.splice(event.detail.newIndex, 0, itemToUpdate);
		$documentStore.updateEmbeddedDocuments("Item", newItemOrder.map((item, index) => ({
			_id: item.id,
			sort: (newItemOrder.length - index) * 100000
		})))
	}

</script>


<div class="items-header">

	<input bind:value={$search} placeholder="{localize(`LEOBREW.${capType}Search`)}" type="text"/>

	{#if type === "equipment"}

		{#if categories.length}
			<select bind:value={$category}>
				<option value="">No category</option>
				{#each categories as category}
					<option>{category}</option>
				{/each}
			</select>
		{/if}

		<a class="item-control item-filter" data-type="equipment"
		   on:click={async () => {
          filters.update(val => {
						val["system.equipped"] = val["system.equipped"] === null
							? true
							: (val["system.equipped"] === false ? null : false);

          	return val;
					});
				}}
		>
			<i class="fas"
			   class:inactive-filter={$filters["system.equipped"] === null}
			   class:fa-shield-alt={!$filters["system.equipped"]}
			   class:fa-shield={$filters["system.equipped"]}
			></i>
		</a>
	{/if}

	<a class="item-control item-create" data-tooltip='{localize(`LEOBREW.${capType}Create`)}' data-type="equipment"
	   on:click={async () => {
          const [item] = await $appState.actor.createEmbeddedDocuments("Item", [{ name: `New ${capType}`, type }]);
          item.sheet.render(true);
				}}
	>
		<i class="fas fa-plus"></i> {localize("LEOBREW.Add")}
	</a>

</div>

<div class="item-list item-inventory" on:sortable:update={onSortableUpdate} use:sortable={{
	cursor: "grabbing", tolerance: "intersect"
}}>
	{#each items as item, index (item.id)}
		<svelte:component this={component} {item} {index}/>
	{/each}
</div>

<style lang="scss">

  .items-list {
    display: flex;
    flex-direction: column;
  }

  .items-header {
    display: flex;
    flex-direction: row;
    border: var(--borderGroove);
    background-color: var(--colorFaint);
    padding: 3px 5px;
    align-items: center;

    select {
      margin: 0 0.25rem;
    }

    .item-name {
      flex: 1;
      font-size: 1rem;
    }

    .item-create, .item-filter {
      flex: 1 0 auto;
      text-align: center;
      margin-left: 0.9rem;
    }
  }

  .inactive-filter {
    opacity: 0.5;
  }

  .item-inventory {
    flex: 1;
    overflow-y: scroll;
  }

</style>
