<script>
	import Page from '../layout/Page/Page.svelte';
	import RecentSales from './RecentSales.svelte';
	import RecentSalesRecord from './RecentSalesRecord.svelte';

	let searchItem = {
		name:'',
		uom:'',
		qty:0,
		price:0
	}
	let products = [
		{
			name: 'Lays',
			uom: 'Piece',
			qty: 1,
			price: 50
		},
		{
			name: 'Super',
			uom: 'Piece',
			qty: 1,
			price: 50
		},
		{
			name: 'Wavy',
			uom: 'Piece',
			qty: 1,
			price: 50
		},
		{
			name: 'Crispy',
			uom: 'Piece',
			qty: 1,
			price: 50
		},
		{
			name: 'Doritos',
			uom: 'Piece',
			qty: 1,
			price: 50
		},
		{
			name: 'Shampoo',
			uom: 'Piece',
			qty: 1,
			price: 50
		},
		{
			name: 'Shampoo',
			uom: 'Piece',
			qty: 1,
			price: 50
		},
		{
			name: 'Zara SA',
			uom: 'Piece',
			qty: 1,
			price: 50
		},
		{
			name: 'Lux',
			uom: 'Piece',
			qty: 1,
			price: 50
		},
		{
			name: 'Phir zara sa',
			uom: 'Piece',
			qty: 1,
			price: 50
		},
		{
			name: 'Lux',
			uom: 'Piece',
			qty: 1,
			price: 50
		},
        {
			name: 'Phir zara sa',
			uom: 'Piece',
			qty: 1,
			price: 50
		},
		{
			name: 'Lux',
			uom: 'Piece',
			qty: 1,
			price: 50
		},
        {
			name: 'Phir zara sa',
			uom: 'Piece',
			qty: 1,
			price: 50
		},
		{
			name: 'Lux',
			uom: 'Piece',
			qty: 1,
			price: 50
		}
	];

	const addProductToInvoice = () => {
		if(searchItem.name != '' && searchItem.uom!='' && (searchItem.qty != 0 || searchItem.qty != '') && (searchItem.price != 0 || searchItem.price != ''))
		{
			products = [...products,{name:searchItem.name,uom:searchItem.uom,qty:searchItem.qty,price:searchItem.price,amount:searchItem.qty * searchItem.price}];
			searchItem = {
				name:'',
				uom:'',
				qty:0,
				price:0
			}
		}else{
			alert("Enter valid data");
		}
	}
