<script>
	export let structure;
	export let data;
	export let hiddenGrid;

	let rowCountTimes = 100 * (data.length + 1);
	let fieldsWidth = {};
	let dragging = null;
	let locking = false;
	let lockedColumns = 0;
	let position = null;
	let filteredGrid = Object.keys(structure);
	$: {
		Object.keys(structure).map((fieldName) => {
			fieldsWidth[fieldName] = 200;
		});
		// filteredGrid = Object.keys(structure)?.filter(filterThis => {
		// 	return hiddenGrid?.reduce(withThis => {
		// 		return filterThis != withThis;
		// 	})
		// })
	}

	const resizeStart = (fieldName) => {
		//on:mouseDown || resize start Table column || using: dragging as fieldName
		console.log('Resize Start');
		dragging = fieldName;
	};

	const resize = (e) => {
		//on:mouseMove || resizing Table column
		if (!dragging) return;

		fieldsWidth[dragging] += e.movementX;
		console.log('resizing');
	};

	const resizeEnd = () => {
		//on:mouseUp || resize done || release dragging
		dragging = null;
	};

	const dragStart = () => (locking = true);
	//	on:dragStart || change number of locked columns

	const dragOver = (e) => e.preventDefault();
	//	on:dragOver || before placing 'dragged' at destination

	const drop = (e, index) => {
		//	on:drop || updating number of locked column
		e.preventDefault();
		if (!locking) return;
		lockedColumns = index;
		locking = false;
	};

	const getStickyFieldLeft = (fieldIndex) => {
		//	setting each locked column's left margin from table
		if (fieldIndex == 0) return 0;

		let tempLeft = 0;
		Object.values(fieldsWidth).map((fieldWidth, index) => {
			if (index < fieldIndex) {
				tempLeft += fieldWidth;
			}
		});
		return tempLeft;
	};

	const repositionStart = (fieldIndex) => {
		position = fieldIndex;
	};

	const inPosition = (e) => {
		e.preventDefault();
	};

	const repositionStop = (e, fieldIndex) => {
		if (!position) return;

		[filteredGrid[position], filteredGrid[fieldIndex]] = [
			filteredGrid[fieldIndex],
			filteredGrid[position]
		];
		position = null;
	};
</script>

<svelte:window on:mousemove={(e) => resize(e)} on:mouseup={resizeEnd} />

<div class="w-full mb-8 overflow-auto">
	<div class="relative inline-flex">
		{#each filteredGrid as fieldName, fieldIndex}
			<div
				on:drop={(e) => repositionStop(e, fieldIndex)}
				on:dragover={(e) => inPosition(e)}
				class="relative h-12 bg-gray-100 text-[#ff5800] text-md font-bold text-center py-2 border-r-[2px] border-b-[2px] border-b-gray-400 {fieldIndex <=
				lockedColumns
					? 'sticky z-20'
					: 'z-0'}"
				style="width:{fieldsWidth[fieldName]}px; {fieldIndex <= lockedColumns
					? `left:${getStickyFieldLeft(fieldIndex)}px`
					: ''}"
			>
				<span
					class="hover:cursor-grab"
					draggable="true"
					on:dragstart={() => repositionStart(fieldIndex)}
				>
					{fieldName}
				</span>
				<div
					class="w-[3px] h-full bg-gray-600 absolute right-[-2px] top-0 z-20 cursor-col-resize hover:bg-blue-400 {dragging ==
					fieldName
						? 'hover:h-screen'
						: ''}"
					on:mousedown={() => resizeStart(fieldName)}
				/>
				{#if fieldIndex < 3}
					<div
						dropzone="true"
						class="w-[3px] bg-transparent absolute right-[-2px] top-12"
						style="height:{rowCountTimes}%"
						on:drop={(e) => drop(e, fieldIndex)}
						on:dragover={dragOver}
					>
						{#if lockedColumns == fieldIndex}
							<div
								draggable="true"
								class="bg-[#ff5800] h-full hover:bg-blue-800 {dragging
									? 'hover:bg-transparent'
									: ''}"
								on:dragstart={dragStart}
							/>
						{/if}
					</div>
				{/if}
			</div>
		{/each}
	</div>
	{#each data as row, index}
		<div class="inline-flex">
			{#each filteredGrid as fieldName, fieldIndex}
				<div
					class="bg-gray-200 text-center overflow-hidden border-b-[2px] border-r-[2px] border-gray-400 {fieldIndex <=
					lockedColumns
						? 'sticky z-1'
						: ''}"
					style="width:{fieldsWidth[fieldName]}px; {fieldIndex <= lockedColumns
						? `left:${getStickyFieldLeft(fieldIndex)}px`
						: ''}"
				>
					<span>
						{row[fieldName]}
					</span>
				</div>
			{/each}
		</div>
	{/each}
</div>
