<script>

  import { getContext } from "svelte";
  import ActorAbility from "./Components/ActorAbility.svelte";
  import DocumentImage from "../../svelte-components/DocumentImage.svelte";
	import { updateDoc } from "~/documents/base/UpdateDoc.js";

  const doc = getContext("DocumentStore");
  const appState = getContext("ApplicationStateStore");

</script>

<div class="actor-top-bar modesto">

	<DocumentImage class="actor-image" {doc}/>

	<div class="actor-resource-bar-container">

		<input use:updateDoc={{ doc, accessor: `name` }} class="actor-name-input form-control" placeholder="Name" type="text"/>

		<div class="actor-resource-bar">

			<div class="actor-resource">
				<span>
					{#if $appState.levelingUp}
						<i class="fas fa-times clickable clickable-faint clickable-red" on:click={() => {
                appState.abortLevelUp();
							}}></i>
					{/if}
					<span>{CONFIG.LEOBREW.resources.experience}</span>
					{#if $appState.levelingUp}
						<i class="fas fa-check clickable clickable-faint clickable-green" on:click={() => {
                appState.confirmLevelUp();
							}}></i>
					{:else}
						<i class="fas fa-edit clickable clickable-faint clickable-red" on:click={() => {
                $appState.levelingUp = true;
							}}></i>
					{/if}
				</span>
				<div class="actor-experience-container">
					{#if $appState.levelingUp}
						<i class="fas fa-minus clickable clickable-faint clickable-red" on:click={() => {
                appState.addExperience(-1)
							}}></i>
					{/if}
					<input disabled min="0" type="number"
								 value="{$doc.system.experience.value - $appState.levelUpExperience}"/>
					{#if $appState.levelingUp}
						<i class="fas fa-plus clickable clickable-faint clickable-red" on:click={() => {
                appState.addExperience(1)
							}}></i>
					{/if}
				</div>
			</div>

			{#each Object.entries($doc.system.resources) as [key, resource], index (resource)}
				{#if resource.enabled}
					<div class="actor-resource">
						<span>{CONFIG.LEOBREW.resources[key]}</span>
						<div class="actor-resource-values">
							<input type="number" use:updateDoc={{ doc, accessor: `system.resources.${key}.value` }} min="0">
							<span>/</span>
							<input type="number" disabled value="{resource.max}">
						</div>
					</div>
				{/if}
			{/each}
		</div>

	</div>

</div>

<div class="actor-ability-bar modesto">
	{#each Object.entries($doc.system.abilities) as [key, ability]}
		<ActorAbility {key} {ability}/>
	{/each}
</div>

<style lang="scss">

  .actor-top-bar {
    display: flex;
    flex-direction: row;

    .actor-resource-bar-container {
      flex: 1;

      .actor-name-input {
        display: block;
        height: 2.5rem;
        width: 100%;
        padding: 0.5rem;
        font-size: 1.5rem;
        line-height: 2rem;
      }

      .actor-resource-bar {
        display: flex;
        flex-direction: row;
        padding-top: 0.5rem;
        flex-wrap: wrap;

        & > *:not(:last-child) {
          margin-right: 0.25rem;
        }

        .actor-resource {
          display: flex;
          flex: 1;
          flex-direction: column;
          min-width: 80px;
          flex-basis: 25%;
          text-align: center;

          & > * {
            font-size: 1rem;
            line-height: 1.5rem;
          }

          span {
            font-size: 1.5rem;
            line-height: 2rem;

            i {
              font-size: 1rem;
              opacity: 0.5;
              vertical-align: middle;

              &:hover {
                opacity: 1.0;
              }
            }
          }

          input {
            font-size: 1.25rem;
            line-height: 1.75rem;
          }

          .actor-experience-container {
            display: flex;
            align-items: center;
            gap: 0.25rem;

            i {
              font-size: 1rem;
              opacity: 0.5;
              vertical-align: middle;

              &:hover {
                opacity: 1.0;
              }
            }
          }
        }

        .actor-resource-values {
          display: flex;
          flex: 1;
          flex-direction: row;
          align-items: center;

          input {
            padding: 0.25rem;
            text-align: left;
          }

          input:first-child {
            text-align: right;
          }

          span {
            margin: 0 2px;
          }
        }
      }
    }
  }

  .actor-ability-bar {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    flex-direction: row;
    margin: 0.5rem 0;
    text-align: center;
    gap: 2px;
  }

</style>
