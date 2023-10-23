<script>

  import { getContext } from "svelte";
  import { TJSDocument } from '#runtime/svelte/store/fvtt/document';
  import { updateDoc } from "../../base/UpdateDoc.js";
  import SkillBonus from "./SkillBonus.svelte";
  import DropZone from "../../../svelte-components/DropZone.svelte";

  const doc = getContext("DocumentStore");
  $: validTiedSkills = Object.entries($doc.system.tiedSkills)
    .filter(([skillId]) => $doc.parent.items.get(skillId))
  $: skills = Object.fromEntries(validTiedSkills.map(([skillId]) => [
    skillId, new TJSDocument($doc.parent.items.get(skillId))
  ]))

	async function test(data){
    if(!data.uuid) return;
    const droppedDocument = fromUuidSync(data.uuid);
		if(droppedDocument.type !== "skill") return;
    const currentTiedSkills = $doc.system.tiedSkills;
    if(currentTiedSkills[droppedDocument.id]) return;
    currentTiedSkills[droppedDocument.id] = {
      name: "New Skill",
      bonus: 0,
      isSubSkill: false,
      isWeaponSkill: false
    };
    await $doc.update({ "system.tiedSkills": currentTiedSkills });
    await droppedDocument.update({ "system.tiedEquipment": $doc.id })
	}


</script>

<div class="add-as-skill">

	<div><span>Is Skill</span></div>
	<div><span>Label</span></div>
	<div><span>Bonus</span></div>

	<input type="checkbox" use:updateDoc={{ doc, accessor: "system.addsSkill" }}/>
	<input type="text" use:updateDoc={{ doc, accessor: "system.skillLabel" }}/>
	<input type="number" use:updateDoc={{ doc, accessor: "system.skillBonus" }}/>

</div>


<hr>

{#each validTiedSkills as [skillUuid, tiedSkills]}
	<SkillBonus skill={skills[skillUuid]} {tiedSkills}/>
{/each}

{#if !validTiedSkills.length}
	<DropZone callback="{test}">
		<div style="text-align: center; font-style: italic; padding: 10px;">
			Drag and drop skills to add a bonus to that skill
		</div>
	</DropZone>
{/if}

<style lang="scss">

	.add-as-skill {
		display: grid;
		grid-template-columns: 75px auto 75px;
		place-items: center;
		gap: 3px;

	}

</style>
