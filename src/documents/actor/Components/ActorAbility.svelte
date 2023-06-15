<script>

  import { getContext } from "svelte";

  const { application } = getContext('#external');
  const document = getContext("DocumentStore");

  const widthStore = application.position.stores.width;
  const appState = getContext("ApplicationStateStore");

  export let key;
  export let ability;

  let canAssignSkillPoint = false;
  let canSubtractSkillPoint = false;
  $: {
    $appState;
    canAssignSkillPoint = appState.canAssignSkillPoint(key, ability.value, true);
    canSubtractSkillPoint = appState.canSubtractSkillPoint(key, ability.value);
  }
  $: pointsSpent = $appState.leveledUpSkills?.[key]?.pointsSpent ?? 0;
  $: realPointsSpent = $appState.leveledUpSkills?.[key]?.cost ?? 0

</script>


<div
	class="actor-ability-container border-groove"
	class:actor-ability-container-small={$widthStore <= 550}
	class:actor-ability-container-small-leveling={$appState.levelingUp}
>
	<span class="clickable clickable-red">
		{$widthStore > 550 ? CONFIG.LEOBREW.abilities[key] : CONFIG.LEOBREW.abilityAbbreviations[key]}
	</span>
	<div class="actor-ability-input-container">
		{#if $appState.levelingUp}
			<i
				class="fas fa-minus"
				on:click={() => { if(canSubtractSkillPoint) appState.assignSkillPoint(key, ability.value, -1, true) }}
				class:clickable={canSubtractSkillPoint}
				class:clickable-red={canSubtractSkillPoint}
				class:clickable-disabled={!canSubtractSkillPoint}
			></i>
		{/if}
		<input disabled placeholder="1" type="number" value="{ability.value + pointsSpent}"/>
		{#if $appState.levelingUp}
			<i
				class="fas fa-plus"
				on:click={() => { if(canAssignSkillPoint) appState.assignSkillPoint(key, ability.value, 1, true) }}
				class:clickable={canAssignSkillPoint}
				class:clickable-green={canAssignSkillPoint}
				class:clickable-disabled={!canAssignSkillPoint}
			></i>
		{/if}
	</div>
</div>

<style lang="scss">

  .actor-ability-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    border-radius: 0.375rem;
    padding: 2px;
    text-transform: uppercase;
    font-size: 1.125rem;
    line-height: 1.75rem;

    &-small {
      flex-direction: row;

      input {
        height: 20px;
      }

			> * {
        flex: 1 0 50%;
			}
    }

    &-small-leveling {
      flex-direction: column;

      > * {
        flex: 0;
      }
    }

    .actor-ability-input-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 5px;
    }
  }

</style>
