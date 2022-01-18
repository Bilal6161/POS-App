<script>
	import { Page } from '$lib/components/layout/Page';
	import {products} from '$lib/products';

	let product = {
		name: '',
		category: '',
		uoms: [],
		variations: [],
	};
	// let uoms = [
		//Major Array UOM(s)
		// { name: '', baseQty: 1, isPurchaseUnit: false, isSellUnit: false, isStockUnit: false }
	// ];
	// let variations = [
		//Major Array Variations
		// {
			// name: '',
			// value: []
		// }
	// ];
	let cartedArray = []; //Array inserted in it at click event || CARTESIANED DATA of Variants
	//UOM Functions [Add, Remove, setPurchaseUnit, setSellUnit, setStockUnit]
	const addNewUOM = () => {
		product.uoms = [
			...product.uoms,
			{ name: '', baseQty: 1, isPurchaseUnit: false, isSellUnit: false, isStockUnit: false }
		];
	};
	const removeUOM = (index) => {
		product.uoms = product.uoms.filter((value, i) => {
			return i != index;
		});
	};
	const setPurchaseUnit = (index) => {
		product.uoms.map((uom, i) => {
			uom.isPurchaseUnit = false;
		});
		product.uoms[index].isPurchaseUnit = true;
	};
	const setSellUnit = (index) => {
		product.uoms.map((uom, i) => {
			uom.isSellUnit = false;
		});
		product.uoms[index].isSellUnit == true;
	};
	const setStockUnit = (index) => {
		product.uoms.map((uom, i) => {
			uom.isStockUnit = false;
		});
		product.uoms[index].isStockUnit = true;
	};
	//..UOM Functions
	//Variation(s) Functions [Add, Remove, addNewVariationValue, removeVariationValue]
	const addNewVariation = () => {
		product.variations = [...product.variations, { name: '', value: [] }];
	};
	const removeVariation = (index) => {
		product.variations = product.variations.filter((value, i) => {
			return i != index;
		});
	};
	const addNewVariationValue = (index) => {
		const arr = [...product.variations[index].value, ''];
		product.variations[index].value = arr;
	};
	const removeVariationValue = (i, index) => {
		let tempvalue = [...product.variations[index].value];
		tempvalue = tempvalue.filter((value, j) => {
			return i != j;
		});
		product.variations[index].value = tempvalue;
	};
	//..Variation(s) Functions
	const cartesian = (...a) => a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));
	const makeCartedArray = () => {
		let temp = [];
		let temp2 = [];
		let result = [];
		variations.map((obj, index) => {
			temp[index] = obj.value;
			result = cartesian(temp2, temp[index]);
			temp2 = [...temp[index]];
		});
		cartesian(result).map((data, index) => {
			temp[index] = { name: data, comparePrice: 0, sellPrice: 0, listPrice: 0 };
		});
		cartedArray = [...temp];
		console.log(cartedArray);
	};
	// const addProduct = () => {
	// 	product.uoms = uoms;
	// 	product.variations = cartedArray;
	// 	Products.set(product);
	// };
</script>

