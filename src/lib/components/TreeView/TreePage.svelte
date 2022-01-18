<script>
    import Page from '$lib/components/layout/Page/Page.svelte';
    import TreeView from '$lib/components/ui/TreeView/TreeView.svelte'
    import {Modules} from '$lib/Modules'

    let nodes = {
        value: 'ALL',
        name:'root',
        childs:Modules
    }
    let selectedNodes = [];
</script>

<Page>
    <div class="w-full flex pb-8 overflow-auto">
        <div class="w-[50%] flex self-start rounded-xl shadow-sm drop-shadow-md bg-gray-200">
            <TreeView {nodes} bind:selectedValues={selectedNodes}/>
        </div>
    </div>
</Page>