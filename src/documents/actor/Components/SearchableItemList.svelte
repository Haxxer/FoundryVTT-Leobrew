<script>

	import { localize } from "#runtime/svelte/helper";
	import { capitalizeFirstLetter } from "~/lib/lib.js";

	import { getContext } from "svelte";
	import { writable } from "svelte/store";

	const appState = getContext("ApplicationStateStore");

	export let itemsStore;
	export let component;
	export let type;

	const capType = capitalizeFirstLetter(type);

	let search = writable("");
	let filters = writable({
		"system.equipped": null
	});
	$: items = itemsStore.filter(item => {
		return $search.toLowerCase().split(" ").every(part => {
			return (!part || item.name.toLowerCase().includes(part))
				&& Object.entries($filters).every(([key, filter]) => {
					return filter === null || foundry.utils.getProperty(item, key) === filter;
				});
		});
	});

</script>


<div class="items-header">

	<input bind:value={$search} placeholder="{localize(`LEOBREW.${capType}Search`)}" type="text"/>

	{#if type === "equipment"}

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

<div class="item-list item-inventory">
	{#each items as item (item.id)}
		<svelte:component this={component} {item}/>
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
