<svelte:options accessors={true}/>

<script>

  import { ApplicationShell } from "@typhonjs-fvtt/runtime/svelte/component/core";

  export let elementRoot;
  export let doc;

  let currencies = { gp: 0, sp: 0, cp: 0 };
	let bankCurrencies = {};
	$: bankCurrencies = {
		gp: $doc.system.currency.gp.bank,
		sp: $doc.system.currency.sp.bank,
		cp: $doc.system.currency.cp.bank
	}
	let actorCurrencies = {};
  $: actorCurrencies = {
	  gp: $doc.system.currency.gp.value,
	  sp: $doc.system.currency.sp.value,
	  cp: $doc.system.currency.cp.value
  }


  function withdraw() {

		const totalBankMoney = bankCurrencies.gp * 10000 + bankCurrencies.sp * 100 + bankCurrencies.cp;
		const totalMoneyInput = currencies.gp * 10000 + currencies.sp * 100 + currencies.cp;

		if(totalMoneyInput > totalBankMoney
			|| currencies.gp > bankCurrencies.gp
			|| currencies.sp > bankCurrencies.sp
			|| currencies.cp > bankCurrencies.cp
		){
			return;
		}

    $doc.update({
      "system.currency.gp": {
        "value": actorCurrencies.gp + currencies.gp,
        "bank": bankCurrencies.gp - currencies.gp,
      },
      "system.currency.sp": {
        "value": actorCurrencies.sp + currencies.sp,
        "bank": bankCurrencies.sp - currencies.sp,
      },
      "system.currency.cp": {
        "value": actorCurrencies.cp + currencies.cp,
        "bank": bankCurrencies.cp - currencies.cp,
      },
    })

	  currencies = {
		  gp: 0,
		  sp: 0,
		  cp: 0
	  }
	}

  function deposit() {

		const totalActorMoney = actorCurrencies.gp * 10000 + actorCurrencies.sp * 100 + actorCurrencies.cp;
		const totalMoneyInput = currencies.gp * 10000 + currencies.sp * 100 + currencies.cp;

		if(totalMoneyInput > totalActorMoney
			|| currencies.gp > actorCurrencies.gp
			|| currencies.sp > actorCurrencies.sp
			|| currencies.cp > actorCurrencies.cp
		){
			return;
		}

    $doc.update({
      "system.currency.gp": {
        "value": actorCurrencies.gp - currencies.gp,
        "bank": bankCurrencies.gp + currencies.gp,
      },
      "system.currency.sp": {
        "value": actorCurrencies.sp - currencies.sp,
        "bank": bankCurrencies.sp + currencies.sp,
      },
      "system.currency.cp": {
        "value": actorCurrencies.cp - currencies.cp,
        "bank": bankCurrencies.cp + currencies.cp,
      },
    })

	  currencies = {
		  gp: 0,
		  sp: 0,
		  cp: 0
	  }
	}

  function addRemove() {

		const totalActorMoney = actorCurrencies.gp * 10000 + actorCurrencies.sp * 100 + actorCurrencies.cp;
		const totalMoneyInput = currencies.gp * 10000 + currencies.sp * 100 + currencies.cp;

		if((totalActorMoney + totalMoneyInput) < 0
			|| (actorCurrencies.gp + currencies.gp) < 0
			|| (actorCurrencies.sp + currencies.sp) < 0
			|| (actorCurrencies.cp + currencies.cp) < 0
		){
			return;
		}

    $doc.update({
      "system.currency.gp.value": actorCurrencies.gp + currencies.gp,
      "system.currency.sp.value": actorCurrencies.sp + currencies.sp,
      "system.currency.cp.value": actorCurrencies.cp + currencies.cp,
    });

	  currencies = {
			gp: 0,
			sp: 0,
			cp: 0
		}
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

			<button type="button" on:click={() => { withdraw() }}><i class="fas fa-money-bill-transfer"></i> Withdraw</button>
			<button type="button" on:click={() => { addRemove() }}><i class="fas fa-plus-minus"></i> Add/Remove</button>
			<button type="button" on:click={() => { deposit() }}><i class="fas fa-bank"></i> Deposit</button>

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
