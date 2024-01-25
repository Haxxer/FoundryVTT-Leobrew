<script>
  import { localize } from "#runtime/svelte/helper";
  import { getContext } from "svelte";
  import { TJSDialog } from "#runtime/svelte/application";
  import { slide } from 'svelte/transition'
  import { sineInOut } from 'svelte/easing'
  import { updateDoc } from "~/documents/base/UpdateDoc.js";

  const appState = getContext("ApplicationStateStore");

	export let item;
	export let index;

	const doc = appState.embeddedDocuments.get(item.id);

  $: expanded = $appState.isExpanded.inventory.has(item.id);

</script>


<div class="item" class:even-shading={index % 2}>
	<div class="item-header">
		<div class="item-name">
			<div class="item-image-container">
				<img class="item-image" src="{item.img}"/>
				<img class="clickable clickable-red item-rollable-image" src="icons/dice/d10black.svg" on:click={() => {
          item.roll();
				}}>
			</div>
			<span
				class="item-expand clickable clickable-red"
				on:click={() => {
          appState.update((state) => {
						if(expanded){
							state.isExpanded.inventory.delete(item.id);
						}else{
							state.isExpanded.inventory.add(item.id);
						}
            return state;
          });
				}}>
				{item.name}
			</span>
		</div>
		<input type="number" use:updateDoc={{ doc, accessor: "system.quantity" }}/>
		<div class="item-controls flexrow">
			<a class="item-control item-not-equipped"
				 data-tooltip={localize(item.system.equipped ? "LEOBREW.Equipped" : "LEOBREW.Unequipped")}
				 class:item-equipped={item.system.equipped} on:click={() => {
					item.update({ "system.equipped": !item.system.equipped });
				}}>
				<i class="fas" class:fa-shield-alt={!item.system.equipped} class:fa-shield={item.system.equipped}></i>
			</a>
			<a class="item-control item-edit" data-tooltip={localize("LEOBREW.EquipmentEdit")} on:click={() => {
        item.sheet.render(true);
			}}>
				<i class="fas fa-edit"></i>
			</a>
			<a class="item-control item-delete" data-tooltip={localize("LEOBREW.EquipmentDelete")} on:click={() => {
        TJSDialog.confirm({
        	title: "Delete Equipment",
        	content: `<p style='text-align: center;'>Are you sure you want to delete "${item.name}"?</p>`,
        	onYes: () => {
            item.delete();
        	}
        }, { width: 270, height: "auto" });
			}}>
				<i class="fas fa-trash"></i>
			</a>
		</div>
	</div>
	{#if expanded}
		<div class="item-description" transition:slide={{duration: 150, easing: sineInOut}}>
			{#if item.system.description.value}
				{@html item.system.description.value}
			{:else}
				No description here...
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">

  .item {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
		border-radius: 4px;
		padding: 2px;
	  min-height: 28px;
	  height: auto !important;
	  width: auto !important;

	  input {
		  flex: 0 1 auto;
		  width: 35px;
		  padding: 0 0.25rem;
		  margin: 0 0.25rem;
		  height: 20px;
	  }

    .item-header {
      display: flex;
      flex-direction: row;
      align-items: center;
	    flex: 1;

      .item-name {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex: 1;

        .item-image-container {
          position: relative;
          margin-right: 3px;
          height: 24px;
          width: 24px;

          &:hover .item-rollable-image {
            opacity: 1.0;
          }
				}

        &:hover .item-image {
          opacity: 0;
        }

        .item-rollable-image{
          opacity: 0.0;
					top: 2px;
        }
        &:hover .item-rollable-image {
          opacity: 0.5;
        }

        .item-image-container img {
					position: absolute;
          max-height: 24px;
          border: 0;
        }
      }

      .item-controls {
        flex: 0 1 auto;

        > * {
          margin: 0 5px;
        }
      }
    }
  }

	.item-description {
		border-top: 1px solid rgba(0,0,0,0.1);
		margin-top: 0.25rem;
		padding: 0.25rem;
	}

  .item-not-equipped {
    opacity: 0.5;
  }

  .item-equipped {
    opacity: 1.0;
  }

</style>
