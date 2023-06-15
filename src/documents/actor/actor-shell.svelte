<svelte:options accessors={true} />

<script>
  import { ApplicationShell } from "@typhonjs-fvtt/runtime/svelte/component/core";
  import { localize } from '@typhonjs-fvtt/runtime/svelte/helper';
  import { setContext } from "svelte";
  import { getContext } from "svelte";
  import Tabs from "../../svelte-components/Tabs.svelte";
  import ActorTopBar from "./ActorTopBar.svelte";
  import ActorSkills from "./ActorSkills.svelte";
  import ActorMainBody from "./ActorMainBody.svelte";


  export let elementRoot;
  export let documentStore;
  export let applicationStateStore;
  setContext("DocumentStore", documentStore);
  setContext("ApplicationStateStore", applicationStateStore);
  const appState = getContext("ApplicationStateStore");

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
