<script>
	import { localize } from "#runtime/svelte/helper";
	import { getContext } from "svelte";
	import ActorSkill from "./Components/ActorSkill.svelte";
	import ActorEquipmentSkill from "./Components/ActorEquipmentSkill.svelte";
	import { writable } from "svelte/store";

	const appState = getContext("ApplicationStateStore");
	const doc = getContext("DocumentStore");

	let searchStore = writable("");

	$: search = $appState.levelingUp ? "" : $searchStore;

	$: categorizedSkills = Object.entries($doc.items
			.filter(item => search.toLowerCase().split(" ").every(part => (!part || item.name.toLowerCase().includes(part))))
			.reduce((acc, item) => {
				if (item.type === "skill") {
					const category = (item.system.category || "Generic").trim();
					if (!acc[category]) acc[category] = []
					acc[category].push(item)
					acc[category].sort((a, b) => {
						return b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 1;
					})
				} else if (item.type === "equipment" && item.system.addsSkill && item.system.equipped) {
					if (!acc["Equipment"]) acc["Equipment"] = []
					acc["Equipment"].push(item)
					acc["Equipment"].sort((a, b) => {
						return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
					})
				}
				return acc;
			}, {}))
		.sort((a, b) => {
			return a[0].toLowerCase() > b[0].toLowerCase() ? 1 : -1;
		});

	let newSkillName = ""

	function createNewSkill() {
		appState.addSkill(newSkillName);
		newSkillName = "";
	}

</script>

<div class="actor-skills-list-container">

	<div class="actor-skills-list-add">
		{#if $appState.levelingUp}
			<span class="skill-category-title modesto">{localize("LEOBREW.SkillAddTitle")}</span>
			<div class="actor-skills-list-add-container">
				<input type="text" class='actor-skill-name-input' placeholder="Skill name" bind:value={newSkillName}
				       on:keydown={(event) => {
					if(event.code !== "Enter") return;
					createNewSkill();
				}}
				/>
				<button type="button" class="skill-add" on:click={async () => createNewSkill()}>
					<i class="fas fa-plus"></i>
				</button>
			</div>
		{:else}
			<input bind:value={$searchStore} placeholder="{localize(`LEOBREW.SkillSearch`)}" type="text"/>
		{/if}
	</div>

	<div class="actor-skills-list">

		<div class="actor-skill" style="margin-top: 0.75rem;">
			<div class="skill-label">
				<label class="skill-name clickable clickable-red" on:click={(event) => {
        $doc.rollGeneric({ event });
			}}>Naked D10 Roll</label>
				<i class="fas fa-sword skill-edit-button clickable clickable-red"
				   on:click={(event) => { $doc.rollGeneric({ event, isAttack: true }) }}></i>
			</div>
		</div>

		{#each categorizedSkills as [category, skills]}

			<span class="skill-category-title modesto">{category}</span>

			{#each skills as skill}
				{#if skill.type === "skill"}
					<ActorSkill {skill}/>
				{:else}
					<ActorEquipmentSkill {skill}/>
				{/if}
			{/each}

		{/each}

	</div>
</div>


<style lang="scss">

  .actor-skills-list-container {
    width: 225px;
    height: 100%;
    padding-right: 4px;
    display: flex;
    flex-direction: column;
    font-size: 0.8rem;
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
      margin-top: 0.25rem;
      margin-bottom: 0.25rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      width: 100%;
      white-space: nowrap;
    }
  }

</style>
