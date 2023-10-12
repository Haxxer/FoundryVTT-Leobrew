<script>

  import { getContext } from "svelte";
  import { updateDoc } from "../../base/UpdateDoc.js";

  const doc = getContext("DocumentStore");

  $: armorBonuses = Object.entries(CONFIG.LEOBREW.bodyParts).map(([bodyPart]) => {
    return {
      label: CONFIG.LEOBREW.bodyParts[bodyPart],
			key: bodyPart
		}
	});

</script>

<div style="flex: 1; margin-right:5px;">

	<h2>Armor Bonuses:</h2>

	<table>
		<thead>
		<tr>
			<th>Body Part</th>
			<th>Armor Bonus</th>
		</tr>
		</thead>
		<tbody>
		{#each armorBonuses as bodyPart}
		<tr>
			<td class="flexcol"><span>{bodyPart.label}</span></td>
			<td><input type="number" use:updateDoc={{ doc, accessor: `system.armorBonuses.${bodyPart.key}` }}/></td>
		</tr>
		{/each}
		</tbody>
	</table>

</div>