</script>
<Page>
	<svelte:fragment slot="actions">
		<button class="btn btn-sm btn-ghost border-1 border-gray-200 hover:btn-warning space-x-1">
			<i class="fa fa-times" />
			<span>Cancel</span>
		</button>
		<button class="btn btn-sm btn-ghost border-1 border-gray-200 hover:btn-warning space-x-1">
			<i class="fa fa-tag" />
			<span>Price Check</span>
		</button>
		<button class="btn btn-sm btn-ghost border-1 border-gray-200 hover:btn-warning space-x-1">
			<i class="fas fa-external-link-alt" />
			<span>Sale Return</span>
		</button>
		<button class="btn btn-sm btn-ghost border-1 border-gray-200 hover:btn-warning space-x-1">
			<i class="fa fa-tag" />
			<span>List all Orders</span>
		</button>
	</svelte:fragment>
	<div class="w-full max-h-full flex flex-row overflow-hidden">
		<div class="w-full h-full flex flex-col p-2 relative">
			<div class="w-full sticky top-0">
				<div class="w-full flex flex-row">
					<div class="w-1/2 flex-col">
						<p class="text-2xl font-bold">Walk-in Customer</p>
						<p class="text-xl font-semibold">0000-0000-0000</p>
						<p class="text-xl text-green-500 font-semibold">Rs. 1,99,000.00</p>
						<p class="text-sm text-gray-400">
							Sold By: <span class="text-md font-semibold">Hafiz Bilal Butt</span>
						</p>
					</div>
					<div class="w-1/2 flex-col">
						<p class="text-4xl font-bold text-right">Rs. 1000.00</p>
						<span class="flex space-x-2 justify-end">
							<p class="text-xl font-semibold">Order # 9994500</p>
							<p class="text-xl font-semibold">15 Aug 20</p>
						</span>
						<span class="flex space-x-2 justify-end">
							<p class="text-purple-600">Cash</p>
							<p class="text-gray-400">Apply Discount</p>
							<p class="text-orange-600">Unpaid</p>
						</span>
					</div>
				</div>
				<div class="w-full p-2 flex space-x-1 border-b-2 border-gray-200">
					<div class="form-control flex-1 items-center">
						<div class="flex flex-col">
							<span class="text-center text-gray-800 text-xs font-bold mb-1"> Code/Name </span>
							<input type="text" class="input input-xs bg-white rounded-lg" bind:value={searchItem.name} />
						</div>
					</div>
					<div class="form-control flex-1 items-center">
						<div class="flex flex-col">
							<span class="text-center text-gray-800 text-xs font-bold mb-1"> UOM </span>
							<input type="text" class="input input-xs bg-white rounded-lg" bind:value={searchItem.uom} />
						</div>
					</div>
					<div class="form-control flex-1 items-center">
						<div class="flex flex-col">
							<span class="text-center text-gray-800 text-xs font-bold mb-1"> QTY </span>
							<div class="w-full flex flex-row relative">
								<span
									on:click={()=>{if (searchItem.qty > 0) searchItem.qty-=1}}
									class="absolute left-0 btn btn-xs btn-ghost text-gray-800 hover:text-white hover:bg-gray-800"
									>-</span
								>
								<input
									class="w-full input input-xs bg-white rounded-lg text-center text-xs font-semibold"
									inputmode="numeric"
									bind:value={searchItem.qty}
								/>
								<span
								on:click={()=>searchItem.qty+=1}
									class="absolute right-0 btn btn-xs btn-ghost text-gray-800 hover:text-white hover:bg-gray-800"
									>+</span
								>
							</div>
						</div>
					</div>
					<div class="form-control flex-1 items-center">
						<div class="flex flex-col">
							<span class="text-center text-gray-800 text-xs font-bold mb-1"> Price </span>
							<input type="text" class="input input-xs bg-white rounded-lg" bind:value={searchItem.price} />
						</div>
					</div>
					<div class="form-control flex justify-end">
						<button on:click={addProductToInvoice} class="btn btn-xs btn-circle btn-ghost bg-gray-800 text-white">+</button>
					</div>
				</div>
			</div>
			<div class="w-full flex flex-col px-2 gap-y-1 bg-gray-200 overflow-y-auto">
				<div class="w-full flex flex-row">
					<span class="px-2 font-semibold">#</span>
					<div class="w-full flex flex-row">
						<span class="w-[20%] text-center font-semibold">Product</span>
						<span class="w-[20%] text-center font-semibold">UOM</span>
						<span class="w-[20%] text-center font-semibold">QTY</span>
						<span class="w-[20%] text-center font-semibold">Price</span>
						<span class="w-[20%] text-center font-semibold">Amount</span>
					</div>
				</div>
				{#each products as product, index}
					<div class="w-full flex flex-row">
						<span class="px-2 font-semibold">{index + 1}</span>
						<div class="w-full flex flex-row items-center">
							<span class="w-[20%] self-center text-center text-sm font-semibold"
								>{product.name}</span
							>
							<span class="w-[20%] self-center text-center text-sm font-semibold"
								>{product.uom}</span
							>
							<div class="w-[20%] flex flex-row relative">
								<span
									on:click={()=>{if (product.qty > 0) product.qty -= 1}}
									class="absolute left-0 btn btn-xs btn-ghost text-gray-800 hover:text-white hover:bg-gray-800"
									>-</span
								>
								<input
									class="w-full input input-xs bg-white rounded-lg text-center text-xs font-semibold"
									type="text"
									min="0"
									value={product.qty}
									bind:this={products.qty}
								/>
								<span
									on:click={()=>product.qty += 1}
									class="absolute right-0 btn btn-xs btn-ghost text-gray-800 hover:text-white hover:bg-gray-800"
									>+</span
								>
							</div>
							<div class="w-[20%] flex">
								<span class="w-full text-center text-sm font-semibold">
									{product.price}
								</span>
							</div>
							<span class="w-[20%] self-center text-center text-sm font-semibold"
								>{product.qty * product.price}</span
							>
						</div>
					</div>
				{/each}
			</div>
			<div class="w-full h-28 flex flex-row gap-x-2 sticky bottom-0 mb-8 bg-gray-200 z-10">
				<div
					class="group flex-1 flex flex-col items-center justify-center bg-blue-400 bg-opacity-30 hover:bg-opacity-95 transition-all rounded-md"
				>
					<button>
						<i class="fas fa-pause text-xl text-blue-900 group-hover:text-gray-800" />
					</button>
					<span class="font-bold text-blue-900 group-hover:text-gray-800">HOLD</span>
				</div>
				<div
					class="group flex-1 flex flex-col h-28 items-center justify-center bg-green-300 bg-opacity-30 hover:bg-opacity-95 rounded-md"
				>
					<button>
						<i class="fas fa-credit-card text-xl text-green-900 group-hover:text-gray-800" />
					</button>
					<span class="font-bold text-green-900 group-hover:text-gray-800">CARD</span>
				</div>
				<div
					class="group flex-1 flex flex-col h-28 items-center justify-center bg-yellow-300 bg-opacity-30 hover:bg-opacity-95 rounded-md"
				>
					<button>
						<i class="fas fa-money-bill-wave text-xl text-yellow-900 group-hover:text-gray-800" />
					</button>
					<span class="font-bold text-yellow-900 group-hover:text-gray-800">CASH</span>
				</div>
			</div>
		</div>
		<div class="w-[30%] border-l-2 border-gray-200">
			<div class="w-full flex flex-col gap-y-2 overflow-hidden">
				<!-- <div class="w-full h-48"> -->
					<RecentSales/>
				<!-- </div> -->
				<!-- <div class="w-full h-48"> -->
					<RecentSalesRecord/>
				<!-- </div> -->
			</div>
		</div>
	</div>
</Page>
