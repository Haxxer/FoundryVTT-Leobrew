<svelte:options accessors={true}/>

<script>

  import { ApplicationShell } from "@typhonjs-fvtt/runtime/svelte/component/core";

  export let elementRoot;
  export let doc;

  const currencies = { gp: 0, sp: 0, cp: 0 };

  function withdraw() {
    let bankCurrencies = {
      gp: $doc.system.currency.gp.bank,
      sp: $doc.system.currency.sp.bank,
      cp: $doc.system.currency.cp.bank
		};

    let actorCurrencies = {
      gp: $doc.system.currency.gp.value,
      sp: $doc.system.currency.sp.value,
      cp: $doc.system.currency.cp.value
		};

    if(currencies.gp > bankCurrencies.gp && currencies.sp > bankCurrencies.sp && currencies.cp > bankCurrencies.cp){
      console.log("nope")
      return;
		}

		if(currencies.gp > bankCurrencies.gp || currencies.sp > bankCurrencies.sp || currencies.cp > bankCurrencies.cp){
			if(currencies.cp > bankCurrencies.cp){

			}
		}

    return $doc.update({
      "system.currency.gp": {
        "value": $doc.system.currency.gp.value + currencies.gp,
        "bank": $doc.system.currency.gp.bank - currencies.gp,
      },
      "system.currency.sp": {
        "value": $doc.system.currency.sp.value + currencies.sp,
        "bank": $doc.system.currency.sp.bank - currencies.sp,
      },
      "system.currency.cp": {
        "value": $doc.system.currency.cp.value + currencies.cp,
        "bank": $doc.system.currency.cp.bank - currencies.cp,
      },
    })

	}

</script>

<ApplicationShell bind:elementRoot>
	<div>

		<div class="actor-currency-container">

			<div class="actor-currency-list">
				<div>GP</div>
				<div>SP</div>
				<div>CP</div>
			</div>
			<div class="actor-currency-list">
				<input type="number" bind:value={currencies.gp}/>
				<input type="number" bind:value={currencies.sp}/>
				<input type="number" bind:value={currencies.cp}/>
			</div>

		</div>

		<footer>

			<button type="button" on:click={() => withdraw()}><i class="fas fa-money-bill-transfer"></i> Withdraw</button>
			<button type="button"><i class="fas fa-plus-minus"></i> Add/Remove</button>
			<button type="button"><i class="fas fa-bank"></i> Deposit</button>

		</footer>

	</div>
</ApplicationShell>

<style lang="scss">

	footer {
		display: flex;
	}

  .actor-currency-container {
    display: grid;
    grid-template-columns: 1fr;
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
