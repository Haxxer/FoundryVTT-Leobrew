<script>
	import { getContext } from "svelte";
	import { TJSDocument } from "#runtime/svelte/store/fvtt/document";

	const appState = getContext("ApplicationStateStore");

	export let skill;

	const skillDoc = new TJSDocument(skill);

	let canAssignSkillPoint = false;
	let canSubtractSkillPoint = false;

	let subSkills = $skillDoc.stores.subSkills;
	let skillBonus = $skillDoc.stores.bonus;
	$: {
		$appState;
		$skillDoc;
		canAssignSkillPoint = appState.canAssignSkillPoint(skill.id, skill.system.level);
		canSubtractSkillPoint = appState.canSubtractSkillPoint(skill.id, skill.system.level);
	}

	$: pointsSpent = $appState.leveledUpSkills?.[skill.id]?.pointsSpent ?? 0;
	$: realPointsSpent = $appState.leveledUpSkills?.[skill.id]?.cost ?? 0

	function dragStart(event) {
		event.dataTransfer.setData('text/plain', JSON.stringify({
			type: "Item",
			uuid: skill.uuid
		}));
	}

</script>


<div class="actor-skill" class:magic-skill={skill.system.isMagic} draggable="true" on:dragstart={dragStart}>
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
		data-tooltip={$skillBonus ? `Base ${skill.system.level} (${$skillBonus} bonus)` : ""}
		disabled
		max="10"
		min="1"
		type="number"
		value={$appState.levelingUp ? skill.system.level + pointsSpent : skill.system.level + $skillBonus}
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
	<div class="skill-label">
		<label class="skill-name" class:clickable={!$appState.levelingUp} class:clickable-red={!$appState.levelingUp}
		       on:click={(event) => { skill.roll({ event }) }}>
			{skill.name}{pointsSpent ? ` (+${realPointsSpent})` : ""}
		</label>
		{#if !$appState.levelingUp}
			<i class="fas fa-sword skill-edit-button clickable clickable-red"
			   on:click={(event) => { skill.roll({ event, isAttack: true }) }}></i>
		{/if}
	</div>
	<i class="fas fa-edit skill-edit-button clickable clickable-red" on:click={() => {
		skill.sheet.render(true);
	}}></i>
	{#if !$appState.levelingUp}
		<i class="fas fa-trash skill-edit-button clickable clickable-red" on:click={() => {
			TJSDialog.confirm({
				title: "Delete Skill",
				content: `<p style='text-align: center;'>Are you sure you want to delete "${skill.name}"?</p>`,
				onYes: () => {
					skill.delete();
				}
			}, { width: 270, height: "auto" });
			}}></i>
	{/if}
</div>

{#if $subSkills.length}

	{#each $subSkills as subSkill}

		<div class="actor-skill actor-subskill">

			<input
				disabled
				max="10"
				min="1"
				type="number"
				value={subSkill.bonus + $skillBonus + pointsSpent}
			/>
			<div class="skill-label">
				<label class="skill-name clickable clickable-red" on:click={(event) => { skill.roll({
					event,
				 	extraTitle: subSkill.name,
				 	subSkill
				}) }}>
					{subSkill.name}
				</label>
				<i class="fas fa-sword skill-edit-button clickable clickable-red" on:click={(event) => {skill.roll({
					event,
				 	extraTitle: subSkill.name,
				 	subSkill,
				 	isAttack: true
				})
				}}></i>
			</div>

		</div>

	{/each}

{/if}
