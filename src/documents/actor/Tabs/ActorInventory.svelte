<script>
  import { getContext } from "svelte";
  import ActorEquipment from "../Components/ActorEquipment.svelte";
  import SearchableItemList from "../Components/SearchableItemList.svelte";
  import CurrencyList from "../Components/CurrencyList.svelte";

  const appState = getContext("ApplicationStateStore");
  const document = getContext("DocumentStore");

  const itemsStore = document.embedded.create("Item", {
    name: "actorItems",
    filters: [(item) => {
      return item.type === "equipment";
    }]
  });

</script>

<div class="inventory">
	<CurrencyList/>
	<SearchableItemList {itemsStore} component={ActorEquipment} type="equipment"/>
</div>
