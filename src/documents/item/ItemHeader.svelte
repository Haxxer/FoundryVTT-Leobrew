<script>

  import { localize } from "@typhonjs-fvtt/runtime/svelte/helper";
  import { getContext } from "svelte";
  import { updateDoc } from "../base/UpdateDoc.js";
  import { capitalizeFirstLetter } from "../../lib/lib.js";
  import DocumentImage from "../../svelte-components/DocumentImage.svelte";

  const appState = getContext("ApplicationStateStore");
  const doc = getContext("DocumentStore");

  const capType = capitalizeFirstLetter($doc.type);

</script>

<header class="sheet-header">

	<DocumentImage class="item-image" {doc}/>

	<input type="text" placeholder="{localize(`LEOBREW.${capType}Name`)}" use:updateDoc={{ doc, accessor: "name" }}/>

</header>

<style lang="scss">

  .sheet-header {

		display: flex;
    flex: 0;
		margin-bottom: 0.5rem;

		input {
			height: 50px;
			font-size: 1.5rem;
			padding-left: 0.5rem;
		}
  }

</style>
