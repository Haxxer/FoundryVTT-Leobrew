<script>
  import { getContext } from "svelte";
  import ActorTrait from "../Components/ActorTrait.svelte";
  import SearchableItemList from "../Components/SearchableItemList.svelte";

  const doc = getContext("DocumentStore");

  $: itemsStore = $doc.items.filter((item) => item.type === "trait");

</script>

<div class="inventory">
	<SearchableItemList {itemsStore} component={ActorTrait} type="trait"/>
</div>
