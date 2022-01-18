<script>
	import {MenuVisible, CurrentTab, toggleMenu } from '$lib/stores/layout';
	export let views = [];
	export let activeChildIndex = 0;

	const setActiveChild = (index) => {
		activeChildIndex = index;
	};
</script>

<div class="w-full h-full flex">
	{#if views.length > 1}
		<div class="flex flex-col w-56 min-w-56 max-w-56 text-white {!$MenuVisible?'hidden':''}">
			<div class="flex w-full h-8 bg-gray-200 align-middle gap-x-2 pl-2">
				<button
					class="group btn-menu hover:bg-transparent"
					on:click|preventDefault={toggleMenu}
				>
					<i class="far fa-window-restore text-gray-800 text-sm group-hover:text-[#ff5800]" />
				</button>
				<span class="self-center text-gray-800 font-bold">{$CurrentTab.name}</span>
			</div>
			<div class="flex flex-col w-full py-1 px-1 bg-gray-800 h-full transition-all">
				{#each views as view, index}
					<button
						class="btn btn-md bg-transparent border-none text-white {index == activeChildIndex
							? '!bg-white text-orange-600 font-bold'
							: ''}"
						on:click|preventDefault={() => setActiveChild(index)}>{view.name}</button
					>
				{/each}
			</div>
		</div>
	{/if}
	<div class="w-full flex">
		<svelte:component this={views[activeChildIndex].component} />
	</div>
</div>
