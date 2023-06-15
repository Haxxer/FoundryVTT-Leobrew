<script>
  import { localize } from "@typhonjs-fvtt/runtime/svelte/helper";
  import { getContext } from "svelte";
  import { writable } from "svelte/store";
  import ActorItem from "../Components/ActorItem.svelte";

  const appState = getContext("ApplicationStateStore");
  const document = getContext("DocumentStore");

  let search = writable("");
  const allItems = document.embedded.create("Item", {
    name: "actorItems",
    filters: [(item) => {
      return item.type === "item";
    }]
  });

  $: items = [...$allItems].filter(item => {
  	return (!$search || $search.toLowerCase() === item.name.toLowerCase());
	});

</script>

<div class="inventory">

	<div class="items-list inventory-list">

		<div class="items-header">

			<input type="text" placeholder="Search Items" bind:value={$search}/>

			<a class="item-control item-create" data-type="item" data-tooltip='{localize("LEOBREW.ItemCreate")}'
				on:click={async () => {
          const [item] = await $appState.actor.createEmbeddedDocuments("Item", [{ name: "New Item", type: "item" }]);
          item.sheet.render(true);
				}}
			>
				<i class="fas fa-plus"></i> {localize("LEOBREW.Add")}
			</a>

		</div>

		<div class="item-list item-inventory">
			{#each items as item (item.id)}
				<ActorItem {item}/>
			{/each}
		</div>

	</div>

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

		.item-create {
			flex: 1 0 auto;
			text-align: center;
			margin-left: 1rem;
		}
	}

</style>
