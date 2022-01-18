<script>
	import { addTab, CurrentTab } from '$lib/stores/layout';
	import {Modules} from '$lib/Modules'

	const openTab = mod => {
		CurrentTab.set(mod);
		addTab(mod);
	}
</script>

<div class="flex flex-col h-full justify-center">
	<!-- <div class="self-center"> -->
		<div class="flex justify-center">
			<div class="grid grid-cols-2 gap-x-4">
				{#each Modules as mod,index}
					<button
						on:click={openTab(mod)}
						class="btn bg-orange border-none rounded-xl p-4 btn-md w-28 h-16">Inventory</button
					>
				{/each}
			</div>
		</div>
	<!-- </div> -->
</div>
