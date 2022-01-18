<script>
	import {Products} from '$lib/store.js';
	let product = {
		name:'',
		category:'',
		uoms:[],
		variations:[]
	}
	let uoms = [
		//Major Array UOM(s)
		{ name: '', baseQty: 1, isPurchaseUnit: false, isSellUnit: false, isStockUnit: false }
	];
	let variations = [
		//Major Array Variations
		{
			name: '',
			value: []
		}
	];
	let cartedArray = []; //Array inserted in it at click event || CARTESIANED DATA of Variants
	let toggleUOM = false;
	let toggleVariation = false;
	//UOM Functions [Add, Remove, setPurchaseUnit, setSellUnit, setStockUnit]
	const addNewUOM = () => {
		uoms = [
			...uoms,
			{ name: '', baseQty: 1, isPurchaseUnit: false, isSellUnit: false, isStockUnit: false }
		];
	};
	const removeUOM = (index) => {
		uoms = uoms.filter((value, i) => {
			return i != index;
		});
	};
	const setPurchaseUnit = (index) => {
		uoms.map((uom, i) => {
			uom.isPurchaseUnit = false;
		});
		uoms[index].isPurchaseUnit = true;
	};
	const setSellUnit = (index) => {
		uoms.map((uom, i) => {
			uom.isSellUnit = false;
		});
		uoms[index].isSellUnit == true;
	};
	const setStockUnit = (index) => {
		uoms.map((uom, i) => {
			uom.isStockUnit = false;
		});
		uoms[index].isStockUnit = true;
	};
	//..UOM Functions
	//Variation(s) Functions [Add, Remove, addNewVariationValue, removeVariationValue]
	const addNewVariation = () => {
		variations = [...variations, { name: '', value: [] }];
	};
	const removeVariation = (index) => {
		variations = variations.filter((value, i) => {
			return i != index;
		});
	};
	const addNewVariationValue = (index) => {
		const arr = [...variations[index].value, ''];
		variations[index].value = arr;
	};
	const removeVariationValue = (i, index) => {
		let tempvalue = [...variations[index].value];
		tempvalue = tempvalue.filter((value, j) => {
			return i != j;
		});
		variations[index].value = tempvalue;
	};
	//..Variation(s) Functions
	const cartesian = (...a) => a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));
	const setCartesian = () => {
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
	};

	const addProduct = () => {
		product.uoms = uoms;
		product.variations = cartedArray;
		Products.set(product);
	}
</script>

