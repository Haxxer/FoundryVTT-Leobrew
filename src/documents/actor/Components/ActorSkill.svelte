<script>
  import { getContext } from "svelte";

  const appState = getContext("ApplicationStateStore");
  const document = getContext("DocumentStore");

	export let skill;

  let canAssignSkillPoint = false;
  let canSubtractSkillPoint = false;
  $: {
    $appState;
    canAssignSkillPoint = appState.canAssignSkillPoint(skill.id, skill.system.level);
    canSubtractSkillPoint = appState.canSubtractSkillPoint(skill.id, skill.system.level);
  }
  $: pointsSpent = $appState.leveledUpSkills?.[skill.id]?.pointsSpent ?? 0;
  $: realPointsSpent = $appState.leveledUpSkills?.[skill.id]?.cost ?? 0

</script>


<div class="actor-skill">
	{#if $appState.levelingUp}
		<i
			class="fas fa-minus"
			on:click={() => { if(canSubtractSkillPoint) appState.assignSkillPoint(skill.id, skill.system.level, -1) }}
			class:clickable={canSubtractSkillPoint}
			class:clickable-red={canSubtractSkillPoint}
			class:clickable-disabled={!canSubtractSkillPoint}
		></i>
	{/if}
	<input
		disabled
		type="number"
		value={skill.system.level + pointsSpent}
		min="1"
		max="10"
	/>
	{#if $appState.levelingUp}
		<i
			class="fas fa-plus"
			on:click={() => { if(canAssignSkillPoint) appState.assignSkillPoint(skill.id, skill.system.level, 1) }}
			class:clickable={canAssignSkillPoint}
			class:clickable-green={canAssignSkillPoint}
			class:clickable-disabled={!canAssignSkillPoint}
		></i>
	{/if}
	<div>
		<label class="skill-name clickable clickable-red" on:click={() => { skill.roll() }}>
			{skill.name}{pointsSpent ? ` (+${realPointsSpent})` : ""}
		</label>
	</div>
</div>

<style lang="scss">

  .actor-skill {
    display: flex;
    align-items: center;
		justify-content: center;
    border-radius: 4px;
    text-align: center;

    div {
      flex: 1;
			text-align: left;
    }

		i {
      margin-right: 0.25rem;
		}

    input {
      flex: 0 1 20px;
      height: 20px;
      text-align: center;
      margin-right: 0.25rem;
    }
  }

</style>
