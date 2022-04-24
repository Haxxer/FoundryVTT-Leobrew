<script>

    import { ApplicationShell } from '@typhonjs-fvtt/runtime/svelte/component/core';
    import { getContext } from 'svelte';
    const { application } = getContext('external');

    export let elementRoot;
    export let actor;

</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>

    <div>{actor.name}</div>

</ApplicationShell>