<script>
  import { getContext } from "svelte";
  import ActorEquipment from "../Components/ActorEquipment.svelte";
  import SearchableItemList from "../Components/SearchableItemList.svelte";

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
	<SearchableItemList {itemsStore} component={ActorEquipment} type="equipment"/>
</div>
