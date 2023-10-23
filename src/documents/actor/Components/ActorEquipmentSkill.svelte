<script>

  export let skill;

</script>


<div class="actor-skill" draggable="true">
	<input
		disabled
		max="10"
		min="1"
		type="number"
		value={skill.system.skillBonus}
	/>
	<div>
		<span class="skill-name clickable clickable-red" on:click={(event) => { skill.roll({ event, asSkill: true }) }}>
			{skill.name} {skill.system.skillLabel ? `(${skill.system.skillLabel})` : ""}
		</span>
	</div>
</div>

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