<div class="flex flex-col w-full h-full overflow-auto">
	<!-- Test Buttons -->
	<div class="flex">
		<button on:click={setCartesian} class="btn btn-sm btn-success rounded-md text-sm">Done</button>
		<button class="btn btn-sm btn-success rounded-md text-sm ml-auto">Cancel</button>
	</div>
	<!-- //Test Buttons -->

	<!-- Main centralized w-3/4 container -->
	<div class="w-full self-center">
		<!-- Product Gen. Info sections -->
		<div class="container w-full mt-6 rounded-xl shadow-md bg-gray-200">
			<h3 class="bg-gray-800 p-2 pl-4 text-white rounded-xl">Product General Information</h3>
			<!-- <div class="form-control px-2 w-3/4 mx-auto">
				<label class="label" />
				<span class="self-center p-1 bg-gray-800 rounded-t-lg text-white text-xs">Product Name</span
				>
				<input type="text" placeholder="Enter product name" class="input bg-white" />
			</div> -->
			<div class="form-control px-2">
				<label class="label" />
				<span class="self-baseline p-1 bg-gray-800 rounded-t-lg text-white text-xs ml-3"
					>Product Name</span
				>
				<input type="text" placeholder="Enter product Name" class="input bg-white" bind:value={product.name} />
			</div>
			<div class="form-control px-2">
				<label class="label" />
				<span class="self-baseline p-1 bg-gray-800 rounded-t-lg text-white text-xs ml-3"
					>Product Type</span
				>
				<input type="text" placeholder="Enter product type" class="input bg-white" bind:value={product.category} />
			</div>
		</div>
		<!-- //Product Gen. Info sections -->

		<!-- UOM sections -->
		<div class="container w-full mt-6 rounded-xl shadow-md bg-gray-200">
			<h3 class="bg-gray-800 p-2 pl-4 text-white rounded-xl">UOM(s)</h3>
			<div class="form-control px-2 w-full mx-auto">
				<label class="label">
					<span class="label" />
					<span class="label-text">Add UOM(s) ?</span>
					<input type="checkbox" class="toggle" on:click={() => (toggleUOM = !toggleUOM)} />
					<span class="label" />
				</label>
			</div>
			{#if toggleUOM == true}
				<div class="form-control px-2 w-full mx-auto">
					<div class="grid grid-cols-8 gap-x-2">
						<label class="label-text col-span-1" />
						<label class="label-text text-center col-span-2">UOM Name</label>
						<label class="label-text text-center col-span-2">Base Quantity</label>
						<label class="label-text text-center col-span-1">Purchase Unit</label>
						<label class="label-text text-center col-span-1">Sell Unit</label>
						<label class="label-text text-center col-span-1">Stock Unit</label>
					</div>
					{#each uoms as uom, index}
						<div class="grid grid-cols-8 gap-x-2 items-center my-4">
							<span
								on:click={() => removeUOM(index)}
								class="group btn btn-square p-1 bg-gray-800 hover:bg-orange border-none rounded-full text-white text-xs col-span-1 {index ==
								0
									? 'btn-disabled'
									: ''}"
								><p class="group-hover:hidden">{index + 1}</p>
								<p class="hidden group-hover:block">-</p></span
							>
							<input
								type="text"
								placeholder="Enter UOM name"
								class="input input-sm bg-white col-span-2 rounded-full"
								bind:value={uom.name}
							/>
							<input
								type="number"
								placeholder="Enter quantity"
								class="input input-sm bg-white col-span-2 rounded-full {index == 0
									? 'btn-disabled text-black'
									: ''}"
								bind:value={uom.baseQty}
							/>
							<input
								type="checkbox"
								class="checkbox col-span-1 justify-self-center bg-white"
								on:change={() => setPurchaseUnit(index)}
								bind:checked={uom.isPurchaseUnit}
							/>
							<input
								type="checkbox"
								class="checkbox col-span-1 justify-self-center bg-white"
								on:change={() => setSellUnit(index)}
								bind:checked={uom.isSellUnit}
							/>
							<input
								type="checkbox"
								class="checkbox col-span-1 justify-self-center bg-white"
								on:change={() => setStockUnit(index)}
								bind:checked={uom.isStockUnit}
							/>
						</div>
					{/each}
					<button on:click={addNewUOM} class="btn bg-gray-800 rounded-md">Add More</button>
				</div>
			{/if}
		</div>
		<!-- //UOM sections -->

		<!-- Variations sections -->
		<div class="container w-full mt-6 rounded-xl shadow-md bg-gray-200">
			<h3 class="bg-gray-800 p-2 pl-4 text-white rounded-xl">Variations</h3>
			<div class="form-control px-2 w-full mx-auto">
				<label class="label">
					<span class="label" />
					<span class="label-text">Add Variations ?</span>
					<input
						type="checkbox"
						class="toggle"
						on:click={() => (toggleVariation = !toggleVariation)}
					/>
					<span class="label" />
				</label>
				{#if toggleVariation == true}
					{#each variations as variation, index}
						<div class="gap-x-2 items-center my-4 border-2 border-gray-400 rounded-xl p-0.5">
							<span
								on:click={() => removeVariation(index)}
								class="group btn btn-square btn-md p-1 bg-gray-800 hover:bg-orange border-none rounded-full text-white text-xs {index ==
								0
									? 'btn-disabled'
									: ''}"
								><p class="group-hover:hidden">{index + 1}</p>
								<p class="hidden group-hover:block">-</p></span
							>
							<input
								type="text"
								placeholder="Enter variation name"
								class="input input-sm bg-white col-span-2 rounded-full ml-4"
								bind:value={variation.name}
							/>
							<div class="w-3/4 mx-auto">
								{#each variation.value as value, i}
									<div class="form-control flex flex-row items-center w-full border-2 p-0.5">
										<span
											on:click={() => removeVariationValue(i, index)}
											class="group btn btn-square btn-md p-1 bg-gray-800 hover:bg-orange border-none rounded-full text-white text-xs col-span-1"
											><p class="group-hover:hidden">{index + 1}.{i + 1}</p>
											<p class="hidden group-hover:block">-</p></span
										>
										<input
											type="text"
											placeholder="Enter variation value"
											class="input input-sm bg-white col-span-2 rounded-full ml-4"
											bind:value={variations[index].value[i]}
										/>
									</div>
								{/each}
								<button
									on:click={() => addNewVariationValue(index)}
									class="btn w-full bg-gray-800 rounded-md">Add Value</button
								>
							</div>
						</div>
					{/each}
					<button on:click={addNewVariation} class="btn w-full bg-gray-800 rounded-md"
						>Add another variation</button
					>
				{/if}
			</div>
		</div>
		<!-- //Variations sections -->

		<!-- Table sections -->
		<div class="container w-full mt-6 rounded-xl shadow-md bg-gray-200 overflow-auto">
			<div class="overflow-x-auto">
				<table class="table w-full table-zebra">
					<thead>
						<tr>
							<th> Variation # 1 </th>
							<!-- <th> Variation # 2 </th> -->
							<th> Compare Price </th>
							<th>Sell Price</th>
							<th>List Price Price</th>
						</tr>
					</thead>
					<tbody>
						{#if cartedArray}
							{#each cartedArray as data, durex}
								<tr class="rounded-none">
									<td>
										<input
											class="input input-ghost hover:cursor-text"
											type="text"
											placeholder={data.name}
											bind:value={data.name}
											disabled={true}
										/>
									</td>
									<!-- <td>
										<span class="label-text">{variations[1]?.value[durex]}</span>
									</td> -->
									<td>
										<input
											class="input input-ghost input-bordered"
											type="text"
											placeholder={data.comparePrice}
											bind:value={data.comparePrice}
										/>
									</td>
									<td>
										<input
											class="input input-ghost input-bordered"
											type="text"
											placeholder={data.sellPrice}
											bind:value={data.sellPrice}
										/>
									</td>
									<td>
										<input
											class="input input-ghost input-bordered"
											type="text"
											placeholder={data.listPrice}
											bind:value={data.listPrice}
										/>
									</td>
								</tr>
							{/each}
						{/if}
					</tbody>
				</table>
			</div>
			<button
				on:click={addProduct}
				class="btn w-32 h-4 p-4 justify-center float-right mt-4 text-xs bg-[#FF5800] border-none rounded-3xl"
				disabled={cartedArray?.length == 0 ? true : false}>Submit Details</button
			>
		</div>
		<!-- //Table sections -->
	</div>
	<!-- //Main centralized w-3/4 container -->
</div>
