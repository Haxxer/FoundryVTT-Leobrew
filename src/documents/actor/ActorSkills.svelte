<script>
	import { localize } from "@typhonjs-fvtt/runtime/svelte/helper";
  import { getContext } from "svelte";
  import ActorSkill from "./Components/ActorSkill.svelte";

  const appState = getContext("ApplicationStateStore");
  const document = getContext("DocumentStore");

  const allSkills = document.embedded.create("Item", {
    name: "skills",
		filters: [(item) => {
      return item.type === "skill";
		}]
	});

	$: categorizedSkills = Object.entries([...$allSkills]
		.reduce((acc, skill) => {
			if(!acc[skill.system.category]) acc[skill.system.category] = []
			acc[skill.system.category].push(skill)
			acc[skill.system.category].sort((a,b) => {
				return b.name > a.name;
			})
			return acc;
		}, {})).sort((a,b) => {
			return b[0] > a[0];
		});

</script>

<div class="actor-skills-list-container">

	<div class="actor-skills-list-add">
		<span class="skill-category-title modesto">{localize("LEOBREW.SkillAddTitle")}</span>
		<div class="actor-skills-list-add-container">
			<input type="text" list="skill-autocomplete" class='actor-skill-name-input' placeholder="Skill name">
			<datalist id="skill-autocomplete"></datalist>
			<button type="button" class="skill-add">
				<i class="fas fa-plus"></i>
			</button>
		</div>
	</div>

	<div class="actor-skills-list">

		<span class="skill-category-title modesto">Generic</span>
		<div class="actor-skill">
			<label class="skill-name clickable clickable-red" on:click={() => {
        $document.rollGeneric();
			}}>Naked D10 Roll</label>
		</div>

		{#each categorizedSkills as [category, skills]}

			<span class="skill-category-title modesto">{category}</span>

			{#each skills as skill}
				<ActorSkill {skill}/>
			{/each}

		{/each}

	</div>
</div>


<style lang="scss">

	.actor-skills-list-container {
		width: 200px;
		height: 100%;
		padding-right: 4px;
		display: flex;
		flex-direction: column;
		font-size: 0.85rem;
		overflow-y: scroll;
		overflow-x: hidden;

		.actor-skills-list-add-container {
			flex: 1 0 auto;
			display: flex;

			input {
				width: auto;
				flex: 1 0 auto;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
				border-right: 0;
			}

			button {
				display: flex;
				align-items: center;
				text-align: center;
				flex: 0 1 auto;
				height: 26px;
				width: 26px;
				line-height: initial;
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
        margin-left: 0;
        border: 1px solid var(--color-border-light-tertiary);
			}
		}

		.actor-skills-list {
			display: flex;
			flex-direction: column;
		}

		.skill-category-title {
			flex: 1 0 auto;
      font-size: 1.25rem;
      line-height: 1.75rem;
			margin-bottom: 0.25rem;
      border-bottom: 1px solid rgba(0,0,0,0.1);
			width: 100%;
      white-space: nowrap;
		}
	}

</style>
