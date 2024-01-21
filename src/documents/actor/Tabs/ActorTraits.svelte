<script>
  import { getContext } from "svelte";
  import ActorTrait from "../Components/ActorTrait.svelte";
  import SearchableItemList from "../Components/SearchableItemList.svelte";
  import { updateDoc } from "../../base/UpdateDoc.js";

  const doc = getContext("DocumentStore");

  $: itemsStore = $doc.items.filter((item) => item.type === "trait");

</script>

<div class="inventory">
	<div class="actor-modifiers-container">

		<div class="actor-modifiers-list">
			<div>Mana</div>
			<input type="number" use:updateDoc={{ doc, accessor: "system.resources.mana.bonus" }}/>
			<div>Luck</div>
			<input type="number" use:updateDoc={{ doc, accessor: "system.resources.luck.bonus" }}/>
			{#if $doc.system.resources.sanity.enabled}
				<div>Sanity</div>
				<input type="number" use:updateDoc={{ doc, accessor: "system.resources.sanity.bonus" }}/>
			{/if}
		</div>

	</div>
	<SearchableItemList {itemsStore} component={ActorTrait} type="trait"/>
</div>


<style lang="scss">

  .actor-modifiers-container {
    display: grid;
    grid-template-columns: 1fr;
    margin-bottom: 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    text-align: center;
    column-gap: 10px;
    row-gap: 5px;
  }

  .actor-modifiers-list {
    display: flex;

    input {
      height: 20px;
	    margin: 0 0.5rem;
    }

	  & > * {
		  flex: 1;
	  }
  }

</style>
