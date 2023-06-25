<svelte:options accessors={true} />

<script>
  import { ApplicationShell } from "@typhonjs-fvtt/runtime/svelte/component/core";
  import { setContext } from "svelte";
  import { getContext } from "svelte";
  import ItemHeader from "./ItemHeader.svelte";
  import Equipment from "./Equipment/equipment-shell.svelte";
  import Skill from "./Skill/skill-shell.svelte";
  import Trait from "./Trait/trait-shell.svelte";

  export let elementRoot;
  export let documentStore;
  export let applicationStateStore;
  setContext("DocumentStore", documentStore);
  setContext("ApplicationStateStore", applicationStateStore);
  const appState = getContext("ApplicationStateStore");

  let component;
  $: {
    switch($documentStore.type){
			case "equipment":
        component = Equipment;
        break;
			case "skill":
        component = Skill;
        break;
			case "trait":
        component = Trait;
        break;
		}
	}

</script>

<ApplicationShell bind:elementRoot>
  <div class="item-sheet">
		<ItemHeader/>
		<svelte:component this={component}/>
  </div>
</ApplicationShell>

<style lang="scss">
	.item-sheet{
    display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>
