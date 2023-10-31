<script>

  import { getContext } from "svelte";
  import { updateDoc } from "../../base/UpdateDoc.js";
  import Tabs from "../../../svelte-components/Tabs.svelte";
  import Description from "../Components/Description.svelte";
  import ArmorBonuses from "./ArmorBonuses.svelte";
  import SkillBonuses from "./SkillBonuses.svelte";

  const { application } = getContext('#external');
  const doc = getContext("DocumentStore");

	console.log(application.options)

  const tabs = [
    { value: "description", label: "Description", component: Description },
    { value: "armorBonuses", label: "Armor Bonuses", component: ArmorBonuses },
    { value: "skillBonuses", label: "Skill Bonuses", component: SkillBonuses }
  ];

  let activeTab = tabs[0];

</script>

<div class="item-container">

	<div class="item-properties-sidebar">
		<div class="form-control">
			<label>Equipped</label>
			<input type="checkbox" use:updateDoc={{ doc, accessor: "system.equipped" }}/>
		</div>

		<div class="form-control">
			<label>Quantity</label>
			<input type="number" use:updateDoc={{ doc, accessor: "system.quantity" }}/>
		</div>

		<div class="form-control">
			<label>Uses Up Quantity</label>
			<input type="checkbox" use:updateDoc={{ doc, accessor: "system.usesQuantity" }}/>
		</div>

		<div class="form-control">
			<label>Category</label>
			<input type="text" use:updateDoc={{ doc, accessor: "system.category" }}/>
		</div>

		<div class="form-control">
			<label>Weight</label>
			<input type="text" use:updateDoc={{ doc, accessor: "system.weight" }}/>
		</div>

		<div class="form-control">
			<label>Price</label>
		</div>
		<div style="display: grid; grid-template-columns: 1fr 1fr 1fr;">
			<label>Gold</label>
			<label>Silver</label>
			<label>Copper</label>
			<input type="number" use:updateDoc={{ doc, accessor: "system.price.gp" }}/>
			<input type="number" use:updateDoc={{ doc, accessor: "system.price.sp" }}/>
			<input type="number" use:updateDoc={{ doc, accessor: "system.price.cp" }}/>
		</div>
	</div>

	<div class="item-tab-container">
		<Tabs bind:activeTab={activeTab} tabs={tabs} underscore/>
		<svelte:component this={activeTab.component}/>
	</div>

</div>

<style lang="scss">

	.item-tab-container{
		flex: 1;
		height: 100%;
		overflow: hidden;
	}

</style>
