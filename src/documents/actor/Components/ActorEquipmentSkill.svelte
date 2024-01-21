<script>

	import { TJSDocument } from '#runtime/svelte/store/fvtt/document';
	import { getContext } from "svelte";

	const appState = getContext("ApplicationStateStore");

  export let skill;

  const skillDoc = appState.embeddedDocuments.get(skill.id);

	$: bonus = $skillDoc.system.skillBonus || 0;

</script>


<div class="actor-skill" draggable="true">
	<input
		disabled
		max="10"
		min="1"
		type="number"
		value={bonus}
	/>
	<div>
		<span class="skill-name clickable clickable-red" on:click={(event) => { $skillDoc.roll({ event, asSkill: true }) }}>
			{$skillDoc.name} {$skillDoc.system.skillLabel ? `(${$skillDoc.system.skillLabel})` : ""}
		</span>
	</div>
	<i class="fas fa-edit skill-edit-button clickable clickable-red" on:click={() => {
		skill.sheet.render(true, { tab: "skills" });
	}}></i>
</div>

<style lang="scss">

  .actor-skill {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    text-align: center;
    margin-bottom: 0.25rem;

    &.magic-skill .skill-label label {
      color: var(--colorMagic);
    }

    div {
      display: flex;
      flex: 1;
      text-align: left;
      align-items: center;

      & > * {
        margin-right: 0.5rem;
      }
    }

    i {
      margin-right: 0.25rem;
    }

    .skill-edit-button {
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
