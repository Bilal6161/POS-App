<script>
	import { CurrentTab, OpenedTabs } from '$lib/store';
	import Modules from '../components/ui/Modules.svelte';

	let currentTabData;
	let activeField;
	$: {
		currentTabData = $OpenedTabs[$CurrentTab];
		if (!$OpenedTabs.length) {
			activeField = {};
		}
	}
	const setActiveFieldComp = (index,comp) => {
		activeField = {
			index,
			component: comp.component
		}
	};
</script>

{#if $OpenedTabs.length == 0}
<Modules />
{/if}
{#if $OpenedTabs.length > 0}
<div class="flex w-full h-full overflow-hidden">
		<div class="grid grid-cols-5 w-full h-full">
			<div class="col-span-1 h-full bg-gray-800">
				<p class="flex font-bold pl-1 text-white">/ {$OpenedTabs[$CurrentTab].name}</p>
				<div class="flex flex-col">
					{#each currentTabData?.childs as comp, index}
						<button
							on:click={setActiveFieldComp(index,comp)}
							class="btn btn-ghost hover:bg-orange text-white rounded-none rounded-l-full {activeField.index == index
								? 'bg-white hover:bg-white text-[#ff5800] font-bold'
								: ''}">{comp.name}</button
						>
					{/each}
				</div>
			</div>
			<div class="col-span-4 px-2 overflow-auto">
				<!-- <div class="flex flex-col"> -->
					{#if activeField.component}
						<svelte:component this={activeField.component} />
					{:else}
						<p>No content to display</p>
					{/if}
				<!-- </div> -->
			</div>
		</div>
	</div>
	{/if}
