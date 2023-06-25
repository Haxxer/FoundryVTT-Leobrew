<script>

  import { getContext } from "svelte";
  import { localize } from "@typhonjs-fvtt/runtime/svelte/helper";
  import { writable } from "svelte/store";
  import { capitalizeFirstLetter } from "../../../lib/lib.js";

  const appState = getContext("ApplicationStateStore");
  const document = getContext("DocumentStore");

  export let itemsStore;
  export let component;
  export let type;

  const capType = capitalizeFirstLetter(type);

  let search = writable("");
  $: items = [...$itemsStore].filter(item => {
    return (!$search || $search.toLowerCase().split(" ").every(part => item.name.toLowerCase().includes(part)));
  });

</script>

<div class="inventory">

	<div class="items-list inventory-list">

		<div class="items-header">

			<input type="text" placeholder="{localize(`LEOBREW.${capType}Search`)}" bind:value={$search}/>

			<a class="item-control item-create" data-type="equipment" data-tooltip='{localize(`LEOBREW.${capType}Create`)}'
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
