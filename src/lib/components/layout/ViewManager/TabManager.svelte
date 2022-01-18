<script>
    import { ViewManager } from '.';
    import { OpenedTabs, removeTab, CurrentTab } from '$lib/stores/layout';
	// $: {
	// 	filteredtabs = $AllTabs.filter((item) => {
	// 		return !$OpenedTabs.includes(item);
	// 	});
	// }
	const setCurrentTab = (tab) => {
        CurrentTab.set(tab);
	};
	const removeTabLocal = index => {
		removeTab(index);
		if($OpenedTabs.length == 1) CurrentTab.set($OpenedTabs[0]);
	}
</script>

<div class="w-full h-[95vh] flex flex-col">
	<div class="w-full flex bg-gray-800 gap-x-2">
        {#each $OpenedTabs as tab, index}
			<div
				class="group self-center content-center btn btn-ghost btn-sm text-white mx-2 relative rounded-xl"
			>
                <span
                    on:click|preventDefault={() => setCurrentTab(tab)}
                    class="self-baseline text-sm transition-all duration-100 {$CurrentTab.name == tab.name?'text-[#ff5800] mt-[-5px] orange-neon-glow':''}"
					>{tab.name}
                </span>
            {#if index > 0}
                <i on:click={() => removeTabLocal(index)} class="fas fa-times ml-4 transition-all text-white hover:text-[#ff5800] hover:orange-neon-glow {$CurrentTab.name == tab.name?'mt-[-5px]':''}"/>
            {/if}
			</div>
		{/each}
		<div class="dropdown self-center">
			<button tabindex="0" class="btn btn-sm bg-gray-600 hover:text-[#ff5800] text-white mx-2">
				<i class="fas fa-plus" />
			</button>
			<!-- <ul tabindex="0" class="p-2 ml-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
				{#each filteredtabs as ftab, index}
					<li>
						<span class="hover:cursor-pointer" on:click={addTabLocal(ftab, index)}>{ftab.name}</span
						>
					</li>
				{/each}
			</ul> -->
		</div>
	</div>
    <!-- <div class="w-full h-full flex"> -->
        <ViewManager bind:views={$CurrentTab.childs}/>
    <!-- </div> -->
</div>