<script>
  import { getContext } from "svelte";

  const doc = getContext("DocumentStore");

  export let skill;
  export let tiedSkills;

  function updateTiedSkills() {
    $doc.update({
			[`system.tiedSkills.${$skill.id}`]: tiedSkills
		});
	}

  function deleteTiedSkill(){
    $doc.update({
      [`system.tiedSkills.-=${$skill.id}`]: null
    });
	}

  function addTiedSkill() {
    tiedSkills.push({
			name: "New Skill",
			bonus: 0,
			isSubSkill: false
		});
    updateTiedSkills();
	}

  function removeTiedSkill(index) {
    tiedSkills.splice(index, 1);
    updateTiedSkills();
	}

</script>

<h3>
	<i class="fas fa-times clickable clickable-red" on:click={deleteTiedSkill}></i>
	<span>{$skill.name}</span>
	<i class="fas fa-plus clickable clickable-green" on:click={addTiedSkill}></i>
</h3>
<div class="tied-skills">
	<span>Subskill</span>
	<span class="name">Name</span>
	<span>Bonus</span>
	<span></span>
	{#each tiedSkills as tiedSkill, index}
		<input type="checkbox" bind:checked={tiedSkill.isSubSkill} on:change={updateTiedSkills}/>
		<input type="text" class="name" bind:value={tiedSkill.name} on:change={updateTiedSkills}/>
		<input type="number" bind:value={tiedSkill.bonus} on:change={updateTiedSkills}/>
		<i class="fas fa-times clickable clickable-red" on:click={() => { removeTiedSkill(index) }}></i>
	{/each}
</div>

<style lang="scss">

	.tied-skills {
		display: grid;
		grid-template-columns: 50px auto 50px 15px;
		gap: 3px;
    text-align: center;

		> * {
      align-self: center;
		}

		.name {
			text-align: left;
		}

		span {
			font-size: smaller;
		}

		input[type="checkbox"] {
			place-self: center;
		}
	}

	h3 {
		display: flex;
		align-items: center;

		span {
			flex: 1;
		}

		i {
			margin: 0 0.25rem;
		}
	}

</style>
