<script>
  import { localize } from '#runtime/svelte/helper';
  export let activeTab;
  export let tabs;
  export let underscore = false;
  export let separateElements = false;
</script>

<nav class="tabs modesto" data-group="primary" style={$$props.style}>
  {#each tabs.filter(tab => !tab.hidden) as tab, index (tab.value)}
    {#if separateElements && index > 0}
      <div style="border-right: 1px solid rgba(0,0,0,0.5); margin: 0 10px;"></div>
    {/if}
    <div on:click={() => { activeTab = tab }}
         class="item clickable clickable-red"
         class:underscore={underscore}
         class:active={activeTab === tab}>
      {#if tab.icon} <i class="icon {tab.icon}"></i> {/if}
      {localize(tab.label)}
      {#if tab.highlight}
        <div class="blob"><i class="fas fa-exclamation"></i></div>
      {/if}
    </div>
  {/each}
</nav>


<style lang="scss">
  .tabs {
		display: flex;
		flex-wrap: wrap;
		font-size: 1.1rem;
    margin-bottom: 0.25rem;
    padding-bottom: 0.25rem;
  }
  .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 2px solid transparent;
		padding: 0 1px;
    &.active {
      text-shadow: 0 0 10px var(--color-shadow-primary, #FF0000);
      &.underscore {
        text-shadow: none;
        border-bottom: 2px solid rgba(125, 0, 0, 0.5);
      }
    }
  }
  .icon {
    margin-right: 0.25rem;
  }
</style>
