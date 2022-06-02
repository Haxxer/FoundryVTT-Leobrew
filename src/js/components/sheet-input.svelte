<script>

    export let classes;
    export let document;
    export let tsjDocument;
    export let path;
    export let type;
    export let options;

    let value = getProperty(document, 'data.'+path);

    $: {
        $tsjDocument;
        const update = getProperty(tsjDocument.updateOptions, 'data.'+path);
        if(update !== undefined){
            valueUpdated();
        }
    }

    function valueUpdated(){
        value = getProperty(document, 'data.' + path);
    }

    async function updateValue(){
        await document.update({
            [path]: value
        });
    }

</script>

{#if !type || type === 'text'}
    <input type='text' bind:value={value} class={classes} on:change={updateValue}>
{/if}