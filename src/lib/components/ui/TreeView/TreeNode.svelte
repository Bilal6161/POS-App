<script>
	export let node = {};
	export let selectChange = (value)=>{};
	let isActive = false;
	let isExpanded = false;

	const handleActive = (node) => {
		selectChange(node)
	}
	const toggleExpanded = () => {
		isExpanded = !isExpanded;
	}
</script>

<div class="flex flex-col gap-y-1 items-start">
	<div class="flex flex-row items-center gap-1">
		{#if node?.childs?.length > 0}
		<button class="btn btn-xs btn-ghost w-4" on:click|preventDefault={toggleExpanded}>
			<i class="fa {isExpanded?'fa-minus':'fa-plus'}"/>
		</button>
		{:else}
		<span class="w-4"/>
		{/if}
		<input	class="checkbox checkbox-sm bg-white" 
				type="checkbox"
				bind:checked={isActive}
				on:change={()=>handleActive(node)}
		/>
		<span	class="px-2 font-bold hover:cursor-pointer transition-all duration-200 rounded-xl
				{node.childs?.length?'text-gray-800 ':'text-[#ff5800]'}
				{isActive && !node?.childs?.length?'text-[#ff5800] duration-75 orange-neon-glow hover:orange-neon-glow':''}"
				on:click|preventDefault={toggleExpanded}>
				{node.name}
		</span>
	</div>
	{#if isExpanded && node.childs?.length > 0}
	<div class="ml-4">
		{#if node?.childs?.length}
			{#each node.childs as node,index}
				<svelte:self {node} {selectChange}/>
			{/each}
		{/if}
	</div>
	{/if}
	<!-- <button class="btn btn-xs btn-circle btn-ghost" on:click|preventDefault={createChild}><i class="fas fa-plus" /></button> -->
</div>

<!-- <script context="d">
	const createChild = () => {
        let temp = node.childs;
        temp = [...temp,{name:`1.${node.childs?.length+1}`,childs:[]}];
        node.childs = temp;
    }
	const deleteChild = index => {
		let temp;
		temp = node.childs.filter((d,i)=>{
			return i != index;
		});
		node.childs = temp;
	}
</script> -->