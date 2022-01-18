<script>
	import GridHeader from '../../../layout/GridHeader.svelte';
	import { structure } from '../../../layout/structure';
	import data from '$lib/data';

	let rowCountTimes = 100 * (data.length + 1);
	let fieldsWidth = {};
	let dragging = null;
	let locking = false;
	let lockedColumns = 0;
	let position = null;
	let struct = Object.keys(structure);
	$: {
		Object.keys(structure).map((fieldName) => {
			fieldsWidth[fieldName] = 200;
		});
	}

	const resizeStart = (fieldName) => {
		//on:mouseDown || resize start Table column || using: dragging as fieldName
		dragging = fieldName;
	};

	const resize = (e) => {
		//on:mouseMove || resizing Table column
		if (!dragging) return;

		fieldsWidth[dragging] += e.movementX;
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
		if(!position) return

		[struct[position],struct[fieldIndex]] = [struct[fieldIndex],struct[position]];
		position = null;
	};
</script>

<svelte:window on:mousemove={(e) => resize(e)} on:mouseup={resizeEnd} />
<div class="flex flex-col w-full h-full scrollbar-thin scrollbar-thumb-orange-600">
	<GridHeader />
	<div class="mt-2">
		<div
			id="table"
			class="w-full pb-2 relative"
		>
			<div class="relative inline-flex">
				{#each struct as fieldName, fieldIndex}
					<div
						on:drop={(e) => repositionStop(e, fieldIndex)}
						on:dragover={(e) => inPosition(e)}
						class="relative h-12 bg-gray-800 text-white text-center py-2 border-r-[2px] border-transparent {fieldIndex <=
						lockedColumns
							? 'sticky z-20'
							: 'z-0'}"
						style="width:{fieldsWidth[fieldName]}px; {fieldIndex <= lockedColumns
							? `left:${getStickyFieldLeft(fieldIndex)}px`
							: ''}"
					>
						<span class="hover:cursor-grab" draggable="true" on:dragstart={() => repositionStart(fieldIndex)}>
							{fieldName}
						</span>
						<div
							class="w-[3px] h-full bg-white absolute right-[-2px] top-0 z-20 cursor-col-resize hover:bg-blue-400 {dragging ==
							fieldName
								? 'hover:h-screen'
								: ''}"
							on:mousedown={() => resizeStart(fieldName)}
						/>
						<!-- {#if fieldIndex < 3} -->
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
						<!-- {/if} -->
					</div>
				{/each}
			</div>
			{#each data as row}
				<div class="inline-flex">
					{#each struct as fieldName, fieldIndex}
						<div
							class="bg-white text-center overflow-hidden border-b-[3px] border-r-[3px] border-gray-500 {fieldIndex <=
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
	</div>
</div>
