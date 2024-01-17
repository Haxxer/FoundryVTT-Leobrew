<script>

  import { getContext } from "svelte";
  import { updateDoc } from "../../base/UpdateDoc.js";
  import SvelteDialog from "../../../lib/SvelteDialog.js";
  import CurrencyTransfer from "./CurrencyTransfer.svelte";

  const doc = getContext("DocumentStore");

  function showCurrencyTransferDialog() {
    SvelteDialog.show({
      title: "TEST",
			svelte: {
				class: CurrencyTransfer,
        props: {
          doc
        }
			},
      width: 400,
      height: "auto",
    })
  }

</script>


<div class="actor-currencies-container">

	<div class="actor-currencies-list">
		<div>GP</div>
		<div>SP</div>
		<div>CP</div>
	</div>
	<div></div>
	<div class="actor-currencies-list">
		<div>GP</div>
		<div>SP</div>
		<div>CP</div>
	</div>

	<div class="actor-currencies-list">
		<input type="number" use:updateDoc={{ doc, accessor: "system.currencies.gp.value" }}/>
		<input type="number" use:updateDoc={{ doc, accessor: "system.currencies.sp.value" }}/>
		<input type="number" use:updateDoc={{ doc, accessor: "system.currencies.cp.value" }}/>
	</div>
	<div><i class="fas fa-right-left clickable clickable-red" on:click={() => showCurrencyTransferDialog()}></i></div>
	<div class="actor-currencies-list">
		<input type="number" use:updateDoc={{ doc, accessor: "system.currencies.gp.bank" }}/>
		<input type="number" use:updateDoc={{ doc, accessor: "system.currencies.sp.bank" }}/>
		<input type="number" use:updateDoc={{ doc, accessor: "system.currencies.cp.bank" }}/>
	</div>

	<div>On Person</div>
	<div></div>
	<div>In Bank</div>
</div>


<style lang="scss">

  .actor-currencies-container {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    margin-bottom: 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    text-align: center;
    column-gap: 10px;
    row-gap: 5px;
  }

  .actor-currencies-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;

    input {
      height: 20px;
    }
  }

</style>
