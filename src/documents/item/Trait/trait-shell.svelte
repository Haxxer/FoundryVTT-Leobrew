<script>

  import { getContext } from "svelte";
  import { TJSProseMirror } from "#standard/component";

  const doc = getContext("DocumentStore");

  let content = $doc.system.description.value;
  $: {
    $doc.update({
      "system.description.value": content
    });
  }

</script>

<div class="item-container">

	<div class="description-container">
		<TJSProseMirror
			bind:content
			options={{ editable: true, secrets: game.user.isGM }}
		/>
	</div>

</div>

<style lang="scss">

  .description-container {
    height: 100%;
    flex: 1;
  }

</style>

