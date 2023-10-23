<svelte:options accessors={true} />

<script>
  import { ApplicationShell } from "#runtime/svelte/component/core";
  import { setContext } from "svelte";
  import ActorTopBar from "./ActorTopBar.svelte";
  import ActorMainBody from "./ActorMainBody.svelte";


  export let elementRoot;
  export let documentStore;
  export let applicationStateStore;
  setContext("DocumentStore", documentStore);
  setContext("ApplicationStateStore", applicationStateStore);

</script>

<ApplicationShell bind:elementRoot>
  <div class="actor-sheet">
    <ActorTopBar/>
		<ActorMainBody/>
  </div>
</ApplicationShell>

<style lang="scss">
	.actor-sheet{
    display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>
