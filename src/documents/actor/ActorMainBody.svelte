<script>
  import { getContext } from "svelte";
  import ActorSkills from "./ActorSkills.svelte";
  import Tabs from "../../svelte-components/Tabs.svelte";

  const appState = getContext("ApplicationStateStore");

</script>

<div class="actor-main-body">
	<ActorSkills/>
	<div class="actor-center-section">
		<Tabs bind:activeTab={$appState.activeTab} tabs={$appState.tabs} underscore/>
		<svelte:component this={$appState.activeTab.component}/>
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
