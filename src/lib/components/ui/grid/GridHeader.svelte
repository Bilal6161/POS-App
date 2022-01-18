<script>
    import GridHider from '$lib/components/ui/grid/GridHider.svelte'
    import GridSorter from '$lib/components/ui/grid/GridSorter.svelte'
    import GridFilter from '$lib/components/ui/grid/GridFilter.svelte'
    import {structure} from '$lib/structure.js'
    let HiddenGrid = [];
    export let hiddenGrid = [];
    let SortedGrid = [];
    let FilteredGrid = [];
    $:{
        hiddenGrid = HiddenGrid;
    }
</script>

<div class="flex flex-row w-full gap-x-2 pl-1">
    <div class="dropdown">
        <button class="btn btn-sm btn-ghost border-1 border-gray-200 hover:btn-warning space-x-1"><i class="fas fa-eye-slash"/>Hide/Show</button>
        <GridHider {structure} bind:HiddenGrid={HiddenGrid}/>
    </div>
    <div class="dropdown">
        <button class="btn btn-sm btn-ghost border-1 border-gray-200 hover:btn-warning space-x-1"><i class="fas fa-sort-alpha-up"/>Sort</button>
        <GridSorter {structure} bind:SortedGrid={SortedGrid}/>
    </div>
    <div class="dropdown">
        <button class="btn btn-sm btn-ghost border-1 border-gray-200 hover:btn-warning space-x-1"><i class="fas fa-filter"/>Filter</button>
        <GridFilter {structure} bind:FilteredGrid={FilteredGrid}/>
    </div>
</div>