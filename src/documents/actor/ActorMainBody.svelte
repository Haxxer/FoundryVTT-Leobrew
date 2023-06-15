<script>
  import { getContext } from "svelte";
  import ActorSkills from "./ActorSkills.svelte";
  import Tabs from "../../svelte-components/Tabs.svelte";
  import ActorTraits from "./Tabs/ActorTraits.svelte";
  import ActorInventory from "./Tabs/ActorInventory.svelte";

  const appState = getContext("ApplicationStateStore");

  const tabs = [
    { value: "inventory", label: "Inventory", component: ActorInventory },
    { value: "traits", label: "Traits", component: ActorTraits },
    { value: "injuries", label: "Injuries" },
    { value: "biography", label: "Biography" },
    { value: "effects", label: "Effects" },
	]
  let activeTab = tabs[0];

</script>

<div class="actor-main-body">
	<ActorSkills/>
	<div class="actor-center-section">
		<Tabs bind:activeTab {tabs} underscore/>
		<svelte:component this={activeTab.component}/>
	</div>
</div>


<style lang="scss">
	.actor-main-body {
		display: flex;
		flex: 1;
    min-height: 0; /* new */
	}

	.actor-center-section {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 0 5px;
	}
</style>
