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


<div class="actor-currency-container">

	<div class="actor-currency-list">
		<div>GP</div>
		<div>SP</div>
		<div>CP</div>
	</div>
	<div></div>
	<div class="actor-currency-list">
		<div>GP</div>
		<div>SP</div>
		<div>CP</div>
	</div>

	<div class="actor-currency-list">
		<input type="number" use:updateDoc={{ doc, accessor: "system.currency.gp.value" }}/>
		<input type="number" use:updateDoc={{ doc, accessor: "system.currency.sp.value" }}/>
		<input type="number" use:updateDoc={{ doc, accessor: "system.currency.cp.value" }}/>
	</div>
	<div><i class="fas fa-right-left clickable clickable-red" on:click={() => showCurrencyTransferDialog()}></i></div>
	<div class="actor-currency-list">
		<input type="number" use:updateDoc={{ doc, accessor: "system.currency.gp.bank" }}/>
		<input type="number" use:updateDoc={{ doc, accessor: "system.currency.sp.bank" }}/>
		<input type="number" use:updateDoc={{ doc, accessor: "system.currency.cp.bank" }}/>
	</div>

	<div>On Person</div>
	<div></div>
	<div>In Bank</div>
</div>


<style lang="scss">

  .actor-currency-container {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    margin-bottom: 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    text-align: center;
    column-gap: 10px;
    row-gap: 5px;
  }

  .actor-currency-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;

    input {
      height: 20px;
    }
  }

</style>
