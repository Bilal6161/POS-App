<script>
	import { OpenedTabs, AllTabs, addTab, removeTab, CurrentTab } from '$lib/store';
	
	let filteredtabs;
	$: {
		filteredtabs = $AllTabs.filter((item) => {
			return !$OpenedTabs.includes(item);
		});
	}
	const setCurrentTab = (e, index) => {
		CurrentTab.set(index);
	};
	const addTabLocal = (value,index) => {
		if($CurrentTab == -1)
		{
			CurrentTab.set($CurrentTab += 1);
			addTab(value);
		}
		else
		{
			addTab(value);
		}
	}
	const removeTabLocal = (index) => {
		if ($CurrentTab > index || $CurrentTab == $OpenedTabs.length - 1) {
			CurrentTab.set($CurrentTab -= 1);
			removeTab(index);
		} else {
			removeTab(index);
		}
	};
</script>

<div class="flex flex-col w-full">
	<div class="flex w-full h-12 bg-current gap-x-2">
		<!-- <button
			class="self-center btn btn-ghost btn-sm hover:bg-base-300 hover:text-black text-white mx-2"
			>Dashboard</button
		> -->
		<div class="dropdown self-center">
			<button
				tabindex="0"
				class="btn btn-sm bg-gray-600 hover:text-[#ff5800] text-white mx-2"
				><i class="fas fa-plus" /></button
			>
			<ul tabindex="0" class="p-2 ml-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
				{#each filteredtabs as ftab,index}
					<li>
						<span class="hover:cursor-pointer" on:click={addTabLocal(ftab,index)}>{ftab.name}</span>
					</li>
				{/each}
			</ul>
		</div>
		{#each $OpenedTabs as tab, index}
			<div
				data={index}
				class=" group self-center content-center btn btn-ghost btn-sm hover:bg-orange hover:bg-opacity-50 text-white mx-2 relative {$CurrentTab ==
				index
					? 'bg-orange hover:bg-opacity-100'
					: ''}"
			>
				<span
					data={index}
					on:click={(e) => setCurrentTab(e, index)}
					class="group-hover:text-white self-baseline text-sm">{tab.name}</span
				><i on:click={() => removeTabLocal(index)} class="fas fa-times hover:text-red-700 ml-4" />
			</div>
		{/each}
	</div>
</div>
