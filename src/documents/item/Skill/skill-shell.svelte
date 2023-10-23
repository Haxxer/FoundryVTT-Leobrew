<script>

  import { getContext } from "svelte";
  import { updateDoc } from "../../base/UpdateDoc.js";

  const doc = getContext("DocumentStore");

</script>

<div>

	<div class="form-control">
		<span>Category</span>
		<input type="text" use:updateDoc={{ doc, accessor: "system.category" }}/>
	</div>

	<div class="form-control">
		<span>Magic Skill</span>
		<input type="checkbox" use:updateDoc={{ doc, accessor: "system.isMagic" }}/>
	</div>

</div>
