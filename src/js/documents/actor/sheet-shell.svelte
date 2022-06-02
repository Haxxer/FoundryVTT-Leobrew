<script>

    import SheetInput from "../../components/sheet-input.svelte";
    import { TJSDocument } from '@typhonjs-fvtt/runtime/svelte/store';

    import { ApplicationShell } from '@typhonjs-fvtt/runtime/svelte/component/core';
    import { getContext } from 'svelte';
    const { application } = getContext('external');

    export let elementRoot;
    export let actor;

    let title = application.reactive.storeAppOptions.title;

    const tsjDocument = new TJSDocument(actor);
    $: {
        const update = getProperty(tsjDocument.updateOptions, 'data.name');
        if(update !== undefined){
            $title = $tsjDocument.data.name;
        }
    }

</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>

    <SheetInput document={actor} {tsjDocument} path="name"/>

</ApplicationShell>