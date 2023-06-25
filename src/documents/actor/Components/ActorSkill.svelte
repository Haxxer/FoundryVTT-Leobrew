<script>
  import { getContext } from "svelte";
  import { TJSDialog } from "@typhonjs-fvtt/runtime/svelte/application";

  const appState = getContext("ApplicationStateStore");
  const doc = getContext("DocumentStore");

  export let skill;

  let canAssignSkillPoint = false;
  let canSubtractSkillPoint = false;
  let subSkills = []
  let skillBonus = 0;
  $: {
    $appState;
    canAssignSkillPoint = appState.canAssignSkillPoint(skill.id, skill.system.level);
    canSubtractSkillPoint = appState.canSubtractSkillPoint(skill.id, skill.system.level);
    subSkills = skill.parent.getSubSkills(skill);
    skillBonus = skill.parent.getBonusForSkill(skill);
  }
  $: pointsSpent = $appState.leveledUpSkills?.[skill.id]?.pointsSpent ?? 0;
  $: realPointsSpent = $appState.leveledUpSkills?.[skill.id]?.cost ?? 0

	function dragStart(event){
    event.dataTransfer.setData('text/plain', JSON.stringify({
			type: "Item",
			uuid: skill.uuid
		}));
	}

</script>


<div class="actor-skill" draggable="true" on:dragstart={dragStart}>
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
		max="10"
		min="1"
		type="number"
		data-tooltip={skillBonus ? `Base ${skill.system.level} (${skillBonus} bonus)` : ""}
		value={$appState.levelingUp ? skill.system.level + pointsSpent : skill.system.level + skillBonus}
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
		<label class="skill-name clickable clickable-red" on:click={(event) => { skill.roll({ event }) }}>
			{skill.name}{pointsSpent ? ` (+${realPointsSpent})` : ""}
		</label>
	</div>
	<i class="fas fa-edit skill-edit-button clickable clickable-red" on:click={() => {
		skill.sheet.render(true, {
			width: 200,
			height: 200,
			left: 0,
			top: 0
		});
	}}></i>
	<i class="fas fa-trash skill-edit-button clickable clickable-red" on:click={() => {
		TJSDialog.confirm({
			title: "Delete Skill",
			content: `<p style='text-align: center;'>Are you sure you want to delete "${skill.name}"?</p>`,
			onYes: () => {
				skill.delete();
			}
		}, { width: 270, height: "auto" });
		}}></i>
</div>

{#if subSkills.length}

	{#each subSkills as subSkill}

		<div class="actor-skill actor-subskill">

			<input
				disabled
				max="10"
				min="1"
				type="number"
				value={subSkill.bonus + skillBonus + pointsSpent}
			/>
			<div>
				<label class="skill-name clickable clickable-red" on:click={(event) => { skill.roll({
					event,
				 	extraTitle: subSkill.name,
				 	subSkill
				}) }}>
					{subSkill.name}
				</label>
			</div>

		</div>

	{/each}

{/if}

<style lang="scss">

  .actor-skill {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    text-align: center;
		margin-bottom: 0.25rem;

    div {
      flex: 1;
      text-align: left;
    }

    i {
      margin-right: 0.25rem;
    }

		.skill-edit-button{
			display: none;
			opacity: 0.5;

			&:hover {
        opacity: 1;
			}
		}

		&:hover .skill-edit-button {
      display: block;
		}

    input {
      flex: 0 1 20px;
      height: 20px;
      text-align: center;
      margin-right: 0.25rem;
    }
  }

  .actor-subskill {
    margin: 0 0 0.25rem 0.5rem;
    font-size: small;
    font-style: italic;
  }

</style>
