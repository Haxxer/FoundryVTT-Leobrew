<script>
  import { getContext } from "svelte";
  import ActorEquipment from "../Components/ActorEquipment.svelte";
  import SearchableItemList from "../Components/SearchableItemList.svelte";
  import CurrencyList from "../Components/CurrencyList.svelte";

  const appState = getContext("ApplicationStateStore");
  const doc = getContext("DocumentStore");

	$: itemsStore = $doc.items.filter(item => item.type === "equipment")

</script>

<div class="inventory">
	<CurrencyList/>
	<SearchableItemList {itemsStore} component={ActorEquipment} type="equipment"/>
</div>

<style lang="scss">

	.inventory {
		display: flex;
		flex-direction: column;
		max-height: calc(100% - 30px);
		overflow: hidden;
	}

</style>
