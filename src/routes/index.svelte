<script>
	import ViewHandler from '../components/ViewHandler.svelte';
	import TabHandler from '../components/TabHandler.svelte';

	let rootValue = 1;
	let level = 1;
	let tree = [];
	let pointer = tree.length - 1;
	const createNode = () => {
		if(tree == '')
		{
			tree = [...tree, { value: 0, left: 0, right: 0 }];
			addNode;
		}
		// if(level == 1)
		// {
		// 	tree = [...tree,{value:0, left: 0, right: 0}]
		// 	addNode();
		// }
		// else
		// {

		// }
	};

	const addNode = () => {
		// tree.map((node,index) => {
		// 	node[index].value = rootValue;
		// 	node[index].left = rootValue + 1;
		// 	node[index].right = rootValue + 2;
		// 	rootValue = node[index].right + 1;
		// });
	};
</script>

<div class="flex flex-col align-middle justify-center">
	<div class="flex flex-row self-center">
		{#each tree as node}
			<div class="flex-col mx-2">
				<div class="grid grid-cols-3">
					<div class="col-span-1" />
					<div class="col-span-1">
						<span class="btn btn-lg btn-circle btn-info btn-disabled text-4xl">{node.value}</span>
					</div>
					<div class="col-span-1" />
				</div>
				<div class="grid grid-cols-3">
					<div class="col-span-1"><span class="btn btn-lg btn-circle btn-success btn-disabled text-4xl">{node.left}</span></div>
					<div class="col-span-1" />
					<div class="col-span-1"><span class="btn btn-lg btn-circle btn-success btn-disabled text-4xl">{node.right}</span></div>
				</div>
				<span />
			</div>
		{/each}
	</div>
	<div class="self-center">
		<button on:click={createNode} class="btn btn-info">Add Node</button>
	</div>
</div>
<!-- <TabHandler/>
<ViewHandler/> -->
