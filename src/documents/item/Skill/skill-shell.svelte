<script>

  import { getContext } from "svelte";
  import { updateDoc } from "../../base/UpdateDoc.js";

  const appState = getContext("ApplicationStateStore");
  const doc = getContext("DocumentStore");

</script>

<div>

	<div class="form-control">
		<label>Category</label>
		<input type="text" use:updateDoc={{ doc, accessor: "system.category" }}/>
	</div>

	<div class="form-control">
		<label>Magic Skill</label>
		<input type="checkbox" use:updateDoc={{ doc, accessor: "system.isMagic" }}/>
	</div>

</div>
