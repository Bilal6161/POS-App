<script>
	export let structure;
	export let HiddenGrid = [];
	let search = '';

	const handleHideToggle = (e, name) => {
		let temp = [...HiddenGrid];
		if (e.target.checked == false) {
			temp.push(name);
			HiddenGrid = temp;
		} else {
			temp = temp.filter((value) => value != name);
			HiddenGrid = temp;
		}
	};

</script>

<div class="w-[250%] bg-gray-800 dropdown-content rounded-md mt-1">
	<div class="flex flex-col gap-y-1 p-2">
		<input
			type="text"
			placeholder="Search"
			class="input input-sm input-bordered"
			bind:value={search}
		/>
		{#each Object.values(structure) as obj}
			{#if search == '' || obj.name.toLowerCase().includes(search)}
            <label class="label p-1">
				<span class="label-text text-sm text-white">{obj.name}</span>
				<input
					type="checkbox"
					class="toggle toggle-accent bg-gray-400"
					checked={!HiddenGrid.includes(obj.name)}
					on:click={(e) => handleHideToggle(e, obj.name)}
				/>
			</label>
            {/if}
		{/each}
	</div>
</div>
