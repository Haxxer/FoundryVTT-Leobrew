<script>
  import { getContext } from "svelte";
  import ActorTrait from "../Components/ActorTrait.svelte";
  import SearchableItemList from "../Components/SearchableItemList.svelte";

  const appState = getContext("ApplicationStateStore");
  const document = getContext("DocumentStore");

  const itemsStore = document.embedded.create("Item", {
    name: "actorTraits",
    filters: [(item) => {
      return item.type === "trait";
    }]
  });

</script>

<div class="inventory">
	<SearchableItemList {itemsStore} component={ActorTrait} type="trait"/>
</div>
