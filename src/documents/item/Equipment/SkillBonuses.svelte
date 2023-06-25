<script>

  import { getContext } from "svelte";
  import { TJSDocument } from "@typhonjs-fvtt/runtime/svelte/store";
  import SkillBonus from "./SkillBonus.svelte";

  const appState = getContext("ApplicationStateStore");
  const doc = getContext("DocumentStore");
  $: actor = new TJSDocument($doc.parent);
  $: validTiedSkills = Object.entries($doc.system.tiedSkills)
    .filter(([skillId]) => $actor.items.get(skillId))
	$: skills = Object.fromEntries(validTiedSkills.map(([skillId]) => [
    skillId, new TJSDocument($actor.items.get(skillId))
	]))

</script>

{#each validTiedSkills as [skillId, tiedSkills]}
	<SkillBonus skill={skills[skillId]} {tiedSkills}/>
{/each}

{#if !validTiedSkills.length}
	<div style="text-align: center; font-style: italic; padding: 10px;">
		Drag and drop skills to add a bonus to that skill
	</div>
{/if}
