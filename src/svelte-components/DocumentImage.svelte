<script>
	export let doc;

	$: src = $doc.img;

	let filePicker = false;

	function handleClick() {
		if (!filePicker) {
			filePicker = new FilePicker({
				type: "imagevideo",
				current: src,
				callback: path => {
					$doc.update({
						"img": path
					})
					filePicker = false;
				}
			});
		}

		filePicker.render(true, { focus: true });
	}

</script>

<div on:click={handleClick} class="{$$props.class}">
	<img class="clickable" {src}/>
</div>
