<script>
	import { OpenedTabs, AllTabs, addTab, removeTab, CurrentTab } from '$lib/store';

	let openedtabs;
	let alltabs;
	let filteredtabs;
	OpenedTabs.subscribe((value) => {
		openedtabs = value;
	});
	AllTabs.subscribe((value) => {
		alltabs = value;
	});
	$: {
		filteredtabs = alltabs.filter((item) => {
			return !openedtabs.includes(item);
		});
	}
</script>

<div class="flex flex-col w-full">
	<div class="flex w-full h-12 bg-current gap-x-2">
		<h3 class="text-white self-center">Path/From/To</h3>
		<div class="dropdown self-center">
			<button
				tabindex="0"
				class="btn btn-ghost btn-sm hover:bg-base-300 hover:text-black text-white mx-2"
			><i class="fas fa-plus"></i></button>
			<ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
				{#each filteredtabs as ftab}
					<li>
						<a on:click={addTab(ftab)}>{ftab.name}</a>
					</li>
				{/each}
			</ul>
		</div>
		{#each openedtabs as tab, index}
			<div on:click={()=>CurrentTab.set(tab)} class="flex bg-orange rounded-full rounded-t-none px-1 w-24 justify-center">
				<span class="self-baseline text-white text-sm">{tab.name}<button class="ml-2" on:click={()=>removeTab(index)}><i class="fas fa-times hover:cursor-pointer"/></button></span>
			</div>
		{/each}
	</div>
</div>
