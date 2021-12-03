<script>
	import { CurrentTab, OpenedTabs, addTab, AllTabs } from '$lib/store';
    import AddProduct from '../components/AddProduct.svelte'
	import ViewProducts from './ViewProducts.svelte';
	import StockBalance from '../components/StockBalance.svelte'

	let currenttab;
	let openedtabs;
	let alltabs;
    let activetab;
	CurrentTab.subscribe((value) => {
		currenttab = value;
	});
	OpenedTabs.subscribe((value) => {
		openedtabs = value;
	});
	AllTabs.subscribe((value) => {
		alltabs = value;
	});
    function setActiveTab(data)
    {
        activetab = data.split(' ').join('');
        console.log(activetab)
    }
</script>

<div class="flex w-full h-screen">
	{#if openedtabs.length == 0}
		<div class="flex flex-col w-full h-screen justify-center align-middle">
			{#each alltabs as value, index}
				<div class="flex mx-auto my-2">
					<button
						key={index}
						on:click={() => addTab(value, index)}
						class="btn bg-orange border-none rounded-xl p-4 btn-md w-28 h-16">{value.name}</button
					>
				</div>
			{/each}
		</div>
	{/if}
	{#if openedtabs.length > 0}
		<div class="grid grid-cols-4 w-full">
			<div class="col-span-1">
				<div class="flex flex-col h-screen bg-base-300 pt-8">
					{#each currenttab?.childs as ops}
						<button class="btn btn-ghost text-black" on:click={() => setActiveTab(ops)}>{ops}</button>
					{/each}
				</div>
			</div>
			<div class="col-span-3">
                {#if (activetab == 'AddProduct')}
					<svelte:component this={AddProduct}/>
				{/if}
				{#if (activetab == 'ViewProducts')}
					<svelte:component this={ViewProducts}/>
				{/if}
				{#if (activetab == 'StockBalance')}
					<svelte:component this={StockBalance}/>
				{/if}
            </div>
		</div>
	{/if}
</div>
