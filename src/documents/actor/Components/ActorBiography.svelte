<script>

  import { getContext } from "svelte";
  import { TJSProseMirror } from "#standard/component";

  const appState = getContext("ApplicationStateStore");
  const doc = getContext("DocumentStore");

  let content = $doc.system.biography.value;
  $: {
    $doc.update({
      "system.biography.value": content
    });
  }

</script>

<div class="biography-container">
	<TJSProseMirror
		bind:content
		options={{ editable: true, secrets: $doc.isOwner }}
	/>
</div>

<style lang="scss">

  .biography-container {
    height: calc(100% - 45px);
    flex: 1;
  }

</style>