<Page>
	<svelte:fragment slot="actions">
		<button class="btn btn-xs btn-info" on:click={makeCartedArray}> Test </button>
	</svelte:fragment>

	<svelte:fragment slot="actions-end">
		<button class="btn btn-xs btn-info"> Save </button>
	</svelte:fragment>

	<div class="w-full flex justify-center mb-8 overflow-auto">
		<div class="w-3/4 flex flex-col pt-4 gap-y-4">
			<div class="flex flex-col w-full rounded-xl pb-2 shadow-md">
				<h3 class="bg-gray-800 p-2 pl-4 text-white rounded-xl">Product General Information</h3>
				<div class="flex flex-row px-4 py-1 justify-end gap-x-2">
					<span class="font-semibold">Active</span>
					<input type="checkbox" checked="checked" class="checkbox checkbox-[#ff5800]"/>
				</div>
				<div class="w-full flex flex-col gap-y-4 p-4 pt-0 px-8">
					<div class="form-control flex-1 items-center">
						<div class="w-[50%] flex flex-col self-start">
							<span class="text-start text-gray-800 text-xs font-bold pl-1 mb-1"> Product Name </span>
							<input
								type="text"
								class="input input-sm bg-white col-span-2 rounded-lg"
								bind:value={product.name}
							/>
						</div>
					</div>
					<div class="form-control flex-1 items-center">
						<div class="w-[50%] flex flex-col self-start">
							<span class="text-start text-gray-800 text-xs font-bold pl-1 mb-1"> Product Types </span>
							<select class="select select-sm select-bordered select-error w-full max-w-xs" placeholder="Product Type" bind:value={product.category}>
								<option>Consumable</option> 
								<option>Storeable</option> 
								<option>Addon</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div class="w-full flex flex-col rounded-xl shadow-md">
				<h3 class="bg-gray-800 p-2 pl-4 text-white rounded-xl">UOM(s)</h3>
	
				<div class="w-full flex flex-col p-2 gap-y-2">
					{#each product.uoms as uom, index}
						<div class="flex flex-row w-full items-center pl-1 gap-x-2">
							<span
								class="group btn btn-sm btn-square text-white text-xs p-1 bg-gray-800 hover:bg-orange border-none rounded-full self-end"
								on:click={() => removeUOM(index)}
							>
								<p class="group-hover:hidden">{index + 1}</p>
								<p class="hidden group-hover:block">-</p>
							</span>
							<div class="form-control flex-1 items-center">
								<div class="flex flex-col">
									<span class="text-center text-gray-800 text-xs font-bold mb-1"> UOM Name </span>
									<input
										type="text"
										class="input input-xs bg-white col-span-2 rounded-full"
										bind:value={uom.name}
									/>
								</div>
							</div>
							<div class="form-control flex-1 items-center">
								<div class="flex flex-col">
									<span class="text-center text-gray-800 text-xs font-bold mb-1"> Base Qty </span>
									<input
										type="number"
										class="input input-xs bg-white col-span-2 rounded-full {index == 0
											? 'btn-disabled text-black'
											: ''}"
										min="0"
										bind:value={uom.baseQty}
									/>
								</div>
							</div>
							<div class="form-control flex-1 items-center">
								<div class="flex flex-col items-center">
									<span class="text-center text-gray-800 text-xs font-bold">
										Purchase<br />Unit
									</span>
									<input
										type="checkbox"
										class="checkbox checkbox-sm bg-white"
										on:change={() => setPurchaseUnit(index)}
										bind:checked={uom.isPurchaseUnit}
									/>
								</div>
							</div>
							<div class="form-control flex-1 items-center">
								<div class="flex flex-col items-center">
									<span class="text-center text-gray-800 text-xs font-bold">
										Sell<br />Unit
									</span>
									<input
										type="checkbox"
										class="checkbox checkbox-sm bg-white"
										on:change={() => setSellUnit(index)}
										bind:checked={uom.isSellUnit}
									/>
								</div>
							</div>
							<div class="form-control flex-1 items-center">
								<div class="flex flex-col items-center">
									<span class="text-center text-gray-800 text-xs font-bold">
										Stock<br />Unit
									</span>
									<input
										type="checkbox"
										class="checkbox checkbox-sm bg-white"
										on:change={() => setStockUnit(index)}
										bind:checked={uom.isStockUnit}
									/>
								</div>
							</div>
						</div>
					{/each}
					<button on:click={addNewUOM} class="btn rounded-md border-none font-bold bg-[#ff5800] text-gray-800 hover:bg-white hover:text-[#ff5800]">Add More</button>
				</div>
			</div>
			<div class="flex flex-col w-full rounded-xl shadow-md">
				<h3 class="bg-gray-800 p-2 pl-4 text-white rounded-xl">Variations</h3>
				<div class="form-control flex flex-col w-full p-2 gap-y-2">
					<div class="flex flex-col w-full p-1 gap-y-1 rounded-xl {product.variations.length >= 1?'border-2 border-[#ff5800] border-opacity-50':''}">
						{#each product.variations as variation, index}
							<div class="p-1 gap-x-2 items-center border-t-2 border-dashed border-gray-800 first:border-none">
								<div class="w-full flex items-center">
									<span
									on:click={() => removeVariation(index)}
									class="group btn btn-square btn-sm p-1 bg-gray-800 hover:bg-orange border-none rounded-full text-white text-xs"
									><p class="group-hover:hidden">{index + 1}</p>
									<p class="hidden group-hover:block">-</p></span
								>
								<input
									type="text"
									placeholder="Enter variation name"
									class="input input-xs bg-white col-span-2 rounded-full ml-4"
									bind:value={variation.name}
								/>
								{#if variation.name}
									<span class="ml-auto text-sm font-semibold">Variation # {index+1}</span>
									<span class=" ml-4 text-sm font-bold">{variation.name}</span>
								{/if}
								</div>
								<div class="w-full flex flex-col p-1 items-center">
									{#each variation.value as value, i}
										<div class="w-3/4 form-control flex flex-row items-center py-1">
											<span
												on:click={() => removeVariationValue(i, index)}
												class="group btn btn-square btn-sm p-1 bg-gray-800 hover:bg-orange border-none rounded-full text-white text-xs col-span-1"
												><p class="group-hover:hidden text-xs">{index + 1}.{i + 1}</p>
												<p class="hidden group-hover:block">-</p></span
											>
											<input
												type="text"
												placeholder="Enter variation value"
												class="input input-xs bg-white col-span-2 rounded-full ml-4"
												bind:value={product.variations[index].value[i]}
											/>
											<span class="ml-auto text-xs font-semibold">{value}</span>
										</div>
									{/each}
									<button
										on:click={() => addNewVariationValue(index)}
										class="btn w-full bg-gray-800 rounded-md">Add Value</button
									>
								</div>
							</div>
						{/each}
					</div>
					<button on:click={addNewVariation} class="btn w-full font-bold border-none rounded-md bg-[#ff5800] text-gray-800 hover:bg-white hover:text-[#ff5800]"
						>Add another variation</button
					>
				</div>
			</div>
			<div class="flex flex-col w-full rounded-xl shadow-md bg-gray-200">
				<h3 class="bg-gray-800 p-2 pl-4 text-white rounded-xl">Prices</h3>
				<!-- {#if cartedArray?.length > 1} -->
					<div class="flex flex-col w-full overflow-auto">
						<div class="w-full flex flex-row p-1 gap-2">
							<span class="mr-2">#</span>
							<div class="flex flex-row w-full">
								<span class="w-[25%] text-center">Variations</span>
								<span class="w-[25%] text-center">Compare Price</span>
								<span class="w-[25%] text-center">Sell Price</span>
								<span class="w-[25%] text-center">List Price</span>
							</div>
						</div>
						{#each products as data,index}
							<div class="w-full flex flex-row p-1 gap-2">
								<span class="mr-2 text-sm">{index+1}</span>
								<div class="flex flex-row w-full">
									<span class="w-[25%] text-center text-sm">{data.name}</span>
									<input
										class="w-[25%] input input-xs input-ghost text-center"
										type="text"
										placeholder={data.comparePrice}
										bind:value={data.comparePrice}
									/>
									<input
										class="w-[25%] input input-xs input-ghost text-center"
										type="text"
										placeholder={data.sellPrice}
										bind:value={data.sellPrice}
									/>
									<input
										class="w-[25%] input input-xs input-ghost text-center"
										type="text"
										placeholder={data.listPrice}
										bind:value={data.listPrice}
									/>
								</div>
							</div>
						{/each}
					</div>
				<!-- {/if} -->
			</div>
		</div>
	</div>
</Page>
