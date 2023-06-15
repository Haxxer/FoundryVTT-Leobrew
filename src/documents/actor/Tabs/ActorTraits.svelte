<script>
  import { localize } from "@typhonjs-fvtt/runtime/svelte/helper";
  import { getContext } from "svelte";

  const appState = getContext("ApplicationStateStore");
  const document = getContext("DocumentStore");

  const allTraits = document.embedded.create("Item", {
    name: "actorTraits",
    filters: [(item) => {
      return item.type === "trait";
    }]
  });

  $: traits = [...$allTraits];

</script>

{#each traits as trait (trait.id)}
	<div>
		Test
	</div>
{/each}
