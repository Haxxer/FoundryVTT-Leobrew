<script>
  import { localize } from "@typhonjs-fvtt/runtime/svelte/helper";
  import { getContext } from "svelte";
  import { TJSDialog } from "@typhonjs-fvtt/runtime/svelte/application";
  import { slide } from 'svelte/transition'
  import { sineInOut } from 'svelte/easing'

  const appState = getContext("ApplicationStateStore");

	export let item;

  $: expanded = $appState.isExpanded.inventory.has(item.id);

</script>


<div class="item even-shading">
	<div class="item-header">
		<div class="item-name">
			<div class="item-image-container">
				<img src="{item.img}"/>
				<img class="clickable clickable-red item-rollable-image" src="icons/dice/d10black.svg" on:click={() => {
          item.roll();
				}}>
			</div>
			<span
				class="item-expand clickable clickable-red"
				on:click={() => {
          appState.update((state) => {
						if(expanded){
							state.isExpanded.traits.delete(item.id);
						}else{
							state.isExpanded.traits.add(item.id);
						}
            return state;
          });
				}}>
				{item.name}
			</span>
		</div>
		<div class="item-controls flexrow">
			<a class="item-control item-edit" data-tooltip={localize("LEOBREW.TraitEdit")} on:click={() => {
        item.sheet.render(true);
			}}>
				<i class="fas fa-edit"></i>
			</a>
			<a class="item-control item-delete" data-tooltip={localize("LEOBREW.TraitDelete")} on:click={() => {
        TJSDialog.confirm({
        	title: "Delete Trait",
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

    .item-header {
      display: flex;
      flex-direction: row;
      align-items: center;

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
