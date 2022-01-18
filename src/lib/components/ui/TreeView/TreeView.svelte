<script>
    import TreeNode from "./TreeNode.svelte";
    export let nodes = {};
    export let selectedNodes = [];
    const selectChange = (node) => {
        if(selectedNodes.includes(node))
        {
            selectedNodes = selectedNodes.filter(data=>data !== node);
        }
        else
        {
            selectedNodes = [...selectedNodes,node];
        }
    }
</script>

<div class="w-full flex p-4">
    <TreeNode node = {nodes} {selectChange}/>
</div>